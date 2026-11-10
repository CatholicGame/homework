/**
 * Bài 35 "At the Pet Shop": nhà Tom (lịch thứ Bảy) → phố → cửa hàng thú cưng: quầy của cô bán hàng → chuồng ba chú chó con
 * → lồng thỏ trắng → kệ thức ăn. Tom chọn chú chó nâu tên Max, Minh bế thỏ, bố mua thức ăn cho Kitty, cô tặng bóng đỏ.
 * Toạ độ cảnh: rộng 1820, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, room, doorway, shelf } from '../kit.js';

const FLOOR = 282;

Object.assign(CAST, {
  e035_woman: { adult: true, hair: 'ponytail', hairC: '#7C2D12', top: 'blouse', shirt: '#2DD4BF', bottom: 'pants', bottomC: '#334155', shoe: '#F5F5F4' },
});

// ── Con vật, đồ vật ───────────────────────────────────────────────────────
/** Chó con nhìn nghiêng (quay phải), gốc = chân chạm đất, cao ≈ 26. */
const puppy = (c, ear, spot = '') => `<g class="e035-pbody">
  <g class="e035-ptail" style="transform-origin:-12px -14px"><path d="M-12 -14 Q-20 -18 -20 -26" stroke="${L}" stroke-width="4.6" fill="none" stroke-linecap="round"/><path d="M-12 -14 Q-20 -18 -20 -26" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/></g>
  ${[-8, 7].map((x) => `<path d="M${x} -10 V-1" stroke="${L}" stroke-width="5.4" stroke-linecap="round"/><path d="M${x} -10 V-1" stroke="${c}" stroke-width="3.8" stroke-linecap="round"/>`).join('')}
  <ellipse cx="0" cy="-13" rx="14" ry="7.4" fill="${c}" stroke="${L}" stroke-width="0.9"/>${spot}
  <g transform="translate(13 -21)"><circle r="8.6" fill="${c}" stroke="${L}" stroke-width="0.9"/><path d="M-4 -5 Q-10 -2 -7 8 Q-3 6 -1 -2Z" fill="${ear}" stroke="${L}" stroke-width="0.7"/>
    <ellipse cx="7" cy="3" rx="5" ry="4" fill="${c === '#FFFFFF' ? '#F8FAFC' : '#F5E6D3'}" stroke="${L}" stroke-width="0.6"/><circle cx="11.4" cy="1.6" r="1.8" fill="#2B1D16"/>
    <circle cx="3" cy="-2" r="1.5" fill="#2B1D16"/><path d="M6 6 q2 1.4 4 0" stroke="${L}" stroke-width="0.7" fill="none"/></g></g>`;
const P_BROWN = puppy('#C08457', '#7A4B2A');
const P_BLACK = puppy('#374151', '#111827');
const P_WHITE = puppy('#FFFFFF', '#94A3B8', `<ellipse cx="-3" cy="-15" rx="5" ry="3.4" fill="#94A3B8"/>`);
/** Thỏ trắng (nhìn nghiêng, quay phải), gốc = chân, cao ≈ 30. */
const RABBIT = `<g class="e035-rab"><ellipse cx="-11" cy="-10" rx="4" ry="3.6" fill="#fff" stroke="${L}" stroke-width="0.7"/>
  <ellipse cx="-1" cy="-9" rx="11" ry="8.4" fill="#fff" stroke="${L}" stroke-width="0.9"/><ellipse cx="4" cy="-1" rx="5" ry="2" fill="#fff" stroke="${L}" stroke-width="0.7"/>
  <g transform="translate(9 -18)"><path d="M-3 -4 Q-6 -20 -1 -22 Q2 -18 1 -5Z" fill="#fff" stroke="${L}" stroke-width="0.8"/><path d="M-2 -7 Q-4 -17 -1.4 -19" stroke="#F9A8D4" stroke-width="1.6" fill="none"/>
    <path d="M1 -4 Q4 -19 9 -18 Q8 -12 4 -4Z" fill="#fff" stroke="${L}" stroke-width="0.8"/>
    <circle r="6.6" fill="#fff" stroke="${L}" stroke-width="0.9"/><circle cx="2.4" cy="-1" r="1.4" fill="#BE185D"/><path d="M6.4 1.4 l-1.6 -0.8 v1.6Z" fill="#F472B6"/><circle cx="0" cy="3" r="1.6" fill="#FBCFE8" opacity="0.8"/></g></g>`;
/** Đồ bế trước ngực (gốc giữa ngực). */
const HELD_PUPPY = (ball = false) => `<g transform="translate(-6 6)">${P_BROWN}${ball ? `<g transform="translate(26 -18)"><circle r="5" fill="#EF4444" stroke="${L}" stroke-width="0.8"/><path d="M-5 0 Q0 -3 5 0" stroke="#fff" stroke-width="1" fill="none"/></g>` : ''}</g>`;
const HELD_RABBIT = `<g transform="translate(-2 8)">${RABBIT}</g>`;
const FOODBAG = `<path d="M-13 -16 H13 L15 14 H-15Z" fill="#A855F7" stroke="${L}" stroke-width="1"/><path d="M-13 -16 L-10 -20 H10 L13 -16" fill="#C084FC" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(0 0)"><path d="M-7 -6 L-6 -12 L-2 -8Z M2 -8 L6 -12 L7 -6Z" fill="#fff" stroke="${L}" stroke-width="0.6"/><circle r="7" fill="#fff" stroke="${L}" stroke-width="0.8"/>
  <circle cx="-2.6" cy="-1" r="1" fill="#16A34A"/><circle cx="2.6" cy="-1" r="1" fill="#16A34A"/><path d="M0 1.4 l-1 -0.8 h2Z" fill="#F472B6"/></g>
  <path d="M-11 9 h22" stroke="#FDE68A" stroke-width="2"/>`;
const HELD_FOOD = `<g transform="translate(0 2)">${FOODBAG}</g>`;
const RED_BALL = `<circle r="6" fill="#EF4444" stroke="${L}" stroke-width="0.9"/><path d="M-6 0 Q0 -4 6 0" stroke="#fff" stroke-width="1.3" fill="none"/>`;
const BALL_PROP = `<g transform="translate(0 -7)">${RED_BALL}</g>`;
const thought = (x, y, w, h, inner, cls, tail = -1) => `<g class="e035-bub ${cls}" style="transform-origin:${x}px ${y + h / 2}px">
  <circle cx="${x + tail * 6}" cy="${y + h / 2 + 14}" r="4" fill="#fff" stroke="${L}"/><circle cx="${x + tail * 12}" cy="${y + h / 2 + 26}" r="2.6" fill="#fff" stroke="${L}"/>
  <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2.4}" fill="#fff" stroke="${L}" stroke-width="1.2"/>${inner}</g>`;

function bg() {
  const cans = (x, y, c, n) => Array.from({ length: n }, (_, i) => `<g transform="translate(${x + i * 18} ${y})"><rect x="-7" y="-16" width="14" height="16" rx="2" fill="${c}" stroke="${L}" stroke-width="0.7"/><rect x="-7" y="-11" width="14" height="6" fill="#fff" opacity="0.8"/></g>`).join('');
  const bags = (x, y) => [0, 1, 2].map((i) => `<g transform="translate(${x + i * 34} ${y}) scale(0.95)">${FOODBAG}</g>`).join('');
  return `
  ${sky(0, 780, 315, 'e035sky')}
  ${cloud(120, 70, 1, 0)}${cloud(520, 56, 0.9, 3)}
  <path d="M0 240 Q200 210 420 236 T780 228 V282 H0Z" fill="#86EFAC" stroke="${L}"/>
  ${tree(470, 248, 0.9)}${tree(690, 244, 0.8, '#F59E0B')}
  <rect x="0" y="${FLOOR - 10}" width="780" height="18" fill="#E5E7EB" stroke="${L}"/><rect x="0" y="${FLOOR + 8}" width="780" height="30" fill="#64748B"/>
  ${Array.from({ length: 12 }, (_, i) => `<rect x="${20 + i * 62}" y="${FLOOR + 18}" width="30" height="4" rx="2" fill="#F8FAFC"/>`).join('')}
  <!-- Nhà Tom -->
  <path d="M20 122 L170 60 L320 122Z" fill="#3B82F6" stroke="${L}" stroke-width="1.4"/>
  <rect x="36" y="122" width="268" height="${FLOOR - 132}" fill="#FEF9C3" stroke="${L}" stroke-width="1.4"/>
  <rect x="56" y="150" width="60" height="52" rx="3" fill="#BAE6FD" stroke="${L}" stroke-width="1.2"/><path d="M86 150 V202 M56 176 H116" stroke="${L}" stroke-width="0.9"/>
  <rect x="236" y="182" width="50" height="${FLOOR - 192}" rx="4" fill="#16A34A" stroke="${L}" stroke-width="1.2"/><circle cx="276" cy="230" r="3" fill="#FDE68A"/>
  <g transform="translate(176 146)"><rect x="-38" y="0" width="76" height="56" rx="5" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-38" y="0" width="76" height="13" rx="5" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>
    <circle cx="-20" cy="0" r="2.6" fill="#1F2937"/><circle cx="20" cy="0" r="2.6" fill="#1F2937"/>
    <text x="0" y="40" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="12.5" fill="#DC2626">SATURDAY</text>
    <g transform="translate(0 13)"><g class="e035-fri"><rect x="-36" y="0" width="72" height="41" fill="#F8FAFC" stroke="${L}" stroke-width="0.8"/>
      <text x="0" y="27" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="12.5" fill="#475569">FRIDAY</text></g></g></g>
  <!-- Cửa hàng thú cưng -->
  ${room(780, 1040, FLOOR, '#E0F2FE', '#CBD5E1')}
  ${Array.from({ length: 18 }, (_, i) => `<path d="M${780 + i * 58} ${FLOOR} V315" stroke="#94A3B8" stroke-width="1"/>`).join('')}
  ${Array.from({ length: 16 }, (_, i) => `<g transform="translate(${830 + (i * 131) % 960} ${60 + (i * 47) % 90})" opacity="0.35"><ellipse rx="4" ry="3.4" fill="#93C5FD"/>${[-5, -2, 2, 5].map((dx) => `<circle cx="${dx}" cy="-5" r="1.6" fill="#93C5FD"/>`).join('')}</g>`).join('')}
  <rect x="780" y="0" width="1040" height="34" fill="#F97316" stroke="${L}"/>
  ${label(1130, 78, 'PET SHOP', '#EA580C', 18)}${label(1640, 78, 'PET SHOP', '#EA580C', 18)}
  ${doorway(792, FLOOR)}
  <rect x="1808" y="0" width="12" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  <!-- Chuồng chó con (rào thấp trên sàn) -->
  <rect x="1104" y="${FLOOR - 4}" width="192" height="8" rx="3" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/>
  <path d="M1110 ${FLOOR - 40} H1290" stroke="#F59E0B" stroke-width="3"/>${Array.from({ length: 10 }, (_, i) => `<path d="M${1110 + i * 20} ${FLOOR - 40} V${FLOOR - 4}" stroke="#FBBF24" stroke-width="2" opacity="0.6"/>`).join('')}
  <g transform="translate(1140 ${FLOOR - 4}) scale(1.15)"><g class="e035-pup e035-pup1">${P_BLACK}</g></g>
  <g transform="translate(1196 ${FLOOR - 4})"><g class="e035-pup e035-pupB">${P_BROWN}</g></g>
  <g transform="translate(1252 ${FLOOR - 4}) scale(1.15)"><g class="e035-pup e035-pup3">${P_WHITE}</g></g>
  <path d="M1104 ${FLOOR - 16} H1296" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
  ${Array.from({ length: 9 }, (_, i) => `<rect x="${1104 + i * 23.5}" y="${FLOOR - 19}" width="5" height="18" rx="2" fill="#FDE68A" stroke="${L}" stroke-width="0.7"/>`).join('')}
  <g class="e035-lb e035-lb-n">${label(1140, 220, '1', '#1D4ED8', 14)}${label(1196, 220, '2', '#1D4ED8', 14)}${label(1252, 220, '3', '#1D4ED8', 14)}</g>
  <g class="e035-lb e035-lb-brown">${label(1196, 214, 'brown', '#92400E', 13)}</g>
  <!-- Rổ bóng -->
  <g transform="translate(1334 ${FLOOR})"><circle cx="-8" cy="-22" r="6" fill="#3B82F6" stroke="${L}" stroke-width="0.8"/><circle cx="6" cy="-23" r="6" fill="#FACC15" stroke="${L}" stroke-width="0.8"/>
    <g class="e035-redball"><g transform="translate(-1 -27)">${RED_BALL}</g></g>
    <path d="M-17 -20 H17 L13 0 H-13Z" fill="#D97706" stroke="${L}" stroke-width="1"/><path d="M-15 -13 H15 M-14 -6 H14" stroke="#92400E" stroke-width="0.8"/></g>
  <!-- Lồng thỏ -->
  <rect x="1404" y="246" width="6" height="${FLOOR - 246}" fill="#92400E" stroke="${L}" stroke-width="0.7"/><rect x="1480" y="246" width="6" height="${FLOOR - 246}" fill="#92400E" stroke="${L}" stroke-width="0.7"/>
  <rect x="1398" y="196" width="94" height="52" rx="3" fill="#FEF3C7" stroke="${L}" stroke-width="1.2"/>
  <ellipse cx="1430" cy="244" rx="20" ry="3" fill="#FDE68A"/><path d="M1462 244 l6 -10 l4 10Z" fill="#FB923C" stroke="${L}" stroke-width="0.6"/>
  <g transform="translate(1438 245)"><g class="e035-rabbit">${RABBIT}</g></g>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${1404 + i * 10.5} 198 V246" stroke="#94A3B8" stroke-width="1.4"/>`).join('')}
  <rect x="1394" y="190" width="102" height="8" rx="3" fill="#B45309" stroke="${L}"/>
  <g class="e035-lb e035-lb-white">${label(1445, 176, 'white rabbit', '#BE185D', 12)}</g>
  <!-- Kệ thức ăn -->
  <rect x="1560" y="110" width="200" height="${FLOOR - 110}" fill="#FED7AA" stroke="${L}" stroke-width="1.2"/>
  ${shelf(1560, 162, 200, cans(1576, 162, '#EF4444', 4) + cans(1660, 162, '#3B82F6', 5))}
  ${shelf(1560, 214, 200, bags(1580, 199) + `<g class="e035-catfood">${[0, 1].map((i) => `<g transform="translate(${1696 + i * 34} 199) scale(0.95)">${FOODBAG}</g>`).join('')}</g>`)}
  ${shelf(1560, 264, 200, cans(1576, 264, '#22C55E', 4) + cans(1660, 264, '#F59E0B', 5))}
  <g class="e035-lb e035-lb-food">${label(1660, 96, 'food for Kitty', '#7C3AED', 13)}</g>
  <!-- Bong bóng nghĩ -->
  ${thought(240, 96, 150, 54, `<g transform="translate(196 116) scale(0.9)">${P_BROWN}</g><g transform="translate(240 112)"><path d="M-7 -8 L-6 -15 L-2 -10Z M2 -10 L6 -15 L7 -8Z" fill="#fff" stroke="${L}" stroke-width="0.6"/><circle cy="-2" r="8" fill="#fff" stroke="${L}" stroke-width="0.8"/><circle cx="-2.6" cy="-3" r="1" fill="#16A34A"/><circle cx="2.6" cy="-3" r="1" fill="#16A34A"/></g>
    <g transform="translate(284 118) scale(0.75)">${RABBIT}</g><text x="312" y="92" font-family="Nunito, sans-serif" font-weight="900" font-size="20" fill="#F97316">?</text>`, 'e035-bub1', 1)}`;
}

function fg() {
  const park = `<clipPath id="e035park"><rect x="852" y="76" width="156" height="72" rx="26"/></clipPath><g clip-path="url(#e035park)"><rect x="852" y="76" width="156" height="72" fill="#BAE6FD"/>
    <path d="M852 128 Q930 116 1008 128 V148 H852Z" fill="#86EFAC"/>${tree(880, 132, 0.45, '')}
    <g transform="translate(940 136) scale(0.42)">${CAST_KID}</g>
    <g transform="translate(978 140)"><g class="e035-run">${P_BROWN}</g></g><g transform="translate(962 128)"><g class="e035-bounce">${RED_BALL}</g></g></g>`;
  return `
  <!-- Quầy -->
  <rect x="954" y="226" width="112" height="${FLOOR - 226}" fill="#F97316" stroke="${L}" stroke-width="1.2"/><rect x="948" y="220" width="124" height="9" rx="3" fill="#FDBA74" stroke="${L}"/>
  <path d="M964 240 H1056 M964 258 H1056" stroke="#EA580C" stroke-width="1.2"/>
  <g transform="translate(1048 220)"><rect x="-12" y="-14" width="24" height="14" rx="2" fill="#1F2937" stroke="${L}" stroke-width="0.7"/><rect x="-9" y="-12" width="18" height="6" fill="#22C55E"/></g>
  ${bush(30, FLOOR + 20, 0.9)}${bush(740, FLOOR + 22, 1, '#4ADE80')}
  ${thought(930, 112, 164, 80, park, 'e035-bub2', -1)}
  <g class="e035-lb e035-lb-max">${label(1078, 150, 'Max', '#B45309', 16)}</g>
  <g class="e035-lb e035-lb-q">${label(1340, 150, '?', '#EA580C', 18)}</g>
  <g class="e035-lb e035-lb-q2">${label(1530, 140, '?', '#EA580C', 18)}</g>`;
}

// Cậu bé đá bóng nhỏ trong bong bóng nghĩ (vẽ phẳng, đơn giản)
const CAST_KID = `<path d="M-6 -36 V-8 M6 -36 V-8" stroke="${L}" stroke-width="9" stroke-linecap="round"/><path d="M-6 -36 V-8 M6 -36 V-8" stroke="#334155" stroke-width="7" stroke-linecap="round"/>
  <path d="M-16 -86 H16 L14 -40 H-14Z" fill="#22C55E" stroke="${L}" stroke-width="1.6"/><circle cy="-104" r="20" fill="#FDDCB5" stroke="${L}" stroke-width="1.6"/>
  <path d="M-20 -108 Q-18 -128 0 -126 Q18 -128 20 -108 Q10 -116 0 -114 Q-10 -116 -20 -108Z" fill="#E0A33A" stroke="${L}"/><circle cx="-6" cy="-102" r="2.4" fill="#2B1D16"/><circle cx="6" cy="-102" r="2.4" fill="#2B1D16"/>
  <path d="M-6 -94 Q0 -88 6 -94" stroke="#9A3B2E" stroke-width="2" fill="none"/><path d="M-16 -80 L-28 -56 M16 -80 L30 -60" stroke="#FDDCB5" stroke-width="7" stroke-linecap="round"/>`;

const CSS = `
.e035-lb { opacity: 0; transition: opacity .35s; }
${['n', 'brown', 'white', 'food', 'max', 'q', 'q2'].map((k) => `.st-lb-${k} .e035-lb-${k}`).join(', ')} { opacity: 1; }
.e035-bub { opacity: 0; transform: scale(.4); transition: opacity .3s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.st-bub1 .e035-bub1, .st-bub2 .e035-bub2 { opacity: 1; transform: scale(1); }
.e035-fri { transform-origin: 0 0; transition: transform .6s cubic-bezier(.4,0,.2,1), opacity .6s; }
.st-sat .e035-fri { transform: scaleY(0); opacity: 0; }
.e035-pup { transition: opacity .3s; }
.st-pupsUp .e035-pup { animation: e035Hop .3s ease-in-out infinite alternate; }
.st-pupsUp .e035-pup1 { animation-delay: -.1s; } .st-pupsUp .e035-pup3 { animation-delay: -.2s; }
.st-pupB .e035-pupB { animation: e035Hop .26s ease-in-out infinite alternate; }
.st-pupB .e035-pupB .e035-ptail, .st-pupsUp .e035-ptail { animation: e035Wag .14s ease-in-out infinite alternate; }
@keyframes e035Hop { to { transform: translateY(-9px); } }
@keyframes e035Wag { from { transform: rotate(-24deg); } to { transform: rotate(20deg); } }
.st-pupGone .e035-pupB { opacity: 0; animation: none; }
.st-rabHop .e035-rabbit { animation: e035Hop .34s ease-in-out infinite alternate; }
.e035-rabbit { transition: opacity .25s; } .st-rabGone .e035-rabbit { opacity: 0; animation: none; }
.e035-catfood { transition: opacity .25s; } .st-foodGone .e035-catfood { opacity: 0; }
.e035-redball { transition: opacity .25s; } .st-ballGone .e035-redball { opacity: 0; }
.e035-run { animation: e035Run 1.2s ease-in-out infinite alternate; }
@keyframes e035Run { from { transform: translateX(-10px); } to { transform: translateX(12px); } }
.e035-bounce { animation: e035Ball .6s ease-in-out infinite alternate; }
@keyframes e035Ball { from { transform: translate(-4px, 0); } to { transform: translate(14px, -14px); } }
@media (prefers-reduced-motion: reduce) { .e035-run, .e035-bounce { animation-duration: 2.4s; } }
`;

const POSES = {
  e035_ask: { R: [55, 40], L: [10, 4], head: 9 },
  e035_offer: { R: [74, 84], L: [10, 4], head: 6 },
};

const BEATS = [
  { key: ['wants to buy a pet'], icon: '🐾', label: 'buy a pet', async play(st) {
    st.look(230);
    st.pose('tom', 'think');
    await st.wait(400);
    st.set('st-bub1'); st.sfx('sparkle', { vol: 0.6 });
    await st.wait(2000);
  } },
  { key: ['On Saturday', 'to the pet shop'], icon: '🏪', label: 'pet shop', async play(st) {
    st.set('st-bub1', false); st.pose('tom', 'stand');
    st.set('st-sat'); st.sfx('page-turn');
    st.fx('sparkle', 176, 170, { quiet: true });
    await st.wait(700);
    await Promise.all([
      st.walk('tom', 930, { speed: 150, lead: 40 }),
      st.walk('minh', 880, { speed: 200, follow: false }),
      st.walk('dad', 830, { speed: 210, follow: false }),
    ]);
  } },
  { key: ['A kind woman', 'Hello'], icon: '👩', label: 'kind woman', async play(st) {
    st.look(960);
    st.pose('woman', 'wave'); st.act('woman', 'wave'); st.mood('woman', 'joy');
    st.fx('hearts', 1010, 120, { n: 1 });
    await st.say('woman', 'Hello!', 1500);
    st.act('woman', null); st.pose('woman', 'stand'); st.mood('woman', 'happy');
  } },
  { key: ['What would you like'], icon: '❓', label: 'What would you like?', async play(st) {
    st.look(960);
    st.pose('woman', 'open');
    await st.say('woman', 'What would you like?', 2000);
    st.pose('woman', 'stand');
  } },
  { key: ['I would like a dog, please'], icon: '🐶', label: 'a dog, please', async play(st) {
    st.look(960);
    st.pose('tom', 'me'); st.mood('tom', 'joy');
    await st.say('tom', 'I would like a dog, please.', 2400);
    st.pose('tom', 'stand'); st.mood('tom', 'happy');
  } },
  { key: ['play with it in the park'], icon: '🌳', label: 'play in the park', async play(st) {
    st.look(960);
    st.set('st-bub2'); st.sfx('sparkle', { vol: 0.6 });
    st.pose('tom', 'think'); st.mood('tom', 'joy');
    await st.wait(2600);
    st.set('st-bub2', false); st.pose('tom', 'stand'); st.mood('tom', 'happy');
  } },
  { key: ['shows them three puppies'], icon: '🐕', label: 'three puppies', async play(st) {
    await st.walk('woman', 1330, { speed: 140, lead: -80 });
    await st.walk('woman', 1328, { speed: 60, follow: false });
    st.pose('woman', 'open');
    st.set('st-pupsUp'); st.set('st-lb-n'); st.sfx('dog-bark', { vol: 0.5, rate: 1.4 });
    await st.wait(2000);
    st.set('st-pupsUp', false); st.set('st-lb-n', false); st.pose('woman', 'stand');
  } },
  { key: ['the small brown puppy'], icon: '🤎', label: 'brown puppy', async play(st) {
    await st.walk('tom', 1086, { speed: 130, lead: 100 });
    st.pose('tom', 'point'); st.mood('tom', 'joy');
    st.set('st-pupB'); st.set('st-lb-brown'); st.sfx('dog-bark', { vol: 0.5, rate: 1.5 });
    st.fx('hearts', 1196, 230);
    await st.wait(2000);
    st.set('st-pupB', false); st.set('st-lb-brown', false); st.pose('tom', 'stand');
  } },
  { key: ['hold a white rabbit'], icon: '🐰', label: 'white rabbit', async play(st) {
    await st.walk('minh', 1374, { speed: 170, lead: 60 });
    st.pose('minh', 'reach'); st.mood('minh', 'joy');
    st.set('st-rabHop'); st.set('st-lb-white');
    st.fx('hearts', 1440, 200);
    await st.wait(1600);
    st.set('st-rabHop', false); st.set('st-lb-white', false); st.pose('minh', 'stand');
  } },
  { key: ['Would you like to hold it'], icon: '🤲', label: 'hold it?', async play(st) {
    st.look(1430);
    await st.walk('woman', 1522, { speed: 150, follow: false });
    await st.walk('woman', 1520, { speed: 60, follow: false });
    st.pose('woman', 'point');
    await st.say('woman', 'Would you like to hold it?', 2200);
    st.pose('woman', 'stand');
  } },
  { key: ['asks the woman'], icon: '❔', label: 'asks', async play(st) {
    st.look(1440);
    st.set('st-rabGone');
    await st.fly(RABBIT, [1440, 232], [1514, 196], { size: 34, dur: 600 });
    st.chest('woman', HELD_RABBIT); st.pose('woman', 'carry');
    await st.wait(300);
    st.pose('woman', 'e035_offer'); st.set('st-lb-q2');
    await st.wait(1300);
    st.set('st-lb-q2', false);
  } },
  { key: ['Yes, please'], icon: '😊', label: 'Yes, please!', async play(st) {
    st.look(1440);
    st.act('minh', 'nod'); st.mood('minh', 'joy');
    await st.say('minh', 'Yes, please!', 1300);
    st.act('minh', null);
    st.chest('woman', null); st.pose('woman', 'stand');
    await st.fly(RABBIT, [1514, 196], [1374, 196], { size: 34, dur: 600 });
    st.chest('minh', HELD_RABBIT); st.pose('minh', 'carry');
    st.fx('hearts', 1374, 150);
    await st.wait(800);
  } },
  { key: ['some food for Kitty'], icon: '🐱', label: 'food for Kitty', async play(st) {
    await st.walk('dad', 1612, { speed: 230, lead: -20 });
    st.pose('dad', 'point'); st.set('st-lb-food');
    await st.say('dad', 'Some food for Kitty, please.', 1900);
    st.set('st-foodGone');
    await st.fly(FOODBAG, [1722, 196], [1612, 170], { size: 34, dur: 500 });
    st.chest('dad', HELD_FOOD); st.pose('dad', 'carry'); st.mood('dad', 'joy');
    await st.wait(500);
    st.set('st-lb-food', false); st.mood('dad', 'happy');
  } },
  { key: ['chooses the brown puppy'], icon: '👆', label: 'chooses', async play(st) {
    await st.look(1170, { dur: 1000 });
    st.pose('tom', 'point'); st.set('st-pupB');
    await st.wait(900);
    st.set('st-pupB', false); st.set('st-pupGone');
    await st.fly(P_BROWN, [1196, 260], [1084, 196], { size: 34, dur: 600 });
    st.chest('tom', HELD_PUPPY()); st.pose('tom', 'carry'); st.mood('tom', 'joy');
    st.sfx('dog-bark', { vol: 0.5, rate: 1.5 });
    await st.wait(700);
  } },
  { key: ['call him Max'], icon: '🏷️', label: 'Max', async play(st) {
    st.look(1170);
    await st.say('tom', 'I want to call him Max!', 2000);
    st.set('st-lb-max'); st.sfx('sparkle');
    st.fx('sparkle', 1078, 140, { quiet: true });
    await st.wait(1100);
  } },
  { key: ['a red ball for Max'], icon: '🔴', label: 'a red ball', async play(st) {
    st.look(1200);
    st.set('st-lb-max', false);
    await st.walk('woman', 1318, { speed: 140, follow: false });
    await st.walk('woman', 1316, { speed: 60, follow: false });
    st.set('st-ballGone'); st.hold('woman', 'e035_ball'); st.pose('woman', 'raise');
    await st.say('woman', 'Would you like a red ball for Max?', 2400);
  } },
  { key: ['asks the woman'], icon: '❔', label: 'asks', async play(st) {
    st.look(1220);
    st.pose('woman', 'e035_offer'); st.set('st-lb-q');
    await st.wait(1500);
    st.set('st-lb-q', false);
  } },
  { key: ['Yes, I would'], icon: '🎉', label: 'Yes, I would!', async play(st) {
    st.look(1220);
    st.mood('tom', 'joy');
    await st.say('tom', 'Yes, I would!', 1300);
    st.hold('woman', null); st.pose('woman', 'stand');
    await st.fly(RED_BALL, [1340, 190], [1108, 172], { size: 16, dur: 600 });
    st.chest('tom', HELD_PUPPY(true));
    st.mood('woman', 'joy'); st.pose('woman', 'clap'); st.act('woman', 'clap');
    st.act('tom', 'hop'); st.sfx('dog-bark', { vol: 0.5, rate: 1.5 });
    st.fx('hearts', 1090, 150);
    await st.wait(1400);
    st.act('woman', null); st.act('tom', null); st.pose('woman', 'stand');
  } },
];

export default {
  id: 'en035', worldW: 1820, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  props: { e035_ball: BALL_PROP },
  order: [1, 4, 7, 8, 12, 14],
  cast: [
    { id: 'woman', kind: 'adult', who: 'e035_woman', x: 1010, s: 0.95, face: -1 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: -80, s: 0.95 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: -30 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: 240 },
  ],
};
