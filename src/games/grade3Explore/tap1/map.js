/** Khám phá Toán 3 Tập Một: bài → mục (định dạng ở lessonHelp.js). Nội dung chạy ở ./index.js (tải khi bấm). */

const X = (n, title, extra = {}) => ({ key: `b${n}`, title: `Bài ${n}: ${title}`, ...extra });
const MUL = /×|nhân|gấp|tích/i;
const DIV = /chia|thương|số dư|:\s*\d|\d\s*:/i;
const MASS = /cân|kg|gam|\d\s*g\b/i;
const VOL = /ml|lít|\d\s*l\b|can |chai|hộp sữa/i;
const TEMP = /nhiệt|°C|độ C/i;
const LEN = /mm|mi-li-mét|cm|dài/i;

export const EXPLORE_MAP = {
  1: [X(1, 'Ôn tập các số đến 1 000')],
  2: [X(2, 'Cộng, trừ trong phạm vi 1 000')],
  3: [X(3, 'Tìm thành phần trong phép cộng, phép trừ')],
  4: [{ key: 'b4', title: 'Bài 4: Bảng nhân 2, bảng chia 2' }, { key: 'b4b', title: 'Bài 4: Bảng nhân 5, bảng chia 5' }],
  5: [X(5, 'Bảng nhân 3, bảng chia 3')],
  6: [X(6, 'Bảng nhân 4, bảng chia 4')],
  7: [X(7, 'Đường gấp khúc, ba điểm thẳng hàng', { when: /gấp khúc|thẳng hàng|hình|điểm/i })],
  8: [{ see: 1, when: /thứ tự|lớn nhất|bé nhất|so sánh/i }, { see: 2, when: /đặt tính|học sinh|nhiều hơn|ít hơn|tổng/i }, { see: 6, when: /nhẩm|theo mẫu|cùng kết quả/i }, { see: 3, when: /Số\?/ }, { see: 5, when: /×|nhân|chia|bông hoa|quyển vở|tích/i }],
  9: [X(9, 'Bảng nhân 6, bảng chia 6')],
  10: [X(10, 'Bảng nhân 7, bảng chia 7')],
  11: [X(11, 'Bảng nhân 8, bảng chia 8')],
  12: [X(12, 'Bảng nhân 9, bảng chia 9')],
  13: [X(13, 'Tìm thành phần trong phép nhân, phép chia')],
  14: [X(14, 'Một phần mấy')],
  15: [{ see: 14, when: /phần|tô màu|\d\/\d/i }, { see: 13, when: /Số\?/ }, { see: 9, when: /nhân|chia|nhẩm|li|cam|×/i }, { see: 12, when: /nhân|chia|nhẩm|li|cam|×/i }],
  16: [X(16, 'Điểm ở giữa, trung điểm của đoạn thẳng')],
  17: [X(17, 'Hình tròn. Tâm, bán kính, đường kính')],
  18: [X(18, 'Góc vuông, góc không vuông')],
  19: [X(19, 'Hình tam giác, hình tứ giác. Hình chữ nhật, hình vuông')],
  20: [{ see: 18 }, { see: 17 }, { see: 19 }],
  21: [X(21, 'Khối lập phương, khối hộp chữ nhật')],
  22: [{ see: 16, when: /trung điểm|ở giữa/i }, { see: 19, when: /chữ nhật|hình vuông|tam giác|tứ giác|ao/i }, { see: 21, when: /khối/i }, { see: 17, when: /tròn/i }, { see: 18, when: /góc/i }],
  23: [X(23, 'Nhân số có hai chữ số với số có một chữ số')],
  24: [X(24, 'Gấp một số lên một số lần')],
  25: [X(25, 'Phép chia hết, phép chia có dư')],
  26: [X(26, 'Chia số có hai chữ số cho số có một chữ số')],
  27: [X(27, 'Giảm một số đi một số lần')],
  28: [X(28, 'Bài toán giải bằng hai bước tính')],
  29: [{ see: 26, when: DIV }, { see: 23, when: /×|nhân/i }, { see: 24, when: /gấp/i }, { see: 27, when: /giảm/i }, { see: 28, when: /Hỏi/ }],
  30: [X(30, 'Mi-li-mét')],
  31: [X(31, 'Gam')],
  32: [X(32, 'Mi-li-lít')],
  33: [X(33, 'Nhiệt độ. Đơn vị đo nhiệt độ')],
  34: [{ see: 33, when: TEMP }, { see: 31, when: MASS }, { see: 32, when: VOL }, { see: 30, when: LEN }],
  35: [{ see: 33, when: TEMP }, { see: 31, when: MASS }, { see: 32, when: VOL }, { see: 30, when: LEN }],
  36: [X(36, 'Nhân số có ba chữ số với số có một chữ số')],
  37: [X(37, 'Chia số có ba chữ số cho số có một chữ số')],
  38: [X(38, 'Biểu thức số. Tính giá trị của biểu thức số')],
  39: [X(39, 'So sánh số lớn gấp mấy lần số bé')],
  40: [{ see: 37, when: DIV }, { see: 38, when: /biểu thức/i }, { see: 39, when: /gấp mấy lần/i }, { see: 24, when: /gấp \d+ lần/i }, { see: 36, when: MUL }],
  41: [{ see: 36, when: /×|nhân|xe|gấp/i }, { see: 37, when: /chia|thương|khay|can/i }, { see: 25, when: /ít nhất|số dư/i }],
  42: [{ see: 38 }],
  43: [{ see: 19, when: /hình|góc/i }, { see: 21, when: /khối/i }, { see: 31, when: MASS }, { see: 32, when: VOL }, { see: 30, when: LEN }, { see: 33, when: TEMP }],
  44: [{ see: 37, when: DIV }, { see: 36, when: /×|nhân/i }, { see: 38, when: /biểu thức/i }, { see: 17, when: /tròn|hình chữ nhật/i }, { see: 28, when: /Hỏi/ }],
};
