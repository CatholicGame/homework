// Các thánh ở Rô-ma (Nhà thờ Online, kế hoạch: church-online/docs/vatican-saints.md).
// Mỗi chỗ tôn kính (mộ, xương thánh, tượng, bàn thờ) là một "slot" trong một khu (ZONES): world.js dựng ở đó một giá nến,
// đến gần thì hiện nút xem; bảng thông tin lấy ảnh thật và phim từ kho truyện (`films`: id truyện, chưa có thì ghi "sắp có").
// Toạ độ `at` = [x, z] của khu đó (x sang phải khi nhìn vào Đền thờ, z = -planY như layout.json), là ƯỚC LƯỢNG theo mặt bằng
// đã đọc (docs/vatican.md), sẽ được layout của khu (layout.shrines, cùng id) ghi đè khi dựng mô hình thật.
// Thêm một vị thánh: thêm một dòng vào SHRINES (khu có sẵn) hoặc để slotsOf() tự xếp vào khu mở rộng (Tử Đạo Việt Nam, Nhà Các Thánh).
import { TINH } from '../stories/books.js';

/**
 * Các khu: mỗi khu một glb + layout riêng (public/church/), world.js chỉ tải khi người chơi đi tới khu đó (qua cổng hoặc chọn
 * một chỗ trong danh sách Đi nhanh), giữ tối đa hai khu trong bộ nhớ. `built` = đã có mô hình; `plot` = lô mở rộng quanh
 * Vatican thay cho phố xá (docs/vatican-saints.md). Một chỗ thánh có thể có glb chi tiết riêng (`glb`), tải khi lại gần.
 */
export const ZONES = {
  vatican: { site: 'vatican', name: 'Quảng trường Thánh Phê-rô', built: true, glb: 'vatican.glb', layout: 'vatican_layout.json' },
  'vatican-in': { site: 'vatican', name: 'Trong Đền thờ Thánh Phê-rô', built: true, glb: 'vatican_interior.glb', layout: 'vatican_interior_layout.json' },
  grotte: { site: 'vatican', name: 'Hầm mộ dưới Đền thờ', built: true, glb: 'vatican_grotte.glb', layout: 'vatican_grotte_layout.json' },
  scavi: { site: 'vatican', name: 'Nghĩa trang cổ dưới Đền thờ', built: false },
  'tu-dao-vn': { site: 'vatican', name: 'Vườn Các Thánh Tử Đạo Việt Nam', built: false, plot: true, slots: 128 },
  'nha-cac-thanh': { site: 'vatican', name: 'Nhà Các Thánh', built: false, plot: true, slots: 96 },
};

/**
 * Cổng sang khu khác, đặt trong khu `in` (mở được khi khu đích đã dựng; chưa dựng thì bảng thông tin ghi "đang xây").
 * arrive: [x, z, heading] chỗ đứng khi tới khu đích (mặc định: spawn của layout khu đó).
 */
export const GATES = [
  // vào Đền thờ là vào tiền sảnh trước, quay mặt về năm cửa đồng; ra quảng trường qua vòm cửa giữa của tiền sảnh
  { id: 'cong-den-tho', in: 'vatican', to: 'vatican-in', at: [0, -178], r: 7, arrive: [0, 116.4, 0] },
  { id: 'cong-ra-quang-truong', in: 'vatican-in', to: 'vatican', at: [0, 123.4], r: 1.8, arrive: [0, -166, Math.PI] },
  { id: 'cong-tu-dao-vn', in: 'vatican', to: 'tu-dao-vn', at: [-110, -12], r: 6,
    note: 'Khu vườn mở rộng ở phía nam quảng trường, sau hàng cột bên trái: mỗi vị thánh tử đạo Việt Nam một bia đá, xếp theo tỉnh từ Bắc vào Nam, có chỗ thắp nến.' },
  { id: 'cong-nha-cac-thanh', in: 'vatican', to: 'nha-cac-thanh', at: [110, -12], r: 6,
    note: 'Khu mở rộng ở phía bắc quảng trường, sau hàng cột bên phải: các thánh có phim mà mộ không ở Rô-ma (thánh Phan-xi-cô, An-tôn, Pi-ô…) được tôn kính ở đây.' },
  { id: 'cong-ham-mo', in: 'vatican-in', to: 'grotte', at: [14, 4], r: 3 },
  { id: 'cong-len-den-tho', in: 'grotte', to: 'vatican-in', at: [0, 4.6], r: 2.5, arrive: [10, 6, 0] },
];

/**
 * kind: 'tomb' mộ, 'relic' xương thánh, 'statue' tượng, 'altar' bàn thờ, 'site' di tích.
 * where: nơi thật (vi), lời người làm phim, chỉ điều đã có nguồn (docs/vatican-saints.md).
 * candles: số chỗ cắm nến của giá nến (0 = không đặt giá). look: [x, z] chỗ người cầu nguyện quay mặt về (mặc định: nhìn về phía z âm).
 * en: tên và lời tiếng Anh.
 * rackW: bệ nến rộng chừng ấy (m) cho vừa bệ tượng lớn. back: tượng lớn (m): Đi nhanh tới thì đứng lùi xa chừng ấy trước bệ nến để thấy trọn tượng.
 * model: chỗ này đã có trong mô hình của khu (tượng, mộ, ngai); chỗ chưa có thì shrines.js treo ảnh thật của nó trong khung
 * mạ vàng trên bức tường sau giá nến.
 */
export const SHRINES = [
  // ---- Quảng trường
  { id: 'tuong-phe-ro', zone: 'vatican', kind: 'statue', model: true, at: [-39.9, -119], look: [-39.9, -125], r: 7, candles: 24, rackW: 2.6, back: 6,
    name: 'Tượng thánh Phê-rô', where: 'Tượng thánh Phê-rô cầm chìa khoá, cao 5,55 mét, đứng bên trái bậc thềm Đền thờ.',
    en: { name: "Statue of Saint Peter", where: "The statue of Saint Peter holding the keys, 5.55 metres tall, stands on the left of the Basilica steps." },
    films: ['thanh-phe-ro-tong-do', 'phe-ro-tuyen-xung'] },
  { id: 'tuong-phao-lo', zone: 'vatican', kind: 'statue', model: true, at: [39.9, -119], look: [39.9, -125], r: 7, candles: 24, rackW: 2.6, back: 6,
    name: 'Tượng thánh Phao-lô', where: 'Tượng thánh Phao-lô cầm gươm, đứng bên phải bậc thềm Đền thờ.',
    en: { name: "Statue of Saint Paul", where: "The statue of Saint Paul holding a sword stands on the right of the Basilica steps." },
    films: ['thanh-phao-lo'] },

  // ---- Trong Đền thờ (khung toạ độ của build_vatican_interior.py: gốc dưới tâm mái vòm, z âm về phía hậu cung). Mô hình chưa
  // có các nhà nguyện bên và nhà nguyện góc: chỗ đứng đặt ở lối bên / hậu cung gần nơi thật nhất, sẽ dời khi dựng nhà nguyện.
  { id: 'mo-phe-ro', zone: 'vatican-in', kind: 'tomb', model: true, at: [0, 16], r: 5, candles: 99,
    name: 'Mộ thánh Phê-rô', where: 'Dưới bàn thờ chính, sâu trong lòng đất, là mộ thánh Phê-rô. Trước bàn thờ có Giếng Tuyên Xưng, quanh lan can là 99 ngọn đèn dầu cháy suốt ngày đêm.',
    look: [0, 8], en: { name: "Tomb of Saint Peter", where: "Under the main altar, deep in the ground, is the tomb of Saint Peter. Before the altar is the Confessio, and around its railing 99 oil lamps burn day and night." },
    films: ['lich-su-mo-thanh-phe-ro', 'thanh-phe-ro-tong-do'] },
  { id: 'ngai-phe-ro', zone: 'vatican-in', kind: 'relic', model: true, at: [0, -60], r: 6, candles: 24,
    name: 'Ngai Tòa thánh Phê-rô', where: 'Cuối hậu cung, bốn vị Giáo phụ bằng đồng nâng chiếc ngai gỗ cổ, bên trên là ô cửa kính hình chim bồ câu.',
    look: [0, -75], en: { name: "Chair of Saint Peter", where: "At the end of the apse, four bronze Fathers of the Church hold up the old wooden chair, with the dove window above it." },
    films: ['thanh-phe-ro-tong-do'] },
  { id: 'tuong-dong-phe-ro', zone: 'vatican-in', kind: 'statue', model: true, at: [5.5, 30.25], r: 3, candles: 0,
    name: 'Tượng đồng thánh Phê-rô', where: 'Tượng thánh Phê-rô ngồi bằng đồng, bàn chân phải mòn đi vì khách hành hương chạm vào và hôn kính.',
    look: [9, 30.25], en: { name: "Bronze statue of Saint Peter", where: "The seated bronze statue of Saint Peter, whose right foot is worn away by pilgrims who touch and kiss it." },
    films: ['thanh-phe-ro-tong-do'] },
  { id: 'tuong-an-re', zone: 'vatican-in', kind: 'statue', model: true, at: [-12.8, 12.8], r: 4, candles: 36, rackW: 4.6,
    name: 'Tượng thánh An-rê', where: 'Một trong bốn tượng lớn ở chân các cột trụ đỡ mái vòm.',
    look: [-16, 16], en: { name: "Statue of Saint Andrew", where: "One of the four great statues at the foot of the piers that hold up the dome." },
    films: ['thanh-an-re-tong-do'] },
  { id: 'pieta', zone: 'vatican-in', kind: 'statue', at: [24, 92], r: 4, candles: 24,
    name: 'Tượng Đức Mẹ Sầu Bi (Pietà)', where: 'Nhà nguyện đầu tiên bên phải cửa vào: tượng đá Đức Mẹ ôm xác Con của Michelangelo.',
    look: [30, 92], en: { name: "Our Lady of Sorrows (Pietà)", where: "The first chapel on the right of the entrance: Michelangelo's marble statue of Mary holding the body of her Son." },
    films: [] },
  { id: 'mo-gioan-phaolo-ii', zone: 'vatican-in', kind: 'tomb', at: [24, 72], r: 4, candles: 48,
    name: 'Thánh Gio-an Phao-lô II', where: 'Nhà nguyện thánh Sê-ba-xti-a-nô, lối bên phải: thi hài thánh Giáo Hoàng an nghỉ dưới bàn thờ.',
    look: [30, 72], en: { name: "Saint John Paul II", where: "The Chapel of Saint Sebastian, right aisle: the body of the saint Pope rests under the altar." },
    films: ['phep-la-gioan-phaolo-ii'] },
  { id: 'mo-gioan-xxiii', zone: 'vatican-in', kind: 'tomb', at: [24, 46], r: 4, candles: 48,
    name: 'Thánh Gio-an XXIII', where: 'Bàn thờ thánh Giê-rô-ni-mô, lối bên phải gần mái vòm: thi hài thánh Giáo Hoàng trong hòm kính.',
    look: [30, 46], en: { name: "Saint John XXIII", where: "The Altar of Saint Jerome, right aisle near the dome: the body of the saint Pope in a glass casket." },
    films: [] },
  { id: 'ghe-go-ri-o-na-di-en', zone: 'vatican-in', kind: 'relic', at: [21, 38], r: 4, candles: 12,
    name: 'Thánh Ghê-gô-ri-ô Na-di-en', where: 'Nhà nguyện Ghê-gô-ri-ô, góc phía bắc trước mái vòm.',
    look: [21, 30], en: { name: "Saint Gregory Nazianzen", where: "The Gregorian Chapel, at the north corner before the dome." },
    films: [] },
  { id: 'gio-sa-phat', zone: 'vatican-in', kind: 'relic', at: [44, -5], r: 4, candles: 12,
    name: 'Thánh Giô-sa-phát', where: 'Bàn thờ thánh Ba-si-li-ô ở cánh ngang bên phải.',
    look: [44, -12], en: { name: "Saint Josaphat", where: "The Altar of Saint Basil in the right transept." },
    films: [] },
  { id: 'pro-cet-xo-mac-ti-ni-a-no', zone: 'vatican-in', kind: 'relic', at: [62, 0], r: 5, candles: 12,
    name: 'Thánh Prô-cét-xô và Mác-ti-ni-a-nô', where: 'Bàn thờ giữa cánh ngang bên phải: hai người lính coi ngục, theo truyền thống được thánh Phê-rô rửa tội.',
    look: [70, 0], en: { name: "Saints Processus and Martinian", where: "The central altar of the right transept: two prison guards who, by tradition, were baptized by Saint Peter." },
    films: [] },
  { id: 'pe-tro-ni-la', zone: 'vatican-in', kind: 'relic', at: [8, -40], r: 4, candles: 12,
    name: 'Thánh Pê-trô-ni-la', where: 'Nhà nguyện Tổng lãnh thiên thần Mi-ca-en, góc phía tây bắc.',
    look: [14, -40], en: { name: "Saint Petronilla", where: "The Chapel of Saint Michael the Archangel, at the north-west corner." },
    films: [] },
  { id: 'si-mon-giu-da', zone: 'vatican-in', kind: 'relic', at: [-62, 0], r: 5, candles: 48,
    name: 'Thánh Si-môn và thánh Giu-đa Ta-đê-ô', where: 'Bàn thờ thánh Giu-se ở cánh ngang bên trái giữ xương thánh hai Tông Đồ.',
    look: [-70, 0], en: { name: "Saints Simon and Jude Thaddeus", where: "The Altar of Saint Joseph in the left transept keeps the relics of the two Apostles." },
    films: ['thanh-si-mon', 'thanh-giu-da-ta-de-o'] },
  { id: 'le-o-ca', zone: 'vatican-in', kind: 'tomb', at: [-8, -40], r: 4, candles: 12,
    name: 'Thánh Lê-ô Cả', where: 'Nhà nguyện Đức Mẹ Cột Đá, góc phía tây nam: bàn thờ thánh Lê-ô Cả.',
    look: [-14, -40], en: { name: "Saint Leo the Great", where: "The Chapel of the Madonna of the Column, at the south-west corner: the altar of Saint Leo the Great." },
    films: [] },
  { id: 'ghe-go-ri-o-ca', zone: 'vatican-in', kind: 'tomb', at: [-21, 38], r: 4, candles: 12,
    name: 'Thánh Ghê-gô-ri-ô Cả', where: 'Nhà nguyện Clementina, góc phía nam trước mái vòm.',
    look: [-21, 30], en: { name: "Saint Gregory the Great", where: "The Clementine Chapel, at the south corner before the dome." },
    films: [] },
  { id: 'kim-khau', zone: 'vatican-in', kind: 'relic', at: [-24, 55], r: 4, candles: 12,
    name: 'Thánh Gio-an Kim Khẩu', where: 'Nhà nguyện Ca đoàn, lối bên trái.',
    look: [-30, 55], en: { name: "Saint John Chrysostom", where: "The Choir Chapel, left aisle." },
    films: [] },
  { id: 'mo-pi-o-x', zone: 'vatican-in', kind: 'tomb', at: [-24, 72], r: 4, candles: 24,
    name: 'Thánh Pi-ô X', where: 'Nhà nguyện Dâng Đức Mẹ vào Đền Thờ, lối bên trái: thi hài thánh Giáo Hoàng dưới bàn thờ.',
    look: [-30, 72], en: { name: "Saint Pius X", where: "The Chapel of the Presentation, left aisle: the body of the saint Pope under the altar." },
    films: [] },

  // ---- Tiền sảnh (sau năm cửa đồng, giữa tường lối vào và mặt tiền; build_vatican_interior.py build_portico):
  // kind 'art' = tác phẩm để học, không đặt giá nến, không có nút cầu nguyện. Ba cửa hiện đại chưa có ảnh tự do: chỉ vẽ khối đồng.
  { id: 'cua-su-chet', zone: 'vatican-in', kind: 'art', model: true, at: [-19.5, 113.4], r: 2.8, candles: 0, back: 3,
    kick: { vi: 'Cửa đồng', en: 'Bronze door' },
    name: 'Cửa Sự Chết', where: 'Cửa ngoài cùng bên trái khi nhìn từ quảng trường, do nhà điêu khắc Giacomo Manzù làm, khánh thành năm 1964. Tên cửa có từ xa xưa, vì các đám tang đi qua cửa này. Hình trên cửa nói về cái chết trong niềm hy vọng Ki-tô giáo: hai ô lớn trên cùng là cái chết của Chúa Giê-su và Đức Mẹ lên trời. Chưa có ảnh tự do của tác phẩm này, nên ở đây cửa chỉ được vẽ bằng khối đồng.',
    en: { name: 'The Door of Death', where: 'The leftmost door seen from the square, made by the sculptor Giacomo Manzù and unveiled in 1964. The name is very old: funerals passed through this door. Its images speak of death in Christian hope: the two large panels at the top are the death of Jesus and the Assumption of Our Lady. There is no freely licensed photo of this work yet, so here the door is drawn as plain bronze.' },
    films: [] },
  { id: 'cua-thien-ac', zone: 'vatican-in', kind: 'art', model: true, at: [-7.6, 113.4], r: 2.8, candles: 0, back: 3,
    kick: { vi: 'Cửa đồng', en: 'Bronze door' },
    name: 'Cửa Thiện và Ác', where: 'Cửa thứ hai từ bên trái, do nhà điêu khắc Luciano Minguzzi làm, khánh thành năm 1977 nhân dịp Đức Giáo Hoàng Phao-lô VI tròn 80 tuổi. Một cánh là những hình ảnh về sự thiện, cánh kia về sự dữ. Hôm nay cửa mở: bạn có thể đi qua đây vào lòng Đền thờ.',
    en: { name: 'The Door of Good and Evil', where: 'The second door from the left, made by the sculptor Luciano Minguzzi and unveiled in 1977 for the 80th birthday of Pope Paul VI. One leaf shows images of good, the other of evil. Today the door is open: you can walk through it into the Basilica.' },
    films: [] },
  { id: 'cua-filarete', zone: 'vatican-in', kind: 'art', model: true, at: [0, 113.4], r: 2.8, candles: 0, back: 3,
    kick: { vi: 'Cửa đồng', en: 'Bronze door' },
    name: 'Cửa Filarete (cửa giữa)', where: 'Cửa chính giữa, bằng đồng, do nhà điêu khắc Filarete đúc trong những năm 1433 đến 1445 cho Đền thờ cũ, rồi được giữ lại cho Đền thờ mới. Sáu ô lớn: trên cùng là Chúa Giê-su và Đức Mẹ; ở giữa là thánh Phao-lô, và thánh Phê-rô trao chìa khoá cho Đức Giáo Hoàng Ê-u-gê-ni-ô IV đang quỳ; dưới cùng là cuộc tử đạo của hai thánh Tông Đồ.',
    en: { name: "Filarete's Door (the middle door)", where: 'The middle door, in bronze, cast by the sculptor Filarete between 1433 and 1445 for the old basilica and kept for the new one. Six large panels: at the top, Jesus and Our Lady; in the middle, Saint Paul, and Saint Peter giving the keys to Pope Eugene IV, who kneels; at the bottom, the martyrdom of the two Apostles.' },
    films: ['thanh-phe-ro-tong-do', 'thanh-phao-lo'] },
  { id: 'cua-bi-tich', zone: 'vatican-in', kind: 'art', model: true, at: [7.6, 113.4], r: 2.8, candles: 0, back: 3,
    kick: { vi: 'Cửa đồng', en: 'Bronze door' },
    name: 'Cửa Bí Tích', where: 'Cửa thứ hai từ bên phải, do nhà điêu khắc Venanzo Crocetti làm, khánh thành năm 1965, với hình bảy bí tích. Hôm nay cửa mở: bạn có thể đi qua đây vào lòng Đền thờ.',
    en: { name: 'The Door of the Sacraments', where: 'The second door from the right, made by the sculptor Venanzo Crocetti and unveiled in 1965, with images of the seven sacraments. Today the door is open: you can walk through it into the Basilica.' },
    films: [] },
  { id: 'cua-thanh', zone: 'vatican-in', kind: 'art', model: true, at: [19.5, 113.4], r: 2.8, candles: 0, back: 3,
    kick: { vi: 'Cửa đồng', en: 'Bronze door' },
    name: 'Cửa Thánh', where: 'Cửa ngoài cùng bên phải khi nhìn từ quảng trường. Cửa chỉ mở trong Năm Thánh; ngoài Năm Thánh, cửa được xây bít lại từ phía trong. Cánh cửa đồng hiện nay do Vico Consagra làm cho Năm Thánh 1950: mười sáu ô kể lại tội lỗi của con người và lòng thương xót của Thiên Chúa. Đức Giáo Hoàng Phan-xi-cô mở cửa ngày 24 tháng 12 năm 2024 cho Năm Thánh 2025, và cửa được đóng lại ngày 6 tháng 1 năm 2026.',
    en: { name: 'The Holy Door', where: 'The rightmost door seen from the square. It is opened only in a Holy Year; outside a Holy Year it is walled up from the inside. The present bronze door was made by Vico Consagra for the Holy Year 1950: sixteen panels tell of human sin and of the mercy of God. Pope Francis opened it on 24 December 2024 for the Holy Year 2025, and it was closed on 6 January 2026.' },
    films: [] },
  { id: 'navicella', zone: 'vatican-in', kind: 'art', model: true, at: [0, 120.4], look: [0, 125], r: 2, candles: 0, back: 0.6,
    kick: { vi: 'Tranh khảm', en: 'Mosaic' },
    name: 'Bức khảm Navicella (Con thuyền)', where: 'Bức khảm của danh hoạ Giotto, làm khoảng năm 1300 cho Đền thờ cũ, nay ở trên vòm cửa giữa của tiền sảnh, nhìn về phía các cửa đồng. Tranh kể chuyện con thuyền của các Tông Đồ giữa sóng gió, và Chúa Giê-su nắm tay kéo thánh Phê-rô lên khỏi mặt nước. Bức khảm đã được làm lại nhiều lần qua các thế kỷ; tranh ở đây vẽ theo một bản khắc chép lại nó.',
    en: { name: 'The Navicella mosaic (the Little Ship)', where: "A mosaic by the painter Giotto, made around 1300 for the old basilica, now over the middle arch of the portico, facing the bronze doors. It shows the Apostles' boat in the storm, and Jesus taking Peter by the hand to lift him out of the water. The mosaic has been remade many times over the centuries; the picture here follows an engraving copied from it." },
    films: ['di-tren-mat-nuoc'] },
  { id: 'tuong-con-tan-ti-no', zone: 'vatican-in', kind: 'art', model: true, at: [31, 117.9], look: [36, 117.9], r: 4, candles: 0, back: 6,
    kick: { vi: 'Tượng', en: 'Statue' },
    name: 'Hoàng đế Côn-tan-ti-nô', where: 'Tượng cưỡi ngựa của Bernini, làm xong năm 1670, ở đầu phía bắc tiền sảnh, nơi chân cầu thang Scala Regia lên Dinh Tông Toà. Tượng diễn tả lúc hoàng đế ngước lên thấy dấu thánh giá trên trời trước trận đánh năm 312. Chính Côn-tan-ti-nô đã cho xây Đền thờ cũ trên mộ thánh Phê-rô.',
    en: { name: 'Emperor Constantine', where: 'An equestrian statue by Bernini, finished in 1670, at the north end of the portico, at the foot of the Scala Regia staircase up to the Apostolic Palace. It shows the moment the emperor looked up and saw the sign of the cross in the sky before the battle of 312. Constantine himself had the old basilica built over the tomb of Saint Peter.' },
    films: ['lich-su-mo-thanh-phe-ro'] },
  { id: 'tuong-sac-lo-manh', zone: 'vatican-in', kind: 'art', model: true, at: [-31, 117.9], look: [-36, 117.9], r: 4, candles: 0, back: 6,
    kick: { vi: 'Tượng', en: 'Statue' },
    name: 'Hoàng đế Sác-lơ-manh (Charlemagne)', where: 'Tượng cưỡi ngựa của Agostino Cornacchini, làm xong năm 1725, ở đầu phía nam tiền sảnh. Sác-lơ-manh được Đức Giáo Hoàng Lê-ô III đội vương miện hoàng đế trong Đền thờ cũ vào lễ Giáng Sinh năm 800.',
    en: { name: 'Emperor Charlemagne', where: 'An equestrian statue by Agostino Cornacchini, finished in 1725, at the south end of the portico. Charlemagne was crowned emperor by Pope Leo III in the old basilica on Christmas Day in the year 800.' },
    films: [] },

  // ---- Hầm mộ (một tầng dưới nền Đền thờ; mô hình build_vatican_grotte.py, chỗ đặt thật trong layout.shrines)
  { id: 'clementina', zone: 'grotte', kind: 'tomb', model: true, at: [0, -6], r: 4, candles: 48,
    name: 'Nhà nguyện Clementina', where: 'Nhà nguyện nhỏ gần mộ thánh Phê-rô nhất, ngay sau ngôi mộ.',
    look: [0, 0], en: { name: "Clementine Chapel", where: "The small chapel closest to the tomb of Saint Peter, right behind it." },
    films: ['lich-su-mo-thanh-phe-ro'] },
  { id: 'mo-phaolo-vi', zone: 'grotte', kind: 'tomb', model: true, at: [-8, 18], r: 3, candles: 24,
    name: 'Thánh Phao-lô VI', where: 'Ngôi mộ đơn sơ trong hầm mộ các Giáo Hoàng.', look: [-8, 22], en: { name: "Saint Paul VI", where: "A plain tomb in the grottoes of the Popes." },
    films: [] },
  { id: 'mo-gioan-phaolo-i', zone: 'grotte', kind: 'tomb', model: true, at: [8, 18], r: 3, candles: 24,
    name: 'Chân Phước Gio-an Phao-lô I', where: 'Hầm mộ các Giáo Hoàng.', look: [8, 22], en: { name: "Blessed John Paul I", where: "The grottoes of the Popes." },
    films: [] },

  // ---- Nghĩa trang cổ (Scavi)
  { id: 'scavi-mo-phe-ro', zone: 'scavi', kind: 'site', at: [0, 0], r: 3, candles: 0,
    name: 'Bức Tường Đỏ và mộ thánh Phê-rô', where: 'Nghĩa trang Rô-ma thế kỷ thứ nhất dưới Đền thờ: bức tường đỏ, bức tường vẽ chữ của các tín hữu đầu tiên.',
    en: { name: "The Red Wall and the tomb of Saint Peter", where: "A first-century Roman cemetery under the Basilica: the red wall, and the wall where the first Christians scratched their writing." },
    films: ['lich-su-mo-thanh-phe-ro'] },
];

export const shrinesIn = (zone) => SHRINES.filter(s => s.zone === zone);
export const gatesIn = (zone) => GATES.filter(g => g.in === zone);

/**
 * Slot các khu mở rộng, xếp từ kho truyện, không cần dựng lại mô hình khi có phim mới:
 * 'tu-dao-vn': mỗi truyện book 'tdvn', theo tỉnh (TINH, Bắc vào Nam) rồi ngày lễ; 'nha-cac-thanh': các thánh có phim Phép lạ
 * (saintMiracle) chưa có chỗ trong Rô-ma. Slot còn trống (chưa có phim) để sau này điền. Bia thứ i của mô hình = slot i.
 */
export function slotsOf(zone, stories) {
  const Z = ZONES[zone];
  if (!Z?.plot) return [];
  const placed = new Set(SHRINES.flatMap(s => s.films));
  const list = zone === 'tu-dao-vn'
    ? stories.filter(s => s.book === 'tdvn')
      .sort((a, b) => (TINH.indexOf(a.province) - TINH.indexOf(b.province)) || (a.order - b.order))
    : stories.filter(s => s.saintMiracle && !placed.has(s.id)).sort((a, b) => a.order - b.order);
  return Array.from({ length: Math.max(Z.slots, list.length) }, (_, i) => list[i]
    ? { id: `${zone}-${i}`, zone, slot: i, kind: 'memorial', candles: 12, name: list[i].title, group: list[i].province || '', films: [list[i].id] }
    : { id: `${zone}-${i}`, zone, slot: i, kind: 'memorial', candles: 12, empty: true, films: [] });
}

/**
 * Ảnh thật của từng chỗ thánh (public/church/shrines/<id>.jpg, Wikimedia Commons, giấy phép tự do, ≤ 1000 px), hiện trong bảng
 * thông tin dù chưa có phim; chỗ không có ở đây thì lấy ảnh `real` của phim đầu tiên (slot các khu mở rộng). from = tên file trên Commons.
 */
export const PHOTOS = {
  'tuong-phe-ro': { from: 'Petrus Petersplatz Rom.jpg', credit: 'Ảnh: Rabax63, CC BY-SA 4.0, Wikimedia Commons',
    vi: 'Tượng thánh Phê-rô trên quảng trường, do Giuseppe De Fabris tạc, dựng năm 1847', en: 'The statue of Saint Peter in the square, carved by Giuseppe De Fabris, set up in 1847' },
  'tuong-phao-lo': { from: 'Basilica Sancti Petri 30.jpg', credit: 'Ảnh: Burkhard Mücke, CC BY-SA 4.0, Wikimedia Commons',
    vi: 'Tượng thánh Phao-lô cầm gươm trước Đền thờ', en: 'The statue of Saint Paul holding a sword before the Basilica' },
  'mo-phe-ro': { from: 'Entrée de la Tombe de saint Pierre dans la Basilique Saint-Pierre.jpg', credit: 'Ảnh: General Cucombre, CC BY 2.0, Wikimedia Commons',
    vi: 'Giếng Tuyên Xưng trước bàn thờ chính, lối xuống phía mộ thánh Phê-rô', en: 'The Confessio before the main altar, leading down toward the tomb of Saint Peter' },
  'ngai-phe-ro': { from: 'Altar of the Chair of Saint Peter Vaticano 04 2016 6208.jpg', credit: 'Ảnh: Mariordo (Mario Roberto Durán Ortiz), CC BY-SA 4.0, Wikimedia Commons',
    vi: 'Bàn thờ Ngai Tòa thánh Phê-rô ở cuối hậu cung', en: 'The Altar of the Chair of Saint Peter at the end of the apse' },
  'tuong-dong-phe-ro': { from: "St. Peter's Basilica, Bronze Statue of St. Peter (48466478846).jpg", credit: 'Ảnh: Gary Todd, phạm vi công cộng, Wikimedia Commons',
    vi: 'Tượng đồng thánh Phê-rô ngồi trên ngai', en: 'The bronze statue of Saint Peter seated on his chair' },
  'tuong-an-re': { from: "St. Peter's Basilica, Statue of St. Andrew by Francois Duquesnoy, 1635 (48466391606).jpg", credit: 'Ảnh: Gary Todd, phạm vi công cộng, Wikimedia Commons',
    vi: 'Tượng thánh An-rê bên cây thập giá hình chữ X, do François Duquesnoy tạc', en: 'The statue of Saint Andrew with his X-shaped cross, carved by François Duquesnoy' },
  pieta: { from: "Michelangelo's Pietà Saint Peter's Basilica Vatican City.jpg", credit: 'Ảnh: Jebulon, CC0, Wikimedia Commons',
    vi: 'Tượng Đức Mẹ Sầu Bi của Michelangelo', en: "Michelangelo's Pietà" },
  'mo-gioan-phaolo-ii': { from: 'Ioannes Paulus II tomb St Peter Basilica 04 2016 6200.jpg', credit: 'Ảnh: Mariordo (Mario Roberto Durán Ortiz), CC BY-SA 4.0, Wikimedia Commons',
    vi: 'Phiến đá khắc tên thánh Gio-an Phao-lô II dưới bàn thờ thánh Sê-ba-xti-a-nô, nơi thi hài ngài an nghỉ', en: 'The marble slab bearing the name of Saint John Paul II under the Altar of Saint Sebastian, where his body rests' },
  'mo-gioan-xxiii': { from: 'Tomb of Ioannes XXIII.jpg', credit: 'Ảnh: Radosław Botev, CC BY 3.0 pl, Wikimedia Commons',
    vi: 'Thi hài thánh Gio-an XXIII trong hòm kính dưới bàn thờ', en: 'The body of Saint John XXIII in a glass casket under the altar' },
  'ghe-go-ri-o-na-di-en': { from: 'Altar of Our Lady of Succour.jpg', credit: 'Ảnh: Cristian Bortes, CC BY 2.0, Wikimedia Commons',
    vi: 'Bàn thờ Đức Mẹ Phù Hộ trong nhà nguyện Ghê-gô-ri-ô, nơi giữ hài cốt thánh Ghê-gô-ri-ô Na-di-en', en: 'The Altar of Our Lady of Succour in the Gregorian Chapel, which keeps the relics of Saint Gregory Nazianzen' },
  'gio-sa-phat': { from: 'Св Йосафат.JPG', credit: 'Ảnh: babizhet, CC BY-SA 2.5, Wikimedia Commons',
    vi: 'Hòm kính giữ thi hài thánh Giô-sa-phát dưới bàn thờ thánh Ba-si-li-ô', en: 'The glass casket of Saint Josaphat under the Altar of Saint Basil' },
  'pro-cet-xo-mac-ti-ni-a-no': { from: "St. Peter's Basilica, Vatican City (48466615162).jpg", credit: 'Ảnh: Gary Todd, phạm vi công cộng, Wikimedia Commons',
    vi: 'Cánh ngang bên phải Đền thờ: bàn thờ ở giữa là bàn thờ thánh Prô-cét-xô và Mác-ti-ni-a-nô', en: 'The right transept of the Basilica: the altar in the middle is the Altar of Saints Processus and Martinian' },
  'pe-tro-ni-la': { from: 'Guercino - Burial of Saint Petronilla - Google Art Project.jpg', credit: 'Tranh: Guercino, phạm vi công cộng, Wikimedia Commons',
    vi: 'Tranh thánh Pê-trô-ni-la của Guercino; bàn thờ của ngài trong Đền thờ có bức khảm chép lại tranh này', en: 'Saint Petronilla by Guercino; her altar in the Basilica has a mosaic copy of this painting' },
  'le-o-ca': { from: "Altar of Saint Leo the Great in Saint Peter's Basilica 2.jpg", credit: 'Ảnh: Wilfredor, CC0, Wikimedia Commons',
    vi: 'Bàn thờ thánh Lê-ô Cả với phù điêu đá của Alessandro Algardi', en: 'The Altar of Saint Leo the Great with the marble relief by Alessandro Algardi' },
  'ghe-go-ri-o-ca': { from: "Saint Peter's Basilica (57).jpg", credit: 'Ảnh: Darafsh, CC BY-SA 3.0, Wikimedia Commons',
    vi: 'Bàn thờ thánh Ghê-gô-ri-ô Cả trong nhà nguyện Clementina', en: 'The Altar of Saint Gregory the Great in the Clementine Chapel' },
  'kim-khau': { from: "Altar in Saint Peter's Basilica.jpg", credit: 'Ảnh: John Samuel, CC BY-SA 4.0, Wikimedia Commons',
    vi: 'Bàn thờ Đức Mẹ Vô Nhiễm trong Nhà nguyện Ca đoàn, nơi giữ hài cốt thánh Gio-an Kim Khẩu', en: 'The Altar of the Immaculate Conception in the Choir Chapel, which keeps the relics of Saint John Chrysostom' },
  'mo-pi-o-x': { from: 'Tomb of pope Pius X.jpg', credit: 'Ảnh: Riccardov, phạm vi công cộng, Wikimedia Commons',
    vi: 'Thi hài thánh Pi-ô X dưới bàn thờ', en: 'The body of Saint Pius X under the altar' },
  clementina: { from: 'Grotte Vaticane jun 2025 19.jpg', credit: 'Ảnh: Álvaro de la Paz Franco, CC0, Wikimedia Commons',
    vi: 'Hầm mộ các Giáo Hoàng dưới nền Đền thờ', en: 'The grottoes of the Popes under the floor of the Basilica' },
  'mo-phaolo-vi': { from: 'Tomba Paolo VI.jpg', credit: 'Ảnh: Lovio, phạm vi công cộng, Wikimedia Commons',
    vi: 'Mộ thánh Phao-lô VI trong hầm mộ các Giáo Hoàng, chụp khi ngài còn là chân phước', en: 'The tomb of Saint Paul VI in the grottoes of the Popes, photographed when he was still Blessed' },
  'mo-gioan-phaolo-i': { from: 'Grotte Vaticane jun 2025 28.jpg', credit: 'Ảnh: Álvaro de la Paz Franco, CC0, Wikimedia Commons',
    vi: 'Một lối đi trong hầm mộ các Giáo Hoàng', en: 'A passage in the grottoes of the Popes' },
  'cua-filarete': { from: 'San pietro, porta del filarete 01.JPG', credit: 'Ảnh: Sailko, CC BY-SA 3.0, Wikimedia Commons',
    vi: 'Cửa Filarete, cửa đồng chính giữa của Đền thờ', en: "Filarete's Door, the middle bronze door of the Basilica" },
  'cua-thanh': { from: "St. Peter's Basilica Holy Door.jpg", credit: 'Ảnh: Gutza, CC0, Wikimedia Commons',
    vi: 'Cửa Thánh khi đang đóng, với mười sáu ô đồng', en: 'The Holy Door while closed, with its sixteen bronze panels' },
  navicella: { from: 'La Navicella di San Pietro pittura a mosaico del Giotto.jpg', credit: 'Bản khắc, không rõ tác giả, phạm vi công cộng, Wikimedia Commons',
    vi: 'Bản khắc chép lại bức khảm Navicella của Giotto', en: "An engraving copied from Giotto's Navicella mosaic" },
  'tuong-con-tan-ti-no': { from: 'Gianlorenzo bernini, costantino, 1670, 00.jpg', credit: 'Ảnh: Sailko, CC BY 3.0, Wikimedia Commons',
    vi: 'Tượng hoàng đế Côn-tan-ti-nô của Bernini, chân cầu thang Scala Regia', en: "Bernini's statue of Emperor Constantine, at the foot of the Scala Regia" },
  'tuong-sac-lo-manh': { from: 'Charlemagne Agostino Cornacchini Vatican.jpg', credit: 'Ảnh: Myrabella, CC BY-SA 3.0, Wikimedia Commons',
    vi: 'Tượng hoàng đế Sác-lơ-manh của Agostino Cornacchini', en: "Agostino Cornacchini's statue of Emperor Charlemagne" },
  'scavi-mo-phe-ro': { from: 'Vatican Necropolis 02.jpg', credit: 'Ảnh: Blue 439, CC BY-SA 3.0, Wikimedia Commons',
    vi: 'Một ngôi mộ cổ thời Rô-ma trong nghĩa trang dưới Đền thờ', en: 'An ancient Roman tomb in the cemetery under the Basilica' },
};
export const photoOf = (id) => PHOTOS[id] && { src: `church/shrines/${id}.jpg`, ...PHOTOS[id] };
