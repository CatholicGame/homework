/**
 * Phiếu bài tập Bài 12: Bảng nhân 9, bảng chia 9.
 * Nguồn: docs/lop_3/De_thi/Bài 12_ Bảng nhân 9, Bảng chia 9 - Toán LỚP 3 (Có File Tải Về).pdf
 * Số câu bắt đầu lại ở mỗi mục như đề (1., 2.).
 */

const ST = 'stroke="#1f2937" stroke-width="2.5" fill="none"';
const lbl = (x, y, t, a = 'middle') => `<text x="${x}" y="${y}" font-size="14" font-weight="700" fill="#1f2937" text-anchor="${a}">${t}</text>`;
// Hình chữ nhật ABCD 9 cm × 4 cm, hình vuông EFGH cạnh 9 cm (cùng tỉ lệ 14 px = 1 cm).
const FIG = `<svg viewBox="0 0 330 176" width="330" xmlns="http://www.w3.org/2000/svg" font-family="Quicksand, sans-serif">
  <rect x="16" y="84" width="126" height="56" ${ST}/>
  ${lbl(8, 80, 'D')}${lbl(150, 80, 'C')}${lbl(8, 154, 'A')}${lbl(150, 154, 'B')}${lbl(79, 158, '9 cm')}${lbl(148, 116, '4 cm', 'start')}
  <rect x="186" y="14" width="126" height="126" ${ST}/>
  ${lbl(178, 10, 'H')}${lbl(320, 10, 'G')}${lbl(178, 154, 'E')}${lbl(320, 154, 'F')}${lbl(249, 158, '9 cm')}${lbl(249, 82, '9 cm')}
</svg>`;

const word = (o) => ({ type: 'word', ...o });

export default {
  id: 'bai-12',
  title: 'Bài 12: Bảng nhân 9, bảng chia 9',
  short: 'Bài 12',
  desc: 'Bảng nhân 9, bảng chia 9',
  numbering: 'part',
  parts: [
    {
      title: '1. Nhận biết bảng nhân 9',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Điền kết quả vào chỗ trống:', items: ['9 × 2', '9 × 5', '9 × 7', '9 × 10'] },
        {
          type: 'mc',
          prompt: 'Khoanh vào chữ cái trước kết quả đúng:',
          items: [
            { prompt: 'a) 9 × 3 =', options: ['18', '21', '27', '36'], ans: 2 },
            { prompt: 'b) 9 × 6 =', options: ['45', '54', '63', '36'], ans: 1 },
          ],
        },
      ],
    },
    {
      title: '2. Nhận biết bảng chia 9',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Điền vào chỗ trống:', items: ['27 ÷ 9', '81 ÷ 9', '54 ÷ 9'] },
        {
          type: 'mc',
          prompt: 'Khoanh vào chữ cái trước đáp án đúng:',
          items: [
            { prompt: 'a) 72 ÷ 9 =', options: ['9', '8', '7', '6'], ans: 1 },
            { prompt: 'b) 36 ÷ 9 =', options: ['3', '4', '5', '6'], ans: 1 },
          ],
        },
      ],
    },
    {
      title: '3. Vận dụng bảng nhân, chia 9',
      label: '',
      questions: [
        {
          type: 'table',
          prompt: 'Tìm số thích hợp điền vào ô trống:',
          head: ['Số bị chia', 'Số chia', 'Thương'],
          rows: [[63, 9, '…'], [9, 9, '…'], ['…', 9, 4], [45, '…', 5]],
          ans: [[7], [1], [36], [9]],
        },
        {
          type: 'fill',
          prompt: 'Viết phép nhân hoặc phép chia thích hợp:',
          items: [
            { t: 'Có 9 cái bánh, chia đều cho 3 bạn. Mỗi bạn được … cái bánh. Phép tính: … : … = …', ans: [3, 9, 3, 3] },
            { t: 'Một bao có 72 quả cam, chia đều vào 9 túi. Mỗi túi có … quả cam. Phép tính: … : … = …', ans: [8, 72, 9, 8] },
          ],
        },
      ],
    },
    {
      title: '4. Bài toán có lời văn',
      label: '',
      questions: [
        word({
          text: 'Mỗi hộp có 9 cái bút. Hỏi 6 hộp như thế có bao nhiêu cái bút?',
          given: ['Mỗi hộp có 9 cái bút.', 'Có 6 hộp như thế.'],
          ask: '6 hộp có bao nhiêu cái bút?',
          hint: '6 hộp, hộp nào cũng có 9 cái: lấy 9 lặp lại 6 lần, đó là phép nhân.',
          sentence: ['6 hộp', 'có số', 'cái bút', 'là:'],
          decoys: ['mỗi hộp'],
          expr: { a: 9, op: '×', b: 6, result: 54, unit: 'cái bút' },
          units: ['cái bút', 'hộp', 'quyển'],
        }),
        word({
          text: 'Một cửa hàng có 81 chiếc áo, chia đều cho 9 tủ. Hỏi mỗi tủ có bao nhiêu chiếc áo?',
          given: ['Có 81 chiếc áo.', 'Chia đều cho 9 tủ.'],
          ask: 'Mỗi tủ có bao nhiêu chiếc áo?',
          hint: 'Chia đều cho các tủ, tủ nào cũng bằng nhau: đó là phép chia.',
          sentence: ['Mỗi tủ', 'có số', 'chiếc áo', 'là:'],
          decoys: ['tất cả'],
          expr: { a: 81, op: ':', b: 9, result: 9, unit: 'chiếc áo' },
          units: ['chiếc áo', 'tủ', 'cửa hàng'],
        }),
      ],
    },
    {
      title: '5. So sánh số lớn hơn, nhỏ hơn',
      label: '',
      questions: [{ type: 'compare', prompt: 'Điền dấu >, <, = vào chỗ trống:', items: ['9 × 4 □ 36', '9 × 7 □ 70', '81 ÷ 9 □ 8'] }],
    },
    {
      title: '6. Tìm số còn thiếu trong dãy số',
      label: '',
      questions: [
        {
          type: 'fill',
          prompt: 'Điền số thích hợp vào chỗ trống:',
          items: [
            { t: '9, 18, 27, …, 45, …', ans: [36, 54] },
            { t: '81, 72, …, 54, …, 36', ans: [63, 45] },
          ],
        },
      ],
    },
    {
      title: '7. Nối phép tính với kết quả đúng',
      label: '',
      questions: [
        // sửa: phép tính thứ ba in "54 ÷ 9" (= 6, không có trong cột kết quả, số 63 thừa); đổi thành 9 × 7.
        {
          type: 'match',
          prompt: 'Nối phép tính với kết quả đúng:',
          heads: ['Phép tính', 'Kết quả'],
          left: ['9 × 8', '9 × 6', '9 × 7', '9 × 9'],
          right: ['54', '63', '72', '81'],
          ans: [2, 0, 1, 3],
        },
      ],
    },
    {
      title: '8. Bài toán hình học ứng dụng phép nhân 9',
      label: '',
      questions: [
        {
          type: 'fill',
          prompt: 'Một hình chữ nhật có chiều dài 9 cm, chiều rộng 4 cm. Tính chu vi hình chữ nhật đó.',
          fig: FIG,
          items: [{ t: 'Chu vi hình chữ nhật ABCD là: … cm', ans: 26 }],
        },
        {
          type: 'fill',
          prompt: 'Một hình vuông có cạnh 9 cm. Tính diện tích hình vuông đó.',
          items: [{ t: 'Diện tích hình vuông EFGH là: … cm²', ans: 81 }],
        },
      ],
    },
    {
      title: '9. Vận dụng cao: Bài toán thực tế',
      label: '',
      questions: [
        word({
          text: 'Một lớp học có 9 hàng ghế, mỗi hàng có 8 bạn. Hỏi lớp học đó có tất cả bao nhiêu bạn?',
          given: ['Có 9 hàng ghế.', 'Mỗi hàng có 8 bạn.'],
          ask: 'Lớp học có tất cả bao nhiêu bạn?',
          hint: '9 hàng, hàng nào cũng có 8 bạn: lấy 8 lặp lại 9 lần, đó là phép nhân.',
          sentence: ['Lớp học', 'có tất cả', 'số bạn', 'là:'],
          decoys: ['mỗi hàng'],
          expr: { a: 8, op: '×', b: 9, result: 72, unit: 'bạn' },
          units: ['bạn', 'hàng ghế', 'lớp'],
        }),
        word({
          text: 'Một bác nông dân thu hoạch được 72 quả dưa, chia đều cho 9 thùng. Hỏi mỗi thùng có bao nhiêu quả dưa?',
          given: ['Thu hoạch được 72 quả dưa.', 'Chia đều cho 9 thùng.'],
          ask: 'Mỗi thùng có bao nhiêu quả dưa?',
          hint: 'Chia đều vào các thùng, thùng nào cũng bằng nhau: đó là phép chia.',
          sentence: ['Mỗi thùng', 'có số', 'quả dưa', 'là:'],
          decoys: ['tất cả'],
          expr: { a: 72, op: ':', b: 9, result: 8, unit: 'quả dưa' },
          units: ['quả dưa', 'thùng', 'kg'],
        }),
      ],
    },
    {
      title: '10. Sáng tạo phép toán với số 9',
      label: '',
      questions: [
        // sửa: đề mở (tự viết phép tính); ghi thành phép tính có chỗ trống để chấm được.
        { type: 'fill', prompt: 'Hãy viết 2 phép nhân có kết quả là 36, trong đó có sử dụng số 9.', items: ['9 × … = 36', '… × 9 = 36'] },
        { type: 'fill', prompt: 'Hãy viết một phép chia có thương là 7, trong đó có sử dụng số 9.', items: ['… : 9 = 7'] },
      ],
    },
  ],
};
