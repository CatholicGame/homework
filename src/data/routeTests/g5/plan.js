/**
 * Lộ trình kiểm tra lớp 5, Học kì I (SGK Toán 5 Kết nối tri thức Tập Một, Bài 1–35; sách trong app: Toán 5 công cụ,
 * khoá sao tool5). Quy tắc: docs/kiem-tra-lo-trinh.md mục 1. Kiến thức từng Bài: src/games/grade5Tools/knowledge.js.
 * Nhanh: khoảng 3 Bài mới. Tổng hợp: hai nhóm nhanh. Giữa kì, cuối kì: cả khoảng từ đầu học kì.
 * Bài 30–35 (Ôn tập học kì 1) không có bài nhanh, do bài cuối kì phủ.
 * Đề của mỗi mục là file cùng tên trong thư mục này (nh01.js…); mục chưa có đề thì chưa hiện.
 */
export const PLAN = {
  book: 'tool5',
  nhanh: [
    { n: 1, units: '1-3', desc: 'Ôn tập số tự nhiên; các phép tính với số tự nhiên; ôn tập phân số' },
    { n: 2, units: '4-6', desc: 'Phân số thập phân; các phép tính với phân số; cộng, trừ hai phân số khác mẫu số' },
    { n: 3, units: '7-9', desc: 'Hỗn số; ôn tập hình học và đo lường' },
    { n: 4, units: '10-12', desc: 'Khái niệm số thập phân; so sánh các số thập phân; viết số đo đại lượng dưới dạng số thập phân' },
    { n: 5, units: '13-18', desc: 'Làm tròn số thập phân; ki-lô-mét vuông, héc-ta; các đơn vị đo diện tích' },
    { n: 6, units: '19-21', desc: 'Phép cộng, phép trừ, phép nhân số thập phân' },
    { n: 7, units: '22-24', desc: 'Phép chia số thập phân; nhân, chia số thập phân với 10; 100; 1 000 hoặc 0,1; 0,01; 0,001' },
    { n: 8, units: '25-29', desc: 'Diện tích hình tam giác, hình thang; chu vi và diện tích hình tròn' },
  ],
  tonghop: [
    { n: 1, units: '1-6', of: [1, 2] },
    { n: 2, units: '7-12', of: [3, 4] },
    { n: 3, units: '13-21', of: [5, 6] },
    { n: 4, units: '22-29', of: [7, 8] },
  ],
  giuaki: [{ n: 1, units: '1-18' }],
  cuoiki: [{ n: 1, units: '1-35' }],
};
