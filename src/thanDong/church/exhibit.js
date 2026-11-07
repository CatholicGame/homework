// Triển lãm các thánh trong Hầm mộ dưới Đền thờ (Nhà thờ Online, khu `grotte`, mô hình build_vatican_grotte.py): mỗi phim về
// một vị thánh / một nơi thánh / một phép lạ là một bức tranh trong một hốc tường cuốn vòm (ảnh thật của phim, không có thì
// ảnh bìa phim), bảng tên dưới tranh, hai cây nến trên bậu; chạm vào là bảng thông tin và ▶ xem phim như các chỗ thánh
// (shrines.js). Không cần dựng lại mô hình khi có phim mới: tranh vẽ lúc chạy từ kho truyện vào các hốc của layout.niches.
//
// Mỗi nhóm một hoặc vài hành lang (GALLERIES, khoá = tên hành lang trong layout): đi vào theo bức tường bên phải, quay ra
// theo bức tường bên trái (thứ tự hốc của layout). Phía tây gian chính: Việt Nam (Tử Đạo theo tỉnh Bắc vào Nam, bốn hành lang,
// rồi Linh địa); phía đông: Mười Ba Tông Đồ, các thánh khắp thế giới từ cũ tới mới (SAINTS), các phép lạ (MIRACLES).
import { TINH } from '../stories/books.js';

export const EXHIBIT_GROUPS = [
  { id: 'tong-do', name: 'Mười Ba Tông Đồ', en: 'The Thirteen Apostles' },
  { id: 'tu-dao', name: 'Các Thánh Tử Đạo Việt Nam', en: 'The Vietnamese Martyrs' },
  { id: 'linh-dia', name: 'Linh địa Việt Nam', en: 'Holy places of Vietnam' },
  { id: 'cac-thanh', name: 'Các thánh qua các thời đại', en: 'Saints through the ages' },
  { id: 'phep-la', name: 'Các phép lạ', en: 'Miracles' },
];
/** Hành lang của mỗi nhóm trong hầm mộ (khoá của layout.niches, layout.signs), lấp lần lượt. */
export const GALLERIES = { 'tong-do': ['td'], 'tu-dao': ['vn1', 'vn2', 'vn3', 'vn4'], 'linh-dia': ['ld'], 'cac-thanh': ['ct'], 'phep-la': ['pl'] };

/**
 * Các thánh khắp thế giới theo thời các ngài sống (năm qua đời, từ cũ tới mới); một vị có nhiều phim thì một giá tranh, ảnh của
 * phim đầu. era: dòng nhỏ dưới tên. Phim thánh chưa ghi ở đây thì xếp cuối.
 */
const SAINTS = [
  { films: ['lich-su-thu-gui-co-rin-to'], name: 'Thánh Clê-men-tê', en: 'Saint Clement of Rome', era: ['Khoảng năm 96', 'Around the year 96'] },
  { films: ['lich-su-thanh-i-nha-xi-o'], name: 'Thánh I-nha-xi-ô An-ti-ô-khi-a', en: 'Saint Ignatius of Antioch', era: ['Đầu thế kỷ thứ hai', 'Early second century'] },
  { films: ['lich-su-thanh-po-ly-cat-po'], name: 'Thánh Pô-ly-cát-pô', en: 'Saint Polycarp', era: ['Thế kỷ thứ hai', 'Second century'] },
  { films: ['lich-su-thanh-le-thoi-xua'], name: 'Thánh Giu-ti-nô', en: 'Saint Justin', era: ['Thế kỷ thứ hai', 'Second century'] },
  { films: ['lich-su-blan-di-na'], name: 'Thánh Blan-đi-na', en: 'Saint Blandina', era: ['Năm 177', 'The year 177'] },
  { films: ['phep-la-thanh-nicola'], name: 'Thánh Ni-cô-la', en: 'Saint Nicholas', era: ['Thế kỷ thứ tư', 'Fourth century'] },
  { films: ['loi-chua-thanh-au-tinh'], name: 'Thánh Âu-tinh', en: 'Saint Augustine', era: ['Năm 354 đến năm 430', '354 to 430'] },
  { films: ['phep-la-thanh-da-minh'], name: 'Thánh Đa Minh', en: 'Saint Dominic', era: ['Năm 1170 đến năm 1221', '1170 to 1221'] },
  { films: ['phep-la-thanh-phanxico', 'loi-chua-thanh-phan-xi-co'], name: 'Thánh Phan-xi-cô Assisi', en: 'Saint Francis of Assisi', era: ['Năm 1182 đến năm 1226', '1182 to 1226'] },
  { films: ['phep-la-thanh-anton', 'loi-chua-thanh-an-ton'], name: 'Thánh An-tôn Pa-đu-a', en: 'Saint Anthony of Padua', era: ['Năm 1195 đến năm 1231', '1195 to 1231'] },
  { films: ['phep-la-thanh-clara'], name: 'Thánh Cla-ra Assisi', en: 'Saint Clare of Assisi', era: ['Năm 1194 đến năm 1253', '1194 to 1253'] },
  { films: ['phep-la-thanh-phanxico-xavie'], name: 'Thánh Phan-xi-cô Xa-vi-ê', en: 'Saint Francis Xavier', era: ['Năm 1506 đến năm 1552', '1506 to 1552'] },
  { films: ['phep-la-thanh-martino'], name: 'Thánh Mác-ti-nô de Porres', en: 'Saint Martin de Porres', era: ['Năm 1579 đến năm 1639', '1579 to 1639'] },
  { films: ['phep-la-thanh-gioan-vianney'], name: 'Thánh Gio-an Ma-ri-a Vianney', en: 'Saint John Vianney', era: ['Năm 1786 đến năm 1859', '1786 to 1859'] },
  { films: ['phep-la-ong-ba-martin'], name: 'Thánh Louis và Zélie Martin', en: 'Saints Louis and Zélie Martin', era: ['Thế kỷ 19', 'Nineteenth century'] },
  { films: ['phep-la-te-re-xa-hai-dong', 'loi-chua-thanh-te-re-xa'], name: 'Thánh Tê-rê-sa Hài Đồng Giê-su', en: 'Saint Thérèse of the Child Jesus', era: ['Năm 1873 đến năm 1897', '1873 to 1897'] },
  { films: ['phep-la-faustina'], name: 'Thánh Faustina', en: 'Saint Faustina', era: ['Năm 1905 đến năm 1938', '1905 to 1938'] },
  { films: ['phep-la-cha-pio'], name: 'Thánh Pi-ô Pietrelcina', en: 'Saint Pio of Pietrelcina', era: ['Năm 1887 đến năm 1968', '1887 to 1968'] },
  { films: ['phep-la-me-teresa'], name: 'Thánh Tê-rê-sa Calcutta', en: 'Saint Teresa of Calcutta', era: ['Năm 1910 đến năm 1997', '1910 to 1997'] },
  { films: ['phep-la-gioan-phaolo-ii'], name: 'Thánh Gio-an Phao-lô II', en: 'Saint John Paul II', era: ['Năm 1920 đến năm 2005', '1920 to 2005'] },
  { films: ['phep-la-carlo-acutis'], name: 'Thánh Carlo Acutis', en: 'Saint Carlo Acutis', era: ['Năm 1991 đến năm 2006', '1991 to 2006'] },
];
/** Các phép lạ (Đức Mẹ hiện ra, Thánh Thể) theo năm xảy ra. */
const MIRACLES = [
  ['phep-la-lanciano', 'Thế kỷ thứ tám', 'Eighth century'],
  ['phep-la-bolsena', 'Năm 1263', 'The year 1263'],
  ['phep-la-guadalupe', 'Năm 1531', 'The year 1531'],
  ['phep-la-mau-anh', 'Năm 1830', 'The year 1830'],
  ['phep-la-la-salette', 'Năm 1846', 'The year 1846'],
  ['phep-la-lo-duc', 'Năm 1858', 'The year 1858'],
  ['phep-la-pontmain', 'Năm 1871', 'The year 1871'],
  ['phep-la-knock', 'Năm 1879', 'The year 1879'],
  ['phep-la-fatima', 'Năm 1917', 'The year 1917'],
  ['phep-la-akita', 'Năm 1973', 'The year 1973'],
  ['phep-la-ba-lan', 'Năm 2008', 'The year 2008'],
];

/** Một bức tranh trong hốc `n` ({ pic: [x, y, z], stand: [x, z] }). x: { s (phim đầu), g, w, films, name, en, era } */
function hang(x, n) {
  const { s, g: group, w: where } = x;
  const photo = s.real || { src: `og/${s.id}.jpg`, vi: s.title, en: s.en?.title || s.title };
  return {
    id: `tl-${s.id}`, zone: 'grotte', kind: 'exhibit', group, at: n.stand, look: [n.pic[0], n.pic[2]], mount: n.pic[1],
    r: 1.0, candles: 0, films: x.films || [s.id], photo,              // hành lang hẹp: tranh đối diện cách chừng 2,6 m
    kick: (({ name, en }) => ({ vi: name, en }))(EXHIBIT_GROUPS.find(g => g.id === group)),
    name: x.name || s.title, where: where?.vi || '', era: x.era?.[0] || '',
    en: { name: x.en || s.en?.title || s.title, where: where?.en || '', era: x.era?.[1] || '' },
  };
}

/** Các bức tranh theo nhóm, đúng thứ tự trưng bày, từ kho truyện (films.all()): { 'tong-do': [x…], … }. */
export function exhibitList(stories) {
  const by = (f) => stories.filter(f).sort((a, b) => a.order - b.order);
  const ap = by(s => s.book === 'tong-do');
  const peter = ap.find(s => /phe-ro/.test(s.id)), paul = ap.find(s => /phao-lo/.test(s.id));
  const apostles = [peter, paul, ...ap.filter(s => s !== peter && s !== paul)].filter(Boolean)
    .map(s => ({ s, g: 'tong-do', w: { vi: s.season, en: s.en?.season }, era: ['Thế kỷ thứ nhất', 'First century'] }));
  // Việt Nam: Tử Đạo theo tỉnh rồi ngày lễ; Linh địa theo thứ tự Bắc vào Nam của chính chúng
  const martyrs = stories.filter(s => s.book === 'tdvn')
    .sort((a, b) => (TINH.indexOf(a.province) - TINH.indexOf(b.province)) || (a.order - b.order))
    .map(s => ({ s, g: 'tu-dao', w: { vi: [s.province, s.season].filter(Boolean).join(' · '), en: [s.province, s.en?.season].filter(Boolean).join(' · ') } }));
  const places = by(s => s.holyPlace).map(s => ({ s, g: 'linh-dia' }));
  // dòng thời gian: các thánh (SAINTS, rồi các phim thánh chưa ghi ở đó), các phép lạ (MIRACLES, rồi phần còn lại)
  const get = new Map(stories.map(s => [s.id, s]));
  const known = new Set(SAINTS.flatMap(x => x.films));
  const saints = [
    ...SAINTS.map(x => ({ ...x, films: x.films.filter(id => get.has(id)) })).filter(x => x.films.length)
      .map(x => ({ ...x, s: get.get(x.films[0]), g: 'cac-thanh', w: { vi: x.era[0], en: x.era[1] } })),
    ...by(s => (s.saintMiracle || s.witness || s.miracleSaint) && !known.has(s.id)).map(s => ({ s, g: 'cac-thanh' })),
  ];
  const mk = new Set(MIRACLES.map(m => m[0]));
  const miracles = [
    ...MIRACLES.filter(m => get.has(m[0])).map(([id, vi, en]) => ({ s: get.get(id), g: 'phep-la', w: { vi, en }, era: [vi, en] })),
    ...by(s => (s.miracleMary || s.miracleEucharist) && !mk.has(s.id)).map(s => ({ s, g: 'phep-la' })),
  ];
  return { 'tong-do': apostles, 'tu-dao': martyrs, 'linh-dia': places, 'cac-thanh': saints, 'phep-la': miracles };
}

/** Id bức tranh đầu tiên của mỗi nhóm (Đi nhanh từ khu khác). */
export const exhibitHeads = (stories) => Object.fromEntries(Object.entries(exhibitList(stories))
  .filter(([, l]) => l.length).map(([g, l]) => [g, { id: `tl-${l[0].s.id}`, n: l.length }]));

/** Mọi bức tranh của hầm mộ, xếp vào các hốc của layout.niches (khu khác: không có). */
export function exhibitOf(zone, stories, layout) {
  if (zone !== 'grotte' || !layout?.niches) return [];
  const out = [];
  for (const [g, list] of Object.entries(exhibitList(stories))) {
    const slots = GALLERIES[g].flatMap(k => layout.niches[k] || []);
    if (list.length > slots.length) console.warn(`[exhibit] ${g}: ${list.length} tranh, chỉ có ${slots.length} hốc`);
    list.slice(0, slots.length).forEach((x, i) => out.push(hang(x, slots[i])));
  }
  return out;
}
