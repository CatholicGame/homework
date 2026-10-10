/**
 * Lộ trình kiểm tra lớp 3, Học kì I (Vở BT Toán 3 Tập Một, Bài 1–44). Quy tắc: docs/kiem-tra-lo-trinh.md mục 1.
 * Nhanh: khoảng 3 Bài mới. Tổng hợp: hai nhóm nhanh. Giữa kì, cuối kì: cả khoảng từ đầu học kì.
 * Nhanh 11 (Bài 38–44) không đủ cặp nên do bài cuối kì phủ.
 * Đề của mỗi mục là file cùng tên trong thư mục này (nh01.js…); mục chưa có đề thì chưa hiện.
 */
export const PLAN = {
  book: 'workbook',
  nhanh: [
    { n: 1, units: '1-3', desc: 'Số đến 1 000; cộng, trừ trong phạm vi 1 000; tìm số hạng, số bị trừ, số trừ' },
    { n: 2, units: '4-8', desc: 'Bảng nhân, bảng chia 2, 3, 4, 5; ôn hình học và đo lường' },
    { n: 3, units: '9-12', desc: 'Bảng nhân, bảng chia 6, 7, 8, 9' },
    { n: 4, units: '13-15', desc: 'Tìm thừa số, số bị chia, số chia; một phần mấy' },
    { n: 5, units: '16-18', desc: 'Trung điểm của đoạn thẳng; hình tròn, tâm, bán kính, đường kính; góc vuông' },
    { n: 6, units: '19-22', desc: 'Hình tam giác, hình tứ giác, hình chữ nhật, hình vuông; vẽ hình; khối lập phương, khối hộp chữ nhật' },
    { n: 7, units: '23-25', desc: 'Nhân số có hai chữ số với số có một chữ số; gấp lên một số lần; chia hết, chia có dư' },
    { n: 8, units: '26-29', desc: 'Chia số có hai chữ số cho số có một chữ số; giảm đi một số lần; bài toán hai bước tính' },
    { n: 9, units: '30-35', desc: 'Mi-li-mét, gam, mi-li-lít, nhiệt độ' },
    { n: 10, units: '36-37', desc: 'Nhân, chia số có ba chữ số với (cho) số có một chữ số' },
    { n: 11, units: '38-44', desc: 'Biểu thức số; so sánh số lớn gấp mấy lần số bé; ôn hình học và đo lường' },
  ],
  tonghop: [
    { n: 1, units: '1-8', of: [1, 2] },
    { n: 2, units: '9-15', of: [3, 4] },
    { n: 3, units: '16-22', of: [5, 6] },
    { n: 4, units: '23-29', of: [7, 8] },
    { n: 5, units: '30-37', of: [9, 10] },
  ],
  giuaki: [{ n: 1, units: '1-22' }],
  cuoiki: [{ n: 1, units: '1-44' }],
};
