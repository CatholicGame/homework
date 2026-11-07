/**
 * Giọng MC của "Ai tài năng nhất?": giọng đọc của máy (Web Speech), cùng giao diện với engine/voice.js của kinh-thanh để mcVoice.js,
 * quizOnline.js, quizDev.js dùng nguyên.
 * Homework chưa có máy chủ giọng Azure: ưu tiên giọng nam tiếng Việt của máy (Windows / Edge: An, NamMinh), không có thì giọng
 * tiếng Việt bất kỳ của máy; máy không có giọng tiếng Việt thì MC im lặng, chữ vẫn hiện, chương trình tự hẹn giờ.
 * Nút loa trong trường quay (world.js) bật / tắt; nhớ ở `td-mute`.
 */
const MUTE_KEY = 'td-mute';
let muted = false;
try { muted = localStorage.getItem(MUTE_KEY) === '1'; } catch { /* không có bộ nhớ */ }

export const isMuted = () => muted;
export function setMuted(on) {
  muted = !!on;
  try { localStorage.setItem(MUTE_KEY, muted ? '1' : '0'); } catch { /* không có bộ nhớ */ }
  if (muted) stopSpeaking();
}

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
const hasSynth = !!synth && typeof SpeechSynthesisUtterance === 'function';
let vi = [];
const MALE = /(\ban\b|nam ?minh|male|nam\b)/i;
function pickVoices() { vi = (synth?.getVoices() || []).filter(v => /^vi/i.test(v.lang)); }
if (hasSynth) {
  pickVoices();
  synth.addEventListener?.('voiceschanged', pickVoices);
  // Safari iOS chỉ đọc sau một lần chạm: mở khoá bằng một câu rỗng ở lần chạm đầu
  const unlock = () => { try { synth.speak(new SpeechSynthesisUtterance(' ')); } catch { /* bỏ qua */ } window.removeEventListener('pointerdown', unlock); };
  window.addEventListener('pointerdown', unlock);
}
const voiceMC = () => { if (!vi.length) pickVoices(); return vi.find(v => MALE.test(v.name)) || vi.find(v => /natural|online/i.test(v.name)) || vi[0] || null; };

/** MC đọc thành tiếng được không. */
export const canSpeakMC = () => !muted && hasSynth && !!voiceMC();
export const canSpeak = () => canSpeakMC();

// hàng chờ của mình (Web Speech tự xếp hàng, nhưng `when` phải hỏi ngay trước khi câu bắt đầu)
let queue = [], cur = null, seq = 0;
function next() {
  cur = null;
  const it = queue.shift();
  if (!it) return;
  if (it.when && !it.when()) { it.onEnd?.(); next(); return; }
  const u = new SpeechSynthesisUtterance(it.text);
  const v = voiceMC();
  if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'vi-VN';
  u.rate = Math.max(0.6, Math.min(1.6, it.rate || 1));
  const my = ++seq;
  let started = false;
  u.onstart = () => { started = true; it.onStart?.(); };
  const done = () => { if (my !== seq) return; if (!started) it.onStart?.(); it.onEnd?.(); next(); };
  u.onend = done;
  u.onerror = done;
  cur = it;
  synth.resume();
  synth.speak(u);
  // máy không báo onstart / onend (một số webview): sau một khoảng theo độ dài câu thì coi như xong
  it.guard = setTimeout(() => { if (my === seq && cur === it) { synth.cancel(); done(); } }, 2500 + it.text.length * 140 / u.rate);
}

/**
 * Đọc một câu. queue: nối sau câu đang đọc (không thì cắt ngang). onStart khi bắt đầu thành tiếng, onEnd khi xong (không gọi khi bị cắt),
 * when: hỏi ngay trước khi câu tới lượt, false thì bỏ câu (lời MC dẫn việc đã qua). role / lang / live giữ cho giống bản gốc.
 */
export function say(text, { queue: q = false, rate = 1, onStart, onEnd, when } = {}) {
  if (muted || !text || !canSpeakMC()) return;
  if (!q) stopSpeaking();
  queue.push({ text: String(text), rate, onStart, onEnd, when });
  if (!cur) next();
}

export function isSpeaking() {
  return !muted && (!!cur || queue.length > 0 || !!synth?.speaking);
}

export function stopSpeaking() {
  seq++;
  if (cur?.guard) clearTimeout(cur.guard);
  cur = null;
  queue = [];
  try { synth?.cancel(); } catch { /* bỏ qua */ }
}

/** Gọi fn khi MC đã im (ít nhất `min` ms, im liền `gap` ms), tối đa `max` ms. Trả hàm huỷ. */
export function whenQuiet(fn, { min = 1200, max = 15000, gap = 400 } = {}) {
  const t0 = Date.now();
  let quietSince = 0;
  const timer = setInterval(() => {
    const now = Date.now();
    if (isSpeaking()) { quietSince = 0; if (now - t0 < max) return; }
    else if (!quietSince) quietSince = now;
    if (now - t0 >= max || (now - t0 >= min && quietSince && now - quietSince >= gap)) { clearInterval(timer); fn(); }
  }, 100);
  return () => clearInterval(timer);
}
