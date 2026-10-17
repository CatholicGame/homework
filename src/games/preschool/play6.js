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
function playPair({ round, stage, talk, wrong, right, solve }) {
  const list = round.cards;
  const letOrder = shuffle(list.map((_, k) => k));
  const picOrder = shuffle(list.map((_, k) => k));
  stage.innerHTML = scene('pk6-pair', `
    <div class="pk6-lets">
      ${letOrder.map(k => `<button type="button" class="pk6-let" data-k="${k}" aria-label="Chữ ${list[k].ch}">${letters(list[k])}</button>`).join('')}
    </div>
    <div class="pk6-pics">
      ${picOrder.map(k => `<button type="button" class="pk6-opt" data-k="${k}" aria-label="Hình">${pic(list[k])}${wordHtml(list[k])}<span class="pk6-slot"></span></button>`).join('')}
    </div>`, list.length);
  let sel = null; // nút đang chọn (chữ hoặc hình)
  let left = list.length;
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
