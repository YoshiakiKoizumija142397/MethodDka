import { describe, it, expect } from 'vitest';
import Decimal from 'decimal.js';
import {
  trimLeadingZeros,
  getPolyDegree,
  derivativePoly,
  normalizePoly,
  polyDivide,
  polyGCD,
  evalPoly
} from '../src/core/polynomial.js';
import { Complex } from '../src/core/complex.js';

describe('Polynomial operations module', () => {
  const eps = new Decimal('1e-220');

  it('correctly computes degree and derivative', () => {
    // P(x) = 3x^3 + 2x^2 + x + 5 => P'(x) = 9x^2 + 4x + 1
    const p = [new Decimal(3), new Decimal(2), new Decimal(1), new Decimal(5)];
    expect(getPolyDegree(p, eps)).toBe(3);

    const dp = derivativePoly(p, eps);
    expect(getPolyDegree(dp, eps)).toBe(2);
    expect(dp[0].toNumber()).toBe(9);
    expect(dp[1].toNumber()).toBe(4);
    expect(dp[2].toNumber()).toBe(1);
  });

  it('performs dynamic tracking polynomial long division correctly', () => {
    // A(x) = (x^2 + 2x + 1)(x + 1) = x^3 + 3x^2 + 3x + 1
    // Divide by B(x) = x + 1 => quotient = x^2 + 2x + 1, remainder = 0
    const A = [new Decimal(1), new Decimal(3), new Decimal(3), new Decimal(1)];
    const B = [new Decimal(1), new Decimal(1)];

    const { quotient, remainder } = polyDivide(A, B, eps);
    expect(getPolyDegree(quotient, eps)).toBe(2);
    expect(quotient[0].toNumber()).toBeCloseTo(1);
    expect(quotient[1].toNumber()).toBeCloseTo(2);
    expect(quotient[2].toNumber()).toBeCloseTo(1);

    expect(remainder.every(c => c.abs().lte(eps))).toBe(true);
  });

  it('computes polynomial GCD via Euclidean algorithm', () => {
    // A(x) = (x - 2)(x - 3) = x^2 - 5x + 6
    // B(x) = (x - 2)(x - 4) = x^2 - 6x + 8
    // GCD should be x - 2
    const A = [new Decimal(1), new Decimal(-5), new Decimal(6)];
    const B = [new Decimal(1), new Decimal(-6), new Decimal(8)];

    const gcd = polyGCD(A, B, eps);
    expect(getPolyDegree(gcd, eps)).toBe(1);
    expect(gcd[0].toNumber()).toBeCloseTo(1);
    expect(gcd[1].toNumber()).toBeCloseTo(-2);
  });

  it('evaluates polynomial at complex points via Horner method', () => {
    // P(x) = x^2 + 1
    // P(i) = i^2 + 1 = 0
    const coeffs = [
      new Complex(1, 0),
      new Complex(0, 0),
      new Complex(1, 0)
    ];
    const val = evalPoly(coeffs, new Complex(0, 1));
    expect(val.abs().toNumber()).toBeCloseTo(0);
  });
});

