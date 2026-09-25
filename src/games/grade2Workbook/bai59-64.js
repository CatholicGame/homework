/**
 * Vở bài tập Toán 2 — Tập hai: Bài 59–64 (sách trang 70–92).
 */
import {
  blank, dsValidate, letterValidate, listValidate, phraseValidate, sampleCell, setValidate,
} from '../grade3Workbook.js';
import imgB59Ships from '../../assets/grade2-workbook/bai59_t1_q3_ships.png';
import imgB59Goose from '../../assets/grade2-workbook/bai59_t2_q4_goose.png';
import imgB59Heli from '../../assets/grade2-workbook/bai59_t2_q5_heli.svg';
import imgB60Maze from '../../assets/grade2-workbook/bai60_t2_q4_maze.png';
import imgB60Robot from '../../assets/grade2-workbook/bai60_t3_q5_robot.svg';
import imgB61Flowers from '../../assets/grade2-workbook/bai61_t2_q2_flowers.png';
import imgB61Venn from '../../assets/grade2-workbook/bai61_t3_q3_venn.svg';
import imgB61Sticks from '../../assets/grade2-workbook/bai61_t3_q5_sticks.svg';
import imgB62Robot from '../../assets/grade2-workbook/bai62_t1_q4_robot.png';
import imgB62Snail from '../../assets/grade2-workbook/bai62_t2_q5_snail.png';
import imgB62Flow from '../../assets/grade2-workbook/bai62_t3_q2_flow.svg';
import imgB62Giraffe from '../../assets/grade2-workbook/bai62_t3_q4_giraffe.png';
import imgB62Buffalo from '../../assets/grade2-workbook/bai62_t3_q4_buffalo.png';
import imgB62Tiger from '../../assets/grade2-workbook/bai62_t3_q4_tiger.png';
import imgB63Solids from '../../assets/grade2-workbook/bai63_t1_q2_solids.png';
import imgB63Grid from '../../assets/grade2-workbook/bai63_t1_q4_grid.svg';
import imgB64Books from '../../assets/grade2-workbook/bai64_q1_books.png';
import imgB64Lanterns from '../../assets/grade2-workbook/bai64_q3_lanterns.png';

// Numbers print like the book: "1 000".
const fmt = (n) => (n >= 1000 ? String(n).replace(/(\d)(?=(\d{3})+$)/g, '$1 ') : String(n));
const res = (a, op, b) => (op === '+' ? a + b : a - b);
// "Tính." / "Tính nhẩm." — "364 + 215 = ...", result computed here so the key can't have a typo.
const calcEq = (a, op, b) => ({ label: `${fmt(a)} ${op} ${fmt(b)} = ...`, answer: String(res(a, op, b)) });
// "Đặt tính rồi tính." — one answer line per phép tính.
const calc = (a, op, b) => ({ label: `${fmt(a)} ${op} ${fmt(b)}`, answer: String(res(a, op, b)) });
const eq = (label, answer) => ({ label, answer: String(answer) });
// "Đ, S ?" row.
const ds = (label, isTrue) => ({ label, answer: isTrue ? 'Đ' : 'S', validate: dsValidate(isTrue) });
// "Viết chữ số thích hợp vào ô trống": one small box per digit, in reading order.
const digits = (label, list) => ({ label, answer: list.join(','), boxes: true, validate: listValidate(list.map(String)) });
// Several numbers in one row, in the book's order.
const nums = (label, list) => ({ label, answer: list.join(','), validate: listValidate(list.map(String)) });
const letterCell = (ch) => blank(ch, { validate: letterValidate(ch) });
const L = '<i>l</i>';

// Rô-bốt's chore timetable printed inside the question text (the engine's own table
// type has no merged cells, and this table is only information to read).
const TB = 'border-collapse:collapse;margin:6px 0;font-size:0.8em;line-height:1.25';
const TD = 'border:1.5px solid #00AEEF;padding:3px 4px;text-align:center';
const TH = `${TD};background:#B8E5FC;font-weight:600`;
const CHORES = `<div style="overflow-x:auto"><table style="${TB};min-width:100%"><tr>${['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ nhật'].map(d => `<th style="${TH}">${d}</th>`).join('')}</tr>`
  + `<tr><td style="${TD}">Nấu cơm</td><td style="${TD}" rowspan="2">Rửa bát</td><td style="${TD}">Nấu cơm</td><td style="${TD}">Rửa bát</td><td style="${TD}" rowspan="2">Nấu cơm</td><td style="${TD}">Rửa bát</td><td style="${TD}">Nấu cơm</td></tr>`
  + `<tr><td style="${TD}">Giặt quần áo</td><td style="${TD}">Lau nhà</td><td style="${TD}">Giặt quần áo</td><td style="${TD}">Giặt quần áo</td><td style="${TD}">Lau nhà</td></tr></table></div>`;
const COLOR_OPTS = ['Tím', 'Vàng', 'Da cam'];
const GOOSE_OPS = ['A. 123 + 510', 'B. 350 + 249', 'C. 300 + 415'];
const CHORE_OPTS = ['A. Nấu cơm', 'B. Giặt quần áo', 'C. Rửa bát', 'D. Lau nhà'];

export const BAI_59_64 = [
  // ── BÀI 59 (trang 70–73) ─────────────────────────────────────────────────
  {
    id: 'bai-59', number: 59, title: 'Phép cộng (không nhớ) trong phạm vi 1 000',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [calcEq(364, '+', 215), calcEq(643, '+', 106), calcEq(102, '+', 95), calcEq(923, '+', 50)],
        hints: ['Cộng lần lượt từ phải sang trái: đơn vị cộng đơn vị, chục cộng chục, trăm cộng trăm.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [calc(550, '+', 145), calc(287, '+', 102), calc(804, '+', 73), calc(418, '+', 80)],
        hints: ['Viết các chữ số cùng hàng thẳng cột với nhau rồi cộng từ phải sang trái.'],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB59Ships,
        q: '3. Khoanh vào chữ đặt dưới câu trả lời đúng.\nCon tàu nào chở nặng hơn?',
        options: ['Con tàu A', 'Con tàu B'],
        answer: 1,
        hints: ['Tính số ki-lô-gam mỗi tàu chở: 230 + 450 và 140 + 543.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '4. Nối mỗi phép tính với kết quả của phép tính đó.',
        left: [{ id: 'a', text: '615 + 104' }, { id: 'b', text: '378 + 20' }, { id: 'c', text: '440 + 329' }],
        right: [{ id: 'r769', text: '769' }, { id: 'r719', text: '719' }, { id: 'r398', text: '398' }],
        pairs: [['a', 'r719'], ['b', 'r398'], ['c', 'r769']],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đặt tính rồi tính.',
        blanks: [
          calc(156, '+', 240), calc(803, '+', 170), calc(545, '+', 212),
          calc(900, '+', 78), calc(623, '+', 44), calc(312, '+', 80),
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: `2. Buổi sáng voi em uống 105 ${L} nước, voi anh uống nhiều hơn voi em 20 ${L} nước. Hỏi voi anh uống bao nhiêu lít nước vào buổi sáng?`,
        blanks: [{ label: 'Số lít nước voi anh uống', answer: '125' }],
        hints: ['"Nhiều hơn" thì làm phép cộng: 105 + 20.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '3. Vườn thuốc của ông nội bạn Nam trồng 131 cây thuốc. Vườn bên cạnh của bác sĩ Hùng trồng 142 cây thuốc. Hỏi cả hai vườn trồng tất cả bao nhiêu cây thuốc?',
        blanks: [{ label: 'Số cây thuốc cả hai vườn', answer: '273' }],
        hints: ['Tìm tất cả thì làm phép cộng: 131 + 142.'],
      },
      {
        type: 'compare', section: 'Tiết 2', img: imgB59Goose,
        q: '4. Em hãy tô màu giúp bé Mi theo các yêu cầu sau:\n– Với các số bé hơn 100: Tô màu tím vào nơi chứa số bé nhất, màu vàng vào nơi chứa số lớn nhất và màu da cam vào nơi chứa hai số còn lại.\n– Với các phép tính: Tô màu đen vào nơi chứa phép tính có kết quả bé nhất, tô màu xanh vào nơi chứa phép tính có kết quả lớn nhất.',
        rows: [
          { left: 'Nơi chứa số 99 tô màu:', options: COLOR_OPTS, answer: 'Vàng' },
          { left: 'Nơi chứa số 10 tô màu:', options: COLOR_OPTS, answer: 'Tím' },
          { left: 'Nơi chứa số 51 tô màu:', options: COLOR_OPTS, answer: 'Da cam' },
          { left: 'Nơi chứa số 49 tô màu:', options: COLOR_OPTS, answer: 'Da cam' },
          { left: 'Phép tính tô màu đen:', options: GOOSE_OPS, answer: 'B' },
          { left: 'Phép tính tô màu xanh:', options: GOOSE_OPS, answer: 'C' },
        ],
        hints: ['Tính kết quả: 123 + 510 = 633, 350 + 249 = 599, 300 + 415 = 715.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB59Heli,
        q: '5. Trực thăng cần bay từ A đến B qua tất cả các điểm màu trắng, theo những đường nối, nhưng không điểm nào được đi qua quá một lần.\nb) Viết số thích hợp vào chỗ chấm.\nTrên đường kẻ ghi số là số đo chiều dài các đoạn đường theo ki-lô-mét.',
        blanks: [eq('Trực thăng bay từ A đến trạm tiếp nhiên liệu hết tất cả ... km.', 80)],
        hints: [
          'Hai điểm trắng bên trái chỉ đi qua được nếu trực thăng bay vòng hết hình thoi trước.',
          'Đường đi: A → trái → dưới → phải → trạm, mỗi đoạn 20 km.',
        ],
      },
    ],
  },

  // ── BÀI 60 (trang 74–77) ─────────────────────────────────────────────────
  {
    id: 'bai-60', number: 60, title: 'Phép cộng (có nhớ) trong phạm vi 1 000',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [calcEq(367, '+', 125), calcEq(247, '+', 136), calcEq(802, '+', 59), calcEq(183, '+', 9)],
        hints: ['Hàng nào cộng được 10 trở lên thì viết chữ số hàng đơn vị và nhớ 1 sang hàng bên trái.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [calc(537, '+', 145), calc(258, '+', 132), calc(908, '+', 37), calc(428, '+', 8)],
        hints: ['Viết các chữ số cùng hàng thẳng cột, cộng từ phải sang trái, nhớ lưu ý phần nhớ.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '3. Một nhà máy sáng nay sản xuất được 169 chiếc bánh mì tròn và 803 chiếc bánh mì dẹt. Hỏi sáng nay nhà máy sản xuất được tất cả bao nhiêu chiếc bánh mì?',
        blanks: [{ label: 'Số chiếc bánh mì', answer: '972' }],
        hints: ['Tìm tất cả thì làm phép cộng: 169 + 803.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '4. Nối mỗi phép tính với kết quả của phép tính đó.',
        left: [{ id: 'a', text: '615 + 109' }, { id: 'b', text: '367 + 27' }, { id: 'c', text: '436 + 358' }],
        right: [{ id: 'r394', text: '394' }, { id: 'r724', text: '724' }, { id: 'r794', text: '794' }],
        pairs: [['a', 'r724'], ['b', 'r394'], ['c', 'r794']],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đặt tính rồi tính.',
        blanks: [calc(374, '+', 534), calc(619, '+', 4), calc(570, '+', 150), calc(23, '+', 286)],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Tính nhẩm.',
        blanks: [calcEq(100, '+', 900), calcEq(700, '+', 300), calcEq(600, '+', 400)],
        hints: ['1 trăm + 9 trăm = 10 trăm, 10 trăm = 1 000.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '3. Để ngăn quân giặc, nhà vua cho đóng những bãi cọc gỗ ở đáy sông. Một bãi cọc có 225 chiếc cọc. Bãi cọc bên cạnh có 256 chiếc cọc. Hỏi cả hai bãi cọc có bao nhiêu chiếc cọc?',
        blanks: [{ label: 'Số chiếc cọc cả hai bãi', answer: '481' }],
        hints: ['Làm phép cộng: 225 + 256.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB60Maze,
        q: '4. Em hãy tô màu đường đi của bạn Dũng từ vị trí đang đứng đến chỗ phi thuyền. Biết từ mỗi ô, bạn Dũng đi theo con đường ghi kết quả của phép tính trên ô đó.\nChọn đường đi đúng của bạn Dũng.',
        options: [
          '7 × 5 → 12 + 40 → 85 + 60 → 145 + 260 → phi thuyền',
          '7 × 5 → 35 + 50 → 85 + 60 → 145 + 260 → 400 + 600 → phi thuyền',
          '7 × 5 → 35 + 50 → 85 + 105 → 145 + 260 → phi thuyền',
        ],
        answer: 1,
        hints: ['7 × 5 = 35, nên từ ô đầu tiên bạn Dũng đi theo con đường ghi số 35.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Đặt tính rồi tính.',
        blanks: [calc(635, '+', 245), calc(482, '+', 391), calc(720, '+', 97), calc(518, '+', 159)],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [eq('a) 9 × 5 + 235 = ...', 280), eq('b) 97 − 27 + 630 = ...', 700), eq('c) 30 + 70 + 831 = ...', 931)],
        hints: ['Tính lần lượt từ trái sang phải; phép nhân làm trước: 9 × 5 = 45.'],
      },
      {
        type: 'choice', section: 'Tiết 3',
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.\nHai máy bay V và N cùng bay đến một sân bay. Máy bay V đã bay 326 km. Máy bay N đã bay quãng đường nhiều hơn máy bay V là 124 km. Hỏi máy bay N đã bay bao nhiêu ki-lô-mét?',
        options: ['202 km', '430 km', '450 km'],
        answer: 2,
        hints: ['"Nhiều hơn" thì làm phép cộng: 326 + 124.'],
      },
      {
        type: 'fill', section: 'Tiết 3', wordProblem: true,
        q: `4. Bể A chứa 90 ${L} nước, bể B chứa 165 ${L} nước. Hỏi cả hai bể chứa bao nhiêu lít nước?`,
        blanks: [{ label: 'Số lít nước cả hai bể', answer: '255' }],
        hints: ['Làm phép cộng: 90 + 165.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB60Robot,
        q: `5. Số?\nMột rô-bốt di chuyển theo các lệnh đã được lập trình như sau (xem bảng lệnh trong hình).\nVí dụ: Ban đầu, rô-bốt đứng ở ô 90. Đi theo lệnh “← ↑ → ↓”, rô-bốt quay về chính ô 90 (như hình vẽ).`,
        blanks: [
          eq('a) Từ ô ghi số 130, rô-bốt đi theo lệnh “↓ → ↑” thì sẽ đi đến ô ghi số ...', 90),
          // Tính cả ô xuất phát 130 → 60 + 130 = 190; không tính ô xuất phát → 60 + 110 = 170. Chấp nhận cả hai.
          { ...eq('b) Tổng của số bé nhất và số lớn nhất trong các số mà rô-bốt gặp ở câu a bằng ...', 190), validate: (v) => ['190', '170'].includes(String(v).trim()) },
        ],
        hints: ['Từ 130 đi xuống gặp 60, sang phải gặp 110, đi lên gặp 90.', 'Các số rô-bốt gặp: 130, 60, 110, 90.'],
      },
    ],
  },

  // ── BÀI 61 (trang 78–81) ─────────────────────────────────────────────────
  {
    id: 'bai-61', number: 61, title: 'Phép trừ (không nhớ) trong phạm vi 1 000',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [calcEq(468, '−', 247), calcEq(729, '−', 607), calcEq(283, '−', 270), calcEq(926, '−', 525)],
        hints: ['Trừ lần lượt từ phải sang trái: đơn vị trừ đơn vị, chục trừ chục, trăm trừ trăm.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [calc(683, '−', 473), calc(628, '−', 517), calc(785, '−', 772), calc(349, '−', 135)],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Tính nhẩm.',
        blanks: [calcEq(700, '−', 500), calcEq(900, '−', 600), calcEq(800, '−', 200), calcEq(500, '−', 400)],
        hints: ['7 trăm − 5 trăm = 2 trăm.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '4. Con trâu rừng cân nặng 480 kg. Con sư tử nhẹ hơn con trâu rừng 250 kg. Hỏi con sư tử cân nặng bao nhiêu ki-lô-gam?',
        blanks: [{ label: 'Số ki-lô-gam con sư tử cân nặng', answer: '230' }],
        hints: ['"Nhẹ hơn" thì làm phép trừ: 480 − 250.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Viết chữ số thích hợp vào ô trống.',
        blanks: [
          digits('a) ...68 − 24... = 5...5', [7, 3, 2]),
          digits('b) 8...9 − ...45 = 75...', [9, 1, 4]),
          digits('c) 97... − 3...2 = ...16', [8, 6, 6]),
        ],
        hints: ['Làm từ hàng đơn vị: a) 8 trừ mấy bằng 5?'],
      },
      {
        type: 'table', section: 'Tiết 2', img: imgB61Flowers,
        q: '2. Số?\na)',
        headers: ['Bông hoa', '4 cánh', '5 cánh', '6 cánh'],
        rows: [['Kết quả của phép tính', blank('11'), blank('444'), blank('302')]],
        blanks: [
          eq('b) Phép tính có kết quả lớn nhất ghi ở bông hoa có ... cánh.', 5),
          eq('c) Phép tính có kết quả bé nhất ghi ở bông hoa có ... cánh.', 4),
        ],
        hints: ['Đếm số cánh của mỗi bông hoa, tính phép tính trên bông hoa đó rồi ghi vào cột đúng số cánh.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '3. Mỗi con ếch sẽ nhảy lên lá sen ghi phép tính có kết quả là số trên con ếch đó. Em hãy nối để tìm lá sen cho mỗi con ếch nhảy lên.',
        left: [{ id: 'f111', text: '111' }, { id: 'f802', text: '802' }, { id: 'f100', text: '100' }],
        right: [{ id: 'a', text: '423 − 323' }, { id: 'b', text: '538 − 427' }, { id: 'c', text: '839 − 37' }],
        pairs: [['f111', 'b'], ['f802', 'c'], ['f100', 'a']],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết chữ số thích hợp vào ô trống.',
        blanks: [
          digits('a) 324 − 223 = 10...', [1]),
          digits('b) 992 − 170 < ...18', [9]),
          digits('c) 758 − 446 > 3...2', [0]),
        ],
        hints: ['Tính kết quả phép trừ trước: 992 − 170 = 822, 758 − 446 = 312.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '5. Một công ty có 325 công nhân, trong đó có 225 công nhân nữ. Hỏi công ty có bao nhiêu công nhân nam?',
        blanks: [{ label: 'Số công nhân nam', answer: '100' }],
        hints: ['Lấy tổng số công nhân trừ số công nhân nữ: 325 − 225.'],
      },
      {
        type: 'choice', section: 'Tiết 3',
        q: '1. Bạn chó sẽ tìm đến khúc xương ghi phép tính có kết quả lớn nhất. Khoanh vào khúc xương mà bạn chó sẽ tìm đến.',
        options: ['430 − 310', '892 − 780', '564 − 550'],
        answer: 0,
        hints: ['Tính kết quả từng phép tính rồi so sánh.'],
      },
      {
        type: 'compare', section: 'Tiết 3',
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Kết quả tính 321 − 220 + 437 bằng:', options: ['A. 438', 'B. 538', 'C. 638'], answer: 'B' },
          { left: 'b) Kết quả tính 362 − 320 + 526 bằng:', options: ['A. 568', 'B. 668', 'C. 536'], answer: 'A' },
        ],
        hints: ['Tính lần lượt từ trái sang phải: 321 − 220 = 101.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB61Venn,
        q: '3. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          eq('a) Số lớn nhất nằm ngoài hình tròn là ...', 589),
          eq('b) Số bé nhất nằm trong hình chữ nhật là ...', 536),
          nums('c) Hiệu của số lớn nhất nằm ngoài hình tròn và số bé nhất nằm trong hình chữ nhật là: ... − ... = ...', [589, 536, 53]),
        ],
        hints: ['Các số nằm ngoài hình tròn: 563, 536, 589.'],
      },
      {
        type: 'table', section: 'Tiết 3',
        q: '4. Đ, S?\nBiết chiều dài một số quốc lộ như sau:',
        headers: ['Quốc lộ', '2A', '3A', '4A', '5A'],
        rows: [['Chiều dài', '300 km', '330 km', '128 km', '116 km']],
        blanks: [
          ds('Trong các quốc lộ trên:<br>a) Quốc lộ dài nhất có chiều dài lớn hơn 300 km.', true),
          ds('b) Quốc lộ 3A dài hơn quốc lộ 2A là 130 km.', false),
          ds('c) Tên các quốc lộ viết theo thứ tự từ dài nhất đến ngắn nhất là: 3A, 2A, 5A, 4A.', false),
        ],
        hints: ['330 km − 300 km = 30 km. Quốc lộ 4A (128 km) dài hơn quốc lộ 5A (116 km).'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB61Sticks,
        q: '5. Cho số 708 được xếp bởi các que tính như sau:\nViết số thích hợp vào chỗ chấm.',
        blanks: [
          eq('a) Số lớn nhất có thể tạo thành khi chuyển chỗ 1 que tính là số ...', 798),
          eq('b) Số bé nhất có thể tạo thành khi chuyển chỗ 1 que tính là số ...', 188),
          eq('c) Hiệu của hai số thu được ở câu a và câu b bằng ...', 610),
        ],
        hints: [
          'a) Chuyển que tính ở góc dưới bên trái số 0 lên giữa, số 0 thành số 9.',
          'b) Lấy que tính nằm ngang của số 7 (còn lại số 1) đặt vào giữa số 0 (thành số 8).',
        ],
      },
    ],
  },

  // ── BÀI 62 (trang 82–87) ─────────────────────────────────────────────────
  {
    id: 'bai-62', number: 62, title: 'Phép trừ (có nhớ) trong phạm vi 1 000',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [calcEq(533, '−', 204), calcEq(672, '−', 637), calcEq(488, '−', 209), calcEq(930, '−', 225)],
        hints: ['Hàng nào không trừ được thì mượn 1 ở hàng bên trái (lấy thêm 10), rồi nhớ trả lại.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [calc(622, '−', 13), calc(381, '−', 128), calc(792, '−', 56), calc(830, '−', 812)],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '3. Một hội trường có 450 ghế ngồi. Trong hội trường đã có 235 người, mỗi người ngồi một ghế. Hỏi trong hội trường còn lại bao nhiêu ghế trống?',
        blanks: [{ label: 'Số ghế trống', answer: '215' }],
        hints: ['Làm phép trừ: 450 − 235.'],
      },
      {
        type: 'compare', section: 'Tiết 1', img: imgB62Robot,
        q: '4. Trong hình sau đây, Rô-bốt sẽ đi theo đường qua các phép tính đúng. Hãy tô màu vào các phép tính đúng và khoanh vào địa điểm mà Rô-bốt sẽ đến.',
        rows: [
          { left: 'Hàng trên: 372 − 124 = 158 (ô thứ nhất)', options: ['Đúng', 'Sai'], answer: 'Sai' },
          { left: 'Hàng trên: 420 − 207 = 213', options: ['Đúng', 'Sai'], answer: 'Đúng' },
          { left: 'Hàng trên: 372 − 124 = 158 (ô thứ ba)', options: ['Đúng', 'Sai'], answer: 'Sai' },
          { left: 'Hàng giữa: 783 − 282 = 501', options: ['Đúng', 'Sai'], answer: 'Đúng' },
          { left: 'Hàng giữa: 983 − 309 = 674', options: ['Đúng', 'Sai'], answer: 'Đúng' },
          { left: 'Hàng giữa: 628 − 470 = 258', options: ['Đúng', 'Sai'], answer: 'Sai' },
          { left: 'Hàng dưới: 420 − 216 = 214', options: ['Đúng', 'Sai'], answer: 'Sai' },
          { left: 'Hàng dưới: 627 − 326 = 301', options: ['Đúng', 'Sai'], answer: 'Đúng' },
          { left: 'Hàng dưới: 491 − 380 = 111', options: ['Đúng', 'Sai'], answer: 'Đúng' },
          { left: 'Địa điểm Rô-bốt sẽ đến:', options: ['A. Sân vận động', 'B. Rạp chiếu phim', 'C. Công viên nước'], answer: 'C' },
        ],
        hints: ['Tự tính lại từng phép trừ: 372 − 124 = 248.', 'Ở cột cuối chỉ có một phép tính đúng.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính.',
        blanks: [calcEq(235, '−', 160), calcEq(617, '−', 525)].map((b, i) => ({ ...b, label: `${'ab'[i]}) ${b.label}` })),
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. Số?',
        rows: [
          ['Số bị trừ', 642, 250, 248, 439, 700],
          ['Số trừ', 261, 160, 50, 258, 200],
          ['Hiệu', blank('381'), blank('90'), blank('198'), blank('181'), blank('500')],
        ],
        hints: ['Hiệu = Số bị trừ − Số trừ.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '3. Nối mỗi phép tính với kết quả của phép tính đó.',
        left: [{ id: 'a', text: '321 − 205' }, { id: 'b', text: '468 − 396' }, { id: 'c', text: '563 − 328' }, { id: 'd', text: '640 − 460' }],
        right: [{ id: 'r72', text: '72' }, { id: 'r180', text: '180' }, { id: 'r235', text: '235' }, { id: 'r116', text: '116' }],
        pairs: [['a', 'r116'], ['b', 'r72'], ['c', 'r235'], ['d', 'r180']],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '4. Hiện nay, một chiếc máy bay của một hãng có thể chở được 890 hành khách. Trước kia, chiếc máy bay đầu tiên của hãng đó chỉ có thể chở được 285 hành khách. Hỏi so với chiếc máy bay đầu tiên, chiếc máy bay hiện nay của hãng có thể chở được nhiều hơn bao nhiêu hành khách?',
        blanks: [{ label: 'Số hành khách chở được nhiều hơn', answer: '605' }],
        hints: ['Tìm "nhiều hơn bao nhiêu" thì lấy số lớn trừ số bé: 890 − 285.'],
      },
      {
        type: 'match', section: 'Tiết 2', img: imgB62Snail,
        q: '5. Ốc sên bò qua các phép tính có kết quả theo thứ tự như sau:\n427 → 344 → 371 → 231 → 1 000\nEm hãy tô màu các con đường mà bạn ốc sên đã đi qua để tìm đường về nhà cho bạn ốc sên.\nNối mỗi kết quả với phép tính ốc sên đã bò qua.',
        left: [
          { id: 'k427', text: '427' }, { id: 'k344', text: '344' }, { id: 'k371', text: '371' },
          { id: 'k231', text: '231' }, { id: 'k1000', text: '1 000' },
        ],
        right: [
          { id: 'o1', text: '315 − 251' }, { id: 'o2', text: '627 − 200' }, { id: 'o3', text: '516 − 207' },
          { id: 'o4', text: '827 − 483' }, { id: 'o5', text: '872 − 254' }, { id: 'o6', text: '803 − 432' },
          { id: 'o7', text: '825 − 642' }, { id: 'o8', text: '560 − 329' }, { id: 'o9', text: '500 + 500' },
        ],
        pairs: [['k427', 'o2'], ['k344', 'o4'], ['k371', 'o6'], ['k231', 'o8'], ['k1000', 'o9']],
        hints: ['Tính kết quả từng phép tính trên đường rồi tìm số đúng thứ tự.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Tính nhẩm.',
        blanks: [
          { ...calcEq(100, '+', 900), label: 'a) 100 + 900 = ...' }, calcEq(1000, '−', 100), calcEq(1000, '−', 900),
          { ...calcEq(400, '+', 600), label: 'b) 400 + 600 = ...' }, calcEq(1000, '−', 400), calcEq(1000, '−', 600),
        ],
        hints: ['1 000 là 10 trăm: 10 trăm − 1 trăm = 9 trăm.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB62Flow,
        q: '2. Số?',
        blanks: [
          eq('a) Số trong hình tam giác: ...', 579),
          eq('Số trong hình vuông: ...', 197),
          eq('b) Số trong hình thoi: ...', 282),
          eq('Số trong hình tròn: ...', 352),
        ],
        hints: ['Làm lần lượt theo mũi tên: 351 + 228, rồi lấy kết quả trừ 382.'],
      },
      {
        type: 'fill', section: 'Tiết 3', wordProblem: true,
        q: '3. Tính đến năm 2020, trên thế giới có 204 quốc gia và vùng lãnh thổ, trong đó có 193 quốc gia được công nhận là thành viên chính thức của Liên Hợp Quốc. Hỏi tính đến năm 2020 có bao nhiêu quốc gia chưa được công nhận là thành viên của Liên Hợp Quốc?',
        blanks: [{ label: 'Số quốc gia chưa được công nhận', answer: '11' }],
        hints: ['Làm phép trừ: 204 − 193.'],
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '4. Kết quả của mỗi phép tính dưới đây là cân nặng của một con vật có trong hình. Biết hươu cao cổ nặng nhất, hổ nhẹ nhất. Em hãy nối mỗi con vật với cân nặng của con vật đó.',
        left: [
          { id: 'giraffe', img: imgB62Giraffe }, { id: 'buffalo', img: imgB62Buffalo }, { id: 'tiger', img: imgB62Tiger },
        ],
        right: [{ id: 'a', text: '900 kg − 110 kg' }, { id: 'b', text: '525 kg − 235 kg' }, { id: 'c', text: '671 kg − 126 kg' }],
        pairs: [['giraffe', 'a'], ['buffalo', 'c'], ['tiger', 'b']],
        hints: ['Tính: 900 − 110 = 790, 525 − 235 = 290, 671 − 126 = 545.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '5. Đ, S?',
        blanks: [
          ds('a) 368 − 270 = 198', false), ds('b) 825 − 207 = 618', true),
          ds('c) 415 − 90 = 325', true), ds('d) 567 − 428 = 149', false),
        ],
        hints: ['Tự tính lại từng phép trừ: 368 − 270 = 98.'],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: '1. Đặt tính rồi tính.',
        blanks: [calc(365, '−', 128), calc(642, '−', 290), calc(520, '−', 90), calc(175, '−', 68)],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: '2. Viết chữ số thích hợp vào ô trống.',
        blanks: [
          digits('a) 564 − ...07 = 25...', [3, 7]),
          digits('b) 728 − ...97 = 23...', [4, 1]),
          digits('c) 980 − ...19 = 1...1', [8, 6]),
          digits('d) 821 − ...03 = 5...8', [3, 1]),
        ],
        hints: ['Làm từ hàng đơn vị, nhớ phần mượn: a) 14 − 7 = 7.'],
      },
      {
        type: 'table', section: 'Tiết 4',
        q: '3. Giải ô chữ.\nKết quả của mỗi phép tính tương ứng với một chữ cái như bảng bên:',
        tables: [
          { rows: [['A', '534 − 250'], ['E', '321 + 70'], ['H', '1 000 − 400']] },
          { rows: [['O', '352 + 215'], ['N', '600 − 300'], ['S', '372 − 213']] },
          {
            label: 'a) Viết chữ cái thích hợp vào ô trống (theo mẫu).',
            rows: [[600, 567, 284, 159, 391, 300], [sampleCell('H'), letterCell('O'), letterCell('A'), letterCell('S'), letterCell('E'), letterCell('N')]],
          },
        ],
        blanks: [{ label: 'b) Ô chữ em giải được là: ...', answer: 'HOA SEN', validate: phraseValidate('HOA SEN') }],
        hints: ['Tính kết quả từng phép tính: 534 − 250 = 284 ứng với chữ A.'],
      },
      {
        type: 'match', section: 'Tiết 4',
        q: '4. Mỗi con gà ghi phép tính có kết quả là số ghi trên ổ rơm.\nEm hãy nối để tìm ổ rơm thích hợp cho mỗi con gà.',
        left: [{ id: 'a', text: '251 − 160' }, { id: 'b', text: '672 − 218' }, { id: 'c', text: '750 − 90' }],
        right: [{ id: 'r660', text: '660' }, { id: 'r454', text: '454' }, { id: 'r91', text: '91' }],
        pairs: [['a', 'r91'], ['b', 'r454'], ['c', 'r660']],
      },
      {
        type: 'table', section: 'Tiết 4',
        q: '5. Rô-bốt tra cứu được chiều dài chảy qua lãnh thổ Việt Nam của một số con sông như bảng bên:',
        headers: ['Tên sông', 'Chiều dài'],
        rows: [['Sông Thái Bình', '411 km'], ['Sông Hồng', '551 km'], ['Sông Đà', '543 km'], ['Sông Bé', '385 km']],
        blanks: [
          {
            label: 'a) Viết các số đo độ dài đã cho theo thứ tự từ bé đến lớn.<br>...',
            answer: '385 km, 411 km, 543 km, 551 km',
            validate: (v) => listValidate(['385', '411', '543', '551'])(String(v).replace(/km/gi, '')),
          },
          {
            label: 'b) Khoanh vào chữ đặt trước câu trả lời đúng.<br>Con sông nào có chiều dài bé hơn 500 km nhưng lớn hơn 400 km?<br>A. Sông Thái Bình &nbsp; B. Sông Hồng &nbsp; C. Sông Đà &nbsp; D. Sông Bé<br>Chữ đặt trước câu trả lời đúng: ...',
            answer: 'A', validate: letterValidate('A'),
          },
          eq('c) Viết số thích hợp vào chỗ chấm.<br>Sông Hồng dài hơn sông Đà ... km.', 8),
        ],
        hints: ['So sánh chữ số hàng trăm trước: 385 bé nhất.', 'c) 551 − 543.'],
      },
    ],
  },

  // ── BÀI 63 (trang 88–90) ─────────────────────────────────────────────────
  {
    id: 'bai-63', number: 63, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Đặt tính rồi tính.',
        blanks: [calc(314, '+', 462), calc(736, '+', 58), calc(492, '−', 48), calc(628, '−', 567)],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB63Solids,
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          eq('a) Tổng của hai số ghi ở khối lập phương và khối trụ bằng ...', 948),
          eq('b) Hiệu của hai số ghi ở khối cầu và khối hộp chữ nhật bằng ...', 117),
        ],
        hints: ['Khối lập phương ghi 523, khối trụ ghi 425, khối cầu ghi 385, khối hộp chữ nhật ghi 268.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '3. Một tiệm vải buổi sáng bán được 240 m vải, buổi chiều bán được 180 m vải. Hỏi cả hai buổi tiệm vải đó bán được bao nhiêu mét vải?',
        blanks: [{ label: 'Số mét vải cả hai buổi', answer: '420' }],
        hints: ['Làm phép cộng: 240 + 180.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB63Grid,
        q: '4. a) Vẽ tiếp hình (theo mẫu).\nb) Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: '• Hình vừa vẽ đi qua hai số là ... và ...', answer: '351, 580', validate: setValidate(['351', '580']) },
          eq('• Hiệu hai số đó bằng ...', 229),
        ],
        hints: ['Hình lặp lại sau mỗi 6 ô: một khung cao rộng 3 ô, rồi một khung thấp rộng 1 ô.', 'Vẽ tiếp bằng bút chì ra giấy rồi xem hình đi qua chấm nào.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đ, S?',
        blanks: [
          ds('a) 536 − 28 = 518', false), ds('b) 727 + 33 = 750', false),
          ds('c) 340 + 159 = 499', true), ds('d) 329 − 138 = 291', false),
        ],
        hints: ['Đặt tính và tính lại từng phép tính: 536 − 28 = 508.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Kết quả tính 356 + 320 − 280 bằng:', options: ['A. 296', 'B. 395', 'C. 396'], answer: 'C' },
          { left: 'b) Kết quả tính 520 − 318 + 407 bằng:', options: ['A. 609', 'B. 519', 'C. 619'], answer: 'A' },
        ],
        hints: ['Tính lần lượt từ trái sang phải: 356 + 320 = 676.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '3. Trường Hoà Bình có 425 học sinh. Trường Thành Công có ít hơn trường Hoà Bình là 70 học sinh. Hỏi trường Thành Công có bao nhiêu học sinh?',
        blanks: [{ label: 'Số học sinh trường Thành Công', answer: '355' }],
        hints: ['"Ít hơn" thì làm phép trừ: 425 − 70.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Tính nhẩm.',
        blanks: [
          calcEq(500, '−', 300), calcEq(600, '−', 200), calcEq(800, '+', 200), calcEq(300, '+', 80),
          calcEq(200, '+', 30), calcEq(400, '−', 100), calcEq(400, '+', 500), calcEq(1000, '−', 500),
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '5. Cho các số: 629, 362, 372, 257.\na) Nối các số đã cho theo thứ tự từ bé đến lớn.\nb) Viết số thích hợp vào chỗ chấm.',
        blanks: [
          nums('a) Các số theo thứ tự từ bé đến lớn: ... → ... → ... → ...', [257, 362, 372, 629]),
          eq('b) • Tổng của số lớn nhất và số bé nhất trong các số đã cho bằng ...', 886),
          eq('• Hiệu của số lớn nhất và số bé nhất trong các số đã cho bằng ...', 372),
        ],
        hints: ['Số lớn nhất là 629, số bé nhất là 257.'],
      },
    ],
  },

  // ── BÀI 64 (trang 91–92) ─────────────────────────────────────────────────
  {
    id: 'bai-64', number: 64, title: 'Thu thập, phân loại, kiểm đếm số liệu',
    questions: [
      {
        type: 'fill', img: imgB64Books,
        q: '1. Số?\nTrên giá sách có bao nhiêu cuốn sách mỗi loại?',
        blanks: [
          { ...eq('a) Toán 2: ... quyển.', 10)},
          { ...eq('b) Tiếng Việt 2: ... quyển.', 15)},
          { ...eq('c) Tự nhiên và Xã hội 2: ... quyển.', 8)},
        ],
        hints: ['Đếm từng ngăn sách rồi cộng lại. Nhìn chữ trên gáy sách: "Toá", "Tiế", "Tự".'],
      },
      {
        type: 'fill',
        q: `2. Cho biết lịch làm việc nhà hằng tuần của Rô-bốt như sau:\n${CHORES}\na) Số?\nRô-bốt làm mỗi việc đó vào mấy ngày trong tuần?`,
        blanks: [
          { ...eq('• Nấu cơm: ... ngày;', 4)},
          { ...eq('• Giặt quần áo: ... ngày;', 3)},
          { ...eq('• Rửa bát: ... ngày;', 3)},
          { ...eq('• Lau nhà: ... ngày.', 2)},
        ],
        hints: ['Ô "Rửa bát" của Thứ Ba và ô "Nấu cơm" của Thứ Sáu chỉ tính một ngày.'],
      },
      {
        type: 'compare',
        q: `2. Cho biết lịch làm việc nhà hằng tuần của Rô-bốt như sau:\n${CHORES}\nb) Khoanh vào chữ đặt trước câu trả lời đúng.`,
        rows: [
          { left: '• Rô-bốt làm việc gì trong nhiều ngày nhất?', options: CHORE_OPTS, answer: 'A' },
          { left: '• Rô-bốt làm việc gì trong ít ngày nhất?', options: CHORE_OPTS, answer: 'D' },
        ],
        hints: ['Dùng số ngày đếm được ở câu a: nấu cơm 4 ngày, lau nhà 2 ngày.'],
      },
      {
        type: 'fill', img: imgB64Lanterns,
        q: '3. Rô-bốt đã làm những đèn lồng sau đây để bán lấy tiền quyên góp cho quỹ khuyến học:\na) Số?\nRô-bốt đã làm được:',
        blanks: [
          { ...eq('• ... đèn lồng dạng khối hộp chữ nhật;', 3)},
          { ...eq('• ... đèn lồng dạng khối trụ;', 6)},
          { ...eq('• ... đèn lồng dạng khối cầu.', 9)},
          ds('b) Đ, S?<br>• Đèn lồng dạng khối cầu có nhiều nhất.', true),
          ds('• Đèn lồng dạng khối trụ có ít nhất.', false),
        ],
        hints: ['Đếm từng hàng đèn lồng; tổng cộng có 18 chiếc.'],
      },
    ],
  },
];
