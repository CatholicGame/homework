// Xem thử đồ vẽ tiệm bánh: node scripts/g3games/preview-bakery.mjs → scripts/redraw/_preview/bakery.png
import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import * as B from '../../src/games/grade3Games/art/bakery.js';

const cells = [
  ['Bánh nguyên', B.roundCakeSvg(130, 130, 95)],
  ['1/2', B.roundCakeSvg(130, 130, 95, { cuts: [0, 180], apart: 5 })],
  ['1/4 (lấy 1 miếng)', B.roundCakeSvg(130, 130, 90, { cuts: [0, 90, 180, 270], apart: 3, pulled: { 1: 22 } })],
  ['Bẫy: 4 phần không đều', B.roundCakeSvg(130, 130, 95, { cuts: [0, 70, 180, 250], apart: 3 })],
  ['1/8', B.roundCakeSvg(130, 130, 88, { cuts: [0, 45, 90, 135, 180, 225, 270, 315], apart: 2, pulled: { 2: 24 } })],
  ['Dao qua tâm', B.roundCakeSvg(130, 130, 95) + B.cutLineSvg(130, 20, 130, 240) + B.centerDotSvg(130, 130) + B.knifeSvg(170, 250, 120, -60)],
  ['Không qua tâm', B.roundCakeSvg(130, 130, 95) + B.cutLineSvg(60, 40, 225, 160) + B.centerDotSvg(130, 130)],
  ['Bánh trên đế', B.roundCakeSideSvg(130, 250, 170)],
  ['Bánh khay', B.sheetCakeSvg(25, 60, 210, 140)],
  ['Khay 1/3', B.sheetCakeSvg(25, 60, 210, 140, { xs: [1 / 3, 2 / 3], apart: 3, pulled: { 2: 16 } })],
  ['Khay 1/6', B.sheetCakeSvg(25, 60, 210, 140, { xs: [1 / 3, 2 / 3], ys: [0.5], apart: 3 })],
  ['Dao + xẻng', B.knifeSvg(20, 90, 220, 0) + B.serverSvg(20, 180, 220, 0)],
  ['Đĩa 12 bánh quy', B.plateSvg(130, 130, 110) + [...Array(12)].map((_, i) => {
    const ring = i < 8 ? 68 : 26, n = i < 8 ? 8 : 4, k = i < 8 ? i : i - 8;
    const a = ((k * 360) / n + (i < 8 ? 0 : 45) - 90) * Math.PI / 180;
    return B.cookieSvg(130 + Math.cos(a) * ring, 130 + Math.sin(a) * ring, 21, ['chip', 'jam', 'butter'][i % 3], i);
  }).join('')],
  ['Hộp đóng', B.cakeBoxSvg(115, 235, 170)],
  ['Hộp mở + bánh', B.cakeBoxSvg(115, 235, 170, { open: true, inner: B.roundCakeSideSvg(150, 150, 120, { stand: false }) })],
];
const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;font:600 15px Quicksand,sans-serif;background:#fff}
.g{display:grid;grid-template-columns:repeat(5,260px);gap:10px;padding:10px}.c{border:1px solid #ddd;border-radius:10px;text-align:center}</style>
<div class="g">${cells.map(([t, s]) => `<div class="c"><div>${t}</div><svg viewBox="0 0 260 270" width="260" height="270">${s}</svg></div>`).join('')}</div>`;
const out = new URL('../redraw/_preview/bakery.html', import.meta.url);
writeFileSync(out, html);
const chrome = `${homedir()}/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe`;
execFileSync(chrome, ['--headless=new', '--disable-gpu', '--window-size=1380,920', '--default-background-color=ffffffff',
  `--screenshot=${out.pathname.slice(1).replace('.html', '.png')}`, out.href], { stdio: 'ignore' });
console.log('ok');
