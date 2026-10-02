/** Đề số 47. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 49. */
export default {
  id: 'de-47',
  title: 'Đề số 47',
  short: 'Đề 47',
  desc: 'Đọc viết và so sánh số, một phần mấy, biểu thức, chia đều, gấp lên nhiều lần',
  review: 'một phần mấy, tính giá trị biểu thức và gấp một số lên nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: '',
      questions: [
        // sửa: phương án A và C đều in "375", đổi C thành 357.
        { type: 'mc', prompt: 'Số ba trăm bảy mươi lăm viết là:', options: ['375', '573', '357', '30075'], ans: 0 },
        { type: 'mc', prompt: 'Số bé nhất trong các số 395, 389, 383, 401 là:', options: ['395', '389', '383', '401'], ans: 2 },
        { type: 'mc', prompt: '{1/4} của 16 m là … m', options: ['4', '2', '14', '12'], ans: 0 },
        { type: 'mc', prompt: 'Kết quả dãy tính 12 × 7 − 5 là:', options: ['24', '89', '79', '189'], ans: 2 },
        { type: 'mc', prompt: 'Có 63 quả bóng bàn chia đều vào 7 hộp. Mỗi hộp có … quả bóng bàn.', options: ['10', '9', '19', '8'], ans: 1 },
        {
          type: 'compare',
          prompt: 'Điền dấu >, <, = thích hợp vào chỗ chấm:',
          items: [
            { t: '7 dm 9 cm … 79 cm', ans: '=' },
            { t: '6 m 9 dm … 690 dm', ans: '<' },
          ],
        },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['34 × 4', '82 × 3', '96 : 3', '42 : 7'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['x × 6 = 48', '63 : x = 7'] },
        { type: 'calc', prompt: 'Tính:', items: ['47 × 2 − 18', '69 : 3 + 239'] },
        {
          type: 'word',
          text: 'Chị nuôi được 12 con gà, mẹ nuôi được nhiều gấp 3 lần số gà của chị. Hỏi mẹ nuôi được bao nhiêu con gà?',
          given: ['Chị nuôi được 12 con gà.', 'Mẹ nuôi gấp 3 lần số gà của chị.'],
          ask: 'Mẹ nuôi được bao nhiêu con gà?',
          hint: 'Gấp một số lên 3 lần thì lấy số đó nhân với 3.',
          sentence: ['Mẹ', 'nuôi được số', 'con gà là:'],
          decoys: ['còn lại'],
          expr: { a: 12, op: '×', b: 3, result: 36, unit: 'con gà' },
          units: ['con gà', 'lần', 'con vịt'],
        },
      ],
    },
  ],
};
