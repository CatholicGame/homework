/**
 * Bài 57 "New Shoes": phòng của Minh (giày cũ chật) → phố → cửa hàng giày: kệ giày (đôi xanh có sao trắng, đôi đen) → ghế thử
 * → quầy tính tiền + giá treo túi đỏ. Giá thật bằng đồng: 400.000đ, 300.000đ, 100.000đ (thẻ giá rơi xuống trên món đồ).
 * "Which one(s)?" = các đôi giày trên kệ lắc lần lượt, đôi được chọn sáng lên.
 * Toạ độ cảnh: rộng 1340, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, room, doorway, windowBox, thought, books, shelf } from '../kit.js';

const FLOOR = 282;

Object.assign(CAST, {
  e057_clerk: { adult: true, hair: 'ponytail', hairC: '#3F2A1E', top: 'shirt', shirt: '#2DD4BF', bottom: 'pants', bottomC: '#334155', shoe: '#1C1917' },
  e057_blue: { ...CAST.en_minh_home, shoe: '#2563EB' },
  e057_black: { ...CAST.en_minh_home, shoe: '#1F2937' },
});

// ── Đồ vật ────────────────────────────────────────────────────────────────
const STAR = (x, y, s = 1, c = '#fff') => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -5 L1.5 -1.6 L5 -1.5 L2.3 0.8 L3.1 4.4 L0 2.4 L-3.1 4.4 L-2.3 0.8 L-5 -1.5 L-1.5 -1.6Z" fill="${c}" stroke="${L}" stroke-width="0.4"/>`;
/** Một chiếc giày nhìn nghiêng (mũi sang phải), gốc = giữa đế. */
const SHOE = (c, sole = '#fff', stars = false) => `<path d="M-12 -1 Q-13 -10 -6 -11 L-1 -11 Q3 -5 11 -4 Q15 -3 14 -1Z" fill="${c}" stroke="${L}" stroke-width="0.8"/>
  <path d="M-4 -10 L2 -6 M-2 -11 L4 -7" stroke="#fff" stroke-width="0.9" opacity="0.8"/>
  <rect x="-13" y="-2" width="28" height="3.4" rx="1.6" fill="${sole}" stroke="${L}" stroke-width="0.6"/>${stars ? STAR(-7, -6, 0.62) + STAR(7, -2.8, 0.45) : ''}`;
/** Một đôi giày (gốc = giữa đế). */
const PAIR = (c, sole, stars) => `<g transform="translate(-7 -1)" opacity="0.92">${SHOE(c, sole, stars)}</g><g transform="translate(6 0)">${SHOE(c, sole, stars)}</g>`;
const P_BLUE = PAIR('#2563EB', '#fff', true);
const P_BLACK = PAIR('#1F2937', '#E5E7EB');
const P_OLD = PAIR('#F59E0B', '#FDE68A');
/** Túi đỏ (gốc = móc treo). */
const BAG = `<path d="M-8 2 Q0 -8 8 2" stroke="${L}" stroke-width="1.6" fill="none"/><path d="M-15 2 H15 L17 28 Q0 31 -17 28Z" fill="#EF4444" stroke="${L}" stroke-width="1"/>
  <path d="M-15 9 H15" stroke="#B91C1C" stroke-width="1"/><circle cx="0" cy="12" r="2.4" fill="#FDE047" stroke="${L}" stroke-width="0.5"/>`;
/** Thẻ giá (gốc = đầu dây treo). */
const TAG = (txt, c = '#FDE047') => `<path d="M0 0 V10" stroke="${L}" stroke-width="1"/><rect x="-36" y="10" width="72" height="20" rx="5" fill="${c}" stroke="${L}" stroke-width="1.1"/>
  <circle cx="-30" cy="20" r="2" fill="#fff" stroke="${L}" stroke-width="0.6"/><text x="3" y="25" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="12.5" fill="#B91C1C">${txt}</text>`;
const MONEY = `<rect x="-14" y="-7" width="28" height="14" rx="2" fill="#86EFAC" stroke="${L}" stroke-width="0.9"/><circle r="4" fill="#fff" stroke="#16A34A" stroke-width="0.8"/><text x="0" y="2.4" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="6" fill="#15803D">đ</text>`;
const SHOEBOX = `<rect x="-18" y="-14" width="36" height="14" rx="1.5" fill="#F97316" stroke="${L}" stroke-width="0.9"/><rect x="-19" y="-17" width="38" height="5" rx="1.5" fill="#FB923C" stroke="${L}" stroke-width="0.9"/>`;

// Đồ cầm (gốc = bàn tay, cánh tay hướng +y)
const PROPS = {
  e057_old: `<g transform="translate(0 4) rotate(90)">${SHOE('#F59E0B', '#FDE68A')}</g>`,
  e057_bag: `<g transform="translate(0 -2)"><g transform="rotate(180)">${BAG}</g></g>`,
};
const POSES = {
  e057_show: { R: [118, 150], L: [40, 110], dy: 20, head: -6 },
  e057_look: { R: [10, 4], L: [10, 4], head: -8 },
  e057_ask: { R: [60, 44], L: [10, 4], head: 9 },
  e057_hang: { R: [24, 8], L: [10, 4] },
};

function bg() {
  const pairs = (y, list) => list.map(([x, c, sole], i) => `<g transform="translate(${x} ${y}) scale(1.3)"><g class="e057-sh" style="animation-delay:${i * 0.12}s">${PAIR(c, sole)}</g></g>`).join('');
  return `
  <!-- Phòng của Minh -->
  ${room(0, 380, FLOOR, '#FEF3C7')}
  ${windowBox(40, 82, 100, 86)}
  ${shelf(220, 120, 120, books(232, 120, 6) + `<g transform="translate(320 120)"><circle cy="-10" r="9" fill="#fff" stroke="${L}"/><path d="M-4 -14 l4 3 l4 -3 l-1 6 h-6Z" fill="#1F2937"/></g>`)}
  <rect x="300" y="228" width="58" height="54" rx="3" fill="#C08B5C" stroke="${L}"/><path d="M300 255 H358" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(318 253)">${P_OLD}</g><g transform="translate(342 280)" opacity="0.9">${PAIR('#94A3B8', '#E5E7EB')}</g>
  <!-- ghế đẩu -->
  <rect x="196" y="250" width="54" height="8" rx="3" fill="#F59E0B" stroke="${L}"/><path d="M202 258 L198 ${FLOOR} M244 258 L248 ${FLOOR}" stroke="#92400E" stroke-width="4"/>
  ${doorway(370, FLOOR)}

  <!-- Phố -->
  ${sky(382, 180, 315, 'e057sky')}
  ${cloud(450, 70, 0.8, 1)}
  <path d="M382 238 Q460 214 562 232 V${FLOOR} H382Z" fill="#86EFAC" stroke="${L}" stroke-width="0.8"/>
  ${tree(470, FLOOR - 8, 0.85)}
  <rect x="382" y="${FLOOR - 10}" width="180" height="18" fill="#E5E7EB" stroke="${L}"/><rect x="382" y="${FLOOR + 8}" width="180" height="30" fill="#64748B"/>
  <rect x="400" y="${FLOOR + 18}" width="30" height="4" rx="2" fill="#F8FAFC"/><rect x="470" y="${FLOOR + 18}" width="30" height="4" rx="2" fill="#F8FAFC"/>

  <!-- Cửa hàng giày -->
  ${room(562, 778, FLOOR, '#FCE7F3', '#E7D3BD')}
  <rect x="562" y="0" width="778" height="34" fill="#DB2777" stroke="${L}"/>
  ${Array.from({ length: 13 }, (_, i) => `<path d="M${574 + i * 60} 34 q30 18 60 0" fill="#F9A8D4" stroke="${L}" stroke-width="0.8"/>`).join('')}
  ${label(760, 82, 'SHOE SHOP', '#DB2777', 18)}
  ${doorway(574, FLOOR)}
  <!-- kệ giày -->
  <rect x="644" y="112" width="236" height="${FLOOR - 112}" rx="4" fill="#FDF2E9" stroke="${L}" stroke-width="1.4"/>
  ${[150, 202, 254].map((y) => `<rect x="644" y="${y}" width="236" height="7" rx="2" fill="#A16207" stroke="${L}"/>`).join('')}
  ${pairs(150, [[676, '#EF4444', '#fff'], [728, '#22C55E', '#fff'], [790, '#F472B6', '#fff'], [846, '#FDE68A', '#fff']])}
  ${pairs(254, [[676, '#A855F7', '#fff'], [736, '#F8FAFC', '#94A3B8'], [794, '#0EA5E9', '#fff'], [848, '#B45309', '#FDE68A']])}
  <g class="e057-glow e057-glowB"><ellipse cx="690" cy="192" rx="34" ry="20" fill="#FDE047" opacity="0.45"/></g>
  <g class="e057-glow e057-glowK"><ellipse cx="830" cy="192" rx="34" ry="20" fill="#FDE047" opacity="0.45"/></g>
  <g transform="translate(690 202) scale(1.3)"><g class="e057-pick e057-pickB">${P_BLUE}</g></g>
  <g transform="translate(830 202) scale(1.3)"><g class="e057-pick e057-pickK">${P_BLACK}</g></g>
  <g transform="translate(690 146)"><g class="e057-tag e057-tag4">${TAG('400.000đ')}</g></g>
  <g transform="translate(830 146)"><g class="e057-tag e057-tag3">${TAG('300.000đ', '#BBF7D0')}</g></g>
  <!-- gương + ghế thử -->
  <rect x="1060" y="100" width="40" height="120" rx="18" fill="#E0F2FE" stroke="${L}" stroke-width="1.4"/><path d="M1070 120 L1086 104 M1070 140 L1094 116" stroke="#fff" stroke-width="3" opacity="0.8"/>
  <rect x="948" y="250" width="104" height="9" rx="3" fill="#8B5CF6" stroke="${L}"/><path d="M956 259 V${FLOOR} M1044 259 V${FLOOR}" stroke="#5B21B6" stroke-width="4"/>
  <g class="e057-pairs"><g transform="translate(944 ${FLOOR + 2})">${P_BLUE}</g><g transform="translate(1058 ${FLOOR + 2})">${P_BLACK}</g></g>
  <!-- hộp giày xếp chồng -->
  ${[0, 1, 2].map((i) => `<g transform="translate(${906 + (i % 2) * 6} ${FLOOR - i * 17})">${SHOEBOX}</g>`).join('')}
  <!-- giá treo túi -->
  <path d="M1312 ${FLOOR} V128 M1232 128 H1318" stroke="#78716C" stroke-width="4" stroke-linecap="round"/>
  <g transform="translate(1292 132)"><path d="M0 0 V6" stroke="${L}"/><g transform="translate(0 6)" opacity="0.95"><g transform="scale(0.85)">${BAG.replace('#EF4444', '#60A5FA').replace('#B91C1C', '#2563EB')}</g></g></g>
  <g class="e057-glow e057-glowR"><ellipse cx="1256" cy="150" rx="28" ry="24" fill="#FDE047" opacity="0.45"/></g>
  <g transform="translate(1256 130)"><g class="e057-bag">${BAG}</g></g>
  <g transform="translate(1256 166)"><g class="e057-tag e057-tag1">${TAG('100.000đ', '#FBCFE8')}</g></g>
  <rect x="1328" y="0" width="12" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>

  <!-- nhãn -->
  <g class="e057-lb e057-lb-small">${label(222, 150, 'too small', '#DC2626', 14)}</g>
  <g class="e057-lb e057-lb-which">${label(700, 102, 'Which ones?', '#7C3AED', 15)}</g>
  <g class="e057-lb e057-lb-blue">${label(690, 236, 'blue', '#2563EB', 13)}</g>
  <g class="e057-lb e057-lb-hmm">${label(630, 104, 'Hmm...', '#475569', 14)}</g>
  <g class="e057-lb e057-lb-black">${label(830, 236, 'black', '#1F2937', 13)}</g>
  <g class="e057-lb e057-lb-cheap">${label(830, 108, 'cheaper', '#15803D', 14)}<path d="M876 98 V114 M870 108 L876 116 L882 108" stroke="#16A34A" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
  <g class="e057-lb e057-lb-tight">${label(944, 228, 'too tight', '#DC2626', 13)}</g>
  <g class="e057-lb e057-lb-fit">${label(1000, 120, 'fitted well', '#16A34A', 14)}</g>
  <g class="e057-lb e057-lb-q">${label(1256, 108, '?', '#EA580C', 16)}</g>`;
}

function fg() {
  const lanThink = `<g transform="translate(-22 4)">${headOnly('en_lan_home', { s: 0.82, mood: 'joy' })}</g>
    <g transform="translate(20 -8) scale(0.62)">${BAG}</g><path transform="translate(26 18) scale(0.7)" d="M0 6 C-10 -2 -8 -10 -3 -10 C-1 -10 0 -8 0 -7 C0 -8 1 -10 3 -10 C8 -10 10 -2 0 6Z" fill="#F43F5E" stroke="${L}" stroke-width="0.7"/>`;
  return `
  <!-- quầy tính tiền (che chân cô bán hàng) -->
  <rect x="1150" y="214" width="96" height="${FLOOR - 214}" fill="#F472B6" stroke="${L}" stroke-width="1.2"/><rect x="1144" y="208" width="108" height="9" rx="3" fill="#FBCFE8" stroke="${L}"/>
  <path d="M1160 236 H1236 M1160 258 H1236" stroke="#DB2777" stroke-width="1.2"/>
  <g transform="translate(1228 208)"><rect x="-13" y="-16" width="26" height="16" rx="2" fill="#1F2937" stroke="${L}" stroke-width="0.7"/><rect x="-10" y="-14" width="20" height="6" fill="#22C55E"/></g>
  <g transform="translate(1180 208)"><g class="e057-box">${SHOEBOX}</g></g>
  ${bush(410, FLOOR + 22, 0.8, '#4ADE80')}
  ${thought(1010, 112, 104, 64, lanThink, [1010, 160], 'e057-think')}`;
}

const CSS = `
.e057-lb { opacity: 0; transition: opacity .35s; }
${['small', 'which', 'blue', 'hmm', 'black', 'cheap', 'tight', 'fit', 'q'].map((k) => `.st-lb-${k} .e057-lb-${k}`).join(', ')} { opacity: 1; }
.st-browse .e057-sh, .st-browse .e057-pick { animation: e057Wig .5s ease-in-out 3 alternate; transform-box: fill-box; transform-origin: 50% 100%; }
.st-browse .e057-pickK { animation-delay: .5s; } .st-browse .e057-pickB { animation-delay: .2s; }
@keyframes e057Wig { from { transform: rotate(-8deg) translateY(0); } to { transform: rotate(8deg) translateY(-4px); } }
.e057-glow { opacity: 0; transition: opacity .35s; }
.st-glowB .e057-glowB, .st-glowK .e057-glowK, .st-glowR .e057-glowR { opacity: 1; }
.e057-pick { transform-box: fill-box; transform-origin: 50% 100%; transition: transform .4s cubic-bezier(.3,1.6,.6,1), opacity .3s; }
.st-glowB .e057-pickB, .st-glowK .e057-pickK { transform: scale(1.25); }
.st-glowB .e057-pickB { animation: e057Bob .5s ease-in-out infinite alternate; }
@keyframes e057Bob { from { translate: 0 0; } to { translate: 0 -3px; } }
.st-offB .e057-pickB, .st-offK .e057-pickK { opacity: 0; }
.e057-tag { transform: scaleY(0); opacity: 0; transform-origin: 0 0; transition: transform .45s cubic-bezier(.3,1.5,.6,1), opacity .2s; }
.st-tag4 .e057-tag4, .st-tag3 .e057-tag3, .st-tag1 .e057-tag1 { transform: none; opacity: 1; animation: e057Swing 1.2s ease-in-out 2 alternate; }
@keyframes e057Swing { from { rotate: -6deg; } to { rotate: 6deg; } }
.e057-pairs { opacity: 0; transition: opacity .3s; } .st-pairs .e057-pairs { opacity: 1; }
.e057-bag { transform-origin: 0 0; transition: opacity .3s; }
.st-glowR .e057-bag { animation: e057Swing .6s ease-in-out 4 alternate; }
.st-bagGone .e057-bag, .st-bagGone .e057-tag1 { opacity: 0; }
.e057-box { opacity: 0; transform: translateY(-14px); transition: opacity .3s, transform .4s cubic-bezier(.3,1.6,.6,1); } .st-box .e057-box { opacity: 1; transform: none; }
.e057-think { opacity: 0; transform: scale(.4); transform-origin: 1010px 170px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-think .e057-think { opacity: 1; transform: scale(1); }
@media (prefers-reduced-motion: reduce) {
  .st-browse .e057-sh, .st-browse .e057-pick { animation-duration: 1s; animation-iteration-count: 1; }
  .st-glowB .e057-pickB { animation: none; }
  .st-tag4 .e057-tag4, .st-tag3 .e057-tag3, .st-tag1 .e057-tag1, .st-glowR .e057-bag { animation: none; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));

const BEATS = [
  { key: ['too small', 'a shoe shop'], icon: '👟', label: 'too small', async play(st) {
    st.look(200);
    st.hold('minh', 'e057_old'); st.pose('minh', 'e057_show'); st.mood('minh', 'sad');
    await st.wait(500);
    st.act('minh', 'no'); st.sfx('buzz-no', { vol: 0.6 }); st.set('st-lb-small'); st.fx('poof', 236, 268, { quiet: true });
    await st.wait(1400);
    st.act('minh', null); st.hold('minh', null); st.pose('minh', 'sit');
    st.pose('mum', 'point'); st.mood('mum', 'joy');
    await st.wait(700);
    st.set('st-lb-small', false); st.pose('mum', 'stand'); st.mood('minh', 'happy'); st.mood('mum', 'happy');
    await Promise.all([
      st.walk('minh', 760, { speed: 180, lead: -40 }),
      st.walk('mum', 622, { speed: 172, follow: false }),
    ]);
    st.sfx('door-open', { vol: 0.5 });
  } },
  { key: ['Which ones do you like'], icon: '❓', label: 'Which ones?', async play(st) {
    st.look(720);
    st.pose('mum', 'open'); st.sfx('pop', { vol: 0.5 });
    await st.say('mum', 'Which ones do you like?', 2000);
    st.pose('mum', 'stand');
  } },
  { key: ['Mum asked'], icon: '👩', label: 'Mum asked', async play(st) {
    st.look(720);
    st.pose('mum', 'e057_ask'); st.act('mum', 'point');
    st.set('st-lb-which'); st.sfx('pop', { vol: 0.6 });
    await st.wait(1600);
    st.act('mum', null);
  } },
  { key: ['looked at the shoes'], icon: '👀', label: 'looked at the shoes', async play(st) {
    st.set('st-lb-which', false); st.pose('mum', 'stand');
    st.look(740);
    st.face('minh', 1);
    st.pose('minh', 'e057_look'); st.mood('minh', 'wow');
    st.set('st-browse');
    for (const ms of [200, 500, 500]) { await st.wait(ms); st.sfx('box-shake', { vol: 0.35, rate: 1.2 }); }
    await st.wait(1200);
    st.set('st-browse', false); st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['the blue ones with white stars'], icon: '💙', label: 'blue ones', async play(st) {
    st.look(740);
    st.face('minh', -1);
    st.pose('minh', 'point'); st.mood('minh', 'joy');
    st.set('st-glowB'); st.set('st-lb-blue'); st.sfx('sparkle', { vol: 0.6 });
    st.fx('sparkle', 690, 190, { quiet: true });
    await st.say('minh', 'The blue ones!', 1800);
    st.pose('minh', 'stand');
  } },
  { key: ['How much are they'], icon: '💬', label: 'How much?', async play(st) {
    st.look(800);
    st.face('mum', 1);
    st.pose('mum', 'point'); st.sfx('pop', { vol: 0.5 });
    await st.say('mum', 'How much are they?', 1900);
    st.pose('mum', 'stand');
  } },
  { key: ['the shop assistant'], icon: '🧑‍💼', label: 'shop assistant', async play(st) {
    st.look(790);
    st.pose('clerk', 'wave'); st.act('clerk', 'wave'); st.mood('clerk', 'joy'); st.sfx('ding', { vol: 0.5 });
    await st.wait(700);
    st.act('clerk', null); st.pose('clerk', 'stand');
    await st.walk('clerk', 902, { speed: 110, follow: false });
    st.face('clerk', -1); st.mood('clerk', 'happy');
    await st.wait(300);
  } },
  { key: ['four hundred thousand dong'], icon: '🏷️', label: '400,000 dong', async play(st) {
    st.look(790);
    st.face('clerk', -1);
    st.pose('clerk', 'point');
    st.set('st-tag4'); st.sfx('pop', { vol: 0.7 });
    await st.wait(2200);
    st.pose('clerk', 'stand');
  } },
  { key: ['Hmm'], icon: '🤔', label: 'Hmm...', async play(st) {
    st.look(780);
    st.set('st-glowB', false); st.set('st-lb-blue', false);
    st.pose('mum', 'think'); st.mood('mum', 'shut');
    st.set('st-lb-hmm'); st.sfx('pop', { vol: 0.5 });
    await st.wait(1500);
    st.mood('mum', 'happy');
  } },
  { key: ['the black ones'], icon: '🖤', label: 'black ones', async play(st) {
    st.look(790);
    st.set('st-lb-hmm', false);
    st.pose('mum', 'point');
    st.set('st-glowK'); st.set('st-lb-black'); st.sfx('ding', { vol: 0.5 });
    await st.say('mum', 'What about the black ones?', 2000);
    st.pose('mum', 'stand');
  } },
  { key: ['cheaper'], icon: '⬇️', label: 'cheaper', async play(st) {
    st.look(800);
    st.face('clerk', -1);
    st.pose('clerk', 'open'); st.mood('clerk', 'joy');
    st.set('st-lb-cheap'); st.fx('sparkle', 870, 110, { quiet: true }); st.sfx('pop', { vol: 0.6 });
    await st.wait(1800);
    st.pose('clerk', 'stand'); st.mood('clerk', 'happy');
  } },
  { key: ['three hundred thousand'], icon: '🏷️', label: '300,000 dong', async play(st) {
    st.look(800);
    st.set('st-lb-cheap', false);
    st.pose('clerk', 'point');
    st.set('st-tag3'); st.sfx('pop', { vol: 0.7 });
    await st.wait(2000);
    st.pose('clerk', 'stand');
  } },
  { key: ['tried on both pairs'], icon: '🪑', label: 'tried on', async play(st) {
    off(st, 'st-glowK', 'st-lb-black');
    st.look(900);
    st.face('clerk', 1);
    await st.walk('minh', 1000, { speed: 150, lead: -40 });
    st.pose('minh', 'sit');
    st.set('st-offB'); st.set('st-offK'); st.sfx('whoosh', { vol: 0.5 });
    await Promise.all([
      st.fly(P_BLUE, [690, 196], [944, 278], { size: 34, dur: 650 }),
      st.fly(P_BLACK, [830, 196], [1058, 278], { size: 34, dur: 650 }),
    ]);
    st.set('st-pairs');
    await st.wait(300);
    await st.dress('minh', 'e057_blue');
    await st.wait(700);
    await st.dress('minh', 'e057_black');
    await st.wait(500);
  } },
  { key: ['too tight', 'fitted well'], icon: '✅', label: 'fitted well', async play(st) {
    st.look(1000);
    await st.dress('minh', 'e057_blue');
    st.pose('minh', 'stand'); st.mood('minh', 'cry'); st.act('minh', 'shiver');
    st.set('st-lb-tight'); st.sfx('buzz-no', { vol: 0.6 });
    await st.wait(1500);
    st.act('minh', null);
    await st.dress('minh', 'e057_black');
    st.set('st-lb-tight', false); st.set('st-lb-fit');
    st.pose('minh', 'cheer'); st.act('minh', 'hop'); st.mood('minh', 'joy');
    st.fx('sparkle', 1000, 240, { quiet: true }); st.sfx('ding', { vol: 0.6 });
    await st.wait(1500);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['take the black ones'], icon: '🛍️', label: 'take the black ones', async play(st) {
    st.set('st-lb-fit', false);
    st.set('st-pairs', false);
    await Promise.all([
      st.walk('minh', 1090, { speed: 140, lead: 40 }),
      st.walk('clerk', 1198, { speed: 150, follow: false }),
    ]);
    st.face('clerk', -1);
    st.set('st-box'); st.sfx('bowl-down', { vol: 0.4 });
    st.pose('minh', 'point'); st.mood('minh', 'joy');
    await st.say('minh', "I'll take the black ones!", 2000);
    st.pose('minh', 'stand');
  } },
  { key: ['a red bag'], icon: '👜', label: 'a red bag', async play(st) {
    await st.walk('mum', 1016, { speed: 190, lead: 120 });
    st.face('mum', 1);
    st.mood('mum', 'wow');
    st.set('st-glowR'); st.sfx('pop', { vol: 0.6 });
    await st.wait(1500);
    st.mood('mum', 'joy');
  } },
  { key: ['How much is that one'], icon: '💬', label: 'that one?', async play(st) {
    st.look(1150);
    st.pose('mum', 'point'); st.set('st-lb-q'); st.sfx('pop', { vol: 0.6 });
    await st.say('mum', 'How much is that one?', 2000);
    st.pose('mum', 'stand');
  } },
  { key: ['one hundred thousand'], icon: '🏷️', label: '100,000 dong', async play(st) {
    st.look(1150);
    st.set('st-lb-q', false);
    st.face('clerk', 1); st.pose('clerk', 'point');
    st.set('st-tag1'); st.sfx('pop', { vol: 0.7 });
    await st.wait(2000);
    st.face('clerk', -1); st.pose('clerk', 'stand');
  } },
  { key: ['Lan will love it', 'bought that one too'], icon: '❤️', label: 'for Lan', async play(st) {
    st.look(1130);
    st.set('st-glowR', false);
    st.set('st-think'); st.sfx('pop', { vol: 0.6 }); st.pose('mum', 'think'); st.mood('mum', 'joy');
    await st.say('mum', 'Lan will love it!', 1800);
    st.set('st-think', false);
    st.pose('mum', 'give'); st.sfx('whoosh', { vol: 0.4 });
    await st.fly(MONEY, [1040, 196], [1180, 186], { size: 28, dur: 600 });
    st.sfx('cash', { vol: 0.6 });
    st.set('st-bagGone'); st.sfx('whoosh', { vol: 0.4 });
    await st.fly(BAG, [1256, 146], [1040, 200], { size: 34, dur: 650 });
    st.hold('mum', 'e057_bag'); st.pose('mum', 'e057_hang');
    st.mood('clerk', 'joy'); st.pose('clerk', 'wave'); st.act('clerk', 'wave');
    st.mood('minh', 'joy'); st.act('minh', 'hop');
    st.fx('hearts', 1040, 150);
    await st.wait(1300);
    st.act('clerk', null); st.act('minh', null); st.pose('clerk', 'stand');
  } },
];

export default {
  id: 'en057', worldW: 1340, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 3, 4, 7, 13, 15],
  cast: [
    { id: 'clerk', kind: 'adult', who: 'e057_clerk', x: 1010, s: 0.95, face: -1 },
    { id: 'mum', kind: 'adult', who: 'en_mum', x: 110, s: 0.95 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 223 },
  ],
  init(st) {
    st.pose('minh', 'sit');
    st.chest('clerk', `<rect x="4" y="-12" width="12" height="7" rx="1.5" fill="#fff" stroke="${L}" stroke-width="0.6"/>`);
  },
};
