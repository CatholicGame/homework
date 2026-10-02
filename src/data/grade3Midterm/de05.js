/** Đề số 5. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 7. */
export default {
  id: 'de-05',
  title: 'Đề số 5',
  short: 'Đề 5',
  desc: 'Bảng nhân, bảng chia, một phần mấy, góc vuông, gấp lên nhiều lần',
  review: 'bảng nhân, bảng chia, một phần mấy và góc vuông',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I/ Phần trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: '9 là kết quả của phép tính nào sau đây?', options: ['8 × 4', '36 : 4', '15 − 7', '3 × 9'], ans: 1 },
        { type: 'mc', prompt: '{1/3} của 15 là:', options: ['3', '4', '5', '6'], ans: 2 },
        { type: 'mc', prompt: '4 × 7 □ 4 × 6. Dấu điền vào ô trống là:', options: ['<', '>', '='], ans: 1 },
        { type: 'mc', prompt: 'Kết quả của phép nhân 18 × 5 là:', options: ['87', '88', '89', '90'], ans: 3 },
        { type: 'mc', prompt: 'Kết quả của phép chia 48 : 6 là:', options: ['6', '7', '8', '9'], ans: 2 },
        { type: 'mc', prompt: '7 gấp lên 5 lần là bao nhiêu?', options: ['25', '35', '45', '55'], ans: 1 },
        {
          type: 'mc',
          prompt: 'Số góc vuông trong hình bên là:',
          fig: '<svg viewBox="0 0 180 80" width="200"><polygon points="10,10 120,10 170,70 10,70" stroke="#1f2937" stroke-width="2" fill="none"/></svg>',
          options: ['1 góc', '2 góc', '3 góc', '4 góc'],
          ans: 1,
        },
        {
          type: 'mc',
          prompt: 'Hình tô màu là bao nhiêu phần của hình chữ nhật lớn?',
          fig: '<svg viewBox="0 0 214 44" width="220"><rect x="2" y="2" width="42" height="40" fill="#94a3b8" stroke="#1f2937" stroke-width="2"/><g stroke="#1f2937" stroke-width="2" fill="none"><rect x="44" y="2" width="42" height="40"/><rect x="86" y="2" width="42" height="40"/><rect x="128" y="2" width="42" height="40"/><rect x="170" y="2" width="42" height="40"/></g></svg>',
          options: ['{1/3}', '{1/5}', '{1/4}'],
          ans: 1,
        },
      ],
    },
    {
      title: 'II/ Phần tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['361 + 147', '824 − 662', '26 × 5', '48 : 4'] },
        { type: 'calc', prompt: 'Tính:', items: ['27 × 3 − 54', '55 : 5 + 129'] },
        {
          type: 'word',
          text: 'Một quầy hàng có 36 kg cam và đã bán {1/3} số cam đó. Hỏi quầy hàng đã bán bao nhiêu ki-lô-gam cam?',
          given: ['Quầy hàng có 36 kg cam.', 'Đã bán {1/3} số cam đó.'],
          ask: 'Quầy hàng đã bán bao nhiêu ki-lô-gam cam?',
          hint: 'Muốn tìm {1/3} của một số thì lấy số đó chia cho 3.',
          sentence: ['Quầy hàng', 'đã bán số', 'ki-lô-gam cam', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 36, op: ':', b: 3, result: 12, unit: 'kg' },
          units: ['kg', 'quả cam', 'g'],
        },
      ],
    },
  ],
};
