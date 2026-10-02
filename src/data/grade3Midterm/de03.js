/** Đề số 3. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 4–5. */
export default {
  id: 'de-03',
  title: 'Đề số 3',
  short: 'Đề 3',
  desc: 'Gấp lên nhiều lần, đổi đơn vị, tính giá trị biểu thức, một phần mấy, tìm X',
  review: 'gấp lên nhiều lần, một phần mấy và tìm X',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'Phần trắc nghiệm',
      label: 'Câu',
      questions: [
        { type: 'mc', prompt: '7 gấp lên 6 lần thì bằng:', options: ['1', '13', '42', '48'], ans: 2 },
        { type: 'mc', prompt: '8 m 2 cm = … cm. Số thích hợp để điền vào chỗ chấm là:', options: ['82', '802', '820', '8200'], ans: 1 },
        { type: 'mc', prompt: 'Kết quả của dãy tính 15 × 4 + 5 là:', options: ['95', '24', '65', '55'], ans: 2 },
        { type: 'mc', prompt: 'Một tuần lễ có 7 ngày, 5 tuần lễ có số ngày là:', options: ['12', '25', '30', '35'], ans: 3 },
        { type: 'mc', prompt: '{1/6} của 48 m là:', options: ['8 m', '42 m', '54 m', '65'], ans: 0 },
        { type: 'mc', prompt: 'Số bảy trăm linh bảy viết là:', options: ['770', '707', '777', '700'], ans: 1 },
      ],
    },
    {
      title: 'Phần tự luận',
      label: 'Câu',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['635 + 218', '426 − 119', '56 × 4', '45 × 6'] },
        { type: 'calc', prompt: 'Tính:', items: ['5 × 5 + 18', '5 × 7 − 23', '7 × 7 × 2'] },
        { type: 'findx', prompt: 'Tìm X, biết:', items: ['84 : X = 2', 'X : 4 = 36'] },
        {
          type: 'word',
          text: 'Đội tuyển học sinh giỏi Trường Tiểu học Kim Đồng có 78 học sinh, trong đó có {1/3} là số học sinh giỏi Toán. Hỏi trường Tiểu học Kim Đồng có bao nhiêu học sinh giỏi Toán?',
          given: ['Đội tuyển có 78 học sinh.', '{1/3} số đó là học sinh giỏi Toán.'],
          ask: 'Trường có bao nhiêu học sinh giỏi Toán?',
          hint: 'Muốn tìm {1/3} của một số thì lấy số đó chia cho 3.',
          sentence: ['Trường Tiểu học Kim Đồng', 'có số', 'học sinh giỏi Toán', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 78, op: ':', b: 3, result: 26, unit: 'học sinh' },
          units: ['học sinh', 'trường', 'lần'],
        },
      ],
    },
  ],
};
