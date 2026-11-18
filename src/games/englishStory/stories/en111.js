/**
 * Bài 111 "The Lion and the Mouse" (ngụ ngôn Aesop; can / can't, big / small). Một đồng cỏ châu Phi đi từ trái sang phải:
 * hòn đá có hang chuột (bông cúc to hơn chuột) → cây keo lớn, sư tử ngủ dưới bóng cây → cây thứ hai có cành ngang, tấm lưới
 * thợ săn treo trên cành rơi xuống chụp sư tử, chuột chạy tới cắn đứt từng sợi lưới.
 * Sư tử và chuột là đồ vật riêng (kind 'thing'): nét mặt bằng mood (m-sleep, m-angry, m-laugh, m-joy, m-sad, m-paw, m-beg),
 * nằm = st.dog(id, 'sit'). Hình sư tử dùng lại ở bài 114 (lionSvg / lionCss có tiền tố riêng).
 * Toạ độ cảnh: rộng 1600, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, sky, cloud, bush, label, speaker, sun } from '../kit.js';

const FLOOR = 282;
const W = 1600;
const X = { hole: 380, treeA: 720, lion: 680, treeB: 1320, net: 1200 };

// ── Sư tử (nhìn nghiêng, mặt sang phải; gốc = giữa chỗ chân chạm đất) ─────────────────────────
const LN = '#EBAA4C', LND = '#C98A2E', MANE = '#9A4A1C', MANE2 = '#B95F25', LIGHT = '#FBE3B5', FACE = '#F3BE66';
/**
 * Sư tử: p = tiền tố class của truyện. Mood: happy (mặc định), sleep, angry, laugh, joy, sad, paw (giơ chân đau, có gai),
 * pawok (giơ chân, hết gai). Nằm: lớp .is-sit (st.dog). act: roar, laugh, no, struggle, strong, lick.
 */
export function lionSvg(p) {
  const leg = (x, cls, dark, inner = '') => `<g transform="translate(${x} -42)"><g class="${cls}">
    <path d="M0 0 L0 36" stroke="${L}" stroke-width="14" stroke-linecap="round"/><path d="M0 0 L0 36" stroke="${dark ? LND : LN}" stroke-width="12" stroke-linecap="round"/>
    <ellipse cx="3" cy="38" rx="9.5" ry="4.6" fill="${dark ? '#EBCB91' : LIGHT}" stroke="${L}" stroke-width="0.9"/>${inner}</g></g>`;
  const thorn = `<g class="${p}-thorn"><path d="M1 40 L-3 52 L5 41Z" fill="#78350F" stroke="${L}" stroke-width="0.6"/></g>`;
  const mane = Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; return `<circle cx="${(Math.cos(a) * 27).toFixed(1)}" cy="${(Math.sin(a) * 27).toFixed(1)}" r="12" fill="${i % 2 ? MANE : MANE2}" stroke="${L}" stroke-width="0.8"/>`; }).join('');
  const head = `<g transform="translate(70 -82)"><g class="${p}-head">
    <g class="${p}-mane">${mane}<circle r="30" fill="${MANE2}"/></g>
    <circle cx="-7" cy="-21" r="6.4" fill="${FACE}" stroke="${L}" stroke-width="0.9"/><circle cx="-7" cy="-21" r="3" fill="#F9A8D4"/>
    <circle r="21" fill="${FACE}" stroke="${L}" stroke-width="1.1"/>
    <ellipse cx="12" cy="8" rx="13" ry="9.5" fill="${LIGHT}" stroke="${L}" stroke-width="0.9"/>
    <path d="M14 -1 L23 -1 Q22 4 18.5 5 Q15 4 14 -1Z" fill="#5B3A29"/>
    <g class="${p}-eo"><ellipse cx="7" cy="-7" rx="2.8" ry="3.6" fill="#2B1D16"/><circle cx="8" cy="-8.4" r="1" fill="#fff"/></g>
    <path class="${p}-es" d="M3.6 -6 Q7 -3 10.4 -6" stroke="#2B1D16" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path class="${p}-ej" d="M3.6 -5 Q7 -10 10.4 -5" stroke="#2B1D16" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path class="${p}-brow" d="M1 -15 L13 -10" stroke="#5B3A29" stroke-width="2.4" stroke-linecap="round"/>
    <path class="${p}-browS" d="M2 -11 L12 -14" stroke="#5B3A29" stroke-width="1.8" stroke-linecap="round"/>
    <ellipse cx="-3" cy="5" rx="4" ry="2.4" fill="#F9A8A8" opacity="0.6"/>
    <path class="${p}-mc" d="M12 13 Q15 16 19 13" stroke="${L}" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    <g class="${p}-mo"><path d="M9 12 Q15 24 22 12Z" fill="#B4363C" stroke="${L}" stroke-width="0.9"/><path d="M12 17 Q15 22 19 17Z" fill="#F472B6"/></g>
    <g class="${p}-tongue"><path d="M15 14 Q24 22 28 15 Q25 13 20 13Z" fill="#F472B6" stroke="${L}" stroke-width="0.8"/></g>
    <path d="M20 5 h11 M20 9 l10 3" stroke="#A16207" stroke-width="0.8"/>
    <g class="${p}-ang"><path d="M-30 -30 l5 5 M-25 -30 l-5 5 M-23 -36 l5 5 M-18 -36 l-5 5" stroke="#DC2626" stroke-width="2.4" stroke-linecap="round"/></g>
  </g></g>`;
  const tail = `<g class="${p}-tail" style="transform-origin:-64px -62px"><path d="M-64 -62 Q-92 -58 -96 -30" stroke="${L}" stroke-width="7.4" fill="none" stroke-linecap="round"/>
    <path d="M-64 -62 Q-92 -58 -96 -30" stroke="${LN}" stroke-width="5.6" fill="none" stroke-linecap="round"/><ellipse cx="-97" cy="-25" rx="7" ry="9.5" fill="${MANE}" stroke="${L}" stroke-width="0.8"/></g>`;
  const lie = `<g class="${p}-lie"><ellipse cx="-34" cy="-12" rx="26" ry="12" fill="${LND}" stroke="${L}" stroke-width="0.9"/>
    <path d="M40 -10 H96" stroke="${L}" stroke-width="13" stroke-linecap="round"/><path d="M40 -10 H96" stroke="${LN}" stroke-width="11" stroke-linecap="round"/>
    <ellipse cx="98" cy="-7" rx="9" ry="5" fill="${LIGHT}" stroke="${L}" stroke-width="0.9"/></g>`;
  return `<g class="${p}-bob">
    <g class="${p}-legs">${leg(-40, `${p}-lgB`, true)}${leg(42, `${p}-lgA`, true)}</g>
    ${lie}
    <g class="${p}-up">${tail}
      <ellipse cx="-4" cy="-58" rx="64" ry="27" fill="${LN}" stroke="${L}" stroke-width="1.2"/>
      <ellipse cx="2" cy="-40" rx="44" ry="8" fill="${LIGHT}" opacity="0.7"/>
      <path d="M-50 -66 Q-30 -76 -6 -74" stroke="#F8CD7E" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.8"/>
      ${head}</g>
    <g class="${p}-legs">${leg(-50, `${p}-lgA`, false)}<g transform="translate(30 -42)"><g class="${p}-paw"><g transform="translate(0 42)">${leg(0, `${p}-lgB`, false, thorn)}</g></g></g></g>
  </g>`;
}
export const LION_BOX = [-112, -122, 232, 126];
export const lionCss = (p) => `
.${p}-up { transition: transform .6s ease-in-out; }
.is-sit .${p}-up { transform: translateY(24px); }
.${p}-legs { transition: opacity .25s; }
.is-sit .${p}-legs { opacity: 0; }
.${p}-lie { opacity: 0; transition: opacity .25s; }
.is-sit .${p}-lie { opacity: 1; }
.es-thing.is-walk .${p}-lgA { animation: ${p}Step .34s ease-in-out infinite alternate; }
.es-thing.is-walk .${p}-lgB { animation: ${p}Step .34s ease-in-out infinite alternate-reverse; }
@keyframes ${p}Step { from { transform: rotate(-17deg); } to { transform: rotate(17deg); } }
.es-thing.is-walk .${p}-bob { animation: ${p}Bob .17s ease-in-out infinite alternate; }
@keyframes ${p}Bob { to { transform: translateY(-2.4px); } }
.${p}-tail { animation: ${p}Tail 2.4s ease-in-out infinite alternate; }
@keyframes ${p}Tail { from { transform: rotate(-7deg); } to { transform: rotate(9deg); } }
.${p}-es, .${p}-ej, .${p}-brow, .${p}-browS, .${p}-mo, .${p}-ang, .${p}-tongue, .${p}-thorn { display: none; }
.m-sleep .${p}-eo, .m-laugh .${p}-eo, .m-joy .${p}-eo { display: none; }
.m-sleep .${p}-es, .m-laugh .${p}-ej, .m-joy .${p}-ej { display: inline; }
.m-angry .${p}-brow, .m-angry .${p}-ang, .m-sad .${p}-browS, .m-paw .${p}-browS, .m-paw .${p}-thorn { display: inline; }
.m-laugh .${p}-mo, .m-joy .${p}-mo { display: inline; }
.is-talk .${p}-mo { display: inline; animation: ${p}Talk .3s steps(1) infinite; }
@keyframes ${p}Talk { 50% { opacity: 0; } }
.${p}-paw { transition: transform .45s cubic-bezier(.3,1.3,.6,1); }
.m-paw .${p}-paw, .m-pawok .${p}-paw { transform: translate(6px, -14px) rotate(-78deg); }
.m-sleep .${p}-head { transform: rotate(10deg); transition: transform .5s; }
.act-roar .${p}-head { animation: ${p}Roar .32s ease-in-out infinite alternate; }
@keyframes ${p}Roar { to { transform: translateX(5px) scale(1.08); } }
.act-laugh .${p}-up { animation: ${p}Laugh .18s ease-in-out infinite alternate; }
@keyframes ${p}Laugh { from { transform: translateY(0); } to { transform: translateY(-4px) rotate(-1.5deg); } }
.act-no .${p}-head { animation: ${p}No .24s ease-in-out infinite alternate; }
@keyframes ${p}No { from { transform: rotate(-9deg); } to { transform: rotate(9deg); } }
.act-struggle .${p}-bob { animation: ${p}Strug .14s linear infinite alternate; }
@keyframes ${p}Strug { from { transform: translateX(-4px) rotate(-1.5deg); } to { transform: translateX(4px) rotate(1.5deg); } }
.act-strong .${p}-mane { animation: ${p}Puff .4s ease-in-out infinite alternate; }
@keyframes ${p}Puff { to { transform: scale(1.14); } }
.act-lick .${p}-tongue { display: inline; animation: ${p}Lick .25s ease-in-out infinite alternate; transform-origin: 16px 14px; }
@keyframes ${p}Lick { from { transform: rotate(-12deg); } to { transform: rotate(16deg) translateX(2px); } }
.act-wag .${p}-tail { animation: ${p}Tail .2s ease-in-out infinite alternate; }
@media (prefers-reduced-motion: reduce) {
  .act-roar .${p}-head, .act-laugh .${p}-up, .act-no .${p}-head, .act-struggle .${p}-bob, .act-lick .${p}-tongue, .act-wag .${p}-tail { animation-duration: .6s; }
  .es-thing.is-walk .${p}-lgA, .es-thing.is-walk .${p}-lgB { animation-duration: .7s; }
}`;

// ── Chuột (nhìn nghiêng, mặt sang phải) ───────────────────────────────────────────────────────
const MOUSE = `<g class="e111-mbob"><g class="e111-mpose" style="transform-origin:-8px -2px">
  <path class="e111-mtail" d="M-12 -8 Q-26 -4 -30 -16 Q-32 -24 -26 -26" stroke="#78716C" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse class="e111-mlA" cx="-6" cy="-1.6" rx="4" ry="2.2" fill="#F9A8D4" stroke="${L}" stroke-width="0.6"/>
  <ellipse class="e111-mlB" cx="7" cy="-1.6" rx="4" ry="2.2" fill="#F9A8D4" stroke="${L}" stroke-width="0.6"/>
  <ellipse cx="0" cy="-10" rx="13.5" ry="9" fill="#A8A29E" stroke="${L}" stroke-width="0.9"/>
  <ellipse cx="3" cy="-5.6" rx="8" ry="3.4" fill="#E7E5E4"/>
  <g class="e111-marm"><path d="M8 -12 L15 -20" stroke="#A8A29E" stroke-width="3" stroke-linecap="round"/><circle cx="15.5" cy="-20.5" r="2" fill="#F9A8D4"/></g>
  <g transform="translate(12 -14)"><g class="e111-mhead">
    <circle cx="-3" cy="-8" r="6.6" fill="#A8A29E" stroke="${L}" stroke-width="0.8"/><circle cx="-3" cy="-8" r="4" fill="#F9A8D4"/>
    <ellipse cx="3" cy="0" rx="8.4" ry="7" fill="#B8B2AC" stroke="${L}" stroke-width="0.9"/>
    <circle cx="11" cy="1" r="2.2" fill="#F472B6" stroke="${L}" stroke-width="0.5"/>
    <g class="e111-meo"><circle cx="5" cy="-2" r="1.7" fill="#1F2937"/><circle cx="5.5" cy="-2.6" r="0.6" fill="#fff"/></g>
    <path class="e111-mej" d="M3.4 -1.4 Q5 -3.6 6.6 -1.4" stroke="#1F2937" stroke-width="1.1" fill="none" stroke-linecap="round"/>
    <path d="M9 3 L17 2 M9 4 L16 6" stroke="#78716C" stroke-width="0.5"/>
    <g class="e111-mmo"><path d="M6 4 Q8.4 8 10 4Z" fill="#B4363C"/><path d="M7.2 4 V5.6 M8.8 4 V5.6" stroke="#fff" stroke-width="1"/></g>
  </g></g></g></g>`;
const MOUSE_BOX = [-34, -36, 60, 38];

// ── Cảnh ──────────────────────────────────────────────────────────────────
/** Cây keo tán phẳng (gốc giữa chân cây). */
const acacia = (x, s = 1, branch = false) => `<g transform="translate(${x} ${FLOOR}) scale(${s})">
  <path d="M-8 0 Q-4 -80 -14 -150 L-2 -150 Q6 -90 8 0Z" fill="#92400E" stroke="${L}"/>
  <path d="M-10 -120 Q-40 -150 -70 -158 M-6 -136 Q20 -160 60 -166" stroke="#92400E" stroke-width="7" fill="none" stroke-linecap="round"/>
  ${branch ? `<path d="M-8 -150 Q-60 -196 -122 -198" stroke="${L}" stroke-width="10.4" fill="none" stroke-linecap="round"/><path d="M-8 -150 Q-60 -196 -122 -198" stroke="#92400E" stroke-width="8.6" fill="none" stroke-linecap="round"/>` : ''}
  <g class="ek-sway" style="transform-origin:0 -160px"><ellipse cx="-10" cy="-170" rx="122" ry="22" fill="#4D9A3A" stroke="${L}"/><ellipse cx="-40" cy="-186" rx="70" ry="16" fill="#65B347" stroke="${L}"/>
  <ellipse cx="40" cy="-184" rx="66" ry="15" fill="#5AA640" stroke="${L}"/></g></g>`;
const daisy = (x, h = 58) => `<g transform="translate(${x} ${FLOOR})"><path d="M0 0 Q-3 ${-h / 2} 0 ${-h}" stroke="#16A34A" stroke-width="2.6" fill="none"/><path d="M0 -14 q-12 -4 -14 -14 q10 2 14 12Z" fill="#22C55E" stroke="${L}" stroke-width="0.6"/>
  <g transform="translate(0 ${-h})">${Array.from({ length: 10 }, (_, i) => `<ellipse cy="-8" rx="3.4" ry="7" fill="#fff" stroke="${L}" stroke-width="0.6" transform="rotate(${i * 36})"/>`).join('')}<circle r="5" fill="#FACC15" stroke="${L}" stroke-width="0.7"/></g></g>`;
const tuft = (x) => `<path d="M${x} ${FLOOR + 2} q-4 -16 -10 -20 M${x} ${FLOOR + 2} q0 -18 -2 -24 M${x} ${FLOOR + 2} q4 -14 10 -20" stroke="#A16207" stroke-width="2" fill="none" stroke-linecap="round"/>`;
const NET_PATH = `M${X.net - 140} ${FLOOR} C${X.net - 152} 80 ${X.net + 162} 80 ${X.net + 150} ${FLOOR}`;

function bg() {
  return `
  ${sky(0, W, 315, 'e111sky')}
  <g transform="translate(240 70)">${sun(24)}</g>
  ${cloud(520, 60, 0.9, 0)}${cloud(980, 48, 0.8, 2)}${cloud(1450, 66, 0.9, 4)}
  <path d="M0 208 Q160 168 360 200 T760 190 T1160 202 T1600 186 V${FLOOR} H0Z" fill="#E9D58A" stroke="${L}" stroke-width="0.8"/>
  <path d="M0 236 Q300 214 640 232 T1600 226 V${FLOOR} H0Z" fill="#D9C26A"/>
  <rect x="0" y="${FLOOR - 4}" width="${W}" height="${315 - FLOOR + 4}" fill="#C9A646" stroke="${L}"/>
  ${Array.from({ length: 24 }, (_, i) => tuft(30 + i * 67)).join('')}
  ${acacia(X.treeA, 1)}
  ${acacia(X.treeB, 0.98, true)}
  <!-- hòn đá, hang chuột -->
  <g transform="translate(${X.hole} ${FLOOR})"><path d="M-70 0 Q-74 -50 -30 -62 Q10 -76 46 -50 Q66 -32 62 0Z" fill="#A8A29E" stroke="${L}" stroke-width="1.2"/>
    <path d="M-40 -46 Q-20 -58 4 -56" stroke="#D6D3D1" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M-20 0 Q-20 -24 0 -24 Q20 -24 20 0Z" fill="#3F3A36" stroke="${L}"/></g>
  ${daisy(X.hole + 108)}${daisy(X.hole + 128, 46)}
  ${bush(80, FLOOR + 4, 0.9, '#65A30D')}${bush(980, FLOOR + 4, 0.8, '#65A30D')}${bush(1540, FLOOR + 4, 0.9, '#65A30D')}
  <!-- dây treo lưới: lúc đầu lưới cuộn tròn treo trên cành, rơi xuống thì dây nối tới đỉnh lưới -->
  <g class="e111-roll"><path d="M${X.net} 88 V110" stroke="#A16207" stroke-width="2.4"/>
    <ellipse cx="${X.net + 2}" cy="124" rx="17" ry="15" fill="#D97706" stroke="${L}"/>
    <path d="M${X.net - 12} 114 l24 20 M${X.net - 4} 110 l20 18 M${X.net - 14} 124 l16 14 M${X.net + 14} 113 l-24 22 M${X.net + 18} 124 l-16 14" stroke="#92400E" stroke-width="1.4"/></g>
  <path class="e111-rope" d="M${X.net} 88 L${X.net + 5} 132" stroke="#A16207" stroke-width="2.4"/>`;
}

function fg() {
  const mesh = `<clipPath id="e111clip"><path d="${NET_PATH}Z"/></clipPath>
    <g clip-path="url(#e111clip)">${Array.from({ length: 18 }, (_, i) => `<path d="M${X.net - 300 + i * 34} ${FLOOR} l172 -172 M${X.net - 300 + i * 34} 110 l172 172" stroke="#B45309" stroke-width="2"/>`).join('')}</g>
    <path d="${NET_PATH}" stroke="#92400E" stroke-width="3.4" fill="none"/>`;
  const cut = (i, x, y) => `<g class="e111-cut e111-cut${i}"><path d="M${x - 7} ${y - 6} l5 4 M${x + 7} ${y - 6} l-5 4 M${x - 6} ${y + 7} l4 -5" stroke="#78350F" stroke-width="2" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="7" fill="#C9A646"/></g>`;
  return `
  ${Array.from({ length: 9 }, (_, i) => tuft(60 + i * 180)).join('')}
  <!-- lưới -->
  <g class="e111-netpile"><path d="M${X.net - 160} ${FLOOR + 2} Q${X.net - 130} ${FLOOR - 14} ${X.net - 92} ${FLOOR + 2}Z" fill="#B45309" stroke="${L}"/>
    <path d="M${X.net - 152} ${FLOOR - 2} l12 -8 M${X.net - 138} ${FLOOR - 1} l14 -9 M${X.net - 120} ${FLOOR} l12 -9" stroke="#78350F" stroke-width="1.4"/></g>
  <g class="e111-net"><g class="e111-netin">${mesh}</g></g>
  ${cut(1, X.net - 130, 266)}${cut(2, X.net - 128, 246)}${cut(3, X.net - 122, 226)}
  <!-- nhãn -->
  <g class="e111-lb e111-lb-lion">${label(X.lion, 128, 'lion', '#B45309', 22)}</g>
  <g class="e111-lb e111-lb-big">${label(X.lion - 90, 122, 'big', '#DC2626', 20)}</g>
  <g class="e111-lb e111-lb-strong">${label(X.lion + 60, 122, 'strong', '#1D4ED8', 20)}</g>
  <g class="e111-lb e111-lb-mouse">${label(450, 196, 'mouse', '#57534E', 18)}</g>
  <g class="e111-lb e111-lb-small">${label(450, 196, 'small', '#16A34A', 18)}</g>
  <g class="e111-lb e111-lb-small2">${label(560, 200, 'small', '#16A34A', 18)}</g>
  <g class="e111-lb e111-lb-kind">${label(X.lion - 60, 126, 'kind', '#DB2777', 20)}</g>
  <g class="e111-lb e111-lb-now">${label(X.net - 40, 104, 'Now', '#EA580C', 20)}</g>
  <g class="e111-lb e111-lb-free">${label(X.net, 116, 'free!', '#16A34A', 22)}</g>
  <g class="e111-lb e111-lb-cant"><g transform="translate(${X.net + 60} 120)"><circle r="15" fill="#fff" stroke="#DC2626" stroke-width="3"/><path d="M-7 -7 L7 7 M7 -7 L-7 7" stroke="#DC2626" stroke-width="3.4" stroke-linecap="round"/></g></g>
  <g class="e111-lb e111-lb-spk">${speaker(520, 222, 'the mouse', '#57534E')}</g>
  <g class="e111-ha"><text class="e111-ha1" x="${X.lion - 70}" y="150" ${'font-family="Nunito, sans-serif" font-weight="900"'} font-size="20" fill="#EA580C">HA</text>
    <text class="e111-ha2" x="${X.lion - 20}" y="136" font-family="Nunito, sans-serif" font-weight="900" font-size="24" fill="#EA580C">HA</text></g>`;
}

const CSS = `
.e111-lb { opacity: 0; transition: opacity .3s; }
${['lion', 'big', 'strong', 'mouse', 'small', 'small2', 'kind', 'now', 'free', 'cant', 'spk'].map((k) => `.st-lb-${k} .e111-lb-${k}`).join(', ')} { opacity: 1; }
.st-lb-spk .e111-lb-spk { animation: e111Pulse .4s ease-in-out 3 alternate; transform-box: fill-box; transform-origin: 50% 100%; }
@keyframes e111Pulse { to { transform: scale(1.15); } }
.e111-net { transform: translateY(-190px); opacity: 0; transition: transform .45s cubic-bezier(.5,0,.8,.6), opacity .2s; }
.st-net .e111-net { transform: none; opacity: 1; }
.st-free .e111-net { transform: translate(-60px, 110px) scale(.5, .1); opacity: 0; transition: transform .6s ease-in, opacity .6s; }
.e111-rope { opacity: 0; transition: opacity .2s .3s; }
.st-net .e111-rope { opacity: 1; }
.st-net .e111-roll { opacity: 0; transition: opacity .15s; }
.st-free .e111-rope { opacity: 0; transition: opacity .4s; }
.e111-netpile { opacity: 0; transition: opacity .4s .3s; }
.st-free .e111-netpile { opacity: 1; }
.st-shake .e111-netin { animation: e111Shake .14s linear infinite alternate; }
@keyframes e111Shake { from { transform: translateX(-3px); } to { transform: translateX(3px); } }
.e111-cut { opacity: 0; transition: opacity .2s; }
.st-cut1 .e111-cut1, .st-cut2 .e111-cut2, .st-cut3 .e111-cut3 { opacity: 1; }
.st-free .e111-cut { opacity: 0; }
.e111-ha text { opacity: 0; }
.st-ha .e111-ha1 { animation: e111Ha 1.1s ease-out infinite; }
.st-ha .e111-ha2 { animation: e111Ha 1.1s ease-out .45s infinite; }
@keyframes e111Ha { 0% { opacity: 0; transform: translateY(8px); } 25% { opacity: 1; } 100% { opacity: 0; transform: translateY(-22px); } }
/* chuột */
.e111-marm, .e111-mej, .e111-mmo { display: none; }
.m-beg .e111-marm, .m-joy .e111-mej { display: inline; }
.m-joy .e111-meo { display: none; }
.e111-mpose { transition: transform .3s; }
.m-beg .e111-mpose { transform: rotate(-34deg); }
.is-talk .e111-mmo { display: inline; animation: e111Talk .26s steps(1) infinite; }
@keyframes e111Talk { 50% { opacity: 0; } }
.es-thing.is-walk .e111-mlA { animation: e111Leg .12s linear infinite alternate; }
.es-thing.is-walk .e111-mlB { animation: e111Leg .12s linear infinite alternate-reverse; }
@keyframes e111Leg { from { transform: translateX(-2.4px); } to { transform: translateX(2.4px); } }
.es-thing.is-walk .e111-mbob { animation: e111MBob .12s ease-in-out infinite alternate; }
@keyframes e111MBob { to { transform: translateY(-2px); } }
.e111-mtail { animation: e111Tail 1.6s ease-in-out infinite alternate; transform-origin: -12px -8px; }
@keyframes e111Tail { to { transform: rotate(14deg); } }
.act-shake .e111-mbob { animation: e111Shiv .07s linear infinite alternate; }
@keyframes e111Shiv { from { transform: translateX(-1.4px); } to { transform: translateX(1.4px); } }
.act-bite .e111-mhead { animation: e111Bite .16s ease-in-out infinite alternate; }
.act-bite .e111-mmo { display: inline; }
@keyframes e111Bite { from { transform: rotate(-8deg); } to { transform: rotate(10deg) translateX(1.5px); } }
.act-bow .e111-mhead { animation: e111Bow .45s ease-in-out 2 alternate; }
@keyframes e111Bow { to { transform: rotate(24deg); } }
.act-hop .e111-mbob { animation: e111Hop .3s ease-out infinite alternate; }
@keyframes e111Hop { to { transform: translateY(-8px); } }
@media (prefers-reduced-motion: reduce) {
  .st-shake .e111-netin, .act-shake .e111-mbob, .act-bite .e111-mhead, .act-hop .e111-mbob { animation-duration: .5s; }
  .es-thing.is-walk .e111-mlA, .es-thing.is-walk .e111-mlB, .es-thing.is-walk .e111-mbob { animation-duration: .3s; }
}
` + lionCss('e111');

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
/** Chuột chạy lon ton: mỗi bước nhỏ một tiếng tích khẽ. */
const scurry = async (st, x, opt = {}) => {
  const go = st.walk('mouse', x, { speed: 240, follow: false, ...opt });
  let done = false; go.then(() => { done = true; });
  while (!done) { st.sfx('tick', { vol: 0.25, rate: 2 }); await Promise.race([go, st.wait(260)]); }
};
const LIE_NOSE = { x: X.lion - 88 * 1.1, y: FLOOR - 56 * 1.1 };

const BEATS = [
  { key: ['This is a lion'], icon: '🦁', label: 'a lion', async play(st) {
    st.look(X.lion - 40);
    await st.walk('lion', X.lion, { speed: 110, follow: false });
    st.sfx('bump', { vol: 0.5, rate: 0.7 });
    st.set('st-lb-lion'); st.sfx('ding', { vol: 0.4 });
    st.act('lion', 'wag');
    await st.wait(1000);
  } },
  { key: ['big and strong'], icon: '💪', label: 'big and strong', async play(st) {
    st.set('st-lb-lion', false);
    st.set('st-lb-big'); st.sfx('pop', { vol: 0.5, rate: 0.7 });
    st.act('lion', 'strong');
    await st.wait(600);
    st.set('st-lb-strong'); st.sfx('pop', { vol: 0.5 });
    for (let i = 0; i < 2; i++) { await st.wait(350); st.sfx('bump', { vol: 0.6, rate: 0.6 }); }
    await st.wait(500);
  } },
  { key: ['This is a mouse'], icon: '🐭', label: 'a mouse', async play(st) {
    off(st, 'st-lb-big', 'st-lb-strong');
    st.look(470);
    await st.wait(300);
    st.show('mouse', true); st.sfx('pop', { vol: 0.5, rate: 1.6 });
    await scurry(st, 440);
    st.set('st-lb-mouse'); st.sfx('ding', { vol: 0.4, rate: 1.3 });
    await st.wait(700);
  } },
  { key: ['She is small'], icon: '🤏', label: 'small', async play(st) {
    st.set('st-lb-mouse', false);
    st.set('st-lb-small'); st.sfx('pop', { vol: 0.5, rate: 1.8 });
    st.mood('mouse', 'beg');
    await st.wait(500);
    st.act('mouse', 'hop'); st.sfx('tick', { vol: 0.4, rate: 2.2 });
    await st.wait(900);
    st.mood('mouse', 'happy');
  } },
  { key: ['The lion is sleeping under a tree'], icon: '😴', label: 'sleeping', async play(st) {
    st.set('st-lb-small', false);
    st.look(X.lion - 60);
    st.dog('lion', 'sit'); st.mood('lion', 'sleep');
    await st.wait(700);
    st.fx('zzz', X.lion - 50, FLOOR - 120);
    await st.wait(1300);
  } },
  { key: ['The mouse is running on his nose'], icon: '👃', label: 'on his nose', async play(st) {
    st.look(X.lion - 90);
    await scurry(st, LIE_NOSE.x - 30);
    await scurry(st, LIE_NOSE.x + 24, { y: LIE_NOSE.y + 2 });
    await scurry(st, LIE_NOSE.x + 46, { y: LIE_NOSE.y - 14 });
    await scurry(st, LIE_NOSE.x + 20, { y: LIE_NOSE.y + 2 });
  } },
  { key: ['The lion is angry'], icon: '😠', label: 'angry', async play(st) {
    st.mood('lion', 'angry'); st.sfx('whoosh', { vol: 0.6, rate: 0.7 });
    st.dog('lion', 'stand');
    st.mood('mouse', 'wow');
    await scurry(st, 520, { y: FLOOR });
    st.face('mouse', 1);
    st.sfx('bump', { vol: 0.7, rate: 0.6 });
    st.act('mouse', 'shake');
    await st.wait(900);
  } },
  { key: ['I can eat you'], icon: '😮', label: 'I can eat you!', async play(st) {
    st.act('mouse', 'shake');
    st.act('lion', 'roar');
    st.sfx('wind', { vol: 0.7, rate: 0.75 });
    await st.say('lion', 'I can eat you!', 1800);
    st.act('lion', null);
  } },
  { key: ["Please don't eat me"], icon: '🙏', label: "Please don't!", async play(st) {
    st.mood('mouse', 'beg');
    await st.wait(200);
    st.sfx('pop', { vol: 0.4, rate: 1.6 });
    await st.say('mouse', "Please don't eat me!", 1900);
  } },
  { key: ['says the mouse'], icon: '🗣️', label: 'says the mouse', async play(st) {
    st.mood('mouse', 'happy');
    st.set('st-lb-spk'); st.sfx('ding', { vol: 0.4, rate: 1.4 });
    await st.wait(300);
    st.act('mouse', 'bow');
    await st.wait(1100);
  } },
  { key: ['I can help you'], icon: '🤝', label: 'I can help you', async play(st) {
    st.set('st-lb-spk', false);
    st.mood('mouse', 'beg');
    const say = st.say('mouse', 'I can help you.', 1800);
    await st.wait(500);
    st.fx('sparkle', 525, FLOOR - 50);
    await say;
    st.mood('mouse', 'happy');
  } },
  { key: ['The lion is laughing'], icon: '😆', label: 'laughing', async play(st) {
    st.mood('lion', 'laugh'); st.act('lion', 'laugh');
    st.set('st-ha');
    st.sfx('giggle', { vol: 0.6, rate: 0.6 });
    await st.wait(1000);
    st.sfx('giggle', { vol: 0.5, rate: 0.55 });
    await st.wait(900);
    st.set('st-ha', false);
  } },
  { key: ['You are small'], icon: '🐁', label: 'You are small', async play(st) {
    st.mood('lion', 'happy');
    st.set('st-lb-small2'); st.sfx('pop', { vol: 0.5, rate: 1.4 });
    await st.say('lion', 'You are small.', 1600);
  } },
  { key: ["You can't help me"], icon: '🙅', label: "You can't help me!", async play(st) {
    st.set('st-lb-small2', false);
    st.act('lion', 'no');
    const say = st.say('lion', "You can't help me!", 1900);
    await st.wait(300); st.sfx('buzz-no', { vol: 0.5 });
    await say;
    st.act('lion', null);
  } },
  { key: ['But he is kind'], icon: '💛', label: 'kind', async play(st) {
    st.mood('lion', 'joy');
    st.set('st-lb-kind');
    await st.wait(300);
    st.fx('hearts', X.lion - 70, FLOOR - 120);
    st.mood('mouse', 'joy');
    await st.wait(1500);
  } },
  { key: ['The mouse can go'], icon: '🏃', label: 'can go', async play(st) {
    st.set('st-lb-kind', false);
    st.mood('lion', 'happy');
    st.look(560);
    await scurry(st, X.hole + 4);
    st.face('mouse', 1); st.mood('mouse', 'joy'); st.act('mouse', 'hop'); st.sfx('pop', { vol: 0.4, rate: 1.8 });
    await st.wait(700);
    st.show('mouse', false); st.sfx('whoosh', { vol: 0.3, rate: 1.6 });
    await st.wait(400);
  } },
  { key: ['Now the lion is in a net'], icon: '🕸️', label: 'in a net', async play(st) {
    st.mood('lion', 'happy');
    st.set('st-lb-now'); st.sfx('ding', { vol: 0.4 });
    await st.walk('lion', X.net, { speed: 200, follow: true });
    st.set('st-lb-now', false);
    st.set('st-net'); st.sfx('whoosh', { vol: 0.7 });
    await st.wait(450);
    st.sfx('bump', { vol: 0.8, rate: 0.7 }); st.mood('lion', 'sad');
    await st.wait(900);
  } },
  { key: ["He can't get out"], icon: '😣', label: "can't get out", async play(st) {
    st.look(X.net);
    st.act('lion', 'struggle'); st.set('st-shake');
    for (let i = 0; i < 3; i++) { st.sfx('bump', { vol: 0.5, rate: 0.8 + i * 0.1 }); await st.wait(380); }
    st.set('st-lb-cant'); st.sfx('buzz-no', { vol: 0.5 });
    await st.wait(700);
    st.act('lion', null); st.set('st-shake', false);
  } },
  { key: ['The mouse is biting the net', 'her small teeth'], icon: '🦷', label: 'biting the net', async play(st) {
    st.set('st-lb-cant', false);
    st.place('mouse', X.net - 400, FLOOR, 1); st.show('mouse', true); st.mood('mouse', 'happy');
    st.look(X.net - 60);
    await scurry(st, X.net - 160);
    st.act('mouse', 'bite');
    for (let i = 1; i <= 3; i++) {
      st.sfx('crunch', { vol: 0.6, rate: 1.3 });
      await st.wait(520);
      st.set(`st-cut${i}`);
    }
    await st.wait(300);
    st.act('mouse', null);
  } },
  { key: ['The lion is free'], icon: '🎉', label: 'free', async play(st) {
    st.look(X.net - 20);
    st.set('st-free'); st.sfx('whoosh', { vol: 0.5 });
    st.mood('lion', 'joy'); st.mood('mouse', 'joy');
    await st.wait(500);
    st.set('st-lb-free'); st.fx('sparkle', X.net, FLOOR - 120);
    st.act('lion', 'wag');
    await st.wait(1200);
  } },
  { key: ['Thank you, friend'], icon: '🤗', label: 'Thank you, friend!', async play(st) {
    st.set('st-lb-free', false);
    st.face('lion', -1);
    await st.wait(300);
    const say = st.say('lion', 'Thank you, friend!', 2000);
    await st.wait(500);
    await scurry(st, X.net - 76, { y: FLOOR - 118 });
    st.act('mouse', 'hop');
    st.fx('hearts', X.net - 70, FLOOR - 150);
    await say;
  } },
];

export default {
  id: 'en111', worldW: W, floor: FLOOR, viewTop: 40, camStart: X.lion - 340, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  order: [0, 4, 6, 14, 16, 18],
  cast: [
    { id: 'lion', kind: 'thing', x: X.lion + 300, s: 1.1, face: -1, svg: lionSvg('e111'), box: LION_BOX },
    { id: 'mouse', kind: 'thing', x: X.hole, s: 1.6, face: 1, svg: MOUSE, box: MOUSE_BOX },
  ],
  init(st) { st.show('mouse', false); },
};
