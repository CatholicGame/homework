/** Đề số 54. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 56. */
export default {
  id: 'de-54',
  title: 'Đề số 54',
  short: 'Đề 54',
  desc: 'Đọc viết số, gấp lên nhiều lần, một phần mấy, độ dài đường gấp khúc, tìm x',
  review: 'một phần mấy, độ dài đường gấp khúc và tìm x',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'Phần I: Trắc nghiệm',
      label: 'Bài',
      questions: [
        {
          type: 'mc',
          prompt: 'Hãy khoanh tròn vào chữ cái trước câu trả lời đúng.',
          items: [
            { prompt: '1. Số <b>bảy trăm ba mươi hai</b> viết là:', options: ['272', '723', '372', '732'], ans: 3 },
            { prompt: '2. Gấp 7 lên 5 lần thì được:', options: ['12', '35', '40', '45'], ans: 1 },
            { prompt: '3. Kết quả dãy tính 6 : 2 + 14 là:', options: ['10', '20', '30', '17'], ans: 3 },
            { prompt: '4. {1/5} của 45 m là:', options: ['7 m', '8 m', '9 m', '6 m'], ans: 2 },
          ],
        },
        {
          type: 'tf',
          prompt: 'Đúng ghi Đ, sai ghi S vào ô trống sau:',
          fig: '<svg viewBox="0 0 320 130" width="300" xmlns="http://www.w3.org/2000/svg"><path d="M20 70 L150 22 L110 110 L300 72" stroke="#1f2937" stroke-width="2" fill="none"/><text x="4" y="76" font-size="14" fill="#1f2937">A</text><text x="150" y="16" font-size="14" fill="#1f2937">B</text><text x="96" y="124" font-size="14" fill="#1f2937">C</text><text x="304" y="76" font-size="14" fill="#1f2937">D</text><text x="62" y="38" font-size="13" fill="#1f2937">25 cm</text><text x="136" y="72" font-size="13" fill="#1f2937">15 cm</text><text x="196" y="84" font-size="13" fill="#1f2937">37 cm</text></svg>',
          items: ['{1/4} của 24 l là 6 l.', 'Độ dài đường gấp khúc ABCD là 77 cm.'],
          ans: ['Đ', 'Đ'],
        },
      ],
    },
    {
      title: 'Phần 2: Tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['421 + 29', '516 − 324', '43 × 6', '68 : 2'] },
        { type: 'calc', prompt: 'Tính:', items: ['45 : 5 + 231', '26 × 5 − 34'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['36 : x = 4', 'x : 7 = 4'] },
        {
          type: 'word',
          text: 'Một lớp học có 36 học sinh, trong đó có {1/4} số học sinh là học sinh giỏi. Hỏi lớp học đó có bao nhiêu học sinh giỏi?',
          given: ['Lớp học có 36 học sinh.', '{1/4} số học sinh là học sinh giỏi.'],
          ask: 'Lớp học đó có bao nhiêu học sinh giỏi?',
          hint: 'Muốn tìm {1/4} của một số thì lấy số đó chia cho 4.',
          sentence: ['Lớp học đó', 'có số', 'học sinh giỏi', 'là:'],
          decoys: ['tất cả'],
          expr: { a: 36, op: ':', b: 4, result: 9, unit: 'học sinh' },
          units: ['học sinh', 'lớp', 'lần'],
        },
      ],
    },
  ],
};
