/**
 * 📷 Bé chụp ảnh chim — dạng lượt 'photo' (data5.js; Tiền tiểu học và Lớp 1). Đàn chim bay qua khung ảnh,
 * bé bấm Chụp khi cả đàn nằm trong khung (đàn bay chậm lại khi vào khung). Ảnh đứng yên: bé chạm từng con
 * để đếm (hiện số, đọc to như "chạm để đếm" của Tập 1), rồi chọn số đúng.
 *   mode 'all'  (n): đếm cả đàn.
 *   mode 'kind' (n, other): đàn có hai loài, chỉ đếm loài được hỏi (chạm loài kia: Thỏ nhắc, không trừ sao).
 *   mode 'tens' (tens, ones): mỗi cột 10 con (như bó que tính); chạm một cột đếm "mười, hai mươi…", rồi đếm con lẻ.
 * Hàng số bên dưới có sẵn từ đầu (mờ tới lúc chụp xong): bố cục không đổi trong lượt.
 */

import { BIRDS, birdSvg, FIELD_BACKDROP, CAMERA } from '../grade3Games/art/birds.js';
import { NUMBER_COLORS, numberWord } from './numbers.js';
import { say, sfx, shake } from './fx.js';

const FLOCK_SP = ['se', 'en', 'sao', 'bocau', 'co', 'vit', 'chaomao'];
const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const markColor = (n) => NUMBER_COLORS[(n % 10) || 10];

export const PLAYERS5 = { photo: playPhoto };

function playPhoto({ round, stage, talk, wrong, solve, numberChoices, circleIt, addCleanup }) {
  injectStyles();
  const mode = round.mode || 'all';
  const sp = round.sp || FLOCK_SP[Math.floor(Math.random() * FLOCK_SP.length)];
  const other = round.otherSp || FLOCK_SP.filter(x => x !== sp && x !== 'co' && x !== 'vit')[Math.floor(Math.random() * 4)];
  const name = BIRDS[sp].name;
  const answer = mode === 'tens' ? round.tens * 10 + round.ones : round.n;

  // ── Đàn chim: danh sách nhóm, mỗi con { sp, g } (g: số thứ tự nhóm; chế độ chục: nhóm < tens là cột 10 con).
  let groups;
  if (mode === 'tens') {
    groups = [...Array(round.tens).fill(10), ...(round.ones ? [round.ones] : [])].map(k => Array.from({ length: k }, () => sp));
  } else {
    const all = [...Array(round.n).fill(sp), ...Array(mode === 'kind' ? round.other : 0).fill(other)];
    for (let i = all.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [all[i], all[j]] = [all[j], all[i]]; }
    groups = [all];
  }
  const flip = Math.random() < 0.5;

  stage.innerHTML = `
    <div class="pk5">
      <div class="pk5-scene">
        ${FIELD_BACKDROP}
        <div class="pk5-ground"></div>
        <div class="pk5-frame"><i></i><i></i><i></i><i></i><span class="pk5-flash"></span></div>
        <div class="pk5-flock"></div>
        <button type="button" class="pk5-shoot" aria-label="Chụp ảnh">${CAMERA(64)}<b>Chụp!</b></button>
        <button type="button" class="pk-recount pk5-recount" hidden aria-label="Đếm lại">↺</button>
      </div>
    </div>`;
  const scene = stage.querySelector('.pk5-scene');
  const frame = scene.querySelector('.pk5-frame');
  const flock = scene.querySelector('.pk5-flock');
  const shoot = scene.querySelector('.pk5-shoot');
  const recount = scene.querySelector('.pk5-recount');

  // Mỗi nhóm một khối (đếm thường: hàng 5 con; chục: cột 2 × 5 như bó que tính). Toạ độ theo ô, đổi ra px khi đặt cỡ.
  const blocks = groups.map((list, gi) => {
    const cols = mode === 'tens' ? 2 : Math.min(5, list.length);
    const el = document.createElement('div');
    el.className = `pk5-grp${mode === 'tens' && list.length === 10 ? ' is-ten' : ''}`;
    el.innerHTML = list.map((s, i) => `<button type="button" class="pk5-bird" data-sp="${s}" data-g="${gi}" style="--j:${((i * 37) % 7) / 7}">${birdSvg(s, { flip })}</button>`).join('');
    flock.appendChild(el);
    return { el, cols, rows: Math.ceil(list.length / cols) };
  });
  const GAP = 0.8;
  const layout = () => {
    const fw = frame.offsetWidth, fh = frame.offsetHeight;
    const wCols = blocks.reduce((a, b) => a + b.cols, 0) + GAP * (blocks.length - 1);
    const hRows = Math.max(...blocks.map(b => b.rows)) * 0.86;
    const cell = Math.min((fw * 0.7) / wCols, (fh * 0.86) / hRows, scene.offsetHeight * 0.27);
    let x = 0;
    (flip ? [...blocks].reverse() : blocks).forEach((b) => {
      const top = ((Math.max(...blocks.map(q => q.rows)) - b.rows) * cell * 0.86) / 2;
      Object.assign(b.el.style, { left: `${x}px`, top: `${top}px`, width: `${b.cols * cell}px`, height: `${b.rows * cell * 0.86}px` });
      [...b.el.children].forEach((bird, i) => Object.assign(bird.style, {
        left: `${(i % b.cols) * cell}px`, top: `${Math.floor(i / b.cols) * cell * 0.86}px`, width: `${cell}px`, height: `${cell * 0.74}px`,
      }));
      x += (b.cols + GAP) * cell;
    });
    flock.style.width = `${x - GAP * cell}px`;
    flock.style.height = `${hRows * cell}px`;
  };

  // ── Đàn bay: vòng lại mãi tới khi chụp. Lượt đầu đàn gần lọt khung (2–3 giây là chụp được).
  let x = null, taken = false, raf = 0, last = performance.now();
  const W = () => scene.offsetWidth;
  const place = () => {
    const y = frame.offsetTop + (frame.offsetHeight - flock.offsetHeight) / 2;
    flock.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  };
  const inFrame = () => {
    const l = frame.offsetLeft, r = l + frame.offsetWidth, a = x, b = x + flock.offsetWidth;
    return { full: a >= l - 6 && b <= r + 6, some: b > l && a < r };
  };
  const tick = (now) => {
    if (!scene.isConnected || taken) return;
    const dt = Math.min(0.25, (now - last) / 1000);
    last = now;
    const v = W() * 0.075 * (calm() ? 0.65 : 1) * (inFrame().some ? 0.55 : 1);
    x += (flip ? -v : v) * dt;
    if (!flip && x > W() + 10) x = -flock.offsetWidth - 10;
    if (flip && x < -flock.offsetWidth - 10) x = W() + 10;
    place();
    raf = requestAnimationFrame(tick);
  };
  const start = () => {
    layout();
    if (x === null) {
      const l = frame.offsetLeft, r = l + frame.offsetWidth;
      x = flip ? r - flock.offsetWidth + W() * 0.12 : l - W() * 0.12;
    }
    place();
  };
  const ro = new ResizeObserver(() => { layout(); if (x !== null) place(); });
  ro.observe(scene);
  requestAnimationFrame(() => { start(); last = performance.now(); raf = requestAnimationFrame(tick); });
  addCleanup(() => { cancelAnimationFrame(raf); ro.disconnect(); });

  // ── Hàng số: có sẵn, mờ tới lúc chụp xong.
  let done = false;
  const choices = numberChoices(round.options, (v, btn) => {
    if (done) return;
    if (!taken) { needPhoto(); return; }
    if (v !== answer) { wrong(btn, count ? 'Chưa đúng rồi. Bé đếm lại thật chậm!' : 'Bé chạm vào từng con chim để đếm trước!'); return; }
    done = true;
    circleIt(btn);
    scene.classList.add('is-won');
    solve(`Đúng rồi! Có ${numberWord(v)} con ${name}!`);
  });
  choices.classList.add('pk5-wait');
  stage.querySelector('.pk5').append(choices);

  const needPhoto = () => {
    sfx.boing();
    shake(shoot);
    talk('Bé bấm nút Chụp trước đã!', { keep: true });
  };

  shoot.onclick = () => {
    if (taken) return;
    const where = inFrame();
    frame.classList.remove('is-snap'); void frame.offsetWidth; frame.classList.add('is-snap');
    if (!where.full) {
      sfx.boing();
      talk(where.some ? 'Đàn chim chưa vào hết khung. Bé đợi cả đàn vào khung rồi chụp lại!' : 'Chưa có chim trong khung. Bé đợi chim bay tới!', { keep: true });
      return;
    }
    taken = true;
    cancelAnimationFrame(raf);
    sfx.pop(4);
    scene.classList.add('is-photo');
    choices.classList.remove('pk5-wait');
    talk({
      all: `Chụp được rồi! Bé chạm vào từng con ${short(name)} để đếm, rồi chọn số đúng!`,
      kind: `Chụp được rồi! Bé chỉ đếm ${name} thôi. Chạm vào từng con ${short(name)}, rồi chọn số đúng!`,
      tens: 'Chụp được rồi! Mỗi cột có mười con. Bé chạm vào từng cột để đếm mười, hai mươi, rồi đếm từng con lẻ!',
    }[mode]);
  };

  // ── Chạm đếm trên ảnh.
  let count = 0;
  const badge = (host) => {
    const b = document.createElement('span');
    b.className = 'pk-mark pk5-mark';
    b.textContent = count;
    b.style.background = markColor(count);
    host.appendChild(b);
    sfx.pop(Math.min(count, 12));
    say(numberWord(Math.min(count, 100)));
    recount.hidden = false;
  };
  flock.addEventListener('click', (e) => {
    const bird = e.target.closest('.pk5-bird');
    if (!bird || done) return;
    if (!taken) { talk('Bé bấm nút Chụp khi cả đàn bay vào khung!', { keep: true }); shake(shoot); return; }
    const g = Number(bird.dataset.g);
    const grp = blocks[g].el;
    if (mode === 'tens' && grp.classList.contains('is-ten')) {
      if (grp.classList.contains('is-counted')) { shake(grp); return; }
      grp.classList.add('is-counted');
      count += 10;
      badge(grp);
      return;
    }
    if (bird.classList.contains('is-counted')) { shake(bird); return; }
    if (bird.dataset.sp !== sp) {
      shake(bird);
      talk(`Đó là ${BIRDS[bird.dataset.sp].name}. Bé chỉ đếm ${name} thôi!`, { keep: true });
      return;
    }
    bird.classList.add('is-counted');
    count++;
    badge(bird);
  });
  recount.onclick = () => {
    count = 0;
    scene.querySelectorAll('.pk5-mark').forEach(m => m.remove());
    scene.querySelectorAll('.is-counted').forEach(m => m.classList.remove('is-counted'));
    recount.hidden = true;
    sfx.tap();
  };

  talk(mode === 'kind'
    ? `Đàn chim bay tới kìa! Bé bấm Chụp khi cả đàn vào khung, rồi đếm xem có mấy con ${short(name)}!`
    : `Đàn ${name} bay tới kìa! Bé bấm Chụp khi cả đàn bay vào khung ảnh!`);
}

const short = (name) => name.replace(/^chim /, '');

function injectStyles() {
  if (document.getElementById('pk5-styles')) return;
  const st = document.createElement('style');
  st.id = 'pk5-styles';
  st.textContent = `
    .pk5 { display: flex; flex-direction: column; align-items: center; }
    .pk5-scene { position: relative; overflow: hidden; width: min(100%, calc((var(--pk-free, 62vh) - 120px) * 1.6)); min-width: min(100%, 320px); aspect-ratio: 16 / 10;
      border-radius: 24px; border: 5px solid #fff; box-shadow: 0 6px 0 rgba(14, 165, 233, 0.25), 0 10px 20px rgba(0, 0, 0, 0.08);
      background: linear-gradient(#7DD3FC, #BAE6FD 45%, #E0F2FE 70%); touch-action: manipulation; user-select: none; -webkit-user-select: none; }
    @media (orientation: portrait) { .pk5-scene { aspect-ratio: 1 / 1.1; width: min(100%, calc((100dvh - 440px) / 1.1)); } } /* chừa chỗ cho hàng số bên dưới */
    .pk5-scene .g3k-backdrop { position: absolute; left: 0; right: 0; bottom: 21%; width: 100%; height: 46%; display: block; }
    .pk5-ground { position: absolute; left: 0; right: 0; bottom: 0; height: 22%; background: linear-gradient(#4ADE80, #16A34A); border-top: 3px solid #3F6212; }
    /* Khung ảnh: bốn góc trắng; chụp xong thành tấm ảnh viền trắng dày (nằm dưới chim, không làm mờ chim). */
    .pk5-frame { position: absolute; left: 5%; right: 5%; top: 5%; bottom: 25%; border-radius: 14px; pointer-events: none; }
    .pk5-frame i { position: absolute; width: 10%; height: 16%; border: 0 solid #fff; filter: drop-shadow(0 0 2px rgba(15, 23, 42, .6)); }
    .pk5-frame i:nth-child(1) { left: 0; top: 0; border-left-width: 7px; border-top-width: 7px; border-top-left-radius: 14px; }
    .pk5-frame i:nth-child(2) { right: 0; top: 0; border-right-width: 7px; border-top-width: 7px; border-top-right-radius: 14px; }
    .pk5-frame i:nth-child(3) { left: 0; bottom: 0; border-left-width: 7px; border-bottom-width: 7px; border-bottom-left-radius: 14px; }
    .pk5-frame i:nth-child(4) { right: 0; bottom: 0; border-right-width: 7px; border-bottom-width: 7px; border-bottom-right-radius: 14px; }
    .pk5-flash { position: absolute; inset: 0; border-radius: 14px; background: #fff; opacity: 0; }
    .pk5-frame.is-snap .pk5-flash { animation: pk5Flash .45s ease-out; }
    @keyframes pk5Flash { from { opacity: .9; } to { opacity: 0; } }
    .is-photo .pk5-frame { background: rgba(224, 242, 254, .6); box-shadow: 0 0 0 10px #fff, 0 10px 24px 10px rgba(15, 23, 42, .25); }
    .is-photo .pk5-frame i { visibility: hidden; }
    .pk5-flock { position: absolute; left: 0; top: 0; will-change: transform; }
    .pk5-grp { position: absolute; border-radius: 14px; }
    .pk5-grp.is-ten { outline: 3px dashed transparent; outline-offset: 3px; }
    .is-photo .pk5-grp.is-ten { outline-color: rgba(15, 23, 42, .45); background: rgba(255, 255, 255, .3); }
    .pk5-grp.is-ten.is-counted { outline-color: #F59E0B; outline-style: solid; background: rgba(254, 240, 138, .65); }
    .pk5-bird { position: absolute; padding: 0; border: 0; background: none; cursor: pointer; border-radius: 40%; transform: translate(calc(var(--j) * 8%), calc(var(--j) * -10%)); }
    .pk5-bird.is-counted { background: rgba(250, 204, 21, .35); box-shadow: inset 0 0 0 3px rgba(250, 204, 21, .9); }
    .pk5-bird .g3k-bsvg { display: block; width: 100%; height: 100%; overflow: visible; filter: drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff); }
    .pk5-scene .g3k-wing { transform-origin: 0px -4px; animation: pk5Flap .32s ease-in-out infinite alternate; }
    .is-photo .g3k-wing { animation: none; }
    @keyframes pk5Flap { from { transform: scaleY(1); } to { transform: scaleY(-.55); } }
    @media (prefers-reduced-motion: reduce) { .pk5-scene .g3k-wing { animation-duration: .7s; } }
    .pk5-mark { top: -10px; right: -10px; }
    .pk5-grp > .pk5-mark { top: -18px; right: 50%; translate: 50% 0; min-width: 48px; height: 44px; font-size: 1.5rem; }
    .pk5-shoot { position: absolute; z-index: 3; left: 50%; bottom: 3%; height: 16%; translate: -50% 0; display: flex; align-items: center; gap: .4em; padding: 0 1.3em;
      border: 5px solid #fff; border-radius: 999px; background: linear-gradient(#F97316, #EA580C); color: #fff !important; font-size: clamp(1.2rem, 3.4vw, 2.2rem); font-weight: 800;
      text-shadow: 0 2px 0 #9A3412; box-shadow: 0 6px 0 #9A3412; cursor: pointer; animation: pk-pulse 1.4s ease-in-out infinite; }
    .pk5-shoot svg { height: 78%; width: auto; }
    .is-photo .pk5-shoot { animation: none; opacity: .45; filter: grayscale(.5); cursor: default; }
    .pk5-recount { left: 10px; top: 10px; }
    .pk5-scene.is-won .pk5-frame { box-shadow: 0 0 0 10px #FDE047, 0 10px 24px 10px rgba(15, 23, 42, .2); }
    .pk5-wait { opacity: .45; filter: grayscale(.4); }
  `;
  document.head.appendChild(st);
}
