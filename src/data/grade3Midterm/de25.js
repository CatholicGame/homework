/** Đề số 25. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 27. */
export default {
  id: 'de-25',
  title: 'Đề số 25',
  short: 'Đề 25',
  desc: 'Tìm thành phần chưa biết, đổi đơn vị đo, một phần mấy, đếm hình, so sánh',
  review: 'đổi đơn vị đo, một phần mấy và đếm hình',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Số liền trước số lớn nhất có ba chữ số là:', options: ['999', '900', '998', '1000'], ans: 2 },
        { type: 'mc', prompt: 'Trong một phép trừ có số trừ là 476 và hiệu là 183 thì số bị trừ là:', options: ['476', '293', '183', '659'], ans: 3 },
        { type: 'mc', prompt: 'Biết x × 3 = 27, giá trị của x bằng:', options: ['x = 3', 'x = 81', 'x = 9', 'x = 27'], ans: 2 },
        { type: 'mc', prompt: 'Kết quả của phép nhân 15 × 7 là:', options: ['75', '105', '95', '115'], ans: 1 },
        { type: 'mc', prompt: '9 dm 4 cm = … cm?', options: ['904 cm', '94 cm', '13 cm', '49 cm'], ans: 1 },
        { type: 'mc', prompt: '{1/3} của 24 kg là:', options: ['12 kg', '8 kg', '6 kg', '72 kg'], ans: 1 },
        { type: 'mc', prompt: 'Kết quả của phép chia 88 : 2 là:', options: ['44', '33', '42', '32'], ans: 0 },
        {
          type: 'mc',
          prompt: 'Hình bên có:',
          fig: '<svg viewBox="0 0 170 170" width="170"><rect x="10" y="10" width="150" height="150" stroke="#1f2937" stroke-width="2" fill="none"/><line x1="85" y1="10" x2="85" y2="160" stroke="#1f2937" stroke-width="2"/><line x1="10" y1="85" x2="160" y2="85" stroke="#1f2937" stroke-width="2"/><line x1="160" y1="10" x2="10" y2="160" stroke="#1f2937" stroke-width="2"/></svg>',
          options: ['4 hình vuông, 4 hình tam giác', '5 hình vuông, 4 hình tam giác', '5 hình vuông, 6 hình tam giác', '5 hình vuông, 5 hình tam giác'],
          cols: 1,
          ans: 2,
        },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Tính giá trị của biểu thức:', items: ['34 × 2 + 125', '84 × 3 − 95'] },
        {
          type: 'compare',
          prompt: 'Điền dấu (>, <, =):',
          items: [
            { t: '5 hm 17 m □ 517 m', ans: '=' },
            { t: '1 m 15 cm □ 105 cm', ans: '>' },
          ],
        },
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['258 + 136', '188 − 49', '64 × 4', '96 : 3'] },
        {
          type: 'word',
          text: 'Năm nay Tùng 7 tuổi. Số tuổi của bố gấp 6 lần số tuổi của Tùng. Hỏi năm nay bố Tùng bao nhiêu tuổi?',
          given: ['Tùng 7 tuổi.', 'Tuổi bố gấp 6 lần tuổi Tùng.'],
          ask: 'Năm nay bố Tùng bao nhiêu tuổi?',
          hint: 'Gấp một số lên 6 lần thì lấy số đó nhân với 6.',
          sentence: ['Năm nay', 'bố Tùng', 'có số tuổi', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 7, op: '×', b: 6, result: 42, unit: 'tuổi' },
          units: ['tuổi', 'năm', 'lần'],
        },
      ],
    },
  ],
};
