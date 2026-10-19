/** Kiểm tra tổng hợp 3 (Đề 2): Bài 13–21 Toán 5 (Nhanh 5 + Nhanh 6, ôn Bài 1–12). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l5-th-03b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 3 (Đề 2)',
  short: 'Tổng hợp 3 · Đề 2',
  after: { book: 'tool5', units: '13-21' },
  desc: 'Làm tròn đến hàng phần mười; héc-ta và ki-lô-mét vuông; đổi đơn vị diện tích; cộng, trừ, nhân số thập phân; tìm x; ôn so sánh số thập phân, viết số đo dạng số thập phân',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Ôn so sánh số thập phân (Bài 11): phần nguyên 7 bằng nhau, so hàng phần mười: 7,1 có 1 lớn nhất.
      // Nhiễu: chọn số có nhiều chữ số nhất (7,089), số có hàng phần trăm 9 (7,09), số có nhiều chữ số 9 (6,99).
      { type: 'mc', bai: 11, point: 1, level: 1, review: true,
        prompt: 'Số lớn nhất trong các số 7,09; 7,1; 7,089; 6,99 là:',
        options: ['7,09', '7,089', '7,1', '6,99'], ans: 2 },
      // Làm tròn đến hàng phần mười: nhìn chữ số hàng phần trăm. 2,46 → 2,5; 7,349 → 7,3 (chỉ nhìn chữ số 4, không làm tròn hai lần ra 7,4);
      // 6,15 → 6,2; 8,72 → 8,7.
      { type: 'match', bai: 13, point: 1, level: 1,
        prompt: 'Nối mỗi số với số làm tròn đến hàng phần mười của nó:',
        left: ['2,46', '7,349', '6,15', '8,72'],
        right: ['8,7', '2,5', '7,4', '6,2', '7,3'],
        ans: [1, 4, 3, 0] },
      // Ôn viết số đo dạng số thập phân (Bài 12). Ý sai: 2 kg 50 g = 2,050 kg = 2,05 kg (không phải 2,5); 6 dm = 0,6 m (không phải 0,06).
      { type: 'tf', bai: 12, point: 1, level: 1, review: true,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['5 m 7 cm = 5,07 m', '2 kg 50 g = 2,5 kg', '345 g = 0,345 kg', '6 dm = 0,06 m'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 25,9 − 13,84 coi là 25,90 − 13,84 = 12,06. Nhiễu: hạ 4 xuống, không trừ (12,14); quên mượn khi trừ 0 − 4 (12,16); mượn hai lần (11,06).
      { type: 'mc', bai: 20, point: 2, level: 1,
        prompt: 'Kết quả của phép trừ 25,9 − 13,84 là:',
        options: ['12,14', '12,06', '12,16', '11,06'], ans: 1 },
      // 47 × 23 = 1 081; hai thừa số có tất cả 2 chữ số ở phần thập phân nên 4,7 × 2,3 = 10,81.
      // Nhiễu: chỉ tách 1 chữ số (108,1), tách 3 chữ số (1,081), không đặt dấu phẩy (1 081).
      { type: 'mc', bai: 21, point: 3, level: 2,
        prompt: 'Biết 47 × 23 = 1 081. Vậy 4,7 × 2,3 bằng:',
        options: ['108,1', '1,081', '1 081', '10,81'], ans: 3 },
      // 1 km² = 100 ha nên 22 200 ha = 222 km² (Vườn quốc gia Cúc Phương rộng khoảng 22 200 ha).
      // Nhiễu: chia 10 (2 220), chia 1 000 (22,2), nhân 100 (2 220 000).
      { type: 'mc', bai: 15, point: 2, level: 2,
        prompt: 'Vườn quốc gia Cúc Phương có diện tích khoảng 22 200 ha. Diện tích đó bằng khoảng:',
        options: ['222 km²', '2 220 km²', '22,2 km²', '2 220 000 km²'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Dấu phẩy thẳng dấu phẩy; 18 coi là 18,00 khi trừ 6,25.
      { type: 'calc', bai: [19, 20], point: 0, level: 1, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['127,5 + 46,38', '80,4 − 35,76', '18 − 6,25'] },
      // Tìm số hạng: 12,3 − 4,75 = 7,55. Tìm số bị trừ: 15,25 + 8,6 = 23,85.
      { type: 'findx', bai: [19, 20], point: 1, level: 2,
        prompt: 'Tìm x:',
        items: [{ t: 'x + 4,75 = 12,3', ans: 7.55 }, { t: 'x − 8,6 = 15,25', ans: 23.85 }] },
      // Đổi 1 ha 2 500 m² = 12 500 m² rồi cộng: 12 500 + 8 600 = 21 100 (m²).
      {
        type: 'word', bai: [15, 16], point: 0, level: 3,
        text: 'Thửa ruộng thứ nhất có diện tích 1 ha 2 500 m². Thửa ruộng thứ hai có diện tích 8 600 m². Hỏi cả hai thửa ruộng có diện tích bao nhiêu mét vuông?',
        given: ['Thửa thứ nhất 1 ha 2 500 m², tức là 12 500 m².', 'Thửa thứ hai 8 600 m².'],
        ask: 'Cả hai thửa ruộng có diện tích bao nhiêu mét vuông?',
        hint: 'Đổi 1 ha ra mét vuông trước (1 ha = 10 000 m²), rồi làm phép cộng.',
        sentence: ['Cả hai thửa ruộng', 'có diện tích', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 12500, op: '+', b: 8600, result: 21100, unit: 'm²' },
        units: ['m²', 'ha', 'm'],
      },
      // Bốn mảnh: 3,75 × 4 = 15 (m); còn lại 25,5 − 15 = 10,5 (m).
      { type: 'fill', bai: [20, 21], point: 0, level: 3,
        prompt: 'Một tấm vải dài 25,5 m. Người ta cắt ra 4 mảnh, mỗi mảnh dài 3,75 m để may rèm cửa. Hỏi tấm vải còn lại dài bao nhiêu mét?',
        items: [
          { t: 'Bốn mảnh vải dài: 3,75 × 4 = … (m)', ans: [15] },
          { t: 'Tấm vải còn lại dài: 25,5 − … = … (m)', ans: [15, 10.5] },
        ] },
    ] },
  ],
};
