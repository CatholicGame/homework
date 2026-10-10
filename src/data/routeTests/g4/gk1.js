/** Kiểm tra giữa học kì I (Đề 1): Bài 1–21 Toán 4 (Nhanh 1 đến 6). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { protractor, angles } from './art.js';

export default {
  id: 'l4-gk-1',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 1)',
  short: 'Giữa kì I · Đề 1',
  after: { book: 'tool4', units: '1-21' },
  desc: 'Số đến lớp triệu; các phép tính trong phạm vi 100 000; biểu thức chứa chữ; bài toán ba bước; đo góc, góc tù; làm tròn, so sánh số; yến, tạ, tấn; mét vuông; giây, thế kỉ',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: bỏ chữ số 0 của hàng chục nghìn (37 215), đổi chỗ 0 và 7 (370 215), viết rời "ba trăm" và "linh bảy nghìn" (3 007 215).
      { type: 'mc', bai: 10, point: 1, level: 1,
        prompt: 'Số "ba trăm linh bảy nghìn hai trăm mười lăm" viết là:',
        options: ['37 215', '307 215', '370 215', '3 007 215'], ans: 1 },
      // 2 573 104: chữ số 5 ở hàng trăm nghìn. Nhiễu: lấy chữ số (5), lệch một hàng (50 000), nhầm sang hàng triệu (5 000 000).
      { type: 'mc', bai: 12, point: 2, level: 1,
        prompt: 'Chữ số 5 trong số 2 573 104 có giá trị là:',
        options: ['5', '500 000', '50 000', '5 000 000'], ans: 1 },
      // Ý sai: nhầm 1 tạ = 10 kg (là 1 yến), nhầm 1 tạ = 100 yến (đúng là 10 yến).
      { type: 'tf', bai: 17, point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['1 yến = 10 kg', '1 tạ = 10 kg', '1 tấn = 1 000 kg', '1 tạ = 100 yến'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Cạnh OB ở giữa vạch 60° và 70°. Nhiễu: lấy 180° − 65° (115°), đọc lệch sang vạch số gần nhất (60°, 70°).
      { type: 'mc', bai: 7, point: 1, level: 1,
        prompt: 'Đặt thước đo góc như hình. Góc AOB có số đo là:',
        fig: protractor(65),
        options: ['65°', '115°', '60°', '70°'], ans: 0 },
      // Nhiễu: góc nhọn (Góc 1), góc vuông (Góc 2), góc bẹt (Góc 4) vì "trông to nhất".
      { type: 'mc', bai: 8, point: 0, level: 1,
        prompt: 'Góc nào là góc tù?',
        fig: angles([
          { v: 'O', a: 'A', b: 'B', deg: 50, label: 'Góc 1' },
          { v: 'E', a: 'G', b: 'H', deg: 90, label: 'Góc 2' },
          { v: 'K', a: 'M', b: 'N', deg: 130, label: 'Góc 3' },
          { v: 'P', a: 'Q', b: 'R', deg: 180, label: 'Góc 4' },
        ], { cell: 180 }),
        options: ['Góc 1', 'Góc 2', 'Góc 3', 'Góc 4'], ans: 2 },
      // Mỗi đơn vị diện tích liền nhau gấp 100 lần.
      { type: 'match', bai: 18, point: 0, level: 1,
        prompt: 'Nối hai số đo bằng nhau:',
        left: ['3 m²', '5 dm²', '2 cm²', '7 m²'],
        right: ['200 mm²', '300 dm²', '500 cm²', '700 dm²'], ans: [1, 2, 0, 3] },
      // Chữ số hàng chục nghìn là 5 nên làm tròn lên 3 500 000.
      // Nhiễu: làm tròn xuống (3 400 000), làm tròn đến hàng chục nghìn (3 460 000), đến hàng triệu (3 000 000).
      { type: 'mc', bai: 13, point: 0, level: 1,
        prompt: 'Làm tròn số 3 458 921 đến hàng trăm nghìn thì được số:',
        options: ['3 400 000', '3 500 000', '3 460 000', '3 000 000'], ans: 1 },
      // Ý sai: nhầm 1 thế kỉ = 10 năm; lấy hai chữ số đầu của năm 1945 làm thế kỉ (19 → XIX, đúng là XX).
      { type: 'tf', bai: 19, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['1 phút = 60 giây', '1 thế kỉ = 10 năm', 'Năm 2026 thuộc thế kỉ XXI.', 'Năm 1945 thuộc thế kỉ XIX.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 125 × 4 + 30 = 530. Nhiễu: cộng trước (125 × 34 = 4 250), quên cộng 30 (500), cộng cả ba số (159).
      { type: 'mc', bai: 4, point: 0, level: 2,
        prompt: 'Giá trị của biểu thức 125 × m + 30 với m = 4 là:',
        options: ['530', '4 250', '500', '159'], ans: 0 },
      // Số bé nhất: chữ số 0 không đứng đầu nên 3 đứng đầu, rồi 0, 5, 7, 9: 30 579.
      // Nhiễu: không dám đặt 0 ở hàng nghìn (35 079), lập số lớn nhất (97 530), đảo hai chữ số cuối (30 597).
      { type: 'mc', bai: 14, point: 1, level: 3,
        prompt: 'Dùng cả năm chữ số 0, 3, 5, 7, 9 (mỗi chữ số dùng một lần) viết số bé nhất có năm chữ số. Số đó là:',
        options: ['30 579', '35 079', '97 530', '30 597'], ans: 0 },
      // 3 tấn = 3 000 kg, 8 tạ = 800 kg, còn 2 200 kg.
      // Nhiễu: coi 8 tạ là 8 kg (2 992 kg), coi 8 tạ là 80 kg (2 920 kg), đổi ra tạ rồi quên đổi sang ki-lô-gam (30 tạ − 8 tạ = 22 tạ, ghi 22 kg).
      { type: 'mc', bai: 17, point: 1, level: 3,
        prompt: 'Một xe tải chở 3 tấn gạo. Người ta dỡ xuống 8 tạ gạo. Trên xe còn lại bao nhiêu ki-lô-gam gạo?',
        options: ['2 200 kg', '2 992 kg', '2 920 kg', '22 kg'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 0, level: 2, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['47 826 + 35 419', '90 312 − 46 785', '23 507 × 3', '58 464 : 6'] },
      { type: 'compare', bai: 14, point: 1, level: 2,
        prompt: 'Điền dấu >, <, = thích hợp:',
        items: ['689 245 □ 698 245', '1 000 000 □ 999 999', '75 302 □ 75 000 + 302', '420 615 □ 402 651'] },
      {
        type: 'word', bai: 2, point: 1, level: 2,
        text: 'Mỗi ngày một nhà máy sản xuất được 1 875 hộp sữa. Hỏi trong 4 ngày nhà máy đó sản xuất được bao nhiêu hộp sữa?',
        given: ['Mỗi ngày sản xuất 1 875 hộp sữa.', 'Sản xuất trong 4 ngày.'],
        ask: '4 ngày sản xuất được bao nhiêu hộp sữa?',
        hint: '4 ngày, mỗi ngày 1 875 hộp thì lấy 1 875 nhân với 4.',
        sentence: ['Trong 4 ngày', 'nhà máy sản xuất được', 'số hộp sữa', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 1875, op: '×', b: 4, result: 7500, unit: 'hộp sữa' },
        units: ['hộp sữa', 'ngày', 'kg'],
      },
      // 2 tạ = 200 kg; dưa chuột 200 × 3 = 600 kg; cả hai 800 kg; còn 800 − 450 = 350 kg.
      { type: 'fill', bai: [5, 17], point: 1, level: 3,
        prompt: 'Bác Hà thu hoạch được 2 tạ cà chua. Số dưa chuột thu hoạch được gấp 3 lần số cà chua. Bác đã bán 450 kg cà chua và dưa chuột. Hỏi bác Hà còn lại bao nhiêu ki-lô-gam cà chua và dưa chuột?',
        items: [
          { t: 'Đổi: 2 tạ = … kg', ans: [200] },
          { t: 'Số dưa chuột thu hoạch được: 200 × 3 = … (kg)', ans: [600] },
          { t: 'Cả cà chua và dưa chuột: 200 + 600 = … (kg)', ans: [800] },
          { t: 'Bác Hà còn lại: 800 − 450 = … (kg)', ans: [350] },
        ] },
    ] },
  ],
};
