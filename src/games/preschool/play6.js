/**
 * 🃏 Thẻ chữ cái — dạng lượt chơi của data6.js. Mọi lượt nằm trong một khung cảnh (trời, đồi cỏ) cao bằng
 * phần còn trống của màn hình; thẻ, ô chữ, nút hình là các nút to xếp sẵn từ đầu lượt (không đổi bố cục).
 *   flash — các thẻ của trang sách úp mặt chữ: chạm để lật sang mặt hình (Thỏ đọc "bờ. Con bò"), chạm lại lật về.
 *           Xem đủ mặt hình của mọi thẻ là xong.
 *   spot  — thẻ chữ bên cạnh hình và tên hình viết bằng từng ô chữ: chạm đúng chữ của thẻ trong tên hình.
 *           Chữ có dấu thanh vẫn tính (ắ là chữ ă), chạm ô nào có chữ đó cũng đúng.
 *   pair  — hàng chữ và hàng hình (xáo trộn): chạm chữ rồi chạm hình của thẻ đó (hoặc ngược lại), chữ bay vào ô của hình.
 *   which — Thỏ đọc tên chữ, bé chọn hình của thẻ chữ đó trong ba hình.
 * Khung cảnh dọc (cao hơn rộng) tự xếp lại theo cột: CSS container query trên khung, không theo màn hình.
 * Mỗi hình có một động tác riêng (flash/art.js): chạy khi thẻ lật sang mặt hình, khi đầu lượt tìm chữ, khi bé chạm
 * vào hình và khi ghép đúng.
 */

import '../../styles/preschool-flash.css';
import { FIELD_BACKDROP } from '../grade3Games/art/birds.js';
import { ART, injectArtCss, playArt } from './flash/art.js';
import { nameOf } from './flash/cards.js';
import { say, sfx, flyTo, whenQuiet } from './fx.js';

export const PLAYERS6 = Object.fromEntries(Object.entries({ flash: playFlash, spot: playSpot, pair: playPair, which: playWhich })
  .map(([type, fn]) => [type, (ctx) => { injectArtCss(); fn(ctx); }]));

const playIn = (el) => playArt(el?.querySelector('.pk6-pic'));

const shuffle = (a) => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(v => v[1]);
const upper = (ch) => ch.toUpperCase();

/** Bỏ dấu thanh, giữ dấu của chữ (ắ → ă, ổ → ô, ự → ư); chữ thường. */
const TONE = /[̣̀́̃̉]/g;
const baseOf = (ch) => ch.normalize('NFD').replace(TONE, '').normalize('NFC').toLowerCase();

/** Tên hình viết thường để Thỏ đọc trong câu ("Đây là con bò"); tiếng chứa chữ của thẻ. */
const lowerWord = (c) => c.word.charAt(0).toLowerCase() + c.word.slice(1);
const syllableOf = (c) => {
  const start = c.word.lastIndexOf(' ', c.at) + 1;
  const end = c.word.indexOf(' ', c.at);
  return c.word.slice(start, end < 0 ? undefined : end).toLowerCase();
};

const letters = (c) => `<span class="pk6-letters"><b>${upper(c.ch)}</b><b>${c.ch}</b></span>`;
/** Tên hình, chữ của thẻ tô đỏ như sách. */
const wordHtml = (c) => `<span class="pk6-word" style="--len:${c.word.length}">${[...c.word].map((x, i) => (i === c.at ? `<em>${x}</em>` : x)).join('')}</span>`;
const pic = (c) => `<span class="pk6-pic">${ART[c.pic] || ''}</span>`;

function scene(cls, inner, n = 0) {
  return `
    <div class="pk6 ${cls}" style="--n:${n}">
      <div class="pk6-scene">
        ${FIELD_BACKDROP}
        <div class="pk6-ground"></div>
        <div class="pk6-play">${inner}</div>
      </div>
    </div>`;
}

const readCard = (c) => say(`${c.name}. ${c.word}`);

// ── Lật thẻ ────────────────────────────────────────────────────────────
function playFlash({ round, stage, talk, solve, addCleanup }) {
  const list = round.cards;
  const seen = new Set();
  let done = false;
  stage.innerHTML = scene('pk6-flash', `
    <div class="pk6-deck">
      ${list.map((c, k) => `
        <button type="button" class="pk6-card" data-k="${k}" aria-label="Thẻ chữ ${c.ch}">
          <span class="pk6-flip">
            <span class="pk6-face pk6-front">${letters(c)}<span class="pk6-tapme" aria-hidden="true">👆</span></span>
            <span class="pk6-face pk6-back">${pic(c)}${wordHtml(c)}<span class="pk6-badge">${upper(c.ch)}${c.ch}</span></span>
          </span>
          <span class="pk6-seen" aria-hidden="true">✓</span>
        </button>`).join('')}
    </div>`, list.length);
  const btns = [...stage.querySelectorAll('.pk6-card')];
  const hint = () => {
    const next = btns.find((b, k) => !seen.has(k));
    btns.forEach(b => b.classList.toggle('is-hint', b === next && !b.classList.contains('is-flipped')));
  };
  btns.forEach(b => {
    b.onclick = () => {
      const k = Number(b.dataset.k);
      const c = list[k];
      const open = !b.classList.contains('is-flipped');
      b.classList.toggle('is-flipped', open);
      sfx.swish();
      if (!open) { say(`${c.name}`); hint(); return; }
      readCard(c);
      const t = setTimeout(() => playIn(b), 280); // giữa lúc lật: mặt hình vừa quay ra
      addCleanup(() => clearTimeout(t));
      seen.add(k);
      b.classList.add('is-seen');
      hint();
      if (!done && seen.size === list.length) {
        done = true;
        addCleanup(whenQuiet(() => solve(`Giỏi quá! Bé đã xem hết ${list.length} thẻ chữ rồi!`), { min: 900, gap: 300 }));
      }
    };
  });
  hint();
  talk(`Bé chạm vào từng thẻ để lật thẻ, xem hình và nghe đọc!`);
}

// ── Tìm chữ của thẻ trong tên hình ────────────────────────────────────
function playSpot({ round, stage, talk, wrong, right, solve, addCleanup }) {
  const c = round.card;
  const chars = [...c.word];
  // Tên hình chia theo tiếng: khung dọc hẹp thì xuống dòng giữa hai tiếng, không cắt đôi một tiếng.
  let from = 0;
  const words = c.word.split(' ').map(w => { const r = { w, from }; from += w.length + 1; return r; });
  stage.innerHTML = scene('pk6-spot', `
    <button type="button" class="pk6-target" aria-label="Nghe chữ ${c.ch}">${letters(c)}<span class="pk6-say">🔊</span></button>
    <div class="pk6-board">
      <button type="button" class="pk6-board-pic" aria-label="Nghe tên hình">${pic(c)}</button>
      <div class="pk6-tiles" style="--len:${chars.length};--wlen:${Math.max(...c.word.split(' ').map(w => w.length))}">
        ${words.map(({ w, from }) => `<span class="pk6-wgrp">${[...w].map((x, j) => `<button type="button" class="pk6-tile" data-i="${from + j}">${x}</button>`).join('')}</span>`).join('')}
      </div>
    </div>`);
  let done = false;
  stage.querySelector('.pk6-target').onclick = () => { sfx.tap(); say(c.name); };
  const board = stage.querySelector('.pk6-board-pic');
  board.onclick = () => { sfx.tap(); say(c.word); playIn(board); };
  const t = setTimeout(() => playIn(board), 500);
  addCleanup(() => clearTimeout(t));
  stage.querySelectorAll('.pk6-tile').forEach(b => {
    b.onclick = () => {
      if (done) { say(nameOf(baseOf(b.textContent))); return; }
      const got = baseOf(b.textContent);
      if (got !== c.ch) { wrong(b, `Đây là chữ ${nameOf(got)}. Bé tìm chữ ${c.name}!`); return; }
      done = true;
      stage.querySelectorAll('.pk6-tile').forEach(t => { if (baseOf(t.textContent) === c.ch) t.classList.add('is-right'); });
      right(b);
      playIn(board);
      solve(`Đúng rồi! Chữ ${c.name} ở trong tiếng ${syllableOf(c)}.`);
    };
  });
  talk(`Đây là ${lowerWord(c)}. Bé tìm chữ ${c.name} trong tên hình!`);
}

// ── Ghép chữ với hình ──────────────────────────────────────────────────
function playPair({ round, stage, talk, wrong, right, solve, addCleanup }) {
  const list = round.cards;
  const letOrder = shuffle(list.map((_, k) => k));
  const picOrder = shuffle(list.map((_, k) => k));
  stage.innerHTML = scene('pk6-pair', `
    <div class="pk6-lets">
      ${letOrder.map(k => `<button type="button" class="pk6-let" data-k="${k}" aria-label="Chữ ${list[k].ch}">${letters(list[k])}</button>`).join('')}
    </div>
    <div class="pk6-pics">
      ${picOrder.map(k => `<button type="button" class="pk6-opt" data-k="${k}" aria-label="Hình">${pic(list[k])}${wordHtml(list[k])}<span class="pk6-slot"></span></button>`).join('')}
    </div>
    <svg class="pk6-wires" aria-hidden="true"></svg>`, list.length);
  let sel = null; // nút đang chọn (chữ hoặc hình)
  let left = list.length;

  // Nét nối: ghép đúng thì vẽ một nét từ chữ tới hình (vẽ dần ra); kéo từ chữ/hình thì có nét chun theo tay.
  const play = stage.querySelector('.pk6-play');
  const svg = stage.querySelector('.pk6-wires');
  const NS = 'http://www.w3.org/2000/svg';
  const wires = []; // { a, b, g } nét đã nối
  const across = () => getComputedStyle(play).flexDirection === 'row'; // khung dọc: cột chữ trái, cột hình phải
  /** Điểm đầu nét trên mép nút, phía quay về hàng bên kia (toạ độ trong khung chơi). */
  const anchor = (btn) => {
    const r = btn.getBoundingClientRect();
    const P = play.getBoundingClientRect();
    const isLet = btn.classList.contains('pk6-let');
    if (across()) return { x: (isLet ? r.right : r.left) - P.left, y: r.top + r.height / 2 - P.top };
    return { x: r.left + r.width / 2 - P.left, y: (isLet ? r.bottom : r.top) - P.top };
  };
  const el = (tag, attrs, parent) => {
    const n = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
    parent?.appendChild(n);
    return n;
  };
  const wireG = (cls) => {
    const g = el('g', { class: cls }, svg);
    const len = cls.includes('is-new') ? { pathLength: 1 } : {}; // vẽ dần: dash theo độ dài 1; nét chun: dash theo px
    el('line', { class: 'pk6-wire-case', ...len }, g);
    el('line', { class: 'pk6-wire-ink', ...len }, g);
    el('circle', { class: 'pk6-wire-dot', r: 7 }, g);
    el('circle', { class: 'pk6-wire-dot', r: 7 }, g);
    return g;
  };
  const place = (g, p, q) => {
    g.querySelectorAll('line').forEach(l => { l.setAttribute('x1', p.x); l.setAttribute('y1', p.y); l.setAttribute('x2', q.x); l.setAttribute('y2', q.y); });
    const [d1, d2] = g.querySelectorAll('circle');
    d1.setAttribute('cx', p.x); d1.setAttribute('cy', p.y);
    d2.setAttribute('cx', q.x); d2.setAttribute('cy', q.y);
  };
  const redraw = () => {
    svg.setAttribute('viewBox', `0 0 ${play.clientWidth} ${play.clientHeight}`);
    wires.forEach(w => place(w.g, anchor(w.a), anchor(w.b)));
  };
  const ro = new ResizeObserver(redraw);
  ro.observe(play);
  addCleanup(() => ro.disconnect());
  redraw();
  const choose = (b) => {
    stage.querySelectorAll('.is-sel').forEach(x => x.classList.remove('is-sel'));
    sel = b;
    b?.classList.add('is-sel');
  };
  const match = (letBtn, picBtn) => {
    const k = Number(letBtn.dataset.k);
    if (k !== Number(picBtn.dataset.k)) {
      const last = picBtn === sel ? letBtn : picBtn; // nút vừa chạm
      choose(null);
      wrong(last);
      return;
    }
    choose(null);
    letBtn.classList.add('is-used');
    picBtn.classList.add('is-used');
    const g = wireG('pk6-wire is-new');
    wires.push({ a: letBtn, b: picBtn, g });
    place(g, anchor(letBtn), anchor(picBtn));
    const slot = picBtn.querySelector('.pk6-slot');
    flyTo(letBtn, slot, `${upper(list[k].ch)}${list[k].ch}`, () => {
      slot.textContent = `${upper(list[k].ch)}${list[k].ch}`;
      picBtn.classList.add('is-done');
      right(picBtn);
      playIn(picBtn);
      readCard(list[k]);
      if (--left === 0) solve(`Giỏi quá! Bé đã ghép đúng hết các thẻ rồi!`);
    });
  };
  // Kéo nối: nhấn giữ một chữ (hoặc hình), kéo nét chun tới hình (hoặc chữ) rồi thả.
  let drag = null; // { from, id, g, moved }
  let skipClick = null; // nút vừa kéo đi nơi khác: bỏ qua cú 'click' trình duyệt gửi kèm khi thả
  const endDrag = () => { drag?.g?.remove(); drag = null; };
  const onDown = (e) => {
    const b = e.currentTarget;
    if (b.classList.contains('is-used') || drag) return;
    drag = { from: b, id: e.pointerId, g: null, moved: false, x: e.clientX, y: e.clientY };
    try { b.setPointerCapture(e.pointerId); } catch { /* nút đã rời trang */ }
  };
  const onMove = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    if (!drag.moved && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 14) return;
    if (!drag.moved) { drag.moved = true; drag.g = wireG('pk6-wire is-rubber'); choose(drag.from); }
    const P = play.getBoundingClientRect();
    place(drag.g, anchor(drag.from), { x: e.clientX - P.left, y: e.clientY - P.top });
  };
  const onUp = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const { from, moved } = drag;
    endDrag();
    if (!moved) return; // chạm tại chỗ: để 'click' xử lý như cũ
    skipClick = from;
    setTimeout(() => { if (skipClick === from) skipClick = null; }, 400);
    const isLet = from.classList.contains('pk6-let');
    const to = document.elementFromPoint(e.clientX, e.clientY)?.closest(isLet ? '.pk6-opt' : '.pk6-let');
    if (!to || !stage.contains(to) || to.classList.contains('is-used')) { choose(null); return; }
    sfx.tap();
    if (isLet) match(from, to); else { say(list[Number(to.dataset.k)].name); match(to, from); }
  };
  stage.querySelectorAll('.pk6-let, .pk6-opt').forEach(b => {
    b.addEventListener('pointerdown', onDown);
    b.addEventListener('pointermove', onMove);
    b.addEventListener('pointerup', onUp);
    b.addEventListener('pointercancel', endDrag);
    b.addEventListener('lostpointercapture', (e) => { if (drag && e.pointerId === drag.id && !drag.moved) drag = null; });
    b.addEventListener('click', (e) => { if (skipClick === b) { skipClick = null; e.stopImmediatePropagation(); } }, true);
  });
  addCleanup(endDrag);

  stage.querySelectorAll('.pk6-let').forEach(b => {
    b.onclick = () => {
      if (b.classList.contains('is-used')) return;
      sfx.tap();
      say(list[Number(b.dataset.k)].name);
      if (sel?.classList.contains('pk6-opt')) match(b, sel);
      else choose(b);
    };
  });
  stage.querySelectorAll('.pk6-opt').forEach(b => {
    b.onclick = () => {
      if (b.classList.contains('is-used')) return;
      sfx.tap();
      if (sel?.classList.contains('pk6-let')) match(sel, b);
      else { choose(b); say(list[Number(b.dataset.k)].word); playIn(b); }
    };
  });
  talk('Bé chạm một chữ, rồi chạm hình của thẻ chữ đó!');
}

// ── Nghe chữ, chọn hình của thẻ ───────────────────────────────────────
function playWhich({ round, stage, talk, wrong, right, solve }) {
  const c = round.card;
  const opts = shuffle([c, ...round.others]);
  stage.innerHTML = scene('pk6-which', `
    <button type="button" class="pk6-target" aria-label="Nghe chữ ${c.ch}">${letters(c)}<span class="pk6-say">🔊</span></button>
    <div class="pk6-pics">
      ${opts.map((o, k) => `<button type="button" class="pk6-opt" data-k="${k}" aria-label="Hình">${pic(o)}${wordHtml(o)}<span class="pk6-slot"></span></button>`).join('')}
    </div>`, opts.length);
  const target = stage.querySelector('.pk6-target');
  let done = false;
  target.onclick = () => { sfx.tap(); say(c.name); };
  stage.querySelectorAll('.pk6-opt').forEach(b => {
    b.onclick = () => {
      if (done) return;
      const o = opts[Number(b.dataset.k)];
      playIn(b);
      if (o !== c) { wrong(b, `Đây là ${lowerWord(o)}, hình của thẻ chữ ${o.name}. Bé tìm hình của thẻ chữ ${c.name}!`); return; }
      done = true;
      const slot = b.querySelector('.pk6-slot');
      flyTo(target, slot, `${upper(c.ch)}${c.ch}`, () => {
        slot.textContent = `${upper(c.ch)}${c.ch}`;
        b.classList.add('is-done');
        right(b);
        solve(`Đúng rồi! Thẻ chữ ${c.name} có hình ${lowerWord(c)}!`);
      });
    };
  });
  talk(`Thẻ chữ ${c.name} có hình gì? Bé chạm vào hình đó!`);
}
