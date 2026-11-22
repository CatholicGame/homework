/**
 * Câu hỏi của 🏆 Đấu Trường Nhí TIẾNG ANH (subject.js 'en'). Ngân hàng soạn tay theo Tiếng Anh Global Success lớp 1–5:
 * bank/en/g<lớp>/kd.js (Khởi động), tt.js (Tăng tốc), vd.js (Về đích). Kiểm: `node scripts/dautruong-en-check.mjs`.
 *
 * Dòng soạn tay: { w, sk: 'nghe' | 'tu' | 'np' | 'doc', lv, t, q (chữ trên màn LED), say (MC đọc giọng Việt), en? (giọng Anh đọc
 * sau MC), hide? (câu nghe: `en` không hiện tới lúc lật), o: [đúng, bẫy, nhiễu, nhiễu] | 4 mảnh đúng thứ tự (k 'order'), ex, fig?,
 * tt? (Tăng tốc), pt? (Về đích) }.
 * Câu trả về giống câu Toán / Tiếng Việt (questions.js) cộng thêm m: 'en', sk, say, en, hide, mc (MC đọc: 0 anh Minh, 1 chị Mai).
 *
 * Tiến độ: chỉ câu có w ≤ số tuần đã học; nhóm nào còn ít câu quá (đầu năm) thì lấy cả năm. Khởi động / Về đích xoay vòng bốn kỹ
 * năng (Nghe → Từ vựng → Ngữ pháp → Đọc hiểu) để trận nào cũng đủ bốn kỹ năng.
 */
import { EN_SKILL, EN_SKILL_MC, EN_TT_TAG } from './subject.js';

const ROUND_BANKS = import.meta.glob('./bank/en/g*/*.js');
const SKILLS = ['nghe', 'tu', 'np', 'doc'];
const MIN_POOL = 6;

const rnd = (n) => Math.floor(Math.random() * n);
const pick = (a) => a[rnd(a.length)];
function shuffle(a) { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/** Dòng soạn tay → câu của game (xáo phương án; order: xáo các mảnh, a = thứ tự đúng). */
export function enFromRow(r) {
  const extra = { m: 'en', sk: r.sk, mc: EN_SKILL_MC[r.sk] ?? 0, level: r.lv, w: r.w, ex: r.ex, say: r.say, src: 'en',
    t: r.t || EN_SKILL[r.sk], ...(r.en ? { en: r.en } : {}), ...(r.hide ? { hide: true } : {}), ...(r.fig ? { fig: r.fig } : {}),
    ...(r.tt ? { tt: r.tt, tag: EN_TT_TAG[r.tt] } : {}), ...(r.pt ? { pt: r.pt } : {}) };
  if ((r.k || 'abcd') === 'order') {
    let o;
    for (let i = 0; i < 10; i++) { o = shuffle(r.o); if (o.join() !== r.o.join()) break; }
    return { kind: 'order', q: r.q, o, a: r.o.map(p => o.indexOf(p)), ...extra };
  }
  const o = shuffle(r.o);
  return { kind: 'abcd', q: r.q, o, a: o.indexOf(r.o[0]), trap: o.indexOf(r.o[1]), ...extra };
}

/* ---------- Câu Tăng tốc dự phòng (ngân hàng hết câu mới): xếp chữ cái thành từ ---------- */
const WORDS = {
  1: [['cat', '🐱'], ['dog', '🐶'], ['pen', '🖊️'], ['bag', '🎒'], ['red', '🟥'], ['sun', '☀️'], ['egg', '🥚'], ['bus', '🚌']],
  2: [['fish', '🐟'], ['duck', '🦆'], ['cake', '🍰'], ['milk', '🥛'], ['kite', '🪁'], ['book', '📕'], ['ball', '⚽'], ['frog', '🐸']],
  3: [['bird', '🐦'], ['door', '🚪'], ['desk', '🪑'], ['lion', '🦁'], ['bike', '🚲'], ['doll', '🪆'], ['nose', '👃'], ['hand', '✋']],
  4: [['rain', '🌧️'], ['snow', '❄️'], ['bear', '🐻'], ['star', '⭐'], ['corn', '🌽'], ['boat', '⛵'], ['shoe', '👟'], ['moon', '🌙']],
  5: [['wind', '🌬️'], ['tree', '🌳'], ['farm', '🚜'], ['ship', '🚢'], ['milk', '🥛'], ['lamp', '💡'], ['road', '🛣️'], ['rice', '🍚']],
};
export function enSpeedQ(type, grade = 3) {
  const [w, emo] = pick(WORDS[grade] || WORDS[3]);
  const letters = w.split('');
  let o;
  for (let i = 0; i < 10; i++) { o = shuffle(letters); if (o.join('') !== w) break; }
  // chữ cái trùng (doll, book): a lấy lần lượt từng vị trí
  const left = o.map((x, i) => i), a = letters.map(ch => left.splice(left.findIndex(i => o[i] === ch), 1)[0]);
  return { kind: 'order', m: 'en', sk: 'tu', mc: 0, tag: EN_TT_TAG.xep, t: 'Đánh vần', level: 2,
    q: 'Xếp các chữ cái thành từ đúng với hình.', say: 'Xếp các chữ cái thành từ đúng với hình.',
    fig: { type: 'tokens', row: [emo] }, o, a, ex: `Từ đúng là ${w}.` };
}

/**
 * Bộ câu tiếng Anh của lớp `grade` tới tuần `week`. Cùng giao diện với loadArenaBank (questions.js): one / speed / deck / avoid.
 * h: hàm dùng chung của questions.js (sổ câu đã gặp) truyền vào để không vòng import.
 */
export async function loadEnArenaBank(grade, week, h) {
  const load = (r) => Object.entries(ROUND_BANKS).find(([p]) => p.endsWith(`/g${grade}/${r}.js`))?.[1];
  const rowsOf = async (r) => { const l = load(r); return l ? (await l()).default || [] : []; };
  const [kdAll, ttAll, vdAll] = await Promise.all(['kd', 'tt', 'vd'].map(rowsOf));
  const R = { kd: kdAll, tt: ttAll, vd: vdAll };
  let seen = h.readSeen(grade);
  const others = {};
  const seenAt = (k) => { const x = h.qHash(k); return Math.max(seen[x] || 0, others[x] || 0); };
  const used = new Set();
  const keyOf = (r) => h.qKey(r);
  /** Dòng hợp tuần (w ≤ tuần đã học); quá ít thì cả năm. */
  const inWeek = (rows) => { const a = rows.filter(r => r.w <= week); return a.length >= MIN_POOL ? a : rows; };
  /** Một dòng chưa hỏi trong buổi, ưu tiên câu bé (và cả phòng) chưa gặp, rồi câu gặp lâu nhất; hết thì null. */
  function take(rows, { hard = false } = {}) {
    let pool = inWeek(rows).filter(r => !used.has(keyOf(r)));
    if (!pool.length) return null;
    const fresh = pool.filter(r => !seenAt(keyOf(r)));
    if (fresh.length) pool = fresh;
    else pool = [...pool].sort((a, b) => seenAt(keyOf(a)) - seenAt(keyOf(b))).slice(0, Math.max(1, Math.ceil(pool.length / 3)));
    const pref = pool.filter(r => (hard ? r.lv >= 3 : r.lv <= 3));
    const base = pref.length ? pref : pool;
    const recent = base.filter(r => r.w > week - 6 && r.w <= week);
    const r = pick(recent.length && Math.random() < 0.5 ? recent : base);
    used.add(keyOf(r));
    seen = h.markSeen(grade, [h.qHash(keyOf(r))]);
    return enFromRow(r);
  }
  let turn = rnd(SKILLS.length);
  /** Câu abcd của vòng `round` ('kd' | 'vd'), kỹ năng xoay vòng; Về đích lọc theo điểm câu. */
  function roundOne(kind, { round = 'kd', pt = 0, hard = false } = {}) {
    if (kind === 'order') return take(R.tt.filter(r => r.k === 'order')) || enSpeedQ('xep', grade);
    const rows = (R[round] || R.kd).filter(r => (r.k || 'abcd') === 'abcd' && (round !== 'vd' || !pt || r.pt === pt));
    for (let k = 0; k < SKILLS.length; k++) {
      const sk = SKILLS[(turn + k) % SKILLS.length];
      const q = take(rows.filter(r => r.sk === sk), { hard });
      if (q) { turn = (turn + k + 1) % SKILLS.length; return q; }
    }
    // hết câu của vòng: lấy ở vòng khác (Khởi động ↔ Về đích)
    const other = round === 'vd' ? R.kd : R.vd;
    return take(rows) || take(other.filter(r => (r.k || 'abcd') === 'abcd'), { hard });
  }
  const total = kdAll.length + ttAll.length + vdAll.length;
  return {
    grade, week, en: true, mathBai: 0, mathTotal: 0, tvWeek: week, hasTv: false, handCount: total,
    rounds: { kd: kdAll.length, tt: ttAll.length, vd: vdAll.length },
    avoid(list) {
      for (const it of String(list || '').split(',').slice(0, 800)) {
        const [x, t] = it.split(':');
        if (x && /^[0-9a-z]{1,8}$/.test(x)) others[x] = Math.max(others[x] || 0, (+t || 0) * 1000 || 1);
      }
    },
    one(kind, _m, opts = {}) { return roundOne(kind, { ...opts, round: opts.round || 'kd' }); },
    speed(type) { return take(R.tt.filter(r => r.tt === type)); },
    deck(kind, n, opts = {}) { return Array.from({ length: n }, () => roundOne(kind, opts)).filter(Boolean); },
  };
}
