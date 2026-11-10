/**
 * Bài 11 "At the Zoo": cổng sở thú → bảng ANIMALS → chuồng voi → hươu cao cổ (cây keo) → khu khỉ (2 cây + cột leo)
 * → rắn (bãi đá) → cá sấu (ao) → hổ (đồng cỏ). Minh, Lan và bố đi từ trái sang phải theo đúng thứ tự câu; câu cuối
 * Minh chạy về khu khỉ, chú khỉ nhỏ trèo xuống đứng cạnh Minh ("small, like me").
 * Toạ độ cảnh: rộng 2600, cao 315; người đứng ở y = 282 (lối đi), thú đứng ở y = 266 (trong chuồng, lùi vào trong).
 * Con vật là kind:'thing' (vẽ quay sang phải, face:-1 để nhìn về phía nhà Minh); khỉ vẽ trong nền (trèo lên / xuống = st-*).
 */
import { L, sky, cloud, tree, bush, fence, flowerAt, label, KIT_CSS } from '../kit.js';

const FLOOR = 282;
const G = 266; // mặt đất trong chuồng
const W = 2600;
const FONT = 'font-family="Nunito, sans-serif" font-weight="900"';

// ── Nhãn chữ (lớp trước): mỗi nhãn hiện khi có trạng thái st-* tương ứng ─────────────────
const LABS = [
  ['st-tagM', 435, 134, 'Minh', '#EA580C', 15],
  ['st-tagL', 385, 122, 'Lan', '#DB2777', 15],
  ['st-tagD', 330, 98, 'Dad', '#2563EB', 15],
  ['st-big2', 400, 84, 'big', '#DC2626', 24],
  ['st-big5', 830, 100, 'big', '#DC2626', 22],
  ['st-big5', 975, 100, 'grey', '#475569', 22],
  ['st-ears', 975, 104, 'big ears', '#7C3AED', 19],
  ['st-nose', 715, 108, 'a long nose', '#7C3AED', 19],
  ['st-tall', 1318, 128, 'tall', '#DC2626', 24],
  ['st-neck', 1045, 108, 'a long neck', '#B45309', 19],
  ['st-small11', 1470, 150, 'small', '#2563EB', 20],
  ['st-small11', 1590, 176, 'funny', '#DB2777', 20],
  ['st-snake', 1800, 212, 'long', '#DC2626', 19],
  ['st-snake', 1910, 212, 'green', '#16A34A', 19],
  ['st-croc', 2075, 200, 'long, too', '#DC2626', 19],
  ['st-tiger', 2335, 132, 'big', '#DC2626', 22],
  ['st-tiger', 2480, 132, 'orange', '#EA580C', 22],
  ['st-small17', 1568, 98, 'small, like me', '#2563EB', 19],
];
const labs = () => LABS.map(([s, x, y, t, c, z]) => `<g class="e011-lab e011-l-${s}">${label(x, y, t, c, z)}</g>`).join('');
const labCss = () => [...new Set(LABS.map((l) => l[0]))].map((s) => `.${s} .e011-l-${s} { opacity: 1; transform: none; }`).join('\n');

// ── Đồ vật nhỏ ────────────────────────────────────────────────────────────
/** Biển tên chuồng (gỗ, cắm cọc). */
const sign = (x, y, text) => {
  const w = text.length * 11 + 24;
  return `<path d="M${x} ${y + 12} V${G - 4}" stroke="#92400E" stroke-width="5"/>
  <rect x="${x - w / 2}" y="${y - 14}" width="${w}" height="28" rx="6" fill="#FDE68A" stroke="${L}" stroke-width="1.3"/>
  <text x="${x}" y="${y + 6}" text-anchor="middle" ${FONT} font-size="16" fill="#7C2D12">${text}</text>`;
};
/** Mặt thú nhỏ trên bảng ANIMALS. */
const ICONS = [
  (c) => `<circle r="11" fill="#94A3B8" stroke="${L}"/><ellipse cx="-11" cy="-1" rx="6" ry="8" fill="#A5B4C8" stroke="${L}"/><ellipse cx="11" cy="-1" rx="6" ry="8" fill="#A5B4C8" stroke="${L}"/><path d="M0 2 V14" stroke="${L}" stroke-width="5" stroke-linecap="round"/><path d="M0 2 V14" stroke="#94A3B8" stroke-width="3.4" stroke-linecap="round"/>${c}`,
  (c) => `<path d="M-5 -10 V-16 M5 -10 V-16" stroke="${L}" stroke-width="2"/><circle r="11" fill="#FCD34D" stroke="${L}"/><circle cx="-5" cy="6" r="2.4" fill="#D97706"/><circle cx="6" cy="-7" r="2" fill="#D97706"/>${c}`,
  (c) => `<circle cx="-11" cy="0" r="5" fill="#92400E" stroke="${L}"/><circle cx="11" cy="0" r="5" fill="#92400E" stroke="${L}"/><circle r="11" fill="#92400E" stroke="${L}"/><ellipse cx="0" cy="3" rx="8" ry="7" fill="#F5D0A9"/>${c}`,
  (c) => `<circle r="11" fill="#22C55E" stroke="${L}"/><path d="M0 9 V15 l-2 2 M0 15 l2 2" stroke="#EF4444" stroke-width="1.4" fill="none"/>${c}`,
  (c) => `<ellipse rx="14" ry="9" fill="#22A447" stroke="${L}"/><path d="M-8 4 l2 3 l2 -3 l2 3 l2 -3 l2 3 l2 -3" stroke="#fff" stroke-width="1.3" fill="none"/>${c}`,
  (c) => `<circle cx="-9" cy="-8" r="4.6" fill="#F97316" stroke="${L}"/><circle cx="9" cy="-8" r="4.6" fill="#F97316" stroke="${L}"/><circle r="11" fill="#F97316" stroke="${L}"/><path d="M-2 -10 v4 M2 -10 v4" stroke="#1F2937" stroke-width="1.6"/><ellipse cx="0" cy="5" rx="6" ry="4" fill="#FFF7ED"/>${c}`,
];
const iconEyes = `<circle cx="-4" cy="-2" r="1.6" fill="#2B1D16"/><circle cx="4" cy="-2" r="1.6" fill="#2B1D16"/>`;

/** Khỉ con (vẽ trong nền, gốc = chân). Tay .e011-aL / .e011-aR xoay quanh vai khi trèo, vẫy. */
const MK = '#92400E', MKF = '#F5D0A9';
const arm = (s) => `<g class="e011-a${s > 0 ? 'R' : 'L'}" style="transform-origin:${s * 8}px -26px"><path d="M${s * 8} -26 L${s * 14} -10" stroke="${L}" stroke-width="6.4" stroke-linecap="round"/>
  <path d="M${s * 8} -26 L${s * 14} -10" stroke="${MK}" stroke-width="4.6" stroke-linecap="round"/><circle cx="${s * 14}" cy="-9" r="3" fill="${MKF}" stroke="${L}" stroke-width="0.7"/></g>`;
const monkey = (x, n) => `<g transform="translate(${x} ${G})"><g class="e011-m e011-m${n}"><g class="e011-mi" style="transform-origin:0px -26px">
  <path d="M8 -8 Q28 -8 25 -26 Q23 -36 15 -33" stroke="${L}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M8 -8 Q28 -8 25 -26 Q23 -36 15 -33" stroke="${MK}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
  <ellipse cx="-6" cy="-3" rx="6" ry="4" fill="${MK}" stroke="${L}"/><ellipse cx="6" cy="-3" rx="6" ry="4" fill="${MK}" stroke="${L}"/>
  <ellipse cx="0" cy="-18" rx="11" ry="14" fill="${MK}" stroke="${L}"/><ellipse cx="0" cy="-15" rx="7" ry="9" fill="${MKF}"/>
  ${arm(-1)}${arm(1)}
  <circle cx="-12" cy="-41" r="5" fill="${MK}" stroke="${L}"/><circle cx="-12" cy="-41" r="2.6" fill="${MKF}"/><circle cx="12" cy="-41" r="5" fill="${MK}" stroke="${L}"/><circle cx="12" cy="-41" r="2.6" fill="${MKF}"/>
  <circle cx="0" cy="-41" r="11" fill="${MK}" stroke="${L}"/><path d="M-8 -40 Q-8 -47 -2 -46 Q0 -44 2 -46 Q8 -47 8 -40 Q8 -31 0 -31 Q-8 -31 -8 -40Z" fill="${MKF}"/>
  <circle cx="-3.4" cy="-41" r="1.7" fill="#2B1D16"/><circle cx="3.4" cy="-41" r="1.7" fill="#2B1D16"/><path d="M-3 -35 Q0 -32 3 -35" stroke="${L}" stroke-width="1.1" fill="none" stroke-linecap="round"/>
</g></g></g>`;

// ── Con vật (kind:'thing', gốc = điểm chạm đất, vẽ quay sang phải) ────────────────────────
const EL = '#94A3B8', ELD = '#7C8BA1';
const ELEPHANT = `<g class="e011-eb" style="transform-origin:0px 0px">
  <path d="M-86 -100 Q-100 -86 -96 -62" stroke="${L}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-86 -100 Q-100 -86 -96 -62" stroke="${EL}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <rect x="-66" y="-62" width="26" height="62" rx="9" fill="${ELD}" stroke="${L}"/><rect x="36" y="-62" width="26" height="62" rx="9" fill="${ELD}" stroke="${L}"/>
  <ellipse cx="-4" cy="-96" rx="88" ry="56" fill="${EL}" stroke="${L}" stroke-width="1.4"/>
  <path d="M-60 -120 q10 -6 20 0 M-30 -134 q10 -6 20 0" stroke="${ELD}" stroke-width="1.6" fill="none"/>
  <rect x="-48" y="-66" width="28" height="66" rx="10" fill="${EL}" stroke="${L}"/><rect x="54" y="-66" width="28" height="66" rx="10" fill="${EL}" stroke="${L}"/>
  ${[-34, 68].map((x) => `<path d="M${x - 8} -4 h5 M${x + 3} -4 h5" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`).join('')}
  <g class="e011-trunk" style="transform-origin:104px -100px"><path d="M98 -112 Q124 -94 118 -52 Q114 -26 128 -18" stroke="${L}" stroke-width="19" fill="none" stroke-linecap="round"/>
    <path d="M98 -112 Q124 -94 118 -52 Q114 -26 128 -18" stroke="${EL}" stroke-width="16.4" fill="none" stroke-linecap="round"/>
    <path d="M110 -66 h12 M108 -52 h11 M112 -38 h10" stroke="${ELD}" stroke-width="1.4"/></g>
  <circle cx="80" cy="-114" r="40" fill="${EL}" stroke="${L}" stroke-width="1.4"/>
  <path d="M98 -90 Q110 -76 124 -82 Q112 -86 106 -96Z" fill="#FFFBEB" stroke="${L}"/>
  <g class="e011-ear" style="transform-origin:72px -112px"><path d="M72 -148 Q28 -152 26 -110 Q28 -68 72 -76Z" fill="#A5B4C8" stroke="${L}" stroke-width="1.4"/>
    <path d="M68 -138 Q38 -140 36 -110 Q38 -82 68 -86Z" fill="#F9A8D4" opacity="0.75"/></g>
  <ellipse cx="96" cy="-124" rx="3.4" ry="4.4" fill="#2B1D16"/><circle cx="97" cy="-126" r="1.2" fill="#fff"/>
  <ellipse cx="104" cy="-106" rx="6" ry="3.6" fill="#F9A8A8" opacity="0.6"/></g>`;

const GY = '#FCD34D', GS = '#D97706';
const gLeg = (x, near) => `<rect x="${x - 5}" y="-92" width="10" height="88" rx="4" fill="${near ? GY : '#EAB308'}" stroke="${L}"/><rect x="${x - 6}" y="-7" width="12" height="7" rx="2" fill="#78350F" stroke="${L}" stroke-width="0.7"/>`;
const GIRAFFE = `
  <path d="M-44 -104 Q-54 -88 -50 -66" stroke="${L}" stroke-width="4" fill="none"/><path d="M-44 -104 Q-54 -88 -50 -66" stroke="${GY}" stroke-width="2.4" fill="none"/><ellipse cx="-50" cy="-63" rx="3.4" ry="5.4" fill="#78350F"/>
  ${gLeg(-28, false)}${gLeg(26, false)}
  <g class="e011-neck" style="transform-origin:30px -100px">
    <path d="M12 -102 L38 -116 L68 -186 L50 -194Z" fill="${GY}" stroke="${L}" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M14 -110 L50 -190" stroke="#B45309" stroke-width="3.4" stroke-dasharray="3 3"/>
    ${[[34, -124, 6], [44, -146, 5], [54, -168, 4.4], [26, -110, 4]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.8}" fill="${GS}"/>`).join('')}
    <g class="e011-gh" style="transform-origin:56px -192px">
      <path d="M53 -200 V-212 M61 -200 L63 -212" stroke="${L}" stroke-width="3.4" stroke-linecap="round"/><circle cx="53" cy="-213" r="3" fill="#78350F"/><circle cx="63" cy="-213" r="3" fill="#78350F"/>
      <ellipse cx="45" cy="-201" rx="8" ry="3.6" fill="${GY}" stroke="${L}" transform="rotate(-20 45 -201)"/>
      <ellipse cx="62" cy="-195" rx="16" ry="11" fill="${GY}" stroke="${L}"/>
      <ellipse cx="77" cy="-190" rx="9" ry="8" fill="#FDE68A" stroke="${L}"/><circle cx="81" cy="-193" r="1.3" fill="${L}"/>
      <ellipse cx="64" cy="-199" rx="2.6" ry="3.2" fill="#2B1D16"/><circle cx="65" cy="-200" r="0.9" fill="#fff"/>
      <path d="M74 -184 q4 3 8 0" stroke="${L}" stroke-width="1.1" fill="none" stroke-linecap="round"/></g>
  </g>
  <ellipse cx="0" cy="-100" rx="48" ry="24" fill="${GY}" stroke="${L}" stroke-width="1.4"/>
  ${[[-26, -104, 8], [-6, -112, 7], [14, -98, 8], [-22, -88, 5], [30, -108, 5], [2, -88, 5]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.75}" fill="${GS}"/>`).join('')}
  ${gLeg(-38, true)}${gLeg(34, true)}`;

const SNAKE = `<g class="e011-snLong"><g class="e011-sw" style="transform-origin:0px -6px">
  <path d="M-72 -6 C-60 -22 -46 10 -30 -6 S-2 10 14 -6 S40 -18 54 -10" stroke="${L}" stroke-width="12" fill="none" stroke-linecap="round"/>
  <path d="M-72 -6 C-60 -22 -46 10 -30 -6 S-2 10 14 -6 S40 -18 54 -10" stroke="#22C55E" stroke-width="9.6" fill="none" stroke-linecap="round"/>
  <path d="M-72 -6 C-60 -22 -46 10 -30 -6 S-2 10 14 -6 S40 -18 54 -10" stroke="#15803D" stroke-width="3" fill="none" stroke-dasharray="2 9"/>
  <ellipse cx="62" cy="-12" rx="12" ry="8" fill="#22C55E" stroke="${L}"/><circle cx="65" cy="-15" r="2.2" fill="#2B1D16"/><circle cx="65.6" cy="-15.8" r="0.7" fill="#fff"/>
  <g class="e011-tongue" style="transform-origin:73px -10px"><path d="M73 -10 H82 l3 -3 M82 -10 l3 3" stroke="#EF4444" stroke-width="1.6" fill="none" stroke-linecap="round"/></g></g></g>
  <g class="e011-snCoil">
  <ellipse cx="0" cy="-8" rx="28" ry="9" fill="#22C55E" stroke="${L}"/><ellipse cx="2" cy="-16" rx="21" ry="8" fill="#22C55E" stroke="${L}"/><ellipse cx="3" cy="-23" rx="14" ry="7" fill="#22C55E" stroke="${L}"/>
  <path d="M8 -26 Q16 -34 12 -42" stroke="${L}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M8 -26 Q16 -34 12 -42" stroke="#22C55E" stroke-width="7" fill="none" stroke-linecap="round"/>
  <ellipse cx="17" cy="-44" rx="10" ry="7" fill="#22C55E" stroke="${L}"/><circle cx="20" cy="-46" r="2" fill="#2B1D16"/></g>`;

const CR = '#22A447', CRD = '#15803D';
const cLeg = (x, cls, dark) => `<g transform="translate(${x} -10)"><g class="${cls}"><ellipse cx="2" cy="6" rx="9" ry="5" fill="${dark ? CRD : CR}" stroke="${L}"/></g></g>`;
const CROC = `
  <path d="M-40 -24 Q-80 -16 -102 -4 Q-70 -1 -40 -4Z" fill="${CR}" stroke="${L}"/>
  ${cLeg(-26, 'e011-clA', true)}${cLeg(30, 'e011-clB', true)}
  <path d="M38 -12 H104 Q108 -6 100 -4 H36Z" fill="#BBF7D0" stroke="${L}"/>${[56, 68, 80, 92].map((x) => `<path d="M${x} -12 l3 -5 l3 5Z" fill="#fff" stroke="${L}" stroke-width="0.6"/>`).join('')}
  <ellipse cx="0" cy="-15" rx="52" ry="14" fill="${CR}" stroke="${L}" stroke-width="1.3"/>
  ${[-36, -24, -12, 0, 12, 24].map((x) => `<path d="M${x - 5} -27 q5 -8 10 0" fill="${CRD}" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <path d="M-44 -7 Q0 -2 44 -7" stroke="#BBF7D0" stroke-width="3" fill="none"/>
  ${cLeg(-34, 'e011-clB')}${cLeg(22, 'e011-clA')}
  <g class="e011-jaw" style="transform-origin:42px -14px"><path d="M36 -28 Q60 -32 102 -18 Q108 -12 100 -12 H36Z" fill="${CR}" stroke="${L}"/>
    ${[54, 66, 78, 90].map((x) => `<path d="M${x} -12 l3 5 l3 -5Z" fill="#fff" stroke="${L}" stroke-width="0.6"/>`).join('')}<circle cx="99" cy="-19" r="1.4" fill="${L}"/>
    <circle cx="50" cy="-28" r="7" fill="${CR}" stroke="${L}"/><circle cx="51" cy="-30" r="4" fill="#fff" stroke="${L}" stroke-width="0.6"/><circle cx="52" cy="-30" r="2" fill="#2B1D16"/></g>`;

const TG = '#F97316';
const tLeg = (x, cls, dark) => `<g transform="translate(${x} -34)"><g class="${cls}"><path d="M0 0 V31" stroke="${L}" stroke-width="10.4" stroke-linecap="round"/>
  <path d="M0 0 V31" stroke="${dark ? '#EA580C' : TG}" stroke-width="8.4" stroke-linecap="round"/><ellipse cx="2" cy="32" rx="6" ry="3" fill="#FFF7ED" stroke="${L}" stroke-width="0.8"/></g></g>`;
const TIGER = `
  <g class="e011-tt" style="transform-origin:-48px -52px"><path d="M-48 -52 Q-74 -58 -72 -82 Q-71 -92 -63 -90" stroke="${L}" stroke-width="7.4" fill="none" stroke-linecap="round"/>
    <path d="M-48 -52 Q-74 -58 -72 -82 Q-71 -92 -63 -90" stroke="${TG}" stroke-width="5.4" fill="none" stroke-linecap="round"/><path d="M-64 -58 l-4 4 M-71 -70 l-5 1" stroke="#1F2937" stroke-width="2"/></g>
  ${tLeg(-30, 'e011-tlB', true)}${tLeg(30, 'e011-tlA', true)}
  <ellipse cx="-2" cy="-46" rx="50" ry="21" fill="${TG}" stroke="${L}" stroke-width="1.3"/>
  <ellipse cx="0" cy="-31" rx="34" ry="6" fill="#FFF7ED"/>
  ${[-34, -20, -6, 8, 22].map((x) => `<path d="M${x} -66 q-4 8 0 15" stroke="#1F2937" stroke-width="3.2" fill="none" stroke-linecap="round"/>`).join('')}
  ${tLeg(-38, 'e011-tlA')}${tLeg(22, 'e011-tlB')}
  <g transform="translate(52 -58)">
    <circle cx="-12" cy="-16" r="7" fill="${TG}" stroke="${L}"/><circle cx="-12" cy="-16" r="3.6" fill="#F9A8D4"/><circle cx="10" cy="-19" r="7" fill="${TG}" stroke="${L}"/><circle cx="10" cy="-19" r="3.6" fill="#F9A8D4"/>
    <circle r="21" fill="${TG}" stroke="${L}" stroke-width="1.3"/><path d="M-4 -20 v6 M2 -21 v7 M8 -19 v6 M-18 -4 h6 M-19 2 h6" stroke="#1F2937" stroke-width="2.4" stroke-linecap="round"/>
    <ellipse cx="9" cy="7" rx="13" ry="9" fill="#FFF7ED" stroke="${L}" stroke-width="0.8"/><path d="M12 1 h7 l-3.5 4Z" fill="#F472B6" stroke="${L}" stroke-width="0.6"/>
    <ellipse cx="1" cy="-5" rx="2.6" ry="3.2" fill="#14291C"/><ellipse cx="13" cy="-6" rx="2.6" ry="3.2" fill="#14291C"/><circle cx="2" cy="-6" r="0.9" fill="#fff"/><circle cx="14" cy="-7" r="0.9" fill="#fff"/>
    <path d="M16 7 q-2 4 -5 1" stroke="${L}" stroke-width="1" fill="none"/><path d="M20 6 h10 M20 9 l9 2" stroke="#94A3B8" stroke-width="0.7"/></g>`;

// ── Nền ───────────────────────────────────────────────────────────────────
function bg() {
  const pebbles = Array.from({ length: 60 }, (_, i) => `<ellipse cx="${(i * 173) % W}" cy="${290 + (i * 37) % 22}" rx="${3 + (i % 3)}" ry="2" fill="#E2C391"/>`).join('');
  const tuft = (x, s = 1) => `<path d="M${x} ${G} q-6 -24 -14 -30 M${x} ${G} q0 -28 -3 -38 M${x} ${G} q6 -22 14 -30" stroke="#CA8A04" stroke-width="${3 * s}" fill="none" stroke-linecap="round"/>`;
  return `${sky(0, W, 315, 'e011sky')}
  ${cloud(120, 46, 1)}${cloud(520, 60, 0.8, 2)}${cloud(980, 44, 0.9, 4)}${cloud(1500, 56, 1, 1)}${cloud(1960, 44, 0.8, 3)}${cloud(2400, 58, 1, 5)}
  <path d="M0 214 Q200 176 420 206 T900 198 T1400 206 T1900 194 T2400 206 T2600 200 V270 H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${[60, 380, 1010, 1760, 2230].map((x, i) => tree(x, 226, 0.6 + (i % 2) * 0.1, '')).join('')}
  <rect x="0" y="228" width="${W}" height="42" fill="#86EFAC"/>
  ${fence(0, 130, 256)}${fence(318, 2282, 256)}
  <!-- Chuồng voi: bãi đất + đống cỏ khô -->
  <ellipse cx="900" cy="${G}" rx="160" ry="12" fill="#E7C9A0" stroke="${L}" stroke-width="0.8"/>
  <path d="M1006 ${G} Q1018 236 1036 238 Q1054 240 1062 ${G}Z" fill="#FACC15" stroke="${L}"/><path d="M1016 254 l8 -10 M1032 252 l2 -12 M1048 254 l-4 -12" stroke="#CA8A04" stroke-width="1.4"/>
  <!-- Hươu cao cổ: cây keo cao, tán phẳng -->
  <path d="M1170 ${G} Q1160 160 1136 64 M1150 130 Q1120 100 1092 70 M1146 110 Q1170 84 1176 66" stroke="#92400E" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M1170 ${G} Q1160 160 1136 64" stroke="${L}" stroke-width="1" fill="none" opacity="0.5"/>
  <ellipse cx="1124" cy="52" rx="66" ry="14" fill="#22C55E" stroke="${L}"/><ellipse cx="1170" cy="62" rx="36" ry="10" fill="#16A34A" stroke="${L}"/><ellipse cx="1078" cy="64" rx="28" ry="8" fill="#4ADE80" stroke="${L}"/>
  ${sign(1300, 62, 'GIRAFFE')}
  <!-- Khu khỉ: hai cây chuối, cột leo có sàn, gốc cây -->
  ${tree(1430, G, 1.4, '#FDE047')}${tree(1630, G, 1.4, '#FDE047')}
  <rect x="1525" y="156" width="10" height="${G - 156}" fill="#B45309" stroke="${L}"/><rect x="1500" y="156" width="60" height="8" rx="2" fill="#D97706" stroke="${L}"/>
  ${[176, 196, 216, 236].map((y) => `<path d="M1525 ${y} h10" stroke="${L}" stroke-width="1"/>`).join('')}
  <path d="M1576 ${G} V240 H1604 V${G}Z" fill="#A16207" stroke="${L}"/><ellipse cx="1590" cy="240" rx="14" ry="4" fill="#FDE68A" stroke="${L}"/>
  ${sign(1530, 62, 'MONKEYS')}
  ${monkey(1430, 1)}${monkey(1530, 3)}${monkey(1630, 2)}
  <!-- Rắn: bãi đá -->
  <path d="M1760 ${G} Q1770 218 1810 214 Q1850 210 1868 236 Q1890 230 1900 ${G}Z" fill="#CBD5E1" stroke="${L}"/><path d="M1790 232 q10 -6 20 0" stroke="#94A3B8" stroke-width="2" fill="none"/>
  ${sign(1830, 160, 'SNAKE')}
  <!-- Cá sấu: ao -->
  <ellipse cx="2085" cy="${G - 2}" rx="122" ry="16" fill="#38BDF8" stroke="${L}"/><path d="M1990 262 q8 -4 16 0 M2120 268 q8 -4 16 0 M2140 258 q8 -4 16 0" stroke="#E0F2FE" stroke-width="2" fill="none"/>
  ${[1968, 1980, 2200].map((x) => `<path d="M${x} ${G} V${G - 34}" stroke="#16A34A" stroke-width="3"/><ellipse cx="${x}" cy="${G - 38}" rx="3" ry="8" fill="#92400E"/>`).join('')}
  ${sign(2130, 150, 'CROCODILE')}
  <!-- Hổ: đồng cỏ vàng, hang đá -->
  <path d="M2520 ${G} Q2526 196 2570 192 Q2600 192 2600 200 V${G}Z" fill="#A8A29E" stroke="${L}"/><path d="M2548 ${G} Q2552 226 2574 226 Q2592 226 2594 ${G}Z" fill="#57534E"/>
  ${[2230, 2290, 2350, 2470, 2510].map((x, i) => tuft(x, 1 + (i % 2) * 0.2)).join('')}
  ${sign(2420, 82, 'TIGER')}
  ${sign(900, 62, 'ELEPHANT')}
  <!-- Lối đi -->
  <rect x="-2" y="268" width="${W + 4}" height="50" fill="#F3D9A4" stroke="${L}"/>${pebbles}
  ${[700, 1080, 1700, 2200].map((x) => bush(x, 270, 0.6, '#4ADE80')).join('')}
  ${[640, 1250, 1950, 2300].map((x, i) => flowerAt(x, 270, ['#F472B6', '#FDE047', '#A78BFA', '#FB923C'][i])).join('')}
  <!-- Cổng ZOO -->
  <rect x="140" y="98" width="22" height="172" fill="#FDBA74" stroke="${L}" stroke-width="1.2"/><rect x="278" y="98" width="22" height="172" fill="#FDBA74" stroke="${L}" stroke-width="1.2"/>
  <circle cx="151" cy="94" r="10" fill="#F97316" stroke="${L}"/><circle cx="289" cy="94" r="10" fill="#F97316" stroke="${L}"/>
  <path d="M151 100 Q220 40 289 100" stroke="#16A34A" stroke-width="10" fill="none"/>
  ${[170, 196, 244, 270].map((x, i) => `<ellipse cx="${x}" cy="${i === 0 || i === 3 ? 82 : 66}" rx="7" ry="4" fill="#4ADE80" stroke="${L}" stroke-width="0.7" transform="rotate(${i * 40 - 60} ${x} ${i === 0 || i === 3 ? 82 : 66})"/>`).join('')}
  <g class="e011-zoo"><rect x="166" y="70" width="108" height="42" rx="12" fill="#FDE047" stroke="${L}" stroke-width="1.6"/>
    <text x="220" y="102" text-anchor="middle" ${FONT} font-size="31" fill="#15803D">ZOO</text></g>
  <!-- Bảng ANIMALS -->
  <path d="M528 230 V${G} M612 230 V${G}" stroke="#92400E" stroke-width="6"/>
  <rect x="510" y="122" width="120" height="110" rx="8" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <rect x="510" y="122" width="120" height="24" rx="8" fill="#16A34A" stroke="${L}" stroke-width="1.2"/>
  <text x="570" y="140" text-anchor="middle" ${FONT} font-size="15" fill="#fff">ANIMALS</text>
  ${ICONS.map((f, i) => `<g transform="translate(${538 + (i % 3) * 32} ${170 + Math.floor(i / 3) * 36})"><g class="e011-ic" style="transition-delay:${i * 0.16}s">${f(iconEyes)}</g></g>`).join('')}`;
}

/** Lớp trước: nhãn chữ, mũi tên đo chiều cao / chiều dài. */
function fg() {
  const arrowV = `<path d="M1268 262 V70" stroke="#EF4444" stroke-width="3"/><path d="M1260 82 L1268 66 L1276 82Z M1260 250 L1268 266 L1276 250Z" fill="#EF4444"/>`;
  const arrowH = `<path d="M1958 230 H2192" stroke="#EF4444" stroke-width="3"/><path d="M1970 222 L1954 230 L1970 238Z M2180 222 L2196 230 L2180 238Z" fill="#EF4444"/>`;
  return `<g class="e011-tallar">${arrowV}</g><g class="e011-crocar">${arrowH}</g>${labs()}`;
}

const CSS = `
.e011-lab { opacity: 0; transform: scale(.5); transform-box: fill-box; transform-origin: center; transition: opacity .3s, transform .4s cubic-bezier(.3,1.6,.6,1); }
${labCss()}
.e011-zoo { transform-box: fill-box; transform-origin: center; }
.st-zoo .e011-zoo { animation: e011Pulse .5s ease-in-out infinite alternate; }
@keyframes e011Pulse { from { transform: scale(1); } to { transform: scale(1.12); } }
.e011-ic { opacity: 0; transform: scale(.2); transform-box: fill-box; transform-origin: center; transition: opacity .3s, transform .4s cubic-bezier(.3,1.6,.6,1); }
.st-board .e011-ic { opacity: 1; transform: none; }
.e011-tallar { transform: scaleY(0); transform-origin: 1268px 262px; opacity: 0; transition: transform .8s cubic-bezier(.3,0,.3,1), opacity .2s; }
.st-tall .e011-tallar { transform: none; opacity: 1; }
.e011-crocar { transform: scaleX(0); transform-origin: 2075px 230px; opacity: 0; transition: transform .7s cubic-bezier(.3,0,.3,1), opacity .2s; }
.st-croc .e011-crocar { transform: none; opacity: 1; }
/* Khỉ: ẩn → hiện (st-monk) → trèo lên (st-climb) → chú khỉ 2 trèo xuống gốc cây cạnh Minh (st-down, st-down2) */
.e011-m { opacity: 0; transform: translateY(12px); transition: opacity .4s, transform 1.6s ease-in-out; }
.st-monk .e011-m { opacity: 1; transform: none; }
.st-climb .e011-m1, .st-climb .e011-m2 { transform: translateY(-95px); }
.st-climb .e011-m3 { transform: translateY(-110px); }
.st-down .e011-m2 { transform: translateY(-26px); transition-duration: .4s, .7s; }
.st-down2 .e011-m2 { transform: translate(-40px, -26px); transition-duration: .4s, .5s; }
.e011-aL, .e011-aR { transition: transform .3s; }
.st-funny .e011-m1 .e011-mi { animation: e011Hop .3s ease-out infinite alternate; }
@keyframes e011Hop { to { transform: translateY(-14px); } }
.st-funny .e011-m2 .e011-aR { animation: e011Scratch .2s ease-in-out infinite alternate; }
@keyframes e011Scratch { from { transform: rotate(-150deg); } to { transform: rotate(-175deg); } }
.st-funny .e011-m3 .e011-mi { animation: e011Wheel 1s linear infinite; }
@keyframes e011Wheel { to { transform: rotate(360deg); } }
.st-climbing .e011-m .e011-aL { animation: e011ClimbL .25s ease-in-out infinite alternate; }
.st-climbing .e011-m .e011-aR { animation: e011ClimbR .25s ease-in-out infinite alternate; }
@keyframes e011ClimbL { from { transform: rotate(130deg); } to { transform: rotate(170deg); } }
@keyframes e011ClimbR { from { transform: rotate(-170deg); } to { transform: rotate(-130deg); } }
.st-wave2 .e011-m2 .e011-aR { animation: e011Wave .3s ease-in-out infinite alternate; }
@keyframes e011Wave { from { transform: rotate(-135deg); } to { transform: rotate(-170deg); } }
/* Voi */
.act-e011stomp .e011-eb { animation: e011Stomp .4s ease-in-out infinite alternate; }
@keyframes e011Stomp { to { transform: translateY(-7px) rotate(-1.5deg); } }
.act-e011ears .e011-ear { animation: e011Ear .28s ease-in-out infinite alternate; }
@keyframes e011Ear { to { transform: scaleX(.5); } }
.act-e011trunk .e011-trunk { animation: e011Trunk 1.8s ease-in-out infinite; }
@keyframes e011Trunk { 0%, 100% { transform: rotate(0); } 35%, 65% { transform: rotate(-100deg); } 50% { transform: rotate(-80deg); } }
/* Hươu cao cổ: vươn cổ lên ăn lá */
.act-e011neck .e011-neck { animation: e011Neck 2.6s ease-in-out both; }
@keyframes e011Neck { 0% { transform: none; } 30%, 75% { transform: translateY(-20px) rotate(-3deg); } 100% { transform: none; } }
.act-e011neck .e011-gh { animation: e011Nib .25s ease-in-out infinite alternate; }
@keyframes e011Nib { to { transform: rotate(-8deg); } }
/* Rắn: cuộn tròn (is-sit) / duỗi dài, lè lưỡi, trườn */
.e011-snCoil, .e011-snLong { transition: opacity .35s; }
.e011-snCoil { opacity: 0; }
.es-ac.is-sit .e011-snCoil { opacity: 1; }
.es-ac.is-sit .e011-snLong { opacity: 0; }
.e011-tongue { animation: e011Tongue 1.4s steps(1) infinite; }
@keyframes e011Tongue { 0%, 60% { transform: scaleX(1); } 61%, 100% { transform: scaleX(0); } }
.is-walk .e011-sw { animation: e011Slither .3s ease-in-out infinite alternate; }
@keyframes e011Slither { from { transform: skewX(-10deg) scaleY(.85); } to { transform: skewX(10deg) scaleY(1.2); } }
/* Cá sấu */
.act-e011jaw .e011-jaw { animation: e011Jaw .5s ease-in-out infinite alternate; }
@keyframes e011Jaw { from { transform: rotate(0); } to { transform: rotate(-26deg); } }
.is-walk .e011-clA { animation: e011Leg .25s ease-in-out infinite alternate; }
.is-walk .e011-clB { animation: e011Leg .25s ease-in-out infinite alternate-reverse; }
/* Hổ */
.e011-tt { animation: e011Tail 1.2s ease-in-out infinite alternate; }
@keyframes e011Tail { from { transform: rotate(-8deg); } to { transform: rotate(10deg); } }
.is-walk .e011-tlA { animation: e011Leg .3s ease-in-out infinite alternate; }
.is-walk .e011-tlB { animation: e011Leg .3s ease-in-out infinite alternate-reverse; }
@keyframes e011Leg { from { transform: rotate(-20deg); } to { transform: rotate(20deg); } }
@media (prefers-reduced-motion: reduce) {
  .st-funny .e011-m3 .e011-mi { animation-duration: 2s; }
  .st-funny .e011-m1 .e011-mi, .act-e011ears .e011-ear, .is-walk .e011-sw { animation-duration: .6s; }
}
`;

/** Cả nhà đi cùng nhau (bố, Lan, Minh); camera theo Minh. */
const fam = (st, [d, l, m], { speed = 160, lead = 0 } = {}) => Promise.all([
  st.walk('dad', d, { follow: false, speed }),
  st.walk('lan', l, { follow: false, speed }),
  st.walk('minh', m, { speed, lead }),
]);
const rest = (st, ...ids) => ids.forEach((id) => { st.act(id, null); st.pose(id, 'stand'); st.mood(id, 'happy'); });

const BEATS = [
  { key: ['at the zoo'], icon: '🎟️', label: 'the zoo', async play(st) {
    st.set('st-zoo'); st.sfx('birds', { vol: 0.6 });
    await fam(st, [330, 385, 435], { speed: 140, lead: -130 });
    st.fx('sparkle', 220, 92);
    st.pose('minh', 'cheer'); st.act('minh', 'hop'); st.mood('minh', 'joy');
    st.pose('lan', 'wave'); st.act('lan', 'wave'); st.mood('lan', 'joy');
    await st.wait(1000);
    rest(st, 'minh', 'lan'); st.set('st-zoo', false);
  } },
  { key: ['Minh, Lan and Dad are here'], icon: '👋', label: 'here', async play(st) {
    for (const [id, s] of [['minh', 'st-tagM'], ['lan', 'st-tagL'], ['dad', 'st-tagD']]) {
      st.set(s); st.pose(id, 'wave'); st.act(id, 'wave'); st.mood(id, 'joy');
      await st.wait(800);
      st.act(id, null); st.pose(id, 'stand');
    }
    await st.wait(300);
    ['st-tagM', 'st-tagL', 'st-tagD'].forEach((s) => st.set(s, false));
    rest(st, 'minh', 'lan', 'dad');
  } },
  { key: ['The zoo is big'], icon: '🗺️', label: 'big', async play(st) {
    st.pose('dad', 'arms'); st.mood('dad', 'joy'); st.set('st-big2');
    await st.wait(800);
    await st.look(1500, { dur: 1100 });
    await st.look(420, { dur: 900 });
    st.set('st-big2', false); rest(st, 'dad');
  } },
  { key: ['many animals'], icon: '🐾', label: 'many animals', async play(st) {
    await fam(st, [380, 430, 480], { speed: 120, lead: 40 });
    st.pose('minh', 'point'); st.act('minh', 'point'); st.mood('minh', 'joy');
    st.set('st-board'); st.fx('sparkle', 570, 186);
    await st.wait(1500);
    rest(st, 'minh');
  } },
  { key: ['an elephant'], icon: '🐘', label: 'elephant', async play(st) {
    await fam(st, [650, 700, 750], { speed: 160, lead: 70 });
    st.pose('minh', 'point'); st.act('minh', 'point'); st.fx('sparkle', 900, 62);
    st.act('ele', 'e011trunk');
    await st.wait(1500);
    st.act('ele', null); rest(st, 'minh');
  } },
  { key: ['very big and grey'], icon: '🩶', label: 'big and grey', async play(st) {
    st.act('ele', 'e011stomp'); st.set('st-big5');
    st.pose('minh', 'arms'); st.mood('minh', 'wow'); st.mood('lan', 'wow');
    st.fx('poof', 860, 262);
    await st.wait(1300);
    st.fx('poof', 950, 262, { quiet: true });
    await st.wait(1200);
    st.act('ele', null); st.set('st-big5', false); rest(st, 'minh', 'lan');
  } },
  { key: ['big ears', 'a long nose'], icon: '👂', label: 'ears and nose', async play(st) {
    st.set('st-ears'); st.act('ele', 'e011ears'); st.pose('lan', 'pointUp'); st.fx('sparkle', 848, 150);
    await st.wait(1800);
    st.set('st-ears', false); st.act('ele', 'e011trunk'); st.set('st-nose');
    st.pose('lan', 'stand'); st.pose('minh', 'point'); st.mood('minh', 'joy');
    st.fx('sparkle', 774, 240);
    await st.wait(2000);
    st.act('ele', null); st.set('st-nose', false); rest(st, 'minh', 'lan');
  } },
  { key: ['a giraffe'], icon: '🦒', label: 'giraffe', async play(st) {
    await fam(st, [990, 1045, 1095], { speed: 180, lead: 60 });
    st.pose('minh', 'point'); st.act('minh', 'point'); st.fx('sparkle', 1300, 62);
    await st.wait(900);
    rest(st, 'minh');
  } },
  { key: ['tall'], icon: '📏', label: 'tall', async play(st) {
    st.set('st-tall'); st.pose('minh', 'pointUp'); st.mood('minh', 'wow'); st.pose('dad', 'pointUp');
    await st.wait(1800);
    st.set('st-tall', false); rest(st, 'minh', 'dad');
  } },
  { key: ['a long neck'], icon: '🌿', label: 'long neck', async play(st) {
    st.act('gir', 'e011neck'); st.set('st-neck'); st.mood('lan', 'joy');
    await st.wait(800);
    st.fx('sparkle', 1130, 56);
    await st.wait(1900);
    st.act('gir', null); st.set('st-neck', false); rest(st, 'lan');
  } },
  { key: ['monkeys'], icon: '🐒', label: 'monkeys', async play(st) {
    await fam(st, [1270, 1320, 1370], { speed: 180, lead: 100 });
    st.set('st-monk'); st.fx('poof', 1430, 244); st.fx('poof', 1530, 244, { quiet: true }); st.fx('poof', 1630, 244, { quiet: true });
    st.pose('dad', 'point'); st.act('dad', 'point'); st.mood('minh', 'joy');
    await st.wait(1200);
    rest(st, 'dad', 'minh');
  } },
  { key: ['small and funny'], icon: '😂', label: 'small, funny', async play(st) {
    st.set('st-funny'); st.set('st-small11');
    st.pose('minh', 'cheer'); st.act('minh', 'hop'); st.mood('minh', 'joy');
    st.pose('lan', 'clap'); st.act('lan', 'clap'); st.mood('lan', 'joy');
    await st.wait(2500);
    st.set('st-funny', false); st.set('st-small11', false); rest(st, 'minh', 'lan');
  } },
  { key: ['climb trees'], icon: '🌳', label: 'climb trees', async play(st) {
    st.set('st-climbing'); st.set('st-climb');
    st.pose('minh', 'pointUp'); st.mood('minh', 'wow');
    await st.wait(1800);
    st.set('st-climbing', false); st.fx('sparkle', 1630, 160);
    await st.wait(300);
    rest(st, 'minh');
  } },
  { key: ['The snake', 'long and green'], icon: '🐍', label: 'snake', async play(st) {
    await fam(st, [1590, 1645, 1695], { speed: 190, lead: 100 });
    st.dog('snake', 'stand'); st.fx('sparkle', 1865, 236); st.set('st-snake');
    st.mood('lan', 'wow');
    await st.walk('snake', 1840, { follow: false, speed: 40 });
    await st.wait(700);
    st.set('st-snake', false); rest(st, 'lan');
  } },
  { key: ['The crocodile', 'long, too'], icon: '🐊', label: 'crocodile', async play(st) {
    await st.look(1990, { dur: 700 });
    await st.walk('croc', 2075, { follow: false, speed: 55 });
    st.act('croc', 'e011jaw'); st.set('st-croc'); st.mood('minh', 'wow');
    await st.wait(1600);
    st.act('croc', null); st.set('st-croc', false); rest(st, 'minh');
  } },
  { key: ['The tiger', 'big and orange'], icon: '🐯', label: 'tiger', async play(st) {
    const pace = (async () => {
      await st.walk('tiger', 2490, { follow: false, speed: 70 });
      await st.walk('tiger', 2420, { follow: false, speed: 70 });
    })();
    await fam(st, [2140, 2195, 2250], { speed: 210, lead: 80 });
    st.set('st-tiger'); st.mood('minh', 'wow'); st.pose('lan', 'point'); st.act('lan', 'point');
    await pace;
    await st.wait(700);
    st.set('st-tiger', false); rest(st, 'minh', 'lan');
  } },
  { key: ['favourite animal', 'the monkey'], icon: '❤️', label: 'favourite', async play(st) {
    st.mood('minh', 'joy');
    await Promise.all([
      st.walk('minh', 1545, { speed: 280 }),
      st.walk('lan', 1480, { follow: false, speed: 270 }),
      st.walk('dad', 1420, { follow: false, speed: 260 }),
    ]);
    st.pose('minh', 'pointUp'); st.mood('minh', 'joy');
    st.fx('hearts', 1630, 150); st.fx('hearts', 1545, 130);
    await st.wait(1300);
    rest(st, 'minh');
  } },
  { key: ['small, like me'], icon: '🙋', label: 'like me', async play(st) {
    st.set('st-down');
    await st.wait(750);
    st.set('st-down2');
    await st.wait(500);
    st.set('st-wave2'); st.set('st-small17');
    st.pose('minh', 'me'); st.mood('minh', 'joy'); st.fx('sparkle', 1568, 200);
    await st.wait(1500);
    st.set('st-wave2', false); st.pose('minh', 'stand');
  } },
];

export default {
  id: 'en011', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  cast: [
    { id: 'ele', kind: 'thing', svg: ELEPHANT, box: [-140, -175, 280, 180], x: 900, y: G, face: -1 },
    { id: 'gir', kind: 'thing', svg: GIRAFFE, box: [-100, -230, 200, 235], x: 1200, y: G, s: 0.95, face: -1 },
    { id: 'snake', kind: 'thing', svg: SNAKE, box: [-95, -55, 190, 60], x: 1870, y: G, s: 1.4, face: -1 },
    { id: 'croc', kind: 'thing', svg: CROC, box: [-115, -50, 230, 55], x: 2120, y: G, s: 1.1, face: -1 },
    { id: 'tiger', kind: 'thing', svg: TIGER, box: [-95, -95, 190, 100], x: 2420, y: G, s: 1.2, face: -1 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 40, s: 0.95 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 85, s: 1.08 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 125 },
  ],
  init(st) {
    st.dog('snake', 'sit');
  },
};
