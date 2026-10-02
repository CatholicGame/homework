/** Đề số 9. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 11. */
export default {
  id: 'de-09',
  title: 'Đề số 9',
  short: 'Đề 9',
  desc: 'Đọc viết số có ba chữ số, một phần mấy, gấp lên nhiều lần, đổi đơn vị, tìm X',
  review: 'đọc viết số, một phần mấy và gấp một số lên nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần I',
      label: '',
      questions: [
        // sửa: đề in lệch chữ cái (b/ nằm sau phương án c), xếp lại theo thứ tự a, b, c, d.
        { type: 'mc', prompt: 'Số 365 đọc là:', options: ['Ba trăm sáu mươi', 'Ba trăm năm mươi sáu', 'Ba trăm sáu mươi lăm', 'Ba trăm linh năm'], ans: 2, cols: 2 },
        { type: 'mc', prompt: 'Số "Chín trăm linh chín" viết là:', options: ['99', '909', '919', '900'], ans: 1 },
        { type: 'mc', prompt: 'Có 24 bông hoa, {1/4} số bông hoa là:', options: ['6 bông hoa', '24 bông hoa', '4 bông hoa', '8 bông hoa'], ans: 0 },
        { type: 'mc', prompt: '12 gấp 2 lần được:', options: ['14', '16', '24', '12'], ans: 2 },
        { type: 'mc', prompt: 'Kết quả của dãy tính: 9 × 5 + 8 là', options: ['53', '48', '117', '40'], ans: 0 },
        { type: 'mc', prompt: '1 m 5 dm bằng:', options: ['15 m', '15 dm', '10 dm', '10 m'], ans: 1 },
      ],
    },
    {
      title: 'II. Phần II',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['312 + 118', '443 − 116', '24 × 3', '96 : 3'] },
        { type: 'findx', prompt: 'Tìm X:', items: ['X × 4 = 32', '27 : X = 3'] },
        { type: 'calc', prompt: 'Tính:', items: ['27 × 3 − 19', '16 × 4 + 98'] },
        {
          type: 'word',
          text: 'Nga hái được 6 bông hoa. Hằng hái được gấp 3 lần số hoa của Nga hái. Hỏi Hằng hái được mấy bông hoa?',
          given: ['Nga hái được 6 bông hoa.', 'Hằng hái được gấp 3 lần Nga.'],
          ask: 'Hằng hái được mấy bông hoa?',
          hint: 'Gấp một số lên 3 lần thì lấy số đó nhân với 3.',
          sentence: ['Hằng', 'hái được số', 'bông hoa', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 6, op: '×', b: 3, result: 18, unit: 'bông hoa' },
          units: ['bông hoa', 'bạn', 'lần'],
        },
      ],
    },
  ],
};
