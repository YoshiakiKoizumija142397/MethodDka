import Decimal from 'decimal.js';

Decimal.set({ precision: 260 });

const n = 20; // 20次
const coeffs = [];
for (let i = 0; i <= n; i++) coeffs.push(new Decimal(i + 1));

// Method A: Original naive object-heavy implementation
function originalStep(coeffs, z, n) {
  const nextZ = new Array(n);
  for (let i = 0; i < n; i++) {
    let valRe = coeffs[0];
    let valIm = new Decimal(0);
    for (let c = 1; c <= n; c++) {
      const nextRe = valRe.mul(z[i].re).sub(valIm.mul(z[i].im)).add(coeffs[c]);
      const nextIm = valRe.mul(z[i].im).add(valIm.mul(z[i].re));
      valRe = nextRe;
      valIm = nextIm;
    }
    let denomRe = new Decimal(1);
    let denomIm = new Decimal(0);
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const diffRe = z[i].re.sub(z[j].re);
      const diffIm = z[i].im.sub(z[j].im);
      const nextDRe = denomRe.mul(diffRe).sub(denomIm.mul(diffIm));
      const nextDIm = denomRe.mul(diffIm).add(denomIm.mul(diffRe));
      denomRe = nextDRe;
      denomIm = nextDIm;
    }
    const denomNorm = denomRe.mul(denomRe).add(denomIm.mul(denomIm));
    const deltaRe = valRe.mul(denomRe).add(valIm.mul(denomIm)).div(denomNorm);
    const deltaIm = valIm.mul(denomRe).sub(valRe.mul(denomIm)).div(denomNorm);
    nextZ[i] = { re: z[i].re.sub(deltaRe), im: z[i].im.sub(deltaIm) };
  }
  return nextZ;
}

// Method B: Optimized flat array
function optimizedStep(coeffs, zRe, zIm, nextZRe, nextZIm, n, epsSq) {
  for (let i = 0; i < n; i++) {
    const ziRe = zRe[i];
    const ziIm = zIm[i];

    // Inline real-coefficient Horner
    let vRe = coeffs[0];
    let vIm = new Decimal(0);
    for (let c = 1; c <= n; c++) {
      const nRe = vRe.mul(ziRe).sub(vIm.mul(ziIm)).add(coeffs[c]);
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

    const dNorm = dRe.mul(dRe).add(dIm.mul(dIm));
    const deltaRe = vRe.mul(dRe).add(vIm.mul(dIm)).div(dNorm);
    const deltaIm = vIm.mul(dRe).sub(vRe.mul(dIm)).div(dNorm);

    const normSq = deltaRe.mul(deltaRe).add(deltaIm.mul(deltaIm));
    if (normSq.lte(epsSq)) {
      nextZRe[i] = ziRe;
      nextZIm[i] = ziIm;
    } else {
      nextZRe[i] = ziRe.sub(deltaRe);
      nextZIm[i] = ziIm.sub(deltaIm);
    }
  }
}

const zA = [];
const zB_re = new Array(n);
const zB_im = new Array(n);
const nextZ_re = new Array(n);
const nextZ_im = new Array(n);

for (let i = 0; i < n; i++) {
  zA.push({ re: new Decimal(i + 0.5), im: new Decimal(i - 0.5) });
  zB_re[i] = new Decimal(i + 0.5);
  zB_im[i] = new Decimal(i - 0.5);
}

const epsSq = new Decimal('1e-440');

const t0 = Date.now();
let curA = zA;
for (let s = 0; s < 10; s++) {
  curA = originalStep(coeffs, curA, n);
}
const timeA = Date.now() - t0;

const t1 = Date.now();
for (let s = 0; s < 10; s++) {
  optimizedStep(coeffs, zB_re, zB_im, nextZ_re, nextZ_im, n, epsSq);
  for (let i = 0; i < n; i++) {
    zB_re[i] = nextZ_re[i];
    zB_im[i] = nextZ_im[i];
  }
}
const timeB = Date.now() - t1;

console.log(`Original 10 steps time: ${timeA} ms`);
console.log(`Optimized 10 steps time: ${timeB} ms`);
console.log(`Speedup ratio: ${(timeA / timeB).toFixed(2)}x`);

let maxDiff = new Decimal(0);
for (let i = 0; i < n; i++) {
  const diffRe = curA[i].re.sub(zB_re[i]).abs();
  const diffIm = curA[i].im.sub(zB_im[i]).abs();
  if (diffRe.gt(maxDiff)) maxDiff = diffRe;
  if (diffIm.gt(maxDiff)) maxDiff = diffIm;
}
console.log(`Maximum difference between methods: ${maxDiff.toString()}`);

