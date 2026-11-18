/**
 * Bài 127 "The Sword and the Golden Turtle" (bị động hiện tại / quá khứ đơn giản; which): Lê Lợi, khởi nghĩa Lam Sơn,
 * sự tích hồ Hoàn Kiếm. Một thế giới đi từ trái sang phải theo thời gian:
 * làng quê dưới ách quân Minh (cờ xám, lính Minh canh, dân gánh nặng) → núi rừng Lam Sơn (Lê Lợi dựng cờ đỏ năm 1418,
 * nghĩa quân kéo tới, mười vạch năm) → trại trong rừng (nồi cơm rỗng, chia nắm cơm, đứng dậy cầm giáo) → thành Thăng Long
 * (cờ xám đổ năm 1427, cờ đỏ lên, Lê Lợi mặc áo vàng lên ngôi năm 1428) → hồ ở Thăng Long.
 * Truyền thuyết (gươm thần, rùa vàng đòi gươm) có nhãn "An old story" và cảnh nhuộm màu ảnh cũ; "Today" hồ có màu lại,
 * hiện Tháp Rùa, cầu Thê Húc đỏ và du khách (Minh, Lan, ông…). Không cảnh đánh nhau: thắng = cờ giặc đổ, cờ đỏ lên.
 * Toạ độ cảnh: rộng 2800, cao 315, sàn y = 282; hồ x 2050..2800, mặt nước (mạn thuyền) y = 262.
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, cloud, label, tree, sun } from '../kit.js';
import { HAT, wear, robe, redress, fig, ARMOR, skyG, hills, ground, bamboo, hut, palace, flag, tent, dragonBoat, turtle, SWORD, PROPS, vsCss, lb, lbCss, off, mark, NUN } from './vietsuKit.js';

const P = 'e127';
const FLOOR = 282, WL = 262; // mặt hồ
const W = 2800;
const X = { vil: 260, lam: 760, camp: 1290, city: 1760, lake: 2050, tower: 2560 };

Object.assign(CAST, {
  e127_loi: { adult: true, hair: 'short', top: 'robe', shirt: '#9A3412', trimC: '#FACC15', shoe: '#1C1917', beard: true, moustache: true },
  e127_king: { adult: true, hair: 'short', top: 'robe', shirt: '#FACC15', trimC: '#DC2626', shoe: '#1C1917', beard: true, moustache: true },
  e127_sol1: { adult: true, hair: 'short', top: 'tee', shirt: '#A16207', bottom: 'pants', bottomC: '#44403C', shoe: '#57534E' },
  e127_sol2: { adult: true, hair: 'short', top: 'tee', shirt: '#4D7C0F', bottom: 'pants', bottomC: '#1F2937', shoe: '#57534E', moustache: true },
  e127_ming: { adult: true, hair: 'short', top: 'tee', shirt: '#6B7280', bottom: 'pants', bottomC: '#374151', shoe: '#1F2937' },
  e127_farmer: { adult: true, hair: 'short', top: 'tee', shirt: '#A8A29E', bottom: 'pants', bottomC: '#57534E', shoe: '#78716C' },
  e127_rower: { adult: true, hair: 'short', top: 'tee', shirt: '#B91C1C', bottom: 'pants', bottomC: '#1F2937', shoe: '#1F2937' },
  e127_tour1: { adult: true, hair: 'ponytail', top: 'blouse', shirt: '#38BDF8', bottom: 'pants', bottomC: '#334155', shoe: '#F5F5F4' },
  e127_tour2: { adult: true, hair: 'short', top: 'tee', shirt: '#FB7185', bottom: 'pants', bottomC: '#1E3A8A', shoe: '#1F2937' },
});

const POSES = {
  e127_spear: { R: [22, 6], L: [10, 4] },
  e127_carry: { R: [54, 150], L: [10, 4], head: 8 },
  e127_flag: { R: [150, 168], L: [40, 60] },
  e127_swordUp: { R: [160, 178], L: [10, 4], head: -4 },
  e127_eat: { R: [118, 248], L: [40, 110], dy: 20 },
  e127_sitSad: { R: [24, -40], L: [24, -40], dy: 20, head: 10 },
};
const PR = {
  ...PROPS,
  e127_snap: `<g transform="translate(0 -5)"><rect x="-6" y="-9" width="12" height="18" rx="2" fill="#1F2937" stroke="${L}" stroke-width="0.6"/><rect x="-4.6" y="-7" width="9.2" height="13" rx="1" fill="#7DD3FC"/></g>`,
  e127_rice: `<g transform="translate(0 -5)"><path d="M-6 3 Q-7 -6 0 -7 Q7 -6 6 3Z" fill="#fff" stroke="${L}" stroke-width="0.8"/></g>`,
};

// ── Hình nhỏ ──────────────────────────────────────────────────────────────────────────────
const greyFlag = (x, y, h, cls = '', d = 0) => `<g class="${cls}" style="transition-delay:${d}s;transform-origin:${x}px ${y}px">${flag(P, x, y, { h, w: 32, hh: 22, c: '#6B7280' })}</g>`;
const redFlag = (x, y, h, cls = '', d = 0, txt = '') => `<g class="${cls}" style="transition-delay:${d}s;transform-origin:${x}px ${y}px">${flag(P, x, y, { h, w: 40, hh: 28, c: '#DC2626', txt })}</g>`;
/** Gánh lúa nặng (đồ trên vai người dân). */
const LOAD = `<g transform="translate(0 -4)"><path d="M-40 -2 Q0 -8 40 -2" stroke="#7C4A1E" stroke-width="3" fill="none"/>${[-36, 36].map((x) => `<path d="M${x} -2 V12" stroke="${L}" stroke-width="0.8"/><path d="M${x - 10} 12 H${x + 10} L${x + 7} 28 H${x - 7}Z" fill="#CA8A04" stroke="${L}" stroke-width="0.9"/><ellipse cx="${x}" cy="12" rx="10" ry="3" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/>`).join('')}</g>`;
/** Tháp Rùa trên gò giữa hồ (hiện khi Today). */
const TOWER = `<g transform="translate(${X.tower} ${WL - 32})"><ellipse cx="0" cy="6" rx="62" ry="12" fill="#86EFAC" stroke="${L}"/>${tree(-46, 4, 0.36, '')}${tree(44, 4, 0.32, '')}
  <rect x="-22" y="-36" width="44" height="40" fill="#FEF3C7" stroke="${L}"/><path d="M-14 4 V-14 Q-14 -24 -6 -24 Q2 -24 2 -14 V4" fill="#E7E5E4" stroke="${L}" stroke-width="0.8"/>
  <path d="M-28 -36 H28 L22 -42 H-22Z" fill="#B45309" stroke="${L}"/><rect x="-16" y="-62" width="32" height="20" fill="#FEF3C7" stroke="${L}"/><circle cy="-52" r="5" fill="#E7E5E4" stroke="${L}" stroke-width="0.7"/>
  <path d="M-22 -62 H22 L16 -68 H-16Z" fill="#B45309" stroke="${L}"/><rect x="-10" y="-82" width="20" height="14" fill="#FEF3C7" stroke="${L}"/><path d="M-14 -82 H14 L0 -96Z" fill="#B45309" stroke="${L}"/></g>`;
const BRIDGE = `<g transform="translate(2200 0)"><path d="M-130 ${WL - 18} Q0 ${WL - 70} 130 ${WL - 18}" stroke="#B91C1C" stroke-width="8" fill="none"/>
  <path d="M-130 ${WL - 30} Q0 ${WL - 82} 130 ${WL - 30}" stroke="#DC2626" stroke-width="3" fill="none"/>
  ${Array.from({ length: 13 }, (_, i) => { const t = i / 12, x = -130 + 260 * t, y = WL - 18 - Math.sin(Math.PI * t) * 52 / 1; return `<path d="M${x.toFixed(1)} ${(y).toFixed(1)} V${(y - 12).toFixed(1)}" stroke="#DC2626" stroke-width="2.4"/><path d="M${x.toFixed(1)} ${y.toFixed(1)} V${WL}" stroke="#7F1D1D" stroke-width="2"/>`; }).join('')}
  <ellipse cx="160" cy="${WL - 8}" rx="58" ry="10" fill="#86EFAC" stroke="${L}"/><g transform="translate(160 ${WL - 12})"><rect x="-26" y="-42" width="52" height="42" fill="#FEF3C7" stroke="${L}"/><path d="M-36 -40 Q-40 -46 -44 -50 L-26 -60 H26 L44 -50 Q40 -46 36 -40Z" fill="#B45309" stroke="${L}"/><rect x="-8" y="-26" width="16" height="26" fill="#B91C1C" stroke="${L}" stroke-width="0.8"/></g></g>`;

function bg() {
  return `
  ${skyG(0, W, `${P}sky`, '#7DD3FC', '#FEF9C3')}
  <g transform="translate(980 64)">${sun(20)}</g>
  ${cloud(140, 56, 0.8, 0)}${cloud(620, 44, 0.7, 2)}${cloud(1240, 60, 0.9, 4)}${cloud(1900, 48, 0.8, 1)}${cloud(2450, 58, 0.9, 3)}
  <!-- xa: núi -->
  ${hills(-20, 560, 250, '#A7D7B0', 50)}
  ${hills(520, 760, 250, '#4D9A62', 150)}${hills(560, 700, 256, '#6BB27E', 90)}
  ${hills(1280, 820, 250, '#A7D7B0', 60)}
  <rect x="0" y="246" width="${W}" height="${FLOOR - 246}" fill="#A3D977"/>
  <!-- làng dưới ách quân Minh -->
  ${hut(120, FLOOR - 6, 110)}${hut(410, FLOOR - 10, 96, 0.9)}${bamboo(30, FLOOR - 4, 0.8)}${bamboo(500, FLOOR - 6, 0.7)}
  <g class="${P}-mingv">${greyFlag(200, FLOOR - 20, 110)}${greyFlag(340, FLOOR - 14, 96)}</g>
  <!-- Lam Sơn: rừng núi, cột cờ khởi nghĩa -->
  ${tree(600, FLOOR - 10, 1.1, '')}${tree(920, FLOOR - 8, 1.2, '')}${tree(1010, FLOOR - 14, 0.9, '')}${bamboo(660, FLOOR - 8, 1)}
  <g class="${P}-rise">${`<g>${flag(P, X.lam + 70, FLOOR - 4, { h: 150, w: 62, hh: 30, c: '#DC2626', txt: 'LAM SƠN', fs: 10 })}</g>`}</g>
  <!-- trại trong rừng -->
  ${tent(X.camp - 130, FLOOR - 8, '#D6B98A', 1.1)}${tent(X.camp + 150, FLOOR - 10, '#CBB28A', 0.95)}${tree(X.camp + 230, FLOOR - 10, 1, '')}
  <g transform="translate(${X.camp} ${FLOOR - 2})"><path d="M-14 0 L14 0 M-10 -2 L10 -12 M10 -2 L-10 -12" stroke="#7C4A1E" stroke-width="3.4" stroke-linecap="round"/>
    <g class="${P}-fire"><path d="M-8 -6 Q-10 -20 0 -30 Q4 -20 8 -24 Q12 -12 8 -6Z" fill="#F97316" stroke="${L}" stroke-width="0.8"/><path d="M-3 -6 Q-4 -14 1 -20 Q4 -12 4 -6Z" fill="#FDE047"/></g>
    <path d="M-22 -52 L0 -40 L22 -52" stroke="${L}" stroke-width="1.4" fill="none"/><path d="M-12 -36 H12 Q12 -22 0 -20 Q-12 -22 -12 -36Z" fill="#44403C" stroke="${L}"/></g>
  <!-- thành Thăng Long -->
  ${palace(X.city + 40, FLOOR - 2, 250, { plaque: 'THĂNG LONG' })}
  <g class="${P}-mingc">${[X.city - 120, X.city - 50, X.city + 130, X.city + 200].map((x, i) => greyFlag(x, FLOOR - 4, 120, `${P}-gf`, 0.2 + i * 0.25)).join('')}</g>
  <g class="${P}-redc">${[X.city - 120, X.city - 50, X.city + 130, X.city + 200].map((x, i) => redFlag(x, FLOOR - 4, 130, `${P}-rf`, 0.9 + i * 0.2)).join('')}</g>
  <!-- hồ ở Thăng Long -->
  ${hills(X.lake, W - X.lake, 214, '#A7D7B0', 40)}
  <rect x="${X.lake}" y="206" width="${W - X.lake}" height="14" fill="#86C49A"/>
  ${tree(X.lake + 380, 216, 0.55, '')}${tree(X.lake + 640, 216, 0.6, '')}
  <rect x="${X.lake}" y="214" width="${W - X.lake}" height="80" fill="#4FA8D8" stroke="${L}"/>
  <g class="ek-wave">${Array.from({ length: 16 }, (_, i) => `<path d="M${X.lake + 20 + i * 46} ${226 + (i % 3) * 12} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <g class="${P}-today">${TOWER}${BRIDGE}</g>
  <!-- màu ảnh cũ (truyền thuyết) -->
  <rect class="${P}-tint" x="${X.city - 320}" y="0" width="${W - X.city + 320}" height="315" fill="#B45309"/>`;
}

function fg() {
  return `
  <!-- mặt hồ phía trước + bờ gần (che thân thuyền, rùa lặn) -->
  <rect x="${X.lake}" y="${WL}" width="${W - X.lake}" height="${FLOOR - WL}" fill="#4FA8D8"/>
  <path d="M${X.lake} ${WL} H${W}" stroke="#E0F2FE" stroke-width="2" stroke-dasharray="14 10"/>
  ${ground(X.lake - 60, W - X.lake + 60, FLOOR, '#A3D977', '#7FB85A')}
  ${ground(0, X.lake - 60, FLOOR, '#C9B27C', '#A8915E')}
  <rect class="${P}-tint" x="${X.city - 320}" y="${WL}" width="${W - X.city + 320}" height="${315 - WL}" fill="#B45309"/>
  ${lb(P, 'ago', label(X.vil + 110, 74, '600 years ago', '#7C4A1E', 17))}
  ${lb(P, 'ming', label(X.vil - 100, 72, 'the Ming army', '#475569', 14))}
  ${lb(P, 'y1418', label(X.lam - 60, 74, 'In 1418', '#B91C1C', 17))}
  ${lb(P, 'ten', `<g transform="translate(${X.lam + 120} 74)">${label(0, 0, 'almost 10 years', '#B45309', 14)}
    ${Array.from({ length: 10 }, (_, i) => `<path class="${P}-tally" style="transition-delay:${0.3 + i * 0.18}s" d="M${-54 + i * 12} 14 v18" stroke="#B91C1C" stroke-width="3.4" stroke-linecap="round"/>`).join('')}</g>`)}
  ${lb(P, 'hungry', label(X.camp, 92, 'hungry', '#78716C', 16))}
  ${lb(P, 'never', label(X.camp, 92, 'never gave up!', '#B91C1C', 16))}
  ${lb(P, 'y1427', label(X.city - 110, 72, '1427', '#475569', 16))}
  ${lb(P, 'y1428', label(X.city + 140, 72, '1428: King', '#B91C1C', 16))}
  ${lb(P, 'story', label(X.city + 40, 64, 'An old story', '#7C4A1E', 16))}
  ${lb(P, 'story2', label(X.lake + 420, 64, 'An old story', '#7C4A1E', 16))}
  ${lb(P, 'magic', label(X.city + 140, 112, 'magic sword', '#B45309', 14))}
  ${lb(P, 'lake', label(X.lake + 130, 104, 'a lake in Thang Long', '#0369A1', 14))}
  ${lb(P, 'gold', label(X.lake + 620, 120, 'golden turtle', '#B45309', 14))}
  ${lb(P, 'today', label(X.lake + 150, 64, 'Today', '#16A34A', 18))}
  ${lb(P, 'hk', `<g transform="translate(${X.lake + 420} 72)">${label(0, 0, 'Ho Hoan Kiem', '#B91C1C', 18)}${label(0, 34, 'Lake of the Returned Sword', '#0369A1', 13)}</g>`)}`;
}

const CSS = `
${lbCss(P, ['ago', 'ming', 'y1418', 'ten', 'hungry', 'never', 'y1427', 'y1428', 'story', 'story2', 'magic', 'lake', 'gold', 'today', 'hk'])}
.${P}-tally { opacity: 0; transition: opacity .2s; }
.st-lb-ten .${P}-tally { opacity: 1; }
.${P}-rise { transform: translateY(160px); opacity: 0; transition: transform 1.4s cubic-bezier(.3,.9,.4,1), opacity .2s; }
.st-rise .${P}-rise { transform: none; opacity: 1; }
.${P}-fire { transform-box: fill-box; transform-origin: 50% 100%; animation: ${P}Fire .5s ease-in-out infinite alternate; }
@keyframes ${P}Fire { to { transform: scale(.85, 1.12); } }
.${P}-gf { transition: transform .7s ease-in, opacity .7s; }
.st-win .${P}-gf { transform: rotate(80deg); opacity: 0; }
.${P}-rf { transform: translateY(140px); opacity: 0; transition: transform .9s cubic-bezier(.3,.9,.4,1), opacity .2s; }
.st-win .${P}-rf { transform: none; opacity: 1; }
.${P}-today { opacity: 0; transition: opacity .9s; }
.st-today .${P}-today { opacity: 1; }
.st-past .${P}-tint { opacity: .2; }
.${P}-bsw { opacity: 1; transition: opacity .2s; }
.${P}-nosw .${P}-bsw { opacity: 0; }
.${P}-tsw { opacity: 0; }
.${P}-hassw .${P}-tsw { opacity: 1; }
.es-thing.act-${P}nod .${P}-thead { animation: ${P}Nod .4s ease-in-out infinite alternate; }
@keyframes ${P}Nod { to { transform: rotate(-12deg); } }
.es-thing.is-walk .${P}-oar { animation: ${P}Oar .9s ease-in-out infinite alternate; }
@keyframes ${P}Oar { from { transform: rotate(-18deg); } to { transform: rotate(18deg); } }
.es-ac[data-id="${P}t"] { transition: opacity .9s; }
@media (prefers-reduced-motion: reduce) { .${P}-fire, .es-thing.is-walk .${P}-oar { animation-duration: 1.4s; } }
`;

/** Thuyền rồng của vua trên hồ: vua (tay cầm gươm) và hai người chèo vẽ sẵn. */
const oar = (x) => `<g class="${P}-oar" style="transform-origin:${x}px -40px"><path d="M${x} -40 L${x - 16} 10" stroke="#7C4A1E" stroke-width="2.6"/><path d="M${x - 16} 10 l-4 10 l6 0Z" fill="#7C4A1E"/></g>`;
const BOAT = dragonBoat(`
  ${fig(-120, -14, 'e127_rower', { pose: 'stand', s: 0.78, hat: HAT.band })}${oar(-112)}
  ${fig(110, -14, 'e127_rower', { pose: 'stand', s: 0.78, hat: HAT.band })}${oar(118)}
  <g transform="translate(-30 -116)"><path d="M0 0 V100" stroke="#7C4A1E" stroke-width="3"/><path d="M-38 6 Q0 -26 38 6 Q19 2 0 6 Q-19 2 -38 6Z" fill="#FACC15" stroke="${L}" stroke-width="1"/></g>
  ${fig(-6, -16, 'e127_king', { pose: 'stand', s: 0.86, hat: HAT.king })}
  <g class="${P}-bsw"><g transform="translate(14 -82) rotate(-60) scale(0.9)">${SWORD(true)}</g></g>`, { roof: false });
const TURTLE = `<g>${turtle(P)}<g class="${P}-tsw"><g transform="translate(92 -30) rotate(10) scale(0.8)">${SWORD(true)}</g></g></g>`;

const tell = async (st, id, ms) => { st.talk(id, true); await st.wait(ms); st.talk(id, false); };
const SOL = ['s1', 's2'];
const TOUR = ['minh', 'lan', 'grandpa', 't1', 't2'];

const BEATS = [
  { key: ['About six hundred years ago', 'ruled by the Ming army'], icon: '🏚️', label: 'ruled by the Ming', async play(st) {
    st.look(X.vil + 20, { instant: true });
    st.set('st-lb-ago'); st.sfx('wind', { vol: 0.4 });
    await st.wait(600);
    st.set('st-lb-ming');
    st.pose('ming1', 'point'); st.mood('ming1', 'happy'); st.sfx('buzz-no', { vol: 0.35 });
    st.mood('farmer', 'sad');
    await st.walk('farmer', X.vil - 40, { speed: 50, follow: false, after: 'e127_carry' });
    st.pose('farmer', 'e127_carry');
    await st.wait(1200);
    st.pose('ming1', 'stand');
  } },
  { key: ['In 1418', 'the Lam Son uprising', 'almost ten years'], icon: '🚩', label: 'Lam Son uprising', async play(st) {
    off(st, 'st-lb-ago', 'st-lb-ming');
    st.look(X.lam + 30);
    await st.walk('loi', X.lam + 40, { speed: 120, follow: false });
    st.set('st-lb-y1418'); st.sfx('ding', { vol: 0.5 });
    st.pose('loi', 'raise'); st.set('st-rise'); st.sfx('whoosh', { vol: 0.5 });
    await st.wait(900);
    st.sfx('lion-drum', { vol: 0.6 });
    await Promise.all(SOL.map((id, i) => st.walk(id, X.lam - 60 + i * 52, { speed: 160, follow: false })));
    SOL.forEach((id) => st.face(id, 1));
    st.pose('s1', 'cheer'); st.pose('s2', 'cheer'); st.sfx('cheer', { vol: 0.4 });
    st.set('st-lb-ten');
    for (let i = 0; i < 10; i++) { await st.wait(180); st.sfx('tick', { vol: 0.3 }); }
    await st.wait(500);
    SOL.forEach((id) => st.pose(id, 'e127_spear')); st.pose('loi', 'stand');
  } },
  { key: ['often hungry', 'never gave up'], icon: '🍚', label: 'never gave up', async play(st) {
    off(st, 'st-lb-y1418', 'st-lb-ten');
    st.look(X.camp);
    await Promise.all([
      st.walk('loi', X.camp + 70, { speed: 140, follow: false }),
      st.walk('s1', X.camp - 80, { speed: 140, follow: false }),
      st.walk('s2', X.camp - 30, { speed: 140, follow: false }),
    ]);
    st.face('loi', -1);
    SOL.forEach((id) => { st.pose(id, 'e127_sitSad'); st.mood(id, 'sad'); });
    st.set('st-lb-hungry'); st.sfx('gulp', { vol: 0.5 });
    await st.wait(1100);
    st.hold('loi', 'e127_rice'); st.pose('loi', 'give'); st.sfx('pop', { vol: 0.4 });
    await st.wait(600);
    st.set('st-lb-hungry', false); st.set('st-lb-never');
    st.hold('loi', null); st.pose('loi', 'raise');
    SOL.forEach((id) => { st.pose(id, 'e127_spear'); st.mood(id, 'joy'); });
    st.sfx('cheer', { vol: 0.5 });
    await st.wait(1300);
    st.pose('loi', 'stand');
  } },
  { key: ['the Ming army was defeated', 'Le Loi became king'], icon: '👑', label: 'became king', async play(st) {
    off(st, 'st-lb-hungry', 'st-lb-never');
    st.look(X.city + 40);
    await Promise.all([
      st.walk('loi', X.city - 60, { speed: 150, follow: false }),
      st.walk('s1', X.city - 230, { speed: 150, follow: false }),
      st.walk('s2', X.city - 180, { speed: 150, follow: false }),
    ]);
    st.face('loi', 1);
    st.set('st-lb-y1427'); st.set('st-win'); st.sfx('lion-drum', { vol: 0.6 });
    await st.wait(1500);
    st.sfx('cheer', { vol: 0.5 });
    SOL.forEach((id) => st.pose(id, 'cheer'));
    await st.walk('loi', X.city + 40, { speed: 90, follow: false });
    st.face('loi', 1);
    st.chest('loi', null); st.fx('poof', X.city + 40, 200, { quiet: true }); st.sfx('sparkle', { vol: 0.4 });
    redress(st, 'loi', 'e127_king', HAT.king, true);
    st.set('st-lb-y1428'); st.sfx('ding', { vol: 0.5 });
    st.pose('loi', 'open'); st.mood('loi', 'joy');
    await st.wait(1200);
    SOL.forEach((id) => st.pose(id, 'e127_spear'));
  } },
  { key: ['An old story says', 'a magic sword'], icon: '🗡️', label: 'a magic sword', async play(st) {
    off(st, 'st-lb-y1427', 'st-lb-y1428');
    st.look(X.city + 40);
    st.set('st-past'); st.set('st-lb-story'); st.sfx('page-turn', { vol: 0.6 });
    st.pose('loi', 'raise'); st.mood('loi', 'wow');
    await st.wait(600);
    st.sfx('whoosh', { vol: 0.5 });
    await st.fly(SWORD(true), [X.city + 160, 60], [X.city + 58, 116], { size: 70, dur: 1000 });
    st.hold('loi', 'vs_sword'); st.pose('loi', 'e127_swordUp'); st.mood('loi', 'joy');
    st.fx('sparkle', X.city + 50, 70);
    st.set('st-lb-magic');
    await st.wait(1600);
  } },
  { key: ['sailing on a lake in Thang Long', 'a golden turtle came up'], icon: '🐢', label: 'a golden turtle', async play(st) {
    off(st, 'st-lb-story', 'st-lb-magic');
    st.show('loi', false); st.hold('loi', null); st.show('boat', true);
    st.set('st-lb-story2'); st.set('st-lb-lake');
    st.look(X.lake + 260);
    st.sfx('river', { vol: 0.4 });
    await st.loop('river', () => st.walk('boat', X.lake + 300, { speed: 70, follow: false }), { vol: 0.5 });
    st.set('st-lb-lake', false);
    st.show(`${P}t`, true); st.sfx('splash', { vol: 0.7 });
    st.fx('drops', X.lake + 590, WL - 10);
    await st.walk(`${P}t`, X.lake + 590, { y: WL + 6, speed: 40, follow: false });
    st.set('st-lb-gold'); st.sfx('sparkle', { vol: 0.35 });
    await st.wait(1200);
  } },
  { key: ['asked for the sword back'], icon: '🙏', label: 'the sword back', async play(st) {
    st.set('st-lb-gold', false);
    st.look(X.lake + 440);
    st.act(`${P}t`, `${P}nod`);
    await st.say(`${P}t`, 'Please give back the sword.', 2600);
    st.act(`${P}t`, null);
  } },
  { key: ['The king returned it', 'disappeared into the water'], icon: '🌊', label: 'returned it', async play(st) {
    st.look(X.lake + 440);
    mark(st, 'boat', `${P}-nosw`); st.sfx('whoosh', { vol: 0.5 });
    await st.fly(SWORD(true), [X.lake + 315, 175], [X.lake + 700, 226], { size: 70, dur: 900 });
    mark(st, `${P}t`, `${P}-hassw`); st.sfx('sparkle', { vol: 0.4 });
    await st.wait(700);
    st.sfx('splash', { vol: 0.8 }); st.fx('ring', X.lake + 600, WL);
    st.show(`${P}t`, false);
    await st.walk(`${P}t`, X.lake + 600, { y: WL + 50, speed: 50, follow: false });
    st.fx('drops', X.lake + 600, WL - 6);
    await st.wait(900);
  } },
  { key: ['Ho Hoan Kiem', 'Lake of the Returned Sword'], icon: '🏯', label: 'Ho Hoan Kiem', async play(st) {
    off(st, 'st-lb-story2', 'st-past');
    st.show('boat', false);
    st.set('st-lb-today'); st.sfx('ding', { vol: 0.4 });
    st.look(X.lake + 420);
    st.set('st-today'); st.sfx('birds', { vol: 0.5 });
    await st.wait(1000);
    st.set('st-lb-today', false); st.set('st-lb-hk'); st.sfx('pop', { vol: 0.5 });
    await st.wait(2400);
  } },
  { key: ['visited by many people every day'], icon: '📸', label: 'many people', async play(st) {
    st.set('st-lb-hk', false);
    TOUR.forEach((id) => st.show(id, true));
    st.look(X.lake + 330);
    st.sfx('giggle', { vol: 0.3 });
    await Promise.all(TOUR.map((id, i) => st.walk(id, X.lake + 140 + i * 92, { speed: 120 + i * 6, follow: false })));
    st.hold('lan', 'e127_snap'); st.pose('lan', 'e127_swordUp'); st.mood('lan', 'joy');
    st.pose('grandpa', 'point'); st.pose('minh', 'wave'); st.act('minh', 'wave'); st.mood('minh', 'joy');
    st.pose('t1', 'point'); st.mood('t2', 'wow');
    await st.wait(400);
    st.sfx('camera', { vol: 0.7 });
    await st.wait(1400);
    st.act('minh', null); st.pose('minh', 'stand'); st.hold('lan', null); st.pose('lan', 'stand');
  } },
];

export default {
  id: P, worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + vsCss(P) + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PR,
  order: [0, 1, 3, 5, 7, 8],
  cast: [
    { id: 'boat', kind: 'thing', svg: BOAT, box: [-200, -150, 410, 165], x: X.lake + 40, y: WL },
    { id: `${P}t`, kind: 'thing', svg: TURTLE, box: [-62, -66, 160, 70], x: X.lake + 590, y: WL + 50, s: 1.15 },
    { id: 'farmer', kind: 'adult', who: 'e127_farmer', x: X.vil + 90, face: -1 },
    { id: 'ming1', kind: 'adult', who: 'e127_ming', x: X.vil - 150 },
    { id: 's1', kind: 'adult', who: 'e127_sol1', x: X.lam + 330, s: 0.96, face: -1 },
    { id: 's2', kind: 'adult', who: 'e127_sol2', x: X.lam + 390, s: 0.96, face: -1 },
    { id: 'loi', kind: 'adult', who: 'e127_loi', x: X.lam - 70 },
    ...TOUR.map((id, i) => ({ id, kind: i < 2 ? 'kid' : 'adult', who: ['en_minh_home', 'en_lan_home', 'en_grandpa', 'e127_tour1', 'e127_tour2'][i], x: X.lake - 200 - i * 70, s: i === 1 ? 1.08 : 1 })),
  ],
  init(st) {
    st.show('boat', false);
    wear(st, 'loi', HAT.general); robe(st, 'loi'); st.chest('loi', ARMOR('#B45309'));
    wear(st, 'ming1', HAT.enemy); st.hold('ming1', 'vs_spear'); st.pose('ming1', 'e127_spear');
    for (const id of SOL) { wear(st, id, HAT.band); st.hold(id, 'vs_spear'); st.pose(id, 'e127_spear'); }
    st.mood('farmer', 'sad'); wear(st, 'farmer', HAT.khan);
    st.chest('farmer', `<g transform="translate(0 -22)">${LOAD}</g>`);
    st.show(`${P}t`, false);
    TOUR.forEach((id) => st.show(id, false));
  },
};
