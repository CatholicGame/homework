/**
 * 🎤 Nghe bé nói tiếng Anh (phần 🎤 Nói của Đọc tiếng Anh).
 * Có nhận dạng giọng nói của trình duyệt (Chrome, Edge, Safari iPad / iPhone): listenEn() trả chữ máy nghe được.
 * Không có (Firefox…): recordEn() ghi âm để bé nghe lại giọng mình rồi tự đánh giá.
 */
const SR = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);

export const canRecognize = () => !!SR;
export const canRecord = () => typeof window !== 'undefined' && !!navigator.mediaDevices?.getUserMedia && 'MediaRecorder' in window;

/**
 * Nghe một lượt nói.
 * long = true (kể lại): máy dừng sau một quãng lặng thì tự nghe tiếp, ghép các đoạn, tới khi bé bấm dừng hoặc quá maxMs.
 * onText(chữ đang nghe) gọi liên tục; onEnd({ text, alts, error }) gọi một lần.
 * alts: các cách nghe khác của đoạn cuối (để chấm rộng tay, máy hay nghe nhầm giọng trẻ).
 * @returns {() => void} dừng (vẫn gọi onEnd với chữ đã nghe được)
 */
export function listenEn({ long = false, maxMs = long ? 90_000 : 20_000, onText, onEnd } = {}) {
  if (!SR) { onEnd?.({ text: '', alts: [], error: 'unsupported' }); return () => {}; }
  let done = '', alts = [], stopped = false, ended = false, rec = null, heard = false;
  const finish = (error) => {
    if (ended) return;
    ended = true;
    clearTimeout(timer);
    onEnd?.({ text: done.trim(), alts, error: heard ? null : error || null });
  };
  const start = () => {
    rec = new SR();
    rec.lang = 'en-US';
    rec.interimResults = true;
    rec.maxAlternatives = 3;
    rec.continuous = false; // Chrome Android lặp chữ khi continuous, nên nghe từng đoạn rồi ghép
    let part = '', error = null;
    rec.onresult = (e) => {
      part = '';
      for (let i = 0; i < e.results.length; i++) part += `${e.results[i][0].transcript} `;
      const last = e.results[e.results.length - 1];
      if (last.isFinal) alts = [...last].slice(1).map((a) => a.transcript);
      if (part.trim()) heard = true;
      onText?.(`${done} ${part}`.replace(/\s+/g, ' ').trim());
    };
    rec.onerror = (e) => { error = e.error; };
    rec.onend = () => {
      done = `${done} ${part}`;
      // Lặng một lúc: câu ngắn thì xong; kể lại thì nghe tiếp (trừ khi lỗi quyền / mạng hoặc bé đã bấm dừng)
      if (long && !stopped && !['not-allowed', 'service-not-allowed', 'network', 'audio-capture'].includes(error)) {
        try { start(); return; } catch { /* trình duyệt không cho nghe lại ngay */ }
      }
      finish(error);
    };
    rec.start();
  };
  const timer = setTimeout(() => stop(), maxMs);
  try { start(); } catch { finish('start'); }
  function stop() {
    if (stopped) return;
    stopped = true;
    try { rec?.stop(); } catch { finish(); }
  }
  return stop;
}

/**
 * Ghi âm một lượt (khi không nhận dạng được giọng nói). onEnd({ url, error }), url là blob để phát lại.
 * @returns {Promise<() => void>} dừng ghi
 */
export async function recordEn({ maxMs = 60_000, onEnd } = {}) {
  let stream;
  try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch {
    onEnd?.({ url: null, error: 'not-allowed' });
    return () => {};
  }
  const chunks = [];
  const mr = new MediaRecorder(stream);
  mr.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
  mr.onstop = () => {
    stream.getTracks().forEach((t) => t.stop());
    clearTimeout(timer);
    onEnd?.({ url: chunks.length ? URL.createObjectURL(new Blob(chunks, { type: mr.mimeType })) : null, error: null });
  };
  mr.start();
  const timer = setTimeout(() => stop(), maxMs);
  function stop() { if (mr.state !== 'inactive') mr.stop(); }
  return stop;
}
