/**
 * Virtual Number Keyboard
 * Intercepts all number inputs in the app and shows a large, kid-friendly
 * on-screen numpad instead of the native mobile keyboard.
 *
 * Usage: import and call initVirtualKeyboard() once at app startup.
 * All <input type="number"> and <input inputmode="numeric"> elements
 * will automatically get the virtual keyboard.
 * An <input data-vk-words> ("Đọc số": "hai mươi lăm") gets a panel of number
 * word tiles instead — the child taps the words in order to build the reading.
 * An <input data-vk-tiles='["65","59",...]'> gets tiles of exactly the items the
 * book prints (numbers on the train cars, names of the robots…), in the book's
 * order, each usable once: the child still decides which ones and in what
 * order ("viết theo thứ tự", "tô màu các toa ghi số…"). With data-vk-one the
 * input is one slot of a row (several "..." in one line): a tap fills that slot,
 * and a tile already written in another slot of the same row is used up.
 */

import { isEnglish, EN_WORD_ROWS, tr } from './i18n.js';

const VK_CLASS = 'vk-panel';
const VK_SELECTOR = 'input[type="number"], input[inputmode="numeric"], input[data-vk-words], input[data-vk-tiles]';
const TILE_SEP = ', ';

// ◀ / ▶ row on top of every panel: jump to the previous / next blank on the
// screen without closing the keyboard (like Tab / Shift+Tab on a computer).
const NAV_ROW = `
  <div class="vk-row vk-nav">
    <button class="vk-key vk-nav-btn" data-key="prev" type="button" aria-label="Ô trước">◀ Ô trước</button>
    <button class="vk-key vk-nav-btn" data-key="next" type="button" aria-label="Ô sau">Ô sau ▶</button>
  </div>`;

// Every word soDoc() can produce, plus the book's "tư" and "nghìn".
const WORD_ROWS = [
  ['một', 'hai', 'ba', 'bốn', 'năm'],
  ['sáu', 'bảy', 'tám', 'chín', 'mười'],
  ['mươi', 'mốt', 'lăm', 'tư', 'linh'],
  ['không', 'trăm', 'nghìn', '⌫', '✓'],
];

// ── Create the keyboard DOM (once, global) ──────────────────────────────────
function createKeyboard() {
  const existing = document.getElementById('virtual-keyboard');
  if (existing) return existing;

  const panel = document.createElement('div');
  panel.id = 'virtual-keyboard';
  panel.className = VK_CLASS;
  panel.setAttribute('aria-label', 'Bàn phím số ảo');

  // Operator keys (+ − × : ( )) for blanks whose answer is an expression
  // ("100 + 30 + 9", "(8 + 2) × 5"); hidden on <input type="number">, whose
  // value cannot hold them.
  const keys = [
    ['7', '8', '9', '+'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '×'],
    ['(', '0', ')', ':'],
    ['⌫', ',', '✓'],
  ];
  const OPS = new Set(['+', '−', '×', ':', '(', ')']);
  const cls = (k) => [
    k === '⌫' && 'vk-backspace', k === '✓' && 'vk-confirm', k === ',' && 'vk-comma', OPS.has(k) && 'vk-op',
  ].filter(Boolean).join(' ');

  panel.innerHTML = NAV_ROW + keys.map((row, r) => `
    <div class="vk-row${r === 3 ? ' vk-row-zero' : ''}${r === 4 ? ' vk-row-ctrl' : ''}">
      ${row.map(k => `<button class="vk-key ${cls(k)}" data-key="${k}" type="button">${k}</button>`).join('')}
    </div>
  `).join('');

  document.body.appendChild(panel);
  return panel;
}

function createWordKeyboard() {
  // Học Toán bằng tiếng Anh: chữ số tiếng Anh ("twenty", "five"); dựng lại khi đổi ngôn ngữ.
  const lang = isEnglish() ? 'en' : 'vi';
  const existing = document.getElementById('virtual-keyboard-words');
  if (existing && existing.dataset.lang === lang) return existing;
  existing?.remove();
  const rows = lang === 'en' ? EN_WORD_ROWS : WORD_ROWS;

  const wp = document.createElement('div');
  wp.id = 'virtual-keyboard-words';
  wp.className = `${VK_CLASS} vk-words`;
  wp.dataset.lang = lang;
  wp.setAttribute('aria-label', 'Bàn phím chữ đọc số');
  wp.innerHTML = NAV_ROW + rows.map(row => `
    <div class="vk-row">
      ${row.map(k => `<button class="vk-key ${k === '⌫' ? 'vk-backspace' : ''} ${k === '✓' ? 'vk-confirm' : ''}" data-key="${k}" type="button">${k}</button>`).join('')}
    </div>
  `).join('');

  // Phím chữ tiếng Việt ("hai", "mươi") không được dịch: phím ghi gì thì viết ra đúng chữ đó.
  if (lang === 'vi') wp.querySelectorAll('.vk-row:not(.vk-nav)').forEach(r => r.setAttribute('data-no-i18n', ''));
  document.body.appendChild(wp);
  return wp;
}

// ── State ────────────────────────────────────────────────────────────────────
let activeInput = null;
let panel = null;
let wordPanel = null;
let tilePanel = null;

// ── Item tiles (data-vk-tiles) ───────────────────────────────────────────────
function tilesOf(input) {
  let tiles;
  try { tiles = JSON.parse(input.dataset.vkTiles); } catch { return []; }
  // Học bằng tiếng Anh: thẻ chữ ("Ấm", "Bình") ghi tiếng Anh; khi chấm, i18n.toVietnameseAnswer đổi lại.
  // Thẻ Đ / S → T / F (dsValidate nhận T/F qua toVietnameseAnswer).
  if (isEnglish() && tiles.length === 2 && tiles[0] === 'Đ' && tiles[1] === 'S') return ['T', 'F'];
  return isEnglish() ? tiles.map(t => (/[A-Za-zÀ-ỹ]{2,}/.test(t) && tr(t)) || t) : tiles;
}
// data-vk-sep: the book's own separator ("D; B; A; C"), ", " by default.
const sepOf = (input) => input.dataset.vkSep || TILE_SEP;
const tokensOf = (v, sep = TILE_SEP) => v.split(sep.trim()).map(t => t.trim()).filter(Boolean);
// The other slots of the same answer line (data-vk-one inputs sharing data-idx).
function slotSiblings(input) {
  const row = input.closest('.e3-blank-row') || input.parentElement;
  return [...row.querySelectorAll(`input[data-vk-tiles][data-idx="${input.dataset.idx}"]`)];
}
// How many times each tile is already written for this answer line.
function usedCounts(input) {
  const counts = new Map();
  const vals = input.dataset.vkOne ? slotSiblings(input).map(i => i.value.trim()).filter(Boolean) : tokensOf(input.value, sepOf(input));
  vals.forEach(v => counts.set(v, (counts.get(v) || 0) + 1));
  return counts;
}
function refreshTiles() {
  if (!tilePanel || !activeInput?.dataset.vkTiles) return;
  const left = usedCounts(activeInput);
  const all = tilesOf(activeInput);
  tilePanel.querySelectorAll('.vk-tile').forEach((btn, i) => {
    const t = all[i];
    const n = left.get(t) || 0;
    // A tile printed twice in the book may be used twice.
    const printed = all.slice(0, i + 1).filter(x => x === t).length;
    btn.disabled = n >= printed;
  });
}
function showTiles(input) {
  if (!tilePanel) {
    tilePanel = document.createElement('div');
    tilePanel.id = 'virtual-keyboard-tiles';
    tilePanel.className = `${VK_CLASS} vk-tiles`;
    tilePanel.setAttribute('aria-label', 'Bàn phím thẻ');
    document.body.appendChild(tilePanel);
  }
  const tiles = tilesOf(input);
  tilePanel.innerHTML = `${NAV_ROW}
    <div class="vk-tile-row">${tiles.map((t, i) => `<button class="vk-key vk-tile" data-tile="${i}" type="button">${t}</button>`).join('')}</div>
    <div class="vk-row vk-tile-ctrl">
      <button class="vk-key vk-backspace" data-key="⌫" type="button">⌫</button>
      <button class="vk-key vk-confirm" data-key="✓" type="button">✓</button>
    </div>`;
  tilePanel.classList.add('vk-visible');
  refreshTiles();
}
function pressTile(i) {
  if (!activeInput?.dataset.vkTiles) return;
  const t = tilesOf(activeInput)[i];
  if (t == null) return;
  if (activeInput.dataset.vkOne) {
    activeInput.value = t;
  } else {
    const sep = sepOf(activeInput);
    activeInput.value = [...tokensOf(activeInput.value, sep), t].join(sep);
  }
  activeInput.dispatchEvent(new Event('input', { bubbles: true }));
  refreshTiles();
}
// ── ◀ / ▶ navigation ─────────────────────────────────────────────────────────
// Every keypad blank currently on screen, in page order (hidden screens and
// graded/disabled blanks are skipped).
function navTargets() {
  return [...document.querySelectorAll('input[data-vk-attached]')]
    .filter(i => !i.disabled && i.getClientRects().length > 0 && getComputedStyle(i).visibility !== 'hidden');
}
function refreshNav() {
  const list = navTargets();
  const at = list.indexOf(activeInput);
  const show = list.length > 1;
  document.querySelectorAll(`.${VK_CLASS}`).forEach(p => {
    p.classList.toggle('vk-has-nav', show);
    const [prev, next] = p.querySelectorAll('.vk-nav-btn');
    if (prev) prev.disabled = at <= 0;
    if (next) next.disabled = at < 0 || at >= list.length - 1;
  });
}
function moveFocus(step) {
  const list = navTargets();
  const at = list.indexOf(activeInput);
  const target = list[at + step];
  if (at < 0 || !target) return;
  // focus() blurs the current blank (games that grade on blur still see it)
  // and the focus listener opens the right panel for the new blank.
  target.focus({ preventScroll: true });
  if (document.activeElement !== target) showKeyboard(target);
}

let suppressReshow = false;  // prevents keyboard re-opening after ✓ submission

function showKeyboard(input) {
  if (suppressReshow) return;          // cooldown after ✓ → don't reopen
  activeInput = input;
  panel = panel || createKeyboard();
  wordPanel = createWordKeyboard();
  const words = !!input.dataset.vkWords;
  const tiles = !!input.dataset.vkTiles;
  wordPanel.classList.toggle('vk-visible', words);
  if (tiles) showTiles(input);
  else if (tilePanel) tilePanel.classList.remove('vk-visible');
  refreshNav();
  if (words || tiles) {
    panel.classList.remove('vk-visible');
    document.body.classList.add('vk-active');
    centerInput(input);
    return;
  }
  // The "," key shows wherever the operator keys do (every text blank), not only
  // on blanks whose answer is a list ("59, 56, 51, 53"): showing it just there
  // told the child the answer was a list, and hid it where a comma was needed.
  // A one- or two-character "ô trống" box never holds ", ".
  const tiny = input.maxLength > 0 && input.maxLength < 3;
  panel.classList.toggle('vk-with-comma', input.type !== 'number' && !tiny);
  panel.classList.toggle('vk-no-ops', input.type === 'number');
  panel.classList.add('vk-visible');
  document.body.classList.add('vk-active'); // hides the floating fullscreen button, which sits at bottom-right and would otherwise overlap the now-wide keypad's ✓ key
  centerInput(input);
}

// Screens that keep the blank in view themselves (sticky header, own scroll
// rules) mark a container with data-vk-noscroll: a second scroll from here
// would make the page jump twice on every ◀ / ▶.
function centerInput(input) {
  if (input.closest('[data-vk-noscroll]')) return;
  input.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideKeyboard() {
  activeInput = null;
  if (panel) panel.classList.remove('vk-visible');
  if (wordPanel) wordPanel.classList.remove('vk-visible');
  if (tilePanel) tilePanel.classList.remove('vk-visible');
  document.body.classList.remove('vk-active');
}

function pressKey(key) {
  if (!activeInput) return;
  if (key === 'prev' || key === 'next') { moveFocus(key === 'next' ? 1 : -1); return; }

  if (activeInput.dataset.vkTiles && key === '⌫') {
    // Take the last tile back off (the whole slot, for a one-tile slot).
    const sep = sepOf(activeInput);
    activeInput.value = activeInput.dataset.vkOne ? '' : tokensOf(activeInput.value, sep).slice(0, -1).join(sep);
    activeInput.dispatchEvent(new Event('input', { bubbles: true }));
    refreshTiles();
    return;
  }

  if (activeInput.dataset.vkWords && key !== '✓') {
    // Word tiles: a tap adds one whole word, ⌫ takes the last word back off.
    const ws = activeInput.value.trim().split(/\s+/).filter(Boolean);
    if (key === '⌫') ws.pop();
    else if (ws.length < 8) ws.push(key);
    activeInput.value = ws.join(' ');
    activeInput.dispatchEvent(new Event('input', { bubbles: true }));
    return;
  }

  if (key === '⌫') {
    // Backspace
    // ", " and " + " are typed as one key, so they are erased as one too
    const v = activeInput.value;
    activeInput.value = v.endsWith(', ') ? v.slice(0, -2) : / [+\-−×:] $/.test(v) ? v.slice(0, -3) : v.slice(0, -1);
  } else if (key === '✓') {
    // Confirm — suppress keyboard reshow for 600ms (games call focus() internally)
    suppressReshow = true;
    setTimeout(() => { suppressReshow = false; }, 600);
    // Dispatch Enter keyup so game logic fires
    activeInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));
    // Also dispatch blur for games that listen to blur
    activeInput.dispatchEvent(new Event('blur', { bubbles: true }));
    hideKeyboard();
    return;
  } else {
    // Digit — max 4 chars on the old <input type="number"> games to avoid
    // overflow, or the input's own maxlength (e.g. a one-digit "ô trống" box
    // in the grade-3 workbook). A comma list or an expression is longer.
    const isNum = activeInput.type === 'number';
    const cap = isNum ? 4 : 40;
    const maxChars = activeInput.maxLength > 0 ? Math.min(cap, activeInput.maxLength) : cap;
    const v = activeInput.value;
    const op = { '+': '+', '−': isNum ? '-' : '−', '×': '×', ':': ':' }[key];
    if (v.length >= maxChars) return;
    if (key === ',') {
      // No leading or doubled comma; add the space the book writes after it
      if (!v || v.endsWith(', ')) return;
      activeInput.value = v + ', ';
    } else if (op || key === '(' || key === ')') {
      if (isNum && !(key === '−' && !v)) return;
      // A leading "−" is a negative number, a one-character box holds the sign
      // alone; otherwise the operator gets the spaces the book writes: "3 × 4".
      const bare = !op || !v || (activeInput.maxLength > 0 && activeInput.maxLength < 3);
      if (!bare && / [+\-−×:] $/.test(v)) return;  // no doubled operator
      activeInput.value = bare ? v + (op || key) : v.trimEnd() + ` ${op} `;
    } else {
      activeInput.value += key;
    }
  }

  // Dispatch input event so any live watchers see the change
  activeInput.dispatchEvent(new Event('input', { bubbles: true }));
}

// ── Attach to an input element ───────────────────────────────────────────────
function attachToInput(input) {
  if (input.dataset.vkAttached) return;
  input.dataset.vkAttached = '1';

  // Prevent the native keyboard — permanently. readonly only blocks the
  // user's own typing; pressKey() still sets .value from JS. It must never be
  // lifted while the input is focused: even a one-tick gap (the old
  // remove-then-setTimeout re-add) is enough for iPadOS to start opening its
  // own keyboard on top of ours, flashing a black keyboard area for 2–3s.
  // inputmode="none" is a second guard for browsers that ignore readonly.
  input.setAttribute('readonly', 'readonly');
  input.setAttribute('inputmode', 'none');

  input.addEventListener('focus', (e) => {
    showKeyboard(input);
    e.stopPropagation();
  });

  input.addEventListener('click', (e) => {
    showKeyboard(input);
    e.stopPropagation();
  });
}

// ── Scan and attach to all current inputs ────────────────────────────────────
function scanInputs(root = document) {
  root.querySelectorAll(VK_SELECTOR).forEach(attachToInput);
}

// ── MutationObserver — auto-attach when new inputs appear in DOM ─────────────
let observer = null;

function startObserver() {
  if (observer) return;
  observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        if (node.matches?.(VK_SELECTOR)) {
          attachToInput(node);
        } else {
          node.querySelectorAll?.(VK_SELECTOR)
            .forEach(attachToInput);
        }
      });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// ── Install keyboard event handlers ─────────────────────────────────────────
function installHandlers() {
  // Delegate all key presses on the panel
  document.addEventListener('mousedown', (e) => {
    const btn = e.target.closest('.vk-key');
    if (btn) {
      e.preventDefault(); // prevent blur of activeInput
      if (btn.disabled) return;
      if (btn.dataset.tile != null) pressTile(+btn.dataset.tile);
      else pressKey(btn.dataset.key);
      return;
    }
    // Click outside keyboard + outside an input → hide
    if (!e.target.closest('.vk-panel') &&
        !e.target.matches('input[type="number"], input[inputmode="numeric"], input[data-vk-attached]')) {
      hideKeyboard();
    }
  }, true);

  // Touch support
  document.addEventListener('touchstart', (e) => {
    const btn = e.target.closest('.vk-key');
    if (btn) {
      e.preventDefault();
      if (btn.disabled) return;
      if (btn.dataset.tile != null) pressTile(+btn.dataset.tile);
      else pressKey(btn.dataset.key);
    }
  }, { passive: false, capture: true });
}

// ── Public init ──────────────────────────────────────────────────────────────
let initialized = false;

export function initVirtualKeyboard() {
  if (initialized) return;
  initialized = true;

  createKeyboard();
  createWordKeyboard();
  scanInputs();
  startObserver();
  installHandlers();
}
