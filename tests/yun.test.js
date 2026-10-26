import { describe, it, expect } from 'vitest';
import Decimal from 'decimal.js';
import { preprocessSquareFree } from '../src/preprocess/yun.js';
import { yunDecomposeIntegerPoly } from '../src/preprocess/integerGcd.js';

describe("Yun's square-free decomposition module", () => {
  const eps = new Decimal('1e-220');

  it('decomposes multiple root polynomial (x^2 + 1)^2 = x^4 + 2x^2 + 1 using BigInt', () => {
    // P(x) = x^4 + 2x^2 + 1 has root +i (mult 2), -i (mult 2)
    // Factors: Q_2(x) = x^2 + 1 with multiplicity 2
    const poly = [1n, 0n, 2n, 0n, 1n];
    const factors = yunDecomposeIntegerPoly(poly);

    expect(factors.length).toBe(1);
    expect(factors[0].multiplicity).toBe(2);
    expect(factors[0].poly.length).toBe(3); // degree 2
    expect(factors[0].poly[0].toNumber()).toBeCloseTo(1);
    expect(factors[0].poly[1].toNumber()).toBeCloseTo(0);
    expect(factors[0].poly[2].toNumber()).toBeCloseTo(1);
  });

  it('decomposes mixed-multiplicity polynomial (x - 1)^2 * (x - 2) = x^3 - 4x^2 + 5x - 2', () => {
    // Multiplicity 1: (x - 2)
    // Multiplicity 2: (x - 1)
    const coeffs = [1, -4, 5, -2];
    const result = preprocessSquareFree(coeffs, eps);

    expect(result.hasMultiplicity).toBe(true);
    expect(result.factors.length).toBe(2);

    const m1 = result.factors.find(f => f.multiplicity === 1);
    const m2 = result.factors.find(f => f.multiplicity === 2);

    expect(m1).toBeDefined();
    expect(m2).toBeDefined();
    // Q_1(x) = x - 2
    expect(m1.poly.length).toBe(2);
    expect(m1.poly[1].toNumber()).toBeCloseTo(-2);
    // Q_2(x) = x - 1
    expect(m2.poly.length).toBe(2);
    expect(m2.poly[1].toNumber()).toBeCloseTo(-1);
  });

  it('safely falls back to original polynomial on irregular inputs', () => {
    const single = [1, 2]; // degree 1
    const result = preprocessSquareFree(single, eps);
    expect(result.factors.length).toBe(1);
    expect(result.hasMultiplicity).toBe(false);
  });
});

