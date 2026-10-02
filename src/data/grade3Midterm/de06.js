/** Đề số 6. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 8. */
export default {
  id: 'de-06',
  title: 'Đề số 6',
  short: 'Đề 6',
  desc: 'Đổi đơn vị đo, xem giờ, một phần mấy, tìm X, gấp lên nhiều lần',
  review: 'đổi đơn vị đo, một phần mấy và gấp một số lên nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'Phần I: Trắc nghiệm',
      label: 'Câu',
      questions: [
        { type: 'mc', prompt: '1 dam = … m. Số cần điền vào chỗ chấm là:', options: ['10', '1', '100', '20'], ans: 0 },
        { type: 'mc', prompt: '32 : 4 = … Kết quả của phép tính là:', options: ['6', '7', '8', '9'], ans: 2 },
        { type: 'mc', prompt: '20 : 4 × 5 = … Kết quả của phép tính là:', options: ['30', '25', '20', '24'], ans: 1 },
        // sửa: phương án C in "8 2 giờ 30 phút chiều", bỏ số 8 thừa.
        { type: 'mc', prompt: '14 giờ 30 phút hay còn gọi là:', options: ['4 giờ chiều', '2 giờ chiều', '2 giờ 30 phút chiều', '2 giờ'], ans: 2 },
        // sửa: phương án C in "3 2", ghép thành 32.
        { type: 'mc', prompt: '{1/2} của 16 giờ là: … giờ. Số cần điền vào chỗ chấm là:', options: ['6', '8', '32', '14'], ans: 1 },
        { type: 'mc', prompt: '32 : X = 8. Thì X = ?', options: ['3', '4', '5', '6'], ans: 1 },
      ],
    },
    {
      title: 'Phần II. Phần tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['129 + 245', '463 − 138', '36 × 7', '96 : 3'] },
        { type: 'findx', prompt: 'Tìm X:', items: ['27 : X = 3', 'X : 7 = 18'] },
        { type: 'calc', prompt: 'Tính:', items: ['48 × 4 − 29', '77 : 7 + 148'] },
        {
          type: 'word',
          text: 'Lan sưu tầm được 18 con tem, Ngọc sưu tầm được số tem gấp 3 lần số tem của Lan. Hỏi Ngọc sưu tầm được bao nhiêu con tem?',
          given: ['Lan sưu tầm được 18 con tem.', 'Ngọc được gấp 3 lần Lan.'],
          ask: 'Ngọc sưu tầm được bao nhiêu con tem?',
          hint: 'Gấp một số lên 3 lần thì lấy số đó nhân với 3.',
          sentence: ['Ngọc', 'sưu tầm được số', 'con tem', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 18, op: '×', b: 3, result: 54, unit: 'con tem' },
          units: ['con tem', 'bạn', 'lần'],
        },
      ],
    },
  ],
};
