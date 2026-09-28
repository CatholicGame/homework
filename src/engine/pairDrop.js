/**
 * Kéo – ghép miếng bìa vào ô trống, giữ nguyên trang sách.
 *
 * The question's own HTML stays exactly as the book prints it; it only marks
 * the loose pieces with data-gw-piece="H" and the holes with data-gw-hole="A".
 * The child drags a piece onto a hole (or taps the piece, then the hole) and
 * the piece's numbers appear inside the board. Only the board changes — the
 * "Ghép ... vào ..." answer lines are never filled in: the child tries the
 * pieces on the board, then writes the answer by themself.
 *
 *   q.pairDrop = { sample: ['E', 'C'] }
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
// hole → piece the child placed, per question, kept while the lesson stays open
const PLACED = new WeakMap();

export function attachPairDrop(root, q, groups) {
  const cfg = q.pairDrop;
  const pieces = new Map([...root.querySelectorAll('[data-gw-piece]')].map(el => [el.dataset.gwPiece, el]));
  const holes = new Map([...root.querySelectorAll('[data-gw-hole]')].map(el => [el.dataset.gwHole, el]));
  if (!pieces.size || !holes.size) return;
  const holeLabel = new Map([...holes].map(([k, el]) => [k, el.innerHTML]));
  const [samplePiece, sampleHole] = cfg.sample || [];
  const first = groups.flat()[0];
  const locked = () => !!first?.disabled; // after "Kiểm tra"
  if (!PLACED.has(q)) PLACED.set(q, new Map());
  const placed = PLACED.get(q);
  let selected = null; // piece letter picked by a tap, waiting for a hole
  let hinted = !placed.size; // hand icon on the pieces until the first placement
  let drag = null;     // the piece being dragged, see onDown()

  // hole → piece: the sample and what the child placed
  function placements() {
    const map = new Map(placed);
    if (samplePiece && sampleHole) map.set(sampleHole, samplePiece);
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

  function unplace(piece) {
    if (locked()) return;
    for (const [h, p] of placed) if (p === piece) placed.delete(h);
  }
  function place(piece, hole) {
    if (locked() || piece === samplePiece || hole === sampleHole) return;
    unplace(piece); // a piece sits in one hole; it replaces whatever was there
    placed.set(hole, piece);
    hinted = false;
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
  draw();
}
