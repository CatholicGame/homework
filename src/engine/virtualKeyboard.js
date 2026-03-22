/**
 * Virtual Number Keyboard
 * Intercepts all number inputs in the app and shows a large, kid-friendly
 * on-screen numpad instead of the native mobile keyboard.
 *
 * Usage: import and call initVirtualKeyboard() once at app startup.
 * All <input type="number"> and <input inputmode="numeric"> elements
 * will automatically get the virtual keyboard.
 */

const VK_CLASS = 'vk-panel';

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
    ['⌫', '0', '✓'],
  ];

  panel.innerHTML = keys.map(row => `
    <div class="vk-row">
      ${row.map(k => `
        <button class="vk-key ${k === '⌫' ? 'vk-backspace' : ''} ${k === '✓' ? 'vk-confirm' : ''}"
                data-key="${k}" type="button">
          ${k}
        </button>
      `).join('')}
    </div>
  `).join('');

  document.body.appendChild(panel);
  return panel;
}

// ── State ────────────────────────────────────────────────────────────────────
let activeInput = null;
let panel = null;
let suppressReshow = false;  // prevents keyboard re-opening after ✓ submission

function showKeyboard(input) {
  if (suppressReshow) return;          // cooldown after ✓ → don't reopen
  activeInput = input;
  panel = panel || createKeyboard();
  panel.classList.add('vk-visible');
  input.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideKeyboard() {
  activeInput = null;
  if (panel) panel.classList.remove('vk-visible');
}

function pressKey(key) {
  if (!activeInput) return;

  if (key === '⌫') {
    // Backspace
    const v = activeInput.value;
    activeInput.value = v.slice(0, -1);
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
    // Digit — max 4 chars to avoid overflow
    if (activeInput.value.length >= 4) return;
    // Handle leading minus for negative answers
    if (key === '-' && activeInput.value.length === 0) {
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

  // Prevent native keyboard
  input.setAttribute('readonly', 'readonly');

  input.addEventListener('focus', (e) => {
    // remove readonly temporarily so value can be set programmatically
    input.removeAttribute('readonly');
    showKeyboard(input);
    // re-apply readonly so native keyboard doesn't open
    setTimeout(() => input.setAttribute('readonly', 'readonly'), 0);
    e.stopPropagation();
  });

  input.addEventListener('click', (e) => {
    showKeyboard(input);
    e.stopPropagation();
  });
}

// ── Scan and attach to all current inputs ────────────────────────────────────
function scanInputs(root = document) {
  root.querySelectorAll('input[type="number"], input[inputmode="numeric"]').forEach(attachToInput);
}

// ── MutationObserver — auto-attach when new inputs appear in DOM ─────────────
let observer = null;

function startObserver() {
  if (observer) return;
  observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        if (node.matches?.('input[type="number"], input[inputmode="numeric"]')) {
          attachToInput(node);
        } else {
          node.querySelectorAll?.('input[type="number"], input[inputmode="numeric"]')
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
      pressKey(btn.dataset.key);
      return;
    }
    // Click outside keyboard + outside an input → hide
    if (!e.target.closest('#virtual-keyboard') &&
        !e.target.matches('input[type="number"], input[inputmode="numeric"]')) {
      hideKeyboard();
    }
  }, true);

  // Touch support
  document.addEventListener('touchstart', (e) => {
    const btn = e.target.closest('.vk-key');
    if (btn) {
      e.preventDefault();
      pressKey(btn.dataset.key);
    }
  }, { passive: false, capture: true });
}

// ── Public init ──────────────────────────────────────────────────────────────
let initialized = false;

export function initVirtualKeyboard() {
  if (initialized) return;
  initialized = true;

  createKeyboard();
  scanInputs();
  startObserver();
  installHandlers();
}
