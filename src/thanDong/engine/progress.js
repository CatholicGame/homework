/**
 * Túi đồ trường quay (church/bag.js): món đã đổi (`owned`, `paid` = số sao đã trả), món được tặng (`gift`), bộ đồ (`look`), nhân vật
 * (`base`), biệt danh (`nick`), lượt ghế nóng (`hot`), giấy khen (`certs`), câu khán giả đúng mỗi ngày (`quiz`).
 * Lưu theo tài khoản homework ở `thandong-bag-v1@<id>` (auth.scopedKey); cloudSync.js đồng bộ khoá này lên Firestore như các sách.
 */
import { scopedKey } from '../../engine/auth.js';

const KEY = 'thandong-bag-v1';
export function loadBag() {
  try { return JSON.parse(localStorage.getItem(scopedKey(KEY))) || {}; } catch { return {}; }
}
export function saveBag(bag) {
  try { localStorage.setItem(scopedKey(KEY), JSON.stringify(bag)); } catch { /* không lưu được thì thôi */ }
  window.dispatchEvent(new CustomEvent('tth:data-changed'));   // → cloudSync.js
}
/** bag.js của kinh-thanh đọc tiến trình xem phim (thẻ thánh): trường quay không có phim. */
export const loadProgress = () => ({ stories: {}, bag: loadBag() });
