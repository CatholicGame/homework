/** Đề số 35. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 37. */
export default {
  id: 'de-35',
  title: 'Đề số 35',
  short: 'Đề 35',
  desc: 'Bảng nhân, một phần mấy, phép chia có dư, đếm hình tam giác',
  review: 'bảng nhân, một phần mấy và phép chia có dư',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'Phần I: Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: '6 × 7 = … Số cần điền vào dấu ba chấm là:', options: ['13', '42', '32', '41'], ans: 1 },
        { type: 'mc', prompt: '{1/4} của 36 cm là:', options: ['8 cm', '7 cm', '6 cm', '9 cm'], ans: 3 },
        { type: 'mc', prompt: '4 gấp 8 lần là:', options: ['32', '34', '36', '38'], ans: 0 },
        { type: 'mc', prompt: 'Trong phép chia có dư, với số chia là 4 thì số dư lớn nhất trong phép chia đó là:', options: ['2', '1', '3', '5'], ans: 2 },
        {
          type: 'mc',
          prompt: 'Hình bên có bao nhiêu hình tam giác?',
          fig: '<svg viewBox="0 0 220 90" width="220"><polygon points="10,80 70,10 210,80" stroke="#1f2937" stroke-width="2" fill="none"/><line x1="70" y1="10" x2="70" y2="80" stroke="#1f2937" stroke-width="2"/></svg>',
          options: ['1 hình tam giác', '2 hình tam giác', '3 hình tam giác', '4 hình tam giác'],
          ans: 2,
        },
        { type: 'mc', prompt: 'Con 5 tuổi, tuổi mẹ gấp 6 lần tuổi con. Vậy mẹ mấy tuổi?', options: ['11 tuổi', '28 tuổi', '30 tuổi', '35 tuổi'], ans: 2 },
      ],
    },
    {
      title: 'Phần II: Tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['352 + 95', '417 − 98', '26 × 4', '86 : 2'] },
        { type: 'findx', prompt: 'Tìm X:', items: ['X : 4 = 17', '56 : X = 7'] },
        { type: 'calc', prompt: 'Tính:', items: ['4 × 8 + 26', '6 × 6 − 25'] },
        // sửa: đề đánh số câu này là "3." (trùng câu trên), màn hình tự đánh số 4.
        {
          type: 'word',
          text: 'Trong vườn có 35 cây ăn quả, {1/5} số cây đó là cây cam. Hỏi trong vườn có bao nhiêu cây cam?',
          given: ['Vườn có 35 cây ăn quả.', '{1/5} số cây là cây cam.'],
          ask: 'Trong vườn có bao nhiêu cây cam?',
          hint: 'Tìm {1/5} của một số thì lấy số đó chia cho 5.',
          sentence: ['Trong vườn', 'có số', 'cây cam', 'là:'],
          decoys: ['gấp lên'],
          expr: { a: 35, op: ':', b: 5, result: 7, unit: 'cây' },
          units: ['cây', 'quả', 'vườn'],
        },
      ],
    },
  ],
};
