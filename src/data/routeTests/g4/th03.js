/** Kiểm tra tổng hợp 3 (Đề 1): Bài 13–21 Toán 4 (Nhanh 5 + Nhanh 6, ôn Bài 1–12). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l4-th-03',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 3 (Đề 1)',
  short: 'Tổng hợp 3 · Đề 1',
  after: { book: 'tool4', units: '13-21' },
  desc: 'Làm tròn số đến hàng trăm nghìn; so sánh số có nhiều chữ số; dãy số tự nhiên; yến, tạ, tấn; dm², m²; giây, thế kỉ; ôn viết số lớp triệu, đặt tính',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // 3 472 000: chữ số hàng chục nghìn là 7 nên làm tròn lên 3 500 000.
      // Nhiễu: làm tròn xuống (3 400 000), làm tròn đến hàng chục nghìn (3 470 000), đến hàng triệu (3 000 000).
      { type: 'mc', bai: 13, point: 0, level: 1,
        prompt: 'Làm tròn số 3 472 000 đến hàng trăm nghìn thì được số:',
        options: ['3 500 000', '3 400 000', '3 470 000', '3 000 000'], ans: 0 },
      // Ý sai: 5 302 418 bé hơn 5 320 418 (hàng chục nghìn 0 bé hơn 2); 4 060 000 khác 4 600 000 (nhìn lướt các chữ số giống nhau).
      { type: 'tf', bai: 14, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['98 765 bé hơn 102 345.', '5 302 418 lớn hơn 5 320 418.', '700 001 lớn hơn 699 999.', '4 060 000 bằng 4 600 000.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Ôn viết số đến lớp triệu (Bài 12), cần để làm tròn và so sánh. Nhiễu: "linh năm nghìn" viết thành 500 nghìn (20 500 000),
      // thiếu chữ số 0 (2 005 000), đặt 5 vào lớp đơn vị (20 000 005).
      { type: 'mc', bai: 12, point: 1, level: 1, review: true,
        prompt: 'Số "Hai mươi triệu không trăm linh năm nghìn" viết là:',
        options: ['20 005 000', '20 500 000', '2 005 000', '20 000 005'], ans: 0 },
      // Năm 1010 thuộc thế kỉ XI (1001–1100). Năm 2000 vẫn thuộc thế kỉ XX (hay nhầm sang XXI).
      { type: 'match', bai: 19, point: 1, level: 1, multi: true,
        prompt: 'Nối mỗi năm với thế kỉ của năm đó:',
        left: ['Năm 1010 (dời đô về Thăng Long)', 'Năm 1945', 'Năm 2000', 'Năm 2026'],
        right: ['Thế kỉ XX', 'Thế kỉ XI', 'Thế kỉ XXI'],
        ans: [1, 0, 0, 2] },
      // Ba số tự nhiên liên tiếp hơn kém nhau 1. Nhiễu: hơn kém nhau 2 (ba số lẻ liên tiếp), hơn kém nhau 10, nhảy sai hàng (4 100 rồi 4 200).
      { type: 'mc', bai: 15, point: 1, level: 2,
        prompt: 'Dãy nào gồm ba số tự nhiên liên tiếp?',
        options: ['4 099; 4 100; 4 101', '4 099; 4 101; 4 103', '4 090; 4 100; 4 110', '4 099; 4 100; 4 200'], ans: 0 },
      // S = 4 × 4 = 16 dm². Nhiễu: viết đơn vị độ dài (16 dm), lấy 4 + 4 (8 dm²), nhân thừa 10 (160 dm²).
      { type: 'mc', bai: 18, point: 1, level: 2,
        prompt: 'Một viên gạch lát nền hình vuông có cạnh 4 dm. Diện tích viên gạch là:',
        options: ['16 dm²', '16 dm', '8 dm²', '160 dm²'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Ôn đặt tính (Bài 2), dùng khi đổi và tính với đơn vị đo.
      { type: 'calc', bai: 2, point: 1, level: 1, col: true, review: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['45 078 + 36 954', '80 205 − 47 618', '23 146 × 4', '96 852 : 7'] },
      // 1 phút = 60 giây; 1 tấn = 1 000 kg; 1 yến = 10 kg.
      { type: 'fill', bai: [17, 19], point: 0, level: 2,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: '3 phút = … giây', ans: [180] },
          { t: '2 phút 15 giây = … giây', ans: [135] },
          { t: '5 tấn = … kg', ans: [5000] },
          { t: '7 yến 3 kg = … kg', ans: [73] },
        ] },
      // Đổi 3 tấn = 3 000 kg rồi trừ: 3 000 − 850 = 2 150 (kg).
      {
        type: 'word', bai: 17, point: 1, level: 3,
        text: 'Một xe tải chở 3 tấn gạo. Đến cửa hàng thứ nhất, người ta dỡ xuống 850 kg gạo. Hỏi trên xe còn lại bao nhiêu ki-lô-gam gạo?',
        given: ['Xe chở 3 tấn gạo, tức là 3 000 kg.', 'Dỡ xuống 850 kg.'],
        ask: 'Trên xe còn lại bao nhiêu ki-lô-gam gạo?',
        hint: 'Đổi 3 tấn ra ki-lô-gam trước (1 tấn = 1 000 kg), rồi làm phép trừ.',
        sentence: ['Trên xe', 'còn lại', 'số ki-lô-gam gạo', 'là:'],
        decoys: ['tất cả'],
        expr: { a: 3000, op: '−', b: 850, result: 2150, unit: 'kg' },
        units: ['kg', 'tấn', 'tạ'],
      },
      // Bước 1: diện tích phòng 5 × 4 = 20 m²; bước 2: số viên gạch 20 × 4 = 80; bước 3: mua thêm 80 − 70 = 10 viên.
      { type: 'fill', bai: 18, point: 1, level: 3,
        prompt: 'Nền một căn phòng hình chữ nhật dài 5 m, rộng 4 m. Bố lát nền bằng gạch hình vuông cạnh 50 cm, mỗi mét vuông cần 4 viên gạch. Bố đã mua 70 viên gạch. Hỏi bố cần mua thêm bao nhiêu viên gạch nữa?',
        items: [
          { t: 'Diện tích nền phòng: 5 × 4 = … (m²)', ans: [20] },
          { t: 'Số gạch cần để lát nền: … × 4 = … (viên)', ans: [20, 80] },
          { t: 'Bố cần mua thêm: … − 70 = … (viên)', ans: [80, 10] },
        ] },
    ] },
  ],
};
