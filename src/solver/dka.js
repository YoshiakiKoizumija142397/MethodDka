import Decimal from 'decimal.js';
import { Complex, c_div, c_mul, c_sub, c_abs } from '../core/complex.js';
import { evalPoly, normalizePoly } from '../core/polynomial.js';
import { estimateRootScale, generateAberthInitialValues } from './scaling.js';
import { normalizedResidual, coefficientReconstructionResidual } from '../verifier/residual.js';

/**
 * Solves a single square-free factor using the Durand-Kerner-Aberth method.
 *
 * @param {Decimal[]} factorCoeffs Coefficients of the factor in original scale
 * @param {object} options
 * @param {number} [options.maxIterations=5000] Safety cap for iterations
 * @param {Decimal} [options.tolerance=new Decimal("1e-180")] Convergence threshold in scaled space
 * @param {Function} [options.onStep] Step callback
 * @returns {Promise<{ roots: { re: Decimal, im: Decimal, finalCorrection: Decimal, iterations: number, converged: boolean }[], totalIterations: number }>}
 */
export async function solveFactorDka(factorCoeffs, options = {}) {
  const maxIter = options.maxIterations || 5000;
  const eps = options.tolerance || new Decimal('1e-180');
  const onStep = options.onStep;

  const n = factorCoeffs.length - 1;
  if (n <= 0) {
    return { roots: [], totalIterations: 0 };
  }

  // Monic normalization
  const monic = normalizePoly(factorCoeffs, eps);
  const rootScale = estimateRootScale(monic);

  let scalePower = new Decimal(1);
  const scaledCoeffs = monic.map((coeff, index) => {
    if (index > 0) scalePower = scalePower.mul(rootScale);
    return new Complex(coeff.div(scalePower), 0);
  });

  const z = generateAberthInitialValues(n, 1.5);
  let iter = 1;

  while (iter <= maxIter) {
    let allConverged = true;
    const nextZ = new Array(n);

    for (let i = 0; i < n; i++) {
      if (z[i].converged) {
        nextZ[i] = z[i];
        continue;
      }

      const zi = new Complex(z[i].re, z[i].im);
      const fVal = evalPoly(scaledCoeffs, zi);
      let denom = new Complex(1, 0);

      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        const zj = new Complex(z[j].re, z[j].im);
        denom = denom.mul(zi.sub(zj));
      }

      const delta = fVal.div(denom);
      const scaledError = delta.abs();
      const finalCorrection = scaledError.mul(rootScale);

      if (scaledError.lte(eps)) {
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

    if (onStep) {
      await onStep({ iter, maxIter, roots: z });
    }

    if (allConverged || iter >= maxIter) {
      break;
    }
    iter++;
  }

  // Restore roots to original variable scale (x = S_x * y)
  const restoredRoots = z.map(r => ({
    re: r.re.mul(rootScale),
    im: r.im.mul(rootScale),
    finalCorrection: r.finalCorrection,
    iterations: r.iter,
    converged: r.converged
  }));

  // Sort by real part ascending
  restoredRoots.sort((a, b) => (a.re.sub(b.re).isNegative() ? -1 : 1));

  return {
    roots: restoredRoots,
    totalIterations: iter
  };
}

/**
 * Complete high-precision solver pipeline orchestrating preprocessing,
 * factor-by-factor DKA solution, root expansion, and Horner residual verification.
 *
 * @param {Decimal[]|string[]|number[]} rawCoeffs Descending coefficients
 * @param {object} [options]
 * @param {number} [options.maxIterations=5000]
 * @param {Decimal} [options.preTolerance=new Decimal("1e-180")]
 * @param {Decimal} [options.solveTolerance=new Decimal("1e-180")]
 * @param {Decimal} [options.residualTolerance=new Decimal("1e-180")]
 * @param {Function} [options.onProgress]
 * @param {Function} [options.logger]
 * @returns {Promise<object>}
 */
export async function solvePolynomial(rawCoeffs, options = {}) {
  const maxIterations = options.maxIterations || 5000;
  const preEps = options.preTolerance || new Decimal('1e-180');
  const solveEps = options.solveTolerance || new Decimal('1e-180');
  const resTol = options.residualTolerance || new Decimal('1e-180');
  const onProgress = options.onProgress || (() => {});
  const logger = options.logger || (() => {});

  // Step 1: Preprocessing Phase with 320 digits
  Decimal.set({ precision: 320 });
  const { preprocessSquareFree } = await import('../preprocess/yun.js');
  const gcdResult = preprocessSquareFree(rawCoeffs, preEps, logger);

  // Step 2: Solver Phase with 260 digits (200 significant digits + 60 guard digits)
  Decimal.set({ precision: 260 });

  const factors = gcdResult.factors;
  const results = [];
  let rootId = 1;
  let totalIterations = 0;
  let convergedCount = 0;

  for (let fIdx = 0; fIdx < factors.length; fIdx++) {
    const factorData = factors[fIdx];
    const { roots, totalIterations: factorIter } = await solveFactorDka(factorData.poly, {
      maxIterations,
      tolerance: solveEps,
      onStep: (stepInfo) => {
        onProgress({
          factorIndex: fIdx,
          totalFactors: factors.length,
          multiplicity: factorData.multiplicity,
          iter: stepInfo.iter,
          maxIter: stepInfo.maxIter
        });
      }
    });

    totalIterations += factorIter;

    roots.forEach(root => {
      for (let m = 0; m < factorData.multiplicity; m++) {
        results.push({
          id: rootId++,
          re: root.re,
          im: root.im,
          reStr: root.re.toString(),
          imStr: root.im.toString(),
          finalCorrection: root.finalCorrection,
          iterations: root.iterations,
          multiplicity: factorData.multiplicity,
          converged: root.converged
        });
        if (root.converged) convergedCount++;
      }
    });
  }

  // Sort overall results by real part
  results.sort((a, b) => (a.re.sub(b.re).isNegative() ? -1 : 1));

  // Step 3: Verification Phase (Horner's Method & Coefficient Reconstruction)
  const originalDegree = rawCoeffs.length - 1;
  let residualPassCount = 0;

  const evaluatedRoots = results.map(root => {
    const res = normalizedResidual(rawCoeffs, root.re, root.im);
    const pass = res.lte(resTol);
    if (pass) residualPassCount++;
    return {
      ...root,
      normalizedResidual: res,
      residualPass: pass
    };
  });

  const reconstructionResidual = coefficientReconstructionResidual(rawCoeffs, results);
  const reconstructionPass = reconstructionResidual.lte(resTol);

  return {
    roots: evaluatedRoots,
    convergedCount,
    residualPassCount,
    totalRoots: originalDegree,
    totalIterations,
    reconstructionResidual,
    reconstructionPass,
    hasMultiplicity: gcdResult.hasMultiplicity,
    diagnostics: gcdResult.diagnostics
  };
}