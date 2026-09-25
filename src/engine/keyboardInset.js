/**
 * Keyboard inset — keeps #app inside the part of the screen a keyboard
 * doesn't cover.
 *
 * On iPad/iPhone the native keyboard doesn't resize the layout viewport: it
 * just slides over the bottom of the page, so a full-height #app keeps its
 * answer boxes hidden underneath it. The same goes for our own on-screen
 * number pad (#virtual-keyboard, fixed to the bottom) on screens that opt in
 * with a .kb-inset-pad element. While either one is
 * open, this shrinks #app to the visible area (visualViewport minus the
 * number pad) and flags <html class="kb-open"> (plus "kb-tight" when the
 * visible strip is short) so screens can switch to a more compact layout,
 * then re-centers the focused input.
 *
 * Usage: call initKeyboardInset() once at app startup.
 */

const NATIVE_KB_MIN = 120; // px of viewport lost before we call it a keyboard
// Below this visible height screens switch to their compact keyboard layout
// (html.kb-tight). Above it (desktop / tall screens) the normal layout still
// fits, so it stays as is instead of jumping to a squeezed one.
const KB_TIGHT_MAX = 620;

export function initKeyboardInset() {
  const root = document.documentElement;
  const vv = window.visualViewport;
  // Last applied state: re-center the input only when one of these changes.
  // Re-centering on every visualViewport scroll event made a feedback loop
  // on iPad (our scroll → vv scroll → update → scroll …) = shaking content.
  let last = { open: false, top: null, h: null, focus: null };

  // readonly inputs are the number-pad ones: they never bring up the native keyboard.
  const isEditable = (el) =>
    !!el && !el.readOnly && (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && !['button', 'checkbox', 'radio', 'submit'].includes(el.type)) || el.isContentEditable);

  function update() {
    const layoutH = root.clientHeight;
    // Pinch-zoom also shrinks visualViewport — only a keyboard when unzoomed.
    const unzoomed = !vv || Math.abs(vv.scale - 1) < 0.01;
    const vvH = vv ? vv.height : window.innerHeight;
    const vvTop = vv ? vv.offsetTop : 0;
    const nativeOpen = unzoomed && isEditable(document.activeElement) && layoutH - vvH > NATIVE_KB_MIN;

    // Number pad: only screens that opted in (.kb-inset-pad) reflow for it —
    // the older games are laid out around it overlaying the bottom edge.
    const padScreen = !!document.querySelector('#app .kb-inset-pad');
    const pad = padScreen && document.body.classList.contains('vk-active') ? document.getElementById('virtual-keyboard') : null;
    const padH = pad ? pad.offsetHeight : 0;

    const open = nativeOpen || padH > 0;
    const focus = document.activeElement;
    if (!open) {
      if (last.open) {
        root.classList.remove('kb-open', 'kb-tight');
        root.style.removeProperty('--kb-app-top');
        root.style.removeProperty('--kb-app-h');
      }
      last = { open: false, top: null, h: null, focus: null };
      return;
    }

    const top = Math.round(nativeOpen ? vvTop : 0);
    const h = Math.max(160, Math.round((nativeOpen ? vvH : layoutH) - padH));
    // Only touch the DOM when a value really changed (avoids layout thrash).
    if (!last.open) root.classList.add('kb-open');
    root.classList.toggle('kb-tight', h < KB_TIGHT_MAX);
    if (top !== last.top) root.style.setProperty('--kb-app-top', `${top}px`);
    if (h !== last.h) root.style.setProperty('--kb-app-h', `${h}px`);

    // Re-center only when the keyboard just opened, the focused input changed
    // or the visible height changed — a pure viewport pan (top only) must not
    // trigger another scroll.
    const needCenter = !last.open || focus !== last.focus || Math.abs(h - (last.h ?? h)) > 1;
    last = { open: true, top, h, focus };
    if (needCenter) requestAnimationFrame(() => centerInApp(document.activeElement));
  }

  // Scroll the input to the middle of its own scroll container inside #app,
  // instantly. Unlike scrollIntoView this never scrolls the page / visual
  // viewport, so it can't feed back into the vv scroll listener.
  function centerInApp(el) {
    if (!el || !/^(INPUT|TEXTAREA)$/.test(el.tagName) || !el.closest('#app')) return;
    let box = el.parentElement;
    while (box && box.id !== 'app') {
      const oy = getComputedStyle(box).overflowY;
      if ((oy === 'auto' || oy === 'scroll') && box.scrollHeight > box.clientHeight) break;
      box = box.parentElement;
    }
    if (!box) return;
    const r = el.getBoundingClientRect(), br = box.getBoundingClientRect();
    const delta = (r.top + r.height / 2) - (br.top + br.height / 2);
    if (Math.abs(delta) > 4) box.scrollTop += delta;
  }

  let raf = 0;
  const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };

  if (vv) {
    vv.addEventListener('resize', schedule);
    vv.addEventListener('scroll', schedule);
  }
  window.addEventListener('resize', schedule);
  document.addEventListener('focusin', schedule);
  // Native keyboard closes a beat after blur; the vv resize covers the rest.
  document.addEventListener('focusout', () => setTimeout(schedule, 50));
  // Our own number pad toggles body.vk-active.
  new MutationObserver(schedule).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  schedule();
}
