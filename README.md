# もう二度と — 夜の宿・画風試作

Unity 6000.3.23f1 / WebGL。元ゲームとは独立した、夜の宿だけの視点限定モックです。

## 操作

- 03 ドット / 04 月夜 / 05 鉛筆 / ＋厚塗りで画風を切り替え。
- WASD・矢印キー：短い範囲の視点移動。右ドラッグ：見回す。R：基準構図へ復帰。
- E・陽菜ボタン：話す。白い花・宿の灯りも調べられます。台詞は試作専用。
- 参照画像・Space：元の色画像との比較。風・音は切り替え可能。
- ?：操作と今回の範囲。詳細内から奥行きの表示を切り替えられます。

## 表現の実装

1. 生成したゲーム画面から、内蔵image_genでHUDだけを除去。
2. 人物を除いた背景を同じ構図で生成して隠れていた景色を補完。
3. Depth Anything V2 SmallのONNXモデルをローカル実行し、画像の相対的な逆深度を推定。
4. SlimSAMで栞・陽菜の輪郭マスクを作成。髪・服・靴に前景ポイントを置く。
5. 画像座標を50度の透視カメラから逆投影し、UV付きUnityメッシュへ変換。背景約20万三角形。人物は独立した浅いレリーフメッシュ。
6. 元の色をUnlitで描画し、二重の照明計算による絵の変質を避ける。ドット案は実際の3D描画結果を低解像度RenderTextureへ落とし、Point補間で拡大。
7. 浮遊する小さな花びら、暖色部分のわずかな明滅を追加。UIは描画後にHTMLで合成。

単一の板に一枚絵を表示する実装ではありません。ただし、完全な自由歩行3Dモデルでもありません。単眼推定の相対深度を舞台として使っており、距離は実測値ではありません。人物の後ろを補完し、人物と背景がつながって伸びる初版の問題を修正しました。

## 検証の範囲と限界

- この範囲は「元画像の質感をUnity実描画で保つ」ことの検証用。
- 人物は静止したレリーフ。全周モデル、歩行リグ、表情、髪の物理は含みません。
- カメラを大きく移動すると未生成面・推定誤差が見えるため、範囲を制限しています。
- 柱や手すりの細い境界には単眼復元の歪みが残り得ます。
- コラージュや厚塗りの多くはテクスチャに焼き込まれています。元の研究例の全機能を移植したものではありません。
- 04は最初に提示した柔らかい月夜案、＋厚塗りは後で追加した修正版。厚塗りの西洋風遠景は比較素材のままで、世界観設定ではありません。
- データはこのモックの素材・実行ファイルだけ。元ゲームや執筆資料を含みません。

## 参照した制作知識

- [Living Scrolls / World Labs](https://www.worldlabs.ai/labs/showcase/living-scrolls)：絵の筆致を残して空間と動きを加える考え方。原作例はMarble・Tripo・Gaussian splatsを使用。本モックはそれらを使った再現ではなく、Unity向けの深度投影による検証。
- [Moebius NPR](https://github.com/colesloow/moebius_shaders)：Unlitを基礎に色・陰影を管理する構成を参照。ソースコード・素材のコピーはしていません。
- [Depth Anything V2 Small ONNX](https://huggingface.co/onnx-community/depth-anything-v2-small)：Apache-2.0。開発PCで実行。モデル重みはWeb配信に含みません。
- [SlimSAM ONNX](https://huggingface.co/Xenova/slimsam-77-uniform)：Apache-2.0。開発PCで人物マスクを作成。モデル重みはWeb配信に含みません。
- [Unity Web build](https://docs.unity3d.com/6000.0/Documentation/Manual/webgl-building.html)

## 再ビルド

同時に提供したArtStageUnityをUnity 6000.3.23f1で開き、Assets/Scenes/InnArtStage.unityを開いてPlay。
素材差し替え後は Art Stage > Rebuild Scene。Web再ビルドは -batchmode -quit -projectPath <project> -executeMethod ArtStageBuild.Build -buildTarget WebGL。
Builds/Web/Buildの出力をこのフォルダーのBuildへコピーし、HTTPサーバーで配信します。

画像の前処理に使った最終プロンプトはUnityプロジェクト同梱の制作記録に保存しています。
