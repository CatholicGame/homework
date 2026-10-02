/** Đề số 59. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 61. */
export default {
  id: 'de-59',
  title: 'Đề số 59',
  short: 'Đề 59',
  desc: 'Góc vuông, đổi đơn vị đo, phép chia có dư, một phần mấy, gấp lên nhiều lần',
  review: 'góc vuông, phép chia có dư và gấp lên nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'Phần I: Trắc nghiệm',
      label: '',
      questions: [
        {
          type: 'mc',
          prompt: 'Số góc vuông của hình tứ giác bên là:',
          fig: '<svg viewBox="0 0 210 100" width="210" xmlns="http://www.w3.org/2000/svg"><path d="M10 10 L120 10 L200 90 L10 90 Z" stroke="#1f2937" stroke-width="2" fill="none"/></svg>',
          options: ['1', '2', '3', '4'],
          ans: 1,
        },
        { type: 'mc', prompt: '2 hm + 4 dam = ?', options: ['24 m', '204 m', '240 m', '402 m'], ans: 2 },
        { type: 'mc', prompt: 'Trong các phép chia có dư với số chia là 7, số dư lớn nhất của các phép chia đó là:', options: ['7', '8', '5', '6'], ans: 3 },
        // sửa: đề in A. 8m và D. 8m trùng nhau, đổi D thành 9 m.
        { type: 'mc', prompt: '{1/5} của 35 m là:', options: ['8 m', '7 m', '6 m', '9 m'], ans: 1 },
        { type: 'mc', prompt: 'Kết quả của 64 × 3 là:', options: ['192', '182', '172', '162'], ans: 0 },
        {
          type: 'tf',
          prompt: 'Đúng ghi Đ, sai ghi S:',
          items: [
            { div: '48 : 6', q: '8', work: ['48', '0'] },
            { div: '30 : 6', q: '4', work: ['24', '6'] },
          ],
          ans: ['Đ', 'S'],
        },
      ],
    },
    {
      title: 'Phần 2: Tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Tính:', items: ['6 × 3', '6 × 4', '36 : 6', '63 : 7', '4 × 7', '7 × 7', '54 : 6', '56 : 7'] },
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['365 + 418', '628 − 275', '47 × 7', '48 : 4'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['36 : x = 4', 'x : 7 = 4'] },
        {
          type: 'word',
          text: 'Con hái được 17 bông hoa, mẹ hái được gấp 3 lần số bông hoa của con. Hỏi mẹ hái được bao nhiêu bông hoa?',
          given: ['Con hái được 17 bông hoa.', 'Mẹ hái được gấp 3 lần số hoa của con.'],
          ask: 'Mẹ hái được bao nhiêu bông hoa?',
          hint: 'Gấp một số lên 3 lần thì lấy số đó nhân với 3.',
          sentence: ['Mẹ', 'hái được số', 'bông hoa', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 17, op: '×', b: 3, result: 51, unit: 'bông hoa' },
          units: ['bông hoa', 'lần', 'cây'],
        },
      ],
    },
  ],
};
