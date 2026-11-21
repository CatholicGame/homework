/** Phiếu ôn tập cuối Tuần 18. Nguồn: docs/lop_3/De_thi/Toan3-KN-Tuan11-18.pdf trang 35–39. */

// Bài 2: hình chữ nhật, từ trung điểm cạnh trên kẻ xuống hai góc dưới và trung điểm cạnh dưới.
// Góc vuông: 4 góc hình chữ nhật + 2 ở đỉnh trên + 2 ở chân đoạn thẳng đứng = 8.
// Góc không vuông: mỗi góc dưới 2, đỉnh trên 7 (5 tia, bỏ góc bẹt và 2 góc vuông) = 11.
const RECT = `<svg viewBox="0 0 260 180" width="220" xmlns="http://www.w3.org/2000/svg">
  <g stroke="#1f2937" stroke-width="2" fill="none">
    <rect x="10" y="10" width="240" height="160"/>
    <path d="M130 10 L10 170 M130 10 L250 170 M130 10 L130 170"/>
  </g></svg>`;

// Bài 4: lâu đài, 3 hình trụ (hai tháp bên, tháp giữa), 10 hình tam giác (3 mái, 5 răng cưa, 2 cửa sổ).
const tri = (x1, y1, x2, y2, x3, y3, fill = '#2563eb') => `<path d="M${x1} ${y1} L${x2} ${y2} L${x3} ${y3} Z" fill="${fill}" stroke="#1e3a8a" stroke-width="1.5"/>`;
const tower = (x, y, w, h) => `<path d="M${x} ${y} L${x} ${y + h} A${w / 2} 6 0 0 0 ${x + w} ${y + h} L${x + w} ${y}" fill="#dbeafe" stroke="#1e3a8a" stroke-width="1.5"/>`;
const CASTLE = `<svg viewBox="0 0 260 220" width="230" xmlns="http://www.w3.org/2000/svg">
  <rect x="62" y="110" width="136" height="96" fill="#bfdbfe" stroke="#1e3a8a" stroke-width="1.5"/>
  <path d="M112 206 V170 A18 18 0 0 1 148 170 V206 Z" fill="#60a5fa" stroke="#1e3a8a" stroke-width="1.5"/>
  ${tower(98, 60, 64, 50)}
  ${tower(22, 112, 40, 94)}
  ${tower(198, 112, 40, 94)}
  ${tri(88, 60, 130, 14, 172, 60)}
  ${tri(10, 112, 42, 70, 74, 112)}
  ${tri(186, 112, 218, 70, 250, 112)}
  ${[0, 1, 2, 3, 4].map(i => tri(80 + i * 20, 110, 90 + i * 20, 94, 100 + i * 20, 110, '#3b82f6')).join('')}
  ${tri(34, 140, 42, 128, 50, 140, '#3b82f6')}
  ${tri(210, 140, 218, 128, 226, 140, '#3b82f6')}
</svg>`;

// Bài 2 tự luận: hình tròn tâm I, đường kính KD, dây cung GC (không qua tâm).
const pt = (deg, r = 80) => [110 + r * Math.cos(deg * Math.PI / 180), 110 - r * Math.sin(deg * Math.PI / 180)].map(v => +v.toFixed(1));
const PTS = { A: [90, 0, -8], B: [45, 8, -4], C: [10, 12, 4], E: [180, -14, 5], G: [215, -14, 10], H: [265, -2, 16], K: [135, -12, -4], D: [315, 8, 12] };
const CIRCLE = `<svg viewBox="0 0 220 220" width="210" xmlns="http://www.w3.org/2000/svg">
  <circle cx="110" cy="110" r="80" fill="#fef3c7" stroke="#1f2937" stroke-width="2"/>
  <g stroke="#1f2937" stroke-width="2"><line x1="${pt(135)[0]}" y1="${pt(135)[1]}" x2="${pt(315)[0]}" y2="${pt(315)[1]}"/><line x1="${pt(215)[0]}" y1="${pt(215)[1]}" x2="${pt(10)[0]}" y2="${pt(10)[1]}"/></g>
  <circle cx="110" cy="110" r="3" fill="#1f2937"/><text x="114" y="104" font-size="14" fill="#1f2937">I</text>
  ${Object.entries(PTS).map(([n, [d, dx, dy]]) => { const [x, y] = pt(d); return `<circle cx="${x}" cy="${y}" r="3" fill="#1f2937"/><text x="${x + dx}" y="${y + dy}" font-size="14" text-anchor="middle" fill="#1f2937">${n}</text>`; }).join('')}
</svg>`;

// Bài 7: đường gấp khúc MNPQ, 3 m, 5 m, 4 m.
const WORM = `<svg viewBox="0 0 320 120" width="300" xmlns="http://www.w3.org/2000/svg">
  <path d="M30 50 L110 95 L200 20 L290 55" stroke="#1f2937" stroke-width="2" fill="none"/>
  <g fill="#1f2937"><circle cx="30" cy="50" r="4"/><circle cx="110" cy="95" r="4"/><circle cx="200" cy="20" r="4"/><circle cx="290" cy="55" r="4"/></g>
  <path d="M8 40 q6 -14 14 -4 q6 8 0 14" stroke="#e11d48" stroke-width="6" fill="none" stroke-linecap="round"/>
  <ellipse cx="300" cy="72" rx="20" ry="8" fill="#92400e"/>
  <g font-size="14" fill="#1f2937"><text x="30" y="40" text-anchor="middle">M</text><text x="110" y="114" text-anchor="middle">N</text><text x="200" y="12" text-anchor="middle">P</text><text x="282" y="45" text-anchor="middle">Q</text>
  <text x="62" y="88">3 m</text><text x="160" y="72">5 m</text><text x="240" y="28">4 m</text></g>
</svg>`;

export default {
  id: 'tuan-18',
  title: 'Đề kiểm tra Tuần 18',
  short: 'Tuần 18',
  desc: 'Biểu thức số, góc vuông, hình tròn, đường gấp khúc, bảng nhân, bảng chia',
  review: 'tính giá trị biểu thức, hình học và đo lường',
  time: 45,
  numbering: 'part',
  parts: [
    {
      title: 'Phần 1. Trắc nghiệm',
      label: 'Bài',
      questions: [
        { type: 'mc', prompt: 'Lượng mực trong lọ mực của em có khoảng:', options: ['5 ml', '50 ml', '400 ml', '4 l'], ans: 1 },
        {
          type: 'mc',
          prompt: 'Hình bên có:',
          fig: RECT,
          items: [
            { prompt: 'a) Bao nhiêu góc vuông?', options: ['5 góc', '6 góc', '7 góc', '8 góc'], ans: 3 },
            { prompt: 'b) Bao nhiêu góc không vuông?', options: ['10 góc', '11 góc', '12 góc', '13 góc'], ans: 1 },
          ],
        },
        { type: 'mc', prompt: 'Phép tính 87 : 5 có số dư là:', options: ['1', '2', '3', '4'], ans: 1 },
        {
          type: 'mc',
          prompt: 'Hình bên có mấy hình trụ? Mấy hình tam giác?',
          fig: CASTLE,
          options: ['3 hình trụ, 3 hình tam giác', '4 hình trụ, 5 hình tam giác', '3 hình trụ, 10 hình tam giác', '4 hình trụ, 10 hình tam giác'],
          cols: 2,
          ans: 2,
        },
        // Đề in "140 + 42 × 3" bị xuống dòng thừa chữ số 4; giá trị 266 khớp với 140 + 42 × 3.
        {
          type: 'match',
          prompt: 'Nối biểu thức với giá trị của biểu thức đó:',
          heads: ['Biểu thức', 'Giá trị'],
          left: ['12 + 73 × 4', '140 + 42 × 3', '45 × (40 − 33)', '306 : 6 × 8', '(54 + 27) × 8'],
          right: ['315', '266', '304', '408', '648'],
          ans: [2, 1, 0, 3, 4],
        },
      ],
    },
    {
      title: 'Phần 2. Tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['216 + 764', '834 − 115', '118 × 7', '579 : 7'] },
        // sửa: bỏ chấm thừa không tên trong hình (tâm I là trung điểm của KD).
        {
          type: 'fill',
          prompt: 'Kể tên các đường kính, bán kính của hình tròn dưới đây:',
          fig: CIRCLE,
          items: [
            { t: 'Đường kính: …', ans: 'KD', choices: ['KD', 'GC', 'IK', 'ID', 'IC'] },
            { t: 'Bán kính: …, …', ans: ['IK', 'ID'], anyOrder: true, choices: ['KD', 'GC', 'IK', 'ID', 'IC'] },
          ],
        },
        {
          type: 'compare',
          prompt: 'Điền dấu >, <, = thích hợp vào ô trống:',
          items: [
            '615 + 121 − 247 □ 528',
            '573 + 105 : 5 □ 630',
            { t: '30 cm + 50 cm + 20 cm □ 100 cm', ans: '=' },
            { t: '100 mm □ 80 mm + 20 mm', ans: '=' },
          ],
        },
        // sửa: bản gốc các ô biểu thức bị lặp chữ "520 + 132 + 48", giữ bốn giá trị 700, 600, 90, 48, đặt lại biểu thức.
        {
          type: 'match',
          prompt: 'Nối biểu thức với giá trị của biểu thức đó:',
          heads: ['Biểu thức', 'Giá trị'],
          left: ['520 + 132 + 48', '120 × 5', '450 : 5', '6 × 8', '350 × 2', '800 − 250 + 50', '18 × 5', '96 : 2'],
          right: ['700', '600', '90', '48'],
          ans: [0, 1, 2, 3, 0, 1, 2, 3],
          multi: true,
        },
        {
          type: 'calc',
          prompt: 'Tính giá trị của biểu thức:',
          items: ['(318 + 27) × 2', '(135 + 48) : 3', '(105 − 28) × 4', '(230 − 75) : 5', '72 : 2 : 3', '96 : 6 × 2', '72 : (2 × 3)', '96 : (6 : 2)', '46 × 5 : 2', '266 : 7 × 9'],
        },
        // sửa: đề in nhãn ý lặp (a, b, a, b, c, d), đánh lại a đến g.
        {
          type: 'fill',
          prompt: 'Viết biểu thức rồi tính giá trị của biểu thức đó:',
          items: [
            { t: 'a) 65 cộng với tích của 9 và 4: … … … … … = …', ans: [65, '+', 9, '×', 4, 101], choices: ['+', '−', '×', ':'] },
            { t: 'b) 18 nhân với tổng của 3 và 5: … … (… … …) = …', ans: [18, '×', 3, '+', 5, 144], choices: ['+', '−', '×', ':'] },
            { t: 'c) Hiệu của 92 và 54 rồi cộng với 28: … … … … … = …', ans: [92, '−', 54, '+', 28, 66], choices: ['+', '−', '×', ':'] },
            { t: 'd) Tổng của 222 và tích của 20 và 4: … … … … … = …', ans: [222, '+', 20, '×', 4, 302], choices: ['+', '−', '×', ':'] },
            { t: 'e) Hiệu của 435 và tích của 15 và 6: … … … … … = …', ans: [435, '−', 15, '×', 6, 345], choices: ['+', '−', '×', ':'] },
            { t: 'g) Hiệu của 435 và tổng của 100 và 6: … … (… … …) = …', ans: [435, '−', 100, '+', 6, 329], choices: ['+', '−', '×', ':'] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Chú giun muốn bò về tổ phải bò theo đường gấp khúc dưới đây. Chú giun phải bò quãng đường là bao nhiêu mét?',
          fig: WORM,
          items: [{ t: 'Chú giun phải bò quãng đường dài là: … + … + … = … (m)', ans: [3, 5, 4, 12] }],
        },
        {
          type: 'fill',
          prompt: 'Bác An có một đàn gà. Sau khi bác bán đi 17 con gà thì số gà còn lại được nhốt vào 5 chuồng, mỗi chuồng có 9 con gà. Hỏi lúc đầu bác An có bao nhiêu con gà?',
          items: [
            { t: 'Số gà còn lại là: … × … = … (con)', ans: [9, 5, 45] },
            { t: 'Lúc đầu bác An có số con gà là: … + … = … (con)', ans: [45, 17, 62] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Mỗi gói kẹo nặng 100 g, mỗi gói bánh nặng 350 g. Hỏi 3 gói kẹo và 2 gói bánh nặng bao nhiêu ki-lô-gam?',
          items: [
            { t: '3 gói kẹo nặng là: … × … = … (g)', ans: [100, 3, 300] },
            { t: '2 gói bánh nặng là: … × … = … (g)', ans: [350, 2, 700] },
            { t: '3 gói kẹo và 2 gói bánh nặng là: … + … = … (g)', ans: [300, 700, 1000] },
            { t: 'Đổi: 1000 g = … kg', ans: 1 },
          ],
        },
        {
          type: 'mc',
          prompt: 'Hãy đặt dấu ngoặc đơn thích hợp để được biểu thức đúng: 3 × 26 + 48 : 6 + 2 = 84',
          options: ['3 × (26 + 48) : 6 + 2 = 84', '3 × 26 + (48 : 6 + 2) = 84', '3 × 26 + 48 : (6 + 2) = 84', '(3 × 26 + 48) : 6 + 2 = 84'],
          cols: 1,
          ans: 2,
        },
      ],
    },
  ],
};
