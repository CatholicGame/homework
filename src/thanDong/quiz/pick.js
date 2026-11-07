/**
 * Rút câu hỏi (hàm thuần, không tải tệp): trình duyệt (src/quiz/index.js) và máy chủ phòng (realtime/questions.js) dùng chung.
 */

/** Một câu sẵn sàng hỏi: phương án đã xáo, `a` là chỉ số đáp án đúng sau khi xáo. */
export function ask(q, level, rand = Math.random) {
  if (q.fixed) return { id: q.id, level, q: q.q, o: [...q.o], a: q.a, ex: q.ex, cat: q.cat };
  const idx = [0, 1, 2, 3];
  for (let i = 3; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  return { id: q.id, level, q: q.q, o: idx.map(i => q.o[i]), a: idx.indexOf(0), ex: q.ex, cat: q.cat };
}

/**
 * Một ván 15 câu từ 15 level đã tải, mỗi level một câu, tránh các câu đã hỏi (`seen`: Set id); level đã hỏi hết thì cho lặp lại.
 * `rand` để rút giống nhau khi cùng hạt giống (kiểm thử).
 */
export function pickFrom(levels, { seen = new Set(), rand = Math.random } = {}) {
  return levels.map((list, i) => {
    const fresh = list.filter(q => !seen.has(q.id));
    const pool = fresh.length ? fresh : list;
    return ask(pool[Math.floor(rand() * pool.length)], i + 1, rand);
  });
}
