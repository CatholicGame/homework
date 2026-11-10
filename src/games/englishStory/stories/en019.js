/**
 * Bài 19 "At the Fruit Market": cổng chợ → sạp trái cây dài, bày theo đúng thứ tự trong bài (xoài · chuối · nho · [cô bán hàng]
 * · dưa hấu · cam · táo) → sạp rau bên cạnh. Mỗi lần "I want…" thì quả bay vào túi trên bàn cân của cô bán hàng.
 * Toạ độ cảnh: rộng 1300, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, label, palm } from '../kit.js';

const FLOOR = 282;

Object.assign(CAST, {
  e019_seller: { adult: true, hair: 'bun', top: 'blouse', shirt: '#FDBA74', bottom: 'pants', bottomC: '#7C2D12', shoe: '#57534E', hat: 'conical' },
});

// ── Trái cây (gốc ở giữa) ─────────────────────────────────────────────────
const MANGO = `<path d="M-9 -2 Q-8 -10 2 -9 Q10 -7 9 1 Q7 9 -2 7 Q-10 5 -9 -2Z" fill="#FBBF24" stroke="${L}" stroke-width="0.9"/><path d="M-4 -5 q3 -2 6 -1" stroke="#fff" stroke-width="1.2" fill="none" opacity="0.6"/><ellipse cx="6" cy="-6" rx="3" ry="1.4" fill="#84CC16"/>`;
const BANANAS = `${[-10, -2, 6].map((dx, i) => `<path d="M${dx - 2} -12 Q${dx - 8} 2 ${dx + 6} 12 Q${dx + 1} 2 ${dx + 3} -12Z" fill="${i === 1 ? '#FDE047' : '#FACC15'}" stroke="${L}" stroke-width="0.9"/>`).join('')}<rect x="-6" y="-16" width="14" height="5" rx="2" fill="#65A30D" stroke="${L}" stroke-width="0.7"/>`;
const GRAPES = `<path d="M0 -14 V-18 M0 -16 q5 -4 9 -1" stroke="#65A30D" stroke-width="1.6" fill="none"/>${[[-6, -9], [0, -10], [6, -9], [-3, -3], [3, -3], [-6, 3], [0, 3], [6, 3], [-3, 9], [3, 9], [0, 14]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.6" fill="#7C3AED" stroke="${L}" stroke-width="0.6"/>`).join('')}`;
const MELON = (r = 18) => `<circle r="${r}" fill="#22C55E" stroke="${L}" stroke-width="1"/>${[-0.6, -0.2, 0.2, 0.6].map((k) => `<path d="M${r * k} ${-r * 0.95} Q${r * k * 1.5} 0 ${r * k} ${r * 0.95}" stroke="#15803D" stroke-width="${r / 7}" fill="none"/>`).join('')}<path d="M${-r * 0.4} ${-r * 0.6} q${r * 0.3} -${r * 0.2} ${r * 0.6} 0" stroke="#fff" stroke-width="1.4" fill="none" opacity="0.5"/>`;
const ORANGE = `<circle r="8" fill="#F97316" stroke="${L}" stroke-width="0.9"/><circle cx="1" cy="-6" r="1.2" fill="#65A30D"/><path d="M-4 -3 q2 -2 4 -2" stroke="#fff" stroke-width="1.2" fill="none" opacity="0.6"/>`;
const APPLE = `<path d="M0 -6 Q-9 -10 -9 0 Q-8 9 0 8 Q8 9 9 0 Q9 -10 0 -6Z" fill="#EF4444" stroke="${L}" stroke-width="0.9"/><path d="M0 -6 v-4" stroke="#78350F" stroke-width="1.4"/><ellipse cx="3.4" cy="-9" rx="3" ry="1.4" fill="#22C55E"/>`;
const SMALL_BANANA = `<path d="M-8 -6 Q-10 6 6 10 Q-2 4 -4 -6Z" fill="#FDE047" stroke="${L}" stroke-width="1"/><rect x="-6.6" y="-9" width="4" height="4" rx="1" fill="#65A30D"/>`;
const at = (svg, x, y, s = 1, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">${svg}</g>`;
/** Một đống quả trên nia (tâm x, mặt nia y). */
const pile = (svg, x, y, n = 3, dx = 14, dy = 10) => {
  const rows = [];
  for (let r = 0; r < n; r++) for (let i = 0; i < n - r; i++) rows.push(at(svg, x + (i - (n - r - 1) / 2) * dx, y - 8 - r * dy, 1, (i * 37 + r * 19) % 30 - 15));
  return rows.join('');
};
/** Quầy: nia trên chân gỗ, quả xếp chồng, thẻ giá. */
const stand = (x, fruit, price, cls = '') => `<g class="${cls}">
  <path d="M${x - 30} 214 L${x - 26} ${FLOOR} M${x + 30} 214 L${x + 26} ${FLOOR}" stroke="#92400E" stroke-width="5"/><path d="M${x - 28} 250 H${x + 28}" stroke="#92400E" stroke-width="4"/>
  <ellipse cx="${x}" cy="210" rx="40" ry="9" fill="#D6A35C" stroke="${L}" stroke-width="1.1"/><path d="M${x - 34} 208 q34 8 68 0" stroke="#B07D3A" stroke-width="1.2" fill="none"/>
  ${fruit}
  <g transform="translate(${x} 232)"><rect x="-26" y="-8" width="52" height="16" rx="3" fill="#fff" stroke="${L}" stroke-width="0.9"/>
    <text y="4" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="9" fill="#B91C1C">${price}</text></g></g>`;
const BAG_EMPTY = `<path d="M-16 -18 H16 L19 18 H-19Z" fill="#F9A8D4" stroke="${L}" stroke-width="1.1"/><path d="M-9 -18 Q-9 -30 0 -30 Q9 -30 9 -18" stroke="#EC4899" stroke-width="2.6" fill="none"/>`;
const BAG_FULL = `${at(MANGO, -8, -20)}${at(BANANAS, 7, -24, 0.8)}${at(ORANGE, -2, -18)}${at(APPLE, 10, -16)}${BAG_EMPTY}`;
const MONEY = `<rect x="-20" y="-10" width="40" height="20" rx="2" fill="#FCA5A5" stroke="${L}" stroke-width="1"/><circle cx="-10" cy="0" r="6" fill="#FECACA" stroke="#B91C1C" stroke-width="0.6"/>
  <text x="7" y="3" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="7.4" fill="#7F1D1D">200.000</text>`;
const NO = `<path d="M-20 -18 L20 18 M20 -18 L-20 18" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/>`;
const forWho = (x, who, name) => `<g transform="translate(${x} 150)"><circle cx="0" cy="-12" r="22" fill="#fff" stroke="${L}" stroke-width="1.2"/>
  <g transform="translate(0 -10)">${headOnly(who, { s: 0.95 })}</g></g>${label(x, 186, `for ${name}`, '#7C3AED', 12)}`;

const X = { mango: 400, banana: 490, grapes: 580, booth: 680, melon: 780, orange: 870, apple: 960 };

function bg() {
  const awning = (x1, x2, y, a, b) => `${Array.from({ length: Math.ceil((x2 - x1) / 30) }, (_, i) => `<path d="M${x1 + i * 30} ${y} h30 v26 q-15 10 -30 0Z" fill="${i % 2 ? a : b}" stroke="${L}" stroke-width="0.9"/>`).join('')}`;
  return `
  ${sky(0, 1300, 315, 'e019sky')}
  ${cloud(80, 50, 0.9, 0)}${cloud(1130, 60, 1, 3)}
  <path d="M0 236 Q140 214 300 230 T700 226 T1300 228 V282 H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${palm(40, FLOOR - 4, 1)}${palm(1250, FLOOR - 4, 1.05)}
  <rect x="0" y="${FLOOR - 2}" width="1300" height="${317 - FLOOR}" fill="#D6D3D1" stroke="${L}"/>
  ${Array.from({ length: 22 }, (_, i) => `<path d="M${i * 60} ${FLOOR} V315" stroke="#A8A29E" stroke-width="1.2"/>`).join('')}
  <!-- Cổng chợ -->
  ${[150, 262].map((x) => `<rect x="${x - 8}" y="70" width="16" height="${FLOOR - 70}" fill="#DC2626" stroke="${L}"/>`).join('')}
  <rect x="128" y="56" width="156" height="34" rx="6" fill="#FDE047" stroke="${L}" stroke-width="1.4"/>
  <text x="206" y="80" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="17" fill="#B91C1C">FRUIT MARKET</text>
  ${[176, 236].map((x) => `<g class="ek-sway" style="transform-origin:${x}px 90px"><path d="M${x} 90 v8" stroke="${L}"/><ellipse cx="${x}" cy="108" rx="9" ry="11" fill="#EF4444" stroke="${L}"/><path d="M${x - 6} 108 h12" stroke="#FDE047" stroke-width="1.4"/></g>`).join('')}
  <!-- Sạp trái cây: mái bạt, vách gỗ, kệ trên -->
  <rect x="340" y="88" width="660" height="${FLOOR - 88}" fill="#FDE7C2" stroke="${L}"/>
  ${Array.from({ length: 11 }, (_, i) => `<path d="M${340 + i * 60} 88 V${FLOOR}" stroke="#F5D49A" stroke-width="2"/>`).join('')}
  <path d="M344 60 V${FLOOR} M996 60 V${FLOOR}" stroke="#78716C" stroke-width="4"/>
  ${awning(330, 1010, 52, '#EF4444', '#FFFFFF')}
  <rect x="350" y="128" width="640" height="8" rx="2" fill="#A16207" stroke="${L}"/>
  ${Array.from({ length: 8 }, (_, i) => `<g transform="translate(${380 + i * 80} 116)">${i % 2
    ? `<ellipse rx="11" ry="14" fill="#F472B6" stroke="${L}"/>${[-6, 0, 6].map((d) => `<path d="M${d} -10 l${d / 3} -6" stroke="#65A30D" stroke-width="2"/>`).join('')}<ellipse cx="18" cy="2" rx="9" ry="11" fill="#F472B6" stroke="${L}"/>`
    : `<ellipse rx="10" ry="13" fill="#FBBF24" stroke="${L}"/><path d="M-6 -12 l6 -12 l6 12" fill="#65A30D" stroke="${L}" stroke-width="0.8"/>${[-5, 0, 5].map((d) => `<path d="M${d - 3} -4 l3 3 l3 -3 M${d - 3} 4 l3 3 l3 -3" stroke="#B45309" stroke-width="0.7" fill="none"/>`).join('')}<circle cx="20" cy="4" r="10" fill="#A16207" stroke="${L}"/>`}</g>`).join('')}
  <!-- Các quầy theo thứ tự trong bài -->
  ${stand(X.mango, pile(MANGO, X.mango, 206, 3, 15, 9), '40.000đ/kg', 'e019-mango')}
  ${stand(X.banana, `${at(BANANAS, X.banana - 14, 194, 1.2, -10)}${at(BANANAS, X.banana + 12, 194, 1.2, 12)}${at(BANANAS, X.banana, 182, 1.2)}`, '20.000đ', 'e019-banana')}
  ${stand(X.grapes, `<g class="e019-grapepile">${at(GRAPES, X.grapes - 14, 194)}${at(GRAPES, X.grapes + 14, 194)}${at(GRAPES, X.grapes, 186)}</g>`, '80.000đ/kg')}
  <g transform="translate(${X.grapes} 192)"><g class="e019-no">${NO}</g></g>
  ${stand(X.melon, `${at(MELON(18), X.melon - 18, 192)}${at(MELON(18), X.melon + 18, 192)}<g class="e019-topmelon">${at(MELON(18), X.melon, 168)}</g>`, '15.000đ/kg')}
  ${stand(X.orange, pile(ORANGE, X.orange, 206, 4, 15, 10), '35.000đ/kg')}
  ${stand(X.apple, pile(APPLE, X.apple, 206, 4, 16, 11), '60.000đ/kg')}
  <!-- Sạp rau bên cạnh -->
  ${awning(1040, 1220, 92, '#22C55E', '#FFFFFF')}
  <rect x="1050" y="118" width="160" height="${FLOOR - 118}" fill="#DCFCE7" stroke="${L}"/>
  <rect x="1060" y="200" width="140" height="10" rx="3" fill="#A16207" stroke="${L}"/>
  ${[1080, 1110, 1140, 1170].map((x, i) => `<g transform="translate(${x} 196)">${i % 2 ? `<ellipse rx="12" ry="9" fill="#86EFAC" stroke="${L}"/><path d="M-8 -2 q8 -8 16 0" stroke="#22C55E" stroke-width="2" fill="none"/>` : `<path d="M-3 0 L0 -20 L3 0Z" fill="#F97316" stroke="${L}" stroke-width="0.8"/><path d="M0 -20 l-4 -6 M0 -20 l4 -6" stroke="#22C55E" stroke-width="2"/>`}</g>`).join('')}
  <!-- Nhãn chữ -->
  <g class="e019-lb e019-lb-red">${label(X.apple, 160, 'red', '#DC2626', 14)}</g>
  <g class="e019-lb e019-lb-yellow">${label(X.banana, 160, 'yellow', '#CA8A04', 14)}</g>
  <g class="e019-lb e019-lb-green">${label(X.melon, 146, 'green', '#16A34A', 14)}</g>
  <g class="e019-lb e019-lb-orange">${label(X.orange, 160, 'orange', '#EA580C', 14)}</g>
  <g class="e019-lb e019-lb-lan">${forWho(X.orange, 'en_lan', 'Lan')}</g>
  <g class="e019-lb e019-lb-gma">${forWho(X.apple, 'en_grandma', 'Grandma')}</g>
  <g class="e019-lb e019-lb-kind">${label(X.booth, 104, 'kind', '#DB2777', 16)}</g>`;
}

/** Lớp trước: bàn cân của cô bán hàng (che chân cô), túi đựng quả. */
function fg() {
  const b = X.booth;
  return `<rect x="${b - 40}" y="212" width="80" height="${FLOOR - 202}" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="${b - 44}" y="206" width="88" height="9" rx="3" fill="#92400E" stroke="${L}"/>
  <path d="M${b - 34} 230 H${b + 34} M${b - 34} 256 H${b + 34}" stroke="#92400E" stroke-width="2"/>
  <g transform="translate(${b - 18} 206)"><rect x="-14" y="-12" width="28" height="12" rx="2" fill="#E5E7EB" stroke="${L}"/><circle cy="-7" r="4" fill="#fff" stroke="${L}" stroke-width="0.6"/><path d="M0 -7 l2 -3" stroke="#DC2626" stroke-width="0.8"/><ellipse cy="-14" rx="16" ry="3" fill="#CBD5E1" stroke="${L}" stroke-width="0.8"/></g>
  <g class="e019-bag" transform="translate(${b + 20} 188)">
    <g class="e019-in e019-in-mango">${at(MANGO, -8, -20)}</g><g class="e019-in e019-in-banana">${at(BANANAS, 7, -24, 0.8)}</g>
    <g class="e019-in e019-in-orange">${at(ORANGE, -2, -18)}</g><g class="e019-in e019-in-apple">${at(APPLE, 10, -16)}</g>${BAG_EMPTY}</g>`;
}

const CSS = `
.e019-lb { opacity: 0; transition: opacity .3s; }
.st-lb-red .e019-lb-red, .st-lb-yellow .e019-lb-yellow, .st-lb-green .e019-lb-green, .st-lb-orange .e019-lb-orange,
.st-lb-lan .e019-lb-lan, .st-lb-gma .e019-lb-gma, .st-lb-kind .e019-lb-kind { opacity: 1; }
.e019-no { opacity: 0; transform: scale(.3); transition: opacity .3s, transform .35s cubic-bezier(.3,1.6,.6,1); }
.st-noGrapes .e019-no { opacity: 1; transform: scale(1); }
.e019-in { opacity: 0; transition: opacity .25s; }
.st-b-mango .e019-in-mango, .st-b-banana .e019-in-banana, .st-b-orange .e019-in-orange, .st-b-apple .e019-in-apple { opacity: 1; }
.e019-bag { transition: opacity .2s; } .st-bagGone .e019-bag { opacity: 0; }
.e019-topmelon { transition: opacity .2s; } .st-melonTaken .e019-topmelon { opacity: 0; }
.e019-glow { opacity: 0; }
.st-shine .e019-mango, .st-shine .e019-banana { animation: e019Hop .5s ease-in-out 2 alternate; }
@keyframes e019Hop { to { transform: translateY(-4px); } }
`;

const POSES = {
  e019_banana: { R: [120, 172], L: [24, -86] },
};
const PROPS = {
  e019_grapes: `<g transform="translate(0 16)">${GRAPES}</g>`,
  e019_banana: `<g transform="translate(0 -6) rotate(160)">${SMALL_BANANA}</g>`,
};
const WATERMELON = `<g transform="translate(0 -10)">${MELON(20)}</g>`;

/** Quả bay từ quầy vào túi trên bàn cân. */
async function toBag(st, svg, from, name, size = 34) {
  await st.fly(svg, [from, 190], [X.booth + 20, 176], { size, dur: 700 });
  st.set(`st-b-${name}`); st.sfx('bowl-down', { vol: 0.5 });
}

const BEATS = [
  { key: ['at the fruit market'], icon: '🛒', label: 'fruit market', async play(st) {
    st.look(260);
    await Promise.all([
      st.walk('mum', 340, { speed: 120, lead: -20 }),
      (async () => { await st.wait(300); await st.walk('minh', 445, { speed: 140, follow: false }); })(),
    ]);
    st.mood('minh', 'joy'); st.fx('sparkle', 206, 72);
    await st.wait(300);
    st.mood('minh', 'happy');
  } },
  { key: ['many fruits'], icon: '🍉', label: 'many fruits', async play(st) {
    st.set('st-shine');
    st.fx('sparkle', X.mango, 180); st.fx('sparkle', X.grapes, 180);
    await st.look(860, { dur: 1500 });
    st.fx('sparkle', X.orange, 180); st.fx('sparkle', X.apple, 180);
    await st.wait(500);
    st.set('st-shine', false);
  } },
  { key: ['red, yellow, green and orange'], icon: '🎨', label: 'colours', async play(st) {
    st.look(735);
    for (const c of ['red', 'yellow', 'green', 'orange']) { st.set(`st-lb-${c}`); st.sfx('sparkle', { vol: 0.4 }); await st.wait(650); }
    await st.wait(800);
    for (const c of ['red', 'yellow', 'green', 'orange']) st.set(`st-lb-${c}`, false);
  } },
  { key: ['What do you want'], icon: '❓', label: 'What do you want?', async play(st) {
    await st.look(420, { dur: 700 });
    st.pose('mum', 'point');
    await st.say('mum', 'What do you want, Minh?', 1700);
    st.pose('mum', 'stand'); st.pose('minh', 'think');
    await st.wait(300);
  } },
  { key: ['some mangoes'], icon: '🥭', label: 'mangoes', async play(st) {
    await st.walk('minh', 440, { speed: 60, follow: false });
    st.pose('minh', 'point'); st.mood('minh', 'joy');
    st.look(540);
    await st.wait(400);
    st.act('seller', 'nod');
    await toBag(st, pile(MANGO, 0, 10, 2, 14, 9), X.mango, 'mango');
    st.act('seller', null); st.pose('minh', 'stand'); st.mood('minh', 'happy');
    await st.wait(200);
  } },
  { key: ['some bananas'], icon: '🍌', label: 'bananas', async play(st) {
    await st.walk('minh', 534, { speed: 130, follow: false });
    await st.walk('minh', 530, { speed: 40, follow: false });
    st.pose('minh', 'point');
    await st.wait(300);
    await toBag(st, BANANAS, X.banana, 'banana');
    st.pose('minh', 'stand');
    await st.wait(200);
  } },
  { key: ['some grapes'], icon: '🍇', label: 'grapes?', async play(st) {
    st.look(610);
    st.hold('seller', 'e019_grapes'); st.pose('seller', 'give'); st.mood('seller', 'joy');
    await st.say('seller', 'Some grapes?', 1700);
    st.mood('seller', 'happy');
  } },
  { key: ['No, thanks'], icon: '🙅', label: 'No, thanks', async play(st) {
    st.pose('minh', 'open'); st.act('minh', 'no');
    await st.say('minh', 'No, thanks.', 1500);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ["don't want grapes"], icon: '🚫', label: 'no grapes', async play(st) {
    st.hold('seller', null); st.pose('seller', 'stand');
    await st.fly(GRAPES, [X.booth - 30, 190], [X.grapes, 186], { size: 30, dur: 600 });
    st.set('st-noGrapes');
    st.pose('minh', 'point'); st.act('minh', 'no');
    await st.wait(1300);
    st.act('minh', null); st.pose('minh', 'stand'); st.set('st-noGrapes', false);
  } },
  { key: ['a watermelon'], icon: '🍉', label: 'a watermelon', async play(st) {
    await st.walk('minh', 790, { speed: 150, lead: -40 });
    st.pose('minh', 'cheer'); st.mood('minh', 'wow');
    await st.wait(400);
    st.set('st-melonTaken');
    await st.fly(MELON(20), [X.melon, 168], [790, 200], { size: 44, dur: 600 });
    st.chest('minh', WATERMELON); st.pose('minh', 'carry'); st.mood('minh', 'joy');
    await st.wait(700);
    st.mood('minh', 'happy');
  } },
  { key: ['some oranges for Lan'], icon: '🍊', label: 'oranges for Lan', async play(st) {
    await st.walk('mum', 915, { speed: 190, lead: -60 });
    st.set('st-lb-lan'); st.pose('mum', 'point');
    await st.wait(400);
    await toBag(st, pile(ORANGE, 0, 10, 2, 14, 9), X.orange, 'orange');
    await st.wait(600);
    st.set('st-lb-lan', false); st.pose('mum', 'stand');
  } },
  { key: ['some apples for Grandma'], icon: '🍎', label: 'apples for Grandma', async play(st) {
    st.look(860);
    st.set('st-lb-gma'); st.pose('mum', 'point');
    await st.wait(500);
    await toBag(st, pile(APPLE, 0, 10, 2, 15, 10), X.apple, 'apple');
    await st.wait(800);
    st.set('st-lb-gma', false); st.pose('mum', 'stand');
  } },
  { key: ['is kind'], icon: '💖', label: 'kind', async play(st) {
    st.look(780);
    await st.walk('seller', X.booth + 2, { speed: 30, follow: false });
    st.set('st-lb-kind');
    st.mood('seller', 'joy'); st.pose('seller', 'open');
    st.fx('hearts', X.booth, 120);
    await st.wait(2000);
    st.set('st-lb-kind', false); st.pose('seller', 'stand'); st.mood('seller', 'happy');
  } },
  { key: ['Here you are'], icon: '🛍️', label: 'Here you are!', async play(st) {
    st.pose('mum', 'give');
    await st.fly(MONEY, [915, 180], [X.booth, 180], { size: 40, dur: 600 });
    st.pose('mum', 'stand'); st.pose('seller', 'give');
    st.say('seller', 'Here you are!', 1600);
    st.set('st-bagGone');
    await st.fly(BAG_FULL, [X.booth + 20, 188], [915, 196], { size: 44, dur: 700 });
    st.chest('mum', `<g transform="translate(0 10)">${BAG_FULL}</g>`); st.pose('mum', 'carry'); st.pose('seller', 'stand'); st.mood('mum', 'joy');
    await st.wait(700);
    st.mood('mum', 'happy');
  } },
  { key: ['a small banana for you'], icon: '🍌', label: 'small banana', async play(st) {
    st.pose('seller', 'give'); st.mood('seller', 'joy');
    await st.fly(SMALL_BANANA, [X.booth + 30, 170], [800, 150], { size: 26, dur: 650 });
    st.hold('minh', 'e019_banana'); st.pose('minh', 'e019_banana'); st.mood('minh', 'wow');
    st.pose('seller', 'stand'); st.fx('sparkle', 800, 140);
    await st.wait(900);
    st.mood('minh', 'joy');
    await st.say('minh', 'Thank you!', 1200);
  } },
  { key: ['very happy'], icon: '😄', label: 'very happy', async play(st) {
    st.act('minh', 'hop'); st.mood('minh', 'joy');
    st.mood('mum', 'joy'); st.pose('seller', 'wave'); st.act('seller', 'wave'); st.mood('seller', 'joy');
    st.fx('hearts', 790, 140);
    await st.wait(2000);
    st.act('minh', null); st.act('seller', null); st.pose('seller', 'stand');
  } },
];

export default {
  id: 'en019', worldW: 1300, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  cast: [
    { id: 'seller', kind: 'adult', who: 'e019_seller', x: X.booth, s: 0.95, face: -1 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 40, s: 0.95 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 92 },
  ],
};
