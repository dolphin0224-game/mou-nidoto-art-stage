# v8 小庭園の素材と実装

目的：人物1人、白薔薇、柱、石畳の範囲で、描き込みと歩行可能な3Dを両立する品質試作。

## 構成
- HeroGarden.cs：立体の柱・軒・縁側、曲面状の植物カード、奥行きを分けた庭園、遠景。
- HeroSurface.shader：青い夜光と暖色の統一、石畳の近似的な濡れ反射、葉先の微動。
- 植物はアルファ付き画像を複数方向・複数深度に置く。全方向から個々の花を観察できる完全な植物モデルではない。
- 壁の細部は正投影の描き込み素材。柱・軒・縁側は立体で、その前に出る。多視点AI復元を実装したわけではない。
- 人物は旧VRoid CC0サンプル1体。造形は据え置きで材質・環境との馴染みを調整。
- 移動範囲 X=-1.35〜1.25 / Z=-1〜5.3。人物の周囲には0.48mの簡易侵入制限。左右360度見回し可能。

## 素材生成
内蔵 image_gen を使用。生成画像の切り抜き再加工は行わず、UnityのUV指定で各領域を使用。保存先は Assets/Resources/HeroFlora.png / HeroFacade.png / HeroStone.png。

### HeroFlora.png
A production game foliage sprite atlas on a genuinely TRANSPARENT background (alpha), square 2048 x 2048, FOUR separate botanical clusters arranged in a 2x2 grid with clear empty transparent gutters. No labels, no border, no ground plane, no rectangular backgrounds. Each quadrant contains ONE isolated natural cluster fully inside its quadrant. TOP LEFT: an airy bush of white garden roses with five layered cream-white blossoms, pale blue moonlit petal edges, intricate dark teal rose leaves and thin arching stems, varied bloom angles, open gaps through the leaves. TOP RIGHT: a graceful climbing white rose branch with three half-open blossoms, small buds, dark blue green serrated leaves, reaching diagonally upward. BOTTOM LEFT: a bush of fine dark blue green fern fronds, small grasses, and a few tiny white wildflowers, intricate lacy silhouette, open spaces. BOTTOM RIGHT: a hanging arch of slender tree branches with intricate dark indigo leaves, a few pale blossoms, transparent spaces, delicate silhouette. Sophisticated Japanese anime background art, softly hand-painted realism for plants, elegant intricate details rather than simplified cartoon shapes. Nighttime muted indigo palette, white rose petals remain luminous but not glowing. Soft cool directional moonlight and restrained warm highlights, no hard cast shadow. Optimized isolated plant cutouts to layer through a 3D moonlit inn garden. Every leaf and stem surrounded by actual alpha transparency.

### HeroFacade.png
Production environment texture for a finely painted Japanese mystery game. A single traditional old Japanese inn facade, seen EXACTLY front-on in orthographic elevation, absolutely no perspective, no ground or sky, no people, no plants, no text. Wide landscape 3:2 image, edge-to-edge architectural surface. Four tall narrow shoji door panels in the middle/right, finely detailed dark aged cedar lattice enclosing glowing warm ivory rice paper, exquisitely subtle wrinkles and fibers in the paper. Solid weathered dark cedar posts between the doors. Left quarter: aged earthen plaster and dark wood paneling. Upper fifth: richly detailed worn timber lintel and dark rafters. Lower fifth: weathered horizontal wooden boards, old scratches, subtle damp staining. Geometry straight and usable as a texture on a flat 3D wall, evenly spaced structural divisions. Intricate Japanese anime background painting, tactile wood grain, irregular natural wear, subtle hand-painted edges, soft blue night ambient shadows, restrained amber light coming through paper. Elegant quiet haunted inn mood, high information density, restrained contrast, NOT a simple cartoon or low-poly scene. Orthographic elevation texture, no oblique depth, no frames, no UI.

### HeroStone.png
Seamless top-down orthographic ground albedo texture for a high quality hand-painted Japanese night garden game. Edge-to-edge irregular old dark blue slate flagstones, larger broad irregular slabs mixed with smaller cobbles, fine cracks, tiny patches of emerald moss growing naturally between stones, occasional fallen ivory rose petals, subtle water-darkened stone, dense but restrained natural surface detail. About 8 broad stones across image, varying size, not a uniform grid. Japanese anime background painting, delicate tactile brushwork, deep indigo and muted blue grey with cool silvery edges, very dark narrow crevices. Neutral soft ambient lighting, no hard cast shadow, no baked bright reflections, no perspective, no plants sticking up, no borders or text. Tileable on all edges, square 2048x2048. Sophisticated believable materials rather than chunky cartoon.

