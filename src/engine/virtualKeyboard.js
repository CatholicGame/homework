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

const VK_CLASS = 'vk-panel';
const VK_SELECTOR = 'input[type="number"], input[inputmode="numeric"], input[data-vk-words], input[data-vk-tiles]';
const TILE_SEP = ', ';

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

  const keys = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['⌫', '0', ',', '✓'],
  ];

  panel.innerHTML = keys.map(row => `
    <div class="vk-row">
      ${row.map(k => `
        <button class="vk-key ${k === '⌫' ? 'vk-backspace' : ''} ${k === '✓' ? 'vk-confirm' : ''} ${k === ',' ? 'vk-comma' : ''}"
                data-key="${k}" type="button">
          ${k}
        </button>
      `).join('')}
    </div>
  `).join('');

  document.body.appendChild(panel);
  return panel;
}

function createWordKeyboard() {
  const existing = document.getElementById('virtual-keyboard-words');
  if (existing) return existing;

  const wp = document.createElement('div');
  wp.id = 'virtual-keyboard-words';
  wp.className = `${VK_CLASS} vk-words`;
  wp.setAttribute('aria-label', 'Bàn phím chữ đọc số');
  wp.innerHTML = WORD_ROWS.map(row => `
    <div class="vk-row">
      ${row.map(k => `<button class="vk-key ${k === '⌫' ? 'vk-backspace' : ''} ${k === '✓' ? 'vk-confirm' : ''}" data-key="${k}" type="button">${k}</button>`).join('')}
    </div>
  `).join('');

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
  try { return JSON.parse(input.dataset.vkTiles); } catch { return []; }
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
  tilePanel.innerHTML = `
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
let suppressReshow = false;  // prevents keyboard re-opening after ✓ submission

function showKeyboard(input) {
  if (suppressReshow) return;          // cooldown after ✓ → don't reopen
  activeInput = input;
  panel = panel || createKeyboard();
  wordPanel = wordPanel || createWordKeyboard();
  const words = !!input.dataset.vkWords;
  const tiles = !!input.dataset.vkTiles;
  wordPanel.classList.toggle('vk-visible', words);
  if (tiles) showTiles(input);
  else if (tilePanel) tilePanel.classList.remove('vk-visible');
  if (words || tiles) {
    panel.classList.remove('vk-visible');
    document.body.classList.add('vk-active');
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  // The "," key only shows for a blank whose answer is a list of numbers in
  // one field (e.g. "59, 56, 51, 53") — elsewhere it would just invite typos.
  panel.classList.toggle('vk-with-comma', !!input.dataset.vkComma);
  panel.classList.add('vk-visible');
  document.body.classList.add('vk-active'); // hides the floating fullscreen button, which sits at bottom-right and would otherwise overlap the now-wide keypad's ✓ key
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
    // ", " is typed as one key, so it is erased as one too
    const v = activeInput.value;
    activeInput.value = v.endsWith(', ') ? v.slice(0, -2) : v.slice(0, -1);
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
    // Digit — max 4 chars to avoid overflow (or the input's own maxlength,
    // e.g. a one-digit "ô trống" box in the grade-3 workbook)
    // A comma list holds several numbers, so it gets a much longer cap.
    const cap = activeInput.dataset.vkComma ? 40 : 4;
    const maxChars = activeInput.maxLength > 0 ? Math.min(cap, activeInput.maxLength) : cap;
    if (activeInput.value.length >= maxChars) return;
    if (key === ',') {
      // No leading or doubled comma; add the space the book writes after it
      const v = activeInput.value;
      if (!v || v.endsWith(', ')) return;
      activeInput.value = v + ', ';
    } else if (key === '-' && activeInput.value.length === 0) {
      // Handle leading minus for negative answers
      activeInput.value = '-';
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
      if (btn.dataset.tile != null) { if (!btn.disabled) pressTile(+btn.dataset.tile); }
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
      if (btn.dataset.tile != null) { if (!btn.disabled) pressTile(+btn.dataset.tile); }
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
