// Hình vẽ trò 🐸 Ếch nhảy tia số: lá sen có số, hoa sen, mặt suối.
// Vẽ lại theo tấm mẫu scripts/g2games/frog-ref/sheet.png (lá tròn có khía chữ V, gân toả từ tâm, viền xanh đậm).
// Ếch là ảnh cắt từ tấm mẫu: src/assets/grade2-games/frog/{sit,worry,jump,wet}.webp.

const LINE = '#2F6B3A';
const PADS = [
  { fill: '#8CCB6A', vein: '#5E9E48', rim: '#A9DB86' },
  { fill: '#5FA650', vein: '#3F7F3A', rim: '#7DBE66' },
  { fill: '#76BA5C', vein: '#4D8F43', rim: '#93CD77' },
];

// Lá sen tâm (0,0) bán kính r. notch = góc (độ) của khía chữ V. Trả về <g> để đặt bằng transform.
export function lilyPadSvg(r, { tone = 0, notch = 250, label = null, big = false, state = '' } = {}) {
  const c = PADS[tone % PADS.length];
  const ry = r * 0.62;                                   // lá nhìn nghiêng: dẹt theo chiều dọc
  const a0 = (notch - 14) * Math.PI / 180, a1 = (notch + 14) * Math.PI / 180;
  const pt = (a, k = 1) => `${(Math.cos(a) * r * k).toFixed(1)},${(Math.sin(a) * ry * k).toFixed(1)}`;
  const leaf = `M0,0 L${pt(a0)} A${r},${ry} 0 1 0 ${pt(a1)} Z`;
  let veins = '';
  for (let i = 0; i < 9; i++) {
    const a = a1 + (i + 0.5) * (2 * Math.PI - (a1 - a0)) / 9;
    veins += `<path d="M0,0 L${pt(a, 0.86)}" />`;
  }
  const ring = state === 'goal' ? `<ellipse rx="${r + 5}" ry="${ry + 4}" fill="none" stroke="#FDE68A" stroke-width="4" stroke-dasharray="7 5"/>`
    : state === 'ok' ? `<ellipse rx="${r + 5}" ry="${ry + 4}" fill="none" stroke="#34D399" stroke-width="4"/>`
    : state === 'bad' ? `<ellipse rx="${r + 5}" ry="${ry + 4}" fill="none" stroke="#FB923C" stroke-width="4"/>` : '';
  const text = label == null ? '' : padLabelSvg(label, r, big);
  return `<g class="g2-pad" data-pad="${label ?? ''}">
    <ellipse rx="${r * 1.04}" ry="${ry * 1.1}" cy="${ry * 0.18}" fill="#1E5C7A" opacity=".28"/>
    ${ring}
    <path d="${leaf}" fill="${c.fill}" stroke="${LINE}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="${leaf}" fill="none" stroke="${c.rim}" stroke-width="2" transform="scale(.9)" opacity=".7"/>
    <g stroke="${c.vein}" stroke-width="1.4" stroke-linecap="round" fill="none">${veins}</g>
    ${big ? lotusSvg(r * 0.42, -r * 0.55, -ry * 0.35) : ''}
    ${text}</g>`;
}

// Số của lá, đặt ở mép trước lá. Vẽ riêng được (lớp trên cùng) để ếch ngồi trên lá không che số.
export function padLabelSvg(label, r, big = false) {
  const k = big ? 1.25 : 1, y = r * 0.62 * 0.5;
  return `<g class="g2-pad-num" transform="translate(0,${y.toFixed(1)}) scale(${k})">
    <rect x="-17" y="-12" width="34" height="24" rx="12" fill="${big ? '#FEF3C7' : '#FFFDF2'}" stroke="${big ? '#B45309' : LINE}" stroke-width="1.8"/>
    <text text-anchor="middle" dy="6" font-size="17" font-weight="800" fill="${big ? '#92400E' : '#1F3A24'}"
      font-family="Quicksand,Nunito,sans-serif">${label}</text></g>`;
}

// Hoa sen hồng nhỏ đặt trên lá tròn chục (mốc 10, 20…).
export function lotusSvg(s, x = 0, y = 0) {
  const petal = (rot, fill) => `<path d="M0,0 C${-s * 0.45},${-s * 0.4} ${-s * 0.3},${-s * 0.95} 0,${-s * 1.15}
    C${s * 0.3},${-s * 0.95} ${s * 0.45},${-s * 0.4} 0,0 Z" fill="${fill}" stroke="#BE3F6B" stroke-width="1.3" transform="rotate(${rot})"/>`;
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)})">
    ${petal(-58, '#F9A8D4')}${petal(58, '#F9A8D4')}${petal(-28, '#F472B6')}${petal(28, '#F472B6')}${petal(0, '#FBCFE8')}
    <ellipse rx="${s * 0.5}" ry="${s * 0.16}" fill="#4E9A45" stroke="${LINE}" stroke-width="1.2"/></g>`;
}

// Mặt suối: nền nước, sóng gợn, bờ cỏ hai đầu, cây lau. bank: 0 = không có bờ (khung nhìn trượt theo ếch), lau mọc ở hai góc dưới.
// live: mặt nước động (sóng gợn trôi, vệt sáng lướt, lau đung đưa) — CSS ở grade2Games/styles.js (lớp g2-wave, g2-shine, g2-reed).
export function pondBgSvg(w, h, { bankY = 0.5, bank = 1, live = false } = {}) {
  let ripples = '';
  const n = live ? Math.round(Math.max(16, Math.min(46, (w * h) / 38000))) : 16;
  const k = live ? Math.max(1, Math.min(2.2, h / 420)) : 1; // sóng to theo khung
  for (let i = 0; i < n; i++) {
    const x = (i * 137) % w, y = h * (live ? 0.06 : 0.22) + ((i * 71) % (h * (live ? 0.9 : 0.7)));
    const anim = live ? ` class="g2-wave" style="animation-duration:${(4.5 + (i * 7) % 5 * 0.8).toFixed(1)}s;animation-delay:-${((i * 13) % 9 * 0.6).toFixed(1)}s"` : '';
    ripples += `<g transform="translate(${x},${y.toFixed(1)}) scale(${k.toFixed(2)})"><path${anim} d="M0,0 q14,-6 28,0 t28,0" stroke="#CFEFFF" stroke-width="2" fill="none" opacity=".55" stroke-linecap="round"/></g>`;
  }
  if (live) {
    // Vệt sáng dài, mờ, lướt chậm ngang mặt suối.
    for (let i = 0; i < 5; i++) {
      const y = h * (0.12 + i * 0.19), len = w * (0.18 + (i % 3) * 0.07);
      ripples += `<rect class="g2-shine" x="${(-len).toFixed(0)}" y="${y.toFixed(1)}" width="${len.toFixed(0)}" height="${(5 * k).toFixed(1)}" rx="${(2.5 * k).toFixed(1)}"
        fill="url(#g2shine)" style="--sw:${(w + len).toFixed(0)}px;animation-duration:${14 + i * 3}s;animation-delay:-${i * 4.3}s"/>`;
    }
  }
  const reed = (x, y, k) => `<g transform="translate(${x},${y}) scale(${k})" stroke="${LINE}" stroke-width="1.6"><g${live ? ' class="g2-reed"' : ''}>
    <path d="M0,0 C-2,-30 -4,-50 -8,-70" fill="none" stroke="#4E9A45" stroke-width="3"/>
    <path d="M6,0 C6,-28 8,-44 12,-60" fill="none" stroke="#4E9A45" stroke-width="3"/>
    <rect x="-13" y="-92" width="9" height="26" rx="4.5" fill="#92400E" transform="rotate(-6 -8 -80)"/>
    <rect x="9" y="-80" width="8" height="22" rx="4" fill="#92400E" transform="rotate(6 13 -70)"/></g></g>`;
  return `<defs><linearGradient id="g2water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#9ADCF5"/><stop offset="1" stop-color="#5BB8E0"/></linearGradient>
      <linearGradient id="g2shine"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
    <rect width="${w}" height="${h}" fill="url(#g2water)"/>
    ${ripples}
    ${bank ? '' : `${reed(26, h - 6, 0.8 * (live ? Math.max(1, h / 520) : 1))}${reed(w - 30, h - 4, 0.9 * (live ? Math.max(1, h / 520) : 1))}`}
    ${bank ? `<g transform="scale(${bank},1)"><path d="M0,${h * bankY - 70} C60,${h * bankY - 80} 90,${h * bankY - 20} 70,${h * bankY + 40} C50,${h * bankY + 110} 20,${h} 0,${h} Z"
      fill="#A7D98B" stroke="${LINE}" stroke-width="2"/></g>
    <g transform="translate(${w},0) scale(${bank},1) translate(${-w},0)"><path d="M${w},${h * bankY - 90} C${w - 90},${h * bankY - 90} ${w - 120},${h * bankY - 10} ${w - 95},${h * bankY + 60} C${w - 75},${h * bankY + 120} ${w - 40},${h} ${w},${h} Z"
      fill="#A7D98B" stroke="${LINE}" stroke-width="2"/></g>
    ${reed(30 * bank, h * bankY - 40, 0.9 * Math.max(bank, 0.6))}${reed(w - 40 * bank, h * bankY - 55, Math.max(bank, 0.6))}` : ''}`;
}
