/** Đề số 18. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 20. */
export default {
  id: 'de-18',
  title: 'Đề số 18',
  short: 'Đề 18',
  desc: 'Đọc viết số, nhân chia số có hai chữ số, tìm x, gấp lên nhiều lần',
  review: 'phép nhân, phép chia và gấp một số lên nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Số chín trăm tám mươi ba được viết là:', options: ['903', '938', '983', '389'], ans: 2 },
        { type: 'mc', prompt: 'Bình có 4 hộp kẹo, mỗi hộp có 8 cái kẹo. Hỏi Bình có tất cả bao nhiêu cái kẹo?', options: ['30 cái kẹo', '32 cái kẹo', '42 cái kẹo', '28 cái kẹo'], ans: 1 },
        { type: 'mc', prompt: '84 × 3 = ?', options: ['522', '225', '252', '242'], ans: 2 },
        { type: 'mc', prompt: '48 : 2 = ?', options: ['96', '24', '84', '42'], ans: 1 },
        { type: 'mc', prompt: '7 × 3 + 29 = ?', options: ['50', '51', '49', '52'], ans: 0 },
        { type: 'mc', prompt: '3 m 4 cm = … cm. Số thích hợp để điền vào chỗ chấm là:', options: ['3400', '340', '304', '34'], ans: 2 },
      ],
    },
    {
      title: 'II. Phần thực hành',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['132 + 248', '317 − 109', '26 × 4', '86 : 2'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['49 : x = 7', '28 : x = 4'] },
        { type: 'calc', prompt: 'Tính:', items: ['7 × 9 − 18', '6 × 8 + 134'] },
        {
          type: 'word',
          text: 'Chị nuôi được 48 con gà, mẹ nuôi được gấp 3 lần số gà của chị. Hỏi mẹ nuôi được bao nhiêu con gà?',
          given: ['Chị nuôi được 48 con gà.', 'Mẹ nuôi được gấp 3 lần số gà của chị.'],
          ask: 'Mẹ nuôi được bao nhiêu con gà?',
          hint: 'Gấp một số lên 3 lần thì lấy số đó nhân với 3.',
          sentence: ['Mẹ', 'nuôi được số', 'con gà', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 48, op: '×', b: 3, result: 144, unit: 'con gà' },
          units: ['con gà', 'lần', 'con vịt'],
        },
      ],
    },
  ],
};
