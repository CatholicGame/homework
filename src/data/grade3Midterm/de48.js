/** Đề số 48. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 50. */
export default {
  id: 'de-48',
  title: 'Đề số 48',
  short: 'Đề 48',
  desc: 'Bảng nhân, một phần mấy, gấp lên nhiều lần, phép chia có dư, tìm x',
  review: 'bảng nhân, một phần mấy và phép chia có dư',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'Phần I: Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: '5 × 6 = … Số cần điền vào dấu ba chấm là:', options: ['35', '30', '38', '32'], ans: 1 },
        { type: 'mc', prompt: '7 × 8 = … Số cần điền vào dấu ba chấm là:', options: ['50', '52', '56', '65'], ans: 2 },
        { type: 'mc', prompt: '{1/6} của 48 cm là:', options: ['7 cm', '6 cm', '8 cm', '5 cm'], ans: 2 },
        { type: 'mc', prompt: '5 gấp 7 lần là:', options: ['36', '37', '35', '38'], ans: 2 },
        { type: 'mc', prompt: '58 : 6 = 9, số dư là:', options: ['4', '3', '8', '7'], ans: 0 },
        { type: 'mc', prompt: 'Đoạn thẳng AB dài 60 cm. Vậy {1/6} đoạn thẳng AB dài:', options: ['10 cm', '1 cm', '36 cm', '12 cm'], ans: 0 },
      ],
    },
    {
      title: 'Phần II: Tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['17 × 6', '64 × 7', '69 : 3', '84 : 4'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['87 − x = 30', '42 : x = 6'] },
        { type: 'calc', prompt: 'Tính:', items: ['7 × 8 − 26', '48 : 4 + 25'] },
        {
          type: 'word',
          text: 'Trong vườn có 63 cây ăn quả, {1/7} số cây đó là cây bưởi. Hỏi trong vườn có bao nhiêu cây bưởi?',
          given: ['Vườn có 63 cây ăn quả.', '{1/7} số cây là cây bưởi.'],
          ask: 'Trong vườn có bao nhiêu cây bưởi?',
          hint: 'Tìm {1/7} của một số thì lấy số đó chia cho 7.',
          sentence: ['Trong vườn', 'có số', 'cây bưởi', 'là:'],
          decoys: ['gấp lên'],
          expr: { a: 63, op: ':', b: 7, result: 9, unit: 'cây' },
          units: ['cây', 'quả', 'vườn'],
        },
      ],
    },
  ],
};
