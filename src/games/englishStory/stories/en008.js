/**
 * Bài 8 "Where Is Kitty?": một phòng khách dài, đi từ trái sang phải: cửa vào · hộp các-tông · giường · bàn · cửa phòng
 * bên · ghế sô-pha (Lucky ngồi cạnh). Đầu truyện Kitty ở trước sô-pha rồi trốn ra sau; Minh và Lan đi tìm lần lượt
 * trong hộp, trên giường, dưới bàn, sau cửa (mỗi chỗ hiện bóng mèo nét đứt đúng vị trí in / on / under / behind rồi "No"),
 * cuối cùng thấy đuôi Kitty sau sô-pha, Kitty ló đầu dưới tấm chăn, cạnh quả bóng đỏ; Kitty ra chơi với Lucky.
 * Toạ độ cảnh: rộng 1820, sàn y = 282. Sô-pha ở lớp trước nên Kitty đi ra sau nó là bị che thật.
 */
import { L, room, windowBox, shelf, books, rug, cloud, label, KIT_CSS } from '../kit.js';

const FLOOR = 282;
const BOX_X = 480;
const BED_X = 830;
const TBL_X = 1090;
const DOOR_X = 1330;
const SOFA_X = 1620; // tâm sô-pha (rộng 200)
const LUCKY_X = 1436;
const PEEK_X = 1680; // chỗ Kitty trốn sau sô-pha
const BALL_X = 1638;
const KITTY_X = 1764; // Kitty ngồi giữa sô-pha và cây đèn lúc đầu truyện

// Bóng mèo nét đứt + dấu ? (gốc ở chân)
const GHOST = `<g opacity="0.85"><path d="M-12 0 Q-16 -18 -8 -28 L-12 -44 L-3 -36 Q0 -37 3 -36 L12 -44 L8 -28 Q16 -18 12 0Z" fill="#fff" fill-opacity="0.55" stroke="#7C3AED" stroke-width="1.6" stroke-dasharray="4 3"/>
  <path d="M12 -4 Q26 -6 22 -22" stroke="#7C3AED" stroke-width="1.6" stroke-dasharray="4 3" fill="none"/>
  <text y="-10" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="16" fill="#7C3AED">?</text></g>`;
const ghost = (x, y, k) => `<g transform="translate(${x} ${y})"><g class="e008-pop e008-g-${k}">${GHOST}</g></g>`;
const RED_BALL = `<circle cy="-11" r="11" fill="#EF4444" stroke="${L}"/><path d="M-11 -11 Q0 -17 11 -11 M0 -22 Q-5 -11 0 0" stroke="#fff" stroke-width="2" fill="none"/><path d="M-5 -17 q3 -3 6 -3" stroke="#fff" stroke-width="2" fill="none" opacity="0.7"/>`;
const KHEAD = `<path d="M-12 -6 L-10 -24 L-1 -13Z M1 -13 L10 -24 L12 -6Z" fill="#fff" stroke="${L}" stroke-linejoin="round"/><path d="M-9 -10 L-8.6 -19 L-4 -13Z M4 -13 L8.6 -19 L9 -10Z" fill="#F9A8D4"/>
  <circle r="13" fill="#fff" stroke="${L}"/><ellipse cx="-5" cy="-1" rx="2.6" ry="3.4" fill="#22C55E" stroke="${L}" stroke-width="0.6"/><ellipse cx="5" cy="-1" rx="2.6" ry="3.4" fill="#22C55E" stroke="${L}" stroke-width="0.6"/>
  <ellipse cx="-5" cy="-1" rx="0.9" ry="2.6" fill="#14291C"/><ellipse cx="5" cy="-1" rx="0.9" ry="2.6" fill="#14291C"/><path d="M-1.6 4 h3.2 l-1.6 2Z" fill="#F9A8D4"/>
  <path d="M2 6 L14 4 M2 7 L14 9 M-2 6 L-14 4 M-2 7 L-14 9" stroke="#94A3B8" stroke-width="0.6"/>`;

// Nhãn chữ (lớp trước): tên → [x, y, chữ, màu, cỡ]
const LBL = {
  white: [KITTY_X - 30, 150, 'white cat', '#475569', 20],
  shy: [KITTY_X - 10, 150, 'shy', '#DB2777', 22],
  w1: [BOX_X, 180, '?', '#7C3AED', 24], w2: [BED_X, 170, '?', '#7C3AED', 24], w3: [TBL_X, 170, '?', '#7C3AED', 24], w4: [DOOR_X, 100, '?', '#7C3AED', 24],
  room: [300, 92, 'living room', '#7C3AED', 22],
  in: [BOX_X, 156, 'in the box?', '#2563EB', 17],
  no1: [BOX_X, 156, 'No', '#DC2626', 22],
  on: [BED_X, 150, 'on the bed?', '#2563EB', 17],
  no2: [BED_X, 150, 'No', '#DC2626', 22],
  under: [TBL_X, 150, 'under the table?', '#2563EB', 17],
  no3: [TBL_X, 150, 'No', '#DC2626', 22],
  behind: [DOOR_X, 84, 'behind the door?', '#2563EB', 17],
  no4: [DOOR_X, 84, 'No!', '#DC2626', 24],
  nextto: [LUCKY_X + 90, 150, 'next to the sofa', '#B45309', 17],
  happy: [LUCKY_X, 150, 'happy', '#DB2777', 20],
  look: [1400, 104, 'Look!', '#DC2626', 24],
  bsofa: [PEEK_X - 20, 130, 'behind the sofa', '#7C3AED', 17],
  blanket: [PEEK_X - 20, 130, 'under a blanket', '#2563EB', 17],
  haha: [1360, 104, 'Ha ha!', '#DB2777', 22],
  ball: [BALL_X - 20, 132, 'a red ball', '#DC2626', 18],
  friends: [LUCKY_X + 40, 150, 'friends', '#DB2777', 22],
};

function bg() {
  return `
  ${room(0, 1840, FLOOR, '#FEF3C7')}
  ${Array.from({ length: 30 }, (_, i) => `<path d="M${30 + i * 60} 20 v8" stroke="#FDE68A" stroke-width="6" stroke-linecap="round"/>`).join('')}
  <!-- Cửa vào bên trái -->
  <rect x="14" y="100" width="74" height="182" rx="4" fill="#FEF9C3" stroke="${L}" stroke-width="1.2"/><rect x="19" y="105" width="64" height="177" fill="#BAE6FD"/>
  <g class="e008-fdoor"><rect x="19" y="105" width="64" height="177" fill="#B45309" stroke="${L}"/><rect x="27" y="115" width="48" height="58" rx="4" fill="#92400E"/><rect x="27" y="184" width="48" height="86" rx="4" fill="#92400E"/><circle cx="76" cy="200" r="3.4" fill="#FDE68A" stroke="${L}"/></g>
  ${windowBox(150, 64, 110, 84)}${cloud(186, 90, 0.55, 1)}
  ${shelf(290, 150, 110, books(298, 150, 6))}
  <!-- Hộp các-tông: bóng mèo ở TRONG hộp (vẽ trước mặt hộp) -->
  ${ghost(BOX_X, FLOOR - 40, 'in')}
  <g transform="translate(${BOX_X} ${FLOOR})"><path d="M-40 -54 L-56 -70 L-34 -62Z M40 -54 L56 -70 L34 -62Z" fill="#D6A267" stroke="${L}" stroke-linejoin="round"/>
    <rect x="-40" y="-54" width="80" height="54" fill="#E0B07A" stroke="${L}" stroke-width="1.2"/><path d="M-40 -46 H40" stroke="#B9824F" stroke-width="1.4"/><rect x="-10" y="-34" width="20" height="12" fill="#F5D6A8" stroke="${L}" stroke-width="0.6"/></g>
  <!-- Giường: bóng mèo TRÊN giường -->
  <rect x="${BED_X - 96}" y="174" width="16" height="108" rx="3" fill="#A16207" stroke="${L}"/>
  <rect x="${BED_X - 96}" y="236" width="196" height="24" rx="5" fill="#fff" stroke="${L}"/><rect x="${BED_X - 96}" y="258" width="196" height="10" fill="#7C3AED" stroke="${L}"/>
  <rect x="${BED_X - 76}" y="222" width="44" height="16" rx="7" fill="#fff" stroke="${L}"/><path d="M${BED_X - 20} 240 Q${BED_X + 40} 230 ${BED_X + 100} 238 V250 H${BED_X - 20}Z" fill="#FDA4AF" stroke="${L}"/>
  <rect x="${BED_X + 90}" y="226" width="10" height="56" rx="3" fill="#A16207" stroke="${L}"/>
  ${ghost(BED_X + 20, 238, 'on')}
  <!-- Bàn: bóng mèo DƯỚI bàn -->
  <rect x="${TBL_X - 80}" y="214" width="160" height="10" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
  <rect x="${TBL_X - 72}" y="224" width="9" height="58" fill="#92400E" stroke="${L}"/><rect x="${TBL_X + 63}" y="224" width="9" height="58" fill="#92400E" stroke="${L}"/>
  <g transform="translate(${TBL_X - 30} 214)"><path d="M-8 0 L-6 -16 H6 L8 0Z" fill="#60A5FA" stroke="${L}"/><path d="M0 -16 q-8 -10 -2 -20 M0 -16 q8 -12 4 -22" stroke="#16A34A" stroke-width="2" fill="none"/><circle cx="-2" cy="-36" r="4" fill="#F472B6"/><circle cx="4" cy="-38" r="4" fill="#FDE047"/></g>
  <g transform="translate(${TBL_X + 30} 214)"><rect x="-14" y="-4" width="28" height="4" rx="1" fill="#22C55E" stroke="${L}" stroke-width="0.6"/><rect x="-12" y="-8" width="24" height="4" rx="1" fill="#EF4444" stroke="${L}" stroke-width="0.6"/></g>
  ${ghost(TBL_X, FLOOR, 'under')}
  <!-- Cửa phòng bên: bóng mèo SAU cánh cửa -->
  <rect x="${DOOR_X - 40}" y="96" width="80" height="186" rx="4" fill="#FEF9C3" stroke="${L}" stroke-width="1.2"/><rect x="${DOOR_X - 35}" y="101" width="70" height="181" fill="#C7D2FE"/>
  ${ghost(DOOR_X + 4, FLOOR, 'behind')}
  <g class="e008-door"><rect x="${DOOR_X - 35}" y="101" width="70" height="181" fill="#0EA5E9" stroke="${L}"/><rect x="${DOOR_X - 27}" y="111" width="54" height="62" rx="4" fill="#0284C7"/><rect x="${DOOR_X - 27}" y="184" width="54" height="86" rx="4" fill="#0284C7"/><circle cx="${DOOR_X + 26}" cy="200" r="3.4" fill="#FDE68A" stroke="${L}"/></g>
  <!-- Góc sô-pha: tranh, đèn; Kitty ló đầu sau sô-pha (lớp nền, sô-pha ở lớp trước che phần dưới) -->
  <g transform="translate(${SOFA_X - 40} 70)"><rect width="90" height="62" rx="3" fill="#fff" stroke="${L}" stroke-width="1.2"/><circle cx="24" cy="22" r="9" fill="#FDE047"/><path d="M8 54 L34 30 L50 44 L64 34 L82 54Z" fill="#86EFAC" stroke="${L}" stroke-width="0.7"/></g>
  <g transform="translate(1812 ${FLOOR})"><path d="M0 0 V-120" stroke="${L}" stroke-width="3"/><path d="M-20 -120 H20 L12 -150 H-12Z" fill="#FDE68A" stroke="${L}"/><ellipse cy="0" rx="18" ry="4" fill="#78716C"/></g>
  <g transform="translate(${PEEK_X} 174)"><g class="e008-head">${KHEAD}</g></g>
  <g transform="translate(${BALL_X} 191)"><g class="e008-pop e008-ball">${RED_BALL}</g></g>
  <g transform="translate(${PEEK_X} 194)"><g class="e008-blanket"><path d="M-30 0 Q-30 -34 0 -36 Q30 -34 30 0Z" fill="#60A5FA" stroke="${L}" stroke-width="1.2"/>
    ${[-18, -6, 6, 18].map((x) => `<path d="M${x} -30 V-2" stroke="#BFDBFE" stroke-width="3" opacity="0.8"/>`).join('')}</g></g>
  <g transform="translate(${SOFA_X + 104} ${FLOOR - 26})"><g class="e008-tail"><path d="M0 0 Q18 -4 16 -22 Q14 -34 24 -38" stroke="${L}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M0 0 Q18 -4 16 -22 Q14 -34 24 -38" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/></g></g>
  ${rug(SOFA_X - 40, FLOOR, 260, '#C4B5FD')}`;
}

/** Lớp trước: sô-pha (che Kitty trốn sau nó), nhãn chữ. */
function fg() {
  const x0 = SOFA_X - 100;
  return `
  <path d="M${x0 + 12} ${FLOOR - 14} V${FLOOR - 76} Q${x0 + 12} ${FLOOR - 92} ${x0 + 30} ${FLOOR - 92} H${x0 + 170} Q${x0 + 188} ${FLOOR - 92} ${x0 + 188} ${FLOOR - 76} V${FLOOR - 14}Z" fill="#F97316" stroke="${L}" stroke-width="1.3"/>
  <path d="M${x0 + 30} ${FLOOR - 82} H${x0 + 170}" stroke="#FDBA74" stroke-width="3" stroke-linecap="round"/>
  <rect x="${x0 + 6}" y="${FLOOR - 48}" width="188" height="30" rx="8" fill="#FB923C" stroke="${L}"/><path d="M${x0 + 100} ${FLOOR - 46} V${FLOOR - 20}" stroke="${L}" stroke-width="0.8"/>
  <rect x="${x0 - 6}" y="${FLOOR - 62}" width="22" height="50" rx="8" fill="#F97316" stroke="${L}"/><rect x="${x0 + 184}" y="${FLOOR - 62}" width="22" height="50" rx="8" fill="#F97316" stroke="${L}"/>
  <rect x="${x0 + 10}" y="${FLOOR - 14}" width="8" height="14" fill="#78350F" stroke="${L}"/><rect x="${x0 + 182}" y="${FLOOR - 14}" width="8" height="14" fill="#78350F" stroke="${L}"/>
  <rect x="${x0 + 30}" y="${FLOOR - 70}" width="34" height="24" rx="6" fill="#FDE047" stroke="${L}" transform="rotate(-8 ${x0 + 47} ${FLOOR - 58})"/>
  ${Object.entries(LBL).map(([k, [x, y, t, c, s]]) => `<g class="e008-lbl e008-l-${k}">${label(x, y, t, c, s)}</g>`).join('')}`;
}

const CSS = `
.e008-lbl, .e008-pop { opacity: 0; transform: scale(.3); transform-box: fill-box; transform-origin: 50% 100%; transition: opacity .25s, transform .45s cubic-bezier(.3,1.6,.6,1); }
${Object.keys(LBL).map((k) => `.st-l-${k} .e008-l-${k}`).join(', ')} { opacity: 1; transform: none; }
.st-g-in .e008-g-in, .st-g-on .e008-g-on, .st-g-under .e008-g-under, .st-g-behind .e008-g-behind, .st-ball .e008-ball { opacity: 1; transform: none; }
.e008-fdoor { transform-origin: 19px 190px; transition: transform .6s cubic-bezier(.4,0,.2,1); }
.st-fdoor .e008-fdoor { transform: scaleX(.12); }
.e008-door { transform-origin: ${DOOR_X - 35}px 190px; transition: transform .6s cubic-bezier(.4,0,.2,1); }
.st-door .e008-door { transform: scaleX(.12); }
.e008-blanket { opacity: 0; transform-box: fill-box; transform-origin: 50% 100%; transition: opacity .3s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.st-hid .e008-blanket { opacity: 1; }
.st-shake .e008-blanket { animation: e008Shake .16s ease-in-out infinite alternate; }
@keyframes e008Shake { from { transform: rotate(-3deg); } to { transform: rotate(3deg); } }
.st-peek .e008-blanket { transform: translateY(-24px) scaleX(1.12); }
.e008-head { opacity: 0; transform: translateY(14px); transition: opacity .3s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.st-peek .e008-head { opacity: 1; transform: none; }
.e008-tail { opacity: 0; transition: opacity .3s; transform-origin: 0 0; }
.st-tail .e008-tail { opacity: 1; animation: e008Tail .5s ease-in-out infinite alternate; }
@keyframes e008Tail { from { transform: rotate(-12deg); } to { transform: rotate(14deg); } }
`;

function lab(st, ...names) {
  const on = names.map((n) => `st-l-${n}`);
  [...st.state].filter((s) => s.startsWith('st-l-') && !on.includes(s)).forEach((s) => st.set(s, false));
  on.forEach((s) => st.set(s));
}
/** Câu "Is she in/on/under/behind…?": bóng mèo nét đứt hiện đúng chỗ, người tìm cúi nhìn. */
async function seek(st, who, g, lbl, x, y) {
  st.pose(who, 'e008_peek'); st.mood(who, 'wow');
  st.set(`st-g-${g}`); lab(st, lbl);
  st.fx('sparkle', x, y, { quiet: true });
}
/** "No, she is not.": bóng mèo biến mất, lắc đầu, nhún vai. */
async function no(st, ids, g, lbl, x, y) {
  ids.forEach((id) => { st.pose(id, 'shrug'); st.act(id, 'no'); st.mood(id, 'happy'); });
  st.set(`st-g-${g}`, false); st.fx('poof', x, y);
  lab(st, lbl);
  await st.wait(1500);
  ids.forEach((id) => { st.act(id, null); st.pose(id, 'stand'); });
}

const BEATS = [
  { key: ['a white cat'], icon: '🐱', label: 'white cat', async play(st) {
    st.look(SOFA_X + 60);
    st.act('kitty', 'wag'); st.mood('kitty', 'joy');
    lab(st, 'white'); st.fx('sparkle', KITTY_X, 230);
    await st.wait(1600);
    st.act('kitty', null); st.mood('kitty', 'happy');
  } },
  { key: ['very shy'], icon: '🙈', label: 'shy', async play(st) {
    lab(st, 'shy');
    st.dog('kitty', 'stand');
    await st.wait(500);
    await st.walk('kitty', PEEK_X, { speed: 110, follow: false });
    st.show('kitty', false); st.set('st-hid');
    await st.wait(500);
  } },
  { key: ['Where is Kitty now?'], icon: '❓', label: 'where', async play(st) {
    lab(st);
    await st.look(DOOR_X, { dur: 700 });
    lab(st, 'w4');
    await st.look(TBL_X - 120, { dur: 600 });
    lab(st, 'w4', 'w3', 'w2');
    await st.look(BOX_X, { dur: 600 });
    lab(st, 'w4', 'w3', 'w2', 'w1');
    await st.wait(500);
  } },
  { key: ['in the living room'], icon: '🛋️', label: 'living room', async play(st) {
    lab(st);
    await st.look(280, { dur: 700 });
    st.set('st-fdoor'); st.sfx('door-open');
    st.show('minh', true); st.show('lan', true);
    await Promise.all([
      st.walk('minh', 330, { speed: 150, follow: false }),
      (async () => { await st.wait(300); await st.walk('lan', 250, { speed: 150, follow: false }); })(),
    ]);
    st.set('st-fdoor', false);
    lab(st, 'room');
    st.pose('minh', 'wave'); st.pose('lan', 'wave');
    await st.wait(700);
    st.pose('minh', 'stand'); st.pose('lan', 'stand');
  } },
  { key: ['in the box'], icon: '📦', label: 'in the box', async play(st) {
    lab(st);
    await st.walk('minh', BOX_X - 64, { speed: 150, lead: 40 });
    await seek(st, 'minh', 'in', 'in', BOX_X, FLOOR - 50);
    await st.wait(900);
  } },
  { key: ['No, she is not'], icon: '🙅', label: 'no', async play(st) {
    await no(st, ['minh'], 'in', 'no1', BOX_X, FLOOR - 50);
  } },
  { key: ['on the bed'], icon: '🛏️', label: 'on the bed', async play(st) {
    lab(st);
    await Promise.all([
      st.walk('lan', BED_X - 112, { speed: 170, lead: 70 }),
      st.walk('minh', BED_X - 176, { speed: 160, follow: false }),
    ]);
    await seek(st, 'lan', 'on', 'on', BED_X + 20, 220);
    await st.wait(900);
  } },
  { key: ['No, she is not'], icon: '🙅', label: 'no', async play(st) {
    await no(st, ['lan'], 'on', 'no2', BED_X + 20, 220);
  } },
  { key: ['under the table'], icon: '🪑', label: 'under the table', async play(st) {
    lab(st);
    await Promise.all([
      st.walk('minh', TBL_X - 120, { speed: 170, lead: 70 }),
      st.walk('lan', TBL_X + 150, { speed: 190, follow: false }),
    ]);
    await seek(st, 'minh', 'under', 'under', TBL_X, FLOOR - 24);
    await st.wait(900);
  } },
  { key: ['No, she is not'], icon: '🙅', label: 'no', async play(st) {
    await no(st, ['minh'], 'under', 'no3', TBL_X, FLOOR - 24);
  } },
  { key: ['behind the door'], icon: '🚪', label: 'behind the door', async play(st) {
    lab(st);
    st.look(DOOR_X - 40, { dur: 800 });
    await st.walk('lan', DOOR_X - 70, { speed: 150, follow: false });
    st.pose('lan', 'reach');
    await st.wait(250);
    st.set('st-door'); st.sfx('door-open');
    await st.wait(400);
    await seek(st, 'lan', 'behind', 'behind', DOOR_X, FLOOR - 30);
    await st.wait(700);
  } },
  { key: ['No!'], icon: '🙅', label: 'no', async play(st) {
    st.say('lan', 'No!', 1200);
    await no(st, ['lan', 'minh'], 'behind', 'no4', DOOR_X, FLOOR - 30);
    st.set('st-door', false);
  } },
  { key: ['next to the sofa'], icon: '🐶', label: 'next to the sofa', async play(st) {
    lab(st);
    st.look(LUCKY_X + 120, { dur: 900 });
    await Promise.all([
      st.walk('minh', 1380, { speed: 190, follow: false }),
      st.walk('lan', 1316, { speed: 150, follow: false }),
    ]);
    lab(st, 'nextto'); st.fx('sparkle', LUCKY_X + 50, FLOOR - 50, { quiet: true });
    await st.wait(1100);
  } },
  { key: ['He is happy'], icon: '😊', label: 'happy', async play(st) {
    st.act('lucky', 'wag'); st.mood('lucky', 'joy');
    lab(st, 'happy'); st.fx('hearts', LUCKY_X + 20, FLOOR - 80);
    await st.wait(1500);
  } },
  { key: ['Look!'], icon: '👀', label: 'look', async play(st) {
    lab(st);
    st.set('st-tail');
    st.pose('minh', 'point'); st.act('minh', 'point'); st.mood('minh', 'wow');
    lab(st, 'look');
    await st.wait(1500);
    st.act('minh', null);
  } },
  { key: ['behind the sofa'], icon: '🛋️', label: 'behind the sofa', async play(st) {
    st.look(SOFA_X - 30, { dur: 600 });
    st.set('st-shake'); lab(st, 'bsofa');
    await st.wait(1600);
    st.set('st-shake', false);
    st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['under a blanket'], icon: '🧣', label: 'under a blanket', async play(st) {
    lab(st, 'blanket');
    st.set('st-shake');
    await st.wait(500);
    st.set('st-shake', false); st.set('st-peek'); st.fx('sparkle', PEEK_X, 180);
    await st.wait(1300);
  } },
  { key: ['Ha ha!'], icon: '😂', label: 'ha ha', async play(st) {
    lab(st, 'haha');
    st.mood('minh', 'joy'); st.mood('lan', 'joy'); st.act('minh', 'hop'); st.act('lan', 'hop');
    st.pose('lan', 'clap'); st.act('lan', 'clap');
    await st.say('minh', 'Ha ha!', 1500);
    st.act('minh', null); st.act('lan', null); st.pose('lan', 'stand');
  } },
  { key: ['a red ball next to Kitty'], icon: '🔴', label: 'red ball', async play(st) {
    lab(st);
    st.set('st-ball'); st.fx('sparkle', BALL_X, 186);
    await st.wait(400);
    lab(st, 'ball');
    await st.wait(1800);
  } },
  { key: ['Lucky and Kitty are friends'], icon: '💕', label: 'friends', async play(st) {
    lab(st);
    st.set('st-peek', false); st.set('st-hid', false); st.set('st-tail', false);
    st.show('kitty', true); st.dog('kitty', 'stand');
    st.look(LUCKY_X + 110, { dur: 600 });
    await st.walk('kitty', LUCKY_X + 70, { speed: 140, follow: false });
    st.dog('lucky', 'stand');
    st.act('kitty', 'wag'); st.act('lucky', 'wag'); st.mood('kitty', 'joy'); st.mood('lucky', 'joy');
    lab(st, 'friends'); st.fx('hearts', LUCKY_X + 40, FLOOR - 70);
    await st.wait(1700);
  } },
];

export default {
  id: 'en008', worldW: 1840, floor: FLOOR, viewTop: 40, camStart: 1300, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: {
    e008_peek: { R: [30, 10], L: [30, 10], head: 16, dy: 3 },
  },
  cast: [
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 50 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 50, s: 1.08 },
    { id: 'lucky', kind: 'dog', x: LUCKY_X, s: 0.9 },
    { id: 'kitty', kind: 'cat', x: KITTY_X, s: 1.15, face: -1 },
  ],
  init(st) {
    st.show('minh', false); st.show('lan', false);
    st.dog('lucky', 'sit'); st.dog('kitty', 'sit');
  },
};
