/**
 * Hình và ô chạm của "Bé Tập Làm Toán — 99 đề" (cắt bằng scripts/extract-pre4.py từ scripts/pre4/*.json).
 *   img('p05_rau')   → đường dẫn src/assets/pre4/p05_rau.webp
 *   zones('p56_thu') → [[x%, y%, w%, h%], …] các ô chạm đã khai báo trong JSON
 *   itemsOf(url)     → khung từng đồ vật để chạm đếm của hình (theo đường dẫn img()), hoặc null
 */
import ZONES from './zones.json';
import ITEMS from './items.json';

// Hình hình học đã vẽ lại nét (tên.svg, cùng khung với ảnh cắt) được ưu tiên hơn ảnh scan tên.webp.
const byName = (glob) => Object.entries(glob).map(([path, url]) => [path.match(/([^/]+)\.\w+$/)[1], url]);
const IMG = Object.fromEntries([
  ...byName(import.meta.glob('../../../assets/pre4/*.webp', { eager: true, import: 'default' })),
  ...byName(import.meta.glob('../../../assets/pre4/*.svg', { eager: true, import: 'default' })),
]);

export function img(name) {
  if (!IMG[name]) console.warn(`pre4: thiếu hình ${name} — chạy python scripts/extract-pre4.py`);
  return IMG[name];
}

export function zones(name) {
  if (!ZONES[name]) console.warn(`pre4: thiếu ô chạm của ${name}`);
  return ZONES[name] || [];
}

const NAME_OF = Object.fromEntries(Object.entries(IMG).map(([name, url]) => [url, name]));

export function itemsOf(url) {
  return ITEMS[NAME_OF[url]] || null;
}
