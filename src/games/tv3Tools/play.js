/**
 * Bộ máy chơi của 🧰 Tiếng Việt 3: Công cụ. Một đề (mission) là một trong năm dạng thao tác,
 * dựng trên lớp học + thầy giáo của Luyện Tính (grade3Drills/kit.js mountDrill), vòng chơi grade3Games/loop.js:
 *   pick  — đề trên tờ vở (có thể có chỗ trống), các lựa chọn là nút to ở vùng nút; đúng thì chữ bay vào chỗ trống.
 *   sort  — các từ trên tờ vở, mỗi giỏ là một nút to; chạm giỏ → từ đang sáng bay vào giỏ (từ đã xếp nằm trong nút).
 *   tap   — một câu trên tờ vở, chạm các từ cần tìm; từ tìm được bay vào ô của nó ở vùng nút.
 *   order — mảnh xáo trộn ở vùng nút (từ / cụm từ / câu), chạm lần lượt để ghép thành câu (hoặc đoạn văn) trên tờ vở.
 *   spell — chỗ trống chính tả: dùng nguyên trò 🔤 Luật chính tả (tv3Spell.js) với luật của bài.
 * Bố cục giữ nguyên cả lượt: mọi ô, mọi nút có chỗ từ đầu; dòng giải thích dưới tờ vở giữ chỗ (visibility).
 * Làm đúng ngay → đề thành công; sai thì thầy nhắc, em làm lại tới khi đúng nhưng đề đó tính thất bại.
 */

import { mountDrill, shake, setActive, sfx, sleep, flyOne, INK } from '../grade3Drills/kit.js';
import { SPELL_GAME } from '../tv3Spell.js';

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const plain = (html) => String(html).replace(/<[^>]*>/g, '');
const capFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/** Chỗ trống trong đề pick: "{_}" trong body. */
const SLOT = '{_}';

export function mountMission(stage, m, api) {
  injectStyles();
  if (m.kind === 'spell') {
    // 🔤 dùng nguyên màn của Luật chính tả: cùng khung lớp học, cùng cách chấm
    SPELL_GAME.mountMission(stage, m.spell, { rules: [m.spell.rule] }, api);
    return;
  }
  const M = { pick: pickMount, sort: sortMount, tap: tapMount, order: orderMount }[m.kind];
  M(stage, m, api);
}

/** Khung chung: tờ vở (đề · nội dung · dòng giải thích) + vùng nút riêng thay cho bàn phím số. */
function frame(stage, m, api, main, pad, cls = '') {
  // dòng đề trùng nguyên lời thầy trong bong bóng thì bỏ, khỏi đọc hai lần
  const dupHead = m.head && !m.sayShown && (!m.say || plain(m.head).trim() === plain(m.say).trim());
  const board = `<div class="tt ${cls}">
      ${m.head ? `<div class="tt-head">${dupHead ? '' : m.head}</div>` : ''}
      <div class="tt-main">${main}</div>
      <div class="tt-why">&nbsp;</div>
    </div>`;
  const d = mountDrill(stage, { api, board, cls: `tt-scene ${m.wide ? 'tt-wide' : ''}` });
  // thẻ kết quả nằm trong khung tờ đề (góc dưới bên phải), không đè lên vùng nút: giỏ, ô đã điền vẫn xem lại được
  d.scene.removeAttribute('data-result-host');
  d.scene.querySelector('.g3d-board').setAttribute('data-result-host', '');
  fitMain(d.paper.querySelector('.tt-main'));
  const zone = d.scene.querySelector('.g3d-padzone');
  zone.innerHTML = `<div class="tt-pad">${pad}</div>`;
  const f = {
    ...d, pad: zone.querySelector('.tt-pad'), paper: d.paper, mistakes: 0, tip: '',
    /** Thầy nêu đề; dòng đề đã bỏ khỏi tờ vở thì bong bóng hiện nguyên đề (giữ chữ tô màu). */
    ask() { d.say(plain(m.say || m.head || ''), m.sayShown || (dupHead ? m.head : undefined)); },
    why(html) { const w = d.paper.querySelector('.tt-why'); w.innerHTML = html; w.classList.add('is-on'); },
    miss(el, hint) {
      if (!f.mistakes++) f.tip = plain(hint || '');
      shake(el);
      if (hint) d.hint(plain(hint), hint);
    },
    end(ok) { setActive(d.paper, null); return sleep(650).then(() => d.done(f.mistakes, { ok, tip: f.tip })); },
  };
  return f;
}

/**
 * Chữ trên tờ vở to hết cỡ: thử cỡ chữ (chia đôi khoảng) tới cỡ lớn nhất mà nội dung còn vừa vùng giữa tờ vở.
 * Đo một lần lúc dựng đề (ô trống đã giữ chỗ cho chữ dài nhất nên điền vào không đổi cỡ), đo lại khi đổi khung (xoay màn).
 */
function fitMain(main) {
  const el = main.firstElementChild;
  if (!el) return;
  const fit = () => {
    const H = main.clientHeight, W = main.clientWidth;
    if (!H || !W) return;
    let lo = 12, hi = Math.min(170, H * 0.42);
    for (let k = 0; k < 10; k++) {
      const mid = (lo + hi) / 2;
      el.style.fontSize = `${mid}px`;
      if (el.scrollHeight <= H && el.scrollWidth <= W) lo = mid; else hi = mid;
    }
    el.style.fontSize = `${Math.floor(lo)}px`;
  };
  fit();
  new ResizeObserver(fit).observe(main);
  refitOnFonts(main, fit);
}

/**
 * Mảnh ở vùng nút (ô lưới cố định): cỡ chữ lớn nhất mà mọi mảnh còn nằm gọn trong ô của nó (--fs trên lưới).
 * tiles: các ô cần vừa (mặc định các con của lưới); giỏ xếp từ truyền phần thân giỏ, đã chứa sẵn mọi từ sẽ vào (ẩn).
 */
function fitTiles(grid, tiles = [...grid.children], hiMax = 72) {
  const fit = () => {
    if (!grid.clientHeight) return;
    let lo = 11, hi = hiMax;
    for (let k = 0; k < 10; k++) {
      const mid = (lo + hi) / 2;
      grid.style.setProperty('--fs', `${mid}px`);
      if (tiles.every(t => t.scrollHeight <= t.clientHeight + 1 && t.scrollWidth <= t.clientWidth + 1)) lo = mid; else hi = mid;
    }
    grid.style.setProperty('--fs', `${Math.floor(lo)}px`);
  };
  fit();
  new ResizeObserver(fit).observe(grid);
  refitOnFonts(grid, fit);
}

/** Phông (Baloo 2) tải xong sau lần đo đầu thì chữ to hơn chữ thay thế: đo lại, kẻo chữ tràn đè dòng đề. */
function refitOnFonts(el, fit) {
  if (!document.fonts) return;
  const on = () => (el.isConnected ? fit() : document.fonts.removeEventListener('loadingdone', on));
  document.fonts.ready.then(on);
  document.fonts.addEventListener('loadingdone', on);
}

/**
 * Chỉ chữ bay (không nền, không khung). Khung bay giữ đúng tỉ lệ của chữ nguồn và chỉ phóng theo cỡ chữ ở chỗ đáp,
 * đáp vào giữa ô đích: ô đích rộng (cả hàng) thì chữ cũng không phình theo bề ngang ô.
 */
const fly = (html, fromEl, toEl, cls = 'tt-fly') => new Promise(res => {
  const a = fromEl.getBoundingClientRect(), b = toEl.getBoundingClientRect();
  const fs0 = parseFloat(getComputedStyle(fromEl).fontSize) || 16;
  const fs1 = parseFloat(getComputedStyle(toEl).fontSize) || fs0;
  const w = a.width * fs1 / fs0, h = a.height * fs1 / fs0;
  const to = { left: b.left + (b.width - w) / 2, top: b.top + (b.height - h) / 2, width: w, height: h };
  const ms = flyOne(`<div class="${cls}" style="font-size:${fs0}px">${html}</div>`, a, to, { minMs: 420, maxMs: 760, onLand: res });
  if (!ms) res();
});

// ── pick ────────────────────────────────────────────────────────────────────────────────────────────
// m: { head, body (HTML, có thể chứa {_}), options: [chuỗi], answer, say, why (HTML sau khi đúng), hint(value) | hint }
function pickMount(stage, m, api) {
  const opts = m.options;
  const longest = Math.max(...opts.map(o => plain(o).length));
  const slotW = Math.max(3, longest);
  const body = esc0(m.body).replace(SLOT, `<span class="tt-slot" style="--w:${slotW}"><span class="tt-slot-in"></span></span>`);
  const long = longest > 9;
  const pad = `<div class="tt-opts ${long ? 'is-long' : ''} ${longest > 24 ? 'is-xlong' : ''}" style="--n:${opts.length};--len:${longest}">
      ${opts.map((o, i) => `<button type="button" class="tt-opt" data-i="${i}"><span class="tt-key">${'ABCDEF'[i]}</span><span class="tt-opt-t">${o}</span></button>`).join('')}</div>`;
  const f = frame(stage, m, api, `<div class="tt-body ${m.small ? 'is-small' : ''}">${body}</div>`, pad, 'tt-pick');
  const slot = f.paper.querySelector('.tt-slot');
  if (slot) setActive(f.paper, slot);
  f.ask();
  let busy = false;
  f.pad.addEventListener('click', async (e) => {
    const b = e.target.closest('.tt-opt');
    if (!b || b.disabled || busy) return;
    const v = opts[+b.dataset.i];
    if (v !== m.answer) {
      b.disabled = true;
      b.classList.add('is-bad');
      f.miss(b, typeof m.hint === 'function' ? m.hint(v) : m.hint);
      return;
    }
    busy = true;
    sfx.tap();
    b.classList.add('is-ok');
    f.pad.querySelectorAll('.tt-opt').forEach(x => { x.disabled = true; });
    if (slot) {
      await fly(v, b.querySelector('.tt-opt-t'), slot);
      slot.querySelector('.tt-slot-in').innerHTML = v;
      slot.classList.add('is-ok');
    }
    sfx.ding();
    if (m.why) f.why(m.why);
    if (m.read) f.say(m.read, `✔️ ${m.why || m.read}`);
    f.end(m.ok || 'Em chọn đúng!');
  });
  if (import.meta.env.DEV) window.__g3drill = { m, step: () => f.pad.querySelector(`.tt-opt[data-i="${opts.indexOf(m.answer)}"]`)?.click() };
}

// Đề viết bằng HTML có sẵn (b, u, i, span) — không thoát lại; dữ liệu do mình soạn.
const esc0 = (html) => String(html);

// ── sort ────────────────────────────────────────────────────────────────────────────────────────────
// m: { head, items: [{ t, cat }], cats: [{ id, name, icon }], hint(item, catId) }
function sortMount(stage, m, api) {
  const { items, cats } = m;
  const longest = Math.max(...items.map(x => x.t.length));
  const main = `<div class="tt-chips" style="--len:${longest};--n:${items.length}">${items.map((x, i) => `<span class="tt-chip" data-i="${i}">${esc(x.t)}</span>`).join('')}</div>`;
  const pad = `<div class="tt-bins" style="--n:${cats.length}">${cats.map(c => `
      <button type="button" class="tt-bin" data-c="${c.id}" style="--c:${c.color || '#0EA5E9'}">
        <span class="tt-bin-h">${c.icon ? `<i>${c.icon}</i>` : ''}${esc(c.name)}</span>
        <span class="tt-bin-in">${items.map((x, i) => x.cat === c.id ? `<span class="tt-binw is-wait" data-i="${i}">${esc(x.t)}</span>` : '').join('')}</span>
      </button>`).join('')}</div>`;
  // Mỗi giỏ giữ sẵn chỗ (ẩn) cho mọi từ của nó theo thứ tự sẽ xếp: chữ to hết cỡ mà giỏ đầy nhất vẫn vừa, từ đáp vào đúng chỗ.
  const f = frame(stage, m, api, main, pad, 'tt-sort');
  fitTiles(f.pad.querySelector('.tt-bins'), [...f.pad.querySelectorAll('.tt-bin-in')], 90);
  let cur = 0, busy = false;
  const chip = (i) => f.paper.querySelector(`.tt-chip[data-i="${i}"]`);
  const focus = () => setActive(f.paper, chip(cur));
  focus();
  f.ask();
  f.pad.addEventListener('click', async (e) => {
    const b = e.target.closest('.tt-bin');
    if (!b || busy || cur >= items.length) return;
    const it = items[cur];
    if (b.dataset.c !== it.cat) { f.miss(b, m.hint(it, b.dataset.c)); return; }
    busy = true;
    sfx.tap();
    const c = chip(cur);
    const dest = b.querySelector(`.tt-binw[data-i="${cur}"]`);
    c.classList.add('is-done');
    await fly(esc(it.t), c, dest, 'tt-fly tt-fly-chip');
    dest.classList.remove('is-wait');
    sfx.pop(cur);
    cur++;
    busy = false;
    if (cur < items.length) { focus(); return; }
    sfx.ding();
    if (m.why) f.why(m.why);
    f.end(m.ok || 'Em xếp đúng hết!');
  });
  if (import.meta.env.DEV) window.__g3drill = { m, step: () => f.pad.querySelector(`.tt-bin[data-c="${items[cur]?.cat}"]`)?.click() };
}

// ── tap ─────────────────────────────────────────────────────────────────────────────────────────────
/**
 * Câu viết theo cú pháp: tiếng cách nhau bằng dấu cách, "_" nối các tiếng của một từ ("nhảy_dây"),
 * "*" ngay sau từ (hoặc ngay trước từ) đánh dấu từ cần tìm, "*a" = từ cần tìm thuộc ô a (vd. so sánh: a sự vật 1, w từ so sánh, b sự vật 2).
 * Dấu câu dính sau từ được tách ra, không chạm được.
 */
export function parseTap(text) {
  return text.trim().split(/\s+/).map((raw) => {
    // "*" đứng trước từ ("*bơi") cũng là từ cần tìm (nhóm mặc định)
    const mm = raw.match(/^([("“]*)(\*?)(.*?)(\*([a-z]?))?([.,!?:;…”")]*)$/);
    const [, pre, lead, w, star, role, post] = mm;
    const target = !!(lead || star);
    return { pre, t: w.replace(/_/g, ' '), target, role: target ? (role || 'x') : null, post };
  });
}

// m: { head, text, slots: [{ role, name }] (mặc định một nhóm 'x'), hint(token) }
function tapMount(stage, m, api) {
  const toks = parseTap(m.text);
  const targets = toks.filter(t => t.target);
  const slots = m.slots || [{ role: 'x', name: m.slotName || '' }];
  const main = `<div class="tt-sent">${toks.map((t, i) => `${esc(t.pre)}<span class="tt-tok" data-i="${i}">${esc(t.t)}</span>${esc(t.post)}`).join(' ')}</div>`;
  const per = (r) => targets.filter(t => t.role === r).length;
  const longest = Math.max(...targets.map(t => t.t.length));
  const pad = `<div class="tt-found" style="--n:${slots.length};--len:${longest}">${slots.map(s => `
      <div class="tt-fbox" data-r="${s.role}" style="--c:${s.color || '#16A34A'}">
        ${s.name ? `<span class="tt-fbox-h">${esc(s.name)}</span>` : ''}
        <span class="tt-fbox-in">${Array.from({ length: per(s.role) }, () => '<span class="tt-fslot"></span>').join('')}</span>
      </div>`).join('')}</div>`;
  const f = frame(stage, m, api, main, pad, 'tt-tap');
  f.ask();
  let left = targets.length, busy = false;
  f.paper.querySelector('.tt-sent').addEventListener('click', async (e) => {
    const el = e.target.closest('.tt-tok');
    if (!el || busy || !left || el.classList.contains('is-got')) return;
    const t = toks[+el.dataset.i];
    if (!t.target) {
      el.classList.add('is-bad');
      setTimeout(() => el.classList.remove('is-bad'), 700);
      f.miss(el, m.hint?.(t) || m.hintText);
      return;
    }
    busy = true;
    sfx.tap();
    el.classList.add('is-got');
    el.style.setProperty('--c', slots.find(s => s.role === t.role)?.color || '#16A34A');
    const box = f.pad.querySelector(`.tt-fbox[data-r="${t.role}"] .tt-fslot:not(.is-on)`);
    await fly(esc(t.t), el, box, 'tt-fly tt-fly-chip');
    box.textContent = t.t;
    box.classList.add('is-on');
    sfx.pop(targets.length - left);
    left--;
    busy = false;
    if (left) return;
    sfx.ding();
    if (m.why) f.why(m.why);
    f.end(m.ok || 'Em tìm đúng hết!');
  });
  if (import.meta.env.DEV) {
    window.__g3drill = { m, step: () => { const i = toks.findIndex((t, k) => t.target && !f.paper.querySelector(`.tt-tok[data-i="${k}"]`).classList.contains('is-got')); f.paper.querySelector(`.tt-tok[data-i="${i}"]`)?.click(); } };
  }
}

// ── order ───────────────────────────────────────────────────────────────────────────────────────────
// m: { head, pieces (thứ tự đúng), alts: [[…]] thứ tự khác cũng đúng, end ('.', '?', '!'), para (ghép câu thành đoạn), shuffled }
function orderMount(stage, m, api) {
  const orders = [m.pieces, ...(m.alts || [])];
  const shuffled = m.shuffled;
  const longest = Math.max(...m.pieces.map(p => p.length));
  const longestPiece = m.pieces.find(p => p.length === longest);
  const main = m.para
    // mỗi ô giữ sẵn chỗ bằng mảnh dài nhất (chữ ẩn): điền mảnh nào vào cũng không xô các ô khác
    ? `<ol class="tt-para">${m.pieces.map((_, i) => `<li class="tt-pslot" data-k="${i}"><span class="tt-ghost">${esc(longestPiece)}</span></li>`).join('')}</ol>`
    : `<div class="tt-line">${m.pieces.map((_, i) => {
      const slot = `<span class="tt-wslot" data-k="${i}"><span class="tt-ghost">${esc(longestPiece)}</span></span>`;
      // dấu cuối câu dính vào ô cuối (không rơi xuống một dòng riêng)
      return i === m.pieces.length - 1 ? `<span class="tt-wlast">${slot}<span class="tt-end">${esc(m.end || '')}</span></span>` : slot;
    }).join('')}</div>`;
  // Mảnh xếp từ trên xuống, mỗi mảnh một hàng rộng hết vùng nút (chữ to theo chỗ của một ô); từ 5 mảnh chia 2 cột.
  // Vùng nút dẹt (máy tính bảng dọc, điện thoại ngang): mảnh dàn thành hàng (--wcols).
  const n = shuffled.length, cols = n >= 5 ? 2 : 1, wcols = n <= 3 ? n : Math.ceil(n / 2);
  const grid = `--cols:${cols};--rows:${Math.ceil(n / cols)};--wcols:${wcols};--wrows:${Math.ceil(n / wcols)}`;
  const pad = `<div class="tt-tiles ${m.para ? 'is-para' : ''}" style="--n:${n};--len:${longest};${grid}">${shuffled.map((p, i) => `<button type="button" class="tt-tile" data-i="${i}">${esc(p)}</button>`).join('')}</div>`;
  const f = frame(stage, m, api, main, pad, m.para ? 'tt-order tt-order-para' : 'tt-order');
  fitTiles(f.pad.querySelector('.tt-tiles'));
  const placed = [];
  const slot = (k) => f.paper.querySelector(`[data-k="${k}"]`);
  setActive(f.paper, slot(0));
  f.ask();
  let busy = false;
  f.pad.addEventListener('click', async (e) => {
    const b = e.target.closest('.tt-tile');
    if (!b || b.disabled || busy) return;
    const p = shuffled[+b.dataset.i];
    const k = placed.length;
    const ok = orders.some(o => placed.every((x, j) => o[j] === x) && o[k] === p);
    if (!ok) { f.miss(b, m.hint?.(p, k) || (k === 0 && !m.para ? 'Câu bắt đầu bằng chữ viết hoa. Mảnh nào đứng đầu câu?' : m.hintText)); return; }
    busy = true;
    sfx.tap();
    b.disabled = true;
    b.classList.add('is-used');
    const s = slot(k);
    await fly(esc(p), b, s, `tt-fly ${m.para ? 'tt-fly-para' : 'tt-fly-chip'}`);
    s.insertAdjacentHTML('beforeend', `<span>${esc(p)}</span>`);
    s.classList.add('is-on');
    placed.push(p);
    sfx.pop(k);
    busy = false;
    if (placed.length < m.pieces.length) { setActive(f.paper, slot(placed.length)); return; }
    setActive(f.paper, null);
    sfx.ding();
    const whole = m.para ? placed.join(' ') : capFirst(placed.join(' ')) + (m.end || '');
    if (m.why) f.why(m.why);
    f.say(whole, `✔️ ${esc(whole)}`);
    f.end(m.ok || (m.para ? 'Đoạn văn đúng thứ tự!' : 'Em ghép đúng câu!'));
  });
  if (import.meta.env.DEV) {
    window.__g3drill = { m, step: () => { const want = orders.find(o => placed.every((x, j) => o[j] === x))[placed.length]; f.pad.querySelector(`.tt-tile[data-i="${shuffled.findIndex((p, i) => p === want && !f.pad.querySelector(`.tt-tile[data-i="${i}"]`).disabled)}"]`)?.click(); } };
  }
}

let styled = false;
function injectStyles() {
  if (styled) return;
  styled = true;
  const st = document.createElement('style');
  st.id = 'tt-styles';
  st.textContent = `
    /* Bố cục thẻ bài học (ngang lẫn dọc): thầy + bong bóng ở trên, tờ đề ở giữa, các nút chọn ở dưới.
       Viền mảnh màu dịu (--tt-edge), bóng nổi cùng tông, không khung tối, không lề đỏ. */
    .tt-scene { --tt-edge: #D6E2F0; --tt-ink: #1E293B; --tt-blue: #2563EB; --tt-teach: clamp(80px, 15vh, 160px); }
    .g3d-scene.tt-scene { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr) clamp(160px, 28%, 360px);
      grid-template-areas: "teach" "board" "pad"; gap: clamp(0.5rem, 1.6vh, 1rem); padding: clamp(0.6rem, 1.8vh, 1.1rem) clamp(0.7rem, 3vw, 3rem) clamp(0.8rem, 2.2vh, 1.4rem); }
    /* xếp đoạn văn: câu dài ở cả tờ đề lẫn vùng nút → chia đôi chiều cao */
    .g3d-scene.tt-scene.tt-wide { grid-template-rows: auto minmax(0, 1fr) minmax(0, 1fr); }
    /* hàng thầy cao cố định: lời nhắc dài thì chữ trong bong bóng thu nhỏ (fitSay), tờ đề không bị đẩy */
    .tt-scene .g3d-teach { grid-template-columns: auto minmax(0, 1fr); grid-template-rows: minmax(0, 1fr); align-items: center; gap: 1rem; height: var(--tt-teach); }
    .tt-scene .g3d-npc { height: 100%; }
    .tt-scene .g3d-bubble { border-color: var(--tt-edge); border-radius: 1.2rem; box-shadow: 0 4px 0 var(--tt-edge); min-height: 0; max-height: 100%; box-sizing: border-box; overflow: hidden; padding: 0.5rem 1.1rem;
      font-size: clamp(1rem, 1.5vh + 0.65rem, 1.6rem); color: var(--tt-ink); }
    .tt-scene .g3d-bubble::before { border-right-color: var(--tt-edge); }
    .tt-scene .g3d-bubble-hint { background: #FFFBEB; border-color: #FCD34D; box-shadow: 0 4px 0 #FCD34D; }
    .tt-scene .g3d-name { color: #B45309; }
    .tt-scene .g3d-say b { color: var(--tt-blue); }
    .tt-scene .g3d-paper { border-color: var(--tt-edge); border-radius: 1.4rem; box-shadow: 0 6px 0 var(--tt-edge), 0 14px 30px rgba(30,58,138,0.07); }
    @media (orientation: portrait) {
      .g3d-scene.tt-scene { grid-template-rows: auto minmax(0, 1fr) clamp(200px, 36%, 520px); padding-left: 0.8rem; padding-right: 0.8rem; }
      .tt-scene { --tt-teach: clamp(84px, 12vh, 150px); }
    }
    @media (orientation: landscape) and (max-height: 500px) {
      .g3d-scene.tt-scene:not(.tt-wide) { grid-template-rows: auto minmax(0, 1fr) clamp(100px, 34%, 160px); }
      .tt-scene { --tt-teach: 60px; }
      .tt-scene .g3d-bubble { font-size: 0.9rem; padding: 0.3rem 0.7rem; }
    }
    /* thẻ kết quả: góc dưới bên phải tờ đề (chỗ quen của nút "tiếp theo"); dòng giải thích chừa sẵn bên phải cho thẻ */
    .tt-scene { --tt-card: clamp(240px, 32%, 400px); }
    .tt-scene .g3d-board > .g3g-result { position: absolute; z-index: 5; right: 1rem; bottom: 1rem; width: var(--tt-card); max-height: calc(100% - 2rem); overflow-y: auto;
      text-align: center; align-items: stretch; border-width: 2px; border-radius: 1.2rem; box-shadow: 0 5px 0 rgba(0,0,0,0.08), 0 14px 30px rgba(0,0,0,0.18);
      transform-origin: 100% 100%; animation: g3dCard .35s cubic-bezier(.2,1.4,.4,1); }
    @media (prefers-reduced-motion: reduce) { .tt-scene .g3d-board > .g3g-result { animation: g3dCardCalm .3s ease; } }
    .tt-scene .g3d-board > .g3g-result .g3g-result-text { font-size: clamp(1rem, 1.6vh + 0.55rem, 1.35rem); }
    .tt-scene .g3d-board > .g3g-result .g3g-tip { font-size: clamp(0.9rem, 1.3vh + 0.5rem, 1.15rem); text-align: left; }
    .tt-scene .g3d-board > .g3g-result .g3g-btn { font-size: clamp(1rem, 1.6vh + 0.6rem, 1.3rem); white-space: normal; }
    /* đúng: thầy đã khen trong bong bóng, thẻ chỉ còn nút "tiếp theo" (gọn, không che bài) */
    .tt-scene .g3d-board > .g3g-result-ok { width: auto; min-width: min(260px, 40%); padding: 0.55rem; background: transparent; border-color: transparent; box-shadow: none; }
    .tt-scene .g3d-board > .g3g-result-ok .g3g-result-text { display: none; }
    .tt-scene .g3d-board > .g3g-result-ok .g3g-btn { padding-inline: 1.6em; box-shadow: 0 5px 0 #15803D, 0 10px 22px rgba(21,128,61,0.3); }
    /* điện thoại ngang: tờ đề thấp, nút lên bên phải hàng thầy (bong bóng lúc đó chỉ có câu khen ngắn) */
    @media (orientation: landscape) and (max-height: 500px) {
      .tt-scene .g3d-board > .g3g-result { right: 0.4rem; bottom: 0.4rem; }
      .tt-scene .g3d-board > .g3g-result-ok { right: 0.5rem; bottom: calc(100% + 0.5rem); padding: 0; min-width: 0; }
      .tt-scene .g3d-board > .g3g-result-ok .g3g-btn { font-size: 0.95rem; padding-block: 0.45em; }
    }
    .tt-scene .g3d-padzone { container-type: size; }
    .tt-pad { height: 100%; box-sizing: border-box; padding: 0.15rem 0.15rem 0.5rem; display: flex; }
    .tt-pad > * { flex: 1; min-width: 0; min-height: 0; }

    .tt { height: 100%; box-sizing: border-box; display: grid; grid-template-rows: auto minmax(0, 1fr) auto; gap: 1.5cqh;
      padding: 2.6cqh 3.4cqi 2.4cqh; font-family: 'Baloo 2', 'Quicksand', sans-serif; color: var(--tt-ink); }
    .tt-head { font-weight: 600; color: #64748B; font-size: min(5.6cqh, 5cqi, 1.7rem); line-height: 1.3; }
    .tt-head b { color: var(--tt-blue); font-weight: 700; }
    .tt-main { min-height: 0; display: flex; flex-direction: column; justify-content: center; container-type: size; }
    .tt-why { margin-right: var(--tt-card); min-height: 2.6em; font-weight: 600; font-size: min(4.6cqh, 3.2cqi, 1.45rem); line-height: 1.3; color: #166534; background: #F0FDF4; border-radius: 0.7em; padding: 0.3em 0.7em;
      visibility: hidden; }
    .tt-why.is-on { visibility: visible; }
    .tt-why b { color: #15803D; }
    @container (aspect-ratio < 1) {
      .tt-head { font-size: min(4.8cqh, 6.4cqi); }
      .tt-why { font-size: min(4.2cqh, 5.6cqi); }
    }

    /* pick */
    .tt-body { font-weight: 700; font-size: min(14cqh, 7.2cqi); line-height: 1.35; text-align: center; text-wrap: balance; }
    .tt-body.is-small { font-size: min(11cqh, 5.4cqi); }
    .tt-body .tt-icon { font-size: 2.4em; line-height: 1; }
    .tt-body u { text-decoration-color: #F97316; text-decoration-thickness: 0.08em; text-underline-offset: 0.12em; }
    .tt-body mark { white-space: nowrap; background: #FEF3C7; color: inherit; border-radius: 0.25em; padding: 0 0.25em; box-shadow: inset 0 -0.12em 0 #FCD34D; }
    .tt-slot { display: inline-flex; align-items: center; justify-content: center; min-width: calc(var(--w) * 0.55em + 0.6em); height: 1.25em; vertical-align: middle;
      border: max(2px, 0.04em) dashed #93C5FD; border-radius: 0.22em; background: #F8FAFC; box-sizing: border-box; color: #15803D; }
    .tt-slot-in:empty::before { content: '?'; color: #BFDBFE; font-size: 0.8em; }
    .tt-slot.g3d-on { border-color: var(--tt-blue); background: #EFF6FF; animation: none; box-shadow: none; }
    .tt-slot.g3d-on .tt-slot-in:empty::before { color: #93C5FD; }
    .tt-slot.is-ok { border-style: solid; border-color: #22C55E; background: #F0FDF4; }
    .tt-opts { display: grid; gap: min(3cqh, 3cqi); grid-template-columns: repeat(var(--n), minmax(0, 1fr)); }
    .tt-opts.is-long { grid-template-columns: 1fr; grid-template-rows: repeat(var(--n), minmax(0, 1fr)); }
    /* vùng nút hẹp (điện thoại dọc): 2 cột, riêng 3 lựa chọn thì mỗi cái một hàng (3 cột hẹp quá, chữ bị vòng A/B/C đè) */
    @container (aspect-ratio < 1.6) { .tt-opts:not(.is-long) { grid-template-columns: repeat(2, minmax(0, 1fr)); } .tt-opts:not(.is-long)[style*="--n:3"] { grid-template-columns: 1fr; } }
    @container (aspect-ratio > 2.2) { .tt-opts.is-long { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: none; } }
    /* Nút chọn: thẻ trắng viền mảnh, chữ cái A/B/C trong vòng tròn bên trái, chữ ở giữa */
    .tt-opt { position: relative; display: flex; align-items: center; justify-content: center; border: 2px solid var(--tt-edge); border-radius: 1.2rem; background: #fff; color: var(--tt-ink);
      font-family: 'Baloo 2', 'Quicksand', sans-serif; font-weight: 700; line-height: 1.15; cursor: pointer; padding: 0.15em var(--kw); min-width: 0;
      /* chỗ chừa cho vòng A/B/C (hai bên bằng nhau để chữ vẫn ở giữa nút) */ --kw: calc(max(0.6rem, 0.25em) + 2.1 * max(0.9rem, 0.3em) + 0.25em); min-height: 0;
      touch-action: manipulation; box-shadow: 0 5px 0 var(--tt-edge); text-wrap: balance; transition: border-color .15s, background .15s, translate .1s;
      font-size: min(calc(60cqh / var(--n)), calc(80cqi / max(2.2, var(--len) * 0.55)), 4rem); }
    .tt-opts:not(.is-long) .tt-opt { font-size: min(30cqh, calc((80cqi / var(--n) - 2rem) / (var(--len) * 0.55 + 2.4)), 5rem); }
    @container (aspect-ratio < 1.6) {
      .tt-opts:not(.is-long) .tt-opt { font-size: min(18cqh, calc((40cqi - 2rem) / (var(--len) * 0.55 + 2.4)), 5rem); }
      .tt-opts:not(.is-long)[style*="--n:3"] .tt-opt { font-size: min(17cqh, calc((84cqi - 2rem) / (var(--len) * 0.55 + 2.4)), 4rem); }
    }
    .tt-opts.is-long .tt-opt { font-size: min(calc(42cqh / var(--n)), calc((96cqi - 3rem) / max(8, var(--len) * 0.55)), 2.4rem); justify-content: flex-start; text-align: left;
      --kw: calc(max(0.6rem, 0.25em) + 2.1 * max(0.8rem, 0.5em) + 0.3em); padding-right: 0.5em; }
    .tt-key { position: absolute; left: max(0.6rem, 0.25em); top: 50%; translate: 0 -50%; width: 2.1em; aspect-ratio: 1; display: grid; place-items: center; border-radius: 50%;
      background: #EEF2FF; color: #3730A3; font-size: max(0.9rem, 0.3em); font-weight: 800; line-height: 1; }
    .tt-opts.is-long .tt-key { font-size: max(0.8rem, 0.5em); }
    /* lựa chọn rất dài (nghĩa của từ): cho xuống 2 dòng, cỡ chữ theo nửa độ dài */
    .tt-opts.is-xlong .tt-opt { font-size: min(calc(30cqh / var(--n)), calc((96cqi - 3rem) * 2 / (var(--len) * 0.6)), 2rem); }
    /* vùng nút dẹt, lựa chọn không quá dài (≤ 24 chữ): mỗi lựa chọn một cột, chữ giữa nút như lựa chọn ngắn */
    @container (aspect-ratio > 2.2) {
      .tt-opts.is-long:not(.is-xlong) { grid-template-columns: repeat(var(--n), minmax(0, 1fr)); }
      .tt-opts.is-long:not(.is-xlong) .tt-opt { font-size: min(22cqh, calc(84cqi / var(--n) / (var(--len) * 0.55 + 1.6)), 3.6rem); justify-content: center; text-align: center;
        --kw: calc(max(0.6rem, 0.25em) + 2.1 * max(0.85rem, 0.32em) + 0.25em); padding-right: var(--kw); }
      .tt-opts.is-long:not(.is-xlong) .tt-key { font-size: max(0.85rem, 0.32em); }
      /* 3 lựa chọn rất dài: mỗi cái một hàng hết bề ngang, khỏi để trống một ô */
      .tt-opts.is-xlong[style*="--n:3"] { grid-template-columns: 1fr; grid-template-rows: repeat(3, minmax(0, 1fr)); }
    }
    @media (hover: hover) { .tt-opt:not(:disabled):hover { border-color: #93C5FD; translate: 0 -2px; } }
    .tt-opt:active { translate: 0 3px; box-shadow: 0 2px 0 var(--tt-edge); }
    .tt-opt.is-bad { background: #FEF2F2; border-color: #FCA5A5; color: #B91C1C; box-shadow: 0 5px 0 #FECACA; cursor: default; translate: none; }
    .tt-opt.is-bad .tt-key { background: #FEE2E2; color: #B91C1C; }
    .tt-opt.is-ok { background: #F0FDF4; border-color: #4ADE80; color: #15803D; box-shadow: 0 5px 0 #86EFAC; translate: none; }
    .tt-opt.is-ok .tt-key { background: #22C55E; color: #fff; }
    /* nút đã tắt vẫn đục (không opacity: tranh lớp học lộ qua nhìn bẩn), chỉ nhạt màu chữ */
    .tt-opt:disabled:not(.is-ok):not(.is-bad) { background: #F8FAFC; color: #94A3B8; box-shadow: 0 5px 0 #E2E8F0; }
    .tt-opt:disabled:not(.is-ok):not(.is-bad) .tt-key { background: #F1F5F9; color: #94A3B8; }

    /* sort */
    .tt-chips { display: flex; flex-wrap: wrap; align-content: center; justify-content: center; gap: 0.35em 0.4em; font-weight: 700;
      font-size: min(12cqh, calc(42cqi / (var(--len) * 0.6 + 1.2)), 3.4rem); }
    .tt-chip { padding: 0.1em 0.55em; border-radius: 0.55em; background: #fff; border: max(2px, 0.04em) solid var(--tt-edge); box-shadow: 0 0.08em 0 var(--tt-edge); color: var(--tt-ink);
      transition: opacity .3s, background .3s; }
    .tt-chip.g3d-on { background: #FEF9C3; border-color: #FACC15; box-shadow: 0 0.08em 0 #FACC15; color: #713F12; animation: tt-pulse 1.2s ease-in-out infinite; }
    @keyframes tt-pulse { 50% { transform: scale(1.05); } }
    @media (prefers-reduced-motion: reduce) { .tt-chip.g3d-on { animation: none; } }
    .tt-chip.is-done { opacity: 0.3; background: #F8FAFC; box-shadow: none; }
    .tt-bins, .tt-found { --rows: var(--n); --cols: 1; display: grid; gap: min(3cqh, 2.4cqi); grid-template-rows: repeat(var(--n), minmax(0, 1fr)); }
    @container (aspect-ratio > 2.2) { .tt-bins, .tt-found { --rows: 1; --cols: var(--n); grid-template-rows: none; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); } }
    /* Giỏ: thẻ trắng, dải tên nhạt cùng màu nhóm ở trên, từ đã xếp là chip nhạt bên trong */
    .tt-bin { border: 2px solid color-mix(in srgb, var(--c) 35%, #fff); border-radius: 1.2rem; background: #fff; cursor: pointer; padding: 0.45em; display: flex; flex-direction: column; gap: 0.35em;
      min-height: 0; min-width: 0; font-family: 'Baloo 2', 'Quicksand', sans-serif; box-shadow: 0 5px 0 color-mix(in srgb, var(--c) 35%, #fff); touch-action: manipulation; overflow: hidden;
      text-align: center; transition: translate .1s; }
    @media (hover: hover) { .tt-bin:hover { translate: 0 -2px; } }
    .tt-bin:active { translate: 0 3px; box-shadow: 0 2px 0 color-mix(in srgb, var(--c) 35%, #fff); }
    .tt-bin-h { flex: none; font-weight: 700; color: color-mix(in srgb, var(--c) 80%, #000); background: color-mix(in srgb, var(--c) 12%, #fff); border-radius: 0.8rem; padding: 0.12em 0.3em; line-height: 1.15;
      font-size: min(calc(22cqh / var(--rows)), calc(9cqi / var(--cols)), 2.6rem); }
    .tt-bin-h i { font-style: normal; margin-right: 0.25em; }
    /* cỡ chữ --fs do fitTiles đo với mọi từ sẽ vào giỏ (đã nằm sẵn, ẩn) */
    .tt-bin-in { flex: 1; min-height: 0; display: flex; flex-wrap: wrap; align-content: center; justify-content: center; gap: 0.2em 0.3em; font-weight: 700; color: var(--tt-ink); line-height: 1.2;
      font-size: var(--fs, min(calc(20cqh / var(--rows)), calc(8cqi / var(--cols)), 2rem)); }
    .tt-binw.is-wait { visibility: hidden; }
    .tt-binw { white-space: nowrap; background: color-mix(in srgb, var(--c) 8%, #fff); border: 1.5px solid color-mix(in srgb, var(--c) 25%, #fff); border-radius: 0.5em; padding: 0 0.45em; }
    /* chữ bay: chỉ chữ, viền trắng mỏng cho dễ đọc khi bay qua tranh (cỡ chữ đặt sẵn bằng chữ nguồn) */
    .tt-fly { display: grid; place-items: center; width: 100%; height: 100%; font-family: 'Baloo 2', 'Quicksand', sans-serif; font-weight: 700; color: #15803D; white-space: nowrap; line-height: 1.15;
      text-shadow: 0.04em 0 0 #fff, -0.04em 0 0 #fff, 0 0.04em 0 #fff, 0 -0.04em 0 #fff, 0 0.08em 0.16em rgba(0,0,0,0.18); }
    .tt-fly-chip { color: #1E293B; }
    .tt-fly-para { color: #1E293B; white-space: normal; text-wrap: pretty; text-align: left; justify-items: start; padding: 0.2em 0.6em; box-sizing: border-box; }

    /* tap */
    .tt-sent { font-weight: 700; font-size: min(13cqh, 6.4cqi); line-height: 1.6; text-align: center; text-wrap: balance; }
    .tt-tok { cursor: pointer; border-radius: 0.25em; padding: 0 0.06em; transition: background .2s; }
    .tt-tok:hover { background: #F1F5F9; }
    .tt-tok.is-got { color: var(--c); background: color-mix(in srgb, var(--c) 14%, #fff); text-decoration: underline 0.07em var(--c); text-underline-offset: 0.14em; cursor: default; }
    .tt-tok.is-bad { background: #FEE2E2; color: #B91C1C; }
    .tt-fbox { background: #fff; border-radius: 1.2rem; border: 2px solid color-mix(in srgb, var(--c) 35%, #fff); box-shadow: 0 5px 0 color-mix(in srgb, var(--c) 35%, #fff); padding: 0.45em;
      display: flex; flex-direction: column; gap: 0.35em; min-height: 0; overflow: hidden; }
    .tt-fbox-h { flex: none; text-align: center; font-weight: 700; color: color-mix(in srgb, var(--c) 80%, #000); background: color-mix(in srgb, var(--c) 12%, #fff); border-radius: 0.8rem;
      font-size: min(calc(22cqh / var(--rows)), calc(9cqi / var(--cols)), 1.9rem); line-height: 1.2; }
    .tt-fbox-in { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 0.3em; min-height: 0; }
    .tt-fslot { flex: 0 1 auto; min-height: 1.5em; display: grid; place-items: center; border: 2px dashed #CBD5E1; border-radius: 0.5em; font-weight: 700; color: var(--tt-ink); text-align: center; line-height: 1.15;
      font-size: min(calc(26cqh / var(--rows)), calc(88cqi / var(--cols) / max(3, var(--len) * 0.6)), 2.8rem); }
    .tt-fslot.is-on { border-style: solid; border-color: color-mix(in srgb, var(--c) 45%, #fff); background: color-mix(in srgb, var(--c) 8%, #fff); }

    /* order */
    .tt-line { display: flex; flex-wrap: wrap; align-items: flex-end; align-content: center; justify-content: center; gap: 0.5em 0.35em; font-weight: 800;
      font-size: min(12cqh, 8cqi, 4rem); }
    .tt-wslot { display: inline-grid; padding: 0 0.2em; border-bottom: 0.08em solid #94A3B8; text-align: center; line-height: 1.3; }
    .tt-wslot > *, .tt-pslot > * { grid-area: 1 / 1; }
    .tt-ghost { visibility: hidden; }
    .tt-wslot.g3d-on { border-bottom-color: #2563EB; background: #EFF6FF; border-radius: 0.2em 0.2em 0 0; animation: none; box-shadow: none; }
    .tt-wslot.is-on { border-bottom-color: #16A34A; color: #1E293B; }
    .tt-wlast { display: inline-flex; align-items: flex-end; white-space: nowrap; }
    .tt-end { font-size: 1.1em; color: #DC2626; min-width: 0.4em; line-height: 1.3; }
    .tt-para { margin: 0; padding: 0 0 0 1.4em; display: flex; flex-direction: column; justify-content: center; gap: 0.5em; font-weight: 600; line-height: 1.3; }
    .tt-pslot { border-bottom: 2px dashed #CBD5E1; padding: 0.1em 0.2em; display: grid; align-items: center; }
    .tt-pslot::marker { color: #94A3B8; font-weight: 800; }
    .tt-pslot.g3d-on { background: #EFF6FF; border-bottom-color: #2563EB; border-radius: 0.3em; animation: none; box-shadow: none; }
    .tt-pslot.is-on { border-bottom-color: #16A34A; }
    .tt-tiles { --c: var(--cols); --r: var(--rows); display: grid; grid-template-columns: repeat(var(--c), minmax(0, 1fr)); grid-template-rows: repeat(var(--r), minmax(0, 1fr));
      gap: min(3cqh, 3cqi); }
    @container (aspect-ratio > 2.2) { .tt-tiles:not(.is-para) { --c: var(--wcols); --r: var(--wrows); } }
    .tt-tile { min-width: 0; min-height: 0; border: 2px solid var(--tt-edge); border-radius: 1.1rem; background: #fff; color: var(--tt-ink); font-family: 'Baloo 2', 'Quicksand', sans-serif; font-weight: 700; line-height: 1.15;
      cursor: pointer; padding: 0.1em 0.4em; touch-action: manipulation; box-shadow: 0 5px 0 var(--tt-edge); text-wrap: balance; transition: border-color .15s, translate .1s;
      font-size: var(--fs, min(calc(56cqh / var(--r)), calc(88cqi / var(--c) / (var(--len) * 0.55 + 1)), 3.6rem)); overflow: hidden; }
    @media (hover: hover) { .tt-tile:not(:disabled):hover { border-color: #93C5FD; translate: 0 -2px; } }
    .tt-tile:active { translate: 0 3px; box-shadow: 0 2px 0 var(--tt-edge); }
    .tt-tile.is-used { visibility: hidden; }
    .tt-tiles.is-para { --c: 1; --r: var(--n); }
    .tt-tiles.is-para .tt-tile { text-align: left; font-weight: 700; text-wrap: pretty; padding: 0.2em 0.6em;
      font-size: var(--fs, min(calc(30cqh / var(--n)), calc(400cqi / max(40, var(--len))), 1.8rem)); }
  `;
  document.head.appendChild(st);
}
