import Decimal from 'decimal.js';

Decimal.set({ precision: 260 });

const n = 50; // 50次多項式で10ステップ比較
const coeffs = [];
for (let i = 0; i <= n; i++) coeffs.push(new Decimal(i + 1));

// ==========================================
// 1. 現行の MethodDka.html 実装そのまま
// ==========================================
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

function evalPolyOriginal(A, z) {
  let val = { re: new Decimal(A[0].re), im: new Decimal(A[0].im) };
  for (let i = 1; i < A.length; i++) { val = c_add(c_mul(val, z), A[i]); }
  return val;
}

function runOriginal(scaledA, initialZ, n, EPS, steps) {
  let z = initialZ.map(item => ({ ...item }));
  const rootScale = new Decimal(2);

  for (let s = 0; s < steps; s++) {
    const nextZ = new Array(n);
    for (let i = 0; i < n; i++) {
      if (z[i].converged) {
        nextZ[i] = z[i];
        continue;
      }
      const fVal = evalPolyOriginal(scaledA, z[i]);
      let denom = { re: new Decimal(1), im: new Decimal(0) };

      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        denom = c_mul(denom, c_sub(z[i], z[j]));
      }

      const delta = c_div(fVal, denom);
      const scaledError = c_abs(delta);
      const finalCorrection = scaledError.mul(rootScale);

      if (scaledError.lte(EPS)) {
        nextZ[i] = {
          ...z[i],
          converged: true,
          finalCorrection
        };
      } else {
        nextZ[i] = {
          ...c_sub(z[i], delta),
          converged: false,
          finalCorrection
        };
      }
    }
    z = nextZ;
  }
  return z;
}

// ==========================================
// 2. 超高速リファクタリング版
// ==========================================
function runOptimized(polyCoeffsRe, initialZ, n, EPS, steps) {
  const EPS_SQ = EPS.mul(EPS);
  const rootScale = new Decimal(2);

  // フラットな配列構造（オブジェクト参照を排除）
  const zRe = new Array(n);
  const zIm = new Array(n);
  const converged = new Array(n).fill(false);
  const nextZRe = new Array(n);
  const nextZIm = new Array(n);

  for (let i = 0; i < n; i++) {
    zRe[i] = initialZ[i].re;
    zIm[i] = initialZ[i].im;
    converged[i] = initialZ[i].converged;
  }

  for (let s = 0; s < steps; s++) {
    for (let i = 0; i < n; i++) {
      if (converged[i]) {
        nextZRe[i] = zRe[i];
        nextZIm[i] = zIm[i];
        continue;
      }

      const ziRe = zRe[i];
      const ziIm = zIm[i];

      // 1. 実数係数特化のインライン・ホーナー法（オブジェクト生成ゼロ）
      let vRe = polyCoeffsRe[0];
      let vIm = new Decimal(0);
      for (let c = 1; c <= n; c++) {
        const nRe = vRe.mul(ziRe).sub(vIm.mul(ziIm)).add(polyCoeffsRe[c]);
        const nIm = vRe.mul(ziIm).add(vIm.mul(ziRe));
        vRe = nRe;
        vIm = nIm;
      }

      // 2. インライン分母積計算（オブジェクト生成ゼロ）
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

      // 3. インライン複素除算 delta = v / d
      const dNorm = dRe.mul(dRe).add(dIm.mul(dIm));
      const deltaRe = vRe.mul(dRe).add(vIm.mul(dIm)).div(dNorm);
      const deltaIm = vIm.mul(dRe).sub(vRe.mul(dIm)).div(dNorm);

      // 4. 遅延評価 & 2乗ノルム判定（重い Decimal.sqrt を全反復から完全排除）
      const normSq = deltaRe.mul(deltaRe).add(deltaIm.mul(deltaIm));

      if (normSq.lte(EPS_SQ)) {
        converged[i] = true;
        nextZRe[i] = ziRe;
        nextZIm[i] = ziIm;
      } else {
        nextZRe[i] = ziRe.sub(deltaRe);
        nextZIm[i] = ziIm.sub(deltaIm);
      }
    }

    for (let i = 0; i < n; i++) {
      zRe[i] = nextZRe[i];
      zIm[i] = nextZIm[i];
    }
  }

  // 終了時にのみ、必要に応じて finalCorrection を復元
  const result = new Array(n);
  for (let i = 0; i < n; i++) {
    result[i] = {
      re: zRe[i],
      im: zIm[i],
      converged: converged[i]
    };
  }
  return result;
}

// テスト実行
const EPS = new Decimal('1e-220');
const scaledA = coeffs.map(c => ({ re: c, im: new Decimal(0) }));
const initialZ = [];
for (let i = 0; i < n; i++) {
  initialZ.push({
    re: new Decimal(i + 0.5),
    im: new Decimal(i - 0.5),
    converged: false
  });
}

// 測定
const STEPS = 10;
console.log(`=== 50次多項式・${STEPS}ステップの実行比較 ===`);

const t0 = Date.now();
const resOrig = runOriginal(scaledA, initialZ, n, EPS, STEPS);
const timeOrig = Date.now() - t0;

const t1 = Date.now();
const resOpt = runOptimized(coeffs, initialZ, n, EPS, STEPS);
const timeOpt = Date.now() - t1;

console.log(`現行コード (MethodDka.html): ${timeOrig} ms`);
console.log(`最適化コード: ${timeOpt} ms`);
console.log(`高速化比率: ${(timeOrig / timeOpt).toFixed(2)}x`);

// 精度差の検証
let maxDiff = new Decimal(0);
for (let i = 0; i < n; i++) {
  const dRe = resOrig[i].re.sub(resOpt[i].re).abs();
  const dIm = resOrig[i].im.sub(resOpt[i].im).abs();
  if (dRe.gt(maxDiff)) maxDiff = dRe;
  if (dIm.gt(maxDiff)) maxDiff = dIm;
}
console.log(`最大誤差 (実部・虚部): ${maxDiff.toString()} (完全一致: ${maxDiff.isZero()})`);

