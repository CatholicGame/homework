/**
 * 📊 Số liệu và khả năng xảy ra (Toán 3 KNTT Tập 2: Bài 73 Thu thập, phân loại, ghi chép số liệu. Bảng số liệu;
 * Bài 74 Khả năng xảy ra của một sự kiện). Mỗi lượt số liệu, đồ vật mới:
 *   kiểm đếm  bức tranh nhiều đồ vật trộn lẫn; thầy chỉ lần lượt từng cái, em chạm đúng hàng của bảng để gạch một vạch
 *             (đủ 5 vạch thì gạch chéo), cái đã đếm được đánh dấu; rồi đếm vạch, viết số vào cột "Số …" của bảng.
 *   bảng      bảng số liệu (cây các lớp trồng, trứng gà đẻ, bạn thích môn học…): chạm cột nhiều nhất / ít nhất,
 *             gõ hơn kém bao nhiêu, gõ tổng.
 *   khả năng  hộp bi, nón kì diệu, hộp bút lấy 2 cái cùng lúc: chọn chắc chắn / có thể / không thể cho từng câu,
 *             rồi thử thật: bốc bi, quay nón, lấy bút, kết quả bay ra dải "Thử".
 * Mọi vùng (tranh, bảng, các dòng câu hỏi, nút chọn, dải thử) có chỗ từ đầu lượt, không xô gì.
 */

import { mountDrill, shake, setActive, flyDigit, flyOne, calmMotion, fresh, sfx, sleep, how, TEACHER, INK } from './kit.js';
import { makeRng } from '../grade3Games/loop.js';

const S2 = `stroke="${INK}" stroke-width="2" stroke-linejoin="round"`;
const COLORS = {
  do: { name: 'đỏ', fill: '#EF4444' }, xanh: { name: 'xanh', fill: '#3B82F6' }, vang: { name: 'vàng', fill: '#FACC15' },
  tim: { name: 'tím', fill: '#A855F7' }, den: { name: 'đen', fill: '#334155' }, trang: { name: 'trắng', fill: '#F8FAFC' },
};
const SHAPE_FILLS = ['#F87171', '#60A5FA', '#FACC15', '#4ADE80', '#C084FC', '#FB923C'];

// ── Hình đồ vật kiểm đếm (viewBox 0 0 40 40, nét mực, màu tươi) ─────────────────────────────────────────
const ART = {
  cam: () => `<circle cx="20" cy="22" r="14" fill="#FB923C" ${S2}/><circle cx="14.5" cy="17" r="3.5" fill="#fff" opacity=".45"/>
    <path d="M20 8 Q21 5 24 4" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M21 8 Q28 2 33 7 Q27 12 21 8 Z" fill="#22C55E" ${S2}/>`,
  tao: () => `<path d="M20 12 C12 6 4 12 6 22 C8 32 15 37 20 34 C25 37 32 32 34 22 C36 12 28 6 20 12 Z" fill="#EF4444" ${S2}/>
    <path d="M20 12 Q19 6 22 3" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M22 8 Q29 3 32 8 Q26 12 22 8 Z" fill="#22C55E" ${S2}/>
    <ellipse cx="13" cy="19" rx="2.5" ry="4" fill="#fff" opacity=".45"/>`,
  chuoi: () => `<path d="M7 11 Q8 33 33 32 Q37 31 35 27 Q16 27 13 10 Q11 6 7 11 Z" fill="#FDE047" ${S2}/>
    <path d="M12 14 Q16 25 30 28" stroke="#CA8A04" stroke-width="1.6" fill="none"/><path d="M7 11 L6 6 L11 7 Z" fill="#78350F" ${S2}/>`,
  xoai: () => `<path d="M8 24 C6 12 20 4 30 9 C38 14 34 30 22 34 C14 36 9 31 8 24 Z" fill="#FBBF24" ${S2}/>
    <path d="M24 32 C31 29 34 20 31 13" stroke="#F97316" stroke-width="3" fill="none" opacity=".55" stroke-linecap="round"/>
    <path d="M29 9 L33 4" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="15" cy="17" rx="3" ry="5" fill="#fff" opacity=".4" transform="rotate(30 15 17)"/>`,
  butchi: () => `<g transform="rotate(-40 20 20)"><rect x="5" y="15.5" width="25" height="9" fill="#FACC15" ${S2}/><path d="M30 15.5 L37.5 20 L30 24.5 Z" fill="#FDE7C3" ${S2}/>
    <path d="M35 18.5 L37.5 20 L35 21.5 Z" fill="${INK}"/><rect x="1.5" y="15.5" width="5" height="9" rx="1.5" fill="#F472B6" ${S2}/><path d="M6.5 20 H30" stroke="#CA8A04" stroke-width="1.4"/></g>`,
  tay: () => `<g transform="rotate(-15 20 20)"><rect x="5" y="11" width="30" height="18" rx="4" fill="#fff" ${S2}/><path d="M18 11 H31 Q35 11 35 15 V25 Q35 29 31 29 H18 Z" fill="#3B82F6" ${S2}/></g>`,
  thuoc: () => `<g transform="rotate(-32 20 20)"><rect x="0.5" y="14" width="39" height="12" rx="1.5" fill="#86EFAC" ${S2}/>
    ${[5, 9, 13, 17, 21, 25, 29, 33].map((x, i) => `<path d="M${x} 14 V${i % 2 ? 18 : 20}" stroke="${INK}" stroke-width="1.3"/>`).join('')}</g>`,
  tron: (c) => `<circle cx="20" cy="20" r="15" fill="${c}" ${S2}/>`,
  vuong: (c) => `<rect x="6" y="6" width="28" height="28" fill="${c}" ${S2}/>`,
  tamgiac: (c) => `<path d="M20 4 L37 34 H3 Z" fill="${c}" ${S2}/>`,
  bong: (c) => `<ellipse cx="20" cy="15" rx="11" ry="13" fill="${c}" ${S2}/><path d="M17.5 28 H22.5 L20 31 Z" fill="${c}" ${S2}/>
    <path d="M20 31 Q16 35 20 39" stroke="${INK}" stroke-width="1.5" fill="none"/><ellipse cx="15.5" cy="10" rx="2.5" ry="4" fill="#fff" opacity=".5"/>`,
};

const TALLY_SETS = [
  { id: 'qua', bg: 'cloth', head: 'Kiểm đếm số quả mỗi loại trong giỏ.', col: 'Số quả',
    kinds: [['cam', 'Cam', 'quả cam'], ['tao', 'Táo', 'quả táo'], ['chuoi', 'Chuối', 'quả chuối'], ['xoai', 'Xoài', 'quả xoài']] },
  { id: 'do', bg: 'desk', head: 'Kiểm đếm đồ dùng học tập trên bàn.', col: 'Số chiếc',
    kinds: [['butchi', 'Bút chì', 'cái bút chì'], ['tay', 'Tẩy', 'cục tẩy'], ['thuoc', 'Thước kẻ', 'cái thước kẻ']] },
  { id: 'hinh', bg: 'grid', head: 'Kiểm đếm số hình mỗi loại.', col: 'Số hình', colorful: true,
    kinds: [['tron', 'Hình tròn', 'hình tròn'], ['vuong', 'Hình vuông', 'hình vuông'], ['tamgiac', 'Hình tam giác', 'hình tam giác']] },
  { id: 'bong', bg: 'sky', head: 'Kiểm đếm số quả bóng bay mỗi màu.', col: 'Số quả', balloon: true,
    kinds: [['do', 'Màu đỏ', 'bóng màu đỏ'], ['xanh', 'Màu xanh', 'bóng màu xanh'], ['vang', 'Màu vàng', 'bóng màu vàng'], ['tim', 'Màu tím', 'bóng màu tím']] },
];
const itemArt = (set, k, color) => (set.balloon ? ART.bong(COLORS[set.kinds[k][0]].fill) : ART[set.kinds[k][0]](color ?? SHAPE_FILLS[k]));
const pic = (inner, cls = '') => `<svg class="${cls}" viewBox="0 0 40 40" aria-hidden="true">${inner}</svg>`;

// ── Bảng số liệu (Bài 73): câu như trong sách, {_} là chỗ chấm ───────────────────────────────────────
const TABLES = [
  { title: 'Số cây các lớp khối Ba trồng được', which: 'nào', head: 'Lớp', row: 'Số cây', unit: 'cây', range: [12, 45], step: 1,
    cols: [['3A', '3A'], ['3B', '3B'], ['3C', '3C'], ['3D', '3D']],
    pick: (w) => `Lớp {_} trồng được ${w === 'most' ? 'nhiều' : 'ít'} cây nhất.`,
    diff: (a, b) => `Lớp ${a} trồng được nhiều hơn lớp ${b} {_} cây.`,
    sum: () => 'Cả bốn lớp trồng được tất cả {_} cây.' },
  { title: 'Số quả trứng đàn gà đẻ được', which: 'ngày nào', head: 'Ngày', row: 'Số quả trứng', unit: 'quả trứng', range: [2, 10], step: 1,
    cols: [['Thứ Hai', 'thứ Hai'], ['Thứ Ba', 'thứ Ba'], ['Thứ Tư', 'thứ Tư'], ['Thứ Năm', 'thứ Năm'], ['Thứ Sáu', 'thứ Sáu']],
    pick: (w) => `Vào {_} thì gà đẻ ${w === 'most' ? 'nhiều' : 'ít'} trứng nhất.`,
    diff: (a, b) => `Ngày ${a} gà đẻ nhiều hơn ngày ${b} {_} quả trứng.`,
    sum: () => 'Từ thứ Hai đến thứ Sáu, đàn gà đẻ được tất cả {_} quả trứng.' },
  { title: 'Số bạn lớp 3A thích mỗi môn học', which: 'nào', head: 'Môn học', row: 'Số bạn', unit: 'bạn', range: [3, 14], step: 1,
    cols: [['Toán', 'Toán'], ['Tiếng Việt', 'Tiếng Việt'], ['Mĩ thuật', 'Mĩ thuật'], ['Âm nhạc', 'Âm nhạc']],
    pick: (w) => `Môn {_} được ${w === 'most' ? 'nhiều' : 'ít'} bạn thích nhất.`,
    diff: (a, b) => `Số bạn thích môn ${a} nhiều hơn số bạn thích môn ${b} {_} bạn.`,
    sum: () => 'Lớp 3A có tất cả {_} bạn trả lời.' },
  { title: 'Số túi bột mì cửa hàng bán được', which: 'nào', head: 'Tuần', row: 'Số túi', unit: 'túi', range: [10, 50], step: 5,
    cols: [['Tuần 1', '1'], ['Tuần 2', '2'], ['Tuần 3', '3'], ['Tuần 4', '4']],
    pick: (w) => `Tuần {_} cửa hàng bán được ${w === 'most' ? 'nhiều' : 'ít'} túi bột mì nhất.`,
    diff: (a, b) => `Tuần ${a} bán được nhiều hơn tuần ${b} {_} túi.`,
    sum: () => 'Cả bốn tuần cửa hàng bán được tất cả {_} túi bột mì.' },
  { title: 'Số vật nuôi của trang trại', which: 'con gì', head: 'Vật nuôi', row: 'Số con', unit: 'con', range: [15, 95], step: 1,
    cols: [['Gà', 'gà'], ['Vịt', 'vịt'], ['Ngan', 'ngan'], ['Thỏ', 'thỏ']],
    pick: (w) => `Trang trại nuôi ${w === 'most' ? 'nhiều' : 'ít'} {_} nhất.`,
    diff: (a, b) => `Trang trại nuôi ${a} nhiều hơn ${b} {_} con.`,
    sum: () => 'Trang trại nuôi tất cả {_} con.' },
  { title: 'Số cuốn sách thư viện cho mượn', which: 'ngày nào', head: 'Ngày', row: 'Số cuốn sách', unit: 'cuốn sách', range: [8, 30], step: 1,
    cols: [['Thứ Hai', 'thứ Hai'], ['Thứ Ba', 'thứ Ba'], ['Thứ Tư', 'thứ Tư'], ['Thứ Năm', 'thứ Năm'], ['Thứ Sáu', 'thứ Sáu']],
    pick: (w) => `Vào {_} thư viện cho mượn ${w === 'most' ? 'nhiều' : 'ít'} sách nhất.`,
    diff: (a, b) => `Ngày ${a} thư viện cho mượn nhiều hơn ngày ${b} {_} cuốn sách.`,
    sum: () => 'Cả năm ngày thư viện cho mượn tất cả {_} cuốn sách.' },
];

// ── Khả năng xảy ra (Bài 74) ─────────────────────────────────────────────────────────────────────────
const CHOICES = [{ key: 'sure', label: 'Chắc chắn' }, { key: 'may', label: 'Có thể' }, { key: 'never', label: 'Không thể' }];
const WHO = ['Mai', 'Nam', 'Việt', 'Rô-bốt'];
const listOf = (cnt, noun) => {
  const parts = Object.entries(cnt).filter(([, n]) => n).map(([c, n]) => `${n} ${noun} ${COLORS[c].name}`);
  return parts.length > 1 ? `${parts.slice(0, -1).join(', ')} và ${parts[parts.length - 1]}` : parts[0];
};

/** Các câu có thể hỏi cho một hộp bi / nón / hộp bút, kèm đáp án. */
function chanceCandidates(kind, cnt, palette) {
  const total = Object.values(cnt).reduce((a, b) => a + b, 0);
  const n = (c) => cnt[c] || 0;
  const out = [];
  if (kind === 'pens') {
    for (const c of palette) {
      out.push({ t: 'two', c: [c], ans: n(c) < 2 ? 'never' : n(c) === total ? 'sure' : 'may' });
      if (n(c)) out.push({ t: 'least', c: [c], ans: total - n(c) <= 1 ? 'sure' : 'may' });
    }
    for (let i = 0; i < palette.length; i++) for (let j = i + 1; j < palette.length; j++) {
      const [a, b] = [palette[i], palette[j]];
      if (n(a) + n(b) === 0) continue;
      out.push({ t: 'each', c: [a, b], ans: !n(a) || !n(b) ? 'never' : total === 2 ? 'sure' : 'may' });
    }
    return out;
  }
  for (const c of palette) out.push({ t: 'one', c: [c], ans: n(c) === total ? 'sure' : n(c) ? 'may' : 'never' });
  for (let i = 0; i < palette.length; i++) for (let j = i + 1; j < palette.length; j++) {
    const [a, b] = [palette[i], palette[j]];
    const s = n(a) + n(b);
    if (!n(a) && !n(b)) continue; // "đỏ hoặc vàng" khi cả hai không có: trùng ý câu đơn
    out.push({ t: 'or', c: [a, b], ans: s === total ? 'sure' : 'may' });
  }
  return out;
}

function makeChance(rng, kind) {
  const who = rng.pick(WHO);
  let cnt, palette, order;
  if (kind === 'bag') {
    palette = ['do', 'xanh', 'vang', 'tim'];
    const k = rng() < 0.15 ? 1 : rng() < 0.65 ? 2 : 3;
    const cs = rng.shuffle(palette).slice(0, k);
    cnt = {};
    let total;
    do { cs.forEach(c => { cnt[c] = rng.int(1, k === 1 ? 7 : 5); }); total = cs.reduce((a, c) => a + cnt[c], 0); } while (total > 10 || total < 4);
    order = rng.shuffle(cs.flatMap(c => Array(cnt[c]).fill(c)));
  } else if (kind === 'spin') {
    palette = ['do', 'xanh', 'vang', 'trang'];
    const N = rng.pick([4, 6, 8]);
    const k = rng() < 0.55 ? 2 : 3;
    const cs = rng.shuffle(palette).slice(0, k);
    cnt = {};
    cs.forEach(c => { cnt[c] = 1; });
    for (let i = k; i < N; i++) cnt[rng.pick(cs)]++;
    // Xếp các miền: tránh hai miền cùng màu đứng cạnh nhau khi được
    let best = null;
    for (let t = 0; t < 40; t++) {
      const o = rng.shuffle(cs.flatMap(c => Array(cnt[c]).fill(c)));
      const bad = o.filter((c, i) => c === o[(i + 1) % o.length]).length;
      if (!best || bad < best.bad) best = { o, bad };
      if (!bad) break;
    }
    order = best.o;
  } else {
    palette = ['xanh', 'den', 'do'];
    const k = rng() < 0.6 ? 2 : 3;
    const cs = rng.shuffle(palette).slice(0, k);
    cnt = {};
    let total;
    do { cs.forEach(c => { cnt[c] = rng.int(1, 3); }); total = cs.reduce((a, c) => a + cnt[c], 0); } while (total < 3 || total > 5 || !cs.some(c => cnt[c] === 1));
    order = rng.shuffle(cs.flatMap(c => Array(cnt[c]).fill(c)));
  }
  // Ba câu, càng nhiều loại đáp án khác nhau càng tốt
  const cand = rng.shuffle(chanceCandidates(kind, cnt, palette));
  const ev = [];
  for (const a of rng.shuffle(['sure', 'may', 'never'])) { const e = cand.find(x => x.ans === a && !ev.includes(x)); if (e) ev.push(e); }
  for (const e of cand) if (ev.length < 3 && !ev.includes(e)) ev.push(e);
  return { mode: 'chance', kind, who, cnt, order, events: rng.shuffle(ev.slice(0, 3)), seed: rng.int(1, 1e9) };
}

function makeTally(rng, k) {
  const si = (k + rng.int(0, 3)) % TALLY_SETS.length;
  const set = TALLY_SETS[si];
  const K = set.kinds.length;
  let counts;
  for (let t = 0; t < 300; t++) {
    counts = set.kinds.map(() => rng.int(2, 9));
    const sum = counts.reduce((a, b) => a + b, 0);
    if (sum < 12 || sum > (K > 3 ? 19 : 17)) continue;
    if (!counts.some(c => c >= 5) || new Set(counts).size < K - 1) continue;
    break;
  }
  const seq = rng.shuffle(counts.flatMap((c, i) => Array(c).fill(i)));
  const colors = seq.map(() => rng.pick(SHAPE_FILLS));
  return { mode: 'tally', set: si, counts, seq, colors, seed: rng.int(1, 1e9) };
}

function makeTable(rng, k) {
  const ti = (k * 2 + rng.int(0, 5)) % TABLES.length;
  const tb = TABLES[ti];
  const n = tb.cols.length;
  const [lo, hi] = tb.range;
  let vals;
  for (let t = 0; t < 300; t++) {
    vals = Array.from({ length: n }, () => rng.int(lo / tb.step, hi / tb.step) * tb.step);
    if (new Set(vals).size === n) break;
  }
  const pick = rng.pick(['most', 'least']);
  const [i, j] = rng.shuffle([...Array(n).keys()]).slice(0, 2);
  const diff = vals[i] > vals[j] ? [i, j] : [j, i];
  return { mode: 'table', tab: ti, vals, pick, diff };
}

const MAKE = {
  tally: (rng, k) => makeTally(rng, k),
  table: (rng, k) => makeTable(rng, k),
  bag: (rng) => makeChance(rng, 'bag'),
  spin: (rng) => makeChance(rng, 'spin'),
  pens: (rng) => makeChance(rng, 'pens'),
};

const LEVEL = (id, n, title, desc, knowledge, lessons, plan, ask) => ({
  id, n, title, desc, knowledge, lessons: { workbook: lessons }, missions: plan.length, ask: () => ask, plan,
});

export const DATA_LEVELS = [
  LEVEL('drill-data-1', 1, 'Kiểm đếm', 'Mỗi đồ vật gạch một vạch vào đúng hàng, đủ 5 vạch thì gạch chéo, rồi viết số vào bảng.',
    'thu thập, phân loại, kiểm đếm, ghi chép số liệu', ['bai-73'],
    ['tally', 'tally', 'tally', 'tally'], 'Đếm cái nào gạch cái đó, không bỏ sót!'),
  LEVEL('drill-data-2', 2, 'Đọc bảng số liệu', 'Vd. Lớp 3A trồng được nhiều hơn lớp 3C 14 cây.',
    'bảng số liệu: nhiều nhất, ít nhất, nhiều hơn bao nhiêu, tất cả', ['bai-73'],
    ['table', 'table', 'table', 'table', 'table'], 'Đọc kĩ tên hàng, tên cột của bảng!'),
  LEVEL('drill-data-3', 3, 'Chắc chắn, có thể, không thể', 'Vd. Hộp có bi đỏ và bi xanh: có thể lấy được bi đỏ, không thể lấy được bi vàng.',
    'khả năng xảy ra của một sự kiện: chắc chắn, có thể, không thể', ['bai-74'],
    ['bag', 'spin', 'pens', 'bag', 'spin', 'pens'], 'Nhìn kĩ trong hộp có những gì!'),
  LEVEL('drill-data-4', 4, 'Trộn', 'Kiểm đếm, đọc bảng số liệu và khả năng xảy ra xen kẽ.',
    'kiểm đếm, bảng số liệu, khả năng xảy ra', ['bai-73', 'bai-74'],
    ['tally', 'bag', 'table', 'spin', 'table', 'pens'], 'Đọc kĩ đề rồi mới làm!'),
];

export const DATA_GAME = {
  id: 'drill-data', icon: '📊', title: 'Số liệu và khả năng xảy ra',
  purpose: 'Giúp em kiểm đếm và ghi số liệu vào bảng, đọc bảng số liệu (nhiều nhất, ít nhất, hơn kém, tất cả) và nói đúng một việc chắc chắn, có thể hay không thể xảy ra.',
  unitWord: 'bài', starPrefix: 'drill', npcs: [TEACHER], levels: DATA_LEVELS,
  stallIcon: () => '📊',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> bài.`,
  againText: 'Làm lượt mới',
  howTo(level) {
    if (level.n === 1) return how(['👀', 'Nhìn từng cái'], ['✏️', 'Gạch vào hàng'], ['⌨️', 'Viết số'])();
    if (level.n === 2) return how(['📋', 'Đọc bảng'], ['👆', 'Chọn cột'], ['⌨️', 'Tính'])();
    if (level.n === 3) return how(['👀', 'Nhìn hộp'], ['👆', 'Chọn khả năng'], ['🤏', 'Thử'])();
    return how(['✏️', 'Kiểm đếm'], ['📋', 'Đọc bảng'], ['🤏', 'Khả năng'])();
  },

  makeMission(rng, level, history) {
    const k = history.length;
    const kind = level.plan[k % level.plan.length];
    return fresh(history, () => MAKE[kind](rng, k), (m) => JSON.stringify([m.mode, m.kind, m.set, m.tab, m.counts, m.vals, m.cnt, m.events?.map(e => e.t + e.c)]));
  },

  mountMission(stage, m, level, api) {
    injectDataStyles();
    if (m.mode === 'tally') return mountTally(stage, m, api);
    if (m.mode === 'table') return mountTable(stage, m, api);
    return mountChance(stage, m, api);
  },
};

// ── Tiện ích ───────────────────────────────────────────────────────────────────────────────────────
/** Cỡ chữ to nhất (≤ cap) để khối chữ vừa khung cả ngang lẫn dọc; dòng nào được phép xuống dòng thì xuống dòng. */
function fitWrap(box, inner, cap) {
  const fit = () => {
    const h = box.clientHeight * 0.96;
    if (!box.clientWidth || h <= 0) return;
    let fs = cap;
    inner.style.fontSize = `${fs}px`;
    const w = box.clientWidth;
    while (fs > 10 && (inner.scrollHeight > h || inner.scrollWidth > w)) { fs = Math.floor(fs * 0.93); inner.style.fontSize = `${fs}px`; }
  };
  fit();
  document.fonts?.ready.then(fit);
  new ResizeObserver(() => { if (box.isConnected) fit(); }).observe(box);
}
const boxW = (v) => `${String(v).length * 0.62 + 0.9}em`;
const voice = (s) => s.replace(/<[^>]*>/g, '').replace(/…/g, 'bao nhiêu');
const wantMax = (v) => String(v).length + 1;

/** Vạch kiểm đếm của một nhóm: 4 vạch đứng + gạch chéo thứ năm (svg giữ sẵn, chỉ hiện dần). */
const tallyGroup = () => `<svg class="gd-tg" viewBox="0 0 34 34" aria-hidden="true">${[0, 1, 2, 3].map(i => `<path class="gd-tm" d="M${5 + i * 7.5} 4 V30"/>`).join('')}<path class="gd-tm gd-tm5" d="M1.5 25 L32.5 9"/></svg>`;

// ════ Kiểm đếm ════════════════════════════════════════════════════════════════════════════════════
function mountTally(stage, m, api) {
  const set = TALLY_SETS[m.set];
  const K = set.kinds.length, N = m.seq.length;
  const groups = Math.max(2, Math.ceil(Math.max(...m.counts) / 5));
  const rnd = makeRng(m.seed);
  const jit = m.seq.map(() => ({ x: (rnd() - 0.5) * 22, y: (rnd() - 0.5) * 22, r: set.colorful || set.balloon ? (rnd() - 0.5) * 24 : (rnd() - 0.5) * 50 }));
  const items = m.seq.map((k, i) => `<div class="gd-it" data-i="${i}" style="--x:${jit[i].x}%;--y:${jit[i].y}%;--r:${jit[i].r}deg">${pic(itemArt(set, k, m.colors[i]))}<span class="gd-ck">✓</span></div>`).join('');
  const rows = set.kinds.map(([, name], k) => `
    <button type="button" class="gd-row" data-k="${k}">
      <span class="gd-kind">${pic(itemArt(set, k, set.colorful ? SHAPE_FILLS[k] : undefined), 'gd-kpic')}<span class="gd-kname">${name}</span></span>
      <span class="gd-marks">${Array.from({ length: groups }, tallyGroup).join('')}</span>
      <span class="gd-cnt"><span class="g3d-box" data-c="${k}" style="--boxw:${boxW(9)}"></span></span>
    </button>`).join('');
  const board = `
    <div class="gd gd-tally">
      <div class="gd-head">${set.head}</div>
      <div class="gd-body">
        <div class="gd-pic gd-bg-${set.bg}"><div class="gd-items">${items}</div></div>
        <div class="gd-tbl" style="--k:${K}">
          <div class="gd-thead"><span>Loại</span><span>Kiểm đếm</span><span>${set.col}</span></div>
          ${rows}
        </div>
      </div>
    </div>`;
  const { paper, say, show, hint, pad, done } = mountDrill(stage, { api, board, cls: 'gd-scene' });
  const zone = paper.querySelector('.gd-pic'), grid = paper.querySelector('.gd-items');
  const itEls = [...paper.querySelectorAll('.gd-it')];
  const rowEls = [...paper.querySelectorAll('.gd-row')];
  const tbl = paper.querySelector('.gd-tbl');

  // Lưới đồ vật theo đúng tỉ lệ khung: ô to nhất có thể, đồ vật to theo ô.
  const layout = () => {
    const w = zone.clientWidth, h = zone.clientHeight;
    if (!w || !h) return;
    let best = { c: 1, s: 0 };
    for (let c = 1; c <= N; c++) { const r = Math.ceil(N / c); const s = Math.min(w / c, h / r); if (s > best.s) best = { c, s }; }
    const r = Math.ceil(N / best.c);
    grid.style.gridTemplateColumns = `repeat(${best.c}, minmax(0, 1fr))`;
    grid.style.gridTemplateRows = `repeat(${r}, minmax(0, 1fr))`;
    grid.style.setProperty('--s', `${Math.floor(best.s * 0.74)}px`);
  };
  layout();
  new ResizeObserver(() => { if (zone.isConnected) layout(); }).observe(zone);

  let mistakes = 0, tip = '', stepNow = 'busy', idx = 0, ci = 0;
  const counted = Array(K).fill(0);
  const wrong = (el, text, shown) => { mistakes++; shake(el); hint(text, shown || text); };

  const setCur = () => {
    itEls.forEach((e, i) => e.classList.toggle('gd-cur', i === idx));
    if (idx < N) show(`👆 Cái đang sáng là gì? Chạm đúng <b>hàng</b> để gạch.`);
  };
  const addMark = (k) => {
    const c = counted[k];
    const g = rowEls[k].querySelectorAll('.gd-tg')[Math.floor(c / 5)];
    g.querySelectorAll('.gd-tm')[c % 5].classList.add('gd-tm-on');
    counted[k]++;
    sfx.pop(c % 8);
    if (counted[k] % 5 === 0) sfx.ding();
  };

  function tap(k) {
    if (stepNow !== 'tally') return;
    const want = m.seq[idx];
    if (k !== want) {
      wrong(rowEls[k], `Đây là ${set.kinds[want][2]}, không phải ${set.kinds[k][2]}. Gạch vào hàng ${set.kinds[want][1]}.`,
        `Đây là <b>${set.kinds[want][2]}</b>: gạch vào hàng <b>${set.kinds[want][1]}</b>.`);
      tip ||= 'Nhìn kĩ đồ vật rồi mới gạch vào hàng của nó.';
      return;
    }
    sfx.tap();
    const it = itEls[idx];
    const c = counted[k] + pendingOf(k);
    const g = rowEls[k].querySelectorAll('.gd-tg')[Math.floor(c / 5)];
    pending[k]++;
    it.classList.remove('gd-cur');
    it.classList.add('gd-done');
    const svg = it.querySelector('svg');
    flyOne(svg.outerHTML, svg.getBoundingClientRect(), g.getBoundingClientRect(), { minMs: 320, maxMs: 560, onLand: () => { pending[k]--; addMark(k); } });
    idx++;
    if (idx < N) setCur();
    else { stepNow = 'busy'; setTimeout(stepCounts, calmMotion() ? 900 : 700); }
  }
  const pending = Array(K).fill(0);
  const pendingOf = (k) => pending[k];
  rowEls.forEach((b, k) => b.addEventListener('click', () => tap(k)));

  function stepCounts() {
    if (ci === 0) say(`Đếm số vạch mỗi hàng rồi viết vào cột ${set.col}.`, `⌨️ Đếm vạch, viết vào cột <b>${set.col}</b>.`);
    tbl.classList.add('gd-tbl-count');
    const k = ci, n = m.counts[k];
    const box = paper.querySelector(`[data-c="${k}"]`);
    rowEls.forEach((r, i) => r.classList.toggle('gd-row-on', i === k));
    setActive(paper, box);
    stepNow = 'count';
    const want = {
      max: 2,
      onType: (t) => { box.textContent = t; },
      onSubmit: (t) => {
        const v = Number(t);
        if (v !== n) {
          box.textContent = '';
          const g = Math.floor(n / 5), r = n % 5;
          if (g && v === n - g) wrong(box, 'Gạch chéo cũng là một vạch. Mỗi nhóm có gạch chéo là 5.', 'Gạch chéo cũng là một vạch: mỗi nhóm có gạch chéo là <b>5</b>.');
          else if (g && v === n + g) wrong(box, 'Mỗi nhóm có gạch chéo chỉ là 5 thôi.', 'Mỗi nhóm có gạch chéo chỉ là <b>5</b>.');
          else if (g) wrong(box, `Hàng ${set.kinds[k][1]}: đếm ${g} nhóm 5${r ? ` và ${r} vạch nữa` : ''}.`, `Hàng <b>${set.kinds[k][1]}</b>: ${g} nhóm 5${r ? ` và ${r} vạch nữa` : ''}.`);
          else wrong(box, `Đếm lại từng vạch của hàng ${set.kinds[k][1]}.`, `Đếm lại từng vạch của hàng <b>${set.kinds[k][1]}</b>.`);
          tip ||= 'Đếm vạch theo nhóm 5: 5, 10, rồi đếm thêm các vạch lẻ.';
          pad.want(want);
          return;
        }
        pad.off();
        box.classList.add('g3d-box-ok');
        sfx.pop(3);
        ci++;
        stepNow = 'busy';
        if (ci < K) setTimeout(stepCounts, 300);
        else {
          rowEls.forEach(r => r.classList.remove('gd-row-on'));
          setActive(paper, null);
          setTimeout(() => done(mistakes, { ok: `${set.kinds.map(([, nm], i) => `${nm}: ${m.counts[i]}`).join(', ')}.`, tip: tip ? `Nhớ: ${tip}` : '' }), 350);
        }
      },
    };
    pad.want(want);
  }

  say(`${set.head} Cái nào đang sáng thì chạm vào đúng hàng để gạch một vạch.`, `👆 Cái đang sáng là gì? Chạm đúng <b>hàng</b> để gạch.`);
  stepNow = 'tally';
  setCur();

  if (import.meta.env.DEV) {
    window.__g3drill = { m, step: () => {
      if (stepNow === 'tally') tap(m.seq[idx]);
      else if (stepNow === 'count') pad.type(String(m.counts[ci]));
    }, all: () => { while (stepNow === 'tally') tap(m.seq[idx]); }, wrong: () => {
      if (stepNow === 'tally') tap((m.seq[idx] + 1) % K);
      else if (stepNow === 'count') pad.type(String(m.counts[ci] + 1));
    } };
  }
}

// ════ Bảng số liệu ═════════════════════════════════════════════════════════════════════════════════
function mountTable(stage, m, api) {
  const tb = TABLES[m.tab];
  const n = tb.cols.length;
  const vals = m.vals;
  const sum = vals.reduce((a, b) => a + b, 0);
  const pickAns = vals.indexOf(m.pick === 'most' ? Math.max(...vals) : Math.min(...vals));
  const [a, b] = m.diff;
  const diffV = vals[a] - vals[b];
  const wordW = `${Math.max(...tb.cols.map(c => c[1].length)) * 0.55 + 0.8}em`;
  const Q = [
    { kind: 'pick', text: tb.pick(m.pick) },
    { kind: 'num', text: tb.diff(tb.cols[a][1], tb.cols[b][1]), v: diffV },
    { kind: 'num', text: tb.sum(), v: sum },
  ];
  const blank = (q, i) => (q.kind === 'pick' ? `<span class="gd-word" data-q="${i}" style="min-width:${wordW}">…</span>` : `<span class="g3d-box" data-q="${i}" style="--boxw:${boxW(q.v)}"></span>`);
  const lines = Q.map((q, i) => `<div class="gd-ql" data-l="${i}"><span class="gd-qn">${'abc'[i]})</span> ${q.text.replace('{_}', blank(q, i))}</div>`).join('');
  const words = [tb.head, tb.row, ...tb.cols.map(c => c[0])].flatMap(t => t.split(' '));
  const maxLen = Math.max(...words.map(w => w.length));
  const board = `
    <div class="gd gd-table">
      <div class="gd-tab-title">${tb.title}</div>
      <div class="gd-tboard" style="--n:${n};--len:${Math.max(4, maxLen)}">
        <div class="gd-lab"><span class="gd-cell gd-ch">${tb.head}</span><span class="gd-cell gd-cv">${tb.row}</span></div>
        ${tb.cols.map((c, j) => `<button type="button" class="gd-colb" data-j="${j}"><span class="gd-cell gd-ch">${c[0]}</span><span class="gd-cell gd-cv">${vals[j]}</span></button>`).join('')}
      </div>
      <div class="gd-qs"><div class="gd-qin">${lines}</div></div>
    </div>`;
  const { paper, say, show, hint, pad, done } = mountDrill(stage, { api, board, cls: 'gd-scene' });
  fitWrap(paper.querySelector('.gd-qs'), paper.querySelector('.gd-qin'), 64);
  const cols = [...paper.querySelectorAll('.gd-colb')];
  const tboard = paper.querySelector('.gd-tboard');
  let mistakes = 0, tip = '', stepNow = 'busy', qi = 0;
  const wrong = (el, text, shown) => { mistakes++; shake(el); hint(voice(text), shown || text); };
  const line = (i) => paper.querySelector(`[data-l="${i}"]`);
  const slot = (i) => paper.querySelector(`[data-q="${i}"]`);
  const useCols = (js) => cols.forEach((c, j) => c.classList.toggle('gd-use', js.includes(j)));

  function ask() {
    const q = Q[qi];
    paper.querySelectorAll('.gd-ql').forEach((l, i) => l.classList.toggle('gd-ql-on', i === qi));
    setActive(paper, slot(qi));
    const plain = q.text.replace('{_}', '…');
    if (q.kind === 'pick') {
      stepNow = 'pick';
      tboard.classList.add('gd-pickable');
      say(`${tb.title}. ${plain.replace('…', tb.which)}`, `👆 Chạm vào <b>cột</b> đúng.`);
      return;
    }
    stepNow = 'num';
    say(voice(plain), `⌨️ Viết số vào chỗ chấm.`);
    const box = slot(qi);
    const want = {
      max: wantMax(q.v),
      onType: (t) => { box.textContent = t; },
      onSubmit: (t) => {
        const v = Number(t);
        if (v !== q.v) {
          box.textContent = '';
          if (qi === 1) {
            useCols([a, b]);
            if (v === vals[a] + vals[b]) wrong(box, `Em đã cộng. Nhiều hơn bao nhiêu thì lấy số lớn trừ số bé: ${vals[a]} − ${vals[b]}.`, `Nhiều hơn bao nhiêu: lấy <b>${vals[a]} − ${vals[b]}</b>, không cộng.`);
            else if (v === vals[a] || v === vals[b]) wrong(box, `Đó là số của một cột. Lấy ${vals[a]} − ${vals[b]}.`, `Đó là số của một cột. Lấy <b>${vals[a]} − ${vals[b]}</b>.`);
            else wrong(box, `Tính lại ${vals[a]} − ${vals[b]}.`, `Tính lại <b>${vals[a]} − ${vals[b]}</b>.`);
            tip ||= 'Nhiều hơn bao nhiêu: lấy số lớn trừ số bé.';
          } else {
            useCols(vals.map((_, j) => j));
            const expr = vals.join(' + ');
            if (vals.some((x, j) => v === sum - x)) wrong(box, `Em còn sót một cột. Cộng cả ${n} số: ${expr}.`, `Còn sót một cột. Cộng cả ${n} số: <b>${expr}</b>.`);
            else wrong(box, `Cộng cả ${n} số ở hàng ${tb.row}: ${expr}.`, `Cộng cả ${n} số: <b>${expr}</b>.`);
            tip ||= 'Tất cả: cộng mọi số ở hàng số liệu, không sót cột nào.';
          }
          pad.want(want);
          return;
        }
        pad.off();
        box.classList.add('g3d-box-ok');
        useCols(qi === 1 ? [a, b] : vals.map((_, j) => j));
        sfx.pop(4);
        next();
      },
    };
    pad.want(want);
  }

  async function pickCol(j) {
    if (stepNow !== 'pick') return;
    sfx.tap();
    const most = m.pick === 'most';
    if (j !== pickAns) {
      useCols([j]);
      wrong(cols[j], `${tb.cols[j][0]} có ${vals[j]} ${tb.unit}, chưa phải ${most ? 'nhiều' : 'ít'} nhất. Tìm số ${most ? 'lớn' : 'bé'} nhất ở hàng ${tb.row}.`,
        `${tb.cols[j][0]}: ${vals[j]}, chưa phải ${most ? 'nhiều' : 'ít'} nhất. Tìm số <b>${most ? 'lớn' : 'bé'} nhất</b>.`);
      tip ||= `${most ? 'Nhiều' : 'Ít'} nhất: tìm số ${most ? 'lớn' : 'bé'} nhất trong bảng.`;
      return;
    }
    stepNow = 'busy';
    tboard.classList.remove('gd-pickable');
    useCols([j]);
    const w = slot(0);
    setActive(paper, null);
    await sleep(flyDigit(tb.cols[j][1], cols[j].querySelector('.gd-ch'), w, { onLand: () => { w.textContent = tb.cols[j][1]; w.classList.add('gd-word-ok'); sfx.pop(3); } }) + 150);
    next();
  }
  cols.forEach((c, j) => c.addEventListener('click', () => pickCol(j)));

  function next() {
    qi++;
    stepNow = 'busy';
    if (qi < Q.length) { setTimeout(() => { useCols([]); ask(); }, 600); return; }
    paper.querySelectorAll('.gd-ql').forEach(l => l.classList.remove('gd-ql-on'));
    setActive(paper, null);
    setTimeout(() => done(mistakes, { ok: 'Em đọc bảng số liệu rất đúng.', tip: tip ? `Nhớ: ${tip}` : '' }), 500);
  }

  ask();
  if (import.meta.env.DEV) {
    window.__g3drill = { m, step: () => {
      if (stepNow === 'pick') pickCol(pickAns);
      else if (stepNow === 'num') pad.type(String(Q[qi].v));
    }, wrong: () => {
      if (stepNow === 'pick') pickCol((pickAns + 1) % n);
      else if (stepNow === 'num') pad.type(String(Q[qi].v + 1));
    } };
  }
}

// ════ Khả năng xảy ra ══════════════════════════════════════════════════════════════════════════════
const ballSvg = (c) => `<svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true"><circle cx="12" cy="12" r="10.5" fill="${COLORS[c].fill}" stroke="${INK}" stroke-width="1.8"/><circle cx="8.5" cy="8.5" r="2.8" fill="#fff" opacity=".6"/></svg>`;
const penPath = (x, y, c, h = 92) => `<g transform="translate(${x} ${y})"><rect x="-7" y="0" width="14" height="${h}" rx="3" fill="${COLORS[c].fill}" ${S2}/>
  <rect x="-8" y="-4" width="16" height="26" rx="4" fill="${COLORS[c].fill}" ${S2}/><path d="M5 0 V22" stroke="#fff" stroke-width="2" opacity=".5"/>
  <path d="M-7 ${h} L0 ${h + 13} L7 ${h}" fill="#FDE7C3" ${S2}/></g>`;
const penSvg = (c) => `<svg viewBox="-12 -8 24 118" width="100%" height="100%" aria-hidden="true">${penPath(0, 0, c)}</svg>`;

/** Hộp kính thấy bi bên trong (tối đa 10 viên: hàng 5, hàng 4 nằm vào khe, rồi hàng trên cùng). */
function boxArt(order) {
  const spots = [];
  for (let r = 0; spots.length < order.length; r++) {
    const k = r % 2 ? 4 : 5;
    for (let c = 0; c < k; c++) spots.push([(r % 2 ? 50 : 34) + c * 31, 124 - r * 27]);
  }
  const balls = order.map((c, i) => {
    const [x, y] = spots[i];
    return `<g class="gd-ball" data-b="${i}" data-c="${c}"><circle cx="${x}" cy="${y}" r="15" fill="${COLORS[c].fill}" stroke="${INK}" stroke-width="2.2"/><circle cx="${x - 4.5}" cy="${y - 4.5}" r="3.8" fill="#fff" opacity=".6"/></g>`;
  }).join('');
  return `<svg class="gd-obj" viewBox="0 0 200 160" aria-hidden="true">
    <ellipse cx="96" cy="146" rx="92" ry="9" fill="#0F172A" opacity=".12"/>
    <path d="M12 52 L26 36 H190 L176 52 Z" fill="#E0F2FE" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="12" y="52" width="164" height="90" rx="6" fill="#F0F9FF" stroke="${INK}" stroke-width="3"/>
    <path d="M176 52 L190 36 V126 L176 142 Z" fill="#BAE6FD" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    ${balls}
    <rect x="12" y="52" width="164" height="90" rx="6" fill="#BAE6FD" opacity=".2" stroke="${INK}" stroke-width="3"/>
    <path d="M22 62 L38 62 M22 70 L30 70" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/>
  </svg>`;
}
/** Nón kì diệu: các miền màu, kim chỉ cố định ở trên; vòng nón quay. */
function wheelArt(order) {
  const N = order.length, cx = 100, cy = 108, R = 80;
  const pt = (a) => [cx + R * Math.sin(a), cy - R * Math.cos(a)];
  const secs = order.map((c, i) => {
    const a0 = (i / N) * 2 * Math.PI, a1 = ((i + 1) / N) * 2 * Math.PI;
    const [x0, y0] = pt(a0), [x1, y1] = pt(a1);
    return `<path d="M${cx} ${cy} L${x0.toFixed(2)} ${y0.toFixed(2)} A${R} ${R} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z" fill="${COLORS[c].fill}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
  }).join('');
  return `<svg class="gd-obj" viewBox="0 0 200 200" aria-hidden="true">
    <path d="M100 108 L70 196 H130 Z" fill="#B45309" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <g class="gd-wheel">${secs}<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${INK}" stroke-width="4"/></g>
    <circle cx="${cx}" cy="${cy}" r="9" fill="#FDE047" stroke="${INK}" stroke-width="2.5"/>
    <path class="gd-arrow" d="M100 40 L88 12 H112 Z" fill="#DC2626" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  </svg>`;
}
/** Hộp bút: bút cắm đứng, nửa dưới khuất sau thành hộp. */
function pensArt(order) {
  const n = order.length, w = 30;
  const x0 = 100 - ((n - 1) * w) / 2;
  const pens = order.map((c, i) => `<g class="gd-pen" data-b="${i}" data-c="${c}">${penPath(x0 + i * w, 22 + (i % 2) * 8, c)}</g>`).join('');
  return `<svg class="gd-obj" viewBox="0 0 200 180" aria-hidden="true">
    <path d="M28 92 L172 92 L164 174 H36 Z" fill="#FDBA74" stroke="${INK}" stroke-width="3" stroke-linejoin="round" opacity=".55"/>
    ${pens}
    <path d="M28 92 L172 92 L164 174 H36 Z" fill="#FB923C" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M40 110 H160" stroke="#fff" stroke-width="4" opacity=".5" stroke-linecap="round"/>
    <ellipse cx="100" cy="92" rx="72" ry="6" fill="none" stroke="${INK}" stroke-width="3"/>
  </svg>`;
}

/** Câu khả năng: [chủ ngữ, phần sau chỗ chấm], lời giải thích đáp án. */
function eventText(m, e) {
  const nm = (c) => COLORS[c].name;
  const n = (c) => m.cnt[c] || 0;
  const total = m.order.length;
  if (m.kind === 'spin') {
    const after = e.t === 'one' ? `chỉ vào miền màu ${nm(e.c[0])}.` : `chỉ vào miền màu ${nm(e.c[0])} hoặc màu ${nm(e.c[1])}.`;
    const why = e.t === 'one'
      ? (e.ans === 'sure' ? `Nón chỉ có miền màu ${nm(e.c[0])}.` : e.ans === 'may' ? `Nón có miền màu ${nm(e.c[0])} và cả miền màu khác.` : `Nón không có miền màu ${nm(e.c[0])} nào.`)
      : (e.ans === 'sure' ? `Nón chỉ có miền màu ${nm(e.c[0])} và màu ${nm(e.c[1])}.` : `Nón còn có miền màu khác.`);
    return { who: 'Mũi tên', after, why };
  }
  if (m.kind === 'bag') {
    const after = e.t === 'one' ? `lấy được viên bi ${nm(e.c[0])}.` : `lấy được viên bi ${nm(e.c[0])} hoặc viên bi ${nm(e.c[1])}.`;
    const why = e.t === 'one'
      ? (e.ans === 'sure' ? `Trong hộp chỉ có bi ${nm(e.c[0])}: lấy viên nào cũng là bi ${nm(e.c[0])}.` : e.ans === 'may' ? `Trong hộp có ${n(e.c[0])} viên bi ${nm(e.c[0])} và có cả bi màu khác.` : `Trong hộp không có viên bi ${nm(e.c[0])} nào.`)
      : (e.ans === 'sure' ? `Trong hộp chỉ có bi ${nm(e.c[0])} và bi ${nm(e.c[1])}.` : `Trong hộp còn có bi màu khác.`);
    return { who: m.who, after, why };
  }
  const [c, d] = e.c;
  if (e.t === 'two') {
    const why = e.ans === 'never' ? (n(c) ? `Trong hộp chỉ có ${n(c)} cái bút ${nm(c)}, không đủ 2 cái.` : `Trong hộp không có bút ${nm(c)} nào.`)
      : e.ans === 'sure' ? `Trong hộp chỉ có bút ${nm(c)}.` : `Có ${n(c)} cái bút ${nm(c)}, nhưng cũng có thể lấy phải bút màu khác.`;
    return { who: m.who, after: `lấy được 2 cái bút màu ${nm(c)}.`, why };
  }
  if (e.t === 'least') {
    const other = total - n(c);
    const why = e.ans === 'sure' ? `Chỉ có ${other} cái bút không phải màu ${nm(c)}: lấy 2 cái thì ít nhất 1 cái là bút ${nm(c)}.` : `Có ${other} cái bút không phải màu ${nm(c)}, có thể lấy phải cả 2 cái đó.`;
    return { who: m.who, after: `lấy được ít nhất 1 cái bút màu ${nm(c)}.`, why };
  }
  const miss = !n(c) ? c : d;
  const why = e.ans === 'never' ? `Trong hộp không có bút ${nm(miss)} nào.` : e.ans === 'sure' ? 'Trong hộp chỉ có đúng 2 cái bút đó.' : 'Có thể lấy được 1 cái mỗi màu, cũng có thể lấy được 2 cái cùng màu.';
  return { who: m.who, after: `lấy được 1 cái bút màu ${nm(c)} và 1 cái bút màu ${nm(d)}.`, why };
}

function mountChance(stage, m, api) {
  const total = m.order.length;
  const setup = m.kind === 'bag' ? `Trong hộp có ${listOf(m.cnt, 'viên bi')}. ${m.who} lấy ra 1 viên bi mà không nhìn.`
    : m.kind === 'spin' ? `${m.who} quay chiếc nón kì diệu một lần, xem mũi tên chỉ vào miền màu gì.`
      : `Trong hộp có ${listOf(m.cnt, 'cái bút')}. ${m.who} nhắm mắt lấy 2 cái bút cùng lúc.`;
  const evs = m.events.map(e => ({ ...e, ...eventText(m, e) }));
  const tries = m.kind === 'pens' ? 3 : m.kind === 'spin' ? 4 : 5;
  const art = m.kind === 'bag' ? boxArt(m.order) : m.kind === 'spin' ? wheelArt(m.order) : pensArt(m.order);
  const board = `
    <div class="gd gd-chance gd-ch-${m.kind}">
      <div class="gd-objz">
        <div class="gd-objbox">${art}</div>
        <div class="gd-tries"><span class="gd-tlab">Thử:</span>${Array.from({ length: tries }, (_, i) => `<span class="gd-try${m.kind === 'pens' ? ' gd-try2' : ''}" data-t="${i}"></span>`).join('')}</div>
      </div>
      <div class="gd-side">
        <div class="gd-txt"><div class="gd-txin">
          <div class="gd-setup">${setup}</div>
          ${evs.map((e, i) => `<div class="gd-ev" data-e="${i}"><span class="gd-qn">${'abc'[i]})</span> ${e.who} <span class="gd-word gd-chw" data-w="${i}">…</span> ${e.after}</div>`).join('')}
        </div></div>
      </div>
    </div>`;
  // Lượt này không gõ số: ba nút chọn to nằm ở chỗ bàn phím (ngang: cột trái, dọc: dải dưới).
  const { scene, paper, say, show, hint, done } = mountDrill(stage, { api, board, cls: 'gd-scene gd-chmode' });
  scene.querySelector('.g3d-padzone').insertAdjacentHTML('beforeend',
    `<div class="gd-picks">${CHOICES.map(c => `<button type="button" class="g3g-btn g3d-choice gd-pick" data-k="${c.key}" disabled>${c.label}</button>`).join('')}</div>`);
  fitWrap(paper.querySelector('.gd-txt'), paper.querySelector('.gd-txin'), 60);
  const btns = [...scene.querySelectorAll('.gd-pick')];
  let mistakes = 0, tip = '', stepNow = 'busy', ei = 0;
  const evEl = (i) => paper.querySelector(`[data-e="${i}"]`);
  const wEl = (i) => paper.querySelector(`[data-w="${i}"]`);

  function ask() {
    const e = evs[ei];
    paper.querySelectorAll('.gd-ev').forEach((l, i) => l.classList.toggle('gd-ql-on', i === ei));
    setActive(paper, wEl(ei));
    btns.forEach(b => { b.disabled = false; b.classList.remove('g3d-choice-ok'); });
    stepNow = 'pick';
    const line = `${e.who} … ${e.after}`;
    if (ei === 0) say(`${setup} ${voice(line).replace('bao nhiêu', 'chắc chắn, có thể hay không thể')}`, `👆 <b>Chắc chắn</b>, <b>có thể</b> hay <b>không thể</b>?`);
    else say(voice(line).replace('bao nhiêu', 'chắc chắn, có thể hay không thể'), `👆 <b>Chắc chắn</b>, <b>có thể</b> hay <b>không thể</b>?`);
  }
  async function pick(key, b) {
    if (stepNow !== 'pick') return;
    sfx.tap();
    const e = evs[ei];
    if (key !== e.ans) {
      mistakes++;
      shake(b);
      hint(e.why, e.why);
      tip ||= 'Chỉ có màu đó: chắc chắn. Có màu đó và màu khác: có thể. Không có màu đó: không thể.';
      return;
    }
    stepNow = 'busy';
    btns.forEach(x => { x.disabled = true; });
    b.classList.add('g3d-choice-ok');
    const w = wEl(ei);
    setActive(paper, null);
    const word = CHOICES.find(c => c.key === key).label.toLowerCase();
    await sleep(flyDigit(word, b, w, { onLand: () => { w.textContent = word; w.classList.add('gd-word-ok'); sfx.pop(3); } }) + 200);
    ei++;
    if (ei < evs.length) { ask(); return; }
    paper.querySelectorAll('.gd-ev').forEach(l => l.classList.remove('gd-ql-on'));
    btns.forEach(x => x.classList.remove('g3d-choice-ok'));
    await trial();
    done(mistakes, { ok: 'Em chọn đúng khả năng xảy ra của từng câu.', tip: tip ? `Nhớ: ${tip}` : '' });
  }
  btns.forEach(b => b.addEventListener('click', () => pick(b.dataset.k, b)));

  /** Kết quả các lần thử: câu "có thể" của một màu cho thấy cả lần được và lần không được. */
  function plan() {
    const rnd = makeRng(m.seed);
    const ri = (k) => Math.floor(rnd() * k);
    if (m.kind === 'pens') {
      return Array.from({ length: tries }, () => { const i = ri(total); let j = ri(total - 1); if (j >= i) j++; return [i, j]; });
    }
    const out = Array.from({ length: tries }, () => ri(total));
    const may = evs.find(e => e.t === 'one' && e.ans === 'may');
    if (may) {
      const c = may.c[0];
      const hit = m.order.indexOf(c), miss = m.order.findIndex(x => x !== c);
      if (!out.some(i => m.order[i] === c)) out[1] = hit;
      if (!out.some(i => m.order[i] !== c)) out[2] = miss;
    }
    return out;
  }

  async function trial() {
    const calm = calmMotion();
    say(m.kind === 'spin' ? 'Cùng quay thử!' : m.kind === 'pens' ? 'Cùng lấy thử!' : 'Cùng bốc thử! Bốc xong lại bỏ vào hộp.',
      m.kind === 'spin' ? '🎡 Quay thử.' : '🤏 Thử xem!');
    const P = plan();
    let rot = 0;
    const wheel = paper.querySelector('.gd-wheel');
    for (let t = 0; t < tries; t++) {
      const slotEl = paper.querySelector(`[data-t="${t}"]`);
      if (m.kind === 'spin') {
        const N = total, s = 360 / N, j = P[t];
        const jitter = (makeRng(m.seed + t)() - 0.5) * s * 0.6;
        const target = -((j + 0.5) * s) + jitter;
        const base = Math.ceil((rot - target) / 360) * 360 + target;
        rot = base + (calm ? 360 : 360 * 3);
        const ms = calm ? 1300 : 1500;
        wheel.style.transition = `transform ${ms}ms cubic-bezier(.15,.7,.25,1)`;
        wheel.style.transform = `rotate(${rot}deg)`;
        sfx.tick();
        await sleep(ms + 150);
        const arrow = paper.querySelector('.gd-arrow').getBoundingClientRect();
        const c = m.order[j];
        await sleep(flyOne(ballSvg(c), { left: arrow.left, top: arrow.bottom, width: arrow.width, height: arrow.width }, slotEl.getBoundingClientRect(),
          { minMs: 380, maxMs: 560, onLand: () => { slotEl.innerHTML = ballSvg(c); slotEl.classList.add('gd-try-on'); sfx.pop(t + 2); } }) + 100);
      } else if (m.kind === 'bag') {
        const i = P[t], c = m.order[i];
        const ball = paper.querySelector(`.gd-ball[data-b="${i}"]`);
        ball.classList.add('gd-lift');
        await sleep(calm ? 450 : 300);
        await sleep(flyOne(ballSvg(c), ball.getBoundingClientRect(), slotEl.getBoundingClientRect(),
          { minMs: 420, maxMs: 620, onLand: () => { slotEl.innerHTML = ballSvg(c); slotEl.classList.add('gd-try-on'); sfx.pop(t + 2); } }) + 60);
        ball.classList.remove('gd-lift');
        await sleep(calm ? 350 : 200);
      } else {
        const [i, j] = P[t];
        const pa = paper.querySelector(`.gd-pen[data-b="${i}"]`), pb = paper.querySelector(`.gd-pen[data-b="${j}"]`);
        pa.classList.add('gd-lift'); pb.classList.add('gd-lift');
        await sleep(calm ? 500 : 350);
        slotEl.innerHTML = `<span class="gd-pn">${penSvg(m.order[i])}</span><span class="gd-pn">${penSvg(m.order[j])}</span>`;
        const halves = [...slotEl.querySelectorAll('.gd-pn')];
        halves.forEach(h => { h.style.visibility = 'hidden'; });
        const fa = flyOne(penSvg(m.order[i]), pa.getBoundingClientRect(), halves[0].getBoundingClientRect(), { minMs: 420, maxMs: 620, onLand: () => { halves[0].style.visibility = ''; sfx.pop(t + 2); } });
        const fb = flyOne(penSvg(m.order[j]), pb.getBoundingClientRect(), halves[1].getBoundingClientRect(), { minMs: 420, maxMs: 620, delay: 120, onLand: () => { halves[1].style.visibility = ''; slotEl.classList.add('gd-try-on'); sfx.pop(t + 3); } });
        await sleep(Math.max(fa, fb + 120) + 80);
        pa.classList.remove('gd-lift'); pb.classList.remove('gd-lift');
        await sleep(calm ? 350 : 200);
      }
    }
    sfx.ding();
    show('✅ Kết quả thử đúng như em chọn.');
    await sleep(600);
  }

  ask();
  if (import.meta.env.DEV) {
    window.__g3drill = { m, step: () => { if (stepNow === 'pick') pick(evs[ei].ans, btns.find(b => b.dataset.k === evs[ei].ans)); },
      wrong: () => { if (stepNow === 'pick') { const b = btns.find(x => x.dataset.k !== evs[ei].ans); pick(b.dataset.k, b); } } };
  }
}

// ── Kiểu riêng ─────────────────────────────────────────────────────────────────────────────────────
let stylesDone = false;
function injectDataStyles() {
  if (stylesDone) return;
  stylesDone = true;
  const st = document.createElement('style');
  st.textContent = `
    .gd-scene .g3d-paper { container-name: gdpaper; }
    .gd { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 1.4cqh; padding: 1.4cqh 2.2cqi 2cqh calc(clamp(1.4rem, 4cqi, 3rem) + 1.4cqi);
      font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; }
    .gd > * { min-width: 0; min-height: 0; }
    .gd svg { display: block; overflow: visible; }
    .gd-head { flex: none; font-size: min(6cqh, 3.6cqi, 2.5rem); line-height: 1.2; color: #334155; }
    .gd-qn { color: #64748B; }
    .gd-word { text-indent: 0; display: inline-grid; place-items: center; height: 1.3em; padding: 0 0.2em; border: 0.06em dashed #93C5FD; border-radius: 0.2em; color: #94A3B8; box-sizing: border-box; vertical-align: middle; }
    .gd-word-ok { border-color: #86EFAC; background: #F0FDF4; color: #15803D; }
    .gd .g3d-box { height: 1.3em; vertical-align: middle; text-indent: 0; }

    /* ── Kiểm đếm: tranh (trái) | bảng kiểm đếm (phải); dọc: tranh trên, bảng dưới ── */
    .gd-body { flex: 1 1 0; display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(0, 1fr); gap: 2cqi; }
    .gd-body > * { min-width: 0; min-height: 0; }
    .gd-pic { position: relative; border-radius: 1rem; border: 2px solid #E2E8F0; overflow: hidden; padding: 1.5%; box-sizing: border-box; }
    .gd-bg-cloth { background-color: #FFF1F2; background-image: repeating-linear-gradient(90deg, rgba(244,114,182,.18) 0 22px, transparent 22px 44px), repeating-linear-gradient(0deg, rgba(244,114,182,.18) 0 22px, transparent 22px 44px); border-color: #FBCFE8; }
    .gd-bg-desk { background: repeating-linear-gradient(176deg, #E9B872 0 26px, #DFAA62 26px 30px, #EDBF7C 30px 58px); border-color: #C08A4A; }
    .gd-bg-grid { background-color: #fff; background-image: linear-gradient(#DBEAFE 1.5px, transparent 1.5px), linear-gradient(90deg, #DBEAFE 1.5px, transparent 1.5px); background-size: 28px 28px; border-color: #BFDBFE; }
    .gd-bg-sky { background: linear-gradient(#7DD3FC, #E0F2FE 70%, #BBF7D0 70%, #86EFAC); border-color: #7DD3FC; }
    .gd-items { position: relative; width: 100%; height: 100%; display: grid; }
    .gd-it { position: relative; display: grid; place-items: center; min-width: 0; min-height: 0; }
    .gd-it svg { width: var(--s, 60px); height: var(--s, 60px); transform: translate(var(--x), var(--y)) rotate(var(--r)); transition: opacity .3s;
      filter: drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff); }
    .gd-ck { position: absolute; left: 50%; top: 50%; transform: translate(calc(-50% + var(--x) * 0.5), calc(-50% + var(--y) * 0.5)); font-size: calc(var(--s, 60px) * 0.55); color: #16A34A; font-weight: 900; opacity: 0; pointer-events: none;
      text-shadow: 2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff; }
    .gd-done svg { opacity: 0.32; }
    .gd-done .gd-ck { opacity: 1; transition: opacity .3s .2s; }
    .gd-cur svg { filter: drop-shadow(0 0 0 #fff) drop-shadow(0 0 6px #FACC15) drop-shadow(0 0 10px #F59E0B); animation: gdBob 1s ease-in-out infinite; }
    .gd-cur::before { content: ''; position: absolute; width: calc(var(--s, 60px) * 1.25); height: calc(var(--s, 60px) * 1.25); border-radius: 50%; background: radial-gradient(closest-side, rgba(254,240,138,.95), rgba(254,240,138,0));
      transform: translate(var(--x), var(--y)); }
    @keyframes gdBob { 50% { transform: translate(var(--x), calc(var(--y) - 8%)) rotate(var(--r)) scale(1.08); } }
    @media (prefers-reduced-motion: reduce) { @keyframes gdBob { 50% { transform: translate(var(--x), var(--y)) rotate(var(--r)) scale(1.06); } } .gd-cur svg { animation-duration: 2s; } }

    .gd-tbl { container-type: size; display: flex; flex-direction: column; gap: 2cqh; }
    .gd-thead, .gd-row { display: grid; grid-template-columns: 30% minmax(0, 1fr) 20%; align-items: center; column-gap: 2cqi; }
    .gd-thead { flex: none; font-size: min(5.6cqh, 5cqi); color: #64748B; padding: 0 3cqi; text-align: center; }
    .gd-thead span:first-child { text-align: left; }
    .gd-row { flex: 1 1 0; min-height: 0; container-type: size; padding: 0 3cqi; border: 2px solid #93C5FD; border-radius: 0.9rem; background: linear-gradient(#fff, #EFF6FF);
      box-shadow: 0 5px 0 #60A5FA; cursor: pointer; touch-action: manipulation; font-family: inherit; color: #1E3A8A; transition: transform .08s; }
    .gd-row:active { transform: translateY(3px); box-shadow: 0 2px 0 #60A5FA; }
    .gd-tbl-count .gd-row { cursor: default; box-shadow: 0 3px 0 #BFDBFE; border-color: #BFDBFE; }
    .gd-tbl-count .gd-row:active { transform: none; }
    .gd-row-on { background: #FFFBEB !important; border-color: #F59E0B !important; }
    .gd-kind { display: flex; align-items: center; gap: 0.3em; min-width: 0; height: 100%; }
    .gd-kpic { flex: none; height: min(78cqh, 14cqi); width: auto; aspect-ratio: 1; }
    .gd-kname { font-size: min(42cqh, 6.4cqi); font-weight: 700; line-height: 1.05; text-align: left; }
    .gd-marks { display: flex; align-items: center; gap: 2cqi; height: 100%; justify-content: flex-start; border-left: 2px dashed #BFDBFE; border-right: 2px dashed #BFDBFE; padding: 0 2cqi; }
    .gd-tg { height: min(80cqh, 16cqi); width: auto; aspect-ratio: 1; }
    .gd-tm { fill: none; stroke: ${INK}; stroke-width: 3.2; stroke-linecap: round; opacity: 0; }
    .gd-tm-on { opacity: 1; animation: gdMark .25s ease-out; }
    .gd-tm5.gd-tm-on { stroke: #DC2626; }
    @keyframes gdMark { from { opacity: 0; } }
    .gd-cnt { display: flex; justify-content: center; font-size: min(48cqh, 9cqi); font-family: 'Baloo 2', sans-serif; }

    /* ── Bảng số liệu: tên bảng, bảng to (cột là nút), ba câu hỏi ── */
    .gd-tab-title { flex: none; text-align: center; font-size: min(5.6cqh, 3.6cqi, 2.4rem); color: #9A3412; line-height: 1.2; }
    .gd-tboard { flex: 1.25 1 0; container-type: size; display: grid; grid-template-columns: minmax(0, 1.25fr) repeat(var(--n), minmax(0, 1fr)); gap: 1.2cqi;
      --fs: min(13cqh, calc(100cqi / (var(--n) + 1.4) / var(--len) * 1.75)); }
    .gd-lab, .gd-colb { display: grid; grid-template-rows: 1fr 1.2fr; min-width: 0; border-radius: 0.9rem; overflow: hidden; }
    .gd-lab { border: 2px solid #FDBA74; background: #FFF7ED; }
    .gd-colb { border: 2px solid #93C5FD; background: #fff; padding: 0; box-shadow: 0 5px 0 #60A5FA; cursor: default; font-family: inherit; font-weight: 700; color: #1E293B; transition: transform .08s; }
    .gd-pickable .gd-colb { cursor: pointer; animation: gdPulse 1.3s ease-in-out infinite; }
    .gd-pickable .gd-colb:active { transform: translateY(3px); box-shadow: 0 2px 0 #60A5FA; }
    @keyframes gdPulse { 50% { box-shadow: 0 5px 0 #60A5FA, 0 0 0 5px #FDE68A; } }
    @media (prefers-reduced-motion: reduce) { .gd-pickable .gd-colb { animation-duration: 2.6s; } }
    .gd-cell { display: grid; place-items: center; min-height: 0; text-align: center; line-height: 1.05; padding: 0 0.15em; }
    .gd-ch { font-size: var(--fs); color: #1E3A8A; background: #EFF6FF; border-bottom: 2px solid #BFDBFE; }
    .gd-lab .gd-ch, .gd-lab .gd-cv { font-size: calc(var(--fs) * 0.9); color: #9A3412; background: none; }
    .gd-lab .gd-ch { border-bottom: 2px solid #FED7AA; }
    .gd-cv { font-size: min(28cqh, calc(var(--fs) * 1.6)); color: #C2410C; }
    .gd-use { background: #FEF3C7 !important; border-color: #F59E0B !important; }
    .gd-use .gd-ch { background: #FDE68A; }
    .gd-qs { flex: 1 1 0; display: flex; align-items: center; justify-content: flex-start; overflow: hidden; }
    .gd-qin { display: flex; flex-direction: column; gap: 0.3em; width: 100%; line-height: 1.25; }
    .gd-ql, .gd-ev { white-space: normal; border-radius: 0.3em; padding: 0 0.2em 0 1.3em; text-indent: -1.1em; }
    .gd-ql > *, .gd-ev > * { white-space: nowrap; }
    .gd-ql-on { background: #FEF9C3; }

    /* ── Khả năng xảy ra: hộp / nón (trái) + dải thử | đề, ba câu, ba nút to ── */
    .gd-chance { display: grid; grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr); gap: 2.4cqi; }
    .gd-objz { display: flex; flex-direction: column; gap: 1.5cqh; min-height: 0; }
    .gd-objbox { position: relative; flex: 1 1 0; min-height: 0; border-radius: 1rem; background: linear-gradient(#E0F2FE, #F8FAFC); border: 2px solid #E2E8F0; overflow: hidden; }
    .gd-obj { position: absolute; inset: 4%; width: 92%; height: 92%; filter: drop-shadow(0 6px 6px rgba(15,23,42,.18)); }
    .gd-wheel { transform-box: view-box; transform-origin: 100px 108px; }
    .gd-ball, .gd-pen { transition: transform .3s ease, opacity .3s; }
    .gd-ball.gd-lift { transform: translateY(-12px); opacity: .45; }
    .gd-pen.gd-lift { transform: translateY(-30px); }
    .gd-tries { flex: none; height: 15cqh; display: flex; align-items: center; gap: 1.2cqi; padding: 0 1.2cqi; border: 2px dashed #CBD5E1; border-radius: 0.9rem; background: #F8FAFC; container-type: size; }
    .gd-tlab { font-size: min(36cqh, 7cqi); color: #64748B; }
    .gd-try { flex: 0 1 70cqh; min-width: 0; max-height: 70cqh; aspect-ratio: 1; border-radius: 50%; border: 2px dashed #CBD5E1; box-sizing: border-box; display: flex; justify-content: center; }
    .gd-try2 { flex-basis: 100cqh; max-height: 86cqh; aspect-ratio: 1.2; border-radius: 0.5rem; gap: 6%; }
    .gd-try-on { border-color: transparent; }
    .gd-pn { height: 100%; aspect-ratio: 24 / 118; }
    .gd-side { display: flex; flex-direction: column; gap: 2cqh; min-height: 0; }
    .gd-txt { flex: 1 1 0; min-height: 0; display: flex; align-items: center; overflow: hidden; }
    .gd-txin { display: flex; flex-direction: column; gap: 0.4em; width: 100%; line-height: 1.25; }
    .gd-setup { color: #334155; font-size: 0.9em; }
    .gd-chw { min-width: 5.2em; }
    .gd-picks { flex: none; height: 19cqh; container-type: size; display: flex; gap: 2cqi; padding-bottom: 6px; box-sizing: border-box; }
    .gd-pick { flex: 1 1 0; min-width: 0; height: 100%; max-width: none; font-size: min(34cqh, 5cqi); padding: 0 0.2em; white-space: nowrap; line-height: 1; }

    /* Tờ vở đứng / gần vuông: xếp dọc */
    .gd-chmode .g3d-keys { display: none; }
    .gd-chmode .gd-picks { height: 100%; flex-direction: column; gap: 3cqh; padding: 0 0 8px; }
    .gd-chmode .gd-pick { font-size: min(9cqh, 11cqi, 3rem); }
    @container (aspect-ratio > 1.7) {
      .gd-chmode .gd-picks { flex-direction: row; gap: 2cqi; }
      .gd-chmode .gd-pick { font-size: min(22cqh, 5.4cqi, 3rem); }
    }
    .g3g-has-result .gd-picks { visibility: hidden; }
    @container gdpaper (aspect-ratio < 1.25) {
      .gd-body { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1fr) minmax(0, 1fr); gap: 1.6cqh; }
      .gd-head { font-size: min(4.4cqh, 5.4cqi); }
      .gd-tab-title { font-size: min(4.4cqh, 5.4cqi); }
      .gd-tboard { flex: 1.3 1 0; }
      .gd-body { grid-template-rows: minmax(0, 0.9fr) minmax(0, 1.1fr); }
      .gd-chance { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1fr) minmax(0, 1.1fr); gap: 1.6cqh; }
      .gd-tries { height: 8cqh; }
      .gd-picks { height: 10cqh; }
    }
  `;
  document.head.appendChild(st);
}
