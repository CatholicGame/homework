/** Đề số 19. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 21. */
export default {
  id: 'de-19',
  title: 'Đề số 19',
  short: 'Đề 19',
  desc: 'Một phần mấy, phép chia có dư, chu vi hình tam giác, góc vuông',
  review: 'phép chia có dư, một phần mấy và góc vuông',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: '{1/3} của 24 kg là:', options: ['9', '8 kg', '18 kg', '9 kg'], ans: 1 },
        { type: 'mc', prompt: '2 ngày có:', options: ['72 giờ', '72 phút', '77 phút', '48 giờ'], ans: 3 },
        { type: 'mc', prompt: 'Trong các phép chia sau, phép chia nào là phép chia có dư?', options: ['42 : 2', '15 : 3', '27 : 5', '60 : 6'], ans: 2 },
        { type: 'mc', prompt: 'Kết quả của phép tính 23 : 3 là:', options: ['9 (dư 1)', '9 (dư 2)', '8', '7 (dư 2)'], ans: 3 },
        { type: 'mc', prompt: 'Lấy số 42 giảm đi 6 lần rồi giảm đi 4 đơn vị thì có số:', options: ['6', '3', '2', '4'], ans: 1 },
        { type: 'mc', prompt: 'Kết quả của dãy tính 45 : 5 × 3 là:', options: ['32', '36', '27', '21'], ans: 2 },
        { type: 'mc', prompt: 'Chu vi của hình tam giác ABC có cạnh AB = 24 cm, BC = 45 cm, CA = 53 cm là:', options: ['121', '122 cm', '121 cm', '112 cm'], ans: 1 },
        {
          type: 'mc',
          prompt: 'Hình tứ giác ABCD có mấy góc vuông?',
          fig: '<svg viewBox="0 0 200 190" width="200"><path d="M40 30 L120 30 L165 160 L40 160 Z" stroke="#1f2937" stroke-width="2" fill="none"/><text x="30" y="22" font-size="14" fill="#1f2937">A</text><text x="118" y="22" font-size="14" fill="#1f2937">B</text><text x="166" y="180" font-size="14" fill="#1f2937">C</text><text x="30" y="180" font-size="14" fill="#1f2937">D</text></svg>',
          options: ['1', '2', '3', '4'],
          ans: 1,
        },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['256 + 537', '635 − 327', '37 × 5', '69 : 3'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['x : 3 = 5', '30 : x = 6'] },
        {
          type: 'word',
          text: 'Mẹ có 30 quả cam. Mẹ đã bán {1/3} số cam đó. Hỏi mẹ đã bán bao nhiêu quả cam?',
          given: ['Mẹ có 30 quả cam.', 'Mẹ đã bán {1/3} số cam.'],
          ask: 'Mẹ đã bán bao nhiêu quả cam?',
          hint: 'Muốn tìm {1/3} của một số thì lấy số đó chia cho 3.',
          sentence: ['Mẹ', 'đã bán số', 'quả cam', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 30, op: ':', b: 3, result: 10, unit: 'quả cam' },
          units: ['quả cam', 'kg', 'lần'],
        },
      ],
    },
  ],
};
