/**
 * Bài 6 "Toys on the Floor": phòng chơi của Minh, đồ chơi bày khắp sàn (ô tô · bóng · rô-bốt · búp bê · gấu bông) xếp từ trái
 * sang phải theo đúng thứ tự đếm; hòm đồ chơi và cửa ra hành lang ở bên phải (Mẹ, chị Lan, Lucky vào từ cửa đó).
 * Mỗi câu hỏi "How many…?" thì nhóm đồ chơi đó rung lên và hiện dấu ?, câu trả lời thì hiện số 1, 2, 3… trên từng món.
 * Toạ độ cảnh: rộng 1300, sàn y = 282, đồ chơi đặt trên sàn ở y = 300 (lớp trước, che chân người đứng sau).
 */
import { L, room, windowBox, shelf, books, cloud, label, KIT_CSS } from '../kit.js';

const FLOOR = 282;
const TOY_Y = 302;

// ── Đồ chơi (gốc ở giữa đáy) ──────────────────────────────────────────────
const CAR = (c) => `<path d="M-13 -6 V-11 Q-12 -14 -8 -14 L-5 -20 H5 L9 -14 Q13 -13 13 -10 V-6Z" fill="${c}" stroke="${L}" stroke-width="0.9"/><path d="M-3 -18.6 H4 L7 -14 H-5Z" fill="#BAE6FD" stroke="${L}" stroke-width="0.6"/>
  <circle cx="-7" cy="-5" r="4.4" fill="#1F2937" stroke="${L}" stroke-width="0.8"/><circle cx="7" cy="-5" r="4.4" fill="#1F2937" stroke="${L}" stroke-width="0.8"/><circle cx="-7" cy="-5" r="1.6" fill="#CBD5E1"/><circle cx="7" cy="-5" r="1.6" fill="#CBD5E1"/>`;
const TBALL = (c, d) => `<g transform="translate(0 -11)"><circle r="11" fill="${c}" stroke="${L}"/><path d="M-11 0 Q0 -6 11 0 M0 -11 Q-5 0 0 11" stroke="${d}" stroke-width="2" fill="none"/><path d="M-5 -6 q3 -3 6 -3" stroke="#fff" stroke-width="2" fill="none" opacity="0.7"/></g>`;
const ROBOT = (c) => `<path d="M0 -36 V-41" stroke="${L}" stroke-width="1.4"/><circle cy="-42" r="2.4" fill="#EF4444" stroke="${L}" stroke-width="0.6"/>
  <rect x="-9" y="-36" width="18" height="13" rx="3" fill="${c}" stroke="${L}"/><circle cx="-4" cy="-30" r="2.4" fill="#FDE047" stroke="${L}" stroke-width="0.6"/><circle cx="4" cy="-30" r="2.4" fill="#FDE047" stroke="${L}" stroke-width="0.6"/>
  <rect x="-11" y="-22" width="22" height="15" rx="2" fill="${c}" stroke="${L}"/><rect x="-5" y="-19" width="10" height="6" rx="1" fill="#fff" stroke="${L}" stroke-width="0.5"/>
  <rect x="-15" y="-21" width="4" height="11" rx="2" fill="#94A3B8" stroke="${L}" stroke-width="0.6"/><rect x="11" y="-21" width="4" height="11" rx="2" fill="#94A3B8" stroke="${L}" stroke-width="0.6"/>
  <rect x="-8" y="-7" width="6" height="7" fill="#64748B" stroke="${L}" stroke-width="0.6"/><rect x="2" y="-7" width="6" height="7" fill="#64748B" stroke="${L}" stroke-width="0.6"/>`;
const DOLL = (c, h) => `<path d="M-4 -2 V-8 M4 -2 V-8" stroke="#F6C9A8" stroke-width="2.6"/><path d="M-10 -8 L0 -26 L10 -8Z" fill="${c}" stroke="${L}" stroke-linejoin="round"/>
  <circle cy="-31" r="7" fill="#FDE1C8" stroke="${L}" stroke-width="0.9"/><path d="M-7.4 -31 Q-8 -40 0 -39.4 Q8 -40 7.4 -31 Q6 -36 0 -36 Q-6 -36 -7.4 -31Z" fill="${h}" stroke="${L}" stroke-width="0.7"/>
  <path d="M-7 -32 Q-10 -24 -8 -20 M7 -32 Q10 -24 8 -20" stroke="${h}" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="-2.4" cy="-31" r="1" fill="#2B1D16"/><circle cx="2.4" cy="-31" r="1" fill="#2B1D16"/><path d="M-1.6 -28 q1.6 1.2 3.2 0" stroke="#B4363C" stroke-width="0.8" fill="none"/>`;
const TEDDY = (c = '#C08B5C') => `<ellipse cx="-7" cy="-3" rx="5" ry="3.6" fill="${c}" stroke="${L}" stroke-width="0.8"/><ellipse cx="7" cy="-3" rx="5" ry="3.6" fill="${c}" stroke="${L}" stroke-width="0.8"/>
  <ellipse cy="-12" rx="10" ry="10" fill="${c}" stroke="${L}"/><ellipse cy="-10" rx="5.6" ry="6" fill="#F5E6D3"/>
  <circle cx="-8" cy="-34" r="4" fill="${c}" stroke="${L}" stroke-width="0.8"/><circle cx="8" cy="-34" r="4" fill="${c}" stroke="${L}" stroke-width="0.8"/>
  <circle cy="-27" r="9" fill="${c}" stroke="${L}"/><ellipse cy="-24" rx="4" ry="3" fill="#F5E6D3"/><circle cy="-25.4" r="1.4" fill="#2B1D16"/>
  <circle cx="-3.4" cy="-29" r="1.1" fill="#2B1D16"/><circle cx="3.4" cy="-29" r="1.1" fill="#2B1D16"/><path d="M-6 -16 L0 -13 L6 -16 L4 -12 L0 -11 L-4 -12Z" fill="#EF4444"/>`;

// Nhóm đồ chơi trên sàn: [x, svg] (đúng số lượng của bài)
const GROUPS = {
  cars: { n: 'cars', items: ['#EF4444', '#3B82F6', '#22C55E', '#F59E0B', '#A855F7'].map((c, i) => [380 + i * 38, CAR(c)]) },
  balls: { n: 'balls', items: [['#F472B6', '#fff'], ['#FDE047', '#F97316'], ['#60A5FA', '#fff']].map(([c, d], i) => [590 + i * 34, TBALL(c, d)]) },
  robots: { n: 'robots', items: ['#94A3B8', '#22D3EE'].map((c, i) => [720 + i * 44, ROBOT(c)]) },
  dolls: { n: 'dolls', items: [['#F472B6', '#7C2D12'], ['#A78BFA', '#FACC15'], ['#FB923C', '#1F1716'], ['#34D399', '#7C2D12']].map(([c, h], i) => [826 + i * 32, DOLL(c, h)]) },
  teddies: { n: 'teddy bears', items: ['#C08B5C', '#E0A33A', '#F9A8D4', '#C08B5C', '#FDE68A', '#93C5FD'].map((c, i) => [986 + i * 42, TEDDY(c)]) },
};
const KEYS = Object.keys(GROUPS);
const gx = (k) => { const it = GROUPS[k].items; return (it[0][0] + it[it.length - 1][0]) / 2; };
const SC = 1.35;
const TOP = { cars: 27, balls: 32, robots: 60, dolls: 54, teddies: 52 };
const left = (k) => GROUPS[k].items[0][0] - 46; // chỗ Minh đứng (bên trái nhóm)
const BOX_X = 1338;
const MUM_X = 1402;
const TED_FLOOR = 1234; // gấu của Lucky rơi xuống sàn

const badge = (x, y, n, c = '#2563EB') => `<g transform="translate(${x} ${y})"><circle r="8.5" fill="#fff" stroke="${c}" stroke-width="1.6"/><text y="4" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="11" fill="${c}">${n}</text></g>`;

// Nhãn chữ (lớp trước): tên → [x, y, chữ, màu, cỡ]
const LBL = {
  ohno: [290, 130, 'Oh no!', '#DC2626', 24],
  floor: [700, 214, 'on the floor', '#B45309', 18],
  nothappy: [MUM_X - 96, 150, 'not happy', '#475569', 16],
  howmany: [700, 150, 'How many?', '#7C3AED', 20],
  'q-cars': [gx('cars'), 236, '?', '#DC2626', 24],
  'a-cars': [gx('cars'), 214, '5 cars', '#B91C1C', 18],
  'q-balls': [gx('balls'), 236, '?', '#DC2626', 24],
  'a-balls': [gx('balls'), 214, '3 balls', '#BE185D', 18],
  'q-robots': [gx('robots'), 206, '?', '#DC2626', 24],
  'a-robots': [gx('robots'), 184, '2 robots', '#0E7490', 18],
  'q-dolls': [gx('dolls'), 212, '?', '#DC2626', 24],
  'a-dolls': [gx('dolls') - 70, 150, '4 dolls', '#9333EA', 18],
  lans: [gx('dolls'), 124, "Lan's dolls", '#DB2777', 18],
  'q-teddies': [gx('teddies'), 212, '?', '#DC2626', 24],
  'a-teddies': [gx('teddies'), 190, '6 teddy bears', '#92400E', 17],
  bad: [1130, 150, 'Bad dog!', '#DC2626', 20],
  twenty: [790, 150, '20 toys', '#1D4ED8', 24],
  box: [BOX_X - 170, 196, 'toy box', '#15803D', 18],
  happy: [MUM_X - 90, 150, 'happy', '#DB2777', 20],
  good: [MUM_X - 100, 120, 'Good boy!', '#16A34A', 18],
};

function bg() {
  return `
  ${room(0, 1440, FLOOR, '#E0F2FE')}
  ${room(1440, 120, FLOOR, '#FEF3C7')}
  ${Array.from({ length: 24 }, (_, i) => `<circle cx="${30 + (i * 137) % 1400}" cy="${36 + (i * 61) % 130}" r="3" fill="#BFDBFE"/>`).join('')}
  <!-- Góc trái: giường, cửa sổ -->
  <rect x="14" y="180" width="14" height="102" rx="3" fill="#A16207" stroke="${L}"/>
  <rect x="14" y="234" width="170" height="22" rx="5" fill="#fff" stroke="${L}"/><rect x="14" y="254" width="170" height="10" fill="#1D4ED8" stroke="${L}"/>
  <rect x="34" y="220" width="42" height="16" rx="7" fill="#fff" stroke="${L}"/><path d="M82 238 Q130 228 184 236 V248 H82Z" fill="#FDE047" stroke="${L}"/>
  <rect x="174" y="226" width="10" height="56" rx="3" fill="#A16207" stroke="${L}"/>
  ${windowBox(200, 56, 110, 84)}${cloud(240, 82, 0.55, 2)}
  <!-- Kệ đồ chơi trống (đồ chơi đã ra hết sàn) -->
  ${shelf(400, 120, 200, books(412, 120, 4))}${shelf(400, 178, 200, '')}
  ${shelf(700, 120, 200, '')}${shelf(700, 178, 200, `<g transform="translate(860 178)"><g transform="scale(0.8)">${TEDDY('#FCA5A5')}</g></g>`)}
  <!-- Tranh vẽ của Minh -->
  <g transform="translate(1000 70)"><rect width="76" height="58" rx="3" fill="#fff" stroke="${L}" stroke-width="1.2"/><circle cx="20" cy="18" r="8" fill="#FDE047"/><path d="M8 50 L30 28 L44 42 L56 32 L70 50Z" fill="#86EFAC" stroke="${L}" stroke-width="0.7"/></g>
  <!-- Hòm đồ chơi -->
  <g transform="translate(${BOX_X} ${FLOOR})">
    <g class="e006-boxtoys">${[[-20, TEDDY('#E0A33A')], [2, ROBOT('#22D3EE')], [22, DOLL('#F472B6', '#7C2D12')]].map(([x, s]) => `<g transform="translate(${x} -30) scale(0.9)">${s}</g>`).join('')}</g>
    <rect x="-38" y="-52" width="76" height="52" rx="4" fill="#F97316" stroke="${L}" stroke-width="1.2"/>
    <rect x="-38" y="-52" width="76" height="10" fill="#EA580C" stroke="${L}"/>
    ${[-20, 0, 20].map((x, i) => `<g transform="translate(${x} -22)">${[`<path d="M0 -9 L2.6 -3 L9 -3 L4 1 L6 8 L0 4 L-6 8 L-4 1 L-9 -3 L-2.6 -3Z" fill="#FDE047"/>`, `<circle r="7" fill="#60A5FA"/>`, `<rect x="-6" y="-6" width="12" height="12" fill="#86EFAC"/>`][i]}</g>`).join('')}
    <text y="-4" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="9" fill="#fff">TOYS</text>
    <g class="e006-lid"><rect x="-40" y="-58" width="80" height="8" rx="3" fill="#EA580C" stroke="${L}"/></g>
  </g>
  <!-- Cửa ra hành lang -->
  <rect x="1444" y="102" width="74" height="180" rx="4" fill="#FEF9C3" stroke="${L}" stroke-width="1.2"/>
  <rect x="1449" y="107" width="64" height="175" fill="#FDE68A"/>
  <g class="e006-door"><rect x="1449" y="107" width="64" height="175" fill="#B45309" stroke="${L}"/><rect x="1457" y="117" width="48" height="58" rx="4" fill="#92400E"/><rect x="1457" y="186" width="48" height="84" rx="4" fill="#92400E"/><circle cx="1456" cy="200" r="3.4" fill="#FDE68A" stroke="${L}"/></g>
  <!-- Sàn sáng lên khi nói "on the floor" -->
  <rect class="e006-floorglow" x="340" y="${FLOOR + 2}" width="900" height="${315 - FLOOR - 2}" fill="#FDE047"/>`;
}

function fg() {
  const toys = KEYS.map((k) => GROUPS[k].items.map(([x, s], i) => `<g transform="translate(${x} ${TOY_Y + (i % 2) * 5}) scale(${SC})"><g class="e006-toy e006-t-${k}" style="--j:${(i * 0.07).toFixed(2)}s">${s}</g></g>`).join('')).join('');
  const nums = KEYS.map((k) => GROUPS[k].items.map(([x], i) => `<g class="e006-pop e006-n-${k}" style="--d:${(i * 0.3).toFixed(2)}s">${badge(x, TOY_Y + (i % 2) * 5 - TOP[k] - 10, i + 1)}</g>`).join('')).join('');
  let n = 0;
  const all = KEYS.map((k) => GROUPS[k].items.map(([x], i) => { n++; return `<g class="e006-pop e006-all" style="--d:${(n * 0.1).toFixed(2)}s">${badge(x, TOY_Y + (i % 2) * 5 - TOP[k] - 10, n, '#DC2626')}</g>`; }).join('')).join('');
  return `${toys}
  <g transform="translate(${TED_FLOOR} ${TOY_Y + 2})"><g class="e006-pop e006-ted"><g transform="scale(1.3)">${TEDDY('#A16207')}</g></g></g>
  ${nums}${all}
  <g transform="translate(${MUM_X} 92)"><g class="e006-pop e006-grump"><g class="e006-rain"><ellipse rx="22" ry="10" fill="#94A3B8" stroke="${L}"/><ellipse cx="-12" cy="-6" rx="11" ry="9" fill="#94A3B8" stroke="${L}"/><ellipse cx="8" cy="-8" rx="13" ry="10" fill="#94A3B8" stroke="${L}"/>
    <ellipse rx="21" ry="8" fill="#94A3B8"/><path d="M-2 8 L-6 18 L0 17 L-4 27" stroke="#FACC15" stroke-width="2.4" fill="none" stroke-linejoin="round"/></g></g></g>
  ${Object.entries(LBL).map(([k, [x, y, t, c, s]]) => `<g class="e006-lbl e006-l-${k}">${label(x, y, t, c, s)}</g>`).join('')}`;
}

const CSS = `
.e006-lbl, .e006-pop { opacity: 0; transform: scale(.3); transform-box: fill-box; transform-origin: 50% 100%; transition: opacity .25s, transform .45s cubic-bezier(.3,1.6,.6,1); }
.e006-pop { transition-delay: var(--d, 0s); }
${Object.keys(LBL).map((k) => `.st-l-${k} .e006-l-${k}`).join(', ')} { opacity: 1; transform: none; }
${KEYS.map((k) => `.st-n-${k} .e006-n-${k}`).join(', ')}, .st-all .e006-all, .st-ted .e006-ted, .st-grump .e006-grump { opacity: 1; transform: none; }
.e006-toy { transform-box: fill-box; transform-origin: 50% 100%; transition: opacity .3s; }
${KEYS.map((k) => `.st-q-${k} .e006-t-${k}`).join(', ')}, .st-hop .e006-toy { animation: e006Jig .32s ease-in-out infinite alternate; animation-delay: var(--j); }
@keyframes e006Jig { from { transform: rotate(-7deg); } to { transform: translateY(-4px) rotate(7deg); } }
svg.st-tidy .e006-toy, svg.st-tidy .e006-ted { opacity: 0; transform: scale(.3); }
.e006-boxtoys { opacity: 0; transform: translateY(16px); transition: opacity .3s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.st-tidy .e006-boxtoys { opacity: 1; transform: none; }
.e006-lid { transform-box: fill-box; transform-origin: 0% 100%; transition: transform .4s; }
.st-lid .e006-lid { transform: rotate(-70deg); }
.e006-rain { animation: e006Rain .5s ease-in-out infinite alternate; }
@keyframes e006Rain { to { transform: translateX(3px); } }
.e006-door { transform-origin: 1513px 190px; transition: transform .6s cubic-bezier(.4,0,.2,1); }
.st-door .e006-door { transform: scaleX(.12); }
.e006-floorglow { opacity: 0; transition: opacity .4s; }
.st-floor .e006-floorglow { opacity: .45; }
`;

function lab(st, ...names) {
  const on = names.map((n) => `st-l-${n}`);
  [...st.state].filter((s) => s.startsWith('st-l-') && !on.includes(s)).forEach((s) => st.set(s, false));
  on.forEach((s) => st.set(s));
}
const clear = (st, pre) => [...st.state].filter((s) => s.startsWith(pre)).forEach((s) => st.set(s, false));

/** Câu hỏi "How many X are there?": Minh tới nhóm đó, nhóm rung lên, hiện dấu ?. */
const ask = (k, icon, extra) => ({ key: [`How many ${GROUPS[k].n}`], icon, label: `how many ${GROUPS[k].n}`, async play(st) {
  lab(st); clear(st, 'st-q-');
  const go = st.walk('minh', left(k), { speed: 150, lead: 60 });
  if (extra) await Promise.all([go, extra(st)]); else await go;
  st.pose('minh', 'think');
  st.set(`st-q-${k}`); lab(st, `q-${k}`);
  await st.wait(1000);
  st.pose('minh', 'stand');
} });
/** Câu trả lời: số 1, 2, 3… hiện lần lượt trên từng món, rồi nhãn "5 cars". */
const answer = (k, icon, label, key) => ({ key: [key], icon, label, async play(st) {
  clear(st, 'st-q-'); lab(st);
  st.pose('minh', 'point'); st.act('minh', 'point');
  st.set(`st-n-${k}`);
  await st.wait(GROUPS[k].items.length * 300 + 400);
  lab(st, `a-${k}`); st.fx('sparkle', gx(k), TOY_Y - 30, { quiet: true });
  st.act('minh', null); st.pose('minh', 'stand'); st.mood('minh', 'joy');
  await st.wait(800);
  st.mood('minh', 'happy');
} });

const BEATS = [
  { key: ['Oh no!'], icon: '😱', label: 'oh no', async play(st) {
    st.look(420);
    st.pose('minh', 'e006_cheeks'); st.mood('minh', 'wow'); st.act('minh', 'shiver');
    lab(st, 'ohno');
    await st.wait(1500);
    st.act('minh', null);
  } },
  { key: ['on the floor'], icon: '🧸', label: 'on the floor', async play(st) {
    lab(st);
    st.pose('minh', 'stand'); st.mood('minh', 'happy');
    await st.look(700, { dur: 1100 });
    st.set('st-floor'); st.set('st-hop'); lab(st, 'floor');
    await st.wait(1300);
    st.set('st-hop', false);
  } },
  { key: ['Mum is not happy'], icon: '😠', label: 'not happy', async play(st) {
    lab(st); st.set('st-floor', false);
    await st.look(MUM_X, { dur: 800 });
    st.set('st-door'); st.sfx('door-open');
    st.show('mum', true);
    await st.walk('mum', MUM_X, { speed: 110, follow: false });
    st.pose('mum', 'hips'); st.mood('mum', 'wow'); st.act('mum', 'no');
    st.set('st-grump'); lab(st, 'nothappy');
    await st.wait(1200);
    st.act('mum', null); st.set('st-door', false);
  } },
  { key: ['How many toys'], icon: '❓', label: 'how many toys', async play(st) {
    lab(st);
    await st.look(700, { dur: 900 });
    st.pose('minh', 'shrug'); st.mood('minh', 'wow');
    st.set('st-hop'); lab(st, 'howmany');
    await st.wait(1200);
    st.set('st-hop', false); st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  ask('cars', '🚗'),
  answer('cars', '5️⃣', 'five cars', 'five cars'),
  ask('balls', '⚽'),
  answer('balls', '3️⃣', 'three balls', 'three balls'),
  ask('robots', '🤖'),
  answer('robots', '2️⃣', 'two robots', 'two robots'),
  // Lan vào phòng (để nhận búp bê) trong lúc Minh đi tới chỗ búp bê
  ask('dolls', '🪆', async (st) => {
    st.set('st-door'); st.sfx('door-open'); st.show('lan', true);
    await st.walk('lan', gx('dolls') + 2, { speed: 230, follow: false });
    st.set('st-door', false);
  }),
  answer('dolls', '4️⃣', 'four dolls', 'four dolls'),
  { key: ["Lan's dolls"], icon: '👧', label: "Lan's dolls", async play(st) {
    lab(st, 'lans');
    st.pose('lan', 'carry'); st.chest('lan', `<g transform="translate(0 6) scale(0.9)">${DOLL('#F472B6', '#7C2D12')}</g>`);
    st.mood('lan', 'joy'); st.act('lan', 'hop');
    st.fx('hearts', gx('dolls') + 2, FLOOR - 120);
    await st.wait(1800);
    st.act('lan', null); st.mood('lan', 'happy');
  } },
  ask('teddies', '🧸'),
  { key: ['There are six!'], icon: '6️⃣', label: 'six', async play(st) {
    clear(st, 'st-q-'); lab(st);
    st.pose('minh', 'point'); st.act('minh', 'point');
    st.set('st-n-teddies');
    await st.wait(6 * 300 + 300);
    lab(st, 'a-teddies'); st.fx('sparkle', gx('teddies'), TOY_Y - 30, { quiet: true });
    st.act('minh', null); st.pose('minh', 'cheer'); st.mood('minh', 'joy');
    await st.wait(700);
    st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['Lucky has got a teddy bear'], icon: '🐶', label: 'Lucky', async play(st) {
    lab(st);
    await st.look(1200, { dur: 700 });
    st.set('st-door'); st.sfx('door-open');
    st.show('lucky', true); st.show('teddy', true);
    st.act('lucky', 'wag'); st.mood('lucky', 'joy');
    await Promise.all([st.walk('lucky', 1266, { speed: 150, follow: false }), st.walk('teddy', 1266, { speed: 150, follow: false })]);
    st.set('st-door', false);
    st.act('lucky', 'jump');
    await st.wait(900);
    st.act('lucky', null);
  } },
  { key: ['Bad dog!'], icon: '🙅', label: 'bad dog', async play(st) {
    st.look(1110, { dur: 500 });
    st.pose('minh', 'point'); st.act('minh', 'no'); st.mood('minh', 'wow');
    lab(st, 'bad');
    st.say('minh', 'Bad dog!', 1300);
    await st.wait(500);
    st.show('teddy', false); st.set('st-ted');
    st.dog('lucky', 'sit'); st.mood('lucky', 'happy');
    await st.wait(1000);
    st.act('minh', null); st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['twenty toys on the floor'], icon: '🔢', label: 'twenty toys', async play(st) {
    lab(st); KEYS.forEach((k) => st.set(`st-n-${k}`, false));
    await st.look(560, { dur: 600 });
    st.set('st-all');
    await st.look(1010, { dur: 2200 });
    lab(st, 'twenty'); st.fx('sparkle', 790, 140, { quiet: true });
    await st.wait(700);
  } },
  { key: ['in the toy box'], icon: '📦', label: 'toy box', async play(st) {
    lab(st);
    st.set('st-all', false);
    st.set('st-lid');
    st.dog('lucky', 'stand'); st.act('lucky', 'wag');
    await Promise.all([st.walk('minh', 1288, { speed: 160, lead: 30 }), st.walk('lucky', 1180, { speed: 120, follow: false })]);
    st.pose('minh', 'give');
    const flyers = KEYS.map((k, i) => (async () => { await st.wait(i * 160); await st.fly(GROUPS[k].items[0][1], [gx(k), TOY_Y - 14], [BOX_X, FLOOR - 60], { size: 54, dur: 650 }); })());
    await Promise.all(flyers);
    st.set('st-tidy'); st.sfx('bowl-down');
    lab(st, 'box');
    st.pose('minh', 'stand');
    await st.wait(400);
  } },
  { key: ['Mum is happy'], icon: '😊', label: 'Mum is happy', async play(st) {
    st.set('st-grump', false); st.set('st-lid', false);
    st.pose('mum', 'clap'); st.act('mum', 'clap'); st.mood('mum', 'joy');
    lab(st, 'happy'); st.fx('hearts', MUM_X, 120);
    await st.wait(1600);
    st.act('mum', null); st.pose('mum', 'stand');
  } },
  { key: ['Good boy, Minh!'], icon: '👍', label: 'good boy', async play(st) {
    lab(st, 'good');
    st.pose('mum', 'wave'); st.act('mum', 'wave');
    st.pose('minh', 'cheer'); st.act('minh', 'cheer'); st.mood('minh', 'joy');
    st.dog('lucky', 'stand'); st.act('lucky', 'wag'); st.mood('lucky', 'joy');
    st.fx('sparkle', 1288, 150);
    await st.say('mum', 'Good boy, Minh!', 1800);
    st.act('mum', null); st.act('minh', null); st.pose('mum', 'stand'); st.pose('minh', 'stand');
  } },
];

const TEDDY_MOUTH = `<g transform="translate(46 -24) rotate(-10) scale(1.25)">${TEDDY('#A16207')}</g>`;

export default {
  id: 'en006', worldW: 1560, floor: FLOOR, viewTop: 40, camStart: 60, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: {
    e006_cheeks: { R: [120, -116], L: [120, -116], head: 0 },
  },
  cast: [
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 290 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 1480, s: 0.95, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 1480, s: 1.08, face: -1 },
    { id: 'lucky', kind: 'dog', x: 1484, s: 0.9, face: -1 },
    { id: 'teddy', kind: 'thing', svg: TEDDY_MOUTH, box: [-50, -80, 110, 84], x: 1484, s: 0.9, face: -1 },
  ],
  init(st) {
    ['mum', 'lan', 'lucky', 'teddy'].forEach((id) => st.show(id, false));
  },
};
