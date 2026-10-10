/** Kiểm tra cuối học kì I (Đề 1): Bài 1–36 Vở BT Toán 2 (Nhanh 1 đến 8). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { clock, geo, balance, calendar } from './art.js';

export default {
  id: 'l2-ck-1',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 1)',
  short: 'Cuối kì I · Đề 1',
  after: { book: 'workbook2', units: '1-36' },
  desc: 'Xem đồng hồ, xem lịch; cộng, trừ có nhớ trong phạm vi 100; ba điểm thẳng hàng, đường gấp khúc; ki-lô-gam; hơn kém nhau bao nhiêu',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: đọc số kim dài chỉ (12 giờ), nhầm kim ngắn sang số đối diện (3 giờ), thêm phút tuỳ ý (9 giờ 30 phút).
      { type: 'mc', bai: 29, point: 2, level: 1,
        prompt: 'Đồng hồ chỉ mấy giờ?',
        fig: clock(9, 0),
        options: ['9 giờ', '12 giờ', '3 giờ', '9 giờ 30 phút'], ans: 0 },
      // Nhiễu: số liền trước (88), thêm 1 chục (99), quên nhớ sang hàng chục (80).
      { type: 'mc', bai: 2, point: 1, level: 1,
        prompt: 'Số liền sau của 89 là:',
        options: ['88', '90', '99', '80'], ans: 1 },
      { type: 'pick', bai: 7, point: 0, level: 1,
        prompt: 'Khoanh vào số ngôi sao bằng kết quả của phép tính 8 + 5:',
        icon: 'star', count: 16, cols: 8, ans: 13 },
      // Ý sai: điểm D không nằm trên đoạn thẳng AC.
      { type: 'tf', bai: 25, point: 3, level: 1,
        prompt: 'Nhìn hình rồi đúng ghi Đ, sai ghi S:',
        fig: geo({ pts: { A: [30, 100], B: [140, 100], C: [250, 100], D: [140, 34] }, segs: ['AC'], pos: { A: 's', B: 's', C: 's' }, h: 130 }),
        items: ['Ba điểm A, B, C thẳng hàng.', 'Ba điểm A, D, C thẳng hàng.', 'Điểm B nằm trên đoạn thẳng AC.'],
        ans: ['Đ', 'S', 'Đ'] },
      // Nhiễu: nhầm số trừ với số bị trừ, với hiệu, dùng tên của phép cộng (số hạng).
      { type: 'mc', bai: 3, point: 1, level: 1,
        prompt: 'Trong phép trừ 64 − 20 = 44, số 20 gọi là:',
        options: ['Số bị trừ', 'Số trừ', 'Hiệu', 'Số hạng'], ans: 1 },
      { type: 'match', bai: [8, 12], point: 0, level: 1,
        prompt: 'Nối phép tính với kết quả đúng:',
        left: ['9 + 7', '15 − 8', '6 + 5', '13 − 9'],
        right: ['11', '4', '16', '7'], ans: [2, 3, 0, 1] },
      // Nhiễu: quên nhớ 1 sang hàng chục (43), viết cả 13 xuống (413), đếm thêm thiếu một (52).
      { type: 'mc', bai: 19, point: 2, level: 1,
        prompt: 'Kết quả của phép tính 46 + 7 là:',
        options: ['53', '43', '413', '52'], ans: 0 },
      { type: 'match', bai: [15, 16], point: 1, level: 1,
        prompt: 'Nối mỗi câu với đơn vị thích hợp:',
        left: ['Bao gạo cân nặng 25 …', 'Can dầu đựng 5 …', 'Thùng nước đựng 20 …', 'Quả dưa hấu cân nặng 3 …'],
        right: ['kg', 'l'], ans: [0, 1, 1, 0], multi: true },
      // Nhiễu: lấy 5 trừ 2 (3 kg), ghép hai số (52 kg), chỉ đọc một quả cân (5 kg).
      { type: 'mc', bai: 15, point: 2, level: 1,
        prompt: 'Cân thăng bằng. Gói đường nặng bao nhiêu ki-lô-gam?',
        fig: balance([{ kind: 'hop', label: 'gói đường' }], [5, 2]),
        options: ['7 kg', '3 kg', '52 kg', '5 kg'], ans: 0 },
      // Ý sai: quên Chủ nhật đứng sau Thứ Bảy; nghĩ tháng nào cũng có 30 ngày.
      { type: 'tf', bai: 30, point: 2, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Một tuần lễ có 7 ngày.', 'Sau Thứ Bảy là Thứ Hai.', 'Sau Chủ nhật là Thứ Hai.', 'Tháng nào cũng có 30 ngày.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Nhiễu: bỏ đoạn CD (7 cm), đếm số đoạn thẳng (3 cm), bỏ đoạn AB (6 cm).
      { type: 'mc', bai: 26, point: 1, level: 2,
        prompt: 'Độ dài đường gấp khúc ABCD là:',
        fig: geo({ pts: { A: [24, 110], B: [90, 34], C: [190, 104], D: [270, 40] }, segs: ['AB', 'BC', 'CD'], lens: { AB: '3 cm', BC: '4 cm', CD: '2 cm' }, pos: { A: 'w', C: 's', D: 'e' }, h: 130 }),
        options: ['9 cm', '7 cm', '3 cm', '6 cm'], ans: 0 },
      // Ý sai: lấy số bị trừ cộng số trừ để thử lại.
      { type: 'tf', bai: 23, point: 3, level: 2,
        prompt: 'Hà tính 72 − 28 = 44 rồi thử lại. Đúng ghi Đ, sai ghi S:',
        items: ['Muốn thử lại, lấy hiệu cộng số trừ: 44 + 28.', 'Muốn thử lại, lấy số bị trừ cộng số trừ: 72 + 28.', '44 + 28 = 72 nên Hà tính đúng.'],
        ans: ['Đ', 'S', 'Đ'] },
      // 35 + 6 = 41. Nhiễu: thấy "nặng hơn" mà trừ (29 kg), lấy số kg hơn (6 kg), quên nhớ (31 kg).
      { type: 'mc', bai: [13, 19], point: 0, level: 2,
        prompt: 'Bao gạo nặng 35 kg. Bao ngô nặng hơn bao gạo 6 kg. Bao ngô nặng:',
        options: ['41 kg', '29 kg', '6 kg', '31 kg'], ans: 0 },
      // 7 + 7 + 7 = 21. Nhiễu: chỉ cộng một tuần (14), cộng 2 ngày (9), cộng ba tuần (28).
      { type: 'mc', bai: 30, point: 2, level: 3,
        prompt: 'Thứ Hai tuần này là ngày 7 tháng 12. Thứ Hai sau đó 2 tuần là ngày:',
        options: ['21 tháng 12', '14 tháng 12', '9 tháng 12', '28 tháng 12'], ans: 0 },
      // Hùng 45, Lan 38, Minh 29: 45 − 38 = 7, 38 − 29 = 9, 45 − 29 = 16.
      { type: 'tf', bai: [4, 23], point: 0, level: 3,
        prompt: 'Lan có 38 viên bi, Hùng có 45 viên bi, Minh có 29 viên bi. Đúng ghi Đ, sai ghi S:',
        items: ['Hùng có nhiều hơn Lan 7 viên bi.', 'Lan có nhiều hơn Minh 7 viên bi.', 'Hùng có nhiều hơn Minh 16 viên bi.', 'Minh có ít hơn Lan 19 viên bi.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 42 − 15 = 27. Nhiễu: cộng (57 cm), không trả nhớ (37 cm), lấy số bé trừ số lớn ở hàng đơn vị (33 cm).
      { type: 'mc', bai: [26, 23], point: 1, level: 3,
        prompt: 'Đường gấp khúc ABC dài 42 cm, đoạn thẳng AB dài 15 cm. Đoạn thẳng BC dài:',
        options: ['27 cm', '57 cm', '37 cm', '33 cm'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [19, 20, 22, 23], point: 1, level: 2,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['57 + 6', '28 + 34', '64 − 9', '81 − 46'] },
      // Tháng 11 năm 2026: ngày 1 là Chủ nhật, có 30 ngày; ngày 20 là Thứ Sáu.
      { type: 'fill', bai: 30, point: 0, level: 2,
        prompt: 'Xem tờ lịch tháng 11 rồi viết vào chỗ chấm:',
        fig: calendar({ month: 11, first: 6, days: 30, mark: [20] }),
        items: [
          { t: 'Tháng 11 có … ngày.', ans: 30 },
          { t: 'Ngày 20 tháng 11 là …', ans: 'Thứ Sáu', choices: ['Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ nhật'] },
          { t: 'Chủ nhật đầu tiên của tháng 11 là ngày 1, Chủ nhật tiếp theo là ngày …', ans: 8 },
        ] },
      {
        type: 'word', bai: 20, point: 1, level: 2,
        text: 'Lớp 2A quyên góp được 45 quyển sách, lớp 2B quyên góp được 38 quyển sách. Hỏi cả hai lớp quyên góp được bao nhiêu quyển sách?',
        given: ['Lớp 2A quyên góp được 45 quyển sách.', 'Lớp 2B quyên góp được 38 quyển sách.'],
        ask: 'Cả hai lớp quyên góp được bao nhiêu quyển sách?',
        hint: 'Hỏi cả hai lớp thì gộp lại: lấy 45 cộng 38.',
        sentence: ['Cả hai lớp', 'quyên góp được', 'số quyển sách', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 45, op: '+', b: 38, result: 83, unit: 'quyển sách' },
        units: ['quyển sách', 'lớp', 'kg'],
      },
      // 61 − 37 = 24 (trừ có nhớ).
      { type: 'fill', bai: [4, 23], point: 0, level: 3,
        prompt: 'Thùng thứ nhất có 61 l dầu, thùng thứ hai có 37 l dầu. Thùng thứ nhất có nhiều hơn thùng thứ hai bao nhiêu lít dầu?',
        items: [{ t: 'Thùng thứ nhất nhiều hơn thùng thứ hai … l dầu.', ans: 24 }] },
    ] },
  ],
};
