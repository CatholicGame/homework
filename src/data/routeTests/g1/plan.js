/**
 * Lộ trình kiểm tra lớp 1, Tập Một (Vở BT Toán 1 Bài 1–34). Quy tắc: docs/kiem-tra-lo-trinh.md mục 1.
 * Nhanh: khoảng 3 Bài mới. Tổng hợp: hai nhóm nhanh. Giữa kì, cuối kì: cả khoảng từ đầu học kì.
 * Đề của mỗi mục là file cùng tên trong thư mục này (nh01.js…); mục chưa có đề thì chưa hiện.
 */
export const PLAN = {
  book: 'workbook1',
  nhanh: [
    { n: 1, units: '1-5', desc: 'Nhiều hơn, ít hơn; hình vuông, hình tròn, hình tam giác' },
    { n: 2, units: '6-9', desc: 'Các số 1, 2, 3, 4, 5' },
    { n: 3, units: '10-15', desc: 'Bé hơn, lớn hơn, bằng nhau; dấu <, >, =' },
    { n: 4, units: '16-18', desc: 'Các số 6, 7, 8' },
    { n: 5, units: '19-24', desc: 'Các số 9, 0, 10' },
    { n: 6, units: '25-28', desc: 'Phép cộng trong phạm vi 3, 4' },
    { n: 7, units: '29-34', desc: 'Phép cộng trong phạm vi 5, số 0 trong phép cộng, phép trừ trong phạm vi 3' },
  ],
  tonghop: [
    { n: 1, units: '1-9', of: [1, 2] },
    { n: 2, units: '10-18', of: [3, 4] },
    { n: 3, units: '19-28', of: [5, 6] },
  ],
  giuaki: [{ n: 1, units: '1-24' }],
  cuoiki: [{ n: 1, units: '1-34' }],
};
