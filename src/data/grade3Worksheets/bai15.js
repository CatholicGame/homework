/**
 * Phiếu bài tập Bài 15: Luyện tập chung.
 * Nguồn: docs/lop_3/De_thi/Bài 15_ Luyện tập chung - Toán LỚP 3 (Có File Tải Về).pdf
 * Bỏ khung "Mục tiêu ôn tập" và phần "Em tự đánh giá".
 */

const INK = 'stroke="#1f2937" stroke-width="2.5" stroke-linejoin="round"';
const ON = '#93c5fd';
const lbl = (x, y, t) => `<text x="${x}" y="${y}" font-size="15" font-weight="700" fill="#1f2937" text-anchor="middle">${t}</text>`;
const pie = (cx, cy, n) => {
  const r = 40;
  const pt = (k) => { const a = (2 * Math.PI * k) / n - Math.PI / 2; return `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`; };
  return Array.from({ length: n }, (_, i) => `<path d="M${cx} ${cy} L${pt(i)} A${r} ${r} 0 0 1 ${pt(i + 1)} Z" fill="${i === 0 ? ON : '#fff'}" ${INK}/>`).join('');
};
const bar = (x, y, n) => Array.from({ length: n }, (_, i) => `<rect x="${x + (i * 96) / n}" y="${y}" width="${96 / n}" height="48" fill="${i === 0 ? ON : '#fff'}" ${INK}/>`).join('');
// Sáu hình: chia 2, 4 phần (hình chữ nhật), 6, 3, 8, 5 phần (hình tròn), mỗi hình tô 1 phần.
const FIG = `<svg viewBox="0 0 640 128" width="640" xmlns="http://www.w3.org/2000/svg" font-family="Quicksand, sans-serif">
  ${bar(6, 30, 2)}${bar(116, 30, 4)}${pie(274, 54, 6)}${pie(380, 54, 3)}${pie(486, 54, 8)}${pie(592, 54, 5)}
  ${lbl(54, 120, 'Hình 1')}${lbl(164, 120, 'Hình 2')}${lbl(274, 120, 'Hình 3')}${lbl(380, 120, 'Hình 4')}${lbl(486, 120, 'Hình 5')}${lbl(592, 120, 'Hình 6')}
</svg>`;
const FR = ['{1/2}', '{1/3}', '{1/4}', '{1/5}', '{1/6}', '{1/8}'];

export default {
  id: 'bai-15',
  title: 'Bài 15: Luyện tập chung',
  short: 'Bài 15',
  desc: 'Bảng nhân, bảng chia 6, 7, 8, một phần mấy, toán có lời văn',
  review: 'bảng nhân, bảng chia 6, 7, 8 và một phần mấy',
  numbering: 'continuous',
  parts: [
    {
      title: 'Phiếu bài tập',
      label: 'Bài',
      questions: [
        {
          type: 'calc',
          prompt: 'Tính nhẩm:',
          items: ['6 × 4', '7 × 8', '8 × 6', '48 : 8', '56 : 7', '63 : 9', '6 × 5', '54 : 6', '7 × 3', '64 : 8', '8 × 7', '36 : 6', '7 × 5', '56 : 8', '48 : 6'],
        },
        { type: 'fill', prompt: 'Điền số thích hợp:', items: ['6 × … = 36', '… × 7 = 21', '56 : … = 7', '… : 8 = 6', '8 × … = 64', '54 : … = 9', '… × 6 = 30', '42 : … = 6', '7 × … = 28', '… : 7 = 8'] },
        { type: 'compare', prompt: 'Điền dấu >, < hoặc =', items: ['6 × 7 □ 40', '7 × 8 □ 56', '64 : 8 □ 9', '56 : 7 □ 9', '8 × 8 □ 64', '42 : 6 □ 7', '7 × 4 □ 28', '48 : 6 □ 7', '8 × 6 □ 50', '49 : 7 □ 7'] },
        { type: 'findx', prompt: 'Tìm x:', marker: '1', items: ['x × 6 = 36', 'x × 7 = 49', 'x × 8 = 56', '48 : x = 8', '56 : x = 8', '64 : x = 8', 'x × 6 = 42', '54 : x = 9'] },
        {
          type: 'fill',
          prompt: 'Một phần mấy. Mỗi hình được chia thành các phần bằng nhau, tô màu 1 phần. Phần tô màu là một phần mấy của hình?',
          fig: FIG,
          items: [
            { t: 'Hình 1 (chia 2 phần): …', ans: '{1/2}', choices: FR },
            { t: 'Hình 2 (chia 4 phần): …', ans: '{1/4}', choices: FR },
            { t: 'Hình 3 (chia 6 phần): …', ans: '{1/6}', choices: FR },
            { t: 'Hình 4 (chia 3 phần): …', ans: '{1/3}', choices: FR },
            { t: 'Hình 5 (chia 8 phần): …', ans: '{1/8}', choices: FR },
            { t: 'Hình 6 (chia 5 phần): …', ans: '{1/5}', choices: FR },
          ],
        },
        {
          type: 'fill',
          prompt: 'Viết phân số thích hợp:',
          marker: '1',
          items: [
            { t: 'Một phần hai viết là …', ans: '{1/2}', choices: FR },
            { t: 'Một phần ba viết là …', ans: '{1/3}', choices: FR },
            { t: 'Một phần tư viết là …', ans: '{1/4}', choices: FR },
            { t: 'Một phần năm viết là …', ans: '{1/5}', choices: FR },
            { t: 'Một phần sáu viết là …', ans: '{1/6}', choices: FR },
            { t: 'Một phần tám viết là …', ans: '{1/8}', choices: FR },
          ],
        },
        {
          type: 'fill',
          prompt: 'Toán có lời văn:',
          items: [
            { t: '1. Mỗi hộp có 6 chiếc bút chì. 8 hộp như vậy có tất cả … chiếc bút chì.', ans: 48 },
            { t: '2. Có 56 quyển vở được chia đều cho 7 bạn. Mỗi bạn nhận được … quyển vở.', ans: 8 },
            { t: '3. Một sợi dây dài 24 m. Cắt lấy {1/6} chiều dài sợi dây. Đoạn dây cắt ra dài … m.', ans: 4 },
            { t: '4. Có 64 quả cam được xếp đều vào 8 giỏ. Mỗi giỏ có … quả cam.', ans: 8 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Thử thách:',
          marker: '1',
          items: [
            { t: 'Tìm số thích hợp: … × 8 = 48', ans: 6 },
            { t: 'Tìm số thích hợp: 72 : … = 8', ans: 9 },
            { t: 'Có 56 viên bi. {1/8} số viên bi là … viên.', ans: 7 },
            { t: 'Có 49 học sinh xếp đều thành 7 hàng. Mỗi hàng có … học sinh.', ans: 7 },
          ],
        },
      ],
    },
  ],
};
