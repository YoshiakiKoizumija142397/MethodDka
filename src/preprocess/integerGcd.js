import Decimal from 'decimal.js';

/**
 * Exact integer polynomial arithmetic and Yun's square-free decomposition
 * using JavaScript native BigInt. Avoids fraction expansion and precision loss.
 */

/**
 * Computes the primitive part of an integer polynomial by factoring out the content (GCD of coefficients).
 * @param {bigint[]} poly
 * @returns {bigint[]}
 */
export function primitiveIntegerPoly(poly) {
  let result = poly.slice();
  while (result.length > 1 && result[0] === 0n) result.shift();
  if (result.every(c => c === 0n)) return [0n];

  const content = result.reduce((gcd, coefficient) => {
    let a = gcd < 0n ? -gcd : gcd;
    let b = coefficient < 0n ? -coefficient : coefficient;
    while (b !== 0n) [a, b] = [b, a % b];
    return a;
  }, 0n);

  result = result.map(c => c / content);
  return result[0] < 0n ? result.map(c => -c) : result;
}

/**
 * Computes GCD of two integer polynomials using pseudo-remainder sequence.
 * @param {bigint[]} A
 * @param {bigint[]} B
 * @returns {bigint[]}
 */
export function integerPolyGcd(A, B) {
  let a = primitiveIntegerPoly(A);
  let b = primitiveIntegerPoly(B);

  while (!(b.length === 1 && b[0] === 0n)) {
    let remainder = a.slice();
    while (
      remainder.length >= b.length &&
      !(remainder.length === 1 && remainder[0] === 0n)
    ) {
      const leadingRemainder = remainder[0];
      const leadingDivisor = b[0];
      const scaled = remainder.map(c => c * leadingDivisor);
      for (let i = 0; i < b.length; i++) {
        scaled[i] -= leadingRemainder * b[i];
      }
      remainder = primitiveIntegerPoly(scaled);
    }
    a = b;
    b = remainder;
  }

  return primitiveIntegerPoly(a);
}

/**
 * Performs exact integer polynomial division: A(x) / B(x).
 * Throws an error if division has a non-zero remainder.
 * @param {bigint[]} A
 * @param {bigint[]} B
 * @param {string} label
 * @returns {bigint[]}
 */
export function divideIntegerPolyExactly(A, B, label = 'Exact integer division') {
  let remainder = primitiveIntegerPoly(A);
  const divisor = primitiveIntegerPoly(B);
  if (divisor.length === 1 && divisor[0] === 0n) {
    throw new Error(`${label}: division by zero polynomial`);
  }
  if (remainder.length < divisor.length) {
    throw new Error(`${label}: divisor degree exceeds dividend degree`);
  }

  const quotient = new Array(remainder.length - divisor.length + 1).fill(0n);
  while (
    remainder.length >= divisor.length &&
    !(remainder.length === 1 && remainder[0] === 0n)
  ) {
    const leading = remainder[0];
    if (leading % divisor[0] !== 0n) {
      throw new Error(`${label}: non-integral polynomial quotient`);
    }
    const coefficient = leading / divisor[0];
    const shift = remainder.length - divisor.length;
    quotient[quotient.length - 1 - shift] = coefficient;
    for (let i = 0; i < divisor.length; i++) {
      remainder[i] -= coefficient * divisor[i];
    }
    while (remainder.length > 1 && remainder[0] === 0n) remainder.shift();
  }
  if (!(remainder.length === 1 && remainder[0] === 0n)) {
    throw new Error(`${label}: non-zero exact-division remainder`);
  }
  return primitiveIntegerPoly(quotient);
}

/**
 * Computes formal derivative P'(x) for integer polynomials.
 * @param {bigint[]} poly
 * @returns {bigint[]}
 */
export function derivativeIntegerPoly(poly) {
  const degree = poly.length - 1;
  if (degree <= 0) return [0n];
  return primitiveIntegerPoly(
    poly.slice(0, -1).map((c, index) => c * BigInt(degree - index))
  );
}

/**
 * Yun's square-free decomposition for integer polynomials using exact BigInt arithmetic.
 * Separates roots by multiplicity: P(x) = \prod_{k} Q_k(x)^k
 * @param {bigint[]} poly
 * @returns {{ poly: Decimal[], multiplicity: number }[]}
 */
export function yunDecomposeIntegerPoly(poly) {
  const P = primitiveIntegerPoly(poly);
  let c = integerPolyGcd(P, derivativeIntegerPoly(P));
  let w = divideIntegerPolyExactly(P, c, "P / gcd(P, P')");
  const factors = [];
  let multiplicity = 1;
  const originalDegree = P.length - 1;

  while (w.length > 1) {
    if (multiplicity > originalDegree) {
      throw new Error('Yun decomposition exceeded the input degree');
    }

    const y = integerPolyGcd(w, c);
    const factor = divideIntegerPolyExactly(w, y, `Yun factor at multiplicity ${multiplicity}`);
    if (factor.length > 1) {
      if (integerPolyGcd(factor, derivativeIntegerPoly(factor)).length > 1) {
        throw new Error(`Factor at multiplicity ${multiplicity} is not square-free`);
      }
      // Convert to Decimal array (monic)
      const leadStr = factor[0].toString();
      factors.push({
        poly: factor.map(c => new Decimal(c.toString()).div(leadStr)),
        multiplicity
      });
    }

    w = y;
    c = divideIntegerPolyExactly(c, y, `Yun residual GCD at multiplicity ${multiplicity}`);
    multiplicity++;
  }

  const residualDegree = c.length - 1;
  const decomposedDegree = factors.reduce(
    (sum, factor) => sum + (factor.poly.length - 1) * factor.multiplicity,
    0
  );
  if (residualDegree > 0 || decomposedDegree !== originalDegree || factors.length === 0) {
    throw new Error(
      `Yun decomposition validation failed (residual degree ${residualDegree}, reconstructed degree ${decomposedDegree}/${originalDegree})`
    );
  }
  return factors;
}

