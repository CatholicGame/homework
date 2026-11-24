/**
 * 🎮 Thử xem: hình vẽ chạm được trong bước 👀 Học của 📐 Ngữ pháp tiếng Anh (src/games/enGrammar.js).
 * Bé chạm nút → hình đổi (mèo chạy vào hộp, thêm vịt xuống ao, chỉ gần / chỉ xa…), câu tiếng Anh đổi theo và được đọc to.
 *
 * DEMOS[id bài] = {
 *   groups: [{ key, opts: [{ v, label, sub? }] }]   một hàng nút cho mỗi nhóm
 *   init:   { key: v }                              trạng thái đầu
 *   say(st) → { en: 'The cat is *in* the box.', vi }  câu hiện + đọc (*từ* được tô)
 *   draw(st) → nội dung SVG 480×300
 * }
 * Phần tử có data-k giữ nguyên giữa các trạng thái thì trượt từ chỗ cũ sang chỗ mới (enGrammar.js swapDemo),
 * phần tử mới thì nảy ra. data-k đặt trên <g> KHÔNG có transform (transform nằm ở <g> con).
 * Nhân vật: cast.js của Tiếng Việt 3 (person), con vật + đồ vật vẽ ở đây cùng lối: màu phẳng, viền nâu mảnh.
 */
import { person, lying } from '../tiengViet3/cast.js';
import { LINE, cloud, sun, tree, tufts, flowers } from '../tiengViet3/sceneKit.js';

const G = 262; // mặt đất
const k = (key, inner) => `<g data-k="${key}">${inner}</g>`;
const at = (x, y, inner, s = 1) => `<g transform="translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ''}">${inner}</g>`;
const FONT = 'Nunito, sans-serif';
const label = (x, y, t, { c = '#1E3A8A', bg = '#fff', s = 18 } = {}) => {
  const w = t.length * s * 0.58 + 18;
  return `<g transform="translate(${x} ${y})"><rect x="${-w / 2}" y="${-s * 0.9}" width="${w}" height="${s * 1.5}" rx="${s * 0.7}" fill="${bg}" stroke="${LINE}" stroke-width="1"/>
    <text y="${s * 0.22}" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="${s}" fill="${c}">${t}</text></g>`;
};
const bubble = (x, y, t, s = 17) => {
  const w = t.length * s * 0.55 + 22;
  return `<g transform="translate(${x} ${y})"><path d="M${-w / 2} -30 H${w / 2} Q${w / 2 + 8} -30 ${w / 2 + 8} -20 V-6 Q${w / 2 + 8} 4 ${w / 2} 4 H8 L0 16 L-6 4 H${-w / 2} Q${-w / 2 - 8} 4 ${-w / 2 - 8} -6 V-20 Q${-w / 2 - 8} -30 ${-w / 2} -30Z" fill="#fff" stroke="${LINE}" stroke-width="1.2"/>
    <text y="-8" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="${s}" fill="#1E3A8A">${t}</text></g>`;
};
const spot = (x, w = 70) => `<ellipse cx="${x}" cy="${G + 2}" rx="${w / 2}" ry="9" fill="#FDE047" stroke="#F59E0B" stroke-width="1.5"/>`;

// ── cảnh nền ──
const shadow = (x, w, y = G) => `<ellipse cx="${x}" cy="${y + 1}" rx="${w / 2}" ry="${Math.max(3, w / 12)}" fill="#14532D" opacity=".16"/>`;
const farTree = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-2.5" y="-14" width="5" height="14" fill="#8B5E3C"/><circle cy="-22" r="13" fill="#4ADE80"/><circle cx="-7" cy="-17" r="8" fill="#22C55E"/></g>`;
const outdoor = ({ noSun = false } = {}) => `<defs><linearGradient id="egSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7DD3FC"/><stop offset=".75" stop-color="#E0F2FE"/></linearGradient></defs>
  <rect width="480" height="300" fill="url(#egSky)"/>${noSun ? '' : sun(420, 46, 18)}${cloud(90, 50, 1)}${cloud(300, 34, 0.8)}
  <path d="M0 ${G - 40} Q70 ${G - 78} 150 ${G - 52} Q230 ${G - 30} 300 ${G - 62} Q390 ${G - 92} 480 ${G - 48} V300 H0Z" fill="#A7F3D0"/>
  ${farTree(40, G - 52, 0.9)}${farTree(176, G - 44, 0.7)}${farTree(338, G - 64, 0.8)}${farTree(456, G - 50, 0.75)}
  <path d="M0 ${G - 18} Q120 ${G - 36} 240 ${G - 22} T480 ${G - 24} V300 H0Z" fill="#86EFAC"/>
  <path d="M0 ${G - 4} Q160 ${G - 16} 320 ${G - 6} T480 ${G - 4} V300 H0Z" fill="#4ADE80" stroke="${LINE}" stroke-width="1"/>
  <path d="M0 ${G + 14} Q160 ${G + 4} 320 ${G + 12} T480 ${G + 12}" stroke="#86EFAC" stroke-width="5" fill="none" opacity=".6"/>
  ${tufts([[18, 298], [130, 296], [262, 299], [352, 297], [470, 296]], '#16A34A')}${flowers([[60, 298, '#F472B6'], [212, 300, '#FDE047'], [404, 299, '#F9A8D4']])}`;
const indoor = () => `<defs><pattern id="egWall" width="26" height="26" patternUnits="userSpaceOnUse"><rect width="26" height="26" fill="#FEF3C7"/><circle cx="13" cy="13" r="2.2" fill="#FDE68A"/></pattern></defs>
  <rect width="480" height="300" fill="url(#egWall)"/>
  <rect y="${G - 14}" width="480" height="10" fill="#D6A26B" stroke="${LINE}" stroke-width="1"/>
  <rect y="${G - 4}" width="480" height="${304 - G}" fill="#E9C99A" stroke="${LINE}" stroke-width="1"/>
  ${[60, 150, 240, 330, 420].map((x, i) => `<path d="M${x + (i % 2) * 20} ${G - 4} V300" stroke="#C9A06A" stroke-width="1.5"/>`).join('')}
  <rect x="350" y="22" width="96" height="70" rx="4" fill="#BAE6FD" stroke="${LINE}" stroke-width="1.5"/><path d="M398 22 V92 M350 57 H446" stroke="${LINE}" stroke-width="1.5"/>
  <path d="M344 18 H452 M344 18 Q340 60 352 96 M452 18 Q456 60 444 96" stroke="#F472B6" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>
  <g transform="translate(36 ${G - 14})"><path d="M-12 0 L-9 -22 H9 L12 0Z" fill="#F97316" stroke="${LINE}" stroke-width="1"/><path d="M0 -22 Q-16 -40 -18 -58 M0 -22 Q4 -46 14 -62 M0 -22 Q-2 -44 -2 -66" stroke="#16A34A" stroke-width="3" fill="none"/>
    ${[[-18, -58], [14, -62], [-2, -66], [-10, -42], [8, -46]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="8" ry="5" fill="#22C55E" stroke="#15803D" stroke-width=".8" transform="rotate(-30 ${x} ${y})"/>`).join('')}</g>`;

// ── con vật, đồ vật (gốc ở chân, giữa) ──
export function cat(c = '#FB923C', { sit = false } = {}) {
  const d = '#C2410C';
  return `<g>
    <path d="M26 -14 Q48 -20 44 -46" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <ellipse cx="6" cy="-20" rx="${sit ? 20 : 27}" ry="${sit ? 22 : 17}" fill="${c}" stroke="${LINE}" stroke-width="1.2"/>
    ${sit ? '' : `<rect x="-16" y="-10" width="7" height="12" rx="3" fill="${c}" stroke="${LINE}" stroke-width="1"/><rect x="20" y="-10" width="7" height="12" rx="3" fill="${c}" stroke="${LINE}" stroke-width="1"/>`}
    <g transform="translate(-16 ${sit ? -46 : -38})">
      <path d="M-15 -8 L-13 -26 L-3 -14Z M15 -8 L13 -26 L3 -14Z" fill="${c}" stroke="${LINE}" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M-11 -12 L-11 -20 L-6 -14Z M11 -12 L11 -20 L6 -14Z" fill="#FDA4AF"/>
      <circle r="17" fill="${c}" stroke="${LINE}" stroke-width="1.2"/>
      <path d="M-4 -16 L0 -10 L4 -16" stroke="${d}" stroke-width="2" fill="none"/>
      <circle cx="-6" cy="-2" r="2.6" fill="#1F1716"/><circle cx="6" cy="-2" r="2.6" fill="#1F1716"/>
      <path d="M-2 4 Q0 6 2 4" stroke="#1F1716" stroke-width="1.4" fill="none"/><path d="M-1.5 2 h3 l-1.5 1.6z" fill="#F43F5E"/>
      <path d="M-9 4 H-20 M-9 7 L-19 10 M9 4 H20 M9 7 L19 10" stroke="${LINE}" stroke-width="0.8"/>
    </g></g>`;
}
export function dog(c = '#FCD34D') {
  return `<g>
    <path d="M26 -26 Q40 -34 38 -46" stroke="${c}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <ellipse cx="8" cy="-22" rx="28" ry="17" fill="${c}" stroke="${LINE}" stroke-width="1.2"/>
    ${[-14, -2, 18, 28].map((x) => `<rect x="${x - 3.5}" y="-12" width="7" height="13" rx="3" fill="${c}" stroke="${LINE}" stroke-width="1"/>`).join('')}
    <g transform="translate(-18 -40)">
      <circle r="18" fill="${c}" stroke="${LINE}" stroke-width="1.2"/>
      <path d="M-14 -10 Q-26 -2 -20 16 Q-12 14 -10 -2Z M14 -10 Q26 -2 20 16 Q12 14 10 -2Z" fill="#B45309" stroke="${LINE}" stroke-width="1"/>
      <ellipse cx="0" cy="7" rx="9" ry="7" fill="#FEF3C7"/><ellipse cx="0" cy="3" rx="3.6" ry="2.6" fill="#1F1716"/>
      <circle cx="-6" cy="-4" r="2.6" fill="#1F1716"/><circle cx="6" cy="-4" r="2.6" fill="#1F1716"/>
      <path d="M-3 9 Q0 12 3 9" stroke="#1F1716" stroke-width="1.3" fill="none"/>
    </g></g>`;
}
const duck = () => `<g>
  <ellipse cx="4" cy="-12" rx="22" ry="13" fill="#FDE047" stroke="${LINE}" stroke-width="1.2"/>
  <path d="M10 -16 Q20 -26 26 -14" fill="#FACC15" stroke="${LINE}" stroke-width="1"/>
  <circle cx="-14" cy="-30" r="11" fill="#FDE047" stroke="${LINE}" stroke-width="1.2"/>
  <path d="M-24 -30 L-34 -27 L-24 -24Z" fill="#FB923C" stroke="${LINE}" stroke-width="1"/><circle cx="-17" cy="-32" r="2" fill="#1F1716"/></g>`;
const ball = (r = 18, c = '#EF4444') => `<g><circle cy="${-r}" r="${r}" fill="${c}" stroke="${LINE}" stroke-width="1.4"/>
  <path d="M${-r} ${-r} Q0 ${-r * 0.4} ${r} ${-r}" stroke="#fff" stroke-width="${r / 6}" fill="none"/><ellipse cx="${-r * 0.4}" cy="${-r * 1.4}" rx="${r * 0.22}" ry="${r * 0.14}" fill="#fff" opacity=".7"/></g>`;
const box = (part) => (part === 'back'
  ? '<g><path d="M-48 -64 L-40 -78 H40 L48 -64Z" fill="#B45309" stroke="#6B4A3A" stroke-width="1.2"/></g>'
  : `<g><rect x="-48" y="-64" width="96" height="64" fill="#D97706" stroke="${LINE}" stroke-width="1.4"/><path d="M-48 -64 L-62 -50 M48 -64 L62 -50" stroke="${LINE}" stroke-width="1.2"/>
     <path d="M-48 -64 L-62 -50 L-54 -46 L-40 -60Z M48 -64 L62 -50 L54 -46 L40 -60Z" fill="#F59E0B" stroke="${LINE}" stroke-width="1"/><rect x="-14" y="-64" width="28" height="64" fill="#FBBF24" opacity=".6"/></g>`);
const table = () => `<g><rect x="-70" y="-84" width="140" height="12" rx="3" fill="#A16207" stroke="${LINE}" stroke-width="1.4"/>
  <rect x="-62" y="-72" width="10" height="72" fill="#92400E" stroke="${LINE}" stroke-width="1"/><rect x="52" y="-72" width="10" height="72" fill="#92400E" stroke="${LINE}" stroke-width="1"/></g>`;
const house = () => `<g><rect x="-60" y="-80" width="120" height="80" fill="#FDE68A" stroke="${LINE}" stroke-width="1.4"/><path d="M-74 -76 L0 -132 L74 -76Z" fill="#EF4444" stroke="${LINE}" stroke-width="1.4"/>
  <rect x="-14" y="-46" width="28" height="46" fill="#92400E" stroke="${LINE}" stroke-width="1"/><rect x="-48" y="-62" width="24" height="22" fill="#BAE6FD" stroke="${LINE}" stroke-width="1"/><rect x="24" y="-62" width="24" height="22" fill="#BAE6FD" stroke="${LINE}" stroke-width="1"/></g>`;
const kite = () => `<g><path d="M0 -40 L18 -14 L0 14 L-18 -14Z" fill="#A78BFA" stroke="${LINE}" stroke-width="1.2"/><path d="M0 -40 V14 M-18 -14 H18" stroke="${LINE}" stroke-width="0.8"/>
  <path d="M0 14 Q8 30 -4 44 Q-14 58 0 70" stroke="${LINE}" stroke-width="1" fill="none"/></g>`;
const bag = () => `<g><rect x="-16" y="-34" width="32" height="34" rx="6" fill="#F472B6" stroke="${LINE}" stroke-width="1.2"/><path d="M-10 -34 Q0 -48 10 -34" stroke="${LINE}" stroke-width="2.4" fill="none"/><rect x="-10" y="-22" width="20" height="10" rx="3" fill="#FBCFE8" stroke="${LINE}" stroke-width="0.8"/></g>`;
const dashed = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#2563EB" stroke-width="3" stroke-dasharray="7 6" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="5" fill="#2563EB"/>`;
const NUM = ['', 'one', 'two', 'three', 'four', 'five'];
const NUM_VI = ['', 'một', 'hai', 'ba', 'bốn', 'năm'];

// ── Bài 1: I am / He is / They are ──
const g01 = {
  groups: [{ key: 'who', opts: [{ v: 'I', label: 'I', sub: 'tớ' }, { v: 'He', label: 'He', sub: 'bạn trai' }, { v: 'She', label: 'She', sub: 'bạn gái' }, { v: 'It', label: 'It', sub: 'con vật' }, { v: 'They', label: 'They', sub: 'họ' }] }],
  init: { who: 'I' },
  say: ({ who }) => ({
    I: { en: 'I *am* happy.', vi: 'Tớ vui.' }, He: { en: 'He *is* happy.', vi: 'Bạn ấy (trai) vui.' }, She: { en: 'She *is* happy.', vi: 'Bạn ấy (gái) vui.' },
    It: { en: 'It *is* happy.', vi: 'Nó (con chó) vui.' }, They: { en: 'They *are* happy.', vi: 'Họ vui.' },
  })[who],
  draw: ({ who }) => {
    const on = { I: ['me'], He: ['he'], She: ['she'], It: ['it'], They: ['he', 'she'] }[who];
    const fig = (id, x, inner, w) => `<g opacity="${on.includes(id) ? 1 : 0.35}">${on.includes(id) ? spot(x, w) : ''}${inner}</g>`;
    const verb = { I: 'am', He: 'is', She: 'is', It: 'is', They: 'are' }[who];
    const bx = { I: 80, He: 215, She: 315, It: 410, They: 265 }[who];
    return outdoor()
      + fig('me', 80, person(80, G, 'bon', 'raise', { s: 1, mood: 'joy' }) + label(80, G + 26, 'tớ', { s: 14, c: '#475569' }), 80)
      + fig('he', 215, person(215, G, 'minh', 'stand', { s: 1, mood: 'joy' }), 70)
      + fig('she', 315, person(315, G, 'na', 'stand', { s: 1, mood: 'joy' }), 70)
      + fig('it', 410, at(410, G, dog()), 90)
      + k('say', at(bx, 96, bubble(0, 0, `${who} ${verb}`, 22)));
  },
};

// ── Bài 5: one cat / two cats ──
const g05 = {
  groups: [{ key: 'thing', opts: [{ v: 'cat', label: '🐱 cat' }, { v: 'box', label: '📦 box' }] }, { key: 'n', opts: [1, 2, 3, 4].map((n) => ({ v: n, label: String(n) })) }],
  init: { thing: 'cat', n: 1 },
  say: ({ thing, n }) => {
    const pl = thing === 'cat' ? 'cats' : 'boxes';
    return { en: n === 1 ? `I see *one ${thing}*.` : `I see *${NUM[n]} ${pl}*.`, vi: `Tớ thấy ${NUM_VI[n]} ${thing === 'cat' ? 'con mèo' : 'cái hộp'}.` };
  },
  draw: ({ thing, n }) => {
    const xs = Array.from({ length: n }, (_, i) => 240 + (i - (n - 1) / 2) * 104);
    const word = n === 1 ? thing : thing === 'cat' ? 'cats' : 'boxes';
    return outdoor() + xs.map((x, i) => k(`${thing}${i}`, at(x, G, thing === 'cat' ? `<g transform="scale(1.25)">${cat(['#FB923C', '#A8A29E', '#FCD34D', '#78716C'][i], { sit: true })}</g>` : `<g transform="scale(.95)">${box('front')}</g>`))).join('')
      + k('word', at(240, 80, label(0, 0, `${NUM[n]} ${word}`, { s: 26 })));
  },
};

// ── Bài 6, 7: this / that / these / those ──
const nearFar = (opts) => ({
  groups: [{ key: 'w', opts }],
  init: { w: opts[0].v },
  say: ({ w }) => ({
    This: { en: '*This* is a ball.', vi: 'Đây là quả bóng (ở gần).' }, That: { en: '*That* is a ball.', vi: 'Kia là quả bóng (ở xa).' },
    These: { en: '*These* are balls.', vi: 'Đây là những quả bóng (ở gần).' }, Those: { en: '*Those* are balls.', vi: 'Kia là những quả bóng (ở xa).' },
  })[w],
  draw: ({ w }) => {
    const near = w === 'This' || w === 'These', many = w === 'These' || w === 'Those';
    const nb = many ? [[150, 0], [196, 1], [173, 2]] : [[170, 0]];
    const fb = many ? [[382, 0], [412, 1], [442, 2]] : [[412, 0]];
    const C = ['#EF4444', '#3B82F6', '#22C55E'];
    const nearBalls = nb.map(([x, i], j) => at(x, G + (j === 2 ? 14 : 0), ball(20, C[i]))).join('');
    const farBalls = fb.map(([x, i]) => at(x, G - 48, ball(12, C[i]))).join('');
    const target = near ? [174, G - 22] : [414, G - 60];
    return outdoor() + tree(440, G - 50, 0.55)
      + `<g opacity="${near ? 1 : 0.4}">${nearBalls}</g><g opacity="${near ? 0.4 : 1}">${farBalls}</g>`
      + label(174, G + 30, 'gần', { s: 13, c: '#475569' }) + label(414, G - 22, 'xa', { s: 13, c: '#475569' })
      + person(64, G, 'minh', 'point', { s: 1, mood: 'joy' })
      + k('arrow', dashed(112, G - 74, ...target))
      + k('say', at(near ? 174 : 330, 100, bubble(0, 0, w, 24)));
  },
});

// ── Bài 8: There is / There are ──
const g08 = {
  groups: [{ key: 'n', opts: [1, 2, 3, 4].map((n) => ({ v: n, label: String(n), sub: 'con vịt' })) }],
  init: { n: 1 },
  say: ({ n }) => (n === 1 ? { en: '*There is* a duck in the pond.', vi: 'Có một con vịt trong ao.' } : { en: `*There are* ${NUM[n]} ducks in the pond.`, vi: `Có ${NUM_VI[n]} con vịt trong ao.` }),
  draw: ({ n }) => outdoor() + tree(60, G - 10, 0.9)
    + `<ellipse cx="260" cy="${G - 4}" rx="190" ry="34" fill="#38BDF8" stroke="${LINE}" stroke-width="1.4"/><path d="M130 ${G - 6} q14 -6 28 0 M300 ${G + 10} q14 -6 28 0" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/>`
    + Array.from({ length: n }, (_, i) => k(`d${i}`, at([200, 290, 245, 335][i], G + [-8, -10, 14, 12][i], duck(), 1.15))).join('')
    + k('word', at(260, 92, label(0, 0, n === 1 ? 'There is' : 'There are', { s: 26 }))),
};

// ── Bài 10: my / his / her / their ──
const g10 = {
  groups: [{ key: 'w', opts: [{ v: 'my', label: 'my', sub: 'của tớ' }, { v: 'his', label: 'his', sub: 'của bạn trai' }, { v: 'her', label: 'her', sub: 'của bạn gái' }, { v: 'their', label: 'their', sub: 'của họ' }] }],
  init: { w: 'my' },
  say: ({ w }) => ({
    my: { en: 'This is *my* ball.', vi: 'Đây là quả bóng của tớ.' }, his: { en: 'This is *his* dog.', vi: 'Đây là con chó của bạn ấy (trai).' },
    her: { en: 'This is *her* bag.', vi: 'Đây là cái cặp của bạn ấy (gái).' }, their: { en: 'This is *their* house.', vi: 'Đây là ngôi nhà của họ.' },
  })[w],
  draw: ({ w }) => {
    const on = (id) => (w === id || (w === 'their' && (id === 'his' || id === 'her')) ? 1 : 0.35);
    const tx = { my: 120, his: 236, her: 360, their: 300 }[w];
    const ty = { my: G - 40, his: G - 50, her: G - 34, their: G - 150 }[w];
    return outdoor()
      + `<g opacity="${w === 'their' ? 1 : 0.35}">${at(300, G - 40, house(), 0.85)}</g>`
      + `<g opacity="${on('my')}">${person(70, G, 'bon', 'stand', { s: 1, mood: 'joy' })}${at(120, G, ball(20))}</g>`
      + `<g opacity="${on('his')}">${person(190, G, 'minh', 'stand', { s: 1, mood: 'joy' })}${at(256, G, dog(), 0.75)}</g>`
      + `<g opacity="${on('her')}">${person(410, G, 'na', 'stand', { s: 1, mood: 'joy', flip: true })}${at(360, G, bag())}</g>`
      + k('say', at(tx, ty - 40, bubble(0, 0, w, 22)));
  },
};

// ── Bài 11: a big red ball ──
const COLORS = { red: '#EF4444', blue: '#3B82F6', green: '#22C55E', yellow: '#FACC15' };
const COLOR_VI = { red: 'đỏ', blue: 'xanh dương', green: 'xanh lá', yellow: 'vàng' };
const g11 = {
  groups: [{ key: 'size', opts: [{ v: 'big', label: 'big', sub: 'to' }, { v: 'small', label: 'small', sub: 'nhỏ' }] },
    { key: 'color', opts: Object.keys(COLORS).map((c) => ({ v: c, label: c, sub: COLOR_VI[c] })) }],
  init: { size: 'big', color: 'red' },
  say: ({ size, color }) => ({ en: `It is a *${size} ${color}* ball.`, vi: `Nó là một quả bóng ${COLOR_VI[color]} ${size === 'big' ? 'to' : 'nhỏ'}.` }),
  draw: ({ size, color }) => outdoor({ noSun: true }) + person(90, G, 'na', 'point', { s: 1, mood: 'joy' })
    + k('ball', at(290, G, ball(size === 'big' ? 72 : 24, COLORS[color])))
    + k('word', at(250, 56, label(0, 0, `a ${size} ${color} ball`, { s: 22 }))),
};

// ── Bài 17: in / on / under / next to ──
const g17 = {
  groups: [{ key: 'p', opts: [{ v: 'in', label: 'in', sub: 'trong' }, { v: 'on', label: 'on', sub: 'trên' }, { v: 'under', label: 'under', sub: 'dưới' }, { v: 'next to', label: 'next to', sub: 'cạnh' }] }],
  init: { p: 'in' },
  say: ({ p }) => ({
    in: { en: 'The cat is *in* the box.', vi: 'Con mèo ở trong hộp.' }, on: { en: 'The cat is *on* the table.', vi: 'Con mèo ở trên bàn.' },
    under: { en: 'The cat is *under* the table.', vi: 'Con mèo ở dưới bàn.' }, 'next to': { en: 'The cat is *next to* the box.', vi: 'Con mèo ở cạnh hộp.' },
  })[p],
  draw: ({ p }) => {
    const pos = { in: [128, G - 40], on: [384, G - 109], under: [384, G], 'next to': [262, G] }[p];
    return indoor() + at(384, G, table(), 1.3) + at(120, G, box('back'), 1.4)
      + k('cat', at(pos[0], pos[1], cat('#FB923C', { sit: p === 'in' || p === 'on' }), 1.5))
      + at(120, G, box('front'), 1.4)
      + k('word', at(230, 52, label(0, 0, p, { s: 28 })));
  },
};

// ── Bài 18–22, 28: dòng thời gian Hôm qua / Hôm nay / Ngày mai ──
const timeline = (states) => ({
  groups: [{ key: 't', opts: states.map((s) => ({ v: s.v, label: s.label, sub: s.sub })) }],
  init: { t: states[0].v },
  say: ({ t }) => states.find((s) => s.v === t),
  draw: ({ t }) => {
    const X = { yesterday: 84, today: 240, tomorrow: 396 };
    const st = states.find((s) => s.v === t);
    const day = (key, name, vi) => {
      const x = X[key], on = t === key, hc = on ? '#EF4444' : '#CBD5E1';
      return `<g opacity="${on ? 1 : 0.45}"><rect x="${x - 66}" y="12" width="132" height="156" rx="12" fill="#fff" stroke="${LINE}" stroke-width="1.6"/>
      <path d="M${x - 66} 46 V24 Q${x - 66} 12 ${x - 54} 12 H${x + 54} Q${x + 66} 12 ${x + 66} 24 V46Z" fill="${hc}"/>
      <text x="${x}" y="36" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="18" fill="#fff">${name}</text>
      ${on ? `<text x="${x}" y="122" text-anchor="middle" font-size="58">${st.pic}</text>` : ''}
      <text x="${x}" y="158" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="15" fill="#475569">${vi}</text></g>`;
    };
    return `<rect width="480" height="300" fill="#F8FAFC"/>`
      + day('yesterday', 'Yesterday', 'hôm qua') + day('today', 'Today', 'hôm nay') + day('tomorrow', 'Tomorrow', 'ngày mai')
      + `<path d="M18 200 H452" stroke="${LINE}" stroke-width="4" stroke-linecap="round"/><path d="M446 190 L460 200 L446 210" stroke="${LINE}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
      + Object.values(X).map((x) => `<circle cx="${x}" cy="200" r="8" fill="#fff" stroke="${LINE}" stroke-width="2"/>`).join('')
      + k('kid', at(X[t], 296, person(0, 0, 'minh', 'walk', { s: 0.74, mood: 'joy' })))
      + k('dot', `<circle cx="${X[t]}" cy="200" r="10" fill="#2563EB" stroke="#fff" stroke-width="3"/>`);
  },
});
const T = (v, en, vi, pic) => ({ v, en, vi, pic, label: { yesterday: 'Yesterday', today: 'Today', tomorrow: 'Tomorrow' }[v], sub: { yesterday: 'hôm qua', today: 'hôm nay', tomorrow: 'ngày mai' }[v] });

// ── Bài 23: tall / taller / the tallest ──
const g23 = {
  groups: [{ key: 'w', opts: [{ v: 'tall', label: 'tall', sub: 'cao' }, { v: 'taller', label: 'taller', sub: 'cao hơn' }, { v: 'tallest', label: 'the tallest', sub: 'cao nhất' }] }],
  init: { w: 'tall' },
  say: ({ w }) => ({
    tall: { en: 'Lan is *tall*.', vi: 'Lan cao.' }, taller: { en: 'Minh is *taller than* Lan.', vi: 'Minh cao hơn Lan.' }, tallest: { en: 'Tom is *the tallest*.', vi: 'Tom cao nhất.' },
  })[w],
  draw: ({ w }) => {
    const kids = [['tall', 130, 'lan', 'Lan', 0.95], ['taller', 240, 'minh', 'Minh', 1.12], ['tallest', 350, 'tetsuo', 'Tom', 1.32]];
    const on = (v) => (w === 'taller' ? v === 'tall' || v === 'taller' : v === w) || w === 'tallest';
    const ruler = `<rect x="430" y="${G - 170}" width="26" height="170" fill="#FEF3C7" stroke="${LINE}" stroke-width="1"/>${Array.from({ length: 9 }, (_, i) => `<path d="M430 ${G - i * 20} h${i % 2 ? 8 : 14}" stroke="${LINE}" stroke-width="1"/>`).join('')}`;
    return outdoor({ noSun: true }) + ruler + kids.map(([v, x, who, name, s]) => {
      const top = G - 122 * s;
      const sel = v === w;
      return `<g opacity="${on(v) ? 1 : 0.35}">${sel ? spot(x, 74) : ''}${person(x, G, who, 'stand', { s, mood: 'joy' })}
        <path d="M${x - 30} ${top} H430" stroke="${sel ? '#2563EB' : '#94A3B8'}" stroke-width="2" stroke-dasharray="5 5"/>${label(x, G + 26, name, { s: 14 })}</g>`;
    }).join('') + k('say', at(kids.find((x) => x[0] === w)[1], G - 122 * kids.find((x) => x[0] === w)[4] - 22, bubble(0, 0, w === 'tallest' ? 'the tallest' : w, 18)));
  },
};

// ── Bài 26: at 7 / on Monday / in May ──
const clock = (h) => `<g><circle r="66" fill="#fff" stroke="${LINE}" stroke-width="3"/>${Array.from({ length: 12 }, (_, i) => `<text x="${Math.sin(i * Math.PI / 6) * 50}" y="${-Math.cos(i * Math.PI / 6) * 50 + 6}" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="15" fill="#334155">${i || 12}</text>`).join('')}
  <path d="M0 0 L${Math.sin(h * Math.PI / 6) * 28} ${-Math.cos(h * Math.PI / 6) * 28}" stroke="#1E293B" stroke-width="6" stroke-linecap="round"/><path d="M0 0 V-40" stroke="#EF4444" stroke-width="4" stroke-linecap="round"/><circle r="5" fill="#1E293B"/></g>`;
const week = () => `<g>${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => `<g transform="translate(${(i - 3) * 58} 0)"><rect x="-26" y="-34" width="52" height="68" rx="8" fill="${i ? '#fff' : '#FDE047'}" stroke="${i ? '#CBD5E1' : '#D97706'}" stroke-width="${i ? 1.4 : 3}"/>
  <text y="-8" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="15" fill="${i ? '#64748B' : '#92400E'}">${d}</text><text y="20" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="18" fill="#334155">${i + 3}</text></g>`).join('')}</g>`;
const months = () => `<g>${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => `<g transform="translate(${((i % 6) - 2.5) * 66} ${Math.floor(i / 6) * 58 - 29})"><rect x="-29" y="-24" width="58" height="48" rx="8" fill="${i === 4 ? '#FDE047' : '#fff'}" stroke="${i === 4 ? '#D97706' : '#CBD5E1'}" stroke-width="${i === 4 ? 3 : 1.4}"/>
  <text y="6" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="17" fill="${i === 4 ? '#92400E' : '#64748B'}">${m}</text></g>`).join('')}</g>`;
const g26 = {
  groups: [{ key: 'p', opts: [{ v: 'at', label: 'at', sub: 'giờ' }, { v: 'on', label: 'on', sub: 'thứ' }, { v: 'in', label: 'in', sub: 'tháng' }] }],
  init: { p: 'at' },
  say: ({ p }) => ({
    at: { en: 'I get up *at* seven o\'clock.', vi: 'Tớ dậy lúc bảy giờ.' }, on: { en: 'I play football *on* Monday.', vi: 'Tớ đá bóng vào thứ Hai.' }, in: { en: 'My birthday is *in* May.', vi: 'Sinh nhật tớ vào tháng Năm.' },
  })[p],
  draw: ({ p }) => `<rect width="480" height="300" fill="#F8FAFC"/>`
    + k(`pic-${p}`, (p === 'at' ? at(200, 160, clock(7), 1.65) : p === 'on' ? at(240, 170, week(), 1.12) : at(240, 176, months(), 1.15)))
    + k('word', at(p === 'at' ? 390 : 240, p === 'at' ? 80 : 50, label(0, 0, p === 'at' ? 'at 7' : p === 'on' ? 'on Monday' : 'in May', { s: 24 }))),
};

// ── đồ vật, con vật thêm (gốc ở chân, giữa) ──
const S = (w = 1.2) => `stroke="${LINE}" stroke-width="${w}"`;
const elephant = () => `<g>
  <path d="M60 -70 Q74 -66 72 -44" stroke="#94A3B8" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="18" cy="-58" rx="56" ry="40" fill="#A5B4FC" ${S()}/>
  ${[-22, -2, 34, 54].map((x) => `<rect x="${x - 9}" y="-34" width="18" height="34" rx="6" fill="#A5B4FC" ${S()}/>`).join('')}
  <path d="M-34 -70 Q-62 -64 -60 -30 Q-58 -14 -46 -14" stroke="#A5B4FC" stroke-width="15" fill="none" stroke-linecap="round"/>
  <path d="M-34 -70 Q-62 -64 -60 -30 Q-58 -14 -46 -14" stroke="${LINE}" stroke-width="1" fill="none" opacity=".5"/>
  <circle cx="-30" cy="-84" r="30" fill="#A5B4FC" ${S()}/>
  <path d="M-12 -104 Q22 -112 18 -76 Q14 -54 -8 -62Z" fill="#C7D2FE" ${S()}/>
  <circle cx="-40" cy="-90" r="3.4" fill="#1F1716"/><path d="M-50 -76 q4 4 8 0" stroke="${LINE}" stroke-width="1.2" fill="none"/>
  <ellipse cx="-50" cy="-80" rx="5" ry="3" fill="#FDA4AF" opacity=".7"/></g>`;
const mouse = () => `<g>
  <path d="M18 -8 Q40 -4 44 -22" stroke="#9CA3AF" stroke-width="3" fill="none" stroke-linecap="round"/>
  <ellipse cx="4" cy="-14" rx="20" ry="14" fill="#D1D5DB" ${S()}/>
  <circle cx="-14" cy="-22" r="12" fill="#D1D5DB" ${S()}/><circle cx="-12" cy="-36" r="8" fill="#F9A8D4" ${S(1)}/><circle cx="-24" cy="-32" r="7" fill="#F9A8D4" ${S(1)}/>
  <circle cx="-26" cy="-20" r="2.4" fill="#F43F5E"/><circle cx="-16" cy="-24" r="2.2" fill="#1F1716"/>
  <path d="M-24 -18 h-10 M-24 -16 l-9 4" stroke="${LINE}" stroke-width=".7"/></g>`;
const giftBox = (open) => `<g>
  <rect x="-50" y="-70" width="100" height="70" rx="4" fill="#F472B6" ${S(1.4)}/><rect x="-9" y="-70" width="18" height="70" fill="#FDE047" ${S(1)}/>
  <g transform="translate(0 ${open ? -64 : 0}) rotate(${open ? -18 : 0})"><rect x="-56" y="-88" width="112" height="20" rx="4" fill="#EC4899" ${S(1.4)}/><rect x="-9" y="-88" width="18" height="20" fill="#FDE047" ${S(1)}/>
    <path d="M0 -88 Q-22 -110 -26 -94 Q-24 -86 0 -88 Q22 -110 26 -94 Q24 -86 0 -88" fill="#FDE047" ${S(1)}/></g>
  ${open ? '' : `<text y="-24" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="34" fill="#fff" stroke="${LINE}" stroke-width="1">?</text>`}</g>`;
const apple = (r = 26) => `<g><path d="M0 ${-r * 2} q-2 -${r * 0.5} 4 -${r * 0.7}" stroke="#78350F" stroke-width="3" fill="none"/><path d="M3 ${-r * 2.3} q12 -8 18 2 q-10 6 -18 -2Z" fill="#22C55E" ${S(1)}/>
  <path d="M0 ${-r * 1.9} C${-r * 1.4} ${-r * 2.3} ${-r * 1.4} 0 0 ${-r * 0.1} C${r * 1.4} 0 ${r * 1.4} ${-r * 2.3} 0 ${-r * 1.9}Z" fill="#EF4444" ${S(1.3)}/>
  <ellipse cx="${-r * 0.45}" cy="${-r * 1.35}" rx="${r * 0.18}" ry="${r * 0.3}" fill="#fff" opacity=".6"/></g>`;
const egg = () => `<g><ellipse cy="-36" rx="27" ry="36" fill="#FFFBEB" ${S(1.4)}/><ellipse cx="-9" cy="-50" rx="5" ry="9" fill="#fff"/></g>`;
const umbrella = () => `<g><path d="M0 -96 V-10 Q0 0 -10 0 Q-18 0 -18 -8" stroke="#6B4A3A" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M-58 -70 Q-56 -118 0 -120 Q56 -118 58 -70 Q44 -80 29 -70 Q15 -80 0 -70 Q-15 -80 -29 -70 Q-44 -80 -58 -70Z" fill="#8B5CF6" ${S(1.4)}/>
  <path d="M0 -120 Q-14 -96 -29 -70 M0 -120 Q14 -96 29 -70" stroke="#C4B5FD" stroke-width="2" fill="none"/></g>`;
const bus = () => `<g><rect x="-80" y="-70" width="160" height="58" rx="12" fill="#FACC15" ${S(1.4)}/>
  ${[-64, -32, 0, 32].map((x) => `<rect x="${x}" y="-62" width="24" height="20" rx="3" fill="#BAE6FD" ${S(1)}/>`).join('')}<rect x="58" y="-62" width="16" height="44" rx="3" fill="#BAE6FD" ${S(1)}/>
  <rect x="-80" y="-30" width="160" height="6" fill="#F97316"/>${[-48, 46].map((x) => `<circle cx="${x}" cy="-12" r="12" fill="#334155" ${S(1)}/><circle cx="${x}" cy="-12" r="5" fill="#CBD5E1"/>`).join('')}</g>`;
const bike = () => `<g>${[-30, 30].map((x) => `<circle cx="${x}" cy="-20" r="19" fill="none" stroke="#334155" stroke-width="4"/><circle cx="${x}" cy="-20" r="3" fill="#334155"/>`).join('')}
  <path d="M-30 -20 L-8 -50 H22 L30 -20 M-8 -50 L2 -20 L22 -50 M-12 -58 H-2 M22 -50 L18 -62 H28" stroke="#EF4444" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const bird = (fly = false) => `<g><ellipse cx="0" cy="-20" rx="20" ry="14" fill="#38BDF8" ${S()}/><circle cx="-16" cy="-30" r="10" fill="#38BDF8" ${S()}/>
  <path d="M-26 -30 L-34 -27 L-26 -24Z" fill="#F59E0B" ${S(.8)}/><circle cx="-18" cy="-32" r="2" fill="#1F1716"/><path d="M18 -22 L30 -28 L28 -14Z" fill="#0284C7" ${S(.8)}/>
  ${fly ? `<path d="M-2 -28 Q6 -60 24 -54 Q14 -40 8 -24Z" fill="#7DD3FC" ${S()}/>` : `<path d="M-6 -22 Q8 -30 16 -18 Q4 -12 -6 -22Z" fill="#7DD3FC" ${S()}/>`}
  ${fly ? '' : '<path d="M-4 -7 V0 M4 -7 V0" stroke="#F59E0B" stroke-width="2"/>'}</g>`;
const fish = () => `<g><path d="M22 -18 L40 -32 L40 -4Z" fill="#FB923C" ${S()}/><ellipse cy="-18" rx="26" ry="16" fill="#FDBA74" ${S()}/>
  <path d="M-4 -32 Q6 -40 14 -30" fill="#FB923C" ${S(1)}/><circle cx="-14" cy="-21" r="3" fill="#1F1716"/><path d="M4 -28 q4 10 0 20 M12 -28 q4 10 0 20" stroke="#F97316" stroke-width="1.4" fill="none"/></g>`;
const penguin = () => `<g><ellipse cy="-36" rx="24" ry="34" fill="#1E293B" ${S()}/><ellipse cy="-30" rx="16" ry="26" fill="#fff"/>
  <circle cx="-7" cy="-56" r="3" fill="#fff"/><circle cx="7" cy="-56" r="3" fill="#fff"/><circle cx="-7" cy="-56" r="1.6" fill="#1F1716"/><circle cx="7" cy="-56" r="1.6" fill="#1F1716"/>
  <path d="M-5 -49 L0 -44 L5 -49Z" fill="#F59E0B"/><path d="M-24 -40 Q-36 -26 -26 -16 M24 -40 Q36 -26 26 -16" stroke="#1E293B" stroke-width="7" fill="none" stroke-linecap="round"/>
  <ellipse cx="-9" cy="-1" rx="8" ry="3" fill="#F59E0B"/><ellipse cx="9" cy="-1" rx="8" ry="3" fill="#F59E0B"/></g>`;
const iceCream = () => `<g><path d="M-16 -44 L0 0 L16 -44Z" fill="#F59E0B" ${S(1.2)}/><path d="M-10 -34 L8 -40 M-6 -22 L10 -28" stroke="#B45309" stroke-width="1"/>
  <circle cx="-8" cy="-52" r="13" fill="#F9A8D4" ${S(1.2)}/><circle cx="9" cy="-52" r="13" fill="#FEF3C7" ${S(1.2)}/><circle cx="0" cy="-68" r="13" fill="#A7F3D0" ${S(1.2)}/><circle cx="0" cy="-84" r="4" fill="#EF4444"/></g>`;
const carrot = () => `<g transform="rotate(-20)"><path d="M-12 -70 Q0 -74 12 -70 L2 0 Q0 4 -2 0Z" fill="#FB923C" ${S(1.2)}/><path d="M-6 -54 h6 M-2 -36 h6 M-4 -20 h5" stroke="#C2410C" stroke-width="1.4"/>
  <path d="M0 -72 Q-14 -96 -18 -90 M0 -72 Q0 -100 4 -98 M0 -72 Q14 -94 18 -86" stroke="#16A34A" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
const pizza = () => `<g><path d="M-44 -10 L0 -80 L44 -10 Q0 4 -44 -10Z" fill="#FDE68A" ${S(1.3)}/><path d="M-44 -10 Q0 4 44 -10 L40 -2 Q0 12 -40 -2Z" fill="#D97706" ${S(1.2)}/>
  ${[[-10, -30], [12, -24], [0, -52], [-22, -18], [22, -12]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#DC2626" ${S(.8)}/>`).join('')}</g>`;
const banana = () => `<g><path d="M-36 -20 Q-10 10 34 -30 Q38 -38 32 -36 Q-4 -4 -30 -26Z" fill="#FDE047" ${S(1.3)}/><path d="M32 -36 l6 -8" stroke="#78350F" stroke-width="4" stroke-linecap="round"/></g>`;
const turtle = () => `<g><ellipse cx="-34" cy="-16" rx="10" ry="9" fill="#86EFAC" ${S()}/><circle cx="-37" cy="-19" r="1.8" fill="#1F1716"/>
  ${[-18, 18].map((x) => `<ellipse cx="${x}" cy="-4" rx="7" ry="5" fill="#86EFAC" ${S(1)}/>`).join('')}
  <path d="M-28 -8 Q-26 -44 0 -44 Q26 -44 28 -8Z" fill="#16A34A" ${S(1.3)}/><path d="M-14 -10 L-10 -30 H10 L14 -10 M-10 -30 L0 -42 L10 -30" stroke="#86EFAC" stroke-width="2" fill="none"/></g>`;
const tv = () => `<g><rect x="-34" y="-58" width="68" height="46" rx="6" fill="#334155" ${S(1.2)}/><rect x="-28" y="-52" width="56" height="34" rx="3" fill="#7DD3FC"/><path d="M-12 -12 L-18 0 M12 -12 L18 0" stroke="#334155" stroke-width="4"/></g>`;
const rock = () => `<g><path d="M-36 0 Q-42 -30 -14 -40 Q10 -50 30 -32 Q44 -14 36 0Z" fill="#A8A29E" ${S(1.3)}/><path d="M-14 -26 q8 -4 14 2" stroke="#78716C" stroke-width="2" fill="none"/></g>`;
const badge = (ok, x, y, r = 18) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${ok ? '#22C55E' : '#EF4444'}" stroke="#fff" stroke-width="3"/>
  <path d="${ok ? `M${-r * 0.45} 0 L${-r * 0.1} ${r * 0.38} L${r * 0.5} ${-r * 0.35}` : `M${-r * 0.38} ${-r * 0.38} L${r * 0.38} ${r * 0.38} M${r * 0.38} ${-r * 0.38} L${-r * 0.38} ${r * 0.38}`}" stroke="#fff" stroke-width="${r / 4.5}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const heart = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 8 C-18 -4 -14 -20 -4 -18 Q0 -17 0 -12 Q0 -17 4 -18 C14 -20 18 -4 0 8Z" fill="#F43F5E" stroke="#fff" stroke-width="2"/>`;
const sea = (x0 = 260) => `<path d="M${x0} ${G - 2} Q${x0 + 20} ${G - 12} ${x0 + 60} ${G - 10} H480 V300 H${x0 - 30} Q${x0 - 10} ${G + 20} ${x0} ${G - 2}Z" fill="#38BDF8" stroke="${LINE}" stroke-width="1"/>
  <path d="M${x0 + 40} ${G + 10} q12 -6 24 0 t24 0 M${x0 + 110} ${G + 26} q12 -6 24 0 t24 0" stroke="#fff" stroke-width="2.4" fill="none" opacity=".8"/>`;
const motion = (x, y) => `<path d="M${x} ${y} h-24 M${x + 4} ${y + 10} h-30 M${x} ${y + 20} h-20" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"/>`;
const tspanWord = (word, hiStart, hiLen, c = '#DC2626') => `${word.slice(0, hiStart)}<tspan fill="${c}">${word.slice(hiStart, hiStart + hiLen)}</tspan>${word.slice(hiStart + hiLen)}`;
const bigWord = (x, y, inner, s = 30) => `<g transform="translate(${x} ${y})"><text text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="${s}" fill="#1E3A8A" stroke="#fff" stroke-width="6" paint-order="stroke">${inner}</text></g>`;

// ── Bài 2: isn't / aren't / am not ──
const g02 = {
  groups: [{ key: 'a', opts: [{ v: 'elephant', label: 'elephant', sub: 'con voi' }, { v: 'mouse', label: 'mouse', sub: 'con chuột' }] },
    { key: 'w', opts: [{ v: 'big', label: 'big', sub: 'to' }, { v: 'small', label: 'small', sub: 'nhỏ' }] }],
  init: { a: 'elephant', w: 'small' },
  say: ({ a, w }) => {
    const yes = (a === 'elephant') === (w === 'big');
    const name = a === 'elephant' ? 'con voi' : 'con chuột', adj = w === 'big' ? 'to' : 'nhỏ';
    return yes ? { en: `It *is* ${w}.`, vi: `Nó (${name}) ${adj}.` } : { en: `It *isn't* ${w}.`, vi: `Nó (${name}) không ${adj}.` };
  },
  draw: ({ a, w }) => {
    const yes = (a === 'elephant') === (w === 'big');
    return outdoor() + shadow(240, a === 'elephant' ? 200 : 60)
      + k(`an-${a}`, at(240, G, a === 'elephant' ? elephant() : mouse(), a === 'elephant' ? 1.45 : 1.5))
      + k('word', at(220, 52, label(0, 0, `${yes ? 'is' : "isn't"} ${w}`, { s: 26, c: yes ? '#15803D' : '#B91C1C' })))
      + k('badge', badge(yes, 220 + (`${yes ? 'is' : "isn't"} ${w}`.length * 26 * 0.58 + 18) / 2 + 26, 46, 20));
  },
};

// ── Bài 3: Is it a ...? Yes, it is. / No, it isn't. ──
const g03 = {
  groups: [{ key: 'g', opts: [{ v: 'cat', label: 'cat?', sub: 'con mèo' }, { v: 'dog', label: 'dog?', sub: 'con chó' }, { v: 'duck', label: 'duck?', sub: 'con vịt' }] }],
  init: { g: 'cat' },
  say: ({ g }) => (g === 'dog' ? { en: '*Is it* a dog? Yes, it is.', vi: 'Nó là con chó à? Đúng rồi.' } : { en: `*Is it* a ${g}? No, it isn't.`, vi: `Nó là ${g === 'cat' ? 'con mèo' : 'con vịt'} à? Không phải.` }),
  draw: ({ g }) => {
    const ok = g === 'dog';
    const guess = { cat: cat('#FB923C', { sit: true }), dog: dog(), duck: duck() }[g];
    return outdoor()
      + person(70, G, 'minh', 'stand', { s: 1, mood: ok ? 'joy' : 'wow' })
      + `<g transform="translate(118 64)"><ellipse rx="52" ry="40" fill="#fff" stroke="${LINE}" stroke-width="1.2"/><circle cx="-46" cy="44" r="7" fill="#fff" stroke="${LINE}" stroke-width="1"/><circle cx="-56" cy="58" r="4" fill="#fff" stroke="${LINE}" stroke-width="1"/>
         ${k(`gs-${g}`, at(4, 28, guess, 0.62))}<text x="34" y="-14" font-family="${FONT}" font-weight="900" font-size="24" fill="#2563EB">?</text></g>`
      + shadow(260, 120) + (ok ? k('dog', at(260, G - 10, dog(), 1.3)) : '') + k('box', at(260, G, giftBox(ok)))
      + person(400, G, 'na', 'stand', { s: 1, mood: 'joy', flip: true })
      + k('ans', at(396, 106, bubble(0, 0, ok ? 'Yes, it is.' : "No, it isn't.", 17)))
      + (ok ? '' : k('x', badge(false, 166, 40, 13)));
  },
};

// ── Bài 4: a / an ──
const ITEMS = {
  cat: ['a', 'con mèo', () => cat('#FB923C', { sit: true }), 1.7], apple: ['an', 'quả táo', () => apple(32), 1.4], egg: ['an', 'quả trứng', egg, 1.5],
  bus: ['a', 'xe buýt', bus, 1.1], umbrella: ['an', 'cái ô', umbrella, 1.15],
};
const g04 = {
  groups: [{ key: 't', opts: Object.keys(ITEMS).map((t) => ({ v: t, label: t, sub: ITEMS[t][1] })) }],
  init: { t: 'cat' },
  say: ({ t }) => ({ en: `It is *${ITEMS[t][0]}* ${t}.`, vi: `Nó là một ${ITEMS[t][1]}.` }),
  draw: ({ t }) => {
    const [art, , fn, sc] = ITEMS[t];
    const vowel = art === 'an';
    const letters = ['a', 'e', 'i', 'o', 'u'].map((l, i) => `<g transform="translate(${130 + i * 55} 34)"><circle r="20" fill="${vowel && t[0] === l ? '#FDE047' : '#fff'}" stroke="${vowel && t[0] === l ? '#D97706' : '#CBD5E1'}" stroke-width="${vowel && t[0] === l ? 3 : 1.5}"/>
      <text y="8" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="22" fill="${vowel && t[0] === l ? '#B45309' : '#94A3B8'}">${l}</text></g>`).join('');
    return indoor() + letters
      + `<rect x="140" y="${G - 14}" width="200" height="14" rx="4" fill="#A16207" stroke="${LINE}" stroke-width="1"/>`
      + shadow(240, 100, G - 14) + k(`it-${t}`, at(240, G - 14, fn(), sc))
      + k('word', bigWord(240, 108, `<tspan fill="${vowel ? '#DC2626' : '#2563EB'}">${art}</tspan> <tspan fill="${vowel ? '#DC2626' : '#2563EB'}" text-decoration="underline">${t[0]}</tspan>${t.slice(1)}`, 34));
  },
};

// ── Bài 9: have / has ──
const g09 = {
  groups: [{ key: 'w', opts: [{ v: 'I', label: 'I', sub: 'tớ' }, { v: 'She', label: 'She', sub: 'bạn gái' }, { v: 'He', label: 'He', sub: 'bạn trai' }, { v: 'They', label: 'They', sub: 'họ' }] }],
  init: { w: 'I' },
  say: ({ w }) => ({
    I: { en: 'I *have* a dog.', vi: 'Tớ có một con chó.' }, She: { en: 'She *has* a bike.', vi: 'Bạn ấy (gái) có một chiếc xe đạp.' },
    He: { en: 'He *has* a ball.', vi: 'Bạn ấy (trai) có một quả bóng.' }, They: { en: 'They *have* a kite.', vi: 'Họ có một cái diều.' },
  })[w],
  draw: ({ w }) => {
    const op = (id) => (id === w ? 1 : 0.32);
    const bx = { I: 70, She: 190, He: 300, They: 410 }[w];
    const verb = w === 'She' || w === 'He' ? 'has' : 'have';
    return outdoor({ noSun: true })
      + `<g opacity="${op('I')}">${w === 'I' ? spot(70, 110) : ''}${person(50, G, 'bon', 'stand', { s: 0.95, mood: 'joy' })}${at(98, G, dog(), 0.62)}</g>`
      + `<g opacity="${op('She')}">${w === 'She' ? spot(190, 110) : ''}${person(170, G, 'na', 'stand', { s: 0.95, mood: 'joy' })}${at(214, G, bike(), 0.8)}</g>`
      + `<g opacity="${op('He')}">${w === 'He' ? spot(300, 90) : ''}${person(292, G, 'minh', 'stand', { s: 0.95, mood: 'joy' })}${at(326, G, ball(14, '#3B82F6'))}</g>`
      + `<g opacity="${op('They')}">${w === 'They' ? spot(412, 110) : ''}${person(392, G, 'lan', 'point', { s: 0.9, mood: 'joy' })}${person(438, G, 'tetsuo', 'raise', { s: 0.9, mood: 'joy', flip: true })}
         ${at(446, 70, kite(), 0.8)}<path d="M446 82 Q430 130 444 160" stroke="${LINE}" stroke-width="1" fill="none"/></g>`
      + k('say', at(bx, 108, bubble(0, 0, `${w} ${verb}`, 20)));
  },
};

// ── Bài 12: can / can't ──
const CAN = { bird: { fly: true, swim: false }, fish: { fly: false, swim: true }, penguin: { fly: false, swim: true } };
const ANI_VI = { bird: 'con chim', fish: 'con cá', penguin: 'chim cánh cụt' };
const g12 = {
  groups: [{ key: 'a', opts: [{ v: 'bird', label: 'bird', sub: 'chim' }, { v: 'fish', label: 'fish', sub: 'cá' }, { v: 'penguin', label: 'penguin', sub: 'cánh cụt' }] },
    { key: 'd', opts: [{ v: 'fly', label: 'fly', sub: 'bay' }, { v: 'swim', label: 'swim', sub: 'bơi' }] }],
  init: { a: 'bird', d: 'fly' },
  say: ({ a, d }) => {
    const ok = CAN[a][d];
    return { en: `A ${a} *${ok ? 'can' : "can't"}* ${d}.`, vi: `${ANI_VI[a][0].toUpperCase()}${ANI_VI[a].slice(1)} ${ok ? '' : 'không '}${d === 'fly' ? 'bay' : 'bơi'} được.` };
  },
  draw: ({ a, d }) => {
    const ok = CAN[a][d];
    const pos = ok ? (d === 'fly' ? [190, 120] : [370, G + 22]) : (a === 'fish' ? [370, G + 22] : [150, G]);
    const fig = a === 'bird' ? bird(ok && d === 'fly') : a === 'fish' ? fish() : penguin();
    const ghost = ok ? '' : `<g opacity=".28">${d === 'fly' ? at(190, 120, a === 'fish' ? fish() : a === 'bird' ? bird(true) : penguin(), 1.6) : at(370, G + 22, a === 'bird' ? bird() : fish(), 1.6)}</g>
      <path d="M${pos[0] + 20} ${pos[1] - 50} Q${(pos[0] + (d === 'fly' ? 190 : 370)) / 2} ${d === 'fly' ? 40 : G - 60} ${d === 'fly' ? 190 : 370} ${d === 'fly' ? 80 : G - 20}" stroke="#EF4444" stroke-width="3" stroke-dasharray="6 6" fill="none"/>`;
    return outdoor() + sea(280) + ghost
      + k('ani', at(pos[0], pos[1], fig, 1.6)) + (ok && d === 'fly' ? motion(pos[0] + 62, pos[1] - 40) : '')
      + k('badge', badge(ok, ok ? pos[0] + 40 : (d === 'fly' ? 190 : 370) + 36, ok ? pos[1] - 76 : (d === 'fly' ? 64 : G - 46), 18))
      + k('word', at(110, 48, label(0, 0, `${ok ? 'can' : "can't"} ${d}`, { s: 24, c: ok ? '#15803D' : '#B91C1C' })));
  },
};

// ── Bài 13: I play / She plays ──
const g13 = {
  groups: [{ key: 'w', opts: [{ v: 'I', label: 'I', sub: 'tớ' }, { v: 'She', label: 'She', sub: 'bạn gái' }, { v: 'They', label: 'They', sub: 'họ' }] }],
  init: { w: 'I' },
  say: ({ w }) => ({ I: { en: 'I *play* football every day.', vi: 'Ngày nào tớ cũng đá bóng.' }, She: { en: 'She *plays* football every day.', vi: 'Ngày nào bạn ấy cũng đá bóng.' }, They: { en: 'They *play* football every day.', vi: 'Ngày nào họ cũng đá bóng.' } })[w],
  draw: ({ w }) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => `<g transform="translate(${66 + i * 58} 34)"><rect x="-24" y="-20" width="48" height="44" rx="8" fill="#fff" stroke="#CBD5E1" stroke-width="1.4"/>
      <text y="-4" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="12" fill="#64748B">${d}</text>${badge(true, 0, 12, 9)}</g>`).join('');
    const kids = { I: [['bon', 200]], She: [['na', 200]], They: [['minh', 150], ['tetsuo', 250]] }[w];
    return outdoor() + days
      + `<rect x="330" y="${G - 70}" width="110" height="70" fill="none" stroke="#fff" stroke-width="5"/><path d="M330 ${G - 70} l10 10 h90 l10 -10" stroke="#fff" stroke-width="2" fill="none"/>`
      + kids.map(([who, x]) => k(`k-${who}`, person(x, G, who, 'run', { s: 1, mood: 'joy' }))).join('')
      + k('ball', at(296, G, ball(16, '#fff')))
      + k('verb', bigWord(240, 104, w === 'She' ? `She play<tspan fill="#DC2626">s</tspan>` : `${w} play`, 34));
  },
};

// ── Bài 14: don't / doesn't ──
const g14 = {
  groups: [{ key: 'w', opts: [{ v: 'I', label: 'I', sub: 'tớ' }, { v: 'He', label: 'He', sub: 'bạn trai' }] },
    { key: 'f', opts: [{ v: 'ice cream', label: 'ice cream', sub: 'kem' }, { v: 'carrots', label: 'carrots', sub: 'cà rốt' }] }],
  init: { w: 'I', f: 'carrots' },
  say: ({ w, f }) => {
    const like = f === 'ice cream', vi = f === 'ice cream' ? 'kem' : 'cà rốt', who = w === 'I' ? 'Tớ' : 'Bạn ấy';
    if (w === 'I') return like ? { en: 'I *like* ice cream.', vi: `${who} thích ${vi}.` } : { en: "I *don't* like carrots.", vi: `${who} không thích ${vi}.` };
    return like ? { en: 'He *likes* ice cream.', vi: `${who} thích ${vi}.` } : { en: "He *doesn't* like carrots.", vi: `${who} không thích ${vi}.` };
  },
  draw: ({ w, f }) => {
    const like = f === 'ice cream';
    return indoor() + at(300, G, table(), 1.2)
      + person(130, G, w === 'I' ? 'bon' : 'minh', 'stand', { s: 1.15, mood: like ? 'joy' : 'sad' })
      + k(`f-${f}`, f === 'ice cream' ? at(300, G - 101, iceCream(), 1.15) : at(300, G - 104, `<g transform="rotate(-72)">${carrot()}</g>`, 0.95))
      + k('mark', like ? heart(362, G - 150, 1.6) : badge(false, 362, G - 150, 20))
      + k('word', at(200, 52, label(0, 0, like ? (w === 'I' ? 'like' : 'likes') : (w === 'I' ? "don't like" : "doesn't like"), { s: 24, c: like ? '#15803D' : '#B91C1C' })));
  },
};

// ── Bài 15: Do you...? Does he...? ──
const g15 = {
  groups: [{ key: 'w', opts: [{ v: 'you', label: 'you', sub: 'bạn' }, { v: 'he', label: 'he', sub: 'bạn trai' }, { v: 'she', label: 'she', sub: 'bạn gái' }, { v: 'they', label: 'they', sub: 'họ' }] }],
  init: { w: 'you' },
  say: ({ w }) => ({
    you: { en: '*Do* you like pizza? Yes, I do.', vi: 'Bạn thích pizza không? Có.' }, he: { en: '*Does* he like pizza? Yes, he does.', vi: 'Bạn ấy (trai) thích pizza không? Có.' },
    she: { en: "*Does* she like pizza? No, she doesn't.", vi: 'Bạn ấy (gái) thích pizza không? Không.' }, they: { en: '*Do* they like pizza? Yes, they do.', vi: 'Họ thích pizza không? Có.' },
  })[w],
  draw: ({ w }) => {
    const on = (id) => (w === id || (w === 'they' && (id === 'he' || id === 'you')) ? 1 : 0.32);
    const q = { you: 'Do you...?', he: 'Does he...?', she: 'Does she...?', they: 'Do they...?' }[w];
    const ans = { you: 'Yes, I do.', he: 'Yes, he does.', she: "No, she doesn't.", they: 'Yes, they do.' }[w];
    const ax = { you: 250, he: 340, she: 430, they: 296 }[w];
    return indoor() + person(56, G, 'coHuong', 'point', { s: 0.95, mood: 'happy' })
      + k('q', at(96, 70, bubble(0, 0, q, 16)))
      + at(150, G, `<rect x="-26" y="-60" width="52" height="8" rx="3" fill="#A16207" ${S(1)}/><rect x="-4" y="-52" width="8" height="52" fill="#92400E"/>`) + at(150, G - 60, pizza(), 0.7)
      + `<g opacity="${on('you')}">${person(250, G, 'bon', 'stand', { s: 1, mood: 'joy' })}</g>`
      + `<g opacity="${on('he')}">${person(340, G, 'minh', 'stand', { s: 1, mood: 'joy' })}</g>`
      + `<g opacity="${on('she')}">${person(430, G, 'na', 'stand', { s: 1, mood: w === 'she' ? 'sad' : 'joy', flip: true })}</g>`
      + k('a', at(ax, 112, bubble(0, 0, ans, 15)));
  },
};

// ── Bài 16: She is running ──
const ACTS = { running: 'chạy', eating: 'ăn', reading: 'đọc sách', sleeping: 'ngủ', dancing: 'nhảy' };
const g16 = {
  groups: [{ key: 'a', opts: Object.keys(ACTS).map((a) => ({ v: a, label: { running: 'run', eating: 'eat', reading: 'read', sleeping: 'sleep', dancing: 'dance' }[a], sub: ACTS[a] })) }],
  init: { a: 'running' },
  say: ({ a }) => ({ en: `She *is ${a}* now.`, vi: `Bây giờ bạn ấy đang ${ACTS[a]}.` }),
  draw: ({ a }) => {
    const inside = a === 'eating' || a === 'reading' || a === 'sleeping';
    let fig;
    if (a === 'running') fig = person(220, G, 'na', 'run', { s: 1.25, mood: 'joy' }) + motion(170, G - 90);
    else if (a === 'dancing') fig = person(240, G, 'na', 'cheer', { s: 1.25, mood: 'joy' }) + `<text x="170" y="110" font-size="30" fill="#7C3AED">♪</text><text x="300" y="90" font-size="36" fill="#DB2777">♫</text>`;
    else if (a === 'eating') fig = person(240, G, 'na', 'hold', { s: 1.25, mood: 'joy', prop: 'calf' })
      + `<g transform="translate(240 ${G - 54}) scale(.85)"><path d="M10 -22 L34 -40 M16 -20 L40 -36" stroke="#A16207" stroke-width="3" stroke-linecap="round"/>
         <path d="M-26 -16 H26 Q24 6 0 8 Q-24 6 -26 -16Z" fill="#fff" ${S(1.2)}/><path d="M-22 -16 Q0 -26 22 -16" fill="#FDE68A" ${S(.8)}/><path d="M-20 -8 H20" stroke="#60A5FA" stroke-width="2"/>
         <path d="M-10 -26 q5 -8 0 -14 M2 -26 q5 -8 0 -14" stroke="#94A3B8" stroke-width="2" fill="none" stroke-linecap="round"/></g>`;
    else if (a === 'reading') fig = person(240, G, 'na', 'hold', { s: 1.25, mood: 'joy', prop: 'calf' })
      + `<g transform="translate(240 ${G - 66})"><path d="M0 -26 Q-16 -32 -34 -26 V6 Q-16 0 0 6Z" fill="#fff" ${S(1.2)}/><path d="M0 -26 Q16 -32 34 -26 V6 Q16 0 0 6Z" fill="#fff" ${S(1.2)}/>
         <path d="M-28 -16 H-6 M-28 -8 H-6 M-28 0 H-10 M6 -16 H28 M6 -8 H28 M6 0 H22" stroke="#94A3B8" stroke-width="1.6"/><path d="M-36 -28 V8 Q-18 2 0 8 Q18 2 36 8 V-28" stroke="#2563EB" stroke-width="3" fill="none"/></g>`;
    else fig = `<g transform="translate(240 ${G})"><rect x="-120" y="-40" width="240" height="40" rx="8" fill="#A16207" ${S(1.2)}/><rect x="-126" y="-80" width="16" height="80" rx="4" fill="#92400E" ${S(1)}/></g>${lying(240, G - 40, 'na', { s: 1.25 })}<text x="320" y="130" font-family="${FONT}" font-weight="900" font-size="26" fill="#6366F1">z Z</text>`;
    return (inside ? indoor() : outdoor({ noSun: true })) + k(`f-${a}`, fig)
      + k('now', at(410, inside ? 130 : 52, label(0, 0, 'now', { s: 22, c: '#B45309', bg: '#FEF3C7' })))
      + k('word', at(120, 52, label(0, 0, `is ${a}`, { s: 24 })));
  },
};

// ── Bài 21: Did you...? Yes, I did. / No, I didn't. ──
const DIARY = { football: [true, 'play football', () => ball(16, '#F97316')], TV: [false, 'watch TV', tv], swim: [true, 'swim', () => `<g><path d="M-24 -10 q8 -6 16 0 t16 0 t16 0" stroke="#0EA5E9" stroke-width="4" fill="none"/><path d="M-24 0 q8 -6 16 0 t16 0 t16 0" stroke="#0EA5E9" stroke-width="4" fill="none"/></g>`] };
const g21 = {
  groups: [{ key: 'a', opts: [{ v: 'football', label: 'football', sub: 'đá bóng' }, { v: 'TV', label: 'TV', sub: 'xem ti vi' }, { v: 'swim', label: 'swim', sub: 'bơi' }] }],
  init: { a: 'football' },
  say: ({ a }) => {
    const [yes, verb] = DIARY[a];
    const vi = { football: 'đá bóng', TV: 'xem ti vi', swim: 'bơi' }[a];
    return { en: `*Did* you ${verb} yesterday? ${yes ? 'Yes, I did.' : "No, I didn't."}`, vi: `Hôm qua bạn có ${vi} không? ${yes ? 'Có.' : 'Không.'}` };
  },
  draw: ({ a }) => {
    const rows = Object.entries(DIARY).map(([key, [yes, verb, fn]], i) => {
      const y = 88 + i * 58, on = key === a;
      return `<g opacity="${on ? 1 : 0.55}"><rect x="30" y="${y - 24}" width="252" height="48" rx="10" fill="${on ? '#FEF9C3' : '#fff'}" stroke="${on ? '#D97706' : '#E2E8F0'}" stroke-width="${on ? 2.5 : 1.2}"/>
        ${at(70, y + 16, fn(), 0.7)}<text x="100" y="${y + 6}" font-family="${FONT}" font-weight="800" font-size="16" fill="#334155">${verb}</text>${badge(yes, 258, y, 13)}</g>`;
    }).join('');
    const yes = DIARY[a][0];
    return indoor() + `<rect x="18" y="22" width="276" height="216" rx="14" fill="#fff" stroke="${LINE}" stroke-width="1.4"/><rect x="18" y="22" width="276" height="34" rx="14" fill="#EF4444"/><rect x="18" y="42" width="276" height="14" fill="#EF4444"/>
      <text x="156" y="46" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="18" fill="#fff">Yesterday</text>` + rows
      + person(390, G, 'minh', 'stand', { s: 1.1, mood: yes ? 'joy' : 'sad', flip: true })
      + k('ans', at(384, 104, bubble(0, 0, yes ? 'Yes, I did.' : "No, I didn't.", 17)));
  },
};

// ── Bài 24: some / any ──
const g24 = {
  groups: [{ key: 'n', opts: [{ v: 3, label: '3 apples', sub: 'có táo' }, { v: 0, label: '0 apples', sub: 'hết táo' }] },
    { key: 't', opts: [{ v: 'say', label: 'There are...', sub: 'câu kể' }, { v: 'ask', label: 'Are there...?', sub: 'câu hỏi' }] }],
  init: { n: 3, t: 'say' },
  say: ({ n, t }) => {
    if (t === 'say') return n ? { en: 'There are *some* apples.', vi: 'Có vài quả táo.' } : { en: "There aren't *any* apples.", vi: 'Không có quả táo nào.' };
    return n ? { en: 'Are there *any* apples? Yes, there are.', vi: 'Có quả táo nào không? Có.' } : { en: "Are there *any* apples? No, there aren't.", vi: 'Có quả táo nào không? Không.' };
  },
  draw: ({ n, t }) => {
    const word = t === 'ask' ? 'any ?' : n ? 'some' : "not any";
    return indoor() + at(250, G, table(), 1.3)
      + `<g transform="translate(250 ${G - 109})"><path d="M-46 -40 Q-40 -86 0 -86 Q40 -86 46 -40" stroke="#A16207" stroke-width="5" fill="none"/>
         ${Array.from({ length: n }, (_, i) => k(`ap${i}`, at([-22, 22, 0][i], [-36, -36, -50][i], apple(16)))).join('')}
         <path d="M-52 -40 H52 L44 0 H-44Z" fill="#D6A26B" ${S(1.3)}/><path d="M-48 -26 H48 M-46 -12 H46" stroke="#A16207" stroke-width="1.4"/></g>`
      + person(96, G, 'na', t === 'ask' ? 'point' : 'stand', { s: 1.05, mood: n ? 'joy' : 'sad' })
      + (t === 'ask' ? k('q', at(110, 96, bubble(0, 0, 'Any apples?', 16))) : '')
      + k('word', at(400, 136, label(0, 0, word, { s: 26, c: n || t === 'ask' ? '#1E3A8A' : '#B91C1C' })));
  },
};

// ── Bài 25: What / Where / Who / How many ──
const WH = {
  Who: ['*Who* is she? She is Na.', 'Bạn ấy là ai? Là Na.', [150, G - 60, 58]],
  What: ['*What* is it? It is a kite.', 'Đó là cái gì? Là cái diều.', [330, 70, 44]],
  Where: ['*Where* is Na? She is in the park.', 'Na ở đâu? Ở công viên.', [240, 150, 230]],
  'How many': ['*How many* birds are there? Three.', 'Có bao nhiêu con chim? Ba con.', [400, 150, 58]],
};
const g25 = {
  groups: [{ key: 'q', opts: [{ v: 'Who', label: 'Who', sub: 'ai' }, { v: 'What', label: 'What', sub: 'cái gì' }, { v: 'Where', label: 'Where', sub: 'ở đâu' }, { v: 'How many', label: 'How many', sub: 'bao nhiêu' }] }],
  init: { q: 'Who' },
  say: ({ q }) => ({ en: WH[q][0], vi: WH[q][1] }),
  draw: ({ q }) => {
    const [x, y, r] = WH[q][2];
    return outdoor({ noSun: true }) + tree(60, G - 4, 0.9)
      + `<g transform="translate(240 ${G - 30})"><rect x="-34" y="-4" width="68" height="8" fill="#A16207"/><rect x="-30" y="4" width="4" height="22" fill="#92400E"/><rect x="26" y="4" width="4" height="22" fill="#92400E"/></g>`
      + label(250, G - 62, 'PARK', { s: 13, c: '#15803D' })
      + person(150, G, 'na', 'raise', { s: 1, mood: 'joy' }) + `<path d="M168 ${G - 110} Q240 140 330 96" stroke="${LINE}" stroke-width="1" fill="none"/>` + at(330, 84, kite(), 1)
      + [[372, 132], [404, 120], [432, 140]].map(([bx, by]) => at(bx, by, bird(true), 0.7)).join('')
      + k('ring', `<g transform="translate(${x} ${y})"><circle r="${r}" fill="none" stroke="#F59E0B" stroke-width="5" stroke-dasharray="${r > 100 ? '14 10' : '0'}" opacity=".95"/></g>`)
      + k('word', at(120, 46, label(0, 0, `${q}?`, { s: 26 })));
  },
};

// ── Bài 27: and / but / because ──
const g27 = {
  groups: [{ key: 'c', opts: [{ v: 'and', label: 'and', sub: 'và' }, { v: 'but', label: 'but', sub: 'nhưng' }, { v: 'because', label: 'because', sub: 'vì' }] }],
  init: { c: 'and' },
  say: ({ c }) => ({
    and: { en: 'I like apples *and* bananas.', vi: 'Tớ thích táo và chuối.' }, but: { en: 'The turtle is small *but* strong.', vi: 'Con rùa nhỏ nhưng khoẻ.' },
    because: { en: 'I am tired *because* I ran a lot.', vi: 'Tớ mệt vì tớ đã chạy nhiều.' },
  })[c],
  draw: ({ c }) => {
    const panel = (x, inner, cap) => `<g><rect x="${x - 100}" y="40" width="200" height="200" rx="18" fill="#fff" stroke="${LINE}" stroke-width="1.4"/>${inner}
      <text x="${x}" y="226" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="18" fill="#334155">${cap}</text></g>`;
    let L, R;
    if (c === 'and') { L = panel(120, at(120, 190, apple(34)), 'apples'); R = panel(360, at(360, 180, banana(), 1.6), 'bananas'); }
    else if (c === 'but') { L = panel(120, at(120, 196, turtle(), 1.6), 'small'); R = panel(360, at(360, 196, turtle(), 1.3) + at(360, 136, rock(), 1.1) + `<path d="M330 ${150} l-10 -10 M392 150 l10 -10" stroke="#F59E0B" stroke-width="3"/>`, 'strong'); }
    else { L = panel(120, `<g transform="translate(120 210) scale(1)">${person(0, 0, 'bon', 'stand', { s: 1, mood: 'sad' })}</g><text x="160" y="90" font-size="24">💦</text>`, 'tired'); R = panel(360, `<g transform="translate(350 210) scale(1)">${person(0, 0, 'bon', 'run', { s: 1, mood: 'joy' })}</g>`, 'I ran'); }
    return `<rect width="480" height="300" fill="#F0F9FF"/>` + k(`L-${c}`, L) + k(`R-${c}`, R)
      + k('chip', `<g transform="translate(240 140)"><rect x="${-c.length * 8 - 14}" y="-24" width="${c.length * 16 + 28}" height="48" rx="24" fill="#FDE047" stroke="#D97706" stroke-width="3"/>
         <text y="9" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="24" fill="#92400E">${c}</text></g>`)
      + (c === 'because' ? `<path d="M298 268 H182" stroke="#64748B" stroke-width="3" marker-end="url(#egArr)"/><defs><marker id="egArr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#64748B"/></marker></defs><text x="240" y="290" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="13" fill="#64748B">lý do</text>` : '');
  },
};

export const DEMOS = {
  g01, g02, g03, g04, g05, g09, g12, g13, g14, g15, g16, g21, g24, g25, g27,
  g06: nearFar([{ v: 'This', label: 'This', sub: 'gần' }, { v: 'That', label: 'That', sub: 'xa' }]),
  g07: nearFar([{ v: 'This', label: 'This', sub: '1, gần' }, { v: 'These', label: 'These', sub: 'nhiều, gần' }, { v: 'That', label: 'That', sub: '1, xa' }, { v: 'Those', label: 'Those', sub: 'nhiều, xa' }]),
  g08, g10, g11, g17,
  g18: timeline([T('yesterday', 'I *was* at the beach yesterday.', 'Hôm qua tớ đã ở bãi biển.', '🏖️'), T('today', 'I *am* at school today.', 'Hôm nay tớ ở trường.', '🏫')]),
  g19: timeline([T('yesterday', 'I *played* football yesterday.', 'Hôm qua tớ đã đá bóng.', '⚽'), T('today', 'I *play* football every day.', 'Ngày nào tớ cũng đá bóng.', '⚽')]),
  g20: timeline([T('yesterday', 'I *went* to the park yesterday.', 'Hôm qua tớ đã đi công viên.', '🏞️'), T('today', 'I *go* to the park every day.', 'Ngày nào tớ cũng đi công viên.', '🏞️')]),
  g22: timeline([T('today', 'I *swim* every day.', 'Ngày nào tớ cũng bơi.', '🏊'), T('tomorrow', 'I *am going to* swim tomorrow.', 'Mai tớ định đi bơi.', '🏊')]),
  g23, g26,
  g28: timeline([T('today', 'It *is* rainy today.', 'Hôm nay trời mưa.', '🌧️'), T('tomorrow', 'It *will be* sunny tomorrow.', 'Mai trời sẽ nắng.', '☀️')]),
};

// Dùng chung cho demosMore.js (bài g29–g64).
export { G, k, at, FONT, label, bubble, spot, shadow, outdoor, indoor, duck, ball, box, table, house, kite, bag, dashed, NUM, NUM_VI, S, elephant, mouse, giftBox, apple, egg, umbrella, bus, bike, bird, fish, penguin, iceCream, carrot, pizza, banana, turtle, tv, rock, badge, heart, sea, motion, bigWord, clock, week };
