/**
 * Một cuốn sách của 🧰 Công cụ Tiếng Việt (lớp 2, lớp 3…): chủ điểm → bài, kho chung, khoá sao.
 * Bộ máy (skills.js, play.js, game.js, màn danh sách trong tv3Tools.js) dùng chung, mỗi sách chỉ khác dữ liệu.
 *   makeBook({ prefix: 'tvtool3', kicker, source, data: [...CD1, ...], topics: [['Chủ điểm 1', 'Tên', [1, 2, …, 'gk']]], bank, desc })
 */

export function makeBook({ topics, data, bank = null, ...info }) {
  const ALL = data.map(l => ({ ...l, id: `bai-${l.n}` }));
  const byN = new Map(ALL.map(l => [String(l.n), l]));
  // Bài ôn tập: mix = số các bài được ôn → thay bằng chính các bài đó
  for (const l of ALL) if (l.mix) l.mix = l.mix.map(k => byN.get(String(k))).filter(Boolean);
  const TOPICS = topics.map(([short, title, ns], i) => ({ num: i + 1, short, title, lessons: ns.map(k => byN.get(String(k))).filter(Boolean) }));
  const LESSONS = TOPICS.flatMap(t => t.lessons);
  return {
    ...info, TOPICS, LESSONS, bank,
    meanings: LESSONS.flatMap(l => l.meaning || []),
    lessonByN: (n) => byN.get(String(n)) || null,
  };
}

export const pagesText = (l) => (l.pages[1] && l.pages[1] !== l.pages[0] ? `trang ${l.pages[0]}–${l.pages[1]}` : `trang ${l.pages[0]}`);
