/**
 * Làm quen chữ cái — Tiền tiểu học (trang 1–2 của sách).
 * Nguồn: docs/pre_1/Lam_quen_bang_chu_cai.pdf.
 *   Trang 1: bảng 29 chữ cái · Trang 2: 11 chữ ghép và 5 dấu thanh.
 * Sách in nhầm chữ "u" ở ô thứ 12 của bảng chữ cái (chỗ của chữ "i"); app dùng đúng thứ tự a → y.
 *
 * Dạng lượt chơi (engine.js):
 *   chart  — bảng chữ: chạm từng chữ để nghe đọc
 *   letter — tô chữ bằng ngón tay theo nét (letters.js)
 *   find   — nghe bạn Thỏ đọc, chạm đúng chữ
 * Tên đọc là âm (bờ, cờ…) như cách dạy ở mầm non.
 */

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

export const BOOK3 = {
  key: 'pre3',
  title: 'Làm quen chữ cái',
  subtitle: 'Tiền tiểu học · Bảng chữ cái, chữ ghép, dấu thanh',
  note: 'Nguồn: Làm quen với bảng chữ cái (trang 1–2).',
  stations: STATIONS,
  parts: [
    { num: 1, title: 'Làm quen với bảng chữ cái' },
    { num: 2, title: 'Làm quen với chữ ghép · Nhận diện các dấu thanh' },
  ],
};
