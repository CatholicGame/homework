/** Đề kiểm tra Tuần 14 (Phiếu ôn tập cuối tuần 14). Nguồn: docs/lop_3/De_thi/Toan3-KN-Tuan11-18.pdf trang 15–19.
 *  Chữ trong các hình vẽ của bản Google Docs (nhiệt độ, nhãn cân nặng, sơ đồ con ong) lấy từ bản xuất .docx. */

const INK = '#1f2937';
const svg = (w, vb, body) => `<svg viewBox="${vb}" width="${w}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

// Bài 2 Phần 1: đồ vật.
const ball = svg(80, '0 0 80 80', `<circle cx="40" cy="40" r="32" fill="#fff" stroke="${INK}" stroke-width="2"/><path d="M40 28 L51 36 L47 49 H33 L29 36 Z" fill="${INK}"/><path d="M40 28 V10 M51 36 L68 30 M47 49 L57 64 M33 49 L23 64 M29 36 L12 30" stroke="${INK}" stroke-width="2"/>`);
const tv = svg(100, '0 0 100 80', `<rect x="6" y="8" width="88" height="54" rx="3" fill="${INK}"/><rect x="11" y="13" width="78" height="44" fill="#7dd3fc"/><path d="M11 45 Q35 32 55 44 T89 40 V57 H11 Z" fill="#4ade80"/><circle cx="68" cy="26" r="7" fill="#fde047"/><path d="M40 62 L34 72 H66 L60 62" stroke="${INK}" stroke-width="2" fill="#94a3b8"/>`);
const cube = svg(80, '0 0 80 80', `<path d="M40 8 L70 22 L40 36 L10 22 Z" fill="#facc15" stroke="${INK}" stroke-width="2"/><path d="M10 22 L40 36 V72 L10 58 Z" fill="#ef4444" stroke="${INK}" stroke-width="2"/><path d="M70 22 L40 36 V72 L70 58 Z" fill="#3b82f6" stroke="${INK}" stroke-width="2"/><path d="M20 17 L50 31 M30 12.5 L60 26.5 M30 31 L60 17 M20 26.5 L50 12.5 M10 34 L40 48 M10 46 L40 60 M20 26.7 V62.7 M30 31.3 V67.3 M70 34 L40 48 M70 46 L40 60 M60 26.7 V62.7 M50 31.3 V67.3" stroke="${INK}" stroke-width="1.2"/>`);
const trike = svg(100, '0 0 100 80', `<circle cx="20" cy="56" r="16" fill="none" stroke="${INK}" stroke-width="5"/><circle cx="76" cy="60" r="12" fill="none" stroke="${INK}" stroke-width="5"/><path d="M20 56 L44 30 L76 60 M44 30 L60 52 H76 M44 30 L40 14 M32 14 H50 M58 44 H70" stroke="#f97316" stroke-width="4" fill="none" stroke-linecap="round"/>`);

// Bài 3 Phần 1: nhiệt kế (mức thấp, vừa, cao) và tranh.
const thermo = (level, color) => svg(46, '0 0 46 120', `<rect x="17" y="6" width="12" height="90" rx="6" fill="#fff" stroke="${INK}" stroke-width="2"/><rect x="20" y="${96 - level}" width="6" height="${level}" fill="${color}"/><circle cx="23" cy="104" r="11" fill="${color}" stroke="${INK}" stroke-width="2"/>${[20, 35, 50, 65, 80].map(y => `<path d="M30 ${y} H36" stroke="${INK}" stroke-width="1.5"/>`).join('')}`);
const kid = (cx, coat) => `<circle cx="${cx}" cy="40" r="12" fill="#fde2c4" stroke="${INK}" stroke-width="2"/><path d="M${cx - 14} 92 L${cx - 10} 56 Q${cx} 50 ${cx + 10} 56 L${cx + 14} 92 Z" fill="${coat}" stroke="${INK}" stroke-width="2"/>`;
const autumn = svg(120, '0 0 120 100', `<rect x="84" y="50" width="8" height="42" fill="#92400e"/><circle cx="88" cy="38" r="22" fill="#fb923c" stroke="${INK}" stroke-width="2"/><path d="M60 70 l4 4 l-4 4 l-4 -4 Z M70 86 l4 4 l-4 4 l-4 -4 Z" fill="#f59e0b"/>${kid(36, '#93c5fd')}`);
const hot = svg(120, '0 0 120 100', `<circle cx="96" cy="20" r="12" fill="#fbbf24" stroke="#f97316" stroke-width="2"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M${96 + 16 * Math.cos(a * Math.PI / 180)} ${20 + 16 * Math.sin(a * Math.PI / 180)} L${96 + 22 * Math.cos(a * Math.PI / 180)} ${20 + 22 * Math.sin(a * Math.PI / 180)}" stroke="#f97316" stroke-width="2"/>`).join('')}${kid(46, '#fca5a5')}<path d="M62 34 q3 6 0 8 q-3 -2 0 -8 Z M30 30 q3 6 0 8 q-3 -2 0 -8 Z" fill="#38bdf8"/><circle cx="41" cy="44" r="3" fill="#f87171"/><circle cx="51" cy="44" r="3" fill="#f87171"/>`);
const cold = svg(120, '0 0 120 100', `${kid(60, '#6366f1')}<path d="M46 34 Q60 18 74 34 Z" fill="#3b82f6" stroke="${INK}" stroke-width="2"/><path d="M48 54 H72" stroke="#ef4444" stroke-width="5"/>${[[18, 20], [100, 30], [24, 70], [98, 76]].map(([x, y]) => `<path d="M${x - 6} ${y} H${x + 6} M${x} ${y - 6} V${y + 6} M${x - 4} ${y - 4} L${x + 4} ${y + 4} M${x + 4} ${y - 4} L${x - 4} ${y + 4}" stroke="#60a5fa" stroke-width="2"/>`).join('')}`);

// Bài 2 Phần 2: năm ca nước, đánh số 1–5.
const BOTTLES = [[500, 70], [100, 40], [350, 60], [200, 50], [100, 40]];
const bottles = svg(320, '0 0 320 130', BOTTLES.map(([ml, h], i) => {
  const cx = 32 + i * 64, top = 100 - h;
  return `<rect x="${cx - 6}" y="${top - 12}" width="12" height="8" rx="2" fill="#2563eb" stroke="${INK}" stroke-width="1.5"/><path d="M${cx - 6} ${top - 4} Q${cx - 18} ${top + 4} ${cx - 18} ${top + 14} V100 H${cx + 18} V${top + 14} Q${cx + 18} ${top + 4} ${cx + 6} ${top - 4} Z" fill="#bfdbfe" stroke="${INK}" stroke-width="2"/><text x="${cx}" y="${top + 30 > 92 ? 92 : top + 30}" font-size="11" text-anchor="middle" fill="${INK}">${ml}ml</text><text x="${cx}" y="122" font-size="14" font-weight="700" text-anchor="middle" fill="${INK}">${i + 1}</text>`;
}).join(''));

export default {
  id: 'tuan-14',
  title: 'Đề kiểm tra Tuần 14',
  short: 'Tuần 14',
  desc: 'Nhiệt độ, gam, mi-li-lít, mi-li-mét, chia có dư',
  review: 'nhiệt độ, các đơn vị gam, mi-li-lít, mi-li-mét và phép chia có dư',
  time: 45,
  numbering: 'part',
  parts: [
    {
      title: 'Phần 1. Trắc nghiệm',
      label: 'Bài',
      questions: [
        // sửa: đề in "37C", ghi đúng đơn vị độ C (°C).
        {
          type: 'mc',
          prompt: 'Nhiệt độ cơ thể của các bạn Gấu, Thỏ, Hươu, Sóc đo được như sau. Hãy đánh dấu vào con vật có nhiệt độ cơ thể cao nhất.',
          options: ['Gấu: 37°C', 'Thỏ: 39°C', 'Hươu: 38°C', 'Sóc: 36°C'],
          ans: 1,
        },
        {
          type: 'mc',
          prompt: 'Chọn số đo phù hợp với cân nặng của mỗi đồ vật sau:',
          items: [
            { prompt: 'a) Quả bóng đá', fig: ball, options: ['450 g', '45 kg'], ans: 0 },
            { prompt: 'b) Chiếc ti vi', fig: tv, options: ['40 g', '4 kg'], ans: 1 },
            { prompt: 'c) Khối rubik', fig: cube, options: ['96 g', '6 kg'], ans: 0 },
            { prompt: 'd) Chiếc xe đạp ba bánh', fig: trike, options: ['500 g', '5 kg'], ans: 1 },
          ],
        },
        {
          type: 'match',
          prompt: 'Nối nhiệt kế với bức tranh thích hợp:',
          left: [thermo(22, '#3b82f6'), thermo(50, '#22c55e'), thermo(82, '#ef4444')],
          right: [autumn, hot, cold],
          ans: [2, 0, 1],
        },
        { type: 'mc', prompt: 'Kết quả của phép tính 45 g + 26 g − 11 g = … là:', options: ['60 g', '50 g', '71 g', '61 g'], ans: 0 },
        { type: 'mc', prompt: 'Kết quả của phép tính 67 mm − 17 mm + 12 mm = … là:', options: ['50 mm', '60 mm', '52 mm', '62 mm'], ans: 3 },
      ],
    },
    {
      title: 'Phần 2. Tự luận',
      label: 'Bài',
      questions: [
        {
          type: 'calc',
          prompt: 'Tính:',
          items: [
            { t: '612 ml − 109 ml + 21 ml', ans: 524, unit: 'ml' },
            { t: '345 mm + 129 mm − 318 mm', ans: 156, unit: 'mm' },
            { t: '123 g + 456 g − 87 g', ans: 492, unit: 'g' },
            { t: '526 ml + 224 ml − 101 ml', ans: 649, unit: 'ml' },
          ],
        },
        {
          type: 'fill',
          prompt: 'Cho các ca đựng nước như sau:',
          fig: bottles,
          items: [
            { t: 'Ca ít nước nhất: ca … và ca …', ans: [2, 5], anyOrder: true },
            { t: 'Ca nhiều nước nhất: ca …', ans: 1 },
            { t: 'Hai ca khác nhau để được 450 ml nước: … ml + … ml = 450 ml', ans: [350, 100], anyOrder: true },
            { t: 'Hai ca khác nhau để được 550 ml nước: … ml + … ml = 550 ml', ans: [350, 200], anyOrder: true },
          ],
        },
        {
          type: 'chain',
          prompt: 'Số? (hàng trên tính theo ml, hàng dưới tính theo g)',
          items: [
            { start: 15, steps: ['× 3', ': 5', '× 8'] },
            { start: 72, steps: [': 9', '× 7', ': 2'] },
          ],
        },
        {
          type: 'compare',
          prompt: 'Điền dấu <, >, = vào chỗ chấm:',
          items: [
            { t: '1 kg □ 125 g × 8', ans: '=' },
            { t: '100 m : 4 □ 20 m', ans: '>' },
            { t: '235 dm × 2 □ 429 dm', ans: '>' },
            { t: '1 kg □ 345 g + 655 g', ans: '=' },
            { t: '636 m : 6 □ 107 m', ans: '<' },
            { t: '250 cm × 2 □ 5 dm', ans: '>' },
          ],
        },
        {
          type: 'word',
          text: 'Một đoạn đường dài 60 cm. Con sên đã bò được {1/5} đoạn đường. Hỏi con sên đã bò được đoạn đường dài bao nhiêu xăng-ti-mét?',
          given: ['Đoạn đường dài 60 cm.', 'Con sên bò được {1/5} đoạn đường.'],
          ask: 'Con sên đã bò được bao nhiêu xăng-ti-mét?',
          hint: 'Tìm {1/5} của 60 cm thì lấy 60 chia cho 5.',
          sentence: ['Con sên', 'đã bò được', 'đoạn đường dài', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 60, op: ':', b: 5, result: 12, unit: 'cm' },
          units: ['cm', 'm', 'lần'],
        },
        {
          type: 'fill',
          prompt: 'Có 2 cốc loại 350 ml và 250 ml. Chỉ dùng 2 cái cốc đó, làm thế nào để lấy được 200 ml nước từ thùng nước?',
          marker: '1',
          items: [
            { t: 'Múc đầy cốc 350 ml rồi rót sang cốc 250 ml cho đầy. Cốc 350 ml còn lại … ml.', ans: 100 },
            { t: 'Đổ nước ở cốc 250 ml trở lại thùng, rót … ml còn lại từ cốc 350 ml sang cốc 250 ml.', ans: 100 },
            { t: 'Lại múc đầy cốc 350 ml rồi rót sang cốc 250 ml cho đầy: rót thêm được … ml.', ans: 150 },
            { t: 'Cốc 350 ml còn lại đúng … ml nước.', ans: 200 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Người ta chia 95 g hạt tiêu vào các lọ nhỏ, mỗi lọ 9 g. Hỏi người ta chia được vào nhiều nhất bao nhiêu lọ và thừa bao nhiêu gam hạt tiêu?',
          items: [
            { t: '95 : 9 = … (dư …)', ans: [10, 5] },
            { t: 'Chia được nhiều nhất … lọ và thừa … g hạt tiêu.', ans: [10, 5] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Có 65 m vải, may 1 bộ quần áo hết 3 m. Hỏi may được nhiều nhất bao nhiêu bộ quần áo và còn thừa mấy mét vải?',
          items: [
            { t: '65 : 3 = … (dư …)', ans: [21, 2] },
            { t: 'May được nhiều nhất … bộ quần áo và còn thừa … m vải.', ans: [21, 2] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Có 29 kg lạc đóng vào 6 túi như nhau. Hỏi mỗi túi chứa bao nhiêu ki-lô-gam lạc và còn thừa bao nhiêu ki-lô-gam lạc?',
          items: [
            { t: '29 : 6 = … (dư …)', ans: [4, 5] },
            { t: 'Mỗi túi chứa … kg lạc và còn thừa … kg lạc.', ans: [4, 5] },
          ],
        },
      ],
    },
  ],
};
