/** Đề số 38. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 40. */
export default {
  id: 'de-38',
  title: 'Đề số 38',
  short: 'Đề 38',
  desc: 'So sánh số, một phần mấy, gấp lên nhiều lần, so sánh độ dài, đếm hình tứ giác',
  review: 'một phần mấy, gấp và giảm một số lần, đổi đơn vị đo độ dài',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Trong các số 375, 421, 753, 735 số lớn nhất là:', options: ['375', '421', '753', '735'], ans: 2 },
        { type: 'mc', prompt: '{1/4} của 24 lít là … lít', options: ['5', '7', '6', '8'], ans: 2 },
        { type: 'mc', prompt: '42 : 7 = ?', options: ['5', '6', '7', '8'], ans: 1 },
        { type: 'mc', prompt: '6 gấp lên 7 lần là:', options: ['36', '42', '48', '54'], ans: 1 },
        {
          type: 'compare',
          prompt: 'Điền dấu >, <, = thích hợp vào chỗ chấm:',
          items: [
            { t: '6 dm 7 cm … 67 cm', ans: '=' },
            { t: '8 m 6 dm … 860 dm', ans: '<' },
          ],
        },
        {
          type: 'mc',
          prompt: 'Trong hình bên:',
          fig: '<svg viewBox="0 0 180 90" width="180"><polygon points="10,80 50,10 130,10 170,80" stroke="#1f2937" stroke-width="2" fill="none"/><line x1="86" y1="10" x2="90" y2="80" stroke="#1f2937" stroke-width="2"/></svg>',
          options: ['Có 2 hình tứ giác', 'Có 1 hình tứ giác', 'Có 3 hình tứ giác', 'Có 4 hình tứ giác'],
          ans: 2,
        },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['256 + 125', '347 − 28', '35 × 4', '99 : 3'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['80 − x = 30', '42 : x = 7'] },
        { type: 'calc', prompt: 'Tính:', items: ['6 × 8 − 26', '66 : 6 + 25'] },
        {
          type: 'word',
          text: 'Chị Lan có 84 quả cam, sau khi đem bán thì số quả cam giảm đi 4 lần. Hỏi chị Lan còn bao nhiêu quả cam?',
          given: ['Chị Lan có 84 quả cam.', 'Sau khi bán, số cam giảm đi 4 lần.'],
          ask: 'Chị Lan còn bao nhiêu quả cam?',
          hint: 'Giảm một số đi 4 lần thì lấy số đó chia cho 4.',
          sentence: ['Chị Lan', 'còn lại số', 'quả cam là:'],
          decoys: ['gấp lên'],
          expr: { a: 84, op: ':', b: 4, result: 21, unit: 'quả cam' },
          units: ['quả cam', 'lần', 'kg'],
        },
      ],
    },
  ],
};
