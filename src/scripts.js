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
//HexDraw.drawGrid({id: "grid", labels: true,
  //        layout: new Layout(Layout.pointy, new Point(25, 25), new Point(0, 0))});

function HexMap (top, bottom, left, right /*Hex coords*/) {
  let map = [];
  console.log("map start: ", map);
  for (let r = top; r <= bottom; r++) {
    let r_offset = Math.floor(r / 2);
    for (let q = (left - r_offset); q <= (right - r_offset); q++) {
      map.push(new Hex(q, r, -q-r));
      console.log("Pushing...");
    }
  }
  return map;
}

let m = HexMap(0, 6, 0, 4);
console.log(m);

function drawMap (ctx, map, id) {
  let layout = new Layout(Layout.pointy, new Point(25, 25), new Point(0, 0));
  for (let i = 0; i < map.length; i++) {
    drawHex(ctx, l, new Hex(map[i].q, map[i].r, map[i].s));
  }
  return;
}

drawMap(ctx, m, "");

HexDraw.drawGrid({id: "grid", labels: true,
          layout: new Layout(Layout.pointy, new Point(25, 25), new Point(0, 0)), hexes: m})
