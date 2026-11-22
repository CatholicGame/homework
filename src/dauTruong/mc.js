/**
 * Lời hai MC của 🏆 Đấu Trường Nhí: anh Minh (mc 0, vest) và chị Mai (mc 1, áo dài). Lời gốc ở docs/dau-truong/kich-ban-mc.md,
 * sửa theo luật vòng thi mới (thiet-ke.md mục 5: Khởi động 6 câu chung, Tăng tốc 4 câu tư duy, Về đích gói + Ngôi sao hy vọng).
 *
 * SCRIPT[key] = [người nói, ...các câu]; người nói: 0 anh Minh, 1 chị Mai, 'mon' = MC của môn câu đang hỏi (Toán 0, Tiếng Việt 1).
 * Chỗ trống {ten} {diem}… điền từ vars; câu thiếu biến thì bỏ, chọn câu khác. Nguyên tắc lời: ngắn khi đang thi, không chê,
 * không "nhé", không gạch ngang dài, kết bằng . hoặc !; MC im khi các bạn đang nghĩ.
 */
import { speakLetters } from '../thanDong/quiz/mc.js';
import { optTokens, sayTokens } from './figs.js';
import { isEnArena } from './subject.js';

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
  kdRule: [0, '{so} câu hỏi, cả bốn bạn cùng trả lời, mỗi câu {giay} giây. Bạn nào đúng cũng được mười điểm!', 'Có {so} câu, bốn bạn cùng trả lời từng câu trong {giay} giây. Ai đúng được mười điểm!'],
  // câu chung Khởi động (seg 'all'): lời gộp đáp án + kết quả
  allRight: ['mon', 'Đáp án là {chu}! Cả bốn bạn đều đúng, mỗi bạn mười điểm!', 'Đúng là {chu}! Bốn bạn cùng được mười điểm.'],
  allSome: ['mon', 'Đáp án là {chu}! Có {soBan} bạn trả lời đúng, mỗi bạn mười điểm.', 'Đúng là {chu}! {soBan} bạn được mười điểm.'],
  allOne: ['mon', 'Đáp án là {chu}! Chỉ có {ten} trả lời đúng, mười điểm cho {ten}!', 'Đúng là {chu}! Mười điểm cho {ten}, bạn duy nhất trả lời đúng.'],
  allNone: ['mon', 'Đáp án đúng là {chu}. Câu này chưa bạn nào trả lời đúng.', 'Tiếc quá, đáp án là {chu}. Câu sau cố lên!'],
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
  ttRule: [0, 'Bốn câu tư duy, cả bốn bạn cùng trả lời. Bạn nào đúng cũng được hai mươi điểm!'],
  ttAsk: ['mon', 'Câu {so}, {loai}!'],
  ttAll: [0, 'Cả bốn bạn đều đúng! Mỗi bạn hai mươi điểm!', 'Tuyệt vời, bốn bạn cùng được hai mươi điểm!'],
  ttSome: [0, 'Có {soBan} bạn trả lời đúng, mỗi bạn hai mươi điểm!', '{soBan} bạn làm đúng, hai mươi điểm cho mỗi bạn!'],
  ttOne: [0, 'Chỉ có {ten} làm đúng! Hai mươi điểm cho {ten}.', '{ten} là bạn duy nhất làm đúng, được hai mươi điểm!'],
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

/* Đấu Trường Nhí Tiếng Anh (subject.js 'en'): MC nói TIẾNG ANH mọi lời (người dùng 2026-11-22), giọng Anh của MC
   (subject.js EN_VOICE: anh Minh Andrew, chị Mai Emma); tên bạn chơi {ten} đọc bằng giọng Việt của MC (mảnh riêng, mcLine).
   Anh Minh: Nghe + Từ vựng, chị Mai: Ngữ pháp + Đọc hiểu (subject.js EN_SKILL_MC). Không dùng {tenCT} (tên tiếng Việt). */
const SCRIPT_EN = {
  // ---------- Mở màn ----------
  openHi: [0, 'Hello, everyone in grade {lop}! Welcome to our English quiz show!', 'Hello, everybody! Welcome, grade {lop}, to our English quiz show!'],
  openMe0: [0, 'I\'m Minh. Today I\'ll bring you listening and vocabulary questions.', 'My name is Minh, and the listening and vocabulary questions are waiting for you!'],
  openMe1: [1, 'And I\'m Mai. I\'ll bring you grammar and reading questions.', 'And I\'m Mai. Grammar and reading will be so much fun today!'],
  openPlan: [1, 'There are three rounds today: Warm-up, Speed-up and Finish line. The audience answers too and gets points. Let\'s start!'],

  // ---------- Chung cho mọi câu ----------
  ask: ['mon', 'Question {so}.', 'Here is question {so}.'],
  kindOrder: ['mon', 'Tap the cards in the right order.', 'Put the cards in the right order!'],
  go: ['mon', 'Time starts now!', 'Go!', 'Please answer now!'],
  goOne: ['mon', '{ten}, please answer!', '{ten}, your time starts now!'],
  goBell: ['mon', 'If you know the answer, ring the bell!', 'The bell is open. Who is the fastest?'],
  locked: ['mon', '{ten} has locked in an answer!', '{ten} has chosen!'],
  lockedFast: ['mon', 'A very fast answer from {ten}!', '{ten} answers as fast as lightning!', 'So fast! {ten} has locked in.'],
  allLock: ['mon', 'All four players have locked in!', 'Wow, all four have answered!'],
  audLast: ['mon', '{ten} has locked in! Audience, a few seconds left!', '{ten} has chosen! Audience, hurry up!'],
  audLastFast: ['mon', 'Lightning fast, {ten} has locked in! Audience, a few seconds left!', '{ten} was very quick! Audience, choose fast!'],
  audLastAll: ['mon', 'All four have locked in! Audience, a few seconds left!', 'All four players are done! Audience, hurry up!'],
  timeUp: ['mon', 'Time\'s up!', 'Time is over!'],
  answer: ['mon', 'The correct answer is {chu}.', 'And the correct answer is {chu}!'],
  answerShow: ['mon', 'And here is the right order.', 'Let\'s see the right order!'],
  bellHit: ['mon', '{ten} rang the bell first! Please answer.', 'The {mau} bell! Go ahead, {ten}.'],
  noBell: ['mon', 'Nobody rang the bell.', 'No one rang the bell.'],
  audTop: [1, 'In the audience, {ten} is leading with {diem} points!', 'Audience, the leader right now is {ten}, with {diem} points!', 'Audience members with the right answer are glowing green. {ten} leads the audience with {diem} points!'],
  audNone: [1, 'In the audience, everyone with the right answer is glowing green!'],

  // ---------- Khởi động ----------
  kdIntro: [1, 'Round one, Warm-up!', 'Let\'s begin the Warm-up round!'],
  kdRule: [0, '{so} questions, all four players answer, {giay} seconds each. Every right answer gets ten points!', 'There are {so} questions. All four players answer each one in {giay} seconds. A right answer gets ten points!'],
  allRight: ['mon', 'The answer is {chu}! All four are right, ten points each!', 'It\'s {chu}! All four players get ten points.'],
  allSome: ['mon', 'The answer is {chu}! {soBan} players got it right, ten points each.', 'It\'s {chu}! {soBan} players get ten points.'],
  allOne: ['mon', 'The answer is {chu}! Only {ten} got it right. Ten points for {ten}!', 'It\'s {chu}! Ten points for {ten}, the only right answer.'],
  allNone: ['mon', 'The correct answer is {chu}. Nobody got this one.', 'Oh, the answer is {chu}. Good luck on the next one!'],
  kdTurn: [0, '{ten}, it\'s your turn!', 'Now it\'s your turn, {ten}!'],
  soloRight: ['mon', 'Correct, {chu}! Ten points for {ten}.', 'That\'s right, {chu}! {ten} gets ten points.'],
  soloWrong: ['mon', 'Not quite, the answer is {chu}.', 'Oh, the correct answer is {chu}.'],
  soloLate: ['mon', 'Time\'s up! The answer is {chu}.'],
  kdCommon: [0, 'Open round! Listen to the whole question, then ring the bell. Right is ten points, wrong is minus five.'],
  commonRight: ['mon', 'Correct, {chu}! {ten} gets ten points.', 'That\'s right, {chu}! Ten points for {ten}.'],
  commonWrong: ['mon', 'Not quite, the answer is {chu}. {ten} loses five points.'],
  kdEnd: [0, 'The Warm-up round is over. {ten} is leading with {diem} points!', 'That\'s the end of Warm-up! The leader is {ten}, with {diem} points.'],

  // ---------- Tăng tốc ----------
  ttIntro: [1, 'Round two, Speed-up!', 'Get ready, it\'s time for Speed-up!'],
  ttRule: [0, 'Four English challenges, all four players answer. Every right answer gets twenty points!'],
  ttAsk: ['mon', 'Question {so}, {loai}!'],
  ttAll: [0, 'All four are right! Twenty points each!', 'Amazing, all four players get twenty points!'],
  ttSome: [0, '{soBan} players got it right, twenty points each!', '{soBan} players are right, twenty points for each!'],
  ttOne: [0, 'Only {ten} got it right! Twenty points for {ten}.', '{ten} is the only one who got it, twenty points!'],
  ttNone: ['mon', 'Nobody got this one. Good luck on the next one!', 'That was a tough one. Nobody got it.'],
  ttEnd: [0, 'Speed-up is over! {ten} is leading with {diem} points.', 'That\'s the end of Speed-up! The leader is {ten}, with {diem} points.'],

  // ---------- Về đích ----------
  vdIntro: [0, 'And now the final round, Finish line!', 'The last round, Finish line!'],
  vdRule: [1, 'Each player chooses a pack of three questions: thirty, fifty, seventy or ninety points. With the star of hope, a right answer is double, a wrong answer loses those points.'],
  vdRule2: [0, 'If the answer is wrong, the other three can ring the bell to steal. The player with the fewest points goes first!'],
  vdTurn: [0, '{ten}, please choose your pack!', '{ten}, which pack do you want?'],
  vdPicked: [0, 'The {goi} point pack!'],
  vdBig: [0, 'The ninety point pack! So brave!'],
  starAsk: [1, 'Question {so}, {diem} points. Do you want the star of hope?'],
  starOn: [0, 'Star on! A right answer gets {diemX2} points.', 'The star of hope! {ten} is very confident.'],
  vdAsk: ['mon', 'Question {so}, {diem} points.'],
  vdRight: [0, 'Correct, {chu}! {ten} gets {diem} points.', 'That\'s right, {chu}! {diem} more points for {ten}.'],
  vdRightX2: [0, 'Correct, {chu}! The star shines, {ten} gets {diemX2} points!'],
  vdWrong: [0, '{ten}, not quite.', 'Not quite right.'],
  vdWrongX2: [0, 'Oh no, {ten} loses {diem} points.'],
  vdLate: [0, 'Time\'s up!'],
  bellOpen: [0, 'Who wants to steal?', 'The bell is open!'],
  stealRight: [0, 'Correct, {chu}! {ten} steals {diem} points.'],
  stealWrong: [0, 'Not quite, the answer is {chu}. {ten} doesn\'t lose any points.'],

  // ---------- Trao giải ----------
  awardOpen: [0, 'And now, it\'s award time!', 'It\'s time to celebrate our winners!'],
  rank4: [1, 'Fourth place goes to {ten}, with {diem} points. You tried really hard!'],
  rank3: [1, 'Third place is {ten}, with {diem} points!'],
  rank2: [0, 'Second place, {ten}, {diem} points!'],
  champ: [0, 'And today\'s winner is {ten}!', 'Congratulations to today\'s champion, {ten}!'],
  champPts: [1, '{ten} won {diem} points. Everyone, let\'s give a big hand!'],
  audBest: [1, 'The best audience member today is {ten}, with {diem} points!'],
  bye: [0, 'Thank you, everyone! See you next time from Minh and Mai!'],
};
/* Lời tiếng Anh: chỗ trống điền giá trị tiếng Anh (chữ cái đáp án, màu chuông, tên phần Tăng tốc). */
const EN_VAL = {
  chu: (v) => ('ABCD'[LETTER.indexOf(v)] || v),
  mau: (v) => ({ 'đỏ': 'red', 'cam': 'orange', 'xanh lá': 'green', 'xanh dương': 'blue' }[v] || v),
  loai: (v) => ({ 'nghe nhanh': 'quick listening', 'sắp xếp': 'word order', 'đọc nhanh': 'quick reading', 'đố từ': 'word puzzle' }[v] || v),
};
/** Giọng Anh Azure của MC (subject.js EN_VOICE). */
const EN_KEY = ['enAndrew', 'enEmma'];
/**
 * Lời MC tiếng Anh có đoạn tiếng Việt trong «…» (câu dịch nghĩa: "How do you say «thư viện» in English?"):
 * trả { text (bỏ «»), parts }: mảnh tiếng Anh đọc giọng Anh (voice của lần đọc), mảnh «…» đọc giọng Việt của MC `mc`.
 */
export function enSayParts(t, mc = 0) {
  const parts = [];
  String(t).split(/«([^»]*)»/).forEach((seg, k) => {
    const x = seg.trim();
    if (!/[\p{L}\p{N}]/u.test(x)) return;
    parts.push(k % 2 ? { t: x, v: mc } : x);
  });
  return { text: String(t).replace(/[«»]/g, ''), parts };
}

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
  const en = isEnArena() && !!SCRIPT_EN[key];
  const s = en ? SCRIPT_EN[key] : SCRIPT[key];
  if (!s) return null;
  const [who, ...lines] = s;
  const val = (h) => {
    let v = vars[h];
    if (v == null || v === '') return null;
    if (en) return String(EN_VAL[h] ? EN_VAL[h](String(v)) : v);   // tiếng Anh: số để nguyên chữ số (giọng Anh tự đọc)
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
  // câu mở đầu bằng số đọc thành chữ ("{so} câu hỏi…" → "sáu câu hỏi…"): viết hoa chữ đầu câu
  const up = (t) => t.replace(/^\p{Ll}/u, c => c.toUpperCase());
  const parts = partsOf(lines[i], val);
  if (parts.length) parts[0] = up(parts[0]);
  const mc = who === 'mon' ? (vars.mon ?? 0) : who;
  if (!en) return { mc, text: up(text), parts };
  // tiếng Anh: cả câu giọng Anh của MC, riêng mảnh tên bạn chơi đọc giọng Việt của MC ấy (tên tiếng Việt)
  const name = lines[i].includes('{ten}') && vars.ten ? String(vars.ten).trim() : null;
  return { mc, text: up(text), voice: EN_KEY[mc] || EN_KEY[0], parts: parts.map(t => (t === name ? { t, v: mc } : t)) };
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
/** Câu tiếng Anh: lời MC đọc đề bằng tiếng Anh (giọng Anh của MC); không có (câu dịch nghĩa sang tiếng Việt) thì null, đọc `say`. */
export const sayQuestionEn = (q) => (q?.m === 'en' && q.sayEn) || null;
/** Câu tiếng Anh có sayEn: còn phải đọc riêng `en` không (câu nghe luôn đọc; câu khác chỉ khi sayEn chưa chứa câu ấy). */
export function needEnAfter(q) {
  if (!(q?.m === 'en' && q.en)) return false;
  if (q.hide || !q.sayEn) return true;
  const n = (t) => String(t).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  return !n(q.sayEn).includes(n(q.en));
}
export function sayQuestion(q) {
  if (q.say) return q.say;                       // câu tiếng Anh: lời hướng dẫn tiếng Việt (phần tiếng Anh: q.en, giọng Anh)                       // ngân hàng ghi sẵn lời đọc (câu có hình, phép tính viết khác lời nói)
  if (q.tag === 'Dãy hình') return 'Các bạn quan sát dãy hình trên màn hình. Hình tiếp theo là hình nào?';
  return sayText(q, q.q);
}
/** Một phương án MC đọc ("a, 24 xăng-ti-mét"); câu xếp thứ tự đọc thẻ không có chữ cái. */
export function sayOption(q, i) {
  if (q.m === 'en') {
    // câu tiếng Anh: phương án hình (emoji) không đọc; phương án tiếng Anh giọng Anh đọc "A. cat" (optEn); tiếng Việt như cũ
    const o = String(q.o[i]);
    if (!/\p{L}/u.test(o)) return '';
    if (optEn(q, i)) return q.kind === 'order' ? o : `${'ABCD'[i]}. ${o}`;
    return q.kind === 'order' ? o : `${LETTER[i]}, ${o}`;
  }
  const toks = optTokens(q.o[i]);
  const t = toks ? sayTokens(toks) : sayText(q, q.o[i]);
  return q.kind === 'order' ? t : `${LETTER[i]}, ${t}`;
}

const VI_CHARS = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
/** Phương án i của câu tiếng Anh là chữ tiếng Anh (đọc bằng giọng Anh) chứ không phải nghĩa tiếng Việt / hình. */
export function optEn(q, i) {
  const o = String(q?.o?.[i] ?? '');
  return q?.m === 'en' && /\p{L}/u.test(o) && !VI_CHARS.test(o);
}
