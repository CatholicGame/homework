// Phim bài đọc "Biển đẹp" (theo Vũ Tú Nam), Tuần 30 Tiếng Việt 3: 5 cảnh, đánh số theo CÂU (sentences: true).
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó.
// Biển đổi màu theo buổi: sớm (buồm nâu hồng rực như đàn bướm), xế trưa (nắng lọt lỗ mây như đèn sân khấu),
// chiều (biển lặng đỏ đục như mâm bánh đúc, thuyền như hạt lạc, cảnh mờ ảo, sóng ầm ầm, hàng thùy dương vi vu).
// Nhân vật (cast.js): Linh và Nam ngắm biển ở cảnh cuối. Thuyền buồm, cây phi lao (thùy dương) vẽ ở các hàm dưới đây.
import { person } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, sparkles, soundWaves, LINE } from '../sceneKit.js';

/** Thuyền buồm nâu (x giữa, y mặt nước, s); sail: màu buồm. */
const boat = (x, y, s = 1, sail = '#9A5B34', d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:${d}s">
  <path d="M2 -4 V-66" stroke="#5B3A1E" stroke-width="2.4"/>
  <path d="M4 -64 Q30 -52 34 -10 L4 -8Z" fill="${sail}" stroke="${LINE}" stroke-width="1"/>
  <path d="M0 -58 Q-20 -40 -24 -12 L0 -10Z" fill="${sail}" stroke="${LINE}" stroke-width="1" opacity="0.92"/>
  ${[-50, -38, -26].map(yy => `<path d="M4 ${yy} L${Math.min(33, 18 + (yy + 64) * 0.7)} ${yy + 2}" stroke="${LINE}" stroke-width="0.7" opacity="0.6"/><path d="M0 ${yy + 6} L${-8 - (yy + 58) * 0.5} ${yy + 8}" stroke="${LINE}" stroke-width="0.7" opacity="0.6"/>`).join('')}
  <path d="M-30 -6 Q0 8 36 -6 L30 2 Q0 10 -26 2Z" fill="#5B3A1E" stroke="${LINE}" stroke-width="1"/></g></g>`;

/** Thuyền nhỏ xa như hạt lạc. */
const peanutBoat = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse rx="9" ry="3.4" fill="#5B3A1E"/><path d="M-6 -2 Q0 -4 6 -2" stroke="#C08457" stroke-width="1.4" fill="none"/></g>`;

/** Bướm nhỏ (so sánh với cánh buồm). */
const butterfly = (x, y, s = 1, c = '#FB7185', d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:${d}s">
  <path d="M0 0 Q-12 -14 -14 -4 Q-14 4 0 0Z M0 0 Q12 -14 14 -4 Q14 4 0 0Z" fill="${c}" stroke="${LINE}" stroke-width="0.7"/>
  <path d="M0 0 Q-9 10 -6 4 Z M0 0 Q9 10 6 4Z" fill="${c}" stroke="${LINE}" stroke-width="0.7"/><path d="M0 -4 V4" stroke="#1F2937" stroke-width="2"/></g></g>`;

/** Hàng gợn sóng nhỏ trên biển. */
const ripples = (list, c = '#E0F2FE') => list.map(([x, y, w], i) =>
  `<g class="sc-bob" style="--d:${i * 0.5}s"><path d="M${x} ${y} q${w / 4} -4 ${w / 2} 0 q${w / 4} 4 ${w / 2} 0" stroke="${c}" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.8"/></g>`).join('');

/** Cây phi lao (thùy dương): thân mảnh, các chùm lá kim rủ (x gốc, y đất, s). */
const casuarina = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-3 0 Q-1 -60 2 -130 L5 -130 Q4 -60 4 0Z" fill="#7C4A21"/>
  <g class="sc-sway" style="--d:${(x % 7) / 3}s">${[[-2, -132, 20], [-14, -112, 22], [12, -104, 22], [-16, -82, 24], [14, -72, 22], [-10, -54, 20], [10, -46, 16]].map(([cx, cy, w], i) =>
    `<path d="M${cx - w / 2} ${cy + 4} Q${cx} ${cy - 12} ${cx + w / 2} ${cy + 4} L${cx + w / 2 + 2} ${cy + 22} Q${cx} ${cy + 14} ${cx - w / 2 - 2} ${cy + 22}Z" fill="${i % 2 ? '#3F7D4E' : '#2F6B3F'}"/>
     ${[-0.35, 0, 0.35].map(k => `<path d="M${cx + k * w} ${cy} q${k * 4} 12 ${k * 6} 22" stroke="#6BAF7A" stroke-width="1" fill="none"/>`).join('')}`).join('')}</g></g>`;

/** Sóng lớn cuộn vào bờ (x trái, y, rộng). */
const bigWave = (x, y, w, d = 0) => `<g class="sc-bob" style="--d:${d}s"><path d="M${x} ${y} Q${x + w * 0.3} ${y - 54} ${x + w * 0.62} ${y - 44} Q${x + w * 0.84} ${y - 34} ${x + w * 0.76} ${y - 12} Q${x + w * 0.68} ${y - 28} ${x + w * 0.56} ${y - 14} Q${x + w * 0.8} ${y + 4} ${x + w} ${y} V${y + 14} H${x}Z" fill="#7DD3FC" stroke="#0369A1" stroke-width="1"/>
  <path d="M${x + w * 0.26} ${y - 34} Q${x + w * 0.6} ${y - 56} ${x + w * 0.8} ${y - 26}" stroke="#F0F9FF" stroke-width="6" fill="none" stroke-linecap="round"/>
  ${[0.66, 0.76, 0.86, 0.72].map((k, i) => `<circle cx="${x + w * k}" cy="${y - 52 - (i % 3) * 6}" r="${4 - i * 0.6}" fill="#F0F9FF"/>`).join('')}</g>`;

export default {
  sentences: true,
  groups: [[0, 1], [2, 3], [4, 5, 6, 7], [8, 9], [10, 11]],
  scenes: [
    // Cảnh 1: buổi sớm nắng sáng; buồm nâu được nắng chiếu hồng rực lên như đàn bướm múa lượn giữa trời xanh
    () => svg('Buổi sớm, những cánh buồm hồng rực trên biển như đàn bướm', `
      ${sky('t30s1sky', '#7DD3FC', '#FDE68A')}
      ${cloud(130, 50, 0.6, 0)}
      ${at(1, `<circle cx="300" cy="150" r="70" fill="#FEF3C7" opacity="0.6"/>${sun(300, 132, 24)}`)}
      <rect y="150" width="${W}" height="${H - 150}" fill="#38BDF8"/>
      ${at(1, `<path d="M276 152 H324 L340 300 H260Z" fill="#FFFBEB" opacity="0.55"/>${sparkles([[290, 186, 6], [312, 222, 7], [300, 262, 6]], '#FFFBEB')}`)}
      ${ripples([[80, 180, 40], [180, 206, 46], [380, 190, 40], [120, 254, 52], [370, 262, 48], [220, 286, 44]])}
      ${at(1, boat(150, 196, 0.9, '#9A5B34', 0), { off: 2 })}${at(1, boat(370, 186, 0.75, '#9A5B34', 0.8), { off: 2 })}
      ${at(2, `${boat(150, 196, 0.9, '#F43F5E', 0)}${boat(370, 186, 0.75, '#FB7185', 0.8)}${boat(240, 250, 1.15, '#E11D48', 1.4)}${boat(100, 262, 0.7, '#FB7185', 0.4)}
        ${butterfly(200, 90, 1, '#FB7185', 0)}${butterfly(380, 96, 0.9, '#F43F5E', 0.8)}${butterfly(120, 120, 0.8, '#FDA4AF', 1.6)}`)}`),

    // Cảnh 2: mặt trời xế trưa bị mây che lỗ nhỏ; tia nắng dát vàng một vùng biển tròn, làm nổi bật cánh buồm như đèn sân khấu
    () => svg('Nắng lọt qua lỗ mây chiếu vàng một vùng biển tròn có những cánh buồm', `
      ${sky('t30s2sky', '#38BDF8', '#E0F2FE')}
      ${sun(250, 52, 22, false)}
      ${at(1, `<g><ellipse cx="250" cy="56" rx="130" ry="40" fill="#E2E8F0" stroke="#CBD5E1"/><ellipse cx="180" cy="48" rx="60" ry="32" fill="#F1F5F9"/><ellipse cx="320" cy="44" rx="64" ry="34" fill="#F1F5F9"/>
        <ellipse cx="250" cy="76" rx="14" ry="9" fill="#FDE047"/></g>`)}
      <rect y="132" width="${W}" height="${H - 132}" fill="#0284C7"/>
      ${ripples([[80, 160, 40], [380, 170, 44], [100, 250, 50], [380, 260, 46], [200, 286, 40]], '#7DD3FC')}
      ${at(2, `<path d="M240 82 L262 82 L340 220 L160 220Z" fill="#FDE047" opacity="0.35"/>
        <ellipse cx="250" cy="216" rx="96" ry="28" fill="#FACC15" opacity="0.85"/><ellipse cx="250" cy="216" rx="70" ry="18" fill="#FDE68A"/>
        ${sparkles([[200, 206, 6], [300, 212, 7], [250, 232, 5], [180, 160, 6], [320, 150, 6]], '#FFFBEB')}`)}
      ${boat(214, 220, 0.85, '#9A5B34', 0)}${boat(288, 222, 0.8, '#9A5B34', 1)}
      ${at(2, `${boat(214, 220, 0.85, '#F59E0B', 0)}${boat(288, 222, 0.8, '#FBBF24', 1)}`)}
      ${boat(110, 172, 0.5, '#7C4A21', 0.6)}${boat(392, 168, 0.5, '#7C4A21', 1.2)}`),

    // Cảnh 3: chiều gió mùa đông bắc vừa dừng; biển lặng đỏ đục như mâm bánh đúc, thuyền như hạt lạc; biển khoác áo mới; cảnh vật mờ ảo
    () => svg('Chiều, biển lặng màu đỏ đục, thuyền nhỏ li ti như hạt lạc, cảnh vật mờ ảo', `
      ${sky('t30s3sky', '#FDBA74', '#FEF3C7')}
      ${sun(380, 110, 18, false)}
      ${at(1, `${cloud(150, 50, 0.7, 0, '#E5E7EB')}${cloud(300, 40, 0.6, 1, '#E5E7EB')}`)}
      ${at(1, `${[[90, 80], [180, 110], [270, 76]].map(([x, y]) => `<path d="M${x} ${y} q30 -12 60 0 t50 -4" stroke="#94A3B8" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8"/>`).join('')}`, { off: 2 })}
      <rect y="140" width="${W}" height="${H - 140}" fill="#0EA5E9"/>
      ${ripples([[100, 170, 40], [300, 190, 46], [160, 240, 50], [360, 260, 40]], '#BAE6FD')}
      ${at(2, `<rect y="140" width="${W}" height="${H - 140}" fill="#B45F3C"/>
        <path d="M0 140 H${W}" stroke="#E6A27A" stroke-width="3"/>
        ${[[100, 168], [170, 196], [238, 162], [300, 214], [366, 180], [130, 244], [214, 266], [330, 258], [400, 226], [270, 190]].map(([x, y], i) => peanutBoat(x, y, 0.8 + (y - 160) / 200)).join('')}`)}
      ${at(3, `${[156, 186, 222, 262].map((y, i) => `<path d="M0 ${y} Q120 ${y - 6} 240 ${y} T480 ${y}" stroke="${['#F59E0B', '#FBBF24', '#FB923C', '#FCD34D'][i]}" stroke-width="3" fill="none" opacity="0.6"/>`).join('')}
        ${sparkles([[150, 210, 6], [330, 180, 6], [260, 280, 6]], '#FDE68A')}`)}
      ${at(4, `<rect width="${W}" height="${H}" fill="#F8FAFC" opacity="0.28"/>
        <g class="sc-drift" style="--d:0s"><ellipse cx="160" cy="146" rx="150" ry="14" fill="#fff" opacity="0.6"/></g>
        <g class="sc-drift" style="--d:3s"><ellipse cx="340" cy="210" rx="130" ry="12" fill="#fff" opacity="0.5"/></g>`)}`),

    // Cảnh 4: sóng ầm ầm, lao xao; hàng thùy dương xào xạc, vi vu như đang trò chuyện
    () => svg('Sóng ầm ầm vỗ vào bờ, hàng phi lao xào xạc trên bãi cát', `
      ${sky('t30s4sky', '#FDBA74', '#FEF3C7')}
      ${cloud(320, 40, 0.6, 1)}
      <rect y="120" width="${W}" height="110" fill="#0EA5E9"/>
      ${ripples([[90, 140, 40], [260, 150, 46], [380, 136, 40]], '#BAE6FD')}
      <path d="M0 226 Q120 216 240 228 T480 222 V${H} H0Z" fill="#FDE68A"/>
      ${at(1, `${bigWave(60, 214, 150, 0)}${bigWave(200, 220, 160, 0.8)}${bigWave(330, 212, 140, 1.4)}
        <path d="M60 230 Q140 236 220 230 T420 232" stroke="#F0F9FF" stroke-width="5" fill="none" stroke-linecap="round"/>
        ${soundWaves(380, 180, 1, '#F0F9FF')}`)}
      ${at(2, `${casuarina(84, 292, 1.05)}${casuarina(138, 300, 1.2)}${casuarina(356, 300, 1.2)}${casuarina(410, 292, 1.0)}
        ${soundWaves(168, 170, 0.8, '#15803D')}<g transform="translate(326 170) scale(-1 1)">${soundWaves(0, 0, 0.8, '#15803D')}</g>`)}`),

    // Cảnh 5: biển nhiều khi rất đẹp, ai cũng thấy; vẻ đẹp muôn màu ấy phần lớn do mây trời và ánh sáng tạo nên
    () => svg('Hai bạn nhỏ ngắm biển muôn màu, mây trời và ánh sáng nhuộm màu cho biển', `
      ${sky('t30s5sky', '#7DD3FC', '#E0F2FE')}
      <rect y="150" width="${W}" height="${H - 150}" fill="#38BDF8"/>
      ${ripples([[90, 176, 40], [300, 186, 44], [380, 170, 40]])}
      ${at(2, `<defs><linearGradient id="t30s5glow" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F472B6"/><stop offset="0.35" stop-color="#FB923C"/><stop offset="0.65" stop-color="#FDE047"/><stop offset="1" stop-color="#A78BFA"/></linearGradient></defs>
        <rect width="${W}" height="150" fill="url(#t30s5glow)" opacity="0.35"/>
        <rect y="150" width="${W}" height="80" fill="url(#t30s5glow)" opacity="0.4"/>
        ${sun(250, 96, 20)}${[0, 1, 2, 3, 4, 5].map(i => `<path d="M250 96 L${110 + i * 56} 230" stroke="#FEF08A" stroke-width="5" opacity="0.4"/>`).join('')}
        ${cloud(150, 60, 0.8, 0, '#FBCFE8')}${cloud(350, 54, 0.8, 1.5, '#DDD6FE')}${cloud(250, 30, 0.6, 3, '#FED7AA')}
        ${sparkles([[150, 190, 7], [300, 200, 7], [380, 210, 6], [220, 176, 6]], '#fff')}`)}
      <path d="M0 230 Q120 220 240 232 T480 226 V${H} H0Z" fill="#FDE68A"/>
      ${at(1, `${person(180, 292, 'linh', 'point', { s: 0.86, flip: true, mood: 'wow' })}${person(286, 292, 'nam', 'wave', { s: 0.86, mood: 'joy' })}`)}
      ${at(1, boat(392, 196, 0.6, '#9A5B34', 0))}`),
  ],
};
