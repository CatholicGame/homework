/** Đề số 37. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 39. */
export default {
  id: 'de-37',
  title: 'Đề số 37',
  short: 'Đề 37',
  desc: 'Cộng trừ số có ba chữ số, bảng nhân chia, chu vi tam giác, gấp lên nhiều lần',
  review: 'bảng nhân, bảng chia và gấp một số lên nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Kết quả của phép cộng 645 + 302 là:', options: ['847', '957', '947', '907'], ans: 2 },
        { type: 'mc', prompt: 'Kết quả của phép trừ 671 − 424 là:', options: ['147', '246', '247', '347'], ans: 2 },
        { type: 'mc', prompt: 'Kết quả của phép nhân 6 × 7 là:', options: ['45', '35', '32', '42'], ans: 3 },
        { type: 'mc', prompt: 'Kết quả của phép nhân 7 × 8 là:', options: ['49', '72', '65', '56'], ans: 3 },
        { type: 'mc', prompt: 'Kết quả của phép chia 54 : 6 là:', options: ['6', '7', '9', '8'], ans: 2 },
        { type: 'mc', prompt: 'Hình tam giác có độ dài các cạnh là: 15 cm, 12 cm, 18 cm, thì chu vi hình tam giác đó là:', options: ['48 cm', '55 cm', '45 cm', '54 cm'], ans: 2 },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Thực hiện các phép tính:', col: true, items: ['30 × 7', '83 × 6', '88 : 4', '69 : 3'] },
        { type: 'calc', prompt: 'Tính:', items: ['5 × 7 + 14', '48 : 6 + 13'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['3 × x = 93', 'x : 5 = 25'] },
        {
          type: 'word',
          text: 'Mẹ nuôi được 24 con gà, số vịt mẹ nuôi nhiều gấp 4 lần số gà. Hỏi mẹ đã nuôi được bao nhiêu con vịt?',
          given: ['Mẹ nuôi 24 con gà.', 'Số vịt gấp 4 lần số gà.'],
          ask: 'Mẹ nuôi được bao nhiêu con vịt?',
          hint: 'Gấp một số lên 4 lần thì lấy số đó nhân với 4.',
          sentence: ['Mẹ', 'nuôi được số', 'con vịt là:'],
          decoys: ['con gà'],
          expr: { a: 24, op: '×', b: 4, result: 96, unit: 'con vịt' },
          units: ['con vịt', 'con gà', 'lần'],
        },
      ],
    },
  ],
};
