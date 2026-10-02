/** Đề số 50. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 52. */
export default {
  id: 'de-50',
  title: 'Đề số 50',
  short: 'Đề 50',
  desc: 'Đọc viết số, chu vi tam giác, gấp lên nhiều lần, một phần mấy, tìm x',
  review: 'gấp lên nhiều lần, một phần mấy và phép chia',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Số ba trăm năm mươi viết là:', options: ['305', '503', '350', '530'], ans: 2 },
        {
          type: 'mc',
          prompt: 'Chu vi hình tam giác ABC là:',
          fig: '<svg viewBox="0 0 220 160" width="220" xmlns="http://www.w3.org/2000/svg"><path d="M110 22 L30 135 L190 135 Z" stroke="#1f2937" stroke-width="2" fill="none"/><text x="104" y="16" font-size="14" fill="#1f2937">A</text><text x="14" y="146" font-size="14" fill="#1f2937">B</text><text x="196" y="146" font-size="14" fill="#1f2937">C</text><text x="18" y="76" font-size="13" fill="#1f2937">100 cm</text><text x="156" y="76" font-size="13" fill="#1f2937">100 cm</text><text x="88" y="153" font-size="13" fill="#1f2937">100 cm</text></svg>',
          options: ['200 cm', '310 cm', '300 cm', '400 cm'],
          ans: 2,
        },
        { type: 'mc', prompt: 'Gấp 6 lên 5 lần thì được:', options: ['11', '25', '28', '30'], ans: 3 },
        { type: 'mc', prompt: 'Kết quả của dãy tính 4 : 2 + 16 là:', options: ['6', '10', '18', '12'], ans: 2 },
        { type: 'mc', prompt: '{1/6} của 30 lít là:', options: ['3 lít', '4 lít', '5 lít', '6 lít'], ans: 2 },
        { type: 'mc', prompt: 'Số lớn nhất có 2 chữ số là:', options: ['99', '90', '10', '89'], ans: 0 },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: 'Câu',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['144 + 367', '573 − 56', '44 × 6', '75 : 3'] },
        { type: 'calc', prompt: 'Tính:', items: ['40 × 2 − 50', '30 + 50 − 20'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['x × 6 = 48', 'x : 6 = 5'] },
        {
          type: 'word',
          text: 'Có 35 lít dầu chia đều vào các can, mỗi can chứa 5 lít dầu. Hỏi cần bao nhiêu can như vậy để chứa hết số dầu?',
          given: ['Có 35 lít dầu.', 'Mỗi can chứa 5 lít dầu.'],
          ask: 'Cần bao nhiêu can để chứa hết số dầu?',
          hint: 'Mỗi can 5 lít, muốn biết số can thì lấy số lít dầu chia cho 5.',
          sentence: ['Số can', 'cần để chứa', 'hết số dầu', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 35, op: ':', b: 5, result: 7, unit: 'can' },
          units: ['can', 'l', 'lần'],
        },
      ],
    },
  ],
};
