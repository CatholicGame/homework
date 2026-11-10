/**
 * Bài 20 "Happy Birthday, Lan!": cửa phòng Lan + lịch tường (5 tháng 5) → phòng khách (băng rôn, bóng số 11)
 * → bảng "Our Birthdays" 12 tháng (ảnh mỗi người gắn vào đúng tháng) → bàn tiệc (bánh, nến, quà) → bếp.
 * Toạ độ cảnh: rộng 1350, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { headOnly } from '../../tiengViet3/cast.js';
import { BOOK } from '../rig.js';
import { KIT_CSS, L, room, label, table, windowBox, rug } from '../kit.js';

const FLOOR = 282;
const MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
const CARD_C = ['#BFDBFE', '#FBCFE8', '#BBF7D0', '#FDE68A', '#FECACA', '#DDD6FE'];
/** Tâm ô tháng m (0 = January): 6 cột × 2 hàng; slot = chỗ gắn ảnh. */
const card = (m) => ({ x: 469 + (m % 6) * 65, y: m < 6 ? 62 : 114 });
const slot = (m) => { const c = card(m); return [c.x, c.y + 32]; };

// ── Đồ vật ────────────────────────────────────────────────────────────────
let clipN = 0;
/** Ảnh tròn chân dung (cắt theo khung tròn để tóc dài không tràn ra). */
const PHOTO = (who, s = 0.5) => { const id = `e020clip${clipN++}`; return `<defs><clipPath id="${id}"><circle r="12"/></clipPath></defs><circle r="12.6" fill="#FEF3C7"/>
  <g clip-path="url(#${id})"><g transform="translate(0 3)">${headOnly(who, { s })}</g></g><circle r="12.6" fill="none" stroke="${L}" stroke-width="1.4"/>`; };
const GIFT = (c = '#F472B6', r = '#FACC15') => `<rect x="-14" y="-10" width="28" height="22" rx="2" fill="${c}" stroke="${L}" stroke-width="1"/><rect x="-16" y="-15" width="32" height="7" rx="2" fill="${c}" stroke="${L}" stroke-width="1"/>
  <path d="M-2 -15 V12 M2 -15 V12" stroke="${r}" stroke-width="2.4"/><path d="M0 -15 q-10 -10 -12 -2 q4 4 12 2 q10 -10 12 -2 q-4 4 -12 2" fill="${r}" stroke="${L}" stroke-width="0.8"/>`;
const KITTY_PIC = `<rect x="-18" y="-16" width="36" height="30" rx="2" fill="#F59E0B" stroke="${L}" stroke-width="1"/><rect x="-14" y="-12" width="28" height="22" fill="#E0F2FE"/>
  <path d="M-14 10 Q0 2 14 10Z" fill="#86EFAC"/><g transform="translate(0 3)"><path d="M-9 -8 L-8 -16 L-3 -11Z M3 -11 L8 -16 L9 -8Z" fill="#fff" stroke="${L}" stroke-width="0.7"/>
  <circle r="9" fill="#fff" stroke="${L}" stroke-width="0.8"/><circle cx="-3.4" cy="-1" r="1.4" fill="#22C55E"/><circle cx="3.4" cy="-1" r="1.4" fill="#22C55E"/><path d="M-1 2.4 h2 l-1 1.2Z" fill="#F9A8D4"/><path d="M-2.4 4.6 q2.4 1.6 4.8 0" stroke="${L}" stroke-width="0.6" fill="none"/></g>`;
const CAKE = (x, y) => `<g transform="translate(${x} ${y})">
  <ellipse cx="0" cy="0" rx="40" ry="6" fill="#E5E7EB" stroke="${L}"/>
  <path d="M-32 -2 V-22 H32 V-2Z" fill="#F9A8D4" stroke="${L}" stroke-width="1.1"/><path d="M-26 -22 V-38 H26 V-22Z" fill="#FDF2F8" stroke="${L}" stroke-width="1.1"/>
  <path d="M-32 -18 q8 6 16 0 q8 6 16 0 q8 6 16 0 q8 6 16 0" stroke="#fff" stroke-width="3" fill="none"/><path d="M-26 -34 q6.5 5 13 0 q6.5 5 13 0 q6.5 5 13 0 q6.5 5 13 0" stroke="#F472B6" stroke-width="2.4" fill="none"/>
  ${[-22, -8, 6, 20].map((dx) => `<circle cx="${dx}" cy="-10" r="2.4" fill="#EF4444"/>`).join('')}
  ${Array.from({ length: 11 }, (_, i) => { const cx = -23 + i * 4.6, cy = -38 - (i % 2) * 2; return `<rect x="${cx - 1.3}" y="${cy - 11}" width="2.6" height="11" fill="${['#60A5FA', '#FACC15', '#F472B6', '#34D399'][i % 4]}" stroke="${L}" stroke-width="0.4"/>
    <path d="M${cx} ${cy - 11} v-2" stroke="${L}" stroke-width="0.6"/><g class="e020-flame" style="--i:${i}"><ellipse cx="${cx}" cy="${cy - 16}" rx="2" ry="3.4" fill="#FB923C"/><ellipse cx="${cx}" cy="${cy - 15}" rx="1" ry="2" fill="#FEF08A"/></g>`; }).join('')}</g>`;
/** Mâm bánh mẹ bưng (gốc = chân mẹ; bánh ở tầm tay). */
const CAKE_CARRY = `<g transform="translate(14 -82)"><ellipse rx="34" ry="5" fill="#E5E7EB" stroke="${L}"/><g transform="scale(0.8)">${CAKE(0, 0).replace(/class="e020-flame"/g, 'class="e020-off"')}</g></g>`;
const numBalloon = (x, y, d) => `<g transform="translate(${x} ${y})"><g class="e020-num" style="transition-delay:${d}s"><path d="M0 34 q-4 30 2 60" stroke="${L}" stroke-width="0.8" fill="none"/>
  <text x="0" y="30" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="64" fill="#FBBF24" stroke="${L}" stroke-width="1.6">1</text>
  <path d="M-3 -6 q4 -8 8 -6" stroke="#fff" stroke-width="2.4" fill="none" opacity="0.7"/></g></g>`;
const balloon = (x, y, c, d = 0) => `<g transform="translate(${x} ${y})"><g class="e020-bal" style="transition-delay:${d}s"><g class="e020-bob" style="animation-delay:${d * 3}s"><path d="M0 18 q-4 14 2 30" stroke="${L}" stroke-width="0.8" fill="none"/>
  <ellipse rx="13" ry="16" fill="${c}" stroke="${L}"/><path d="M-2 16 h4 l-2 4Z" fill="${c}" stroke="${L}" stroke-width="0.6"/><path d="M-6 -7 q3 -4 7 -4" stroke="#fff" stroke-width="2" fill="none" opacity="0.6"/></g></g></g>`;

function bg() {
  return `
  ${room(0, 1350, FLOOR, '#FEF9C3')}
  <rect x="860" y="0" width="490" height="${FLOOR}" fill="#E0F2FE"/><rect x="860" y="0" width="490" height="12" fill="#E9D5B5" stroke="${L}"/>
  ${Array.from({ length: 20 }, (_, i) => `<circle cx="${20 + (i * 89) % 830}" cy="${24 + (i * 47) % 30}" r="2.2" fill="#FCD34D"/>`).join('')}
  <!-- Cửa phòng Lan -->
  <rect x="18" y="110" width="68" height="${FLOOR - 110}" rx="3" fill="#FEF3C7" stroke="${L}" stroke-width="1.2"/><rect x="22" y="114" width="60" height="${FLOOR - 114}" fill="#FDE68A"/>
  <g class="e020-door"><rect x="22" y="114" width="60" height="${FLOOR - 114}" fill="#DB2777" stroke="${L}"/><rect x="30" y="124" width="44" height="48" rx="4" fill="#BE185D"/><rect x="30" y="182" width="44" height="86" rx="4" fill="#BE185D"/><circle cx="72" cy="200" r="3.2" fill="#FDE68A" stroke="${L}"/></g>
  <!-- Lịch tường -->
  <g transform="translate(160 64)"><rect x="-40" y="0" width="80" height="94" rx="4" fill="#fff" stroke="${L}" stroke-width="1.3"/><rect x="-40" y="0" width="80" height="22" rx="4" fill="#EF4444" stroke="${L}" stroke-width="1.3"/>
    <text x="0" y="17" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="15" fill="#fff">MAY</text>
    <text x="0" y="78" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="52" fill="#DC2626">5</text>
    <g transform="translate(0 24)"><g class="e020-page4"><rect x="-38" y="0" width="76" height="68" fill="#F8FAFC" stroke="${L}" stroke-width="0.6"/>
      <text x="0" y="54" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="52" fill="#475569">4</text></g></g>
    <circle cx="-26" cy="0" r="3" fill="#1F2937"/><circle cx="26" cy="0" r="3" fill="#1F2937"/></g>
  <!-- Phòng khách: sofa, bóng bay -->
  <path d="M236 282 V226 Q236 212 250 212 H390 Q404 212 404 226 V282Z" fill="#60A5FA" stroke="${L}" stroke-width="1.2"/><rect x="230" y="240" width="180" height="30" rx="8" fill="#3B82F6" stroke="${L}" stroke-width="1.2"/>
  ${balloon(230, 150, '#EF4444', 0)}${balloon(252, 162, '#22C55E', 0.15)}${balloon(392, 150, '#A855F7', 0.3)}${balloon(414, 164, '#3B82F6', 0.45)}
  ${numBalloon(330, 100, 0)}${numBalloon(366, 100, 0.2)}
  <!-- Băng rôn -->
  <g class="e020-banner"><path d="M214 44 Q320 70 426 44" stroke="${L}" stroke-width="1.2" fill="none"/>
    ${Array.from({ length: 8 }, (_, i) => { const t = (i + 0.5) / 8, x = 214 + 212 * t, y = 44 + 52 * t * (1 - t); return `<path d="M${x - 13} ${y} H${x + 13} L${x} ${y + 24}Z" fill="${['#EF4444', '#FACC15', '#22C55E', '#3B82F6'][i % 4]}" stroke="${L}" stroke-width="0.8"/>`; }).join('')}
    ${label(320, 70, 'HAPPY BIRTHDAY, LAN!', '#DB2777', 14)}</g>
  <!-- Bảng sinh nhật 12 tháng -->
  <rect x="428" y="32" width="402" height="138" rx="6" fill="#FFF7ED" stroke="${L}" stroke-width="1.4"/>
  <text x="629" y="52" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="14" fill="#C2410C">OUR BIRTHDAYS</text>
  ${MONTHS.map((n, m) => { const { x, y } = card(m); return `<g class="e020-card e020-card${m}" transform="translate(${x} ${y})"><g class="e020-cardin">
    <rect x="-29" y="-4" width="58" height="50" rx="4" fill="${CARD_C[m % 6]}" stroke="${L}"/><rect x="-29" y="-4" width="58" height="14" rx="4" fill="#fff" stroke="${L}" stroke-width="0.8"/>
    <text x="0" y="7" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="${n.length > 7 ? 7.4 : 8.6}" fill="#334155">${n}</text>
    <circle cx="0" cy="${32}" r="12" fill="none" stroke="#fff" stroke-width="1.4" stroke-dasharray="3 2"/></g></g>`; }).join('')}
  <g transform="translate(${slot(4).join(' ')})">${PHOTO('en_lan')}<path d="M-9 -12 l3 -8 l3 5 l3 -7 l3 7 l3 -5 l3 8Z" fill="#FACC15" stroke="${L}" stroke-width="0.7"/></g>
  ${[['minh', 9, 'en_minh_home'], ['tom', 6, 'en_tom_home'], ['mum', 11, 'en_mum_home'], ['dad', 2, 'en_dad_home']].map(([k, m, who]) => `<g class="e020-pic e020-pic-${k}" transform="translate(${slot(m).join(' ')})">${PHOTO(who)}</g>`).join('')}
  <g transform="translate(${card(9).x + 20} ${card(9).y + 21})"><g class="e020-tenth"><circle r="11" fill="#EF4444" stroke="${L}"/><text y="3.4" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="9" fill="#fff">10th</text></g></g>
  <!-- Phòng ăn + bếp -->
  ${windowBox(930, 60, 100, 80)}
  <rect x="1206" y="190" width="144" height="${FLOOR - 190}" fill="#F1F5F9" stroke="${L}"/><rect x="1200" y="184" width="150" height="9" rx="2" fill="#94A3B8" stroke="${L}"/>
  ${[1240, 1300].map((x) => `<rect x="${x - 22}" y="206" width="44" height="64" rx="3" fill="#E2E8F0" stroke="${L}" stroke-width="0.8"/><circle cx="${x + 16}" cy="236" r="2.4" fill="#94A3B8"/>`).join('')}
  <g class="e020-kcake">${CAKE(1280, 184).replace(/class="e020-flame"/g, 'class="e020-off"')}</g>
  <rect x="1230" y="70" width="100" height="70" rx="4" fill="#fff" stroke="${L}"/>${[1250, 1280, 1310].map((x) => `<path d="M${x} 80 v40" stroke="#CBD5E1" stroke-width="5" stroke-linecap="round"/>`).join('')}
  ${rug(640, FLOOR, 220, '#FDA4AF')}
  <!-- Nốt nhạc khi hát -->
  <g class="e020-notes">${[[900, 150], [960, 130], [1060, 140], [1120, 120], [1000, 110]].map(([x, y], i) => `<g transform="translate(${x} ${y})"><g class="e020-note" style="animation-delay:${i * 0.25}s"><path d="M0 0 V-18 L10 -21 V-4" stroke="#7C3AED" stroke-width="2" fill="none"/><ellipse cx="-3" cy="0" rx="4" ry="3" fill="#7C3AED"/><ellipse cx="7" cy="-3" rx="4" ry="3" fill="#7C3AED"/></g></g>`).join('')}</g>`;
}

/** Lớp trước: bàn tiệc (che chân người đứng sau bàn), bánh, sách, nhãn chữ. */
function fg() {
  return `<path d="M866 230 H1154 V262 Q1010 272 866 262Z" fill="#FDF2F8" stroke="${L}" stroke-width="1"/>
  ${table(1010, 222, 300, FLOOR + 4, '#B45309')}
  <path d="M862 230 H1158 V256 ${Array.from({ length: 12 }, (_, i) => `Q${1146 - i * 24.6} 266 ${1133.4 - i * 24.6} 256`).join(' ')} Z" fill="#FBCFE8" stroke="${L}" stroke-width="1"/>
  <g class="e020-cake">${CAKE(950, 222)}</g>
  <g class="e020-book" transform="translate(1066 218)"><rect x="-16" y="-6" width="32" height="8" rx="1" fill="#2563EB" stroke="${L}"/><rect x="-14" y="-5" width="28" height="5" fill="#fff"/></g>
  <g class="e020-lb e020-lb-may">${label(160, 186, 'the fifth of May', '#DC2626', 13)}</g>
  <g class="e020-lb e020-lb-eleven">${label(348, 196, 'eleven', '#B45309', 15)}</g>
  <g class="e020-lb e020-lb-candles">${label(950, 140, '11 candles', '#EA580C', 13)}</g>
  <g class="e020-lb e020-lb-book">${label(1010, 136, 'a new book', '#1D4ED8', 13)}</g>
  <g class="e020-lb e020-lb-kitty">${label(1010, 128, 'a picture of Kitty', '#DB2777', 13)}</g>`;
}

const CSS = `
.e020-page4 { transform-origin: 0 0; transition: transform .6s cubic-bezier(.4,0,.2,1), opacity .6s; }
.st-may5 .e020-page4 { transform: scaleY(0); opacity: 0; }
.e020-door { transform-origin: 22px 200px; transition: transform .6s cubic-bezier(.4,0,.2,1); } .st-door .e020-door { transform: scaleX(.12); }
.e020-bal { opacity: 0; transform: translateY(80px); transition: transform 1.2s cubic-bezier(.3,0,.3,1), opacity .4s; }
.st-bal .e020-bal { opacity: 1; transform: none; }
.e020-bob { animation: e020Bob 2s ease-in-out infinite alternate; }
@keyframes e020Bob { to { transform: translateY(-5px) rotate(3deg); } }
.e020-num { opacity: 0; transform: translateY(110px) scale(.5); transition: transform 1.2s cubic-bezier(.3,1.3,.5,1), opacity .4s; }
.st-eleven .e020-num { opacity: 1; transform: none; }
.e020-banner { transform-origin: 320px 40px; transform: scaleY(0); opacity: 0; transition: transform .7s cubic-bezier(.3,1.4,.6,1), opacity .3s; }
.st-banner .e020-banner { transform: none; opacity: 1; }
.e020-pic { opacity: 0; transition: opacity .3s; }
.st-pic-minh .e020-pic-minh, .st-pic-tom .e020-pic-tom, .st-pic-mum .e020-pic-mum, .st-pic-dad .e020-pic-dad { opacity: 1; }
.e020-cardin { transition: transform .35s cubic-bezier(.3,1.6,.6,1); }
.st-glow9 .e020-card9 .e020-cardin, .st-glow6 .e020-card6 .e020-cardin, .st-glow11 .e020-card11 .e020-cardin, .st-glow2 .e020-card2 .e020-cardin { transform: scale(1.14); }
.e020-tenth { opacity: 0; transform: scale(.2); transition: opacity .3s, transform .4s cubic-bezier(.3,1.6,.6,1); }
.st-tenth .e020-tenth { opacity: 1; transform: none; }
.e020-kcake { transition: opacity .2s; } .st-cakeOut .e020-kcake { opacity: 0; }
.e020-cake { opacity: 0; transition: opacity .3s; } .st-cake .e020-cake { opacity: 1; }
.e020-flame, .e020-off { opacity: 0; }
.e020-flame { transition: opacity .2s; transition-delay: calc(var(--i) * .13s); }
.st-lit .e020-flame { opacity: 1; animation: e020Flick .3s ease-in-out infinite alternate; }
.st-out .e020-flame { opacity: 0; transition-delay: 0s; }
@keyframes e020Flick { to { transform: scaleY(.8) translateY(1px); } }
.e020-book { opacity: 0; transition: opacity .3s; } .st-bookDown .e020-book { opacity: 1; }
.e020-notes { opacity: 0; transition: opacity .3s; } .st-sing .e020-notes { opacity: 1; }
.e020-note { animation: e020Note 1.2s ease-in-out infinite alternate; }
@keyframes e020Note { to { transform: translate(4px, -10px) rotate(8deg); } }
.e020-lb { opacity: 0; transition: opacity .3s; }
.st-lb-may .e020-lb-may, .st-lb-eleven .e020-lb-eleven, .st-lb-candles .e020-lb-candles, .st-lb-book .e020-lb-book, .st-lb-kitty .e020-lb-kitty { opacity: 1; }
@media (prefers-reduced-motion: reduce) { .e020-bob, .e020-note { animation-duration: 4s; } }
`;

/** Minh gắn ảnh của ai đó vào ô tháng m (ảnh bay từ tay người cầm tới ô). */
async function pin(st, who, k, m, from) {
  st.pose(who, 'pointUp');
  st.set(`st-glow${m}`);
  await st.fly(PHOTO(k === 'minh' ? 'en_minh_home' : k === 'tom' ? 'en_tom_home' : k === 'mum' ? 'en_mum_home' : 'en_dad_home'), from, slot(m), { size: 28, dur: 700 });
  st.set(`st-pic-${k}`); st.fx('sparkle', ...slot(m));
}

/** Mẹ và mâm bánh đi cùng nhau (cùng tốc độ). */
const walkMum = (st, x, opt = {}) => Promise.all([st.walk('mum', x, opt), st.walk('tray', x, { ...opt, follow: false })]);

const BEATS = [
  { key: ['the fifth of May'], icon: '📅', label: '5th May', async play(st) {
    st.look(200);
    await st.wait(400);
    st.set('st-may5'); st.sfx('page-turn');
    st.fx('sparkle', 160, 120);
    st.set('st-lb-may');
    await st.wait(1700);
    st.set('st-lb-may', false);
  } },
  { key: ["Lan's birthday"], icon: '🎂', label: "Lan's birthday", async play(st) {
    st.set('st-door'); st.sfx('door-open');
    await st.wait(400);
    st.show('lan', true);
    await st.walk('lan', 200, { speed: 120, follow: false });
    st.set('st-bal');
    st.pose('minh', 'wave'); st.act('minh', 'wave'); st.mood('lan', 'joy');
    await st.wait(1200);
    st.act('minh', null); st.pose('minh', 'stand'); st.set('st-door', false);
  } },
  { key: ['eleven today'], icon: '🎈', label: 'eleven', async play(st) {
    st.look(260);
    st.set('st-eleven'); st.set('st-lb-eleven');
    st.pose('lan', 'pointUp'); st.mood('lan', 'joy');
    await st.wait(1300);
    st.fx('sparkle', 348, 110);
    await st.wait(700);
    st.set('st-lb-eleven', false); st.pose('lan', 'stand');
  } },
  { key: ['Happy birthday, Lan'], icon: '🥳', label: 'Happy birthday!', async play(st) {
    st.set('st-banner'); st.fx('sparkle', 320, 80);
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.mood('minh', 'joy');
    st.pose('tom', 'clap'); st.act('tom', 'clap'); st.mood('tom', 'joy');
    st.pose('lan', 'me'); st.mood('lan', 'joy');
    await st.say('minh', 'Happy birthday, Lan!', 2000);
    st.act('minh', null); st.act('tom', null); st.pose('minh', 'stand'); st.pose('tom', 'stand'); st.pose('lan', 'stand');
  } },
  { key: ['When is your birthday'], icon: '❓', label: 'When?', async play(st) {
    await Promise.all([
      st.walk('minh', 615, { speed: 150, lead: 20 }),
      st.walk('lan', 410, { speed: 120, follow: false }),
      st.walk('tom', 834, { speed: 200, follow: false }),
    ]);
    st.mood('lan', 'happy');
    st.pose('minh', 'open'); st.fx('sparkle', 629, 46);
    await st.say('minh', 'When is your birthday?', 1800);
    st.pose('minh', 'stand');
  } },
  { key: ['in October'], icon: '🍂', label: 'October', async play(st) {
    await pin(st, 'minh', 'minh', 9, [625, 150]);
    st.mood('minh', 'joy');
    await st.wait(900);
    st.pose('minh', 'stand'); st.set('st-glow9', false);
  } },
  { key: ['the tenth of October'], icon: '🔟', label: '10th October', async play(st) {
    st.set('st-tenth'); st.set('st-glow9');
    st.pose('minh', 'cheer'); st.mood('minh', 'joy');
    await st.say('minh', '10th October!', 1800);
    st.pose('minh', 'stand'); st.set('st-glow9', false);
  } },
  { key: ["Tom's birthday"], icon: '❓', label: "Tom's birthday?", async play(st) {
    st.look(700);
    await st.walk('minh', 618, { speed: 40, follow: false });
    st.pose('minh', 'point');
    st.pose('tom', 'think');
    await st.say('minh', 'Tom?', 1500);
    st.pose('minh', 'stand');
  } },
  { key: ['in July'], icon: '☀️', label: 'July', async play(st) {
    st.pose('tom', 'stand');
    await st.walk('tom', 505, { speed: 190, follow: false });
    await pin(st, 'tom', 'tom', 6, [515, 150]);
    st.mood('tom', 'joy');
    await st.say('tom', 'July!', 900);
    st.pose('tom', 'stand'); st.set('st-glow6', false);
  } },
  { key: ["Mum's birthday", 'December'], icon: '❄️', label: 'Mum: December', async play(st) {
    await st.walk('minh', 752, { speed: 150, lead: -40 });
    await pin(st, 'minh', 'mum', 11, [762, 150]);
    await st.wait(900);
    st.pose('minh', 'stand'); st.set('st-glow11', false);
  } },
  { key: ["Dad's birthday", 'March'], icon: '🌸', label: 'Dad: March', async play(st) {
    await st.walk('minh', 575, { speed: 160, lead: 40 });
    await pin(st, 'minh', 'dad', 2, [585, 150]);
    await st.wait(900);
    st.pose('minh', 'stand'); st.set('st-glow2', false);
  } },
  { key: ['a big cake'], icon: '🎂', label: 'a big cake', async play(st) {
    st.set('st-cakeOut'); st.show('tray', true); st.mood('mum', 'joy');
    await Promise.all([
      st.walk('lan', 1010, { speed: 210, follow: false }),
      (async () => { await st.wait(300); await walkMum(st, 1072, { speed: 110, lead: -60 }); })(),
    ]);
    st.pose('mum', 'give');
    st.show('tray', false);
    await st.fly(CAKE(0, 20), [1086, 196], [950, 214], { size: 80, dur: 600 });
    st.set('st-cake'); st.sfx('bowl-down');
    st.pose('mum', 'stand'); st.mood('lan', 'wow');
    await st.wait(500);
    st.mood('lan', 'joy');
  } },
  { key: ['eleven candles'], icon: '🕯️', label: '11 candles', async play(st) {
    st.look(990);
    st.set('st-lit'); st.set('st-lb-candles'); st.sfx('sparkle', { vol: 0.5 });
    await Promise.all([
      st.walk('minh', 900, { speed: 190, follow: false }),
      st.walk('tom', 852, { speed: 210, follow: false }),
    ]);
    await st.wait(700);
    st.set('st-lb-candles', false);
  } },
  { key: ['Happy Birthday'], icon: '🎵', label: 'we sing', async play(st) {
    st.set('st-sing');
    for (const id of ['minh', 'tom', 'mum', 'dad']) { st.talk(id, true); st.mood(id, 'joy'); }
    st.pose('minh', 'clap'); st.act('minh', 'clap'); st.pose('tom', 'clap'); st.act('tom', 'clap');
    st.say('dad', '♪ Happy birthday to you! ♪', 2000);
    await st.wait(2100);
    for (const id of ['minh', 'tom', 'mum', 'dad']) st.talk(id, false);
    st.act('minh', null); st.act('tom', null); st.pose('minh', 'stand'); st.pose('tom', 'stand'); st.set('st-sing', false);
    st.mood('lan', 'wow');
    await st.wait(300);
    st.set('st-out'); st.fx('poof', 950, 168, { quiet: true }); st.sfx('poof', { vol: 0.5 });
    st.mood('lan', 'joy');
    await st.wait(500);
  } },
  { key: ['a new book from Mum and Dad'], icon: '📕', label: 'a new book', async play(st) {
    st.pose('dad', 'give'); st.pose('mum', 'give');
    await st.fly(GIFT('#60A5FA', '#F472B6'), [1100, 190], [1010, 196], { size: 34, dur: 650 });
    st.fx('poof', 1010, 196, { quiet: true });
    st.chest('lan', BOOK); st.pose('lan', 'e020_read'); st.set('st-lb-book');
    st.pose('dad', 'stand'); st.pose('mum', 'stand');
    await st.wait(300);
    st.act('lan', 'read'); st.sfx('page-turn');
    await st.wait(1400);
    st.act('lan', null); st.set('st-lb-book', false);
  } },
  { key: ['a present for her'], icon: '🎁', label: 'a present', async play(st) {
    st.chest('lan', null); st.pose('lan', 'stand'); st.set('st-bookDown');
    st.pose('minh', 'give');
    await st.fly(GIFT(), [920, 190], [1010, 200], { size: 34, dur: 650 });
    st.chest('lan', `<g transform="translate(0 -6)">${GIFT()}</g>`); st.pose('lan', 'carry'); st.pose('minh', 'stand'); st.mood('lan', 'wow');
    await st.wait(900);
    st.mood('lan', 'joy');
  } },
  { key: ['a picture of Kitty'], icon: '🖼️', label: 'picture of Kitty', async play(st) {
    st.fx('poof', 1010, 200);
    await st.wait(200);
    st.chest('lan', `<g transform="translate(0 -10)">${KITTY_PIC}</g>`); st.set('st-lb-kitty');
    st.dog('kitty', 'stand'); st.act('kitty', 'jump'); st.mood('kitty', 'joy');
    st.fx('hearts', 1010, 150);
    await st.wait(1800);
    st.act('kitty', 'wag'); st.dog('kitty', 'sit');
    st.set('st-lb-kitty', false);
  } },
];

export default {
  id: 'en020', worldW: 1350, poses: { e020_read: { R: [30, 196], L: [30, 196], head: 7 } }, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  cast: [
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 52, s: 1.08 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 300 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: 360 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 1118, s: 0.95, face: -1 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 1268, s: 0.95, face: -1 },
    { id: 'tray', kind: 'thing', x: 1268, s: 0.95, face: -1, svg: CAKE_CARRY, box: [-30, -130, 90, 60] },
    { id: 'kitty', kind: 'cat', x: 1190, s: 0.95 },
  ],
  init(st) {
    st.show('lan', false); st.show('tray', false);
    st.dog('kitty', 'sit');
  },
};
