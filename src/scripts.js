import { Hex } from "./HexGrid.js"
import { Point } from "./HexGrid.js"
import { Orientation} from "./HexGrid.js"
import { Layout } from "./HexGrid.js"
import * as HexDraw from "./HexDraw.js"

const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");

let h = HexDraw.shapeHexagon(6);
console.log(h);
HexDraw.drawGrid({id: "grid", labels: true,
          layout: new Layout(Layout.pointy, new Point(25, 25), new Point(0, 0)), hexes: h})
