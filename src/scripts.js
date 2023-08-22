import { Hex } from "./HexGrid.js"
import { Point } from "./HexGrid.js"
import { Orientation} from "./HexGrid.js"
import { Layout } from "./HexGrid.js"
import * as HexDraw from "./HexDraw.js"

const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");

let x = new Hex(0,0,0);
console.log(x);

let p = new Point(25, 25);
let l = new Layout(Layout.pointy, p, new Point(100, 100));
console.log(l);

function drawHex(ctx, layout, hex, style={}) {
    var corners = layout.polygonCorners(hex);
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.lineWidth = 1;
    Object.assign(ctx, style);
    ctx.moveTo(corners[5].x, corners[5].y);
    for (var i = 0; i < 6; i++) {
        ctx.lineTo(corners[i].x, corners[i].y);
    }
    ctx.fill();
    ctx.stroke();
}

drawHex(ctx, l, x);
HexDraw.drawGrid({id: "grid", labels: true,
          layout: new Layout(Layout.pointy, new Point(25, 25), new Point(0, 0))});
