/**
 * Vở bài tập Toán 2 — Tập một: Bài 25–30 (sách trang 94–113).
 */
import {
  blank, dsValidate, listValidate, letterGroupsValidate, phraseValidate, unitValidate, stripVN,
} from '../grade3Workbook.js';
import imgB25T1Q1 from '../../assets/grade2-workbook/bai25_t1_q1_points.svg';
import imgB25T1Q2 from '../../assets/grade2-workbook/bai25_t1_q2_figures.svg';
import imgB25T1Q3 from '../../assets/grade2-workbook/bai25_t1_q3_parallelogram.svg';
import imgB25T1Q4 from '../../assets/grade2-workbook/bai25_t1_q4_polyline.svg';
import imgB25T2Q1 from '../../assets/grade2-workbook/bai25_t2_q1_lines.svg';
import imgB25T2Q2 from '../../assets/grade2-workbook/bai25_t2_q2_rulers.svg';
import imgB25T2Q3 from '../../assets/grade2-workbook/bai25_t2_q3_rect.svg';
import imgB25T2Q4 from '../../assets/grade2-workbook/bai25_t2_q4_street.png';
import imgB26T1Q1 from '../../assets/grade2-workbook/bai26_t1_q1_polylines.svg';
import imgB26T1Q2 from '../../assets/grade2-workbook/bai26_t1_q2_castle.svg';
import imgB26T1Q3 from '../../assets/grade2-workbook/bai26_t1_q3_polyline.svg';
import imgB26T1Q4 from '../../assets/grade2-workbook/bai26_t1_q4_houses.svg';
import imgB26T2Q1 from '../../assets/grade2-workbook/bai26_t2_q1_room.png';
import imgB26T2Q3 from '../../assets/grade2-workbook/bai26_t2_q3_polyline.svg';
import imgB26T2Q4 from '../../assets/grade2-workbook/bai26_t2_q4_snails.png';
import imgB27T1Q1 from '../../assets/grade2-workbook/bai27_t1_q1_shapes.svg';
import imgB27T1Q3 from '../../assets/grade2-workbook/bai27_t1_q3_grid.svg';
import imgB27T1Q4 from '../../assets/grade2-workbook/bai27_t1_q4_shapes.svg';
import imgB27T2Q3 from '../../assets/grade2-workbook/bai27_t2_q3_squares.svg';
import imgB27T2Q4 from '../../assets/grade2-workbook/bai27_t2_q4_dogs.png';
import imgB28Q1 from '../../assets/grade2-workbook/bai28_q1_figure.svg';
import imgB28Q2 from '../../assets/grade2-workbook/bai28_q2_segments.svg';
import imgB28Q3 from '../../assets/grade2-workbook/bai28_q3_parallelogram.svg';
import imgB28Q5 from '../../assets/grade2-workbook/bai28_q5_snail.png';
import imgB29T1Q1 from '../../assets/grade2-workbook/bai29_t1_q1_pictures.png';
import imgB29T1Q2 from '../../assets/grade2-workbook/bai29_t1_q2_pictures.png';
import imgB29T1Q3 from '../../assets/grade2-workbook/bai29_t1_q3_pictures.png';
import imgB29T2Q1 from '../../assets/grade2-workbook/bai29_t2_q1_pictures.png';
import imgB29T2Q2 from '../../assets/grade2-workbook/bai29_t2_q2_pictures.png';
import imgB29T2Q3 from '../../assets/grade2-workbook/bai29_t2_q3_pictures.png';
import imgB30T1S1 from '../../assets/grade2-workbook/bai30_t1_q1_sheet1.svg';
import imgB30T1S2 from '../../assets/grade2-workbook/bai30_t1_q1_sheet2.svg';
import imgB30T1S3 from '../../assets/grade2-workbook/bai30_t1_q1_sheet3.svg';
import imgB30T1S4 from '../../assets/grade2-workbook/bai30_t1_q1_sheet4.svg';
import imgB30T2S1 from '../../assets/grade2-workbook/bai30_t2_q1_sheet1.svg';
import imgB30T2S2 from '../../assets/grade2-workbook/bai30_t2_q1_sheet2.svg';
import imgB30T2S3 from '../../assets/grade2-workbook/bai30_t2_q1_sheet3.svg';
import imgB30T2S4 from '../../assets/grade2-workbook/bai30_t2_q1_sheet4.svg';

// Tên các điểm viết trong một chỗ chấm ("A, B, C, M, N", "x và y"): thứ tự,
// dấu phẩy, chữ "và", chữ hoa/thường đều không quan trọng.
function letterSetValidate(letters) {
  const target = letters.map(l => l.toUpperCase()).sort().join('');
  return (value) => {
    const got = (stripVN(value).replace(/\bva\b/g, ' ').toUpperCase().match(/[A-Z]/g) || []).sort().join('');
    return got === target;
  };
}

// Tên các đoạn thẳng ("AB, MN" hay "MN và BA"): mỗi tên viết chữ theo thứ tự
// nào cũng được, liệt kê theo thứ tự nào cũng được.
function segsValidate(names) {
  const check = letterGroupsValidate(names);
  return (value) => check(String(value).replace(/\s+(và|va)\s+/gi, ','));
}

// Tên đường gấp khúc: đọc xuôi hoặc ngược ("MNPQ" / "QPNM"); nhiều đường thì
// liệt kê theo thứ tự nào cũng được.
function polyValidate(names) {
  const canon = (s) => { const r = s.split('').reverse().join(''); return s < r ? s : r; };
  const norm = (arr) => arr.map(s => stripVN(s).toUpperCase().replace(/[^A-Z]/g, '')).filter(Boolean).map(canon).sort().join('|');
  const target = norm(names);
  return (value) => norm(String(value).split(/[,;]|\s+(?:và|va)\s+/i)) === target;
}

// Các ngày trong một tháng ("2, 9, 16, 23, 30" hay "ngày 2, 9, ... tháng 12"):
// chỉ so tập các ngày; "tháng 12", "thứ 5" viết thêm không tính.
function daySetValidate(days) {
  const target = [...days].sort((a, b) => a - b).join(',');
  return (value) => {
    const v = stripVN(value).replace(/thang\s*\d+/g, ' ').replace(/thu\s*\d/g, ' ');
    return (v.match(/\d+/g) || []).map(Number).sort((a, b) => a - b).join(',') === target;
  };
}

// Một ngày ("ngày 27 tháng 1", "27/1", hoặc chỉ "27" khi tháng đã rõ).
// requireMonth: ngày đó sang tháng khác nên phải ghi cả tháng.
function dateValidate(day, month, requireMonth = false) {
  return (value) => {
    const v = stripVN(value).replace(/thu\s*\d/g, ' ');
    const nums = (v.match(/\d+/g) || []).map(Number);
    if (nums.length === 2) return nums[0] === day && nums[1] === month;
    return !requireMonth && nums.length === 1 && nums[0] === day;
  };
}

// Tờ lịch một tháng: bảng thật, cột Chủ nhật chữ xanh như trong sách.
const CAL_HEADERS = ['THỨ<br>HAI', 'THỨ<br>BA', 'THỨ<br>TƯ', 'THỨ<br>NĂM', 'THỨ<br>SÁU', 'THỨ<br>BẢY', 'CHỦ<br>NHẬT'];
function calendar(label, firstCol, days) {
  const cells = [...Array(firstCol).fill(''), ...Array.from({ length: days }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push('');
  const rows = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7).map((d, c) => (c === 6 && d !== '' ? `<span class="gw-sample-text">${d}</span>` : d)));
  }
  return { label, headers: CAL_HEADERS, rows };
}

const ds = (label, isTrue) => ({ label: `${label} ...`, boxes: true, answer: isTrue ? 'Đ' : 'S', validate: dsValidate(isTrue) });
const hm = (label, h, m) => ({ label, answer: `${h},${m}`, validate: listValidate([String(h), String(m)]) });

export const BAI_25_30 = [
  // ── BÀI 25 (trang 94–96) ─────────────────────────────────────────────────
  {
    id: 'bai-25', number: 25, title: 'Điểm, đoạn thẳng, đường thẳng, đường cong, ba điểm thẳng hàng',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB25T1Q1,
        q: '1. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Trong hình vẽ bên có các điểm là: ...', answer: 'A, B, C, M, N', validate: letterSetValidate(['A', 'B', 'C', 'M', 'N']) },
          { label: 'b) Trong hình vẽ có các đoạn thẳng là: ...', answer: 'AB, MN', validate: segsValidate(['AB', 'MN']) },
        ],
        hints: ['Điểm C đứng một mình, không nằm trên đoạn thẳng nào.', 'Đoạn thẳng có hai đầu là hai điểm.'],
      },
      {
        type: 'table', section: 'Tiết 1', img: imgB25T1Q2,
        q: '2. Viết vào chỗ chấm (theo mẫu).',
        headers: ['', 'Hình 1', 'Hình 2'],
        rows: [[
          'Tên các đoạn thẳng',
          blank('NP, PQ, QM', {
            prefix: 'MN,',
            validate: (v) => letterGroupsValidate(['NP', 'PQ', 'QM'])(v) || letterGroupsValidate(['MN', 'NP', 'PQ', 'QM'])(v),
          }),
          blank('AB, BC, CD', { validate: letterGroupsValidate(['AB', 'BC', 'CD']) }),
        ]],
        hints: ['Hình 1 có 4 đoạn thẳng, đã viết sẵn MN. Hình 2 có 3 đoạn thẳng.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB25T1Q3,
        q: '3. Đo độ dài các đoạn thẳng rồi viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'Đoạn thẳng MN dài ... cm.', answer: '5' },
          { label: 'Đoạn thẳng NP dài ... cm.', answer: '3' },
        ],
        hints: ['Đặt vạch 0 của thước trùng với một đầu đoạn thẳng. Đo trên sách: MN dài 5 cm, NP dài 3 cm.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB25T1Q4,
        q: '4. Cho hình vẽ:',
        blanks: [
          { label: 'a) Đo độ dài các đoạn thẳng rồi viết số thích hợp vào chỗ chấm.<br>Đoạn thẳng AB dài ... cm.', answer: '2' },
          { label: 'Đoạn thẳng BC dài ... cm.', answer: '4' },
          { label: 'Đoạn thẳng CD dài ... cm.', answer: '2' },
          { label: 'Đoạn thẳng DE dài ... cm.', answer: '1' },
          { label: 'b) Viết tiếp vào chỗ chấm cho thích hợp.<br>Đoạn thẳng ... dài nhất.', answer: 'BC', validate: segsValidate(['BC']) },
          { label: 'Đoạn thẳng ... ngắn nhất.', answer: 'DE', validate: segsValidate(['DE']) },
          { label: 'Đoạn thẳng AB và đoạn thẳng ... dài bằng nhau.', answer: 'CD', validate: segsValidate(['CD']) },
        ],
        hints: ['Đo trên sách: AB = 2 cm, BC = 4 cm, CD = 2 cm, DE = 1 cm.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB25T2Q1,
        q: '1. Viết tiếp vào chỗ chấm cho thích hợp.\nTrong hình vẽ trên có:',
        blanks: [
          { label: 'a) Đường thẳng: ...', answer: 'AB', validate: segsValidate(['AB']) },
          { label: 'b) Đường cong: ...', answer: 'x, y', validate: letterSetValidate(['x', 'y']) },
        ],
        hints: ['Đường thẳng kéo dài qua hai điểm A, B. CD chỉ là một đoạn thẳng.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB25T2Q2,
        q: '2. Đ, S?\nTrong hình vẽ trên:',
        blanks: [
          ds('Ba điểm D, E, G thẳng hàng.', false),
          ds('Ba điểm A, B, C thẳng hàng.', true),
          ds('Ba điểm M, N, P thẳng hàng.', false),
        ],
        hints: ['Ba điểm thẳng hàng khi cả ba cùng nằm trên mép thước. Điểm D và điểm N nằm lệch lên trên.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB25T2Q3,
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'Ba điểm thẳng hàng trong hình vẽ bên là: A, N, C và ...', answer: 'B, N, D', validate: letterSetValidate(['B', 'N', 'D']) },
        ],
        hints: ['A, N, C cùng nằm trên một đoạn thẳng. Tìm đoạn thẳng còn lại cũng đi qua N.'],
      },
      {
        type: 'match', section: 'Tiết 2', img: imgB25T2Q4,
        q: '4. Quan sát tranh rồi nối để có câu hợp lí.',
        left: [
          { id: 'l1', text: 'Vạch kẻ đường' },
          { id: 'l2', text: 'Ba cột đèn' },
          { id: 'l3', text: 'Vệt mây do máy bay tạo ra' },
        ],
        right: [
          { id: 'r1', text: 'có dạng đường cong.' },
          { id: 'r2', text: 'có dạng đường thẳng.' },
          { id: 'r3', text: 'thẳng hàng.' },
        ],
        pairs: [['l1', 'r2'], ['l2', 'r3'], ['l3', 'r1']],
      },
    ],
  },

  // ── BÀI 26 (trang 97–99) ─────────────────────────────────────────────────
  {
    id: 'bai-26', number: 26, title: 'Đường gấp khúc. Hình tứ giác',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB26T1Q1,
        q: '1. Viết tên đường gấp khúc vào chỗ chấm.',
        blanks: [
          { label: 'a) Đường gấp khúc ...', answer: 'MNPQ', validate: polyValidate(['MNPQ']) },
          { label: 'b) Đường gấp khúc ...', answer: 'ABCDE', validate: polyValidate(['ABCDE']) },
        ],
        hints: ['Đọc tên các điểm lần lượt từ đầu này đến đầu kia của đường gấp khúc.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB26T1Q2,
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [{ label: 'Trong hình vẽ bên có ... hình tứ giác.', answer: '8' }],
        hints: ['Đếm cả 3 ô nhỏ trên tường và mái nhà hình thang ở giữa. Hình có mái dốc hai bên ở giữa có 6 cạnh, không phải tứ giác.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB26T1Q3,
        q: '3. Tính độ dài đường gấp khúc MNPQ.',
        wordProblem: true,
        blanks: [{ label: 'Độ dài đường gấp khúc MNPQ (cm)', answer: '12', validate: unitValidate(12, 'cm') }],
        hints: ['Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng: 3 cm + 4 cm + 5 cm.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB26T1Q4,
        q: '4. Viết số thích hợp vào chỗ chấm.',
        blanks: [{
          label: 'Tất cả những ngôi nhà trên được xếp từ ... mảnh giấy hình tam giác, ... mảnh giấy hình tứ giác và ... mảnh giấy hình tròn.',
          answer: '4,9,2', validate: listValidate(['4', '9', '2']),
        }],
        hints: ['Mái nhà thứ ba là hình tứ giác. Đếm cả thân nhà và các cửa sổ hình chữ nhật.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB26T2Q1, multi: true,
        q: '1. Khoanh vào vật có dạng đường gấp khúc và dạng hình tứ giác trong bức tranh bên dưới.',
        options: ['Cây đèn', 'Bức tranh treo tường', 'Chiếc gối', 'Ngăn kéo tủ', 'Mặt bàn tròn', 'Lọ hoa'],
        answer: [0, 1, 2, 3],
        hints: ['Thân cây đèn gập khúc như đường gấp khúc. Vật có 4 cạnh là hình tứ giác. Lọ hoa có 6 cạnh.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB26T2Q3,
        q: '3. Cho hình vẽ:\na) Viết tên đường gấp khúc thích hợp vào chỗ chấm.\nb) Tính độ dài đường gấp khúc BCDE.',
        wordProblem: true,
        blanks: [
          { label: 'a) Các đường gấp khúc gồm 3 đoạn thẳng là: ...', answer: 'ABCD, BCDE', validate: polyValidate(['ABCD', 'BCDE']) },
          { label: 'Đường gấp khúc gồm 4 đoạn thẳng là: ...', answer: 'ABCDE', validate: polyValidate(['ABCDE']) },
          { label: 'b) Độ dài đường gấp khúc BCDE (cm)', answer: '13', validate: unitValidate(13, 'cm') },
        ],
        hints: ['Có hai đường gấp khúc gồm 3 đoạn thẳng.', 'BCDE: 5 cm + 5 cm + 3 cm.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB26T2Q4,
        q: '4. Hai bạn ốc sên Bu và Bi bò qua sân theo hai đường như hình vẽ.\nViết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Bu bò quãng đường dài ... cm. Bi bò quãng đường dài ... cm.', answer: '10,11', validate: listValidate(['10', '11']) },
          { label: 'b) Bạn ... bò quãng đường dài hơn.', answer: 'Bi', validate: phraseValidate('Bi') },
        ],
        hints: ['Mỗi cạnh ô vuông dài 1 cm. Đếm số cạnh ô vuông trên đường đi của mỗi bạn.'],
      },
    ],
  },

  // ── BÀI 27 (trang 100–103) ───────────────────────────────────────────────
  {
    id: 'bai-27', number: 27, title: 'Thực hành gấp, cắt, ghép, xếp hình. Vẽ đoạn thẳng',
    questions: [
      {
        type: 'choice', section: 'Tiết 1', img: imgB27T1Q1,
        q: '1. Khoanh vào chữ đặt trước đáp án đúng.\nMai có 4 hình tam giác giống nhau như sau:\nDùng 4 hình đó, Mai không thể xếp được hình nào dưới đây?',
        options: ['Hình A', 'Hình B', 'Hình C', 'Hình D'],
        answer: 3,
        hints: ['Thử ghép: thân thuyền ở hình D đã cần 4 hình tam giác, còn thêm cánh buồm nữa.'],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB27T1Q3, multi: true,
        q: '3. Tô màu hai hình ở cột bên trái ghép được hình ở cột bên phải.',
        options: ['Hình thứ nhất (bên trái)', 'Hình thứ hai (ở giữa)', 'Hình thứ ba (bên phải)'],
        answer: [0, 2],
        hints: ['Hình bên phải có hai cạnh góc vuông dài 5 ô. Đếm ô các cạnh của từng hình bên trái.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB27T1Q4,
        q: '4. Viết số thích hợp vào chỗ chấm (theo mẫu).\nDùng các hình tam giác nhỏ như nhau để ghép được các hình sau đây. Mỗi hình được ghép từ bao nhiêu hình tam giác như vậy?',
        blanks: [
          { label: 'b) ...', answer: '3' },
          { label: 'c) ...', answer: '4' },
          { label: 'd) ...', answer: '6' },
        ],
        hints: ['Hình a) gồm 2 hình tam giác nhỏ. Hai hình tam giác nhỏ ghép được một hình vuông.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB27T2Q3,
        q: '3. Vẽ hình vuông tiếp theo vào vị trí (4) rồi viết số thích hợp vào chỗ chấm.',
        blanks: [{ label: 'Hình vuông (4) có cạnh dài ... cm.', answer: '4' }],
        hints: ['Cạnh các hình vuông (1), (2), (3) dài 1 cm, 2 cm, 3 cm.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB27T2Q4,
        q: '4. Khoanh vào chữ đặt dưới câu trả lời đúng.\nCon đường dài nhất đưa chú chó đến khúc xương là con đường nào?',
        options: ['Con đường A', 'Con đường B', 'Con đường C', 'Con đường D'],
        answer: 3,
        hints: ['Đếm số cạnh ô vuông trên mỗi con đường.'],
      },
    ],
  },

  // ── BÀI 28 (trang 104–105) ───────────────────────────────────────────────
  {
    id: 'bai-28', number: 28, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', img: imgB28Q1,
        q: '1. Đ, S?\nTrong hình vẽ trên có:',
        blanks: [
          ds('a) Đoạn thẳng HK.', true),
          ds('b) Đường thẳng AB.', true),
          ds('c) Đường cong <i>x</i>.', true),
          ds('d) Ba điểm H, O, K thẳng hàng.', true),
          ds('e) Ba điểm A, B, C thẳng hàng.', false),
        ],
        hints: ['Điểm C không nằm trên đường thẳng AB.'],
      },
      {
        type: 'fill', img: imgB28Q2,
        q: '2. Viết tên các đoạn thẳng vào chỗ chấm.',
        blanks: [
          { label: 'a) Cho ba điểm M, N, P không thẳng hàng.<br>Trong hình có các đoạn thẳng: ...', answer: 'MN, NP', validate: segsValidate(['MN', 'NP']) },
          { label: 'b) Cho ba điểm M, N, P thẳng hàng.<br>Trong hình có các đoạn thẳng: ...', answer: 'MN, NP, MP', validate: segsValidate(['MN', 'NP', 'MP']) },
        ],
        hints: ['Ở hình b), đừng quên đoạn thẳng đi từ M đến P.'],
      },
      {
        type: 'fill', img: imgB28Q3,
        q: '3. Viết số thích hợp vào chỗ chấm.',
        blanks: [{ label: 'Trong hình trên có ... hình tứ giác.', answer: '4' }],
        hints: ['Đếm cả các hình tứ giác ghép từ hai phần và cả hình lớn.'],
      },
      {
        type: 'fill', img: imgB28Q5,
        q: '5. Hôm qua, chú ốc sên bò 13 cm từ nhà đến siêu thị mua đồ, rồi bò thêm 27 cm từ siêu thị đến bờ ao. Tính độ dài quãng đường mà ốc sên đã bò.',
        wordProblem: true,
        blanks: [{ label: 'Độ dài quãng đường ốc sên đã bò (cm)', answer: '40', validate: unitValidate(40, 'cm') }],
      },
    ],
  },

  // ── BÀI 29 (trang 106–109) ───────────────────────────────────────────────
  {
    id: 'bai-29', number: 29, title: 'Ngày – giờ, giờ – phút',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB29T1Q1,
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'Mi và bố tưới rau lúc ... giờ chiều.', answer: '5' },
          { label: 'Mi và Mai đánh răng lúc ... giờ tối.', answer: '9' },
          { label: 'Lúc ... giờ sáng, Mi và Mai đang ngủ.', answer: '2' },
        ],
        hints: ['Kim ngắn chỉ giờ, kim dài chỉ số 12.'],
      },
      {
        type: 'match', section: 'Tiết 1', img: imgB29T1Q2,
        q: '2. Nối đồng hồ chỉ thời gian thích hợp với mỗi bức tranh.',
        left: [
          { id: 'l1', text: 'Việt ăn cơm lúc 11 giờ trưa.' },
          { id: 'l2', text: 'Rô-bốt tan học lúc 4 giờ chiều.' },
          { id: 'l3', text: 'Nam chuẩn bị đồ dùng học tập lúc 9 giờ tối.' },
        ],
        right: [
          { id: 'r16', text: '16 : 00' },
          { id: 'r21', text: '21 : 00' },
          { id: 'r11', text: '11 : 00' },
        ],
        pairs: [['l1', 'r11'], ['l2', 'r16'], ['l3', 'r21']],
        hints: ['4 giờ chiều là 16 giờ, 9 giờ tối là 21 giờ.'],
      },
      {
        type: 'compare', section: 'Tiết 1', img: imgB29T1Q3,
        q: '3. Khoanh vào chữ đặt trước đồng hồ chỉ thời gian thích hợp với mỗi bức tranh.',
        rows: [
          { left: 'a)', options: ['A. 08 : 00', 'B. 20 : 00'], answer: 'A' },
          { left: 'b)', options: ['A. 04 : 00', 'B. 16 : 00'], answer: 'B' },
        ],
        hints: ['Tranh a) có ông mặt trời — trời đang sáng. Tranh b) mọi người làm bánh, không phải lúc nửa đêm về sáng.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB29T2Q1,
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          hm('Lúc ... giờ ... phút chiều, Nam và Việt cùng nhau đi bộ.', 4, 15),
          hm('Lúc ... giờ ... phút sáng, bố cùng hai chị em làm bánh.', 10, 30),
          hm('Lúc ... giờ ... phút tối, các bạn cùng dự tiệc sinh nhật Rô-bốt.', 8, 15),
        ],
        hints: ['Kim dài chỉ số 3 là 15 phút, chỉ số 6 là 30 phút.'],
      },
      {
        type: 'match', section: 'Tiết 2', img: imgB29T2Q2,
        q: '2. Nối đồng hồ chỉ thời gian thích hợp với mỗi bức tranh.',
        left: [
          { id: 'l1', text: 'Lúc 1 giờ 15 phút sáng, Rô-bốt đang ngủ.' },
          { id: 'l2', text: 'Rô-bốt tưới cây lúc 4 giờ 30 phút chiều.' },
          { id: 'l3', text: 'Rô-bốt rửa bát lúc 12 giờ 15 phút trưa.' },
        ],
        right: [
          { id: 'r1215', text: '12 : 15' },
          { id: 'r0115', text: '01 : 15' },
          { id: 'r1630', text: '16 : 30' },
        ],
        pairs: [['l1', 'r0115'], ['l2', 'r1630'], ['l3', 'r1215']],
        hints: ['4 giờ 30 phút chiều là 16 giờ 30 phút.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB29T2Q3,
        q: '3. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          hm('Mai chuẩn bị bàn ăn lúc ... giờ ... phút chiều.', 6, 15),
          hm('Việt tập thể dục lúc ... giờ ... phút sáng.', 5, 30),
          hm('Lúc ... giờ ... phút chiều, Nam đang học.', 3, 30),
          hm('Lúc ... giờ ... phút tối, bố cùng Mi đọc truyện trước giờ đi ngủ.', 9, 15),
        ],
        hints: ['18 giờ là 6 giờ chiều, 15 giờ là 3 giờ chiều, 21 giờ là 9 giờ tối.'],
      },
    ],
  },

  // ── BÀI 30 (trang 110–113) ───────────────────────────────────────────────
  {
    id: 'bai-30', number: 30, title: 'Ngày – tháng',
    questions: [
      {
        type: 'match', section: 'Tiết 1',
        q: '1. Nối cách đọc ngày, tháng ứng với mỗi tờ lịch.',
        left: [
          { id: 'l1', img: imgB30T1S1 }, { id: 'l2', img: imgB30T1S2 },
          { id: 'l3', img: imgB30T1S3 }, { id: 'l4', img: imgB30T1S4 },
        ],
        right: [
          { id: 'r1', text: 'Ngày hai mươi bảy tháng Hai' },
          { id: 'r2', text: 'Ngày hai mươi tháng Mười một' },
          { id: 'r3', text: 'Ngày mười chín tháng Tám' },
          { id: 'r4', text: 'Ngày một tháng Năm' },
        ],
        pairs: [['l1', 'r2'], ['l2', 'r1'], ['l3', 'r4'], ['l4', 'r3']],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Xem tờ lịch sau đây rồi viết tiếp vào chỗ chấm.',
        tables: [calendar('THÁNG MƯỜI HAI', 2, 31)],
        blanks: [
          { label: 'a) Rô-bốt học vẽ vào thứ Năm mỗi tuần. Vậy trong tháng 12, Rô-bốt học vẽ vào những ngày ...', answer: '2, 9, 16, 23, 30', validate: daySetValidate([2, 9, 16, 23, 30]) },
          { label: 'b) Mi học đàn vào tối thứ Bảy hằng tuần. Vậy trong tháng 12 này, Mi có ... buổi học đàn.', answer: '4' },
          { label: 'c) Nam và Việt cùng đội bóng của lớp có hai trận bóng vào Chủ nhật tuần thứ nhất và tuần thứ ba của tháng 12. Vậy đội bóng của lớp Nam và Việt có trận đấu vào ngày ... và ngày ...', answer: '5,19', validate: listValidate(['5', '19']) },
        ],
        hints: ['Xem cột THỨ NĂM, cột THỨ BẢY và cột CHỦ NHẬT của tờ lịch.'],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '3. Xem tờ lịch tháng 1 sau đây rồi viết câu trả lời.',
        tables: [calendar('THÁNG MỘT', 5, 31)],
        blanks: [
          { label: 'a) Bố của Mai muốn đưa Mai đến công viên gần nhà để tập đi xe đạp vào những ngày Chủ nhật của tháng 1. Hỏi trong tháng 1, Mai tập đi xe đạp vào những ngày nào?<br>...', answer: '2, 9, 16, 23, 30', validate: daySetValidate([2, 9, 16, 23, 30]) },
          { label: 'b) Ngày 21 tháng 1 là ngày sinh nhật của mẹ Việt. Sinh nhật của bố Việt là thứ Năm của tuần sau đó. Hỏi bố Việt sinh nhật vào ngày nào, tháng nào?<br>...', answer: 'ngày 27 tháng 1', validate: dateValidate(27, 1) },
        ],
        hints: ['Ngày 21 tháng 1 là thứ Sáu. Tuần sau đó bắt đầu từ thứ Hai ngày 24.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Hôm nay là ngày Giáng sinh – ngày 25 tháng 12. Vậy ngày mai là ngày ... tháng ...', answer: '26,12', validate: listValidate(['26', '12']) },
          { label: 'b) Hôm qua là ngày 31 tháng 1. Vậy hôm nay là ngày ... tháng ...', answer: '1,2', validate: listValidate(['1', '2']) },
        ],
        hints: ['Tháng 1 có 31 ngày, sau ngày 31 tháng 1 là ngày đầu tiên của tháng 2.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '1. Nối cách đọc ngày, tháng ứng với mỗi tờ lịch.',
        left: [
          { id: 'l1', img: imgB30T2S1 }, { id: 'l2', img: imgB30T2S2 },
          { id: 'l3', img: imgB30T2S3 }, { id: 'l4', img: imgB30T2S4 },
        ],
        right: [
          { id: 'r1', text: 'Ngày ba mươi tháng Tư' },
          { id: 'r2', text: 'Ngày hai mươi mốt tháng Sáu' },
          { id: 'r3', text: 'Ngày năm tháng Chín' },
          { id: 'r4', text: 'Ngày một tháng Một' },
        ],
        pairs: [['l1', 'r3'], ['l2', 'r4'], ['l3', 'r1'], ['l4', 'r2']],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. Xem tờ lịch tháng 2 sau đây rồi viết câu trả lời.',
        tables: [calendar('THÁNG HAI', 1, 28)],
        blanks: [
          { label: 'a) Ngày 9 tháng 2 là mồng 1 tết Nguyên đán. Rô-bốt được nghỉ học từ thứ Bảy tuần trước đó. Hỏi Rô-bốt được nghỉ học từ ngày nào?<br>...', answer: 'ngày 5 tháng 2', validate: dateValidate(5, 2) },
          { label: 'b) Sau kì nghỉ tết Nguyên đán, Rô-bốt trở lại trường học vào thứ Hai tuần thứ tư của tháng 2. Hỏi Rô-bốt trở lại trường học vào ngày nào?<br>...', answer: 'ngày 21 tháng 2',
            // Hàng thứ tư của tờ lịch → 21; nếu bé đếm thứ Hai thứ tư của tháng thì ra 28 — cả hai cách đều hợp lí.
            validate: (v) => dateValidate(21, 2)(v) || dateValidate(28, 2)(v) },
        ],
        hints: ['Ngày 9 tháng 2 là thứ Tư.', 'Mỗi hàng của tờ lịch là một tuần; hàng thứ tư là từ ngày 21 đến ngày 27.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '3. Xem tờ lịch tháng 3 sau đây rồi viết câu trả lời.',
        tables: [calendar('THÁNG BA', 1, 31)],
        blanks: [
          { label: 'a) Nhân dịp 8 tháng 3 – ngày Quốc tế Phụ nữ, bố cùng hai chị em Mai và Mi bí mật chuẩn bị một món quà tặng mẹ. Ba bố con bắt đầu chuẩn bị món quà từ thứ Ba tuần trước đó. Hỏi đó là ngày nào?<br>...', answer: 'ngày 1 tháng 3', validate: dateValidate(1, 3) },
          { label: 'b) Thời gian kiểm tra giữa học kì 2 tại trường học của Rô-bốt kéo dài 3 ngày, bắt đầu từ thứ Tư cuối cùng của tháng 3. Ngày đó là ngày nào?<br>...', answer: 'ngày 30 tháng 3', validate: dateValidate(30, 3) },
          { label: 'Kì kiểm tra đó kết thúc vào ngày nào?<br>...', answer: 'ngày 1 tháng 4', validate: dateValidate(1, 4, true) },
        ],
        hints: ['Ngày 8 tháng 3 là thứ Ba.', 'Tháng 3 có 31 ngày. Ba ngày kiểm tra là ngày 30, ngày 31 và một ngày của tháng sau.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nLớp học của Rô-bốt thường tổ chức tiệc vào ngày cuối cùng của mỗi tháng. Ngày 30 tháng 4 là thứ Năm nhưng là ngày nghỉ lễ nên lớp sẽ tổ chức tiệc vào một ngày trước đó.',
        blanks: [{
          label: 'Đó là thứ ... ngày ... tháng ...',
          answer: 'Tư,29,4',
          validate: (value) => {
            const [thu, ngay, thang] = String(value).split(',').map(s => stripVN(s).trim());
            return ['tu', '4', 'bon'].includes(thu) && ngay === '29' && thang === '4';
          },
        }],
        hints: ['Ngày trước thứ Năm là thứ Tư; ngày trước ngày 30 là ngày 29.'],
      },
    ],
  },
];
