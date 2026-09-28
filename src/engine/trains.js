/**
 * Đoàn tàu — the book's trains redrawn as SVG, and actions the child does on
 * them instead of only typing. An action only changes the picture — it never
 * writes the answer lines: the child works it out on the train, then writes
 * the answer below by themself.
 *
 *   trainSvg(label, cars, opts)   one train as an SVG string (sits inside q.q)
 *   trainGuide(text)              👆 how-to line + "↺ Làm lại" under the train
 *   trainCrayons(colors)          the crayons for q.trainPaint
 *   trainMatchCar / trainEngine   pieces for a q.trains "nối" question
 *
 *   q.trainSwap  = true    drag / tap two cars to swap them
 *   q.trainPaint = true    pick a crayon, tap a car to colour it
 *
 * Nothing points at the right cars in advance: a ✋ on the cars and the 👆 in
 * the guide line only show that the cars can be used, until the first action.
 */

const INK = '#231F20';
const CAR0 = 175;   // x of the first car
const PITCH = 120;  // car width + gap
const W = 110;      // car width
const DRAG_START_PX = 6;

const carX = (pos) => CAR0 + pos * PITCH;
const carMid = (pos) => carX(pos) + W / 2;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const norm = (s) => String(s).replace(/\s+/g, '').replace(/[−–]/g, '-');

// ── drawing ─────────────────────────────────────────────────────────────────
function wheel(cx, r, style) {
  const tyre = style === 'box' ? '#1F4E79' : INK;
  const hub = style === 'white' ? '#fff' : '#E5F4FC';
  return `<circle cx="${cx}" cy="120" r="${r}" fill="${tyre}"/><circle cx="${cx}" cy="120" r="${r * 0.55}" fill="${hub}"/><circle cx="${cx}" cy="120" r="${r * 0.28}" fill="${tyre}"/>`;
}

function engineBody(label) {
  let checks = '';
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 8; c++) {
      if ((r + c) % 2) checks += `<rect x="${12 + c * 10}" y="${76 + r * 9}" width="10" height="9" fill="#5BBDEB"/>`;
    }
  }
  return `<rect x="6" y="76" width="92" height="36" rx="10" fill="#B9E4F8"/>${checks}`
    + `<rect x="26" y="60" width="24" height="9" rx="3" fill="${INK}"/><rect x="30" y="68" width="16" height="9" fill="#5BBDEB"/>`
    + `<rect x="92" y="40" width="74" height="74" rx="6" fill="#29A9E0"/>`
    + `<rect x="84" y="28" width="90" height="14" rx="7" fill="${INK}"/>`
    + `<circle cx="129" cy="72" r="21" fill="#fff"/>`
    + (label ? `<text x="129" y="81" text-anchor="middle" font-size="26" fill="${INK}">${esc(label)}</text>` : '')
    + wheel(26, 11, 'white') + wheel(58, 11, 'white') + wheel(136, 13, 'white');
}

const fontFor = (text) => (String(text).length <= 2 ? 28 : String(text).length <= 3 ? 26 : 22);

// One car in its own coordinates (0..W wide, wheels at y=120). The element
// with class gw-car-paint is what a crayon colours.
function carBody(c, style) {
  const text = esc(c.text);
  const fs = fontFor(c.text);
  const tag = c.tag ? `<text x="${W / 2}" y="${style === 'box' ? 62 : 64}" text-anchor="middle" font-size="20" font-weight="700" fill="${INK}">${esc(c.tag)}</text>` : '';
  const ly = c.tag ? 88 : 80; // label centre
  if (style === 'bubble') {
    const short = String(c.text).length <= 2;
    const label = short && !c.tag
      ? `<circle class="gw-car-paint" cx="${W / 2}" cy="${ly}" r="21" fill="#fff" stroke="${INK}" stroke-width="1.4"/>`
      : `<ellipse class="gw-car-paint" cx="${W / 2}" cy="${ly}" rx="46" ry="${c.tag ? 15 : 18}" fill="#fff"/>`;
    return `<path class="gw-car-body" d="M10,112 C3,112 2,106 2,98 V66 C2,51 12,44 26,44 H84 C98,44 108,51 108,66 V98 C108,106 107,112 100,112 Z" fill="#C4C9CE" stroke="${INK}" stroke-width="1.5"/>`
      + `<path d="M11,106 V68 C11,57 18,52 28,52 H82 C92,52 99,57 99,68 V106 Z" fill="#CDEBFA"/>`
      + tag + label
      + `<text x="${W / 2}" y="${ly + fs * 0.36}" text-anchor="middle" font-size="${fs}" fill="${INK}">${text}</text>`
      + wheel(30, 11, style) + wheel(W - 30, 11, style);
  }
  if (style === 'box') {
    return `<rect class="gw-car-body" x="2" y="50" width="${W - 4}" height="58" rx="4" fill="#5BC0EB"/>`
      + `<rect x="0" y="45" width="${W}" height="8" rx="3" fill="#2E9BD6"/>`
      + `<rect x="2" y="104" width="${W - 4}" height="8" fill="#9AA3AD"/>`
      + tag
      + `<rect class="gw-car-paint" x="12" y="${ly - 16}" width="${W - 24}" height="32" rx="8" fill="#fff"/>`
      + `<text x="${W / 2}" y="${ly + fs * 0.36}" text-anchor="middle" font-size="${fs}" fill="${INK}">${text}</text>`
      + wheel(30, 10, style) + wheel(W - 30, 10, style);
  }
  return `<path class="gw-car-body gw-car-paint" d="M4,112 V64 C4,50 10,46 22,46 H${W - 22} C${W - 10},46 ${W - 4},50 ${W - 4},64 V112 Z" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`
    + `<rect x="5" y="96" width="${W - 10}" height="8" fill="#A7A9AC"/>`
    + tag
    + `<text x="${W / 2}" y="${c.tag ? 94 : 86}" text-anchor="middle" font-size="${fs}" fill="${INK}">${text}</text>`
    + wheel(30, 11, style) + wheel(W - 30, 11, style);
}

const HAND = `<text class="gw-car-hand" x="${W - 16}" y="52" font-size="18">✋</text>`;

// Wavy track (Bài 2, 33, 50): wave[pos] is how far car `pos` sits below the line.
const waveY = (wave, pos) => (wave ? wave[Math.max(0, Math.min(wave.length - 1, pos))] : 0);
function slotTransform(pos, wave) {
  const y = waveY(wave, pos);
  const tilt = wave ? Math.atan2(waveY(wave, pos + 1) - waveY(wave, pos - 1), 2 * PITCH) * 180 / Math.PI : 0;
  return `translate(${carX(pos) + W / 2}px,${120 + y}px) rotate(${tilt.toFixed(1)}deg) translate(${-W / 2}px,-120px)`;
}

function track(n, wave, width) {
  if (!wave) return `<line x1="90" y1="119" x2="${width - 12}" y2="119" stroke="${INK}" stroke-width="4"/>`;
  const pts = [[0, 133 + waveY(wave, 0) - 4]];
  for (let p = 0; p < n; p++) pts.push([carMid(p), 133 + waveY(wave, p)]);
  pts.push([width, 133 + waveY(wave, n - 1) - 4]);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    const mx = (x0 + x1) / 2;
    d += ` C${mx},${y0} ${mx},${y1} ${x1},${y1}`;
  }
  return `<path d="${d}" fill="none" stroke="#3E7CB1" stroke-width="3"/><path d="${d}" transform="translate(0,5)" fill="none" stroke="#8CB8DA" stroke-width="2"/>`;
}

// The book's double-headed arrow arching over the cars at positions i and j.
function arrow(i, j, wave) {
  if (i === j || i == null || j == null || i < 0 || j < 0) return '';
  const [a, b] = [Math.min(i, j), Math.max(i, j)];
  const x1 = carMid(a), x2 = carMid(b);
  const y1 = 40 + waveY(wave, a), y2 = 40 + waveY(wave, b);
  const mx = (x1 + x2) / 2, cy = Math.min(y1, y2) - 40;
  const head = (x, y) => {
    const dx = mx - x, dy = cy - y, len = Math.hypot(dx, dy);
    const ux = dx / len, uy = dy / len, px = -uy, py = ux;
    const p = [x + ux * 12 + px * 6, y + uy * 12 + py * 6];
    const q = [x + ux * 12 - px * 6, y + uy * 12 - py * 6];
    return `<polyline points="${p.join(',')} ${x},${y} ${q.join(',')}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  };
  return `<path d="M${x1},${y1} Q${mx},${cy} ${x2},${y2}" fill="none" stroke="${INK}" stroke-width="2.5"/>${head(x1, y1)}${head(x2, y2)}`;
}

/**
 * One train as an SVG string (no newlines — it sits inside q.q).
 *   label: letter on the engine ('' for none)
 *   cars:  numbers / strings, or { text, tag } (tag: letter over the car)
 *   opts.style: 'white' (default) | 'bubble' (grey-blue, oval label) | 'box' (blue box car)
 *   opts.wave:  y offset of each car, for the book's wavy track
 *   opts.sample: [i, j] car positions of a printed "theo mẫu" arrow
 *   opts.swap | opts.paint: which action the train takes part in
 */
export function trainSvg(label, cars, opts = {}) {
  const list = cars.map(c => (typeof c === 'object' ? c : { text: String(c) }));
  const style = opts.style || 'white';
  const wave = opts.wave || null;
  const width = carX(list.length - 1) + W + 8;
  const mode = opts.swap ? 'swap' : opts.paint ? 'paint' : '';
  const carAttr = (c) => {
    const v = esc(c.text);
    if (mode === 'swap') return `data-gw-car="${v}"`;
    if (mode === 'paint') return `data-gw-pcar="${v}"`;
    return '';
  };
  const carsSvg = list.map((c, pos) => `<g class="gw-car-slot" style="transform:${slotTransform(pos, wave)}"><g class="gw-car" ${carAttr(c)}><rect x="-4" y="34" width="${W + 8}" height="100" fill="transparent"/>${carBody(c, style)}${mode ? HAND : ''}</g></g>`).join('');
  const sample = opts.sample ? arrow(opts.sample[0], opts.sample[1], wave) : '';
  const attr = opts.swap ? `data-gw-train="${esc(list.map(c => c.text).join('|'))}"${wave ? ` data-gw-wave="${wave.join(',')}"` : ''}`
    : opts.paint ? `data-gw-paint-train="${esc(label)}"` : '';
  const top = opts.swap || opts.sample ? 0 : 22; // no arrow → no empty band above the cars
  const bottom = 140 + (wave ? Math.max(...wave) + 12 : 0);
  const engineY = wave ? waveY(wave, 0) - 2 : 0;
  return `<svg class="gw-train" ${attr} viewBox="0 ${top} ${width} ${bottom - top}" font-family="Arial, Helvetica, sans-serif" font-weight="400" style="display:block;width:100%;max-width:${Math.round(width * 0.85)}px;margin:4px auto 10px;overflow:visible">`
    + track(list.length, wave, width)
    + `<g transform="translate(0,${engineY})">${engineBody(label)}</g>`
    + `<g class="gw-train-arrow">${sample}</g>`
    + carsSvg
    + `</svg>`;
}

/** The how-to line under an action: an animated 👆, the text and "↺ Làm lại". */
export function trainGuide(text) {
  return `<span class="gw-act-guide gw-act-idle"><span class="gw-act-hand">👆</span><span class="gw-act-text">${text}</span><button type="button" class="gw-act-reset" disabled>↺ Làm lại</button></span>`;
}

// Hooks the guide line of `root` to an action: `idle` keeps the 👆 moving,
// `canReset` enables the button, `onReset` runs when it is pressed.
function hookGuide(root, onReset) {
  const el = root.querySelector('.gw-act-guide');
  const btn = el?.querySelector('.gw-act-reset');
  btn?.addEventListener('click', () => { if (!btn.disabled) onReset(); });
  return (idle, canReset) => {
    el?.classList.toggle('gw-act-idle', idle);
    if (btn) btn.disabled = !canReset;
  };
}

// What the child did on a question's trains, kept while the lesson stays open so
// the picture is still there when they come back to the question.
const STATE = new WeakMap();
const stateOf = (q, init) => {
  if (!STATE.has(q)) STATE.set(q, init());
  return STATE.get(q);
};
// Actions stop once the question's answer lines are locked (after "Kiểm tra").
const lockedFn = (groups) => {
  const first = groups.flat()[0];
  return () => !!first?.disabled;
};

// ── Đổi chỗ hai toa ─────────────────────────────────────────────────────────
/**
 * q.trainSwap = true: drag a car onto another (or tap one, then the other):
 * the two trade places and the book's arrow is drawn over their places. One
 * swap is kept. The "Đổi chỗ toa ... và toa ..." line is left for the child.
 */
export function attachTrainSwap(root, q, groups) {
  const svg = root.querySelector('svg[data-gw-train]');
  if (!svg) return;
  const nums = svg.dataset.gwTrain.split('|');
  const wave = svg.dataset.gwWave ? svg.dataset.gwWave.split(',').map(Number) : null;
  const cars = new Map([...svg.querySelectorAll('[data-gw-car]')].map(el => [el.dataset.gwCar, el.parentNode]));
  const arrowG = svg.querySelector('.gw-train-arrow');
  const locked = lockedFn(groups);
  const st = stateOf(q, () => ({ pair: null }));
  let selected = null;
  let drag = null;

  const pair = () => st.pair;
  function order() {
    const o = [...nums];
    const p = pair();
    if (p) {
      const i = o.indexOf(p[0]), j = o.indexOf(p[1]);
      [o[i], o[j]] = [o[j], o[i]];
    }
    return o;
  }
  const guide = hookGuide(root, () => { selected = null; write(null); draw(); });

  function draw() {
    const o = order();
    const p = pair();
    const swapped = !!p;
    arrowG.innerHTML = p ? arrow(nums.indexOf(p[0]), nums.indexOf(p[1]), wave) : '';
    cars.forEach((slot, n) => {
      if (drag?.car !== n || !drag.moved) slot.style.transform = slotTransform(o.indexOf(n), wave);
      slot.classList.toggle('gw-car-selected', n === selected);
      slot.classList.toggle('gw-car-drop', !!drag?.moved && n !== drag.car);
      slot.classList.toggle('gw-car-hint', !swapped && !locked() && !drag?.moved);
      slot.classList.toggle('gw-car-active', !locked());
    });
    guide(!swapped && !selected && !locked(), swapped && !locked());
  }

  function write(p) {
    st.pair = p ? [...p].sort((a, b) => nums.indexOf(a) - nums.indexOf(b)) : null;
  }

  function swap(a, b) {
    if (locked() || a === b) return;
    const o = order();
    const i = o.indexOf(a), j = o.indexOf(b);
    [o[i], o[j]] = [o[j], o[i]];
    const moved = nums.filter((n, k) => o[k] !== n);
    if (!moved.length) write(null);
    else if (moved.length === 2) write(moved);
    else write([a, b]); // would take two swaps — start again from the book's order
  }

  const unitsPerPx = () => svg.viewBox.baseVal.width / svg.getBoundingClientRect().width;
  function carAt(x) {
    const r = svg.getBoundingClientRect();
    const ux = (x - r.left) * unitsPerPx();
    const pos = Math.round((ux - CAR0 - W / 2) / PITCH);
    return order()[Math.max(0, Math.min(nums.length - 1, pos))];
  }
  function onDown(e, n) {
    if (locked() || e.button > 0) return;
    e.preventDefault();
    const pos = order().indexOf(n);
    drag = { car: n, x: e.clientX, y: e.clientY, moved: false, over: null, pos };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onCancel);
  }
  function onMove(e) {
    if (!drag) return;
    const slot = cars.get(drag.car);
    if (!drag.moved) {
      if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < DRAG_START_PX) return;
      drag.moved = true;
      selected = null;
      slot.classList.add('gw-car-dragging');
      svg.appendChild(slot); // on top of the other cars
      draw();
    }
    const dx = (e.clientX - drag.x) * unitsPerPx();
    const dy = Math.max(-30, Math.min(30, (e.clientY - drag.y) * unitsPerPx()));
    slot.style.transform = `translate(${dx}px,${dy}px) ${slotTransform(drag.pos, wave)}`;
    const over = carAt(e.clientX);
    const target = over !== drag.car ? over : null;
    if (target !== drag.over) {
      if (drag.over) cars.get(drag.over).classList.remove('gw-car-over');
      if (target) cars.get(target).classList.add('gw-car-over');
      drag.over = target;
    }
  }
  function endDrag() {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onCancel);
    const d = drag;
    if (d.over) cars.get(d.over).classList.remove('gw-car-over');
    cars.get(d.car).classList.remove('gw-car-dragging');
    drag = null;
    return d;
  }
  function onCancel() { if (drag) { endDrag(); draw(); } }
  function onUp() {
    if (!drag) return;
    const d = endDrag();
    if (d.moved) {
      if (d.over) swap(d.car, d.over);
      draw();
      return;
    }
    if (selected && selected !== d.car) { swap(selected, d.car); selected = null; }
    else selected = selected === d.car ? null : d.car;
    draw();
  }

  cars.forEach((slot, n) => slot.addEventListener('pointerdown', (e) => onDown(e, n)));
  draw();
}

// ── Tô màu toa tàu ──────────────────────────────────────────────────────────
export const CRAYONS = { yellow: ['Vàng', '#FDE047'], red: ['Đỏ', '#F87171'], blue: ['Xanh', '#60A5FA'] };
export function trainCrayons(colors) {
  const btn = (key, label, fill) => `<button type="button" class="gw-crayon" data-gw-crayon="${key}"><span class="gw-crayon-dot" style="background:${fill}"></span>${label}</button>`;
  return `<span class="gw-crayons">${colors.map(c => btn(c, ...CRAYONS[c])).join('')}${btn('', 'Tẩy', '#fff')}</span>`;
}

/**
 * q.trainPaint = true: pick a crayon, tap a car to colour it (tap again or
 * use "Tẩy" to clear). Only the picture is coloured — the child reads it and
 * writes the answer lines below by themself.
 */
export function attachTrainPaint(root, q, groups) {
  const trains = new Map([...root.querySelectorAll('svg[data-gw-paint-train]')].map(svg => [
    svg.dataset.gwPaintTrain,
    [...svg.querySelectorAll('[data-gw-pcar]')].map(el => ({ n: el.dataset.gwPcar, slot: el.parentNode })),
  ]));
  const crayons = [...root.querySelectorAll('[data-gw-crayon]')];
  if (!trains.size) return;
  const locked = lockedFn(groups);
  const paint = stateOf(q, () => new Map()); // "A:65" → colour key
  let crayon = null;

  const guide = hookGuide(root, () => {
    paint.clear();
    crayon = null;
    draw();
  });

  function draw() {
    const idle = !paint.size && !locked();
    trains.forEach((cars, t) => cars.forEach(({ n, slot }) => {
      const c = paint.get(`${t}:${n}`);
      slot.querySelector('.gw-car-paint').style.fill = c ? CRAYONS[c][1] : '';
      slot.classList.toggle('gw-car-hint', idle && crayon == null);
      slot.classList.toggle('gw-car-active', !locked());
    }));
    crayons.forEach(b => {
      b.classList.toggle('gw-crayon-on', b.dataset.gwCrayon === crayon);
      b.classList.toggle('gw-crayon-hint', idle && crayon == null);
      b.disabled = locked();
    });
    guide(idle, paint.size > 0 && !locked());
  }

  crayons.forEach(b => b.addEventListener('click', () => {
    if (locked()) return;
    crayon = crayon === b.dataset.gwCrayon ? null : b.dataset.gwCrayon;
    draw();
  }));
  trains.forEach((cars, t) => cars.forEach(({ n, slot }) => slot.addEventListener('click', () => {
    if (locked() || crayon == null) return;
    const key = `${t}:${n}`;
    if (!crayon || paint.get(key) === crayon) paint.delete(key);
    else paint.set(key, crayon);
    draw();
  })));
  draw();
}

// ── Nối toa hai đoàn tàu (q.type 'match' with q.trains) ────────────────────
/** An engine alone, as an SVG string (the first box of a match train row). */
export function trainEngine(label) {
  return `<svg class="gw-mtrain-engine" viewBox="0 22 ${CAR0 - 5} 116" font-family="Arial, Helvetica, sans-serif" font-weight="400"><line x1="90" y1="119" x2="${CAR0}" y2="119" stroke="${INK}" stroke-width="4"/>${engineBody(label)}</svg>`;
}
/** One car alone, as an SVG string (inside a match button). */
export function trainMatchCar(text, style = 'white') {
  return `<svg class="gw-mtrain-car" viewBox="-5 36 ${W + 10} 100" font-family="Arial, Helvetica, sans-serif" font-weight="400"><line x1="-5" y1="119" x2="${W + 5}" y2="119" stroke="${INK}" stroke-width="4"/><g class="gw-car-slot">${carBody({ text }, style)}</g></svg>`;
}
