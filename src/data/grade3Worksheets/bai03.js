/**
 * Phiếu bài tập Bài 3: Tìm thành phần chưa biết của phép tính.
 * Nguồn: docs/lop_3/De_thi/Bài 3_ Tìm thành phần chưa biết của phép tính - Toán LỚP 3 (Có File Tải Về).pdf
 * Phần "Ký ức vàng" (lý thuyết) của đề ghi thành lời nhắc ở Bài 1.
 */
export default {
  id: 'bai-3',
  title: 'Bài 3: Tìm thành phần chưa biết của phép tính',
  short: 'Bài 3',
  desc: 'Tìm số hạng, số bị trừ, số trừ',
  numbering: 'continuous',
  parts: [
    {
      title: 'Thử thách cho em (Bài tập thực hành)',
      label: 'Bài',
      questions: [
        {
          type: 'findx',
          prompt: 'Tìm x (cơ bản):<br><small>Nhớ: Số hạng = Tổng − Số hạng đã biết. Số bị trừ = Hiệu + Số trừ. Số trừ = Số bị trừ − Hiệu.</small>',
          items: ['x + 245 = 600', 'x − 128 = 472', '380 + x = 1000', '750 − x = 215'],
        },
        {
          type: 'chain',
          prompt: 'Sơ đồ tư duy liên hoàn:',
          items: [
            { start: 150, steps: ['+ 240', '− 90'] },
            { start: 900, steps: ['− 250', '+ 125'] },
          ],
        },
        // sửa: cột kết quả in 610, 468, 565 nhưng x − 150 = 500 thì x = 650, 760 − x = 215 thì x = 545. Sửa hai số cho khớp.
        {
          type: 'match',
          prompt: 'Ghép đôi đúng. Nối mỗi biểu thức ở cột trái với kết quả đúng ở cột phải:',
          heads: ['Biểu thức', 'Kết quả'],
          left: ['x + 321 = 789', 'x − 150 = 500', '760 − x = 215'],
          right: ['650', '468', '545'],
          ans: [1, 0, 2],
        },
        {
          type: 'word',
          text: 'Một cửa hàng có số kẹo là số lớn nhất có ba chữ số. Sau khi bán đi 456 chiếc kẹo, cửa hàng còn lại x chiếc kẹo. Hỏi x là bao nhiêu?',
          given: ['Số kẹo là số lớn nhất có ba chữ số, tức là 999 chiếc.', 'Bán đi 456 chiếc kẹo.'],
          ask: 'Cửa hàng còn lại bao nhiêu chiếc kẹo?',
          hint: 'Bán đi thì số kẹo bớt đi: lấy số kẹo lúc đầu trừ số kẹo đã bán.',
          sentence: ['Cửa hàng', 'còn lại', 'số chiếc kẹo', 'là:'],
          decoys: ['tất cả'],
          expr: { a: 999, op: '−', b: 456, result: 543, unit: 'chiếc kẹo' },
          units: ['chiếc kẹo', 'cửa hàng', 'gói'],
        },
      ],
    },
  ],
};
