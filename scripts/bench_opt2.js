import Decimal from 'decimal.js';

Decimal.set({ precision: 260 });

const n = 50; // 50次
const coeffs = [];
for (let i = 0; i <= n; i++) coeffs.push(new Decimal(i + 1));

// Original functions from MethodDka.html
function c_add(a, b) { return { re: a.re.add(b.re), im: a.im.add(b.im) }; }
function c_sub(a, b) { return { re: a.re.sub(b.re), im: a.im.sub(b.im) }; }
function c_mul(a, b) {
  return {
    re: a.re.mul(b.re).sub(a.im.mul(b.im)),
    im: a.re.mul(b.im).add(a.im.mul(b.re))
  };
}
function c_div(a, b) {
  const denom = b.re.mul(b.re).add(b.im.mul(b.im));
  return {
    re: a.re.mul(b.re).add(a.im.mul(b.im)).div(denom),
    im: a.im.mul(b.re).sub(a.re.mul(b.im)).div(denom)
  };
}
function c_abs(a) { return Decimal.sqrt(a.re.mul(a.re).add(a.im.mul(a.im))); }

function evalPoly(A, z) {
  let val = { re: new Decimal(A[0].re), im: new Decimal(A[0].im) };
  for (let i = 1; i < A.length; i++) { val = c_add(c_mul(val, z), A[i]); }
  return val;
}

// Method 1: Exact MethodDka.html loop
function originalMethod(scaledA, z, n, EPS) {
  const nextZ = new Array(n);
  for (let i = 0; i < n; i++) {
    const fVal = evalPoly(scaledA, z[i]);
    let denom = { re: new Decimal(1), im: new Decimal(0) };

    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      denom = c_mul(denom, c_sub(z[i], z[j]));
    }

    const delta = c_div(fVal, denom);
    const scaledError = c_abs(delta);

    if (scaledError.lte(EPS)) {
      nextZ[i] = z[i];
    } else {
      nextZ[i] = c_sub(z[i], delta);
    }
  }
  return nextZ;
}

// Method 2: Highly Optimized Loop
// - No object allocation in evalPoly & denominator product
// - Squared tolerance avoids Decimal.sqrt
// - Flat typed-like Decimal arrays
const EPS = new Decimal('1e-220');
const EPS_SQ = EPS.mul(EPS);

function optimizedMethod(polyRe, zRe, zIm, nextZRe, nextZIm, n, EPS_SQ) {
  for (let i = 0; i < n; i++) {
    const ziRe = zRe[i];
    const ziIm = zIm[i];

    // Inline real-coefficient Horner (polyRe is real Decimal array)
    let vRe = polyRe[0];
    let vIm = new Decimal(0);
    for (let c = 1; c <= n; c++) {
      const nRe = vRe.mul(ziRe).sub(vIm.mul(ziIm)).add(polyRe[c]);
      const nIm = vRe.mul(ziIm).add(vIm.mul(ziRe));
      vRe = nRe;
      vIm = nIm;
    }

    // Inline denominator product
    let dRe = new Decimal(1);
    let dIm = new Decimal(0);
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const diffRe = ziRe.sub(zRe[j]);
      const diffIm = ziIm.sub(zIm[j]);
      const nDRe = dRe.mul(diffRe).sub(dIm.mul(diffIm));
      const nDIm = dRe.mul(diffIm).add(dIm.mul(diffRe));
      dRe = nDRe;
      dIm = nDIm;
    }

    // Complex division: v / d
    const dNorm = dRe.mul(dRe).add(dIm.mul(dIm));
    const deltaRe = vRe.mul(dRe).add(vIm.mul(dIm)).div(dNorm);
    const deltaIm = vIm.mul(dRe).sub(vRe.mul(dIm)).div(dNorm);

    // Squared error check (avoid sqrt!)
    const normSq = deltaRe.mul(deltaRe).add(deltaIm.mul(deltaIm));
    if (normSq.lte(EPS_SQ)) {
      nextZRe[i] = ziRe;
      nextZIm[i] = ziIm;
    } else {
      nextZRe[i] = ziRe.sub(deltaRe);
      nextZIm[i] = ziIm.sub(deltaIm);
    }
  }
}

// Init arrays
const scaledA = coeffs.map(c => ({ re: c, im: new Decimal(0) }));
const polyRe = coeffs;

const z1 = [];
const z2Re = new Array(n);
const z2Im = new Array(n);
const nextZ2Re = new Array(n);
const nextZ2Im = new Array(n);

for (let i = 0; i < n; i++) {
  z1.push({ re: new Decimal(i + 0.5), im: new Decimal(i - 0.5) });
  z2Re[i] = new Decimal(i + 0.5);
  z2Im[i] = new Decimal(i - 0.5);
}

// Warmup
originalMethod(scaledA, z1, n, EPS);
optimizedMethod(polyRe, z2Re, z2Im, nextZ2Re, nextZ2Im, n, EPS_SQ);

// Benchmark 5 steps
const t0 = Date.now();
let cur1 = z1;
for (let s = 0; s < 5; s++) {
  cur1 = originalMethod(scaledA, cur1, n, EPS);
}
const time1 = Date.now() - t0;

const t1 = Date.now();
for (let s = 0; s < 5; s++) {
  optimizedMethod(polyRe, z2Re, z2Im, nextZ2Re, nextZ2Im, n, EPS_SQ);
  for (let i = 0; i < n; i++) {
    z2Re[i] = nextZ2Re[i];
    z2Im[i] = nextZ2Im[i];
  }
}
const time2 = Date.now() - t1;

console.log(`Original Method 5 steps (n=50): ${time1} ms`);
console.log(`Optimized Method 5 steps (n=50): ${time2} ms`);
console.log(`Speedup: ${(time1 / time2).toFixed(2)}x`);

let maxDiff = new Decimal(0);
for (let i = 0; i < n; i++) {
  const diffRe = cur1[i].re.sub(z2Re[i]).abs();
  const diffIm = cur1[i].im.sub(z2Im[i]).abs();
  if (diffRe.gt(maxDiff)) maxDiff = diffRe;
  if (diffIm.gt(maxDiff)) maxDiff = diffIm;
}
console.log(`Max difference: ${maxDiff.toString()}`);

