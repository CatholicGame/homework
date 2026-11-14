/**
 * Bài 82 "If I Were a Bird" (câu điều kiện loại 2: If I were…, I would…). Buổi chiều ở quê ông, một cảnh liền từ trái sang
 * phải: nhà ông (mái ngói đỏ) → chõng tre trên bãi cỏ (Lan ngồi đọc, Minh nằm ngắm chim, Lucky nằm cạnh) → ruộng lúa
 * (ông đội nón làm cỏ, chim bay trên ruộng).
 * Mọi việc "giả sử" (thành chim, bay khắp Việt Nam, Hạ Long, Hội An, ngồi trên mái nhà đọc sách, tự kiếm ăn, ướt mưa, bay
 * sang Sydney, nhà Tom) chỉ hiện trong bong bóng nghĩ của người nói, vẽ "bé chim" = đầu nhân vật + đôi cánh vỗ; việc thật
 * (Minh bật dậy vỗ tay như cánh, Lan cười, ông nghe, ông đi lại, Minh nghĩ, cả nhà cười, Lucky sủa) thì nhân vật làm thật.
 * Toạ độ cảnh: rộng 1300, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, thought, sun } from '../kit.js';
import { BOOK } from '../rig.js';

const FLOOR = 282;
const W = 1300;
const X = { house: 150, bench: 428, seat: 472, minh: 530, lucky: 616, rice: 690, gpa: 880 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e082_gpa: { ...CAST.en_grandpa, hat: 'conical' },
});

// ── Hình nhỏ trong bong bóng ────────────────────────────────────────────────
/** "Bé chim": đầu nhân vật + đôi cánh vỗ (gốc ở giữa đầu). */
const BK = (who, s = 1, mood = 'joy') => `<g transform="scale(${s})">
  <g class="e082-wg e082-wgL"><path d="M-8 4 Q-30 -16 -36 6 Q-24 2 -8 10Z" fill="#fff" stroke="${L}" stroke-width="0.9"/><path d="M-14 5 L-28 0 M-14 7 L-26 6" stroke="#CBD5E1" stroke-width="1"/></g>
  <g class="e082-wg e082-wgR"><path d="M8 4 Q30 -16 36 6 Q24 2 8 10Z" fill="#fff" stroke="${L}" stroke-width="0.9"/><path d="M14 5 L28 0 M14 7 L26 6" stroke="#CBD5E1" stroke-width="1"/></g>
  ${headOnly(who, { s: 0.62, mood })}</g>`;
/** Bản đồ Việt Nam nhỏ (gốc ở giữa, cao ≈ 74). */
const VN = `<g transform="scale(0.85) translate(0 -159)"><path d="M-16 120 Q2 116 6 124 Q-4 132 -2 142 Q4 154 14 166 Q22 182 8 194 Q-2 202 -12 198 Q-2 188 -2 178 Q-4 164 -14 150 Q-24 136 -16 120Z" fill="#86EFAC" stroke="${L}" stroke-width="1.1"/></g>`;
const KARST = `<path d="M-16 6 Q-14 -14 -8 -14 Q-4 -14 -4 6Z M-6 6 Q-2 -22 4 -20 Q10 -18 8 6Z M6 6 Q10 -10 14 -10 Q18 -8 16 6Z" fill="#4ADE80" stroke="${L}" stroke-width="0.8"/><path d="M-20 6 H20" stroke="#38BDF8" stroke-width="3"/>`;
const LANTERNS = `<path d="M-18 -16 Q0 -10 18 -16" stroke="${L}" stroke-width="0.8" fill="none"/>${[[-12, '#EF4444'], [0, '#FACC15'], [12, '#F97316']].map(([x, c]) => `<g transform="translate(${x} -8)"><ellipse rx="5" ry="6.4" fill="${c}" stroke="${L}" stroke-width="0.7"/><path d="M0 6 v4" stroke="#B91C1C" stroke-width="1"/></g>`).join('')}
  <rect x="-16" y="4" width="32" height="10" fill="#FDE68A" stroke="${L}" stroke-width="0.7"/><path d="M-19 4 L0 -2 L19 4Z" fill="#B45309" stroke="${L}" stroke-width="0.7"/>`;
const HOUSE_MINI = (w = 90) => `<rect x="${-w / 2 + 6}" y="-6" width="${w - 12}" height="36" fill="#FEF3C7" stroke="${L}" stroke-width="0.9"/>
  <path d="M${-w / 2 - 4} -4 L0 -30 L${w / 2 + 4} -4Z" fill="#DC2626" stroke="${L}" stroke-width="0.9"/><rect x="-7" y="10" width="14" height="20" fill="#B45309" stroke="${L}" stroke-width="0.7"/>`;
const WORM = (x, y, d = 0) => `<g transform="translate(${x} ${y})"><path class="e082-worm" style="animation-delay:${d}s" d="M-6 0 q3 -4 6 0 q3 4 6 0" stroke="#F472B6" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>`;
const OPERA = `<g transform="translate(0 0)"><path d="M-14 4 Q-10 -12 -2 -14 L-4 4Z M-4 4 Q0 -14 8 -16 L6 4Z M6 4 Q10 -8 16 -9 L14 4Z" fill="#fff" stroke="${L}" stroke-width="0.8"/><rect x="-16" y="4" width="34" height="4" fill="#D6D3D1" stroke="${L}" stroke-width="0.6"/></g>`;
const AUS = `<path d="M-30 -10 Q-26 -22 -10 -22 Q-2 -30 6 -22 Q14 -28 20 -18 Q30 -10 30 4 Q26 18 12 20 Q4 14 -4 18 Q-18 18 -24 8 Q-32 2 -30 -10Z" fill="#FCD34D" stroke="${L}" stroke-width="1"/>`;

// ── Đồ vật / con vật (gốc = điểm chạm đất) ───────────────────────────────────
const BIRD = `<g class="e082-fly"><path class="e082-bw" d="M0 0 Q-10 -10 -20 -4 Q-10 -2 0 2 Q10 -2 20 -4 Q10 -10 0 0Z" fill="#334155" stroke="${L}" stroke-width="0.6"/><circle cx="3" cy="0" r="3" fill="#334155"/></g>`;
/** Minh nằm ngửa trên cỏ, tay gối đầu, một chân co (gốc = giữa lưng chạm đất, đầu bên trái). */
const LIE = `<g>
  <path d="M8 -8 L26 -28 L40 -4" stroke="${L}" stroke-width="7.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 -8 L26 -28 L40 -4" stroke="#F5C9A6" stroke-width="5.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 -6 L50 -6" stroke="${L}" stroke-width="7.6" stroke-linecap="round"/><path d="M8 -6 L50 -6" stroke="#E8B48F" stroke-width="5.8" stroke-linecap="round"/>
  <path d="M36 -6 q8 -4 12 2 h-12Z" fill="#F59E0B" stroke="${L}" stroke-width="0.8"/><path d="M50 -9 q8 0 8 5 h-9Z" fill="#F59E0B" stroke="${L}" stroke-width="0.8"/>
  <rect x="-4" y="-17" width="20" height="16" rx="4" fill="#1E3A8A" stroke="${L}" stroke-width="0.9"/>
  <rect x="-42" y="-19" width="42" height="18" rx="7" fill="#FB923C" stroke="${L}" stroke-width="1"/>
  <path d="M-20 -14 L-6 -22 L2 -18" stroke="${L}" stroke-width="6.2" fill="none" stroke-linecap="round"/><path d="M-20 -14 L-6 -22 L2 -18" stroke="#F5C9A6" stroke-width="4.4" fill="none" stroke-linecap="round"/>
  <path d="M-38 -16 L-58 -30 L-66 -16" stroke="${L}" stroke-width="6.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M-38 -16 L-58 -30 L-66 -16" stroke="#F5C9A6" stroke-width="4.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <g transform="translate(-56 -15)">${headOnly('en_minh_home', { rot: -84, look: true, mood: 'happy' })}</g></g>`;

const PROPS = {
  e082_hoe: `<g><path d="M0 -10 L0 34" stroke="${L}" stroke-width="3.6" stroke-linecap="round"/><path d="M0 -10 L0 34" stroke="#B45309" stroke-width="2.2" stroke-linecap="round"/><path d="M-1 32 L14 36 L13 41 L-2 38Z" fill="#94A3B8" stroke="${L}" stroke-width="0.7"/></g>`,
};
/** Sách Lan đọc: thấp hơn sách chung một chút để không che mặt. */
const LBOOK = `<g transform="translate(0 12)">${BOOK}</g>`;
const POSES = {
  e082_wing: { R: [96, 104], L: [96, 104], dy: 20, head: -4 },
  e082_point: { R: [84, 92], L: [40, 110], dy: 20 },
  e082_up: { R: [140, 160], L: [40, 110], dy: 20 },
  e082_think: { R: [30, -150], L: [16, -60], dy: 20, head: 8 },
  e082_open: { R: [55, 40], L: [55, 40], dy: 20 },
  e082_cheer: { R: [150, 172], L: [150, 172], dy: 20 },
  e082_ear: { R: [150, 248], L: [10, 4], head: -8 },
  e082_book: { R: [30, 196], L: [30, 196], dy: 20, head: 7 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
const RICE = (x, y, s = 1, cls = '') => `<g transform="translate(${x} ${y}) scale(${s})"><g class="e082-rice ${cls}" style="animation-delay:${((x * 7) % 10) / 20}s">
  ${[-8, -4, 0, 4, 8].map((dx, i) => `<path d="M${dx * 0.4} 0 Q${dx * 0.8} -18 ${dx * 1.6} -${34 - Math.abs(dx)}" stroke="${i % 2 ? '#65A30D' : '#84CC16'}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`).join('')}</g></g>`;

function bg() {
  return `
  ${sky(0, W, 315, 'e082sky')}
  <g transform="translate(1090 70)">${sun(24)}</g>
  ${cloud(140, 60, 0.8, 0)}${cloud(640, 50, 0.7, 3)}${cloud(1180, 64, 0.8, 1)}
  <g class="e082-far">${[0, 1, 2].map((i) => `<g transform="translate(${900 + i * 60} ${80 + (i % 2) * 14}) scale(0.5)">${BIRD}</g>`).join('')}</g>
  <path d="M0 236 Q200 214 420 232 T900 222 T1300 230 V${FLOOR} H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(330, 240, 0.7)}${tree(1240, 236, 0.6, '')}
  <!-- nhà ông -->
  <g transform="translate(${X.house} ${FLOOR})"><rect x="-110" y="-110" width="220" height="110" fill="#FEF3C7" stroke="${L}" stroke-width="1.3"/>
    <path d="M-132 -104 L-92 -160 H92 L132 -104Z" fill="#DC2626" stroke="${L}" stroke-width="1.3"/>
    ${Array.from({ length: 8 }, (_, i) => `<path d="M${-118 + i * 30} -110 L${-84 + i * 25} -156" stroke="#B91C1C" stroke-width="1"/>`).join('')}
    <rect x="-24" y="-74" width="48" height="74" fill="#B45309" stroke="${L}"/><path d="M0 -74 V0" stroke="${L}" stroke-width="0.8"/>
    ${[-74, 74].map((dx) => `<rect x="${dx - 18}" y="-80" width="36" height="32" fill="#BAE6FD" stroke="${L}"/><path d="M${dx} -80 V-48" stroke="${L}" stroke-width="0.8"/>`).join('')}</g>
  <!-- ruộng lúa -->
  <rect x="${X.rice - 10}" y="232" width="${W - X.rice + 10}" height="50" fill="#A3E635" stroke="${L}" stroke-width="0.8"/>
  ${Array.from({ length: 22 }, (_, i) => RICE(X.rice + 6 + i * 28, 252 + (i % 2) * 6, 0.8)).join('')}
  <!-- bãi cỏ + bờ ruộng -->
  <rect x="0" y="${FLOOR - 4}" width="${W}" height="${315 - FLOOR + 4}" fill="#86EFAC" stroke="${L}"/>
  <!-- chõng tre -->
  <g transform="translate(${X.bench} ${FLOOR})"><rect x="-56" y="-34" width="112" height="9" rx="3" fill="#D9B26A" stroke="${L}" stroke-width="1"/>
    ${[-50, -30, -10, 10, 30, 50].map((x) => `<path d="M${x} -33 V-26" stroke="#A16207" stroke-width="0.8"/>`).join('')}
    <path d="M-48 -25 V0 M48 -25 V0 M-40 -25 V0 M40 -25 V0" stroke="#A16207" stroke-width="4"/></g>`;
}

function fg() {
  const tb = (k, x, y, inner, tail, w = 262, h = 112) => thought(x, y, w, h, `<g transform="scale(1.14)">${inner}</g>`, tail, `e082-tb e082-tb-${k}`);
  const minhB = BK('en_minh_home', 1);
  const lanB = BK('en_lan_home', 1);
  // Minh: bay khắp Việt Nam
  const b1 = `<g transform="translate(-48 0)">${VN}</g>
    <g class="e082-tour"><g class="e082-tourIn">${BK('en_minh_home', 0.7)}</g></g>
    <text x="54" y="-6" text-anchor="middle" ${NUN} font-size="14" fill="#0369A1">all over</text><text x="54" y="13" text-anchor="middle" ${NUN} font-size="14" fill="#DC2626">Vietnam</text>`;
  // Hạ Long buổi sáng → Hội An buổi chiều
  const b2 = `<g transform="translate(-74 0)">${VN}<circle cx="6" cy="-26" r="3.6" fill="#0EA5E9" stroke="#fff"/><circle cx="8" cy="2" r="3.6" fill="#F97316" stroke="#fff"/></g>
    <g transform="translate(-6 -18)">${KARST}<g transform="translate(18 -14)"><circle r="6" fill="#FDE047" stroke="#F59E0B"/></g></g>
    <text x="54" y="-18" text-anchor="middle" ${NUN} font-size="12" fill="#0369A1">morning</text>
    <g transform="translate(-6 22)">${LANTERNS}<g transform="translate(30 -14)"><circle r="6" fill="#FB923C" stroke="#EA580C"/></g></g>
    <text x="54" y="26" text-anchor="middle" ${NUN} font-size="12" fill="#EA580C">afternoon</text>
    <g class="e082-hop"><g transform="translate(-30 -26)">${BK('en_minh_home', 0.55)}</g></g>`;
  // Lan: có cánh cũng không đi đâu
  const arrow = (r) => `<g transform="rotate(${r})"><path d="M26 0 H52" stroke="#0369A1" stroke-width="3" stroke-linecap="round"/><path d="M46 -6 L53 0 L46 6" stroke="#0369A1" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
  const b4 = `<g transform="translate(-10 0)">${[0, 90, 180, 270].map((r) => arrow(r)).join('')}${BK('en_lan_home', 0.8)}
    <g class="e082-cross">${[0, 90, 180, 270].map((r) => `<g transform="rotate(${r}) translate(40 0)"><path d="M-6 -6 L6 6 M6 -6 L-6 6" stroke="#DC2626" stroke-width="3" stroke-linecap="round"/></g>`).join('')}</g></g>`;
  // Lan: ngồi trên mái nhà đọc sách cả ngày
  const b5 = `<g transform="translate(-10 16)">${HOUSE_MINI(100)}</g><g transform="translate(-10 -22)">${lanB.replace('scale(1)', 'scale(0.62)')}<g transform="translate(0 16)"><rect x="-10" y="-6" width="20" height="13" rx="1.5" fill="#2563EB" stroke="${L}" stroke-width="0.7"/><path d="M0 -6 V7" stroke="#fff" stroke-width="1"/></g></g>
    <g class="e082-sunday"><g transform="translate(-86 -4)"><circle r="7" fill="#FDE047" stroke="#F59E0B" stroke-width="1.4"/></g></g>
    <text x="70" y="30" text-anchor="middle" ${NUN} font-size="13" fill="#EA580C">all day</text>`;
  // Ông: chim phải tự kiếm ăn
  const b7 = `<path d="M-96 26 H96" stroke="#65A30D" stroke-width="3"/>
    <g transform="translate(-38 4)"><g class="e082-peck">${BK('en_minh_home', 0.66, 'wow')}</g></g>${WORM(-30, 24)}
    <g transform="translate(38 4)"><g class="e082-peck" style="animation-delay:-.25s">${BK('en_lan_home', 0.66, 'wow')}</g></g>${WORM(46, 24, 0.3)}`;
  // Ông: trời mưa thì ướt
  const b8 = `<path d="M-96 30 H96" stroke="#65A30D" stroke-width="3"/>
    <g transform="translate(-30 10)"><g class="e082-shiv">${BK('en_minh_home', 0.66, 'sad')}</g></g><g transform="translate(30 10)"><g class="e082-shiv">${BK('en_lan_home', 0.66, 'sad')}</g></g>
    <g transform="translate(0 -26)"><ellipse rx="44" ry="11" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/><ellipse cx="-20" cy="-6" rx="16" ry="10" fill="#94A3B8"/><ellipse cx="16" cy="-8" rx="18" ry="11" fill="#94A3B8"/>
      <g class="e082-drops">${[-36, -24, -12, 0, 12, 24, 36, -30, -6, 18].map((x, i) => `<path d="M${x} ${10 + (i % 3) * 7} l-2 7" stroke="#2563EB" stroke-width="1.8" stroke-linecap="round"/>`).join('')}</g></g>`;
  // Minh: bay sang Sydney
  const b10 = `<rect x="-96" y="-36" width="192" height="72" rx="14" fill="#BAE6FD"/><g transform="translate(-70 -2)">${VN}</g>
    <g transform="translate(58 6)">${AUS}<g transform="translate(26 6) scale(0.7)">${OPERA}</g></g>
    <path d="M-62 -14 Q0 -46 82 4" stroke="#0369A1" stroke-width="1.6" stroke-dasharray="4 3" fill="none"/>
    <text x="58" y="-24" text-anchor="middle" ${NUN} font-size="13" fill="#B45309">Sydney</text>
    <g class="e082-cross2"><g class="e082-sea">${BK('en_minh_home', 0.5)}</g></g>`;
  // Nhà Tom: to và ấm
  const b11 = `<g transform="translate(-6 8)"><rect x="-70" y="-24" width="140" height="52" fill="#FDE68A" stroke="${L}" stroke-width="1"/>
      <path d="M-82 -22 L0 -50 L82 -22Z" fill="#B45309" stroke="${L}" stroke-width="1"/><rect x="40" y="-48" width="12" height="18" fill="#92400E" stroke="${L}" stroke-width="0.8"/>
      ${[-48, 30].map((x) => `<rect class="e082-glow" x="${x}" y="-14" width="22" height="18" fill="#FEF08A" stroke="${L}" stroke-width="0.8"/>`).join('')}
      <rect x="-12" y="-4" width="20" height="32" fill="#DC2626" stroke="${L}" stroke-width="0.8"/>
      <g transform="translate(41 -2)">${headOnly('en_tom_home', { s: 0.36, mood: 'joy' })}</g>
      <g class="e082-land"><g transform="translate(-30 18)">${BK('en_minh_home', 0.48)}</g></g></g>
    <g class="e082-heart"><path d="M84 -26 q-6 -8 -12 -2 q-6 6 12 18 q18 -12 12 -18 q-6 -6 -12 2Z" fill="#F43F5E" stroke="${L}" stroke-width="0.7"/></g>`;
  const ear = `<g class="e082-ear" transform="translate(${X.gpa - 30} 128)">${[0, 1, 2].map((i) => `<path class="e082-arc" style="animation-delay:${i * 0.2}s" d="M${-6 - i * 8} -${8 + i * 5} Q${-12 - i * 10} 0 ${-6 - i * 8} ${8 + i * 5}" stroke="#0EA5E9" stroke-width="2.4" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
  const qm = `<g class="e082-qm">${[[-18, 0], [0, -10], [18, 0]].map(([x, y], i) => `<text class="e082-q" style="animation-delay:${i * 0.25}s" x="${X.seat + x}" y="${160 + y}" text-anchor="middle" ${NUN} font-size="20" fill="#7C3AED">?</text>`).join('')}</g>`;
  return `
  ${Array.from({ length: 16 }, (_, i) => RICE(X.rice + 20 + i * 36, 306 + (i % 2) * 5, 1.25, 'e082-near')).join('')}
  ${bush(40, FLOOR + 30, 0.6)}${bush(300, FLOOR + 32, 0.5, '#4ADE80')}
  ${tb('b1', 480, 110, `<g class="e082-in e082-in-b1">${b1}</g><g class="e082-in e082-in-b2">${b2}</g><g class="e082-in e082-in-b10">${b10}</g><g class="e082-in e082-in-b11">${b11}</g>`, [X.seat + 4, 176])}
  ${tb('lan', 480, 110, `<g class="e082-in e082-in-b4">${b4}</g><g class="e082-in e082-in-b5">${b5}</g>`, [X.bench - 20, 178])}
  ${tb('gpa', 480, 110, `<g class="e082-in e082-in-b7">${b7}</g><g class="e082-in e082-in-b8">${b8}</g>`, [646, 124])}
  ${ear}${qm}`;
}

const CSS = `
.e082-tb { opacity: 0; transition: opacity .3s; }
.st-tb-b1 .e082-tb-b1, .st-tb-lan .e082-tb-lan, .st-tb-gpa .e082-tb-gpa { opacity: 1; }
.e082-in { opacity: 0; transition: opacity .3s; }
${['b1', 'b2', 'b4', 'b5', 'b7', 'b8', 'b10', 'b11'].map((k) => `.st-${k} .e082-in-${k}`).join(', ')} { opacity: 1; }
.e082-wgL { transform-box: fill-box; transform-origin: 100% 60%; animation: e082WL .28s ease-in-out infinite alternate; }
.e082-wgR { transform-box: fill-box; transform-origin: 0% 60%; animation: e082WR .28s ease-in-out infinite alternate; }
@keyframes e082WL { from { transform: rotate(18deg); } to { transform: rotate(-22deg); } }
@keyframes e082WR { from { transform: rotate(-18deg); } to { transform: rotate(22deg); } }
.e082-bw { transform-box: fill-box; transform-origin: 50% 70%; animation: e082Bw .3s ease-in-out infinite alternate; }
@keyframes e082Bw { to { transform: scaleY(-.6); } }
.e082-far { animation: e082Far 12s ease-in-out infinite alternate; }
@keyframes e082Far { to { transform: translate(-160px, 12px); } }
.st-b1 .e082-tour { animation: e082Tour 3s ease-in-out both; }
@keyframes e082Tour { 0% { transform: translate(-40px, -30px); } 25% { transform: translate(-30px, 0px); } 50% { transform: translate(-50px, 30px); } 75% { transform: translate(-72px, 8px); } 100% { transform: translate(-58px, -28px); } }
.st-b2go .e082-hop { animation: e082Hop 1.6s ease-in-out both; }
@keyframes e082Hop { 0% { transform: none; } 50% { transform: translate(14px, 10px); } 100% { transform: translate(22px, 44px); } }
.e082-cross { opacity: 0; transition: opacity .3s; } .st-b4no .e082-cross { opacity: 1; }
.st-b5 .e082-sunday { animation: e082Day 2.8s ease-in-out both; }
@keyframes e082Day { 0% { transform: translate(0, 10px); } 50% { transform: translate(86px, -24px); } 100% { transform: translate(172px, 10px); } }
.e082-peck { transform-box: fill-box; transform-origin: 50% 100%; }
.st-b7 .e082-peck { animation: e082Peck .4s ease-in-out infinite alternate; }
@keyframes e082Peck { to { transform: translateY(8px) rotate(14deg); } }
.e082-worm { animation: e082Worm .5s ease-in-out infinite alternate; }
@keyframes e082Worm { to { transform: scaleX(.75); } }
.st-b8 .e082-drops { animation: e082Rain .4s linear infinite; }
@keyframes e082Rain { from { transform: translateY(-4px); opacity: .5; } to { transform: translateY(12px); opacity: 1; } }
.st-b8 .e082-shiv { animation: e082Shiv .1s linear infinite alternate; }
@keyframes e082Shiv { to { transform: translateX(1.6px); } }
.st-b10 .e082-sea { animation: e082Sea 2.6s ease-in-out both; }
@keyframes e082Sea { 0% { transform: translate(-64px, -14px); } 50% { transform: translate(6px, -36px); } 100% { transform: translate(80px, -4px); } }
.st-b11 .e082-land { animation: e082Land .8s ease-out both; }
@keyframes e082Land { from { transform: translate(-50px, -40px); } to { transform: none; } }
.st-b11 .e082-glow { animation: e082Glow .7s ease-in-out infinite alternate; }
@keyframes e082Glow { to { fill: #FDBA74; } }
.e082-heart { opacity: 0; transform-box: fill-box; transform-origin: center; }
.st-b11warm .e082-heart { animation: e082Pop .5s cubic-bezier(.3,1.6,.6,1) both, e082Beat .5s ease-in-out .5s infinite alternate; }
@keyframes e082Pop { from { opacity: 0; transform: scale(.2); } to { opacity: 1; transform: none; } }
@keyframes e082Beat { from { opacity: 1; transform: none; } to { opacity: 1; transform: scale(1.18); } }
.e082-ear { opacity: 0; transition: opacity .3s; } .st-ear .e082-ear { opacity: 1; }
.st-ear .e082-arc { animation: e082Arc .9s ease-out infinite; }
@keyframes e082Arc { from { opacity: 0; } 30% { opacity: 1; } to { opacity: 0; } }
.e082-qm { opacity: 0; transition: opacity .3s; } .st-qm .e082-qm { opacity: 1; }
.e082-q { transform-box: fill-box; transform-origin: 50% 100%; }
.st-qm .e082-q { animation: e082Q .6s ease-in-out infinite alternate; }
@keyframes e082Q { from { transform: translateY(2px) rotate(-8deg); } to { transform: translateY(-6px) rotate(8deg); } }
.e082-rice { transform-box: fill-box; transform-origin: 50% 100%; }
.e082-near { animation: e082Rice 2.6s ease-in-out infinite alternate; }
@keyframes e082Rice { from { transform: rotate(-3deg); } to { transform: rotate(3deg); } }
/* Minh vỗ tay như cánh chim */
.es-ac.act-e082-flap .pp-upwR { animation: e082FR .26s ease-in-out infinite alternate; }
.es-ac.act-e082-flap .pp-upwL { animation: e082FL .26s ease-in-out infinite alternate; }
@keyframes e082FR { from { transform: rotate(-26deg); } to { transform: rotate(22deg); } }
@keyframes e082FL { from { transform: rotate(26deg); } to { transform: rotate(-22deg); } }
@media (prefers-reduced-motion: reduce) {
  .e082-wgL, .e082-wgR, .e082-bw { animation-duration: .7s; }
  .e082-far { animation-duration: 30s; } .e082-near { animation-duration: 6s; }
  .st-b7 .e082-peck { animation-duration: .9s; } .st-b8 .e082-drops { animation-duration: 1s; } .st-b8 .e082-shiv { animation: none; }
  .es-ac.act-e082-flap .pp-upwR, .es-ac.act-e082-flap .pp-upwL { animation-duration: .6s; }
  .st-qm .e082-q, .st-b11 .e082-glow { animation-duration: 1.4s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
/** Nhân vật nói trong ms (nhép miệng). */
const talk = async (st, id, ms) => { st.talk(id, true); await st.wait(ms); st.talk(id, false); };

/** Ông làm cỏ ngoài ruộng (mỗi nhịp mới xoá hành động lặp, nên bật lại). */
const work = (st) => { st.hold('gpa', 'e082_hoe'); st.pose('gpa', 'dig'); st.act('gpa', 'dig'); st.act('lucky', 'wag'); };

const BEATS = [
  { key: ['lying on the grass', 'watching the birds'], icon: '🐦', label: 'watching the birds', async play(st) {
    work(st);
    st.look(560);
    const fly = Promise.all([
      st.walk('bd1', 360, { speed: 120, follow: false, y: 96 }),
      st.walk('bd2', 400, { speed: 112, follow: false, y: 70 }),
      st.walk('bd3', 450, { speed: 118, follow: false, y: 112 }),
    ]);
    await st.loop('birds', () => fly, { vol: 0.7 });
    st.mood('lucky', 'joy'); st.act('lucky', 'wag');
    await st.wait(300);
  } },
  { key: ['If I were a bird', 'I would fly all over Vietnam'], icon: '🕊️', label: 'If I were a bird', async play(st) {
    work(st);
    off(st);
    st.look(500);
    st.show('lie', false); st.show('minh', true); st.sfx('whoosh', { vol: 0.5 });
    st.face('minh', -1); st.mood('minh', 'joy');
    await st.wait(250);
    await st.walk('minh', X.seat, { speed: 110, follow: false });
    st.pose('minh', 'sit'); st.sfx('bump', { vol: 0.3 });
    await st.wait(250);
    st.pose('minh', 'e082_wing'); st.act('minh', 'e082-flap');
    st.set('st-tb-b1'); st.set('st-b1'); st.sfx('pop', { vol: 0.5 });
    const t = talk(st, 'minh', 3000);
    await st.wait(500); st.sfx('wind', { vol: 0.4 });
    await st.wait(900); st.sfx('whoosh', { vol: 0.5 });
    await t;
    st.act('minh', null); st.pose('minh', 'sit');
  } },
  { key: ['Ha Long Bay in the morning', 'Hoi An in the afternoon'], icon: '🏮', label: 'Ha Long · Hoi An', async play(st) {
    work(st);
    st.set('st-b1', false); st.set('st-b2');
    st.pose('minh', 'e082_point');
    const t = talk(st, 'minh', 3400);
    st.sfx('boat-horn', { vol: 0.35 });
    await st.wait(1000);
    st.set('st-b2go'); st.sfx('whoosh', { vol: 0.6 });
    await st.wait(1600);
    st.sfx('ding', { vol: 0.5 });
    await t;
    st.pose('minh', 'sit');
  } },
  { key: ['Lan laughed'], icon: '😂', label: 'Lan laughed', async play(st) {
    work(st);
    off(st, 'st-b2', 'st-b2go', 'st-tb-b1');
    st.mood('lan', 'joy'); st.act('lan', 'hop'); st.sfx('giggle', { vol: 0.7 });
    st.mood('minh', 'happy');
    await st.wait(1300);
    st.act('lan', null);
  } },
  { key: ['If I had wings', "I wouldn't go anywhere"], icon: '🪽', label: 'If I had wings', async play(st) {
    work(st);
    st.chest('lan', null); st.pose('lan', 'sitClap');
    st.set('st-tb-lan'); st.set('st-b4'); st.sfx('pop', { vol: 0.5 });
    const t = talk(st, 'lan', 2600);
    await st.wait(1300);
    st.set('st-b4no'); st.act('lan', 'no'); st.sfx('buzz-no', { vol: 0.4 });
    await t;
    st.act('lan', null);
  } },
  { key: ['sit on the roof', 'read all day'], icon: '📖', label: 'sit on the roof', async play(st) {
    work(st);
    off(st, 'st-b4', 'st-b4no');
    st.set('st-b5'); st.sfx('page-turn', { vol: 0.6 });
    st.chest('lan', LBOOK); st.pose('lan', 'e082_book');
    const t = talk(st, 'lan', 2400);
    await st.wait(1400); st.sfx('page-turn', { vol: 0.6, rate: 1.2 });
    await t;
  } },
  { key: ['Grandpa was listening'], icon: '👂', label: 'listening', async play(st) {
    off(st, 'st-b5', 'st-tb-lan');
    st.pose('lan', 'sit'); st.chest('lan', null);
    st.look(760);
    st.act('gpa', 'dig'); st.sfx('dig', { vol: 0.4 });
    await st.wait(500);
    st.act('gpa', null); st.hold('gpa', null); st.pose('gpa', 'stand');
    await st.wait(200);
    st.face('gpa', -1); st.pose('gpa', 'e082_ear'); st.set('st-ear'); st.mood('gpa', 'joy');
    st.sfx('giggle', { vol: 0.3 });
    await st.wait(1500);
  } },
  { key: ['If you were birds', 'find your own food'], icon: '🪱', label: 'find your own food', async play(st) {
    st.set('st-ear', false); st.pose('gpa', 'stand');
    st.look(500, { dur: 1800 });
    await st.walk('gpa', 680, { speed: 120, follow: false });
    st.pose('gpa', 'point');
    st.set('st-tb-gpa'); st.set('st-b7'); st.sfx('pop', { vol: 0.5 });
    const t = talk(st, 'gpa', 2400);
    for (let i = 0; i < 4; i++) { await st.wait(400); st.sfx('crunch', { vol: 0.4, rate: 1.2 }); }
    st.mood('minh', 'wow'); st.mood('lan', 'wow');
    await t;
    st.pose('gpa', 'stand');
  } },
  { key: ['if it rained', 'you would get wet'], icon: '🌧️', label: 'get wet', async play(st) {
    st.set('st-b7', false); st.set('st-b8');
    st.pose('gpa', 'pointUp');
    const t = talk(st, 'gpa', 2200);
    await st.loop('rain', () => st.wait(2200), { vol: 0.6 });
    st.mood('minh', 'sad'); st.mood('lan', 'sad');
    await t;
    st.pose('gpa', 'stand');
  } },
  { key: ['Minh thought for a moment'], icon: '🤔', label: 'thought', async play(st) {
    off(st, 'st-b8', 'st-tb-gpa');
    st.mood('minh', 'happy'); st.mood('lan', 'happy');
    st.face('minh', 1); st.pose('minh', 'e082_think'); st.set('st-qm');
    await st.loop('tick', () => st.wait(1800), { vol: 0.6 });
  } },
  { key: ['fly to Sydney', "stay with Tom's family"], icon: '✈️', label: 'fly to Sydney', async play(st) {
    st.set('st-qm', false);
    st.face('minh', -1); st.mood('minh', 'joy'); st.pose('minh', 'e082_up'); st.sfx('ding', { vol: 0.5 });
    st.set('st-tb-b1'); st.set('st-b10');
    const t = talk(st, 'minh', 2800);
    await st.wait(300);
    st.pose('minh', 'e082_wing'); st.act('minh', 'e082-flap');
    await st.loop('wind', () => st.wait(2400), { vol: 0.5 });
    st.act('minh', null); st.sfx('ding', { vol: 0.4, rate: 1.3 });
    await t;
  } },
  { key: ['a big warm house'], icon: '🏠', label: 'a big warm house', async play(st) {
    st.set('st-b10', false); st.set('st-b11');
    st.pose('minh', 'e082_open'); st.act('minh', 'hop');
    const t = talk(st, 'minh', 1800);
    await st.wait(700);
    st.sfx('knock', { vol: 0.5 });
    await st.wait(350);
    st.set('st-b11warm'); st.sfx('door-open', { vol: 0.5 });
    await t;
    await st.wait(300);
    st.act('minh', null);
  } },
  { key: ['Everyone laughed', 'Lucky barked happily'], icon: '🐶', label: 'Lucky barked', async play(st) {
    off(st, 'st-b11', 'st-b11warm', 'st-tb-b1');
    for (const id of ['minh', 'lan', 'gpa']) st.mood(id, 'joy');
    st.pose('minh', 'e082_cheer'); st.act('minh', 'hop'); st.act('lan', 'hop'); st.act('gpa', 'hop'); st.pose('gpa', 'clap');
    st.sfx('giggle', { vol: 0.7 });
    await st.wait(500);
    st.dog('lucky', 'stand'); st.act('lucky', 'jump'); st.sfx('dog-bark', { vol: 0.8 });
    await st.say('lucky', 'Woof! Woof!', 1100);
    st.sfx('dog-bark', { vol: 0.6 });
    await st.wait(400);
    for (const id of ['minh', 'lan', 'gpa', 'lucky']) st.act(id, null);
    st.act('lucky', 'wag');
  } },
];

export default {
  id: 'en082', worldW: W, floor: FLOOR, viewTop: 34, camStart: 300, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 1, 2, 5, 8, 10],
  cast: [
    { id: 'bd1', kind: 'thing', x: 1000, y: 96, svg: BIRD, box: [-22, -12, 44, 16], face: -1 },
    { id: 'bd2', kind: 'thing', x: 1060, y: 70, svg: BIRD, box: [-22, -12, 44, 16], face: -1 },
    { id: 'bd3', kind: 'thing', x: 1110, y: 112, svg: BIRD, box: [-22, -12, 44, 16], face: -1 },
    { id: 'gpa', kind: 'adult', who: 'e082_gpa', x: X.gpa, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.bench - 36, s: 1.08 },
    { id: 'lie', kind: 'thing', x: X.minh, y: FLOOR + 2, svg: LIE, box: [-80, -40, 144, 44] },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.minh, face: -1 },
    { id: 'lucky', kind: 'dog', x: X.lucky + 20, s: 0.85, face: -1 },
  ],
  init(st) {
    st.show('minh', false);
    st.pose('lan', 'e082_book'); st.chest('lan', LBOOK);
    st.hold('gpa', 'e082_hoe'); st.pose('gpa', 'dig');
    st.dog('lucky', 'sit');
  },
};
