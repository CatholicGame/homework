/** Đề số 65. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 68. */
export default {
  id: 'de-65',
  title: 'Đề số 65',
  short: 'Đề 65',
  desc: 'Cấu tạo số, số liền trước, số tròn trăm, nhân chia trong bảng, tìm X, bài toán nhiều hơn',
  review: 'cấu tạo số có ba chữ số, tìm X và bài toán nhiều hơn',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'A. PHẦN TRẮC NGHIỆM',
      label: 'Câu',
      questions: [
        { type: 'mc', prompt: 'Số gồm có 9 trăm và 9 đơn vị là số:', options: ['909', '99', '990', '999'], ans: 0 },
        // sửa: đề in "Bình tính 0 : 7 × 1", bỏ chữ "Bình" thừa.
        { type: 'mc', prompt: 'Tính 0 : 7 × 1 có kết quả là?', options: ['7', '1', '0', '10'], ans: 2 },
        { type: 'mc', prompt: 'Số liền trước số 300 là:', options: ['200', '299', '400', '301'], ans: 1 },
        // sửa: đề in "Số tròn trăm lớn hơn 500" (có cả 4 số và 5 số nếu tính 1000 trong phương án), thêm "có ba chữ số" để chỉ còn 600, 700, 800, 900.
        { type: 'mc', prompt: 'Số tròn trăm có ba chữ số lớn hơn 500 có tất cả:', options: ['2 số', '5 số', '3 số', '4 số'], ans: 3 },
      ],
    },
    {
      title: 'B. PHẦN TỰ LUẬN',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['701 − 490', '211 + 569', '29 × 7', '36 : 5'] },
        { type: 'calc', prompt: 'Tính:', items: ['7 × 9 + 308', '36 : 3 × 6'] },
        { type: 'findx', prompt: 'Tìm X:', items: ['X : 7 = 14', 'X × 6 = 36'] },
        {
          type: 'word',
          text: 'Khối lớp Ba có 250 học sinh. Khối lớp Hai có 225 học sinh. Hỏi khối lớp Ba có nhiều hơn khối lớp Hai bao nhiêu học sinh?',
          given: ['Khối lớp Ba có 250 học sinh.', 'Khối lớp Hai có 225 học sinh.'],
          ask: 'Khối lớp Ba nhiều hơn khối lớp Hai bao nhiêu học sinh?',
          hint: 'Muốn biết nhiều hơn bao nhiêu thì lấy số lớn trừ đi số bé.',
          sentence: ['Khối lớp Ba', 'có nhiều hơn khối lớp Hai', 'số học sinh', 'là:'],
          decoys: ['tất cả'],
          expr: { a: 250, op: '−', b: 225, result: 25, unit: 'học sinh' },
          units: ['học sinh', 'khối', 'lớp'],
        },
        {
          type: 'fill',
          prompt: 'Tính hiệu, biết số bị trừ là số lớn nhất có ba chữ số và số trừ là 900.',
          items: [
            { t: 'Số bị trừ là: …', ans: 999 },
            { t: 'Hiệu là: …', ans: 99 },
          ],
        },
      ],
    },
  ],
};
