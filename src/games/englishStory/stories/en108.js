/**
 * Bài 108 "Fixing the Spaceship" (mệnh đề quan hệ which / who; may / might). Vườn nhà Minh như bài 101 (nhà mái đỏ, cây
 * xoài, phi thuyền hỏng dưới gốc) → góc đồ cũ (thùng tái chế, đống đồ cũ) → cổng rào nhà Tom.
 * Phi thuyền thiếu động cơ, cửa kính, cánh: các bạn gom đồ cũ (chai nhựa sạch, quạt cũ còn chạy, dây điện của bố, vung nồi
 * của bà) rồi Bíp lắp: quạt thành động cơ, chai thành cửa kính, vung nồi thành cánh. Tối, Bíp bấm nút xanh, phi thuyền
 * nhấc lên khỏi mặt đất.
 * Phi thuyền đã sửa (SHIP_FIXED: SHIP_SVG của bip.js + đồ tái chế) dùng lại ở bài 109, 110.
 * Toạ độ cảnh: rộng 1500, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, sky, cloud, grass, fence, bush, flowerAt, sun, label, thought } from '../kit.js';
import { BIP_SVG, BIP_BOX, BIP_CSS, SHIP_SVG, SHIP_BOX, bipSet } from '../bip.js';

const FLOOR = 282;
const W = 1500;
const X = { door: 196, box: 600, ship: 760, tree: 850, bin: 1080, pile: 1160, gate: 1390 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

// ── Đồ tái chế (gốc ở giữa) ─────────────────────────────────────────────────
const BOTTLE = (r = 0) => `<g transform="rotate(${r})"><path d="M-5 -14 V-10 Q-8 -8 -8 -3 V12 Q-8 15 -5 15 H5 Q8 15 8 12 V-3 Q8 -8 5 -10 V-14Z" fill="#BAE6FD" fill-opacity="0.85" stroke="#0284C7" stroke-width="1"/>
  <rect x="-4" y="-18" width="8" height="5" rx="1" fill="#22C55E" stroke="${L}" stroke-width="0.6"/><path d="M-4 -4 V10" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.8"/></g>`;
const BOTTLES = `${BOTTLE(-14).replace('<g transform="rotate(-14)">', '<g transform="translate(-9 0) rotate(-14)">')}${BOTTLE(0)}${BOTTLE(14).replace('<g transform="rotate(14)">', '<g transform="translate(9 0) rotate(14)">')}`;
const FANBLADES = `<g class="e108-blades">${[0, 120, 240].map((r) => `<path d="M0 0 Q6 -6 2 -13 Q-4 -10 0 0Z" fill="#7DD3FC" stroke="${L}" stroke-width="0.7" transform="rotate(${r})"/>`).join('')}<circle r="2.4" fill="#475569"/></g>`;
const FAN = `<g><path d="M-3 13 V22 M-10 24 H10" stroke="#64748B" stroke-width="3" stroke-linecap="round"/><circle r="14" fill="#F8FAFC" stroke="${L}" stroke-width="1"/>${FANBLADES}
  <circle r="14" fill="none" stroke="#94A3B8" stroke-width="1.4" stroke-dasharray="2 2.4"/></g>`;
const WIRE = `<g><ellipse rx="11" ry="9" fill="none" stroke="#DC2626" stroke-width="2.4"/><ellipse rx="7" ry="5.6" fill="none" stroke="#DC2626" stroke-width="2.4"/><path d="M10 3 Q16 8 12 14" stroke="#DC2626" stroke-width="2.2" fill="none"/></g>`;
const LID = `<g><ellipse cx="0" cy="2" rx="18" ry="7" fill="#CBD5E1" stroke="${L}" stroke-width="1"/><ellipse cx="0" cy="0" rx="18" ry="6" fill="#E2E8F0" stroke="${L}" stroke-width="1"/>
  <ellipse cx="0" cy="-4" rx="5" ry="2.6" fill="#1F2937" stroke="${L}" stroke-width="0.7"/><path d="M-12 -1 Q-4 -4 6 -3" stroke="#fff" stroke-width="1.4" fill="none"/></g>`;
const BOXC = `<g><path d="M-30 -30 L-38 -40 M30 -30 L38 -40" stroke="${L}" stroke-width="1"/><rect x="-30" y="-30" width="60" height="30" fill="#D6A35C" stroke="${L}" stroke-width="1.1"/>
  <path d="M-30 -30 L-40 -42 L-16 -42 L-6 -30Z M30 -30 L40 -42 L16 -42 L6 -30Z" fill="#E9C08A" stroke="${L}" stroke-width="0.9"/><path d="M-12 -14 H12" stroke="#A16207" stroke-width="1.2"/></g>`;

/**
 * Đồ tái chế lắp trên phi thuyền (toạ độ của SHIP_SVG: gốc giữa đáy). Lớp e108-broke: chỗ hỏng (lỗ kính, mỏm cánh gãy,
 * hốc động cơ); e108-eng / e108-win / e108-wing: quạt, chai, vung nồi; e108-btn: nút xanh. Bài 109, 110 dùng bản đã lắp.
 */
const PARTS = `<g class="e108-broke">
    <path d="M-12 -74 L-4 -64 L-10 -56 L2 -50 L-6 -42 L-18 -48 L-24 -60Z" fill="#1E293B" stroke="${L}" stroke-width="0.8"/>
    <path d="M-4 -64 L8 -70 M2 -50 L14 -54 M-18 -48 L-26 -44" stroke="#475569" stroke-width="1"/>
    <path d="M70 -34 L80 -40 L78 -32 L86 -34 L76 -26Z" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/>
    <ellipse cx="0" cy="-15" rx="12" ry="5" fill="#1F2937" stroke="${L}" stroke-width="0.8"/><path d="M-4 -12 q-3 6 1 9 M5 -12 q4 5 0 9" stroke="#DC2626" stroke-width="1.2" fill="none"/></g>
  <g class="e108-eng"><g transform="translate(0 -12) scale(0.62)"><circle r="16" fill="#F8FAFC" stroke="${L}" stroke-width="1.4"/>${FANBLADES}<circle r="16" fill="none" stroke="#94A3B8" stroke-width="1.6" stroke-dasharray="2 2.4"/></g></g>
  <g class="e108-win">${[[-20, -58, -38], [-6, -66, -12], [8, -66, 12], [22, -58, 38]].map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(0.62)">${BOTTLE(0)}</g>`).join('')}</g>
  <g class="e108-wing"><g transform="translate(84 -36) rotate(-24) scale(0.9)">${LID}</g></g>
  <g class="e108-btn"><circle cx="-44" cy="-31" r="4.6" fill="#22C55E" stroke="${L}" stroke-width="0.8"/><circle class="e108-btnglow" cx="-44" cy="-31" r="9" fill="#86EFAC" opacity="0"/></g>`;
/** Phi thuyền sửa bằng đồ tái chế (bài 108 từ đầu chưa lắp; bài 109, 110 thêm class e108-done trên nhân vật). */
export const SHIP_FIXED = SHIP_SVG.replace(/<\/g><\/g>$/, `${PARTS}</g></g>`);
export const SHIP_PARTS_CSS = `
.e108-eng, .e108-win, .e108-wing { opacity: 0; transition: opacity .3s; }
.e108-done .e108-broke { opacity: 0; }
.e108-done .e108-eng, .e108-done .e108-win, .e108-done .e108-wing, .e108-on-eng .e108-eng, .e108-on-win .e108-win, .e108-on-wing .e108-wing { opacity: 1; }
.e108-blades { animation: e108Spin 1.2s linear infinite; }
.ship-fly .e108-blades, .e108-fast .e108-blades { animation-duration: .18s; }
@keyframes e108Spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .e108-blades { animation-duration: 3s; } .ship-fly .e108-blades, .e108-fast .e108-blades { animation-duration: .6s; } }
`;

// ── Cảnh ──────────────────────────────────────────────────────────────────
const house = () => `<g>
  <rect x="0" y="108" width="270" height="${FLOOR - 108}" fill="#FEF3C7" stroke="${L}" stroke-width="1.3"/>
  <path d="M-10 112 L40 62 H250 L284 112Z" fill="#DC2626" stroke="${L}" stroke-width="1.3"/>
  ${Array.from({ length: 8 }, (_, i) => `<path d="M${10 + i * 34} 112 L${48 + i * 28} 64" stroke="#B91C1C" stroke-width="1.2"/>`).join('')}
  <rect x="40" y="140" width="80" height="66" rx="3" fill="#BAE6FD" stroke="${L}" stroke-width="1.2"/><path d="M80 140 V206 M40 173 H120" stroke="#fff" stroke-width="3"/>
  <rect x="34" y="204" width="92" height="8" rx="2" fill="#A16207" stroke="${L}" stroke-width="0.9"/>
  <rect x="${X.door - 30}" y="176" width="60" height="${FLOOR - 176}" rx="3" fill="#78350F" stroke="${L}" stroke-width="1.2"/>
  <g class="e108-door"><rect x="${X.door - 30}" y="176" width="60" height="${FLOOR - 176}" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
  <rect x="${X.door - 24}" y="184" width="22" height="36" rx="2" fill="#92400E"/><rect x="${X.door + 2}" y="184" width="22" height="36" rx="2" fill="#92400E"/>
  <circle cx="${X.door + 18}" cy="232" r="3" fill="#FDE68A"/></g>
  <rect x="0" y="${FLOOR}" width="290" height="${315 - FLOOR}" fill="#E7C9A0" stroke="${L}"/>
  ${Array.from({ length: 6 }, (_, i) => `<path d="M${i * 50} ${FLOOR} V315" stroke="#C9A77C" stroke-width="1"/>`).join('')}</g>`;
const mango = (x) => `<g transform="translate(${x} ${FLOOR})">
  <path d="M-16 0 Q-10 -60 -18 -110 L-4 -112 Q2 -70 14 -112 L26 -108 Q12 -60 18 0Z" fill="#92400E" stroke="${L}" stroke-width="1.2"/>
  <g class="ek-sway" style="transform-origin:0 -110px">
    <ellipse cx="-50" cy="-150" rx="66" ry="44" fill="#15803D" stroke="${L}" stroke-width="1.2"/>
    <ellipse cx="54" cy="-148" rx="70" ry="46" fill="#16A34A" stroke="${L}" stroke-width="1.2"/>
    <ellipse cx="0" cy="-196" rx="78" ry="48" fill="#22C55E" stroke="${L}" stroke-width="1.2"/>
    ${[[-70, -120], [-24, -134], [30, -118], [84, -126], [-6, -172], [52, -182]].map(([mx, my]) => `<g transform="translate(${mx} ${my})"><path d="M0 -8 V-2" stroke="#166534" stroke-width="1.4"/>
      <path d="M0 -3 Q8 0 6 10 Q2 16 -4 12 Q-8 4 0 -3Z" fill="#FBBF24" stroke="${L}" stroke-width="0.9"/></g>`).join('')}
  </g></g>`;
/** Thùng tái chế (gốc giữa đáy). */
const bin = (x) => `<g transform="translate(${x} ${FLOOR})"><path d="M-24 0 L-28 -58 H28 L24 0Z" fill="#16A34A" stroke="${L}" stroke-width="1.2"/>
  <rect x="-32" y="-66" width="64" height="9" rx="3" fill="#15803D" stroke="${L}" stroke-width="1.1"/>
  <g class="e108-rec" transform="translate(0 -30)">${[0, 120, 240].map((r) => `<path d="M-2 -13 L8 -13 L12 -6 M12 -6 L14 -12 M12 -6 L6 -5" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="rotate(${r})"/>`).join('')}</g></g>`;
/** Đống đồ cũ: hộp, chai, lốp, quạt hỏng (gốc giữa đáy). */
const pile = (x) => `<g transform="translate(${x} ${FLOOR})">
  <ellipse cx="0" cy="-12" rx="30" ry="12" fill="#1F2937" stroke="${L}"/><ellipse cx="0" cy="-12" rx="14" ry="5" fill="#475569"/>
  <rect x="18" y="-38" width="40" height="38" fill="#D6A35C" stroke="${L}" stroke-width="1"/><path d="M18 -38 L28 -48 H66 L58 -38" fill="#E9C08A" stroke="${L}" stroke-width="0.9"/>
  <g class="e108-pb"><g transform="translate(-34 -14) rotate(-70)">${BOTTLE(0)}</g><g transform="translate(-22 -32) rotate(20)">${BOTTLE(0)}</g><g transform="translate(-6 -30) rotate(-10)">${BOTTLE(0)}</g></g>
  <rect class="e108-pk" x="-58" y="-22" width="20" height="22" rx="3" fill="#FCA5A5" stroke="${L}" stroke-width="0.9"/>
  <path d="M60 0 L64 -24 H80 L84 0Z" fill="#94A3B8" stroke="${L}" stroke-width="0.9"/></g>`;

function bg() {
  return `
  ${sky(0, W, 315, 'e108sky')}
  <g class="e108-sun"><g transform="translate(470 74)">${sun(22)}</g></g>
  ${cloud(160, 66, 0.8, 0)}${cloud(980, 54, 0.9, 2)}${cloud(1340, 72, 0.8, 4)}
  <rect class="e108-eve" x="0" y="0" width="${W}" height="315" fill="url(#e108evg)"/>
  <defs><linearGradient id="e108evg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7C3AED"/><stop offset="0.7" stop-color="#FB923C"/></linearGradient></defs>
  <g class="e108-eve"><circle cx="1180" cy="210" r="26" fill="#FDBA74"/>${[[320, 40], [640, 60], [900, 30], [1240, 50]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="#FEF9C3"/>`).join('')}</g>
  ${grass(270, W - 270, FLOOR)}
  ${fence(300, 200, FLOOR)}${fence(940, 420, FLOOR)}
  <path d="M${X.gate - 26} ${FLOOR} V236 M${X.gate + 26} ${FLOOR} V236" stroke="${L}" stroke-width="4"/>
  ${fence(X.gate + 34, 80, FLOOR)}
  ${house()}
  ${mango(X.tree)}
  ${bush(420, FLOOR, 0.9)}${bush(1260, FLOOR, 1, '#4ADE80')}
  ${[[360, '#F472B6'], [470, '#FACC15'], [520, '#F472B6'], [1210, '#FACC15'], [1320, '#F472B6']].map(([x, c]) => flowerAt(x, FLOOR - 2, c)).join('')}
  ${bin(X.bin)}${pile(X.pile)}`;
}

/** Bong bóng nghĩ của Bíp: cửa hàng Trái Đất có đủ thứ, không có đồ phi thuyền. */
const SHOP = `<rect x="-62" y="-34" width="124" height="66" rx="6" fill="#FEF3C7"/>
  <path d="M-62 -34 H62 L56 -22 H-56Z" fill="#EF4444"/><text y="-25" text-anchor="middle" ${NUN} font-size="9" fill="#fff">SHOP</text>
  <rect x="-54" y="-14" width="108" height="3" fill="#A16207"/><rect x="-54" y="10" width="108" height="3" fill="#A16207"/>
  ${[[-46, '#F472B6'], [-34, '#60A5FA'], [-22, '#FACC15']].map(([x, c]) => `<rect x="${x}" y="-24" width="9" height="10" rx="2" fill="${c}" stroke="${L}" stroke-width="0.5"/>`).join('')}
  ${[[-46, '#4ADE80'], [-32, '#FB923C']].map(([x, c]) => `<circle cx="${x + 4}" cy="5" r="5" fill="${c}" stroke="${L}" stroke-width="0.5"/>`).join('')}
  <g transform="translate(24 -2)"><g transform="scale(0.32) translate(0 40)">${SHIP_SVG.replace(/class="[^"]*"/g, '')}</g>
    <circle r="20" fill="none" stroke="#DC2626" stroke-width="3"/><path d="M-14 -14 L14 14" stroke="#DC2626" stroke-width="3"/></g>`;

function fg() {
  return `
  ${bush(300, FLOOR + 34, 0.6)}${bush(1000, FLOOR + 34, 0.7, '#4ADE80')}
  <!-- hộp gom đồ -->
  <g transform="translate(${X.box} ${FLOOR + 6})">${BOXC}
    <g class="e108-in e108-in-b"><g transform="translate(-14 -36)">${BOTTLES}</g></g>
    <g class="e108-in e108-in-f"><g transform="translate(14 -42)">${FAN}</g></g>
    <g class="e108-in e108-in-w"><g transform="translate(-18 -30)">${WIRE}</g></g>
    <g class="e108-in e108-in-l"><g transform="translate(4 -32) rotate(-8)">${LID}</g></g>
    <g class="e108-in e108-in-o"><g transform="translate(-4 -34)"><rect x="-8" y="-6" width="16" height="12" rx="2" fill="#FCA5A5" stroke="${L}" stroke-width="0.7"/></g></g></g>
  ${thought(X.ship - 150, 110, 160, 96, SHOP, [X.ship - 70, 178], 'e108-th')}
  <!-- nhãn -->
  <g class="e108-lb e108-lb-eng">${label(X.ship + 10, 236, 'engine', '#DC2626', 13)}</g>
  <g class="e108-lb e108-lb-win">${label(X.ship - 10, 154, 'window', '#DC2626', 13)}</g>
  <g class="e108-lb e108-lb-wing">${label(X.ship + 92, 196, 'wing', '#DC2626', 13)}</g>
  <g class="e108-lb e108-lb-rec">${label(X.bin, 176, 'recycle', '#16A34A', 16)}</g>
  <g class="e108-lb e108-lb-old">${label(X.pile, 140, 'old things', '#B45309', 15)}</g>
  <g class="e108-lb e108-lb-clean">${label(X.pile - 60, 120, 'clean', '#0284C7', 15)}</g>
  <g class="e108-lb e108-lb-works">${label(X.pile + 120, 110, 'still works', '#16A34A', 15)}</g>
  <g class="e108-lb e108-lb-dad">${label(330, 96, 'good at fixing things', '#2563EB', 13)}</g>
  <g class="e108-lb e108-lb-lid">${label(X.door + 10, 302, 'a pot lid', '#475569', 14)}</g>
  <g class="e108-lb e108-lb-asEng">${label(X.ship - 10, 236, 'fan = engine', '#0284C7', 13)}</g>
  <g class="e108-lb e108-lb-asWin">${label(X.ship - 10, 154, 'bottles = window', '#0284C7', 13)}</g>
  <g class="e108-lb e108-lb-asWing">${label(X.ship + 90, 194, 'new wing', '#0284C7', 13)}</g>
  <g class="e108-lb e108-lb-eve">${label(X.ship, 70, 'That evening', '#7C3AED', 16)}</g>
  <g class="e108-lb e108-lb-btn">${label(X.ship - 50, 306, 'green button', '#16A34A', 13)}</g>`;
}

const LB = ['eng', 'win', 'wing', 'rec', 'old', 'clean', 'works', 'dad', 'lid', 'asEng', 'asWin', 'asWing', 'eve', 'btn'];
const CSS = `
${SHIP_PARTS_CSS}
.e108-lb, .e108-in, .e108-th { opacity: 0; transition: opacity .3s; }
${LB.map((k) => `.st-lb-${k} .e108-lb-${k}`).join(', ')} { opacity: 1; }
${LB.map((k) => `.e108-lb-${k}`).join(', ')} { transform-box: fill-box; transform-origin: 50% 100%; }
${LB.map((k) => `.st-lb-${k} .e108-lb-${k}`).join(', ')} { animation: e108Pop .4s cubic-bezier(.3,1.6,.6,1); }
@keyframes e108Pop { from { transform: scale(.3); } }
.st-th .e108-th { opacity: 1; }
.st-in-b .e108-in-b, .st-in-f .e108-in-f, .st-in-w .e108-in-w, .st-in-l .e108-in-l, .st-in-o .e108-in-o { opacity: 1; }
.st-used .e108-in-b, .st-used .e108-in-f, .st-used2 .e108-in-l { opacity: 0; }
.e108-pb, .e108-pk { transition: opacity .3s; } .st-pb .e108-pb, .st-pk .e108-pk { opacity: 0; }
.e108-rec { transform-box: fill-box; transform-origin: center; }
.st-lb-rec .e108-rec { animation: e108Rec 1.2s linear 2; }
@keyframes e108Rec { to { transform: rotate(360deg); } }
.e108-door { transition: opacity .3s; } .st-door .e108-door { opacity: 0; }
.e108-eve { opacity: 0; transition: opacity 1.2s; pointer-events: none; } .st-eve .e108-eve { opacity: .55; }
.st-eve g.e108-eve { opacity: 1; }
.e108-sun { transition: opacity 1.2s; } .st-eve .e108-sun { opacity: 0; }
/* Lắp đồ lên phi thuyền: nảy ra từ chỗ lắp */
.e108-on-eng .e108-eng, .e108-on-win .e108-win, .e108-on-wing .e108-wing { animation: e108Fit .45s cubic-bezier(.3,1.6,.6,1); transform-box: fill-box; transform-origin: center; }
@keyframes e108Fit { from { transform: scale(.3); } }
.e108-on-eng .e108-broke ellipse, .e108-on-eng .e108-broke path:nth-of-type(4) { opacity: 0; }
.e108-on-win .e108-broke path:nth-of-type(1), .e108-on-win .e108-broke path:nth-of-type(2) { opacity: 0; }
.e108-on-wing .e108-broke path:nth-of-type(3) { opacity: 0; }
.e108-press .e108-btnglow { animation: e108Btn .5s ease-in-out infinite alternate; }
@keyframes e108Btn { from { opacity: 0; } to { opacity: .9; } }
/* Bíp lắp đồ: giơ hai tay; bấm nút: với tay phải */
.act-e108fix .bip-armR, .act-e108fix .bip-armL { animation: e108Fix .3s ease-in-out infinite alternate; }
.act-e108fix .bip-armR { rotate: -120deg; } .act-e108fix .bip-armL { rotate: 120deg; }
@keyframes e108Fix { to { translate: 0 -3px; } }
.act-e108push .bip-armR { rotate: -78deg; }
.act-e108push .bip-front .bip-head { rotate: 6deg; }
.act-e108hold .bip-armR { rotate: -150deg; } .act-e108hold .bip-armL { rotate: 150deg; }
@media (prefers-reduced-motion: reduce) { .act-e108fix .bip-armR, .act-e108fix .bip-armL { animation-duration: .7s; } }
`;

const POSES = {
  e108_pick: { R: [60, -10], L: [40, -30], head: 12, dy: 10 },
};

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));

const BEATS = [
  { key: ['needs a new engine, window and wing'], icon: '🛸', label: 'engine · window · wing', async play(st) {
    st.look(X.ship - 60);
    st.mood('bip', 'sad');
    for (const [k, r] of [['eng', 1], ['win', 1.15], ['wing', 1.3]]) {
      st.set(`st-lb-${k}`); st.sfx('robot-beep', { vol: 0.5, rate: r });
      await st.wait(800);
    }
    st.mood('minh', 'wow');
    await st.wait(500);
  } },
  { key: ["Shops on Earth don't sell spaceship parts"], icon: '🏪', label: "shops don't sell", async play(st) {
    off(st, 'st-lb-eng', 'st-lb-win', 'st-lb-wing');
    st.look(X.ship - 60);
    st.set('st-th'); st.sfx('pop', { vol: 0.5 });
    st.talk('bip', true);
    await st.wait(1300);
    st.sfx('buzz-no', { vol: 0.5 });
    st.mood('bip', 'sad');
    await st.wait(1300);
    st.talk('bip', false);
  } },
  { key: ['we might find old things', 'which we can recycle'], icon: '♻️', label: 'recycle', async play(st) {
    st.set('st-th', false);
    st.pose('minh', 'pointUp'); st.mood('minh', 'joy'); st.sfx('ding', { vol: 0.6 });
    st.talk('minh', true);
    await st.wait(600);
    st.look(X.bin - 40, { dur: 1100 });
    st.pose('minh', 'point');
    await st.wait(700);
    st.set('st-lb-rec'); st.sfx('whoosh', { vol: 0.4 });
    await st.wait(300);
    st.set('st-lb-old'); st.sfx('pop', { vol: 0.5 });
    st.mood('bip', 'wow');
    await st.wait(1200);
    st.talk('minh', false); st.pose('minh', 'stand');
  } },
  { key: ['The children collect old things'], icon: '📦', label: 'collect old things', async play(st) {
    off(st, 'st-lb-rec');
    st.look(X.pile - 160, { dur: 1300 });
    await Promise.all([
      st.walk('minh', X.pile - 30, { speed: 170, follow: false }),
      st.walk('lan', X.pile - 90, { speed: 170, follow: false }),
      st.walk('bip', X.pile + 60, { speed: 190, follow: false }),
    ]);
    st.set('st-lb-old', false);
    st.pose('minh', 'e108_pick'); st.pose('lan', 'e108_pick');
    st.face('bip', -1);
    st.sfx('click', { vol: 0.5 });
    await st.wait(450);
    st.set('st-pk'); st.chest('minh', `<g transform="translate(0 -4)"><rect x="-10" y="-8" width="20" height="16" rx="2" fill="#FCA5A5" stroke="${L}" stroke-width="0.8"/></g>`);
    st.pose('minh', 'carry'); st.sfx('pop', { vol: 0.5 });
    st.act('bip', 'e108hold'); st.sfx('bump', { vol: 0.4, rate: 1.3 });
    await st.wait(500);
    st.pose('lan', 'stand'); st.mood('minh', 'joy');
    await st.wait(400);
  } },
  { key: ['Lan finds plastic bottles', 'which are clean'], icon: '🧴', label: 'clean bottles', async play(st) {
    st.look(X.pile - 40);
    st.pose('lan', 'e108_pick'); st.sfx('click', { vol: 0.6 });
    await st.wait(400);
    st.set('st-pb');
    st.chest('lan', `<g transform="translate(0 -2)">${BOTTLES}</g>`); st.pose('lan', 'carry'); st.mood('lan', 'joy');
    st.sfx('tap-water', { vol: 0.35 });
    st.set('st-lb-clean'); st.fx('sparkle', X.pile - 90, FLOOR - 70, { quiet: true });
    await st.wait(1500);
  } },
  { key: ['Tom brings an old fan', 'which still works'], icon: '🌀', label: 'old fan', async play(st) {
    st.set('st-lb-clean', false);
    st.look(X.pile + 90);
    st.show('tom', true);
    st.chest('tom', `<g transform="translate(0 -10)">${FAN}</g>`); st.pose('tom', 'carry');
    await st.walk('tom', X.pile + 140, { speed: 150, follow: false });
    st.face('tom', -1);
    bipSet(st, 'tom', 'e108-fast'); st.sfx('drone', { vol: 0.4 });
    st.set('st-lb-works'); st.mood('tom', 'joy'); st.mood('bip', 'joy');
    await st.wait(1300);
    bipSet(st, 'tom', 'e108-fast', false);
  } },
  { key: ['Dad, who is good at fixing things', 'gives them some wire'], icon: '🔌', label: 'Dad gives wire', async play(st) {
    st.set('st-lb-works', false);
    // các bạn mang đồ về hộp cạnh phi thuyền
    st.place('tom', 400, FLOOR, 1); st.place('lan', 465, FLOOR, 1); st.place('minh', 530, FLOOR, 1); st.place('bip', X.ship + 80, FLOOR, -1);
    st.chest('lan', ''); st.chest('tom', ''); st.chest('minh', ''); st.set('st-in-o'); st.act('bip', null); st.pose('lan', 'stand'); st.pose('tom', 'stand');
    st.set('st-in-b'); st.set('st-in-f');
    st.look(X.door + 190, { instant: true });
    st.set('st-door'); st.sfx('door-open', { vol: 0.6 });
    st.show('dad', true);
    st.set('st-lb-dad');
    st.chest('dad', `<g transform="translate(0 -6)">${WIRE}</g>`); st.pose('dad', 'carry');
    await st.walk('dad', 330, { speed: 130, follow: false });
    st.chest('dad', ''); st.pose('dad', 'give'); st.sfx('whoosh', { vol: 0.4 });
    await st.fly(WIRE, [350, FLOOR - 110], [X.box - 18, FLOOR - 24], { size: 26, dur: 560 });
    st.set('st-in-w'); st.sfx('click', { vol: 0.7 });
    st.mood('minh', 'joy'); st.pose('dad', 'stand');
    await st.wait(300);
  } },
  { key: ['Grandma sends a pot lid'], icon: '🍳', label: 'a pot lid', async play(st) {
    st.set('st-lb-dad', false);
    st.look(X.door + 180);
    st.show('grandma', true);
    st.pose('grandma', 'wave'); st.mood('grandma', 'joy');
    st.set('st-lb-lid'); st.sfx('pop', { vol: 0.4 });
    await st.wait(500);
    st.pose('grandma', 'throw'); st.sfx('whoosh', { vol: 0.7 });
    await st.fly(LID, [X.door + 20, FLOOR - 140], [X.box + 4, FLOOR - 26], { size: 40, dur: 900 });
    st.set('st-in-l'); st.sfx('knock', { vol: 0.8, rate: 1.4 });
    st.pose('grandma', 'stand'); st.pose('dad', 'clap');
    st.mood('lan', 'joy');
    await st.wait(500);
    st.pose('dad', 'stand');
  } },
  { key: ['uses the fan as an engine', 'the bottles as a window'], icon: '🔧', label: 'fan · bottles', async play(st) {
    st.set('st-lb-lid', false);
    st.look(X.ship - 20);
    await st.walk('bip', X.ship + 80, { speed: 160, follow: false });
    st.face('bip', -1); st.act('bip', 'e108fix');
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(FAN, [X.box + 14, FLOOR - 40], [X.ship, FLOOR - 12], { size: 30, dur: 600 });
    st.set('st-used'); bipSet(st, 'ship', 'e108-on-eng'); st.set('st-lb-asEng'); st.sfx('bike-fix', { vol: 0.6 });
    await st.wait(700);
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(BOTTLES, [X.box - 14, FLOOR - 40], [X.ship - 4, FLOOR - 62], { size: 34, dur: 600 });
    bipSet(st, 'ship', 'e108-on-win'); st.set('st-lb-asWin'); st.sfx('click', { vol: 0.7 }); st.sfx('knock', { vol: 0.4, rate: 1.5 });
    await st.wait(700);
    st.act('bip', null);
  } },
  { key: ['The pot lid becomes a new wing'], icon: '🪽', label: 'a new wing', async play(st) {
    off(st, 'st-lb-asEng', 'st-lb-asWin');
    st.act('bip', 'e108fix');
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(LID, [X.box + 4, FLOOR - 32], [X.ship + 84, FLOOR - 36], { size: 40, dur: 650 });
    st.set('st-used2'); bipSet(st, 'ship', 'e108-on-wing'); st.set('st-lb-asWing');
    for (let i = 0; i < 3; i++) { st.sfx('knock', { vol: 0.6, rate: 1.2 + i * 0.1 }); await st.wait(260); }
    st.act('bip', null); st.mood('bip', 'joy'); st.sfx('ding', { vol: 0.5 });
    await st.wait(700);
  } },
  { key: ['It may not look beautiful', 'but it might fly'], icon: '🤞', label: 'might fly', async play(st) {
    st.set('st-lb-asWing', false);
    st.look(X.ship - 10);
    st.mood('bip', 'happy'); st.act('bip', 'e108hold');
    const say = st.say('bip', 'It may not look beautiful, but it might fly!', 3000);
    await st.wait(1300);
    st.sfx('giggle', { vol: 0.5 });
    for (const id of ['minh', 'lan', 'tom']) st.mood(id, 'joy');
    st.pose('minh', 'clap'); st.act('minh', 'clap');
    await say;
    st.act('bip', null); st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['That evening', 'Bip presses a green button'], icon: '🟢', label: 'green button', async play(st) {
    st.set('st-eve'); st.set('st-lb-eve'); st.sfx('crickets', { vol: 0.4 });
    st.show('dad', false); st.show('grandma', false);
    st.look(X.ship - 20);
    await st.walk('bip', X.ship - 75, { speed: 140, follow: false });
    st.face('bip', 1); st.set('st-lb-eve', false);
    st.act('bip', 'e108push'); st.mood('bip', 'wow');
    await st.wait(500);
    bipSet(st, 'ship', 'e108-press'); st.set('st-lb-btn'); st.sfx('click', { vol: 0.9 });
    await st.wait(200);
    st.sfx('beep', { vol: 0.5 });
    await st.wait(900);
  } },
  { key: ['makes a happy noise', 'lifts a little off the ground'], icon: '🚀', label: 'lifts off', async play(st) {
    st.set('st-lb-btn', false);
    st.act('bip', null);
    st.look(X.ship - 20);
    bipSet(st, 'ship', 'ship-broken', false); bipSet(st, 'ship', 'ship-fixed');
    bipSet(st, 'ship', 'e108-fast');
    st.sfx('robot-beep', { vol: 0.7, rate: 1.3 });
    await st.wait(300);
    await st.loop('drone', async () => {
      bipSet(st, 'ship', 'ship-fly');
      await st.wait(500);
      await st.walk('ship', X.ship, { speed: 30, follow: false, y: FLOOR - 26 });
      st.sfx('robot-beep', { vol: 0.6, rate: 1.6 });
      st.mood('bip', 'joy'); st.act('bip', 'jump');
      for (const id of ['minh', 'lan', 'tom']) { st.pose(id, 'cheer'); st.act(id, 'cheer'); st.mood(id, 'joy'); }
      st.sfx('cheer', { vol: 0.5 });
      await st.wait(1300);
    }, { vol: 0.6 });
    for (const id of ['minh', 'lan', 'tom']) { st.act(id, null); st.pose(id, 'stand'); }
  } },
];

export default {
  id: 'en108', worldW: W, floor: FLOOR, viewTop: 40, camStart: 440, css: KIT_CSS + BIP_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  order: [0, 2, 4, 6, 8, 12],
  cast: [
    { id: 'ship', kind: 'thing', svg: SHIP_FIXED, box: SHIP_BOX, x: X.ship, s: 1 },
    { id: 'grandma', kind: 'adult', who: 'en_grandma', x: X.door, face: 1 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: X.door, face: 1 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: W + 60, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 465, s: 1.05, face: 1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 530, face: 1 },
    { id: 'bip', kind: 'thing', svg: BIP_SVG, box: BIP_BOX, x: X.ship + 150, face: -1 },
  ],
  init(st) {
    bipSet(st, 'ship', 'ship-broken');
    for (const id of ['grandma', 'dad', 'tom']) st.show(id, false);
  },
};
