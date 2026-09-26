/**
 * Đánh vần tiếng Việt cho sách "Làm quen chữ cái" (bé mầm non): tách một tiếng thành
 * âm đầu + vần + dấu thanh, và tạo câu đánh vần để bạn Thỏ đọc to, vd.
 *   "mì"  → mờ – i – mi – huyền – mì
 *   "tìa" → tờ – ia – tia – huyền – tìa
 *   "oi"  → o – i – oi
 * Cách đọc âm theo lối dạy ở mầm non (bờ, cờ, dờ…), như bảng chữ cái ở data3.js.
 */

// Dấu thanh (dạng tách NFD) → tên dấu.
export const TONE_MARKS = { '̀': 'huyền', '́': 'sắc', '̉': 'hỏi', '̃': 'ngã', '̣': 'nặng' };
export const TONE_LIST = ['', '̀', '́', '̉', '̃', '̣'];

// Âm đầu, dài trước ngắn sau để "ngh" không bị nhận là "ng".
const ONSETS = ['ngh', 'ng', 'gh', 'gi', 'ch', 'kh', 'nh', 'ph', 'qu', 'th', 'tr',
  'b', 'c', 'd', 'đ', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'x'];

const NAMES = {
  a: 'a', ă: 'á', â: 'ớ', e: 'e', ê: 'ê', i: 'i', o: 'o', ô: 'ô', ơ: 'ơ', u: 'u', ư: 'ư', y: 'i',
  b: 'bờ', c: 'cờ', d: 'dờ', đ: 'đờ', g: 'gờ', h: 'hờ', k: 'ca', l: 'lờ', m: 'mờ', n: 'nờ', p: 'pờ',
  q: 'quờ', r: 'rờ', s: 'sờ', t: 'tờ', v: 'vờ', x: 'xờ',
  ch: 'chờ', gh: 'gờ', gi: 'di', kh: 'khờ', ng: 'ngờ', ngh: 'ngờ', nh: 'nhờ', ph: 'phờ', qu: 'quờ', th: 'thờ', tr: 'trờ',
};

/** Cách đọc một âm / chữ ghép ("m" → "mờ", "gi" → "di"). */
export const soundName = (s) => NAMES[s] ?? s;

/** Dấu thanh của tiếng ('' = thanh ngang). */
export function toneOf(syl) {
  return [...syl.normalize('NFD')].find(ch => TONE_MARKS[ch]) || '';
}

/** Tiếng bỏ dấu thanh, giữ dấu phụ: "mũ" → "mu", "tửa" → "tưa". */
export function baseOf(syl) {
  return [...syl.normalize('NFD')].filter(ch => !TONE_MARKS[ch]).join('').normalize('NFC');
}

function splitBase(base) {
  const b = base.toLowerCase();
  let onset = ONSETS.find(o => b.startsWith(o)) || '';
  let rhyme = b.slice(onset.length);
  // "gi" + vần: âm đầu gi ("gia", "giữ"); riêng "gì" / "gỉ" là gờ + i.
  if (onset === 'gi' && !rhyme) { onset = 'g'; rhyme = 'i'; }
  // "qu" chỉ là âm đầu khi theo sau là nguyên âm.
  if (onset === 'qu' && !rhyme) { onset = 'q'; rhyme = 'u'; }
  return { onset, rhyme };
}

/** Tách tiếng: { onset, rhyme, tone, base } — rhyme không dấu thanh. */
export function splitSyllable(syl) {
  const base = baseOf(syl);
  return { ...splitBase(base), tone: toneOf(syl), base: base.toLowerCase() };
}

/** Các chữ của một vần, giữ chữ ghép cuối (ng, nh, ch): "oong" → o o ng. */
function rhymeLetters(rhyme) {
  const out = [];
  const chars = [...rhyme];
  for (let i = 0; i < chars.length; i++) {
    const two = chars[i] + (chars[i + 1] || '');
    if (['ng', 'nh', 'ch'].includes(two) && i + 2 >= chars.length) { out.push(two); i++; }
    else out.push(chars[i]);
  }
  return out;
}

/** Đánh vần một vần: "oi" → "o i oi" (vần một chữ thì chỉ đọc chữ đó). */
export function spellRhyme(rhyme) {
  const letters = rhymeLetters(rhyme);
  return letters.length > 1 ? `${letters.map(soundName).join(' ')} ${rhyme}` : soundName(rhyme);
}

/** Câu đánh vần của một tiếng, các phần cách nhau bằng dấu phẩy cho máy đọc ngắt nhịp. */
export function spellOf(syl) {
  const s = syl.toLowerCase();
  const { onset, rhyme, tone, base } = splitSyllable(s);
  const parts = onset ? [soundName(onset), rhyme, base] : [base];
  if (tone) parts.push(TONE_MARKS[tone], s);
  return parts.join(', ');
}

/** Tách câu / cụm từ thành các tiếng (bỏ dấu câu). */
export const syllablesOf = (text) => (text.toLowerCase().match(/[\p{L}]+/gu) || []);
