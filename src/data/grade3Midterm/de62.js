/** Đề số 62. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 64. */
export default {
  id: 'de-62',
  title: 'Đề số 62',
  short: 'Đề 62',
  desc: 'So sánh số, phép chia có dư, đếm hình tam giác, một phần mấy, tìm x',
  review: 'phép chia có dư, đếm hình và một phần mấy',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: 'Câu',
      questions: [
        { type: 'mc', prompt: 'Trong các số sau: 375, 421, 241, 735. Số bé nhất là:', options: ['375', '735', '421', '241'], ans: 3 },
        { type: 'mc', prompt: '20 : 2 × 3 = … Số cần điền vào chỗ chấm là:', options: ['10', '30', '20', '40'], ans: 1 },
        { type: 'mc', prompt: 'Số dư của phép chia 37 : 5 là:', options: ['1', '2', '3', '4'], ans: 1 },
        { type: 'mc', prompt: '21 : x = 7. Số điền vào chữ x là:', options: ['28', '147', '14', '3'], ans: 3 },
        {
          type: 'mc',
          prompt: 'Số hình tam giác trong hình vẽ trên là:',
          fig: '<svg viewBox="0 0 220 100" width="220" xmlns="http://www.w3.org/2000/svg"><path d="M70 10 L10 90 L210 90 Z M10 90 L150 55.7 M150 55.7 L150 90" stroke="#1f2937" stroke-width="2" fill="none"/></svg>',
          options: ['2 hình', '3 hình', '4 hình', '5 hình'],
          ans: 3,
        },
        { type: 'mc', prompt: 'Có 10 quyển vở, {1/2} số quyển vở là:', options: ['2 quyển vở', '3 quyển vở', '4 quyển vở', '5 quyển vở'], ans: 3 },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['63 × 4', '27 × 6', '86 : 2', '63 : 3'] },
        { type: 'calc', prompt: 'Tính giá trị của biểu thức:', items: ['7 + 6 + 18', '42 : 7 + 5'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['20 : x = 5', 'x × 6 = 42'] },
        {
          type: 'word',
          text: 'Trong vườn có 63 cây ăn quả, {1/9} số cây đó là cây bưởi. Hỏi trong vườn có bao nhiêu cây bưởi?',
          given: ['Vườn có 63 cây ăn quả.', '{1/9} số cây là cây bưởi.'],
          ask: 'Trong vườn có bao nhiêu cây bưởi?',
          hint: 'Muốn tìm {1/9} của một số thì lấy số đó chia cho 9.',
          sentence: ['Trong vườn', 'có số', 'cây bưởi', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 63, op: ':', b: 9, result: 7, unit: 'cây' },
          units: ['cây', 'quả', 'vườn'],
        },
      ],
    },
  ],
};
