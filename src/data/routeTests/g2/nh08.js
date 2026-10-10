/** Kiểm tra nhanh 8: Bài 29–36 Vở BT Toán 2 (ngày, giờ, phút; ngày, tháng; xem đồng hồ, xem lịch). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { clock, calendar } from './art.js';

export default {
  id: 'l2-nh-08',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 8',
  short: 'Nhanh 8',
  after: { book: 'workbook2', units: '29-36' },
  desc: 'Ngày, giờ, phút; ngày, tháng; xem đồng hồ, xem lịch',
  time: 15,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: đọc đổi hai kim (6 giờ 20 phút), lấy số kim ngắn sắp tới (5 giờ 30 phút), bỏ phút (4 giờ).
      { type: 'mc', bai: 29, point: 2, level: 1,
        prompt: 'Đồng hồ chỉ mấy giờ?', fig: clock(4, 30),
        options: ['4 giờ 30 phút', '6 giờ 20 phút', '5 giờ 30 phút', '4 giờ'], ans: 0 },
      // Nhiễu: lấy chữ số cuối (5 giờ chiều), nhầm buổi (3 giờ sáng).
      { type: 'mc', bai: 29, point: 1, level: 1,
        prompt: '15 giờ còn gọi là:',
        options: ['5 giờ chiều', '3 giờ chiều', '3 giờ sáng', '10 giờ sáng'], ans: 1 },
      { type: 'tf', bai: [29, 30], point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Một tuần lễ có 7 ngày.', 'Tháng nào cũng có 31 ngày.', 'Một ngày có 24 giờ.', '1 giờ = 100 phút.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Tháng 9 năm 2026: ngày 1 là Thứ Ba.
      { type: 'fill', bai: 30, point: 0, level: 2,
        prompt: 'Xem tờ lịch tháng 9 rồi viết vào chỗ chấm:',
        fig: calendar({ month: 9, first: 1, days: 30, mark: [2] }),
        items: [
          { t: 'Ngày 2 tháng 9 là Thứ …', ans: ['Tư'], choices: ['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy'] },
          { t: 'Tháng 9 có … ngày.', ans: 30 },
          { t: 'Thứ Bảy đầu tiên của tháng 9 là ngày …', ans: 5 },
        ] },
      { type: 'fill', bai: [29, 30], point: 2, level: 3,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: 'Hôm nay là Thứ Hai ngày 14. Thứ Hai tuần sau là ngày …', ans: 21 },
          { t: 'Lan đi học lúc 7 giờ, đến trường lúc 7 giờ 15 phút. Lan đi hết … phút.', ans: 15 },
        ] },
    ] },
  ],
};
