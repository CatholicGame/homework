/**
 * Phiếu bài tập Bài 9: Bảng nhân 6, bảng chia 6.
 * Nguồn: docs/lop_3/De_thi/Bài 9_ Bảng nhân 6, bảng chia 6 - Toán LỚP 3 (Có File Tải Về).pdf
 * Đề đánh số mỗi phép tính là một câu (1–30).
 */
const one = (type, t) => ({ type, items: [t] });

export default {
  id: 'bai-9',
  title: 'Bài 9: Bảng nhân 6, bảng chia 6',
  short: 'Bài 9',
  desc: 'Bảng nhân 6, bảng chia 6',
  numbering: 'continuous',
  parts: [
    {
      title: 'Phần 1. Tính nhẩm',
      label: '',
      questions: ['6 × 3', '6 × 8', '6 × 5', '6 × 7', '6 × 2', '36 : 6', '54 : 6', '18 : 6', '42 : 6', '24 : 6'].map(t => one('calc', t)),
    },
    {
      title: 'Phần 2. Điền số thích hợp vào chỗ chấm',
      label: '',
      questions: ['6 × … = 48', '… × 6 = 12', '6 × … = 60', '… × 6 = 36', '30 : 6 = …', '6 × … = 24', '6 × … = 54', '12 : 6 = …', '6 × … = 6', '6 × … = 42'].map(t => one('fill', t)),
    },
    {
      title: 'Phần 3. Tìm x',
      label: '',
      questions: ['x × 6 = 36', '6 × x = 18', 'x : 6 = 7', '6 × x = 30', 'x : 6 = 9'].map(t => one('findx', t)),
    },
    {
      title: 'Phần 4. Toán có lời văn',
      label: '',
      questions: [
        {
          type: 'word',
          text: 'Một thùng đựng 6 chai nước. Hỏi 9 thùng như thế đựng được bao nhiêu chai nước?',
          given: ['Mỗi thùng đựng 6 chai nước.', 'Có 9 thùng như thế.'],
          ask: '9 thùng đựng được bao nhiêu chai nước?',
          hint: '9 thùng, thùng nào cũng có 6 chai: lấy 6 lặp lại 9 lần, đó là phép nhân.',
          sentence: ['9 thùng', 'đựng được', 'số chai nước', 'là:'],
          decoys: ['mỗi thùng'],
          expr: { a: 6, op: '×', b: 9, result: 54, unit: 'chai nước' },
          units: ['chai nước', 'thùng', 'lít'],
        },
        {
          type: 'word',
          text: 'Một tấm bìa có 48 hình vuông, chia đều thành 6 hàng. Hỏi mỗi hàng có bao nhiêu hình vuông?',
          given: ['Tấm bìa có 48 hình vuông.', 'Chia đều thành 6 hàng.'],
          ask: 'Mỗi hàng có bao nhiêu hình vuông?',
          hint: 'Chia đều thành các hàng bằng nhau: đó là phép chia.',
          sentence: ['Mỗi hàng', 'có số', 'hình vuông', 'là:'],
          decoys: ['tất cả'],
          expr: { a: 48, op: ':', b: 6, result: 8, unit: 'hình vuông' },
          units: ['hình vuông', 'hàng', 'tấm bìa'],
        },
        // sửa: đề in "Một bạn có 6 quyển vở, mỗi quyển giá 7 nghìn đồng… mua hết bao nhiêu tiền", ghi "mua 6 quyển vở" cho khớp câu hỏi.
        {
          type: 'word',
          text: 'Một bạn mua 6 quyển vở, mỗi quyển giá 7 nghìn đồng. Hỏi bạn đó mua hết bao nhiêu tiền?',
          given: ['Mua 6 quyển vở.', 'Mỗi quyển giá 7 nghìn đồng.'],
          ask: 'Bạn đó mua hết bao nhiêu tiền?',
          hint: '6 quyển, quyển nào cũng 7 nghìn đồng: lấy 7 lặp lại 6 lần, đó là phép nhân.',
          sentence: ['Bạn đó', 'mua hết', 'số tiền', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 7, op: '×', b: 6, result: 42, unit: 'nghìn đồng' },
          units: ['nghìn đồng', 'quyển vở', 'quyển'],
        },
        {
          type: 'word',
          text: 'Một cửa hàng bán được 36 chiếc bánh, chia đều vào 6 hộp. Hỏi mỗi hộp có bao nhiêu chiếc bánh?',
          given: ['Có 36 chiếc bánh.', 'Chia đều vào 6 hộp.'],
          ask: 'Mỗi hộp có bao nhiêu chiếc bánh?',
          hint: 'Chia đều vào các hộp, hộp nào cũng bằng nhau: đó là phép chia.',
          sentence: ['Mỗi hộp', 'có số', 'chiếc bánh', 'là:'],
          decoys: ['tất cả'],
          expr: { a: 36, op: ':', b: 6, result: 6, unit: 'chiếc bánh' },
          units: ['chiếc bánh', 'hộp', 'cửa hàng'],
        },
        {
          type: 'word',
          text: 'Một lớp học có 6 dãy bàn, mỗi dãy có 5 bạn. Hỏi cả lớp có bao nhiêu bạn?',
          given: ['Có 6 dãy bàn.', 'Mỗi dãy có 5 bạn.'],
          ask: 'Cả lớp có bao nhiêu bạn?',
          hint: '6 dãy, dãy nào cũng có 5 bạn: lấy 5 lặp lại 6 lần, đó là phép nhân.',
          sentence: ['Cả lớp', 'có số', 'bạn', 'là:'],
          decoys: ['mỗi dãy'],
          expr: { a: 5, op: '×', b: 6, result: 30, unit: 'bạn' },
          units: ['bạn', 'dãy bàn', 'lớp'],
        },
      ],
    },
  ],
};
