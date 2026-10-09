/**
 * Lớp 2 — Vở bài tập Toán 2 (Tập Hai)
 * Nguồn: Vở bài tập Toán 2 — Tập hai (Lê Anh Vinh chủ biên), bộ sách "Kết nối tri thức
 * với cuộc sống" (NXB Giáo dục Việt Nam). Bài 37–75 (đánh số tiếp Tập một), mỗi bài chia theo Tiết.
 * Dùng chung engine/giao diện với Vở Bài Tập Toán 3 (grade3Workbook.js → renderWorkbook).
 * Nội dung từng bài nằm trong src/games/grade2Workbook/bai37-44.js … bai71-75.js.
 */

import { renderWorkbook } from './grade3Workbook.js';
import { makeRelated } from './lessonHelp.js';
import { KNOWLEDGE2 } from './grade2Knowledge/index.js';
import { EXPLORE_MAP2 } from './grade2Explore/map.js';
import { GRADE2_GAMES } from '../data/features.js';
import { levelsForUnit as gamesForUnit } from './grade2Games/catalog.js';
import { BAI_37_44 } from './grade2Workbook/bai37-44.js';
import { BAI_45_51 } from './grade2Workbook/bai45-51.js';
import { BAI_52_58 } from './grade2Workbook/bai52-58.js';
import { BAI_59_64 } from './grade2Workbook/bai59-64.js';
import { BAI_65_70 } from './grade2Workbook/bai65-70.js';
import { BAI_71_75 } from './grade2Workbook/bai71-75.js';

const UNITS = [...BAI_37_44, ...BAI_45_51, ...BAI_52_58, ...BAI_59_64, ...BAI_65_70, ...BAI_71_75];

// Khoá sao dùng chung tiền tố 'workbook2' với Tập Một (mã bài bai-37… không trùng).
const WORKBOOK2_TAP2_CONFIG = {
  units: UNITS,
  storageKey: 'g2w2-progress-v1',
  starBook: 'workbook2',
  lastUnitKey: 'g2w2-last-unit',
  badge: '📙',
  title: 'Vở Bài Tập Toán 2',
  subtitle: 'Tập Hai — Bài 37–75',
  menuLabel: 'Chọn bài để luyện tập:',
  unitWord: 'bài',
  unitName: (u) => `Bài ${u.number}. ${u.title}`,
  // Trò chơi tăng cường Toán 2 (grade2Games.js) — hai thẻ Tập Một / Tập Hai dùng chung danh sách trò.
  gamesBook: 'g2', gamesEnabled: GRADE2_GAMES, gamesLevelsForUnit: gamesForUnit,
  loadGames: GRADE2_GAMES ? () => import('./grade2Games.js') : null, // production chưa bật: không đóng gói code trò chơi
  // 📘 Kiến thức / 🔎 Khám phá trên mỗi câu (lớp phủ): lessonHelp.js.
  related: makeRelated({ book: 'SGK Toán 2', knowledge: KNOWLEDGE2, exploreMap: EXPLORE_MAP2, xbook: 'x2' }),
};

export function render(app, onBack, { open } = {}) {
  renderWorkbook(app, onBack, { ...WORKBOOK2_TAP2_CONFIG, open });
}
