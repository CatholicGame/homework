/**
 * Bài 99 "Vote for Me!" (bài nói: firstly / secondly / moreover / however / furthermore / in conclusion): lớp 6A bầu lớp trưởng.
 * Một lớp học, trái sang phải: cô Hoa → bảng "CLASS MONITOR" → chỗ Minh đứng nói + hòm phiếu VOTE → bốn bàn (Mai, Tom,
 * Tetsuo bạn Nhật, Nam) → góc lớp còn trống (sau thành góc đọc sách + câu lạc bộ cây xanh).
 * Mỗi từ nối là một dòng đánh số trên bảng, viết ra đúng lúc nghe (1 Firstly, 2 Secondly, 3 Moreover, 4 However, 5 Furthermore),
 * và Minh diễn ngay ý của dòng đó (ghé tai nghe, giúp Mai nhặt sách, quét lớp, viết phép tính, đập tay với bạn nước ngoài…).
 * Toạ độ cảnh: rộng 1040, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, room, windowBox, desk, label, books } from '../kit.js';

const FLOOR = 282;
const W = 1040;
const X = { hoa: 112, b0: 160, b1: 400, minh: 440, box: 505, mai: 570, tom: 660, tet: 750, nam: 840, corner: 960 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const CH = `${NUN} fill="#F8FAFC"`;

// ── Đồ vật ─────────────────────────────────────────────────────────────────
const BOOK = (c = '#3B82F6') => `<rect x="-9" y="-6" width="18" height="12" rx="1.5" fill="${c}" stroke="${L}" stroke-width="0.8"/><path d="M-7 -6 V6" stroke="#fff" stroke-width="1"/>`;
const VOTE = `<rect x="-6" y="-8" width="12" height="16" rx="1" fill="#fff" stroke="${L}" stroke-width="0.8"/><path d="M-3 0 l2 3 l4 -6" stroke="#16A34A" stroke-width="1.6" fill="none"/>`;
const PAPER = (score) => `<g transform="translate(0 -24) rotate(-4)"><rect x="-17" y="-20" width="34" height="40" rx="2" fill="#fff" stroke="${L}" stroke-width="1"/>
  <text x="0" y="-8" text-anchor="middle" ${NUN} font-size="7" fill="#1E3A8A">MATHS</text><path d="M-12 -2 H12 M-12 4 H8 M-12 10 H10" stroke="#CBD5E1" stroke-width="1"/>
  <text x="2" y="14" text-anchor="middle" ${NUN} font-size="12" fill="#DC2626" transform="rotate(-8)">5/10</text></g>`;
const SIGN = `<g transform="translate(0 -28)"><rect x="-26" y="-18" width="52" height="34" rx="4" fill="#FDE047" stroke="${L}" stroke-width="1.1"/>
  <text x="0" y="-4" text-anchor="middle" ${NUN} font-size="10" fill="#B91C1C">VOTE</text><text x="0" y="10" text-anchor="middle" ${NUN} font-size="11" fill="#1D4ED8">MINH</text></g>`;
const SCRAP = (r) => `<g transform="rotate(${r})"><path d="M-6 -3 Q-2 -7 3 -5 Q7 -2 5 3 Q0 6 -4 3Z" fill="#fff" stroke="#94A3B8" stroke-width="0.8"/></g>`;
const FLAG_AU = `<rect x="-14" y="-9" width="28" height="18" fill="#1E3A8A" stroke="${L}" stroke-width="0.6"/><rect x="-14" y="-9" width="13" height="9" fill="#1E3A8A"/>
  <path d="M-14 -9 L-1 0 M-1 -9 L-14 0" stroke="#fff" stroke-width="1.6"/><path d="M-7.5 -9 V0 M-14 -4.5 H-1" stroke="#fff" stroke-width="2.4"/><path d="M-7.5 -9 V0 M-14 -4.5 H-1" stroke="#DC2626" stroke-width="1.2"/>
  ${[[6, -5], [10, 0], [6, 5], [2, 1], [-7, 5]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2" fill="#fff"/>`).join('')}`;
const FLAG_JP = `<rect x="-14" y="-9" width="28" height="18" fill="#fff" stroke="${L}" stroke-width="0.6"/><circle r="5" fill="#DC2626"/>`;
/** Huy hiệu cờ trên ngực áo (Tom: Úc, Tetsuo: Nhật). */
const BADGE = (flag) => `<g transform="translate(6 -10) scale(0.5)" class="es-unflip">${flag}</g>`;
const PROPS = {
  e099_broom: `<path d="M0 -4 V46" stroke="${L}" stroke-width="3.6" stroke-linecap="round"/><path d="M0 -4 V46" stroke="#D97706" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M-3 44 H3 L9 62 H-9Z" fill="#FDE68A" stroke="${L}" stroke-width="0.9"/><path d="M-5 50 L-6 60 M0 50 V61 M5 50 L6 60" stroke="#CA8A04" stroke-width="0.8"/>`,
  e099_chalk: `<rect x="-1.6" y="-1" width="3.2" height="8" rx="1" fill="#fff" stroke="${L}" stroke-width="0.5"/>`,
};
const POSES = {
  e099_ear: { R: [150, 238], L: [10, 4], head: 10 },
  e099_sweep: { R: [26, 14], L: [30, 20], head: 10 },
  e099_bend: { R: [44, 64], L: [40, 60], dy: 16, head: 16 },
  e099_bow: { R: [8, 4], L: [8, 4], dy: 6, head: 22 },
  e099_fist: { R: [150, 200], L: [24, -60], head: -4 },
  e099_sitRaise: { R: [160, 178], L: [22, -40], dy: 20 },
  e099_board: { R: [128, 150], L: [10, 4], head: -6 },
  e099_five: { R: [118, 150], L: [10, 4] },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
const LINES = [
  ['1', 'Firstly', 'a good listener'],
  ['2', 'Secondly', 'new ideas'],
  ['3', 'Moreover', 'clean and tidy'],
  ['4', 'However', 'work hard'],
  ['5', 'Furthermore', 'friends with all'],
];
const CLASSMATES = ['mai', 'tom', 'tet', 'nam'];

function bg() {
  const scraps = [[384, 0], [404, 30], [424, -20], [444, 40], [464, 70], [486, -40]].map(([x, r], i) => `<g class="e099-scrap e099-sc${i}"><g transform="translate(${x} ${FLOOR + 6 + (i % 3) * 7})">${SCRAP(r)}</g></g>`).join('');
  return `
  ${room(0, W, FLOOR, '#E0F2FE', '#D9A066')}
  ${windowBox(560, 70, 110, 92)}${windowBox(745, 70, 110, 92)}
  <!-- bảng -->
  <rect x="${X.b0 - 7}" y="46" width="${X.b1 - X.b0 + 14}" height="156" rx="4" fill="#A16207" stroke="${L}"/><rect x="${X.b0}" y="53" width="${X.b1 - X.b0}" height="142" fill="#166534"/>
  <g class="e099-title"><text x="${(X.b0 + X.b1) / 2}" y="75" text-anchor="middle" ${NUN} font-size="16" fill="#FDE68A">CLASS MONITOR</text></g>
  ${LINES.map(([n, w, t], i) => `<g class="e099-ln e099-ln${i + 1}"><text x="${X.b0 + 12}" y="${101 + i * 20}" ${CH} font-size="13"><tspan fill="#FDE68A">${n}</tspan>  <tspan fill="#7DD3FC">${w}:</tspan> ${t}</text></g>`).join('')}
  <path d="M${X.b0 + 6} 195 H${X.b1 - 6}" stroke="#A16207" stroke-width="5"/><rect x="${X.b0 + 30}" y="192" width="12" height="4" fill="#fff"/>
  <!-- tranh bản đồ, đồng hồ -->
  <g transform="translate(470 92)"><circle r="18" fill="#fff" stroke="${L}" stroke-width="1.4"/><path d="M0 0 V-12 M0 0 L8 4" stroke="${L}" stroke-width="2" stroke-linecap="round"/></g>
  <!-- hòm phiếu -->
  <g transform="translate(${X.box} ${FLOOR})"><path d="M-14 0 L-10 -60 M14 0 L10 -60" stroke="#78716C" stroke-width="3"/>
    <rect x="-24" y="-96" width="48" height="38" rx="3" fill="#BAE6FD" stroke="${L}" stroke-width="1.2"/><rect x="-10" y="-98" width="20" height="4" rx="2" fill="${L}"/>
    <text x="0" y="-72" text-anchor="middle" ${NUN} font-size="12" fill="#1D4ED8">VOTE</text>
    <g class="e099-votes">${[-12, -4, 4, 12].map((dx, i) => `<rect class="e099-v e099-v${i + 1}" x="${dx - 4}" y="-66" width="8" height="7" fill="#fff" stroke="${L}" stroke-width="0.5"/>`).join('')}</g></g>
  <!-- góc lớp: góc đọc sách + câu lạc bộ cây -->
  <rect x="${X.corner - 70}" y="${FLOOR - 3}" width="${W - X.corner + 70}" height="6" fill="#B9824F"/>
  <g class="e099-corner"><g transform="translate(${X.corner - 34} 0)">
    <rect x="-34" y="120" width="68" height="${FLOOR - 120}" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
    ${[150, 190, 230].map((y) => `<rect x="-30" y="${y}" width="60" height="5" fill="#78350F"/>`).join('')}
    <g transform="translate(-26 150)">${books(0, 0, 6)}</g><g transform="translate(-26 190)">${books(0, 0, 5)}</g><g transform="translate(-24 230)">${books(0, 0, 6)}</g>
    <ellipse cx="44" cy="${FLOOR - 10}" rx="22" ry="14" fill="#F472B6" stroke="${L}"/>
    <rect x="-40" y="94" width="80" height="20" rx="4" fill="#fff" stroke="${L}"/><text x="0" y="109" text-anchor="middle" ${NUN} font-size="11" fill="#B45309">READING</text></g></g>
  <g class="e099-club"><g transform="translate(${X.corner + 50} 0)">
    <rect x="-28" y="186" width="56" height="6" fill="#A16207" stroke="${L}"/><rect x="-28" y="236" width="56" height="6" fill="#A16207" stroke="${L}"/>
    ${[[-14, 186], [12, 186], [-14, 236], [12, 236]].map(([x, y], i) => `<g transform="translate(${x} ${y})"><path d="M-7 -12 L-5 0 H5 L7 -12Z" fill="#EA580C" stroke="${L}" stroke-width="0.8"/>
      <path d="M0 -12 V-26" stroke="#16A34A" stroke-width="2"/><circle cx="${i % 2 ? 5 : -5}" cy="-24" r="6" fill="#22C55E" stroke="${L}" stroke-width="0.7"/><circle cx="${i % 2 ? -4 : 4}" cy="-30" r="5" fill="#4ADE80" stroke="${L}" stroke-width="0.7"/></g>`).join('')}
    <rect x="-28" y="148" width="56" height="20" rx="4" fill="#fff" stroke="${L}"/><text x="0" y="162" text-anchor="middle" ${NUN} font-size="10" fill="#15803D">PLANTS</text></g></g>
  <g class="e099-empty"><rect x="${X.corner - 72}" y="104" width="${W - X.corner + 60}" height="${FLOOR - 110}" rx="6" fill="none" stroke="#94A3B8" stroke-width="2" stroke-dasharray="7 5"/></g>
  <!-- sàn: giấy vụn, sách rơi -->
  ${scraps}
  <g class="e099-drop"><g transform="translate(${X.mai - 50} ${FLOOR + 4}) rotate(12)">${BOOK('#EF4444')}</g><g transform="translate(${X.mai - 30} ${FLOOR + 8}) rotate(-8)">${BOOK('#22C55E')}</g></g>`;
}

function fg() {
  const think = (x, y, inner) => `<g transform="translate(${x} ${y})"><circle r="16" fill="#fff" stroke="${L}" stroke-width="1.2"/>${inner}</g>`;
  return `
  ${desk(X.mai, FLOOR, '#F59E0B')}${desk(X.tom, FLOOR, '#F59E0B')}${desk(X.tet, FLOOR, '#F59E0B')}${desk(X.nam, FLOOR, '#F59E0B')}
  <g class="e099-desk"><g transform="translate(${X.mai - 14} ${FLOOR - 62})">${BOOK('#EF4444')}</g><g transform="translate(${X.mai + 6} ${FLOOR - 62})">${BOOK('#22C55E')}</g></g>
  <!-- biểu tượng từng ý -->
  <g class="e099-ic e099-ic-ear">${think(X.minh + 34, 118, `<path d="M-4 -8 Q6 -10 6 0 Q6 6 0 8 Q-3 10 -2 5 M-1 -3 Q2 -4 2 0" stroke="${L}" stroke-width="1.6" fill="#FDBA74"/>`)}</g>
  <g class="e099-ic e099-ic-bulb">${think(X.minh + 2, 108, `<path d="M0 -10 Q8 -10 8 -2 Q8 3 4 6 V9 H-4 V6 Q-8 3 -8 -2 Q-8 -10 0 -10Z" fill="#FDE047" stroke="#CA8A04" stroke-width="1.2"/><path d="M-3 12 H3" stroke="${L}" stroke-width="1.4"/>`)}</g>
  <g class="e099-ic e099-ic-prob">${think(X.mai - 6, 142, `<text x="0" y="6" text-anchor="middle" ${NUN} font-size="18" fill="#DC2626">?</text>`)}</g>
  <g class="e099-ic e099-ic-sum"><g transform="translate(${X.b0 + 120} 222)"><rect x="-58" y="-12" width="116" height="22" rx="6" fill="#fff" stroke="${L}"/>
    <text x="0" y="4" text-anchor="middle" ${NUN} font-size="13" fill="#1E3A8A">7 x 8 = 56 <tspan fill="#16A34A">✓</tspan></text></g></g>
  <g class="e099-ic e099-ic-happy"><g transform="translate(${X.minh + 60} 100)"><circle r="26" fill="#FDE047" stroke="#F59E0B" stroke-width="2"/><circle cx="-9" cy="-5" r="3" fill="#78350F"/><circle cx="9" cy="-5" r="3" fill="#78350F"/>
    <path d="M-12 6 Q0 18 12 6" stroke="#78350F" stroke-width="3" fill="none" stroke-linecap="round"/></g></g>
  <!-- nhãn -->
  <g class="e099-lb e099-lb-monitor">${label(X.minh + 30, 100, 'the class monitor', '#1D4ED8', 14)}</g>
  <g class="e099-lb e099-lb-help">${label(X.mai - 20, 108, 'help you', '#16A34A', 14)}</g>
  <g class="e099-lb e099-lb-corner">${label(X.corner - 34, 70, 'a reading corner', '#B45309', 13)}</g>
  <g class="e099-lb e099-lb-club">${label(X.corner + 30, 128, 'a plant club', '#15803D', 13)}</g>
  <g class="e099-lb e099-lb-tidy">${label(300, 222, 'clean and tidy', '#0369A1', 14)}</g>
  <g class="e099-lb e099-lb-maths">${label(X.minh + 60, 106, 'not the best in maths', '#DC2626', 13)}</g>
  <g class="e099-lb e099-lb-never">${label(X.minh + 40, 106, 'never give up', '#EA580C', 14)}</g>
  <g class="e099-lb e099-lb-all">${label(X.minh - 72, 98, 'other countries', '#7C3AED', 13)}</g>
  <g class="e099-lb e099-lb-happier">${label(X.minh + 60, 56, 'a happier place', '#CA8A04', 14)}</g>
  <g class="e099-lb e099-lb-vote">${label(X.box + 40, 112, 'vote for me!', '#B91C1C', 15)}</g>
  <g class="e099-lb e099-lb-thanks">${label(X.minh + 40, 96, 'Thank you!', '#DB2777', 15)}</g>`;
}

const LB = ['monitor', 'help', 'corner', 'club', 'tidy', 'maths', 'never', 'all', 'happier', 'vote', 'thanks'];
const IC = ['ear', 'bulb', 'prob', 'sum', 'happy'];
const CSS = `
.e099-lb, .e099-ic { opacity: 0; transition: opacity .35s; }
${LB.map((k) => `.st-lb-${k} .e099-lb-${k}`).join(', ')}, ${IC.map((k) => `.st-ic-${k} .e099-ic-${k}`).join(', ')} { opacity: 1; }
.e099-title { opacity: 0; transition: opacity .4s; } .st-title .e099-title { opacity: 1; }
.e099-ln { clip-path: inset(0 100% 0 0); }
${[1, 2, 3, 4, 5].map((k) => `.st-ln${k} .e099-ln${k}`).join(', ')} { clip-path: inset(0 0 0 0); transition: clip-path 1.1s linear; }
${[1, 2, 3, 4, 5].map((k) => `.st-hl${k} .e099-ln${k}`).join(', ')} { animation: e099Hl .5s ease-in-out 2 alternate; }
@keyframes e099Hl { to { opacity: .45; } }
.e099-corner, .e099-club { opacity: 0; transform: translateY(12px); transition: opacity .4s, transform .5s cubic-bezier(.3,1.5,.6,1); }
.st-corner .e099-corner, .st-club .e099-club { opacity: 1; transform: none; }
.e099-empty { transition: opacity .3s; } .st-corner .e099-empty { opacity: 0; }
.e099-scrap { transition: opacity .3s; }
${[0, 1, 2, 3, 4, 5].map((k) => `.st-sw${k} .e099-sc${k}`).join(', ')} { opacity: 0; }
.e099-drop { opacity: 0; transition: opacity .2s; } .st-drop .e099-drop { opacity: 1; }
.e099-desk { transition: opacity .2s; } .st-drop .e099-desk { opacity: 0; }
.e099-v { opacity: 0; transition: opacity .2s; }
${[1, 2, 3, 4].map((k) => `.st-v${k} .e099-v${k}`).join(', ')} { opacity: 1; }
.st-ic-happy .e099-ic-happy > g { animation: e099Pop .5s cubic-bezier(.3,1.6,.6,1) both; }
@keyframes e099Pop { from { transform: translate(${X.minh + 60}px, 100px) scale(.2); } to { transform: translate(${X.minh + 60}px, 100px) scale(1); } }
@media (prefers-reduced-motion: reduce) { .st-ic-happy .e099-ic-happy > g { animation-duration: 1s; } }
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
/** Viết một dòng lên bảng: Minh quay vào bảng, phấn chạy, rồi quay lại lớp. */
async function writeLine(st, k) {
  st.face('minh', -1); st.hold('minh', 'e099_chalk'); st.pose('minh', 'e099_board'); st.act('minh', 'write');
  st.set(`st-ln${k}`); st.set(`st-hl${k}`);
  await st.loop('pencil', () => st.wait(1100), { vol: 0.8 });
  st.act('minh', null); st.hold('minh', null); st.face('minh', 1); st.pose('minh', 'stand');
}

const BEATS = [
  { key: ['My name is Minh', 'I would like to be the class monitor'], icon: '🙋', label: 'class monitor', async play(st) {
    st.look(470);
    await st.walk('minh', X.minh, { speed: 120, follow: false });
    st.face('minh', 1);
    st.set('st-title'); st.sfx('ding', { vol: 0.5 });
    st.pose('minh', 'me'); st.mood('minh', 'joy'); st.talk('minh', true); st.set('st-lb-monitor');
    for (const id of CLASSMATES) st.mood(id, 'joy');
    await st.wait(1500);
    st.talk('minh', false); st.pose('minh', 'stand');
  } },
  { key: ['Firstly', 'a good listener'], icon: '👂', label: 'Firstly: a good listener', async play(st) {
    st.set('st-lb-monitor', false);
    st.look(330);
    await writeLine(st, 1);
    st.pose('minh', 'e099_ear'); st.set('st-ic-ear'); st.sfx('pop', { vol: 0.5 });
    await st.wait(1000);
  } },
  { key: ['If you have a problem', 'try to help you'], icon: '🤝', label: 'help you', async play(st) {
    off(st, 'st-ic-ear', 'st-hl1');
    st.look(500);
    st.pose('minh', 'stand');
    st.set('st-drop'); st.sfx('bump', { vol: 0.7 });
    st.set('st-ic-prob'); st.mood('mai', 'sad'); st.pose('mai', 'sad');
    await st.wait(500);
    await st.walk('minh', X.mai - 74, { speed: 140, follow: false });
    st.face('minh', 1); st.pose('minh', 'e099_bend'); st.sfx('page-turn', { vol: 0.5 });
    await st.wait(400);
    st.set('st-drop', false); st.pose('minh', 'give'); st.sfx('whoosh', { vol: 0.4 });
    st.set('st-ic-prob', false); st.set('st-lb-help');
    st.mood('mai', 'joy'); st.pose('mai', 'sitDesk');
    st.fx('hearts', X.mai - 30, 170);
    await st.wait(1000);
  } },
  { key: ['Secondly', 'some new ideas for our class'], icon: '💡', label: 'Secondly: new ideas', async play(st) {
    off(st, 'st-lb-help');
    st.look(330);
    st.pose('minh', 'stand');
    await st.walk('minh', X.minh, { speed: 140, follow: false });
    await writeLine(st, 2);
    st.pose('minh', 'pointUp'); st.mood('minh', 'joy'); st.set('st-ic-bulb'); st.sfx('ding', { vol: 0.6 });
    await st.wait(1000);
  } },
  { key: ['a reading corner', 'a plant club'], icon: '📚', label: 'reading corner', async play(st) {
    off(st, 'st-ic-bulb', 'st-hl2');
    st.pose('minh', 'point');
    await st.look(860, { dur: 1100 });
    st.set('st-corner'); st.set('st-lb-corner'); st.sfx('pop', { vol: 0.6 });
    for (const id of ['tet', 'nam']) { st.face(id, 1); st.mood(id, 'wow'); }
    await st.wait(1000);
    st.set('st-club'); st.set('st-lb-club'); st.sfx('pop', { vol: 0.6, rate: 1.2 });
    for (const id of ['tet', 'nam']) st.mood(id, 'joy');
    await st.wait(1000);
    for (const id of ['tet', 'nam']) st.face(id, -1);
  } },
  { key: ['Moreover', 'keep our classroom clean and tidy'], icon: '🧹', label: 'Moreover: clean and tidy', async play(st) {
    off(st, 'st-lb-corner', 'st-lb-club');
    st.look(400);
    st.pose('minh', 'stand');
    await writeLine(st, 3);
    st.hold('minh', 'e099_broom'); st.pose('minh', 'e099_sweep');
    await st.walk('minh', 360, { speed: 120, follow: false, after: 'e099_sweep' });
    st.face('minh', 1); st.act('minh', 'dig');
    await st.loop('sweep', async () => {
      const go = st.walk('minh', 496, { speed: 70, follow: false, pose: 'e099_sweep', after: 'e099_sweep' });
      for (let i = 0; i < 6; i++) { await st.wait(330); st.set(`st-sw${i}`); }
      await go;
    });
    st.act('minh', null); st.set('st-lb-tidy'); st.mood('minh', 'joy'); st.sfx('ding', { vol: 0.4 });
    await st.wait(700);
  } },
  { key: ['I am not the best student in maths'], icon: '📝', label: 'not the best in maths', async play(st) {
    off(st, 'st-lb-tidy', 'st-hl3');
    st.hold('minh', null);
    st.look(420);
    await st.walk('minh', X.minh, { speed: 140, follow: false });
    st.face('minh', 1);
    st.chest('minh', PAPER()); st.pose('minh', 'carry'); st.sfx('page-turn', { vol: 0.6 });
    await st.wait(500);
    st.mood('minh', 'sad'); st.set('st-lb-maths'); st.sfx('buzz-no', { vol: 0.35 });
    await st.wait(1400);
  } },
  { key: ['However', 'always work hard', 'never give up'], icon: '💪', label: 'However: work hard', async play(st) {
    off(st, 'st-lb-maths');
    st.chest('minh', null);
    st.look(330);
    st.mood('minh', 'happy');
    await writeLine(st, 4);
    st.face('minh', -1); st.hold('minh', 'e099_chalk'); st.pose('minh', 'e099_board'); st.act('minh', 'write');
    st.set('st-ic-sum');
    await st.loop('pencil', () => st.wait(800), { vol: 0.7 });
    st.act('minh', null); st.hold('minh', null); st.sfx('ding', { vol: 0.5 });
    st.face('minh', 1); st.pose('minh', 'e099_fist'); st.mood('minh', 'joy'); st.set('st-lb-never');
    await st.wait(1000);
  } },
  { key: ['Furthermore', 'get on well with everyone', 'friends from other countries'], icon: '🌏', label: 'Furthermore: friends', async play(st) {
    off(st, 'st-ic-sum', 'st-lb-never', 'st-hl4');
    st.look(470);
    st.pose('minh', 'stand');
    st.set('st-ln5'); st.set('st-hl5'); st.sfx('pencil', { vol: 0.6 });
    for (const id of ['tom', 'tet']) { st.pose(id, 'stand'); st.mood(id, 'joy'); }
    await Promise.all([st.walk('tom', X.minh - 50, { speed: 140, follow: false }), st.walk('tet', X.minh - 96, { speed: 140, follow: false })]);
    st.face('tom', 1); st.face('tet', 1); st.face('minh', -1);
    st.chest('tom', BADGE(FLAG_AU)); st.chest('tet', BADGE(FLAG_JP)); st.sfx('pop', { vol: 0.5 }); st.set('st-lb-all');
    st.pose('minh', 'e099_five'); st.pose('tom', 'e099_five');
    await st.wait(300);
    st.sfx('clap', { vol: 0.7 }); st.fx('hearts', X.minh - 26, 150, { quiet: true });
    st.mood('minh', 'joy'); st.sfx('giggle', { vol: 0.5 });
    await st.wait(700);
    st.pose('tom', 'stand'); st.pose('tet', 'e099_five');
    await st.wait(200);
    st.sfx('clap', { vol: 0.6, rate: 1.1 });
    await st.wait(700);
    st.pose('minh', 'stand'); st.pose('tet', 'stand');
  } },
  { key: ['In conclusion', 'a happier place'], icon: '😊', label: 'a happier place', async play(st) {
    off(st, 'st-lb-all', 'st-hl5');
    st.look(470);
    const back = Promise.all([st.walk('tom', X.tom, { speed: 170, follow: false }), st.walk('tet', X.tet, { speed: 170, follow: false })]);
    st.face('minh', 1); st.pose('minh', 'open'); st.talk('minh', true);
    await back;
    for (const id of ['tom', 'tet']) { st.face(id, -1); st.pose(id, 'sitDesk'); }
    st.set('st-ic-happy'); st.set('st-lb-happier'); st.sfx('sparkle', { vol: 0.5 });
    for (const id of CLASSMATES) { st.mood(id, 'joy'); st.act(id, 'hop'); }
    st.mood('minh', 'joy'); st.sfx('giggle', { vol: 0.4 });
    await st.wait(1400);
    st.talk('minh', false);
  } },
  { key: ['please vote for me'], icon: '🗳️', label: 'vote for me!', async play(st) {
    off(st, 'st-ic-happy', 'st-lb-happier');
    st.look(560);
    st.chest('minh', SIGN); st.pose('minh', 'carry'); st.mood('minh', 'joy'); st.set('st-lb-vote');
    st.say('minh', 'Vote for me!', 1300);
    await st.wait(700);
    for (const id of CLASSMATES) { st.pose(id, 'e099_sitRaise'); st.mood(id, 'joy'); }
    st.sfx('cheer', { vol: 0.35 });
    await st.wait(400);
    for (const [i, id] of CLASSMATES.entries()) {
      st.sfx('pop', { vol: 0.5, rate: 0.9 + i * 0.1 });
      await st.fly(VOTE, [X[id], 190], [X.box, 182], { size: 18, dur: 420 });
      st.set(`st-v${i + 1}`);
    }
    for (const id of CLASSMATES) st.pose(id, 'sitDesk');
    await st.wait(300);
  } },
  { key: ['Thank you for listening'], icon: '🙇', label: 'Thank you!', async play(st) {
    off(st, 'st-lb-vote');
    st.look(560);
    st.chest('minh', null);
    st.pose('minh', 'e099_bow'); st.set('st-lb-thanks');
    await st.wait(500);
    for (const id of CLASSMATES) { st.pose(id, 'sitClap'); st.act(id, 'clap'); }
    st.pose('hoa', 'clap'); st.act('hoa', 'clap'); st.mood('hoa', 'joy');
    await st.loop('clap', () => st.wait(1600), { vol: 0.8 });
    st.pose('minh', 'wave'); st.act('minh', 'wave'); st.mood('minh', 'joy');
    await st.wait(600);
  } },
];

export default {
  id: 'en099', worldW: W, floor: FLOOR, viewTop: 40, camStart: 230, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 1, 3, 5, 8, 10],
  cast: [
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: X.hoa, s: 0.95, face: 1 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 250, face: 1 },
    { id: 'mai', kind: 'kid', who: 'mai', x: X.mai, s: 0.98, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: X.tom, face: -1 },
    { id: 'tet', kind: 'kid', who: 'tetsuo', x: X.tet, face: -1 },
    { id: 'nam', kind: 'kid', who: 'nam', x: X.nam, face: -1 },
  ],
  init(st) {
    for (const id of CLASSMATES) st.pose(id, 'sitDesk');
  },
};
