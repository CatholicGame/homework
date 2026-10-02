/**
 * Phiếu bài tập Bài 14: Một phần mấy.
 * Nguồn: docs/lop_3/De_thi/Bài 14_ Một phần mấy - Toán LỚP 3 (Có File Tải Về).pdf
 * Bản PDF thiếu hình ở các câu 1.1, 2.1 và bảng nối mục 3 để trống: tự vẽ hình theo đúng lời đề.
 * Số câu bắt đầu lại ở mỗi mục như đề (1., 2.).
 */

const INK = 'stroke="#1f2937" stroke-width="2.5" stroke-linejoin="round"';
const ON = '#93c5fd';

/** Hình tròn chia n phần bằng nhau, tô các phần trong `shaded`. */
function circle(n, shaded = [], size = 90) {
  const c = 50, r = 44;
  const pt = (k) => { const a = (2 * Math.PI * k) / n - Math.PI / 2; return `${(c + r * Math.cos(a)).toFixed(2)} ${(c + r * Math.sin(a)).toFixed(2)}`; };
  const parts = Array.from({ length: n }, (_, i) => `<path d="M${c} ${c} L${pt(i)} A${r} ${r} 0 0 1 ${pt(i + 1)} Z" fill="${shaded.includes(i) ? ON : '#fff'}" ${INK}/>`).join('');
  return `<svg viewBox="0 0 100 100" width="${size}" xmlns="http://www.w3.org/2000/svg">${parts}</svg>`;
}
/** Hình chữ nhật chia theo các cột có độ rộng `widths` (tổng 100), tô các cột trong `shaded`. */
function strips(widths, shaded = [], h = 50, size = 120) {
  let x = 2;
  const parts = widths.map((w, i) => { const s = `<rect x="${x}" y="2" width="${w}" height="${h}" fill="${shaded.includes(i) ? ON : '#fff'}" ${INK}/>`; x += w; return s; }).join('');
  return `<svg viewBox="0 0 104 ${h + 4}" width="${size}" xmlns="http://www.w3.org/2000/svg">${parts}</svg>`;
}
/** Hình vuông chia bởi hai đường chéo thành 4 phần, tô các phần trong `shaded`. */
function squareX(shaded = [], size = 90) {
  const P = [['4 4', '96 4'], ['96 4', '96 96'], ['96 96', '4 96'], ['4 96', '4 4']];
  return `<svg viewBox="0 0 100 100" width="${size}" xmlns="http://www.w3.org/2000/svg">${P.map(([a, b], i) => `<path d="M50 50 L${a} L${b} Z" fill="${shaded.includes(i) ? ON : '#fff'}" ${INK}/>`).join('')}</svg>`;
}
const grid2 = `<svg viewBox="0 0 100 100" width="90" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="92" height="92" fill="#fff" ${INK}/><path d="M50 4 V96 M4 50 H96" ${INK} fill="none"/></svg>`;
const uneven = `<svg viewBox="0 0 100 100" width="90" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="92" height="92" fill="#fff" ${INK}/><path d="M38 4 V96 M38 34 H96 M70 34 V96" ${INK} fill="none"/></svg>`;

const label = (t) => `<text font-size="15" font-weight="700" fill="#1f2937" text-anchor="middle">${t}</text>`;
// Ba hình a, b, c cho câu 2.1: tô {1/3} hình tròn, {1/4} hình chữ nhật, {1/5} hình chữ nhật.
const FIG_SHADED = `<svg viewBox="0 0 400 120" width="400" xmlns="http://www.w3.org/2000/svg" font-family="Quicksand, sans-serif">
  <g transform="translate(20 0)">${circle(3, [0], 90).replace('<svg', '<svg x="0" y="0" height="90"')}</g>
  <g transform="translate(140 18)">${strips([25, 25, 25, 25], [0], 50, 110).replace('<svg', '<svg x="0" y="0" height="54"')}</g>
  <g transform="translate(275 18)">${strips([20, 20, 20, 20, 20], [0], 50, 110).replace('<svg', '<svg x="0" y="0" height="54"')}</g>
  <g transform="translate(65 112)">${label('a')}</g><g transform="translate(195 112)">${label('b')}</g><g transform="translate(330 112)">${label('c')}</g>
</svg>`;

const FR = ['{1/2}', '{1/3}', '{1/4}', '{1/5}'];

export default {
  id: 'bai-14',
  title: 'Bài 14: Một phần mấy',
  short: 'Bài 14',
  desc: 'Một phần hai, một phần ba, một phần tư, một phần năm…',
  numbering: 'part',
  parts: [
    {
      title: '1. Nhận biết phần bằng nhau',
      label: '',
      questions: [
        {
          type: 'mc',
          prompt: 'Trong các hình dưới đây, hình nào đã được chia thành 4 phần bằng nhau? Khoanh vào chữ cái đúng.',
          options: [grid2, strips([15, 35, 20, 30], [], 50, 120), circle(3), uneven],
          ans: 0,
        },
        {
          type: 'fill',
          prompt: 'Hình vuông được chia thành 2 phần bằng nhau. Mỗi phần là một phần mấy của hình vuông?',
          items: [{ t: 'Trả lời: …', ans: '{1/2}', choices: FR }],
        },
      ],
    },
    {
      title: '2. Đọc và viết phân số',
      label: '',
      questions: [
        {
          type: 'fill',
          prompt: 'Viết phân số chỉ phần đã tô màu trong mỗi hình sau:',
          fig: FIG_SHADED,
          items: [
            { t: 'Hình a: …', ans: '{1/3}', choices: FR },
            { t: 'Hình b: …', ans: '{1/4}', choices: FR },
            { t: 'Hình c: …', ans: '{1/5}', choices: FR },
          ],
        },
        {
          type: 'fill',
          prompt: 'Viết các phân số sau dưới dạng chữ (ví dụ: {1/3} đọc là “một phần ba”):',
          items: [
            { t: '{1/2}: …', ans: 'một phần hai' },
            { t: '{1/4}: …', ans: 'một phần tư|một phần bốn' },
            { t: '{3/5}: …', ans: 'ba phần năm' },
          ],
        },
      ],
    },
    {
      title: '3. Nối hình với phân số thích hợp',
      label: '',
      questions: [
        {
          type: 'match',
          prompt: 'Nối mỗi hình với phân số chỉ phần đã tô màu:',
          heads: ['Hình vẽ', 'Phân số'],
          left: [circle(3, [0], 64), strips([50, 50], [0], 50, 96), squareX([0], 64), strips([20, 20, 20, 20, 20], [0, 1, 2], 50, 110)],
          right: ['{1/2}', '{3/5}', '{1/3}', '{1/4}'],
          ans: [2, 0, 3, 1],
        },
      ],
    },
    {
      title: '4. So sánh phân số',
      label: '',
      questions: [
        {
          type: 'compare',
          prompt: 'So sánh các phân số sau, điền dấu >, < hoặc = vào chỗ trống:',
          items: [
            { t: '{1/2} □ {1/3}', ans: '>' },
            { t: '{2/4} □ {1/2}', ans: '=' },
            { t: '{2/3} □ {3/4}', ans: '<' },
          ],
        },
      ],
    },
    {
      title: '5. Điền vào chỗ trống',
      label: '',
      questions: [
        {
          type: 'fill',
          prompt: 'Một cái bánh được chia thành 8 phần bằng nhau. 3 phần đã được ăn.',
          items: [
            { t: 'Phân số chỉ phần bánh đã ăn là …', ans: '{3/8}', choices: ['{3/8}', '{5/8}', '{3/5}', '{1/8}'] },
            { t: 'Phân số chỉ phần bánh còn lại là …', ans: '{5/8}', choices: ['{3/8}', '{5/8}', '{3/5}', '{1/8}'] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Một bức tranh được chia thành 5 phần bằng nhau. Nếu tô màu 4 phần thì đã tô màu mấy phần bức tranh?',
          items: [{ t: 'Đã tô màu … bức tranh.', ans: '{4/5}', choices: ['{1/5}', '{4/5}', '{1/4}', '{5/4}'] }],
        },
      ],
    },
    {
      title: '6. Tô màu theo phân số',
      label: '',
      questions: [
        { type: 'pick', prompt: 'Tô màu {2/3} hình tròn dưới đây.', shape: 'circle', parts: 3, ans: 2 },
        { type: 'pick', prompt: 'Tô màu {1/4} hình vuông dưới đây.', shape: 'square-x', ans: 1 },
      ],
    },
    {
      title: '7. Đếm và viết phân số',
      label: '',
      questions: [
        {
          type: 'fill',
          prompt: 'Một chùm bóng có 10 quả, trong đó 4 quả màu đỏ.',
          items: [{ t: 'Phân số chỉ số bóng đỏ là …', ans: '{4/10}', choices: ['{4/10}', '{6/10}', '{1/4}', '{4/6}'] }],
        },
        {
          type: 'fill',
          prompt: 'Một hộp bút có 12 chiếc bút, trong đó 9 chiếc bút màu xanh.',
          items: [{ t: 'Phân số chỉ số bút màu xanh là …', ans: '{9/12}', choices: ['{9/12}', '{3/12}', '{1/9}', '{3/9}'] }],
        },
      ],
    },
    {
      title: '8. Phân số trong thực tế',
      label: '',
      questions: [
        {
          type: 'fill',
          prompt: 'Lan chia đều 1 thanh sô-cô-la cho 5 bạn. Mỗi bạn nhận được mấy phần mấy thanh sô-cô-la?',
          items: [{ t: 'Trả lời: Mỗi bạn nhận được … thanh sô-cô-la.', ans: '{1/5}', choices: ['{1/2}', '{1/4}', '{1/5}', '{1/6}'] }],
        },
        {
          type: 'fill',
          prompt: 'Một bông hoa có 6 cánh, An tô màu 2 cánh.',
          items: [{ t: 'Phân số chỉ số cánh hoa được tô màu là …', ans: '{2/6}', choices: ['{2/6}', '{4/6}', '{1/2}', '{2/4}'] }],
        },
      ],
    },
    {
      title: '9. Trắc nghiệm chọn đáp án đúng',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Phân số nào lớn nhất?', options: ['{1/2}', '{1/4}', '{1/3}', '{1/5}'], ans: 0 },
        { type: 'mc', prompt: 'Phân số nào bằng {2/4}?', options: ['{1/2}', '{2/3}', '{1/3}', '{3/4}'], ans: 0 },
      ],
    },
    {
      title: '10. Vận dụng cao',
      label: '',
      questions: [
        {
          type: 'fill',
          prompt: 'Một hình chữ nhật được chia thành 8 phần bằng nhau. Bé tô màu 3 phần. Sau đó, bé tô tiếp 2 phần nữa. Hỏi bé đã tô màu bao nhiêu phần mấy hình chữ nhật?',
          items: [{ t: 'Bé đã tô màu … hình chữ nhật.', ans: '{5/8}', choices: ['{3/8}', '{5/8}', '{2/8}', '{6/8}'] }],
        },
        {
          type: 'word',
          text: 'Một lớp có 24 học sinh, trong đó {1/4} số học sinh là học sinh giỏi. Hỏi lớp đó có bao nhiêu học sinh giỏi?',
          given: ['Lớp có 24 học sinh.', '{1/4} số học sinh là học sinh giỏi.'],
          ask: 'Lớp đó có bao nhiêu học sinh giỏi?',
          hint: 'Muốn tìm {1/4} của một số thì lấy số đó chia cho 4.',
          sentence: ['Lớp đó', 'có số', 'học sinh giỏi', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 24, op: ':', b: 4, result: 6, unit: 'học sinh' },
          units: ['học sinh', 'lớp', 'phần'],
        },
      ],
    },
  ],
};
