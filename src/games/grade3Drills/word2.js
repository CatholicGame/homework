/**
 * 📝 Bài toán giải bằng hai bước tính (Toán 3 KNTT Bài 28, dùng cả năm).
 * Đề ngắn + sơ đồ đoạn thẳng đúng tỉ lệ; phần "Bài giải" viết như trong vở, hai dòng giữ chỗ sẵn từ đầu lượt:
 *   Số vở của Lan là:        25 + 8 = 33 (quyển)
 *   Cả hai bạn có số vở là:  25 + 33 = 58 (quyển)
 *   Đáp số: 58 quyển
 * Mỗi bước: em chọn phép tính (2–3 nút to, nút sai là lỗi hay gặp), phép tính bay xuống dòng bài giải, em gõ kết quả.
 * Kết quả bước 1 bay lên sơ đồ (dấu "?" nhỏ) và bay vào phép tính của bước 2: em thấy số vừa tìm được dùng lại.
 * Xong: dòng Đáp số, dấu "?" lớn trên sơ đồ hiện đáp số.
 */

import { mountDrill, shake, setActive, setUse, flyDigit, fmt, fresh, flyOne, sfx, sleep, how, cap, TEACHER, INK, MINUS } from './kit.js';

const NAMES = ['Mai', 'Lan', 'Nam', 'Hùng', 'Hoa', 'An', 'Minh', 'Bình', 'Linh', 'Khoa'];
const COL = { a: '#60A5FA', b: '#F472B6', x: '#FACC15' };
const FRAC = (t) => `<span class="w2-frac"><i>1</i><i>${t}</i></span>`;
const OPNAME = { '+': 'cộng', [MINUS]: 'trừ', '×': 'nhân', ':': 'chia' };
const between = (rng, [lo, hi]) => rng.int(lo, hi);

// ── Bối cảnh "hai bên so sánh" (nhiều hơn, ít hơn, gấp, giảm) ─────────────────────────────────────────
// make(rng, rel) → { dA, dB (tên trên sơ đồ), unit, dunit, more, less, sA(x), rel(x), qT, lT, qH(bigB), lH(bigB), l1, nums }
const ITEMS = [
  { u: 'quyển vở', n: 'vở', s: 'quyển' }, { u: 'viên bi', n: 'bi', s: 'viên' }, { u: 'bông hoa', n: 'hoa', s: 'bông' },
  { u: 'con tem', n: 'tem', s: 'con' }, { u: 'quả táo', n: 'táo', s: 'quả' }, { u: 'cái nhãn vở', n: 'nhãn vở', s: 'cái' },
];
const PAIRS = [
  { id: 'items', rels: ['hon', 'kem', 'gap', 'giam'], make(rng, rel) {
    const [A, B] = rng.shuffle(NAMES).slice(0, 2);
    const { u, n, s } = rng.pick(ITEMS);
    const nums = { hon: { a: [15, 65], d: [3, 19] }, kem: { a: [25, 70], d: [3, 15] }, gap: { a: [4, 20], t: [2, 5] }, giam: { v: [3, 15], t: [2, 5] } }[rel];
    return {
      dA: A, dB: B, unit: s, dunit: s, more: 'nhiều hơn', less: 'ít hơn', nums,
      sA: (x) => `${A} có <b>${x}</b> ${u}.`,
      rel: (x) => ({
        hon: `${B} có <b>nhiều hơn</b> ${A} <b>${x}</b> ${u}.`, kem: `${B} có <b>ít hơn</b> ${A} <b>${x}</b> ${u}.`,
        gap: `Số ${u} của ${B} <b>gấp ${x} lần</b> số ${u} của ${A}.`, giam: `Số ${u} của ${B} bằng số ${u} của ${A} <b>giảm đi ${x} lần</b>.`,
      })[rel],
      qT: `Hỏi <b>cả hai bạn</b> có bao nhiêu ${u}?`, lT: `Cả hai bạn có số ${n} là`,
      qH: (bigB) => `Hỏi ${bigB ? B : A} có <b>nhiều hơn</b> ${bigB ? A : B} bao nhiêu ${u}?`,
      lH: (bigB) => `${bigB ? B : A} có nhiều hơn ${bigB ? A : B} số ${n} là`,
      l1: `Số ${n} của ${B} là`,
    };
  } },
  { id: 'kg', rels: ['hon', 'kem', 'gap', 'giam'], make(rng, rel) {
    // Cân nặng thật: lợn 55–95 kg, dê 25–40 kg; gà 2–3 kg, ngỗng gấp 2–4 lần; mèo 3–5 kg, chó gấp 3–6 lần.
    const P = {
      hon: [['lợn đen', 'lợn trắng', { a: [55, 95], d: [5, 15] }], ['dê đen', 'dê trắng', { a: [25, 40], d: [3, 9] }]],
      kem: [['lợn đen', 'lợn trắng', { a: [60, 95], d: [5, 15] }], ['dê đen', 'dê trắng', { a: [28, 40], d: [3, 9] }]],
      gap: [['gà', 'ngỗng', { a: [2, 3], t: [2, 4] }], ['mèo', 'chó', { a: [3, 5], t: [3, 6] }], ['thỏ', 'dê', { a: [3, 4], t: [6, 9] }]],
      giam: [['chó', 'mèo', { v: [3, 5], t: [3, 6] }], ['ngỗng', 'gà', { v: [2, 3], t: [2, 4] }]],
    }[rel];
    const [A, B, nums] = rng.pick(P);
    return {
      dA: cap(A), dB: cap(B), unit: 'kg', dunit: 'kg', more: 'nặng hơn', less: 'nhẹ hơn', nums,
      sA: (x) => `Con ${A} cân nặng <b>${x} kg</b>.`,
      rel: (x) => ({
        hon: `Con ${B} <b>nặng hơn</b> con ${A} <b>${x} kg</b>.`, kem: `Con ${B} <b>nhẹ hơn</b> con ${A} <b>${x} kg</b>.`,
        gap: `Con ${B} cân nặng <b>gấp ${x} lần</b> con ${A}.`, giam: `Cân nặng của con ${B} bằng cân nặng của con ${A} <b>giảm đi ${x} lần</b>.`,
      })[rel],
      qT: 'Hỏi <b>cả hai con</b> cân nặng bao nhiêu ki-lô-gam?', lT: 'Cả hai con cân nặng là',
      qH: (bigB) => `Hỏi con ${bigB ? B : A} <b>nặng hơn</b> con ${bigB ? A : B} bao nhiêu ki-lô-gam?`,
      lH: (bigB) => `Con ${bigB ? B : A} nặng hơn con ${bigB ? A : B} là`,
      l1: `Con ${B} cân nặng là`,
    };
  } },
  { id: 'class', rels: ['hon', 'kem'], make(rng, rel) {
    const c = rng.pick(['3A', '3B', '3C', '3D']);
    return {
      dA: 'Nam', dB: 'Nữ', unit: 'bạn', dunit: 'bạn', more: 'nhiều hơn', less: 'ít hơn',
      nums: rel === 'hon' ? { a: [14, 20], d: [1, 6] } : { a: [15, 21], d: [1, 5] },
      sA: (x) => `Lớp ${c} có <b>${x}</b> bạn nam.`,
      rel: (x) => `Số bạn nữ <b>${rel === 'hon' ? 'nhiều hơn' : 'ít hơn'}</b> số bạn nam <b>${x}</b> bạn.`,
      qT: `Hỏi lớp ${c} có <b>tất cả</b> bao nhiêu bạn?`, lT: `Lớp ${c} có tất cả số bạn là`,
      l1: 'Số bạn nữ là',
    };
  } },
  { id: 'tree', rels: ['hon', 'kem'], make(rng, rel) {
    return {
      dA: 'Lớp Ba', dB: 'Lớp Bốn', unit: 'cây', dunit: 'cây', more: 'nhiều hơn', less: 'ít hơn',
      nums: rel === 'hon' ? { a: [120, 350], d: [15, 90] } : { a: [150, 380], d: [15, 60] },
      sA: (x) => `Khối lớp Ba trồng được <b>${x}</b> cây.`,
      rel: (x) => `Khối lớp Bốn trồng được <b>${rel === 'hon' ? 'nhiều hơn' : 'ít hơn'}</b> khối lớp Ba <b>${x}</b> cây.`,
      qT: 'Hỏi <b>cả hai khối</b> trồng được bao nhiêu cây?', lT: 'Cả hai khối trồng được số cây là',
      l1: 'Khối lớp Bốn trồng được số cây là',
    };
  } },
  { id: 'cm', rels: ['hon', 'kem', 'gap'], make(rng, rel) {
    return {
      dA: 'AB', dB: 'BC', unit: 'cm', dunit: 'cm', more: 'dài hơn', less: 'ngắn hơn',
      nums: { hon: { a: [8, 40], d: [2, 9] }, kem: { a: [12, 40], d: [2, 9] }, gap: { a: [4, 15], t: [2, 4] } }[rel],
      sA: (x) => `Đường gấp khúc ABC có đoạn thẳng AB dài <b>${x} cm</b>.`,
      rel: (x) => ({
        hon: `Đoạn thẳng BC <b>dài hơn</b> đoạn thẳng AB <b>${x} cm</b>.`, kem: `Đoạn thẳng BC <b>ngắn hơn</b> đoạn thẳng AB <b>${x} cm</b>.`,
        gap: `Đoạn thẳng BC dài <b>gấp ${x} lần</b> đoạn thẳng AB.`,
      })[rel],
      qT: 'Tính <b>độ dài đường gấp khúc</b> ABC.', lT: 'Độ dài đường gấp khúc ABC là',
      qH: () => 'Hỏi đoạn thẳng BC <b>dài hơn</b> đoạn thẳng AB bao nhiêu xăng-ti-mét?', lH: () => 'Đoạn thẳng BC dài hơn đoạn thẳng AB là',
      l1: 'Độ dài đoạn thẳng BC là',
    };
  } },
  { id: 'money', rels: ['hon', 'kem', 'gap', 'giam'], make(rng, rel) {
    // Giá thật (nghìn đồng): truyện 15–30, áo 80–150; bút chì 3–6, sách gấp 4–8 lần; thước 4–9, cặp gấp 5–9 lần.
    const P = {
      hon: [['quyển truyện', 'hộp bút', 'Truyện', 'Hộp bút', { a: [15, 30], d: [3, 12] }], ['cái áo', 'cái quần', 'Áo', 'Quần', { a: [80, 150], d: [10, 40] }]],
      kem: [['hộp bút', 'quyển truyện', 'Hộp bút', 'Truyện', { a: [20, 35], d: [3, 12] }], ['cái quần', 'cái áo', 'Quần', 'Áo', { a: [100, 180], d: [10, 40] }]],
      gap: [['cái bút chì', 'quyển sách', 'Bút chì', 'Sách', { a: [3, 6], t: [4, 8] }]],
      giam: [['cái cặp sách', 'cái thước kẻ', 'Cặp', 'Thước', { v: [4, 9], t: [5, 9] }]],
    }[rel];
    const [A, B, dA, dB, nums] = rng.pick(P);
    return {
      dA, dB, unit: 'nghìn đồng', dunit: '', more: 'đắt hơn', less: 'rẻ hơn', nums,
      sA: (x) => `Một ${A} giá <b>${x} nghìn đồng</b>.`,
      rel: (x) => ({
        hon: `Một ${B} <b>đắt hơn</b> một ${A} <b>${x} nghìn đồng</b>.`, kem: `Một ${B} <b>rẻ hơn</b> một ${A} <b>${x} nghìn đồng</b>.`,
        gap: `Một ${B} giá <b>gấp ${x} lần</b> một ${A}.`, giam: `Giá một ${B} bằng giá một ${A} <b>giảm đi ${x} lần</b>.`,
      })[rel],
      qT: `Hỏi mua một ${A} và một ${B} hết <b>bao nhiêu tiền</b>?`, lT: 'Mua cả hai thứ hết số tiền là',
      qH: (bigB) => `Hỏi một ${bigB ? B : A} <b>đắt hơn</b> một ${bigB ? A : B} bao nhiêu tiền?`,
      lH: (bigB) => `Một ${bigB ? B : A} đắt hơn một ${bigB ? A : B} số tiền là`,
      l1: `Giá một ${B} là`,
    };
  } },
];

// ── Bối cảnh "mỗi … có …" rồi thêm / bớt, tiền trả lại, đã bán một phần mấy ──────────────────────────
const GROUPS = {
  them: [
    (rng) => { const s = rng.int(10, 30), k = rng.int(3, 8), g = rng.int(2, 5); return { s, k, g, unit: 'l', dunit: 'l', rows: ['Lúc đầu', 'Đổ thêm'],
      story: `Lúc đầu trong thùng có <b>${s} l</b> nước mắm. Mẹ đổ thêm vào thùng <b>${k} can</b>, mỗi can <b>${g} l</b> nước mắm. Hỏi lúc sau trong thùng có tất cả bao nhiêu lít nước mắm?`,
      l1: `${k} can có số lít nước mắm là`, l2: 'Lúc sau trong thùng có số lít nước mắm là', each: `${k} can, mỗi can ${g} l` }; },
    (rng) => { const s = rng.int(30, 90), k = rng.int(3, 9), g = rng.int(5, 12); return { s, k, g, unit: 'quyển', dunit: 'quyển', rows: ['Có', 'Mua thêm'],
      story: `Thư viện trường có <b>${s}</b> quyển truyện. Thư viện mua thêm <b>${k} bộ</b> truyện, mỗi bộ <b>${g}</b> quyển. Hỏi thư viện có tất cả bao nhiêu quyển truyện?`,
      l1: 'Thư viện mua thêm số quyển truyện là', l2: 'Thư viện có tất cả số quyển truyện là', each: `${k} bộ, mỗi bộ ${g} quyển` }; },
    (rng) => { const s = rng.int(20, 60), k = rng.int(3, 9), g = rng.pick([6, 10]); return { s, k, g, unit: 'quả', dunit: 'quả', rows: ['Có', 'Nhập thêm'],
      story: `Cửa hàng có <b>${s}</b> quả trứng. Cửa hàng nhập thêm <b>${k} vỉ</b> trứng, mỗi vỉ <b>${g}</b> quả. Hỏi cửa hàng có tất cả bao nhiêu quả trứng?`,
      l1: 'Cửa hàng nhập thêm số quả trứng là', l2: 'Cửa hàng có tất cả số quả trứng là', each: `${k} vỉ, mỗi vỉ ${g} quả` }; },
  ],
  bot: [
    (rng) => { const k = rng.int(4, 9), g = rng.pick([6, 8, 10, 12]), u = rng.int(5, k * g - 5); return { k, g, u, unit: 'cái', dunit: 'cái', rows: ['Có', 'Đã phát'],
      story: `Cô giáo có <b>${k} hộp</b> bút chì, mỗi hộp <b>${g}</b> cái. Cô đã phát cho học sinh <b>${u}</b> cái bút chì. Hỏi cô còn lại bao nhiêu cái bút chì?`,
      l1: `${k} hộp có số bút chì là`, l2: 'Cô còn lại số bút chì là', each: `${k} hộp, mỗi hộp ${g} cái`, gone: 'đã phát' }; },
    (rng) => { const k = rng.int(4, 9), g = rng.int(8, 15), u = rng.int(10, k * g - 8); return { k, g, u, unit: 'kg', dunit: 'kg', rows: ['Thu hoạch', 'Đã bán'],
      story: `Bác Tư thu hoạch được <b>${k} thùng</b> xoài, mỗi thùng <b>${g} kg</b>. Bác đã bán <b>${u} kg</b> xoài. Hỏi bác còn lại bao nhiêu ki-lô-gam xoài?`,
      l1: `${k} thùng có số ki-lô-gam xoài là`, l2: 'Bác còn lại số ki-lô-gam xoài là', each: `${k} thùng, mỗi thùng ${g} kg`, gone: 'đã bán' }; },
    (rng) => { const k = rng.int(6, 9), g = rng.int(8, 12), u = rng.int(20, k * g - 6); return { k, g, u, unit: 'ghế', dunit: 'ghế', rows: ['Có', 'Có người'],
      story: `Hội trường có <b>${k} hàng</b> ghế, mỗi hàng <b>${g}</b> ghế. Có <b>${u}</b> người đến ngồi, mỗi người một ghế. Hỏi hội trường còn bao nhiêu ghế trống?`,
      l1: 'Hội trường có số ghế là', l2: 'Số ghế còn trống là', each: `${k} hàng, mỗi hàng ${g} ghế`, gone: 'đã có người ngồi' }; },
  ],
  // Tiền trả lại: 1 kg cam giá 30 nghìn đồng, mua 4 kg, đưa 200 nghìn đồng.
  thoi: [
    (rng) => {
      const [what, kgName, g, kr] = rng.pick([['cam', 'kg', rng.pick([25, 30, 35, 40]), [2, 4]], ['táo', 'kg', rng.pick([40, 45, 50, 60]), [2, 3]],
        ['quyển vở', 'quyển', rng.int(8, 12), [3, 8]], ['hộp sữa', 'hộp', rng.pick([7, 8, 9]), [4, 9]]]);
      const k = between(rng, kr), m = k * g;
      const P = rng.pick([50, 100, 200, 500].filter(p => p - m >= 5).slice(0, 2));
      const unitWord = kgName === 'kg' ? `1 kg ${what}` : `1 ${what}`;
      const buy = kgName === 'kg' ? `${k} kg ${what}` : `${k} ${what}`;
      const who = rng.pick(['Mẹ', 'Bà', 'Bố']);
      return { k, g, P, unit: 'nghìn đồng', dunit: '', rows: [`${who} đưa`, kgName === 'kg' ? `Tiền ${what}` : 'Tiền mua'],
        story: `${unitWord} giá <b>${g} nghìn đồng</b>. ${who} mua <b>${buy}</b> và đưa cô bán hàng <b>${P} nghìn đồng</b>. Hỏi cô bán hàng phải trả lại ${who.toLowerCase()} bao nhiêu tiền?`,
        l1: `Mua ${buy} hết số tiền là`, l2: `Cô bán hàng trả lại ${who.toLowerCase()} số tiền là`, each: `${buy}, ${unitWord} giá ${g} nghìn đồng`, who: who.toLowerCase() };
    },
  ],
  phan: [
    (rng) => { const t = rng.int(2, 5), v = rng.int(8, 40); return { N: v * t, t, unit: 'kg', dunit: 'kg', rows: ['Gạo'], gone: 'đã bán',
      story: `Cửa hàng có <b>${v * t} kg</b> gạo. Cửa hàng đã bán ${FRAC(t)} số gạo đó. Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam gạo?`,
      l1: 'Cửa hàng đã bán số gạo là', l2: 'Cửa hàng còn lại số gạo là' }; },
    (rng) => { const t = rng.int(2, 6), v = rng.int(3, 12); return { N: v * t, t, unit: 'm', dunit: 'm', rows: ['Sợi dây'], gone: 'đã cắt',
      story: `Một sợi dây dài <b>${v * t} m</b>. Bố cắt đi ${FRAC(t)} sợi dây. Hỏi sợi dây còn lại dài bao nhiêu mét?`,
      l1: 'Bố đã cắt đi số mét dây là', l2: 'Sợi dây còn lại dài là' }; },
    (rng) => { const A = rng.pick(NAMES), t = rng.int(2, 5), v = rng.int(4, 12); return { N: v * t, t, unit: 'cái', dunit: 'cái', rows: [A], gone: 'đã cho',
      story: `${A} có <b>${v * t}</b> cái nhãn vở. ${A} cho bạn ${FRAC(t)} số nhãn vở đó. Hỏi ${A} còn lại bao nhiêu cái nhãn vở?`,
      l1: `${A} cho bạn số nhãn vở là`, l2: `${A} còn lại số nhãn vở là` }; },
  ],
};

// ── Bộ sinh đề ───────────────────────────────────────────────────────────────────────────────────────
/** Một lựa chọn phép tính: l op r; mid = 'l' / 'r' khi một vế là kết quả bước 1. */
const O = (l, op, r, ok, mid = null) => ({ l, op, r, ok, mid });
const val = ({ l, op, r }) => (op === '+' ? l + r : op === MINUS ? l - r : op === '×' ? l * r : l / r);
const optText = (o) => `${fmt(o.l)} ${o.op} ${fmt(o.r)}`;
const spoken = (o) => `${o.l} ${OPNAME[o.op]} ${o.r}`;
const part = (v, c, extra = {}) => ({ v, c, ...extra });
const parts = (n, v, c) => Array.from({ length: n }, () => part(v, c));

const PAIR_KINDS = { hon: 'hon', kem: 'kem', gapT: 'gap', gapH: 'gap', giamT: 'giam', giamH: 'giam' };

function pairProblem(rng, kind) {
  const rel = PAIR_KINDS[kind];
  const ctx = rng.pick(PAIRS.filter(c => c.rels.includes(rel) && (!kind.endsWith('H') || c.id !== 'class' && c.id !== 'tree')));
  const C = ctx.make(rng, rel);
  const N = C.nums;
  const hieu = kind.endsWith('H');
  let story, s1, s2, rows, right = !hieu, key;
  if (rel === 'hon' || rel === 'kem') {
    const a = between(rng, N.a), d = between(rng, N.d);
    if (a <= d + 4) return null;
    const b = rel === 'hon' ? a + d : a - d;
    story = `${C.sA(a)} ${C.rel(d)} ${C.qT}`;
    s1 = { label: C.l1, val: b,
      opts: rel === 'hon' ? [O(a, '+', d, true), O(a, MINUS, d, false), O(a, '×', d, false)] : [O(a, MINUS, d, true), O(a, '+', d, false)],
      rule: rel === 'hon' ? `${cap(C.more)} ${d} thì cộng thêm ${d}: ${a} + ${d}.` : `${cap(C.less)} ${d} thì bớt đi ${d}: ${a} ${MINUS} ${d}.` };
    s2 = { label: C.lT, val: a + b,
      opts: rel === 'hon' ? [O(a, '+', b, true, 'r'), O(b, MINUS, a, false, 'l'), O(b, '+', d, false, 'l')] : [O(a, '+', b, true, 'r'), O(a, MINUS, b, false, 'r')],
      rule: `Hỏi cả hai thì cộng hai số lại: ${a} + ${b}.` };
    rows = [
      { name: C.dA, parts: [part(a, COL.a)], top: [[0, 1, a]] },
      rel === 'hon'
        ? { name: C.dB, parts: [part(a, COL.b), part(d, COL.x)], top: [[1, 2, d]], bot: [[0, 2, '?', 'mid']] }
        : { name: C.dB, parts: [part(b, COL.b), part(d, '#fff', { ghost: true })], top: [[1, 2, d]], bot: [[0, 1, '?', 'mid']] },
    ];
    key = `${kind}-${ctx.id}-${a}-${d}`;
  } else if (rel === 'gap') {
    const a = between(rng, N.a), t = between(rng, N.t), b = a * t;
    story = `${C.sA(a)} ${C.rel(t)} ${hieu ? C.qH(true) : C.qT}`;
    s1 = { label: C.l1, val: b, opts: [O(a, '×', t, true), O(a, '+', t, false)], rule: `Gấp ${a} lên ${t} lần là lấy ${a} nhân ${t}. Thêm ${t} mới là cộng.` };
    s2 = hieu
      ? { label: C.lH(true), val: b - a, opts: [O(b, MINUS, a, true, 'l'), O(b, '+', a, false, 'l')], rule: `Muốn biết hơn bao nhiêu, lấy số lớn trừ số bé: ${b} ${MINUS} ${a}.` }
      : { label: C.lT, val: a + b, opts: [O(a, '+', b, true, 'r'), O(b, MINUS, a, false, 'l')], rule: `Hỏi cả hai thì cộng hai số lại: ${a} + ${b}.` };
    rows = [
      { name: C.dA, parts: [part(a, COL.a)], top: [[0, 1, a]] },
      { name: C.dB, parts: parts(t, a, COL.b), bot: [[0, t, '?', 'mid']], top: hieu ? [[1, t, '?', 'q']] : [] },
    ];
    key = `${kind}-${ctx.id}-${a}-${t}`;
  } else {
    const v = between(rng, N.v), t = between(rng, N.t), n = v * t;
    story = `${C.sA(n)} ${C.rel(t)} ${hieu ? C.qH(false) : C.qT}`;
    s1 = { label: C.l1, val: v, opts: [O(n, ':', t, true), O(n, MINUS, t, false)], rule: `Giảm ${n} đi ${t} lần là lấy ${n} chia ${t}. Bớt ${t} mới là trừ.` };
    s2 = hieu
      ? { label: C.lH(false), val: n - v, opts: [O(n, MINUS, v, true, 'r'), O(n, '+', v, false, 'r')], rule: `Muốn biết hơn bao nhiêu, lấy số lớn trừ số bé: ${n} ${MINUS} ${v}.` }
      : { label: C.lT, val: n + v, opts: [O(n, '+', v, true, 'r'), O(n, MINUS, v, false, 'r')], rule: `Hỏi cả hai thì cộng hai số lại: ${n} + ${v}.` };
    rows = [
      { name: C.dA, parts: parts(t, v, COL.a), top: [[0, t, n]], bot: hieu ? [[1, t, '?', 'q']] : [] },
      { name: C.dB, parts: [part(v, COL.b)], bot: [[0, 1, '?', 'mid']] },
    ];
    key = `${kind}-${ctx.id}-${v}-${t}`;
  }
  return { kind, story, steps: [s1, s2], rows, right, unit: C.unit, dunit: C.dunit, key };
}

function groupProblem(rng, kind) {
  const g = rng.pick(GROUPS[kind])(rng);
  let s1, s2, rows, right = false;
  if (kind === 'them') {
    const m = g.g * g.k;
    s1 = { label: g.l1, val: m, opts: [O(g.g, '×', g.k, true), O(g.g, '+', g.k, false)], rule: `${cap(g.each)}: lấy ${g.g} nhân ${g.k}.` };
    s2 = { label: g.l2, val: g.s + m, opts: [O(g.s, '+', m, true, 'r'), m > g.s ? O(m, MINUS, g.s, false, 'l') : O(g.s, MINUS, m, false, 'r')], rule: `Thêm vào thì cộng: ${g.s} + ${m}.` };
    rows = [
      { name: g.rows[0], parts: [part(g.s, COL.a)], top: [[0, 1, g.s]] },
      { name: g.rows[1], parts: parts(g.k, g.g, COL.b), top: [[0, 1, g.g]], bot: [[0, g.k, '?', 'mid']] },
    ];
    right = true;
  } else if (kind === 'bot') {
    const m = g.g * g.k;
    s1 = { label: g.l1, val: m, opts: [O(g.g, '×', g.k, true), O(g.g, '+', g.k, false)], rule: `${cap(g.each)}: lấy ${g.g} nhân ${g.k}.` };
    s2 = { label: g.l2, val: m - g.u, opts: [O(m, MINUS, g.u, true, 'l'), O(m, '+', g.u, false, 'l')], rule: `Bớt đi phần ${g.gone} thì trừ: ${m} ${MINUS} ${g.u}.` };
    rows = [
      { name: g.rows[0], parts: parts(g.k, g.g, COL.a), top: [[0, 1, g.g]], bot: [[0, g.k, '?', 'mid']] },
      { name: g.rows[1], parts: [part(g.u, COL.x), part(m - g.u, '#fff', { ghost: true })], bot: [[0, 1, g.u], [1, 2, '?', 'q']] },
    ];
  } else if (kind === 'thoi') {
    const m = g.g * g.k;
    s1 = { label: g.l1, val: m, opts: [O(g.g, '×', g.k, true), O(g.g, '+', g.k, false)], rule: `${cap(g.each)}: lấy ${g.g} nhân ${g.k}.` };
    s2 = { label: g.l2, val: g.P - m, opts: [O(g.P, MINUS, m, true, 'r'), O(g.P, '+', m, false, 'r')], rule: `Tiền trả lại bằng tiền ${g.who} đưa trừ tiền mua hàng: ${g.P} ${MINUS} ${m}.` };
    rows = [
      { name: g.rows[0], parts: [part(g.P, COL.a)], top: [[0, 1, g.P]] },
      { name: g.rows[1], parts: [...parts(g.k, g.g, COL.b), part(g.P - m, '#fff', { ghost: true })], top: [[0, 1, g.g]], bot: [[0, g.k, '?', 'mid'], [g.k, g.k + 1, '?', 'q']] },
    ];
  } else {
    const v = g.N / g.t;
    s1 = { label: g.l1, val: v, opts: [O(g.N, ':', g.t, true), O(g.N, MINUS, g.t, false)], rule: `Muốn tìm một phần ${g.t} của ${g.N}, ta lấy ${g.N} chia ${g.t}.` };
    s2 = { label: g.l2, val: g.N - v, opts: [O(g.N, MINUS, v, true, 'r'), O(g.N, '+', v, false, 'r')], rule: `Còn lại thì lấy cả số trừ phần ${g.gone}: ${g.N} ${MINUS} ${v}.` };
    rows = [{ name: g.rows[0], parts: [part(v, COL.x), ...parts(g.t - 1, v, COL.a)], top: [[0, g.t, g.N]], bot: [[0, 1, '?', 'mid'], [1, g.t, '?', 'q']] }];
  }
  const key = `${kind}-${g.rows.join('')}-${[g.s, g.k, g.g, g.u, g.P, g.N, g.t].filter(x => x !== undefined).join('-')}`;
  return { kind, story: g.story, steps: [s1, s2], rows, right, unit: g.unit, dunit: g.dunit, key };
}

export function makeProblem(rng, kind) {
  for (let i = 0; i < 40; i++) {
    const p = PAIR_KINDS[kind] ? pairProblem(rng, kind) : groupProblem(rng, kind);
    if (p && p.steps.every(st => Number.isInteger(st.val) && st.val > 0 && st.val <= 1000 && st.opts.filter(o => o.ok).every(o => val(o) === st.val))) return p;
  }
  return null;
}

// ── Sơ đồ (viewBox 1000 × 320; một dòng: 1000 × 300) ─────────────────────────────────────────────────
const X0 = 180;
function diagram(p) {
  const W = p.right ? 590 : 770;
  const total = Math.max(...p.rows.map(r => r.parts.reduce((s, x) => s + x.v, 0)));
  const k = W / total;
  const one = p.rows.length === 1;
  const ys = one ? [140] : [92, 226];
  let svg = '';
  const xsOf = [];
  p.rows.forEach((r, ri) => {
    const y = ys[ri];
    const xs = [X0];
    r.parts.forEach(pt => xs.push(xs[xs.length - 1] + pt.v * k));
    xsOf.push(xs);
    // Tên dài ("Số người") xuống hai dòng, không tràn khỏi mép trái khi chữ to (màn dọc).
    const cut = r.name.length > 6 ? r.name.lastIndexOf(' ') : -1;
    svg += cut > 0
      ? `<text x="${X0 - 20}" y="${y - 6}" text-anchor="end" class="w2-name"><tspan>${r.name.slice(0, cut)}</tspan><tspan x="${X0 - 20}" dy="1em">${r.name.slice(cut + 1)}</tspan></text>`
      : `<text x="${X0 - 20}" y="${y + 11}" text-anchor="end" class="w2-name">${r.name}</text>`;
    r.parts.forEach((pt, i) => {
      svg += `<rect x="${xs[i]}" y="${y - 16}" width="${xs[i + 1] - xs[i]}" height="32" fill="${pt.c}" ${pt.ghost ? 'stroke-dasharray="9 7" ' : ''}stroke="${INK}" stroke-width="4"/>`;
    });
    for (const [a, b, text, cls] of r.top || []) {
      const mx = (xs[a] + xs[b]) / 2;
      if (cls === 'q') svg += `<path d="M${xs[a]} ${y - 22} q0 -12 12 -12 H${mx - 10} q10 0 10 -12 q0 12 10 12 H${xs[b] - 12} q12 0 12 12" stroke="#EA580C" stroke-width="4" fill="none"/><text x="${mx}" y="${y - 54}" text-anchor="middle" class="w2-q" data-q>?</text>`;
      else svg += `<path d="M${xs[a]} ${y - 32} V${y - 26} H${xs[b]} V${y - 32}" stroke="${INK}" stroke-width="2.5" fill="none" opacity=".5"/><text x="${mx}" y="${y - 38}" text-anchor="middle" class="w2-val">${text}</text>`;
    }
    for (const [a, b, text, cls] of r.bot || []) {
      const x0 = xs[a], x1 = xs[b], mx = (x0 + x1) / 2, yb = y + 22;
      const c = cls === 'q' ? '#EA580C' : cls === 'mid' ? '#7C3AED' : INK;
      const sz = Math.min(12, (x1 - x0) / 4);
      svg += `<path d="M${x0 + 2} ${yb} q0 ${sz} ${sz} ${sz} H${mx - sz} q${sz} 0 ${sz} ${sz} q0 -${sz} ${sz} -${sz} H${x1 - 2 - sz} q${sz} 0 ${sz} -${sz}" stroke="${c}" stroke-width="${cls ? 4 : 2.5}" fill="none"${cls ? '' : ' opacity=".6"'}/>
        <text x="${mx}" y="${yb + sz * 2 + 34}" text-anchor="middle" class="${cls === 'q' ? 'w2-q' : cls === 'mid' ? 'w2-mid' : 'w2-val'}"${cls ? ` data-${cls}` : ''}>${text}</text>`;
    }
  });
  if (p.right) {
    // Dấu ngoặc dọc ôm cả hai dòng: "? quyển" (cả hai).
    const xr = Math.max(...xsOf.map(xs => xs[xs.length - 1])) + 26, y0 = ys[0] - 18, y1 = ys[1] + 18, ym = (y0 + y1) / 2;
    svg += `<path d="M${xr} ${y0} q14 0 14 14 V${ym - 12} q0 12 12 12 q-12 0 -12 12 V${y1 - 14} q0 14 -14 14" stroke="#EA580C" stroke-width="4" fill="none"/>
      <text x="${xr + 40}" y="${ym + 14}" class="w2-q" data-q>?</text>`;
  }
  return `<svg class="w2-svg" viewBox="0 0 1000 ${one ? 290 : 320}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${svg}</svg>`;
}

// ── Cấp ──────────────────────────────────────────────────────────────────────────────────────────────
const LEVEL = (id, n, title, desc, knowledge, lessons, kinds, missions, ask) => ({ id, n, title, desc, knowledge, lessons: { workbook: lessons }, kinds, missions, ask: () => ask });

export const WORD2_LEVELS = [
  LEVEL('drill-w2-1', 1, 'Nhiều hơn, ít hơn rồi tìm tổng', 'Vd. Mai có 25 quyển vở, Lan có nhiều hơn Mai 8 quyển. Cả hai bạn có bao nhiêu quyển?',
    'bài toán giải bằng hai bước tính: nhiều hơn, ít hơn, rồi tìm tổng', ['bai-28'], ['hon', 'kem'], 4, 'Bước 1 tìm số của bạn thứ hai, bước 2 mới tìm cả hai!'),
  LEVEL('drill-w2-2', 2, 'Gấp, giảm rồi tìm tổng hoặc hiệu', 'Vd. Trong chuồng có 3 con thỏ, ngoài sân gấp 4 lần. Có tất cả bao nhiêu con?',
    'bài toán giải bằng hai bước tính: gấp lên, giảm đi một số lần, rồi tìm tổng hoặc hiệu', ['bai-28', 'bai-29'], ['gapT', 'giamT', 'gapH', 'giamH'], 4, 'Gấp là nhân, giảm là chia. Đọc kĩ câu hỏi: cả hai hay hơn bao nhiêu?'),
  LEVEL('drill-w2-3', 3, 'Mỗi … có …, rồi thêm, bớt', 'Vd. Có 6 hộp, mỗi hộp 8 bút chì, đã phát 15 bút. Còn lại bao nhiêu bút?',
    'bài toán giải bằng hai bước tính: phép nhân (mỗi … có …), một phần mấy, rồi thêm hoặc bớt', ['bai-28'], ['them', 'bot', 'thoi', 'phan'], 4, 'Mỗi hộp có bao nhiêu thì nhân trước, rồi mới thêm hoặc bớt!'),
  LEVEL('drill-w2-4', 4, 'Trộn các dạng', 'Hơn kém, gấp giảm, mỗi … có …, tiền trả lại, một phần mấy.',
    'bài toán giải bằng hai bước tính', ['bai-28', 'bai-29'], ['hon', 'gapT', 'bot', 'giamH', 'kem', 'thoi', 'gapH', 'phan', 'giamT', 'them'], 6, 'Bước 1 tìm số chưa biết, bước 2 trả lời câu hỏi!'),
];

export const WORD2_GAME = {
  id: 'drill-w2', icon: '📝', title: 'Bài toán giải bằng hai bước tính',
  purpose: 'Giúp em giải bài toán có lời văn bằng hai bước tính: tìm số chưa biết trước, rồi dùng số đó trả lời câu hỏi, viết bài giải như trong vở.',
  unitWord: 'bài', starPrefix: 'drill', npcs: [TEACHER], levels: WORD2_LEVELS,
  stallIcon: () => '📝',
  summaryText: (ok, total) => `Em giải đúng ngay <strong>${ok}/${total}</strong> bài.`,
  againText: 'Làm lượt mới',
  howTo: how(['📖', 'Đọc đề'], ['1️⃣', 'Bước 1'], ['2️⃣', 'Bước 2'], ['✅', 'Đáp số']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => makeProblem(rng, level.kinds[k % level.kinds.length]), (m) => m.key);
  },

  mountMission(stage, p, level, api) {
    // Ô phép tính, ô kết quả đủ rộng cho mọi lựa chọn từ đầu lượt: điền vào không xô gì.
    // Hai dòng cùng bề rộng ô: dấu "=" thẳng hàng như trong vở.
    const exprW = () => Math.max(...p.steps.flatMap(st => st.opts.map(o => optText(o).length))) * 0.5 + 0.7;
    const ansW = () => Math.max(...p.steps.map(st => String(fmt(st.val)).length)) * 0.58 + 0.9;
    const finalText = `${fmt(p.steps[1].val)} ${p.unit}`;
    const lineHtml = (st, i) => `
      <div class="w2-line" data-i="${i}">
        <span class="w2-label">${st.label}:</span>
        <span class="w2-calc"><span class="w2-expr" data-expr style="min-width:${exprW(st)}em">…</span><span class="w2-eq">=</span><span class="g3d-box w2-ans" style="--boxw:${ansW(st)}em" data-ans></span><span class="w2-unit">(${p.unit})</span></span>
      </div>`;
    const board = `
      <div class="w2">
        <div class="w2-story">${p.story}</div>
        <div class="w2-dia">${diagram(p)}</div>
        <div class="w2-choices" data-choices></div>
        <div class="w2-sol">
          <div class="w2-head">Bài giải</div>
          <div class="w2-lines">
            ${p.steps.map(lineHtml).join('')}
            <div class="w2-line w2-dap"><span class="w2-label">Đáp số:</span><span class="w2-final" data-final style="min-width:${finalText.length * 0.5 + 0.5}em">&nbsp;</span></div>
          </div>
        </div>
      </div>`;
    const { paper, say, show, hint, pad, done } = mountDrill(stage, { api, board, cls: 'w2-scene' });
    injectWord2Styles();
    const svg = paper.querySelector('.w2-svg');
    const choices = paper.querySelector('[data-choices]');
    const lines = [...paper.querySelectorAll('.w2-line[data-i]')];
    const exprEl = (i) => lines[i].querySelector('[data-expr]');
    const ansEl = (i) => lines[i].querySelector('[data-ans]');

    let s = 0;
    let phase = 'op';
    let mistakes = 0;
    let tip = '';
    let opts = [];
    const wrong = (el, text) => { mistakes++; tip ||= text; shake(el); hint(text); };

    function startStep() {
      const st = p.steps[s];
      phase = 'op';
      // Thứ tự nút cố định theo chữ (không lộ đáp án); bước 2: số của bước 1 tô màu trong nút.
      opts = [...st.opts].sort((x, y) => (optText(x) < optText(y) ? -1 : 1));
      choices.innerHTML = opts.map((o, i) => {
        const side = (v, me) => (o.mid === me ? `<span class="w2-midn">${fmt(v)}</span>` : fmt(v));
        return `<button type="button" class="g3g-btn g3d-choice w2-btn${s ? ' w2-btn-in' : ''}" data-o="${i}">${side(o.l, 'l')} ${o.op} ${side(o.r, 'r')}</button>`;
      }).join('');
      if (s) sfx.pop(1);
      choices.querySelectorAll('[data-o]').forEach(b => { b.onclick = () => pick(b); });
      setActive(paper, exprEl(s));
      const plain = st.label.replace(/<[^>]*>/g, '');
      if (s === 0) {
        const story = p.story.replace(/<span class="w2-frac"><i>1<\/i><i>(\d+)<\/i><\/span>/, 'một phần $1').replace(/<[^>]*>/g, '');
        say(`${story} Bước một: ${plain} bao nhiêu?`, `<b>Bước 1:</b> ${st.label} …? Chọn phép tính.`);
      } else say(`Bước hai: ${plain} bao nhiêu?`, `<b>Bước 2:</b> ${st.label} …? Chọn phép tính.`);
    }

    async function pick(btn) {
      if (phase !== 'op') return;
      sfx.tap();
      const st = p.steps[s];
      const o = opts[Number(btn.dataset.o)];
      if (!o.ok) { wrong(btn, st.rule); return; }
      phase = 'fly';
      btn.classList.add('g3d-choice-ok');
      choices.querySelectorAll('[data-o]').forEach(x => { x.disabled = true; });
      const ex = exprEl(s);
      setActive(paper, null);
      ex.classList.add('w2-expr-on');
      ex.innerHTML = `<span data-side="l">${fmt(o.l)}</span> ${o.op} <span data-side="r">${fmt(o.r)}</span>`;
      ex.style.color = 'transparent';
      const midEl = o.mid ? ex.querySelector(`[data-side="${o.mid}"]`) : null;
      if (midEl) midEl.style.visibility = 'hidden';
      // Phép tính bay từ nút xuống dòng bài giải.
      const fs = parseFloat(getComputedStyle(btn).fontSize);
      await sleep(flyOne(`<div class="w2-fly" style="font-size:${fs}px">${optText(o)}</div>`, btn.getBoundingClientRect(), ex.getBoundingClientRect(), { minMs: 450, maxMs: 750 }) + 60);
      ex.style.color = '';
      sfx.pop(2);
      if (midEl) {
        // Kết quả bước 1 bay vào phép tính của bước 2.
        const from = ansEl(s - 1);
        setUse(paper, from);
        show(`Dùng kết quả <b>bước 1</b>: <b>${fmt(p.steps[s - 1].val)}</b>.`);
        await sleep(flyDigit(fmt(p.steps[s - 1].val), from, midEl, { minMs: 500, maxMs: 800 }) + 80);
        midEl.style.visibility = '';
        midEl.classList.add('w2-midn');
        sfx.pop(3);
        await sleep(350);
        setUse(paper, null);
      }
      phase = 'calc';
      const a = ansEl(s);
      setActive(paper, a);
      say(`Tính ${spoken(o)}.`, `Tính <b>${optText(o)}</b>.`);
      const want = {
        max: String(st.val).length + 1,
        onType: (t) => { a.textContent = t ? fmt(t) : ''; },
        onSubmit: (t) => {
          if (Number(t) !== st.val) { a.textContent = ''; wrong(a, `${optText(o)} = ${fmt(st.val)}.`); pad.want(want); return; }
          pad.off();
          setActive(paper, null);
          a.classList.add('g3d-box-ok');
          sfx.pop(3);
          if (s === 0) afterStep1(); else finish();
        },
      };
      pad.want(want);
    }

    async function afterStep1() {
      phase = 'fly';
      const mid = svg.querySelector('[data-mid]');
      const v = p.steps[0].val;
      if (mid) {
        await sleep(flyDigit(fmt(v), ansEl(0), mid, { minMs: 500, maxMs: 800, onLand: () => { mid.textContent = fmt(v); mid.classList.add('w2-mid-done'); sfx.pop(2); } }) + 250);
      }
      s = 1;
      startStep();
    }

    async function finish() {
      phase = 'done';
      const v = p.steps[1].val;
      const fin = paper.querySelector('[data-final]');
      show(`<b>Đáp số:</b> ${finalText}.`);
      await sleep(flyDigit(fmt(v), ansEl(1), fin, { minMs: 450, maxMs: 750, onLand: () => { fin.textContent = finalText; fin.classList.add('w2-final-on'); sfx.pop(4); } }) + 150);
      const q = svg.querySelector('[data-q]');
      if (q) {
        await sleep(flyDigit(fmt(v), fin, q, { minMs: 450, maxMs: 750, onLand: () => { q.textContent = `${fmt(v)}${p.dunit ? ` ${p.dunit}` : ''}`; q.classList.add('w2-q-done'); sfx.ding(); } }) + 100);
      }
      await sleep(500);
      done(mistakes, { ok: `Đáp số: ${finalText}.`, tip });
    }

    startStep();

    if (import.meta.env.DEV) {
      window.__g3drill = { m: p, step: () => {
        if (phase === 'op') choices.querySelector(`[data-o="${opts.findIndex(o => o.ok)}"]`)?.click();
        else if (phase === 'calc') pad.type(String(p.steps[s].val));
      }, wrong: () => choices.querySelector(`[data-o="${opts.findIndex(o => !o.ok)}"]`)?.click() };
    }
  },
};

let w2Styles = false;
function injectWord2Styles() {
  if (w2Styles) return;
  w2Styles = true;
  const st = document.createElement('style');
  st.textContent = `
    .w2 { flex: 1; min-height: 0; display: grid; grid-template-rows: auto minmax(0, 1fr) minmax(0, 0.42fr) auto; gap: 1.2cqh;
      padding: 1.4cqh 2.5cqi 1.6cqh calc(clamp(1.4rem, 4cqi, 3rem) + 1.8cqi); font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; }
    .w2 > * { min-height: 0; min-width: 0; }
    .w2-story { font-size: min(4.6cqh, 2.7cqi, 2.2rem); line-height: 1.32; font-weight: 600; }
    .w2-story b { color: #C2410C; }
    .w2-frac { display: inline-flex; flex-direction: column; vertical-align: middle; font-size: 0.72em; line-height: 1; text-align: center; color: #C2410C; font-weight: 800; }
    .w2-frac i { font-style: normal; padding: 0 0.15em; }
    .w2-frac i:first-child { border-bottom: 2px solid currentColor; }
    .w2-dia { display: flex; }
    .w2-svg { flex: 1; width: 100%; height: 100%; }
    .w2-name { font: 800 32px 'Baloo 2', sans-serif; fill: #334155; }
    .w2-val { font: 800 32px 'Baloo 2', sans-serif; fill: #1E293B; }
    .w2-mid { font: 800 36px 'Baloo 2', sans-serif; fill: #7C3AED; }
    .w2-mid-done { fill: #6D28D9; }
    .w2-q { font: 800 44px 'Baloo 2', sans-serif; fill: #EA580C; }
    .w2-q-done { fill: #15803D; }

    .w2-choices { display: flex; gap: 2.5cqi; justify-content: center; align-items: stretch; }
    .w2-btn { font-size: min(7.5cqh, 4.4cqi); max-width: 30cqi; white-space: nowrap; }
    .w2-btn-in { animation: w2In .35s cubic-bezier(.2,1.4,.4,1) both; }
    .w2-btn-in:nth-child(2) { animation-delay: .06s; } .w2-btn-in:nth-child(3) { animation-delay: .12s; }
    @keyframes w2In { from { transform: scale(0.6); opacity: 0; } }
    .w2-midn { color: #7C3AED; background: #F3E8FF; border-radius: 0.25em; padding: 0 0.12em; }

    .w2-sol { border-top: 2px dashed #BFDBFE; padding-top: 0.4cqh; font-size: min(6.6cqh, 3.05cqi, 3rem); line-height: 1.2; }
    .w2-head { text-align: center; font-size: 0.75em; color: #475569; text-decoration: underline; text-underline-offset: 0.15em; }
    .w2-lines { display: grid; grid-template-columns: minmax(0, max-content) max-content; justify-content: center; column-gap: 0.5em; row-gap: 0.35em; align-items: center; }
    .w2-line { display: contents; }
    .w2-label { color: #475569; font-weight: 600; }
    .w2-calc { display: inline-flex; align-items: center; gap: 0.25em; white-space: nowrap; }
    .w2-expr { display: inline-grid; place-items: center; height: 1.3em; padding: 0 0.15em; border: 3px dashed #93C5FD; border-radius: 0.2em; color: #94A3B8; box-sizing: border-box; }
    .w2-expr.g3d-on { border-style: solid; border-color: #F59E0B; }
    .w2-expr-on { border-color: transparent; color: #1D4ED8; display: inline-flex; justify-content: center; gap: 0.25em; }
    .w2-ans { height: 1.3em; }
    .w2-eq, .w2-unit { color: #475569; }
    .w2-dap .w2-label { grid-column: 1; text-align: right; color: #15803D; font-weight: 800; }
    .w2-final { grid-column: 2; display: inline-block; border-bottom: 3px dashed #86EFAC; color: #15803D; font-weight: 800; }
    .w2-final-on { border-bottom-color: transparent; }
    .w2-fly { width: 100%; height: 100%; display: grid; place-items: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1D4ED8; white-space: nowrap; line-height: 1; }

    /* Tờ vở đứng / hẹp (màn dọc): như vở, lời giải một dòng, phép tính xuống dòng dưới, lùi vào */
    @container (aspect-ratio < 1.25) {
      .w2 { grid-template-rows: auto minmax(0, 1fr) minmax(0, 0.55fr) auto; gap: 1cqh; }
      .w2-story { font-size: min(4.2cqh, 5.2cqi); }
      .w2-btn { font-size: min(6cqh, 6.6cqi); max-width: 42cqi; }
      .w2-sol { font-size: min(4.4cqh, 5.4cqi); }
      .w2-name, .w2-val { font-size: 48px; }
      .w2-mid { font-size: 50px; }
      .w2-q { font-size: 60px; }
      .w2-lines { grid-template-columns: max-content; justify-content: start; row-gap: 0.1em; }
      .w2-calc { padding-left: 2.2em; margin-bottom: 0.25em; }
      .w2-dap { display: flex; gap: 0.4em; align-items: center; }
      .w2-dap .w2-label { text-align: left; }
    }
    @media (prefers-reduced-motion: reduce) {
      .w2-btn-in { animation: w2InCalm .35s ease both; }
      @keyframes w2InCalm { from { opacity: 0; } }
    }
  `;
  document.head.appendChild(st);
}
