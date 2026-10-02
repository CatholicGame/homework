/** Đề số 41. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 43. */
export default {
  id: 'de-41',
  title: 'Đề số 41',
  short: 'Đề 41',
  desc: 'Một phần mấy, đổi đơn vị đo, góc vuông, tìm x, giảm đi một số lần',
  review: 'một phần mấy, góc vuông và giảm một số đi nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: '',
      questions: [
        {
          type: 'fill',
          prompt: 'Điền số thích hợp vào chỗ trống:',
          items: [
            { t: 'a) {1/5} của 15 lít = … lít', ans: 3 },
            { t: 'b) 4 m 4 dm = … dm', ans: 44 },
            { t: 'c) {1/6} của 54 phút = … phút', ans: 9 },
            { t: 'd) 8 cm = … mm', ans: 80 },
          ],
        },
        // bỏ: ý b) "Hãy vẽ thêm 1 đoạn thẳng vào hình bên để trong hình có 4 góc vuông" (không làm được trong app).
        {
          type: 'fill',
          prompt: 'Quan sát hình vẽ bên:',
          fig: '<svg viewBox="0 0 180 130" width="180"><polygon points="10,120 10,35 90,8 170,35 170,120" stroke="#1f2937" stroke-width="2" fill="none"/></svg>',
          items: [
            { t: 'Trong hình vẽ bên có … góc vuông.', ans: 2 },
            { t: 'Trong hình vẽ bên có … góc không vuông.', ans: 3 },
          ],
        },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['487 + 302', '100 − 75', '18 × 5', '84 : 4'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['63 : x = 7', '80 − x = 7'] },
        { type: 'calc', prompt: 'Tính:', items: ['6 × 7 − 36', '42 : 6 + 54'] },
        {
          type: 'word',
          text: 'Buổi sáng, cửa hàng bán được 36 bao gạo. Số gạo bán trong buổi chiều giảm đi 3 lần so với buổi sáng. Hỏi buổi chiều, cửa hàng đó bán được bao nhiêu bao gạo?',
          given: ['Buổi sáng bán được 36 bao gạo.', 'Buổi chiều giảm đi 3 lần so với buổi sáng.'],
          ask: 'Buổi chiều bán được bao nhiêu bao gạo?',
          hint: 'Giảm một số đi 3 lần thì lấy số đó chia cho 3.',
          sentence: ['Buổi chiều', 'cửa hàng bán được', 'số bao gạo là:'],
          decoys: ['tất cả'],
          expr: { a: 36, op: ':', b: 3, result: 12, unit: 'bao gạo' },
          units: ['bao gạo', 'kg', 'lần'],
        },
      ],
    },
  ],
};
