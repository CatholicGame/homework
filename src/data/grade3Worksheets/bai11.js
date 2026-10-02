/**
 * Phiếu bài tập Bài 11: Bảng nhân 8, bảng chia 8.
 * Nguồn: docs/lop_3/De_thi/Bài 11_ Bảng nhân 8, bảng chia 8 - Toán LỚP 3 (Có File Tải Về).pdf
 */

// 8 nhóm, mỗi nhóm 4 hình tròn.
const GROUPS = `<svg viewBox="0 0 420 118" width="420" xmlns="http://www.w3.org/2000/svg">
  ${Array.from({ length: 8 }, (_, g) => {
    const x = 6 + (g % 4) * 104, y = 4 + Math.floor(g / 4) * 58;
    return `<rect x="${x}" y="${y}" width="96" height="52" rx="12" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="5 4"/>
      ${[0, 1, 2, 3].map(i => `<circle cx="${x + 15 + i * 22}" cy="${y + 26}" r="9" fill="#fde68a" stroke="#1f2937" stroke-width="2"/>`).join('')}`;
  }).join('')}
</svg>`;

const word = (o) => ({ type: 'word', ...o });

export default {
  id: 'bai-11',
  title: 'Bài 11: Bảng nhân 8, bảng chia 8',
  short: 'Bài 11',
  desc: 'Bảng nhân 8, bảng chia 8',
  numbering: 'continuous',
  parts: [
    {
      title: '1. Nhận biết bảng nhân 8',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Viết kết quả của các phép nhân sau:', items: ['8 × 2', '8 × 3', '8 × 5', '8 × 10'] },
        { type: 'calc', prompt: 'Điền số thích hợp vào chỗ trống:', items: ['8 × 4', '8 × 6', '8 × 7', '8 × 9'] },
      ],
    },
    {
      title: '2. Nhận biết bảng chia 8',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Tính nhanh:', items: ['16 ÷ 8', '40 ÷ 8', '56 ÷ 8', '72 ÷ 8'] },
        { type: 'calc', prompt: 'Điền số thích hợp vào chỗ trống:', items: ['64 ÷ 8', '24 ÷ 8', '32 ÷ 8', '80 ÷ 8'] },
      ],
    },
    {
      title: '3. Nối phép tính với kết quả đúng',
      label: '',
      questions: [
        {
          type: 'match',
          prompt: 'Nối mỗi phép tính ở cột A với kết quả ở cột B:',
          heads: ['Cột A', 'Cột B'],
          left: ['8 × 5', '8 × 8', '8 × 1', '8 × 7'],
          right: ['8', '56', '40', '64'],
          ans: [2, 3, 0, 1],
        },
      ],
    },
    {
      title: '4. Toán có lời văn',
      label: '',
      questions: [
        word({
          text: 'Một thùng có 8 chai nước. Hỏi 6 thùng như thế có tất cả bao nhiêu chai nước?',
          given: ['Mỗi thùng có 8 chai nước.', 'Có 6 thùng như thế.'],
          ask: '6 thùng có tất cả bao nhiêu chai nước?',
          hint: '6 thùng, thùng nào cũng có 8 chai: lấy 8 lặp lại 6 lần, đó là phép nhân.',
          sentence: ['6 thùng', 'có tất cả', 'số chai nước', 'là:'],
          decoys: ['mỗi thùng'],
          expr: { a: 8, op: '×', b: 6, result: 48, unit: 'chai nước' },
          units: ['chai nước', 'thùng', 'lít'],
        }),
        word({
          text: 'Có 64 cái kẹo được chia đều vào 8 túi. Hỏi mỗi túi có bao nhiêu cái kẹo?',
          given: ['Có 64 cái kẹo.', 'Chia đều vào 8 túi.'],
          ask: 'Mỗi túi có bao nhiêu cái kẹo?',
          hint: 'Chia đều vào các túi, túi nào cũng bằng nhau: đó là phép chia.',
          sentence: ['Mỗi túi', 'có số', 'cái kẹo', 'là:'],
          decoys: ['tất cả'],
          expr: { a: 64, op: ':', b: 8, result: 8, unit: 'cái kẹo' },
          units: ['cái kẹo', 'túi', 'gói'],
        }),
      ],
    },
    {
      title: '5. Tìm số thích hợp',
      label: '',
      questions: [
        {
          type: 'table',
          prompt: 'Điền số thích hợp vào ô trống:',
          head: ['Số chia', 'Số bị chia', 'Thương'],
          rows: [[8, 56, '…'], [8, '…', 10], ['…', 32, 4], [8, 72, '…']],
          ans: [[7], [80], [8], [9]],
        },
      ],
    },
    {
      title: '6. Tìm x',
      label: '',
      questions: [{ type: 'findx', prompt: 'Tìm x:', items: ['8 × x = 48', 'x ÷ 8 = 5'] }],
    },
    {
      title: '7. Số liền trước, liền sau trong bảng nhân 8',
      label: '',
      questions: [
        {
          type: 'fill',
          prompt: 'Viết số liền trước và số liền sau của các số sau trong bảng nhân 8:',
          items: [
            { t: 'Số 24: …, 24, …', ans: [16, 32] },
            { t: 'Số 56: …, 56, …', ans: [48, 64] },
          ],
        },
      ],
    },
    {
      title: '8. Tô màu nhóm hình theo phép nhân 8',
      label: '',
      questions: [
        // sửa: đề yêu cầu tô màu các nhóm hình để thể hiện 8 × 4 (tô hết cả 32 hình, không chấm được); đổi thành đếm theo nhóm và viết kết quả.
        {
          type: 'fill',
          prompt: 'Có 8 nhóm, mỗi nhóm có 4 hình tròn. Viết phép tính thể hiện số hình tròn:',
          fig: GROUPS,
          items: [{ t: '8 × 4 = … hình tròn', ans: 32 }],
        },
      ],
    },
    {
      title: '9. Vận dụng cao',
      label: '',
      questions: [
        word({
          text: 'Một cửa hàng bán 8 chiếc bánh mỗi ngày. Hỏi sau 9 ngày, cửa hàng bán được bao nhiêu chiếc bánh?',
          given: ['Mỗi ngày bán 8 chiếc bánh.', 'Bán trong 9 ngày.'],
          ask: 'Sau 9 ngày bán được bao nhiêu chiếc bánh?',
          hint: '9 ngày, ngày nào cũng bán 8 chiếc: lấy 8 lặp lại 9 lần, đó là phép nhân.',
          sentence: ['Sau 9 ngày', 'cửa hàng bán được', 'số chiếc bánh', 'là:'],
          decoys: ['mỗi ngày'],
          expr: { a: 8, op: '×', b: 9, result: 72, unit: 'chiếc bánh' },
          units: ['chiếc bánh', 'ngày', 'cửa hàng'],
        }),
        {
          type: 'fill',
          prompt: 'Một đội chia đều 64 quả bóng cho 8 bạn. Hỏi mỗi bạn nhận được mấy quả bóng? Nếu mỗi bạn nhận thêm 2 quả bóng nữa thì tổng số bóng là bao nhiêu?',
          items: [
            { t: 'Mỗi bạn nhận được … quả bóng.', ans: 8 },
            { t: 'Nếu mỗi bạn nhận thêm 2 quả bóng thì tổng số bóng là … quả.', ans: 80 },
          ],
        },
      ],
    },
    {
      title: '10. Bài toán mở rộng',
      label: '',
      questions: [{ type: 'fill', prompt: 'Điền số thích hợp vào chỗ trống để hoàn thành phép tính đúng:', items: ['8 × … = 72', '… ÷ 8 = 7'] }],
    },
  ],
};
