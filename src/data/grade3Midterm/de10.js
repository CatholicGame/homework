/** Đề số 10. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 12. */
export default {
  id: 'de-10',
  title: 'Đề số 10',
  short: 'Đề 10',
  desc: 'Bảng nhân, bảng chia, đổi đơn vị đo, một phần mấy, gấp lên nhiều lần',
  review: 'bảng nhân, bảng chia và gấp một số lên nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I/ Phần trắc nghiệm',
      label: 'Câu',
      questions: [
        { type: 'mc', prompt: 'Trong phép tính: 63 : 7 = ? kết quả là:', options: ['7', '8', '9', '6'], ans: 2 },
        { type: 'mc', prompt: 'Trong phép tính: 34 × 4 = ? Kết quả là:', options: ['124', '136', '140', '30'], ans: 1 },
        { type: 'mc', prompt: '1 hm = … m', options: ['10 m', '100 m', '1000 m', '500 m'], ans: 1 },
        { type: 'mc', prompt: '{1/6} của 36 phút là:', options: ['6 phút', '8 phút', '9 phút', '10 phút'], ans: 0 },
        { type: 'mc', prompt: 'Một lớp học có 35 bạn, xếp đều thành 5 hàng. Vậy mỗi hàng có bao nhiêu bạn?', options: ['5 bạn', '6 bạn', '7 bạn', '8 bạn'], ans: 2 },
        { type: 'mc', prompt: '32 : x = 8 thì x = ?', options: ['36', '24', '8', '4'], ans: 3 },
      ],
    },
    {
      title: 'II. Tự luận',
      label: 'Câu',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['624 + 284', '593 − 327', '44 × 6', '84 : 4'] },
        { type: 'calc', prompt: 'Tính:', items: ['28 × 3 − 25', '84 : 4 + 139'] },
        {
          type: 'word',
          text: 'Một buổi tập múa có 7 bạn nam, số bạn nữ gấp 3 lần số bạn nam. Hỏi buổi tập múa có bao nhiêu bạn nữ?',
          given: ['Có 7 bạn nam.', 'Số bạn nữ gấp 3 lần số bạn nam.'],
          ask: 'Buổi tập múa có bao nhiêu bạn nữ?',
          hint: 'Gấp một số lên 3 lần thì lấy số đó nhân với 3.',
          sentence: ['Buổi tập múa', 'có số', 'bạn nữ', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 7, op: '×', b: 3, result: 21, unit: 'bạn' },
          units: ['bạn', 'hàng', 'lần'],
        },
      ],
    },
  ],
};
