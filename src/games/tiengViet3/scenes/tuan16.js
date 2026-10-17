// Phim bài đọc "Ong xây tổ", Tuần 16 Tiếng Việt 3: 5 cảnh, đánh số theo câu (sentences: true).
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Ong vẽ riêng ở đây (bee); cảnh 1 có thầy giáo (thay) và hai bạn Nam, Linh trong cast.js.
import { person } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, grass, tufts, flowers, sparkles, heart, word, LINE } from '../sceneKit.js';

/**
 * Chú ong tròn xinh (x, y giữa thân), mặt quay sang phải (flip: sang trái).
 * kind: 'worker' (ong thợ), 'old' (bác ong già, lông mày bạc), 'baby' (ong non, nhỏ, sáng màu); wax: giọt sáp dưới bụng.
 */
function bee(x, y, s = 1, { flip = false, kind = 'worker', wax = false, d = 0, fly = true } = {}) {
  const body = kind === 'baby' ? '#FDE68A' : kind === 'old' ? '#EAB308' : '#FACC15';
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><g class="${fly ? 'sc-bob' : ''}" style="--d:${d}s">
    <g class="sc-twinkle" style="--d:${d}s"><ellipse cx="-4" cy="-14" rx="8" ry="11" fill="#E0F2FE" fill-opacity="0.85" stroke="#7DD3FC" stroke-width="0.9" transform="rotate(-20 -4 -14)"/>
    <ellipse cx="5" cy="-13" rx="6" ry="9" fill="#F0F9FF" fill-opacity="0.85" stroke="#7DD3FC" stroke-width="0.9" transform="rotate(18 5 -13)"/></g>
    <path d="M-17 0 l-6 1 l6 2Z" fill="#78350F"/>
    <ellipse cx="-2" cy="0" rx="16" ry="11" fill="${body}" stroke="${LINE}" stroke-width="1"/>
    <path d="M-8 -10 Q-11 0 -8 10 M0 -11 Q-3 0 0 11" stroke="#78350F" stroke-width="3.4" fill="none"/>
    ${wax ? `<g class="sc-twinkle" style="--d:${d + 0.3}s">${[-8, -2, 4].map(dx => `<path d="M${dx} 11 q-2.4 4 0 5.6 q2.4 -1.6 0 -5.6Z" fill="#FFFBEB" stroke="#D6D3D1" stroke-width="0.6"/>`).join('')}</g>` : ''}
    <circle cx="15" cy="-3" r="9" fill="${body}" stroke="${LINE}" stroke-width="1"/>
    <path d="M17 -11 Q18 -20 24 -21 M13 -11 Q11 -20 15 -23" stroke="#78350F" stroke-width="1.2" fill="none"/>
    <circle cx="24" cy="-21" r="1.6" fill="#78350F"/><circle cx="15" cy="-23" r="1.6" fill="#78350F"/>
    <circle cx="18" cy="-4" r="1.8" fill="#1F2937"/><circle cx="18.6" cy="-4.6" r="0.6" fill="#fff"/>
    ${kind === 'old' ? `<path d="M15 -9 q3 -2 6 0" stroke="#F5F5F4" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M21 1 q-2 3 -5 2" stroke="#F5F5F4" stroke-width="1.4" fill="none"/>` : ''}
    <path d="M17 1 q2.4 2 4.4 -0.4" stroke="#78350F" stroke-width="1" fill="none" stroke-linecap="round"/>
    <ellipse cx="13" cy="0" rx="2" ry="1.2" fill="#F9A8A8" opacity="0.8"/>
    ${[-8, -2, 4].map(dx => `<path d="M${dx} 10 l-2 5" stroke="#78350F" stroke-width="1.2" stroke-linecap="round"/>`).join('')}
  </g></g>`;
}

/** Ô sáp lục giác (đỉnh nhọn trên), tâm (x, y), bán kính r. */
const hex = (x, y, r, fill = '#FCD34D', stroke = '#B45309') => {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = Math.PI / 6 + i * Math.PI / 3;
    return `${(x + Math.cos(a) * r).toFixed(1)},${(y + Math.sin(a) * r).toFixed(1)}`;
  }).join(' ');
  return `<polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="1.4"/>`;
};

/** Bánh tổ ong: list hàng [số ô] căn giữa quanh x, bắt đầu từ y; honey: ô có mật vàng đậm. */
function comb(x, y, rows, r = 12, { honey = false, wax = false } = {}) {
  const w = r * Math.sqrt(3);
  return rows.map((n, ri) => Array.from({ length: n }, (_, k) => {
    const cx = x + (k - (n - 1) / 2) * w, cy = y + ri * r * 1.5;
    const fill = wax ? (k + ri) % 3 ? '#FFFBEB' : '#FEF3C7' : honey && (k + ri) % 3 === 0 ? '#F59E0B' : '#FCD34D';
    return hex(cx, cy, r, fill, wax ? '#D6B98A' : '#B45309')
      + (wax ? '' : `<circle cx="${(cx - r * 0.3).toFixed(1)}" cy="${(cy - r * 0.3).toFixed(1)}" r="${(r * 0.16).toFixed(1)}" fill="#FFFBEB" opacity="0.7"/>`);
  }).join('')).join('');
}

/** Cành cây to vắt ngang phía trên. */
const branch = (y = 60) => `<path d="M0 ${y - 10} Q140 ${y - 30} 300 ${y} Q380 ${y + 14} 480 ${y + 4} V${y + 22} Q380 ${y + 34} 300 ${y + 20} Q140 ${y - 6} 0 ${y + 12}Z" fill="#92400E" stroke="${LINE}" stroke-width="1.2"/>
  ${[[90, y - 18, -30], [200, y - 10, 20], [360, y + 8, -20], [420, y + 10, 30]].map(([a, b, r], i) => `<g transform="translate(${a} ${b}) rotate(${r})"><g class="sc-sway" style="--d:${i * 0.7}s">
    <ellipse cx="0" cy="-12" rx="9" ry="16" fill="#22C55E"/><ellipse cx="14" cy="-6" rx="7" ry="13" fill="#16A34A" transform="rotate(40 14 -6)"/></g></g>`).join('')}`;

/** Trong hốc cây: vách gỗ ấm, vân gỗ. */
const hollow = (id) => `<defs><radialGradient id="${id}" cx="0.5" cy="0.45" r="0.7"><stop offset="0" stop-color="#FDE68A"/><stop offset="0.7" stop-color="#D97706"/><stop offset="1" stop-color="#92400E"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#${id})"/>
  ${[40, 110, 380, 440].map((x, i) => `<path d="M${x} 0 Q${x + (i % 2 ? 16 : -16)} 150 ${x} 300" stroke="#B45309" stroke-width="2" fill="none" opacity="0.6"/>`).join('')}
  <path d="M0 0 H480 V22 Q240 40 0 22Z" fill="#78350F"/>
  <path d="M0 300 V262 Q240 244 480 262 V300Z" fill="#78350F"/>`;

/** Chuỗi ong móc vào nhau như mành mành, treo từ (x, y) xuống n con. */
const beeChain = (x, y, n, d = 0) => `<g class="sc-sway" style="--d:${d}s">${Array.from({ length: n }, (_, i) =>
  bee(x + (i % 2 ? 3 : -3), y + 14 + i * 20, 0.62, { flip: i % 2 === 1, fly: false, d: d + i * 0.2 })).join('')}</g>`;

/** Hơi ấm (sóng cam) bốc lên. */
const warmth = (x, y, d = 0) => `<g transform="translate(${x} ${y})">${[-8, 0, 8].map((dx, i) => `<path class="sc-rise" style="--d:${d + i * 0.5}s" d="M${dx} 0 q-4 -6 0 -12 q4 -6 0 -12" stroke="#F97316" stroke-width="2.4" fill="none" stroke-linecap="round"/>`).join('')}</g>`;

/** Mũi tên cong chỉ hướng. */
const arrow = (x1, y1, x2, y2, c = '#16A34A') => `<path d="M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.min(y1, y2) - 18} ${x2} ${y2}" stroke="${c}" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-dasharray="6 4"/>
  <circle cx="${x2}" cy="${y2}" r="4" fill="${c}"/>`;

export default {
  sentences: true,
  groups: [[0, 1, 2], [3, 4], [5, 6], [7], [8, 9, 10]],
  scenes: [
    // Cảnh 1: "Các em hãy xem kìa", bầy ong đang xây tổ; ong bám nhau thành chuỗi như mành mành; con nào cũng có việc
    () => svg('Thầy chỉ cho các bạn xem bầy ong bám thành chuỗi như mành mành', `
      ${sky('t16s1sky', '#7DD3FC', '#ECFCCB')}
      ${cloud(330, 40, 0.6, 1)}${cloud(150, 30, 0.5, 2)}
      ${grass(214, '#86EFAC')}${grass(244, '#4ADE80')}
      <path d="M60 300 L70 40 H96 L110 300Z" fill="#92400E" stroke="${LINE}" stroke-width="1"/>
      ${branch(56)}
      ${at(1, `${bee(150, 120, 0.7, { d: 0 })}${bee(330, 140, 0.7, { flip: true, d: 0.6 })}`)}
      ${at(2, `<path d="M206 60 Q262 66 330 76 Q324 150 290 186 Q262 200 236 176 Q210 140 206 60Z" fill="#B45309" opacity="0.18"/>${beeChain(220, 66, 5, 0)}${beeChain(252, 70, 6, 0.6)}${beeChain(284, 74, 5, 1.2)}${beeChain(316, 78, 4, 0.3)}`)}
      ${at(3, `${bee(180, 170, 0.66, { wax: true, d: 0.2 })}${bee(366, 186, 0.66, { flip: true, d: 0.9 })}${bee(140, 90, 0.6, { d: 1.4 })}${bee(390, 80, 0.6, { flip: true, d: 0.4 })}`)}
      ${at(3, sparkles([[200, 120, 6], [350, 110, 7]]))}
      ${at(1, person(136, 288, 'thay', 'point', { s: 0.8 }), { talk: '1' })}
      ${at(1, person(300, 290, 'nam', 'lookUp', { s: 0.82 }))}
      ${at(1, person(372, 290, 'linh', 'lookUp', { s: 0.82 }), { off: 3 })}
      ${at(3, person(372, 290, 'linh', 'point', { s: 0.82, flip: true, mood: 'wow' }))}
      ${flowers([[200, 296, '#F472B6'], [420, 270, '#FDE047'], [250, 276, '#A78BFA']])}
      ${tufts([[230, 290], [330, 296]])}`),

    // Cảnh 2: ong thợ trẻ lấy giọt sáp dưới bụng trộn nước bọt xây tổ; hết sáp thì lùi ra sau cho con khác lên xây
    () => svg('Ong thợ trẻ lấy giọt sáp dưới bụng xây tổ', `
      ${hollow('t16s2bg')}
      ${comb(240, 40, [9, 8, 7, 5], 15, { wax: true })}
      ${at(1, `${bee(160, 160, 1.1, { wax: true, d: 0 })}${bee(240, 176, 1.1, { wax: true, d: 0.5 })}${bee(318, 160, 1.1, { wax: true, flip: true, d: 1 })}`)}
      ${at(1, sparkles([[200, 120, 6], [280, 124, 7]], '#FFFBEB'))}
      ${at(2, `${bee(356, 238, 0.95, { flip: true, d: 0.2 })}${arrow(326, 204, 368, 222, '#DC2626')}`)}
      ${at(2, `${bee(130, 240, 0.95, { wax: true, d: 0.8 })}${arrow(140, 222, 176, 190)}`)}`),

    // Cảnh 3: bác ong già, anh ong non không có sáp thì sưởi ấm giọt sáp; sáp khô thành chất xốp, bền, khó thấm nước
    () => svg('Ong già và ong non sưởi ấm giọt sáp; sáp khô thành tổ xốp, bền', `
      ${hollow('t16s3bg')}
      ${comb(240, 40, [9, 8, 7, 6, 4], 15, { wax: true })}
      ${at(1, `${[[200, 190], [240, 200], [280, 190]].map(([x, y]) => `<path d="M${x} ${y} q-5 8 0 11 q5 -3 0 -11Z" fill="#FFFBEB" stroke="#D6B98A" stroke-width="1"/>`).join('')}
        ${warmth(170, 214, 0)}${warmth(312, 214, 0.8)}`)}
      ${at(1, `${bee(140, 236, 1.15, { kind: 'old', d: 0 })}${bee(340, 236, 1.15, { kind: 'old', flip: true, d: 0.6 })}${bee(210, 254, 0.75, { kind: 'baby', d: 1.1 })}${bee(276, 254, 0.75, { kind: 'baby', flip: true, d: 0.3 })}`)}
      ${at(2, comb(240, 40, [9, 8, 7, 6], 15))}
      ${at(2, `<g transform="translate(380 70)"><g class="sc-bob"><path d="M0 -14 q-9 13 0 18 q9 -5 0 -18Z" fill="#7DD3FC" stroke="#0284C7" stroke-width="1"/></g>
        <path d="M-12 18 l-6 6 M12 18 l6 6" stroke="#0284C7" stroke-width="2" stroke-linecap="round"/></g>`)}
      ${at(2, sparkles([[150, 60, 8], [330, 120, 7]], '#FFFBEB'))}`),

    // Cảnh 4: cả bầy làm việc đông vui, nhộn nhịp mà kỉ luật, tiết kiệm "vôi vữa"
    () => svg('Cả bầy ong làm việc đông vui, có kỉ luật', `
      ${hollow('t16s4bg')}
      ${at(1, comb(240, 40, [9, 8, 7, 6, 5], 15))}
      ${at(1, `${[0, 1, 2, 3].map(i => bee(120 + i * 56, 184, 0.78, { wax: true, d: i * 0.3 })).join('')}
        ${[0, 1, 2, 3].map(i => bee(372 - i * 56, 238, 0.78, { flip: true, d: 0.2 + i * 0.3 })).join('')}`)}
      ${at(1, `<path d="M100 206 H390" stroke="#FEF3C7" stroke-width="2" stroke-dasharray="4 6" opacity="0.8"/><path d="M100 258 H390" stroke="#FEF3C7" stroke-width="2" stroke-dasharray="4 6" opacity="0.8"/>`)}
      ${at(1, `${word('♪', 20, '#7C2D12', 140, 140)}${word('♫', 22, '#7C2D12', 350, 150)}${sparkles([[244, 150, 7]], '#FFFBEB')}`)}`),

    // Cảnh 5: vài ba tháng sau tổ ong xây xong: toà nhà vững chãi, hàng ngàn căn phòng giống hệt nhau; cả đàn hoà thuận
    () => svg('Tổ ong xây xong với hàng ngàn căn phòng giống hệt nhau', `
      ${sky('t16s5sky', '#7DD3FC', '#ECFCCB')}
      ${sun(400, 50, 16)}${cloud(130, 40, 0.7, 0)}
      ${grass(236, '#86EFAC')}${grass(262, '#4ADE80')}
      ${branch(30)}
      ${at(1, `<defs><clipPath id="t16s5clip"><path d="M240 44 Q158 56 150 140 Q150 232 240 248 Q330 232 330 140 Q322 56 240 44Z"/></clipPath></defs>
        <path d="M240 44 Q158 56 150 140 Q150 232 240 248 Q330 232 330 140 Q322 56 240 44Z" fill="#F59E0B"/>
        <g clip-path="url(#t16s5clip)">${comb(240, 46, Array.from({ length: 13 }, (_, i) => i % 2 ? 10 : 11), 11, { honey: true })}</g>
        <path d="M240 44 Q158 56 150 140 Q150 232 240 248 Q330 232 330 140 Q322 56 240 44Z" fill="none" stroke="#92400E" stroke-width="2.4"/>`)}
      ${at(2, sparkles([[186, 96, 7], [298, 120, 8], [220, 200, 6], [270, 170, 7]], '#FFFBEB'))}
      ${at(3, `${bee(126, 150, 0.8, { d: 0 })}${bee(354, 140, 0.8, { flip: true, d: 0.6 })}${bee(140, 220, 0.7, { kind: 'baby', d: 1 })}${bee(344, 214, 0.75, { kind: 'old', flip: true, d: 0.3 })}`)}
      ${at(3, `${heart(170, 110, 1.1, '#F43F5E', 0)}${heart(312, 92, 1.2, '#FB7185', 0.6)}${heart(240, 268, 1.2, '#F43F5E', 1.2)}`)}
      ${flowers([[110, 288, '#F472B6'], [170, 280, '#FDE047'], [300, 290, '#A78BFA'], [380, 284, '#F472B6']])}
      ${tufts([[140, 294], [260, 296], [400, 296]])}`),
  ],
};
