import Decimal from 'decimal.js';

Decimal.set({ precision: 260 });

const N = 10000;
const aRe = new Decimal("12345678901234567890.12345678901234567890");
const aIm = new Decimal("98765432109876543210.98765432109876543210");
const bRe = new Decimal("11223344556677889900.11223344556677889900");
const bIm = new Decimal("99887766554433221100.99887766554433221100");

// Standard 4-mul method
function stdMul(ar, ai, br, bi) {
  const re = ar.mul(br).sub(ai.mul(bi));
  const im = ar.mul(bi).add(ai.mul(br));
  return { re, im };
}

// Karatsuba 3-mul method
function karatsubaMul(ar, ai, br, bi) {
  const k1 = br.mul(ar.add(ai));
  const k2 = ar.mul(bi.sub(br));
  const k3 = ai.mul(br.add(bi));
  const re = k1.sub(k3);
  const im = k1.add(k2);
  return { re, im };
}

// Verify correctness
const r1 = stdMul(aRe, aIm, bRe, bIm);
const r2 = karatsubaMul(aRe, aIm, bRe, bIm);
console.log("Diff Re:", r1.re.sub(r2.re).toString());
console.log("Diff Im:", r1.im.sub(r2.im).toString());

const t0 = Date.now();
for (let i = 0; i < N; i++) {
  stdMul(aRe, aIm, bRe, bIm);
}
const timeStd = Date.now() - t0;

const t1 = Date.now();
for (let i = 0; i < N; i++) {
  karatsubaMul(aRe, aIm, bRe, bIm);
}
const timeKaratsuba = Date.now() - t1;

console.log(`Standard 4-mul (${N} times): ${timeStd} ms`);
console.log(`Karatsuba 3-mul (${N} times): ${timeKaratsuba} ms`);
console.log(`Ratio: ${(timeStd / timeKaratsuba).toFixed(2)}x`);

