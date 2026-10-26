import Decimal from 'decimal.js';

/**
 * High-precision complex number representation and arithmetic using Decimal.js.
 */
export class Complex {
  /**
   * @param {Decimal|number|string} re - Real part
   * @param {Decimal|number|string} im - Imaginary part
   */
  constructor(re = 0, im = 0) {
    this.re = re instanceof Decimal ? re : new Decimal(re);
    this.im = im instanceof Decimal ? im : new Decimal(im);
  }

  /**
   * Addition: this + other
   * @param {Complex|{re: Decimal, im: Decimal}} other
   * @returns {Complex}
   */
  add(other) {
    const oRe = other.re instanceof Decimal ? other.re : new Decimal(other.re);
    const oIm = other.im instanceof Decimal ? other.im : new Decimal(other.im);
    return new Complex(this.re.add(oRe), this.im.add(oIm));
  }

  /**
   * Subtraction: this - other
   * @param {Complex|{re: Decimal, im: Decimal}} other
   * @returns {Complex}
   */
  sub(other) {
    const oRe = other.re instanceof Decimal ? other.re : new Decimal(other.re);
    const oIm = other.im instanceof Decimal ? other.im : new Decimal(other.im);
    return new Complex(this.re.sub(oRe), this.im.sub(oIm));
  }

  /**
   * Multiplication: this * other
   * (a + bi)(c + di) = (ac - bd) + (ad + bc)i
   * @param {Complex|{re: Decimal, im: Decimal}} other
   * @returns {Complex}
   */
  mul(other) {
    const oRe = other.re instanceof Decimal ? other.re : new Decimal(other.re);
    const oIm = other.im instanceof Decimal ? other.im : new Decimal(other.im);
    return new Complex(
      this.re.mul(oRe).sub(this.im.mul(oIm)),
      this.re.mul(oIm).add(this.im.mul(oRe))
    );
  }

  /**
   * Division: this / other
   * (a + bi) / (c + di) = ((ac + bd) + (bc - ad)i) / (c^2 + d^2)
   * @param {Complex|{re: Decimal, im: Decimal}} other
   * @returns {Complex}
   */
  div(other) {
    const oRe = other.re instanceof Decimal ? other.re : new Decimal(other.re);
    const oIm = other.im instanceof Decimal ? other.im : new Decimal(other.im);
    const denom = oRe.mul(oRe).add(oIm.mul(oIm));
    if (denom.isZero()) {
      throw new Error('Division by zero in Complex arithmetic');
    }
    return new Complex(
      this.re.mul(oRe).add(this.im.mul(oIm)).div(denom),
      this.im.mul(oRe).sub(this.re.mul(oIm)).div(denom)
    );
  }

  /**
   * Modulus / absolute value: sqrt(re^2 + im^2)
   * @returns {Decimal}
   */
  abs() {
    return Decimal.sqrt(this.re.mul(this.re).add(this.im.mul(this.im)));
  }

  /**
   * Conjugate: re - im * i
   * @returns {Complex}
   */
  conjugate() {
    return new Complex(this.re, this.im.neg());
  }

  /**
   * Plain object representation for backward compatibility with { re, im }
   * @returns {{ re: Decimal, im: Decimal }}
   */
  toObject() {
    return { re: this.re, im: this.im };
  }

  /**
   * String representation in standard complex notation
   * @returns {string}
   */
  toString() {
    const imSign = this.im.isNegative() ? '-' : '+';
    const absIm = this.im.abs();
    return `${this.re.toString()} ${imSign} ${absIm.toString()}i`;
  }
}

// Functional helpers for backward compatibility with existing codebase
export const c_add = (a, b) => new Complex(a.re, a.im).add(b).toObject();
export const c_sub = (a, b) => new Complex(a.re, a.im).sub(b).toObject();
export const c_mul = (a, b) => new Complex(a.re, a.im).mul(b).toObject();
export const c_div = (a, b) => new Complex(a.re, a.im).div(b).toObject();
export const c_abs = (a) => new Complex(a.re, a.im).abs();

