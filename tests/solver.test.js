import { describe, it, expect } from 'vitest';
import Decimal from 'decimal.js';
import { solvePolynomial } from '../src/solver/dka.js';

describe('DKA Solver Pipeline', () => {
  it('solves multiple root polynomial (x^2 + 1)^2 = 0', async () => {
    const coeffs = [1, 0, 2, 0, 1]; // (x^2 + 1)^2 = x^4 + 2x^2 + 1
    const result = await solvePolynomial(coeffs, { maxIterations: 1000 });

    expect(result.hasMultiplicity).toBe(true);
    expect(result.totalRoots).toBe(4);
    expect(result.convergedCount).toBe(4);
    expect(result.residualPassCount).toBe(4);
    expect(result.reconstructionPass).toBe(true);

    // Roots should be +i (twice) and -i (twice)
    // Real parts close to 0, imaginary parts close to +1 and -1
    result.roots.forEach(root => {
      expect(root.re.abs().toNumber()).toBeLessThan(1e-100);
      expect(Math.abs(root.im.abs().toNumber() - 1)).toBeLessThan(1e-100);
    });
  });

  it('solves simple polynomial x^2 - 5x + 6 = 0', async () => {
    const coeffs = [1, -5, 6]; // roots: 2, 3
    const result = await solvePolynomial(coeffs, { maxIterations: 500 });

    expect(result.convergedCount).toBe(2);
    expect(result.residualPassCount).toBe(2);
    expect(result.roots[0].re.toNumber()).toBeCloseTo(2);
    expect(result.roots[1].re.toNumber()).toBeCloseTo(3);
    expect(result.roots[0].im.abs().toNumber()).toBeLessThan(1e-100);
    expect(result.roots[1].im.abs().toNumber()).toBeLessThan(1e-100);
  });

  it('solves 20th-degree Wilkinson polynomial W20 within residual threshold', { timeout: 45000 }, async () => {
    const w20Coeffs = [
      '1',
      '-210',
      '20615',
      '-1256850',
      '53327946',
      '-1672280820',
      '40171771630',
      '-756111184500',
      '11310276995381',
      '-135585182899530',
      '1307535010540395',
      '-10142299865511450',
      '63030812099294896',
      '-311333643161390640',
      '1206647803780373360',
      '-3599979517947607200',
      '8037811822645051776',
      '-12870931245150988800',
      '13803759753640704000',
      '-8752948036761600000',
      '2432902008176640000'
    ];

    const result = await solvePolynomial(w20Coeffs, { maxIterations: 500 });

    expect(result.totalRoots).toBe(20);
    expect(result.convergedCount).toBe(20);
    expect(result.residualPassCount).toBe(20);
    expect(result.reconstructionPass).toBe(true);

    // Verify roots are approximately 1, 2, ..., 20
    const sortedRealRoots = result.roots.map(r => r.re.toNumber()).sort((a, b) => a - b);
    for (let k = 1; k <= 20; k++) {
      expect(sortedRealRoots[k - 1]).toBeCloseTo(k, 1);
    }
  });
});

