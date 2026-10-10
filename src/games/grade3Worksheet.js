/**
 * Lớp 3: Luyện Đề. Hai bộ: Phiếu bài tập (theo bài học) và Đề ôn tập giữa học kì I (65 đề).
 * Mỗi phiếu / đề là một tờ giấy như bài làm thật (bỏ phần trường, phòng thi, mã phách…):
 * đầu phiếu, ô ĐIỂM + ô nhận xét của thầy cô, các Phần.
 * Bài toán có lời văn giải theo 4 bước: hiểu đề → ghép câu lời giải (mảnh xáo trộn) → tự nhập phép tính → đáp số.
 * Nộp bài mới chấm (một lần): điểm và lời phê viết tay màu đỏ, dấu ✓ / ✗ cạnh từng ý.
 * Định dạng: docs/lop_3/phieu-bai-tap.md, docs/lop_3/de-on-tap-giua-ki.md.
 * Dữ liệu: src/data/grade3Worksheets/*.js, src/data/grade3Midterm/de*.js.
 */

import { scopedKey, getCurrentUser } from '../engine/auth.js';
import { getProfile } from '../engine/profile.js';
import { awardStars, recordWrong, earnedFor, getEarnedKeys } from '../engine/stars.js';
import { flyOne } from './grade3Games/fly.js';
import { say } from './preschool/fx.js';
import { UNIT_INFO } from '../data/knowledgeUnits.js';
import { bookOf } from '../data/knowledgeMap.js';
import { normQuestion, tablesOf, NORM_TYPES, itemSlots, gradeSlots, isTextSlot, isWordsSlot, columnParts, holes } from './worksheetCore.js';

// bai01.js, bai01b.js… (cùng số bài, nhiều phiếu: thêm chữ cái), de01.js… de65.js. Nạp khi mở thư mục.
const SHEETS = import.meta.glob('../data/grade3Worksheets/bai*.js');
const MIDTERM = import.meta.glob('../data/grade3Midterm/de*.js');
const loader = (mods) => {
  let cache = null;
  return () => (cache ||= Promise.all(Object.keys(mods).sort().map(k => mods[k]().then(m => m.default))));
};
const loadSheets = loader(SHEETS);
const loadMidterm = loader(MIDTERM);

// Chưa đăng nhập (khách dùng thử): mỗi bộ chỉ làm được FREE_SHEETS phiếu / đề đầu, còn lại khoá.
const FREE_SHEETS = 2;
const lockedAt = (i) => !getCurrentUser() && i >= FREE_SHEETS;

// Một bộ đề: id, tên, thẻ thư mục, dòng phụ đầu tờ đề (sub), nạp đề (load), id đề thuộc bộ (owns).
// Kiểm tra theo lộ trình (docs/kiem-tra-lo-trinh.md) thêm: starPrefix (khoá sao), noun, timed (dùng sheet.time),
// speak (nút 🔊 đọc đề, lớp 1), big (chữ to), route (thẻ ghi "Sau Bài …", cờ ▶ Làm tiếp, dải Ôn lại sau khi chấm).
// Đề ôn tổng hợp: 38 câu phần Toán của Ôn Luyện Đề (grade3Exam.js) chia thành 8 đề ngắn (7 đề 5 câu, 1 đề 3 câu).
// Mở bằng màn câu hỏi của grade3Exam (từng câu, gợi ý, sao exam:de-1:math:<câu>), không phải tờ giấy.
const REVIEW_SIZES = [5, 5, 5, 5, 5, 5, 5, 3];
const REVIEW_SETS = REVIEW_SIZES.map((n, i) => {
  const from = REVIEW_SIZES.slice(0, i).reduce((a, b) => a + b, 0);
  const keys = Array.from({ length: n }, (_, k) => `exam:de-1:math:${from + k}`);
  return { id: `on-${i + 1}`, short: `Đề ${i + 1}`, desc: `${n} câu ôn tổng hợp`, from, to: from + n, keys };
});
const reviewSolved = (s) => s.keys.filter(k => earnedFor(k) > 0).length;

const COLLECTIONS = [
  {
    id: 'phieu', icon: '🗒️', name: 'Phiếu bài tập', desc: 'Luyện theo từng bài học', unit: 'phiếu',
    sub: () => 'Môn: Toán | Lớp 3 | Thời gian: 45 phút',
    count: Object.keys(SHEETS).length, owns: (id) => /^bai-\d+/.test(id), load: loadSheets,
  },
  {
    id: 'giuaki', icon: '📝', name: 'Đề ôn tập giữa học kì I', desc: 'Mỗi đề làm trong 40 phút', unit: 'đề',
    sub: () => 'Ôn tập giữa học kì I | Môn: Toán | Lớp 3 | Thời gian: 45 phút',
    count: Object.keys(MIDTERM).length, owns: (id) => /^de-\d+$/.test(id), load: loadMidterm,
  },
  {
    id: 'ontonghop', icon: '🧩', name: 'Đề ôn tổng hợp', desc: 'Đề ngắn, ôn các dạng toán của lớp 3', unit: 'đề',
    count: REVIEW_SETS.length, owns: (id) => /^on-\d+$/.test(id), load: () => Promise.resolve(REVIEW_SETS),
    // Đã làm = đề có mọi câu đã đúng (có sao); thẻ đề ghi số câu đúng thay cho điểm.
    done: () => REVIEW_SETS.filter(s => reviewSolved(s) === s.keys.length).length,
    score: (s) => { const n = reviewSolved(s); return n ? `Đúng ${n}/${s.keys.length}` : null; },
    open: (app, s, back) => import('./grade3Exam.js').then(m => m.render(app, back, { range: { from: s.from, to: s.to, title: `Đề ôn tổng hợp: ${s.short}` } })),
  },
];

// Kiểm tra theo lộ trình (docs/kiem-tra-lo-trinh.md): bốn nhóm, mỗi nhóm một thư mục. Lộ trình: src/data/routeTests/g{lớp}/plan.js.
const ROUTE_KINDS = [
  { kind: 'nh', icon: '⚡', name: 'Kiểm tra nhanh', desc: 'Học xong khoảng 3 bài thì làm một bài 5 câu',
    note: 'Bài kiểm tra ngắn sau mỗi vài Bài trong vở. Câu nào chưa đúng, cô chỉ Bài cần ôn lại.' },
  { kind: 'th', icon: '🧭', name: 'Kiểm tra tổng hợp', desc: 'Sau hai bài kiểm tra nhanh, ôn cả những bài trước',
    note: 'Ôn lại các Bài của hai bài kiểm tra nhanh và một ít Bài cũ hơn.' },
  { kind: 'gk', icon: '📝', name: 'Kiểm tra giữa học kì', desc: 'Ôn tất cả các bài từ đầu học kì',
    note: 'Bài kiểm tra giữa học kì: có câu của mọi phần đã học từ đầu học kì.' },
  { kind: 'ck', icon: '🏆', name: 'Kiểm tra cuối học kì', desc: 'Ôn tất cả các bài của học kì',
    note: 'Bài kiểm tra cuối học kì: có câu của mọi phần đã học trong học kì.' },
];
// Vite cần đường dẫn glob viết sẵn: mỗi lớp, mỗi nhóm một dòng.
const ROUTE_GLOBS = {
  1: {
    nh: import.meta.glob('../data/routeTests/g1/nh*.js'),
    th: import.meta.glob('../data/routeTests/g1/th*.js'),
    gk: import.meta.glob('../data/routeTests/g1/gk*.js'),
    ck: import.meta.glob('../data/routeTests/g1/ck*.js'),
  },
  2: {
    nh: import.meta.glob('../data/routeTests/g2/nh*.js'),
    th: import.meta.glob('../data/routeTests/g2/th*.js'),
    gk: import.meta.glob('../data/routeTests/g2/gk*.js'),
    ck: import.meta.glob('../data/routeTests/g2/ck*.js'),
  },
};
const routeCollections = (grade) => ROUTE_KINDS.map(k => {
  const mods = ROUTE_GLOBS[grade][k.kind];
  return {
    ...k, id: `route${grade}-${k.kind}`, unit: 'bài', noun: 'bài kiểm tra',
    sub: (s) => `Môn: Toán | Lớp ${grade} | Thời gian: ${s.time} phút`,
    count: Object.keys(mods).length, owns: (id) => id.startsWith(`l${grade}-${k.kind}-`), load: loader(mods),
    starPrefix: `route${grade}`, timed: true, route: true, ...(grade === 1 ? { speak: true, big: true } : {}),
  };
});

/** Luyện Đề của từng lớp: lớp 3 có các bộ trên, lớp 1, 2 có bốn thư mục Kiểm tra theo lộ trình. */
const CONFIGS = {
  3: { id: 'grade3-worksheet', collections: COLLECTIONS },
  1: { id: 'grade1-tests', collections: routeCollections(1) },
  2: { id: 'grade2-tests', collections: routeCollections(2) },
};

const STORE = 'g3ws-v1'; // dùng chung mọi lớp (id đề không trùng nhau)
const DEFAULT_MIN = 45; // phiếu / đề lớp 3 làm trong 45 phút; bộ `timed` dùng sheet.time
const OPS = ['+', '−', '×', ':'];
const CMP = ['>', '<', '='];
const TF = ['Đ', 'S'];
const LETTERS = 'abcdefgh';
const OPT_LETTERS = 'ABCDEFGH';
const FILL_TYPES = new Set(['calc', 'fill', 'findx', 'compare']);

const num = (v) => (String(v ?? '').trim() === '' ? NaN : Number(v));
const subs = (q) => q.items || [q];
const plain = (s) => String(s).replace(/<[^>]*>/g, '').replace(/\{(\d+)\/(\d+)\}/g, '$1/$2');

/** Lời đọc của một câu (nút 🔊): q.say, không có thì đọc lời đề. Dấu viết thành chữ để máy đọc đúng. */
function sayText(q) {
  const t = q.say || plain(q.prompt || q.text || '');
  return t.replace(/\s*<\s*/g, ' bé hơn ').replace(/\s*>\s*/g, ' lớn hơn ').replace(/\s*[−-]\s*/g, ' trừ ').replace(/\s*\+\s*/g, ' cộng ').replace(/…|□/g, ' mấy ');
}

/** Chữ trong đề: {1/6} → phân số chồng. */
function rich(s) {
  return String(s ?? '').replace(/\{(\d+)\/(\d+)\}/g, '<span class="ws-frac"><span>$1</span><span>$2</span></span>');
}

// Trộn mảnh câu lời giải cố định theo đề (mở lại vẫn cùng thứ tự).
function seededShuffle(arr, seedText) {
  let h = 2166136261;
  for (const c of seedText) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const rnd = () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  // Không để mảnh đúng thứ tự sẵn.
  if (out.join('|').startsWith(arr.join('|'))) out.push(out.shift());
  return out;
}

/** "A. Phần trắc nghiệm", "PHẦN II: TỰ LUẬN" → "trắc nghiệm", "tự luận". */
function partName(part) {
  return part.title
    .replace(/^\s*([A-Z]|[IVX]+)\s*[.:/)]\s*/, '')
    .replace(/^Phần\s*(\d+|[IVX]+)?\s*[.:/–-]?\s*/i, '')
    .split(/[:.]/)[0].trim().toLowerCase();
}

// ── phiếu: đánh số câu, khoá ─────────────────────────────────────────────────
export function indexSheet(sheet) {
  const list = [];
  // 'part': số câu bắt đầu lại ở mỗi Phần; 'continuous': đánh liên tục cả đề nhưng vẫn ghi "Bài 5:".
  const byPart = sheet.numbering === 'part' || sheet.numbering === 'continuous';
  let n = 0;
  sheet.parts.forEach((part, pi) => {
    if (sheet.numbering === 'part') n = 0;
    part.questions.forEach((q, qi) => {
      n++;
      const e = { id: `${pi}.${qi}`, n, pi, q, sheetId: sheet.id };
      if (byPart) {
        e.label = part.label ?? 'Câu';
        e.ref = `${(e.label || 'câu').toLowerCase()} ${n}${sheet.parts.length > 1 ? ` (${partName(part)})` : ''}`;
      }
      if (NORM_TYPES.has(q.type)) e.norm = normQuestion(q);
      if (q.type === 'word') {
        e.pool = seededShuffle([...q.sentence, ...(q.decoys || [])], q.text);
        e.unitPool = seededShuffle(q.units, q.text + 'u');
      }
      list.push(e);
    });
  });
  return list;
}

const starKey = (col, sheet, pi) => `${col.starPrefix || 'worksheet'}:${sheet.id}:p${pi}`;
const nounOf = (col) => col.noun || (col.id === 'giuaki' ? 'đề' : 'phiếu');

// ── lưu ──────────────────────────────────────────────────────────────────────
function loadStore() {
  try { return JSON.parse(localStorage.getItem(scopedKey(STORE))) || {}; } catch { return {}; }
}
function saveStore(d) {
  try { localStorage.setItem(scopedKey(STORE), JSON.stringify(d)); } catch { /* storage unavailable */ }
  window.dispatchEvent(new CustomEvent('tth:data-changed')); // → cloudSync.js
}

// ── chấm ─────────────────────────────────────────────────────────────────────
function emptyAnswer(e) {
  const { q } = e;
  if (q.type === 'word') return { step: 1, tiles: [], a: '', op: '', b: '', r: '', unit: '', ans: '', ansUnit: '' };
  if (q.type === 'relation') return [['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']];
  if (NORM_TYPES.has(q.type)) return e.norm.map(n => Array(itemSlots(q.type, n)).fill(''));
  if (q.type === 'pick') return subs(q).map(() => []);
  if (q.type === 'match') return q.left.map(() => '');
  if (q.type === 'mc') return subs(q).map(() => '');
  return q.items.map(() => ''); // tf, draw
}

/** Bản nháp cũ khác hình dạng (dữ liệu đề đã đổi) thì bỏ, làm lại câu đó. */
function restoreAnswer(e, saved) {
  const fresh = emptyAnswer(e);
  if (saved == null) return fresh;
  if (e.q.type === 'word') return typeof saved === 'object' && !Array.isArray(saved) ? saved : fresh;
  if (!Array.isArray(saved) || saved.length !== fresh.length) return fresh;
  // Bản lưu cũ (trước khi có Luyện Đề): mỗi ý tính / điền / so sánh là một giá trị, nay là mảng các ô.
  if (FILL_TYPES.has(e.q.type)) saved = saved.map((v, i) => (!Array.isArray(v) && fresh[i].length === 1 ? [v] : v));
  const ok = fresh.every((f, i) => (Array.isArray(f)
    ? Array.isArray(saved[i]) && (e.q.type === 'pick' || saved[i].length === f.length)
    : !Array.isArray(saved[i])));
  return ok ? saved : fresh;
}

function isFilled(e, a) {
  const { q } = e;
  if (q.type === 'word') return (a.max || a.step) >= 5 && a.tiles.length > 0 && ['a', 'op', 'b', 'r', 'unit', 'ans', 'ansUnit'].every(k => a[k] !== '');
  if (q.type === 'pick') return a.every(p => p.length > 0);
  if (q.type === 'relation' || NORM_TYPES.has(q.type)) return a.every(row => row.every(v => v !== ''));
  return a.every(v => v !== '');
}

function relationInfo(numbers) {
  const s = [...numbers].sort((x, y) => x - y);
  const big = s[2], s1 = s[0], s2 = s[1];
  return {
    big, s1, s2,
    canon: [[s1, s2, big], [s2, s1, big], [big, s1, s2], [big, s2, s1]],
  };
}

/** Đáp án đúng của một ý để cô ghi bên cạnh ý sai. */
function fixText(type, n) {
  const first = (v) => String(v).split('|')[0];
  if (type === 'calc') return n.rem ? `${n.ans[0]} dư ${n.ans[1]}` : `${n.ans[0]}${n.unit ? ` ${n.unit}` : ''}`;
  if (type === 'findx') return n.inv ? `${n.v} = ${n.inv.join(' ')}, ${n.v} = ${n.ans[0]}` : `${n.v} = ${n.ans[0]}`;
  return n.ans.map(first).join(', ');
}

/** Chấm một câu: { score 0..1, items: [true/false…] hoặc { line1, line2, line3 }, fix: đáp án đúng để giáo viên ghi }. */
export function gradeQuestion(e, a) {
  const { q } = e;
  const done = (items, fix) => ({ score: items.filter(Boolean).length / items.length, items, fix });
  if (NORM_TYPES.has(q.type)) {
    return done(e.norm.map((n, i) => gradeSlots(a[i], n).every(Boolean)), e.norm.map(n => fixText(q.type, n)));
  }
  if (q.type === 'match') return done(q.left.map((_, i) => a[i] === q.ans[i]), q.ans.map(r => plain(q.right[r])));
  if (q.type === 'mc') return done(subs(q).map((s, i) => a[i] === s.ans), subs(q).map(s => OPT_LETTERS[s.ans]));
  if (q.type === 'tf') return done(q.items.map((_, i) => a[i] === q.ans[i]), q.ans);
  if (q.type === 'pick') return done(subs(q).map((s, i) => a[i].length === s.ans), subs(q).map(s => (s.shape ? `tô ${s.ans} phần` : `khoanh ${s.ans}`)));
  if (q.type === 'draw') return done(q.items.map((s, i) => num(a[i]) === s.len), q.items.map(s => `${s.len} cm`));
  if (q.type === 'relation') {
    const { big, s1, s2, canon } = relationInfo(q.numbers);
    const rows = a.map(row => row.map(num));
    const same = (x, y) => x.every((v, i) => v === y[i]);
    const items = rows.map((r, i) => {
      const ok = i < 2
        ? r[2] === big && ((r[0] === s1 && r[1] === s2) || (r[0] === s2 && r[1] === s1))
        : r[0] === big && ((r[1] === s1 && r[2] === s2) || (r[1] === s2 && r[2] === s1));
      const twin = i % 2 === 1 && s1 !== s2 && same(r, rows[i - 1]);
      return ok && !twin;
    });
    // Đáp án ghi cho hàng sai: dạng đúng còn lại mà hàng kia chưa dùng.
    const fix = rows.map((r, i) => {
      const pair = i < 2 ? [canon[0], canon[1]] : [canon[2], canon[3]];
      const other = rows[i % 2 === 0 ? i + 1 : i - 1];
      return same(pair[0], other) ? pair[1] : pair[0];
    });
    return done(items, fix);
  }
  // word
  const x = q.expr;
  const line1 = a.tiles.map(t => e.pool[t]).join(' ') === q.sentence.join(' ');
  const A = num(a.a), B = num(a.b);
  const pairOk = (A === x.a && B === x.b) || ((x.op === '×' || x.op === '+') && A === x.b && B === x.a);
  const line2 = pairOk && a.op === x.op && num(a.r) === x.result && a.unit === x.unit;
  const line3 = num(a.ans) === x.result && a.ansUnit === x.unit;
  return { score: (line1 ? 0.25 : 0) + (line2 ? 0.5 : 0) + (line3 ? 0.25 : 0), items: { line1, line2, line3 } };
}

function roundHalf(x) { return Math.round(x * 2) / 2; }
const fmtClock = (ms) => { const sec = Math.ceil(ms / 1000); return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`; };
const fmtDuration = (ms) => { const sec = Math.round(ms / 1000), m = Math.floor(sec / 60); return m ? `${m} phút ${String(sec % 60).padStart(2, '0')} giây` : `${sec} giây`; };
const fmtScore = (s) => String(s).replace('.', ',');

// Hai dòng ngắn, mỗi dòng vừa một dòng kẻ của ô nhận xét (không liệt kê từng câu).
function teacherComment(sheet, idx, grades, score) {
  const wrong = grades.filter(g => g.score < 1).length;
  const bai = reviewUnits(idx, grades);
  const fix = bai.length ? `Con ôn lại Bài ${bai.join(', ')}.` : wrong > 1 ? 'Con xem lại các câu chưa đúng.' : 'Con xem lại câu chưa đúng.';
  if (score >= 10) return ['Bài làm rất tốt!', 'Con trình bày sạch đẹp.'];
  if (score >= 8) return ['Con làm bài tốt.', fix];
  if (score >= 6.5) return ['Con nắm được bài.', 'Cần cẩn thận hơn khi làm bài.'];
  if (score >= 5) return ['Con cần ôn lại bài.', fix];
  if (bai.length) return ['Con cần ôn lại bài.', fix];
  return [`Con làm lại ${/^de-/.test(sheet.id) ? 'đề' : 'phiếu'} này cùng bố mẹ.`, 'Cô tin con sẽ làm được!'];
}

/** Các Bài (trường `bai` của câu) có câu làm chưa đúng, theo thứ tự Bài. */
function reviewUnits(idx, grades) {
  const set = new Set();
  idx.forEach((e, i) => { if (grades[i].score < 1 && e.q.bai != null) [].concat(e.q.bai).forEach(b => set.add(b)); });
  return [...set].sort((a, b) => a - b);
}

/** "1-8,10" → [1…8, 10]. */
function unitList(spec) {
  return String(spec).split(',').flatMap(part => {
    const [a, b = a] = part.trim().split('-').map(Number);
    return Array.from({ length: b - a + 1 }, (_, i) => a + i);
  });
}

/** Tỉ lệ số câu đã giải (sổ sao) trong các Bài của một chặng, tính như bản đồ kiến thức. */
function stageLearned(after, solved) {
  let done = 0, total = 0;
  for (const n of unitList(after.units)) {
    const k = `${after.book}:bai-${n}`;
    const t = UNIT_INFO[k]?.[0] || 0;
    total += t;
    done += Math.min(solved[k] || 0, t);
  }
  return total ? done / total : 0;
}

// ── màn hình ─────────────────────────────────────────────────────────────────
/**
 * `opts.open`: id phiếu / đề mở thẳng (dùng cho scripts/games-preview.html).
 * `opts.onSignIn`: khách bấm "Đăng nhập" trên phiếu bị khoá.
 */
export function render(app, onBack, opts = {}) {
  renderGrade(3, app, onBack, opts);
}

/** Luyện Đề lớp 1: chỉ có bộ Kiểm tra theo lộ trình (thẻ grade1-tests). */
export function grade1Render(app, onBack, opts = {}) {
  renderGrade(1, app, onBack, opts);
}

/** Luyện Đề lớp 2: bộ Kiểm tra theo lộ trình (thẻ grade2-tests). */
export function grade2Render(app, onBack, opts = {}) {
  renderGrade(2, app, onBack, opts);
}

/** `opts.navigate`: mở một sách ở một Bài (dải Ôn lại sau khi chấm bài kiểm tra theo lộ trình). */
function renderGrade(grade, app, onBack, opts = {}) {
  const cfg = CONFIGS[grade];
  const COLLECTIONS = cfg.collections;
  const single = COLLECTIONS.length === 1;
  injectStyles();
  if (opts.open) {
    const col = COLLECTIONS.find(c => c.owns(opts.open));
    col.load().then(list => {
      const sheet = list.find(s => s.id === opts.open);
      if (col.open) col.open(app, sheet, () => showList(col));
      else openSheet(sheet, col, () => showList(col));
    });
  } else if (single) showList(COLLECTIONS[0]);
  else showHub();

  function showHub() {
    const store = loadStore();
    app.innerHTML = `
      <div class="ws-desk">
        <div class="ws-list">
          <div class="ws-list-head">
            <button type="button" class="ws-back" id="ws-back">← Quay lại</button>
            <h1 class="ws-list-title">✏️ Luyện Đề</h1>
          </div>
          <div class="ws-hub">
            ${COLLECTIONS.map(c => {
              const done = c.done ? c.done() : Object.keys(store).filter(id => c.owns(id) && store[id].best != null).length;
              return `
                <button type="button" class="ws-folder" data-col="${c.id}">
                  <span class="ws-folder-tab"></span>
                  <span class="ws-folder-sheets"><span></span><span></span><span></span></span>
                  <span class="ws-folder-face">
                    <span class="ws-folder-icon">${c.icon}</span>
                    <span class="ws-folder-name">${c.name}</span>
                    <span class="ws-folder-desc">${c.desc}</span>
                    <span class="ws-folder-meta">
                      <span class="ws-folder-count"><b>${c.count}</b> ${c.unit}</span>
                      <span class="ws-folder-done">Đã làm ${done}/${c.count}</span>
                    </span>
                    <span class="ws-folder-bar"><span style="width:${c.count ? (100 * done) / c.count : 0}%"></span></span>
                  </span>
                </button>`;
            }).join('')}
          </div>
        </div>
      </div>`;
    app.querySelector('#ws-back').onclick = onBack;
    app.querySelectorAll('.ws-folder').forEach(btn => {
      btn.onclick = () => showList(COLLECTIONS.find(c => c.id === btn.dataset.col));
    });
  }

  function showList(col) {
    app.innerHTML = `
      <div class="ws-desk">
        <div class="ws-list">
          <div class="ws-list-head">
            <button type="button" class="ws-back" id="ws-back">← ${single ? 'Quay lại' : 'Luyện Đề'}</button>
            <h1 class="ws-list-title">${col.icon} ${col.name}</h1>
          </div>
          ${col.note ? `<p class="ws-list-note">${col.note}</p>` : ''}
          <div class="ws-list-grid${col.count > 6 ? ' ws-list-many' : ''}" id="ws-grid"></div>
        </div>
      </div>`;
    app.querySelector('#ws-back').onclick = single ? onBack : showHub;
    window.scrollTo(0, 0);
    col.load().then(list => {
      const grid = app.querySelector('#ws-grid');
      if (!grid) return;
      const store = loadStore();
      // Cờ ▶ Làm tiếp: chặng đầu tiên đã giải ≥ 70% số câu trong vở mà chưa có lần làm nào được từ 8 điểm.
      let nextId = null;
      if (col.route) {
        const solved = {};
        for (const key of getEarnedKeys()) {
          const [b, u] = key.split(':');
          if (u) solved[`${b}:${u}`] = (solved[`${b}:${u}`] || 0) + 1;
        }
        nextId = list.find(s => s.after && stageLearned(s.after, solved) >= 0.7 && !((store[s.id]?.best ?? 0) >= 8))?.id || null;
      }
      grid.innerHTML = list.map((s, i) => {
        if (col.open && !lockedAt(i)) {
          const score = col.score(s);
          return `
          <button type="button" class="ws-card" data-sheet="${s.id}">
            <span class="ws-card-paper">
              <span class="ws-card-short">${s.short}</span>
              <span class="ws-card-desc">${s.desc}</span>
              <span class="ws-card-lines"></span>
            </span>
            <span class="ws-card-score${score ? '' : ' ws-card-new'}">${score || 'Chưa làm'}</span>
            <span class="ws-card-go">${score ? 'Làm lại ➜' : 'Làm bài ➜'}</span>
          </button>`;
        }
        const rec = store[s.id];
        const best = rec?.best;
        const after = col.route && s.after ? `<span class="ws-card-after">Sau Bài ${s.after.units.replace(/-/g, '–')}</span>` : '';
        const flag = s.id === nextId ? '<span class="ws-card-next">▶ Làm tiếp</span>' : '';
        if (lockedAt(i)) return `
          <button type="button" class="ws-card ws-card-locked" data-sheet="${s.id}" data-locked="1">
            <span class="ws-card-paper">
              <span class="ws-card-short">${s.short}</span>
              <span class="ws-card-desc">${s.desc}</span>
              <span class="ws-card-lines"></span>
            </span>
            <span class="ws-card-score ws-card-lock">🔒</span>
            <span class="ws-card-go">Đăng nhập để làm</span>
          </button>`;
        return `
          <button type="button" class="ws-card${s.id === nextId ? ' ws-card-is-next' : ''}" data-sheet="${s.id}">
            ${flag}
            <span class="ws-card-paper">
              <span class="ws-card-short">${s.short}</span>
              ${after}
              <span class="ws-card-desc">${s.desc}</span>
              <span class="ws-card-lines"></span>
            </span>
            <span class="ws-card-score${best == null ? ' ws-card-new' : ''}">${best == null ? 'Chưa làm' : fmtScore(best)}</span>
            <span class="ws-card-go">${rec?.draft && (Object.keys(rec.draft).length || rec.elapsed) ? `Làm tiếp${rec.elapsed >= 60000 ? ` (${Math.round(rec.elapsed / 60000)} phút)` : ''} ➜` : best == null ? 'Làm bài ➜' : 'Xem bài ➜'}</span>
          </button>`;
      }).join('');
      grid.querySelectorAll('.ws-card').forEach(btn => {
        btn.onclick = () => (btn.dataset.locked
          ? showLockPopup(col)
          : col.open
            ? col.open(app, list.find(s => s.id === btn.dataset.sheet), () => showList(col))
            : openSheet(list.find(s => s.id === btn.dataset.sheet), col, () => showList(col)));
      });
    });
  }

  function showLockPopup(col) {
    const pop = document.createElement('div');
    pop.className = 'ws-cover';
    pop.innerHTML = `
      <div class="ws-cover-card">
        <div class="ws-cover-icon">🔒</div>
        <p class="ws-cover-title">Đăng nhập để làm tiếp</p>
        <p class="ws-cover-sub">Khi dùng thử, con làm được ${FREE_SHEETS} ${col.unit} đầu tiên.<br>Đăng nhập để mở tất cả ${col.count} ${col.unit}.</p>
        ${opts.onSignIn ? '<div class="ws-cover-btns"><button type="button" class="ws-start" data-act="signin">Đăng nhập</button></div>' : ''}
        <button type="button" class="ws-cover-back" data-act="close">Để sau</button>
      </div>`;
    pop.onclick = (ev) => {
      const act = ev.target.closest('[data-act]')?.dataset.act;
      if (act === 'signin') { pop.remove(); opts.onSignIn(); }
      else if (act === 'close' || ev.target === pop) pop.remove();
    };
    app.querySelector('.ws-desk').appendChild(pop);
  }

  /** opts.autostart: bỏ qua tấm che "Bắt đầu" (vừa chọn "Làm lại từ đầu" trên tấm che). */
  function openSheet(sheet, col, back, opts = {}) {
    const idx = indexSheet(sheet);
    const store = loadStore();
    const rec = store[sheet.id] || (store[sheet.id] = {});
    // Có bài đã chấm và chưa bấm "Làm lại": xem bài chấm. Ngược lại: làm (bản nháp lưu từng ô).
    const graded = rec.result && !rec.draft;
    if (!graded && !rec.draft) rec.draft = {};
    const answers = {};
    idx.forEach(e => { answers[e.id] = restoreAnswer(e, (graded ? rec.result.answers : rec.draft)[e.id]); });
    // Nhận xét tính lại khi mở, để bài chấm cũ cũng hiện lời nhận xét mới.
    const comment = graded ? teacherComment(sheet, idx, idx.map(e => gradeQuestion(e, answers[e.id])), rec.result.score) : [];
    const persist = () => { rec.draft = answers; saveStore(store); };

    const name = getProfile().name || getCurrentUser()?.name || '';
    const date = graded ? new Date(rec.result.at) : new Date();
    const dateText = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    const grades = graded ? idx.map(e => gradeQuestion(e, answers[e.id])) : null;
    const noun = nounOf(col);
    const limitMin = col.timed && sheet.time ? sheet.time : DEFAULT_MIN;
    const LIMIT_MS = limitMin * 60 * 1000;
    // Tấm che phần đề: đồng hồ chỉ chạy sau khi bấm Bắt đầu / Làm tiếp. Đang làm dở thì cho chọn làm tiếp hoặc làm lại.
    const doneCount = graded ? 0 : idx.filter(e => isFilled(e, answers[e.id])).length;
    const touched = !graded && (rec.elapsed > 0 || idx.some(e => JSON.stringify(answers[e.id]) !== JSON.stringify(emptyAnswer(e))));
    const coverHtml = graded || opts.autostart ? '' : `
      <div class="ws-cover" id="ws-cover">
        <div class="ws-cover-card">
          <div class="ws-cover-icon">${touched ? '📝' : '⏱️'}</div>
          ${touched
            ? `<p class="ws-cover-title">Con đang làm dở ${noun} này</p>
               <p class="ws-cover-sub">Đã làm <b>${doneCount}/${idx.length}</b> câu, đã dùng <b>${fmtDuration(rec.elapsed || 0)}</b>.<br>${(rec.elapsed || 0) < LIMIT_MS ? `Còn <b>${fmtClock(LIMIT_MS - (rec.elapsed || 0))}</b>.` : `Đã hết ${limitMin} phút, con vẫn làm tiếp được.`}</p>
               <div class="ws-cover-btns">
                 <button type="button" class="ws-start" data-act="resume">▶ Làm tiếp</button>
                 <button type="button" class="ws-start ws-start-alt" data-act="restart">🔄 Làm lại từ đầu</button>
               </div>`
            : `<p class="ws-cover-title">Thời gian làm bài: ${limitMin} phút</p>
               <p class="ws-cover-sub">Đồng hồ bắt đầu chạy khi con bấm nút.</p>
               <div class="ws-cover-btns"><button type="button" class="ws-start" data-act="start">▶ Bắt đầu làm bài</button></div>`}
          <button type="button" class="ws-cover-back" data-act="back">← Danh sách ${noun}</button>
        </div>
      </div>`;

    app.innerHTML = `
      <div class="ws-desk">
        <div class="ws-bar">
          <button type="button" class="ws-back" id="ws-close">← Danh sách ${noun}</button>
          <span class="ws-bar-timer" id="ws-timer"></span>
          <span class="ws-bar-count" id="ws-count"></span>
          <div class="ws-prog-row" id="ws-prog-row">
          <button type="button" class="ws-prog-arrow" id="ws-prog-prev" aria-label="Các câu trước">◀</button>
          <nav class="ws-prog" id="ws-prog" aria-label="Các câu">
            ${sheet.parts.map((part, pi) => `<span class="ws-prog-part">${sheet.numbering === 'part' && sheet.parts.length > 1 ? `<b class="ws-prog-tag" title="${partName(part)}">${partName(part).split(/\s+/).map(w => w[0]).join('').toUpperCase()}</b>` : ''}${idx.filter(e => e.pi === pi).map(e => {
              const sc = grades ? grades[idx.indexOf(e)].score : null;
              const cls = sc == null ? '' : sc === 1 ? ' ws-dot-ok' : sc === 0 ? ' ws-dot-bad' : ' ws-dot-half';
              return `<button type="button" class="ws-dot${cls}" data-q="${e.id}" title="${e.label != null ? `${e.label || 'Câu'} ${e.n}` : `Câu ${e.n}`}">${e.n}</button>`;
            }).join('')}</span>`).join('')}
          </nav>
          <button type="button" class="ws-prog-arrow" id="ws-prog-next" aria-label="Các câu sau">▶</button>
          </div>
        </div>
        <article class="ws-paper${col.big ? ' ws-big' : ''}${graded ? ' ws-graded' : ''}${coverHtml ? ' ws-locked' : ''}" data-vk-noscroll>
          <header class="ws-head">
            <h1 class="ws-title">${sheet.title.toUpperCase()}</h1>
            <div class="ws-sub">${col.sub(sheet)}</div>
            <div class="ws-info">
              <span>Họ và tên: <b class="ws-ink">${escapeHtml(name) || '……………………'}</b></span>
              <span>Ngày làm bài: <b class="ws-ink">${dateText}</b></span>
            </div>
          </header>
          <section class="ws-mark-row">
            <div class="ws-scorebox">
              <div class="ws-box-label">ĐIỂM</div>
              <div class="ws-score-area">${graded ? scoreHtml(rec.result.score) : ''}</div>
            </div>
            <div class="ws-commentbox">
              <div class="ws-box-label">Nhận xét của thầy cô:</div>
              <div class="ws-comment-lines">
                ${[0, 1].map(i => `<div class="ws-cline">${graded ? `<span class="ws-red ws-write" style="--d:${1.1 + i * 0.9}s">${comment[i] || ''}</span>` : ''}</div>`).join('')}
              </div>
            </div>
          </section>
          <div class="ws-body">
          ${sheet.parts.map((part, pi) => `
            <section class="ws-part">
              <h2 class="ws-part-title">${part.title}</h2>
              ${idx.filter(e => e.pi === pi).map(e => `<div class="ws-q${e.label != null ? ' ws-q-block' : ''}" data-q="${e.id}">${questionHtml(e)}</div>`).join('')}
            </section>`).join('')}
          <footer class="ws-foot">
            ${graded
              ? `${col.route ? reviewStripHtml() : ''}<button type="button" class="ws-submit" id="ws-redo">🔄 Làm lại ${noun}</button>`
              : '<button type="button" class="ws-submit" id="ws-submit" disabled>📮 Nộp bài</button><button type="button" class="ws-foot-note" id="ws-foot-note">&nbsp;</button>'}
          </footer>
          </div>
        </article>
        ${coverHtml}
      </div>`;

    app.querySelector('#ws-close').onclick = back;
    wireMatches(app);
    app.scrollTo?.(0, 0);
    window.scrollTo(0, 0);

    // Thanh tiến độ: mỗi câu một nút số; chạm → cuộn tới câu đó (dừng ngay dưới thanh dính).
    const desk = app.querySelector('.ws-desk');
    const bar = app.querySelector('.ws-bar');
    const prog = app.querySelector('#ws-prog');
    const qBox = (qid) => app.querySelector(`.ws-q[data-q="${qid}"]`);
    // Hộp cuộn thật: trong app là #app (global.css: html/body không cuộn), trong trang xem thử là window.
    const scrollBox = (() => {
      for (let el = desk.parentElement; el && el !== document.body; el = el.parentElement) {
        const oy = getComputedStyle(el).overflowY;
        if (oy === 'auto' || oy === 'scroll') return el;
      }
      return null;
    })();
    const scroller = scrollBox || window;
    const setBarH = () => desk.style.setProperty('--bar-h', `${bar.offsetHeight + 10}px`);
    setBarH();
    const jumpTo = (qid) => {
      const box = qBox(qid);
      if (!box) return;
      box.scrollIntoView({ behavior: 'smooth', block: 'start' });
      box.classList.remove('ws-flash'); void box.offsetWidth; box.classList.add('ws-flash');
    };
    prog.onclick = (ev) => { const d = ev.target.closest('.ws-dot'); if (d) jumpTo(d.dataset.q); };
    // Nhiều câu tràn hàng: hiện nút ◀ ▶ để dịch trái phải, mờ đi khi đã tới đầu / cuối.
    const progRow = app.querySelector('#ws-prog-row');
    const prevBtn = app.querySelector('#ws-prog-prev');
    const nextBtn = app.querySelector('#ws-prog-next');
    const syncArrows = () => {
      if (!progRow.isConnected) { window.removeEventListener('resize', syncArrows); return; }
      progRow.classList.toggle('ws-prog-over', prog.scrollWidth > prog.clientWidth + 1);
      prevBtn.disabled = prog.scrollLeft <= 1;
      nextBtn.disabled = prog.scrollLeft + prog.clientWidth >= prog.scrollWidth - 1;
    };
    const slide = (dir) => prog.scrollBy({ left: dir * prog.clientWidth * 0.8, behavior: 'smooth' });
    prevBtn.onclick = () => slide(-1);
    nextBtn.onclick = () => slide(1);
    prog.addEventListener('scroll', syncArrows, { passive: true });
    window.addEventListener('resize', syncArrows);
    requestAnimationFrame(syncArrows);
    syncArrows();
    // Câu đang xem: câu đầu tiên còn hiện dưới thanh dính.
    let raf = 0;
    const onScroll = () => {
      if (!desk.isConnected) { scroller.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); return; }
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setBarH();
        const top = bar.getBoundingClientRect().bottom + 4;
        const cur = idx.find(e => qBox(e.id).getBoundingClientRect().bottom > top + 40);
        prog.querySelectorAll('.ws-dot').forEach(d => {
          const on = d.dataset.q === cur?.id;
          if (on && !d.classList.contains('ws-dot-here')) d.scrollIntoView({ block: 'nearest', inline: 'nearest' });
          d.classList.toggle('ws-dot-here', on);
        });
      });
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    // 🔊 đọc đề (lớp 1) và nút Ôn lại một Bài (bài đã chấm).
    app.querySelector('.ws-paper').addEventListener('click', (ev) => {
      const sp = ev.target.closest('.ws-say');
      if (sp) { ev.stopPropagation(); say(sayText(idx.find(e => e.id === sp.dataset.q).q)); return; }
      const rv = ev.target.closest('button.ws-review-btn');
      if (rv && opts.navigate) opts.navigate(rv.dataset.card, { open: rv.dataset.open, back: cfg.id });
    }, true);

    if (graded) {
      app.querySelector('#ws-count').innerHTML = `Điểm cao nhất: <b class="ws-red">${fmtScore(rec.best)}</b>`;
      const used = rec.result.used;
      const timer = app.querySelector('#ws-timer');
      if (used != null) timer.textContent = `⏱ Làm trong ${Math.max(1, Math.round(used / 60000))} phút`; else timer.remove();
      app.querySelector('#ws-redo').onclick = () => {
        rec.draft = {};
        rec.elapsed = 0;
        saveStore(store);
        openSheet(sheet, col, back);
      };
      return;
    }

    // ── làm bài ──
    const paper = app.querySelector('.ws-paper');

    // Bàn phím số của app (#virtual-keyboard) che nửa dưới màn hình: đưa ô đang gõ vào giữa
    // khoảng nhìn thấy (dưới thanh dính, trên bàn phím). Cuối trang có thêm chỗ trống (CSS
    // body.vk-active .ws-desk) để những câu cuối vẫn cuộn lên được.
    const fitAboveKeypad = (inp) => {
      if (!inp?.isConnected) return;
      const pad = document.querySelector('.vk-panel.vk-visible'); // bàn phím số hoặc bàn phím chữ đọc số
      const vv = window.visualViewport;
      let bottom = vv ? vv.offsetTop + vv.height : window.innerHeight;
      if (pad && document.body.classList.contains('vk-active')) bottom = Math.min(bottom, window.innerHeight - pad.offsetHeight); // chiều cao thật, không đo lúc đang trượt lên
      const top = bar.getBoundingClientRect().bottom;
      const r = inp.getBoundingClientRect();
      // Ô đã nằm gọn trong khoảng nhìn thấy (chừa lề) thì để yên: bấm ◀ / ▶ giữa các ô gần nhau không làm trang nhảy.
      const margin = Math.min(24, (bottom - top) / 8);
      if (r.top >= top + margin && r.bottom <= bottom - margin) return;
      // Phải cuộn thì đưa ô lên khoảng một phần ba trên: các ô kế tiếp còn chỗ hiện mà không phải cuộn lại.
      const delta = r.top + r.height / 2 - (top + (bottom - top) * 0.35);
      scroller.scrollBy({ top: delta, behavior: 'smooth' });
    };
    // Bàn phím tự cuộn ô ra giữa màn hình khi focus và khi click (click tới sau một chút trên máy
    // cảm ứng), nên cuộn của mình chạy sau cả hai để đè lên. Nghe click ở pha capture vì ô chặn nổi bọt.
    let fitTimer = 0;
    const scheduleFit = (ev) => {
      const inp = ev.target.closest?.('.ws-in');
      if (!inp) return;
      clearTimeout(fitTimer);
      fitTimer = setTimeout(() => fitAboveKeypad(inp), 30);
    };
    paper.addEventListener('focusin', scheduleFit);
    paper.addEventListener('click', scheduleFit, true);
    // Bàn phím thật (ô gõ chữ) mở chậm hơn: đo lại khi vùng nhìn thấy đổi cỡ.
    const onViewport = () => {
      if (!paper.isConnected) { window.visualViewport?.removeEventListener('resize', onViewport); return; }
      const f = document.activeElement;
      if (f?.classList?.contains('ws-in') && paper.contains(f)) fitAboveKeypad(f);
    };
    window.visualViewport?.addEventListener('resize', onViewport);

    // Đồng hồ đếm ngược 45 phút: chỉ chạy khi tờ phiếu đang mở và trang đang hiện.
    // Rời phiếu / ẩn trang thì dừng, lưu số giây đã làm; mở lại chạy tiếp từ đó.
    const timerEl = app.querySelector('#ws-timer');
    rec.elapsed = rec.elapsed || 0;
    let running = !coverHtml;
    let last = Date.now();
    let lastSave = last;
    const showTimer = () => {
      const left = Math.max(0, LIMIT_MS - rec.elapsed);
      const sec = Math.ceil(left / 1000);
      timerEl.textContent = left > 0 ? `⏱ ${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}` : '⏱ Hết giờ';
      timerEl.classList.toggle('ws-timer-low', left > 0 && left <= 5 * 60 * 1000);
      timerEl.classList.toggle('ws-timer-up', left <= 0);
    };
    const tick = () => {
      const now = Date.now();
      if (!paper.isConnected) { stopTimer(); return; }
      if (running && document.visibilityState === 'visible') rec.elapsed += Math.min(now - last, 5000);
      last = now;
      showTimer();
      if (running && now - lastSave > 15000) { lastSave = now; saveStore(store); }
      if (rec.elapsed >= LIMIT_MS) refreshSubmit();
    };
    const onVis = () => {
      if (document.visibilityState === 'hidden') { tick(); saveStore(store); } else last = Date.now();
    };
    const timerId = setInterval(tick, 1000);
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('pagehide', onVis);
    function stopTimer() {
      clearInterval(timerId);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pagehide', onVis);
      saveStore(store);
    }
    app.querySelector('#ws-close').onclick = () => { tick(); stopTimer(); back(); };
    showTimer();

    // Tấm che: Bắt đầu / Làm tiếp → mở đề, đồng hồ chạy. Làm lại từ đầu: chạm hai lần (xoá bài đang làm).
    const cover = app.querySelector('#ws-cover');
    let restartArm = null;
    cover?.addEventListener('click', (ev) => {
      if (ev.target.closest('[data-act="back"]')) { stopTimer(); back(); return; }
      const b = ev.target.closest('.ws-start');
      if (!b) return;
      if (b.dataset.act === 'restart') {
        if (!restartArm) {
          b.textContent = '🔄 Chạm lần nữa để xoá bài cũ';
          b.classList.add('ws-armed');
          restartArm = setTimeout(() => { restartArm = null; b.textContent = '🔄 Làm lại từ đầu'; b.classList.remove('ws-armed'); }, 4000);
          return;
        }
        clearTimeout(restartArm);
        stopTimer();
        rec.draft = {};
        rec.elapsed = 0;
        saveStore(store);
        openSheet(sheet, col, back, { autostart: true });
        return;
      }
      running = true;
      last = Date.now();
      paper.classList.remove('ws-locked');
      cover.classList.add('ws-cover-out');
      setTimeout(() => cover.remove(), 450);
      saveStore(store);
    });
    paper.addEventListener('input', (ev) => {
      const inp = ev.target.closest('.ws-in');
      if (!inp) return;
      if (inp.classList.contains('ws-in-op')) {
        // Ô dấu: chỉ giữ một dấu + − × : (gõ phím thật: - * x / cũng được).
        const s = inp.value.replace(/-/g, '−').replace(/[*xX]/g, '×').replace(/\//g, ':');
        inp.value = [...s].filter(c => OPS.includes(c)).pop() || '';
      } else if (inp.dataset.text) inp.value = inp.value.slice(0, 60);
      else inp.value = inp.value.replace(/\D/g, '').slice(0, 5);
      setPath(inp.dataset.k, inp.value);
      persist();
      refreshWordGate(inp.dataset.k.split('|')[0]);
      refreshSubmit();
    });
    paper.addEventListener('click', (ev) => {
      const t = ev.target;
      const cmp = t.closest('.ws-cmp');
      if (cmp) { openPicker(cmp); return; }
      const opt = t.closest('.ws-opt');
      if (opt) { chooseOption(opt); return; }
      const pk = t.closest('.ws-pk');
      if (pk) { togglePick(pk); return; }
      const tick = t.closest('.ws-rtick');
      if (tick) { setLength(tick); return; }
      const mi = t.closest('.ws-mi');
      if (mi) { matchClick(mi); return; }
      const w = t.closest('.ws-word');
      if (w) wordClick(ev, w.closest('.ws-q').dataset.q);
    });

    function setPath(k, v) {
      const [qid, ...rest] = k.split('|');
      const a = answers[qid];
      if (rest.length === 1 && /^\d+$/.test(rest[0])) a[+rest[0]] = v;
      else if (rest.length === 2) a[+rest[0]][+rest[1]] = v;
      else a[rest[0]] = v;
    }

    function rerender(qid) {
      const box = paper.querySelector(`.ws-q[data-q="${qid}"]`);
      box.innerHTML = questionHtml(idx.find(e => e.id === qid));
      wireMatches(box);
      refreshSubmit();
      return box;
    }

    // Ô chọn dấu (> < =) hoặc Đ/S: chạm hiện nút to ngay cạnh ô (không đẩy chữ xung quanh).
    function openPicker(cmp) {
      document.querySelector('.ws-pick')?.remove();
      const choices = cmp.dataset.choices.split('|');
      const r = cmp.getBoundingClientRect();
      const pick = document.createElement('div');
      pick.className = 'ws-pick';
      pick.innerHTML = choices.map(s => `<button type="button" data-s="${escapeHtml(s)}"${s.length > 2 && !/^\{\d+\/\d+\}$/.test(s) ? ' class="ws-pick-wide"' : ''}>${rich(s)}</button>`).join('');
      document.body.appendChild(pick);
      const pw = pick.offsetWidth;
      pick.style.left = `${Math.max(8, Math.min(window.innerWidth - pw - 8, r.left + r.width / 2 - pw / 2))}px`;
      pick.style.top = `${r.bottom + 8}px`;
      const close = () => { pick.remove(); document.removeEventListener('pointerdown', outside, true); };
      const outside = (e) => { if (!pick.contains(e.target)) close(); };
      setTimeout(() => document.addEventListener('pointerdown', outside, true));
      pick.onclick = (e) => {
        const b = e.target.closest('button');
        if (!b) return;
        const from = b.getBoundingClientRect();
        close();
        flyOne(`<span class="ws-fly-sign">${rich(b.dataset.s)}</span>`, from, cmp.getBoundingClientRect(), {
          minMs: 300, maxMs: 500,
          onLand: () => {
            cmp.innerHTML = rich(b.dataset.s);
            cmp.classList.add('ws-cmp-set');
            setPath(cmp.dataset.k, b.dataset.s);
            persist();
            refreshSubmit();
          },
        });
      };
    }

    // Trắc nghiệm: chạm phương án → khoanh tròn chữ cái (chạm phương án khác thì khoanh lại).
    function chooseOption(opt) {
      const [qid, si] = opt.dataset.k.split('|');
      answers[qid][+si] = +opt.dataset.o;
      persist();
      opt.closest('.ws-opts').querySelectorAll('.ws-opt').forEach(o => o.classList.toggle('ws-opt-on', o === opt));
      refreshSubmit();
    }

    // Khoanh một phần mấy: chạm hình để khoanh / bỏ khoanh.
    function togglePick(pk) {
      const [qid, si] = pk.dataset.k.split('|');
      const list = answers[qid][+si];
      const i = +pk.dataset.i;
      const at = list.indexOf(i);
      if (at >= 0) list.splice(at, 1); else list.push(i);
      pk.classList.toggle('ws-pk-on', at < 0);
      const count = pk.closest('.ws-pickwrap').querySelector('.ws-pick-count');
      count.textContent = list.length ? `${pk.classList.contains('ws-shp') ? 'Đã tô' : 'Đã khoanh'} ${list.length}` : ' ';
      persist();
      refreshSubmit();
    }

    // Vẽ đoạn thẳng: chạm vạch cm trên thước, đoạn thẳng kéo dài tới vạch đó.
    function setLength(tick) {
      const [qid, si] = tick.dataset.k.split('|');
      answers[qid][+si] = String(tick.dataset.len);
      persist();
      const box = rerender(qid);
      box.querySelector(`.ws-draw[data-i="${si}"] .ws-seg`)?.classList.add('ws-seg-new');
    }

    // Nối: chạm một ô rồi chạm ô ở cột bên kia. Chạm lại cặp đã nối thì xoá đường nối.
    let matchSel = null;
    function matchClick(mi) {
      const m = mi.closest('.ws-match');
      const qid = m.dataset.q;
      const e = idx.find(x => x.id === qid);
      const a = answers[qid];
      const side = mi.dataset.side, i = +mi.dataset.i;
      const clear = () => { paper.querySelectorAll('.ws-mi-sel').forEach(b => b.classList.remove('ws-mi-sel')); matchSel = null; };
      if (!matchSel || matchSel.qid !== qid || matchSel.side === side) {
        const same = matchSel?.qid === qid && matchSel.side === side && matchSel.i === i;
        clear();
        if (!same) { matchSel = { qid, side, i }; mi.classList.add('ws-mi-sel'); }
        return;
      }
      const L = side === 'l' ? i : matchSel.i, R = side === 'r' ? i : matchSel.i;
      clear();
      if (a[L] === R) a[L] = '';
      else {
        if (!e.q.multi) a.forEach((v, j) => { if (v === R) a[j] = ''; }); // mỗi ô bên phải chỉ nối một đường
        a[L] = R;
      }
      persist();
      const box = rerender(qid);
      if (a[L] === R) box.querySelector('.ws-match').dataset.fresh = String(L);
    }

    // ── bài toán có lời văn ──
    const rerenderWord = rerender;

    function refreshWordGate(qid) {
      const e = idx.find(x => x.id === qid);
      if (e.q.type !== 'word') return;
      const a = answers[qid];
      const box = paper.querySelector(`.ws-q[data-q="${qid}"]`);
      const next = box.querySelector('.ws-next');
      if (next) next.disabled = !stepReady(a, a.step);
    }

    function wordClick(ev, qid) {
      const e = idx.find(x => x.id === qid);
      const a = answers[qid];
      const box = paper.querySelector(`.ws-q[data-q="${qid}"]`);
      const t = ev.target;

      const pill = t.closest('.ws-pill');
      if (pill && !pill.disabled) { a.step = +pill.dataset.step; persist(); rerenderWord(qid); return; }

      // Chạm vào dòng trên tờ bài giải: mở bước của dòng đó; chưa tới bước thì nhắc làm bước đang dở.
      const line = t.closest('.ws-l1, .ws-l2, .ws-l3');
      if (line && !t.closest('.ws-tile, .ws-in, .ws-next')) {
        const want = line.classList.contains('ws-l1') ? 2 : line.classList.contains('ws-l2') ? 3 : 4;
        if (want === a.step) return;
        if (want <= (a.max || 1)) { a.step = want; persist(); rerenderWord(qid); return; }
        const panel = box.querySelector(`.ws-panel-${a.step}`);
        if (!panel) return;
        const hint = panel.querySelector('.ws-hint');
        if (hint && !hint.classList.contains('ws-hint-ok')) { hint.style.visibility = 'visible'; hint.textContent = 'Con chọn phép tính ở đây trước đã!'; }
        const nudge = (a.step === 1 ? panel.querySelector('.ws-keys') : box.querySelector('.ws-next')) || panel;
        nudge.classList.remove('ws-shake'); void nudge.offsetWidth; nudge.classList.add('ws-shake');
        return;
      }

      // Bước 1: chọn phép tính (chỉ để hiểu đề, không tính điểm).
      const op1 = t.closest('.ws-op1');
      if (op1) {
        if (op1.dataset.op === e.q.expr.op) {
          op1.classList.add('ws-ok');
          box.querySelector('.ws-hint').classList.add('ws-hint-ok');
          box.querySelector('.ws-hint').textContent = `Đúng rồi! ${e.q.hint}`;
          setTimeout(() => { a.step = 2; a.max = Math.max(a.max || 1, 2); persist(); rerenderWord(qid); }, 1100);
        } else {
          op1.classList.remove('ws-shake'); void op1.offsetWidth; op1.classList.add('ws-shake', 'ws-no');
          const hint = box.querySelector('.ws-hint');
          hint.style.visibility = 'visible';
          hint.textContent = `Gợi ý: ${e.q.hint}`;
        }
        return;
      }

      // Bước 2: mảnh câu ở khay → dòng lời giải; chạm mảnh trên dòng để trả về.
      const tile = t.closest('.ws-tile');
      if (tile && a.step === 2) {
        const ti = +tile.dataset.t;
        const from = tile.getBoundingClientRect();
        const toPool = tile.dataset.where !== 'pool';
        if (toPool) a.tiles = a.tiles.filter(x => x !== ti); else a.tiles.push(ti);
        persist();
        const nb = rerenderWord(qid);
        const target = nb.querySelector(toPool ? `.ws-pool .ws-tile[data-t="${ti}"]` : `.ws-l1 .ws-tile[data-t="${ti}"]`);
        target.style.visibility = 'hidden';
        flyOne(`<span class="ws-tile ws-tile-fly">${e.pool[ti]}</span>`, from, target.getBoundingClientRect(), { minMs: 320, maxMs: 600, onLand: () => { target.style.visibility = ''; } });
        return;
      }

      // Bước 3: chọn đơn vị cho phép tính; bước 4: đơn vị đáp số.
      const unitBtn = t.closest('.ws-unitk');
      if (unitBtn) {
        const field = a.step === 3 ? 'unit' : 'ansUnit';
        flyTo(unitBtn, box.querySelector(a.step === 3 ? '.ws-unitbox' : '.ws-ansunitbox'), () => { a[field] = unitBtn.dataset.u; }, qid);
        return;
      }

      const next = t.closest('.ws-next');
      if (next && !next.disabled) { a.step++; a.max = Math.max(a.max || 1, a.step); persist(); rerenderWord(qid); }
    }

    function flyTo(btn, target, apply, qid) {
      flyOne(`<span class="ws-tile ws-tile-fly">${btn.textContent}</span>`, btn.getBoundingClientRect(), target.getBoundingClientRect(), {
        minMs: 320, maxMs: 600,
        onLand: () => {
          apply(); persist();
          const focus = document.activeElement?.dataset?.k;
          rerenderWord(qid);
          if (focus) paper.querySelector(`.ws-in[data-k="${focus}"]`)?.focus();
        },
      });
    }

    // ── nộp bài ──
    const submit = app.querySelector('#ws-submit');
    const note = app.querySelector('#ws-foot-note');
    let armTimer = null;
    const refOf = (e) => (e.label != null ? `${e.label || 'Câu'} ${e.n}${sheet.parts.length > 1 ? ` (${partName(sheet.parts[e.pi])})` : ''}` : `câu ${e.n}`);
    function refreshSubmit() {
      const left = idx.filter(e => !isFilled(e, answers[e.id]));
      submit.disabled = left.length > 0;
      app.querySelector('#ws-count').textContent = `Đã làm ${idx.length - left.length}/${idx.length} câu`;
      prog.querySelectorAll('.ws-dot').forEach(d => d.classList.toggle('ws-dot-done', !left.some(e => e.id === d.dataset.q)));
      const timeUp = rec.elapsed >= LIMIT_MS;
      note.innerHTML = timeUp && left.length
        ? `Đã hết ${limitMin} phút. Con làm nốt ${left.length} câu còn lại rồi nộp bài!`
        : left.length
        ? `Còn ${left.slice(0, 3).map(refOf).join(', ')}${left.length > 3 ? '…' : ''} chưa làm xong. <u>Chạm để tới câu đó</u>`
        : 'Con đã làm hết. Kiểm tra lại rồi nộp bài!';
      note.disabled = !left.length;
    }
    refreshSubmit();

    // Chạm dòng nhắc: cuộn tới câu chưa làm đầu tiên, câu đó nháy nhẹ.
    note.onclick = () => {
      const e = idx.find(x => !isFilled(x, answers[x.id]));
      if (e) jumpTo(e.id);
    };

    // Chạm lần 1: hỏi lại; chạm lần 2 trong 4 giây mới nộp.
    submit.onclick = () => {
      if (!armTimer) {
        submit.textContent = '📮 Chạm lần nữa để nộp';
        submit.classList.add('ws-armed');
        armTimer = setTimeout(() => { armTimer = null; submit.textContent = '📮 Nộp bài'; submit.classList.remove('ws-armed'); }, 4000);
        return;
      }
      clearTimeout(armTimer);
      gradeAndSave();
    };

    function gradeAndSave() {
      const gs = idx.map(e => gradeQuestion(e, answers[e.id]));
      const score = roundHalf((10 * gs.reduce((s, g) => s + g.score, 0)) / idx.length);
      stopTimer();
      rec.result = { answers, score, comment: teacherComment(sheet, idx, gs, score), at: Date.now(), used: rec.elapsed };
      rec.elapsed = 0;
      rec.best = Math.max(rec.best ?? 0, score);
      rec.attempts = (rec.attempts || 0) + 1;
      delete rec.draft;
      saveStore(store);
      // Sao: mỗi Phần làm đúng hết được sao của Phần đó; Phần còn sai bớt 1 sao (như "Kiểm tra" sai).
      let delay = 2600;
      sheet.parts.forEach((part, pi) => {
        const key = starKey(col, sheet, pi);
        if (earnedFor(key)) return;
        const allOk = idx.every((e, i) => e.pi !== pi || gs[i].score === 1);
        const q = { wordProblem: part.questions.some(x => x.type === 'word') };
        if (allOk) { setTimeout(() => awardStars(key, q), delay); delay += 900; } else recordWrong(key, q);
      });
      openSheet(sheet, col, back);
    }

    /** Dải Ôn lại: mỗi Bài có câu làm chưa đúng là một nút mở thẳng Bài đó trong vở. */
    function reviewStripHtml() {
      const bai = reviewUnits(idx, grades);
      if (!bai.length || !sheet.after) return '';
      const btns = bai.map(n => {
        const unit = `bai-${n}`;
        const b = bookOf(sheet.after.book, unit);
        const title = escapeHtml(UNIT_INFO[`${sheet.after.book}:${unit}`]?.[1] || '');
        return b && opts.navigate
          ? `<button type="button" class="ws-review-btn" data-card="${b.card}" data-open="${b.open}"><b>Bài ${n}</b> ${title}</button>`
          : `<span class="ws-review-btn"><b>Bài ${n}</b> ${title}</span>`;
      }).join('');
      return `<div class="ws-review"><p class="ws-review-title">📒 Ôn lại trong Vở bài tập:</p><div class="ws-review-list">${btns}</div></div>`;
    }

    // ── HTML từng câu (làm bài) ──
    function questionHtml(e) { return renderQuestion(e, answers[e.id], grades ? grades[idx.indexOf(e)] : null); }
  }

  // ── HTML dùng chung cho làm bài và bài đã chấm ─────────────────────────────
  // `g` = kết quả chấm (bài đã chấm) hoặc null (đang làm).
  function renderQuestion(e, a, g) {
    const { q, n } = e;
    const speak = COLLECTIONS.some(c => c.speak && c.owns(e.sheetId)) ? `<button type="button" class="ws-say" data-q="${e.id}" aria-label="Đọc đề">🔊</button>` : '';
    const head = e.label != null
      ? `<div class="ws-qhead">${speak}<b class="ws-qlabel">${e.label ? `${e.label} ${n}:` : `${n}.`}</b> ${q.type === 'word' ? '' : rich(q.prompt || '')}</div>`
      : `<div class="ws-qnum">${n}.</div>`;
    const prompt = e.label == null && q.prompt ? `<p class="ws-prompt">${rich(q.prompt)}</p>` : '';
    const fig = q.fig ? `<div class="ws-fig">${q.fig}</div>` : '';
    return `${head}<div class="ws-qbody">${prompt}${fig}${bodyHtml(e, a, g)}</div>`;
  }

  function bodyHtml(e, a, g) {
    const { q, id } = e;
    const mark = (ok, fix) => (ok ? '<span class="ws-tick">✓</span>' : `<span class="ws-cross">✗</span>${fix != null ? `<span class="ws-fix">${rich(fix)}</span>` : ''}`);
    const field = (k, v, cls = '', right) => {
      const text = right != null && isTextSlot(right);
      if (g) return `<span class="ws-filled ${cls}">${escapeHtml(v)}</span>`;
      const w = text ? ` style="width:${Math.min(14, Math.max(3.4, String(right).split('|')[0].length * 0.62))}em"` : '';
      return text
        ? `<input class="ws-in ws-in-text ${cls}" data-k="${id}|${k}" data-text="1"${isWordsSlot(right) ? ' data-vk-words="1"' : ''} value="${escapeHtml(v)}"${w} autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Chỗ trống">`
        : `<input class="ws-in ${cls}" data-k="${id}|${k}" value="${escapeHtml(v)}" inputmode="numeric" pattern="[0-9]*" autocomplete="off" aria-label="Ô trống">`;
    };
    const signBox = (k, v, choices, extra = '') => (g
      ? `<span class="ws-filled ws-cmp ws-cmp-set${extra}">${rich(v)}</span>`
      : `<button type="button" class="ws-cmp${v ? ' ws-cmp-set' : ''}${extra}" data-k="${id}|${k}" data-choices="${escapeHtml(choices.join('|'))}" aria-label="Chọn">${v ? rich(v) : '&nbsp;'}</button>`);
    // Ý đánh chữ a) b) như đề; marker: '1' (đề in 1. 2.) hoặc quá 8 ý thì đánh số.
    const letter = (i, total) => (total > 1 ? `<span class="ws-letter">${q.marker === '1' || total > LETTERS.length ? `${i + 1}.` : `${LETTERS[i]})`}</span>` : '');
    const stripLetter = (t) => String(t).replace(/^\s*[a-h][).]\s*/, '');

    if (FILL_TYPES.has(q.type)) {
      const maxLen = Math.max(...e.norm.map(nm => plain(nm.t).length + holes(nm.t) * 3 + (q.type === 'calc' ? 4 + (nm.unit ? 3 : 0) : 0) + (nm.inv ? 6 : 0)));
      // Ý dài: tối đa 2 cột (điện thoại 1 cột), rất dài: mỗi ý một dòng.
      const figs = e.norm.some(nm => nm.fig);
      const cls = figs ? `ws-items ws-items-fig ws-items-fig-${Math.min(3, e.norm.length)}` : q.col ? 'ws-items ws-items-col' : maxLen > 26 || (q.type === 'fill' && e.norm.length === 1) ? 'ws-items ws-items-1' : maxLen > 14 ? 'ws-items ws-items-2' : `ws-items ws-items-${Math.min(4, e.norm.length)}`;
      const showLetters = q.type !== 'fill' || e.norm.every(nm => plain(nm.t).length <= 30);
      return `
        <div class="${cls}">
          ${e.norm.map((nm, i) => {
            const v = a[i];
            const t = stripLetter(nm.t);
            let body;
            if (q.type === 'calc' && q.col && columnParts(t)) body = columnHtml(columnParts(t), nm, (j, cls2) => field(`${i}|${j}`, v[j], cls2, nm.ans[j]));
            else if (q.type === 'calc') {
              body = `<span>${rich(t)} =</span>${field(`${i}|0`, v[0], '', nm.ans[0])}${nm.rem ? `<span>dư</span>${field(`${i}|1`, v[1])}` : ''}${nm.unit ? `<span>${nm.unit}</span>` : ''}`;
            } else if (q.type === 'findx' && nm.inv) {
              // Như vở: đề, (tính vế phải), x = số dấu số, x = kết quả.
              const f = (j) => field(`${i}|${j}`, v[j] ?? '');
              body = `<span class="ws-fx"><span>${rich(t)}</span>${nm.pre ? `<span class="ws-fx-ans">${rich(nm.lhs)} = ${f(4)}</span>` : ''}`
                + `<span class="ws-fx-ans">${nm.v} = ${f(1)}${signBox(`${i}|2`, v[2] ?? '', OPS)}${f(3)}</span>`
                + `<span class="ws-fx-ans">${nm.v} = ${f(0)}</span></span>`;
            } else if (q.type === 'findx') {
              body = `<span class="ws-fx"><span>${rich(t)}</span><span class="ws-fx-ans">${nm.v} = ${field(`${i}|0`, v[0])}</span></span>`;
            } else if (q.type === 'compare') {
              const [l, r] = t.split(/□|…/);
              body = `<span>${rich(l)}</span>${signBox(`${i}|0`, v[0], CMP)}<span>${rich(r)}</span>`;
            } else {
              const pieces = t.split(/(□|…)/);
              let j = 0;
              body = pieces.map(p => {
                if (p === '□' || p === '…') {
                  const k = j++;
                  if (nm.choices && typeof nm.ans[k] === 'string') return signBox(`${i}|${k}`, v[k], nm.choices, ' ws-cmp-wide');
                  return field(`${i}|${k}`, v[k], p === '□' ? 'ws-in-box' : 'ws-in-dot', nm.ans[k]);
                }
                return p ? `<span>${rich(p)}</span>` : '';
              }).join('');
            }
            // Ý có hình (lớp 1: đếm rồi viết số): hình ở trên, dòng điền ở dưới.
            if (nm.fig) return `<div class="ws-item">${showLetters ? letter(i, e.norm.length) : ''}<div class="ws-ifig">${nm.fig}</div><div class="ws-iline">${body}${g ? mark(g.items[i], g.fix[i]) : ''}</div></div>`;
            return `<div class="ws-item">${showLetters ? letter(i, e.norm.length) : ''}${body}${g ? mark(g.items[i], g.fix[i]) : ''}</div>`;
          }).join('')}
        </div>`;
    }

    if (q.type === 'table') {
      // Ô trống '…' của hàng dữ liệu i lấy đáp án theo thứ tự trong hàng. transpose: mỗi hàng dữ liệu hiện thành một cột.
      // Nhiều bảng (ý a, b): các hàng nối tiếp nhau trong e.norm / a.
      let base = 0;
      const tables = tablesOf(q);
      return tables.map((tb, ti) => {
        const at = base;
        base += tb.rows.length;
        const cells = tb.rows.map((r, ri) => {
          const i = at + ri;
          let k = 0;
          return r.map(c => {
            if (c !== '…') return `<td>${rich(String(c))}</td>`;
            const kk = k++;
            return `<td class="ws-td-in">${field(`${i}|${kk}`, a[i][kk], 'ws-in-tbl', e.norm[i].ans[kk])}</td>`;
          });
        });
        const marks = g ? tb.rows.map((_, ri) => `<td class="ws-td-mark">${mark(g.items[at + ri], g.items[at + ri] ? null : g.fix[at + ri])}</td>`) : null;
        const head = tb.head || [];
        const body = tb.transpose
          ? head.map((h, r) => `<tr><th>${rich(h)}</th>${cells.map(row => row[r]).join('')}</tr>`).join('') + (marks ? `<tr class="ws-tr-mark"><th></th>${marks.join('')}</tr>` : '')
          : `${head.length ? `<tr>${head.map(h => `<th>${rich(h)}</th>`).join('')}${marks ? '<th></th>' : ''}</tr>` : ''}${cells.map((row, ri) => `<tr>${row.join('')}${marks ? marks[ri] : ''}</tr>`).join('')}`;
        const sub = q.items ? `<p class="ws-subprompt">${tables.length > 1 ? `${LETTERS[ti]}) ` : ''}${rich(tb.prompt || '')}</p>` : '';
        return `${sub}<div class="ws-tblwrap"><table class="ws-tbl${tb.transpose ? ' ws-tbl-t' : ''}">${body}</table></div>`;
      }).join('');
    }

    if (q.type === 'chain') {
      return `
        <div class="ws-chains">
          ${e.norm.map((c, i) => `
            <div class="ws-item ws-chain">${letter(i, e.norm.length)}
              <span class="ws-ch-start">${c.start}</span>
              ${c.steps.map((st, k) => `<span class="ws-ch-arrow"><span class="ws-ch-op">${rich(st)}</span></span>${field(`${i}|${k}`, a[i][k], 'ws-in-box', c.ans[k])}`).join('')}
              ${g ? mark(g.items[i], g.fix[i]) : ''}
            </div>`).join('')}
        </div>`;
    }

    if (q.type === 'match') {
      // Đường nối vẽ sau khi trang hiện (drawMatch đo vị trí từng ô).
      const side = (list, sd) => list.map((t, i) => `
        <button type="button" class="ws-mi" data-side="${sd}" data-i="${i}"${g ? ' tabindex="-1"' : ''}>
          <span class="ws-mt">${rich(t)}</span>
          ${g && sd === 'l' ? `<span class="ws-mmark">${mark(g.items[i], g.items[i] ? null : `→ ${g.fix[i]}`)}</span>` : ''}
        </button>`).join('');
      return `
        <div class="ws-match" data-q="${id}" data-links="${a.join(',')}" data-wrong="${g ? g.items.map(ok => (ok ? '' : 1)).join(',') : ''}">
          ${q.heads ? `<div class="ws-mhead">${rich(q.heads[0])}</div><div></div><div class="ws-mhead">${rich(q.heads[1])}</div>` : ''}
          <div class="ws-mcol">${side(q.left, 'l')}</div>
          <div class="ws-mmid"><svg class="ws-mlines" aria-hidden="true"></svg></div>
          <div class="ws-mcol">${side(q.right, 'r')}</div>
        </div>
        ${g ? '' : '<p class="ws-mhint">Chạm một ô bên trái rồi chạm ô bên phải để nối. Chạm lại hai ô đã nối để xoá đường nối.</p>'}`;
    }

    if (q.type === 'mc') {
      return subs(q).map((s, si) => {
        const opts = s.options;
        const lens = opts.map(o => (/<svg/.test(o) ? 0 : plain(o).length));
        const figs = opts.some(o => /<svg/.test(o));
        const cols = s.cols || (figs ? Math.min(4, opts.length) : Math.max(...lens) <= 12 ? Math.min(4, opts.length) : Math.max(...lens) <= 28 ? 2 : 1);
        return `
          ${q.items ? `<p class="ws-subprompt">${rich(s.prompt || '')}</p>${s.fig ? `<div class="ws-fig">${s.fig}</div>` : ''}` : ''}
          <div class="ws-mcrow">
            <div class="ws-opts${figs ? ' ws-opts-fig' : ''}" style="--cols:${cols}">
              ${opts.map((o, oi) => `
                <button type="button" class="ws-opt${a[si] === oi ? ' ws-opt-on' : ''}" data-k="${id}|${si}" data-o="${oi}"${g ? ' tabindex="-1"' : ''}>
                  <span class="ws-optl">${OPT_LETTERS[oi]}<svg class="ws-ring-ink" viewBox="0 0 40 40" aria-hidden="true"><path d="M30 7 C 18 1, 4 8, 5 21 C 6 33, 22 38, 32 31 C 40 24, 38 10, 26 6" /></svg></span>
                  <span class="ws-optt">${rich(o)}</span>
                </button>`).join('')}
            </div>
            ${g ? `<div class="ws-mcmark">${mark(g.items[si], g.fix[si])}</div>` : ''}
          </div>`;
      }).join('');
    }

    if (q.type === 'tf') {
      return `
        <div class="ws-items ${q.items.some(it => typeof it === 'object') ? 'ws-items-col' : q.items.some(it => plain(it).length > 22) ? 'ws-items-1' : 'ws-items-2'}">
          ${q.items.map((it, i) => {
            const body = typeof it === 'object' ? staticOpHtml(it) : `<span>${rich(stripLetter(it))}</span>`;
            return `<div class="ws-item ws-tf">${letter(i, q.items.length)}${body}${signBox(i, a[i], TF, ' ws-tfbox')}${g ? mark(g.items[i], g.fix[i]) : ''}</div>`;
          }).join('')}
        </div>`;
    }

    if (q.type === 'pick') {
      return subs(q).map((s, si) => {
        const list = a[si];
        return `
          <div class="ws-pickwrap">
            ${q.items ? `<p class="ws-subprompt">${rich(s.prompt || '')}</p>` : ''}
            ${s.shape ? shapeSvg(s, list, `${id}|${si}`) : `<div class="ws-pickgrid" style="--cols:${s.cols || 4}">
              ${Array.from({ length: s.count }, (_, i) => `<button type="button" class="ws-pk${list.includes(i) ? ' ws-pk-on' : ''}" data-k="${id}|${si}" data-i="${i}"${g ? ' tabindex="-1"' : ''} aria-label="Hình ${i + 1}">${ICONS[s.icon]}<svg class="ws-ring-ink" viewBox="0 0 40 40" aria-hidden="true"><path d="M30 6 C 16 0, 2 9, 4 22 C 6 35, 24 39, 34 30 C 41 22, 37 9, 25 5" /></svg></button>`).join('')}
            </div>`}
            <div class="ws-pick-foot"><span class="ws-pick-count">${!g && list.length ? `${s.shape ? 'Đã tô' : 'Đã khoanh'} ${list.length}` : ' '}</span>${g ? mark(g.items[si], g.fix[si]) : ''}</div>
          </div>`;
      }).join('');
    }

    if (q.type === 'draw') {
      return q.items.map((s, si) => `
        <div class="ws-draw" data-i="${si}">
          <p class="ws-subprompt">${rich(s.prompt || '')}</p>
          ${drawSvg(s, num(a[si]), `${id}|${si}`, !!g)}
          ${g ? `<div class="ws-pick-foot">${mark(g.items[si], g.fix[si])}</div>` : ''}
        </div>`).join('');
    }

    if (q.type === 'relation') {
      const signs = ['×', '×', ':', ':'];
      return `
        <div class="ws-rel">
          <p class="ws-rel-text">${q.text ? rich(q.text) : `Viết phép nhân và phép chia thích hợp với các số sau: <b>${q.numbers.join(', ')}</b>.`}</p>
          <div class="ws-rel-rows">
            ${a.map((row, r) => `
              <div class="ws-item">${field(`${r}|0`, row[0])}<span>${signs[r]}</span>${field(`${r}|1`, row[1])}<span>=</span>${field(`${r}|2`, row[2])}
                ${g ? mark(g.items[r], `${g.fix[r][0]} ${signs[r]} ${g.fix[r][1]} = ${g.fix[r][2]}`) : ''}</div>`).join('')}
          </div>
        </div>`;
    }

    // word
    const x = q.expr;
    const step = g ? 5 : a.step;
    const lineCls = (k) => (g ? '' : step < k ? ' ws-dim' : step === k ? ' ws-now' : '');
    const placed = a.tiles.map(t => `<button type="button" class="ws-tile ws-tile-on" data-t="${t}" data-where="line"${g || step !== 2 ? ' tabindex="-1"' : ''}>${e.pool[t]}</button>`).join('');
    const sentenceRight = q.sentence.join(' ');
    const lineMark = (k, fixText2) => (g ? (g.items[k] ? '<span class="ws-tick">✓</span>' : `<span class="ws-cross">✗</span><div class="ws-fixline">${fixText2}</div>`) : '');
    const ready = (s) => stepReady(a, s);
    // Nút sang bước sau nằm ngay cuối dòng đang viết.
    const NEXT_LABELS = { 2: 'Tiếp: viết phép tính', 3: 'Tiếp: viết đáp số', 4: 'Xong bài giải' };
    const nextBtn = (k) => (g || step !== k ? '' : `<button type="button" class="ws-next${k === 4 ? ' ws-next-done' : ''}"${ready(k) ? '' : ' disabled'} aria-label="${NEXT_LABELS[k]}" title="${NEXT_LABELS[k]}">${k === 4 ? '✓' : '➜'}</button>`);

    const panels = g ? '' : `
      <div class="ws-panels">
        <div class="ws-panel ws-panel-1${step === 1 ? ' ws-on' : ''}">
          <div class="ws-guide"><b>Bài cho biết:</b> ${rich(q.given.join(' '))}</div>
          <div class="ws-guide"><b>Bài hỏi:</b> ${rich(q.ask)}</div>
          <div class="ws-ask">Ta làm phép gì?</div>
          <div class="ws-keys">${OPS.map(o => `<button type="button" class="ws-key ws-op1" data-op="${o}">${o}</button>`).join('')}</div>
          <div class="ws-hint">&nbsp;</div>
        </div>
        <div class="ws-panel ws-panel-2${step === 2 ? ' ws-on' : ''}">
          <div class="ws-ask">Chạm các mảnh để ghép thành câu lời giải:</div>
          <div class="ws-pool">${e.pool.map((p, t) => `<button type="button" class="ws-tile" data-t="${t}" data-where="pool"${a.tiles.includes(t) ? ' style="visibility:hidden"' : ''}>${p}</button>`).join('')}</div>
        </div>
        <div class="ws-panel ws-panel-3${step === 3 ? ' ws-on' : ''}">
          <div class="ws-ask">Chạm từng ô trên dòng phép tính, gõ số và dấu bằng bàn phím. Rồi chọn đơn vị:</div>
          <div class="ws-keys ws-units">${e.unitPool.map(u => `<button type="button" class="ws-key ws-unitk${a.unit === u ? ' ws-key-on' : ''}" data-u="${u}">${u}</button>`).join('')}</div>
        </div>
        <div class="ws-panel ws-panel-4${step === 4 ? ' ws-on' : ''}">
          <div class="ws-ask">Gõ số vào dòng Đáp số rồi chọn đơn vị:</div>
          <div class="ws-keys ws-units">${e.unitPool.map(u => `<button type="button" class="ws-key ws-unitk${a.ansUnit === u ? ' ws-key-on' : ''}" data-u="${u}">${u}</button>`).join('')}</div>
        </div>
        <div class="ws-panel ws-panel-5${step === 5 ? ' ws-on' : ''}">
          <div class="ws-done">✓ Con đã viết xong bài giải.</div>
          <div class="ws-ask">Muốn sửa, chạm vào số bước ở trên.</div>
        </div>
      </div>`;

    const STEP_NAMES = ['Hiểu đề', 'Lời giải', 'Phép tính', 'Đáp số'];
    const reached = Math.max(step, a.max || 1);
    return `
      <div class="ws-word">
        <p class="ws-wtext">${rich(q.text)}</p>
        ${g ? '' : `<div class="ws-pills">${STEP_NAMES.map((s, i) => `<button type="button" class="ws-pill${step === i + 1 ? ' ws-pill-on' : ''}${step > i + 1 ? ' ws-pill-done' : ''}" data-step="${i + 1}"${i + 1 > reached ? ' disabled' : ''}><b>${i + 1}</b>${s}</button>`).join('')}</div>`}
        <div class="ws-solve">
          <div class="ws-oly">
            <div class="ws-line ws-l0">Bài giải</div>
            <div class="ws-line ws-l1${lineCls(2)}">${placed || (g ? '' : '<span class="ws-ph">(câu lời giải)</span>')}${lineMark('line1', sentenceRight)}${nextBtn(2)}</div>
            <div class="ws-line ws-l2${lineCls(3)}">
              ${field('a', a.a, 'ws-in-n')}
              ${g ? field('op', a.op, 'ws-in-op') : `<input class="ws-in ws-in-op" data-k="${id}|op" value="${escapeHtml(a.op)}" maxlength="1" inputmode="numeric" placeholder="?" autocomplete="off" aria-label="Dấu phép tính">`}
              ${field('b', a.b, 'ws-in-n')}<span>=</span>${field('r', a.r, 'ws-in-n')}
              <span class="ws-keep">(<span class="ws-slot ws-unitbox${a.unit ? '' : ' ws-empty'}">${a.unit || 'đơn vị'}</span>)</span>
              ${lineMark('line2', `${x.a} ${x.op} ${x.b} = ${x.result} (${x.unit})`)}${nextBtn(3)}
            </div>
            <div class="ws-line ws-l3${lineCls(4)}">
              <span class="ws-u">Đáp số:</span>${field('ans', a.ans, 'ws-in-n')}
              <span class="ws-keep"><span class="ws-slot ws-ansunitbox${a.ansUnit ? '' : ' ws-empty'}">${a.ansUnit || 'đơn vị'}</span>.</span>
              ${lineMark('line3', `Đáp số: ${x.result} ${x.unit}.`)}${nextBtn(4)}
            </div>
          </div>
          ${panels}
        </div>
      </div>`;
  }
}

// ── nối: vẽ đường nối theo vị trí thật của từng ô (đo lại mỗi khi khung đổi cỡ) ──
let matchRO = null;
function wireMatches(root) {
  const list = root.querySelectorAll('.ws-match');
  if (!list.length) return;
  if (!matchRO && typeof ResizeObserver !== 'undefined') matchRO = new ResizeObserver(es => es.forEach(en => drawMatch(en.target)));
  list.forEach(m => (matchRO ? matchRO.observe(m) : drawMatch(m)));
}

function drawMatch(m) {
  const svg = m.querySelector('.ws-mlines');
  if (!svg || !m.isConnected) return;
  const sr = svg.getBoundingClientRect();
  if (!sr.width || !sr.height) return;
  const ys = (sd) => [...m.querySelectorAll(`.ws-mi[data-side="${sd}"]`)].map(b => { const r = b.getBoundingClientRect(); return r.top + r.height / 2 - sr.top; });
  const L = ys('l'), R = ys('r');
  const links = m.dataset.links.split(',');
  const wrong = (m.dataset.wrong || '').split(',');
  const fresh = m.dataset.fresh;
  delete m.dataset.fresh;
  const w = sr.width, x1 = 7, x2 = w - 7;
  svg.setAttribute('viewBox', `0 0 ${w} ${sr.height}`);
  svg.innerHTML = links.map((v, i) => (v === '' ? '' : `<line class="ws-mline${wrong[i] ? ' ws-mline-bad' : ''}${String(i) === fresh ? ' ws-mline-new' : ''}" pathLength="1" x1="${x1}" y1="${L[i]}" x2="${x2}" y2="${R[+v]}" />`)).join('')
    + L.map((y, i) => `<circle class="ws-mdot${links[i] !== '' ? ' ws-mdot-on' : ''}" cx="${x1}" cy="${y}" r="5.5" />`).join('')
    + R.map((y, i) => `<circle class="ws-mdot${links.includes(String(i)) ? ' ws-mdot-on' : ''}" cx="${x2}" cy="${y}" r="5.5" />`).join('');
}

/** Hình chia phần để tô (circle: hình quạt; square-x: hình vuông chia bởi 2 đường chéo; rect: lưới cols × rows). */
function shapeSvg(s, list, key) {
  const part = (i, d) => `<path class="ws-pk ws-shp${list.includes(i) ? ' ws-pk-on' : ''}" data-k="${key}" data-i="${i}" d="${d}" />`;
  let parts = '', vb = '0 0 200 200';
  if (s.shape === 'circle') {
    const n = s.parts, c = 100, r = 92;
    const pt = (k) => { const ang = (2 * Math.PI * k) / n - Math.PI / 2; return `${(c + r * Math.cos(ang)).toFixed(2)} ${(c + r * Math.sin(ang)).toFixed(2)}`; };
    for (let i = 0; i < n; i++) parts += part(i, `M${c} ${c} L${pt(i)} A${r} ${r} 0 0 1 ${pt(i + 1)} Z`);
  } else if (s.shape === 'square-x') {
    const lo = 8, hi = 192, m = 100;
    [[`${lo} ${lo}`, `${hi} ${lo}`], [`${hi} ${lo}`, `${hi} ${hi}`], [`${hi} ${hi}`, `${lo} ${hi}`], [`${lo} ${hi}`, `${lo} ${lo}`]]
      .forEach(([p1, p2], i) => { parts += part(i, `M${m} ${m} L${p1} L${p2} Z`); });
  } else {
    const [cols, rows] = s.grid, u = 48;
    vb = `0 0 ${cols * u + 8} ${rows * u + 8}`;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) parts += part(r * cols + c, `M${4 + c * u} ${4 + r * u} h${u} v${u} h-${u} Z`);
  }
  return `<svg class="ws-shape" viewBox="${vb}" role="img" aria-label="Hình để tô">${parts}</svg>`;
}

function stepReady(a, s) {
  if (s === 2) return a.tiles.length > 0;
  if (s === 3) return ['a', 'op', 'b', 'r', 'unit'].every(k => a[k] !== '');
  if (s === 4) return a.ans !== '' && a.ansUnit !== '';
  return true;
}

/** Đặt tính dọc (cộng, trừ, nhân) hoặc chia cột; `slot(j, cls)` trả HTML ô nhập thứ j. */
function columnHtml(p, nm, slot) {
  if (p.op === '÷') {
    return `
      <span class="ws-ld">
        <span class="ws-ld-a">${p.a}</span><span class="ws-ld-b">${p.b}</span>
        <span class="ws-ld-work">${nm.rem ? `<span class="ws-ld-rem">dư ${slot(1, 'ws-in-col')}</span>` : ''}</span><span class="ws-ld-q">${slot(0, 'ws-in-col')}</span>
      </span>`;
  }
  return `
    <span class="ws-col">
      <span class="ws-col-op">${p.op}</span><span class="ws-col-n">${p.a}</span>
      <span class="ws-col-n ws-col-under">${p.b}</span>
      <span class="ws-col-n">${slot(0, 'ws-in-col')}</span>
    </span>`;
}

/** Phép tính in sẵn trong câu Đúng/Sai: { col: '527 + 145', res: '662' } hoặc { div: '80 : 4', q: '2', work: ['8', '0'] }. */
function staticOpHtml(it) {
  if (it.div) {
    const [a, b] = it.div.split(/[:÷]/).map(s => s.trim());
    return `
      <span class="ws-ld">
        <span class="ws-ld-a">${a}</span><span class="ws-ld-b">${b}</span>
        <span class="ws-ld-work">${it.work.map((w, i) => `<span class="${i % 2 === 0 && i < it.work.length - 1 ? 'ws-col-under' : ''}">${w}</span>`).join('')}</span><span class="ws-ld-q">${it.q}</span>
      </span>`;
  }
  const p = columnParts(it.col);
  return `
    <span class="ws-col">
      <span class="ws-col-op">${p.op}</span><span class="ws-col-n">${p.a}</span>
      <span class="ws-col-n ws-col-under">${p.b}</span>
      <span class="ws-col-n">${it.res}</span>
    </span>`;
}

/** Thước kẻ cm và đoạn thẳng đang vẽ. Chạm vạch k → đoạn thẳng dài k cm. */
function drawSvg(item, len, key, graded) {
  const max = item.len > 12 ? 15 : 12;
  const U = 40, X0 = 24, W = X0 * 2 + max * U;
  const L = Number.isFinite(len) ? len : 0;
  const [p, q2] = [item.name[0], item.name[1] || ''];
  const seg = L
    ? `<line class="ws-seg" pathLength="1" x1="${X0}" y1="34" x2="${X0 + L * U}" y2="34" />
       <line class="ws-segend" x1="${X0 + L * U}" y1="27" x2="${X0 + L * U}" y2="41" />
       <text x="${X0 + L * U}" y="20" text-anchor="middle" class="ws-dlabel">${q2}</text>`
    : '';
  let ticks = '';
  for (let mm = 0; mm <= max * 10; mm++) {
    const x = X0 + (mm * U) / 10;
    const h = mm % 10 === 0 ? 16 : mm % 5 === 0 ? 11 : 6;
    ticks += `<line x1="${x}" y1="58" x2="${x}" y2="${58 + h}" />`;
    if (mm % 10 === 0) ticks += `<text x="${x}" y="92" text-anchor="middle">${mm / 10}</text>`;
  }
  const hits = graded ? '' : Array.from({ length: max }, (_, k) => `<rect class="ws-rtick" data-k="${key}" data-len="${k + 1}" x="${X0 + (k + 0.5) * U}" y="0" width="${U}" height="104" />`).join('');
  return `
    <svg class="ws-drawsvg" viewBox="0 0 ${W} 106" role="img" aria-label="Thước kẻ">
      <line class="ws-segend" x1="${X0}" y1="27" x2="${X0}" y2="41" />
      <text x="${X0}" y="20" text-anchor="middle" class="ws-dlabel">${p}</text>
      ${seg}
      <rect class="ws-ruler" x="${X0 - 14}" y="56" width="${max * U + 28}" height="46" rx="4" />
      <g class="ws-ticks">${ticks}</g>
      ${!graded && !L ? `<text x="${X0 + 6}" y="50" class="ws-dhint">chạm vạch số trên thước để vẽ</text>` : ''}
      ${hits}
    </svg>`;
}

// Hình để khoanh (tự vẽ, cùng nét với phiếu).
const ICONS = {
  rabbit: `<svg viewBox="0 0 40 40" aria-hidden="true"><g stroke="#475569" stroke-width="1.6" fill="#fff"><ellipse cx="15" cy="9" rx="3.4" ry="8.5" transform="rotate(-10 15 9)"/><ellipse cx="25" cy="9" rx="3.4" ry="8.5" transform="rotate(10 25 9)"/><ellipse cx="20" cy="27" rx="12" ry="10"/></g><ellipse cx="15" cy="9" rx="1.4" ry="5.5" fill="#f9a8d4" transform="rotate(-10 15 9)"/><ellipse cx="25" cy="9" rx="1.4" ry="5.5" fill="#f9a8d4" transform="rotate(10 25 9)"/><circle cx="16" cy="25" r="1.5" fill="#1f2937"/><circle cx="24" cy="25" r="1.5" fill="#1f2937"/><ellipse cx="20" cy="30" rx="2" ry="1.4" fill="#f472b6"/><circle cx="12" cy="31" r="2" fill="#fbcfe8"/><circle cx="28" cy="31" r="2" fill="#fbcfe8"/></svg>`,
  orange: `<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="23" r="13" fill="#f97316" stroke="#c2410c" stroke-width="1.5"/><path d="M20 10 C 22 5, 28 3, 33 6 C 29 11, 24 11, 20 10 Z" fill="#22c55e" stroke="#15803d" stroke-width="1.2"/><path d="M20 10 V 6" stroke="#78350f" stroke-width="2"/><ellipse cx="14" cy="18" rx="3" ry="2" fill="#fdba74"/></svg>`,
  flower: `<svg viewBox="0 0 40 40" aria-hidden="true"><g fill="#f472b6" stroke="#be185d" stroke-width="1.2">${[0, 72, 144, 216, 288].map(r => `<ellipse cx="20" cy="10" rx="6" ry="8" transform="rotate(${r} 20 20)"/>`).join('')}</g><circle cx="20" cy="20" r="5" fill="#facc15" stroke="#a16207" stroke-width="1.2"/></svg>`,
  star: `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 3 L25 15 L38 15.5 L28 24 L31.5 37 L20 29.5 L8.5 37 L12 24 L2 15.5 L15 15 Z" fill="#fde047" stroke="#ca8a04" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
};

function scoreHtml(score) {
  return `
    <span class="ws-score ws-red ws-write" style="--d:0.2s">${fmtScore(score)}</span>
    <svg class="ws-ring" viewBox="0 0 120 100" aria-hidden="true"><path d="M95 22 C 70 4, 20 8, 12 42 C 6 72, 40 94, 72 88 C 104 82, 116 50, 100 28 C 94 20, 84 14, 74 12" /></svg>`;
}

function escapeHtml(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function injectStyles() {
  if (!document.getElementById('ws-font')) {
    const link = document.createElement('link');
    link.id = 'ws-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&display=swap';
    document.head.appendChild(link);
  }
  if (document.getElementById('ws-styles')) return;
  const style = document.createElement('style');
  style.id = 'ws-styles';
  style.textContent = `
    /* Mặt bàn gỗ: tờ phiếu trắng đặt lên trên. */
    .ws-desk {
      --ink: #1d3fa8; --red: #d1232a; --line: #c7d2fe;
      min-height: 100vh; box-sizing: border-box; padding: 1rem clamp(0.5rem, 2vw, 2rem) 3rem;
      background-color: #c98f55;
      background-image:
        repeating-linear-gradient(92deg, rgba(120,64,24,0.10) 0 2px, transparent 2px 38px),
        repeating-linear-gradient(88deg, rgba(255,230,190,0.10) 0 1px, transparent 1px 23px),
        radial-gradient(ellipse at 20% 10%, #d9a46a, transparent 60%),
        radial-gradient(ellipse at 80% 90%, #b47a42, transparent 55%);
      font-family: 'Quicksand', system-ui, sans-serif; color: #1f2937;
    }
    /* Bàn phím số đang mở: thêm chỗ cuối trang để câu cuối cùng cuộn lên trên bàn phím được. */
    body.vk-active .ws-desk, html.kb-open .ws-desk { padding-bottom: calc(3rem + 60vh); }
    .ws-back { border: none; background: #fff; color: #7c2d12; font: inherit; font-weight: 800; font-size: 1rem; padding: 0.6rem 1.1rem; border-radius: 999px; cursor: pointer; box-shadow: 0 4px 0 #8a5527; white-space: nowrap; }
    .ws-back:active { transform: translateY(3px); box-shadow: 0 1px 0 #8a5527; }

    /* ── trang chính: hai cặp hồ sơ ── */
    .ws-list { max-width: 1100px; margin: 0 auto; }
    .ws-list-head { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.2rem; flex-wrap: wrap; }
    .ws-list-title { margin: 0; color: #fff; font-size: clamp(1.4rem, 4vw, 2.2rem); text-shadow: 0 2px 0 #8a5527; }
    .ws-hub { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr)); gap: 2.6rem 1.6rem; padding-top: 1.4rem; min-height: calc(100vh - 9rem); }
    .ws-folder { position: relative; border: none; background: none; padding: 0; font: inherit; text-align: left; cursor: pointer; min-height: 15rem; display: flex; }
    .ws-folder-tab { position: absolute; left: 1.2rem; top: -1.3rem; width: 40%; height: 2rem; background: #fbbf24; border-radius: 0.8rem 0.8rem 0 0; box-shadow: inset 0 -3px 0 #d97706; }
    .ws-folder-sheets span { position: absolute; left: 6%; right: 6%; height: 70%; top: -0.6rem; background: #fffdf7; border-radius: 0.3rem; box-shadow: 0 1px 3px rgba(0,0,0,0.2); background-image: repeating-linear-gradient(to bottom, transparent 0 1.2rem, var(--line) 1.2rem calc(1.2rem + 1px)); }
    .ws-folder-sheets span:nth-child(1) { transform: rotate(-3deg); }
    .ws-folder-sheets span:nth-child(2) { transform: rotate(2deg); }
    .ws-folder-face { position: relative; flex: 1; margin-top: 2.6rem; display: flex; flex-direction: column; gap: 0.4rem; background: linear-gradient(#fcd34d, #fbbf24); border-radius: 0.4rem 1rem 1rem 1rem; padding: 1.2rem 1.4rem 1.3rem; box-shadow: 0 8px 0 #b45309, 0 16px 26px rgba(60,30,10,0.35); transition: transform 0.15s; }
    .ws-folder:hover .ws-folder-face { transform: translateY(-3px); }
    .ws-folder:active .ws-folder-face { transform: translateY(5px); box-shadow: 0 3px 0 #b45309; }
    .ws-folder[data-col="giuaki"] .ws-folder-tab { background: #93c5fd; box-shadow: inset 0 -3px 0 #2563eb; }
    .ws-folder[data-col="giuaki"] .ws-folder-face { background: linear-gradient(#bfdbfe, #93c5fd); box-shadow: 0 8px 0 #1d4ed8, 0 16px 26px rgba(60,30,10,0.35); }
    .ws-folder-icon { font-size: clamp(2.6rem, 9vh, 5rem); line-height: 1; }
    .ws-folder-name { font-size: clamp(1.4rem, 3.6vw, 2rem); font-weight: 800; color: #1f2937; }
    .ws-folder-desc { font-size: 1.1rem; font-weight: 600; color: #374151; }
    .ws-folder-meta { margin-top: auto; display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; font-weight: 700; color: #374151; }
    .ws-folder-count b { font-size: 2rem; color: #1f2937; }
    .ws-folder-bar { height: 0.7rem; background: rgba(255,255,255,0.6); border-radius: 999px; overflow: hidden; }
    .ws-folder-bar span { display: block; height: 100%; background: #16a34a; border-radius: 999px; }

    /* ── danh sách phiếu / đề ── */
    .ws-list-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: 1.4rem; min-height: 50vh; }
    .ws-list-many { grid-template-columns: repeat(auto-fill, minmax(min(100%, 230px), 1fr)); gap: 1.1rem; }
    .ws-card { position: relative; display: flex; flex-direction: column; align-items: stretch; gap: 0.8rem; border: none; background: #fffdf7; border-radius: 0.4rem; padding: 1.4rem 1.4rem 1.2rem; cursor: pointer; font: inherit; text-align: left; box-shadow: 0 8px 0 #8a5527, 0 14px 24px rgba(60,30,10,0.35); transform: rotate(-1deg); transition: transform 0.15s; }
    .ws-card:nth-child(even) { transform: rotate(0.8deg); }
    .ws-card:hover { transform: rotate(0deg) translateY(-3px); }
    .ws-card:active { transform: translateY(5px); box-shadow: 0 3px 0 #8a5527; }
    .ws-card-paper { display: flex; flex-direction: column; gap: 0.3rem; padding-right: 5.4rem; }
    .ws-card-short { font-size: 1.8rem; font-weight: 800; color: #1f2937; }
    .ws-card-desc { font-size: 1.15rem; font-weight: 600; color: #475569; }
    .ws-card-lines { height: 4.2rem; background: repeating-linear-gradient(to bottom, transparent 0 1.35rem, var(--line) 1.35rem calc(1.35rem + 1px)); }
    .ws-card-score { position: absolute; top: 0.8rem; right: 1rem; width: 5rem; height: 5rem; border: 2px solid #94a3b8; display: flex; align-items: center; justify-content: center; font-family: 'Dancing Script', cursive; font-weight: 700; font-size: 3rem; color: var(--red); transform: rotate(-6deg); background: #fff; }
    .ws-card-new { font-family: inherit; font-size: 0.9rem; color: #94a3b8; font-weight: 700; transform: none; }
    .ws-card-locked .ws-card-paper { opacity: 0.55; }
    .ws-card-lock { font-family: inherit; font-size: 2.2rem; color: inherit; transform: none; background: #f1f5f9; }
    .ws-card-locked .ws-card-go { background: #64748b; }
    .ws-card-go { align-self: flex-end; background: #8b5cf6; color: #fff; font-weight: 800; padding: 0.55rem 1.2rem; border-radius: 999px; font-size: 1.05rem; }
    .ws-list-many .ws-card { padding: 1rem 1rem 0.9rem; gap: 0.5rem; }
    .ws-list-many .ws-card-paper { padding-right: 4rem; }
    .ws-list-many .ws-card-short { font-size: 1.5rem; }
    .ws-list-many .ws-card-desc { font-size: 0.95rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; min-height: 3.9em; }
    .ws-list-many .ws-card-lines { display: none; }
    .ws-list-many .ws-card-score { width: 3.8rem; height: 3.8rem; font-size: 2.3rem; top: 0.7rem; right: 0.7rem; }
    .ws-list-many .ws-card-new { font-size: 0.75rem; }
    .ws-list-many .ws-card-go { font-size: 0.95rem; padding: 0.45rem 1rem; }
    @media (max-width: 520px) { .ws-list-many { grid-template-columns: repeat(2, 1fr); gap: 0.8rem; } .ws-list-many .ws-card-paper { padding-right: 0; } .ws-list-many .ws-card-score { position: static; align-self: flex-start; transform: rotate(-6deg); } .ws-list-many .ws-card-go { align-self: stretch; text-align: center; } }

    /* ── thanh trên ── */
    /* Thanh dính trên cùng: dải gỗ kín cả bề ngang (box-shadow tràn sang hai bên), chữ cuộn qua không lộ ra. */
    .ws-bar { max-width: 1100px; margin: -1rem auto 0.9rem; padding: 0.6rem 0 0.75rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; position: sticky; top: 0; z-index: 20;
      background: #c98f55; box-shadow: 0 0 0 100vmax #c98f55, 0 6px 10px -4px rgba(60,30,10,0.45); clip-path: inset(0 -100vmax -14px); }
    @media (max-width: 480px) { .ws-bar .ws-back, .ws-bar-count { font-size: 0.85rem; padding: 0.45rem 0.8rem; white-space: nowrap; } }
    .ws-bar-timer { background: #fff; border-radius: 999px; padding: 0.5rem 1rem; font-weight: 800; color: #1d3fa8; box-shadow: 0 4px 0 #8a5527; font-variant-numeric: tabular-nums; white-space: nowrap; }
    .ws-bar-timer.ws-timer-low { background: #ffedd5; color: #c2410c; }
    .ws-bar-timer.ws-timer-up { background: #fee2e2; color: #d1232a; animation: wsBlink 2.4s ease-in-out infinite; }
    @media (max-width: 480px) { .ws-bar { gap: 0.4rem; } .ws-bar-timer { font-size: 0.85rem; padding: 0.45rem 0.7rem; } }
    .ws-bar-count { background: #fff; border-radius: 999px; padding: 0.5rem 1rem; font-weight: 800; color: #334155; box-shadow: 0 4px 0 #8a5527; }

    /* ── tờ phiếu ── */
    .ws-paper { container-type: inline-size; max-width: 1100px; margin: 0 auto; background: #fff; border-radius: 0.3rem; padding: clamp(1rem, 3.5vw, 2.6rem); box-sizing: border-box; box-shadow: 0 2px 0 #e5e7eb, 0 18px 40px rgba(60,30,10,0.45); font-size: clamp(1.05rem, 2.2vw, 1.3rem); line-height: 1.5; }
    .ws-head { text-align: center; border-bottom: 2px solid #1f2937; padding-bottom: 0.8rem; }
    .ws-title { margin: 0; font-size: clamp(1.25rem, 3.4vw, 1.9rem); font-weight: 800; letter-spacing: 0.02em; }
    .ws-sub { font-weight: 700; color: #475569; }
    .ws-info { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.3rem 1.5rem; margin-top: 0.6rem; text-align: left; }
    .ws-ink { color: var(--ink); font-weight: 700; }
    .ws-red { color: var(--red); }

    /* Tấm che phần đề trước khi bấm Bắt đầu: che kín, thẻ nút đứng giữa khoảng nhìn thấy. */
    .ws-body { position: relative; }
    .ws-locked .ws-body { max-height: max(26rem, 62vh); overflow: hidden; }
    .ws-desk:has(.ws-locked) .ws-prog-row { opacity: 0.35; pointer-events: none; }
    .ws-locked .ws-body > * { visibility: hidden; }
    /* Popup giữa màn hình: nền tối mờ tách hẳn khỏi tờ đề phía sau. */
    .ws-cover { position: fixed; inset: 0; z-index: 60; display: flex; justify-content: center; align-items: center; padding: 1rem; box-sizing: border-box;
      background: rgba(41, 24, 10, 0.62); -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px); transition: opacity 0.4s; }
    .ws-cover-out { opacity: 0; pointer-events: none; }
    .ws-cover-card { width: min(30rem, 100%); max-height: 100%; overflow: auto; box-sizing: border-box; text-align: center; background: #fffdf7; border-radius: 1.4rem; padding: 1.6rem 1.4rem 1.8rem; box-shadow: 0 8px 0 #b45309, 0 24px 50px rgba(0,0,0,0.45); font-size: clamp(1rem, 2.4vw, 1.2rem); animation: wsPop 0.35s ease-out; }
    @keyframes wsPop { from { transform: scale(0.85); opacity: 0; } }
    .ws-cover-icon { font-size: clamp(3rem, 9vh, 4.5rem); line-height: 1; }
    .ws-cover-title { margin: 0.6rem 0 0.3rem; font-size: 1.35em; font-weight: 800; }
    .ws-cover-sub { margin: 0 0 1.2rem; color: #475569; }
    .ws-cover-sub b { color: var(--ink); }
    .ws-cover-back { margin-top: 1.1rem; border: none; background: none; font: inherit; font-size: 0.9em; font-weight: 700; color: #7c2d12; text-decoration: underline; cursor: pointer; padding: 0.4rem; }
    .ws-cover-btns { display: flex; flex-wrap: wrap; gap: 0.8rem; justify-content: center; }
    .ws-start { flex: 1 1 auto; white-space: nowrap; border: none; border-radius: 999px; padding: 0.9rem 1.3rem; font: inherit; font-size: 1.15em; font-weight: 800; color: #fff; background: #16a34a; box-shadow: 0 6px 0 #15803d; cursor: pointer; animation: wsPulse 1.8s ease-in-out infinite; }
    @keyframes wsPulse { 50% { transform: scale(1.04); } }
    @media (prefers-reduced-motion: reduce) { .ws-start { animation-duration: 3s; } }
    .ws-start:active { transform: translateY(4px); box-shadow: 0 2px 0 #15803d; }
    .ws-start-alt { background: #fff; color: #7c2d12; box-shadow: 0 6px 0 #d6d3d1; border: 2px solid #d6d3d1; animation: none; }
    .ws-start-alt:active { box-shadow: 0 2px 0 #d6d3d1; }
    .ws-start-alt.ws-armed { background: #fee2e2; color: #b91c1c; border-color: #fca5a5; }
    .ws-mark-row { display: grid; grid-template-columns: minmax(7rem, 22%) 1fr; margin: 1rem 0 0.5rem; border: 2px solid #1f2937; }
    .ws-scorebox { border-right: 2px solid #1f2937; display: flex; flex-direction: column; }
    .ws-box-label { font-weight: 800; font-size: 0.95em; padding: 0.3rem 0.7rem; }
    .ws-scorebox .ws-box-label { text-align: center; border-bottom: 1px solid #cbd5e1; }
    .ws-score-area { position: relative; flex: 1; min-height: 6.5rem; display: flex; align-items: center; justify-content: center; }
    .ws-score { font-family: 'Dancing Script', cursive; font-weight: 700; font-size: clamp(3.6rem, 9vw, 5.5rem); line-height: 1; transform: rotate(-8deg); position: relative; z-index: 1; }
    .ws-ring { position: absolute; inset: 8% 10%; width: 80%; height: 84%; overflow: visible; }
    .ws-ring path { fill: none; stroke: var(--red); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 340; stroke-dashoffset: 340; animation: wsDraw 0.9s ease-out 0.9s forwards; }
    .ws-comment-lines { padding: 0 0.9rem 0.6rem; }
    .ws-cline { min-height: 2.6rem; border-bottom: 1.5px dashed #cbd5e1; display: flex; align-items: flex-end; }
    .ws-cline .ws-red { font-family: 'Dancing Script', cursive; font-weight: 700; font-size: 1.5em; line-height: 1.1; transform: rotate(-1.5deg); transform-origin: left bottom; }
    /* Chữ "viết ra" từ trái sang phải. */
    .ws-write { clip-path: inset(0 100% 0 0); animation: wsWrite 1s steps(14) var(--d, 0s) forwards; display: inline-block; }
    @keyframes wsWrite { to { clip-path: inset(0 0 0 0); } }
    @keyframes wsDraw { to { stroke-dashoffset: 0; } }
    @media (prefers-reduced-motion: reduce) {
      .ws-write { animation: wsWrite 1.6s linear var(--d, 0s) forwards; }
      .ws-ring path { animation-duration: 1.4s; }
    }

    .ws-part { margin-top: 1.4rem; }
    .ws-part-title { font-size: 1.05em; font-weight: 800; margin: 0 0 0.5rem; }
    .ws-q { display: grid; grid-template-columns: 2.2rem 1fr; align-items: start; padding: 0.35rem 0; border-radius: 0.5rem; scroll-margin-top: var(--bar-h, 8rem); }

    /* Tiến độ trong thanh dính: chấm số từng câu, nhóm theo Phần. Một hàng, cuộn ngang khi chật. */
    .ws-bar { flex-wrap: wrap; row-gap: 0.55rem; }
    .ws-prog-row { flex-basis: 100%; display: flex; align-items: center; gap: 0.4rem; min-width: 0; }
    .ws-prog-arrow { display: none; flex-shrink: 0; width: 2.4rem; height: 2.4rem; border-radius: 50%; border: 2.5px solid #fff; background: #f59e0b; color: #fff; font: inherit; font-size: 0.95rem; cursor: pointer; padding: 0; box-shadow: 0 3px 0 rgba(0,0,0,0.45); margin-bottom: 0.2rem; }
    .ws-prog-over .ws-prog-arrow { display: block; }
    .ws-prog-arrow:active:not(:disabled) { transform: translateY(2px); box-shadow: 0 1px 0 rgba(0,0,0,0.45); }
    .ws-prog-arrow:disabled { opacity: 0.35; cursor: default; }
    .ws-prog { flex: 1; min-width: 0; display: flex; gap: 0.7rem; overflow-x: auto; scrollbar-width: none; padding: 0.15rem 0.1rem 0.35rem; }
    .ws-prog::-webkit-scrollbar { display: none; }
    /* Căn giữa bằng margin auto (không dùng justify-content: center, vì khi tràn sẽ mất phần đầu bên trái). */
    .ws-prog > :first-child { margin-left: auto; }
    .ws-prog > :last-child { margin-right: auto; }
    .ws-prog-part { display: flex; gap: 0.35rem; flex-shrink: 0; padding: 0.3rem 0.4rem; background: rgba(69,36,12,0.55); border: 2px solid rgba(255,255,255,0.35); border-radius: 999px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.25); }
    .ws-prog-tag { align-self: center; font-size: 0.75rem; font-weight: 800; color: #fff; padding: 0 0.15rem 0 0.25rem; letter-spacing: 0.04em; }
    .ws-dot { flex-shrink: 0; width: 2.2rem; height: 2.2rem; border-radius: 50%; border: 2.5px solid #fff; background: #fff; color: #1e293b; font: inherit; font-weight: 800; font-size: 0.95rem; cursor: pointer; padding: 0; box-shadow: 0 3px 0 rgba(0,0,0,0.45); font-variant-numeric: tabular-nums; text-shadow: 0 1px 1px rgba(0,0,0,0.25); }
    .ws-dot:not(.ws-dot-done):not(.ws-dot-ok):not(.ws-dot-half):not(.ws-dot-bad) { text-shadow: none; }
    .ws-dot:active { transform: translateY(2px); box-shadow: 0 1px 0 rgba(0,0,0,0.45); }
    .ws-dot-done { background: #16a34a; color: #fff; }
    .ws-dot-ok { background: #16a34a; color: #fff; }
    .ws-dot-half { background: #f97316; color: #fff; }
    .ws-dot-bad { background: #dc2626; color: #fff; }
    .ws-dot-here { outline: 3px solid #facc15; outline-offset: 2px; }
    @media (max-width: 480px) { .ws-dot { width: 1.9rem; height: 1.9rem; font-size: 0.8rem; } .ws-prog { gap: 0.5rem; } }
    .ws-q-block { display: block; padding: 0.5rem 0; }
    .ws-q-block .ws-qbody { padding-left: clamp(0.4rem, 2.5vw, 1.6rem); }
    .ws-qhead { margin-bottom: 0.3rem; }
    .ws-qlabel { font-weight: 800; }
    .ws-qnum { font-weight: 800; padding-top: 0.3rem; }
    .ws-qbody { min-width: 0; }
    .ws-prompt, .ws-subprompt { margin: 0.2rem 0 0.4rem; }
    .ws-flash { animation: wsFlash 1.4s ease-out; }
    @keyframes wsFlash { 0%, 40% { background: #fef3c7; } 100% { background: transparent; } }
    .ws-frac { display: inline-flex; flex-direction: column; vertical-align: middle; text-align: center; font-size: 0.82em; line-height: 1.05; margin: 0 0.15em; }
    .ws-frac span:first-child { border-bottom: 1.5px solid currentColor; padding: 0 0.15em; }
    .ws-fig { margin: 0.3rem 0 0.5rem; }
    .ws-fig svg, .ws-optt svg { max-width: 100%; height: auto; }

    .ws-items { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem 1rem; }
    .ws-items-1 { grid-template-columns: 1fr; }
    .ws-items-2 { grid-template-columns: repeat(2, minmax(0, 18rem)); }
    .ws-items-3 { grid-template-columns: repeat(3, 1fr); }
    .ws-items-col { grid-template-columns: repeat(4, max-content); gap: 0.8rem 2.6rem; }
    @container (max-width: 720px) { .ws-items, .ws-items-3 { grid-template-columns: repeat(2, 1fr); } .ws-items-1 { grid-template-columns: 1fr; } .ws-items-col { grid-template-columns: repeat(2, max-content); } }
    .ws-item { display: flex; align-items: center; flex-wrap: wrap; gap: 0.35rem; white-space: nowrap; min-height: 2.6rem; }
    .ws-items-1 .ws-item { white-space: normal; }
    .ws-letter { font-weight: 700; color: #64748b; margin-right: 0.2rem; }

    .ws-in { width: 3.2em; height: 1.9em; box-sizing: border-box; border: none; border-bottom: 2px dotted #64748b; background: #f8fafc; border-radius: 0.3rem 0.3rem 0 0; text-align: center; font: inherit; font-weight: 800; color: var(--ink); padding: 0; }
    .ws-in:focus { outline: none; background: #eef2ff; border-bottom: 2px solid var(--ink); }
    .ws-in-box { border: 2px solid #1f2937; border-radius: 0.2rem; background: #fff; width: 2.6em; }
    .ws-in-dot { width: 3.6em; }
    .ws-in-text { text-align: left; padding: 0 0.3em; font-weight: 700; }
    .ws-cmp { width: 2.1em; height: 1.9em; border: 2px solid #1f2937; border-radius: 0.2rem; background: #fff; font: inherit; font-weight: 800; color: var(--ink); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; padding: 0; flex-shrink: 0; }
    .ws-cmp:not(.ws-cmp-set) { animation: wsBlink 2.4s ease-in-out infinite; }
    @keyframes wsBlink { 50% { background: #fef3c7; } }
    .ws-filled { display: inline-block; min-width: 2.2em; text-align: center; font-weight: 800; color: var(--ink); border-bottom: 2px dotted #94a3b8; }
    .ws-filled.ws-cmp { border: 2px solid #1f2937; }
    .ws-tick, .ws-cross { font-family: 'Dancing Script', cursive; color: var(--red); font-weight: 700; font-size: 1.45em; line-height: 1; margin-left: 0.15rem; }
    .ws-fix { font-family: 'Dancing Script', cursive; color: var(--red); font-weight: 700; font-size: 1.25em; }
    .ws-pick { position: fixed; z-index: 50; display: flex; gap: 0.5rem; background: #fff; padding: 0.5rem; border-radius: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .ws-pick button { width: 3.6rem; height: 3.6rem; border-radius: 0.8rem; border: 2px solid #c4b5fd; background: #f5f3ff; font: inherit; font-size: 2rem; font-weight: 800; color: var(--ink); cursor: pointer; box-shadow: 0 4px 0 #a78bfa; }
    .ws-pick button:active { transform: translateY(3px); box-shadow: 0 1px 0 #a78bfa; }
    .ws-fly-sign { display: flex; width: 100%; height: 100%; align-items: center; justify-content: center; font-size: 2rem; font-weight: 800; color: #1d3fa8; }
    .g3-fly { position: fixed; z-index: 60; pointer-events: none; transform-origin: 50% 50%; will-change: transform; filter: drop-shadow(0 5px 4px rgba(15,23,42,0.22)); }

    /* Tìm x: đề bài trên, "x = …" dưới như vở. */
    .ws-fx { display: inline-flex; flex-direction: column; gap: 0.2rem; }
    .ws-fx-ans { display: inline-flex; align-items: center; gap: 0.35rem; padding-left: 0.6rem; }

    /* Đặt tính dọc và chia cột. */
    .ws-col { display: inline-grid; grid-template-columns: 1.2em auto; align-items: center; font-variant-numeric: tabular-nums; font-weight: 700; padding: 0.1rem 0.2rem; }
    .ws-col-op { grid-column: 1; grid-row: 1 / span 2; align-self: center; font-weight: 800; }
    .ws-col-n { grid-column: 2; text-align: right; letter-spacing: 0.08em; min-width: 3.4em; padding-right: 0.15em; }
    .ws-col-n .ws-in-col { margin-right: -0.15em; }
    .ws-col-under { border-bottom: 2px solid #1f2937; }
    .ws-in-col { width: 3.4em; text-align: right; padding-right: 0.15em; letter-spacing: 0.08em; }
    .ws-ld { display: inline-grid; grid-template-columns: auto auto; font-variant-numeric: tabular-nums; font-weight: 700; letter-spacing: 0.08em; }
    .ws-ld-a { padding: 0 0.5em 0 0.2em; border-right: 2px solid #1f2937; text-align: right; }
    .ws-ld-b { padding: 0 0.5em; border-bottom: 2px solid #1f2937; min-width: 2.6em; }
    .ws-ld-work { display: flex; flex-direction: column; align-items: flex-end; padding: 0.1em 0.5em 0 0.2em; border-right: 2px solid #1f2937; min-height: 1.9em; }
    .ws-ld-q { padding: 0.15em 0.3em; }
    .ws-ld-rem { display: inline-flex; align-items: center; gap: 0.25em; font-size: 0.85em; color: #475569; letter-spacing: 0; }
    .ws-ld-rem .ws-in-col { width: 2.4em; }
    .ws-tf { gap: 0.6rem; }
    .ws-tfbox { margin-left: 0.3rem; }

    /* Trắc nghiệm: chữ cái được khoanh tròn bằng nét mực. */
    .ws-mcrow { display: flex; align-items: center; gap: 0.6rem; }
    .ws-opts { flex: 1; display: grid; grid-template-columns: repeat(var(--cols), minmax(0, 1fr)); gap: 0.4rem 0.8rem; }
    @container (max-width: 560px) { .ws-opts { grid-template-columns: repeat(min(var(--cols), 2), minmax(0, 1fr)); } }
    .ws-opt { display: flex; align-items: center; gap: 0.45rem; border: 2px solid transparent; background: none; border-radius: 0.7rem; padding: 0.3rem 0.4rem; font: inherit; text-align: left; cursor: pointer; color: inherit; min-height: 2.8rem; }
    .ws-opt:hover { background: #f8fafc; }
    .ws-graded .ws-opt { cursor: default; pointer-events: none; }
    .ws-optl { position: relative; flex-shrink: 0; width: 1.8em; height: 1.8em; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; }
    .ws-optl::after { content: '.'; position: absolute; right: 0.05em; bottom: 0.2em; }
    .ws-optt { min-width: 0; }
    .ws-opts-fig .ws-opt { flex-direction: column; align-items: flex-start; }
    .ws-ring-ink { position: absolute; inset: -18%; width: 136%; height: 136%; overflow: visible; pointer-events: none; }
    .ws-ring-ink path { fill: none; stroke: var(--ink); stroke-width: 2.6; stroke-linecap: round; stroke-dasharray: 130; stroke-dashoffset: 130; opacity: 0; }
    .ws-opt-on .ws-ring-ink path, .ws-pk-on .ws-ring-ink path { opacity: 1; animation: wsDraw 0.35s ease-out forwards; }
    .ws-graded .ws-ring-ink path { animation: none; stroke-dashoffset: 0; }
    @media (prefers-reduced-motion: reduce) { .ws-opt-on .ws-ring-ink path, .ws-pk-on .ws-ring-ink path { animation-duration: 0.6s; } }
    .ws-mcmark { flex-shrink: 0; display: flex; align-items: center; gap: 0.3rem; }

    /* Khoanh một phần mấy số hình. */
    .ws-pickwrap { display: inline-block; vertical-align: top; max-width: 100%; margin: 0.3rem 0 0.6rem; }
    .ws-pickwrap:not(:last-child) { margin-right: 2.2rem; }
    /* Cột co lại theo chỗ có (8 cột trên điện thoại dọc không tràn khung giấy). */
    .ws-pickgrid { display: grid; width: max-content; max-width: 100%; box-sizing: border-box; grid-template-columns: repeat(var(--cols), minmax(0, clamp(3rem, 11cqi, 4.6rem))); gap: 0.4rem; padding: 0.7rem; border: 2px solid #1f2937; border-radius: 0.2rem; }
    .ws-pk { position: relative; aspect-ratio: 1; border: none; background: none; padding: 0.25rem; cursor: pointer; border-radius: 50%; }
    .ws-pk > svg:first-child { width: 100%; height: 100%; display: block; }
    .ws-pk .ws-ring-ink { inset: -6%; width: 112%; height: 112%; }
    .ws-graded .ws-pk { cursor: default; pointer-events: none; }
    .ws-pick-foot { display: flex; align-items: center; gap: 0.5rem; min-height: 2rem; font-weight: 700; color: #475569; font-size: 0.9em; }
    /* Hình chia phần để tô màu. */
    .ws-shape { display: block; width: clamp(9rem, 28cqi, 13rem); height: auto; touch-action: manipulation; overflow: visible; }
    .ws-shp { fill: #fff; stroke: #1f2937; stroke-width: 2.5; stroke-linejoin: round; cursor: pointer; transition: fill 0.3s; }
    .ws-shp.ws-pk-on { fill: #93c5fd; }
    .ws-graded .ws-shp { pointer-events: none; }

    /* Ô chọn chữ (thừa số, tích…) hoặc phân số. */
    .ws-cmp-wide { width: auto; min-width: 3.2em; height: auto; min-height: 1.9em; padding: 0.05em 0.45em; }
    .ws-pick .ws-pick-wide { width: auto; padding: 0 0.9rem; font-size: 1.3rem; }

    /* Bảng có ô trống. */
    .ws-tblwrap { overflow-x: auto; max-width: 100%; margin: 0.2rem 0 0.4rem; }
    .ws-tbl { border-collapse: collapse; }
    .ws-tbl th, .ws-tbl td { border: 1.5px solid #1f2937; padding: 0.3em 0.55em; text-align: center; min-width: 2.6em; white-space: nowrap; }
    .ws-tbl th { font-weight: 700; background: #f8fafc; }
    .ws-tbl-t th { text-align: left; }
    .ws-tbl .ws-td-in { padding: 0.2em 0.3em; }
    .ws-tbl .ws-in { background: #f8fafc; }
    .ws-tbl .ws-in-text { width: 13em !important; } /* mọi ô chữ trong bảng dài bằng nhau: không lộ độ dài đáp án */
    .ws-tbl .ws-td-mark { border: none; text-align: left; padding-left: 0.4em; white-space: normal; min-width: 0; }
    .ws-tbl .ws-tr-mark th { border: none; background: none; }
    .ws-tbl .ws-tr-mark .ws-td-mark { text-align: center; padding: 0; }

    /* Sơ đồ mũi tên. */
    .ws-chains { display: flex; flex-direction: column; gap: 0.6rem; }
    .ws-chain { gap: 0.2rem; }
    .ws-ch-start { display: inline-flex; align-items: center; justify-content: center; min-width: 2.4em; height: 2.2em; padding: 0 0.3em; border: 2px solid #1f2937; border-radius: 999px; font-weight: 800; }
    .ws-ch-arrow { position: relative; display: inline-block; width: 3.6em; height: 2.4em; }
    .ws-ch-arrow::before { content: ''; position: absolute; left: 0.2em; right: 0.5em; bottom: 0.55em; border-top: 2px solid #1f2937; }
    .ws-ch-arrow::after { content: ''; position: absolute; right: 0.2em; bottom: calc(0.55em - 5px); border: 6px solid transparent; border-left: 9px solid #1f2937; border-right: none; transform: translateY(-1px); }
    .ws-ch-op { position: absolute; left: 0; right: 0; top: -0.1em; text-align: center; font-size: 0.85em; font-weight: 700; color: #475569; white-space: nowrap; }

    /* Nối cột. */
    .ws-match { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(3rem, 0.5fr) minmax(0, 1fr); column-gap: 0; row-gap: 0.3rem; margin: 0.3rem 0 0.2rem; max-width: 46rem; }
    .ws-mhead { font-weight: 700; text-align: center; }
    .ws-mcol { display: flex; flex-direction: column; justify-content: space-around; gap: 0.55rem; }
    .ws-mmid { position: relative; }
    .ws-mlines { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
    .ws-mi { display: flex; align-items: center; gap: 0.4rem; min-height: 2.8rem; padding: 0.35rem 0.7rem; border: 2px solid #1f2937; border-radius: 0.5rem; background: #fff; font: inherit; color: inherit; text-align: left; cursor: pointer; touch-action: manipulation; }
    .ws-mcol:last-of-type .ws-mi { justify-content: center; text-align: center; }
    .ws-mi-sel { background: #eef2ff; border-color: var(--ink); box-shadow: 0 0 0 3px #c7d2fe; }
    .ws-graded .ws-mi { cursor: default; pointer-events: none; }
    .ws-mt { flex: 1; }
    .ws-mt svg { display: block; height: 3.4rem; width: auto; max-width: 100%; }
    .ws-mmark { flex-shrink: 0; white-space: nowrap; }
    .ws-mline { stroke: var(--ink); stroke-width: 3; stroke-linecap: round; }
    .ws-mline-bad { stroke: var(--red); stroke-dasharray: 0.03 0.025; }
    .ws-mline-new { stroke-dasharray: 1; stroke-dashoffset: 1; animation: wsGrow 0.45s ease-out forwards; }
    @media (prefers-reduced-motion: reduce) { .ws-mline-new { animation-duration: 0.9s; } }
    .ws-mdot { fill: #fff; stroke: #1f2937; stroke-width: 2; }
    .ws-mdot-on { fill: var(--ink); stroke: var(--ink); }
    .ws-mhint { margin: 0.2rem 0 0; font-size: 0.85em; color: #64748b; }

    /* Vẽ đoạn thẳng trên thước. */
    .ws-draw { margin: 0.2rem 0 0.8rem; }
    .ws-drawsvg { width: 100%; max-width: 40rem; height: auto; display: block; touch-action: manipulation; }
    .ws-drawsvg .ws-seg { stroke: var(--ink); stroke-width: 3.5; stroke-linecap: round; }
    .ws-drawsvg .ws-seg-new { stroke-dasharray: 1; stroke-dashoffset: 1; animation: wsGrow 0.5s ease-out forwards; }
    @keyframes wsGrow { to { stroke-dashoffset: 0; } }
    @media (prefers-reduced-motion: reduce) { .ws-drawsvg .ws-seg-new { animation-duration: 0.9s; } }
    .ws-drawsvg .ws-segend { stroke: var(--ink); stroke-width: 3; }
    .ws-drawsvg .ws-dlabel { font-size: 18px; font-weight: 800; fill: var(--ink); }
    .ws-drawsvg .ws-dhint { font-size: 14px; font-weight: 600; fill: #a78bfa; }
    .ws-drawsvg .ws-ruler { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
    .ws-drawsvg .ws-ticks line { stroke: #78350f; stroke-width: 1.2; }
    .ws-drawsvg .ws-ticks text { font-size: 15px; font-weight: 700; fill: #78350f; }
    .ws-drawsvg .ws-rtick { fill: transparent; cursor: pointer; }
    .ws-drawsvg .ws-rtick:hover { fill: rgba(139,92,246,0.08); }

    .ws-rel-text { margin: 0.2rem 0 0.4rem; }
    .ws-rel-rows { display: grid; grid-template-columns: repeat(2, minmax(0, 18rem)); gap: 0.4rem 2rem; }
    @container (max-width: 560px) { .ws-rel-rows { grid-template-columns: 1fr; } }

    /* ── bài toán có lời văn ── */
    .ws-word { min-width: 0; }
    .ws-wtext { margin: 0.2rem 0 0.6rem; font-weight: 600; }
    .ws-pills { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.4rem; margin-bottom: 0.6rem; }
    .ws-pill { border: 2px solid #e2e8f0; background: #f8fafc; border-radius: 999px; padding: 0.35rem 0.5rem; font: inherit; font-size: 0.8em; font-weight: 700; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.4rem; white-space: nowrap; }
    .ws-pill b { width: 1.5em; height: 1.5em; border-radius: 50%; background: #e2e8f0; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .ws-pill:disabled { opacity: 0.45; cursor: default; }
    .ws-pill-done { border-color: #86efac; color: #166534; }
    .ws-pill-done b { background: #22c55e; color: #fff; }
    .ws-pill-on { border-color: #8b5cf6; background: #f5f3ff; color: #5b21b6; }
    .ws-pill-on b { background: #8b5cf6; color: #fff; }
    @container (max-width: 560px) { .ws-pill { font-size: 0.7em; } }

    .ws-solve { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: 1rem; align-items: stretch; }
    .ws-graded .ws-solve { grid-template-columns: 1fr; }
    @container (max-width: 760px) { .ws-solve { grid-template-columns: 1fr; } }
    /* Vở ô li: dòng kẻ ngang, lề đỏ. */
    .ws-oly { --row: 3rem; border: 1.5px solid #ddd6fe; border-radius: 0.4rem; padding: 0.2rem 0.8rem 0.4rem 2.6rem; background: #fff linear-gradient(to right, transparent 1.9rem, #fca5a5 1.9rem, #fca5a5 calc(1.9rem + 2px), transparent calc(1.9rem + 2px)); }
    .ws-line { min-height: var(--row); border-bottom: 1.5px solid #c4b5fd; display: flex; align-items: center; flex-wrap: wrap; gap: 0.3rem 0.35rem; padding: 0.25rem 0; box-sizing: border-box; transition: opacity 0.2s; }
    .ws-l0 { font-weight: 800; text-decoration: underline; justify-content: center; }
    .ws-dim { opacity: 0.35; }
    .ws-word .ws-l1, .ws-word .ws-l2, .ws-word .ws-l3 { cursor: pointer; }
    .ws-graded .ws-l1, .ws-graded .ws-l2, .ws-graded .ws-l3 { cursor: default; }
    .ws-now { background: #faf5ff; box-shadow: -0.6rem 0 0 #faf5ff, 0.6rem 0 0 #faf5ff; }
    .ws-ph { color: #a78bfa; font-style: italic; font-size: 0.9em; }
    .ws-in-n { width: 2.8em; }
    .ws-in-op { width: 2em; }
    .ws-in-op::placeholder { color: #a78bfa; font-weight: 600; }
    .ws-slot { display: inline-flex; align-items: center; justify-content: center; min-width: 2em; height: 1.9em; padding: 0 0.3em; font-weight: 800; color: var(--ink); border-bottom: 2px dotted #64748b; background: #f8fafc; border-radius: 0.3rem 0.3rem 0 0; }
    .ws-unitbox, .ws-ansunitbox { min-width: 5.5em; }
    .ws-keep { display: inline-flex; align-items: center; gap: 0.2rem; white-space: nowrap; }
    .ws-slot.ws-empty { color: #a78bfa; font-weight: 600; font-size: 0.85em; }
    .ws-graded .ws-slot { background: none; }
    .ws-u { font-weight: 700; text-decoration: underline; }
    .ws-fixline { flex-basis: 100%; font-family: 'Dancing Script', cursive; color: var(--red); font-weight: 700; font-size: 1.3em; line-height: 1.2; }

    .ws-tile { border: 2px solid #c4b5fd; background: #fff; color: #1f2937; border-radius: 0.6rem; padding: 0.35em 0.7em; font: inherit; font-weight: 700; cursor: pointer; box-shadow: 0 4px 0 #a78bfa; white-space: nowrap; }
    .ws-tile:active { transform: translateY(3px); box-shadow: 0 1px 0 #a78bfa; }
    .ws-tile-on { border-color: transparent; background: none; box-shadow: none; color: var(--ink); padding: 0.1em 0.15em; }
    .ws-graded .ws-tile-on, .ws-tile-on[tabindex="-1"] { cursor: default; pointer-events: none; }
    .ws-tile-fly { display: flex; width: 100%; height: 100%; box-sizing: border-box; align-items: center; justify-content: center; }

    /* Các bảng bước chồng lên cùng một ô: khung luôn cao bằng bảng cao nhất, không nhảy. */
    .ws-panels { display: grid; background: #f5f3ff; border-radius: 0.8rem; padding: 0.9rem; }
    .ws-panel { grid-area: 1 / 1; visibility: hidden; display: flex; flex-direction: column; gap: 0.55rem; }
    .ws-panel.ws-on { visibility: visible; }
    /* Màn hẹp: bảng nằm dưới tờ bài giải nên co theo nội dung bước đang làm, không giữ chỗ trống của bảng cao nhất. */
    @container (max-width: 760px) { .ws-panel { display: none; } .ws-panel.ws-on { display: flex; } }
    .ws-guide { background: #fff; border-radius: 0.6rem; padding: 0.4rem 0.7rem; font-size: 0.95em; }
    .ws-ask { font-weight: 800; color: #5b21b6; font-size: 0.95em; }
    .ws-keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; }
    .ws-units { grid-template-columns: repeat(3, 1fr); }
    .ws-key { min-height: 3.2rem; border: 2px solid #c4b5fd; background: #fff; border-radius: 0.8rem; font: inherit; font-weight: 800; font-size: 1.15em; color: #1f2937; cursor: pointer; box-shadow: 0 5px 0 #a78bfa; padding: 0.2rem 0.3rem; }
    .ws-op1, .ws-opk { font-size: 1.8em; }
    .ws-key:active { transform: translateY(4px); box-shadow: 0 1px 0 #a78bfa; }
    .ws-key-on { background: #ede9fe; border-color: #8b5cf6; }
    .ws-key.ws-ok { background: #dcfce7; border-color: #22c55e; box-shadow: 0 5px 0 #16a34a; }
    .ws-key.ws-no { background: #fee2e2; border-color: #fca5a5; box-shadow: 0 5px 0 #f87171; }
    .ws-shake { animation: wsShake 0.4s; }
    @keyframes wsShake { 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
    .ws-hint { visibility: hidden; background: #fef9c3; color: #713f12; border-radius: 0.6rem; padding: 0.4rem 0.7rem; font-size: 0.9em; font-weight: 600; min-height: 2.6em; }
    .ws-hint.ws-hint-ok { visibility: visible; background: #dcfce7; color: #166534; }
    .ws-pool { display: flex; flex-wrap: wrap; gap: 0.6rem; align-content: flex-start; }
    /* Nút ➜ cuối dòng: chỗ bên phải luôn để sẵn ở mọi dòng, đổi bước không làm dòng nhảy. */
    .ws-paper:not(.ws-graded) .ws-word .ws-l1, .ws-paper:not(.ws-graded) .ws-word .ws-l2, .ws-paper:not(.ws-graded) .ws-word .ws-l3 { position: relative; padding-right: 2.9rem; }
    .ws-next { position: absolute; right: 0; top: 0; bottom: 0; margin: auto 0; width: 2.5rem; height: 2.5rem; border: none; background: #8b5cf6; color: #fff; font: inherit; font-weight: 800; font-size: 1.2rem; line-height: 1; padding: 0; border-radius: 50%; cursor: pointer; box-shadow: 0 4px 0 #6d28d9; }
    .ws-next:active:not(:disabled) { transform: translateY(3px); box-shadow: 0 1px 0 #6d28d9; }
    .ws-next-done { background: #22c55e; box-shadow: 0 4px 0 #16a34a; }
    .ws-next:disabled { background: #cbd5e1; box-shadow: 0 4px 0 #94a3b8; cursor: default; }
    .ws-done { font-weight: 800; color: #166534; background: #dcfce7; border-radius: 0.6rem; padding: 0.6rem 0.8rem; }

    /* Điện thoại: ô nhỏ lại để mỗi ý nằm trên một dòng; nút bước xếp số trên, chữ dưới. */
    @container (max-width: 480px) {
      .ws-q { grid-template-columns: 1.7rem 1fr; }
      .ws-items { gap: 0.4rem 0.6rem; }
      .ws-item { flex-wrap: nowrap; gap: 0.2rem; }
      .ws-items-1 .ws-item { flex-wrap: wrap; }
      .ws-items-2 { grid-template-columns: 1fr; }
      .ws-items-col { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.8rem 0.8rem; }
      .ws-items-col .ws-item { flex-wrap: wrap; }
      .ws-tf { gap: 0.3rem; }
      .ws-in { width: 2.3em; }
      .ws-in-box { width: 2.2em; }
      .ws-in-n { width: 2.2em; }
      .ws-in-col { width: 3em; }
      .ws-letter { margin-right: 0; }
      .ws-pill { flex-direction: column; gap: 0.1rem; font-size: 0.62em; padding: 0.3rem 0.2rem; border-radius: 0.8rem; }
      .ws-oly { padding-left: 2.1rem; padding-right: 0.4rem; background-position: -0.5rem 0; }
      .ws-unitbox, .ws-ansunitbox { min-width: 4.2em; }
      /* Dòng phép tính "3 × 7 = 21 (bông hoa)" nằm gọn một hàng. */
      .ws-l2, .ws-l3 { gap: 0.3rem 0.2rem; font-size: 0.92em; }
      .ws-l2 .ws-in-n, .ws-l3 .ws-in-n { width: 1.9em; }
      .ws-in-op { width: 1.5em; }
      .ws-l2 .ws-slot, .ws-l3 .ws-slot { padding: 0 0.15em; }
      .ws-keep { gap: 0.1rem; }
    }
    .ws-foot { margin-top: 2rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
    .ws-submit { border: none; background: #16a34a; color: #fff; font: inherit; font-weight: 800; font-size: 1.25em; padding: 0.9rem 2.6rem; border-radius: 999px; cursor: pointer; box-shadow: 0 6px 0 #15803d; }
    .ws-submit:active:not(:disabled) { transform: translateY(5px); box-shadow: 0 1px 0 #15803d; }
    .ws-submit:disabled { background: #cbd5e1; box-shadow: 0 6px 0 #94a3b8; cursor: default; }
    .ws-submit.ws-armed { background: #ea580c; box-shadow: 0 6px 0 #c2410c; }
    .ws-foot-note { border: none; background: none; font: inherit; color: #64748b; font-weight: 600; font-size: 0.9em; text-align: center; cursor: pointer; }
    .ws-foot-note:disabled { cursor: default; color: #166534; }
    /* Kiểm tra theo lộ trình */
    .ws-list-note { margin: -0.4rem 0 1.2rem; color: #fff; font-weight: 700; font-size: 1.05rem; text-shadow: 0 1px 0 #8a5527; }
    .ws-card-after { align-self: flex-start; background: #ede9fe; color: #5b21b6; font-weight: 800; font-size: 0.95rem; padding: 0.15rem 0.6rem; border-radius: 999px; }
    .ws-card-next { position: absolute; top: -0.8rem; left: 1rem; z-index: 1; background: #f97316; color: #fff; font-weight: 800; font-size: 0.95rem; padding: 0.25rem 0.8rem; border-radius: 999px; box-shadow: 0 3px 0 #c2410c; }
    .ws-card-is-next { outline: 4px solid #fb923c; outline-offset: 3px; }
    .ws-say { border: 2px solid #c4b5fd; background: #f5f3ff; border-radius: 999px; width: 2.3em; height: 2.3em; font-size: 0.9em; margin-right: 0.4rem; cursor: pointer; vertical-align: middle; box-shadow: 0 3px 0 #c4b5fd; }
    .ws-say:active { transform: translateY(2px); box-shadow: 0 1px 0 #c4b5fd; }
    .ws-big { font-size: clamp(1.2rem, 2.8vw, 1.5rem); }
    .ws-big .ws-fig svg { width: min(100%, 26rem); }
    .ws-big .ws-items:not(.ws-items-fig):not(.ws-items-1):not(.ws-items-2) { grid-template-columns: repeat(auto-fill, minmax(8.5em, 1fr)); }
    .ws-big .ws-items:not(.ws-items-2) > .ws-item { flex-wrap: nowrap; }
    .ws-big .ws-items-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .ws-big .ws-items-2 > .ws-item { white-space: normal; }
    @container (max-width: 560px) { .ws-big .ws-items-2 { grid-template-columns: 1fr; } }
    .ws-mt svg { display: block; margin: 0 auto; }
    .ws-items-fig { grid-template-columns: repeat(var(--fc, 3), minmax(0, 1fr)); gap: 0.8rem 1.2rem; }
    .ws-items-fig-1 { --fc: 1; } .ws-items-fig-2 { --fc: 2; }
    @container (max-width: 560px) { .ws-items-fig { --fc: 1; } }
    .ws-items-fig .ws-item { flex-direction: column; align-items: flex-start; white-space: normal; gap: 0.3rem; }
    .ws-ifig svg { display: block; width: 100%; max-width: 16rem; height: auto; }
    .ws-iline { display: flex; align-items: center; flex-wrap: wrap; gap: 0.35rem; }
    .ws-review { width: 100%; border: 2px dashed #fca5a5; border-radius: 0.8rem; padding: 0.8rem 1rem; box-sizing: border-box; margin-bottom: 0.6rem; }
    .ws-review-title { margin: 0 0 0.5rem; color: #dc2626; font-weight: 800; }
    .ws-review-list { display: flex; flex-wrap: wrap; gap: 0.6rem; }
    .ws-review-btn { border: none; background: #fff7ed; color: #9a3412; font: inherit; font-size: 0.95em; padding: 0.55rem 1rem; border-radius: 0.8rem; box-shadow: 0 4px 0 #fdba74; cursor: pointer; text-align: left; }
    .ws-review-btn:active { transform: translateY(3px); box-shadow: 0 1px 0 #fdba74; }
  `;
  document.head.appendChild(style);
}
