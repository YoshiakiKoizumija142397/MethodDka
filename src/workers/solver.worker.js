import Decimal from 'decimal.js';
import { Complex } from '../core/complex.js';
import {
  trimLeadingZeros,
  getPolyDegree,
  derivativePoly,
  normalizePoly,
  polyDivide,
  polyGCD,
  divideExactly,
  evalPoly
} from '../core/polynomial.js';
import { yunDecomposeIntegerPoly } from '../preprocess/integerGcd.js';
import { preprocessSquareFree } from '../preprocess/yun.js';
import { estimateRootScale, generateAberthInitialValues } from '../solver/scaling.js';
import {
  normalizedResidual,
  coefficientReconstructionResidual,
  formatResidual,
  formatRootDisplay,
  formatImaginaryRoot
} from '../verifier/residual.js';

/**
 * Web Worker entry point for MethodDka computation.
 * Handles high-precision DKA solving in a background thread to prevent UI freezing.
 */

if (typeof self !== 'undefined' && typeof self.postMessage === 'function') {
  self.onmessage = async function (e) {
    const data = e.data;
    if (!data || data.type !== 'START') return;

    const {
      degree,
      coeffs,
      maxIterations = 5000,
      preTolerance = '1e-220',
      solveTolerance = '1e-220',
      residualTolerance = '1e-180'
    } = data;

    const preEps = new Decimal(preTolerance);
    const solveEps = new Decimal(solveTolerance);
    const resTol = new Decimal(residualTolerance);
    const MAX_ITER = maxIterations;

    try {
      // 1. Preprocessing phase (320 digits)
      Decimal.set({ precision: 320 });
      self.postMessage({ type: 'STATUS', phase: 'preprocessing' });

      const diagnostics = [];
      const logger = (msg) => {
        diagnostics.push(msg);
        self.postMessage({ type: 'LOG', message: msg });
      };

      const gcdResult = preprocessSquareFree(coeffs, preEps, logger);

      // 2. DKA Solver phase (260 digits)
      Decimal.set({ precision: 260 });
      self.postMessage({ type: 'STATUS', phase: 'solving', hasMultiplicity: gcdResult.hasMultiplicity });

      const factors = gcdResult.factors;
      const results = [];
      let nextRootId = 1;
      let totalIterations = 0;
      let convergedDegree = 0;
      const originalDegree = degree;

      for (let fIdx = 0; fIdx < factors.length; fIdx++) {
        const factorData = factors[fIdx];
        const activeCoeffs = factorData.poly.map(c => new Decimal(c.toString()));
        const n = activeCoeffs.length - 1;
        const multiplicity = factorData.multiplicity;

        // Monic normalization & Fujiwara root scaling
        const monic = normalizePoly(activeCoeffs, solveEps);
        const rootScale = estimateRootScale(monic);

        let scalePower = new Decimal(1);
        const scaledA = monic.map((coeff, index) => {
          if (index > 0) scalePower = scalePower.mul(rootScale);
          return new Complex(coeff.div(scalePower), 0);
        });

        logger(`▶ DKA変数スケール (因子 ${fIdx + 1}/${factors.length}): x = ${rootScale.toExponential(6)} × y`);

        const z = generateAberthInitialValues(n, 1.5);
        let iter = 1;

        while (iter <= MAX_ITER) {
          let allConverged = true;
          const nextZ = new Array(n);

          for (let i = 0; i < n; i++) {
            if (z[i].converged) {
              nextZ[i] = z[i];
              continue;
            }

            const zi = new Complex(z[i].re, z[i].im);
            const fVal = evalPoly(scaledA, zi);
            let denom = new Complex(1, 0);

            for (let j = 0; j < n; j++) {
              if (i === j) continue;
              const zj = new Complex(z[j].re, z[j].im);
              denom = denom.mul(zi.sub(zj));
            }

            const delta = fVal.div(denom);
            const scaledError = delta.abs();
            const finalCorrection = scaledError.mul(rootScale);

            if (scaledError.lte(solveEps)) {
              nextZ[i] = {
                ...z[i],
                iter,
                converged: true,
                finalCorrection
              };
            } else {
              allConverged = false;
              const updated = zi.sub(delta);
              nextZ[i] = {
                re: updated.re,
                im: updated.im,
                iter,
                converged: false,
                finalCorrection
              };
            }
          }

          z.splice(0, n, ...nextZ);

          const convergedInFactor = z.filter(r => r.converged).length * multiplicity;
          const currentConvergence = ((convergedDegree + convergedInFactor) / originalDegree) * 100;

          // Emit progress periodically
          if (iter % 5 === 0 || allConverged || iter === MAX_ITER) {
            self.postMessage({
              type: 'PROGRESS',
              factorIndex: fIdx,
              totalFactors: factors.length,
              multiplicity,
              iter,
              maxIter: MAX_ITER,
              convergedDegree: convergedDegree + convergedInFactor,
              totalDegree: originalDegree,
              convergencePercent: currentConvergence
            });
          }

          if (allConverged || iter >= MAX_ITER) {
            totalIterations += iter;
            convergedDegree += convergedInFactor;

            z.sort((a, b) => (a.re.sub(b.re).isNegative() ? -1 : 1));
            z.forEach(ans => {
              for (let copy = 0; copy < multiplicity; copy++) {
                results.push({
                  id: nextRootId++,
                  re: ans.re.mul(rootScale),
                  im: ans.im.mul(rootScale),
                  reStr: ans.re.mul(rootScale).toString(),
                  imStr: ans.im.mul(rootScale).toString(),
                  finalCorrection: ans.finalCorrection,
                  correctionStr: ans.finalCorrection.toExponential(4),
                  iterations: ans.iter,
                  multiplicity,
                  converged: ans.converged,
                  statusClass: ans.converged ? 'err-ok' : 'err-warn'
                });
              }
            });
            break;
          }

          iter++;
        }
      }

      // 3. Verification phase
      self.postMessage({ type: 'STATUS', phase: 'verifying' });
      results.sort((a, b) => (a.re.sub(b.re).isNegative() ? -1 : 1));

      let residualPassCount = 0;
      const evaluatedRoots = results.map(root => {
        const res = normalizedResidual(coeffs, root.re, root.im);
        const pass = res.lte(resTol);
        if (pass) residualPassCount++;
        return {
          ...root,
          normalizedResidualStr: res.toExponential(4),
          residualPass: pass
        };
      });

      const reconstructionResidual = coefficientReconstructionResidual(coeffs, results);
      const reconstructionPass = reconstructionResidual.lte(resTol);

      self.postMessage({
        type: 'COMPLETE',
        roots: evaluatedRoots,
        convergedCount: evaluatedRoots.filter(r => r.converged).length,
        residualPassCount,
        totalDegree: originalDegree,
        totalIterations,
        reconstructionResidualStr: reconstructionResidual.toExponential(4),
        reconstructionPass,
        hasMultiplicity: gcdResult.hasMultiplicity,
        diagnostics
      });
    } catch (error) {
      self.postMessage({
        type: 'ERROR',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  };
}

