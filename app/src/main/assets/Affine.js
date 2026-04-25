// Affine.js --- アフィン変換モジュール
// Author: katahiromz
// License: MIT

// /** 2次元座標を表す型 [x, y] */
// export type FacePoint = [number, number];
// 
// /** 三角形を形成する3つの座標の配列 */
// export type FaceTriangle = [FacePoint, FacePoint, FacePoint];
// 
// /** アフィン変換行列のパラメータ [a, b, c, d, e, f] */
// export type FaceAffineMatrix = [number, number, number, number, number, number];

/**
 * アフィン変換計算。
 * 転送元の三角形から転送先の三角形への変換行列を求める。
 * @param srcTri: FaceTriangle
 * @param destTri: FaceTriangle
 * @return FaceAffineMatrix
 */
const getAffineTransform = (srcTri, destTri) => {
  const [[x0, y0], [x1, y1], [x2, y2]] = srcTri;
  const [[u0, v0], [u1, v1], [u2, v2]] = destTri;

  const dx1 = x1 - x0, dy1 = y1 - y0;
  const dx2 = x2 - x0, dy2 = y2 - y0;

  const du1 = u1 - u0, dv1 = v1 - v0;
  const du2 = u2 - u0, dv2 = v2 - v0;

  const det = dx1 * dy2 - dx2 * dy1;
  
  // 行列式が0に近い場合は変換不可（三角形が潰れているなど）
  if (Math.abs(det) < 1e-10) return null;

  const a = (du1 * dy2 - du2 * dy1) / det;
  const b = (du2 * dx1 - du1 * dx2) / det;
  const c = u0 - a * x0 - b * y0;

  const d = (dv1 * dy2 - dv2 * dy1) / det;
  const e = (dv2 * dx1 - dv1 * dx2) / det;
  const f = v0 - d * x0 - e * y0;

  return [a, b, c, d, e, f];
};

/**
 * アフィン変換を伴うイメージ転送。
 * @param ctx 描画先のコンテキスト。
 * @param tri 転送先の三角形。
 * @param src 描画元のキャンバスまたはイメージ。
 * @param triSrc 転送元の三角形。
 */
const transferWithAffineTransform = (ctx, tri, src, triSrc) => {
  // アフィン変換を計算
  const t = getAffineTransform(triSrc, tri);
  if (!t) return; // 無効な変換

  // クリッピング状態を保存
  ctx.save();

  // クリッピング（ターゲット三角形のみ描画）
  ctx.beginPath();
  ctx.moveTo(tri[0][0], tri[0][1]);
  ctx.lineTo(tri[1][0], tri[1][1]);
  ctx.lineTo(tri[2][0], tri[2][1]);
  ctx.closePath();
  ctx.clip();

  // アフィン変換適用（元画像の三角形領域を写す）
  ctx.setTransform(t[0], t[3], t[1], t[4], t[2], t[5]);

  // イメージを転送
  ctx.drawImage(src, 0, 0);

  // クリッピング状態を復元
  ctx.restore();
};
