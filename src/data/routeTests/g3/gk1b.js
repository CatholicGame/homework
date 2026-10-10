/** Kiểm tra giữa học kì I (Đề 2): Bài 1–22 Vở BT Toán 3 (Nhanh 1 đến 6). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { geo, polys } from './art.js';

export default {
  id: 'l3-gk-1b',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 2)',
  short: 'Giữa kì I · Đề 2',
  after: { book: 'workbook', units: '1-22' },
  desc: 'So sánh số có ba chữ số; bảng nhân, bảng chia; số bị chia, số chia, thương; một phần mấy; ngày trong tuần; trung điểm, bán kính, đường kính, góc vuông, hình vuông, khối hộp chữ nhật',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: chỉ nhìn hàng đơn vị (589 có 9 lớn nhất), so hàng chục trước (598), chọn số có hàng trăm 8 đứng đầu (859).
      { type: 'mc', bai: 1, point: 3, level: 1,
        prompt: 'Số lớn nhất trong các số 589, 598, 859, 895 là:',
        options: ['589', '598', '859', '895'], ans: 3 },
      // Ý sai: đếm thêm 2 thiếu một lần (2 × 9 là 18), lệch một hàng trong bảng chia 2 (18 : 2 là 9).
      { type: 'tf', bai: 4, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['5 × 8 = 40', '2 × 9 = 16', '35 : 5 = 7', '18 : 2 = 8'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Nhiễu: nhầm sang 7 × 7 (49), 7 × 5 (35), lấy 7 cộng 6 (13).
      { type: 'mc', bai: 10, point: 1, level: 1,
        prompt: 'Kết quả của phép nhân 7 × 6 là:',
        options: ['49', '42', '35', '13'], ans: 1 },
      // 1 trong 3 phần bằng nhau.
      { type: 'pick', bai: 14, point: 1, level: 1,
        prompt: 'Tô màu {1/3} hình tròn dưới đây:',
        shape: 'circle', parts: 3, ans: 1 },
      // Nhiễu: nhầm tên số bị chia, thương, thừa số.
      { type: 'mc', bai: 13, point: 1, level: 1,
        prompt: 'Trong phép chia 42 : 6 = 7, số 6 được gọi là:',
        options: ['số bị chia', 'số chia', 'thương', 'thừa số'], ans: 1 },
      // Ý sai: nghĩ hình chữ nhật cũng có 4 cạnh bằng nhau.
      { type: 'tf', bai: 19, point: 3, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Hình vuông có 4 góc vuông.', 'Hình vuông có 4 cạnh bằng nhau.', 'Hình chữ nhật có 4 cạnh bằng nhau.', 'Hình chữ nhật có 4 góc vuông.'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // Nhiễu: quả bóng (khối cầu), nón lá (khối nón), lon nước (khối trụ).
      { type: 'mc', bai: 21, point: 2, level: 1,
        prompt: 'Đồ vật nào có dạng khối hộp chữ nhật?',
        options: ['Quả bóng', 'Hộp bánh', 'Cái nón lá', 'Lon nước ngọt'], ans: 1 },
      // AM = 2 + 2 = 4 cm = MB. Nhiễu: N là điểm ở giữa A và M nhưng AN không bằng NB.
      { type: 'mc', bai: 16, point: 1, level: 2,
        prompt: 'Điểm nào là trung điểm của đoạn thẳng AB?',
        fig: geo({ pts: { A: [20, 40], N: [100, 40], M: [180, 40], B: [340, 40] }, segs: ['AN', 'NM', 'MB'],
          lens: { AN: '2 cm', NM: '2 cm', MB: '4 cm' }, pos: { A: 's', N: 's', M: 's', B: 's' }, w: 360, h: 70 }),
        options: ['Điểm N', 'Điểm M', 'Không có điểm nào'], ans: 1 },
      // Đường kính gấp 2 lần bán kính: 3 → 6, 6 → 12, 9 → 18, 4 → 8.
      { type: 'match', bai: 17, point: 2, level: 2,
        prompt: 'Nối bán kính của mỗi hình tròn với đường kính của hình tròn đó:',
        left: ['Bán kính 3 cm', 'Bán kính 6 cm', 'Bán kính 9 cm', 'Bán kính 4 cm'],
        right: ['Đường kính 8 cm', 'Đường kính 6 cm', 'Đường kính 12 cm', 'Đường kính 18 cm'], ans: [1, 2, 3, 0] },
      // Góc vuông ở ba đỉnh (10,15), (150,15), (150,105); hai góc còn lại không vuông.
      // Nhiễu: đếm mọi góc (5), nghĩ như hình chữ nhật (4), bỏ sót một góc (2).
      { type: 'mc', bai: 18, point: 2, level: 3,
        prompt: 'Dùng ê ke kiểm tra. Hình bên có mấy góc vuông?',
        fig: polys([{ pts: [[10, 15], [150, 15], [150, 105], [60, 105], [10, 60]], color: '#e0f2fe' }], { w: 160, h: 120, width: 180 }),
        options: ['2 góc', '3 góc', '4 góc', '5 góc'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 1, level: 2,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['467 + 285', '900 − 357', '83 + 649', '615 − 238'] },
      // 45 : 5 = 9; 6 × 7 = 42; 64 : 8 = 8; 54 : 9 = 6.
      { type: 'table', bai: 13, point: 1, level: 3,
        prompt: 'Viết số thích hợp vào ô trống:',
        head: ['Số bị chia', 'Số chia', 'Thương'],
        rows: [[45, 5, '…'], ['…', 7, 6], [64, '…', 8], [54, 9, '…']],
        ans: [[9], [42], [8], [6]] },
      {
        type: 'word', bai: 4, point: 3, level: 2,
        text: 'Bác Ba có 45 quả trứng gà, bác xếp vào các khay, mỗi khay 5 quả. Hỏi bác Ba xếp được bao nhiêu khay trứng?',
        given: ['Có 45 quả trứng gà.', 'Mỗi khay 5 quả.'],
        ask: 'Bác Ba xếp được bao nhiêu khay trứng?',
        hint: 'Chia theo nhóm, mỗi nhóm 5 quả, thì làm phép chia cho 5.',
        sentence: ['Bác Ba', 'xếp được số', 'khay trứng', 'là:'],
        decoys: ['quả trứng'],
        expr: { a: 45, op: ':', b: 5, result: 9, unit: 'khay' },
        units: ['khay', 'quả trứng', 'kg'],
      },
      // Thứ Ba tuần sau: 7 + 7 = 14; thứ Năm tuần sau: 14 + 2 = 16.
      { type: 'fill', bai: 7, point: 3, level: 3,
        prompt: 'Hôm nay là thứ Ba ngày 7. Viết số thích hợp vào chỗ chấm:',
        items: [{ t: 'Thứ Ba tuần sau là ngày …', ans: 14 }, { t: 'Thứ Năm tuần sau là ngày …', ans: 16 }] },
    ] },
  ],
};
