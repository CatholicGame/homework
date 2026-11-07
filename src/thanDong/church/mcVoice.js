/**
 * Giọng MC "Ai là môn đệ thông thái": đọc kịch bản src/quiz/mc.js (SCRIPT, mcLine) bằng giọng Azure MC_VOICE = NamMinh
 * (engine/voice.js vai 'mc'), luôn tiếng Việt. Câu cố định lấy mp3 trên R2; câu có tên người chơi / người thân / phần trăm
 * (live) đọc thẳng từ Azure, không lưu R2.
 * MC luôn giọng nam: Azure tắt / hết hạn mức thì voice.js đọc bằng giọng nam của máy (An, NamMinh), máy không có thì MC im
 * (đố vui chạy theo giờ); một câu Azure từ chối thì chỉ bỏ câu đó. Tắt tiếng chung của app thì im.
 * `ten` (tên người chơi, họ tên đầy đủ cũng được: MC gọi chữ cuối) đặt bằng mc.player(name).
 *
 * Lời dẫn đi theo trạng thái của chương trình (người gọi: quizDev):
 *   - hành động theo lời MC xảy ra SAU lời ấy: hàm nhận { onEnd } (đọc xong, hoặc ngay khi MC im) để người gọi lúc ấy mới cho
 *     người chơi đứng dậy, khán giả vỗ tay, bỏ hai phương án, mở bình chọn, bắt đầu đếm giờ…;
 *   - câu dẫn một việc có thể đã xảy ra trong lúc câu còn chờ trong hàng nhận { when }: tới lượt mà when() false thì MC bỏ câu ấy
 *     (người chơi đã ngồi ghế nóng thì không còn "xin mời lên ghế nóng").
 * onEnd không gọi khi lời bị cắt ngang (câu mới cut()); người gọi giữ hẹn giờ dự phòng (cue trong quizDev).
 */
import { say, stopSpeaking, canSpeakMC } from '../engine/voice.js';
import { speakable } from '../engine/speech.js';
import { mcLine, speakEx, speakLetters } from '../quiz/mc.js';
import { seeded } from '../quiz/rules.js';

let ten = '';
// chọn câu nói trong các câu của một tình huống: trực tuyến mọi máy cùng hạt giống (số bước của chương trình) nên nói cùng một câu
let rand = Math.random;
// máy dẫn chương trình (quizOnline.js): mỗi câu MC bắt đầu đọc ở máy này thì báo ra để máy khán giả đọc đúng câu ấy ngay lúc ấy
// (không tự chạy kịch bản và hàng đợi riêng: một câu tải chậm từng làm cả chuỗi sau trễ 5–10 giây so với bảng câu hỏi)
let tap = null;
/** Máy khán giả: câu MC tới mà quá STALE ms chưa đọc được (tải chậm, câu trước còn dài) thì bỏ, không đọc trễ. */
const STALE = 2500;
// câu hỏi và phương án đọc nhanh hơn lời dẫn một chút (mp3 cũ trên R2 phát nhanh hơn, giữ cao độ: không phải tạo lại)
const FAST = 1.15;
/**
 * Đọc một câu (nối hàng). o = { onStart, onEnd, when }. MC im (tắt tiếng, máy không đọc được): không đọc gì, onEnd gọi ngay
 * (onStart thì không: người gọi tự hẹn giờ phương án).
 */
const read = (text, o = {}, live = false) => {
  if (!text) { if (o.onEnd) setTimeout(o.onEnd, 0); return; }
  // máy dẫn im (tắt tiếng, không đọc được): vẫn báo câu ra lúc xếp hàng, máy khán giả tự nối hàng
  if (!canSpeakMC()) { tap?.(text, o.rate || 1, live, true); if (o.onEnd) setTimeout(o.onEnd, 0); return; }
  const onStart = tap ? () => { tap?.(text, o.rate || 1, live, false); o.onStart?.(); } : o.onStart;
  say(speakLetters(speakable(text)).trim(), { queue: true, role: 'mc', lang: 'vi', rate: o.rate || 1, onStart, onEnd: o.onEnd, when: o.when, live });
};
/** Một câu của tình huống `key` trong kịch bản (vars thêm tên người chơi). */
const line = (key, vars = {}, o = {}) => {   // o.rate: tốc độ đọc (mặc định 1)
  const l = mcLine(key, { ten, ...vars }, rand);
  if (l) read(l.text, o, l.live);
  else { o.onStart?.(); if (o.onEnd) setTimeout(o.onEnd, 0); }
};
const cut = () => stopSpeaking();
/** Hạt mang về khi sai / hết giờ: passed câu đã vượt, keep số hạt (src/engine/seeds.js hotKeep). */
const keepLine = (passed, keep) => {
  if (keep == null) return;
  if (!keep) line('keepZero');
  else if (passed >= 10) line('keepCheque', { soHat: keep, so: passed });
  else line('keep', { soHat: keep });
};

export const mc = {
  /** MC có đọc thành tiếng không (tắt tiếng / máy không đọc được thì không: người gọi tự hẹn giờ). */
  get live() { return canSpeakMC(); },
  /** Tên người chơi đang ngồi ghế nóng ('' = chưa biết: MC chỉ dùng các câu không gọi tên). */
  player(name) { ten = name || ''; },
  /** Trực tuyến: các câu nói từ giờ chọn theo hạt giống n (số bước máy chủ gửi), null = ngẫu nhiên như thường. */
  seed(n) { rand = n == null ? Math.random : seeded(n * 7919 + 17); },
  /** Mở màn: chào khán giả. */
  welcome() { cut(); line('welcome'); },
  /**
   * Mời người chơi lên ghế nóng rồi xin tràng pháo tay. go: mời xong (người chơi đứng dậy đi lên), clap: xin vỗ tay xong
   * (khán giả vỗ), when: người chơi chưa ngồi ghế nóng (đã ngồi thì bỏ cả hai câu).
   */
  invite({ go, clap, when } = {}) { line('invite', {}, { onEnd: go, when }); line('applause', {}, { onEnd: clap, when }); },
  /** Người chơi kế tiếp vào ghế chờ: go khi mời xong; when: còn người chưa tới ghế chờ. */
  nextReady({ go, when } = {}) { line('nextReady', {}, { onEnd: go, when }); },
  /** Người chơi đã ngồi ghế nóng: chào, luật và bốn quyền trợ giúp (chỉ người đầu tiên), bắt đầu. */
  greet(first) { line('meet'); if (first) { line('rules'); line('rulesSeeds'); } line('start'); },
  /**
   * Vào câu: số câu (câu 5, 10, 15 có lời riêng), câu hỏi, rồi từng chữ cái và phương án (bỏ phương án đã bị loại), lời mời chọn.
   * onOption(i): MC bắt đầu đọc chữ cái của phương án i (để phương án bật ra đúng lúc đó). when: vẫn đang hỏi câu này.
   */
  ask(q, n, onOption, when) {
    cut();
    line(n === 15 ? 'final' : n === 10 ? 'milestone10' : n === 5 ? 'milestone5' : 'intro', { so: n });
    read(q.q, { rate: FAST });
    q.o.forEach((o, i) => { if (!q.hide?.includes(i)) { line('letter', { chu: i }, { onStart: () => onOption?.(i), rate: FAST }); read(o, { rate: FAST }); } });
    line('prompt', {}, { when });
  },
  /** Người chơi im lặng lâu: nhắc chọn; helps = số quyền còn lại (lần đầu thì nhắc kèm), when: vẫn đang chờ chọn. */
  nudge(helps, first, when) {
    line('nudge', {}, { when });
    if (first) line(helps ? 'nudgeHelp' : 'nudgeNoHelp', { con: helps }, { when });
  },
  /** Đồng hồ còn mười giây. */
  tenLeft(when) { line('tenLeft', {}, { when }); },
  /** Hết giờ: nói đáp án đúng, lời giải thích, hạt mang về (passed, keep), chào tạm biệt. */
  timeUp(q, passed, keep) { cut(); line('timeUp', { chu: q.a }); read(speakEx(q.ex)); keepLine(passed, keep); line('bye'); },
  /** Chốt đáp án i, rồi lời hồi hộp. */
  pick(i) { cut(); line('pick', { chu: i }); line('lock'); },
  /** Lật đáp án: kết quả, lời giải thích, rồi mốc an toàn (câu n = 5 / 10) hay hạt mang về (sai: passed, keep; thắng). */
  reveal(q, pick, win, n = 0, passed = 0, keep = null) {
    cut();
    const ok = pick == null || pick === q.a;
    line(win ? 'win' : ok ? 'right' : 'wrong', { chu: q.a });
    read(speakEx(q.ex));
    if (win) line('winSeeds');
    else if (ok && n === 5) line('safe5');
    else if (ok && n === 10) line('safe10');
    else if (!ok) keepLine(passed, keep);
    if (win || !ok) line('bye');
  },
  /** Người chơi tự dừng (đã vượt passed câu, mang về keep hạt), rồi cho biết đáp án đúng của câu đang hỏi (a, null nếu không có câu). */
  quit(passed, keep, a = null) {
    cut();
    if (!keep) line('quitZero');
    else if (passed === 14) line('quitFinal', { soHat: keep });
    else if (passed >= 10) line('quitCheque', { soHat: keep, so: passed });
    else line('quit', { soHat: keep });
    if (a != null) line('quitAnswer', { chu: a });
  },
  /** 50:50: MC nói câu dẫn, xong thì onCut (màn quét, bỏ hai phương án); fiftyLeft(kept) đọc hai phương án còn lại (chỉ số 0..3). */
  fifty(onCut) { cut(); line('fifty', {}, { onEnd: onCut }); },
  fiftyLeft(kept) { const [a, b] = [...kept].sort(); line('fiftyLeft', { chu: a, chu2: b }); },
  /** Hỏi khán giả: mời bình chọn (open: mời xong, mở bình chọn); audienceResult(pct) khi có kết quả (pct: phần trăm bốn phương án). */
  audience(open) { cut(); line('audience', {}, { onEnd: open }); },
  audienceResult(pct) {
    cut();
    line('audienceDone');
    const top = pct.indexOf(Math.max(...pct));
    line('audienceTop', { chu: top, phanTram: pct[top] });
  },
  /** Bỏ qua câu hỏi: MC nói đáp án đúng (a) để người chơi biết thêm, rồi mời sang câu tiếp theo. */
  skip(a) { cut(); line('skip'); line('skipAnswer', { chu: a }); line('skipNext'); },
  /** Hỏi người thân: gọi điện (phoneStart: start khi MC hô "bắt đầu" xong / phoneEnd) hoặc người thân dưới khán phòng. */
  relative() { cut(); line('relative'); },
  phoneStart(start) { line('phoneStart', {}, { onEnd: start }); },
  phoneEnd() { cut(); line('phoneEnd'); },
  relativeSeat(name, asked) { line('relativeSeat', { nguoiThan: name }, { onEnd: asked }); },
  relativeAnswer(name, i) { cut(); line('relativeAnswer', { nguoiThan: name, chu: i }); },
  /** Số quyền trợ giúp còn lại (0..4). */
  helpsLeft(k) { line(k ? 'helpsLeft' : 'helpsNone', { con: k }); },
  /** Chờ đủ người: còn thiếu k người (đọc trực tiếp). */
  waitMore(k) { line('waitMore', { conThieu: k }); },
  stop: stopSpeaking,
  /** Máy dẫn: fn(text, rate, live, queue) gọi khi mỗi câu bắt đầu đọc (null: thôi). */
  tap(fn) { tap = fn || null; },
  /**
   * Máy khán giả đọc một câu máy dẫn vừa bắt đầu: cắt câu đang đọc (câu cũ đã qua ở máy dẫn) rồi đọc ngay; quá STALE ms chưa
   * đọc được thì bỏ. queue (máy dẫn im): nối hàng như cũ, chỉ bỏ câu đã chờ quá lâu.
   */
  echo(text, rate = 1, live = false, queue = false) {
    if (typeof text !== 'string' || !text || !canSpeakMC()) return;
    if (!queue) cut();
    const born = Date.now(), max = queue ? 15000 : STALE;
    say(speakLetters(speakable(text)).trim(), { queue: true, role: 'mc', lang: 'vi', rate: +rate || 1, live: !!live, when: () => Date.now() - born < max });
  },
};
