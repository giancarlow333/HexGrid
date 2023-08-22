/* Cubic-coordinate data structure and algiorithms */
class Hex {
	constructor(q, r, s) {
		this.q = q;
		this.r = r;
		this.s = s;
	}

	// Test that the current Hex is equal to Hex b
	equals(b) {
		return this.q == b.q && this.r == b.r && this.s == b.s;
	}

	addHex(b) {
		return new Hex(this.q + b.q, this.r + b.r, this.s + b.s);
	}

	subtractHex(b) {
		return new Hex(this.q - b.q, this.r - b.r, this.s - b.s);
	}

	scaleHex(/*integer*/k) {
		return new Hex(this.q * k, this.r * k, this.s * k);
	}

	hexLength() {
		return ((Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2);
	}

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
