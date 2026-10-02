/** Đề số 53. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 55. */
export default {
  id: 'de-53',
  title: 'Đề số 53',
  short: 'Đề 53',
  desc: 'Số liền trước, liền sau, gấp và giảm một số lần, một phần mấy, bảng nhân chia 6 và 7',
  review: 'bảng nhân, bảng chia 6 và 7 và một phần mấy',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'Phần I: Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Số liền trước của 150 là:', options: ['151', '140', '149', '160'], ans: 2 },
        { type: 'mc', prompt: 'Số liền sau của 99 là:', options: ['98', '99', '101', '100'], ans: 3 },
        { type: 'mc', prompt: 'Gấp 4 lên 6 lần thì được:', options: ['20', '24', '28', '30'], ans: 1 },
        { type: 'mc', prompt: 'Giảm 42 đi 7 lần thì được:', options: ['8', '7', '6', '5'], ans: 2 },
        { type: 'mc', prompt: '{1/6} của 30 lít là:', options: ['3 lít', '4 lít', '5 lít', '6 lít'], ans: 2 },
        {
          type: 'compare',
          prompt: 'Điền dấu >, <, = thích hợp vào chỗ chấm:',
          items: [
            { t: '6 dm 5 cm … 65 cm', ans: '=' },
            { t: '5 km … 5000 m', ans: '=' },
          ],
        },
      ],
    },
    {
      title: 'Phần II: Tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Tính nhẩm:', items: ['7 × 8', '7 × 6', '6 × 5', '7 × 5', '42 : 6', '49 : 7', '54 : 6', '63 : 7'] },
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['47 × 5', '28 × 3', '60 : 3', '88 : 4'] },
        { type: 'calc', prompt: 'Tính:', items: ['63 : 7 + 30', '7 × 8 − 37'] },
        {
          type: 'word',
          text: 'Cửa hàng có 93 hộp bánh. Cửa hàng đã bán hết {1/3} số hộp bánh đó. Hỏi cửa hàng đã bán được bao nhiêu hộp bánh?',
          given: ['Cửa hàng có 93 hộp bánh.', 'Đã bán {1/3} số hộp bánh.'],
          ask: 'Cửa hàng đã bán được bao nhiêu hộp bánh?',
          hint: 'Muốn tìm {1/3} của một số thì lấy số đó chia cho 3.',
          sentence: ['Cửa hàng', 'đã bán được số', 'hộp bánh', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 93, op: ':', b: 3, result: 31, unit: 'hộp bánh' },
          units: ['hộp bánh', 'cái bánh', 'lần'],
        },
      ],
    },
  ],
};
