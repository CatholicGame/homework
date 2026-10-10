/**
 * Hình vẽ trò 🚚 Trạm cân nông sản (lớp 4). Mọi cảnh vẽ trong khung VW × VH (1000 × 560), mặt đất y = GY:
 * trời, mây, đồi, ruộng lúa; cân bàn đồng hồ (cấp 1), xe tải trên bàn cân điện tử (cấp 2, 4), cầu qua sông có
 * biển tải trọng (cấp 3). Đồ vật: bao nông sản, bao lớn 1 tấn, sọt cam, con heo, con bò.
 * Nét và màu theo bộ vẽ các trò lớp 2, 3 (INK).
 */

export const INK = '#3F3A40';
export const VW = 1000, VH = 560, GY = 470;
const r1 = (v) => Math.round(v * 10) / 10;
const ST = (w = 3) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round"`;
/** 2500 → "2 500" (khoảng trắng không ngắt dòng giữa các lớp như sách). */
export const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');

// ── Nền chung: trời, mây, đồi, ruộng lúa ────────────────────────────────────────────────────────────
const cloud = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" opacity=".95"><ellipse cx="0" cy="0" rx="46" ry="20" fill="#fff"/><ellipse cx="-26" cy="6" rx="30" ry="15" fill="#fff"/><ellipse cx="30" cy="7" rx="32" ry="14" fill="#fff"/><ellipse cx="4" cy="-12" rx="26" ry="16" fill="#fff"/></g>`;
const palm = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 Q-4 -60 4 -110" fill="none" stroke="#8B5E34" stroke-width="9" stroke-linecap="round"/>
  ${[[-60, -96], [-50, -128], [0, -146], [52, -130], [62, -98]].map(([dx, dy]) => `<path d="M4 -110 Q${dx / 2} ${dy - 14} ${dx} ${dy}" fill="none" stroke="#3F9142" stroke-width="12" stroke-linecap="round"/>`).join('')}</g>`;

export function skySvg({ field = true, sun = [905, 76] } = {}) {
  let rows = '';
  for (let y = 384; y < GY; y += 14) rows += `<path d="M0 ${y} H${VW}" stroke="#7DBF55" stroke-width="3" stroke-dasharray="6 9" opacity=".7"/>`;
  return `<defs><linearGradient id="g4wSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ED8F5"/><stop offset="1" stop-color="#E4F6FE"/></linearGradient></defs>
    <rect x="-2500" y="-600" width="${VW + 5000}" height="${VH + 1200}" fill="url(#g4wSky)"/>
    <circle cx="${sun[0]}" cy="${sun[1]}" r="40" fill="#FDE047" ${ST()}/>
    ${cloud(170, 70)}${cloud(560, 48, 0.8)}${cloud(780, 120, 0.6)}
    <path d="M-2500 380 Q-1400 250 -800 330 Q-500 260 -400 380 Q-150 270 80 330 Q260 250 470 320 Q660 240 860 310 Q1100 260 1400 330 Q1900 250 2400 320 Q2900 260 3500 340 V${GY} H-2500 Z" fill="#9BD07A" ${ST(2.5)}/>
    ${field ? `<rect x="-2500" y="372" width="${VW + 5000}" height="${GY - 372}" fill="#B5E08C"/>${rows}` : ''}
    ${palm(40, 380, 0.75)}${palm(960, 378, 0.85)}`;
}

/** Sân bê tông của trạm (mặt đất). */
export const yardSvg = () => `<rect x="-2500" y="${GY}" width="${VW + 5000}" height="${VH - GY + 600}" fill="#D6D3D1"/><path d="M-2500 ${GY} H${VW + 2500}" ${ST(3)}/>`;

// ── Đồ vật cân (gốc ở giữa chân, đứng trên mặt đất) ───────────────────────────────────────────────────

/** Bao nông sản (bao dứa trắng, nhãn màu). w × h. */
export function sackSvg(label, color = '#16A34A', w = 150, h = 170) {
  const x = -w / 2, y = -h;
  return `<path d="M${x + 14} ${y + 26} Q${x - 4} ${y + h * 0.6} ${x + 8} ${-4} Q0 6 ${-x - 8} ${-4} Q${-x + 4} ${y + h * 0.6} ${-x - 14} ${y + 26} Q0 ${y + 14} ${x + 14} ${y + 26} Z" fill="#F5F0E1" ${ST()}/>
    <path d="M${x + 20} ${y + 28} Q0 ${y + 18} ${-x - 20} ${y + 28}" fill="none" stroke="#C8BFA6" stroke-width="2"/>
    <path d="M-16 ${y + 26} L-10 ${y + 2} Q0 ${y - 6} 10 ${y + 2} L16 ${y + 26}" fill="#F5F0E1" ${ST(2.5)}/>
    <path d="M-12 ${y + 10} H12" stroke="#B45309" stroke-width="4"/>
    <rect x="${x + 24}" y="${y + h * 0.36}" width="${w - 48}" height="${h * 0.34}" rx="6" fill="${color}" ${ST(2)}/>
    <text x="0" y="${y + h * 0.36 + h * 0.23}" text-anchor="middle" font-size="${Math.round(h * 0.15)}" font-weight="900" fill="#fff" font-family="'Baloo 2', sans-serif">${label}</text>`;
}

/** Sọt cam (sọt tre, cam đầy ngọn). */
export function basketSvg(w = 170, h = 120) {
  let weave = '';
  for (let i = 1; i < 5; i++) weave += `<path d="M${-w / 2 + 6 + i * 3} ${-h + i * (h / 5)} H${w / 2 - 6 - i * 3}" stroke="#A16207" stroke-width="2"/>`;
  let fruit = '';
  [[-58, -h - 4], [-28, -h - 12], [4, -h - 6], [36, -h - 14], [62, -h - 2], [-44, -h - 26], [-10, -h - 30], [24, -h - 32], [50, -h - 22], [8, -h - 50]].forEach(([fx, fy]) => {
    fruit += `<circle cx="${fx}" cy="${fy}" r="17" fill="#FB923C" ${ST(2)}/><path d="M${fx - 3} ${fy - 15} l3 -6" stroke="#3F9142" stroke-width="3"/>`;
  });
  return `${fruit}<path d="M${-w / 2} ${-h} H${w / 2} L${w / 2 - 18} 0 H${-w / 2 + 18} Z" fill="#E9B872" ${ST()}/>${weave}
    <path d="M${-w / 2 - 4} ${-h} H${w / 2 + 4}" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
}

/** Con heo hồng nhìn ngang (quay phải). */
export function pigSvg(s = 1) {
  return `<g transform="scale(${s})">
    ${[-62, -30, 30, 58].map(x => `<rect x="${x - 9}" y="-44" width="18" height="44" rx="6" fill="#F9A8D4" ${ST(2.5)}/>`).join('')}
    <path d="M-92 -86 q-18 -6 -14 -22 q4 -10 12 -2" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="0" cy="-88" rx="98" ry="58" fill="#FBCFE8" ${ST()}/>
    <circle cx="86" cy="-100" r="40" fill="#FBCFE8" ${ST()}/>
    <path d="M70 -134 L84 -160 L98 -132 Z" fill="#F9A8D4" ${ST(2.5)}/>
    <ellipse cx="124" cy="-94" rx="15" ry="19" fill="#F9A8D4" ${ST(2.5)}/>
    <circle cx="120" cy="-98" r="3" fill="${INK}"/><circle cx="128" cy="-90" r="3" fill="${INK}"/>
    <circle cx="96" cy="-112" r="5" fill="${INK}"/>
    <ellipse cx="-10" cy="-72" rx="40" ry="18" fill="#F9A8D4" opacity=".5"/></g>`;
}

/** Con bò vàng nhìn ngang (quay phải). */
export function cowSvg(s = 1) {
  return `<g transform="scale(${s})">
    ${[-96, -64, 54, 86].map(x => `<rect x="${x - 11}" y="-70" width="22" height="70" rx="6" fill="#D97706" ${ST(2.5)}/><rect x="${x - 11}" y="-12" width="22" height="12" rx="3" fill="${INK}"/>`).join('')}
    <path d="M-124 -128 Q-150 -100 -142 -60" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><ellipse cx="-142" cy="-56" rx="7" ry="11" fill="${INK}"/>
    <rect x="-128" y="-170" width="236" height="110" rx="50" fill="#F59E0B" ${ST()}/>
    <ellipse cx="-40" cy="-120" rx="36" ry="26" fill="#FDE68A"/>
    <path d="M86 -150 Q110 -200 150 -184 Q186 -170 178 -128 Q170 -104 140 -108 Q108 -112 96 -126 Z" fill="#F59E0B" ${ST()}/>
    <path d="M118 -190 Q110 -214 96 -216 M150 -190 Q160 -214 174 -214" fill="none" stroke="#F5F0E1" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="166" cy="-122" rx="18" ry="14" fill="#FDBA74" ${ST(2.5)}/>
    <circle cx="140" cy="-160" r="5" fill="${INK}"/>
    <path d="M100 -176 L80 -186 L94 -164 Z" fill="#D97706" ${ST(2)}/></g>`;
}

/** Bao lớn 1 tấn (bao bố trắng có quai), cạnh s; gốc góc dưới trái. */
export function jumboSvg(x, y, s = 80, label = '1 tấn') {
  return `<g class="g4w-jumbo"><rect x="${x}" y="${y - s}" width="${s}" height="${s}" rx="8" fill="#F8FAFC" ${ST(2.5)}/>
    <path d="M${x + s * 0.18} ${y - s} q4 -14 12 0 M${x + s * 0.68} ${y - s} q4 -14 12 0" fill="none" stroke="#2563EB" stroke-width="4"/>
    <path d="M${x + 6} ${y - s * 0.66} H${x + s - 6}" stroke="#CBD5E1" stroke-width="2"/>
    <text x="${x + s / 2}" y="${y - s * 0.28}" text-anchor="middle" font-size="${Math.round(s * 0.26)}" font-weight="900" fill="#1D4ED8" font-family="'Baloo 2', sans-serif">${label}</text></g>`;
}

/** Bao nhỏ 50 kg nằm trên xe; gốc góc dưới trái, rộng w. */
export function smallSackSvg(x, y, w = 34, color = '#16A34A') {
  const h = w * 1.15;
  return `<g class="g4w-sack"><path d="M${x + 3} ${y - h + 6} Q${x + w / 2} ${y - h - 2} ${x + w - 3} ${y - h + 6} Q${x + w + 2} ${y - h / 2} ${x + w - 2} ${y - 1} Q${x + w / 2} ${y + 3} ${x + 2} ${y - 1} Q${x - 2} ${y - h / 2} ${x + 3} ${y - h + 6} Z" fill="#F5F0E1" ${ST(2)}/>
    <rect x="${x + 6}" y="${y - h * 0.62}" width="${w - 12}" height="${h * 0.3}" rx="3" fill="${color}"/></g>`;
}

// ── Cân bàn đồng hồ (cấp 1) ───────────────────────────────────────────────────────────────────────
export const DIAL = { cx: 790, cy: 205, r: 150 };
/** Góc kim (độ, 0 = thẳng đứng) của giá trị v trên mặt số 0 → max. */
export const dialAngle = (v, max) => -135 + 270 * Math.min(1, Math.max(0, v / max));
const DIAL_STEPS = { 100: [5, 10], 200: [10, 40], 500: [10, 50] };

/** Mặt đồng hồ + cột + bàn cân. Bàn cân từ x 160 tới 600 (đồ đặt giữa x = 380). */
export function platformScaleSvg(max) {
  const { cx, cy, r } = DIAL;
  const [minor, major] = DIAL_STEPS[max];
  let ticks = '';
  for (let v = 0; v <= max; v += minor) {
    const a = dialAngle(v, max) * Math.PI / 180, big = v % major === 0;
    const r0 = r - (big ? 30 : 18), r2 = r - 8;
    ticks += `<line x1="${r1(cx + r0 * Math.sin(a))}" y1="${r1(cy - r0 * Math.cos(a))}" x2="${r1(cx + r2 * Math.sin(a))}" y2="${r1(cy - r2 * Math.cos(a))}" stroke="${INK}" stroke-width="${big ? 4.5 : 2.2}"/>`;
    if (big) {
      const rt = r - 54;
      ticks += `<text x="${r1(cx + rt * Math.sin(a))}" y="${r1(cy - rt * Math.cos(a) + 9)}" text-anchor="middle" class="g4w-dialnum">${v}</text>`;
    }
  }
  return `<rect x="${cx - 18}" y="${cy + r - 4}" width="36" height="${GY - 30 - cy - r + 4}" fill="#94A3B8" ${ST()}/>
    <path d="M150 ${GY - 30} H${cx + 60} V${GY - 6} H150 Z" fill="#64748B" ${ST()}/>
    <path d="M160 ${GY - 30} L176 ${GY - 46} H600 L600 ${GY - 30} Z" fill="#CBD5E1" ${ST()}/>
    ${[200, 260, 320, 380, 440, 500, 560].map(x => `<path d="M${x} ${GY - 44} l-8 12" stroke="#94A3B8" stroke-width="3"/>`).join('')}
    <circle cx="${cx}" cy="${cy}" r="${r + 14}" fill="#DC2626" ${ST()}/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#FFFDF5" ${ST(2.5)}/>
    ${ticks}
    <text x="${cx}" y="${cy + 62}" text-anchor="middle" class="g4w-dialkg">kg</text>
    <g class="g4w-needle" style="transform-origin:${cx}px ${cy}px;transform:rotate(${dialAngle(0, max)}deg)">
      <path d="M${cx - 6} ${cy + 18} L${cx} ${cy - r + 22} L${cx + 6} ${cy + 18} Z" fill="#DC2626" stroke="${INK}" stroke-width="2"/></g>
    <circle cx="${cx}" cy="${cy}" r="12" fill="${INK}"/>
    <g class="g4w-cover"><rect x="${cx - r - 6}" y="${cy - r - 6}" width="${2 * r + 12}" height="${2 * r + 12}" rx="${r + 6}" fill="#FDE68A" ${ST()}/>
      <text x="${cx}" y="${cy + 40}" text-anchor="middle" font-size="120" font-weight="900" fill="#B45309" font-family="'Baloo 2', sans-serif">?</text></g>`;
}

// ── Xe tải nhìn ngang (quay phải), gốc ở bánh sau trên mặt đất ──────────────────────────────────────
// Thùng xe từ x 0 tới BED_W, sàn thùng ở y = -BED_Y; cabin phía trước.
export const BED_W = 360, BED_Y = 74;
export const TRUCK_LEN = 520;
export function truckSvg(color = '#F4A259', cargo = '') {
  const wheel = (x) => `<circle cx="${x}" cy="-30" r="30" fill="#334155" ${ST()}/><circle cx="${x}" cy="-30" r="12" fill="#CBD5E1" ${ST(2)}/>`;
  return `<rect x="-6" y="${-BED_Y}" width="${BED_W + 12}" height="18" rx="3" fill="#64748B" ${ST()}/>
    ${cargo}
    <path d="M-6 ${-BED_Y} V${-BED_Y - 46} M${BED_W + 6} ${-BED_Y} V${-BED_Y - 46}" stroke="${INK}" stroke-width="5"/>
    <rect x="-6" y="${-BED_Y - 26}" width="${BED_W + 12}" height="26" fill="${color}" opacity=".35" ${ST(2.5)}/>
    <path d="M${BED_W + 16} ${-BED_Y + 18} V${-BED_Y - 92} H${BED_W + 106} L${BED_W + 150} ${-BED_Y - 30} V${-BED_Y + 18} Z" fill="${color}" ${ST()}/>
    <path d="M${BED_W + 102} ${-BED_Y - 82} L${BED_W + 136} ${-BED_Y - 32} H${BED_W + 102} Z" fill="#BAE6FD" ${ST(2.5)}/>
    <rect x="${BED_W + 30}" y="${-BED_Y - 80}" width="58" height="44" rx="4" fill="#BAE6FD" ${ST(2.5)}/>
    <rect x="${BED_W + 142}" y="${-BED_Y - 8}" width="14" height="12" rx="3" fill="#FDE68A" ${ST(2)}/>
    <rect x="-8" y="${-BED_Y + 14}" width="${BED_W + 166}" height="16" rx="4" fill="#475569" ${ST(2.5)}/>
    ${wheel(50)}${wheel(130)}${wheel(BED_W + 90)}`;
}

/** Ô đặt hàng trên thùng xe: 4 bao lớn ở tầng dưới, 10 bao nhỏ ở tầng trên (toạ độ trong khung xe). */
export const JUMBO_SLOTS = [0, 1, 2, 3].map(i => ({ x: 6 + i * 88, y: -BED_Y, s: 82 }));
export const SACK_SLOTS = Array.from({ length: 10 }, (_, i) => ({ x: 4 + i * 35.5, y: -BED_Y - 84, w: 32 }));

/** Hàng trên xe: nJ bao lớn + nS bao nhỏ (đặt sẵn, ẩn bằng opacity cho tới khi chất). */
export function cargoSlotsSvg(color, { shown = [0, 0], label = '1 tấn' } = {}) {
  return JUMBO_SLOTS.map((p, i) => `<g data-slot="j${i}" style="opacity:${i < shown[0] ? 1 : 0}">${jumboSvg(p.x, p.y, p.s, label)}</g>`).join('')
    + SACK_SLOTS.map((p, i) => `<g data-slot="s${i}" style="opacity:${i < shown[1] ? 1 : 0}">${smallSackSvg(p.x, p.y, p.w, color)}</g>`).join('');
}

/** Hàng chất đầy cho cấp 4 (khối lượng bất kì): số bao lớn + bao nhỏ ước theo kg. */
export function cargoForKg(kg, color) {
  const nJ = Math.max(1, Math.min(4, Math.floor(kg / 1000)));
  const nS = Math.max(1, Math.min(10, Math.round((kg - nJ * 1000) / 250)));
  return cargoSlotsSvg(color, { shown: [nJ, nS], label: '' });
}

// ── Bàn cân điện tử + chòi trạm cân (cấp 2, 4) ─────────────────────────────────────────────────────
/** Bàn cân dài từ x 90 tới 690; đồng hồ số trên chòi bên phải. */
export function weighbridgeSvg(head = '') {
  return `<rect x="760" y="250" width="230" height="${GY - 250}" fill="#FEF3C7" ${ST()}/>
    <path d="M744 254 L875 196 L1006 254 Z" fill="#DC2626" ${ST()}/>
    <rect x="800" y="380" width="56" height="${GY - 380}" fill="#B45309" ${ST(2.5)}/>
    <rect x="884" y="384" width="80" height="50" fill="#BAE6FD" ${ST(2.5)}/>
    <rect x="770" y="262" width="210" height="104" rx="10" fill="#1F2937" ${ST()}/>
    <text x="875" y="290" text-anchor="middle" font-size="20" font-weight="900" fill="#FCA5A5" font-family="'Baloo 2', sans-serif">TRẠM CÂN${head ? ' · ' + head : ''}</text>
    <rect x="784" y="300" width="182" height="54" rx="6" fill="#0B1220"/>
    <text class="g4w-led" x="922" y="343" text-anchor="end">0</text>
    <text x="958" y="343" text-anchor="end" font-size="20" font-weight="800" fill="#86EFAC" font-family="'Baloo 2', sans-serif">kg</text>
    <rect x="80" y="${GY - 6}" width="620" height="16" rx="3" fill="#94A3B8" ${ST(2.5)}/>
    ${[140, 260, 380, 500, 620].map(x => `<path d="M${x} ${GY - 4} v12" stroke="#475569" stroke-width="3"/>`).join('')}`;
}

/** Đống hàng trong kho (cấp 4: hàng dỡ xuống bay vào đây). */
export const pileSvg = () => `<g class="g4w-pile"><path d="M-30 ${GY} L-30 360 L20 330 L70 360 L70 ${GY} Z" fill="#FDE68A" ${ST()}/><path d="M-30 362 L20 334 L70 362" fill="none" stroke="#B45309" stroke-width="5"/>
  <rect x="2" y="400" width="36" height="${GY - 400}" fill="#92400E" ${ST(2)}/></g>`;

// ── Cầu qua sông có biển tải trọng (cấp 3) ──────────────────────────────────────────────────────────
export const BRIDGE = { x0: 420, x1: 840, sign: 372 };
export function bridgeSceneSvg(limitT) {
  const { x0, x1, sign } = BRIDGE;
  let rail = '';
  for (let x = x0 + 10; x < x1; x += 30) rail += `<path d="M${x} ${GY - 40} V${GY - 4}" stroke="${INK}" stroke-width="3"/>`;
  return `<path d="M${x0 - 40} ${GY} Q${x0 - 10} ${GY + 40} ${x0 + 30} ${VH + 200} H${x1 - 30} Q${x1 + 10} ${GY + 40} ${x1 + 40} ${GY} Z" fill="#38BDF8" ${ST(2.5)}/>
    ${[0, 1, 2].map(i => `<path d="M${x0 + 60 + i * 110} ${GY + 46 + (i % 2) * 22} q20 -10 40 0 t40 0" fill="none" stroke="#E0F2FE" stroke-width="4" stroke-linecap="round"/>`).join('')}
    <g class="g4w-bridge">
      <rect x="${x0 + 90}" y="${GY + 4}" width="26" height="140" fill="#A8A29E" ${ST(2.5)}/><rect x="${x1 - 116}" y="${GY + 4}" width="26" height="140" fill="#A8A29E" ${ST(2.5)}/>
      <path d="M${x0 - 20} ${GY - 40} H${x1 + 20}" stroke="${INK}" stroke-width="6"/>${rail}
      <rect x="${x0 - 30}" y="${GY}" width="${x1 - x0 + 60}" height="18" fill="#78716C" ${ST(2.5)}/>
    </g>
    <path d="M${sign} ${GY} V${GY - 150}" stroke="#64748B" stroke-width="8"/>
    <circle cx="${sign}" cy="${GY - 196}" r="54" fill="#fff" stroke="#DC2626" stroke-width="14"/>
    <circle cx="${sign}" cy="${GY - 196}" r="61" fill="none" ${ST(2.5)}/>
    <text x="${sign}" y="${GY - 178}" text-anchor="middle" font-size="${limitT >= 10 ? 40 : 50}" font-weight="900" fill="${INK}" font-family="'Baloo 2', sans-serif">${limitT}T</text>`;
}

/** Biểu tượng trò: xe tải chở bao trên bàn cân. */
export function weighIcon(size = 56) {
  return `<svg viewBox="-20 -230 600 250" width="${size}" height="${size}" aria-hidden="true">
    ${truckSvg('#F4A259', cargoSlotsSvg('#16A34A', { shown: [4, 0] }))}<rect x="-20" y="-4" width="600" height="20" fill="#94A3B8" ${ST(4)}/></svg>`;
}
