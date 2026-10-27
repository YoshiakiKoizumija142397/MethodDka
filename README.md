# MethodDka (最大200次対応�E260桁�E部演算／最大180桁形式�E力�E多頁E��数値解況EWeb アプリ)

[日本語](https://www.google.com/search?q=README.md) \| [English](https://www.google.com/search?q=%23-english-overview)

---

## �E�E 日本語概要E

*MethodDka* は、HTML と JavaScript だけで動作する多頁E��数値解法�E因数刁E�� Web アプリケーションです。�E部演算には Decimal.js の260桁精度を用ぁE��実部は有効数孁E80桁、虚部は $1{0}^{-180}$ の単位で四捨五�Eして表示します。この表示桁数は正しい有効桁数を保証しません、E

DKA法！Eurand-Kerner-Aberth 法）を採用し、`Decimal.js` による **260桁�E部演箁E* を行います。実部は有効数孁E80桁、虚部は $1{0}^{-180}$ の単位で四捨五�Eして表示します。表示桁数は正しい桁数を保証しません、E0次ウィルキンソン多頁E���E既知根 1、E0 とのベンチ�Eーク照合では、ある検証実行�E実部がおよそ247、E58桁一致しました。この結果は当該ベンチ�Eークでの確認であり、他�E入力や実行への精度保証ではありません、E*v3.5.0** では、これまでのユンの平方無因子�E解�E�整数係数のBigInt厳寁E��算およ�E非整数係数の320桁�E琁E��よる重根刁E���E�に加え、�E力�E四捨五�Eを後退誤差の検証基準！E1{0}^{-180}$�E�と完�Eに一致させめE80桁丸め表示を導�E。さらに、残差基準を満たした解を緑色でハイライトする厳寁E��色判定！Eass判定）ロジチE��を実裁E��ました、E

---

## 📋 シスチE��仕槁E(Technical Specifications \- v3.5.0)

| 頁E�� | 詳細仕槁E(v3.5.0 拡張) |
| :---- | :---- |
| **コア解況E* | DKA況E(Durand-Kerner-Aberth Simultaneous Root-Finding Method) |
| **演算精度階層** | **階層型�Eルチ�Eレシジョン設訁E*<br><br>・前�E琁E��ェーズ: 整数係数は **BigInt厳寁E��箁E*、その他�E **320桁固定精度** ($\epsilon =1{0}^{-220}$)<br><br>・後工程ソルバ�E: **260桁�E部演箁E/ 最大180桁形式で出劁E*�E�E0桁�Eガード桁、スケール後�E補正量閾値 $\epsilon =1{0}^{-220}$。�E力桁数は正しい有効桁数を保証しません�E�E|
| **精度の解釁E* | 実部は有効数孁E80桁、虚部は $1{0}^{-180}$ の単位で四捨五�Eして出力します。これ�E表示形式であり、正しい有効桁数の保証ではありません、E0次ウィルキンソン多頁E��との照合結果はそ�Eベンチ�Eークに限った数値確認です。正規化残差は後退誤差の数値持E��です。例えば残差 $1{0}^{-307}$ は「根ぁE07桁正しい」ことを意味せず、有効桁数を認証するも�Eでもありません、E|
| **自動前処琁E(GCD)** | **ユンの平方無因子�E解 (Yun's Square-free Decomposition)**<br><br>・微刁E��頁E��E$P'(x)$ とのユークリチE��互除法による $\gcd (P,P')$ の算�E<br><br>・整数係数ではBigInt擬似剰余�Eを使った厳寁ECD、それ以外では320桁精度と動的多頁E��除箁E(`polyDivide`) を用ぁE��重褁E��別の平方無因子群 ${Q}_{k}(x)$ を抽出<br><br>・重褁E�� $m$ の自動計算と結果の展開処琁E|
| **セーフティガード機槁E* | 吁E��頁E��除算�E余り、因子�E平方無因子性、E��褁E��を反映した再構�E次数を検証。失敗時は診断ログを�Eして允E��頁E��をDKAへ渡す、E|
| **数値安定化** | 非整数係数の前�E琁E��各DKA因子をそれぞれモニック化し、Fujiwara根上界に基づく変数スケール $x=Sy$ を適用 |
| **初期値配置** | スケール済み変数 $y$ の冁E��上にAberth初期値を�E置 |
| **対応最高次数** | 最髁E200 次 ($n\leq 200$) |
| **多頁E��評価** | ホ�Eナ�E況E(Horner's Method) による高精度多頁E��直評価 |
| **セーフティロチE��** | 反復上限の既定値は因子ごとに **5,000囁E*�E��E力欁E��10、E0,000回に設定可能�E�。上限到達時はそ�E時点の解と最終補正量を出劁E|
| **結果処琁E* | 実部昁E��E��ート、褁E��数表訁E($a+bi$)、E��褁E��表示、DKA最終補正量、各根の正規化残差、�E根からの係数再構�E残差を表示。反復収束と検査結果を別、E��報告します、E*残差 $\leq 1{0}^{-180}$ を満たした解は厳格な精度要件をクリアしたも�Eとして「Pass�E�緑色�E�」でハイライト表示されます、E* |
| **動作環墁E* | 計算�Eクライアントサイド！ETML5 / JavaScript ES6+�E�。計算画面は高精度演算ライブラリ `Decimal.js` をCDNから読み込むため、未キャチE��ュ時�E読み込みにはネットワーク接続が忁E��。任意�EGemini Pro解説にもネチE��ワーク接続が忁E��E|

---

## 🚀 主な機�Eと特徴 (v3.5.0)

1. **表示と判定�E琁E��的整合性 (v3.5.0 新機�E)**:

   - 収束保証の閾値である「後退誤差 $1{0}^{-180}$ 以下」に合わせて、最終�E力を180桁で四捨五�Eする仕様に最適化。保証限界を趁E��めE81桁目以降�E揺らぎを排除し、正確で美しぁE��の表示を実現しました、E 
   - 反復数にかかわらず、残差 $\leq 1{0}^{-180}$ を満たす根は「収束完亁E��とみなし、画面上で直感的に確認できる緑色のPass判定を行います、E 
2. **ユンの平方無因子�E解**:

   - 整数係数はBigIntによる厳寁E��GCD・多頁E��除算で、それ以外�E320桁精度と $\epsilon =1{0}^{-220}$ で処琁E��、同じ重褁E��を持つ根の因子群 ${Q}_{k}(x)$ を�E離します。各群の平方無因子性と允E�E次数の再構�Eを検証します、E 
3. **動的トラチE��ング型多頁E��長除況E*:

   - 歯抜けの多頁E��や次数が激しく変動する演算過程においても、常に最高次数を監視し次数差 (`shift`) を動皁E��計算して啁E�E正しい位置に係数を書き込む最強の除算アルゴリズムを実裁E��インチE��クスのズレを永乁E��追放、E 
4. **検証付きフォールバック**:

   - 割り算�E余り、平方無因子性、�E構�E次数のぁE��れかが検証を通らなぁE��合�E診断をログへ出し、�E多頁E��を既存DKAへ渡します。正常に刁E��できた混在重根は重褁E��別に個別計算します、E 
5. **オートスケーリング付きDKA**:

   - 非整数係数の前�E琁E��吁E��方無因子因子�EDKAで、Fujiwara上界 $S=2\max_i \vert{}a_i\vert{}^{1/i}$ を使って $x=Sy$ に変数変換します。因子�E解後�E因子を允E�E変数へ戻し、DKAは吁E��子を再スケールして解き、根と最終補正量を允E�E尺度へ戻します。補正量�E真�E誤差を保証するも�Eではなく、スケーリングも�Eての多頁E���E収束を保証するも�Eではありません、E 
6. **Pro チE��チE��アナライザ (冁E��可視化モーチE**:

   - 前�E琁E�E全スチE��プ（�E劁E$P(x)$、微刁E$P'(x)$、GCD $G(x)$、縮紁E��E$Q(x)$、余り最大値、E��褁E��判定）を画面上�E専用黒背景パネルにリアルタイムダンプし、E��発・検証を強力にサポ�Eト、E 
7. **リアルタイム進捁E�E�Eタイマ�E UI**:

   - 反復ループ進捗率�E�E�E�、経過時間�E�Ehh:mm:ss`�E�、推定残り時間、完�E収束数をリアルタイムに画面描画、E 
8. **柔軟な一括ペ�Eスト機�E �E�E多言語対忁E*:

   - 降頁E��Ea_n \dots a_0$�E�係数のカンマ�E空白区刁E��一括ペ�Eスト、およ�E日本誁E/ English の瞬時言語�E替に対応、E 
9. **クライアントサイド計算�Eプライバシー保護**:

   - 多頁E��計算�Eブラウザー冁E��実行、Eemini解説を利用しなぁE��り、係数めE��算結果を外部へ送信しません、E 
10. **Gemini Proによる任意�EAI解説**:

- 計算結果を日本語また�E英語で解説。利用老E��実行した場合�Eみ係数と解をGoogle Gemini APIへ送信し、APIキーは送信時に入力欁E��ら消去して保存しません、E

---

## 📦 配信・配币E��慁E(Distribution Formats)

本プロジェクト�E、用途と環墁E��合わせて以下�E3つの形態で配币E��てぁE��す、E

1. **オンライン版！EitHub Pages�E�E v3.5.0**  
- **全OS対忁E*。インスト�Eル不要で、ブラウザからアクセスするだけで最新版が即座に利用可能です、E 
2. **オフライン版！EIPファイルダウンロード！E v3.5.0**  
- **全OS対忁E*。リポジトリからZIPファイルをダウンロードして解凍し、ローカル環墁E�� `MethodDka.html` をブラウザで開くことで、オフラインでも動作します（※初回ライブラリ読み込みやAI解説機�Eを除く）、E 
3. **インスト�Eラ版！ESIパッケージ�E�E v3.4.1 (Stable)**  
- **Windows 11 26H2 正式対忁E*の完�Eオフライン版、Electron Builderを用ぁE��ビルドされたWindows向けのネイチE��ブインスト�Eラです、E 
- *※セキュリチE��警告！EmartScreen等）対策やコード署名�E検証を�E重に行うため、MSI版�E安定稼働実績のある v3.4.1 を継続提供してぁE��す、E

---

## ⏱ 動作パフォーマンス �E�E推奨動作環墁E��実測例！E

**【検証環墁E��Eindows 11 Home / 第8世代 Intel Core i7 / 16GB RAM�E�、E*

- **重根チE��トケース $({x}^{2}+1{)}^{2}=0$ (${x}^{4}+2{x}^{2}+1=0$)**:

  - **前�E琁E*: 整数係数をBigIntで厳寁E��処琁E��、一瞬で GCD \= ${x}^{2}+1$、E��褁E�� 2 を検�E、E 
  - **総計算時閁E*: **\< 0.01 私E(一瞬)**  
  - **結果**: 4つの解�E�E+i,+i,-i,-i$�E�を取得。表示する補正量�EDKAの最終反復補正であり、真の誤差の保証ではありません、E 
- **20次ウィルキンソン多頁E��E${W}_{20}(x)=\prod\limits_{i=1}^{20}(x-i)$**:

  - **実測例！E回�E実行！E*: 上記検証環墁E��の経過時間 **00:00:07**、因子反復合訁E**110囁E*、反復収束 **20/20**、正規化残差チェチE���E�E\leq 1{0}^{-180}$�E�E**20/20**、係数再構�E誤差 **$2.8046\times 1{0}^{-247}$**。最大の最終補正量（推定）�E **$2.5735\times 1{0}^{-246}$**�E�解16�E�でした、E 
- **50次ウィルキンソン多頁E��E${W}_{50}(x)=\prod\limits_{i=1}^{50}(x-i)$**:

  - **実測例！E回�E実行！E*: 上記と同じ検証環墁E��、経過時間 **00:01:56**、因子反復合訁E**308囁E*、反復収束 **50/50**、正規化残差チェチE���E�E\leq 1{0}^{-180}$�E�E**50/50**、係数再構�E誤差 **$2.2324\times 1{0}^{-220}$** でした、E 
- **100次ウィルキンソン多頁E��E${W}_{100}(x)=\prod\limits_{i=1}^{100}(x-i)$**:

  - **v3.5.0 実測例（反復上限1,000回での1回�E実行！E*: 経過時間 **00:24:47**、因子反復合訁E**1,000囁E*。UIの判定ロジチE��により、正規化残差チェチE���E�E\leq 1{0}^{-180}$�E�を **100/100** で合格、E80桁�E丸め�E琁E��より、E*全100個�E解が「完�Eな整数 1、E00」として表示され、画面上でも�E解がPass�E�緑色�E�と判定される歴史皁E�E极E*を達成しました。係数再構�E誤差は **$2.1544\times 1{0}^{-186}$** でした、E 
- 時間・反復回数・補正量�E環墁E��実行ごとに変動します。最終補正量と残差・係数再構�E誤差は数値持E��であり、真の誤差めE��示された桁�E正しさを保証するも�Eではありません、E

---

## 🎧 応用侁E ハイレゾ対応オーチE��オ用チE��タルチャンネルチE��イダー

本アプリの数値計算エンジンは、EWAYスピ�Eカー **SONY SS-CS5** のネットワークをバイパスし、�Eルチアンプ駁E��へ転用するFIRフィルター設計への応用例があります。�E力桁数めE��差は正しい有効桁数・誤差の保証ではなぁE��め、設計用途では独立した検証と実機での安�E確認が忁E��です、E

---

## 🧪 チE��ト手頁E

1. [MethodDka Live Demo](https://yoshiakikoizumija142397.github.io/MethodDka/) にアクセス、E 
2. 重根チE��ト用係数�E�侁E `1, 0, 2, 0, 1`�E�やウィルキンソン係数を「係数一括ペ�Eスト」欁E��貼り付けて「一括反映」をクリチE��、E 
3. 「🚀 高精度数値計算開始！」�Eタンを押下し、Proアナライザのログと計算結果を確認、E 
4. Gemini解説を試す場合�E、計算結果欁E��自刁E�EGemini APIキーを�E力して解説を依頼します。依頼時に係数と計算結果がGoogleへ送信されます、E

---

---

# 📄 ソフトウェア開発要求仕様書 (SRS: Software Requirements Specification)

**プロジェクト名**: MethodDka (v3.5.0) **斁E��種別**: シスチE��要件定義・設計仕様書

## 1\. 概要と開発目皁E

本仕様書は、Webブラウザー上で動作する最髁E00次・260桁�E部演算�E多頁E��数値解法シスチE�� *MethodDka* v3.5.0 の機�E要件、E��機�E要件、およ�EアーキチE��チャ設計を定義する。実部は有効数孁E80桁、虚部は $1{0}^{-180}$ の単位で四捨五�Eして表示します。表示桁数は正しい有効桁数の保証ではありません、E0次ウィルキンソン多頁E���E既知根とのベンチ�Eーク照合では、検証した実行で実部が紁E47、E58桁一致しました。この結果は当該チE��トに限った確認です。v3.5.0では表示形式と判定基準�E整合性�E�E80桁丸め�E緑色Pass判定）を確立し、ユンの平方無因子�E解を利用して異なる重褁E��を持つ根を平方無因子因子群へ刁E��て、既存DKAエンジンで個別に解きます、E

## 2\. シスチE��アーキチE��チャ �E�E精度階層設訁E

本シスチE��は、前処琁E��後工程�E間で明確な精度ギャチE�E�E�Erecision Hierarchy�E�を設けた2段階パイプライン構造を採用する、E

1. **前�E琁E��ェーズ (Pre-processing Pipeline)**

   - **演算精度**: 整数係数はBigInt厳寁E��算、それ以外�E `Decimal.set({ precision: 320 })`  
   - **閾値仕槁E*: 整数係数は厳寁E��り�Eれ性、それ以外�E $\epsilon =1{0}^{-220}$  
   - **主要機�E**:  
     - 整数係数はBigInt擬似剰余GCDと厳寁E��頁E��除算によるユン刁E��  
     - 非整数係数は微刁E��頁E��生戁E(`derivativePoly`)、ユークリチE��互除況E(`polyGCD`)、動皁E��頁E��除箁E(`polyDivide`) によるユン刁E��  
     - 重褁E�� $k$ 別の平方無因子因孁E${Q}_{k}(x)$ の抽出  
     - 割り算�E余り、平方無因子性、E��み付き再構�E次数の検証  
2. **後工程ソルバ�Eフェーズ (DKA Engine Pipeline)**

   - **演算精度**: `Decimal.set({ precision: 260 })` (出劁E180有効桁、E0ガード桁E  
   - **閾値仕槁E*: スケール空間�E補正釁E$\epsilon =1{0}^{-220}$  
   - **主要機�E**: 前�E琁E��検証された各平方無因子因孁E${Q}_{k}(x)$ を一つずつ既存�EDurand-Kerner-Aberth法へ渡し、計算結果を重褁E�� $k$ に従って展開・統合する。�E解検証に失敗した場合�Eログを�Eして允E��頁E��を渡す、E

## 3\. 前�E琁E��ジュール詳細設訁E

### 3.1 動的トラチE��ング型多頁E��長除況E(`polyDivide`)

- 降頁E�E刁E`[a_n, ..., a_0]` において、次数差 `degA - degB` に基づき、E��算�E吁E��チE��プで正確に啁E�E係数配�E `Q` の正しいインチE��クス位置へ係数を書き込む、E 
- 途中で係数ぁE0 に収束するケースでも、E�E列�E破綻を防ぐために `trimLeadingZeros` による動的トリミングを常時実行する、E

### 3.2 堁E��なユークリチE��互除況E(`polyGCD`)

- 割る数 ${B}_{curr}$ の次数ぁE0 になるか、また�E余りの最大絶対値ぁE$\epsilon =1{0}^{-220}$ 以下に達するまでループを実行、E 
- 割り�Eれた瞬間�E「割る数�E�E{B}_{curr}$�E�」を真�E最大公紁E��頁E��E$G(x)$ として厳寁E��返却する、E

### 3.3 ユン刁E��の検証とフォールバック機槁E

- 吁E��子�E除算余りぁE$\epsilon$ 以下であること、因子とそ�E導関数のGCDが定数であることを検証する、E 
- $\sum\limits_{k}^{}k\cdot \deg ({Q}_{k})=\deg (P)$ および残余GCDが定数であることを検証する、E 
- 検証に失敗した場合�E診断ログを表示し、�E多頁E��をDKAエンジンへ引き渡す。混在重根を次数比で拒否しなぁE��E

## 4\. ユーザーインターフェース (UI) 要件

- **厳格な色判定表示**: 後退誤差�E�残差�E�E$\leq 1{0}^{-180}$ を満たす根は、反復回数上限到達�E有無にかかわらず「収束！Eass�E�」とみなし、緑色でハイライトする、E 
- **Pro チE��チE��アナライザ**: 冁E��処琁E�E吁E��チE��プ（�E力、微刁E��GCD、縮紁E��、余り、E��褁E���E�を構造化テキストとして画面上にトグル表示、E 
- **リアルタイム進捗パネル**: 反復ループ回数、経過時間、E��捗率プログレスバ�Eを動皁E��画、E 
- **多言語対忁E*: 日本語およ�E英語�E瞬時�E替機�E、E

---

## �E�E English Overview (v3.5.0)

*MethodDka* is a high-precision polynomial solver powered by the Durand-Kerner-Aberth (DKA) method and `Decimal.js`. Version 3.5.0 optimizes the UI display rounding to 180 digits to perfectly match the $1{0}^{-180}$ residual threshold, alongside implementing a green-highlight validation logic for roots that successfully pass this strict backward-error check. It builds upon Yun's square-free decomposition (introduced in v3.4.0), using exact BigInt arithmetic for integer coefficients and 320-digit preprocessing ($\epsilon =1{0}^{-220}$) otherwise. It separates factors by root multiplicity before passing each verified square-free factor to the existing DKA engine. Factor square-freeness and reconstructed degree are checked; failed validation is logged and falls back to solving the original polynomial.

---

## 🌐 公式�Eージ �E�Eリポジトリ

- **Web アプリ (Live Demo):** [MethodDka Live Demo](https://yoshiakikoizumija142397.github.io/MethodDka/)  
- **GitHub リポジトリ:** [MethodDka Repository](https://github.com/YoshiakiKoizumija142397/MethodDka)

---

## 📜 ライセンス �E�E開発老E��報

- **開発老E*: 小泉�E章 (Yoshiaki Koizumi)  
- **バ�Eジョン**: v3.5.0 (※MSI Installer Version: v3.4.1)  
- **ライセンス**: MIT License

# MethodDka (Up to Degree 200, 260-Digit Internal Arithmetic, Up to 180-Digit-Format Output; Correct Digits Not Guaranteed)

[日本語](https://www.google.com/search?q=README.md) \| [English](https://www.google.com/search?q=%23-english-overview)

---

## �E�E English Overview

*MethodDka* is a polynomial numerical solver and factorization web application operating on HTML and JavaScript. It uses 260-digit internal arithmetic, displays the real part to 180 significant digits, and rounds the imaginary part to the nearest $1{0}^{-180}$. Output length does not guarantee correct significant digits. In a tested degree-20 Wilkinson benchmark against the known roots 1 E0, real parts agreed to approximately 247 E58 digits; this validates that benchmark run only, not other inputs or executions.

It uses the DKA method (Durand-Kerner-Aberth) with **260-digit internal arithmetic** powered by `Decimal.js`. The real part is displayed to 180 significant digits, while the imaginary part is rounded to the nearest $1{0}^{-180}$ and shown with 180 decimal places. Output length does not guarantee correct digits. In a tested degree-20 Wilkinson benchmark against the known roots 1 E0, real parts agreed to approximately 247 E58 digits; this validates that benchmark run only, not other inputs or executions. Version 3.5.0 normalizes the display rounding to 180 digits to match the strict backward-error check threshold ($\leq 1{0}^{-180}$), adding a green-highlight pass validation for these roots. It also leverages **Yun's square-free decomposition** (from v3.4.0), using exact BigInt arithmetic for integer coefficients and 320-digit preprocessing ($\epsilon =1{0}^{-220}$) otherwise. It separates roots with different multiplicities into square-free factors ${Q}_{k}(x)$ and sends each verified factor to the existing DKA engine. Factor square-freeness and reconstructed degree are validated; failures are logged and fall back to the original polynomial.

---

## 📋 System Specifications (Technical Specifications \- v3.5.0)

| Item | Detailed Specifications (v3.5.0 Expansion) |
| :---- | :---- |
| **Core Solver** | DKA Method (Durand-Kerner-Aberth Simultaneous Root-Finding Method) |
| **Arithmetic Precision Hierarchy** | **Hierarchical Multi-precision Design**<br><br>・ Preprocessing Phase: **Exact BigInt arithmetic** for integer coefficients; otherwise **fixed 320-digit precision** ($\epsilon =1{0}^{-220}$)<br><br>・ Post-process Solver: **260-digit internal precision / output formatted to at most 180 significant digits** (80 guard digits; scaled correction threshold $\epsilon =1{0}^{-220}$; output length does not guarantee correct digits) |
| **Automatic Preprocessing (GCD)** | **Yun's Square-free Decomposition**<br><br>・ Calculation of $\gcd (P,P')$ using the Euclidean algorithm with derivative polynomial $P'(x)$<br><br>・ Extraction of multiplicity-specific square-free factors ${Q}_{k}(x)$ using exact BigInt pseudo-remainder sequences for integer coefficients, or 320-digit arithmetic and dynamic polynomial division (`polyDivide`) otherwise<br><br>・ Automatic calculation of multiplicity $m$ and result expansion processing |
| **Safety Guard Mechanism** | Validates division remainders, square-freeness of each factor, and reconstructed degree. On failure, logs diagnostics and passes the original polynomial to DKA. |
| **Numerical Stabilization** | Non-integer preprocessing and each DKA factor are scaled independently with $x=Sy$, using a Fujiwara root bound |
| **Initial Value Placement** | Aberth initial values are placed on a circle in the scaled variable $y$ |
| **Supported Maximum Degree** | Up to 200th degree ($n\leq 200$) |
| **Polynomial Evaluation** | High-precision direct polynomial evaluation via Horner's Method |
| **Safety Lock** | Default limit of **5,000 iterations per factor** (configurable from 10 to 50,000 in the input); outputs the current roots and final correction magnitudes when the limit is reached |
| **Result Processing** | Real part ascending sort, complex number notation ($a+bi$), multiplicity display, final DKA correction, per-root normalized residual, and coefficient reconstruction residual from the full root set. **Roots passing the $\leq 1{0}^{-180}$ residual check are highlighted in green (Pass).** |
| **Operating Environment** | Calculations run client-side (HTML5 / JavaScript ES6+). The calculation page loads `Decimal.js` from a CDN, so an internet connection is required unless the library is cached; optional Gemini Pro explanations also require an internet connection |

---

## 🚀 Key Features & Highlights (v3.5.0)

1. **Display & Validation Normalization (New in v3.5.0)**:

   - Output display is now perfectly rounded to 180 digits to match the strict backward-error verification standard ($1{0}^{-180}$), eliminating micro-fluctuations in the output and presenting beautiful, exact roots. Roots fulfilling this residual criteria are indicated with a green highlight (Pass status) on the UI.  
2. **Yun Square-Free Decomposition**:

   - Exact BigInt GCD and division are used for integer coefficients; otherwise 320-digit precision and $\epsilon =1{0}^{-220}$ are used. Root groups ${Q}_{k}(x)$ are separated by multiplicity, then square-freeness and degree reconstruction are checked.  
3. **Dynamic Tracking Polynomial Long Division**:

   - Implements a powerhouse division algorithm that constantly monitors the highest degree and dynamically calculates degree differences (`shift`) to write coefficients into the correct index positions of the quotient coefficient array `Q`, even during calculation processes with sparse polynomials or volatile degree fluctuations. Index misalignment is permanently banished.  
4. **Intelligent Safety Guard**:

   - If division remainders, factor square-freeness, or degree reconstruction fail validation, diagnostics are logged and the original polynomial is passed to the existing DKA engine. Mixed-multiplicity factors that validate are solved separately.  
5. **Auto-scaled DKA**:

   - Non-integer preprocessing and each square-free factor are made monic and scaled with the Fujiwara bound $S=2\max_i \vert{}a_i\vert{}^{1/i}$ using $x=Sy$. Factors are converted back after decomposition; DKA rescales each factor and converts roots and final correction magnitudes back to the original variable. A correction magnitude is not a bound on the true error, and scaling does not guarantee convergence for every polynomial.  
6. **Pro Debug Analyzer (Internal Visualization Mode)**:

   - Real-time dumping of all preprocessing steps (input $P(x)$, derivative $P'(x)$, GCD $G(x)$, reduced expression $Q(x)$, maximum remainder, multiplicity determination) onto a dedicated black-background panel on screen, powerfully supporting development and verification.  
7. **Real-Time Progress & Timer UI**:

   - Real-time rendering of iterative loop progress percentage (%), elapsed time (`hh:mm:ss`), estimated remaining time, and complete convergence count.  
8. **Flexible Batch Paste & Multilingual Support**:

   - Supports batch pasting of descending ($a_n \dots a_0$) coefficient comma/space-delimited values, alongside instant language toggling between Japanese and English.  
9. **Client-side Calculation & Privacy**:

   - Polynomial calculations run in the browser. Coefficients and results are not sent externally unless the optional Gemini explanation is requested.  
10. **Optional Gemini Pro AI Explanations**:

- Get explanations in Japanese or English. Coefficients and roots are sent to the Google Gemini API only when requested; the API key field is cleared on submission and the key is not saved.

---

## 📦 Distribution Formats

This project is distributed and provided in the following three formats to best suit your environment:

1. **Online Version (GitHub Pages): v3.5.0**  
- **Supports all OS**. No installation required; instantly accessible directly from your browser.  
2. **Offline Version (ZIP Download): v3.5.0**  
- **Supports all OS**. Download the ZIP file from the repository, extract it, and open `MethodDka.html` in your browser to run it locally (offline usage supported, excluding initial library loading and AI explanation features).  
3. **Installer Version (MSI Package): v3.4.1 (Stable)**  
- **Fully offline version officially supporting Windows 11 26H2**. A native Windows installer built with Electron Builder, allowing you to use it comfortably as a desktop application.  
- *(Note: To ensure code signing and SmartScreen verification, the MSI version remains at the highly stable v3.4.1 release.)*

---

## ⏱ Operational Performance & Recommended Environment (Measured Example)

**Precision interpretation:** The 180 digits describe the output format, not guaranteed correct significant digits. A normalized residual is a numerical backward-error indicator; for example, a residual of $1{0}^{-307}$ does not mean that 307 digits of the root are correct and does not certify any number of correct digits.

**【Test Environment (Windows 11 Home / 8th Gen Intel Core i7 / 16GB RAM)、E*

- **Multiple Root Test Case $({x}^{2}+1{)}^{2}=0$ (${x}^{4}+2{x}^{2}+1=0$)**:

  - **Preprocessing**: Instantly detects GCD \= ${x}^{2}+1$ and multiplicity 2 via 320-digit precision.  
  - **Total Calculation Time**: **\< 0.01 seconds (Instantaneous)**  
  - **Result**: All 4 roots ($+i,+i,-i,-i$) are obtained. The displayed correction is the final DKA iteration correction, not a bound on the true error.  
- **20th-Degree Wilkinson Polynomial ${W}_{20}(x)=\prod\limits_{i=1}^{20}(x-i)$**:

  - **Measured example (one run)**: On the test environment above, elapsed time was **00:00:07**, with **110** total factor iterations; **20/20** roots converged and **20/20** passed the normalized residual check ($\leq 1{0}^{-180}$). The coefficient reconstruction error was **$2.8046\times 1{0}^{-247}$**, and the largest estimated final correction was **$2.5735\times 1{0}^{-246}$** (root 16).  
- **50th-Degree Wilkinson Polynomial ${W}_{50}(x)=\prod\limits_{i=1}^{50}(x-i)$**:

  - **Measured example (one run)**: On the same test environment, elapsed time was **00:01:56**, with **308** total factor iterations; **50/50** roots converged and **50/50** passed the normalized residual check ($\leq 1{0}^{-180}$). The coefficient reconstruction error was **$2.2324\times 1{0}^{-220}$**.  
- **100th-Degree Wilkinson Polynomial ${W}_{100}(x)=\prod\limits_{i=1}^{100}(x-i)$**:

  - **v3.5.0 measured example (one run with a 1,000-iteration cap)**: Elapsed time was **00:24:47**, with **1,000** total factor iterations. **100/100** roots brilliantly passed the normalized residual check ($\leq 1{0}^{-180}$). Thanks to the new 180-digit rounding and validation logic, **all 100 roots perfectly resolved as integers 1 to 100 and were highlighted in green as Passed.** The coefficient reconstruction error was **$2.1544\times 1{0}^{-186}$**.  
- Time, iteration count, and correction vary by environment and run. Final corrections, residuals, and coefficient reconstruction errors are numerical indicators; they do not bound the true error or guarantee the correctness of the displayed digits.

---

## 🎧 Application Example: Digital Channel Divider for Hi-Res Audio

The numerical engine has been used as an example in FIR filter design for a multi-amplifier setup using the 3-way speaker **SONY SS-CS5**. The displayed digits and residual checks do not certify filter accuracy; designs for real equipment require independent validation and safe testing.

---

## 🧪 Testing Procedure

1. Access the [MethodDka Live Demo](https://yoshiakikoizumija142397.github.io/MethodDka/).  
2. Paste multiple root test coefficients (e.g., `1, 0, 2, 0, 1`) or Wilkinson coefficients into the "Coefficient Batch Paste" field and click "Apply All".  
3. Press the "🚀 Start High-Precision Numerical Calculation\!" button to check the Pro Analyzer logs and calculation results.  
4. To try Gemini explanations, enter your Gemini API key in the results panel and request an explanation. The coefficients and results are sent to Google for that request.

---

---

# 📄 Software Requirements Specification (SRS)

**Project Name**: MethodDka (v3.5.0) **Document Type**: System Requirements Definition & Design Specification

## 1\. Overview and Development Objectives

This specification defines *MethodDka* v3.5.0, a browser-based polynomial numerical solver supporting up to degree 200 and using 260-digit internal arithmetic. Roots are normally rounded to 15 digits; components below $0.5\times 1{0}^{-180}$ in magnitude are shown as 0\. Computed values of up to 180 digits are available in a details section, but neither display guarantees correct significant digits. Version 3.5.0 standardizes the output to 180 digits to match the $\leq 1{0}^{-180}$ residual validation. It continues to use Yun's square-free decomposition, using exact BigInt arithmetic for integer coefficients and 320-digit preprocessing ($\epsilon =1{0}^{-220}$) otherwise, separating mixed multiplicities into verified square-free factors before reusing the existing DKA solver.

## 2\. System Architecture & Precision Hierarchy Design

This system adopts a two-stage pipeline structure with a distinct precision hierarchy established between the preprocessing and post-processing stages.

1. **Preprocessing Phase (Pre-processing Pipeline)**

   - **Arithmetic Precision**: Exact BigInt arithmetic for integer coefficients; otherwise `Decimal.set({ precision: 320 })`  
   - **Threshold Specification**: Exact divisibility for integer coefficients; otherwise $\epsilon =1{0}^{-220}$  
   - **Key Functions**:  
     - For integer coefficients: Yun decomposition using exact BigInt pseudo-remainder GCD and polynomial division  
     - For non-integer coefficients: derivative polynomial generation (`derivativePoly`), Euclidean GCD (`polyGCD`), and dynamic polynomial division (`polyDivide`)  
     - Extraction of square-free factor ${Q}_{k}(x)$ for each multiplicity $k$  
     - Validation of exact divisibility or decimal division remainders, square-freeness, and weighted reconstructed degree  
2. **Post-process Solver Phase (DKA Engine Pipeline)**

   - **Arithmetic Precision**: `Decimal.set({ precision: 260 })` (output formatted to at most 180 significant digits with 80 guard digits; correct digits are not guaranteed)  
   - **Threshold Specification**: Scaled-variable correction $\epsilon =1{0}^{-220}$  
   - **Key Functions**: Sends each verified square-free factor ${Q}_{k}(x)$ to the existing Durand-Kerner-Aberth solver sequentially and expands results by multiplicity $k$. On validation failure, logs diagnostics and sends the original polynomial.

## 3\. Preprocessing Module Detailed Design

### 3.1 Dynamic Tracking Polynomial Long Division (`polyDivide`)

- In descending arrays `[a_n, ..., a_0]`, based on the degree difference `degA - degB`, coefficients are written precisely to the correct index positions of the quotient coefficient array `Q` at each division step.  
- Dynamic trimming via `trimLeadingZeros` is constantly executed to prevent array breakdown even in cases where coefficients converge to 0 midway.

### 3.2 Robust Euclidean Algorithm (`polyGCD`)

- For non-integer coefficients, loops execute until the degree of the divisor ${B}_{curr}$ becomes 0 or the maximum absolute value of the remainder falls below or equals $\epsilon =1{0}^{-220}$.  
- Integer coefficients use an exact BigInt pseudo-remainder sequence and exact polynomial division, avoiding tolerance-based GCD decisions.  
- The resulting GCD and Yun factors are checked for square-freeness and weighted degree reconstruction.

### 3.3 Yun Decomposition Validation and Fallback

- For non-integer coefficients, validate that each division remainder is at most $\epsilon$; integer-coefficient divisions are checked for exact divisibility. All factors are checked for square-freeness and the residual GCD must be constant.  
- Validate the weighted degree identity $\sum\limits_{k}^{}k\cdot \deg ({Q}_{k})=\deg (P)$.  
- On validation failure, log diagnostics and hand the original polynomial to DKA; mixed multiplicities are no longer rejected by a degree-ratio check.

## 4\. User Interface (UI) Requirements

- **Strict Color Validation**: Roots satisfying the residual $\leq 1{0}^{-180}$ condition are visually highlighted in green (Pass), regardless of iteration limits.  
- **Pro Debug Analyzer**: Toggle display of internal processing steps (input, derivative, GCD, reduced expression, remainder, multiplicity determination) on screen as structured text.  
- **Real-Time Progress Panel**: Dynamic rendering of iterative loop count, elapsed time, and progress bar percentage.  
- **Multilingual Support**: Instant switching capability between Japanese and English.

---

## 🌐 Official Page & Repository

- **Web App (Live Demo):** [MethodDka Live Demo](https://yoshiakikoizumija142397.github.io/MethodDka/)  
- **GitHub Repository:** [MethodDka Repository](https://github.com/YoshiakiKoizumija142397/MethodDka)

---

## 📜 License & Developer Information

- **Developer**: Yoshiaki Koizumi  
- **Version**: v3.5.0 (※MSI Installer Version: v3.4.1)  
- **License**: MIT License
