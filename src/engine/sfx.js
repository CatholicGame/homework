/**
 * Tiếng động dùng chung (file trong src/assets/sfx, tạo bằng ElevenLabs).
 * Một AudioContext cho cả app: phát qua Web Audio chứ không dùng thẻ <audio>, vì iPad chặn
 * audio.play() trong pointerdown và thẻ <audio> trễ vài chục ms với tiếng chạm.
 *
 * playSfx() trả về false khi file chưa giải mã xong (lần chạm đầu, mạng chậm, lỗi tải);
 * nơi gọi khi đó phát tiếng tổng hợp cũ: `playSfx('tap') || tone(...)`.
 */

const url = (f) => new URL(`../assets/sfx/${f}`, import.meta.url).href;

/** Tiếng ngắn: tải sẵn ngay khi trang rảnh. */
const SHORT = {
  tap: url('tap.wav'),
  pop: url('pop.wav'),
  tick: url('tick.wav'),
  step: url('step.mp3'),
  swish: url('swish.mp3'),
  zap: url('zap.wav'),
  sharkIn: url('shark-in.wav'),
  sharkNear: url('shark-near.wav'),
  chomp: url('shark-chomp.wav'),
  // 🛸 Bảo vệ Trái Đất (gốc: docs/sfx/zip zap/, xử lý xem docs/sfx/PROMPTS.md)
  ufoIn: url('ufo-in.wav'),
  ufoNear: url('ufo-near.wav'),
  ufoLoad: url('ufo-load.wav'),
  laser: url('laser.wav'),
  shieldBreak: url('shield-break.wav'),
  deflect: url('deflect.wav'),
  ufoAway: url('ufo-away.wav'),
  numberHome: url('number-home.wav'),
  domeHit: url('dome-hit.wav'),
  radarAlarm: url('radar-alarm.wav'),
  piece: url('piece.mp3'),
  correct: url('correct.mp3'),
  wrong: url('wrong.mp3'),
  bump: url('bump.mp3'),
  complete: url('complete.mp3'),
};
/** Tiếng dài, ít dùng: chỉ tải khi cần lần đầu. */
const LONG = {
  whoosh: url('whoosh-long.mp3'),
  confetti: url('confetti.mp3'),
  wheelSpin: url('wheel-spin.mp3'),
  carLoop: url('car-loop.wav'),
  oceanLoop: url('ocean-loop.wav'),
  spaceLoop: url('space-loop.wav'),
  motherIn: url('mother-in.wav'),
  fireworks: url('fireworks.wav'),
};
const URLS = { ...SHORT, ...LONG };

let ctx = null;
const raw = {};      // name → Promise<ArrayBuffer>
const buffers = {};  // name → AudioBuffer
const decoding = {}; // name → Promise<AudioBuffer|null>

// Tên chưa có file (tiếng mới chưa tạo xong): không tải, nơi gọi phát tiếng tổng hợp thay.
const fetchRaw = (name) => (!URLS[name] ? Promise.resolve(null) : raw[name] || (raw[name] = fetch(URLS[name])
  .then(r => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(r.status))))
  .catch(() => { delete raw[name]; return null; })));

function decode(name) {
  if (buffers[name]) return Promise.resolve(buffers[name]);
  if (decoding[name]) return decoding[name];
  const c = ctx;
  if (!c) return Promise.resolve(null);
  decoding[name] = fetchRaw(name)
    // decodeAudioData lấy mất ArrayBuffer, nên giải mã một bản sao
    .then(data => data && new Promise((ok, no) => c.decodeAudioData(data.slice(0), ok, no)))
    .then(b => { if (b) buffers[name] = b; return b || null; })
    .catch(() => null)
    .finally(() => { delete decoding[name]; });
  return decoding[name];
}

/** AudioContext dùng chung (tạo lần đầu, đánh thức nếu đang ngủ); null khi trình duyệt không có. */
export function audioCtx() {
  try {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      Object.keys(SHORT).forEach(decode);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  } catch { return null; }
}

/**
 * Phát một tiếng. opts.rate: tốc độ (cao/thấp giọng), opts.vol: âm lượng 0..1.
 * Trả về true nếu đã phát bằng file.
 */
export function playSfx(name, { rate = 1, vol = 1 } = {}) {
  const c = audioCtx();
  if (!c) return true; // không có âm thanh: đừng bắt nơi gọi thử tiếng tổng hợp nữa
  const buf = buffers[name];
  if (!buf) { decode(name); return false; }
  const src = c.createBufferSource();
  src.buffer = buf;
  src.playbackRate.value = rate;
  let out = src;
  if (vol !== 1) {
    const g = c.createGain();
    g.gain.value = vol;
    out = src.connect(g);
  }
  out.connect(c.destination);
  src.start();
  return true;
}

/** Như playSfx nhưng chờ file giải mã xong rồi mới phát (cho tiếng không có bản tổng hợp thay thế). */
export function playSfxSoon(name, opts) {
  if (!audioCtx()) return Promise.resolve(false);
  return decode(name).then(b => !!b && playSfx(name, opts));
}

/** Tải trước file (vd. khi mở trang vòng quay), để lần phát đầu không bị trễ. */
export function preloadSfx(...names) {
  names.forEach(n => (ctx ? decode(n) : fetchRaw(n)));
}

/** Tiếng lặp (vd. máy ô tô); start() khi file chưa tải xong thì phát ngay khi tải xong. */
export function loopSfx(name, { vol = 1 } = {}) {
  let src = null, gain = null, want = false;
  const begin = () => {
    const c = ctx, buf = buffers[name];
    if (!want || src || !c || !buf) return;
    gain = c.createGain();
    gain.gain.value = vol;
    src = c.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    src.connect(gain).connect(c.destination);
    src.start();
  };
  return {
    start() {
      want = true;
      if (!audioCtx()) return;
      if (buffers[name]) begin(); else decode(name).then(begin);
    },
    /** Hạ nhỏ còn level × âm lượng trong ms mili giây rồi lên lại (nhường chỗ cho giọng đọc). */
    duck(level = 0.35, ms = 2000) {
      const c = ctx;
      if (!gain || !c) return;
      const g = gain.gain, t = c.currentTime;
      g.cancelScheduledValues(t);
      g.setValueAtTime(g.value, t);
      g.linearRampToValueAtTime(vol * level, t + 0.15);
      g.setValueAtTime(vol * level, t + ms / 1000);
      g.linearRampToValueAtTime(vol, t + ms / 1000 + 0.6);
    },
    stop() {
      want = false;
      if (!src) return;
      try { src.stop(); } catch { /* đã dừng */ }
      src.disconnect(); gain.disconnect();
      src = gain = null;
    },
  };
}

// Tải sẵn file tiếng ngắn khi trang rảnh (chưa giải mã: cần AudioContext, mà nó chỉ nên tạo sau lần chạm đầu).
if (typeof window !== 'undefined') {
  const warm = () => Object.keys(SHORT).forEach(fetchRaw);
  if ('requestIdleCallback' in window) requestIdleCallback(warm, { timeout: 4000 });
  else setTimeout(warm, 1500);
}
