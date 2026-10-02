/** Đề số 7. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 9. */
export default {
  id: 'de-07',
  title: 'Đề số 7',
  short: 'Đề 7',
  desc: 'Giảm đi nhiều lần, một phần mấy, so sánh số đo độ dài, tìm x, gấp đôi',
  review: 'giảm đi nhiều lần, một phần mấy và so sánh số đo độ dài',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: 'Bài',
      questions: [
        {
          type: 'mc',
          prompt: 'Khoanh tròn chữ đặt trước kết quả đúng:',
          items: [
            { prompt: 'a. 32 giảm 4 lần', options: ['32 − 4 = 28', '32 : 4 = 6', '32 : 4 = 8'], ans: 2 },
            { prompt: 'b. 35 giảm 5 lần', options: ['35 − 5 = 30', '35 : 5 = 7', '35 : 5 = 6'], ans: 1 },
            { prompt: 'c. 24 giảm 3 lần', options: ['24 − 3 = 21', '24 : 3 = 7', '24 : 3 = 8'], ans: 2 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Viết số thích hợp vào chỗ chấm:',
          items: [
            { t: 'a. {1/5} của 40 m là … m', ans: 8 },
            { t: 'b. {1/7} của 35 m là … m', ans: 5 },
          ],
        },
        {
          type: 'compare',
          prompt: 'Điền dấu <, >, = thích hợp vào chỗ chấm:',
          items: [
            { t: '3 m 6 cm … 36 cm', ans: '>' },
            { t: '4 dm 3 cm … 43 cm', ans: '=' },
          ],
        },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['156 + 217', '463 − 118', '45 × 5', '54 : 6'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['x : 6 = 5', 'x × 7 = 70'] },
        { type: 'calc', prompt: 'Tính:', items: ['19 × 4 − 37', '30 : 3 + 125'] },
        {
          type: 'word',
          text: 'Bác An nuôi được 48 con thỏ, bác Tâm nuôi gấp đôi số thỏ của bác An. Hỏi bác Tâm nuôi được bao nhiêu con thỏ?',
          given: ['Bác An nuôi 48 con thỏ.', 'Bác Tâm nuôi gấp đôi bác An.'],
          ask: 'Bác Tâm nuôi được bao nhiêu con thỏ?',
          hint: 'Gấp đôi là gấp lên 2 lần, lấy số đó nhân với 2.',
          sentence: ['Bác Tâm', 'nuôi được số', 'con thỏ', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 48, op: '×', b: 2, result: 96, unit: 'con thỏ' },
          units: ['con thỏ', 'bác', 'lần'],
        },
      ],
    },
  ],
};
