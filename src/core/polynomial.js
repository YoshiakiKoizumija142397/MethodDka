import Decimal from 'decimal.js';
import { Complex } from './complex.js';

/**
 * Polynomial operations using Decimal.js.
 * Polynomials are represented as coefficient arrays in descending order:
 * [a_n, a_{n-1}, ..., a_0] representing a_n * x^n + ... + a_0
 */

/**
 * Trims leading near-zero coefficients.
 * @param {Decimal[]|number[]|string[]} poly
 * @param {Decimal} eps
 * @returns {Decimal[]}
 */
export function trimLeadingZeros(poly, eps) {
  const p = poly.map(c => (c instanceof Decimal ? c : new Decimal(c)));
  const idx = p.findIndex(c => c.abs().gt(eps));
  if (idx === -1) return [new Decimal(0)];
  return p.slice(idx);
}

/**
 * Returns the degree of the polynomial.
 * @param {Decimal[]} poly
 * @param {Decimal} eps
 * @returns {number}
 */
export function getPolyDegree(poly, eps) {
  const p = trimLeadingZeros(poly, eps);
  if (p.length === 1 && p[0].abs().lte(eps)) return 0;
  return p.length - 1;
}

/**
 * Computes formal derivative P'(x).
 * @param {Decimal[]} poly
 * @param {Decimal} eps
 * @returns {Decimal[]}
 */
export function derivativePoly(poly, eps) {
  const p = trimLeadingZeros(poly, eps);
  const deg = getPolyDegree(p, eps);
  if (deg === 0) return [new Decimal(0)];
  const res = [];
  for (let i = 0; i < p.length - 1; i++) {
    res.push(p[i].times(deg - i));
  }
  return res;
}

/**
 * Normalizes polynomial to be monic (leading coefficient = 1).
 * @param {Decimal[]} poly
 * @param {Decimal} eps
 * @returns {Decimal[]}
 */
export function normalizePoly(poly, eps) {
  const p = trimLeadingZeros(poly, eps);
  const lead = p[0];
  if (lead.abs().lte(eps)) return p;
  return p.map(c => c.div(lead));
}

/**
 * Dynamic tracking polynomial long division: A(x) = B(x) * Q(x) + R(x).
 * Permanently prevents array index misalignment during cancellation.
 * @param {Decimal[]} A_in
 * @param {Decimal[]} B_in
 * @param {Decimal} eps
 * @returns {{ quotient: Decimal[], remainder: Decimal[] }}
 */
export function polyDivide(A_in, B_in, eps) {
  let A = trimLeadingZeros(A_in, eps);
  let B = trimLeadingZeros(B_in, eps);
  let degA = A.length - 1;
  let degB = B.length - 1;

  if (degA < degB || B[0].abs().lte(eps)) {
    return { quotient: [new Decimal(0)], remainder: A };
  }

  const Q = new Array(degA - degB + 1).fill(null).map(() => new Decimal(0));

  while (A.length > B.length || (A.length === B.length && !A[0].abs().lte(eps))) {
    degA = A.length - 1;
    degB = B.length - 1;
    if (degA < degB) break;

    const coeff = A[0].div(B[0]);
    const shift = degA - degB;

    Q[Q.length - 1 - shift] = coeff;

    for (let j = 0; j <= degB; j++) {
      A[j] = A[j].minus(coeff.times(B[j]));
    }
    A[0] = new Decimal(0);
    A = trimLeadingZeros(A, eps);
  }

  return {
    quotient: trimLeadingZeros(Q, eps),
    remainder: trimLeadingZeros(A, eps)
  };
}

/**
 * Robust Euclidean algorithm for GCD of two polynomials.
 * @param {Decimal[]} A_in
 * @param {Decimal[]} B_in
 * @param {Decimal} eps
 * @returns {Decimal[]}
 */
export function polyGCD(A_in, B_in, eps) {
  let A_curr = normalizePoly(A_in, eps);
  let B_curr = normalizePoly(B_in, eps);
  const maxIter = Math.max(A_curr.length, B_curr.length) + 1;
  let iter = 0;

  while (getPolyDegree(B_curr, eps) > 0) {
    if (iter++ >= maxIter) {
      throw new Error('Polynomial GCD iteration limit exceeded');
    }
    const { remainder } = polyDivide(A_curr, B_curr, eps);
    let maxRem = new Decimal(0);
    for (const c of remainder) {
      if (c.abs().gt(maxRem)) maxRem = c.abs();
    }

    if (maxRem.lte(eps)) {
      return B_curr;
    }

    A_curr = B_curr;
    B_curr = normalizePoly(remainder, eps);
  }

  return B_curr;
}

/**
 * Divides A by B and verifies remainder is below eps.
 * @param {Decimal[]} A
 * @param {Decimal[]} B
 * @param {Decimal} eps
 * @param {string} label
 * @returns {Decimal[]}
 */
export function divideExactly(A, B, eps, label) {
  const result = polyDivide(A, B, eps);
  const maxRemainder = result.remainder.reduce(
    (max, coefficient) => Decimal.max(max, coefficient.abs()),
    new Decimal(0)
  );
  if (maxRemainder.gt(eps)) {
    throw new Error(`${label}: remainder ${maxRemainder.toExponential(4)} exceeds tolerance`);
  }
  return normalizePoly(result.quotient, eps);
}

/**
 * Evaluates polynomial at complex number z using Horner's Method:
 * P(z) = (...((a_n * z + a_{n-1}) * z + ... ) + a_0
 * @param {Complex[]|{re: Decimal, im: Decimal}[]} coeffs - Descending order complex coefficients
 * @param {Complex|{re: Decimal, im: Decimal}} z
 * @returns {Complex}
 */
export function evalPoly(coeffs, z) {
  const zComplex = z instanceof Complex ? z : new Complex(z.re, z.im);
  let val = coeffs[0] instanceof Complex ? coeffs[0] : new Complex(coeffs[0].re, coeffs[0].im);
  for (let i = 1; i < coeffs.length; i++) {
    const c = coeffs[i] instanceof Complex ? coeffs[i] : new Complex(coeffs[i].re, coeffs[i].im);
    val = val.mul(zComplex).add(c);
  }
  return val;
}

/**
 * Human-readable string representation of a polynomial.
 * @param {Decimal[]} poly
 * @returns {string}
 */
export function polyToString(poly) {
  const deg = poly.length - 1;
  return '[' + poly.map((c, i) => `x^${deg - i}: ${c.toFixed(4)}`).join(', ') + ']';
}

