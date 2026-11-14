// Trình chiếu video dọc "Giới thiệu Toán Tiểu Học" (TikTok): 10 đoạn (scenes.js) → màn kết.
// Mỗi đoạn: chữ lớn, điện thoại chiếu đoạn quay thật / ảnh chụp thật của app, lời đọc từng câu = phụ đề.
// ?shot=<đoạn từ 0>[.<giây>] | end : dựng tĩnh để chụp ảnh kiểm tra. ?obs : chạy trong nguồn Browser của OBS (?obs=tu-noi: tắt giọng AI).
import { SEGMENTS, END, GRADES } from './scenes.js';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const lineOf = (l) => (typeof l === 'string' ? { text: l } : l);
const params = new URLSearchParams(location.search);

/* ───────────── Tạm dừng / chờ ───────────── */
let paused = false;
const wait = (ms) => new Promise(res => {
  let left = ms, last = performance.now();
  const tick = () => {
    const now = performance.now();
    if (!paused) left -= now - last;
    last = now;
    if (left <= 0) res(); else setTimeout(tick, 30);
  };
  tick();
});

/** Dựng một đoạn: trả về { el, videos }. */
function buildSeg(seg) {
  const el = document.createElement('div');
  el.className = 'seg';
  el.innerHTML = `<div class="head">${seg.head.map(h => `<div>${esc(h)}</div>`).join('')}</div>`;
  const videos = [];
  for (const it of seg.items) {
    const box = document.createElement('div');
    box.className = 'it';
    box.style.cssText = `left:${it.x}%;top:${it.y}%;width:${it.w}cqw;--rot:${it.rot || 0}deg;--z:${it.z || 0};--d:${it.d || 0}s`;
    const inner = document.createElement('div');
    inner.className = 'in';
    box.append(inner);
    if (it.kind === 'clip') {
      inner.innerHTML = `<div class="phone vid"><div class="notch"></div><div class="scr"><video muted playsinline loop preload="auto" src="${it.src}"></video></div></div>`;
      const v = inner.querySelector('video');
      v.dataset.rate = it.rate || 1;
      v.dataset.d = it.d || 0;
      videos.push(v);
    } else if (it.kind === 'screen') {
      inner.innerHTML = `<div class="phone"><div class="notch"></div><div class="scr">
        <img class="long" src="${it.src}" alt="">${it.tap ? `<div class="tap" style="left:${it.tap[0]}%;top:${it.tap[1]}%;--tap-d:${it.tap[2]}s"></div>` : ''}</div></div>`;
      inner.querySelector('img').dataset.scroll = it.scroll || 0;
    } else if (it.kind === 'grades') {
      inner.innerHTML = `<div class="grades">${GRADES.map(([n, c], i) => `<i style="background:${c};transition-delay:${0.8 + i * 0.16}s">${n}</i>`).join('')}</div>`;
    } else if (it.kind === 'cta') {
      inner.innerHTML = `<div class="cta"><div class="hs phone"><div class="notch"></div><div class="scr">
        <div class="grid">${'<i></i>'.repeat(16)}</div>
        <div class="app"><img src="/icons/icon-192.png" alt="">Toán Tiểu Học</div></div></div>
        <div class="pill">Học cùng con mỗi tối</div></div>`;
    }
    el.append(box);
  }
  return { el, videos };
}

const scrollTo = (img, animate) => {
  const h = img.clientHeight, box = img.parentElement.clientHeight;
  if (!animate) img.style.transition = 'none';
  img.style.transform = `translateY(${-Math.max(0, Math.min(h - box, h * +img.dataset.scroll))}px)`;
};

/** Bắt đầu chuyển động của đoạn: cuộn ảnh chụp, chạy đoạn quay. */
function startSeg(el, videos, dur) {
  el.querySelectorAll('img.long').forEach(img => {
    const go = () => { img.style.setProperty('--scroll-t', `${Math.max(4, dur - 2)}s`); scrollTo(img, true); };
    if (img.complete) requestAnimationFrame(go); else img.onload = go;
  });
  videos.forEach(v => {
    v.currentTime = 0;
    v.playbackRate = +v.dataset.rate;
    wait(+v.dataset.d * 1000 + 300).then(() => v.play().catch(() => {}));
  });
}

/* ───────────── Giọng đọc: mp3 AI (Azure, tts.mjs), thiếu thì giọng tiếng Việt của máy ───────────── */
const AI = await fetch(new URL('./audio/index.json', import.meta.url)).then(r => (r.ok ? r.json() : {})).catch(() => ({}));
const clips = Object.fromEntries(Object.entries(AI).map(([t, f]) => {
  const a = new Audio(new URL(`./audio/${f}`, import.meta.url).href);
  a.preload = 'auto';
  return [t, a];
}));
const aiReady = Object.keys(clips).length > 0;
const RATE = 1.12;
let curAudio = null, vSys = null;
function pickVoices() {
  if (aiReady) { $('#voiceInfo').textContent = 'Giọng đọc AI: Azure'; return; }
  const vi = speechSynthesis.getVoices().filter(v => /^vi/i.test(v.lang));
  vSys = vi.find(v => /HoaiMy/i.test(v.name)) || vi[0] || null;
  $('#voiceInfo').textContent = vSys ? `Giọng máy: ${vSys.name} (chạy node tts.mjs để có giọng Azure)` : 'Máy chưa có giọng tiếng Việt: video chỉ có phụ đề và nhạc.';
}
if (aiReady) pickVoices();
else if ('speechSynthesis' in window) { pickVoices(); speechSynthesis.onvoiceschanged = pickVoices; }

function speak(line) {
  const { text, say } = lineOf(line);
  if (!$('#voiceOn').checked) return Promise.resolve();
  const clip = clips[text];
  if (clip) {
    return new Promise(res => {
      let done = false;
      const end = () => { if (!done) { done = true; curAudio = null; res(); } };
      clip.currentTime = 0;
      clip.playbackRate = RATE;
      clip.onended = end; clip.onerror = end;
      curAudio = clip;
      clip.play().catch(end);
    });
  }
  if (!vSys) return Promise.resolve();
  return new Promise(res => {
    const u = new SpeechSynthesisUtterance(say || text);
    u.voice = vSys; u.lang = vSys.lang; u.rate = 1.05;
    let done = false;
    const end = () => { if (!done) { done = true; res(); } };
    u.onend = end; u.onerror = end;
    setTimeout(end, 4000 + text.length * 150);
    speechSynthesis.speak(u);
  });
}

/* ───────────── Nhạc nền vui tươi: C–G–Am–F, piano rải, pad, giai điệu chuông ───────────── */
const music = (() => {
  let ac, out, timer, bar = 0, nextT = 0, level = 0;
  const BEAT = 60 / 100;
  const mtof = (m) => 440 * 2 ** ((m - 69) / 12);
  const CH = [[48, [60, 64, 67]], [43, [59, 62, 67]], [45, [60, 64, 69]], [41, [60, 65, 69]]];
  const MEL = [[79, 76, 72, 76], [74, 71, 74, 79], [76, 72, 69, 72], [77, 72, 69, 72]];
  function impulse(sec) {
    const len = ac.sampleRate * sec, b = ac.createBuffer(2, len, ac.sampleRate);
    for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3; }
    return b;
  }
  function note(m, t, v, dur = 1.6, type = 'triangle') {
    const g = ac.createGain(), o1 = ac.createOscillator(), o2 = ac.createOscillator(), g2 = ac.createGain();
    o1.type = type; o1.frequency.value = mtof(m);
    o2.type = 'sine'; o2.frequency.value = mtof(m) * 2; g2.gain.value = 0.3;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o1.connect(g); o2.connect(g2).connect(g); g.connect(out);
    o1.start(t); o2.start(t); o1.stop(t + dur + 0.1); o2.stop(t + dur + 0.1);
  }
  function pad(notes, t, dur, v) {
    const g = ac.createGain(), f = ac.createBiquadFilter();
    f.type = 'lowpass'; f.frequency.value = 900;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + 0.8); g.gain.setValueAtTime(v, t + dur - 0.4); g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.8);
    f.connect(g).connect(out);
    notes.forEach(m => [-6, 6].forEach(det => { const o = ac.createOscillator(); o.type = 'sawtooth'; o.frequency.value = mtof(m); o.detune.value = det; o.connect(f); o.start(t); o.stop(t + dur + 1); }));
  }
  function schedule() {
    while (nextT < ac.currentTime + 0.5) {
      const [bass, ch] = CH[bar % 4], t = nextT;
      pad(ch, t, BEAT * 4, 0.014);
      note(bass, t, 0.16, 1.8); note(bass, t + BEAT * 2, 0.11, 1.4); note(bass + 7, t + BEAT * 3, 0.07, 0.9);
      [0, 1, 2, 1, 0, 1, 2, 1].forEach((j, i) => note(ch[j] + (i > 3 ? 12 : 0), t + i * BEAT / 2, i % 2 ? 0.03 : 0.045, 0.9));
      if (level >= 1) MEL[bar % 4].forEach((m, i) => note(m, t + i * BEAT, 0.045, 1.2, 'sine'));
      nextT += BEAT * 4; bar++;
    }
  }
  return {
    start() {
      if (!$('#musicOn').checked) return;
      ac = new AudioContext();
      const master = ac.createGain(); master.gain.value = 0.8; master.connect(ac.destination);
      const rev = ac.createConvolver(); rev.buffer = impulse(2.2);
      const wet = ac.createGain(); wet.gain.value = 0.35; rev.connect(wet).connect(master);
      out = ac.createGain(); out.gain.value = 0.0001;
      const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 4200;
      out.connect(lp); lp.connect(master); lp.connect(rev);
      out.gain.exponentialRampToValueAtTime(1, ac.currentTime + 1.5);
      nextT = ac.currentTime + 0.05;
      timer = setInterval(schedule, 120); schedule();
    },
    level(l) { level = l; },
    duck(on) { if (ac) out.gain.setTargetAtTime(on ? 0.45 : 1, ac.currentTime, 0.25); },
    pause(p) { if (ac) (p ? ac.suspend() : ac.resume()); },
    fade(sec) { if (!ac) return; out.gain.cancelScheduledValues(ac.currentTime); out.gain.setTargetAtTime(0.0001, ac.currentTime, sec / 4); setTimeout(() => { clearInterval(timer); ac?.close(); ac = null; }, sec * 1000 + 300); },
  };
})();

/* ───────────── Chạy ───────────── */
const segs = $('#segs');
let curVideos = [];

async function say(line) {
  const { text } = lineOf(line);
  const cap = $('#capText');
  cap.classList.remove('on');
  await wait(140);
  cap.textContent = text;
  cap.classList.add('on');
  music.duck(true);
  await Promise.all([speak(line), wait(500 + text.length * 32)]);
  music.duck(false);
  await wait(120);
}

/** Thời lượng ước chừng của đoạn (giây) để đặt tốc độ cuộn. */
const estimate = (seg) => seg.lines.reduce((s, l) => s + (clips[lineOf(l).text]?.duration / RATE || lineOf(l).text.length * 0.065) + 0.4, 0);

async function run() {
  const t0 = performance.now();
  document.body.classList.add('cursor-off');
  music.start();
  for (let i = 0; i < SEGMENTS.length; i++) {
    const { el, videos } = buildSeg(SEGMENTS[i]);
    const old = segs.querySelector('.seg.on');
    segs.append(el);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('on')));
    if (old) { old.classList.remove('on'); old.classList.add('prev'); }
    const prev = curVideos;
    curVideos = videos;
    setTimeout(() => { prev.forEach(v => v.pause()); old?.remove(); }, 900);
    startSeg(el, videos, estimate(SEGMENTS[i]));
    if (i === SEGMENTS.length - 4) music.level(1);
    await wait(i === 0 ? 300 : 550);
    for (const l of SEGMENTS[i].lines) await say(l);
    await wait(250);
  }
  $('#capText').classList.remove('on');
  await wait(600);
  curVideos.forEach(v => v.pause());
  $('#frame').classList.add('is-end');
  await wait(3500);
  music.fade(3);
  await wait(2200);
  document.body.classList.remove('cursor-off');
  console.log(`video xong sau ${((performance.now() - t0) / 1000).toFixed(1)} giây`);
}

$('#endBig').textContent = END.big;
$('#endSmall').textContent = END.small;
$('#endNote').textContent = END.note;

// Tải sẵn các đoạn quay để lúc chiếu không giật
for (const s of SEGMENTS) for (const it of s.items) if (it.kind === 'clip') fetch(it.src).catch(() => {});

/* ───────────── Chụp tĩnh ───────────── */
const shot = params.get('shot');
if (shot) {
  document.body.classList.add('shot');
  $('#start').classList.add('hide');
  if (shot === 'end') $('#frame').classList.add('is-end');
  else {
    const [k, t = '4'] = shot.split('.');
    const seg = SEGMENTS[+k];
    const { el, videos } = buildSeg(seg);
    segs.append(el);
    el.classList.add('on');
    el.querySelectorAll('img.long').forEach(img => { if (img.complete) scrollTo(img); else img.onload = () => scrollTo(img); });
    await Promise.all(videos.map(v => new Promise(res => {
      const go = () => { v.currentTime = Math.min(v.duration - 0.1, +t * +v.dataset.rate); v.onseeked = res; };
      if (v.readyState >= 1) go(); else v.onloadedmetadata = go;
      setTimeout(res, 5000);
    })));
    const l = seg.lines[seg.lines.length - 1];
    $('#capText').textContent = lineOf(l).text; $('#capText').classList.add('on');
  }
  setTimeout(() => { document.title = 'shot-ready'; }, 400);
}

// ?obs: nguồn Browser của OBS (1080×1920): màn kem 3 giây rồi tự chiếu.
if (params.has('obs')) {
  for (const c of $('#start').children) c.style.visibility = 'hidden';
  if (params.get('obs') === 'tu-noi') $('#voiceOn').checked = false;
  setTimeout(() => { $('#start').classList.add('hide'); run(); }, 3000);
}

$('#go').addEventListener('click', async () => {
  $('#start').classList.add('hide');
  try { await document.documentElement.requestFullscreen(); } catch { /* không có toàn màn hình */ }
  await wait(500);
  run();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'f' || e.key === 'F') { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen().catch(() => {}); }
  if (e.key === 'r' || e.key === 'R') location.reload();
  if (e.code === 'Space') {
    e.preventDefault();
    paused = !paused;
    music.pause(paused);
    if (paused) { speechSynthesis.pause(); curAudio?.pause(); curVideos.forEach(v => v.pause()); }
    else { speechSynthesis.resume(); curAudio?.play(); curVideos.forEach(v => v.play()); }
    $('#frame').classList.toggle('vg-paused', paused);
  }
});
