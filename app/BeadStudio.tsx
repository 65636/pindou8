"use client";

import { ChangeEvent, DragEvent, PointerEvent, WheelEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PALETTE_ORDER, PALETTES, type BeadColor } from "./palettes";

type SampleMode = "auto" | "dominant" | "smooth";
type Tool = "view" | "brush" | "eraser" | "picker" | "fill";
type BeadShape = "square" | "round";
type SourceImage = { width: number; height: number; data: Uint8ClampedArray; name: string; url: string };
type Pattern = {
  width: number;
  height: number;
  cells: Uint16Array;
  palette: BeadColor[];
  brand: string;
  duration: number;
};
type Lab = { l: number; a: number; b: number };

const EMPTY = 65535;

const DEFAULTS = {
  width: 78,
  maxColors: 10,
  sampleMode: "auto" as SampleMode,
  removeBackground: true,
  minColorCount: 0,
  smallRegionSize: 0,
};

function hexToRgb(hex: string) {
  const n = Number.parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function colorChipStyle(color: BeadColor) {
  const rgb = hexToRgb(color.hex);
  const isLight = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b > 155;
  return { backgroundColor: color.hex, color: isLight ? "#111713" : "#ffffff" };
}

function rgbToLab(r: number, g: number, b: number): Lab {
  let rr = r / 255;
  let gg = g / 255;
  let bb = b / 255;
  rr = rr > 0.04045 ? ((rr + 0.055) / 1.055) ** 2.4 : rr / 12.92;
  gg = gg > 0.04045 ? ((gg + 0.055) / 1.055) ** 2.4 : gg / 12.92;
  bb = bb > 0.04045 ? ((bb + 0.055) / 1.055) ** 2.4 : bb / 12.92;
  const x = (rr * 0.4124 + gg * 0.3576 + bb * 0.1805) / 0.95047;
  const y = rr * 0.2126 + gg * 0.7152 + bb * 0.0722;
  const z = (rr * 0.0193 + gg * 0.1192 + bb * 0.9505) / 1.08883;
  const f = (v: number) => (v > 0.008856 ? Math.cbrt(v) : 7.787 * v + 16 / 116);
  const fx = f(x);
  const fy = f(y);
  const fz = f(z);
  return { l: Math.max(0, 116 * fy - 16), a: 500 * (fx - fy), b: 200 * (fy - fz) };
}

function ciede2000(x: Lab, y: Lab) {
  const rad = Math.PI / 180;
  const c1 = Math.hypot(x.a, x.b);
  const c2 = Math.hypot(y.a, y.b);
  const avgC = (c1 + c2) / 2;
  const g = 0.5 * (1 - Math.sqrt(avgC ** 7 / (avgC ** 7 + 25 ** 7)));
  const a1 = (1 + g) * x.a;
  const a2 = (1 + g) * y.a;
  const cp1 = Math.hypot(a1, x.b);
  const cp2 = Math.hypot(a2, y.b);
  const hp = (a: number, b: number) => {
    const h = Math.atan2(b, a) / rad;
    return h >= 0 ? h : h + 360;
  };
  const h1 = hp(a1, x.b);
  const h2 = hp(a2, y.b);
  const dL = y.l - x.l;
  const dC = cp2 - cp1;
  let dh = h2 - h1;
  if (cp1 * cp2 === 0) dh = 0;
  else if (dh > 180) dh -= 360;
  else if (dh < -180) dh += 360;
  const dH = 2 * Math.sqrt(cp1 * cp2) * Math.sin((dh / 2) * rad);
  const avgL = (x.l + y.l) / 2;
  const avgCp = (cp1 + cp2) / 2;
  let avgH = h1 + h2;
  if (cp1 * cp2 === 0) avgH = h1 + h2;
  else if (Math.abs(h1 - h2) <= 180) avgH /= 2;
  else if (h1 + h2 < 360) avgH = (h1 + h2 + 360) / 2;
  else avgH = (h1 + h2 - 360) / 2;
  const t = 1 - 0.17 * Math.cos((avgH - 30) * rad) + 0.24 * Math.cos(2 * avgH * rad)
    + 0.32 * Math.cos((3 * avgH + 6) * rad) - 0.2 * Math.cos((4 * avgH - 63) * rad);
  const sl = 1 + 0.015 * (avgL - 50) ** 2 / Math.sqrt(20 + (avgL - 50) ** 2);
  const sc = 1 + 0.045 * avgCp;
  const sh = 1 + 0.015 * avgCp * t;
  const rt = -2 * Math.sqrt(avgCp ** 7 / (avgCp ** 7 + 25 ** 7))
    * Math.sin(60 * Math.exp(-(((avgH - 275) / 25) ** 2)) * rad);
  return Math.sqrt((dL / sl) ** 2 + (dC / sc) ** 2 + (dH / sh) ** 2 + rt * (dC / sc) * (dH / sh));
}

function nearestColor(r: number, g: number, b: number, palette: BeadColor[], cache: Map<number, number>) {
  const key = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
  const cached = cache.get(key);
  if (cached !== undefined) return cached;
  const lab = rgbToLab(r, g, b);
  let winner = 0;
  let best = Number.POSITIVE_INFINITY;
  for (let i = 0; i < palette.length; i += 1) {
    const targetRgb = hexToRgb(palette[i].hex);
    const d = ciede2000(lab, rgbToLab(targetRgb.r, targetRgb.g, targetRgb.b));
    if (d < best) {
      best = d;
      winner = i;
    }
  }
  cache.set(key, winner);
  return winner;
}

function analyzeSampleMode(source: SourceImage): Exclude<SampleMode, "auto"> {
  const colors = new Set<number>();
  const stepX = Math.max(1, Math.floor(source.width / 96));
  const stepY = Math.max(1, Math.floor(source.height / 96));
  let hardEdges = 0;
  let edges = 0;
  for (let y = 0; y < source.height; y += stepY) {
    for (let x = 0; x < source.width; x += stepX) {
      const p = (y * source.width + x) * 4;
      if (source.data[p + 3] < 128) continue;
      colors.add(((source.data[p] >> 4) << 8) | ((source.data[p + 1] >> 4) << 4) | (source.data[p + 2] >> 4));
      for (const [nx, ny] of [[Math.min(source.width - 1, x + stepX), y], [x, Math.min(source.height - 1, y + stepY)]]) {
        const q = (ny * source.width + nx) * 4;
        if (source.data[q + 3] < 128) continue;
        if (Math.hypot(source.data[p] - source.data[q], source.data[p + 1] - source.data[q + 1], source.data[p + 2] - source.data[q + 2]) > 60) hardEdges += 1;
        edges += 1;
      }
    }
  }
  return colors.size > 20 && (edges ? hardEdges / edges : 0) < 0.02 ? "smooth" : "dominant";
}

function sampleSource(source: SourceImage, width: number, height: number, mode: SampleMode) {
  const resolved = mode === "auto" ? analyzeSampleMode(source) : mode;
  if (resolved === "smooth") {
    const input = document.createElement("canvas");
    input.width = source.width;
    input.height = source.height;
    const sourceCopy = new Uint8ClampedArray(source.data.length);
    sourceCopy.set(source.data);
    input.getContext("2d")!.putImageData(new ImageData(sourceCopy, source.width, source.height), 0, 0);
    const output = document.createElement("canvas");
    output.width = width;
    output.height = height;
    const ctx = output.getContext("2d", { willReadFrequently: true })!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(input, 0, 0, width, height);
    return ctx.getImageData(0, 0, width, height).data;
  }

  const out = new Uint8ClampedArray(width * height * 4);
  const scaleX = source.width / width;
  const scaleY = source.height / height;
  for (let gy = 0; gy < height; gy += 1) {
    const y0 = Math.floor(gy * scaleY);
    const y1 = Math.max(y0 + 1, Math.ceil((gy + 1) * scaleY));
    for (let gx = 0; gx < width; gx += 1) {
      const x0 = Math.floor(gx * scaleX);
      const x1 = Math.max(x0 + 1, Math.ceil((gx + 1) * scaleX));
      const buckets = new Map<number, { weight: number; r: number; g: number; b: number }>();
      let alphaSum = 0;
      let samples = 0;
      for (let y = y0; y < Math.min(source.height, y1); y += 1) {
        for (let x = x0; x < Math.min(source.width, x1); x += 1) {
          const p = (y * source.width + x) * 4;
          const alpha = source.data[p + 3];
          alphaSum += alpha;
          samples += 1;
          if (alpha < 128) continue;
          const key = ((source.data[p] >> 4) << 8) | ((source.data[p + 1] >> 4) << 4) | (source.data[p + 2] >> 4);
          const item = buckets.get(key) ?? { weight: 0, r: 0, g: 0, b: 0 };
          item.weight += alpha;
          item.r += source.data[p] * alpha;
          item.g += source.data[p + 1] * alpha;
          item.b += source.data[p + 2] * alpha;
          buckets.set(key, item);
        }
      }
      const p = (gy * width + gx) * 4;
      if (!samples || alphaSum / samples < 128 || !buckets.size) {
        out[p + 3] = 0;
        continue;
      }
      const ranked = [...buckets.values()].sort((a, b) => b.weight - a.weight);
      let chosen = ranked[0];
      const dominantLuma = (0.299 * chosen.r + 0.587 * chosen.g + 0.114 * chosen.b) / chosen.weight / 255;
      if (dominantLuma > 0.4) {
        const centerX = Math.min(source.width - 1, Math.floor((x0 + Math.min(source.width, x1) - 1) / 2));
        const centerY = Math.min(source.height - 1, Math.floor((y0 + Math.min(source.height, y1) - 1) / 2));
        const centerP = (centerY * source.width + centerX) * 4;
        const centerLuma = (0.299 * source.data[centerP] + 0.587 * source.data[centerP + 1] + 0.114 * source.data[centerP + 2]) / 255;
        const centerIsDark = source.data[centerP + 3] >= 128 && centerLuma <= 0.48;
        const darkAccent = centerIsDark
          ? ranked.slice(1).find((item) => item.weight / Math.max(1, alphaSum) >= 0.06
            && (0.299 * item.r + 0.587 * item.g + 0.114 * item.b) / item.weight / 255 <= 0.42)
          : undefined;
        if (darkAccent) chosen = darkAccent;
      }
      out[p] = Math.round(chosen.r / chosen.weight);
      out[p + 1] = Math.round(chosen.g / chosen.weight);
      out[p + 2] = Math.round(chosen.b / chosen.weight);
      out[p + 3] = 255;
    }
  }
  return out;
}

function mapPixels(data: Uint8ClampedArray, palette: BeadColor[], width: number, height: number) {
  const cells = new Uint16Array(width * height);
  const cache = new Map<number, number>();
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const pixel = y * width + x;
      const p = pixel * 4;
      if (data[p + 3] < 128) {
        cells[pixel] = EMPTY;
        continue;
      }
      const r = data[p];
      const g = data[p + 1];
      const b = data[p + 2];
      const index = nearestColor(r, g, b, palette, cache);
      cells[pixel] = index;
    }
  }
  return cells;
}

function floodRemoveBackground(cells: Uint16Array, width: number, height: number, palette: BeadColor[]) {
  const edgeMaps = [new Map<number, number>(), new Map<number, number>(), new Map<number, number>(), new Map<number, number>()];
  const add = (map: Map<number, number>, value: number) => value !== EMPTY && map.set(value, (map.get(value) ?? 0) + 1);
  for (let x = 0; x < width; x += 1) {
    add(edgeMaps[0], cells[x]);
    add(edgeMaps[1], cells[(height - 1) * width + x]);
  }
  for (let y = 0; y < height; y += 1) {
    add(edgeMaps[2], cells[y * width]);
    add(edgeMaps[3], cells[y * width + width - 1]);
  }
  const totals = new Map<number, number>();
  edgeMaps.forEach((map) => map.forEach((count, key) => totals.set(key, (totals.get(key) ?? 0) + count)));
  const perimeter = 2 * width + 2 * height;
  const candidates = [...totals.entries()].filter(([index, count]) => {
    const rgb = hexToRgb(palette[index].hex);
    const light = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    const sat = (Math.max(rgb.r, rgb.g, rgb.b) - Math.min(rgb.r, rgb.g, rgb.b)) / Math.max(1, Math.max(rgb.r, rgb.g, rgb.b));
    const edgesTouched = edgeMaps.filter((map, i) => (map.get(index) ?? 0) / (i < 2 ? width : height) >= 0.12).length;
    return count / perimeter >= 0.38 && edgesTouched >= 3 && (light >= 0.72 || (sat <= 0.18 && light >= 0.52));
  }).sort((a, b) => b[1] - a[1]);
  if (!candidates.length) return cells;
  const background = candidates[0][0];
  const result = new Uint16Array(cells);
  const seen = new Uint8Array(cells.length);
  const stack: number[] = [];
  for (let x = 0; x < width; x += 1) stack.push(x, (height - 1) * width + x);
  for (let y = 1; y < height - 1; y += 1) stack.push(y * width, y * width + width - 1);
  while (stack.length) {
    const index = stack.pop()!;
    if (seen[index] || result[index] !== background) continue;
    seen[index] = 1;
    result[index] = EMPTY;
    const x = index % width;
    const y = Math.floor(index / width);
    if (x) stack.push(index - 1);
    if (x < width - 1) stack.push(index + 1);
    if (y) stack.push(index - width);
    if (y < height - 1) stack.push(index + width);
  }
  return result;
}

function colorCounts(cells: Uint16Array, paletteLength: number) {
  const counts = new Array(paletteLength).fill(0) as number[];
  for (const cell of cells) if (cell !== EMPTY && cell < paletteLength) counts[cell] += 1;
  return counts;
}

function selectPalette(cells: Uint16Array, palette: BeadColor[], maxColors: number) {
  const counts = colorCounts(cells, palette.length);
  const chosen = counts.map((count, index) => ({ count, index })).filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count).slice(0, maxColors).map((item) => item.index);
  return chosen.length ? chosen.map((index) => palette[index]) : [palette[0]];
}

function mergeRareColors(pattern: Pattern, amount: number) {
  if (!amount) return pattern;
  const counts = colorCounts(pattern.cells, pattern.palette.length);
  const used = counts.map((count, index) => ({ count, index })).filter((item) => item.count > 0).sort((a, b) => a.count - b.count);
  const remove = used.slice(0, Math.min(amount, Math.max(0, used.length - 1)));
  const removed = new Set(remove.map((item) => item.index));
  const keep = used.map((item) => item.index).filter((index) => !removed.has(index));
  const replacements = new Map<number, number>();
  for (const item of remove) {
    const source = hexToRgb(pattern.palette[item.index].hex);
    let best = keep[0];
    let bestDistance = Number.POSITIVE_INFINITY;
    for (const index of keep) {
      const target = hexToRgb(pattern.palette[index].hex);
      const distance = Math.sqrt(2 * (source.r - target.r) ** 2 + 4 * (source.g - target.g) ** 2 + 3 * (source.b - target.b) ** 2);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = index;
      }
    }
    replacements.set(item.index, best);
  }
  const cells = new Uint16Array(pattern.cells);
  for (let i = 0; i < cells.length; i += 1) if (replacements.has(cells[i])) cells[i] = replacements.get(cells[i])!;
  return { ...pattern, cells };
}

function cleanSmallRegions(pattern: Pattern, maxSize: number) {
  if (!maxSize) return pattern;
  const { width, height, palette } = pattern;
  const cells = new Uint16Array(pattern.cells);
  const visited = new Uint8Array(cells.length);
  const neighbors = (index: number) => {
    const x = index % width;
    const y = Math.floor(index / width);
    const list: number[] = [];
    if (x) list.push(index - 1);
    if (x < width - 1) list.push(index + 1);
    if (y) list.push(index - width);
    if (y < height - 1) list.push(index + width);
    return list;
  };
  for (let start = 0; start < cells.length; start += 1) {
    if (visited[start] || cells[start] === EMPTY) continue;
    const color = cells[start];
    const region: number[] = [];
    const boundary = new Map<number, number>();
    const stack = [start];
    visited[start] = 1;
    while (stack.length) {
      const current = stack.pop()!;
      region.push(current);
      for (const next of neighbors(current)) {
        if (cells[next] === color && !visited[next]) {
          visited[next] = 1;
          stack.push(next);
        } else if (cells[next] !== color && cells[next] !== EMPTY) {
          boundary.set(cells[next], (boundary.get(cells[next]) ?? 0) + 1);
        }
      }
    }
    if (region.length > maxSize || !boundary.size) continue;
    const source = hexToRgb(palette[color].hex);
    const target = [...boundary.entries()].sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      const ca = hexToRgb(palette[a[0]].hex);
      const cb = hexToRgb(palette[b[0]].hex);
      return Math.hypot(source.r - ca.r, source.g - ca.g, source.b - ca.b)
        - Math.hypot(source.r - cb.r, source.g - cb.g, source.b - cb.b);
    })[0][0];
    region.forEach((index) => { cells[index] = target; });
  }
  return { ...pattern, cells };
}

function smoothContourSpikes(pattern: Pattern) {
  const { width, height } = pattern;
  const source = pattern.cells;
  const cells = new Uint16Array(source);
  const directions = [
    { dx: -1, dy: 0, weight: 2 }, { dx: 1, dy: 0, weight: 2 },
    { dx: 0, dy: -1, weight: 2 }, { dx: 0, dy: 1, weight: 2 },
    { dx: -1, dy: -1, weight: 1 }, { dx: 1, dy: -1, weight: 1 },
    { dx: -1, dy: 1, weight: 1 }, { dx: 1, dy: 1, weight: 1 },
  ];
  const at = (x: number, y: number) => (x < 0 || y < 0 || x >= width || y >= height ? EMPTY : source[y * width + x]);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = y * width + x;
      const color = source[index];
      if (color === EMPTY) continue;
      const sameNeighbors = directions.filter(({ dx, dy }) => at(x + dx, y + dy) === color);
      const sameOrthogonal = sameNeighbors.filter(({ dx, dy }) => dx === 0 || dy === 0).length;
      if (!sameNeighbors.length || sameNeighbors.length > 3 || sameOrthogonal > 1) continue;

      const attachedToBody = sameNeighbors.some(({ dx, dy }) => {
        const anchorX = x + dx;
        const anchorY = y + dy;
        return directions.filter((direction) => at(anchorX + direction.dx, anchorY + direction.dy) === color).length >= 3;
      });
      if (!attachedToBody) continue;

      const alternatives = new Map<number, { count: number; score: number }>();
      directions.forEach(({ dx, dy, weight }) => {
        const nearby = at(x + dx, y + dy);
        if (nearby === color) return;
        const vote = alternatives.get(nearby) ?? { count: 0, score: 0 };
        vote.count += 1;
        vote.score += weight;
        alternatives.set(nearby, vote);
      });
      const replacement = [...alternatives.entries()].sort((a, b) => b[1].score - a[1].score || b[1].count - a[1].count)[0];
      if (!replacement || replacement[1].count < 3 || replacement[1].score < 4) continue;
      cells[index] = replacement[0];
    }
  }
  return { ...pattern, cells };
}

function patternDimensions(source: Pick<SourceImage, "width" | "height"> | null, shortSide: number) {
  const size = Math.max(8, Math.min(256, Math.round(shortSide)));
  if (!source || source.width === source.height) return { width: size, height: size };
  if (source.width > source.height) {
    return { width: Math.min(512, Math.max(size, Math.round(size * source.width / source.height))), height: size };
  }
  return { width: size, height: Math.min(512, Math.max(size, Math.round(size * source.height / source.width))) };
}

function exportCellSize(pattern: Pattern) {
  const longestSide = Math.max(pattern.width, pattern.height);
  const tierSize = longestSide < 53 ? 28 : longestSide < 78 ? 26 : longestSide < 104 ? 24 : 22;
  return Math.max(10, Math.min(tierSize, Math.floor(5632 / longestSide)));
}

function renderPattern(canvas: HTMLCanvasElement, pattern: Pattern, shape: BeadShape, showGrid: boolean, showCodes: boolean, exportScale?: number, includeMaterials = false) {
  const size = exportScale ?? Math.max(5, Math.min(26, Math.floor(1080 / Math.max(pattern.width, pattern.height))));
  const leftGutter = showGrid ? Math.max(24, Math.ceil(size * 1.8)) : 0;
  const topGutter = showGrid ? Math.max(24, Math.ceil(size * 1.8)) : 0;
  const patternWidth = pattern.width * size;
  const patternHeight = pattern.height * size;
  const counts = colorCounts(pattern.cells, pattern.palette.length);
  const materialItems = counts.map((count, index) => ({ count, color: pattern.palette[index] }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count);
  const totalBeads = materialItems.reduce((sum, item) => sum + item.count, 0);
  const materialPadding = Math.max(32, Math.ceil(size * 1.1));
  const materialGap = Math.max(10, Math.ceil(size * 0.28));
  const materialContentWidth = Math.max(1, patternWidth - materialPadding * 2);
  const materialCardWidth = Math.min(materialContentWidth, Math.max(160, Math.ceil(size * 5)));
  const materialColumns = Math.max(1, Math.min(6, materialItems.length, Math.floor((materialContentWidth + materialGap) / (materialCardWidth + materialGap))));
  const materialHeaderHeight = Math.max(84, Math.ceil(size * 2.2));
  const materialRowHeight = Math.max(56, Math.ceil(size * 1.45));
  const materialRows = Math.ceil(materialItems.length / materialColumns);
  const materialHeight = includeMaterials
    ? materialPadding + materialHeaderHeight + materialRows * materialRowHeight + materialPadding
    : 0;
  canvas.width = leftGutter + patternWidth;
  canvas.height = topGutter + patternHeight + materialHeight;
  canvas.dataset.cellSize = String(size);
  canvas.dataset.gridOffsetX = String(leftGutter);
  canvas.dataset.gridOffsetY = String(topGutter);
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#f8faf9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `500 ${Math.max(8, Math.floor(size * 0.42))}px ui-monospace, monospace`;
  for (let y = 0; y < pattern.height; y += 1) {
    for (let x = 0; x < pattern.width; x += 1) {
      const index = y * pattern.width + x;
      const colorIndex = pattern.cells[index];
      if (colorIndex === EMPTY) continue;
      const color = pattern.palette[colorIndex];
      ctx.fillStyle = color.hex;
      if (shape === "round") {
        ctx.beginPath();
        ctx.arc(leftGutter + x * size + size / 2, topGutter + y * size + size / 2, size * 0.43, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(leftGutter + x * size, topGutter + y * size, size, size);
      }
      if (showCodes && size >= (exportScale ? 10 : 18)) {
        const rgb = hexToRgb(color.hex);
        const lightColor = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b > 150;
        ctx.fillStyle = lightColor ? "#101713" : "#ffffff";
        const textX = leftGutter + x * size + size / 2;
        const textY = topGutter + y * size + size / 2;
        ctx.fillText(color.code, textX, textY, size * 0.92);
      }
    }
  }
  if (showGrid) {
    for (let x = 0; x <= pattern.width; x += 1) {
      const major = x % 5 === 0;
      ctx.strokeStyle = major ? "rgba(28, 37, 32, .42)" : "rgba(28, 37, 32, .15)";
      ctx.lineWidth = major ? Math.max(0.9, size / 12) : Math.max(0.5, size / 22);
      const position = leftGutter + x * size;
      ctx.beginPath(); ctx.moveTo(position, topGutter); ctx.lineTo(position, topGutter + patternHeight); ctx.stroke();
    }
    for (let y = 0; y <= pattern.height; y += 1) {
      const major = y % 5 === 0;
      ctx.strokeStyle = major ? "rgba(28, 37, 32, .42)" : "rgba(28, 37, 32, .15)";
      ctx.lineWidth = major ? Math.max(0.9, size / 12) : Math.max(0.5, size / 22);
      const position = topGutter + y * size;
      ctx.beginPath(); ctx.moveTo(leftGutter, position); ctx.lineTo(leftGutter + patternWidth, position); ctx.stroke();
    }

    ctx.fillStyle = "#55615b";
    ctx.font = `600 ${Math.max(11, Math.min(17, Math.floor(size * 0.72)))}px ui-monospace, monospace`;
    for (let x = 5; x <= pattern.width; x += 5) {
      ctx.textAlign = x === pattern.width ? "right" : "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(String(x), leftGutter + x * size, topGutter - 6);
    }
    for (let y = 5; y <= pattern.height; y += 5) {
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(String(y), leftGutter - 6, topGutter + y * size);
    }
  }

  if (includeMaterials) {
    const sectionTop = topGutter + patternHeight;
    const contentLeft = leftGutter + materialPadding;
    const swatchSize = Math.max(24, Math.ceil(size * 0.72));

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, sectionTop, canvas.width, materialHeight);
    ctx.strokeStyle = "#cfd6d1";
    ctx.lineWidth = Math.max(1, size * 0.045);
    ctx.beginPath();
    ctx.moveTo(leftGutter, sectionTop + 0.5);
    ctx.lineTo(leftGutter + patternWidth, sectionTop + 0.5);
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#17201b";
    ctx.font = `700 ${Math.max(26, Math.floor(size * 0.74))}px ui-sans-serif, system-ui, sans-serif`;
    const summaryY = sectionTop + materialPadding + materialHeaderHeight * 0.38;
    ctx.fillText("材料清单", contentLeft, summaryY);
    const titleWidth = ctx.measureText("材料清单").width;
    ctx.textAlign = "left";
    ctx.font = `700 ${Math.max(20, Math.floor(size * 0.56))}px ui-sans-serif, system-ui, sans-serif`;
    const brandSummary = PALETTES[pattern.brand]?.label ?? pattern.brand;
    const totalSummary = `总豆数：${totalBeads.toLocaleString()} 豆`;
    const colorSummary = `颜色：${materialItems.length} 种`;
    const sizeSummary = `尺寸：${pattern.width} × ${pattern.height} 豆`;
    const titleGap = Math.max(96, size * 3.6);
    const summaryGap = Math.max(28, size * 0.85);
    let summaryX = contentLeft + titleWidth + titleGap;
    ctx.fillText(brandSummary, summaryX, summaryY);
    summaryX += ctx.measureText(brandSummary).width + summaryGap;
    ctx.fillText(totalSummary, summaryX, summaryY);
    summaryX += ctx.measureText(totalSummary).width + summaryGap;
    ctx.fillText(colorSummary, summaryX, summaryY);
    summaryX += ctx.measureText(colorSummary).width + summaryGap;
    ctx.fillText(sizeSummary, summaryX, summaryY);

    const rowsTop = sectionTop + materialPadding + materialHeaderHeight;
    materialItems.forEach((item, index) => {
      const column = index % materialColumns;
      const row = Math.floor(index / materialColumns);
      const x = contentLeft + column * (materialCardWidth + materialGap);
      const y = rowsTop + row * materialRowHeight;
      const centerY = y + materialRowHeight / 2;

      ctx.fillStyle = "#f5f7f5";
      ctx.fillRect(x, y + Math.max(3, size * 0.08), materialCardWidth, materialRowHeight - Math.max(6, size * 0.16));
      ctx.fillStyle = item.color.hex;
      const itemPadding = Math.max(8, size * 0.24);
      ctx.fillRect(x + itemPadding, centerY - swatchSize / 2, swatchSize, swatchSize);
      ctx.strokeStyle = "rgba(23,32,27,.25)";
      ctx.lineWidth = Math.max(1, size * 0.035);
      ctx.strokeRect(x + itemPadding, centerY - swatchSize / 2, swatchSize, swatchSize);

      const textX = x + itemPadding + swatchSize + Math.max(8, size * 0.24);
      ctx.textAlign = "left";
      ctx.fillStyle = "#17201b";
      ctx.font = `700 ${Math.max(14, Math.floor(size * 0.42))}px ui-monospace, monospace`;
      ctx.fillText(item.color.code, textX, centerY);
      ctx.textAlign = "right";
      ctx.font = `700 ${Math.max(14, Math.floor(size * 0.42))}px ui-sans-serif, system-ui, sans-serif`;
      ctx.fillText(`${item.count.toLocaleString()} 颗`, x + materialCardWidth - itemPadding, centerY);
    });
  }
}

function countStats(pattern: Pattern | null) {
  if (!pattern) return { total: 0, colors: [] as { index: number; count: number; color: BeadColor }[] };
  const counts = colorCounts(pattern.cells, pattern.palette.length);
  const colors = counts.map((count, index) => ({ index, count, color: pattern.palette[index] }))
    .filter((item) => item.count > 0).sort((a, b) => b.count - a.count);
  return { total: colors.reduce((sum, item) => sum + item.count, 0), colors };
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Local HTML files may not receive the modern clipboard permission.
    }
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Clipboard is unavailable");
}

export function BeadStudio() {
  const [source, setSource] = useState<SourceImage | null>(null);
  const [brand, setBrand] = useState("mard");
  const [width, setWidth] = useState(DEFAULTS.width);
  const [maxColors, setMaxColors] = useState(DEFAULTS.maxColors);
  const [sampleMode, setSampleMode] = useState<SampleMode>(DEFAULTS.sampleMode);
  const [removeBackground, setRemoveBackground] = useState(DEFAULTS.removeBackground);
  const [minColorCount, setMinColorCount] = useState(DEFAULTS.minColorCount);
  const [smallRegionSize, setSmallRegionSize] = useState(DEFAULTS.smallRegionSize);
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [originalPattern, setOriginalPattern] = useState<Pattern | null>(null);
  const [history, setHistory] = useState<Uint16Array[]>([]);
  const [tool, setTool] = useState<Tool>("view");
  const [selectedColor, setSelectedColor] = useState(0);
  const [shape, setShape] = useState<BeadShape>("square");
  const [showGrid, setShowGrid] = useState(true);
  const [viewZoom, setViewZoom] = useState(1);
  const [viewPan, setViewPan] = useState({ x: 0, y: 0 });
  const [brushPaletteOpen, setBrushPaletteOpen] = useState(false);
  const [replaceOpen, setReplaceOpen] = useState(false);
  const [replaceFrom, setReplaceFrom] = useState<number | null>(null);
  const [replaceTo, setReplaceTo] = useState<BeadColor | null>(null);
  const [converting, setConverting] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const brushPanelRef = useRef<HTMLElement>(null);
  const replacePanelRef = useRef<HTMLElement>(null);
  const strokePointerRef = useRef<number | null>(null);
  const strokeLastCellRef = useRef<number | null>(null);
  const viewPointersRef = useRef(new Map<number, { x: number; y: number }>());
  const viewTransformRef = useRef({ zoom: 1, x: 0, y: 0 });
  const viewGestureRef = useRef({ zoom: 1, x: 0, y: 0, distance: 0, centerX: 0, centerY: 0 });
  const autoGeneratedSourceRef = useRef<string | null>(null);
  const loadRequestRef = useRef(0);
  const conversionRequestRef = useRef(0);

  const palette = PALETTES[brand];
  const stats = useMemo(() => countStats(pattern), [pattern]);

  const loadFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setMessage("请选择 PNG、JPG 或 WebP 图片");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setMessage("图片请控制在 20MB 以内");
      return;
    }
    const requestId = ++loadRequestRef.current;
    conversionRequestRef.current += 1;
    setConverting(false);
    let bitmap: ImageBitmap | null = null;
    try {
      bitmap = await createImageBitmap(file);
      const ratio = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(bitmap.width * ratio));
      canvas.height = Math.max(1, Math.round(bitmap.height * ratio));
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) throw new Error("Canvas is unavailable");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      if (requestId !== loadRequestRef.current) return;
      const url = URL.createObjectURL(file);
      setSource((previous) => {
        if (previous) URL.revokeObjectURL(previous.url);
        return { width: canvas.width, height: canvas.height, data, name: file.name, url };
      });
      setPattern(null);
      setOriginalPattern(null);
      setHistory([]);
      setReplaceOpen(false);
      setReplaceFrom(null);
      setReplaceTo(null);
      setMessage("");
    } catch {
      if (requestId === loadRequestRef.current) setMessage("图片读取失败，请换一张 PNG、JPG 或 WebP 图片重试");
    } finally {
      bitmap?.close();
    }
  }, []);

  const generate = useCallback(async () => {
    if (!source) return;
    const requestId = ++conversionRequestRef.current;
    setConverting(true);
    setMessage("");
    await new Promise((resolve) => setTimeout(resolve, 30));
    if (requestId !== conversionRequestRef.current) return;
    const started = performance.now();
    try {
      const { width: targetWidth, height: targetHeight } = patternDimensions(source, width);
      const sampled = sampleSource(source, targetWidth, targetHeight, sampleMode);
      let firstCells = mapPixels(sampled, palette.colors, targetWidth, targetHeight);
      if (removeBackground) firstCells = new Uint16Array(floodRemoveBackground(firstCells, targetWidth, targetHeight, palette.colors));
      const selected = selectPalette(firstCells, palette.colors, Math.max(1, maxColors));
      const masked = new Uint8ClampedArray(sampled);
      for (let i = 0; i < firstCells.length; i += 1) if (firstCells[i] === EMPTY) masked[i * 4 + 3] = 0;
      const cells = mapPixels(masked, selected, targetWidth, targetHeight);
      let next: Pattern = { width: targetWidth, height: targetHeight, cells, palette: selected, brand, duration: 0 };
      next = mergeRareColors(next, minColorCount);
      next = cleanSmallRegions(next, smallRegionSize);
      if (smallRegionSize) next = smoothContourSpikes(next);
      next.duration = Math.round(performance.now() - started);
      if (requestId !== conversionRequestRef.current) return;
      setPattern(next);
      setOriginalPattern({ ...next, cells: new Uint16Array(next.cells) });
      setHistory([]);
      setSelectedColor(countStats(next).colors[0]?.index ?? 0);
      setTool("view");
      viewTransformRef.current = { zoom: 1, x: 0, y: 0 };
      setViewZoom(1);
      setViewPan({ x: 0, y: 0 });
      setReplaceOpen(false);
      setReplaceFrom(null);
      setReplaceTo(null);
    } catch {
      if (requestId === conversionRequestRef.current) setMessage("转换失败，请尝试降低图纸大小或更换图片");
    } finally {
      if (requestId === conversionRequestRef.current) setConverting(false);
    }
  }, [source, width, sampleMode, palette, removeBackground, maxColors, brand, minColorCount, smallRegionSize]);

  useEffect(() => {
    if (!pattern || !canvasRef.current) return;
    renderPattern(canvasRef.current, pattern, shape, showGrid, false);
  }, [pattern, shape, showGrid]);

  useEffect(() => {
    if (!source || autoGeneratedSourceRef.current === source.url) return;
    autoGeneratedSourceRef.current = source.url;
    void generate();
  }, [source, generate]);

  useEffect(() => () => { if (source) URL.revokeObjectURL(source.url); }, [source]);

  useEffect(() => {
    if (!brushPaletteOpen) return;
    const closeOnOutsidePointer = (event: globalThis.PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (brushPanelRef.current?.contains(target) || target.closest("[data-brush-palette-trigger]")) return;
      setBrushPaletteOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [brushPaletteOpen]);

  useEffect(() => {
    if (!replaceOpen) return;
    const closeOnOutsidePointer = (event: globalThis.PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (replacePanelRef.current?.contains(target) || target.closest("[data-color-replace-trigger]")) return;
      setReplaceOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [replaceOpen]);

  const changeCell = (index: number) => {
    if (!pattern || index < 0 || index >= pattern.cells.length) return;
    if (tool === "view") return;
    if (tool === "picker") {
      if (pattern.cells[index] !== EMPTY) {
        setSelectedColor(pattern.cells[index]);
        setTool("brush");
      }
      return;
    }
    const cells = new Uint16Array(pattern.cells);
    const before = cells[index];
    if (tool === "fill") {
      const target = selectedColor;
      if (before === target) return;
      const stack = [index];
      const seen = new Uint8Array(cells.length);
      while (stack.length) {
        const current = stack.pop()!;
        if (seen[current] || cells[current] !== before) continue;
        seen[current] = 1;
        cells[current] = target;
        const x = current % pattern.width;
        const y = Math.floor(current / pattern.width);
        if (x) stack.push(current - 1);
        if (x < pattern.width - 1) stack.push(current + 1);
        if (y) stack.push(current - pattern.width);
        if (y < pattern.height - 1) stack.push(current + pattern.width);
      }
    } else {
      const target = tool === "eraser" ? EMPTY : selectedColor;
      if (before === target) return;
      cells[index] = target;
    }
    setHistory((items) => [...items.slice(-29), new Uint16Array(pattern.cells)]);
    setPattern({ ...pattern, cells });
  };

  const pointerCellIndex = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!pattern || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const canvasX = (event.clientX - rect.left) / rect.width * canvasRef.current.width;
    const canvasY = (event.clientY - rect.top) / rect.height * canvasRef.current.height;
    const cellSize = Number(canvasRef.current.dataset.cellSize) || canvasRef.current.width / pattern.width;
    const offsetX = Number(canvasRef.current.dataset.gridOffsetX) || 0;
    const offsetY = Number(canvasRef.current.dataset.gridOffsetY) || 0;
    const x = Math.floor((canvasX - offsetX) / cellSize);
    const y = Math.floor((canvasY - offsetY) / cellSize);
    if (x < 0 || x >= pattern.width || y < 0 || y >= pattern.height) return;
    return y * pattern.width + x;
  };

  const applyViewTransform = (zoom: number, x: number, y: number) => {
    const next = { zoom: Math.min(4, Math.max(0.5, zoom)), x, y };
    viewTransformRef.current = next;
    setViewZoom(next.zoom);
    setViewPan({ x: next.x, y: next.y });
  };

  const beginViewGesture = () => {
    const points = [...viewPointersRef.current.values()];
    const current = viewTransformRef.current;
    const centerX = points.reduce((sum, point) => sum + point.x, 0) / Math.max(1, points.length);
    const centerY = points.reduce((sum, point) => sum + point.y, 0) / Math.max(1, points.length);
    const distance = points.length > 1 ? Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y) : 0;
    viewGestureRef.current = { ...current, distance, centerX, centerY };
  };

  const paintStroke = (fromIndex: number, toIndex: number) => {
    if (tool !== "brush" && tool !== "eraser") return;
    setPattern((current) => {
      if (!current) return current;
      const cells = new Uint16Array(current.cells);
      const target = tool === "eraser" ? EMPTY : selectedColor;
      let x0 = fromIndex % current.width;
      let y0 = Math.floor(fromIndex / current.width);
      const x1 = toIndex % current.width;
      const y1 = Math.floor(toIndex / current.width);
      const dx = Math.abs(x1 - x0);
      const dy = Math.abs(y1 - y0);
      const stepX = x0 < x1 ? 1 : -1;
      const stepY = y0 < y1 ? 1 : -1;
      let error = dx - dy;
      let changed = false;
      while (true) {
        const index = y0 * current.width + x0;
        if (cells[index] !== target) {
          cells[index] = target;
          changed = true;
        }
        if (x0 === x1 && y0 === y1) break;
        const doubledError = error * 2;
        if (doubledError > -dy) {
          error -= dy;
          x0 += stepX;
        }
        if (doubledError < dx) {
          error += dx;
          y0 += stepY;
        }
      }
      return changed ? { ...current, cells } : current;
    });
  };

  const handleCanvasPointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!pattern || (event.pointerType === "mouse" && event.button !== 0)) return;
    if (tool === "view") {
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      viewPointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
      beginViewGesture();
      return;
    }
    const index = pointerCellIndex(event);
    if (index === undefined) return;
    if (tool !== "brush" && tool !== "eraser") {
      changeCell(index);
      return;
    }
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    strokePointerRef.current = event.pointerId;
    strokeLastCellRef.current = index;
    setHistory((items) => [...items.slice(-29), new Uint16Array(pattern.cells)]);
    paintStroke(index, index);
  };

  const handleCanvasPointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (tool === "view" && viewPointersRef.current.has(event.pointerId)) {
      event.preventDefault();
      viewPointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
      const points = [...viewPointersRef.current.values()];
      const gesture = viewGestureRef.current;
      const centerX = points.reduce((sum, point) => sum + point.x, 0) / points.length;
      const centerY = points.reduce((sum, point) => sum + point.y, 0) / points.length;
      const distance = points.length > 1 ? Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y) : 0;
      const zoom = points.length > 1 && gesture.distance > 0 ? gesture.zoom * distance / gesture.distance : gesture.zoom;
      applyViewTransform(zoom, gesture.x + centerX - gesture.centerX, gesture.y + centerY - gesture.centerY);
      return;
    }
    if (strokePointerRef.current !== event.pointerId || strokeLastCellRef.current === null) return;
    event.preventDefault();
    const index = pointerCellIndex(event);
    if (index === undefined || index === strokeLastCellRef.current) return;
    paintStroke(strokeLastCellRef.current, index);
    strokeLastCellRef.current = index;
  };

  const endCanvasStroke = (event: PointerEvent<HTMLCanvasElement>) => {
    if (viewPointersRef.current.has(event.pointerId)) {
      viewPointersRef.current.delete(event.pointerId);
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      if (viewPointersRef.current.size) beginViewGesture();
      return;
    }
    if (strokePointerRef.current !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    strokePointerRef.current = null;
    strokeLastCellRef.current = null;
  };

  const handleCanvasWheel = (event: WheelEvent<HTMLCanvasElement>) => {
    if (tool !== "view") return;
    event.preventDefault();
    const current = viewTransformRef.current;
    applyViewTransform(current.zoom * (event.deltaY < 0 ? 1.12 : 0.89), current.x, current.y);
  };

  const undo = () => {
    if (!pattern || !history.length) return;
    const cells = history[history.length - 1];
    setHistory((items) => items.slice(0, -1));
    setPattern({ ...pattern, cells: new Uint16Array(cells) });
  };

  const mirrorPattern = () => {
    if (!pattern) return;
    const cells = new Uint16Array(pattern.cells.length);
    for (let y = 0; y < pattern.height; y += 1) {
      for (let x = 0; x < pattern.width; x += 1) {
        cells[y * pattern.width + x] = pattern.cells[y * pattern.width + pattern.width - 1 - x];
      }
    }
    setHistory((items) => [...items.slice(-29), new Uint16Array(pattern.cells)]);
    setPattern({ ...pattern, cells });
  };

  const toggleColorReplace = () => {
    if (!pattern) return;
    if (!replaceOpen) {
      setReplaceFrom((current) => stats.colors.some((item) => item.index === current) ? current : (stats.colors[0]?.index ?? null));
      setReplaceTo(null);
      setBrushPaletteOpen(false);
    }
    setReplaceOpen((open) => !open);
  };

  const activateTool = (nextTool: Tool) => {
    setTool(nextTool);
    setBrushPaletteOpen(nextTool === "brush");
  };

  const selectBrushColor = (color: BeadColor) => {
    if (!pattern) return;
    const existingIndex = pattern.palette.findIndex((item) => item.code === color.code && item.hex === color.hex);
    const colorIndex = existingIndex >= 0 ? existingIndex : pattern.palette.length;
    if (existingIndex < 0) setPattern({ ...pattern, palette: [...pattern.palette, color] });
    setSelectedColor(colorIndex);
    setTool("brush");
    setBrushPaletteOpen(false);
  };

  const openColorReplace = (colorIndex: number) => {
    if (!pattern) return;
    setBrushPaletteOpen(false);
    setReplaceFrom(colorIndex);
    setReplaceTo(null);
    setReplaceOpen(true);
  };

  const applyColorReplace = () => {
    if (!pattern || replaceFrom === null || !replaceTo) return;
    const sourceColor = pattern.palette[replaceFrom];
    if (!sourceColor || (sourceColor.code === replaceTo.code && sourceColor.hex === replaceTo.hex)) return;
    const nextPalette = [...pattern.palette];
    let targetIndex = nextPalette.findIndex((color) => color.code === replaceTo.code && color.hex === replaceTo.hex);
    if (targetIndex < 0) {
      targetIndex = nextPalette.length;
      nextPalette.push(replaceTo);
    }
    const cells = new Uint16Array(pattern.cells);
    for (let index = 0; index < cells.length; index += 1) if (cells[index] === replaceFrom) cells[index] = targetIndex;
    setHistory((items) => [...items.slice(-29), new Uint16Array(pattern.cells)]);
    setPattern({ ...pattern, palette: nextPalette, cells });
    setSelectedColor(targetIndex);
    setMessage(`${sourceColor.code} 已批量替换为 ${replaceTo.code}`);
    setTimeout(() => setMessage(""), 1800);
  };

  const downloadPng = () => {
    if (!pattern) return;
    const canvas = document.createElement("canvas");
    const scale = exportCellSize(pattern);
    renderPattern(canvas, pattern, shape, true, true, scale, true);
    canvas.toBlob((blob) => {
      if (!blob) {
        setMessage("图纸导出失败，请重试");
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `${source?.name.replace(/\.[^.]+$/, "") ?? "bead-pattern"}-${pattern.width}x${pattern.height}.png`;
      link.href = url;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  };

  const printPattern = () => {
    if (!pattern || !canvasRef.current) return;
    const scale = exportCellSize(pattern);
    renderPattern(canvasRef.current, pattern, shape, true, true, scale, true);
    const restorePreview = () => {
      if (canvasRef.current) renderPattern(canvasRef.current, pattern, shape, showGrid, false);
    };
    window.addEventListener("afterprint", restorePreview, { once: true });
    requestAnimationFrame(() => window.print());
  };

  const copyList = async () => {
    const rows = [["色号", "颜色", "数量", "占比"], ...stats.colors.map((item) => [item.color.code, item.color.hex, String(item.count), `${(item.count / Math.max(1, stats.total) * 100).toFixed(1)}%`])];
    try {
      await copyText(rows.map((row) => row.join("\t")).join("\n"));
      setMessage("材料清单已复制");
    } catch {
      setMessage("复制失败，请检查浏览器的剪贴板权限");
    }
    setTimeout(() => setMessage(""), 1800);
  };

  const resetProject = () => {
    loadRequestRef.current += 1;
    conversionRequestRef.current += 1;
    setConverting(false);
    if (source) URL.revokeObjectURL(source.url);
    autoGeneratedSourceRef.current = null;
    setSource(null);
    setPattern(null);
    setOriginalPattern(null);
    setHistory([]);
    setReplaceOpen(false);
    setReplaceFrom(null);
    setReplaceTo(null);
    setMessage("");
  };

  const onFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) loadFile(file);
    event.target.value = "";
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) loadFile(file);
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brandmark" aria-label="拼豆图纸生成器">
          <span className="brand-icon" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /></span>
          <span>拼豆图纸生成器</span>
        </div>
        <div className="topbar-note"><span className="status-dot" /> 本地处理 · 图片不会上传</div>
        {source && <button className="text-button" onClick={resetProject}>新建图纸</button>}
      </header>

      <section className="studio-layout">
          <aside className="panel controls-panel">
            <button
              className={`source-upload ${source ? "has-source" : ""} ${dragging ? "is-dragging" : ""}`}
              onClick={() => fileRef.current?.click()}
              onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
            >
              {source ? <>
                {/* Blob URL 只存在于本地浏览器，不能由图片优化服务处理。 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={source.url} alt="已导入图片" />
              </> : <span className="upload-mark" aria-hidden="true">＋</span>}
              <span className="upload-copy">
                <strong>{source ? source.name : "导入图片"}</strong>
                <small>{source ? "点击或拖放以替换" : "拖放到这里，或点击选择"}</small>
                <small>PNG / JPG / WebP · 最大 20MB</small>
              </span>
            </button>

            <div className="panel-heading">
              <div>
                <span className="step">01</span>
                <h2>参数</h2>
              </div>
            </div>

            <label className="field">
              <span>色卡品牌</span>
              <select value={brand} onChange={(event) => setBrand(event.target.value)}>
                {PALETTE_ORDER.map((key) => <option value={key} key={key}>{PALETTES[key].label} · {PALETTES[key].colors.length} 色</option>)}
              </select>
            </label>

            <div className="preset-row">
              {[52, 78, 104].map((value, index) => <button key={value} className={width === value ? "active" : ""} onClick={() => { setWidth(value); setMaxColors([8, 10, 12][index]); }}>{["小", "中", "大"][index]} <b>{value}</b></button>)}
            </div>

            <RangeField label="图纸大小" value={width} min={16} max={256} unit="豆" onChange={setWidth} />
            <RangeField label="最大颜色" value={maxColors} min={4} max={Math.min(96, palette.colors.length)} unit="色" onChange={setMaxColors} />

            <Segmented label="取样方式" value={sampleMode} options={[{ value: "auto", label: "自动" }, { value: "dominant", label: "主导色" }, { value: "smooth", label: "平滑" }]} onChange={(value) => setSampleMode(value as SampleMode)} />

            <div className="settings-group">
              <Toggle label="自动移除背景" checked={removeBackground} onChange={setRemoveBackground} />
            </div>

            <section className="advanced">
              <h3>图纸整理</h3>
              <RangeField label="合并少量色号" value={minColorCount} min={0} max={12} unit="个" onChange={setMinColorCount} />
              <RangeField label="清理孤立区域" value={smallRegionSize} min={0} max={12} unit="格" onChange={setSmallRegionSize} />
            </section>

            <button className="primary generate" disabled={!source || converting} onClick={generate}>
              {converting ? <><span className="spinner" /> 正在计算图纸</> : pattern ? "重新生成" : "生成拼豆图纸"}
            </button>
          </aside>

          <>
            <div className="canvas-column">
              <div className="panel canvas-panel">
              <div className="canvas-toolbar">
                <div className="tool-group" aria-label="编辑工具">
                  {([['view', '查看'], ['brush', '画笔'], ['eraser', '橡皮'], ['picker', '取色'], ['fill', '填充']] as [Tool, string][]).map(([value, label]) => <button key={value} className={tool === value ? "active" : ""} onClick={() => activateTool(value)} disabled={!pattern} data-brush-palette-trigger={value === "brush" ? "" : undefined}>{label}</button>)}
                  <button className={replaceOpen ? "active" : ""} onClick={toggleColorReplace} disabled={!pattern} data-color-replace-trigger>换色</button>
                </div>
                <div className="tool-group compact">
                  {pattern && <div className="zoom-controls" aria-label="查看缩放">
                    <button onClick={() => applyViewTransform(viewTransformRef.current.zoom / 1.2, viewTransformRef.current.x, viewTransformRef.current.y)} aria-label="缩小图纸">−</button>
                    <button className="zoom-value" onClick={() => applyViewTransform(1, 0, 0)} aria-label="重置图纸缩放">{Math.round(viewZoom * 100)}%</button>
                    <button onClick={() => applyViewTransform(viewTransformRef.current.zoom * 1.2, viewTransformRef.current.x, viewTransformRef.current.y)} aria-label="放大图纸">＋</button>
                  </div>}
                  <button onClick={mirrorPattern} disabled={!pattern} aria-label="水平镜像">↔ 镜像</button>
                  <button onClick={undo} disabled={!history.length}>撤销</button>
                  <button onClick={() => originalPattern && setPattern({ ...originalPattern, cells: new Uint16Array(originalPattern.cells) })} disabled={!originalPattern}>复原</button>
                </div>
              </div>

              {brushPaletteOpen && pattern && !replaceOpen && (
                <section ref={brushPanelRef} className="brush-palette-popover" aria-label="画笔颜色面板">
                  <div className="replace-heading">
                    <strong>画笔颜色</strong>
                    <div className="brush-current-color">
                      <button className="brush-picker" onClick={() => { setTool("picker"); setBrushPaletteOpen(false); }} aria-label="切换到取色工具" title="取色">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path className="pipette-bulb" d="M16.5 7.5 18 6a2.8 2.8 0 1 1 4 4l-1.5 1.5" />
                          <path d="m14 7 3 3" />
                          <path d="m15.5 8.5-9 9L5 21h3.5l9-9" />
                          <path className="pipette-drop" d="M3.8 19.2s-1.5 1.7-1.5 2.6a1.5 1.5 0 0 0 3 0c0-.9-1.5-2.6-1.5-2.6Z" />
                        </svg>
                      </button>
                      {pattern.palette[selectedColor] && <span style={colorChipStyle(pattern.palette[selectedColor])}>{pattern.palette[selectedColor].code}</span>}
                    </div>
                  </div>
                  <div className="brush-palette-grid">
                    {(PALETTES[pattern.brand]?.colors ?? pattern.palette).map((color) => {
                      const selected = pattern.palette[selectedColor]?.code === color.code && pattern.palette[selectedColor]?.hex === color.hex;
                      return <button key={`${color.code}-${color.hex}`} className={selected ? "selected" : ""} style={colorChipStyle(color)} onClick={() => selectBrushColor(color)} aria-pressed={selected} aria-label={`选择画笔颜色 ${color.code}`}>{color.code}</button>;
                    })}
                  </div>
                </section>
              )}

              {replaceOpen && pattern && (
                <section ref={replacePanelRef} className="replace-popover" aria-label="批量换色面板">
                  <div className="replace-heading">
                    <strong>批量换色</strong>
                    <span>{replaceFrom === null ? "选择原色" : pattern.palette[replaceFrom]?.code} → {replaceTo?.code ?? "选择目标色"}</span>
                  </div>
                  <div className="replace-label">原色</div>
                  <div className="replace-source-list">
                    {stats.colors.map((item) => (
                      <button
                        key={item.index}
                        className={replaceFrom === item.index ? "selected" : ""}
                        style={colorChipStyle(item.color)}
                        onClick={() => setReplaceFrom(item.index)}
                        aria-pressed={replaceFrom === item.index}
                      >{item.color.code}</button>
                    ))}
                  </div>
                  <div className="replace-target-heading">
                    <div className="replace-label">目标色</div>
                    {replaceTo && <span style={colorChipStyle(replaceTo)}>{replaceTo.code}</span>}
                  </div>
                  <div className="replace-target-grid">
                    {(PALETTES[pattern.brand]?.colors ?? pattern.palette).map((color) => {
                      const selected = replaceTo?.code === color.code && replaceTo.hex === color.hex;
                      return <button key={`${color.code}-${color.hex}`} className={selected ? "selected" : ""} style={colorChipStyle(color)} onClick={() => setReplaceTo(color)} aria-pressed={selected}>{color.code}</button>;
                    })}
                  </div>
                  <button className="replace-apply" onClick={applyColorReplace} disabled={replaceFrom === null || !replaceTo || (pattern.palette[replaceFrom]?.code === replaceTo.code && pattern.palette[replaceFrom]?.hex === replaceTo.hex)}>替换全部</button>
                </section>
              )}

              <div className={`canvas-stage ${pattern ? "has-pattern" : ""}`}>
                {pattern ? (
                  <canvas
                    ref={canvasRef}
                    className={tool === "view" ? "view-canvas" : "edit-canvas"}
                    onPointerDown={handleCanvasPointerDown}
                    onPointerMove={handleCanvasPointerMove}
                    onPointerUp={endCanvasStroke}
                    onPointerCancel={endCanvasStroke}
                    onWheel={handleCanvasWheel}
                    style={{
                      touchAction: tool === "view" || tool === "brush" || tool === "eraser" ? "none" : "auto",
                      transform: `translate(${viewPan.x}px, ${viewPan.y}px) scale(${viewZoom})`,
                      cursor: tool === "view" ? "grab" : "crosshair",
                    }}
                    aria-label="可编辑拼豆图纸"
                  />
                ) : (
                  <div className="canvas-placeholder">
                    <div className="placeholder-grid" aria-hidden="true" />
                    <strong>{source ? "参数准备好了" : "先导入一张图片"}</strong>
                    <span>{source ? "点击左侧“生成拼豆图纸”查看结果" : "从左上角选择文件，或直接拖入图片"}</span>
                  </div>
                )}
                {converting && <div className="processing"><span className="spinner dark" /><strong>正在寻找最合适的豆色…</strong></div>}
              </div>

              <div className="view-options">
                <Segmented label="豆子外观" value={shape} options={[{ value: "square", label: "方格" }, { value: "round", label: "圆豆" }]} onChange={(value) => setShape(value as BeadShape)} compact />
                <Toggle label="网格" checked={showGrid} onChange={setShowGrid} compact />
              </div>
              </div>
              {message && <div className="toast" role="status">{message}</div>}
            </div>

            <aside className="panel results-panel">
            <div className="panel-heading results-heading">
              <div><span className="step">02</span><h2>图纸清单</h2></div>
              {pattern && <span className="time-badge">{pattern.duration} ms</span>}
            </div>
            {pattern ? (
              <>
                <div className="stat-grid">
                  <Stat label="总豆数" value={`${stats.total.toLocaleString()} 豆`} />
                  <Stat label="颜色" value={`${stats.colors.length} 种`} />
                  <Stat label="尺寸" value={`${pattern.width} × ${pattern.height} 豆`} />
                </div>

                <div className="palette-strip">{stats.colors.slice(0, 18).map((item) => <i key={item.index} style={{ background: item.color.hex, flexGrow: item.count }} />)}</div>

                <div className="list-heading"><h3>材料清单</h3><button onClick={copyList}>复制 TSV</button></div>
                <div className="material-list">
                  {stats.colors.map((item) => (
                    <div key={item.index} className={`material-row ${selectedColor === item.index ? "selected" : ""}`}>
                      <button className="material-color-select" onClick={() => { setSelectedColor(item.index); setTool("brush"); setBrushPaletteOpen(false); }} aria-label={`选择 ${item.color.code} 作为画笔颜色`}>
                        <i style={{ background: item.color.hex }} />
                        <span><b>{item.color.code}</b><small>{item.color.hex}</small></span>
                      </button>
                      <button className="material-replace" onClick={() => openColorReplace(item.index)} aria-label={`替换色号 ${item.color.code}`} title={`替换 ${item.color.code}`} data-color-replace-trigger>⇆</button>
                      <span className="material-metrics">
                        <strong>{item.count}</strong>
                        <em>{(item.count / Math.max(1, stats.total) * 100).toFixed(1)}%</em>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="export-actions">
                  <button className="primary" onClick={downloadPng}>下载 PNG 图纸</button>
                  <button className="secondary" onClick={printPattern}>打印 / 保存 PDF</button>
                </div>
              </>
            ) : (
              <div className="results-empty"><span>生成图纸后，这里会显示精确豆数、颜色占比和采购清单。</span></div>
            )}
            </aside>
          </>
      </section>

      <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={onFileInput} />
      <footer><span>拼豆图纸生成器</span><span>纯前端 · 无需登录 · 可离线使用</span></footer>
    </main>
  );
}

function RangeField({ label, value, min, max, unit, onChange }: { label: string; value: number; min: number; max: number; unit: string; onChange: (value: number) => void }) {
  const progress = (value - min) / Math.max(1, max - min) * 100;
  return <label className="range-field"><span><b>{label}</b><em>{value} {unit}</em></span><input aria-label={label} type="range" min={min} max={max} value={Math.min(value, max)} style={{ "--progress": `${progress}%` } as React.CSSProperties} onChange={(event) => onChange(Number(event.target.value))} /></label>;
}

function Segmented({ label, value, options, onChange, compact = false }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (value: string) => void; compact?: boolean }) {
  return <div className={`segmented-field ${compact ? "is-compact" : ""}`}>{!compact && <span>{label}</span>}<div>{options.map((option) => <button key={option.value} className={value === option.value ? "active" : ""} onClick={() => onChange(option.value)}>{option.label}</button>)}</div></div>;
}

function Toggle({ label, checked, onChange, compact = false }: { label: string; checked: boolean; onChange: (checked: boolean) => void; compact?: boolean }) {
  return <button className={`toggle ${checked ? "on" : ""} ${compact ? "is-compact" : ""}`} role="switch" aria-checked={checked} onClick={() => onChange(!checked)}><span>{label}</span><i /></button>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="stat"><span>{label}</span><strong>{value}</strong></div>;
}
