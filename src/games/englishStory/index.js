// Truyện hoạt hình cho bài đọc tiếng Anh (phần 🎧 Nghe). Thêm bài: vẽ stories/enNNN.js (tự nhận, không cần sửa file này).
const FILES = import.meta.glob('./stories/en[0-9][0-9][0-9].js');
export const STORIES = Object.fromEntries(Object.entries(FILES).map(([p, load]) => [`en-${p.match(/en(\d{3})\.js$/)[1]}`, load]));
export const hasStory = (id) => !!STORIES[id];
export const loadPlayer = () => import('./player.js');
