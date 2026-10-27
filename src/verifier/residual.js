import Decimal from 'decimal.js';
import { Complex, c_add, c_sub, c_mul, c_abs } from '../core/complex.js';

/**
 * Computes the normalized residual \eta(z) = |P(z)| / \sum_{i=0}^n |a_i| |z|^{n-i}
 * via Horner's evaluation. Serves as a numerical backward-error indicator.
 *
 * @param {Decimal[]|string[]|number[]} coefficients - Descending order coefficients
 * @param {Decimal|string|number} real - Real part of the evaluated root
 * @param {Decimal|string|number} imaginary - Imaginary part of the evaluated root
 * @returns {Decimal}
 */
export function normalizedResidual(coefficients, real, imaginary) {
  const z = new Complex(real, imaginary);
  const zMagnitude = z.abs();

  let value = new Complex(coefficients[0], 0);
  let denominator = new Decimal(coefficients[0]).abs();

  for (let index = 1; index < coefficients.length; index++) {
    const coeff = new Decimal(coefficients[index]);
    value = value.mul(z).add(new Complex(coeff, 0));
    denominator = denominator.mul(zMagnitude).add(coeff.abs());
  }

  if (denominator.isZero()) {
    throw new Error('Cannot compute normalized residual for a zero polynomial');
  }

  return value.abs().div(denominator);
}

/**
 * Reconstructs the monic polynomial from calculated roots (taking multiplicities into account)
 * and compares it against the normalized input coefficients.
 * Computes \max_j |a_j - \hat{a}_j| / \max(1, |a_j|).
 *
 * @param {Decimal[]|string[]|number[]} coefficients - Original input coefficients
 * @param {{ re: Decimal|string|number, im: Decimal|string|number }[]} roots - Full root multiset
 * @returns {Decimal}
 */
export function coefficientReconstructionResidual(coefficients, roots) {
  const original = coefficients.map(c => new Decimal(c));
  while (original.length > 1 && original[0].isZero()) {
    original.shift();
  }
  if (original.every(c => c.isZero())) {
    throw new Error('Cannot reconstruct a zero polynomial from roots');
  }

  const leading = original[0];
  const monicOriginal = original.map(c => c.div(leading));
  let reconstructed = [new Complex(1, 0)];

  roots.forEach(root => {
    const rootValue = new Complex(root.re ?? root.reStr, root.im ?? root.imStr);
    const next = Array.from({ length: reconstructed.length + 1 }, () => new Complex(0, 0));
    reconstructed.forEach((coeff, index) => {
      next[index] = next[index].add(coeff);
      next[index + 1] = next[index + 1].sub(coeff.mul(rootValue));
    });
    reconstructed = next;
  });

  if (monicOriginal.length !== reconstructed.length) {
    return new Decimal(Infinity);
  }

  let maxDifference = new Decimal(0);
  let coefficientScale = new Decimal(1);

  monicOriginal.forEach((coeff, index) => {
    const diff = new Complex(
      reconstructed[index].re.sub(coeff),
      reconstructed[index].im
    ).abs();
    maxDifference = Decimal.max(maxDifference, diff);
    coefficientScale = Decimal.max(coefficientScale, coeff.abs());
  });

  return maxDifference.div(coefficientScale);
}

/**
 * Formats a root's real part to significant digits (default 180 digits for v3.5.0) in exponential format.
 * @param {Decimal|string|number} value
 * @param {number} [digits=180]
 * @returns {string}
 */
export function formatRootDisplay(value, digits = 180) {
  const number = new Decimal(value);
  return number.isZero()
    ? `0.${'0'.repeat(digits - 1)}e+0`
    : number.toExponential(digits - 1);
}

/**
 * Formats a root's imaginary part rounded to 10^-digits (default 180 decimal places for v3.5.0).
 * @param {Decimal|string|number} value
 * @param {number} [digits=180]
 * @returns {string}
 */
export function formatImaginaryRoot(value, digits = 180) {
  return new Decimal(value)
    .toDecimalPlaces(digits, Decimal.ROUND_HALF_UP)
    .toFixed(digits);
}

/**
 * Formats residual values for display.
 * @param {Decimal} value
 * @returns {string}
 */
export function formatResidual(value) {
  return value.isZero() ? '0' : value.toExponential(4);
}

