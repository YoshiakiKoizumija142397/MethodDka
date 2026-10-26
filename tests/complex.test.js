import { describe, it, expect } from 'vitest';
import Decimal from 'decimal.js';
import { Complex, c_add, c_sub, c_mul, c_div, c_abs } from '../src/core/complex.js';

describe('Complex numbers module (260-digit precision capability)', () => {
  it('supports basic arithmetic operations', () => {
    const a = new Complex(3, 4);
    const b = new Complex(1, 2);

    const sum = a.add(b);
    expect(sum.re.toNumber()).toBe(4);
    expect(sum.im.toNumber()).toBe(6);

    const diff = a.sub(b);
    expect(diff.re.toNumber()).toBe(2);
    expect(diff.im.toNumber()).toBe(2);

    // (3 + 4i)(1 + 2i) = 3 + 6i + 4i - 8 = -5 + 10i
    const prod = a.mul(b);
    expect(prod.re.toNumber()).toBe(-5);
    expect(prod.im.toNumber()).toBe(10);

    // (3 + 4i) / (1 + 2i) = (3 + 4i)(1 - 2i) / (1 + 4) = (3 - 6i + 4i + 8)/5 = (11 - 2i)/5 = 2.2 - 0.4i
    const quot = a.div(b);
    expect(quot.re.toNumber()).toBeCloseTo(2.2);
    expect(quot.im.toNumber()).toBeCloseTo(-0.4);

    expect(a.abs().toNumber()).toBe(5);
  });

  it('calculates with 260-digit extended precision', () => {
    Decimal.set({ precision: 260 });
    const one = new Decimal(1);
    const three = new Decimal(3);
    const sqrt3 = three.sqrt();

    // z = 1/2 + (sqrt(3)/2)i => |z| = 1
    const half = one.div(2);
    const halfSqrt3 = sqrt3.div(2);
    const z = new Complex(half, halfSqrt3);

    const modulus = z.abs();
    expect(modulus.sub(1).abs().toNumber()).toBeLessThan(1e-250);

    // z^3 should equal -1
    const z2 = z.mul(z);
    const z3 = z2.mul(z);
    expect(z3.re.add(1).abs().toNumber()).toBeLessThan(1e-250);
    expect(z3.im.abs().toNumber()).toBeLessThan(1e-250);
  });

  it('maintains backward-compatible functional helpers', () => {
    Decimal.set({ precision: 100 });
    const a = { re: new Decimal(2), im: new Decimal(3) };
    const b = { re: new Decimal(4), im: new Decimal(-1) };

    const sum = c_add(a, b);
    expect(sum.re.toString()).toBe('6');
    expect(sum.im.toString()).toBe('2');

    const diff = c_sub(a, b);
    expect(diff.re.toString()).toBe('-2');
    expect(diff.im.toString()).toBe('4');

    const norm = c_abs(a);
    expect(norm.toNumber()).toBeCloseTo(Math.sqrt(13));
  });
});

