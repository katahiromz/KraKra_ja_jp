// 万華鏡を描画するJavaScriptライブラリ。
// Copyright (C) 2023 katahiromz.
// Copyright (C) 2023 TT.

// 正多角形の頂点の配列を返す関数。
const Kaleido_regular_polygon = function(n, center, radius, diff_angle = -Math.PI / 2){
	const ret = [];
	const angleIncrement = (2 * Math.PI) / n;
	let angle = diff_angle;
	for(let i = 0; i < n; ++i){
		const x = center.x + radius * Math.cos(angle);
		const y = center.y + radius * Math.sin(angle);
		ret.push({x:x, y:y});
		angle += angleIncrement;
	}
	return ret;
}

// 長方形ポリゴンの頂点の配列を返す関数。
const Kaleido_polygon_rectangle = function(center, width, height){
	return [
		{x: center.x - width / 2, y: center.y - height / 2},
		{x: center.x + width / 2, y: center.y - height / 2},
		{x: center.x + width / 2, y: center.y + height / 2},
		{x: center.x - width / 2, y: center.y + height / 2}
	];
}

// 多角形を描画する関数。
const Kaleido_draw_polygon = function(ctx, polygon){
	ctx.beginPath();
	let first = true;
	for(let vertex of polygon){
		if(first)
			ctx.moveTo(vertex.x, vertex.y);
		else
			ctx.lineTo(vertex.x, vertex.y);
		first = false;
	}
	ctx.closePath();
}

// 円を描画する関数。
const Kaleido_draw_circle = function(ctx, center, radius){
	ctx.beginPath();
	ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
}

// 度をラジアンに変換する関数。
const Kaleido_deg2rad = function(degree){
	return degree * Math.PI / 180;
}

// 負の浮動小数点数を受け付ける剰余関数。
const Kaleido_mod = function(x, y){
	return ((x % y) + y) % y;
}

// 指定したサイズでキャンバスを作成する。
const Kaleido_create_empty_canvas = function(canvas, width, height, do_fill = false){
	if(!canvas)
		canvas = document.createElement('canvas');
	if(canvas.width != width || canvas.height != height){
		canvas.width = width;
		canvas.height = height;
	}
	let ctx = canvas.getContext('2d', { alpha: false });
	ctx.reset();
	if(do_fill)
		ctx.clearRect(0, 0, width, height);
	return canvas;
}

// 頂点が可視かどうか？
const Kaleido_point_visible = function(ctx, point){
	let canvas = ctx.canvas;
	if(!(0 <= point.x && point.x < canvas.width))
		return false;
	if(!(0 <= point.y && point.y < canvas.height))
		return false;
	return true;
}

// ２つの長方形の交差部分を返す関数。
const Kaleido_intersect_rectangle = function(rect1, rect2){
	if(rect1.width <= 0 || rect1.height <= 0 || rect2.width <= 0 || rect2.height <= 0)
		return false;
	let x0 = Math.max(rect1.x, rect2.x);
	let y0 = Math.max(rect1.y, rect2.y);
	let x1 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width);
	let y1 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
	let width = x1 - x0, height = y1 - y0;
	if(width <= 0 || height <= 0)
		return false;
	return {x:x0, y:y0, width:width, height:height};
}

// 座標変換したポリゴンが可視か？
const Kaleido_transformed_polygon_visible = function(ctx, polygon){
	let transform = ctx.getTransform();
	let minx = 1000000, miny = 1000000, maxx = -1000000, maxy = -1000000;
	for(let vertex of polygon){
		let point = transform.transformPoint(new DOMPoint(vertex.x, vertex.y));
		minx = Math.min(point.x, minx);
		miny = Math.min(point.y, miny);
		maxx = Math.max(point.x, maxx);
		maxy = Math.max(point.y, maxy);
	}
	let rect1 = {x:0, y:0, width:ctx.canvas.width, height:ctx.canvas.height};
	let rect2 = {x:minx, y:miny, width:maxx - minx, height:maxy - miny};
	if(Kaleido_intersect_rectangle(rect1, rect2))
		return true;
	return false;
}

// 万華鏡を描画する再帰関数。
const Kaleido_draw_cells_recursive = function(ctx2, polygon, ctx1, radius, done){
	// 現在の状態を保存する。
	ctx2.save();

	// 変換先のポリゴンが可視でなければ再帰を終了。
	if(!Kaleido_transformed_polygon_visible(ctx2, polygon)){
		ctx2.restore();
		return;
	}

	// 原点が描画済みなら再帰終了。
	let destOrigin = ctx2.getTransform().transformPoint(new DOMPoint(0, 0));
	for(let item of done){
		if(Math.abs(item.x - destOrigin.x) <= 2 && Math.abs(item.y - destOrigin.y) <= 2){
			ctx2.restore();
			return;
		}
	}

	// 描画済みとして原点を追加。
	done.push(destOrigin);

	// ポリゴンでクリップする。
	Kaleido_draw_polygon(ctx2, polygon);
	if(false){
		ctx2.strokeStyle = "red";
		ctx2.lineWidth = 5;
		ctx2.stroke();
	}
	ctx2.clip();

	// ポリゴンでクリップしたまま、イメージを転送する。半径を使う。
	let srcOrigin = ctx1.getTransform().transformPoint(new DOMPoint(0, 0));
	ctx2.drawImage(ctx1.canvas,
		srcOrigin.x - radius, srcOrigin.y - radius, 2 * radius, 2 * radius,
		-radius, -radius, 2 * radius, 2 * radius);

	// 状態を復元する。
	ctx2.restore();

	for(let i = 0; i < polygon.length; ++i){ // ポリゴンの各頂点について
		// 現在の状態を保存。
		ctx2.save();

		// ポリゴンの辺 (i, j) について
		let j = (i + 1) % polygon.length;

		// 辺のベクトルを求める。
		let dx = polygon[j].x - polygon[i].x;
		let dy = polygon[j].y - polygon[i].y;

		// 辺の中点を求める。
		let mx = (polygon[i].x + polygon[j].x) / 2;
		let my = (polygon[i].y + polygon[j].y) / 2;
		if(false){
			draw_circle(ctx2, new DOMPoint(mx, my), 3);
			ctx2.fill();
		}

		// 辺の傾きを求める。
		let angle = Math.atan2(dy, dx);

		// 中点を中心とする。
		ctx2.translate(mx, my);

		// 鏡映行列を施す。
		ctx2.transform(
			Math.cos(2 * angle), Math.sin(2 * angle),
			Math.sin(2 * angle), -Math.cos(2 * angle),
			0, 0);

		// 中点を中心とする。
		ctx2.translate(-mx, -my);

		// 細胞を再帰的に描画する。
		Kaleido_draw_cells_recursive(ctx2, polygon, ctx1, radius, done);

		// 状態を復元。
		ctx2.restore();
	}
}

////////////////////////////////////////////////////////////////////////
// 万華鏡を描画する関数。
// @param ctx2 転送先。
// @param polygon regular_polygonなどを使って構築されたポリゴン。
// @param ctx1 転送元。
// @param radius 細胞の半径。
// @param done 処理を完了した細胞の原点の配列。最初は [] を指定する。
const Kaleido_draw = function(ctx2, polygon, ctx1, radius){
	let done = [];
	Kaleido_draw_cells_recursive(ctx2, polygon, ctx1, radius, done);
}

////////////////////////////////////////////////////////////////////////
// 万華鏡のキャンバスを作成し、そこに描画し、そのキャンバスを返す関数。
// @param width キャンバスの幅。
// @param height キャンバスの高さ。
// @param ctx1 転送元。
// @param polygon regular_polygonなどを使って構築されたポリゴン。
const Kaleido_create_drawn_canvas = function(canvas, radius, width, height, ctx1, polygon = null, origin = null){
	canvas = Kaleido_create_empty_canvas(canvas, width, height);
	const ctx = canvas.getContext('2d', { alpha: false });
	ctx.save();

	// 中点を原点とする。
	ctx.translate(width / 2, height / 2);

	if(!origin)
		origin = {x:0, y:0};
	if(!polygon)
		polygon = Kaleido_regular_polygon(3, origin, 60);

	// 万華鏡を描画する。
	Kaleido_draw(ctx, polygon, ctx1, radius);

	ctx.restore();
	return canvas;
}
