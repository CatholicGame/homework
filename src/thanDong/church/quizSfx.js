/**
 * Âm thanh game show của trường quay "Ai là môn đệ thông thái": file mp3 trong src/SFX/<nhóm>/<tên>.mp3 (tạo bằng ElevenLabs,
 * prompt và thời lượng trong docs/QuizSfx.md), tải và giải mã sẵn khi vào trường quay (preload). File nào chưa giải mã xong
 * lúc cần thì dùng tiếng tổng hợp Web Audio cũ (synth.*) cho khỏi im; nền lặp (bed) thì chờ tải xong rồi vào.
 * Ba kênh nền, mỗi kênh một tiếng, tiếng mới thay tiếng cũ (mờ dần): 'think' (nhạc suy nghĩ theo độ khó, nhạc chờ bình chọn,
 * đồng hồ 30 giây), 'crowd' (khán phòng rì rầm lúc chưa hỏi), 'music' (nhạc mở màn / người chơi đi lên / kết thúc).
 * Theo âm lượng tiếng động của app (engine/sfx.js, nút 🍃) và tắt tiếng chung (voice.js).
 */
import { sfxVolume } from '../engine/sfx.js';
import { isMuted } from '../engine/voice.js';

// tên file (không đuôi) → url đã băm của Vite
const URLS = Object.fromEntries(Object.entries(import.meta.glob('../SFX/*/*.mp3', { query: '?url', import: 'default', eager: true }))
  .map(([p, u]) => [p.split('/').pop().slice(0, -4), u]));
// nạp trước những tiếng nghe ở mỗi câu hỏi, rồi tới phần còn lại
const FIRST = ['option-pop', 'q-box-open', 'q-sting-easy', 'q-sting-mid', 'q-sting-hard', 'q-sting-final', 'lock-in', 'suspense-drumroll',
  'right', 'wrong', 'wrong-crowd-aww', 'applause-short', 'confetti-burst', 'crowd-hush', 'ui-click', 'ui-confirm', 'ui-deny'];

let ctx = null, out = null, noiseBuf = null;
const bufs = {}, loads = {}, raws = {};
const CLAP_GAIN = 2.6;
/** AudioContext (tạo khi cần, kể cả lúc tắt tiếng, để giải mã trước). */
function base() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14; comp.ratio.value = 5;
    out = ctx.createGain();
    out.connect(comp); comp.connect(ctx.destination);
    const n = ctx.sampleRate * 2;
    noiseBuf = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  }
  return ctx;
}
/** Context để phát: null khi tắt tiếng / âm lượng 0. */
function ac() {
  const v = sfxVolume();
  if (isMuted() || v <= 0 || !base()) return null;
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  out.gain.value = 0.9 * v;
  return ctx;
}
/** Tải (fetch) rồi giải mã một file; trả Promise<AudioBuffer | null>. */
function load(name) {
  if (bufs[name]) return Promise.resolve(bufs[name]);
  if (!URLS[name] || !base()) return Promise.resolve(null);
  raws[name] ||= fetch(URLS[name]).then(r => (r.ok ? r.arrayBuffer() : Promise.reject(r.status)));
  return (loads[name] ||= raws[name]
    .then(b => new Promise((ok, no) => ctx.decodeAudioData(b, ok, no)))
    .then(b => (bufs[name] = b))
    .catch(() => { delete loads[name]; delete raws[name]; return null; }));
}

// tiếng đang phát (để dừng hết khi rời trường quay / tắt bảng)
const live = new Set();
/**
 * Phát file `name`: lv mức, at trễ (giây), rate tốc độ (đổi cao độ), loop lặp, fade mờ vào (giây), len cắt sau len giây (mờ ra 0,6 s).
 * Chưa giải mã xong: nền lặp thì vào khi xong; tiếng ngắn thì chờ tối đa `wait` giây, quá thì gọi fallback (tiếng tổng hợp) ngay.
 * Trả { stop(fade) }.
 */
function play(name, { lv = 0.8, at = 0, rate = 1, loop = false, fade = 0, len = 0, wait = 0.6, fallback } = {}) {
  const h = { stopped: false, src: null, g: null, stop(f = 0.35) {
    h.stopped = true; live.delete(h);
    if (!h.src || !ctx) return;
    const now = ctx.currentTime;
    try {
      h.g.gain.cancelScheduledValues(now);
      h.g.gain.setValueAtTime(Math.max(0.0001, h.g.gain.value), now);
      h.g.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(0.02, f));
      h.src.stop(now + Math.max(0.02, f) + 0.05);
    } catch { /* đã dừng */ }
  } };
  if (!ac()) { h.stopped = true; return h; }
  live.add(h);
  const t0 = ctx.currentTime + at;
  const start = (buf) => {
    if (h.stopped || !ac()) return;
    const now = ctx.currentTime, t = Math.max(t0, now + 0.01);
    const s = ctx.createBufferSource(), g = ctx.createGain();
    s.buffer = buf; s.loop = loop; s.playbackRate.value = rate;
    // tới muộn (đang tải) thì bỏ phần đã lỡ của tiếng ngắn, nền lặp thì vào từ đầu
    const skip = loop ? 0 : Math.max(0, now - t0) * rate;
    if (!loop && skip >= buf.duration - 0.1) { live.delete(h); return; }
    if (fade > 0) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(lv, t + fade); } else g.gain.setValueAtTime(lv, t);
    if (len > 0) { g.gain.setValueAtTime(lv, t + Math.max(fade, len - 0.6)); g.gain.exponentialRampToValueAtTime(0.0001, t + len); }
    s.connect(g); g.connect(out);
    s.start(t, skip);
    if (len > 0) s.stop(t + len + 0.05);
    s.onended = () => { live.delete(h); if (!loop) h.stopped = true; };
    h.src = s; h.g = g;
  };
  if (bufs[name]) { start(bufs[name]); return h; }
  load(name).then(buf => {
    if (h.stopped) return;
    if (buf && (loop || ctx.currentTime - t0 < wait)) start(buf);
    else { live.delete(h); if (fallback && ac()) fallback(Math.max(t0, ctx.currentTime + 0.02)); }
  });
  return h;
}

// kênh nền: một tiếng mỗi kênh
const beds = {};
function bed(ch, name, o = {}) {
  if (beds[ch]?.name === name && !beds[ch].h.stopped) return beds[ch].h;
  beds[ch]?.h.stop(o.out ?? 0.8);
  if (!name) { delete beds[ch]; return null; }
  const h = play(name, { loop: true, fade: 1, lv: 0.25, ...o });
  beds[ch] = { name, h };
  return h;
}
const bedOn = (ch) => beds[ch] && !beds[ch].h.stopped ? beds[ch].name : null;
const tier = (n) => (n >= 15 ? 'final' : n >= 11 ? 'hard' : n >= 6 ? 'mid' : 'easy');
const hz = (m) => 440 * 2 ** ((m - 69) / 12);   // số nốt MIDI → Hz

/** Một nốt: dạng sóng, cao độ, lúc bắt đầu, độ dài, mức, lọc thấp. */
function note(type, m, t, dur, lv = 0.2, cut = 4000, dest = out) {
  const o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
  o.type = type; o.frequency.value = typeof m === 'number' && m < 200 ? hz(m) : m;
  f.type = 'lowpass'; f.frequency.value = cut;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(lv, t + 0.015);
  g.gain.setValueAtTime(lv, t + dur * 0.6);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(f); f.connect(g); g.connect(dest);
  o.start(t); o.stop(t + dur + 0.05);
  return o;
}
/** Tiếng ồn qua lọc: kiểu, tần số từ → tới, lúc, độ dài, mức. */
function hiss(type, f0, f1, t, dur, lv, q = 1) {
  const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  s.buffer = noiseBuf; s.loop = true;
  f.type = type; f.Q.value = q;
  f.frequency.setValueAtTime(f0, t);
  f.frequency.exponentialRampToValueAtTime(f1, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(lv, t + dur * 0.7);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f); f.connect(g); g.connect(out);
  s.start(t, Math.random()); s.stop(t + dur + 0.05);
}
/** Tràng vỗ tay tổng hợp lúc t (dự phòng khi chưa có file): nhiều tiếng vỗ ngắn ngẫu nhiên, mau rồi thưa dần. */
function synthApplause(t, dur, lv = 0.5) {
  const n = Math.round(dur * 55);
  for (let i = 0; i < n; i++) {
    const at = t + dur * Math.pow(Math.random(), 1.6);
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noiseBuf;
    f.type = 'bandpass'; f.frequency.value = 900 + Math.random() * 1600; f.Q.value = 1.4;
    const k = lv * (0.4 + Math.random() * 0.6) * (1 - (at - t) / dur * 0.7);
    g.gain.setValueAtTime(k, at);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.03 + Math.random() * 0.03);
    s.connect(f); f.connect(g); g.connect(out);
    s.start(at, Math.random() * 1.5); s.stop(at + 0.08);
  }
  hiss('bandpass', 700, 1100, t, dur, lv * 0.18, 0.6);
}


// tiếng tổng hợp cũ, dùng khi file chưa giải mã kịp (t: lúc bắt đầu, theo ctx.currentTime)
const synth = {
  sting(t) {
    hiss('bandpass', 300, 5000, t, 0.7, 0.35, 2);
    note('sine', 60, t + 0.68, 0.5, 0.5, 300);
    note('sine', 36, t + 0.68, 0.9, 0.35, 200);
    for (const m of [57, 60, 64, 69]) note('sawtooth', m, t + 0.7, 1.6, 0.06, 1800);
    note('triangle', 81, t + 0.7, 1.2, 0.08, 6000);
  },
  pop(t, i) {
    const m = [76, 79, 83, 88][i] || 76;
    note('sine', m, t, 0.5, 0.22, 8000);
    note('triangle', m + 12, t, 0.25, 0.06, 9000);
    hiss('highpass', 4000, 8000, t, 0.12, 0.05);
  },
  tension(t, sec) {
    for (let b = 0; b < sec / 0.6; b++) { note('sine', 55, t + b * 0.6, 0.18, 0.5, 200); note('sine', 52, t + b * 0.6 + 0.17, 0.2, 0.35, 200); }
    note('sawtooth', 45, t, sec + 0.3, 0.05, 500);
    note('sawtooth', 46, t, sec + 0.3, 0.035, 500);
  },
  right(t) {
    [72, 76, 79, 84].forEach((m, i) => { note('square', m, t + i * 0.09, 0.22, 0.07, 3500); note('triangle', m, t + i * 0.09, 0.3, 0.1); });
    for (const m of [72, 76, 79, 84, 88]) note('sawtooth', m, t + 0.38, 1.3, 0.05, 4000);
    note('sine', 48, t + 0.38, 0.6, 0.4, 300);
    hiss('highpass', 6000, 9000, t + 0.38, 1.2, 0.08);
  },
  wrong(t) {
    [[52, 0], [47, 0.42]].forEach(([m, d]) => {
      const o = note('sawtooth', m, t + d, 0.55, 0.16, 900);
      o.frequency.exponentialRampToValueAtTime(hz(m - 2), t + d + 0.5);
      note('square', m - 12, t + d, 0.55, 0.08, 600);
    });
    note('sine', 40, t, 1, 0.3, 200);
  },
  help(t) {
    hiss('bandpass', 600, 6000, t, 0.5, 0.25, 3);
    [74, 79, 81, 86].forEach((m, i) => note('triangle', m, t + 0.3 + i * 0.06, 0.6, 0.08, 7000));
    for (const m of [62, 67, 69]) note('sawtooth', m, t + 0.35, 1.2, 0.04, 2200);
  },
  cut(t) {
    hiss('bandpass', 5000, 400, t, 0.35, 0.3, 2);
    note('sine', 43, t + 0.25, 0.4, 0.4, 250);
  },
  result(t) {
    for (let i = 0; i < 10; i++) hiss('bandpass', 1800, 1500, t + i * 0.055, 0.05, 0.12 + i * 0.02, 1.2);
    note('sine', 84, t + 0.6, 0.7, 0.2, 9000);
    note('triangle', 72, t + 0.6, 0.7, 0.12, 6000);
  },
  tick(t, urgent) { note(urgent ? 'square' : 'sine', urgent ? 88 : 81, t, 0.08, urgent ? 0.1 : 0.14, 6000); },
  win(t) {
    [67, 72, 76, 79, 76, 79, 84].forEach((m, i) => { note('square', m, t + i * 0.13, 0.3, 0.07, 3500); note('triangle', m, t + i * 0.13, 0.35, 0.1); });
    for (const m of [60, 67, 72, 76, 79, 84]) note('sawtooth', m, t + 0.95, 2.4, 0.045, 4500);
    note('sine', 36, t + 0.95, 1.2, 0.5, 250);
    hiss('highpass', 5000, 9000, t + 0.95, 2.2, 0.1);
  },
};

/** Tràng vỗ tay dur giây sau at giây: ngắn → applause-short, vừa → applause-rhythmic (vỗ theo nhịp rồi reo), dài → applause. */
function clapFor(dur, at = 0, lv = 0.85) {
  const name = dur <= 4.2 ? 'applause-short' : dur <= 6.5 ? 'applause-rhythmic' : 'applause';
  play(name, { at, len: dur, fade: 0.2, lv: name === 'applause' ? lv * 0.45 * CLAP_GAIN : lv, wait: 1, fallback: (t) => synthApplause(t, dur, 0.5) });
}
// nhạc suy nghĩ của câu n (câu 15 dùng bản khó nhất), vào sau at giây
const think = (n, at) => bed('think', `think-bed-${tier(n) === 'final' ? 'hard' : tier(n)}`, { lv: 0.18, fade: 2, at, out: 0.4 });

export const quizSfx = {
  /** Tải và giải mã sẵn mọi file (những tiếng của mỗi câu hỏi trước), lần lượt từng file cho nhẹ mạng. */
  preload() {
    if (!base()) return;
    const rest = Object.keys(URLS).filter(n => !FIRST.includes(n));
    [...FIRST, ...rest].reduce((p, n) => p.then(() => load(n)), Promise.resolve());
  },
  /** Dừng mọi tiếng (tắt bảng, rời trường quay). */
  stopAll() {
    for (const ch of Object.keys(beds)) bed(ch, null, { out: 0.3 });
    for (const h of [...live]) h.stop(0.3);
  },

  // ---- mở màn, người chơi
  /** MC mở chương trình: nhạc hiệu to lúc đầu rồi lùi xuống dưới lời MC; khán phòng thôi rì rầm. */
  intro() {
    bed('crowd', null);
    const h = bed('music', 'show-intro', { loop: false, lv: 0.7, fade: 0.05 });
    setTimeout(() => { if (h?.g && !h.stopped) h.g.gain.setTargetAtTime(0.25, ctx.currentTime, 0.8); }, 2500);
  },
  /** Hết buổi: nhạc kết. */
  outro() { bed('think', null); bed('music', 'show-outro', { loop: false, lv: 0.6, fade: 0.05 }); },
  /** Nhạc hiệu ngắn chào khán giả. */
  welcome() { play('welcome-sting', { lv: 0.7 }); },
  /** Người chơi đi lên sân khấu: nhạc đi lên (thay nhạc hiệu nếu còn), đèn quét. */
  walkup() { bed('music', 'player-walkup', { loop: false, lv: 0.45, fade: 0.1 }); play('lights-sweep', { lv: 0.5, at: 0.2 }); },
  /** Người chơi ngồi vào ghế nóng: tiếng trầm, đèn hạ. */
  hotSeat() { bed('music', null, { out: 1.2 }); play('hotseat-sit', { lv: 0.7 }); },
  /** Người kế tiếp vào ghế chờ. */
  waitSeat() { play('waiting-seat', { lv: 0.45 }); },
  /** Khán phòng rì rầm (lúc chưa hỏi) bật / tắt. */
  crowd(on) { bed('crowd', on ? 'crowd-murmur' : null, { lv: 0.16, fade: 2, out: 1 }); },

  // ---- câu hỏi
  /** Câu hỏi thứ n (1..15) hiện ra: khán phòng im, nhạc hiệu theo độ khó, khung câu hỏi bung ra, rồi nhạc suy nghĩ. */
  sting(n = 1) {
    if (bedOn('crowd')) { play('crowd-hush', { lv: 0.4 }); bed('crowd', null, { out: 1.2 }); }
    bed('music', null, { out: 0.6 });
    bed('think', null, { out: 0.4 });
    play(`q-sting-${tier(n)}`, { lv: 0.75, fallback: (t) => synth.sting(t) });
    play('q-box-open', { lv: 0.45, at: 0.75 });   // church.css: khung câu hỏi (qov-unfold) mở sau 0,75 s
    think(n, n >= 15 ? 5 : 3);
  },
  /** Một phương án bật ra: ding, cao dần theo A, B, C, D (0, 3, 7, 12 nửa cung). */
  pop(i = 0) {
    const semi = [0, 3, 7, 12][i] || 0;
    play('option-pop', { lv: 0.55, rate: 2 ** (semi / 12), fallback: (t) => synth.pop(t, i) });
  },

  // ---- chốt
  /** Chốt đáp án: tiếng khoá, trống dồn; câu khó (11+) thêm tim đập và khán phòng ồ lên. Trả hàm dừng. */
  tension(sec = 2.5, n = 1) {
    bed('think', null, { out: 0.3 });
    const hs = [play('lock-in', { lv: 0.7 }), play('suspense-drumroll', { lv: 0.6, at: 0.4, len: sec, fallback: (t) => synth.tension(t, sec) })];
    if (n >= 11) hs.push(play('heartbeat-loop', { lv: 0.5, loop: true, fade: 0.3 }), play('crowd-gasp', { lv: 0.35, at: 0.2 }));
    return () => hs.forEach(h => h.stop(0.15));
  },

  // ---- kết quả
  /** Đúng: kèn đúng + vỗ tay; câu mốc 5 và 10: kèn mừng lớn + khán giả reo. */
  right(n = 1) {
    bed('think', null, { out: 0.2 });
    if (n === 5 || n === 10) {
      play('right-milestone', { lv: 0.8, fallback: (t) => synth.right(t) });
      play('crowd-cheer', { lv: 0.6, at: 0.4 });
    } else {
      play('right', { lv: 0.8, fallback: (t) => synth.right(t) });
      clapFor(3.2, 0.3);
    }
    play('confetti-burst', { lv: 0.5, at: 0.15 });
  },
  /** Sai: hai nốt buồn, khán giả "ồ" tiếc, đèn tắt dần (lúc đèn chuyển sang 'sad'). */
  wrong() {
    bed('think', null, { out: 0.2 });
    play('wrong', { lv: 0.75, fallback: (t) => synth.wrong(t) });
    play('wrong-crowd-aww', { lv: 0.5, at: 0.6 });
    play('lights-down', { lv: 0.45, at: 1.6 });   // studio.js MODES.wrong: dur 1,6 rồi 'sad'
  },
  /** Thắng cả 15 câu: kèn chiến thắng, khán giả reo, vỗ tay dài, pháo giấy. */
  win() {
    bed('think', null, { out: 0.2 });
    play('win', { lv: 0.85, fallback: (t) => synth.win(t) });
    play('confetti-burst', { lv: 0.55, at: 0.2 });
    play('crowd-cheer', { lv: 0.55, at: 0.6 });
    clapFor(8, 1.2, 0.7);
  },
  /** Tràng vỗ tay riêng (MC xin pháo tay chào người chơi). */
  clap(dur = 3.5) { clapFor(dur); },

  // ---- trợ giúp
  /** Dùng một quyền trợ giúp. */
  help() { play('help-use', { lv: 0.6, fallback: (t) => synth.help(t) }); },
  /** Bỏ qua câu hỏi. */
  skip() { bed('think', null, { out: 0.3 }); play('skip', { lv: 0.6, fallback: (t) => synth.help(t) }); },
  /** 50:50: tiếng dùng quyền, rồi hai phương án sai bị loại. */
  cut() { quizSfx.help(); play('fifty-cut', { lv: 0.6, at: 0.5, fallback: (t) => synth.cut(t) }); },
  /** Khán giả bắt đầu bình chọn: tiếng mở, nhạc chờ bình chọn thay nhạc suy nghĩ. */
  poll() { play('poll-start', { lv: 0.6, fallback: (t) => synth.help(t) }); bed('think', 'poll-bed', { lv: 0.3, fade: 0.5, at: 1.2, out: 0.4 }); },
  /** Có kết quả (bình chọn xong / người thân trả lời): trống dồn và chuông, rồi lại nhạc suy nghĩ của câu n. */
  result(n = 1) {
    bed('think', null, { out: 0.3 });
    play('poll-result', { lv: 0.65, fallback: (t) => synth.result(t) });
    think(n, 2.5);
  },
  /** Gọi điện cho người thân: chuông gọi, đồng hồ 30 giây (cuối có còi riêng). */
  phone() {
    play('phone-dial', { lv: 0.55, fallback: (t) => synth.help(t) });
    bed('think', 'clock-30s', { loop: false, lv: 0.45, fade: 0.05, out: 0.2 });
  },
  /** Hết giờ gọi: đồng hồ đã có còi; chưa có file đồng hồ thì còi hết giờ. Rồi lại nhạc suy nghĩ của câu n. */
  timeUp(n = 1) {
    const clock = bedOn('think') === 'clock-30s' && beds.think.h.src;
    bed('think', null, { out: 0.2 });
    if (!clock) play('time-up', { lv: 0.6 });
    think(n, 1.5);
  },
  /** Người thân ngồi dưới khán phòng: đèn rọi bật, khán phòng xôn xao. */
  spotlight() { play('relative-spotlight', { lv: 0.6, fallback: (t) => synth.help(t) }); },
  /** Tích tắc đếm lùi (chỉ khi chưa có file đồng hồ); urgent: 3 giây cuối. */
  tick(urgent = false) {
    if (bedOn('think') === 'clock-30s' || !ac()) return;
    synth.tick(ctx.currentTime + 0.01, urgent);
  },

  // ---- dùng chung cho chương trình khác (Đấu Trường Nhí, src/dauTruong/arenaSfx.js): phát thẳng một file của kho SFX
  /** Một file: cùng tuỳ chọn với play() (lv, at, rate, loop, fade, len, fallback). Trả { stop(fade) }. */
  raw(name, o) { return play(name, o); },
  /** Kênh nền `ch` ('think' | 'crowd' | 'music'): đổi sang file `name` (null = tắt). */
  bed(ch, name, o) { return bed(ch, name, o); },
  /** Kho có file này chưa (tiếng mới chưa tạo thì gọi tiếng thay). */
  has(name) { return !!URLS[name]; },

  // ---- sơ đồ chọn ghế
  click() { play('ui-click', { lv: 0.4 }); },
  confirm() { play('ui-confirm', { lv: 0.5 }); },
  deny() { play('ui-deny', { lv: 0.45 }); },
};
