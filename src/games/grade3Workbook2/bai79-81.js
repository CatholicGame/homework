// Vở bài tập Toán 3 — Tập hai: Bài 79–81 (sách trang 119–127).
// Ôn tập hình học và đo lường; ôn tập bảng số liệu, khả năng xảy ra của một sự kiện; ôn tập chung.
import {
  blank, foldVN, stripVN, phraseValidate, nameSetValidate, dsValidate, exprValidate,
} from '../grade3Workbook.js';
import imgB79Square from '../../assets/grade3-workbook-2/bai79_t1_q1_square.svg';
import imgB79Triangle from '../../assets/grade3-workbook-2/bai79_t1_q2_triangle.svg';
import imgB79Shape from '../../assets/grade3-workbook-2/bai79_t1_q4_shape.svg';
import imgB79Clocks from '../../assets/grade3-workbook-2/bai79_t2_q3_clocks.svg';
import imgB81Scales from '../../assets/grade3-workbook-2/bai81_t2_q1_scales.svg';
import imgB81Clock from '../../assets/grade3-workbook-2/bai81_t2_q2_clock.svg';

// ── Local helpers ────────────────────────────────────────────────────────────

// A number the book prints with a thin space from 1 000 up ("21 674"): accepted
// with or without the space, or with a dot ("21.674").
const numKey = (v) => String(v).trim().replace(/[\s.]/g, '');
const numVal = (n) => (v) => numKey(v) === String(n);

// A blank row; 2+ answers = one per "..." compared in order. Numbers of 1 000
// and more also accept "1 000" / "1.000".
function B(label, ...answers) {
  const ans = answers.map(String);
  return {
    label,
    answer: ans.join(','),
    validate: (v) => {
      const got = String(v).split(',');
      return got.length === ans.length && got.every((g, i) => numKey(g) === ans[i]);
    },
  };
}

// Several numbers written in one blank in a given order ("23 514, 25 143, …").
const numListVal = (arr) => (v) => {
  const got = String(v).split(/[,;]+/).map(numKey).filter(Boolean);
  return got.length === arr.length && got.every((g, i) => g === String(arr[i]));
};

// Point names typed with or without separators, "và" or the words "điểm"/"góc"…
const letters = (s) => stripVN(s).toUpperCase().replace(/\b(DIEM|GOC|DINH|CANH|DOAN|THANG|VA|LA|POINTS?|ANGLES?|VERTEX|VERTICES|SIDES?|SEGMENTS?|LINES?|STRAIGHT|AND|IS|ARE|THE)\b/g, ' '); // tiếng Anh: "angle AMO", "points A, M, B"

// Bài 79 Tiết 1 Q1a: the 4 triples of collinear points, one per side of the
// square ("A, M, B; B, N, C; …" or "AMB, BNC, …"); any order of triples and of
// the letters inside a triple.
function triplesVal(triples) {
  const key = (s) => s.split('').sort().join('');
  const target = triples.map(key).sort().join('|');
  return (v) => {
    const ls = letters(v).replace(/[^A-Z]/g, '');
    if (ls.length !== triples.length * 3) return false;
    const got = [];
    for (let i = 0; i < ls.length; i += 3) got.push(key(ls.slice(i, i + 3)));
    return got.sort().join('|') === target;
  };
}

// Several segments in the blanks of one row, any order, letters any order.
function segmentsVal(segs) {
  const key = (s) => s.replace(/[^A-Z]/g, '').split('').sort().join('');
  const target = segs.map(key).sort().join('|');
  return (v) => String(v).split(',').map(s => key(letters(s))).sort().join('|') === target;
}

// Right angles sharing a vertex (Bài 79 Tiết 1 Q1c). An angle may be written by
// its three letters ("AMO", "góc AMO") or by its two sides ("MA, MO"); angles are
// separated by ";", "," or "và". Each angle is identified by its two non-vertex
// letters, and the set of angles must match exactly.
function anglesVal(vertex, pairs) {
  const target = pairs.map(p => p.split('').sort().join('')).sort().join('|');
  return (v) => {
    const tokens = letters(v).split(/[,;]|\s{2,}|\s(?=[A-Z]{2,})/).map(t => t.replace(/[^A-Z]/g, '')).filter(Boolean);
    const keys = [];
    let rays = [];
    for (const tk of tokens) {
      if (tk === vertex) continue;
      if (tk.length === 3) { keys.push(tk.replace(vertex, '').split('').sort().join('')); continue; }
      if (tk.length === 2 && tk.includes(vertex)) {
        rays.push(tk.replace(vertex, ''));
        if (rays.length === 2) { keys.push(rays.sort().join('')); rays = []; }
        continue;
      }
      return false;
    }
    if (rays.length) return false;
    return [...new Set(keys)].length === keys.length && keys.sort().join('|') === target;
  };
}

// "... giờ ... phút" read off a clock: the hour may be told the afternoon way too
// (3 giờ or 15 giờ).
function clockVal(h, m) {
  return (v) => {
    const [hh, mm] = String(v).split(',').map(s => parseInt(s, 10));
    return (hh === h || hh === h + 12) && mm === m;
  };
}

// Reading of a number up to 99 999 in words ("hai mươi mốt nghìn sáu trăm bảy
// mươi tư").
const ONES = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
function read2(n) {
  const t = Math.floor(n / 10), u = n % 10;
  if (t === 0) return ONES[u];
  const tens = t === 1 ? 'mười' : `${ONES[t]} mươi`;
  if (u === 0) return tens;
  if (u === 1 && t > 1) return `${tens} mốt`;
  if (u === 5) return `${tens} lăm`;
  if (u === 4 && t > 1) return `${tens} tư`;
  return `${tens} ${ONES[u]}`;
}
function read3(n, full) {
  const h = Math.floor(n / 100), r = n % 100;
  if (!full && h === 0) return read2(r);
  const head = `${ONES[h]} trăm`;
  if (r === 0) return head;
  if (r < 10) return `${head} linh ${ONES[r]}`;
  return `${head} ${read2(r)}`;
}
function readNum(n) {
  const th = Math.floor(n / 1000), r = n % 1000;
  if (!th) return read3(r, false);
  return r === 0 ? `${read3(th, false)} nghìn` : `${read3(th, false)} nghìn ${read3(r, true)}`;
}
// Accepts the usual variants: mốt/một, lăm/năm, linh/lẻ, tư/bốn, nghìn/ngàn.
const readKey = (s) => foldVN(s).replace(/ngàn/g, 'nghìn').replace(/mươi tư/g, 'mươi bốn');
const readVal = (n) => (v) => readKey(v) === readKey(readNum(n));
const readRow = (digits) => {
  const n = Number(digits.join(''));
  return [...digits.map(d => (d === null ? '' : d)), blank(String(n), { validate: numVal(n) }), blank(readNum(n), { validate: readVal(n) })];
};

// A number answer where the unit may be typed too ("27", "27 học sinh").
const leadNumVal = (n) => (v) => {
  const m = String(v).trim().match(/^(\d[\d\s.]*)(\D*)$/);
  return !!m && numKey(m[1]) === String(n);
};

// Bài 80 Q4: Việt gets 3 of the 4 marbles, either 1 đỏ + 2 vàng or 2 đỏ + 1 vàng.
// Each half of the row lists one outcome (colours in either order), and the two
// halves must be the two different outcomes.
function marblesVal() {
  const color = (s) => stripVN(s).replace(/\bmau\b/g, '').replace(/[^a-z]/g, '');
  const half = (a) => {
    const items = [[parseInt(a[0], 10), color(a[1])], [parseInt(a[2], 10), color(a[3])]]
      .sort((x, y) => x[1].localeCompare(y[1]));
    return items.map(([n, c]) => `${n}${c}`).join('+');
  };
  const outcomes = ['1do+2vang', '2do+1vang'];
  return (v) => {
    const p = String(v).split(',').map(s => s.trim());
    if (p.length !== 8) return false;
    return [half(p.slice(0, 4)), half(p.slice(4))].sort().join('|') === outcomes.join('|');
  };
}

const L = '<i>l</i>';
const SUBJECTS = ['Nhảy bao bố', 'Bịt mắt đập niêu', 'Tìm kẹo trong đĩa bột'];
const subjectVal = (s) => {
  const check = phraseValidate(s);
  return (v) => check(String(v).trim().replace(/^m[oô]n( thi)?\s+/i, ''));
};
const FRIENDS = ['Rô-bốt', 'Việt', 'Nam', 'Mai'];
const NUMS_81 = ['32 541', '23 514', '32 415', '25 143'];
const RED_TXT = (s) => `<span style="color:#e11d48;font-weight:700">${s}</span>`;
const BLUE_TXT = (s) => `<span style="color:#0284c7;font-weight:700">${s}</span>`;

export const BAI_79_81 = [
  // ── BÀI 79 (trang 119–121) ────────────────────────────────────────────────
  {
    id: 'bai-79', number: 79, title: 'Ôn tập hình học và đo lường',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB79Square,
        q: '1. Viết tiếp vào chỗ chấm cho thích hợp.\nCho hình vuông ABCD, hình tròn tâm O (như hình bên).',
        blanks: [
          {
            label: 'a) Ba điểm thẳng hàng trên mỗi cạnh của hình vuông là: ...',
            answer: 'A, M, B; B, N, C; D, P, C; A, Q, D',
            validate: triplesVal(['AMB', 'BNC', 'DPC', 'AQD']),
          },
          {
            label: 'b) O là trung điểm của đoạn thẳng ... và đoạn thẳng ...',
            answer: 'MP, QN',
            validate: segmentsVal(['MP', 'QN']),
          },
          {
            label: 'c) Dùng ê ke kiểm tra rồi trả lời.<br>– Các góc vuông chung đỉnh M là: ...',
            answer: 'AMO, BMO',
            validate: anglesVal('M', ['AO', 'BO']),
          },
          {
            label: '– Các góc vuông chung đỉnh O là: ...',
            answer: 'MOQ, MON, NOP, POQ',
            validate: anglesVal('O', ['MQ', 'MN', 'NP', 'PQ']),
          },
        ],
        hints: [
          'Mỗi cạnh của hình vuông có 3 điểm: hai đỉnh và trung điểm ở giữa, ví dụ A, M, B.',
          'Viết tên góc bằng 3 chữ cái, chữ của đỉnh ở giữa, ví dụ: góc AMO. Các góc cách nhau bằng dấu phẩy.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB79Triangle,
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          B('a) Chu vi hình tam giác MBN là ... cm.', 15),
          B('b) Chu vi hình tứ giác AMNC là ... cm.', 18),
          B('c) Tổng chu vi của hình tứ giác AMNC và hình tam giác MBN hơn chu vi hình tam giác ABC là ... cm.', 10),
        ],
        hints: [
          'Chu vi một hình bằng tổng độ dài các cạnh của hình đó.',
          'Cạnh AB dài 2 cm + 6 cm, cạnh CB dài 4 cm + 4 cm.',
        ],
        // toạ độ theo bai79_t1_q2_triangle.svg
        perimPlay: [
          { label: 'MBN', path: 'MBN', lens: [6, 4, 5], points: { M: [232.5, 95], B: [360, 290], N: [200, 290] }, fill: 0 },
          { label: 'AMNC', path: 'AMNC', lens: [2, 5, 4, 7], points: { A: [190, 30], M: [232.5, 95], N: [200, 290], C: [40, 290] }, fill: 1 },
          { label: 'ABC', path: 'ABC', lens: [8, 8, 7], texts: ['2 + 6 = 8 cm', '4 + 4 = 8 cm', '7 cm'], points: { A: [190, 30], B: [360, 290], C: [40, 290] } },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '3. Một mảnh đất hình chữ nhật có chiều dài 12 m, chiều dài hơn chiều rộng 4 m. Tính chu vi mảnh đất đó.',
        blanks: [{ label: 'Chu vi mảnh đất (m)', answer: '40' }],
        hints: ['Tìm chiều rộng trước: 12 − 4. Chu vi hình chữ nhật = (dài + rộng) × 2.'],
        perimPlay: { rect: [12, 8], unit: 'm', name: 'mảnh đất', look: 'garden', texts: ['12 m', '12 − 4 = 8 m', '12 m', '12 − 4 = 8 m'], fill: 0 },
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB79Shape,
        q: '4. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          B('a) Diện tích miếng bìa hình A là ... cm².', 40),
          B('b) Chu vi miếng bìa hình A là ... cm.', 36),
        ],
        hints: [
          'Mỗi ô vuông nhỏ có diện tích 1 cm². Đếm số ô vuông, hoặc cộng diện tích hai hình chữ nhật.',
          'Đi một vòng quanh hình và cộng độ dài tất cả các cạnh.',
        ],
        // toạ độ theo bai79_t1_q4_shape.svg (vẽ đúng tỉ lệ: 30 = 1 cm)
        perimPlay: {
          name: 'miếng bìa hình A', toScale: true, lens: [4, 4, 4, 4, 4, 2, 12, 2],
          path: ['_a', '_b', '_c', '_d', '_e', '_f', '_g', '_h'],
          points: { _a: [66, 160], _b: [186, 160], _c: [186, 40], _d: [306, 40], _e: [306, 160], _f: [426, 160], _g: [426, 220], _h: [66, 220] },
          fill: 1,
        },
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          B('a) ... mm = 1 cm', 10),
          B('... cm = 1 dm', 10),
          B('... dm = 1 m', 10),
          B('... cm = 1 m', 100),
          B('b) ... g = 1 kg', 1000),
          B('1 kg = ... g', 1000),
          B('20 kg = ... g', 20000),
          B('8 kg = ... g', 8000),
          B(`c) ... ml = 1 ${L}`, 1000),
          B(`1 ${L} = ... ml`, 1000),
          B(`2 ${L} = ... ml`, 2000),
          B(`6 ${L} = ... ml`, 6000),
        ],
        hints: ['1 kg = 1 000 g; 1 <i>l</i> = 1 000 ml; 1 m = 10 dm = 100 cm.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          B('a) 400 mm + 250 mm = ... mm', 650),
          B('400 mm – 250 mm = ... mm', 150),
          B('800 mm × 4 = ... mm', 3200),
          B('800 mm : 4 = ... mm', 200),
          B('b) 200 g + 600 g = ... g', 800),
          B('300 g × 2 = ... g', 600),
          B('c) 700 ml – 500 ml = ... ml', 200),
          B('1 000 ml : 5 = ... ml', 200),
        ],
        hints: ['Tính như với số rồi viết tên đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB79Clocks,
        q: '3. a) Viết số thích hợp vào chỗ chấm.\nĐồng hồ chỉ mấy giờ?',
        blanks: [
          { label: 'Đồng hồ thứ nhất: ... giờ ... phút', answer: '3,5', validate: clockVal(3, 5) },
          { label: 'Đồng hồ thứ hai: ... giờ ... phút', answer: '10,20', validate: clockVal(10, 20) },
          { label: 'Đồng hồ thứ ba: ... giờ ... phút', answer: '2,40', validate: clockVal(2, 40) },
          {
            label: 'b) Viết tên tháng thích hợp vào chỗ chấm.<br>Trong một năm, hai tháng liền nhau có cùng 31 ngày là tháng ... và tháng ...',
            answer: '7,8',
            validate: (v) => String(v).split(',').map(s => s.trim()).sort().join('|') === '7|8',
          },
          {
            label: 'c) Khoanh vào chữ đặt trước câu trả lời đúng.<br>Nếu ngày 26 tháng 3 là thứ Hai thì ngày 4 tháng 4 cùng năm đó là: ...',
            answer: 'C. Thứ Tư',
            validate: (v) => ['c', 'c. thu tu', 'thu tu'].includes(stripVN(v).trim().replace(/\s+/g, ' ')),
            tiles: ['A. Thứ Hai', 'B. Thứ Ba', 'C. Thứ Tư', 'D. Thứ Năm'], tileOne: true,
          },
        ],
        hints: [
          'Kim ngắn chỉ giờ, kim dài chỉ phút. Kim dài chỉ số 1 là 5 phút, chỉ số 4 là 20 phút.',
          'Tháng 3 có 31 ngày: từ ngày 26 tháng 3 đến ngày 4 tháng 4 là 9 ngày. 9 ngày = 1 tuần và 2 ngày.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết số thích hợp vào chỗ chấm.\nViệt đưa cho cô bán hàng 4 tờ tiền loại 20 000 đồng để trả tiền mua đồ dùng học tập hết 65 000 đồng.',
        blanks: [
          B('a) Cô bán hàng trả lại cho Việt ... đồng.', 15000),
          B('b) Biết cô bán hàng trả lại cho Việt toàn tờ tiền loại 5 000 đồng. Như vậy, Việt nhận được ... tờ tiền loại đó.', 3),
        ],
        hints: ['4 tờ 20 000 đồng là 80 000 đồng. Lấy số tiền Việt đưa trừ đi số tiền phải trả.'],
      },
    ],
  },

  // ── BÀI 80 (trang 122–123) ────────────────────────────────────────────────
  {
    id: 'bai-80', number: 80, title: 'Ôn tập bảng số liệu, khả năng xảy ra của một sự kiện',
    questions: [
      {
        type: 'table',
        q: '1. Cho bảng số liệu về số học sinh đăng kí tham gia 3 môn thi đấu tại hội trại của lớp 3A.',
        headers: [{ diag: ['Môn thi', 'Số học sinh'] }, 'Nhảy<br>bao bố', 'Bịt mắt<br>đập niêu', 'Tìm kẹo<br>trong đĩa bột'],
        rows: [
          ['Nữ', 4, 5, 3],
          ['Nam', 5, 4, 6],
        ],
        blanks: [
          {
            label: 'Dựa vào bảng trên, trả lời câu hỏi:<br>a) Mỗi cột của bảng trên cho biết điều gì?<br>Trả lời: ...',
            answer: 'Số bạn nữ và số bạn nam đăng kí tham gia môn thi đó',
            validate: phraseValidate('Số bạn nữ và số bạn nam đăng kí tham gia môn thi đó'),
            tiles: ['Số bạn nữ và số bạn nam đăng kí tham gia môn thi đó', 'Số bạn nữ (hoặc số bạn nam) đăng kí tham gia từng môn thi'],
            tileOne: true,
          },
          {
            label: 'Mỗi hàng của bảng trên cho biết điều gì?<br>Trả lời: ...',
            answer: 'Số bạn nữ (hoặc số bạn nam) đăng kí tham gia từng môn thi',
            validate: phraseValidate('Số bạn nữ (hoặc số bạn nam) đăng kí tham gia từng môn thi'),
            tiles: ['Số bạn nữ và số bạn nam đăng kí tham gia môn thi đó', 'Số bạn nữ (hoặc số bạn nam) đăng kí tham gia từng môn thi'],
            tileOne: true,
          },
          {
            label: 'b) Môn thi nào có nhiều bạn nữ đăng kí tham gia nhất?<br>Trả lời: ...',
            answer: 'Bịt mắt đập niêu', validate: subjectVal('Bịt mắt đập niêu'), tiles: SUBJECTS, tileOne: true,
          },
          {
            label: 'Môn thi nào có ít bạn nữ đăng kí tham gia nhất?<br>Trả lời: ...',
            answer: 'Tìm kẹo trong đĩa bột', validate: subjectVal('Tìm kẹo trong đĩa bột'), tiles: SUBJECTS, tileOne: true,
          },
          {
            label: 'c) Biết mỗi bạn trong lớp 3A đều đăng kí tham gia đúng một môn thi đấu. Hỏi lớp 3A có tất cả bao nhiêu học sinh?<br>Trả lời: ...',
            answer: '27', validate: leadNumVal(27),
          },
        ],
        hints: [
          'Mỗi cột là một môn thi, mỗi hàng là nữ hoặc nam.',
          'c) Cộng tất cả các số trong bảng: số bạn nữ và số bạn nam của cả ba môn.',
        ],
      },
      {
        type: 'table',
        q: '2. Các bạn Rô-bốt, Việt, Nam và Mai đã gieo một số hạt đậu để quan sát sự nảy mầm của hạt. Số liệu về số hạt đậu nảy mầm và không nảy mầm của mỗi bạn được ghi lại trong bảng sau:',
        headers: [
          [{ text: 'Bạn', rowspan: 2 }, { text: 'Số hạt đậu', colspan: 3 }],
          ['Nảy mầm', 'Không nảy mầm', 'Tổng'],
        ],
        rows: [
          ['Rô-bốt', 20, blank(0), 20],
          ['Việt', 18, 7, blank(25)],
          ['Nam', 15, blank(10), 25],
          ['Mai', 20, 10, blank(30)],
        ],
        blanks: [
          {
            label: 'a) Hoàn thành bảng số liệu trên.<br>b) Dựa vào bảng số liệu, viết tiếp vào chỗ chấm cho thích hợp.<br>– Bạn ... gieo nhiều hạt nhất.',
            answer: 'Mai', validate: phraseValidate('Mai'), tiles: FRIENDS, tileOne: true,
          },
          {
            label: '– Bạn ... có nhiều hạt nảy mầm nhất.',
            answer: 'Rô-bốt và Mai', validate: nameSetValidate(['Rô-bốt', 'Mai']), tiles: FRIENDS, tileSep: ' và ',
          },
          {
            label: '– Bạn ... có ít hạt nảy mầm nhất.',
            answer: 'Nam', validate: phraseValidate('Nam'), tiles: FRIENDS, tileOne: true,
          },
          { label: '– Cả bốn bạn có số hạt đậu nảy mầm là: ...', answer: '73', validate: leadNumVal(73) },
        ],
        hints: [
          'Tổng = số hạt nảy mầm + số hạt không nảy mầm.',
          'Có hai bạn cùng có nhiều hạt nảy mầm nhất: hãy viết cả hai bạn.',
        ],
      },
      {
        type: 'fill',
        q: '3. Đ, S?\nRô-bốt đang ngồi dưới một cây táo thần. Trên cây có những quả táo màu đỏ và màu xanh. Khi Rô-bốt đang chăm chú đọc sách thì một quả táo đột nhiên rụng xuống, rơi trúng vào quyển sách của Rô-bốt.',
        blanks: [
          { label: 'a) Quả táo đó chắc chắn là táo đỏ hoặc táo xanh.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) Quả táo đó có thể là táo xanh.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'c) Quả táo đó có thể là táo vàng.', answer: 'S', validate: dsValidate(false) },
          { label: 'd) Quả táo đó không thể là táo đỏ.', answer: 'S', validate: dsValidate(false) },
        ],
        hints: ['Trên cây chỉ có táo đỏ và táo xanh, không có táo vàng.'],
      },
      {
        type: 'fill',
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nTrong chiếc hộp của Nam có 2 viên bi màu đỏ và 2 viên bi màu vàng. Nam không nhìn vào hộp và lấy ra 1 viên bi, rồi tặng số viên bi còn lại cho Việt.',
        blanks: [{
          label: 'Việt có thể nhận được ... viên bi màu ... và ... viên bi màu ... hoặc ... viên bi màu ... và ... viên bi màu ...',
          answer: '1,đỏ,2,vàng,2,đỏ,1,vàng',
          validate: marblesVal(),
        }],
        hints: ['Nam lấy ra 1 viên thì Việt nhận 3 viên. Nếu Nam lấy viên đỏ thì còn lại mấy viên mỗi màu? Nếu lấy viên vàng thì sao?'],
      },
    ],
  },

  // ── BÀI 81 (trang 124–127) ────────────────────────────────────────────────
  {
    id: 'bai-81', number: 81, title: 'Ôn tập chung',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Viết số và cách đọc số đó (theo mẫu).',
        headers: ['Chục<br>nghìn', 'Nghìn', 'Trăm', 'Chục', 'Đơn<br>vị', 'Viết số', 'Đọc số'],
        rows: [
          { sample: true, cells: [4, 6, 2, 3, 5, '46 235', 'bốn mươi sáu nghìn hai trăm ba mươi lăm'] },
          readRow([2, 1, 6, 7, 4]),
          readRow([6, 0, 5, 1, 5]),
          readRow([null, 8, 0, 9, 1]),
          readRow([1, 9, 0, 0, 7]),
        ],
        hints: ['Đọc số nghìn trước, rồi đọc tiếp ba chữ số sau như đọc số có ba chữ số, ví dụ 8 091: tám nghìn không trăm chín mươi mốt.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: `2. a) Khoanh ${RED_TXT('màu đỏ')} vào số lớn nhất, ${BLUE_TXT('màu xanh')} vào số bé nhất trong các số sau:\n32 541 &nbsp; &nbsp; 23 514 &nbsp; &nbsp; 32 415 &nbsp; &nbsp; 25 143`,
        blanks: [
          { label: `Số khoanh ${RED_TXT('màu đỏ')}: ...`, answer: '32 541', validate: numVal(32541), tiles: NUMS_81, tileOne: true },
          { label: `Số khoanh ${BLUE_TXT('màu xanh')}: ...`, answer: '23 514', validate: numVal(23514), tiles: NUMS_81, tileOne: true },
          {
            label: 'b) Viết các số ở câu a theo thứ tự:<br>– Từ bé đến lớn: ...',
            answer: '23 514, 25 143, 32 415, 32 541',
            validate: numListVal([23514, 25143, 32415, 32541]), tiles: NUMS_81,
          },
          {
            label: '– Từ lớn đến bé: ...',
            answer: '32 541, 32 415, 25 143, 23 514',
            validate: numListVal([32541, 32415, 25143, 23514]), tiles: NUMS_81,
          },
        ],
        hints: ['So sánh chữ số hàng chục nghìn trước; nếu bằng nhau thì so sánh tiếp hàng nghìn, hàng trăm…'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. a) Đặt tính rồi tính.',
        blanks: [
          B('28 094 + 57 285 = ...', 85379),
          B('57 285 – 28 094 = ...', 29191),
          B('b) Tính.<br>26 173 × 3 = ...', 78519),
          B('41 304 : 8 = ...', 5163),
        ],
        hints: ['Đặt tính thẳng cột trên giấy, tính từ phải sang trái. Phép chia thì chia từ trái sang phải.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: `4. Một cửa hàng trong một buổi đã bán được 8 can nước mắm, mỗi can 5 ${L} và một can 10 ${L}. Hỏi trong buổi đó, cửa hàng đã bán được bao nhiêu lít nước mắm?`,
        blanks: [{ label: `Số lít nước mắm đã bán (${L})`, answer: '50' }],
        hints: ['8 can, mỗi can 5 <i>l</i>: 5 × 8. Rồi cộng thêm can 10 <i>l</i>.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '5. Tính giá trị của biểu thức.',
        blanks: [
          { label: 'a) 4 675 + 3 518 – 5 946 = ...', answer: '8193 – 5946', validate: exprValidate('8193 - 5946') },
          B('= ...', 2247),
          { label: 'b) (274 + 518) : 4 = ...', answer: '792 : 4', validate: exprValidate('792 : 4') },
          B('= ...', 198),
        ],
        hints: ['Biểu thức chỉ có cộng, trừ: tính từ trái sang phải. Có dấu ngoặc: tính trong ngoặc trước.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB81Scales,
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          B('a) Túi đường cân nặng ... gam.', 1000),
          B('b) Túi muối cân nặng ... gam.', 800),
          B('c) Túi đường và túi muối cân nặng tất cả ... gam.', 1800),
          B('d) Túi đường nặng hơn túi muối ... gam.', 200),
        ],
        hints: ['Cân thăng bằng: hai đĩa nặng bằng nhau. 1 kg = 1 000 g.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB81Clock,
        q: '2. Viết số thích hợp vào chỗ chấm.\nNam đi học từ nhà lúc 7 giờ 5 phút và 25 phút sau thì đến trường.',
        blanks: [B('Vậy Nam đến trường lúc ... giờ ... phút.', 7, 30)],
        hints: ['5 phút thêm 25 phút là bao nhiêu phút?'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Tính giá trị của biểu thức.',
        blanks: [
          { label: 'a) 24 728 : 4 × 3 = ...', answer: '6182 × 3', validate: exprValidate('6182 × 3') },
          B('= ...', 18546),
          { label: 'b) 305 × (812 – 802) = ...', answer: '305 × 10', validate: exprValidate('305 × 10') },
          B('= ...', 3050),
        ],
        hints: ['Chỉ có nhân, chia: tính từ trái sang phải. Có dấu ngoặc: tính trong ngoặc trước.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '4. a) Tính diện tích hình vuông có chu vi 36 cm.\nb) Tính chu vi hình chữ nhật có chiều rộng bằng cạnh hình vuông ở câu a và có chiều dài hơn chiều rộng là 3 cm.',
        blanks: [
          { label: 'a) Diện tích hình vuông (cm²)', answer: '81' },
          { label: 'b) Chu vi hình chữ nhật (cm)', answer: '42' },
        ],
        hints: ['Cạnh hình vuông = chu vi : 4.', 'Chiều dài = chiều rộng + 3 cm; chu vi = (dài + rộng) × 2.'],
        perimPlay: { rect: [12, 9], texts: ['9 + 3 = 12 cm', '36 : 4 = 9 cm', '9 + 3 = 12 cm', '36 : 4 = 9 cm'], fill: 1 },
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '5. Sà lan thứ nhất chở được 1 250 thùng hàng. Sà lan thứ hai chở được gấp đôi số thùng hàng ở sà lan thứ nhất. Hỏi cả hai sà lan chở được bao nhiêu thùng hàng?',
        blanks: [{ label: 'Số thùng hàng cả hai sà lan', answer: '3750', validate: numVal(3750) }],
        hints: ['Sà lan thứ hai: 1 250 × 2. Rồi cộng số thùng của hai sà lan.'],
      },
    ],
  },
];
