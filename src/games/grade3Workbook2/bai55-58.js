/**
 * Vở bài tập Toán 3 — Tập hai: Bài 55–58 (sách trang 40–53).
 * Phép trừ trong phạm vi 10 000; nhân, chia số có bốn chữ số với (cho) số có
 * một chữ số; luyện tập chung.
 */
import { blank, letterValidate, exprValidate } from '../grade3Workbook.js';
import imgB56Elephants from '../../assets/grade3-workbook-2/bai56_t1_q5_elephants.svg';
import imgB57Rings from '../../assets/grade3-workbook-2/bai57_t3_q4_rings.svg';
import imgB58Swim from '../../assets/grade3-workbook-2/bai58_t1_q4_swim.svg';
import imgB58Robots from '../../assets/grade3-workbook-2/bai58_t1_q5_robots.svg';
import imgB58House from '../../assets/grade3-workbook-2/bai58_t2_q2_house.svg';
import imgB58Maze from '../../assets/grade3-workbook-2/bai58_t2_q3_maze.svg';
import imgB58Strongmen from '../../assets/grade3-workbook-2/bai58_t2_q4_strongmen.svg';
import imgB58Palace from '../../assets/grade3-workbook-2/bai58_t3_q4_palace.svg';

// ── Local helpers ────────────────────────────────────────────────────────────

// The book prints numbers from 1 000 up with a space between the thousands and
// the hundreds ("2 191"): the child may type "2191", "2 191" or "2.191".
const digits = (v) => String(v).replace(/[\s. ]/g, '');
const numV = (n) => (v) => digits(v) === String(n);

// A blank row; every "..." is one number, compared slot by slot with numV.
function B(label, ...answers) {
  const ans = answers.map(String);
  return {
    label,
    answer: ans.join(','),
    validate: (v) => {
      const parts = String(v).split(',');
      return parts.length === ans.length && parts.every((p, i) => digits(p) === ans[i]);
    },
  };
}

// A table cell blank holding a number (spaces/dots between digit groups allowed).
const nb = (n) => blank(n, { validate: numV(n) });

// "Tính." / "Đặt tính rồi tính." for a division: quotient and remainder (0 when
// the division is exact), like Tập một's divBlank, with the book's number spacing.
function divRow(prefix, dividend, divisor) {
  const quot = Math.floor(dividend / divisor);
  const rem = dividend % divisor;
  return B(`${prefix}${fmt(dividend)} : ${divisor} = ... (dư ...)`, quot, rem);
}
const DIV_NOTE = '(Viết thương và số dư; phép chia hết thì số dư là 0.)';

// "1234" → "1 234" (the book's spacing).
function fmt(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// An arrow with its operation written above it, as the book prints the chain
// "1 216 → ☐ → ☐" (the operation sits on top of each arrow).
const ar = (op) => `<span style="display:inline-flex;flex-direction:column;align-items:center;line-height:1.05;white-space:nowrap"><span style="font-size:.9em">${op}</span><span>⟶</span></span>`;

// A "Mẫu:" box of several lines: the words "Mẫu:" / "Nhẩm:" stay black, the
// worked lines are printed in the book's blue sample colour (like Tập một's mau()).
const sample = (lines) => lines.map(([head, body]) => `${head ? head + ' ' : ''}<span class="gw-sample-text">${body}</span>`).join('<br>');

// The space inside "5 264" must never break a number over two lines on a phone:
// every such space in the shown text becomes a no-break space.
const keep = (s) => (typeof s === 'string' ? s.replace(/(\d) (?=\d{3}(?!\d))/g, '$1 ') : s);
function keepNumbers(units) {
  for (const u of units) {
    for (const q of u.questions) {
      q.q = keep(q.q);
      if (q.hints) q.hints = q.hints.map(keep);
      if (q.options) q.options = q.options.map(keep);
      (q.blanks || []).forEach((b) => { b.label = keep(b.label); });
      if (q.headers) q.headers = q.headers.map(keep);
      if (q.rows) {
        q.rows = q.rows.map((r) => {
          if (Array.isArray(r)) return r.map(keep);
          r.left = keep(r.left); r.right = keep(r.right);
          if (r.options) { r.options = r.options.map(keep); r.answer = keep(r.answer); }
          return r;
        });
      }
      ['left', 'middle', 'right'].forEach((k) => (q[k] || []).forEach((it) => { it.text = keep(it.text); }));
      (q.tables || []).forEach((t) => {
        if (t.headers) t.headers = t.headers.map(keep);
        t.rows = t.rows.map((row) => (Array.isArray(row) ? row.map(keep) : row));
      });
    }
  }
  return units;
}

export const BAI_55_58 = keepNumbers([
  // ── BÀI 55 (trang 40–42) ─────────────────────────────────────────────────
  {
    id: 'bai-55', number: 55, title: 'Phép trừ trong phạm vi 10 000',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [
          B('5 264 − 2 538 =', 2726), B('8 320 − 1 607 =', 6713),
          B('4 037 − 218 =', 3819), B('2 658 − 70 =', 2588),
        ],
        hints: ['Trừ lần lượt từ phải sang trái: đơn vị, chục, trăm, nghìn. Chữ số trên bé hơn chữ số dưới thì mượn 1 ở hàng bên trái.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [B('3 054 − 2 526 =', 528), B('4 620 − 2 915 =', 1705), B('8 231 − 703 =', 7528)],
        hints: ['Viết các chữ số cùng hàng thẳng cột với nhau rồi trừ từ phải sang trái.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '3. Nối mỗi phép tính với kết quả của phép tính đó.',
        left: [
          { id: 'e1', text: '9 284 − 1 968' },
          { id: 'e2', text: '4 527 + 2 609' },
          { id: 'e3', text: '8 392 − 866' },
        ],
        right: [
          { id: 'r7136', text: '🚚 7 136' },
          { id: 'r7526', text: '🚚 7 526' },
          { id: 'r7316', text: '🚚 7 316' },
        ],
        pairs: [['e1', 'r7316'], ['e2', 'r7136'], ['e3', 'r7526']],
        hints: ['Đặt tính ra nháp để tính từng phép tính, rồi tìm xe tải ghi đúng kết quả.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '4. Đỉnh Phan-xi-păng là đỉnh núi cao nhất Việt Nam với độ cao 3 143 m so với mực nước biển. Đỉnh Tây Côn Lĩnh cao 2 427 m so với mực nước biển. Hỏi đỉnh Phan-xi-păng cao hơn đỉnh Tây Côn Lĩnh bao nhiêu mét?',
        blanks: [B('Phan-xi-păng cao hơn Tây Côn Lĩnh (m)', 716)],
        hints: ['Muốn biết cao hơn bao nhiêu, lấy độ cao lớn trừ độ cao bé.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính nhẩm (theo mẫu).\n' + sample([['Mẫu:', '6 000 − 2 000 = ?'], ['Nhẩm:', '6 nghìn − 2 nghìn = 4 nghìn'], ['', '6 000 − 2 000 = 4 000']]),
        blanks: [
          B('a) 5 000 − 3 000 =', 2000), B('b) 9 000 − 6 000 =', 3000),
          B('c) 8 000 − 4 000 =', 4000), B('d) 10 000 − 7 000 =', 3000),
        ],
        hints: ['10 000 là 10 nghìn.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Tính nhẩm (theo mẫu).\n' + sample([
          ['Mẫu 1:', '6 800 − 400 = ?'], ['Nhẩm:', '8 trăm − 4 trăm = 4 trăm'],
          ['', '6 nghìn 8 trăm − 4 trăm = 6 nghìn 4 trăm'], ['', '6 800 − 400 = 6 400'],
          ['Mẫu 2:', '7 800 − 5 000 = ?'], ['Nhẩm:', '7 nghìn − 5 nghìn = 2 nghìn'],
          ['', '7 nghìn 8 trăm − 5 nghìn = 2 nghìn 8 trăm'], ['', '7 800 − 5 000 = 2 800'],
        ]),
        blanks: [
          B('a) 3 700 − 500 =', 3200), B('b) 7 800 − 700 =', 7100),
          B('c) 4 200 − 3 000 =', 1200), B('d) 5 300 − 2 000 =', 3300),
        ],
        hints: ['Trừ trăm với trăm (như mẫu 1) hoặc nghìn với nghìn (như mẫu 2), phần còn lại giữ nguyên.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '3. Nối mỗi phép tính với kết quả của phép tính đó.',
        left: [
          { id: 'e1', text: '7 000 − 2 000' },
          { id: 'e2', text: '1 400 + 600' },
          { id: 'e3', text: '2 000 − 300' },
        ],
        right: [
          { id: 'r1700', text: '🦒 1 700' },
          { id: 'r5000', text: '🐘 5 000' },
          { id: 'r2000', text: '🦏 2 000' },
        ],
        pairs: [['e1', 'r5000'], ['e2', 'r2000'], ['e3', 'r1700']],
        hints: ['Tính nhẩm: 7 nghìn − 2 nghìn; 14 trăm + 6 trăm = 20 trăm; 20 trăm − 3 trăm.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '4. Trong năm học này, một trường đại học có 5 250 sinh viên. Đến cuối năm học, có 1 300 sinh viên tốt nghiệp ra trường và đầu năm học mới có 1 500 sinh viên mới nhập học. Hỏi trong năm học mới, trường đại học đó có bao nhiêu sinh viên?',
        blanks: [B('Số sinh viên trong năm học mới', 5450)],
        hints: ['Bước 1: số sinh viên còn lại sau khi 1 300 bạn ra trường. Bước 2: cộng thêm 1 500 sinh viên mới.'],
      },
    ],
  },
  // ── BÀI 56 (trang 43–45) ─────────────────────────────────────────────────
  {
    id: 'bai-56', number: 56, title: 'Nhân số có bốn chữ số với số có một chữ số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [
          B('3 302 × 3 =', 9906), B('1 106 × 6 =', 6636),
          B('2 071 × 4 =', 8284), B('1 701 × 5 =', 8505),
        ],
        hints: ['Nhân lần lượt từ phải sang trái: đơn vị, chục, trăm, nghìn; được từ 10 trở lên thì nhớ sang hàng bên trái.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [
          B('1 402 × 2 =', 2804), B('3 229 × 3 =', 9687),
          B('2 182 × 4 =', 8728), B('1 601 × 6 =', 9606),
        ],
        hints: ['Viết thừa số thứ hai thẳng cột với chữ số hàng đơn vị, rồi nhân từ phải sang trái.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Tính nhẩm (theo mẫu).\n' + sample([['Mẫu:', '3 000 × 2 = ?'], ['Nhẩm:', '3 nghìn × 2 = 6 nghìn'], ['', '3 000 × 2 = 6 000']]),
        blanks: [B('1 000 × 5 =', 5000), B('2 000 × 4 =', 8000), B('1 000 × 8 =', 8000)],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '4. Một khu đất hình vuông có độ dài cạnh là 2 409 m. Hỏi chu vi của khu đất đó là bao nhiêu mét?',
        blanks: [B('Chu vi khu đất (m)', 9636)],
        hints: ['Chu vi hình vuông bằng độ dài một cạnh nhân với 4.'],
        perimPlay: { square: 2409, unit: 'm', name: 'khu đất', look: 'field', fill: 0 },
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB56Elephants,
        q: '5. Viết số thích hợp vào chỗ chấm.\nHình bên vẽ một đàn voi.',
        blanks: [
          B('a) Đàn voi có ... con voi.', 9),
          B('b) Mỗi con voi kéo 1 051 kg gỗ keo. Cả đàn voi kéo được ... kg gỗ keo.', 9459),
        ],
        hints: ['Đếm số con voi trong hình.', 'b) 1 051 kg được lấy số lần bằng số con voi.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính.',
        blanks: [
          B('2 142 × 4 =', 8568), B('1 013 × 7 =', 7091),
          B('1 201 × 8 =', 9608), B('4 532 × 2 =', 9064),
        ],
        hints: ['Nhân từ phải sang trái, nhớ cộng thêm số nhớ vào hàng bên trái.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Đặt tính rồi tính.',
        blanks: [
          B('2 619 × 3 =', 7857), B('1 807 × 5 =', 9035),
          B('1 219 × 4 =', 4876), B('4 263 × 2 =', 8526),
        ],
        hints: ['Ở 1 807 × 5: 7 × 5 = 35, viết 5 nhớ 3; 0 × 5 = 0, thêm 3 bằng 3; 8 × 5 = 40, viết 0 nhớ 4; 1 × 5 = 5, thêm 4 bằng 9.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Số?',
        blanks: [
          B(`1 216 ${ar('− 200')} ... ${ar('× 3')} ... ${ar('− 200')} ... ${ar('× 2')} ...`, 1016, 3048, 2848, 5696),
        ],
        hints: ['Tính lần lượt theo mũi tên: 1 216 − 200 = 1 016, rồi lấy 1 016 × 3, ...'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '4. Một làng nghề mỗi tháng dệt được 2 070 tấm lụa. Hỏi sau 3 tháng, làng nghề đó dệt được bao nhiêu tấm lụa?',
        blanks: [B('Số tấm lụa dệt được sau 3 tháng', 6210)],
        hints: ['2 070 tấm lụa được lấy 3 lần.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Đặt tính rồi tính.',
        blanks: [
          B('1 417 × 5 =', 7085), B('3 062 × 3 =', 9186),
          B('1 109 × 8 =', 8872), B('2 092 × 4 =', 8368),
        ],
        hints: ['Nhân từ phải sang trái; hàng nào có chữ số 0 thì 0 nhân với số nào cũng bằng 0, nhớ cộng số nhớ.'],
      },
      {
        type: 'fill', section: 'Tiết 3', wordProblem: true,
        q: '2. Một lữ đoàn có 7 tiểu đoàn, mỗi tiểu đoàn có 613 người. Sau đó lữ đoàn được bổ sung thêm một đại đội gồm có 200 người. Hỏi lúc này, lữ đoàn đó có tất cả bao nhiêu người?',
        blanks: [B('Số người của lữ đoàn lúc này', 4491)],
        hints: ['Bước 1: số người của 7 tiểu đoàn là 613 × 7. Bước 2: cộng thêm 200 người.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Viết số thích hợp vào chỗ chấm.\nLực sĩ Báo thi nhảy xa năm bước. Ba bước nhảy đầu của lực sĩ là 605 cm, hai bước nhảy cuối cùng của lực sĩ là 580 cm.',
        blanks: [
          B('a) Lực sĩ Báo nhảy được tổng cộng ... cm.', 2975),
          B('b) Lực sĩ Báo nhảy được tổng cộng ... m ... cm.', 29, 75),
        ],
        hints: ['Mỗi bước trong ba bước đầu dài 605 cm, mỗi bước trong hai bước cuối dài 580 cm: 605 × 3 + 580 × 2.', 'b) 100 cm = 1 m.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '4. Viết chữ số thích hợp vào ô trống.',
        blanks: [
          { boxes: true, ...B('a) 1...04 × 7 = ...4......', 2, 8, 2, 8) },
          { boxes: true, ...B('b) ...2...8 × 3 = 9...8...', 3, 2, 6, 4) },
        ],
        hints: [
          'a) 4 × 7 = 28 nên chữ số hàng đơn vị của tích là 8. Thử chữ số hàng trăm để tích có chữ số hàng trăm là 4.',
          'b) 8 × 3 = 24, viết 4 nhớ 2. Chữ số hàng chục nhân 3 rồi thêm 2 phải có tận cùng là 8.',
        ],
      },
    ],
  },
  // ── BÀI 57 (trang 46–48) ─────────────────────────────────────────────────
  {
    id: 'bai-57', number: 57, title: 'Chia số có bốn chữ số cho số có một chữ số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: `1. Tính.\n${DIV_NOTE}`,
        blanks: [divRow('', 4088, 4), divRow('', 7707, 7), divRow('', 3648, 6)],
        hints: ['Chia lần lượt từ trái sang phải. Ở 3 648 : 6: 3 không chia được cho 6, lấy 36 : 6 = 6.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '2. Một nhà máy lắp ráp được 1 809 ô tô tải trong 9 ngày. Hỏi mỗi ngày nhà máy lắp ráp được bao nhiêu ô tô tải? Biết rằng số ô tô tải nhà máy lắp ráp được trong mỗi ngày là như nhau.',
        blanks: [B('Số ô tô tải mỗi ngày', 201)],
        hints: ['Lấy 1 809 chia cho 9. Khi hạ 0 xuống mà không chia được thì viết 0 vào thương.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Viết số thích hợp vào chỗ chấm.\nCó hai trang trại nuôi lợn. Trang trại thứ nhất có 3 600 con lợn. Số con lợn ở trang trại thứ hai bằng số con lợn ở trang trại thứ nhất giảm đi 4 lần.',
        blanks: [
          B('• Trang trại thứ hai có ... con lợn.', 900),
          B('• Cả hai trang trại có ... con lợn.', 4500),
        ],
        hints: ['Giảm đi 4 lần thì chia cho 4.'],
      },
      {
        type: 'choice', section: 'Tiết 1',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nChia đều 8 640 bút chì vào 8 hộp. Mỗi hộp có bao nhiêu bút chì?',
        options: ['1 604 bút chì', '1 085 bút chì', '1 080 bút chì'],
        answer: 2,
        hints: ['Tính 8 640 : 8.'],
      },
      {
        type: 'table', section: 'Tiết 2', blanksFirst: true,
        q: `1. a) Tính.\n${DIV_NOTE}\nb) Số?`,
        blanks: [divRow('a) ', 5607, 5), divRow('a) ', 2854, 3)],
        headers: ['Phép chia', 'Số bị chia', 'Số chia', 'Thương', 'Số dư'],
        rows: [
          ['5 847 : 2', nb(5847), nb(2), nb(2923), nb(1)],
          ['8 219 : 4', nb(8219), nb(4), nb(2054), nb(3)],
        ],
        hints: ['Số dư luôn bé hơn số chia.', 'Thử lại: thương × số chia + số dư = số bị chia.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Viết số thích hợp vào chỗ chấm.\nMột đội quân kiến có 5 603 kiến thợ. Cứ 7 kiến thợ khiêng một hạt lạc.',
        blanks: [B('Vậy cả đội quân khiêng được ... hạt lạc và còn thừa ... kiến thợ.', 800, 3)],
        hints: ['Tính 5 603 : 7. Thương là số hạt lạc, số dư là số kiến thợ còn thừa.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Viết số thích hợp vào chỗ chấm.\nTuổi thọ của gián là 4 200 giờ và nhiều gấp 6 lần tuổi thọ của muỗi.',
        blanks: [B('Vậy muỗi có tuổi thọ là ... giờ.', 700)],
        hints: ['Tuổi thọ của gián gấp 6 lần của muỗi nên lấy 4 200 chia cho 6.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết chữ số thích hợp vào ô trống.',
        blanks: [
          { boxes: true, ...B('a) ...400 : 3 = 800', 2) },
          { boxes: true, ...B('b) ......00 : 6 = 500', 3, 0) },
          { boxes: true, ...B('c) 3...00 : 4 = 800', 2) },
        ],
        hints: ['Số bị chia = thương × số chia. Ví dụ a) 800 × 3 = 2 400.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: `1. Đặt tính rồi tính.\n${DIV_NOTE}`,
        blanks: [divRow('', 4436, 4), divRow('', 2590, 5), divRow('', 8007, 8), divRow('', 1928, 6)],
        hints: ['Ở 8 007 : 8: 8 : 8 = 1; hạ 0 được 0, viết 0; hạ 0 viết 0; hạ 7 được 7 : 8 = 0 dư 7.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Tính nhẩm (theo mẫu).\n' + sample([['Mẫu:', '5 000 : 5 = ?'], ['Nhẩm:', '5 nghìn : 5 = 1 nghìn'], ['', '5 000 : 5 = 1 000']]),
        blanks: [B('6 000 : 3 =', 2000), B('4 000 : 2 =', 2000), B('8 000 : 8 =', 1000)],
      },
      {
        type: 'compare', section: 'Tiết 3',
        q: '3. >; <; = ?',
        rows: [
          { left: 'a) 4 500 : 9', right: '8 000 : 4', answer: '<' },
          { left: 'b) 9 000 : 3', right: '300 × 8', answer: '>' },
          { left: 'c) 5 600 : 8', right: '350 × 2', answer: '=' },
        ],
        hints: ['Tính giá trị hai bên trước rồi mới so sánh.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB57Rings,
        q: '4. Viết số thích hợp vào chỗ chấm.\nCó ba con kiến A, B, C bò trên ba vòng tròn. Kiến C bò một vòng được 9 327 mm, dài gấp 3 lần một vòng của kiến A.',
        blanks: [
          B('a) Kiến A bò một vòng được ... mm.', 3109),
          B('b) Kiến B bò một vòng dài gấp 2 lần một vòng của kiến A.<br>Kiến B bò một vòng được ... mm.', 6218),
        ],
        hints: ['a) Một vòng của kiến C gấp 3 lần của kiến A nên lấy 9 327 : 3.', 'b) Lấy kết quả câu a) nhân với 2.'],
      },
    ],
  },
  // ── BÀI 58 (trang 49–53) ─────────────────────────────────────────────────
  {
    id: 'bai-58', number: 58, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: `1. Đặt tính rồi tính.\n${DIV_NOTE}`,
        blanks: [B('4 618 × 2 =', 9236), B('1 702 × 5 =', 8510), divRow('', 4970, 7), divRow('', 8192, 8)],
        hints: ['Phép nhân tính từ phải sang trái, phép chia tính từ trái sang phải.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '2. Trâu rừng cân nặng 909 kg. Voi cân nặng gấp 5 lần trâu rừng, voi cân nặng gấp 9 lần gấu trắng. Hỏi gấu trắng cân nặng bao nhiêu ki-lô-gam?',
        blanks: [B('Gấu trắng cân nặng (kg)', 505)],
        hints: ['Bước 1: voi nặng 909 × 5. Bước 2: voi nặng gấp 9 lần gấu trắng nên lấy cân nặng của voi chia cho 9.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Số?',
        blanks: [B('a) ... × 3 = 3 156', 1052), B('b) ... : 6 = 704', 4224)],
        hints: ['a) Thừa số chưa biết = tích : thừa số đã biết. b) Số bị chia = thương × số chia.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB58Swim,
        q: '4. Viết số thích hợp vào chỗ chấm.\na) Hai con cà cuống A và B cùng bơi đến chỗ cụm rong (như hình vẽ). Cà cuống A bơi theo đường gấp khúc gồm 2 đoạn bằng nhau, cà cuống B bơi theo đường gấp khúc gồm 3 đoạn bằng nhau.',
        blanks: [
          { label: 'Cà cuống có quãng đường bơi ngắn hơn là cà cuống ...', answer: 'B', validate: letterValidate('B') },
          B('b) Quãng đường bơi của tôm là đường gấp khúc gồm 7 đoạn dài bằng nhau. Biết quãng đường tôm bơi dài bằng quãng đường bơi của cà cuống A.<br>Mỗi đoạn của đường gấp khúc tôm bơi dài ... cm.', 356),
        ],
        hints: ['a) Cà cuống A: 1 246 × 2; cà cuống B: 728 × 3. So sánh hai kết quả.', 'b) Lấy quãng đường của cà cuống A chia cho 7.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB58Robots,
        q: '5. Viết số thích hợp vào chỗ chấm.\nBiết 7 cục pin như nhau nặng 2 135 g. Rô-bốt A nặng 2 000 g. Rô-bốt B nặng 1 500 g.',
        blanks: [
          B('a) Mỗi cục pin cân nặng ... g.', 305),
          B('b) Sau khi lắp vào rô-bốt số pin như hình vẽ:<br>• Rô-bốt A cân nặng ... g.', 3525),
          B('• Rô-bốt B cân nặng ... g.', 3330),
        ],
        hints: ['a) Lấy 2 135 : 7.', 'b) Đếm số pin trên mỗi rô-bốt: A có 5 cục, B có 6 cục. Cân nặng của pin cộng với cân nặng của rô-bốt.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `1. Đặt tính rồi tính.\n${DIV_NOTE}`,
        blanks: [divRow('', 2537, 5), divRow('', 3280, 4), B('1 041 × 7 =', 7287), B('3 027 × 3 =', 9081)],
        hints: ['Ở 3 280 : 4: 32 : 4 = 8; hạ 8 được 8 : 4 = 2; hạ 0 được 0 : 4 = 0.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB58House,
        q: '2. Viết số thích hợp vào chỗ chấm.\nỞ khu vui chơi, bác Phong muốn gắn các dây đèn dọc theo mỗi cạnh của nóc ngôi nhà dạng khối lập phương. Mỗi cạnh cần gắn một dây đèn dài 480 cm.',
        blanks: [
          B('a) Bác Phong cần gắn ... dây đèn.', 4),
          B('b) Tổng độ dài các dây đèn đó là ... xăng-ti-mét.', 1920),
        ],
        hints: ['Nóc nhà là mặt trên của khối lập phương, đó là một hình vuông (các cạnh tô đậm trong hình).', 'b) 480 cm được lấy số lần bằng số dây đèn.'],
        // toạ độ theo bai58_t2_q2_house.svg: nóc nhà (hình vuông vẽ nghiêng)
        perimPlay: {
          square: 480, name: 'nóc nhà', eqLabel: 'Tổng độ dài các dây đèn', path: ['_a', '_b', '_c', '_d'],
          points: { _a: [90, 100], _b: [160, 50], _c: [330, 50], _d: [260, 100] }, fill: 1,
        },
      },
      {
        type: 'compare', section: 'Tiết 2', img: imgB58Maze,
        q: '3. Chú ốc sên A chỉ bò theo đường nét liền. Chú ốc sên B chỉ bò theo đường nét đứt. Cả hai chú ốc sên đều bò đến chiếc lá ghi kết quả của phép tính trên mình chú ốc sên đó. Em hãy tô màu đỏ cho đường đi của ốc sên A và màu xanh cho đường đi của ốc sên B.\nChọn chiếc lá mà mỗi chú ốc sên bò đến.',
        rows: [
          { left: 'Ốc sên A (1 010 × 7) bò đến lá:', options: ['7 070', '1 001 (dư 3)', '1 001 (dư 2)', '7 210', '1 000'], answer: '7 070' },
          { left: 'Ốc sên B (7 010 : 7) bò đến lá:', options: ['7 070', '1 001 (dư 3)', '1 001 (dư 2)', '7 210', '1 000'], answer: '1 001 (dư 3)' },
        ],
        hints: ['Tính 1 010 × 7 và 7 010 : 7 (nhớ tìm cả số dư).', 'Sau đó dò theo nét liền (ốc sên A) và nét đứt (ốc sên B) trong hình để thấy đường đến chiếc lá đó.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB58Strongmen,
        q: '4. Viết A hoặc B hoặc C thích hợp vào chỗ chấm.',
        blanks: [{ label: 'Người khổng lồ ... nâng được nhiều ki-lô-gam nhất.', answer: 'B', validate: letterValidate('B'), tiles: ['A', 'B', 'C'], tileOne: true }],
        hints: ['Người A nâng 3 con ngựa, người B nâng con voi và con chó, người C nâng khúc gỗ.', 'Tính số ki-lô-gam mỗi người nâng rồi so sánh.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Tính giá trị của biểu thức.',
        blanks: [
          { label: 'a) (3 000 + 618) : 3 = ...', answer: '3618 : 3', validate: exprValidate('3618 : 3') },
          B('= ...', 1206),
          { label: 'b) (1 216 + 807) × 4 = ...', answer: '2023 × 4', validate: exprValidate('2023 × 4') },
          B('= ...', 8092),
          { label: 'c) 8 412 : (3 + 3) = ...', answer: '8412 : 6', validate: exprValidate('8412 : 6') },
          B('= ...', 1402),
          { label: 'd) 913 × (10 − 3) = ...', answer: '913 × 7', validate: exprValidate('913 × 7') },
          B('= ...', 6391),
        ],
        hints: ['Có dấu ngoặc thì tính trong ngoặc trước.'],
      },
      {
        type: 'fill', section: 'Tiết 3', wordProblem: true,
        q: '2. Một chiếc xe chở 7 530 l dầu. Người ta hút xuống một số lít dầu thì số lít dầu còn lại bằng số lít dầu ban đầu giảm đi 5 lần. Hỏi trên xe còn lại bao nhiêu lít dầu?',
        blanks: [B('Số lít dầu còn lại trên xe (l)', 1506)],
        hints: ['Giảm đi 5 lần thì chia cho 5.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Viết số thích hợp vào chỗ chấm.\nNhà vua cho đắp một đoạn đê dài để ngăn lụt. Đắp 1 m đê cần dùng hết 7 quan tiền. Nhà vua đã chi hết 3 514 quan tiền.',
        blanks: [B('Nhà vua đã cho đắp ... m đê.', 502)],
        hints: ['Mỗi mét đê hết 7 quan tiền, nên lấy 3 514 chia cho 7.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB58Palace,
        q: '4. Viết số thích hợp vào chỗ chấm.\nThời nhà Lý, một cung điện gồm bốn toà nhà vây quanh một cái sân có dạng hình vuông. Người ta lợp ngói ba toà nhà A, B và C, mỗi toà nhà dùng hết 1 708 viên ngói, còn toà nhà D dùng hết 2 715 viên ngói.',
        blanks: [
          B('a) Lợp cả cung điện cần ... viên ngói.', 7839),
          B('b) Khi lợp đến nửa toà nhà A thì vừa hết ngói. Để lợp xong toà nhà A thì cần ... viên ngói nữa.', 854),
        ],
        hints: ['a) Ba toà A, B, C: 1 708 × 3, rồi cộng thêm số ngói của toà D.', 'b) Nửa toà nhà A cần 1 708 : 2 viên ngói.'],
      },
    ],
  },
]);
