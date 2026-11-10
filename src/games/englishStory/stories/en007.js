/**
 * Bài 7 "In the Kitchen": một căn bếp dài: tủ lạnh trắng (trứng, bánh kem bên trong) · quầy có chuối và xoài · bàn ăn 4 ghế ·
 * bếp nấu · cửa ra hành lang (Mẹ, chị Lan, Lucky vào từ cửa đó). Camera đi từ bàn sang tủ lạnh, quầy hoa quả, rồi về bàn
 * và bếp khi Lan nấu cơm, cá, canh; cuối cùng Lucky vào, đói bụng và được một bát riêng.
 * Toạ độ cảnh: rộng 1320, sàn y = 282. Trạng thái cảnh là class st-*; nhãn chữ là st-l-* (mỗi lúc một bộ nhãn).
 */
import { L, room, doorway, windowBox, label, KIT_CSS } from '../kit.js';

const FLOOR = 282;
const FR_X = 150; // tâm tủ lạnh
const TB_X = 650; // tâm bàn ăn
const TB_TOP = 214;
const STOVE_X = 940;
const LUCKY_X = 866;
const BOWL_X = LUCKY_X - 40;

// ── Đồ vật (gốc ở giữa đáy) ──────────────────────────────────────────────
const EGG = `<ellipse cy="-8" rx="6" ry="8" fill="#FEF3C7" stroke="${L}" stroke-width="0.9"/><path d="M-2.6 -12 q1.6 -2 3.4 -2" stroke="#fff" stroke-width="1.4" fill="none"/>`;
const CAKE = `<rect x="-20" y="-22" width="40" height="22" rx="3" fill="#FBCFE8" stroke="${L}"/><path d="M-20 -14 Q-15 -9 -10 -14 Q-5 -9 0 -14 Q5 -9 10 -14 Q15 -9 20 -14 V-22 H-20Z" fill="#fff" stroke="${L}" stroke-width="0.7"/>
  <rect x="-1.4" y="-32" width="2.8" height="10" fill="#60A5FA" stroke="${L}" stroke-width="0.5"/><path d="M0 -32 q-3 -4 0 -7 q3 3 0 7Z" fill="#F97316"/><circle cx="-10" cy="-24" r="3" fill="#EF4444"/><circle cx="10" cy="-24" r="3" fill="#EF4444"/>`;
const BANANA = `<path d="M-14 -16 Q-12 0 4 -2 Q14 -4 16 -14 Q10 -7 2 -7 Q-8 -7 -10 -18Z" fill="#FDE047" stroke="${L}" stroke-linejoin="round"/><path d="M-10 -18 l-2 -3" stroke="#78350F" stroke-width="2" stroke-linecap="round"/>`;
const MANGO = `<path d="M0 -26 Q14 -24 14 -10 Q12 0 0 0 Q-12 -2 -12 -12 Q-10 -24 0 -26Z" fill="#FB923C" stroke="${L}"/><path d="M-6 -20 Q-2 -24 4 -22" stroke="#FDE047" stroke-width="3" fill="none" opacity="0.7"/><path d="M0 -26 l2 -5" stroke="#16A34A" stroke-width="2"/><ellipse cx="6" cy="-30" rx="5" ry="2.4" fill="#22C55E"/>`;
const RICE = `<path d="M-15 -10 H15 Q14 2 0 3 Q-14 2 -15 -10Z" fill="#fff" stroke="#3B82F6" stroke-width="1.4"/><path d="M-13 -10 Q-10 -22 0 -22 Q10 -22 13 -10Z" fill="#fff" stroke="${L}" stroke-width="0.8"/>${[-6, 0, 6, -3, 3].map((x, i) => `<ellipse cx="${x}" cy="${-14 - (i > 2 ? 4 : 0)}" rx="1.6" ry="1" fill="#E2E8F0"/>`).join('')}`;
const FISH = `<ellipse cy="-3" rx="22" ry="5" fill="#fff" stroke="${L}"/><g transform="translate(0 -9)"><path d="M-14 0 Q-2 -10 12 0 Q-2 10 -14 0Z" fill="#F97316" stroke="${L}"/><path d="M12 0 L20 -7 V7Z" fill="#F97316" stroke="${L}" stroke-linejoin="round"/><circle cx="-8" cy="-1.6" r="1.6" fill="#1F2937"/><path d="M-2 -4 Q2 0 -2 4 M3 -4 Q7 0 3 4" stroke="#FDE68A" stroke-width="1.2" fill="none"/></g>`;
const SOUP = `<path d="M-17 -12 H17 Q16 2 0 3 Q-16 2 -17 -12Z" fill="#FDE68A" stroke="${L}"/><ellipse cy="-12" rx="17" ry="4" fill="#86EFAC" stroke="${L}" stroke-width="0.8"/><circle cx="-6" cy="-12" r="2" fill="#16A34A"/><circle cx="5" cy="-12" r="2.4" fill="#F87171"/>`;
const DOGBOWL = (full) => `<path d="M-16 -10 H16 L13 0 H-13Z" fill="#EF4444" stroke="${L}" stroke-linejoin="round"/>${full ? `<ellipse cy="-10" rx="15" ry="4" fill="#B45309" stroke="${L}" stroke-width="0.7"/>${[-8, -2, 4, 9].map((x) => `<circle cx="${x}" cy="-12" r="2.4" fill="#92400E" stroke="${L}" stroke-width="0.5"/>`).join('')}` : `<ellipse cy="-10" rx="15" ry="3" fill="#FCA5A5" stroke="${L}" stroke-width="0.7"/>`}
  <text y="-2.4" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="6" fill="#fff">LUCKY</text>`;
const mid = (svg, dy = 10) => `<g transform="translate(0 ${dy})">${svg}</g>`;

const badge = (x, y, n, c = '#2563EB') => `<g transform="translate(${x} ${y})"><circle r="8.5" fill="#fff" stroke="${c}" stroke-width="1.6"/><text y="4" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="11" fill="${c}">${n}</text></g>`;
const chair = (x, c) => `<g transform="translate(${x} ${FLOOR})"><rect x="-18" y="-120" width="36" height="74" rx="8" fill="${c}" stroke="${L}" stroke-width="1.2"/><rect x="-12" y="-112" width="24" height="10" rx="3" fill="#fff" opacity="0.35"/>
  <rect x="-20" y="-50" width="40" height="8" rx="3" fill="${c}" stroke="${L}"/><rect x="-17" y="-42" width="5" height="42" fill="#92400E" stroke="${L}" stroke-width="0.7"/><rect x="12" y="-42" width="5" height="42" fill="#92400E" stroke="${L}" stroke-width="0.7"/></g>`;
const CHAIRS = [560, 620, 680, 740];
const EGGS = [-30, -18, -6, 6, 18, 30];
const FRUIT_Y = 200;
const BANANAS = [272, 302, 332];
const MANGOES = [384, 420];
const FOOD = { rice: TB_X - 66, fish: TB_X, soup: TB_X + 66 };

// Nhãn chữ (lớp trước): tên → [x, y, chữ, màu, cỡ]
const LBL = {
  kitchen: [560, 92, 'kitchen', '#C2410C', 26],
  big: [470, 92, 'big', '#7C3AED', 22],
  clean: [650, 92, 'clean', '#0284C7', 22],
  table: [TB_X, 150, 'table', '#B45309', 20],
  chairs: [TB_X, 128, '4 chairs', '#16A34A', 20],
  fridge: [FR_X + 120, 110, 'big fridge', '#2563EB', 20],
  white: [FR_X + 110, 110, 'white', '#64748B', 22],
  eggs: [FR_X + 120, 110, '6 eggs', '#A16207', 20],
  cake: [FR_X + 120, 110, 'a cake', '#DB2777', 20],
  bananas: [300, 132, '3 bananas', '#CA8A04', 17],
  mangoes: [404, 100, '2 mangoes', '#EA580C', 17],
  cook: [STOVE_X, 92, 'good cook', '#DB2777', 20],
  rice: [FOOD.rice, 150, 'rice', '#475569', 18],
  fish: [FOOD.fish, 150, 'fish', '#EA580C', 18],
  soup: [FOOD.soup, 150, 'soup', '#16A34A', 18],
  dinner: [TB_X + 40, 92, 'Dinner is ready!', '#DC2626', 22],
  hungry: [LUCKY_X - 70, 170, 'hungry', '#B45309', 20],
  bowl: [BOWL_X - 62, 306, 'bowl', '#DC2626', 15],
  yum: [LUCKY_X, 160, 'Yum!', '#DB2777', 22],
};

function bg() {
  return `
  ${room(0, 1100, FLOOR, '#FFF7ED')}
  ${room(1100, 220, FLOOR, '#E0F2FE')}
  ${Array.from({ length: 8 }, (_, i) => `<path d="M${240 + i * 26} 120 V198" stroke="#FED7AA" stroke-width="1.2"/>`).join('')}<path d="M240 146 H444 M240 172 H444" stroke="#FED7AA" stroke-width="1.2"/>
  ${Array.from({ length: 7 }, (_, i) => `<path d="M${860 + i * 26} 120 V198" stroke="#FED7AA" stroke-width="1.2"/>`).join('')}<path d="M860 146 H1030 M860 172 H1030" stroke="#FED7AA" stroke-width="1.2"/>
  ${windowBox(590, 50, 120, 80)}
  <g transform="translate(480 86)"><circle r="20" fill="#fff" stroke="${L}" stroke-width="2"/><path d="M0 0 V-12 M0 0 H9" stroke="${L}" stroke-width="2" stroke-linecap="round"/></g>
  <g transform="translate(780 60)"><rect width="52" height="64" rx="3" fill="#fff" stroke="${L}"/><rect width="52" height="14" rx="3" fill="#EF4444" stroke="${L}"/>${Array.from({ length: 12 }, (_, i) => `<rect x="${6 + (i % 4) * 11}" y="${20 + Math.floor(i / 4) * 13}" width="7" height="7" fill="#E2E8F0"/>`).join('')}</g>
  <g class="e007-shine">${[[260, 210], [680, 70], [190, 120], [990, 200], [520, 260], [800, 250]].map(([x, y], i) => `<path d="M${x} ${y - 8} L${x + 2} ${y - 2} L${x + 8} ${y} L${x + 2} ${y + 2} L${x} ${y + 8} L${x - 2} ${y + 2} L${x - 8} ${y} L${x - 2} ${y - 2}Z" fill="#fff" stroke="#FDE047" stroke-width="1" style="animation-delay:${i * 0.2}s" class="e007-tw"/>`).join('')}</g>
  <!-- Tủ lạnh: bên trong (trứng, bánh), cửa mở được -->
  <g transform="translate(${FR_X} ${FLOOR})">
    <rect x="-52" y="-200" width="104" height="200" rx="10" fill="#fff" stroke="${L}" stroke-width="1.4"/>
    <rect x="-46" y="-194" width="92" height="186" rx="6" fill="#E0F2FE" stroke="${L}"/>
    <rect class="e007-light" x="-46" y="-194" width="92" height="186" rx="6" fill="#FEF9C3"/>
    ${[-150, -104, -58].map((y) => `<rect x="-46" y="${y}" width="92" height="4" fill="#BAE6FD" stroke="${L}" stroke-width="0.6"/>`).join('')}
    <rect x="-38" y="-156" width="76" height="6" rx="2" fill="#CBD5E1" stroke="${L}" stroke-width="0.6"/>
    ${EGGS.map((x) => `<g transform="translate(${x} -154)">${EGG}</g>`).join('')}
    <g transform="translate(-6 -104)"><g class="e007-cake">${CAKE}</g></g>
    <g transform="translate(26 -104)"><rect x="-7" y="-26" width="14" height="26" rx="3" fill="#fff" stroke="${L}"/><rect x="-7" y="-16" width="14" height="8" fill="#60A5FA"/></g>
    <g transform="translate(-20 -58)"><path d="M-10 0 Q-12 -16 0 -18 Q12 -16 10 0Z" fill="#22C55E" stroke="${L}"/></g><g transform="translate(16 -58)"><path d="M-12 -2 L12 -10 L10 -2Z" fill="#F97316" stroke="${L}"/></g>
    ${EGGS.map((x, i) => `<g class="e007-pop e007-n-eggs" style="--d:${(i * 0.3).toFixed(1)}s">${badge(x, i % 2 ? -192 : -174, i + 1)}</g>`).join('')}
    <g class="e007-fdoor"><rect x="-52" y="-200" width="104" height="200" rx="10" fill="#fff" stroke="${L}" stroke-width="1.4"/><path d="M-52 -128 H52" stroke="${L}" stroke-width="1.2"/>
      <rect x="38" y="-186" width="6" height="40" rx="3" fill="#CBD5E1" stroke="${L}" stroke-width="0.6"/><rect x="38" y="-116" width="6" height="50" rx="3" fill="#CBD5E1" stroke="${L}" stroke-width="0.6"/>
      <circle cx="-26" cy="-170" r="7" fill="#F472B6" stroke="${L}" stroke-width="0.6"/><rect x="-36" y="-110" width="20" height="14" rx="2" fill="#FDE047" stroke="${L}" stroke-width="0.6" transform="rotate(-6 -26 -103)"/></g>
  </g>
  <!-- Quầy, rổ hoa quả -->
  <rect x="236" y="206" width="212" height="76" fill="#FB923C" stroke="${L}" stroke-width="1.2"/>
  ${[290, 390].map((x) => `<rect x="${x - 40}" y="216" width="80" height="56" rx="3" fill="#F97316" stroke="${L}" stroke-width="0.8"/><circle cx="${x + 30}" cy="244" r="2.4" fill="#FDE68A"/>`).join('')}
  <rect x="230" y="198" width="224" height="10" rx="3" fill="#F5F5F4" stroke="${L}"/>
  <ellipse cx="344" cy="${FRUIT_Y}" rx="96" ry="5" fill="#D6D3D1" stroke="${L}" stroke-width="0.8"/>
  ${BANANAS.map((x, i) => `<g transform="translate(${x} ${FRUIT_Y}) rotate(${(i - 1) * 8}) scale(1.35)">${BANANA}</g>`).join('')}
  ${MANGOES.map((x) => `<g transform="translate(${x} ${FRUIT_Y}) scale(1.35)">${MANGO}</g>`).join('')}
  ${BANANAS.map((x, i) => `<g class="e007-pop e007-n-bananas" style="--d:${(i * 0.3).toFixed(1)}s">${badge(x, FRUIT_Y - 40, i + 1, '#CA8A04')}</g>`).join('')}
  ${MANGOES.map((x, i) => `<g class="e007-pop e007-n-mangoes" style="--d:${(i * 0.3).toFixed(1)}s">${badge(x, FRUIT_Y - 54, i + 1, '#EA580C')}</g>`).join('')}
  <!-- Ghế sau bàn -->
  ${CHAIRS.map((x, i) => `<g class="e007-chair" style="--d:${(i * 0.3).toFixed(1)}s">${chair(x, ['#F59E0B', '#22C55E', '#3B82F6', '#EC4899'][i])}</g>`).join('')}
  ${CHAIRS.map((x, i) => `<g class="e007-pop e007-n-chairs" style="--d:${(i * 0.3).toFixed(1)}s">${badge(x, 148, i + 1, '#16A34A')}</g>`).join('')}
  <!-- Bếp nấu -->
  <rect x="856" y="206" width="180" height="76" fill="#E5E7EB" stroke="${L}" stroke-width="1.2"/>
  <rect x="880" y="222" width="132" height="48" rx="4" fill="#1F2937" stroke="${L}"/><rect x="890" y="232" width="112" height="28" rx="3" fill="#475569"/>
  <rect x="850" y="198" width="192" height="10" rx="3" fill="#F5F5F4" stroke="${L}"/>
  <g transform="translate(${STOVE_X + 50} 196)"><rect x="-8" y="-6" width="16" height="6" rx="2" fill="#1F2937"/></g>
  <g transform="translate(${STOVE_X} 198)"><path d="M-24 -30 H24 V-6 Q24 0 18 0 H-18 Q-24 0 -24 -6Z" fill="#94A3B8" stroke="${L}"/><path d="M-30 -24 H-24 M24 -24 H30" stroke="${L}" stroke-width="3" stroke-linecap="round"/><ellipse cy="-30" rx="24" ry="4" fill="#CBD5E1" stroke="${L}" stroke-width="0.8"/></g>
  <g class="e007-steam0">${[-8, 0, 8].map((dx, i) => `<path class="ek-steam" style="animation-delay:${i * 0.5}s" d="M${STOVE_X + dx} 162 q-5 -8 0 -16 q5 -8 0 -16" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <rect x="890" y="70" width="110" height="34" rx="6" fill="#E5E7EB" stroke="${L}"/><path d="M945 104 V128" stroke="#94A3B8" stroke-width="2"/>
  <!-- Ổ của Lucky ngoài hành lang -->
  ${doorway(1100, FLOOR)}
  <ellipse cx="1230" cy="${FLOOR - 6}" rx="44" ry="12" fill="#A78BFA" stroke="${L}"/><ellipse cx="1230" cy="${FLOOR - 10}" rx="32" ry="6" fill="#DDD6FE"/>
  <rect x="1150" y="80" width="60" height="46" rx="3" fill="#fff" stroke="${L}"/><circle cx="1180" cy="103" r="12" fill="#FCA5A5"/>`;
}

/** Lớp trước: bàn ăn (che chân người đứng sau bàn), đồ ăn, bát của Lucky, nhãn. */
function fg() {
  return `
  <g class="e007-table">
    <rect x="${TB_X - 104}" y="${TB_TOP + 6}" width="10" height="${FLOOR - TB_TOP - 6}" fill="#92400E" stroke="${L}"/><rect x="${TB_X + 94}" y="${TB_TOP + 6}" width="10" height="${FLOOR - TB_TOP - 6}" fill="#92400E" stroke="${L}"/>
    <path d="M${TB_X - 116} ${TB_TOP + 4} H${TB_X + 116} V${TB_TOP + 32} ${Array.from({ length: 10 }, (_, i) => `Q${TB_X + 104.4 - i * 23.2} ${TB_TOP + 42} ${TB_X + 92.8 - i * 23.2} ${TB_TOP + 32}`).join(' ')} Z" fill="#FFF7ED" stroke="${L}" stroke-width="1.1"/>
    ${Array.from({ length: 9 }, (_, i) => `<path d="M${TB_X - 93 + i * 23.2} ${TB_TOP + 6} V${TB_TOP + 32}" stroke="#93C5FD" stroke-width="3" opacity="0.7"/>`).join('')}
    <path d="M${TB_X - 116} ${TB_TOP + 14} H${TB_X + 116} M${TB_X - 116} ${TB_TOP + 24} H${TB_X + 116}" stroke="#93C5FD" stroke-width="3" opacity="0.7"/>
    <rect x="${TB_X - 122}" y="${TB_TOP - 2}" width="244" height="8" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
  </g>
  ${Object.entries({ rice: RICE, fish: FISH, soup: SOUP }).map(([k, s]) => `<g transform="translate(${FOOD[k]} ${TB_TOP - 1})"><g class="e007-pop e007-${k}">${s}</g></g>`).join('')}
  <g class="e007-steam1">${Object.values(FOOD).map((x, j) => [-6, 0, 6].map((dx, i) => `<path class="ek-steam" style="animation-delay:${(i * 0.5 + j * 0.2).toFixed(1)}s" d="M${x + dx} ${TB_TOP - 24} q-4 -6 0 -12 q4 -6 0 -12" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round"/>`).join('')).join('')}</g>
  <g transform="translate(${BOWL_X} ${FLOOR + 12}) scale(1.35)"><g class="e007-pop e007-dbowl"><g class="e007-full">${DOGBOWL(true)}</g><g class="e007-empty">${DOGBOWL(false)}</g></g></g>
  <g transform="translate(${LUCKY_X + 40} 176)"><g class="e007-pop e007-think"><circle cx="-16" cy="22" r="3" fill="#fff" stroke="${L}"/><circle cx="-8" cy="12" r="5" fill="#fff" stroke="${L}"/>
    <ellipse rx="26" ry="18" fill="#fff" stroke="${L}"/><g transform="translate(0 6) scale(0.9)">${DOGBOWL(true)}</g></g></g>
  ${Object.entries(LBL).map(([k, [x, y, t, c, s]]) => `<g class="e007-lbl e007-l-${k}">${label(x, y, t, c, s)}</g>`).join('')}`;
}

const CSS = `
.e007-lbl, .e007-pop { opacity: 0; transform: scale(.3); transform-box: fill-box; transform-origin: 50% 100%; transition: opacity .25s, transform .45s cubic-bezier(.3,1.6,.6,1); }
.e007-pop { transition-delay: var(--d, 0s); }
${Object.keys(LBL).map((k) => `.st-l-${k} .e007-l-${k}`).join(', ')} { opacity: 1; transform: none; }
.st-n-eggs .e007-n-eggs, .st-n-bananas .e007-n-bananas, .st-n-mangoes .e007-n-mangoes, .st-n-chairs .e007-n-chairs,
.st-rice .e007-rice, .st-fish .e007-fish, .st-soup .e007-soup, .st-dbowl .e007-dbowl, .st-think .e007-think { opacity: 1; transform: none; }
.e007-tw { opacity: 0; transform-box: fill-box; transform-origin: center; }
.st-clean .e007-tw { animation: e007Tw 1s ease-in-out infinite alternate; }
@keyframes e007Tw { from { opacity: 0; transform: scale(.4) rotate(0); } to { opacity: 1; transform: scale(1.2) rotate(45deg); } }
.e007-table, .e007-chair { transform-box: fill-box; transform-origin: 50% 100%; transition: transform .35s cubic-bezier(.3,1.6,.6,1); }
.e007-chair { transition-delay: var(--d); }
.st-hopT .e007-table, .st-hopC .e007-chair { transform: translateY(-10px); }
.e007-fdoor { transform-origin: -52px -100px; transition: transform .6s cubic-bezier(.4,0,.2,1); }
.st-fopen .e007-fdoor { transform: scaleX(.1); }
.e007-light { opacity: 0; transition: opacity .4s; } .st-fopen .e007-light { opacity: .7; }
.e007-cake { transform-box: fill-box; transform-origin: 50% 100%; transition: transform .35s cubic-bezier(.3,1.6,.6,1); }
.st-cakeUp .e007-cake { transform: scale(1.25); }
.e007-steam0, .e007-steam1 { opacity: 0; transition: opacity .4s; }
.st-cook .e007-steam0, .st-hot .e007-steam1 { opacity: 1; }
.e007-empty { opacity: 0; } .st-ate .e007-full { opacity: 0; } .st-ate .e007-empty { opacity: 1; }
.es-dog.act-e007eat .dg-head { animation: e007Eat .3s ease-in-out infinite alternate; }
@keyframes e007Eat { from { transform: rotate(16deg) translateY(4px); } to { transform: rotate(30deg) translateY(10px); } }
.es-dog.act-e007eat .dg-tail { animation: dgWag .15s ease-in-out infinite alternate; }
`;

function lab(st, ...names) {
  const on = names.map((n) => `st-l-${n}`);
  [...st.state].filter((s) => s.startsWith('st-l-') && !on.includes(s)).forEach((s) => st.set(s, false));
  on.forEach((s) => st.set(s));
}
/** Lan bưng một món từ bếp ra bàn. */
async function serve(st, k, svg, word) {
  lab(st);
  st.pose('lan', 'give');
  await st.fly(svg, [STOVE_X, 176], [FOOD[k], TB_TOP - 10], { size: 44, dur: 700 });
  st.set(`st-${k}`); st.sfx('bowl-down', { vol: 0.7 });
  lab(st, word); st.fx('sparkle', FOOD[k], TB_TOP - 12, { quiet: true });
  st.pose('lan', 'stir');
}

const BEATS = [
  { key: ['the kitchen'], icon: '🏠', label: 'kitchen', async play(st) {
    await st.look(560, { dur: 1200 });
    lab(st, 'kitchen'); st.fx('sparkle', 560, 92);
    await st.wait(700);
  } },
  { key: ['big and clean'], icon: '✨', label: 'big and clean', async play(st) {
    lab(st, 'big');
    await st.wait(800);
    st.set('st-clean'); lab(st, 'big', 'clean'); st.sfx('sparkle');
    await st.wait(1300);
    st.set('st-clean', false);
  } },
  { key: ['a table'], icon: '🍽️', label: 'table', async play(st) {
    lab(st);
    st.set('st-hopT'); lab(st, 'table');
    await st.wait(450);
    st.set('st-hopT', false);
    await st.wait(1000);
  } },
  { key: ['four chairs'], icon: '🪑', label: 'four chairs', async play(st) {
    lab(st);
    st.set('st-hopC'); st.set('st-n-chairs');
    await st.wait(1600);
    st.set('st-hopC', false); lab(st, 'chairs');
    await st.wait(600);
  } },
  { key: ['a big fridge'], icon: '🧊', label: 'big fridge', async play(st) {
    lab(st); st.set('st-n-chairs', false);
    await st.look(300, { dur: 900 });
    lab(st, 'fridge'); st.fx('sparkle', FR_X, 120, { quiet: true });
    await st.wait(1000);
  } },
  { key: ['It is white'], icon: '⬜', label: 'white', async play(st) {
    lab(st, 'white'); st.fx('sparkle', FR_X, 180);
    await st.wait(1500);
  } },
  { key: ['six eggs in the fridge'], icon: '🥚', label: 'six eggs', async play(st) {
    lab(st);
    st.set('st-fopen'); st.sfx('wardrobe-open');
    await st.wait(700);
    st.set('st-n-eggs');
    await st.wait(6 * 300 + 300);
    lab(st, 'eggs');
    await st.wait(500);
  } },
  { key: ['a cake, too'], icon: '🎂', label: 'cake', async play(st) {
    lab(st); st.set('st-n-eggs', false);
    st.set('st-cakeUp'); lab(st, 'cake'); st.fx('sparkle', FR_X - 6, FLOOR - 120);
    await st.wait(1300);
    st.set('st-cakeUp', false);
    await st.wait(300);
  } },
  { key: ['three bananas', 'two mangoes'], icon: '🍌', label: 'bananas, mangoes', async play(st) {
    lab(st);
    st.set('st-fopen', false); st.sfx('door-open', { vol: 0.5 });
    await st.look(340, { dur: 600 });
    st.set('st-n-bananas');
    await st.wait(1000);
    lab(st, 'bananas');
    await st.wait(400);
    st.set('st-n-mangoes');
    await st.wait(800);
    lab(st, 'bananas', 'mangoes');
    await st.wait(600);
  } },
  { key: ['Mum and Lan are in the kitchen'], icon: '👩‍👧', label: 'Mum and Lan', async play(st) {
    lab(st); st.set('st-n-bananas', false); st.set('st-n-mangoes', false);
    st.look(700, { dur: 900 });
    await Promise.all([
      st.walk('mum', 610, { speed: 170, follow: false }),
      (async () => { await st.wait(250); await st.walk('lan', 700, { speed: 170, follow: false }); })(),
    ]);
    st.pose('mum', 'wave'); st.pose('lan', 'wave'); st.mood('mum', 'joy'); st.mood('lan', 'joy');
    await st.wait(700);
    st.pose('mum', 'stand'); st.pose('lan', 'stand'); st.mood('mum', 'happy'); st.mood('lan', 'happy');
  } },
  { key: ['a good cook'], icon: '👩‍🍳', label: 'good cook', async play(st) {
    await st.walk('lan', STOVE_X - 34, { speed: 150, lead: -100 });
    st.pose('lan', 'stir'); st.act('lan', 'stir'); st.set('st-cook'); st.sfx('pot-stir');
    lab(st, 'cook'); st.fx('sparkle', STOVE_X, 120, { quiet: true });
    await st.wait(1300);
    st.act('lan', null);
  } },
  { key: ['There is rice'], icon: '🍚', label: 'rice', async play(st) {
    await serve(st, 'rice', mid(RICE));
    await st.wait(700);
  } },
  { key: ['There is fish'], icon: '🐟', label: 'fish', async play(st) {
    await serve(st, 'fish', mid(FISH, 6));
    await st.wait(700);
  } },
  { key: ['There is soup, too'], icon: '🍲', label: 'soup', async play(st) {
    await serve(st, 'soup', mid(SOUP));
    await st.wait(900);
    st.pose('lan', 'stand');
  } },
  { key: ['Dinner is ready!'], icon: '🍽️', label: 'dinner', async play(st) {
    lab(st); st.set('st-cook', false); st.set('st-hot');
    st.look(TB_X + 120, { dur: 600 });
    st.pose('mum', 'clap'); st.act('mum', 'clap');
    st.pose('lan', 'cheer'); st.act('lan', 'cheer'); st.mood('lan', 'joy'); st.mood('mum', 'joy');
    lab(st, 'dinner'); st.fx('sparkle', TB_X, TB_TOP - 30);
    await st.wait(1800);
    st.act('mum', null); st.act('lan', null); st.pose('mum', 'stand'); st.pose('lan', 'stand');
    st.mood('lan', 'happy'); st.mood('mum', 'happy');
  } },
  { key: ['Lucky is in the kitchen, too'], icon: '🐶', label: 'Lucky', async play(st) {
    lab(st);
    st.dog('lucky', 'stand'); st.act('lucky', 'wag'); st.mood('lucky', 'joy');
    await st.walk('lucky', LUCKY_X, { speed: 150, lead: 40 });
    st.sfx('dog-bark', { vol: 0.7 });
    await st.wait(700);
  } },
  { key: ['He is hungry'], icon: '🤤', label: 'hungry', async play(st) {
    st.dog('lucky', 'sit'); st.act('lucky', null); st.mood('lucky', 'happy');
    st.set('st-think'); lab(st, 'hungry');
    await st.wait(600);
    st.act('lucky', 'wag'); st.mood('lucky', 'joy');
    await st.wait(1000);
  } },
  { key: ['a bowl for Lucky'], icon: '🥣', label: 'bowl', async play(st) {
    lab(st); st.set('st-think', false);
    await st.walk('lan', LUCKY_X + 66, { speed: 150, follow: false });
    st.pose('lan', 'give');
    await st.fly(mid(DOGBOWL(true), 6), [LUCKY_X + 60, FLOOR - 60], [BOWL_X, FLOOR + 6], { size: 40, dur: 600 });
    st.set('st-dbowl'); st.sfx('bowl-down'); lab(st, 'bowl');
    st.pose('lan', 'stand');
    await st.wait(600);
  } },
  { key: ['Yum!'], icon: '😋', label: 'yum', async play(st) {
    lab(st, 'yum');
    st.dog('lucky', 'stand'); st.act('lucky', 'e007eat'); st.sfx('slurp');
    await st.wait(1300);
    st.set('st-ate'); st.act('lucky', 'wag'); st.mood('lucky', 'joy');
    st.fx('hearts', LUCKY_X, FLOOR - 90);
    await st.wait(700);
  } },
];

export default {
  id: 'en007', worldW: 1320, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  cast: [
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 1170, s: 0.95, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 1220, s: 1.08, face: -1 },
    { id: 'lucky', kind: 'dog', x: 1230, s: 0.9, face: -1 },
  ],
  init(st) {
    st.dog('lucky', 'sit');
  },
};
