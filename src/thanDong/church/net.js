/**
 * Gặp gỡ online, phần mạng của client: một WebSocket tới máy chủ phòng (realtime/, giao thức ở realtime/room.js).
 * Mỗi khu là một phòng (`saigon`, `vatican`, `vatican-in`, `grotte`, `studio`); phòng kín thì tự sang `<khu>~2`, `~3`…
 * Rớt mạng thì nối lại (chờ lâu dần), mang theo trạng thái hiện tại và ghế đang ngồi. Không đặt VITE_ROOMS_URL lúc build
 * thì không nối (như trước: chỉ có người giả); lúc dev tự nối tới ws://<máy>:8787 (`npm run dev` trong realtime/).
 */
import { ANIMS } from '../../../realtime/shared.js';
import { getCurrentUser } from '../engine/auth.js';
import { testRoom } from '../engine/admin.js';
import { PROTO } from '../quiz/rules.js';
import { t } from '../engine/lang.js';

export { ANIMS, LOOKS } from '../../../realtime/shared.js';
const URL_ = (import.meta.env.VITE_ROOMS_URL || (import.meta.env.DEV ? `ws://${location.hostname}:8787` : '')).replace(/\/+$/, '');
export const ONLINE = !!URL_;
/** Đường đọc trạng thái phòng (số người thật, đang chơi): trang chủ hỏi trường quay (realtime/keys.js statusKey). */
export const statusUrl = (key) => (URL_ ? `${URL_.replace(/^ws/, 'http')}/status/${key}` : '');
// mã tài khoản đã băm (FNV-1a hai lượt): máy chủ đếm hai máy cùng tài khoản là một người thật, không biết email / tên
function accountTag() {
  const id = String(getCurrentUser()?.id || getCurrentUser()?.email || '');
  if (!id) return '';
  let a = 0x811c9dc5, b = 0x01000193 ^ 0x5bd1e995;
  for (let i = 0; i < id.length; i++) { const c = id.charCodeAt(i); a = Math.imul(a ^ c, 0x01000193) >>> 0; b = Math.imul(b ^ c, 0x01000193 + 0x9e3779b1) >>> 0; }
  return `k${a.toString(36)}${b.toString(36)}`;
}
const ROOMS_MAX = 20;    // thử tới phòng thứ mấy khi các phòng trước kín
const TRIES = import.meta.env.DEV ? 2 : 8; // nối lại bao nhiêu lần rồi thôi (dev không chạy máy chủ phòng thì im lặng)

const REPLACED = 4003;
const CLOSED = 4004;     // Đấu Trường Nhí: phòng ngoài giờ (realtime/room.js), không nối lại   // mã đóng của máy chủ khi kết nối này bị một kết nối cùng mã phiên thay (realtime/room.js)
function sessionId() {
  const fresh = () => (globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`).replace(/[^\w-]/g, '');
  try {
    let r = sessionStorage.getItem('kt-room-r');
    if (!r || !/^[\w-]{8,64}$/.test(r)) { r = fresh(); sessionStorage.setItem('kt-room-r', r); }
    return r;
  } catch { return fresh(); }
}
// Tab nhân bản (Chrome "Nhân bản thẻ", mở lại thẻ) mang theo cả sessionStorage, tức cùng mã phiên: máy chủ coi tab mới là
// tab cũ nối lại và đá tab cũ ra (hai người mà mỗi bên chỉ thấy mình, ghế báo có người). Vừa mở trang thì hỏi các tab khác
// cùng trang; tab nào đang giữ mã này trả lời thì tab mới lấy mã khác.
let session = sessionId();
try {
  const ch = new BroadcastChannel('kt-room-r');
  ch.onmessage = (e) => {
    const m = e.data || {};
    if (m.ask === session) ch.postMessage({ have: session });
    else if (m.have === session) {
      session = (globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`).replace(/[^\w-]/g, '');
      try { sessionStorage.setItem('kt-room-r', session); } catch { /* bộ nhớ bị chặn */ }
    }
  };
  ch.postMessage({ ask: session });
} catch { /* trình duyệt cũ không có BroadcastChannel */ }

/** Thẻ giữa trên: ứng dụng có bản mới, tải lại trang (máy chủ phòng không nhận trang cũ). */
function oldNotice() {
  if (document.querySelector('.ch-qold')) return;
  const box = document.createElement('div');
  box.className = 'ch-qwait is-go ch-qold';
  box.setAttribute('role', 'alert');
  box.innerHTML = `<b>${t('Ứng dụng vừa có bản mới')}</b><p>${t('Tải lại trang để vào phòng cùng mọi người.')}</p><div class="ch-qw-btns"><button type="button" class="ch-qw-share">${t('Tải lại trang')}</button></div>`;
  box.querySelector('button').onclick = () => location.reload();
  for (const ev of ['pointerdown', 'wheel', 'keydown']) box.addEventListener(ev, (e) => e.stopPropagation());
  (document.querySelector('.ch') || document.body).appendChild(box);
}

const cm = (v) => Math.round(v * 100);
const crad = (v) => Math.round(Math.atan2(Math.sin(v), Math.cos(v)) * 100);

/**
 * on: { welcome(id, peers), join(peer), leave(id), states([[id, x, y, z, h, a, k]]), look(id, c, w, o), sit(id, seat),
 * up(id), refused(seat), status(online), say(id, name, text), says([[id, name, text, msAgo]…]), quiz(kind, …) (đố vui: 'roster' | 'show' | 'voteOpen' | 'voteClose' | 'voteResult' |
 * 'friendAsk' | 'friendCancel' | 'friendPick' | 'answers', xem realtime/room.js) }; toạ độ nhận về đã đổi ra mét / radian, a là tên clip.
 */
export function makeNet(on) {
  let ws = null, key = null, inst = 1, tries = 0, timer = 0, ready = false, me = null, getState = null, beat = 0, asleep = false, ver = PROTO;
  // mã phiên của tab này: nối lại thì máy chủ bỏ kết nối cũ (kẻo bóng ma của mình giữ ghế, hiện hai lần). Giữ trong sessionStorage:
  // điện thoại hay bỏ trang nằm nền rồi tải lại khi quay về, trang mới vẫn mang mã cũ nên bóng ma bị dọn ngay lúc chào
  // (đọc lúc chào: tab nhân bản có thể vừa đổi mã, xem trên)

  const peer = (p) => ({ ...p, x: p.x / 100, y: p.y / 100, z: p.z / 100, h: p.h / 100, a: ANIMS[p.a] || 'idle' });
  // ws có thể vừa bị bỏ (ngắt, ra nền) trong lúc on.status(false) còn chạy: không gửi, đừng ném lỗi giữa lúc dọn
  const send = (m) => { if (ready && ws?.readyState === 1) ws.send(JSON.stringify(m)); };

  function open() {
    clearTimeout(timer);
    const url = `${URL_}/room/${key}${inst > 1 ? `~${inst}` : ''}`, sock = new WebSocket(url);
    ws = sock;
    sock.onopen = () => {
      if (ws !== sock) return;
      const s = getState();
      sock.send(JSON.stringify(['hi', { x: cm(s.x), y: cm(s.y), z: cm(s.z), h: crad(s.h), a: Math.max(0, ANIMS.indexOf(s.a)), k: s.k, c: s.c, w: s.w, seat: s.seat, n: s.n || '', o: s.o || '', u: accountTag(), r: session, v: ver, ...(s.want != null ? { want: s.want ? 1 : 0 } : {}) }]));
    };
    sock.onmessage = (e) => {
      if (ws !== sock) return;
      let m;
      try { m = JSON.parse(e.data); } catch { return; }
      const [type] = m;
      if (type === 'hi') {
        ready = true;
        tries = 0;
        me = m[1];
        // nhịp còn sống: người ngồi yên không gửi gì, máy chủ cần biết kết nối chưa chết (rớt mạng không báo đóng)
        clearInterval(beat);
        beat = setInterval(() => { if (ws === sock && ready) sock.send('["p"]'); }, 20000);
        on.welcome(me, m[2].map(peer));
        on.status(true);
      } else if (type === 'full') {
        // phòng kín: sang phòng kế
        sock.onclose = null;
        ws = null;
        if (inst < ROOMS_MAX) { inst++; open(); }
      } else if (type === 'old') {
        // trang này cũ hơn máy chủ phòng (mở trước một lần cập nhật): máy chủ đóng kết nối (4003, không nối lại); báo tải lại
        // (tin tới trước khi chào xong, lúc phần đố vui chưa dựng: thẻ báo do net.js tự vẽ)
        oldNotice();
      } else if (type === 'A') {
        // Đấu Trường Nhí: bước của phòng, giờ bắt đầu (tới cả trước khi chào xong: phòng ngoài giờ báo rồi đóng)
        on.arena?.(m[1]);
      } else if (!ready) {
        /* chưa chào xong */
      } else if (type === 'S') {
        on.states(m[1].filter(r => r[0] !== me).map(([id, x, y, z, h, a, k]) => [id, x / 100, y / 100, z / 100, h / 100, ANIMS[a] || 'idle', k]));
      } else if (type === 'in') on.join(peer(m[1]));
      else if (type === 'out') on.leave(m[1]);
      else if (type === 'look') on.look(m[1], m[2], m[3], m[4] || '');
      else if (type === 'sit') on.sit(m[1], m[2]);
      else if (type === 'up') on.up(m[1]);
      else if (type === 'pw') on.want?.(m[1], !!m[2]);
      else if (type === 'pr') on.ready?.(m[1], !!m[2]);
      // Đấu Trường Nhí: ảnh chụp / hiệu ứng của máy chủ trò; (máy chủ trò) thao tác của bạn khác
      else if (type === 'xs') on.showSnap?.(m[1]);
      else if (type === 'xf') on.showFx?.(m[1], m.slice(2));
      else if (type === 'xi') on.showInput?.(m[1], m[2], m.slice(3));
      else if (type === 'no') on.refused(m[1]);
      // chat: một lời mới / vài lời gần nhất khi vừa vào phòng
      else if (type === 'say') on.say?.(m[1], m[2], m[3]);
      else if (type === 'says') on.says?.(m[1]);
      // đố vui (trường quay, realtime/room.js + show.js): hàng chờ, trạng thái chương trình, người thân, chấm khán giả
      else if (type === 'Q') on.quiz?.('roster', m[1], m[2], !!m[3], m[4] || 0, m[5] ?? 0, m[6] ?? 0, m[7] || 0);
      else if (type === 'G') on.quiz?.('state', m[1] || null);
      else if (type === 'fa') on.quiz?.('friendAsk', m[1]);
      else if (type === 'fc') on.quiz?.('friendCancel');
      else if (type === 'ar') on.quiz?.('answers', m[1], m[2], m[3]);
    };
    sock.onclose = (e) => {
      if (ws !== sock) return;
      clearInterval(beat);
      ws = null;
      const was = ready;
      ready = false;
      if (was) on.status(false);
      // một bản khác của chính trang này (tab nhân đôi) đã nối với cùng mã phiên: thôi, không giành lại kẻo hai bên đá nhau mãi
      if (e?.code === REPLACED) return;
      if (e?.code === CLOSED) { on.closed?.(); return; }
      // rớt mạng: nối lại sau 1, 2, 4… tối đa 30 s; hết lượt thử thì báo (trang hiện nút Thử lại)
      if (key && tries < TRIES) { on.retrying?.(tries + 1); timer = setTimeout(open, Math.min(30000, 1000 * 2 ** tries++)); }
      else if (key) on.failed?.();
    };
  }

  function close() {
    clearTimeout(timer);
    clearInterval(beat);
    const sock = ws;
    ws = null;
    const was = ready;
    ready = false;
    if (was) on.status(false);
    me = null;
    try { sock?.close(1000); } catch { /* đã đóng */ }
  }

  // ứng dụng ra nền (sang ứng dụng khác, khoá máy) / trang bị đóng băng hay rời đi: ngắt hẳn để máy chủ bỏ mình ngay, ghế trống
  // ra, không để lại bóng ma (máy chủ chỉ biết kết nối chết sau SILENT_MS). on.keep() đúng (đang trên sân khấu đố vui) thì
  // vẫn giữ khi chỉ ra nền, chỉ ngắt lúc trang bị đóng băng / rời đi. Quay lại thì nối lại ngay, mang ghế theo.
  function sleep() {
    if (!key || asleep) return;
    asleep = true;
    clearTimeout(timer);
    clearInterval(beat);
    const sock = ws;
    ws = null;
    const was = ready;
    ready = false;
    if (was) on.status(false);
    try { sock?.close(1000, 'nền'); } catch { /* đã đóng */ }
  }
  function wake() {
    if (!asleep) return;
    asleep = false;
    if (key && !ws) { tries = 0; open(); }
  }
  const onVis = () => {
    if (document.visibilityState === 'hidden') { if (!on.keep?.()) sleep(); } else wake();
  };
  const onFreeze = () => sleep();
  const onShow = () => { if (document.visibilityState !== 'hidden') wake(); };
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', onVis);
    document.addEventListener('freeze', onFreeze);
    document.addEventListener('resume', onShow);
    addEventListener('pagehide', onFreeze);
    addEventListener('pageshow', onShow);
  }
  const unhook = () => {
    if (typeof document === 'undefined') return;
    document.removeEventListener('visibilitychange', onVis);
    document.removeEventListener('freeze', onFreeze);
    document.removeEventListener('resume', onShow);
    removeEventListener('pagehide', onFreeze);
    removeEventListener('pageshow', onShow);
  };

  return {
    get ready() { return ready; },
    get id() { return me; },
    /** Vào phòng của khu `k` (rời phòng cũ). state() trả trạng thái hiện tại để chào / chào lại khi nối lại. */
    join(k, state, { v = PROTO } = {}) {
      if (!ONLINE) return;
      close();
      asleep = false;
      ver = v;
      key = testRoom() ? `${k}-test` : k;   // người thử bật Phòng thử nội bộ: phòng riêng, không đụng phòng thật
      inst = 1;
      tries = 0;
      getState = state;
      open();
    },
    state(s) { send(['s', cm(s.x), cm(s.y), cm(s.z), crad(s.h), Math.max(0, ANIMS.indexOf(s.a)), s.k]); },
    look(c, w, o = '') { send(['look', c, w ? 1 : 0, o]); },
    sit(seat) { send(['sit', seat]); },
    up() { send(['up']); },
    /** Chat: một lời cho cả phòng (máy chủ làm sạch và gửi lại cho mọi người, kể cả mình). */
    say(text) { send(['say', text]); },
    /**
     * Đố vui (máy chủ cầm chương trình, realtime/show.js): đăng ký chơi / rời hàng chờ; người chơi: MC đã nói xong bước seq, chốt
     * phương án, trợ giúp, hỏi người thân ({ id } | { phone: tên }), dừng chơi, bỏ qua luật; khán giả: bình chọn, trả lời người thân.
     */
    queue(on) { send([on ? 'q+' : 'q-']); },
    go(seq) { send(['go', seq]); },
    pick(i) { send(['pick', i]); },
    help(k) { send(['help', k]); },
    friend(c) { send(['friend', c]); },
    stop() { send(['stop']); },
    rules() { send(['rules']); },
    vote(i) { send(['v', i]); },
    friendPick(i) { send(['fp', i]); },
    answer(i) { send(['ans', i]); },
    /** Đấu Trường Nhí: bật / tắt "Em muốn lên bục"; (phòng thử) bắt đầu ngay. */
    want(on) { send(['want', on ? 1 : 0]); },
    start(why) { send(why ? ['start', why] : ['start']); },
    /** Đấu Trường Nhí: bạn đứng bục bấm "Bắt đầu" (sẵn sàng) / thôi. */
    setReady(on) { send(['ready', on ? 1 : 0]); },
    /** Đấu Trường Nhí, chương trình chung: (máy chủ trò) ảnh chụp, hiệu ứng, đã xong; (mọi máy) thao tác gửi máy chủ trò. */
    showSnap(o) { send(['xs', o]); },
    showFx(name, args = []) { send(['xf', name, ...args]); },
    showEnd() { send(['xe']); },
    showInput(type, args = []) { send(['xi', type, ...args]); },
    /** Hết lượt nối lại (on.failed): thử lại từ đầu. */
    retry() { if (key && !ws) { tries = 0; open(); } },
    close() { key = null; asleep = false; close(); unhook(); },
  };
}
