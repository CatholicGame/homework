/** Kiểm tra nhanh 6: Bài 17–21 Toán 4 (yến, tạ, tấn; đề-xi-mét vuông, mét vuông, mi-li-mét vuông; giây, thế kỉ). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l4-nh-06',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 6',
  short: 'Nhanh 6',
  after: { book: 'tool4', units: '17-21' },
  desc: 'Yến, tạ, tấn; đề-xi-mét vuông, mét vuông, mi-li-mét vuông; giây, thế kỉ',
  time: 20,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // 1 tạ = 100 kg. Nhiễu: nhầm với yến (10 kg), nhầm với tấn (1 000 kg).
      { type: 'mc', bai: 17, point: 0, level: 1,
        prompt: 'Một bao thóc cân nặng 1 tạ. Bao thóc đó nặng:',
        options: ['10 kg', '100 kg', '1 000 kg'], ans: 1 },
      // Ý sai: lấy hai chữ số đầu của năm làm thế kỉ (1945 là thế kỉ XX, 1010 là thế kỉ XI).
      { type: 'tf', bai: 19, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Năm 2026 thuộc thế kỉ XXI.', 'Năm 1945 thuộc thế kỉ XIX.', 'Năm 2000 thuộc thế kỉ XX.', 'Năm 1010, vua Lý Thái Tổ dời đô về Thăng Long, thuộc thế kỉ X.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 1 m² = 100 dm² nên 5 m² = 500 dm². Nhiễu: đổi như đơn vị độ dài (50), gấp 1 000 lần (5 000).
      { type: 'mc', bai: 18, point: 0, level: 1,
        prompt: '5 m² = … dm². Số thích hợp viết vào chỗ chấm là:',
        options: ['50', '500', '5 000'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // 3 tấn = 3 000 kg; 4 tạ 5 kg = 405 kg (lỗi hay gặp: 45); 7 yến = 70 kg; 2 500 kg = 25 tạ.
      { type: 'fill', bai: 17, point: 1, level: 2,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: '3 tấn = … kg', ans: 3000 },
          { t: '4 tạ 5 kg = … kg', ans: 405 },
          { t: '7 yến = … kg', ans: 70 },
          { t: '2 500 kg = … tạ', ans: 25 },
        ] },
      // Diện tích hình chữ nhật 12 × 6 = 72 dm²; 1 dm² = 100 cm² nên 72 dm² = 7 200 cm².
      { type: 'fill', bai: 18, point: 1, level: 3,
        prompt: 'Mặt bàn học hình chữ nhật có chiều dài 12 dm, chiều rộng 6 dm. Hỏi diện tích mặt bàn là bao nhiêu đề-xi-mét vuông, bao nhiêu xăng-ti-mét vuông?',
        items: [
          { t: 'Diện tích mặt bàn là: 12 × 6 = … (dm²)', ans: 72 },
          { t: 'Đổi: 72 dm² = … cm²', ans: 7200 },
        ] },
    ] },
  ],
};
