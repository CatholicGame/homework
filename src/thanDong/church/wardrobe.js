/**
 * Tủ đồ của người chơi Gặp gỡ online: danh mục vật phẩm (ITEMS), bộ đồ đang mặc (`look`), mặc lên nhân vật 3D.
 *
 * Nhân vật `avatar` (church-online/blender/scripts/build_wardrobe.py → public/church/characters/avatar.glb) chứa sẵn mọi món
 * dựng bằng Blender, mỗi món một mesh `av_<ô>_<món>` trên cùng bộ xương: mặc là bật / tắt mesh và tô màu vật liệu riêng của
 * người ấy (`av_skin`, `av_hair`, `av_t_<ô>`). Những món không nằm trên xương (cánh, mây, bạn đồng hành, hiệu ứng) do
 * wings.js / companions.js vẽ bằng three.js.
 *
 * Cách có một món (`how`): free (ai cũng có), buy (đổi bằng Hạt giống), set (đủ con dấu / thẻ thánh trong sổ hành hương thì
 * tự mở), season (chỉ đổi được trong mùa phụng vụ của nó, có rồi thì giữ mãi). Hạt giống kiếm bằng việc tốt trong ứng dụng; ba mẹ cũng có thể góp bánh để bé nhận thêm hạt (bag.js `bought`).
 * Bộ đồ gửi qua phòng online thành một chuỗi ngắn (`encodeLook`, máy chủ chỉ kiểm tra ký tự và độ dài).
 */
import * as THREE from 'three';

/** Thứ tự các ô trong bảng Tủ đồ. */
export const SLOTS = [
  { id: 'hair', vi: 'Tóc', en: 'Hair' },
  { id: 'top', vi: 'Áo', en: 'Top' },
  { id: 'bottom', vi: 'Quần, váy', en: 'Bottom' },
  { id: 'shoes', vi: 'Giày dép', en: 'Shoes' },
  { id: 'hat', vi: 'Mũ nón', en: 'Hat' },
  { id: 'face', vi: 'Kính', en: 'Glasses' },
  { id: 'neck', vi: 'Đeo cổ', en: 'Neck' },
  { id: 'back', vi: 'Đeo lưng', en: 'Back' },
  { id: 'hand', vi: 'Cầm tay', en: 'In hand' },
  { id: 'fly', vi: 'Để bay', en: 'To fly' },
  { id: 'pet', vi: 'Bạn đồng hành', en: 'Companion' },
  { id: 'fx', vi: 'Hiệu ứng', en: 'Effect' },
];
/** Ô có thể để trống (bỏ ra). */
export const OPTIONAL = new Set(['hat', 'face', 'neck', 'back', 'hand', 'fly', 'pet', 'fx']);
/** Ô có màu chọn được. */
export const TINTED = { top: 'topC', bottom: 'bottomC', hat: 'hatC', neck: 'neckC', back: 'backC' };

/**
 * Cấp độ của vật phẩm (tier): độ quý hiếm, màu viền thẻ trong Tủ đồ / Vật phẩm. Giá đi theo cấp (đại khái):
 *   1 Thường   0–60 hạt      đồ mặc hằng ngày
 *   2 Hiếm     45–135 hạt    đồ đẹp, đồ của một hội đoàn, đồ theo mùa
 *   3 Quý      150–360 hạt   áo dòng, nhạc cụ, phần thưởng thành tích
 *   4 Báu vật  không đổi bằng hạt: chỉ mở bằng thành tích (docs/HatGiong.md 7.2)
 * Giá viết trong ITEMS là giá cũ, nhân PRICE_K khi dựng (hạt kiếm nhanh hơn từ khi có hạt cho cả ứng dụng, 2026-11-05).
 * Món `set` mở bằng thành tích: need = { level } cấp bậc Mùa gặt (engine/seeds.js LEVELS), { cert } séc chứng nhận câu 10 / 15,
 * { cards } thẻ thánh (phim các thánh đã xem hết), { stamps } con dấu sổ hành hương (đang ẩn).
 */
export const TIERS = [
  null,
  { vi: 'Thường', en: 'Common', c: '#a7b0a6' },
  { vi: 'Hiếm', en: 'Rare', c: '#5fb6e6' },
  { vi: 'Quý', en: 'Precious', c: '#b892f2' },
  { vi: 'Báu vật', en: 'Treasure', c: '#e9c46a' },
];
export const PRICE_K = 2;
const I = (slot, vi, en, how = 'free', price = 0, more = {}) => ({ slot, vi, en, how, price: price * PRICE_K, tier: 1, ...more });
export const ITEMS = {
  // tóc (màu ở hairC)
  short: I('hair', 'Tóc ngắn', 'Short'),
  spiky: I('hair', 'Tóc dựng', 'Spiky'),
  side: I('hair', 'Tóc rẽ ngôi', 'Side part'),
  buzz: I('hair', 'Tóc húi cua', 'Buzz cut'),
  curly: I('hair', 'Tóc xoăn', 'Curly'),
  long: I('hair', 'Tóc dài', 'Long'),
  bob: I('hair', 'Tóc ngang vai', 'Bob'),
  pony: I('hair', 'Tóc buộc đuôi ngựa', 'Ponytail'),
  braids: I('hair', 'Tóc tết hai bím', 'Two braids'),
  bun: I('hair', 'Tóc búi', 'Bun'),
  wavy: I('hair', 'Tóc dài gợn sóng', 'Long wavy', 'buy', 20, { tier: 2 }),
  // áo
  polo: I('top', 'Áo thun có cổ', 'Polo shirt', 'free', 0, { tint: 8 }),
  tee: I('top', 'Áo phông', 'T-shirt', 'free', 0, { tint: 5 }),
  shirt: I('top', 'Áo sơ mi', 'Shirt', 'free', 0, { tint: 0 }),
  dress: I('top', 'Váy liền', 'Dress', 'free', 0, { tint: 3, full: true }),
  raincoat: I('top', 'Áo mưa', 'Rain poncho', 'buy', 15, { tint: 5 }),
  sweater: I('top', 'Áo len', 'Sweater', 'buy', 20, { tint: 2 }),
  hoodie: I('top', 'Áo khoác có mũ', 'Hoodie', 'buy', 20, { tint: 4 }),
  jacket: I('top', 'Áo khoác gió', 'Windbreaker', 'buy', 35, { tint: 9, tier: 2 }),
  tntt: I('top', 'Áo Thiếu Nhi Thánh Thể', 'Eucharistic Youth shirt', 'buy', 30, { tier: 2 }),
  aodai: I('top', 'Áo dài', 'Áo dài', 'buy', 40, { tint: 2, tier: 2 }),
  choir: I('top', 'Áo ca đoàn', 'Choir robe', 'buy', 45, { tint: 11, full: true, tier: 2 }),
  shepherd: I('top', 'Áo mục đồng', 'Shepherd tunic', 'season', 30, { season: 'giang-sinh', full: true, tier: 2 }),
  altar: I('top', 'Áo giúp lễ', 'Altar server robe', 'buy', 50, { tint: 2, full: true, tier: 3 }),
  habit: I('top', 'Áo dòng nữ tu', 'Sister’s habit', 'buy', 60, { tint: 13, full: true, tier: 3 }),
  cassock: I('top', 'Áo chùng thầy giảng', 'Seminarian’s cassock', 'buy', 60, { full: true, tier: 3 }),
  angel: I('top', 'Áo thiên thần', 'Angel robe', 'season', 50, { season: 'giang-sinh', full: true, tier: 3 }),
  magi: I('top', 'Áo Ba Vua', 'Magi robe', 'season', 60, { season: 'giang-sinh', tint: 11, full: true, tier: 3 }),
  // quần, váy
  jeans: I('bottom', 'Quần bò', 'Jeans', 'free', 0, { tint: 9 }),
  trousers: I('bottom', 'Quần dài', 'Trousers', 'free', 0, { tint: 10 }),
  shorts: I('bottom', 'Quần soóc', 'Shorts', 'free', 0, { tint: 8 }),
  skirt: I('bottom', 'Váy', 'Skirt', 'free', 0, { tint: 3 }),
  pleated: I('bottom', 'Váy xếp ly', 'Pleated skirt', 'buy', 10, { tint: 10 }),
  longskirt: I('bottom', 'Váy dài', 'Long skirt', 'buy', 15, { tint: 12 }),
  silk: I('bottom', 'Quần lụa (mặc với áo dài)', 'Silk trousers', 'buy', 15, { tier: 2 }),
  // giày dép
  sneaker: I('shoes', 'Giày thể thao', 'Sneakers'),
  shoe: I('shoes', 'Giày đen', 'Black shoes'),
  sandal: I('shoes', 'Dép quai hậu', 'Sandals'),
  slipper: I('shoes', 'Dép tông', 'Flip-flops'),
  ballet: I('shoes', 'Giày búp bê', 'Ballet flats', 'buy', 10),
  rainboots: I('shoes', 'Ủng đi mưa', 'Rain boots', 'buy', 20, { tier: 2 }),
  boots: I('shoes', 'Giày hành hương', 'Pilgrim boots', 'buy', 25, { tier: 2 }),
  // mũ nón (cover: tóc cao bị mũ đè, ẩn phần nhô; hood: trùm cả tóc)
  bow: I('hat', 'Nơ cài tóc', 'Hair bow', 'buy', 10, { tint: 2 }),
  cap: I('hat', 'Mũ lưỡi trai', 'Cap', 'buy', 15, { tint: 9, cover: true }),
  straw: I('hat', 'Mũ rơm', 'Straw hat', 'buy', 15, { cover: true }),
  beanie: I('hat', 'Mũ len', 'Beanie', 'season', 15, { season: 'giang-sinh', tint: 2, cover: true }),
  beret: I('hat', 'Mũ nồi', 'Beret', 'buy', 25, { tint: 10, cover: true, tier: 2 }),
  nonla: I('hat', 'Nón lá', 'Conical hat', 'buy', 25, { cover: true, tier: 2 }),
  mantilla: I('hat', 'Khăn voan đi lễ', 'Lace veil', 'buy', 30, { tier: 2 }),
  khandong: I('hat', 'Khăn đóng', 'Khăn đóng turban', 'buy', 35, { tint: 10, cover: true, tier: 2 }),
  headcloth: I('hat', 'Khăn trùm mục đồng', 'Shepherd headcloth', 'season', 15, { season: 'giang-sinh', hood: true, tier: 2 }),
  wreath: I('hat', 'Vòng hoa', 'Flower wreath', 'season', 25, { season: 'thang-hoa', tier: 2 }),
  veil: I('hat', 'Khăn lúp nữ tu', 'Sister’s veil', 'buy', 50, { tint: 14, hood: true, tier: 3 }),
  pilgrim: I('hat', 'Mũ hành hương', 'Pilgrim hat', 'set', 0, { need: { level: 3 }, cover: true, tier: 3 }),
  crown: I('hat', 'Vương miện Ba Vua', 'Magi crown', 'season', 60, { season: 'giang-sinh', cover: true, tier: 3 }),
  halo: I('hat', 'Vầng sáng thiên thần', 'Angel halo', 'set', 0, { need: { cert: 15 }, tier: 4 }),
  // kính
  glasses: I('face', 'Kính tròn', 'Round glasses', 'buy', 10),
  square: I('face', 'Kính vuông', 'Square glasses', 'buy', 10),
  sunglasses: I('face', 'Kính râm', 'Sunglasses', 'buy', 20, { tier: 2 }),
  // đeo cổ
  tie: I('neck', 'Cà vạt', 'Necktie', 'buy', 15, { tint: 2 }),
  bowtie: I('neck', 'Nơ cổ', 'Bow tie', 'buy', 15, { tint: 2 }),
  scarf: I('neck', 'Khăn quàng Thiếu Nhi', 'Youth scarf', 'buy', 15, { tint: 9, tier: 2 }),
  cross: I('neck', 'Dây chuyền Thánh Giá', 'Cross necklace', 'buy', 25, { tier: 2 }),
  lei: I('neck', 'Vòng hoa đeo cổ', 'Flower garland', 'season', 25, { season: 'thang-hoa', tier: 2 }),
  tau: I('neck', 'Thánh Giá Tau', 'Tau cross', 'buy', 30, { tier: 2 }),
  medal: I('neck', 'Ảnh Đức Mẹ Ban Ơn', 'Miraculous Medal', 'set', 0, { need: { cert: 10 }, tier: 3 }),
  scapular: I('neck', 'Áo Đức Bà', 'Scapular', 'set', 0, { need: { cards: 10 }, tier: 3 }),
  // đeo lưng
  pack: I('back', 'Ba lô', 'Backpack', 'buy', 20, { tint: 7 }),
  gui: I('back', 'Gùi Tây Nguyên', 'Highland basket', 'buy', 30, { tier: 2 }),
  cape: I('back', 'Áo choàng ngắn', 'Short cape', 'buy', 35, { tint: 2, tier: 2 }),
  guitar: I('back', 'Đàn ghi-ta', 'Guitar', 'buy', 80, { tier: 3 }),
  cloak: I('back', 'Áo choàng hành hương', 'Pilgrim cape', 'set', 0, { need: { level: 4 }, tier: 3 }),
  // cầm tay
  bread: I('hand', 'Ổ bánh mì', 'Loaf of bread', 'buy', 10),
  balloon: I('hand', 'Bóng bay', 'Balloon', 'buy', 15),
  candle: I('hand', 'Cây nến', 'Candle', 'buy', 15),
  bible: I('hand', 'Sách Thánh Kinh', 'Bible', 'buy', 25, { tier: 2 }),
  flag: I('hand', 'Cờ Thiếu Nhi Thánh Thể', 'Eucharistic Youth flag', 'buy', 30, { tier: 2 }),
  bell: I('hand', 'Chuông giúp lễ', 'Altar bells', 'buy', 35, { tier: 2 }),
  lamp: I('hand', 'Đèn dầu', 'Oil lamp', 'buy', 35, { tier: 2 }),
  staff: I('hand', 'Gậy mục tử', 'Shepherd’s crook', 'season', 25, { season: 'giang-sinh', tier: 2 }),
  rosary: I('hand', 'Chuỗi Mân Côi', 'Rosary', 'season', 20, { season: 'man-coi', tier: 2 }),
  palm: I('hand', 'Cành lá', 'Palm branch', 'season', 15, { season: 'le-la', tier: 2 }),
  lily: I('hand', 'Hoa huệ Phục Sinh', 'Easter lily', 'season', 20, { season: 'phuc-sinh', tier: 2 }),
  bouquet: I('hand', 'Bó hoa dâng Đức Mẹ', 'Flowers for Mary', 'season', 20, { season: 'thang-hoa', tier: 2 }),
  lantern: I('hand', 'Đèn ngôi sao', 'Star lantern', 'season', 30, { season: 'giang-sinh', tier: 3 }),
  procross: I('hand', 'Thánh Giá rước', 'Processional cross', 'set', 0, { need: { level: 6 }, tier: 4 }),
  // để bay (lets: fly; kind: wings | cloud, tone: màu)
  wings: I('fly', 'Đôi cánh', 'Wings', 'free', 0, { lets: ['fly'], kind: 'wings' }),
  cloud: I('fly', 'Đám mây', 'Little cloud', 'buy', 60, { lets: ['fly'], kind: 'cloud', tier: 3 }),
  cloudPink: I('fly', 'Mây hoàng hôn', 'Sunset cloud', 'buy', 90, { lets: ['fly'], kind: 'cloud', tone: 'pink', tier: 3 }),
  wingsGold: I('fly', 'Đôi cánh vàng', 'Golden wings', 'set', 0, { need: { cert: 15 }, lets: ['fly'], kind: 'wings', tone: 'gold', tier: 4 }),
  // bạn đồng hành
  chick: I('pet', 'Gà con', 'Little chick', 'buy', 50, { tier: 2 }),
  butterfly: I('pet', 'Bướm vàng', 'Yellow butterfly', 'buy', 60, { tier: 2 }),
  lamb: I('pet', 'Chiên con', 'Little lamb', 'buy', 100, { tier: 3 }),
  dove: I('pet', 'Bồ câu trắng', 'White dove', 'set', 0, { need: { cards: 20 }, tier: 4 }),
  // hiệu ứng
  steps: I('fx', 'Bước chân sáng', 'Glowing footsteps', 'buy', 30, { tier: 2 }),
  petals: I('fx', 'Cánh hoa theo bước chân', 'Petals where you walk', 'buy', 40, { tier: 2 }),
  bloom: I('fx', 'Hoa nở khi cúi chào', 'Flowers when bowing', 'buy', 40, { tier: 2 }),
  trail: I('fx', 'Vệt sáng khi bay', 'Light trail in flight', 'buy', 50, { tier: 3 }),
  stars: I('fx', 'Sao bay lên khi cầu nguyện', 'Stars rise when you pray', 'buy', 60, { tier: 3 }),
};
// ---- Ai tài năng nhất (homework): bộ đồ cho học sinh tiểu học, không có đồ tôn giáo; đổi bằng SAO ----
// Bỏ hẳn các món tôn giáo (vẫn nằm trong avatar.glb, chỉ không có trong danh mục). Đồ "theo mùa phụng vụ" thành đồ đổi bằng sao
// bất cứ lúc nào; món thành tích theo thẻ thánh / sổ hành hương thành món theo cấp bậc sao (engine/seeds.js LEVELS) hay giấy khen.
for (const id of ['tntt', 'choir', 'shepherd', 'altar', 'habit', 'cassock', 'angel', 'magi', 'mantilla', 'veil', 'pilgrim', 'halo', 'headcloth',
  'cross', 'tau', 'medal', 'scapular', 'cloak', 'candle', 'bible', 'flag', 'bell', 'staff', 'rosary', 'palm', 'lily', 'bouquet', 'procross']) delete ITEMS[id];
Object.assign(ITEMS.scarf, { vi: 'Khăn quàng đỏ', en: 'Red scarf', how: 'free', price: 0, tint: 2, tier: 1 });
Object.assign(ITEMS.boots, { vi: 'Giày cao cổ', en: 'Boots' });
Object.assign(ITEMS.crown, { vi: 'Vương miện thần đồng', en: 'Prodigy crown', how: 'set', price: 0, need: { cert: 15 }, tier: 4 });
Object.assign(ITEMS.lantern, { vi: 'Đèn ông sao', en: 'Star lantern' });
Object.assign(ITEMS.stars, { vi: 'Sao bay lên khi cúi chào', en: 'Stars rise when you bow' });
Object.assign(ITEMS.lamb, { vi: 'Cừu con', en: 'Little lamb' });
Object.assign(ITEMS.dove, { how: 'set', need: { level: 5 } });
Object.assign(ITEMS.wingsGold, { need: { cert: 12 } });
for (const it of Object.values(ITEMS)) if (it.how === 'season') { it.how = 'buy'; delete it.season; }
// Đồ học sinh + đồ trang trí dựng riêng cho homework (scripts/blender/build_avatar_hs.py). Mặt (av_base), tóc đuôi ngựa,
// kính tròn, khăn quàng đỏ cũng được dựng lại theo ảnh mẫu bốn bạn học sinh.
Object.assign(ITEMS, {
  messy: I('hair', 'Tóc bồng', 'Fluffy hair'),
  uniform: I('top', 'Áo đồng phục', 'School shirt', 'free', 0, { tint: 0 }),
  schoolshorts: I('bottom', 'Quần soóc đồng phục', 'School shorts', 'free', 0, { tint: 9 }),
  schoolsneaker: I('shoes', 'Giày vải và tất trắng', 'Canvas shoes, white socks'),
  maryjane: I('shoes', 'Giày quai hồng', 'Pink strap shoes'),
  headband: I('hat', 'Băng đô', 'Hairband', 'free', 0, { tint: 5 }),
  laurel: I('hat', 'Vòng nguyệt quế', 'Laurel wreath', 'buy', 40, { tier: 3 }),
  gradcap: I('hat', 'Mũ tốt nghiệp', 'Graduation cap', 'buy', 50, { cover: true, tier: 3 }),
  laurelGold: I('hat', 'Vòng nguyệt quế vàng', 'Golden laurel', 'set', 0, { need: { cert: 10 }, tier: 4 }),
  muffler: I('neck', 'Khăn choàng cổ', 'Knitted muffler', 'buy', 15, { tint: 8, tier: 2 }),
  sash: I('neck', 'Băng đeo vinh danh', 'Honour sash', 'buy', 45, { tint: 2, tier: 3 }),
  goldmedal: I('neck', 'Huy chương vàng', 'Gold medal', 'set', 0, { need: { level: 3 }, tint: 2, tier: 3 }),
  champcape: I('back', 'Áo choàng vô địch', 'Champion cape', 'buy', 90, { tint: 2, tier: 3 }),
  pencil: I('hand', 'Bút chì khổng lồ', 'Giant pencil', 'buy', 15),
  wand: I('hand', 'Gậy ngôi sao', 'Star wand', 'buy', 30, { tier: 2 }),
  trophy: I('hand', 'Cúp vàng', 'Gold trophy', 'set', 0, { need: { cert: 15 }, tier: 4 }),
});

/** Đôi cánh hay đám mây (và màu) của món để bay. */
export const flyKind = (id) => ITEMS[id]?.kind || '';
export const flyTone = (id) => ITEMS[id]?.tone || '';

/**
 * Nhân vật cơ bản: bộ đồ khởi đầu chọn nhanh (thẻ Nhân vật của Tủ đồ). Chọn một nhân vật thì được tặng luôn các món của bộ
 * ấy (không trừ hạt, bag.gift), rồi vẫn thay từng món như thường.
 */
export const BASES = [
  { id: 'boy', vi: 'Cậu bé', en: 'Boy', look: { hair: 'spiky', hairC: 0, top: 'tee', topC: 8, bottom: 'shorts', bottomC: 10, shoes: 'sneaker' } },
  { id: 'girl', vi: 'Cô bé', en: 'Girl', look: { hair: 'braids', hairC: 0, top: 'dress', topC: 3, shoes: 'ballet', hat: 'bow', hatC: 2 } },
  { id: 'pupil', vi: 'Học sinh nam', en: 'Schoolboy', look: { hair: 'messy', hairC: 1, top: 'uniform', topC: 0, bottom: 'schoolshorts', bottomC: 9, shoes: 'schoolsneaker', neck: 'scarf', neckC: 2 } },
  { id: 'pupilGirl', vi: 'Học sinh nữ', en: 'Schoolgirl', look: { hair: 'pony', hairC: 1, top: 'uniform', topC: 0, bottom: 'pleated', bottomC: 9, shoes: 'maryjane', neck: 'scarf', neckC: 2 } },
  { id: 'pupilGlasses', vi: 'Bạn đeo kính', en: 'Boy with glasses', look: { hair: 'messy', hairC: 0, top: 'uniform', topC: 0, bottom: 'schoolshorts', bottomC: 9, shoes: 'schoolsneaker', neck: 'scarf', neckC: 2, face: 'glasses' } },
  { id: 'pupilBand', vi: 'Bạn băng đô', en: 'Girl with hairband', look: { hair: 'bob', hairC: 1, top: 'uniform', topC: 0, bottom: 'pleated', bottomC: 9, shoes: 'maryjane', neck: 'scarf', neckC: 2, hat: 'headband', hatC: 5 } },
  { id: 'teen', vi: 'Anh lớp trên', en: 'Older boy', look: { hair: 'side', hairC: 1, top: 'polo', topC: 8, bottom: 'jeans', bottomC: 9, shoes: 'sneaker' } },
  { id: 'lady', vi: 'Chị áo dài', en: 'Girl in áo dài', look: { hair: 'long', hairC: 0, top: 'aodai', topC: 0, bottom: 'silk', shoes: 'sandal' } },
];
/** MC Thầy Minh: áo sơ mi trắng, quần sẫm, cà vạt đỏ, kính (world.js dựng MC bằng avatar thay tu sĩ của kinh-thanh). */
export const HOST_LOOK = { hair: 'side', hairC: 0, skin: 1, top: 'shirt', topC: 0, bottom: 'trousers', bottomC: 10, shoes: 'shoe', neck: 'tie', neckC: 2, face: 'square' };
/** Bộ đồ đầy đủ của một nhân vật cơ bản (các ô phụ để trống). */
export const baseLook = (b) => cleanLook({ ...DEFAULT_LOOK, ...b.look });
/** Các món phải trả hạt trong bộ của một nhân vật cơ bản (được tặng khi chọn). */
export const baseGifts = (b) => Object.values(b.look).filter(v => typeof v === 'string' && ITEMS[v] && ITEMS[v].how !== 'free');

/** Món trong avatar.glb: tên mesh (hand `bouquet` / hat `wreath` khác tên mesh). */
const MESH = { bouquet: 'flowers', wreath: 'flowers' };
export const meshOf = (id) => `av_${ITEMS[id].slot}_${MESH[id] || id}`;
const IN_GLB = new Set(['hair', 'top', 'bottom', 'shoes', 'hat', 'face', 'neck', 'back', 'hand']);

/** Bảng màu chung cho áo, quần, mũ…; da; tóc (sRGB). */
export const PAL = ['#f2f0ea', '#e8dcc0', '#c0392b', '#e88aa8', '#e8873a', '#f0c93a', '#4f9a55', '#3a9a95', '#6aa3d9', '#3a5ea8',
  '#1f2c4f', '#7a4fb0', '#7a5638', '#8a8d90', '#2a2c30'];
export const SKINS = ['#fcdac1', '#f2c6a0', '#d6a07a', '#a8714f'];
export const HAIRS = ['#2a211c', '#563c2b', '#8f6a4e', '#b07a4a', '#d6b27a', '#c9c6c0'];

export const DEFAULT_LOOK = { skin: 0, hairC: 2, hair: 'short', top: 'polo', topC: 8, bottom: 'jeans', bottomC: 9, shoes: 'sneaker',
  hat: '', hatC: 9, face: '', neck: '', neckC: 9, back: '', backC: 7, hand: '', fly: '', pet: '', fx: '' };

const KEYS = { skin: 's', hairC: 'hc', hair: 'h', top: 't', topC: 'tc', bottom: 'b', bottomC: 'bc', shoes: 'f', hat: 'a', hatC: 'ac',
  face: 'e', neck: 'n', neckC: 'nc', back: 'k', backC: 'kc', hand: 'd', fly: 'y', pet: 'p', fx: 'x' };
const BACK = Object.fromEntries(Object.entries(KEYS).map(([k, v]) => [v, k]));
const NUM = new Set(['skin', 'hairC', 'topC', 'bottomC', 'hatC', 'neckC', 'backC']);
const MAX = { skin: SKINS.length, hairC: HAIRS.length };

/** Làm sạch một bộ đồ (từ máy hay từ người khác): món không có / sai ô thì về mặc định. */
export function cleanLook(o) {
  const out = { ...DEFAULT_LOOK };
  if (!o || typeof o !== 'object') return out;
  for (const k of Object.keys(DEFAULT_LOOK)) {
    const v = o[k];
    if (NUM.has(k)) { if (Number.isInteger(v) && v >= 0 && v < (MAX[k] || PAL.length)) out[k] = v; }
    else if (v === '' && OPTIONAL.has(k)) out[k] = '';
    else if (typeof v === 'string' && ITEMS[v]?.slot === k) out[k] = v;
  }
  return out;
}

export function encodeLook(look) {
  return Object.entries(KEYS).filter(([k]) => look[k] !== DEFAULT_LOOK[k]).map(([k, s]) => `${s}:${look[k]}`).join(',');
}
export function decodeLook(code) {
  const o = {};
  if (typeof code !== 'string') return cleanLook(o);
  for (const part of code.split(',')) {
    const [s, v = ''] = part.split(':');
    const k = BACK[s];
    if (k) o[k] = NUM.has(k) ? +v : v;
  }
  return cleanLook(o);
}

/** Cánh / mây có cho bay không. */
export const canFly = (look) => !!ITEMS[look.fly]?.lets?.includes('fly');

const DARK = { top_dark: 0.75, bottom_dark: 1.25, hat_dark: 0.75, back_dark: 0.6 };
const color = (hex, k = 1) => new THREE.Color(hex).multiplyScalar(k);

/**
 * Mặc bộ đồ `look` lên một Actor có avatar.glb. Lần đầu tách bản sao vật liệu riêng cho người này (onMaterial(m) để vá ánh
 * đêm…). Không đụng tới cánh, mây, bạn đồng hành (world.js / companions.js).
 */
export function applyLook(actor, look, onMaterial) {
  const L = cleanLook(look);
  const top = ITEMS[L.top], hatDef = ITEMS[L.hat];
  let hair = L.hair;
  if (hatDef?.hood) hair = '';
  else if (hatDef?.cover && /^(short|curly|bun|messy|pony)$/.test(hair)) hair = 'buzz';
  const want = new Set(['av_base', meshOf(L.top), meshOf(L.shoes)]);
  if (hair) want.add(meshOf(hair));
  if (!top.full) want.add(meshOf(L.bottom));
  for (const k of ['hat', 'face', 'neck', 'back', 'hand']) if (L[k] && IN_GLB.has(ITEMS[L[k]].slot)) want.add(meshOf(L[k]));
  if (!actor.avParts) {
    actor.avParts = [];
    actor.root.traverse(o => { if (/^av_/.test(o.name) && !/^av_.*_\d+$/.test(o.name) && (o.isMesh || o.isGroup || o.isSkinnedMesh)) actor.avParts.push(o); });
    // tên nhóm (nhiều vật liệu) và mesh con trùng tên gốc: chỉ giữ những cái ngoài cùng
    actor.avParts = actor.avParts.filter(o => !actor.avParts.includes(o.parent));
    const own = new Map();
    actor.root.traverse(o => {
      if (!o.isMesh) return;
      o.material = [].concat(o.material).map(m => {
        if (!/^av_(skin|hair|t_)/.test(m.name)) return m;
        if (!own.has(m.name)) { const c = m.clone(); c.userData = { own: true }; onMaterial?.(c); own.set(m.name, c); }
        return own.get(m.name);
      });
      if (o.material.length === 1) o.material = o.material[0];
    });
    actor.avMats = own;
  }
  for (const o of actor.avParts) o.visible = want.has(o.name);
  const paint = (name, hex, k = 1) => { const m = actor.avMats.get(name); if (m) m.color.copy(color(hex, k)); };
  paint('av_skin', SKINS[L.skin]);
  paint('av_hair', HAIRS[L.hairC]);
  for (const [slot, key] of Object.entries(TINTED)) {
    const item = ITEMS[L[slot]];
    const c = PAL[L[key] ?? item?.tint ?? 0];
    paint(`av_t_${slot}`, c);
    paint(`av_t_${slot}_dark`, c, DARK[`${slot}_dark`]);
  }
  actor.outfit = L;
  return L;
}
