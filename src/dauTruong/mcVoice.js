/**
 * Giọng hai MC của 🏆 Đấu Trường Nhí: Azure NamMinh (anh Minh) / HoaiMy (chị Mai), mp3 lưu trên R2 như Kinh Thánh (api/tts.js,
 * src/dauTruong/tts.js); không dùng được Azure thì giọng đọc của trình duyệt (Web Speech). mcSpeak(text, mc) xong khi đọc hết.
 *
 * Chọn giọng: anh Minh (mc 0) ưu tiên giọng nam tiếng Việt của máy (Windows: An, Edge: NamMinh), chị Mai (mc 1) giọng nữ
 * (HoaiMy, Google Tiếng Việt…). Máy chỉ có một giọng tiếng Việt thì cả hai dùng chung, khác cao độ. Không có giọng tiếng Việt
 * hoặc đang tắt tiếng: vẫn hiện phụ đề và chờ một khoảng theo độ dài câu (đủ để đọc), chương trình chạy y như có tiếng.
 * Lớp nhỏ đọc chậm hơn (setMcRate).
 */
import { MC_VOICE_OF, ttsPath, ttsText } from './tts.js';

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
  if (muted) { try { synth?.cancel(); } catch { /* bỏ qua */ } try { player?.pause(); } catch { /* bỏ qua */ } }
}

/** Ai đang nói (cho hoạt cảnh MC và phụ đề): onTalk(mc, text) lúc bắt đầu, onTalk(-1, '') lúc im. */
let onTalk = () => {};
export function setMcListener(fn) { onTalk = fn || (() => {}); }

let seq = 0, pending = null;
/** Ước lượng thời gian đọc (ms) khi không có tiếng: đủ để trẻ đọc phụ đề. */
const estimateAt = (text, r) => (700 + String(text).length * 62) / r;
const currentRate = () => rate;

// ── Giọng Azure (api/tts.js, mp3 trên R2) ─────────────────────────────────────
/* Mỗi câu: tìm mp3 trên R2 (link công khai, qua CDN; câu đã có ai nghe thì có sẵn), chưa có thì /api/tts tạo rồi lưu. Phát bằng
   MỘT thẻ <audio> dùng mãi, mở khoá trong lần chạm đầu (iPhone / webview chỉ cho thẻ đã phát trong lúc chạm tự phát về sau).
   Câu sắp đọc tải trước (mcPrefetch): thẻ <audio> ẩn tải về bộ nhớ đệm của trình duyệt, lúc đọc phát ngay không chờ mạng.
   Azure / R2 không dùng được (chưa đặt key, hết hạn mức, mất mạng): CLOUD_PAUSE ms dùng giọng của máy, rồi thử lại. */
const R2 = (import.meta.env.VITE_R2_PUBLIC_URL || 'https://audio.kinhthanhtranh.com').replace(/\/+$/, '');
const CLOUD_PAUSE = 5 * 60e3, LOAD_WAIT = 9000;
let cloudOffUntil = 0;
const canCloud = () => typeof Audio === 'function' && !!globalThis.crypto?.subtle && Date.now() >= cloudOffUntil;
const SILENT_WAV = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
let player = null, unlocked = false;
function playerEl() {
  if (!player && typeof Audio === 'function') { player = new Audio(); player.preload = 'auto'; }
  return player;
}
if (typeof window !== 'undefined') {
  window.addEventListener('pointerdown', () => {
    const a = playerEl();
    if (!a || unlocked || (a.src && !a.paused)) return;
    a.src = SILENT_WAV;
    a.play().then(() => { unlocked = true; }, () => {});
  }, { capture: true });
}
/** Link phát được của một câu: R2 nếu đã có, không thì /api/tts. Thử bằng thẻ <audio> ẩn (không cần CORS), tải luôn vào bộ đệm. */
const found = new Map();   // `${voice}|${text}` → Promise<url>
function probe(url) {
  return new Promise((ok, no) => {
    const a = new Audio();
    a.preload = 'auto';
    const end = (f) => { clearTimeout(t); a.oncanplaythrough = a.onerror = null; f(); };
    const t = setTimeout(() => end(() => no(new Error('slow'))), LOAD_WAIT);
    a.oncanplaythrough = () => end(() => ok(url));
    a.onerror = () => end(() => no(new Error('miss')));
    a.src = url;
    a.load();
  });
}
function cloudUrl(text, mc) {
  // mc: số MC (0 / 1) hoặc tên giọng trong DT_VOICES (vd. 'enUS')
  const voice = typeof mc === 'string' ? mc : MC_VOICE_OF[mc] || MC_VOICE_OF[0], t = ttsText(text), k = `${voice}|${t}`;
  if (!found.has(k)) {
    const req = ttsPath(t, voice)
      .then(path => probe(`${R2}/${path}`))
      .catch(() => probe(`/api/tts?${new URLSearchParams({ t, v: voice })}`))
      .catch((e) => { found.delete(k); throw e; });
    found.set(k, req);
    if (found.size > 800) found.delete(found.keys().next().value);   // một bài tiếng Anh tải trước ~150 câu / từ
  }
  return found.get(k);
}
/* Dùng chung cho chỗ khác cần giọng Azure (preschool/fx.js): link mp3 của một câu, thẻ <audio> đã mở khoá, tạm nghỉ Azure. */
export const cloudVoiceUrl = (text, mc = 1) => cloudUrl(text, mc);
export const cloudVoiceReady = () => canCloud();
export const cloudVoicePlayer = () => playerEl();
export function cloudVoiceOff() { cloudOffUntil = Date.now() + CLOUD_PAUSE; }

/**
 * Máy này nghe MC bằng gì: 'azure' (chưa lỗi), 'local' (giọng tiếng Việt của máy), 'none' (tắt tiếng / không có giọng nào:
 * bé tự đọc đề, chương trình cho cả phòng thời gian đọc chung, games/dauTruong.js needRead).
 */
export function voiceMode() {
  if (muted) return 'none';
  if (canCloud()) return 'azure';
  return hasSynth && voiceOf(0) ? 'local' : 'none';
}
/** Tải trước câu MC sắp đọc (một câu, hoặc mảng các câu / các mảnh của một câu): lúc đọc không phải chờ mạng. */
export function mcPrefetch(text, mc = 0, { mute } = {}) {
  if ((mute ?? muted) || !canCloud()) return;
  (Array.isArray(text) ? text : [text]).forEach((t) => { if (String(t || '').trim()) cloudUrl(t, mc).catch(() => {}); });
}

/**
 * MC `mc` đọc `text`. Trả Promise xong khi đọc hết (hoặc bị mcStop cắt: vẫn xong, người gọi tự kiểm lượt chạy).
 * onStart: lúc bắt đầu thành tiếng (để bật phương án đúng lúc MC đọc tới). Giọng Azure trước; không được thì giọng của máy;
 * máy không có giọng tiếng Việt / tắt tiếng: phụ đề hiện, chờ một khoảng theo độ dài câu.
 */
export function mcSpeak(text, mc = 0, { onStart, parts, rate: callRate, mute } = {}) {
  // rate / mute riêng cho một lần đọc (máy đọc bài Tiếng Việt 3: chậm hơn, nút tắt tiếng của riêng nó), không đổi cài đặt MC
  const rate = callRate || currentRate();
  const muted = mute ?? isMcMuted();
  const estimate = (t) => estimateAt(t, rate);
  text = String(text || '').trim();
  parts = (parts?.length ? parts : [text]).map(t => String(t || '').trim()).filter(Boolean);
  if (!text) return Promise.resolve();
  const my = ++seq;
  pending?.();
  return new Promise((resolve) => {
    let done = false, guard = 0, started = false;
    const finish = () => {
      if (done) return;
      done = true; clearTimeout(guard);
      if (pending === stop) pending = null;
      if (my === seq) onTalk(-1, '');
      resolve();
    };
    const stop = () => { try { player?.pause(); } catch { /* bỏ qua */ } finish(); };
    pending = stop;
    const begin = () => { if (started) return; started = true; if (my === seq) { onTalk(mc, text); onStart?.(); } };
    const local = () => {
      if (done) return;
      if (import.meta.env.DEV) (window.__dtVoice ||= []).push('local');
      const vo = !muted && hasSynth ? voiceOf(mc) : null;
      if (!vo) { begin(); guard = setTimeout(finish, estimate(text)); return; }
      const u = new SpeechSynthesisUtterance(text);
      u.voice = vo.v; u.lang = vo.v.lang; u.pitch = vo.pitch; u.rate = rate;
      u.onstart = begin;
      u.onend = finish; u.onerror = finish;
      try { synth.cancel(); synth.resume(); synth.speak(u); } catch { begin(); guard = setTimeout(finish, estimate(text)); return; }
      // máy không báo onstart / onend (một số webview): quá lâu thì coi như xong
      setTimeout(() => { if (!done) begin(); }, 600);
      guard = setTimeout(() => { try { synth.cancel(); } catch { /* bỏ qua */ } finish(); }, 4000 + estimate(text) * 1.6);
    };
    if (muted) { begin(); guard = setTimeout(finish, estimate(text)); return; }
    if (!canCloud()) { local(); return; }
    // câu ghép mảnh (phần cố định + tên, mc.js partsOf): chờ đủ mọi mảnh rồi mới phát, các mảnh nối liền không chờ mạng giữa chừng
    Promise.all(parts.map(t => cloudUrl(t, mc))).then((urls) => {
      if (done || my !== seq) { finish(); return; }
      const a = playerEl();
      try { synth?.cancel(); } catch { /* bỏ qua */ }
      if (import.meta.env.DEV) (window.__dtVoice ||= []).push(urls[0].startsWith(R2) ? 'r2' : 'api');   // thử tự động: giọng nào đã đọc
      let k = 0;
      const playPart = () => {
        clearTimeout(guard);
        a.src = urls[k];
        a.playbackRate = rate; a.preservesPitch = true; a.defaultPlaybackRate = rate;
        a.play().then(() => {
          // phòng thẻ không báo onended: quá độ dài mảnh thì coi như xong
          const len = isFinite(a.duration) && a.duration > 0 ? a.duration * 1000 / rate : estimate(parts[k]) * 1.6;
          guard = setTimeout(finish, len + 2500);
        }, () => { if (!started) local(); else finish(); });   // trình duyệt chặn tự phát (chưa chạm lần nào): giọng của máy
      };
      a.onplaying = begin;
      a.onended = () => { if (done || my !== seq) return; if (++k < urls.length) playPart(); else finish(); };
      a.onerror = () => { if (!started) local(); else finish(); };
      playPart();
    }, () => {
      cloudOffUntil = Date.now() + CLOUD_PAUSE;   // R2 lẫn api/tts đều không được: nghỉ Azure một lúc
      local();
    });
  });
}
/** Cắt lời đang đọc (đổi vòng, rời trang); Promise đang chờ vẫn xong. */
export function mcStop() {
  seq++;
  try { synth?.cancel(); } catch { /* bỏ qua */ }
  try { player?.pause(); } catch { /* bỏ qua */ }
  pending?.(); pending = null;
  onTalk(-1, '');
}
