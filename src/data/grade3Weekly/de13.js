/** Đề kiểm tra Tuần 13 (Phiếu ôn tập cuối tuần 13). Nguồn: docs/lop_3/De_thi/Toan3-KN-Tuan11-18.pdf trang 11–14.
 *  Chữ trong các hình vẽ của bản Google Docs (khẩu trang, bàn tay 5K, toa tàu) lấy từ bản xuất .docx. */

const INK = '#1f2937';
// Cân đĩa: đồ vật đặt trên hai đĩa, mỗi đồ vật là hàm (tâm x, đáy y) → SVG.
const place = (items, cx, gap = 44) => items.map((f, i) => f(cx + (i - (items.length - 1) / 2) * gap, 84)).join('');
const balance = (left, right, gapL, gapR) => `<svg viewBox="0 0 320 150" width="300" xmlns="http://www.w3.org/2000/svg">
  <path d="M160 70 V132 M118 136 H202 M70 70 H250" stroke="${INK}" stroke-width="3" fill="none"/>
  <path d="M70 70 V84 M250 70 V84" stroke="${INK}" stroke-width="2" fill="none"/>
  <path d="M18 84 H122 Q118 98 70 98 Q22 98 18 84 Z M198 84 H302 Q298 98 250 98 Q202 98 198 84 Z" stroke="${INK}" stroke-width="2" fill="#e5e7eb"/>
  <circle cx="160" cy="66" r="6" fill="${INK}"/>
  ${place(left, 70, gapL)}${place(right, 250, gapR)}</svg>`;
const weight = (label) => (cx, by) => `<g><path d="M${cx - 17} ${by} L${cx - 14} ${by - 26} H${cx + 14} L${cx + 17} ${by} Z" fill="#cbd5e1" stroke="${INK}" stroke-width="2"/><rect x="${cx - 7}" y="${by - 32}" width="14" height="6" rx="2" fill="#cbd5e1" stroke="${INK}" stroke-width="1.5"/><text x="${cx}" y="${by - 8}" font-size="11" font-weight="700" text-anchor="middle" fill="${INK}">${label}</text></g>`;
const milk = (cx, by) => `<g><rect x="${cx - 18}" y="${by - 40}" width="36" height="40" rx="4" fill="#fecaca" stroke="${INK}" stroke-width="2"/><rect x="${cx - 18}" y="${by - 30}" width="36" height="16" fill="#fff" stroke="${INK}" stroke-width="1"/><text x="${cx}" y="${by - 18}" font-size="11" text-anchor="middle" fill="${INK}">Sữa</text></g>`;
const apple = (cx, by) => `<g><circle cx="${cx}" cy="${by - 16}" r="16" fill="#f87171" stroke="${INK}" stroke-width="2"/><path d="M${cx} ${by - 32} q2 -6 6 -8" stroke="${INK}" stroke-width="2" fill="none"/><path d="M${cx + 3} ${by - 34} q8 -6 12 0 q-6 4 -12 0 Z" fill="#4ade80" stroke="${INK}" stroke-width="1"/></g>`;
const dragon = (cx, by) => `<g><ellipse cx="${cx}" cy="${by - 17}" rx="18" ry="17" fill="#f472b6" stroke="${INK}" stroke-width="2"/><path d="M${cx - 14} ${by - 26} l-8 -4 M${cx + 14} ${by - 26} l8 -4 M${cx - 4} ${by - 33} l-3 -8 M${cx + 6} ${by - 32} l4 -8 M${cx - 16} ${by - 12} l-8 1 M${cx + 16} ${by - 12} l8 1" stroke="#16a34a" stroke-width="3" fill="none"/></g>`;
const salt = (cx, by) => `<g><path d="M${cx - 14} ${by} V${by - 30} Q${cx} ${by - 46} ${cx + 14} ${by - 30} V${by} Z" fill="#fff" stroke="${INK}" stroke-width="2"/><text x="${cx}" y="${by - 12}" font-size="9" text-anchor="middle" fill="${INK}">Muối</text></g>`;

// Đồ vật Bài 3 (ô nối).
const OBJ = {
  bottle: `<svg viewBox="0 0 80 90" width="70" xmlns="http://www.w3.org/2000/svg"><rect x="32" y="6" width="16" height="10" rx="2" fill="#3b82f6" stroke="${INK}" stroke-width="2"/><path d="M33 16 Q22 26 24 38 V82 H56 V38 Q58 26 47 16 Z" fill="#dbeafe" stroke="${INK}" stroke-width="2"/><rect x="24" y="46" width="32" height="16" fill="#93c5fd" stroke="${INK}" stroke-width="1"/><text x="40" y="58" font-size="9" text-anchor="middle" fill="${INK}">Nước</text></svg>`,
  book: `<svg viewBox="0 0 80 90" width="70" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="10" width="52" height="70" rx="3" fill="#fde68a" stroke="${INK}" stroke-width="2"/><text x="40" y="34" font-size="12" font-weight="700" text-anchor="middle" fill="#dc2626">TOÁN 3</text><circle cx="32" cy="56" r="7" fill="#fca5a5" stroke="${INK}" stroke-width="1.5"/><circle cx="50" cy="56" r="7" fill="#93c5fd" stroke="${INK}" stroke-width="1.5"/></svg>`,
  notebook: `<svg viewBox="0 0 80 90" width="70" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="14" width="48" height="64" rx="3" fill="#bbf7d0" stroke="${INK}" stroke-width="2"/><rect x="24" y="24" width="32" height="14" rx="2" fill="#fff" stroke="${INK}" stroke-width="1.5"/><path d="M24 30 H56 M24 34 H48" stroke="${INK}" stroke-width="1"/><text x="40" y="62" font-size="10" text-anchor="middle" fill="${INK}">Vở</text></svg>`,
  bag: `<svg viewBox="0 0 80 90" width="70" xmlns="http://www.w3.org/2000/svg"><path d="M30 18 Q40 4 50 18" stroke="${INK}" stroke-width="3" fill="none"/><rect x="16" y="18" width="48" height="64" rx="10" fill="#1e3a8a" stroke="${INK}" stroke-width="2"/><rect x="22" y="48" width="36" height="22" rx="4" fill="#3b82f6" stroke="${INK}" stroke-width="1.5"/><path d="M16 40 H64" stroke="#22c55e" stroke-width="4"/></svg>`,
};

export default {
  id: 'tuan-13',
  title: 'Đề kiểm tra Tuần 13',
  short: 'Tuần 13',
  desc: 'Mi-li-mét, gam, mi-li-lít, cân đĩa, chia có dư',
  review: 'đơn vị đo mi-li-mét, gam, mi-li-lít và các phép tính với đơn vị đo',
  time: 45,
  numbering: 'part',
  parts: [
    {
      title: 'Phần 1. Trắc nghiệm',
      label: '',
      questions: [
        {
          type: 'compare',
          prompt: 'Điền dấu >, <, = thích hợp để thu thập những chiếc khẩu trang:',
          items: [
            { t: '500 g + 900 g □ 2 kg', ans: '<' },
            { t: '1 kg □ 1000 g', ans: '=' },
            { t: '50 g × 6 □ 2 kg', ans: '<' },
          ],
        },
        // sửa: bàn tay thứ tư của bản Docs chép trùng "35mm + 24mm = 59mm", thay bằng một phép tính khác.
        {
          type: 'tf',
          prompt: 'Điền Đ/S để thực hiện quy định 5K:',
          items: ['35 mm + 24 mm = 59 mm', '60 mm : 3 = 2 mm', '100 mm + 2 cm = 102 mm', '40 mm + 6 cm = 100 mm'],
          ans: ['Đ', 'S', 'S', 'Đ'],
        },
        {
          type: 'fill',
          prompt: 'Điền dấu (+; −) thích hợp vào ô trống để kết nối các toa tàu.',
          items: [{ t: '300 g □ 400 g □ 200 g = 500 g', ans: ['+', '−'], choices: ['+', '−'] }],
        },
        { type: 'mc', prompt: 'Kết quả của phép tính 115 g + 75 g là:', options: ['100 g', '190 g', '200 kg', '200 g'], ans: 1 },
        { type: 'mc', prompt: 'Kết quả của phép tính 100 g − 37 g là:', options: ['53 g', '63 kg', '80 g', '63 g'], ans: 3 },
        { type: 'mc', prompt: 'Dấu <, >, = thích hợp để điền vào chỗ chấm 300 g + 3 g … 303 g là:', options: ['<', '=', '>'], ans: 1 },
        {
          type: 'fill',
          prompt: 'Trên một đĩa cân người ta đặt ba quả cân loại 500 g; 200 g; 100 g. Trên đĩa kia người ta đặt 3 quả lê thì cân thăng bằng.',
          items: [{ t: 'Vậy 3 quả lê đó nặng … g.', ans: 800 }],
        },
        { type: 'mc', prompt: 'Mỗi gói kẹo cân nặng 150 g, mỗi gói bánh cân nặng 200 g. Hỏi 3 gói kẹo và 2 gói bánh cân nặng bao nhiêu gam?', options: ['800 g', '850 g', '900 g', '950 g'], ans: 1 },
        {
          type: 'fill',
          prompt: 'Viết tiếp vào chỗ chấm:',
          items: [
            { t: 'Hai số tự nhiên khác 0 có tổng bằng 3. Hỏi số bé bằng một phần mấy số lớn? Đáp số: …', ans: '{1/2}', choices: ['{1/2}', '{1/3}', '{1/4}'] },
            { t: 'Cô Lan có 1 kg đường, cô dùng làm bánh hết 400 g, số đường còn lại được chia đều vào 3 túi nhỏ. Hỏi mỗi túi nhỏ có bao nhiêu đường? Đáp số: … g', ans: 200 },
          ],
        },
      ],
    },
    {
      title: 'Phần 2. Tự luận',
      label: 'Bài',
      questions: [
        {
          type: 'fill',
          prompt: 'a) Tính (ý 1 đến 4). b) Điền dấu >, <, = thích hợp vào chỗ chấm (ý 5 đến 7).',
          marker: '1',
          items: [
            { t: '300 ml + 400 ml = … ml', ans: 700 },
            { t: '500 ml − 200 ml = … ml', ans: 300 },
            { t: '7 ml × 4 = … ml', ans: 28 },
            { t: '40 ml : 8 = … ml', ans: 5 },
            { t: '300 ml + 700 ml … 1 l', ans: '=', choices: ['>', '<', '='] },
            { t: '600 ml + 40 ml … 1 l', ans: '<', choices: ['>', '<', '='] },
            { t: '1 l … 100 ml − 10 ml', ans: '>', choices: ['>', '<', '='] },
          ],
        },
        // sửa: bản gốc để trống khối lượng các quả cân ở cân hộp sữa và cân táo, ghi thêm số cho các quả cân.
        {
          type: 'fill',
          prompt: 'Quan sát và điền số thích hợp vào chỗ chấm:',
          items: [
            { fig: balance([weight('200g'), weight('200g')], [milk]), t: 'Hộp sữa cân nặng là: … g', ans: 400 },
            { fig: balance([weight('100g'), weight('100g'), weight('200g')], [apple, apple], 38, 36), t: 'Hai quả táo cân nặng là: … g (biết mỗi quả táo cân nặng bằng nhau)', ans: 400 },
            { fig: balance([weight('200g'), weight('300g')], [dragon, dragon]), t: 'Hai quả thanh long cân nặng: … g', ans: 500 },
            { fig: balance([weight('???')], [salt, salt, salt], 44, 34), t: 'Mỗi túi muối nặng 200 g. ??? = … g. Cần … quả cân 300 g để cân thăng bằng.', ans: [600, 2] },
          ],
        },
        // sửa: đề in "Dùng cân để cân các đồ vật sau" là bài thực hành; trên máy đổi thành nối đồ vật với cân nặng khoảng chừng.
        {
          type: 'match',
          prompt: 'Dùng cân để cân các đồ vật sau. Nối mỗi đồ vật với cân nặng phù hợp:',
          left: [OBJ.bottle, OBJ.book, OBJ.notebook, OBJ.bag],
          right: ['khoảng 2 kg', 'khoảng 80 g', 'khoảng 500 g', 'khoảng 200 g'],
          ans: [2, 3, 1, 0],
        },
        {
          type: 'calc',
          prompt: 'Tính:',
          items: [
            { t: '15 g + 25 g', ans: 40, unit: 'g' },
            { t: '200 g + 300 g', ans: 500, unit: 'g' },
            { t: '80 g − 50 g', ans: 30, unit: 'g' },
            { t: '600 g − 300 g', ans: 300, unit: 'g' },
            { t: '300 g × 2', ans: 600, unit: 'g' },
            { t: '450 g × 2', ans: 900, unit: 'g' },
          ],
        },
        // sửa: đề in "Một lon nước ngọt 750ml, đổ 2 chai như thế", thống nhất gọi là chai.
        {
          type: 'fill',
          prompt: 'Một chai nước ngọt 750 ml, đổ 2 chai như thế vào một cốc nước lớn.',
          items: [
            { t: 'Cốc nước đó chứa … ml nước ngọt.', ans: 1500 },
            { t: 'Nếu đổ 4 chai vào cốc thì cốc chứa … ml, tức là … l nước ngọt.', ans: [3000, 3] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Hộp cà phê cân nặng 132 g, riêng vỏ hộp cân nặng 12 g. Biết mỗi gói cà phê nhỏ ở trong hộp nặng 8 g. Hỏi hộp cà phê đó có bao nhiêu gói?',
          items: [
            { t: 'Các gói cà phê cân nặng là: … g', ans: 120 },
            { t: 'Hộp cà phê đó có số gói là: … gói', ans: 15 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Bác Hà mua 70 l xăng, bác đổ đầy vào các can 9 l. Vậy Bác Hà cần ít nhất bao nhiêu can như thế để chứa hết 70 l xăng đó?',
          items: [
            { t: '70 : 9 = … (dư …)', ans: [7, 7] },
            { t: 'Bác Hà cần ít nhất … can.', ans: 8 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Có 50 l dầu, bán đi 10 l. Số lít dầu còn lại đong đều vào 8 can. Vậy mỗi can có bao nhiêu lít dầu?',
          items: [
            { t: 'Số lít dầu còn lại là: … l', ans: 40 },
            { t: 'Mỗi can có số lít dầu là: … l', ans: 5 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Mỗi gói kẹo cân nặng 90 g, mỗi hộp bánh cân nặng 385 g. Hỏi 1 hộp bánh và 3 gói kẹo cân nặng bao nhiêu gam?',
          items: [
            { t: '3 gói kẹo cân nặng là: … g', ans: 270 },
            { t: '1 hộp bánh và 3 gói kẹo cân nặng là: … g', ans: 655 },
          ],
        },
      ],
    },
  ],
};
