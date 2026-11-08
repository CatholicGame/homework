/**
 * Câu hỏi của 🏆 Đấu Trường Nhí theo TIẾN ĐỘ HỌC của lớp: chỉ hỏi những bài các bạn đã học tới hôm nay.
 *
 * Tiến độ (schoolProgress): năm học bắt đầu thứ Hai đầu tiên từ ngày 5/9; số tuần đã học xong = số tuần trọn từ hôm đó.
 * Học kì I = 18 tuần. Toán: Bài đã học ≈ (số bài HK I của lớp, lấy từ lộ trình kiểm tra routeTests/g<lớp>/plan.js) × tuần / 18,
 * ví dụ lớp 3 ngày 07/11/2026: 8 tuần trọn → 44 × 8 / 18 ≈ Bài 19. Tiếng Việt: các bài có `week` ≤ số tuần đã học
 * (dữ liệu 🧰 Công cụ Tiếng Việt 2 / 3, mỗi bài ghi tuần học). Qua HK I thì lấy cả HK I (chưa có bộ câu HK II).
 *
 * Nguồn:
 * - Toán: câu trắc nghiệm 4 phương án (type 'mc', có `bai`) trong các đề Kiểm tra theo lộ trình lớp 1–5, bỏ câu có hình (fig) vì
 *   màn LED chỉ viết chữ. Sắp xếp (Tăng tốc): sinh 4 số trong phạm vi số của lớp.
 * - Tiếng Việt: sinh từ dữ liệu từng bài của 🧰 Công cụ Tiếng Việt lớp 2 / 3 (nhóm từ, tìm từ trong câu, nối vế câu, dấu câu,
 *   ghép câu 4 mảnh). Lớp 1, 4, 5 chưa có dữ liệu Tiếng Việt theo bài: vòng thi chỉ có Toán (ghi rõ trên màn chờ).
 *
 * - Ngân hàng soạn tay src/dauTruong/bank/g<lớp>.js (mọi lớp 1–5, Toán + Tiếng Việt, nhiều chủ đề): mỗi câu ghi tuần học `w`
 *   (1–35, cả HK II), chỉ hỏi câu có w ≤ số tuần đã học. Trộn với hai nguồn trên; lớp 1, 4, 5 có Tiếng Việt nhờ ngân hàng này.
 *   Kiểm tra: `node scripts/dautruong-check.mjs`.
 *
 * Câu Tăng tốc (speedQ) có thêm `tag`: Dãy số, Dãy hình, Sắp xếp, Tư duy, Suy luận hình ảnh.
 * Câu trả về: abcd { kind: 'abcd', m: 'toan'|'tv', q, o: [4], a: chỉ số đúng } | order { kind: 'order', m, q, o: [4], a: [thứ tự đúng] }.
 */

const TESTS = import.meta.glob('../data/routeTests/g*/{nh,th,gk,ck}*.js');
const PLANS = import.meta.glob('../data/routeTests/g*/plan.js');
const TV_DATA = {
  2: import.meta.glob('../games/tv2Tools/data/cd*.js'),
  3: import.meta.glob('../games/tv3Tools/data/cd*.js'),
};
const BANKS = import.meta.glob('./bank/g*.js');
/* Ngân hàng HK I theo vòng thi: bank/hk1/g<lớp>/kd.js (Khởi động), tt.js (Tăng tốc), vd.js (Về đích). */
const ROUND_BANKS = import.meta.glob('./bank/hk1/g*/*.js');
const TT_TAG = { seq: 'Dãy số', shape: 'Dãy hình', facts: 'Sắp xếp', logic: 'Tư duy' };
const HK1_WEEKS = 18;

/** Thứ Hai đầu tiên từ ngày 5/9 của năm học chứa `date`. */
function yearStart(date) {
  const y = date.getMonth() >= 7 ? date.getFullYear() : date.getFullYear() - 1; // từ tháng 8 tính là năm học mới
  const d = new Date(y, 8, 5);
  while (d.getDay() !== 1) d.setDate(d.getDate() + 1);
  return d;
}

/** Số tuần học trọn tới `date` (tối thiểu 1 để luôn có câu). Hè (tháng 6–8 trước khai giảng) coi như cả năm. */
export function weeksDone(date = new Date()) {
  const m = date.getMonth();
  if (m >= 5 && m <= 7 && date < yearStart(date)) return 35;
  const days = Math.floor((date - yearStart(date)) / 864e5);
  return Math.max(1, Math.floor(days / 7));
}

const rnd = (n) => Math.floor(Math.random() * n);
const pick = (a) => a[rnd(a.length)];
function shuffle(a) { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const uniq = (a) => [...new Set(a)];
const fmt = (n) => (n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(n));
/** Câu abcd từ đáp án đúng và 3 nhiễu: xáo, ghi chỉ số đúng. */
function abcd(m, q, right, wrong) {
  const o = shuffle([right, ...wrong.slice(0, 3)]);
  return { kind: 'abcd', m, q, o, a: o.indexOf(right) };
}
const clean = (s) => String(s).replace(/\{(\d+)\/(\d+)\}/g, '$1/$2').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/* ---------- Toán ---------- */
async function mathPool(grade, uptoBai) {
  const out = [], seen = new Set();
  const files = Object.entries(TESTS).filter(([p]) => p.includes(`/g${grade}/`));
  const mods = await Promise.all(files.map(([, load]) => load()));
  for (const mod of mods) for (const part of mod.default?.parts || []) for (const q of part.questions || []) {
    if (q.type !== 'mc' || q.fig || q.options?.length !== 4 || !q.options.every(o => typeof o === 'string')) continue;
    const bai = Math.max(...[].concat(q.bai).map(Number).filter(Number.isFinite));
    if (!(bai <= uptoBai)) continue;
    const text = clean(q.prompt);
    const opts = q.options.map(clean);
    if (!text || opts.some(o => !o) || new Set(opts).size !== 4 || seen.has(text + q.options.join('|'))) continue;
    seen.add(text + q.options.join('|'));
    const right = clean(q.options[q.ans]);
    out.push({ ...abcd('toan', text, right, q.options.filter((_, i) => i !== q.ans).map(clean)), level: q.level || 1, bai });
  }
  return out;
}
/** Sắp xếp 4 số từ bé đến lớn (hoặc lớn đến bé) trong phạm vi số của lớp, các số gần nhau, dễ nhầm. */
function mathOrder(grade) {
  const top = { 1: 10, 2: 100, 3: 1000, 4: 100000, 5: 100000 }[grade] || 1000;
  const lo = grade === 1 ? 0 : Math.ceil(top / 10);
  const xs = new Set();
  if (grade === 1) { while (xs.size < 4) xs.add(rnd(11)); } else {
    // đảo chữ số của một số (dễ nhầm), đảo không đủ thì thêm số gần nó
    const base = lo + rnd(top - lo);
    const digits = String(base).split('');
    xs.add(base);
    for (let k = 0; xs.size < 4 && k < 40; k++) {
      const d = shuffle(digits).join('');
      if (d[0] !== '0' && +d >= lo && +d < top) xs.add(+d);
    }
    while (xs.size < 4) xs.add(Math.min(top - 1, Math.max(lo, base + (rnd(2) ? 1 : -1) * (1 + rnd(Math.max(9, top / 20))))));
  }
  const o = shuffle([...xs].slice(0, 4));
  const up = Math.random() < 0.6;
  const sorted = [...o].sort((a, b) => (up ? a - b : b - a));
  return { kind: 'order', m: 'toan', q: `Xếp các số theo thứ tự từ ${up ? 'bé đến lớn' : 'lớn đến bé'}`, o: o.map(fmt), a: sorted.map(v => o.indexOf(v)) };
}

/* ---------- Tiếng Việt ---------- */
const KIND = { sv: 'sự vật', hd: 'hoạt động', dd: 'đặc điểm' };
const MARKS = { 2: ['.', '?', '!', ','], 3: ['.', '?', '!', ',', ':'] };
const MARK_NAME = { '.': 'dấu chấm (.)', '?': 'dấu chấm hỏi (?)', '!': 'dấu chấm than (!)', ',': 'dấu phẩy (,)', ':': 'dấu hai chấm (:)' };

async function tvLessons(grade, week) {
  const src = TV_DATA[grade];
  if (!src) return [];
  const mods = await Promise.all(Object.values(src).map(load => load()));
  return mods.flatMap(m => m.default).filter(l => l.week <= week);
}
function tvPool(lessons) {
  const P = { kinds: { sv: [], hd: [], dd: [] }, find: [], match: [], punct: [], build: [] };
  for (const l of lessons) {
    for (const c of Object.keys(P.kinds)) P.kinds[c].push(...(l.kinds?.[c] || []));
    for (const k of ['find', 'match', 'punct', 'build']) P[k].push(...(l[k] || []));
  }
  for (const c of Object.keys(P.kinds)) P.kinds[c] = uniq(P.kinds[c]);
  return P;
}
/** Một từ chỉ được thuộc một nhóm: bỏ các từ nằm ở hai nhóm (dữ liệu nhiều bài gộp lại). */
function kindOf(P, w) { return Object.keys(P.kinds).filter(c => P.kinds[c].includes(w)); }

const TV_MAKERS = {
  kinds(P) {
    const cs = Object.keys(P.kinds).filter(c => P.kinds[c].some(w => kindOf(P, w).length === 1));
    if (cs.length < 2) return null;
    const c = pick(cs);
    const right = pick(P.kinds[c].filter(w => kindOf(P, w).length === 1));
    const others = shuffle(Object.keys(P.kinds).filter(x => x !== c).flatMap(x => P.kinds[x]).filter(w => kindOf(P, w).length === 1 && w !== right));
    if (others.length < 3) return null;
    return abcd('tv', `Từ nào là từ chỉ ${KIND[c]}?`, right, uniq(others).slice(0, 3));
  },
  find(P) {
    if (!P.find.length) return null;
    const it = pick(P.find);
    const toks = it.s.split(/\s+/).map(t => t.replace(/[.,!?:;"“”]/g, '')).filter(Boolean);
    const starred = toks.filter(t => t.includes('*')).map(t => t.replace(/\*/g, '').replace(/_/g, ' '));
    // nhiễu: các từ khác trong câu, bỏ từ một chữ cái và từ viết hoa (tên riêng như "Chi", "Sơn" cũng là từ chỉ sự vật)
    const plain = uniq(toks.filter(t => !t.includes('*') && t.length > 1 && !/^\p{Lu}/u.test(t)).map(t => t.replace(/_/g, ' ')));
    if (!starred.length || plain.length < 3) return null;
    const sentence = it.s.replace(/\*/g, '').replace(/_/g, ' ');
    return abcd('tv', `Trong câu “${sentence}”, từ nào chỉ ${KIND[it.k]}?`, pick(starred), shuffle(plain).filter(w => !starred.includes(w)).slice(0, 3));
  },
  match(P) {
    if (P.match.length < 4) return null;
    const [a, b] = pick(P.match);
    const others = shuffle(uniq(P.match.filter(x => x[1] !== b && x[0] !== a).map(x => x[1])));
    if (others.length < 3) return null;
    return abcd('tv', `Chọn từ ngữ thích hợp để tạo thành câu: ${a} …`, b, others);
  },
  punct(P, grade) {
    const ones = P.punct.filter(s => (s.match(/\{/g) || []).length === 1);
    if (!ones.length) return null;
    const s = pick(ones);
    const mk = s.match(/\{([^}]+)\}/)[1];
    const marks = MARKS[grade] || MARKS[3];
    if (!marks.includes(mk)) return null;
    const q = `Chọn dấu câu thích hợp điền vào chỗ trống: ${s.replace(/\{[^}]+\}/, ' …')}`;
    return abcd('tv', q, MARK_NAME[mk], shuffle(marks.filter(x => x !== mk)).map(x => MARK_NAME[x]));
  },
};
function tvOrder(P) {
  const four = P.build.filter(s => s.split(' / ').length === 4);
  if (!four.length) return null;
  const pieces = pick(four).split(' / ').map(s => s.trim());
  let o;
  for (let k = 0; k < 10; k++) { o = shuffle(pieces); if (o.join() !== pieces.join()) break; }
  return { kind: 'order', m: 'tv', q: 'Xếp thành câu đúng', o, a: pieces.map(p => o.indexOf(p)) };
}

/* ---------- Ngân hàng soạn tay ---------- */
/** Câu soạn tay → câu hỏi của game (xáo phương án). Giữ các trường phụ: hình, lời đọc, nhãn Tăng tốc, điểm Về đích, bẫy (o[1]). */
function fromRow(r, src) {
  const k = r.k || 'abcd';
  const extra = { level: r.lv, w: r.w, ex: r.ex, src, ...(r.fig ? { fig: r.fig } : {}), ...(r.say ? { say: r.say } : {}),
    ...(r.tt ? { tt: r.tt, tag: r.tag || TT_TAG[r.tt] } : {}), ...(r.pt ? { pt: r.pt } : {}) };
  if (k === 'order') {
    let o;
    for (let i = 0; i < 10; i++) { o = shuffle(r.o); if (o.join() !== r.o.join()) break; }
    return { kind: 'order', m: r.m, q: r.q, o, a: r.o.map(p => o.indexOf(p)), ...extra };
  }
  const q = abcd(r.m, r.q, r.o[0], r.o.slice(1));
  return { ...q, trap: q.o.indexOf(r.o[1]), ...extra };   // trap: nhiễu dễ mắc nhất (sau này cho NPC chọn sai)
}
async function handBank(grade, week) {
  const load = Object.entries(BANKS).find(([p]) => p.endsWith(`/g${grade}.js`))?.[1];
  if (!load) return [];
  const rows = (await load()).default || [];
  return rows.filter(r => r.w <= week);
}
/** Ngân hàng HK I của một vòng ('kd' | 'tt' | 'vd'), chỉ các câu đã học (w ≤ tuần, HK II thì cả HK I). */
async function roundBank(grade, round, week) {
  const load = Object.entries(ROUND_BANKS).find(([p]) => p.endsWith(`/g${grade}/${round}.js`))?.[1];
  if (!load) return [];
  const rows = (await load()).default || [];
  return rows.filter(r => r.w <= Math.min(week, HK1_WEEKS));
}

/* ---------- Tăng tốc: câu tư duy (sinh theo lớp, không cần dữ liệu bài học) ----------
   seq: dãy số; shape: dãy hình (hình màu); facts: sắp xếp dữ kiện (order); logic: tư duy bằng lời hoặc suy luận hình ảnh
   (phép tính bằng hình quả). Mọi câu có `tag` để màn LED ghi dạng câu thay cho tên môn. */
const NAMES4 = ['An', 'Bình', 'Chi', 'Dũng', 'Hoa', 'Lan', 'Minh', 'Nam', 'Mai', 'Tú'];
const DAYS = ['thứ Hai', 'thứ Ba', 'thứ Tư', 'thứ Năm', 'thứ Sáu', 'thứ Bảy', 'Chủ nhật'];
const SHAPES = ['🔴', '🔺', '🟦', '⭐', '🟢', '🟨', '🔷', '💜'];
const FRUITS = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍐'];
/** 3 nhiễu khác nhau, khác đáp án, dương (thiếu thì lấy số sát đáp án). */
function nears(right, cands) {
  const out = uniq(cands.filter(x => Number.isFinite(x) && x > 0 && x !== right));
  for (let d = 1; out.length < 3; d++) for (const x of [right + d, right - d]) if (x > 0 && !out.includes(x) && out.length < 3) out.push(x);
  return out.slice(0, 3).map(fmt);
}
const SPEED = {
  seq(g) {
    const rules = ['add', 'sub'];
    if (g >= 2) rules.push('add', 'skip');
    if (g >= 3) rules.push('mul', 'grow', 'skip');
    if (g >= 4) rules.push('mul', 'grow');
    const r = pick(rules);
    const cap = { 1: 20, 2: 100, 3: 1000 }[g] || 10000;
    const xs = [];
    if (r === 'add' || r === 'sub') {
      const d = g === 1 ? pick([1, 2]) : g === 2 ? pick([2, 3, 4, 5, 10]) : pick([3, 4, 6, 7, 9, 11, 25, 50, 100].filter(v => v * 8 < cap));
      const start = r === 'add' ? 1 + rnd(Math.max(2, cap - d * 6)) : d * 6 + rnd(Math.max(2, cap - d * 6));
      for (let k = 0; k < 6; k++) xs.push(r === 'add' ? start + k * d : start - k * d);
    } else if (r === 'skip') {            // xen kẽ: +a, +b, +a, +b…
      const d = 1 + rnd(5), e = d + 1 + rnd(5);
      xs.push(1 + rnd(20));
      for (let k = 1; k < 6; k++) xs.push(xs[k - 1] + (k % 2 ? d : e));
    } else if (r === 'mul') {             // gấp lên 2 hoặc 3 lần
      const d = g >= 4 && Math.random() < 0.4 ? 3 : 2;
      xs.push(1 + rnd(3));
      for (let k = 1; k < 6; k++) xs.push(xs[k - 1] * d);
    } else {                              // khoảng cách tăng dần: +1, +2, +3…
      xs.push(1 + rnd(10));
      const d = 1 + rnd(2);
      for (let k = 1; k < 6; k++) xs.push(xs[k - 1] + d + k - 1);
    }
    const right = xs.pop();
    const last = xs[xs.length - 1], prev = xs[xs.length - 2], step = right - last;
    const q = `Số tiếp theo của dãy: ${xs.map(fmt).join(', ')}, … là số nào?`;
    return { ...abcd('toan', q, fmt(right), nears(right, [last + (last - prev), right + 1, right - 1, right + Math.abs(step)])), tag: 'Dãy số' };
  },
  shape(g) {
    if (Math.random() < 0.3) {            // dãy tăng dần số hình: ⭐ · ⭐⭐ · ⭐⭐⭐ · ?
      const s = pick(SHAPES), a = 1, st = g === 1 ? 1 : pick([1, 2]);
      const row = (n) => s.repeat(n);
      const xs = [a, a + st, a + 2 * st], right = a + 3 * st;
      const others = uniq([right - st, right + 1, right + st, right - 1, right + 2, right - 2].filter(n => n > 0 && n !== right)).slice(0, 3);
      return { ...abcd('toan', `Hình tiếp theo là gì? ${xs.map(row).join(' · ')} · ?`, row(right), others.map(row)), tag: 'Dãy hình' };
    }
    const len = g === 1 ? 2 + rnd(2) : 2 + rnd(3);
    const unit = shuffle(SHAPES).slice(0, len);
    if (len === 4 && Math.random() < 0.5) unit[3] = unit[1];   // mẫu có hình lặp (🔴 🔺 🟦 🔺) khó hơn
    const shown = 7 + rnd(3);
    const seq = Array.from({ length: shown }, (_, k) => unit[k % len]);
    const right = unit[shown % len];
    // nhiễu: các hình có trong dãy trước, thiếu thì thêm hình khác
    const others = uniq([...shuffle(unit.filter(x => x !== right)), ...shuffle(SHAPES.filter(x => x !== right))]);
    return { ...abcd('toan', `Hình tiếp theo là hình nào? ${seq.join(' ')} ?`, right, others.slice(0, 3)), tag: 'Dãy hình' };
  },
  facts(g) {
    const [adj, rev, low, high] = pick([['cao', 'thấp', 'thấp', 'cao'], ['nặng', 'nhẹ', 'nhẹ', 'nặng'], ['nhiều tuổi', 'ít tuổi', 'ít tuổi', 'nhiều tuổi']]);
    const ppl = shuffle(NAMES4).slice(0, 4);           // ppl[0] < ppl[1] < ppl[2] < ppl[3]
    const facts = [[1, 0], [2, 1], [3, 2]].map(([x, y]) => (g < 2 || Math.random() < 0.5 ? `${ppl[x]} ${adj} hơn ${ppl[y]}.` : `${ppl[y]} ${rev} hơn ${ppl[x]}.`));
    const up = Math.random() < 0.5;
    const o = shuffle(ppl);
    const want = up ? ppl : [...ppl].reverse();
    return { kind: 'order', m: 'toan', tag: 'Sắp xếp', q: `${shuffle(facts).join(' ')} Xếp các bạn từ ${up ? low : high} nhất đến ${up ? high : low} nhất.`, o, a: want.map(n => o.indexOf(n)) };
  },
  logic(g) {
    const kinds = ['fruit', 'day', 'tall'];
    if (g >= 2) kinds.push('legs', 'age', 'fruit');
    const k = pick(kinds);
    if (k === 'fruit') {                  // suy luận hình ảnh: 🍎 + 🍎 = 10, 🍎 + 🍌 = 8, 🍌 = ?
      const [f1, f2] = shuffle(FRUITS);
      const top = g === 1 ? 5 : g === 2 ? 20 : 50;
      const a = 2 + rnd(top - 1), b = 1 + rnd(top);
      const mul = g >= 3 && Math.random() < 0.4;
      const q = `Nhìn hình rồi tính: ${f1} ${mul ? '× 3' : `+ ${f1}`} = ${mul ? 3 * a : 2 * a}. ${f1} + ${f2} = ${a + b}. Vậy ${f2} = ?`;
      return { ...abcd('toan', q, fmt(b), nears(b, [a, a + b, Math.abs(2 * a - b), b + 2])), tag: 'Suy luận hình ảnh' };
    }
    if (k === 'day') {
      const t = rnd(7), n = g === 1 ? 1 + rnd(3) : 2 + rnd(g >= 3 ? 12 : 5), back = g >= 2 && Math.random() < 0.3;
      const right = DAYS[((t + (back ? -n : n)) % 7 + 7) % 7];
      const q = `Hôm nay là ${DAYS[t]}. ${back ? `${n} ngày trước` : `${n} ngày nữa`} là thứ mấy?`;
      return { ...abcd('toan', q, right, shuffle(DAYS.filter(d => d !== right))), tag: 'Tư duy' };
    }
    if (k === 'tall') {
      const ppl = shuffle(NAMES4).slice(0, 4), max = Math.random() < 0.5;
      const facts = shuffle([`${ppl[1]} cao hơn ${ppl[0]}.`, `${ppl[2]} cao hơn ${ppl[1]}.`, `${ppl[3]} cao hơn ${ppl[2]}.`]);
      const right = max ? ppl[3] : ppl[0];
      return { ...abcd('toan', `${facts.join(' ')} Ai ${max ? 'cao' : 'thấp'} nhất?`, right, shuffle(ppl.filter(x => x !== right))), tag: 'Tư duy' };
    }
    if (k === 'legs') {
      const ga = 2 + rnd(5), cho = 1 + rnd(4), right = ga * 2 + cho * 4;
      return { ...abcd('toan', `Trong sân có ${ga} con gà và ${cho} con chó. Tất cả có bao nhiêu cái chân?`, fmt(right), nears(right, [(ga + cho) * 2, (ga + cho) * 4, ga * 4 + cho * 2])), tag: 'Tư duy' };
    }
    const em = 5 + rnd(4), hon = 2 + rnd(6), sau = 1 + rnd(4), right = em + hon + sau;
    return { ...abcd('toan', `Năm nay em ${em} tuổi, anh hơn em ${hon} tuổi. ${sau} năm nữa anh bao nhiêu tuổi?`, fmt(right), nears(right, [em + hon, em + sau, right + sau])), tag: 'Tư duy' };
  },
};
/** Một câu Tăng tốc dạng `type` (seq | shape | facts | logic) cho lớp `grade`. */
export function speedQ(type, grade = 3) {
  return (SPEED[type] || SPEED.seq)(grade >= 1 && grade <= 5 ? grade : 3);
}

/**
 * Bộ câu của một lớp tới hôm nay. Trả { grade, week, mathBai, mathTotal, hasTv, deck(kind, n, opts) }.
 * deck(kind, n): n câu xen kẽ Toán / Tiếng Việt (câu lẻ Toán), không lặp câu đã hỏi trong buổi; thiếu Tiếng Việt thì lấy Toán.
 * opts.hard: ưu tiên câu mức 2–3 (Về đích).
 */
export async function loadArenaBank(grade, date = new Date()) {
  grade = grade >= 1 && grade <= 5 ? grade : 3;
  const week = weeksDone(date);
  const planMod = Object.entries(PLANS).find(([p]) => p.includes(`/g${grade}/`));
  const plan = planMod ? (await planMod[1]()).PLAN : null;
  const total = Math.max(...(plan?.cuoiki || []).map(c => +String(c.units).split('-')[1]).filter(Number.isFinite), 30);
  const mathBai = Math.min(total, Math.max(3, Math.floor(total * Math.min(week, HK1_WEEKS) / HK1_WEEKS)));
  const math = await mathPool(grade, mathBai);
  const tvWeek = Math.max(1, Math.min(week, HK1_WEEKS));
  const P = tvPool(await tvLessons(grade, tvWeek));
  const handRows = await handBank(grade, Math.min(35, week));
  const hand = handRows.map(r => fromRow(r, 'year'));
  const [kdRows, ttRows, vdRows] = await Promise.all(['kd', 'tt', 'vd'].map(r => roundBank(grade, r, week)));
  const R = { kd: kdRows, tt: ttRows, vd: vdRows };
  const rowKey = (r) => r.q + '|' + [...r.o].sort().join('|');
  /* Câu máy này đã gặp trong 7 ngày (mỗi ngày một buổi thi): ưu tiên câu chưa gặp, hết câu mới mới lấy lại câu cũ. */
  const SEEN_KEY = `dt-seen-v1-g${grade}`, SEEN_MS = 7 * 864e5, now = Date.now();
  let seen = {};
  try { seen = JSON.parse(localStorage.getItem(SEEN_KEY)) || {}; } catch { /* không có bộ nhớ: không nhớ */ }
  for (const k of Object.keys(seen)) if (!(now - seen[k] < SEEN_MS)) delete seen[k];
  const hashOf = (t) => { let h = 5381; for (let i = 0; i < t.length; i++) h = (h * 33 + t.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };
  const fresh = (pool, kf) => { const f = pool.filter(x => !seen[hashOf(kf(x))]); return f.length ? f : pool; };
  function markSeen(k) {
    seen[hashOf(k)] = now;
    try { localStorage.setItem(SEEN_KEY, JSON.stringify(seen)); } catch { /* bộ nhớ bị chặn */ }
  }
  /** Một câu chưa hỏi trong các dòng soạn tay `rows`, lọc thêm bằng `ok`; ưu tiên tuần gần đây; hết thì null. */
  function fromRows(rows, ok = () => true, src = 'hk1') {
    const pool = fresh(rows.filter(r => ok(r) && !used.has(rowKey(r))), rowKey);
    if (!pool.length) return null;
    const recent = pool.filter(r => r.w > Math.min(week, HK1_WEEKS) - 5);
    const r = pick(recent.length && Math.random() < 0.5 ? recent : pool);
    used.add(rowKey(r)); markSeen(rowKey(r));
    return fromRow(r, src);
  }
  const H = {
    toan: hand.filter(q => q.m === 'toan' && q.kind === 'abcd'), tv: hand.filter(q => q.m === 'tv' && q.kind === 'abcd'),
    toanOrder: hand.filter(q => q.m === 'toan' && q.kind === 'order'), tvOrder: hand.filter(q => q.m === 'tv' && q.kind === 'order'),
  };
  const hasTv = !!TV_DATA[grade] || H.tv.length > 0;
  const used = new Set();
  const key = (q) => q.q + '|' + [...q.o].sort().join('|');
  /** Một câu chưa hỏi trong `list`, ưu tiên mức khó / dễ và các tuần gần đây; hết câu thì null. */
  function fromHand(list, hard) {
    const pool = fresh(list.filter(q => !used.has(key(q))), key);
    if (!pool.length) return null;
    const pref = pool.filter(q => (hard ? q.level >= 2 : q.level <= 2));
    const base = pref.length ? pref : pool;
    const recent = base.filter(q => q.w > week - 6);
    return pick(recent.length && Math.random() < 0.5 ? recent : base);
  }

  function tvAbcd(hard) {
    // câu soạn tay đa dạng hơn câu sinh từ công cụ: lấy trước khi còn (lớp 1, 4, 5 chỉ có nguồn này)
    if (H.tv.length && (!TV_DATA[grade] || Math.random() < 0.65)) { const q = fromHand(H.tv, hard); if (q) return q; }
    for (let k = 0; k < 30; k++) {
      const make = TV_MAKERS[pick(Object.keys(TV_MAKERS))];
      const q = make(P, grade);
      if (q && !used.has(key(q))) return q;
    }
    return null;
  }
  function mathAbcd(hard) {
    if (H.toan.length && Math.random() < 0.5) { const q = fromHand(H.toan, hard); if (q) return q; }
    let pool = math.filter(q => !used.has(key(q)));
    if (!pool.length) { used.clear(); pool = math; }
    if (!pool.length) return null;
    pool = fresh(pool, key);
    const pref = pool.filter(q => (hard ? q.level >= 2 : q.level <= 2));
    // ưu tiên các bài gần đây hơn một chút (nửa sau của khoảng đã học) để câu không toàn bài đầu năm
    const recent = (pref.length ? pref : pool).filter(q => q.bai > mathBai / 2);
    return pick(recent.length && Math.random() < 0.6 ? recent : (pref.length ? pref : pool));
  }
  function one(kind, m, hard) {
    let q = null;
    if (kind === 'order') {
      const hl = m === 'tv' ? H.tvOrder : H.toanOrder;
      if (hl.length && Math.random() < 0.7) q = fromHand(hl, hard);
      if (!q) q = m === 'tv' ? tvOrder(P) : mathOrder(grade);
    } else q = m === 'tv' ? tvAbcd(hard) : mathAbcd(hard);
    if (!q && m === 'tv') q = kind === 'order' ? mathOrder(grade) : mathAbcd(hard);
    if (q) { used.add(key(q)); markSeen(key(q)); }
    return q;
  }
  /** Khởi động / Về đích: ngân hàng của vòng trước (75%), rồi các nguồn chung. Về đích lọc theo điểm câu (pt 10 / 20 / 30). */
  function roundOne(kind, m, { round, pt, hard }) {
    const rows = R[round] || [];
    if (rows.length && Math.random() < 0.75) {
      const want = (r) => (r.k || 'abcd') === kind && (round !== 'vd' || !pt || r.pt === pt);
      const q = fromRows(rows, r => want(r) && r.m === m) || fromRows(rows, want);
      if (q) return q;
    }
    return one(kind, m, hard);
  }
  return {
    grade, week, mathBai, mathTotal: total, tvWeek, hasTv: hasTv || [...kdRows, ...vdRows].some(r => r.m === 'tv'),
    handCount: hand.length + kdRows.length + ttRows.length + vdRows.length,
    rounds: { kd: kdRows.length, tt: ttRows.length, vd: vdRows.length },
    /** Một câu kind / môn m (thiếu Tiếng Việt thì Toán). opts.round 'kd' | 'vd' lấy trước từ ngân hàng của vòng ấy. */
    one(kind, m, { hard = false, round = null, pt = 0 } = {}) { return round ? roundOne(kind, m, { round, pt, hard }) : one(kind, m, hard); },
    /** Câu Tăng tốc dạng `type` (seq | shape | facts | logic) từ ngân hàng tt.js; chưa có thì null (game dùng speedQ). */
    speed(type) { return fromRows(R.tt, r => r.tt === type, 'hk1'); },
    deck(kind, n, { hard = false } = {}) {
      return Array.from({ length: n }, (_, i) => one(kind, i % 2 === 0 ? 'toan' : 'tv', hard)).filter(Boolean);
    },
  };
}
