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
  openPlan: [1, 'Hôm nay có ba vòng thi: Khởi động, Tăng tốc và Về đích. Khán phòng cũng trả lời và có điểm riêng. Bắt đầu thôi!'],

  // ---------- Chung cho mọi câu ----------
  // MC của môn đọc thẳng câu của mình, không trao lời / cảm ơn qua lại; điểm khán giả hiện trên đầu, MC không đọc từng câu.
  ask: ['mon', 'Câu số {so}.', 'Câu hỏi số {so}.'],
  kindOrder: ['mon', 'Hãy chạm các thẻ theo đúng thứ tự.', 'Xếp các thẻ cho đúng thứ tự nào!'],
  go: ['mon', 'Thời gian bắt đầu!', 'Các bạn bắt đầu!', 'Mời các bạn trả lời!'],
  goOne: ['mon', 'Mời {ten} trả lời!', '{ten}, thời gian của bạn bắt đầu!'],
  goBell: ['mon', 'Ai biết đáp án thì bấm chuông!', 'Chuông đã mở, bạn nào nhanh tay nhất?'],
  locked: ['mon', '{ten} đã chốt đáp án!', '{ten} đã chọn xong!'],
  lockedFast: ['mon', 'Một câu trả lời rất nhanh của {ten}!', '{ten} trả lời nhanh như chớp!', 'Nhanh quá! {ten} đã chốt đáp án.'],
  allLock: ['mon', 'Cả bốn bạn đã chốt đáp án!', 'Nhanh quá, bốn bạn đều đã chốt!'],
  // thí sinh đã chốt nhưng còn bạn khán giả thật chưa chọn: chưa lật, khán phòng còn vài giây (audLast)
  audLast: ['mon', '{ten} đã chốt đáp án! Khán phòng còn vài giây nữa!', '{ten} đã chọn xong! Các bạn khán phòng nhanh tay lên!'],
  audLastFast: ['mon', 'Nhanh như chớp, {ten} đã chốt! Khán phòng còn vài giây nữa!', '{ten} trả lời rất nhanh! Khán phòng ơi, chọn nhanh lên!'],
  audLastAll: ['mon', 'Cả bốn bạn đã chốt! Khán phòng còn vài giây nữa!', 'Bốn bạn đều đã chọn xong! Khán phòng nhanh tay lên!'],
  timeUp: ['mon', 'Hết giờ!', 'Thời gian đã hết!'],
  answer: ['mon', 'Đáp án đúng là {chu}.', 'Và đáp án đúng là {chu}!'],
  answerShow: ['mon', 'Và đây là thứ tự đúng.', 'Cùng xem thứ tự đúng nào!'],
  bellHit: ['mon', '{ten} bấm chuông nhanh nhất! Mời bạn trả lời.', 'Chuông màu {mau}! Mời {ten}.'],
  noBell: ['mon', 'Không bạn nào bấm chuông.', 'Chưa bạn nào bấm chuông cả.'],
  audTop: [1, 'Ở khán phòng, {ten} đang dẫn đầu với {diem} điểm!', 'Khán phòng ơi, dẫn đầu lúc này là {ten}, {diem} điểm!', 'Những bạn khán giả trả lời đúng đang sáng xanh. {ten} dẫn đầu khán phòng với {diem} điểm!'],
  audNone: [1, 'Ở khán phòng, những bạn trả lời đúng đang sáng xanh!'],
  // sau lời kết quả của thí sinh: nói riêng với khán phòng (người xem trên máy là khán giả, cần nghe kết quả của mình)

  // ---------- Khởi động ----------
  kdIntro: [1, 'Vòng thứ nhất, Khởi động!', 'Chúng ta bước vào vòng Khởi động!'],
  kdRule: [0, 'Mỗi bạn {so} câu riêng, mỗi câu {giay} giây. Đúng được mười điểm!'],
  kdTurn: [0, 'Mời {ten}!', 'Đến lượt {ten}!'],
  soloRight: ['mon', 'Đúng rồi, {chu}! Mười điểm cho {ten}.', 'Chính xác, {chu}! {ten} được mười điểm.'],
  soloWrong: ['mon', 'Chưa đúng, đáp án là {chu}.', 'Tiếc quá, đáp án đúng là {chu}.'],
  soloLate: ['mon', 'Hết giờ! Đáp án là {chu}.'],
  kdCommon: [0, 'Lượt chung! Nghe hết câu rồi bấm chuông. Đúng mười điểm, sai trừ năm điểm.'],
  commonRight: ['mon', 'Đúng rồi, {chu}! {ten} được mười điểm.', 'Chính xác, {chu}! Mười điểm cho {ten}.'],
  commonWrong: ['mon', 'Chưa đúng, đáp án là {chu}. {ten} bị trừ năm điểm.'],
  kdEnd: [0, 'Vòng Khởi động đã khép lại. {ten} đang dẫn đầu với {diem} điểm!', 'Hết vòng Khởi động! Người dẫn đầu lúc này là {ten}, {diem} điểm.'],

  // ---------- Tăng tốc ----------
  ttIntro: [1, 'Vòng thứ hai, Tăng tốc!', 'Chuẩn bị nào, vòng Tăng tốc đã tới!'],
  ttRule: [0, 'Bốn câu tư duy, cả bốn bạn cùng trả lời. Đúng và nhanh nhất được bốn mươi điểm, rồi ba mươi, hai mươi, mười.'],
  ttAsk: ['mon', 'Câu {so}, {loai}!'],
  ttFast: [0, 'Nhanh nhất là {ten}, chỉ {giay} giây! Bốn mươi điểm!', 'Wow, {ten} chỉ cần {giay} giây. Bốn mươi điểm cho {ten}!'],
  ttSome: [0, 'Có {soBan} bạn trả lời đúng. Ai nhanh hơn thì nhiều điểm hơn!'],
  ttNone: ['mon', 'Câu này chưa bạn nào làm đúng. Câu sau cố lên!', 'Câu này khó quá, chưa ai chinh phục được.'],
  ttEnd: [0, 'Kết thúc vòng Tăng tốc! {ten} đang dẫn đầu với {diem} điểm.', 'Tăng tốc đã xong! Người dẫn đầu là {ten}, {diem} điểm.'],

  // ---------- Về đích ----------
  vdIntro: [0, 'Và đây là vòng quyết định, Về đích!', 'Vòng cuối cùng, Về đích!'],
  vdRule: [1, 'Mỗi bạn chọn một gói ba câu: ba mươi, năm mươi, bảy mươi hoặc chín mươi điểm. Ngôi sao hy vọng: đúng gấp đôi, sai bị trừ điểm câu đó.'],
  vdRule2: [0, 'Trả lời chưa đúng thì ba bạn còn lại bấm chuông giành quyền. Bạn ít điểm nhất đi trước!'],
  vdTurn: [0, 'Mời {ten} chọn gói câu hỏi!', '{ten}, bạn chọn gói nào?'],
  vdPicked: [0, 'Gói {goi} điểm!'],
  vdBig: [0, 'Gói chín mươi điểm! Thật dũng cảm!'],
  starAsk: [1, 'Câu {so}, {diem} điểm. Có đặt Ngôi sao hy vọng không?'],
  starOn: [0, 'Đặt sao! Đúng được {diemX2} điểm.', 'Ngôi sao hy vọng! {ten} rất tự tin.'],
  vdAsk: ['mon', 'Câu {so}, {diem} điểm.'],
  vdRight: [0, 'Đúng rồi, {chu}! {ten} được {diem} điểm.', 'Chính xác, {chu}! Thêm {diem} điểm cho {ten}.'],
  vdRightX2: [0, 'Chính xác, {chu}! Ngôi sao tỏa sáng, {ten} được {diemX2} điểm!'],
  vdWrong: [0, '{ten} chưa đúng.', 'Chưa chính xác rồi.'],
  vdWrongX2: [0, 'Tiếc quá, {ten} bị trừ {diem} điểm.'],
  vdLate: [0, 'Hết giờ!'],
  bellOpen: [0, 'Ai giành quyền?', 'Chuông đã mở!'],
  stealRight: [0, 'Đúng rồi, {chu}! {ten} giành được {diem} điểm.'],
  stealWrong: [0, 'Chưa đúng, đáp án là {chu}. {ten} không bị trừ điểm.'],

  // ---------- Trao giải ----------
  awardOpen: [0, 'Và bây giờ là giây phút trao giải!', 'Đã đến lúc vinh danh rồi!'],
  rank4: [1, 'Vị trí thứ tư thuộc về {ten} với {diem} điểm. Bạn đã thi rất cố gắng!'],
  rank3: [1, 'Vị trí thứ ba là {ten} với {diem} điểm!'],
  rank2: [0, 'Vị trí thứ hai, {ten}, {diem} điểm!'],
  champ: [0, 'Và người chiến thắng của {tenCT} hôm nay là {ten}!', 'Xin chúc mừng nhà vô địch hôm nay, {ten}!'],
  champPts: [1, '{ten} đã giành được {diem} điểm. Cả khán phòng vỗ tay chúc mừng nào!'],
  audBest: [1, 'Khán giả xuất sắc nhất hôm nay là {ten}, với {diem} điểm!'],
  bye: [0, 'Cảm ơn tất cả các bạn! Anh Minh và chị Mai hẹn gặp lại!'],
};

const NUM = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười', 'mười một', 'mười hai'];
const last = {}, planned = {};
/* Giọng Azure ghép mảnh (dauTruong/mcVoice.js): câu có tên người chơi tách tại {ten} thành phần cố định + tên, mỗi mảnh một mp3
   trên R2. Tên chỉ tạo một lần cho mỗi giọng, phần cố định dùng chung cho mọi người chơi. Chỗ trống khác (điểm, số câu, chữ cái…)
   có hữu hạn giá trị nên vẫn nằm trong câu (đọc liền, ngữ điệu tự nhiên). Dấu câu đứng ngay sau tên ("{ten}, …") bỏ đi: chỗ nối
   hai mảnh đã là một nhịp ngắt. */
const SPLIT = 'ten';
function partsOf(tpl, val) {
  const out = [];
  tpl.split(/(\{\w+\})/).forEach((seg) => {
    const h = /^\{(\w+)\}$/.exec(seg)?.[1];
    if (h === SPLIT) { out.push({ name: true, t: val(h) }); return; }
    const t = h ? val(h) : seg;
    const prev = out[out.length - 1];
    if (prev && !prev.name) prev.t += t; else out.push({ name: false, t });
  });
  return out.map(p => (p.name ? p.t : p.t.replace(/^[\s,.;:!?]+/, '')).trim()).filter(t => /[\p{L}\p{N}]/u.test(t));
}
/**
 * Một câu của tình huống `key`: { mc: 0 | 1, text, parts } hoặc null. parts: các mảnh đọc nối nhau (câu không có tên: một mảnh).
 * vars.mon: MC của môn (0 Toán, 1 Tiếng Việt); số nhỏ (so, soBan) đọc thành chữ; không lặp câu vừa nói của cùng tình huống.
 * Câu đã chọn sẵn bằng mcPlan (để tải trước) thì dùng đúng câu ấy.
 */
export function mcLine(key, vars = {}) {
  const s = SCRIPT[key];
  if (!s) return null;
  const [who, ...lines] = s;
  const val = (h) => {
    let v = vars[h];
    if (v == null || v === '') return null;
    if ((h === 'so' || h === 'soBan') && Number.isInteger(v) && v <= 12) v = NUM[v];
    return String(v);
  };
  const fill = (t) => {
    let ok = true;
    const out = t.replace(/\{(\w+)\}/g, (_, h) => { const v = val(h); if (v == null) ok = false; return v ?? ''; });
    return ok ? out : null;
  };
  const cands = lines.map((t, i) => [i, fill(t)]).filter(([, t]) => t);
  if (!cands.length) return null;
  const fresh = cands.length > 1 ? cands.filter(([i]) => i !== last[key]) : cands;
  const want = planned[key];
  delete planned[key];
  const [i, text] = cands.find(([k]) => k === want) || fresh[Math.floor(Math.random() * fresh.length)];
  last[key] = i;
  return { mc: who === 'mon' ? (vars.mon ?? 0) : who, text, parts: partsOf(lines[i], val) };
}
/** Chọn sẵn câu của tình huống `key` (lần mcLine(key) kế tiếp nói đúng câu này) và trả về để tải trước giọng. */
export function mcPlan(key, vars = {}) {
  const prev = last[key];
  const ln = mcLine(key, vars);
  if (!ln) return null;
  planned[key] = last[key];
  last[key] = prev;
  return ln;
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
