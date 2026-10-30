/**
 * Trò (theo định dạng của grade3Games/loop.js) cho 🧰 Công cụ Tiếng Việt; book = một sách (book.js: TV3, TV2…).
 *   lessonGame(book, bài) — ✏️ Luyện tập của bài: 8 câu, công cụ của bài lần lượt (trộn thứ tự), dữ liệu của riêng bài.
 *   skillGame(book, khoá, bài?) — luyện riêng một công cụ: 8 câu; có bài → dữ liệu của bài, không có → mọi bài + kho chung.
 */

import { SKILLS, skillsOf, poolOf } from './skills.js';
import { mountMission } from './play.js';
import { TEACHER } from '../grade3Drills/kit.js';

const MISSIONS = 8;
const lessonsOf = (l) => (l.mix ? [l, ...l.mix] : [l]);

function makeGame(book, { id, title, icon, levelId, levelTitle, skills, pool }) {
  return {
    id: `${book.prefix}-${id}`, title, icon, unitWord: 'câu', starPrefix: book.prefix, npcs: [TEACHER],
    againText: 'Làm lại (đề mới)',
    levels: [{ id: levelId, n: 1, title: levelTitle, missions: MISSIONS }],
    summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> câu.`,
    makeMission(rng, level, history) {
      if (!history.length) this._order = rng.shuffle(skills.slice());
      const order = this._order || skills;
      const key = order[history.length % order.length];
      const seen = new Set(history.map(h => h?.key));
      let m;
      for (let k = 0; k < 30; k++) {
        m = SKILLS[key].make(rng, pool);
        m.key = `${key}:${JSON.stringify(m.kind === 'spell' ? m.spell.item : [m.body, m.text, m.items?.map(x => x.t), m.pieces, m.head])}`;
        if (!seen.has(m.key)) break;
      }
      return { ...m, skill: key };
    },
    mountMission(stage, m, level, api) { mountMission(stage, m, api); },
  };
}

export function lessonGame(book, lesson) {
  const pool = poolOf(lessonsOf(lesson), { book });
  return makeGame(book, {
    id: lesson.id, title: `Bài ${lesson.n}`, icon: '✏️', levelId: lesson.id,
    levelTitle: lesson.mix ? `${lesson.title}: Luyện tập` : `Bài ${lesson.n}: Luyện tập`,
    skills: skillsOf(lesson), pool,
  });
}

export function skillGame(book, key, lesson = null) {
  const S = SKILLS[key];
  // Từ bài: dữ liệu của bài (ít quá thì thêm kho chung); từ dải công cụ: mọi bài + kho chung.
  const pool = lesson ? poolOf(lessonsOf(lesson), { book }) : poolOf(book.LESSONS, { bank: book.bank, book });
  return makeGame(book, {
    id: `tool-${key}${lesson ? `-${lesson.id}` : ''}`, title: S.name, icon: S.icon,
    // cùng khoá sao với dải công cụ: mỗi công cụ nhận sao một lần, dù luyện từ bài nào
    levelId: `tool-${key}`, levelTitle: lesson ? `${S.name} · Bài ${lesson.n}` : S.name,
    skills: [key], pool,
  });
}
