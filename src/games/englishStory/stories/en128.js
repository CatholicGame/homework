/**
 * Bài 128 "Kindness After Victory" (although; câu tường thuật): Nguyễn Trãi, người cấp thuyền, ngựa, lương thực cho quân
 * Minh về nước (1427), viết Bình Ngô đại cáo (1428). Một thế giới đi từ trái sang phải:
 * thư phòng bên ao sen (ông ngồi viết thơ bằng bút lông) → thành Đông Quan của quân Minh (quan Minh mời, ông lắc đầu;
 * đêm xuống, lính gác ngủ gật, ông lặng lẽ ra cổng) → trại Lam Sơn (gặp Lê Lợi, bàn mưu bên tấm bản đồ, viết thư)
 * → trại quân Minh (tướng Minh đọc thư; năm 1427 cờ xám đổ; quân ta đòi phạt, Lê Lợi và Nguyễn Trãi chọn lòng nhân hậu)
 * → bến sông (thuyền, ngựa, bao gạo cho lính Minh về nước, họ vẫy chào) → điện (năm 1428 cuộn Bình Ngô đại cáo mở ra:
 * núi sông, phong tục, vua) → lớp học hôm nay (cô Hoa chỉ bảng, Minh, Lan đọc sách). Không cảnh đánh nhau.
 * Toạ độ cảnh: rộng 3400, cao 315, sàn y = 282.
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, cloud, label, tree, sun, night, room, windowBox, desk } from '../kit.js';
import { HAT, wear, robe, fig, ARMOR, skyG, hills, ground, bamboo, palace, cityGate, flag, tent, horse, PROPS, vsCss, lb, lbCss, off, mark, NUN, SEP } from './vietsuKit.js';

const P = 'e128';
const FLOOR = 282, WL = 268;
const W = 3400;
const X = { study: 250, gate: 800, camp: 1320, ming: 1800, dock: 2240, hall: 2700, cls: 3000 };

Object.assign(CAST, {
  e128_trai: { adult: true, hair: 'short', top: 'robe', shirt: '#1E3A8A', trimC: '#FDE68A', shoe: '#1C1917', beard: true, moustache: true },
  e128_loi: { adult: true, hair: 'short', top: 'robe', shirt: '#9A3412', trimC: '#FACC15', shoe: '#1C1917', beard: true, moustache: true },
  e128_mingOff: { adult: true, hair: 'short', top: 'robe', shirt: '#6B7280', trimC: '#374151', shoe: '#1F2937', moustache: true },
  e128_mingGen: { adult: true, hair: 'short', top: 'robe', shirt: '#475569', trimC: '#9CA3AF', shoe: '#1F2937', beard: true },
  e128_mingSol: { adult: true, hair: 'short', top: 'tee', shirt: '#6B7280', bottom: 'pants', bottomC: '#374151', shoe: '#1F2937' },
  e128_sol1: { adult: true, hair: 'short', top: 'tee', shirt: '#A16207', bottom: 'pants', bottomC: '#44403C', shoe: '#57534E' },
  e128_sol2: { adult: true, hair: 'short', top: 'tee', shirt: '#4D7C0F', bottom: 'pants', bottomC: '#1F2937', shoe: '#57534E', moustache: true },
  e128_hoa: { ...CAST.en_hoa },
});

const POSES = {
  e128_write: { R: [40, -60], L: [30, -70], dy: 34, head: 8 },
  e128_sit: { R: [24, -70], L: [24, -70], dy: 34 },
  e128_spear: { R: [22, 6], L: [10, 4] },
  e128_fist: { R: [150, 200], L: [10, 4] },
  e128_stop: { R: [90, 170], L: [10, 4] },
  e128_bow: { R: [30, -110], L: [30, -110], head: 14 },
  e128_read: { R: [40, -120], L: [40, -120], head: 8 },
  e128_tip: { R: [20, -40], L: [20, -40], head: 6 },
};
const PR = {
  ...PROPS,
  e128_seal: `<g transform="translate(0 -6)"><rect x="-8" y="-6" width="16" height="12" rx="2" fill="#FACC15" stroke="${L}" stroke-width="0.8"/><path d="M-4 -6 Q0 -14 4 -6" fill="#EAB308" stroke="${L}" stroke-width="0.7"/></g>`,
};

// ── Hình ─────────────────────────────────────────────────────────────────────────────────
const greyFlag = (x, y, h, cls = '', d = 0) => `<g class="${cls}" style="transition-delay:${d}s;transform-origin:${x}px ${y}px">${flag(P, x, y, { h, w: 32, hh: 22, c: '#6B7280' })}</g>`;
/** Thuyền của lính Minh về nước (gốc = giữa đáy ở mặt nước): buồm nâu, người vẽ sẵn hiện khi .e128-full. */
const mingFig = (x, s, flip) => fig(x, -18, 'e128_mingSol', { pose: 'wave', s, flip, hat: HAT_ENEMY });
const HAT_ENEMY = HAT.enemy;
const BOAT = `<g><path d="M0 -24 V-150" stroke="#7C4A1E" stroke-width="3.4"/><path d="M4 -146 Q50 -100 4 -40Z" fill="#D6B98A" stroke="${L}" stroke-width="1"/><path d="M4 -120 H30 M4 -90 H34 M4 -64 H26" stroke="#A8915E" stroke-width="1"/>
  <g class="${P}-pass">${mingFig(-70, 0.72, false)}${mingFig(-30, 0.72, true)}${mingFig(60, 0.72, false)}
    ${[-110, 90].map((x) => `<g transform="translate(${x} -30)"><path d="M-10 6 Q-12 -8 0 -10 Q12 -8 10 6Z" fill="#E7D3A8" stroke="${L}" stroke-width="0.8"/><path d="M-6 -6 Q0 -2 6 -6" stroke="${L}" stroke-width="0.8" fill="none"/></g>`).join('')}</g>
  <path d="M-130 -24 L-118 -20 H118 L130 -24 Q124 2 100 8 H-100 Q-124 2 -130 -24Z" fill="#92400E" stroke="${L}" stroke-width="1.3"/>
  <path d="M-122 -12 H122" stroke="#78350F" stroke-width="1.2"/></g>`;
const RIDER = fig(-8, -76, 'e128_mingSol', { pose: 'sit', s: 0.9, hat: HAT.enemy });
const HORSE = horse(P, { c: '#E7E5E4', mane: '#78716C', rider: RIDER });
const SACK = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-10 0 Q-13 -16 -6 -20 L6 -20 Q13 -16 10 0Z" fill="#E7D3A8" stroke="${L}" stroke-width="0.9"/><path d="M-6 -20 Q0 -15 6 -20" stroke="${L}" stroke-width="1" fill="none"/></g>`;
/** Cuộn Bình Ngô đại cáo (mở ra bằng .st-scroll) với ba hình: núi sông, phong tục, vua (hiện lần lượt). */
const SCROLL = `<g transform="translate(${X.hall + 70} 0)">
  <g class="${P}-scroll"><rect x="-120" y="60" width="240" height="150" fill="#FEF3C7" stroke="${L}" stroke-width="1.2"/>
    <text x="0" y="86" text-anchor="middle" ${NUN} font-size="15" fill="#7F1D1D">BÌNH NGÔ ĐẠI CÁO</text>
    ${[100, 112, 124].map((y) => `<path d="M-96 ${y} H96" stroke="#1F2937" stroke-width="1.4" stroke-dasharray="6 3"/>`).join('')}
    <g class="${P}-ic ${P}-ic1"><g transform="translate(-74 170)"><path d="M-26 22 L-10 -10 L2 8 L12 -4 L26 22Z" fill="#4ADE80" stroke="${L}"/><path d="M-26 22 Q0 12 26 22" stroke="#38BDF8" stroke-width="4" fill="none"/></g>
      <text x="-74" y="204" text-anchor="middle" ${NUN} font-size="10" fill="#166534">land</text></g>
    <g class="${P}-ic ${P}-ic2"><g transform="translate(0 168)"><rect x="-14" y="-14" width="28" height="28" fill="#22C55E" stroke="${L}"/><path d="M-14 0 H14 M0 -14 V14" stroke="#FACC15" stroke-width="2.2"/></g>
      <text x="0" y="204" text-anchor="middle" ${NUN} font-size="10" fill="#166534">customs</text></g>
    <g class="${P}-ic ${P}-ic3"><g transform="translate(74 172) scale(1.3)"><path d="M-14 6 L-16 -10 L-6 -2 L0 -14 L6 -2 L16 -10 L14 6Z" fill="#FACC15" stroke="${L}"/><circle cy="-2" r="2" fill="#DC2626"/></g>
      <text x="74" y="204" text-anchor="middle" ${NUN} font-size="10" fill="#B45309">kings</text></g></g>
  <g class="${P}-rodT"><rect x="-128" y="54" width="256" height="9" rx="4" fill="#A16207" stroke="${L}"/></g>
  <g class="${P}-rodB"><rect x="-128" y="206" width="256" height="9" rx="4" fill="#A16207" stroke="${L}"/></g></g>`;

function bg() {
  return `
  ${skyG(0, X.cls - 20, `${P}sky`, '#7DD3FC', '#FEF9C3')}
  <g transform="translate(1200 62)">${sun(20)}</g>
  ${cloud(160, 56, 0.8, 0)}${cloud(700, 44, 0.7, 2)}${cloud(1400, 60, 0.9, 4)}${cloud(2100, 48, 0.8, 1)}${cloud(2600, 58, 0.8, 3)}
  ${hills(-20, 560, 250, '#A7D7B0', 50)}${hills(1080, 600, 250, '#6BB27E', 110)}${hills(1600, 1300, 250, '#A7D7B0', 60)}
  <rect x="0" y="246" width="${X.cls}" height="${FLOOR - 246}" fill="#A3D977"/>
  ${ground(0, X.cls, FLOOR, '#C9B27C', '#A8915E')}
  <!-- thư phòng bên ao sen -->
  <g transform="translate(${X.study - 40} ${FLOOR})"><rect x="-120" y="-150" width="200" height="150" fill="#FEF3C7" stroke="${L}" stroke-width="1.1"/>
    <path d="M-140 -146 Q-150 -150 -152 -162 Q-138 -152 -126 -156 L-104 -186 H64 L86 -156 Q98 -152 112 -162 Q110 -150 100 -146Z" fill="#B45309" stroke="${L}" stroke-width="1.1"/>
    <rect x="-96" y="-120" width="44" height="50" fill="#BAE6FD" stroke="${L}"/><path d="M-74 -120 V-70 M-96 -95 H-52" stroke="#7C4A1E" stroke-width="1.6"/>
    <g transform="translate(20 -130)"><rect x="-22" y="0" width="44" height="64" fill="#fff" stroke="${L}"/><text x="0" y="36" text-anchor="middle" ${NUN} font-size="20" fill="#1F2937">詩</text></g></g>
  ${bamboo(440, FLOOR - 4, 0.9)}
  <ellipse cx="120" cy="${FLOOR + 14}" rx="0" ry="0"/>
  <!-- thành Đông Quan -->
  ${cityGate(X.gate, FLOOR, 520, 'ĐÔNG QUAN')}
  ${[X.gate - 220, X.gate - 120, X.gate + 120, X.gate + 220].map((x) => greyFlag(x, FLOOR - 132, 64)).join('')}
  <!-- trại Lam Sơn -->
  ${tent(X.camp - 150, FLOOR - 4, '#D6B98A', 1.2)}${tree(X.camp + 210, FLOOR - 6, 1.1, '')}${bamboo(X.camp - 230, FLOOR - 4, 0.9)}
  ${flag(P, X.camp - 90, FLOOR - 4, { h: 150, w: 62, hh: 30, c: '#DC2626', txt: 'LAM SƠN', fs: 10 })}
  <!-- trại quân Minh -->
  ${tent(X.ming - 100, FLOOR - 6, '#9CA3AF', 1.1)}${tent(X.ming + 150, FLOOR - 8, '#A8A29E', 1)}
  ${[X.ming - 170, X.ming - 30, X.ming + 90, X.ming + 210].map((x, i) => greyFlag(x, FLOOR - 4, 120, `${P}-gf`, 0.2 + i * 0.25)).join('')}
  <!-- bến sông -->
  <rect x="${X.dock + 30}" y="226" width="${X.hall - 200 - X.dock - 30}" height="${FLOOR - 226 + 2}" fill="#60A5FA" stroke="${L}"/>
  <g class="ek-wave">${Array.from({ length: 6 }, (_, i) => `<path d="M${X.dock + 50 + i * 36} ${240 + (i % 3) * 12} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <rect x="${X.dock - 40}" y="${FLOOR - 14}" width="96" height="10" fill="#A16207" stroke="${L}"/>${[-30, 0, 30].map((dx) => `<rect x="${X.dock + dx}" y="${FLOOR - 6}" width="6" height="24" fill="#7C4A1E"/>`).join('')}
  <g class="${P}-food">${SACK(X.dock - 80, FLOOR)}${SACK(X.dock - 58, FLOOR)}${SACK(X.dock - 69, FLOOR - 18)}</g>
  <!-- điện: viết Bình Ngô đại cáo -->
  ${palace(X.hall, FLOOR, 300, { roof: '#EAB308' })}
  <!-- lớp học hôm nay -->
  ${room(X.cls, W - X.cls, FLOOR, '#E0F2FE')}
  <rect x="${X.cls - 6}" y="0" width="12" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  ${windowBox(X.cls + 40, 70, 90, 80)}
  <g transform="translate(${X.cls + 260} 0)"><rect x="-90" y="62" width="180" height="104" rx="3" fill="#166534" stroke="#A16207" stroke-width="6"/>
    <text x="0" y="86" text-anchor="middle" ${NUN} font-size="12" fill="#F8FAFC">History</text>
    <g transform="translate(0 124)"><rect x="-56" y="-26" width="112" height="52" fill="#FEF3C7" stroke="${L}"/><rect x="-60" y="-30" width="120" height="6" rx="3" fill="#A16207"/><rect x="-60" y="24" width="120" height="6" rx="3" fill="#A16207"/>
      <text y="-6" text-anchor="middle" ${NUN} font-size="10" fill="#7F1D1D">Binh Ngo Dai Cao</text><text y="10" text-anchor="middle" ${NUN} font-size="9" fill="#475569">1428</text></g></g>`;
}

function fg() {
  return `
  ${SCROLL}
  <!-- bàn viết (che chân người ngồi) -->
  <g transform="translate(${X.study + 46} 0)"><rect x="-40" y="${FLOOR - 40}" width="80" height="8" rx="2" fill="#92400E" stroke="${L}"/><rect x="-34" y="${FLOOR - 32}" width="7" height="32" fill="#78350F"/><rect x="27" y="${FLOOR - 32}" width="7" height="32" fill="#78350F"/>
    <rect x="-26" y="${FLOOR - 48}" width="40" height="9" fill="#fff" stroke="${L}" stroke-width="0.7"/>
    <g class="${P}-poem">${[0, 1, 2].map((i) => `<path class="${P}-pl" style="transition-delay:${0.3 + i * 0.6}s" d="M${-20 + i * 12} ${FLOOR - 46} v5" stroke="#1F2937" stroke-width="1.6"/>`).join('')}</g></g>
  <g transform="translate(${X.hall - 110} 0)"><rect x="-44" y="${FLOOR - 40}" width="88" height="8" rx="2" fill="#92400E" stroke="${L}"/><rect x="-38" y="${FLOOR - 32}" width="7" height="32" fill="#78350F"/><rect x="31" y="${FLOOR - 32}" width="7" height="32" fill="#78350F"/>
    <rect x="-26" y="${FLOOR - 48}" width="40" height="9" fill="#FEF3C7" stroke="${L}" stroke-width="0.7"/></g>
  <!-- bàn bản đồ ở trại -->
  <g transform="translate(${X.camp + 50} 0)"><rect x="-40" y="${FLOOR - 64}" width="80" height="8" rx="2" fill="#92400E" stroke="${L}"/><rect x="-34" y="${FLOOR - 56}" width="7" height="56" fill="#78350F"/><rect x="27" y="${FLOOR - 56}" width="7" height="56" fill="#78350F"/>
    <rect x="-34" y="${FLOOR - 72}" width="68" height="9" fill="#FEF3C7" stroke="${L}" stroke-width="0.7"/><path d="M-26 ${FLOOR - 67} Q-6 ${FLOOR - 74} 20 ${FLOOR - 66}" stroke="#DC2626" stroke-width="1.6" fill="none"/></g>
  <!-- bàn học sinh -->
  ${desk(X.cls + 190, FLOOR)}${desk(X.cls + 330, FLOOR, '#FBBF24')}
  ${night(X.gate - 300, 640)}
  ${lb(P, 'sch', label(X.study - 60, 80, 'scholar', '#1E3A8A', 16))}
  ${lb(P, 'poet', label(X.study + 120, 80, 'poet', '#B45309', 16))}
  ${lb(P, 'years', label(X.gate - 150, 70, 'for years', '#475569', 15))}
  ${lb(P, 'nohelp', label(X.gate + 60, 112, 'did not help', '#DC2626', 15))}
  ${lb(P, 'join', label(X.camp, 80, 'joined Le Loi', '#B91C1C', 15))}
  ${lb(P, 'adv', label(X.camp + 50, 80, 'adviser', '#1E3A8A', 16))}
  ${lb(P, 'letter', `<g transform="translate(${X.ming + 70} 86)"><rect x="-86" y="-24" width="172" height="46" rx="4" fill="#FEF3C7" stroke="${SEP}" stroke-width="1.4"/>
    <text y="-4" text-anchor="middle" ${NUN} font-size="12" fill="${SEP}">You cannot win.</text><text y="13" text-anchor="middle" ${NUN} font-size="12" fill="${SEP}">Go home.</text></g>`)}
  ${lb(P, 'y1427', label(X.ming - 120, 70, 'victory 1427', '#B91C1C', 15))}
  ${lb(P, 'kind', label(X.ming - 150, 70, 'kindness', '#DB2777', 17))}
  ${lb(P, 'gifts', `<g>${label(X.dock - 10, 70, 'boats', '#0369A1', 14)}${label(X.dock + 90, 70, 'horses', '#7C4A1E', 14)}${label(X.dock + 190, 70, 'food', '#B45309', 14)}</g>`)}
  ${lb(P, 'safe', label(X.dock + 90, 108, 'go home safely', '#16A34A', 14))}
  ${lb(P, 'y1428', label(X.hall - 200, 66, '1428', '#B91C1C', 16))}
  ${lb(P, 'decl', label(X.hall + 70, 238, 'a declaration of victory', '#7F1D1D', 13))}
  ${lb(P, 'today', label(X.cls + 120, 60, 'Today', '#16A34A', 18))}`;
}

const CSS = `
.es-ac[data-id="e128boat"], .es-ac[data-id="e128horse"] { transition: opacity 1s; }
${lbCss(P, ['sch', 'poet', 'years', 'nohelp', 'join', 'adv', 'letter', 'y1427', 'kind', 'gifts', 'safe', 'y1428', 'decl', 'today'])}
.st-night .ek-night { opacity: 1; }
.${P}-pl { opacity: 0; transition: opacity .3s; }
.st-poem .${P}-pl { opacity: 1; }
.${P}-gf { transition: transform .7s ease-in, opacity .7s; }
.st-win .${P}-gf { transform: rotate(80deg); opacity: 0; }
.${P}-food { transition: opacity .3s; }
.st-loaded .${P}-food { opacity: 0; }
.${P}-pass { opacity: 0; transition: opacity .3s; }
.${P}-full .${P}-pass { opacity: 1; }
.${P}-scroll { clip-path: inset(0 0 100% 0); }
.st-scroll .${P}-scroll { clip-path: inset(0 0 0 0); transition: clip-path 1.6s ease-out; }
.${P}-rodT, .${P}-rodB { opacity: 0; transition: opacity .3s, transform 1.6s ease-out; }
.${P}-rodB { transform: translateY(-152px); }
.st-scroll .${P}-rodT, .st-scroll .${P}-rodB { opacity: 1; }
.st-scroll .${P}-rodB { transform: none; }
.${P}-ic { opacity: 0; transform: scale(.4); transform-box: fill-box; transform-origin: 50% 50%; transition: opacity .25s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.st-ic1 .${P}-ic1, .st-ic2 .${P}-ic2, .st-ic3 .${P}-ic3 { opacity: 1; transform: none; }
`;

const MING = ['mg2', 'm1', 'm2'];
const OURS = ['s1', 's2'];

const BEATS = [
  { key: ['a great scholar and poet'], icon: '🖌️', label: 'scholar and poet', async play(st) {
    st.look(X.study + 40, { instant: true });
    st.hold('trai', 'vs_brush'); st.pose('trai', 'e128_write'); st.act('trai', 'write');
    st.set('st-lb-sch'); st.sfx('page-turn', { vol: 0.5 });
    await st.wait(600);
    st.set('st-poem');
    await st.loop('pencil', () => st.wait(1700), { vol: 0.6 });
    st.act('trai', null);
    st.set('st-lb-poet'); st.sfx('ding', { vol: 0.4 });
    st.mood('trai', 'joy');
    await st.wait(900);
  } },
  { key: ['kept him in the capital for years', 'did not help them'], icon: '🙅', label: 'did not help', async play(st) {
    off(st, 'st-lb-sch', 'st-lb-poet');
    st.hold('trai', null); st.mood('trai', 'happy');
    await st.walk('trai', X.gate - 70, { speed: 140, lead: 40 });
    st.set('st-lb-years'); st.sfx('tick', { vol: 0.4 });
    st.face('trai', 1);
    st.pose('mg1', 'give'); st.mood('mg1', 'joy');
    const say = st.say('mg1', 'Work for us!', 1600);
    await st.wait(1000);
    st.act('trai', 'no'); st.mood('trai', 'sad'); st.sfx('buzz-no', { vol: 0.5 });
    st.set('st-lb-nohelp');
    await say;
    st.pose('mg1', 'stand'); st.mood('mg1', 'sad');
    await st.wait(900);
    st.act('trai', null);
  } },
  { key: ['he escaped and joined Le Loi'], icon: '🌙', label: 'escaped', async play(st) {
    off(st, 'st-lb-years', 'st-lb-nohelp');
    st.set('st-night'); st.sfx('crickets', { vol: 0.5 });
    st.mood('guard', 'shut'); st.pose('guard', 'e128_tip'); st.act('guard', 'nod');
    st.fx('zzz', X.gate + 20, 110);
    st.pose('trai', 'e128_tip'); st.mood('trai', 'happy');
    await st.walk('trai', X.gate + 280, { speed: 80, pose: 'e128_tip', lead: 60 });
    st.set('st-night', false);
    await st.walk('trai', X.camp - 30, { speed: 160, lead: 30 });
    st.face('trai', 1); st.face('loi', -1);
    st.pose('trai', 'e128_bow'); st.pose('loi', 'open'); st.mood('loi', 'joy');
    st.set('st-lb-join'); st.sfx('ding', { vol: 0.5 });
    await st.wait(1100);
    st.pose('trai', 'stand'); st.pose('loi', 'stand'); st.act('guard', null);
  } },
  { key: ["Le Loi's adviser"], icon: '🗺️', label: 'adviser', async play(st) {
    st.set('st-lb-join', false);
    st.look(X.camp + 40);
    await st.walk('trai', X.camp + 6, { speed: 80, follow: false });
    st.face('trai', 1);
    st.set('st-lb-adv'); st.sfx('page-turn', { vol: 0.5 });
    st.pose('trai', 'point');
    st.talk('trai', true);
    await st.wait(700);
    st.act('loi', 'nod'); st.mood('loi', 'happy');
    await st.wait(1500);
    st.talk('trai', false); st.act('loi', null); st.pose('trai', 'stand');
  } },
  { key: ['In his letters', 'could not win', 'should go home'], icon: '✉️', label: 'letters', async play(st) {
    st.set('st-lb-adv', false);
    st.hold('trai', 'vs_letter'); st.pose('trai', 'give');
    await st.wait(500);
    st.hold('trai', null); st.sfx('whoosh', { vol: 0.5 });
    st.look(X.ming + 40, { dur: 1300 });
    await st.fly(PROPS.vs_letter.replace('translate(0 -4)', 'scale(1.6)'), [X.camp + 40, 170], [X.ming + 46, 180], { size: 40, dur: 1300 });
    st.hold('mg2', 'vs_letter'); st.pose('mg2', 'e128_read'); st.sfx('page-turn', { vol: 0.7 });
    await st.wait(300);
    st.set('st-lb-letter');
    await st.wait(900);
    st.mood('mg2', 'sad'); st.mood('m1', 'sad'); st.mood('m2', 'wow');
    await st.wait(1300);
  } },
  { key: ['the victory in 1427', 'should be punished', 'chose kindness'], icon: '💗', label: 'chose kindness', async play(st) {
    st.set('st-lb-letter', false);
    st.hold('mg2', null); st.pose('mg2', 'stand');
    st.set('st-win'); st.set('st-lb-y1427'); st.sfx('lion-drum', { vol: 0.6 });
    st.look(X.ming - 120);
    st.place('loi', X.ming - 480, FLOOR, 1); st.place('trai', X.ming - 530, FLOOR, 1);
    await Promise.all([
      st.walk('s1', X.ming - 300, { speed: 150, follow: false }),
      st.walk('s2', X.ming - 250, { speed: 150, follow: false }),
      st.walk('loi', X.ming - 360, { speed: 150, follow: false }),
      st.walk('trai', X.ming - 410, { speed: 150, follow: false }),
    ]);
    MING.forEach((id) => { st.pose(id, 'e128_bow'); st.mood(id, 'sad'); });
    st.set('st-lb-y1427', false);
    st.pose('s1', 'e128_fist'); st.pose('s2', 'e128_fist');
    await st.say('s2', 'Punish them!', 1500);
    st.walk('loi', X.ming - 120, { speed: 140, follow: false });
    await st.walk('trai', X.ming - 180, { speed: 140, follow: false });
    st.pose('loi', 'e128_stop'); st.pose('trai', 'open'); st.mood('trai', 'happy');
    st.pose('s1', 'e128_spear'); st.pose('s2', 'e128_spear'); st.mood('s1', 'wow'); st.mood('s2', 'wow');
    st.set('st-lb-kind'); st.fx('hearts', X.ming - 150, 120);
    MING.forEach((id) => st.mood(id, 'wow'));
    await st.wait(1500);
    st.pose('loi', 'stand');
  } },
  { key: ['boats, horses and food', 'go home safely'], icon: '⛵', label: 'go home safely', async play(st) {
    st.set('st-lb-kind', false);
    MING.forEach((id) => { st.pose(id, 'stand'); st.mood(id, 'happy'); });
    st.show('e128horse', true);
    st.look(X.dock + 60, { dur: 1500 });
    await Promise.all(MING.map((id, i) => st.walk(id, X.dock - 10 + i * 30, { speed: 150, follow: false })));
    st.set('st-lb-gifts'); st.sfx('pop', { vol: 0.5 });
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(SACK(0, 10), [X.dock - 70, FLOOR - 20], [X.dock + 120, WL - 40], { size: 30, dur: 600 });
    st.set('st-loaded'); st.sfx('bump', { vol: 0.4 });
    MING.forEach((id) => st.show(id, false));
    mark(st, 'e128boat', `${P}-full`); st.sfx('splash', { vol: 0.4 });
    await st.wait(400);
    st.set('st-lb-gifts', false); st.set('st-lb-safe');
    await st.loop('river', () => Promise.all([
      st.walk('e128boat', X.dock + 250, { speed: 50, follow: false }),
      st.walk('e128horse', X.dock - 420, { speed: 150, follow: false }),
    ]), { vol: 0.5 });
    st.show('e128boat', false); st.show('e128horse', false);
    await st.wait(500);
  } },
  { key: ['Binh Ngo Dai Cao', 'a famous declaration of victory'], icon: '📜', label: 'Binh Ngo Dai Cao', async play(st) {
    st.set('st-lb-safe', false);
    st.place('trai', X.hall - 136, FLOOR, 1);
    st.hold('trai', 'vs_brush'); st.pose('trai', 'e128_write'); st.act('trai', 'write'); st.mood('trai', 'happy');
    st.look(X.hall + 10, { dur: 1200 });
    st.set('st-lb-y1428'); st.sfx('ding', { vol: 0.4 });
    await st.loop('pencil', () => st.wait(1300), { vol: 0.6 });
    st.set('st-scroll'); st.sfx('page-turn', { vol: 0.8 });
    await st.wait(1300);
    st.act('trai', null);
    st.set('st-lb-decl'); st.sfx('sparkle', { vol: 0.35 });
    await st.wait(1000);
  } },
  { key: ['its own land, customs and kings'], icon: '🏞️', label: 'land, customs, kings', async play(st) {
    st.set('st-lb-decl', false);
    st.look(X.hall + 10);
    st.hold('trai', null); st.pose('trai', 'e128_sit');
    await st.wait(500);
    for (const k of ['st-ic1', 'st-ic2', 'st-ic3']) { st.set(k); st.sfx('pop', { vol: 0.6 }); await st.wait(800); }
    st.mood('trai', 'joy');
    await st.wait(700);
  } },
  { key: ['Students still learn it today'], icon: '🏫', label: 'learn it today', async play(st) {
    off(st, 'st-lb-y1428');
    st.look(X.cls + 230, { dur: 1400 });
    st.set('st-lb-today'); st.sfx('school-bell', { vol: 0.3 });
    await st.wait(800);
    st.pose('hoa', 'point'); st.talk('hoa', true);
    st.pose('minh', 'read'); st.pose('lan', 'read'); st.act('minh', 'read'); st.act('lan', 'read');
    st.sfx('page-turn', { vol: 0.6 });
    await st.wait(1600);
    st.talk('hoa', false); st.mood('minh', 'joy'); st.mood('lan', 'joy');
    await st.wait(600);
  } },
];

export default {
  id: P, worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + vsCss(P) + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PR,
  order: [0, 1, 2, 4, 5, 7],
  cast: [
    { id: 'e128boat', kind: 'thing', svg: BOAT, box: [-134, -156, 268, 168], x: X.dock + 150, y: WL, s: 0.85 },
    { id: 'e128horse', kind: 'thing', svg: HORSE, box: [-84, -210, 190, 214], x: X.dock - 50, y: FLOOR, s: 0.95, face: -1 },
    { id: 'mg1', kind: 'adult', who: 'e128_mingOff', x: X.gate + 10, face: -1 },
    { id: 'guard', kind: 'adult', who: 'e128_mingSol', x: X.gate + 70, face: -1, s: 0.96 },
    { id: 'loi', kind: 'adult', who: 'e128_loi', x: X.camp + 100, face: -1 },
    { id: 's1', kind: 'adult', who: 'e128_sol1', x: X.camp + 200, s: 0.96 },
    { id: 's2', kind: 'adult', who: 'e128_sol2', x: X.camp + 250, s: 0.96 },
    { id: 'mg2', kind: 'adult', who: 'e128_mingGen', x: X.ming + 20 },
    { id: 'm1', kind: 'adult', who: 'e128_mingSol', x: X.ming + 90, s: 0.95 },
    { id: 'm2', kind: 'adult', who: 'e128_mingSol', x: X.ming + 150, s: 0.95, face: -1 },
    { id: 'trai', kind: 'adult', who: 'e128_trai', x: X.study + 30 },
    { id: 'hoa', kind: 'adult', who: 'e128_hoa', x: X.cls + 90 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: X.cls + 190, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan', x: X.cls + 330, face: -1, s: 1.06 },
  ],
  init(st) {
    st.show('e128horse', false);
    wear(st, 'trai', HAT.khan); robe(st, 'trai');
    wear(st, 'loi', HAT.general); robe(st, 'loi'); st.chest('loi', ARMOR('#B45309'));
    for (const id of ['mg1', 'mg2']) { wear(st, id, HAT.enemy); robe(st, id); }
    for (const id of ['guard', 'm1', 'm2']) wear(st, id, HAT.enemy);
    st.hold('guard', 'vs_spear'); st.pose('guard', 'e128_spear');
    for (const id of OURS) { wear(st, id, HAT.band); st.hold(id, 'vs_spear'); st.pose(id, 'e128_spear'); }
    st.pose('trai', 'e128_write');
    st.pose('minh', 'sit'); st.pose('lan', 'sit');
    st.chest('minh', 'book'); st.chest('lan', 'book');
  },
};
