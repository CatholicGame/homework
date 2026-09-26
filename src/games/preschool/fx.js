/**
 * Âm thanh, giọng đọc và hiệu ứng cho "Bé Học Vui Toán" — bé mầm non chưa đọc được chữ,
 * nên mọi lời dặn đều được đọc to (giọng tiếng Việt của máy, nếu có).
 * Tiếng động tổng hợp bằng Web Audio, không cần tải file âm thanh.
 */

const MUTE_KEY = 'pre1-mute';

let muted = false;
try { muted = localStorage.getItem(MUTE_KEY) === '1'; } catch { /* storage unavailable */ }

export const isMuted = () => muted;

export function setMuted(on) {
  muted = on;
  try { localStorage.setItem(MUTE_KEY, on ? '1' : '0'); } catch { /* storage unavailable */ }
  if (on) stopSpeaking();
}

// ── Giọng đọc ────────────────────────────────────────────────────────────────
// Có trình duyệt (Edge trên điện thoại, webview iOS…) không liệt kê giọng nào nhưng vẫn
// đọc được theo `lang` — khi đó cứ đọc bằng vi-VN. Chỉ im lặng khi máy CÓ liệt kê giọng
// mà không có giọng tiếng Việt (tránh giọng Anh đọc sai).
let viVoice = null;
let noVoiceList = true;
function pickVoice() {
  const voices = window.speechSynthesis?.getVoices() || [];
  noVoiceList = voices.length === 0;
  viVoice = voices.find(v => /^vi/i.test(v.lang) && /natural|online|google/i.test(v.name))
    || voices.find(v => /^vi/i.test(v.lang)) || null;
}
if ('speechSynthesis' in window) {
  pickVoice();
  window.speechSynthesis.addEventListener?.('voiceschanged', () => { pickVoice(); emitStatus(); });
  // Safari iOS chỉ cho đọc sau khi được "mở khoá" trong một lần chạm của người dùng.
  const unlock = () => {
    const u = new SpeechSynthesisUtterance(' ');
    u.volume = 0;
    window.speechSynthesis.speak(u);
    pickVoice();
    if (useOnline()) onlineDoc(); // tạo sẵn iframe cho giọng trực tuyến
  };
  document.addEventListener('pointerdown', unlock, { once: true, capture: true });
}

/** Giọng của máy đọc được tiếng Việt không. */
const canSpeakLocal = () => 'speechSynthesis' in window && (!!viVoice || noVoiceList);

// ── Giọng đọc trực tuyến (dự phòng) ─────────────────────────────────────────
// Chrome trên Windows không có giọng tiếng Việt nào (giọng Google của Chrome không có tiếng
// Việt, giọng tải thêm của Windows Chrome không thấy) → đọc bằng dịch vụ đọc của Google
// Dịch, phát qua thẻ <audio>. Dịch vụ này từ chối yêu cầu có Referer của trang khác, nên
// thẻ <audio> nằm trong một iframe ẩn đặt "no-referrer" (không đổi chính sách của cả trang).
const ONLINE_MAX = 180; // dịch vụ nhận tối đa ~200 ký tự mỗi lần
let onlineFrame = null;
let onlineQueue = [];
let player = null;
let onlineFailures = 0; // số lần liền dịch vụ trực tuyến không trả về tiếng (mất mạng, bị chặn…)
const useOnline = () => !viVoice && !noVoiceList;

let frameReady = false;
/** Tài liệu của iframe "no-referrer"; null khi iframe chưa tải xong (srcdoc tải bất đồng bộ). */
function onlineDoc() {
  if (!onlineFrame?.isConnected) {
    frameReady = false;
    onlineFrame = document.createElement('iframe');
    onlineFrame.hidden = true;
    onlineFrame.setAttribute('aria-hidden', 'true');
    onlineFrame.onload = () => { frameReady = true; if (!player && onlineQueue.length) playNextOnline(); };
    onlineFrame.srcdoc = '<!doctype html><meta name="referrer" content="no-referrer"><body></body>';
    document.body.appendChild(onlineFrame);
  }
  return frameReady ? onlineFrame.contentDocument : null;
}

/** Chia câu dài thành các đoạn ngắn, ngắt ở dấu câu hoặc khoảng trắng. */
function chunksOf(text) {
  const out = [];
  let rest = text.trim();
  while (rest.length > ONLINE_MAX) {
    const head = rest.slice(0, ONLINE_MAX);
    const cut = Math.max(head.search(/[.!?…;,][^.!?…;,]*$/) + 1, head.lastIndexOf(' '));
    const at = cut > 20 ? cut : ONLINE_MAX;
    out.push(rest.slice(0, at).trim());
    rest = rest.slice(at).trim();
  }
  if (rest) out.push(rest);
  return out;
}

function stopOnline() {
  onlineQueue = [];
  if (player) { player.pause(); player.remove(); player = null; }
}

function playNextOnline() {
  const doc = onlineDoc();
  if (!doc) { player = null; return; } // chờ iframe tải xong (onload gọi lại)
  const item = onlineQueue.shift();
  if (!item) { player = null; return; }
  const a = doc.createElement('audio');
  a.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&ttsspeed=${item.rate < 0.85 ? 0.8 : 1}&q=${encodeURIComponent(item.text)}`;
  const done = () => { if (player === a) { a.remove(); playNextOnline(); } };
  a.onended = () => { if (onlineFailures) { onlineFailures = 0; emitStatus(); } done(); };
  a.onerror = () => { onlineFailures++; if (onlineFailures === 2) emitStatus(); done(); };
  player = a;
  doc.body.appendChild(a);
  a.play().catch(done);
}

function sayOnline(text, rate, queue) {
  if (!queue) stopOnline();
  onlineQueue.push(...chunksOf(text).map(t => ({ text: t, rate })));
  if (!player) playNextOnline();
}

// ── Tình trạng giọng đọc (để hướng dẫn bố mẹ) ───────────────────────────────
const statusListeners = new Set();
function emitStatus() { const s = voiceStatus(); statusListeners.forEach(fn => fn(s)); }

/**
 * Máy này đọc tiếng Việt bằng gì:
 *   'local'   — có giọng tiếng Việt của máy (tốt nhất)
 *   'online'  — không có, đang dùng giọng trực tuyến (cần mạng)
 *   'none'    — không đọc được (không hỗ trợ, mất mạng, dịch vụ trực tuyến lỗi)
 *   'unknown' — trình duyệt không liệt kê giọng nào (vẫn thử đọc theo vi-VN)
 */
export function voiceStatus() {
  if (!('speechSynthesis' in window)) return 'none';
  pickVoice();
  if (viVoice) return 'local';
  if (noVoiceList) return 'unknown';
  if (navigator.onLine === false || onlineFailures >= 2) return 'none';
  return 'online';
}
/** Số giọng trình duyệt liệt kê và các ngôn ngữ của chúng (để báo admin). */
export function voiceInfo() {
  const voices = window.speechSynthesis?.getVoices() || [];
  return { voices: voices.length, langs: [...new Set(voices.map(v => v.lang))].sort() };
}
/** Báo khi tình trạng giọng đọc đổi (danh sách giọng tải xong, dịch vụ lỗi / chạy lại). Trả về hàm huỷ. */
export function onVoiceStatus(fn) {
  statusListeners.add(fn);
  window.addEventListener('online', emitStatus);
  window.addEventListener('offline', emitStatus);
  return () => {
    statusListeners.delete(fn);
    if (!statusListeners.size) { window.removeEventListener('online', emitStatus); window.removeEventListener('offline', emitStatus); }
  };
}

/** Máy đọc được tiếng Việt không (bằng giọng của máy hoặc giọng trực tuyến). */
export const canSpeak = () => canSpeakLocal() || (useOnline() && navigator.onLine !== false);

/** Đọc một câu; `queue` = đọc nối sau câu đang đọc thay vì cắt ngang. */
export function say(text, { queue = false, rate = 0.9 } = {}) {
  if (muted || !text || !('speechSynthesis' in window)) return;
  if (!viVoice) pickVoice(); // danh sách giọng có thể tới muộn mà không báo voiceschanged
  if (useOnline()) { if (canSpeak()) sayOnline(text, rate, queue); return; }
  if (!canSpeakLocal()) return;
  const synth = window.speechSynthesis;
  if (!queue) synth.cancel();
  synth.resume(); // Chrome/Edge Android đôi khi kẹt ở trạng thái paused
  const u = new SpeechSynthesisUtterance(text);
  if (viVoice) u.voice = viVoice;
  u.lang = viVoice?.lang || 'vi-VN';
  u.rate = rate;
  u.pitch = 1.15;
  synth.speak(u);
}

/**
 * Gọi `fn` khi Thỏ đã đọc xong (và đã qua ít nhất `min` ms), để không chuyển câu khi lời khen
 * còn dang dở: im lặng liền `gap` ms mới tính là đọc xong. Tắt tiếng / máy không đọc được thì
 * chỉ chờ `min`; chờ tối đa `max` ms.
 * Trả về hàm huỷ.
 */
export function whenQuiet(fn, { min = 1200, max = 15000, gap = 400 } = {}) {
  const t0 = Date.now();
  let quietSince = 0;
  const busy = () => !muted && canSpeak() && (!!player || onlineQueue.length > 0
    || window.speechSynthesis.speaking || window.speechSynthesis.pending);
  const timer = setInterval(() => {
    const now = Date.now();
    if (busy()) { quietSince = 0; if (now - t0 < max) return; }
    else if (!quietSince) quietSince = now;
    // Giữa hai câu đọc nối có khoảng nghỉ ngắn, nên phải im lặng liền `gap` ms.
    if (now - t0 >= max || (now - t0 >= min && quietSince && now - quietSince >= gap)) {
      clearInterval(timer);
      fn();
    }
  }, 100);
  return () => clearInterval(timer);
}

export function stopSpeaking() {
  window.speechSynthesis?.cancel();
  stopOnline();
}

// ── Tiếng động ───────────────────────────────────────────────────────────────
let ctx = null;
function audio() {
  if (muted) return null;
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  } catch { return null; }
}

function tone(freq, start, dur, { type = 'sine', vol = 0.18, slide = 0 } = {}) {
  const c = audio();
  if (!c) return;
  const t = c.currentTime + start;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (slide) osc.frequency.exponentialRampToValueAtTime(freq * slide, t + dur);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(vol, t + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain).connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

export const sfx = {
  /** Chạm / đếm một đồ vật: cao dần theo số đếm. */
  pop(step = 0) { tone(420 + step * 45, 0, 0.12, { type: 'triangle', vol: 0.2, slide: 1.6 }); },
  tap() { tone(700, 0, 0.06, { type: 'triangle', vol: 0.12 }); },
  /** Đúng. */
  ding() { tone(880, 0, 0.18, { vol: 0.16 }); tone(1320, 0.09, 0.28, { vol: 0.14 }); },
  /** Sai — tiếng "boing" nhẹ, không làm bé sợ. */
  boing() { tone(260, 0, 0.28, { type: 'sine', vol: 0.2, slide: 0.55 }); },
  /** Tô xong một nét. */
  swish() { tone(500, 0, 0.18, { type: 'triangle', vol: 0.12, slide: 2.2 }); },
  /** Xong cả lượt chơi. */
  fanfare() {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.25, { type: 'triangle', vol: 0.16 }));
    tone(1319, 0.46, 0.5, { type: 'triangle', vol: 0.14 });
  },
};

// ── Hiệu ứng hình ────────────────────────────────────────────────────────────
const CONFETTI = ['#FF6B9D', '#C084FC', '#60A5FA', '#4ADE80', '#FBBF24', '#FB923C', '#22D3EE'];

/** Pháo giấy bung ra từ một điểm (toạ độ màn hình); mặc định giữa màn hình. */
export function burst(x = window.innerWidth / 2, y = window.innerHeight / 2, { count = 18, emoji = null } = {}) {
  const layer = document.createElement('div');
  layer.className = 'pk-burst';
  layer.style.left = `${x}px`;
  layer.style.top = `${y}px`;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const dist = 60 + Math.random() * 90;
    p.className = emoji ? 'pk-burst-emoji' : 'pk-burst-dot';
    if (emoji) p.textContent = emoji;
    else p.style.background = CONFETTI[i % CONFETTI.length];
    p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
    p.style.animationDelay = `${Math.random() * 0.08}s`;
    layer.appendChild(p);
  }
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 1100);
}

/** Pháo giấy rơi khắp màn hình khi xong một lượt. */
export function rain(duration = 2600) {
  const layer = document.createElement('div');
  layer.className = 'pk-rain';
  for (let i = 0; i < 70; i++) {
    const p = document.createElement('span');
    p.style.left = `${Math.random() * 100}%`;
    p.style.background = CONFETTI[i % CONFETTI.length];
    p.style.animationDelay = `${Math.random() * 0.9}s`;
    p.style.animationDuration = `${1.6 + Math.random() * 1.4}s`;
    if (i % 3 === 0) p.style.borderRadius = '50%';
    layer.appendChild(p);
  }
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), duration + 1400);
}

/** Rung nhẹ phần tử (trả lời sai). */
export function shake(el) {
  if (!el) return;
  el.classList.remove('pk-shake');
  void el.offsetWidth;
  el.classList.add('pk-shake');
  setTimeout(() => el.classList.remove('pk-shake'), 600);
}

export function centerOf(el) {
  const r = el.getBoundingClientRect();
  return [r.left + r.width / 2, r.top + r.height / 2];
}
