/** Đề số 43. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 45. */
export default {
  id: 'de-43',
  title: 'Đề số 43',
  short: 'Đề 43',
  desc: 'Kiểm tra phép tính, so sánh độ dài, chia thành nhóm, vẽ đoạn thẳng',
  review: 'đặt tính, đổi đơn vị đo độ dài và giảm một số đi nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: '',
      questions: [
        {
          type: 'tf',
          prompt: 'Đúng ghi Đ, sai ghi S:',
          items: [
            { col: '527 + 145', res: '662' },
            { col: '555 − 44', res: '115' },
            { col: '14 × 5', res: '70' },
            { div: '54 : 6', q: '9', work: ['54', '0'] },
          ],
          ans: ['S', 'S', 'Đ', 'Đ'],
        },
        {
          type: 'compare',
          prompt: 'Điền dấu >, <, =:',
          items: [
            { t: '5 m 3 cm … 7 m 2 cm', ans: '<' },
            { t: '4 m 7 dm … 470 dm', ans: '<' },
            { t: '6 m 5 cm … 603 m', ans: '<' },
            { t: '2 m 5 cm … 205 cm', ans: '=' },
          ],
        },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['67 + 120', '422 − 114', '24 × 2', '48 : 4'] },
        { type: 'calc', prompt: 'Tính:', items: ['7 × 9 + 18', '15 × 6 − 19'] },
        {
          type: 'word',
          text: 'Cô giáo chia 35 học sinh thành các nhóm, mỗi nhóm có 7 học sinh. Hỏi chia được bao nhiêu nhóm?',
          given: ['Có 35 học sinh.', 'Mỗi nhóm có 7 học sinh.'],
          ask: 'Chia được bao nhiêu nhóm?',
          hint: 'Muốn biết có bao nhiêu nhóm 7 học sinh thì lấy số học sinh chia cho 7.',
          sentence: ['Cô giáo', 'chia được số', 'nhóm là:'],
          decoys: ['mỗi nhóm'],
          expr: { a: 35, op: ':', b: 7, result: 5, unit: 'nhóm' },
          units: ['nhóm', 'học sinh', 'lần'],
        },
        {
          type: 'draw',
          items: [
            { prompt: 'a) Vẽ đoạn thẳng AB dài 9 cm.', name: 'AB', len: 9 },
            { prompt: 'b) Giảm độ dài đoạn thẳng AB đi 3 lần thì được độ dài đoạn thẳng MN. Hãy vẽ đoạn thẳng MN đó.', name: 'MN', len: 3 },
          ],
        },
      ],
    },
  ],
};
