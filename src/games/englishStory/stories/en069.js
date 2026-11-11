/**
 * Bài 69 "How Paper Is Made" (bị động hiện tại): chuyến tham quan nhà máy giấy, mỗi bước làm giấy là một trạm, đi từ trái sang phải:
 * bến xe buýt (lớp cô Hoa xuống xe) → cổng PAPER FACTORY (cô công nhân đón, giơ tờ giấy) → rừng (cây bị chặt, gỗ lên xe tải)
 * → trong xưởng: máy băm gỗ + bồn trộn nước (thành bột giấy "pulp") → dãy trục ép (nước nhỏ giọt ra) → trống sấy nóng + cuộn giấy
 * → cửa kho (xe giao hàng chở giấy tới cửa hàng, văn phòng, trường học ở phố bên phải) → bãi tái chế (thùng giấy cũ, máy tái chế)
 * → hàng cây non mọc lên (tiết kiệm cây) → bến xe buýt về nhà.
 * Toạ độ cảnh: rộng 3740, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, steam, schoolFront } from '../kit.js';

const FLOOR = 282;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = {
  bus: 220, gate: 470, fell: 860, truck: 1000, truckIn: 1150, fac: 1100, chip: 1360, vat: 1510, roll: 1720, dry: 1930, reel: 2065,
  dock: 2230, facEnd: 2300, bin: 2440, recyc: 2590, trees: 2720, stop: 3000, shop: 3290, office: 3430, school: 3600,
};

// Bạn cùng lớp và cô công nhân (tiền tố e069_ để không trùng truyện khác)
Object.assign(CAST, {
  e069_mai: { hair: 'bob', top: 'uniform', shirt: '#FFFFFF', bottom: 'skirt', bottomC: '#1E3A6E', shoe: '#F472B6' },
  e069_worker: { adult: true, hair: 'bun', top: 'shirt', shirt: '#F97316', bottom: 'pants', bottomC: '#1E40AF', shoe: '#1C1917' },
});

// ── Đồ vật (gốc = điểm chạm đất, nhìn nghiêng sang phải) ─────────────────────
const wheel = (x, r = 16) => `<g transform="translate(${x} ${-r})"><g class="e069-wheel"><circle r="${r}" fill="#1F2937" stroke="${L}"/><circle r="${r * 0.44}" fill="#CBD5E1"/>
  <path d="M${-r * 0.44} 0 H${r * 0.44} M0 ${-r * 0.44} V${r * 0.44}" stroke="#64748B" stroke-width="1.8"/></g></g>`;
/** Xe tải chở gỗ: thùng xanh dài, cabin cam bên phải. */
const TRUCK = `<rect x="-130" y="-44" width="262" height="12" rx="3" fill="#475569" stroke="${L}"/>
  <rect x="-130" y="-84" width="182" height="42" rx="3" fill="#16A34A" stroke="${L}" stroke-width="1.2"/>
  ${[-100, -60, -20, 20].map((x) => `<path d="M${x} -82 V-46" stroke="#15803D" stroke-width="3"/>`).join('')}
  <path d="M58 -40 V-128 H100 Q124 -126 132 -84 V-40Z" fill="#F59E0B" stroke="${L}" stroke-width="1.2"/>
  <path d="M68 -120 H98 Q114 -118 122 -90 H68Z" fill="#BAE6FD" stroke="${L}"/><rect x="124" y="-60" width="9" height="8" rx="2" fill="#FEF08A" stroke="${L}" stroke-width="0.8"/>
  ${wheel(-98)}${wheel(-62)}${wheel(96)}`;
const LOG = (x, y, w) => `<rect x="${x}" y="${y - 9}" width="${w}" height="18" rx="9" fill="#A16207" stroke="${L}"/><circle cx="${x + 9}" cy="${y}" r="9" fill="#FCD34D" stroke="${L}"/><circle cx="${x + 9}" cy="${y}" r="4.4" fill="none" stroke="#B45309" stroke-width="1"/>`;
/** Gỗ trên thùng xe (cùng gốc với xe tải). */
const LOGS = `${LOG(-128, -94, 176)}${LOG(-122, -112, 168)}${LOG(-114, -130, 150)}`;
const LOG_FLY = `<g transform="rotate(-20)">${LOG(-26, 0, 52)}</g>`;
const CHIPS = `${[[-6, -3, 20], [5, 2, -30], [-2, 6, 50], [7, -5, 10]].map(([x, y, r]) => `<rect x="${x - 3}" y="${y - 2}" width="7" height="4" rx="1" fill="#FCD34D" stroke="${L}" stroke-width="0.6" transform="rotate(${r} ${x} ${y})"/>`).join('')}`;
/** Xe buýt đưa đón (gốc ở cửa sổ của Minh). heads = các đầu nhìn qua cửa sổ. */
const BUS = (heads = '') => `<rect x="-140" y="-150" width="282" height="128" rx="14" fill="#FACC15" stroke="${L}" stroke-width="1.4"/>
  <rect x="-140" y="-40" width="282" height="16" fill="#F59E0B" stroke="${L}"/>
  ${[-108, -54, 0, 54].map((x) => `<rect x="${x - 22}" y="-136" width="44" height="40" rx="5" fill="#BAE6FD" stroke="${L}"/>`).join('')}
  <defs><clipPath id="e069win">${[-108, -54, 0, 54].map((x) => `<rect x="${x - 22}" y="-136" width="44" height="40" rx="5"/>`).join("")}</clipPath></defs><g clip-path="url(#e069win)">${heads}</g>
  ${[-108, -54, 0, 54].map((x) => `<path d="M${x - 18} -132 l10 0 l-14 14Z" fill="#fff" opacity="0.5"/>`).join('')}
  <rect x="94" y="-132" width="36" height="96" rx="4" fill="#BAE6FD" stroke="${L}"/><path d="M112 -132 V-36" stroke="${L}"/>
  <rect x="136" y="-62" width="8" height="10" rx="2" fill="#FEF08A" stroke="${L}" stroke-width="0.8"/>
  <text x="-50" y="-48" text-anchor="middle" ${NUN} font-size="12" fill="#1F2937" class="es-unflip">SCHOOL BUS</text>
  ${wheel(-92, 18)}${wheel(92, 18)}`;
const busHeads = () => [['en_hoa', -108, 0.8], ['e069_mai', -54, 0.78], ['en_minh', 0, 0.78], ['en_tom', 54, 0.78]].map(([w, x, s]) => `<g transform="translate(${x} -104)">${headOnly(w, { s })}</g>`).join('');
/** Xe giao hàng chở giấy (gốc giữa). */
const VAN = `<rect x="-96" y="-118" width="134" height="92" rx="6" fill="#fff" stroke="${L}" stroke-width="1.3"/>
  <text x="-29" y="-66" text-anchor="middle" ${NUN} font-size="15" fill="#2563EB" class="es-unflip">PAPER</text>
  <path d="M38 -26 V-96 H70 Q92 -94 98 -60 V-26Z" fill="#3B82F6" stroke="${L}" stroke-width="1.2"/><path d="M46 -88 H68 Q82 -86 88 -64 H46Z" fill="#BAE6FD" stroke="${L}"/>
  <rect x="-98" y="-30" width="198" height="10" rx="3" fill="#475569" stroke="${L}"/>${wheel(-60, 15)}${wheel(66, 15)}`;
const BOX = `<rect x="-11" y="-9" width="22" height="18" rx="2" fill="#FDE68A" stroke="${L}"/><path d="M-11 -3 H11 M0 -9 V9" stroke="#D97706" stroke-width="1"/>`;
/** Tờ giấy trắng / tờ báo cũ (gốc = bàn tay). */
const SHEET = `<g transform="rotate(180) translate(0 4)"><rect x="-10" y="0" width="20" height="26" rx="1.5" fill="#fff" stroke="${L}" stroke-width="0.9"/></g>`;
const NEWS = `<g transform="rotate(180) translate(0 4)"><path d="M-12 0 H12 L11 24 H-11Z" fill="#E7E5E4" stroke="${L}" stroke-width="0.9"/>
  <path d="M-8 5 H8 M-8 9 H2 M-8 13 H8 M-8 17 H4" stroke="#78716C" stroke-width="1.4"/><path d="M4 8 l5 3 l-3 4" stroke="#A8A29E" stroke-width="0.8" fill="none"/></g>`;
const PAPER_FLY = `<g transform="rotate(14)"><path d="M-10 -7 H10 L9 7 H-9Z" fill="#E7E5E4" stroke="${L}" stroke-width="0.9"/><path d="M-6 -3 H6 M-6 1 H3" stroke="#78716C" stroke-width="1.2"/></g>`;

const POSES = {
  e069_show: { R: [120, 150], L: [10, 4], head: -4 },       // giơ tờ giấy lên cho các bạn xem
  e069_point: { R: [96, 104], L: [10, 4], head: -4 },       // chỉ vào máy
  e069_up: { R: [10, 4], L: [10, 4], head: -10 },            // ngẩng nhìn máy
  e069_hold: { R: [62, 78], L: [10, 4], head: 6 },          // cầm tờ báo cũ trước mặt
  e069_tip: { R: [60, 120], L: [60, 120] },                  // đổ thùng giấy
};
const PROPS = { e069_sheet: SHEET, e069_news: NEWS };

// ── Cảnh ───────────────────────────────────────────────────────────────────
const roller = (x, y) => `<g transform="translate(${x} ${y})"><circle r="11" fill="#94A3B8" stroke="${L}"/><g class="e069-spin"><path d="M-9 0 H9 M0 -9 V9" stroke="#475569" stroke-width="2"/></g><circle r="2.6" fill="#475569"/></g>`;
const drum = (x, y) => `<g transform="translate(${x} ${y})"><circle r="20" fill="#F87171" stroke="${L}" stroke-width="1.2"/><g class="e069-spin"><path d="M-16 0 H16 M0 -16 V16" stroke="#B91C1C" stroke-width="2.4"/></g><circle r="4" fill="#B91C1C"/></g>`;
const legs = (x1, x2, top) => `<rect x="${x1}" y="${top}" width="8" height="${FLOOR - top}" fill="#64748B" stroke="${L}" stroke-width="0.8"/><rect x="${x2 - 8}" y="${top}" width="8" height="${FLOOR - top}" fill="#64748B" stroke="${L}" stroke-width="0.8"/>`;

function bg() {
  return `
  ${sky(0, X.fac + 10, 315, 'e069sky')}${sky(X.facEnd - 10, 3740 - X.facEnd, 315, 'e069sky2')}
  ${cloud(160, 70, 0.9, 0)}${cloud(720, 56, 1, 2)}${cloud(2600, 64, 0.9, 1)}${cloud(3200, 52, 0.8, 3)}
  <!-- đồi xa + đất -->
  <path d="M0 220 Q240 186 520 214 T1100 208 V${FLOOR} H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  <path d="M${X.facEnd} 214 Q2700 190 3000 212 T3740 206 V${FLOOR} H${X.facEnd}Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  <!-- đường + vỉa hè ngoài trời (trước nhà máy và phố) -->
  <rect x="0" y="${FLOOR - 4}" width="${X.fac}" height="40" fill="#86EFAC" stroke="${L}"/>
  <rect x="0" y="${FLOOR - 4}" width="420" height="40" fill="#94A3B8" stroke="${L}"/>
  ${Array.from({ length: 6 }, (_, i) => `<rect x="${20 + i * 66}" y="${FLOOR + 14}" width="30" height="4" rx="2" fill="#F8FAFC"/>`).join('')}
  <rect x="${X.facEnd}" y="${FLOOR - 4}" width="${3740 - X.facEnd}" height="40" fill="#94A3B8" stroke="${L}"/>
  ${Array.from({ length: 22 }, (_, i) => `<rect x="${X.facEnd + 20 + i * 66}" y="${FLOOR + 14}" width="30" height="4" rx="2" fill="#F8FAFC"/>`).join('')}
  <!-- bến xe buýt đầu -->
  <g transform="translate(60 ${FLOOR})"><path d="M0 0 V-120" stroke="#475569" stroke-width="4"/><rect x="-18" y="-140" width="36" height="26" rx="5" fill="#2563EB" stroke="${L}"/><text x="0" y="-122" text-anchor="middle" ${NUN} font-size="13" fill="#fff">BUS</text></g>
  <!-- cổng nhà máy -->
  <g transform="translate(${X.gate} 0)"><rect x="-80" y="140" width="12" height="${FLOOR - 140}" fill="#E7E5E4" stroke="${L}"/><rect x="68" y="140" width="12" height="${FLOOR - 140}" fill="#E7E5E4" stroke="${L}"/>
    <rect x="-92" y="108" width="184" height="36" rx="6" fill="#fff" stroke="${L}" stroke-width="1.4"/><text x="0" y="133" text-anchor="middle" ${NUN} font-size="19" fill="#15803D">PAPER FACTORY</text></g>
  <!-- rừng -->
  ${tree(620, FLOOR - 2, 1.5, '')}${tree(700, FLOOR - 4, 1.8, '')}${tree(990, FLOOR - 2, 1.6, '')}${tree(1060, FLOOR - 4, 1.4, '')}
  <g transform="translate(${X.fell} ${FLOOR - 2})"><rect x="-10" y="-10" width="20" height="12" rx="3" fill="#A16207" stroke="${L}"/><ellipse cx="0" cy="-10" rx="10" ry="3" fill="#FCD34D" stroke="${L}" stroke-width="0.8"/>
    <g class="e069-ftree"><rect x="-9" y="-150" width="18" height="142" rx="4" fill="#A16207" stroke="${L}"/>
      <circle cx="0" cy="-176" r="40" fill="#22C55E" stroke="${L}"/><circle cx="-28" cy="-154" r="24" fill="#16A34A" stroke="${L}"/><circle cx="28" cy="-158" r="26" fill="#4ADE80" stroke="${L}"/></g></g>
  <!-- nhà máy: tường trong, sàn bê tông, cửa sổ cao, ống trên trần -->
  <rect x="${X.fac}" y="0" width="${X.facEnd - X.fac}" height="${FLOOR}" fill="#E2E8F0" stroke="${L}" stroke-width="1.2"/>
  <rect x="${X.fac}" y="${FLOOR - 4}" width="${X.facEnd - X.fac}" height="40" fill="#94A3B8" stroke="${L}"/>
  <path d="M${X.fac} ${FLOOR + 6} H${X.facEnd}" stroke="#FACC15" stroke-width="4" stroke-dasharray="14 10"/>
  ${[1260, 1620, 1840, 2160].map((x) => `<rect x="${x - 34}" y="46" width="68" height="34" rx="3" fill="#BAE6FD" stroke="${L}"/><path d="M${x} 46 V80" stroke="#fff" stroke-width="2"/>`).join('')}
  <path d="M${X.fac} 30 H${X.facEnd}" stroke="#94A3B8" stroke-width="8"/><path d="M${X.fac} 30 H${X.facEnd}" stroke="${L}" stroke-width="0.8" fill="none"/>
  <rect x="${X.fac}" y="0" width="16" height="${FLOOR}" fill="#CBD5E1" stroke="${L}"/>
  <!-- máy băm gỗ -->
  <g transform="translate(${X.chip} 0)">${legs(-40, 40, 132)}
    <path d="M-50 44 H50 L36 82 H-36Z" fill="#94A3B8" stroke="${L}" stroke-width="1.2"/>
    <rect x="-44" y="80" width="88" height="56" rx="6" fill="#64748B" stroke="${L}" stroke-width="1.2"/>
    <circle cx="0" cy="108" r="17" fill="#1F2937" stroke="${L}"/><g transform="translate(0 108)"><g class="e069-blade">${[0, 60, 120].map((r) => `<path d="M0 0 L14 -4 L14 4Z" fill="#E2E8F0" transform="rotate(${r * 2})"/>`).join('')}</g></g>
    <path d="M44 88 L96 98 L94 108 L44 102Z" fill="#94A3B8" stroke="${L}"/></g>
  <!-- bồn trộn: ống nước, kính nhìn bên trong -->
  <g transform="translate(${X.vat} 0)">${legs(-54, 54, 164)}
    <path d="M-30 30 V64 H-14" stroke="#64748B" stroke-width="8" fill="none"/><rect x="-18" y="58" width="10" height="16" rx="2" fill="#475569" stroke="${L}"/>
    <rect class="e069-stream" x="-16" y="74" width="6" height="28" fill="#7DD3FC"/>
    <ellipse cx="0" cy="100" rx="62" ry="8" fill="#CBD5E1" stroke="${L}"/>
    <path d="M-62 100 V160 Q0 172 62 160 V100" fill="#3B82F6" stroke="${L}" stroke-width="1.2"/>
    <rect x="-40" y="110" width="80" height="46" rx="6" fill="#E0F2FE" stroke="${L}"/>
    <rect class="e069-fill" x="-38" y="112" width="76" height="42" rx="4" fill="#7DD3FC"/>
    <g class="e069-swirl"><path d="M-22 134 q10 -10 20 0 q10 10 20 0 M-16 144 q8 -6 16 0 q8 6 16 0" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.8"/></g>
    <path d="M-40 110 h80 v46 h-80Z" fill="none" stroke="${L}"/><path d="M-30 114 l8 0 l-12 12Z" fill="#fff" opacity="0.6"/></g>
  <!-- trục ép -->
  <g transform="translate(${X.roll} 0)">${legs(-62, 62, 150)}<rect x="-64" y="108" width="128" height="10" rx="3" fill="#64748B" stroke="${L}"/>
    <rect x="-56" y="186" width="112" height="12" rx="3" fill="#CBD5E1" stroke="${L}"/>
    ${[-40, 0, 40].map((dx) => roller(dx, 129) + roller(dx, 151)).join('')}
    <g class="e069-drips">${[-40, 0, 40].map((dx, i) => `<ellipse class="e069-drip" style="animation-delay:${i * 0.25}s" cx="${dx}" cy="168" rx="2.4" ry="3.6" fill="#38BDF8"/>`).join('')}</g></g>
  <!-- trống sấy + cuộn giấy -->
  <g transform="translate(${X.dry} 0)">${legs(-50, 50, 156)}<rect x="-54" y="150" width="108" height="10" rx="3" fill="#64748B" stroke="${L}"/>
    ${drum(-26, 130)}${drum(26, 130)}${steam(-26, 104, 'e069-steam')}${steam(26, 104, 'e069-steam')}</g>
  <g transform="translate(${X.reel} 0)">${legs(-26, 26, 140)}<path d="M-26 140 L0 135 L26 140" stroke="#64748B" stroke-width="6" fill="none"/>
    <g transform="translate(0 135)"><g class="e069-reel"><circle r="30" fill="#FAFAF9" stroke="${L}" stroke-width="1.2"/><circle r="22" fill="none" stroke="#E7E5E4" stroke-width="1.2"/><circle r="14" fill="none" stroke="#E7E5E4" stroke-width="1.2"/></g><circle r="6" fill="#92400E" stroke="${L}"/></g></g>
  <!-- tấm giấy chạy qua máy -->
  <g class="e069-sheetA"><path d="M${X.vat + 62} 140 H${X.roll + 62}" stroke="${L}" stroke-width="9"/><path d="M${X.vat + 62} 140 H${X.roll + 62}" stroke="#E7DCC8" stroke-width="7"/><path class="e069-run" d="M${X.vat + 62} 140 H${X.roll + 62}" stroke="#D6C7A8" stroke-width="2" stroke-dasharray="6 10"/></g>
  <g class="e069-sheetB"><path d="M${X.roll + 62} 140 H${X.dry - 50} Q${X.dry - 44} 110 ${X.dry - 26} 110 H${X.dry + 26} L${X.reel - 4} 106" stroke="${L}" stroke-width="8" fill="none"/><path d="M${X.roll + 62} 140 H${X.dry - 50} Q${X.dry - 44} 110 ${X.dry - 26} 110 H${X.dry + 26} L${X.reel - 4} 106" stroke="#FAFAF9" stroke-width="6" fill="none"/>
    <path class="e069-run" d="M${X.roll + 62} 140 H${X.dry - 50}" stroke="#E7E5E4" stroke-width="2" stroke-dasharray="6 10"/></g>
  <!-- cửa kho: thùng giấy xếp sẵn -->
  <rect x="${X.dock + 40}" y="70" width="${X.facEnd - X.dock - 40}" height="${FLOOR - 70}" fill="#FEF3C7" stroke="${L}"/>
  <rect x="${X.facEnd - 6}" y="0" width="16" height="${FLOOR}" fill="#CBD5E1" stroke="${L}"/>
  <path d="M${X.dock + 40} 70 H${X.facEnd}" stroke="#F59E0B" stroke-width="6"/>
  <g class="e069-dockbox" transform="translate(${X.dock - 60} ${FLOOR})">${[[-14, -9], [10, -9], [-2, -27]].map(([x, y]) => `<g transform="translate(${x} ${y}) scale(1.1)">${BOX}</g>`).join('')}</g>
  <!-- bãi tái chế -->
  <g transform="translate(${X.recyc} 0)"><rect x="-80" y="128" width="160" height="${FLOOR - 128}" fill="#BBF7D0" stroke="${L}" stroke-width="1.2"/><path d="M-90 130 L0 96 L90 130Z" fill="#16A34A" stroke="${L}" stroke-width="1.2"/>
    <rect x="-66" y="138" width="132" height="24" rx="5" fill="#fff" stroke="${L}"/><text x="0" y="156" text-anchor="middle" ${NUN} font-size="15" fill="#15803D">RECYCLING</text>
    <path d="M-60 176 H-20 L-26 196 H-54Z" fill="#94A3B8" stroke="${L}"/>
    <rect x="-56" y="196" width="70" height="56" rx="5" fill="#22C55E" stroke="${L}"/>
    <g transform="translate(-21 224)"><g class="e069-recy">${[0, 120, 240].map((r) => `<path d="M0 -14 A14 14 0 0 1 12 -7" stroke="#fff" stroke-width="3.4" fill="none" transform="rotate(${r})"/><path d="M12 -7 l-5 -1 l4 -5Z" fill="#fff" transform="rotate(${r})"/>`).join('')}</g></g>
    <rect x="14" y="236" width="56" height="8" rx="2" fill="#475569" stroke="${L}"/>
    <g class="e069-newpaper">${[0, 1, 2].map((i) => `<rect x="${24 + i * 2}" y="${226 - i * 6}" width="36" height="7" rx="1" fill="#FAFAF9" stroke="${L}" stroke-width="0.8"/>`).join('')}</g></g>
  <!-- cây non: tiết kiệm cây -->
  ${[X.trees - 50, X.trees, X.trees + 50].map((x, i) => `<g transform="translate(${x} ${FLOOR - 2})"><ellipse cx="0" cy="0" rx="14" ry="3" fill="#A16207"/><g class="e069-sap" style="transition-delay:${i * 0.35}s">${tree(0, 0, 1 + i * 0.12, '')}</g></g>`).join('')}
  <!-- bến xe buýt về -->
  <g transform="translate(${X.stop + 170} ${FLOOR})"><path d="M0 0 V-120" stroke="#475569" stroke-width="4"/><rect x="-18" y="-140" width="36" height="26" rx="5" fill="#2563EB" stroke="${L}"/><text x="0" y="-122" text-anchor="middle" ${NUN} font-size="13" fill="#fff">BUS</text></g>
  <!-- phố: cửa hàng, văn phòng, trường -->
  <g transform="translate(${X.shop} 0)"><rect x="-56" y="150" width="112" height="${FLOOR - 150}" fill="#FED7AA" stroke="${L}" stroke-width="1.2"/>
    <path d="M-62 150 H62 L56 172 H-56Z" fill="#EF4444" stroke="${L}"/>${[-44, -20, 4, 28].map((x) => `<path d="M${x} 150 L${x + 6} 172 H${x + 18} L${x + 12} 150Z" fill="#fff"/>`).join('')}
    <rect x="-46" y="126" width="92" height="24" rx="5" fill="#fff" stroke="${L}"/><text x="0" y="144" text-anchor="middle" ${NUN} font-size="15" fill="#DC2626">SHOP</text>
    <rect x="-44" y="186" width="40" height="40" fill="#BAE6FD" stroke="${L}"/><rect x="12" y="200" width="30" height="${FLOOR - 200}" fill="#92400E" stroke="${L}"/></g>
  <g transform="translate(${X.office} 0)"><rect x="-50" y="80" width="100" height="${FLOOR - 80}" fill="#93C5FD" stroke="${L}" stroke-width="1.2"/>
    ${[100, 136, 172, 208].map((y) => [-32, -6, 20].map((x) => `<rect x="${x}" y="${y}" width="16" height="22" fill="#E0F2FE" stroke="${L}" stroke-width="0.8"/>`).join('')).join('')}
    <rect x="-46" y="56" width="92" height="24" rx="5" fill="#fff" stroke="${L}"/><text x="0" y="74" text-anchor="middle" ${NUN} font-size="15" fill="#1D4ED8">OFFICE</text>
    <rect x="-14" y="240" width="28" height="${FLOOR - 240}" fill="#1E3A8A" stroke="${L}"/></g>
  ${schoolFront(X.school, FLOOR)}
  <g class="e069-lb e069-lb-trees">${label(X.fell + 40, 70, 'trees', '#15803D', 17)}</g>
  <g class="e069-lb e069-lb-pulp">${label(X.vat, 30 + 52, 'pulp', '#B45309', 20)}</g>
  <g class="e069-lb e069-lb-saves">${label(X.trees, 112, 'saves trees', '#15803D', 17)}</g>`;
}

function fg() {
  return `${bush(560, FLOOR + 8, 0.9)}${bush(1040, FLOOR + 10, 1)}${bush(X.trees + 120, FLOOR + 8, 0.8, '#4ADE80')}
  <!-- thùng giấy cũ (trước chân người) -->
  <g transform="translate(${X.bin} ${FLOOR})"><path d="M-32 -48 H32 L27 0 H-27Z" fill="#2563EB" stroke="${L}" stroke-width="1.2"/>
    <g class="e069-binpaper">${[-12, 0, 12].map((x, i) => `<path d="M${x - 9} -48 l3 -12 h14 l2 12Z" fill="#E7E5E4" stroke="${L}" stroke-width="0.8" transform="rotate(${(i - 1) * 8} ${x} -48)"/>`).join('')}</g>
    <rect x="-35" y="-52" width="70" height="7" rx="2" fill="#1D4ED8" stroke="${L}"/>
    <text x="0" y="-18" text-anchor="middle" ${NUN} font-size="9" fill="#fff">OLD PAPER</text></g>`;
}

const CSS = `
.e069-lb { opacity: 0; transition: opacity .35s; }
.st-lb-trees .e069-lb-trees, .st-lb-pulp .e069-lb-pulp, .st-lb-saves .e069-lb-saves { opacity: 1; }
.e069-ftree { transition: transform 1.1s cubic-bezier(.55,0,.9,.55), opacity .4s; }
.st-fall .e069-ftree { transform: rotate(84deg); }
.st-cut .e069-ftree { opacity: 0; }
.e069-blade { transition: none; }
.st-chip .e069-blade { animation: e069Spin .25s linear infinite; }
.st-roll .e069-spin, .st-dry .e069-spin { animation: e069Spin .9s linear infinite; }
@keyframes e069Spin { to { transform: rotate(360deg); } }
.e069-stream { opacity: 0; transform-box: fill-box; transform-origin: top; transform: scaleY(0); transition: transform .5s, opacity .3s; }
.st-water .e069-stream { opacity: 1; transform: scaleY(1); }
.e069-fill { transform-box: fill-box; transform-origin: bottom; transform: scaleY(.12); transition: transform 2.2s ease-in-out, fill 1.2s; }
.st-full .e069-fill { transform: scaleY(1); }
.st-pulp .e069-fill { fill: #E7DCC8; }
.e069-swirl { opacity: 0; transition: opacity .4s; }
.st-mix .e069-swirl { opacity: 1; animation: e069Swirl .8s ease-in-out infinite alternate; }
@keyframes e069Swirl { from { transform: translateX(-6px); } to { transform: translateX(6px); } }
.e069-sheetA, .e069-sheetB { transform-box: fill-box; transform-origin: left; transform: scaleX(0); transition: transform 1.6s ease-in-out; }
.st-sheetA .e069-sheetA, .st-sheetB .e069-sheetB { transform: scaleX(1); }
.st-roll .e069-sheetA .e069-run, .st-dry .e069-run { animation: e069Run .5s linear infinite; }
@keyframes e069Run { to { stroke-dashoffset: -16; } }
.e069-drip { opacity: 0; }
.st-roll .e069-drip { animation: e069Drip .7s ease-in infinite; }
@keyframes e069Drip { from { transform: translateY(0); opacity: 1; } to { transform: translateY(16px); opacity: 0; } }
.e069-steam { opacity: 0; transition: opacity .4s; } .st-dry .e069-steam { opacity: 1; }
.e069-reel { transform: scale(.3); transition: transform 2.4s ease-in-out; }
.st-reel .e069-reel { transform: scale(1); }
.e069-dockbox { transition: opacity .6s; } .st-loaded .e069-dockbox { opacity: 0; }
.e069-binpaper { transition: opacity .4s; } .st-binempty .e069-binpaper { opacity: 0; }
.st-recy .e069-recy { animation: e069Spin 1.2s linear infinite; }
.e069-newpaper { opacity: 0; transform: translateX(-20px); transition: opacity .4s, transform .8s; }
.st-newpaper .e069-newpaper { opacity: 1; transform: translateX(0); }
.e069-sap { transform: scale(0); transition: transform 1s cubic-bezier(.3,1.4,.6,1); }
.st-trees .e069-sap { transform: scale(1); }
.es-thing.is-walk .e069-wheel { animation: e069Spin .5s linear infinite; }
@media (prefers-reduced-motion: reduce) {
  .st-chip .e069-blade { animation-duration: .8s; }
  .st-roll .e069-spin, .st-dry .e069-spin, .st-recy .e069-recy { animation-duration: 2.4s; }
  .st-mix .e069-swirl { animation-duration: 2s; }
  .st-roll .e069-drip { animation-duration: 1.4s; }
  .es-thing.is-walk .e069-wheel { animation-duration: 1.2s; }
  .e069-sap { transition-timing-function: ease-out; }
}
`;

const KIDS = ['hoa', 'mai', 'tom', 'minh'];
/** Cả lớp đi tới trạm (gx = chỗ Minh đứng; các bạn đứng lùi về bên trái), cô công nhân đi trước tới wx. */
async function group(st, gx, wx, { look = gx + 60 } = {}) {
  st.look(look, { dur: 1400 });
  const off = { hoa: -150, mai: -100, tom: -52, minh: 0 };
  await Promise.all([
    wx != null ? st.walk('wk', wx, { speed: 140, follow: false }) : null,
    ...KIDS.map((id) => st.walk(id, gx + off[id], { speed: id === 'hoa' ? 150 : 130, follow: false })),
  ]);
}
const lookUp = (st, on = true) => ['mai', 'tom', 'minh'].forEach((id) => st.pose(id, on ? 'e069_up' : 'stand'));

const BEATS = [
  { key: ['took her class to a paper factory'], icon: '🚌', label: 'paper factory', async play(st) {
    st.look(300);
    await st.loop('bus', () => st.walk('bus', X.bus, { speed: 170, follow: false }), { vol: 0.8 });
    st.sfx('door-open', { vol: 0.7 });
    st.show('bus', false); st.show('busE', true);
    for (const id of KIDS) st.show(id, true);
    await st.wait(250);
    await group(st, 420, null, { look: 380 });
    st.face('hoa', 1); st.pose('hoa', 'point'); st.mood('minh', 'joy'); st.mood('tom', 'joy');
    await st.wait(700);
  } },
  { key: ['showed them how paper is made'], icon: '👷', label: 'a worker', async play(st) {
    st.pose('hoa', 'stand');
    st.mood('minh', 'happy'); st.mood('tom', 'happy');
    st.look(500);
    st.pose('wk', 'wave'); st.act('wk', 'wave'); st.mood('wk', 'joy');
    await st.say('wk', 'Welcome!', 1200);
    st.act('wk', null);
    st.hold('wk', 'e069_sheet'); st.pose('wk', 'e069_show'); st.sfx('page-turn', { vol: 0.8 });
    lookUp(st);
    await st.wait(1300);
  } },
  { key: ['trees are cut down', 'brought to the factory by truck'], icon: '🌲', label: 'trees are cut down', async play(st) {
    st.hold('wk', null); st.pose('wk', 'stand'); lookUp(st, false);
    await group(st, 740, 800, { look: 860 });
    st.face('wk', 1); st.pose('wk', 'e069_point');
    st.set('st-lb-trees'); st.sfx('crunch', { vol: 0.8 });
    await st.wait(300);
    st.set('st-fall'); st.sfx('wind', { vol: 0.4 });
    await st.wait(1000);
    st.sfx('bump', { vol: 0.9 }); st.fx('poof', X.fell + 120, FLOOR - 10, { quiet: true });
    lookUp(st);
    await st.wait(400);
    st.set('st-cut'); st.set('st-lb-trees', false);
    st.show('logs', true); st.sfx('bowl-down', { vol: 0.6, rate: 0.6 });
    await st.wait(500);
    await st.loop('car-go', () => Promise.all([
      st.walk('truck', X.truckIn, { speed: 110, lead: 60 }),
      st.walk('logs', X.truckIn, { speed: 110, follow: false }),
    ]), { vol: 0.8 });
  } },
  { key: ['cut into small pieces', 'mixed with water'], icon: '🪵', label: 'small pieces', async play(st) {
    lookUp(st, false); st.pose('wk', 'stand');
    await group(st, 1410, 1610, { look: 1440 });
    st.face('wk', -1); st.pose('wk', 'e069_point');
    lookUp(st);
    st.set('st-chip');
    for (let i = 0; i < 3; i++) {
      st.sfx('whoosh', { vol: 0.5 });
      await st.fly(LOG_FLY, [X.truckIn - 40 + i * 30, 170 - i * 14], [X.chip, 60], { size: 56, dur: 650 });
      if (i === 2) st.show('logs', false);
      st.sfx('crunch', { vol: 0.8 });
      st.fly(CHIPS, [X.chip + 90, 100], [X.vat - 20, 100], { size: 22, dur: 500 });
    }
    st.set('st-water'); st.set('st-full'); st.sfx('tap-water', { vol: 0.8 });
    await st.wait(1200);
    st.set('st-chip', false);
  } },
  { key: ['This mixture is called pulp'], icon: '🥣', label: 'pulp', async play(st) {
    st.set('st-water', false);
    st.set('st-mix'); st.sfx('pot-stir', { vol: 0.8 });
    await st.wait(900);
    st.set('st-pulp');
    await st.wait(600);
    st.set('st-lb-pulp'); st.sfx('ding', { vol: 0.6 });
    st.mood('minh', 'wow'); st.mood('mai', 'wow');
    await st.wait(1200);
  } },
  { key: ['pressed between big rollers', 'the water is removed'], icon: '🌀', label: 'big rollers', async play(st) {
    st.set('st-lb-pulp', false); st.set('st-mix', false);
    st.mood('minh', 'happy'); st.mood('mai', 'happy'); lookUp(st, false); st.pose('wk', 'stand');
    await group(st, 1640, 1820, { look: 1680 });
    st.face('wk', -1); st.pose('wk', 'e069_point'); lookUp(st);
    st.set('st-sheetA'); st.set('st-roll');
    await st.loop('roll', () => st.wait(1500), { vol: 0.7 });
    for (let i = 0; i < 3; i++) { st.sfx('drip', { vol: 0.7 }); st.fx('drops', X.roll - 40 + i * 40, 176, { quiet: true }); await st.wait(380); }
    await st.wait(400);
  } },
  { key: ['dried and rolled up'], icon: '🧻', label: 'dried and rolled up', async play(st) {
    lookUp(st, false); st.pose('wk', 'stand');
    await group(st, 1900, 2120, { look: 1960 });
    st.face('wk', -1); st.pose('wk', 'e069_point'); lookUp(st);
    st.set('st-sheetB'); st.set('st-dry'); st.sfx('hiss', { vol: 0.7 });
    await st.wait(1300);
    st.set('st-reel');
    await st.loop('roll', () => st.wait(2200), { vol: 0.6 });
    st.mood('tom', 'wow');
  } },
  { key: ['sent to shops, offices and schools'], icon: '🚚', label: 'shops, offices, schools', async play(st) {
    st.set('st-roll', false); st.set('st-dry', false); st.mood('tom', 'happy');
    lookUp(st, false); st.pose('wk', 'stand');
    await group(st, 2130, 2190, { look: 2250 });
    st.face('wk', 1); st.pose('wk', 'e069_point');
    st.show('van', true); st.set('st-loaded');
    for (const [x, y] of [[X.dock - 74, 266], [X.dock - 50, 266], [X.dock - 62, 246]]) {
      st.sfx('box-shake', { vol: 0.5 });
      await st.fly(BOX, [x, y], [X.dock + 10, 196], { size: 26, dur: 450 });
    }
    const stops = [X.shop - 110, X.office - 110, X.school - 150];
    const doors = [[X.shop + 26, 262], [X.office, 264], [X.school, 264]];
    for (let i = 0; i < 3; i++) {
      await st.loop('car-go', () => st.walk('van', stops[i], { speed: i ? 220 : 300, lead: 80 }), { vol: 0.7 });
      st.sfx('whoosh', { vol: 0.4 });
      await st.fly(BOX, [stops[i] + 10, 200], doors[i], { size: 26, dur: 520 });
      st.sfx('bump', { vol: 0.6 });
    }
    await st.wait(300);
  } },
  { key: ['Is old paper used again?'], icon: '📰', label: 'old paper', async play(st) {
    st.pose('wk', 'stand'); st.show('van', false);
    st.look(X.bin - 40, { dur: 1200 });
    await Promise.all([
      st.walk('tom', X.bin - 42, { speed: 135, follow: false }),
      st.walk('minh', X.bin - 92, { speed: 135, follow: false }),
      st.walk('mai', X.bin - 140, { speed: 130, follow: false }),
      st.walk('hoa', X.bin - 200, { speed: 170, follow: false }),
      st.walk('wk', X.bin + 62, { speed: 150, follow: false }),
    ]);
    st.face('wk', -1);
    st.hold('tom', 'e069_news'); st.pose('tom', 'e069_hold'); st.sfx('page-turn', { vol: 0.9 });
    st.mood('tom', 'wow');
    await st.wait(1200);
  } },
  { key: ['Tom asked'], icon: '🙋', label: 'Tom asked', async play(st) {
    st.pose('tom', 'raise'); st.mood('tom', 'happy');
    st.sfx('pop', { vol: 0.6 });
    await st.say('tom', 'Used again?', 1500);
  } },
  { key: ['Yes'], icon: '👍', label: 'Yes', async play(st) {
    st.hold('tom', null); st.pose('tom', 'stand');
    st.pose('wk', 'raise'); st.act('wk', 'nod'); st.mood('wk', 'joy'); st.sfx('ding', { vol: 0.7 });
    await st.say('wk', 'Yes!', 1200);
    st.act('wk', null);
  } },
  { key: ['collected and recycled here'], icon: '♻️', label: 'recycled', async play(st) {
    st.pose('wk', 'stand'); st.mood('wk', 'happy');
    st.look(X.recyc - 90, { dur: 900 });
    st.face('wk', -1); st.pose('wk', 'e069_tip'); st.sfx('box-shake', { vol: 0.8 });
    await st.wait(400);
    st.set('st-binempty');
    for (let i = 0; i < 3; i++) { st.sfx('whoosh', { vol: 0.4 }); st.fly(PAPER_FLY, [X.bin, 228], [X.recyc - 40, 172], { size: 26, dur: 600 }); await st.wait(240); }
    await st.wait(500);
    st.face('wk', 1); st.pose('wk', 'e069_point');
    st.set('st-recy'); await st.loop('pot-stir', () => st.wait(1300), { vol: 0.7 });
    st.set('st-newpaper'); st.sfx('page-turn', { vol: 0.8 });
    st.mood('minh', 'joy'); st.mood('mai', 'joy');
    await st.wait(700);
  } },
  { key: ['It saves trees'], icon: '🌳', label: 'saves trees', async play(st) {
    st.set('st-recy', false); st.pose('wk', 'stand');
    st.look(X.trees + 20, { dur: 1400 });
    st.set('st-trees'); st.sfx('birds', { vol: 0.8 });
    await Promise.all([
      st.walk('hoa', X.trees + 70, { speed: 170, follow: false }),
      st.walk('mai', X.trees + 120, { speed: 136, follow: false }),
      st.walk('minh', X.trees + 168, { speed: 136, follow: false }),
      st.walk('tom', X.trees + 214, { speed: 136, follow: false }),
    ]);
    for (const id of KIDS) st.face(id, -1);
    st.set('st-lb-saves'); st.fx('sparkle', X.trees, 150, { quiet: true }); st.sfx('ding', { vol: 0.5 });
    st.pose('minh', 'cheer'); st.pose('tom', 'cheer'); st.mood('tom', 'joy'); st.mood('minh', 'joy');
    await st.wait(1000);
  } },
  { key: ['I will never waste paper again'], icon: '🚌', label: 'never waste paper', async play(st) {
    st.set('st-lb-saves', false);
    for (const id of KIDS) { st.pose(id, 'stand'); st.mood(id, 'happy'); }
    st.look(X.stop + 40, { dur: 1300 });
    st.show('bus2E', true);
    await st.loop('bus', () => st.walk('bus2E', X.stop, { speed: 260, follow: false }), { vol: 0.8 });
    st.sfx('door-open', { vol: 0.6 });
    const door = X.stop + 112;
    await Promise.all(KIDS.map(async (id, i) => {
      await st.wait(i * 120);
      await st.walk(id, door, { speed: id === 'hoa' ? 170 : 136, follow: false });
      st.show(id, false);
    }));
    st.show('bus2E', false); st.show('bus2', true);
    await st.loop('bus', () => st.walk('bus2', X.stop + 200, { speed: 150, lead: 0 }), { vol: 0.8 });
    st.sfx('pop', { vol: 0.5 });
    await st.say('bus2', 'I will never waste paper again!', 2000);
  } },
];

export default {
  id: 'en069', worldW: 3740, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS, order: [0, 2, 3, 5, 6, 7, 11, 13],
  cast: [
    { id: 'truck', kind: 'thing', x: X.truck, svg: TRUCK, box: [-140, -140, 280, 144] },
    { id: 'logs', kind: 'thing', x: X.truck, svg: LOGS, box: [-140, -140, 280, 144] },
    { id: 'van', kind: 'thing', x: X.dock + 20, svg: VAN, box: [-104, -124, 210, 128] },
    { id: 'busE', kind: 'thing', x: X.bus, svg: BUS(), box: [-150, -160, 300, 164] },
    { id: 'bus', kind: 'thing', x: -200, svg: BUS(busHeads()), box: [-150, -160, 300, 164] },
    { id: 'bus2E', kind: 'thing', x: 2380, svg: BUS(), box: [-150, -160, 300, 164] },
    { id: 'bus2', kind: 'thing', x: X.stop, svg: BUS(busHeads()), box: [-150, -160, 300, 164] },
    { id: 'wk', kind: 'adult', who: 'e069_worker', x: 600, s: 0.95, face: -1 },
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: X.bus + 112, s: 0.95 },
    { id: 'mai', kind: 'kid', who: 'e069_mai', x: X.bus + 112 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: X.bus + 112 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: X.bus + 112 },
  ],
  init(st) {
    st.show('busE', false); st.show('logs', false); st.show('van', false); st.show('bus2', false); st.show('bus2E', false);
    for (const id of KIDS) st.show(id, false);
  },
};
