/**
 * Giấy khen của trường quay Ai tài năng nhất? (thay tấm séc chứng nhận của kinh-thanh, cùng giao diện cho ladder.js):
 * mỗi câu vượt qua từ câu 10 đến 15 là một tấm, hạng tăng dần (TIER: khung bạc → vàng, dải ruy băng, câu 15 nền nhũ và hào quang).
 * Hình riêng của mình: ngôi sao, thước kẻ, compa, dấu phép tính ở bốn góc, huy chương có chữ π. Chữ: Baloo 2 (tiêu đề, tên),
 * Nunito (thân), Dancing Script (chữ ký Thầy Minh), đều có dấu tiếng Việt (Google Fonts, nạp khi cần: loadChequeFonts).
 * chequeSvg({ passed, seeds, nick, at, no, sign, grade }) → chuỗi SVG; sign: 'anim' (chữ ký chạy nét), 'done', 'none'.
 */
import { HOT } from '../engine/seeds.js';

const FONTS_CSS = 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;800&family=Nunito:ital,wght@0,600;1,600&family=Dancing+Script:wght@600&display=swap';
export function loadChequeFonts() {
  if (!document.querySelector('link[data-cheque-fonts]')) {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = FONTS_CSS; l.dataset.chequeFonts = '1';
    document.head.appendChild(l);
  }
  return document.fonts?.ready || Promise.resolve();
}

const TIER = {
  10: { frame: '#7d8fa6', frame2: '#cfd8e3', ribbon: null, foil: false },
  11: { frame: '#6f86a3', frame2: '#dbe4ee', ribbon: null, foil: false },
  12: { frame: '#c9a24a', frame2: '#f0dca0', ribbon: null, foil: false },
  13: { frame: '#c08a1e', frame2: '#f2d27a', ribbon: '#2f80ed', foil: false },
  14: { frame: '#b47a0c', frame2: '#f6d978', ribbon: '#e2484f', foil: false },
  15: { frame: '#a86a00', frame2: '#ffe08a', ribbon: '#e2484f', foil: true },
};
const NUM = { 1: 'một', 2: 'hai', 3: 'ba', 4: 'bốn', 5: 'năm', 6: 'sáu', 7: 'bảy', 8: 'tám', 10: 'mười', 12: 'mười hai', 14: 'mười bốn', 17: 'mười bảy', 20: 'hai mươi', 25: 'hai mươi lăm', 30: 'ba mươi' };
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const pad = (n) => String(n).padStart(2, '0');
const dateVi = (d) => `ngày ${d.getDate()} tháng ${d.getMonth() + 1} năm ${d.getFullYear()}`;

/** Số giấy khen: TĐ-nămthángngày-câu-mã. */
export const chequeNo = (passed, at = Date.now(), id = '') => {
  const d = new Date(at);
  return `TĐ-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(passed)}-${String(id || at.toString(36)).slice(-4).toUpperCase()}`;
};

const star = (r, c, s = '#fff') => { const p = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; p.push(`${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`); } return `<polygon points="${p.join(' ')}" fill="${c}" stroke="${s}" stroke-width="2" stroke-linejoin="round"/>`; };
const ruler = (c) => `<g><rect x="-26" y="-8" width="52" height="16" rx="3" fill="#ffd56b" stroke="${c}" stroke-width="2"/>${Array.from({ length: 9 }, (_, i) => `<line x1="${-22 + i * 5.5}" y1="-8" x2="${-22 + i * 5.5}" y2="${i % 2 ? -3 : 0}" stroke="${c}" stroke-width="1.4"/>`).join('')}</g>`;
const compass = (c) => `<g fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"><circle cx="0" cy="-18" r="4" fill="${c}"/><path d="M0 -14L-12 18M0 -14L12 18"/><path d="M-7 4H7" stroke-width="2"/></g>`;
const ops = (c) => `<g font-family="'Baloo 2', sans-serif" font-weight="800" font-size="22" fill="${c}" text-anchor="middle"><text x="-12" y="-4">+</text><text x="12" y="-4">−</text><text x="-12" y="20">×</text><text x="12" y="20">÷</text></g>`;

export function chequeSvg({ passed = 10, seeds = null, nick = '', at = Date.now(), no = '', sign = 'done', id = '', grade = null } = {}) {
  const T = TIER[Math.max(10, Math.min(15, passed))], n = seeds ?? HOT[passed];
  const d = new Date(at), uid = `ck${Math.random().toString(36).slice(2, 7)}`;
  const gold = T.frame, ink = '#24325a';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" class="ck-svg" role="img" aria-label="Giấy khen Ai tài năng nhất, câu ${passed}, ${n} ngôi sao">
  <defs>
    <radialGradient id="${uid}p" cx="50%" cy="40%" r="80%"><stop offset="0" stop-color="${T.foil ? '#fffbe8' : '#ffffff'}"/><stop offset="0.75" stop-color="${T.foil ? '#fbecb8' : '#eef6ff'}"/><stop offset="1" stop-color="${T.foil ? '#efcf7a' : '#d6e7fb'}"/></radialGradient>
    <linearGradient id="${uid}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${T.frame2}"/><stop offset="0.5" stop-color="${gold}"/><stop offset="1" stop-color="${T.frame2}"/></linearGradient>
    <radialGradient id="${uid}m" cx="40%" cy="35%"><stop offset="0" stop-color="#ffe9a6"/><stop offset="1" stop-color="#d18a00"/></radialGradient>
    ${T.foil ? `<linearGradient id="${uid}f" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>` : ''}
  </defs>
  <rect x="6" y="6" width="1188" height="588" rx="26" fill="url(#${uid}p)"/>
  ${T.foil ? `<rect class="ck-shine" x="-300" y="6" width="300" height="588" fill="url(#${uid}f)" transform="skewX(-20)"/>` : ''}
  <rect x="18" y="18" width="1164" height="564" rx="20" fill="none" stroke="url(#${uid}g)" stroke-width="${T.foil ? 10 : 8}"/>
  <rect x="36" y="36" width="1128" height="528" rx="12" fill="none" stroke="${gold}" stroke-width="1.6" stroke-dasharray="${passed >= 12 ? '0' : '6 6'}"/>
  ${Array.from({ length: passed - 9 }, (_, i) => `<g transform="translate(${600 + (i - (passed - 10) / 2) * 34} 552)">${star(11, '#ffc83d', gold)}</g>`).join('')}
  <g transform="translate(86 90)">${ops(gold)}</g><g transform="translate(1114 90) rotate(-20)">${ruler(gold)}</g>
  <g transform="translate(86 510)">${compass(gold)}</g><g transform="translate(1114 510)">${star(24, '#ffc83d', gold)}</g>
  ${T.foil ? `<circle cx="600" cy="104" r="80" fill="none" stroke="#ffd36b" stroke-width="2" opacity="0.6"/><circle cx="600" cy="104" r="96" fill="none" stroke="#ffd36b" stroke-width="1" opacity="0.4"/>` : ''}
  <g transform="translate(600 104)">
    ${T.ribbon ? `<path d="M-18 30L-30 82L-12 72L-2 86L4 34Z M18 30L30 82L12 72L2 86L-4 34Z" fill="${T.ribbon}"/>` : ''}
    <circle r="50" fill="url(#${uid}m)" stroke="${gold}" stroke-width="3"/><circle r="40" fill="none" stroke="#fff6d6" stroke-width="2" opacity="0.8"/>
    <text y="20" text-anchor="middle" font-family="'Baloo 2', sans-serif" font-weight="800" font-size="56" fill="#fff8e6" stroke="#9a5d00" stroke-width="1.5">π</text>
  </g>
  <text x="600" y="200" text-anchor="middle" font-family="'Baloo 2', sans-serif" font-weight="800" font-size="52" letter-spacing="8" fill="#e2484f">GIẤY KHEN</text>
  <text x="600" y="236" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="600" font-size="22" fill="${ink}" opacity="0.85">Trường quay Ai tài năng nhất?${grade ? ` · Toán lớp ${grade}` : ''} khen tặng</text>
  <text x="600" y="300" text-anchor="middle" font-family="'Baloo 2', sans-serif" font-weight="800" font-size="60" fill="#2f5fd0">${esc(nick || 'Tài năng nhí')}</text>
  <line x1="360" y1="316" x2="840" y2="316" stroke="${gold}" stroke-width="1.4"/>
  <text x="600" y="350" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="600" font-size="22" fill="${ink}">đã vượt qua câu ${passed} trên 15 câu hỏi toán của chương trình</text>
  <g transform="translate(400 372)">
    <rect width="400" height="58" rx="29" fill="#fff" stroke="${gold}" stroke-width="2"/>
    <g transform="translate(40 29)">${star(18, '#ffc83d', gold)}</g>
    <text x="76" y="39" font-family="'Baloo 2', sans-serif" font-weight="800" font-size="30" fill="${ink}">${n} ngôi sao</text>
    <text x="250" y="38" font-family="'Nunito', sans-serif" font-style="italic" font-size="20" fill="${ink}" opacity="0.75">(${esc(NUM[n] || String(n))})</text>
  </g>
  <text x="150" y="486" font-family="'Nunito', sans-serif" font-weight="600" font-size="17" fill="${ink}" opacity="0.85">${dateVi(d)}</text>
  <text x="150" y="508" font-family="'Nunito', sans-serif" font-size="14" fill="${ink}" opacity="0.6">Số: ${esc(no || chequeNo(passed, at, id))}</text>
  <g transform="translate(910 486)">
    <text class="ck-sig${sign === 'anim' ? ' is-anim' : ''}" x="0" y="0" text-anchor="middle" font-family="'Dancing Script', cursive" font-weight="600" font-size="44"
      fill="${sign === 'none' ? 'none' : '#1d2a5c'}" stroke="#1d2a5c" stroke-width="${sign === 'anim' ? 0.9 : 0}" style="--len:900" ${sign === 'none' ? 'opacity="0"' : ''}>Thầy Minh</text>
    <line x1="-130" y1="12" x2="130" y2="12" stroke="${ink}" stroke-width="1.2"/>
    <text x="0" y="32" text-anchor="middle" font-family="'Nunito', sans-serif" font-size="14" fill="${ink}" opacity="0.8">Thầy Minh, người dẫn chương trình</text>
  </g>
</svg>`;
}
