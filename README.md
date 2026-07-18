# MethodDka — 高速・高精度な因数分解 Web アプリ

MethodDka は、HTML と JavaScript だけで動作する **軽量・高速・高精度な因数分解ツール** です。
DKA法（Durand-Kerner法）を採用し、ホーナー法による検算ロジックを統合した世界基準の高精度数値解析リファレンス（v2.0.0）として設計されています。

---

### 📝 更新状況および今後の予定

* **世界基準リファレンス（v2.0.0）への刷新**: DKA法およびホーナー法による検算ロジックを統合し、高精度な数値解析エンジンとして全エディションの基盤をアップデートしました。
* **技術的正本**: 本メインリポジトリが、DKA法とホーナー法を統合した技術仕様における世界基準（マスター版）です。
* **オンライン版（GitHub Pages）**: **Windows, Mac, Linux, Chromebook, ChromeOS Flex 等、ほぼ全OS対応で実装完了・公開済み**です。Webブラウザから即座に動作し、**インストール作業は一切不要です**（※ブラウザ機能でアプリ化すればオフラインでも利用可能）。日本のスマホ新法環境にも完全対応しており、**Google Play ストア、Apple App Store、Microsoft Store 等からのダウンロードやインストールは一切不要**です。
* **オフライン版（ZIP）**: v2.0.0 に更新済みです。**Edge/Chrome ブラウザを利用すれば iOS でも動作します**（インストール作業は一切不要）。
* **英語版および各派生ソフトウェアへの方針**: 英語版を含む各派生版は本リポジトリの派生であり、エンジン移植を順次進めております。**現時点でこれらの派生版には最新エンジン（高精度検算・誤差表示・安全装置）は未実装となっております。** 最新の計算精度・機能を確認したい場合は、必ず本メインリポジトリの最新版を参照してください。なお、オンライン版・ZIP版が全OSをカバーし、インストール不要で動作するため、急ぎの派生版開発は不要です。

---

## 🌐 公式ページ（Web版）

### 日本語版（メイン）

* **Web:** [MethodDka](https://www.google.com/search?q=https://yoshiakikoizumija142397.github.io/MethodDka)
* **Repository:** [MethodDka](https://github.com/YoshiakiKoizumija142397/MethodDka)

### 英語版（English Version）

* **Web:** [MethodDkaEn](https://www.google.com/search?q=https://yoshiakikoizumija142397.github.io/MethodDkaEn)
* **Repository:** [MethodDkaEn](https://www.google.com/search?q=https://github.com/YoshiakiKoizumija142397/MethodDkaEn)

---

## 📁 メインリポジトリ（MethodDka）の構成

```text
MethodDka/
├── main/MethodDka.html              # 高精度版（世界基準リファレンス）
├── factorization/MethodDka.html     # 因数分解専用版（派生ソフトウェア）
├── index.html                       # 公式ランディングページ
└── assets / scripts / styles        # 各種リソース

```

---

## 📦 オフライン版（ZIP）

GitHub が自動生成する Source code ZIP を利用できます。

* **Download ZIP (v2.0.0):** [MethodDka Source ZIP](https://www.google.com/search?q=https://github.com/YoshiakiKoizumija142397/MethodDka/archive/refs/heads/main.zip)
* **Repository:** [MethodDka](https://github.com/YoshiakiKoizumija142397/MethodDka)

ZIP を展開し、各 `MethodDka.html` を開くだけで、 **インストール作業は一切不要** で動作します（iOS の場合も Edge/Chrome ブラウザで開くことで動作可能です）。

---

## 🔰 バージョン一覧（全エディション）

### 🎯 高精度版（High Precision Edition）

DKA法およびホーナー法による高精度な収束検証を実装した、世界基準のリファレンス実装です。

* **Web:** `main/MethodDka.html`

### ⚡ 因数分解専用版（Factorization Only Edition）

収束誤差の可視化と整数丸め処理を最適化した、実務・研究用派生ソフトウェアです。

* **Web:** `factorization/MethodDka.html`

### 🪟 Windows 11 インストーラ版（MSI / APPX）

* **Repository:** [MethodDkaWIN11](https://github.com/YoshiakiKoizumija142397/MethodDkaWIN11)

### 🐍 Python GUI 版（Tkinter）

2026年の教育言語であるPython環境に対応したGUI版です。

* **Repository:** [MethodDka_Python](https://www.google.com/search?q=https://github.com/YoshiakiKoizumija142397/MethodDka_Python)

### 🖥 C# WPF 版（開発中）

* **Repository:** [MethodDka-CSharp](https://www.google.com/search?q=https://github.com/YoshiakiKoizumija142397/MethodDka-CSharp)

---

## 🚀 使い方と動作環境

1. **Web 版** : ブラウザ（Edge / Chrome 推奨）で開くだけで、 **インストール作業は一切不要** で即座に動作します。
2. **アプリ化（全OS対応）** : ブラウザの機能を使用して「アプリとしてインストール」することで、デスクトップから直接起動でき、オフライン環境でも利用可能です。
3. **オフライン ZIP 版** : ZIP をダウンロードし `MethodDka.html` を開くだけで、 **インストール作業は一切不要** で動作します。

---

## 🧮 主な機能と技術要件

本ツールは、以下の厳格な数理仕様に基づき動作します：

* **並列収束アルゴリズム** : DKA法による多項式因数分解。
* **高精度検証（ホーナー法）** : 収束誤差 `10^-44` を閾値とし、計算結果の信頼性を担保。
* **可視化エンジン** : 誤差半径に基づく結果の自動色分け（正常：緑字、異常：赤字）。
* **数値安定化** : スケーリング処理によるオーバーフロー/アンダーフロー対策。
* **計算安全装置** : 10,000回反復によるセーフティネットと、高次計算時のリアルタイム・ループ進捗表示。
* **ポータビリティ** : 外部通信不要の完全オフライン動作対応。
* **環境適応性** : 日本のスマホ新法にも完全対応したオープンな利用環境（各ストアからのダウンロード・インストール不要）。
* **MITライセンス** : 派生ソフトウェアの開発を広く許容。

---

## 📄 ライセンス

このプロジェクトは MIT License の下で公開されています。

---

## 👤 開発者

**Yoshiaki Koizumi**

GitHub: [YoshiakiKoizumija142397](https://github.com/YoshiakiKoizumija142397)
