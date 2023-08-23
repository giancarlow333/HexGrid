import { Hex } from "./HexGrid.js"
import { Point } from "./HexGrid.js"
import { Orientation} from "./HexGrid.js"
import { Layout } from "./HexGrid.js"
import * as HexDraw from "./HexDraw.js"

const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");

let h = HexDraw.shapeHexagon(6);
let l = new Layout(Layout.pointy, new Point(25, 25), new Point(0, 0));
console.log(h);
HexDraw.drawGrid({id: "grid", labels: true,
          layout: l, hexes: h})

// Add a custom object
// A Boolean to draw a circle in the hex
// Add to hex (4, -2, -2)

// -3, 6, -3
h[107].drawCircle = true;

function drawCircle (layout, hex, ctx) {
  let center = layout.hexToPixel(hex);
  if (hex.drawCircle != null) {
    console.log("Not null!", hex);
    ctx.beginPath();
    // arc(x, y, radius, startAngle, endAngle)
    console.log(center.x, ", ", center.y);
    ctx.arc(250+center.x, 250+center.y, 15, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
}

for (let i = 0; i < h.length; i++) {
  drawCircle(l, h[i], ctx);
}
