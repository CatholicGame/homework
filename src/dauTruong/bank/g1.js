/**
 * 🏆 Đấu Trường Nhí, ngân hàng câu soạn tay LỚP 1 (chương trình 2018, Kết nối tri thức), Toán + Tiếng Việt.
 * w: tuần học (HK I 1–18: âm, chữ, dấu thanh rồi vần; HK II 19–35: chủ điểm đọc, chính tả c/k, g/gh, ng/ngh, câu, dấu câu).
 * Toán HK I: số 0–10, so sánh, mấy và mấy, hình phẳng, cộng trừ trong 10, khối, vị trí; HK II: số đến 100, độ dài cm,
 * cộng trừ trong 100 không nhớ, giờ đúng, ngày trong tuần.
 * abcd: o[0] là đáp án đúng (máy xáo). order: o theo thứ tự đúng. Kiểm tra: `node scripts/dautruong-check.mjs 1`.
 */
/** Lời giải thích cho các mẫu câu lặp lại (âm đầu, vần, dấu thanh, chính tả, điền chữ, xếp câu); câu khác ghi ex tay. */
function autoEx(q, o, order) {
  if (order) return q === XEP_CAU ? `Câu đúng: ${o.join(' ')}` : `Thứ tự đúng: ${o.join(', ')}.`;
  let m = q.match(/^Tiếng "(.+)" có âm đầu/);
  if (m) return `Tiếng "${m[1]}" có âm đầu là ${o[0]}.`;
  if ((m = q.match(/^Tiếng "(.+)" có vần gì/))) return `Tiếng "${m[1]}" có vần ${o[0]}.`;
  if ((m = q.match(/^Tiếng "(.+)" có dấu thanh gì/))) return `Tiếng "${m[1]}" có ${o[0]}.`;
  if (q === CHINH_TA) return `Viết đúng là "${o[0]}".`;
  if ((m = q.match(/^Chọn chữ điền vào chỗ trống: (.+)$/))) return `Viết đúng là "${m[1].replace('…', o[0])}".`;
  return undefined;
}
const mk = (m, k) => (w, lv, t, q, o, ex) => {
  ex = ex || autoEx(q, o, k === 'order');
  return { w, m, ...(k ? { k } : {}), lv, t, q, o, ...(ex ? { ex } : {}) };
};

const T = mk('tv'), TO = mk('tv', 'order'), M = mk('toan'), MO = mk('toan', 'order');
const XEP_CAU = 'Xếp thành câu đúng';
const ABC = 'Xếp các chữ cái theo thứ tự trong bảng chữ cái';
const BE_LON = 'Xếp các số theo thứ tự từ bé đến lớn';
const LON_BE = 'Xếp các số theo thứ tự từ lớn đến bé';
const CHINH_TA = 'Từ nào viết đúng chính tả?';
const DIEN = (s) => `Chọn chữ điền vào chỗ trống: ${s}`;

export default [
  /* ======================= TIẾNG VIỆT · HỌC KÌ I ======================= */
  // Tuần 1: a, b, c, o; dấu huyền, dấu sắc, dấu hỏi
  T(1, 1, 'Âm đầu', 'Tiếng "ba" có âm đầu là âm nào?', ['b', 'a', 'c', 'e']),
  T(1, 1, 'Âm đầu', 'Tiếng "cá" có âm đầu là âm nào?', ['c', 'a', 'b', 'e']),
  T(2, 1, 'Âm và chữ', 'Tiếng nào có âm o?', ['cò', 'ca', 'bà', 'cá']),
  T(1, 1, 'Âm và chữ', 'Tiếng nào có âm a?', ['ba', 'be', 'bê', 'bé']),
  T(1, 1, 'Dấu thanh', 'Tiếng "bà" có dấu thanh gì?', ['dấu huyền', 'dấu sắc', 'dấu hỏi', 'dấu nặng']),
  T(1, 1, 'Dấu thanh', 'Tiếng "cá" có dấu thanh gì?', ['dấu sắc', 'dấu huyền', 'dấu ngã', 'dấu nặng']),
  T(1, 1, 'Dấu thanh', 'Tiếng nào có dấu huyền?', ['cà', 'cá', 'ca', 'bé']),
  T(2, 2, 'Dấu thanh', 'Tiếng "cỏ" có dấu thanh gì?', ['dấu hỏi', 'dấu ngã', 'dấu sắc', 'dấu nặng']),
  T(2, 2, 'Âm và chữ', 'Tiếng "bò" gồm những âm nào?', ['b và o', 'b và a', 'c và o', 'c và a']),

  // Tuần 2: ô, ơ, d, đ, e; dấu nặng, dấu ngã
  T(2, 1, 'Dấu thanh', 'Tiếng "cọ" có dấu thanh gì?', ['dấu nặng', 'dấu hỏi', 'dấu ngã', 'dấu sắc']),
  T(2, 2, 'Dấu thanh', 'Tiếng "đỗ" có dấu thanh gì?', ['dấu ngã', 'dấu hỏi', 'dấu nặng', 'dấu sắc']),
  T(2, 1, 'Âm và chữ', 'Tiếng nào có âm đ?', ['đá', 'da', 'ba', 'ca']),
  T(2, 1, 'Âm đầu', 'Tiếng "dê" có âm đầu là âm nào?', ['d', 'đ', 'b', 'e']),
  T(2, 1, 'Âm và chữ', 'Tiếng nào có âm ơ?', ['cờ', 'cô', 'co', 'ca']),
  T(2, 1, 'Âm và chữ', 'Tiếng nào có âm ô?', ['cô', 'cơ', 'co', 'ca']),
  T(2, 2, 'Âm và chữ', 'Tiếng "bé" có âm nào đứng sau âm b?', ['e', 'ê', 'a', 'o']),
  T(2, 2, 'Âm và chữ', 'Chữ đ khác chữ d ở chỗ nào?', ['có thêm nét ngang', 'có thêm dấu mũ', 'có thêm dấu móc', 'có thêm dấu sắc']),
  TO(2, 1, 'Bảng chữ cái', ABC, ['a', 'b', 'c', 'd']),

  // Tuần 3: ê, h, i, k, l
  T(3, 1, 'Âm đầu', 'Tiếng "hè" có âm đầu là âm nào?', ['h', 'e', 'l', 'k']),
  T(3, 1, 'Âm và chữ', 'Tiếng nào có âm i?', ['bi', 'be', 'ba', 'bê']),
  T(3, 1, 'Âm đầu', 'Tiếng "lá" có âm đầu là âm nào?', ['l', 'h', 'b', 'd']),
  T(3, 1, 'Âm và chữ', 'Tiếng nào có âm ê?', ['bê', 'be', 'bi', 'bo']),
  T(3, 2, 'Chính tả c/k', 'Viết k trước những âm nào?', ['e, ê, i', 'a, o, ô', 'ơ, u, ư', 'a, ă, â'], 'Viết k trước e, ê, i; viết c trước các âm còn lại.'),
  T(3, 2, 'Chính tả c/k', 'Tiếng nào viết đúng chính tả?', ['kì', 'cì', 'cê', 'ko']),
  T(6, 2, 'Chính tả c/k', CHINH_TA, ['kẻ vở', 'cẻ vở', 'kẻ vơ', 'cẽ vở']),
  T(3, 1, 'Chính tả c/k', DIEN('bà …ể'), ['k', 'c', 'q', 'g']),
  TO(4, 1, 'Bảng chữ cái', ABC, ['đ', 'e', 'ê', 'g']),

  // Tuần 4: m, n, g, gh, gi
  T(4, 1, 'Âm đầu', 'Tiếng "mẹ" có âm đầu là âm nào?', ['m', 'n', 'h', 'l']),
  T(4, 1, 'Âm đầu', 'Tiếng "nơ" có âm đầu là âm nào?', ['n', 'm', 'l', 'h']),
  T(4, 1, 'Âm và chữ', 'Tiếng nào có âm g?', ['gà', 'hà', 'là', 'mà']),
  T(4, 2, 'Chính tả g/gh', CHINH_TA, ['ghế gỗ', 'gế gỗ', 'ghế ghỗ', 'gế ghỗ']),
  T(4, 2, 'Chính tả g/gh', 'Viết gh trước những âm nào?', ['e, ê, i', 'a, o, ô', 'u, ư, ơ', 'a, ă, â'], 'Viết gh trước e, ê, i; viết g trước các âm còn lại.'),
  T(4, 2, 'Chính tả g/gh', CHINH_TA, ['gà gô', 'ghà gô', 'gà ghô', 'ghà ghô']),
  T(4, 1, 'Âm đầu', 'Tiếng "giỏ" có âm đầu là âm nào?', ['gi', 'g', 'd', 'gh']),
  T(4, 2, 'Chính tả g/gh', DIEN('…i nhớ'), ['gh', 'g', 'ng', 'gi']),
  T(4, 1, 'Từ ngữ', 'Tiếng nào gọi tên một con vật?', ['dê', 'ghế', 'cà', 'đa']),
  TO(4, 1, 'Bảng chữ cái', ABC, ['h', 'i', 'k', 'l']),

  // Tuần 5: kh, ng, ngh, nh, ph, qu
  T(5, 1, 'Âm đầu', 'Tiếng "khế" có âm đầu là âm nào?', ['kh', 'k', 'h', 'ch']),
  T(5, 1, 'Âm đầu', 'Tiếng "nhà" có âm đầu là âm nào?', ['nh', 'n', 'h', 'ng']),
  T(6, 1, 'Âm đầu', 'Tiếng "phố" có âm đầu là âm nào?', ['ph', 'p', 'h', 'th']),
  T(5, 2, 'Chính tả ng/ngh', 'Viết ngh trước những âm nào?', ['e, ê, i', 'a, o, u', 'ơ, ô, ư', 'a, ă, â'], 'Viết ngh trước e, ê, i; viết ng trước các âm còn lại.'),
  T(5, 2, 'Chính tả ng/ngh', CHINH_TA, ['nghỉ hè', 'ngỉ hè', 'nghỉ khè', 'ngĩ hè']),
  T(5, 2, 'Chính tả ng/ngh', CHINH_TA, ['ngõ nhỏ', 'nghõ nhỏ', 'ngõ nhõ', 'nghõ nhõ']),
  T(5, 2, 'Chính tả ng/ngh', DIEN('củ …ệ'), ['ngh', 'ng', 'nh', 'gh']),
  T(6, 2, 'Âm và chữ', 'Âm qu luôn viết chữ q cùng với chữ nào?', ['u', 'o', 'a', 'i']),
  T(6, 2, 'Chính tả', CHINH_TA, ['quả na', 'qủa na', 'cuả na', 'qả na']),
  T(5, 1, 'Từ ngữ', 'Tiếng nào gọi tên một loại quả?', ['khế', 'ghế', 'cá', 'cờ']),
  TO(5, 1, 'Bảng chữ cái', ABC, ['m', 'n', 'o', 'ô']),

  // Tuần 6: r, s, t, th, tr
  T(6, 1, 'Âm đầu', 'Tiếng "rổ" có âm đầu là âm nào?', ['r', 'd', 'gi', 's']),
  T(6, 1, 'Âm đầu', 'Tiếng "thỏ" có âm đầu là âm nào?', ['th', 't', 'h', 'tr']),
  T(6, 1, 'Âm đầu', 'Tiếng "tre" có âm đầu là âm nào?', ['tr', 't', 'ch', 'r']),
  T(6, 1, 'Âm và chữ', 'Tiếng nào có âm s?', ['sẻ', 'xe', 'rẻ', 'chè']),
  T(6, 2, 'Chính tả', CHINH_TA, ['chú thỏ', 'trú thỏ', 'chú thõ', 'trú thõ']),
  T(6, 1, 'Từ ngữ', 'Tiếng nào gọi tên đồ vật dùng để đựng rau?', ['rổ', 'ô', 'ghế', 'xe']),
  TO(6, 1, 'Bảng chữ cái', ABC, ['p', 'q', 'r', 's']),

  // Tuần 7: u, ư, v, x, y, ch; ia, ua, ưa
  T(7, 1, 'Âm đầu', 'Tiếng "xe" có âm đầu là âm nào?', ['x', 's', 'ch', 'kh']),
  T(7, 1, 'Âm và chữ', 'Tiếng nào có âm ch?', ['chó', 'tre', 'khỉ', 'thỏ']),
  T(7, 1, 'Âm và chữ', 'Tiếng "thư" có âm nào đứng sau âm th?', ['ư', 'u', 'ơ', 'o']),
  T(7, 1, 'Vần ia, ua, ưa', 'Tiếng "mía" có vần gì?', ['ia', 'ua', 'ưa', 'iu']),
  T(7, 1, 'Vần ia, ua, ưa', 'Tiếng "cua" có vần gì?', ['ua', 'ia', 'ưa', 'uô']),
  T(7, 1, 'Vần ia, ua, ưa', 'Tiếng "dưa" có vần gì?', ['ưa', 'ua', 'ia', 'ươ']),
  T(7, 2, 'Chính tả', DIEN('bờ …e'), ['tr', 'ch', 'th', 'kh']),
  T(7, 2, 'Chính tả', DIEN('…e lu'), ['x', 's', 'ch', 'kh']),
  TO(7, 2, 'Bảng chữ cái', ABC, ['t', 'u', 'ư', 'v']),
  TO(7, 1, 'Xếp câu', XEP_CAU, ['Bé', 'có', 'quả', 'na.']),

  // Tuần 8: an, ăn, ân; on, ôn, ơn; en, ên, in, un
  T(8, 1, 'Vần có n, m', 'Tiếng "bàn" có vần gì?', ['an', 'ăn', 'ân', 'am']),
  T(8, 1, 'Vần có n, m', 'Tiếng "khăn" có vần gì?', ['ăn', 'an', 'ân', 'ăm']),
  T(8, 1, 'Vần có n, m', 'Tiếng "đèn" có vần gì?', ['en', 'ên', 'in', 'eo']),
  T(8, 1, 'Vần có n, m', 'Tiếng nào có vần ơn?', ['sơn', 'sân', 'son', 'sen']),
  T(8, 1, 'Vần có n, m', 'Tiếng nào có vần in?', ['pin', 'bên', 'bún', 'ven']),
  T(8, 2, 'Vần có n, m', 'Tiếng "chồn" có vần gì?', ['ôn', 'on', 'ơn', 'ông']),
  T(8, 2, 'Vần có n, m', 'Tiếng "giun" có vần gì?', ['un', 'in', 'ưn', 'iun']),
  TO(8, 1, 'Xếp câu', XEP_CAU, ['Mẹ', 'mua', 'khăn', 'cho bé.']),

  // Tuần 9: am, ăm, âm; om, ôm, ơm; em, êm, im, um
  T(9, 1, 'Vần có n, m', 'Tiếng "tôm" có vần gì?', ['ôm', 'om', 'ơm', 'ông']),
  T(9, 1, 'Vần có n, m', 'Tiếng nào có vần âm?', ['nấm', 'nắm', 'nam', 'nom']),
  T(9, 1, 'Vần có n, m', 'Tiếng "kem" có vần gì?', ['em', 'êm', 'im', 'en']),
  T(9, 1, 'Vần có n, m', 'Từ nào có vần um?', ['chùm nho', 'chòm sao', 'chăm chỉ', 'lá sen']),
  T(9, 2, 'Vần có n, m', 'Tiếng "cơm" có vần gì?', ['ơm', 'ôm', 'om', 'ơn']),
  T(9, 2, 'Vần có n, m', 'Từ nào có vần im?', ['chim sẻ', 'chấm bi', 'chăm chỉ', 'tôm hùm']),
  T(9, 1, 'Từ ngữ', 'Từ nào gọi tên một món ăn?', ['cơm tấm', 'cái ấm', 'cái mâm', 'tấm nệm']),

  // Tuần 10: ai, ay, ây; oi, ôi, ơi; ui, ưi
  T(10, 1, 'Vần có i, y, o, u', 'Tiếng "tai" có vần gì?', ['ai', 'ay', 'ây', 'oi']),
  T(10, 1, 'Vần có i, y, o, u', 'Tiếng nào có vần ay?', ['máy', 'mái', 'mấy', 'mới']),
  T(10, 1, 'Vần có i, y, o, u', 'Tiếng "voi" có vần gì?', ['oi', 'ôi', 'ơi', 'ai']),
  T(10, 1, 'Vần có i, y, o, u', 'Tiếng "núi" có vần gì?', ['ui', 'uôi', 'ưi', 'ôi']),
  T(10, 2, 'Vần có i, y, o, u', 'Từ nào có vần ưi?', ['gửi thư', 'gói quà', 'gối ôm', 'núi cao']),
  T(10, 2, 'Vần có i, y, o, u', 'Tiếng "mây" có vần gì?', ['ây', 'ay', 'ai', 'âu']),
  T(10, 1, 'Từ ngữ', 'Từ nào gọi tên đồ dùng học tập?', ['cục tẩy', 'con bò', 'quả lê', 'cây đa']),
  TO(10, 1, 'Xếp câu', XEP_CAU, ['Bố', 'đi', 'xe máy', 'về nhà.']),

  // Tuần 11: uôi, ươi; ao, eo; au, âu, êu; iu, ưu
  T(14, 1, 'Vần có i, y, o, u', 'Tiếng "chuối" có vần gì?', ['uôi', 'ươi', 'ui', 'ôi']),
  T(14, 1, 'Vần có i, y, o, u', 'Tiếng "bưởi" có vần gì?', ['ươi', 'uôi', 'ưi', 'ơi']),
  T(11, 1, 'Vần có i, y, o, u', 'Tiếng "mèo" có vần gì?', ['eo', 'ao', 'au', 'êu']),
  T(11, 1, 'Vần có i, y, o, u', 'Tiếng "sao" có vần gì?', ['ao', 'au', 'eo', 'âu']),
  T(11, 2, 'Vần có i, y, o, u', 'Từ nào có vần âu?', ['cây cầu', 'cây cau', 'con sếu', 'cái cào']),
  T(11, 2, 'Vần có i, y, o, u', 'Tiếng "rìu" có vần gì?', ['iu', 'ưu', 'êu', 'ui']),
  T(11, 2, 'Vần có i, y, o, u', 'Tiếng "kêu" có vần gì?', ['êu', 'eo', 'âu', 'iu']),
  TO(11, 1, 'Xếp câu', XEP_CAU, ['Chú mèo', 'nằm', 'trên', 'ghế.']),

  // Tuần 12: ac, ăc, âc; oc, ôc, uc, ưc; at, ăt, ât; ot, ôt, ơt; et, êt, it; ut, ưt
  T(12, 1, 'Vần có c, t, p, ch, nh', 'Tiếng "hạc" có vần gì?', ['ac', 'ăc', 'âc', 'at']),
  T(12, 1, 'Vần có c, t, p, ch, nh', 'Tiếng "mắt" có vần gì?', ['ăt', 'at', 'ât', 'ăc']),
  T(12, 1, 'Vần có c, t, p, ch, nh', 'Tiếng "tết" có vần gì?', ['êt', 'et', 'it', 'êch']),
  T(12, 1, 'Vần có c, t, p, ch, nh', 'Tiếng "bút" có vần gì?', ['ut', 'ưt', 'uc', 'ôt']),
  T(12, 2, 'Vần có c, t, p, ch, nh', 'Tiếng "cốc" có vần gì?', ['ôc', 'oc', 'uc', 'ôt']),
  T(12, 2, 'Vần có c, t, p, ch, nh', 'Tiếng "mứt" có vần gì?', ['ưt', 'ut', 'ưc', 'ât']),
  T(12, 2, 'Vần có c, t, p, ch, nh', 'Tiếng "ớt" có vần gì?', ['ơt', 'ôt', 'ot', 'ơc']),
  TO(12, 1, 'Xếp câu', XEP_CAU, ['Bé', 'tập', 'hát', 'ở lớp.']),

  // Tuần 13: ap, ăp, âp; op, ôp, ơp; ep, êp, ip, up; anh, ênh, inh; ach, êch, ich
  T(13, 1, 'Vần có c, t, p, ch, nh', 'Tiếng "tháp" có vần gì?', ['ap', 'ăp', 'âp', 'at']),
  T(13, 1, 'Vần có c, t, p, ch, nh', 'Tiếng "dép" có vần gì?', ['ep', 'êp', 'ip', 'et']),
  T(13, 1, 'Vần có c, t, p, ch, nh', 'Tiếng "chanh" có vần gì?', ['anh', 'ang', 'ăng', 'ach']),
  T(13, 1, 'Vần có c, t, p, ch, nh', 'Tiếng "ếch" có vần gì?', ['êch', 'ach', 'ich', 'êt']),
  T(13, 2, 'Vần có c, t, p, ch, nh', 'Từ nào có vần inh?', ['kính mắt', 'cánh cửa', 'kênh rạch', 'cảnh đẹp']),
  T(13, 2, 'Vần có c, t, p, ch, nh', 'Tiếng "sách" có vần gì?', ['ach', 'anh', 'ac', 'êch']),
  T(13, 2, 'Vần có c, t, p, ch, nh', 'Tiếng "búp" có vần gì?', ['up', 'ut', 'ưp', 'ôp']),
  TO(13, 1, 'Xếp câu', XEP_CAU, ['Anh', 'đọc', 'sách', 'cho em.']),

  // Tuần 14: ang, ăng, âng; ong, ông; ung, ưng; iêc, iên, iêp
  T(14, 1, 'Vần có ng, iê, uô, ươ', 'Tiếng "trăng" có vần gì?', ['ăng', 'ang', 'âng', 'anh']),
  T(14, 1, 'Vần có ng, iê, uô, ươ', 'Tiếng "bông" có vần gì?', ['ông', 'ong', 'ung', 'ôn']),
  T(14, 1, 'Vần có ng, iê, uô, ươ', 'Tiếng "sừng" có vần gì?', ['ưng', 'ung', 'ăng', 'ông']),
  T(14, 2, 'Vần có ng, iê, uô, ươ', 'Tiếng "tiên" có vần gì?', ['iên', 'iêng', 'in', 'iêm']),
  T(14, 2, 'Vần có ng, iê, uô, ươ', 'Tiếng "xiếc" có vần gì?', ['iêc', 'iêt', 'ic', 'iêp']),
  T(14, 2, 'Vần có ng, iê, uô, ươ', 'Từ nào có vần ong?', ['con ong', 'cây sung', 'bông hồng', 'cái thúng']),
  TO(14, 1, 'Xếp câu', XEP_CAU, ['Đêm nay', 'trăng', 'rất', 'sáng.']),

  // Tuần 15: yên, yêt; iêng, iêm, yêm; uôc, uôt; uôn, uông; ươc, ươt; ươn, ương
  T(15, 1, 'Vần có ng, iê, uô, ươ', 'Tiếng "chuông" có vần gì?', ['uông', 'uôn', 'ương', 'ông']),
  T(15, 1, 'Vần có ng, iê, uô, ươ', 'Tiếng "vườn" có vần gì?', ['ươn', 'ương', 'uôn', 'ơn']),
  T(15, 2, 'Vần có ng, iê, uô, ươ', 'Tiếng "chuột" có vần gì?', ['uôt', 'uôc', 'ươt', 'ôt']),
  T(15, 2, 'Vần có ng, iê, uô, ươ', 'Tiếng "thước" có vần gì?', ['ươc', 'uôc', 'ươt', 'ơc']),
  T(15, 2, 'Vần có ng, iê, uô, ươ', 'Tiếng "yến" có vần gì?', ['yên', 'yêu', 'yêt', 'in']),
  T(15, 2, 'Vần có ng, iê, uô, ươ', 'Tiếng "chiêng" có vần gì?', ['iêng', 'iên', 'iêm', 'eng']),
  T(15, 3, 'Vần có ng, iê, uô, ươ', 'Từ nào có vần uôn?', ['cuộn len', 'cái muỗng', 'con lươn', 'quả chuông']),
  TO(15, 1, 'Xếp câu', XEP_CAU, ['Vườn nhà', 'em', 'có', 'cây bưởi.']),

  // Tuần 16: oa, oe; oan, oăn, oat, oăt; oai, uê, uy
  T(16, 1, 'Vần có oa, oe, uy, uâ', 'Tiếng "hoa" có vần gì?', ['oa', 'oe', 'ao', 'ua']),
  T(16, 1, 'Vần có oa, oe, uy, uâ', 'Tiếng "khoẻ" có vần gì?', ['oe', 'oa', 'eo', 'uê']),
  T(16, 2, 'Vần có oa, oe, uy, uâ', 'Tiếng "toán" có vần gì?', ['oan', 'oăn', 'oat', 'an']),
  T(16, 2, 'Vần có oa, oe, uy, uâ', 'Tiếng "huệ" có vần gì?', ['uê', 'uy', 'oe', 'ui']),
  T(16, 2, 'Vần có oa, oe, uy, uâ', 'Tiếng "khoai" có vần gì?', ['oai', 'oay', 'ai', 'oa']),
  T(16, 2, 'Vần có oa, oe, uy, uâ', 'Tiếng "thuỷ" có vần gì?', ['uy', 'ui', 'uê', 'oai']),
  TO(16, 1, 'Xếp câu', XEP_CAU, ['Bà', 'trồng', 'hoa', 'trước sân.']),

  // Tuần 17: uân, uât; uyên, uyêt; oang, oăng; oanh, oach
  T(17, 1, 'Vần có oa, oe, uy, uâ', 'Tiếng "xuân" có vần gì?', ['uân', 'uôn', 'ân', 'uyên']),
  T(17, 2, 'Vần có oa, oe, uy, uâ', 'Tiếng "khuyên" có vần gì?', ['uyên', 'uyêt', 'iên', 'uân']),
  T(17, 2, 'Vần có oa, oe, uy, uâ', 'Tiếng "hoàng" có vần gì?', ['oang', 'oan', 'oanh', 'ang']),
  T(17, 2, 'Vần có oa, oe, uy, uâ', 'Từ nào có vần oanh?', ['khoanh tay', 'khoang thuyền', 'loay hoay', 'khoai lang']),
  T(17, 3, 'Vần có oa, oe, uy, uâ', 'Tiếng "thuyền" có vần gì?', ['uyên', 'uyêt', 'uân', 'iên']),
  TO(17, 1, 'Xếp câu', XEP_CAU, ['Mùa xuân', 'cây cối', 'đâm chồi', 'nảy lộc.']),

  // Tuần 18: ôn tập học kì I
  T(18, 2, 'Tiếng', 'Câu "Bé đi nhà trẻ." có mấy tiếng?', ['4 tiếng', '3 tiếng', '5 tiếng', '2 tiếng']),
  T(18, 2, 'Tiếng', 'Câu "Mẹ đưa bé đi học." có mấy tiếng?', ['5 tiếng', '4 tiếng', '6 tiếng', '3 tiếng']),
  T(18, 1, 'Dấu thanh', 'Tiếng nào có dấu hỏi?', ['thỏ', 'thợ', 'thơ', 'thớ']),
  T(18, 1, 'Dấu thanh', 'Tiếng nào có dấu ngã?', ['võ', 'vó', 'vọ', 'vò']),
  T(18, 2, 'Chính tả c/k', CHINH_TA, ['cái kéo', 'cái céo', 'cái kẻo', 'cái quéo']),
  T(18, 2, 'Chính tả g/gh', CHINH_TA, ['bàn ghế', 'bàn gế', 'bàn ghé', 'bàn gé']),
  T(18, 3, 'Chính tả ng/ngh', CHINH_TA, ['bé nghe kể chuyện', 'bé nge kể chuyện', 'bé nghe cể chuyện', 'bé nge cể chuyện']),
  T(18, 2, 'Bảng chữ cái', 'Chữ cái nào đứng ngay sau chữ a trong bảng chữ cái?', ['ă', 'b', 'â', 'c']),
  TO(18, 2, 'Bảng chữ cái', ABC, ['a', 'ă', 'â', 'b']),
  TO(18, 2, 'Bảng chữ cái', ABC, ['u', 'ư', 'v', 'x']),

  /* ======================= TIẾNG VIỆT · HỌC KÌ II ======================= */
  // Tuần 19–20: Tôi và các bạn
  T(19, 1, 'Câu', 'Chữ cái đầu câu phải viết thế nào?', ['viết hoa', 'viết thường', 'viết nghiêng', 'viết thật nhỏ']),
  T(19, 1, 'Dấu câu', 'Câu "Lan đi học" nên đặt dấu gì ở cuối?', ['dấu chấm (.)', 'dấu chấm hỏi (?)', 'dấu phẩy (,)', 'dấu hai chấm (:)']),
  T(19, 2, 'Viết hoa', 'Trong câu "Bạn Hà rất vui.", tiếng nào là tên riêng?', ['Hà', 'rất', 'vui', 'Bạn']),
  T(19, 1, 'Từ ngữ', 'Từ nào nói về tình bạn?', ['thân thiết', 'nóng bức', 'nhỏ xíu', 'chua chát']),
  T(19, 2, 'Chính tả', CHINH_TA, ['bạn bè', 'bạng bè', 'bạn bẻ', 'bặn bè']),
  TO(19, 1, 'Xếp câu', XEP_CAU, ['Em và Hà', 'là', 'bạn', 'thân.']),
  T(20, 1, 'Từ ngữ', 'Từ nào chỉ người trong gia đình?', ['ông bà', 'bàn ghế', 'sân trường', 'cây bàng']),
  T(20, 2, 'Từ ngữ', 'Bố của bố gọi là gì?', ['ông nội', 'ông ngoại', 'chú', 'cậu']),
  T(20, 2, 'Từ ngữ', 'Mẹ của mẹ gọi là gì?', ['bà ngoại', 'bà nội', 'cô', 'dì']),
  T(20, 3, 'Từ ngữ', 'Em trai của bố gọi là gì?', ['chú', 'cậu', 'dì', 'bác']),
  T(20, 3, 'Từ ngữ', 'Em trai của mẹ gọi là gì?', ['cậu', 'chú', 'cô', 'bác']),
  T(20, 2, 'Chính tả', CHINH_TA, ['quây quần', 'quây quầng', 'qây quần', 'quây cuần']),
  TO(20, 1, 'Xếp câu', XEP_CAU, ['Mẹ', 'nấu', 'cơm', 'rất ngon.']),
  TO(20, 2, 'Xếp câu', XEP_CAU, ['Cả nhà', 'quây quần', 'bên', 'mâm cơm.']),

  // Tuần 21–22: Mái trường mến yêu
  T(21, 1, 'Từ ngữ', 'Từ nào chỉ đồ vật có trong lớp học?', ['bảng đen', 'cánh đồng', 'dòng sông', 'con trâu']),
  T(21, 1, 'Từ ngữ', 'Người dạy học ở trường gọi là gì?', ['thầy cô giáo', 'bác sĩ', 'bác nông dân', 'chú bộ đội']),
  T(21, 2, 'Chính tả tr/ch', DIEN('trống …ường'), ['tr', 'ch', 't', 'c']),
  T(21, 1, 'Hiểu biết', 'Ngày Nhà giáo Việt Nam là ngày nào?', ['20 tháng 11', '1 tháng 6', '8 tháng 3', '2 tháng 9']),
  T(21, 2, 'Từ ngữ', 'Từ nào chỉ việc làm của học sinh ở lớp?', ['nghe giảng', 'cày ruộng', 'bán hàng', 'lái xe']),
  TO(21, 1, 'Xếp câu', XEP_CAU, ['Chúng em', 'chào cờ', 'vào sáng', 'thứ Hai.']),
  T(22, 1, 'Hiểu biết', 'Đèn giao thông màu nào báo phải dừng lại?', ['màu đỏ', 'màu xanh', 'màu tím', 'màu trắng']),
  T(22, 2, 'Chính tả', CHINH_TA, ['vỉa hè', 'vĩa hè', 'vỉa hẻ', 'dỉa hè']),
  T(22, 2, 'Chính tả s/x', DIEN('con …ẻ'), ['s', 'x', 'ch', 'r']),
  T(22, 2, 'Chính tả s/x', DIEN('…ôi gấc'), ['x', 's', 'ch', 'tr']),
  T(22, 1, 'Từ ngữ', 'Khi đi xe máy, em cần đội gì?', ['mũ bảo hiểm', 'mũ len', 'nón lá', 'khăn quàng']),
  TO(22, 1, 'Xếp câu', XEP_CAU, ['Em', 'đi bộ', 'trên', 'vỉa hè.']),

  // Tuần 23–24: Bài học từ cuộc sống, Thiên nhiên kì thú
  T(23, 2, 'Từ trái nghĩa', 'Từ nào trái nghĩa với "chăm chỉ"?', ['lười biếng', 'siêng năng', 'cần cù', 'chịu khó']),
  T(23, 2, 'Từ cùng nghĩa', 'Từ nào cùng nghĩa với "chăm chỉ"?', ['siêng năng', 'lười biếng', 'nhút nhát', 'vội vàng']),
  T(23, 1, 'Câu hỏi', 'Câu nào là câu hỏi?', ['Bạn tên là gì?', 'Bạn tên là Lan.', 'Lan học lớp 1A.', 'Lan hát rất hay.']),
  T(23, 1, 'Dấu câu', 'Cuối câu hỏi có dấu gì?', ['dấu chấm hỏi (?)', 'dấu chấm (.)', 'dấu phẩy (,)', 'dấu hai chấm (:)']),
  T(23, 2, 'Chính tả', CHINH_TA, ['rùa và thỏ', 'dùa và thỏ', 'rùa và thõ', 'rùa và thở']),
  TO(23, 1, 'Xếp câu', XEP_CAU, ['Thỏ', 'chạy thi', 'với', 'rùa.']),
  T(24, 1, 'Từ ngữ', 'Từ nào chỉ thời tiết?', ['mưa rào', 'bông hoa', 'con đường', 'cái ô']),
  T(24, 1, 'Hiểu biết', 'Mùa nào trời nóng nhất?', ['mùa hè', 'mùa đông', 'mùa xuân', 'mùa thu']),
  T(24, 1, 'Từ ngữ', 'Con vật nào sống dưới nước?', ['con cá', 'con gà', 'con chó', 'con mèo']),
  T(24, 2, 'Chính tả tr/ch', DIEN('quả …anh'), ['ch', 'tr', 'gh', 'th']),
  T(24, 2, 'Chính tả', CHINH_TA, ['cầu vồng', 'cầu dồng', 'cầu vòng', 'cầu dòng']),
  TO(24, 1, 'Xếp câu', XEP_CAU, ['Sau cơn mưa,', 'cầu vồng', 'hiện ra', 'trên trời.']),

  // Tuần 25–26: Thế giới trong mắt em, Đất nước và con người
  T(25, 1, 'Từ ngữ', 'Từ nào chỉ màu sắc?', ['đỏ tươi', 'bàn tay', 'đôi mắt', 'quyển vở']),
  T(25, 1, 'Từ trái nghĩa', 'Từ nào trái nghĩa với "to"?', ['nhỏ', 'lớn', 'cao', 'dài']),
  T(25, 1, 'Từ trái nghĩa', 'Từ nào trái nghĩa với "sáng"?', ['tối', 'trưa', 'trắng', 'mát']),
  T(25, 2, 'Từ trái nghĩa', 'Từ nào trái nghĩa với "nóng"?', ['lạnh', 'ấm', 'oi', 'nắng']),
  T(25, 2, 'Từ ngữ', 'Bộ phận nào giúp em nhìn thấy mọi vật?', ['đôi mắt', 'đôi tai', 'cái mũi', 'bàn chân']),
  TO(25, 1, 'Xếp câu', XEP_CAU, ['Bầu trời', 'hôm nay', 'xanh', 'thẳm.']),
  T(26, 1, 'Hiểu biết', 'Thủ đô của nước ta là thành phố nào?', ['Hà Nội', 'Huế', 'Đà Nẵng', 'Cần Thơ']),
  T(26, 1, 'Hiểu biết', 'Lá cờ Tổ quốc Việt Nam có màu gì?', ['nền đỏ, sao vàng', 'nền xanh, sao trắng', 'nền vàng, sao đỏ', 'nền trắng, sao xanh']),
  T(26, 2, 'Viết hoa', 'Trong câu "Em yêu Hà Nội.", từ nào là tên riêng?', ['Hà Nội', 'Em', 'yêu', 'em yêu']),
  T(26, 2, 'Chính tả', CHINH_TA, ['quê hương', 'quê hươn', 'quê hưng', 'quê hướng']),
  TO(26, 1, 'Xếp câu', XEP_CAU, ['Em', 'yêu', 'quê hương', 'Việt Nam.']),

  // Tuần 27–28: Vòng tay bạn bè, lời nói hằng ngày
  T(27, 1, 'Lời nói', 'Câu nào là lời cảm ơn?', ['Cảm ơn bạn đã cho mình mượn bút.', 'Bạn ơi, cho mình mượn bút.', 'Mình xin lỗi bạn.', 'Chào bạn, mình là An.']),
  T(27, 1, 'Lời nói', 'Khi làm vỡ cốc của bạn, em nói gì?', ['Mình xin lỗi bạn.', 'Cảm ơn bạn.', 'Chào bạn.', 'Tạm biệt bạn.']),
  T(27, 2, 'Lời nói', 'Gặp cô giáo ở cổng trường, em nói gì?', ['Em chào cô ạ!', 'Tạm biệt cô!', 'Cảm ơn cô!', 'Cô ơi, đi đâu?']),
  T(27, 2, 'Chính tả ng/ngh', DIEN('…ỉ ngơi'), ['ngh', 'ng', 'nh', 'gh']),
  T(27, 2, 'Chính tả ng/ngh', CHINH_TA, ['nghe nhạc', 'nge nhạc', 'nghe nhạt', 'nghè nhạc']),
  TO(27, 1, 'Xếp câu', XEP_CAU, ['Các bạn', 'cùng nhau', 'chơi', 'nhảy dây.']),
  T(28, 1, 'Từ ngữ', 'Con gì gáy "ò ó o" mỗi sáng?', ['con gà trống', 'con vịt', 'con mèo', 'con trâu']),
  T(28, 1, 'Từ ngữ', 'Con vật nào có cái vòi dài?', ['con voi', 'con hổ', 'con khỉ', 'con ngựa']),
  T(28, 2, 'Từ ngữ', 'Từ nào chỉ một việc làm?', ['quét nhà', 'cái chổi', 'màu xanh', 'quả táo']),
  T(28, 2, 'Chính tả g/gh', DIEN('con …ẹ'), ['gh', 'g', 'ng', 'gi']),
  TO(28, 1, 'Xếp câu', XEP_CAU, ['Đàn gà', 'đang', 'mổ thóc', 'ngoài sân.']),

  // Tuần 29–30: Thiên nhiên, con vật quanh em
  T(29, 2, 'Từ cùng nghĩa', 'Từ nào cùng nghĩa với "to"?', ['lớn', 'bé', 'thấp', 'ngắn']),
  T(29, 2, 'Từ trái nghĩa', 'Từ nào trái nghĩa với "cao"?', ['thấp', 'dài', 'to', 'xa']),
  T(29, 1, 'Từ ngữ', 'Loài chim nào biết nói theo người?', ['con vẹt', 'con cò', 'con sẻ', 'con cú']),
  T(29, 2, 'Câu', 'Câu nào nói về con mèo?', ['Mèo bắt chuột rất giỏi.', 'Gà gáy ò ó o.', 'Vịt bơi dưới ao.', 'Chó trông nhà.']),
  T(29, 2, 'Chính tả', CHINH_TA, ['con chuồn chuồn', 'con truồn truồn', 'con chuồng chuồng', 'con chuồn truồn']),
  TO(29, 1, 'Xếp câu', XEP_CAU, ['Chú chó', 'vẫy đuôi', 'mừng', 'chủ về.']),
  T(30, 2, 'Dấu câu', 'Câu "Bông hoa này đẹp quá" nên đặt dấu gì ở cuối?', ['dấu chấm than (!)', 'dấu chấm hỏi (?)', 'dấu phẩy (,)', 'dấu hai chấm (:)']),
  T(30, 2, 'Dấu câu', 'Câu "Bạn đã ăn cơm chưa" nên đặt dấu gì ở cuối?', ['dấu chấm hỏi (?)', 'dấu chấm (.)', 'dấu phẩy (,)', 'dấu chấm than (!)']),
  T(30, 2, 'Dấu câu', 'Câu "Em thích vẽ tranh" nên đặt dấu gì ở cuối?', ['dấu chấm (.)', 'dấu chấm hỏi (?)', 'dấu phẩy (,)', 'dấu hai chấm (:)']),
  T(30, 1, 'Từ ngữ', 'Cây nào cho quả có múi, vị chua?', ['cây cam', 'cây chuối', 'cây dừa', 'cây ổi']),
  TO(30, 2, 'Xếp câu', XEP_CAU, ['Hoa phượng', 'nở đỏ', 'khi', 'hè về.']),

  // Tuần 31–32: Thiếu nhi, mùa hè
  T(31, 1, 'Hiểu biết', 'Ngày Quốc tế Thiếu nhi là ngày nào?', ['1 tháng 6', '1 tháng 5', '2 tháng 9', '20 tháng 11']),
  T(31, 2, 'Chính tả', CHINH_TA, ['kì nghỉ hè', 'kì ngỉ hè', 'cì nghỉ hè', 'kì nghỉ hẽ']),
  T(31, 2, 'Từ ngữ', 'Hoa nào thường nở vào mùa hè, có màu đỏ rực?', ['hoa phượng', 'hoa đào', 'hoa mai', 'hoa cúc']),
  T(31, 2, 'Từ ngữ', 'Con vật nào kêu "ve ve" vào mùa hè?', ['con ve sầu', 'con ếch', 'con dế', 'con chim sẻ']),
  TO(31, 1, 'Xếp câu', XEP_CAU, ['Mùa hè,', 'em', 'được đi', 'tắm biển.']),
  T(32, 2, 'Từ trái nghĩa', 'Từ nào trái nghĩa với "vui"?', ['buồn', 'cười', 'mừng', 'hát']),
  T(32, 2, 'Từ trái nghĩa', 'Từ nào trái nghĩa với "nhanh"?', ['chậm', 'mau', 'vội', 'gấp']),
  T(32, 3, 'Từ cùng nghĩa', 'Từ nào cùng nghĩa với "xinh"?', ['đẹp', 'xấu', 'to', 'nhỏ']),
  T(32, 2, 'Chính tả s/x', CHINH_TA, ['sân trường', 'xân trường', 'sân chường', 'xân chường']),
  TO(32, 2, 'Xếp câu', XEP_CAU, ['Bé', 'giúp mẹ', 'tưới', 'cây hoa.']),

  // Tuần 33–35: ôn tập cuối năm
  T(33, 2, 'Tiếng', 'Câu "Hôm nay em được điểm mười." có mấy tiếng?', ['6 tiếng', '5 tiếng', '7 tiếng', '4 tiếng']),
  T(33, 2, 'Ôn vần', 'Từ nào có vần ươn?', ['con lươn', 'cái giường', 'luống rau', 'bãi cát']),
  T(33, 2, 'Ôn vần', 'Từ nào có vần oang?', ['khoảng sân', 'khoanh tay', 'khoai lang', 'hoa lan']),
  T(33, 3, 'Chính tả c/k', 'Từ nào viết đúng chính tả?', ['cây kim', 'kây kim', 'cây cim', 'kây cim']),
  T(34, 3, 'Câu', 'Câu nào viết đúng?', ['Mẹ đi chợ mua cá.', 'mẹ đi chợ mua cá', 'Mẹ đi trợ mua cá.', 'Mẹ đi chợ mua cá,']),
  T(34, 2, 'Từ ngữ', 'Từ nào chỉ tình cảm?', ['yêu thương', 'chạy nhảy', 'cây cối', 'bàn ghế']),
  T(34, 2, 'Từ ngữ', 'Từ nào chỉ đặc điểm của quả chanh?', ['chua', 'ngọt', 'mặn', 'cay']),
  TO(34, 2, 'Xếp câu', XEP_CAU, ['Em', 'là', 'học sinh', 'lớp Một.']),
  T(35, 3, 'Chính tả', CHINH_TA, ['nghỉ ngơi', 'ngỉ ngơi', 'nghỉ nghơi', 'ngỉ nghơi']),
  T(35, 3, 'Chính tả', CHINH_TA, ['gồ ghề', 'ghồ ghề', 'gồ gề', 'ghồ gề']),
  T(35, 2, 'Từ trái nghĩa', 'Từ nào trái nghĩa với "đóng"?', ['mở', 'khép', 'cài', 'kéo']),
  TO(35, 3, 'Xếp câu', XEP_CAU, ['Cô giáo', 'dạy', 'em', 'tập viết.']),


  /* ======================= TOÁN · HỌC KÌ I ======================= */
  // Tuần 1: các số 0–5, đếm
  M(1, 1, 'Đếm', 'Có mấy quả táo? 🍎🍎🍎', ['3', '2', '4', '5'], 'Đếm từng quả: 1, 2, 3. Có 3 quả táo.'),
  M(1, 1, 'Đếm', 'Có mấy con cá? 🐟🐟🐟🐟🐟', ['5', '4', '6', '3'], 'Đếm: 1, 2, 3, 4, 5. Có 5 con cá.'),
  M(1, 1, 'Đếm', 'Một con mèo có mấy cái chân?', ['4', '2', '3', '5'], 'Con mèo có 4 chân.'),
  M(1, 1, 'Thứ tự số', 'Đếm 1, 2, 3, … Số tiếp theo là số nào?', ['4', '5', '2', '1'], 'Sau 3 là 4.'),
  M(1, 2, 'Thứ tự số', 'Số nào đứng ngay trước số 5?', ['4', '6', '3', '2'], 'Đếm 1, 2, 3, 4, 5: số đứng ngay trước 5 là 4.'),
  // Tuần 2: các số 6–10, số 0
  M(2, 1, 'Đếm', 'Có mấy ngôi sao? ⭐⭐⭐⭐⭐⭐⭐', ['7', '6', '8', '9'], 'Đếm từng ngôi sao: có 7 ngôi sao.'),
  M(2, 1, 'Đếm', 'Một con gà có mấy cái chân?', ['2', '4', '1', '3'], 'Con gà có 2 chân.'),
  M(2, 2, 'Số 0', 'Trong đĩa hết kẹo rồi. Số kẹo trong đĩa là số mấy?', ['0', '1', '10', '2'], 'Hết kẹo là có 0 cái kẹo.'),
  M(2, 2, 'Thứ tự số', 'Số nào ở giữa số 6 và số 8?', ['7', '5', '9', '6'], 'Đếm 6, 7, 8: số ở giữa là 7.'),
  M(2, 1, 'Đếm', 'Hai bàn tay em có tất cả mấy ngón tay?', ['10', '5', '8', '12'], 'Mỗi bàn tay 5 ngón, hai bàn tay 10 ngón.'),
  MO(2, 1, 'Xếp số', BE_LON, ['2', '5', '7', '9']),
  // Tuần 3: nhiều hơn, ít hơn, bằng nhau
  M(3, 1, 'Nhiều hơn, ít hơn', 'Có 5 bạn và 4 cái ghế. Mỗi bạn ngồi một ghế thì thế nào?', ['thiếu 1 ghế', 'thừa 1 ghế', 'vừa đủ ghế', 'thiếu 2 ghế'], '5 bạn mà chỉ có 4 ghế nên thiếu 1 ghế.'),
  M(3, 1, 'Nhiều hơn, ít hơn', 'Có 3 cái cốc và 5 cái thìa. Đồ vật nào nhiều hơn?', ['cái thìa', 'cái cốc', 'bằng nhau', 'chưa biết được'], '5 nhiều hơn 3 nên thìa nhiều hơn.'),
  M(3, 2, 'Nhiều hơn, ít hơn', 'Có 6 con thỏ và 6 củ cà rốt. Mỗi con thỏ một củ thì thế nào?', ['vừa đủ', 'thừa 1 củ', 'thiếu 1 củ', 'thừa 2 củ'], '6 con thỏ, 6 củ: mỗi con một củ là vừa đủ.'),
  M(3, 2, 'Nhiều hơn, ít hơn', '🐔🐔🐔 và 🐤🐤. Gà mẹ nhiều hơn gà con mấy con?', ['1', '2', '3', '5'], '3 gà mẹ, 2 gà con: nhiều hơn 1 con.'),
  // Tuần 4: so sánh số
  M(4, 1, 'So sánh', '7 … 5. Dấu nào điền vào chỗ trống?', ['>', '<', '=', '+'], '7 lớn hơn 5 nên viết 7 > 5.'),
  M(4, 1, 'So sánh', '3 … 8. Dấu nào điền vào chỗ trống?', ['<', '>', '=', '+'], '3 bé hơn 8 nên viết 3 < 8.'),
  M(4, 1, 'So sánh', 'Bình có 4 viên bi, An có 6 viên bi. Ai có nhiều bi hơn?', ['An', 'Bình', 'hai bạn bằng nhau', 'chưa biết được'], '6 > 4 nên An nhiều bi hơn.'),
  M(4, 2, 'So sánh', 'Số nào lớn hơn 7 nhưng bé hơn 9?', ['8', '6', '9', '10'], 'Giữa 7 và 9 là số 8.'),
  M(4, 2, 'So sánh', 'Số nào bé nhất: 8, 3, 6, 5?', ['3', '5', '6', '8'], 'Đếm từ 0, số 3 đến trước tiên nên bé nhất.'),
  MO(4, 1, 'Xếp số', LON_BE, ['10', '8', '5', '1']),
  // Tuần 5–6: mấy và mấy
  M(5, 1, 'Mấy và mấy', '7 gồm 5 và mấy?', ['2', '3', '1', '12'], '5 và 2 được 7.'),
  M(5, 1, 'Mấy và mấy', '10 gồm 6 và mấy?', ['4', '3', '5', '16'], '6 và 4 được 10.'),
  M(5, 2, 'Mấy và mấy', 'Có 8 quả bóng, 3 quả xanh, còn lại màu đỏ. Có mấy quả bóng đỏ?', ['5', '11', '4', '3'], '8 gồm 3 và 5.'),
  M(6, 2, 'Mấy và mấy', 'Có 6 cái bánh chia vào 2 đĩa. Đĩa thứ nhất có 1 cái. Đĩa thứ hai có mấy cái?', ['5', '7', '4', '6'], '6 gồm 1 và 5.'),
  M(6, 2, 'Mấy và mấy', 'Bé có 9 cái kẹo trong hai túi. Túi đỏ có 4 cái. Túi xanh có mấy cái?', ['5', '13', '4', '6'], '9 gồm 4 và 5.'),
  M(9, 3, 'Tư duy', 'Một con mèo và một con gà có tất cả mấy cái chân?', ['6', '4', '8', '2'], 'Mèo 4 chân, gà 2 chân: 4 + 2 = 6.'),
  // Tuần 7–8: hình phẳng, lắp ghép hình
  M(7, 1, 'Hình phẳng', 'Hình nào có 3 cạnh?', ['hình tam giác', 'hình vuông', 'hình tròn', 'hình chữ nhật'], 'Hình tam giác có 3 cạnh.'),
  M(7, 1, 'Hình phẳng', 'Bánh xe đạp có dạng hình gì?', ['hình tròn', 'hình vuông', 'hình tam giác', 'hình chữ nhật'], 'Bánh xe tròn để lăn được.'),
  M(7, 1, 'Hình phẳng', 'Mặt quyển sách thường có dạng hình gì?', ['hình chữ nhật', 'hình tròn', 'hình tam giác', 'hình ngôi sao'], 'Mặt quyển sách là hình chữ nhật.'),
  M(7, 2, 'Hình phẳng', 'Hình vuông có mấy cạnh?', ['4 cạnh', '3 cạnh', '5 cạnh', '2 cạnh'], 'Hình vuông có 4 cạnh dài bằng nhau.'),
  M(8, 2, 'Hình phẳng', 'Hình nào có 4 cạnh dài bằng nhau?', ['hình vuông', 'hình tam giác', 'hình tròn', 'hình chữ nhật'], 'Hình vuông có 4 cạnh bằng nhau; hình chữ nhật có 2 cạnh dài, 2 cạnh ngắn.'),
  M(8, 3, 'Ghép hình', 'Ghép 2 hình tam giác giống nhau có thể được hình nào?', ['hình vuông', 'hình tròn', 'hình ngôi sao', 'hình trái tim'], 'Hai hình tam giác vuông bằng nhau ghép lại được hình vuông.'),
  M(8, 2, 'Ghép hình', 'Gấp đôi tờ giấy hình vuông theo đường chéo, được hình gì?', ['hình tam giác', 'hình tròn', 'hình vuông', 'hình chữ nhật'], 'Gấp theo đường chéo được hình tam giác.'),
  // Tuần 9: phép cộng trong phạm vi 10
  M(9, 1, 'Cộng trong 10', 'Có 4 con vịt, thêm 3 con vịt nữa. Có tất cả mấy con vịt?', ['7', '1', '8', '6'], '4 + 3 = 7.'),
  M(9, 1, 'Cộng trong 10', '🍌🍌🍌 và 🍌🍌. Có tất cả mấy quả chuối?', ['5', '6', '4', '1'], '3 + 2 = 5.'),
  M(9, 2, 'Cộng trong 10', 'Lan gấp được 5 con hạc, Mai gấp được 5 con hạc. Cả hai bạn gấp được mấy con?', ['10', '0', '9', '55'], '5 + 5 = 10.'),
  M(9, 2, 'Cộng trong 10', 'Có 6 bạn đang chơi, không có thêm bạn nào đến. Có mấy bạn đang chơi?', ['6', '0', '7', '60'], 'Cộng với 0 thì số giữ nguyên: 6 + 0 = 6.'),
  // Tuần 10: phép trừ trong phạm vi 10
  M(11, 1, 'Trừ trong 10', 'Có 6 quả bóng, bay mất 2 quả. Còn lại mấy quả bóng?', ['4', '8', '3', '5'], '6 − 2 = 4.'),
  M(11, 1, 'Trừ trong 10', 'Trên cành có 7 con chim, 3 con bay đi. Trên cành còn mấy con chim?', ['4', '10', '3', '5'], '7 − 3 = 4.'),
  M(11, 2, 'Trừ trong 10', 'Đĩa có 8 cái bánh, cả nhà ăn hết 8 cái. Còn lại mấy cái bánh?', ['0', '16', '8', '1'], '8 − 8 = 0.'),
  M(11, 2, 'Trừ trong 10', 'Mẹ mua 10 quả trứng, rán 3 quả. Còn lại mấy quả trứng?', ['7', '13', '6', '8'], '10 − 3 = 7.'),
  // Tuần 11: tìm số, tính liên tiếp
  M(11, 2, 'Tìm số', '… + 3 = 8. Số cần điền là số nào?', ['5', '11', '4', '6'], 'Vì 5 + 3 = 8.'),
  M(11, 2, 'Tìm số', '9 − … = 6. Số cần điền là số nào?', ['3', '15', '2', '4'], 'Vì 9 − 3 = 6.'),
  M(11, 2, 'Tìm số', 'Em có 4 cái nhãn vở. Em cần thêm mấy cái để có 10 cái?', ['6', '14', '5', '4'], 'Vì 4 + 6 = 10.'),
  M(13, 2, 'Tính liên tiếp', 'Xe buýt có 5 người. Bến 1 lên 3 người, bến 2 xuống 2 người. Xe còn mấy người?', ['6', '10', '8', '4'], '5 + 3 = 8; 8 − 2 = 6.'),
  // Tuần 12: so sánh phép tính
  M(12, 2, 'So sánh phép tính', 'Phép tính nào có kết quả bằng 8?', ['5 + 3', '4 + 3', '9 − 2', '6 + 1'], '5 + 3 = 8; các phép tính kia đều bằng 7.'),
  M(12, 2, 'So sánh phép tính', 'Phép tính nào có kết quả lớn nhất?', ['6 + 4', '5 + 3', '9 − 1', '7 + 2'], '6 + 4 = 10 là lớn nhất (8, 8, 9).'),
  M(12, 2, 'So sánh phép tính', '4 + 5 … 10. Dấu nào điền vào chỗ trống?', ['<', '>', '=', '+'], '4 + 5 = 9, mà 9 < 10.'),
  M(12, 3, 'So sánh phép tính', 'Phép tính nào có kết quả bé nhất?', ['9 − 7', '3 + 1', '10 − 6', '2 + 3'], '9 − 7 = 2 là bé nhất (4, 4, 5).'),
  // Tuần 13: bài toán có lời
  M(13, 2, 'Bài toán', 'Nam có 3 viên bi, Hùng có nhiều hơn Nam 2 viên. Hùng có mấy viên bi?', ['5', '1', '3', '6'], 'Nhiều hơn thì cộng: 3 + 2 = 5.'),
  M(13, 2, 'Bài toán', 'Lọ có 9 bông hoa, 4 bông màu đỏ, còn lại màu vàng. Có mấy bông hoa vàng?', ['5', '13', '4', '6'], '9 − 4 = 5.'),
  M(13, 3, 'Bài toán', 'Hàng có 3 bạn trai và 4 bạn gái. Có 2 bạn ra về. Hàng còn mấy bạn?', ['5', '9', '7', '3'], '3 + 4 = 7; 7 − 2 = 5.'),
  MO(13, 2, 'Xếp phép tính', 'Xếp các phép tính theo kết quả từ bé đến lớn', ['9 − 8', '7 − 4', '2 + 3', '10 − 2'], 'Kết quả: 1, 3, 5, 8.'),
  // Tuần 14: khối lập phương, khối hộp chữ nhật
  M(14, 1, 'Khối hình', 'Con xúc xắc có dạng khối gì?', ['khối lập phương', 'khối hộp chữ nhật', 'hình vuông', 'hình tròn'], 'Con xúc xắc có 6 mặt là hình vuông bằng nhau: khối lập phương.'),
  M(14, 2, 'Khối hình', 'Viên gạch có dạng khối gì?', ['khối hộp chữ nhật', 'khối lập phương', 'hình chữ nhật', 'hình tam giác'], 'Viên gạch dài, dẹt: khối hộp chữ nhật.'),
  M(14, 2, 'Khối hình', 'Hộp sữa tươi nhỏ thường có dạng khối gì?', ['khối hộp chữ nhật', 'khối lập phương', 'hình tròn', 'hình tam giác'], 'Hộp sữa là khối hộp chữ nhật.'),
  // Tuần 15–16: vị trí, định hướng
  M(15, 1, 'Vị trí', 'An đứng trước Bình, Bình đứng trước Chi. Ai đứng ở giữa?', ['Bình', 'An', 'Chi', 'Mai'], 'Thứ tự: An, Bình, Chi. Bình ở giữa.'),
  M(15, 2, 'Vị trí', 'Con mèo nằm dưới gầm bàn. Cái bàn ở đâu so với con mèo?', ['ở trên', 'ở dưới', 'ở bên trái', 'ở phía sau'], 'Mèo ở dưới bàn thì bàn ở trên mèo.'),
  M(15, 2, 'Vị trí', 'Hàng có 5 bạn. Hoa đứng thứ 3 tính từ trái sang. Bên trái Hoa có mấy bạn?', ['2', '3', '1', '4'], 'Trước vị trí thứ 3 có 2 bạn.'),
  M(16, 3, 'Vị trí', 'Em đứng thứ 4 tính từ đầu hàng. Phía trước em có mấy bạn?', ['3', '4', '5', '2'], 'Đứng thứ 4 thì trước em có 3 bạn.'),
  M(16, 2, 'Vị trí', 'Mèo ngồi bên trái chó, thỏ ngồi bên phải chó. Con nào ngồi ở giữa?', ['chó', 'mèo', 'thỏ', 'gà'], 'Mèo, chó, thỏ: chó ở giữa.'),
  // Tuần 17–18: ôn tập học kì I
  M(17, 2, 'Ôn tập', 'Hai số nào cộng lại bằng 10?', ['3 và 7', '4 và 5', '2 và 9', '6 và 3'], '3 + 7 = 10.'),
  M(17, 2, 'Ôn tập', 'Anh có 10 cái kẹo, chia đều cho anh và em. Mỗi người mấy cái?', ['5', '10', '2', '20'], '10 gồm 5 và 5.'),
  M(18, 3, 'Tư duy', 'Đĩa có 5 quả cam. Bé lấy 2 quả bỏ sang đĩa trống. Đĩa nào có nhiều cam hơn?', ['đĩa ban đầu', 'đĩa mới', 'bằng nhau', 'chưa biết được'], 'Đĩa ban đầu còn 3 quả, đĩa mới 2 quả: 3 > 2.'),
  M(18, 2, 'Khối hình', 'Vật nào lăn được dễ nhất?', ['quả bóng', 'hộp bánh', 'con xúc xắc', 'viên gạch'], 'Quả bóng tròn, không có góc nên lăn dễ.'),
  MO(18, 2, 'Xếp số', BE_LON, ['0', '3', '6', '9']),

  /* ======================= TOÁN · HỌC KÌ II ======================= */
  // Tuần 19–20: số có hai chữ số
  M(19, 1, 'Chục và đơn vị', 'Số 15 gồm mấy chục và mấy đơn vị?', ['1 chục và 5 đơn vị', '5 chục và 1 đơn vị', '1 chục và 4 đơn vị', '15 chục'], 'Số 15: chữ số 1 chỉ 1 chục, chữ số 5 chỉ 5 đơn vị.'),
  M(19, 1, 'Chục và đơn vị', 'Số gồm 2 chục và 3 đơn vị là số nào?', ['23', '32', '5', '203'], '2 chục 3 đơn vị viết là 23.'),
  M(19, 1, 'Chục và đơn vị', '1 chục quả trứng là bao nhiêu quả?', ['10 quả', '1 quả', '100 quả', '12 quả'], '1 chục = 10.'),
  M(19, 1, 'Đọc, viết số', 'Số 40 đọc là gì?', ['bốn mươi', 'bốn mười', 'mười bốn', 'bốn chục mươi'], '40 đọc là bốn mươi.'),
  M(19, 2, 'Đọc, viết số', 'Số "năm mươi lăm" viết là gì?', ['55', '505', '45', '50'], 'Năm mươi lăm: 5 chục 5 đơn vị, viết 55.'),
  M(20, 2, 'Đọc, viết số', 'Số "hai mươi mốt" viết là gì?', ['21', '201', '12', '20'], 'Hai mươi mốt: 2 chục 1 đơn vị, viết 21.'),
  M(20, 2, 'Đọc, viết số', 'Số 74 đọc là gì?', ['bảy mươi tư', 'bốn mươi bảy', 'bảy tư mươi', 'bảy mươi bốn mươi'], '74 đọc là bảy mươi tư.'),
  M(20, 1, 'Chục và đơn vị', 'Số 72 có chữ số hàng chục là chữ số nào?', ['7', '2', '70', '9'], 'Số 72: hàng chục là 7, hàng đơn vị là 2.'),
  M(20, 2, 'Chục và đơn vị', 'Có 3 bó que tính, mỗi bó 1 chục, và 4 que rời. Có tất cả bao nhiêu que tính?', ['34', '7', '43', '304'], '3 chục và 4 đơn vị là 34.'),
  M(20, 3, 'Chục và đơn vị', 'Mỗi hộp có 10 cái bút. 6 hộp có bao nhiêu cái bút?', ['60', '16', '6', '600'], '6 chục là 60.'),
  // Tuần 21–22: so sánh, thứ tự số đến 100
  M(21, 1, 'So sánh', '45 … 54. Dấu nào điền vào chỗ trống?', ['<', '>', '=', '+'], 'So hàng chục: 4 chục < 5 chục nên 45 < 54.'),
  M(21, 2, 'So sánh', 'Số nào lớn nhất: 38, 83, 80, 69?', ['83', '80', '69', '38'], '83 và 80 cùng 8 chục, 83 có 3 đơn vị nên lớn nhất.'),
  M(21, 2, 'So sánh', 'Tổ Một trồng 47 cây, tổ Hai trồng 41 cây. Tổ nào trồng nhiều hơn?', ['tổ Một', 'tổ Hai', 'hai tổ bằng nhau', 'chưa biết được'], 'Cùng 4 chục, 7 > 1 nên 47 > 41.'),
  M(21, 2, 'Số có hai chữ số', 'Số bé nhất có hai chữ số là số nào?', ['10', '11', '99', '1'], '10 là số đầu tiên có hai chữ số.'),
  M(21, 2, 'Số có hai chữ số', 'Số lớn nhất có hai chữ số là số nào?', ['99', '90', '100', '98'], '99 lớn nhất; 100 đã có ba chữ số.'),
  M(22, 1, 'Số liền trước, liền sau', 'Số liền trước của 70 là số nào?', ['69', '71', '60', '80'], 'Đếm lùi: 70, 69. Số liền trước là 69.'),
  M(22, 1, 'Số liền trước, liền sau', 'Số liền sau của 39 là số nào?', ['40', '38', '30', '310'], '39 thêm 1 là 40.'),
  M(22, 3, 'Số liền trước, liền sau', 'Số tròn chục lớn hơn 10 và bé hơn 30 là số nào?', ['20', '25', '40', '10'], 'Các số tròn chục: 10, 20, 30… Giữa 10 và 30 là 20.'),
  MO(22, 1, 'Xếp số', BE_LON, ['19', '56', '65', '91']),
  MO(22, 2, 'Xếp số', LON_BE, ['87', '78', '70', '17']),
  MO(22, 2, 'Xếp số', BE_LON, ['40', '44', '48', '84']),
  // Tuần 23–24: dài hơn, ngắn hơn, xăng-ti-mét
  M(23, 1, 'Độ dài', 'Xăng-ti-mét viết tắt là gì?', ['cm', 'm', 'km', 'kg'], 'Xăng-ti-mét viết tắt là cm.'),
  M(23, 1, 'Độ dài', 'Để đo độ dài cái bàn học, em dùng gì?', ['thước kẻ', 'cái cân', 'đồng hồ', 'cái ca'], 'Thước dùng để đo độ dài.'),
  M(23, 2, 'Độ dài', 'Bút chì dài 15 cm, thước kẻ dài 20 cm. Vật nào dài hơn?', ['thước kẻ', 'bút chì', 'hai vật dài bằng nhau', 'cục tẩy'], '20 cm > 15 cm nên thước kẻ dài hơn.'),
  M(23, 3, 'Độ dài', 'Bố và em cùng đo chiếc bàn bằng gang tay. Ai đếm được nhiều gang hơn?', ['em', 'bố', 'bằng nhau', 'chưa biết được'], 'Gang tay em ngắn hơn nên phải đo nhiều gang hơn.'),
  M(24, 2, 'Độ dài', 'Băng giấy xanh dài 8 cm, băng đỏ dài 6 cm. Băng xanh dài hơn băng đỏ mấy xăng-ti-mét?', ['2 cm', '14 cm', '8 cm', '3 cm'], '8 − 6 = 2 (cm).'),
  M(24, 2, 'Độ dài', 'Con kiến bò từ vạch 0 đến vạch 9 trên thước. Kiến bò được bao nhiêu xăng-ti-mét?', ['9 cm', '10 cm', '8 cm', '0 cm'], 'Từ vạch 0 đến vạch 9 là 9 cm.'),
  MO(24, 2, 'Xếp độ dài', 'Cục tẩy dài 4 cm, bút chì dài 15 cm, hộp bút dài 22 cm, thước kẻ dài 20 cm. Xếp các đồ vật từ ngắn đến dài', ['cục tẩy', 'bút chì', 'thước kẻ', 'hộp bút'], '4 cm < 15 cm < 20 cm < 22 cm.'),
  // Tuần 25–26: cộng, trừ số có hai chữ số (không nhớ)
  M(25, 1, 'Cộng trong 100', 'Lớp 1A có 20 bạn nam và 15 bạn nữ. Lớp 1A có tất cả bao nhiêu bạn?', ['35', '5', '25', '45'], '20 + 15 = 35.'),
  M(25, 2, 'Cộng trong 100', 'Bố hái 32 quả cam, mẹ hái 5 quả. Cả hai hái được bao nhiêu quả?', ['37', '82', '36', '38'], '32 + 5 = 37. Cộng 5 vào hàng đơn vị, không cộng vào hàng chục.'),
  M(25, 2, 'Cộng trong 100', 'Tủ có 45 quyển sách, xếp thêm 2 chục quyển. Tủ có bao nhiêu quyển?', ['65', '47', '25', '245'], '2 chục = 20; 45 + 20 = 65.'),
  M(25, 2, 'Cộng trong 100', 'Bút giá 23 nghìn đồng, vở giá 14 nghìn đồng. Mua cả hai hết bao nhiêu tiền?', ['37 nghìn đồng', '27 nghìn đồng', '36 nghìn đồng', '9 nghìn đồng'], '23 + 14 = 37 (nghìn đồng).'),
  M(27, 2, 'Trừ trong 100', 'Mẹ mua 30 quả trứng, đã dùng 10 quả. Còn lại bao nhiêu quả trứng?', ['20', '40', '10', '30'], '30 − 10 = 20.'),
  M(27, 2, 'Trừ trong 100', 'Sợi dây dài 45 cm, cắt đi 15 cm. Sợi dây còn lại dài bao nhiêu?', ['30 cm', '60 cm', '20 cm', '35 cm'], '45 − 15 = 30 (cm).'),
  M(27, 2, 'Trừ trong 100', 'Cửa hàng có 76 quả bóng, đã bán 34 quả. Còn lại bao nhiêu quả bóng?', ['42', '110', '43', '32'], '76 − 34 = 42.'),
  M(26, 3, 'Trừ trong 100', 'Lớp có 38 bạn, 5 bạn nghỉ ốm. Có mặt bao nhiêu bạn?', ['33', '43', '88', '34'], '38 − 5 = 33. Trừ 5 ở hàng đơn vị.'),
  // Tuần 27: tìm số, tính liên tiếp
  M(27, 2, 'Tìm số', 'Số nào cộng với 25 thì được 75?', ['50', '100', '40', '55'], '75 − 25 = 50.'),
  M(27, 3, 'Tính liên tiếp', 'Hộp có 20 viên kẹo. Bố bỏ thêm 30 viên, em ăn 10 viên. Hộp còn bao nhiêu viên?', ['40', '60', '50', '30'], '20 + 30 = 50; 50 − 10 = 40.'),
  M(27, 3, 'Tính liên tiếp', 'Hùng có 57 cái nhãn vở, cho bạn 7 cái rồi được tặng 10 cái. Hùng có bao nhiêu cái?', ['60', '40', '50', '74'], '57 − 7 = 50; 50 + 10 = 60.'),
  M(27, 3, 'Tìm số', 'Một số trừ đi 20 thì được 30. Số đó là số nào?', ['50', '10', '30', '40'], '30 + 20 = 50.'),
  MO(27, 3, 'Xếp phép tính', 'Xếp các phép tính theo kết quả từ bé đến lớn', ['20 + 5', '40 − 10', '33 + 4', '50 − 10'], 'Kết quả: 25, 30, 37, 40.'),
  // Tuần 28–29: xem giờ đúng
  M(29, 1, 'Xem giờ', 'Kim ngắn chỉ số 3, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?', ['3 giờ', '12 giờ', '2 giờ', '4 giờ'], 'Kim dài chỉ 12, kim ngắn chỉ số 3: 3 giờ đúng.'),
  M(29, 2, 'Xem giờ', 'Lúc 9 giờ đúng, kim dài chỉ vào số nào?', ['12', '9', '3', '6'], 'Giờ đúng thì kim dài luôn chỉ số 12.'),
  M(29, 2, 'Xem giờ', 'Lúc 7 giờ đúng, kim ngắn chỉ vào số nào?', ['7', '12', '6', '8'], 'Kim ngắn chỉ giờ: 7 giờ thì kim ngắn chỉ số 7.'),
  M(29, 1, 'Xem giờ', 'Em ăn cơm trưa lúc mấy giờ là hợp lí?', ['11 giờ trưa', '2 giờ sáng', '9 giờ tối', '5 giờ sáng'], 'Bữa trưa thường vào khoảng 11 giờ.'),
  M(29, 2, 'Xem giờ', 'Em vào học lúc 7 giờ, học 2 giờ thì ra chơi. Em ra chơi lúc mấy giờ?', ['9 giờ', '5 giờ', '8 giờ', '72 giờ'], '7 + 2 = 9. Em ra chơi lúc 9 giờ.'),
  M(29, 3, 'Xem giờ', 'Bố đi làm về lúc 5 giờ chiều, mẹ về sớm hơn bố 1 giờ. Mẹ về lúc mấy giờ?', ['4 giờ chiều', '6 giờ chiều', '5 giờ chiều', '1 giờ chiều'], 'Sớm hơn 1 giờ: 5 − 1 = 4. Mẹ về lúc 4 giờ chiều.'),
  // Tuần 30–31: ngày trong tuần
  M(30, 1, 'Ngày trong tuần', 'Một tuần lễ có mấy ngày?', ['7 ngày', '5 ngày', '6 ngày', '10 ngày'], 'Thứ Hai đến Chủ nhật: 7 ngày.'),
  M(30, 1, 'Ngày trong tuần', 'Hôm nay là thứ Hai. Ngày mai là thứ mấy?', ['thứ Ba', 'Chủ nhật', 'thứ Tư', 'thứ Sáu'], 'Sau thứ Hai là thứ Ba.'),
  M(30, 2, 'Ngày trong tuần', 'Hôm nay là thứ Sáu. Hôm qua là thứ mấy?', ['thứ Năm', 'thứ Bảy', 'thứ Tư', 'Chủ nhật'], 'Trước thứ Sáu là thứ Năm.'),
  M(30, 2, 'Ngày trong tuần', 'Hôm nay là thứ Bảy. Ngày mai là ngày nào?', ['Chủ nhật', 'thứ Hai', 'thứ Sáu', 'thứ Tư'], 'Sau thứ Bảy là Chủ nhật.'),
  M(31, 3, 'Ngày trong tuần', 'Em đi học từ thứ Hai đến thứ Sáu. Một tuần em đi học mấy ngày?', ['5 ngày', '6 ngày', '4 ngày', '7 ngày'], 'Thứ Hai, Ba, Tư, Năm, Sáu: 5 ngày.'),
  M(31, 3, 'Ngày trong tuần', 'Hôm nay là thứ Tư. 2 ngày nữa là thứ mấy?', ['thứ Sáu', 'thứ Năm', 'thứ Bảy', 'thứ Hai'], 'Thứ Tư, thứ Năm, thứ Sáu.'),
  MO(31, 1, 'Ngày trong tuần', 'Xếp các ngày theo thứ tự trong tuần, bắt đầu từ thứ Hai', ['thứ Hai', 'thứ Ba', 'thứ Tư', 'thứ Năm']),
  MO(31, 2, 'Ngày trong tuần', 'Xếp các ngày theo thứ tự trong tuần, bắt đầu từ thứ Năm', ['thứ Năm', 'thứ Sáu', 'thứ Bảy', 'Chủ nhật']),
  // Tuần 32–35: ôn tập cuối năm, quy luật, tư duy
  M(32, 2, 'Quy luật', 'Dãy số 10, 20, 30, …, 50. Số còn thiếu là số nào?', ['40', '35', '31', '45'], 'Mỗi số hơn số trước 10: 30 + 10 = 40.'),
  M(32, 2, 'Quy luật', 'Dãy số 2, 4, 6, 8, … Số tiếp theo là số nào?', ['10', '9', '12', '11'], 'Mỗi lần thêm 2: 8 + 2 = 10.'),
  M(32, 2, 'Quy luật', 'Dãy hình 🔴🔵🔴🔵🔴 … Hình tiếp theo là hình nào?', ['🔵', '🔴', '🟢', '🟡'], 'Đỏ, xanh lặp lại; sau đỏ là xanh.'),
  M(33, 2, 'Bài toán', 'Năm nay em 6 tuổi, anh hơn em 3 tuổi. Năm nay anh bao nhiêu tuổi?', ['9', '3', '8', '10'], 'Hơn thì cộng: 6 + 3 = 9.'),
  M(33, 3, 'Bài toán', 'Thùng có 50 quyển vở. Cô phát cho lớp 20 quyển, rồi phát thêm 10 quyển. Thùng còn bao nhiêu quyển vở?', ['20', '30', '40', '80'], '50 − 20 = 30; 30 − 10 = 20.'),
  M(33, 2, 'Chục và đơn vị', 'Số 80 gồm mấy chục?', ['8 chục', '80 chục', '0 chục', '18 chục'], '80 = 8 chục.'),
  M(34, 3, 'Tư duy', 'Số nào dưới đây có hai chữ số giống nhau và bé hơn 30?', ['22', '33', '20', '12'], 'Số có hai chữ số giống nhau: 11, 22, 33… Trong các phương án, chỉ 22 vừa giống nhau vừa bé hơn 30.'),
  M(34, 3, 'Tư duy', 'Có 2 chục cái bánh, chia đều cho 2 đĩa. Mỗi đĩa có bao nhiêu cái bánh?', ['10', '20', '2', '12'], '2 chục = 20; 20 gồm 10 và 10.'),
  M(34, 3, 'Tư duy', 'Mỗi tuần em đi học 5 ngày. Hai tuần em đi học bao nhiêu ngày?', ['10 ngày', '7 ngày', '5 ngày', '12 ngày'], '5 + 5 = 10.'),
  M(35, 2, 'Chục và đơn vị', 'Có 99 quả trứng, xếp vào khay, mỗi khay 1 chục quả. Xếp đầy được mấy khay?', ['9 khay', '99 khay', '10 khay', '8 khay'], '99 có 9 chục, nên đầy 9 khay, thừa 9 quả.'),
  M(35, 3, 'Tư duy', 'Dùng hai thẻ số 3 và 8 ghép thành số có hai chữ số. Số lớn nhất ghép được là số nào?', ['83', '38', '11', '88'], 'Đặt chữ số lớn hơn ở hàng chục: 83.'),
  MO(35, 3, 'Xếp số', BE_LON, ['9', '19', '90', '99']),
  MO(9, 2, 'Xếp phép tính', 'Xếp các phép tính theo kết quả từ bé đến lớn', ['1 + 1', '2 + 2', '3 + 3', '4 + 4'], 'Kết quả: 2, 4, 6, 8.'),
  MO(29, 2, 'Xếp sự việc', 'Xếp các việc theo giờ: thức dậy 6 giờ, vào học 7 giờ, ra chơi 9 giờ, ăn trưa 11 giờ', ['thức dậy', 'vào học', 'ra chơi', 'ăn trưa'], '6 giờ, 7 giờ, 9 giờ, 11 giờ.'),
  MO(33, 3, 'Xếp số', LON_BE, ['100', '91', '19', '10']),
];
