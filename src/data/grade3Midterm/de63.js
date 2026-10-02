/** Đề số 63. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 65. */
export default {
  id: 'de-63',
  title: 'Đề số 63',
  short: 'Đề 63',
  desc: 'Bảng nhân chia 6 và 7, so sánh số đo độ dài, góc vuông, một phần mấy, tìm x',
  review: 'bảng nhân, bảng chia, đổi đơn vị đo và góc vuông',
  time: 40,
  numbering: 'continuous',
  parts: [
    {
      title: 'Phần I – Trắc nghiệm',
      label: 'Câu',
      questions: [
        { type: 'calc', prompt: 'Tính nhẩm:', items: ['6 × 3', '7 × 9', '49 : 7', '6 × 5', '7 × 5', '21 : 7', '36 : 6', '21 : 3', '54 : 6'] },
        {
          type: 'compare',
          prompt: 'Điền dấu thích hợp vào ô trống:',
          items: [
            { t: '5 m 5 dm □ 505 dm', ans: '<' },
            { t: '8 m 32 cm □ 832 cm', ans: '=' },
            { t: '8 m 35 cm □ 832 cm', ans: '>' },
            { t: '57 hm − 18 hm □ 30 hm', ans: '>' },
          ],
        },
        {
          type: 'mc',
          prompt: 'Khoanh vào chữ cái đặt trước câu trả lời đúng:',
          items: [
            {
              prompt: 'a) Hình bên có:',
              fig: '<svg viewBox="0 0 180 100" width="180" xmlns="http://www.w3.org/2000/svg"><path d="M10 10 L170 10 L170 50 L120 90 L10 90 Z" stroke="#1f2937" stroke-width="2" fill="none"/></svg>',
              options: ['2 góc vuông, 3 góc không vuông', '3 góc vuông, 2 góc không vuông', '4 góc vuông, 1 góc không vuông'],
              ans: 1,
              cols: 1,
            },
            { prompt: 'b) Giá trị của dãy tính 24 : 6 + 36 là:', options: ['40', '30', '10'], ans: 0 },
          ],
        },
      ],
    },
    {
      title: 'Phần II – Tự luận',
      label: 'Câu',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['372 + 136', '694 − 237', '42 × 6', '90 : 3'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['x − 120 = 85', '28 : x = 7'] },
        {
          type: 'word',
          text: 'Một quyển truyện tranh dày 48 trang. An đã đọc được {1/4} số trang đó. Hỏi An đã đọc được bao nhiêu trang?',
          given: ['Quyển truyện dày 48 trang.', 'An đã đọc {1/4} số trang.'],
          ask: 'An đã đọc được bao nhiêu trang?',
          hint: 'Muốn tìm {1/4} của một số thì lấy số đó chia cho 4.',
          sentence: ['An', 'đã đọc được số', 'trang truyện', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 48, op: ':', b: 4, result: 12, unit: 'trang' },
          units: ['trang', 'quyển', 'lần'],
        },
        {
          type: 'fill',
          prompt: 'Viết các số có 3 chữ số mà tổng của 3 chữ số đó bằng 3.',
          items: [{ t: '… … … … … …', ans: [102, 111, 120, 201, 210, 300], anyOrder: true }],
        },
      ],
    },
  ],
};
