/**
 * Giấy chứng nhận của 🏆 Đấu Trường Nhí: phát lúc trao giải cho 4 thí sinh (Quán quân, Á quân, Hạng ba, Hạng tư) và Khán giả
 * xuất sắc. Khổ ngang A4 (1200 × 850, in vừa giấy A4). Hình riêng của chương trình: nền giấy kem có hoa văn lục giác như tường
 * sân khấu, khung đôi màu theo hạng, góc là chùm lục giác ba màu ba vòng thi (Khởi động xanh ngọc, Tăng tốc cam, Về đích vàng),
 * huy chương có cành nguyệt quế ở giữa đáy, hai chữ ký của hai MC (anh Minh, chị Mai).
 * Chữ: Baloo 2 (tiêu đề, tên), Nunito (thân), Dancing Script (chữ ký), nạp bằng loadChequeFonts của Ai tài năng nhất.
 *
 * certSvg({ kind, name, grade, score, at, rounds, right, total, no, show, sign })
 *   kind: 'champ' | 'rank2' | 'rank3' | 'rank4' | 'aud'
 *   rounds: { kd, tt, vd } điểm từng vòng của thí sinh (không có thì bỏ dải điểm vòng)
 *   right / total: số câu trả lời đúng cả buổi (khán giả; thí sinh: câu của mình + câu ké) / số câu cả buổi
 *   sign: 'done' (có chữ ký) | 'anim' (chữ ký chạy nét) | 'none'
 */
export { loadChequeFonts as loadCertFonts } from '../thanDong/pages/cheque.js';

export const CERT_KINDS = {
  champ: { label: 'Quán quân', badge: '1', main: '#c48a06', light: '#ffe08a', dark: '#7a4f00', ribbon: ['#e2484f', '#b8202e'],
    line: (s) => `đã giành ngôi Quán quân với ${s} điểm.` },
  rank2: { label: 'Á quân', badge: '2', main: '#8394ad', light: '#eef3f9', dark: '#46566f', ribbon: ['#2f80ed', '#1c5bb8'],
    line: (s) => `đã giành ngôi Á quân với ${s} điểm.` },
  rank3: { label: 'Hạng ba', badge: '3', main: '#b06e35', light: '#f6cfa6', dark: '#6e3f14', ribbon: ['#21a37a', '#137a59'],
    line: (s) => `đã đạt Hạng ba với ${s} điểm.` },
  rank4: { label: 'Hạng tư', badge: '4', main: '#2f7be6', light: '#cfe4ff', dark: '#1a4a94', ribbon: ['#7b5cff', '#5638cc'],
    line: (s) => `đã đứng bục thi đấu và đạt Hạng tư với ${s} điểm.` },
  aud: { label: 'Khán giả xuất sắc', badge: 'star', main: '#7a3fd0', light: '#e6d6ff', dark: '#45208c', ribbon: ['#ffb31a', '#d98a00'],
    line: (s) => `là khán giả có điểm cao nhất buổi thi với ${s} điểm.` },
};
const ROUND_COL = { kd: '#14b886', tt: '#f2761a', vd: '#e0a400' };
const ROUND_NAME = { kd: 'Khởi động', tt: 'Tăng tốc', vd: 'Về đích' };
const INK = '#1c2a5c';

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const pad = (n) => String(n).padStart(2, '0');
const dateVi = (d) => `ngày ${d.getDate()} tháng ${d.getMonth() + 1} năm ${d.getFullYear()}`;

/** Số chứng nhận: ĐT-nămthángngày-giờphút-lớp-hạng-mã (mã 4 ký tự từ id hoặc thời điểm). */
export function certNo({ kind = 'champ', grade = 3, at = Date.now(), id = '' } = {}) {
  const d = new Date(at), k = { champ: 1, rank2: 2, rank3: 3, rank4: 4, aud: 'K' }[kind] ?? 'X';
  return `ĐT-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}-L${grade}-${k}-${String(id || at.toString(36)).slice(-4).toUpperCase()}`;
}

const hexPts = (r) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`; }).join(' ');
const starPts = (r, k = 0.45) => Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * k : r; return `${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`; }).join(' ');

/** Chùm lục giác góc giấy: một ô màu hạng, ba ô màu ba vòng thi. */
function corner(x, y, sx, sy, T) {
  const r = 17, dx = r * Math.sqrt(3), cells = [[0, 0, T.main], [dx, 0, ROUND_COL.kd], [dx / 2, r * 1.5, ROUND_COL.tt], [dx * 1.5, r * 1.5, ROUND_COL.vd], [0, r * 3, T.light]];
  return `<g transform="translate(${x} ${y}) scale(${sx} ${sy})">${cells.map(([cx, cy, c], i) =>
    `<polygon points="${hexPts(r - 2)}" transform="translate(${cx} ${cy})" fill="${c}" fill-opacity="${i === 4 ? 0.9 : 0.92}" stroke="#fff" stroke-width="2"/>`).join('')}</g>`;
}

/** Cành nguyệt quế ôm huy chương (hai bên, lá dọc theo cung tròn). */
function laurel(cx, cy, r, c, c2) {
  const out = [];
  for (const side of [-1, 1]) {
    out.push(`<path d="M${cx + side * r * Math.sin(0.35)} ${cy + r * Math.cos(0.35)} A${r} ${r} 0 0 ${side > 0 ? 0 : 1} ${cx + side * r * Math.sin(2.7)} ${cy + r * Math.cos(2.7)}" fill="none" stroke="${c}" stroke-width="3"/>`);
    for (let i = 0; i < 9; i++) {
      const t = 0.5 + i * 0.27, x = cx + side * r * Math.sin(t), y = cy + r * Math.cos(t);
      const rot = (side > 0 ? -1 : 1) * (t * 180 / Math.PI) + (side > 0 ? 180 : 0) + side * 35;
      out.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="15" ry="6.5" fill="${i % 2 ? c : c2}" transform="rotate(${rot.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`);
    }
  }
  return out.join('');
}

/** Huy chương giữa đáy: dải ruy băng hai đuôi, đĩa nhũ màu hạng, số hạng (khán giả: ngôi sao) và chữ hạng trên băng cong. */
function medal(cx, cy, T, uid) {
  const [r1, r2] = T.ribbon;
  const tail = (s) => `<path d="M${cx + s * 18} ${cy + 20} L${cx + s * 58} ${cy + 128} L${cx + s * 40} ${cy + 116} L${cx + s * 30} ${cy + 140} L${cx + s * -6} ${cy + 36} Z" fill="${s < 0 ? r1 : r2}" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>`;
  const inner = T.badge === 'star'
    ? `<polygon points="${starPts(38)}" transform="translate(${cx} ${cy - 2})" fill="#fff" stroke="${T.dark}" stroke-width="3" stroke-linejoin="round"/>`
    : `<text x="${cx}" y="${cy + 24}" text-anchor="middle" font-family="'Baloo 2', sans-serif" font-weight="800" font-size="74" fill="#fff" stroke="${T.dark}" stroke-width="2.5" paint-order="stroke">${T.badge}</text>`;
  return `${tail(-1)}${tail(1)}
    ${laurel(cx, cy, 92, T.main, T.dark)}
    <circle cx="${cx}" cy="${cy}" r="66" fill="url(#${uid}m)" stroke="#fff" stroke-width="4"/>
    <circle cx="${cx}" cy="${cy}" r="54" fill="none" stroke="${T.dark}" stroke-width="2" stroke-dasharray="3 5" opacity="0.55"/>
    ${inner}`;
}

/** Chữ ký MC: một nét chữ viết tay; 'anim' cho nét chạy (CSS .dc-sign path). */
function signature(x, y, word, who, sign, T) {
  const ink = '#1d3a8a';
  return `<g class="dc-sign${sign === 'anim' ? ' is-anim' : ''}">
    ${sign === 'none' ? '' : `<text x="${x}" y="${y}" text-anchor="middle" font-family="'Dancing Script', cursive" font-weight="600" font-size="46" fill="${ink}">${word}</text>
    <path d="M${x - 70} ${y + 8} q 40 10 80 -2 t 70 4" fill="none" stroke="${ink}" stroke-width="2" stroke-linecap="round"/>`}
    <line x1="${x - 120}" y1="${y + 26}" x2="${x + 120}" y2="${y + 26}" stroke="${T.main}" stroke-width="1.5"/>
    <text x="${x}" y="${y + 54}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="700" font-size="20" fill="${INK}">${who}</text>
    <text x="${x}" y="${y + 78}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="600" font-size="16" fill="#5a6785">Người dẫn chương trình</text>
  </g>`;
}

export function certSvg({ kind = 'champ', name = 'Bạn', grade = 3, score = 0, at = Date.now(), rounds = null, right = null, total = null,
  no = '', show = 'Đấu Trường Nhí', sign = 'done', id = '' } = {}) {
  const T = CERT_KINDS[kind] || CERT_KINDS.champ, d = new Date(at), uid = `dc${Math.random().toString(36).slice(2, 7)}`;
  const nm = String(name || 'Bạn').trim(), nameSize = Math.min(78, Math.floor(980 / Math.max(6, nm.length * 0.62)));
  const num = no || certNo({ kind, grade, at, id });
  // dải điểm: thí sinh = ba vòng; khán giả = số câu đúng
  let chips = [];
  if (kind === 'aud' && right != null) chips = [{ c: T.main, t: `Trả lời đúng ${right}${total ? `/${total}` : ''} câu` }];
  else if (rounds) chips = ['kd', 'tt', 'vd'].filter(k => rounds[k] != null).map(k => ({ c: ROUND_COL[k], t: `${ROUND_NAME[k]} ${rounds[k]} điểm` }));
  // thí sinh: thêm số câu đúng cả buổi (câu của mình + câu trả lời ké)
  if (kind !== 'aud' && right != null) chips.push({ c: T.main, t: `Đúng ${right}${total ? `/${total}` : ''} câu` });
  const cw = chips.map(ch => 34 + ch.t.length * 11.5), gap = 18, tw = cw.reduce((a, b) => a + b, 0) + gap * Math.max(0, chips.length - 1);
  let cx0 = 600 - tw / 2;
  const chipSvg = chips.map((ch, i) => {
    const x = cx0; cx0 += cw[i] + gap;
    return `<g><rect x="${x}" y="452" width="${cw[i]}" height="40" rx="20" fill="${ch.c}" fill-opacity="0.12" stroke="${ch.c}" stroke-width="2"/>
      <circle cx="${x + 20}" cy="472" r="6" fill="${ch.c}"/>
      <text x="${x + 34}" y="479" font-family="Nunito, sans-serif" font-weight="800" font-size="19" fill="${INK}">${esc(ch.t)}</text></g>`;
  }).join('');
  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 850" class="dc-svg" role="img" aria-label="Giấy chứng nhận ${esc(show)}: ${esc(nm)}, ${T.label}, ${score} điểm">
  <defs>
    <radialGradient id="${uid}p" cx="50%" cy="38%" r="80%"><stop offset="0" stop-color="#fffdf6"/><stop offset="0.8" stop-color="#fbf4e2"/><stop offset="1" stop-color="#f1e4c2"/></radialGradient>
    <linearGradient id="${uid}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${T.light}"/><stop offset="0.5" stop-color="${T.main}"/><stop offset="1" stop-color="${T.light}"/></linearGradient>
    <radialGradient id="${uid}m" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="${T.light}"/><stop offset="0.6" stop-color="${T.main}"/><stop offset="1" stop-color="${T.dark}"/></radialGradient>
    <pattern id="${uid}h" width="52" height="90" patternUnits="userSpaceOnUse"><polygon points="${hexPts(26)}" transform="translate(26 22)" fill="none" stroke="${T.main}" stroke-width="1.2"/><polygon points="${hexPts(26)}" transform="translate(0 67)" fill="none" stroke="${T.main}" stroke-width="1.2"/><polygon points="${hexPts(26)}" transform="translate(52 67)" fill="none" stroke="${T.main}" stroke-width="1.2"/></pattern>
  </defs>
  <rect x="0" y="0" width="1200" height="850" rx="22" fill="url(#${uid}p)"/>
  <rect x="0" y="0" width="1200" height="850" rx="22" fill="url(#${uid}h)" opacity="0.09"/>
  <rect x="14" y="14" width="1172" height="822" rx="18" fill="none" stroke="url(#${uid}g)" stroke-width="12"/>
  <rect x="38" y="38" width="1124" height="774" rx="10" fill="none" stroke="${T.main}" stroke-width="1.6"/>
  <rect x="46" y="46" width="1108" height="758" rx="8" fill="none" stroke="${T.main}" stroke-width="0.8" stroke-dasharray="2 6"/>
  ${corner(64, 66, 1, 1, T)}${corner(1136, 66, -1, 1, T)}${corner(64, 784, 1, -1, T)}${corner(1136, 784, -1, -1, T)}

  <g transform="translate(600 92)">
    <polygon points="${hexPts(30)}" fill="${INK}"/>
    ${['#ff5a7a', '#ffc93c', '#21e6a3', '#2fc8ff'].map((c, i) => `<circle cx="${-13.5 + i * 9}" cy="8" r="3.6" fill="${c}"/>`).join('')}
    <polygon points="${starPts(11)}" transform="translate(0 -6)" fill="#ffd45c"/>
  </g>
  <text x="600" y="150" text-anchor="middle" font-family="'Baloo 2', sans-serif" font-weight="800" font-size="24" letter-spacing="6" fill="${T.dark}">${esc(show.toUpperCase())}</text>
  <text x="600" y="222" text-anchor="middle" font-family="'Baloo 2', sans-serif" font-weight="800" font-size="70" letter-spacing="3" fill="${INK}">GIẤY CHỨNG NHẬN</text>
  <text x="600" y="266" text-anchor="middle" font-family="Nunito, sans-serif" font-style="italic" font-weight="600" font-size="24" fill="#4a5677">Chương trình ${esc(show)} trân trọng chứng nhận bạn</text>
  <text x="600" y="${300 + nameSize * 0.72}" text-anchor="middle" font-family="'Baloo 2', sans-serif" font-weight="800" font-size="${nameSize}" fill="${T.dark}">${esc(nm)}</text>
  <path d="M330 ${318 + nameSize * 0.72} H870" stroke="${T.main}" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="${starPts(8)}" transform="translate(600 ${318 + nameSize * 0.72})" fill="${T.main}" stroke="#fffdf6" stroke-width="3"/>
  <text x="600" y="${chips.length ? 428 : 440}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="700" font-size="27" fill="${INK}">Học sinh lớp ${grade}, ${esc(T.line(score))}</text>
  ${chipSvg}

  ${signature(270, 640, 'Minh', 'MC anh Minh', sign, T)}
  ${signature(930, 640, 'Mai', 'MC chị Mai', sign, T)}
  ${medal(600, 600, T, uid)}
  <rect x="${600 - 13 * T.label.length / 2 - 26}" y="${chips.length ? 515 : 500}" width="${13 * T.label.length + 52}" height="34" rx="17" fill="${T.dark}"/>
  <text x="600" y="${chips.length ? 539 : 524}" text-anchor="middle" font-family="'Baloo 2', sans-serif" font-weight="800" font-size="20" letter-spacing="2" fill="#fff">${esc(T.label.toUpperCase())}</text>

  <text x="600" y="772" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="600" font-size="18" fill="#4a5677">Buổi thi lúc ${time}, ${dateVi(d)}</text>
  <text x="600" y="796" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="700" font-size="14" letter-spacing="1" fill="#7a849c">Số: ${esc(num)}</text>
</svg>`;
}

/** CSS chữ ký chạy nét (thêm một lần vào trang có giấy). */
export const CERT_CSS = `
.dc-svg { display: block; width: 100%; height: auto; }
.dc-sign.is-anim text { clip-path: inset(0 100% 0 0); animation: dc-write 1.6s ease-out forwards; }
.dc-sign.is-anim path { stroke-dasharray: 200; stroke-dashoffset: 200; animation: dc-line 0.6s 1.4s ease-out forwards; }
@keyframes dc-write { to { clip-path: inset(0 0 0 0); } }
@keyframes dc-line { to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) { .dc-sign.is-anim text { animation-duration: 3s; } .dc-sign.is-anim path { animation-duration: 1.2s; animation-delay: 2.8s; } }
`;
