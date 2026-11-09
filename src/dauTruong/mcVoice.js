/**
 * Giọng hai MC của 🏆 Đấu Trường Nhí bằng giọng đọc của trình duyệt (Web Speech). Sau này thay bằng Azure (NamMinh / HoaiMy, mp3
 * trên R2) mà không đổi cách gọi: mcSpeak(text, mc) trả Promise xong khi đọc hết.
 *
 * Chọn giọng: anh Minh (mc 0) ưu tiên giọng nam tiếng Việt của máy (Windows: An, Edge: NamMinh), chị Mai (mc 1) giọng nữ
 * (HoaiMy, Google Tiếng Việt…). Máy chỉ có một giọng tiếng Việt thì cả hai dùng chung, khác cao độ. Không có giọng tiếng Việt
 * hoặc đang tắt tiếng: vẫn hiện phụ đề và chờ một khoảng theo độ dài câu (đủ để đọc), chương trình chạy y như có tiếng.
 * Lớp nhỏ đọc chậm hơn (setMcRate).
 */
const MUTE_KEY = 'dt-mute';
let muted = false;
try { muted = localStorage.getItem(MUTE_KEY) === '1'; } catch { /* không có bộ nhớ */ }

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
const hasSynth = !!synth && typeof SpeechSynthesisUtterance === 'function';
let vi = [];
const MALE = /(\ban\b|nam ?minh|male)/i;
const FEMALE = /(hoai ?my|hoài my|linh|female|google)/i;
function pickVoices() { vi = (synth?.getVoices() || []).filter(v => /^vi/i.test(v.lang)); }
if (hasSynth) {
  pickVoices();
  synth.addEventListener?.('voiceschanged', pickVoices);
  // Safari iOS chỉ đọc sau một lần chạm: mở khoá bằng một câu rỗng ở lần chạm đầu
  const unlock = () => { try { synth.speak(new SpeechSynthesisUtterance(' ')); } catch { /* bỏ qua */ } window.removeEventListener('pointerdown', unlock); };
  window.addEventListener('pointerdown', unlock);
}
function voiceOf(mc) {
  if (!vi.length) pickVoices();
  if (!vi.length) return null;
  const male = vi.find(v => MALE.test(v.name)), female = vi.find(v => FEMALE.test(v.name) && !MALE.test(v.name));
  const v = mc === 0 ? male || vi.find(x => x !== female) || vi[0] : female || vi.find(x => x !== male) || vi[0];
  // chỉ một giọng cho cả hai: anh Minh trầm, chị Mai cao
  const shared = (mc === 0 && !male) || (mc === 1 && !female);
  return { v, pitch: shared ? (mc === 0 ? 0.8 : 1.15) : 1 };
}

let rate = 1;
/** Tốc độ đọc theo lớp (lớp 1–2 chậm hơn). */
export function setMcRate(r) { rate = Math.max(0.7, Math.min(1.4, r)); }
export const isMcMuted = () => muted;
export function setMcMuted(on) {
  muted = !!on;
  try { localStorage.setItem(MUTE_KEY, muted ? '1' : '0'); } catch { /* không có bộ nhớ */ }
  if (muted) try { synth?.cancel(); } catch { /* bỏ qua */ }
}

/** Ai đang nói (cho hoạt cảnh MC và phụ đề): onTalk(mc, text) lúc bắt đầu, onTalk(-1, '') lúc im. */
let onTalk = () => {};
export function setMcListener(fn) { onTalk = fn || (() => {}); }

let seq = 0, pending = null;
/** Ước lượng thời gian đọc (ms) khi không có tiếng: đủ để trẻ đọc phụ đề. */
const estimate = (text) => (700 + String(text).length * 62) / rate;

/**
 * MC `mc` đọc `text`. Trả Promise xong khi đọc hết (hoặc bị mcStop cắt: vẫn xong, người gọi tự kiểm lượt chạy).
 * onStart: lúc bắt đầu thành tiếng (để bật phương án đúng lúc MC đọc tới).
 */
export function mcSpeak(text, mc = 0, { onStart } = {}) {
  text = String(text || '').trim();
  if (!text) return Promise.resolve();
  const my = ++seq;
  pending?.();
  return new Promise((resolve) => {
    let done = false, guard = 0;
    const finish = () => {
      if (done) return;
      done = true; clearTimeout(guard);
      if (pending === stop) pending = null;
      if (my === seq) onTalk(-1, '');
      resolve();
    };
    const stop = () => { finish(); };
    pending = stop;
    const begin = () => { if (my === seq) { onTalk(mc, text); onStart?.(); } };
    const vo = !muted && hasSynth ? voiceOf(mc) : null;
    if (!vo) { begin(); guard = setTimeout(finish, estimate(text)); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.voice = vo.v; u.lang = vo.v.lang; u.pitch = vo.pitch; u.rate = rate;
    let started = false;
    u.onstart = () => { started = true; begin(); };
    u.onend = finish; u.onerror = finish;
    try { synth.cancel(); synth.resume(); synth.speak(u); } catch { begin(); guard = setTimeout(finish, estimate(text)); return; }
    // máy không báo onstart / onend (một số webview): quá lâu thì coi như xong
    setTimeout(() => { if (!started && !done) begin(); }, 600);
    guard = setTimeout(() => { try { synth.cancel(); } catch { /* bỏ qua */ } finish(); }, 4000 + estimate(text) * 1.6);
  });
}
/** Cắt lời đang đọc (đổi vòng, rời trang); Promise đang chờ vẫn xong. */
export function mcStop() {
  seq++;
  try { synth?.cancel(); } catch { /* bỏ qua */ }
  pending?.(); pending = null;
  onTalk(-1, '');
}
