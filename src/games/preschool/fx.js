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
  if (on) window.speechSynthesis?.cancel();
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
  window.speechSynthesis.addEventListener?.('voiceschanged', pickVoice);
  // Safari iOS chỉ cho đọc sau khi được "mở khoá" trong một lần chạm của người dùng.
  const unlock = () => {
    const u = new SpeechSynthesisUtterance(' ');
    u.volume = 0;
    window.speechSynthesis.speak(u);
    pickVoice();
  };
  document.addEventListener('pointerdown', unlock, { once: true, capture: true });
}

/** Máy đọc được tiếng Việt không (không có thì chỉ hiện chữ, tránh giọng Anh đọc sai). */
export const canSpeak = () => 'speechSynthesis' in window && (!!viVoice || noVoiceList);

/** Đọc một câu; `queue` = đọc nối sau câu đang đọc thay vì cắt ngang. */
export function say(text, { queue = false, rate = 0.9 } = {}) {
  if (muted || !text || !('speechSynthesis' in window)) return;
  if (!viVoice) pickVoice(); // danh sách giọng có thể tới muộn mà không báo voiceschanged
  if (!canSpeak()) return;
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
  const busy = () => !muted && canSpeak() && (window.speechSynthesis.speaking || window.speechSynthesis.pending);
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
