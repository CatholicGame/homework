/** Đề số 14. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 16. */
export default {
  id: 'de-14',
  title: 'Đề số 14',
  short: 'Đề 14',
  desc: 'Tính giá trị biểu thức, đổi đơn vị đo, gấp lên nhiều lần, tính nhẩm, tìm y',
  review: 'đổi đơn vị đo, gấp lên nhiều lần và tìm y',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Trắc nghiệm',
      label: '',
      questions: [
        {
          type: 'tf',
          prompt: 'Đúng ghi Đ, sai ghi S vào ô trống:',
          items: ['7 × 5 + 15 = 50', '6 × 6 + 21 = 47', '1 hm = 10 m', '1 dm = 100 mm'],
          ans: ['Đ', 'S', 'S', 'Đ'],
        },
        {
          type: 'mc',
          prompt: 'Khoanh vào chữ đặt trước câu trả lời đúng:',
          items: [
            { prompt: 'a) Số đã cho là 6, nhiều hơn số đã cho 3 đơn vị là số:', options: ['3', '9', '18', '2'], ans: 1 },
            { prompt: 'b) Số đã cho là 3. Gấp 6 lần số đã cho là số:', options: ['9', '2', '3', '18'], ans: 3 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Viết số thích hợp vào chỗ chấm:',
          items: [
            { t: '2 km = … m', ans: 2000 },
            { t: '7 m = … dm', ans: 70 },
            { t: '3 dam = … m', ans: 30 },
            { t: '5 dm = … mm', ans: 500 },
          ],
        },
      ],
    },
    {
      title: 'II. Tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Tính nhẩm:', items: ['24 : 4', '4 × 5', '0 : 7', '30 : 6'] },
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['248 + 127', '518 − 109', '34 × 7', '93 : 3'] },
        { type: 'findx', prompt: 'Tìm y:', items: ['y − 35 = 46', 'y × 3 = 24', '32 : y = 4'] },
        {
          type: 'word',
          text: 'Cô giáo chia 36 học sinh thành các nhóm, mỗi nhóm có 4 học sinh. Hỏi chia được bao nhiêu nhóm?',
          given: ['Có 36 học sinh.', 'Mỗi nhóm có 4 học sinh.'],
          ask: 'Chia được bao nhiêu nhóm?',
          hint: 'Muốn biết chia được bao nhiêu nhóm thì lấy số học sinh chia cho số học sinh mỗi nhóm.',
          sentence: ['Cô giáo', 'chia được số', 'nhóm', 'là:'],
          decoys: ['mỗi nhóm có'],
          expr: { a: 36, op: ':', b: 4, result: 9, unit: 'nhóm' },
          units: ['nhóm', 'học sinh', 'lần'],
        },
      ],
    },
  ],
};
