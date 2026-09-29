// Cảnh mẫu tĩnh trò 🐸 Ếch nhảy tia số (để duyệt phong cách):
//   node scripts/g2games/preview-frog.mjs → scripts/redraw/_preview/frog-scene.png (+ frog-scene-portrait.png)
import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import { lilyPadSvg, padLabelSvg, pondBgSvg } from '../../src/games/grade2Games/art/pond.js';

const asset = (p) => new URL(`../../src/assets/${p}`, import.meta.url).href;

// Cấp 2 "Cộng qua 10", nhiệm vụ 8 + 5: bé đã chọn +2 (ếch tới lá 10), đang chọn cú nhảy tiếp.
function scene(W, H, { from = 4, to = 16, padY, x0 = 64, bank = 1 }) {
  const n = to - from, step = (W - 2 * x0) / n, r = Math.min(40, step * 0.44);
  const px = (v) => x0 + (v - from) * step;
  let pads = '', nums = '';
  for (let v = from; v <= to; v++) {
    const big = v % 10 === 0, at = `translate(${px(v).toFixed(1)},${padY})`;
    pads += `<g transform="${at}">${lilyPadSvg(big ? r * 1.15 : r, { tone: v % 3, notch: 235 + (v * 37) % 70, big })}</g>`;
    nums += `<g transform="${at}">${padLabelSvg(v, r, big)}</g>`;
  }
  // Dấu cú nhảy đã làm: 8 → 10, nhãn +2
  const a = px(8), b = px(10), top = padY - r * 3.4;
  const trail = `<path d="M${a},${padY - 16} Q${(a + b) / 2},${top} ${b},${padY - 16}" fill="none" stroke="#FFFFFF"
      stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/>
    <g transform="translate(${(a + b) / 2},${top + 12})"><rect x="-22" y="-15" width="44" height="26" rx="13" fill="#F59E0B" stroke="#92400E" stroke-width="1.6"/>
    <text text-anchor="middle" dy="5" font-size="16" font-weight="800" fill="#fff" font-family="Quicksand,sans-serif">+2</text></g>`;
  // Gợi ý cú nhảy kế tiếp (mũi tên mờ nhấp nháy khi bé chưa chọn)
  const fw = r * 2.6, fh = fw * 438 / 393;
  const frog = `<image href="${asset('grade2-games/frog/sit.webp')}" x="${b - fw / 2}" y="${padY - fh + r * 0.1}" width="${fw}" height="${fh}"/>`;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs><marker id="g2arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 Z" fill="#FDE68A"/></marker></defs>
    ${pondBgSvg(W, H, { bankY: padY / H, bank })}${pads}${trail}${frog}${nums}</svg>`;
}

const css = `body{margin:0;font:600 15px Quicksand,Nunito,sans-serif;background:#0f172a}
.app{display:flex;flex-direction:column;overflow:hidden;background:#EAF7FF}
.bar{display:flex;align-items:center;gap:10px;padding:8px 12px;background:#fff;box-shadow:0 1px 0 #d6e4ee}
.bar b{font-size:17px}.dots{margin-left:auto;display:flex;gap:6px}.dots i{width:12px;height:12px;border-radius:50%;background:#E2E8F0}
.dots i.ok{background:#34D399}.dots i.on{background:#F59E0B;box-shadow:0 0 0 3px #FDE68A}
.back{border:0;background:#F1F5F9;border-radius:10px;padding:6px 10px;font:inherit}
.stage{position:relative}
.npc{position:absolute;left:10px;top:8px;display:flex;align-items:flex-start;gap:8px}
.npc img{height:170px}.pt .npc img{height:190px}.pt .bub{font-size:19px}
.bub{background:#fff;border:2px solid #2F6B3A;border-radius:16px;padding:10px 16px;font-size:21px;max-width:300px;position:relative}
.bub .eq{display:inline-block;margin-top:4px;background:#FEF3C7;border:2px solid #B45309;border-radius:10px;padding:2px 10px;font-size:28px;font-weight:800;color:#92400E}
.log{position:absolute;right:14px;top:12px;background:#ffffffdd;border-radius:12px;padding:6px 12px;font-size:17px;color:#1F3A24}
.tray{display:flex;align-items:center;gap:8px;padding:10px 12px;background:#FFF7E6;border-top:3px solid #F5D08A;flex-wrap:wrap}
.card{width:52px;height:52px;border-radius:14px;background:#F59E0B;color:#fff;font-size:21px;font-weight:800;display:grid;place-items:center;
  box-shadow:0 4px 0 #B45309}
.card.hint{outline:4px solid #FDE68A;outline-offset:2px}
.card.big{background:#60A5FA;box-shadow:0 4px 0 #1D4ED8}
.sp{flex:1}.say{width:48px;height:48px;border-radius:50%;background:#fff;border:2px solid #CBD5E1;display:grid;place-items:center;font-size:22px}
.done{background:#34D399;color:#064E3B;font-weight:800;border-radius:14px;padding:12px 16px;font-size:17px;box-shadow:0 4px 0 #059669;text-align:center;line-height:1.1}
.done small{display:block;font-weight:600;font-size:12px}`;

function page(W, H, portrait) {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => `<div class="card${k === 3 ? '' : ''}">+${k}</div>`).join('');
  const stageH = H - 52 - (portrait ? 200 : 78);
  const s = portrait ? scene(W, stageH, { from: 7, to: 12, padY: stageH * 0.64, x0: 34, bank: 0.3 }) : scene(W, stageH, { from: 5, to: 15, padY: stageH * 0.68 });
  return `<!doctype html><meta charset="utf-8"><style>${css}</style>
  <div class="app${portrait ? ' pt' : ''}" style="width:${W}px;height:${H}px">
    <div class="bar"><button class="back">◀</button><b>🐸 ${portrait ? 'Cấp 2' : 'Ếch nhảy tia số'}</b><span>${portrait ? 'Cộng qua 10' : '· Cấp 2: Cộng qua 10'}</span>
      <div class="dots"><i class="ok"></i><i class="ok"></i><i class="on"></i><i></i><i></i></div></div>
    <div class="stage" style="height:${stageH}px">${s}
      <div class="npc"><img src="${asset('grade3-games/npc/ban-na.webp')}">
        <div class="bub">Đưa ếch tới lá<br><span class="eq">8 + 5</span></div></div>
      <div class="log" style="${portrait ? 'top:auto;bottom:14px;left:50%;right:auto;transform:translateX(-50%)' : ''}">8 + 2 = 10</div></div>
    <div class="tray">${cards}<div class="card big">+10</div><div class="sp"></div><div class="say">🔊</div>
      <div class="done">✓ Tới nơi<small>Tới đúng lá hãy xác nhận</small></div></div>
  </div>`;
}

const chrome = `${homedir()}/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe`;
for (const [name, W, H, portrait] of [['frog-scene', 960, 540, false], ['frog-scene-portrait', 390, 760, true]]) {
  const out = new URL(`../redraw/_preview/${name}.html`, import.meta.url);
  writeFileSync(out, page(W, H, portrait));
  execFileSync(chrome, ['--headless=new', '--disable-gpu', `--window-size=${W},${H}`, '--hide-scrollbars',
    `--screenshot=${decodeURIComponent(out.pathname.slice(1)).replace('.html', '.png')}`, out.href], { stdio: 'ignore' });
}
console.log('ok');
