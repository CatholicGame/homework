/**
 * Bài 110 "Goodbye, Bip" (câu bị động quá khứ: was painted, was drawn, was packed, were seen; câu tường thuật: told … that,
 * promised that, said that). Một thế giới đi từ trái sang phải: vườn nhà Minh lúc hoàng hôn (nhà mái đỏ, cây xoài, phi
 * thuyền đã sửa bằng đồ tái chế) → bầu trời đêm Hà Nội (phố, hồ Gươm có tháp Rùa, người dân ngước nhìn).
 * Mọi người đến tiễn; Lan sơn xanh vàng, Minh vẽ cờ đỏ sao vàng, bà xếp hộp bánh trung thu; Bíp cảm ơn, chào cô Hoa,
 * Lucky, ôm Minh, hẹn "hai ngôi sao nháy là Bíp chào". Phi thuyền bay qua Hà Nội. Sau đó Minh nhìn trời đêm.
 * Toạ độ cảnh: rộng 2600, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, grass, fence, bush, flowerAt, label, speaker } from '../kit.js';
import { BIP_SVG, BIP_BOX, BIP_CSS, SHIP_BOX, bipSet } from '../bip.js';
import { SHIP_FIXED, SHIP_PARTS_CSS } from './en108.js';

const FLOOR = 282;
const W = 2600;
const X = { door: 196, ship: 790, tree: 890, lake: 1820, city0: 1240 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e110_hoa: { ...CAST.en_hoa, bottom: 'pants', bottomC: '#FFFFFF' },
});

// ── Phi thuyền đã sơn: vành xanh lá có dải vàng, cờ đỏ sao vàng bên hông (vẽ trên vành, dưới đồ tái chế) ──────────
const LIGHTS = [-56, -38, -19, 0, 19, 38, 56];
const FLAG = `<rect x="-11" y="-7.5" width="22" height="15" fill="#DA251D" stroke="${L}" stroke-width="0.7"/><path d="M0 -5 L1.5 -1.4 L5.3 -1.4 L2.2 0.9 L3.3 4.6 L0 2.4 L-3.3 4.6 L-2.2 0.9 L-5.3 -1.4 L-1.5 -1.4Z" fill="#FFFF00"/>`;
const PAINT = `<g class="e110-paint"><ellipse cx="0" cy="-31" rx="74" ry="15" fill="#22C55E" stroke="${L}" stroke-width="1.3"/>
    <path d="M-72 -27 Q0 -10 72 -27 L70 -22 Q0 -4 -70 -22Z" fill="#FACC15" stroke="${L}" stroke-width="0.6"/>
    <ellipse cx="0" cy="-39" rx="36" ry="6" fill="#86EFAC" stroke="${L}" stroke-width="1"/>
    ${LIGHTS.map((x, i) => `<circle class="ship-light" style="--i:${i}" cx="${x}" cy="${-27 + Math.abs(x) * 0.07}" r="4" stroke="${L}" stroke-width="0.8"/>`).join('')}</g>
  <g class="e110-flag"><g transform="translate(-30 -36) scale(0.9)">${FLAG}</g></g>`;
const SHIP110 = SHIP_FIXED.replace('<g class="e108-broke">', `${PAINT}<g class="e108-broke">`);

const BRUSH = `<g transform="rotate(200)"><rect x="-1.4" y="-4" width="2.8" height="16" fill="#B45309" stroke="${L}" stroke-width="0.6"/><path d="M-2.4 12 H2.4 L1.6 20 Q0 22 -1.6 20Z" fill="#22C55E" stroke="${L}" stroke-width="0.6"/></g>`;
const PEN = `<g transform="rotate(200)"><rect x="-1.8" y="-2" width="3.6" height="18" fill="#DC2626" stroke="${L}" stroke-width="0.7"/><path d="M-1.8 16 L0 21 L1.8 16Z" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/></g>`;
const MOONCAKES = `<g transform="translate(0 -6)"><rect x="-18" y="-12" width="36" height="22" rx="3" fill="#DC2626" stroke="${L}" stroke-width="1"/>
  <rect x="-18" y="-12" width="36" height="5" fill="#FACC15" stroke="${L}" stroke-width="0.7"/><circle cx="0" cy="2" r="6" fill="#F59E0B" stroke="#92400E" stroke-width="0.9"/><circle cx="0" cy="2" r="2.6" fill="none" stroke="#92400E" stroke-width="0.7"/></g>`;
const PROPS = { e110_brush: BRUSH, e110_pen: PEN };
const POSES = {
  e110_hug: { R: [40, -70], L: [40, -70], head: 6 },
  e110_up: { R: [10, 4], L: [10, 4], head: -10 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
const house = () => `<g>
  <rect x="0" y="108" width="270" height="${FLOOR - 108}" fill="#FEF3C7" stroke="${L}" stroke-width="1.3"/>
  <path d="M-10 112 L40 62 H250 L284 112Z" fill="#DC2626" stroke="${L}" stroke-width="1.3"/>
  ${Array.from({ length: 8 }, (_, i) => `<path d="M${10 + i * 34} 112 L${48 + i * 28} 64" stroke="#B91C1C" stroke-width="1.2"/>`).join('')}
  <rect x="40" y="140" width="80" height="66" rx="3" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/><path d="M80 140 V206 M40 173 H120" stroke="#fff" stroke-width="3"/>
  <rect x="34" y="204" width="92" height="8" rx="2" fill="#A16207" stroke="${L}" stroke-width="0.9"/>
  <rect x="${X.door - 30}" y="176" width="60" height="${FLOOR - 176}" rx="3" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/>
  <g class="e110-door"><rect x="${X.door - 30}" y="176" width="60" height="${FLOOR - 176}" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
  <rect x="${X.door - 24}" y="184" width="22" height="36" rx="2" fill="#92400E"/><rect x="${X.door + 2}" y="184" width="22" height="36" rx="2" fill="#92400E"/>
  <circle cx="${X.door + 18}" cy="232" r="3" fill="#FDE68A"/></g>
  <rect x="0" y="${FLOOR}" width="290" height="${315 - FLOOR}" fill="#E7C9A0" stroke="${L}"/>
  ${Array.from({ length: 6 }, (_, i) => `<path d="M${i * 50} ${FLOOR} V315" stroke="#C9A77C" stroke-width="1"/>`).join('')}</g>`;
const mango = (x) => `<g transform="translate(${x} ${FLOOR})">
  <path d="M-16 0 Q-10 -60 -18 -110 L-4 -112 Q2 -70 14 -112 L26 -108 Q12 -60 18 0Z" fill="#92400E" stroke="${L}" stroke-width="1.2"/>
  <g class="ek-sway" style="transform-origin:0 -110px">
    <ellipse cx="-50" cy="-150" rx="66" ry="44" fill="#15803D" stroke="${L}" stroke-width="1.2"/>
    <ellipse cx="54" cy="-148" rx="70" ry="46" fill="#16A34A" stroke="${L}" stroke-width="1.2"/>
    <ellipse cx="0" cy="-196" rx="78" ry="48" fill="#22C55E" stroke="${L}" stroke-width="1.2"/>
    ${[[-70, -120], [-24, -134], [30, -118], [84, -126], [-6, -172], [52, -182]].map(([mx, my]) => `<g transform="translate(${mx} ${my})"><path d="M0 -8 V-2" stroke="#166534" stroke-width="1.4"/>
      <path d="M0 -3 Q8 0 6 10 Q2 16 -4 12 Q-8 4 0 -3Z" fill="#FBBF24" stroke="${L}" stroke-width="0.9"/></g>`).join('')}
  </g></g>`;
/** Nhà phố đêm (gốc giữa chân tường): cửa sổ sáng, một người ló đầu nhìn lên (class e110-peek). */
const block = (x, w, h, c, i) => `<g transform="translate(${x} ${FLOOR})"><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="${c}" stroke="${L}" stroke-width="1"/>
  ${Array.from({ length: Math.floor(h / 46) }, (_, r) => [-1, 1].map((sd) => `<rect x="${sd * w * 0.22 - 8}" y="${-h + 14 + r * 46}" width="16" height="20" rx="2" fill="#FDE68A" stroke="${L}" stroke-width="0.7"/>`).join('')).join('')}
  <rect x="-12" y="-36" width="24" height="36" fill="#7C2D12" stroke="${L}" stroke-width="0.8"/>
  <g class="e110-peek" style="transition-delay:${(i % 4) * 0.15}s"><g transform="translate(${-w * 0.22} ${-h + 22})"><circle r="6" fill="#F5C9A6" stroke="${L}" stroke-width="0.7"/><path d="M-6 -2 Q0 -10 6 -2" fill="#1F2937"/><path d="M5 2 L12 -10" stroke="#F5C9A6" stroke-width="2.6" stroke-linecap="round"/></g></g></g>`;
const tower = (x, y) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="4" rx="46" ry="8" fill="#4D7C5A" stroke="${L}" stroke-width="0.8"/>
  <rect x="-22" y="-26" width="44" height="28" fill="#FDE68A" stroke="${L}" stroke-width="1"/><rect x="-16" y="-48" width="32" height="22" fill="#FEF3C7" stroke="${L}" stroke-width="1"/><rect x="-10" y="-64" width="20" height="16" fill="#FEF3C7" stroke="${L}" stroke-width="1"/>
  <path d="M-26 -26 H26 M-20 -48 H20 M-14 -64 H14" stroke="#92400E" stroke-width="3"/><path d="M-8 -64 L0 -76 L8 -64" fill="#92400E"/>
  ${[-12, 0, 12].map((dx) => `<path d="M${dx - 4} -2 V-14 Q${dx} -20 ${dx + 4} -14 V-2Z" fill="#78350F"/>`).join('')}</g>`;

function bg() {
  return `
  <defs><linearGradient id="e110eve" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F472B6"/><stop offset="0.55" stop-color="#FDBA74"/><stop offset="1" stop-color="#FEF3C7"/></linearGradient>
    <linearGradient id="e110nite" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E1B4B"/><stop offset="1" stop-color="#4338CA"/></linearGradient></defs>
  <rect x="0" y="0" width="${X.city0 + 60}" height="315" fill="url(#e110eve)"/>
  <circle cx="1080" cy="180" r="34" fill="#FB923C" opacity="0.9"/>
  <rect class="e110-dusk" x="0" y="0" width="${X.city0 + 60}" height="315" fill="url(#e110nite)"/>
  <!-- trời đêm Hà Nội -->
  <rect x="${X.city0}" y="0" width="${W - X.city0}" height="315" fill="url(#e110nite)"/>
  <rect x="${X.city0}" y="0" width="80" height="315" fill="url(#e110nite)" opacity="0.6"/>
  <g class="e110-stars">${Array.from({ length: 36 }, (_, i) => `<path class="ek-twinkle" style="animation-delay:${(i % 5) * 0.37}s" d="M${30 + i * 72} ${22 + (i * 43) % 96} l1.6 4 l4 1.6 l-4 1.6 l-1.6 4 l-1.6 -4 l-4 -1.6 l4 -1.6Z" fill="#FDE68A"/>`).join('')}</g>
  ${grass(270, X.city0 + 60 - 270, FLOOR)}
  ${fence(300, 160, FLOOR)}${fence(1000, 220, FLOOR)}
  ${house()}
  ${mango(X.tree)}
  ${bush(560, FLOOR, 0.8)}${bush(1180, FLOOR, 1, '#4ADE80')}
  ${[[480, '#F472B6'], [520, '#FACC15'], [1060, '#F472B6'], [1120, '#FACC15']].map(([x, c]) => flowerAt(x, FLOOR - 2, c)).join('')}
  <!-- phố, hồ Gươm, tháp Rùa -->
  ${block(1380, 90, 170, '#FCA5A5', 0)}${block(1480, 80, 220, '#A5B4FC', 1)}${block(1570, 90, 150, '#FDE68A', 2)}
  <rect x="${X.lake - 170}" y="${FLOOR - 26}" width="340" height="${315 - FLOOR + 26}" rx="20" fill="#1D4ED8" stroke="${L}"/>
  <path d="M${X.lake - 140} ${FLOOR - 4} q8 -4 16 0 q8 4 16 0 M${X.lake + 60} ${FLOOR + 10} q8 -4 16 0 q8 4 16 0" stroke="#93C5FD" stroke-width="1.6" fill="none"/>
  ${tower(X.lake, FLOOR - 12)}
  ${block(2080, 90, 190, '#BBF7D0', 3)}${block(2180, 80, 140, '#FBCFE8', 4)}${block(2280, 100, 210, '#FED7AA', 5)}${block(2400, 90, 160, '#C7D2FE', 6)}${block(2510, 100, 230, '#FDE68A', 7)}
  <rect x="${X.city0 + 60}" y="${FLOOR}" width="${W - X.city0}" height="${315 - FLOOR}" fill="#57534E"/>
  <rect class="e110-night" x="0" y="0" width="${X.city0 + 60}" height="315" fill="#1E1B4B"/>
  <g class="e110-blink"><path class="e110-b1" d="M640 70 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4Z" fill="#FEF08A" stroke="#FACC15"/>
    <path class="e110-b2" d="M700 56 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4Z" fill="#FEF08A" stroke="#FACC15"/></g>`;
}

function fg() {
  return `
  ${bush(320, FLOOR + 34, 0.6)}${bush(1150, FLOOR + 34, 0.7, '#4ADE80')}
  <g class="e110-lb e110-lb-last">${label(470, 70, 'the last evening', '#DB2777', 16)}</g>
  <g class="e110-lb e110-lb-paint">${label(X.ship + 10, 150, 'green and yellow', '#16A34A', 14)}</g>
  <g class="e110-lb e110-lb-flag">${label(X.ship - 20, 304, 'a Vietnamese flag', '#DC2626', 13)}</g>
  <g class="e110-lb e110-lb-cake">${label(X.ship - 40, 150, 'mooncakes', '#B45309', 14)}</g>
  <g class="e110-lb e110-lb-nose">${label(470, 176, 'wet nose', '#2563EB', 14)}</g>
  <g class="e110-lb e110-lb-hello">${label(670, 112, 'hello!', '#CA8A04', 16)}</g>
  <g class="e110-lb e110-lb-hanoi">${label(X.lake, 196, 'all over Hanoi', '#CA8A04', 16)}</g>
  <g class="e110-lb e110-lb-later">${label(470, 70, 'Later', '#7C3AED', 16)}</g>
  <g class="e110-lb e110-lb-said">${speaker(560, 92, 'Minh', '#EA580C')}</g>`;
}

const LB = ['last', 'paint', 'flag', 'cake', 'nose', 'hello', 'hanoi', 'later', 'said'];
const CSS = `
${SHIP_PARTS_CSS}
.e110-lb { opacity: 0; transition: opacity .3s; }
${LB.map((k) => `.st-lb-${k} .e110-lb-${k}`).join(', ')} { opacity: 1; }
${LB.map((k) => `.e110-lb-${k}`).join(', ')} { transform-box: fill-box; transform-origin: 50% 100%; }
${LB.map((k) => `.st-lb-${k} .e110-lb-${k}`).join(', ')} { animation: e110Pop .4s cubic-bezier(.3,1.6,.6,1); }
@keyframes e110Pop { from { transform: scale(.3); } }
.e110-door { transition: opacity .3s; } .st-door .e110-door { opacity: 0; }
/* Trời: hoàng hôn → chạng vạng (sao) → đêm (về sau) */
.e110-dusk { opacity: 0; transition: opacity 1.4s; } .st-dusk .e110-dusk { opacity: .55; } .st-later .e110-dusk { opacity: 1; }
.e110-stars { opacity: .9; } .e110-stars path:nth-child(-n+17) { opacity: 0; transition: opacity 1s; }
.st-dusk .e110-stars path:nth-child(-n+17) { opacity: 1; }
.e110-night { opacity: 0; transition: opacity 1s; pointer-events: none; } .st-later .e110-night { opacity: .25; }
.e110-blink path { opacity: 0; transform-box: fill-box; transform-origin: center; }
.st-two .e110-blink path { opacity: 1; animation: e110Blink .5s ease-in-out infinite alternate; }
.st-two .e110-b2 { animation-delay: .25s !important; }
@keyframes e110Blink { from { transform: scale(.5); opacity: .4; } to { transform: scale(1.3); opacity: 1; } }
/* Người trong phố ló ra nhìn */
.e110-peek { opacity: 0; transition: opacity .4s; } .st-seen .e110-peek { opacity: 1; }
/* Phi thuyền: sơn quét dần, cờ hiện */
.e110-paint { clip-path: inset(0 100% 0 0); }
.e110-painted .e110-paint { clip-path: inset(0 0 0 0); transition: clip-path 1.6s linear; }
.e110-flag { opacity: 0; transform-box: fill-box; transform-origin: center; transition: opacity .3s, transform .4s cubic-bezier(.3,1.6,.6,1); transform: scale(.3); }
.e110-flagged .e110-flag { opacity: 1; transform: none; }
/* Bíp cúi chào, chỉ lên trời, ôm */
.act-e110bow .bip-body { animation: e110Bow .7s ease-in-out 2 alternate; }
@keyframes e110Bow { to { rotate: 16deg; } }
.act-e110up .bip-armR { rotate: -165deg; } .act-e110up .bip-front .bip-head { rotate: -6deg; }
.act-e110hug .bip-armR { rotate: -100deg; } .act-e110hug .bip-armL { rotate: 100deg; }
@media (prefers-reduced-motion: reduce) { .st-two .e110-blink path { animation-duration: 1s; } .act-e110bow .bip-body { animation-duration: 1.2s; } }
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const ALL = ['grandma', 'mum', 'dad', 'lan', 'minh', 'tom', 'hoa'];
const SPOT = { grandma: 300, mum: 355, dad: 410, lucky: 470, lan: 530, minh: 590, tom: 1010, hoa: 960 };

const BEATS = [
  { key: ['On the last evening', "everyone came to Minh's garden"], icon: '👨‍👩‍👧', label: 'everyone came', async play(st) {
    st.look(500);
    st.set('st-lb-last'); st.sfx('birds', { vol: 0.4 });
    st.set('st-door'); st.sfx('door-open', { vol: 0.5 });
    const go = [];
    for (const id of ['minh', 'lan', 'dad', 'mum', 'grandma']) {
      st.show(id, true);
      go.push(st.walk(id, SPOT[id], { speed: 150, follow: false }));
      await st.wait(260);
    }
    st.show('lucky', true); st.sfx('dog-bark', { vol: 0.6 });
    go.push(st.walk('lucky', SPOT.lucky, { speed: 220, follow: false, y: FLOOR + 8 }));
    go.push(st.walk('hoa', SPOT.hoa, { speed: 120, follow: false }), st.walk('tom', SPOT.tom, { speed: 130, follow: false }));
    await Promise.all(go);
    for (const id of ALL) st.face(id, id === 'tom' || id === 'hoa' ? -1 : 1);
    st.set('st-door', false);
    await st.wait(200);
  } },
  { key: ['was painted green and yellow by Lan', 'was drawn on its side by Minh'], icon: '🎨', label: 'painted · drawn', async play(st) {
    st.set('st-lb-last', false);
    st.look(X.ship - 60);
    await Promise.all([st.walk('lan', X.ship - 110, { speed: 150, follow: false }), st.walk('minh', X.ship - 62, { speed: 150, follow: false, y: FLOOR + 14 })]);
    st.hold('lan', 'e110_brush'); st.pose('lan', 'paint'); st.act('lan', 'paint');
    bipSet(st, 'ship', 'e110-painted'); st.set('st-lb-paint');
    await st.loop('paint', () => st.wait(1700), { vol: 0.8 });
    st.act('lan', null); st.pose('lan', 'stand'); st.hold('lan', null); st.set('st-lb-paint', false);
    st.hold('minh', 'e110_pen'); st.pose('minh', 'paint'); st.act('minh', 'write');
    await st.loop('pencil', () => st.wait(900), { vol: 0.8 });
    bipSet(st, 'ship', 'e110-flagged'); st.set('st-lb-flag'); st.sfx('ding', { vol: 0.5 });
    st.act('minh', null); st.pose('minh', 'stand'); st.hold('minh', null); st.mood('minh', 'joy');
    await st.wait(700);
  } },
  { key: ['A big box of mooncakes was packed by Grandma'], icon: '🥮', label: 'mooncakes', async play(st) {
    st.set('st-lb-flag', false);
    st.look(X.ship - 140);
    st.chest('grandma', MOONCAKES); st.pose('grandma', 'carry');
    await st.walk('grandma', X.ship - 160, { speed: 150, follow: false });
    st.chest('grandma', ''); st.pose('grandma', 'give'); st.sfx('box-shake', { vol: 0.6 });
    await st.fly(MOONCAKES, [X.ship - 140, FLOOR - 120], [X.ship, FLOOR - 56], { size: 36, dur: 700 });
    st.set('st-lb-cake'); st.sfx('click', { vol: 0.7 });
    st.mood('bip', 'joy'); st.pose('grandma', 'stand'); st.mood('grandma', 'joy');
    await st.wait(900);
  } },
  { key: ['Bip thanked everyone'], icon: '🙏', label: 'thanked everyone', async play(st) {
    st.set('st-lb-cake', false);
    st.look(560);
    st.walk('grandma', SPOT.grandma, { speed: 160, follow: false }).then(() => st.face('grandma', 1));
    st.walk('lan', SPOT.lan, { speed: 160, follow: false }).then(() => st.face('lan', 1));
    st.walk('minh', SPOT.minh, { speed: 160, follow: false, y: FLOOR }).then(() => st.face('minh', 1));
    await st.walk('bip', 680, { speed: 160, follow: false });
    st.face('bip', -1); st.act('bip', 'e110bow'); st.mood('bip', 'joy');
    const say = st.say('bip', 'Thank you!', 1800);
    await st.wait(500);
    st.fx('hearts', 660, 170);
    for (const id of ['mum', 'dad', 'lan', 'minh']) st.mood(id, 'joy');
    await say;
    st.act('bip', null);
  } },
  { key: ['He told Ms Hoa', 'the best class in the universe'], icon: '🏫', label: 'the best class', async play(st) {
    st.look(SPOT.hoa - 140);
    await st.walk('bip', SPOT.hoa - 60, { speed: 180, follow: false });
    st.face('bip', 1); st.talk('bip', true);
    const say = st.say('bip', 'Your class is the best class in the universe!', 3000);
    await st.wait(1400);
    st.mood('hoa', 'joy'); st.pose('hoa', 'clap'); st.act('hoa', 'clap'); st.sfx('ding', { vol: 0.6 });
    st.fx('sparkle', SPOT.hoa, FLOOR - 200, { quiet: true });
    await say;
    st.act('hoa', null); st.pose('hoa', 'stand');
  } },
  { key: ['He told Lucky', 'he would miss his wet nose'], icon: '🐶', label: 'wet nose', async play(st) {
    st.look(540);
    await st.walk('bip', SPOT.lucky + 46, { speed: 190, follow: false, y: FLOOR + 12 });
    st.face('bip', -1);
    st.dog('lucky', 'stand'); st.act('lucky', 'jump'); st.sfx('dog-bark', { vol: 0.7 });
    const say = st.say('bip', 'I will miss your wet nose!', 2600);
    await st.wait(900);
    st.act('lucky', 'wag'); st.set('st-lb-nose'); st.fx('drops', SPOT.lucky + 26, FLOOR - 50); st.sfx('giggle', { vol: 0.5 });
    st.mood('bip', 'joy');
    await say;
    st.act('lucky', null); st.dog('lucky', 'sit');
  } },
  { key: ['he hugged Minh', 'he would come back one day'], icon: '🤗', label: 'come back one day', async play(st) {
    st.set('st-lb-nose', false);
    st.look(560);
    await st.walk('bip', SPOT.minh + 32, { speed: 140, follow: false, y: FLOOR + 10 });
    st.face('bip', -1);
    st.pose('minh', 'e110_hug'); st.act('bip', 'e110hug'); st.mood('minh', 'shut'); st.mood('bip', 'shut');
    st.fx('hearts', SPOT.minh + 16, FLOOR - 130); st.sfx('hearts', { vol: 0.6 });
    await st.wait(1300);
    st.mood('bip', 'happy'); st.mood('minh', 'happy');
    await st.say('bip', 'I will come back one day!', 2200);
    st.act('bip', null); st.pose('minh', 'stand');
  } },
  { key: ['Look at the sky every night'], icon: '🌌', label: 'look at the sky', async play(st) {
    st.look(540);
    st.act('bip', 'e110up'); st.mood('bip', 'happy');
    st.set('st-dusk'); st.sfx('crickets', { vol: 0.4 });
    for (const id of ['minh', 'lan', 'mum', 'dad']) st.pose(id, 'e110_up');
    await st.say('bip', 'Look at the sky every night.', 2300);
  } },
  { key: ['When two stars blink', 'I am saying hello'], icon: '✨', label: 'two stars blink', async play(st) {
    st.act('bip', 'e110up');
    await st.wait(300);
    st.set('st-two'); st.sfx('ding', { vol: 0.5 }); await st.wait(260); st.sfx('ding', { vol: 0.5, rate: 1.25 });
    const say = st.say('bip', 'When two stars blink, I am saying hello.', 2900);
    await st.wait(900);
    st.set('st-lb-hello'); st.sfx('pop', { vol: 0.4 });
    st.mood('minh', 'joy'); st.mood('lan', 'joy');
    await say;
    st.set('st-two', false);
    for (const id of ['minh', 'lan', 'mum', 'dad']) st.pose(id, 'stand');
  } },
  { key: ['The spaceship rose into the air', 'were seen all over Hanoi'], icon: '🛸', label: 'rose into the air', async play(st) {
    st.set('st-lb-hello', false);
    st.look(X.ship - 60);
    await st.walk('bip', X.ship - 4, { speed: 160, follow: false, y: FLOOR - 40 });
    st.show('bip', false); bipSet(st, 'ship', 'ship-pilot'); st.sfx('click', { vol: 0.6 });
    for (const id of ['minh', 'lan', 'tom']) { st.pose(id, 'wave'); st.act(id, 'wave'); }
    await st.loop('drone', async () => {
      bipSet(st, 'ship', 'ship-fly'); bipSet(st, 'ship', 'e108-fast');
      await st.walk('ship', X.ship, { speed: 70, follow: false, y: 170 });
      st.sfx('whoosh', { vol: 0.6 });
      st.set('st-seen');
      await st.walk('ship', X.lake + 60, { speed: 330, follow: true, y: 150 });
      st.set('st-lb-hanoi'); st.sfx('cheer', { vol: 0.4 });
      await st.wait(700);
    }, { vol: 0.6 });
    for (const id of ['minh', 'lan', 'tom']) { st.act(id, null); st.pose(id, 'stand'); }
  } },
  { key: ['Later', 'the best friend he had ever had'], icon: '💛', label: 'best friend', async play(st) {
    off(st, 'st-lb-hanoi', 'st-seen');
    st.show('ship', false);
    for (const id of ['grandma', 'mum', 'dad', 'tom', 'hoa']) st.show(id, false);
    st.place('lan', 470, FLOOR, 1); st.place('minh', 540, FLOOR, 1); st.place('lucky', 610, FLOOR, -1);
    st.set('st-later'); st.set('st-lb-later'); st.sfx('crickets', { vol: 0.5 });
    st.look(560, { instant: true });
    st.pose('minh', 'e110_up'); st.pose('lan', 'e110_up'); st.mood('minh', 'happy');
    await st.wait(600);
    st.set('st-two'); st.sfx('ding', { vol: 0.4 }); st.sfx('ding', { vol: 0.4, rate: 1.25 });
    await st.wait(400);
    st.set('st-lb-later', false); st.set('st-lb-said');
    st.pose('minh', 'stand'); st.mood('minh', 'joy');
    await st.say('minh', 'Bip is the best friend I have ever had!', 2800);
  } },
];

export default {
  id: 'en110', worldW: W, floor: FLOOR, viewTop: 40, camStart: 640, css: KIT_CSS + BIP_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 1, 3, 5, 6, 9],
  cast: [
    { id: 'hoa', kind: 'adult', who: 'e110_hoa', x: 1300, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: 1340, face: -1 },
    { id: 'grandma', kind: 'adult', who: 'en_grandma', x: X.door, y: FLOOR - 10, s: 0.95 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: X.door, y: FLOOR - 10, s: 0.95 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: X.door, y: FLOOR - 10, s: 0.95 },
    { id: 'ship', kind: 'thing', svg: SHIP110, box: SHIP_BOX, x: X.ship, s: 1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.door, s: 1.05 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.door },
    { id: 'lucky', kind: 'dog', x: X.door, y: FLOOR + 8, s: 0.95 },
    { id: 'bip', kind: 'thing', svg: BIP_SVG, box: BIP_BOX, x: X.ship + 96, face: -1 },
  ],
  init(st) {
    bipSet(st, 'ship', 'ship-fixed'); bipSet(st, 'ship', 'e108-done');
    for (const id of ['grandma', 'mum', 'dad', 'lan', 'minh', 'lucky']) st.show(id, false);
  },
};
