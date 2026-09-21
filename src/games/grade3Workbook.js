/**
 * Lớp 3 — Vở Bài Tập Toán 3 (Tập Một)
 * Nguồn: Vở bài tập Toán 3 — Tập một, bộ sách "Kết nối tri thức với cuộc sống" (NXB Giáo dục Việt Nam).
 * Ảnh minh họa được cắt trực tiếp từ các trang có hình vẽ/sơ đồ không thể diễn tả bằng chữ.
 */

import imgBai2Flowchart from '../assets/grade3-workbook/bai2_ex2_flowchart.png';
import imgBai2Flowers from '../assets/grade3-workbook/bai2_ex3_flowers.png';
import imgBai2Shapes from '../assets/grade3-workbook/bai2_ex4_shapes.png';
import imgBai4Flowchart from '../assets/grade3-workbook/bai4_ex3_flowchart.png';
import imgBai6Flowchart from '../assets/grade3-workbook/bai6_ex3_flowchart.png';
import imgClock1 from '../assets/grade3-workbook/bai7_clock1.png';
import imgClock2 from '../assets/grade3-workbook/bai7_clock2.png';
import imgClock3 from '../assets/grade3-workbook/bai7_clock3.png';
import imgClock4 from '../assets/grade3-workbook/bai7_clock4.png';
import imgBai7Pattern from '../assets/grade3-workbook/bai7_ex1b_pattern.png';
import imgBai7Triangle from '../assets/grade3-workbook/bai7_ex2_triangle.png';
import imgBai7Trapezoid from '../assets/grade3-workbook/bai7_ex5_trapezoid.png';
import imgObjBall from '../assets/grade3-workbook/bai7_obj_ball.png';
import imgObjBowl from '../assets/grade3-workbook/bai7_obj_bowl.png';
import imgObjBox from '../assets/grade3-workbook/bai7_obj_box.png';
import imgObjCup from '../assets/grade3-workbook/bai7_obj_cup.png';
import imgObjWardrobe from '../assets/grade3-workbook/bai7_obj_wardrobe.png';
import imgScales from '../assets/grade3-workbook/bai7t2_ex1_scales.png';
import imgAlarmClock from '../assets/grade3-workbook/bai7t2_ex2_clock.png';
import imgBai8Flowchart from '../assets/grade3-workbook/bai8_ex5_flowchart.png';
import imgBai8Pyramid from '../assets/grade3-workbook/bai8_ex5_pyramid.png';
import imgBai8Circles from '../assets/grade3-workbook/bai8_ex5b_circles.png';
import imgBai9Flowchart from '../assets/grade3-workbook/bai9_ex3_flowchart.png';
import imgBai11Flowchart from '../assets/grade3-workbook/bai11_ex2_flowchart.png';
import imgBai12Flowchart from '../assets/grade3-workbook/bai12_t2_ex2_flowchart.png';
import imgBai14Circles from '../assets/grade3-workbook/bai14_ex1_circles.png';
import imgBai14Grids from '../assets/grade3-workbook/bai14_ex3_grids.png';
import imgBai14Shapes from '../assets/grade3-workbook/bai14_ex4_shapes.png';
import imgBai14T2Squares from '../assets/grade3-workbook/bai14_t2_ex1_squares.png';
import imgBai14T2Circles2a from '../assets/grade3-workbook/bai14_t2_ex2a_circles.png';
import imgBai14T2Circles2b from '../assets/grade3-workbook/bai14_t2_ex2b_circles.png';
import imgBai14T2Shapes3 from '../assets/grade3-workbook/bai14_t2_ex3_shapes.png';
import imgBai14T2Shapes4 from '../assets/grade3-workbook/bai14_t2_ex4_shapes.png';
import imgBai14T2FishFlowers from '../assets/grade3-workbook/bai14_t2_ex5_fish_flowers.png';
import imgBai15Clouds from '../assets/grade3-workbook/bai15_ex2_clouds.png';
import imgBai15Flowchart from '../assets/grade3-workbook/bai15_ex3_flowchart.png';
import imgBai15Triangles from '../assets/grade3-workbook/bai15_ex5_triangles.png';
import imgBai15T2Shapes from '../assets/grade3-workbook/bai15_t2_ex3a_shapes.png';
import imgBai15T2Stars from '../assets/grade3-workbook/bai15_t2_ex3b_stars.png';
import imgBai15T2Flowchart from '../assets/grade3-workbook/bai15_t2_ex5_flowchart.png';
import imgBai16Segment from '../assets/grade3-workbook/bai16_ex1_segment.png';
import imgBai16Segments2 from '../assets/grade3-workbook/bai16_ex2_segments.png';
import imgBai16Trapezoid from '../assets/grade3-workbook/bai16_ex3_trapezoid.png';
import imgBai16NumberLine from '../assets/grade3-workbook/bai16_ex4_numberline.png';
import imgBai16T2Ruler from '../assets/grade3-workbook/bai16_t2_ex1_ruler.png';
import imgBai16T2Kangaroo from '../assets/grade3-workbook/bai16_t2_ex3_kangaroo.png';
import imgBai17Circles from '../assets/grade3-workbook/bai17_q1_circles.png';
import imgBai17Bees from '../assets/grade3-workbook/bai17_q3_bees.png';
import imgBai18Angles from '../assets/grade3-workbook/bai18_q1_angles.png';
import imgBai18Shapes from '../assets/grade3-workbook/bai18_q3_shapes.png';
import imgBai19Shape1 from '../assets/grade3-workbook/bai19_q1_shape1.png';
import imgBai19Shape2 from '../assets/grade3-workbook/bai19_q1_shape2.png';
import imgBai19Shape3 from '../assets/grade3-workbook/bai19_q1_shape3.png';
import imgBai19Trapezoid from '../assets/grade3-workbook/bai19_q2_trapezoid.png';
import imgBai19T2Q1aShapes from '../assets/grade3-workbook/bai19_t2_q1a_shapes.png';
import imgBai19T2Q1bShapes from '../assets/grade3-workbook/bai19_t2_q1b_shapes.png';
import imgBai19T2Colored from '../assets/grade3-workbook/bai19_t2_q2_colored.png';
import imgBai19T2Tiles from '../assets/grade3-workbook/bai19_t2_q4_tiles.png';
import imgBai19T3Ant from '../assets/grade3-workbook/bai19_t3_q1_ant.png';
import imgBai19T3Snail from '../assets/grade3-workbook/bai19_t3_q2_snail.png';

// ── TEXT / ANSWER HELPERS ───────────────────────────────────────────────────

function soDoc(n) {
  const ones = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
  const h = Math.floor(n / 100), rem = n % 100, t = Math.floor(rem / 10), u = rem % 10;
  const parts = [];
  if (h > 0) parts.push(ones[h] + ' trăm');
  if (h > 0 && t === 0 && u > 0) parts.push('linh ' + (u === 1 ? 'một' : ones[u]));
  else if (t === 0 && u > 0 && h === 0) parts.push(ones[u]);
  else if (t === 1) parts.push('mười' + (u === 0 ? '' : u === 1 ? ' một' : u === 5 ? ' lăm' : ' ' + ones[u]));
  else if (t >= 2) parts.push(ones[t] + ' mươi' + (u === 0 ? '' : u === 1 ? ' mốt' : u === 5 ? ' lăm' : ' ' + ones[u]));
  if (parts.length === 0) return 'không';
  return parts.join(' ');
}

function foldVN(s) {
  return String(s).toLowerCase().trim().replace(/\s+/g, ' ')
    .replace(/mốt/g, 'một').replace(/lăm/g, 'năm').replace(/linh/g, 'lẻ');
}

function textValidate(expected) {
  const target = foldVN(expected);
  return (value) => foldVN(value) === target;
}

function sumValidate(target) {
  return (value) => {
    const parts = String(value).split('+').map(s => parseFloat(s.trim().replace(',', '.')));
    if (parts.some(Number.isNaN)) return false;
    return parts.reduce((a, b) => a + b, 0) === target;
  };
}

function setValidate(expectedArr) {
  const norm = (arr) => arr.map(x => String(x).trim().toUpperCase()).filter(Boolean).sort().join(',');
  const target = norm(expectedArr);
  return (value) => norm(String(value).split(/[,;\s]+/)) === target;
}

function listValidate(expectedArr) {
  const norm = (arr) => arr.map(x => foldVN(x)).filter(Boolean).join('|');
  const target = norm(expectedArr);
  return (value) => norm(String(value).split(/[,;>]+/)) === target;
}

function blank(answer, opts = {}) {
  return { blank: true, answer: String(answer), ...opts };
}

// "Đ, S ?" true/false blanks (Bài 14, Bài 16): a plain default compare would
// reject a very likely typo — typing the plain ASCII "d" instead of the
// Vietnamese "Đ" (they look alike, and not every on-screen keyboard makes
// "Đ" easy to reach) — so accept both, plus the written-out words.
function dsValidate(isTrue) {
  const accepted = isTrue ? ['đ', 'd', 'đúng', 'dung'] : ['s', 'sai'];
  return (value) => accepted.includes(String(value).trim().toLowerCase());
}

// Bài 13 Tiết 2 Q4: "lập được các phép nhân hoặc phép chia thích hợp" from
// three of the given numbers has 4 equally-valid written forms (a × b = p,
// b × a = p, p : a = b, p : b = a) — accept any one of them, in either ×/x
// or :/÷ notation.
function factFamilyValidate(a, b, product) {
  const valid = new Set([
    `${a}x${b}=${product}`, `${b}x${a}=${product}`,
    `${product}:${a}=${b}`, `${product}:${b}=${a}`,
  ]);
  return (value) => {
    const norm = String(value).toLowerCase().replace(/\s+/g, '').replace(/[×*]/g, 'x').replace(/÷/g, ':');
    return valid.has(norm);
  };
}

// Order-independent validator for a list of letter-groups (each group's own
// internal letter order doesn't matter, e.g. naming a radius "IA" or "AI",
// and the order the groups are listed in doesn't matter either). Reused for:
// Bài 17 radii/diameter ("IA, IB", "MN"), Bài 19 shape edges ("DE, EH, HD")
// and shape enumeration ("ABI, ICD, IBC").
function letterGroupsValidate(expectedGroups) {
  const normGroup = (s) => String(s).trim().toUpperCase().replace(/[^A-ZÀ-Ỹ]/g, '').split('').sort().join('');
  const target = expectedGroups.map(normGroup).sort().join('|');
  return (value) => {
    const got = String(value).split(/[,;]+/).map(normGroup).filter(Boolean).sort().join('|');
    return got === target;
  };
}

// Bài 18's "Góc đỉnh ...; cạnh ..., ..." rows have 3 slots: the vertex letter,
// then its two rays' endpoint letters. The book prints 2 interchangeable rows
// under "a) Các góc vuông là" and 4 under "b) Các góc không vuông là", so a row
// accepts ANY angle belonging to its own group — filling them in a different
// order than the answer key is still correct. Each ray name also accepts either
// letter order ("AB" or "BA"), and the two rays may be listed in either order.
function angleGroupValidate(angles) {
  const normPair = (s) => String(s).trim().toUpperCase().replace(/[^A-Z]/g, '').split('').sort().join('');
  const key = (vertex, rayEnds) => {
    const V = vertex.trim().toUpperCase();
    return V + '#' + rayEnds.map(e => normPair(V + e)).sort().join('|');
  };
  const targets = angles.map(([v, ends]) => key(v, ends));
  return (value) => {
    const parts = String(value).split(',').map(s => s.trim());
    if (parts.length < 3) return false;
    const got = parts[0].toUpperCase().replace(/[^A-Z]/g, '') + '#'
      + parts.slice(1, 3).map(normPair).sort().join('|');
    return targets.includes(got);
  };
}
const bai18RightAngles = angleGroupValidate([['A', ['B', 'C']], ['R', ['Q', 'P']]]);
const bai18OtherAngles = angleGroupValidate([['I', ['L', 'T']], ['M', ['N', 'P']], ['G', ['H', 'K']], ['E', ['X', 'Y']]]);

// ── CONTENT: BÀI 1–8 (Tập Một) ──────────────────────────────────────────────

const UNITS = [
  {
    id: 'bai-1', number: 1, title: 'Ôn tập các số đến 1 000',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Viết số và cách đọc số thích hợp vào ô trống (theo mẫu).',
        headers: ['Trăm', 'Chục', 'Đơn vị', 'Viết số', 'Đọc số'],
        rows: [
          { sample: true, cells: [3, 7, 5, 375, soDoc(375)] },
          [4, 0, 4, blank(404), blank(soDoc(404), { validate: textValidate(soDoc(404)) })],
          [7, 3, 1, blank(731), blank(soDoc(731), { validate: textValidate(soDoc(731)) })],
          [8, 8, 8, blank(888), blank(soDoc(888), { validate: textValidate(soDoc(888)) })],
        ],
        hints: ['Chữ số ở cột "Trăm" cho biết số trăm, cột "Chục" cho biết số chục, cột "Đơn vị" cho biết số đơn vị — ghép lại theo đúng thứ tự để viết số.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Nối (theo mẫu).',
        left: [
          { id: 'l1', text: 'Số gồm 7 trăm, 0 chục và 7 đơn vị.' },
          { id: 'l2', text: 'Số gồm 2 trăm, 3 chục và 1 đơn vị.' },
          { id: 'l3', text: 'Số gồm 5 trăm, 5 chục và 5 đơn vị.' },
          { id: 'l4', text: 'Số gồm 9 trăm, 8 chục và 4 đơn vị.' },
        ],
        right: [
          { id: 'r984', text: '984' }, { id: 'r555', text: '555' },
          { id: 'r707', text: '707' }, { id: 'r231', text: '231' },
        ],
        pairs: [['l1', 'r707'], ['l2', 'r231'], ['l3', 'r555'], ['l4', 'r984']],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Viết các số dưới đây thành tổng các trăm, chục và đơn vị.',
        blanks: [
          { label: '139 = ...', answer: '100+30+9', validate: sumValidate(139) },
          { label: '321 = ...', answer: '300+20+1', validate: sumValidate(321) },
          { label: '803 = ...', answer: '800+3', validate: sumValidate(803) },
          { label: '950 = ...', answer: '900+50', validate: sumValidate(950) },
          { label: '777 = ...', answer: '700+70+7', validate: sumValidate(777) },
          { label: '614 = ...', answer: '600+10+4', validate: sumValidate(614) },
        ],
        hints: ['Xác định chữ số hàng trăm, hàng chục, hàng đơn vị rồi viết mỗi chữ số kèm giá trị hàng của nó, ví dụ 139 = 100 + 30 + 9.'],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '4. Số?',
        headers: ['Số liền trước', 'Số đã cho', 'Số liền sau'],
        rows: [
          [blank(119), 120, blank(121)],
          [blank(499), 500, blank(501)],
          [120, blank(121), blank(122)],
          [blank(298), blank(299), 300],
        ],
        hints: ['Số liền trước nhỏ hơn số đã cho 1 đơn vị; số liền sau lớn hơn số đã cho 1 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '5. Viết số thích hợp vào chỗ chấm để được ba số liên tiếp.',
        blanks: [
          { label: 'a) 35, ..., ...', answer: '36,37', validate: listValidate(['36', '37']) },
          { label: 'b) ..., 40, ...', answer: '39,41', validate: listValidate(['39', '41']) },
        ],
        hints: ['Ba số liên tiếp hơn kém nhau 1 đơn vị.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '1. >; <; = ?',
        rows: [
          { left: '770', right: '707', answer: '>' },
          { left: '989', right: '990', answer: '<' },
          { left: '1 000', right: '999', answer: '>' },
          { left: '453', right: '400 + 50 + 3', answer: '=' },
          { left: '660', right: '600 + 50 + 9', answer: '>' },
          { left: '300 + 10 + 9', right: '300 + 20', answer: '<' },
        ],
        hints: ['Với vế có tổng các trăm/chục/đơn vị, hãy tính giá trị của tổng đó trước khi so sánh.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. Số?',
        rows: [
          { label: 'a)', cells: [400, 401, 402, blank(403), blank(404), blank(405), blank(406), 407, blank(408), 409] },
          { label: 'b)', cells: [900, 899, 898, blank(897), blank(896), blank(895), blank(894), 893, blank(892), 891] },
        ],
        hints: ['a) Mỗi số trong dãy hơn số đứng trước nó 1 đơn vị.', 'b) Mỗi số trong dãy kém số đứng trước nó 1 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Viết các số 786, 768, 867, 687 theo thứ tự.',
        blanks: [
          { label: 'a) Từ lớn đến bé', answer: '867, 786, 768, 687', validate: listValidate(['867', '786', '768', '687']) },
          { label: 'b) Từ bé đến lớn', answer: '687, 768, 786, 867', validate: listValidate(['687', '768', '786', '867']) },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Ba con gấu có cân nặng lần lượt là 243 kg, 231 kg, 234 kg. Biết gấu trắng nặng nhất, gấu nâu nhẹ hơn gấu đen. Vậy gấu trắng cân nặng ... kg; gấu nâu cân nặng ... kg; gấu đen cân nặng ... kg.',
        blanks: [
          { label: 'Gấu trắng (kg)', answer: '243' },
          { label: 'Gấu nâu (kg)', answer: '231' },
          { label: 'Gấu đen (kg)', answer: '234' },
        ],
        hints: ['Số lớn nhất trong ba số là cân nặng của gấu trắng.', 'Trong hai số còn lại, số bé hơn là gấu nâu (vì gấu nâu nhẹ hơn gấu đen).'],
      },
    ],
  },

  {
    id: 'bai-2', number: 2, title: 'Ôn tập phép cộng, phép trừ trong phạm vi 1 000',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính nhẩm.',
        blanks: [
          { label: '60 + 20 =', answer: '80' }, { label: '500 + 300 =', answer: '800' }, { label: '900 + 100 =', answer: '1000' },
          { label: '80 − 60 =', answer: '20' }, { label: '800 − 500 =', answer: '300' }, { label: '1 000 − 900 =', answer: '100' },
          { label: '80 − 20 =', answer: '60' }, { label: '800 − 300 =', answer: '500' }, { label: '1 000 − 100 =', answer: '900' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [
          { label: '47 + 53', answer: '100' }, { label: '100 − 35', answer: '65' },
          { label: '275 + 18', answer: '293' }, { label: '482 − 247', answer: '235' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Con lợn cân nặng 75 kg, con chó cân nặng 25 kg. Hỏi:',
        wordProblem: true,
        blanks: [
          { label: 'a) Con lợn và con chó cân nặng tất cả bao nhiêu ki-lô-gam?', answer: '100' },
          { label: 'b) Con chó nhẹ hơn con lợn bao nhiêu ki-lô-gam?', answer: '50' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgBai2Shapes,
        q: '4. Chọn câu trả lời đúng.\nPhép tính ghi ở hình nào có kết quả lớn nhất?',
        options: ['Hình tam giác (225 + 38)', 'Hình tròn (281 − 19)', 'Hình chữ nhật (125 + 161)'],
        answer: 2,
        hints: ['Tính kết quả của cả ba phép tính rồi so sánh.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        tables: [
          { label: 'a)', rows: [['Số hạng', 216, 308, 451], ['Số hạng', 432, 327, 173], ['Tổng', blank(648), blank(635), blank(624)]] },
          { label: 'b)', rows: [['Số bị trừ', 456, 527, 634], ['Số trừ', 231, 342, 208], ['Hiệu', blank(225), blank(185), blank(426)]] },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai2Flowchart,
        q: '2. Số?\n(Hai sơ đồ tính liên tiếp: vòng tròn → lục giác → ô vuông/tròn)',
        blanks: [
          { label: 'Sơ đồ 1 — hình lục giác (34 + 48)', answer: '82' },
          { label: 'Sơ đồ 1 — hình vuông (kết quả − 27)', answer: '55' },
          { label: 'Sơ đồ 2 — hình lục giác (100 − 42)', answer: '58' },
          { label: 'Sơ đồ 2 — hình tròn (kết quả − 33)', answer: '25' },
        ],
        hints: ['Đi theo chiều mũi tên, thực hiện phép tính ghi trên mỗi mũi tên với kết quả của ô liền trước.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai2Flowers,
        q: '3. Viết A, B, C, D, E thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Bông hoa ... ghi phép tính có kết quả lớn nhất.', answer: 'B', validate: setValidate(['B']) },
          { label: 'b) Bông hoa ... ghi phép tính có kết quả bé nhất.', answer: 'C', validate: setValidate(['C']) },
          { label: 'c) Hai bông hoa ... và ... ghi hai phép tính có kết quả bằng nhau.', answer: 'A và E', validate: setValidate(['A', 'E']) },
        ],
        hints: ['Tính giá trị của cả 5 phép tính: A = 125+35, B = 168+103, C = 472−317, D = 392−125, E = 270−110.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Một cửa hàng buổi sáng bán được 100 lít nước mắm, buổi chiều bán ít hơn buổi sáng 25 lít nước mắm. Hỏi:',
        wordProblem: true,
        blanks: [
          { label: 'a) Buổi chiều cửa hàng bán được bao nhiêu lít nước mắm?', answer: '75' },
          { label: 'b) Cả hai buổi cửa hàng bán được bao nhiêu lít nước mắm?', answer: '175' },
        ],
      },
    ],
  },

  {
    id: 'bai-3', number: 3, title: 'Tìm thành phần trong phép cộng, phép trừ',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Số?',
        blanks: [
          { label: 'a) ... + 14 = 31', answer: '17' },
          { label: 'b) 45 + ... = 80', answer: '35' },
          { label: 'c) ... + 15 = 100', answer: '85' },
        ],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Số?',
        rows: [
          ['Số hạng', 35, 27, 16, blank(6), blank(32)],
          ['Số hạng', 14, blank(15), blank(34), 36, 68],
          ['Tổng', blank(49), 42, 50, 42, 100],
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Một đội đồng diễn thể dục có 100 người, trong đó có 60 nữ. Hỏi đội đồng diễn đó có bao nhiêu nam?',
        wordProblem: true,
        blanks: [{ label: 'Số nam', answer: '40' }],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Số?\n12 + 28 + ... = 60',
        blanks: [{ label: 'Giá trị cần tìm', answer: '20' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Số?',
        blanks: [
          { label: 'a) ... − 25 = 56', answer: '81' },
          { label: 'b) ... − 35 = 47', answer: '82' },
          { label: 'c) ... − 18 = 82', answer: '100' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Số?',
        blanks: [
          { label: 'a) 72 − ... = 28', answer: '44' },
          { label: 'b) 45 − ... = 10', answer: '35' },
          { label: 'c) 100 − ... = 64', answer: '36' },
        ],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '3. Số?',
        rows: [
          ['Số bị trừ', 72, blank(71), 36, blank(100), 100],
          ['Số trừ', 18, 24, blank(17), 27, blank(59)],
          ['Hiệu', blank(54), 47, 19, 73, 41],
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Rô-bốt có một số viên bi. Sau khi cho Việt 20 viên bi thì Rô-bốt còn lại 15 viên. Hỏi lúc đầu Rô-bốt có bao nhiêu viên bi?',
        wordProblem: true,
        blanks: [{ label: 'Số bi lúc đầu', answer: '35' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '5. Trong thúng có 70 quả trứng. Sau khi mẹ bán đi một số quả trứng thì trong thúng còn lại 15 quả. Hỏi mẹ đã bán đi bao nhiêu quả trứng?',
        wordProblem: true,
        blanks: [{ label: 'Số trứng đã bán', answer: '55' }],
      },
    ],
  },

  {
    id: 'bai-4', number: 4, title: 'Ôn tập bảng nhân 2; 5, bảng chia 2; 5',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        tables: [
          {
            label: 'a)',
            rows: [['Thừa số', 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], ['Thừa số', 1, 3, 5, 7, 9, 2, 4, 6, 8, 10],
              ['Tích', blank(2), blank(6), blank(10), blank(14), blank(18), blank(4), blank(8), blank(12), blank(16), blank(20)]],
          },
          {
            label: 'b)',
            rows: [['Số bị chia', 20, 18, 16, 14, 12, 10, 8, 6, 4, 2], ['Số chia', 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
              ['Thương', blank(10), blank(9), blank(8), blank(7), blank(6), blank(5), blank(4), blank(3), blank(2), blank(1)]],
          },
        ],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Số?',
        rows: [
          { label: 'a)', cells: [2, blank(4), 6, blank(8), 10, 12, blank(14), blank(16), 18, 20] },
          { label: 'b)', cells: [20, 18, blank(16), 14, blank(12), blank(10), blank(8), 6, 4, 2] },
        ],
        hints: ['a) Mỗi số trong dãy hơn số đứng trước nó 2 đơn vị.', 'b) Mỗi số trong dãy kém số đứng trước nó 2 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai4Flowchart,
        q: '3. Số?',
        blanks: [
          { label: 'Hình lục giác (8 : 2)', answer: '4' },
          { label: 'Hình vuông (kết quả : 2)', answer: '2' },
          { label: 'Hình tròn (kết quả × 7)', answer: '14' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Mỗi lọ hoa cắm 2 bông hoa cúc. Hỏi 6 lọ như vậy có bao nhiêu bông hoa cúc?',
        wordProblem: true,
        blanks: [{ label: 'Số bông hoa cúc', answer: '12' }],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        tables: [
          {
            label: 'a)',
            rows: [['×', 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], ['', 1, 3, 5, 7, 9, 2, 4, 6, 8, 10],
              ['', blank(5), blank(15), blank(25), blank(35), blank(45), blank(10), blank(20), blank(30), blank(40), blank(50)]],
          },
          {
            label: 'b)',
            rows: [[':', 5, 10, 15, 20, 25, 30, 35, 40, 45, 50], ['', 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
              ['', blank(1), blank(2), blank(3), blank(4), blank(5), blank(6), blank(7), blank(8), blank(9), blank(10)]],
          },
        ],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '2. Nối (theo mẫu).',
        left: [
          { id: 'l1', text: '5 × 9' }, { id: 'l2', text: '15 : 5' }, { id: 'l3', text: '10 : 2' },
          { id: 'l4', text: '5 × 7' }, { id: 'l5', text: '5 × 8' }, { id: 'l6', text: '45 : 5' },
        ],
        right: [
          { id: 'r45', text: '45' }, { id: 'r3', text: '3' }, { id: 'r5', text: '5' },
          { id: 'r35', text: '35' }, { id: 'r40', text: '40' }, { id: 'r9', text: '9' },
        ],
        pairs: [['l1', 'r45'], ['l2', 'r3'], ['l3', 'r5'], ['l4', 'r35'], ['l5', 'r40'], ['l6', 'r9']],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '3. >; <; = ?',
        rows: [
          { left: '5 × 3', right: '40 : 5', answer: '>' },
          { left: '45 : 5', right: '2 × 6', answer: '<' },
          { left: '50 : 5', right: '5 × 2', answer: '=' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Cắm 50 bông hoa cúc vào các lọ, mỗi lọ 5 bông. Hỏi cắm được mấy lọ hoa cúc như vậy?',
        wordProblem: true,
        blanks: [{ label: 'Số lọ hoa', answer: '10' }],
      },
    ],
  },

  {
    id: 'bai-5', number: 5, title: 'Bảng nhân 3, bảng chia 3',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        rows: [['×', 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], ['', 1, 3, 5, 7, 9, 10, 8, 6, 4, 2],
          ['', blank(3), blank(9), blank(15), blank(21), blank(27), blank(30), blank(24), blank(18), blank(12), blank(6)]],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Số?',
        rows: [
          { label: 'a)', cells: [3, 6, 9, blank(12), blank(15), 18, blank(21), 24, blank(27), 30] },
          { label: 'b)', cells: [30, blank(27), 24, 21, blank(18), blank(15), 12, blank(9), 6, 3] },
        ],
        hints: ['a) Mỗi số trong dãy hơn số đứng trước nó 3 đơn vị.', 'b) Mỗi số trong dãy kém số đứng trước nó 3 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Rô-bốt làm những chiếc khung hình tam giác bằng nan tre, mỗi khung cần 3 nan tre. Hỏi để làm 8 chiếc khung như vậy, Rô-bốt cần bao nhiêu nan tre?',
        wordProblem: true,
        blanks: [{ label: 'Số nan tre', answer: '24' }],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '4. >; <; = ?',
        rows: [
          { left: '3 × 5', right: '5 × 3', answer: '=' },
          { left: '3 × 8', right: '3 × 9', answer: '<' },
          { left: '3 × 7', right: '3 × 6', answer: '>' },
        ],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        rows: [[':', 3, 9, 21, 6, 15, 18, 12, 30, 24, 27], ['', 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
          ['', blank(1), blank(3), blank(7), blank(2), blank(5), blank(6), blank(4), blank(10), blank(8), blank(9)]],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '2. Nối (theo mẫu).',
        left: [{ id: 'l1', text: '21 : 3' }, { id: 'l2', text: '6 : 3' }, { id: 'l3', text: '15 : 3' }, { id: 'l4', text: '24 : 3' }, { id: 'l5', text: '18 : 3' }, { id: 'l6', text: '30 : 3' }],
        right: [{ id: 'r7', text: '7' }, { id: 'r2', text: '2' }, { id: 'r5', text: '5' }, { id: 'r8', text: '8' }, { id: 'r6', text: '6' }, { id: 'r10', text: '10' }],
        pairs: [['l1', 'r7'], ['l2', 'r2'], ['l3', 'r5'], ['l4', 'r8'], ['l5', 'r6'], ['l6', 'r10']],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '3. Nối hai phép tính có cùng kết quả (theo mẫu).',
        left: [{ id: 'l1', text: '27 : 3' }, { id: 'l2', text: '3 × 2' }, { id: 'l3', text: '24 : 3' }, { id: 'l4', text: '30 : 3' }, { id: 'l5', text: '10 : 5' }],
        right: [{ id: 'r1', text: '2 × 4' }, { id: 'r2', text: '3 × 3' }, { id: 'r3', text: '6 : 3' }, { id: 'r4', text: '18 : 3' }, { id: 'r5', text: '5 × 2' }],
        pairs: [['l1', 'r2'], ['l2', 'r4'], ['l3', 'r1'], ['l4', 'r5'], ['l5', 'r3']],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Một lớp học võ dân tộc có 30 bạn chia thành các nhóm, mỗi nhóm 3 bạn. Hỏi lớp học đó được chia thành bao nhiêu nhóm như vậy?',
        wordProblem: true,
        blanks: [{ label: 'Số nhóm', answer: '10' }],
      },
    ],
  },

  {
    id: 'bai-6', number: 6, title: 'Bảng nhân 4, bảng chia 4',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        rows: [['Thừa số', 4, 4, 4, 4, 4, 4, 4, 4], ['Thừa số', 6, 5, 8, 3, 10, 7, 9, 4],
          ['Tích', blank(24), blank(20), blank(32), blank(12), blank(40), blank(28), blank(36), blank(16)]],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Số?',
        rows: [
          { label: 'a)', cells: [4, 8, 12, blank(16), blank(20), 24, blank(28), 32, blank(36), 40] },
          { label: 'b)', cells: [40, blank(36), 32, 28, blank(24), blank(20), 16, blank(12), 8, 4] },
        ],
        hints: ['a) Mỗi số trong dãy hơn số đứng trước nó 4 đơn vị.', 'b) Mỗi số trong dãy kém số đứng trước nó 4 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Mỗi bàn ăn xếp 4 cái ghế. Hỏi 10 bàn ăn như vậy xếp bao nhiêu cái ghế?',
        wordProblem: true,
        blanks: [{ label: 'Số cái ghế', answer: '40' }],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Viết số thích hợp vào chỗ chấm.\nMỗi con thỏ có 4 cái chân và 2 cái tai. Vậy 6 con thỏ có tất cả:',
        blanks: [
          { label: 'a) ... cái chân', answer: '24' },
          { label: 'b) ... cái tai', answer: '12' },
        ],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        rows: [['Số bị chia', 12, 24, 20, 36, 32, 8, 40, 28], ['Số chia', 4, 4, 4, 4, 4, 4, 4, 4],
          ['Thương', blank(3), blank(6), blank(5), blank(9), blank(8), blank(2), blank(10), blank(7)]],
      },
      {
        type: 'choice', section: 'Tiết 2',
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.\nPhép tính nào dưới đây có kết quả bé nhất?',
        options: ['24 : 4', '32 : 4', '12 : 4', '20 : 4'],
        answer: 2,
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai6Flowchart,
        q: '3. Số?',
        blanks: [
          { label: 'Hình lục giác (32 : 4)', answer: '8' },
          { label: 'Hình vuông (kết quả : 4)', answer: '2' },
          { label: 'Hình tròn (kết quả : 2)', answer: '1' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Có một số xe ô tô con đang ở điểm đỗ xe. Bạn Nam đếm được có tất cả 16 bánh xe. Hỏi có bao nhiêu xe ô tô con đang ở điểm đỗ đó? Biết rằng mỗi xe ô tô con đều có 4 bánh xe.',
        wordProblem: true,
        blanks: [{ label: 'Số xe ô tô', answer: '4' }],
      },
    ],
  },

  {
    id: 'bai-7', number: 7, title: 'Ôn tập hình học và đo lường',
    questions: [
      {
        type: 'match', section: 'Tiết 1',
        q: '1. a) Nối (theo mẫu).',
        left: [
          { id: 'box', img: imgObjBox },
          { id: 'bowl', img: imgObjBowl },
          { id: 'ball', img: imgObjBall },
          { id: 'wardrobe', img: imgObjWardrobe },
          { id: 'cup', img: imgObjCup },
        ],
        right: [
          { id: 'tru', text: 'Dạng khối trụ' },
          { id: 'cau', text: 'Dạng khối cầu' },
          { id: 'lp', text: 'Dạng khối lập phương' },
          { id: 'hcn', text: 'Dạng khối hộp chữ nhật' },
        ],
        pairs: [['box', 'lp'], ['bowl', 'tru'], ['ball', 'cau'], ['wardrobe', 'hcn'], ['cup', 'tru']],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgBai7Pattern,
        q: '1b. Khoanh vào chữ đặt trước câu trả lời đúng.\nHình thích hợp đặt vào dấu "?" là:',
        options: ['A. Khối trụ', 'B. Khối lập phương', 'C. Khối cầu', 'D. Khối lập phương'], answer: 2,
        hints: ['Các hình lặp lại theo chu kì "trụ, lập phương, cầu, lập phương" — tìm vị trí của dấu "?" trong chu kì đó.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai7Triangle,
        q: '2. Viết tiếp vào chỗ chấm (theo mẫu).\nBa điểm thẳng hàng có trong hình bên là: A, N, B; hãy tìm 3 bộ ba điểm thẳng hàng còn lại.',
        blanks: [
          { label: 'Bộ ba thứ 2', answer: 'B, M, C', validate: setValidate(['B', 'M', 'C']) },
          { label: 'Bộ ba thứ 3', answer: 'A, H, M', validate: setValidate(['A', 'H', 'M']) },
          { label: 'Bộ ba thứ 4', answer: 'C, H, N', validate: setValidate(['C', 'H', 'N']) },
        ],
        hints: ['Nhìn theo từng đường thẳng được vẽ trong hình: có 4 đường thẳng, mỗi đường đi qua đúng 3 điểm đã đánh dấu.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Con kiến bò đến miếng bánh theo đường gấp khúc ABCD với AB = 252 cm, BC = 138 cm, CD = 210 cm. Tính độ dài quãng đường con kiến phải bò.',
        wordProblem: true,
        blanks: [{ label: 'Độ dài quãng đường (cm)', answer: '600' }],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgBai7Trapezoid,
        q: '5. Khoanh vào chữ đặt trước câu trả lời đúng.\nSố hình tứ giác có trong hình bên là:',
        options: ['A. 8', 'B. 7', 'C. 5', 'D. 6'], answer: 3,
        hints: ['Đừng chỉ đếm các hình nhỏ nhất — hãy đếm cả những hình tứ giác được ghép từ 2 hình nhỏ trở lên.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgScales,
        q: '1. Số?',
        blanks: [
          { label: 'a) Quả dưa hấu cân nặng (kg)', answer: '5' },
          { label: 'a) Quả sầu riêng cân nặng (kg)', answer: '2' },
          { label: 'a) Quả sầu riêng nhẹ hơn quả dưa hấu (kg)', answer: '3' },
          { label: 'b) Hai can (bé 10 lít, to 15 lít) — cả hai can có (lít)', answer: '25' },
          { label: 'b) Can to đựng nhiều hơn can bé (lít)', answer: '5' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgAlarmClock,
        q: '2a. Khoanh vào chữ đặt trước câu trả lời đúng.\nĐồng hồ bên đổ chuông lúc:',
        options: ['7 giờ 6 phút', '7 giờ 30 phút', '6 giờ 7 phút', '6 giờ 8 phút'], answer: 1,
      },
      {
        type: 'choice', section: 'Tiết 2',
        q: '2b. Nếu ngày 14 tháng 10 là thứ Bảy thì ngày 20 tháng 10 (ngày Phụ nữ Việt Nam) là:',
        options: ['Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'], answer: 2,
        hints: ['Đếm số ngày từ 14 đến 20 (6 ngày) rồi đếm tiếp từ thứ Bảy.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Cô Bình mua về 15 kg gạo. Biết rằng mỗi tuần gia đình cô Bình ăn hết 5 kg gạo. Hỏi gia đình cô Bình ăn trong mấy tuần thì hết số gạo đó?',
        wordProblem: true,
        blanks: [{ label: 'Số tuần', answer: '3' }],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '4. Nối hai đồng hồ chỉ cùng giờ vào buổi chiều hoặc buổi tối (theo mẫu).',
        left: [{ id: 'c1', img: imgClock1 }, { id: 'c2', img: imgClock2 }, { id: 'c3', img: imgClock3 }, { id: 'c4', img: imgClock4 }],
        right: [{ id: 't2100', text: '21:00' }, { id: 't1515', text: '15:15' }, { id: 't1615', text: '16:15' }, { id: 't2030', text: '20:30' }],
        pairs: [['c1', 't1515'], ['c2', 't2030'], ['c3', 't2100'], ['c4', 't1615']],
      },
    ],
  },

  {
    id: 'bai-8', number: 8, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. a) Viết tên các con vật dưới đây theo thứ tự cân nặng từ lớn đến bé: Gấu đen 118 kg, Báo hoa 85 kg, Linh dương 520 kg, Cá sấu 246 kg.\nb) Viết số thành tổng các trăm, chục và đơn vị (theo mẫu). Mẫu: 457 = 400 + 50 + 7.',
        blanks: [
          { label: 'a) Thứ tự từ lớn đến bé', answer: 'Linh dương, Cá sấu, Gấu đen, Báo hoa', validate: listValidate(['Linh dương', 'Cá sấu', 'Gấu đen', 'Báo hoa']) },
          { label: 'b) 285 = ...', answer: '200+80+5', validate: sumValidate(285) },
          { label: 'b) 666 = ...', answer: '600+60+6', validate: sumValidate(666) },
          { label: 'b) 309 = ...', answer: '300+9', validate: sumValidate(309) },
          { label: 'b) 710 = ...', answer: '700+10', validate: sumValidate(710) },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [
          { label: '38 + 45', answer: '83' }, { label: '463 + 82', answer: '545' }, { label: '638 + 254', answer: '892' },
          { label: '175 − 92', answer: '83' }, { label: '595 − 346', answer: '249' }, { label: '739 − 683', answer: '56' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Trường Tiểu học Nguyễn Trãi có 674 học sinh, Trường Tiểu học Nguyễn Huệ có nhiều hơn Trường Tiểu học Nguyễn Trãi 45 học sinh. Hỏi Trường Tiểu học Nguyễn Huệ có bao nhiêu học sinh?',
        wordProblem: true,
        blanks: [{ label: 'Số học sinh trường Nguyễn Huệ', answer: '719' }],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '4. Số?',
        tables: [
          { label: 'a)', rows: [['Số hạng', 58, 38, blank(72)], ['Số hạng', 23, blank(53), 64], ['Tổng', blank(81), 91, 136]] },
          { label: 'b)', rows: [['Số bị trừ', 72, 65, blank(265)], ['Số trừ', 38, blank(38), 46], ['Hiệu', blank(34), 27, 219]] },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai8Pyramid,
        q: '5. Số? (mỗi ô ở hàng trên bằng tổng hai ô liền kề ở hàng dưới)',
        blanks: [
          { label: 'Hàng 6 (6 ô), ô 5', answer: '12' }, { label: 'Hàng 6 (6 ô), ô 6', answer: '11' },
          { label: 'Hàng 5 (5 ô), ô 4', answer: '25' }, { label: 'Hàng 5 (5 ô), ô 5', answer: '23' },
          { label: 'Hàng 4 (4 ô), ô 2', answer: '56' }, { label: 'Hàng 4 (4 ô), ô 3', answer: '52' }, { label: 'Hàng 4 (4 ô), ô 4', answer: '48' },
          { label: 'Hàng 3 (3 ô), ô 1', answer: '116' }, { label: 'Hàng 3 (3 ô), ô 2', answer: '108' }, { label: 'Hàng 3 (3 ô), ô 3', answer: '100' },
          { label: 'Hàng 2 (2 ô), ô 1', answer: '224' }, { label: 'Hàng 2 (2 ô), ô 2', answer: '208' },
          { label: 'Hàng 1 (1 ô, đỉnh)', answer: '432' },
        ],
        hints: ['Hàng dưới cùng đã cho đủ 7 số — hãy tính hàng ngay phía trên trước, rồi cứ thế đi dần lên đỉnh.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính nhẩm rồi viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: '5 × 1 =', answer: '5' }, { label: '4 × 1 =', answer: '4' }, { label: '2 × 1 =', answer: '2' }, { label: '3 × 1 =', answer: '3' },
          { label: '5 : 1 =', answer: '5' }, { label: '4 : 1 =', answer: '4' }, { label: '2 : 1 =', answer: '2' }, { label: '3 : 1 =', answer: '3' },
          { label: 'Nhận xét: Số nào nhân với 1 cũng bằng', answer: 'chính số đó', validate: textValidate('chính số đó') },
          { label: 'Nhận xét: Số nào chia cho 1 cũng bằng', answer: 'chính số đó', validate: textValidate('chính số đó') },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Tính (theo mẫu). Mẫu: 1 × 3 = 1 + 1 + 1 = 3. Vậy: 1 × 3 = 3.',
        blanks: [
          { label: '1 × 4 =', answer: '4' }, { label: '1 × 5 =', answer: '5' }, { label: '1 × 7 =', answer: '7' }, { label: '1 × 8 =', answer: '8' },
          { label: 'Nhận xét: Số 1 nhân với số nào cũng bằng', answer: 'chính số đó', validate: textValidate('chính số đó') },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Số? (đường đua)',
        blanks: [
          { label: '2 × 8 =', answer: '16' }, { label: '1 × 8 =', answer: '8' }, { label: '15 : 5 =', answer: '3' },
          { label: '7 × 6 =', answer: '42' }, { label: '6 × 1 =', answer: '6' }, { label: '4 × 5 =', answer: '20' },
          { label: '18 : 3 =', answer: '6' }, { label: '16 : 4 =', answer: '4' }, { label: '3 × 9 =', answer: '27' },
          { label: '6 : 1 =', answer: '6' }, { label: '9 × 1 =', answer: '9' }, { label: '7 : 1 =', answer: '7' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Mẹ của Lan mua về 3 chục bông hoa. Mẹ bảo Lan mang số bông hoa đó cắm đều vào 3 lọ. Hỏi Lan đã cắm mỗi lọ bao nhiêu bông hoa?',
        wordProblem: true,
        blanks: [{ label: 'Số bông hoa mỗi lọ', answer: '10' }],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai8Circles,
        q: '5. Số? (mỗi hình tròn ở hàng trên bằng tích hai hình tròn liền kề ở hàng dưới)',
        blanks: [
          { label: 'Hàng 3 (3 hình), hình thứ 3', answer: '5' },
          { label: 'Hàng 2 (2 hình), hình thứ 1', answer: '5' },
          { label: 'Hàng 2 (2 hình), hình thứ 2', answer: '5' },
          { label: 'Hàng 1 (đỉnh)', answer: '25' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. a) Tính (theo mẫu). Mẫu: 0 × 3 = 0 + 0 + 0 = 0. Vậy: 0 × 3 = 0.\nb) Số?',
        blanks: [
          { label: 'a) 0 × 4 =', answer: '0' }, { label: 'a) 0 × 6 =', answer: '0' }, { label: 'a) 0 × 7 =', answer: '0' },
          { label: 'a) Nhận xét: Số 0 nhân với số nào cũng bằng', answer: '0' },
          { label: 'b) 0 × 2 =', answer: '0' }, { label: 'b) 0 × 5 =', answer: '0' }, { label: 'b) 0 × 8 =', answer: '0' }, { label: 'b) 0 × 9 =', answer: '0' },
          { label: 'b) 0 : 2 =', answer: '0' }, { label: 'b) 0 : 5 =', answer: '0' }, { label: 'b) 0 : 8 =', answer: '0' }, { label: 'b) 0 : 9 =', answer: '0' },
          { label: 'b) Nhận xét: Số 0 chia cho số nào khác 0 cũng bằng', answer: '0' },
        ],
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '2. Nối hai phép tính có cùng kết quả.',
        left: [{ id: 'l1', text: '4 × 3' }, { id: 'l2', text: '30 : 5' }, { id: 'l3', text: '15 : 3' }, { id: 'l4', text: '0 : 2' }],
        right: [{ id: 'r1', text: '12 : 2' }, { id: 'r2', text: '20 : 4' }, { id: 'r3', text: '3 × 4' }, { id: 'r4', text: '6 × 0' }],
        pairs: [['l1', 'r3'], ['l2', 'r1'], ['l3', 'r2'], ['l4', 'r4']],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Tổ Hai có 9 bạn, mỗi bạn góp 4 quyển vở để giúp đỡ các bạn vùng bị lũ lụt. Hỏi tổ Hai đã góp được bao nhiêu quyển vở?',
        wordProblem: true,
        blanks: [{ label: 'Số quyển vở', answer: '36' }],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '4. Đường gấp khúc ABCDE có AB = BC = CD = DE = 4 cm. Viết tiếp vào chỗ chấm cho thích hợp: Độ dài đường gấp khúc ABCDE là ...',
        blanks: [{ label: 'Độ dài (cm)', answer: '16' }],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgBai8Flowchart,
        q: '5. Số?',
        blanks: [
          { label: 'Hình thoi (3 × 8)', answer: '24' },
          { label: 'Ô vuông (để 24 : 6 = 4, rồi 4 × ô vuông = 20)', answer: '5' },
        ],
      },
    ],
  },

  {
    id: 'bai-9', number: 9, title: 'Bảng nhân 6, bảng chia 6',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        tables: [
          { label: 'a)', rows: [['×', 6, 6, 6, 6], ['', 5, 8, 9, 10], ['', blank(30), blank(48), blank(54), blank(60)]] },
          { label: 'b)', rows: [[':', 24, 18, 36, 42], ['', 6, 6, 6, 6], ['', blank(4), blank(3), blank(6), blank(7)]] },
        ],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Nối (theo mẫu).',
        left: [
          { id: 'l1', text: '42 : 6' }, { id: 'l2', text: '6 × 7' }, { id: 'l3', text: '6 × 9' },
          { id: 'l4', text: '18 : 6' }, { id: 'l5', text: '6 × 5' }, { id: 'l6', text: '36 : 6' },
        ],
        right: [
          { id: 'r54', text: '54' }, { id: 'r42', text: '42' }, { id: 'r3', text: '3' },
          { id: 'r7', text: '7' }, { id: 'r6', text: '6' }, { id: 'r30', text: '30' },
        ],
        pairs: [['l1', 'r7'], ['l2', 'r42'], ['l3', 'r54'], ['l4', 'r3'], ['l5', 'r30'], ['l6', 'r6']],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Mỗi hộp có 6 chiếc bút chì màu. Hỏi 5 hộp như vậy có bao nhiêu chiếc bút chì màu?',
        wordProblem: true,
        blanks: [{ label: 'Số bút chì màu', answer: '30' }],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Xếp 48 cái bánh vào các hộp, mỗi hộp 6 cái. Hỏi xếp được bao nhiêu hộp bánh như vậy?',
        wordProblem: true,
        blanks: [{ label: 'Số hộp bánh', answer: '8' }],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        rows: [
          { label: 'a)', cells: [6, 12, blank(18), 24, blank(30), blank(36), blank(42), blank(48), blank(54), 60] },
          { label: 'b)', cells: [60, 54, 48, blank(42), blank(36), blank(30), blank(24), blank(18), blank(12), 6] },
        ],
        hints: ['a) Mỗi số trong dãy hơn số đứng trước nó 6 đơn vị.', 'b) Mỗi số trong dãy kém số đứng trước nó 6 đơn vị.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. Số?',
        tables: [
          { label: 'a)', rows: [['×', 6, 6, 6, 6], ['', 3, 5, 7, 9], ['', blank(18), blank(30), blank(42), blank(54)]] },
          { label: 'b)', rows: [[':', 24, 36, 48, 60], ['', 6, 6, 6, 6], ['', blank(4), blank(6), blank(8), blank(10)]] },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai9Flowchart,
        q: '3. Số?',
        blanks: [
          { label: 'Hình lục giác (6 × 3)', answer: '18' },
          { label: 'Hình vuông (kết quả : 2)', answer: '9' },
          { label: 'Hình tròn (kết quả : 3)', answer: '3' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Một phòng họp có 36 cái ghế ngồi. Người ta đã xếp ghế thành 6 hàng đều nhau.',
        wordProblem: true,
        blanks: [
          { label: 'a) Hỏi mỗi hàng có bao nhiêu cái ghế?', answer: '6' },
          { label: 'b) Trong một buổi họp, số người tham dự ngồi vừa đủ 5 hàng ghế. Hỏi buổi họp đó có bao nhiêu người tham dự?', answer: '30' },
        ],
      },
    ],
  },

  {
    id: 'bai-10', number: 10, title: 'Bảng nhân 7, bảng chia 7',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Số?',
        blanks: [
          { label: '7 × 6 =', answer: '42' },
          { label: '42 : 7 =', answer: '6' },
          { label: '42 : 6 =', answer: '7' },
          { label: '7 × 4 =', answer: '28' },
          { label: '28 : 4 =', answer: '7' },
          { label: '28 : 7 =', answer: '4' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 1',
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.\nCác hạt dẻ ghi các phép tính: 7 × 4, 7 × 5, 70 : 7, 7 × 7, 7 × 6, 7 × 2, 63 : 7, 7 × 3.\nCó mấy hạt dẻ ghi phép tính có kết quả bé hơn 35?',
        options: ['4', '5', '6', '7'],
        answer: 1,
        hints: ['Tính kết quả của cả 8 phép tính rồi đếm xem có bao nhiêu kết quả nhỏ hơn 35.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Mỗi lọ cắm 7 bông hoa. Hỏi 6 lọ như vậy cắm bao nhiêu bông hoa?',
        wordProblem: true,
        blanks: [{ label: 'Số bông hoa', answer: '42' }],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '4. Nối hai phép tính có kết quả bằng nhau (theo mẫu).',
        left: [
          { id: 'l1', text: '7 × 5' }, { id: 'l2', text: '42 : 7' }, { id: 'l3', text: '14 : 2' },
          { id: 'l4', text: '21 : 7' }, { id: 'l5', text: '28 : 7' },
        ],
        right: [
          { id: 'r1', text: '30 : 5' }, { id: 'r2', text: '5 × 7' }, { id: 'r3', text: '24 : 6' },
          { id: 'r4', text: '49 : 7' }, { id: 'r5', text: '18 : 6' },
        ],
        pairs: [['l1', 'r2'], ['l2', 'r1'], ['l3', 'r4'], ['l4', 'r5'], ['l5', 'r3']],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        rows: [
          { label: 'a)', cells: [7, 14, blank(21), 28, blank(35), blank(42), blank(49), blank(56), blank(63), 70] },
          { label: 'b)', cells: [70, 63, blank(56), 49, blank(42), blank(35), blank(28), blank(21), blank(14), 7] },
        ],
        hints: ['a) Mỗi số trong dãy hơn số đứng trước nó 7 đơn vị.', 'b) Mỗi số trong dãy kém số đứng trước nó 7 đơn vị.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. Số?',
        tables: [
          { label: 'a)', rows: [['Thừa số', 7, 7, 7, 7], ['Thừa số', 3, 6, 7, 8], ['Tích', blank(21), blank(42), blank(49), blank(56)]] },
          { label: 'b)', rows: [['Số bị chia', 28, 35, 63, 70], ['Số chia', 7, 7, 7, 7], ['Thương', blank(4), blank(5), blank(9), blank(10)]] },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Một thanh tre dài 49 cm. Rô-bốt cắt thanh tre đó thành 7 đoạn dài bằng nhau.',
        wordProblem: true,
        blanks: [
          { label: 'a) Hỏi mỗi đoạn tre dài bao nhiêu xăng-ti-mét?', answer: '7' },
          { label: 'b) Nếu lấy 4 đoạn tre đó xếp thành một hình vuông thì tổng độ dài các cạnh của hình vuông đó là bao nhiêu xăng-ti-mét?', answer: '28' },
        ],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '4. >; <; = ?',
        rows: [
          { left: '7 × 5', right: '7 × 9', answer: '<' },
          { left: '7 × 6', right: '6 × 7', answer: '=' },
          { left: '7 × 4', right: '6 × 4', answer: '>' },
        ],
      },
    ],
  },

  {
    id: 'bai-11', number: 11, title: 'Bảng nhân 8, bảng chia 8',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        tables: [
          { label: 'a)', rows: [['×', 8, 8, 8, 8], ['', 3, 5, 7, 9], ['', blank(24), blank(40), blank(56), blank(72)]] },
          { label: 'b)', rows: [[':', 32, 48, 64, 80], ['', 8, 8, 8, 8], ['', blank(4), blank(6), blank(8), blank(10)]] },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Số?',
        blanks: [
          { label: 'a) 8 × 5 =', answer: '40' },
          { label: 'a) 40 : 8 =', answer: '5' },
          { label: 'a) 40 : 5 =', answer: '8' },
          { label: 'b) 8 × 7 =', answer: '56' },
          { label: 'b) 56 : 8 =', answer: '7' },
          { label: 'b) 56 : 7 =', answer: '8' },
          { label: 'c) 8 × 6 =', answer: '48' },
          { label: 'c) 48 : 8 =', answer: '6' },
          { label: 'c) 48 : 6 =', answer: '8' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 1',
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.\nPhép tính nào dưới đây có kết quả bé nhất?',
        options: ['72 : 8', '8 × 1', '80 : 8', '8 × 2'],
        answer: 1,
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Có 64 viên bi chia đều vào 8 hộp. Hỏi:',
        wordProblem: true,
        blanks: [
          { label: 'a) Mỗi hộp có bao nhiêu viên bi?', answer: '8' },
          { label: 'b) 3 hộp bi như vậy có bao nhiêu viên bi?', answer: '24' },
        ],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        rows: [
          { label: 'a)', cells: [8, 16, blank(24), blank(32), 40, blank(48), blank(56), blank(64), blank(72), 80] },
          { label: 'b)', cells: [80, blank(72), 64, 56, blank(48), blank(40), blank(32), blank(24), blank(16), 8] },
        ],
        hints: ['a) Mỗi số trong dãy hơn số đứng trước nó 8 đơn vị.', 'b) Mỗi số trong dãy kém số đứng trước nó 8 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai11Flowchart,
        q: '2. Số?',
        blanks: [
          { label: 'Hình lục giác (48 : 8)', answer: '6' },
          { label: 'Hình vuông (kết quả × 8)', answer: '48' },
        ],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '3. Nối (theo mẫu).',
        left: [
          { id: 'l1', text: '72 : 8' }, { id: 'l2', text: '64 : 8' }, { id: 'l3', text: '8 × 3' },
          { id: 'l4', text: '30 : 5' }, { id: 'l5', text: '8 × 5' }, { id: 'l6', text: '8 × 4' },
        ],
        right: [
          { id: 'r9', text: '9' }, { id: 'r24', text: '24' }, { id: 'r8', text: '8' },
          { id: 'r40', text: '40' }, { id: 'r6', text: '6' }, { id: 'r32', text: '32' },
        ],
        pairs: [['l1', 'r9'], ['l2', 'r8'], ['l3', 'r24'], ['l4', 'r6'], ['l5', 'r40'], ['l6', 'r32']],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. a) Mỗi hộp có 8 cái bánh. Hỏi 5 hộp như vậy có bao nhiêu cái bánh?\nb) Có 48 cái bánh chia đều vào 8 khay để vào lò nướng. Hỏi mỗi khay có bao nhiêu cái bánh?',
        wordProblem: true,
        blanks: [
          { label: 'a) Số cái bánh', answer: '40' },
          { label: 'b) Số cái bánh mỗi khay', answer: '6' },
        ],
      },
    ],
  },

  {
    id: 'bai-12', number: 12, title: 'Bảng nhân 9, bảng chia 9',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        rows: [
          ['Thừa số', 9, 9, 9, 9, 9, 9, 9, 9],
          ['Thừa số', 3, 5, 7, 9, 4, 6, 8, 10],
          ['Tích', blank(27), blank(45), blank(63), blank(81), blank(36), blank(54), blank(72), blank(90)],
        ],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Số?',
        rows: [
          ['Số bị chia', 36, 54, 90, 72, 81, 45, 63, 27],
          ['Số chia', 9, 9, 9, 9, 9, 9, 9, 9],
          ['Thương', blank(4), blank(6), blank(10), blank(8), blank(9), blank(5), blank(7), blank(3)],
        ],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '3. Nối hai phép tính có cùng kết quả (theo mẫu).',
        left: [
          { id: 'l1', text: '9 × 2' }, { id: 'l2', text: '54 : 9' }, { id: 'l3', text: '28 : 7' }, { id: 'l4', text: '9 × 5' },
        ],
        right: [
          { id: 'r1', text: '42 : 7' }, { id: 'r2', text: '6 × 3' }, { id: 'r3', text: '5 × 9' }, { id: 'r4', text: '36 : 9' },
        ],
        pairs: [['l1', 'r2'], ['l2', 'r1'], ['l3', 'r4'], ['l4', 'r3']],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Cô Lan có 36 bông hoa hồng. Cô Lan cắm hoa vào các lọ, mỗi lọ có 9 bông hoa. Hỏi cô Lan cắm được bao nhiêu lọ hoa như vậy?',
        wordProblem: true,
        blanks: [{ label: 'Số lọ hoa', answer: '4' }],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        rows: [
          { label: 'a)', cells: [9, 18, blank(27), 36, blank(45), 54, blank(63), blank(72), 81, blank(90)] },
          { label: 'b)', cells: [90, 81, 72, blank(63), 54, blank(45), blank(36), blank(27), 18, blank(9)] },
        ],
        hints: ['a) Mỗi số trong dãy hơn số đứng trước nó 9 đơn vị.', 'b) Mỗi số trong dãy kém số đứng trước nó 9 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai12Flowchart,
        q: '2. Số?',
        blanks: [
          { label: 'Hình vuông thứ nhất (81 : 9)', answer: '9' },
          { label: 'Hình vuông thứ hai (kết quả × 3)', answer: '27' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 2',
        q: '3. Khoanh vào chữ đặt dưới hình tam giác ghi phép tính có kết quả lớn hơn 7 và bé hơn 10.',
        options: ['A. 36 : 9', 'B. 9 × 2', 'C. 72 : 9', 'D. 63 : 9'],
        answer: 2,
        hints: ['Tính kết quả của cả 4 phép tính rồi tìm kết quả nằm trong khoảng lớn hơn 7 và bé hơn 10 (tức là bằng 8 hoặc 9).'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Có 27 bạn tập nhảy dây. Cô giáo đã chia đều các bạn thành 9 nhóm. Hỏi:',
        wordProblem: true,
        blanks: [
          { label: 'a) Mỗi nhóm tập nhảy dây có mấy bạn?', answer: '3' },
          { label: 'b) 2 nhóm tập nhảy dây như vậy có bao nhiêu bạn?', answer: '6' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '5. Tô màu đỏ vào hình tròn ghi phép tính có kết quả bé nhất, tô màu xanh vào hình tròn ghi phép tính có kết quả lớn nhất.\nCác hình tròn ghi: 90 : 9, 2 × 4, 9 × 1, 54 : 9.',
        blanks: [
          { label: 'Kết quả bé nhất (tô màu đỏ)', answer: '6' },
          { label: 'Kết quả lớn nhất (tô màu xanh)', answer: '10' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Dựa vào bảng nhân, chia hãy tính:',
        blanks: [
          { label: 'a) 9 × 5 =', answer: '45' },
          { label: 'b) 6 × 4 =', answer: '24' },
          { label: 'c) 72 : 9 =', answer: '8' },
          { label: 'd) 42 : 6 =', answer: '7' },
        ],
      },
      {
        type: 'table', section: 'Tiết 3',
        q: '2. Số?',
        tables: [
          { label: 'a)', rows: [['×', 9, 7, 8], ['', 3, 4, 10], ['', blank(27), blank(28), blank(80)]] },
          { label: 'b)', rows: [[':', 45, 36, 70], ['', 5, 6, 7], ['', blank(9), blank(6), blank(10)]] },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. a) Mỗi đội múa rồng có 9 người. Hỏi 3 đội múa rồng như vậy có bao nhiêu người?\nb) Nếu tất cả số người múa rồng ở câu a chuyển sang múa lân, mỗi đội 3 người thì được bao nhiêu đội múa lân?',
        wordProblem: true,
        blanks: [
          { label: 'a) Số người múa rồng', answer: '27' },
          { label: 'b) Số đội múa lân', answer: '9' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '4. Tìm hai số bé hơn 5 và có thương là 2.',
        wordProblem: true,
        blanks: [
          {
            label: 'Hai số đó là: ... và ...',
            answer: '4,2',
            validate: (value) => {
              const parts = String(value).split(/[,;]+/).map(s => parseFloat(String(s).trim()));
              if (parts.length !== 2 || parts.some(Number.isNaN)) return false;
              const [a, b] = parts;
              return a < 5 && b < 5 && b !== 0 && a / b === 2;
            },
          },
        ],
        hints: ['Có nhiều đáp số đúng, ví dụ 4 và 2 (vì 4 : 2 = 2), miễn là cả hai số đều bé hơn 5.'],
      },
    ],
  },

  {
    id: 'bai-13', number: 13, title: 'Tìm thành phần trong phép nhân, phép chia',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Số?',
        blanks: [
          { label: 'a) ... × 4 = 12', answer: '3' },
          { label: 'b) 8 × ... = 40', answer: '5' },
          { label: 'c) ... × 9 = 45', answer: '5' },
        ],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Số?',
        rows: [
          ['Thừa số', 9, blank(6), 8, blank(4), 4],
          ['Thừa số', 6, 5, blank(9), 7, blank(10)],
          ['Tích', 54, 30, 72, 28, 40],
        ],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '3. Nối (theo mẫu).',
        left: [
          { id: 'l1', text: '? × 6 = 24' },
          { id: 'l2', text: '? × 5 = 45' },
          { id: 'l3', text: '7 × ? = 49' },
          { id: 'l4', text: '9 × ? = 72' },
        ],
        right: [
          { id: 'r4', text: 'Thừa số cần tìm là 4.' },
          { id: 'r9', text: 'Thừa số cần tìm là 9.' },
          { id: 'r8', text: 'Thừa số cần tìm là 8.' },
          { id: 'r7', text: 'Thừa số cần tìm là 7.' },
        ],
        pairs: [['l1', 'r4'], ['l2', 'r9'], ['l3', 'r7'], ['l4', 'r8']],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Có 6 can nước mắm như nhau chứa được tất cả 54 l nước mắm. Hỏi mỗi can đó chứa được bao nhiêu lít nước mắm?',
        wordProblem: true,
        blanks: [{ label: 'Số lít nước mắm mỗi can', answer: '9' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Số?',
        blanks: [
          { label: 'a) ... : 4 = 9', answer: '36' },
          { label: 'a) ... : 7 = 5', answer: '35' },
          { label: 'a) ... : 8 = 6', answer: '48' },
          { label: 'b) 18 : ... = 2', answer: '9' },
          { label: 'b) 42 : ... = 7', answer: '6' },
          { label: 'b) 40 : ... = 8', answer: '5' },
        ],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. Số?',
        rows: [
          ['Số bị chia', 72, 45, 36, blank(28), blank(60)],
          ['Số chia', 8, blank(9), blank(4), 7, 6],
          ['Thương', 9, 5, 9, 4, 10],
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Có 30 khách du lịch đi tham quan trên các thuyền. Biết rằng mỗi thuyền có 6 khách du lịch. Hỏi có mấy thuyền chở khách du lịch như vậy?',
        wordProblem: true,
        blanks: [{ label: 'Số thuyền', answer: '5' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết các phép tính thích hợp vào chỗ chấm.\nTừ ba trong các số 35, 3, 7, 5, 24, lập được các phép nhân hoặc phép chia thích hợp là: ...',
        blanks: [
          { label: 'Phép tính', answer: '5 × 7 = 35', validate: factFamilyValidate(5, 7, 35) },
        ],
        hints: ['Trong các số đã cho, chỉ có 5, 7 và 35 lập thành một "họ phép tính" đúng — viết một trong bốn phép tính: 5 × 7 = 35, 7 × 5 = 35, 35 : 5 = 7 hoặc 35 : 7 = 5.'],
      },
    ],
  },

  {
    id: 'bai-14', number: 14, title: 'Một phần mấy',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgBai14Circles,
        q: '1. Đ, S?\nQuan sát hình rồi cho biết mỗi nhận định sau đúng hay sai (viết Đ hoặc S).',
        blanks: [
          { label: 'a) Đã tô màu 1/5 hình tròn.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) Đã tô màu 1/6 hình tròn.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'c) Đã tô màu 1/2 hình tròn.', answer: 'S', validate: dsValidate(false) },
          { label: 'd) Đã tô màu 1/3 hình tròn.', answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: ['Đếm hình tròn được chia thành mấy phần bằng nhau rồi so với số phần đã tô màu xanh.', 'Ở hình c), đường chia không đi qua đúng tâm hình tròn nên hai phần không bằng nhau — phần tô màu bé hơn một nửa hình tròn.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Nối (theo mẫu).',
        left: [
          { id: 'l1', text: 'Một phần hai' },
          { id: 'l2', text: 'Một phần năm' },
          { id: 'l3', text: 'Một phần ba' },
          { id: 'l4', text: 'Một phần sáu' },
          { id: 'l5', text: 'Một phần tư' },
        ],
        right: [
          { id: 'r12', text: '1/2' },
          { id: 'r15', text: '1/5' },
          { id: 'r16', text: '1/6' },
          { id: 'r13', text: '1/3' },
          { id: 'r14', text: '1/4' },
        ],
        pairs: [['l1', 'r12'], ['l2', 'r15'], ['l3', 'r13'], ['l4', 'r16'], ['l5', 'r14']],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgBai14Grids,
        q: '3. Viết dấu "x" vào ô trống dưới hình đã tô màu 1/3 số hình tròn của hình đó.\nHình nào (bên trái hay bên phải) đã tô màu đúng 1/3 số hình tròn của hình đó?',
        options: ['Hình bên trái', 'Hình bên phải'],
        answer: 0,
        hints: ['Đếm tổng số hình tròn và số hình tròn đã tô màu xanh ở mỗi hình rồi rút gọn thành "1 phần mấy".'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai14Shapes,
        q: '4. Tô màu 1/5 mỗi hình sau.\nMỗi hình dưới đây có 5 phần bằng nhau — cần tô màu mấy phần để được 1/5 hình đó?',
        blanks: [
          { label: 'Hình bậc thang (5 ô vuông)', answer: '1' },
          { label: 'Hình bông hoa (5 hình tròn)', answer: '1' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai14T2Squares,
        q: '1. Đ, S?\nQuan sát hình rồi cho biết mỗi nhận định sau đúng hay sai (viết Đ hoặc S).',
        blanks: [
          { label: 'a) Đã tô màu 1/8 hình vuông.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) Đã tô màu 1/5 hình vuông.', answer: 'S', validate: dsValidate(false) },
          { label: 'c) Đã tô màu 1/9 hình vuông.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'd) Đã tô màu 1/7 hình vuông.', answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: ['Đếm hình vuông được chia thành mấy phần bằng nhau rồi so với số phần đã tô màu xanh.', 'Ở hình b), hình vuông có 6 phần bằng nhau (không phải 5) và chỉ 1 phần tô màu — vậy phần tô màu là 1/6, không phải 1/5.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgBai14T2Circles2a,
        q: '2a. Khoanh vào chữ đặt trước câu trả lời đúng.\nĐã tô màu 1/7 hình nào?',
        options: ['Hình A', 'Hình B', 'Hình C', 'Hình D'],
        answer: 2,
        hints: ['Đếm số phần bằng nhau của mỗi hình tròn — hình cần tìm phải có đúng 7 phần bằng nhau.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgBai14T2Circles2b,
        q: '2b. Khoanh vào chữ đặt trước câu trả lời đúng.\nĐã tô màu 1/9 hình nào?',
        options: ['Hình A', 'Hình B', 'Hình C', 'Hình D'],
        answer: 3,
        hints: ['Đếm số phần bằng nhau của mỗi hình tròn — hình cần tìm phải có đúng 9 phần bằng nhau.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai14T2Shapes3,
        q: '3. Tô màu 1/8 mỗi hình sau.\nMỗi hình dưới đây có 8 phần bằng nhau — cần tô màu mấy phần để được 1/8 hình đó?',
        blanks: [
          { label: 'a) Hình vuông có 2 đường chéo và 1 hình thoi ở giữa', answer: '1' },
          { label: 'b) Lưới hình chữ nhật (4 cột × 2 hàng)', answer: '1' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgBai14T2Shapes4,
        q: '4. Viết dấu "x" vào ô trống dưới hình đã tô màu 1/5 số ô vuông của hình đó.\nHình nào đã tô màu đúng 1/5 số ô vuông của hình đó? (có thể có nhiều đáp án đúng)',
        options: ['Hình a) (hình chữ thập, 5 ô)', 'Hình b) (lưới 5×3, cột giữa)', 'Hình c) (lưới 3×2, hàng giữa)'],
        multi: true,
        answer: [0, 1],
        hints: ['Đếm tổng số ô vuông của mỗi hình và số ô đã tô màu xanh rồi rút gọn thành "1 phần mấy".', 'Hình c) có 6 ô vuông và 3 ô tô màu, tức là 3/6 = 1/2, không phải 1/5.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai14T2FishFlowers,
        q: '5. a) Tô màu 1/2 số con cá rồi viết số thích hợp vào ô trống.\nb) Tô màu 1/4 số bông hoa rồi viết số thích hợp vào ô trống.',
        blanks: [
          { label: 'a) 1/2 số con cá là ... con cá.', answer: '3' },
          { label: 'b) 1/4 số bông hoa là ... bông hoa.', answer: '4' },
        ],
      },
    ],
  },

  {
    id: 'bai-15', number: 15, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính nhẩm.',
        blanks: [
          { label: 'a) 7 × 4 =', answer: '28' }, { label: 'a) 8 × 6 =', answer: '48' }, { label: 'a) 9 × 5 =', answer: '45' }, { label: 'a) 6 × 9 =', answer: '54' },
          { label: 'b) 5 × 8 =', answer: '40' }, { label: 'b) 4 × 9 =', answer: '36' }, { label: 'b) 8 × 8 =', answer: '64' }, { label: 'b) 3 × 7 =', answer: '21' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgBai15Clouds,
        q: '2. Tô màu vào những đám mây ghi phép tính có kết quả bé hơn 7.',
        options: ['28 : 7', '35 : 5', '45 : 9', '48 : 8', '72 : 9'],
        multi: true,
        answer: [0, 2, 3],
        hints: ['Tính kết quả của cả 5 phép tính rồi so sánh với 7 — chỉ chọn những kết quả thực sự bé hơn 7 (35 : 5 = 7 không tính vì bằng 7, không bé hơn).'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai15Flowchart,
        q: '3. Số?',
        blanks: [
          { label: 'a) ... × 8 = 56', answer: '7' },
          { label: 'b) ... : 7 = 6', answer: '42' },
          { label: 'c) 5 × ... = 45', answer: '9' },
          { label: 'd) 45 : ... = 9', answer: '5' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Mai xếp mỗi bàn 6 cái li và xếp 8 bàn như vậy. Hỏi Mai xếp tất cả bao nhiêu cái li?',
        wordProblem: true,
        blanks: [{ label: 'Số cái li', answer: '48' }],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai15Triangles,
        q: '5. Số?\n(Ở mỗi hình tam giác: hình vuông bên trái = hình tròn trái × hình tròn đỉnh; hình vuông bên phải = hình tròn phải × hình tròn đỉnh; hình vuông giữa hàng dưới = hình tròn trái × hình tròn phải.)',
        blanks: [
          { label: 'b) Hình vuông bên trái (6 × 2)', answer: '12' },
          { label: 'b) Hình vuông bên phải (5 × 2)', answer: '10' },
          { label: 'c) Hình vuông bên trái (7 × 9)', answer: '63' },
          { label: 'c) Hình vuông bên phải (8 × 9)', answer: '72' },
          { label: 'c) Hình vuông giữa, hàng dưới (7 × 8)', answer: '56' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính nhẩm.',
        blanks: [
          { label: '5 × 7 =', answer: '35' }, { label: '6 × 8 =', answer: '48' }, { label: '9 × 7 =', answer: '63' }, { label: '8 × 4 =', answer: '32' },
          { label: '7 × 5 =', answer: '35' }, { label: '8 × 6 =', answer: '48' }, { label: '7 × 9 =', answer: '63' }, { label: '4 × 8 =', answer: '32' },
          { label: '35 : 5 =', answer: '7' }, { label: '48 : 6 =', answer: '8' }, { label: '63 : 9 =', answer: '7' }, { label: '32 : 8 =', answer: '4' },
          { label: '35 : 7 =', answer: '5' }, { label: '48 : 8 =', answer: '6' }, { label: '63 : 7 =', answer: '9' }, { label: '32 : 4 =', answer: '8' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Mẹ của Nam mua về 21 quả cam. Mẹ bảo Nam xếp cam vào các đĩa, mỗi đĩa 7 quả. Hỏi Nam xếp được bao nhiêu đĩa cam như vậy?',
        wordProblem: true,
        blanks: [{ label: 'Số đĩa cam', answer: '3' }],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgBai15T2Shapes,
        q: '3a. Viết dấu "x" vào ô trống dưới hình đã tô màu 1/6 hình đó.\nHình nào đã tô màu đúng 1/6 hình đó? (có thể có nhiều đáp án đúng)',
        options: ['Hình lục giác (6 phần)', 'Hình ngũ giác (5 phần)', 'Hình chữ nhật (lưới 3×2)'],
        multi: true,
        answer: [0, 2],
        hints: ['Đếm tổng số phần bằng nhau của mỗi hình rồi so với số phần tô màu — hình cần tìm phải có đúng 6 phần bằng nhau.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai15T2Stars,
        q: '3b. Số?',
        blanks: [
          { label: '1/8 số ngôi sao là ... ngôi sao.', answer: '3' },
          { label: '1/4 số ngôi sao là ... ngôi sao.', answer: '6' },
        ],
        hints: ['Đếm tổng số ngôi sao rồi chia cho 8 hoặc chia cho 4.'],
      },
      {
        type: 'choice', section: 'Tiết 2',
        q: '4a. Khoanh vào chữ đặt trước câu trả lời đúng.\nPhép tính nào dưới đây có kết quả lớn nhất?',
        options: ['A. 6 × 5', 'B. 4 × 7', 'C. 3 × 9', 'D. 8 × 4'],
        answer: 3,
        hints: ['Tính kết quả của cả 4 phép tính rồi so sánh.'],
      },
      {
        type: 'choice', section: 'Tiết 2',
        q: '4b. Khoanh vào chữ đặt trước câu trả lời đúng.\nPhép tính nào dưới đây có kết quả bé nhất?',
        options: ['A. 16 : 2', 'B. 42 : 6', 'C. 70 : 7', 'D. 72 : 8'],
        answer: 1,
        hints: ['Tính kết quả của cả 4 phép tính rồi so sánh.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai15T2Flowchart,
        q: '5. Số?',
        blanks: [
          { label: 'a) Hình tam giác (32 : 4)', answer: '8' },
          { label: 'a) Ô vuông (kết quả × ... = 48)', answer: '6' },
          { label: 'b) Hình tam giác (6 × 6)', answer: '36' },
          { label: 'b) Ô vuông (kết quả : ... = 9)', answer: '4' },
        ],
      },
    ],
  },

  {
    id: 'bai-16', number: 16, title: 'Điểm ở giữa, trung điểm của đoạn thẳng',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgBai16Segment,
        q: '1. Đ, S?\nQuan sát hình vẽ (các điểm A, B, C, D, E) rồi cho biết mỗi nhận định sau đúng hay sai (viết Đ hoặc S).',
        blanks: [
          { label: 'a) B là trung điểm của đoạn thẳng AC.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) D là trung điểm của đoạn thẳng CE.', answer: 'S', validate: dsValidate(false) },
          { label: 'c) C là điểm ở giữa hai điểm B và D.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'd) D là điểm ở giữa hai điểm C và E.', answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: ['Trung điểm phải cách đều hai đầu đoạn thẳng — đếm số ô vuông từ mỗi điểm.', 'D và E rất gần nhau trong khi C cách D tới 3 ô, nên D không cách đều C và E — D không phải trung điểm của CE.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai16Segments2,
        q: '2. Quan sát hình vẽ rồi viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          {
            label: 'a) Các nhóm ba điểm thẳng hàng là: ...',
            answer: 'A, M, B và C, N, D',
            validate: (value) => {
              const groups = String(value).split(/và|;/i).map(g => g.trim()).filter(Boolean);
              if (groups.length !== 2) return false;
              const norm = (g) => g.split(/[,\s]+/).filter(Boolean).map(s => s.trim().toUpperCase()).sort().join(',');
              const got = groups.map(norm).sort();
              const exp = [['A', 'M', 'B'].sort().join(','), ['C', 'N', 'D'].sort().join(',')].sort();
              return JSON.stringify(got) === JSON.stringify(exp);
            },
          },
          { label: 'b) M là điểm ở giữa hai điểm ... và ...', answer: 'A,B', validate: setValidate(['A', 'B']) },
          {
            label: 'b) M là trung điểm của đoạn thẳng ...',
            answer: 'AB',
            validate: (value) => String(value).toUpperCase().replace(/[^A-Z]/g, '').split('').sort().join('') === 'AB',
          },
          { label: 'c) ... là điểm ở giữa hai điểm C và D.', answer: 'N', validate: setValidate(['N']) },
        ],
        hints: ['O nằm bên dưới đường thẳng CD nên không thẳng hàng với C, N, D — chỉ có hai nhóm ba điểm thẳng hàng trong hình.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai16Trapezoid,
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Trung điểm của đoạn thẳng CD là điểm ...', answer: 'Q', validate: setValidate(['Q']) },
          { label: 'b) Trung điểm của đoạn thẳng MQ là điểm ...', answer: 'P', validate: setValidate(['P']) },
        ],
        hints: ['Đếm số ô vuông từ M đến N và từ N đến Q, rồi từ M đến P và từ P đến Q — trung điểm phải cách đều hai đầu đoạn MQ.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai16NumberLine,
        q: '4. Cho biết vị trí nhà và khoảng cách giữa các nhà của các bạn Nghêu, Sò, Ốc, Hến như hình vẽ. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Nhà các bạn ... và ... ở giữa nhà Nghêu và nhà Hến.', answer: 'Sò,Ốc', validate: setValidate(['Sò', 'Ốc']) },
          { label: 'b) Nhà bạn ... ở chính giữa quãng đường từ nhà Nghêu đến nhà Hến.', answer: 'Sò', validate: setValidate(['Sò']) },
        ],
        hints: ['Đếm số ô vuông từ nhà Nghêu đến từng nhà — nhà ở chính giữa phải cách đều nhà Nghêu và nhà Hến.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai16T2Ruler,
        q: '1. Xác định trung điểm của đoạn thẳng AB và đoạn thẳng AC.',
        blanks: [
          { label: 'Trung điểm của đoạn thẳng AB cách điểm A ... cm.', answer: '2' },
          { label: 'Trung điểm của đoạn thẳng AC cách điểm A ... cm.', answer: '5' },
        ],
        hints: ['Xem trên thước: A ở vạch 0cm, B ở vạch 4cm, C ở vạch 10cm — trung điểm cách đều hai đầu đoạn thẳng.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai16T2Kangaroo,
        q: '3. Một cây cầu đá có 11 tảng đá. Chú chuột túi đang ở tảng đá ghi số 1 (như hình vẽ). Mỗi lần nhảy, chuột túi sẽ nhảy từ một tảng đá sang tảng đá ghi số liền sau nó. Vậy: Chuột túi cần nhảy thêm bao nhiêu lần để đến được tảng đá chính giữa của cây cầu?',
        blanks: [{ label: 'Số lần cần nhảy thêm', answer: '4' }],
        hints: ['Cây cầu có 11 tảng đá ghi số từ 0 đến 10 — tảng đá chính giữa ghi số 5.'],
      },
    ],
  },
  {
    id: 'bai-17', number: 17, title: 'Hình tròn. Tâm, bán kính, đường kính của hình tròn',
    questions: [
      {
        type: 'fill', img: imgBai17Circles,
        q: '1. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Hình tròn tâm ...', answer: 'I' },
          { label: 'a) Bán kính là các đoạn thẳng ...', answer: 'IA, IB', validate: letterGroupsValidate(['IA', 'IB']) },
          { label: 'b) Hình tròn tâm ...', answer: 'O' },
          { label: 'b) Bán kính là các đoạn thẳng ...', answer: 'OM, ON', validate: letterGroupsValidate(['OM', 'ON']) },
          { label: 'b) Đường kính là đoạn thẳng ...', answer: 'MN', validate: letterGroupsValidate(['MN']) },
        ],
        hints: [
          'Bán kính nối tâm hình tròn với một điểm trên đường tròn — ở hình a) có hai bán kính là IA và IB.',
          'Đường kính là đoạn thẳng đi qua tâm, nối hai điểm trên đường tròn — ở hình b) đó là đoạn MN, và bán kính là OM, ON.',
        ],
      },
      {
        type: 'fill', img: imgBai17Bees,
        q: '3. Viết số thích hợp vào chỗ chấm.\nTrong hình vẽ bên có ba hình tròn, mỗi hình tròn đều có bán kính 9cm. Chú ong bay đi lấy mật từ điểm A đến điểm C theo đường gấp khúc ABC. Vậy chú ong đã bay ... cm.',
        blanks: [{ label: 'Độ dài đường gấp khúc ABC', answer: '36' }],
        hints: [
          'A, B, C là tâm của ba hình tròn đôi một tiếp xúc nhau, nên AB = BC = 9 + 9 = 18cm.',
          'Độ dài đường gấp khúc ABC = AB + BC = 18 + 18 = 36cm.',
        ],
      },
    ],
  },
  {
    id: 'bai-18', number: 18, title: 'Góc, góc vuông, góc không vuông',
    questions: [
      {
        type: 'fill', img: imgBai18Angles,
        q: '1. Dùng ê ke để kiểm tra góc vuông rồi viết tiếp vào chỗ chấm cho thích hợp.\nTrong hình vẽ có:',
        blanks: [
          { label: 'a) Các góc vuông là: Góc đỉnh ...; cạnh ..., ...', answer: 'A, AB, AC', validate: bai18RightAngles },
          { label: 'a) Góc vuông: Góc đỉnh ...; cạnh ..., ...', answer: 'R, RQ, RP', validate: bai18RightAngles },
          { label: 'b) Các góc không vuông là: Góc đỉnh ...; cạnh ..., ...', answer: 'I, IL, IT', validate: bai18OtherAngles },
          { label: 'b) Góc không vuông: Góc đỉnh ...; cạnh ..., ...', answer: 'M, MN, MP', validate: bai18OtherAngles },
          { label: 'b) Góc không vuông: Góc đỉnh ...; cạnh ..., ...', answer: 'G, GH, GK', validate: bai18OtherAngles },
          { label: 'b) Góc không vuông: Góc đỉnh ...; cạnh ..., ...', answer: 'E, EX, EY', validate: bai18OtherAngles },
        ],
        hints: [
          'Dùng ê ke áp vào từng góc: góc vuông là góc mà ê ke áp khít vào cả hai cạnh.',
          'Hai góc vuông trong hình là góc đỉnh A (cạnh AB, AC) và góc đỉnh R (cạnh RQ, RP) — bốn góc còn lại (đỉnh I, M, G, E) đều không vuông.',
        ],
      },
      {
        type: 'choice', img: imgBai18Shapes,
        q: '3. Tô màu vào hình có nhiều góc vuông nhất.\nHình nào có nhiều góc vuông nhất?',
        options: ['Hình 1', 'Hình 2', 'Hình 3'],
        answer: 2,
        hints: [
          'Hình 1 (hình chữ nhật) có 4 góc vuông. Hình 2 bị cắt một góc nên chỉ còn 3 góc vuông.',
          'Hình 3 có thêm một chỗ khuyết vuông góc nên có tới 5 góc vuông — nhiều nhất trong ba hình.',
        ],
      },
    ],
  },
  {
    id: 'bai-19', number: 19, title: 'Hình tam giác, hình tứ giác. Hình chữ nhật, hình vuông',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Viết tên các đỉnh và các cạnh của mỗi hình (theo mẫu).',
        headers: [
          `<img class="e3-q-img" style="max-width:120px;margin-top:0" src="${imgBai19Shape1}" alt="Hình tam giác DEH (mẫu)">`,
          `<img class="e3-q-img" style="max-width:120px;margin-top:0" src="${imgBai19Shape2}" alt="Hình tam giác SAC">`,
          `<img class="e3-q-img" style="max-width:120px;margin-top:0" src="${imgBai19Shape3}" alt="Hình tứ giác IKNM">`,
        ],
        rows: [
          { label: 'Các đỉnh', cells: ['D, E, H', blank('A, S, C', { validate: letterGroupsValidate(['A', 'S', 'C']) }), blank('I, K, M, N', { validate: letterGroupsValidate(['I', 'K', 'M', 'N']) })] },
          { label: 'Các cạnh', cells: ['DE, EH, HD', blank('SA, AC, CS', { validate: letterGroupsValidate(['SA', 'AC', 'CS']) }), blank('IK, KM, MN, NI', { validate: letterGroupsValidate(['IK', 'KM', 'MN', 'NI']) })] },
        ],
        hints: ['Đi vòng quanh hình theo đúng thứ tự các đỉnh nối tiếp nhau, giống cách làm ở cột mẫu.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai19Trapezoid,
        q: '2. Viết tiếp vào chỗ chấm cho thích hợp.\nTrong hình vẽ bên có:',
        blanks: [
          { label: 'a) Các hình tam giác là: ...', answer: 'ABI, ICD, IBC', validate: letterGroupsValidate(['ABI', 'ICD', 'IBC']) },
          { label: 'b) Các hình tứ giác là: ...', answer: 'ABCI, IBCD, ABCD', validate: letterGroupsValidate(['ABCI', 'IBCD', 'ABCD']) },
        ],
        hints: [
          'Hai tam giác nhỏ hai bên là ABI và ICD; tam giác ở giữa là IBC (hai cạnh IB, IC và đáy BC).',
          'Ghép hai tam giác liền kề được một tứ giác: ABI + IBC = tứ giác ABCI; IBC + ICD = tứ giác IBCD. Cả hình lớn ABCD cũng là một tứ giác.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai19T2Q1aShapes,
        q: '1a. Tô màu vàng vào hình vuông, màu xanh vào hình chữ nhật.',
        blanks: [
          { label: 'Hình vuông (tô màu vàng) là hình ...', answer: 'MNPQ', validate: letterGroupsValidate(['MNPQ']) },
          { label: 'Hình chữ nhật (tô màu xanh) là hình ...', answer: 'CDIH', validate: letterGroupsValidate(['CDIH']) },
        ],
        hints: ['Đếm số ô vuông theo chiều ngang và chiều dọc của mỗi hình trên lưới — hình vuông có hai chiều bằng nhau.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgBai19T2Q1bShapes,
        q: '1b. Khoanh vào chữ đặt trước câu trả lời đúng.\nTrong hình vẽ có mấy hình chữ nhật?',
        options: ['1 hình', '2 hình', '3 hình', '4 hình'],
        answer: 1,
        hints: [
          'Hình chữ nhật phải có 4 góc vuông. Hai hình bị nghiêng (MNPQ và RTXY) không có góc vuông nên không phải hình chữ nhật.',
          'Chỉ có ABCD và EGIH là hình chữ nhật — 2 hình.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai19T2Colored,
        q: '2. Đ, S?\nDùng thước có vạch chia xăng-ti-mét để đo độ dài các đoạn thẳng trong hình đã cho, ta có:',
        blanks: [
          { label: 'a) Hình vuông có cạnh 5cm.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) Hình chữ nhật có chiều rộng 4cm.', answer: 'S', validate: dsValidate(false) },
          { label: 'c) Hình chữ nhật có chiều dài 2cm.', answer: 'S', validate: dsValidate(false) },
        ],
        hints: [
          'Đo hình vuông: cạnh đúng bằng 5cm.',
          'Đo hình chữ nhật: chiều dài khoảng 5cm, chiều rộng khoảng 2,5cm — không khớp với "chiều rộng 4cm" hay "chiều dài 2cm".',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai19T2Tiles,
        q: '4. Viết số thích hợp vào chỗ chấm.\nMỗi viên gạch hoa trang trí có cạnh 5dm. Một hình chữ nhật được ghép bởi 6 viên gạch hoa như hình vẽ.',
        blanks: [
          { label: 'a) Chiều dài của hình chữ nhật đó là ... dm.', answer: '15' },
          { label: 'b) Chiều rộng của hình chữ nhật đó là ... dm.', answer: '10' },
        ],
        hints: ['Hình chữ nhật ghép bởi 3 viên gạch theo chiều dài và 2 viên gạch theo chiều rộng, mỗi viên cạnh 5dm.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgBai19T3Ant,
        q: '1. Viết số thích hợp vào chỗ chấm.\nCho ABCD là hình chữ nhật có BC = 20cm, CD = 50cm. Một con kiến đang ở điểm A (như hình vẽ).',
        blanks: [
          { label: 'a) Nếu con kiến muốn bò đến điểm B theo cạnh AB thì phải bò một đoạn đường dài ... cm.', answer: '50' },
          { label: 'b) Nếu con kiến muốn bò đến điểm D theo cạnh AD thì phải bò một đoạn đường dài ... cm.', answer: '20' },
          { label: 'c) Nếu con kiến muốn bò đến điểm C theo đường gấp khúc ABC thì phải bò một đoạn đường dài ... cm.', answer: '70' },
        ],
        hints: [
          'AB = DC = 50cm và AD = BC = 20cm (hai cặp cạnh đối diện của hình chữ nhật bằng nhau).',
          'Đường gấp khúc ABC = AB + BC = 50 + 20 = 70cm.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgBai19T3Snail,
        q: '2. Viết số thích hợp vào chỗ chấm.\nRùa và Ốc sên thi chạy. Hai bạn cùng xuất phát từ điểm M chạy đến đích ở điểm N nhưng theo hai đường khác nhau. Ốc sên chạy đến đích theo cạnh MN, còn Rùa chạy đến đích theo đường gấp khúc MQPN. Biết rằng MNPQ là hình chữ nhật có NP = 50cm.',
        blanks: [{ label: 'Đoạn đường Rùa chạy dài hơn đoạn đường Ốc sên chạy là ... cm.', answer: '100' }],
        hints: [
          'Rùa chạy MQ + QP + PN; Ốc sên chạy MN. Vì QP = MN (hai cạnh đối của hình chữ nhật) nên phần chênh lệch chỉ còn lại MQ + PN.',
          'MQ = PN = NP = 50cm, nên chênh lệch = 50 + 50 = 100cm.',
        ],
      },
      {
        type: 'choice', section: 'Tiết 3',
        q: '3a. Khoanh vào chữ đặt trước câu trả lời đúng.\nVới số lượng các que tính giống nhau nào dưới đây thì xếp được một hình vuông (không thừa que tính nào)?',
        options: ['6 que tính', '7 que tính', '8 que tính'],
        answer: 2,
        hints: ['Hình vuông có 4 cạnh bằng nhau nên tổng số que tính phải chia hết cho 4 — chỉ có 8 chia hết cho 4.'],
      },
      {
        type: 'choice', section: 'Tiết 3',
        q: '3b. Khoanh vào chữ đặt trước câu trả lời đúng.\nVới số lượng các que tính giống nhau nào dưới đây thì không thể xếp được một hình chữ nhật (không thừa que tính nào)?',
        options: ['6 que tính', '7 que tính', '10 que tính'],
        answer: 1,
        hints: ['Hình chữ nhật có 2 cặp cạnh bằng nhau nên tổng số que tính phải là số chẵn — 7 là số lẻ nên không thể xếp được.'],
      },
    ],
  },
];

// ── PERSISTENT PROGRESS (localStorage) ──────────────────────────────────────

const STORAGE_KEY = 'gw-progress-v1';
const PALETTE = ['#34D399', '#60A5FA', '#F59E0B', '#F472B6', '#A78BFA', '#22D3EE', '#FB923C', '#4ADE80'];

function loadStorage() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}
function saveStorage(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* ignore */ }
}
function getRecord(unitId, idx) {
  const data = loadStorage();
  return (data[unitId] && data[unitId][idx]) || null;
}
function setRecord(unitId, idx, rec) {
  const data = loadStorage();
  if (!data[unitId]) data[unitId] = {};
  data[unitId][idx] = rec;
  saveStorage(data);
}
function clearUnitStorage(unitId) {
  const data = loadStorage();
  delete data[unitId];
  saveStorage(data);
}
function getUnitSummary(unit) {
  let solvedCount = 0, attemptsSum = 0;
  unit.questions.forEach((_, i) => {
    const rec = getRecord(unit.id, i);
    if (rec) { if (rec.solved) solvedCount++; attemptsSum += rec.attempts || 0; }
  });
  return { solvedCount, total: unit.questions.length, attemptsSum };
}

// ── ENGINE ───────────────────────────────────────────────────────────────────

export function render(app, onBack) {
  let activeQuestions = [];
  let activeTitle = '';
  let activeColor = '#34D399';
  let activeUnitIds = [];
  let current = 0;
  let solved = [];
  let attempted = [];
  let wrongCounts = [];
  let solutionRows = [];
  let solutionConfirmed = [];
  let lastFocusedFormulaInput = null;
  let multiSelected = [];
  let compareSelected = [];
  let matchLocked = new Set(); // leftIds confirmed correct after checking
  let matchPairs = new Map(); // leftId -> rightId, tentative pairs not yet checked
  let selectedMatchItem = null; // { side: 'left'|'right', id } — the item awaiting its pair

  injectStyles();

  // ── INTRO / UNIT MENU ──────────────────────────────────────────────────────
  function showIntro() {
    const totalQ = UNITS.reduce((s, u) => s + u.questions.length, 0);
    app.innerHTML = `
      <div class="e3-wrap gw-app">
        <div class="e3-intro animate-fadeIn gw-intro-wide">
          <div class="e3-badge">📗</div>
          <h1 class="e3-title">Vở Bài Tập Toán 3</h1>
          <p class="e3-sub">Tập Một — Kết nối tri thức với cuộc sống</p>

          <div class="e3-section-label">Chọn bài để luyện tập:</div>
          <div class="gw-unit-list">
            <button class="gw-unit-row gw-unit-all" data-unit="all">
              <span class="gw-unit-badge" style="background:#334155">📋</span>
              <span class="gw-unit-info"><strong>Tất cả</strong><span class="gw-unit-sub">${totalQ} câu — ${UNITS.length} bài hiện có</span></span>
              <span class="gw-unit-arrow">›</span>
            </button>
            ${UNITS.map((u, idx) => {
              const color = PALETTE[idx % PALETTE.length];
              const sum = getUnitSummary(u);
              const badges = [
                sum.solvedCount ? `✓ ${sum.solvedCount}/${sum.total}` : `${sum.total} câu`,
                sum.attemptsSum ? `🔁 ${sum.attemptsSum} lượt` : '',
              ].filter(Boolean).join(' · ');
              return `
                <button class="gw-unit-row" data-unit="${u.id}">
                  <span class="gw-unit-badge" style="background:${color}">${u.number}</span>
                  <span class="gw-unit-info"><strong>Bài ${u.number}. ${u.title}</strong><span class="gw-unit-sub">${badges}</span></span>
                  <span class="gw-unit-arrow">›</span>
                </button>
              `;
            }).join('')}
          </div>

          <div class="e3-divider"></div>
          <p class="e3-note">Nguồn: Vở bài tập Toán 3 — Tập một, bộ sách Kết nối tri thức với cuộc sống (NXB Giáo dục Việt Nam).</p>
          <button class="e3-btn e3-btn-ghost" id="e3-back-btn">← Quay lại</button>
        </div>
      </div>
    `;

    app.querySelectorAll('.gw-unit-row').forEach(btn => {
      btn.addEventListener('click', () => {
        const uid = btn.dataset.unit;
        if (uid === 'all') {
          activeQuestions = UNITS.flatMap(u => u.questions.map((q, i) => ({ ...q, __unitId: u.id, __qIdx: i })));
          activeTitle = `Tất cả — ${totalQ} câu`;
          activeColor = '#34D399';
          activeUnitIds = UNITS.map(u => u.id);
        } else {
          const unitIdx = UNITS.findIndex(u => u.id === uid);
          const u = UNITS[unitIdx];
          activeQuestions = u.questions.map((q, i) => ({ ...q, __unitId: u.id, __qIdx: i }));
          activeTitle = `Bài ${u.number}. ${u.title}`;
          activeColor = PALETTE[unitIdx % PALETTE.length];
          activeUnitIds = [u.id];
        }
        resetProgress();
        current = 0;
        showQuestion();
      });
    });

    app.querySelector('#e3-back-btn').onclick = onBack;
  }

  function resetProgress() {
    solved = activeQuestions.map(() => false);
    attempted = activeQuestions.map(() => false);
    wrongCounts = activeQuestions.map(() => 0);
    solutionRows = activeQuestions.map(() => [{ type: 'text', value: '' }]);
    solutionConfirmed = activeQuestions.map(() => false);
    activeQuestions.forEach((q, i) => {
      const rec = getRecord(q.__unitId, q.__qIdx);
      if (rec) {
        solved[i] = !!rec.solved;
        attempted[i] = (rec.attempts || 0) > 0;
        wrongCounts[i] = rec.solved ? Math.max(0, (rec.attempts || 0) - 1) : (rec.attempts || 0);
      }
    });
  }

  function persistAttempt(idx, isSolve) {
    const q = activeQuestions[idx];
    const rec = getRecord(q.__unitId, q.__qIdx) || { solved: false, attempts: 0 };
    rec.attempts++;
    if (isSolve) rec.solved = true;
    setRecord(q.__unitId, q.__qIdx, rec);
  }

  // ── QUIZ ──────────────────────────────────────────────────────────────────
  function showQuestion(idx = current) {
    current = idx;
    multiSelected = [];
    selectedMatchItem = null;
    const q = activeQuestions[current];
    compareSelected = q.type === 'compare' ? new Array(q.rows.length).fill(null) : [];
    matchPairs = new Map();
    matchLocked = new Set();
    if (q.type === 'match' && solved[current]) matchLocked = new Set(q.left.map(l => l.id));

    const visitedCount = solved.filter(Boolean).length + attempted.filter((a, i) => a && !solved[i]).length;
    const pct = Math.round((visitedCount / activeQuestions.length) * 100);
    const answerUnlocked = !q.wordProblem || solutionConfirmed[current] || solved[current];

    app.innerHTML = `
      <div class="e3-wrap gw-app">
        <div class="e3-quiz animate-fadeIn">
          <div class="e3-topbar">
            <button class="e3-back-icon" id="e3-quit">✕</button>
            <div class="e3-progress-wrap">
              <div class="e3-progress-track">
                <div class="e3-progress-fill" style="width:${pct}%; background:${activeColor}"></div>
              </div>
              <span class="e3-progress-label">${current + 1} / ${activeQuestions.length}</span>
            </div>
            <button class="e3-back-icon" id="e3-list-toggle" title="Danh sách câu hỏi">☰</button>
          </div>

          <div class="e3-question-card">
            <div class="e3-q-num" style="color:${activeColor}">${q.section ? `${q.section} — ` : ''}Câu ${current + 1}</div>
            <div class="e3-q-text">${q.q.replace(/\n/g, '<br>')}</div>
            ${q.img ? `<img class="e3-q-img" src="${q.img}" alt="Hình minh họa câu ${current + 1}" loading="lazy">` : ''}
            ${q.wordProblem ? renderSubQuestions(q) : ''}
          </div>

          ${q.wordProblem ? renderSolutionBlock(q) : ''}

          ${answerUnlocked ? renderAnswerArea(q) : renderAnswerLockNotice()}

          ${answerUnlocked && !solved[current] ? renderHints(q) : ''}

          <div class="e3-nav" id="e3-nav" style="display:none">
            <button class="e3-btn e3-btn-primary" id="e3-next" style="background:linear-gradient(135deg,${activeColor},${activeColor}cc)">
              ${current < activeQuestions.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả 🏅'}
            </button>
          </div>
        </div>

        ${renderQuestionList()}
      </div>
    `;

    app.querySelector('#e3-quit').onclick = showIntro;
    app.querySelector('#e3-list-toggle').onclick = toggleQuestionList;
    attachQuestionListHandlers();
    if (q.wordProblem) attachSolutionHandlers(q);
    if (answerUnlocked) attachAnswerHandlers(q);
  }

  // ── SOLUTION EDITOR (write the working before answering) ────────────────────
  // A *multi-part* word problem's a)/b) sub-questions (e.g. "a) Buổi chiều
  // cửa hàng bán được bao nhiêu lít nước mắm?") live only in each blank's
  // label, not in q.q (which is just the setup ending in "Hỏi:") — so they
  // belong inside the question card itself, printed once, right where the
  // book shows them, above the "write your solution" editor. They stay
  // visible whether the answer boxes below are locked or not; only the
  // boxes themselves depend on solutionConfirmed, never the question text.
  //
  // A *single*-blank word problem is different: q.q already asks the full
  // question itself (e.g. "...Hỏi đội đồng diễn đó có bao nhiêu nam?"), and
  // the one blank's label (e.g. "Số nam") is just an app-only caption for
  // its input box, not a second question — printing it here too would
  // dangle a redundant fragment right after the question mark.
  function renderSubQuestions(q) {
    if (!q.blanks || q.blanks.length < 2) return '';
    const prompts = q.blanks.map(b => `<div class="e3-subq">${b.label}</div>`).join('');
    return `<div class="e3-subquestions">${prompts}</div>`;
  }

  function renderAnswerLockNotice() {
    return `<div class="e3-answer-locked-note">🔒 Hoàn thành lời giải ở trên rồi bấm "Xong, chọn đáp án" để mở khóa phần trả lời.</div>`;
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function escapeAttr(str) {
    return escapeHtml(str).replace(/"/g, '&quot;');
  }

  function renderSolutionRow(row, i) {
    const icon = row.type === 'formula' ? '🧮' : '📝';
    const placeholder = row.type === 'formula' ? 'VD: a + b = c' : 'Viết giải thích...';
    const cls = row.type === 'formula' ? 'e3-sol-row-formula-input' : 'e3-sol-row-text-input';
    return `
      <div class="e3-sol-row" data-row-idx="${i}">
        <span class="e3-sol-row-icon">${icon}</span>
        <input type="text" class="e3-sol-row-input ${cls}" data-row-idx="${i}" placeholder="${placeholder}" value="${escapeAttr(row.value)}" autocomplete="off">
        <button type="button" class="e3-sol-row-remove" data-row-idx="${i}" title="Xóa dòng">✕</button>
      </div>
    `;
  }

  function renderSolutionBlock(q) {
    const rows = solutionRows[current];
    const confirmed = solutionConfirmed[current] || solved[current];

    if (confirmed) {
      const nonEmpty = rows.filter(r => r.value.trim() !== '');
      return `
        <div class="e3-solution e3-solution-locked">
          <div class="e3-solution-label">✍️ Lời giải của em</div>
          <div class="e3-solution-rows">
            ${nonEmpty.length ? nonEmpty.map(r => `
              <div class="e3-sol-row e3-sol-row-readonly">
                <span class="e3-sol-row-icon">${r.type === 'formula' ? '🧮' : '📝'}</span>
                <span class="e3-sol-row-text-display">${escapeHtml(r.value)}</span>
              </div>
            `).join('') : '<div class="e3-sol-empty">(chưa ghi nội dung)</div>'}
          </div>
          ${!solved[current] ? '<button type="button" class="e3-btn e3-btn-ghost e3-btn-sm" id="e3-edit-solution">✏️ Sửa lời giải</button>' : ''}
        </div>
      `;
    }

    return `
      <div class="e3-solution">
        <div class="e3-solution-label">✍️ Trình bày lời giải trước khi trả lời:</div>
        <div class="e3-solution-rows" id="e3-solution-rows">
          ${rows.map((r, i) => renderSolutionRow(r, i)).join('')}
        </div>
        <div class="e3-solution-toolbar">
          ${['+', '−', '×', '÷', '=', '(', ')'].map(s => `<button type="button" class="e3-sym-btn" data-sym="${s}">${s}</button>`).join('')}
        </div>
        <div class="e3-solution-hint">💡 Viết lời giải bằng nút <span class="e3-hint-chip">+ Dòng chữ</span>, viết phép tính bằng nút <span class="e3-hint-chip">+ Dòng phép tính</span>.</div>
        <div class="e3-solution-controls">
          <button type="button" class="e3-btn e3-btn-ghost e3-btn-sm" id="e3-add-text-row">+ Dòng chữ</button>
          <button type="button" class="e3-btn e3-btn-ghost e3-btn-sm" id="e3-add-formula-row">+ Dòng phép tính</button>
        </div>
        <button type="button" class="e3-btn e3-btn-primary" id="e3-solution-ok" disabled>Xong, chọn đáp án →</button>
      </div>
    `;
  }

  function insertAtCursor(input, text) {
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    input.value = input.value.slice(0, start) + text + input.value.slice(end);
    const pos = start + text.length;
    input.setSelectionRange(pos, pos);
  }

  function focusLastSolutionRow() {
    const inputs = app.querySelectorAll('.e3-sol-row-input');
    inputs[inputs.length - 1]?.focus();
  }

  function attachSolutionHandlers(q) {
    if (solutionConfirmed[current] || solved[current]) {
      const editBtn = app.querySelector('#e3-edit-solution');
      if (editBtn) editBtn.onclick = () => { solutionConfirmed[current] = false; showQuestion(); };
      return;
    }

    const rowsContainer = app.querySelector('#e3-solution-rows');
    const okBtn = app.querySelector('#e3-solution-ok');

    const syncOkState = () => { okBtn.disabled = !solutionRows[current].some(r => r.value.trim() !== ''); };

    rowsContainer.querySelectorAll('.e3-sol-row-input').forEach(inp => {
      inp.oninput = () => {
        const i = parseInt(inp.dataset.rowIdx, 10);
        solutionRows[current][i].value = inp.value;
        syncOkState();
      };
      if (inp.classList.contains('e3-sol-row-formula-input')) {
        inp.addEventListener('focus', () => { lastFocusedFormulaInput = inp; });
      }
    });
    rowsContainer.querySelectorAll('.e3-sol-row-remove').forEach(btn => {
      btn.onclick = () => {
        const i = parseInt(btn.dataset.rowIdx, 10);
        solutionRows[current].splice(i, 1);
        showQuestion();
      };
    });
    syncOkState();

    app.querySelector('#e3-add-text-row').onclick = () => {
      solutionRows[current].push({ type: 'text', value: '' });
      showQuestion();
      focusLastSolutionRow();
    };
    app.querySelector('#e3-add-formula-row').onclick = () => {
      solutionRows[current].push({ type: 'formula', value: '' });
      showQuestion();
      focusLastSolutionRow();
    };

    app.querySelectorAll('.e3-sym-btn').forEach(btn => {
      btn.onclick = () => {
        const target = lastFocusedFormulaInput && rowsContainer.contains(lastFocusedFormulaInput)
          ? lastFocusedFormulaInput
          : rowsContainer.querySelector('.e3-sol-row-formula-input');
        if (!target) return;
        insertAtCursor(target, btn.dataset.sym);
        const i = parseInt(target.dataset.rowIdx, 10);
        solutionRows[current][i].value = target.value;
        syncOkState();
        target.focus();
      };
    });

    okBtn.onclick = () => { solutionConfirmed[current] = true; showQuestion(); };
  }

  // ── HINTS ─────────────────────────────────────────────────────────────────
  function renderHints(q) {
    if (!q.hints || q.hints.length === 0) return '';
    const unlocked = Math.min(wrongCounts[current], q.hints.length);
    return `
      <div class="e3-hints" id="e3-hints">
        ${q.hints.map((h, i) => i < unlocked
          ? `<div class="e3-hint-item e3-hint-unlocked">💡 <strong>Gợi ý ${i + 1}:</strong> ${h}</div>`
          : `<div class="e3-hint-item e3-hint-locked">🔒 Gợi ý ${i + 1} — trả lời sai để mở khóa</div>`
        ).join('')}
      </div>
    `;
  }
  function refreshHints(q) {
    const box = app.querySelector('#e3-hints');
    if (!box) return;
    box.outerHTML = renderHints(q);
  }

  // ── SIDE QUESTION LIST ───────────────────────────────────────────────────────
  function getQuestionStatus(i) {
    if (solved[i]) return 'correct';
    if (attempted[i]) return 'wrong';
    return 'unanswered';
  }

  function renderQuestionList() {
    const statusIcon = { unanswered: '', correct: '✓', wrong: '✕' };
    return `
      <div class="e3-qlist-overlay" id="e3-qlist-overlay" style="display:none">
        <div class="e3-qlist-panel">
          <div class="e3-qlist-header">
            <span>Danh sách câu hỏi</span>
            <button class="e3-qlist-close" id="e3-qlist-close">✕</button>
          </div>
          <div class="e3-qlist-grid">
            ${activeQuestions.map((_, i) => {
              const status = getQuestionStatus(i);
              return `<button class="e3-qitem e3-qitem-${status} ${i === current ? 'e3-qitem-current' : ''}" data-idx="${i}">${statusIcon[status] || (i + 1)}</button>`;
            }).join('')}
          </div>
          <div class="e3-qlist-legend">
            <span><i class="e3-legend-dot e3-legend-unanswered"></i>Chưa làm</span>
            <span><i class="e3-legend-dot e3-legend-correct"></i>Đúng</span>
            <span><i class="e3-legend-dot e3-legend-wrong"></i>Sai</span>
          </div>
          <button class="e3-btn e3-btn-primary" id="e3-qlist-finish">🏁 Nộp bài / Xem kết quả</button>
        </div>
      </div>
    `;
  }

  function attachQuestionListHandlers() {
    const overlay = app.querySelector('#e3-qlist-overlay');
    app.querySelector('#e3-qlist-close').onclick = () => { overlay.style.display = 'none'; };
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.style.display = 'none'; });
    app.querySelectorAll('.e3-qitem').forEach(btn => {
      btn.onclick = () => showQuestion(parseInt(btn.dataset.idx, 10));
    });
    app.querySelector('#e3-qlist-finish').onclick = showResult;
  }

  function toggleQuestionList() {
    const overlay = app.querySelector('#e3-qlist-overlay');
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
  }

  // ── ANSWER AREA (dispatch by type) ──────────────────────────────────────────
  function renderAnswerArea(q) {
    if (q.type === 'choice') return renderChoiceArea(q);
    if (q.type === 'fill') return renderFillArea(q);
    if (q.type === 'table') return renderTableArea(q);
    if (q.type === 'compare') return renderCompareArea(q);
    if (q.type === 'match') return renderMatchArea(q);
    return '';
  }

  function renderChoiceArea(q) {
    const labels = ['A', 'B', 'C', 'D'];
    return `
      <div class="e3-options" id="e3-options">
        ${q.options.map((opt, i) => `
          <button class="e3-option" data-idx="${i}">
            <span class="e3-option-label">${labels[i]}</span>
            <span class="e3-option-text">${opt}</span>
          </button>
        `).join('')}
      </div>
      ${q.multi ? `<button class="e3-btn e3-btn-primary" id="e3-submit-multi" style="margin-top:12px" disabled>Xác nhận đáp án đã chọn</button>` : ''}
    `;
  }

  // Sizes a text input to roughly fit its expected answer, so a 3-digit
  // number column stays narrow while a full-sentence answer column stays wide.
  function inputWidthCh(answer) {
    return Math.max(3, Math.min(24, String(answer).length + 2));
  }

  // Table rows are normally a plain array of cells. A row can also be
  // { sample: true, cells: [...] } to render as a given "theo mẫu" row
  // inside the table itself (matching the book), instead of prose above it.
  function rowCells(row) { return Array.isArray(row) ? row : row.cells; }
  function isSampleRow(row) { return !Array.isArray(row) && !!row.sample; }
  // A row can also carry { label: 'a)', cells: [...] } to prefix it with a plain
  // (unbordered) label — used when the book shows two variants of one exercise
  // (e.g. a rising and a falling number sequence) as two labeled rows of one table.
  function rowLabelOf(row) { return !Array.isArray(row) && row.label; }

  // Whether an expected answer is a plain integer (so the input can safely use
  // the digit-only virtual keypad). Anything else (a sum like "100+30+9", a
  // letter like "B", a list like "687, 768, 786, 867") needs free typing.
  function isPlainInt(s) {
    return /^-?\d+$/.test(String(s).trim());
  }

  function renderFillArea(q) {
    return `
      <div class="e3-blanks" id="e3-blanks">
        ${q.blanks.map((b, i) => renderBlankRow(b, i)).join('')}
      </div>
      <button class="e3-btn e3-btn-primary" id="e3-submit-fill" style="margin-top:12px">Kiểm tra</button>
    `;
  }

  // A blank whose label has no "..." is a caption written directly on the
  // book's own dotted answer line (e.g. "a) Từ lớn đến bé:  ....................")
  // rather than a blank embedded mid-sentence, so it renders the same
  // dashed, flex-filled line as a trailing "..." blank below — never a boxed
  // input floated to the row's far edge, which leaves the book's dotted line
  // unrepresented and clips long answers instead of growing into the space.
  // A blank whose label has one or more "..." gets an input inlined at each "..."
  // position instead — this matches the workbook page, where the student writes
  // straight into the blank wherever it falls in the sentence/equation (start,
  // middle, or after "="), and lets a row with several "..." (e.g. "35, ..., ...")
  // get one box per blank instead of forcing multiple answers into a single field.
  function renderBlankRow(b, i) {
    const parts = b.label.split('...');
    if (parts.length === 1) {
      const numeric = isPlainInt(b.answer);
      const input = `<input type="text" ${numeric ? 'inputmode="numeric"' : ''} class="game-input e3-blank-input gw-blank-inline gw-blank-dashed gw-blank-fill" style="min-width:3ch" data-idx="${i}" autocomplete="off">`;
      return `
        <div class="e3-blank-row e3-blank-row-inline">
          <label class="e3-blank-label e3-blank-label-inline">${b.label}${input}</label>
        </div>
      `;
    }
    const slotCount = parts.length - 1;
    // Only plain digits/commas/spaces (e.g. "36,37") get the digit-only virtual
    // keypad. A "+" (sum expressions like "100+30+9") or a letter (like "A và E")
    // must fall back to a normal free-typing field, or that character could never be entered.
    const numeric = /^[\d\s,;-]+$/.test(String(b.answer));
    // Best-effort per-slot expected value, just to size each box to its own
    // content (a short number vs. a full sum like "100+30+9") — never shown to the student.
    const slotAnswers = slotCount > 1 ? splitAnswerParts(b.answer) : [b.answer];
    // A single blank that ends the row (e.g. "139 = ...", nothing typed after
    // the "...") has no sibling box to line up with, so instead of a fixed
    // ch-width box it flex-grows to fill whatever room the row has left —
    // matching how the printed workbook just leaves a long blank line to
    // write on, rather than a fixed little box that clips longer answers.
    const isTrailingBlank = slotCount === 1 && !parts[parts.length - 1].trim();
    // A blank mid-sentence (more text follows on the same line, e.g. "Bông
    // hoa ... ghi phép tính...") can't flex-grow without either swallowing
    // the rest of the sentence or wrapping it away, so it keeps a fixed
    // width — but that width still needs a comfortable typing floor (~9ch),
    // not just enough characters to fit the expected answer, which cramped
    // a 1-letter answer into a 3ch box that also gave away the answer length.
    let slot = 0;
    const html = parts.map((text, idx) => {
      const isLast = idx === parts.length - 1;
      if (isLast) return text;
      const slotAnswer = slotAnswers[slot] ?? slotAnswers[0];
      const fillClass = isTrailingBlank ? ' gw-blank-fill' : '';
      const style = isTrailingBlank
        ? 'min-width:3ch'
        : `width:${Math.max(9, numeric ? String(slotAnswer).length + 2 : inputWidthCh(slotAnswer))}ch`;
      const input = `<input type="text" ${numeric ? 'inputmode="numeric"' : ''} class="game-input e3-blank-input gw-blank-inline gw-blank-dashed${fillClass}" style="${style}" data-idx="${i}" data-slot="${slot++}" autocomplete="off">`;
      return `${text}${input}`;
    }).join('');
    return `
      <div class="e3-blank-row e3-blank-row-inline">
        <label class="e3-blank-label e3-blank-label-inline">${html}</label>
      </div>
    `;
  }

  // For reveal-on-solved display of a multi-slot blank's answer (e.g. "36,37"
  // or "A và E") back into its individual boxes.
  function splitAnswerParts(answer) {
    return String(answer).split(/\s*,\s*|\s+và\s+/).map(s => s.trim());
  }

  // A question is normally one table (q.rows). It can instead be q.tables: an
  // array of { label?, headers?, rows } to render several distinct tables side
  // by side under one question — the book shows this for e.g. "1. Số?" with a
  // separate a) addition table and b) subtraction table, which don't share
  // columns and so can't be merged into rows of a single table.
  function tableGroups(q) { return q.tables || [{ rows: q.rows, headers: q.headers }]; }
  function tableCell(q, t, r, c) { return rowCells(tableGroups(q)[t].rows[r])[c]; }

  // A headers-less table (every "Số?" sequence/fact-family drill: a)/b) rows
  // of plain numbers and blanks, or a first-cell label like "Số hạng"/"Tổng")
  // holds uniformly-sized content, so its columns should read as one even
  // grid. The browser's default auto layout instead sizes each column off
  // whichever cell happens to be widest: a column landing on a given-number
  // row only needed enough width for "6", while the same column's
  // blank-input row forced a wider min-width — two rows disagreeing about
  // one column's width, which is what visibly jittered the columns.
  //
  // Two things that look like they'd fix it, but don't:
  // - table-layout:fixed alone locks column widths but then ignores every
  //   cell's own min-width, so wide (10+ column) tables of 3-digit numbers
  //   got columns narrower than their content and clipped it.
  // - an explicit width in `ch` on each cell doesn't work either, because
  //   `ch` is relative to *that element's own* font-size — .gw-table-given
  //   and .gw-table-input use slightly different font-sizes, so the "same"
  //   `9ch` renders as a different pixel width on a given-cell than on an
  //   input-cell, reintroducing uneven columns from a different cause.
  //
  // What actually works: table-layout:fixed *with* an explicit pixel width
  // on a <col> per column. A <col> width is a single value applied to the
  // whole column regardless of any individual cell's font, so every cell in
  // that column gets the identical pixel width, content-mismatch-proof.
  //
  // Each column's px is sized off *that column's own* values only, not the
  // longest value anywhere in the table — a table like "Thừa số/Thừa
  // số/Tích" has a first column holding those (7-char) words while every
  // other column holds a 1–2 digit number; sizing every column off the
  // table-wide longest value made all ten number columns as wide as the
  // word column, wasting space and forcing horizontal scroll that a
  // same-shape 1–2 digit table otherwise doesn't need. A column whose own
  // values genuinely need more room (e.g. one column happens to hold a
  // 3-digit number) still grows past 100% and scrolls via .gw-table-wrap
  // instead of clipping — just that column, not the whole table.
  //
  // A table WITH headers (e.g. "Đọc số" spelling a number out in words next
  // to single-digit "Trăm"/"Chục"/"Đơn vị" columns) can genuinely need
  // uneven columns, so it keeps plain auto layout untouched.
  function tableColWidthsPx(t) {
    const dataColCount = rowCells(t.rows[0]).length;
    return Array.from({ length: dataColCount }, (_, c) => {
      const colVals = t.rows.map(row => {
        const cell = rowCells(row)[c];
        return (cell && typeof cell === 'object' && cell.blank) ? cell.answer : cell;
      });
      const maxLen = Math.max(1, ...colVals.map(v => String(v).length));
      // ~8px/character plus the cell's own horizontal padding.
      return Math.max(32, maxLen * 8 + 18);
    });
  }

  function renderTableArea(q) {
    const groups = tableGroups(q);
    const isGroup = !!q.tables;
    return `
      <div class="${isGroup ? 'gw-table-group' : ''}" id="gw-table">
        ${groups.map((t, ti) => {
          const colWidths = t.headers ? null : tableColWidthsPx(t);
          const hasRowLabel = t.rows.some(rowLabelOf);
          const colgroup = colWidths ? `
            <colgroup>
              ${hasRowLabel ? '<col style="width:1.8rem">' : ''}
              ${colWidths.map(w => `<col style="width:${w}px">`).join('')}
            </colgroup>
          ` : '';
          return `
          <div class="${isGroup ? 'gw-table-group-item' : ''}">
            ${t.label ? `<div class="gw-table-group-label">${t.label}</div>` : ''}
            <div class="gw-table-wrap">
              <table class="gw-table${colWidths ? ' gw-table-fixed' : ''}">
                ${colgroup}
                ${t.headers ? `<thead><tr>${t.rows.some(rowLabelOf) ? '<th></th>' : ''}${t.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>` : ''}
                <tbody>
                  ${t.rows.map((row, r) => `<tr class="${isSampleRow(row) ? 'gw-table-sample-row' : ''}">${rowLabelOf(row) ? `<td class="gw-table-rowlabel">${rowLabelOf(row)}</td>` : ''}${rowCells(row).map((cell, c) => {
                    if (cell && typeof cell === 'object' && cell.blank) {
                      const numeric = isPlainInt(cell.answer);
                      return `<td class="gw-table-input-cell"><input type="text" ${numeric ? 'inputmode="numeric"' : ''} class="game-input gw-table-input" data-t="${ti}" data-r="${r}" data-c="${c}" autocomplete="off"></td>`;
                    }
                    return `<td class="gw-table-given">${cell}</td>`;
                  }).join('')}</tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
        }).join('')}
      </div>
      <button class="e3-btn e3-btn-primary" id="gw-table-check" style="margin-top:12px">Kiểm tra</button>
    `;
  }

  function renderCompareArea(q) {
    return `
      <div class="gw-compare" id="gw-compare">
        ${q.rows.map((row, i) => `
          <div class="gw-compare-row" data-idx="${i}">
            <span class="gw-compare-expr">${row.left}</span>
            <div class="gw-compare-btns">
              ${['>', '<', '='].map(s => `<button type="button" class="gw-compare-btn" data-idx="${i}" data-sym="${s}">${s}</button>`).join('')}
            </div>
            <span class="gw-compare-expr">${row.right}</span>
          </div>
        `).join('')}
      </div>
      <button class="e3-btn e3-btn-primary" id="gw-compare-check" style="margin-top:12px" disabled>Kiểm tra</button>
    `;
  }

  function renderMatchArea(q) {
    const renderItem = (item) => item.img
      ? `<img src="${item.img}" class="gw-match-img" alt="">`
      : `<span>${escapeHtml(item.text)}</span>`;
    return `
      <div class="gw-match" id="gw-match">
        <svg class="gw-match-svg" id="gw-match-svg"></svg>
        <div class="gw-match-grid">
          ${q.left.map((item, i) => `
            <button type="button" class="gw-match-item" data-side="left" data-id="${item.id}">${renderItem(item)}</button>
            <button type="button" class="gw-match-item" data-side="right" data-id="${q.right[i].id}">${renderItem(q.right[i])}</button>
          `).join('')}
        </div>
      </div>
      <p class="gw-match-hint">Bấm 1 ô bên trái rồi bấm ô tương ứng bên phải để nối, sau đó bấm Kiểm tra.</p>
      <button class="e3-btn e3-btn-primary" id="gw-match-check" style="margin-top:12px" disabled>Kiểm tra</button>
    `;
  }

  // Removes the drawn line (if any) for a given left item.
  function removeMatchLine(leftId) {
    app.querySelector(`#gw-match-svg path[data-left-id="${leftId}"]`)?.remove();
  }

  // Draws (or redraws) an SVG line connecting a matched left/right button pair.
  function drawMatchLine(leftId, rightId, color) {
    const container = app.querySelector('#gw-match');
    const svg = app.querySelector('#gw-match-svg');
    if (!container || !svg) return;
    removeMatchLine(leftId);
    const leftBtn = container.querySelector(`.gw-match-item[data-side="left"][data-id="${leftId}"]`);
    const rightBtn = container.querySelector(`.gw-match-item[data-side="right"][data-id="${rightId}"]`);
    if (!leftBtn || !rightBtn) return;
    const box = container.getBoundingClientRect();
    const lr = leftBtn.getBoundingClientRect();
    const rr = rightBtn.getBoundingClientRect();
    const x1 = lr.right - box.left, y1 = lr.top + lr.height / 2 - box.top;
    const x2 = rr.left - box.left, y2 = rr.top + rr.height / 2 - box.top;
    const midX = (x1 + x2) / 2;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`);
    path.setAttribute('class', 'gw-match-line');
    path.setAttribute('stroke', color || '#22c55e');
    path.dataset.leftId = leftId;
    path.dataset.rightId = rightId;
    svg.appendChild(path);
  }

  // ── ANSWER HANDLERS (dispatch by type) ──────────────────────────────────────
  function attachAnswerHandlers(q) {
    if (q.type === 'choice') return attachChoiceHandlers(q);
    if (q.type === 'fill') return attachFillHandlers(q);
    if (q.type === 'table') return attachTableHandlers(q);
    if (q.type === 'compare') return attachCompareHandlers(q);
    if (q.type === 'match') return attachMatchHandlers(q);
  }

  function normalize(v) {
    const n = parseFloat(String(v).replace(',', '.').replace(/\s+/g, ''));
    return isNaN(n) ? String(v).trim().toLowerCase().replace(/\s+/g, ' ') : n;
  }

  function checkBlank(b, value) {
    if (b.validate) return b.validate(value);
    return normalize(value) === normalize(b.answer);
  }

  function revealChoiceAnswer(q, correctIndices, chosenIndices) {
    const chosenSet = new Set(chosenIndices);
    app.querySelectorAll('.e3-option').forEach((btn, i) => {
      btn.disabled = true;
      if (correctIndices.includes(i)) btn.classList.add('e3-correct');
      else if (chosenSet.has(i)) btn.classList.add('e3-wrong');
    });
    app.querySelector('#e3-submit-multi')?.remove();
  }

  function attachChoiceHandlers(q) {
    if (solved[current]) {
      if (q.multi) {
        revealChoiceAnswer(q, [...q.answer], [...q.answer]);
        app.querySelector('#e3-submit-multi')?.remove();
      } else {
        revealChoiceAnswer(q, [q.answer], [q.answer]);
      }
      showFeedback(true);
      return;
    }

    if (q.multi) {
      const submitBtn = app.querySelector('#e3-submit-multi');
      app.querySelectorAll('.e3-option').forEach(btn => {
        btn.onclick = () => {
          const idx = parseInt(btn.dataset.idx);
          btn.classList.toggle('e3-selected');
          const pos = multiSelected.indexOf(idx);
          if (pos === -1) multiSelected.push(idx); else multiSelected.splice(pos, 1);
          submitBtn.disabled = multiSelected.length === 0;
        };
      });
      submitBtn.onclick = () => {
        const chosen = [...multiSelected].sort();
        const correct = [...q.answer].sort();
        const isRight = chosen.length === correct.length && chosen.every((v, i) => v === correct[i]);
        attempted[current] = true;
        if (isRight) {
          solved[current] = true;
          persistAttempt(current, true);
          submitBtn.remove();
          revealChoiceAnswer(q, correct, chosen);
          showFeedback(true);
        } else {
          wrongCounts[current]++;
          persistAttempt(current, false);
          app.querySelectorAll('.e3-option').forEach((btn, i) => { if (chosen.includes(i)) btn.classList.add('e3-wrong'); });
          showFeedback(false);
          refreshHints(q);
          submitBtn.disabled = true;
          setTimeout(() => {
            multiSelected = [];
            app.querySelectorAll('.e3-option').forEach(btn => btn.classList.remove('e3-selected', 'e3-wrong'));
          }, 700);
        }
      };
      return;
    }

    app.querySelectorAll('.e3-option').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.idx);
        attempted[current] = true;
        if (idx === q.answer) {
          solved[current] = true;
          persistAttempt(current, true);
          revealChoiceAnswer(q, [q.answer], [idx]);
          showFeedback(true);
        } else {
          wrongCounts[current]++;
          persistAttempt(current, false);
          btn.classList.add('e3-wrong');
          showFeedback(false);
          refreshHints(q);
          setTimeout(() => btn.classList.remove('e3-wrong'), 700);
        }
      };
    });
  }

  function attachFillHandlers(q) {
    // Group inputs by their blank index — a multi-slot blank (several "..." in
    // one label) has more than one input sharing the same data-idx.
    const groups = q.blanks.map((b, i) => [...app.querySelectorAll(`.e3-blank-input[data-idx="${i}"]`)]);
    const inputs = groups.flat();
    const submitBtn = app.querySelector('#e3-submit-fill');
    if (solved[current]) {
      q.blanks.forEach((b, i) => {
        const group = groups[i];
        const parts = group.length > 1 ? splitAnswerParts(b.answer) : [b.answer];
        group.forEach((inp, j) => {
          inp.value = parts[j] ?? '';
          inp.disabled = true;
          inp.classList.add('e3-correct-input');
        });
      });
      submitBtn.remove();
      showFeedback(true);
      return;
    }

    submitBtn.onclick = () => {
      const valuesPerBlank = groups.map(group => group.map(inp => inp.value.trim()));
      if (valuesPerBlank.some(vals => vals.some(v => v === ''))) return;
      attempted[current] = true;
      const correctFlags = q.blanks.map((b, i) => checkBlank(b, valuesPerBlank[i].join(',')));
      const allCorrect = correctFlags.every(Boolean);
      if (allCorrect) {
        solved[current] = true;
        persistAttempt(current, true);
        inputs.forEach(inp => { inp.disabled = true; inp.classList.add('e3-correct-input'); });
        submitBtn.remove();
        showFeedback(true);
      } else {
        wrongCounts[current]++;
        persistAttempt(current, false);
        q.blanks.forEach((b, i) => { if (!correctFlags[i]) groups[i].forEach(inp => inp.classList.add('e3-wrong-input')); });
        showFeedback(false);
        refreshHints(q);
        setTimeout(() => inputs.forEach(inp => inp.classList.remove('e3-wrong-input')), 700);
      }
    };
  }

  function attachTableHandlers(q) {
    const inputs = [...app.querySelectorAll('.gw-table-input')];
    const checkBtn = app.querySelector('#gw-table-check');
    if (solved[current]) {
      inputs.forEach(inp => {
        const cell = tableCell(q, inp.dataset.t, inp.dataset.r, inp.dataset.c);
        inp.value = cell.answer;
        inp.disabled = true;
        inp.classList.add('e3-correct-input');
      });
      checkBtn.remove();
      showFeedback(true);
      return;
    }

    checkBtn.onclick = () => {
      const values = inputs.map(inp => inp.value.trim());
      if (values.some(v => v === '')) return;
      attempted[current] = true;
      const flags = inputs.map(inp => {
        const cell = tableCell(q, inp.dataset.t, inp.dataset.r, inp.dataset.c);
        return checkBlank(cell, inp.value.trim());
      });
      const allCorrect = flags.every(Boolean);
      if (allCorrect) {
        solved[current] = true;
        persistAttempt(current, true);
        inputs.forEach(inp => { inp.disabled = true; inp.classList.add('e3-correct-input'); });
        checkBtn.remove();
        showFeedback(true);
      } else {
        wrongCounts[current]++;
        persistAttempt(current, false);
        inputs.forEach((inp, i) => { if (!flags[i]) inp.classList.add('e3-wrong-input'); });
        showFeedback(false);
        refreshHints(q);
        setTimeout(() => inputs.forEach(inp => inp.classList.remove('e3-wrong-input')), 700);
      }
    };
  }

  function attachCompareHandlers(q) {
    const checkBtn = app.querySelector('#gw-compare-check');
    if (solved[current]) {
      q.rows.forEach((row, i) => {
        const btn = app.querySelector(`.gw-compare-btn[data-idx="${i}"][data-sym="${row.answer === '=' ? '=' : row.answer}"]`);
        btn?.classList.add('gw-compare-selected', 'gw-compare-correct');
      });
      app.querySelectorAll('.gw-compare-btn').forEach(b => { b.disabled = true; });
      checkBtn.remove();
      showFeedback(true);
      return;
    }

    app.querySelectorAll('.gw-compare-btn').forEach(btn => {
      btn.onclick = () => {
        const i = parseInt(btn.dataset.idx, 10);
        compareSelected[i] = btn.dataset.sym;
        app.querySelectorAll(`.gw-compare-btn[data-idx="${i}"]`).forEach(b => b.classList.remove('gw-compare-selected'));
        btn.classList.add('gw-compare-selected');
        checkBtn.disabled = compareSelected.some(v => v === null);
      };
    });

    checkBtn.onclick = () => {
      attempted[current] = true;
      const allCorrect = q.rows.every((row, i) => compareSelected[i] === row.answer);
      if (allCorrect) {
        solved[current] = true;
        persistAttempt(current, true);
        app.querySelectorAll('.gw-compare-btn').forEach(b => { b.disabled = true; });
        q.rows.forEach((row, i) => {
          app.querySelector(`.gw-compare-btn[data-idx="${i}"][data-sym="${row.answer}"]`)?.classList.add('gw-compare-correct');
        });
        checkBtn.remove();
        showFeedback(true);
      } else {
        wrongCounts[current]++;
        persistAttempt(current, false);
        q.rows.forEach((row, i) => {
          if (compareSelected[i] !== row.answer) {
            app.querySelector(`.gw-compare-btn[data-idx="${i}"].gw-compare-selected`)?.classList.add('gw-compare-wrong');
          }
        });
        showFeedback(false);
        refreshHints(q);
        setTimeout(() => app.querySelectorAll('.gw-compare-wrong').forEach(b => b.classList.remove('gw-compare-wrong')), 700);
      }
    };
  }

  function attachMatchHandlers(q) {
    const checkBtn = app.querySelector('#gw-match-check');
    if (solved[current]) {
      app.querySelectorAll('.gw-match-item').forEach(btn => { btn.disabled = true; });
      q.left.forEach(l => app.querySelector(`.gw-match-item[data-id="${l.id}"]`)?.classList.add('gw-match-correct'));
      q.right.forEach(r => {
        if (q.pairs.some(p => p[1] === r.id)) app.querySelector(`.gw-match-item[data-id="${r.id}"]`)?.classList.add('gw-match-correct');
      });
      q.pairs.forEach(([leftId, rightId]) => drawMatchLine(leftId, rightId));
      checkBtn?.remove();
      showFeedback(true);
      return;
    }

    const leftBtns = [...app.querySelectorAll('.gw-match-item[data-side="left"]')];
    const rightBtns = [...app.querySelectorAll('.gw-match-item[data-side="right"]')];

    const updateCheckBtn = () => {
      checkBtn.disabled = (matchLocked.size + matchPairs.size) < q.left.length;
    };

    const unlinkLeft = (leftId) => {
      if (!matchPairs.has(leftId)) return;
      matchPairs.delete(leftId);
      removeMatchLine(leftId);
      app.querySelector(`.gw-match-item[data-id="${leftId}"]`)?.classList.remove('gw-match-linked');
    };

    const clearSelection = () => {
      app.querySelectorAll('.gw-match-item').forEach(b => b.classList.remove('gw-match-selected'));
      selectedMatchItem = null;
    };

    const makePair = (leftId, rightId) => {
      const leftBtn = app.querySelector(`.gw-match-item[data-id="${leftId}"]`);
      const rightBtn = app.querySelector(`.gw-match-item[data-id="${rightId}"]`);

      // Free up either item if it was already tentatively linked to something else.
      for (const [otherLeft, otherRight] of matchPairs) {
        if (otherLeft === leftId || otherRight === rightId) unlinkLeft(otherLeft);
      }

      matchPairs.set(leftId, rightId);
      leftBtn.classList.remove('gw-match-selected');
      rightBtn.classList.remove('gw-match-selected');
      leftBtn.classList.add('gw-match-linked');
      rightBtn.classList.add('gw-match-linked');
      drawMatchLine(leftId, rightId, '#60A5FA');
      selectedMatchItem = null;
      updateCheckBtn();
    };

    const onItemClick = (btn) => {
      const side = btn.dataset.side;
      const id = btn.dataset.id;
      if (btn.disabled || matchLocked.has(id)) return;

      if (selectedMatchItem && selectedMatchItem.side !== side) {
        // Completing a pair started from the other column.
        const leftId = side === 'left' ? id : selectedMatchItem.id;
        const rightId = side === 'right' ? id : selectedMatchItem.id;
        makePair(leftId, rightId);
        return;
      }

      // Selecting (or re-selecting) the starting item.
      clearSelection();
      selectedMatchItem = { side, id };
      btn.classList.add('gw-match-selected');
    };

    [...leftBtns, ...rightBtns].forEach(btn => { btn.onclick = () => onItemClick(btn); });

    checkBtn.onclick = () => {
      if (checkBtn.disabled) return;
      attempted[current] = true;
      const pendingLeftIds = [...matchPairs.keys()];
      const allCorrect = pendingLeftIds.every(leftId => q.pairs.some(p => p[0] === leftId && p[1] === matchPairs.get(leftId)));

      pendingLeftIds.forEach(leftId => {
        const rightId = matchPairs.get(leftId);
        const leftBtn = app.querySelector(`.gw-match-item[data-id="${leftId}"]`);
        const rightBtn = app.querySelector(`.gw-match-item[data-id="${rightId}"]`);
        const isCorrect = q.pairs.some(p => p[0] === leftId && p[1] === rightId);
        if (isCorrect) {
          matchLocked.add(leftId);
          matchPairs.delete(leftId);
          leftBtn.classList.remove('gw-match-linked');
          leftBtn.classList.add('gw-match-correct');
          leftBtn.disabled = true;
          rightBtn.classList.remove('gw-match-linked');
          rightBtn.classList.add('gw-match-correct');
          rightBtn.disabled = true;
          drawMatchLine(leftId, rightId, '#22c55e');
        } else {
          leftBtn.classList.add('gw-match-wrong');
          rightBtn.classList.add('gw-match-wrong');
        }
      });

      if (allCorrect && matchLocked.size === q.left.length) {
        solved[current] = true;
        persistAttempt(current, true);
        checkBtn.remove();
        showFeedback(true);
      } else {
        wrongCounts[current]++;
        persistAttempt(current, false);
        showFeedback(false);
        refreshHints(q);
        checkBtn.disabled = true;
        setTimeout(() => {
          [...matchPairs.keys()].forEach(leftId => {
            const rightId = matchPairs.get(leftId);
            const leftBtn = app.querySelector(`.gw-match-item[data-id="${leftId}"]`);
            const rightBtn = app.querySelector(`.gw-match-item[data-id="${rightId}"]`);
            leftBtn?.classList.remove('gw-match-wrong', 'gw-match-linked');
            rightBtn?.classList.remove('gw-match-wrong', 'gw-match-linked');
            unlinkLeft(leftId);
          });
          updateCheckBtn();
        }, 700);
      }
    };

    updateCheckBtn();
  }

  function showFeedback(isRight) {
    app.querySelector('.e3-feedback')?.remove();
    const banner = document.createElement('div');
    banner.className = `e3-feedback ${isRight ? 'e3-feedback-right' : 'e3-feedback-wrong'}`;
    banner.innerHTML = isRight ? '✅ Đúng rồi! Giỏi lắm!' : '❌ Chưa đúng! Thử lại nhé.';
    const anchor = app.querySelector('#e3-blanks') || app.querySelector('#e3-options')
      || app.querySelector('#gw-table') || app.querySelector('#gw-compare') || app.querySelector('#gw-match');
    anchor.after(banner);

    if (isRight) {
      app.querySelector('#e3-nav').style.display = 'flex';
      app.querySelector('#e3-next').onclick = () => {
        current++;
        if (current >= activeQuestions.length) showResult();
        else showQuestion();
      };
    } else {
      setTimeout(() => banner.remove(), 1600);
    }
  }

  // ── RESULT ────────────────────────────────────────────────────────────────
  function showResult() {
    const correctCount = solved.filter(Boolean).length;
    const total = activeQuestions.length;
    const pct = Math.round((correctCount / total) * 100);
    const { emoji, label, color } = getGrade(pct);

    app.innerHTML = `
      <div class="e3-wrap gw-app">
        <div class="e3-result animate-fadeIn">
          <div class="e3-result-tag" style="color:${activeColor}">${activeTitle}</div>
          <div class="e3-result-icon">${emoji}</div>
          <h2 class="e3-result-grade" style="color:${color}">${label}</h2>
          <div class="e3-result-score">${correctCount} / ${total}</div>
          <div class="e3-result-pct">${pct}% câu đúng</div>

          <div class="e3-result-list">
            ${activeQuestions.map((q, i) => {
              const ok = solved[i];
              return `
                <div class="e3-result-row ${ok ? 'e3-row-ok' : 'e3-row-fail'}">
                  <span class="e3-row-num">${i + 1}</span>
                  <span class="e3-row-q">${q.q.split('\n')[0]}</span>
                  <span class="e3-row-mark">${ok ? '✅' : '❌'}</span>
                </div>
              `;
            }).join('')}
          </div>

          <div class="e3-result-actions">
            <button class="e3-btn e3-btn-primary" id="e3-retry">🔄 Làm lại</button>
            <button class="e3-btn e3-btn-ghost" id="e3-home-result">🏠 Chọn bài khác</button>
          </div>
        </div>
      </div>
    `;

    app.querySelector('#e3-retry').onclick = () => {
      activeUnitIds.forEach(id => clearUnitStorage(id));
      resetProgress();
      current = 0;
      showQuestion();
    };
    app.querySelector('#e3-home-result').onclick = showIntro;
  }

  showIntro();
}

function getGrade(pct) {
  if (pct >= 90) return { emoji: '🏆', label: 'Xuất sắc!', color: '#F59E0B' };
  if (pct >= 75) return { emoji: '🌟', label: 'Giỏi!', color: '#10B981' };
  if (pct >= 60) return { emoji: '😊', label: 'Khá!', color: '#3B82F6' };
  if (pct >= 40) return { emoji: '📖', label: 'Cần ôn thêm', color: '#8B5CF6' };
  return { emoji: '💪', label: 'Cố lên nhé!', color: '#EF4444' };
}

// ── STYLES ───────────────────────────────────────────────────────────────────
// Reuses the exact same "e3-*" visual language as grade3Exam.js (same #e3-styles
// guard, so whichever module loads first injects it once) plus "gw-*" additions
// for the new unit menu, table, compare and match components.

function injectStyles() {
  if (!document.getElementById('e3-styles')) {
    const style = document.createElement('style');
    style.id = 'e3-styles';
    style.textContent = `
      .e3-wrap { min-height: 100vh; background: linear-gradient(160deg, #ECFDF5 0%, #EFF6FF 50%, #F5F3FF 100%); display: flex; justify-content: center; align-items: flex-start; padding: 1rem; box-sizing: border-box; }
      .e3-intro { background: #fff; border-radius: 1.5rem; padding: 2.5rem 2rem; max-width: 560px; width: 100%; margin: auto; text-align: center; box-shadow: var(--shadow-lg, 0 8px 30px rgba(0,0,0,0.12)); }
      .e3-badge { font-size: 3rem; margin-bottom: 0.5rem; }
      .e3-title { font-size: clamp(1.4rem, 5vw, 1.9rem); font-weight: 800; color: #1E293B; margin: 0 0 0.3rem; }
      .e3-sub { color: #64748B; font-size: 1rem; margin: 0 0 1.5rem; }
      .e3-section-label { font-weight: 700; color: #374151; margin-bottom: 0.75rem; font-size: 0.95rem; }
      .e3-section-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-bottom: 1.2rem; }
      .e3-section-btn { display: flex; flex-direction: column; align-items: center; gap: 0.2rem; padding: 0.9rem 0.5rem; border: 2px solid #e2e8f0; border-radius: 1rem; background: #f8fafc; cursor: pointer; font-family: inherit; transition: border-color 0.15s, background 0.15s, transform 0.1s; }
      .e3-section-btn:hover { border-color: var(--sec-color, #34D399); background: #fff; transform: translateY(-2px); }
      .e3-section-all { grid-column: 1 / -1; flex-direction: row; gap: 0.6rem; justify-content: center; }
      .e3-sec-icon { font-size: 1.4rem; }
      .e3-sec-title { font-weight: 700; font-size: 0.9rem; color: #1E293B; }
      .e3-sec-count { font-size: 0.8rem; color: #64748B; }
      .e3-divider { height: 1px; background: #e2e8f0; margin: 0.8rem 0; }
      .e3-note { font-size: 0.8rem; color: #94a3b8; margin-bottom: 1rem; }
      .e3-note a { color: #60A5FA; }
      .e3-btn { border: none; border-radius: 0.75rem; padding: 0.85rem 1.5rem; font-size: 1rem; font-weight: 700; cursor: pointer; transition: transform 0.12s, box-shadow 0.12s; font-family: inherit; }
      .e3-btn:active { transform: scale(0.97); }
      .e3-btn:disabled { opacity: 0.5; cursor: default; }
      .e3-btn-primary { background: linear-gradient(135deg, #34D399, #22D3EE); color: #fff; box-shadow: 0 4px 16px rgba(52,211,153,0.35); width: 100%; }
      .e3-btn-ghost { background: #f1f5f9; color: #475569; }
      .e3-btn-ghost:hover { background: #e2e8f0; }
      .e3-intro .e3-btn { width: auto; }
      .e3-back-icon { background: rgba(0,0,0,0.08); border: none; color: #1E293B; font-size: 1rem; width: 2.2rem; height: 2.2rem; border-radius: 0.6rem; cursor: pointer; font-weight: 700; flex-shrink: 0; }
      .e3-qlist-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.45); z-index: 1000; display: flex; justify-content: flex-end; align-items: stretch; }
      .e3-qlist-panel { width: min(320px, 85vw); background: #fff; box-shadow: -8px 0 30px rgba(0,0,0,0.18); padding: 1.2rem; display: flex; flex-direction: column; gap: 1rem; overflow-y: auto; animation: e3SlideIn 0.2s ease; }
      @keyframes e3SlideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      .e3-qlist-header { display: flex; justify-content: space-between; align-items: center; font-weight: 800; color: #1E293B; font-size: 1rem; }
      .e3-qlist-close { background: rgba(0,0,0,0.08); border: none; color: #1E293B; width: 1.9rem; height: 1.9rem; border-radius: 0.5rem; cursor: pointer; font-weight: 700; }
      .e3-qlist-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.5rem; }
      .e3-qitem { aspect-ratio: 1; border-radius: 0.6rem; border: 2px solid #e2e8f0; background: #f8fafc; color: #475569; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; justify-content: center; font-family: inherit; transition: transform 0.1s, border-color 0.15s; }
      .e3-qitem:hover { transform: translateY(-2px); }
      .e3-qitem-current { border-color: #1E293B; box-shadow: 0 0 0 2px rgba(30,41,59,0.15); }
      .e3-qitem-correct { background: #dcfce7; border-color: #22c55e; color: #166534; }
      .e3-qitem-wrong { background: #fee2e2; border-color: #ef4444; color: #991b1b; }
      .e3-qlist-legend { display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.82rem; color: #475569; }
      .e3-qlist-legend span { display: flex; align-items: center; gap: 0.5rem; }
      .e3-legend-dot { width: 0.85rem; height: 0.85rem; border-radius: 0.25rem; display: inline-block; border: 2px solid #e2e8f0; background: #f8fafc; }
      .e3-legend-dot.e3-legend-correct { background: #dcfce7; border-color: #22c55e; }
      .e3-legend-dot.e3-legend-wrong { background: #fee2e2; border-color: #ef4444; }
      .e3-quiz { max-width: 640px; width: 100%; margin: 0 auto; padding-bottom: 2rem; }
      .e3-topbar { display: flex; align-items: center; gap: 0.8rem; padding: 0.5rem 0 1rem; }
      .e3-progress-wrap { flex: 1; display: flex; align-items: center; gap: 0.6rem; }
      .e3-progress-track { flex: 1; height: 8px; background: rgba(0,0,0,0.08); border-radius: 999px; overflow: hidden; }
      .e3-progress-fill { height: 100%; border-radius: 999px; transition: width 0.4s ease; }
      .e3-progress-label { color: #475569; font-size: 0.85rem; white-space: nowrap; font-weight: 600; }
      .e3-question-card { background: #fff; border-radius: 1.2rem; padding: 1.4rem 1.5rem; margin-bottom: 1rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
      .e3-q-num { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
      .e3-q-text { font-size: clamp(1.05rem, 3.1vw, 1.25rem); font-weight: 700; color: #1E293B; line-height: 1.5; white-space: pre-line; }
      .e3-q-img { max-width: 100%; margin-top: 0.8rem; border-radius: 0.75rem; display: block; }
      .e3-options { display: flex; flex-direction: column; gap: 0.6rem; }
      .e3-option { display: flex; align-items: flex-start; gap: 0.8rem; background: #fff; border: 2px solid transparent; border-radius: 1rem; padding: 0.9rem 1rem; cursor: pointer; text-align: left; font-family: inherit; font-size: 1.05rem; font-weight: 600; color: #1e293b; transition: background 0.15s, border-color 0.15s, transform 0.1s; box-shadow: 0 2px 8px rgba(0,0,0,0.08); line-height: 1.4; }
      .e3-option:hover:not(:disabled) { border-color: #34D399; transform: translateX(3px); }
      .e3-option:disabled { cursor: default; }
      .e3-option-label { width: 2rem; height: 2rem; background: #1E293B; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 800; flex-shrink: 0; }
      .e3-option-text { flex: 1; }
      .e3-option.e3-selected { border-color: #60A5FA; background: #EFF6FF; }
      .e3-option.e3-correct { background: #dcfce7; border-color: #22c55e; }
      .e3-option.e3-correct .e3-option-label { background: #22c55e; }
      .e3-option.e3-wrong { background: #fee2e2; border-color: #ef4444; }
      .e3-option.e3-wrong .e3-option-label { background: #ef4444; }
      .e3-blanks { display: flex; flex-direction: column; gap: 0.7rem; }
      .e3-blank-row { display: flex; align-items: center; justify-content: space-between; gap: 0.8rem; background: #fff; border-radius: 0.9rem; padding: 0.7rem 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
      .e3-blank-label { font-size: 1rem; font-weight: 600; color: #374151; flex: 1; }
      .e3-blank-input { width: 90px; height: 42px; text-align: center; font-size: 1.2rem; font-weight: 700; border: 2px solid #e2e8f0; border-radius: 0.6rem; }
      .e3-blank-input:disabled.e3-correct-input { border-color: #22c55e; background: #dcfce7; color: #166534; }
      .e3-blank-input:disabled.e3-wrong-input { border-color: #ef4444; background: #fee2e2; color: #991b1b; }
      .e3-blank-row-inline { justify-content: flex-start; }
      .e3-blank-label-inline { flex: 1; width: 100%; display: inline-flex; align-items: center; flex-wrap: wrap; gap: 0.35rem; line-height: 2.2; }
      .gw-blank-inline { width: 3.4rem; height: 36px; text-align: center; font-size: 1.2rem; font-weight: 700; vertical-align: middle; }
      .gw-blank-inline.gw-blank-dashed { height: 34px; text-align: center; padding: 0 0.2rem; border: none; border-bottom: 2px dashed #94a3b8; border-radius: 0; background: transparent; }
      .gw-blank-inline.gw-blank-dashed:focus { outline: none; border-bottom-color: #34D399; border-bottom-style: solid; }
      .gw-blank-inline.gw-blank-dashed:disabled.e3-correct-input { background: transparent; border-bottom-style: solid; border-bottom-color: #22c55e; color: #166534; }
      .gw-blank-inline.gw-blank-dashed:disabled.e3-wrong-input { background: transparent; border-bottom-style: solid; border-bottom-color: #ef4444; color: #991b1b; }
      .gw-blank-inline.gw-blank-fill { flex: 1 1 auto; width: auto; text-align: left; }
      .e3-feedback { border-radius: 0.85rem; padding: 0.85rem 1.1rem; font-size: 1.05rem; font-weight: 600; margin-top: 0.8rem; line-height: 1.45; }
      .e3-feedback-right { background: #dcfce7; color: #166534; border: 1.5px solid #86efac; }
      .e3-feedback-wrong { background: #fee2e2; color: #991b1b; border: 1.5px solid #fca5a5; }
      .e3-nav { margin-top: 1rem; justify-content: flex-end; }
      .e3-nav .e3-btn { width: auto; }
      .e3-solution { background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 1rem; padding: 1rem; margin-top: 1rem; display: flex; flex-direction: column; gap: 0.7rem; }
      .e3-solution-locked { border-style: solid; border-color: #e2e8f0; background: #fff; }
      .e3-solution-label { font-weight: 700; font-size: 1rem; color: #334155; }
      .e3-solution-rows { display: flex; flex-direction: column; gap: 0.5rem; }
      .e3-sol-row { display: flex; align-items: center; gap: 0.5rem; }
      .e3-sol-row-icon { font-size: 1rem; flex-shrink: 0; }
      .e3-sol-row-input { flex: 1; border: 2px solid #e2e8f0; border-radius: 0.6rem; padding: 0.5rem 0.7rem; font-family: inherit; font-size: 1rem; min-width: 0; }
      .e3-sol-row-input:focus { outline: none; border-color: #34D399; }
      .e3-sol-row-formula-input { font-family: 'Courier New', monospace; font-weight: 700; }
      .e3-sol-row-remove { background: none; border: none; color: #94a3b8; font-size: 0.9rem; cursor: pointer; flex-shrink: 0; width: 1.7rem; height: 1.7rem; border-radius: 0.4rem; }
      .e3-sol-row-remove:hover { background: #fee2e2; color: #ef4444; }
      .e3-sol-row-readonly { background: #f8fafc; border-radius: 0.6rem; padding: 0.5rem 0.7rem; }
      .e3-sol-row-text-display { flex: 1; font-size: 1rem; color: #334155; white-space: pre-wrap; word-break: break-word; }
      .e3-sol-empty { font-size: 0.85rem; color: #94a3b8; font-style: italic; }
      .e3-solution-toolbar { display: flex; flex-wrap: wrap; gap: 0.4rem; }
      .e3-solution-hint { font-size: 0.85rem; color: #64748b; }
      .e3-hint-chip { background: #e0f2fe; color: #0369a1; font-weight: 700; padding: 0.1rem 0.45rem; border-radius: 0.4rem; white-space: nowrap; }
      .e3-sym-btn { width: 2.1rem; height: 2.1rem; border-radius: 0.5rem; border: 2px solid #e2e8f0; background: #fff; font-weight: 800; font-size: 1rem; cursor: pointer; color: #1e293b; font-family: inherit; }
      .e3-sym-btn:hover { border-color: #34D399; }
      .e3-solution-controls { display: flex; gap: 0.5rem; flex-wrap: wrap; }
      .e3-btn-sm { width: auto; padding: 0.5rem 0.9rem; font-size: 0.85rem; }
      .e3-solution-controls .e3-btn-sm { flex: 1; }
      .e3-answer-locked-note { text-align: center; padding: 0.9rem; color: #94a3b8; font-size: 0.95rem; font-style: italic; background: #f8fafc; border-radius: 0.8rem; margin-top: 0.9rem; }
      .e3-subquestions { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.9rem; }
      .e3-subq { font-size: clamp(1.05rem, 3.1vw, 1.25rem); font-weight: 700; color: #1E293B; line-height: 1.5; }
      .e3-hints { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.9rem; }
      .e3-hint-item { border-radius: 0.75rem; padding: 0.7rem 0.9rem; font-size: 0.95rem; line-height: 1.45; }
      .e3-hint-item.e3-hint-unlocked { background: #fef9c3; color: #713f12; border: 1.5px solid #fde68a; }
      .e3-hint-item.e3-hint-locked { background: #f1f5f9; color: #94a3b8; border: 1.5px dashed #cbd5e1; font-style: italic; }
      .e3-result { background: #fff; border-radius: 1.5rem; padding: 2rem 1.5rem; max-width: 600px; width: 100%; margin: 1rem auto; box-shadow: var(--shadow-lg, 0 8px 30px rgba(0,0,0,0.12)); }
      .e3-result-tag { text-align: center; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem; }
      .e3-result-icon { font-size: 4rem; text-align: center; }
      .e3-result-grade { font-size: 2rem; font-weight: 800; text-align: center; margin: 0.3rem 0 0.2rem; }
      .e3-result-score { font-size: 2.5rem; font-weight: 900; text-align: center; color: #1E293B; }
      .e3-result-pct { text-align: center; color: #64748B; font-size: 1rem; margin-bottom: 1.5rem; }
      .e3-result-list { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.5rem; max-height: 320px; overflow-y: auto; }
      .e3-result-row { display: flex; align-items: flex-start; gap: 0.6rem; padding: 0.55rem 0.7rem; border-radius: 0.6rem; font-size: 0.87rem; }
      .e3-row-ok { background: #f0fdf4; }
      .e3-row-fail { background: #fef2f2; }
      .e3-row-num { font-weight: 800; color: #64748B; min-width: 1.4rem; flex-shrink: 0; }
      .e3-row-q { flex: 1; color: #374151; line-height: 1.35; }
      .e3-row-mark { flex-shrink: 0; }
      .e3-result-actions { display: flex; flex-direction: column; gap: 0.6rem; }
      @media (min-width: 768px) {
        .e3-intro { padding: 3rem 2.5rem; }
        .e3-result-actions { flex-direction: row; flex-wrap: wrap; }
        .e3-result-actions .e3-btn { flex: 1; }
      }
      @media (max-width: 400px) {
        .e3-wrap { padding: 0.5rem; }
        .e3-intro { padding: 1.8rem 1.2rem; }
      }
    `;
    document.head.appendChild(style);
  }

  if (document.getElementById('gw-styles')) return;
  const gwStyle = document.createElement('style');
  gwStyle.id = 'gw-styles';
  gwStyle.textContent = `
    /* Use the whole viewport on tablets/desktops instead of a fixed narrow
       mobile-width column — grade3Exam.js's shared "#e3-styles" caps at
       640px, which leaves huge unused margins for kids on iPads/laptops. */
    .gw-app.e3-wrap { align-items: stretch; }
    .gw-app .e3-quiz { max-width: min(1400px, 97vw); }
    .gw-app .e3-intro.gw-intro-wide { max-width: min(1000px, 97vw); }
    .gw-app .e3-result { max-width: min(1000px, 97vw); }
    @media (min-width: 720px) {
      .gw-app .e3-wrap { padding: 2rem; }
      .gw-app .e3-q-text { font-size: 1.45rem; }
      .gw-app .e3-question-card { padding: 1.8rem 2rem; }
      .gw-app .e3-option { padding: 1.15rem 1.4rem; font-size: 1.15rem; }
      .gw-app .e3-btn { font-size: 1.15rem; padding: 1rem 1.8rem; }
      .gw-app .e3-blank-input { height: 50px; font-size: 1.3rem; }
      .gw-app .gw-table-given, .gw-app .gw-table th { font-size: 1.15rem; padding: 0.75rem 0.9rem !important; }
      .gw-app .gw-table-input { height: 48px; font-size: 1.2rem; }
      .gw-app .gw-compare-expr { font-size: 1.2rem; }
      .gw-app .gw-compare-btn { width: 3rem; height: 3rem; font-size: 1.35rem; }
      .gw-app .gw-match-item { font-size: 1.15rem; padding: 1rem 1.1rem; min-height: 3.4rem; }
      .gw-app .gw-match-img { max-height: 90px; }
      .gw-app .gw-unit-row { padding: 1rem 1.2rem; }
      .gw-app .gw-unit-info strong { font-size: 1.05rem; }
      .gw-app .gw-unit-sub { font-size: 0.88rem; }
    }
    .gw-intro-wide { max-width: 640px; }
    .gw-unit-list { display: flex; flex-direction: column; gap: 0.55rem; margin-bottom: 1.2rem; max-height: 55vh; overflow-y: auto; padding-right: 2px; }
    .gw-unit-row { display: flex; align-items: center; gap: 0.8rem; padding: 0.75rem 0.9rem; border: 2px solid #e2e8f0; border-radius: 1rem; background: #f8fafc; cursor: pointer; font-family: inherit; text-align: left; transition: border-color 0.15s, background 0.15s, transform 0.1s; }
    .gw-unit-row:hover { border-color: #34D399; background: #fff; transform: translateY(-1px); }
    .gw-unit-row.gw-unit-all { background: #f1f5f9; }
    .gw-unit-badge { width: 2.3rem; height: 2.3rem; border-radius: 0.7rem; color: #fff; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1rem; }
    .gw-unit-info { flex: 1; display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
    .gw-unit-info strong { font-size: 0.92rem; color: #1E293B; line-height: 1.3; }
    .gw-unit-sub { font-size: 0.78rem; color: #64748B; }
    .gw-unit-arrow { color: #94a3b8; font-size: 1.3rem; flex-shrink: 0; }

    .gw-table-wrap { overflow-x: auto; margin-top: 0.4rem; }
    .gw-table { border-collapse: collapse; width: 100%; min-width: 100%; }
    .gw-table.gw-table-fixed { table-layout: fixed; }
    .gw-table th { background: #e0f2fe; color: #0c4a6e; font-size: 0.88rem; font-weight: 700; padding: 0.5rem 0.4rem; border: 1.5px solid #bae6fd; white-space: nowrap; }
    .gw-table td { border: 1.5px solid #bae6fd; padding: 0.35rem; text-align: center; }
    .gw-table-given { background: #e0f2fe; color: #0c4a6e; font-weight: 700; font-size: 1.02rem; white-space: nowrap; padding: 0.55rem 0.6rem !important; }
    .gw-table-sample-row .gw-table-given { background: #dbeafe; color: #2563eb; }
    .gw-table-input-cell { padding: 0 !important; min-width: 52px; }
    .gw-table-input { display: block; width: 100%; height: 40px; text-align: center; font-size: 1.05rem; font-weight: 700; font-family: inherit; color: inherit; background: transparent; border: none; border-radius: 0; box-sizing: border-box; }
    .gw-table-input:focus { outline: none; box-shadow: inset 0 0 0 2px #34D399; }
    .gw-table-input.e3-wrong-input { background: #fee2e2; color: #991b1b; box-shadow: inset 0 0 0 2px #ef4444; }
    .gw-table-input:disabled.e3-correct-input { background: #dcfce7; color: #166534; box-shadow: inset 0 0 0 2px #22c55e; }
    .gw-table-rowlabel { border: none !important; background: transparent !important; font-weight: 700; color: #334155; white-space: nowrap; text-align: right !important; padding-right: 0.5rem !important; }
    .gw-table-group { display: flex; flex-direction: column; gap: 1rem; }
    .gw-table-group-label { font-weight: 700; color: #334155; margin-bottom: 0.3rem; }
    @media (min-width: 720px) { .gw-table-group { flex-direction: row; align-items: flex-start; } .gw-table-group-item { flex: 1; min-width: 0; } }

    .gw-compare { display: flex; flex-direction: column; gap: 0.6rem; }
    .gw-compare-row { display: flex; align-items: center; justify-content: center; gap: 0.7rem; background: #fff; border-radius: 0.9rem; padding: 0.7rem 0.9rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); flex-wrap: wrap; }
    .gw-compare-expr { font-weight: 700; color: #1E293B; font-size: 1.05rem; }
    .gw-compare-btns { display: flex; gap: 0.35rem; }
    .gw-compare-btn { width: 2.4rem; height: 2.4rem; border-radius: 0.6rem; border: 2px solid #e2e8f0; background: #f8fafc; font-weight: 800; font-size: 1.15rem; cursor: pointer; color: #1e293b; font-family: inherit; }
    .gw-compare-btn:hover { border-color: #60A5FA; }
    .gw-compare-btn.gw-compare-selected { border-color: #60A5FA; background: #EFF6FF; }
    .gw-compare-btn.gw-compare-correct { border-color: #22c55e; background: #dcfce7; color: #166534; }
    .gw-compare-btn.gw-compare-wrong { border-color: #ef4444; background: #fee2e2; color: #991b1b; }
    .gw-compare-btn:disabled { cursor: default; }

    /* A wide, visible gutter between the two columns so the connecting line
       (drawn on a correct match) actually reads as a "nối" line, instead of
       being squeezed into a 1rem gap between two edge-to-edge columns. */
    .gw-match { position: relative; max-width: 620px; margin: 0 auto; }
    .gw-match-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; }
    .gw-match-line { fill: none; stroke-width: 3; opacity: 0.9; }
    .gw-match-grid { display: grid; grid-template-columns: 1fr 1fr; column-gap: clamp(1.5rem, 8vw, 5rem); row-gap: 0.6rem; align-items: stretch; position: relative; z-index: 1; }
    .gw-match-item { display: flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.6rem 0.7rem; border: 2px solid #e2e8f0; border-radius: 0.8rem; background: #fff; cursor: pointer; font-family: inherit; font-weight: 700; font-size: 1rem; color: #1e293b; box-shadow: 0 2px 6px rgba(0,0,0,0.06); text-align: center; min-height: 2.6rem; height: 100%; box-sizing: border-box; }
    .gw-match-item:hover:not(:disabled) { border-color: #60A5FA; }
    .gw-match-item.gw-match-selected,
    .gw-match-item.gw-match-linked { border-color: #60A5FA; background: #EFF6FF; }
    .gw-match-item.gw-match-correct { border-color: #22c55e; background: #dcfce7; color: #166534; }
    .gw-match-item.gw-match-wrong { border-color: #ef4444; background: #fee2e2; color: #991b1b; }
    .gw-match-item:disabled { cursor: default; }
    .gw-match-img { max-width: 100%; max-height: 64px; object-fit: contain; border-radius: 0.4rem; }
    .gw-match-hint { font-size: 0.8rem; color: #94a3b8; text-align: center; margin-top: 0.6rem; font-style: italic; }
  `;
  document.head.appendChild(gwStyle);
}
