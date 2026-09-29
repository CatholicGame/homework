// Xem thử đồ vẽ Máy phóng to – thu nhỏ: node scripts/g3games/preview-machine.mjs → scripts/redraw/_preview/machine.png
import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import * as M from '../../src/games/grade3Games/art/machine.js';

const cells = [['GẤP 3 LẦN', M.machineSvg('GẤP 3 LẦN')], ['GIẢM 2 LẦN', M.machineSvg('GIẢM 2 LẦN')], ['?', M.machineSvg('?')], ['Thẻ số', M.numCardSvg(15)]];
const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;font:600 15px Quicksand,sans-serif;background:#fff}
.g{display:grid;grid-template-columns:repeat(4,260px);gap:10px;padding:10px}.c{border:1px solid #ddd;border-radius:10px;text-align:center;height:250px}.c svg{width:220px;height:220px}</style>
<div class="g">${cells.map(([t, s]) => `<div class="c"><div>${t}</div>${s}</div>`).join('')}</div>`;
const out = new URL('../redraw/_preview/machine.html', import.meta.url);
writeFileSync(out, html);
const chrome = `${homedir()}/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe`;
execFileSync(chrome, ['--headless=new', '--disable-gpu', '--window-size=1110,290', '--default-background-color=ffffffff',
  `--screenshot=${decodeURIComponent(out.pathname.slice(1)).replace('.html', '.png')}`, out.href], { stdio: 'ignore' });
console.log('ok');
