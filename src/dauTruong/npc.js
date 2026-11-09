/**
 * Đấu Trường Nhí: bạn ảo (NPC) cho khán phòng và bục thi. Hàm thuần, không import gì của trình duyệt: hôm nay chạy trên máy
 * (flow.js, games/dauTruong.js), sau này máy chủ phòng (realtime/arena.js) gọi đúng các hàm này để mọi máy thấy một cảnh.
 *
 * Nguồn bạn ảo: các "diễn viên quần chúng" của bảng xếp hạng (data/leaderboardCast.js, engine/leaderboardCast.js). Cùng
 * biệt danh, cùng lớp, cùng mã `cast-N`: bạn Khánh Linh lớp 3 ngồi trong khán phòng cũng là Khánh Linh lớp 3 trên bảng xếp hạng.
 * Mỗi lớp 1–5 có hơn 100 bạn (2026-11-09 thêm 100 bạn mới vào mỗi lớp) nên trong phòng ít gặp lại cùng người.
 *
 * Luật (docs/dau-truong/thiet-ke.md §4b):
 *   - KHÁN PHÒNG ƯU TIÊN: từ lúc phòng mở, bạn ảo vào ngồi dần (một phần ngồi sẵn, số còn lại vào rải tới giờ bắt đầu, sát giờ
 *     đông hơn). Người thật vào càng đông thì bạn ảo càng ít (bạn vào sau cùng về trước). Ghế người thật đã ngồi không bao giờ bị lấy.
 *   - BỤC THI: phòng mở là đã có 1–2 bạn ảo đứng sẵn trên bục; người thật không bao giờ đứng trước bạn ảo (một mình ở bục 1 trông
 *     không tự nhiên). Người thật bật "Em muốn lên bục" đứng ngay sau các bạn đứng sẵn. Còn thiếu thì MC lần lượt mời thêm bạn ảo
 *     đang ngồi dưới khán phòng (mốc PICK_AT, bạn giỏi dễ được mời hơn); tới giờ mà vẫn thiếu thì mời nốt. Người thật vào khi bục
 *     đã đủ: bạn ảo được mời sau cùng nhường chỗ, về lại ghế cũ (đủ 4 người thật thì cả bạn đứng sẵn cũng nhường).
 *   - TRÌNH ĐỘ: mỗi bạn một mức giỏi / khá / mới học theo nhịp học trên bảng xếp hạng (sao/tháng), quyết định xác suất biết đáp án
 *     (theo độ khó câu), thời gian nghĩ, có dám bấm chuông, chọn gói Về đích, đặt Ngôi sao hy vọng.
 *   - TẤT ĐỊNH: mọi thứ tính từ hạt giống `seed` (phòng + giờ bắt đầu) và thời điểm, nên hai máy cùng phòng thấy cùng các bạn ở
 *     cùng ghế, cùng thứ tự được mời. Riêng câu trả lời từng câu dùng hàm ngẫu nhiên truyền vào (máy chủ sau này bốc một lần).
 */
import { CAST } from '../data/leaderboardCast.js';
import { AISLE_AFTER, PUPILS, SEAT_IDS } from './rules.js';

/** Khán phòng đông nhất (bạn ảo + người thật), chừa ghế trống cho người vào sau. */
export const FILL = 34;
/** Phần bạn ảo đã ngồi sẵn lúc phòng mở. */
export const SEATED_AT_OPEN = 0.45;
/** Mốc (phần của thời gian chờ, 0 = phòng mở, 1 = giờ bắt đầu) MC mời bạn ảo thứ 1, 2, 3, 4 lên bục khi thiếu người. */
export const PICK_AT = [0.3, 0.5, 0.68, 0.84];

// ---- số giả tất định
function hash(s) {
  let h = 2166136261;
  for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  h ^= h >>> 15; h = Math.imul(h, 2246822507); h ^= h >>> 13;
  return h >>> 0;
}
/** Số 0..1 tất định từ các khoá. */
export const rand01 = (...k) => hash(k.join('|')) / 4294967296;

// ---- trình độ
/**
 * know: xác suất biết đáp án câu độ khó 1 (mỗi bậc khó hơn trừ `drop`); think: phần thời gian câu dùng để nghĩ [từ, tới];
 * guts: dám bấm chuông khi chưa chắc.
 */
export const SKILLS = {
  // join: khán giả ảo có chọn đáp án câu này không (ngồi dưới không phải câu nào cũng làm)
  gioi: { label: 'giỏi', know: 0.94, drop: 0.08, think: [0.12, 0.4], guts: 0.3, join: 0.7 },
  kha: { label: 'khá', know: 0.84, drop: 0.12, think: [0.2, 0.55], guts: 0.2, join: 0.55 },
  moi: { label: 'mới học', know: 0.7, drop: 0.14, think: [0.3, 0.75], guts: 0.12, join: 0.4 },
};
const SKILL_KEYS = Object.keys(SKILLS);

/** Nhân vật 3D theo ảnh đại diện trên bảng xếp hạng: bạn trai 4 kiểu đầu, bạn gái 3 kiểu cuối của PUPILS. */
function kindOf(avatar, id) {
  const m = /^(boys|girls)\/\D*(\d+)/.exec(avatar || '');
  const n = m ? +m[2] : hash(id);
  return m?.[1] === 'girls' ? 4 + (n % 3) : n % 4;
}

const rosterCache = new Map();
/**
 * Các bạn ảo của một lớp: { id: 'cast-N' (trùng bảng xếp hạng), name, kind (chỉ số PUPILS), skill ('gioi'|'kha'|'moi'), want }.
 * Trình độ theo cột sao/tháng của CAST trong lớp: 25% chăm nhất giỏi, 45% tiếp theo khá, còn lại mới học.
 * want: bạn ấy có thích lên bục không (khoảng 70%).
 */
export function roster(grade) {
  if (rosterCache.has(grade)) return rosterCache.get(grade);
  const list = [];
  CAST.forEach((c, i) => { if (c[2] === grade) list.push({ id: `cast-${i + 1}`, name: c[0], kind: kindOf(c[1], i), month: c[4] }); });
  const byMonth = [...list].sort((a, b) => b.month - a.month);
  const n = list.length;
  const out = list.map((m) => {
    const r = n > 1 ? byMonth.indexOf(m) / (n - 1) : 0.5;
    return { id: m.id, name: m.name, kind: Math.min(m.kind, PUPILS.length - 1), skill: r < 0.25 ? 'gioi' : r < 0.7 ? 'kha' : 'moi', want: rand01(m.id, 'want') < 0.7 };
  });
  rosterCache.set(grade, out);
  return out;
}

/** Điểm đẹp của ghế (nhỏ = đẹp): giữa khán phòng, gần lối đi, hàng B–C; cộng lệch ngẫu nhiên theo hạt giống. */
function seatScore(id, seed) {
  const r = id.charCodeAt(0) - 65, n = +id.slice(1);
  return Math.abs(r - 1.6) * 0.5 + Math.abs(n - (AISLE_AFTER + 0.5)) * 0.18 + rand01(seed, 'seat', id) * 2.2;
}

const planCache = new Map();
/** Thứ tự vào phòng của bạn ảo (tất định theo hạt giống): mỗi bạn một mốc vào `at` (0..1 của thời gian chờ). */
function plan(grade, seed) {
  const key = `${grade}|${seed}`;
  if (planCache.has(key)) return planCache.get(key);
  const list = roster(grade).map(m => {
    const r = rand01(seed, m.id, 'in');
    // SEATED_AT_OPEN số bạn ngồi sẵn (at 0); còn lại vào rải đều suốt lúc chờ, sát giờ dày hơn một chút (mũ 0,75)
    const at = r < SEATED_AT_OPEN ? 0 : ((r - SEATED_AT_OPEN) / (1 - SEATED_AT_OPEN)) ** 0.75 * 0.97;
    return { ...m, at, order: rand01(seed, m.id, 'ord') };
  }).sort((a, b) => a.at - b.at || a.order - b.order);
  const seats = [...SEAT_IDS].sort((a, b) => seatScore(a, seed) - seatScore(b, seed));
  const p = { list, seats };
  if (planCache.size > 20) planCache.clear();
  planCache.set(key, p);
  return p;
}

/**
 * Khán phòng lúc `frac` (0 = phòng mở, 1 = giờ bắt đầu; > 1: đang diễn, ai đã vào thì ngồi yên).
 * @param {object} o
 * @param {number} o.grade lớp
 * @param {string} o.seed hạt giống (phòng + giờ bắt đầu)
 * @param {number} o.frac
 * @param {Iterable<string>} [o.taken] ghế người thật đang ngồi (kể cả ghế mình)
 * @param {number} [o.real] số người thật trong phòng
 * @param {number} [o.fill] số bạn ảo tối đa của lượt này (liveCount.js roomNpc: một phần của số "đang học"); mặc định FILL
 * @returns {{ npc: object, seat: string }[]} bạn ảo đang ngồi và ghế của họ, theo thứ tự vào
 */
export function audienceAt({ grade, seed, frac, taken = [], real = 0, fill = FILL }) {
  const { list, seats } = plan(grade, seed);
  const busy = new Set(taken);
  const cap = Math.max(0, Math.min(list.length, fill, FILL - real, SEAT_IDS.length - busy.size - 2));
  // ai đến hôm nay: `cap` bạn đầu theo thứ tự bốc thăm (người thật vào thêm thì bạn cuối danh sách về); rồi ai tới giờ vào thì ngồi
  const here = [...list].sort((x, y) => x.order - y.order).slice(0, cap)
    .filter(m => m.at <= frac).sort((x, y) => x.at - y.at || x.order - y.order);
  // ghế: bạn vào trước chọn trước, ghế đẹp trước; nhóm hai bạn liền nhau đôi khi ngồi cạnh nhau (đi cùng nhau)
  const out = [];
  let si = 0;
  for (const m of here) {
    while (si < seats.length && busy.has(seats[si])) si++;
    if (si >= seats.length) break;
    busy.add(seats[si]);
    out.push({ npc: m, seat: seats[si] });
  }
  return out;
}

/** Mốc mời bạn ảo lên bục của một lượt: 1 hoặc 2 bạn đứng sẵn lúc phòng mở (mốc 0, theo hạt giống), các bạn sau theo PICK_AT. */
export function pickTimes(seed) {
  const pre = rand01(seed, 'pre') < 0.5 ? 1 : 2;
  return [...Array(pre).fill(0), ...PICK_AT.slice(PICK_AT.length - (4 - pre))];
}

/**
 * Bốn bục thi lúc `frac`. Phòng mở là đã có 1–2 bạn ảo đứng sẵn trên bục (người thật không bao giờ đứng trước bạn ảo, một mình
 * ở bục 1 trông không tự nhiên). Người thật muốn lên bục đứng ngay sau các bạn đứng sẵn (theo thứ tự truyền vào), rồi tới các bạn
 * ảo MC mời thêm ở các mốc PICK_AT. Thiếu chỗ cho người thật thì bạn ảo mời sau cùng nhường trước (đủ 4 người thật: hết bạn ảo).
 * `full`: tới giờ bắt đầu, mời nốt cho đủ 4 bục.
 * @param {object} o
 * @param {{ name: string, kind: number, me?: boolean, real?: string|number, seat?: string }[]} o.reals người thật muốn lên bục
 * @param {{ npc: object, seat: string }[]} o.audience kết quả audienceAt (chưa trừ ai)
 * @returns {{ pods: object[], picked: { npc: object, seat: string }[] }} pods: tối đa 4 phần tử
 *   ({ name, kind, skill, me?, real?, npc?, seat?, t? (mốc được mời) }); picked: bạn ảo đang đứng bục (ghế của họ để trống)
 */
export function podiumAt({ seed, frac, reals = [], audience, full = false }) {
  const humans = reals.slice(0, 4).map(r => {
    const x = { name: r.name, kind: r.kind, skill: r.skill || 'kha', me: !!r.me };
    if (r.real != null) { x.real = r.real; x.seat = r.seat; }
    return x;
  });
  const times = pickTimes(seed);
  const due = full ? 4 : times.filter(t => frac >= t).length;
  const n = Math.max(0, Math.min(4 - humans.length, due));
  // mời từng bạn một ở mốc của lần mời đó, chỉ trong số bạn đã ngồi lúc ấy: bạn đã mời giữ nguyên bục khi có bạn mới vào,
  // người thật vào thêm thì bỏ bớt từ cuối danh sách (bạn mời sau cùng về ghế trước).
  // Ưu tiên bạn thích lên bục, bạn giỏi (dễ thắng Vòng Chọn hơn), lệch ngẫu nhiên theo hạt giống.
  const boost = { gioi: 0.45, kha: 0.2, moi: 0 };
  const score = (a) => (a.npc.want ? 1 : 0) + boost[a.npc.skill] + rand01(seed, a.npc.id, 'pick');
  const picked = [], used = new Set();
  for (let k = 0; k < n; k++) {
    const t = frac >= times[k] ? times[k] : Math.min(frac, 1);
    let best = null;
    for (const a of audience) if (!used.has(a.npc.id) && a.npc.at <= t && (!best || score(a) > score(best))) best = a;
    if (!best) for (const a of audience) if (!used.has(a.npc.id) && (!best || score(a) > score(best))) best = a;
    if (!best) break;
    used.add(best.npc.id); picked.push({ ...best, t: times[k] });
  }
  const pod = (a) => ({ name: a.npc.name, kind: a.npc.kind, skill: a.npc.skill, npc: a.npc.id, seat: a.seat, t: a.t });
  const early = picked.filter(a => a.t === 0).map(pod), late = picked.filter(a => a.t !== 0).map(pod);
  return { pods: [...early, ...humans, ...late], picked: picked.map(({ npc, seat }) => ({ npc, seat })) };
}

// ---- trả lời (dùng hàm ngẫu nhiên `rnd`, mặc định Math.random)
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const sk = (s) => SKILLS[s] || SKILLS.kha;

/**
 * Xác suất biết đáp án. level: độ khó câu 1–3 (Về đích: 10 điểm = 1, 20 = 2, 30 = 3); round: 'khoidong' | 'tangtoc' | 'vedich' | 'sel'.
 * Tăng tốc là câu tư duy: khó hơn một chút với mọi bạn.
 */
export function knowP(skill, level = 1, round = '') {
  const s = sk(skill);
  return clamp(s.know - s.drop * (clamp(level, 1, 3) - 1) - (round === 'tangtoc' ? 0.08 : 0), 0.15, 0.98);
}

/**
 * Một bạn ảo đọc câu và quyết định: { ok: biết đáp án, at: giây sẽ chốt (tính từ lúc đồng hồ chạy) }.
 * Bạn không biết thì nghĩ lâu hơn rồi đoán (đoán bốn ô: 1/4 trúng).
 */
export function decide(skill, { level = 1, round = '', sec = 15, rnd = Math.random } = {}) {
  const s = sk(skill), know = rnd() < knowP(skill, level, round);
  const [a, b] = s.think;
  const f = know ? a + (b - a) * rnd() : b + (0.92 - b) * rnd();
  return { ok: know || rnd() < 0.25, at: Math.max(1.2, sec * f) };
}

/**
 * Khán giả ảo dưới khán phòng: { ok, at } như decide, nhưng không phải câu nào cũng chọn (at Infinity = ngồi xem) và kém
 * thí sinh trên bục một chút (không có áp lực nhưng cũng không chăm chú bằng). cap: điểm hiện tại đã chạm trần thì ngồi xem,
 * để điểm khán giả ảo không vượt các bạn trên bục (khán giả trả lời mọi câu, thí sinh chỉ câu của lượt mình).
 */
export function audienceAnswer(skill, { level = 1, round = '', sec = 15, score = 0, cap = Infinity, rnd = Math.random } = {}) {
  const s = sk(skill);
  if (score >= cap || rnd() >= s.join) return { ok: false, at: Infinity };
  const know = rnd() < clamp(knowP(skill, level, round) - 0.12, 0.15, 0.9);
  const [a, b] = s.think;
  const f = know ? a + (b - a) * rnd() : b + (0.92 - b) * rnd();
  return { ok: know || rnd() < 0.25, at: Math.max(1.2, sec * f) };
}

/**
 * Bấm chuông giành quyền (Khởi động lượt chung, Về đích cướp điểm): { at: giây bấm (Infinity: không bấm), ok }.
 * Biết thì phần lớn bấm (bạn giỏi bấm nhanh), chưa chắc thì chỉ bạn bạo dạn mới liều.
 */
export function buzzPlan(skill, { level = 1, round = '', sec = 6, rnd = Math.random, steal = false } = {}) {
  const s = sk(skill), know = rnd() < knowP(skill, level, round);
  const go = know ? rnd() < (steal ? 0.75 : 0.85) : rnd() < s.guts;
  if (!go) return { at: Infinity, ok: false };
  const [a, b] = s.think;
  const at = Math.max(0.6, sec * (steal ? 0.15 + (a + (b - a) * rnd()) * 0.6 : a + (b - a) * rnd() * 0.8));
  return { at, ok: know || rnd() < 0.25 };
}

/** Về đích: chọn gói (chỉ số trong VD.pkgs: 0 = 30, 1 = 50, 2 = 70, 3 = 90). lead: thua bạn dẫn đầu bao nhiêu điểm. */
export function pickPackage(skill, lead = 0, rnd = Math.random) {
  const base = { gioi: 2, kha: 1, moi: 0 }[skill] ?? 1;
  let k = base + (lead > 50 ? 1 : 0) + (rnd() < 0.35 ? 1 : 0) - (rnd() < 0.2 ? 1 : 0);
  return clamp(k, 0, 3);
}

/** Về đích: có đặt Ngôi sao hy vọng trước câu này không (val: điểm câu, last: câu cuối của gói). */
export function wantStar(skill, val = 10, last = false, rnd = Math.random) {
  const p = (knowP(skill, val / 10) - 0.5) * (val === 30 ? 1.4 : val === 20 ? 0.9 : 0.4) + (last ? 0.25 : 0);
  return rnd() < clamp(p, 0.03, 0.85);
}

/** Khán giả ảo lúc lật đáp án: tư thế ngồi ('sitCheer' | 'sitClap' | 'sitYes' | 'sitSad' | '') theo đúng / sai của mình. */
export function reactOf(right, rnd = Math.random) {
  const r = rnd();
  if (right) return r < 0.4 ? 'sitYes' : r < 0.7 ? 'sitCheer' : 'sitClap';
  return r < 0.3 ? 'sitSad' : r < 0.75 ? 'sitClap' : '';
}

export { SKILL_KEYS };
