/**
 * Khám phá Toán 3 Tập Hai: bài → mục (định dạng ở lessonHelp.js). Nội dung chạy ở ./index.js (tải khi bấm).
 * Bài luyện tập, ôn tập: { see: N, when } lọc theo chữ của câu, để câu nào cũng chỉ hiện Khám phá đúng nội dung.
 */

// Chữ của câu → nội dung (dùng cho bài luyện tập chung, ôn tập).
const ROMAN = /La Mã|[IVX]{2,}/;
const ROUND = /làm tròn/i;
const COMPARE = /&gt;|>|<|lớn nhất|bé nhất|lớn hơn|bé hơn|so sánh|thứ tự/i;
const PERIM = /chu vi|hàng rào|viền|cạnh/i;
const AREA = /diện tích|cm²|ô vuông/i;
const CLOCK = /giờ|phút|đồng hồ/i;
const CAL = /lịch|tháng|ngày|thứ (Hai|Ba|Tư|Năm|Sáu|Bảy)|Chủ nhật/i;
const MONEY = /đồng(?! hồ)|tiền/i;
const MUL = /×|nhân|gấp/i;
const DIV = /\d\s*:\s*\d|chia|giảm đi/i;
const SUB = /−|–|trừ|ít hơn|còn lại/i;
const ADD = /\+|cộng|thêm|tất cả|nhiều hơn/i;
const READ = /đọc|viết số|gồm|hàng (đơn vị|chục|trăm|nghìn)|chữ số|thành tổng|số lớn nhất|số bé nhất/i;
const DATA = /bảng số liệu|số liệu|thống kê/i;
const CHANCE = /chắc chắn|có thể|không thể|khả năng/i;
/** Khớp khi chữ của câu không khớp mẫu nào trong res (Khám phá mặc định của bài ôn tập). */
const none = (...res) => ({ test: (s) => !res.some(r => r.test(s)) });

export const EXPLORE_MAP = {
  45: [{ key: 'b45', title: 'Bài 45: Các số có bốn chữ số. Số 10 000' }],
  46: [{ key: 'b46', title: 'Bài 46: So sánh các số trong phạm vi 10 000' }],
  47: [{ key: 'b47', title: 'Bài 47: Làm quen với chữ số La Mã' }],
  48: [{ key: 'b48', title: 'Bài 48: Làm tròn số đến hàng chục, hàng trăm' }],
  49: [{ see: 47, when: ROMAN }, { see: 48, when: ROUND }, { see: 46, when: COMPARE }, { see: 45, when: none(ROMAN, ROUND, COMPARE) }],
  50: [{ key: 'b50', title: 'Bài 50: Chu vi hình tam giác, hình tứ giác, hình chữ nhật, hình vuông' }],
  51: [{ key: 'b51', title: 'Bài 51: Diện tích của một hình. Xăng-ti-mét vuông' }],
  52: [{ key: 'b52', title: 'Bài 52: Diện tích hình chữ nhật, diện tích hình vuông' }],
  53: [{ see: 50, when: PERIM }, { see: 52, when: AREA }, { see: 51, when: /ô vuông|cm²/ }, { see: 52, when: none(PERIM, AREA) }],
  54: [{ key: 'b54', title: 'Bài 54: Phép cộng trong phạm vi 10 000' }],
  55: [{ key: 'b55', title: 'Bài 55: Phép trừ trong phạm vi 10 000' }],
  56: [{ key: 'b56', title: 'Bài 56: Nhân số có bốn chữ số với số có một chữ số' }],
  57: [{ key: 'b57', title: 'Bài 57: Chia số có bốn chữ số cho số có một chữ số' }],
  58: [{ see: 57, when: DIV }, { see: 56, when: MUL }, { see: 55, when: SUB }, { see: 54, when: ADD }, { see: 56, when: none(DIV, MUL, SUB, ADD) }],
  59: [{ reuse: 'g4:1', title: 'Các số có năm chữ số: bảng hàng, tia số' }],
  60: [{ key: 'b60', title: 'Bài 60: So sánh các số trong phạm vi 100 000' }],
  61: [{ key: 'b61', title: 'Bài 61: Làm tròn số đến hàng nghìn, hàng chục nghìn' }],
  62: [{ see: 61, when: ROUND }, { see: 60, when: COMPARE }, { see: 59, when: none(ROUND, COMPARE) }],
  63: [{ reuse: 'g4:2', title: 'Phép cộng trong phạm vi 100 000' }],
  64: [{ key: 'b64', title: 'Bài 64: Phép trừ trong phạm vi 100 000' }],
  65: [{ see: 64, when: SUB }, { see: 63, when: ADD }, { see: 63, when: none(SUB, ADD) }],
  66: [{ key: 'b66', title: 'Bài 66: Xem đồng hồ', when: CLOCK }, { key: 'b66b', title: 'Bài 66: Tháng – năm', when: CAL }, { key: 'b66', title: 'Bài 66: Xem đồng hồ', when: none(CLOCK, CAL) }],
  67: [{ see: 66 }],
  68: [{ key: 'b68', title: 'Bài 68: Tiền Việt Nam' }],
  69: [{ see: 68, when: MONEY }, { see: 66, when: none(MONEY) }],
  70: [{ key: 'b70', title: 'Bài 70: Nhân số có năm chữ số với số có một chữ số' }],
  71: [{ key: 'b71', title: 'Bài 71: Chia số có năm chữ số cho số có một chữ số' }],
  72: [{ see: 71, when: DIV }, { see: 70, when: MUL }, { see: 64, when: SUB }, { see: 63, when: ADD }, { see: 70, when: none(DIV, MUL, SUB, ADD) }],
  73: [{ key: 'b73', title: 'Bài 73: Thu thập, phân loại, ghi chép số liệu. Bảng số liệu' }],
  74: [{ key: 'b74', title: 'Bài 74: Khả năng xảy ra của một sự kiện' }],
  75: [{ see: 73 }, { see: 74 }],
  76: [{ see: 61, when: ROUND }, { see: 60, when: COMPARE }, { see: 59, when: READ }, { see: 45, when: none(ROUND, COMPARE, READ) }],
  77: [{ see: 64, when: SUB }, { see: 63, when: ADD }, { see: 68, when: MONEY }, { see: 63, when: none(SUB, ADD, MONEY) }],
  78: [{ see: 71, when: DIV }, { see: 70, when: MUL }, { see: 70, when: none(DIV, MUL) }],
  79: [{ see: 52, when: AREA }, { see: 50, when: PERIM }, { see: 66, when: CLOCK }, { see: 68, when: MONEY }, { see: 50, when: none(AREA, PERIM, CLOCK, MONEY) }],
  80: [{ see: 73, when: DATA }, { see: 74, when: CHANCE }, { see: 73, when: none(DATA, CHANCE) }],
  81: [{ see: 71, when: DIV }, { see: 70, when: MUL }, { see: 64, when: SUB }, { see: 63, when: ADD }, { see: 52, when: AREA }, { see: 50, when: PERIM }, { see: 66, when: CLOCK }, { see: 59, when: READ }, { see: 59, when: none(READ, AREA, PERIM, DIV, MUL, SUB, ADD, CLOCK) }],
};
