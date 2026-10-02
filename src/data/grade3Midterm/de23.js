/** Đề số 23. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 25. */
export default {
  id: 'de-23',
  title: 'Đề số 23',
  short: 'Đề 23',
  desc: 'Đọc viết số, tìm x, một phần mấy, đổi đơn vị đo, giảm đi nhiều lần',
  review: 'tìm x, một phần mấy và giảm một số đi nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Số sáu trăm linh bảy viết là:', options: ['670', '607', '67', '76'], ans: 1 },
        { type: 'mc', prompt: 'x : 7 = 6 thì x = ?', options: ['1', '6', '131', '42'], ans: 3 },
        { type: 'mc', prompt: '{1/7} của 42 là:', options: ['294', '49', '35', '6'], ans: 3 },
        { type: 'mc', prompt: 'Kết quả của phép tính 137 + 246 là:', options: ['373', '383', '113', '131'], ans: 1 },
        { type: 'mc', prompt: '2 m 3 cm = … cm. Số thích hợp để điền vào chỗ chấm là:', options: ['2300', '230', '203', '23'], ans: 2 },
        { type: 'mc', prompt: '7 gấp lên 3 lần thì bằng:', options: ['10', '4', '14', '21'], ans: 3 },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['127 + 315', '423 − 106', '59 × 6', '93 : 3'] },
        { type: 'calc', prompt: 'Tính:', items: ['7 × 5 + 15', '36 : 4 + 32'] },
        // sửa: đề in "Tính:" cho hai phép tìm x, ghi lại là "Tìm x:".
        { type: 'findx', prompt: 'Tìm x:', items: ['42 : x = 7', 'X × 6 = 30'] },
        {
          type: 'word',
          text: 'Mẹ có 54 quả cam, sau khi đem bán thì số cam còn lại giảm đi 6 lần. Hỏi mẹ còn lại bao nhiêu quả cam?',
          given: ['Mẹ có 54 quả cam.', 'Số cam còn lại giảm đi 6 lần.'],
          ask: 'Mẹ còn lại bao nhiêu quả cam?',
          hint: 'Giảm một số đi 6 lần thì lấy số đó chia cho 6.',
          sentence: ['Mẹ', 'còn lại số', 'quả cam', 'là:'],
          decoys: ['đã bán'],
          expr: { a: 54, op: ':', b: 6, result: 9, unit: 'quả cam' },
          units: ['quả cam', 'lần', 'kg'],
        },
      ],
    },
  ],
};
