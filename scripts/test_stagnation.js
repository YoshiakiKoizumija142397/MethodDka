import Decimal from 'decimal.js';

Decimal.set({ precision: 260 });

// 簡易テスト: 20次ウィルキンソンで新ロジックの動作確認
const STRICT_TOLERANCE = new Decimal('1e-220');
const STAGNATION_BASE_TOLERANCE = new Decimal('1e-180');
const STAGNATION_RATIO = new Decimal('0.99');

console.log("Constants initialized successfully:");
console.log("STRICT_TOLERANCE:", STRICT_TOLERANCE.toString());
console.log("STAGNATION_BASE_TOLERANCE:", STAGNATION_BASE_TOLERANCE.toString());
console.log("STAGNATION_RATIO:", STAGNATION_RATIO.toString());

