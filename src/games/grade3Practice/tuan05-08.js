/**
 * Luyện tập Toán 3 — Tập Một: Tuần 5–8 (sách trang 17–31, PDF doc[18]..doc[32]).
 * Bỏ qua các bài vẽ tay / đo bằng thước của học sinh (xem ghi chú ở từng tuần).
 */
import {
  blank, listValidate, setValidate, dsValidate, letterGroupsValidate,
  angleGroupValidate, stripVN, mau,
} from '../grade3Workbook.js';
import imgT6T2Circles from '../../assets/grade3-practice/tuan6_t2_q2_circles.png';
import imgT6T2Fruits from '../../assets/grade3-practice/tuan6_t2_q4_fruits.png';
import imgT6T3Shapes from '../../assets/grade3-practice/tuan6_t3_q2_shapes.png';
import imgT6T3Grid from '../../assets/grade3-practice/tuan6_t3_q4_grid.png';
import imgT7T1Shapes from '../../assets/grade3-practice/tuan7_t1_q4_shapes.png';
import imgT7T2Points from '../../assets/grade3-practice/tuan7_t2_q1_points.png';
import imgT7T2Circle from '../../assets/grade3-practice/tuan7_t2_q2_circle.png';
import imgT7T2Circles from '../../assets/grade3-practice/tuan7_t2_q4_circles.png';
import imgT7T3Circles from '../../assets/grade3-practice/tuan7_t3_q3_circles.png';
import imgT7T3Squares from '../../assets/grade3-practice/tuan7_t3_q4_squares.png';
import imgT8T1Angles from '../../assets/grade3-practice/tuan8_t1_q1_angles.png';
import imgT8T1Shapes from '../../assets/grade3-practice/tuan8_t1_q3_shapes.png';
import imgT8T1Figure from '../../assets/grade3-practice/tuan8_t1_q4_figure.png';
import imgT8T2Rect from '../../assets/grade3-practice/tuan8_t2_q2_rect.png';
import imgT8T3Rect from '../../assets/grade3-practice/tuan8_t3_q1_rect.png';
import imgT8T3Squares from '../../assets/grade3-practice/tuan8_t3_q4_squares.png';

// ── Local validators ────────────────────────────────────────────────────────

// A set of division sentences written in one blank, in any order and with any
// separator ("56 : 7 = 8; 56 : 8 = 7"). ÷ and / count as ":".
function divSetValidate(expected) {
  const norm = (a, b, c) => `${Number(a)}:${Number(b)}=${Number(c)}`;
  const target = [...new Set(expected.map(e => norm(...e.split(/[:=]/))))].sort().join('|');
  return (value) => {
    const found = [...String(value).matchAll(/(\d+)\s*[:÷/]\s*(\d+)\s*=\s*(\d+)/g)].map(m => norm(m[1], m[2], m[3]));
    return [...new Set(found)].sort().join('|') === target;
  };
}

// "Có ... hình tam giác, đó là: ..." — first slot the count, second slot the
// list of shape names (any order, any vertex order inside a name).
function countListValidate(count, groups) {
  const list = letterGroupsValidate(groups);
  return (value) => {
    const s = String(value);
    const i = s.indexOf(',');
    if (i < 0) return false;
    return s.slice(0, i).trim() === String(count) && list(s.slice(i + 1));
  };
}

// "Góc ... đỉnh ...; cạnh ..., ..." — slot 1 is "vuông" / "không vuông", then
// the vertex, then the two sides (either side first, either letter order).
function angleRowValidate(isRight, vertex, ends) {
  const sides = angleGroupValidate([[vertex, ends]]);
  return (value) => {
    const parts = String(value).split(',').map(s => s.trim());
    if (parts.length !== 4) return false;
    const kind = stripVN(parts[0]).replace(/[^a-z]/g, '');
    if (kind !== (isRight ? 'vuong' : 'khongvuong')) return false;
    return sides(parts.slice(1).join(','));
  };
}

// Tuần 7 Tiết 3 Q3 c) "AP = PQ, ......": the segment equal to them is QB; the
// pair of diameters AQ = PB is also a correct addition.
function equalSegmentsValidate(value) {
  const segs = (String(value).toUpperCase().match(/[A-Z]{2}/g) || [])
    .map(s => s.split('').sort().join(''));
  const set = new Set(segs);
  if (!set.has('BQ')) return false;
  const allowed = new Set(['BQ', 'AQ', 'BP', 'AP', 'PQ']);
  if ([...set].some(s => !allowed.has(s))) return false;
  return set.has('AQ') === set.has('BP');
}

const t8NonRightAngles = angleGroupValidate([
  ['A', ['B', 'C']], ['A', ['C', 'D']], ['C', ['A', 'B']], ['C', ['A', 'D']],
]);

export const WEEKS_5_8 = [
  // ── TUẦN 5 ────────────────────────────────────────────────────────────────
  {
    id: 'tuan-5', number: 5, title: 'Bảng nhân 7, bảng chia 7 (tiếp theo). Bảng nhân, bảng chia 8; 9',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        blanksFirst: true,
        tables: [
          { label: 'b)', rows: [['Thừa số', 8, 8, 8, 8, 8], ['Thừa số', 1, 6, 5, 4, 7], ['Tích', blank(8), blank(48), blank(40), blank(32), blank(56)]] },
          { rows: [['Số bị chia', 16, 24, 72, 64, 80], ['Số chia', 8, 8, 8, 8, 8], ['Thương', blank(2), blank(3), blank(9), blank(8), blank(10)]] },
        ],
        blanks: [
          { label: 'a) 7 —× 10→ ...', answer: '70' },
          { label: '70 —: 7→ ...', answer: '10' },
          { label: '49 —: 7→ ...', answer: '7' },
          { label: '7 —× 5→ ...', answer: '35' },
          { label: '35 —: 7→ ...', answer: '5' },
          { label: '35 —: 5→ ...', answer: '7' },
        ],
        hints: ['Tích = Thừa số × Thừa số; Thương = Số bị chia : Số chia. Dùng bảng nhân 8 để tìm thương của phép chia cho 8.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Nối hai phép tính có cùng kết quả.',
        left: [
          { id: 'l1', text: '7 × 8' }, { id: 'l2', text: '56 : 8' }, { id: 'l3', text: '8 : 8' },
          { id: 'l4', text: '72 : 8' }, { id: 'l5', text: '8 × 3' },
        ],
        right: [
          { id: 'r1', text: '1 × 7' }, { id: 'r2', text: '8 × 7' }, { id: 'r3', text: '6 × 4' },
          { id: 'r4', text: '7 : 7' }, { id: 'r5', text: '63 : 7' },
        ],
        pairs: [['l1', 'r2'], ['l2', 'r1'], ['l3', 'r4'], ['l4', 'r5'], ['l5', 'r3']],
        hints: ['Tính kết quả của từng phép tính rồi nối hai phép tính có kết quả bằng nhau.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Nguyên dùng ruy băng để buộc quà. Từ một cuộn ruy băng, Nguyên cắt ra được 8 đoạn, mỗi đoạn dài 7 dm thì vừa hết cuộn ruy băng đó.\na) Cuộn ruy băng của Nguyên dài bao nhiêu đề-xi-mét?\nb) Nếu Nguyên chia cuộn ruy băng đó thành 7 đoạn bằng nhau thì mỗi đoạn dài bao nhiêu đề-xi-mét?',
        wordProblem: true,
        blanks: [
          { label: 'a) Cuộn ruy băng dài (dm)', answer: '56' },
          { label: 'b) Mỗi đoạn dài (dm)', answer: '8' },
        ],
        hints: ['a) 8 đoạn, mỗi đoạn 7 dm: 7 × 8. b) Chia độ dài cuộn ruy băng thành 7 phần bằng nhau: 56 : 7.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nThay mỗi ô trống bởi một trong các chữ số 5, 6, 7, 8 để được phép chia đúng.\n☐☐ : ☐ = ☐',
        blanks: [
          { label: 'Các phép chia đúng là: ...', answer: '56 : 7 = 8; 56 : 8 = 7', validate: divSetValidate(['56:7=8', '56:8=7']) },
        ],
        hints: ['Số chia và thương đều là một trong các chữ số 5, 6, 7, 8. Tìm tích của hai chữ số đó mà cả hai chữ số của tích cũng là 5, 6, 7 hoặc 8.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '1. Nối mỗi phép tính với kết quả của phép tính đó.',
        left: [
          { id: 'l1', text: '72 : 9' }, { id: 'l2', text: '48 : 8' }, { id: 'l3', text: '9 × 3' },
          { id: 'l4', text: '9 × 5' }, { id: 'l5', text: '30 : 5' }, { id: 'l6', text: '63 : 9' },
          { id: 'l7', text: '9 × 4' },
        ],
        right: [
          { id: 'r8', text: '8' }, { id: 'r27', text: '27' }, { id: 'r6', text: '6' },
          { id: 'r45', text: '45' }, { id: 'r36', text: '36' }, { id: 'r7', text: '7' },
        ],
        pairs: [['l1', 'r8'], ['l2', 'r6'], ['l3', 'r27'], ['l4', 'r45'], ['l5', 'r6'], ['l6', 'r7'], ['l7', 'r36']],
        hints: ['Có hai phép tính cùng có kết quả là 6.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Phép tính nào dưới đây có kết quả bé nhất?', options: ['A. 8 × 9', 'B. 90 : 9', 'C. 9 × 1', 'D. 80 : 8'], answer: 'C' },
          { left: 'b) Phép tính nào dưới đây có kết quả lớn nhất?', options: ['A. 81 : 9', 'B. 72 : 8', 'C. 9 × 1', 'D. 8 × 2'], answer: 'D' },
        ],
        hints: ['Tính kết quả của cả bốn phép tính ở mỗi câu rồi so sánh.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Trên một nhánh của cây mai vàng 9 cánh có 8 bông hoa mai.\na) Hỏi có tất cả bao nhiêu cánh hoa mai trên nhánh cây mai đó?\nb) Trên một nhánh khác của cây mai đó, bạn Nguyên đếm được tất cả 81 cánh hoa mai. Hỏi bạn Nguyên đã đếm cánh của bao nhiêu bông hoa mai?',
        wordProblem: true,
        blanks: [
          { label: 'a) Số cánh hoa mai', answer: '72' },
          { label: 'b) Số bông hoa mai', answer: '9' },
        ],
        hints: ['Mỗi bông hoa mai có 9 cánh. a) 9 × 8. b) 81 : 9.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nTìm hai số có tổng bằng 9 mà có tích bé nhất.',
        blanks: [
          { label: 'Hai số đó là ... và ...', answer: '0 và 9', validate: setValidate(['0', '9']) },
        ],
        hints: ['Thử các cặp số có tổng bằng 9: 0 và 9, 1 và 8, 2 và 7, … rồi tính tích của mỗi cặp. Số nào nhân với 0 cũng bằng 0.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Tính nhẩm.',
        blanks: [
          { label: 'a) 8 × 1 = ...', answer: '8' }, { label: '8 × 6 = ...', answer: '48' }, { label: '8 × 7 = ...', answer: '56' }, { label: '8 × 9 = ...', answer: '72' },
          { label: '8 × 2 = ...', answer: '16' }, { label: '8 × 4 = ...', answer: '32' }, { label: '8 × 5 = ...', answer: '40' }, { label: '8 × 8 = ...', answer: '64' },
          { label: '72 : 8 = ...', answer: '9' }, { label: '24 : 8 = ...', answer: '3' }, { label: '80 : 8 = ...', answer: '10' }, { label: '48 : 8 = ...', answer: '6' },
          { label: 'b) 9 × 1 = ...', answer: '9' }, { label: '9 × 4 = ...', answer: '36' }, { label: '9 × 5 = ...', answer: '45' }, { label: '9 × 7 = ...', answer: '63' },
          { label: '9 × 2 = ...', answer: '18' }, { label: '9 × 6 = ...', answer: '54' }, { label: '9 × 9 = ...', answer: '81' }, { label: '9 × 3 = ...', answer: '27' },
          { label: '54 : 9 = ...', answer: '6' }, { label: '36 : 9 = ...', answer: '4' }, { label: '45 : 9 = ...', answer: '5' }, { label: '90 : 9 = ...', answer: '10' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Số?',
        blanks: [
          { label: 'a) 32 —: 8→ ... —× 2→ ... —: 8→ ...', answer: '4,8,1', validate: listValidate(['4', '8', '1']) },
          { label: 'b) 90 —: 9→ ... —: 2→ ... —× 9→ ...', answer: '10,5,45', validate: listValidate(['10', '5', '45']) },
        ],
        hints: ['Đi theo chiều mũi tên, lấy kết quả của ô trước thực hiện phép tính ghi trên mũi tên.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Một đường chạy điền kinh tiêu chuẩn có 8 làn chạy.\na) Ở nội dung chạy cá nhân, mỗi lượt chạy chỉ cho 8 vận động viên tham gia thi đấu. Hỏi nếu có 64 vận động viên thi đấu thì cần tổ chức mấy lượt chạy để mỗi vận động viên được chạy đúng 1 lần?\nb) Có 8 vận động viên được thi đấu trận chung kết tranh huy chương vàng của một nội dung chạy, mỗi vận động viên phải hoàn thành 4 vòng chạy. Hỏi các vận động viên đó phải hoàn thành tất cả bao nhiêu vòng chạy?',
        wordProblem: true,
        blanks: [
          { label: 'a) Số lượt chạy', answer: '8' },
          { label: 'b) Số vòng chạy', answer: '32' },
        ],
        hints: ['a) 64 : 8. b) 4 × 8.'],
      },
      {
        // Câu a) là xếp que tính (không chấm được trên máy); chỉ chấm câu b).
        type: 'fill', section: 'Tiết 3',
        q: '4. a) Em hãy xếp 9 que tính để được một mô hình có 5 hình tam giác.\nb) Viết tiếp vào chỗ chấm cho thích hợp.\nCó 7 bạn tham gia xếp mô hình ở câu a, mỗi bạn xếp 1 mô hình.',
        blanks: [
          { label: 'Sau khi các bạn xếp xong thì có tất cả ... que tính đã được xếp.', answer: '63' },
        ],
        hints: ['Mỗi mô hình dùng 9 que tính (một hình tam giác lớn chia thành 4 hình tam giác nhỏ). 7 mô hình dùng 9 × 7 que tính.'],
      },
    ],
  },

  // ── TUẦN 6 ────────────────────────────────────────────────────────────────
  {
    id: 'tuan-6', number: 6, title: 'Bảng nhân 9, bảng chia 9 (tiếp theo). Tìm thành phần trong phép nhân, phép chia. Một phần mấy',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        tables: [
          { label: 'a)', rows: [['Thừa số', 9, 8, 7, 6, 5], ['Thừa số', 6, 7, 8, 9, 10], ['Tích', blank(54), blank(56), blank(56), blank(54), blank(50)]] },
          { rows: [['Số bị chia', 81, 64, 49, 36, 25], ['Số chia', 9, 8, 7, 6, 5], ['Thương', blank(9), blank(8), blank(7), blank(6), blank(5)]] },
        ],
        blanks: [
          { label: 'b) 8 × ... = 32', boxes: true, answer: '4' },
          { label: '9 × ... = 45', boxes: true, answer: '5' },
          { label: '7 × ... = 49', boxes: true, answer: '7' },
          { label: '6 × ... = 36', boxes: true, answer: '6' },
          { label: '... × 3 = 27', boxes: true, answer: '9' },
          { label: '... × 2 = 14', boxes: true, answer: '7' },
          { label: '... × 4 = 20', boxes: true, answer: '5' },
          { label: '... × 5 = 40', boxes: true, answer: '8' },
        ],
        hints: ['Muốn tìm một thừa số, ta lấy tích chia cho thừa số kia.'],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '2. >; <; = ?',
        rows: [
          { left: 'a) 1 × 9', right: '72 : 8', answer: '=' },
          { left: 'b) 42 : 7', right: '3 × 6', answer: '<' },
          { left: 'c) 56 : 8', right: '42 : 7', answer: '>' },
          { left: 'd) 30 : 6', right: '7 × 4', answer: '<' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Bác Lâm bán kẹo mút ở hội chợ. Bác có 8 hộp kẹo, gồm tất cả 72 chiếc kẹo mút. Biết mỗi hộp kẹo có số chiếc kẹo mút như nhau.\na) Hỏi mỗi hộp kẹo có bao nhiêu chiếc kẹo mút?\nb) Bác Lâm đã bán được 6 hộp kẹo. Hỏi bác Lâm đã bán được tất cả bao nhiêu chiếc kẹo mút?',
        wordProblem: true,
        blanks: [
          { label: 'a) Số kẹo mút mỗi hộp', answer: '9' },
          { label: 'b) Số kẹo mút đã bán', answer: '54' },
        ],
        hints: ['a) 72 : 8. b) Mỗi hộp có 9 chiếc: 9 × 6.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\n– Nguyên đố bạn Đăng: "Ghép hai thẻ ghi chữ số 6 và 5 được một số có hai chữ số là tích của hai số liên tiếp. Vậy hai số liên tiếp đó là hai số nào?".\n– Đăng suy nghĩ rồi trả lời:',
        blanks: [
          { label: '"Hai số liên tiếp đó là ... và ...".', answer: '7 và 8', validate: setValidate(['7', '8']) },
        ],
        hints: ['Ghép hai thẻ được 56 hoặc 65. Số nào là tích của hai số liên tiếp trong bảng nhân?'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        blanksFirst: true,
        tables: [
          { label: 'b)', rows: [
            ['Số bị chia', blank(50), 36, 35, blank(36), blank(56), 18],
            ['Số chia', 5, blank(6), blank(7), 4, 7, blank(6)],
            ['Thương', 10, 6, 5, 9, 8, 3],
          ] },
        ],
        blanks: [
          { label: 'a) ... : 4 = 8', answer: '32' },
          { label: '... : 6 = 7', answer: '42' },
          { label: '... : 9 = 3', answer: '27' },
          { label: '... : 7 = 5', answer: '35' },
          { label: '27 : ... = 3', answer: '9' },
          { label: '30 : ... = 5', answer: '6' },
          { label: '16 : ... = 4', answer: '4' },
          { label: '15 : ... = 3', answer: '5' },
        ],
        hints: ['Muốn tìm số bị chia, ta lấy thương nhân với số chia. Muốn tìm số chia, ta lấy số bị chia chia cho thương.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgT6T2Circles,
        q: '2. Đ, S?',
        blanks: [
          { label: 'a) Đã tô màu 1/2 hình tròn. ...', boxes: true, answer: 'S', validate: dsValidate(false) },
          { label: 'b) Đã tô màu 1/3 hình tròn. ...', boxes: true, answer: 'Đ', validate: dsValidate(true) },
          { label: 'c) Đã tô màu 1/5 hình tròn. ...', boxes: true, answer: 'Đ', validate: dsValidate(true) },
          { label: 'd) Đã tô màu 1/6 hình tròn. ...', boxes: true, answer: 'Đ', validate: dsValidate(true) },
          { label: 'e) Đã tô màu 1/7 hình tròn. ...', boxes: true, answer: 'Đ', validate: dsValidate(true) },
          { label: 'g) Đã tô màu 1/8 hình tròn. ...', boxes: true, answer: 'S', validate: dsValidate(false) },
        ],
        hints: [
          'Đếm xem hình tròn được chia thành mấy phần bằng nhau và đã tô màu mấy phần.',
          'Hình a) bị chia thành hai phần không bằng nhau (đường chia không đi qua tâm). Hình g) được chia thành 9 phần bằng nhau, không phải 8.',
        ],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '3. Nối (theo mẫu).',
        left: [
          { id: 'l2', text: 'Một phần hai' }, { id: 'l7', text: 'Một phần bảy' },
          { id: 'l3', text: 'Một phần ba' }, { id: 'l8', text: 'Một phần tám' },
          { id: 'l6', text: 'Một phần sáu' }, { id: 'l4', text: 'Một phần tư' },
          { id: 'l5', text: 'Một phần năm' }, { id: 'l9', text: 'Một phần chín' },
        ],
        right: [
          { id: 'r5', text: '1/5' }, { id: 'r6', text: '1/6' }, { id: 'r2', text: '1/2' }, { id: 'r8', text: '1/8' },
          { id: 'r7', text: '1/7' }, { id: 'r9', text: '1/9' }, { id: 'r4', text: '1/4' }, { id: 'r3', text: '1/3' },
        ],
        pairs: [['l2', 'r2'], ['l7', 'r7'], ['l3', 'r3'], ['l8', 'r8'], ['l6', 'r6'], ['l4', 'r4'], ['l5', 'r5'], ['l9', 'r9']],
        hints: ['Mẫu: "Một phần hai" nối với 1/2.'],
      },
      {
        // Câu a) là tô màu — chuyển thành đếm, chính là câu b) của sách.
        type: 'fill', section: 'Tiết 2', img: imgT6T2Fruits,
        q: '4. a) Tô màu đỏ vào 1/4 số quả táo. Tô màu xanh vào 1/6 số quả na.\nb) Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: '• 1/4 số quả táo là ... quả táo.', answer: '4' },
          { label: '• 1/6 số quả na là ... quả na.', answer: '4' },
        ],
        hints: ['Có 16 quả táo và 24 quả na. 16 : 4 = ?; 24 : 6 = ?'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Số?',
        blanks: [
          { label: 'a) ... —× 3→ 21', answer: '7' },
          { label: 'b) 8 —× ...→ 32', answer: '4' },
          { label: 'c) ... —: 7→ 4', answer: '28' },
          { label: 'd) 36 —: ...→ 6', answer: '6' },
        ],
        hints: ['a) Tìm thừa số: 21 : 3. c) Tìm số bị chia: 4 × 7. d) Tìm số chia: 36 : 6.'],
      },
      {
        // Bài tô màu — chuyển thành hỏi số phần cần tô (như Vở bài tập Bài 14).
        type: 'fill', section: 'Tiết 3', img: imgT6T3Shapes,
        q: '2. Tô màu vào:\na) 1/2 số ô vuông trong hình sau;  b) 1/4 số hình tròn trong hình sau;\nc) 1/6 hình tròn sau;  d) 1/8 hình vuông sau.\nEm cần tô màu bao nhiêu ô vuông / hình tròn / phần ở mỗi hình?',
        subQuestions: false,
        blanks: [
          { label: 'a) Tô màu ... ô vuông.', answer: '3' },
          { label: 'b) Tô màu ... hình tròn.', answer: '2' },
          { label: 'c) Tô màu ... phần của hình tròn.', answer: '1' },
          { label: 'd) Tô màu ... phần của hình vuông.', answer: '1' },
        ],
        hints: ['a) Hình có 6 ô vuông. b) Có 8 hình tròn. c) Hình tròn chia thành 6 phần bằng nhau. d) Hình vuông chia thành 8 phần bằng nhau.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Nguyên cùng mẹ làm được 60 cái bánh su kem. Nguyên giúp mẹ chia số bánh đó vào các hộp, mỗi hộp 6 cái.\na) Hỏi Nguyên và mẹ làm được bao nhiêu hộp bánh su kem như vậy?\nb) Nguyên mang một số bánh su kem tặng cho 2 em của mình, mỗi em 6 cái bánh. Hỏi Nguyên đã tặng cho các em bao nhiêu cái bánh su kem?',
        wordProblem: true,
        blanks: [
          { label: 'a) Số hộp bánh', answer: '10' },
          { label: 'b) Số bánh đã tặng', answer: '12' },
        ],
        hints: ['a) 60 : 6. b) 6 × 2.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgT6T3Grid,
        q: '4. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Hình bên có tất cả 9 ô vuông.<br>1/3 số ô vuông đó là ... ô vuông.', answer: '3' },
          { label: 'b) Hình bên có tất cả ... hình vuông.', answer: '14' },
        ],
        hints: ['b) Đếm cả hình vuông nhỏ (1 ô), hình vuông gồm 4 ô (2 × 2) và hình vuông lớn gồm 9 ô.'],
      },
    ],
  },

  // ── TUẦN 7 ────────────────────────────────────────────────────────────────
  // Bỏ qua: Tiết 2 bài 2b (vẽ trung điểm), 2c (đo bằng thước), bài 3 (vẽ đường
  // tròn), bài 4a (vẽ trung điểm); Tiết 3 bài 2a (vẽ đoạn thẳng).
  {
    id: 'tuan-7', number: 7, title: 'Luyện tập chung. Điểm ở giữa, trung điểm của đoạn thẳng. Hình tròn',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính nhẩm.',
        blanks: [
          { label: '3 × 9 = ...', answer: '27' }, { label: '7 × 8 = ...', answer: '56' }, { label: '6 × 5 = ...', answer: '30' }, { label: '7 × 4 = ...', answer: '28' },
          { label: '9 × 3 = ...', answer: '27' }, { label: '8 × 7 = ...', answer: '56' }, { label: '5 × 6 = ...', answer: '30' }, { label: '4 × 7 = ...', answer: '28' },
          { label: '27 : 3 = ...', answer: '9' }, { label: '56 : 8 = ...', answer: '7' }, { label: '30 : 5 = ...', answer: '6' }, { label: '28 : 4 = ...', answer: '7' },
          { label: '27 : 9 = ...', answer: '3' }, { label: '56 : 7 = ...', answer: '8' }, { label: '30 : 6 = ...', answer: '5' }, { label: '28 : 7 = ...', answer: '4' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Số?',
        blanks: [
          { label: 'a) ... —× 6→ 24', answer: '4' },
          { label: 'b) 4 —× ...→ 36', answer: '9' },
          { label: 'c) ... —: 8→ 5', answer: '40' },
          { label: 'd) 21 —: ...→ 7', answer: '3' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Mỗi bộ lốp xe ô tô con có 5 chiếc, gồm 4 chiếc lốp chính và 1 chiếc lốp dự phòng.\na) Hỏi 8 bộ lốp xe ô tô con như vậy có bao nhiêu chiếc lốp xe?\nb) Nếu có 35 chiếc lốp xe thì được mấy bộ lốp xe ô tô con như vậy?',
        wordProblem: true,
        blanks: [
          { label: 'a) Số chiếc lốp xe', answer: '40' },
          { label: 'b) Số bộ lốp xe', answer: '7' },
        ],
        hints: ['Mỗi bộ có 5 chiếc. a) 5 × 8. b) 35 : 5.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgT7T1Shapes,
        q: '4. a) Khoanh vào 1/3 số hình tam giác, 1/8 số hình tròn.\nb) Viết số thích hợp vào chỗ chấm.\nTrong hình vẽ ở câu a:',
        blanks: [
          { label: '• 1/3 số hình tam giác là ... hình tam giác.', answer: '4' },
          { label: '• 1/8 số hình tròn là ... hình tròn.', answer: '2' },
        ],
        hints: ['Có 12 hình tam giác và 16 hình tròn.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgT7T2Points,
        q: '1. Đ, S?\nTrong hình vẽ trên:',
        blanks: [
          { label: 'a) Điểm B là trung điểm của đoạn thẳng AC. ...', boxes: true, answer: 'S', validate: dsValidate(false) },
          { label: 'b) Ba điểm C, D, E thẳng hàng. ...', boxes: true, answer: 'Đ', validate: dsValidate(true) },
          { label: 'c) Điểm C là điểm ở giữa hai điểm B và D. ...', boxes: true, answer: 'S', validate: dsValidate(false) },
          { label: 'd) Điểm D là trung điểm của đoạn thẳng CE. ...', boxes: true, answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: [
          'Đếm ô vuông: A cách B 1 ô, B cách C 3 ô nên B không cách đều A và C.',
          'Ba điểm B, C, D không thẳng hàng nên C không phải điểm ở giữa B và D. Từ C đến D và từ D đến E đều là 2 ô ngang, 1 ô dọc.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgT7T2Circle,
        q: '2. Cho hình vẽ dưới đây.\na) Viết tiếp vào chỗ chấm cho thích hợp.',
        subQuestions: false,
        blanks: [
          { label: '• Điểm ... là trung điểm của đoạn thẳng AB.', answer: 'O' },
          {
            label: '• Hình tròn có tâm là ...; có đường kính là ...; có các bán kính là ..., ... và ...',
            answer: 'O, AB, OA, OB, OC',
            validate: (value) => {
              const p = String(value).split(',').map(s => s.trim().toUpperCase());
              if (p.length !== 5 || p[0] !== 'O') return false;
              return letterGroupsValidate(['AB'])(p[1]) && letterGroupsValidate(['OA', 'OB', 'OC'])(p.slice(2).join(','));
            },
          },
        ],
        hints: ['Bán kính nối tâm O với một điểm trên đường tròn; đường kính đi qua tâm, nối hai điểm trên đường tròn.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgT7T2Circles,
        q: '4. Trong hình vẽ bên, ba hình tròn tâm A, tâm B, tâm C đều có bán kính bằng 3 cm.\na) Hãy vẽ trung điểm M, N, K của các đoạn thẳng AB, AC và BC.\nb) Viết số thích hợp vào chỗ chấm.',
        subQuestions: false,
        blanks: [
          { label: '• AB = ... cm; BC = ... cm; AC = ... cm.', answer: '6,6,6', validate: listValidate(['6', '6', '6']) },
          { label: '• Độ dài đường gấp khúc ABC là ... cm.', answer: '18' },
        ],
        hints: ['Mỗi đoạn thẳng gồm hai bán kính: 3 cm + 3 cm. Đường gấp khúc ABC = AB + BC.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Số?',
        blanks: [
          { label: 'a) 15 —: 3→ ... —× ...→ 20 —: 2→ ...', answer: '5,4,10', validate: listValidate(['5', '4', '10']) },
          { label: 'b) 8 —× 2→ ... —: ...→ 4 —× 7→ ...', answer: '16,4,28', validate: listValidate(['16', '4', '28']) },
        ],
        hints: ['Tính lần lượt theo chiều mũi tên. Ô trên mũi tên là số cần nhân (chia) để từ số trước được số sau.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. a) Hãy vẽ đoạn thẳng MN có độ dài bằng 8 cm. Ở giữa hai điểm M và N, vẽ hai điểm P và Q sao cho MP = 2 cm, PQ = 2 cm.\nb) Viết tiếp vào chỗ chấm cho thích hợp.',
        subQuestions: false,
        blanks: [
          { label: '• Điểm ... là trung điểm của đoạn thẳng MN.', answer: 'Q' },
          { label: '• Điểm ... là trung điểm của đoạn thẳng MQ.', answer: 'P' },
          { label: '• Điểm ... là điểm ở giữa hai điểm P và N.', answer: 'Q' },
        ],
        hints: ['Trên đoạn MN: MP = 2 cm, MQ = 2 + 2 = 4 cm, QN = 8 − 4 = 4 cm.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgT7T3Circles,
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp.\nTrong hình vẽ bên:',
        blanks: [
          {
            label: 'a) Hình tròn tâm P có đường kính là ... và các bán kính là ...',
            answer: 'AQ,PA; PQ',
            validate: (value) => { const p = String(value).split(','); return letterGroupsValidate(['AQ'])(p[0]) && letterGroupsValidate(['PA', 'PQ'])(p.slice(1).join(',')); },
          },
          {
            label: 'b) Hình tròn tâm Q có đường kính là ... và các bán kính là ...',
            answer: 'PB,QP; QB',
            validate: (value) => { const p = String(value).split(','); return letterGroupsValidate(['PB'])(p[0]) && letterGroupsValidate(['QP', 'QB'])(p.slice(1).join(',')); },
          },
          { label: 'c) Các đoạn thẳng có độ dài bằng nhau là: AP = PQ, ...', answer: '= QB', validate: equalSegmentsValidate },
        ],
        hints: ['Hình tròn tâm P đi qua A và Q; hình tròn tâm Q đi qua P và B. Các bán kính của hai hình tròn bằng nhau.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgT7T3Squares,
        q: '4. Số?',
        blanks: [
          { label: 'Hình thứ ba — số ở hình tròn trên bên phải: ...', answer: '2' },
          { label: 'Hình thứ ba — số ở hình tròn dưới bên phải: ...', answer: '4' },
        ],
        hints: ['Ở hình thứ nhất: 4 × 6 = 24 và 3 × 8 = 24 — tích hai số ở hai đầu mỗi đường chéo bằng số ở giữa.'],
      },
    ],
  },

  // ── TUẦN 8 ────────────────────────────────────────────────────────────────
  // Bỏ qua: Tiết 1 bài 2 (vẽ góc); Tiết 2 bài 1 (đo bằng thước), bài 3a (vẽ),
  // bài 4 (vẽ thêm đoạn thẳng); Tiết 3 bài 2 (vẽ thêm đoạn thẳng), bài 4b (tô màu).
  {
    id: 'tuan-8', number: 8, title: 'Góc vuông, góc không vuông. Hình tam giác, hình tứ giác, hình chữ nhật, hình vuông',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgT8T1Angles,
        q: `1. Dùng ê ke để kiểm tra góc vuông rồi viết tiếp vào chỗ chấm cho thích hợp (theo mẫu).\n${mau('Góc không vuông đỉnh I; cạnh IG, IH')}`,
        subQuestions: false,
        blanks: [
          { label: 'Hình có các điểm A, B, C: Góc ... đỉnh ...; cạnh ..., ...', answer: 'vuông, A, AB, AC', validate: angleRowValidate(true, 'A', ['B', 'C']) },
          { label: 'Hình có các điểm M, N, P: Góc ... đỉnh ...; cạnh ..., ...', answer: 'không vuông, M, MN, MP', validate: angleRowValidate(false, 'M', ['N', 'P']) },
          { label: 'Hình có các điểm Q, R, S: Góc ... đỉnh ...; cạnh ..., ...', answer: 'vuông, Q, QR, QS', validate: angleRowValidate(true, 'Q', ['R', 'S']) },
          { label: 'Hình có các điểm E, H, K: Góc ... đỉnh ...; cạnh ..., ...', answer: 'không vuông, E, EH, EK', validate: angleRowValidate(false, 'E', ['H', 'K']) },
          { label: 'Hình có các điểm U, X, Y: Góc ... đỉnh ...; cạnh ..., ...', answer: 'không vuông, U, UX, UY', validate: angleRowValidate(false, 'U', ['X', 'Y']) },
        ],
        hints: ['Ô đầu tiên viết "vuông" hoặc "không vuông". Đỉnh là điểm chung của hai cạnh.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgT8T1Shapes,
        q: '3. Đ, S?',
        blanks: [
          { label: 'a) Hình tam giác ABC có góc vuông đỉnh A. ...', boxes: true, answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) Hình tứ giác MNPQ có góc vuông đỉnh M. ...', boxes: true, answer: 'S', validate: dsValidate(false) },
          { label: 'c) Hình tứ giác MQPN có góc vuông đỉnh N. ...', boxes: true, answer: 'Đ', validate: dsValidate(true) },
          { label: 'd) Hình tam giác ABC có 2 góc vuông. ...', boxes: true, answer: 'S', validate: dsValidate(false) },
          { label: 'e) Hình tứ giác MNPQ có 3 góc không vuông. ...', boxes: true, answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: ['Dựa vào các đường kẻ ô vuông: góc đỉnh A và góc đỉnh N có hai cạnh theo đường kẻ ngang và dọc nên là góc vuông. MQPN và MNPQ là cùng một hình tứ giác.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgT8T1Figure,
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nTrong hình bên:',
        subQuestions: false,
        blanks: [
          { label: '• Có ... hình tam giác, đó là: ...', answer: '6,ABC; ACD; ADG; CDG; CDM; CGM', validate: countListValidate(6, ['ABC', 'ACD', 'ADG', 'CDG', 'CDM', 'CGM']) },
          { label: '• Có ... hình tứ giác, đó là: ...', answer: '3,ABCD; ABMD; ABMG', validate: countListValidate(3, ['ABCD', 'ABMD', 'ABMG']) },
        ],
        hints: [
          'Hình có các đoạn thẳng AB, BC (qua M), CD, DA, AC (qua G) và DM (qua G).',
          'Tam giác: ABC, ACD, ADG, CDG, CDM, CGM. Tứ giác: ABCD, ABMD, ABMG.',
        ],
      },
      {
        // Sách in "hình chữ nhật MNPQ" nhưng hình vẽ và câu hỏi dùng ABCD.
        type: 'fill', section: 'Tiết 2', img: imgT8T2Rect,
        q: '2. Viết số thích hợp vào chỗ chấm.\nCho hình chữ nhật ABCD có kích thước như hình vẽ.',
        blanks: [
          { label: '• Độ dài đường gấp khúc ADC bằng ... cm.', answer: '9' },
          { label: '• Độ dài đường gấp khúc BCD bằng ... cm.', answer: '9' },
        ],
        hints: ['Hình chữ nhật có AB = DC = 6 cm, AD = BC = 3 cm.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. a) Hãy vẽ một đường tròn tâm O, đường kính AB, sau đó vẽ đường kính CD. Vẽ hình vuông MNPQ có cạnh bằng 3 cm.\nb) Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'Dùng ê ke để kiểm tra, ta được tứ giác ACBD vừa vẽ ở câu a có ... góc vuông.', answer: '4' },
        ],
        hints: ['Hai đường kính AB và CD dài bằng nhau và cắt nhau ở tâm O, nên ACBD là hình chữ nhật.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgT8T3Rect,
        q: '1. Viết tiếp vào chỗ chấm cho thích hợp.\nTrong hình bên:',
        subQuestions: false,
        blanks: [
          { label: 'Có ... góc vuông; ... góc không vuông.', answer: '4,4', validate: listValidate(['4', '4']) },
          { label: 'Các góc không vuông là: Góc đỉnh ...; cạnh ..., ...', answer: 'A, AB, AC', validate: t8NonRightAngles },
          { label: 'Góc đỉnh ...; cạnh ..., ...', answer: 'A, AC, AD', validate: t8NonRightAngles },
          { label: 'Góc đỉnh ...; cạnh ..., ...', answer: 'C, CA, CB', validate: t8NonRightAngles },
          { label: 'Góc đỉnh ...; cạnh ..., ...', answer: 'C, CA, CD', validate: t8NonRightAngles },
        ],
        hints: ['Bốn góc của hình chữ nhật là góc vuông. Đường chéo AC tạo thêm hai góc không vuông ở đỉnh A và hai góc không vuông ở đỉnh C.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Viết số thích hợp vào chỗ chấm.\nNền căn phòng của Nguyên có dạng hình chữ nhật được lát bởi các viên gạch men hình vuông, mỗi viên gạch có cạnh 4 dm. Nguyên đếm theo chiều dài căn phòng được 10 viên gạch, đếm theo chiều rộng căn phòng được 8 viên gạch. Nếu không tính phần mạch vữa ghép các viên gạch thì:',
        subQuestions: false,
        blanks: [
          { label: 'a) Chiều dài căn phòng của Nguyên là ... dm = ... m.', answer: '40,4', validate: listValidate(['40', '4']) },
          { label: 'b) Chiều rộng căn phòng của Nguyên là ... dm.', answer: '32' },
          { label: 'c) Để lát kín nền căn phòng đó, cần số viên gạch men là ... viên.', answer: '80' },
        ],
        hints: ['Chiều dài: 4 × 10 dm; 10 dm = 1 m. Chiều rộng: 4 × 8 dm. Số viên gạch: 10 hàng, mỗi hàng 8 viên.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgT8T3Squares,
        q: '4. a) Viết số thích hợp vào chỗ chấm.\nTrong hình bên:',
        subQuestions: false,
        blanks: [
          { label: '• Có ... hình tam giác;', answer: '12' },
          { label: '• Có ... hình vuông.', answer: '4' },
        ],
        hints: ['Có 4 hình vuông lồng vào nhau. Giữa mỗi hai hình vuông liền nhau có 4 hình tam giác nhỏ ở các góc.'],
      },
    ],
  },
];
