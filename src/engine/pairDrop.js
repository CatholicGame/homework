/**
 * Kéo – ghép miếng bìa vào ô trống, giữ nguyên trang sách.
 *
 * The question's own HTML stays exactly as the book prints it; it only marks
 * the loose pieces with data-gw-piece="H" and the holes with data-gw-hole="A".
 * The child drags a piece onto a hole (or taps the piece, then the hole) and
 * the piece's numbers appear inside the board. Each placement is written into
 * the book's "Ghép ... vào ..." answer line (two inputs: piece, hole), so the
 * written answer and the normal "Kiểm tra" grading stay unchanged — the
 * inputs are the single source of truth and the board is redrawn from them.
 *
 *   q.pairDrop = { blanks: [0, 1, 2], sample: ['E', 'C'] }
 *     blanks: indices of the two-slot "Ghép ... vào ..." blanks
 *     sample: the book's "theo mẫu" pair, shown placed (blue) and locked
 *
 * No hole is ever pointed out in advance — working out where a piece belongs
 * is the exercise. A hand icon on the pieces shows they can be grabbed (until
 * the first piece is placed); while a piece is being dragged every hole it
 * may go into (all but the sample's) gets an outline, and the one it is near
 * lights up, just before the drop.
 */

const DRAG_START_PX = 6;
const NEAR_PX = 36; // a drop this close to a hole's edge still lands in it

export function attachPairDrop(root, q, groups) {
  const cfg = q.pairDrop;
  const rows = cfg.blanks.map(i => groups[i]).filter(g => g && g.length === 2);
  const pieces = new Map([...root.querySelectorAll('[data-gw-piece]')].map(el => [el.dataset.gwPiece, el]));
  const holes = new Map([...root.querySelectorAll('[data-gw-hole]')].map(el => [el.dataset.gwHole, el]));
  if (!rows.length || !pieces.size || !holes.size) return;
  const holeLabel = new Map([...holes].map(([k, el]) => [k, el.innerHTML]));
  const [samplePiece, sampleHole] = cfg.sample || [];
  const locked = () => rows[0][0].disabled;
  let selected = null; // piece letter picked by a tap, waiting for a hole
  let hinted = true;   // hand icon on the pieces until the first placement
  let drag = null;     // the piece being dragged, see onDown()

  const read = (inp) => inp.value.trim().toUpperCase();

  // hole → piece, from the answer lines (a later line wins a clash)
  function placements() {
    const map = new Map();
    if (samplePiece && sampleHole) map.set(sampleHole, samplePiece);
    rows.forEach(([p, h]) => {
      const pv = read(p), hv = read(h);
      if (!pieces.has(pv) || !holes.has(hv) || hv === sampleHole) return;
      for (const [k, v] of map) if (v === pv && k !== sampleHole) map.delete(k);
      map.set(hv, pv);
    });
    return map;
  }

  function draw() {
    const map = placements();
    const used = new Set(map.values());
    holes.forEach((el, key) => {
      const p = map.get(key);
      el.classList.toggle('gw-hole-filled', !!p);
      el.classList.toggle('gw-hole-sample', key === sampleHole);
      el.classList.toggle('gw-hole-drop', !!drag?.ghost && key !== sampleHole);
      // Only redraw a hole whose piece changed — redrawing replays the snap
      // animation, which made the sample hole C flash at every drag start.
      if (el.dataset.gwShown === (p || '')) return;
      el.dataset.gwShown = p || '';
      el.innerHTML = p
        ? `<div class="gw-hole-piece">${pieces.get(p).querySelector('table').outerHTML}</div>`
        : holeLabel.get(key);
    });
    pieces.forEach((el, key) => {
      el.classList.toggle('gw-piece-used', used.has(key));
      el.classList.toggle('gw-piece-sample', key === samplePiece);
      el.classList.toggle('gw-piece-selected', key === selected);
      el.classList.toggle('gw-piece-hint', hinted && !locked() && key !== samplePiece && !used.has(key));
    });
  }

  function write(pairs) {
    rows.forEach(([p, h], i) => {
      p.value = pairs[i]?.[0] ?? '';
      h.value = pairs[i]?.[1] ?? '';
      p.dispatchEvent(new Event('input', { bubbles: true }));
      h.dispatchEvent(new Event('input', { bubbles: true }));
    });
  }
  // Current lines as [piece, hole] pairs, keeping their order, blanks dropped.
  const currentPairs = () => rows.map(([p, h]) => [read(p), read(h)]).filter(([p, h]) => p || h);

  function place(piece, hole) {
    if (locked() || piece === samplePiece || hole === sampleHole) return;
    const pairs = currentPairs().filter(([p, h]) => p !== piece && h !== hole);
    if (pairs.length >= rows.length) return;
    pairs.push([piece, hole]);
    hinted = false;
    write(pairs);
  }
  function unplace(piece) {
    if (locked()) return;
    write(currentPairs().filter(([p]) => p !== piece));
  }

  // ── pointer: drag, or tap-then-tap ────────────────────────────────────────
  // The hole nearest the pointer, if it is within NEAR_PX of it.
  function holeAt(x, y) {
    let best = null, bestD = NEAR_PX;
    holes.forEach((el, key) => {
      const r = el.getBoundingClientRect();
      const d = Math.hypot(Math.max(r.left - x, 0, x - r.right), Math.max(r.top - y, 0, y - r.bottom));
      if (d <= bestD) { best = key; bestD = d; }
    });
    return best;
  }
  function onDown(e, piece, fromHole) {
    if (locked() || piece === samplePiece || e.button > 0) return;
    e.preventDefault();
    drag = { piece, fromHole, x: e.clientX, y: e.clientY, ghost: null, over: null };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onCancel);
  }
  function onMove(e) {
    if (!drag) return;
    if (!drag.ghost) {
      if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < DRAG_START_PX) return;
      const src = pieces.get(drag.piece);
      drag.ghost = src.cloneNode(true);
      drag.ghost.classList.remove('gw-piece-used', 'gw-piece-selected', 'gw-piece-hint');
      drag.ghost.classList.add('gw-piece-ghost');
      document.body.appendChild(drag.ghost);
      selected = null;
      draw();
    }
    drag.ghost.style.left = `${e.clientX}px`;
    drag.ghost.style.top = `${e.clientY}px`;
    const over = holeAt(e.clientX, e.clientY);
    if (over !== drag.over) {
      if (drag.over) holes.get(drag.over).classList.remove('gw-hole-over');
      if (over && over !== sampleHole) holes.get(over).classList.add('gw-hole-over');
      drag.over = over;
    }
  }
  function endDrag() {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onCancel);
    drag.ghost?.remove();
    if (drag.over) holes.get(drag.over).classList.remove('gw-hole-over');
    const d = drag;
    drag = null;
    return d;
  }
  function onCancel() { if (drag) { endDrag(); draw(); } }
  function onUp(e) {
    if (!drag) return;
    const d = endDrag();
    if (d.ghost) {
      const hole = holeAt(e.clientX, e.clientY);
      if (hole) place(d.piece, hole);
      else if (d.fromHole) unplace(d.piece); // dragged back out of the board
      draw();
      return;
    }
    // A tap: on a placed piece → take it back out; on a loose piece → select it.
    if (d.fromHole) { selected = null; unplace(d.piece); }
    else selected = selected === d.piece ? null : d.piece;
    draw();
  }

  pieces.forEach((el, key) => {
    el.addEventListener('pointerdown', (e) => onDown(e, key, false));
  });
  holes.forEach((el, key) => {
    el.addEventListener('pointerdown', (e) => {
      const p = placements().get(key);
      if (selected && !locked()) {
        e.preventDefault();
        place(selected, key);
        selected = null;
        draw();
      } else if (p) onDown(e, p, true);
    });
  });
  rows.flat().forEach(inp => inp.addEventListener('input', draw));
  draw();
}
