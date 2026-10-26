import Decimal from 'decimal.js';
import {
  trimLeadingZeros,
  getPolyDegree,
  derivativePoly,
  normalizePoly,
  polyGCD,
  divideExactly,
  polyToString
} from '../core/polynomial.js';
import { yunDecomposeIntegerPoly } from './integerGcd.js';
import { estimateRootScale } from '../solver/scaling.js';

/**
 * Preprocesses a polynomial with Yun's square-free decomposition.
 * Validates division remainders, factor square-freeness, and degree reconstruction.
 * Safely falls back to the original polynomial if validation fails.
 *
 * @param {Decimal[]|number[]|string[]} polyCoeffs
 * @param {Decimal} eps - Epsilon threshold (e.g. 1e-220)
 * @param {Function} [logger] - Optional diagnostic logger function
 * @returns {{ factors: { poly: Decimal[], multiplicity: number }[], hasMultiplicity: boolean, diagnostics: string[] }}
 */
export function preprocessSquareFree(polyCoeffs, eps, logger = () => {}) {
  const diagnostics = [];
  const log = (msg) => {
    diagnostics.push(msg);
    logger(msg);
  };

  const P = normalizePoly(polyCoeffs, eps);
  const origDeg = getPolyDegree(P, eps);
  log(`▶ 入力 P(x) [次数 ${origDeg}]: ${polyToString(P)}`);

  if (origDeg <= 1) {
    log(`➔ 次数が1以下のため前処理をスキップ`);
    return {
      factors: [{ poly: P, multiplicity: 1 }],
      hasMultiplicity: false,
      diagnostics
    };
  }

  try {
    // Check if all coefficients are integers
    const integerCoefficients = polyCoeffs.map(c => {
      const dec = c instanceof Decimal ? c : new Decimal(c);
      const text = dec.toFixed();
      return /^[+-]?\d+$/.test(text) ? BigInt(text) : null;
    });

    if (integerCoefficients.every(c => c !== null)) {
      log(`▶ 整数係数を検出: BigInt 厳密ユン平方無因子分解を実行`);
      const factors = yunDecomposeIntegerPoly(integerCoefficients);
      factors.forEach(factor => {
        const factorDegree = factor.poly.length - 1;
        log(`▶ 平方無因子群 Q_${factor.multiplicity}(x) [重複度 ${factor.multiplicity}, 次数 ${factorDegree}]: ${polyToString(factor.poly)}`);
      });
      const hasMultiplicity = factors.some(factor => factor.multiplicity > 1);
      const decomposedDegree = factors.reduce(
        (sum, factor) => sum + (factor.poly.length - 1) * factor.multiplicity,
        0
      );
      log(`✅ ユンの厳密整数平方無因子分解成功: ${factors.length} 群、次数検証 ${decomposedDegree}/${origDeg}`);
      return { factors, hasMultiplicity, diagnostics };
    }

    // Floating-point path: scale and use 320-digit Decimal arithmetic
    log(`▶ 浮動小数点係数: 320桁精度によるユン平方無因子分解を実行`);
    const preprocessingScale = estimateRootScale(P.map(c => c.div(P[0])));
    let preprocessingScalePower = new Decimal(1);
    const scaledP = P.map((c, index) => {
      if (index > 0) preprocessingScalePower = preprocessingScalePower.mul(preprocessingScale);
      return c.div(preprocessingScalePower);
    });
    log(`▶ 数値前処理変数スケール: x = ${preprocessingScale.toExponential(6)} × y`);

    const dP = derivativePoly(scaledP, eps);
    log(`▶ 微分 P_s'(y) [次数 ${getPolyDegree(dP, eps)}]: ${polyToString(dP)}`);

    let c = polyGCD(scaledP, dP, eps);
    let w = divideExactly(scaledP, c, eps, "P_s / gcd(P_s, P_s')");
    const factors = [];
    let multiplicity = 1;

    while (getPolyDegree(w, eps) > 0) {
      if (multiplicity > origDeg) {
        throw new Error('Yun decomposition exceeded the input degree');
      }

      const y = polyGCD(w, c, eps);
      const factor = divideExactly(w, y, eps, `Yun factor at multiplicity ${multiplicity}`);
      const factorDegree = getPolyDegree(factor, eps);

      if (factorDegree > 0) {
        const factorGcd = polyGCD(factor, derivativePoly(factor, eps), eps);
        if (getPolyDegree(factorGcd, eps) > 0) {
          throw new Error(`factor at multiplicity ${multiplicity} is not square-free`);
        }
        let factorScalePower = new Decimal(1);
        const originalScaleFactor = factor.map((coeff, index) => {
          if (index > 0) factorScalePower = factorScalePower.mul(preprocessingScale);
          return coeff.mul(factorScalePower);
        });
        factors.push({ poly: originalScaleFactor, multiplicity });
        log(`▶ 平方無因子群 Q_${multiplicity}(x) [重複度 ${multiplicity}, 次数 ${factorDegree}]: ${polyToString(originalScaleFactor)}`);
      }

      w = y;
      c = divideExactly(c, y, eps, `Yun residual GCD at multiplicity ${multiplicity}`);
      multiplicity++;
    }

    const residualDegree = getPolyDegree(c, eps);
    const decomposedDegree = factors.reduce(
      (sum, factor) => sum + getPolyDegree(factor.poly, eps) * factor.multiplicity,
      0
    );
    if (residualDegree > 0 || decomposedDegree !== origDeg || factors.length === 0) {
      throw new Error(`Yun decomposition validation failed (residual degree ${residualDegree}, reconstructed degree ${decomposedDegree}/${origDeg})`);
    }

    const hasMultiplicity = factors.some(factor => factor.multiplicity > 1);
    log(`✅ ユンの平方無因子分解成功: ${factors.length} 群、次数検証 ${decomposedDegree}/${origDeg}`);
    return { factors, hasMultiplicity, diagnostics };
  } catch (e) {
    log(`❌ ユン分解を検証できませんでした: ${e.message} ➔ 元多項式でDKAを実行`);
    return {
      factors: [{ poly: P, multiplicity: 1 }],
      hasMultiplicity: false,
      diagnostics
    };
  }
}

