/**
 * Vở bài tập Toán 2 — Tập hai: Bài 65–70 (sách trang 93–110).
 */
import {
  mau, stripVN, listValidate, dsValidate, unitValidate, phraseValidate,
} from '../grade3Workbook.js';
import imgB65T1Q1 from '../../assets/grade2-workbook/bai65_t1_q1_chart.svg';
import imgB65T1Q2 from '../../assets/grade2-workbook/bai65_t1_q2_chart.svg';
import imgB65T2Q1 from '../../assets/grade2-workbook/bai65_t2_q1_toys.png';
import imgB65Car from '../../assets/grade2-workbook/bai65_icon_car.png';
import imgB65Moto from '../../assets/grade2-workbook/bai65_icon_moto.png';
import imgB65Plane from '../../assets/grade2-workbook/bai65_icon_plane.png';
import imgB65T2Q2 from '../../assets/grade2-workbook/bai65_t2_q2_animals.png';
import imgB65T2Q3 from '../../assets/grade2-workbook/bai65_t2_q3_tomatoes.png';
import imgB66Q2 from '../../assets/grade2-workbook/bai66_q2_balls.png';
import imgB67Q1 from '../../assets/grade2-workbook/bai67_q1_shelf.png';
import imgB69T1Q5 from '../../assets/grade2-workbook/bai69_t1_q5_flow.svg';
import imgB69T2Q1 from '../../assets/grade2-workbook/bai69_t2_q1_calcs.svg';
import imgB69T3Q2 from '../../assets/grade2-workbook/bai69_t3_q2_calcs.svg';
import imgB69T3Q5 from '../../assets/grade2-workbook/bai69_t3_q5_flow.svg';
import imgB70T1Q4 from '../../assets/grade2-workbook/bai70_t1_q4_map.png';
import imgB70T1Q5 from '../../assets/grade2-workbook/bai70_t1_q5_pyramid.svg';
import imgB70T2Q1 from '../../assets/grade2-workbook/bai70_t2_q1_calcs.svg';
import imgB70T2Q3 from '../../assets/grade2-workbook/bai70_t2_q3_flow.svg';
import imgB70T3Q2 from '../../assets/grade2-workbook/bai70_t3_q2_flow.svg';
import imgB70T3Q4 from '../../assets/grade2-workbook/bai70_t3_q4_calcs.svg';

// ── Local helpers ─────────────────────────────────────────────────────────────
// "a + b = ......" / "Đặt tính rồi tính." row, result computed here so the key
// can't hold a typo. `shown` is how the book prints it ("1 000 − 600").
const calc = (prefix, a, op, b, eq = false) => {
  const fmt = (n) => (n >= 1000 ? String(n).replace(/(\d)(\d{3})$/, '$1 $2') : String(n));
  return {
    label: `${prefix}${fmt(a)} ${op} ${fmt(b)}${eq ? ' = ...' : ''}`,
    answer: String(op === '+' ? a + b : a - b),
  };
};
// "Đ, S ?" box after a written calculation.
const ds = (label, isTrue) => ({ label: `${label} ...`, boxes: true, answer: isTrue ? 'Đ' : 'S', validate: dsValidate(isTrue) });
// A word/phrase written on the dotted line (accents, case don't matter).
const word = (label, answer) => ({ label, answer, validate: phraseValidate(answer) });
const nums = (s) => (String(s).match(/\d+/g) || []).map(Number);
// Numbers written in a given order ("769, 796, 887, 901", "769 < 796 < …").
function numListValidate(expected) {
  const target = expected.join('|');
  return (value) => nums(value).join('|') === target;
}
// The same numbers in any order, each exactly once.
function numSetValidate(expected) {
  const target = [...expected].sort((a, b) => a - b).join('|');
  return (value) => nums(value).sort((a, b) => a - b).join('|') === target;
}
// A result that may be written alone or at the end of its calculation, with or
// without the unit ("1 032", "1032 km", "858 + 174 = 1 032 (km)").
function resultValidate(n) {
  return (value) => {
    const all = nums(String(value).replace(/(\d)\s+(?=\d{3}\b)/g, '$1'));
    return all.length > 0 && all[all.length - 1] === n;
  };
}
// "374 = ......" (Viết số thành tổng): the hundreds, tens and ones, in any order;
// a "+ 0" for a zero digit may be written or left out (405 = 400 + 5).
function placeSumValidate(n) {
  const target = [100, 10, 1].map(p => Math.floor(n / p) % 10 * p).filter(Boolean).sort((a, b) => b - a).join('+');
  return (value) => {
    const v = String(value).replace(/\s+/g, '');
    if (!/^\d+(\+\d+)+$/.test(v)) return false;
    return v.split('+').map(Number).filter(Boolean).sort((a, b) => b - a).join('+') === target;
  };
}
// School names in the book's order; the word "trường" may be copied in front.
function schoolListValidate(names) {
  const norm = (s) => stripVN(s).replace(/^\s*truong\s+/, '').replace(/[^a-z]/g, '');
  const target = names.map(norm).join('|');
  return (value) => String(value).split(',').map(norm).join('|') === target;
}
const school = (label, name) => ({ label, answer: name, validate: schoolListValidate([name]) });
// A comparison sign typed into a box (">", "<", "=").
const signValidate = (sign) => (value) => String(value).trim() === sign;

// Small inline pictures used inside answer labels.
const DOTS = {
  2: [[0.45, -0.4], [-0.45, 0.4]],
  4: [[-0.45, -0.4], [0.45, -0.4], [-0.45, 0.4], [0.45, 0.4]],
  5: [[-0.45, -0.45], [0.45, -0.45], [0, 0], [-0.45, 0.45], [0.45, 0.45]],
  6: [[-0.45, -0.35], [0, -0.35], [0.45, -0.35], [-0.45, 0.35], [0, 0.35], [0.45, 0.35]],
};
const dotIcon = (n) => `<svg viewBox="0 0 100 100" width="30" height="30" style="vertical-align:middle;flex:none" aria-label="hình ${n} chấm"><circle cx="50" cy="50" r="45" fill="#B8E5FC" stroke="#00AEEF" stroke-width="5"/>${DOTS[n].map(([x, y]) => `<circle cx="${50 + x * 45}" cy="${50 + y * 45}" r="8.5" fill="#00AEEF"/>`).join('')}</svg>`;
const SHAPE = {
  sq: '<rect x="4" y="4" width="22" height="22"/>',
  tri: '<path d="M15 3L28 27H2Z"/>',
  dia: '<path d="M15 2L28 15L15 28L2 15Z"/>',
  box: '<rect x="3" y="7" width="24" height="16" rx="4"/>',
};
const shape = (k) => `<svg viewBox="0 0 30 30" width="24" height="24" style="vertical-align:middle;flex:none" aria-label="hình"><g fill="#fff" stroke="#231F20" stroke-width="2.2">${SHAPE[k]}</g></svg>`;
const toy = (src, name) => `<img src="${src}" alt="${name}" style="height:30px;width:auto;vertical-align:middle;flex:none">`;
const card = (d, low = false) => `<b style="display:inline-block;min-width:1.6em;text-align:center;background:#B8E5FC;border:2px solid #00AEEF;border-radius:7px;padding:2px 5px;margin:0 3px;${low ? 'position:relative;top:0.5em;' : ''}">${d}</b>`;
const CHAC = '<i class="gw-sample-text">chắc chắn</i>, <i class="gw-sample-text">có thể</i> hoặc <i class="gw-sample-text">không thể</i>';
const COLOR3 = (a, b) => [a, b, 'Không tô'];

export const BAI_65_70 = [
  // ── BÀI 65 (trang 93–95) ──────────────────────────────────────────────────
  {
    id: 'bai-65', number: 65, title: 'Biểu đồ tranh',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB65T1Q1,
        q: '1. Cho biểu đồ:\nSố?',
        blanks: [
          { label: `a) Mỗi loại có bao nhiêu hình?<br>${dotIcon(2)} có <span class="gw-sample-text">7</span> hình<br>${dotIcon(5)} có ... hình`, answer: '6' },
          { label: `${dotIcon(4)} có ... hình`, answer: '5' },
          { label: `${dotIcon(6)} có ... hình`, answer: '4' },
          { label: 'b) Số hình Nam vẽ được tất cả là ... hình.', answer: '22' },
        ],
        hints: ['Đếm số hình ở mỗi cột, không đếm hình ở ô màu xám dưới cùng (đó là tên của cột).'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB65T1Q2,
        q: '2. Cho biểu đồ:\na) Số?',
        blanks: [
          { label: '• Số hình của ba loại có tất cả là ... hình.', answer: '20' },
          { label: '• Số hình tròn nhiều hơn số hình tam giác là ... hình.', answer: '3' },
        ],
        hints: ['Đếm số hình ở mỗi hàng trước, rồi mới cộng hoặc trừ.'],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB65T1Q2,
        q: '2. b) Khoanh vào chữ đặt trước câu trả lời đúng.\nTrong các hình Mai cắt được, hình nào có số lượng ít nhất?',
        options: ['Hình tròn', 'Hình vuông', 'Hình tam giác'],
        answer: 2,
        hints: ['Hàng nào ngắn nhất thì loại hình đó ít nhất.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB65T2Q1,
        q: '1. Cho biểu đồ:\na) Số?\nViệt có bao nhiêu đồ chơi mỗi loại?',
        blanks: [
          { label: `${toy(imgB65Car, 'ô tô')}: ... chiếc`, answer: '8' },
          { label: `${toy(imgB65Moto, 'xe máy')}: ... chiếc`, answer: '7' },
          { label: `${toy(imgB65Plane, 'máy bay')}: ... chiếc`, answer: '6' },
        ],
        hints: ['Mỗi chấm tròn là 1 đồ chơi. Đếm số chấm tròn ở cột của mỗi đồ chơi.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB65T2Q1,
        q: '1. b) Khoanh vào chữ đặt trước câu trả lời đúng.\nĐồ chơi nào có ít nhất?',
        options: [toy(imgB65Car, 'ô tô'), toy(imgB65Plane, 'máy bay'), toy(imgB65Moto, 'xe máy')],
        answer: 1,
        hints: ['Cột nào có ít chấm tròn nhất?'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB65T2Q2,
        q: '2. Mỗi con thỏ, rùa, sóc biểu thị bằng một chấm tròn (<span style="color:#00AEEF">●</span>). Trong khu rừng có 8 con thỏ, 6 con sóc, 5 con rùa.\nEm hãy vẽ thêm số chấm tròn vào biểu đồ sao cho đủ số các con thỏ, sóc, rùa có trong khu rừng.\nMỗi hàng cần vẽ thêm mấy chấm tròn?',
        blanks: [
          { label: 'Hàng con thỏ: vẽ thêm ... chấm tròn.', answer: '2' },
          { label: 'Hàng con rùa: vẽ thêm ... chấm tròn.', answer: '0' },
          { label: 'Hàng con sóc: vẽ thêm ... chấm tròn.', answer: '1' },
        ],
        hints: ['Đếm số chấm tròn đã có ở mỗi hàng, rồi so với số con vật trong khu rừng.', 'Nếu hàng đã đủ thì không cần vẽ thêm: viết 0.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB65T2Q3,
        q: '3. Cho biểu đồ:\nSố?',
        blanks: [
          { label: 'a) Số quả cà chua thu hoạch được ở mỗi vườn là:<br>• Vườn A: ... quả;', answer: '43' },
          { label: '• Vườn B: ... quả;', answer: '50' },
          { label: '• Vườn C: ... quả.', answer: '53' },
          { label: 'b) Số quả cà chua ở vườn B nhiều hơn vườn A là ... quả.', answer: '7' },
          { label: 'c) Số quả cà chua ở cả ba khu vườn là ... quả.', answer: '146' },
        ],
        hints: ['Mỗi túi là 10 quả, mỗi hình tròn là 1 quả. Đếm túi trước (chục), rồi đếm hình tròn (đơn vị).'],
      },
    ],
  },

  // ── BÀI 66 (trang 96) ─────────────────────────────────────────────────────
  {
    id: 'bai-66', number: 66, title: 'Chắc chắn, có thể, không thể',
    questions: [
      {
        type: 'fill',
        q: `1. Chọn từ ${CHAC} để điền vào chỗ chấm cho thích hợp.\nTrong hộp bút của Mai có 2 bút chì và 2 bút mực. Trong hộp bút của Việt có 3 bút chì. Trong hộp bút của Nam có 2 bút mực.\nNếu mỗi bạn lấy 1 cái bút ra khỏi hộp bút của mình thì:`,
        blanks: [
          word('a) Mai ... lấy được bút chì.', 'có thể'),
          word('b) Việt ... lấy được bút chì.', 'chắc chắn'),
          word('c) Nam ... lấy được bút chì.', 'không thể'),
        ],
        hints: ['Hộp chỉ có bút chì: lấy ra luôn là bút chì. Hộp không có bút chì: không bao giờ lấy được bút chì. Hộp có cả hai loại: lúc được, lúc không.'],
      },
      {
        type: 'compare', img: imgB66Q2,
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.\nTrong hộp có 4 quả bóng màu xanh. Không nhìn vào hộp, Nam lấy 1 quả bóng từ bên trong chiếc hộp đó.',
        rows: [
          { left: 'a) Khả năng để Nam lấy được 1 quả bóng màu xanh là:', options: ['A. Chắc chắn', 'B. Có thể', 'C. Không thể'], answer: 'A' },
          { left: 'b) Khả năng để Nam lấy được 1 quả bóng màu trắng là:', options: ['A. Chắc chắn', 'B. Có thể', 'C. Không thể'], answer: 'C' },
        ],
        hints: ['Trong hộp chỉ có bóng màu xanh, không có quả bóng màu trắng nào.'],
      },
      {
        type: 'fill',
        q: `3. Chọn từ ${CHAC} để điền vào chỗ chấm cho thích hợp.\nTrên đĩa có 2 chiếc bánh hình tròn và 3 chiếc bánh hình vuông. Rô-bốt cho Mai và Mi, mỗi bạn 2 chiếc bánh. Như vậy:`,
        blanks: [
          word('a) Trên đĩa ... còn lại 1 chiếc bánh.', 'chắc chắn'),
          word('b) Trên đĩa ... còn lại 1 chiếc bánh hình vuông.', 'có thể'),
          word('c) Trên đĩa ... còn lại 2 chiếc bánh.', 'không thể'),
        ],
        hints: ['Trên đĩa có tất cả 5 chiếc bánh, hai bạn lấy đi 4 chiếc.', 'Chiếc bánh còn lại có thể là bánh tròn, cũng có thể là bánh vuông.'],
      },
    ],
  },

  // ── BÀI 67 (trang 97–98) ──────────────────────────────────────────────────
  {
    id: 'bai-67', number: 67, title: 'Thực hành và trải nghiệm thu thập, phân loại, kiểm đếm số liệu',
    questions: [
      {
        type: 'fill', img: imgB67Q1,
        q: '1. Số?\nTrên chiếc kệ đồ chơi có:',
        blanks: [
          { label: '... khối ru-bích;', answer: '6' },
          { label: '... cái đàn;', answer: '2' },
          { label: '... quyển sách;', answer: '7' },
          { label: '... con búp bê;', answer: '1' },
          { label: '... cái ô tô;', answer: '5' },
          { label: '... con gấu bông.', answer: '3' },
        ],
        hints: ['Đếm lần lượt từng ngăn kệ. Cái đàn gồm đàn piano và đàn vi-ô-lông.', 'Quyển sách: đếm cả chồng sách nằm và các quyển sách đứng.'],
      },
    ],
  },

  // ── BÀI 68 (trang 99–101) ─────────────────────────────────────────────────
  {
    id: 'bai-68', number: 68, title: 'Ôn tập các số trong phạm vi 1 000',
    questions: [
      {
        type: 'match', section: 'Tiết 1',
        q: `1. Nối (theo mẫu).\n${mau('Hai trăm linh năm → 205')}`,
        left: [
          { id: 'w205', text: 'Hai trăm linh năm' }, { id: 'w257', text: 'Hai trăm năm mươi bảy' },
          { id: 'w880', text: 'Tám trăm tám mươi' }, { id: 'w745', text: 'Bảy trăm bốn mươi lăm' },
          { id: 'w434', text: 'Bốn trăm ba mươi tư' }, { id: 'w691', text: 'Sáu trăm chín mươi mốt' },
        ],
        right: [
          { id: 'n257', text: '257' }, { id: 'n880', text: '880' }, { id: 'n205', text: '205' },
          { id: 'n434', text: '434' }, { id: 'n691', text: '691' }, { id: 'n745', text: '745' },
        ],
        pairs: [['w205', 'n205'], ['w257', 'n257'], ['w880', 'n880'], ['w745', 'n745'], ['w434', 'n434'], ['w691', 'n691']],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Số?',
        rows: [
          { label: 'a)', cells: ['534', '535', { blank: true, answer: '536' }, '537', { blank: true, answer: '538' }, '539', { blank: true, answer: '540' }, '541'] },
          { label: 'b)', cells: ['321', '323', '325', { blank: true, answer: '327' }, '329', { blank: true, answer: '331' }, '333', { blank: true, answer: '335' }] },
          { label: 'c)', cells: ['842', '844', '846', { blank: true, answer: '848' }, '850', { blank: true, answer: '852' }, { blank: true, answer: '854' }, '856'] },
        ],
        hints: ['Dãy a) thêm 1 đơn vị mỗi lần; dãy b) và c) thêm 2 đơn vị mỗi lần.'],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '3. >; <; = ?',
        rows: [
          { left: '542', right: '539', answer: '>' },
          { left: '856', right: '865', answer: '<' },
          { left: '780', right: '784', answer: '<' },
          { left: '657', right: '700', answer: '<' },
          { left: '349', right: '345', answer: '>' },
          { left: '189', right: '201', answer: '<' },
          { left: '986', right: '800 + 98', answer: '>' },
          { left: '99', right: '100 + 2', answer: '<' },
          { left: '280', right: '200 + 80', answer: '=' },
        ],
        hints: ['So sánh chữ số hàng trăm trước, rồi đến hàng chục, hàng đơn vị. Có phép tính thì tính trước.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. a) Viết các số 796; 887; 769; 901 theo thứ tự từ bé đến lớn:',
        blanks: [{ label: '', answer: '769, 796, 887, 901', validate: numListValidate([769, 796, 887, 901]) }],
        hints: ['Tìm số bé nhất trước. 796 và 769 cùng hàng trăm, so sánh tiếp hàng chục.'],
      },
      {
        type: 'choice', section: 'Tiết 1',
        q: '4. b) Khoanh vào số lớn nhất trong các số sau:',
        options: ['534', '589', '499', '515'],
        answer: 1,
        hints: ['So sánh hàng trăm trước, rồi đến hàng chục.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '5. Viết chữ số thích hợp vào ô trống.',
        blanks: [
          { label: 'a) 4...5 > 489', boxes: true, answer: '9' },
          { label: 'b) 6...9 < 611', boxes: true, answer: '0' },
          { label: 'c) 57... < 57... < 572', boxes: true, answer: '0,1', validate: listValidate(['0', '1']) },
          { label: 'd) 9...8 > ...97 > 898', boxes: true, answer: '9,9', validate: listValidate(['9', '9']) },
        ],
        hints: ['Thử lần lượt các chữ số vào ô trống rồi so sánh.', 'Câu d): làm phần "... 97 > 898" trước.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Cho biết số học sinh ở bốn trường như sau:\n• Trường Lê Lợi: 756 học sinh;\n• Trường Quang Trung: 819 học sinh;\n• Trường Nguyễn Trãi: 831 học sinh;\n• Trường Nguyễn Siêu: 745 học sinh.\nViết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          school('a) Trường ... có ít học sinh nhất.', 'Nguyễn Siêu'),
          school('b) Trường ... có nhiều học sinh nhất.', 'Nguyễn Trãi'),
          {
            label: 'c) Tên các trường viết theo thứ tự số học sinh từ bé đến lớn là:<br>trường ... → trường ... → trường ... → trường ...',
            answer: 'Nguyễn Siêu, Lê Lợi, Quang Trung, Nguyễn Trãi',
            validate: schoolListValidate(['Nguyễn Siêu', 'Lê Lợi', 'Quang Trung', 'Nguyễn Trãi']),
          },
        ],
        hints: ['So sánh bốn số 756, 819, 831, 745: xem hàng trăm trước, rồi đến hàng chục.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `2. Viết số thành tổng (theo mẫu).\n${mau('257 = 200 + 50 + 7.')}`,
        blanks: [
          { label: '374 = ...', answer: '300 + 70 + 4', validate: placeSumValidate(374) },
          { label: '822 = ...', answer: '800 + 20 + 2', validate: placeSumValidate(822) },
          { label: '555 = ...', answer: '500 + 50 + 5', validate: placeSumValidate(555) },
          { label: '405 = ...', answer: '400 + 5', validate: placeSumValidate(405) },
          { label: '680 = ...', answer: '600 + 80', validate: placeSumValidate(680) },
          { label: '996 = ...', answer: '900 + 90 + 6', validate: placeSumValidate(996) },
        ],
        hints: ['Tách số thành trăm, chục và đơn vị. Chữ số 0 thì không cần viết vào tổng.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: `3. Nối con voi với thùng nước thích hợp (theo mẫu).\n${mau('500 + 90 → 590')}`,
        left: [
          { id: 'e444', text: '400 + 40 + 4' }, { id: 'e607', text: '600 + 7' },
          { id: 'e590', text: '500 + 90' }, { id: 'e788', text: '700 + 80 + 8' },
        ],
        right: [
          { id: 'b607', text: '607' }, { id: 'b788', text: '788' }, { id: 'b590', text: '590' }, { id: 'b444', text: '444' },
        ],
        pairs: [['e444', 'b444'], ['e607', 'b607'], ['e590', 'b590'], ['e788', 'b788']],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Số?',
        blanks: [
          { label: 'a) 300 + ... = 350', answer: '50' },
          { label: 'b) 800 + 40 + ... = 843', answer: '3' },
        ],
        hints: ['Viết số ở vế phải thành tổng trăm, chục, đơn vị rồi so sánh.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `5. Viết tiếp vào chỗ chấm cho thích hợp.\n${card(2)}${card(3, true)}${card(4)}`,
        blanks: [
          { label: 'a) Các số có ba chữ số lập được từ ba thẻ số trên là:', answer: '234, 243, 324, 342, 423, 432', validate: numSetValidate([234, 243, 324, 342, 423, 432]) },
          { label: 'b) Tổng của số lớn nhất và số bé nhất trong các số lập được ở câu a là: ...', answer: '666', validate: resultValidate(666) },
        ],
        hints: ['Lần lượt chọn chữ số hàng trăm là 2, 3, 4; mỗi lần có 2 cách xếp hai thẻ còn lại.'],
      },
    ],
  },

  // ── BÀI 69 (trang 102–105) ────────────────────────────────────────────────
  {
    id: 'bai-69', number: 69, title: 'Ôn tập phép cộng, phép trừ trong phạm vi 100',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính nhẩm.',
        blanks: [
          calc('a) ', 50, '+', 30, true), calc('', 80, '−', 50, true), calc('', 80, '−', 30, true),
          calc('b) ', 70, '+', 30, true), calc('', 100, '−', 70, true), calc('', 100, '−', 30, true),
          calc('c) ', 50, '+', 50, true), calc('', 90, '−', 30, true), calc('', 100, '−', 60, true),
        ],
        hints: ['Nhẩm theo chục: 5 chục + 3 chục = 8 chục.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [
          calc('a) ', 48, '+', 6), calc('', 25, '+', 69), calc('', 56, '+', 37),
          calc('b) ', 62, '−', 8), calc('', 73, '−', 46), calc('', 80, '−', 59),
        ],
        hints: ['Viết các chữ số cùng hàng thẳng cột, rồi tính từ phải sang trái. Nhớ cộng thêm hoặc trừ đi số nhớ.'],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '3. Tô màu đỏ vào những đám mây ghi phép tính có kết quả bé hơn 56, màu xanh vào những đám mây ghi phép tính có kết quả lớn hơn 75.\nChọn màu cho mỗi đám mây (đám mây không cần tô thì chọn "Không tô").',
        rows: [
          { left: '50 + 4', options: COLOR3('Đỏ', 'Xanh'), answer: 'Đỏ' },
          { left: '88 − 40', options: COLOR3('Đỏ', 'Xanh'), answer: 'Đỏ' },
          { left: '57 + 20', options: COLOR3('Đỏ', 'Xanh'), answer: 'Xanh' },
          { left: '82 − 2', options: COLOR3('Đỏ', 'Xanh'), answer: 'Xanh' },
          { left: '60 + 24', options: COLOR3('Đỏ', 'Xanh'), answer: 'Xanh' },
          { left: '91 − 21', options: COLOR3('Đỏ', 'Xanh'), answer: 'Không tô' },
        ],
        hints: ['Tính kết quả của từng đám mây trước, rồi so sánh với 56 và 75.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '4. Quãng đường Hà Nội – Ninh Bình dài 80 km. Quãng đường Hà Nội – Bắc Giang dài 62 km. Hỏi quãng đường Hà Nội – Ninh Bình dài hơn quãng đường Hà Nội – Bắc Giang bao nhiêu ki-lô-mét?',
        blanks: [{ label: 'Số ki-lô-mét dài hơn', answer: '18', validate: unitValidate(18, 'km') }],
        hints: ['Tìm phần dài hơn thì làm phép trừ.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB69T1Q5,
        q: '5. Số?',
        blanks: [
          { label: `a) ${shape('sq')} ...`, answer: '42' },
          { label: `${shape('tri')} ...`, answer: '13' },
          { label: `b) ${shape('dia')} ...`, answer: '56' },
          { label: `${shape('tri')} ...`, answer: '82' },
          { label: `${shape('sq')} ...`, answer: '75' },
        ],
        hints: ['Làm lần lượt theo chiều mũi tên, lấy kết quả vừa tính để tính tiếp.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB69T2Q1,
        q: '1. Đ, S?',
        blanks: [ds('a) 27 + 6 = 87', false), ds('b) 81 − 7 = 74', true), ds('c) 36 + 48 = 84', true), ds('d) 75 − 39 = 46', false)],
        hints: ['Xem các chữ số đã viết thẳng cột chưa, rồi tính lại từng phép tính.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Đặt tính rồi tính.',
        blanks: [
          calc('a) ', 39, '+', 36), calc('', 66, '+', 28), calc('', 7, '+', 85),
          calc('b) ', 85, '−', 56), calc('', 93, '−', 88), calc('', 52, '−', 9),
        ],
        hints: ['Viết các chữ số cùng hàng thẳng cột, rồi tính từ phải sang trái.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '3. Tô màu vàng vào quả bóng ghi phép tính có kết quả bé nhất, màu tím vào quả bóng ghi phép tính có kết quả lớn nhất.\nChọn màu cho mỗi quả bóng (quả bóng không cần tô thì chọn "Không tô").',
        rows: [
          { left: '35 + 50', options: COLOR3('Vàng', 'Tím'), answer: 'Tím' },
          { left: '86 − 26', options: COLOR3('Vàng', 'Tím'), answer: 'Vàng' },
          { left: '80 + 4', options: COLOR3('Vàng', 'Tím'), answer: 'Không tô' },
          { left: '100 − 30', options: COLOR3('Vàng', 'Tím'), answer: 'Không tô' },
        ],
        hints: ['Tính kết quả của cả bốn quả bóng rồi so sánh.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '4. Trong ngày sinh nhật bà, Việt hỏi: “Bà ơi, năm nay bà bao nhiêu tuổi?”. Bà nói: “Cháu tính nhé! Năm nay ông 65 tuổi, bà kém ông 6 tuổi.” Em hãy cùng Việt tính tuổi của bà.',
        blanks: [{ label: 'Tuổi của bà', answer: '59', validate: unitValidate(59, 'tuổi') }],
        hints: ['Bà kém ông 6 tuổi nghĩa là bà ít tuổi hơn ông 6 tuổi.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '5. a) Tính.\nb) Viết tiếp vào chỗ chấm cho thích hợp.\nTìm hiệu của số tròn chục lớn nhất có hai chữ số và số bé nhất có hai chữ số giống nhau.',
        blanks: [
          { label: 'a) 76 + 18 − 9 = ...', answer: '85' },
          { label: '81 − 54 + 8 = ...', answer: '35' },
          { label: 'b) • Số tròn chục lớn nhất có hai chữ số là: ...', answer: '90' },
          { label: '• Số bé nhất có hai chữ số giống nhau là: ...', answer: '11' },
          { label: '• Hiệu của hai số trên là: ...', answer: '79' },
        ],
        hints: ['Câu a): tính lần lượt từ trái sang phải.', 'Số tròn chục có chữ số hàng đơn vị là 0.'],
      },
      {
        type: 'compare', section: 'Tiết 3',
        q: '1. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Tổng của 46 và 38 là:', options: ['A. 84', 'B. 85', 'C. 74'], answer: 'A' },
          { left: 'b) Hiệu của 81 và 57 là:', options: ['A. 34', 'B. 24', 'C. 42'], answer: 'B' },
          { left: 'c) Kết quả tính 58 + 5 − 29 là:', options: ['A. 63', 'B. 44', 'C. 34'], answer: 'C' },
          { left: 'd) Kết quả tính 44 − 6 + 46 là:', options: ['A. 38', 'B. 84', 'C. 85'], answer: 'B' },
        ],
        hints: ['Tổng là kết quả phép cộng, hiệu là kết quả phép trừ. Tính từ trái sang phải.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB69T3Q2,
        q: '2. Viết chữ số thích hợp vào ô trống.',
        blanks: [
          { label: 'a) 48 + ... = ...2', boxes: true, answer: '4,5', validate: listValidate(['4', '5']) },
          { label: 'b) 62 − ... = ...7', boxes: true, answer: '5,5', validate: listValidate(['5', '5']) },
          { label: 'c) 5... + ...8 = 96', boxes: true, answer: '8,3', validate: listValidate(['8', '3']) },
          { label: 'd) 8... − ...9 = 54', boxes: true, answer: '3,2', validate: listValidate(['3', '2']) },
        ],
        hints: ['Tìm chữ số hàng đơn vị trước, nhớ phép tính có nhớ, rồi mới tìm chữ số hàng chục.'],
      },
      {
        type: 'compare', section: 'Tiết 3',
        q: '3. >; <; = ?',
        rows: [
          { left: '56', right: '34 + 19', answer: '>' },
          { left: '36', right: '82 − 46', answer: '=' },
          { left: '94 − 27', right: '48 + 25', answer: '<' },
          { left: '48 + 45', right: '94 − 5', answer: '>' },
        ],
        hints: ['Tính kết quả các phép tính trước rồi so sánh.'],
      },
      {
        type: 'fill', section: 'Tiết 3', wordProblem: true,
        q: '4. Mai cân nặng 25 kg, Mi cân nặng 16 kg. Hỏi Mai cân nặng hơn Mi bao nhiêu ki-lô-gam?',
        blanks: [{ label: 'Số ki-lô-gam Mai nặng hơn Mi', answer: '9', validate: unitValidate(9, 'kg') }],
        hints: ['Tìm phần nặng hơn thì làm phép trừ.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB69T3Q5,
        q: '5. Số?',
        blanks: [
          { label: `a) ${shape('dia')} ...`, answer: '74' },
          { label: `${shape('tri')} ...`, answer: '39' },
          { label: `${shape('sq')} ...`, answer: '86' },
          { label: `b) ${shape('sq')} ...`, answer: '30' },
          { label: `+ ${shape('box')} ...`, answer: '9' },
        ],
        hints: ['Làm lần lượt theo chiều mũi tên.', 'Câu b): số ở ô vuông cộng với bao nhiêu thì được 39?'],
      },
    ],
  },

  // ── BÀI 70 (trang 106–110) ────────────────────────────────────────────────
  {
    id: 'bai-70', number: 70, title: 'Ôn tập phép cộng, phép trừ trong phạm vi 1 000',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính nhẩm.',
        blanks: [
          calc('a) ', 400, '+', 500, true), calc('', 700, '+', 300, true), calc('', 800, '+', 80, true),
          calc('b) ', 600, '+', 400, true), calc('', 1000, '−', 600, true), calc('', 1000, '−', 400, true),
          calc('c) ', 900, '−', 300, true), calc('', 1000, '−', 500, true), calc('', 740, '−', 40, true),
        ],
        hints: ['Nhẩm theo trăm: 4 trăm + 5 trăm = 9 trăm. 10 trăm là 1 000.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [
          calc('a) ', 243, '+', 535), calc('', 327, '+', 456), calc('', 864, '+', 72),
          calc('b) ', 878, '−', 642), calc('', 961, '−', 725), calc('', 609, '−', 57),
        ],
        hints: ['Viết các chữ số cùng hàng thẳng cột, rồi tính từ hàng đơn vị, đến hàng chục, hàng trăm.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: `3. Nối ô trống với phép tính thích hợp (theo mẫu).\n${mau('475 + 200 → ☐ > 650')}`,
        left: [
          { id: 'x675', text: '475 + 200' }, { id: 'x493', text: '193 + 300' }, { id: 'x470', text: '890 − 420' },
          { id: 'x700', text: '954 − 254' }, { id: 'x660', text: '615 + 45' }, { id: 'x430', text: '730 − 300' },
        ],
        right: [{ id: 'gt650', text: '☐ > 650' }, { id: 'lt500', text: '☐ < 500' }],
        pairs: [['x675', 'gt650'], ['x493', 'lt500'], ['x470', 'lt500'], ['x700', 'gt650'], ['x660', 'gt650'], ['x430', 'lt500']],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB70T1Q4,
        // The km labels on the scanned map are too small to read on a screen, so
        // they are repeated above the first answer line (read off the page at 600 dpi).
        q: '4. Quan sát một số tuyến đường bộ trong hình rồi viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          word('<small>(Số ki-lô-mét ghi trên hình: Hà Nội – Cao Bằng 240 km; Hà Nội – Vinh 308 km; Vinh – Đà Nẵng 463 km; Đà Nẵng – Thành phố Hồ Chí Minh 858 km; Thành phố Hồ Chí Minh – Cần Thơ 174 km.)</small><br>a) Trong hai địa điểm Cao Bằng và Vinh thì ... gần Hà Nội hơn.', 'Cao Bằng'),
          { label: 'b) Quãng đường Đà Nẵng – Cần Thơ (qua Thành phố Hồ Chí Minh) dài:', answer: '1032 km', validate: resultValidate(1032) },
          { label: 'c) Quãng đường Đà Nẵng – Thành phố Hồ Chí Minh dài hơn quãng đường Đà Nẵng – Vinh là:', answer: '395 km', validate: resultValidate(395) },
        ],
        hints: ['Đi qua hai đoạn đường thì cộng hai quãng đường; tìm phần dài hơn thì làm phép trừ.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB70T1Q5,
        q: '5. Số?',
        blanks: [
          { label: 'Hàng thứ hai (từ dưới lên): 150, 90, 100, ...', answer: '95' },
          { label: 'Hàng thứ ba: 240, ..., ...', answer: '190,195', validate: listValidate(['190', '195']) },
          { label: 'Hàng thứ tư: ..., ...', answer: '430,385', validate: listValidate(['430', '385']) },
          { label: 'Viên gạch trên cùng: ...', answer: '815' },
        ],
        hints: ['Xem các viên gạch đã có số: 150 = 100 + 50, 90 = 50 + 40. Mỗi viên gạch bằng tổng hai viên gạch ngay bên dưới nó.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB70T2Q1,
        q: '1. Đ, S?',
        blanks: [ds('a) 367 + 25 = 392', true), ds('b) 572 − 38 = 192', false), ds('c) 451 + 465 = 816', false), ds('d) 784 − 629 = 155', true)],
        hints: ['Xem các chữ số đã viết thẳng cột chưa, rồi tính lại từng phép tính.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Đặt tính rồi tính.',
        blanks: [
          calc('a) ', 9, '+', 582), calc('', 56, '+', 763), calc('', 358, '+', 425),
          calc('b) ', 434, '−', 8), calc('', 692, '−', 86), calc('', 937, '−', 561),
        ],
        hints: ['Viết các chữ số cùng hàng thẳng cột, rồi tính từ phải sang trái.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB70T2Q3,
        q: '3. Số?',
        blanks: [
          { label: `a) ${shape('sq')} ...`, answer: '448' },
          { label: `${shape('tri')} ...`, answer: '200' },
          { label: `b) ${shape('sq')} ...`, answer: '773' },
          { label: `${shape('tri')} ...`, answer: '973' },
        ],
        hints: ['Làm lần lượt theo chiều mũi tên, lấy kết quả vừa tính để tính tiếp.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. a) Tính.\nb) >; <; = ?',
        blanks: [
          { label: 'a) 425 + 248 − 56 = ...', answer: '617' },
          { label: '967 − 674 + 80 = ...', answer: '373' },
          { label: 'b) 400 + 30 ... 450', boxes: true, answer: '<', validate: signValidate('<') },
          { label: '790 − 400 ... 600 − 200', boxes: true, answer: '<', validate: signValidate('<') },
        ],
        hints: ['Tính lần lượt từ trái sang phải.', 'Câu b): tính kết quả mỗi bên trước rồi so sánh.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '5. Để ủng hộ các bạn vùng bị lũ lụt, trường Thắng Lợi quyên góp được 325 bộ quần áo. Trường Hoà Bình quyên góp được nhiều hơn trường Thắng Lợi 28 bộ quần áo. Hỏi trường Hoà Bình quyên góp được bao nhiêu bộ quần áo?',
        blanks: [{ label: 'Số bộ quần áo trường Hoà Bình quyên góp được', answer: '353', validate: unitValidate(353, 'bộ quần áo') }],
        hints: ['"Nhiều hơn" thì làm phép cộng.'],
      },
      {
        type: 'compare', section: 'Tiết 3',
        q: '1. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Tổng của 567 và 329 là:', options: ['A. 886', 'B. 896', 'C. 986'], answer: 'B' },
          { left: 'b) Hiệu của 783 và 65 là:', options: ['A. 718', 'B. 728', 'C. 133'], answer: 'A' },
          { left: 'c) Kết quả tính 653 + 74 − 60 là:', options: ['A. 727', 'B. 767', 'C. 667'], answer: 'C' },
        ],
        hints: ['Đặt tính ra nháp rồi tính, chú ý các phép tính có nhớ.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB70T3Q2,
        q: '2. Số?',
        blanks: [
          { label: `a) ${shape('dia')} ...`, answer: '592' },
          { label: `${shape('tri')} ...`, answer: '512' },
          { label: `${shape('sq')} ...`, answer: '520' },
          { label: `b) ${shape('dia')} ...`, answer: '500' },
          { label: `+ ${shape('box')} ...`, answer: '100' },
        ],
        hints: ['Làm lần lượt theo chiều mũi tên.', 'Câu b): số ở hình thoi cộng với bao nhiêu thì được 600?'],
      },
      {
        type: 'fill', section: 'Tiết 3', wordProblem: true,
        q: '3. Giải bài toán theo tóm tắt sau:\n<i>Tóm tắt</i>\nNam cao: 121 cm\nViệt cao: 117 cm\nNam cao hơn Việt: ... cm?',
        blanks: [{ label: 'Số xăng-ti-mét Nam cao hơn Việt', answer: '4', validate: unitValidate(4, 'cm') }],
        hints: ['Tìm phần cao hơn thì làm phép trừ.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB70T3Q4,
        q: '4. Viết chữ số thích hợp vào ô trống.',
        blanks: [
          { label: 'a) 427 + 4... = ......3', boxes: true, answer: '6,4,7', validate: listValidate(['6', '4', '7']) },
          { label: 'b) 649 − 9... = ......5', boxes: true, answer: '4,5,5', validate: listValidate(['4', '5', '5']) },
          { label: 'c) 9...1 − 656 = ...2...', boxes: true, answer: '8,3,5', validate: listValidate(['8', '3', '5']) },
        ],
        hints: ['Tìm chữ số hàng đơn vị trước, rồi đến hàng chục, hàng trăm. Nhớ số nhớ khi cộng, trừ có nhớ.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '5. Viết tiếp vào chỗ chấm cho thích hợp.\nTìm tổng của số bé nhất có ba chữ số khác nhau và số bé nhất có ba chữ số.',
        blanks: [
          { label: '• Số bé nhất có ba chữ số khác nhau là: ...', answer: '102' },
          { label: '• Số bé nhất có ba chữ số là: ...', answer: '100' },
          { label: '• Tổng của hai số trên là: ...', answer: '202', validate: resultValidate(202) },
        ],
        hints: ['Chữ số hàng trăm không được là 0.'],
      },
    ],
  },
];
