/** Đề số 21. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 23. */

/** Hình chữ nhật 2 × 4 ô, tô các ô có số thứ tự trong `on` (0–3 hàng trên, 4–7 hàng dưới). */
const grid = (on) => {
  let s = '';
  for (let i = 0; i < 8; i++) {
    const x = 4 + (i % 4) * 24, y = 4 + Math.floor(i / 4) * 24;
    s += `<rect x="${x}" y="${y}" width="24" height="24" stroke="#1f2937" stroke-width="2" fill="${on.includes(i) ? '#94a3b8' : 'none'}"/>`;
  }
  return `<svg viewBox="0 0 104 56" width="104">${s}</svg>`;
};

export default {
  id: 'de-21',
  title: 'Đề số 21',
  short: 'Đề 21',
  desc: 'Biểu thức, một phần mấy, đổi đơn vị đo, gấp lên nhiều lần, đặt tính',
  review: 'một phần mấy, đổi đơn vị đo và gấp một số lên nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: 'Bài',
      questions: [
        // sửa: hình D in tô 2 ô trên 8 ô (cũng là {1/4}), tô thêm một ô để chỉ còn hình B đúng.
        {
          type: 'mc',
          prompt: 'Khoanh tròn vào câu trả lời đúng nhất:',
          items: [
            { prompt: 'a) Kết quả của phép tính 5 × 7 + 59 là:', options: ['93', '94', '49', '330'], ans: 1 },
            { prompt: 'b) Chiều dài bước chân em khoảng:', options: ['4 m', '4 dm', '4 cm', '4 mm'], ans: 1 },
            { prompt: 'c) Trong các phép chia dưới đây, phép chia có thương lớn nhất là:', options: ['45 : 5', '40 : 5', '42 : 7', '42 : 6'], ans: 0 },
            { prompt: 'd) Đã tô màu vào {1/4} hình nào?', options: [grid([0]), grid([0, 4]), grid([0, 1, 2, 3]), grid([0, 3, 4])], ans: 1 },
          ],
        },
        {
          type: 'tf',
          prompt: 'Đúng ghi Đ, sai ghi S:',
          items: ['6 km = 6000 m', '7 m = 7000 cm', '5 m 2 dm = 52 dm', '4 km 5 dam = 405 dam'],
          ans: ['Đ', 'S', 'Đ', 'Đ'],
        },
        {
          type: 'fill',
          prompt: 'Viết số thích hợp vào chỗ chấm:',
          items: [
            { t: 'a) Hiện nay em 8 tuổi, tuổi bố gấp 5 lần tuổi em. Hiện nay tuổi của bố là … tuổi.', ans: 40 },
            { t: 'b) {1/5} của 1 m là … cm.', ans: 20 },
          ],
        },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['206 + 139', '453 − 236', '35 × 7', '84 : 4'] },
        { type: 'calc', prompt: 'Tính:', items: ['26 × 7 − 96', '84 : 4 + 125'] },
        {
          type: 'word',
          text: 'Mỗi thùng có 45 quyển sách. Hỏi 6 thùng như thế có tất cả bao nhiêu quyển sách?',
          given: ['Mỗi thùng có 45 quyển sách.', 'Có 6 thùng như thế.'],
          ask: '6 thùng có tất cả bao nhiêu quyển sách?',
          hint: '6 thùng, mỗi thùng 45 quyển, nên lấy 45 nhân với 6.',
          sentence: ['6 thùng', 'có tất cả số', 'quyển sách', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 45, op: '×', b: 6, result: 270, unit: 'quyển sách' },
          units: ['quyển sách', 'thùng', 'lần'],
        },
      ],
    },
  ],
};
