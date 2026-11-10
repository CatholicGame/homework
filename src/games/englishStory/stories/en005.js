/**
 * Bài 5 "My School Bag": phòng ngủ của Minh (cặp xanh to + bàn học) · phòng khách (Lan với hai hộp đỏ) · bếp (Mẹ, hộp cơm).
 * Minh lấy từng món trong cặp ra bày lên bàn (sách, bút chì, bút mực, thước, tẩy, hộp bút, bút sáp), mỗi nhóm hiện số đếm;
 * rồi xếp lại vào cặp, đeo lên vai, sang chỗ chị Lan, rồi vào bếp nhận hộp cơm của Mẹ.
 * Toạ độ cảnh: rộng 1500, sàn y = 282. Trạng thái cảnh là class st-* trên <svg>; nhãn chữ là st-l-* (mỗi lúc một bộ nhãn).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { L, room, doorway, windowBox, shelf, books, rug, cloud, label, KIT_CSS } from '../kit.js';

const FLOOR = 282;

// Minh mặc đồng phục, cặp của bài này màu xanh dương
Object.assign(CAST, { e005_minh: { ...CAST.en_minh, bag: '#2563EB' } });

// ── Đồ vật (gốc ở giữa đáy, trừ khi ghi khác) ─────────────────────────────
const BOOK1 = (c) => `<rect x="-8" y="-30" width="16" height="30" rx="2" fill="${c}" stroke="${L}"/><rect x="-5" y="-25" width="10" height="7" rx="1" fill="#fff" opacity="0.8"/><path d="M-6 -30 V0" stroke="#fff" stroke-width="1.4" opacity="0.5"/>`;
const PENCIL = `<rect x="-2.6" y="-26" width="5.2" height="26" fill="#FACC15" stroke="${L}" stroke-width="0.8"/><path d="M-2.6 -26 L0 -33 L2.6 -26Z" fill="#FDE68A" stroke="${L}" stroke-width="0.7"/><path d="M-1 -30.4 L0 -33 L1 -30.4Z" fill="#1F2937"/><rect x="-2.6" y="-3" width="5.2" height="3" fill="#F472B6" stroke="${L}" stroke-width="0.6"/>`;
const PEN = `<rect x="-2.4" y="-30" width="4.8" height="30" rx="2" fill="#2563EB" stroke="${L}" stroke-width="0.8"/><rect x="-2.4" y="-30" width="4.8" height="9" rx="2" fill="#1E3A8A"/><path d="M1.6 -28 V-18" stroke="#93C5FD" stroke-width="1"/>`;
const RULER = `<rect x="-4" y="-42" width="8" height="42" rx="1" fill="#FDE047" stroke="${L}" stroke-width="0.8"/>${Array.from({ length: 8 }, (_, i) => `<path d="M-4 ${-38 + i * 5} h${i % 2 ? 2.4 : 4}" stroke="${L}" stroke-width="0.7"/>`).join('')}`;
const ERASER = `<rect x="-10" y="-11" width="20" height="11" rx="2.5" fill="#F9A8D4" stroke="${L}"/><rect x="-10" y="-11" width="8" height="11" rx="2" fill="#60A5FA" stroke="${L}" stroke-width="0.8"/>`;
const CASE = `<rect x="-28" y="-22" width="56" height="22" rx="9" fill="#22C55E" stroke="${L}" stroke-width="1.1"/><path d="M-24 -11 H24" stroke="#15803D" stroke-width="1.6" stroke-dasharray="2 2"/><rect x="18" y="-14" width="7" height="6" rx="1.5" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/>`;
const CRAYON = (c) => `<rect x="-2.6" y="-24" width="5.2" height="24" rx="1" fill="${c}" stroke="${L}" stroke-width="0.7"/><path d="M-2.6 -24 L0 -30 L2.6 -24Z" fill="${c}" stroke="${L}" stroke-width="0.6"/><rect x="-2.6" y="-16" width="5.2" height="7" fill="#fff" opacity="0.55"/>`;
const BIGBAG = `<path d="M-12 -82 Q0 -100 12 -82" stroke="${L}" stroke-width="5" fill="none"/><path d="M-12 -82 Q0 -100 12 -82" stroke="#1E40AF" stroke-width="3" fill="none"/>
  <path d="M-32 0 V-60 Q-32 -82 -12 -84 H12 Q32 -82 32 -60 V0Z" fill="#2563EB" stroke="${L}" stroke-width="1.3"/>
  <path d="M-32 -58 Q0 -66 32 -58" stroke="#1E40AF" stroke-width="2" fill="none"/>
  <rect x="-21" y="-42" width="42" height="32" rx="8" fill="#3B82F6" stroke="${L}"/><path d="M-21 -32 H21" stroke="#1E40AF" stroke-width="1.4"/>
  <circle cx="0" cy="-26" r="4" fill="#FDE047" stroke="${L}" stroke-width="0.8"/><path d="M-26 -74 l6 -2 M20 -76 l6 2" stroke="#93C5FD" stroke-width="3" stroke-linecap="round"/>`;
// Gốc ở giữa (cho st.fly)
const mid = (svg, dy) => `<g transform="translate(0 ${dy})">${svg}</g>`;
const BOX2 = `<g transform="translate(0 -6)"><rect x="-15" y="-10" width="30" height="16" rx="2" fill="#EF4444" stroke="${L}"/><rect x="-16" y="-12" width="32" height="5" rx="1.5" fill="#DC2626" stroke="${L}" stroke-width="0.8"/><path d="M0 -12 V6" stroke="#FDE047" stroke-width="2.4"/></g>
  <g transform="translate(0 -24)"><rect x="-13" y="-10" width="26" height="15" rx="2" fill="#EF4444" stroke="${L}"/><rect x="-14" y="-12" width="28" height="5" rx="1.5" fill="#DC2626" stroke="${L}" stroke-width="0.8"/><path d="M0 -12 V5" stroke="#FDE047" stroke-width="2.4"/></g>`;
const MUMBOX = (svg) => `<g transform="translate(0 16)">${svg}</g>`;
const SANDWICH = `<path d="M-12 6 L0 -10 L12 6Z" fill="#FDE68A" stroke="${L}" stroke-linejoin="round"/><path d="M-9 3 L0 -7 L9 3" stroke="#22C55E" stroke-width="2.4" fill="none"/><path d="M-12 6 H12" stroke="#F59E0B" stroke-width="2"/>`;
const LUNCH = (open, sand) => `<g transform="translate(0 -6)">
  ${open ? `<rect x="-20" y="-24" width="40" height="12" rx="3" fill="#FB923C" stroke="${L}" transform="rotate(-8 -20 -12)"/>` : ''}
  <rect x="-20" y="-12" width="40" height="22" rx="5" fill="#FDBA74" stroke="${L}" stroke-width="1.1"/>
  ${sand ? `<g transform="translate(-8 -8) scale(0.75)">${SANDWICH}</g><g transform="translate(8 -8) scale(0.75)">${SANDWICH}</g>` : ''}
  ${open ? '' : `<rect x="-20" y="-14" width="40" height="8" rx="3" fill="#FB923C" stroke="${L}"/><path d="M-8 -14 Q0 -22 8 -14" stroke="${L}" stroke-width="2" fill="none"/>`}
  <rect x="-5" y="-2" width="10" height="5" rx="1.5" fill="#fff" stroke="${L}" stroke-width="0.6"/></g>`;

// Bàn học: các nhóm đồ (tâm x của nhóm) — mặt bàn y = 212
const DESK_TOP = 212;
const GROUPS = {
  books: { x: 345, svg: [-9, 9].map((dx, i) => `<g transform="translate(${dx} 0) rotate(${i ? 4 : -3})">${BOOK1(i ? '#3B82F6' : '#EF4444')}</g>`).join('') },
  pencils: { x: 392, svg: [-8, 0, 8].map((dx, i) => `<g transform="translate(${dx} 0) rotate(${(i - 1) * 4})">${PENCIL}</g>`).join('') },
  pens: { x: 440, svg: [-11, -4, 4, 11].map((dx, i) => `<g transform="translate(${dx} 0) rotate(${(i - 1.5) * 3})">${PEN}</g>`).join('') },
  rulers: { x: 490, svg: [-5, 5].map((dx, i) => `<g transform="translate(${dx} 0) rotate(${i ? 5 : -5})">${RULER}</g>`).join('') },
  eraser: { x: 532, svg: ERASER },
};
const CRAYONS = ['#EF4444', '#EF4444', '#EF4444', '#FACC15', '#FACC15', '#22C55E', '#22C55E', '#3B82F6', '#3B82F6', '#3B82F6'];
const CNAME = { '#EF4444': 'red', '#FACC15': 'yellow', '#22C55E': 'green', '#3B82F6': 'blue' };
const CASE_X = 594;
const BAG_X = 200;

// Nhãn chữ (lớp trước): tên → [x, y, chữ, màu, cỡ]
const LBL = {
  q0: [BAG_X, 150, '?', '#DC2626', 30],
  bag: [BAG_X, 150, 'school bag', '#1D4ED8', 18],
  big: [BAG_X - 44, 150, 'big', '#7C3AED', 20],
  blue: [BAG_X + 44, 150, 'blue', '#2563EB', 20],
  books: [345, 150, '2 books', '#B91C1C', 15],
  pencils: [400, 120, '3 pencils', '#A16207', 15],
  pens: [440, 150, '4 pens', '#1D4ED8', 15],
  rulers: [495, 120, '2 rulers', '#A16207', 15],
  eraser: [532, 160, 'an eraser', '#DB2777', 15],
  q6: [262, 136, '?', '#DC2626', 30],
  case: [262, 134, 'pencil case', '#15803D', 17],
  green: [CASE_X, 236, 'green', '#16A34A', 20],
  ten: [CASE_X, 128, '10 crayons', '#7C3AED', 16],
  red: [CASE_X, 128, 'red', '#DC2626', 20],
  yellow: [CASE_X, 128, 'yellow', '#CA8A04', 20],
  green2: [CASE_X, 128, 'green', '#16A34A', 20],
  blue2: [CASE_X, 128, 'blue', '#2563EB', 20],
  boxes: [750, 124, '2 boxes', '#B91C1C', 18],
  red2: [750, 124, 'red', '#DC2626', 22],
  q13: [1150, 92, '?', '#DC2626', 30],
  lunch: [1150, 92, 'lunch box', '#C2410C', 18],
  sand: [1150, 92, '2 sandwiches', '#A16207', 17],
  yum: [1060, 132, 'Yum!', '#DB2777', 20],
  heavy: [1060, 128, 'heavy', '#7C2D12', 20],
  happy: [1060, 128, 'happy', '#DB2777', 20],
};

function bg() {
  return `
  ${room(0, 660, FLOOR, '#FEF9C3')}
  ${room(660, 300, FLOOR, '#FCE7F3')}
  ${room(960, 540, FLOOR, '#DCFCE7')}
  <!-- Phòng ngủ: giường, cửa sổ, kệ sách, bàn học -->
  <rect x="10" y="176" width="14" height="106" rx="3" fill="#A16207" stroke="${L}"/>
  <rect x="10" y="232" width="140" height="22" rx="5" fill="#fff" stroke="${L}"/><rect x="10" y="252" width="140" height="10" fill="#C2410C" stroke="${L}"/>
  <rect x="30" y="218" width="40" height="16" rx="7" fill="#fff" stroke="${L}"/><path d="M76 236 Q110 226 150 234 V246 H76Z" fill="#FCA5A5" stroke="${L}"/>
  <rect x="140" y="222" width="10" height="60" rx="3" fill="#A16207" stroke="${L}"/>
  ${windowBox(60, 60, 96, 84)}${cloud(96, 86, 0.5, 1)}
  ${shelf(380, 104, 200, books(392, 104, 6) + `<g transform="translate(480 104)"><circle cy="-14" r="13" fill="#F97316" stroke="${L}"/><path d="M-13 -14 H13 M0 -27 V-1" stroke="${L}" stroke-width="0.8"/></g><g transform="translate(540 104)"><rect x="-14" y="-26" width="28" height="26" rx="3" fill="#A78BFA" stroke="${L}"/><text y="-8" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="14" fill="#fff">ABC</text></g>`)}
  <rect x="330" y="${DESK_TOP + 8}" width="10" height="${FLOOR - DESK_TOP - 8}" fill="#B45309" stroke="${L}"/><rect x="620" y="${DESK_TOP + 8}" width="10" height="${FLOOR - DESK_TOP - 8}" fill="#B45309" stroke="${L}"/>
  <rect x="540" y="${DESK_TOP + 8}" width="80" height="40" rx="3" fill="#F59E0B" stroke="${L}"/><circle cx="580" cy="${DESK_TOP + 28}" r="3" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/>
  <rect x="318" y="${DESK_TOP}" width="326" height="10" rx="3" fill="#F59E0B" stroke="${L}" stroke-width="1.2"/>
  ${rug(250, FLOOR, 150, '#BFDBFE')}
  <!-- Cặp trên sàn -->
  <g class="e005-floorbag" transform="translate(${BAG_X} ${FLOOR})"><g class="e005-bagg">${BIGBAG}</g></g>
  <!-- Đồ trên bàn -->
  ${Object.entries(GROUPS).map(([k, g]) => `<g transform="translate(${g.x} ${DESK_TOP})"><g class="e005-it e005-${k}">${g.svg}</g></g>`).join('')}
  <g transform="translate(${CASE_X} ${DESK_TOP})">
    <g class="e005-cg">${CRAYONS.map((c, i) => `<g transform="translate(${(i - 4.5) * 7.4} -14) scale(1.3)"><g class="e005-cgc e005-c-${CNAME[c]}"><g class="e005-cr" style="--d:${(i * 0.12).toFixed(2)}s">${CRAYON(c)}</g></g></g>`).join('')}</g>
    <g class="e005-it e005-case">${CASE}<g class="e005-lid"><rect x="-28" y="-22" width="56" height="9" rx="4.5" fill="#16A34A" stroke="${L}" stroke-width="1.1"/></g></g>
  </g>
  ${doorway(660, FLOOR)}
  <!-- Phòng khách -->
  <rect x="700" y="70" width="70" height="54" rx="3" fill="#fff" stroke="${L}" stroke-width="1.2"/><path d="M706 116 L726 92 L742 108 L752 98 L764 116Z" fill="#86EFAC" stroke="${L}" stroke-width="0.7"/><circle cx="752" cy="84" r="6" fill="#FDE047"/>
  <path d="M840 282 V214 Q840 196 858 196 H930 Q948 196 948 214 V282Z" fill="#8B5CF6" stroke="${L}" stroke-width="1.2"/>
  <rect x="832" y="230" width="124" height="34" rx="8" fill="#A78BFA" stroke="${L}"/><rect x="824" y="222" width="16" height="44" rx="6" fill="#8B5CF6" stroke="${L}"/><rect x="948" y="222" width="12" height="44" rx="6" fill="#8B5CF6" stroke="${L}"/>
  ${rug(810, FLOOR, 160, '#FBCFE8')}
  <!-- Bếp -->
  ${doorway(960, FLOOR)}
  ${windowBox(1250, 64, 110, 80)}
  ${Array.from({ length: 7 }, (_, i) => `<path d="M${1180 + i * 46} 152 V200" stroke="#BBF7D0" stroke-width="1.4"/>`).join('')}<path d="M1180 176 H1500" stroke="#BBF7D0" stroke-width="1.4"/>
  <rect x="1186" y="206" width="300" height="76" fill="#16A34A" stroke="${L}" stroke-width="1.2"/>
  ${[1230, 1310, 1390, 1450].map((x) => `<rect x="${x - 24}" y="216" width="40" height="56" rx="3" fill="#15803D" stroke="${L}" stroke-width="0.8"/><circle cx="${x + 9}" cy="244" r="2.4" fill="#FDE68A"/>`).join('')}
  <rect x="1180" y="198" width="312" height="10" rx="3" fill="#F5F5F4" stroke="${L}"/>
  <g transform="translate(1440 198)"><path d="M-22 -4 H22 V-24 Q22 -30 16 -30 H-16 Q-22 -30 -22 -24Z" fill="#94A3B8" stroke="${L}"/><ellipse cy="-30" rx="22" ry="4" fill="#CBD5E1" stroke="${L}" stroke-width="0.8"/></g>
  <g transform="translate(1040 ${FLOOR})"><rect x="-34" y="-170" width="68" height="170" rx="8" fill="#F8FAFC" stroke="${L}" stroke-width="1.2"/><path d="M-34 -110 H34" stroke="${L}"/><rect x="24" y="-150" width="4" height="26" rx="2" fill="#94A3B8"/><rect x="24" y="-96" width="4" height="30" rx="2" fill="#94A3B8"/></g>
  <!-- Bánh mì trên quầy -->
  <g transform="translate(1238 192)"><g class="e005-it e005-sand">${SANDWICH}<g transform="translate(26 0)">${SANDWICH}</g></g></g>`;
}

/** Lớp trước: các nhãn chữ (tiếng Anh). */
function fg() {
  return Object.entries(LBL).map(([k, [x, y, t, c, s]]) => `<g class="e005-lbl e005-l-${k}">${label(x, y, t, c, s)}</g>`).join('');
}

const CSS = `
.e005-lbl, .e005-it { opacity: 0; transform: scale(.3); transform-box: fill-box; transform-origin: 50% 100%; transition: opacity .25s, transform .45s cubic-bezier(.3,1.6,.6,1); }
${Object.keys(LBL).map((k) => `.st-l-${k} .e005-l-${k}`).join(', ')} { opacity: 1; transform: none; }
${[...Object.keys(GROUPS), 'case', 'sand'].map((k) => `.st-${k} .e005-${k}`).join(', ')} { opacity: 1; transform: none; }
.e005-cr { opacity: 0; transform: translateY(18px); transition: opacity .3s var(--d), transform .45s cubic-bezier(.3,1.5,.6,1) var(--d); }
.st-crayons .e005-cr { opacity: 1; transform: none; }
.e005-cgc { transition: transform .3s cubic-bezier(.3,1.6,.6,1); }
${Object.values(CNAME).map((n) => `.st-c-${n} .e005-c-${n}`).join(', ')} { transform: translateY(-9px); }
.e005-lid { transition: transform .4s, opacity .4s; }
.st-crayons .e005-lid { opacity: 0; transform: translateY(-14px); }
svg.st-packed .e005-it, svg.st-packed .e005-cr { opacity: 0; transform: scale(.3); }
.e005-bagg { transform-box: fill-box; transform-origin: 50% 100%; transition: transform .5s cubic-bezier(.3,1.6,.6,1); }
.st-big .e005-bagg { transform: scale(1.22); }
.e005-floorbag { transition: opacity .25s; }
.st-bagOn .e005-floorbag { opacity: 0; }
`;

/** Một bộ nhãn mỗi lúc: bật các nhãn names, tắt các nhãn cũ. */
function lab(st, ...names) {
  const on = names.map((n) => `st-l-${n}`);
  [...st.state].filter((s) => s.startsWith('st-l-') && !on.includes(s)).forEach((s) => st.set(s, false));
  on.forEach((s) => st.set(s));
}
const MINH_CHEST = [262, FLOOR - 66];
const BAG_MOUTH = [BAG_X, FLOOR - 76];
/** Một nhóm đồ bay từ cặp lên bàn rồi hiện ở bàn. */
async function out(st, k, dur = 650) {
  const g = GROUPS[k];
  await st.fly(g.svg, BAG_MOUTH, [g.x, DESK_TOP - 18], { size: 44, dur });
  st.set(`st-${k}`);
}

const BEATS = [
  { key: ['What is this?'], icon: '❓', label: 'what', async play(st) {
    st.look(330);
    st.pose('minh', 'e005_pointL'); st.act('minh', 'point');
    await st.wait(300);
    lab(st, 'q0'); st.fx('sparkle', BAG_X, FLOOR - 50);
    await st.wait(1400);
    st.act('minh', null);
  } },
  { key: ['my school bag'], icon: '🎒', label: 'school bag', async play(st) {
    st.pose('minh', 'me'); st.mood('minh', 'joy');
    lab(st, 'bag'); st.sfx('bag-on');
    await st.wait(1600);
    st.pose('minh', 'stand'); st.mood('minh', 'happy');
    await st.wait(500);
  } },
  { key: ['big and blue'], icon: '🔵', label: 'big and blue', async play(st) {
    lab(st);
    await st.wait(500);
    st.set('st-big'); lab(st, 'big');
    await st.wait(800);
    st.set('st-big', false);
    lab(st, 'big', 'blue'); st.fx('sparkle', BAG_X, FLOOR - 50);
    await st.wait(1100);
  } },
  { key: ['two books', 'three pencils'], icon: '📚', label: 'books, pencils', async play(st) {
    st.look(400);
    lab(st);
    st.pose('minh', 'point');
    await st.wait(700);
    st.sfx('page-turn');
    await out(st, 'books');
    lab(st, 'books');
    await st.wait(600);
    await out(st, 'pencils');
    lab(st, 'books', 'pencils');
    await st.wait(900);
    st.pose('minh', 'stand');
  } },
  { key: ['four pens', 'two rulers'], icon: '🖊️', label: 'pens, rulers', async play(st) {
    lab(st);
    st.pose('minh', 'point');
    await st.wait(700);
    await out(st, 'pens');
    lab(st, 'pens');
    await st.wait(600);
    await out(st, 'rulers');
    lab(st, 'pens', 'rulers');
    await st.wait(900);
    st.pose('minh', 'stand');
  } },
  { key: ['an eraser, too'], icon: '🧽', label: 'eraser', async play(st) {
    lab(st);
    st.pose('minh', 'point');
    await st.wait(700);
    await out(st, 'eraser');
    lab(st, 'eraser'); st.fx('sparkle', 532, 196, { quiet: true });
    await st.wait(1000);
    st.pose('minh', 'stand');
  } },
  { key: ['What is this?'], icon: '❓', label: 'what', async play(st) {
    st.look(360);
    lab(st);
    await st.fly(CASE, BAG_MOUTH, MINH_CHEST, { size: 60, dur: 600 });
    st.chest('minh', `<g transform="translate(0 4)">${CASE}</g>`); st.pose('minh', 'carry');
    lab(st, 'q6'); st.mood('minh', 'wow');
    await st.wait(900);
    st.mood('minh', 'happy');
  } },
  { key: ['a pencil case'], icon: '✏️', label: 'pencil case', async play(st) {
    lab(st, 'case'); st.mood('minh', 'joy');
    await st.wait(1300);
    st.chest('minh', null); st.pose('minh', 'give');
    await st.fly(CASE, MINH_CHEST, [CASE_X, DESK_TOP - 11], { size: 60, dur: 600 });
    st.set('st-case'); st.sfx('bowl-down', { vol: 0.6 });
    st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['It is green'], icon: '💚', label: 'green', async play(st) {
    st.look(450);
    lab(st, 'green'); st.fx('sparkle', CASE_X, DESK_TOP - 12);
    await st.wait(1500);
  } },
  { key: ['ten crayons'], icon: '🖍️', label: 'ten crayons', async play(st) {
    lab(st);
    st.pose('minh', 'point');
    await st.wait(300);
    st.set('st-crayons');
    await st.wait(1500);
    lab(st, 'ten'); st.mood('minh', 'joy');
    await st.wait(700);
    st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['red, yellow, green and blue'], icon: '🌈', label: 'colours', async play(st) {
    lab(st);
    await st.wait(700);
    for (const [c, l] of [['red', 'red'], ['yellow', 'yellow'], ['green', 'green2'], ['blue', 'blue2']]) {
      [...st.state].filter((s) => s.startsWith('st-c-')).forEach((s) => st.set(s, false));
      st.set(`st-c-${c}`); lab(st, l);
      await st.wait(c === 'green' ? 800 : 480);
    }
    await st.wait(300);
    // Xếp tất cả lại vào cặp, đeo lên vai
    [...st.state].filter((s) => s.startsWith('st-c-')).forEach((s) => st.set(s, false));
    lab(st);
    await Promise.all(['books', 'pens', 'eraser'].map((k) => st.fly(GROUPS[k].svg, [GROUPS[k].x, DESK_TOP - 18], BAG_MOUTH, { size: 40, dur: 500 })));
    st.set('st-packed');
    st.set('st-bagOn'); st.bag('minh', true); st.sfx('bag-on');
    st.fx('poof', BAG_X, FLOOR - 40, { quiet: true });
  } },
  { key: ['Lan has got two boxes'], icon: '📦', label: 'two boxes', async play(st) {
    await Promise.all([
      st.walk('minh', 676, { speed: 170, lead: 20 }),
      (async () => { await st.wait(700); await st.walk('lan', 752, { speed: 120, follow: false }); })(),
    ]);
    st.pose('lan', 'carry'); st.act('lan', 'hop'); st.mood('lan', 'joy');
    lab(st, 'boxes');
    await st.wait(600);
    st.act('lan', null); st.mood('lan', 'happy');
  } },
  { key: ['The boxes are red'], icon: '🟥', label: 'red', async play(st) {
    st.fx('sparkle', 752, FLOOR - 90);
    lab(st, 'red2');
    await st.wait(1700);
  } },
  { key: ['What is this?'], icon: '❓', label: 'what', async play(st) {
    lab(st);
    await st.walk('minh', 1062, { speed: 175, lead: 60 });
    st.chest('mum', MUMBOX(LUNCH(false))); st.pose('mum', 'carry'); lab(st, 'q13');
    await st.wait(500);
  } },
  { key: ['a lunch box'], icon: '🍱', label: 'lunch box', async play(st) {
    lab(st, 'lunch'); st.mood('mum', 'joy');
    st.fx('sparkle', 1150, FLOOR - 100, { quiet: true });
    await st.wait(1800);
    st.mood('mum', 'happy');
  } },
  { key: ['two sandwiches for me'], icon: '🥪', label: 'sandwiches', async play(st) {
    st.chest('mum', MUMBOX(LUNCH(true, false)));
    st.set('st-sand'); lab(st, 'sand');
    await st.wait(700);
    await st.fly(SANDWICH, [1250, 186], [1150, FLOOR - 98], { size: 30, dur: 600 });
    st.set('st-sand', false); st.chest('mum', MUMBOX(LUNCH(true, true))); st.sfx('bowl-down', { vol: 0.6 });
    await st.wait(500);
    st.chest('mum', null); st.pose('mum', 'give');
    await st.fly(LUNCH(false), [1150, FLOOR - 88], MINH_CHEST.map((v, i) => (i ? v : 1062)), { size: 44, dur: 600 });
    st.chest('minh', LUNCH(false)); st.pose('minh', 'carry');
    st.pose('mum', 'stand'); st.mood('mum', 'joy');
    await st.wait(300);
  } },
  { key: ['Yum!'], icon: '😋', label: 'yum', async play(st) {
    lab(st, 'yum');
    st.mood('minh', 'joy'); st.act('minh', 'hop');
    st.fx('hearts', 1062, FLOOR - 120);
    await st.say('minh', 'Yum!', 1400);
    st.act('minh', null);
  } },
  { key: ['My bag is heavy', 'I am happy'], icon: '😊', label: 'heavy, happy', async play(st) {
    lab(st);
    st.mood('mum', 'happy');
    await st.fly(LUNCH(false), MINH_CHEST.map((v, i) => (i ? v : 1062)), [1048, FLOOR - 90], { size: 40, dur: 450 });
    st.chest('minh', null); st.sfx('bag-on');
    st.pose('minh', 'e005_heavy'); st.mood('minh', 'shut'); st.act('minh', 'shiver');
    lab(st, 'heavy');
    await st.wait(1500);
    st.act('minh', null);
    st.pose('minh', 'cheer'); st.act('minh', 'cheer'); st.mood('minh', 'joy');
    lab(st, 'happy'); st.fx('hearts', 1062, FLOOR - 130);
    await st.wait(1600);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
];

export default {
  id: 'en005', worldW: 1500, floor: FLOOR, viewTop: 40, camStart: 30, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: {
    e005_pointL: { R: [10, 4], L: [84, 92] },
    e005_heavy: { R: [4, -10], L: [4, -10], head: 14, dy: 6 },
  },
  cast: [
    { id: 'minh', kind: 'kid', who: 'e005_minh', x: 262 },
    { id: 'lan', kind: 'kid', who: 'en_lan', x: 870, s: 1.08 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 1150, s: 0.95 },
  ],
  init(st) {
    st.chest('lan', BOX2); st.pose('lan', 'carry');
  },
};
