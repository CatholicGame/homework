/**
 * Bốc thẻ cho một ván (docs/thiet-ke-tro-choi-tri-nho.md §4.2, §2.3).
 *   1. Chia làm 3 rổ: A thẻ hay quên (weakness > 0), B thẻ chưa gặp, C thẻ đã gặp.
 *   2. Lấy tối đa 60% từ A, rồi B, rồi C cho đủ n.
 *   3. Trộn nhiều chủ đề: xoay vòng giữa các chủ đề để chủ đề nào cũng có mặt, không chủ đề nào quá nửa (khi đủ thẻ).
 *   4. Không cho hai thẻ chung khoá giá trị, không cho hai mặt giống hệt nhau trên cùng bàn.
 */

import { weakness } from './store.js';

const faceSig = (f) => `${f.kind}|${f.text}`;

/** Thẻ `fact` có đặt được cạnh các thẻ đã chọn không (khoá + mặt không trùng). */
function fits(fact, keys, sigs) {
  return !keys.has(fact.key) && fact.faces.every((f) => !sigs.has(faceSig(f)));
}
function take(fact, out, keys, sigs) {
  out.push(fact);
  keys.add(fact.key);
  fact.faces.forEach((f) => sigs.add(faceSig(f)));
}

export function pickFacts(pool, n, rng, stats = {}) {
  const topics = [...new Set(pool.map((f) => f.topic))];
  const cap = topics.length >= 2 ? Math.max(1, Math.floor(n / 2)) : n;
  const weakCap = Math.round(n * 0.6);
  // Thứ tự ưu tiên trong mỗi chủ đề: hay quên (nặng trước) → chưa gặp → đã gặp; cùng rổ thì ngẫu nhiên.
  const rank = (f) => {
    const st = stats[f.uid];
    const w = weakness(st);
    if (w > 0) return 0;
    return st?.seen ? 2 : 1;
  };
  const queues = topics.map((t) => {
    const list = rng.shuffle(pool.filter((f) => f.topic === t));
    return list.map((f, i) => ({ f, r: rank(f), w: -weakness(stats[f.uid]), i }))
      .sort((a, b) => a.r - b.r || (a.r === 0 ? a.w - b.w : 0) || a.i - b.i)
      .map((x) => x.f);
  });
  const out = [], keys = new Set(), sigs = new Set();
  const perTopic = new Map();
  let weak = 0;
  // Xoay vòng các chủ đề (bắt đầu từ chủ đề ngẫu nhiên).
  const order = rng.shuffle(queues.map((_, i) => i));
  for (let pass = 0; pass < 2 && out.length < n; pass++) {
    let progress = true;
    while (out.length < n && progress) {
      progress = false;
      for (const ti of order) {
        if (out.length >= n) break;
        const q = queues[ti];
        if (pass === 0 && (perTopic.get(ti) || 0) >= cap) continue;
        const idx = q.findIndex((f) => fits(f, keys, sigs) && (pass === 1 || rank(f) !== 0 || weak < weakCap));
        if (idx < 0) continue;
        const [f] = q.splice(idx, 1);
        if (rank(f) === 0) weak++;
        take(f, out, keys, sigs);
        perTopic.set(ti, (perTopic.get(ti) || 0) + 1);
        progress = true;
      }
    }
  }
  return rng.shuffle(out);
}

/**
 * Thẻ bẫy: mặt đáp hay nhầm của các thẻ trên bàn (48 cạnh 7 × 8), không bằng giá trị thẻ nào trên bàn.
 * Trả về [{ face, key, of }] — of: thẻ mà bẫy này "giả dạng".
 */
export function pickTraps(facts, k, rng) {
  const keys = new Set(facts.map((f) => f.key));
  const sigs = new Set(facts.flatMap((f) => f.faces.map(faceSig)));
  const out = [];
  for (const f of rng.shuffle(facts)) {
    if (out.length >= k) break;
    const c = rng.shuffle(f.confusers()).find((x) => !keys.has(x.key) && !sigs.has(faceSig(x.face)));
    if (!c) continue;
    keys.add(c.key);
    sigs.add(faceSig(c.face));
    out.push({ ...c, of: f });
  }
  return out;
}

/** Ba nút của một câu Ôn nhanh: mặt đáp đúng + 2 mặt hay nhầm, xáo thứ tự. */
export function quizChoices(fact, rng) {
  const right = fact.faces[1];
  const wrong = rng.shuffle(fact.confusers()).filter((c) => faceSig(c.face) !== faceSig(right)).slice(0, 2).map((c) => c.face);
  return rng.shuffle([{ face: right, ok: true }, ...wrong.map((face) => ({ face, ok: false }))]);
}
