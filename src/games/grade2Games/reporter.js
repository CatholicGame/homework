/**
 * 📊 Phóng viên nhí — thiết kế: docs/lop_2/thiet-ke-tro-choi.md §4.8. Bé làm phóng viên cho báo tường của lớp.
 *   rep-1 (Bài 64, 67) kiểm đếm: xe / con vật đi qua từng chiếc, dừng ở chỗ phóng viên đứng; bé chạm đúng cột của
 *          bảng kiểm đếm để gạch một vạch (nhóm 5 vạch có gạch chéo). Hết lượt thì gõ số của một loại, hoặc chạm loại
 *          nhiều nhất / ít nhất. Kiểm chứng: mọi chiếc xe chạy về xếp hàng đúng cột, đánh số.
 *   rep-2 (Bài 65) biểu đồ tranh: draw — chạm hàng để thêm hình cho đúng bảng số liệu, bấm "Vẽ xong";
 *          read — đọc biểu đồ có sẵn: chạm loại nhiều nhất / ít nhất, gõ hơn kém mấy (ghép cặp từng cột).
 *   rep-3 (Bài 66) chắc chắn – có thể – không thể: nhìn túi lưới thấy bi bên trong, chọn thẻ cho câu "lấy được bi …",
 *          rồi bốc thử 5 lần. Mỗi ván có đủ ba loại câu.
 * App không báo trước lúc đúng. Khung quầy dùng chung với Chợ phiên lớp 3 (market/stall.js), theme 'rep'.
 */

import { stallMeta, levelMeta } from './catalog.js';
import { NPCS, cap } from '../grade3Games/npc.js';
import { mountStall, Q } from '../grade3Games/market/stall.js';
import { flyOne, calmMotion } from '../grade3Games/fly.js';
import { makeRng } from '../grade3Games/loop.js';
import { sfx } from '../preschool/fx.js';

const INK = '#3F3A40';
const MINUS = '−';
const WANT = (t) => `<b class="g3f-want">${t}</b>`;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
// Chị Mai làm phóng viên báo tường (cùng hình khách Chợ phiên).
const EDITOR = { ...NPCS.find(n => n.id === 'chi'), id: 'chi-rep', name: 'Chị Mai phóng viên' };

const THEMES = [
  { id: 'xe', place: 'Ngã tư trước cổng trường', what: 'xe', unit: 'chiếc', kinds: [{ id: 'bike', name: 'xe đạp' }, { id: 'moto', name: 'xe máy' }, { id: 'car', name: 'ô tô' }] },
  { id: 'vat', place: 'Cổng trang trại', what: 'con vật', unit: 'con', kinds: [{ id: 'hen', name: 'gà' }, { id: 'duck', name: 'vịt' }, { id: 'pig', name: 'lợn' }] },
  { id: 'buyt', place: 'Bến xe', what: 'xe', unit: 'chiếc', kinds: [{ id: 'bus', name: 'xe buýt' }, { id: 'taxi', name: 'xe taxi' }, { id: 'truck', name: 'xe tải' }] },
];

// ── Hình xe / con vật kiểm đếm: nhìn ngang, đầu quay sang trái (đi từ phải qua trái), viewBox 0 0 120 80 ─────
// Màu tươi, viền mực dày; trên đường còn có viền trắng (CSS) để không lẫn vào mặt đường.
const ST = `stroke="${INK}" stroke-width="3" stroke-linejoin="round"`;
const wheel = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#1F2937" ${ST}/><circle cx="${x}" cy="${y}" r="${r * 0.42}" fill="#E2E8F0" stroke="${INK}" stroke-width="2"/>`;
const light = (x, y, r = 3.5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#FDE047" stroke="${INK}" stroke-width="2"/>`;
const carBody = (c) => `<path d="M6 54 Q6 40 20 38 L32 22 Q36 17 44 17 L82 17 Q90 17 95 23 L106 38 Q116 40 116 54 L116 57 Q116 60 112 60 L10 60 Q6 60 6 57 Z" fill="${c}" ${ST}/>
  <path d="M37 23 L28 37 L58 37 L58 23 Z M64 23 L64 37 L98 37 L89 23 Z" fill="#E0F2FE" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
  <rect x="108" y="43" width="6" height="6" rx="1.5" fill="#EF4444" stroke="${INK}" stroke-width="1.5"/>`;
const SIDE = {
  bike: () => `<circle cx="28" cy="58" r="17" fill="#fff" fill-opacity=".35" stroke="${INK}" stroke-width="5"/><circle cx="92" cy="58" r="17" fill="#fff" fill-opacity=".35" stroke="${INK}" stroke-width="5"/>
    <circle cx="28" cy="58" r="3" fill="${INK}"/><circle cx="92" cy="58" r="3" fill="${INK}"/>
    <path d="M28 58 L42 32 L60 58 L70 30 L92 58 L60 58 M42 32 L70 30 M42 32 L38 20 L28 18 M63 26 H79" stroke="${INK}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M28 58 L42 32 L60 58 L70 30 L92 58 L60 58 M42 32 L70 30" stroke="#22C55E" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  moto: () => `<path d="M14 58 L28 20 L38 20 L34 46 L64 46 Q68 32 86 32 L104 34 Q112 46 106 58 Z" fill="#EF4444" ${ST}/>
    <path d="M68 33 Q86 23 106 30 L104 37 L70 37 Z" fill="#1F2937" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M30 20 L24 10 M20 10 H34" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <path d="M74 44 Q88 41 100 45" stroke="#fff" stroke-width="3" opacity=".6" fill="none" stroke-linecap="round"/>
    ${light(22, 36, 4)}${wheel(26, 62, 12)}${wheel(94, 62, 12)}`,
  car: () => `${carBody('#38BDF8')}${light(13, 46)}${wheel(30, 60, 11)}${wheel(92, 60, 11)}`,
  taxi: () => `<rect x="50" y="7" width="22" height="11" rx="2" fill="#fff" stroke="${INK}" stroke-width="2"/>
    <text x="61" y="15.5" font-size="7" font-weight="900" text-anchor="middle" fill="${INK}" font-family="sans-serif">TAXI</text>
    ${carBody('#FACC15')}<path d="M22 50 H104" stroke="#1F2937" stroke-width="4" stroke-dasharray="5 5"/>${light(13, 46)}${wheel(30, 60, 11)}${wheel(92, 60, 11)}`,
  bus: () => `<rect x="6" y="10" width="110" height="48" rx="8" fill="#F97316" ${ST}/>
    <rect x="11" y="16" width="14" height="22" rx="2" fill="#E0F2FE" stroke="${INK}" stroke-width="2.5"/>
    ${[31, 51, 71, 91].map(x => `<rect x="${x}" y="16" width="16" height="16" rx="2" fill="#E0F2FE" stroke="${INK}" stroke-width="2.5"/>`).join('')}
    <rect x="28" y="40" width="85" height="5" fill="#fff" opacity=".85"/>${light(13, 50)}${wheel(28, 60, 10)}${wheel(94, 60, 10)}`,
  truck: () => `<rect x="42" y="8" width="74" height="48" rx="3" fill="#38BDF8" ${ST}/>
    <path d="M50 20 H108 M50 32 H108 M50 44 H108" stroke="#fff" stroke-width="2.5" opacity=".55"/>
    <path d="M6 58 L6 36 Q6 26 16 25 L30 25 Q34 25 36 29 L42 40 L42 58 Z" fill="#EF4444" ${ST}/>
    <path d="M12 30 L29 30 L35 40 L12 40 Z" fill="#E0F2FE" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    ${light(9, 48, 3)}${wheel(22, 60, 10)}${wheel(66, 60, 10)}${wheel(98, 60, 10)}`,
  hen: () => `<path d="M90 38 Q106 8 112 30 Q114 46 96 52 Z" fill="#B45309" ${ST}/>
    <path d="M56 64 V74 M72 64 V74 M51 74 H60 M67 74 H76" stroke="#F59E0B" stroke-width="3.5" stroke-linecap="round"/>
    <ellipse cx="66" cy="46" rx="30" ry="21" fill="#FB923C" ${ST}/>
    <path d="M54 44 Q68 36 82 46 Q70 58 54 44 Z" fill="#EA580C" stroke="${INK}" stroke-width="2"/>
    <path d="M28 17 Q29 6 35 13 Q38 4 42 13 Q48 7 46 19 Z" fill="#EF4444" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="37" cy="27" r="13" fill="#FB923C" ${ST}/>
    <path d="M25 24 L12 29 L25 33 Z" fill="#FACC15" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="28" cy="39" rx="3.5" ry="5" fill="#EF4444" stroke="${INK}" stroke-width="2"/><circle cx="34" cy="24" r="2.6" fill="${INK}"/>`,
  duck: () => `<path d="M56 64 V72 M72 64 V72 M50 73 H62 M66 73 H78" stroke="#F97316" stroke-width="4" stroke-linecap="round"/>
    <path d="M92 42 L112 30 L104 54 Z" fill="#FDE047" ${ST}/>
    <ellipse cx="66" cy="50" rx="32" ry="17" fill="#FDE047" ${ST}/>
    <path d="M56 47 Q72 39 88 49 Q72 61 56 47 Z" fill="#FACC15" stroke="${INK}" stroke-width="2"/>
    <circle cx="38" cy="30" r="13" fill="#FDE047" ${ST}/>
    <path d="M27 28 Q11 26 11 34 Q18 38 28 35 Z" fill="#F97316" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="36" cy="27" r="2.6" fill="${INK}"/>`,
  pig: () => `<path d="M42 56 V71 M54 58 V71 M76 58 V71 M88 56 V71" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
    <path d="M42 56 V71 M54 58 V71 M76 58 V71 M88 56 V71" stroke="#F9A8D4" stroke-width="5" stroke-linecap="round"/>
    <path d="M100 38 q10 -8 8 2 q-2 8 6 4" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="64" cy="42" rx="38" ry="22" fill="#F9A8D4" ${ST}/>
    <path d="M22 24 L28 8 L38 22 Z" fill="#F472B6" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="28" cy="38" r="17" fill="#F9A8D4" ${ST}/>
    <ellipse cx="13" cy="42" rx="7" ry="8.5" fill="#F472B6" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="11" cy="40" r="1.6" fill="${INK}"/><circle cx="15" cy="45" r="1.6" fill="${INK}"/>
    <circle cx="26" cy="32" r="2.6" fill="${INK}"/><ellipse cx="34" cy="45" rx="4" ry="2.5" fill="#F472B6" opacity=".7"/>`,
};
// ── Cảnh nền phía sau đường (viewBox 1200 × 300, đáy hình = mép vỉa hè): trường học / trang trại / bến xe ────────
const tree = (x, s = 1) => `<g transform="translate(${x} 300) scale(${s})">
  <rect x="-9" y="-70" width="18" height="70" rx="4" fill="#92400E" stroke="${INK}" stroke-width="3"/>
  <circle cx="-26" cy="-92" r="30" fill="#16A34A" stroke="${INK}" stroke-width="3"/><circle cx="26" cy="-92" r="30" fill="#16A34A" stroke="${INK}" stroke-width="3"/>
  <circle cx="0" cy="-118" r="36" fill="#22C55E" stroke="${INK}" stroke-width="3"/><circle cx="-12" cy="-128" r="9" fill="#86EFAC" opacity=".7"/></g>`;
const cloud = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" opacity=".95"><ellipse cx="0" cy="0" rx="46" ry="20"/><ellipse cx="-26" cy="6" rx="28" ry="16"/><ellipse cx="28" cy="6" rx="30" ry="16"/><ellipse cx="4" cy="-12" rx="26" ry="18"/></g>`;
const fence = (from, to, gap = null, color = '#F8FAFC') => {
  let s = '';
  for (let x = from; x <= to; x += 26) if (!gap || x < gap[0] || x > gap[1]) s += `<rect x="${x}" y="262" width="12" height="38" rx="3" fill="${color}" stroke="${INK}" stroke-width="2.5"/>`;
  return `<rect x="${from}" y="272" width="${to - from + 12}" height="8" fill="${color}" stroke="${INK}" stroke-width="2.5"/>${s}`;
};
const label = (x, y, w, text, bg, fg = '#fff', fs = 26) => `<rect x="${x - w / 2}" y="${y}" width="${w}" height="${fs + 14}" rx="8" fill="${bg}" stroke="${INK}" stroke-width="3"/>
  <text x="${x}" y="${y + fs + 3}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="${fg}" font-family="'Baloo 2', Quicksand, sans-serif">${text}</text>`;
const windows = (xs, ys, w, h) => ys.map(y => xs.map(x => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#BAE6FD" stroke="${INK}" stroke-width="3"/><path d="M${x + w / 2} ${y} V${y + h}" stroke="${INK}" stroke-width="2"/>`).join('')).join('');
const BACKDROP = {
  xe: () => `${cloud(170, 60)}${cloud(1010, 46, 1.2)}${cloud(620, 28, .7)}
    <rect x="380" y="112" width="440" height="188" fill="#FDE68A" stroke="${INK}" stroke-width="4"/>
    <path d="M356 118 L600 46 L844 118 Z" fill="#EF4444" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    ${label(600, 122, 300, 'TRƯỜNG TIỂU HỌC', '#1D4ED8')}
    ${windows([405, 465, 690, 750], [178, 236], 44, 40)}
    <rect x="560" y="214" width="80" height="86" rx="6" fill="#B45309" stroke="${INK}" stroke-width="3"/><path d="M600 214 V300" stroke="${INK}" stroke-width="2.5"/>
    <path d="M884 300 V58" stroke="${INK}" stroke-width="5"/><path d="M886 60 H952 V104 H886 Z" fill="#EF4444" stroke="${INK}" stroke-width="3"/>
    <path d="M919 70 l4 10 h10 l-8 6 l3 10 l-9 -6 l-9 6 l3 -10 l-8 -6 h10 z" fill="#FDE047"/>
    ${fence(0, 1190, [520, 680])}
    <rect x="512" y="230" width="20" height="70" fill="#E2E8F0" stroke="${INK}" stroke-width="3"/><rect x="668" y="230" width="20" height="70" fill="#E2E8F0" stroke="${INK}" stroke-width="3"/>
    ${tree(80, 1.1)}${tree(250, .95)}${tree(970, 1)}${tree(1130, 1.15)}`,
  vat: () => `<circle cx="1060" cy="70" r="40" fill="#FDE047" stroke="${INK}" stroke-width="3"/>${cloud(240, 60)}${cloud(820, 42, .9)}
    <path d="M0 300 Q300 200 600 250 Q900 200 1200 300 Z" fill="#BBF7D0"/>
    <rect x="460" y="130" width="280" height="170" fill="#DC2626" stroke="${INK}" stroke-width="4"/>
    <path d="M436 136 L600 56 L764 136 Z" fill="#7F1D1D" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    ${label(600, 92, 190, 'TRANG TRẠI', '#FEF3C7', '#7F1D1D', 24)}
    <rect x="550" y="196" width="100" height="104" fill="#FEF2F2" stroke="${INK}" stroke-width="3"/><path d="M550 196 L650 300 M650 196 L550 300" stroke="#DC2626" stroke-width="7"/>
    <rect x="490" y="160" width="40" height="34" fill="#FEF2F2" stroke="${INK}" stroke-width="3"/><rect x="670" y="160" width="40" height="34" fill="#FEF2F2" stroke="${INK}" stroke-width="3"/>
    ${[[300, 258], [360, 266], [840, 262]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="40" ry="34" fill="#FACC15" stroke="${INK}" stroke-width="3"/><path d="M${x - 24} ${y - 8} q24 -10 48 0 M${x - 28} ${y + 8} q28 -10 56 0" stroke="#CA8A04" stroke-width="3" fill="none"/>`).join('')}
    ${fence(0, 1190, [520, 680], '#D6A15B')}${tree(90, 1.1)}${tree(1000, .95)}${tree(1140, 1.1)}`,
  buyt: () => `${cloud(200, 54)}${cloud(980, 60, 1.1)}
    <rect x="330" y="120" width="540" height="180" fill="#E0E7FF" stroke="${INK}" stroke-width="4"/>
    <path d="M300 120 H900 L870 96 H330 Z" fill="#4F46E5" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    ${label(600, 40, 220, 'BẾN XE', '#F97316', '#fff', 32)}<path d="M560 86 V96 M640 86 V96" stroke="${INK}" stroke-width="4"/>
    ${windows([360, 450, 690, 780], [150], 60, 70)}
    <rect x="540" y="160" width="120" height="140" rx="6" fill="#BAE6FD" stroke="${INK}" stroke-width="3"/><path d="M600 160 V300" stroke="${INK}" stroke-width="2.5"/>
    <rect x="330" y="236" width="540" height="10" fill="#4F46E5" opacity=".6"/>
    <path d="M960 300 V150" stroke="${INK}" stroke-width="5"/><circle cx="960" cy="140" r="26" fill="#2563EB" stroke="${INK}" stroke-width="3"/>
    <text x="960" y="150" text-anchor="middle" font-size="28" font-weight="900" fill="#fff" font-family="sans-serif">B</text>
    ${tree(100, 1.1)}${tree(230, .9)}${tree(1110, 1.1)}`,
};
// Vườn cây ăn quả (biểu đồ số quả hái được) và phố đêm Trung thu (đèn lồng).
const fruitTree = (x, s, fruit) => `<g transform="translate(${x} 300) scale(${s})">
  <rect x="-12" y="-90" width="24" height="90" rx="5" fill="#92400E" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="0" cy="-140" rx="78" ry="62" fill="#22C55E" stroke="${INK}" stroke-width="3"/>
  ${[[-40, -150], [-8, -176], [30, -146], [52, -118], [-50, -112], [8, -120], [-22, -132]].map(([fx, fy]) => `<circle cx="${fx}" cy="${fy}" r="9" fill="${fruit}" stroke="${INK}" stroke-width="2"/>`).join('')}</g>`;
BACKDROP.orchard = () => `<circle cx="1080" cy="64" r="38" fill="#FDE047" stroke="${INK}" stroke-width="3"/>${cloud(200, 50)}${cloud(700, 36, .8)}
  <path d="M0 300 Q300 210 600 250 Q900 205 1200 300 Z" fill="#BBF7D0"/>
  ${fruitTree(110, 1, '#EF4444')}${fruitTree(330, .85, '#FB923C')}${fruitTree(560, 1.05, '#A3E635')}${fruitTree(800, .9, '#FACC15')}${fruitTree(1050, 1.05, '#EF4444')}
  <path d="M640 300 l20 -40 h60 l20 40 z" fill="#B45309" stroke="${INK}" stroke-width="3"/><path d="M652 276 h76" stroke="#FDE68A" stroke-width="4"/>
  ${fence(0, 1190, null, '#D6A15B')}`;
BACKDROP.lantern = () => `<circle cx="1060" cy="70" r="44" fill="#FEF9C3" stroke="${INK}" stroke-width="3"/><circle cx="1046" cy="60" r="8" fill="#FDE68A"/>
  ${[[120, 40], [300, 90], [480, 30], [760, 60], [900, 110], [200, 140]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#FEF9C3"/>`).join('')}
  ${[[40, 170, 180], [230, 150, 210], [460, 190, 170], [650, 160, 200], [860, 180, 180], [1040, 150, 160]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${300 - y}" fill="#1E3A8A" stroke="${INK}" stroke-width="3"/>
    <path d="M${x - 10} ${y} L${x + w / 2} ${y - 40} L${x + w + 10} ${y} Z" fill="#7C2D12" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="${x + w / 2 - 24}" y="${y + 40}" width="48" height="40" rx="4" fill="#FDE047" stroke="${INK}" stroke-width="2.5"/>`).join('')}
  <path d="M0 40 Q300 110 600 50 Q900 110 1200 40" stroke="${INK}" stroke-width="2" fill="none"/>
  ${[60, 180, 300, 420, 540, 660, 780, 900, 1020, 1140].map((x, i) => { const y = 40 + Math.abs(Math.sin((x / 1200) * Math.PI * 2)) * 50; return `<path d="M${x} ${y - 8} V${y}" stroke="${INK}" stroke-width="2"/><ellipse cx="${x}" cy="${y + 14}" rx="13" ry="16" fill="${['#EF4444', '#FACC15', '#F97316'][i % 3]}" stroke="${INK}" stroke-width="2.5"/>`; }).join('')}`;
const backdrop = (id) => `<svg class="g2r-backdrop" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${BACKDROP[id]()}</svg>`;

const sidePic = (id, cls = '', attrs = '') => `<svg class="g2r-vsvg ${cls}" viewBox="0 0 120 80" ${attrs} aria-hidden="true">${SIDE[id]()}</svg>`;
const GRAPHS = [
  { title: 'Số quả các bạn hái được', unit: 'quả', scene: 'orchard', kinds: [{ pic: '🍎', name: 'táo' }, { pic: '🍊', name: 'cam' }, { pic: '🍐', name: 'lê' }, { pic: '🍋', name: 'chanh' }] },
  { title: 'Số con vật ở trang trại', unit: 'con', scene: 'vat', kinds: [{ pic: '🐄', name: 'bò' }, { pic: '🐐', name: 'dê' }, { pic: '🐑', name: 'cừu' }, { pic: '🐇', name: 'thỏ' }] },
  { title: 'Số đèn lồng Rô-bốt làm', unit: 'chiếc', scene: 'lantern', kinds: [{ pic: '⭐', name: 'đèn ông sao' }, { pic: '🏮', name: 'đèn lồng đỏ' }, { pic: '🐟', name: 'đèn cá chép' }] },
  { title: 'Món ăn sáng các bạn thích', unit: 'bạn', scene: 'xe', kinds: [{ pic: '🍜', name: 'phở' }, { pic: '🥖', name: 'bánh mì' }, { pic: '🍚', name: 'xôi' }] },
];
const BALLS = { do: { name: 'đỏ', fill: '#EF4444' }, xanh: { name: 'xanh', fill: '#3B82F6' }, vang: { name: 'vàng', fill: '#FACC15' } };
const CARDS = [{ key: 'sure', label: 'Chắc chắn' }, { key: 'may', label: 'Có thể' }, { key: 'never', label: 'Không thể' }];

export const REP_LEVELS = [
  {
    ...levelMeta('rep-1'), missions: 5, kind: 'tally',
    knowledge: 'thu thập, phân loại, kiểm đếm số liệu',
    ask: (n) => `${cap(n.you)} đếm giúp ${n.me} xem có bao nhiêu xe, bao nhiêu con vật đi qua!`,
    desc: 'Mỗi lần một chiếc xe đi qua, gạch một vạch vào đúng cột. Đủ 5 vạch thì gạch chéo cho dễ đếm.',
    how: [['👀', 'Nhìn xe đi qua'], ['✏️', 'Gạch vào cột'], ['🔢', 'Đếm vạch']],
  },
  {
    ...levelMeta('rep-2'), missions: 5, kind: 'graph',
    knowledge: 'biểu đồ tranh',
    ask: (n) => `${cap(n.you)} vẽ và đọc biểu đồ tranh giúp ${n.me}!`,
    desc: 'Mỗi hình trong biểu đồ là một đồ vật. Hàng dài nhất là loại nhiều nhất.',
    how: [['👆', 'Chạm thêm hình'], ['📊', 'Đọc biểu đồ'], ['🔗', 'Ghép cặp']],
  },
  {
    ...levelMeta('rep-3'), missions: 5, kind: 'chance',
    knowledge: 'chắc chắn, có thể, không thể',
    ask: (n) => `${cap(n.you)} đoán giúp ${n.me} xem lấy được bi màu gì!`,
    desc: 'Túi toàn bi đỏ: chắc chắn lấy được bi đỏ. Túi có bi đỏ và bi xanh: có thể lấy được bi đỏ. Túi không có bi đỏ: không thể lấy được bi đỏ.',
    how: [['👀', 'Nhìn túi bi'], ['🃏', 'Chọn thẻ'], ['🤏', 'Bốc thử']],
  },
];

// ── Sinh nhiệm vụ ───────────────────────────────────────────────────────────────────────────────
function makeTally(rng, h) {
  const plan = ['count', 'most', 'count', 'least', 'count'];
  const ask = plan[h.length % plan.length];
  const theme = THEMES[h.length % THEMES.length];
  let counts;
  for (let t = 0; t < 200; t++) {
    counts = theme.kinds.map(() => rng.int(2, 6));
    const sum = counts.reduce((a, b) => a + b, 0);
    const mx = Math.max(...counts), mn = Math.min(...counts);
    if (sum < 9 || sum > 14) continue;
    if (ask === 'most' && counts.filter(c => c === mx).length > 1) continue;
    if (ask === 'least' && counts.filter(c => c === mn).length > 1) continue;
    if (ask === 'count' && !counts.some(c => c >= 5)) continue; // có cột đủ 5 vạch (gạch chéo)
    break;
  }
  const seq = rng.shuffle(counts.flatMap((c, k) => Array(c).fill(k)));
  const big = counts.map((_, i) => i).filter(i => counts[i] >= 5);
  const target = ask === 'count' ? rng.pick(big.length ? big : [counts.indexOf(Math.max(...counts))]) : -1;
  return { mode: 'tally', theme: theme.id, counts, seq, ask, target };
}
function makeGraph(rng, h) {
  const plan = ['draw', 'read', 'draw', 'read', 'read'];
  const mode = plan[h.length % plan.length];
  const g = GRAPHS[(h.length + rng.int(0, 3)) % GRAPHS.length];
  const ask = mode === 'draw' ? null : rng.pick(['most', 'least', 'diff', 'diff']);
  let counts;
  for (let t = 0; t < 200; t++) {
    counts = g.kinds.map(() => rng.int(2, 8));
    const mx = Math.max(...counts), mn = Math.min(...counts);
    if (new Set(counts).size < counts.length - (counts.length > 3 ? 1 : 0)) continue;
    if (counts.filter(c => c === mx).length > 1 || counts.filter(c => c === mn).length > 1) continue;
    break;
  }
  let pair = null;
  if (ask === 'diff') {
    const ids = rng.shuffle(counts.map((_, i) => i)).slice(0, 2);
    pair = counts[ids[0]] === counts[ids[1]] ? [counts.indexOf(Math.max(...counts)), counts.indexOf(Math.min(...counts))] : ids;
    if (counts[pair[0]] < counts[pair[1]]) pair.reverse(); // pair[0]: nhiều hơn
  }
  return { mode, graph: GRAPHS.indexOf(g), counts, ask, pair };
}
function makeChance(rng, h) {
  // Ba câu đầu là ba loại khác nhau (xáo thứ tự), hai câu sau tuỳ ý — mỗi ván có đủ ba loại.
  const first = h[0]?.order || rng.shuffle(['sure', 'may', 'never']);
  const key = h.length < 3 ? first[h.length] : rng.pick(['sure', 'may', 'never']);
  const colors = Object.keys(BALLS);
  const want = rng.pick(colors);
  const others = colors.filter(c => c !== want);
  const N = rng.int(5, 9);
  let bag;
  if (key === 'sure') bag = Array(N).fill(want);
  else if (key === 'never') bag = Array.from({ length: N }, (_, i) => (i < 2 ? others[i] : rng.pick(others)));
  else { const k = rng.int(1, N - 2); bag = [...Array(k).fill(want), ...Array.from({ length: N - k }, () => rng.pick(others))]; }
  return { mode: 'chance', key, want, bag: rng.shuffle(bag), order: first, seed: rng.int(1, 1e9) };
}
const MAKERS = { tally: makeTally, graph: makeGraph, chance: makeChance };

// ── Trò chơi ────────────────────────────────────────────────────────────────────────────────────
export const REPORTER_GAME = {
  ...stallMeta('rep'),
  unitWord: 'tin',
  npcs: [EDITOR],
  starPrefix: 'g2games',
  levels: REP_LEVELS,
  stallIcon: () => '<span style="font-size:3.2rem;line-height:1">📊</span>',
  summaryText: (ok, total) => `Em đã viết đúng <strong>${ok}/${total}</strong> bản tin cho báo tường.`,
  howTo(level) {
    return [...level.how.map(([pic, label]) => ({ pic, label })), { pic: '😊', label: 'Chị vui' }];
  },
  makeMission(rng, level, history) {
    return { ...MAKERS[level.kind](rng, history), level: level.kind, npc: EDITOR };
  },
  mountMission(stage, m, level, api) {
    injectRepStyles();
    if (import.meta.env.DEV) window.__g2rep = m;
    return mountRep(stage, m, api);
  },
};

// ── Màn chơi ────────────────────────────────────────────────────────────────────────────────────
const SIGN = { tally: 'Kiểm đếm', draw: 'Vẽ biểu đồ tranh', read: 'Đọc biểu đồ tranh', chance: 'Chắc chắn, có thể, không thể' };

function mountRep(stage, m, api) {
  const n = m.npc;
  // Lượt nào sẽ phải gõ số thì máy tính (nghỉ, mờ) giữ chỗ từ đầu: cột khách không đổi bố cục giữa chừng.
  const padModes = (m.mode === 'read' && m.ask === 'diff') || (m.mode === 'tally' && m.ask === 'count');
  const s = mountStall(stage, {
    npc: n, api, theme: 'rep', cameo: false,
    sign: `<span class="g2r-sign-pic">📰</span><span><strong>Báo tường lớp 2</strong><br>${SIGN[m.mode]}</span>`,
    counter: `
      <div class="g2r-bench">
        <div class="g2r-board" data-board><span class="g2r-say">&nbsp;</span></div>
        <div class="g2r-play" data-play></div>
        <div class="g2r-acts" data-acts></div>
      </div>`,
  });
  const scene = stage.querySelector('.g3f-scene');
  if (!padModes) scene.classList.add('g2r-nopad');
  const { counter } = s;
  const q = (sel) => counter.querySelector(sel);
  const board = q('[data-board]'), play = q('[data-play]'), acts = q('[data-acts]');
  // Bố cục cố định suốt lượt: bảng giữ sẵn chỗ (ẩn bằng visibility), thẻ kết quả đè lên đáy quầy chứ không đẩy phần chơi.
  board.style.visibility = 'hidden';
  const ok = (text, line) => { const l = line || `Cảm ơn ${n.you}!`; s.speak(l, 'happy', `${l} 🎉`); api.succeed(text); };
  const bad = (line, text, tip) => { s.speak(line, 'sad', line); api.fail(text, tip); };
  const say = (html) => { board.style.visibility = ''; board.innerHTML = `<span class="g2r-say">${html}</span>`; };
  const doneBtn = (label) => { acts.innerHTML = `<button type="button" class="g2r-act" data-done>${label}</button>`; return acts.querySelector('[data-done]'); };
  const hint = (el) => { if (!el) return; el.classList.remove('g2r-hint'); void el.offsetWidth; el.classList.add('g2r-hint'); };
  const ctx = { m, n, ...s, ok, bad, say, doneBtn, hint, play, acts, q };
  ({ tally: modeTally, draw: modeDraw, read: modeRead, chance: modeChance })[m.mode](ctx);
}

/** Vạch kiểm đếm: nhóm 5 (4 vạch đứng + 1 gạch chéo), như Vở BT. */
function tallySvg(k) {
  if (!k) return '';
  let out = '';
  for (let g = 0; g * 5 < k; g++) {
    const c = Math.min(5, k - g * 5);
    let d = '';
    for (let i = 0; i < Math.min(4, c); i++) d += `M${4 + i * 7} 3 V29 `;
    const slash = c === 5 ? `<path d="M1 25 L29 7" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` : '';
    out += `<svg class="g2r-tally" viewBox="0 0 32 32" aria-hidden="true"><path d="${d}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>${slash}</svg>`;
  }
  return out;
}

// ════ Cấp 1: kiểm đếm ═══════════════════════════════════════════════════════════════════════════
function modeTally({ m, n, speak, row, ask, ok, bad, say, play, hint }) {
  const th = THEMES.find(t => t.id === m.theme);
  const K = th.kinds;
  // Cảnh (phần lớn màn): nền trường / trại / bến xe, đường chạy ngang trước cổng. Dưới: mỗi loại một nút to để gạch;
  // vạch kiểm đếm nằm ngay trong nút, lúc kiểm chứng xe xếp hàng (đánh số) ở đáy nút.
  play.closest('.g3f-scene').classList.add('g2r-tally-on');
  play.innerHTML = `
    <div class="g2r-town g2r-town-${th.id}">
      ${backdrop(th.id)}<span class="g2r-place">📍 ${th.place}</span>
      <div class="g2r-road g2r-road-${th.id}" data-road><span class="g2r-zebra"></span><div class="g2r-lane" data-lane></div></div>
      <span class="g2r-cam">🎤</span>
    </div>
    <div class="g2r-cols">${K.map((k, i) => `
      <button type="button" class="g2r-col g2r-colhead" data-k="${i}" data-col="${i}">
        <span class="g2r-kpic">${sidePic(k.id, 'g2r-colpic')}<span class="g2r-kname">${k.name}</span></span>
        <span class="g2r-marks" data-marks="${i}"></span>
        <span class="g2r-stack" data-stack="${i}"></span>
      </button>`).join('')}</div>`;
  const lane = play.querySelector('[data-lane]');
  const marks = K.map(() => 0);
  const st = { i: 0, waiting: false, over: false, picked: null };
  const unitName = (k) => `${K[k].name}`;
  // Xe đi vào, dừng ở chỗ phóng viên, chờ bé gạch rồi đi tiếp.
  function next() {
    if (st.i >= m.seq.length) return finish();
    const k = m.seq[st.i];
    lane.innerHTML = `<span class="g2r-veh g2r-in" data-veh>${sidePic(K[k].id, 'g2r-vpic')}</span>`;
    const v = lane.firstElementChild;
    setTimeout(() => { st.waiting = true; v.classList.add('g2r-wait'); }, calmMotion() ? 900 : 650);
  }
  play.addEventListener('click', (e) => {
    const head = e.target.closest('.g2r-colhead');
    if (!head) return;
    const k = +head.dataset.k;
    if (st.picked === 'choose') return chooseKind(k, head);
    if (!st.waiting) { if (!st.over) hint(lane); return; }
    st.waiting = false;
    sfx.tap();
    marks[k]++;
    play.querySelector(`[data-marks="${k}"]`).innerHTML = tallySvg(marks[k]);
    const v = lane.querySelector('[data-veh]');
    v.classList.remove('g2r-in', 'g2r-wait');
    v.classList.add('g2r-out');
    st.i++;
    say(`Đã đếm ${st.i}/${m.seq.length}`);
    setTimeout(next, calmMotion() ? 700 : 480);
  });
  function finish() {
    st.over = true;
    lane.innerHTML = ''; // đường giữ nguyên chỗ: các cột không nhảy lên
    say(th.what === 'xe' ? 'Hết xe rồi!' : 'Hết rồi!');
    if (m.ask === 'count') {
      const k = m.target;
      speak(`Có bao nhiêu ${th.unit} ${unitName(k)} đã đi qua?`, null, `Có ${WANT(`bao nhiêu ${th.unit} ${unitName(k)}`)}?`);
      ask(row(sidePic(K[k].id, 'g2r-billpic'), unitName(k), `${Q} ${th.unit}`, true), th.unit, async (v, pad) => {
        pad.lock();
        await parade();
        const fact = `Có <b>${m.counts[k]} ${th.unit} ${unitName(k)}</b> đi qua.`;
        if (v === m.counts[k]) { pad.lock('g3g-keypad-ok'); return ok(fact, `Đúng rồi, ${m.counts[k]} ${th.unit} ${unitName(k)}!`); }
        pad.lock('g3g-keypad-bad');
        bad(`Có ${m.counts[k]} ${th.unit} cơ!`, fact, 'Gạch một vạch cho mỗi lần đi qua. Đếm các nhóm 5 vạch trước: 5, rồi đếm thêm từng vạch lẻ.');
      });
    } else {
      st.picked = 'choose';
      const w = m.ask === 'most' ? 'nhiều nhất' : 'ít nhất';
      speak(`Loại ${th.what} nào đi qua ${w}? ${cap(n.you)} chạm vào tên loại đó!`, null, `Loại nào ${WANT(w)}? Chạm vào tên loại đó!`);
      play.querySelectorAll('.g2r-colhead').forEach(b => b.classList.add('g2r-pickable'));
    }
  }
  async function chooseKind(k, head) {
    if (st.picked !== 'choose') return;
    st.picked = 'done';
    sfx.tap();
    head.classList.add('g2r-picked');
    play.querySelectorAll('.g2r-colhead').forEach(b => b.classList.remove('g2r-pickable'));
    await parade();
    const val = m.ask === 'most' ? Math.max(...m.counts) : Math.min(...m.counts);
    const right = m.counts.indexOf(val);
    play.querySelector(`[data-col="${right}"]`).classList.add('g2r-col-win');
    const w = m.ask === 'most' ? 'nhiều nhất' : 'ít nhất';
    const fact = `${cap(K.map((x, i) => `${x.name}: ${m.counts[i]}`).join(', '))}. ${cap(unitName(right))} ${w}: <b>${val} ${th.unit}</b>.`;
    if (k === right) return ok(fact, `Đúng rồi, ${unitName(right)} ${w}!`);
    bad(`${cap(unitName(right))} mới ${w}!`, fact, `Đếm vạch của từng cột rồi so sánh: cột có ${m.ask === 'most' ? 'số lớn nhất là nhiều nhất' : 'số bé nhất là ít nhất'}.`);
  }
  // Kiểm chứng: mọi chiếc xe / con vật vừa đi qua chạy về xếp hàng đúng cột, đánh số.
  async function parade() {
    const from = play.querySelector('[data-road]').getBoundingClientRect();
    const num = K.map(() => 0);
    const gap = calmMotion() ? 260 : 200;
    for (const k of m.seq) {
      const stack = play.querySelector(`[data-stack="${k}"]`);
      stack.insertAdjacentHTML('beforeend', `<span class="g2r-chip g2r-ghost">${sidePic(K[k].id)}<b>${++num[k]}</b></span>`);
      const el = stack.lastElementChild;
      const to = el.getBoundingClientRect();
      // Bay từ chỗ phóng viên đứng (giữa đường) về hàng của cột.
      flyOne(sidePic(K[k].id, '', 'width="100%" height="100%"'), { left: from.left + from.width / 2 - to.width, top: from.top + from.height / 2 - to.height, width: to.width * 2, height: to.height * 2 }, to, {
        minMs: 340, maxMs: 520, onLand: () => { el.classList.remove('g2r-ghost'); sfx.pop(num[k] % 8); },
      });
      await sleep(gap);
    }
    await sleep(700);
    K.forEach((_, k) => {
      const col = play.querySelector(`[data-col="${k}"]`);
      if (marks[k] !== m.counts[k]) col.classList.add('g2r-col-off');
      col.querySelector('.g2r-marks').insertAdjacentHTML('beforeend', `<b class="g2r-n">${m.counts[k]}</b>`);
    });
  }
  speak(`${cap(n.me)} đứng ở ${th.place.toLowerCase()} đếm ${th.what}. Mỗi khi có một ${th.what === 'xe' ? 'chiếc xe' : 'con vật'} đi qua, ${n.you} chạm vào đúng cột để gạch một vạch!`, null,
    `${th.what === 'xe' ? 'Xe' : 'Con vật'} đi qua: chạm ${WANT('đúng cột')} để gạch một vạch!`);
  say(`Đã đếm 0/${m.seq.length}`);
  setTimeout(next, 600);
}

// ════ Cấp 2: biểu đồ tranh ══════════════════════════════════════════════════════════════════════
/** Cảnh nền phủ kín phần chơi (trời + cảnh vẽ ở đáy); nội dung đặt lên trên, giãn hết chỗ còn lại. */
const sceneWrap = (id, inner, cls = '') => `<div class="g2r-gscene g2r-gscene-${id} ${cls}">${backdrop(id)}<div class="g2r-gwrap">${inner}</div></div>`;
function graphHtml(g, counts, { editable = false, filled = false } = {}) {
  return `<div class="g2r-graph${editable ? ' g2r-edit' : ''}"><div class="g2r-gtitle">📊 ${g.title}</div>${g.kinds.map((k, i) => `
    <div class="g2r-grow" data-row="${i}">
      <button type="button" class="g2r-glabel" data-k="${i}" ${editable ? '' : 'tabindex="-1"'}><span>${k.pic}</span><span>${k.name}</span></button>
      <div class="g2r-gcells" data-cells="${i}">${filled ? Array.from({ length: counts[i] }, (_, j) => `<span class="g2r-cell" data-c="${j}">${k.pic}</span>`).join('') : ''}</div>
    </div>`).join('')}<div class="g2r-gnote">Mỗi ${g.kinds[0].pic} là 1 ${g.unit}</div></div>`;
}
function modeDraw({ m, n, speak, ok, bad, say, play, doneBtn, hint }) {
  const g = GRAPHS[m.graph];
  // Bảng số liệu (như bảng kiểm đếm của Vở BT) + biểu đồ trống: chạm hàng để thêm hình, chạm hình (có dấu ✕) để bớt.
  // Màn ngang: bảng số liệu dựng đứng bên trái, biểu đồ có cả chiều cao. Màn dọc: bảng nằm ngang phía trên (như Vở BT).
  play.innerHTML = sceneWrap(g.scene, `
    <table class="g2r-table g2r-table-h"><caption>Bảng số liệu</caption><tr>${g.kinds.map(k => `<th>${k.pic}<br><span>${k.name}</span></th>`).join('')}</tr>
      <tr>${m.counts.map(c => `<td>${c}</td>`).join('')}</tr></table>
    <table class="g2r-table g2r-table-v"><caption>Bảng số liệu</caption>${g.kinds.map((k, i) => `<tr><th>${k.pic}<span>${k.name}</span></th><td>${m.counts[i]}</td></tr>`).join('')}</table>
    ${graphHtml(g, m.counts, { editable: true })}`, 'g2r-gscene-draw');
  const have = m.counts.map(() => 0);
  let over = false;
  play.addEventListener('click', (e) => {
    if (over) return;
    const lab = e.target.closest('.g2r-glabel'), cell = e.target.closest('.g2r-cell'), cells = e.target.closest('.g2r-gcells');
    const i = lab ? +lab.dataset.k : cells ? +cells.dataset.cells : -1;
    if (i < 0) return;
    const box = play.querySelector(`[data-cells="${i}"]`);
    if (cell) {
      if (cell.classList.contains('g2r-ghost') || cell.classList.contains('g2r-cell-out')) return;
      // Bớt đúng hình vừa chạm: thu nhỏ biến mất, các hình sau dồn lên.
      cell.classList.add('g2r-cell-out');
      have[i]--;
      sfx.tap();
      setTimeout(() => {
        cell.remove();
        [...box.children].forEach((c, j) => { c.dataset.c = j; });
      }, calmMotion() ? 260 : 200);
      return;
    }
    if (have[i] >= 10) return hint(box);
    box.insertAdjacentHTML('beforeend', `<span class="g2r-cell g2r-ghost" data-c="${have[i]}">${g.kinds[i].pic}</span>`);
    const el = box.lastElementChild;
    have[i]++;
    const from = play.querySelector(`[data-k="${i}"]`).getBoundingClientRect();
    flyOne(`<span class="g2r-flypic">${g.kinds[i].pic}</span>`, { left: from.left, top: from.top, width: from.height * 0.8, height: from.height * 0.8 }, el.getBoundingClientRect(), {
      minMs: 260, maxMs: 380, onLand: () => { el.classList.remove('g2r-ghost'); sfx.pop(have[i] % 8); },
    });
  });
  const btn = doneBtn('✓ Vẽ xong');
  btn.onclick = async () => {
    if (over) return;
    if (!have.some(Boolean)) {
      speak(`${cap(n.you)} chạm vào từng hàng để thêm hình trước đã!`, null, 'Chạm vào hàng để thêm hình!');
      return hint(play.querySelector('.g2r-graph'));
    }
    over = true;
    btn.disabled = true;
    play.querySelector('.g2r-graph').classList.remove('g2r-edit'); // ẩn dấu ✕ trước khi đếm
    sfx.swish();
    // Kiểm chứng: đếm từng hàng, so với bảng số liệu.
    let good = true;
    for (let i = 0; i < m.counts.length; i++) {
      const row = play.querySelector(`[data-row="${i}"]`);
      const cs = [...row.querySelectorAll('.g2r-cell:not(.g2r-cell-out)')];
      for (let j = 0; j < cs.length; j++) {
        cs[j].insertAdjacentHTML('beforeend', `<b class="g2r-cnum">${j + 1}</b>`);
        if (j >= m.counts[i]) cs[j].classList.add('g2r-cell-extra');
        sfx.pop(j % 8);
        await sleep(calmMotion() ? 150 : 110);
      }
      const okRow = have[i] === m.counts[i];
      if (!okRow) good = false;
      row.classList.add(okRow ? 'g2r-row-ok' : 'g2r-row-bad');
      row.insertAdjacentHTML('beforeend', `<b class="g2r-rowmark">${okRow ? '✓' : `${have[i]} ≠ ${m.counts[i]}`}</b>`);
      await sleep(300);
    }
    const fact = `Biểu đồ đúng: ${g.kinds.map((k, i) => `${m.counts[i]} ${k.pic}`).join(', ')}.`;
    say(good ? 'Biểu đồ đúng với bảng số liệu!' : 'Có hàng chưa đúng số liệu.');
    if (good) return ok(fact, 'Biểu đồ đẹp quá! Đúng hết rồi!');
    bad('Có hàng chưa đúng rồi!', fact, 'Mỗi hàng có số hình đúng bằng số trong bảng: đếm lại từng hàng.');
  };
  speak(`${cap(n.you)} vẽ biểu đồ tranh theo bảng số liệu giúp ${n.me}. Chạm vào tên mỗi hàng để thêm một hình, chạm vào hình có dấu ✕ để bớt!`, null,
    `Vẽ biểu đồ ${WANT('đúng bảng số liệu')}: chạm hàng để thêm hình, chạm ✕ để bớt!`);
}

function modeRead({ m, n, speak, row, ask, ok, bad, say, play }) {
  const g = GRAPHS[m.graph];
  play.innerHTML = sceneWrap(g.scene, graphHtml(g, m.counts, { filled: true }));
  const K = g.kinds;
  if (m.ask === 'diff') {
    const [a, b] = m.pair;
    const d = m.counts[a] - m.counts[b];
    speak(`Số ${K[a].name} nhiều hơn số ${K[b].name} bao nhiêu ${g.unit}?`, null, `${K[a].pic} nhiều hơn ${K[b].pic} ${WANT(`mấy ${g.unit}`)}?`);
    ask(row(K[a].pic, `Hơn ${K[b].pic}`, `${Q} ${g.unit}`, true), g.unit, async (v, pad) => {
      pad.lock();
      // Ghép cặp: hình thứ j của hai hàng; phần thừa của hàng nhiều hơn được đánh số.
      const ra = play.querySelector(`[data-row="${a}"]`), rb = play.querySelector(`[data-row="${b}"]`);
      play.querySelectorAll('.g2r-grow').forEach(r => { if (r !== ra && r !== rb) r.classList.add('g2r-dim'); });
      const ca = [...ra.querySelectorAll('.g2r-cell')], cb = [...rb.querySelectorAll('.g2r-cell')];
      for (let j = 0; j < cb.length; j++) { ca[j].classList.add('g2r-paired'); cb[j].classList.add('g2r-paired'); sfx.tap(); await sleep(calmMotion() ? 200 : 150); }
      for (let j = cb.length; j < ca.length; j++) {
        ca[j].classList.add('g2r-cell-extra');
        ca[j].insertAdjacentHTML('beforeend', `<b class="g2r-cnum">${j - cb.length + 1}</b>`);
        sfx.pop(j - cb.length);
        await sleep(380);
      }
      say(`${m.counts[a]} ${MINUS} ${m.counts[b]} = <b class="g2r-ans">${d}</b>`);
      const fact = `${cap(K[a].name)} ${m.counts[a]}, ${K[b].name} ${m.counts[b]}: ${m.counts[a]} ${MINUS} ${m.counts[b]} = <b>${d} ${g.unit}</b>.`;
      if (v === d) { pad.lock('g3g-keypad-ok'); return ok(fact, `Đúng rồi, nhiều hơn ${d} ${g.unit}!`); }
      pad.lock('g3g-keypad-bad');
      bad(`Nhiều hơn ${d} ${g.unit} cơ!`, fact, 'Đếm số hình mỗi hàng rồi lấy số lớn trừ số bé. Hoặc ghép cặp từng hình, đếm phần thừa.');
    });
    return;
  }
  const w = m.ask === 'most' ? 'nhiều nhất' : 'ít nhất';
  speak(`Nhìn biểu đồ: loại nào ${w}? ${cap(n.you)} chạm vào tên loại đó!`, null, `Loại nào ${WANT(w)}? Chạm vào tên!`);
  play.querySelectorAll('.g2r-glabel').forEach(b => b.classList.add('g2r-pickable'));
  let done = false;
  play.addEventListener('click', async (e) => {
    const lab = e.target.closest('.g2r-glabel');
    if (!lab || done) return;
    done = true;
    sfx.tap();
    const k = +lab.dataset.k;
    lab.classList.add('g2r-picked');
    play.querySelectorAll('.g2r-glabel').forEach(b => b.classList.remove('g2r-pickable'));
    // Kiểm chứng: đánh số từng hàng.
    for (let i = 0; i < K.length; i++) {
      const cs = [...play.querySelectorAll(`[data-row="${i}"] .g2r-cell`)];
      cs.forEach((c, j) => c.insertAdjacentHTML('beforeend', `<b class="g2r-cnum">${j + 1}</b>`));
      sfx.pop(i * 2);
      await sleep(380);
    }
    const val = m.ask === 'most' ? Math.max(...m.counts) : Math.min(...m.counts);
    const right = m.counts.indexOf(val);
    play.querySelector(`[data-row="${right}"]`).classList.add('g2r-row-ok');
    const fact = `${cap(K.map((x, i) => `${x.name} ${m.counts[i]}`).join(', '))}: ${K[right].name} ${w} (<b>${val} ${g.unit}</b>).`;
    if (k === right) return ok(fact, `Đúng rồi, ${K[right].name} ${w}!`);
    bad(`${cap(K[right].name)} mới ${w}!`, fact, m.ask === 'most' ? 'Hàng có nhiều hình nhất là loại nhiều nhất.' : 'Hàng có ít hình nhất là loại ít nhất.');
  });
}

// ════ Cấp 3: chắc chắn, có thể, không thể ═══════════════════════════════════════════════════════
function bagSvg(bag) {
  // Túi lưới trong suốt, thấy bi bên trong.
  let balls = '';
  // Hàng 3 viên rồi hàng 2 viên (nằm vào khe hàng dưới), xen kẽ từ đáy túi lên.
  const spots = [];
  for (let r = 0; spots.length < bag.length; r++) {
    const k = r % 2 ? 2 : 3;
    for (let c = 0; c < k; c++) spots.push({ x: (r % 2 ? 67 : 54) + c * 26, y: 140 - r * 21 });
  }
  bag.forEach((c, i) => {
    const { x, y } = spots[i];
    balls += `<g class="g2r-ball" data-b="${i}"><circle cx="${x}" cy="${y}" r="11" fill="${BALLS[c].fill}" stroke="${INK}" stroke-width="2"/><circle cx="${x - 3.5}" cy="${y - 3.5}" r="3" fill="#fff" opacity=".6"/></g>`;
  });
  let net = '';
  for (let i = 0; i < 7; i++) net += `M${30 + i * 14} 54 L${42 + i * 10} 160 `;
  for (let j = 0; j < 5; j++) net += `M${28 + j * 2} ${70 + j * 20} H${132 - j * 2} `;
  return `<svg class="g2r-bag" viewBox="0 0 160 175" aria-hidden="true">
    <path d="M30 50 Q20 120 46 160 Q80 172 114 160 Q140 120 130 50 Z" fill="#F8FAFC" fill-opacity=".55" stroke="${INK}" stroke-width="2.6"/>
    ${balls}
    <path d="${net}" stroke="#94A3B8" stroke-width="1.2" opacity=".85" fill="none"/>
    <path d="M30 50 Q20 120 46 160 Q80 172 114 160 Q140 120 130 50" fill="none" stroke="${INK}" stroke-width="2.6"/>
    <path d="M26 48 Q80 30 134 48" stroke="#B45309" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M60 40 Q80 10 100 40" stroke="#B45309" stroke-width="3.5" fill="none"/>
  </svg>`;
}
const ballHtml = (c) => `<svg viewBox="0 0 24 24" width="100%" height="100%"><circle cx="12" cy="12" r="10.5" fill="${BALLS[c].fill}" stroke="${INK}" stroke-width="1.8"/><circle cx="8.5" cy="8.5" r="2.8" fill="#fff" opacity=".6"/></svg>`;

function modeChance({ m, n, speak, ok, bad, say, play }) {
  const want = BALLS[m.want];
  play.innerHTML = sceneWrap('xe', `<div class="g2r-chance">
      <div class="g2r-bagbox">${bagSvg(m.bag)}</div>
      <div class="g2r-side">
        <div class="g2r-stmt">🤏 <b class="g2r-blank">…</b> lấy được <span class="g2r-dot" style="background:${want.fill}"></span> <b>bi ${want.name}</b></div>
        <div class="g2r-cards">${CARDS.map(c => `<button type="button" class="g2r-card" data-card="${c.key}">${c.label}</button>`).join('')}</div>
        <div class="g2r-draws" data-draws></div>
      </div></div>`);
  const rnd = makeRng(m.seed);
  let done = false;
  play.addEventListener('click', async (e) => {
    const card = e.target.closest('.g2r-card');
    if (!card || done) return;
    done = true;
    sfx.tap();
    card.classList.add('g2r-picked');
    play.querySelectorAll('.g2r-card').forEach(b => { b.disabled = true; });
    play.querySelector('.g2r-stmt b').textContent = card.textContent;
    // Bốc thử 5 lần (bốc xong bỏ lại vào túi). "Có thể": cho thấy cả lần được và lần không được bi màu đó.
    const draws = [];
    for (let t = 0; t < 5; t++) draws.push(m.bag[Math.floor(rnd() * m.bag.length)]);
    if (m.key === 'may') {
      const other = m.bag.find(c => c !== m.want);
      if (!draws.includes(m.want)) draws[1] = m.want;
      if (!draws.some(c => c !== m.want)) draws[3] = other;
    }
    say('Bốc thử 5 lần…');
    const box = play.querySelector('[data-draws]');
    const bagR = play.querySelector('.g2r-bag').getBoundingClientRect();
    for (let t = 0; t < 5; t++) {
      const c = draws[t];
      box.insertAdjacentHTML('beforeend', `<span class="g2r-drawn g2r-ghost${c === m.want ? ' g2r-hit' : ''}">${ballHtml(c)}</span>`);
      const el = box.lastElementChild;
      const to = el.getBoundingClientRect();
      flyOne(ballHtml(c), { left: bagR.left + bagR.width / 2 - to.width / 2, top: bagR.top + bagR.height * 0.25, width: to.width, height: to.height }, to, {
        minMs: 420, maxMs: 600, onLand: () => { el.classList.remove('g2r-ghost'); sfx.pop(c === m.want ? 6 : 2); },
      });
      await sleep(calmMotion() ? 800 : 650);
    }
    await sleep(400);
    const hits = draws.filter(c => c === m.want).length;
    say(`${hits}/5 lần được bi ${want.name}`);
    const label = CARDS.find(c => c.key === m.key).label;
    const why = m.key === 'sure' ? `Túi chỉ có bi ${want.name}` : m.key === 'never' ? `Túi không có bi ${want.name} nào` : `Túi có bi ${want.name} và bi màu khác`;
    const fact = `${why}: <b>${label.toLowerCase()}</b> lấy được bi ${want.name}.`;
    if (card.dataset.card === m.key) return ok(fact, `Đúng rồi! ${label} lấy được bi ${want.name}.`);
    bad(`${label} lấy được bi ${want.name} mới đúng!`, fact, 'Nhìn kĩ trong túi: toàn bi màu đó là chắc chắn, có cả màu khác là có thể, không có bi màu đó là không thể.');
  });
  speak(`Trong túi có ${m.bag.length} viên bi. ${cap(n.you)} lấy ra một viên mà không nhìn. Chắc chắn, có thể hay không thể lấy được bi ${want.name}?`, null,
    `${WANT('Chắc chắn, có thể hay không thể')} lấy được bi ${want.name}?`);
}

function injectRepStyles() {
  if (document.getElementById('g2r-styles')) return;
  const st = document.createElement('style');
  st.id = 'g2r-styles';
  st.textContent = `
    .g3f-theme-rep .g3f-awning { background: repeating-linear-gradient(90deg, #38BDF8 0 30px, #F0F9FF 30px 60px); border-bottom-color: #0369A1; }
    .g3f-theme-rep .g3f-counter { background: linear-gradient(#F0F9FF, #E0F2FE); border-bottom-color: #0284C7; }
    .g3f-theme-rep .g3f-sign { background: #0284C7; border-color: #075985; color: #fff; text-shadow: 0 1px 0 rgba(7,89,133,.5); }
    .g3f-theme-rep .g3f-sign strong { color: #FEF08A; }
    .g3f-theme-rep .g3f-main::after { background: rgba(15,23,42,0.06); }
    .g2r-nopad .g3f-ask { display: none; }
    .g2r-nopad .g3f-npc { flex: 1 1 auto; }
    .g2r-nopad .g3f-npc img { max-height: 420px; }
    .g2r-sign-pic { font-size: 1.7em; line-height: 1; }
    .g2r-bench { flex: 1 1 0; min-height: 0; width: 100%; display: flex; flex-direction: column; gap: .45rem; padding: clamp(2.8rem, 8vh, 4rem) .4rem .4rem; box-sizing: border-box; font-family: 'Baloo 2', Quicksand, sans-serif; }
    .g2r-board { flex: none; display: flex; justify-content: center; font: 800 clamp(1rem, min(2.3vh + .5rem, 5vw), 1.6rem) 'Baloo 2', Quicksand, sans-serif; color: #075985; }
    .g2r-say { background: #fff; border-radius: .8rem; padding: .05em .7em; box-shadow: 0 3px 0 #BAE6FD; }
    .g2r-ans { color: #16A34A; }
    .g2r-play { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; gap: .5rem; justify-content: safe center; }
    .g2r-acts { flex: none; display: flex; justify-content: center; }
    .g2r-act { border: 4px solid #fff; border-radius: 999px; padding: .3em 1.3em; background: linear-gradient(180deg, #4ADE80, #16A34A); color: #fff; font: 800 clamp(1.1rem, 2.2vh + .6rem, 1.7rem) 'Baloo 2', Quicksand, sans-serif; text-shadow: 0 2px 0 rgba(21,128,61,.5); box-shadow: 0 5px 0 #15803D, 0 8px 18px rgba(21,128,61,.3); cursor: pointer; }
    .g2r-act:disabled { opacity: .4; cursor: default; }
    .g3g-has-result .g2r-acts { visibility: hidden; }
    .g2r-hint { animation: g2rNudge .6s ease; }
    @keyframes g2rNudge { 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
    .g2r-ghost { visibility: hidden; }
    .g2r-flypic { display: grid; place-items: center; width: 100%; height: 100%; font-size: 1.6rem; line-height: 1; }

    /* Kiểm đếm: cảnh lớn (nền + đường) ở trên, ba nút to ở dưới. Mọi kích thước cố định suốt lượt. */
    .g2r-town { position: relative; flex: 1 1 0; min-height: 9rem; border-radius: 1rem; overflow: hidden; border: 3px solid #0369A1; background: linear-gradient(#7DD3FC, #E0F2FE 55%); }
    .g2r-town-vat { border-color: #15803D; background: linear-gradient(#93C5FD, #ECFCCB 60%); }
    .g2r-backdrop { position: absolute; left: 0; right: 0; top: 0; bottom: 44%; width: 100%; height: 56%; display: block; }
    .g2r-place { position: absolute; z-index: 2; top: .35rem; left: .5rem; font-weight: 800; font-size: clamp(.8rem, 1.6vh + .2rem, 1.05rem); color: #075985; background: rgba(255,255,255,.85); border-radius: .6rem; padding: 0 .5em; }
    /* Đường: 44% đáy cảnh (vỉa hè trên, mặt đường, vỉa hè dưới); xe cao ~60% đường, dừng ở vạch qua đường trước cổng. */
    .g2r-road { position: absolute; left: 0; right: 0; bottom: 0; height: 44%; container-type: inline-size;
      background: linear-gradient(#CBD5E1 0 10%, #94A3B8 10% 13%, #475569 13% 84%, #94A3B8 84% 87%, #86EFAC 87%); }
    .g2r-road::after { content: ''; position: absolute; left: 0; right: 0; top: 48.5%; border-top: 5px dashed #FDE047; opacity: .9; transform: translateY(-50%); }
    .g2r-zebra { position: absolute; left: 50%; top: 13%; bottom: 16%; width: clamp(6rem, 13%, 11rem); transform: translateX(-50%); background: repeating-linear-gradient(180deg, rgba(248,250,252,.55) 0 9%, transparent 9% 17%); }
    .g2r-road-vat { background: linear-gradient(#A3E635 0 10%, #A16207 10% 13%, #D6A15B 13% 84%, #A16207 84% 87%, #86EFAC 87%); }
    .g2r-road-vat::after, .g2r-road-vat .g2r-zebra { display: none; }
    .g2r-cam { position: absolute; z-index: 2; left: 50%; bottom: -.1rem; transform: translateX(-50%); font-size: clamp(1.3rem, 4vh, 2.2rem); line-height: 1; }
    .g2r-lane { position: absolute; inset: 0; }
    .g2r-veh { position: absolute; top: 48%; left: 50%; height: 62%; aspect-ratio: 3 / 2; transform: translate(-50%, -52%); z-index: 1; }
    /* Viền trắng quanh hình: không lẫn vào mặt đường. Vầng sáng vàng khi xe đang chờ bé gạch. */
    .g2r-vpic { display: block; width: 100%; height: 100%; overflow: visible; filter: drop-shadow(3px 0 0 #fff) drop-shadow(-3px 0 0 #fff) drop-shadow(0 3px 0 #fff) drop-shadow(0 -3px 0 #fff); }
    .g2r-veh::before { content: ''; position: absolute; inset: -16% -12%; z-index: -1; border-radius: 50%; background: radial-gradient(closest-side, rgba(254,240,138,.95), rgba(254,240,138,0)); opacity: 0; transition: opacity .3s; }
    .g2r-veh::after { content: ''; position: absolute; left: 12%; right: 12%; bottom: -3%; height: 10%; z-index: -1; border-radius: 50%; background: rgba(15,23,42,.35); }
    .g2r-wait::before { opacity: 1; }
    .g2r-in { animation: g2rIn .65s cubic-bezier(.2,.7,.3,1) both; }
    .g2r-wait .g2r-vpic { animation: g2rBob 1.1s ease-in-out infinite; }
    .g2r-out { animation: g2rOut .5s cubic-bezier(.6,0,.9,.5) both; }
    @keyframes g2rIn { from { transform: translate(calc(-50% + 80cqw), -52%); } }
    @keyframes g2rOut { to { transform: translate(calc(-50% - 85cqw), -52%); } }
    @keyframes g2rBob { 50% { transform: translateY(-6%); } }
    @media (prefers-reduced-motion: reduce) { .g2r-in { animation-duration: .9s; } .g2r-out { animation-duration: .7s; } .g2r-wait .g2r-vpic { animation-duration: 2.2s; } }
    .g2r-vsvg { display: block; overflow: visible; }
    .g2r-billpic { width: 2.1em; height: 1.4em; }
    /* Ba nút to: hình + tên bên trái, vạch kiểm đếm bên phải, hàng xe kiểm chứng ở đáy nút. */
    .g2r-cols { flex: none; height: clamp(8rem, 25vh, 13rem); display: flex; gap: .6rem; }
    .g2r-col { flex: 1 1 0; min-width: 0; display: grid; grid-template-columns: auto 1fr; grid-template-rows: 1fr auto; column-gap: .6rem; row-gap: .2rem; align-items: center;
      border: 4px solid #0284C7; border-radius: 1.1rem; background: linear-gradient(#fff, #E0F2FE); color: #075985; padding: .4rem .6rem .35rem; cursor: pointer; touch-action: manipulation; box-shadow: 0 6px 0 #0369A1; text-align: left; font-family: 'Baloo 2', Quicksand, sans-serif; }
    .g2r-col:active { transform: translateY(4px); box-shadow: 0 2px 0 #0369A1; }
    .g2r-kpic { grid-row: 1; display: flex; flex-direction: column; align-items: center; gap: 0; }
    .g2r-colpic { flex: none; width: clamp(3.6rem, 11vh, 7rem); height: auto; aspect-ratio: 3 / 2; }
    .g2r-kname { font-weight: 800; font-size: clamp(1rem, 2.2vh + .35rem, 1.5rem); line-height: 1.1; white-space: nowrap; }
    .g2r-pickable { animation: g2rPulse 1.2s ease-in-out infinite; }
    @keyframes g2rPulse { 50% { box-shadow: 0 6px 0 #0369A1, 0 0 0 6px #FDE68A; } }
    .g2r-picked { background: #FEF3C7 !important; border-color: #F59E0B !important; }
    .g2r-marks { grid-row: 1; min-width: 0; display: flex; flex-wrap: wrap; align-items: center; gap: .2rem; }
    .g2r-tally { width: clamp(2.4rem, 8vh, 4.4rem); height: clamp(2.4rem, 8vh, 4.4rem); }
    .g2r-n { margin-left: auto; font-size: clamp(1.4rem, 4vh, 2.2rem); color: #16A34A; }
    .g2r-col-off .g2r-marks { background: #FEE2E2; border-radius: .5rem; }
    .g2r-col-win { border-color: #16A34A; box-shadow: 0 6px 0 #15803D, 0 0 0 4px #BBF7D0; }
    /* Hàng xe về nút (tối đa 6 chiếc một hàng): dải "chỗ đỗ" giữ sẵn chỗ từ đầu. */
    .g2r-stack { grid-column: 1 / -1; grid-row: 2; height: clamp(1.6rem, 5vh, 2.8rem); display: flex; gap: .25rem; align-items: center; border-top: 2px dashed #BAE6FD; padding-top: .15rem; container-type: inline-size; }
    .g2r-chip { position: relative; flex: none; height: 100%; aspect-ratio: 3 / 2; max-width: calc(16.6cqi - .25rem); }
    .g2r-chip .g2r-vsvg { width: 100%; height: 100%; }
    .g2r-chip b, .g2r-cnum { position: absolute; right: -.25rem; top: -.35rem; min-width: 1rem; height: 1rem; border-radius: 999px; background: #F97316; color: #fff; font-size: .7rem; line-height: 1rem; text-align: center; }
    /* Hết lượt cảnh đã trống: thẻ kết quả đè lên khoảng trời của cảnh, không che các nút. */
    .g2r-tally-on .g3f-main > .g3g-result { bottom: auto; top: clamp(5.5rem, 17vh, 9rem); }

    /* Cảnh nền chung của biểu đồ tranh và túi bi: phủ kín phần chơi, nội dung giãn hết chỗ (không khoảng trống thừa). */
    .g2r-gscene { position: relative; flex: 1 1 0; min-height: 0; border-radius: 1rem; overflow: hidden; border: 3px solid #0369A1; background: linear-gradient(#7DD3FC, #E0F2FE 60%, #BBF7D0 60%, #86EFAC); }
    .g2r-gscene-vat, .g2r-gscene-orchard { border-color: #15803D; background: linear-gradient(#93C5FD, #ECFCCB 62%, #BEF264 62%, #84CC16); }
    .g2r-gscene-lantern { border-color: #1E1B4B; background: linear-gradient(#1E1B4B, #4338CA 62%, #334155 62%, #1F2937); }
    .g2r-gscene .g2r-backdrop { top: auto; bottom: 0; height: 52%; opacity: .95; }
    .g2r-gwrap { position: relative; z-index: 1; height: 100%; box-sizing: border-box; padding: clamp(.4rem, 1.4vh, .9rem); display: flex; flex-direction: column; gap: clamp(.3rem, 1.2vh, .7rem); }
    /* Bảng số liệu: biển gỗ treo phía trên, chữ to. */
    .g2r-table { flex: none; align-self: center; border-collapse: separate; border-spacing: 0; background: #fff; font-weight: 800; color: #075985; border: 5px solid #B45309; border-radius: .9rem; overflow: hidden; box-shadow: 0 5px 0 #78350F; }
    .g2r-table caption { caption-side: top; font: 800 clamp(.95rem, 2vh + .3rem, 1.35rem) 'Baloo 2', sans-serif; color: #fff; background: #B45309; border-radius: .7rem .7rem 0 0; padding: 0 .8em; width: max-content; margin: 0 auto -1px; }
    .g2r-table th, .g2r-table td { border-right: 2px solid #BAE6FD; padding: .1rem clamp(.7rem, 2vw, 1.8rem); text-align: center; font-size: clamp(1.3rem, 3.6vh + .3rem, 2.4rem); }
    .g2r-table th:last-child, .g2r-table td:last-child { border-right: 0; }
    .g2r-table td { border-top: 2px solid #BAE6FD; color: #9A3412; }
    .g2r-table th { font-size: clamp(1.8rem, 5vh + .3rem, 3.4rem); line-height: 1.05; }
    .g2r-table th span { font-size: .42em; }
    .g2r-table-v { display: none; }
    @media (orientation: landscape) {
      .g2r-gscene-draw .g2r-gwrap { flex-direction: row; align-items: stretch; }
      .g2r-gscene-draw .g2r-table-h { display: none; }
      .g2r-gscene-draw .g2r-table-v { display: table; align-self: center; }
      .g2r-table-v th { display: flex; align-items: center; gap: .3rem; padding: .15rem .6rem; text-align: left; border-right: 2px solid #BAE6FD; }
      .g2r-table-v th span { font-size: .45em; }
      .g2r-table-v td { border-top: 0; padding: .15rem 1rem; }
      .g2r-table-v tr + tr th, .g2r-table-v tr + tr td { border-top: 2px solid #BAE6FD; }
      .g2r-table-v td:last-child { border-right: 0; }
    }
    /* Biểu đồ: bảng tin lớn giãn hết chiều cao còn lại; mỗi hàng chia đều, hình to theo hàng (đủ chỗ 10 hình). */
    .g2r-graph { flex: 1 1 0; min-height: 0; background: #fff; border: 5px solid #0284C7; border-radius: 1.1rem; padding: .3rem .7rem; display: flex; flex-direction: column; gap: .15rem; box-shadow: 0 6px 0 #0369A1; }
    .g2r-gtitle { flex: none; font-weight: 800; color: #075985; text-align: center; font-size: clamp(1.05rem, 2.4vh + .35rem, 1.7rem); line-height: 1.2; }
    .g2r-grow { position: relative; flex: 1 1 0; min-height: 0; display: flex; align-items: center; gap: .6rem; border-bottom: 2px dashed #BAE6FD; padding: .1rem 0; }
    .g2r-glabel { flex: none; align-self: stretch; width: clamp(7rem, 15%, 12rem); display: flex; align-items: center; gap: .4rem; border: 3px solid #7DD3FC; border-radius: .8rem; background: #F0F9FF; font: 800 clamp(1rem, 2.4vh + .3rem, 1.6rem) 'Baloo 2', sans-serif; color: #075985; padding: .05rem .5rem; text-align: left; }
    .g2r-glabel span:first-child { font-size: 1.8em; line-height: 1; }
    .g2r-edit .g2r-glabel { cursor: pointer; box-shadow: 0 4px 0 #38BDF8; }
    .g2r-gcells { flex: 1; min-width: 0; align-self: stretch; display: flex; align-items: center; gap: .1rem; cursor: default; container-type: size; }
    .g2r-edit .g2r-gcells { cursor: pointer; }
    .g2r-cell { position: relative; font-size: min(74cqh, 8.4cqi); line-height: 1; width: 1.15em; text-align: center; }
    .g2r-cnum { font-size: clamp(.7rem, 1.6vh, 1rem); min-width: 1.3em; height: 1.3em; line-height: 1.3em; }
    /* Hình đã đặt trên biểu đồ đang vẽ: dấu ✕ đỏ ở góc trên để bé biết chạm vào là bớt. */
    .g2r-edit .g2r-cell:not(.g2r-ghost)::after { content: '×'; position: absolute; top: 0; right: 0; transform: translate(35%, -35%); width: .3em; height: .3em; min-width: 1.15rem; min-height: 1.15rem; border-radius: 50%; background: #EF4444; color: #fff; border: 2px solid #fff; box-shadow: 0 1px 3px rgba(0,0,0,.3); font: 900 max(.26em, .95rem)/1 system-ui, sans-serif; z-index: 1; display: flex; align-items: center; justify-content: center; pointer-events: none; }
    .g2r-cell-out { transition: transform .2s ease-in, opacity .2s ease-in; transform: scale(.2); opacity: 0; }
    .g2r-cell-extra { background: #FEF9C3; border-radius: .4rem; outline: 2px solid #F59E0B; }
    .g2r-paired { opacity: .45; }
    .g2r-dim { opacity: .35; }
    .g2r-row-ok { background: #DCFCE7; border-radius: .5rem; }
    .g2r-row-bad { background: #FEE2E2; border-radius: .5rem; }
    .g2r-rowmark { margin-left: auto; padding: 0 .4rem; font-size: clamp(1.1rem, 3vh, 1.8rem); color: #166534; white-space: nowrap; }
    .g2r-row-bad .g2r-rowmark { color: #B91C1C; }
    .g2r-gnote { flex: none; text-align: right; font-weight: 800; font-size: clamp(.9rem, 2vh + .2rem, 1.3rem); color: #0369A1; }

    /* Chắc chắn, có thể, không thể: túi bi to giữa sân trường, thẻ chọn bên cạnh. */
    .g2r-chance { flex: 1 1 0; min-height: 0; display: flex; gap: clamp(.6rem, 2vw, 2rem); align-items: center; justify-content: center; }
    .g2r-bagbox { flex: none; height: 100%; max-height: 100%; aspect-ratio: 160 / 175; max-width: 46%; display: grid; place-items: center; }
    .g2r-bag { width: 100%; height: 100%; display: block; filter: drop-shadow(0 8px 10px rgba(15,23,42,.25)); }
    .g2r-side { flex: 1 1 15rem; max-width: 34rem; display: flex; flex-direction: column; gap: clamp(.6rem, 2vh, 1.2rem); align-items: center; background: #fff; border: 5px solid #0284C7; border-radius: 1.1rem; padding: clamp(.6rem, 2vh, 1.2rem); box-shadow: 0 6px 0 #0369A1; }
    .g2r-stmt { font-weight: 800; font-size: clamp(1.2rem, 3.2vh + .4rem, 2.2rem); color: #075985; text-align: center; line-height: 1.3; }
    .g2r-stmt b:first-of-type { color: #EA580C; }
    .g2r-blank { display: inline-block; min-width: 5.4em; } /* chỗ trống giữ sẵn bề rộng của thẻ dài nhất: câu không xuống dòng khi điền */
    .g2r-dot { display: inline-block; width: .9em; height: .9em; border-radius: 50%; border: 2px solid ${INK}; vertical-align: -.1em; }
    .g2r-cards { display: flex; gap: .6rem; flex-wrap: wrap; justify-content: center; }
    .g2r-card { border: 4px solid #0284C7; border-radius: 1rem; background: #fff; color: #075985; font: 800 clamp(1.15rem, 3vh + .4rem, 2rem) 'Baloo 2', sans-serif; padding: .3rem 1rem; cursor: pointer; box-shadow: 0 5px 0 #0369A1; touch-action: manipulation; }
    .g2r-card:disabled { cursor: default; opacity: .6; }
    .g2r-card.g2r-picked { opacity: 1; }
    .g2r-draws { display: flex; gap: .5rem; min-height: clamp(2.6rem, 8vh, 4rem); }
    .g2r-drawn { width: clamp(2.6rem, 8vh, 4rem); height: clamp(2.6rem, 8vh, 4rem); border-radius: 50%; }
    .g2r-hit { box-shadow: 0 0 0 4px #86EFAC; }
    @media (orientation: portrait) {
      .g2r-bench { padding-top: .3rem; } .g3f-theme-rep .g3f-sign { display: none; }
      .g2r-cols { gap: .35rem; height: clamp(10rem, 25vh, 14rem); }
      .g2r-col { grid-template-columns: 1fr; grid-template-rows: auto 1fr auto; padding: .3rem .35rem; justify-items: center; }
      .g2r-marks { grid-row: 2; justify-content: center; } .g2r-stack { grid-row: 3; width: 100%; height: 4.5rem; flex-wrap: wrap; align-content: center; gap: .1rem .2rem; }
      .g2r-chip { height: auto; width: min(calc(33cqi - .2rem), 3.2rem); max-width: none; }
      .g2r-colpic { width: 3.2rem; } .g2r-kname { font-size: 1rem; }
      .g2r-tally { width: 1.9rem; height: 1.9rem; }
      .g2r-glabel { width: 4.4rem; flex-direction: column; justify-content: center; gap: 0; text-align: center; line-height: 1.05; padding: .05rem .15rem; font-size: .9rem; }
      .g2r-glabel span:first-child { font-size: 2em; }
      .g2r-table th, .g2r-table td { padding: 0 .6rem; font-size: 1.3rem; }
      .g2r-table th { font-size: 1.9rem; }
      .g2r-graph { padding: .25rem .4rem; gap: .1rem; }
      .g2r-chance { flex-direction: column; } .g2r-bagbox { height: auto; width: min(70%, 34vh); max-width: none; } .g2r-side { flex: none; }
    }
    @media (max-height: 500px) { .g2r-bench { padding-top: 2.4rem; } }
  `;
  document.head.appendChild(st);
}
