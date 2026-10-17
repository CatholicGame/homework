// Phim truyện "Quả táo của Bác Hồ", Tuần 31 Tiếng Việt 3: 7 cảnh, đánh số theo CÂU (sentences: true).
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Nhân vật: Bác Hồ (tóc bạc, râu bạc, bộ quần áo ka-ki), người dân và thiếu nhi Pháp (tóc vàng / nâu), em bé gái
// được Bác cho quả táo, bố mẹ em. Các nhân vật này chỉ có trong tuần này: cấu hình riêng (EXTRA) mượn cách vẽ
// person() của cast.js, gắn tạm vào CAST trong lúc vẽ rồi gỡ ra ngay (không sửa cast.js).
import { person, headOnly, CAST } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, sparkles, speech, thought, word, heart, cityRow, LINE } from '../sceneKit.js';

const KHAKI = '#C8B88A';
const EXTRA = {
  t31bac: { adult: true, old: true, hair: 'short', hairC: '#F5F5F4', top: 'shirt', shirt: KHAKI, bottom: 'pants', bottomC: '#B8A878', shoe: '#7C5A3A', beard: true, moustache: true },
  t31be: { hair: 'bob', hairC: '#F2C14E', top: 'dress', shirt: '#F9A8D4', shoe: '#F5F5F4' },                                          // em bé gái
  t31g1: { hair: 'pigtails', hairC: '#E8B04A', top: 'dress', shirt: '#F87171', shoe: '#F5F5F4' },
  t31b1: { hair: 'neat', hairC: '#8B5A2B', top: 'tee', shirt: '#60A5FA', bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#2563EB' },
  t31b2: { hair: 'spiky', hairC: '#C2410C', top: 'tee', shirt: '#FACC15', bottom: 'shorts', bottomC: '#475569', shoe: '#64748B' },
  t31g2: { hair: 'ponytail', hairC: '#92400E', top: 'dress', shirt: '#A7F3D0', shoe: '#F5F5F4' },
  t31ong: { adult: true, hair: 'short', hairC: '#A16207', top: 'jacket', shirt: '#475569', inner: '#FFFFFF', bottom: 'pants', bottomC: '#1F2937', shoe: '#1C1917' },
  t31ba: { adult: true, hair: 'ponytail', hairC: '#E8B04A', top: 'blouse', shirt: '#C4B5FD', bottom: 'pants', bottomC: '#334155', shoe: '#F5F5F4' },
  t31ong2: { adult: true, old: true, hair: 'short', hairC: '#D6D3D1', top: 'jacket', shirt: '#1F2937', inner: '#FFFFFF', bottom: 'pants', bottomC: '#111827', shoe: '#1C1917', moustache: true },
  t31ba2: { adult: true, old: true, hair: 'bun', hairC: '#E7E5E4', top: 'blouse', shirt: '#7DD3FC', bottom: 'pants', bottomC: '#334155', shoe: '#57534E' },
  t31bo: { adult: true, hair: 'short', hairC: '#8B5A2B', top: 'shirt', shirt: '#93C5FD', bottom: 'pants', bottomC: '#334155', shoe: '#44403C' },
  t31me: { adult: true, hair: 'bun', hairC: '#B45309', top: 'blouse', shirt: '#FDBA74', bottom: 'pants', bottomC: '#57534E', shoe: '#F5F5F4' },
};

/** Vẽ bằng cấu hình riêng của tuần: gắn tạm vào CAST rồi gỡ ra. */
function withCast(who, draw) {
  if (!EXTRA[who] || CAST[who]) return draw();
  CAST[who] = EXTRA[who];
  try { return draw(); } finally { delete CAST[who]; }
}
const P = (x, y, who, pose, o) => withCast(who, () => person(x, y, who, pose, o));
const HEAD = (who, o) => withCast(who, () => headOnly(who, o));

/** Bác Hồ: dáng người lớn, thêm chòm râu bạc dài hơn. */
const bac = (x, y, pose, o = {}) => {
  const s = o.s || 1;
  return `<g>${P(x, y, 't31bac', pose, o)}
    <g transform="translate(${x} ${y}) scale(${s})"><path d="M-3.4 -133.2 Q-2.6 -122 0 -115.5 Q2.6 -122 3.4 -133.2 Q0 -131.4 -3.4 -133.2Z" fill="#F5F5F4" stroke="#D6D3D1" stroke-width="0.7"/></g></g>`;
};

/** Quả táo đỏ (x, y tâm, r). */
const apple = (x, y, r = 7) => `<g transform="translate(${x} ${y})">
  <path d="M0 ${-r * 0.7} C${-r * 0.4} ${-r * 1.1} ${-r * 1.15} ${-r * 0.9} ${-r * 1.05} ${-r * 0.1} C${-r} ${r * 0.7} ${-r * 0.4} ${r * 1.05} 0 ${r * 0.85} C${r * 0.4} ${r * 1.05} ${r} ${r * 0.7} ${r * 1.05} ${-r * 0.1} C${r * 1.15} ${-r * 0.9} ${r * 0.4} ${-r * 1.1} 0 ${-r * 0.7}Z" fill="#DC2626" stroke="#7F1D1D" stroke-width="0.8"/>
  <path d="M0 ${-r * 0.7} q1 ${-r * 0.5} ${r * 0.3} ${-r * 0.7}" stroke="#78350F" stroke-width="${Math.max(1, r * 0.18)}" fill="none" stroke-linecap="round"/>
  <path d="M${r * 0.2} ${-r * 1.05} q${r * 0.6} ${-r * 0.4} ${r * 0.9} ${-r * 0.05} q${-r * 0.5} ${r * 0.3} ${-r * 0.9} ${r * 0.05}Z" fill="#22C55E"/>
  <ellipse cx="${-r * 0.45}" cy="${-r * 0.2}" rx="${r * 0.18}" ry="${r * 0.32}" fill="#fff" opacity="0.55"/></g>`;

/** Cờ Pháp nhỏ cầm tay (x, y: tay cầm). */
const frFlag = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 V-30" stroke="#78350F" stroke-width="1.6"/>
  <g class="sc-sway" style="--d:${(x % 5) / 3}s"><rect x="0" y="-30" width="7" height="13" fill="#1D4ED8"/><rect x="7" y="-30" width="7" height="13" fill="#fff"/><rect x="14" y="-30" width="7" height="13" fill="#DC2626"/>
  <rect x="0" y="-30" width="21" height="13" fill="none" stroke="${LINE}" stroke-width="0.6"/></g></g>`;

/** Tháp Ép-phen (x giữa, y chân, s). */
const eiffel = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="#8B6F4E" stroke-linejoin="round">
  <path d="M-40 0 Q-18 -60 -6 -150 L-3 -190 M40 0 Q18 -60 6 -150 L3 -190" stroke-width="4"/>
  <path d="M-3 -190 L0 -206 L3 -190" stroke-width="3"/>
  <path d="M-30 -32 H30 M-16 -88 H16 M-8 -140 H8" stroke-width="5"/>
  <path d="M-20 0 Q0 -26 20 0" stroke-width="3"/>
  <path d="M-30 -32 L-12 -88 M30 -32 L12 -88 M-26 -32 L14 -88 M26 -32 L-14 -88 M-14 -88 L6 -140 M14 -88 L-6 -140" stroke-width="1.4" opacity="0.8"/></g>`;

/** Phòng tiệc lớn của tòa thị chính: tường kem, cửa sổ vòm, đèn chùm, sàn gỗ (floorY). */
const hall = (floorY = 218) => `<rect width="${W}" height="${H}" fill="#FDF2D8"/>
  <rect y="0" width="${W}" height="16" fill="#E9C46A"/><path d="M0 16 H${W}" stroke="#B88A2F" stroke-width="2"/>
  ${[70, 160, 300, 390].map(x => `<g><path d="M${x} ${floorY - 34} V70 Q${x + 25} 34 ${x + 50} 70 V${floorY - 34}Z" fill="#BAE6FD" stroke="#fff" stroke-width="5"/>
    <path d="M${x + 25} 46 V${floorY - 34} M${x} 110 H${x + 50}" stroke="#fff" stroke-width="3"/>
    <path d="M${x - 6} ${floorY - 34} H${x + 56}" stroke="#D4A54A" stroke-width="4"/></g>`).join('')}
  ${[50, 140, 280, 370, 460].map(x => `<rect x="${x - 6}" y="16" width="12" height="${floorY - 16}" fill="#F3DFAE" stroke="#D4A54A" stroke-width="1"/>`).join('')}
  <path d="M240 16 V36" stroke="#B88A2F" stroke-width="2"/>
  <g transform="translate(240 44)"><path d="M-30 0 Q0 18 30 0" stroke="#D4A54A" stroke-width="3" fill="none"/>
    ${[-30, -15, 0, 15, 30].map((dx, i) => `<circle class="sc-twinkle" style="--d:${i * 0.3}s" cx="${dx}" cy="${Math.abs(dx) < 1 ? 12 : Math.abs(dx) < 20 ? 8 : 0}" r="4" fill="#FDE68A" stroke="#D4A54A" stroke-width="0.8"/>`).join('')}</g>
  <rect y="${floorY}" width="${W}" height="${H - floorY}" fill="#C08457"/>
  ${[0, 1, 2, 3].map(i => `<path d="M0 ${floorY + 12 + i * 22} H${W}" stroke="#A86F43" stroke-width="1.2"/>`).join('')}
  <path d="M0 ${floorY} H${W}" stroke="#8B5A2B" stroke-width="3"/>
  <path d="M160 300 L200 ${floorY} H280 L320 300Z" fill="#B91C1C" opacity="0.85"/>`;

/** Bàn tiệc dài phủ khăn trắng, đĩa thức ăn, khay táo (x trái, y mặt bàn, w). */
const banquet = (x, y, w) => `<g>
  <rect x="${x}" y="${y}" width="${w}" height="10" rx="2" fill="#FFFFFF" stroke="${LINE}" stroke-width="1"/>
  <path d="M${x} ${y + 10} H${x + w} V${y + 44} Q${x + w * 0.75} ${y + 50} ${x + w / 2} ${y + 44} Q${x + w / 4} ${y + 50} ${x} ${y + 44}Z" fill="#F8FAFC" stroke="${LINE}" stroke-width="1"/>
  ${Array.from({ length: 5 }, (_, i) => `<path d="M${x + (i + 0.5) * w / 5} ${y + 10} V${y + 44}" stroke="#E2E8F0" stroke-width="1.2"/>`).join('')}
  ${[0.12, 0.36, 0.64, 0.88].map(k => `<ellipse cx="${x + k * w}" cy="${y + 2}" rx="13" ry="4" fill="#fff" stroke="#94A3B8" stroke-width="0.8"/>`).join('')}
  <ellipse cx="${x + w / 2}" cy="${y + 1}" rx="22" ry="5" fill="#FBBF24" stroke="${LINE}" stroke-width="0.8"/>
  ${apple(x + w / 2 - 10, y - 5, 6)}${apple(x + w / 2 + 8, y - 5, 6)}${apple(x + w / 2 - 1, y - 12, 6)}
  ${[0.24, 0.76].map(k => `<path d="M${x + k * w - 4} ${y - 14} L${x + k * w + 4} ${y - 14} L${x + k * w + 2} ${y} H${x + k * w - 2}Z" fill="#E0F2FE" stroke="#94A3B8" stroke-width="0.8"/>`).join('')}
  </g>`;

/** Ly nước nhỏ (người cầm). */
const cup = (x, y) => `<path d="M${x - 3.5} ${y - 9} H${x + 3.5} L${x + 2.5} ${y} H${x - 2.5}Z" fill="#E0F2FE" stroke="#64748B" stroke-width="0.8"/><rect x="${x - 2.5}" y="${y - 5}" width="5" height="4.4" fill="#FB923C" opacity="0.8"/>`;

/** Mặt tiền tòa thị chính có cửa lớn và bậc thềm (cảnh ngoài cửa). */
const cityHall = () => `<g>
  <rect x="40" y="40" width="200" height="170" fill="#F5E6C8" stroke="${LINE}" stroke-width="1"/>
  <path d="M30 44 L140 4 L250 44Z" fill="#94A3B8" stroke="${LINE}" stroke-width="1"/>
  ${[60, 100, 180, 220].map(x => `<rect x="${x - 7}" y="58" width="14" height="140" fill="#FFFBEB" stroke="#D6C29A" stroke-width="1"/>`).join('')}
  <path d="M116 210 V120 Q140 96 164 120 V210Z" fill="#92400E" stroke="${LINE}" stroke-width="1"/>
  <path d="M140 108 V210" stroke="#78350F" stroke-width="2"/>
  <circle cx="134" cy="166" r="2" fill="#FACC15"/><circle cx="146" cy="166" r="2" fill="#FACC15"/>
  <rect x="96" y="210" width="88" height="7" fill="#E7E5E4" stroke="${LINE}" stroke-width="0.8"/>
  <rect x="86" y="217" width="108" height="7" fill="#D6D3D1" stroke="${LINE}" stroke-width="0.8"/>
  <path d="M140 4 V-6" stroke="#475569" stroke-width="1.6"/></g>`;

/** Tờ báo trang nhất: tranh Bác bế em bé ở giữa, các dòng chữ là vạch xám. */
const newspaper = (x, y, s = 1, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
  <rect x="-62" y="-80" width="124" height="160" fill="#FAFAF9" stroke="${LINE}" stroke-width="1.2"/>
  <rect x="-52" y="-70" width="104" height="14" fill="#1F2937"/>
  <path d="M-52 -48 H52" stroke="#1F2937" stroke-width="1"/>
  <rect x="-52" y="-42" width="104" height="70" fill="#E0F2FE" stroke="${LINE}" stroke-width="0.8"/>
  ${bac(-6, 26, 'hold', { s: 0.38, mood: 'joy' })}
  ${P(0, 2, 't31be', 'stand', { s: 0.3, mood: 'joy' })}${apple(12, -10, 3.4)}
  ${[36, 44, 52, 60, 68].map((yy, i) => `<path d="M-52 ${yy} H${i % 2 ? 40 : 52}" stroke="#A8A29E" stroke-width="3"/>`).join('')}</g>`;

/** Bàn học có ngăn kéo (x giữa, y mặt sàn). */
const studyDesk = (x, y, w = 120) => `<g>
  <rect x="${x - w / 2}" y="${y - 64}" width="${w}" height="9" rx="2" fill="#B45309" stroke="${LINE}" stroke-width="1"/>
  <rect x="${x - w / 2 + 6}" y="${y - 55}" width="10" height="55" fill="#92400E"/><rect x="${x + w / 2 - 16}" y="${y - 55}" width="10" height="55" fill="#92400E"/>
  <rect x="${x + 4}" y="${y - 55}" width="${w / 2 - 20}" height="18" fill="#C2410C" stroke="${LINE}" stroke-width="0.8"/><circle cx="${x + w / 4 - 6}" cy="${y - 46}" r="2" fill="#FDE68A"/>
  <rect x="${x - w / 2 + 14}" y="${y - 76}" width="26" height="12" fill="#60A5FA" stroke="${LINE}" stroke-width="0.8"/><rect x="${x - w / 2 + 16}" y="${y - 86}" width="22" height="10" fill="#F472B6" stroke="${LINE}" stroke-width="0.8"/>
  </g>`;

export default {
  sentences: true,
  groups: [[0, 1, 2], [3, 4], [5, 6], [7, 8, 9, 10], [11, 12, 13], [14, 15, 16], [17, 18, 19, 20, 21, 22]],
  scenes: [
    // Cảnh 1: năm 1946 Bác sang thăm nước Pháp; nhân dân, thiếu nhi Pháp vui mừng; tụ tập vẫy tay hoan hô Bác
    () => svg('Bác Hồ sang thăm nước Pháp, nhân dân và thiếu nhi Pháp vẫy tay hoan hô', `
      ${sky('t31s1sky', '#7DD3FC', '#F0F9FF')}
      ${cloud(130, 36, 0.7, 0)}${cloud(300, 26, 0.55, 2)}
      ${cityRow(214, [[60, 54, 120, '#FDE68A'], [118, 46, 96, '#FBCFE8'], [168, 50, 132, '#E9D5FF']])}
      ${eiffel(360, 214, 0.95)}
      <rect y="210" width="${W}" height="${H - 210}" fill="#D6D3D1"/>
      <path d="M0 210 H${W}" stroke="#A8A29E" stroke-width="2"/>
      <path d="M150 300 L210 210 H270 L330 300Z" fill="#B91C1C" opacity="0.8"/>
      ${at(1, bac(240, 280, 'wave', { s: 0.86, mood: 'joy' }))}
      ${at(2, `${P(112, 270, 't31ong', 'stand', { s: 0.72, mood: 'joy' })}${P(372, 272, 't31ba', 'stand', { s: 0.72, mood: 'joy', flip: true })}`, { off: 3 })}
      ${at(2, `${P(150, 292, 't31g1', 'stand', { s: 0.68, mood: 'joy' })}${P(330, 292, 't31b1', 'stand', { s: 0.68, mood: 'joy', flip: true })}`, { off: 3 })}
      ${at(2, `${heart(170, 150, 1.2, '#F43F5E', 0)}${heart(312, 140, 1.1, '#FB7185', 0.8)}${heart(200, 120, 0.9, '#F43F5E', 1.4)}`)}
      ${at(3, `${P(112, 270, 't31ong', 'wave', { s: 0.72, mood: 'joy' })}${P(372, 272, 't31ba', 'wave', { s: 0.72, mood: 'joy', flip: true })}
        ${P(150, 292, 't31g1', 'cheer', { s: 0.68, mood: 'joy' })}${P(330, 292, 't31b1', 'raise', { s: 0.68, mood: 'joy', flip: true })}
        ${P(400, 296, 't31b2', 'cheer', { s: 0.62, mood: 'joy', flip: true })}${P(84, 296, 't31g2', 'wave', { s: 0.62, mood: 'joy' })}`)}
      ${at(3, `${frFlag(318, 222, 0.8)}${sparkles([[180, 96, 7], [300, 90, 8], [240, 70, 6]])}`)}`),

    // Cảnh 2: đến nay nhân dân, thiếu nhi Pháp vẫn nhắc câu chuyện với lòng trìu mến, cảm phục; đó là chuyện quả táo
    () => svg('Ông bà người Pháp kể cho các cháu nghe câu chuyện quả táo', `
      ${sky('t31s2sky', '#93C5FD', '#FEF9C3')}
      ${sun(380, 46, 18)}${cloud(150, 40, 0.6, 1)}
      ${cityRow(206, [[60, 60, 110, '#FDE68A'], [330, 54, 90, '#BFDBFE'], [386, 50, 120, '#FBCFE8']])}
      ${eiffel(240, 206, 0.6)}
      <rect y="200" width="${W}" height="${H - 200}" fill="#86EFAC"/>
      <path d="M0 200 Q240 190 480 202" stroke="#4ADE80" stroke-width="6" fill="none"/>
      <rect x="110" y="236" width="104" height="9" rx="3" fill="#B45309" stroke="${LINE}" stroke-width="1"/>
      <path d="M118 245 V270 M206 245 V270" stroke="#92400E" stroke-width="5"/>
      ${at(1, `${P(140, 262, 't31ong2', 'sit', { s: 0.78, mood: 'joy' })}${P(190, 262, 't31ba2', 'sit', { s: 0.78, mood: 'joy' })}`, { talk: '1' })}
      ${at(1, `${P(258, 292, 't31g1', 'sit', { s: 0.82, mood: 'joy', flip: true })}${P(310, 292, 't31b2', 'sit', { s: 0.82, mood: 'joy', flip: true })}${P(360, 292, 't31g2', 'sit', { s: 0.82, mood: 'joy', flip: true })}`)}
      ${at(1, `${heart(250, 180, 1.2, '#F43F5E', 0)}${heart(330, 170, 1, '#FB7185', 0.6)}`)}
      ${at(2, thought(250, 82, 150, 86, 190, 160, `${apple(0, 4, 26)}${sparkles([[-48, -18, 8], [46, 16, 7]], '#FACC15')}`), { talk: '2' })}`),

    // Cảnh 3: tòa thị chính Pa-ri mở tiệc lớn đón mừng Bác; tiệc tan, mọi người ra phòng lớn uống nước, nói chuyện
    () => svg('Tiệc lớn đón mừng Bác ở tòa thị chính Pa-ri', `
      ${hall(218)}
      ${at(1, `${P(132, 238, 't31ong', 'stand', { s: 0.66, mood: 'joy' })}${bac(196, 236, 'stand', { s: 0.66, mood: 'joy' })}${P(272, 238, 't31ba', 'stand', { s: 0.66, mood: 'joy' })}${P(344, 238, 't31ong2', 'stand', { s: 0.66, mood: 'joy', flip: true })}`, { off: 2 })}
      ${banquet(100, 196, 280)}
      ${at(1, sparkles([[240, 80, 7], [150, 96, 6], [330, 92, 6]]))}
      ${at(2, `${P(118, 294, 't31ong', 'raise', { s: 0.72, mood: 'joy' })}${cup(140, 182)}
        ${P(178, 294, 't31ba', 'stand', { s: 0.72, mood: 'joy', flip: true })}
        ${bac(252, 294, 'stand', { s: 0.74, mood: 'joy' })}
        ${P(316, 294, 't31ong2', 'raise', { s: 0.72, mood: 'joy', flip: true })}${cup(294, 182)}
        ${P(368, 294, 't31ba2', 'stand', { s: 0.72, mood: 'joy', flip: true })}`, { talk: '2' })}
      ${at(2, `${speech(150, 118, 46, 30, 170, 166, word('…', 16, '#475569'))}${speech(336, 118, 46, 30, 320, 166, word('…', 16, '#475569'))}`)}`),

    // Cảnh 4: Bác đứng dậy cầm một quả táo đem theo; nhiều người ngạc nhiên, tò mò; sao khách quý lại lấy táo?; chú ý xem Bác làm gì
    () => svg('Bác cầm một quả táo đem theo, mọi người ngạc nhiên chú ý', `
      ${hall(218)}
      ${banquet(150, 196, 180)}
      ${at(1, bac(240, 296, 'raise', { s: 0.86, mood: 'joy' }))}
      ${at(1, `${apple(245, 141, 8)}${sparkles([[258, 128, 6]], '#FACC15')}`)}
      ${at(2, `${P(118, 292, 't31ba', 'stand', { s: 0.74, mood: 'wow' })}${P(370, 294, 't31ong', 'stand', { s: 0.74, mood: 'wow', flip: true })}`, { off: 4 })}
      ${at(2, `${word('!', 22, '#DC2626', 116, 128)}${word('!', 22, '#DC2626', 372, 128)}`, { off: 3 })}
      ${at(3, `${speech(110, 84, 40, 34, 116, 138, word('?', 22, '#2563EB'))}${speech(376, 84, 40, 34, 370, 138, word('?', 22, '#2563EB'))}`)}
      ${at(4, `${P(118, 292, 't31ba', 'point', { s: 0.74, mood: 'wow' })}${P(370, 294, 't31ong', 'point', { s: 0.74, mood: 'wow', flip: true })}`)}
      ${at(4, `${P(170, 300, 't31ong2', 'stand', { s: 0.66, mood: 'wow' })}${P(320, 300, 't31ba2', 'stand', { s: 0.66, mood: 'wow', flip: true })}`)}`),

    // Cảnh 5: ra đến ngoài cửa, đám thiếu nhi ríu rít chạy tới chào; Bác bế em gái nhỏ, hôn và đưa quả táo; mọi người cảm động
    () => svg('Ngoài cửa, Bác bế một em gái nhỏ, hôn em và cho em quả táo', `
      ${sky('t31s5sky', '#7DD3FC', '#F0F9FF')}
      ${cloud(330, 34, 0.7, 1)}
      ${cityHall()}
      ${cityRow(212, [[300, 60, 110, '#FDE68A'], [364, 56, 140, '#BFDBFE']])}
      <rect y="210" width="${W}" height="${H - 210}" fill="#D6D3D1"/><path d="M0 224 H${W}" stroke="#A8A29E" stroke-width="2"/>
      ${at(1, bac(160, 284, 'wave', { s: 0.86, mood: 'joy' }), { off: 2 })}
      ${at(1, `${P(264, 292, 't31be', 'run', { s: 0.66, mood: 'joy', flip: true })}${P(316, 294, 't31b1', 'run', { s: 0.7, mood: 'joy', flip: true })}${P(370, 292, 't31g1', 'run', { s: 0.7, mood: 'joy', flip: true })}`, { off: 2 })}
      ${at(1, `${word('♪', 18, '#F59E0B', 300, 180)}${word('♪', 14, '#F59E0B', 350, 166)}`, { off: 2 })}
      ${at(2, `${bac(170, 290, 'hold', { s: 0.88, mood: 'joy' })}
        ${P(186, 214, 't31be', 'give', { s: 0.56, mood: 'joy' })}${apple(220, 160, 6)}
        ${heart(186, 92, 1, '#F43F5E', 0)}`)}
      ${at(2, `${P(286, 294, 't31b1', 'wave', { s: 0.7, mood: 'joy', flip: true })}${P(340, 292, 't31g1', 'cheer', { s: 0.7, mood: 'joy', flip: true })}`)}
      ${at(3, `${P(92, 270, 't31ba', 'clap', { s: 0.7, mood: 'joy' })}${P(392, 272, 't31ong', 'clap', { s: 0.7, mood: 'joy', flip: true })}`)}
      ${at(3, `${heart(100, 130, 1, '#FB7185', 0.4)}${heart(390, 130, 1, '#F43F5E', 1)}${heart(246, 110, 1.2, '#F43F5E', 1.6)}${sparkles([[130, 110, 6], [360, 100, 7]])}`)}`),

    // Cảnh 6: hôm sau các báo đăng chuyện "Quả táo của Bác Hồ" lên trang nhất; báo kể em bé giữ khư khư quả táo, ai xin cũng không cho
    () => svg('Báo đăng chuyện quả táo lên trang nhất; em bé giữ khư khư quả táo', `
      ${sky('t31s6sky', '#BAE6FD', '#FEF9C3')}
      ${sun(400, 40, 16)}
      ${cityRow(206, [[60, 60, 120, '#E9D5FF'], [124, 48, 90, '#FDE68A'], [380, 60, 110, '#FBCFE8']])}
      <rect y="200" width="${W}" height="${H - 200}" fill="#E7E5E4"/><path d="M0 200 H${W}" stroke="#A8A29E" stroke-width="2"/>
      ${at(1, newspaper(190, 120, 0.92, -4))}
      ${at(1, sparkles([[118, 40, 8], [262, 34, 7]]))}
      ${at(2, `<rect x="104" y="232" width="170" height="40" fill="#92400E" stroke="${LINE}" stroke-width="1"/>
        ${[0, 1, 2, 3].map(i => `<g transform="translate(${126 + i * 42} 236) rotate(${i % 2 ? 4 : -5})"><rect x="-18" y="-24" width="36" height="28" fill="#FAFAF9" stroke="${LINE}" stroke-width="0.8"/>
          <rect x="-14" y="-20" width="28" height="5" fill="#1F2937"/><rect x="-12" y="-12" width="14" height="12" fill="#E0F2FE"/>${apple(-5, -6, 2.4)}<path d="M5 -10 H14 M5 -6 H14 M5 -2 H12" stroke="#A8A29E" stroke-width="1.4"/></g>`).join('')}
        <path d="M110 272 V292 M268 272 V292" stroke="#78350F" stroke-width="5"/>`)}
      ${at(3, P(330, 294, 't31be', 'hold', { s: 0.78, mood: 'happy' }))}
      ${at(3, apple(330, 238, 8))}
      ${at(3, P(392, 292, 't31b2', 'give', { s: 0.7, flip: true }))}
      ${at(3, `<g class="sc-bob"><path d="M308 206 l-8 -4 M308 216 h-10 M352 206 l8 -4 M352 216 h10" stroke="#475569" stroke-width="2" stroke-linecap="round"/></g>`)}`),

    // Cảnh 7: về nhà em để táo lên bàn học; cha mẹ bảo ăn đi kẻo hỏng; em nhất định không ăn; em giữ thật lâu làm kỷ niệm
    () => svg('Ở nhà, em bé để quả táo trên bàn học, giữ làm kỷ niệm', `
      <rect width="${W}" height="${H}" fill="#FEF3C7"/>
      <rect y="214" width="${W}" height="${H - 214}" fill="#E7C9A1"/><path d="M0 214 H${W}" stroke="#B88A5F" stroke-width="3"/>
      <rect x="250" y="50" width="96" height="82" rx="4" fill="#BAE6FD" stroke="#fff" stroke-width="6"/><path d="M298 50 V132 M250 91 H346" stroke="#fff" stroke-width="4"/>
      ${cloud(290, 78, 0.4, 0)}
      <rect x="364" y="56" width="40" height="50" fill="#FDE68A" stroke="#B45309" stroke-width="4"/>${sun(384, 81, 8, false)}
      ${studyDesk(318, 280, 140)}
      ${at(1, `${apple(304, 205, 9)}${sparkles([[322, 190, 6]], '#FACC15')}`)}
      ${at(1, P(230, 292, 't31be', 'give', { s: 0.86, mood: 'joy' }), { talk: '5,6' })}
      ${at(2, `${P(110, 290, 't31bo', 'stand', { s: 0.82, mood: 'happy' })}${P(162, 292, 't31me', 'point', { s: 0.82, mood: 'happy' })}`, { talk: '2,3' })}
      ${at(3, speech(136, 70, 62, 44, 150, 150, `${apple(-10, 2, 9)}<path d="M4 -10 Q14 -2 12 10" stroke="#16A34A" stroke-width="2.4" fill="none" stroke-linecap="round"/>${word('?', 14, '#2563EB', 20, -8)}`))}
      ${at(4, `<g transform="translate(230 226)"><g class="sc-sway"><path d="M-14 -20 l-8 0 M14 -20 l8 0" stroke="#475569" stroke-width="2.4" stroke-linecap="round"/></g></g>`)}
      ${at(6, thought(268, 60, 116, 70, 240, 170, `<g transform="translate(-26 18)">${HEAD('t31bac', { s: 0.9, mood: 'joy' })}</g>
        ${apple(18, 2, 14)}${heart(42, -20, 1, '#F43F5E', 0)}`))}
      ${at(6, sparkles([[354, 210, 7], [290, 196, 6]]))}`),
  ],
};
