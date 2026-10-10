/** Kiểm tra tổng hợp 3 (Đề 2): Bài 13–21 Toán 4 (Nhanh 5 + Nhanh 6, ôn Bài 1–12). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l4-th-03b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 3 (Đề 2)',
  short: 'Tổng hợp 3 · Đề 2',
  after: { book: 'tool4', units: '13-21' },
  desc: 'Tìm số lớn nhất; làm tròn số; giây; đổi yến, tạ, tấn ra ki-lô-gam; dãy số tự nhiên; điền dấu so sánh; diện tích m²; ôn chu vi, giá trị biểu thức',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Số có nhiều chữ số hơn thì lớn hơn: 1 002 300. Nhiễu: chọn số có chữ số đầu lớn nhất (987 540), số có nhiều chữ số 9 (978 999), số đứng đầu (879 450).
      { type: 'mc', bai: 14, point: 0, level: 1,
        prompt: 'Số lớn nhất trong các số 879 450; 1 002 300; 987 540; 978 999 là:',
        options: ['1 002 300', '987 540', '978 999', '879 450'], ans: 0 },
      // Ý sai: 2 648 000 có chữ số hàng chục nghìn 4 nên làm tròn xuống 2 600 000; 915 200 có chữ số hàng chục nghìn 1 nên được 900 000.
      { type: 'tf', bai: 13, point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Làm tròn 7 351 000 đến hàng trăm nghìn được 7 400 000.', 'Làm tròn 2 648 000 đến hàng trăm nghìn được 2 700 000.',
          'Làm tròn 486 500 đến hàng chục nghìn được 490 000.', 'Làm tròn 915 200 đến hàng trăm nghìn được 1 000 000.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 1 phút 20 giây = 60 + 20 = 80 giây. Nhiễu: nghĩ 1 phút = 100 giây (120), cộng hai số (21), quên 20 giây (60).
      { type: 'mc', bai: 19, point: 0, level: 1,
        prompt: '1 phút 20 giây = … giây. Số thích hợp điền vào chỗ chấm là:',
        options: ['80', '120', '21', '60'], ans: 0 },
      // 2 yến = 20 kg, 5 tạ = 500 kg, 3 tấn = 3 000 kg, 4 tạ 6 kg = 406 kg (ô 460 kg là lỗi viết 6 vào hàng chục).
      { type: 'match', bai: 17, point: 0, level: 1,
        prompt: 'Nối mỗi ô bên trái với số ki-lô-gam bằng nó:',
        left: ['2 yến', '5 tạ', '3 tấn', '4 tạ 6 kg'],
        right: ['406 kg', '20 kg', '3 000 kg', '500 kg', '460 kg'],
        ans: [1, 3, 2, 0] },
      // Số bé nhất có sáu chữ số là 100 000, số liền trước là 99 999. Nhiễu: lấy số liền sau (100 001), số lớn nhất có sáu chữ số (999 999), chính số đó (100 000).
      { type: 'mc', bai: 15, point: 1, level: 2,
        prompt: 'Trong dãy số tự nhiên, số liền trước của số bé nhất có sáu chữ số là:',
        options: ['99 999', '100 001', '999 999', '100 000'], ans: 0 },
      // Ôn chu vi hình chữ nhật (Bài 4), cần khi học diện tích để không lẫn hai công thức. P = (25 + 16) × 2 = 82 m.
      // Nhiễu: quên nhân 2 (41 m), nhầm sang diện tích 25 × 16 (400 m), bỏ ngoặc 25 + 16 × 2 (57 m).
      { type: 'mc', bai: 4, point: 2, level: 2, review: true,
        prompt: 'Một mảnh vườn hình chữ nhật có chiều dài 25 m, chiều rộng 16 m. Chu vi mảnh vườn là:',
        options: ['82 m', '41 m', '400 m', '57 m'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'compare', bai: 14, point: 1, level: 1,
        prompt: 'Điền dấu >, <, = thích hợp:',
        items: ['689 754 □ 690 001', '4 503 200 □ 4 530 200', '10 000 000 □ 9 999 999', '725 000 □ 700 000 + 25 000'] },
      // Ôn giá trị biểu thức (Bài 2): nhân, chia trước; có ngoặc tính trong ngoặc trước. 30 450; 5 000; 24 000.
      { type: 'calc', bai: 2, point: 3, level: 2, review: true,
        prompt: 'Tính giá trị của biểu thức:',
        items: ['12 450 + 3 600 × 5', { t: '(70 000 − 25 000) : 9', ans: 5000 }, '48 000 : 6 × 3'] },
      // Bước 1: diện tích tấm thảm 3 × 2 = 6 m²; bước 2: phần sàn không có thảm 20 − 6 = 14 m²; đổi 14 m² = 1 400 dm².
      { type: 'fill', bai: 18, point: 1, level: 3,
        prompt: 'Sàn phòng khách nhà Mai có diện tích 20 m². Mẹ trải lên sàn một tấm thảm hình chữ nhật dài 3 m, rộng 2 m. Hỏi phần sàn không có thảm rộng bao nhiêu mét vuông?',
        items: [
          { t: 'Diện tích tấm thảm: 3 × 2 = … (m²)', ans: [6] },
          { t: 'Phần sàn không có thảm: 20 − … = … (m²)', ans: [6, 14] },
          { t: '14 m² = … dm²', ans: [1400] },
        ] },
      // Bước 1: 9 bao xi măng 50 × 9 = 450 kg; bước 2: đã chở 600 + 450 = 1 050 kg; bước 3: còn chở được 2 000 − 1 050 = 950 kg.
      { type: 'fill', bai: 17, point: 1, level: 3,
        prompt: 'Một xe tải chở được nhiều nhất 2 tấn hàng. Trên xe đã có 6 tạ gạo và 9 bao xi măng, mỗi bao nặng 50 kg. Hỏi xe còn chở thêm được nhiều nhất bao nhiêu ki-lô-gam hàng nữa?',
        items: [
          { t: '6 tạ = … kg; 2 tấn = … kg', ans: [600, 2000] },
          { t: '9 bao xi măng nặng: 50 × 9 = … (kg)', ans: [450] },
          { t: 'Xe đã chở: 600 + … = … (kg)', ans: [450, 1050] },
          { t: 'Xe còn chở thêm được: 2 000 − … = … (kg)', ans: [1050, 950] },
        ] },
    ] },
  ],
};
