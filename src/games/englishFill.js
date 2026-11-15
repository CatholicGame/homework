// ✏️ Điền từ (src/games/englishReading.js): lấy câu trong bài đọc có từ vựng, bỏ từ đó thành chỗ trống.
// Không phụ thuộc DOM để node kiểm được (scripts/check-english-fill.mjs).

const rx = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const CONS = /[bcdfghjklmnpqrstvwxz]$/;

/** Các dạng của một từ đơn: số nhiều, quá khứ, -ing (bài viết "gets", "pets", "cooked", "swimming"). */
function forms(w) {
  const out = new Set([w, `${w}s`, `${w}es`, `${w}ed`, `${w}d`, `${w}ing`]);
  if (/[^aeiou]y$/.test(w)) { out.add(`${w.slice(0, -1)}ies`); out.add(`${w.slice(0, -1)}ied`); }
  if (/e$/.test(w)) out.add(`${w.slice(0, -1)}ing`);
  if (CONS.test(w) && /[aeiou][bdgmnprt]$/.test(w) && !/[aeiou]{2}.$/.test(w)) {
    const d = w + w.slice(-1);
    out.add(`${d}ed`); out.add(`${d}ing`);
  }
  if (/f$/.test(w)) out.add(`${w.slice(0, -1)}ves`);
  if (/fe$/.test(w)) out.add(`${w.slice(0, -2)}ves`);
  return out;
}

/** Biểu thức tìm một từ vựng trong bài: dạng gốc, dạng biến đổi, dạng bất quy tắc lấy từ bảng tra từ (base). */
function wordRe(word, gloss) {
  const w = word.toLowerCase().trim();
  const parts = w.split(/\s+/);
  const alts = new Set();
  const irregular = (base) => Object.entries(gloss?.words || {}).filter(([, g]) => g.base === base).map(([k]) => k);
  if (parts.length === 1) {
    forms(w).forEach((f) => alts.add(rx(f)));
    irregular(w).forEach((f) => alts.add(rx(f)));
  } else {
    // Cụm từ: đổi dạng từ đầu (get up → gets up / got up) hoặc từ cuối (oil lamp → oil lamps)
    const head = [...forms(parts[0]), ...irregular(parts[0])];
    const rest = parts.slice(1).map(rx).join('\\s+');
    head.forEach((f) => alts.add(`${rx(f)}\\s+${rest}`));
    const tail = [...forms(parts.at(-1))];
    const lead = parts.slice(0, -1).map(rx).join('\\s+');
    tail.forEach((f) => alts.add(`${lead}\\s+${rx(f)}`));
  }
  // dài trước để "oranges" không dừng ở "orange"
  const list = [...alts].sort((a, b) => b.length - a.length);
  return new RegExp(`(^|[^A-Za-z'’-])(${list.join('|')})(?![A-Za-z’-]|'[a-z]{2,})`, 'i');
}

/** Tách câu như phần Nghe (prefetch / sayEnSeq). */
export function sentencesOf(text) {
  return text.split(/\n{2,}/).flatMap((p) => p.match(/[^.!?]+(?:[.!?]+["”']?|$)\s*/g) || [p])
    .map((s) => s.replace(/\s+/g, ' ').trim()).filter(Boolean);
}

const wordsIn = (s) => s.split(' ').length;

/**
 * Câu điền từ của một bài: mỗi từ vựng có trong bài thành một chỗ trống ở một câu, xếp theo thứ tự trong bài.
 * Ưu tiên mỗi câu một chỗ trống; câu dài (từ 7 chữ) mới được hai chỗ trống khi từ đó không còn câu nào khác.
 * @returns {{ sentence, parts: (string | { answer, word, vi })[] }[]} answer = chữ đúng như trong bài (vd. "pets", "got up")
 */
export function fillItems(L, gloss) {
  const sents = sentencesOf(L.text);
  const cands = (L.vocab || []).map((v) => {
    const re = new RegExp(wordRe(v.word, gloss).source, 'gi');
    const hits = [];
    sents.forEach((s, i) => {
      const ms = [...s.matchAll(re)];
      if (!ms.length) return;
      const m = ms[0], at = m.index + m[1].length;
      // từ có hai lần trong một câu thì lần kia lộ đáp án: chỉ dùng khi không còn câu khác
      hits.push({ i, at, end: at + m[2].length, answer: m[2], once: ms.length === 1 });
    });
    return { v, hits };
  }).filter((c) => c.hits.length);
  const blanks = new Map(); // câu → [{ at, end, answer, word, vi }]
  const free = (h) => (blanks.get(h.i) || []).every((b) => h.end <= b.at || h.at >= b.end);
  const score = (h) => {
    const n = (blanks.get(h.i) || []).length, w = wordsIn(sents[h.i]);
    if (n >= 2 || (n === 1 && w < 7) || !free(h)) return -1;
    return (n ? 0 : 100) + (h.once ? 20 : 0) + (w >= 4 ? 10 : 0) - h.i * 0.01;
  };
  // từ ít câu chọn trước để không bị từ khác chiếm mất câu
  [...cands].sort((a, b) => a.hits.length - b.hits.length).forEach(({ v, hits }) => {
    const best = hits.map((h) => ({ h, s: score(h) })).filter((x) => x.s >= 0).sort((a, b) => b.s - a.s)[0];
    if (!best) return;
    const { h } = best;
    if (!blanks.has(h.i)) blanks.set(h.i, []);
    blanks.get(h.i).push({ at: h.at, end: h.end, answer: h.answer, word: v.word, vi: v.vi });
  });
  return [...blanks.keys()].sort((a, b) => a - b).map((i) => {
    const s = sents[i], parts = [];
    let pos = 0;
    blanks.get(i).sort((a, b) => a.at - b.at).forEach((b) => {
      if (b.at > pos) parts.push(s.slice(pos, b.at));
      parts.push({ answer: b.answer, word: b.word, vi: b.vi });
      pos = b.end;
    });
    if (pos < s.length) parts.push(s.slice(pos));
    return { sentence: s, parts };
  });
}

/** Bé điền đúng chưa: không phân biệt hoa thường, bỏ khoảng trắng thừa, ’ = '. */
export const fillMatch = (input, answer) => {
  const n = (s) => String(s || '').toLowerCase().replace(/[’‘`]/g, "'").replace(/\s+/g, ' ').trim();
  return n(input) === n(answer);
};
