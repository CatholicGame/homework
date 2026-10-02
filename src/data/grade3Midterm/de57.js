/** Đề số 57. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 59. */
export default {
  id: 'de-57',
  title: 'Đề số 57',
  short: 'Đề 57',
  desc: 'Đổi đơn vị đo, giờ và phút, gấp lên nhiều lần, góc vuông, tìm x',
  review: 'đổi đơn vị đo, góc vuông và gấp lên nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: '4 dam 7 m = … m. Số thích hợp viết vào chỗ chấm là:', options: ['407', '47', '470', '7'], ans: 1 },
        { type: 'mc', prompt: '{1/3} giờ = … phút. Số thích hợp viết vào chỗ chấm là:', options: ['12', '15', '20', '30'], ans: 2 },
        { type: 'mc', prompt: 'Đoạn thẳng AB dài 12 cm, đoạn thẳng CD gấp 3 lần đoạn AB. Độ dài đoạn thẳng CD là:', options: ['3', '4', '24', '36'], ans: 3 },
        { type: 'mc', prompt: 'Trong phép chia có số chia là 6, số dư lớn nhất của phép chia đó là:', options: ['5', '6', '7', '8'], ans: 0 },
        {
          type: 'mc',
          prompt: 'Hình bên có mấy góc vuông?',
          fig: '<svg viewBox="0 0 180 80" width="180" xmlns="http://www.w3.org/2000/svg"><path d="M10 10 L150 10 L170 70 L10 70 Z" stroke="#1f2937" stroke-width="2" fill="none"/></svg>',
          options: ['1 góc vuông', '2 góc vuông', '3 góc vuông', '4 góc vuông'],
          ans: 1,
        },
        {
          type: 'compare',
          prompt: 'Điền dấu <, =, > vào ô trống:',
          items: [
            { t: '7 m 4 cm □ 74 m', ans: '<' },
            { t: '6 m 8 dm □ 68 dm', ans: '=' },
          ],
        },
      ],
    },
    {
      title: 'II. Tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['67 + 723', '38 × 7', '859 − 474', '78 : 3'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['57 − x = 19', '48 : x = 6'] },
        { type: 'calc', prompt: 'Tính:', items: ['45 : 5 + 762', '26 × 5 − 34'] },
        {
          type: 'word',
          text: 'Bao gạo thứ nhất cân nặng 66 kg. Bao gạo thứ hai nặng gấp 3 lần bao gạo thứ nhất. Hỏi bao gạo thứ hai cân nặng bao nhiêu ki-lô-gam?',
          given: ['Bao thứ nhất nặng 66 kg.', 'Bao thứ hai nặng gấp 3 lần bao thứ nhất.'],
          ask: 'Bao gạo thứ hai nặng bao nhiêu ki-lô-gam?',
          hint: 'Gấp một số lên 3 lần thì lấy số đó nhân với 3.',
          sentence: ['Bao gạo', 'thứ hai', 'cân nặng', 'là:'],
          decoys: ['thứ nhất'],
          expr: { a: 66, op: '×', b: 3, result: 198, unit: 'kg' },
          units: ['kg', 'bao', 'lần'],
        },
      ],
    },
  ],
};
