/** Đề số 39. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 41. */
export default {
  id: 'de-39',
  title: 'Đề số 39',
  short: 'Đề 39',
  desc: 'Đổi đơn vị đo, một phần mấy, gấp lên nhiều lần, phép chia có dư',
  review: 'một phần mấy, phép chia có dư và gấp một số lên nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: '8 m 3 cm = … cm. Số thích hợp điền vào chỗ chấm là:', options: ['83', '830', '803', '38'], ans: 2 },
        { type: 'mc', prompt: '{1/4} của 32 m là:', options: ['6 m', '7 m', '8 m', '9 m'], ans: 2 },
        { type: 'mc', prompt: '42 : 7 = ?', options: ['5', '6', '7', '8'], ans: 1 },
        { type: 'mc', prompt: '7 gấp lên 4 lần là:', options: ['11', '28', '47', '74'], ans: 1 },
        { type: 'mc', prompt: '57 : 6 = 9, số dư là:', options: ['4', '3', '8', '7'], ans: 1 },
        { type: 'mc', prompt: 'Mỗi tuần lễ có 7 ngày. Vậy 3 tuần lễ có bao nhiêu ngày?', options: ['20 ngày', '21 ngày', '22 ngày', '23 ngày'], ans: 1 },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['684 + 275', '492 − 29', '99 : 3', '68 × 6'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['x + 32 = 68', '42 : x = 6'] },
        { type: 'calc', prompt: 'Tính:', items: ['7 × 8 + 64', '49 : 7 + 13'] },
        {
          type: 'word',
          text: 'Năm nay mẹ 42 tuổi, tuổi con bằng {1/6} tuổi mẹ. Hỏi con bao nhiêu tuổi?',
          given: ['Mẹ 42 tuổi.', 'Tuổi con bằng {1/6} tuổi mẹ.'],
          ask: 'Con bao nhiêu tuổi?',
          hint: 'Tìm {1/6} của một số thì lấy số đó chia cho 6.',
          sentence: ['Năm nay', 'tuổi của', 'con là:'],
          decoys: ['gấp lên'],
          expr: { a: 42, op: ':', b: 6, result: 7, unit: 'tuổi' },
          units: ['tuổi', 'năm', 'lần'],
        },
      ],
    },
  ],
};
