// Xem thử đồ vẽ quầy ruy băng: node scripts/g3games/preview-ribbon.mjs → scripts/redraw/_preview/ribbon.png
import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import * as R from '../../src/games/grade3Games/art/ribbon.js';

// ── cảnh quầy: cắt 45 mm ruy băng hồng
const ppm = 6, rx = 70, ry = 330, target = 45;
const cutX = R.rulerX(rx, target, { ppm });
const zeroX = R.rulerX(rx, 0, { ppm });
const rollX = R.rulerX(rx, 128, { ppm });
// đầu dải nằm đúng vạch 0, cuộn ở bên phải — bé đưa kéo tới vạch cần cắt
const bench = R.sewingTableSvg(20, 250, 960, 240)
  + R.rulerSvg(rx, ry, { cm: 12, ppm, marks: [{ mm: target, color: R.COLORS.WARN, label: '45 mm' }] })
  + R.ribbonStripSvg(zeroX, rollX, ry - 26, 24, 'pink')
  + R.ribbonRollSvg(rollX + 20, ry - 50, 48, 'pink');
const scene = `<rect width="1000" height="520" fill="#FDF6EC"/>`
  + R.rollRackSvg(90, 560, 80, 30)
  + R.giftBoxSvg(640, 235, 80, { ribbon: 'purple' }) + R.giftBoxSvg(740, 235, 80)
  + bench
  + R.scissorsSvg(cutX, ry - 60, 150, 90, { open: 18 })
  + R.magnifierSvg(890, 125, 95, bench, { sx: cutX, sy: ry + 18, zoom: 1.9, handle: 135 });

const cells = [
  ['Thước 0–5 cm', R.rulerSvg(10, 100, { cm: 5, ppm: 4.4, pad: 3 })],
  ['Vạch đích (đúng)', R.rulerSvg(10, 100, { cm: 5, ppm: 4.4, pad: 3, marks: [{ mm: 27, color: R.COLORS.OK, label: '27 mm' }] })],
  ['6 cuộn ruy băng', R.RIBBON_COLORS.map((c, i) => R.ribbonRollSvg(50 + (i % 3) * 80, 70 + Math.floor(i / 3) * 130, 32, c, { tail: 30 })).join('')],
  ['Kéo mở / khép', R.scissorsSvg(110, 90, 150, -30, { open: 22 }) + R.scissorsSvg(110, 210, 150, -30, { open: 0 })],
  ['Đoạn đã cắt', R.RIBBON_COLORS.slice(0, 4).map((c, i) => R.ribbonPieceSvg(130, 50 + i * 55, 160 - i * 25, 26, c, { rot: -8 + i * 5, wave: 6 })).join('')],
  ['Hộp quà: chưa / đã buộc', R.giftBoxSvg(70, 200, 90) + R.giftBoxSvg(190, 200, 90, { ribbon: 'red' })],
  ['Đầu dải: thẳng / vát / đuôi cá', ['straight', 'slant', 'notch'].map((e, i) => R.ribbonStripSvg(20, 220, 60 + i * 60, 30, ['blue', 'yellow', 'green'][i], { end: e })).join('')],
];
const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;font:600 15px Quicksand,sans-serif;background:#fff}
.s{padding:10px}.g{display:grid;grid-template-columns:repeat(4,260px);gap:10px;padding:0 10px 10px}.c{border:1px solid #ddd;border-radius:10px;text-align:center}</style>
<div class="s"><svg viewBox="0 0 1000 520" width="1000" height="520">${scene}</svg></div>
<div class="g">${cells.map(([t, s]) => `<div class="c"><div>${t}</div><svg viewBox="0 0 260 270" width="260" height="270">${s}</svg></div>`).join('')}</div>`;
const out = new URL('../redraw/_preview/ribbon.html', import.meta.url);
writeFileSync(out, html);
const chrome = `${homedir()}/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe`;
execFileSync(chrome, ['--headless=new', '--disable-gpu', '--window-size=1100,1140', '--default-background-color=ffffffff',
  `--screenshot=${out.pathname.slice(1).replace('.html', '.png')}`, out.href], { stdio: 'ignore' });
console.log('ok');
