/**
 * Khuôn tạo thẻ kiến thức dùng chung cho các lớp (Đảo Trí Nhớ).
 *
 * Thẻ (fact): { id, faces: [ask, ans], key, sentence, confusers() }
 *   - face: { role: 'ask' | 'ans', kind: 'text' | 'roman' | 'frac' | 'part', text, say, ...thông số hình }
 *       ask = mặt "hỏi" (viền xanh: phép tính, hình, đơn vị lớn, số La Mã); ans = mặt "đáp" (viền cam: số, đơn vị nhỏ, phân số).
 *       say: câu đọc khi lật thẻ; null = không đọc (đọc ra là lộ đáp án, vd. số La Mã, hình tô).
 *   - key: khoá giá trị. Hai thẻ cùng bàn không được chung khoá (7 × 8 và 8 × 7 đều là 56; IX và 3 × 3 đều là 9).
 *   - sentence: câu vẹt nói khi ghép đúng ("7 nhân 8 bằng 56"); chữ in hoa (XIII) giọng đọc tự đánh vần (speakableVi).
 *   - confusers(): các mặt đáp hay nhầm [{ face, key }] (nút sai của Ôn nhanh, thẻ bẫy).
 */

/** Số viết như sách: tách lớp nghìn bằng dấu cách không ngắt dòng ("1 000"). */
export const num = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
/** Số để giọng đọc đọc (không có dấu cách, kẻo đọc rời "1, 0 0 0"). */
export const numSay = (n) => String(n);

const uniq = (list) => {
  const seen = new Set();
  return list.filter((c) => (seen.has(c.key) ? false : (seen.add(c.key), true)));
};

const numFace = (n) => ({ role: 'ans', kind: 'text', text: num(n), say: numSay(n) });
const numConfusers = (right, list) => uniq(list.filter((v) => v > 0 && v !== right).map((v) => ({ face: numFace(v), key: `n:${v}` })));

/** `n × k` ↔ tích. Nhầm hay gặp: tích của thừa số kề bên (7 × 8 → 48, 63, 49). */
export function mulFact(n, k) {
  const p = n * k;
  return {
    id: `${n}x${k}`,
    faces: [{ role: 'ask', kind: 'text', text: `${n} × ${k}`, say: `${n} nhân ${k}` }, numFace(p)],
    key: `n:${p}`,
    sentence: `${n} nhân ${k} bằng ${p}`,
    confusers: () => numConfusers(p, [n * (k - 1), n * (k + 1), (n + 1) * k, (n - 1) * k]),
  };
}

/** `n·k : n` ↔ `k`. Nhầm hay gặp: thương lệch 1, 2. */
export function divFact(n, k) {
  const a = n * k;
  return {
    id: `${a}d${n}`,
    faces: [{ role: 'ask', kind: 'text', text: `${a} : ${n}`, say: `${a} chia ${n}` }, numFace(k)],
    key: `n:${k}`,
    sentence: `${a} chia ${n} bằng ${k}`,
    confusers: () => numConfusers(k, [k - 1, k + 1, k + 2, k - 2]),
  };
}

// Đơn vị: hệ số đổi ra đơn vị nhỏ nhất của cùng loại (khoá giá trị) và cách đọc.
const UNIT = {
  mm: { dim: 'len', base: 1, say: 'mi-li-mét' },
  cm: { dim: 'len', base: 10, say: 'xăng-ti-mét' },
  dm: { dim: 'len', base: 100, say: 'đề-xi-mét' },
  m: { dim: 'len', base: 1000, say: 'mét' },
  g: { dim: 'mass', base: 1, say: 'gam' },
  kg: { dim: 'mass', base: 1000, say: 'ki-lô-gam' },
  ml: { dim: 'vol', base: 1, say: 'mi-li-lít' },
  l: { dim: 'vol', base: 1000, say: 'lít' },
};
const unitFace = (role, v, u) => ({ role, kind: 'text', text: `${num(v)} ${u}`, say: `${numSay(v)} ${UNIT[u].say}` });

/** `a ua` ↔ `b ub` (1 kg ↔ 1 000 g). Nhầm hay gặp: lệch một chữ số 0 (100 g, 10 000 g). */
export function unitFact(dim, a, ua, b, ub) {
  const base = a * UNIT[ua].base;
  if (UNIT[ua].dim !== dim || b * UNIT[ub].base !== base) throw new Error(`unitFact sai: ${a} ${ua} ≠ ${b} ${ub}`);
  return {
    id: `${a}${ua}-${ub}`,
    faces: [unitFace('ask', a, ua), unitFace('ans', b, ub)],
    key: `${dim}:${base}`,
    sentence: `${numSay(a)} ${UNIT[ua].say} bằng ${numSay(b)} ${UNIT[ub].say}`,
    confusers: () => uniq([b / 10, b * 10, b * 100, b / 100]
      .filter((v) => Number.isInteger(v) && v > 0 && v !== b && v < 1e5)
      .map((v) => ({ face: unitFace('ans', v, ub), key: `${dim}:${v * UNIT[ub].base}` }))),
  };
}

const ROMAN = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
export function toRoman(n) {
  let s = '';
  for (const [v, r] of ROMAN) while (n >= v) { s += r; n -= v; }
  return s;
}

/** Số La Mã ↔ số. Nhầm hay gặp: đọc ngược chữ đứng trước (IX → 11, IV → 6), lệch 1. */
export function romanFact(n) {
  const r = toRoman(n);
  const flipped = /IV|IX/.test(r) ? n + 2 : null; // IV đọc thành VI, IX thành XI, XIV thành XVI…
  return {
    id: `rm${n}`,
    faces: [{ role: 'ask', kind: 'roman', text: r, say: null }, numFace(n)],
    key: `n:${n}`,
    sentence: `Số La Mã ${r} là số ${n}`,
    confusers: () => numConfusers(n, [flipped, n + 1, n - 1, n + 10, n - 10].filter((v) => v && v <= 30)),
  };
}

const PART_WORD = { 2: 'hai', 3: 'ba', 4: 'bốn', 5: 'năm', 6: 'sáu', 7: 'bảy', 8: 'tám', 9: 'chín', 10: 'mười' };
const fracFace = (d) => ({ role: 'ans', kind: 'frac', n: 1, d, text: `1/${d}`, say: `một phần ${PART_WORD[d]}` });

/** Hình chia d phần bằng nhau, tô 1 phần ↔ phân số 1/d (viết đứng như sách). */
export function partFact(d) {
  return {
    id: `part${d}`,
    // Hình: tròn (cắt hình quạt) hoặc chữ nhật (cắt dải), xen kẽ để không chỉ nhớ một kiểu hình.
    faces: [{ role: 'ask', kind: 'part', d, shape: d % 2 ? 'rect' : 'circle', text: `hình chia ${d} phần, tô 1 phần`, say: null }, fracFace(d)],
    key: `f:1/${d}`,
    sentence: `Đã tô màu một phần ${PART_WORD[d]} hình`,
    confusers: () => [d - 1, d + 1, d + 2].filter((v) => v >= 2 && v <= 10).map((v) => ({ face: fracFace(v), key: `f:1/${v}` })),
  };
}
