/**
 * Một lượt chơi "Ai là môn đệ thông thái" do MÁY CHỦ PHÒNG cầm (room.js tạo khi giao ghế nóng, bỏ khi hết lượt).
 *
 * Trước 2026-11-06 máy của người ngồi ghế nóng dẫn chương trình và gửi từng bước cho cả phòng: máy ấy treo, ẩn tab, tải hỏng một
 * tệp hay rớt mạng là cả phòng đứng chờ (tới 3 phút), mỗi máy tự diễn theo lệnh nên hay lệch nhau. Giờ máy chủ giữ toàn bộ trạng
 * thái (câu hỏi, đáp án, đồng hồ, quyền trợ giúp, phiếu bầu, hạt mang về) và tự chuyển bước; mọi máy (cả người chơi) chỉ VẼ theo
 * trạng thái nhận được (src/church/quizShow.js) và gửi lựa chọn của mình.
 *
 * Bước (k) và cách sang bước sau: xem STEP trong src/quiz/rules.js. Bước theo lời MC có [min, max] giây: máy người chơi báo MC đã
 * nói xong (ack) thì sang sớm (không trước min), không ai báo thì tới max tự sang. Bước chờ người (trả lời, bình chọn, người thân)
 * có hạn riêng. Không bước nào chờ mãi.
 *
 *   invite → greet → ask(1) → answer ─ pick → lock → reveal ─ đúng → ask(n+1) … ─ thắng / sai → end
 *                                    ├ hết giờ → timeup → end
 *                                    ├ dừng chơi → quit → end
 *                                    └ trợ giúp: fifty → fiftyScan → answer · audience → vote → voteResult → answer
 *                                                skip → ask(n+1) · friend → phone | friendAsk → friendSaid → answer
 *
 * Đồng hồ trả lời chỉ chạy ở bước answer (dừng khi dùng trợ giúp). Đáp án và lời giải thích chỉ có trong trạng thái gửi đi từ lúc lật.
 */
import { gameFor } from './questions.js';
import { STEP, GREET_FIRST, LIMIT, VOTE, FRIEND_WAIT, PHONE, HELPS, hotKeep, realPoll } from '../src/thanDong/quiz/rules.js';

// bước đã lật đáp án: trạng thái gửi đi mang a và ex
const OPEN = new Set(['reveal', 'timeup', 'skip', 'quit']);
// bước trong lúc đang hỏi (bảng câu hỏi hiện, phase 'ask' ở máy khách)
export const ASKING = new Set(['ask', 'answer', 'fifty', 'fiftyScan', 'audience', 'vote', 'voteResult', 'friend', 'phone', 'friendAsk', 'friendSaid']);
const cleanText = (s, max) => String(s ?? '').replace(/[\u0000-\u001f\u007f-\u009f​-‏‪-‮⁦-⁩]/g, '').trim().slice(0, max);

export class Show {
  /**
   * o = { hot: id người chơi, name, first (lượt đầu của buổi: MC chào khán giả, đọc luật), seen: Set id câu đã hỏi trong phòng,
   * emit(): trạng thái vừa đổi (room gửi pub() cho cả phòng), ask(id, playerName) / unask(id): mời / thôi mời người thân,
   * open(n, q) / close(): mở / đóng nhận câu trả lời của khán giả, score(a): chấm khán giả (a đáp án đúng), done(result): hết lượt,
   * person(id): { name, seat } của một người đang ngồi trong phòng (người thân) hay null, speed (kiểm thử: chạy nhanh hơn),
   * rand, grade (lớp 1–5: bộ câu src/thanDong/quiz/bank), levels (kiểm thử: 15 câu đã xáo) }
   */
  constructor(o) {
    this.o = o;
    this.hot = o.hot;
    this.name = cleanText(o.name, 24);
    this.first = !!o.first;
    this.speed = o.speed > 0 ? o.speed : 1;
    this.rand = o.rand || Math.random;
    this.gid = `${Date.now().toString(36)}${Math.floor(this.rand() * 1679616).toString(36)}`;
    this.game = o.levels ? o.levels : gameFor(o.grade, { seen: o.seen || new Set(), rand: this.rand });   // levels: kiểm thử đưa sẵn 15 câu
    for (const q of this.game) o.seen?.add(q.id);
    this.seq = 0;
    this.k = '';
    this.at = 0;
    this.until = 0;          // hạn của bước (ms, Date.now); 0 = không hạn
    this.timer = null;
    this.n = 0;
    this.passed = 0;
    this.used = [];
    this.result = null;
    this.dead = false;
    this.q0();
  }
  /** Bắt đầu lượt (gọi sau khi người tạo đã giữ đối tượng này: emit đọc lại nó). */
  start() { this.go('invite'); return this; }

  // ---- trạng thái của một câu
  q0() { this.hide = []; this.on = ''; this.poll = null; this.fr = null; this.pick = null; this.cut = []; this.win = false; this.timeout = false; this.skipped = false; this.quit = false; this.votes = null; }
  get q() { return this.game[this.n - 1] || null; }
  ms(sec) { return sec * 1000 / this.speed; }

  /** Sang bước k: hạn theo STEP (hay `max` giây), báo cả phòng. */
  go(k, max = null) {
    if (this.dead) return;
    clearTimeout(this.timer);
    this.timer = null;
    this.seq++;
    this.k = k;
    this.at = Date.now();
    this.acked = false;
    const span = max ?? this.span(k)[1];
    this.until = span ? this.at + this.ms(span) : 0;
    if (span) this.timer = setTimeout(() => this.next(), this.ms(span));
    this.o.emit?.();
  }
  span(k) { return k === 'greet' && this.first ? GREET_FIRST : STEP[k] || [0, 0]; }

  /** Máy người chơi báo MC đã nói xong bước seq: sang bước sau, nhưng không trước min. */
  ack(seq) {
    if (this.dead || seq !== this.seq || this.acked || !STEP[this.k] || this.k === 'fiftyScan' || this.k === 'end') return;
    this.acked = true;
    const wait = this.at + this.ms(this.span(this.k)[0]) - Date.now();
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.next(), Math.max(0, wait));
  }

  /** Bước hiện tại đã xong (hết hạn hay đã báo): sang bước sau. */
  next() {
    if (this.dead) return;
    const k = this.k;
    if (k === 'invite') this.go('greet');
    else if (k === 'greet') this.ask(1);
    else if (k === 'ask') this.answer();
    else if (k === 'answer') { this.clock.left = 0; this.timeout = true; this.o.close?.(); this.o.score?.(this.q.a); this.go('timeup'); }
    else if (k === 'lock') this.reveal();
    else if (k === 'reveal') { if (this.pick === this.q.a && !this.win) this.ask(this.n + 1); else this.end(); }
    else if (k === 'timeup' || k === 'quit') this.end();
    else if (k === 'skip') this.ask(this.n + 1);
    else if (k === 'fifty') {
      const wrong = [0, 1, 2, 3].filter(i => i !== this.q.a && !this.hide.includes(i));
      for (let i = wrong.length - 1; i > 0; i--) { const j = Math.floor(this.rand() * (i + 1)); [wrong[i], wrong[j]] = [wrong[j], wrong[i]]; }
      this.cut = wrong.slice(0, Math.max(0, 2 - this.hide.length));
      this.go('fiftyScan');
    } else if (k === 'fiftyScan') { this.hide = [...this.hide, ...this.cut]; this.cut = []; this.answer(); }
    else if (k === 'audience') { this.votes = { counts: [0, 0, 0, 0], who: new Set() }; this.poll = 'open'; this.go('vote', VOTE + 0.3); }
    else if (k === 'vote') { this.poll = realPoll(this.votes.counts, this.hide); this.votes = null; this.go('voteResult'); }
    else if (k === 'friendAsk') { this.o.unask?.(this.fr.id); this.fr = { ...this.fr, pick: -1 }; this.go('friendSaid'); }
    else if (k === 'voteResult' || k === 'friend' || k === 'phone' || k === 'friendSaid') this.answer();
    else if (k === 'end') this.finish();
  }

  ask(n) {
    this.n = n;
    this.q0();
    this.clock = { total: LIMIT(n), left: this.ms(LIMIT(n)) };
    this.o.open?.(n, this.q);
    this.go('ask');
  }
  /** Bước trả lời: đồng hồ chạy tiếp từ chỗ đã dừng (trợ giúp xong thì chạy lại). */
  answer() {
    this.on = '';
    this.go('answer', this.clock.left / 1000 * this.speed);
  }
  /** Đang ở bước trả lời: dừng đồng hồ (giữ thời gian còn lại) trước khi sang bước khác. */
  pause() { if (this.k === 'answer') this.clock.left = Math.max(0, this.until - Date.now()); }
  reveal() {
    const ok = this.pick === this.q.a;
    if (ok) this.passed = this.n;
    this.win = ok && this.n === 15;
    this.o.score?.(this.q.a);
    this.go('reveal');
  }
  end() {
    const stop = this.quit;
    this.result = { passed: this.passed, keep: hotKeep(this.passed, stop || this.win), stop, win: this.win, name: this.name, id: this.gid };
    this.go('end');
  }
  finish() {
    if (this.dead) return;
    this.dispose();
    this.o.done?.(this.result);
  }
  dispose() { this.dead = true; clearTimeout(this.timer); this.timer = null; if (this.fr?.id && this.k === 'friendAsk') this.o.unask?.(this.fr.id); }

  // ---- việc của người chơi
  choose(i) {
    if (this.k !== 'answer' || !Number.isInteger(i) || i < 0 || i > 3 || this.hide.includes(i)) return;
    this.pause();
    this.pick = i;
    this.o.close?.();
    this.go('lock');
  }
  help(k) {
    if (this.k !== 'answer' || !HELPS.includes(k) || this.used.includes(k) || (k === 'skip' && this.n === 15)) return;
    this.pause();
    this.used = [...this.used, k];
    this.on = k;
    if (k === 'skip') {
      this.skipped = true;
      this.passed = this.n;   // câu bỏ qua tính là đã vượt
      this.o.close?.();
      this.o.score?.(this.q.a);
      this.go('skip');
    } else if (k === 'friend') this.go('friend', 25);
    else this.go(k);
  }
  /** Hỏi người thân: { id } một người trong phòng, hay { phone: tên } gọi điện. */
  friend(c) {
    if (this.k !== 'friend' || !c || typeof c !== 'object') return;
    if (c.phone != null) {
      this.fr = { mode: 'phone', name: cleanText(c.phone, 24) || 'Người thân' };
      this.go('phone', PHONE + 6);   // MC hô "bắt đầu" rồi đếm PHONE giây (máy khách tính từ lúc MC hô xong)
      return;
    }
    const p = Number.isInteger(c.id) && c.id !== this.hot ? this.o.person?.(c.id) : null;
    if (!p) return;
    this.fr = { mode: 'seat', id: c.id, name: cleanText(p.name, 24) || 'Khán giả', seat: p.seat || '', pick: null };
    this.o.ask?.(c.id, this.name);
    this.go('friendAsk', FRIEND_WAIT + 5);
  }
  friendPick(from, i) {
    if (this.k !== 'friendAsk' || from !== this.fr?.id || !Number.isInteger(i) || i < 0 || i > 3) return;
    this.fr = { ...this.fr, pick: i };
    this.go('friendSaid');
  }
  /** Người thân rời phòng giữa chừng. */
  gone(id) { if (this.k === 'friendAsk' && this.fr?.id === id) { this.fr = { ...this.fr, pick: -1 }; this.go('friendSaid'); } }
  vote(from, i) {
    const v = this.votes;
    if (this.k !== 'vote' || !v || from === this.hot || v.who.has(from) || !Number.isInteger(i) || i < 0 || i > 3 || this.hide.includes(i)) return;
    v.who.add(from);
    v.counts[i]++;
  }
  /** Dừng chơi: mang về hạt của câu vừa vượt. Đang hỏi thì cho xem đáp án đúng. */
  stop() {
    if (this.dead) return;
    if (this.k === 'invite' || this.k === 'greet') { this.quit = true; this.end(); return; }
    if (ASKING.has(this.k)) {
      this.pause();
      if (this.k === 'friendAsk') this.o.unask?.(this.fr.id);
      this.quit = true;
      this.o.close?.();
      this.o.score?.(this.q.a);
      this.go('quit');
    } else if (this.k === 'reveal' && this.pick === this.q?.a && !this.win) {
      this.quit = true;
      this.go('quit');
    }
  }
  skipRules() { if (this.k === 'greet') this.next(); }
  /** Người chơi rời phòng: hết lượt ngay (thẻ kết quả vẫn hiện cho khán phòng). */
  abort() {
    if (this.dead || this.k === 'end') return;
    this.pause();
    if (this.k === 'friendAsk') this.o.unask?.(this.fr.id);
    this.o.close?.();
    this.end();
  }

  /** Trạng thái gửi cho máy khách (đáp án chỉ khi đã lật). age / left là ms tính lúc gửi (đồng hồ các máy lệch nhau). */
  pub() {
    const now = Date.now(), q = this.q, open = OPEN.has(this.k) || (this.k === 'end' && this.n > 0);
    const clock = this.clock && ASKING.has(this.k)
      ? { total: this.clock.total, left: Math.max(0, this.k === 'answer' ? this.until - now : this.clock.left), paused: this.k !== 'answer' && this.k !== 'ask' }
      : null;
    return {
      s: this.seq, k: this.k, age: now - this.at, left: this.until ? Math.max(0, this.until - now) : 0, sp: this.speed,
      hot: this.hot, name: this.name, first: this.first ? 1 : 0, gid: this.gid,
      n: this.n, q: q && { q: q.q, o: q.o, cat: q.cat, ...(open ? { a: q.a, ex: q.ex } : {}) },
      hide: this.hide, used: this.used, on: this.on, cut: this.cut, poll: this.poll,
      fr: this.fr && { mode: this.fr.mode, name: this.fr.name, seat: this.fr.seat || '', pick: this.fr.pick ?? null, id: this.fr.id || 0 },
      pick: this.pick, win: this.win, timeout: this.timeout, skipped: this.skipped, quit: this.quit,
      clock, passed: this.passed, result: this.k === 'end' ? this.result : null,
    };
  }
}
