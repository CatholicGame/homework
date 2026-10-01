/**
 * Vở bài tập Toán 3 — Tập hai: Bài 63–67 (sách trang 67–81).
 * Phép cộng, phép trừ trong phạm vi 100 000; luyện tập chung; xem đồng hồ, tháng – năm;
 * thực hành xem đồng hồ, xem lịch.
 */
import { blank, mau, listValidate, dsValidate, stripVN } from '../grade3Workbook.js';
import imgB63Puzzles from '../../assets/grade3-workbook-2/bai63_t2_q5_puzzles.svg';
import imgB65Calcs from '../../assets/grade3-workbook-2/bai65_q2_calcs.svg';
import imgB66Scenes from '../../assets/grade3-workbook-2/bai66_t1_q1_scenes.svg';
import imgB66Clock1 from '../../assets/grade3-workbook-2/bai66_t1_q2_clock1.svg';
import imgB66Clock2 from '../../assets/grade3-workbook-2/bai66_t1_q2_clock2.svg';
import imgB66Clock3 from '../../assets/grade3-workbook-2/bai66_t1_q2_clock3.svg';
import imgB66Clock4 from '../../assets/grade3-workbook-2/bai66_t1_q2_clock4.svg';
import imgB66Q4 from '../../assets/grade3-workbook-2/bai66_t1_q4_clocks.svg';
import imgB66Dec from '../../assets/grade3-workbook-2/bai66_t2_q2_calendar.svg';
import imgB67Q1 from '../../assets/grade3-workbook-2/bai67_t1_q1_clocks.svg';
import imgB67Q2a from '../../assets/grade3-workbook-2/bai67_t1_q2a_clocks.svg';
import imgB67Q2b from '../../assets/grade3-workbook-2/bai67_t1_q2b_clocks.svg';
import imgB67Q2c from '../../assets/grade3-workbook-2/bai67_t1_q2c_clocks.svg';
import imgB67Q2d from '../../assets/grade3-workbook-2/bai67_t1_q2d_clocks.svg';
import imgB67Jan from '../../assets/grade3-workbook-2/bai67_t2_calendar.svg';
import imgB67T2Q3 from '../../assets/grade3-workbook-2/bai67_t2_q3_clocks.svg';
import imgB67T2Q4 from '../../assets/grade3-workbook-2/bai67_t2_q4_clocks.svg';

// ── Local helpers ────────────────────────────────────────────────────────────

// A number the book prints with a thin space ("18 465"): the child may write it
// with or without the space, or with dots ("18.465").
const numNorm = (v) => String(v).replace(/[\s.]+/g, '');
const numValidate = (n) => (v) => numNorm(v) === String(n);

// A blank row; one number per "..." slot, each compared like numValidate.
function B(label, ...answers) {
  const want = answers.map(String);
  if (want.length === 1) return { label, answer: want[0], validate: numValidate(want[0]) };
  return {
    label, answer: want.join(','),
    validate: (v) => {
      const got = String(v).split(',').map(numNorm);
      return got.length === want.length && got.every((g, i) => g === want[i]);
    },
  };
}

// The first "= ......" line of a two-step "Tính giá trị của biểu thức": the
// expression left after the first operation. Spacing, dots in numbers and the
// typed look-alikes of − (-) don't matter.
function exprV(...exprs) {
  const norm = (s) => String(s).replace(/[\s.]+/g, '').replace(/^=/, '').replace(/[−–—]/g, '-');
  const targets = new Set(exprs.map(norm));
  return (v) => targets.has(norm(v));
}
const step = (label, ...exprs) => ({ label, answer: exprs[0], validate: exprV(...exprs) });

// A weekday written after "thứ ..." ("Tư", "tư", "4", "thứ Tư").
function weekdayValidate(word, num) {
  const ok = new Set([stripVN(word), String(num)]);
  return (v) => ok.has(stripVN(v).trim().replace(/^thu\s*/, ''));
}

// A small figure inside a compare row / blank label (one sub-question's clocks).
const fig = (src, w) => `<img class="e3-q-img" src="${src}" alt="" style="display:block;width:100%;max-width:${w}px;margin:8px 0 2px">`;

// Keep "18 465" on one line: the space inside a number becomes a no-break space.
const nb = (s) => (typeof s === 'string' ? s.replace(/(\d) (?=\d{3}(?!\d))/g, '$1\u00A0') : s);
function tidy(units) {
  units.forEach(u => u.questions.forEach(q => {
    q.q = nb(q.q);
    (q.blanks || []).forEach(b => { b.label = nb(b.label); });
    (q.rows || []).forEach(r => { r.left = nb(r.left); if (r.options) r.options = r.options.map(nb); });
    if (q.options) q.options = q.options.map(nb);
  }));
  return units;
}

// Bài 64 Tiết 2 Q5 "Hiệu của hai số đó là:": the result, or the whole subtraction.
const b64Diff = (v) => ['234', '10234-10000=234'].includes(numNorm(v).replace(/[−–—]/g, '-'));

// Bài 67 Tiết 1 Q3: the three chores in order (free wording, key words checked).
const CHORES = ['sắp xếp lại giá sách', 'hút bụi, lau nhà', 'cắt cỏ ở vườn'];
const choreKeys = [/sap xep|gia sach/, /hut bui|lau nha/, /cat co/];
function choresValidate(v) {
  // The slots are joined by ",": check each chore's key words, in order, over the whole answer.
  const s = stripVN(v);
  let at = 0;
  for (const re of choreKeys) {
    const m = s.slice(at).search(re);
    if (m < 0) return false;
    at += m + 1;
  }
  return true;
}

export const BAI_63_67 = tidy([
  // ── BÀI 63 (trang 67–69) ────────────────────────────────────────────────
  {
    id: 'bai-63', number: 63, title: 'Phép cộng trong phạm vi 100 000',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [B('51 837 + 426 = ...', 52263), B('37 594 + 5 362 = ...', 42956), B('64 829 + 13 756 = ...', 78585)],
        hints: ['Viết các số thẳng cột, cộng từ phải sang trái: hàng đơn vị, hàng chục, hàng trăm, hàng nghìn, hàng chục nghìn.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [B('54 728 + 32 645 = ...', 87373), B('46 295 + 27 493 = ...', 73788), B('9 735 + 8 349 = ...', 18084)],
        hints: ['Cộng hai chữ số được 10 trở lên thì viết chữ số hàng đơn vị, nhớ 1 sang hàng bên trái.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: `3. Tính nhẩm (theo mẫu).\n${mau('6 000 + 5 000 = ?<br>Nhẩm: 6 nghìn + 5 nghìn = 11 nghìn<br>6 000 + 5 000 = 11 000')}`,
        blanks: [
          B('7 000 + 6 000 = ...', 13000), B('5 000 + 8 000 = ...', 13000),
          B('8 000 + 9 000 = ...', 17000), B('6 000 + 6 000 = ...', 12000),
          B('9 000 + 4 000 = ...', 13000), B('7 000 + 9 000 = ...', 16000),
        ],
        hints: ['7 000 + 6 000: nhẩm 7 nghìn + 6 nghìn = 13 nghìn.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '4. Một cửa hàng, buổi sáng bán 6 680 <i>l</i> xăng, buổi chiều bán 7 256 <i>l</i> xăng và buổi tối bán 4 529 <i>l</i> xăng. Hỏi cả ngày, cửa hàng đó đã bán tất cả bao nhiêu lít xăng?',
        blanks: [{ label: 'Số lít xăng cả ngày cửa hàng bán được', answer: '18465', validate: numValidate(18465) }],
        hints: ['Cộng số lít xăng của cả ba buổi.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `1. Tính nhẩm (theo mẫu).\na) ${mau('20 000 + 30 000 = ?<br>Nhẩm: 2 chục nghìn + 3 chục nghìn = 5 chục nghìn<br>20 000 + 30 000 = 50 000')}\nb) ${mau('35 000 + 3 000 = ?<br>Nhẩm: 35 nghìn + 3 nghìn = 38 nghìn<br>35 000 + 3 000 = 38 000')}`,
        blanks: [
          B('a) 50 000 + 40 000 = ...', 90000), B('30 000 + 70 000 = ...', 100000),
          B('20 000 + 60 000 = ...', 80000), B('80 000 + 20 000 = ...', 100000),
          B('b) 23 000 + 5 000 = ...', 28000),
          B('82 000 + 6 000 = ...', 88000),
          B('57 000 + 3 000 = ...', 60000), B('39 000 + 4 000 = ...', 43000),
        ],
        hints: ['a) Nhẩm theo chục nghìn: 5 chục nghìn + 4 chục nghìn = 9 chục nghìn.', 'b) Nhẩm theo nghìn: 23 nghìn + 5 nghìn = 28 nghìn.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Đặt tính rồi tính.',
        blanks: [B('37 582 + 54 263 = ...', 91845), B('76 509 + 864 = ...', 77373), B('8 493 + 74 375 = ...', 82868)],
        hints: ['Viết số có ít chữ số hơn thẳng cột bên phải: đơn vị thẳng đơn vị, chục thẳng chục.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Tính giá trị của biểu thức.',
        blanks: [
          step('a) 14 000 + 52 000 + 18 000 = ...', '66 000 + 18 000', '14 000 + 70 000'),
          B('= ...', 84000),
          step('b) 36 000 + 25 700 + 4 000 = ...', '61 700 + 4 000', '40 000 + 25 700'),
          B('= ...', 65700),
        ],
        hints: ['Biểu thức chỉ có phép cộng: tính lần lượt từ trái sang phải.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true, subQuestions: false,
        q: '4. Trang trại nhà bác Năm nuôi 9 500 con gà, số con vịt nhiều hơn số con gà 3 500 con. Hỏi trang trại nhà bác Năm nuôi tất cả bao nhiêu con gà và con vịt?',
        blanks: [
          { label: 'Số con vịt', answer: '13000', validate: numValidate(13000) },
          { label: 'Số con gà và con vịt', answer: '22500', validate: numValidate(22500) },
        ],
        hints: ['Tìm số con vịt trước: 9 500 + 3 500.', 'Rồi cộng số gà với số vịt.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB63Puzzles,
        q: '5. Viết chữ số thích hợp vào ô trống.',
        blanks: [
          { label: 'a) 3...568 + 82...7 = ...4...8...', boxes: true, answer: '6,1,4,7,5', validate: listValidate(['6', '1', '4', '7', '5']) },
          { label: 'b) 56...24 + 2...39... = ...27...9', boxes: true, answer: '3,6,5,8,1', validate: listValidate(['3', '6', '5', '8', '1']) },
        ],
        hints: ['Làm từ hàng đơn vị: a) 8 + 7 = 15, viết 5 nhớ 1.', 'b) 4 + ô trống = 9, nên ô trống là 5.'],
      },
    ],
  },

  // ── BÀI 64 (trang 70–72) ────────────────────────────────────────────────
  {
    id: 'bai-64', number: 64, title: 'Phép trừ trong phạm vi 100 000',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [
          B('68 372 − 25 634 = ...', 42738), B('82 709 − 7 425 = ...', 75284),
          B('45 381 − 836 = ...', 44545), B('71 528 − 53 074 = ...', 18454),
        ],
        hints: ['Trừ từ phải sang trái. Chữ số trên bé hơn chữ số dưới thì mượn 1 ở hàng bên trái (thêm 10), rồi trả 1 vào số trừ ở hàng đó.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [B('58 394 − 23 547 = ...', 34847), B('37 468 − 75 = ...', 37393), B('52 647 − 8 245 = ...', 44402)],
        hints: ['Viết số trừ thẳng cột bên phải: đơn vị thẳng đơn vị, chục thẳng chục.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: `3. Tính nhẩm (theo mẫu).\n${mau('15 000 − 8 000 = ?<br>Nhẩm: 15 nghìn − 8 nghìn = 7 nghìn<br>15 000 − 8 000 = 7 000')}`,
        blanks: [
          B('14 000 − 6 000 = ...', 8000), B('16 000 − 9 000 = ...', 7000),
          B('13 000 − 7 000 = ...', 6000), B('17 000 − 8 000 = ...', 9000),
        ],
        hints: ['14 000 − 6 000: nhẩm 14 nghìn − 6 nghìn = 8 nghìn.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '4. Theo kế hoạch, nông trường Đất Xanh dự định trồng 45 000 cây lấy gỗ để phủ xanh đồi trọc. Đợt 1 nông trường trồng được 14 500 cây, đợt 2 nông trường trồng được 16 200 cây. Hỏi nông trường đó còn phải trồng bao nhiêu cây nữa thì hoàn thành kế hoạch?',
        blanks: [{ label: 'Số cây còn phải trồng', answer: '14300', validate: numValidate(14300) }],
        hints: ['Tính số cây đã trồng ở cả hai đợt, rồi lấy 45 000 trừ đi số đó.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `1. Tính nhẩm (theo mẫu).\na) ${mau('90 000 − 30 000 = ?<br>Nhẩm: 9 chục nghìn − 3 chục nghìn = 6 chục nghìn<br>90 000 − 30 000 = 60 000')}\nb) ${mau('47 000 − 5 000 = ?<br>Nhẩm: 47 nghìn − 5 nghìn = 42 nghìn<br>47 000 − 5 000 = 42 000')}`,
        blanks: [
          B('a) 70 000 − 50 000 = ...', 20000), B('80 000 − 40 000 = ...', 40000),
          B('60 000 − 20 000 = ...', 40000), B('100 000 − 50 000 = ...', 50000),
          B('b) 25 000 − 5 000 = ...', 20000),
          B('39 000 − 8 000 = ...', 31000),
          B('42 000 − 6 000 = ...', 36000), B('54 000 − 24 000 = ...', 30000),
        ],
        hints: ['100 000 là 10 chục nghìn: 10 chục nghìn − 5 chục nghìn = 5 chục nghìn.', '54 000 − 24 000: nhẩm 54 nghìn − 24 nghìn = 30 nghìn.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Đặt tính rồi tính.',
        blanks: [B('71 629 − 46 354 = ...', 25275), B('37 285 − 6 569 = ...', 30716), B('19 628 − 573 = ...', 19055)],
        hints: ['Nhớ mượn 1 ở hàng bên trái khi chữ số trên bé hơn chữ số dưới.'],
      },
      {
        type: 'choice', section: 'Tiết 2',
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.\nBiểu thức <b>M</b>: 60 000 − 8 000 + 4 035\nBiểu thức <b>N</b>: 89 740 − 3 700 − 30 000',
        options: [
          'Giá trị của biểu thức M lớn hơn giá trị của biểu thức N.',
          'Giá trị của biểu thức M bằng giá trị của biểu thức N.',
          'Giá trị của biểu thức M bé hơn giá trị của biểu thức N.',
        ],
        answer: 2,
        hints: ['Tính giá trị từng biểu thức từ trái sang phải, rồi so sánh.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true, subQuestions: false,
        q: '4. Một tàu đánh bắt cá xa bờ, tháng 8 đánh bắt được 8 670 kg cá, tháng 9 đánh bắt được ít hơn tháng 8 là 2 490 kg cá. Hỏi trong cả hai tháng, tàu đó đã đánh bắt được bao nhiêu ki-lô-gam cá?',
        blanks: [
          { label: 'Số ki-lô-gam cá tháng 9', answer: '6180', validate: numValidate(6180) },
          { label: 'Số ki-lô-gam cá cả hai tháng', answer: '14850', validate: numValidate(14850) },
        ],
        hints: ['Tìm số cá tháng 9 trước: 8 670 − 2 490.', 'Rồi cộng số cá của hai tháng.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '5. Viết tiếp vào chỗ chấm cho thích hợp.\nTìm hiệu của số bé nhất có năm chữ số khác nhau và số bé nhất có năm chữ số.',
        blanks: [
          B('Số bé nhất có năm chữ số khác nhau là ...', 10234),
          B('Số bé nhất có năm chữ số là ...', 10000),
          { label: 'Hiệu của hai số đó là: ...', answer: '234', validate: b64Diff },
        ],
        hints: ['Số bé nhất có năm chữ số khác nhau: chữ số đầu là 1, các chữ số sau bé nhất có thể và không lặp lại.'],
      },
    ],
  },

  // ── BÀI 65 (trang 73–74) ────────────────────────────────────────────────
  {
    id: 'bai-65', number: 65, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill',
        q: '1. Tính nhẩm.',
        blanks: [
          B('a) 40 000 + 5 000 − 30 000 = ...', 15000),
          B('b) 14 000 − 8 000 + 20 000 = ...', 26000),
          B('c) 90 000 − (50 000 + 30 000) = ...', 10000),
          B('d) 80 000 − (70 000 − 50 000) = ...', 60000),
        ],
        hints: ['Có dấu ngoặc thì tính trong ngoặc trước.', 'Không có ngoặc thì tính từ trái sang phải.'],
      },
      {
        type: 'fill', img: imgB65Calcs,
        q: '2. Đ, S?',
        blanks: [
          { label: 'a) 54 627 + 38 165 = 92 792 ...', answer: 'Đ', validate: dsValidate(true), tiles: ['Đ', 'S'], tileOne: true },
          { label: 'b) 67 180 + 735 = 67 815 ...', answer: 'S', validate: dsValidate(false), tiles: ['Đ', 'S'], tileOne: true },
          { label: 'c) 95 684 − 6 829 = 27 494 ...', answer: 'S', validate: dsValidate(false), tiles: ['Đ', 'S'], tileOne: true },
          { label: 'd) 83 657 − 71 482 = 12 175 ...', answer: 'Đ', validate: dsValidate(true), tiles: ['Đ', 'S'], tileOne: true },
        ],
        hints: ['Tính lại từng phép tính. Xem các chữ số đã thẳng cột chưa.', 'c) Số 6 829 phải viết thẳng cột bên phải: 9 thẳng với 4.'],
      },
      {
        type: 'fill',
        q: '3. Đặt tính rồi tính.',
        blanks: [
          B('6 385 + 2 706 = ...', 9091), B('35 082 + 29 246 = ...', 64328),
          B('76 548 − 9 175 = ...', 67373), B('12 394 − 857 = ...', 11537),
        ],
        hints: ['Viết các chữ số cùng hàng thẳng cột với nhau, rồi tính từ phải sang trái.'],
      },
      {
        type: 'fill', wordProblem: true,
        q: '4. Dịp đầu năm học mới, một cửa hàng có 15 500 cuốn sách giáo khoa và 12 800 cuốn sách tham khảo. Cửa hàng đã bán đi 8 300 cuốn sách giáo khoa và 7 650 cuốn sách tham khảo. Hỏi:\na) Cửa hàng còn lại bao nhiêu cuốn sách giáo khoa, bao nhiêu cuốn sách tham khảo?\nb) Cửa hàng còn lại tất cả bao nhiêu cuốn sách giáo khoa và sách tham khảo?',
        blanks: [
          { label: 'a) Số sách giáo khoa còn lại', answer: '7200', validate: numValidate(7200) },
          { label: 'Số sách tham khảo còn lại', answer: '5150', validate: numValidate(5150) },
          { label: 'b) Số sách còn lại tất cả', answer: '12350', validate: numValidate(12350) },
        ],
        hints: ['a) Lấy số sách có trừ đi số sách đã bán, tính riêng từng loại.', 'b) Cộng hai kết quả ở câu a.'],
      },
      {
        type: 'fill',
        q: '5. Tính giá trị của biểu thức.',
        blanks: [
          step('a) 7 483 + 9 300 − 14 783 = ...', '16 783 − 14 783'),
          B('= ...', 2000),
          step('b) 21 548 − (16 500 + 3 500) = ...', '21 548 − 20 000'),
          B('= ...', 1548),
          step('c) 35 740 − (29 563 − 2 193) = ...', '35 740 − 27 370'),
          B('= ...', 8370),
        ],
        hints: ['Có dấu ngoặc thì tính trong ngoặc trước.', 'a) Không có ngoặc: tính từ trái sang phải.'],
      },
    ],
  },

  // ── BÀI 66 (trang 75–77) ────────────────────────────────────────────────
  {
    id: 'bai-66', number: 66, title: 'Xem đồng hồ. Tháng – năm',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB66Scenes,
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          B('a) Nam đi xe đạp lúc ... giờ ... phút sáng.', 5, 45),
          B('b) Việt học tiếng Anh lúc ... giờ ... phút sáng.', 8, 20),
          B('c) Mai cùng mẹ rửa bát lúc ... giờ ... phút trưa.', 11, 35),
          B('d) Rô-bốt thả diều lúc ... giờ ... phút chiều.', 4, 55),
        ],
        hints: ['Kim ngắn chỉ giờ, kim dài chỉ phút.', 'Kim dài chỉ số 9 là 45 phút, chỉ số 4 là 20 phút.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Nối hai chiếc đồng hồ chỉ cùng thời gian vào buổi tối.',
        left: [
          { id: 'c1', img: imgB66Clock1 }, { id: 'c2', img: imgB66Clock2 },
          { id: 'c3', img: imgB66Clock3 }, { id: 'c4', img: imgB66Clock4 },
        ],
        right: [
          { id: 'd1', text: '22 : 45' }, { id: 'd2', text: '23 : 40' },
          { id: 'd3', text: '21 : 55' }, { id: 'd4', text: '20 : 50' },
        ],
        pairs: [['c1', 'd3'], ['c2', 'd1'], ['c3', 'd4'], ['c4', 'd2']],
        hints: ['Buổi tối: 9 giờ tối là 21 giờ, 10 giờ tối là 22 giờ.', 'Đọc giờ trên đồng hồ kim rồi cộng thêm 12 để được giờ buổi tối.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          B('a) 5 phút + 15 phút = ... phút', 20),
          B('b) 50 phút − 35 phút = ... phút', 15),
          B('c) 12 phút × 5 = ... phút', 60),
          B('d) 45 phút : 3 = ... phút', 15),
        ],
        hints: ['Tính như với số, rồi viết thêm chữ "phút".'],
      },
      {
        type: 'compare', section: 'Tiết 1', img: imgB66Q4,
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nLúc này, đồng hồ đang chỉ thời gian như hình vẽ.\n10 phút nữa, lớp của Mai sẽ bắt đầu tiết học cuối cùng trong ngày.\nHỏi đồng hồ nào dưới đây chỉ thời gian đó?',
        rows: [{ left: 'Đồng hồ chỉ thời gian đó là:', options: ['A', 'B', 'C', 'D'], answer: 'D' }],
        hints: ['Lúc này là 3 giờ 15 phút. Thêm 10 phút nữa là mấy giờ?'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          B('a) Trong một năm, có ... tháng có 30 ngày.', 4),
          B('b) Trong một năm, có ... tháng có ngày 31.', 7),
        ],
        hints: ['Các tháng có 30 ngày: tháng 4, 6, 9, 11.', 'Tháng 2 có 28 hoặc 29 ngày.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB66Dec,
        q: '2. Quan sát tờ lịch tháng 12 dưới đây rồi viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Ngày thành lập Quân đội nhân dân Việt Nam là ngày 22 tháng 12. Hôm đó là thứ ...', answer: 'Tư', validate: weekdayValidate('Tư', 4) },
          B('b) Lớp của Rô-bốt sẽ bắt đầu kiểm tra học kì 1 từ ngày 27 đến hết ngày 29 tháng 12. Vậy thời gian kiểm tra học kì 1 của lớp đó kéo dài ... ngày.', 3),
        ],
        hints: ['Tìm số 22 trên tờ lịch rồi nhìn lên hàng tên thứ.', 'Đếm các ngày 27, 28, 29.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.\nGia đình Mai sẽ về thăm quê ngoại từ ngày 30 tháng 8 đến hết ngày 3 tháng 9. Hỏi chuyến đi đó kéo dài bao nhiêu ngày?',
        rows: [{ left: 'Chuyến đi kéo dài:', options: ['A. 3 ngày', 'B. 4 ngày', 'C. 5 ngày', 'D. 6 ngày'], answer: 'C' }],
        hints: ['Tháng 8 có 31 ngày.', 'Đếm: 30, 31 tháng 8 rồi 1, 2, 3 tháng 9.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nNếu ngày 31 tháng 12 năm nay là thứ Sáu thì:',
        blanks: [
          { label: 'a) Ngày Tết dương lịch năm sau là thứ ...', answer: 'Bảy', validate: weekdayValidate('Bảy', 7) },
          { label: 'b) Ngày 15 tháng 1 năm sau là thứ ...', answer: 'Bảy', validate: weekdayValidate('Bảy', 7) },
        ],
        hints: ['Tết dương lịch là ngày 1 tháng 1, ngay sau ngày 31 tháng 12.', 'Cứ 7 ngày lại đến cùng một thứ: 1, 8, 15.'],
      },
    ],
  },

  // ── BÀI 67 (trang 78–81) ────────────────────────────────────────────────
  {
    id: 'bai-67', number: 67, title: 'Thực hành xem đồng hồ, xem lịch',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB67Q1,
        q: '1. Vào sáng thứ Bảy, Rô-bốt thức dậy, đi xe đạp một vòng quanh công viên rồi về nhà cùng cả gia đình ăn bữa sáng.\nNhững chiếc đồng hồ dưới đây hiển thị thời gian khi Rô-bốt bắt đầu thực hiện các hoạt động: thức dậy, đi xe đạp và ăn sáng.\nDựa vào trình tự kể trên, viết hoạt động thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'Đồng hồ bên trái: ...', answer: 'đi xe đạp', tiles: ['thức dậy', 'đi xe đạp', 'ăn sáng'], tileOne: true, validate: (v) => /xe dap/.test(stripVN(v)) },
          { label: 'Đồng hồ ở giữa: ...', answer: 'thức dậy', tiles: ['thức dậy', 'đi xe đạp', 'ăn sáng'], tileOne: true, validate: (v) => /thuc day/.test(stripVN(v)) },
          { label: 'Đồng hồ bên phải: ...', answer: 'ăn sáng', tiles: ['thức dậy', 'đi xe đạp', 'ăn sáng'], tileOne: true, validate: (v) => /an sang/.test(stripVN(v)) },
        ],
        hints: ['Đọc giờ: 6 giờ 15 phút, 6 giờ, 7 giờ 40 phút.', 'Việc làm trước thì lúc sớm hơn: thức dậy trước tiên.'],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.\nRô-bốt làm bánh mì để chuẩn bị cho bữa trưa. Rô-bốt làm bánh mì qua bốn công đoạn: trộn và nhào bột, ủ bột, tạo hình bánh, nướng bánh.',
        rows: [
          { left: `a) Rô-bốt bắt đầu trộn bột vào lúc 7 giờ 40 phút rồi tiến hành nhào bột. Công đoạn này kéo dài 20 phút. Hỏi đồng hồ nào dưới đây chỉ lúc Rô-bốt nhào bột xong?${fig(imgB67Q2a, 540)}`, options: ['A', 'B', 'C', 'D'], answer: 'C' },
          { left: `b) Thời gian ủ bột là 50 phút. Rô-bốt bắt đầu cho bột vào lò ủ lúc 8 giờ. Hỏi khi Rô-bốt lấy bột ra khỏi lò ủ thì đồng hồ chỉ thời gian nào?${fig(imgB67Q2b, 540)}`, options: ['A', 'B', 'C', 'D'], answer: 'A' },
          { left: `c) Rô-bốt đã nhờ mẹ tạo hình cho chiếc bánh. Thời gian bắt đầu và kết thúc như hình bên. Hỏi mẹ tạo hình bánh trong bao nhiêu phút?${fig(imgB67Q2c, 300)}`, options: ['A. 5 phút', 'B. 4 phút', 'C. 3 phút', 'D. 2 phút'], answer: 'A' },
          { left: `d) Rô-bốt nướng bánh trong 20 phút. Bánh nướng xong lúc 9 giờ 25 phút. Hỏi đồng hồ nào dưới đây chỉ lúc Rô-bốt bắt đầu nướng bánh?${fig(imgB67Q2d, 540)}`, options: ['A', 'B', 'C', 'D'], answer: 'B' },
        ],
        hints: ['a) 7 giờ 40 phút thêm 20 phút là 8 giờ.', 'd) Lùi lại 20 phút từ 9 giờ 25 phút.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp.\nVào buổi chiều, mẹ đi chợ và Rô-bốt ở nhà dọn dẹp nhà cửa cùng bố. Hai bố con dự định làm 3 việc trong thời gian như sau:\n− Hút bụi, lau nhà trước 4 giờ 30 phút chiều.\n− Cắt cỏ ở vườn từ 4 giờ đến 5 giờ chiều.\n− Sắp xếp lại giá sách ở phòng làm việc trước 3 giờ chiều.\nHỏi bố và Rô-bốt nên thực hiện những công việc đó theo thứ tự như thế nào?',
        blanks: [{
          label: 'Trả lời: Bố và Rô-bốt nên ..., sau đó ... rồi cuối cùng ...',
          answer: CHORES.map(c => c.replace(',', ' rồi')).join(','),
          tiles: CHORES.map(c => c.replace(',', ' rồi')),
          validate: choresValidate,
        }],
        hints: ['Việc phải xong sớm nhất (trước 3 giờ) làm trước.', 'Cắt cỏ đến 5 giờ mới xong nên làm sau cùng.'],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nVào buổi tối, gia đình Rô-bốt dự định đi cắm trại vào ngày hôm sau. Nhưng lúc 11 giờ đêm hôm đó, trời bắt đầu mưa. May sao, đến lúc 3 giờ sáng ngày hôm sau, trời tạnh mưa. Hỏi cơn mưa đó kéo dài bao lâu?',
        rows: [{ left: 'Cơn mưa kéo dài:', options: ['A. 3 giờ', 'B. 4 giờ', 'C. 5 giờ', 'D. 6 giờ'], answer: 'B' }],
        hints: ['Từ 11 giờ đêm đến 12 giờ đêm là 1 giờ, từ 12 giờ đêm đến 3 giờ sáng là 3 giờ.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB67Jan,
        q: '1. Viết số thích hợp vào chỗ chấm.\n(Tết Dương lịch, gia đình Rô-bốt cùng nhau đi Đà Lạt. Quan sát tờ lịch tháng 1.)',
        blanks: [B('Kì nghỉ của gia đình Rô-bốt bắt đầu từ ngày 1 tháng 1 đến hết ngày 3 tháng 1. Kì nghỉ đó kéo dài ... ngày.', 3)],
        hints: ['Đếm các ngày 1, 2, 3 tháng 1.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB67Jan,
        q: '2. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          B('a) Gia đình Rô-bốt sẽ đi máy bay sáng ngày 1 tháng 1 từ Hà Nội vào Đà Lạt. Họ cần thuê xe ở Đà Lạt trước chuyến đi 3 ngày để chắc chắn có xe. Vậy gia đình Rô-bốt cần đặt xe vào ngày ... tháng ...', 29, 12),
          B('b) Ngoài ra, gia đình Rô-bốt muốn chuẩn bị một số món quà cho những người bạn ở Đà Lạt. Họ dự định đi mua quà vào Chủ nhật của tuần trước đó. Vậy gia đình Rô-bốt sẽ đi mua quà vào ngày ... tháng ...', 26, 12),
        ],
        hints: ['Tháng 12 có 31 ngày: lùi 3 ngày từ ngày 1 tháng 1 là 31, 30, 29 tháng 12.', 'Ngày 1 tháng 1 là thứ Bảy, nên ngày 31 tháng 12 là thứ Sáu. Lùi tiếp đến Chủ nhật.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB67T2Q3,
        q: '3. Bây giờ là buổi tối trước khi kì nghỉ chính thức bắt đầu.',
        blanks: [
          B('a) Viết số thích hợp vào chỗ chấm.<br>Trong lúc mẹ chuẩn bị bữa tối, bố và Rô-bốt cùng nhau sắp xếp vào va li những đồ dùng cần thiết cho chuyến đi. Thời gian bắt đầu và kết thúc như hình a).<br>Hai bố con Rô-bốt đã sắp xếp đồ trong ... phút.', 20),
          { label: 'b) Khoanh vào chữ đặt dưới câu trả lời đúng.<br>Sau bữa cơm, cả gia đình cùng nhau dọn dẹp nhà cửa để chào đón năm mới. Họ đã bắt đầu hoạt động này vào lúc 8 giờ 10 phút và kết thúc sau 43 phút. Hỏi khi đó, đồng hồ chỉ thời gian nào?<br>Đồng hồ chỉ thời gian đó là đồng hồ ...', answer: 'C', validate: (v) => String(v).trim().toUpperCase() === 'C', tiles: ['A', 'B', 'C', 'D'], tileOne: true },
        ],
        hints: ['a) Bắt đầu lúc 5 giờ 35 phút, kết thúc lúc 5 giờ 55 phút.', 'b) 8 giờ 10 phút thêm 43 phút là 8 giờ 53 phút: kim dài chỉ gần số 11, kim ngắn gần số 9.'],
      },
      {
        type: 'compare', section: 'Tiết 2', img: imgB67T2Q4,
        q: '4. Khoanh vào chữ đặt dưới câu trả lời đúng.\nGia đình Rô-bốt đã lên máy bay 25 phút trước thời điểm máy bay cất cánh. Đó là lúc 6 giờ 40 phút sáng. Hỏi đồng hồ nào chỉ thời điểm máy bay cất cánh?',
        rows: [{ left: 'Đồng hồ chỉ lúc máy bay cất cánh là:', options: ['A', 'B', 'C', 'D'], answer: 'B' }],
        hints: ['6 giờ 40 phút thêm 20 phút là 7 giờ, thêm 5 phút nữa.'],
      },
    ],
  },
]);
