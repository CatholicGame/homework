/**
 * Vở bài tập Toán 3 — Tập hai: Bài 72–75 (sách trang 96–106).
 * Luyện tập chung; thu thập, phân loại, ghi chép số liệu, bảng số liệu; khả năng
 * xảy ra của một sự kiện. Bài 75 (thực hành khảo sát ở lớp, ở nhà) chỉ gồm các
 * cuộc khảo sát bé tự làm nên không số hoá.
 */
import { blank, dsValidate, exprValidate, stripVN, phraseValidate } from '../grade3Workbook.js';
import imgB72Calcs from '../../assets/grade3-workbook-2/bai72_t1_q2_calcs.svg';
import imgB72Map from '../../assets/grade3-workbook-2/bai72_t2_q1_map.svg';
import imgB72Puzzles from '../../assets/grade3-workbook-2/bai72_t2_q5_puzzles.svg';
import imgB74Wheel from '../../assets/grade3-workbook-2/bai74_q1_wheel.svg';
import imgB74Cookies from '../../assets/grade3-workbook-2/bai74_q3_cookies.svg';
import imgB74Dice from '../../assets/grade3-workbook-2/bai74_q4_dice.svg';

// ── Local helpers ────────────────────────────────────────────────────────────

// Numbers from 1 000 up are printed with a thin space ("54 000"): a typed
// answer is accepted with or without spaces or dots ("54000", "54 000", "54.000").
const digits = (v) => String(v).replace(/[\s.]/g, '');
const numOk = (n) => (v) => digits(v) === String(n);

// A blank row of numbers, one per "..." (compared slot by slot, spaces/dots ignored).
function N(label, ...ns) {
  const answer = ns.map(String).join(',');
  const validate = (v) => {
    const got = String(v).split(',');
    return got.length === ns.length && got.every((g, i) => digits(g) === String(ns[i]));
  };
  return { label, answer, validate };
}

// A number cell of a table (spaces/dots ignored).
const cellN = (n) => blank(n, { validate: numOk(n) });

// A word-problem answer: the number, optionally followed by its unit ("15 000 đồng").
function unitNum(n, ...units) {
  const us = units.map(u => stripVN(u).replace(/\s+/g, ''));
  return (v) => {
    const t = stripVN(v).replace(/[\s.]/g, '');
    return t === String(n) || us.some(u => t === String(n) + u);
  };
}

// "a) Vào thứ ... thì ..." (Bài 73): a day of the week, with or without "thứ",
// accents or case; the digit form ("6" for thứ Sáu) is accepted too.
const DAY = { hai: '2', ba: '3', tu: '4', nam: '5', sau: '6', bay: '7', chunhat: 'cn', cn: 'cn', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7' };
const dayKey = (s) => DAY[stripVN(s).replace(/thu/g, '').replace(/[^a-z0-9]/g, '')] || '?';
const dayValidate = (day) => (v) => dayKey(v) === dayKey(day);
// Several days in one blank, any order ("Hai, Ba, Sáu, Chủ nhật", "thứ Hai, thứ Ba, thứ Sáu và Chủ nhật").
function daysValidate(days) {
  const target = days.map(dayKey).sort().join('|');
  return (v) => stripVN(v).split(/\s*(?:,|;|\bva\b)\s*/).filter(s => s.trim())
    .map(dayKey).sort().join('|') === target;
}
// The 8-column egg table (a day per column) keeps to the width of a phone:
// columns size to their content with slimmer side padding.
const EGG_STYLE = '<style>.gw-table:has(.b73-eggs) col{width:auto!important}'
  + '.gw-table:has(.b73-eggs) th,.gw-table:has(.b73-eggs) td{padding-left:.3rem!important;padding-right:.3rem!important;white-space:nowrap}</style>';
const DAY_TILES = ['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'Chủ nhật'];

// A film genre written after the printed word "Phim" ("hài", "phim hài", "hai").
const genreKey = (g) => stripVN(g).replace(/^\s*phim\s+/, '').replace(/[^a-z]/g, '');
const genresValidate = (gs) => (v) => { const got = String(v).split(','); return got.length === gs.length && got.every((x, i) => genreKey(x) === genreKey(gs[i])); };

// The book's corner cell split by a diagonal line ("Tuần / Loại bột"): the engine's
// { diag: [topRight, bottomLeft] } header cell.
const diag = (top, bottom) => ({ diag: [top, bottom] });

// Tally marks (Bài 73 Tiết 1 Q1): groups of four strokes crossed by a fifth.
function tally(n) {
  const groups = [];
  for (let left = n; left > 0; left -= 5) groups.push(Math.min(5, left));
  let x = 4;
  const parts = [];
  groups.forEach(g => {
    const strokes = Math.min(4, g);
    for (let i = 0; i < strokes; i++) parts.push(`<line x1="${x + i * 9}" y1="4" x2="${x + i * 9 - 1}" y2="28" />`);
    if (g === 5) parts.push(`<line x1="${x - 7}" y1="18" x2="${x + 34}" y2="14" />`);
    x += strokes * 9 + 22;
  });
  const w = x - 10;
  return `<svg width="${w}" height="32" viewBox="0 0 ${w} 32" style="vertical-align:middle" aria-label="${n} gạch" stroke="#231F20" stroke-width="2.6" stroke-linecap="round">${parts.join('')}</svg>`;
}

// Bài 73 Tiết 3 Q1: the survey list, a plain given table printed above part a).
const SURVEY = [
  ['An: 3 cuốn', 'Bình: 2 cuốn', 'Cường: 4 cuốn', 'Dung: 3 cuốn'],
  ['Giang: 3 cuốn', 'Hoa: 3 cuốn', 'Khánh: 4 cuốn', 'Nam: 5 cuốn'],
  ['Ngọc: 4 cuốn', 'Phượng: 3 cuốn', 'Việt: 3 cuốn', 'Mai: 3 cuốn'],
];
const surveyTable = `<div class="gw-table-wrap"><table class="gw-table"><tbody>${SURVEY.map(r => `<tr>${r.map(c => `<td class="gw-table-given" style="text-align:left;font-weight:500">${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

export const BAI_72_75 = [
  // ── BÀI 72 (trang 96–98) ──────────────────────────────────────────────────
  {
    id: 'bai-72', number: 72, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính nhẩm.',
        blanks: [
          N('a) 3 000 × 3 × 6 = ...', 54000),
          N('45 000 : 5 : 3 = ...', 3000),
          N('28 000 : 7 × 8 = ...', 32000),
          N('b) 21 000 × (18 : 6) = ...', 63000),
          N('72 000 : (3 × 3) = ...', 8000),
          N('56 000 : (32 : 4) = ...', 7000),
        ],
        hints: ['Nhẩm theo nghìn: 3 nghìn × 3 = 9 nghìn, 9 nghìn × 6 = 54 nghìn.', 'Có dấu ngoặc thì tính trong ngoặc trước: 18 : 6 = 3.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB72Calcs,
        q: '2. Đ, S?\nQuan sát các phép tính trong hình rồi cho biết mỗi phép tính đúng hay sai (viết Đ hoặc S).',
        blanks: [
          { label: 'a) 15 107 × 6 = 90 602', answer: 'S', validate: dsValidate(false), tiles: ['Đ', 'S'], tileOne: true },
          { label: 'b) 24 203 × 4 = 96 812', answer: 'Đ', validate: dsValidate(true), tiles: ['Đ', 'S'], tileOne: true },
          { label: 'c) 51 836 : 7 = 745 (dư 1)', answer: 'S', validate: dsValidate(false), tiles: ['Đ', 'S'], tileOne: true },
        ],
        hints: [
          'a) 7 × 6 = 42, viết 2 nhớ 4; 0 × 6 = 0, thêm 4 bằng 4. Hàng chục phải là 4.',
          'c) Hạ 3 xuống: 3 : 7 = 0, phải viết 0 vào thương rồi mới hạ tiếp 6.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Đặt tính rồi tính.',
        blanks: [
          N('8 607 × 7 = ...', 60249),
          N('31 524 × 3 = ...', 94572),
          N('40 848 : 8 = ...', 5106),
          N('72 684 : 9 = ...', 8076),
        ],
        hints: ['Phép nhân: nhân từ phải sang trái. Phép chia: chia từ trái sang phải, lượt nào bé hơn số chia thì viết 0 vào thương.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '4. Mai có 3 tờ tiền loại 20 000 đồng, số tiền đó vừa đủ để mua 4 hộp bút. Hỏi mỗi hộp bút giá bao nhiêu tiền?',
        blanks: [{ label: 'Giá tiền mỗi hộp bút (đồng)', answer: '15000', validate: unitNum(15000, 'đồng') }],
        hints: ['Bước 1: Mai có 20 000 × 3 = 60 000 (đồng). Bước 2: chia đều số tiền đó cho 4 hộp bút.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '5. Tính giá trị của biểu thức.',
        blanks: [
          { label: 'a) 90 108 : 6 × 5 = ...', answer: '15018 × 5', validate: exprValidate('15018 × 5') },
          N('= ...', 75090),
          { label: 'b) 12 012 × 8 : 4 = ...', answer: '96096 : 4', validate: exprValidate('96096 : 4', '12012 × 2') },
          N('= ...', 24024),
        ],
        hints: ['Chỉ có phép nhân, chia thì tính lần lượt từ trái sang phải.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB72Map,
        q: '1. Để đến kho báu, Rô-bốt phải đi qua các đoạn đường ghi phép tính có kết quả lớn hơn 6 000. Em hãy tìm đường cho Rô-bốt đi đến kho báu rồi tô màu vào đường đi đó.',
        blanks: [
          { label: 'Đường đi của Rô-bốt: A → ... → ... → ... → G', answer: 'D,B,C', validate: (v) => String(v).toUpperCase().replace(/\s+/g, '') === 'D,B,C', tiles: ['B', 'C', 'D'] },
        ],
        hints: ['Tính kết quả phép tính trên từng đoạn đường. Chỉ đi trên đoạn có kết quả lớn hơn 6 000.', '24 000 : 4 = 6 000, không lớn hơn 6 000, nên không đi đoạn A đến B.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Đặt tính rồi tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [
          N('19 016 × 5 = ...', 95080),
          N('9 409 × 9 = ...', 84681),
          N('78 520 : 8 = ... (dư ...)', 9815, 0),
          N('61 527 : 7 = ... (dư ...)', 8789, 4),
        ],
        hints: ['Ở 61 527 : 7: 61 : 7 = 8 (dư 5), hạ 5 được 55; 55 : 7 = 7 (dư 6), hạ 2 được 62; 62 : 7 = 8 (dư 6), hạ 7 được 67; 67 : 7 = 9 (dư 4).'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Tính giá trị của biểu thức.',
        blanks: [
          { label: 'a) 8 375 + 4 905 × 6 = ...', answer: '8375 + 29430', validate: exprValidate('8375 + 29430') },
          N('= ...', 37805),
          { label: 'b) 8 241 × 4 × 2 = ...', answer: '32964 × 2', validate: exprValidate('32964 × 2', '8241 × 8') },
          N('= ...', 65928),
          { label: 'c) (95 589 − 82 557) : 9 = ...', answer: '13032 : 9', validate: exprValidate('13032 : 9') },
          N('= ...', 1448),
          { label: 'd) 54 263 + 4 470 + 5 230 = ...', answer: '58733 + 5230', validate: exprValidate('58733 + 5230', '54263 + 9700') },
          N('= ...', 63963),
        ],
        hints: ['a) Nhân trước, cộng sau. c) Tính trong ngoặc trước.', 'd) Chỉ có phép cộng thì tính từ trái sang phải (hoặc cộng 4 470 + 5 230 = 9 700 trước cho nhanh).'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '4. Trong 3 giờ đầu, mỗi giờ chú Hùng đi được 13 120 m. Trong 1 giờ tiếp theo, chú Hùng đi được 9 560 m. Hỏi chú Hùng đã đi quãng đường dài bao nhiêu mét?',
        blanks: [{ label: 'Quãng đường chú Hùng đã đi (m)', answer: '48920', validate: unitNum(48920, 'm', 'mét') }],
        hints: ['Bước 1: 3 giờ đầu đi được 13 120 × 3 = 39 360 (m). Bước 2: cộng thêm quãng đường của giờ tiếp theo.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB72Puzzles,
        q: '5. Viết chữ số thích hợp vào ô trống.',
        blanks: [
          { ...N('a) 10...2... × 3 = ...1275', 4, 5, 3), boxes: true },
          { ...N('b) 34560 : 6 = 5...6...', 7, 0), boxes: true },
          { ...N('Các số viết dưới số bị chia: ...5 và ...6', 4, 3), boxes: true },
        ],
        hints: [
          'a) Chữ số hàng đơn vị nhân 3 có tận cùng là 5: chỉ có 5 × 3 = 15.',
          'b) Làm phép chia 34 560 : 6: 34 : 6 = 5 (dư 4), hạ 5 được 45; 45 : 6 = 7 (dư 3), hạ 6 được 36.',
        ],
      },
    ],
  },

  // ── BÀI 73 (trang 99–102) ─────────────────────────────────────────────────
  {
    id: 'bai-73', number: 73, title: 'Thu thập, phân loại, ghi chép số liệu. Bảng số liệu',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Viết tiếp vào chỗ chấm cho thích hợp.\nMột nhóm gồm 4 bạn cùng tham gia một cuộc thi toán. Mỗi bạn đã đưa ra câu trả lời cho 20 câu hỏi và số câu trả lời đúng được ghi nhận như trong bảng dưới đây.',
        rows: [
          ['Mai', tally(14)],
          ['Việt', tally(15)],
          ['Rô-bốt', tally(11)],
          ['Nam', tally(12)],
        ],
        blanks: [
          N('Mỗi gạch là một câu trả lời đúng.<br>a) Mỗi bạn đã đưa ra được số câu trả lời đúng là:<br>Mai: ... câu; Việt: ... câu; Rô-bốt: ... câu; Nam: ... câu.', 14, 15, 11, 12),
          { label: 'b) Bạn ... trả lời đúng nhiều câu hỏi nhất.', answer: 'Việt', validate: phraseValidate('Việt'), tiles: ['Mai', 'Việt', 'Rô-bốt', 'Nam'], tileOne: true },
          N('c) Với mỗi câu trả lời đúng, người chơi nhận được 1 điểm. Vậy bạn có số điểm cao nhất nhận được nhiều hơn bạn có số điểm thấp nhất ... điểm.', 4),
        ],
        hints: ['Mỗi nhóm có 4 gạch dọc và 1 gạch ngang là 5 câu. Đếm theo từng nhóm 5.', 'c) Lấy số câu đúng nhiều nhất trừ số câu đúng ít nhất.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Mai đã ghi chép lại số quả trứng mà đàn gà đẻ được vào mỗi ngày trong tuần vừa qua vào bảng số liệu như sau:',
        headers: [`${EGG_STYLE}<span class="b73-eggs">Ngày</span>`, 'Thứ<br>Hai', 'Thứ<br>Ba', 'Thứ<br>Tư', 'Thứ<br>Năm', 'Thứ<br>Sáu', 'Thứ<br>Bảy', 'Chủ<br>nhật'],
        rows: [['Số<br>quả trứng', 6, 3, 8, 10, 2, 7, 4]],
        blanks: [
          { label: 'Xem bảng số liệu trên rồi viết tiếp vào chỗ chấm cho thích hợp.<br>a) Vào thứ ... thì gà đẻ ít trứng nhất.', answer: 'Sáu', validate: dayValidate('Sáu'), tiles: DAY_TILES, tileOne: true },
          { label: 'b) Vào thứ ... thì gà đẻ nhiều trứng nhất.', answer: 'Năm', validate: dayValidate('Năm'), tiles: DAY_TILES, tileOne: true },
          { label: 'c) Vào các thứ: ... đàn gà đẻ được ít hơn 7 quả trứng.', answer: 'Hai, Ba, Sáu, Chủ nhật', validate: daysValidate(['Hai', 'Ba', 'Sáu', 'Chủ nhật']), tiles: DAY_TILES },
          N('d) Trong tuần vừa qua, đàn gà đã đẻ được tất cả ... quả trứng.', 40),
          N('e) Trong hai ngày cuối tuần, Mai thu hoạch được ... quả trứng.', 11),
        ],
        hints: ['c) Tìm các ngày có số trứng bé hơn 7.', 'e) Hai ngày cuối tuần là thứ Bảy và Chủ nhật.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. Cho bảng số liệu về số túi bột mì bán được trong 4 tuần của tháng 2 ở một cửa hàng tạp hoá.',
        headers: [diag('Tuần', 'Loại bột'), '1', '2', '3', '4'],
        rows: [
          ['Bột mì đa dụng (túi)', 20, 25, 25, 30],
          ['Bột bánh mì (túi)', 30, 50, 10, 20],
        ],
        blanks: [
          N('Xem bảng số liệu trên rồi viết tiếp vào chỗ chấm cho thích hợp.<br>a) Trong tuần cuối cùng của tháng, cửa hàng đã bán được ... túi bột mì đa dụng và ... túi bột bánh mì.', 30, 20),
          N('b) Mỗi tuần, cửa hàng bán được số túi bột bánh mì là:<br>Tuần 1: ... túi; tuần 2: ... túi; tuần 3: ... túi; tuần 4: ... túi.', 30, 50, 10, 20),
          N('c) Trong tuần đầu tiên, cửa hàng bán được tất cả ... túi bột mì.', 50),
          {
            label: 'd) Trong tuần thứ ba, loại bột ... bán được nhiều túi hơn.', answer: 'bột mì đa dụng',
            validate: (v) => { const t = stripVN(v).replace(/[^a-z]/g, ''); return t.endsWith('dadung') && !t.includes('banh'); },
            tiles: ['bột mì đa dụng', 'bột bánh mì'], tileOne: true,
          },
        ],
        hints: ['Tuần cuối cùng của tháng là tuần 4. Tuần đầu tiên là tuần 1.', 'c) Cộng số túi của cả hai loại bột trong tuần 1.'],
      },
      {
        type: 'table', section: 'Tiết 3',
        q: `1. Rô-bốt làm một cuộc khảo sát xem trong tuần trước mỗi người bạn của mình đọc bao nhiêu cuốn sách và bảng dưới đây là kết quả của cuộc khảo sát đó.\n${surveyTable}`,
        tables: [{
          label: 'a) Rô-bốt đã tổng hợp kết quả của cuộc khảo sát đó thành bảng số liệu. Hãy giúp Rô-bốt hoàn thành bảng số liệu dưới đây.',
          headers: ['Số cuốn sách đã đọc<br>trong tuần (cuốn)', '2', '3', '4', '5'],
          rows: [['Số bạn (người)', 1, cellN(7), cellN(3), cellN(1)]],
        }],
        blanks: [
          N('b) Dựa vào bảng số liệu trên, viết vào chỗ chấm cho thích hợp.<br>Có ... bạn đọc 3 cuốn sách.', 7),
          N('Có ... bạn đọc 4 cuốn sách.', 3),
          N('Các bạn tham gia cuộc khảo sát đã đọc tất cả ... cuốn sách.', 40),
        ],
        hints: ['Đếm số bạn đọc 3 cuốn, 4 cuốn, 5 cuốn. Đánh dấu bạn đã đếm để không bỏ sót.', 'Tổng số sách: 1 bạn đọc 2 cuốn, 7 bạn đọc 3 cuốn (7 × 3), 3 bạn đọc 4 cuốn (3 × 4), 1 bạn đọc 5 cuốn.'],
      },
      {
        type: 'table', section: 'Tiết 3',
        q: '2. Cho bảng số liệu về số vật nuôi của 4 trang trại.',
        headers: [diag('Trang trại', 'Vật nuôi'), 'A', 'B', 'C', 'D'],
        rows: [
          ['Cừu (con)', 80, 200, 30, 75],
          ['Bò sữa (con)', 45, 50, 100, 90],
        ],
        blanks: [
          { label: 'Dựa vào bảng số liệu trên, viết vào chỗ chấm cho thích hợp.<br>a) Trang trại ... nuôi nhiều bò sữa nhất.', answer: 'C', validate: (v) => stripVN(v).replace(/trang|trai|\s/g, '') === 'c', tiles: ['A', 'B', 'C', 'D'], tileOne: true },
          { label: 'b) Trang trại ... nuôi nhiều cừu nhất.', answer: 'B', validate: (v) => stripVN(v).replace(/trang|trai|\s/g, '') === 'b', tiles: ['A', 'B', 'C', 'D'], tileOne: true },
          N('c) Trang trại D nuôi tất cả ... con cừu và bò sữa', 165),
          N('d) Bốn trang trại này có tất cả ... con cừu.', 385),
        ],
        hints: ['a) So sánh các số ở hàng "Bò sữa". b) So sánh các số ở hàng "Cừu".', 'd) Cộng cả bốn số ở hàng "Cừu".'],
      },
      {
        type: 'table', section: 'Tiết 3',
        q: '3. a) Hoàn thành bảng số liệu về số bạn yêu thích các thể loại phim của lớp 3A.',
        headers: [diag('Loại phim', 'Số học sinh'), 'Phim<br>giả tưởng', 'Phim hài', 'Phim<br>hành động'],
        rows: [
          ['Nữ', 7, 11, cellN(1)],
          ['Nam', 10, cellN(9), 15],
          ['Tổng', cellN(17), 20, 16],
        ],
        blanks: [
          {
            label: 'b) Dựa vào bảng số liệu trên, viết tiếp vào chỗ chấm cho thích hợp.<br>– Phim ... được các bạn nữ yêu thích nhất.<br>– Phim ... được các bạn nam yêu thích nhất.<br>– Phim ... được nhiều bạn yêu thích nhất.',
            answer: 'hài, hành động, hài', validate: genresValidate(['hài', 'hành động', 'hài']), tiles: ['giả tưởng', 'hài', 'hành động'],
          },
        ],
        hints: ['Tổng = số bạn nữ + số bạn nam. Số bạn nữ = Tổng − số bạn nam.', 'Điền đủ bảng rồi so sánh từng hàng: hàng "Nữ", hàng "Nam", hàng "Tổng".'],
      },
    ],
  },

  // ── BÀI 74 (trang 103–104) ────────────────────────────────────────────────
  {
    id: 'bai-74', number: 74, title: 'Khả năng xảy ra của một sự kiện',
    questions: [
      {
        type: 'choice', img: imgB74Wheel,
        q: '1. Khoanh vào chữ đặt trước câu trả lời đúng.\nTrong lớp của Mai có một chiếc nón kì diệu như hình vẽ dưới đây.\nMai quay chiếc nón đó một lần và quan sát màu sắc của miền mà mũi tên chỉ vào. Khẳng định nào sau đây là đúng?',
        options: [
          'Mũi tên chắc chắn chỉ vào miền màu xanh.',
          'Mũi tên không thể chỉ vào miền màu trắng.',
          'Mũi tên có thể chỉ vào miền màu xanh hoặc màu trắng.',
          'Mũi tên có thể chỉ vào miền màu đỏ.',
        ],
        answer: 2,
        hints: ['Chiếc nón có cả miền màu xanh và miền màu trắng, không có miền màu đỏ.'],
      },
      {
        type: 'choice', multi: true,
        q: '2. Viết tiếp vào chỗ chấm cho thích hợp.\nTrong hộp có 2 cái bút màu xanh và 1 cái bút màu đen. Việt nhắm mắt và lấy 2 cái bút ra khỏi hộp cùng lúc.\nCác khả năng có thể xảy ra khi Việt lấy bút ra khỏi hộp là:\n(Chọn tất cả các khả năng có thể xảy ra.)',
        options: [
          'Lấy được 2 cái bút màu xanh.',
          'Lấy được 1 cái bút màu xanh và 1 cái bút màu đen.',
          'Lấy được 2 cái bút màu đen.',
        ],
        answer: [0, 1],
        hints: ['Trong hộp chỉ có 1 cái bút màu đen.'],
      },
      {
        type: 'fill', img: imgB74Cookies,
        q: '3. Đ, S?\nNam đã nướng 4 chiếc bánh quy có bề ngoài giống hệt nhau, nhưng phần nhân khác nhau: 2 chiếc bánh mứt dâu, 1 chiếc bánh mứt cam và 1 chiếc bánh mứt nho. Nam đang chọn một chiếc bánh trong số bánh đó để ăn.',
        blanks: [
          { label: 'a) Chắc chắn Nam sẽ chọn được bánh mứt dâu.', answer: 'S', validate: dsValidate(false), tiles: ['Đ', 'S'], tileOne: true },
          { label: 'b) Có thể Nam sẽ chọn được bánh mứt nho.', answer: 'Đ', validate: dsValidate(true), tiles: ['Đ', 'S'], tileOne: true },
          { label: 'c) Nam không thể chọn được bánh mứt cam.', answer: 'S', validate: dsValidate(false), tiles: ['Đ', 'S'], tileOne: true },
          { label: 'd) Có thể Nam sẽ chọn được bánh mứt táo.', answer: 'S', validate: dsValidate(false), tiles: ['Đ', 'S'], tileOne: true },
        ],
        hints: ['Các bánh trông giống hệt nhau nên Nam có thể chọn phải bất kì chiếc nào.', 'Không có chiếc bánh mứt táo nào.'],
      },
      {
        type: 'choice', img: imgB74Dice,
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nRô-bốt có 2 xúc xắc gồm 6 mặt:\nBạn ấy đã gieo 2 xúc xắc đó, quan sát mặt trên và tính tổng số chấm nhận được. Hỏi trong số những sự kiện dưới đây, sự kiện nào không thể xảy ra?',
        options: [
          'Rô-bốt nhận được tổng bằng 12.',
          'Rô-bốt nhận được tổng bằng 5.',
          'Rô-bốt nhận được tổng bằng 8.',
          'Rô-bốt nhận được tổng bằng 1.',
        ],
        answer: 3,
        hints: ['Mỗi xúc xắc có ít nhất 1 chấm, nên tổng của 2 xúc xắc ít nhất là 1 + 1 = 2.'],
      },
    ],
  },
];
