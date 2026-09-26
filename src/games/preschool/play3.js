/**
 * Dạng lượt chơi học đọc của sách "Làm quen chữ cái" (data3.js, từ Bài 1 trở đi).
 * engine.js gọi PLAYERS3[round.type](ctx). Như các tập khác: bạn Thỏ đọc to, mỗi lần chạm
 * được chấm ngay — đúng thì "ting", sai thì rung nhẹ và bớt sao.
 *
 * Âm đầu tô đỏ, vần tô xanh (như sách Tiếng Việt 1) ở các chữ bé đang học (`hl`).
 *   spell — đánh vần: c (âm đầu to bên trái, tuỳ chọn), rows [{ head, cells: [tiếng] }]; chạm từng
 *           tiếng để nghe đánh vần "mờ – i – mi – huyền – mì", nghe hết thì xong
 *   hear  — nghe Thỏ đọc, chạm đúng tiếng / từ: items [chữ], n (số câu), kind ('tiếng' | 'từ')
 *   build — ghép tiếng: targets [tiếng]; bé chọn âm đầu, vần rồi dấu thanh (onsets / rhymes = các
 *           lựa chọn nhiễu, lấy trong bài)
 *   words — chạm từng từ để nghe đọc: items [từ], kind ('từ' | 'chữ'), says [cách đọc, tuỳ chọn — vd. "b" đọc là "bờ"]
 *   sort  — chạm các từ có vần / âm Thỏ nói: items [từ], want (vần hoặc âm đầu)
 *   read  — đọc cùng Thỏ: title (tuỳ chọn), lines [câu]; chạm 🔊 để Thỏ đọc từng tiếng (chữ sáng
 *           theo), hoặc chạm từng tiếng; đọc hết các câu thì xong
 */

import { say, sfx, burst, centerOf, whenQuiet } from './fx.js';
import { splitSyllable, spellOf, spellRhyme, soundName, TONE_LIST, TONE_MARKS } from './phonics.js';

const shuffle = (a) => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(v => v[1]);
const uniq = (a) => [...new Set(a)];
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/** Một tiếng, tô màu âm đầu / vần nếu nằm trong `hl`. */
function colorSyl(tok, hl = []) {
  if (!hl.length || !/\p{L}/u.test(tok)) return esc(tok);
  const { onset, rhyme } = splitSyllable(tok);
  const chars = [...tok.normalize('NFC')];
  const on = chars.slice(0, onset.length).join('');
  const rest = chars.slice(onset.length).join('');
  const a = onset && hl.includes(onset) ? `<b class="pk3-on">${esc(on)}</b>` : esc(on);
  const b = rhyme && hl.includes(rhyme) ? `<b class="pk3-rh">${esc(rest)}</b>` : esc(rest);
  return a + b;
}
/** Cả cụm từ / câu, tô màu từng tiếng. */
const colorText = (text, hl) => text.split(/(\s+)/).map(t => (/\s/.test(t) ? t : t.split(/([\p{L}]+)/u).map(p => colorSyl(p, hl)).join(''))).join('');

/**
 * Màn hình rộng: phóng to cả khối chơi (CSS zoom) tới cỡ lớn nhất còn vừa phần trống của màn
 * hình — ít chữ thì chữ rất to, nhiều chữ thì giữ cỡ thường. Bề ngang luôn vừa khung (chữ tự
 * xuống dòng), chỉ chiều cao quyết định độ phóng. Tự tính lại khi đổi cỡ cửa sổ.
 */
const ZOOM_MAX = 2.6;
function fitBig(root) {
  if (!root || !window.CSS?.supports?.('zoom', '2')) return;
  const app = document.getElementById('app');
  const run = () => {
    if (!root.isConnected) { window.removeEventListener('resize', run); return; }
    root.style.zoom = ''; root.style.maxWidth = '';
    if (!app || window.innerWidth < 1024 || window.innerHeight < 600) return;
    const stage = root.parentElement;
    const availW = stage.clientWidth;
    const a = app.getBoundingClientRect();
    const availH = app.clientHeight - (root.getBoundingClientRect().top - a.top + app.scrollTop) - 28;
    if (availH < 200) return;
    const fits = (z) => {
      root.style.zoom = String(z);
      root.style.maxWidth = `${Math.floor(availW / z)}px`;
      return root.getBoundingClientRect().height <= availH + 1 && root.scrollWidth <= root.clientWidth + 1;
    };
    if (!fits(1)) { root.style.zoom = ''; root.style.maxWidth = ''; return; }
    let lo = 1, hi = ZOOM_MAX;
    for (let i = 0; i < 8; i++) { const m = (lo + hi) / 2; if (fits(m)) lo = m; else hi = m; }
    fits(lo);
  };
  requestAnimationFrame(run);
  document.fonts?.ready.then(() => requestAnimationFrame(run)); // cỡ chữ đổi khi phông Baloo tải xong
  window.addEventListener('resize', run);
}

/** Bản sao ẩn của đáp án, giữ sẵn bề rộng ô để ô không nở ra (và rớt dòng) khi bé ghép xong. */
const ghost = (html) => `<span class="pk3-ghost" aria-hidden="true">${html}</span>`;

/** Nút 🔊 to để nghe lại tiếng Thỏ vừa đọc. */
const earButton = () => '<button type="button" class="pk3-ear" aria-label="Nghe lại">🔊</button>';

// ── Đánh vần ────────────────────────────────────────────────────────────
function playSpell({ round, stage, talk, solve, addCleanup }) {
  const { rows, c, hl = [] } = round;
  const cells = rows.flatMap(r => r.cells);
  const seen = new Set();
  stage.innerHTML = `
    <div class="pk3-spell${c ? ' has-onset' : ''}">
      ${c ? `<button type="button" class="pk3-onset" data-say="${esc(soundName(c))}"><span class="pk3-on">${esc(c)}</span></button>` : ''}
      <div class="pk3-rows">${rows.map((r, ri) => `
        <div class="pk3-row">
          ${r.head ? `<button type="button" class="pk3-head" data-say="${esc(r.headSay || spellRhyme(r.head))}">${colorSyl(r.head, hl.length ? hl : [r.head])}</button>` : ''}
          ${r.cells.map((cell, k) => `<button type="button" class="pk3-syl" data-k="${rows.slice(0, ri).reduce((s, x) => s + x.cells.length, 0) + k}">${colorSyl(cell, hl)}</button>`).join('')}
        </div>`).join('')}
      </div>
    </div>`;
  fitBig(stage.querySelector('.pk3-spell'));
  stage.querySelectorAll('[data-say]').forEach(b => {
    b.onclick = () => { sfx.tap(); say(b.dataset.say, { rate: 0.8 }); b.classList.remove('is-seen'); void b.offsetWidth; b.classList.add('is-seen'); };
  });
  stage.querySelectorAll('.pk3-syl').forEach(b => {
    b.onclick = () => {
      const k = Number(b.dataset.k);
      sfx.pop(3 + (k % 8));
      say(spellOf(cells[k]), { rate: 0.8 });
      b.classList.remove('is-seen'); void b.offsetWidth; b.classList.add('is-seen');
      seen.add(k);
      if (seen.size === cells.length) {
        // Chờ Thỏ đánh vần xong tiếng cuối rồi mới khen.
        addCleanup(whenQuiet(() => solve('Giỏi quá! Bé đã đánh vần hết các tiếng rồi!'), { min: 600, gap: 300 }));
      }
    };
  });
  talk(c ? `Âm ${soundName(c)}. Bé chạm vào từng tiếng để nghe Thỏ đánh vần, rồi đọc theo nhé!`
    : 'Bé chạm vào từng tiếng để nghe Thỏ đánh vần, rồi đọc theo nhé!');
}

// ── Nghe và chạm đúng ───────────────────────────────────────────────────
/** Lựa chọn nhiễu: ưu tiên cùng tiếng khác dấu (tập nghe dấu thanh), rồi các chữ khác trong bài. */
function distractors(target, pool, n) {
  const base = splitSyllable(target).base;
  const same = pool.filter(x => x !== target && !x.includes(' ') && splitSyllable(x).base === base);
  const other = pool.filter(x => x !== target && !same.includes(x));
  return shuffle(same).slice(0, Math.ceil(n / 2)).concat(shuffle(other)).slice(0, n);
}

function playHear({ round, stage, talk, wrong, right, solve, addCleanup }) {
  const items = uniq(round.items);
  const kind = round.kind || 'tiếng';
  const n = Math.min(round.n || 4, items.length);
  const asks = shuffle(items).slice(0, n);
  let step = 0;
  let target = '';
  const speak = () => say(target, { rate: 0.8 });
  const show = () => {
    target = asks[step];
    const opts = shuffle([target, ...distractors(target, items, Math.min(3, items.length - 1))]);
    stage.innerHTML = `
      <div class="pk3-hear">
        <div class="pk3-ask">${earButton()}<span class="pk3-count">${step + 1} / ${n}</span></div>
        <div class="pk3-opts">${opts.map(o => `<button type="button" class="pk3-card${o.length > 8 ? ' is-long' : ''}" data-v="${esc(o)}">${esc(o)}</button>`).join('')}</div>
      </div>`;
    fitBig(stage.querySelector('.pk3-hear'));
    stage.querySelector('.pk3-ear').onclick = () => { sfx.tap(); speak(); };
    stage.querySelectorAll('.pk3-card').forEach(b => {
      b.onclick = () => {
        if (b.dataset.v !== target) {
          wrong(b, `Đây là ${kind} ${b.dataset.v}. Bé nghe lại nhé!`);
          addCleanup(whenQuiet(speak, { min: 800, gap: 300 }));
          return;
        }
        b.classList.add('is-right');
        right(b);
        say(target, { rate: 0.8 });
        step++;
        if (step >= n) { setTimeout(() => solve(`Giỏi quá! Bé nghe đúng hết các ${kind} rồi!`), 700); return; }
        setTimeout(() => { show(); speak(); }, 1100);
      };
    });
  };
  show();
  talk(`Bé nghe Thỏ đọc rồi chạm vào đúng ${kind} nhé! Chạm cái loa để nghe lại.`);
  say(target, { queue: true, rate: 0.8 });
}

// ── Ghép tiếng: âm đầu + vần + dấu thanh ────────────────────────────────
const toneKey = (t) => (t ? `<span class="pk3-tone-mark">◌${t}</span>` : '<span class="pk3-tone-mark is-flat">◌</span>');

function playBuild({ round, stage, talk, wrong, right, solve, addCleanup }) {
  const targets = shuffle(uniq(round.targets)).slice(0, round.n || 3);
  const onsetPool = uniq([...round.targets.map(t => splitSyllable(t).onset), ...(round.onsets || [])]).filter(Boolean);
  const rhymePool = uniq([...round.targets.map(t => splitSyllable(t).rhyme), ...(round.rhymes || [])]).filter(Boolean);
  // Bài đầu sách chưa đủ lựa chọn nhiễu: thêm vài âm / vần quen thuộc.
  ['t', 'm', 'n', 'b'].forEach(o => onsetPool.length < 3 && !onsetPool.includes(o) && onsetPool.push(o));
  ['a', 'o', 'i', 'u'].forEach(r => rhymePool.length < 3 && !rhymePool.includes(r) && rhymePool.push(r));
  let step = 0;
  let target = '';
  const speak = () => say(target, { rate: 0.8 });
  const show = () => {
    target = targets[step];
    const { onset, rhyme, tone, base } = splitSyllable(target);
    const onsets = shuffle([onset, ...shuffle(onsetPool.filter(o => o !== onset)).slice(0, 2)]);
    const rhymes = shuffle([rhyme, ...shuffle(rhymePool.filter(r => r !== rhyme)).slice(0, 2)]);
    let part = 0; // 0 âm đầu, 1 vần, 2 dấu thanh
    stage.innerHTML = `
      <div class="pk3-build">
        <div class="pk3-ask">${earButton()}<span class="pk3-count">${step + 1} / ${targets.length}</span></div>
        <div class="pk3-slots">
          <span class="pk3-slot is-on" data-p="0">${ghost(`<span class="pk3-on">${esc(onset)}</span>`)}<span class="pk3-fill"></span></span><span class="pk3-plus">+</span>
          <span class="pk3-slot" data-p="1">${ghost(`<span class="pk3-rh">${esc(rhyme)}</span>`)}<span class="pk3-fill"></span></span><span class="pk3-plus">+</span>
          <span class="pk3-slot is-tone" data-p="2"><span class="pk3-fill"></span></span>
          <span class="pk3-eqres"><span class="pk3-eq">=</span><span class="pk3-result">${ghost(colorSyl(target, [onset, rhyme]))}<span class="pk3-fill">?</span></span></span>
        </div>
        <div class="pk3-pad" data-p="0">${onsets.map(o => `<button type="button" class="pk3-key" data-v="${esc(o)}"><span class="pk3-on">${esc(o)}</span></button>`).join('')}</div>
        <div class="pk3-pad" data-p="1" hidden>${rhymes.map(r => `<button type="button" class="pk3-key" data-v="${esc(r)}"><span class="pk3-rh">${esc(r)}</span></button>`).join('')}</div>
        <div class="pk3-pad is-tones" data-p="2" hidden>${TONE_LIST.map(t => `<button type="button" class="pk3-key" data-v="${t}" aria-label="${TONE_MARKS[t] || 'không dấu'}">${toneKey(t)}</button>`).join('')}</div>
      </div>`;
    fitBig(stage.querySelector('.pk3-build'));
    stage.querySelector('.pk3-ear').onclick = () => { sfx.tap(); speak(); };
    const want = [onset, rhyme, tone];
    const slot = (p) => stage.querySelector(`.pk3-slot[data-p="${p}"]`);
    stage.querySelectorAll('.pk3-pad').forEach(pad => {
      const p = Number(pad.dataset.p);
      pad.querySelectorAll('.pk3-key').forEach(b => {
        b.onclick = () => {
          if (p !== part) return;
          const v = b.dataset.v;
          if (v !== want[p]) {
            const heard = p === 0 ? `âm ${soundName(v)}` : p === 1 ? `vần ${v}` : (TONE_MARKS[v] ? `dấu ${TONE_MARKS[v]}` : 'không có dấu');
            wrong(b, `Đây là ${heard}. Bé nghe lại tiếng ${target} nhé!`);
            return;
          }
          right(b);
          slot(p).querySelector('.pk3-fill').innerHTML = b.innerHTML;
          slot(p).classList.replace('is-on', 'is-done');
          pad.hidden = true;
          part++;
          if (part === 1) { say(soundName(onset), { rate: 0.8 }); slot(1).classList.add('is-on'); stage.querySelector('.pk3-pad[data-p="1"]').hidden = false; return; }
          if (part === 2) {
            // Ghép âm đầu với vần được tiếng không dấu; tiếng thanh ngang thì xong luôn.
            say(`${soundName(onset)}, ${rhyme}, ${base}`, { rate: 0.8 });
            stage.querySelector('.pk3-result .pk3-fill').textContent = base;
            slot(2).classList.add('is-on');
            stage.querySelector('.pk3-pad[data-p="2"]').hidden = false;
            return;
          }
          const res = stage.querySelector('.pk3-result');
          res.querySelector('.pk3-fill').innerHTML = colorSyl(target, [onset, rhyme]);
          res.classList.add('is-done');
          say(spellOf(target), { rate: 0.8 });
          const [x, y] = centerOf(res);
          burst(x, y, { count: 14, emoji: '⭐' });
          step++;
          const next = () => (step >= targets.length ? solve('Giỏi quá! Bé đã ghép được các tiếng rồi!') : (show(), speak()));
          addCleanup(whenQuiet(next, { min: 1400, gap: 400 }));
        };
      });
    });
  };
  show();
  talk('Bé nghe Thỏ đọc, rồi ghép tiếng: chọn âm đầu, chọn vần, rồi chọn dấu nhé!');
  say(target, { queue: true, rate: 0.8 });
}

// ── Chạm từng từ để nghe ────────────────────────────────────────────────
function playWords({ round, stage, talk, solve, addCleanup }) {
  const { items, hl = [], kind = 'từ' } = round;
  const seen = new Set();
  stage.innerHTML = `<div class="pk3-words">${items.map((w, k) => `<button type="button" class="pk3-word" data-k="${k}">${colorText(w, hl)}</button>`).join('')}</div>`;
  fitBig(stage.querySelector('.pk3-words'));
  stage.querySelectorAll('.pk3-word').forEach(b => {
    b.onclick = () => {
      const k = Number(b.dataset.k);
      sfx.pop(3 + (k % 8));
      say(round.says?.[k] ?? items[k], { rate: 0.8 });
      b.classList.remove('is-seen'); void b.offsetWidth; b.classList.add('is-seen');
      seen.add(k);
      if (seen.size === items.length) {
        addCleanup(whenQuiet(() => solve(`Giỏi quá! Bé đã đọc hết các ${kind} rồi!`), { min: 500, gap: 300 }));
      }
    };
  });
  talk(`Bé chạm vào từng ${kind} để nghe Thỏ đọc, rồi đọc theo nhé!`);
}

// ── Tìm các từ có vần / âm ──────────────────────────────────────────────
function playSort({ round, stage, talk, wrong, right, solve }) {
  const { items, want } = round;
  const isOnset = !!round.onset;
  const has = (w) => w.split(/\s+/).some(t => { const s = splitSyllable(t); return isOnset ? s.onset === want : s.rhyme === want; });
  const label = isOnset ? `âm ${soundName(want)}` : `vần ${want}`;
  const goal = items.filter(has).length;
  let found = 0;
  stage.innerHTML = `<div class="pk3-sort">
    <div class="pk3-sort-goal"><span class="pk3-badge">${colorSyl(want, [want])}</span><span class="pk3-count" id="pk3-found">0 / ${goal}</span></div>
    <div class="pk3-words">${shuffle(items.map((w, k) => ({ w, k }))).map(({ w, k }) => `<button type="button" class="pk3-word" data-k="${k}">${esc(w)}</button>`).join('')}</div></div>`;
  fitBig(stage.querySelector('.pk3-sort'));
  stage.querySelector('.pk3-badge').onclick = () => { sfx.tap(); say(isOnset ? soundName(want) : spellRhyme(want), { rate: 0.8 }); };
  stage.querySelectorAll('.pk3-word').forEach(b => {
    b.onclick = () => {
      if (b.classList.contains('is-right')) return;
      const w = items[Number(b.dataset.k)];
      say(w, { rate: 0.8 });
      if (!has(w)) { wrong(b, `Từ ${w} không có ${label}. Bé tìm từ khác nhé!`); return; }
      b.classList.add('is-right');
      b.innerHTML = colorText(w, [want]);
      right(b);
      found++;
      stage.querySelector('#pk3-found').textContent = `${found} / ${goal}`;
      if (found === goal) setTimeout(() => solve(`Giỏi quá! Bé đã tìm hết các từ có ${label}!`), 900);
    };
  });
  talk(`Bé tìm và chạm vào các từ có ${label} nhé! ${isOnset ? '' : spellRhyme(want)}`);
}

// ── Đọc cùng Thỏ ────────────────────────────────────────────────────────
function playRead({ round, stage, talk, solve, addCleanup }) {
  const { lines, title, hl = [] } = round;
  const heard = lines.map(() => new Set());
  const counts = lines.map(l => (l.match(/[\p{L}]+/gu) || []).length);
  let stop = null;
  const lineHtml = (line, li) => {
    let k = 0;
    const body = line.split(/(\s+)/).map(tok => (/\s/.test(tok) ? tok
      : tok.split(/([\p{L}]+)/u).map(p => (/\p{L}/u.test(p) ? `<span class="pk3-tok" data-l="${li}" data-k="${k++}" data-w="${esc(p)}">${colorSyl(p, hl)}</span>` : esc(p))).join(''))).join('');
    return `<div class="pk3-line" data-l="${li}"><button type="button" class="pk3-play" data-l="${li}" aria-label="Đọc câu này">🔊</button><p>${body}</p></div>`;
  };
  stage.innerHTML = `
    <div class="pk3-read">
      ${title ? `<h3 class="pk3-read-title">${esc(title)}</h3>` : ''}
      ${lines.map(lineHtml).join('')}
    </div>`;
  fitBig(stage.querySelector('.pk3-read'));
  const check = (li) => {
    if (heard[li].size >= counts[li]) stage.querySelector(`.pk3-line[data-l="${li}"]`).classList.add('is-done');
    if (heard.every((h, i) => h.size >= counts[i])) {
      addCleanup(whenQuiet(() => solve('Giỏi quá! Bé đã đọc hết bài rồi!'), { min: 500, gap: 300 }));
    }
  };
  const mark = (tok) => { heard[tok.dataset.l].add(Number(tok.dataset.k)); tok.classList.add('is-heard'); };
  stage.querySelectorAll('.pk3-tok').forEach(tok => {
    tok.onclick = () => { stop?.(); sfx.tap(); say(tok.dataset.w, { rate: 0.8 }); mark(tok); check(Number(tok.dataset.l)); };
  });
  // Thỏ đọc từng tiếng, chữ đang đọc sáng lên.
  const playLine = (li) => {
    stop?.();
    const toks = [...stage.querySelectorAll(`.pk3-tok[data-l="${li}"]`)];
    let i = 0;
    let cancel = null;
    const btn = stage.querySelector(`.pk3-play[data-l="${li}"]`);
    btn.classList.add('is-on');
    const end = () => { cancel?.(); toks.forEach(t => t.classList.remove('is-now')); btn.classList.remove('is-on'); stop = null; };
    stop = end;
    const next = () => {
      toks.forEach(t => t.classList.remove('is-now'));
      if (i >= toks.length) { end(); check(li); return; }
      const t = toks[i++];
      t.classList.add('is-now');
      mark(t);
      say(t.dataset.w, { rate: 0.85 });
      cancel = whenQuiet(next, { min: 380, gap: 90, max: 3000 });
    };
    next();
  };
  stage.querySelectorAll('.pk3-play').forEach(b => { b.onclick = () => { sfx.tap(); playLine(Number(b.dataset.l)); }; });
  addCleanup(() => stop?.());
  talk(lines.length > 1 ? 'Bé chạm cái loa để đọc từng câu cùng Thỏ nhé! Chạm vào chữ nào thì Thỏ đọc chữ đó.'
    : 'Bé chạm cái loa để đọc cùng Thỏ nhé! Chạm vào chữ nào thì Thỏ đọc chữ đó.');
}

export const PLAYERS3 = {
  spell: playSpell, hear: playHear, build: playBuild, words: playWords, sort: playSort, read: playRead,
};
