/** Đề số 13. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 15. */
export default {
  id: 'de-13',
  title: 'Đề số 13',
  short: 'Đề 13',
  desc: 'Đổi đơn vị đo, một phần mấy, gấp và giảm nhiều lần, đường gấp khúc, tìm x',
  review: 'gấp và giảm một số nhiều lần, đường gấp khúc và tìm x',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: '5 m 5 cm = … cm. Số cần điền vào chỗ chấm là:', options: ['10', '55', '505', '550'], ans: 2 },
        { type: 'mc', prompt: '{1/3} của 30 kg là … kg. Số cần điền vào chỗ chấm là:', options: ['10', '33', '27', '90'], ans: 0 },
        { type: 'mc', prompt: '7 × 6 + 14 = ? Kết quả của phép tính là:', options: ['17', '56', '63', '42'], ans: 1 },
        { type: 'mc', prompt: '96 : 3 = ? Kết quả của phép tính là:', options: ['93', '23', '32', '99'], ans: 2 },
        { type: 'mc', prompt: '48 : x = 6', options: ['x = 42', 'x = 288', 'x = 54', 'x = 8'], ans: 3 },
        {
          type: 'mc',
          prompt: 'Số cần điền vào hình vuông và hình tam giác là:',
          fig: '<svg viewBox="0 0 300 60" width="300"><g stroke="#1f2937" stroke-width="2" fill="none"><line x1="30" y1="40" x2="110" y2="40"/><polyline points="102,35 110,40 102,45"/><rect x="118" y="24" width="32" height="32"/><line x1="160" y1="40" x2="240" y2="40"/><polyline points="232,35 240,40 232,45"/><polygon points="266,22 248,56 284,56"/></g><g font-size="14" fill="#1f2937"><text x="8" y="45">6</text><text x="38" y="30">gấp 6 lần</text><text x="166" y="30">giảm 4 lần</text></g></svg>',
          options: ['36 và 9', '42 và 7', '36 và 6', '8 và 2'],
          ans: 0,
        },
        {
          type: 'mc',
          prompt: 'Độ dài đường gấp khúc ABCD là:',
          fig: '<svg viewBox="0 0 300 110" width="300"><polyline points="20,90 90,30 170,90 280,25" stroke="#1f2937" stroke-width="2" fill="none"/><g font-size="14" fill="#1f2937"><text x="8" y="106">A</text><text x="84" y="22">B</text><text x="164" y="108">C</text><text x="284" y="22">D</text><text x="26" y="58">3 cm</text><text x="136" y="56">4 cm</text><text x="214" y="48">5 cm</text></g></svg>',
          options: ['9 cm', '10 cm', '11 cm', '12 cm'],
          ans: 3,
        },
        { type: 'mc', prompt: '145 − 28 = ? Kết quả của phép tính là:', options: ['127', '117', '163', '173'], ans: 1 },
      ],
    },
    {
      title: 'II. Tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['156 + 127', '232 − 41', '12 × 6', '68 : 2'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['24 : x = 6', 'x × 3 = 27'] },
        { type: 'calc', prompt: 'Tính:', items: ['26 × 7 − 109', '56 : 7 + 98'] },
        {
          type: 'word',
          text: 'Chị hái được 15 quả cam, mẹ hái được gấp đôi số cam của chị. Hỏi mẹ hái được bao nhiêu quả cam?',
          given: ['Chị hái được 15 quả cam.', 'Mẹ hái được gấp đôi chị.'],
          ask: 'Mẹ hái được bao nhiêu quả cam?',
          hint: 'Gấp đôi là gấp lên 2 lần, lấy số đó nhân với 2.',
          sentence: ['Mẹ', 'hái được số', 'quả cam', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 15, op: '×', b: 2, result: 30, unit: 'quả cam' },
          units: ['quả cam', 'kg', 'lần'],
        },
      ],
    },
  ],
};
