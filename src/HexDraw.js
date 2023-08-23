// From http://www.redblobgames.com/grids/hexagons/implementation.html
// Copyright 2015 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>

// This code is used to generate the diagrams on implementation.html

// Edits by Giancarlo Whitaker, 2023

/* global Hex, Layout, Point */
import { Hex } from "./HexGrid.js"
import { Point } from "./HexGrid.js"
import { Orientation} from "./HexGrid.js"
import { Layout } from "./HexGrid.js"


/* drawHex
 * Draw a Hex object to the screen
 * param ctx: <canvas> drawing context (must be 2d)
 * param layout: a Layout object
 * param hex: a Hex object
 * param style{}:
 */
export function drawHex(ctx, layout, hex, style={}) {
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

/* colorForHex
 * Find stylings to the Hex on the screen
 * param hex: a Hex object
 */
export function colorForHex(hex) {
    // Match the color style used in the main article
    if (hex.q === 0 && hex.r === 0 && hex.s === 0) {
        return "hsl(0, 50%, 0%)";
    } else if (hex.q === 0) {
        return "hsl(90, 70%, 35%)";
    } else if (hex.r === 0) {
        return "hsl(200, 100%, 35%)";
    } else if (hex.s === 0) {
        return "hsl(300, 40%, 50%)";
    } else {
        return "hsl(0, 0%, 50%)";
    }
}

/* drawHexLabel
 * Apply a label to the Hex on the screen
 * param ctx: <canvas> drawing context (must be 2d)
 * param layout: a Layout object
 * param hex: a Hex object
 * param style{}:
 */
export function drawHexLabel(ctx, layout, hex, style={}) {
    const pointSize = Math.round(0.5 * Math.min(Math.abs(layout.size.x), Math.abs(layout.size.y)));
    var center = layout.hexToPixel(hex);
    ctx.fillStyle = colorForHex(hex);
    ctx.font = `${pointSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    Object.assign(ctx, style);
    ctx.fillText(hex.hexLength() === 0? "q,r,s" : (hex.q + "," + hex.r + "," + hex.s), center.x, center.y);
}

export function permuteQRS(q, r, s) { return new Hex(q, r, s); }
export function permuteSRQ(s, r, q) { return new Hex(q, r, s); }
export function permuteSQR(s, q, r) { return new Hex(q, r, s); }
export function permuteRQS(r, q, s) { return new Hex(q, r, s); }
export function permuteRSQ(r, s, q) { return new Hex(q, r, s); }
export function permuteQSR(q, s, r) { return new Hex(q, r, s); }



/*
 *
 * MAP FUNCTIONS
 *
 */
export function shapeParallelogram(q1, r1, q2, r2, constructor) {
    var hexes = [];
    for (var q = q1; q <= q2; q++) {
        for (var r = r1; r <= r2; r++) {
            hexes.push(constructor(q, r, -q-r));
        }
    }
    return hexes;
}

export function shapeTriangle1(size) {
    var hexes = [];
    for (var q = 0; q <= size; q++) {
        for (var r = 0; r <= size-q; r++) {
            hexes.push(new Hex(q, r, -q-r));
        }
    }
    return hexes;
}

export function shapeTriangle2(size) {
    var hexes = [];
    for (var q = 0; q <= size; q++) {
        for (var r = size-q; r <= size; r++) {
            hexes.push(new Hex(q, r, -q-r));
        }
    }
    return hexes;
}

export function shapeHexagon(size) {
    var hexes = [];
    for (var q = -size; q <= size; q++) {
        var r1 = Math.max(-size, -q-size);
        var r2 = Math.min(size, -q+size);
        for (var r = r1; r <= r2; r++) {
            hexes.push(new Hex(q, r, -q-r));
        }
    }
    return hexes;
}

export function shapeRectanglePointy(left, top, right, bottom) {
    let hexes = [];
    for (let r = top; r <= bottom; r++) {
        let r_offset = Math.floor(r/2.0); // or r>>1
        for (let q = left - r_offset; q <= right - r_offset; q++) {
            hexes.push(new Hex(q, r, -q-r));
        }
    }
    return hexes;
}

export function shapeRectangleFlat(left, top, right, bottom) {
    let hexes = [];
    for (let q = left; q <= right; q++) {
        let q_offset = Math.floor(q/2.0); // or q>>1
        for (let r = top - q_offset; r <= bottom - q_offset; r++) {
            hexes.push(new Hex(q, r, -q-r));
        }
    }
    return hexes;
}

export function shapeRectangleArbitrary(w, h, constructor) {
    var hexes = [];
    var i1 = -Math.floor(w/2), i2 = i1 + w;
    var j1 = -Math.floor(h/2), j2 = j1 + h;
    for (var j = j1; j < j2; j++) {
        var jOffset = -Math.floor(j/2);
        for (var i = i1 + jOffset; i < i2 + jOffset; i++) {
            hexes.push(constructor(i, j, -i-j));
        }
    }
    return hexes;
}

/* drawGrid
 * Draw a grid of Hexes onto the screen
 * param id: the id field for the canvas, i.e. <canvas id="param">
 * param labels: Boolean that is true if labels are to be drawn
 * param layout: a Layout object
 * param hexes: a map of Hex objects, i.e. a Hex data structure
 * param xMarkers, yMarkers: I (Giancarlo) don't know what these do.  They're optional!
 */
export function drawGrid({id, labels, layout, hexes, axes, xMarkers, yMarkers}) {
    const margin = axes ? {left: 30, right: 2, top: 2, bottom: 20} : {left: 0, right: 0, top: 0, bottom: 0};
    labels = labels ?? false;
    hexes = hexes ?? shapeRectangleArbitrary(15, 15, permuteQRS);

    const canvas = /** @type{HTMLCanvasElement} */(document.getElementById(id));
    if (!canvas) { console.warn(`Could not find canvas id=${id}`); return; }
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.bottom - margin.top;
    if (window.devicePixelRatio && window.devicePixelRatio != 1) {
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    ctx.clearRect(0, 0, width, height);

    // Draw the axes
    if (axes) {
        const gridSpacing = 10;
        ctx.save();
        ctx.font = "10px sans-serif";
        ctx.fillStyle = "hsl(180 30% 30%)"
        ctx.translate(margin.left + innerWidth/2, margin.top + innerHeight/2);

        ctx.textAlign = "right";
        const firstRow = Math.ceil(-innerHeight/2 / gridSpacing),
              lastRow = Math.floor(innerHeight/2 / gridSpacing);
        for (let r = firstRow; r <= lastRow; r++) {
            const y = gridSpacing * r;
            const major = r % 5 === 0;
            ctx.strokeStyle = major? "hsl(180 30% 50%)" : "hsl(180 30% 80%)";
            ctx.beginPath();
            ctx.moveTo(-innerWidth/2 - (major ? 7 : 5), y);
            ctx.lineTo(innerWidth/2, y);
            ctx.stroke();
            if (major) ctx.fillText(r * gridSpacing, -innerWidth/2- 7, y + 3);
        }

        ctx.textAlign = "center";
        const firstColumn = Math.ceil(-innerWidth/2 / gridSpacing),
              lastColumn = Math.floor(innerWidth/2 / gridSpacing);
        for (let q = firstColumn; q <= lastColumn; q++) {
            const x = gridSpacing * q;
            const major = q % 5 === 0;
            ctx.strokeStyle = major? "hsl(180 30% 50%)" : "hsl(180 30% 80%)";
            ctx.beginPath();
            ctx.moveTo(x, -innerHeight/2);
            ctx.lineTo(x, innerHeight/2 + (major ? 7 : 5));
            ctx.stroke();
            if (major) ctx.fillText(q * gridSpacing, x, innerHeight/2 + 15);
        }
        ctx.restore();
    }

    // Draw the hexagons
    ctx.save();
    const clipArea = new Path2D();
    clipArea.rect(margin.left, margin.top, innerWidth, innerHeight);
    ctx.clip(clipArea);
    ctx.translate(margin.left + innerWidth/2, margin.top + innerHeight/2);
    hexes.forEach(function(hex) {
        drawHex(ctx, layout, hex);
        if (labels) drawHexLabel(ctx, layout, hex);
    });
    ctx.restore();

    // Draw any horizontal/vertical lines
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "hsl(180 30% 30% / 0.5)";
    ctx.setLineDash([3, 5]);
    for (let x of xMarkers ?? []) {
        ctx.moveTo(margin.left + innerWidth/2 + x, margin.top);
        ctx.lineTo(margin.left + innerWidth/2 + x, margin.top + innerHeight);
    }
    for (let y of yMarkers ?? []) {
        ctx.moveTo(margin.left, margin.top + innerHeight/2 + y);
        ctx.lineTo(margin.left + innerWidth, margin.top + innerHeight/2 + y);
    }
    ctx.stroke();
    ctx.restore();
}
