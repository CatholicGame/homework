/**
 * Tô số bằng ngón tay: bé kéo theo nét chấm, nét màu hiện dần phía sau ngón tay.
 * Mỗi chữ số gồm 1–2 nét (đường SVG trong khung 100×140), tô theo đúng thứ tự
 * và chiều viết; chấm xanh nhấp nháy là chỗ đặt bút.
 */

// Nét viết từng chữ số (khung 100×140).
const DIGITS = {
  0: ['M50 16 C24 16 18 48 18 70 C18 96 26 126 50 126 C74 126 82 96 82 70 C82 48 76 16 50 16'],
  1: ['M30 42 L58 16 L58 126'],
  2: ['M22 44 C22 20 38 14 50 14 C66 14 78 24 78 42 C78 66 46 92 20 126 L82 126'],
  3: ['M22 30 C30 16 42 14 50 14 C66 14 78 24 78 40 C78 56 64 66 46 66 C66 66 82 78 82 96 C82 116 66 128 50 128 C36 128 26 122 18 110'],
  4: ['M60 16 L16 92 L86 92', 'M62 52 L62 128'],
  5: ['M32 16 L28 62 C36 56 44 54 52 54 C70 54 82 68 82 88 C82 112 66 128 48 128 C36 128 26 122 18 110', 'M32 16 L78 16'],
  6: ['M74 24 C66 16 58 14 52 14 C30 14 20 40 20 76 C20 108 32 128 52 128 C70 128 82 114 82 96 C82 78 70 66 52 66 C36 66 24 76 20 92'],
  7: ['M18 16 L82 16 L42 128'],
  8: ['M50 66 C32 66 22 54 22 40 C22 24 34 14 50 14 C66 14 78 24 78 40 C78 54 68 66 50 66 C30 66 18 80 18 98 C18 116 32 128 50 128 C68 128 82 116 82 98 C82 80 70 66 50 66'],
  9: ['M80 44 C80 26 68 14 50 14 C32 14 20 28 20 44 C20 60 32 72 50 72 C66 72 80 62 80 44 L80 128'],
};

/** Các nét của một số (1–10) trong khung rộng `width` × 140. */
export function numberStrokes(n) {
  if (n < 10) return { width: 100, strokes: DIGITS[n] };
  // Số 10: chữ số 1 bên trái, 0 bên phải.
  const shift = (d, dx) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => `${+x + dx} ${y}`);
  return { width: 170, strokes: [shift(DIGITS[1][0], -8), shift(DIGITS[0][0], 70)] };
}

const SVG_NS = 'http://www.w3.org/2000/svg';
const STEP = 2.5;       // khoảng cách giữa các điểm mẫu trên nét
const REACH = 17;       // ngón tay cách nét bao nhiêu vẫn tính là đang tô
const LOOKAHEAD = 14;   // số điểm mẫu phía trước được "nhảy" tới mỗi lần di chuyển

/**
 * Gắn khung tô số vào `host`. `n` là một số (1–10) hoặc nét dựng sẵn
 * { width, strokes, guides? } (chữ cái, letters.js); `guides` = các dòng kẻ ngang (toạ độ y). Gọi `onStroke(i)` khi xong một nét, `onDone()` khi xong cả số.
 * Trả về { destroy }.
 */
export function mountTracer(host, n, { color = '#2563EB', onStroke, onDone, onTouch } = {}) {
  const { width, strokes, guides = [] } = typeof n === 'object' ? n : numberStrokes(n);
  host.innerHTML = `
    <svg class="pk-trace-svg${guides.length ? ' has-guides' : ''}" viewBox="-6 0 ${width + 12} 142" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      ${guides.map((y, i) => `<line class="pk-trace-line${i === 2 ? ' is-base' : ''}" x1="-600" x2="${width + 600}" y1="${y}" y2="${y}"/>`).join('')}
      <g class="pk-trace-guides">
        ${strokes.map(d => `<path class="pk-trace-track" d="${d}"/>`).join('')}
        ${strokes.map(d => `<path class="pk-trace-dash" d="${d}"/>`).join('')}
      </g>
      <g class="pk-trace-ink">
        ${strokes.map(d => `<path class="pk-trace-fill" d="${d}" style="stroke:${color}"/>`).join('')}
      </g>
      <g class="pk-trace-start"><circle r="9"/><circle class="pk-trace-start-ring" r="9"/></g>
      <path class="pk-trace-arrow" d="M0 -5 L8 0 L0 5 Z"/>
      <circle class="pk-trace-finger" r="7"/>
    </svg>`;
  const svg = host.querySelector('svg');
  const fills = [...svg.querySelectorAll('.pk-trace-fill')];
  const start = svg.querySelector('.pk-trace-start');
  const arrow = svg.querySelector('.pk-trace-arrow');
  const finger = svg.querySelector('.pk-trace-finger');

  // Điểm mẫu dọc theo từng nét.
  const samples = fills.map((p) => {
    const len = p.getTotalLength();
    const pts = [];
    for (let s = 0; s <= len; s += STEP) {
      const pt = p.getPointAtLength(s);
      pts.push({ x: pt.x, y: pt.y, s });
    }
    const end = p.getPointAtLength(len);
    pts.push({ x: end.x, y: end.y, s: len });
    p.style.strokeDasharray = `${len} ${len}`;
    p.style.strokeDashoffset = `${len}`;
    return { len, pts };
  });

  let stroke = 0;   // nét đang tô
  let idx = 0;      // điểm mẫu xa nhất đã tô tới trên nét hiện tại
  let drawing = false;
  let done = false;

  function placeStart() {
    if (stroke >= samples.length) { start.style.display = 'none'; arrow.style.display = 'none'; return; }
    const { pts } = samples[stroke];
    const p0 = pts[0];
    const p1 = pts[Math.min(6, pts.length - 1)];
    start.setAttribute('transform', `translate(${p0.x} ${p0.y})`);
    const ang = Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
    arrow.setAttribute('transform', `translate(${p0.x + Math.cos(ang * Math.PI / 180) * 16} ${p0.y + Math.sin(ang * Math.PI / 180) * 16}) rotate(${ang})`);
    start.style.display = '';
    arrow.style.display = '';
  }
  placeStart();

  function toSvg(e) {
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }

  function advance(p) {
    const { pts, len } = samples[stroke];
    let best = -1;
    for (let i = idx; i < Math.min(pts.length, idx + LOOKAHEAD); i++) {
      if (Math.hypot(pts[i].x - p.x, pts[i].y - p.y) <= REACH) best = i;
    }
    if (best < 0) return;
    idx = best;
    fills[stroke].style.strokeDashoffset = `${len - pts[idx].s}`;
    if (idx >= pts.length - 2) {
      fills[stroke].style.strokeDashoffset = '0';
      onStroke?.(stroke);
      stroke++;
      idx = 0;
      drawing = false;
      placeStart();
      if (stroke >= samples.length) {
        done = true;
        svg.classList.add('is-done');
        onDone?.();
      }
    }
  }

  function down(e) {
    if (done) return;
    const p = toSvg(e);
    const first = samples[stroke].pts[idx];
    // Phải bắt đầu gần chỗ đang tô dở (hoặc chấm bắt đầu của nét).
    if (Math.hypot(first.x - p.x, first.y - p.y) > REACH * 1.6) {
      onTouch?.(false);
      start.classList.remove('is-hint'); void start.getBoundingClientRect(); start.classList.add('is-hint');
      return;
    }
    drawing = true;
    onTouch?.(true);
    svg.setPointerCapture?.(e.pointerId);
    move(e);
  }

  function move(e) {
    const p = toSvg(e);
    finger.setAttribute('cx', p.x);
    finger.setAttribute('cy', p.y);
    finger.style.opacity = drawing ? '1' : '0';
    if (drawing && !done) advance(p);
  }

  function up() {
    drawing = false;
    finger.style.opacity = '0';
  }

  svg.addEventListener('pointerdown', down);
  svg.addEventListener('pointermove', move);
  svg.addEventListener('pointerup', up);
  svg.addEventListener('pointercancel', up);
  svg.addEventListener('lostpointercapture', up);

  return {
    destroy() { host.innerHTML = ''; },
  };
}
