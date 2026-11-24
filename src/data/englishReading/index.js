// 100 bài đọc tiếng Anh, 5 cấp × 20 bài. Thiết kế: docs/tieng-anh/thiet-ke-bai-doc.md
import level1 from './level1.js';
import level2 from './level2.js';
import level3 from './level3.js';
import level4 from './level4.js';
import level5 from './level5.js';
import alien from './alien.js';
import kind from './kind.js';
import vietsu from './vietsu.js';

export const LEVELS = [
  { level: 1, name: 'Starter', cefr: 'Pre-A1', lessons: level1 },
  { level: 2, name: 'Elementary 1', cefr: 'A1', lessons: level2 },
  { level: 3, name: 'Elementary 2', cefr: 'A1+ / A2', lessons: level3 },
  { level: 4, name: 'Pre-intermediate', cefr: 'A2', lessons: level4 },
  { level: 5, name: 'Intermediate', cefr: 'A2+ / B1', lessons: level5 },
];

// Bộ chủ đề (bài 101+): mỗi bài vẫn có level (độ khó 1–5) để đếm từ, chấm, nhưng nằm ở tab chủ đề, không vào bản đồ ngữ pháp.
// Bài trong bộ có trường pack = key; gloss / speak của bộ ở gloss/<key>.js, speak/<key>.js.
export const THEMES = [
  { key: 'alien', icon: '👽', name: 'Bạn từ hành tinh khác', note: 'Bíp, cậu bé người ngoài hành tinh, rơi xuống Hà Nội và làm bạn với Minh. 10 tập nối nhau, khó dần từ Cấp 1 đến Cấp 5.', lessons: alien },
  { key: 'kind', icon: '💛', name: 'Chuyện nhân văn', note: 'Những câu chuyện nổi tiếng về lòng tốt, lòng biết ơn và nghị lực, khó dần từ Cấp 1 đến Cấp 5.', lessons: kind },
  { key: 'vietsu', icon: '📜', name: 'Nhân vật lịch sử Việt Nam', note: 'Những người anh hùng, người tài của Việt Nam, xếp theo thời gian từ Hai Bà Trưng đến Quang Trung.', lessons: vietsu },
];

export const LESSONS = [...LEVELS.flatMap((l) => l.lessons), ...THEMES.flatMap((t) => t.lessons)];
/** Tên file gloss / speak của một bài: level<n> hoặc key của bộ chủ đề. */
export const dataFileOf = (lesson) => lesson.pack || `level${lesson.level}`;
export const lessonById = (id) => LESSONS.find((l) => l.id === id);

/** Bảng tra từ theo ngữ cảnh của một bài ({ words, phrases }), tải riêng theo cấp vì khá nặng. */
export const loadGloss = (lesson) =>
  import(`./gloss/${dataFileOf(lesson)}.js`).then((m) => m.default[lesson.id] || { words: {}, phrases: {} });

/** Từ vựng mở rộng của một bài ({ more: [], topics: [{ name, words }] }), words/<file>.js; chưa có thì rỗng. */
export const loadWords = (lesson) =>
  import(`./words/${dataFileOf(lesson)}.js`).then((m) => m.default[lesson.id] || { more: [], topics: [] }).catch(() => ({ more: [], topics: [] }));

/** Câu hỏi phần 🎤 Nói của một bài (speak/level<n>.js), cấp chưa có thì []. */
export const loadSpeak = (lesson) =>
  import(`./speak/${dataFileOf(lesson)}.js`).then((m) => m.default[lesson.id] || []).catch(() => []);
