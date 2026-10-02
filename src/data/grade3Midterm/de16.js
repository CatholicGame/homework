/** Đề số 16. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 18. */
const sq = (shade) => `<svg viewBox="0 0 84 84" width="110">${shade}<g stroke="#1f2937" stroke-width="2" fill="none"><rect x="2" y="2" width="80" height="80"/><line x1="42" y1="2" x2="42" y2="82"/><line x1="2" y1="42" x2="82" y2="42"/><line x1="2" y1="2" x2="82" y2="82"/><line x1="82" y1="2" x2="2" y2="82"/></g></svg>`;

export default {
  id: 'de-16',
  title: 'Đề số 16',
  short: 'Đề 16',
  desc: 'Phép chia có dư, đổi đơn vị đo, chu vi tam giác, một phần mấy, đếm hình tam giác',
  review: 'phép chia có dư, một phần mấy và đếm hình',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'Phần I: Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Tìm x, biết: x : 7 = 21 dư 3', options: ['x = 150', 'x = 147', 'x = 144'], ans: 0 },
        { type: 'mc', prompt: '3 m 4 cm = … Số thích hợp điền vào chỗ chấm là:', options: ['340 cm', '34 cm', '304 cm'], ans: 2 },
        { type: 'mc', prompt: 'Một hình tam giác có 3 cạnh bằng nhau, mỗi cạnh là 7 cm. Chu vi hình tam giác đó là:', options: ['15 cm', '21 cm', '28 cm'], ans: 1 },
        { type: 'mc', prompt: 'Con hái được 7 quả cam, mẹ hái được gấp 5 lần số cam của con. Vậy mẹ hái được số quả cam là:', options: ['35 quả', '12 quả', '2 quả'], ans: 0 },
        {
          type: 'mc',
          prompt: 'Đã tô màu vào {1/4} số hình tam giác của hình nào?',
          options: [
            sq('<rect x="2" y="2" width="80" height="40" fill="#94a3b8"/>'),
            sq('<polygon points="2,2 42,2 42,42" fill="#94a3b8"/><polygon points="42,42 82,42 82,82" fill="#94a3b8"/>'),
            sq('<polygon points="2,2 42,2 42,42" fill="#94a3b8"/><rect x="42" y="2" width="40" height="40" fill="#94a3b8"/>'),
          ],
          ans: 1,
        },
        {
          type: 'mc',
          prompt: 'Hình bên có bao nhiêu hình tam giác?',
          fig: '<svg viewBox="0 0 204 104" width="220"><g stroke="#1f2937" stroke-width="2" fill="none"><rect x="2" y="2" width="200" height="100"/><line x1="54" y1="2" x2="54" y2="102"/><line x1="2" y1="2" x2="54" y2="102"/><line x1="54" y1="102" x2="202" y2="2"/></g></svg>',
          options: ['3 hình tam giác', '4 hình tam giác', '5 hình tam giác'],
          ans: 2,
        },
      ],
    },
    {
      title: 'Phần 2: Tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['37 + 415', '300 − 48', '53 × 6', '84 : 4'] },
        { type: 'calc', prompt: 'Tính:', items: ['6 × 9 − 8', '42 : 7 + 15'] },
        // sửa: đề in "đã bán đượcđó đã {1/5} số vải đó", bỏ chữ thừa cho đúng câu.
        {
          type: 'word',
          text: 'Một cửa hàng có 40 m vải xanh và đã bán được {1/5} số vải đó. Hỏi cửa hàng bán bao nhiêu mét vải xanh?',
          given: ['Cửa hàng có 40 m vải xanh.', 'Đã bán {1/5} số vải đó.'],
          ask: 'Cửa hàng bán bao nhiêu mét vải xanh?',
          hint: 'Muốn tìm {1/5} của một số thì lấy số đó chia cho 5.',
          sentence: ['Cửa hàng', 'đã bán số', 'mét vải xanh', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 40, op: ':', b: 5, result: 8, unit: 'm' },
          units: ['m', 'cm', 'kg'],
        },
      ],
    },
  ],
};
