/** Đề số 29. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 31. */
export default {
  id: 'de-29',
  title: 'Đề số 29',
  short: 'Đề 29',
  desc: 'Một phần mấy, tìm X, đổi đơn vị đo, giảm đi nhiều lần, gấp lên nhiều lần',
  review: 'một phần mấy, gấp và giảm một số đi nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: 'Câu',
      questions: [
        { type: 'mc', prompt: '{1/7} của 56 m là:', options: ['63 m', '49 m', '39 m', '8 m'], ans: 3 },
        { type: 'mc', prompt: 'X − 18 = 35 thì X = ?', options: ['17', '27', '43', '53'], ans: 3 },
        { type: 'mc', prompt: '4 m 2 cm = … cm. Số thích hợp để điền vào chỗ chấm là:', options: ['42', '402', '420', '4200'], ans: 1 },
        { type: 'mc', prompt: '422 − 108 = … Số thích hợp điền vào chỗ chấm là:', options: ['224', '324', '314', '530'], ans: 2 },
        { type: 'mc', prompt: '48 giảm đi 6 lần thì bằng:', options: ['288', '54', '42', '8'], ans: 3 },
        { type: 'mc', prompt: 'Số bốn trăm bốn mươi viết là:', options: ['404', '440', '4040', '4400'], ans: 1 },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['328 + 134', '430 − 127', '87 × 6', '96 : 3'] },
        { type: 'calc', prompt: 'Tính:', items: ['15 × 7 − 29', '48 × 6 + 95'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['X × 5 = 25', '49 : x = 7'] },
        {
          type: 'word',
          text: 'Lan có 7 cái tem, số tem của Huệ gấp 6 lần số tem của Lan. Hỏi Huệ có bao nhiêu cái tem?',
          given: ['Lan có 7 cái tem.', 'Số tem của Huệ gấp 6 lần số tem của Lan.'],
          ask: 'Huệ có bao nhiêu cái tem?',
          hint: 'Gấp một số lên 6 lần thì lấy số đó nhân với 6.',
          sentence: ['Huệ', 'có số', 'cái tem', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 7, op: '×', b: 6, result: 42, unit: 'cái tem' },
          units: ['cái tem', 'lần', 'bạn'],
        },
      ],
    },
  ],
};
