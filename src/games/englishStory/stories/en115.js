/**
 * Bài 115 "Louis Braille's Dots" (could / couldn't; quá khứ đơn). Nước Pháp đầu thế kỉ 19, đi từ trái sang phải: làng
 * Coupvray (nhà đá, mẹ bế em bé năm 1809) → xưởng làm yên cương của bố (dây da treo tường, bàn thợ, cái dùi) → đường làng,
 * cột cây số PARIS → Paris (tháp nhà thờ Đức Bà phía xa, trường cho trẻ khiếm thị) → lớp học (sách chữ nổi to, bàn học,
 * góc bàn đêm có cây nến và cửa sổ).
 * Bé bị thương mắt được diễn nhẹ nhàng: ngôi sao nhỏ "!", bé che mắt, bố chạy tới ôm; mất thị lực = khung tối dần quanh bé,
 * từ đó bé nhắm mắt, cầm gậy. Bảng chấm nổi của người lính (12 chấm, khó) → Louis làm việc ngày đêm → ô 6 chấm, chữ a b c.
 * Toạ độ cảnh: rộng 2350, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, label, speaker, thought, room, windowBox, desk, night } from '../kit.js';

const FLOOR = 282;
const W = 2350;
const X = { house: 190, ws0: 360, ws1: 840, bench: 640, stool: 440, school: 1420, cls0: 1500, d1: 1610, d2: 1710, d3: 1810, nd: 2080, cam: 1720 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e115_mum: { adult: true, hair: 'bun', hairC: '#78350F', top: 'blouse', shirt: '#A78BFA', bottom: 'longskirt', bottomC: '#475569', shoe: '#57534E' },
  e115_dad: { adult: true, hair: 'short', hairC: '#57534E', top: 'shirt', shirt: '#F5F5F4', bottom: 'pants', bottomC: '#78350F', shoe: '#44403C', moustache: true },
  e115_l3: { hair: 'neat', hairC: '#92400E', top: 'blouse', shirt: '#FDE68A', bottom: 'shorts', bottomC: '#92400E', shoe: '#78350F' },
  e115_l6: { hair: 'neat', hairC: '#92400E', top: 'blouse', shirt: '#93C5FD', bottom: 'shorts', bottomC: '#57534E', shoe: '#78350F' },
  e115_l10: { hair: 'neat', hairC: '#92400E', top: 'jacket', shirt: '#1E3A8A', inner: '#FFFFFF', bottom: 'pants', bottomC: '#57534E', shoe: '#44403C' },
  e115_k1: { hair: 'short', hairC: '#3B2A22', top: 'jacket', shirt: '#7C2D12', inner: '#FFFFFF', bottom: 'pants', bottomC: '#44403C', shoe: '#44403C' },
  e115_k2: { hair: 'curly', hairC: '#A16207', top: 'jacket', shirt: '#166534', inner: '#FFFFFF', bottom: 'pants', bottomC: '#44403C', shoe: '#44403C' },
  e115_capt: { adult: true, hair: 'short', hairC: '#57534E', top: 'jacket', shirt: '#1E40AF', inner: '#FFFFFF', bottom: 'pants', bottomC: '#F5F5F4', shoe: '#1C1917', hat: 'police', moustache: true },
});

/** Ô chữ nổi: dots = các số 1..6 (1-2-3 cột trái, 4-5-6 cột phải), gốc giữa ô, khoảng cách g. */
const cell = (dots, g = 8, r = 2.6, on = '#1F2937', offC = '#E7E5E4') => [1, 2, 3, 4, 5, 6].map((n) => {
  const x = (n > 3 ? 1 : -1) * g * 0.5, y = (((n - 1) % 3) - 1) * g;
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${dots.includes(n) ? on : offC}"${dots.includes(n) ? '' : ` stroke="#D6D3D1" stroke-width="0.5"`}/>`;
}).join('');
const BABY = `<g transform="translate(-2 -10)"><ellipse cx="0" cy="4" rx="16" ry="9" fill="#FEF3C7" stroke="${L}" stroke-width="0.9"/><circle cx="-10" cy="0" r="7" fill="#FDDCB5" stroke="${L}" stroke-width="0.8"/>
  <path d="M-13 0 q1.6 1.4 3 0 M-9 -1 q1.4 1.4 3 0" stroke="${L}" stroke-width="0.8" fill="none"/><path d="M-6 6 Q4 10 14 4" stroke="#FDE68A" stroke-width="2" fill="none"/></g>`;
const APRON = `<g transform="translate(0 -14)"><path d="M-13 -18 H13 L15 30 H-15Z" fill="#92400E" stroke="${L}" stroke-width="0.9"/><path d="M-13 -18 L-17 -30 M13 -18 L17 -30" stroke="#78350F" stroke-width="1.6"/><rect x="-7" y="2" width="14" height="10" rx="1" fill="none" stroke="#78350F" stroke-width="1"/></g>`;
const SLATE = `<g transform="translate(0 -18)"><rect x="-20" y="-14" width="40" height="28" rx="2" fill="#78350F" stroke="${L}"/><rect x="-16" y="-10" width="32" height="20" fill="#FEF3C7"/>
  <g transform="translate(-8 0)">${cell([1, 4, 5], 6, 1.8)}</g><g transform="translate(8 0)">${cell([1, 2, 4, 5], 6, 1.8)}</g></g>`;
const BOARD12 = `<g transform="translate(0 -20)"><rect x="-22" y="-18" width="44" height="36" rx="2" fill="#FEF3C7" stroke="${L}"/>${[-11, 11].map((x) => [0, 1, 2, 3, 4, 5].map((j) => `<circle cx="${x + (j % 2 ? 4 : -4)}" cy="${-13 + j * 5}" r="1.6" fill="${(j * 7 + x) % 3 ? '#1F2937' : '#D6D3D1'}"/>`).join('')).join('')}</g>`;
const PROPS = {
  e115_awl: `<g transform="rotate(180)"><rect x="-3" y="-4" width="6" height="12" rx="2.4" fill="#B45309" stroke="${L}" stroke-width="0.7"/><path d="M0 8 V20" stroke="#94A3B8" stroke-width="1.6" stroke-linecap="round"/></g>`,
  e115_cane: `<g transform="rotate(-8)"><path d="M0 -4 V64" stroke="#F5F5F4" stroke-width="3" stroke-linecap="round"/><path d="M0 -4 V64" stroke="${L}" stroke-width="0.6" fill="none"/><path d="M0 52 V64" stroke="#DC2626" stroke-width="3"/></g>`,
  e115_stylus: `<g transform="rotate(200)"><circle cx="0" cy="-2" r="3.4" fill="#B45309" stroke="${L}" stroke-width="0.6"/><path d="M0 0 V12" stroke="#94A3B8" stroke-width="1.6" stroke-linecap="round"/></g>`,
};
const POSES = {
  e115_eye: { R: [150, 262], L: [10, 4], head: 6 },
  e115_play: { R: [70, 120], L: [10, 4], head: 6 },
  e115_hug: { R: [40, -60], L: [40, -60], head: 8 },
  e115_feel: { R: [30, -20], L: [30, -20], dy: 20, head: 10 },
  e115_hold: { R: [24, -86], L: [24, -86], dy: 20, head: 10 },
  e115_show: { R: [130, 150], L: [10, 4] },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
const poplar = (x, h = 130) => `<g transform="translate(${x} ${FLOOR})"><rect x="-3" y="-20" width="6" height="20" fill="#78350F"/><g class="ek-sway" style="transform-origin:0 -20px"><ellipse cx="0" cy="${-h / 2 - 10}" rx="16" ry="${h / 2}" fill="#4D7C0F" stroke="${L}"/></g></g>`;
function bg() {
  const house = `<g><rect x="60" y="150" width="260" height="${FLOOR - 150}" fill="#E7E0D0" stroke="${L}" stroke-width="1.2"/>
    ${Array.from({ length: 16 }, (_, i) => `<ellipse cx="${74 + (i * 61) % 236}" cy="${166 + (i * 37) % 100}" rx="9" ry="5" fill="#D6CDB8"/>`).join('')}
    <path d="M44 154 L190 84 L336 154Z" fill="#78716C" stroke="${L}" stroke-width="1.2"/><rect x="250" y="88" width="20" height="40" fill="#A8A29E" stroke="${L}"/>
    <rect x="${X.house - 26}" y="196" width="52" height="${FLOOR - 196}" fill="#7C4A2A" stroke="${L}"/>
    <rect x="86" y="182" width="44" height="40" fill="#BAE6FD" stroke="${L}"/><path d="M108 182 V222 M86 202 H130" stroke="#fff" stroke-width="2"/>
    <rect x="254" y="182" width="44" height="40" fill="#BAE6FD" stroke="${L}"/><path d="M276 182 V222 M254 202 H298" stroke="#fff" stroke-width="2"/></g>`;
  const workshop = `<g>${room(X.ws0, X.ws1 - X.ws0, FLOOR, '#F3E3C3', '#B9824F')}
    <rect x="${X.ws0 - 8}" y="0" width="16" height="${FLOOR}" fill="#A8A29E" stroke="${L}"/>
    <rect x="${X.ws0 + 40}" y="48" width="200" height="24" rx="3" fill="#fff" stroke="${L}"/><text x="${X.ws0 + 140}" y="66" text-anchor="middle" ${NUN} font-size="14" fill="#7C2D12">BRAILLE WORKSHOP</text>
    ${[480, 560, 740].map((x, i) => `<g transform="translate(${x} 74)"><path d="M0 0 V6" stroke="#57534E" stroke-width="2"/><path d="M-14 6 Q-16 50 0 60 Q16 50 14 6" stroke="#92400E" stroke-width="5" fill="none"/>${i === 1 ? '<circle cx="0" cy="60" r="6" fill="#FACC15" stroke="#A16207"/>' : ''}</g>`).join('')}
    <rect x="610" y="96" width="110" height="8" fill="#A16207" stroke="${L}"/>
    ${[628, 652, 676, 700].map((x, i) => `<g transform="translate(${x} 104)">${i === 1 ? `<rect x="-3" y="0" width="6" height="12" rx="2.4" fill="#B45309" stroke="${L}" stroke-width="0.7"/><path d="M0 12 V26" stroke="#94A3B8" stroke-width="1.6"/>` : `<rect x="-2.4" y="0" width="4.8" height="14" fill="#78350F"/><path d="M-3 14 H3 V24 H-3Z" fill="#CBD5E1" stroke="${L}" stroke-width="0.5"/>`}</g>`).join('')}
    <g transform="translate(790 ${FLOOR})"><path d="M-26 0 L-20 -44 H20 L26 0" fill="#A16207" stroke="${L}"/><path d="M-30 -44 Q0 -64 30 -44Z" fill="#7C2D12" stroke="${L}"/></g></g>`;
  const notre = `<g transform="translate(1250 ${FLOOR - 40})" opacity="0.55"><rect x="-70" y="-110" width="40" height="110" fill="#94A3B8"/><rect x="30" y="-110" width="40" height="110" fill="#94A3B8"/><rect x="-30" y="-80" width="60" height="80" fill="#A5B4C8"/>
    <circle cx="0" cy="-50" r="14" fill="#CBD5E1"/><path d="M0 -150 L-6 -80 H6Z" fill="#94A3B8"/></g>`;
  const school = `<g><rect x="${X.school - 110}" y="110" width="200" height="${FLOOR - 110}" fill="#E7E5E4" stroke="${L}" stroke-width="1.2"/>
    <path d="M${X.school - 122} 112 L${X.school - 10} 74 L${X.school + 102} 112Z" fill="#64748B" stroke="${L}" stroke-width="1.2"/>
    <rect x="${X.school - 80}" y="118" width="140" height="26" rx="3" fill="#fff" stroke="${L}"/><text x="${X.school - 10}" y="137" text-anchor="middle" ${NUN} font-size="15" fill="#1D4ED8">SCHOOL</text>
    ${[-80, 30].map((d) => `<rect x="${X.school + d - 6}" y="156" width="36" height="44" fill="#BAE6FD" stroke="${L}"/><path d="M${X.school + d + 12} 156 V200" stroke="#fff" stroke-width="2"/>`).join('')}
    <path d="M${X.school - 30} ${FLOOR} V214 Q${X.school - 10} 196 ${X.school + 10} 214 V${FLOOR}Z" fill="#7C4A2A" stroke="${L}"/></g>`;
  return `
  ${sky(0, W, 315, 'e115sky')}
  ${cloud(160, 52, 0.8, 0)}${cloud(980, 60, 0.9, 2)}${cloud(1240, 44, 0.8, 4)}
  <path d="M0 214 Q300 176 600 206 T1200 196 T1500 204 V${FLOOR} H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  <rect x="0" y="${FLOOR}" width="${W}" height="${315 - FLOOR}" fill="#C8B48A" stroke="${L}"/>
  ${house}
  <g transform="translate(${X.house + 70} ${FLOOR})"><rect x="-18" y="-10" width="36" height="10" fill="#A16207"/></g>
  ${workshop}
  ${poplar(900)}${poplar(960, 110)}${poplar(1100, 140)}
  <g transform="translate(1030 ${FLOOR})"><path d="M-14 0 V-36 Q0 -48 14 -36 V0Z" fill="#E7E5E4" stroke="${L}"/><text y="-22" text-anchor="middle" ${NUN} font-size="9" fill="#B91C1C">PARIS</text><text y="-10" text-anchor="middle" ${NUN} font-size="9" fill="#44403C">40 km</text></g>
  ${notre}${school}
  <!-- lớp học -->
  ${room(X.cls0, W - X.cls0, FLOOR, '#FEF3C7', '#D9A066')}
  <rect x="${X.cls0 - 8}" y="0" width="16" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  ${windowBox(1560, 80, 80, 80)}${windowBox(2120, 70, 90, 90)}
  <g class="e115-chart" transform="translate(1900 60)"><rect x="-60" y="0" width="120" height="70" rx="3" fill="#FEF9C3" stroke="#A16207" stroke-width="4"/>
    ${[['a', [1]], ['b', [1, 2]], ['c', [1, 4]], ['d', [1, 4, 5]]].map(([t, d], i) => `<g transform="translate(${-42 + i * 28} 30)">${cell(d, 7, 2.2)}</g><text x="${-42 + i * 28}" y="62" text-anchor="middle" ${NUN} font-size="11" fill="#1F2937">${t}</text>`).join('')}</g>
  <rect x="2270" y="150" width="60" height="${FLOOR - 150}" fill="#A16207" stroke="${L}"/><rect x="2276" y="160" width="48" height="${FLOOR - 166}" fill="#92400E"/>`;
}

function fg() {
  const raised = (t, x) => `<text x="${x + 1.6}" y="22" text-anchor="middle" ${NUN} font-size="40" fill="#A8A29E">${t}</text><text x="${x}" y="20" text-anchor="middle" ${NUN} font-size="40" fill="#FEF3C7" stroke="#78716C" stroke-width="1.4">${t}</text>`;
  const book = `<g class="e115-book"><g transform="translate(${X.d2} 120)"><path d="M-96 -40 Q-48 -50 0 -40 Q48 -50 96 -40 V44 Q48 34 0 44 Q-48 34 -96 44Z" fill="#FFFBEB" stroke="${L}" stroke-width="1.4"/><path d="M0 -40 V44" stroke="${L}"/>
    ${raised('A', -64)}${raised('B', -28)}${raised('C', 30)}${raised('D', 66)}
    <g class="e115-finger"><g transform="translate(-76 -4)"><ellipse rx="6" ry="9" fill="#FDDCB5" stroke="${L}" stroke-width="0.9"/><path d="M-2 -6 h4" stroke="#F9A8A8" stroke-width="1.4"/></g></g>
    <g class="e115-snail"><g transform="translate(-60 34)"><path d="M-12 6 Q-14 0 -6 0 H10 Q16 0 18 -6" stroke="${L}" stroke-width="1" fill="#E7D3A8"/><circle cx="0" cy="-4" r="8" fill="#D97706" stroke="${L}"/><path d="M0 -4 m-4 0 a4 4 0 1 1 4 4" stroke="${L}" fill="none"/></g></g></g></g>`;
  const dots12 = `<g class="e115-hard"><g transform="translate(1910 116)"><rect x="-84" y="-46" width="168" height="92" rx="8" fill="#FFFBEB" stroke="${L}" stroke-width="1.4"/>
    ${Array.from({ length: 5 }, (_, k) => `<g transform="translate(${-64 + k * 32} -8)">${Array.from({ length: 12 }, (_, j) => `<circle cx="${(j % 2) * 9 - 4.5}" cy="${Math.floor(j / 2) * 7 - 18}" r="2.4" fill="${(j * 5 + k * 3) % 4 ? '#1F2937' : '#E7E5E4'}"/>`).join('')}</g>`).join('')}
    <g transform="translate(0 34)">${label(0, 4, 'difficult', '#DC2626', 13)}</g></g></g>`;
  const six = `<g class="e115-six"><g transform="translate(${X.nd - 120} 126)"><rect x="-110" y="-56" width="220" height="112" rx="10" fill="#FFFBEB" stroke="${L}" stroke-width="1.4"/>
    <g transform="translate(-62 -2)"><rect x="-26" y="-38" width="52" height="76" rx="8" fill="#FEF3C7" stroke="#D6D3D1"/>
      ${[1, 2, 3, 4, 5, 6].map((n) => { const x = n > 3 ? 11 : -11, y = (((n - 1) % 3) - 1) * 24; return `<g class="e115-d e115-d${n}"><circle cx="${x}" cy="${y}" r="9" fill="#1D4ED8" stroke="${L}"/><text x="${x}" y="${y + 4}" text-anchor="middle" ${NUN} font-size="10" fill="#fff">${n}</text></g>`; }).join('')}</g>
    <g class="e115-abc">${[['a', [1]], ['b', [1, 2]], ['c', [1, 4]]].map(([t, d], i) => `<g transform="translate(${16 + i * 32} -6)"><rect x="-12" y="-20" width="24" height="34" rx="4" fill="#fff" stroke="#D6D3D1"/>${cell(d, 9, 3)}</g><text x="${16 + i * 32}" y="40" text-anchor="middle" ${NUN} font-size="16" fill="#1F2937">${t}</text>`).join('')}</g></g></g>`;
  const world = `<g class="e115-world"><g transform="translate(${X.cam} 152)"><rect x="-130" y="-74" width="260" height="148" rx="12" fill="#F0F9FF" stroke="${L}" stroke-width="1.4"/>
    <clipPath id="e115clip"><circle r="46"/></clipPath><circle r="46" fill="#38BDF8" stroke="${L}" stroke-width="1.4"/>
    <g clip-path="url(#e115clip)"><g class="e115-spin">${[-120, 0, 120].map((o) => `<g transform="translate(${o} 0)"><path d="M-30 -24 Q-10 -36 4 -20 Q10 -6 -6 4 Q-24 10 -30 -6Z M14 8 Q30 4 34 20 Q24 34 12 26Z M-20 22 Q-10 18 -4 30 Q-14 40 -22 32Z" fill="#4ADE80" stroke="${L}" stroke-width="0.8"/></g>`).join('')}</g></g>
    ${Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2; return `<g transform="translate(${(Math.cos(a) * 62).toFixed(1)} ${(Math.sin(a) * 58).toFixed(1)})">${cell([[1], [1, 2], [1, 4], [1, 4, 5], [1, 5], [1, 2, 4], [2, 4], [1, 3], [1, 2, 3], [2, 3, 4]][i], 6, 1.9)}</g>`; }).join('')}
    <g transform="translate(-100 -40)"><rect x="-16" y="-20" width="32" height="44" rx="3" fill="#CBD5E1" stroke="${L}"/>${[-8, 8].map((y) => `<circle cy="${y}" r="7" fill="#fff" stroke="${L}" stroke-width="0.8"/><g transform="translate(12 ${y}) scale(0.5)">${cell([1, 2], 6, 2)}</g>`).join('')}<path d="M-3 -6 l3 -4 l3 4Z M-3 6 l3 4 l3 -4Z" fill="#475569"/></g>
    <g transform="translate(100 -36)"><rect x="-18" y="-14" width="36" height="28" rx="2" fill="#fff" stroke="${L}"/><path d="M-18 -4 H18" stroke="#16A34A" stroke-width="3"/><g transform="translate(0 6)">${cell([1, 3, 4], 5, 1.6)}</g></g>
    <g transform="translate(100 40)"><rect x="-20" y="-14" width="40" height="28" rx="2" fill="#FDE68A" stroke="${L}"/><path d="M0 -14 V14" stroke="${L}"/><ellipse cx="6" cy="0" rx="4" ry="6" fill="#FDDCB5" stroke="${L}" stroke-width="0.7"/></g>
    <g transform="translate(-100 42)">${label(0, 6, 'Braille', '#1D4ED8', 14)}</g></g></g>`;
  const vign = `<defs><radialGradient id="e115vg" cx="0.5" cy="0.5" r="0.5"><stop offset="0.25" stop-color="#1C1917" stop-opacity="0"/><stop offset="1" stop-color="#1C1917" stop-opacity="1"/></radialGradient></defs>
    <g class="e115-dark"><rect x="${X.stool - 300}" y="0" width="600" height="315" fill="url(#e115vg)"/></g>`;
  return `
  ${desk(X.d1, FLOOR, '#A16207')}${desk(X.d2, FLOOR, '#A16207')}${desk(X.d3, FLOOR, '#A16207')}${desk(X.nd, FLOOR, '#92400E')}
  <g transform="translate(${X.nd + 22} ${FLOOR - 56})"><rect x="-4" y="-22" width="8" height="22" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/><g class="e115-flame"><path d="M0 -36 Q6 -28 0 -22 Q-6 -28 0 -36Z" fill="#FACC15" stroke="#F97316" stroke-width="0.8"/><circle cy="-28" r="18" fill="#FDE68A" opacity="0.35"/></g></g>
  <g class="e115-slate"><g transform="translate(${X.nd - 12} ${FLOOR - 58})"><rect x="-18" y="-5" width="36" height="5" fill="#78350F" stroke="${L}" stroke-width="0.7"/></g></g>
  <!-- bàn thợ của bố (che chân) -->
  <g transform="translate(${X.bench} 0)"><rect x="-60" y="${FLOOR - 64}" width="120" height="10" rx="2" fill="#92400E" stroke="${L}"/><rect x="-54" y="${FLOOR - 54}" width="10" height="54" fill="#78350F" stroke="${L}"/><rect x="44" y="${FLOOR - 54}" width="10" height="54" fill="#78350F" stroke="${L}"/>
    <path d="M-40 ${FLOOR - 64} q20 -10 40 0" stroke="#7C2D12" stroke-width="4" fill="none"/><g class="e115-awl"><g transform="translate(-44 ${FLOOR - 68}) rotate(80)"><rect x="-3" y="-4" width="6" height="12" rx="2.4" fill="#B45309" stroke="${L}" stroke-width="0.7"/><path d="M0 8 V20" stroke="#94A3B8" stroke-width="1.6"/></g></g></g>
  ${night(X.cls0, W - X.cls0, 315, 2165)}
  ${vign}
  <g class="e115-ouch"><g transform="translate(${X.bench - 112} 186)"><path d="M0 -14 L4 -4 L14 -4 L6 2 L9 12 L0 6 L-9 12 L-6 2 L-14 -4 L-4 -4Z" fill="#FDE047" stroke="#F59E0B" stroke-width="1"/><text y="4" text-anchor="middle" ${NUN} font-size="10" fill="#B91C1C">!</text></g></g>
  ${thought(X.stool + 80, 110, 120, 70, `<g transform="translate(-12 4)"><rect x="-26" y="-18" width="52" height="36" rx="3" fill="#fff" stroke="${L}"/><path d="M0 -18 V18" stroke="${L}"/><path d="M-20 -8 H-6 M-20 0 H-6 M-20 8 H-8 M6 -8 H20 M6 0 H18" stroke="#94A3B8" stroke-width="2"/></g><g transform="translate(36 0)"><circle r="13" fill="#fff" stroke="#EA580C" stroke-width="2"/><text y="7" text-anchor="middle" ${NUN} font-size="19" fill="#EA580C">?</text></g>`, [X.stool + 20, 186], 'e115-think')}
  ${book}${dots12}${six}${world}
  <!-- nhãn -->
  <g class="e115-lb e115-lb-born">${label(X.house + 10, 66, 'France, 1809', '#1D4ED8', 18)}</g>
  <g class="e115-lb e115-lb-name">${speaker(X.house + 92, 150, 'Louis', '#DB2777')}</g>
  <g class="e115-lb e115-lb-three">${label(X.bench - 110, 92, 'three', '#EA580C', 16)}</g>
  <g class="e115-lb e115-lb-see">${label(X.stool + 100, 96, "couldn't see", '#F8FAFC', 16)}</g>
  <g class="e115-lb e115-lb-ten">${label(1260, 66, 'At ten', '#EA580C', 18)}</g>
  <g class="e115-lb e115-lb-paris">${label(X.school - 10, 60, 'Paris', '#1D4ED8', 18)}</g>
  <g class="e115-lb e115-lb-big">${label(X.d2, 70, 'big raised letters', '#7C2D12', 15)}</g>
  <g class="e115-lb e115-lb-slow">${label(X.d2 + 130, 150, 'slow', '#16A34A', 16)}</g>
  <g class="e115-lb e115-lb-oneday">${label(X.cam - 70, 66, 'One day', '#7C3AED', 17)}</g>
  <g class="e115-lb e115-lb-dots">${label(1910, 104, 'raised dots', '#1D4ED8', 15)}</g>
  <g class="e115-lb e115-lb-dn">${label(X.nd - 60, 56, 'day and night', '#EA580C', 16)}</g>
  <g class="e115-lb e115-lb-fifteen">${label(X.nd - 120, 62, 'At fifteen: six dots', '#1D4ED8', 15)}</g>
  <g class="e115-lb e115-lb-today">${label(X.cam, 66, 'Today', '#16A34A', 18)}</g>`;
}

const CSS = `
.e115-lb { opacity: 0; transition: opacity .3s; }
${['born', 'name', 'three', 'see', 'ten', 'paris', 'big', 'slow', 'oneday', 'dots', 'dn', 'fifteen', 'today'].map((k) => `.st-lb-${k} .e115-lb-${k}`).join(', ')} { opacity: 1; }
.e115-lb-see rect { fill: #1C1917; }
.e115-awl { transition: opacity .2s; }
.st-awl .e115-awl { opacity: 0; }
.e115-ouch { opacity: 0; transform-box: fill-box; transform-origin: 50% 50%; }
.st-ouch .e115-ouch { animation: e115Ouch .9s ease-out both; }
@keyframes e115Ouch { 0% { opacity: 0; transform: scale(.3); } 30% { opacity: 1; transform: scale(1.2); } 70% { opacity: 1; transform: scale(1); } 100% { opacity: 0; } }
.e115-dark { opacity: 0; transition: opacity 1.6s ease-in; pointer-events: none; }
.st-dark .e115-dark { opacity: .9; }
.e115-think, .e115-book, .e115-hard, .e115-six, .e115-world { opacity: 0; transition: opacity .35s; }
.st-think .e115-think, .st-book .e115-book, .st-hard .e115-hard, .st-six .e115-six, .st-world .e115-world { opacity: 1; }
.st-slow .e115-finger { animation: e115Trace 3s linear both; }
@keyframes e115Trace { 0% { transform: none; } 30% { transform: translate(20px, -10px); } 55% { transform: translate(40px, 8px); } 100% { transform: translate(52px, -6px); } }
.e115-snail { opacity: 0; }
.st-slow .e115-snail { opacity: 1; animation: e115Snail 3s linear both; }
@keyframes e115Snail { to { transform: translateX(60px); } }
.e115-d, .e115-abc { opacity: 0; }
${[1, 2, 3, 4, 5, 6].map((n) => `.st-d${n} .e115-d${n}`).join(', ')} { opacity: 1; animation: e115Pop .35s cubic-bezier(.3,1.6,.6,1) both; transform-box: fill-box; transform-origin: 50% 50%; }
@keyframes e115Pop { from { transform: scale(.2); } to { transform: none; } }
.st-abc .e115-abc { opacity: 1; transition: opacity .4s; }
.e115-chart { opacity: 0; transition: opacity .5s; }
.st-chart .e115-chart { opacity: 1; }
.e115-flame { opacity: 0; transition: opacity .4s; }
.st-night .e115-flame { opacity: 1; animation: e115Fl .3s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: 50% 100%; }
@keyframes e115Fl { to { transform: scaleY(1.12) rotate(3deg); } }
.st-night .ek-night { opacity: 1; }
.e115-spin { animation: e115Spin 6s linear infinite; }
@keyframes e115Spin { from { transform: translateX(-60px); } to { transform: translateX(60px); } }
@media (prefers-reduced-motion: reduce) { .e115-spin { animation-duration: 14s; } .st-night .e115-flame { animation-duration: .8s; } }
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
/** Louis lớn lên: đổi bộ đồ và cỡ người. */
const grow = (st, who, s) => { const A = st.a('louis'); A.who = who; A.s = s; A.build(); };
const LB = (k) => `st-lb-${k}`;

const BEATS = [
  { key: ['Louis Braille was born in France in 1809'], icon: '👶', label: 'born in 1809', async play(st) {
    st.look(X.house + 40);
    st.set(LB('born')); st.sfx('ding', { vol: 0.4 });
    await st.wait(500);
    st.chest('mum', BABY); st.pose('mum', 'carry'); st.act('mum', 'hop'); st.mood('mum', 'joy');
    st.sfx('hearts', { vol: 0.5 });
    await st.wait(500);
    st.set(LB('name'));
    await st.wait(1300);
    st.act('mum', null);
  } },
  { key: ['When he was three', "his father's workshop", 'hurt his eye'], icon: '🔨', label: "father's workshop", async play(st) {
    off(st, LB('born'), LB('name'));
    st.show('mum', false);
    st.look(X.bench - 40);
    st.place('louis', X.bench - 130, FLOOR, 1); st.show('louis', true);
    st.set(LB('three'));
    st.pose('dad', 'stir'); st.act('dad', 'stir');
    for (let i = 0; i < 2; i++) { st.sfx('knock', { vol: 0.4, rate: 1.4 }); await st.wait(300); }
    await st.walk('louis', X.bench - 92, { speed: 90, follow: false });
    st.set('st-awl'); st.hold('louis', 'e115_awl'); st.pose('louis', 'e115_play'); st.mood('louis', 'joy');
    await st.wait(800);
    st.set('st-ouch'); st.sfx('pop', { vol: 0.6, rate: 0.8 });
    st.hold('louis', null); st.pose('louis', 'e115_eye'); st.mood('louis', 'cry');
    st.act('dad', null); st.mood('dad', 'wow');
    await st.wait(300);
    await st.walk('dad', X.bench - 50, { speed: 200, follow: false });
    st.face('dad', -1); st.pose('dad', 'e115_hug');
    await st.wait(800);
  } },
  { key: ["Soon, he couldn't see at all"], icon: '🌑', label: "couldn't see", async play(st) {
    off(st, LB('three'), 'st-ouch');
    st.walk('louis', X.stool, { speed: 60, follow: false });
    st.look(X.stool + 60);
    st.pose('dad', 'stand'); st.mood('dad', 'sad'); st.face('dad', -1);
    st.set('st-dark'); st.sfx('wind', { vol: 0.3, rate: 0.8 });
    await st.wait(1300);
    st.mood('louis', 'shut');
    st.set(LB('see'));
    await st.wait(1200);
  } },
  { key: ['Louis wanted to read'], icon: '📖', label: 'wanted to read', async play(st) {
    off(st, 'st-dark', LB('see'));
    grow(st, 'e115_l6', 0.82);
    st.place('louis', X.stool, FLOOR, 1);
    st.mood('louis', 'shut'); st.mood('dad', 'happy');
    st.walk('dad', X.bench + 20, { speed: 120, follow: false });
    st.chest('louis', 'book'); st.pose('louis', 'e115_hold');
    st.sfx('page-turn', { vol: 0.6 });
    await st.wait(500);
    st.set('st-think'); st.sfx('pop', { vol: 0.35 });
    await st.wait(600);
    st.sfx('page-turn', { vol: 0.5, rate: 1.2 });
    await st.wait(900);
  } },
  { key: ['At ten', 'a school for blind children in Paris'], icon: '🏫', label: 'school in Paris', async play(st) {
    st.set('st-think', false);
    st.chest('louis', null); st.pose('louis', 'stand');
    grow(st, 'e115_l10', 0.95);
    st.hold('louis', 'e115_cane');
    st.place('louis', 1020, FLOOR, 1); st.place('dad', 960, FLOOR, 1); st.chest('dad', null); st.pose('dad', 'stand');
    st.look(1180, { instant: true });
    st.set(LB('ten')); st.sfx('ding', { vol: 0.35 });
    const go = Promise.all([
      st.walk('dad', X.school - 60, { speed: 120, follow: false }),
      st.walk('louis', X.school - 10, { speed: 120, follow: true, lead: -20 }),
    ]);
    await st.wait(900); st.set(LB('ten'), false); st.set(LB('paris'));
    await go;
    st.sfx('door-open', { vol: 0.5 });
    st.face('dad', 1); st.pose('dad', 'wave');
    await st.wait(600);
  } },
  { key: ['The books had big raised letters'], icon: '🔤', label: 'raised letters', async play(st) {
    off(st, LB('paris'));
    st.show('dad', false);
    st.hold('louis', null); st.place('louis', X.d2, FLOOR, 1); st.pose('louis', 'e115_feel'); st.mood('louis', 'shut');
    st.look(X.cam, { instant: true });
    await st.wait(300);
    st.set('st-book'); st.sfx('bump', { vol: 0.5 });
    await st.wait(400);
    st.set(LB('big')); st.sfx('pop', { vol: 0.35 });
    await st.wait(1200);
  } },
  { key: ['Reading them was slow'], icon: '🐌', label: 'slow', async play(st) {
    st.set('st-slow'); st.set(LB('slow'));
    await st.loop('tick', () => st.wait(2600), { vol: 0.6 });
    st.mood('louis', 'sad');
    await st.wait(300);
  } },
  { key: ['a soldier showed the school', 'writing with raised dots'], icon: '⠿', label: 'raised dots', async play(st) {
    off(st, 'st-book', 'st-slow', LB('big'), LB('slow'));
    st.mood('louis', 'shut'); st.pose('louis', 'sitDesk');
    st.set(LB('oneday'));
    st.look(X.cam + 60, { dur: 1400 });
    st.show('capt', true); st.chest('capt', BOARD12); st.pose('capt', 'carry');
    await st.walk('capt', 1910, { speed: 120, follow: false });
    st.face('capt', -1); st.pose('capt', 'e115_show');
    st.chest('capt', null); st.hold('capt', 'e115_board');
    st.sfx('knock', { vol: 0.4, rate: 1.6 }); st.set(LB('dots'));
    for (const id of ['k1', 'k2', 'louis']) st.mood(id, id === 'louis' ? 'shut' : 'wow');
    await st.wait(1400);
  } },
  { key: ['It was difficult', 'day and night'], icon: '🕯️', label: 'day and night', async play(st) {
    off(st, LB('oneday'), LB('dots'));
    st.set('st-hard'); st.sfx('buzz-no', { vol: 0.35 });
    st.mood('louis', 'sad');
    await st.wait(1000);
    st.set('st-hard', false);
    st.show('capt', false); st.hold('capt', null);
    st.place('louis', X.nd, FLOOR, 1); st.pose('louis', 'sitDesk'); st.mood('louis', 'shut');
    st.hold('louis', 'e115_stylus'); st.act('louis', 'write');
    st.look(X.nd - 60);
    st.set(LB('dn'));
    for (let i = 0; i < 2; i++) {
      st.set('st-night'); st.sfx('crickets', { vol: 0.35 });
      for (let j = 0; j < 3; j++) { st.sfx('knock', { vol: 0.3, rate: 1.8 }); await st.wait(280); }
      st.set('st-night', false); st.sfx('birds', { vol: 0.3 });
      for (let j = 0; j < 2; j++) { st.sfx('knock', { vol: 0.3, rate: 1.8 }); await st.wait(280); }
    }
    st.set('st-night');
    await st.wait(300);
  } },
  { key: ['At fifteen', 'a new alphabet with six dots'], icon: '6️⃣', label: 'six dots', async play(st) {
    off(st, LB('dn'), 'st-night');
    st.act('louis', null); st.hold('louis', null);
    grow(st, 'e115_l10', 1.1);
    st.place('louis', X.nd + 10, FLOOR, -1); st.pose('louis', 'e115_show'); st.chest('louis', null);
    st.hold('louis', 'e115_slate'); st.mood('louis', 'joy');
    st.look(X.nd - 70);
    st.set('st-six'); st.set(LB('fifteen'));
    for (let n = 1; n <= 6; n++) { await st.wait(230); st.set(`st-d${n}`); st.sfx('pop', { vol: 0.4, rate: 0.9 + n * 0.1 }); }
    await st.wait(300);
    st.set('st-abc'); st.set('st-chart'); st.sfx('sparkle', { vol: 0.5 });
    await st.wait(900);
  } },
  { key: ['Blind people could read it with their fingers', 'they could write it, too'], icon: '☝️', label: 'read and write', async play(st) {
    off(st, 'st-six', 'st-abc', LB('fifteen'), ...[1, 2, 3, 4, 5, 6].map((n) => `st-d${n}`));
    st.look(X.cam);
    st.hold('louis', null); st.pose('louis', 'stand');
    st.place('louis', X.d2 + 24, FLOOR, 1); st.mood('louis', 'joy');
    st.chest('k1', SLATE); st.pose('k1', 'e115_hold'); st.mood('k1', 'joy');
    st.chest('k2', null); st.pose('k2', 'sitDesk'); st.act('k2', 'write'); st.mood('k2', 'joy');
    st.sfx('page-turn', { vol: 0.4 });
    await st.wait(500);
    st.fx('sparkle', X.d1, FLOOR - 110, { quiet: true }); st.sfx('giggle', { vol: 0.4 });
    for (let j = 0; j < 4; j++) { st.sfx('knock', { vol: 0.3, rate: 1.8 }); await st.wait(260); }
    st.pose('louis', 'clap'); st.act('louis', 'clap'); st.sfx('clap', { vol: 0.4 });
    await st.wait(800);
    st.act('louis', null); st.act('k2', null);
  } },
  { key: ['Today', 'people around the world use Braille'], icon: '🌍', label: 'around the world', async play(st) {
    st.look(X.cam);
    st.set(LB('today')); st.sfx('ding', { vol: 0.4 });
    await st.wait(300);
    st.set('st-world'); st.sfx('sparkle', { vol: 0.5 });
    await st.wait(700);
    st.sfx('cheer', { vol: 0.45 });
    for (const id of ['k1', 'k2', 'louis']) st.mood(id, 'joy');
    st.act('louis', 'hop');
    await st.wait(1400);
  } },
];

export default {
  id: 'en115', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  props: { ...PROPS, e115_board: `<g transform="translate(0 -6) rotate(180)">${BOARD12}</g>`, e115_slate: `<g transform="translate(0 -6) rotate(180)">${SLATE}</g>` },
  order: [0, 1, 4, 5, 8, 9],
  cast: [
    { id: 'mum', kind: 'adult', who: 'e115_mum', x: X.house + 40 },
    { id: 'k1', kind: 'kid', who: 'e115_k1', x: X.d1 },
    { id: 'k2', kind: 'kid', who: 'e115_k2', x: X.d3 },
    { id: 'capt', kind: 'adult', who: 'e115_capt', x: 2290, face: -1 },
    { id: 'dad', kind: 'adult', who: 'e115_dad', x: X.bench + 20, face: -1 },
    { id: 'louis', kind: 'kid', who: 'e115_l3', x: X.bench - 130, s: 0.72 },
  ],
  init(st) {
    for (const id of ['louis', 'capt']) st.show(id, false);
    st.chest('dad', APRON);
    for (const id of ['k1', 'k2']) { st.pose(id, 'sitDesk'); }
  },
};
