// Xem thử đồ vẽ Xe chở hàng: node scripts/g3games/preview-trucks.mjs → scripts/redraw/_preview/trucks.png
import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import * as T from '../../src/games/grade3Games/art/trucks.js';

const cells = [
  ['Xe 3 thùng (đầy)', T.truckSvg(3, 3)],
  ['Xe 5 thùng (3)', T.truckSvg(5, 3, { color: T.TRUCK_COLORS[1] })],
  ['Xe 8 thùng (trống)', T.truckSvg(8, 0, { color: T.TRUCK_COLORS[2] })],
  ['Xe 9 thùng (đầy)', T.truckSvg(9, 9, { color: T.TRUCK_COLORS[3] })],
  ['Kho 23 thùng', T.storeSvg(23)],
  ['Kho 4 dãy × 9', T.storeSvg(36, { cols: 9 })],
  ['Hộp bánh 17', T.storeSvg(17, { item: 'pack' })],
  ['Thùng 6 (4 hộp)', T.crateSvg(6, 4)],
  ['Thùng 8 (đầy)', T.crateSvg(8, 8)],
  ['Thùng 9 (đầy)', T.crateSvg(9, 9)],
];
const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;font:600 15px Quicksand,sans-serif;background:#fff}
.g{display:grid;grid-template-columns:repeat(5,260px);gap:10px;padding:10px}.c{border:1px solid #ddd;border-radius:10px;text-align:center;height:230px}.c svg{width:240px;height:190px}</style>
<div class="g">${cells.map(([t, s]) => `<div class="c"><div>${t}</div>${s}</div>`).join('')}</div>`;
const out = new URL('../redraw/_preview/trucks.html', import.meta.url);
writeFileSync(out, html);
const chrome = `${homedir()}/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe`;
execFileSync(chrome, ['--headless=new', '--disable-gpu', '--window-size=1380,520', '--default-background-color=ffffffff',
  `--screenshot=${decodeURIComponent(out.pathname.slice(1)).replace('.html', '.png')}`, out.href], { stdio: 'ignore' });
console.log('ok');
