/**
 * Đọc to từ / cụm tiếng Anh cho bong bóng từ vựng (engine/wordHint.js), giọng Anh–Mỹ của máy.
 * Máy liệt kê giọng mà không có giọng tiếng Anh (hiếm) → đọc bằng dịch vụ đọc của Google Dịch,
 * phát qua <audio> trong iframe "no-referrer" (cùng cách với games/preschool/fx.js).
 */

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

/** Safari iOS chỉ cho đọc sau khi được "mở khoá" trong một lần chạm; gọi trong pointerdown. */
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

let frame = null, player = null;
function sayOnline(text) {
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
    a.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en-US&client=tw-ob&ttsspeed=0.8&q=${encodeURIComponent(text.slice(0, 180))}`;
    a.onended = a.onerror = () => a.remove();
    player = a;
    frame.contentDocument.body.appendChild(a);
    a.play().catch(() => {});
  };
  if (frame.contentDocument?.readyState === 'complete' && frame.contentDocument.body) play();
  else frame.addEventListener('load', play, { once: true });
}

/** Đọc một từ / cụm tiếng Anh, cắt ngang câu đang đọc. */
export function sayEn(text) {
  text = String(text || '').replace(/[’]/g, "'").trim();
  if (!text) return;
  if (!enVoice) pickVoice(); // danh sách giọng có thể tới muộn
  if (!enVoice && !noVoiceList) { sayOnline(text); return; }
  const synth = window.speechSynthesis;
  if (!synth) { sayOnline(text); return; }
  synth.cancel();
  synth.resume(); // Chrome/Edge Android đôi khi kẹt ở trạng thái paused
  const u = new SpeechSynthesisUtterance(text);
  if (enVoice) u.voice = enVoice;
  u.lang = enVoice?.lang || 'en-US';
  u.rate = 0.85; // chậm hơn một chút cho bé nghe rõ
  synth.speak(u);
}

export function stopEn() {
  window.speechSynthesis?.cancel();
  player?.pause(); player?.remove(); player = null;
}
