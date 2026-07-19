# MethodDka — 高速・高精度な因数分解 Web アプリ

MethodDka は、HTML と JavaScript だけで動作する **軽量・高速・高精度な因数分解ツール** です。
DKA法（Durand-Kerner法）を採用し、ホーナー法による検算ロジックを統合した世界基準の高精度数値解析リファレンスとして設計されています。

---

### 📝 更新状況 (v1.0.0-final)

* **計算安全装置の強化 (v1.0.0-final)**: README の設計仕様に基づき、反復計算のセーフティロック（上限回数）を **10,000回** に完全最適化しました。ウィルキンソン20次多項式等の悪条件な問題に対しても、アルゴリズムの能力を最大限に引き出す堅牢な設計を確立しています。
* **世界基準リファレンスへの刷新**: DKA法およびホーナー法による検算ロジックを統合し、高精度な数値解析エンジンとして基盤を確立。
* **オンライン版（GitHub Pages）**: **Windows, Mac, Linux, Chromebook 等、ほぼ全OS対応**。Webブラウザから即座に動作し、インストール不要です。

---

## 🌐 公式ページ（Web版）

### 日本語版（メイン）

* **Web:** [MethodDka](https://yoshiakikoizumija142397.github.io/MethodDka)
* **Repository:** [MethodDka](https://github.com/YoshiakiKoizumija142397/MethodDka)

### 英語版（English Version）

* **Web:** [MethodDkaEn](https://yoshiakikoizumija142397.github.io/MethodDkaEn)
* **Repository:** [MethodDkaEn](https://github.com/YoshiakiKoizumija142397/MethodDkaEn)

---

## 📁 メインリポジトリ（MethodDka）の構成

```text
MethodDka/
├── main/MethodDka.html              # 高精度版（世界基準リファレンス）
├── factorization/MethodDka.html     # 因数分解専用版（派生ソフトウェア）
├── index.html                       # 公式ランディングページ
└── assets / scripts / styles        # 各種リソース
📦 オフライン版（ZIP）
Download ZIP (v1.0.0-final): MethodDka Source ZIP

🧮 主な機能と技術要件
並列収束アルゴリズム : DKA法による多項式因数分解。

高精度検証（ホーナー法） : 収束誤差 10^-44 を閾値とし、計算結果の信頼性を担保。

計算安全装置 : 10,000回反復によるセーフティネットと、高次計算時のリアルタイム進捗表示。

収束診断機能 : 各解の反復回数および全合計回数の表示。アルゴリズムの診断バロメーター。

ポータビリティ : 外部通信不要の完全オフライン動作対応。

📄 ライセンス
このプロジェクトは MIT License の下で公開されています。

👤 開発者
Yoshiaki Koizumi GitHub: YoshiakiKoizumija142397
