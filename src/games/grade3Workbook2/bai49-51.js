/**
 * Vở bài tập Toán 3 — Tập hai: Bài 49–51 (sách trang 14–25).
 * Luyện tập chung (số đến 10 000, làm tròn, số La Mã); chu vi hình tam giác,
 * hình tứ giác, hình chữ nhật, hình vuông; diện tích của một hình, xăng-ti-mét vuông.
 */
import {
  blank, sampleCell, mau, dsValidate, unitValidate, nameSetValidate, setValidate, stripVN,
} from '../grade3Workbook.js';
import imgB49Crates from '../../assets/grade3-workbook-2/bai49_t2_q3_crates.svg';
import imgB49Sticks from '../../assets/grade3-workbook-2/bai49_t3_q4_sticks.svg';
import imgB50Cards from '../../assets/grade3-workbook-2/bai50_t1_q3_cards.svg';
import imgB50Shapes from '../../assets/grade3-workbook-2/bai50_t1_q4_shapes.svg';
import imgB50Rect from '../../assets/grade3-workbook-2/bai50_t3_q1_rect.svg';
import imgB50Square from '../../assets/grade3-workbook-2/bai50_t3_q1_square.svg';
import imgB50Quad from '../../assets/grade3-workbook-2/bai50_t3_q1_quad.svg';
import imgB50Fence from '../../assets/grade3-workbook-2/bai50_t3_q3_fence.svg';
import imgB51Quads from '../../assets/grade3-workbook-2/bai51_t1_q1_quads.svg';
import imgB51Grid1 from '../../assets/grade3-workbook-2/bai51_t1_q2_grid.svg';
import imgB51MN from '../../assets/grade3-workbook-2/bai51_t1_q3_mn.svg';
import imgB51Duck from '../../assets/grade3-workbook-2/bai51_t1_q4_duck.svg';
import imgB51Grid2 from '../../assets/grade3-workbook-2/bai51_t2_q2_grid.svg';
import imgB51Turtle from '../../assets/grade3-workbook-2/bai51_t2_q5_turtle.svg';

// ── Local helpers ────────────────────────────────────────────────────────────

// Numbers from 1 000 up are printed with a thin space ("2 764"): a typed
// answer is accepted with or without spaces or dots ("2764", "2 764", "2.764").
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

// A Roman numeral ("XVIII"), any case, spaces ignored.
const romanOk = (r) => (v) => String(v).toUpperCase().replace(/\s+/g, '') === r;
const cellR = (r) => blank(r, { validate: romanOk(r) });

// A number with an optional unit ("20 dm", "20dm", "20"). An area also takes
// "cm2", "cm²" or "cm vuông".
const areaNorm = (v) => stripVN(v).replace(/[\s.]/g, '').replace(/²/g, '2').replace(/cmvuong$/, 'cm2');
const areaOk = (n) => (v) => areaNorm(v) === `${n}cm2`;
const cellArea = (n) => blank(`${n} cm²`, { validate: areaOk(n) });

// An area read out in words ("Ba nghìn không trăm linh tư xăng-ti-mét vuông"):
// accents, case, hyphens and spaces don't matter; "lẻ" for "linh" and "ngàn"
// for "nghìn" are accepted.
// A long given text cell may wrap (table cells are nowrap by default).
const wrapTxt = (t) => `<span style="white-space:normal">${t}</span>`;
function areaWordsOk(words) {
  const norm = (s) => stripVN(s).replace(/-/g, ' ').split(/\s+/).filter(Boolean)
    .map(w => (w === 'le' ? 'linh' : w === 'ngan' ? 'nghin' : w)).join('');
  const target = norm(words);
  // the unit words may be left out: the number reading is what is checked
  return (v) => norm(v) === target || `${norm(v)}xangtimetvuong` === target;
}
const cellWords = (w) => blank(w, { validate: areaWordsOk(w) });

// A set of digits written in one blank ("0, 1", "0 và 1", "1; 0").
const digitSetOk = (ds) => (v) => {
  const got = String(v).match(/\d+/g) || [];
  return got.length === ds.length && [...got].sort().join(',') === [...ds].sort().join(',');
};

// A yes answer ("Có", "Được", "Có, mỗi cạnh 4 que"), but not one that says no.
const yesOk = (v) => {
  const t = stripVN(v).trim();
  if (/khong/.test(t)) return false;
  return /^(co|duoc)\b/.test(t);
};

// "Nam tính đúng hay sai?": Nam is wrong ("Sai", "Nam tính sai", "Nam tính chưa đúng").
const namWrongOk = (v) => {
  const t = stripVN(v);
  return /\bsai\b/.test(t) || /(khong|chua) dung/.test(t);
};

// Bài 49 Tiết 3 Q4: moving one matchstick fixes IV + V = XI in two ways:
// IV + V = IX (the I of XI moves to the left) or VI + V = XI (the I of IV moves right).
const sticksOk = (v) => {
  const t = String(v).toUpperCase().replace(/\s+/g, '');
  return t === 'IV+V=IX' || t === 'VI+V=XI';
};

const NAMES = ['Mai', 'Nam', 'Việt', 'Rô-bốt'];
const LETTERS_ABC = ['A', 'B', 'C'];

export const BAI_49_51 = [
  // ── BÀI 49 (trang 14–17) ──────────────────────────────────────────────────
  {
    id: 'bai-49', number: 49, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          N('a) Số ... đọc là bốn nghìn ba trăm linh tư.', 4304),
          N('b) Số ... đọc là ba nghìn không trăm bốn mươi.', 3040),
          N('c) Số ... đọc là sáu nghìn tám trăm.', 6800),
          N('d) Số ... đọc là hai nghìn tám trăm năm mươi chín.', 2859),
        ],
        hints: ['Viết lần lượt chữ số hàng nghìn, hàng trăm, hàng chục, hàng đơn vị. Hàng nào không có thì viết chữ số 0.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          N('a) 6 084, 6 085, 6 086, ..., ..., 6 089, ..., 6 091.', 6087, 6088, 6090),
          N('b) 10 000, ..., ..., 9 997, 9 996, 9 995, ..., 9 993.', 9999, 9998, 9994),
        ],
        hints: ['a) Mỗi số hơn số liền trước 1 đơn vị.', 'b) Mỗi số kém số liền trước 1 đơn vị: số liền sau 10 000 trong dãy là 9 999.'],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Số 5 807 có chữ số hàng trăm là:', options: ['A. 5', 'B. 8', 'C. 0', 'D. 7'], answer: 'B' },
          { left: 'b) Số 5 807 làm tròn đến hàng trăm thì được số:', options: ['A. 5 900', 'B. 5 810', 'C. 5 800', 'D. 5 700'], answer: 'C' },
        ],
        hints: ['5 807 gồm 5 nghìn, 8 trăm, 0 chục, 7 đơn vị.', 'Làm tròn đến hàng trăm: nhìn chữ số hàng chục. Chữ số hàng chục là 0 (bé hơn 5) nên giữ nguyên hàng trăm.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nMỗi bạn Mai, Nam, Việt và Rô-bốt đã viết một bài văn giới thiệu về trường của mình với số từ lần lượt là: 2 342 từ, 974 từ, 1 700 từ và 2 100 từ.',
        blanks: [
          { label: 'a) Bạn viết bài văn dài nhất là bạn ...', answer: 'Mai', validate: nameSetValidate(['Mai']), tiles: NAMES, tileOne: true },
          { label: 'Bạn viết bài văn ngắn nhất là bạn ...', answer: 'Nam', validate: nameSetValidate(['Nam']), tiles: NAMES, tileOne: true },
          { label: 'b) Những bạn viết bài văn dài hơn 2 000 từ là ...', answer: 'Mai, Rô-bốt', validate: nameSetValidate(['Mai', 'Rô-bốt']), tiles: NAMES },
        ],
        hints: ['Mai: 2 342 từ, Nam: 974 từ, Việt: 1 700 từ, Rô-bốt: 2 100 từ. So sánh các số này.', 'Có hai bạn viết nhiều hơn 2 000 từ.'],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '5. Viết số La Mã thích hợp vào chỗ chấm (theo mẫu).',
        rows: [
          ['Số', sampleCell('3'), '10', '12', '9'],
          ['Số La Mã', sampleCell('III'), cellR('X'), cellR('XII'), cellR('IX')],
        ],
        hints: ['X là 10. Viết I bên phải X thì thêm 1, viết I bên trái X thì bớt 1.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. a) Số?',
        headers: ['Số', 'Hàng nghìn', 'Hàng trăm', 'Hàng chục', 'Hàng đơn vị'],
        rows: [
          [cellN(2764), '2', '7', '6', '4'],
          ['9 805', blank('9'), '8', '0', '5'],
          ['6 159', '6', blank('1'), '5', '9'],
          ['4 971', '4', '9', blank('7'), '1'],
        ],
        blanks: [
          N('b) Viết số thích hợp vào chỗ chấm.<br>– Làm tròn số 2 764 đến hàng trăm ta được số ...', 2800),
          N('– Làm tròn số 9 805 đến hàng trăm ta được số ...', 9800),
          N('– Làm tròn số 6 159 đến hàng trăm ta được số ...', 6200),
          N('– Làm tròn số 4 971 đến hàng trăm ta được số ...', 5000),
        ],
        hints: [
          'Đọc các chữ số từ hàng nghìn đến hàng đơn vị để viết số.',
          'Làm tròn đến hàng trăm: chữ số hàng chục bé hơn 5 thì giữ nguyên hàng trăm, từ 5 trở lên thì hàng trăm thêm 1. Các chữ số hàng chục, đơn vị thành 0.',
        ],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Trong các số 5 084, 4 058, 4 850, 5 048, số lớn nhất là:', options: ['A. 5 084', 'B. 4 058', 'C. 4 850', 'D. 5 048'], answer: 'A' },
          { left: 'b) Trong các số 5 084, 4 058, 4 850, 5 048, số bé nhất là:', options: ['A. 5 084', 'B. 4 058', 'C. 4 850', 'D. 5 048'], answer: 'B' },
        ],
        hints: ['So sánh chữ số hàng nghìn trước, rồi đến hàng trăm.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB49Crates,
        q: '3. Viết số La Mã thích hợp vào chỗ chấm.\nMỗi thùng hàng dưới đây ghi một trong các số từ XVI đến XIX.',
        blanks: [{ label: 'Thùng hàng bị che khuất ghi số ...', answer: 'XVIII', validate: romanOk('XVIII') }],
        hints: ['XVI là 16, XVII là 17, XIX là 19. Thùng bị che ghi số 18.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết số thích hợp vào chỗ chấm.\nCho dãy số: 1 145, 1 514, 1 541, 1 451. Mỗi lần đổi chỗ, ta được quyền đổi chỗ hai số trong dãy số đó.',
        blanks: [{ label: 'Để nhận được dãy số với các số được sắp xếp theo thứ tự từ bé đến lớn, ta cần đổi chỗ ít nhất ... lần.', answer: '2' }],
        hints: ['Dãy đúng thứ tự từ bé đến lớn là: 1 145, 1 451, 1 514, 1 541.', 'Số 1 145 đã đúng chỗ. Ba số còn lại đều sai chỗ, một lần đổi chỉ sửa được tối đa hai số.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          N('a) 3 267 = 3 000 + ... + 60 + 7', 200),
          N('b) 9 043 = 9 000 + ... + 3', 40),
          N('c) 2 005 = 2 000 + ...', 5),
          N('d) 8 300 = 8 000 + ...', 300),
        ],
        hints: ['Tách số theo từng hàng: nghìn, trăm, chục, đơn vị.'],
      },
      {
        type: 'table', section: 'Tiết 3',
        q: '2. Viết số thích hợp vào chỗ chấm.',
        tables: [{ label: 'a)', rows: [['6', '5', '', '9', '<', '6', '5', '2', '0']] }],
        blanks: [
          { label: 'Để được phép so sánh đúng, những chữ số Nam có thể viết vào ô trống là: ...', answer: '0, 1', validate: digitSetOk(['0', '1']) },
          N('b) Nam có tất cả ... cách chọn chữ số phù hợp để viết vào ô trống.', 2),
        ],
        hints: ['Hai số đều có 6 nghìn, 5 trăm. Chữ số hàng chục ở ô trống phải làm cho số bên trái bé hơn 6 520.', 'Thử lần lượt: 6 509 < 6 520, 6 519 < 6 520, còn 6 529 > 6 520.'],
      },
      {
        type: 'choice', section: 'Tiết 3',
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.\nBằng cách làm tròn số đến hàng trăm, ta nói đỉnh núi Pu Si Lung (Lai Châu) cao khoảng 3 100 m. Vậy trên thực tế, số đo nào dưới đây có thể là độ cao của đỉnh núi đó?',
        options: ['2 925 m', '3 012 m', '3 049 m', '3 083 m'],
        answer: 3,
        hints: ['Làm tròn từng số đến hàng trăm rồi xem số nào được 3 100.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB49Sticks,
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nNam di chuyển một que tính ở hình dưới đây để nhận được phép tính đúng.',
        blanks: [{ label: 'Phép tính đúng là: ...', answer: 'IV + V = IX', validate: sticksOk }],
        hints: ['IV + V là 4 + 5 = 9, còn XI là 11.', 'Chuyển que I của XI sang bên trái chữ X để được số 9 (IX).'],
      },
    ],
  },

  // ── BÀI 50 (trang 18–22) ──────────────────────────────────────────────────
  {
    id: 'bai-50', number: 50, title: 'Chu vi hình tam giác, hình tứ giác, hình chữ nhật, hình vuông',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '1. Tính chu vi hình tam giác có độ dài các cạnh là:\na) 4 cm, 7cm và 10 cm.\nb) 15 dm, 20 dm và 30 dm.\nc) 9 dm, 9 dm và 9 dm.',
        blanks: [
          { label: 'a) Chu vi hình tam giác: ... cm', answer: '21' },
          { label: 'b) Chu vi hình tam giác: ... dm', answer: '65' },
          { label: 'c) Chu vi hình tam giác: ... dm', answer: '27' },
        ],
        hints: ['Chu vi hình tam giác bằng tổng độ dài ba cạnh.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '2. Tính chu vi hình tứ giác có độ dài các cạnh là 20 dm, 30 dm, 20 dm và 30 dm.',
        blanks: [{ label: 'Chu vi hình tứ giác: ... dm', answer: '100' }],
        hints: ['Chu vi hình tứ giác bằng tổng độ dài bốn cạnh.'],
      },
      {
        type: 'compare', section: 'Tiết 1', img: imgB50Cards,
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.\nĐể làm đồ chơi, Rô-bốt cắt các miếng bìa có kích thước như hình dưới đây:',
        rows: [
          { left: 'a) Chu vi của miếng bìa hình tam giác là:', options: ['A. 45 cm', 'B. 40 cm', 'C. 42 cm'], answer: 'C' },
          { left: 'b) Chu vi của miếng bìa hình tứ giác là:', options: ['A. 80 cm', 'B. 85 cm', 'C. 90 cm'], answer: 'B' },
        ],
        hints: ['Tam giác: 15 + 15 + 12. Tứ giác: 15 + 20 + 30 + 20.'],
      },
      {
        type: 'compare', section: 'Tiết 1', img: imgB50Shapes,
        q: '4. Tô màu đỏ vào hình có chu vi lớn nhất, màu xanh vào hình có chu vi bé nhất.',
        rows: [
          { left: 'Hình tô màu đỏ là:', options: ['A. Hình tam giác', 'B. Hình tứ giác bên phải', 'C. Hình tứ giác ở dưới'], answer: 'A' },
          { left: 'Hình tô màu xanh là:', options: ['A. Hình tam giác', 'B. Hình tứ giác bên phải', 'C. Hình tứ giác ở dưới'], answer: 'B' },
        ],
        hints: ['Tính chu vi từng hình: cộng độ dài tất cả các cạnh.', 'Hình tam giác: 21 cm, hình tứ giác bên phải: 18 cm, hình tứ giác ở dưới: 19 cm.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Hoàn thành bảng sau (theo mẫu).',
        rows: [
          ['Cạnh hình vuông', sampleCell('9 cm'), '5 dm', '8 m', '10 dm'],
          ['Chu vi hình vuông', sampleCell('36 cm'), blank('20 dm', { validate: unitValidate(20, 'dm') }), blank('32 m', { validate: unitValidate(32, 'm') }), blank('40 dm', { validate: unitValidate(40, 'dm') })],
        ],
        hints: ['Chu vi hình vuông bằng độ dài một cạnh nhân với 4. Nhớ viết cả đơn vị đo.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '2. Tính chu vi hình chữ nhật có:\na) Chiều dài 7 cm, chiều rộng 3 cm.\nb) Chiều dài 6 m, chiều rộng 3 m.',
        blanks: [
          { label: 'a) Chu vi hình chữ nhật: ... cm', answer: '20' },
          { label: 'b) Chu vi hình chữ nhật: ... m', answer: '18' },
        ],
        hints: ['Chu vi hình chữ nhật bằng (chiều dài + chiều rộng) × 2.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '3. Bạn Nam dùng các que tính để xếp thành một hình chữ nhật. Biết chiều dài được xếp bởi 5 que tính và chiều rộng được xếp bởi 3 que tính.\na) Để vừa đủ que tính xếp thành hình chữ nhật như trên, bạn Nam cần bao nhiêu que tính?\nb) Có thể dùng hết số que tính trên để xếp thành một hình vuông được không? Nếu có, em hãy tính xem mỗi cạnh hình vuông được xếp bởi mấy que tính.',
        blanks: [
          { label: 'a) Số que tính cần dùng: ... que tính', answer: '16' },
          { label: 'b) Xếp được hình vuông không? ...', answer: 'Có', validate: yesOk },
          { label: 'Mỗi cạnh hình vuông: ... que tính', answer: '4' },
        ],
        hints: ['Hình chữ nhật có 2 chiều dài và 2 chiều rộng: (5 + 3) × 2.', 'Hình vuông có 4 cạnh bằng nhau: lấy số que tính chia cho 4.'],
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '1. Nối hình với số đo là chu vi của hình đó.',
        left: [{ id: 'f1', img: imgB50Rect }, { id: 'f2', img: imgB50Square }, { id: 'f3', img: imgB50Quad }],
        right: [{ id: 'p32', text: '32 cm' }, { id: 'p19', text: '19 cm' }, { id: 'p18', text: '18 cm' }],
        pairs: [['f1', 'p18'], ['f2', 'p32'], ['f3', 'p19']],
        bigImg: true,
        hints: ['Hình chữ nhật: (6 + 3) × 2. Hình vuông: 8 × 4. Hình tứ giác: 3 + 4 + 5 + 7.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Viết câu trả lời thích hợp vào chỗ chấm.\nRô-bốt sử dụng một đoạn dây vừa đủ để trang trí viền của bức tranh hình chữ nhật có chiều dài 12 dm và chiều rộng 80 cm. Tính độ dài của đoạn dây mà Rô-bốt đã dùng.\nNam đã giải như sau:\n<span style="display:block;text-align:center"><i>Bài giải</i><br>Độ dài đoạn dây Rô-bốt đã dùng là:<br>(12 + 80) × 2 = 184 (cm)<br><i>Đáp số:</i> 184 cm.</span>Theo em, Nam tính đúng hay sai?',
        blanks: [{ label: 'Trả lời: ...', answer: 'Nam tính sai', validate: namWrongOk }],
        hints: ['Chiều dài và chiều rộng có cùng đơn vị đo chưa?', '12 dm = 120 cm. Độ dài đúng là (120 + 80) × 2 = 400 (cm).'],
      },
      {
        type: 'fill', section: 'Tiết 3', wordProblem: true, img: imgB50Fence,
        q: '3. Cô Hương làm một hàng rào quanh vườn hoa có dạng hình chữ nhật với chiều dài 8 m và chiều rộng 4 m. Cô có để lối vào 1 m (như hình vẽ). Hỏi hàng rào đó dài bao nhiêu mét?',
        blanks: [{ label: 'Hàng rào dài: ... m', answer: '23' }],
        hints: ['Tính chu vi vườn hoa: (8 + 4) × 2.', 'Lối vào 1 m không làm hàng rào: lấy chu vi trừ đi 1 m.'],
      },
    ],
  },

  // ── BÀI 51 (trang 23–25) ──────────────────────────────────────────────────
  {
    id: 'bai-51', number: 51, title: 'Diện tích của một hình. Xăng-ti-mét vuông',
    questions: [
      {
        type: 'choice', section: 'Tiết 1', img: imgB51Quads,
        q: '1. Cho hai hình tứ giác ABCD và ABEG (như hình vẽ). Tô màu vào hình tứ giác có diện tích bé hơn.',
        options: ['Hình tứ giác ABCD', 'Hình tứ giác ABEG'],
        answer: 1,
        hints: ['Hình tứ giác ABEG nằm hoàn toàn bên trong hình tứ giác ABCD.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB51Grid1,
        // 🟦 Ô vuông: ô của từng hình theo bai51_t1_q2_grid.svg.
        areaPlay: { cell: 30, origin: [14, 14], unit: 'ô vuông', map: ['AAA.........B..', 'AAA....A...BBB.', 'AAAAAAAA..BBBBB', '.AAAAAAA...BBB.', '.AAAAAAA...BBB.', '..A...A...BBBBB', '...........BBB.'],
          fill: [{ blank: 0, shape: 'A' }, { blank: 1, shape: 'B' }, { blank: 2, compare: ['A', 'B'], values: ['A', 'B', 'C'] }] },
        q: '2. a) Viết số thích hợp vào chỗ chấm.',
        blanks: [
          N('Hình A gồm ... ô vuông.', 31),
          N('Hình B gồm ... ô vuông.', 23),
          { label: 'b) Khoanh vào chữ đặt trước câu đúng.<br>A. Diện tích hình A lớn hơn.<br>B. Diện tích hình B lớn hơn.<br>C. Diện tích hình A bằng diện tích hình B.<br>Câu đúng là câu: ...', answer: 'A', validate: setValidate(['A']), tiles: LETTERS_ABC, tileOne: true },
        ],
        hints: ['Đếm số ô vuông theo từng hàng rồi cộng lại. Mỗi ô có đường chéo vẫn tính là 1 ô.', 'Hình nào gồm nhiều ô vuông hơn thì có diện tích lớn hơn.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB51MN,
        q: '3. Đ, S?',
        blanks: [
          { label: 'A. Diện tích hình M lớn hơn diện tích hình N.', answer: 'S', validate: dsValidate(false), tiles: ['Đ', 'S'], tileOne: true },
          { label: 'B. Diện tích hình M bằng diện tích hình N.', answer: 'Đ', validate: dsValidate(true), tiles: ['Đ', 'S'], tileOne: true },
          { label: 'C. Diện tích hình M bé hơn diện tích hình N.', answer: 'S', validate: dsValidate(false), tiles: ['Đ', 'S'], tileOne: true },
        ],
        hints: ['Hình M được cắt theo đường chéo thành hai mảnh, rồi ghép hai mảnh đó thành hình N.'],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB51Duck,
        // 🟦 Ô vuông: ô của chú vịt theo bai51_t1_q4_duck.svg.
        areaPlay: { cell: 48, origin: [16, 16], unit: 'ô vuông', names: { V: 'Chú vịt' }, map: ['...VV', '...V.', 'VVVV.', 'VVVV.'], fill: { choice: 'V', options: [10, 12, 11] } },
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nHình chú vịt gồm bao nhiêu ô vuông?',
        options: ['10 ô vuông', '12 ô vuông', '11 ô vuông'],
        answer: 2,
        hints: ['Đếm từng hàng từ trên xuống: 2 ô, 1 ô, 4 ô, 4 ô.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Hoàn thành bảng sau (theo mẫu).',
        headers: ['Đọc', 'Viết'],
        colWidths: ['72%', '28%'],
        rows: [
          { sample: true, cells: [wrapTxt('Ba mươi lăm xăng-ti-mét vuông'), '35 cm²'] },
          [wrapTxt('Ba nghìn không trăm linh tư xăng-ti-mét vuông'), cellArea(3004)],
          [cellWords('Tám nghìn bốn trăm linh bảy xăng-ti-mét vuông'), '8 407 cm²'],
          [cellWords('Chín nghìn không trăm năm mươi sáu xăng-ti-mét vuông'), '9 056 cm²'],
        ],
        hints: ['Viết số rồi viết kí hiệu cm² (có thể gõ cm2).', 'Đọc số rồi đọc tên đơn vị "xăng-ti-mét vuông".'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB51Grid2,
        // 🟦 Ô vuông 1 cm²: ô của từng hình theo bai51_t2_q2_grid.svg.
        areaPlay: { cell: 46, origin: [14, 14], map: ['A.A........B..', 'AAA....A..BBB.', 'AAAAAAAA.BBBBB', '.AAAAAAA..BBB.', '.AAAAAAA..BBB.', '..A...A..BBBBB', '..........BBB.'],
          fill: [{ blank: 0, shape: 'A' }, { blank: 1, shape: 'A' }, { blank: 2, shape: 'B' }, { blank: 3, shape: 'B' }] },
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          N('a) Hình A gồm ... ô vuông 1 cm².', 30),
          N('Diện tích hình A bằng ... cm².', 30),
          N('b) Hình B gồm ... ô vuông 1 cm².', 23),
          N('Diện tích hình B bằng ... cm².', 23),
        ],
        hints: ['Đếm số ô vuông theo từng hàng. Mỗi ô vuông cạnh 1 cm có diện tích 1 cm².'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `3. Tính (theo mẫu).\n${mau('23 cm² + 17 cm² = 40 cm²')} &nbsp;&nbsp;&nbsp; <span class="gw-sample-text">40 cm² : 8 = 5 cm²</span>`,
        blanks: [
          N('a) 537 cm² + 638 cm² = ... cm²', 1175),
          N('2 385 cm² – 917 cm² = ... cm²', 1468),
          N('b) 219 cm² × 4 = ... cm²', 876),
          N('525 cm² : 5 = ... cm²', 105),
        ],
        hints: ['Tính như với các số tự nhiên rồi viết thêm đơn vị cm².'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '4. Tờ giấy màu đỏ có diện tích là 950 cm². Tờ giấy màu vàng có diện tích là 670 cm². Hỏi diện tích tờ giấy màu vàng bé hơn diện tích tờ giấy màu đỏ là bao nhiêu xăng-ti-mét vuông?',
        blanks: [{ label: 'Diện tích tờ giấy vàng bé hơn: ... cm²', answer: '280' }],
        hints: ['Lấy diện tích tờ giấy đỏ trừ diện tích tờ giấy vàng.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB51Turtle,
        q: '5. Viết số thích hợp vào chỗ chấm.\nHai bạn kiến đen đang sơn lại một mặt bên của rô-bốt rùa (như hình vẽ). Các bạn sơn các ô xen kẽ hai màu xanh và trắng, mỗi ô có diện tích 1 cm².',
        blanks: [N('Vậy một mặt bên của rô-bốt rùa sẽ có ... cm² được sơn màu xanh và ... cm² được sơn màu trắng.', 10, 10)],
        hints: ['Mặt bên có 4 hàng, mỗi hàng 5 ô: tất cả 20 ô.', 'Sơn xen kẽ: mỗi hàng có ô xanh, ô trắng nối tiếp nhau. Đếm số ô xanh của từng hàng khi đã sơn xong.'],
      },
    ],
  },
];
