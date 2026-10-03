/**
 * Phần tính toán dùng chung của Phiếu bài tập / Đề ôn tập (không đụng tới DOM, chạy được cả trong node
 * để scripts/check-worksheets.mjs kiểm tra dữ liệu). Định dạng dữ liệu: docs/lop_3/phieu-bai-tap.md và
 * docs/lop_3/de-on-tap-giua-ki.md.
 */

/** Giá trị biểu thức "3 × 2", "27 ÷ 3", "4 + 5 × 2", "20 : 4 × 5" (nhân chia trước, trái sang phải). */
export function evalExpr(s) {
  const toks = String(s).replace(/\s+/g, '').match(/\d+|[×÷:+−\-*/]/g) || [];
  const terms = [];
  let sign = 1, cur = null, op = null;
  for (const t of toks) {
    if (/\d/.test(t)) {
      const n = +t;
      cur = cur == null ? n : (op === '×' || op === '*' ? cur * n : cur / n);
    } else if ('×÷:*/'.includes(t)) op = t;
    else { terms.push(sign * cur); cur = null; sign = t === '+' ? 1 : -1; }
  }
  terms.push(sign * cur);
  return terms.reduce((a, b) => a + b, 0);
}

/** Biến cần tìm trong "x × 4 = 32", "X : 6 = 12", "y - 35 = 46". */
export const findVar = (t) => (String(t).match(/(^|[^A-Za-zÀ-ỹ])([xXyY])(?![A-Za-zÀ-ỹ])/) || [])[2] || null;

/** Đáp án của ô □ trong "3 × □ = 12" (hoặc biến x): thử lần lượt. */
export function solveBox(item, hole = '□') {
  const [l, r] = item.split('=');
  for (let x = 0; x <= 10000; x++) {
    if (evalExpr(l.split(hole).join(x)) === evalExpr(r.split(hole).join(x))) return x;
  }
  return null;
}

export function compareAnswer(item) {
  const [l, r] = item.split(/□|…/);
  const a = evalExpr(l), b = evalExpr(r);
  return a > b ? '>' : a < b ? '<' : '=';
}

/** Một phép chia "a ÷ b" / "a : b" có dư: { q, r }, còn lại null. */
export function remDivision(t) {
  const m = String(t).replace(/\s+/g, '').match(/^(\d+)[÷:](\d+)$/);
  if (!m) return null;
  const a = +m[1], b = +m[2];
  return a % b ? { q: Math.floor(a / b), r: a % b } : null;
}

/** Hai số và dấu của "48 × 6" để đặt tính dọc, hoặc null. */
export function columnParts(t) {
  const m = String(t).replace(/\s+/g, '').match(/^(\d+)([+−\-×÷:])(\d+)$/);
  if (!m) return null;
  const op = m[2] === '-' ? '−' : m[2] === ':' ? '÷' : m[2];
  return { a: m[1], op, b: m[3] };
}

const OP_N = { '-': '−', '÷': ':', '*': '×', 'x': '×' };
/**
 * Các dòng biến đổi của "x × 4 = 32" như vở: x = 32 : 4, x = 8.
 * Trả { lhs: vế có x, rhs: giá trị vế kia, pre: vế kia là phép tính (phải tính trước), inv: [số, dấu, số], comm }
 * hoặc null nếu không phải dạng "a dấu x = …" / "x dấu b = …".
 */
export function findxSteps(t, v, x) {
  const [l, r] = String(t).split('=').map(s => s.trim());
  if (r == null || !l.includes(v)) return null;
  const m = l.replace(/\s+/g, '').match(new RegExp(`^(?:(\\d+)([+−\\-×÷:*])${v}|${v}([+−\\-×÷:*])(\\d+))$`));
  if (!m) return null;
  const c = evalExpr(r);
  if (!Number.isInteger(c)) return null;
  const pre = !/^\d+$/.test(r.replace(/\s+/g, ''));
  const left = m[1] != null;
  const n = +(left ? m[1] : m[4]);
  const op = OP_N[left ? m[2] : m[3]] || (left ? m[2] : m[3]);
  // Số hạng = tổng − số hạng kia; số bị trừ = hiệu + số trừ; số trừ = số bị trừ − hiệu;
  // thừa số = tích : thừa số kia; số bị chia = thương × số chia; số chia = số bị chia : thương.
  const inv = op === '+' ? [c, '−', n]
    : op === '×' ? [c, ':', n]
      : op === '−' ? (left ? [n, '−', c] : [c, '+', n])
        : (left ? [n, ':', c] : [c, '×', n]);
  if (evalExpr(inv.join(' ')) !== x) return null;
  return { lhs: l, rhs: c, pre, inv, comm: inv[1] === '+' || inv[1] === '×' };
}

/** Chấm từng ô của một ý tìm x: dòng giữa nhận cả hai thứ tự khi là phép cộng / nhân. */
function gradeFindx(vals, n) {
  const ok = n.ans.map((r, i) => matchSlot(vals[i], r));
  ok[2] = matchSlot(OP_N[String(vals[2] ?? '').trim()] || vals[2], n.inv[1]);
  if (n.comm && ok[2] && !(ok[1] && ok[3]) && matchSlot(vals[1], n.inv[2]) && matchSlot(vals[3], n.inv[0])) ok[1] = ok[3] = true;
  return ok;
}

/** Các chỗ trống trong một dòng điền: □ (ô vuông) hoặc … (chỗ chấm). */
export const holes = (t) => (String(t).match(/□|…/g) || []).length;
export const splitHoles = (t) => String(t).split(/□|…/);

/**
 * Chuẩn hoá một ý thành { t, ans: [đáp án của từng ô], unit, rem, anyOrder }.
 * Ý dạng chuỗi được tính tự động; ý dạng object có `ans` thì dùng đáp án ghi sẵn.
 */
export function normItem(type, it) {
  const o = typeof it === 'string' ? { t: it } : { ...it };
  const given = o.ans !== undefined ? (Array.isArray(o.ans) ? o.ans : [o.ans]) : null;
  if (type === 'calc') {
    const rem = given ? null : remDivision(o.t);
    if (rem) return { ...o, ans: [rem.q, rem.r], rem: true };
    return { ...o, ans: given || [evalExpr(o.t)] };
  }
  if (type === 'fill') return { ...o, ans: given || [solveBox(o.t.replace(/…/g, '□'))] };
  if (type === 'findx') {
    const v = findVar(o.t);
    const x = given ? given[0] : solveBox(o.t.replace(new RegExp(`(^|[^A-Za-zÀ-ỹ])${v}(?![A-Za-zÀ-ỹ])`), `$1□`));
    const st = findxSteps(o.t, v, x);
    if (!st) return { ...o, v, ans: given || [x] };
    // Ô: [x, số thứ nhất, dấu, số thứ hai] và thêm [vế phải] nếu vế phải là một phép tính.
    return { ...o, v, ...st, ans: [x, st.inv[0], st.inv[1], st.inv[2], ...(st.pre ? [st.rhs] : [])] };
  }
  if (type === 'compare') return { ...o, ans: given || [compareAnswer(o.t)] };
  return { ...o, ans: given || [] };
}

/** Một câu bảng có thể gồm nhiều bảng (ý a, b): `items: [{ prompt, head, rows, ans, transpose }]`. */
export const tablesOf = (q) => q.items || [q];

/** Các loại câu có ô điền (mỗi ý / hàng / sơ đồ chuẩn hoá thành { t, ans }). */
export const NORM_TYPES = new Set(['calc', 'fill', 'findx', 'compare', 'table', 'chain']);

/**
 * Chuẩn hoá cả câu thành danh sách ý { t, ans }.
 * - table: mỗi hàng dữ liệu là một ý, ô trống '…', `ans[i]` là đáp án các ô trống của hàng i.
 * - chain: sơ đồ mũi tên { start, steps: [': 5', '× 9'] }, đáp án tự tính lần lượt.
 */
export function normQuestion(q) {
  if (q.type === 'table') return tablesOf(q).flatMap(tb => tb.rows.map((r, i) => ({ t: r.join(' '), cells: r, ans: tb.ans?.[i] ?? [] })));
  if (q.type === 'chain') {
    return q.items.map(c => {
      let v = c.start;
      return { ...c, t: c.steps.map(() => '□').join(' '), ans: c.steps.map(s => (v = evalExpr(`${v} ${s}`))) };
    });
  }
  return q.items.map(it => normItem(q.type, it));
}

/** Số ô học sinh phải điền của một ý đã chuẩn hoá. */
export function itemSlots(type, n) {
  if (type === 'calc') return n.rem ? 2 : 1;
  if (type === 'findx') return n.inv ? (n.pre ? 5 : 4) : 1;
  return Math.max(1, holes(n.t));
}

const ONES = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
/** Cách đọc số 0–1000 (các cách viết đều đúng ngăn bằng |), dùng làm đáp án ô "Đọc số". */
export function readNumber(n) {
  if (n === 1000) return 'Một nghìn|Một ngàn';
  const h = Math.floor(n / 100), t = Math.floor(n / 10) % 10, u = n % 10;
  const tail = (lin) => {
    if (t === 0) return u ? [`${lin} ${ONES[u]}`] : [''];
    const tens = t === 1 ? 'mười' : `${ONES[t]} mươi`;
    if (u === 0) return [tens];
    if (u === 5) return [`${tens} lăm`];
    if (u === 1 && t > 1) return [`${tens} mốt`, `${tens} một`];
    if (u === 4 && t > 1) return [`${tens} tư`, `${tens} bốn`];
    return [`${tens} ${ONES[u]}`];
  };
  const head = h ? `${ONES[h]} trăm` : '';
  const forms = h
    ? [...tail('linh'), ...(t === 0 && u ? tail('lẻ') : [])].map(s => `${head} ${s}`.trim())
    : tail('').map(s => s.trim() || 'không');
  return forms.map(s => s[0].toUpperCase() + s.slice(1)).join('|');
}

const norm = (v) => String(v ?? '').normalize('NFC').trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.]$/, '');
/** So một ô: đáp án số, chữ (nhiều cách viết ngăn bằng |), dấu. */
export function matchSlot(given, right) {
  if (typeof right === 'number') return String(given ?? '').trim() !== '' && Number(given) === right;
  return String(right).split('|').some(r => norm(r) === norm(given));
}

/** Đúng/sai từng ô của một ý: anyOrder thì đối chiếu như một tập hợp. */
export function gradeSlots(vals, n) {
  if (n.inv) return gradeFindx(vals, n);
  if (!n.anyOrder) return n.ans.map((r, i) => matchSlot(vals[i], r));
  const left = [...n.ans];
  return vals.map(v => {
    const k = left.findIndex(r => matchSlot(v, r));
    if (k < 0) return false;
    left.splice(k, 1);
    return true;
  });
}

/** Ô nhập chữ hay số: có đáp án không phải số thì cho gõ chữ. */
export const isTextSlot = (right) => typeof right !== 'number';
