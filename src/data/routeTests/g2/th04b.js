/** Kiểm tra tổng hợp 4 (Đề 2): Bài 25–36 Vở BT Toán 2 (Nhanh 7 + Nhanh 8, ôn Bài 1–24). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { geo, polys, calendar } from './art.js';

export default {
  id: 'l2-th-04b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 4 (Đề 2)',
  short: 'Tổng hợp 4 · Đề 2',
  after: { book: 'workbook2', units: '25-36' },
  desc: 'Hình tứ giác, ba điểm thẳng hàng, đường gấp khúc, quy luật; giờ, phút; ngày, tháng, xem lịch; ôn kg, lít, trừ có nhớ',
  time: 35,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: hình tam giác (3 cạnh), hình có 5 cạnh.
      { type: 'mc', bai: 26, point: 2, level: 1,
        prompt: 'Hình nào là hình tứ giác?',
        options: [
          polys([{ pts: [[10, 72], [50, 10], [90, 72]], color: '#fde68a' }], { w: 100, h: 82, width: 100 }),
          polys([{ pts: [[12, 20], [84, 8], [92, 72], [20, 66]], color: '#bbf7d0' }], { w: 100, h: 82, width: 100 }),
          polys([{ pts: [[50, 8], [90, 36], [75, 74], [25, 74], [10, 36]], color: '#fbcfe8' }], { w: 100, h: 82, width: 100 }),
        ], ans: 1 },
      // A, B, C cùng nằm trên một đường thẳng (đặt thước sẽ thấy). Nhiễu: hai bộ có điểm D.
      { type: 'mc', bai: 25, point: 3, level: 2,
        prompt: 'Dùng thước kiểm tra. Ba điểm nào thẳng hàng?',
        fig: geo({ pts: { A: [30, 100], B: [120, 75], C: [210, 50], D: [150, 120] }, pos: { D: 'e' }, w: 250, h: 135 }),
        options: ['A, B, C', 'A, B, D', 'B, C, D'], ans: 0 },
      // Ý sai: kim dài chỉ số 6 là 30 phút (không phải 6 phút), kim ngắn chỉ giờ.
      { type: 'tf', bai: 29, point: 2, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['1 giờ = 60 phút.', 'Kim dài chỉ số 6 là 6 phút.', 'Kim dài chỉ số 3 là 15 phút.', 'Kim ngắn chỉ phút, kim dài chỉ giờ.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 17 giờ = 5 giờ chiều. Nhiễu: lấy chữ số cuối (7 giờ chiều, 7 giờ tối), nhầm buổi (5 giờ sáng).
      { type: 'mc', bai: 29, point: 1, level: 1,
        prompt: '17 giờ còn gọi là:',
        options: ['5 giờ chiều', '7 giờ tối', '7 giờ chiều', '5 giờ sáng'], ans: 0 },
      // Tháng 11 năm 2026: ngày 1 là Chủ nhật, ngày cuối là 30. Nhiễu: 31 ngày (nhớ nhầm), 29 ngày, 7 ngày (một tuần).
      { type: 'mc', bai: 30, point: 1, level: 1,
        prompt: 'Xem tờ lịch. Tháng 11 có bao nhiêu ngày?', fig: calendar({ month: 11, first: 6, days: 30 }),
        options: ['30 ngày', '31 ngày', '29 ngày', '7 ngày'], ans: 0 },
      // Ôn cộng, trừ số đo kg, lít (có nhớ).
      { type: 'match', bai: [15, 16], point: 3, level: 2, review: true,
        prompt: 'Nối mỗi phép tính với kết quả đúng:',
        left: ['26 kg + 17 kg', '50 l − 23 l', '38 kg − 9 kg', '45 l + 6 l'],
        right: ['27 l', '43 kg', '51 l', '29 kg'],
        ans: [1, 0, 3, 2] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Quy luật lặp lại ba hình: tròn, tam giác, vuông.
      { type: 'fill', bai: 27, point: 2, level: 1,
        prompt: 'Các hình được xếp theo quy luật. Chọn hai hình tiếp theo:',
        items: [{ t: '● ▲ ■ ● ▲ ■ ● … …', ans: ['▲', '■'], choices: ['●', '▲', '■'] }] },
      // 12 cm + 9 cm + 14 cm = 35 cm.
      { type: 'fill', bai: 26, point: 1, level: 2,
        prompt: 'Tính độ dài đường gấp khúc MNPQ:',
        fig: geo({ pts: { M: [30, 40], N: [100, 110], P: [180, 40], Q: [260, 110] }, segs: ['MN', 'NP', 'PQ'],
          lens: { MN: '12 cm', NP: '9 cm', PQ: '14 cm' }, pos: { M: 'n', N: 's', P: 'n', Q: 's' }, w: 290, h: 135 }),
        items: [{ t: '… cm + … cm + … cm = … cm', ans: [12, 9, 14, 35] }] },
      {
        type: 'word', bai: [13, 23], point: 1, level: 3, review: true,
        text: 'Lớp 2A góp được 72 quyển vở tặng các bạn vùng lũ. Lớp 2B góp được ít hơn lớp 2A 15 quyển vở. Hỏi lớp 2B góp được bao nhiêu quyển vở?',
        given: ['Lớp 2A góp được 72 quyển vở.', 'Lớp 2B góp ít hơn lớp 2A 15 quyển.'],
        ask: 'Lớp 2B góp được bao nhiêu quyển vở?',
        hint: 'Ít hơn thì lấy số vở của lớp 2A trừ đi số vở ít hơn.',
        sentence: ['Lớp 2B', 'góp được', 'số quyển vở', 'là:'],
        decoys: ['cả hai lớp'],
        expr: { a: 72, op: '−', b: 15, result: 57, unit: 'quyển vở' },
        units: ['quyển vở', 'lớp', 'bạn'],
      },
      // Tháng 12 năm 2026: ngày 1 là Thứ Ba. Ô bị che là ngày 15, cũng là Thứ Ba; Thứ Ba tuần sau là 15 + 7 = 22.
      { type: 'fill', bai: 30, point: 2, level: 3,
        prompt: 'Tờ lịch tháng 12 bị che mất một ngày.', fig: calendar({ month: 12, first: 1, days: 31, hide: [15] }),
        items: [
          { t: 'Ngày bị che là ngày …', ans: 15 },
          { t: 'Ngày đó là …', ans: ['Thứ Ba'], choices: ['Thứ Hai', 'Thứ Ba', 'Thứ Tư'] },
          { t: 'Thứ Ba tuần sau là ngày …', ans: 22 },
        ] },
    ] },
  ],
};
