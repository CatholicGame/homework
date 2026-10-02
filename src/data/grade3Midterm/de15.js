/** Đề số 15. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 17. */
export default {
  id: 'de-15',
  title: 'Đề số 15',
  short: 'Đề 15',
  desc: 'Đọc số, gấp lên nhiều lần, một phần mấy, bảng nhân, bảng chia',
  review: 'bảng nhân, bảng chia và một phần mấy',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'Phần I: Trắc nghiệm',
      label: 'Bài',
      questions: [
        { type: 'mc', prompt: 'Số 981 đọc là:', options: ['Chín trăm tám mươi mốt', 'Chín tám một', 'Chín trăm tám mươi', 'Chín mươi tám'], ans: 0, cols: 2 },
        { type: 'mc', prompt: '8 lít gấp lên 7 lần thì được:', options: ['8 lít + 7 = 15 lít', '8 lít × 7 = 56 lít', '8 lít − 7 = 1 lít', '8 lít × 2 = 16 lít'], ans: 1, cols: 2 },
        { type: 'mc', prompt: '{1/3} của 69 cm là:', options: ['18 cm', '23 cm', '42 cm', '22 cm'], ans: 1 },
      ],
    },
    {
      title: 'Phần II: Tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Tính nhẩm:', items: ['5 × 7', '6 × 6', '3 × 7', '7 × 8', '49 : 7', '54 : 6', '35 : 5', '42 : 6'] },
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['244 + 328', '351 − 105', '56 × 7', '42 : 6'] },
        { type: 'calc', prompt: 'Tính:', items: ['15 × 7 − 59', '93 : 3 + 109'] },
        // sửa: đề in "chiếm sinh của {1/4} tổng số học lớp" (chữ lẫn dòng), viết lại cho đúng câu.
        {
          type: 'word',
          text: 'Một lớp học có 32 học sinh. Số học sinh giỏi của lớp chiếm {1/4} tổng số học sinh của lớp. Hỏi lớp đó có bao nhiêu học sinh giỏi?',
          given: ['Lớp có 32 học sinh.', 'Học sinh giỏi chiếm {1/4} số học sinh của lớp.'],
          ask: 'Lớp đó có bao nhiêu học sinh giỏi?',
          hint: 'Muốn tìm {1/4} của một số thì lấy số đó chia cho 4.',
          sentence: ['Lớp đó', 'có số', 'học sinh giỏi', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 32, op: ':', b: 4, result: 8, unit: 'học sinh' },
          units: ['học sinh', 'lớp', 'lần'],
        },
      ],
    },
  ],
};
