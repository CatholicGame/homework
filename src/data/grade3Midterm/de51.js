/** Đề số 51. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 53. */
export default {
  id: 'de-51',
  title: 'Đề số 51',
  short: 'Đề 51',
  desc: 'Số liền trước, liền sau, gấp và giảm một số lần, bảng nhân chia 6 và 7, một phần mấy',
  review: 'bảng nhân, bảng chia 6 và 7, gấp và giảm một số lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Số liền trước của 150 là:', options: ['151', '140', '149', '160'], ans: 2 },
        { type: 'mc', prompt: 'Số liền sau của 99 là:', options: ['98', '99', '101', '100'], ans: 3 },
        { type: 'mc', prompt: 'Gấp 4 lên 6 lần thì được:', options: ['20', '24', '28', '30'], ans: 1 },
        { type: 'mc', prompt: 'Giảm 42 đi 7 lần thì được:', options: ['8', '7', '6', '5'], ans: 2 },
        { type: 'mc', prompt: 'Mỗi tuần lễ có 7 ngày. Vậy 2 tuần lễ có bao nhiêu ngày?', options: ['12 ngày', '13 ngày', '14 ngày', '15 ngày'], ans: 2 },
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
      title: 'II. Phần tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Tính nhẩm:', items: ['6 × 6', '6 × 9', '7 × 6', '7 × 7', '36 : 6', '54 : 6', '42 : 7', '49 : 7'] },
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['35 × 6', '75 × 3', '55 : 5', '80 : 4'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['3 × x = 93', 'x : 5 = 25'] },
        {
          type: 'word',
          text: 'Một cửa hàng có 30 kg kẹo, buổi sáng cửa hàng đã bán được {1/6} số kẹo đó. Hỏi buổi sáng cửa hàng đó đã bán được bao nhiêu ki-lô-gam kẹo?',
          given: ['Cửa hàng có 30 kg kẹo.', 'Buổi sáng bán {1/6} số kẹo.'],
          ask: 'Buổi sáng bán được bao nhiêu ki-lô-gam kẹo?',
          hint: 'Muốn tìm {1/6} của một số thì lấy số đó chia cho 6.',
          sentence: ['Buổi sáng', 'cửa hàng bán được', 'số kẹo', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 30, op: ':', b: 6, result: 5, unit: 'kg' },
          units: ['kg', 'g', 'gói'],
        },
      ],
    },
  ],
};
