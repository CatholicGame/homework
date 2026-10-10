/**
 * Lộ trình kiểm tra lớp 2, Học kì I (Vở BT Toán 2 Tập Một, Bài 1–36). Quy tắc: docs/kiem-tra-lo-trinh.md mục 1.
 * Nhanh: khoảng 3 Bài mới. Tổng hợp: hai nhóm nhanh. Giữa kì, cuối kì: cả khoảng từ đầu học kì.
 * Đề của mỗi mục là file cùng tên trong thư mục này (nh01.js…); mục chưa có đề thì chưa hiện.
 */
export const PLAN = {
  book: 'workbook2',
  nhanh: [
    { n: 1, units: '1-3', desc: 'Số đến 100, tia số, số liền trước, số liền sau; số hạng, tổng, số bị trừ, số trừ, hiệu' },
    { n: 2, units: '4-6', desc: 'Hơn, kém nhau bao nhiêu; cộng, trừ không nhớ trong phạm vi 100' },
    { n: 3, units: '7-10', desc: 'Phép cộng qua 10, bảng cộng; bài toán thêm, bớt' },
    { n: 4, units: '11-14', desc: 'Phép trừ qua 10, bảng trừ; bài toán nhiều hơn, ít hơn' },
    { n: 5, units: '15-18', desc: 'Ki-lô-gam, lít' },
    { n: 6, units: '19-24', desc: 'Phép cộng, phép trừ có nhớ trong phạm vi 100' },
    { n: 7, units: '25-28', desc: 'Điểm, đoạn thẳng, đường thẳng, đường gấp khúc, hình tứ giác' },
    { n: 8, units: '29-36', desc: 'Ngày, giờ, phút; ngày, tháng; xem đồng hồ, xem lịch' },
  ],
  tonghop: [
    { n: 1, units: '1-6', of: [1, 2] },
    { n: 2, units: '7-14', of: [3, 4] },
    { n: 3, units: '15-24', of: [5, 6] },
    { n: 4, units: '25-36', of: [7, 8] },
  ],
  giuaki: [{ n: 1, units: '1-18' }],
  cuoiki: [{ n: 1, units: '1-36' }],
};
