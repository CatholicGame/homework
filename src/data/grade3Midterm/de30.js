/** Đề số 30. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 32. */
export default {
  id: 'de-30',
  title: 'Đề số 30',
  short: 'Đề 30',
  desc: 'Bảng nhân chia, một phần mấy, đổi đơn vị đo, tìm X, biểu thức',
  review: 'bảng nhân, bảng chia và một phần mấy',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: 'Câu',
      questions: [
        { type: 'mc', prompt: 'Kết quả phép tính 7 × 8 là:', options: ['40', '56', '65'], ans: 1 },
        { type: 'mc', prompt: '49 : 7 = … Số cần điền vào chỗ chấm là:', options: ['6', '5', '7'], ans: 2 },
        { type: 'mc', prompt: 'Kết quả phép tính 27 × 6 là:', options: ['162', '216', '126'], ans: 0 },
        { type: 'mc', prompt: '{1/6} của 54 phút là … phút. Số cần điền vào chỗ chấm là:', options: ['6', '9', '7'], ans: 1 },
        { type: 'mc', prompt: '4 m 7 cm = … cm', options: ['470', '740', '407'], ans: 2 },
        // sửa: đề in phương án C là 34 (x : 3 = 18 thì x = 54, không có phương án đúng), sửa C thành 54.
        { type: 'mc', prompt: 'x : 3 = 18 thì x = ?', options: ['15', '21', '54'], ans: 2 },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: 'Câu',
      questions: [
        { type: 'calc', prompt: 'Tính:', col: true, items: ['234 + 432', '652 − 126', '57 × 6', '64 : 2'] },
        { type: 'findx', prompt: 'Tìm X:', items: ['X × 6 = 30', '40 : X = 10'] },
        { type: 'calc', prompt: 'Tính:', items: ['16 × 7 − 38', '96 : 3 + 139'] },
        {
          type: 'word',
          text: 'Trong thùng có 69 lít dầu. Sau khi sử dụng, số dầu còn lại trong thùng bằng {1/3} số dầu đã có. Hỏi trong thùng còn bao nhiêu lít dầu?',
          given: ['Thùng có 69 lít dầu.', 'Số dầu còn lại bằng {1/3} số dầu đã có.'],
          ask: 'Trong thùng còn bao nhiêu lít dầu?',
          hint: 'Muốn tìm {1/3} của một số thì lấy số đó chia cho 3.',
          sentence: ['Trong thùng', 'còn lại số', 'lít dầu', 'là:'],
          decoys: ['đã dùng'],
          expr: { a: 69, op: ':', b: 3, result: 23, unit: 'l' },
          units: ['l', 'kg', 'thùng'],
        },
      ],
    },
  ],
};
