/** Đề số 31. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 33. */
export default {
  id: 'de-31',
  title: 'Đề số 31',
  short: 'Đề 31',
  desc: 'Bảng nhân, đổi đơn vị đo, góc vuông, so sánh, tìm x, một phần mấy',
  review: 'góc vuông, đổi đơn vị đo và một phần mấy',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'Phần I: Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Tích của 7 và 8 là:', options: ['15', '49', '56', '63'], ans: 2 },
        { type: 'mc', prompt: '6 km 7 dam = … dam', options: ['76', '67', '607', '670'], ans: 2 },
        { type: 'mc', prompt: '54 : x = 6. x có kết quả là:', options: ['9', '324', '19', '48'], ans: 0 },
        {
          type: 'mc',
          prompt: 'Hình bên có bao nhiêu góc vuông?',
          fig: '<svg viewBox="0 0 200 120" width="200"><path d="M30 105 L30 40 L100 12 L170 40 L170 105 Z" stroke="#1f2937" stroke-width="2" fill="none"/></svg>',
          options: ['1 góc vuông', '2 góc vuông', '3 góc vuông', '4 góc vuông'],
          ans: 1,
        },
        { type: 'compare', prompt: 'Điền <, >, = ?', items: ['27 + 15 − 15 □ 27', '49 : 7 + 7 □ 7'] },
        { type: 'mc', prompt: 'Con 7 tuổi, tuổi mẹ gấp 4 lần tuổi con. Vậy mẹ mấy tuổi?', options: ['11 tuổi', '28 tuổi', '32 tuổi', '36 tuổi'], ans: 1 },
      ],
    },
    {
      title: 'Phần II: Tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['428 + 190', '809 − 67', '27 × 3', '84 : 4'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['x − 115 = 68', '30 : x = 5'] },
        { type: 'calc', prompt: 'Tính:', items: ['7 × 8 − 26', '6 × 6 + 125'] },
        {
          type: 'word',
          text: 'Trong thùng có 69 l dầu. Sau khi sử dụng, số dầu còn lại trong thùng bằng {1/3} số dầu đã có. Hỏi trong thùng còn lại bao nhiêu lít dầu?',
          given: ['Thùng có 69 l dầu.', 'Số dầu còn lại bằng {1/3} số dầu đã có.'],
          ask: 'Trong thùng còn lại bao nhiêu lít dầu?',
          hint: 'Muốn tìm {1/3} của một số thì lấy số đó chia cho 3.',
          sentence: ['Trong thùng', 'còn lại số', 'lít dầu', 'là:'],
          decoys: ['đã dùng'],
          expr: { a: 69, op: ':', b: 3, result: 23, unit: 'l' },
          units: ['l', 'kg', 'thùng'],
        },
      ],
    },
  ],
};
