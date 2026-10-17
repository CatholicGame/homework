// Phim bài đọc "Những điều lí thú về tên người", Tuần 18 Tiếng Việt 3: 5 cảnh, đánh số theo câu (sentences: true).
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Bài nói về tên người nên thẻ tên có chữ ngắn: mỗi phần tên một khối màu (họ: xanh dương, tên đệm / phụ danh: xanh lá / tím, tên: cam).
// Nhân vật trong cast.js: các bạn nhỏ nhiều dân tộc (sua, mua, aia, tetsuo, nam, linh), cô Hương, bố, mẹ, Na; người cha Hà Nhì: traiLang (gần nhất).
import { person, headOnly } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, grass, tufts, flowers, tree, sparkles, heart, thought, thatchHouse, LINE } from '../sceneKit.js';

const HO = '#60A5FA', DEM = '#4ADE80', TEN = '#FB923C', PHU = '#C084FC';

/** Khối tên: [x trái, y giữa, rộng, màu, chữ]; dashed: ô trống nét đứt; icon: hình nhỏ thay chữ. */
function block(x, y, w, c, t = '', { dashed = false, icon = '', fs = 13 } = {}) {
  return `<g><rect x="${x}" y="${y - 13}" width="${w}" height="26" rx="7" fill="${dashed ? '#FFFFFF' : c}" stroke="${dashed ? '#94A3B8' : LINE}" stroke-width="${dashed ? 1.6 : 1}" ${dashed ? 'stroke-dasharray="5 4"' : ''}/>
    ${t ? `<text x="${x + w / 2}" y="${y + 0.5}" font-size="${fs}" font-weight="800" fill="#1F2937" text-anchor="middle" dominant-baseline="central" font-family="Quicksand, Nunito, sans-serif">${t}</text>` : ''}
    ${icon ? `<g transform="translate(${x + w / 2} ${y})">${icon}</g>` : ''}</g>`;
}

/** Hình nhỏ trong khối tên (thay cho tên thật không có trong bài). */
const ICON = {
  sun: `<circle r="6" fill="#FDE047" stroke="#CA8A04"/>${Array.from({ length: 8 }, (_, i) => `<path d="M0 -8.5 V-11" stroke="#CA8A04" stroke-width="1.6" stroke-linecap="round" transform="rotate(${i * 45})"/>`).join('')}`,
  flower: `${[0, 72, 144, 216, 288].map(r => `<ellipse cy="-5" rx="3" ry="4.4" fill="#F472B6" transform="rotate(${r})"/>`).join('')}<circle r="2.6" fill="#FDE047"/>`,
  q: `<text y="1" font-size="16" font-weight="800" fill="#94A3B8" text-anchor="middle" dominant-baseline="central" font-family="Quicksand, sans-serif">?</text>`,
};

/** Thẻ trắng nền chứa các khối (x, y góc trái trên, w, h). */
const card = (x, y, w, h, inner) => `<g><rect x="${x + 3}" y="${y + 4}" width="${w}" height="${h}" rx="10" fill="#000" opacity="0.12"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#FFFBEB" stroke="${LINE}" stroke-width="1"/>${inner}</g>`;

/** Mũi tên cong từ (x1, y1) tới (x2, y2). */
const arrow = (x1, y1, x2, y2, c = '#DC2626', bend = -30) => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 + bend;
  const a = Math.atan2(y2 - my, x2 - mx);
  const hx = (k) => (x2 - Math.cos(a + k) * 9).toFixed(1), hy = (k) => (y2 - Math.sin(a + k) * 9).toFixed(1);
  return `<path d="M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M${hx(0.5)} ${hy(0.5)} L${x2} ${y2} L${hx(-0.5)} ${hy(-0.5)}" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
};

/** Phòng học có bảng xanh lớn (thẻ tên dán lên bảng). */
const room = () => `<rect width="${W}" height="${H}" fill="#FEF3C7"/>
  <rect y="226" width="${W}" height="${H - 226}" fill="#E7C9A1"/><path d="M0 226 H${W}" stroke="#B88A5F" stroke-width="3"/>
  <rect x="104" y="28" width="272" height="150" rx="4" fill="#166534" stroke="#92400E" stroke-width="7"/>
  <rect x="150" y="178" width="180" height="6" fill="#92400E"/>
  <rect x="66" y="50" width="30" height="80" rx="3" fill="#BAE6FD" stroke="#fff" stroke-width="4"/>
  <rect x="384" y="50" width="30" height="80" rx="3" fill="#BAE6FD" stroke="#fff" stroke-width="4"/>`;

/** Quả địa cầu (x, y tâm, r). */
const globe = (x, y, r) => `<g transform="translate(${x} ${y})">
  <path d="M${-r * 0.6} ${r + 18} H${r * 0.6} M0 ${r} V${r + 18}" stroke="#92400E" stroke-width="5" stroke-linecap="round"/>
  <path d="M${-r - 8} 0 A${r + 8} ${r + 8} 0 0 0 ${r * 0.6} ${r + 4}" stroke="#A16207" stroke-width="3" fill="none"/>
  <circle r="${r}" fill="#38BDF8" stroke="${LINE}" stroke-width="1.2"/>
  <path d="M${-r * 0.7} ${-r * 0.4} q${r * 0.3} ${-r * 0.4} ${r * 0.6} ${-r * 0.1} q${r * 0.1} ${r * 0.4} ${-r * 0.2} ${r * 0.6} q${-r * 0.3} ${r * 0.2} ${-r * 0.4} ${-r * 0.5}Z
    M${r * 0.1} ${-r * 0.7} q${r * 0.5} ${-r * 0.1} ${r * 0.7} ${r * 0.3} q${-r * 0.1} ${r * 0.4} ${-r * 0.4} ${r * 0.3} q${-r * 0.3} ${-r * 0.2} ${-r * 0.3} ${-r * 0.6}Z
    M${-r * 0.1} ${r * 0.2} q${r * 0.4} 0 ${r * 0.4} ${r * 0.4} q${-r * 0.1} ${r * 0.3} ${-r * 0.3} ${r * 0.2} q${-r * 0.2} ${-r * 0.3} ${-r * 0.1} ${-r * 0.6}Z" fill="#4ADE80" stroke="#16A34A" stroke-width="0.8"/>
  <path d="M${-r * 0.5} ${-r * 0.6} Q${-r * 0.7} ${-r * 0.3} ${-r * 0.65} 0" stroke="#fff" stroke-width="3" fill="none" opacity="0.5" stroke-linecap="round"/></g>`;

/** Núi Tây Bắc xa và ruộng bậc thang. */
const mountains = () => `<path d="M0 170 L70 90 L130 150 L210 70 L290 150 L360 84 L430 150 L480 120 V230 H0Z" fill="#86B7A0"/>
  <path d="M0 196 Q120 160 240 190 Q360 160 480 192 V240 H0Z" fill="#4C9A6A"/>
  ${[0, 1, 2].map(i => `<path d="M0 ${206 + i * 12} Q240 ${194 + i * 12} 480 ${206 + i * 12}" stroke="#A3E635" stroke-width="5" fill="none" opacity="0.8"/>`).join('')}`;

export default {
  sentences: true,
  groups: [[0], [1, 2, 3], [4, 5], [6, 7], [8, 9]],
  scenes: [
    // Cảnh 1: các dân tộc trên thế giới, các vùng trong một nước có tục lệ đặt tên rất khác nhau
    () => svg('Các bạn nhỏ nhiều dân tộc trên thế giới đứng quanh quả địa cầu', `
      ${sky('t18s1sky', '#7DD3FC', '#F0FDF4')}
      ${cloud(110, 40, 0.7, 0)}${cloud(380, 50, 0.6, 2)}
      ${grass(214, '#86EFAC')}${grass(244, '#4ADE80')}
      ${at(1, globe(240, 96, 52))}
      ${at(1, sparkles([[166, 60, 8], [316, 70, 9], [300, 150, 6]]))}
      ${at(1, `${person(120, 286, 'sua', 'wave', { s: 0.7 })}${person(168, 290, 'aia', 'cheer', { s: 0.7, mood: 'joy' })}${person(216, 288, 'nam', 'wave', { s: 0.7, flip: true })}
        ${person(264, 290, 'tetsuo', 'cheer', { s: 0.7 })}${person(312, 288, 'mua', 'wave', { s: 0.7, flip: true })}${person(360, 286, 'linh', 'wave', { s: 0.7, flip: true })}`)}
      ${at(1, `${[120, 168, 216, 264, 312, 360].map((x, i) => `<g transform="translate(${x} ${i % 2 ? 182 : 178})"><g class="sc-bob" style="--d:${i * 0.4}s">
        <rect x="-16" y="-9" width="32" height="18" rx="5" fill="#FFFBEB" stroke="${LINE}" stroke-width="0.9"/>
        <rect x="-12" y="-4" width="9" height="8" rx="2" fill="${HO}"/><rect x="-1" y="-4" width="13" height="8" rx="2" fill="${[TEN, DEM, PHU][i % 3]}"/></g></g>`).join('')}`)}
      ${flowers([[140, 296, '#F472B6'], [300, 298, '#FDE047']])}`),

    // Cảnh 2: tên người gồm họ và tên; người Việt có thêm tên đệm, người Nga có phụ danh; ví dụ tên người Nga
    () => svg('Thẻ tên: họ, tên đệm và tên; tên người Nga có phụ danh', `
      ${room()}
      ${at(1, card(126, 42, 228, 46, `${block(134, 65, 70, HO, 'Nguyễn')}${block(210, 65, 60, DEM, '', { dashed: true })}${block(276, 65, 70, TEN, 'Nam')}`))}
      ${at(2, `${block(210, 65, 60, DEM, 'Văn')}${sparkles([[240, 40, 7]], '#FDE68A')}`)}
      ${at(3, card(114, 104, 252, 40, `${block(120, 124, 54, TEN, 'Vích-to', { fs: 11 })}${block(178, 124, 102, PHU, 'Xéch-ghê-ê-vích', { fs: 11 })}${block(284, 124, 76, HO, 'Rô-ma-nốp', { fs: 11 })}`))}
      ${at(3, `<g transform="translate(250 196)"><circle r="20" fill="#fff" stroke="${LINE}" stroke-width="1"/>${headOnly('bo', { s: 0.9 })}</g>${arrow(229, 138, 236, 174, '#7C3AED', 0)}`)}
      ${at(1, person(120, 290, 'nam', 'point', { s: 0.86 }), { off: 3 })}
      ${at(3, person(120, 290, 'nam', 'stand', { s: 0.86, mood: 'wow' }))}
      ${at(1, person(366, 290, 'coHuong', 'point', { s: 0.8, flip: true }), { talk: '1,2,3' })}`),

    // Cảnh 3: một số dân tộc chỉ có tên, không có họ; người Hà Nhì lấy tên cha làm họ cho con
    () => svg('Người Hà Nhì lấy tên cha làm họ cho con', `
      ${sky('t18s3sky', '#93C5FD', '#ECFCCB')}
      ${cloud(140, 40, 0.7, 1)}
      ${mountains()}
      <path d="M0 236 Q240 226 480 238 V300 H0Z" fill="#86EFAC"/>
      ${tufts([[110, 290], [250, 296], [400, 292]])}
      ${at(1, person(316, 290, 'cho', 'wave', { s: 0.86, flip: true }))}
      ${at(1, card(262, 120, 112, 44, `${block(270, 142, 46, HO, '', { dashed: true, icon: ICON.q })}${block(320, 142, 46, TEN, '', { icon: ICON.flower })}`))}
      ${at(2, person(168, 290, 'traiLang', 'stand', { s: 0.86 }))}
      ${at(2, card(140, 50, 56, 44, block(145, 72, 46, TEN, '', { icon: ICON.sun })))}
      ${at(2, block(270, 142, 46, HO, '', { icon: ICON.sun }))}
      ${at(2, arrow(190, 94, 290, 126, '#DC2626', -34))}`),

    // Cảnh 4: vùng Hà Tây lấy tên đệm của cha làm họ cho con gái; cha là Đỗ Minh Vượng, con gái là Minh Thị Phúc
    () => svg('Cha là Đỗ Minh Vượng, con gái là Minh Thị Phúc', `
      ${sky('t18s4sky', '#7DD3FC', '#FEF9C3')}
      ${cloud(120, 34, 0.6, 0)}
      ${thatchHouse(400, 212, 130, 50)}${tree(84, 214, 0.8)}
      <rect y="210" width="${W}" height="${H - 210}" fill="#E7C9A1"/>
      ${grass(270, '#86EFAC')}
      ${at(1, person(146, 290, 'bo', 'stand', { s: 0.84 }))}
      ${at(1, person(334, 290, 'na', 'wave', { s: 0.88, flip: true }))}
      ${at(1, card(104, 40, 200, 44, `${block(112, 62, 50, HO, '')}${block(166, 62, 66, DEM, '')}${block(236, 62, 60, TEN, '')}`))}
      ${at(1, card(176, 122, 200, 44, `${block(184, 144, 66, DEM, '')}${block(254, 144, 50, '#FDE68A', '')}${block(308, 144, 60, TEN, '')}`))}
      ${at(1, arrow(198, 84, 216, 124, '#DC2626', -10))}
      ${at(2, `<text x="137" y="62.5" font-size="13" font-weight="800" fill="#1F2937" text-anchor="middle" dominant-baseline="central" font-family="Quicksand, Nunito, sans-serif">Đỗ</text>
        <text x="199" y="62.5" font-size="13" font-weight="800" fill="#1F2937" text-anchor="middle" dominant-baseline="central" font-family="Quicksand, Nunito, sans-serif">Minh</text>
        <text x="266" y="62.5" font-size="13" font-weight="800" fill="#1F2937" text-anchor="middle" dominant-baseline="central" font-family="Quicksand, Nunito, sans-serif">Vượng</text>
        <text x="217" y="144.5" font-size="13" font-weight="800" fill="#1F2937" text-anchor="middle" dominant-baseline="central" font-family="Quicksand, Nunito, sans-serif">Minh</text>
        <text x="279" y="144.5" font-size="13" font-weight="800" fill="#1F2937" text-anchor="middle" dominant-baseline="central" font-family="Quicksand, Nunito, sans-serif">Thị</text>
        <text x="338" y="144.5" font-size="13" font-weight="800" fill="#1F2937" text-anchor="middle" dominant-baseline="central" font-family="Quicksand, Nunito, sans-serif">Phúc</text>`)}
      ${at(2, sparkles([[300, 112, 7], [190, 30, 6]]))}`),

    // Cảnh 5: cái tên gửi gắm mơ ước, hi vọng của cha mẹ; tên hay, tươi sáng mở đầu cuộc đời nhiều may mắn, thành công
    () => svg('Bố mẹ bế em bé, gửi mơ ước vào cái tên; con đường tươi sáng phía trước', `
      ${sky('t18s5sky', '#7DD3FC', '#FEF3C7')}
      ${at(2, `<g transform="translate(330 214)"><circle r="70" fill="#FDE68A" opacity="0.35"/></g>${sun(330, 200, 30)}`)}
      ${at(2, `${[0, 1, 2, 3, 4].map(i => `<path d="M${200 + i * 0} 214 A${130 - i * 12} ${110 - i * 10} 0 0 1 ${460 - i * 0} 214" stroke="${['#F87171', '#FB923C', '#FACC15', '#4ADE80', '#60A5FA'][i]}" stroke-width="8" fill="none" opacity="0.7" transform="translate(${i * 12} 0)"/>`).join('')}`)}
      ${grass(214, '#86EFAC')}${grass(246, '#4ADE80')}
      ${at(2, `<path d="M220 300 Q280 250 330 214 L336 214 Q300 252 300 300Z" fill="#FEF3C7"/>`)}
      ${at(1, person(130, 288, 'bo', 'stand', { s: 0.86, mood: 'joy' }))}
      ${at(1, person(196, 290, 'me', 'hold', { s: 0.86, prop: 'calf', mood: 'joy' }))}
      ${at(1, `<g transform="translate(196 196)"><ellipse rx="22" ry="12" fill="#F9A8D4" stroke="${LINE}" stroke-width="1"/>
        <g transform="translate(-8 -6)">${headOnly('mai', { s: 0.5, mood: 'sleep' })}</g>
        <path d="M2 -6 Q14 -10 20 0" stroke="#FBCFE8" stroke-width="3" fill="none"/></g>`)}
      ${at(1, thought(178, 64, 120, 62, 176, 132, `${sparkles([[-34, -4, 12], [34, 2, 10]], '#FACC15')}
        <g transform="scale(1.1)">${heart(0, -2, 1.6, '#F43F5E', 0)}</g>`))}
      ${at(2, sparkles([[260, 120, 8], [400, 100, 9], [380, 160, 7]]))}
      ${at(2, flowers([[260, 290, '#F472B6'], [380, 288, '#FDE047'], [420, 270, '#A78BFA'], [100, 298, '#F472B6']]))}`),
  ],
};
