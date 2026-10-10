/** Kiểm tra tổng hợp 4 (Đề 1): Bài 25–36 Vở BT Toán 2 (Nhanh 7 + Nhanh 8, ôn Bài 1–24). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { geo, clock, calendar, digital } from './art.js';

/** Đường cong nối hai điểm A, B (phương án hình của câu 1). */
const curve = () => '<svg viewBox="0 0 200 70" width="150" xmlns="http://www.w3.org/2000/svg">'
  + '<path d="M40 50 Q100 0 160 50" stroke="#1f2937" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
  + '<circle cx="40" cy="50" r="3.6" fill="#1f2937"/><circle cx="160" cy="50" r="3.6" fill="#1f2937"/>'
  + '<text x="40" y="68" font-size="15" font-weight="700" fill="#1f2937" text-anchor="middle">A</text>'
  + '<text x="160" y="68" font-size="15" font-weight="700" fill="#1f2937" text-anchor="middle">B</text></svg>';

export default {
  id: 'l2-th-04',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 4 (Đề 1)',
  short: 'Tổng hợp 4 · Đề 1',
  after: { book: 'workbook2', units: '25-36' },
  desc: 'Đường thẳng, đường gấp khúc, vẽ đoạn thẳng; ngày, giờ, xem đồng hồ; ngày, tháng, xem lịch; ôn cộng, trừ có nhớ, lít',
  time: 35,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: đường cong, đoạn thẳng (không kéo dài về hai phía).
      { type: 'mc', bai: 25, point: 2, level: 1,
        prompt: 'Hình nào là đường thẳng?',
        options: [
          curve(),
          geo({ pts: { A: [40, 35], B: [160, 35] }, segs: ['AB'], pos: { A: 's', B: 's' }, w: 200, h: 70, width: 150 }),
          geo({ pts: { A: [60, 35], B: [140, 35] }, lines: ['AB'], pos: { A: 's', B: 's' }, w: 200, h: 70, width: 150 }),
        ], ans: 2 },
      // 3 cm + 4 cm + 5 cm = 12 cm. Nhiễu: quên đoạn CD (7 cm), quên đoạn AB (9 cm), cộng sai (13 cm).
      { type: 'mc', bai: 26, point: 1, level: 1,
        prompt: 'Độ dài đường gấp khúc ABCD là:',
        fig: geo({ pts: { A: [30, 110], B: [100, 40], C: [180, 110], D: [260, 45] }, segs: ['AB', 'BC', 'CD'],
          lens: { AB: '3 cm', BC: '4 cm', CD: '5 cm' }, pos: { A: 's', B: 'n', C: 's', D: 'n' }, w: 290, h: 135 }),
        options: ['12 cm', '7 cm', '9 cm', '13 cm'], ans: 0 },
      // Ý sai: 8 giờ tối là 20 giờ (không phải 18 giờ), 1 giờ có 60 phút.
      { type: 'tf', bai: 29, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['1 giờ chiều là 13 giờ.', '8 giờ tối là 18 giờ.', 'Một ngày có 24 giờ.', '1 giờ có 100 phút.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Kim ngắn giữa số 4 và số 5, kim dài chỉ số 6. Nhiễu: đọc số sau (5 giờ rưỡi), đổi vai hai kim (6 giờ 20 phút), đọc số 6 là 6 phút.
      { type: 'mc', bai: 29, point: 2, level: 1,
        prompt: 'Đồng hồ chỉ mấy giờ?', fig: clock(4, 30),
        options: ['4 giờ rưỡi', '5 giờ rưỡi', '6 giờ 20 phút', '4 giờ 6 phút'], ans: 0 },
      // Tháng 10 năm 2026: ngày 1 là Thứ Năm. Ngày 20 là Thứ Ba. Nhiễu: lệch một cột (Thứ Hai, Thứ Tư), cột đỏ (Chủ nhật).
      { type: 'mc', bai: 30, point: 0, level: 2,
        prompt: 'Xem tờ lịch. Ngày 20 tháng 10 là thứ mấy?', fig: calendar({ month: 10, first: 3, days: 31, mark: [20] }),
        options: ['Thứ Ba', 'Thứ Tư', 'Thứ Hai', 'Chủ nhật'], ans: 0 },
      // Ôn cộng, trừ có nhớ.
      { type: 'match', bai: [20, 23], point: 1, level: 2, review: true,
        prompt: 'Nối mỗi phép tính với kết quả đúng:',
        left: ['38 + 27', '71 − 46', '47 + 8', '92 − 58'],
        right: ['34', '65', '25', '55'],
        ans: [1, 2, 3, 0] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'draw', bai: 27, point: 0, level: 1,
        items: [
          { prompt: 'a) Vẽ đoạn thẳng MN dài 6 cm.', name: 'MN', len: 6 },
          { prompt: 'b) Vẽ đoạn thẳng PQ dài 9 cm.', name: 'PQ', len: 9 },
        ] },
      // Cùng một thứ, ngày của tuần sau hơn tuần trước 7.
      { type: 'fill', bai: 30, point: 2, level: 2,
        prompt: 'Hôm nay là Thứ Hai ngày 12.',
        items: [
          { t: 'Thứ Hai tuần sau là ngày …', ans: 19 },
          { t: 'Thứ Hai tuần trước là ngày …', ans: 5 },
        ] },
      {
        type: 'word', bai: [13, 16, 23], point: 1, level: 3, review: true,
        text: 'Thùng thứ nhất có 45 l nước. Thùng thứ hai có ít hơn thùng thứ nhất 18 l nước. Hỏi thùng thứ hai có bao nhiêu lít nước?',
        given: ['Thùng thứ nhất có 45 l nước.', 'Thùng thứ hai ít hơn thùng thứ nhất 18 l.'],
        ask: 'Thùng thứ hai có bao nhiêu lít nước?',
        hint: 'Ít hơn thì lấy số lít của thùng thứ nhất trừ đi số lít ít hơn.',
        sentence: ['Thùng thứ hai', 'có', 'số lít nước', 'là:'],
        decoys: ['cả hai thùng'],
        expr: { a: 45, op: '−', b: 18, result: 27, unit: 'l' },
        units: ['l', 'kg', 'thùng'],
      },
      // 19:30 là 7 giờ 30 phút tối; thêm 30 phút là 8 giờ tối.
      { type: 'fill', bai: 29, point: 3, level: 3,
        prompt: 'Buổi tối, đồng hồ điện tử ở nhà Lan chỉ:', fig: digital('19:30'),
        items: [
          { t: 'Lúc đó là … giờ … phút tối.', ans: [7, 30] },
          { t: 'Thêm 30 phút nữa là … giờ tối.', ans: 8 },
        ] },
    ] },
  ],
};
