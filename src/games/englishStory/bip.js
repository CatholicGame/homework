/**
 * Bíp (Bip) và phi thuyền của bạn ấy: dùng chung cho bộ 👽 "Bạn từ hành tinh khác" (bài 101–110), nét vẽ riêng cùng kiểu kit.js
 * (viền nâu L, màu phẳng tươi). Bíp: cậu bé hành tinh Lumo, thấp hơn Minh (đỉnh đầu y = -93, đầu râu -110; Minh đỉnh đầu ~ -120), da xanh lá,
 * ba mắt, hai râu đầu tròn (sáng lên khi vui), bộ đồ tím có huy hiệu hai mặt trời. Không bước chân: đi = lơ lửng nhún nhẹ.
 *
 * CÁCH DÙNG (trong stories/enNNN.js):
 *   import { BIP_SVG, BIP_BOX, BIP_CSS, SHIP_SVG, SHIP_BOX, bipSet } from '../bip.js';
 *   css: KIT_CSS + BIP_CSS + CSS,
 *   cast: [ { id: 'bip', kind: 'thing', svg: BIP_SVG, box: BIP_BOX, x: 400, face: -1 },
 *           { id: 'ship', kind: 'thing', svg: SHIP_SVG, box: SHIP_BOX, x: 600 } ],
 *   init(st) { bipSet(st, 'ship', 'ship-broken'); }
 *
 * Bíp
 * - st.walk('bip', x) → class is-walk (sân khấu tự thêm): đổi sang dáng nghiêng, bay là là, nhún, râu đung đưa.
 *   Quay trái thì sân khấu lật hình như người.
 * - st.mood('bip', 'happy' | 'joy' | 'wow' | 'shut' | 'sad' | 'cry'), st.talk / st.say: dùng chung nét mặt pp-face (chớp mắt khi happy).
 *   joy thì râu tự sáng.
 * - Hành động lặp st.act('bip', …): 'wave' (vẫy tay phải), 'jump' (nhảy tại chỗ), 'hover' (lơ lửng tại chỗ), 'dance' (lắc lư), 'look' (ngó quanh).
 * - Trạng thái giữ lâu (bipSet(st, 'bip', tên, on)): 'bip-glow' (râu sáng), 'bip-sad' (râu cụp), 'bip-wave', 'bip-jump',
 *   'bip-hover' (như act nhưng không tự tắt khi sang nhịp sau).
 *
 * Phi thuyền (SHIP_SVG, gốc = giữa đáy chân, rộng ~150, cao ~80):
 * - bipSet(st, 'ship', 'ship-broken'): nghiêng, khói bốc, vết nứt, dây điện toé lửa, một đèn đỏ nhấp nháy.
 * - 'ship-fixed': đứng thẳng, miếng vá, đèn chạy vòng đủ màu. 'ship-fly': lơ lửng (chân thu), luồng sáng dưới đáy.
 *   Bay đi: bipSet(st, 'ship', 'ship-fly') rồi st.walk('ship', x, { y: -200, speed: 160 }).
 * - Cũng vẽ được trong bg() (vd. `<g transform="translate(600 282)">${SHIP_SVG}</g>`), class đặt trên <svg> nền bằng st.set('ship-broken').
 * - Bíp ngồi trong phi thuyền: SHIP_SVG có nhóm .ship-pilot (đầu Bíp sau kính) ẩn sẵn; bipSet(st, 'ship', 'ship-pilot') để hiện.
 */
import { L } from './kit.js';

const SKIN = '#86E05A', SKIN_D = '#5BB83A', SUIT = '#8B5CF6', SUIT_D = '#6D28D9', SUIT_L = '#C4B5FD', BOOT = '#CBD5E1';
// Tiền tố chọn: thắng luật chung `.es-ac g { transform-origin: 0 0 }`, và vẫn chạy khi vẽ trong <svg> nền
const P = ':is(.es-ac, svg)';

export const BIP_BOX = [-40, -114, 80, 118];

/** Râu (gốc ở chân râu trên đỉnh đầu), dir = -1 trái / 1 phải. */
const antenna = (dir, cls) => `<g class="${cls}"><path d="M0 0 Q${dir * 2} -10 ${dir * 9} -18" stroke="${SKIN_D}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
  <circle class="bip-halo" cx="${dir * 10}" cy="-21" r="9" fill="#FDE047"/>
  <circle class="bip-bulb" cx="${dir * 10}" cy="-21" r="5" stroke="${L}" stroke-width="1"/></g>`;

/** Mặt nhìn trước (gốc ở tâm đầu): mắt trái (-14, 0), giữa (0, -10), phải (14, 0). */
const EYES = [[-14, 0, 7], [0, -10, 6], [14, 0, 7]];
const pupils = (r = 3.2, dy = 1) => EYES.map(([x, y]) => `<circle cx="${x}" cy="${y + dy}" r="${r}" fill="#1F2937"/><circle cx="${x + 1.2}" cy="${y + dy - 1.3}" r="${r * 0.32}" fill="#fff"/>`).join('');
const lids = EYES.map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r + 0.8}" ry="${r + 1.2}" fill="${SKIN}"/>`).join('');
const FACE = `
  <g class="pp-face f-happy">${pupils()}<path d="M-8 13 Q0 20 8 13" stroke="${L}" stroke-width="2" fill="none" stroke-linecap="round"/></g>
  <g class="pp-face f-shut">${lids}${EYES.map(([x, y]) => `<path d="M${x - 5} ${y + 1} Q${x} ${y + 4} ${x + 5} ${y + 1}" stroke="${L}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`).join('')}
    <path d="M-8 13 Q0 20 8 13" stroke="${L}" stroke-width="2" fill="none" stroke-linecap="round"/></g>
  <g class="pp-face f-joy">${lids}${EYES.map(([x, y]) => `<path d="M${x - 5} ${y + 2} Q${x} ${y - 5} ${x + 5} ${y + 2}" stroke="${L}" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}
    <path d="M-9 11 Q0 12 9 11 Q8 22 0 22 Q-8 22 -9 11Z" fill="#7F1D1D" stroke="${L}" stroke-width="1"/><ellipse cx="0" cy="19" rx="4.4" ry="2.4" fill="#F87171"/></g>
  <g class="pp-face f-wow">${pupils(4.3, 0)}<ellipse cx="0" cy="16" rx="4" ry="5" fill="#7F1D1D" stroke="${L}" stroke-width="1"/></g>
  <g class="pp-face f-sad">${pupils(3, 2)}<path d="M-20 -9 L-9 -6 M20 -9 L9 -6" stroke="${L}" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M-7 17 Q0 11 7 17" stroke="${L}" stroke-width="2" fill="none" stroke-linecap="round"/></g>
  <g class="pp-face f-cry">${pupils(3, 2)}<path d="M-20 -9 L-9 -6 M20 -9 L9 -6" stroke="${L}" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M-7 17 Q0 11 7 17" stroke="${L}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path class="bip-tear" d="M-16 9 q-3 5 0 7 q3 -2 0 -7Z M16 9 q-3 5 0 7 q3 -2 0 -7Z" fill="#60A5FA" stroke="#2563EB" stroke-width="0.6"/></g>
  <g class="pp-face f-talk"><ellipse cx="0" cy="15" rx="5.4" ry="4.2" fill="#7F1D1D" stroke="${L}" stroke-width="1"/></g>`;

/** Tay (gốc ở vai, buông xuống), class để xoay. */
const arm = (cls, c = SUIT) => `<g class="${cls}"><rect x="-4.5" y="-2" width="9" height="20" rx="4.5" fill="${c}" stroke="${L}" stroke-width="1"/>
  <circle cx="0" cy="21" r="5" fill="${SKIN}" stroke="${L}" stroke-width="1"/><g class="bip-hand" transform="translate(0 21)"></g></g>`;
/** Huy hiệu hai mặt trời Lumo. */
const BADGE = `<circle r="6.4" fill="#fff" stroke="${L}" stroke-width="0.9"/><circle cx="-2" cy="1" r="2.3" fill="#FB923C"/><circle cx="2.4" cy="-1.6" r="1.7" fill="#FACC15"/>`;

const FRONT = `<g class="bip-front">
  <g class="bip-legL"><rect x="-15" y="-21" width="10" height="17" rx="4" fill="${SUIT_D}" stroke="${L}" stroke-width="1"/><ellipse cx="-10" cy="-3.5" rx="8" ry="4" fill="${BOOT}" stroke="${L}" stroke-width="1"/></g>
  <g class="bip-legR"><rect x="5" y="-21" width="10" height="17" rx="4" fill="${SUIT_D}" stroke="${L}" stroke-width="1"/><ellipse cx="10" cy="-3.5" rx="8" ry="4" fill="${BOOT}" stroke="${L}" stroke-width="1"/></g>
  <g transform="translate(-18 -53)">${arm('bip-armL')}</g>
  <path d="M-19 -18 Q-23 -48 -13 -58 H13 Q23 -48 19 -18 Q0 -13 -19 -18Z" fill="${SUIT}" stroke="${L}" stroke-width="1.2"/>
  <rect x="-20" y="-28" width="40" height="6" fill="#FDE047" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(0 -42)">${BADGE}</g>
  <ellipse cx="0" cy="-58" rx="13" ry="3.6" fill="${SUIT_L}" stroke="${L}" stroke-width="0.9"/>
  <g transform="translate(18 -53)">${arm('bip-armR')}</g>
  <g transform="translate(0 -89)"><g class="bip-head">
    <g transform="translate(-10 -24)">${antenna(-1, 'bip-antL')}</g><g transform="translate(10 -24)">${antenna(1, 'bip-antR')}</g>
    <ellipse cx="-31" cy="2" rx="4" ry="7" fill="${SKIN_D}" stroke="${L}" stroke-width="1"/><ellipse cx="31" cy="2" rx="4" ry="7" fill="${SKIN_D}" stroke="${L}" stroke-width="1"/>
    <ellipse rx="31" ry="27" fill="${SKIN}" stroke="${L}" stroke-width="1.3"/>
    <path d="M-18 -18 Q-6 -25 6 -23" stroke="#C6F6A8" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.8"/>
    <ellipse cx="-22" cy="10" rx="5" ry="3" fill="#F9A8D4" opacity="0.6"/><ellipse cx="22" cy="10" rx="5" ry="3" fill="#F9A8D4" opacity="0.6"/>
    ${EYES.map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r + 0.6}" fill="#fff" stroke="${L}" stroke-width="1"/>`).join('')}
    ${FACE}<g class="bip-hat"></g></g></g></g>`;

/** Dáng nghiêng (nhìn sang phải): chân thu lại vì đang bay, tay gần vung nhẹ, hai mắt thấy được (trước và giữa). */
const SIDE = `<g class="bip-side">
  <g transform="translate(-4 -20)"><g class="bip-sleg"><rect x="-5" y="-2" width="10" height="13" rx="4" fill="#5B21B6" stroke="${L}" stroke-width="1"/><ellipse cx="3" cy="11" rx="7.5" ry="3.6" fill="#94A3B8" stroke="${L}" stroke-width="1"/></g></g>
  <g transform="translate(-2 -53)">${arm('bip-sarmB', '#6D28D9')}</g>
  <g transform="translate(5 -20)"><g class="bip-sleg2"><rect x="-5" y="-2" width="10" height="13" rx="4" fill="${SUIT_D}" stroke="${L}" stroke-width="1"/><ellipse cx="3" cy="11" rx="7.5" ry="3.6" fill="${BOOT}" stroke="${L}" stroke-width="1"/></g></g>
  <path d="M-15 -18 Q-19 -48 -10 -58 H10 Q19 -48 15 -18 Q0 -13 -15 -18Z" fill="${SUIT}" stroke="${L}" stroke-width="1.2"/>
  <rect x="-16" y="-28" width="32" height="6" fill="#FDE047" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(8 -42) scale(0.8)">${BADGE}</g>
  <g transform="translate(1 -53)">${arm('bip-sarm')}</g>
  <g transform="translate(2 -89)"><g class="bip-head">
    <g transform="translate(-8 -24)"><g class="bip-santB">${antenna(-1, 'bip-antL')}</g></g><g transform="translate(4 -25)"><g class="bip-sant">${antenna(-1, 'bip-antR')}</g></g>
    <ellipse cx="-24" cy="2" rx="5" ry="8" fill="${SKIN_D}" stroke="${L}" stroke-width="1"/>
    <ellipse rx="29" ry="27" fill="${SKIN}" stroke="${L}" stroke-width="1.3"/>
    <path d="M-14 -20 Q-2 -26 10 -22" stroke="#C6F6A8" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.8"/>
    <ellipse cx="14" cy="11" rx="4.5" ry="2.8" fill="#F9A8D4" opacity="0.6"/>
    <ellipse cx="18" cy="0" rx="5.2" ry="7.4" fill="#fff" stroke="${L}" stroke-width="1"/><circle class="bip-seye" cx="20.5" cy="1" r="3" fill="#1F2937"/>
    <ellipse cx="9" cy="-11" rx="4.6" ry="6.4" fill="#fff" stroke="${L}" stroke-width="1"/><circle class="bip-seye" cx="11.4" cy="-10" r="2.6" fill="#1F2937"/>
    <path d="M17 14 Q22 17 26 12" stroke="${L}" stroke-width="2" fill="none" stroke-linecap="round"/><g class="bip-hat bip-hat-side"></g></g></g></g>`;

export const BIP_SVG = `<g class="bip" transform="scale(0.8)">
  <ellipse class="bip-shadow" cx="0" cy="0" rx="22" ry="4" fill="#000" opacity="0.14"/>
  <ellipse class="bip-jet" cx="0" cy="-1" rx="17" ry="4.5" fill="#A5F3FC"/>
  <g class="bip-body">${FRONT}${SIDE}</g></g>`;
/** Toạ độ để chỉ vào Bíp (dáng nhìn trước, gốc = chân, s = 1): tâm đầu, ba mắt, hai đầu râu. Nhân với s của cast. */
export const BIP_AT = { head: [0, -71], eyes: [[-11.2, -71.2], [0, -79.2], [11.2, -71.2]], bulbs: [[-16, -107], [16, -107]], top: -93 };

// ── Phi thuyền ────────────────────────────────────────────────────────────
export const SHIP_BOX = [-85, -86, 170, 90];
const LIGHTS = [-56, -38, -19, 0, 19, 38, 56];
export const SHIP_SVG = `<g class="ship"><ellipse class="ship-shadow" cx="0" cy="0" rx="60" ry="5" fill="#000" opacity="0.14"/>
  <g class="ship-wrap">
  <path class="ship-beam" d="M-30 -20 L-58 0 H58 L30 -20Z" fill="#FEF9C3"/>
  <g class="ship-legs"><path d="M-36 -20 L-50 -2 M36 -20 L50 -2" stroke="#64748B" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="-51" cy="-1.5" rx="8" ry="2.6" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/><ellipse cx="51" cy="-1.5" rx="8" ry="2.6" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/></g>
  <ellipse cx="0" cy="-22" rx="40" ry="8" fill="#64748B" stroke="${L}" stroke-width="1"/>
  <g class="ship-pilot"><g transform="translate(0 -54) scale(0.72)"><ellipse rx="31" ry="27" fill="${SKIN}" stroke="${L}" stroke-width="1.6"/>
    ${EYES.map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r + 0.6}" fill="#fff" stroke="${L}" stroke-width="1.2"/>`).join('')}${pupils()}
    <path d="M-8 13 Q0 20 8 13" stroke="${L}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M-10 -24 Q-12 -34 -20 -40 M10 -24 Q12 -34 20 -40" stroke="${SKIN_D}" stroke-width="3.4" fill="none"/><circle class="bip-bulb" cx="-20" cy="-41" r="5"/><circle class="bip-bulb" cx="20" cy="-41" r="5"/></g></g>
  <path d="M-33 -38 Q-31 -80 0 -80 Q31 -80 33 -38Z" fill="#A5F3FC" opacity="0.5" stroke="${L}" stroke-width="1.2"/>
  <path d="M-20 -50 Q-19 -68 -6 -73" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.8"/>
  <ellipse cx="0" cy="-31" rx="74" ry="15" fill="#CBD5E1" stroke="${L}" stroke-width="1.3"/>
  <path d="M-73 -29 Q0 -12 73 -29" stroke="#94A3B8" stroke-width="5" fill="none"/>
  <ellipse cx="0" cy="-39" rx="36" ry="6" fill="#E2E8F0" stroke="${L}" stroke-width="1"/>
  ${LIGHTS.map((x, i) => `<circle class="ship-light" style="--i:${i}" cx="${x}" cy="${-27 + Math.abs(x) * 0.07}" r="4" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <g class="ship-dmg"><path d="M22 -38 l6 6 l-4 4 l7 7" stroke="#334155" stroke-width="1.8" fill="none" stroke-linejoin="round"/>
    <path d="M-50 -24 q-6 8 -2 14 q4 5 -2 10" stroke="#1F2937" stroke-width="1.6" fill="none"/>
    <g class="ship-spark" transform="translate(-52 0)"><path d="M0 -6 L2 -2 L6 -3 L3 0 L5 4 L0 2 L-5 4 L-3 0 L-6 -3 L-2 -2Z" fill="#FDE047" stroke="#F59E0B" stroke-width="0.6"/></g></g>
  <g class="ship-patch" transform="translate(26 -30) rotate(-10)"><rect x="-9" y="-5" width="18" height="10" rx="2" fill="#FDBA74" stroke="${L}" stroke-width="0.8"/>
    <path d="M-5 -5 V5 M5 -5 V5" stroke="#C2410C" stroke-width="0.8" stroke-dasharray="1.5 1.5"/></g>
  <g class="ship-smoke" transform="translate(30 -42)">${[0, 1, 2].map((i) => `<circle class="ship-puff" style="--i:${i}" r="${8 + i * 1.5}" fill="#64748B" stroke="#475569" stroke-width="0.8"/>`).join('')}</g>
  </g></g>`;

/** Đồ cầm ở tay phải của Bíp (svg gốc = bàn tay, tay buông thì +y hướng xuống, giống props của rig.js); null = bỏ. */
export function bipHold(st, id, svg) {
  st.a(id).inner.querySelectorAll('.bip-armR .bip-hand, .bip-sarm .bip-hand').forEach((g) => { g.innerHTML = svg || ''; });
}
/** Mũ / đồ đội đầu: front = hình nhìn trước (gốc = tâm đầu, đỉnh đầu y = -27, đầu rộng ±31), side = dáng nghiêng
 *  (nhìn sang phải, gốc = tâm đầu); null = bỏ. Râu vẽ trước nên mũ che râu; muốn râu thò lên thì thêm bipSet(st, id, 'bip-antup'). */
export function bipHat(st, id, front, side = front) {
  const A = st.a(id);
  A.inner.querySelectorAll('.bip-hat').forEach((g) => { g.innerHTML = (g.classList.contains('bip-hat-side') ? side : front) || ''; });
}

/** Bật / tắt một class trạng thái trên nhân vật (Bíp hoặc phi thuyền); nhảy câu (instant) thì đổi ngay, không chuyển tiếp. */
export function bipSet(st, id, name, on = true) {
  const A = st.a(id);
  A.el.classList.toggle(name, on);
  if (st.instant) st.snap(A.el);
}

export const BIP_CSS = `
${P} .bip-side { display: none; }
.is-walk .bip-side { display: inline; }
.is-walk .bip-front { display: none; }
${P} .bip-body { transition: translate .4s ease-out; }
${P} .bip-jet { opacity: 0; transition: opacity .3s; }
${P} .bip-shadow { transform-box: fill-box; transform-origin: center; transition: scale .4s; }
/* Bay là là khi đi / lơ lửng */
.is-walk .bip-body, .act-hover .bip-body, .bip-hover .bip-body { animation: bipHover .55s ease-in-out infinite alternate; }
.is-walk .bip-jet, .act-hover .bip-jet, .bip-hover .bip-jet { opacity: .75; animation: bipJet .28s ease-in-out infinite alternate; }
.is-walk .bip-shadow, .act-hover .bip-shadow, .bip-hover .bip-shadow { scale: .75; }
@keyframes bipHover { from { translate: 0 -7px; } to { translate: 0 -12px; } }
@keyframes bipJet { from { opacity: .45; } to { opacity: .85; } }
${P} .bip-jet { transform-box: fill-box; transform-origin: center; }
${P} .bip-sleg { rotate: 28deg; } ${P} .bip-sleg2 { rotate: 18deg; }
${P} .bip-sarm { rotate: 20deg; } ${P} .bip-sarmB { rotate: -10deg; }
.is-walk .bip-sarm { animation: bipSwing .55s ease-in-out infinite alternate; }
@keyframes bipSwing { from { rotate: 30deg; } to { rotate: 5deg; } }
/* Râu: gốc ở chân râu; đung đưa khi bay */
${P} .bip-antL, ${P} .bip-antR { transition: rotate .4s; }
.is-walk .bip-sant, .is-walk .bip-santB { animation: bipAnt .55s ease-in-out infinite alternate; }
.is-walk .bip-santB { animation-delay: -.2s; }
@keyframes bipAnt { from { rotate: -8deg; } to { rotate: 10deg; } }
${P} .bip-bulb { fill: #D9F99D; transition: fill .3s; }
${P} .bip-halo { opacity: 0; transition: opacity .3s; transform-box: fill-box; transform-origin: center; }
.bip-glow .bip-bulb, .m-joy .bip-bulb, .ship-pilot .bip-bulb { fill: #FDE047; }
.bip-glow .bip-halo, .m-joy .bip-halo { opacity: .55; animation: bipHalo .7s ease-in-out infinite alternate; }
@keyframes bipHalo { from { scale: .8; opacity: .35; } to { scale: 1.25; opacity: .7; } }
/* Ngạc nhiên: râu dựng; buồn: râu cụp xuống hai bên (buồn thắng) */
.m-wow .bip-front .bip-antL { rotate: 14deg; } .m-wow .bip-front .bip-antR { rotate: -14deg; }
.bip-sad .bip-front .bip-antL, .m-sad .bip-front .bip-antL, .m-cry .bip-front .bip-antL { rotate: -70deg; }
.bip-sad .bip-front .bip-antR, .m-sad .bip-front .bip-antR, .m-cry .bip-front .bip-antR { rotate: 70deg; }
.bip-sad .bip-side .bip-antL, .bip-sad .bip-side .bip-antR, .m-sad .bip-side .bip-antR, .m-sad .bip-side .bip-antL { rotate: -60deg; }
.bip-sad .bip-bulb, .m-sad .bip-bulb, .m-cry .bip-bulb { fill: #A3A3A3; }
/* Tay */
${P} .bip-armL { rotate: 14deg; transition: rotate .35s; } ${P} .bip-armR { rotate: -14deg; transition: rotate .35s; }
.act-wave .bip-armR, .bip-wave .bip-armR { animation: bipWave .32s ease-in-out infinite alternate; }
@keyframes bipWave { from { rotate: -165deg; } to { rotate: -125deg; } }
.act-jump .bip-body, .bip-jump .bip-body { animation: bipJump .62s cubic-bezier(.3,0,.5,1) infinite; }
.act-jump .bip-armL, .bip-jump .bip-armL { rotate: 120deg; } .act-jump .bip-armR, .bip-jump .bip-armR { rotate: -120deg; }
.act-jump .bip-shadow, .bip-jump .bip-shadow { animation: bipShadow .62s cubic-bezier(.3,0,.5,1) infinite; }
@keyframes bipJump { 0%, 100% { translate: 0 0; } 45%, 55% { translate: 0 -26px; } }
@keyframes bipShadow { 0%, 100% { scale: 1; } 50% { scale: .6; } }
.act-dance .bip-body { animation: bipDance .5s ease-in-out infinite alternate; }
${P} .bip-body { transform-origin: 0 0; }
@keyframes bipDance { from { rotate: -7deg; } to { rotate: 7deg; } }
.act-dance .bip-armL { rotate: 70deg; } .act-dance .bip-armR { rotate: -70deg; }
.act-look .bip-front .bip-head { animation: bipLook 1.1s ease-in-out infinite alternate; }
@keyframes bipLook { from { rotate: -9deg; } to { rotate: 9deg; } }
.m-cry .bip-tear { animation: bipTear .8s ease-in infinite; }
@keyframes bipTear { from { translate: 0 0; opacity: 1; } to { translate: 0 8px; opacity: 0; } }

/* Ăn (act-eat / bip-eat): tay phải đưa đồ cầm lên miệng; ôm đồ trước bụng (bip-hold); ngồi (bip-sit: đặt y = mặt ghế) */
.act-eat .bip-armR, .bip-eat .bip-armR { animation: bipEat .5s ease-in-out infinite alternate; }
@keyframes bipEat { from { rotate: 70deg; } to { rotate: 128deg; } }
.bip-hold .bip-armL { rotate: -48deg; } .bip-hold .bip-armR { rotate: 48deg; }
${P} .bip-legL, ${P} .bip-legR { transform-origin: 0 -21px; transition: scale .3s; }
${P} .bip-body { transition: translate .4s ease-out; }
.bip-sit .bip-legL, .bip-sit .bip-legR { scale: 1 .5; }
.bip-sit .bip-front { translate: 0 12px; }
/* Râu thò lên trên mũ (bipHat che râu): vẽ râu lần nữa ở trên cùng không làm được bằng CSS, nên chỉ nâng râu lên cao */
.bip-antup .bip-antL, .bip-antup .bip-antR { translate: 0 -10px; }

/* Phi thuyền */
${P} .ship-pilot { translate: 0 22px; transition: opacity .3s, translate .5s cubic-bezier(.3,1.5,.6,1); }
.ship-pilot .ship-pilot { translate: 0 0; }
${P} .ship-wrap { transform-origin: -50px 0; transition: rotate .7s cubic-bezier(.3,1.4,.5,1), translate .7s; }
${P} .ship-beam, ${P} .ship-dmg, ${P} .ship-smoke, ${P} .ship-patch { opacity: 0; transition: opacity .4s; }
${P} .ship-pilot { opacity: 0; }
${P} .ship-light { fill: #64748B; }
.ship-broken .ship-wrap { rotate: -13deg; }
.ship-broken .ship-dmg, .ship-broken .ship-smoke { opacity: 1; }
.ship-broken .ship-light:nth-of-type(3) { animation: shipRed .7s steps(1) infinite; }
@keyframes shipRed { 0% { fill: #EF4444; } 50% { fill: #64748B; } }
.ship-broken .ship-spark { animation: shipSpark .5s steps(1) infinite; }
@keyframes shipSpark { 0% { opacity: 1; } 40% { opacity: 0; } 70% { opacity: .8; } }
${P} .ship-puff { opacity: 0; transform-box: fill-box; transform-origin: center; }
.ship-broken .ship-puff { animation: shipPuff 2.1s ease-out infinite; animation-delay: calc(var(--i) * -.7s); }
@keyframes shipPuff { from { translate: 0 0; scale: .5; opacity: .95; } 60% { opacity: .75; } to { translate: 14px -50px; scale: 1.9; opacity: 0; } }
.ship-fixed .ship-patch, .ship-fly .ship-patch { opacity: 1; }
.ship-pilot .ship-pilot { opacity: 1; }
.ship-fixed .ship-light, .ship-fly .ship-light { animation: shipLights 1.4s steps(1) infinite; animation-delay: calc(var(--i) * -.2s); }
@keyframes shipLights { 0% { fill: #FDE047; } 25% { fill: #F472B6; } 50% { fill: #4ADE80; } 75% { fill: #60A5FA; } }
.ship-fly .ship-legs { opacity: 0; transition: opacity .3s; }
.ship-fly .ship-beam { opacity: .55; }
.ship-fly .ship-wrap { translate: 0 -14px; animation: shipBob 1s ease-in-out infinite alternate; }
.ship-fly .ship-shadow { opacity: .07; }
@keyframes shipBob { from { translate: 0 -12px; } to { translate: 0 -20px; } }
${P} .ship-shadow { transition: opacity .4s; }
@media (prefers-reduced-motion: reduce) {
  .is-walk .bip-body, .act-hover .bip-body, .bip-hover .bip-body { animation-duration: 1.4s; }
  .act-jump .bip-body, .bip-jump .bip-body { animation-duration: 1.1s; }
  .ship-fly .ship-wrap { animation-duration: 2s; }
}
`;
