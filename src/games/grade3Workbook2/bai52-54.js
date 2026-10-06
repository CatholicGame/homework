/**
 * Vở bài tập Toán 3 — Tập hai: Bài 52–54 (sách trang 26–39).
 * Diện tích hình chữ nhật, diện tích hình vuông; luyện tập chung;
 * phép cộng trong phạm vi 10 000.
 */
import { blank, mau, setValidate, stripVN } from '../grade3Workbook.js';
import imgB52Rect from '../../assets/grade3-workbook-2/bai52_t1_q1_rect.svg';
import imgB52Grid from '../../assets/grade3-workbook-2/bai52_t1_q3_grid.svg';
import imgB52Pieces from '../../assets/grade3-workbook-2/bai52_t1_q4_pieces.svg';
import imgB52Cards from '../../assets/grade3-workbook-2/bai52_t2_q3_cards.svg';
import imgB52Frame from '../../assets/grade3-workbook-2/bai52_t2_q4_frame.svg';
import imgB52H from '../../assets/grade3-workbook-2/bai52_t3_q1_H.svg';
import imgB52Rooms from '../../assets/grade3-workbook-2/bai52_t3_q2_rooms.svg';
import imgB52Square from '../../assets/grade3-workbook-2/bai52_t3_q3_square.svg';
import imgB52Glass from '../../assets/grade3-workbook-2/bai52_t3_q4_glass.svg';
import imgB53Carpet from '../../assets/grade3-workbook-2/bai53_t1_q3_carpet.svg';
import imgB53Plots from '../../assets/grade3-workbook-2/bai53_t1_q4_plots.svg';
import imgB53Grid from '../../assets/grade3-workbook-2/bai53_t2_q3_grid.svg';
import imgB53M from '../../assets/grade3-workbook-2/bai53_t3_q2_M.svg';
import imgB53Papers from '../../assets/grade3-workbook-2/bai53_t3_q3_papers.svg';
import imgB54Trees from '../../assets/grade3-workbook-2/bai54_t2_q3_trees.svg';

// ── Local helpers ────────────────────────────────────────────────────────────

// A number the book prints with a thin space ("8 073"): accepted with or
// without the space, or with a dot ("8.073").
const plainNum = (v) => String(v).trim().replace(/[\s.]/g, '');
const numV = (n) => (v) => plainNum(v) === String(n);
// Several numbers in one row, one per "...", compared slot by slot.
const numListV = (...ns) => (v) => {
  const got = String(v).split(',').map(plainNum);
  return got.length === ns.length && ns.every((n, i) => got[i] === String(n));
};

// Strips the written unit the answer may carry ("cm²", "cm2", "(cm²)" for an
// area; "cm" for a length) and spacing; a different unit is left in place, so
// "9 m" is not taken for "9 cm".
const UNITS = { area: /\(?(cm²|cm2|cm\^2)\)?\.?$/, cm: /\(?cm\)?\.?$/ };
const stripUnit = (v, u) => String(v).toLowerCase().replace(/\s+/g, '')
  .replace(UNITS[u], '');
// A measure with its unit optional: "45", "45 cm²", "45cm2", "45 (cm²)".
const measureV = (n, u = 'area') => (v) => plainNum(stripUnit(v, u)) === String(n);
// A table cell the book fills as "9 × 2 = 18 (cm²)": the calculation (either
// order of the factors, x or × or *) with its result, or just the result.
function calcCellV(a, b, n, u) {
  const ok = new Set([String(n), `${a}×${b}=${n}`, `${b}×${a}=${n}`]);
  return (v) => ok.has(stripUnit(v, u).replace(/[x*]/g, '×').replace(/[()]/g, ''));
}
const calcCell = (a, b, n, unit) => blank(`${a} × ${b} = ${n} (${unit})`, { validate: calcCellV(a, b, n, unit === 'cm' ? 'cm' : 'area') });
const cmCell = (n) => blank(`${n} cm`, { validate: measureV(n, 'cm') });

// "Hai hình có diện tích bằng nhau là ..." — the two shape letters in any
// order, the words "hình", "và" optional ("hình A và hình B", "A, B").
function lettersV(letters) {
  const target = [...letters].sort().join('');
  return (v) => {
    const got = stripVN(v).replace(/\bhinh\b|\bva\b/g, ' ').toUpperCase().replace(/[^A-Z]/g, '');
    return [...got].sort().join('') === target;
  };
}
// A tree's name, with or without the word "cây" ("đa", "cây đa", "Cay da").
const treeV = (name) => (v) => stripVN(v).replace(/^\s*cay\s+/, '').replace(/[^a-z]/g, '') === stripVN(name).replace(/[^a-z]/g, '');
// The expression on the chosen paper, spacing free ("4535+3650").
const exprV = (e) => (v) => String(v).replace(/[\s.]/g, '') === e.replace(/\s/g, '');

const PIECES = ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'I', 'K', 'L', 'F', 'J'].sort();
const PAPERS = ['3 625 + 3 625', '4 535 + 3 650', '3 650 + 4 500'];

export const BAI_52_54 = [
  // ── BÀI 52 (trang 26–31) ─────────────────────────────────────────────────
  {
    id: 'bai-52', number: 52, title: 'Diện tích hình chữ nhật, diện tích hình vuông',
    questions: [
      {
        type: 'table', section: 'Tiết 1', img: imgB52Rect,
        q: '1. Hoàn thành bảng sau (theo mẫu).',
        rows: [
          ['Hình chữ nhật', 'ABCD', 'DCEG', 'ABEG'],
          ['Chiều dài', '9 cm', cmCell(9), cmCell(9)],
          ['Chiều rộng', '2 cm', cmCell(5), cmCell(7)],
          ['Diện tích', '9 × 2 = 18 (cm²)', calcCell(9, 5, 45, 'cm²'), calcCell(9, 7, 63, 'cm²')],
        ],
        hints: ['Hình chữ nhật DCEG có chiều dài DC = 9 cm, chiều rộng CE = 5 cm.', 'Chiều rộng của ABEG là 2 cm + 5 cm. Diện tích = chiều dài × chiều rộng.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '2. Một tấm gỗ hình chữ nhật có chiều rộng là 8 cm, chiều dài 17 cm. Tính diện tích tấm gỗ đó.',
        blanks: [{ label: 'Diện tích tấm gỗ (cm²)', answer: '136', validate: measureV(136) }],
        hints: ['Diện tích hình chữ nhật = chiều dài × chiều rộng (cùng đơn vị đo).'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB52Grid,
        // 🟦 Ô vuông 1 cm²: phần kẹo của từng bạn theo bai52_t1_q3_grid.svg.
        areaPlay: {
          cell: 50, origin: [16, 14], names: { B: 'Bu-ra-ti-nô', R: 'Rô-bốt', D: 'Dế Mèn', G: 'Gà' },
          map: ['BBBBBBRR', 'BBBBBBRR', 'BBBBBBRR', 'DDDDRRRR', 'DDDDRRRR', 'DDGGGGGG', 'DDGGGGGG', 'DDGGGGGG'],
          // a) Dế Mèn, rô-bốt, gà, Bu-ra-ti-nô: bốn chỗ trống của ô đầu
          fill: [{ blank: 0, shape: 'D', input: 0 }, { blank: 0, shape: 'R', input: 1 }, { blank: 0, shape: 'G', input: 2 }, { blank: 0, shape: 'B', input: 3 }],
        },
        q: '3. Viết số thích hợp vào chỗ chấm.\nBu-ra-ti-nô bẻ miếng kẹo sô-cô-la thành bốn phần rồi chia cho bốn bạn như hình vẽ.',
        blanks: [
          { label: 'a) Phần kẹo mỗi bạn nhận được là:<br>Dế mèn: ... cm², rô-bốt: ... cm², gà: ... cm², Bu-ra-ti-nô: ... cm².', answer: '14,14,18,18', validate: numListV(14, 14, 18, 18) },
          { label: 'b) Nếu chia đều thì mỗi bạn nhận được phần kẹo là ... cm².', answer: '16', validate: numV(16) },
        ],
        hints: ['Mỗi ô vuông là 1 cm². Đếm số ô của phần có hình mỗi bạn.', 'Cả miếng kẹo có 8 × 8 = 64 ô, chia đều cho 4 bạn.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB52Pieces,
        q: '4. Tô màu hình chữ nhật có diện tích là 8 cm².\n(Hình chữ nhật đó ghép từ những mảnh nào? Chọn tên các mảnh.)',
        blanks: [{ label: 'Các mảnh ghép thành hình chữ nhật 8 cm²:', answer: 'A, B, C', validate: setValidate(['A', 'B', 'C']), tiles: PIECES }],
        hints: ['Mỗi ô vuông là 1 cm². Hình chữ nhật 8 cm² có thể gồm 2 hàng, mỗi hàng 4 ô.', 'Tìm vài mảnh nằm cạnh nhau ghép lại thành đúng một hình chữ nhật.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Hoàn thành bảng sau (theo mẫu).',
        rows: [
          ['Cạnh hình vuông', '6 cm', '7 cm', '4 cm'],
          ['Chu vi hình vuông', '6 × 4 = 24 (cm)', calcCell(7, 4, 28, 'cm'), calcCell(4, 4, 16, 'cm')],
          ['Diện tích hình vuông', '6 × 6 = 36 (cm²)', calcCell(7, 7, 49, 'cm²'), calcCell(4, 4, 16, 'cm²')],
        ],
        hints: ['Chu vi hình vuông = cạnh × 4. Diện tích hình vuông = cạnh × cạnh.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '2. Có một tờ giấy hình vuông cạnh 9 cm.\na) Tính diện tích tờ giấy hình vuông đó.\nb) Nếu cắt đi một hình vuông có cạnh 4 cm của tờ giấy đó thì diện tích phần còn lại của tờ giấy là bao nhiêu xăng-ti-mét vuông?',
        blanks: [
          { label: 'a) Diện tích tờ giấy (cm²)', answer: '81', validate: measureV(81) },
          { label: 'b) Diện tích phần còn lại (cm²)', answer: '65', validate: measureV(65) },
        ],
        hints: ['a) 9 × 9.', 'b) Lấy diện tích tờ giấy trừ diện tích hình vuông cạnh 4 cm.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true, img: imgB52Cards,
        q: '3. Ghép bốn tấm bìa trong hình bên được một hình vuông. Tính diện tích của hình vuông đó.',
        blanks: [{ label: 'Diện tích hình vuông (cm²)', answer: '25', validate: measureV(25) }],
        hints: ['Mỗi ô vuông là 1 cm². Đếm số ô của cả bốn tấm bìa rồi cộng lại.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true, img: imgB52Frame,
        q: '4. Một miếng gỗ hình vuông có cạnh 10 cm. Bác Chiến đục bỏ một hình vuông ở giữa có cạnh 6 cm. Phần gỗ còn lại có diện tích là bao nhiêu xăng-ti-mét vuông?',
        blanks: [{ label: 'Diện tích phần gỗ còn lại (cm²)', answer: '64', validate: measureV(64) }],
        hints: ['Tính diện tích miếng gỗ và diện tích hình vuông bị đục bỏ, rồi lấy hiệu.'],
      },
      {
        type: 'fill', section: 'Tiết 3', wordProblem: true, img: imgB52H,
        q: '1. Hình H gồm hình vuông ABCD và hình chữ nhật DMNP (có kích thước như trên hình bên).\na) Tính diện tích hình vuông ABCD và diện tích hình chữ nhật DMNP.\nb) Tính diện tích hình H.',
        blanks: [
          { label: 'a) Diện tích hình vuông ABCD (cm²)', answer: '81', validate: measureV(81) },
          { label: 'a) Diện tích hình chữ nhật DMNP (cm²)', answer: '160', validate: measureV(160) },
          { label: 'b) Diện tích hình H (cm²)', answer: '241', validate: measureV(241) },
        ],
        hints: ['Hình vuông ABCD có cạnh 9 cm; hình chữ nhật DMNP dài 20 cm, rộng 8 cm.', 'Diện tích hình H bằng tổng diện tích hai hình.'],
      },
      {
        type: 'table', section: 'Tiết 3', img: imgB52Rooms,
        q: '2. Trong vương quốc mối có căn phòng của mối thợ, mối chúa và mối lính lần lượt là ba căn phòng A, B, C như hình dưới đây.\na) Số?',
        rows: [
          ['Căn phòng', 'A', 'B', 'C'],
          ['Chu vi (cm)', blank('24', { validate: numV(24) }), blank('24', { validate: numV(24) }), blank('24', { validate: numV(24) })],
          ['Diện tích (cm²)', blank('32', { validate: numV(32) }), blank('36', { validate: numV(36) }), blank('35', { validate: numV(35) })],
        ],
        blanks: [
          { label: 'b) Viết vào chỗ chấm cho thích hợp.<br>Căn phòng có diện tích lớn nhất là căn phòng ...', answer: 'B', validate: setValidate(['B']), tiles: ['A', 'B', 'C'], tileOne: true },
        ],
        hints: ['A: dài 8 cm, rộng 4 cm. B: hình vuông cạnh 6 cm. C: dài 7 cm, rộng 5 cm.'],
      },
      {
        type: 'fill', section: 'Tiết 3', wordProblem: true, img: imgB52Square,
        q: '3. Một tấm bìa cứng hình vuông có cạnh 10 cm. Bạn An cắt ra thành 4 hình tam giác nhỏ bằng nhau.\na) Tính diện tích tấm bìa cứng ban đầu.\nb) Tính diện tích một hình tam giác nhỏ.',
        blanks: [
          { label: 'a) Diện tích tấm bìa (cm²)', answer: '100', validate: measureV(100) },
          { label: 'b) Diện tích một hình tam giác nhỏ (cm²)', answer: '25', validate: measureV(25) },
        ],
        hints: ['b) Chia diện tích tấm bìa thành 4 phần bằng nhau.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB52Glass,
        q: '4. Viết số thích hợp vào chỗ chấm.\nTừ một tấm kính lớn (như hình vẽ bên) người ta cắt ra thành 4 tấm kính hình chữ nhật, mỗi tấm có chiều dài 90 cm, chiều rộng 10 cm.',
        blanks: [{ label: 'Phần kính còn lại có diện tích là ... cm².', answer: '200', validate: numV(200) }],
        hints: ['Tấm kính lớn: 95 × 40. Mỗi tấm nhỏ: 90 × 10.', 'Lấy diện tích tấm kính lớn trừ diện tích 4 tấm nhỏ.'],
      },
    ],
  },

  // ── BÀI 53 (trang 32–36) ─────────────────────────────────────────────────
  {
    id: 'bai-53', number: 53, title: 'Luyện tập chung',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Viết số thích hợp vào chỗ chấm (theo mẫu).',
        rows: [
          ['Cạnh hình vuông', '15 cm', '9 cm', blank('9', { suffix: 'cm', validate: numV(9) }), '10 dm'],
          ['Chu vi hình vuông', '60 cm', blank('36', { suffix: 'cm', validate: numV(36) }), '36 cm', blank('40', { suffix: 'dm', validate: numV(40) })],
        ],
        hints: ['Chu vi hình vuông = cạnh × 4. Biết chu vi, tìm cạnh: lấy chu vi chia cho 4.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '2. a) Tính chu vi hình chữ nhật có chiều dài 3 dm và chiều rộng 5 cm.\nb) Tính chu vi hình chữ nhật có chiều dài 4 dm và chiều rộng 20 cm.',
        blanks: [
          { label: 'a) Chu vi hình chữ nhật (cm)', answer: '70', validate: measureV(70, 'cm') },
          { label: 'b) Chu vi hình chữ nhật (cm)', answer: '120', validate: measureV(120, 'cm') },
        ],
        hints: ['Đổi về cùng đơn vị trước: 3 dm = 30 cm, 4 dm = 40 cm.', 'Chu vi hình chữ nhật = (chiều dài + chiều rộng) × 2.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true, img: imgB53Carpet,
        q: '3. Một tấm thảm trải nhà có dạng hình vuông cạnh 50 cm. Tính chu vi hình vuông ghép bởi 4 tấm thảm như thế.',
        blanks: [{ label: 'Chu vi hình vuông ghép (cm)', answer: '400', validate: measureV(400, 'cm') }],
        hints: ['Hình vuông ghép có cạnh dài bằng 2 cạnh tấm thảm: 50 cm + 50 cm.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB53Plots,
        q: '4. Cô Hoa rào các mảnh đất để trồng hoa hồng, hoa cúc và hoa mẫu đơn. Biết rằng hai cọc cạnh nhau cách nhau 1 m (như hình vẽ). Mảnh đất trồng hoa hồng có hàng rào dài nhất và mảnh đất trồng hoa cúc có hàng rào ngắn nhất.',
        blanks: [
          { label: 'a) Viết số thích hợp vào chỗ chấm.<br>Mảnh đất A có hàng rào dài ... m, mảnh đất B có hàng rào dài ... m, mảnh đất C có hàng rào dài ... m.', answer: '14,18,16', validate: numListV(14, 18, 16) },
          { label: 'b) Khoanh vào chữ đặt trước câu trả lời đúng.<br>Mảnh đất trồng hoa mẫu đơn là:<br>A. Mảnh đất A &nbsp;&nbsp; B. Mảnh đất B &nbsp;&nbsp; C. Mảnh đất C<br>Chữ đặt trước câu trả lời đúng:', answer: 'C', validate: setValidate(['C']), tiles: ['A', 'B', 'C'], tileOne: true },
        ],
        hints: ['Đếm số khoảng giữa hai cọc trên mỗi cạnh: mỗi khoảng dài 1 m.', 'Mảnh A: 4 m và 3 m; hàng rào dài (4 + 3) × 2.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '1. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Diện tích hình vuông có cạnh 7 cm là:', options: ['A. 28 cm²', 'B. 49 cm²', 'C. 35 cm²'], answer: 'B' },
          { left: 'b) Diện tích hình chữ nhật có chiều dài 8 cm và chiều rộng 5 cm là:', options: ['A. 32 cm²', 'B. 26 cm²', 'C. 40 cm²'], answer: 'C' },
        ],
        hints: ['Diện tích hình vuông = cạnh × cạnh; hình chữ nhật = dài × rộng.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '2. Một hình chữ nhật có chiều rộng 7 cm và chiều dài gấp đôi chiều rộng. Tính diện tích hình chữ nhật đó.',
        blanks: [{ label: 'Diện tích hình chữ nhật (cm²)', answer: '98', validate: measureV(98) }],
        hints: ['Chiều dài: 7 × 2 = 14 (cm). Rồi tính dài × rộng.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB53Grid,
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp.\nBa hình A, B, C được vẽ trên giấy kẻ ô vuông. Biết mỗi ô vuông có diện tích là 1 cm².',
        blanks: [
          { label: 'Hình A có diện tích là', answer: '18 cm²', validate: measureV(18) },
          { label: 'Hình B có diện tích là', answer: '18 cm²', validate: measureV(18) },
          { label: 'Hình C có diện tích là', answer: '16 cm²', validate: measureV(16) },
          { label: 'Hai hình có diện tích bằng nhau là', answer: 'hình A và hình B', validate: lettersV(['A', 'B']) },
        ],
        hints: ['Đếm ô vuông. Ở hình A, hai nửa hình tam giác ghép lại thành các ô vuông: phần mái nhà có 6 ô.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '4. Một chiếc bánh hình vuông có chu vi bằng 24 cm. Tính diện tích của chiếc bánh đó.',
        blanks: [{ label: 'Diện tích chiếc bánh (cm²)', answer: '36', validate: measureV(36) }],
        hints: ['Cạnh hình vuông: 24 : 4 = 6 (cm).'],
      },
      {
        type: 'fill', section: 'Tiết 3', wordProblem: true,
        q: '1. Người ta sử dụng 9 nan gỗ để ghép thành một tấm phản. Mỗi nan gỗ có dạng hình chữ nhật với chiều rộng 7 cm và chiều dài 130 cm. Hỏi diện tích tấm phản là bao nhiêu xăng-ti-mét vuông (bỏ qua khoảng hở giữa các nan gỗ)?',
        blanks: [{ label: 'Diện tích tấm phản (cm²)', answer: '8190', validate: measureV(8190) }],
        hints: ['Diện tích một nan gỗ: 130 × 7 = 910 (cm²). Tấm phản có 9 nan như thế.'],
      },
      {
        type: 'fill', section: 'Tiết 3', wordProblem: true, img: imgB53M,
        q: '2. Hình M gồm hình chữ nhật ABCD và hình chữ nhật DEGH (như hình vẽ).\na) Tính diện tích mỗi hình chữ nhật có trong hình M.\nb) Tính diện tích hình M.',
        blanks: [
          { label: 'a) Diện tích hình chữ nhật ABCD (cm²)', answer: '28', validate: measureV(28) },
          { label: 'a) Diện tích hình chữ nhật DEGH (cm²)', answer: '50', validate: measureV(50) },
          { label: 'b) Diện tích hình M (cm²)', answer: '78', validate: measureV(78) },
        ],
        hints: ['ABCD: dài 7 cm, rộng 4 cm. DEGH: dài 10 cm, rộng 5 cm.'],
      },
      {
        type: 'compare', section: 'Tiết 3', img: imgB53Papers,
        q: '3. Mai, Nam và Việt cắt được ba mảnh giấy có kích thước như hình vẽ dưới đây. Biết mảnh giấy Việt cắt được có chu vi bằng mảnh giấy Nam cắt được nhưng có diện tích bé hơn.\nTô màu vàng vào mảnh giấy Việt cắt được, màu xanh vào mảnh giấy Nam cắt được và màu đỏ vào mảnh giấy Mai cắt được.',
        rows: [
          { left: 'Mảnh giấy 10 cm và 8 cm tô màu:', options: ['Vàng', 'Xanh', 'Đỏ'], answer: 'Vàng' },
          { left: 'Mảnh giấy 9 cm và 8 cm tô màu:', options: ['Vàng', 'Xanh', 'Đỏ'], answer: 'Đỏ' },
          { left: 'Mảnh giấy 9 cm và 9 cm tô màu:', options: ['Vàng', 'Xanh', 'Đỏ'], answer: 'Xanh' },
        ],
        hints: ['Tính chu vi và diện tích của cả ba mảnh giấy.', 'Hai mảnh có chu vi bằng nhau (36 cm): mảnh có diện tích bé hơn là của Việt.'],
      },
    ],
  },

  // ── BÀI 54 (trang 37–39) ─────────────────────────────────────────────────
  {
    id: 'bai-54', number: 54, title: 'Phép cộng trong phạm vi 10 000',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [
          { label: '4 728 + 3 345 =', answer: '8073', validate: numV(8073) },
          { label: '3 816 + 1 207 =', answer: '5023', validate: numV(5023) },
          { label: '5 319 + 937 =', answer: '6256', validate: numV(6256) },
          { label: '674 + 519 =', answer: '1193', validate: numV(1193) },
        ],
        hints: ['Cộng lần lượt từ phải sang trái: đơn vị, chục, trăm, nghìn. Được từ 10 trở lên thì nhớ 1 sang hàng bên trái.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [
          { label: '4 272 + 3 819 =', answer: '8091', validate: numV(8091) },
          { label: '5 370 + 3 283 =', answer: '8653', validate: numV(8653) },
          { label: '8 419 + 626 =', answer: '9045', validate: numV(9045) },
        ],
        hints: ['Viết các chữ số cùng hàng thẳng cột với nhau rồi cộng từ phải sang trái.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '3. Nhà bác Vân có hai vườn trồng cà phê. Vườn thứ nhất thu hoạch được 5 500 kg cà phê. Vườn thứ hai thu hoạch được nhiều hơn vườn thứ nhất 1 500 kg cà phê. Hỏi vườn thứ hai thu hoạch được bao nhiêu ki-lô-gam cà phê?',
        blanks: [{ label: 'Số ki-lô-gam cà phê vườn thứ hai', answer: '7000', validate: numV(7000) }],
        hints: ['Nhiều hơn thì làm phép cộng: 5 500 + 1 500.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Tính rồi tô màu mảnh giấy ghi phép tính có kết quả lớn nhất.',
        blanks: [
          { label: '3 625 + 3 625 =', answer: '7250', validate: numV(7250) },
          { label: '4 535 + 3 650 =', answer: '8185', validate: numV(8185) },
          { label: '3 650 + 4 500 =', answer: '8150', validate: numV(8150) },
          { label: 'Mảnh giấy em tô màu ghi phép tính:', answer: '4 535 + 3 650', validate: exprV('4535+3650'), tiles: PAPERS, tileOne: true },
        ],
        hints: ['So sánh ba kết quả: số nào có hàng nghìn, hàng trăm lớn hơn thì lớn hơn.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `1. Tính nhẩm (theo mẫu).\n${mau('2 000 + 3 000 = ?<br>Nhẩm: 2 nghìn + 3 nghìn = 5 nghìn<br>2 000 + 3 000 = 5 000')}`,
        blanks: [
          { label: 'a) 1 000 + 6 000 =', answer: '7000', validate: numV(7000) },
          { label: 'b) 2 000 + 5 000 =', answer: '7000', validate: numV(7000) },
          { label: 'c) 4 000 + 3 000 =', answer: '7000', validate: numV(7000) },
          { label: 'd) 3 000 + 7 000 =', answer: '10000', validate: numV(10000) },
        ],
        hints: ['3 nghìn + 7 nghìn = 10 nghìn, tức là 10 000.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `2. Tính nhẩm (theo mẫu).\n${mau('3 200 + 400 = ?<br>Nhẩm: 2 trăm + 4 trăm = 6 trăm<br>3 nghìn 2 trăm + 4 trăm = 3 nghìn 6 trăm<br>3 200 + 400 = 3 600')}`,
        blanks: [
          { label: 'a) 2 500 + 300 =', answer: '2800', validate: numV(2800) },
          { label: 'b) 5 300 + 500 =', answer: '5800', validate: numV(5800) },
          { label: 'c) 3 600 + 100 =', answer: '3700', validate: numV(3700) },
          { label: 'd) 7 200 + 700 =', answer: '7900', validate: numV(7900) },
        ],
        hints: ['Cộng số trăm với số trăm, giữ nguyên số nghìn.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB54Trees,
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp.\nChim chích choè làm tổ trên cây ghi phép tính có kết quả lớn nhất.',
        blanks: [{ label: 'Vậy chim chích choè làm tổ trên cây ...', answer: 'đa', validate: treeV('đa'), tiles: ['đa', 'gạo', 'xà cừ'], tileOne: true }],
        hints: ['Tính nhẩm: 3 000 + 5 000, 2 800 + 4 000, 7 200 + 600 rồi so sánh.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '4. Để phản công quân xâm lược, tướng quân chia quân lính làm hai cánh quân. Cánh quân thứ nhất có 3 700 quân lính, cánh quân thứ hai có nhiều hơn cánh quân thứ nhất 800 quân lính. Hỏi tướng quân đã huy động tất cả bao nhiêu quân lính cho đợt phản công?',
        blanks: [{ label: 'Số quân lính đã huy động', answer: '8200', validate: numV(8200) }],
        hints: ['Tìm số quân của cánh thứ hai trước: 3 700 + 800.', 'Rồi cộng số quân của cả hai cánh.'],
      },
    ],
  },
];
