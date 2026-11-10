/**
 * Sân khấu truyện tiếng Anh: một "thế giới" dài (nhiều phòng nối nhau) trong khung 16:9, camera lia theo nhân vật.
 *
 * Mượt, không giật: thế giới và mỗi nhân vật là một lớp HTML riêng, chỉ di chuyển bằng transform (Web Animations API),
 * trình duyệt ghép lớp bằng GPU, không vẽ lại cả cảnh. Kích thước tính bằng đơn vị cảnh × u (px / đơn vị) và vẽ lại
 * đúng cỡ khi khung đổi cỡ, nên hình luôn nét (không phóng to ảnh đã vẽ).
 * Hướng đi: đi sang trái thì nhân vật lật mặt sang trái (xoay qua mỏng dần trong 0,24 s), sang phải thì lật lại.
 *
 * Truyện (vd. stories/en021.js) gồm các nhịp, mỗi câu của bài một nhịp: { key, icon, play(st) }. play dùng các lệnh
 * của sân khấu (walk, pose, act, mood, say, cam, set, fx, wait). Ở chế độ instant (nhảy tới một câu) mọi lệnh làm xong
 * ngay, nên trạng thái trước câu k = chạy nhanh các nhịp 0..k-1.
 */
import { puppetSvg, applyPose, applySideHold, propSvg, BOOK, dogSvg, catSvg, carSvg, STEP } from './rig.js';
import { playSfxSoon, loopSfx, preloadSfx, hasSfx } from '../../engine/sfx.js';

/**
 * Tiếng động của truyện (ElevenLabs): thư viện chung src/assets/sfx/story/common/, tiếng riêng story/<id>/ (xem engine/sfx.js).
 * Nhỏ hơn giọng đọc (giọng là chính), chưa có file thì im lặng.
 * Tự phát: bước chân khi người đi, tiếng theo hiệu ứng fx (FX_SFX); còn lại nhịp truyện gọi st.sfx('tên').
 */
const FX_SFX = { poof: 'poof', sparkle: 'sparkle', hearts: 'hearts', zzz: 'snore' };
const SFX_VOL = 0.45;

export const VH = 315; // chiều cao cảnh (đơn vị)
const BOX = { kid: [-60, -175, 120, 180], adult: [-70, -222, 140, 228], dog: [-50, -80, 110, 84], cat: [-40, -64, 80, 68], car: [-82, -76, 166, 80] };

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

class Actor {
  constructor(st, id, { kind, who, x, y = st.floor, s = 1, face = 1, svg, box }) {
    Object.assign(this, { st, id, kind, who, x, y, s, face });
    // thing = đồ vật / con vật riêng của truyện: svg (gốc = điểm chạm đất) + box [x, y, w, h]; act-* / is-walk do CSS của truyện vẽ
    this.box = box || BOX[kind] || [-50, -100, 100, 104];
    this.el = document.createElement('div');
    this.el.className = `es-ac es-${kind}${kind === 'cat' ? ' es-dog' : ''} m-happy`;
    this.el.dataset.id = id;
    this.el.style.setProperty('--blink', `${(-Math.random() * 4.6).toFixed(2)}s`); // mỗi người chớp mắt một nhịp riêng
    this.inner = document.createElement('div');
    this.inner.className = 'es-flip';
    this.el.appendChild(this.inner);
    this.custom = svg;
    this.poseName = 'stand';
    this.build();
    st.actorsEl.appendChild(this.el);
  }
  build() {
    const [bx, by, bw, bh] = this.box;
    const body = this.kind === 'dog' ? dogSvg() : this.kind === 'cat' ? catSvg() : this.kind === 'car' ? carSvg(this.custom || '')
      : this.kind === 'thing' ? this.custom || '' : puppetSvg(this.who);
    this.inner.innerHTML = `<svg viewBox="${bx} ${by} ${bw} ${bh}" overflow="visible">${body}</svg>`;
    if (this.kind === 'kid' || this.kind === 'adult') {
      applyPose(this.inner, this.poseName, this.st.story.poses);
      if (this.propR) this.inner.querySelectorAll('.pp-propR').forEach((g) => { g.innerHTML = propSvg(this.propR, this.st.story.props); });
      if (this.chest) this.inner.querySelectorAll('.pp-chest').forEach((g) => { g.innerHTML = this.chest; });
      if (this.holdPose) applySideHold(this.inner, this.holdPose, this.st.story.poses);
    }
    this.size();
  }
  size() {
    const u = this.st.u, [, , bw, bh] = this.box;
    this.el.style.width = `${bw * this.s * u}px`;
    this.el.style.height = `${bh * this.s * u}px`;
    this.place();
  }
  tf(x = this.x, y = this.y) {
    const u = this.st.u, [bx, by] = this.box;
    return `translate(${((x + bx * this.s) * u).toFixed(2)}px, ${((y + by * this.s) * u).toFixed(2)}px)`;
  }
  place() {
    this.anim?.cancel(); this.anim = null;
    this.el.style.transform = this.tf();
    this.el.classList.toggle('is-left', this.face < 0);
  }
}

export class Stage {
  /**
   * host: phần tử chứa. story: { worldW, floor, bg(), fg?(), cast: [...], beats: [...], css? }.
   * sentences: các câu của bài (cùng thứ tự với beats). opts: { rate(), speak(text, rate) → Promise }.
   */
  constructor(host, story, sentences, { speak } = {}) {
    this.story = story; this.sentences = sentences; this.speak = speak;
    this.worldW = story.worldW; this.floor = story.floor;
    this.instant = false; this.run = 0; this.actors = {};
    host.innerHTML = `
      <div class="es-stage">
        <div class="es-world">
          <div class="es-bg"></div>
          <div class="es-actors"></div>
          <div class="es-fg"></div>
          <div class="es-fx"></div>
        </div>
      </div>`;
    this.stageEl = host.querySelector('.es-stage');
    this.world = host.querySelector('.es-world');
    this.bgEl = host.querySelector('.es-bg');
    this.fgEl = host.querySelector('.es-fg');
    this.actorsEl = host.querySelector('.es-actors');
    this.fxEl = host.querySelector('.es-fx');
    if (story.css && !document.getElementById(`es-css-${story.id}`)) {
      const s = document.createElement('style'); s.id = `es-css-${story.id}`; s.textContent = story.css; document.head.appendChild(s);
    }
    this.loops = new Set();
    this.u = 1; this.camX = 0;
    this.top = story.viewTop || 0; // bỏ dải trên cùng (trần nhà) để nhân vật to hơn trong khung
    this.measure();
    this.reset();
    this.preloadSounds();
    this.ro = new ResizeObserver(() => this.relayout());
    this.ro.observe(this.stageEl);
  }

  measure() {
    const h = this.stageEl.clientHeight || 300;
    this.u = h / (VH - this.top);
    this.VW = this.stageEl.clientWidth / this.u;
  }
  relayout() {
    const u0 = this.u;
    this.measure();
    if (Math.abs(this.u - u0) < 0.001 && this.drawn) return;
    this.drawBg();
    Object.values(this.actors).forEach((a) => a.size());
    this.camTo(this.camX, { instant: true });
  }
  drawBg() {
    const w = this.worldW * this.u, h = VH * this.u;
    const svg = (inner) => `<svg viewBox="0 0 ${this.worldW} ${VH}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" preserveAspectRatio="none">${inner}</svg>`;
    if (!this.drawn) {
      this.bgEl.innerHTML = svg(this.story.bg());
      this.fgEl.innerHTML = svg(this.story.fg ? this.story.fg() : '');
      this.drawn = true;
      for (const k of this.state || []) this.bgEl.firstChild.classList.add(k);
    } else {
      for (const el of [this.bgEl.firstChild, this.fgEl.firstChild]) { el.setAttribute('width', w.toFixed(1)); el.setAttribute('height', h.toFixed(1)); }
    }
    this.world.style.width = `${w}px`;
    this.world.style.height = `${h}px`;
  }

  /** Về đầu truyện: dựng lại nhân vật, xoá trạng thái cảnh. */
  reset() {
    this.stop();
    this.actorsEl.innerHTML = ''; this.fxEl.innerHTML = '';
    this.actors = {};
    this.state = new Set();
    this.drawn = false;
    this.drawBg();
    for (const c of this.story.cast) this.actors[c.id] = new Actor(this, c.id, c);
    this.camTo(this.story.camStart ?? 0, { instant: true });
    this.story.init?.(this);
  }

  // ── Lệnh dùng trong nhịp truyện ───────────────────────────────────────────
  a(id) { return this.actors[id]; }
  /** Một tiếng động (bỏ qua khi nhảy câu). vol nhân với mức chung của truyện. */
  /** Tên tiếng thật: tiếng riêng của truyện nếu có, không thì tiếng chung. */
  sound(name) { const own = `${this.story.id}/${name}`; return hasSfx(own) ? own : hasSfx(name) ? name : null; }
  /** Chạy nhanh cả truyện một lượt (không hiện gì) để biết truyện dùng những tiếng nào, rồi tải trước đúng những tiếng đó. */
  async preloadSounds() {
    const used = new Set();
    this.heard = used;
    await this.jump(this.story.beats.length);
    this.heard = null;
    this.reset();
    preloadSfx(...used);
  }
  sfx(name, { vol = 1, rate = 1 } = {}) {
    name = this.sound(name);
    if (name) this.heard?.add(name);
    if (this.instant || !name) return;
    const run = this.run;
    playSfxSoon(name, { vol: vol * SFX_VOL, rate, ok: () => run === this.run });
  }
  /** Tiếng lặp trong lúc fn chạy (bước chân, xe chạy); dừng khi fn xong hoặc khi Dừng. */
  async loop(name, fn, { vol = 1 } = {}) {
    name = this.sound(name);
    if (name) this.heard?.add(name);
    if (this.instant || !name) return fn();
    const L = loopSfx(name, { vol: vol * SFX_VOL });
    this.loops.add(L); L.start();
    try { return await fn(); } finally { L.stop(); this.loops.delete(L); }
  }
  wait(ms) { return this.instant ? Promise.resolve() : wait(reduced() ? ms * 1.1 : ms); }

  /** Trạng thái cảnh: class trên <svg> nền (cửa sổ mở, hơi nước bốc, đèn sáng…), CSS của truyện vẽ chuyển động. */
  set(name, on = true) {
    this.state[on ? 'add' : 'delete'](name);
    const svgs = [this.bgEl.firstChild, this.fgEl.firstChild];
    svgs.forEach((s) => s?.classList.toggle(name, on));
    if (this.instant) svgs.forEach((s) => { s?.classList.add('es-now'); void s?.getBoundingClientRect(); s?.classList.remove('es-now'); });
  }

  /** Camera: x = mép trái khung (đơn vị cảnh), tự kẹp trong thế giới. */
  camTo(x, { dur = 900, instant = this.instant } = {}) {
    const max = Math.max(0, this.worldW - this.VW);
    const to = Math.min(max, Math.max(0, x));
    const from = this.camX;
    this.camX = to;
    const tf = (v) => `translate3d(${(-v * this.u).toFixed(2)}px, ${(-this.top * this.u).toFixed(2)}px, 0)`;
    this.camAnim?.cancel();
    if (instant || Math.abs(to - from) < 1) { this.world.style.transform = tf(to); return Promise.resolve(); }
    this.camAnim = this.world.animate([{ transform: tf(from) }, { transform: tf(to) }], { duration: dur, easing: 'cubic-bezier(.45,0,.25,1)', fill: 'forwards' });
    return this.camAnim.finished.then(() => { this.world.style.transform = tf(to); this.camAnim?.cancel(); }).catch(() => {});
  }
  /** Camera nhìn vào điểm x (giữa khung). */
  look(x, opt) { return this.camTo(x - this.VW / 2, opt); }

  /** Nhân vật đi tới x (quay mặt theo hướng đi, chân bước, camera đi theo nếu follow). */
  async walk(id, x, { speed = 120, follow = true, lead = 0, pose = 'walk', after = 'stand', y } = {}) {
    const A = this.a(id), run = this.run;
    const ty = y ?? A.y;
    const dist = Math.hypot(x - A.x, ty - A.y);
    if (dist < 1) return;
    const dir = Math.abs(x - A.x) < 1 ? A.face : x > A.x ? 1 : -1;
    if (this.instant) {
      if (A.kind === 'kid' || A.kind === 'adult') await this.loop('steps', () => {});
      A.x = x; A.y = ty; A.face = dir; A.place();
      if (A.kind !== 'car') this.pose(id, after);
      if (follow) this.look(x + lead);
      return;
    }
    const person = A.kind === 'kid' || A.kind === 'adult';
    const turned = A.face !== dir;
    // Người đi: đổi sang dáng nghiêng (mặt theo hướng đi), nhịp bước = độ dài bước / tốc độ để chân không trượt
    if (person) {
      A.el.style.setProperty('--p', `${Math.min(0.5, Math.max(0.22, (STEP[A.kind] * A.s) / speed)).toFixed(3)}s`);
      this.act(id, null);
      // Đang cầm đồ: tay gần ở dáng nghiêng giữ góc của tư thế hiện tại (cầm ô, bê khay…), không vung
      A.holdPose = A.propR ? (A.poseName === 'walk' ? 'stand' : A.poseName) : null;
      applySideHold(A.inner, A.holdPose, this.story.poses);
      A.el.classList.toggle('is-hold', !!A.propR);
      A.el.classList.add('is-side');
    }
    A.face = dir;
    A.el.classList.toggle('is-left', dir < 0);
    if (turned) await wait(person ? 160 : 200);
    if (run !== this.run) return;
    if (person) this.pose(id, pose);
    A.el.classList.add('is-walk');
    const dur = (dist / speed) * 1000;
    const from = A.tf(), to = A.tf(x, ty);
    A.x = x; A.y = ty;
    A.anim?.cancel();
    A.anim = A.el.animate([{ transform: from }, { transform: to }], { duration: dur, easing: 'cubic-bezier(.3,0,.7,1)', fill: 'forwards' });
    const cam = follow ? this.look(x + lead, { dur }) : null;
    const feet = A.kind === 'kid' || A.kind === 'adult' ? 'steps' : null;
    if (feet) await this.loop(feet, () => A.anim.finished.catch(() => {}), { vol: 0.7 });
    else await A.anim.finished.catch(() => {});
    await cam;
    if (run !== this.run) return;
    A.place();
    A.el.classList.remove('is-walk', 'is-side', 'is-hold');
    if (A.kind === 'kid' || A.kind === 'adult') this.pose(id, after);
  }

  /** Quay mặt tại chỗ (1 = sang phải, -1 = sang trái), không bước. */
  face(id, dir) {
    const A = this.a(id);
    if (A.face === dir) return;
    A.face = dir;
    A.el.classList.toggle('is-left', dir < 0);
    if (this.instant) this.snap(A.el);
  }
  /** Đặt nhân vật ngay tới (x, y) (đổi cảnh, hiện ra ở chỗ khác), không đi; face tuỳ chọn. */
  place(id, x, y, face) {
    const A = this.a(id);
    A.x = x; if (y != null) A.y = y; if (face) A.face = face;
    A.place();
  }

  /** Tư thế (tay, đầu, ngồi). */
  pose(id, name) {
    const A = this.a(id);
    A.poseName = name;
    if (A.kind === 'kid' || A.kind === 'adult') applyPose(A.inner, name, this.story.poses);
    if (this.instant) this.snap(A.el);
  }
  /** Hành động lặp (đánh răng, chải tóc, khuấy nồi, vẫy, ăn…): class act-*; null = dừng. */
  act(id, name) {
    const A = this.a(id);
    A.el.className = A.el.className.replace(/\bact-\S+/g, '').trim();
    if (name) A.el.classList.add(`act-${name}`);
  }
  /** Nét mặt: happy · joy · wow · shut · sad · cry; talk = nhép miệng. */
  mood(id, m) {
    const A = this.a(id);
    A.el.className = A.el.className.replace(/\bm-\S+/g, '').trim();
    A.el.classList.add(`m-${m}`);
  }
  talk(id, on = true) { this.a(id).el.classList.toggle('is-talk', on); }
  /** Đồ ở tay phải / trước ngực. */
  hold(id, prop) {
    const A = this.a(id);
    A.propR = prop;
    A.inner.querySelectorAll('.pp-propR').forEach((g) => { g.innerHTML = propSvg(prop, this.story.props); });
  }
  /** Trước ngực: 'book' hoặc svg tuỳ ý (gốc giữa ngực). */
  chest(id, what) {
    const A = this.a(id);
    A.chest = what === 'book' ? BOOK : what || '';
    A.inner.querySelectorAll('.pp-chest').forEach((g) => { g.innerHTML = A.chest; });
  }
  /** Đổi trang phục (vd. đồ ngủ → đồng phục) kèm làn khói lấp lánh. */
  async dress(id, who) {
    const A = this.a(id);
    this.fx('poof', A.x, A.y - 60 * A.s);
    if (!this.instant) await wait(180);
    A.who = who;
    A.build();
  }
  /** Đeo cặp sau lưng. */
  bag(id, on = true) { this.a(id).el.classList.toggle('has-bag', on); }
  show(id, on = true) { this.a(id).el.classList.toggle('is-gone', !on); }
  /** Dáng chó / mèo: stand / sit; act: wag, jump. */
  dog(id, pose) { const A = this.a(id); A.el.classList.toggle('is-sit', pose === 'sit'); if (this.instant) this.snap(A.el); }

  /** Bong bóng lời nói trên đầu nhân vật. */
  async say(id, text, ms = 1600) {
    if (this.instant) return;
    const A = this.a(id);
    const b = document.createElement('div');
    b.className = 'es-say';
    b.lang = 'en';
    b.textContent = text;
    const [, by] = A.box;
    b.style.transform = `translate(${(A.x * this.u).toFixed(1)}px, ${((A.y + by * A.s + 6) * this.u).toFixed(1)}px)`;
    this.fxEl.appendChild(b);
    this.talk(id, true);
    const run = this.run;
    await wait(ms);
    if (run === this.run) this.talk(id, false);
    b.classList.add('is-out');
    setTimeout(() => b.remove(), 300);
  }

  /** Hiệu ứng nhỏ tại (x, y): poof · sparkle · hearts · drops · bubbles · zzz · ring. */
  fx(kind, x, y, { n = 1, quiet = false } = {}) {
    if (!quiet && FX_SFX[kind]) this.sfx(FX_SFX[kind], { vol: kind === 'zzz' ? 0.6 : 0.8 });
    if (this.instant) return;
    const d = document.createElement('div');
    d.className = `es-fx-${kind}`;
    d.style.transform = `translate(${(x * this.u).toFixed(1)}px, ${(y * this.u).toFixed(1)}px)`;
    d.style.setProperty('--u', `${this.u}px`);
    d.innerHTML = Array.from({ length: { poof: 8, sparkle: 6, hearts: 5, drops: 7, bubbles: 7, zzz: 3, ring: 2 }[kind] * n || 4 }, (_, i) => `<i style="--i:${i}"></i>`).join('');
    this.fxEl.appendChild(d);
    setTimeout(() => d.remove(), 2400);
  }
  /** Một món bay theo đường cong từ (x1, y1) tới (x2, y2) (đơn vị cảnh); svg là hình của món đó (gốc ở giữa). */
  async fly(svg, [x1, y1], [x2, y2], { size = 30, dur = 800 } = {}) {
    if (this.instant) return;
    const u = this.u;
    const d = document.createElement('div');
    d.className = 'es-flyer';
    d.style.width = d.style.height = `${size * u}px`;
    d.innerHTML = `<svg viewBox="${-size / 2} ${-size / 2} ${size} ${size}" overflow="visible">${svg}</svg>`;
    this.fxEl.appendChild(d);
    const p = (t) => {
      const x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t - Math.sin(Math.PI * t) * 50;
      return `translate(${((x - size / 2) * u).toFixed(1)}px, ${((y - size / 2) * u).toFixed(1)}px)`;
    };
    const frames = Array.from({ length: 9 }, (_, i) => ({ transform: p(i / 8) }));
    await d.animate(frames, { duration: dur, easing: 'ease-in-out', fill: 'forwards' }).finished.catch(() => {});
    d.remove();
  }
  snap(el) { el.classList.add('es-now'); void el.getBoundingClientRect(); el.classList.remove('es-now'); }

  // ── Chạy truyện ───────────────────────────────────────────────────────────
  /** Đặt trạng thái ngay trước câu k (chạy nhanh các nhịp trước). */
  async jump(k) {
    this.reset();
    this.instant = true;
    this.stageEl.classList.add('es-now');
    const v = this.view(this.run);
    for (let i = 0; i < k; i++) await this.story.beats[i].play(v);
    Object.values(this.actors).forEach((A) => { this.act(A.id, null); this.talk(A.id, false); });
    this.instant = false;
    void this.stageEl.getBoundingClientRect();
    this.stageEl.classList.remove('es-now');
  }
  /** Diễn câu k: chuyển động + đọc câu cùng lúc, xong cả hai mới thôi. */
  async beat(k, rate) {
    const run = this.run;
    const b = this.story.beats[k];
    Object.values(this.actors).forEach((A) => this.act(A.id, null));
    const cancel = new Promise((r) => { this.cancel = r; });
    await Promise.race([Promise.all([b.play(this.view(run)), this.speak?.(this.sentences[k], rate)]), cancel]);
    return run === this.run;
  }
  /**
   * Bản "gắn lượt" của sân khấu đưa cho nhịp truyện: khi đã sang lượt khác (Dừng, chạm ô khác), mọi lệnh của nhịp cũ
   * thành vô hiệu và nhịp cũ dừng hẳn (lời hứa không bao giờ xong), nên không điều khiển nhầm nhân vật của lượt mới.
   */
  view(run) {
    const halt = () => new Promise(() => {});
    return new Proxy(this, {
      get: (t, prop) => {
        const v = t[prop];
        if (typeof v !== 'function') return v;
        return (...args) => {
          if (t.run !== run) return halt();
          const r = v.apply(t, args);
          return r && typeof r.then === 'function' ? r.then((x) => (t.run !== run ? halt() : x)) : r;
        };
      },
    });
  }
  stop() { this.loops.forEach((L) => L.stop()); this.loops.clear(); this.run++; this.cancel?.(); this.cancel = null; }
  destroy() { this.stop(); this.ro.disconnect(); }
}
