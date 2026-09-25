/**
 * Vở bài tập Toán 2 — Tập một: Bài 31–36 (sách trang 114–135).
 */
import {
  blank, stripVN, setValidate, dsValidate, unitValidate, swapPairValidate,
} from '../grade3Workbook.js';
import imgB31T1Q3 from '../../assets/grade2-workbook/bai31_t1_q3_clocks.svg';
import imgB31T1Q4 from '../../assets/grade2-workbook/bai31_t1_q4_activities.png';
import imgB31T1Q5 from '../../assets/grade2-workbook/bai31_t1_q5_friends.png';
import imgB31T2Q2 from '../../assets/grade2-workbook/bai31_t2_q2_may.svg';
import imgB31T2Q3 from '../../assets/grade2-workbook/bai31_t2_q3_june.svg';
import imgB32Q1 from '../../assets/grade2-workbook/bai32_q1_clock.svg';
import imgB32Q2 from '../../assets/grade2-workbook/bai32_q2_contests.png';
import imgB32Q3 from '../../assets/grade2-workbook/bai32_q3_friends.png';
import imgB32Q4 from '../../assets/grade2-workbook/bai32_q4_robot.png';
import imgB33T1Q3 from '../../assets/grade2-workbook/bai33_t1_q3_triangle.svg';
import imgB33T2Q1 from '../../assets/grade2-workbook/bai33_t2_q1_melons.png';
import imgB33T2Q3 from '../../assets/grade2-workbook/bai33_t2_q3_scale.png';
import imgB33T3Q1 from '../../assets/grade2-workbook/bai33_t3_q1_train.png';
import imgB33T4Q1 from '../../assets/grade2-workbook/bai33_t4_q1_chains.svg';
import imgB33T4Q2 from '../../assets/grade2-workbook/bai33_t4_q2_pyramid.svg';
import imgB34T1Q1 from '../../assets/grade2-workbook/bai34_t1_q1_segments.svg';
import imgB34T1Q3 from '../../assets/grade2-workbook/bai34_t1_q3_shapes.svg';
import imgB34T1Q4 from '../../assets/grade2-workbook/bai34_t1_q4_rect.svg';
import imgB34T2Q2 from '../../assets/grade2-workbook/bai34_t2_q2_segment.svg';
import imgB34T2Q3 from '../../assets/grade2-workbook/bai34_t2_q3_pattern.svg';
import imgB34T2Q4 from '../../assets/grade2-workbook/bai34_t2_q4_grid.svg';
import imgB34T2Q5 from '../../assets/grade2-workbook/bai34_t2_q5_rect.svg';
import imgB35T1Q1 from '../../assets/grade2-workbook/bai35_t1_q1_scales.png';
import imgB35T1Q3 from '../../assets/grade2-workbook/bai35_t1_q3_scales.png';
import imgB35T2Q1 from '../../assets/grade2-workbook/bai35_t2_q1_jugs.png';
import imgB35T2Q4 from '../../assets/grade2-workbook/bai35_t2_q4_cans.png';
import imgB36T1Q1 from '../../assets/grade2-workbook/bai36_t1_q1_numberline.svg';
import imgB36School from '../../assets/grade2-workbook/bai36_t1_q2_school.png';
import imgB36Homework from '../../assets/grade2-workbook/bai36_t1_q2_homework.png';
import imgB36Swim from '../../assets/grade2-workbook/bai36_t1_q2_swim.png';
import imgB36Piano from '../../assets/grade2-workbook/bai36_t1_q2_piano.png';
import imgB36T2Q4 from '../../assets/grade2-workbook/bai36_t2_q4_chains.svg';
import imgB36T1Q5 from '../../assets/grade2-workbook/bai36_t1_q5_ants.png';
import imgB36T2Q1 from '../../assets/grade2-workbook/bai36_t2_q1_figures.svg';
import imgB36T2Q2 from '../../assets/grade2-workbook/bai36_t2_q2_scale_can.png';

// ".... giờ .... phút" read off a clock face: the hour may be written either
// way ("7 giờ 15 phút" or "19 giờ 15 phút") since an analog clock doesn't
// show morning/afternoon; the minutes must match.
function clockValidate(h, m) {
  const hours = new Set([String(h), String(h + 12)]);
  return (value) => {
    const [hh, mm] = String(value).split(',').map(s => s.trim().replace(/^0+(?=\d)/, ''));
    return hours.has(hh) && mm === String(m);
  };
}
const clockBlank = (label, h, m) => ({ label, answer: `${h},${m}`, validate: clockValidate(h, m) });

// A date answer on a dotted line ("ngày 18 tháng 5", "18/5", "thứ Tư ngày 18
// tháng 5" or just "18"): the numbers written must be the day(s), each
// optionally followed by the month, or all the days followed by the month once
// ("từ 20 đến 24 tháng 6").
function dateValidate(days, month) {
  const ds = days.map(String), m = String(month);
  const ok = new Set([
    ds.join('|'),
    ds.map(d => `${d}|${m}`).join('|'),
    [...ds, m].join('|'),
  ]);
  return (value) => ok.has((String(value).match(/\d+/g) || []).map(n => String(Number(n))).join('|'));
}

// A weekday answer ("Chủ nhật", "Đó là Chủ nhật", "chu nhat").
function weekdayValidate(name) {
  const target = stripVN(name).replace(/[^a-z]/g, '');
  return (value) => stripVN(value).replace(/[^a-z]/g, '').endsWith(target);
}

// Letters written in a given order, with or without commas/spaces
// ("D, C, B", "D C B", "DCB"); the letters already printed before the blank
// may be copied too ("A, D, C, B").
function letterOrderValidate(letters, printed = '') {
  const norm = (s) => String(s).toUpperCase().replace(/[^A-Z]/g, '');
  const ok = new Set([norm(letters.join('')), norm(printed + letters.join(''))]);
  return (value) => ok.has(norm(stripVN(value).replace(/\bva\b/g, ' ')));
}

// Bài 34 Tiết 1 Q4: three dotted lines, each naming three collinear points.
// Any order of the lines and of the letters inside a line; every triple must
// be one of the expected ones and all three different.
function collinearValidate(triples, pointLetters) {
  const allowed = new Set(pointLetters.split(''));
  const key = (t) => t.split('').sort().join('');
  const target = triples.map(key).sort().join('|');
  return (value) => {
    const lines = String(value).split(',');
    // The engine joins the three slots with ","; a child may also have typed
    // commas inside a slot, so fall back to reading all letters in groups of 3.
    const letters = stripVN(value).toUpperCase().split(/[^A-Z]+/)
      .filter(tok => tok && tok !== 'VA' && [...tok].every(ch => allowed.has(ch))).join('');
    if (letters.length !== 9) return false;
    const groups = [letters.slice(0, 3), letters.slice(3, 6), letters.slice(6, 9)].map(key);
    return lines.length >= 3 && new Set(groups).size === 3 && groups.sort().join('|') === target;
  };
}

// "...... l + ...... l + ...... l = ...... l" (Bài 35): the three jugs may be
// added in any order; the total must be right.
function sumAnyOrderValidate(parts, total) {
  const target = parts.map(String).sort().join('|');
  return (value) => {
    const v = String(value).split(',').map(s => s.trim());
    return v.length === parts.length + 1 && v.slice(0, -1).sort().join('|') === target && v[v.length - 1] === String(total);
  };
}

// Bài 34 Tiết 2 Q3: the four answer shapes drawn inline in the choice buttons.
const PATTERN_SHAPES = {
  rect: ['0,0 34,0 34,56 0,56', '#B8E5FC'],
  tri: ['0,0 34,56 0,56', '#9CCBE3'],
  quad: ['0,6 34,0 34,56 0,56', '#FFFFFF'],
  sq: ['0,14 40,14 40,56 0,56', '#A6D3EA'],
};
const shapeOption = (kind) => `<svg viewBox="-3 -3 46 62" width="37" height="50" style="vertical-align:middle" aria-label="hình"><polygon points="${PATTERN_SHAPES[kind][0]}" fill="${PATTERN_SHAPES[kind][1]}" stroke="#00AEEF" stroke-width="2.5"/></svg>`;

export const BAI_31_36 = [
  // ── BÀI 31 (trang 114–117) ────────────────────────────────────────────────
  {
    id: 'bai-31', number: 31, title: 'Thực hành và trải nghiệm xem đồng hồ, xem lịch',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB31T1Q3,
        q: '3. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          clockBlank('(1) ... giờ ... phút', 7, 30),
          clockBlank('(2) ... giờ ... phút', 4, 15),
          clockBlank('(3) ... giờ ... phút', 4, 30),
          clockBlank('(4) ... giờ ... phút', 7, 15),
        ],
        hints: ['Kim ngắn chỉ giờ, kim dài chỉ phút. Kim dài chỉ số 3 là 15 phút, chỉ số 6 là 30 phút.'],
      },
      {
        type: 'compare', section: 'Tiết 1', img: imgB31T1Q4,
        q: '4. Khoanh vào chữ đặt trước đồng hồ chỉ thời gian thích hợp cho hoạt động ở mỗi bức tranh.',
        rows: [
          { left: 'Tranh 1: Hai bạn trồng cây, tưới cây.', options: ['A. 06 : 15', 'B. 23 : 30'], answer: 'A' },
          { left: 'Tranh 2: Rô-bốt câu cá.', options: ['A. 03 : 30', 'B. 16 : 15'], answer: 'B' },
          { left: 'Tranh 3: Bạn gái xếp các khối hộp.', options: ['A. 09 : 00', 'B. 00 : 30'], answer: 'A' },
          { left: 'Tranh 4: Rô-bốt và bạn chơi bóng chuyền.', options: ['A. 12 : 15', 'B. 17 : 30'], answer: 'B' },
        ],
        hints: ['23 : 30, 03 : 30 và 00 : 30 là lúc nửa đêm, mọi người đang ngủ.'],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB31T1Q5,
        q: '5. Khoanh vào chữ đặt trước câu trả lời đúng.\nĐồng hồ trong hình vẽ cho biết thời gian về đến nhà (sau giờ học) của mỗi bạn.\nNhững bạn nào về nhà trước 5 giờ chiều?',
        options: ['Nam và Mai', 'Mai và Rô-bốt', 'Nam và Việt'],
        answer: 1,
        hints: ['5 giờ chiều là 17 giờ. Đồng hồ của Nam chỉ 5 giờ 15 phút, của Rô-bốt chỉ 4 giờ 30 phút.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB31T2Q2,
        q: '2. Xem tờ lịch tháng 5 sau đây rồi viết câu trả lời.',
        blanks: [
          { label: 'a) Ngày 1 tháng 5 là ngày Quốc tế Lao động. Đó là thứ mấy?', answer: 'Chủ nhật', validate: weekdayValidate('Chủ nhật') },
          { label: 'b) Nếu hôm nay là ngày 15 tháng 5 và trường của Rô-bốt sẽ tổ chức buổi tổng kết năm học vào thứ Tư tuần sau. Hỏi ngày đó là ngày nào?', answer: 'Ngày 18 tháng 5', validate: dateValidate([18], 5) },
          { label: 'Kì nghỉ hè của Rô-bốt sẽ bắt đầu vào một ngày sau đó – tức thứ Năm tuần sau. Vậy Rô-bốt bắt đầu nghỉ hè vào ngày nào?', answer: 'Ngày 19 tháng 5', validate: dateValidate([19], 5) },
        ],
        hints: ['Ngày 15 tháng 5 là Chủ nhật. Tuần sau bắt đầu từ thứ Hai ngày 16 tháng 5.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB31T2Q3,
        q: '3. Xem tờ lịch tháng 6 sau đây rồi viết câu trả lời.\nMỗi tuần trong tháng 6, Rô-bốt sẽ theo học một môn năng khiếu. Tuần đầu tiên, Rô-bốt học vẽ. Tuần thứ hai, Rô-bốt học đàn. Tuần thứ ba, Rô-bốt học võ. Tuần thứ tư, Rô-bốt sẽ học hát.\nBiết Rô-bốt chỉ học các ngày trong tuần và nghỉ thứ Bảy, Chủ nhật.',
        blanks: [
          { label: 'Vậy Rô-bốt bắt đầu học vẽ ngày nào?', answer: 'Ngày 1 tháng 6', validate: dateValidate([1], 6) },
          { label: 'Rô-bốt kết thúc học đàn vào ngày nào?', answer: 'Ngày 10 tháng 6', validate: dateValidate([10], 6) },
          { label: 'Rô-bốt học hát từ ngày nào đến ngày nào?', answer: 'Từ ngày 20 tháng 6 đến ngày 24 tháng 6', validate: dateValidate([20, 24], 6) },
        ],
        hints: ['Tuần đầu tiên của tháng 6 là từ thứ Tư ngày 1 đến Chủ nhật ngày 5.', 'Mỗi tuần Rô-bốt học từ thứ Hai đến thứ Sáu.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Trong một năm có bao nhiêu tháng có 30 ngày?', options: ['A. 4 tháng', 'B. 6 tháng', 'C. 7 tháng'], answer: 'A' },
          { left: 'b) Trong một năm có bao nhiêu tháng có ngày 30?', options: ['A. 6 tháng', 'B. 7 tháng', 'C. 11 tháng'], answer: 'C' },
        ],
        hints: ['Các tháng có 30 ngày: tháng 4, 6, 9, 11. Chỉ có tháng 2 là không có ngày 30.'],
      },
    ],
  },

  // ── BÀI 32 (trang 118–119) ────────────────────────────────────────────────
  {
    id: 'bai-32', number: 32, title: 'Luyện tập chung',
    questions: [
      {
        type: 'choice', img: imgB32Q1,
        q: '1. Khoanh vào chữ đặt trước câu trả lời đúng.\nTrong đồng hồ bên, khi kim dài chạy qua số 1, số 2, đến số 3 thì lúc này đồng hồ chỉ:',
        options: ['3 giờ', '12 giờ 15 phút', '1 giờ 15 phút'],
        answer: 2,
        hints: ['Đồng hồ đang chỉ 1 giờ. Kim dài chạy từ số 12 đến số 3 là thêm 15 phút.'],
      },
      {
        type: 'fill', img: imgB32Q2,
        q: '2. Viết tiếp vào chỗ chấm cho thích hợp (theo mẫu).\nTrong tháng 7, Rô-bốt có tham dự 4 cuộc thi khác nhau. Lịch thi được cho như trong hình vẽ.\nVậy: Rô-bốt thi vẽ vào ngày 5 tháng 7.',
        blanks: [
          { label: 'Rô-bốt thi đấu võ thuật vào ngày ...', answer: '31 tháng 7', validate: dateValidate([31], 7) },
          { label: 'Rô-bốt thi bơi vào ngày ...', answer: '23 tháng 7', validate: dateValidate([23], 7) },
          { label: 'Rô-bốt thi hát vào ngày ...', answer: '11 tháng 7', validate: dateValidate([11], 7) },
        ],
        hints: ['Nhìn mũi tên đi từ ngày được khoanh tròn đến bức tranh.'],
      },
      {
        type: 'choice', multi: true, img: imgB32Q3,
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp.\nLớp học bóng rổ bắt đầu vào lúc 15 giờ và kết thúc vào lúc 16 giờ. Học sinh không thể tham gia lớp học nếu vào lớp muộn.\nBiết thời gian đến lớp học của các bạn là (xem tranh).\nVậy những bạn không thể tham gia lớp học đó là: ...\n(Chọn tất cả các bạn đến muộn.)',
        options: ['Bạn gái', 'Bạn trai thứ nhất', 'Bạn trai thứ hai', 'Rô-bốt'],
        answer: [1, 3],
        hints: ['15 giờ là 3 giờ chiều. Bạn nào đến sau 3 giờ là đến muộn.'],
      },
      {
        type: 'fill', img: imgB32Q4,
        q: '4. Quan sát tranh rồi viết số thích hợp vào chỗ chấm.',
        blanks: [
          clockBlank('a) Rô-bốt kết thúc học hát lúc ... giờ ... phút.', 9, 30),
          clockBlank('b) Rô-bốt bắt đầu rửa bát lúc ... giờ ... phút.', 7, 15),
        ],
        hints: ['a) Xem đồng hồ "Kết thúc". b) Xem đồng hồ "Bắt đầu".'],
      },
    ],
  },

  // ── BÀI 33 (trang 120–125) ────────────────────────────────────────────────
  {
    id: 'bai-33', number: 33, title: 'Ôn tập phép cộng, phép trừ trong phạm vi 20, 100',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính nhẩm.',
        blanks: [
          { label: 'a) 6 + 7 = ...', answer: '13' },
          { label: '7 + 6 = ...', answer: '13' },
          { label: '13 − 7 = ...', answer: '6' },
          { label: '13 − 6 = ...', answer: '7' },
          { label: 'b) 8 + 6 = ...', answer: '14' },
          { label: '6 + 8 = ...', answer: '14' },
          { label: '14 − 8 = ...', answer: '6' },
          { label: '14 − 6 = ...', answer: '8' },
          { label: 'c) 9 + 3 = ...', answer: '12' },
          { label: '3 + 9 = ...', answer: '12' },
          { label: '12 − 3 = ...', answer: '9' },
          { label: '12 − 9 = ...', answer: '3' },
        ],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. a) Nối mỗi bông hoa với lọ hoa tương ứng (theo mẫu).',
        left: [
          { id: 'f1', text: '🌼 11' }, { id: 'f2', text: '🌼 13' }, { id: 'f3', text: '🌼 12' },
          { id: 'f4', text: '🌼 12' }, { id: 'f5', text: '🌼 15' }, { id: 'f6', text: '🌼 13' },
          { id: 'f7', text: '🌼 11' }, { id: 'f8', text: '🌼 15' }, { id: 'f9', text: '🌼 13' },
          { id: 'f10', text: '🌼 15' }, { id: 'f11', text: '🌼 13' }, { id: 'f12', text: '🌼 12' },
        ],
        right: [
          { id: 'vA', text: 'Lọ A: 7 + 4' }, { id: 'vB', text: 'Lọ B: 9 + 6' },
          { id: 'vC', text: 'Lọ C: 8 + 5' }, { id: 'vD', text: 'Lọ D: 6 + 6' },
        ],
        pairs: [
          ['f1', 'vA'], ['f7', 'vA'],
          ['f5', 'vB'], ['f8', 'vB'], ['f10', 'vB'],
          ['f2', 'vC'], ['f6', 'vC'], ['f9', 'vC'], ['f11', 'vC'],
          ['f3', 'vD'], ['f4', 'vD'], ['f12', 'vD'],
        ],
        hints: ['Tính kết quả phép tính ở mỗi lọ: 7 + 4 = 11, 9 + 6 = 15, 8 + 5 = 13, 6 + 6 = 12.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. (Lọ A: 7 + 4; lọ B: 9 + 6; lọ C: 8 + 5; lọ D: 6 + 6 — các bông hoa đã nối ở câu a.)',
        blanks: [
          { label: 'b) Viết tên các lọ hoa theo thứ tự kết quả phép tính ở mỗi lọ hoa từ bé đến lớn: A, ...', answer: 'D, C, B', validate: letterOrderValidate(['D', 'C', 'B'], 'A') },
          { label: 'c) Tô màu đỏ vào lọ hoa nối với nhiều bông hoa nhất, màu xanh vào lọ hoa nối với ít bông hoa nhất.<br>Lọ tô màu đỏ là lọ ...', answer: 'C', validate: letterOrderValidate(['C']) },
          { label: 'Lọ tô màu xanh là lọ ...', answer: 'A', validate: letterOrderValidate(['A']) },
        ],
        hints: ['Kết quả: A = 11, B = 15, C = 13, D = 12.', 'Đếm số bông hoa nối với mỗi lọ: lọ C có 4 bông, lọ A có 2 bông.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB33T1Q3,
        q: '3. Số?',
        blanks: [
          { label: 'Vòng tròn cạnh trái', answer: '14' },
          { label: 'Vòng tròn trên cùng', answer: '10' },
          { label: 'Vòng tròn cạnh phải', answer: '8' },
          { label: 'Vòng tròn giữa hàng dưới', answer: '16' },
          { label: 'Vòng tròn góc phải hàng dưới', answer: '12' },
        ],
        hints: ['Làm theo chiều mũi tên: 9 + 5 = 14, rồi 14 − 4 = ...'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '4. Lớp 2B có 12 bạn tham gia học võ, số bạn tham gia học đàn ít hơn số bạn tham gia học võ là 4 bạn. Hỏi lớp 2B có bao nhiêu bạn tham gia học đàn?',
        blanks: [{ label: 'Số bạn tham gia học đàn', answer: '8' }],
      },
      {
        type: 'table', section: 'Tiết 2', img: imgB33T2Q1,
        q: '1. Rô-bốt hái dưa hấu cho vào sọt có số là kết quả phép tính ghi trên quả dưa đó.\na) Số?',
        rows: [
          ['Sọt', 'A', 'B', 'C', 'D'],
          ['Số quả dưa hái được', 5, blank(4), blank(2), blank(4)],
        ],
        blanks: [
          { label: 'b) Viết tên sọt A, B, C, D vào chỗ chấm thích hợp.<br>Sọt ... có nhiều dưa nhất.', answer: 'A', validate: letterOrderValidate(['A']) },
          { label: 'Sọt ... có ít dưa nhất.', answer: 'C', validate: letterOrderValidate(['C']) },
          { label: 'Sọt ... và sọt ... có số dưa bằng nhau.', answer: 'B, D', validate: setValidate(['B', 'D']) },
        ],
        hints: ['Tính kết quả từng quả dưa rồi đếm: có bao nhiêu quả bằng 7, bằng 10, bằng 13?'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '2. >; <; = ?',
        rows: [
          { left: 'a) 6 + 8', right: '13', answer: '>' },
          { left: '9 + 4', right: '14', answer: '<' },
          { left: '5 + 6', right: '11', answer: '=' },
          { left: 'b) 4 + 7', right: '7 + 4', answer: '=' },
          { left: '4 + 7', right: '4 + 8', answer: '<' },
          { left: '4 + 7', right: '4 + 6', answer: '>' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB33T2Q3,
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.\nPhải lấy hai trong bốn túi gạo nào đặt lên đĩa cân bên phải để cân thăng bằng?',
        options: ['Túi ① và ②', 'Túi ③ và ②', 'Túi ② và ④'],
        answer: 2,
        hints: ['Đĩa cân bên trái có 3 kg + 9 kg = 12 kg. Tìm hai túi cộng lại được 12 kg.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '4. Một cửa hàng buổi sáng bán được 9 máy tính, buổi chiều bán được nhiều hơn buổi sáng 4 máy tính. Hỏi buổi chiều cửa hàng bán được bao nhiêu máy tính?',
        blanks: [{ label: 'Số máy tính buổi chiều bán được', answer: '13' }],
      },
      {
        type: 'table', section: 'Tiết 3', img: imgB33T3Q1,
        q: '1. a) Số?',
        rows: [
          ['Toa', 'A', 'B', 'C', 'D', 'E'],
          ['Kết quả phép tính', 100, blank(30), blank(60), blank(50), blank(70)],
        ],
        blanks: [
          { label: 'b) Viết tên toa thích hợp vào chỗ chấm.<br>• Toa ghi phép tính có kết quả lớn nhất là toa ...', answer: 'A', validate: letterOrderValidate(['A']) },
          { label: 'toa ghi phép tính có kết quả bé nhất là toa ...', answer: 'B', validate: letterOrderValidate(['B']) },
          { label: '• Những toa ghi phép tính có kết quả bé hơn 60 là toa ... và toa ...', answer: 'B, D', validate: setValidate(['B', 'D']) },
          { label: '• Những toa ghi phép tính có kết quả lớn hơn 50 và bé hơn 100 là toa ... và toa ...', answer: 'C, E', validate: setValidate(['C', 'E']) },
        ],
        hints: ['A: 70 + 30 = 100; B: 86 − 56 = 30; C: 73 − 13 = 60; D: 92 − 42 = 50; E: 20 + 50 = 70.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Đặt tính rồi tính.',
        blanks: [
          { label: '47 + 25', answer: '72' },
          { label: '62 − 17', answer: '45' },
          { label: '28 + 43', answer: '71' },
        ],
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '3. a) Nối (theo mẫu).\nTìm chỗ đỗ cho ô tô.',
        left: [
          { id: 'c1', text: '🚙 28 + 15' }, { id: 'c2', text: '🚙 14 + 16' }, { id: 'c3', text: '🚙 72 − 45' },
          { id: 'c4', text: '🚙 66 − 12' }, { id: 'c5', text: '🚙 34 + 16' },
        ],
        right: [
          { id: 'pA', text: 'A: 61 − 34' }, { id: 'pB', text: 'B: 16 + 27' }, { id: 'pC', text: 'C: 95 − 45' },
          { id: 'pD', text: 'D: 65 − 35' }, { id: 'pE', text: 'E: 25 + 29' }, { id: 'pG', text: 'G: 36 + 17' },
        ],
        pairs: [['c1', 'pB'], ['c2', 'pD'], ['c3', 'pA'], ['c4', 'pE'], ['c5', 'pC']],
        hints: ['Ô tô đỗ vào bến có cùng kết quả: 28 + 15 = 43 và 16 + 27 = 43.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. b) Viết tên bến đỗ thích hợp vào chỗ chấm.\n(Các bến: A: 61 − 34; B: 16 + 27; C: 95 − 45; D: 65 − 35; E: 25 + 29; G: 36 + 17.)',
        blanks: [{ label: 'Bến ... không có ô tô đỗ.', answer: 'G', validate: letterOrderValidate(['G']) }],
        hints: ['Các ô tô có kết quả 43, 30, 27, 54, 50. Bến nào có kết quả khác tất cả các số đó?'],
      },
      {
        type: 'fill', section: 'Tiết 3', wordProblem: true,
        q: '4. Một đội đồng diễn thể dục gồm có 56 người mặc áo đỏ và 28 người mặc áo vàng. Hỏi số người mặc áo đỏ nhiều hơn số người mặc áo vàng là bao nhiêu người?',
        blanks: [{ label: 'Số người mặc áo đỏ nhiều hơn số người mặc áo vàng', answer: '28' }],
      },
      {
        type: 'fill', section: 'Tiết 4', img: imgB33T4Q1,
        q: '1. Số?',
        blanks: [
          { label: 'a) 25 → ... → ...', answer: '16,24' },
          { label: '34 → ... → ... → ...', answer: '41,35,43' },
          { label: 'b) 13 + 13 + 13 + 13 = ...', answer: '52' },
          { label: '5 + 5 + 5 + 5 + 5 + 5 + 5 = ...', answer: '35' },
        ],
        hints: ['Làm theo chiều mũi tên: 25 − 9 = 16, rồi 16 + 8 = ...'],
      },
      {
        type: 'fill', section: 'Tiết 4', img: imgB33T4Q2,
        q: '2. Số?\n(Số ở mỗi viên gạch bằng tổng hai số ở hai viên gạch ngay bên dưới nó.)',
        blanks: [
          { label: 'Viên gạch A', answer: '6' },
          { label: 'Viên gạch B', answer: '7' },
          { label: 'Viên gạch C', answer: '13' },
          { label: 'Viên gạch D', answer: '12' },
          { label: 'Viên gạch E', answer: '25' },
          { label: 'Viên gạch G', answer: '25' },
          { label: 'Viên gạch H', answer: '50' },
        ],
        hints: ['Ví dụ: 3 + 4 = 7, 4 + 2 = 6, 7 + 6 = 13.'],
      },
      {
        type: 'table', section: 'Tiết 4',
        q: '3. Viết số thích hợp vào chỗ chấm.\nCho bảng sau:',
        rows: [
          [11, 12, 13, 14, 15, 16, 17],
          [18, 19, 20, 21, 22, 23, 24],
          [25, 26, 27, 28, 29, 30, 31],
          [32, 33, 34, 35, 36, 37, 38],
          [39, 40, 41, 42, 43, 44, 45],
        ],
        blanks: [
          { label: 'a) Hiệu của số lớn nhất và số bé nhất có trong bảng là ...', answer: '34' },
          { label: 'b) Hai số trong bảng có tổng bằng 24 là số ... và ...', answer: '11,13', validate: setValidate(['11', '13']) },
          { label: 'c) Ba số trong bảng có tổng bé nhất là các số ..., ... và ...', answer: '11,12,13', validate: setValidate(['11', '12', '13']) },
        ],
        hints: ['Số lớn nhất trong bảng là 45, số bé nhất là 11.', 'Số bé nhất trong bảng là 11, vậy số kia là 24 − 11.'],
      },
      {
        type: 'fill', section: 'Tiết 4', wordProblem: true,
        q: '4. Một ao sen có 62 nụ sen. Sáng nay đã có 35 nụ sen nở thành hoa. Hỏi lúc này ao sen còn lại bao nhiêu nụ sen chưa nở?',
        blanks: [{ label: 'Số nụ sen chưa nở', answer: '27' }],
      },
    ],
  },

  // ── BÀI 34 (trang 126–128) ────────────────────────────────────────────────
  {
    id: 'bai-34', number: 34, title: 'Ôn tập hình phẳng',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB34T1Q1,
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Có ... đoạn thẳng', answer: '4' },
          { label: 'b) Có ... đoạn thẳng', answer: '4' },
          { label: 'c) Có ... đoạn thẳng', answer: '5' },
          { label: 'd) Có ... đoạn thẳng', answer: '6' },
        ],
        hints: ['d) Hình vuông có 4 cạnh, hình tam giác ghép thêm 2 đoạn thẳng nữa (cạnh chung chỉ đếm một lần).'],
      },
      {
        type: 'choice', section: 'Tiết 1', multi: true, img: imgB34T1Q3,
        q: '3. Tô màu vào những hình tứ giác trong các hình dưới đây.\n(Chọn tất cả các hình tứ giác.)',
        options: ['Hình 1', 'Hình 2', 'Hình 3', 'Hình 4'],
        answer: [0, 1, 3],
        hints: ['Hình tứ giác có 4 cạnh. Hình 3 có 5 cạnh.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB34T1Q4,
        q: '4. Viết tên ba điểm thẳng hàng có trong hình sau.\nMẫu: A, M, B là ba điểm thẳng hàng.',
        blanks: [
          { label: '...<br>...<br>...', answer: 'D N C, M P N, A P C', validate: collinearValidate(['DNC', 'MPN', 'APC'], 'ABCDMNP') },
        ],
        hints: ['Tìm ba điểm cùng nằm trên một đoạn thẳng: cạnh DC, đoạn thẳng MN, đoạn thẳng AC.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB34T2Q2,
        q: '2. a) Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [{ label: 'Độ dài đoạn thẳng NP là: ...', answer: '6 cm', validate: unitValidate(6, 'cm') }],
        hints: ['MP dài 13 cm, MN dài 7 cm. NP = 13 cm − 7 cm.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB34T2Q3,
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.\nHình thích hợp đặt vào dấu “?” là:',
        options: [shapeOption('rect'), shapeOption('tri'), shapeOption('quad'), shapeOption('sq')],
        answer: 2,
        hints: ['Các hình lặp lại theo nhóm 4 hình: hình chữ nhật, hình tam giác, hình tứ giác trắng, hình vuông.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB34T2Q4,
        q: '4. Viết số thích hợp vào chỗ chấm.',
        blanks: [{ label: 'Hình N được xếp bởi ... hình A.', answer: '12' }],
        hints: ['Hình A bằng nửa hình vuông 2 × 2 ô. Chia hình N thành các phần giống hình A rồi đếm.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB34T2Q5,
        q: '5. Khoanh vào chữ đặt trước câu trả lời đúng.\nSố hình tứ giác có trong hình bên là:',
        options: ['2', '3', '4', '5'],
        answer: 2,
        hints: ['Các hình tứ giác: AMND, MBPN, MBCN và ABCD.'],
      },
    ],
  },

  // ── BÀI 35 (trang 129–131) ────────────────────────────────────────────────
  {
    id: 'bai-35', number: 35, title: 'Ôn tập đo lường',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB35T1Q1,
        q: '1. Đ, S?',
        blanks: [
          { label: 'a) Quả bí ngô nặng hơn quả bưởi.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) Quả bưởi nặng hơn quả cam.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'c) Quả cam nặng hơn quả bí ngô.', answer: 'S', validate: dsValidate(false) },
        ],
        hints: ['Đĩa cân bên nào thấp hơn thì vật ở bên đó nặng hơn.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: '48 kg + 35 kg = ... kg', answer: '83' },
          { label: '65 kg − 27 kg = ... kg', answer: '38' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB35T1Q3,
        q: '3. Quan sát tranh.\na) Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: '... kg + ... kg = ... kg', answer: '2,5,7', validate: swapPairValidate(2, 5, 7) },
          { label: '... kg − ... kg = ... kg', answer: '6,2,4' },
          { label: 'Túi gạo cân nặng ... kg.', answer: '7' },
          { label: 'Con thỏ cân nặng ... kg.', answer: '4' },
        ],
        hints: ['Cân đĩa thăng bằng: túi gạo nặng bằng 2 kg + 5 kg.', 'Cân đồng hồ chỉ 6 kg, gồm quả cân 2 kg và con thỏ.'],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB35T1Q3,
        q: '3. b) Khoanh vào chữ đặt trước câu trả lời đúng.\nCả túi gạo và con thỏ cân nặng bao nhiêu ki-lô-gam?',
        options: ['13 kg', '12 kg', '11 kg'],
        answer: 2,
        hints: ['Túi gạo nặng 7 kg, con thỏ nặng 4 kg.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '4. Con lợn cân nặng 42 kg, con chó nhẹ hơn con lợn 25 kg. Hỏi con chó cân nặng bao nhiêu ki-lô-gam?',
        blanks: [{ label: 'Con chó cân nặng (kg)', answer: '17' }],
      },
      {
        type: 'choice', section: 'Tiết 1',
        q: '5. Khoanh vào chữ đặt trước câu trả lời đúng.\nCó bốn con dê muốn sang sông để ăn cỏ. Rô-bốt nói: “Thuyền chỉ chở thêm được nhiều nhất 51 kg”. Hỏi ba con dê nào sau đây không thể cùng nhau sang sông?',
        options: ['Ba con dê cân nặng 15 kg, 17 kg, 19 kg.', 'Ba con dê cân nặng 16 kg, 17 kg, 19 kg.', 'Ba con dê cân nặng 15 kg, 16 kg, 17 kg.'],
        answer: 1,
        hints: ['Cộng cân nặng của ba con dê ở mỗi phương án rồi so sánh với 51 kg.'],
      },
      {
        type: 'table', section: 'Tiết 2', img: imgB35T2Q1,
        q: '1. Viết số thích hợp vào chỗ chấm.\nCó ba bình chứa đầy nước. Bạn Mai đã rót hết nước ở các bình sang đầy các ca 1 <i>l</i> thì được số ca 1 <i>l</i> tương ứng như hình vẽ.\na)',
        rows: [
          ['Bình', 'A', 'B', 'C'],
          ['Mỗi bình chứa được', '7 <i>l</i>', blank(5, { validate: unitValidate(5, 'l') }), blank(4, { validate: unitValidate(4, 'l') })],
        ],
        blanks: [
          { label: 'b) Cả ba bình chứa được bao nhiêu lít nước?<br>... <i>l</i> + ... <i>l</i> + ... <i>l</i> = ... <i>l</i>', answer: '7,5,4,16', validate: sumAnyOrderValidate([7, 5, 4], 16) },
        ],
        hints: ['Đếm số ca 1 <i>l</i> bên cạnh mỗi bình.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) 25 <i>l</i> + 30 <i>l</i> = ... <i>l</i>', answer: '55' },
          { label: '40 <i>l</i> + 20 <i>l</i> = ... <i>l</i>', answer: '60' },
          { label: '55 <i>l</i> − 30 <i>l</i> = ... <i>l</i>', answer: '25' },
          { label: '... <i>l</i> − 20 <i>l</i> = 40 <i>l</i>', answer: '60' },
          { label: '55 <i>l</i> − 25 <i>l</i> = ... <i>l</i>', answer: '30' },
          { label: '... <i>l</i> − 40 <i>l</i> = 20 <i>l</i>', answer: '60' },
          { label: 'b) 37 <i>l</i> + 4 <i>l</i> − 20 <i>l</i> = ... <i>l</i>', answer: '21' },
          { label: '53 <i>l</i> − 8 <i>l</i> + 30 <i>l</i> = ... <i>l</i>', answer: '75' },
        ],
        hints: ['Tính từ trái sang phải: 37 + 4 = 41, rồi 41 − 20 = ...'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '3. Lớp 2A có 18 bạn tham gia học bơi, số bạn tham gia học hát nhiều hơn số bạn tham gia học bơi là 3 bạn. Hỏi lớp 2A có bao nhiêu bạn tham gia học hát?',
        blanks: [{ label: 'Số bạn tham gia học hát', answer: '21' }],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB35T2Q4,
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nTrong thùng có 20 <i>l</i> nước. Múc hết nước từ thùng rót vào đầy các can. Có thể rót vào đầy tất cả các can trong phương án nào sau đây?',
        options: ['Can 3 <i>l</i>, can 10 <i>l</i>, can 5 <i>l</i>, can 2 <i>l</i>', 'Can 2 <i>l</i>, can 5 <i>l</i>, can 15 <i>l</i>', 'Can 10 <i>l</i>, can 2 <i>l</i>, can 3 <i>l</i>, can 6 <i>l</i>'],
        answer: 0,
        hints: ['Cộng số lít của các can trong mỗi phương án, phương án nào được đúng 20 <i>l</i>?'],
      },
    ],
  },

  // ── BÀI 36 (trang 132–135) ────────────────────────────────────────────────
  {
    id: 'bai-36', number: 36, title: 'Ôn tập chung',
    questions: [
      {
        type: 'compare', section: 'Tiết 1', img: imgB36T1Q1,
        q: '1. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Số thích hợp viết vào ô trống là:', options: ['A. 58', 'B. 59', 'C. 60', 'D. 61'], answer: 'B' },
          { left: 'b) Số lớn nhất trong các số 45, 39, 86, 68 là:', options: ['A. 45', 'B. 39', 'C. 86', 'D. 68'], answer: 'C' },
          { left: 'c) Nếu ngày 16 tháng 11 là thứ Tư thì ngày 20 tháng 11 là:', options: ['A. Thứ Năm', 'B. Thứ Sáu', 'C. Thứ Bảy', 'D. Chủ nhật'], answer: 'D' },
        ],
        hints: ['a) Đếm từng vạch: 53, 54, 55, 56, ...', 'c) Thứ Tư ngày 16, thứ Năm ngày 17, ...'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Nối mỗi bức tranh với đồng hồ thích hợp.',
        left: [
          { id: 'p1', img: imgB36School, text: 'Nam tới trường lúc 7 giờ 30 phút.' },
          { id: 'p2', img: imgB36Homework, text: 'Nam làm bài tập lúc 3 giờ chiều.' },
          { id: 'p3', img: imgB36Swim, text: 'Nam tập bơi lúc 5 giờ 15 phút chiều.' },
          { id: 'p4', img: imgB36Piano, text: 'Nam tập đàn lúc 8 giờ 30 phút tối.' },
        ],
        right: [
          { id: 'k1', text: '07 : 30' }, { id: 'k2', text: '15 : 00' },
          { id: 'k3', text: '17 : 15' }, { id: 'k4', text: '20 : 30' },
        ],
        pairs: [['p1', 'k1'], ['p2', 'k2'], ['p3', 'k3'], ['p4', 'k4']],
        hints: ['3 giờ chiều là 15 giờ, 5 giờ chiều là 17 giờ, 8 giờ tối là 20 giờ.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Đặt tính rồi tính.',
        blanks: [
          { label: 'a) 45 + 8', answer: '53' },
          { label: '9 + 56', answer: '65' },
          { label: '37 + 48', answer: '85' },
          { label: 'b) 52 − 7', answer: '45' },
          { label: '63 − 59', answer: '4' },
          { label: '94 − 75', answer: '19' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '4. Mẹ cân nặng 49 kg, bố nặng hơn mẹ 16 kg. Hỏi bố cân nặng bao nhiêu ki-lô-gam?',
        blanks: [{ label: 'Bố cân nặng (kg)', answer: '65' }],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB36T1Q5,
        q: '5. Đ, S?\nCó hai đường để kiến đến chỗ miếng bánh như hình dưới đây.',
        blanks: [
          { label: 'a) Độ dài đường đi ABC dài hơn độ dài đường đi MNPQ.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) Độ dài đường đi ABC ngắn hơn độ dài đường đi MNPQ.', answer: 'S', validate: dsValidate(false) },
        ],
        hints: ['ABC dài 32 cm + 19 cm; MNPQ dài 21 cm + 12 cm + 15 cm.'],
      },
      {
        type: 'compare', section: 'Tiết 2', img: imgB36T2Q1,
        q: '1. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Hai đồng hồ chỉ cùng giờ vào buổi chiều là:', options: ['A. N và E', 'B. N và G', 'C. M và E'], answer: 'C' },
          { left: 'b) Độ dài đường gấp khúc ABCD là:', options: ['A. 8 cm', 'B. 13 cm', 'C. 31 cm'], answer: 'B' },
        ],
        hints: ['a) Đồng hồ M chỉ 2 giờ 15 phút, buổi chiều là 14 giờ 15 phút.', 'b) Cộng độ dài ba đoạn thẳng: 4 cm + 4 cm + 5 cm.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB36T2Q2,
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Quả dưa cân nặng ... kg.', answer: '3' },
          { label: 'b) Rót đầy ba ca từ một can chứa đầy nước.<br>Trong can còn lại ... <i>l</i> nước.', answer: '4' },
        ],
        hints: ['a) Quả dưa và quả cân 2 kg nặng bằng quả cân 5 kg.', 'b) Ba ca 2 <i>l</i> chứa 2 <i>l</i> + 2 <i>l</i> + 2 <i>l</i> = 6 <i>l</i>.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '3. Hưởng ứng phong trào vẽ tranh tuyên truyền bảo vệ môi trường, lớp 2A vẽ được 17 bức tranh, lớp 2B vẽ được nhiều hơn lớp 2A là 8 bức tranh, lớp 2C vẽ được 20 bức tranh. Hỏi:\na) Lớp 2B vẽ được bao nhiêu bức tranh?\nb) Lớp 2A và lớp 2C vẽ được bao nhiêu bức tranh?',
        blanks: [
          { label: 'a) Số bức tranh lớp 2B vẽ được', answer: '25' },
          { label: 'b) Số bức tranh lớp 2A và lớp 2C vẽ được', answer: '37' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB36T2Q4,
        q: '4. Số?',
        blanks: [
          { label: 'a) Hình vuông', answer: '45' },
          { label: 'Hình ngũ giác', answer: '54' },
          { label: 'Hình tam giác', answer: '24' },
          { label: 'b) Hình ngũ giác', answer: '73' },
          { label: 'Hình vuông', answer: '16' },
          { label: 'Hình tam giác', answer: '24' },
        ],
        hints: ['Làm theo chiều mũi tên: a) 71 − 26 = 45; b) 34 + 39 = 73.'],
      },
    ],
  },
];
