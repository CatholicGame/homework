/**
 * Làm quen chữ cái — Tiền tiểu học. Nguồn: docs/pre_1/Lam_quen_bang_chu_cai.pdf.
 *   Trang 1: bảng 29 chữ cái · Trang 2: 11 chữ ghép và 5 dấu thanh.
 *   Trang 3–78: Bài 1–105 học âm, học vần (nội dung ở abc/lessons.js, mỗi bài một trạm — lessonStation).
 * Sách in nhầm chữ "u" ở ô thứ 12 của bảng chữ cái (chỗ của chữ "i"); app dùng đúng thứ tự a → y.
 *
 * Dạng lượt chơi (engine.js):
 *   chart  — bảng chữ: chạm từng chữ để nghe đọc
 *   letter — tô chữ bằng ngón tay theo nét (letters.js)
 *   find   — nghe bạn Thỏ đọc, chạm đúng chữ
 *   spell / hear / build / words / sort / read — học đọc từ Bài 1 (play3.js)
 * Tên đọc là âm (bờ, cờ…) như cách dạy ở mầm non.
 */

import { LESSONS } from './abc/lessons.js';
import { splitSyllable, soundName } from './phonics.js';

// [chữ, cách đọc, màu trong sách]
const ALPHABET = [
  ['a', 'a', '#E11D48'], ['ă', 'á', '#1D6FB8'], ['â', 'ớ', '#FACC15'], ['b', 'bờ', '#4D7C0F'],
  ['c', 'cờ', '#1D6FB8'], ['d', 'dờ', '#84CC16'], ['đ', 'đờ', '#7E22CE'], ['e', 'e', '#E11D48'],
  ['ê', 'ê', '#FACC15'], ['g', 'gờ', '#C2410C'], ['h', 'hờ', '#4D7C0F'], ['i', 'i', '#1D6FB8'],
  ['k', 'ca', '#E11D48'], ['l', 'lờ', '#1D6FB8'], ['m', 'mờ', '#FACC15'], ['n', 'nờ', '#4D7C0F'],
  ['o', 'o', '#FACC15'], ['ô', 'ô', '#C2410C'], ['ơ', 'ơ', '#7E22CE'], ['p', 'pờ', '#E11D48'],
  ['q', 'quờ', '#1E40AF'], ['r', 'rờ', '#D6A461'], ['s', 'sờ', '#4D7C0F'], ['t', 'tờ', '#FACC15'],
  ['u', 'u', '#E11D48'], ['ư', 'ư', '#1D6FB8'], ['v', 'vờ', '#F59E0B'], ['x', 'xờ', '#9A3412'],
  ['y', 'i dài', '#FACC15'],
].map(([ch, name, color]) => ({ ch, name, color }));

const DIGRAPHS = [
  ['ch', 'chờ', '#E11D48'], ['kh', 'khờ', '#365314'], ['th', 'thờ', '#E11D48'], ['nh', 'nhờ', '#0EA5E9'],
  ['ph', 'phờ', '#6B21A8'], ['gh', 'gờ kép', '#0EA5E9'], ['ng', 'ngờ', '#F4A57A'], ['qu', 'quờ', '#FACC15'],
  ['tr', 'trờ', '#E11D48'], ['gi', 'di', '#365314'], ['ngh', 'ngờ kép', '#6B21A8'],
].map(([ch, name, color]) => ({ ch, name, color }));

const TONES = [
  ['à', 'dấu huyền', 'a huyền à'], ['á', 'dấu sắc', 'a sắc á'], ['ả', 'dấu hỏi', 'a hỏi ả'],
  ['ã', 'dấu ngã', 'a ngã ã'], ['ạ', 'dấu nặng', 'a nặng ạ'],
].map(([ch, tone, read], k) => ({ ch, name: tone, read, color: ['#E11D48', '#1D6FB8', '#16A34A', '#7C3AED', '#EA580C'][k] }));

const pickAll = (list) => list.map(c => ALPHABET.find(a => a.ch === c));
const pickDigraphs = (list) => list.map(c => DIGRAPHS.find(a => a.ch === c));

/** Trạm tô chữ: tô từng chữ rồi một lượt "tìm chữ". */
const letterStation = (id, icon, color, items, extra = {}) => ({
  id, icon, color,
  title: items.map(c => c.ch).join(' '),
  name: extra.name || `Tô chữ ${items.map(c => c.ch).join(', ')}`,
  rounds: [
    ...items.map(item => ({ type: 'letter', ...item, kind: extra.kind || 'chữ' })),
    { type: 'find', items, kind: extra.kind || 'chữ' },
  ],
  part: extra.part || 1,
});

const STATIONS = [
  { id: 'bang-chu-cai', icon: '🔤', color: '#0EA5E9', title: 'Bảng chữ cái', name: 'Chạm từng chữ để nghe đọc', part: 1,
    rounds: [{ type: 'chart', items: ALPHABET, kind: 'chữ' }] },
  letterStation('a-b', '🍎', '#E11D48', pickAll(['a', 'ă', 'â', 'b'])),
  letterStation('c-e', '🐱', '#1D6FB8', pickAll(['c', 'd', 'đ', 'e'])),
  letterStation('e-i', '🐔', '#C2410C', pickAll(['ê', 'g', 'h', 'i'])),
  letterStation('k-n', '🍬', '#4D7C0F', pickAll(['k', 'l', 'm', 'n'])),
  letterStation('o-p', '🐝', '#7E22CE', pickAll(['o', 'ô', 'ơ', 'p'])),
  letterStation('q-t', '🐢', '#1E40AF', pickAll(['q', 'r', 's', 't'])),
  letterStation('u-y', '🦄', '#F59E0B', pickAll(['u', 'ư', 'v', 'x', 'y'])),

  { id: 'chu-ghep', icon: '🧩', color: '#6B21A8', title: 'Chữ ghép', name: 'Chạm từng chữ ghép để nghe đọc', part: 2,
    rounds: [{ type: 'chart', items: DIGRAPHS, kind: 'chữ ghép' }] },
  letterStation('ghep-1', '🍫', '#E11D48', pickDigraphs(['ch', 'kh', 'th', 'nh']), { part: 2, kind: 'chữ ghép', name: 'Tô chữ ghép ch, kh, th, nh' }),
  letterStation('ghep-2', '🐸', '#0EA5E9', pickDigraphs(['ph', 'gh', 'ng', 'qu']), { part: 2, kind: 'chữ ghép', name: 'Tô chữ ghép ph, gh, ng, qu' }),
  letterStation('ghep-3', '🚂', '#365314', pickDigraphs(['tr', 'gi', 'ngh']), { part: 2, kind: 'chữ ghép', name: 'Tô chữ ghép tr, gi, ngh' }),
  { ...letterStation('dau-thanh', '🎵', '#EA580C', TONES, { part: 2, kind: 'dấu', name: 'Nhận diện các dấu thanh' }), title: 'Dấu thanh' },
];

// ════════════════════════════════════════════════════════════════════════
// Bài 1–105: mỗi bài một trạm. Thứ tự lượt chơi theo cách dạy đọc:
//   tô chữ mới → đánh vần (nghe) → nghe chọn tiếng → ghép tiếng → đọc từ → tìm vần / nghe chọn từ
//   → đọc câu, đọc bài.
// ════════════════════════════════════════════════════════════════════════
const ICONS = ['🍎', '🐱', '🐔', '🍬', '🐝', '🐢', '🦄', '🐸', '🍉', '🦋', '🐟', '🌻', '🚗', '🎈', '🐘', '🦊', '🍓', '🐼', '⛵', '🌈'];
const COLORS = ['#E11D48', '#1D6FB8', '#16A34A', '#7C3AED', '#EA580C', '#0891B2', '#CA8A04', '#DB2777'];
const uniq = (a) => [...new Set(a)];
const sylsOf = (text) => (text.match(/[\p{L}]+/gu) || []).map(w => w.toLowerCase());
const colorOfLetter = (ch, fallback) => (ALPHABET.find(a => a.ch === ch) || DIGRAPHS.find(a => a.ch === ch))?.color || fallback;
const MAX_SPELL = 24;  // bảng đánh vần dài (Bài 14 có 7 hàng) thì chia làm nhiều lượt

/** Chia câu chuyện thành từng câu (bài thơ: từng dòng). */
function storyLines(text) {
  return text.split(/\n+/).flatMap(par => par.split(/(?<=[.!?…])\s+/)).map(t => t.trim()).filter(Boolean);
}

/** Các hàng đánh vần, chia lượt sao cho mỗi lượt không quá MAX_SPELL tiếng. */
function spellRounds(rows, hl) {
  const groups = [];
  let cur = [];
  const size = (list) => list.reduce((n, r) => n + r.cells.length, 0);
  rows.forEach(r => {
    if (cur.length && size(cur) + r.cells.length > MAX_SPELL) { groups.push(cur); cur = []; }
    cur.push(r);
  });
  if (cur.length) groups.push(cur);
  return groups.map(list => {
    const cs = uniq(list.map(r => r.c));
    const c = cs.length === 1 && cs[0] ? cs[0] : undefined;
    return { type: 'spell', c, hl, rows: list.map(({ head, headSay, cells }) => ({ head, headSay, cells })) };
  });
}

function lessonStation(L, k, prev) {
  const color = COLORS[k % COLORS.length];
  const hl = L.letters;
  const words = L.words || [];
  const wordSyls = uniq(words.flatMap(sylsOf));
  const rounds = [];

  // 1. Tô chữ / vần mới.
  hl.forEach(ch => rounds.push({
    type: 'letter', ch, name: L.kind === 'am' ? soundName(ch) : ch, color: colorOfLetter(ch, color), kind: L.kind === 'am' ? 'chữ' : 'vần',
  }));

  // 2. Đánh vần: hàng dấu thanh + bảng ghép của sách; bài không có bảng thì lấy các tiếng trong phần từ.
  const rows = (L.toneRows || []).map(cells => ({ cells }));
  if (L.grid) rows.push(...L.grid.map(g => ({ c: g.c, head: g.v, cells: g.cells })));
  else if (L.kind !== 'review') {
    hl.forEach(ch => {
      const cells = wordSyls.filter(w => { const s = splitSyllable(w); return s.rhyme === ch || s.onset === ch; }).slice(0, 7);
      if (cells.length) rows.push({ head: ch, headSay: L.kind === 'am' ? soundName(ch) : undefined, cells });
    });
  }
  rounds.push(...spellRounds(rows, hl));
  const sylPool = uniq(rows.flatMap(r => r.cells));

  // 3. Nghe chọn tiếng (bài học âm).
  if (L.kind === 'am' && sylPool.length >= 4) rounds.push({ type: 'hear', items: sylPool, n: 4, kind: 'tiếng' });

  // 4. Ghép tiếng: âm đầu + vần + dấu (lựa chọn nhiễu lấy thêm ở mấy bài trước).
  const targets = uniq([...sylPool, ...wordSyls]).filter(w => {
    const s = splitSyllable(w);
    return s.onset && s.rhyme && (hl.includes(s.onset) || hl.includes(s.rhyme));
  });
  if (L.kind !== 'review' && targets.length >= 2) {
    rounds.push({ type: 'build', targets, n: 3, onsets: uniq(prev.flatMap(p => p.onsets)), rhymes: uniq(prev.flatMap(p => p.rhymes)) });
  }

  // 5. Đọc từ, rồi tìm từ có vần / nghe chọn từ.
  if (words.length) rounds.push({ type: 'words', items: words, hl });
  if (L.pairs) rounds.push({ type: 'words', items: L.pairs.flat(), hl });
  const rhymesInWords = hl.filter(v => wordSyls.some(w => splitSyllable(w).rhyme === v));
  if (L.kind === 'van' && rhymesInWords.length >= 2) rounds.push({ type: 'sort', items: words, want: rhymesInWords[0] });
  else if (words.length >= 4) rounds.push({ type: 'hear', items: words, n: 4, kind: 'từ' });

  // 6. Đọc câu, đọc bài.
  if (L.sentences?.length) rounds.push({ type: 'read', lines: L.sentences, hl });
  if (L.story) rounds.push({ type: 'read', title: L.story.title, lines: storyLines(L.story.text), hl });

  return {
    station: {
      id: `bai-${L.bai}`, icon: ICONS[k % ICONS.length], color, rounds,
      title: L.kind === 'review' ? `Bài ${L.bai} · Ôn tập` : `Bài ${L.bai} · ${hl.join(' ')}`,
      name: L.kind === 'review' ? `Bài ${L.bai}: Ôn tập` : `Bài ${L.bai}: ${L.title}`,
    },
    // để các bài sau lấy làm lựa chọn nhiễu khi ghép tiếng
    onsets: uniq(targets.map(t => splitSyllable(t).onset)),
    rhymes: uniq(targets.map(t => splitSyllable(t).rhyme)),
  };
}

/** Trạm ôn tập trang 36: nguyên âm, phụ âm, chính tả dễ lẫn. */
function chartStation(L) {
  const vowels = [...L.vowels, ...L.double];
  const cons = L.consonants.flatMap(c => c.split(/\s*[/-]\s*/));
  return {
    id: L.id, icon: '📚', color: '#0EA5E9', title: 'Ôn tập âm', name: L.title,
    rounds: [
      { type: 'words', items: vowels, says: vowels.map(soundName), kind: 'chữ' },
      { type: 'words', items: cons, says: cons.map(soundName), kind: 'chữ' },
      { type: 'words', items: L.pairs.flat() },
    ],
  };
}

// Chặng trên bản đồ: học âm 10 bài một chặng, học vần thì chặng kết thúc ở bài ôn tập.
const GROUPS = [[1, 10], [11, 20], [21, 30], [31, 34], [35, 40], [41, 46], [47, 54], [55, 62], [63, 70], [71, 78], [79, 86], [87, 93], [94, 105]];
const partOf = (n) => 3 + GROUPS.findIndex(([a, b]) => n >= a && n <= b);
let prevInfo = [];
LESSONS.forEach((L, k) => {
  if (L.kind === 'chart') { STATIONS.push({ ...chartStation(L), part: partOf(33) }); return; }
  const { station, onsets, rhymes } = lessonStation(L, k, prevInfo);
  prevInfo = [...prevInfo, { onsets, rhymes }].slice(-3);
  STATIONS.push({ ...station, part: partOf(L.bai) });
});
const LESSON_PARTS = GROUPS.map(([a, b], g) => {
  const inGroup = LESSONS.filter(L => L.bai >= a && L.bai <= b && L.kind !== 'review');
  const letters = inGroup.flatMap(L => L.letters);
  const kind = inGroup.every(L => L.kind === 'van') ? 'Học vần' : 'Học âm';
  return { num: 3 + g, title: `${kind} · Bài ${a}–${b}: ${letters.slice(0, 5).join(', ')}${letters.length > 5 ? '…' : ''}` };
});

export const BOOK3 = {
  key: 'pre3',
  title: 'Làm quen chữ cái',
  subtitle: 'Tiền tiểu học · Chữ cái, đánh vần, học vần',
  note: 'Nguồn: Làm quen với bảng chữ cái (Cô Thương).',
  stations: STATIONS,
  parts: [
    { num: 1, title: 'Làm quen với bảng chữ cái' },
    { num: 2, title: 'Làm quen với chữ ghép · Nhận diện các dấu thanh' },
    ...LESSON_PARTS,
  ],
};
