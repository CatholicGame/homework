// So khớp câu tiếng Anh của bé (src/games/englishReading.js), không phụ thuộc DOM để node kiểm được (scripts/check-english-speak.mjs).
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ── So khớp câu trả lời ─────────────────────────────────────────────────────
const NUM = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const numWord = (n) => (n <= 20 ? NUM[n] : TENS[Math.floor(n / 10)] + (n % 10 ? ` ${NUM[n % 10]}` : ''));
const IS_SHORT = /\b(it|he|she|that|what|where|who|there|here|how|when|why|this)'s\b/g;
/** Câu trả lời / câu hỏi: không phân biệt hoa thường, bỏ dấu câu, mở dạng rút gọn (don't = do not), số 8 = eight. */
export function norm(s) {
  return ` ${String(s || '').toLowerCase().replace(/[’‘`]/g, "'")} `
    .replace(/\bcan't\b/g, 'can not').replace(/\bcannot\b/g, 'can not').replace(/\bwon't\b/g, 'will not').replace(/\bshan't\b/g, 'shall not')
    .replace(/n't\b/g, ' not').replace(/'re\b/g, ' are').replace(/\bi'm\b/g, 'i am').replace(/'ll\b/g, ' will').replace(/'ve\b/g, ' have')
    .replace(IS_SHORT, '$1 is').replace(/\blet's\b/g, 'let us')
    .replace(/\b(\d{1,2})\b/g, (m, d) => numWord(Number(d)))
    .replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
}
const MIN_WORDS = { text: 2, me: 3, retell: 8 };
/**
 * Chấm một lượt nói: need = nhóm từ khoá ('a|b' = a hoặc b, có thể là cụm), min = số nhóm phải có (mặc định đủ cả),
 * minWords = số từ tối thiểu. Tìm trong cả các cách nghe khác (alts) vì máy hay nghe nhầm giọng trẻ.
 * @returns {{ ok, words, minWords, missing: string[], marked: string }} marked = chữ nghe được, từ khoá in đậm
 */
export function speakCheck(p, text, alts = []) {
  // Nói thì không cần phân biệt: I'd = I would, Lucky's = Lucky (máy nghe hay ghi kèm dấu nháy)
  const say = (t) => norm(t).replace(/'d\b/g, ' would').replace(/'s\b/g, '').replace(/'/g, '');
  const said = say(text), hay = [said, ...alts.map(say)].map((s) => ` ${s} `);
  const groups = p.need || [];
  const has = (g) => g.split('|').some((a) => hay.some((h) => h.includes(` ${norm(a)} `)));
  const missing = groups.filter((g) => !has(g));
  const words = said ? said.split(' ').length : 0;
  const minWords = p.minWords ?? MIN_WORDS[p.kind] ?? 2;
  const ok = groups.length - missing.length >= (p.min ?? groups.length) && words >= minWords;
  const keys = new Set(groups.flatMap((g) => g.split('|')).flatMap((a) => norm(a).split(' ')));
  const marked = said.split(' ').map((w, k) => {
    const t = esc(k === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w === 'i' ? 'I' : w);
    return keys.has(w) ? `<b>${t}</b>` : t;
  }).join(' ');
  return { ok, words, minWords, missing, marked };
}
