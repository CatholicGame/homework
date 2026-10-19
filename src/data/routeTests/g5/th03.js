/** Kiểm tra tổng hợp 3 (Đề 1): Bài 13–21 Toán 5 (Nhanh 5 + Nhanh 6, ôn Bài 1–12). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l5-th-03',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 3 (Đề 1)',
  short: 'Tổng hợp 3 · Đề 1',
  after: { book: 'tool5', units: '13-21' },
  desc: 'Làm tròn số thập phân; ki-lô-mét vuông, héc-ta; các đơn vị đo diện tích; cộng, trừ, nhân số thập phân; ôn so sánh số thập phân, viết số đo dạng số thập phân',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // 47,62: chữ số hàng phần mười là 6 (≥ 5) nên làm tròn lên 48. Nhiễu: làm tròn xuống (47),
      // làm tròn đến hàng phần mười (47,6), làm tròn đến hàng chục (50).
      { type: 'mc', bai: 13, point: 0, level: 1,
        prompt: 'Làm tròn số 47,62 đến số tự nhiên gần nhất thì được số:',
        options: ['48', '47', '47,6', '50'], ans: 0 },
      // 1 ha là hình vuông cạnh 100 m: 100 × 100 = 10 000 m². Nhiễu: nhầm với 1 000 (như 1 km = 1 000 m),
      // 100 m² (lấy cạnh 100 m), 1 000 000 m² (là 1 km²).
      { type: 'mc', bai: 15, point: 1, level: 1,
        prompt: '1 ha = … m². Số thích hợp điền vào chỗ chấm là:',
        options: ['1 000', '10 000', '100', '1 000 000'], ans: 1 },
      // Ôn so sánh số thập phân (Bài 11), cần để làm tròn. Ý sai: 2,875 < 3,1 (phần nguyên 2 < 3, số nhiều chữ số hơn chưa chắc lớn hơn);
      // 12,08 < 12,1 (hàng phần mười 0 < 1).
      { type: 'tf', bai: 11, point: 3, level: 1, review: true,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['0,9 > 0,45', '2,875 > 3,1', '4,50 = 4,5', '12,08 > 12,1'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 1 dm² = 100 cm² nên 4 dm² 7 cm² = 400 + 7 = 407 cm². Nhiễu: ghép chữ số như độ dài (47), gấp 1 000 (4 007), viết 7 vào hàng chục (470).
      { type: 'mc', bai: 16, point: 1, level: 1,
        prompt: '4 dm² 7 cm² = … cm². Số thích hợp điền vào chỗ chấm là:',
        options: ['47', '4 007', '407', '470'], ans: 2 },
      // Dấu phẩy thẳng dấu phẩy: 4,75 + 23,60 = 28,35. Nhiễu: căn phải như số tự nhiên (475 + 236 → 7,11),
      // quên nhớ sang hàng đơn vị (27,35), đặt dấu phẩy sai chỗ (2,835).
      { type: 'mc', bai: 19, point: 3, level: 2,
        prompt: 'Kết quả của phép cộng 4,75 + 23,6 là:',
        options: ['7,11', '28,35', '27,35', '2,835'], ans: 1 },
      // Ôn viết số đo dạng số thập phân (Bài 12): 75 g = 0,075 kg nên 8 kg 75 g = 8,075 kg.
      // Nhiễu: bỏ chữ số 0 ở hàng phần mười (8,75), dấu phẩy sai chỗ (80,75), đảo chữ số (8,57).
      { type: 'mc', bai: 12, point: 1, level: 2, review: true,
        prompt: 'Một bao gạo cân nặng 8 kg 75 g. Viết số đo đó dưới dạng số thập phân với đơn vị ki-lô-gam:',
        options: ['8,75 kg', '80,75 kg', '8,57 kg', '8,075 kg'], ans: 3 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Cộng, trừ: dấu phẩy thẳng cột (8,5 coi là 8,50; 42,3 coi là 42,30). Nhân: chữ số cuối thẳng cột, đếm chữ số phần thập phân.
      { type: 'calc', bai: [19, 20, 21], point: 0, level: 1, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['35,67 + 8,5', '42,3 − 17,86', '3,75 × 6', '2,6 × 1,4'] },
      // 1 km² = 100 ha; 1 ha = 10 000 m²; m², dm² gấp kém nhau 100 lần (mỗi đơn vị hai chữ số).
      { type: 'fill', bai: [15, 16], point: 2, level: 2,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: '5 km² = … ha', ans: [500] },
          { t: '25 000 m² = … ha', ans: [2.5] },
          { t: '3 m² 6 dm² = … dm²', ans: [306] },
          { t: '1 250 dm² = … m² … dm²', ans: [12, 50] },
        ] },
      // Diện tích hình chữ nhật = dài × rộng: 12,5 × 8 = 100 (m²).
      {
        type: 'word', bai: 21, point: 0, level: 3,
        text: 'Một mảnh vườn hình chữ nhật có chiều dài 12,5 m, chiều rộng 8 m. Tính diện tích mảnh vườn đó.',
        given: ['Chiều dài 12,5 m.', 'Chiều rộng 8 m.'],
        ask: 'Diện tích mảnh vườn là bao nhiêu mét vuông?',
        hint: 'Diện tích hình chữ nhật bằng chiều dài nhân với chiều rộng.',
        sentence: ['Diện tích', 'mảnh vườn', 'đó', 'là:'],
        decoys: ['chu vi'],
        expr: { a: 12.5, op: '×', b: 8, result: 100, unit: 'm²' },
        units: ['m²', 'm', 'kg'],
      },
      // Tiền thịt 260 000 × 1,5 = 390 000; tiền cam 32 000 × 2,5 = 80 000; tổng 470 000; trả lại 500 000 − 470 000 = 30 000 đồng.
      { type: 'fill', bai: 21, point: 0, level: 3,
        prompt: 'Mẹ mua 1,5 kg thịt bò và 2,5 kg cam. 1 kg thịt bò giá 260 000 đồng, 1 kg cam giá 32 000 đồng. Mẹ đưa cô bán hàng 500 000 đồng. Hỏi cô bán hàng trả lại mẹ bao nhiêu tiền?',
        items: [
          { t: 'Tiền mua thịt bò: 260 000 × 1,5 = … (đồng)', ans: [390000] },
          { t: 'Tiền mua cam: 32 000 × 2,5 = … (đồng)', ans: [80000] },
          { t: 'Mẹ phải trả tất cả: 390 000 + 80 000 = … (đồng)', ans: [470000] },
          { t: 'Cô bán hàng trả lại mẹ: 500 000 − … = … (đồng)', ans: [470000, 30000] },
        ] },
    ] },
  ],
};
