/**
 * Bài 129 "How to Weigh an Elephant" (bị động; câu điều kiện loại 1): Lương Thế Vinh cân voi bằng thuyền (giai thoại).
 * Một thế giới đi từ trái sang phải: thư phòng (ông mê toán: que tính, bàn tính, số bay lên) → sân điện (bảng vàng năm
 * 1463, ông mặc áo đỏ đội mũ cánh chuồn của trạng nguyên) → lớp học xưa (cuốn Đại thành toán pháp, học trò đọc qua các
 * thế kỉ) → bờ sông (giai thoại: cảnh nhuộm màu ảnh cũ, nhãn "A folk story"): sứ thần hỏi voi nặng bao nhiêu, các quan
 * lắc đầu vì cân nhỏ quá; ông nghĩ ra cách (bong bóng nghĩ), voi đi lên thuyền, thuyền chìm xuống, kẻ vạch ở mặt nước; voi
 * xuống, đổ đá vào thuyền tới vạch; cân từng sọt đá ở cái cân treo trên bờ, cộng lại ra cân nặng của voi.
 * Voi cỡ thật (cao ≈ 240, người lớn ≈ 165). Toạ độ cảnh: rộng 2400, cao 315, sàn bờ y = 282, mặt sông y = 296.
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, cloud, label, tree, sun, thought } from '../kit.js';
import { HAT, wear, robe, redress, skyG, hills, ground, bamboo, palace, flag, elephant, barge, PROPS, vsCss, lb, lbCss, off, mark, NUN, SEP } from './vietsuKit.js';

const P = 'e129';
const FLOOR = 282, WL = 296, SINK = 16;
const W = 2760;
const X = { study: 220, court: 720, school: 1180, scale: 2000, bank: 1960, boat: 2330 };
const DECK = WL - 46; // mặt sàn thuyền khi thuyền rỗng
const ES = 1.2; // cỡ voi

Object.assign(CAST, {
  e129_vinh: { adult: true, hair: 'short', top: 'robe', shirt: '#0F766E', trimC: '#FDE68A', shoe: '#1C1917', moustache: true },
  e129_trang: { adult: true, hair: 'short', top: 'robe', shirt: '#B91C1C', trimC: '#FACC15', shoe: '#1C1917', hat: 'mandarin', moustache: true },
  e129_envoy: { ...CAST.suThan },
  e129_off1: { adult: true, hair: 'short', top: 'robe', shirt: '#15803D', trimC: '#FDE68A', shoe: '#1C1917', hat: 'mandarin', beard: true },
  e129_off2: { adult: true, old: true, hair: 'short', hairC: '#E7E5E4', top: 'robe', shirt: '#7C2D12', trimC: '#FDE68A', shoe: '#1C1917', hat: 'mandarin', beard: true },
  e129_worker: { adult: true, hair: 'short', top: 'tee', shirt: '#A16207', bottom: 'pants', bottomC: '#44403C', shoe: '#57534E' },
  e129_pup1: { hair: 'short', top: 'robe', shirt: '#A16207', trimC: '#FDE68A', shoe: '#1C1917' },
  e129_pup2: { hair: 'short', top: 'robe', shirt: '#1D4ED8', trimC: '#FDE68A', shoe: '#1C1917' },
});

const POSES = {
  e129_count: { R: [40, -60], L: [30, -70], dy: 34, head: 8 },
  e129_think: { R: [30, -150], L: [16, -60], head: 8 },
  e129_lift: { R: [120, 150], L: [10, 4] },
  e129_throw: { R: [150, 190], L: [60, 90] },
  e129_sitRead: { R: [30, -110], L: [30, -110], dy: 24, head: 8 },
};
const PR = {
  ...PROPS,
  e129_mini: `<g transform="rotate(180)"><path d="M0 -2 V20" stroke="#7C4A1E" stroke-width="2"/><path d="M-12 20 H12" stroke="#7C4A1E" stroke-width="2"/><path d="M-10 20 V27 M10 20 V27" stroke="${L}" stroke-width="0.6"/>
    <path d="M-15 27 H-5 Q-10 31 -15 27Z M5 27 H15 Q10 31 5 27Z" fill="#CA8A04" stroke="${L}" stroke-width="0.6"/></g>`,
};
const BOOK = `<g transform="translate(0 -4)"><rect x="-14" y="-10" width="28" height="20" rx="1.5" fill="#B91C1C" stroke="${L}" stroke-width="0.8"/><path d="M0 -10 V10" stroke="${L}" stroke-width="0.7"/>
  <rect x="-11" y="-6" width="9" height="12" fill="#FDE68A"/><text x="-6.5" y="2" text-anchor="middle" ${NUN} font-size="6" fill="#7F1D1D">算</text></g>`;

// ── Hình ─────────────────────────────────────────────────────────────────────────────────
/** Sọt đá (gốc = giữa đáy). */
const STONES = (k = 1) => `<g transform="scale(${k})"><path d="M-14 0 L-16 -16 H16 L14 0Z" fill="#CA8A04" stroke="${L}" stroke-width="0.9"/><path d="M-15 -8 H15" stroke="#A16207" stroke-width="0.8"/>
  <circle cx="-7" cy="-19" r="5" fill="#A8A29E" stroke="${L}" stroke-width="0.7"/><circle cx="3" cy="-20" r="6" fill="#9CA3AF" stroke="${L}" stroke-width="0.7"/><circle cx="10" cy="-17" r="4" fill="#D6D3D1" stroke="${L}" stroke-width="0.7"/></g>`;
/** Thuyền lớn: vạch kẻ ở mặt nước khi voi đứng trên (y = −SINK), bốn sọt đá hiện dần. */
const BARGE = barge(`
  <path class="${P}-line" d="M-196 ${-SINK} H196" stroke="#DC2626" stroke-width="3.4" stroke-dasharray="400" stroke-linecap="round"/>
  ${[-120, -40, 40, 120].map((x, i) => `<g class="${P}-st ${P}-st${i + 1}"><g transform="translate(${x} -48)">${STONES(1.5)}</g></g>`).join('')}`);
/** Cái cân treo (cân đòn) trên giá ba chân; đĩa cân chìm xuống khi có sọt đá. */
const SCALE = `<g transform="translate(${X.scale} ${FLOOR})"><path d="M-46 0 L0 -150 L46 0 M0 -150 V-160" stroke="#7C4A1E" stroke-width="5" stroke-linecap="round" fill="none"/>
  <g class="${P}-beam" style="transform-origin:0px -140px"><path d="M-60 -140 H70" stroke="#7C4A1E" stroke-width="4" stroke-linecap="round"/><circle cx="56" cy="-132" r="6" fill="#57534E" stroke="${L}"/>
    <path d="M-50 -140 V-80 M-50 -80 L-70 -66 M-50 -80 L-30 -66" stroke="${L}" stroke-width="1.2"/><path d="M-74 -66 H-26 Q-30 -56 -50 -56 Q-70 -56 -74 -66Z" fill="#CA8A04" stroke="${L}"/>
    ${[1, 2, 3, 4].map((i) => `<g class="${P}-pan ${P}-pan${i}"><g transform="translate(-50 -66)">${STONES(1.2)}</g></g>`).join('')}</g></g>`;
/** Bảng vàng thi đình. */
const HONOR = `<g transform="translate(${X.court + 150} ${FLOOR})"><path d="M-54 0 V-150 M54 0 V-150" stroke="#7C4A1E" stroke-width="5"/><path d="M-66 -150 H66 L56 -162 H-56Z" fill="#B45309" stroke="${L}"/>
  <rect x="-50" y="-146" width="100" height="98" fill="#FDE047" stroke="${L}" stroke-width="1.2"/><text x="0" y="-128" text-anchor="middle" ${NUN} font-size="11" fill="#B91C1C">BẢNG VÀNG</text>
  ${[0, 1, 2, 3].map((i) => `<path d="M${-36 + i * 22} -116 V-56" stroke="#7F1D1D" stroke-width="2" stroke-dasharray="4 3"/>`).join('')}
  <g class="${P}-name"><rect x="-44" y="-84" width="88" height="22" rx="3" fill="#FEF3C7" stroke="#B91C1C" stroke-width="1.6"/><text x="0" y="-69" text-anchor="middle" ${NUN} font-size="10" fill="#B91C1C">LƯƠNG THẾ VINH</text></g></g>`;

function bg() {
  return `
  ${skyG(0, W, `${P}sky`, '#7DD3FC', '#FEF9C3')}
  <g transform="translate(560 60)">${sun(20)}</g>
  ${cloud(140, 50, 0.8, 0)}${cloud(700, 40, 0.7, 2)}${cloud(1300, 54, 0.9, 4)}${cloud(1900, 44, 0.8, 1)}
  ${hills(-20, 1500, 250, '#A7D7B0', 60)}${hills(1450, 980, 258, '#9BD39C', 50)}
  <rect x="0" y="246" width="${W}" height="${FLOOR - 246}" fill="#A3D977"/>
  <!-- thư phòng -->
  <g transform="translate(${X.study - 30} ${FLOOR})"><rect x="-130" y="-160" width="210" height="160" fill="#FEF3C7" stroke="${L}" stroke-width="1.1"/>
    <path d="M-150 -156 Q-160 -160 -162 -172 Q-148 -162 -136 -166 L-114 -196 H64 L86 -166 Q98 -162 112 -172 Q110 -160 100 -156Z" fill="#B45309" stroke="${L}" stroke-width="1.1"/>
    <rect x="-108" y="-130" width="44" height="50" fill="#BAE6FD" stroke="${L}"/><path d="M-86 -130 V-80 M-108 -105 H-64" stroke="#7C4A1E" stroke-width="1.6"/>
    <g transform="translate(26 -128)"><rect x="-30" y="0" width="60" height="40" rx="2" fill="#92400E" stroke="${L}"/>${[8, 18, 28].map((y) => `<path d="M-26 ${y} H26" stroke="#FDE68A" stroke-width="1"/>${[-18, -8, 2, 12, 20].map((x, j) => `<circle class="${P}-bead" style="animation-delay:${(j + y) * 0.03}s" cx="${x}" cy="${y}" r="3" fill="#FDE68A" stroke="${L}" stroke-width="0.5"/>`).join('')}`).join('')}</g></g>
  ${bamboo(420, FLOOR - 2, 0.85)}
  <!-- sân điện, bảng vàng -->
  ${palace(X.court - 40, FLOOR - 2, 240, { plaque: 'ĐIỆN' })}
  ${HONOR}
  ${flag(P, X.court - 200, FLOOR, { h: 130, w: 34, hh: 24, c: '#DC2626', tri: true })}${flag(P, X.court + 250, FLOOR, { h: 130, w: 34, hh: 24, c: '#FACC15', tri: true })}
  <!-- lớp học xưa -->
  <g transform="translate(${X.school} ${FLOOR})"><rect x="-150" y="-150" width="300" height="150" fill="#FEF3C7" stroke="${L}" stroke-width="1.1"/>
    <path d="M-176 -146 Q-186 -150 -188 -162 Q-174 -152 -162 -156 L-138 -188 H138 L162 -156 Q174 -152 188 -162 Q186 -150 176 -146Z" fill="#B45309" stroke="${L}" stroke-width="1.1"/>
    <rect x="-60" y="-132" width="120" height="40" rx="3" fill="#7F1D1D" stroke="#FACC15" stroke-width="1.6"/><text x="0" y="-116" text-anchor="middle" ${NUN} font-size="9" fill="#FDE68A">ĐẠI THÀNH</text><text x="0" y="-102" text-anchor="middle" ${NUN} font-size="9" fill="#FDE68A">TOÁN PHÁP</text></g>
  <!-- bờ sông: cân treo, đá -->
  ${tree(1420, FLOOR, 1, '')}
  ${SCALE}
  <g class="${P}-pile">${[[-20, 0], [0, 0], [20, 0], [-10, -18], [10, -18]].map(([x, y]) => `<g transform="translate(${X.boat - 250 + x} ${FLOOR + y})">${STONES(1)}</g>`).join('')}</g>
  <!-- sông -->
  <rect x="${X.boat - 230}" y="${WL - 40}" width="${W - X.boat + 230}" height="${315 - WL + 40}" fill="#60A5FA"/>
  ${hills(X.boat - 230, W - X.boat + 230, WL - 40, '#A7D7B0', 30)}
  <rect x="0" y="${FLOOR}" width="${X.boat - 230}" height="${315 - FLOOR}" fill="#C9B27C" stroke="${L}"/>
  ${Array.from({ length: Math.floor((X.boat - 230) / 54) }, (_, i) => `<path d="M${18 + i * 54} ${FLOOR + 12} l3 -7 l3 7" stroke="#A8915E" stroke-width="1.4" fill="none"/>`).join('')}
  <path d="M${X.boat - 250} ${FLOOR + 2} L${X.boat - 186} ${DECK + 2}" stroke="${L}" stroke-width="9" stroke-linecap="round"/><path d="M${X.boat - 250} ${FLOOR + 2} L${X.boat - 186} ${DECK + 2}" stroke="#CA8A04" stroke-width="7" stroke-linecap="round"/>
  <rect class="${P}-tint" x="${X.school + 160}" y="0" width="${W}" height="315" fill="#B45309"/>`;
}

function fg() {
  const bubble = `<g transform="scale(0.36) translate(0 52)"><g class="${P}-tb">${barge('')}<g transform="translate(0 -46) scale(0.8)">${elephant(P)}</g></g>
    <path d="M232 -150 V-60 M212 -84 L232 -56 L252 -84" stroke="#DC2626" stroke-width="10" fill="none" stroke-linecap="round"/></g>
    <path d="M-80 34 H80" stroke="#2563EB" stroke-width="2.4"/>`;
  return `
  <!-- mặt sông phía trước (che thân thuyền dưới nước) -->
  <rect x="${X.boat - 230}" y="${WL}" width="${W - X.boat + 230}" height="${315 - WL}" fill="#60A5FA"/>
  <g class="ek-wave">${Array.from({ length: 10 }, (_, i) => `<path d="M${X.boat - 200 + i * 46} ${WL + 8 + (i % 2) * 7} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <path d="M${X.boat - 230} ${WL} H${W}" stroke="#E0F2FE" stroke-width="2"/>
  <!-- bàn học (che chân người ngồi) -->
  <g transform="translate(${X.study + 40} 0)"><rect x="-44" y="${FLOOR - 40}" width="88" height="8" rx="2" fill="#92400E" stroke="${L}"/><rect x="-38" y="${FLOOR - 32}" width="7" height="32" fill="#78350F"/><rect x="31" y="${FLOOR - 32}" width="7" height="32" fill="#78350F"/>
    ${[-24, -18, -12, 10, 16].map((x, i) => `<path d="M${x} ${FLOOR - 41} l${i % 2 ? 6 : -4} -10" stroke="#DC2626" stroke-width="1.6"/>`).join('')}</g>
  ${[X.school - 70, X.school + 70].map((x) => `<g transform="translate(${x} 0)"><rect x="-34" y="${FLOOR - 30}" width="68" height="7" rx="2" fill="#92400E" stroke="${L}"/><rect x="-28" y="${FLOOR - 23}" width="6" height="23" fill="#78350F"/><rect x="22" y="${FLOOR - 23}" width="6" height="23" fill="#78350F"/></g>`).join('')}
  <rect class="${P}-tint" x="${X.school + 160}" y="${WL}" width="${W}" height="${315 - WL}" fill="#B45309"/>
  ${thought(1610, 92, 190, 112, bubble, [1516, 132], `${P}-bub`)}
  <g class="${P}-nums">${[1, 2, 3].map((i) => `<text class="${P}-num" style="transition-delay:${i * 0.45}s" x="${X.study + 130 + (i - 2) * 44}" y="${150 - (i % 2) * 22}" text-anchor="middle" ${NUN} font-size="22" fill="${['#DC2626', '#2563EB', '#16A34A'][i - 1]}">${['1+2', '3×4', '9−5'][i - 1]}</text>`).join('')}</g>
  ${lb(P, 'maths', label(X.study - 110, 74, 'loved maths', '#2563EB', 16))}
  ${lb(P, 'y1463', label(X.court + 30, 40, 'In 1463', '#B91C1C', 16))}
  ${lb(P, 'trang', label(X.court + 150, 92, 'trang nguyen', '#B91C1C', 15))}
  ${lb(P, 'book', label(X.school, 64, 'Dai Thanh Toan Phap', '#7F1D1D', 14))}
  ${lb(P, 'years', `<g>${['1500', '1600', '1700', '1800'].map((y, i) => `<g class="${P}-yr" style="transition-delay:${0.2 + i * 0.4}s">${label(X.school - 130 + i * 86, 104, y, '#475569', 13)}</g>`).join('')}</g>`)}
  ${lb(P, 'folk', label(X.bank + 40, 40, 'A folk story', '#7C4A1E', 17))}
  ${lb(P, 'visitor', label(1690, 74, 'a foreign visitor', '#1D4ED8', 14))}
  ${lb(P, 'small', label(1600, 80, 'no scale big enough', '#DC2626', 14))}
  ${lb(P, 'down', label(X.boat - 20, 36, 'the boat goes down', '#0369A1', 14))}
  ${lb(P, 'line', label(X.boat + 60, 236, 'a line', '#DC2626', 13))}
  ${lb(P, 'again', label(X.boat + 40, 236, 'the line again', '#DC2626', 13))}
  ${['800', '750', '820', '830'].map((n, i) => lb(P, `w${i + 1}`, label(X.scale - 14, 150, `${n} kg`, '#B45309', 14))).join('')}
  ${lb(P, 'sum', `<g transform="translate(${X.scale + 10} 56)">${label(0, 0, '800 + 750 + 820 + 830', '#475569', 13)}${label(0, 32, '= 3,200 kg', '#B91C1C', 18)}</g>`)}`;
}

const CSS = `
${lbCss(P, ['maths', 'y1463', 'trang', 'book', 'years', 'folk', 'visitor', 'small', 'down', 'line', 'again', 'w1', 'w2', 'w3', 'w4', 'sum'])}
.${P}-num { opacity: 0; transform: translateY(14px); transition: opacity .3s, transform .5s; }
.st-nums .${P}-num { opacity: 1; transform: none; }
.st-nums .${P}-bead { animation: ${P}Bead .5s ease-in-out infinite alternate; }
@keyframes ${P}Bead { to { transform: translateX(5px); } }
.${P}-name { opacity: 0; transform: scale(.4); transform-box: fill-box; transform-origin: 50% 50%; transition: opacity .25s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-name .${P}-name { opacity: 1; transform: none; }
.${P}-yr { opacity: 0; transition: opacity .3s; }
.st-lb-years .${P}-yr { opacity: 1; }
.st-past .${P}-tint { opacity: .16; }
.${P}-bub { opacity: 0; transform: scale(.4); transform-origin: 1530px 136px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-bub .${P}-bub { opacity: 1; transform: none; }
.${P}-tb { transition: transform 1s ease-in .6s; }
.st-bub .${P}-tb { transform: translateY(40px); }
.${P}-line { stroke-dashoffset: 400; }
.${P}-lined .${P}-line { stroke-dashoffset: 0; transition: stroke-dashoffset 1.2s linear; }
.${P}-st { opacity: 0; transform: translateY(-30px); transition: opacity .2s, transform .3s cubic-bezier(.3,1.4,.6,1); }
${[1, 2, 3, 4].map((i) => `.${P}-s${i} .${P}-st${i}`).join(', ')} { opacity: 1; transform: none; }
.${P}-pan { opacity: 0; }
${[1, 2, 3, 4].map((i) => `.st-pan${i} .${P}-pan${i}`).join(', ')} { opacity: 1; }
.${P}-beam { transition: transform .35s cubic-bezier(.3,1.6,.6,1); }
${[1, 2, 3, 4].map((i) => `.st-pan${i} .${P}-beam`).join(', ')} { transform: rotate(-6deg); }
.${P}-pile { transition: opacity .4s; }
.st-loaded .${P}-pile { opacity: 0; }
`;

const OFFS = ['o1', 'o2'];
const BOAT_X = X.boat, EL_ON = X.boat - 10, EL_OFF = X.bank - 10, EL_BACK = 1770;

const BEATS = [
  { key: ['loved maths'], icon: '🧮', label: 'loved maths', async play(st) {
    st.look(X.study, { instant: true });
    st.set('st-lb-maths'); st.sfx('pop', { vol: 0.4 });
    st.act('vinh', 'write'); st.mood('vinh', 'joy');
    st.set('st-nums');
    for (let i = 0; i < 6; i++) { await st.wait(260); st.sfx('tick', { vol: 0.5, rate: 1 + (i % 3) * 0.1 }); }
    await st.wait(900);
    st.act('vinh', null);
  } },
  { key: ['In 1463', 'trang nguyen'], icon: '🎓', label: 'trang nguyen', async play(st) {
    off(st, 'st-lb-maths', 'st-nums');
    st.pose('vinh', 'stand'); st.mood('vinh', 'happy');
    st.set('st-lb-y1463');
    await st.walk('vinh', X.court + 60, { speed: 160, lead: 30 });
    st.set('st-name'); st.sfx('ding', { vol: 0.6 });
    st.face('vinh', 1); st.mood('vinh', 'wow');
    await st.wait(500);
    st.fx('poof', X.court + 60, 200, { quiet: true }); st.sfx('sparkle', { vol: 0.4 });
    redress(st, 'vinh', 'e129_trang', null, true);
    st.set('st-lb-trang'); st.sfx('lion-drum', { vol: 0.6 });
    st.pose('vinh', 'open'); st.mood('vinh', 'joy');
    await st.wait(1400);
    st.pose('vinh', 'stand');
  } },
  { key: ['Dai Thanh Toan Phap', 'used by students'], icon: '📕', label: 'his maths book', async play(st) {
    off(st, 'st-lb-y1463', 'st-lb-trang');
    st.chest('vinh', BOOK); st.pose('vinh', 'carry');
    await st.walk('vinh', X.school - 140, { speed: 160, lead: 110 });
    st.set('st-lb-book'); st.sfx('page-turn', { vol: 0.6 });
    st.chest('vinh', null); st.pose('vinh', 'give');
    st.sfx('whoosh', { vol: 0.4 });
    await Promise.all([
      st.fly(BOOK, [X.school - 120, 180], [X.school - 66, 214], { size: 34, dur: 600 }),
      st.fly(BOOK, [X.school - 120, 180], [X.school + 74, 214], { size: 34, dur: 800 }),
    ]);
    ['p1', 'p2'].forEach((id) => { st.chest(id, BOOK); st.act(id, 'read'); st.mood(id, 'joy'); });
    st.set('st-lb-years');
    for (let i = 0; i < 4; i++) { await st.wait(400); st.sfx('page-turn', { vol: 0.35, rate: 1.1 }); }
    await st.wait(500);
    st.pose('vinh', 'stand');
  } },
  { key: ['a famous folk story'], icon: '📜', label: 'a folk story', async play(st) {
    off(st, 'st-lb-book', 'st-lb-years');
    ['p1', 'p2'].forEach((id) => st.act(id, null));
    st.look(X.bank + 60, { dur: 1600 });
    st.set('st-past'); st.sfx('page-turn', { vol: 0.7 });
    st.place('vinh', 1180, FLOOR, 1);
    await st.wait(700);
    st.set('st-lb-folk'); st.sfx('ding', { vol: 0.4 });
    st.act('ele', `${P}ear`); st.sfx('elephant', { vol: 0.5 });
    await st.wait(1500);
    st.act('ele', null);
  } },
  { key: ['a foreign visitor', 'how heavy an elephant was'], icon: '🐘', label: 'how heavy?', async play(st) {
    st.set('st-lb-folk', false);
    st.look(1680);
    await st.walk('envoy', 1700, { speed: 110, follow: false });
    st.set('st-lb-visitor');
    st.pose('envoy', 'point');
    await st.say('envoy', 'How heavy is the elephant?', 2200);
    st.set('st-lb-visitor', false);
    st.act('ele', `${P}trunk`); st.sfx('elephant', { vol: 0.4 });
    await st.wait(600);
    st.pose('envoy', 'stand');
  } },
  { key: ['Nobody could answer', 'no scale was big enough'], icon: '⚖️', label: 'no scale', async play(st) {
    st.look(1680);
    OFFS.forEach((id) => { st.pose(id, 'shrug'); st.mood(id, 'sad'); });
    st.sfx('buzz-no', { vol: 0.4 });
    await st.wait(900);
    st.hold('o1', 'e129_mini'); st.pose('o1', 'e129_lift'); st.mood('o1', 'wow');
    st.set('st-lb-small'); st.sfx('bump', { vol: 0.4 });
    st.act('o2', 'no');
    await st.wait(1500);
    st.act('o2', null); st.hold('o1', null);
    OFFS.forEach((id) => st.pose(id, 'stand'));
  } },
  { key: ['If we put the elephant on a boat', 'the boat will go down'], icon: '💡', label: 'the boat will go down', async play(st) {
    st.set('st-lb-small', false);
    st.look(1660);
    await st.walk('vinh', 1500, { speed: 120, follow: false });
    st.face('vinh', 1);
    st.pose('vinh', 'pointUp'); st.mood('vinh', 'joy');
    st.sfx('ding', { vol: 0.6 });
    st.set('st-bub'); st.talk('vinh', true);
    await st.wait(1300);
    st.sfx('splash', { vol: 0.35 });
    await st.wait(1300);
    st.talk('vinh', false);
    OFFS.forEach((id) => st.mood(id, 'wow')); st.mood('envoy', 'wow');
    await st.wait(400);
  } },
  { key: ['led onto a boat', 'a line was drawn'], icon: '📏', label: 'a line was drawn', async play(st) {
    st.set('st-bub', false); st.pose('vinh', 'stand');
    st.look(X.boat - 60, { dur: 1400 });
    st.act('ele', null);
    st.show('w1', true); st.place('w1', X.boat - 600, FLOOR, 1);
    st.walk('w1', X.boat - 210, { speed: 140, follow: false });
    st.sfx('elephant', { vol: 0.4 });
    await st.loop('steps', () => st.walk('ele', X.boat - 186, { y: DECK, speed: 60, follow: false }), { vol: 0.6 });
    await st.walk('ele', EL_ON, { speed: 60, follow: false });
    st.sfx('splash', { vol: 0.6 });
    await Promise.all([
      st.walk('boat', BOAT_X, { y: WL + SINK, speed: 14, follow: false }),
      st.walk('ele', EL_ON, { y: DECK + SINK, speed: 14, follow: false }),
    ]);
    st.set('st-lb-down');
    mark(st, 'boat', `${P}-lined`);
    await st.loop('pencil', () => st.wait(1200), { vol: 0.7 });
    st.set('st-lb-line');
    await st.wait(700);
  } },
  { key: ['taken off', 'filled with stones', 'reached the line again'], icon: '🪨', label: 'filled with stones', async play(st) {
    off(st, 'st-lb-down', 'st-lb-line');
    st.look(X.boat - 120);
    st.face('ele', -1);
    await st.walk('ele', X.boat - 186, { speed: 70, follow: false });
    await Promise.all([
      st.walk('ele', EL_BACK, { y: FLOOR, speed: 70, follow: false }),
      st.walk('boat', BOAT_X, { y: WL, speed: 12, follow: false }),
    ]);
    st.face('w1', 1); st.set('st-loaded');
    for (let i = 1; i <= 4; i++) {
      st.pose('w1', 'e129_throw'); st.sfx('whoosh', { vol: 0.35 });
      await st.fly(STONES(1.3), [X.boat - 220, 180], [X.boat - 120 + (i - 1) * 80, WL - 70], { size: 50, dur: 450 });
      mark(st, 'boat', `${P}-s${i}`); st.sfx('bump', { vol: 0.6 });
      st.pose('w1', 'stand');
      await st.walk('boat', BOAT_X, { y: WL + (SINK * i) / 4, speed: 30, follow: false });
    }
    st.set('st-lb-again'); st.sfx('ding', { vol: 0.6 });
    st.mood('vinh', 'joy');
    await st.wait(900);
  } },
  { key: ['the stones were weighed one by one'], icon: '⚖️', label: 'weighed one by one', async play(st) {
    st.set('st-lb-again', false);
    st.look(X.scale + 110, { dur: 1000 });
    for (let i = 1; i <= 4; i++) {
      if (i > 1) st.set(`st-pan${i - 1}`, false);
      st.sfx('whoosh', { vol: 0.3 });
      await st.fly(STONES(1.2), [X.boat - 120 + (i - 1) * 80, WL - 70], [X.scale - 50, FLOOR - 76], { size: 44, dur: 500 });
      mark(st, 'boat', `${P}-s${5 - i}`, false);
      st.set(`st-pan${i}`); st.sfx('knock', { vol: 0.5 });
      if (i > 1) st.set(`st-lb-w${i - 1}`, false);
      st.set(`st-lb-w${i}`); st.sfx('tick', { vol: 0.5 });
      await st.wait(520);
    }
    await st.wait(400);
  } },
  { key: ['add the numbers together', "the elephant's weight"], icon: '➕', label: "the elephant's weight", async play(st) {
    off(st, 'st-lb-w4', 'st-pan4');
    st.look(X.scale - 10);
    st.place('vinh', X.scale - 90, FLOOR, 1); st.place('envoy', X.scale - 230, FLOOR, 1);
    st.pose('vinh', 'point'); st.talk('vinh', true);
    st.set('st-lb-sum'); st.sfx('pencil', { vol: 0.5 });
    await st.wait(1500);
    st.sfx('ding', { vol: 0.6 });
    st.talk('vinh', false); st.mood('envoy', 'wow'); st.pose('envoy', 'clap'); st.act('envoy', 'clap'); st.sfx('clap', { vol: 0.5 });
    st.mood('vinh', 'joy'); st.pose('vinh', 'open');
    await st.wait(1400);
    st.act('envoy', null);
  } },
];

export default {
  id: P, worldW: W, floor: FLOOR, viewTop: 0, camStart: 0, css: KIT_CSS + vsCss(P) + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PR,
  order: [1, 4, 6, 7, 8, 10],
  cast: [
    { id: 'boat', kind: 'thing', svg: BARGE, box: [-210, -60, 420, 70], x: BOAT_X, y: WL },
    { id: 'ele', kind: 'thing', svg: elephant(P), box: [-126, -204, 296, 208], x: EL_OFF, y: FLOOR, s: ES },
    { id: 'p1', kind: 'kid', who: 'e129_pup1', x: X.school - 70 },
    { id: 'p2', kind: 'kid', who: 'e129_pup2', x: X.school + 70 },
    { id: 'o1', kind: 'adult', who: 'e129_off1', x: 1620 },
    { id: 'o2', kind: 'adult', who: 'e129_off2', x: 1560 },
    { id: 'envoy', kind: 'adult', who: 'e129_envoy', x: 1360 },
    { id: 'w1', kind: 'adult', who: 'e129_worker', x: X.boat - 600, s: 0.96 },
    { id: 'vinh', kind: 'adult', who: 'e129_vinh', x: X.study + 10 },
  ],
  init(st) {
    wear(st, 'vinh', HAT.khan); robe(st, 'vinh');
    st.pose('vinh', 'e129_count');
    for (const id of ['o1', 'o2', 'envoy']) robe(st, id);
    wear(st, 'w1', HAT.khan); st.show('w1', false);
    for (const id of ['p1', 'p2']) { wear(st, id, HAT.khan); st.pose(id, 'e129_sitRead'); }
    st.face('ele', -1);
  },
};
