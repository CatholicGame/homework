/**
 * 🗺️ Bản đồ km², ha (Toán 5 Bài 15): một bản vẽ liền mạch, phóng / thu bằng khung nhìn (canvas.js t.view).
 *   1 m²: ô vuông cạnh 1 m, có bạn nhỏ đứng cạnh.
 *   1 ha: thửa đất vuông cạnh 100 m (có sân bóng), lưới 10 × 10 ô (mỗi ô 10 m × 10 m = 100 m²), quét đếm 10 000 m².
 *   1 km²: một phường nhỏ cạnh 1 km = 10 × 10 thửa 1 ha (nhà, đường, trường, công viên, hồ, ruộng), quét đếm 100 ha.
 * Đơn vị vẽ: 1 m = 10. Phường đặt ở (0, 0)–(10 000, 10 000); thửa 1 ha là ô (4, 5) của phường.
 */

import { createCanvas } from '../grade4Tools/canvas.js';
import { sleep } from '../grade3Drills/kit.js';
import { INK, sfx } from '../grade4Tools/frame.js';
import { fmt } from './num.js';

export const M = 10; // 1 m
export const HA = 100 * M; // cạnh 1 ha
export const KM = 1000 * M; // cạnh 1 km²
export const HX = 4 * HA, HY = 5 * HA; // góc thửa 1 ha
export const SQX = HX + 46 * M, SQY = HY + 88 * M; // ô 1 m² (trong thửa, cạnh sân bóng)
const NS = 'vector-effect="non-scaling-stroke"';

/** Bạn nhỏ đứng (cao h, chân tại x, y). */
export const kid = (x, y, h) => {
  const k = h / 130;
  return `<g transform="translate(${x} ${y}) scale(${k})"><circle cx="0" cy="-112" r="16" fill="#FCD9B6" stroke="${INK}" stroke-width="3" ${NS}/>
    <path d="M-15 -118 Q0 -140 15 -118 L15 -122 Q0 -134 -15 -122 Z" fill="#7C2D12"/><rect x="-16" y="-94" width="32" height="44" rx="8" fill="#F97316" stroke="${INK}" stroke-width="3" ${NS}/>
    <rect x="-14" y="-52" width="12" height="52" fill="#1E3A8A" stroke="${INK}" stroke-width="3" ${NS}/><rect x="2" y="-52" width="12" height="52" fill="#1E3A8A" stroke="${INK}" stroke-width="3" ${NS}/>
    <path d="M-16 -88 L-28 -60 M16 -88 L28 -60" stroke="${INK}" stroke-width="6" stroke-linecap="round" ${NS}/></g>`;
};

// Số ngẫu nhiên cố định (bản vẽ giống nhau mọi lần)
function seeded(seed) { let s = seed; return () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; }

const house = (x, y, w, c, roof) => `<g><rect x="${x}" y="${y}" width="${w}" height="${w * 0.8}" fill="${c}" stroke="${INK}" stroke-width="1.5" ${NS}/><path d="M${x - w * 0.08} ${y + 1} L${x + w / 2} ${y - w * 0.45} L${x + w * 1.08} ${y + 1} Z" fill="${roof}" stroke="${INK}" stroke-width="1.5" ${NS}/></g>`;
const tree = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#4ADE80" stroke="${INK}" stroke-width="1.2" ${NS}/>`;

/** Phường 1 km²: 10 × 10 thửa, thửa (4, 5) là thửa 1 ha để trống (vẽ riêng). */
function district() {
  const rnd = seeded(7);
  let g = `<rect x="0" y="0" width="${KM}" height="${KM}" fill="#D9F99D"/>`;
  const kinds = {};
  // hồ ở góc phải dưới, ruộng ở trái dưới, công viên, trường
  for (const [i, j] of [[7, 7], [8, 7], [7, 8], [8, 8]]) kinds[`${i},${j}`] = 'lake';
  for (const [i, j] of [[0, 7], [1, 7], [0, 8], [1, 8], [0, 9], [1, 9], [2, 9]]) kinds[`${i},${j}`] = 'rice';
  for (const [i, j] of [[5, 2], [6, 2]]) kinds[`${i},${j}`] = 'park';
  kinds['2,3'] = 'school';
  kinds['4,5'] = 'ha';
  for (let j = 0; j < 10; j++) for (let i = 0; i < 10; i++) {
    const x = i * HA, y = j * HA, k = kinds[`${i},${j}`];
    if (k === 'ha') continue;
    if (k === 'rice') {
      g += `<rect x="${x}" y="${y}" width="${HA}" height="${HA}" fill="#A3E635"/>`;
      for (let r = 1; r < 8; r++) g += `<line x1="${x + 40}" y1="${y + r * 125}" x2="${x + HA - 40}" y2="${y + r * 125}" stroke="#65A30D" stroke-width="2" ${NS}/>`;
    } else if (k === 'lake') {
      // vẽ hồ một lần (ô 7,7)
      if (i === 7 && j === 7) g += `<path d="M${x + 150} ${y + 400} Q${x + 300} ${y + 80} ${x + 1000} ${y + 160} Q${x + 1900} ${y + 120} ${x + 1850} ${y + 900} Q${x + 1950} ${y + 1800} ${x + 1100} ${y + 1850} Q${x + 200} ${y + 1900} ${x + 160} ${y + 1100} Z" fill="#7DD3FC" stroke="${INK}" stroke-width="2.5" ${NS}/>
        <path d="M${x + 700} ${y + 900} q60 -40 120 0 M${x + 1200} ${y + 1300} q60 -40 120 0" stroke="#fff" stroke-width="2" fill="none" ${NS}/>`;
    } else if (k === 'park') {
      g += `<rect x="${x}" y="${y}" width="${HA}" height="${HA}" fill="#86EFAC"/>`;
      for (let n = 0; n < 14; n++) g += tree(x + 120 + rnd() * 760, y + 120 + rnd() * 760, 50 + rnd() * 30);
    } else if (k === 'school') {
      g += `<rect x="${x + 120}" y="${y + 150}" width="760" height="300" fill="#FDE68A" stroke="${INK}" stroke-width="2" ${NS}/><path d="M${x + 100} ${y + 150} L${x + 500} ${y + 40} L${x + 900} ${y + 150} Z" fill="#EF4444" stroke="${INK}" stroke-width="2" ${NS}/>
        <rect x="${x + 200}" y="${y + 560}" width="600" height="320" fill="#FCA5A5" stroke="${INK}" stroke-width="2" ${NS}/><line x1="${x + 500}" y1="${y + 40}" x2="${x + 500}" y2="${y - 120}" stroke="${INK}" stroke-width="2" ${NS}/><path d="M${x + 500} ${y - 120} l90 30 l-90 30 Z" fill="#DC2626"/>`;
    } else {
      // khu nhà: 2–3 hàng nhà, cây xen
      const cols = ['#FDE68A', '#BFDBFE', '#FBCFE8', '#FED7AA', '#E9D5FF', '#fff'];
      const roofs = ['#EF4444', '#F97316', '#2563EB', '#DC2626', '#7C3AED'];
      for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
        if (rnd() < 0.18) { g += tree(x + 130 + c * 230, y + 190 + r * 290, 55); continue; }
        g += house(x + 70 + c * 230 + rnd() * 30, y + 150 + r * 290, 130 + rnd() * 30, cols[Math.floor(rnd() * cols.length)], roofs[Math.floor(rnd() * roofs.length)]);
      }
    }
  }
  // đường: dọc giữa các cột 3|4 và 6|7, ngang giữa hàng 4|5 và 1|2 (đường trùng ranh thửa, rộng 12 m)
  const road = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#64748B" stroke-width="120"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#fff" stroke-width="10" stroke-dasharray="80 70"/>`;
  g += road(4 * HA, 0, 4 * HA, KM) + road(7 * HA, 0, 7 * HA, 7 * HA) + road(0, 5 * HA, KM, 5 * HA) + road(0, 2 * HA, KM, 2 * HA);
  // ranh thửa 1 ha mờ
  let grid = '';
  for (let k = 1; k < 10; k++) grid += `<line x1="${k * HA}" y1="0" x2="${k * HA}" y2="${KM}" stroke="#fff" stroke-width="2" stroke-dasharray="8 8" ${NS}/><line x1="0" y1="${k * HA}" x2="${KM}" y2="${k * HA}" stroke="#fff" stroke-width="2" stroke-dasharray="8 8" ${NS}/>`;
  return `<g class="g5b-dist">${g}<g class="g5b-dgrid" opacity="0">${grid}</g><g class="g5b-dsweep"></g></g>`;
}

/** Đồng quê quanh phường (khi thu nhỏ ra 1 km², không để nền trống): ruộng, sông, rặng cây. */
function country() {
  const rnd = seeded(11);
  let g = `<rect x="-20000" y="-20000" width="50000" height="50000" fill="#BEF264"/>`;
  const C = ['#A3E635', '#84CC16', '#D9F99D', '#BEF264'];
  for (let j = -3; j < 6; j++) for (let i = -4; i < 7; i++) {
    const x = i * 2600 - 400, y = j * 2600 - 400;
    if (x > -2600 && x < KM + 200 && y > -2600 && y < KM + 200) continue;
    g += `<rect x="${x}" y="${y}" width="2400" height="2400" fill="${C[Math.floor(rnd() * 4)]}" stroke="#65A30D" stroke-width="2" vector-effect="non-scaling-stroke"/>`;
  }
  g += `<path d="M-20000 ${KM + 1500} C-6000 ${KM + 900} -2000 ${KM + 2600} ${KM / 2} ${KM + 1700} S${KM + 6000} ${KM + 600} 30000 ${KM + 2200}" fill="none" stroke="#38BDF8" stroke-width="900"/>`;
  for (let n = 0; n < 120; n++) {
    const x = -9000 + rnd() * 28000, y = -9000 + rnd() * 28000;
    if (x > -700 && x < KM + 700 && y > -700 && y < KM + 1200) continue;
    g += tree(x, y, 160 + rnd() * 120);
  }
  return `<g class="g5b-country">${g}</g>`;
}

/** Thửa 1 ha: cỏ sọc, sân bóng 90 m × 60 m, lưới 10 m. */
function hectare() {
  const x = HX, y = HY;
  let g = `<rect x="${x}" y="${y}" width="${HA}" height="${HA}" fill="#4ADE80"/>`;
  for (let k = 0; k < 10; k += 2) g += `<rect x="${x}" y="${y + k * 100}" width="${HA}" height="100" fill="#22C55E" opacity="0.35"/>`;
  const px = x + 50, py = y + 60, pw = 900, ph = 600;
  g += `<g fill="none" stroke="#fff" stroke-width="3" ${NS}><rect x="${px}" y="${py}" width="${pw}" height="${ph}"/><line x1="${px + pw / 2}" y1="${py}" x2="${px + pw / 2}" y2="${py + ph}"/>
    <circle cx="${px + pw / 2}" cy="${py + ph / 2}" r="91"/><rect x="${px}" y="${py + 150}" width="160" height="300"/><rect x="${px + pw - 160}" y="${py + 150}" width="160" height="300"/></g>
    <rect x="${px - 20}" y="${py + 265}" width="20" height="70" fill="#fff" stroke="${INK}" stroke-width="1.5" ${NS}/><rect x="${px + pw}" y="${py + 265}" width="20" height="70" fill="#fff" stroke="${INK}" stroke-width="1.5" ${NS}/>`;
  let grid = '';
  for (let k = 1; k < 10; k++) grid += `<line x1="${x + k * 100}" y1="${y}" x2="${x + k * 100}" y2="${y + HA}" stroke="#FEF9C3" stroke-width="2" ${NS}/><line x1="${x}" y1="${y + k * 100}" x2="${x + HA}" y2="${y + k * 100}" stroke="#FEF9C3" stroke-width="2" ${NS}/>`;
  return `<g class="g5b-ha">${g}<g class="g5b-hgrid" opacity="0">${grid}</g><g class="g5b-hsweep"></g>
    <rect x="${x}" y="${y}" width="${HA}" height="${HA}" fill="none" stroke="#DC2626" stroke-width="5" ${NS}/></g>`;
}

/** Ô 1 m² có lưới 10 × 10 ô dm² mờ, bạn nhỏ đứng cạnh. */
function meter() {
  let g = `<rect x="${SQX}" y="${SQY}" width="${M}" height="${M}" fill="#FDE047" stroke="${INK}" stroke-width="4" ${NS}/>`;
  for (let k = 1; k < 10; k++) g += `<line x1="${SQX + k}" y1="${SQY}" x2="${SQX + k}" y2="${SQY + M}" stroke="#CA8A04" stroke-width="0.6" ${NS}/><line x1="${SQX}" y1="${SQY + k}" x2="${SQX + M}" y2="${SQY + k}" stroke="#CA8A04" stroke-width="0.6" ${NS}/>`;
  return `<g class="g5b-m">${g}${kid(SQX - 6, SQY + M, 13)}</g>`;
}

/**
 * Tấm bản đồ: createCanvas + các khung nhìn. t.go('m'|'ha'|'km'|'all', ms) phóng tới; t.sweepHa(onStep) quét 10 dải
 * của thửa 1 ha (mỗi dải 1 000 m²); t.sweepKm(onStep) quét 10 hàng thửa của phường (mỗi hàng 10 ha).
 */
export function createBigArea(host) {
  const t = createCanvas(host, { bg: '#BBF7D0' });
  t.draw(`${country()}${district()}${hectare()}${meter()}<g class="g5b-labels"></g>`);
  const box = (cx, cy, w, h) => {
    // khung nhìn vừa cả w × h quanh tâm, theo tỉ lệ tờ giấy (ngang hay dọc)
    const r = (t.svg.clientHeight || 560) / (t.svg.clientWidth || 1000);
    const W = Math.max(w, h / r), H = W * r;
    return [cx - W / 2, cy - H / 2, W, H];
  };
  const VIEWS = {
    m: () => box(SQX + M / 2 - 2, SQY + M / 2 - 3, 34, 30),
    ha: () => box(HX + HA / 2, HY + HA / 2, HA * 1.25, HA * 1.3),
    km: () => box(KM / 2, KM / 2 - 60, KM * 1.1, KM * 1.12),
  };
  t.go = async (k, ms = 2200) => { const v = VIEWS[k](); if (ms) await t.view(...v, ms); else t.svg.setAttribute('viewBox', v.join(' ')); };
  t.label = (html) => t.q('.g5b-labels').insertAdjacentHTML('beforeend', html);
  t.clearLabels = () => { t.q('.g5b-labels').innerHTML = ''; };
  /** Chữ có viền trắng (đọc rõ trên bản đồ). */
  t.text = (x, y, size, s, fill = INK) => `<text x="${x}" y="${y}" font-size="${size}" class="g4v-t" fill="${fill}" stroke="#fff" stroke-width="${size * 0.16}" paint-order="stroke" stroke-linejoin="round">${s}</text>`;
  t.sweepHa = async (onStep) => {
    t.q('.g5b-hgrid').setAttribute('opacity', '1');
    const g = t.q('.g5b-hsweep');
    for (let k = 0; k < 10; k++) {
      g.insertAdjacentHTML('beforeend', `<rect x="${HX}" y="${HY + k * 100}" width="${HA}" height="100" fill="#FDE047" opacity="0.55"/>`);
      g.lastElementChild.animate([{ opacity: 0 }, { opacity: 0.55 }], { duration: 260 });
      sfx.pop(k);
      onStep?.(k + 1);
      await sleep(330);
    }
  };
  t.sweepKm = async (onStep) => {
    t.q('.g5b-dgrid').setAttribute('opacity', '1');
    const g = t.q('.g5b-dsweep');
    for (let k = 0; k < 10; k++) {
      g.insertAdjacentHTML('beforeend', `<rect x="0" y="${k * HA}" width="${KM}" height="${HA}" fill="#FDE047" opacity="0.35"/>`);
      g.lastElementChild.animate([{ opacity: 0 }, { opacity: 0.35 }], { duration: 260 });
      sfx.pop(k);
      onStep?.(k + 1);
      await sleep(330);
    }
  };
  t.go('m', 0);
  return t;
}

/** Ruộng hình chữ nhật a × b km (vẽ theo tỉ lệ) để so diện tích. */
export function fieldsSvg(list, { s = 60, gap = 60, y0: top = 60, vertical = false } = {}) {
  const COL = ['#FDE68A', '#BBF7D0', '#BFDBFE', '#FBCFE8'];
  let x = 40, y0 = top, g = '', maxX = 0;
  list.forEach(([a, b], i) => {
    g += `<g class="g5b-f g5b-f${i}"><rect x="${x}" y="${y0}" width="${a * s}" height="${b * s}" fill="${COL[i % 4]}" stroke="${INK}" stroke-width="5"/>`;
    for (let k = 1; k < a; k++) g += `<line x1="${x + k * s}" y1="${y0}" x2="${x + k * s}" y2="${y0 + b * s}" stroke="${INK}" stroke-opacity="0.25" stroke-width="2"/>`;
    for (let k = 1; k < b; k++) g += `<line x1="${x}" y1="${y0 + k * s}" x2="${x + a * s}" y2="${y0 + k * s}" stroke="${INK}" stroke-opacity="0.25" stroke-width="2"/>`;
    g += `<text x="${x + (a * s) / 2}" y="${y0 - 14}" class="g4v-t" font-size="30">${a} km</text>
      <text x="${x - 10}" y="${y0 + (b * s) / 2 + 10}" class="g4v-t" font-size="30" style="text-anchor:end">${b} km</text>
      <text x="${x + (a * s) / 2}" y="${y0 + (b * s) / 2 + 22}" class="g4v-t" font-size="64" fill="#475569">${'ABCD'[i]}</text>
      <text x="${x + (a * s) / 2}" y="${y0 + b * s + 54}" class="g4v-t g5b-fa" font-size="40" fill="#DC2626" opacity="0">${a} × ${b} = ${a * b} km²</text></g>`;
    maxX = Math.max(maxX, x + a * s);
    if (vertical) y0 += b * s + 100 + gap; else x += a * s + gap + 40;
  });
  const height = vertical ? y0 - gap : top + Math.max(...list.map(([, b]) => b)) * s + 70;
  return { svg: g, width: maxX + 20, height };
}
export { fmt };
