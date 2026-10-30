/**
 * Chỉ để xem thử bố cục (scripts/games-preview.html): mỗi cấp là một công cụ, đề lấy từ kho chung + mọi bài.
 *   /scripts/games-preview.html?mod=tv3Tools/preview.js&game=PREVIEW&lv=0&steps=3   (&tvbook=tv2: Tiếng Việt 2)
 * lv theo thứ tự các công cụ sách có dữ liệu (thứ tự SKILLS: kinds, find, sentype, build, …, para, spell).
 */

import { SKILLS, poolOf } from './skills.js';
import { mountMission } from './play.js';
import { TEACHER } from '../grade3Drills/kit.js';
import { TV3 } from './catalog.js';
import { TV2 } from '../tv2Tools/catalog.js';

// ?tvbook=tv2 → dữ liệu Tiếng Việt 2
const book = new URLSearchParams(location.search).get('tvbook') === 'tv2' ? TV2 : TV3;
const pool = poolOf(book.LESSONS, { bank: book.bank, book });
const keys = Object.keys(SKILLS).filter(k => SKILLS[k].has(pool));

export const PREVIEW = {
  id: 'tvtool3-preview', title: 'Xem thử', icon: '🧰', unitWord: 'câu', starPrefix: 'tvtool3-dev', npcs: [TEACHER],
  levels: keys.map((k, i) => ({ id: `dev-${k}`, n: i + 1, title: SKILLS[k].name, skill: k, missions: 3 })),
  summaryText: (ok, total) => `${ok}/${total}`,
  makeMission: (rng, level) => SKILLS[level.skill].make(rng, pool),
  mountMission: (stage, m, level, api) => mountMission(stage, m, api),
};
