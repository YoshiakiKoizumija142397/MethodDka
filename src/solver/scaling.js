import Decimal from 'decimal.js';

/**
 * Computes Fujiwara root upper bound for scaling polynomial variables:
 * S_x = 2 * \max_{1 \le i \le n, a_i \ne 0} |a_i / a_n|^{1/i}
 * Variables are scaled as x = S_x * y, keeping roots within or near the unit disk.
 * @param {Decimal[]} monicCoeffs - Coefficients of monic polynomial [1, a_{n-1}, ..., a_0]
 * @returns {Decimal}
 */
export function estimateRootScale(monicCoeffs) {
  const degree = monicCoeffs.length - 1;
  let maxRootBound = new Decimal(0);

  for (let i = 1; i <= degree; i++) {
    const coeff = monicCoeffs[i] instanceof Decimal ? monicCoeffs[i].abs() : new Decimal(monicCoeffs[i]).abs();
    if (coeff.isZero()) continue;
    const candidate = coeff.pow(new Decimal(1).div(i));
    if (candidate.gt(maxRootBound)) {
      maxRootBound = candidate;
    }
  }

  return maxRootBound.isZero() ? new Decimal(1) : maxRootBound.times(2);
}

/**
 * Generates initial Aberth complex values on a circle in the scaled y-space.
 * z_k = R * \exp(i * (2\pi k / n + 3 / (4n)))
 * @param {number} n - Degree of polynomial
 * @param {Decimal|number} [radius=1.5] - Radius of Aberth circle
 * @returns {{ re: Decimal, im: Decimal, iter: number, converged: boolean, finalCorrection: Decimal }[]}
 */
export function generateAberthInitialValues(n, radius = 1.5) {
  const R = radius instanceof Decimal ? radius : new Decimal(radius);
  const pi = Decimal.acos(-1);
  const initialRoots = [];

  for (let k = 0; k < n; k++) {
    const angle = new Decimal(2)
      .mul(pi)
      .mul(k)
      .div(n)
      .add(new Decimal(3).div(new Decimal(4).mul(n)));

    initialRoots.push({
      re: R.mul(Decimal.cos(angle)),
      im: R.mul(Decimal.sin(angle)),
      iter: 0,
      converged: false,
      finalCorrection: new Decimal(Infinity)
    });
  }

  return initialRoots;
}

