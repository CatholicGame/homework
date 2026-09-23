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
 * number pad) and flags <html class="kb-open"> so screens can switch to a
 * more compact layout, then re-centers the focused input.
 *
 * Usage: call initKeyboardInset() once at app startup.
 */

const NATIVE_KB_MIN = 120; // px of viewport lost before we call it a keyboard

export function initKeyboardInset() {
  const root = document.documentElement;
  const vv = window.visualViewport;
  let wasOpen = false;

  const isEditable = (el) =>
    !!el && (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && !['button', 'checkbox', 'radio', 'submit'].includes(el.type)) || el.isContentEditable);

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
    root.classList.toggle('kb-open', open);
    if (open) {
      const top = nativeOpen ? vvTop : 0;
      const h = (nativeOpen ? vvH : layoutH) - padH;
      root.style.setProperty('--kb-app-top', `${Math.round(top)}px`);
      root.style.setProperty('--kb-app-h', `${Math.max(160, Math.round(h))}px`);
    } else {
      root.style.removeProperty('--kb-app-top');
      root.style.removeProperty('--kb-app-h');
    }

    if (open) {
      // Layout just changed under the focused input — bring it back into view
      // (after the new layout has been applied).
      requestAnimationFrame(() => {
        const el = document.activeElement;
        if (isEditable(el) && el.closest('#app')) el.scrollIntoView({ block: 'center', behavior: wasOpen ? 'smooth' : 'auto' });
        wasOpen = true;
      });
    } else {
      wasOpen = false;
    }
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
