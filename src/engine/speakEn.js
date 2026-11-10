/**
 * Đọc tiếng Anh: giọng Azure en-US-JennyNeural (DT_VOICES.enUS) cho MỌI lời tiếng Anh: bài Đọc tiếng Anh, truyện hoạt hình,
 * chép chính tả, bấm từ (readingGloss.js), bong bóng từ vựng (wordHint.js). Mp3 từng câu / từng từ chỉ tạo một lần, lưu R2
 * (api/tts.js, dauTruong/mcVoice.js cloudVoiceUrl); câu sắp đọc tải trước bằng prefetchEn().
 * Azure / R2 không dùng được (chưa đặt key, hết hạn mức, admin tắt, mất mạng): giọng Anh–Mỹ của máy; máy liệt kê giọng mà
 * không có giọng tiếng Anh (hiếm) → dịch vụ đọc của Google Dịch, phát qua <audio> trong iframe "no-referrer".
 */
import { cloudVoiceUrl, cloudVoiceReady, cloudVoicePlayer, cloudVoiceOff } from '../dauTruong/mcVoice.js';

const EN_VOICE = 'enUS';

let enVoice = null;
let noVoiceList = true;
function pickVoice() {
  const voices = window.speechSynthesis?.getVoices() || [];
  noVoiceList = voices.length === 0;
  const en = voices.filter(v => /^en[-_]?US/i.test(v.lang));
  const any = en.length ? en : voices.filter(v => /^en/i.test(v.lang));
  enVoice = any.find(v => /natural|online|google/i.test(v.name)) || any.find(v => v.localService) || any[0] || null;
}
if ('speechSynthesis' in window) {
  pickVoice();
  window.speechSynthesis.addEventListener?.('voiceschanged', pickVoice);
}

/** Safari iOS chỉ cho đọc sau khi được "mở khoá" trong một lần chạm; gọi trong pointerdown. (Thẻ <audio> của Azure tự mở khoá ở mcVoice.js.) */
let unlocked = false;
export function unlockSpeech() {
  if (unlocked || !('speechSynthesis' in window)) return;
  unlocked = true;
  const u = new SpeechSynthesisUtterance(' ');
  u.volume = 0;
  window.speechSynthesis.speak(u);
  pickVoice();
}

export const canSpeakEn = () => 'speechSynthesis' in window || 'Audio' in window;

const clean = (t) => String(t || '').replace(/[’]/g, "'").trim();

// ── Azure ─────────────────────────────────────────────────────────────────
/** Tải trước các câu / từ sắp đọc (mở bài, mở phần): lúc bấm nghe phát ngay, không chờ mạng. */
export function prefetchEn(list) {
  if (!cloudVoiceReady()) return;
  (Array.isArray(list) ? list : [list]).map(clean).filter(Boolean).forEach((t) => cloudVoiceUrl(t, EN_VOICE).catch(() => {}));
}

let cloudRun = 0;      // lượt phát Azure hiện tại; stopEn / lượt mới tăng để huỷ lượt cũ
let cloudPlaying = false;
let guard = 0;
/**
 * Phát một câu bằng Azure. Xong → onEnd; không được (chưa có mp3, lỗi mạng, trình duyệt chặn) → onFail (người gọi đọc bằng
 * giọng của máy). rate theo quy ước giọng máy (0.85 thường, ≈0.6 chậm) đổi sang tốc độ phát mp3.
 */
function playCloud(text, rate, onEnd, onFail) {
  const my = ++cloudRun;
  clearTimeout(guard);
  const mine = () => my === cloudRun;
  const fail = () => { if (!mine()) return; cloudPlaying = false; clearTimeout(guard); onFail(); };
  const end = () => { if (!mine()) return; cloudPlaying = false; clearTimeout(guard); onEnd?.(); };
  cloudVoiceUrl(text, EN_VOICE).then((url) => {
    if (!mine()) return;
    const a = cloudVoicePlayer();
    try { window.speechSynthesis?.cancel(); } catch { /* bỏ qua */ }
    const pb = rate < 0.75 ? 0.72 : 0.92; // Jenny đọc nhanh hơn giọng máy: thường hơi chậm lại, 🐢 chậm rõ
    a.onended = end;
    a.onerror = fail;
    a.src = url;
    a.preservesPitch = true; a.defaultPlaybackRate = pb; a.playbackRate = pb;
    cloudPlaying = true;
    a.play().then(() => {
      // phòng thẻ không báo onended
      const len = isFinite(a.duration) && a.duration > 0 ? (a.duration * 1000) / pb : 1500 + text.length * 90;
      guard = setTimeout(end, len + 2500);
    }, fail);
  }, () => { if (!mine()) return; cloudVoiceOff(); fail(); });
}

// ── Giọng của máy / Google Dịch (khi Azure không dùng được) ─────────────────
let frame = null, player = null;
function sayOnline(text, onEnd, rate = 0.8) {
  if (!frame?.isConnected) {
    frame = document.createElement('iframe');
    frame.hidden = true;
    frame.setAttribute('aria-hidden', 'true');
    frame.srcdoc = '<!doctype html><meta name="referrer" content="no-referrer"><body></body>';
    document.body.appendChild(frame);
  }
  const play = () => {
    player?.remove();
    const a = frame.contentDocument.createElement('audio');
    a.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en-US&client=tw-ob&ttsspeed=${rate}&q=${encodeURIComponent(text.slice(0, 180))}`;
    a.onended = a.onerror = () => { a.remove(); onEnd?.(); };
    player = a;
    frame.contentDocument.body.appendChild(a);
    a.play().catch(() => {});
  };
  if (frame.contentDocument?.readyState === 'complete' && frame.contentDocument.body) play();
  else frame.addEventListener('load', play, { once: true });
}

/** Một câu bằng giọng máy; onEnd khi xong (lỗi cũng gọi, trừ khi bị cắt ngang). */
function sayLocal(text, rate, onEnd) {
  if (!enVoice) pickVoice(); // danh sách giọng có thể tới muộn
  const synth = window.speechSynthesis;
  if (!synth || (!enVoice && !noVoiceList)) { sayOnline(text, onEnd, rate < 0.75 ? 0.5 : 0.8); return; }
  const u = new SpeechSynthesisUtterance(text);
  if (enVoice) u.voice = enVoice;
  u.lang = enVoice?.lang || 'en-US';
  u.rate = rate;
  u.onend = () => onEnd?.();
  u.onerror = (e) => { if (e.error !== 'interrupted' && e.error !== 'canceled') onEnd?.(); };
  synth.resume(); // Chrome/Edge Android đôi khi kẹt ở trạng thái paused
  synth.speak(u);
}

/** Đọc một từ / cụm tiếng Anh, cắt ngang câu đang đọc. */
export function sayEn(text) {
  text = clean(text);
  if (!text) return;
  stopEn();
  if (cloudVoiceReady()) playCloud(text, 0.85, null, () => sayLocal(text, 0.85));
  else sayLocal(text, 0.85);
}

export function stopEn() {
  cloudRun++;
  clearTimeout(guard);
  if (cloudPlaying) { cloudPlaying = false; try { cloudVoicePlayer()?.pause(); } catch { /* bỏ qua */ } }
  window.speechSynthesis?.cancel();
  player?.pause(); player?.remove(); player = null;
}

/**
 * Đọc lần lượt từng câu (bài đọc tiếng Anh): onEach(i) khi bắt đầu câu i, onEnd() khi đọc hết.
 * rate: 0.85 thường, 0.6 chậm. Trả về hàm dừng (dừng thì không gọi onEnd).
 */
export function sayEnSeq(list, { rate = 0.85, onEach, onEnd } = {}) {
  let stopped = false, i = 0;
  stopEn();
  prefetchEn(list.slice(0, 3));
  const next = () => {
    if (stopped) return;
    if (i >= list.length) { onEnd?.(); return; }
    const k = i++;
    const text = clean(list[k]);
    if (!text) { next(); return; }
    onEach?.(k);
    prefetchEn(list.slice(k + 1, k + 3));
    const after = () => { if (!stopped) setTimeout(next, 250); };
    if (cloudVoiceReady()) playCloud(text, rate, after, () => { if (!stopped) sayLocal(text, rate, after); });
    else sayLocal(text, rate, after);
  };
  next();
  return () => { stopped = true; stopEn(); };
}

/** Đọc một câu (chép chính tả, nghe câu hỏi) với tốc độ tuỳ chọn. */
export function sayEnRate(text, rate = 0.85) {
  return sayEnSeq([text], { rate });
}
