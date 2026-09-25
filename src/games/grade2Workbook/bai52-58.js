/**
 * Vở bài tập Toán 2 — Tập hai: Bài 52–58 (sách trang 51–69).
 * Bài 57 (Thực hành và trải nghiệm đo độ dài) chỉ gồm các bài đo/ước lượng đồ vật thật
 * nên không đưa vào app.
 */
import {
  blank, stripVN, listValidate, dsValidate, letterValidate, swapPairValidate, sampleCell, mau,
} from '../grade3Workbook.js';
import imgB53T2Q2 from '../../assets/grade2-workbook/bai53_t2_q2_points.svg';
import imgB54T1Q3 from '../../assets/grade2-workbook/bai54_t1_q3_igloo.png';
import imgB54T2Q5 from '../../assets/grade2-workbook/bai54_t2_q5_maze.png';
import imgB55Notebook from '../../assets/grade2-workbook/bai55_t1_q2_notebook.png';
import imgB55Table from '../../assets/grade2-workbook/bai55_t1_q2_table.png';
import imgB55Clip from '../../assets/grade2-workbook/bai55_t1_q2_clip.png';
import imgB55T2Q2 from '../../assets/grade2-workbook/bai55_t2_q2_track.svg';
import imgB55T3Q4 from '../../assets/grade2-workbook/bai55_t3_q4_thachsanh.png';
import imgB56Q1 from '../../assets/grade2-workbook/bai56_q1_notes.png';
import imgB56Note100 from '../../assets/grade2-workbook/bai56_q2_100.png';
import imgB56Note200 from '../../assets/grade2-workbook/bai56_q2_200.png';
import imgB56Note500 from '../../assets/grade2-workbook/bai56_q2_500.png';
import imgB56Q3 from '../../assets/grade2-workbook/bai56_q3_savings.png';
import imgB58T1Q2 from '../../assets/grade2-workbook/bai58_t1_q2_islands.png';
import imgB58T1Q3 from '../../assets/grade2-workbook/bai58_t1_q3_rulers.svg';
import imgB58T1Q4 from '../../assets/grade2-workbook/bai58_t1_q4_animals.png';
import imgB58T2Q3 from '../../assets/grade2-workbook/bai58_t2_q3_grid.svg';
import imgB58Truck57 from '../../assets/grade2-workbook/bai58_t2_q4_truck57.png';
import imgB58Truck41 from '../../assets/grade2-workbook/bai58_t2_q4_truck41.png';
import imgB58Truck25 from '../../assets/grade2-workbook/bai58_t2_q4_truck25.png';
import imgB58Box3 from '../../assets/grade2-workbook/bai58_t2_q4_box3.png';
import imgB58Box5 from '../../assets/grade2-workbook/bai58_t2_q4_box5.png';
import imgB58Box2 from '../../assets/grade2-workbook/bai58_t2_q4_box2.png';
import imgB58T2Q5 from '../../assets/grade2-workbook/bai58_t2_q5_plots.svg';

// "Viết số thành tổng các trăm, chục, đơn vị": 392 = 300 + 90 + 2. The terms may
// come in any order and with any spacing; a "+ 0" term (309 = 300 + 0 + 9) is
// tolerated, but every term must be the right place value.
function placeSumValidate(n) {
  const target = [Math.floor(n / 100) * 100, Math.floor((n % 100) / 10) * 10, n % 10]
    .filter(Boolean).map(String).sort().join('+');
  return (value) => {
    const terms = String(value).replace(/\s+/g, '').replace(/^=/, '').split('+');
    if (terms.some(t => !/^\d+$/.test(t))) return false;
    return terms.map(t => String(Number(t))).filter(t => t !== '0').sort().join('+') === target;
  };
}
const placeSum = (label, n) => {
  const parts = [Math.floor(n / 100) * 100, Math.floor((n % 100) / 10) * 10, n % 10].filter(Boolean);
  return { label, answer: parts.join(' + '), validate: placeSumValidate(n) };
};

// A multi-slot row of plain numbers (the engine joins the slots with ",").
const nums = (label, ...answers) => ({ label, answer: answers.join(','), validate: listValidate(answers.map(String)) });

// A list of numbers written on one dotted line ("158, 185, 518, ...", "100 và
// 600"): any order and any separators, but exactly these numbers. The answer
// text ends in "và ..." so the blank stays a free-typing field (the digit-only
// keypad has no comma).
function numSetValidate(list) {
  const target = list.map(String).sort().join('|');
  return (value) => (String(value).match(/\d+/g) || []).map(x => String(Number(x))).sort().join('|') === target;
}
const numSet = (label, list) => ({
  label,
  answer: list.length > 1 ? `${list.slice(0, -1).join(', ')} và ${list[list.length - 1]}` : String(list[0]),
  validate: numSetValidate(list),
});

// "Đ, S ?" in a small box after the statement.
const ds = (label, isTrue) => ({ label: `${label} ...`, boxes: true, answer: isTrue ? 'Đ' : 'S', validate: dsValidate(isTrue) });

// Bài 53 Tiết 1 Q3 — the bears: "gấu em", "em" or "Gấu em" are all fine, and in
// the b) list any separators ("em, mẹ, anh, bố", "Gấu em > gấu mẹ > ...").
const bearWords = (s) => stripVN(s).split(/[^a-z]+/).filter(w => w && w !== 'gau' && w !== 'va');
function bearOrderValidate(names) {
  const target = names.map(n => stripVN(n)).join('|');
  return (value) => bearWords(value).join('|') === target;
}

// A place name ("Nam Định", "tỉnh Nam Định", "nam dinh").
const placeNorm = (s) => stripVN(s).replace(/[^a-z]/g, '').replace(/^(tinh|thanhpho|tp)/, '');
function placeValidate(name) {
  const target = placeNorm(name);
  return (value) => placeNorm(value) === target;
}
// "... tỉnh gần Hà Nội hơn là ...... và gần hơn ...... km": place, then number.
function placeNumValidate(name, n) {
  const place = placeValidate(name);
  return (value) => {
    const parts = String(value).split(',');
    const num = parts.pop();
    return place(parts.join(' ')) && (String(num).match(/\d+/g) || []).join('') === String(n);
  };
}

// A letter answer that may be written with its noun ("B", "miếng đất B", "chữ N").
function letterWordValidate(letter, ...words) {
  const check = letterValidate(letter);
  return (value) => {
    let v = stripVN(value).trim();
    words.forEach(w => { v = v.replace(new RegExp(`^${w}\\s*`), ''); });
    return check(v);
  };
}

// Data tables printed above the questions (Bài 55 Tiết 2 Q3, Tiết 3 Q3).
const dataTable = (head, rows) => `<table class="gw-table" style="margin:8px 0">`
  + `<tr>${head.map(h => `<th>${h}</th>`).join('')}</tr>`
  + rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')
  + '</table>';
const BUILDINGS = dataTable(['Công trình kiến trúc', 'Chiều cao'], [
  ['Cột cờ Hà Nội', '33 m'], ['Tháp Rùa', '9 m'], ['Tháp chùa Thiên Mụ', '21 m'], ['Dinh Độc Lập', '26 m'],
]);
const ROADS = dataTable(['Đường bộ', 'Độ dài'], [
  ['Hà Nội – Thái Nguyên', '75 km'], ['Hà Nội – Nam Định', '110 km'],
  ['Hà Nội – Hải Dương', '60 km'], ['Hà Nội – Hải Phòng', '100 km'],
]);

// A money note drawn inside a choice button (Bài 56 Q2).
const note = (src) => `<img src="${src}" alt="tờ tiền" style="height:56px;vertical-align:middle;border-radius:3px">`;
// A number card printed as a blue tile in the book ("thẻ số 5").
const card = (n) => `<b style="display:inline-block;min-width:1.6em;padding:0 0.3em;border-radius:0.35em;background:#B8E5FC;color:#0c4a6e;text-align:center">${n}</b>`;

export const BAI_52_58 = [
  // ── BÀI 52 (trang 51–53) ──────────────────────────────────────────────────
  {
    id: 'bai-52', number: 52, title: 'Viết số thành tổng các trăm, chục, đơn vị',
    questions: [
      {
        type: 'match', section: 'Tiết 1',
        q: `1. Nối (theo mẫu).\n${mau('512 nối với 500 + 10 + 2')}`,
        left: [
          { id: 'n512', text: '512' }, { id: 'n128', text: '128' }, { id: 'n256', text: '256' },
          { id: 'n360', text: '360' }, { id: 'n306', text: '306' }, { id: 'n408', text: '408' },
        ],
        right: [
          { id: 'e128', text: '100 + 20 + 8' }, { id: 'e306', text: '300 + 6' }, { id: 'e256', text: '200 + 50 + 6' },
          { id: 'e408', text: '400 + 8' }, { id: 'e512', text: '500 + 10 + 2' }, { id: 'e360', text: '300 + 60' },
        ],
        pairs: [['n512', 'e512'], ['n128', 'e128'], ['n256', 'e256'], ['n360', 'e360'], ['n306', 'e306'], ['n408', 'e408']],
        hints: ['Tách số thành trăm, chục, đơn vị: 128 gồm 1 trăm, 2 chục và 8 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: `2. Viết số thành tổng các trăm, chục, đơn vị (theo mẫu).\n${mau('239 = 200 + 30 + 9')}`,
        blanks: [
          placeSum('a) 392 = ...', 392),
          placeSum('b) 309 = ...', 309),
          placeSum('c) 230 = ...', 230),
        ],
        hints: ['309 có 0 chục nên chỉ viết 300 + 9.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Viết số thích hợp vào chỗ chấm.\nThỏ và rùa cùng thu hoạch cà rốt. Hai bạn dùng những chiếc bao và giỏ để đựng cà rốt. Mỗi bao đựng 100 củ cà rốt. Mỗi giỏ đựng 10 củ cà rốt. Những củ cà rốt còn lại thỏ và rùa sẽ ăn luôn tại chỗ.',
        blanks: [
          { label: 'a) Hôm qua, để đựng số cà rốt thu hoạch được, thỏ và rùa đã dùng 1 bao và 4 giỏ, sau đó hai bạn đã ăn 2 củ cà rốt tại chỗ. Như vậy, hôm qua thỏ và rùa đã thu hoạch được ... củ cà rốt.', answer: '142' },
          nums('b) Hôm nay, hai bạn thu hoạch được 252 củ cà rốt. Vậy để đựng cà rốt, thỏ và rùa cần ... bao và ... giỏ. Hai bạn sẽ ăn ... củ cà rốt tại chỗ.', 2, 5, 2),
        ],
        hints: ['1 bao là 100 củ, 4 giỏ là 40 củ.', '252 gồm 2 trăm, 5 chục và 2 đơn vị.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        headers: ['Trăm', 'Chục', 'Đơn vị', 'Viết số', 'Đọc số'],
        rows: [
          [8, 2, 0, blank(820), 'tám trăm hai mươi'],
          [blank(6), blank(5), blank(1), 651, 'sáu trăm năm mươi mốt'],
          [7, 4, 4, blank(744), 'bảy trăm bốn mươi tư'],
          [blank(9), blank(0), blank(1), blank(901), 'chín trăm linh một'],
        ],
        hints: ['"Linh" nghĩa là hàng chục bằng 0: chín trăm linh một là 901.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: `2. Nối (theo mẫu).\n${mau('🎂 375 nối với 300 + 70 + 5')}`,
        left: [
          { id: 'c375', text: '🎂 375' }, { id: 'c307', text: '🎂 307' }, { id: 'c370', text: '🎂 370' }, { id: 'c357', text: '🎂 357' },
        ],
        right: [
          { id: 'p357', text: '300 + 50 + 7' }, { id: 'p370', text: '300 + 70' }, { id: 'p375', text: '300 + 70 + 5' }, { id: 'p307', text: '300 + 7' },
        ],
        pairs: [['c375', 'p375'], ['c307', 'p307'], ['c370', 'p370'], ['c357', 'p357']],
        hints: ['307 có 0 chục: 307 = 300 + 7.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Số?',
        blanks: [
          { label: 'a) 682 = 600 + ... + 2', answer: '80' },
          { label: 'b) 208 = 200 + ...', answer: '8' },
          { label: 'c) 820 = ... + 20', answer: '800' },
          { label: 'd) 381 = ... + 80 + 1', answer: '300' },
          { label: 'e) 610 = 600 + ...', answer: '10' },
          { label: 'g) 108 = 100 + ...', answer: '8' },
        ],
        hints: ['682 gồm 6 trăm, 8 chục và 2 đơn vị: 682 = 600 + 80 + 2.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết số thích hợp vào chỗ chấm.\nSóc dùng những chiếc bao và giỏ để đựng hạt dẻ mà mình nhặt được mỗi ngày như sau:\n• Mỗi bao đựng 100 hạt dẻ;\n• Mỗi giỏ đựng 10 hạt dẻ.\nTuần này, sóc nhặt được tất cả 3 bao, 8 giỏ và còn thừa 2 hạt dẻ bên ngoài.',
        blanks: [{ label: 'Như vậy, tuần này sóc nhặt được tất cả ... hạt dẻ.', answer: '382' }],
        hints: ['3 bao là 300 hạt, 8 giỏ là 80 hạt.'],
      },
    ],
  },

  // ── BÀI 53 (trang 54–56) ──────────────────────────────────────────────────
  {
    id: 'bai-53', number: 53, title: 'So sánh các số có ba chữ số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Đ, S?',
        blanks: [
          ds('a) 256 < 265', true),
          ds('b) 625 = 652', false),
          ds('c) 367 > 387', false),
          ds('d) 899 > 901', false),
          ds('e) 898 = 989', false),
          ds('g) 999 < 1 000', true),
        ],
        hints: ['So sánh hàng trăm trước, rồi đến hàng chục, cuối cùng là hàng đơn vị.'],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '2. >; <; = ?',
        rows: [
          { left: 'a) 335', right: '353', answer: '<' },
          { left: '510', right: '501', answer: '>' },
          { left: 'b) 148', right: '142', answer: '>' },
          { left: '794', right: '479', answer: '>' },
          { left: 'c) 354', right: '754', answer: '<' },
          { left: '1 000', right: '988', answer: '>' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp.\nDưới đây là số giờ ngủ đông trong một tháng của một gia đình gấu:\n• Gấu bố: 620 giờ &nbsp;&nbsp; • Gấu mẹ: 715 giờ\n• Gấu anh: 672 giờ &nbsp;&nbsp; • Gấu em: 726 giờ',
        blanks: [
          { label: 'a) Trong gia đình đó, gấu ... ngủ đông nhiều nhất, gấu ... ngủ đông ít nhất.', answer: 'em, bố', validate: bearOrderValidate(['em', 'bố']) },
          { label: 'b) Nêu tên các thành viên của gia đình đó theo thứ tự giờ ngủ đông trong tháng từ nhiều nhất đến ít nhất.<br>', answer: 'Gấu em, gấu mẹ, gấu anh, gấu bố', validate: bearOrderValidate(['em', 'mẹ', 'anh', 'bố']) },
        ],
        hints: ['So sánh bốn số 620, 715, 672, 726.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          numSet(`<span>Từ ba thẻ số ${card(5)}, ${card(1)} và ${card(8)}, ta có thể tạo được các số có ba chữ số là:</span> ...`, [158, 185, 518, 581, 815, 851]),
          nums('Trong các số vừa tạo được đó, số bé nhất là ... và số lớn nhất là ...', 158, 851),
        ],
        hints: ['Mỗi số dùng đủ cả ba thẻ 5, 1, 8. Có tất cả 6 số.', 'Chọn chữ số hàng trăm trước: 1..., 5..., 8...'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '1. >; <; = ?',
        rows: [
          { left: 'a) 620', right: '650', answer: '<' },
          { left: 'b) 483', right: '433', answer: '>' },
          { left: 'c) 582', right: '852', answer: '<' },
          { left: 'd) 714', right: '801', answer: '<' },
          { left: 'e) 1 000', right: '975', answer: '>' },
          { left: 'g) 670', right: '600 + 70', answer: '=' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB53T2Q2,
        q: '2. a) Nối 4 điểm trong hình dưới đây theo thứ tự các số từ lớn đến bé.\nb) Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          nums('a) Thứ tự nối các điểm: ... → ... → ... → ...', 735, 573, 537, 375),
          { label: 'b) Sau khi nối, em nhận được chữ cái ...', answer: 'N', validate: letterWordValidate('N', 'chu cai', 'chu') },
        ],
        hints: ['Số lớn nhất là 735 (điểm dưới bên trái).', 'Nối từ 735 lên 573, chéo xuống 537 rồi lên 375.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '3. Khoanh vào chữ cái đặt trước câu trả lời đúng.\nỞ vườn quốc gia có bốn chú khỉ là: khỉ mốc, khỉ đuôi vàng, khỉ mặt đỏ và khỉ đột. Trong ba tháng đầu năm, bốn chú đó đã ăn số quả chuối như sau:\n• Khỉ mốc: 360 quả; &nbsp;&nbsp; • Khỉ đuôi vàng: 365 quả;\n• Khỉ mặt đỏ: 356 quả; &nbsp;&nbsp; • Khỉ đột: 350 quả.\nTrong ba tháng đầu năm:',
        rows: [
          { left: 'a) Chú khỉ nào ăn nhiều quả chuối nhất?', options: ['A. Khỉ mốc', 'B. Khỉ đuôi vàng', 'C. Khỉ mặt đỏ', 'D. Khỉ đột'], answer: 'B' },
          { left: 'b) Chú khỉ nào ăn ít quả chuối nhất?', options: ['A. Khỉ mốc', 'B. Khỉ đuôi vàng', 'C. Khỉ mặt đỏ', 'D. Khỉ đột'], answer: 'D' },
        ],
        hints: ['Bốn số đều có 3 trăm. So sánh hàng chục, rồi hàng đơn vị.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '4. Ở một hiệu sách có bán ba loại sách như sau:\n• Sách Toán học có 428 trang;\n• Sách Ảo thuật có 1 000 trang;\n• Sách Khoa học có 482 trang.\nBa bạn Nam, Việt và Rô-bốt vào hiệu sách mua ba cuốn sách khác nhau. Biết Nam mua cuốn sách có nhiều trang nhất và Việt mua cuốn sách có nhiều trang hơn cuốn sách của Rô-bốt.\nNối tên mỗi bạn với cuốn sách đã mua.',
        left: [{ id: 'nam', text: 'Nam' }, { id: 'viet', text: 'Việt' }, { id: 'robot', text: 'Rô-bốt' }],
        right: [{ id: 'toan', text: 'Sách Toán học' }, { id: 'aothuat', text: 'Sách Ảo thuật' }, { id: 'khoahoc', text: 'Sách Khoa học' }],
        pairs: [['nam', 'aothuat'], ['viet', 'khoahoc'], ['robot', 'toan']],
        hints: ['Sách nhiều trang nhất là sách Ảo thuật (1 000 trang).', 'Còn lại 428 và 482 trang: sách nào nhiều trang hơn?'],
      },
    ],
  },

  // ── BÀI 54 (trang 57–59) ──────────────────────────────────────────────────
  {
    id: 'bai-54', number: 54, title: 'Luyện tập chung',
    questions: [
      {
        type: 'match', section: 'Tiết 1',
        q: '1. Nối cách đọc với cách viết số tương ứng.',
        left: [
          { id: 'r254', text: 'Hai trăm năm mươi tư' },
          { id: 'r245', text: 'Hai trăm bốn mươi lăm' },
          { id: 'r214', text: 'Hai trăm mười bốn' },
        ],
        right: [{ id: 'w245', text: '🌸 245' }, { id: 'w214', text: '🌸 214' }, { id: 'w254', text: '🌸 254' }],
        pairs: [['r254', 'w254'], ['r245', 'w245'], ['r214', 'w214']],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Số ... là số liền trước của số 1 000.', answer: '999' },
          { label: 'b) Số ... là số liền sau của số 500.', answer: '501' },
          { label: 'c) Số ... là số liền trước của số 500.', answer: '499' },
        ],
        hints: ['Số liền trước bé hơn 1 đơn vị, số liền sau lớn hơn 1 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB54T1Q3,
        q: '3. Các tảng băng được ghi số và xếp thành hình một bức tường như hình vẽ.\na) Em hãy tô màu xanh cho các tảng băng ghi số bé hơn 435, màu đỏ cho các tảng băng ghi số lớn hơn 435.\nb) Số?',
        blanks: [
          { label: '• Có ... tảng băng màu đỏ.', answer: '12' },
          { label: '• Có ... tảng băng màu xanh.', answer: '14' },
        ],
        hints: ['Chỉ tô các tảng băng có ghi số. Màu đỏ là số lớn hơn 435, ví dụ 689, 808.', 'Đếm cẩn thận từng hàng, có tất cả 26 tảng băng ghi số.'],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '4. >; <; = ?',
        rows: [
          { left: '267', right: '276', answer: '<' },
          { left: '354', right: '350', answer: '>' },
          { left: '920', right: '900 + 20', answer: '=' },
          { left: '601', right: '599', answer: '>' },
          { left: '465', right: '564', answer: '<' },
          { left: '806', right: '800 + 60', answer: '<' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: `5. Viết tiếp vào chỗ chấm cho thích hợp.\nCho 6 tấm thẻ ghi số như sau:\n${[160, 610, 216, 100, 600, 450].map(card).join(' &nbsp; ')}`,
        blanks: [
          { label: 'a) Việt lấy tất cả các thẻ có số tròn trăm. Vậy Việt lấy được ... tấm thẻ,', answer: '2' },
          numSet('đó là những tấm thẻ ghi các số ...', [100, 600]),
          { label: 'b) Sau đó, Nam lấy tất cả các tấm thẻ ghi số tròn chục. Vậy Nam lấy được ... tấm thẻ,', answer: '3' },
          numSet('đó là những tấm thẻ ghi các số ...', [160, 610, 450]),
          { label: 'c) Sau khi Việt và Nam lấy thẻ thì còn lại ... tấm thẻ,', answer: '1' },
          { label: 'đó là tấm thẻ ghi số ...', answer: '216' },
        ],
        hints: ['Số tròn trăm có hai chữ số tận cùng là 00. Số tròn chục có chữ số tận cùng là 0.', 'Việt đã lấy các số tròn trăm trước, Nam chỉ lấy những thẻ còn lại.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Viết mỗi số thành tổng các trăm, chục và đơn vị.',
        blanks: [
          placeSum('638 = ...', 638),
          placeSum('360 = ...', 360),
          placeSum('580 = ...', 580),
          placeSum('406 = ...', 406),
        ],
        hints: ['638 gồm 6 trăm, 3 chục và 8 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Đ, S?',
        blanks: [
          ds('a) 492 > 429', true),
          ds('b) 615 = 651', false),
          ds('c) 375 > 426', false),
          ds('d) 298 < 298', false),
          ds('e) 350 = 530', false),
          ds('g) 650 = 600 + 50', true),
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `3. Viết tiếp vào chỗ chấm cho thích hợp.\nNam có thể xếp những thẻ ghi chữ số nào vào vị trí dấu “?” để nhận được phép so sánh đúng?\n${[5, 6, 7, '&lt;', '?', 5, 4].map(card).join(' ')}`,
        blanks: [numSet('Trả lời: Nam có thể xếp các thẻ ghi chữ số: ...', [6, 7, 8, 9])],
        hints: ['Cần số ?54 lớn hơn 567. Thử ? = 5: 554 < 567 nên chưa được.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Số tròn chục bé nhất có ba chữ số khác nhau là ...', answer: '120' },
          { label: 'b) Số tròn chục lớn nhất có ba chữ số khác nhau là ...', answer: '980' },
          { label: 'c) Số tròn chục bé nhất có ba chữ số là ...', answer: '100' },
          { label: 'd) Số tròn chục lớn nhất có ba chữ số là ...', answer: '990' },
        ],
        hints: ['Số tròn chục có chữ số hàng đơn vị là 0.', '"Ba chữ số khác nhau": 100 và 110 có chữ số lặp lại nên không được.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB54T2Q5,
        q: '5. Khoanh vào đồ vật thích hợp.\nMèo sẽ lấy được đồ vật nào nếu đi theo số bé hơn tại mỗi ngã rẽ?',
        options: ['Bình sữa và bát sữa', 'Cột cào móng', 'Khay cát', 'Chuột đồ chơi', 'Cuộn len', 'Vòng cổ', 'Xương cá', 'Hộp thịt'],
        answer: 6,
        hints: ['Ngã rẽ đầu tiên: 132 và 123, mèo đi theo đường 123.'],
      },
    ],
  },

  // ── BÀI 55 (trang 60–63) ──────────────────────────────────────────────────
  {
    id: 'bai-55', number: 55, title: 'Đề-xi-mét. Mét. Ki-lô-mét',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) 2 dm = ... cm', answer: '20' },
          { label: '3 m = ... dm', answer: '30' },
          { label: '7 m = ... cm', answer: '700' },
          { label: '4 dm = ... cm', answer: '40' },
          { label: '6 m = ... dm', answer: '60' },
          { label: '9 m = ... cm', answer: '900' },
          { label: 'b) 20 dm = ... m', answer: '2' },
          { label: '30 cm = ... dm', answer: '3' },
          { label: '50 dm = ... m', answer: '5' },
          { label: '80 cm = ... dm', answer: '8' },
          { label: '100 dm = ... m', answer: '10' },
          { label: '40 cm = ... dm', answer: '4' },
        ],
        hints: ['1 dm = 10 cm; 1 m = 10 dm; 1 m = 100 cm.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Nối đồ vật với số đo độ dài thích hợp trong thực tế.',
        left: [
          { id: 'vo', img: imgB55Notebook, text: 'Quyển vở' },
          { id: 'ban', img: imgB55Table, text: 'Cái bàn' },
          { id: 'kep', img: imgB55Clip, text: 'Cái kẹp giấy' },
        ],
        right: [{ id: 'm2', text: '2 m' }, { id: 'cm2', text: '2 cm' }, { id: 'dm2', text: '2 dm' }],
        pairs: [['vo', 'dm2'], ['ban', 'm2'], ['kep', 'cm2']],
        hints: ['2 cm rất ngắn, bằng khoảng một đốt ngón tay. 2 m dài hơn cả chiều cao của bố.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Viết số thích hợp vào chỗ chấm.\nBiết 1 sải tay của Việt dài khoảng 1 m. Việt đo chiều dài bảng lớp được 3 sải tay. Vậy:',
        blanks: [
          { label: 'a) Bảng lớp Việt dài khoảng ... m.', answer: '3' },
          { label: 'b) Bảng lớp Việt dài khoảng ... dm.', answer: '30' },
          { label: 'c) Bảng lớp Việt dài khoảng ... cm.', answer: '300' },
        ],
        hints: ['3 sải tay là khoảng 3 m. 1 m = 10 dm = 100 cm.'],
      },
      {
        type: 'choice', section: 'Tiết 1',
        q: '4. Em hãy đánh dấu × vào ô trống trước câu miêu tả đồ vật dài nhất.\nBiết 1 gang tay của Mai dài khoảng 1 dm.',
        options: ['Hộp bánh dài khoảng 4 gang tay của Mai.', 'Thước kẻ dài 30 cm.', 'Bàn gấp học sinh dài khoảng 5 dm.'],
        answer: 2,
        hints: ['Đổi cùng một đơn vị: 4 gang tay khoảng 4 dm, 30 cm = 3 dm.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: '5 m + 9 m = ... m', answer: '14' },
          { label: '15 m + 35 m = ... m', answer: '50' },
          { label: '43 dm + 15 dm = ... dm', answer: '58' },
          { label: '40 dm − 12 dm = ... dm', answer: '28' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB55T2Q2, wordProblem: true, subQuestions: false,
        q: '2. Số?\nViệt và Mai chạy tiếp sức. Việt chạy đoạn đường dài 60 m từ vạch xuất phát đến vị trí của Mai. Mai chạy đoạn đường còn lại về đích dài 40 m. Hỏi đoạn đường chạy tiếp sức dài bao nhiêu mét?',
        blanks: [
          { label: 'Bài giải<br>Đoạn đường chạy tiếp sức dài số mét là:<br>... + ... = ... (m)', answer: '60,40,100', validate: swapPairValidate(60, 40, 100) },
          { label: 'Đáp số: ... m.', answer: '100' },
        ],
        hints: ['Cộng hai đoạn đường của Việt và Mai.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: `3. Chiều cao của một số công trình kiến trúc như sau:${BUILDINGS}a) Khoanh vào chữ đặt trước câu trả lời đúng.\nTrong các công trình kiến trúc đã cho:`,
        rows: [
          { left: '• Công trình cao nhất là:', options: ['A. Cột cờ Hà Nội', 'B. Tháp Rùa', 'C. Tháp chùa Thiên Mụ', 'D. Dinh Độc Lập'], answer: 'A' },
          { left: '• Công trình thấp nhất là:', options: ['A. Cột cờ Hà Nội', 'B. Tháp Rùa', 'C. Tháp chùa Thiên Mụ', 'D. Dinh Độc Lập'], answer: 'B' },
        ],
        hints: ['So sánh bốn số 33, 9, 21, 26.'],
      },
      {
        type: 'choice', section: 'Tiết 2', multi: true,
        q: `3. (Chiều cao của một số công trình kiến trúc)${BUILDINGS}b) Đánh dấu × vào ô trống trước những công trình kiến trúc cao hơn 25 m.`,
        options: ['Cột cờ Hà Nội', 'Tháp Rùa', 'Tháp chùa Thiên Mụ', 'Dinh Độc Lập'],
        answer: [0, 3],
        hints: ['Chọn các công trình có số mét lớn hơn 25.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `3. (Chiều cao của một số công trình kiến trúc)${BUILDINGS}c) Số?`,
        blanks: [{ label: 'Cột cờ Hà Nội cao hơn Tháp Rùa ... m.', answer: '24' }],
        hints: ['Lấy chiều cao cột cờ trừ chiều cao Tháp Rùa.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Số?\nBiết chiều cao cột cờ của trường Rô-bốt học lớn hơn 10 m nhưng bé hơn 15 m và chiều cao đó là kết quả của một trong ba phép trừ sau:\n23 m − 13 m; &nbsp; 30 m − 14 m; &nbsp; 27 m − 15 m.',
        blanks: [{ label: 'Vậy chiều cao của cột cờ đó là ... m.', answer: '12' }],
        hints: ['Tính cả ba phép trừ, rồi chọn kết quả lớn hơn 10 và bé hơn 15.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: '1 km = ... m', answer: '1000' },
          { label: '... m = 1 km', answer: '1000' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: '6 km + 9 km = ... km', answer: '15' },
          { label: '25 km + 35 km = ... km', answer: '60' },
          { label: '21 km − 10 km = ... km', answer: '11' },
          { label: '42 km − 27 km = ... km', answer: '15' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: `3. Viết tiếp vào chỗ chấm cho thích hợp.\nĐộ dài đường bộ từ Hà Nội đi đến một số tỉnh thành như sau:${ROADS}`,
        blanks: [
          { label: 'a) Tỉnh thành xa Hà Nội nhất là ...', answer: 'Nam Định', validate: placeValidate('Nam Định') },
          { label: 'b) Tỉnh thành gần Hà Nội nhất là ...', answer: 'Hải Dương', validate: placeValidate('Hải Dương') },
          { label: 'c) Tỉnh thành xa Hà Nội hơn 100 km là ...', answer: 'Nam Định', validate: placeValidate('Nam Định') },
          { label: 'd) Trong hai tỉnh Thái Nguyên và Hải Dương, tỉnh gần Hà Nội hơn là ... và gần hơn ... km.', answer: 'Hải Dương, 15', validate: placeNumValidate('Hải Dương', 15) },
        ],
        hints: ['Đường càng dài thì tỉnh càng xa Hà Nội.', 'd) 75 km − 60 km = ?'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB55T3Q4,
        q: '4. Viết số thích hợp vào chỗ chấm.\nĐể cứu công chúa bị giữ trong hang đại bàng, Thạch Sanh cần đi qua một khu rừng, một dãy núi sau đó phải leo qua vách đá (như hình vẽ).\nTính từ vị trí đang đứng:',
        blanks: [
          { label: 'a) Để đi qua dãy núi, Thạch Sanh cần đi ... km.', answer: '35' },
          { label: 'b) Để đi đến hang cứu công chúa, Thạch Sanh cần đi ... km.', answer: '38' },
        ],
        hints: ['Đi qua khu rừng 20 km rồi qua dãy núi 15 km.', 'Muốn đến hang còn phải leo thêm 3 km vách đá.'],
      },
    ],
  },

  // ── BÀI 56 (trang 64) ─────────────────────────────────────────────────────
  {
    id: 'bai-56', number: 56, title: 'Giới thiệu tiền Việt Nam',
    questions: [
      {
        type: 'table', img: imgB56Q1,
        q: '1. Số?\n(Đếm số tờ tiền trong mỗi tập.)',
        headers: ['Tập 1', 'Tập 2', 'Tập 3', 'Tập 4'],
        rows: [[sampleCell(7), blank(5), blank(2), blank(4)]],
        hints: ['Đếm cả những tờ chỉ lộ ra một phần phía trên.'],
      },
      {
        type: 'choice',
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.\nMẹ đi chợ mua hành hết 500 đồng. Hỏi mẹ chọn một đồng tiền nào sau đây để trả người bán hàng?',
        options: [note(imgB56Note100), note(imgB56Note200), note(imgB56Note500)],
        answer: 2,
        hints: ['Tìm tờ tiền có ghi số 500.'],
      },
      {
        type: 'fill', img: imgB56Q3,
        q: '3. Đ, S?\nMai và Mi tiết kiệm được số tiền như sau:',
        blanks: [
          ds('a) Mai có nhiều tờ 200 đồng hơn Mi.', true),
          ds('b) Mai có ít tờ 100 đồng hơn Mi.', false),
          ds('c) Mi có nhiều tờ 500 đồng hơn Mai.', true),
          ds('d) Mai và Mi có số tờ tiền bằng nhau.', false),
        ],
        hints: ['Đếm từng loại tờ tiền của mỗi bạn: Mai có 3 tờ 200 đồng.'],
      },
    ],
  },

  // ── BÀI 58 (trang 66–69) ──────────────────────────────────────────────────
  {
    id: 'bai-58', number: 58, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) 5 dm = ... cm', answer: '50' },
          { label: '4 m = ... dm', answer: '40' },
          { label: '4 dm = ... cm', answer: '40' },
          { label: '2 m = ... cm', answer: '200' },
          { label: '7 m = ... dm', answer: '70' },
          { label: '9 m = ... cm', answer: '900' },
          { label: 'b) 100 cm = 1 m &nbsp;&nbsp;&nbsp; 10 dm = 1 m<br>800 cm = ... m', answer: '8' },
          { label: '30 dm = ... m', answer: '3' },
          { label: '400 cm = ... m', answer: '4' },
          { label: '60 dm = ... m', answer: '6' },
        ],
        hints: ['1 dm = 10 cm; 1 m = 10 dm = 100 cm.'],
      },
      {
        type: 'compare', section: 'Tiết 1', img: imgB58T1Q2,
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.\nCó 3 hòn đảo V, N, I ở vị trí như hình vẽ. Một cây cầu dài 12 km nối đảo V với đảo N và một cây cầu dài 8 km nối đảo N với đảo I.',
        rows: [
          { left: 'a) Đi theo các cây cầu từ đảo N đến đảo nào gần hơn?', options: ['A. Đảo V', 'B. Đảo I'], answer: 'B' },
          { left: 'b) Đi qua các cây cầu từ đảo V đến đảo I hết bao nhiêu ki-lô-mét?', options: ['A. 8 km', 'B. 20 km', 'C. 12 km'], answer: 'B' },
        ],
        hints: ['Từ đảo V đến đảo I phải đi qua cả hai cây cầu.'],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB58T1Q3,
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.\nChiếc thước 1 m bị gãy mất một đoạn. Hỏi trong hai đoạn A và B, đâu là đoạn bị gãy khỏi chiếc thước?',
        options: ['Đoạn A', 'Đoạn B'],
        answer: 1,
        hints: ['Chiếc thước còn lại đã có vạch số 8. Đoạn bị gãy phải bắt đầu sau vạch số 8.'],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB58T1Q4,
        q: '4. a) Khoanh vào chữ đặt trước con vật dài nhất.',
        options: ['Con vật A', 'Con vật B', 'Con vật C'],
        answer: 0,
        hints: ['So sánh 32 m, 26 m và 16 m.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB58T1Q4,
        q: '4. b) Viết số thích hợp vào chỗ chấm.',
        blanks: [{ label: 'Trong các con vật ở câu a, con vật B dài hơn con vật C là ... m.', answer: '10' }],
        hints: ['Con vật B dài 26 m, con vật C dài 16 m.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. a) Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: '9 dm = ... cm', answer: '90' },
          { label: '2 m = ... dm', answer: '20' },
          { label: '7 m = ... cm', answer: '700' },
          { label: '500 cm = ... m', answer: '5' },
          { label: '80 dm = ... m', answer: '8' },
        ],
        hints: ['1 dm = 10 cm; 1 m = 10 dm = 100 cm.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '1. b) >; <; = ?',
        rows: [
          { left: '1 km', right: '980 m', answer: '>' },
          { left: '1 km', right: '1 000 m', answer: '=' },
        ],
        hints: ['1 km = 1 000 m.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: '29 dm + 37 dm = ... dm', answer: '66' },
          { label: '85 dm + 5 dm = ... dm', answer: '90' },
          { label: '54 m − 19 m = ... m', answer: '35' },
          { label: '90 m − 10 m = ... m', answer: '80' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB58T2Q3,
        q: '3. Đ, S?\nHai con chim sẻ đang bay có thể nhìn thấy nhau nếu chúng cách nhau không quá 2 km. Có 6 con chim sẻ đang ở các vị trí A, B, C, D, E, G như hình vẽ.',
        blanks: [
          ds('a) Con chim C có thể nhìn thấy con chim E.', false),
          ds('b) Con chim E không nhìn thấy con chim nào khác.', false),
          ds('c) Con chim A có thể nhìn thấy 3 con chim khác.', false),
          ds('d) Khoảng cách từ con chim C đến hai con chim A và B bằng nhau.', true),
        ],
        hints: ['Mỗi cạnh ô vuông dài 1 km. Đếm số cạnh ô vuông giữa hai con chim.', 'Chim E cách chim G 2 km.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '4. Nối mỗi thùng hàng với xe tải thích hợp.',
        left: [
          { id: 'b3', img: imgB58Box3, text: 'Thùng hàng 3 m' },
          { id: 'b5', img: imgB58Box5, text: 'Thùng hàng 5 m' },
          { id: 'b2', img: imgB58Box2, text: 'Thùng hàng 2 m' },
        ],
        right: [
          { id: 't57', img: imgB58Truck57, text: 'Xe tải 57 dm' },
          { id: 't41', img: imgB58Truck41, text: 'Xe tải 41 dm' },
          { id: 't25', img: imgB58Truck25, text: 'Xe tải 25 dm' },
        ],
        pairs: [['b3', 't41'], ['b5', 't57'], ['b2', 't25']],
        hints: ['Đổi ra đề-xi-mét: 3 m = 30 dm, 5 m = 50 dm, 2 m = 20 dm.', 'Thùng hàng phải ngắn hơn thùng xe, nhưng không quá ngắn.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB58T2Q5,
        q: '5. Viết tiếp vào chỗ chấm cho thích hợp.\nCó hai miếng đất A và B như hình vẽ.\nBiết rằng miếng đất của bác Nam có dạng hình tứ giác.',
        blanks: [
          { label: 'a) Miếng đất ... là của bác Nam.', answer: 'B', validate: letterWordValidate('B', 'mieng dat') },
          { label: 'b) Bác Nam muốn rào xung quanh miếng đất của mình nhưng không rào ở mặt cạnh sông. Vậy bác Nam cần dùng ... m hàng rào.', answer: '80' },
        ],
        hints: ['Hình tứ giác có 4 cạnh. Miếng đất A có 5 cạnh.', 'Cộng ba cạnh không giáp sông: 30 m, 20 m và 30 m.'],
      },
    ],
  },
];
