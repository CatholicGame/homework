/**
 * Quay video dọc (TikTok / Reels / Shorts, 1080×1920) từ chính app, theo một kịch bản.
 *
 *   node scripts/video/record.mjs scripts/video/scenes/g4-chan-le.mjs [--port 5302] [--show]
 *   → scripts/video/out/<tên kịch bản>.mp4
 *
 * - Màn hình điện thoại 360×640 (scene.viewport đổi được), mật độ 1080 / bề ngang: ảnh luôn đủ 1080×1920 điểm.
 * - Hình: khung hình CDP screencast (JPEG 92) kèm thời điểm; build.py dựng lại 30 hình/giây, nén H.264 CRF 18.
 * - Tiếng: giọng đọc của app (speechSynthesis) được thay bằng bản giả: mỗi câu thầy nói → tts.py (giọng Microsoft),
 *   bản giả "đọc" đúng bằng độ dài tệp mp3, nên lời và hình khớp nhau. Tiếng động sfx (ding, boing…) được ghi lại
 *   và build.py tổng hợp lại y như preschool/fx.js.
 * - Chế độ khách, chặn Firebase (không tạo khách giả trên trang admin).
 *
 * Kịch bản (scenes/*.mjs): export default { grade, css?, voice?, narrator?, rate?, viewport?, warm?, async run(v) { … } }
 *   viewport: { width } khổ màn hình (mặc định 360), warm: ['grade4-tools'] trò chơi tải trước khi quay.
 *   voice: giọng của app (thầy), narrator: giọng người dẫn (v.say), tên giọng edge-tts (vi-VN-NamMinhNeural…).
 * Các hàm của v:
 *   v.page                         trang Playwright
 *   v.card(html, { say, hold })    khung chữ phủ kín màn hình (mở đầu / kết); say = câu đọc; giữ tới v.uncard()
 *   v.uncard()                     bỏ khung chữ
 *   v.label(html) / v.label('')    nhãn nhỏ chú thích cho bố mẹ (mép trên, không che chỗ bấm)
 *   v.say(text)                    người dẫn đọc một câu (giọng scene.narrator), chờ đọc xong
 *   v.tap(selector | fn, { arg })  ngón tay bay tới phần tử rồi bấm (fn(arg) chạy trong trang, trả về phần tử)
 *   v.drag(selector, { from: [0, 0.5], to: [1, 0.5], ms })   ngón tay kéo trên phần tử (toạ độ theo tỉ lệ khung phần tử)
 *   v.waitFor(selector, ms?)       chờ phần tử hiện ra
 *   v.wait(ms)
 *   v.heard('câu') / v.heard({ sfx: 'ding' })   chờ thầy bắt đầu đọc câu có chứa chữ đó / chờ tiếng động
 *   v.cut() … v.uncut()            bỏ đoạn giữa khỏi video (cắt ở đầu câu nói để không cụt lời)
 * Cần Playwright trong npx cache (như scripts/i18n-crawl.mjs) và gói Python ở scripts/video/.pylib (xem tts.py).
 */

import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const PW = process.env.PLAYWRIGHT_MJS
  || 'C:/Users/MGUser/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const { chromium } = await import(`file:///${PW.replace(/^\/+/, '')}`);

const args = { port: 5302 };
const pos = [];
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (!a.startsWith('--')) { pos.push(a); continue; }
  const next = process.argv[i + 1];
  args[a.slice(2)] = next && !next.startsWith('--') ? (i++, next) : true;
}
if (!pos[0]) { console.error('Cách dùng: node scripts/video/record.mjs <kịch bản.mjs> [--port 5302] [--show]'); process.exit(1); }
const scenePath = resolve(pos[0]);
const scene = (await import(pathToFileURL(scenePath).href)).default;
const name = scene.name || basename(scenePath).replace(/\.m?js$/, '');
const outDir = join(HERE, 'out', name);
const frameDir = join(outDir, 'frames');
rmSync(outDir, { recursive: true, force: true });
mkdirSync(frameDir, { recursive: true });

// ── vite dev ─────────────────────────────────────────────────────────────────
const port = Number(args.port);
const vite = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['vite', '--port', String(port), '--strictPort'], {
  stdio: ['ignore', 'pipe', 'pipe'], shell: process.platform === 'win32', cwd: resolve(HERE, '../..'),
});
const url = `http://localhost:${port}/`;
const killVite = () => { try { process.platform === 'win32' ? spawnSync('taskkill', ['/pid', String(vite.pid), '/T', '/F']) : vite.kill(); } catch { /* */ } };
process.on('exit', killVite);
for (let i = 0; i < 120; i++) {
  try { if ((await fetch(url)).ok) break; } catch { /* chưa sẵn sàng */ }
  await new Promise(r => setTimeout(r, 500));
}

// ── Giọng đọc ────────────────────────────────────────────────────────────────
const ttsMemo = new Map();
let ttsNew = 0; // câu phải tạo mới trong lúc quay (làm lời trễ so với hình) → quay lại lần nữa
/** voice: giọng của app (thầy, scene.voice) hoặc của người dẫn video (scene.narrator). */
function tts(text, voice = scene.voice) {
  text = String(text).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const key = `${voice}|${text}`;
  if (!ttsMemo.has(key)) {
    ttsMemo.set(key, new Promise((ok) => {
      const p = spawn('python', [join(HERE, 'tts.py'), text, ...(voice ? ['--voice', voice] : []), ...(scene.rate ? ['--rate', scene.rate] : [])],
        { env: { ...process.env, PYTHONIOENCODING: 'utf-8' } });
      let out = '', err = '';
      p.stdout.on('data', d => { out += d; });
      p.stderr.on('data', d => { err += d; });
      p.on('close', (code) => {
        if (code === 0) { const r = JSON.parse(out); if (!r.cached) ttsNew++; ok(r); return; }
        console.error(`[tts lỗi] ${text}: ${err.trim().split('\n').pop()}`);
        ttsNew++;
        ok({ file: null, dur: Math.max(1.5, text.length * 0.07) }); // không có tiếng, vẫn giữ nhịp
      });
    }));
  }
  return ttsMemo.get(key);
}

const events = []; // { t, kind: 'say' | 'cancel' | 'sfx' | 'cut' | 'uncut', … } — t: ms (đồng hồ máy)
const waiters = [];
function log(e) {
  events.push(e);
  for (const w of [...waiters]) if (w.test(e)) { waiters.splice(waiters.indexOf(w), 1); w.done(e); }
}

// ── Trình duyệt ──────────────────────────────────────────────────────────────
// Không có cờ này, screencast chỉ chụp 360×640 (bỏ qua deviceScaleFactor) rồi phóng to → mờ.
// Khổ màn hình: scene.viewport = { width, height } (tỉ lệ 9:16); mật độ = 1080 / width để ảnh luôn 1080×1920.
const VW = scene.viewport?.width || 360, VH = scene.viewport?.height || Math.round(VW * 16 / 9), DPR = 1080 / VW;
const browser = await chromium.launch({ headless: !args.show, args: [`--force-device-scale-factor=${DPR}`] });
const context = await browser.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: DPR, isMobile: true, hasTouch: true, locale: 'vi-VN' });
await context.route(/(firestore|identitytoolkit|securetoken|firebaseinstallations)\.googleapis\.com/, r => r.abort());
await context.exposeFunction('__vtts', async (text, id) => {
  const r = await tts(text);
  log({ t: Date.now(), kind: 'say', id, text, file: r.file, dur: r.dur });
  return r.dur;
});
await context.exposeFunction('__vcancel', (id) => { log({ t: Date.now(), kind: 'cancel', id }); });
await context.exposeFunction('__vsfx', (sound, arg) => { log({ t: Date.now(), kind: 'sfx', sound, arg }); });
await context.addInitScript(({ grade }) => {
  localStorage.setItem('tth_guest', 'true');
  localStorage.setItem('tth_profile_guest', JSON.stringify({ setupDone: true, grade, name: 'Bé', gender: 'girl', avatar: 'girls/girl1' }));
  localStorage.setItem('pre1-mute', '0');
  // Trò chơi xin toàn màn hình khi bắt đầu: trình duyệt không giao diện sẽ đổi khung về 800×600 → bỏ qua, giữ khổ điện thoại.
  Element.prototype.requestFullscreen = function () { return Promise.resolve(); };
  Element.prototype.webkitRequestFullscreen = function () {};
  try { if (screen.orientation) screen.orientation.lock = () => Promise.resolve(); } catch { /* */ }

  // speechSynthesis giả: "đọc" đúng bằng độ dài mp3 do tts.py tạo.
  class Utterance { constructor(text) { Object.assign(this, { text, lang: '', voice: null, rate: 1, pitch: 1, volume: 1, onend: null, onstart: null }); } }
  let cur = null, queue = [], n = 0;
  const synth = {
    speaking: false, pending: false, paused: false,
    getVoices: () => [{ name: 'Video vi-VN', lang: 'vi-VN', localService: true, default: true, voiceURI: 'video-vi' }],
    addEventListener() {}, removeEventListener() {},
    speak(u) {
      if (!String(u.text || '').trim() || u.volume === 0) return;
      queue.push(u);
      synth.pending = true;
      if (!cur) next();
    },
    cancel() {
      queue = [];
      if (cur) { clearTimeout(cur.timer); window.__vcancel(cur.id); cur = null; }
      synth.speaking = synth.pending = false;
    },
    pause() {}, resume() {},
  };
  function next() {
    const u = queue.shift();
    if (!u) { synth.speaking = synth.pending = false; return; }
    const me = { id: ++n, u };
    cur = me;
    synth.speaking = true;
    synth.pending = queue.length > 0;
    window.__vtts(u.text, me.id).then((dur) => {
      if (cur !== me) return;
      me.timer = setTimeout(() => { if (cur !== me) return; cur = null; u.onend?.(); next(); }, dur * 1000 + 120);
    });
  }
  Object.defineProperty(window, 'speechSynthesis', { value: synth, configurable: true });
  window.SpeechSynthesisUtterance = Utterance;
}, { grade: scene.grade || 1 });

const page = await context.newPage();
page.on('pageerror', e => console.error('[pageerror]', e.message));
await page.goto(url);
await page.waitForFunction(() => typeof window.__navigate === 'function');
await page.waitForTimeout(1200);

// Tải trước các trò chơi kịch bản sẽ mở (scene.warm), để video không lọt màn "Đang tải bài tập…".
for (const id of scene.warm || []) {
  await page.evaluate((g) => window.__navigate(g), id);
  await page.waitForTimeout(2500);
}
if (scene.warm?.length) { await page.evaluate(() => window.__navigate('home')); await page.waitForTimeout(1500); }

// Ghi lại tiếng động của app (cùng module fx.js với app vì vite phục vụ cùng một URL).
await page.evaluate(async () => {
  const m = await import('/src/games/preschool/fx.js');
  for (const k of Object.keys(m.sfx)) {
    const f = m.sfx[k];
    m.sfx[k] = (...a) => { window.__vsfx(k, a[0] ?? 0); return f(...a); };
  }
});

// Lớp phủ của video: ngón tay, nhãn chú thích, khung chữ.
await page.addStyleTag({ content: `
  #v-layer { position: fixed; inset: 0; z-index: 99999; pointer-events: none; font-family: 'Baloo 2', 'Quicksand', sans-serif; }
  #v-finger { position: absolute; left: 0; top: 0; width: 0; height: 0; opacity: 0; transition: opacity 0.25s; }
  #v-finger.v-on { opacity: 1; }
  #v-finger .v-dot { position: absolute; left: -22px; top: -22px; width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.55); border: 3px solid rgba(30,41,59,0.55); box-shadow: 0 4px 14px rgba(0,0,0,0.25); transition: transform 0.12s; }
  #v-finger .v-hand { position: absolute; left: -10px; top: 4px; font-size: 46px; line-height: 1; filter: drop-shadow(0 3px 4px rgba(0,0,0,0.35)); transition: transform 0.12s; }
  #v-finger.v-press .v-dot { transform: scale(0.75); background: rgba(250,204,21,0.75); }
  #v-finger.v-press .v-hand { transform: translateY(-4px) scale(0.92); }
  .v-ripple { position: absolute; width: 44px; height: 44px; margin: -22px 0 0 -22px; border-radius: 50%; border: 4px solid #FACC15; animation: vRipple 0.6s ease-out forwards; }
  @keyframes vRipple { to { transform: scale(2.6); opacity: 0; } }
  #v-label { position: absolute; left: 50%; top: 8px; transform: translate(-50%, -20px); max-width: 90%; opacity: 0; transition: opacity 0.35s, transform 0.35s;
    background: rgba(15,23,42,0.88); color: #fff; font-weight: 800; font-size: 19px; line-height: 1.25; padding: 10px 16px; border-radius: 16px; text-align: center; box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
  #v-label.v-on { opacity: 1; transform: translate(-50%, 0); }
  .v-card { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; opacity: 0; transition: opacity 0.4s; }
  .v-card.v-on { opacity: 1; }
  /* chữ của video giữ cỡ như ở khổ 360 dù khổ màn hình rộng hơn */
  .v-card, #v-label { zoom: ${VW / 360}; }
  ${scene.css || ''}
` });
await page.evaluate(() => {
  const l = document.createElement('div');
  l.id = 'v-layer';
  l.innerHTML = '<div id="v-finger"><div class="v-dot"></div><div class="v-hand">👆</div></div><div id="v-label"></div>';
  document.body.appendChild(l);
});

// ── Quay ─────────────────────────────────────────────────────────────────────
const cdp = await context.newCDPSession(page);
const frames = [];
let fi = 0;
cdp.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
  const f = `${String(fi++).padStart(6, '0')}.jpg`;
  writeFileSync(join(frameDir, f), Buffer.from(data, 'base64'));
  frames.push({ f, t: Date.now(), ts: metadata.timestamp ? metadata.timestamp * 1000 : null });
  cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
});

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
let finger = { x: VW / 2, y: VH + 60 };
const v = {
  page,
  wait: sleep,
  waitFor: (sel, ms = 60000) => page.waitForSelector(sel, { timeout: ms, state: 'visible' }),
  /** Chờ thầy bắt đầu đọc câu có chứa `part` (hoặc tiếng động: { sfx: 'ding' }). */
  heard(part) {
    const test = typeof part === 'string' ? (e) => e.kind === 'say' && e.text.includes(part) : (e) => e.kind === 'sfx' && e.sound === part.sfx;
    return new Promise((done) => waiters.push({ test, done }));
  },
  /**
   * Bỏ khỏi video từ lúc này (hoặc lúc `at`, vd. thời điểm của sự kiện v.heard trả về) tới v.uncut()
   * (hình và lời; câu đang đọc bị cắt, tiếng động giữ trọn).
   */
  cut(at = Date.now()) { log({ t: at, kind: 'cut' }); },
  uncut(at = Date.now()) { log({ t: at, kind: 'uncut' }); },
  async say(text) {
    const r = await tts(text, scene.narrator || scene.voice);
    log({ t: Date.now(), kind: 'say', id: `v${events.length}`, text, file: r.file, dur: r.dur });
    await sleep(r.dur * 1000 + 250);
  },
  async label(html) {
    await page.evaluate((h) => {
      const e = document.getElementById('v-label');
      if (h) e.innerHTML = h;
      e.classList.toggle('v-on', !!h);
    }, html);
  },
  async card(html, { say, hold = 0, cls = '' } = {}) {
    await page.evaluate(({ html, cls }) => {
      document.querySelectorAll('.v-card').forEach(c => c.remove());
      const c = document.createElement('div');
      c.className = `v-card ${cls}`;
      c.innerHTML = html;
      document.getElementById('v-layer').appendChild(c);
      requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add('v-on')));
    }, { html, cls });
    await sleep(450);
    if (say) await v.say(say);
    if (hold) await sleep(hold);
  },
  async uncard() {
    await page.evaluate(() => document.querySelectorAll('.v-card').forEach(c => { c.classList.remove('v-on'); setTimeout(() => c.remove(), 450); }));
    await sleep(450);
  },
  /** Ngón tay đặt ở `from` rồi kéo tới `to` (tỉ lệ trong khung phần tử), chuột thật bấm giữ suốt nét kéo. */
  async drag(sel, { from = [0, 0.5], to = [1, 0.5], ms = 1000, move = 650, after = 350 } = {}) {
    const el = (await page.waitForSelector(sel, { timeout: 60000, state: 'visible' })).asElement();
    await sleep(300);
    const b = await el.boundingBox();
    const P = ([fx, fy]) => ({ x: b.x + b.width * fx, y: b.y + b.height * fy });
    const p0 = P(from), p1 = P(to);
    const place = (p, ms) => page.evaluate(({ from, to, ms }) => {
      const f = document.getElementById('v-finger');
      f.style.transition = 'none';
      f.style.transform = `translate(${from.x}px, ${from.y}px)`;
      void f.offsetWidth;
      f.classList.add('v-on');
      f.style.transition = `transform ${ms}ms cubic-bezier(.45,.05,.3,1), opacity 0.25s`;
      f.style.transform = `translate(${to.x}px, ${to.y}px)`;
    }, { from: finger, to: p, ms });
    await place(p0, move);
    finger = p0;
    await sleep(move + 80);
    await page.mouse.move(p0.x, p0.y);
    await page.evaluate(() => document.getElementById('v-finger').classList.add('v-press'));
    await page.mouse.down();
    const n = Math.max(8, Math.round(ms / 30));
    for (let i = 1; i <= n; i++) {
      const p = { x: p0.x + (p1.x - p0.x) * i / n, y: p0.y + (p1.y - p0.y) * i / n };
      await page.evaluate(({ x, y }) => { const f = document.getElementById('v-finger'); f.style.transition = 'none'; f.style.transform = `translate(${x}px, ${y}px)`; }, p);
      await page.mouse.move(p.x, p.y);
      await sleep(ms / n);
    }
    finger = p1;
    await page.mouse.up();
    await page.evaluate(() => document.getElementById('v-finger').classList.remove('v-press'));
    await sleep(after);
    await page.evaluate(() => document.getElementById('v-finger').classList.remove('v-on'));
  },
  /** Ngón tay bay tới phần tử rồi bấm thật (chuột tại toạ độ đó). */
  async tap(target, { move = 650, after = 350, arg = null } = {}) {
    const handle = typeof target === 'function' ? await page.waitForFunction(target, arg, { timeout: 60000 }) : await page.waitForSelector(target, { timeout: 60000, state: 'visible' });
    const el = handle.asElement();
    await el.evaluate(e => e.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
    // Chờ phần tử đứng yên (thẻ còn đang trượt vào / cuộn) rồi mới đo chỗ bấm.
    const center = async () => { const b = await el.boundingBox(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; };
    let { x, y } = await center();
    for (let i = 0; i < 30; i++) {
      await sleep(120);
      const p = await center();
      const still = Math.abs(p.x - x) < 0.5 && Math.abs(p.y - y) < 0.5;
      ({ x, y } = p);
      if (still && i >= 2) break;
    }
    await page.evaluate(({ from, to, move }) => {
      const f = document.getElementById('v-finger');
      f.style.transition = 'none';
      f.style.transform = `translate(${from.x}px, ${from.y}px)`;
      void f.offsetWidth;
      f.classList.add('v-on');
      f.style.transition = `transform ${move}ms cubic-bezier(.45,.05,.3,1), opacity 0.25s`;
      f.style.transform = `translate(${to.x}px, ${to.y}px)`;
    }, { from: finger, to: { x, y }, move });
    finger = { x, y };
    await sleep(move + 80);
    const now = await center(); // nếu phần tử vừa dịch đi thì bấm theo chỗ mới (ngón tay đi theo)
    if (Math.abs(now.x - x) > 2 || Math.abs(now.y - y) > 2) {
      ({ x, y } = now);
      finger = { x, y };
      await page.evaluate(({ x, y }) => { document.getElementById('v-finger').style.transform = `translate(${x}px, ${y}px)`; }, { x, y });
      await sleep(250);
    }
    await page.evaluate(({ x, y }) => {
      const f = document.getElementById('v-finger');
      f.classList.add('v-press');
      const r = document.createElement('div');
      r.className = 'v-ripple';
      r.style.left = `${x}px`; r.style.top = `${y}px`;
      document.getElementById('v-layer').appendChild(r);
      setTimeout(() => r.remove(), 700);
      setTimeout(() => f.classList.remove('v-press'), 160);
    }, { x, y });
    await page.mouse.click(x, y);
    await sleep(after);
    await page.evaluate(() => document.getElementById('v-finger').classList.remove('v-on'));
  },
};

const t0 = Date.now();
await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: 1080, maxHeight: 1920, everyNthFrame: 1 });
try {
  await scene.run(v);
} catch (e) {
  console.error('Kịch bản lỗi:', e);
  await page.screenshot({ path: join(outDir, 'error.png') }).catch(() => {});
}
const tEnd = Date.now();
await cdp.send('Page.stopScreencast');
await sleep(300);
await browser.close();
killVite();

const timeline = { t0, tEnd, frames, events, music: scene.music || null, musicVolume: scene.musicVolume ?? 0.12 };
writeFileSync(join(outDir, 'timeline.json'), JSON.stringify(timeline, null, 1));
const secs = (tEnd - t0) / 1000;
if (ttsNew && !args.pass2) {
  console.error(`Có ${ttsNew} câu giọng đọc mới tạo trong lúc quay (lời bị trễ). Quay lại lần nữa với giọng đã có sẵn…`);
  const again = spawnSync(process.execPath, [fileURLToPath(import.meta.url), ...process.argv.slice(2), '--pass2'], { stdio: 'inherit' });
  process.exit(again.status ?? 1);
}
console.error(`Đã quay ${frames.length} khung hình trong ${secs.toFixed(1)} giây (${(frames.length / secs).toFixed(1)} hình/giây). Đang dựng video…`);

const b = spawnSync('python', [join(HERE, 'build.py'), outDir, join(HERE, 'out', `${name}.mp4`)], { stdio: 'inherit', env: { ...process.env, PYTHONIOENCODING: 'utf-8' } });
process.exit(b.status ?? 1);
