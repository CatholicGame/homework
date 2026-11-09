/**
 * Một phòng của Gặp gỡ online (nhà thờ Sài Gòn, từng khu Vatican, trường quay): giữ danh sách người trong phòng, chuyển
 * tiếp vị trí / hướng / tư thế, giữ ghế (ai xin trước được trước). Không phụ thuộc nền tảng: dev.mjs (Node + ws) và
 * worker.js (Cloudflare Durable Object) chỉ đưa vào mỗi kết nối một `sock` có send(text) / close(code, reason).
 *
 * Giao thức: mỗi tin là một mảng JSON, phần tử đầu là loại tin.
 * client → server
 *   ['hi', { x, y, z, h, a, k, c, w, seat, n, u, r }]  vào phòng với trạng thái hiện tại (tin đầu tiên, bắt buộc); n tên gọi
 *                                              ngắn hiện trên đầu (máy chủ làm sạch, cắt NAME_MAX ký tự; '' = không tên);
 *                                              u mã tài khoản đã băm (hai máy cùng tài khoản chỉ tính một người thật);
 *                                              r mã phiên ngẫu nhiên của trang: nối lại cùng r thì kết nối cũ bị bỏ
 *                                              (khoá phòng kết thúc bằng -test: phòng thử nội bộ, ván không chờ đủ người)
 *   ['p']                                      nhịp còn sống (mỗi 20 s); đã gửi nhịp mà im quá SILENT_MS thì bị ngắt
 *   ['s', x, y, z, h, a, k]                    trạng thái mới: x y z cm, h centi-radian, a số thứ tự clip (ANIMS),
 *                                              k bộ đếm dịch chuyển tức thời (đổi thì bên kia đặt thẳng, không lướt tới)
 *   ['look', c, w, o]                          màu áo (0..LOOKS-1), đeo cánh (0 / 1), o bộ đồ Tủ đồ (src/church/wardrobe.js
 *                                              encodeLook: 'k:v,…', máy chủ chỉ kiểm ký tự và độ dài: lookOk)
 *   ['sit', seatId] / ['up']                   xin ghế / trả ghế
 *   ['say', text]                              một lời chat (máy chủ làm sạch bằng chatText.js cleanChat, giới hạn tần suất)
 * server → client
 *   ['hi', id, [peer…], cap] / ['full']        đã vào (danh sách người đang ở đây) / phòng kín, thử phòng khác
 *   ['in', peer] / ['out', id]                 có người vào / ra
 *   ['S', [[id, x, y, z, h, a, k], …]]         trạng thái của những người vừa đổi, gom lại TICK ms một lần
 *   ['look', id, c, w, o], ['sit', id, seatId], ['up', id], ['no', seatId] (ghế đã có người)
 *   ['say', id, tên, text]                     lời chat của người id (gửi cả người nói: họ thấy bản đã làm sạch)
 *   ['says', [[id, tên, text, ms trước]…]]     vài lời chat gần nhất của phòng, gửi người vừa vào (sau 'hi')
 * peer = { id, x, y, z, h, a, k, c, w, seat, n, o, qa? } (qa = [đúng, số câu đã hỏi khi có mặt] của đố vui, trường quay)
 *
 * Đố vui nhiều người (chỉ phòng trường quay `studio…`): máy chủ giữ hàng chờ, lượt và CẢ CHƯƠNG TRÌNH (show.js: câu hỏi, đáp án,
 * đồng hồ, trợ giúp, phiếu bầu, hạt mang về); mọi máy chỉ vẽ theo trạng thái (src/church/quizShow.js) và gửi lựa chọn của mình.
 * Máy khách trường quay gửi `v` (src/quiz/rules.js PROTO) trong 'hi'; khác bản máy chủ thì nhận ['old'] và bị đóng (4003, không
 * nối lại): trang báo tải lại.
 * client → server
 *   ['q+'] / ['q-']                            đăng ký chơi / rời hàng chờ (đang ở ghế nóng thì như Dừng chơi)
 *   ['go', seq]                                (người chơi) MC trên máy mình đã nói xong bước seq: sang bước sau sớm (show.ack)
 *   ['pick', i]                                (người chơi) chốt phương án i
 *   ['help', k]                                (người chơi) dùng quyền trợ giúp k (fifty | audience | skip | friend)
 *   ['friend', { id } | { phone: tên }]         (người chơi) hỏi một người trong phòng / gọi điện cho người thân
 *   ['stop'] / ['rules']                       (người chơi) dừng chơi / bỏ qua luật chơi
 *   ['v', i]                                   khán giả bình chọn phương án i (lúc bình chọn mở, mỗi người một phiếu)
 *   ['fp', i]                                  người thân được hỏi chọn phương án i
 *   ['ans', i]                                 khán giả cùng trả lời câu đang hỏi (một lần mỗi câu, tới lúc người chơi chốt)
 * server → client
 *   ['Q', hot, [id…], first, 0, people, need, startIn]  ghế nóng (0 = chưa ai chơi), hàng chờ theo thứ tự, first = lượt đầu
 *                                              của buổi, people = số người thật đang ngồi, need = số người cần để bắt đầu ván
 *                                              (MIN_PLAYERS), startIn = ms còn lại tới lúc ván bắt đầu (đủ người, đếm ngược START_MS)
 *   ['G', state | null]                        trạng thái chương trình (show.js pub(): bước, câu hỏi, đồng hồ, trợ giúp…; null = hết lượt);
 *                                              gửi mỗi lần đổi bước và cho người vừa vào phòng
 *   ['ar', [n0..n3], a, [[id, i (-1: không trả lời), đúng, đã hỏi]…]]  lật đáp án: khán giả chọn mỗi phương án bao nhiêu người, đáp án đúng,
 *                                              từng người chọn gì và điểm cộng dồn của họ
 *   ['fa', tên] / ['fc']                       (gửi người thân) người chơi hỏi ý kiến bạn / thôi
 *   ['old']                                    trang này cũ hơn máy chủ: tải lại
 *
 * Đấu Trường Nhí (phòng `arena-g<lớp>`, src/dauTruong/rules.js): 'hi' kèm v = ARENA_PROTO, want (0: không muốn lên bục), o chứa
 * nhân vật "p:<số>"; ghế là A1…E10. Ngoài giờ (step 'closed') máy chủ gửi ['A', …] rồi đóng 4004 (client không nối lại).
 * client → server
 *   ['want', 0 | 1]                            bật / tắt "Em muốn lên bục"
 *   ['start']                                  (phòng cuốn chiếu: đủ 4 bục) bắt đầu sau 5 giây
 *   ['ready', 0 | 1]                           bạn đứng bục bấm "Bắt đầu" (sẵn sàng); ['start', 'ready']: cả 4 bục sẵn sàng, vào thi sau 2 giây
 *   ['xi', loại, ...]                          thao tác trong chương trình, máy chủ chuyển cho máy chủ trò
 *   ['xs', ảnh chụp] / ['xf', …] / ['xe']      (chỉ máy chủ trò) ảnh chụp, hiệu ứng, chương trình đã xong
 * server → client
 *   ['pw', id, 0 | 1]                          người id bật / tắt "Em muốn lên bục" (bục ưu tiên người thật)
 *   ['pr', id, 0 | 1]                          người id sẵn sàng / chưa
 *   ['xs', ảnh chụp] / ['xf', tên, ...]        (từ máy chủ trò) trạng thái chương trình / hiệu ứng (MC nói, góc máy, âm thanh…)
 *   ['xi', id, loại, ...]                      (gửi máy chủ trò) thao tác của bạn id: lock / buzz / pkg / star / aud
 *   ['A', { step, startAt, now, people, want, test, free, round, host, quick }]  quick: bắt đầu vì cả 4 bục sẵn sàng (bỏ Mở màn)  bước của phòng ('lobby' sảnh chờ | 'live' đang diễn | 'closed'), giờ bắt
 *                                              đầu, giờ máy chủ (để đếm ngược đúng), số người thật đã ngồi, số người muốn lên bục;
 *                                              gửi khi có người vào / ra / ngồi / đổi ý và ở mỗi mốc giờ
 */
import { cleanChat } from './chatText.js';
import { Show } from './show.js';
import { PROTO } from '../src/thanDong/quiz/rules.js';
import { ANIMS, LOOKS, NAME_MAX, cleanName } from './shared.js';
import { ALWAYS_OPEN, ARENA_PROTO, LIVE_MS, OPEN_BEFORE, TEST_LEAD, arenaSeatOk, nextStart, stepAt } from '../src/dauTruong/rules.js';

export { ANIMS, LOOKS, NAME_MAX, cleanName };

export const TICK = 100;          // ms: gom trạng thái gửi đi 10 lần một giây
const MAX_MSG = 600;              // ký tự: tin dài hơn là sai
const SHOW_MAX = 24000;           // ký tự: ảnh chụp chương trình Đấu Trường Nhí của máy chủ trò ('xs', có câu hỏi + điểm cả khán phòng)
const QUEUE_MAX = 30;             // người trong hàng chờ
export const MIN_PLAYERS = 5;     // người thật (đã ngồi ghế, mỗi tài khoản một) cần có trong trường quay để bắt đầu ván (docs/HatGiong.md 4.4)
const START_MS = 10000;           // đủ người: đếm ngược trước khi mời người đầu hàng (ai đang ở Tủ đồ kịp ra)
const accOk = (u) => typeof u === 'string' && /^[\w-]{6,64}$/.test(u);
const SILENT_MS = 60000;          // ms: kết nối có gửi nhịp ['p'] mà im quá lâu (rớt mạng không báo đóng) thì bỏ, kẻo thành bóng ma giữ ghế
const CHAT_KEEP = 20;             // lời chat gần nhất giữ cho người vào sau
const CHAT_AGE = 10 * 60000;      // ms: lời cũ hơn thì thôi gửi lại
const LIM = 200000;               // cm: toạ độ trong ±2 km (quảng trường Vatican rộng chừng 300 m)

/** Sức chứa theo khoá phòng: trường quay 50 người (ghế nhiều hơn, phòng ít người cho đỡ rối, chat đọc kịp), nơi đi lại 40 cho điện thoại vẽ kịp. */
/** Phòng thử nội bộ: `<khu>-test` (và `<khu>-test~2`…). */
export const isTestKey = (key) => /-test(~\d+)?$/.test(key);
export const capOf = (key) => (/^(studio|arena)/.test(key) ? 50 : 40);

const int = (v, lim = LIM) => (Number.isFinite(v) ? Math.max(-lim, Math.min(lim, Math.round(v))) : 0);
/** Tên an toàn để hiện: bỏ ký tự điều khiển / định hướng / vô hình, gộp khoảng trắng, dài quá thì cắt kèm "…". */
/** Bộ đồ gửi qua phòng: chỉ chữ thường, số, ':' và ',', không dài quá 200 ký tự; sai thì coi như không gửi. */
export const lookOf = (v) => (typeof v === 'string' && v.length <= 200 && /^[a-z0-9:,]*$/i.test(v) ? v : '');
const seatOk = (s) => typeof s === 'string' && /^[\w-]{1,32}$/.test(s);

// giới hạn tần suất theo kiểu xô token: đầy `burst`, mỗi giây thêm `rate`
function bucket(rate, burst) {
  let n = burst, at = Date.now();
  return () => {
    const now = Date.now();
    n = Math.min(burst, n + (now - at) / 1000 * rate);
    at = now;
    if (n < 1) return false;
    n -= 1;
    return true;
  };
}

export class Room {
  constructor(key, { onEmpty, need = MIN_PLAYERS, start = START_MS, speed = 1, arenaDemo = false } = {}) {
    this.key = key;
    this.cap = capOf(key);
    this.peers = new Map();   // id → peer (đã chào)
    this.seats = new Map();   // seatId → id
    this.dirty = new Set();
    this.timer = null;
    this.next = 1;
    this.onEmpty = onEmpty;
    this.chat = [];           // [[id, tên, text, lúc]…] lời chat gần nhất
    // đố vui (trường quay): ghế nóng, hàng chờ, buổi đang diễn, bảng câu hỏi mới nhất, bình chọn, người thân đang được hỏi
    this.quiz = /^studio/.test(key);
    this.grade = +(/^studio-g([1-5])/.exec(key)?.[1] || 3);   // trường quay theo lớp: studio-g1 … studio-g5
    // phòng thử nội bộ (`<khu>-test`, người thử bật ở trang chủ, src/engine/admin.js testRoom): không chờ ai, không đụng phòng thật
    this.test = isTestKey(key);
    this.need = this.test ? 0 : Math.max(0, need | 0);   // 0: không chờ ai (kiểm thử)
    this.startMs = this.test ? 0 : Math.max(0, start | 0);   // phòng thử: đăng ký là vào ghế nóng ngay
    this.goAt = 0; this.goT = null;
    this.hot = 0;
    this.queue = [];
    this.session = false;
    this.first = false;
    this.show = null;         // lượt đang chơi (show.js)
    this.speed = speed;       // kiểm thử: chương trình chạy nhanh hơn
    this.seen = new Set();    // câu đã hỏi trong phòng (lượt sau tránh lặp)
    this.qOpen = false; this.answers = new Map(); this.asked = new Set();
    // Đấu Trường Nhí (`arena-g<lớp>`): ALWAYS_OPEN (rules.js) thì mọi phòng cuốn chiếu như phòng thử: bắt đầu TEST_LEAD sau khi
    // phòng có người đầu tiên, hoặc 5 giây sau khi đủ 4 bục ('start'); hết lượt còn người thì mở lượt mới. Tắt thì theo lịch SLOTS.
    this.arena = /^arena/.test(key);
    this.aGrade = +(/^arena-g([1-5])/.exec(key)?.[1] || 3);
    this.arenaDemo = arenaDemo;
    this.aFree = this.test || arenaDemo || ALWAYS_OPEN;   // ALWAYS_OPEN: mọi phòng thật cũng cuốn chiếu (rules.js)
    this.created = Date.now(); this.forceAt = 0; this.aT = null;
  }

  /** Kết nối mới (chưa tính là trong phòng cho tới khi gửi 'hi'). */
  connect(sock) {
    return { sock, id: 0, state: bucket(15, 25), other: bucket(4, 10), talk: bucket(0.5, 3), show: bucket(40, 80), bad: 0, badAt: 0, last: '', seen: Date.now(), pinged: false };
  }

  message(conn, text) {
    if (typeof text !== 'string' || text.length > (this.arena ? SHOW_MAX : MAX_MSG)) return this.kick(conn, 'tin không hợp lệ');
    let m;
    try { m = JSON.parse(text); } catch { return this.kick(conn, 'tin không hợp lệ'); }
    if (!Array.isArray(m)) return this.kick(conn, 'tin không hợp lệ');
    const [type] = m;
    conn.seen = Date.now();
    if (type === 'p') { conn.pinged = true; return; }   // nhịp còn sống (net.js mỗi 20 s)
    if (!conn.id) {
      if (type === 'hi') this.hello(conn, m[1] || {});
      return;
    }
    const p = this.peers.get(conn.id);
    if (!p) return;
    if (type === 's') {
      if (!conn.state()) return this.flood(conn);
      p.x = int(m[1]); p.y = int(m[2]); p.z = int(m[3]); p.h = int(m[4], 1000);
      p.a = ANIMS[m[5]] ? m[5] : 0;
      p.k = int(m[6], 255);
      this.dirty.add(p.id);
      this.schedule();
      return;
    }
    // Đấu Trường Nhí: máy chủ trò gửi ảnh chụp / hiệu ứng của chương trình (xô riêng, dày hơn tin thường)
    if (this.arena && (type === 'xs' || type === 'xf' || type === 'xe')) { this.arenaShow(conn, p, m); return; }
    if (text.length > MAX_MSG) return this.kick(conn, 'tin không hợp lệ');
    if (!conn.other()) return this.flood(conn);
    if (this.quiz && this.quizMessage(p, m)) return;
    if (this.arena && this.arenaMessage(p, m)) return;
    if (type === 'look') {
      p.c = int(m[1], LOOKS - 1) & (LOOKS - 1);
      p.w = m[2] ? 1 : 0;
      p.o = lookOf(m[3]);
      this.cast(['look', p.id, p.c, p.w, p.o], p.id);
    } else if (type === 'sit') this.sit(p, m[1]);
    else if (type === 'up') this.up(p);
    else if (type === 'say') this.say(conn, p, m[1]);
  }

  // chat: mỗi 2 giây một lời (dồn được 3), lời giống hệt lời trước thì bỏ; cả phòng nhận, kể cả người nói
  say(conn, p, v) {
    const text = cleanChat(v);
    if (!text || text === conn.last || !conn.talk()) return;
    conn.last = text;
    const now = Date.now();
    this.chat.push([p.id, p.n, text, now]);
    if (this.chat.length > CHAT_KEEP) this.chat.shift();
    this.cast(['say', p.id, p.n, text]);
  }

  hello(conn, s) {
    // trường quay: trang cũ hơn máy chủ (tab mở trước một lần cập nhật) thì báo tải lại, không cho chơi lệch giao thức
    if ((this.quiz && s.v !== PROTO) || (this.arena && s.v !== ARENA_PROTO)) { this.send(conn, ['old']); conn.sock.close(4003, 'old'); return; }
    // Đấu Trường Nhí ngoài giờ (trước khi phòng mở / lượt đã xong): báo giờ lượt tới rồi đóng (4004: client không nối lại)
    // phòng cuốn chiếu: lượt cũ đã xong thì người mới vào mở lượt mới (sảnh chờ TEST_LEAD)
    if (this.arena && this.aFree && this.arenaState().step === 'closed') this.newRound();
    if (this.arena && this.arenaState().step === 'closed') { this.send(conn, ['A', this.arenaState()]); conn.sock.close(4004, 'closed'); return; }
    // nối lại (cùng mã phiên r của trang ấy): bỏ kết nối cũ trước (máy chủ có khi chưa biết nó đã chết), giữ chỗ trong hàng chờ
    // và điểm đố vui; không thì người ấy hiện hai lần và bóng ma cũ giữ ghế, về ghế bị báo "có người"
    const r = typeof s.r === 'string' && /^[\w-]{8,64}$/.test(s.r) ? s.r : '';
    const old = r ? [...this.peers.values()].find(q => q.r === r) : null;
    const qAt = old ? this.queue.indexOf(old.id) : -1, qa = old?.qa;
    if (old) { this.swapping = true; this.kick(old.conn, 'nối lại', 4003); this.swapping = false; }   // phòng không coi là trống giữa chừng
    if (this.peers.size >= this.cap) { this.send(conn, ['full']); conn.sock.close(4001, 'full'); return; }
    const p = {
      id: this.next++, x: int(s.x), y: int(s.y), z: int(s.z), h: int(s.h, 1000), a: ANIMS[s.a] ? s.a : 0,
      k: int(s.k, 255), c: int(s.c, LOOKS - 1) & (LOOKS - 1), w: s.w ? 1 : 0, seat: '', n: cleanName(s.n), o: lookOf(s.o), conn,
      u: accOk(s.u) ? s.u : '', r, ...(qa ? { qa } : {}), ...(this.arena ? { want: s.want === 0 ? 0 : 1, ready: s.ready ? 1 : 0 } : {}),
    };
    conn.id = p.id;
    this.peers.set(p.id, p);
    if (!this.sweepT) this.sweepT = setInterval(() => this.sweep(), SILENT_MS / 4);
    if (qAt >= 0 && p.id !== this.hot && !this.queue.includes(p.id)) this.queue.splice(Math.min(qAt, this.queue.length), 0, p.id);
    // ghế đã chọn trước khi nối xong (trường quay) hoặc mang theo khi nối lại: còn trống thì giữ, có người rồi thì báo 'no'
    const okSeat = seatOk(s.seat) && (!this.arena || arenaSeatOk(s.seat));
    const lost = okSeat && this.seats.has(s.seat);
    if (okSeat && !lost) { p.seat = s.seat; this.seats.set(s.seat, p.id); }
    this.send(conn, ['hi', p.id, [...this.peers.values()].filter(q => q !== p).map(pub), this.cap]);
    if (lost) this.send(conn, ['no', s.seat]);
    this.cast(['in', pub(p)], p.id);
    const now = Date.now(), recent = this.chat.filter(c => now - c[3] < CHAT_AGE);
    if (recent.length) this.send(conn, ['says', recent.map(([id, n, text, at]) => [id, n, text, now - at])]);
    if (this.quiz) {
      if (p.seat || qAt >= 0) this.turn(); else this.send(conn, this.roster());   // mang ghế theo: số người đổi, cả phòng nhận roster mới
      if (this.show) this.send(conn, ['G', this.show.pub()]);
    }
    if (this.arena) {
      this.armArena(); this.arenaCast();
      // vào giữa chương trình: ảnh chụp cuối của máy chủ trò để hiện ngay đúng câu, đúng điểm
      if (this.aSnap && this.arenaState().step === 'live') this.send(conn, ['xs', this.aSnap]);
    }
  }

  // ---- Đấu Trường Nhí: lịch, sảnh chờ ----
  /** Phòng cuốn chiếu: lượt mới, sảnh chờ TEST_LEAD tính từ bây giờ. */
  newRound() {
    this.created = Date.now(); this.forceAt = 0; this.aHost = 0; this.aSnap = null; this.aQuick = false; clearTimeout(this.aEndT); this.aEndT = null;
    for (const p of this.peers.values()) p.ready = 0;   // lượt mới: ai cũng bấm "Bắt đầu" lại
  }
  /**
   * Máy chủ trò của lượt: chương trình (MC, đồng hồ, bạn ảo, chấm điểm) chạy trên đúng một máy, các máy khác hiện theo ảnh chụp
   * ('xs') và hiệu ứng ('xf') máy ấy gửi, thao tác của mình ('xi') gửi về máy ấy. Chọn người ngồi ghế vào sớm nhất (id nhỏ nhất);
   * máy chủ trò rời phòng thì người kế tiếp nhận, chạy tiếp từ ảnh chụp cuối (src/games/dauTruong.js resume).
   */
  arenaHost() {
    if (this.aHost && this.peers.has(this.aHost)) return this.aHost;
    let best = 0;
    for (const p of this.peers.values()) if (p.seat && (!best || p.id < best)) best = p.id;
    if (!best) for (const p of this.peers.values()) if (!best || p.id < best) best = p.id;
    this.aHost = best;
    return best;
  }
  arenaShow(conn, p, m) {
    if (p.id !== this.arenaHost()) return;   // máy không phải chủ trò (vừa mất quyền): bỏ
    if (!conn.show()) return this.flood(conn);
    const [type] = m;
    if (type === 'xs') { if (m[1] && typeof m[1] === 'object') { this.aSnap = m[1]; this.cast(m, p.id); } }
    else if (type === 'xf') this.cast(m, p.id);
    else if (type === 'xe' && this.aFree && !this.aEndT) {
      // chương trình đã xong: 30 giây sau (mọi người xem thẻ kết thúc) mở lượt mới cho ai còn trong phòng / vào sau
      this.aEndT = setTimeout(() => { this.aEndT = null; this.newRound(); if (this.peers.size) { this.armArena(); this.arenaCast(); } }, 30000);
    }
  }
  arenaStart() { return this.aFree ? this.forceAt || this.created + TEST_LEAD : nextStart(this.aGrade); }
  /** { step, startAt, now, people, want, test }: want = số người thật đang ngồi và bật "Em muốn lên bục". */
  arenaState(now = Date.now()) {
    const startAt = this.arenaStart();
    const step = this.aFree ? (now < startAt ? 'lobby' : now < startAt + LIVE_MS ? 'live' : 'closed') : stepAt(startAt, now);
    const want = new Set();
    for (const p of this.peers.values()) if (p.seat && p.want) want.add(p.u || `c${p.id}`);
    // test: phòng thử (nhãn "Phòng thử"); free: không theo lịch, đủ 4 bục là bắt đầu (phòng thử, máy dev, ALWAYS_OPEN)
    // round: mã lượt (hạt giống bạn ảo giống nhau trên mọi máy); host: máy chủ trò
    return { step, startAt, now, people: this.people(), want: want.size, test: this.test || this.arenaDemo ? 1 : 0, free: this.aFree ? 1 : 0,
      round: this.aFree ? this.created : startAt, host: this.peers.size ? this.arenaHost() : 0, quick: this.aQuick ? 1 : 0 };
  }
  arenaCast() { this.cast(['A', this.arenaState()]); }
  /** Hẹn giờ tới mốc kế (mở phòng, bắt đầu, hết lượt) để báo cả phòng đổi bước. */
  armArena() {
    clearTimeout(this.aT);
    const now = Date.now(), startAt = this.arenaStart();
    const next = [startAt - OPEN_BEFORE, startAt, startAt + LIVE_MS].find(t => t > now);
    if (next) this.aT = setTimeout(() => {
      this.aT = null;
      if (!this.peers.size) return;
      // cuốn chiếu: hết lượt mà còn người trong phòng thì mở ngay lượt mới
      if (this.aFree && this.arenaState().step === 'closed') this.newRound();
      this.arenaCast(); this.armArena();
    }, Math.min(next - now + 20, 2 ** 31 - 1));
  }
  arenaMessage(p, m) {
    const [type] = m;
    // ['pw', id, 0|1]: báo cả phòng ai muốn lên bục (bục ưu tiên người thật, flow.js syncNpc)
    if (type === 'want') { p.want = m[1] ? 1 : 0; this.cast(['pw', p.id, p.want], p.id); this.arenaCast(); }
    // thao tác của một bạn (chọn đáp án, bấm chuông, chọn gói, đặt sao, khán giả trả lời): chuyển cho máy chủ trò
    else if (type === 'xi') {
      const h = this.peers.get(this.arenaHost());
      if (h && h.id !== p.id) this.send(h.conn, ['xi', p.id, ...m.slice(1, 6)]);
    }
    // ['ready', 0|1]: bạn đứng bục bấm "Bắt đầu" (sẵn sàng); cả phòng thấy ['pr', id, 0|1]
    else if (type === 'ready') { p.ready = m[1] ? 1 : 0; this.cast(['pr', p.id, p.ready], p.id); }
    else if (type === 'start') {
      // cả 4 bục đã sẵn sàng (m[1] === 'ready': vào thi ngay sau 2 giây, bỏ Mở màn) / phòng thử đủ bục (5 giây). Chỉ lần đầu.
      if (!this.aFree || this.arenaState().step !== 'lobby' || this.forceAt) return true;
      this.aQuick = m[1] === 'ready';
      this.forceAt = Date.now() + (this.aQuick ? 2000 : 5000); this.armArena(); this.arenaCast();
    } else return false;
    return true;
  }

  // ---- đố vui ----
  roster() {
    return ['Q', this.hot, this.queue, this.first ? 1 : 0, 0, this.people(), this.needShown(),
      this.goAt ? Math.max(0, this.goAt - Date.now()) : 0];
  }
  /** Người thật: đã ngồi một ghế trong phòng, hai máy cùng tài khoản tính một. */
  people() {
    const who = new Set();
    for (const p of this.peers.values()) if (p.seat) who.add(p.u || `c${p.id}`);
    return who.size;
  }
  /** need gửi cho máy khách (phòng thử: 0, thẻ chờ ẩn). */
  needShown() { return this.need; }
  enough() { return this.people() >= this.need; }
  /** Trạng thái gọn cho trang chủ (worker GET /status/<khoá>): không có tên ai. */
  status() {
    if (this.arena) { const a = this.arenaState(); return { people: a.people, need: 0, playing: a.step === 'live', q: 0, queue: a.want, here: this.peers.size, startIn: Math.max(0, a.startAt - a.now) }; }
    return { people: this.people(), need: this.need, playing: !!this.hot, q: this.show?.n || 0, queue: this.queue.length, here: this.peers.size,
      startIn: this.goAt ? Math.max(0, this.goAt - Date.now()) : 0 };
  }

  quizMessage(p, m) {
    const [type] = m, sh = this.show, mine = !!sh && p.id === this.hot;
    if (type === 'q+') {
      if (p.id !== this.hot && !this.queue.includes(p.id) && this.queue.length < QUEUE_MAX) { this.queue.push(p.id); this.turn(); }
    } else if (type === 'q-') {
      if (mine) sh.stop();
      else if (this.queue.includes(p.id)) { this.queue = this.queue.filter(id => id !== p.id); this.turn(); }
    } else if (type === 'go') { if (mine) sh.ack(m[1]); }
    else if (type === 'pick') { if (mine) sh.choose(m[1]); }
    else if (type === 'help') { if (mine) sh.help(m[1]); }
    else if (type === 'friend') { if (mine) sh.friend(m[1]); }
    else if (type === 'stop') { if (mine) sh.stop(); }
    else if (type === 'rules') { if (mine) sh.skipRules(); }
    else if (type === 'v') sh?.vote(p.id, m[1]);
    else if (type === 'fp') sh?.friendPick(p.id, m[1]);
    else if (type === 'ans') {
      const i = m[1];
      if (!this.qOpen || p.id === this.hot || this.answers.has(p.id) || !Number.isInteger(i) || i < 0 || i > 3) return true;
      this.answers.set(p.id, i);
    } else return false;
    return true;
  }

  // khán giả cùng trả lời: câu mới mở nhận đáp án, người chơi chốt thì đóng, lật đáp án thì chấm và gửi cả phòng số người chọn
  // từng phương án cùng điểm của từng người (đúng / số câu đã hỏi khi có mặt, cộng dồn suốt lúc ở trong phòng)
  openAnswers() {
    this.qOpen = true;
    this.answers = new Map();
    // ai đang ngồi trong phòng lúc câu hỏi ra (trừ người chơi) đều được tính câu này, trả lời hay không
    this.asked = new Set([...this.peers.values()].filter(q => q.id !== this.hot && q.seat).map(q => q.id));
  }
  score(a) {
    this.qOpen = false;
    const counts = [0, 0, 0, 0], list = [];
    // % đúng = số câu trả lời đúng / số câu chương trình đã hỏi khi người ấy có mặt (không trả lời cũng tính một câu)
    for (const id of new Set([...this.asked, ...this.answers.keys()])) {
      const q = this.peers.get(id);
      if (!q) continue;
      const i = this.answers.has(id) ? this.answers.get(id) : -1;
      if (i >= 0) counts[i]++;
      q.qa ||= [0, 0];
      q.qa[1]++;
      if (i >= 0 && i === a) q.qa[0]++;
      list.push([id, i, q.qa[0], q.qa[1]]);
    }
    this.asked = new Set();
    this.answers = new Map();
    this.cast(['ar', counts, Number.isInteger(a) ? a : -1, list]);
  }

  // ghế nóng trống mà có người chờ: người đầu hàng lên (lượt đầu của buổi thì MC chào khán giả, đọc luật)
  // Chưa đủ người thật (need): hàng chờ vẫn xếp, ghế nóng chưa mời ai. Vừa đủ người cho buổi mới: đếm ngược START_MS rồi mới mời
  // (buổi đang diễn, người chơi trước vừa xuống: mời ngay). Thiếu người giữa lúc đếm ngược thì thôi đếm.
  turn() {
    const enough = this.enough();
    if (!this.hot && this.queue.length && enough && !this.session && !this.goAt && this.startMs) {
      this.goAt = Date.now() + this.startMs;
      this.goT = setTimeout(() => { this.goT = null; this.goAt = 0; this.begin(); }, this.startMs);
    } else if (this.goAt && (!enough || !this.queue.length || this.hot)) { clearTimeout(this.goT); this.goT = null; this.goAt = 0; }
    if ((this.session || !this.startMs) && !this.hot && this.queue.length && enough) this.begin();
    else this.cast(this.roster());
  }
  begin() {
    if (!this.hot && this.queue.length && this.enough()) {
      this.hot = this.queue.shift();
      this.first = !this.session;
      this.session = true;
      const p = this.peers.get(this.hot);
      this.show = new Show({
        hot: this.hot, name: p?.n || '', first: this.first, seen: this.seen, speed: this.speed, grade: this.grade,
        emit: () => { if (this.show) this.cast(['G', this.show.pub()]); },
        open: () => this.openAnswers(),
        close: () => { this.qOpen = false; },
        score: (a) => this.score(a),
        ask: (id, name) => { const q = this.peers.get(id); if (q) this.send(q.conn, ['fa', name]); },
        unask: (id) => { const q = this.peers.get(id); if (q) this.send(q.conn, ['fc']); },
        person: (id) => { const q = this.peers.get(id); return q && q.seat ? { name: q.n, seat: q.seat } : null; },
        done: () => this.endTurn(),
      });
      this.show.start();
      if (this.seen.size > 900) this.seen = new Set([...this.seen].slice(-450));
    }
    this.cast(this.roster());
  }

  endTurn() {
    const sh = this.show;
    this.show = null;
    sh?.dispose();
    this.hot = 0;
    this.qOpen = false;
    this.cast(['G', null]);
    if (!this.queue.length || !this.enough()) this.session = false;
    this.turn();
  }

  sit(p, seat) {
    if (!seatOk(seat) || (this.arena && !arenaSeatOk(seat))) return;
    const owner = this.seats.get(seat);
    if (owner && owner !== p.id) { this.send(p.conn, ['no', seat]); return; }
    if (p.seat && p.seat !== seat) this.seats.delete(p.seat);
    const was = p.seat;
    p.seat = seat;
    this.seats.set(seat, p.id);
    this.cast(['sit', p.id, seat], p.id);
    if (this.quiz && !was) this.turn();
    if (this.arena && !was) this.arenaCast();
  }

  up(p) {
    if (!p.seat) return;
    this.seats.delete(p.seat);
    p.seat = '';
    this.cast(['up', p.id], p.id);
    if (this.quiz) this.turn();
    if (this.arena) this.arenaCast();
  }

  leave(conn) {
    const p = this.peers.get(conn.id);
    conn.id = -1;
    if (!p) return;
    this.peers.delete(p.id);
    this.dirty.delete(p.id);
    if (p.seat) this.seats.delete(p.seat);
    this.cast(['out', p.id]);
    if (this.quiz) {
      this.show?.gone(p.id);
      if (p.id === this.hot) { if (this.show) this.show.abort(); else this.endTurn(); }
      else if (this.queue.includes(p.id) || p.seat) { this.queue = this.queue.filter(id => id !== p.id); this.turn(); }
    }
    if (this.arena && this.peers.size) this.arenaCast();   // máy chủ trò rời: arenaHost() chọn người kế, 'A' báo cả phòng
    if (!this.peers.size && !this.swapping) { clearTimeout(this.timer); this.timer = null; this.show?.dispose(); this.show = null; clearTimeout(this.goT); clearTimeout(this.aT); clearTimeout(this.aEndT); this.aEndT = null; clearInterval(this.sweepT); this.sweepT = null; this.onEmpty?.(); }
  }

  // kết nối đã gửi nhịp mà im quá SILENT_MS: coi như đã rớt (Cloudflare không tự báo đóng khi máy mất mạng)
  sweep() {
    const now = Date.now();
    for (const p of [...this.peers.values()]) if (p.conn.pinged && now - p.conn.seen > SILENT_MS) this.kick(p.conn, 'im lặng');
  }

  schedule() {
    if (this.timer) return;
    this.timer = setTimeout(() => {
      this.timer = null;
      if (!this.dirty.size) return;
      const list = [];
      for (const id of this.dirty) {
        const p = this.peers.get(id);
        if (p) list.push([p.id, p.x, p.y, p.z, p.h, p.a, p.k]);
      }
      this.dirty.clear();
      const text = JSON.stringify(['S', list]);
      // không gửi lại cho chính người vừa đổi: chỉ mình họ đổi thì bỏ họ ra
      const only = list.length === 1 ? list[0][0] : 0;
      for (const q of this.peers.values()) if (q.id !== only) this.raw(q.conn, text);
    }, TICK);
  }

  cast(msg, except = 0) {
    const text = JSON.stringify(msg);
    for (const q of this.peers.values()) if (q.id !== except) this.raw(q.conn, text);
  }

  send(conn, msg) { this.raw(conn, JSON.stringify(msg)); }

  raw(conn, text) {
    try { conn.sock.send(text); } catch { /* kết nối đã đóng: leave() sẽ dọn */ }
  }

  // gửi quá nhanh: bỏ tin; bỏ hơn 200 tin trong 10 giây (máy lỗi hoặc phá) thì ngắt (trước đây đếm dồn cả buổi nên người dẫn
  // chương trình lâu bị ngắt giữa chừng)
  flood(conn) {
    const now = Date.now();
    if (now - conn.badAt > 10000) { conn.badAt = now; conn.bad = 0; }
    if (++conn.bad > 200) this.kick(conn, 'gửi quá nhanh');
  }

  // ngắt và dọn ngay (không chờ sự kiện đóng: kết nối chết có khi không bao giờ báo); leave() gọi lại lúc đóng thì không làm gì
  // mã 4003 = bị kết nối cùng mã phiên thay (client không nối lại nữa)
  kick(conn, reason, code = 4002) {
    try { conn.sock.close(code, reason); } catch { /* đã đóng */ }
    this.leave(conn);
  }
}

const pub = (p) => ({ id: p.id, x: p.x, y: p.y, z: p.z, h: p.h, a: p.a, k: p.k, c: p.c, w: p.w, seat: p.seat, n: p.n, o: p.o, ...(p.qa ? { qa: p.qa } : {}), ...(p.want != null ? { want: p.want, ready: p.ready || 0 } : {}) });
