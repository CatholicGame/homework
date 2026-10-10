/**
 * Lộ trình kiểm tra lớp 4, Học kì I (SGK Toán 4 Kết nối tri thức Tập Một, Bài 1–37; sách trong app: Toán 4 công cụ,
 * khoá sao tool4). Quy tắc: docs/kiem-tra-lo-trinh.md mục 1. Kiến thức từng Bài: src/games/grade4Tools/knowledge.js.
 * Nhanh: khoảng 3 Bài mới. Tổng hợp: hai nhóm nhanh. Giữa kì, cuối kì: cả khoảng từ đầu học kì.
 * Bài 33–37 (Ôn tập học kì 1) không có bài nhanh, do bài cuối kì phủ.
 * Đề của mỗi mục là file cùng tên trong thư mục này (nh01.js…); mục chưa có đề thì chưa hiện.
 */
export const PLAN = {
  book: 'tool4',
  nhanh: [
    { n: 1, units: '1-3', desc: 'Số đến 100 000; các phép tính trong phạm vi 100 000; số chẵn, số lẻ' },
    { n: 2, units: '4-6', desc: 'Biểu thức chứa chữ; giải bài toán có ba bước tính' },
    { n: 3, units: '7-9', desc: 'Đo góc, đơn vị đo góc; góc nhọn, góc tù, góc bẹt' },
    { n: 4, units: '10-12', desc: 'Số có sáu chữ số, số 1 000 000; hàng và lớp; các số trong phạm vi lớp triệu' },
    { n: 5, units: '13-16', desc: 'Làm tròn số đến hàng trăm nghìn; so sánh các số có nhiều chữ số; dãy số tự nhiên' },
    { n: 6, units: '17-21', desc: 'Yến, tạ, tấn; đề-xi-mét vuông, mét vuông, mi-li-mét vuông; giây, thế kỉ' },
    { n: 7, units: '22-26', desc: 'Cộng, trừ các số có nhiều chữ số; tính chất giao hoán, kết hợp; tổng và hiệu' },
    { n: 8, units: '27-32', desc: 'Hai đường thẳng vuông góc, song song; hình bình hành, hình thoi' },
  ],
  tonghop: [
    { n: 1, units: '1-6', of: [1, 2] },
    { n: 2, units: '7-12', of: [3, 4] },
    { n: 3, units: '13-21', of: [5, 6] },
    { n: 4, units: '22-32', of: [7, 8] },
  ],
  giuaki: [{ n: 1, units: '1-21' }],
  cuoiki: [{ n: 1, units: '1-37' }],
};
