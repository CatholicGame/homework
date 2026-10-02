/** Đề số 32. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 34. */
export default {
  id: 'de-32',
  title: 'Đề số 32',
  short: 'Đề 32',
  desc: 'So sánh số, một phần mấy, đổi đơn vị đo, đếm hình vuông, giảm đi nhiều lần',
  review: 'một phần mấy, đếm hình và giảm một số đi nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: 'Câu',
      questions: [
        { type: 'mc', prompt: 'Số lớn nhất trong các số 375, 735, 537, 753 là:', options: ['375', '753', '735', '537'], ans: 1 },
        { type: 'mc', prompt: 'Kết quả của phép tính 24 : 3 là:', options: ['24', '3', '8', '4'], ans: 2 },
        { type: 'mc', prompt: '{1/6} của 48 m là:', options: ['6 m', '8 m', '4 m', '5 m'], ans: 1 },
        { type: 'mc', prompt: '6 m 3 cm = … cm. Số thích hợp điền vào chỗ chấm là:', options: ['63', '630', '603', '36'], ans: 2 },
        { type: 'mc', prompt: '7 gấp 8 lần là:', options: ['13', '49', '56', '36'], ans: 2 },
        {
          type: 'fill',
          prompt: 'Đếm số hình vuông trong hình bên:',
          fig: '<svg viewBox="0 0 180 180" width="180"><rect x="10" y="10" width="160" height="160" stroke="#1f2937" stroke-width="2" fill="none"/><line x1="90" y1="10" x2="90" y2="170" stroke="#1f2937" stroke-width="2"/><line x1="10" y1="90" x2="170" y2="90" stroke="#1f2937" stroke-width="2"/><path d="M90 10 L170 90 L90 170 L10 90 Z" stroke="#1f2937" stroke-width="2" fill="none"/></svg>',
          items: [{ t: 'Trong hình bên có … hình vuông.', ans: 6 }],
        },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['415 + 514', '433 − 25', '38 × 3', '90 : 3'] },
        { type: 'findx', prompt: 'Tìm X:', items: ['X + 45 = 76', '45 : X = 5'] },
        { type: 'calc', prompt: 'Tính:', items: ['6 × 7 + 214', '7 × 8 − 29'] },
        {
          type: 'word',
          text: 'Nhà em nuôi 48 con gà. Sau khi đem bán thì số gà giảm đi 4 lần. Hỏi nhà em còn lại bao nhiêu con gà?',
          given: ['Nhà em nuôi 48 con gà.', 'Số gà giảm đi 4 lần.'],
          ask: 'Nhà em còn lại bao nhiêu con gà?',
          hint: 'Giảm một số đi 4 lần thì lấy số đó chia cho 4.',
          sentence: ['Nhà em', 'còn lại số', 'con gà', 'là:'],
          decoys: ['đã bán'],
          expr: { a: 48, op: ':', b: 4, result: 12, unit: 'con gà' },
          units: ['con gà', 'lần', 'con vịt'],
        },
      ],
    },
  ],
};
