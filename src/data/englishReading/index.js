// 100 bài đọc tiếng Anh, 5 cấp × 20 bài. Thiết kế: docs/tieng-anh/thiet-ke-bai-doc.md
import level1 from './level1.js';
import level2 from './level2.js';
import level3 from './level3.js';
import level4 from './level4.js';
import level5 from './level5.js';

export const LEVELS = [
  { level: 1, name: 'Starter', cefr: 'Pre-A1', lessons: level1 },
  { level: 2, name: 'Elementary 1', cefr: 'A1', lessons: level2 },
  { level: 3, name: 'Elementary 2', cefr: 'A1+ / A2', lessons: level3 },
  { level: 4, name: 'Pre-intermediate', cefr: 'A2', lessons: level4 },
  { level: 5, name: 'Intermediate', cefr: 'A2+ / B1', lessons: level5 },
];

export const LESSONS = LEVELS.flatMap((l) => l.lessons);
export const lessonById = (id) => LESSONS.find((l) => l.id === id);

/** Bảng tra từ theo ngữ cảnh của một bài ({ words, phrases }), tải riêng theo cấp vì khá nặng. */
export const loadGloss = (lesson) =>
  import(`./gloss/level${lesson.level}.js`).then((m) => m.default[lesson.id] || { words: {}, phrases: {} });

/** Câu hỏi phần 🎤 Nói của một bài (speak/level<n>.js), cấp chưa có thì []. */
export const loadSpeak = (lesson) =>
  import(`./speak/level${lesson.level}.js`).then((m) => m.default[lesson.id] || []).catch(() => []);
