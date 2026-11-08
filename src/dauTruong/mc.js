/**
 * Lời hai MC của 🏆 Đấu Trường Nhí: anh Minh (mc 0, vest) và chị Mai (mc 1, áo dài). Lời gốc ở docs/dau-truong/kich-ban-mc.md,
 * sửa theo luật vòng thi mới (thiet-ke.md mục 5: Khởi động cá nhân + chuông, Tăng tốc 4 câu tư duy, Về đích gói + Ngôi sao hy vọng).
 *
 * SCRIPT[key] = [người nói, ...các câu]; người nói: 0 anh Minh, 1 chị Mai, 'mon' = MC của môn câu đang hỏi (Toán 0, Tiếng Việt 1).
 * Chỗ trống {ten} {diem}… điền từ vars; câu thiếu biến thì bỏ, chọn câu khác. Nguyên tắc lời: ngắn khi đang thi, không chê,
 * không "nhé", không gạch ngang dài, kết bằng . hoặc !; MC im khi các bạn đang nghĩ.
 */
import { speakLetters } from '../thanDong/quiz/mc.js';
import { optTokens, sayTokens } from './figs.js';

export const MC_NAMES = ['Anh Minh', 'Chị Mai'];
export const LETTER = ['a', 'bê', 'xê', 'đê'];

const SCRIPT = {
  // ---------- Mở màn ----------
  openHi: [0, 'Xin chào các bạn học sinh lớp {lop} thân mến! Chào mừng các bạn đến với {tenCT}!', 'Xin chào cả khán phòng! Chào mừng các bạn lớp {lop} đến với {tenCT}!'],
  openMe0: [0, 'Mình là anh Minh. Hôm nay mình sẽ cùng các bạn chinh phục những câu hỏi Toán.', 'Mình là anh Minh, và những con số hôm nay đang chờ các bạn đấy!'],
  openMe1: [1, 'Còn mình là chị Mai, người bạn đồng hành của các bạn ở những câu hỏi Tiếng Việt.', 'Và mình là chị Mai. Mình sẽ mang đến những câu hỏi Tiếng Việt thật thú vị!'],
  openPlan: [1, 'Hôm nay có ba vòng thi: Khởi động, Tăng tốc và Về đích. Bốn bạn thí sinh đã sẵn sàng trên bục!'],
  openAud: [0, 'Các bạn ở khán phòng cũng trả lời mọi câu hỏi và có điểm riêng, hiện ngay trên đầu mỗi bạn!', 'Không ai ngồi chơi không đâu! Khán phòng cũng trả lời từng câu và có điểm riêng.'],
  openGo: [1, 'Nào, chúng ta bắt đầu thôi!', 'Và bây giờ, chương trình bắt đầu!'],

  // ---------- Chung cho mọi câu ----------
  toTV: [0, 'Câu tiếp theo là Tiếng Việt. Mời chị Mai!', 'Đến lượt chị Mai với một câu Tiếng Việt.'],
  toToan: [1, 'Câu tiếp theo là Toán, mời anh Minh!', 'Anh Minh ơi, câu Toán của anh đây!'],
  thank0: [0, 'Cảm ơn chị Mai!', 'Có ngay!'],
  thank1: [1, 'Cảm ơn anh Minh!', 'Vâng ạ!'],
  ask: ['mon', 'Câu số {so}.', 'Câu hỏi số {so}.'],
  kindOrder: ['mon', 'Hãy chạm các thẻ theo đúng thứ tự.', 'Xếp các thẻ cho đúng thứ tự nào!'],
  go: ['mon', 'Thời gian bắt đầu!', 'Các bạn bắt đầu!', 'Mời các bạn trả lời!'],
  goOne: ['mon', 'Mời {ten} trả lời!', '{ten}, thời gian của bạn bắt đầu!'],
  goBell: ['mon', 'Ai biết đáp án thì bấm chuông!', 'Chuông đã mở, bạn nào nhanh tay nhất?'],
  locked: ['mon', '{ten} đã chốt đáp án!', '{ten} đã chọn xong!'],
  lockedFast: ['mon', 'Một câu trả lời rất nhanh của {ten}!', '{ten} trả lời nhanh như chớp!', 'Nhanh quá! {ten} đã chốt đáp án.'],
  allLock: ['mon', 'Cả bốn bạn đã chốt đáp án!', 'Nhanh quá, bốn bạn đều đã chốt!'],
  timeUp: ['mon', 'Hết giờ!', 'Thời gian đã hết!'],
  answer: ['mon', 'Đáp án đúng là {chu}.', 'Và đáp án đúng là {chu}!'],
  answerShow: ['mon', 'Và đây là thứ tự đúng.', 'Cùng xem thứ tự đúng nào!'],
  bellHit: ['mon', '{ten} bấm chuông nhanh nhất! Mời bạn trả lời.', 'Chuông màu {mau}! Mời {ten}.'],
  noBell: ['mon', 'Không bạn nào bấm chuông.', 'Chưa bạn nào bấm chuông cả.'],
  audTop: [1, 'Ở khán phòng, {ten} đang dẫn đầu với {diem} điểm!', 'Khán phòng ơi, dẫn đầu lúc này là {ten}, {diem} điểm!', 'Những bạn khán giả trả lời đúng đang sáng xanh. {ten} dẫn đầu khán phòng với {diem} điểm!'],
  audNone: [1, 'Ở khán phòng, những bạn trả lời đúng đang sáng xanh!'],
  // sau lời kết quả của thí sinh: nói riêng với khán phòng (người xem trên máy là khán giả, cần nghe kết quả của mình)
  audRight: [1, 'Khán phòng ơi, bạn nào chọn {chu} được cộng {diem} điểm!', 'Các bạn khán phòng chọn {chu} đều được {diem} điểm!'],
  audRightOrder: [1, 'Khán phòng ơi, bạn nào xếp đúng được cộng {diem} điểm!'],

  // ---------- Khởi động ----------
  kdIntro: [1, 'Vòng thứ nhất, Khởi động!', 'Chúng ta bước vào vòng Khởi động!'],
  kdRule: [0, 'Đầu tiên là lượt thi cá nhân. Mỗi bạn {so} câu hỏi riêng, mỗi câu {giay} giây. Trả lời đúng được mười điểm.'],
  kdTurn: [0, 'Mời {ten} bước vào lượt thi cá nhân!', 'Lượt cá nhân của {ten}. Bạn đã sẵn sàng chưa?', 'Và bây giờ là lượt của {ten}!'],
  soloRight: ['mon', 'Chính xác! {ten} được cộng mười điểm.', 'Đúng rồi! Mười điểm cho {ten}!'],
  soloWrong: ['mon', '{ten} chưa đúng rồi, tiếc quá. Cố lên {ten}!', 'Câu trả lời của {ten} chưa chính xác, nhưng {ten} vẫn còn cơ hội!'],
  soloLate: ['mon', '{ten} chưa kịp trả lời. Không sao, câu sau cố lên!'],
  kdTurnDone: [1, '{ten} đã hoàn thành lượt cá nhân với {diem} điểm!', 'Cảm ơn {ten}! Bạn đang có {diem} điểm.'],
  kdCommon: [0, 'Tiếp theo là lượt thi chung! Cả bốn bạn cùng bấm chuông giành quyền trả lời. Đúng được mười điểm, sai bị trừ năm điểm.'],
  kdCommon2: [1, 'Hãy nghe hết câu hỏi rồi mới bấm chuông. Bình tĩnh và tự tin!'],
  commonRight: ['mon', 'Chính xác! {ten} được cộng mười điểm.', 'Giỏi lắm {ten}, mười điểm!'],
  commonWrong: ['mon', '{ten} chưa đúng, tiếc quá. {ten} bị trừ năm điểm.', 'Câu trả lời của {ten} chưa chính xác, {ten} bị trừ năm điểm.'],
  kdEnd: [0, 'Vòng Khởi động đã khép lại. {ten} đang dẫn đầu với {diem} điểm!', 'Hết vòng Khởi động! Người dẫn đầu lúc này là {ten}, {diem} điểm.'],

  // ---------- Tăng tốc ----------
  ttIntro: [1, 'Vòng thứ hai, Tăng tốc!', 'Chuẩn bị nào, vòng Tăng tốc đã tới!'],
  ttRule: [0, 'Bốn câu hỏi tư duy, mỗi câu {giay} giây, cả bốn bạn cùng trả lời. Đúng và nhanh nhất được bốn mươi điểm, rồi ba mươi, hai mươi, mười điểm.'],
  ttAsk: ['mon', 'Câu số {so}, {loai}!', 'Câu số {so}. Câu này là {loai}.'],
  ttFast: [0, 'Nhanh nhất là {ten}, chỉ {giay} giây! Bốn mươi điểm!', 'Wow, {ten} chỉ cần {giay} giây. Bốn mươi điểm cho {ten}!'],
  ttSome: [0, 'Có {soBan} bạn trả lời đúng. Ai nhanh hơn thì nhiều điểm hơn!'],
  ttNone: ['mon', 'Câu này chưa bạn nào làm đúng. Câu sau cố lên!', 'Câu này khó quá, chưa ai chinh phục được.'],
  ttEnd: [0, 'Kết thúc vòng Tăng tốc! {ten} đang dẫn đầu với {diem} điểm.', 'Tăng tốc đã xong! Người dẫn đầu là {ten}, {diem} điểm.'],

  // ---------- Về đích ----------
  vdIntro: [0, 'Và đây là vòng quyết định, Về đích!', 'Vòng cuối cùng, Về đích!'],
  vdRule: [1, 'Mỗi bạn chọn một gói ba câu hỏi: ba mươi, năm mươi, bảy mươi hoặc chín mươi điểm. Gói càng lớn, câu càng khó.'],
  vdRule2: [0, 'Mỗi lượt có một Ngôi sao hy vọng. Đặt sao mà trả lời đúng thì được gấp đôi điểm, chưa đúng sẽ bị trừ điểm câu đó.'],
  vdRule3: [1, 'Nếu bạn đang thi chưa trả lời đúng, ba bạn còn lại được bấm chuông giành quyền.'],
  vdOrder: [0, 'Bạn có ít điểm nhất sẽ đi trước, để có cơ hội đuổi kịp.'],
  vdTurn: [0, 'Mời {ten} bắt đầu phần thi Về đích! Bạn đang có {diem} điểm.', 'Đến lượt {ten}, bạn đang có {diem} điểm.'],
  vdPick: [0, '{ten} chọn gói câu hỏi nào?', 'Gói nào đây, {ten}?'],
  vdPicked: [0, 'Gói {goi} điểm! Ba câu hỏi: {list} điểm.', '{ten} chọn gói {goi} điểm!'],
  vdBig: [0, 'Gói chín mươi điểm! Thật dũng cảm!'],
  starAsk: [1, 'Câu số {so}, {diem} điểm. {ten} có đặt Ngôi sao hy vọng không?', 'Câu {so} trị giá {diem} điểm. Có đặt Ngôi sao hy vọng không nào?'],
  starOn: [0, 'Ngôi sao hy vọng! Đúng được {diemX2} điểm, chưa đúng sẽ bị trừ {diem} điểm.', 'Đặt sao! {ten} rất tự tin.'],
  starOff: [1, 'Không đặt ngôi sao. Mời nghe câu hỏi.', 'Chưa dùng ngôi sao ở câu này.'],
  vdAsk: ['mon', 'Câu số {so}, {diem} điểm.', 'Câu hỏi số {so}, trị giá {diem} điểm.'],
  vdRight: [0, 'Chính xác! {ten} được cộng {diem} điểm.', 'Đúng rồi! Thêm {diem} điểm cho {ten}!'],
  vdRightX2: [0, 'Chính xác! Ngôi sao hy vọng tỏa sáng, {ten} được {diemX2} điểm!'],
  vdWrong: [0, '{ten} chưa đúng rồi, tiếc quá.', 'Câu trả lời của {ten} chưa chính xác.'],
  vdWrongX2: [0, 'Tiếc quá, lần này ngôi sao chưa may mắn. {ten} bị trừ {diem} điểm, nhưng vẫn còn cơ hội!'],
  vdLate: [0, 'Hết giờ, {ten} chưa kịp trả lời.'],
  bellOpen: [0, 'Ba bạn còn lại, ai muốn giành quyền trả lời?', 'Chuông đã mở! Ai giành quyền?'],
  stealRight: [0, 'Chính xác! {ten} giành được {diem} điểm!', 'Giỏi lắm {ten}, {diem} điểm là của bạn!'],
  stealWrong: [0, '{ten} chưa đúng, nhưng không bị trừ điểm. Cảm ơn bạn đã dũng cảm!'],
  vdDone: [1, '{ten} đã hoàn thành phần thi Về đích với {diem} điểm. Cảm ơn bạn!', 'Một phần thi thật hay của {ten}! Bạn có {diem} điểm.'],

  // ---------- Trao giải ----------
  awardOpen: [0, 'Và bây giờ là giây phút trao giải!', 'Đã đến lúc vinh danh rồi!'],
  rank4: [1, 'Vị trí thứ tư thuộc về {ten} với {diem} điểm. Bạn đã thi rất cố gắng!'],
  rank3: [1, 'Vị trí thứ ba là {ten} với {diem} điểm!'],
  rank2: [0, 'Vị trí thứ hai, {ten}, {diem} điểm!'],
  champ: [0, 'Và người chiến thắng của {tenCT} hôm nay là {ten}!', 'Xin chúc mừng nhà vô địch hôm nay, {ten}!'],
  champPts: [1, '{ten} đã giành được {diem} điểm. Cả khán phòng vỗ tay chúc mừng nào!'],
  audBest: [1, 'Khán giả xuất sắc nhất hôm nay là {ten}, với {diem} điểm!'],
  thanks: [1, 'Cảm ơn bốn bạn thí sinh và tất cả các bạn khán phòng. Hôm nay ai cũng học thêm được điều hay!'],
  bye: [0, 'Anh Minh và chị Mai xin chào và hẹn gặp lại các bạn!'],
};

const NUM = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười', 'mười một', 'mười hai'];
const last = {};
/**
 * Một câu của tình huống `key`: { mc: 0 | 1, text } hoặc null. vars.mon: MC của môn (0 Toán, 1 Tiếng Việt); số nhỏ (so, soBan) đọc
 * thành chữ; không lặp câu vừa nói của cùng tình huống.
 */
export function mcLine(key, vars = {}) {
  const s = SCRIPT[key];
  if (!s) return null;
  const [who, ...lines] = s;
  const fill = (t) => {
    let ok = true;
    const out = t.replace(/\{(\w+)\}/g, (_, h) => {
      let v = vars[h];
      if (v == null || v === '') { ok = false; return ''; }
      if ((h === 'so' || h === 'soBan') && Number.isInteger(v) && v <= 12) v = NUM[v];
      return String(v);
    });
    return ok ? out : null;
  };
  const cands = lines.map((t, i) => [i, fill(t)]).filter(([, t]) => t);
  if (!cands.length) return null;
  const fresh = cands.length > 1 ? cands.filter(([i]) => i !== last[key]) : cands;
  const [i, text] = fresh[Math.floor(Math.random() * fresh.length)];
  last[key] = i;
  return { mc: who === 'mon' ? (vars.mon ?? 0) : who, text };
}

/* ---------- Đọc câu hỏi thành lời ----------
   Hình màu và hình quả (câu Tăng tốc) đọc thành tên; dãy hình dài thì MC mời nhìn màn hình thay vì đọc từng hình. */
const EMOJI = {
  '🔴': 'hình tròn đỏ', '🔺': 'tam giác đỏ', '🟦': 'hình vuông xanh', '⭐': 'ngôi sao', '🟢': 'hình tròn xanh lá', '🟨': 'hình vuông vàng',
  '🔷': 'hình thoi xanh', '💜': 'trái tim tím', '🍎': 'quả táo', '🍌': 'quả chuối', '🍇': 'chùm nho', '🍊': 'quả cam', '🍓': 'quả dâu', '🍐': 'quả lê',
};
const EMO_RE = new RegExp(`(${Object.keys(EMOJI).join('|')})`, 'gu');
function sayEmoji(t) {
  return String(t)
    .replace(new RegExp(`(${Object.keys(EMOJI).join('|')})(?:\\1)+`, 'gu'), (m, e) => ` ${[...m.matchAll(EMO_RE)].length} ${EMOJI[e]} `)
    .replace(EMO_RE, (e) => ` ${EMOJI[e]} `)
    .replace(/\s*·\s*/g, ', ').replace(/\s{2,}/g, ' ').trim();
}
/** Tiếng Việt: chỗ trống "…" đọc là "chỗ trống", bỏ phần trong ngoặc ("dấu chấm hỏi (?)"); không đổi dấu như câu toán. */
const sayTv = (t) => String(t).replace(/\s*\([^)]*\)/g, '').replace(/\s*(?:…|\.{3})\s*/g, ' chỗ trống ').replace(/\s{2,}/g, ' ').trim();
/* Toán: dấu hai chấm sau chữ là dấu câu ("dãy: 7, 10" không phải "dãy chia 7"); dãy số bỏ ", …" ở cuối (không đọc "bao nhiêu"). */
const sayMath = (t) => speakLetters(sayEmoji(String(t).replace(/,\s*(?:…|\.{3})/g, '').replace(/(\p{L})\s*:\s*/gu, '$1, ')));
const sayText = (q, t) => (q.m === 'tv' ? sayTv(t) : sayMath(t));
/** Câu hỏi MC đọc. */
export function sayQuestion(q) {
  if (q.say) return q.say;                       // ngân hàng ghi sẵn lời đọc (câu có hình, phép tính viết khác lời nói)
  if (q.tag === 'Dãy hình') return 'Các bạn quan sát dãy hình trên màn hình. Hình tiếp theo là hình nào?';
  return sayText(q, q.q);
}
/** Một phương án MC đọc ("a, 24 xăng-ti-mét"); câu xếp thứ tự đọc thẻ không có chữ cái. */
export function sayOption(q, i) {
  const toks = optTokens(q.o[i]);
  const t = toks ? sayTokens(toks) : sayText(q, q.o[i]);
  return q.kind === 'order' ? t : `${LETTER[i]}, ${t}`;
}
