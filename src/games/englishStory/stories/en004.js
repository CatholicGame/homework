/**
 * Bài 4 "Colours in My Room": phòng của Minh trải dài từ cửa vào (trái) tới góc của Lucky và Kitty (phải):
 * giường · bàn học + ghế · diều trên tường · ô trong ống · đồng hồ · bàn hoa quả (táo, cam) · bóng của Lucky · hộp của Kitty.
 * Lúc đầu mọi đồ vật chỉ là nét nhạt (như tranh chưa tô). "I have got a …" → khoanh vòng + nhãn tên đồ vật;
 * "It is <màu>." → đồ vật hiện đúng màu (lớp nhạt mờ đi, class st-c-*) + ô màu có tên màu.
 * Toạ độ cảnh: rộng 1440, cao 315, sàn y = 282.
 */
import { KIT_CSS, L, label, windowBox } from '../kit.js';

const FLOOR = 282;
const W = 1440;

const LUCKY_X = 1196, KITTY_X = 1350;
const OBJ = ['bed', 'desk', 'chair', 'kite', 'umb', 'clock', 'apple', 'orange', 'ball', 'box'];
const POPS = ['room', 'small', 'bed', 'blue', 'desk', 'brown', 'chair', 'green', 'kite', 'ry', 'umb', 'purple', 'clock', 'pink',
  'apple', 'red', 'orange', 'orange2', 'ball', 'white', 'box', 'grey', 'love'];

const pop = (name, x, y, inner) => `<g transform="translate(${x} ${y})"><g class="e004-pop e004-p-${name}">${inner}</g></g>`;
const txt = (x, y, t, size = 18, c = '#1D4ED8') => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="${size}" fill="${c}">${t}</text>`;
const swatch = (c, name, tc = '#1F2937') => { const w = 76 + name.length * 13; return `<rect x="${-w / 2}" y="-24" width="${w}" height="48" rx="24" fill="#fff" stroke="${L}" stroke-width="1.6"/>
  <circle cx="${-w / 2 + 26}" cy="0" r="15" fill="${c}" stroke="${L}" stroke-width="1.4"/>${txt(16, 8, name, 22, tc)}`; };
const ringAt = (name, x, y, rx, ry = rx) => pop(name, x, y, `<ellipse class="e004-ring" rx="${rx}" ry="${ry}" fill="none" stroke="#F97316" stroke-width="3" stroke-dasharray="8 5"/>`);
/** Đồ vật: bản màu + bản nhạt chồng lên (mờ đi khi có st-c-<tên>). */
const obj = (name, art) => `<g>${art}</g><g class="e004-pale e004-o-${name}" filter="url(#e004pale)">${art}</g>`;
const PALE = `<filter id="e004pale" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values="0"/>
  <feComponentTransfer><feFuncR type="linear" slope="0.32" intercept="0.68"/><feFuncG type="linear" slope="0.32" intercept="0.68"/><feFuncB type="linear" slope="0.32" intercept="0.68"/></feComponentTransfer></filter>`;

// ── Đồ vật (toạ độ cảnh) ───────────────────────────────────────────────────
const BED = `<rect x="150" y="150" width="16" height="132" rx="4" fill="#1D4ED8" stroke="${L}"/><rect x="380" y="200" width="14" height="82" rx="4" fill="#1D4ED8" stroke="${L}"/>
  <rect x="160" y="226" width="228" height="26" rx="6" fill="#fff" stroke="${L}"/><rect x="160" y="250" width="228" height="14" fill="#1E40AF" stroke="${L}"/>
  <rect x="172" y="208" width="54" height="22" rx="10" fill="#fff" stroke="${L}"/>
  <path d="M240 228 Q300 212 386 222 V256 H240Z" fill="#3B82F6" stroke="${L}"/><path d="M262 226 V254 M300 220 V254 M340 218 V254" stroke="#93C5FD" stroke-width="3"/>`;
const DESK = `<rect x="450" y="200" width="140" height="12" rx="3" fill="#A0522D" stroke="${L}"/><rect x="456" y="212" width="12" height="70" fill="#8B4513" stroke="${L}"/>
  <rect x="540" y="212" width="46" height="70" fill="#A0522D" stroke="${L}"/><path d="M540 236 H586 M540 260 H586" stroke="${L}"/><circle cx="563" cy="224" r="2.4" fill="#FDE68A"/><circle cx="563" cy="248" r="2.4" fill="#FDE68A"/>
  <path d="M470 200 V170 L482 160" stroke="${L}" stroke-width="3" fill="none"/><path d="M474 150 L496 162 L486 172Z" fill="#FACC15" stroke="${L}"/>
  <rect x="502" y="186" width="30" height="14" rx="2" fill="#38BDF8" stroke="${L}"/><rect x="506" y="178" width="26" height="8" rx="2" fill="#F472B6" stroke="${L}"/>`;
const CHAIR = `<rect x="606" y="150" width="12" height="132" rx="3" fill="#16A34A" stroke="${L}"/><rect x="604" y="148" width="50" height="40" rx="8" fill="#22C55E" stroke="${L}"/>
  <rect x="604" y="226" width="62" height="10" rx="3" fill="#22C55E" stroke="${L}"/><rect x="654" y="236" width="10" height="46" fill="#16A34A" stroke="${L}"/>`;
const KITE = `<g transform="translate(736 108)"><path d="M0 -44 L32 0 L0 52 L-32 0Z" fill="#EF4444" stroke="${L}" stroke-width="1.4"/>
  <path d="M0 -44 L32 0 L0 0Z M0 0 L-32 0 L0 52Z" fill="#FACC15" stroke="${L}" stroke-width="1"/><path d="M0 -44 V52 M-32 0 H32" stroke="${L}" stroke-width="1.2"/>
  <path d="M0 52 Q-14 72 4 88 T-2 124" stroke="${L}" stroke-width="1.4" fill="none"/>
  ${[[-6, 70, '#FACC15'], [3, 92, '#EF4444'], [-3, 114, '#FACC15']].map(([x, y, c]) => `<path d="M${x - 7} ${y - 5} L${x + 7} ${y + 5} M${x - 7} ${y + 5} L${x + 7} ${y - 5}" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`).join('')}</g>`;
const UMB = `<path d="M872 120 Q874 110 880 110" stroke="${L}" stroke-width="2.4" fill="none"/><path d="M872 120 L866 250" stroke="${L}" stroke-width="2"/>
  <path d="M870 136 Q850 190 864 250 L872 250 Q890 190 874 136Z" fill="#A855F7" stroke="${L}"/><path d="M868 150 Q862 200 868 248" stroke="#7E22CE" stroke-width="2" fill="none"/>
  <rect x="848" y="236" width="40" height="46" rx="4" fill="#7E22CE" stroke="${L}"/><path d="M848 250 H888" stroke="#C084FC" stroke-width="3"/>`;
const CLOCK = `<g transform="translate(972 104)"><circle r="30" fill="#F472B6" stroke="${L}" stroke-width="1.4"/><circle r="23" fill="#fff" stroke="${L}"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M0 -20 V-17" stroke="${L}" stroke-width="1.6" transform="rotate(${i * 30})"/>`).join('')}
  <g class="e004-hand"><path d="M0 0 V-17" stroke="#DB2777" stroke-width="2" stroke-linecap="round"/></g><path d="M0 0 L9 4" stroke="${L}" stroke-width="2.6" stroke-linecap="round"/><circle r="2.4" fill="${L}"/>
  <circle cx="-20" cy="-28" r="7" fill="#F472B6" stroke="${L}"/><circle cx="20" cy="-28" r="7" fill="#F472B6" stroke="${L}"/></g>`;
const APPLE = `<g transform="translate(1040 204)"><path d="M0 -12 C-14 -20 -24 -4 -18 8 C-14 18 -4 20 0 16 C4 20 14 18 18 8 C24 -4 14 -20 0 -12Z" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>
  <path d="M0 -12 Q1 -20 4 -24" stroke="#78350F" stroke-width="2.4" fill="none"/><path d="M3 -20 Q12 -26 16 -18 Q8 -14 3 -20Z" fill="#22C55E" stroke="${L}" stroke-width="0.8"/><path d="M-11 -4 q2 -6 7 -7" stroke="#fff" stroke-width="2.4" fill="none" opacity="0.6"/></g>`;
const ORANGE = `<g transform="translate(1096 206)"><circle r="18" fill="#F97316" stroke="${L}" stroke-width="1.2"/>${[[-6, -4], [5, 2], [-2, 8], [8, -8]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1" fill="#C2410C"/>`).join('')}
  <path d="M0 -18 l-2 -5" stroke="#78350F" stroke-width="2"/><path d="M-1 -20 Q-12 -28 -14 -18 Q-6 -16 -1 -20Z" fill="#22C55E" stroke="${L}" stroke-width="0.8"/><path d="M-10 -8 q2 -5 6 -6" stroke="#fff" stroke-width="2.4" fill="none" opacity="0.5"/></g>`;
const BALL = `<g transform="translate(1262 264)"><circle r="17" fill="#fff" stroke="${L}" stroke-width="1.4"/><path d="M-17 0 Q0 -9 17 0 M0 -17 Q-7 0 0 17" stroke="#CBD5E1" stroke-width="2" fill="none"/><path d="M-9 -9 q4 -4 9 -4" stroke="#E2E8F0" stroke-width="2.4" fill="none"/></g>`;
const BOX = `<g transform="translate(${KITTY_X} 0)"><path d="M-48 228 L-62 206 L-6 206 L0 228Z M48 228 L62 206 L6 206 L0 228Z" fill="#9CA3AF" stroke="${L}"/>
  <rect x="-48" y="228" width="96" height="54" fill="#9CA3AF" stroke="${L}" stroke-width="1.2"/><path d="M-48 240 H48" stroke="#6B7280" stroke-width="2"/><rect x="-14" y="248" width="28" height="12" rx="2" fill="#D1D5DB" stroke="#6B7280"/></g>`;

function bg() {
  return `
  <defs>${PALE}</defs>
  <rect x="0" y="0" width="${W}" height="${FLOOR}" fill="#FEF9C3"/>
  ${Array.from({ length: 24 }, (_, i) => `<path d="M${i * 60 + 30} 12 V${FLOOR}" stroke="#FDE68A" stroke-width="10" opacity="0.5"/>`).join('')}
  <rect x="0" y="0" width="${W}" height="12" fill="#E9D5B5" stroke="${L}"/>
  <rect x="0" y="${FLOOR}" width="${W}" height="${315 - FLOOR}" fill="#D9A066" stroke="${L}"/>
  ${Array.from({ length: 25 }, (_, i) => `<path d="M${i * 60} ${FLOOR} V315" stroke="#B9824F" stroke-width="1.2"/>`).join('')}
  <rect x="0" y="${FLOOR - 10}" width="${W}" height="10" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>
  <!-- cửa vào -->
  <rect x="14" y="110" width="72" height="172" rx="4" fill="#FEF3C7" stroke="${L}" stroke-width="1.2"/><rect x="18" y="114" width="64" height="168" fill="#FDE68A"/>
  <g class="e004-door"><rect x="18" y="114" width="64" height="168" fill="#B45309" stroke="${L}"/><rect x="26" y="124" width="48" height="56" rx="4" fill="#92400E"/><rect x="26" y="190" width="48" height="80" rx="4" fill="#92400E"/><circle cx="72" cy="200" r="3.4" fill="#FDE68A" stroke="${L}"/></g>
  ${windowBox(250, 50, 110, 90)}
  <rect x="420" y="70" width="70" height="56" rx="3" fill="#fff" stroke="${L}"/><path d="M430 116 L448 92 L460 106 L470 96 L482 116Z" fill="#86EFAC" stroke="${L}" stroke-width="0.8"/><circle cx="470" cy="86" r="6" fill="#FDE047"/>
  <!-- bàn hoa quả -->
  <rect x="1012" y="222" width="114" height="10" rx="3" fill="#F5F5F4" stroke="${L}"/><path d="M1028 232 V${FLOOR} M1110 232 V${FLOOR}" stroke="#A16207" stroke-width="6"/>
  <ellipse cx="1068" cy="222" rx="54" ry="5" fill="#E7E5E4" stroke="${L}" stroke-width="0.8"/>
  <!-- góc thú cưng -->
  <ellipse cx="${LUCKY_X}" cy="${FLOOR + 4}" rx="70" ry="9" fill="#FCA5A5" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(1340 82)"><rect x="-44" y="-26" width="88" height="52" rx="4" fill="#fff" stroke="${L}"/>${[[-20, 4], [0, -6], [20, 4], [-10, -16], [10, -16]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y + 6}" rx="${i < 3 ? 7 : 5}" ry="${i < 3 ? 6 : 5}" fill="#FDBA74"/>`).join('')}</g>
  ${obj('bed', BED)}${obj('desk', DESK)}${obj('chair', CHAIR)}${obj('kite', KITE)}${obj('umb', UMB)}${obj('clock', CLOCK)}
  ${obj('apple', APPLE)}${obj('orange', ORANGE)}${obj('ball', BALL)}
  <!-- cầu vồng (câu cuối) -->
  ${pop('love', 1190, 262, `${['#EF4444', '#F97316', '#FACC15', '#22C55E', '#3B82F6', '#A855F7'].map((c, i) => `<path d="M${-300 + i * 12} 0 A${300 - i * 12} ${190 - i * 12} 0 0 1 ${300 - i * 12} 0" stroke="${c}" stroke-width="12" fill="none" opacity="0.6"/>`).join('')}`)}`;
}

function fg() {
  return `
  <defs>${PALE}</defs>
  ${obj('box', BOX)}
  ${pop('room', 160, 96, label(0, 0, 'my room', '#DB2777', 24))}
  ${pop('small', 120, 96, label(0, 0, 'small', '#2563EB', 22))}${pop('small', 236, 96, label(0, 0, 'nice', '#DB2777', 22))}
  ${ringAt('bed', 270, 232, 132, 40)}${pop('bed', 270, 176, label(0, 0, 'a bed', '#1D4ED8', 22))}
  ${pop('blue', 290, 180, swatch('#3B82F6', 'blue', '#1D4ED8'))}
  ${ringAt('desk', 520, 216, 82, 72)}${pop('desk', 520, 128, label(0, 0, 'a desk', '#92400E', 22))}
  ${pop('brown', 520, 126, swatch('#A0522D', 'brown', '#92400E'))}
  ${ringAt('chair', 634, 214, 44, 76)}${pop('chair', 640, 120, label(0, 0, 'a chair', '#15803D', 22))}
  ${pop('green', 640, 118, swatch('#22C55E', 'green', '#15803D'))}
  ${ringAt('kite', 736, 140, 50, 100)}${pop('kite', 820, 64, label(0, 0, 'a kite', '#DC2626', 22))}
  ${pop('ry', 0, 0, `<g transform="translate(626 70)">${swatch('#EF4444', 'red', '#DC2626')}</g><g transform="translate(850 70)">${swatch('#FACC15', 'yellow', '#CA8A04')}</g>`)}
  ${ringAt('umb', 868, 196, 34, 92)}${pop('umb', 860, 76, label(0, 0, 'an umbrella', '#7E22CE', 20))}
  ${pop('purple', 860, 76, swatch('#A855F7', 'purple', '#7E22CE'))}
  ${ringAt('clock', 972, 100, 44)}${pop('clock', 972, 176, label(0, 0, 'a clock', '#DB2777', 20))}
  ${pop('pink', 972, 178, swatch('#F472B6', 'pink', '#DB2777'))}
  ${ringAt('apple', 1040, 202, 30)}${pop('apple', 1040, 152, label(0, 0, 'an apple', '#DC2626', 20))}
  ${pop('red', 1040, 152, swatch('#EF4444', 'red', '#DC2626'))}
  ${ringAt('orange', 1096, 204, 28)}${pop('orange', 1096, 152, label(0, 0, 'an orange', '#EA580C', 20))}
  ${pop('orange2', 1096, 152, swatch('#F97316', 'orange', '#EA580C'))}
  ${ringAt('ball', 1262, 264, 26)}${pop('ball', 1250, 172, label(0, 0, 'a ball', '#334155', 22))}
  ${pop('white', 1250, 172, swatch('#FFFFFF', 'white', '#475569'))}
  ${ringAt('box', KITTY_X, 240, 70, 46)}${pop('box', KITTY_X, 150, label(0, 0, 'a box', '#4B5563', 22))}
  ${pop('grey', KITTY_X - 10, 150, swatch('#9CA3AF', 'grey', '#4B5563'))}
  ${pop('love', 0, 0, label(1150, 84, 'colours', '#7C3AED', 22))}`;
}

const CSS = `
.e004-pop { opacity: 0; transform: scale(.3); transition: opacity .3s, transform .5s cubic-bezier(.3,1.6,.5,1); }
${POPS.map((n) => `.st-t-${n} .e004-p-${n}`).join(', ')} { opacity: 1; transform: none; }
.e004-ring { transform-box: fill-box; transform-origin: center; animation: e004Pulse .7s ease-in-out infinite alternate; }
@keyframes e004Pulse { from { transform: scale(.95); } to { transform: scale(1.05); } }
.e004-pale { transition: opacity 1s ease-in; }
${OBJ.map((n) => `.st-c-${n} .e004-o-${n}`).join(', ')} { opacity: 0; }
.e004-hand { animation: e004Tick 8s steps(8) infinite; }
@keyframes e004Tick { to { transform: rotate(360deg); } }
.e004-door { transform-origin: 18px 200px; transition: transform .6s cubic-bezier(.4,0,.2,1); }
.st-door .e004-door { transform: scaleX(.14); }
@media (prefers-reduced-motion: reduce) { .e004-ring { animation-duration: 1.6s; } }
`;

function tag(st, ...names) {
  for (const k of [...st.state]) if (k.startsWith('st-t-')) st.set(k, false);
  names.forEach((n) => st.set(`st-t-${n}`));
}
const rest = (st, ...ids) => ids.forEach((id) => { st.act(id, null); st.pose(id, 'stand'); st.mood(id, 'happy'); });
/** "I have got a …": Minh chỉ, đồ vật được khoanh. */
async function have(st, name, cx, pose = 'point', ms = 1500) {
  tag(st, name);
  st.look(cx, { dur: 500 });
  st.pose('minh', pose); st.act('minh', 'point');
  await st.wait(ms);
  rest(st, 'minh');
}
/** "It is <màu>.": đồ vật hiện màu + ô màu. */
async function colour(st, obj, sw, x, y, cx, ms = 1700) {
  tag(st, sw);
  st.look(cx, { dur: 500 });
  st.set(`st-c-${obj}`);
  st.sfx('sparkle', { vol: 0.6 });
  st.fx('sparkle', x, y);
  st.mood('minh', 'joy');
  await st.wait(ms);
  st.mood('minh', 'happy');
}

const BEATS = [
  { key: ['This is my room'], icon: '🚪', label: 'my room', async play(st) {
    tag(st);
    st.set('st-door'); st.sfx('door-open');
    st.show('minh', true);
    await st.walk('minh', 120, { speed: 120, follow: false });
    tag(st, 'room');
    st.pose('minh', 'open'); st.mood('minh', 'joy');
    await st.wait(900);
    rest(st, 'minh');
  } },
  { key: ['small and nice'], icon: '✨', label: 'small, nice', async play(st) {
    tag(st, 'small');
    st.pose('minh', 'clap'); st.act('minh', 'clap'); st.mood('minh', 'joy');
    st.fx('sparkle', 180, 140);
    await st.wait(1700);
    rest(st, 'minh');
  } },
  { key: ['a bed'], icon: '🛏️', label: 'a bed', async play(st) {
    await have(st, 'bed', 240);
  } },
  { key: ['blue'], icon: '🟦', label: 'blue', async play(st) {
    await colour(st, 'bed', 'blue', 290, 236, 240);
  } },
  { key: ['a desk'], icon: '🪑', label: 'a desk', async play(st) {
    tag(st);
    await st.walk('minh', 410, { speed: 170, lead: 60 });
    await have(st, 'desk', 470, 'point', 1000);
  } },
  { key: ['brown'], icon: '🟫', label: 'brown', async play(st) {
    await colour(st, 'desk', 'brown', 520, 206, 480);
  } },
  { key: ['a chair'], icon: '🪑', label: 'a chair', async play(st) {
    await have(st, 'chair', 520);
  } },
  { key: ['green'], icon: '🟩', label: 'green', async play(st) {
    await colour(st, 'chair', 'green', 634, 200, 520);
  } },
  { key: ['a kite'], icon: '🪁', label: 'a kite', async play(st) {
    tag(st);
    await st.walk('minh', 690, { speed: 170, lead: 40 });
    await have(st, 'kite', 736, 'pointUp', 1000);
  } },
  { key: ['red and yellow'], icon: '🟥', label: 'red, yellow', async play(st) {
    await colour(st, 'kite', 'ry', 736, 120, 738, 2200);
  } },
  { key: ['an umbrella'], icon: '☂️', label: 'umbrella', async play(st) {
    await have(st, 'umb', 790);
  } },
  { key: ['purple'], icon: '🟪', label: 'purple', async play(st) {
    await colour(st, 'umb', 'purple', 868, 190, 790);
  } },
  { key: ['a clock, too'], icon: '⏰', label: 'a clock', async play(st) {
    tag(st);
    await st.walk('minh', 930, { speed: 170, lead: 30 });
    await have(st, 'clock', 960, 'pointUp', 1000);
  } },
  { key: ['It is pink!'], icon: '🩷', label: 'pink', async play(st) {
    await colour(st, 'clock', 'pink', 972, 100, 960);
  } },
  { key: ['an apple'], icon: '🍎', label: 'an apple', async play(st) {
    tag(st);
    await have(st, 'apple', 1010, 'point', 1500);
  } },
  { key: ['It is red'], icon: '🟥', label: 'red', async play(st) {
    await colour(st, 'apple', 'red', 1040, 200, 1010);
  } },
  { key: ['an orange'], icon: '🍊', label: 'an orange', async play(st) {
    await have(st, 'orange', 1020);
  } },
  { key: ['It is orange!'], icon: '🟧', label: 'orange', async play(st) {
    await colour(st, 'orange', 'orange2', 1096, 204, 1020);
  } },
  { key: ['Lucky has got a ball'], icon: '⚽', label: 'a ball', async play(st) {
    tag(st);
    await st.walk('minh', 1100, { speed: 170, lead: 110 });
    tag(st, 'ball');
    st.dog('lucky', 'stand'); st.act('lucky', 'wag'); st.mood('lucky', 'joy');
    st.sfx('dog-bark', { vol: 0.7 });
    await st.wait(1200);
    st.act('lucky', null);
  } },
  { key: ['It is white'], icon: '⚪', label: 'white', async play(st) {
    await colour(st, 'ball', 'white', 1262, 262, 1210);
  } },
  { key: ['Kitty has got a box'], icon: '📦', label: 'a box', async play(st) {
    tag(st, 'box');
    st.look(1260, { dur: 500 });
    st.act('kitty', 'jump'); st.mood('kitty', 'joy');
    await st.wait(1500);
    st.act('kitty', null); st.mood('kitty', 'happy');
  } },
  { key: ['It is grey'], icon: '🩶', label: 'grey', async play(st) {
    await colour(st, 'box', 'grey', KITTY_X, 250, 1260);
  } },
  { key: ['I love the colours in my room!'], icon: '🌈', label: 'colours', async play(st) {
    tag(st, 'love');
    st.look(1200, { dur: 600 });
    st.pose('minh', 'cheer'); st.act('minh', 'hop'); st.mood('minh', 'joy');
    st.act('lucky', 'jump'); st.act('kitty', 'wag');
    st.fx('hearts', 1100, 130);
    await st.wait(800);
    st.fx('sparkle', 1200, 110);
    await st.wait(1600);
    rest(st, 'minh'); st.act('lucky', null); st.act('kitty', null);
  } },
];

export default {
  id: 'en004', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  cast: [
    { id: 'lucky', kind: 'dog', x: LUCKY_X, s: 0.95, face: 1 },
    { id: 'kitty', kind: 'cat', x: KITTY_X, y: FLOOR - 46, s: 1, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 52 },
  ],
  init(st) {
    st.show('minh', false);
    st.dog('lucky', 'sit'); st.dog('kitty', 'sit');
  },
};
