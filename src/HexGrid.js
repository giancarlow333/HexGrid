/* Cubic-coordinate data structure and algiorithms */
export class Hex {
	constructor(q, r, s) {
		this.q = q;
		this.r = r;
		this.s = s;
	}

	// Test that the current Hex is equal to Hex b
	equals(b) {
		return this.q == b.q && this.r == b.r && this.s == b.s;
	}

	/* Add two hexes together
	 * The second hex can represent steps, i.e. take a step of Hex(2, 0, -2)
	 */
	addHex(b) {
		return new Hex(this.q + b.q, this.r + b.r, this.s + b.s);
	}

	/* Subtract one hex from this
	 * The second hex can represent steps, i.e. take a step of Hex(2, 0, -2)
	 */
	subtractHex(b) {
		return new Hex(this.q - b.q, this.r - b.r, this.s - b.s);
	}

	/* Scale this
	 */
	scaleHex(/*integer*/k) {
		return new Hex(this.q * k, this.r * k, this.s * k);
	}

	hexLength() {
		return ((Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2);
	}

	/* hexDistance
	 * Find the distance between this and Hex b
	 */
	hexDistance(b) {
		dist = this.subtractHex(b).hexLength();
		if (dist >= 0) {
			return Math.floor(dist);
		}
		else {
			return Math.ceil(dist);
		}
	}

	direction(d) {
		return Hex.directions[d];
	}

	neighbor(direction) {
		return this.addHex(Hex.directions(direction));
	}

	diagonalNeighbor(direction) {
  	return this.add(Hex.diagonals[direction]);
  }
}

Hex.directions = [new Hex(1, 0, -1), new Hex(1, -1, 0), new Hex(0, -1, 1), new Hex(-1, 0, 1), new Hex(-1, 1, 0), new Hex(0, 1, -1)];
Hex.diagonals = [new Hex(2, -1, -1), new Hex(1, -2, 1), new Hex(-1, -1, 2), new Hex(-2, 1, 1), new Hex(-1, 2, -1), new Hex(1, 1, -2)];


/* Point class
 * Simple (X, Y) point helper class
 */
export class Point {
		constructor(x, y) {
				this.x = x;
				this.y = y;
		}
}


/* Orientation class
 * Layout helper class that stores whether the display grid is pointy (point up)
 * or flat (flat edge up)
 */
export class Orientation {
	constructor(f0, f1, f2, f3, b0, b1, b2, b3, start_angle) {
		this.f0 = f0;
		this.f1 = f1;
		this.f2 = f2;
		this.f3 = f3;
		this.b0 = b0;
		this.b1 = b1;
		this.b2 = b2;
		this.b3 = b3;
		this.start_angle = start_angle;
	}
}


/* Layout class
 * Convert between hex coordinates and screen coordinates
 * Constructor params:
 *     orientation: An Orientation object, either Layout.pointy or Layout.flat
 *     size: A Point object with the X and Y dimensions of the Hexes, in pixels
 *     origin: A Point object that is the X and Y of the origin of the Layout
 */
export class Layout {
	constructor(orientation, size, origin) {
		this.orientation = orientation;
		this.size = size;
		this.origin = origin;
	}
	hexToPixel(h) {
		var orient = this.orientation;
		var size = this.size;
		var origin = this.origin;
		var x = (orient.f0 * h.q + orient.f1 * h.r) * size.x;
		var y = (orient.f2 * h.q + orient.f3 * h.r) * size.y;
		return new Point(x + origin.x, y + origin.y);
	}
	pixelToHex(p) {
		var orient = this.orientation;
		var size = this.size;
		var origin = this.origin;
		var pt = new Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
		var q = orient.b0 * pt.x + orient.b1 * pt.y;
		var r = orient.b2 * pt.x + orient.b3 * pt.y;
		return new Hex(q, r, -q - r);
	}
	hexCornerOffset(corner) {
		var orient = this.orientation;
		var size = this.size;
		var angle = 2.0 * Math.PI * (orient.start_angle - corner) / 6.0;
		return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
	}
	polygonCorners(h) {
		var corners = [];
		var center = this.hexToPixel(h);
		for (var i = 0; i < 6; i++) {
			var offset = this.hexCornerOffset(i);
			corners.push(new Point(center.x + offset.x, center.y + offset.y));
		}
		return corners;
	}
}

Layout.pointy = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
Layout.flat = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);
