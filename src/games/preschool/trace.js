/**
 * Tô số bằng ngón tay: bé kéo theo nét chấm, nét màu hiện dần phía sau ngón tay.
 * Mỗi chữ số gồm 1–2 nét (đường SVG trong khung 100×140), tô theo đúng thứ tự
 * và chiều viết. Chỗ đặt bút là chiếc ô tô (chạy theo đầu nét, nhả khói) hoặc
 * chấm xanh nhấp nháy như cũ — bé chọn một trong hai (getPen / setPen).
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
const PUFF_GAP = 70;    // ms tối thiểu giữa hai cụm khói khi đang chạy
const IDLE_PUFF = 900;  // ms giữa hai cụm khói khi xe đứng chờ (máy vẫn nổ)

// Kiểu chỗ đặt bút: 'car' (ô tô) hoặc 'dot' (chấm xanh), nhớ trên máy.
const PEN_KEY = 'pk-trace-pen';
export const PENS = ['car', 'dot'];
export function getPen() {
  try { return localStorage.getItem(PEN_KEY) === 'dot' ? 'dot' : 'car'; } catch { return 'car'; }
}
export function setPen(pen) {
  try { localStorage.setItem(PEN_KEY, pen); } catch { /* storage unavailable */ }
}

// Ô tô nhìn từ trên xuống, đầu xe hướng về +x, tâm ở gốc toạ độ; rộng đúng 16
// (kể cả bánh, gương) = bề rộng nét số, để xe nằm vừa trong nét.
const CAR_W = 16;
export const CAR = `
  <g class="pk-car">
    ${[-9, 8.5].flatMap(x => [-7.8, 4.8].map(y => `<rect class="pk-car-wheel" x="${x - 3.2}" y="${y}" width="6.4" height="3" rx="1.2"/>`)).join('')}
    <rect class="pk-car-mirror" x="2" y="-8" width="2.4" height="2.4" rx="0.9"/>
    <rect class="pk-car-mirror" x="2" y="5.6" width="2.4" height="2.4" rx="0.9"/>
    <rect class="pk-car-body" x="-15" y="-6.2" width="30" height="12.4" rx="5"/>
    <path class="pk-car-glass" d="M3.4 -4.6 Q8.4 -4 9.2 0 Q8.4 4 3.4 4.6 Z"/>
    <path class="pk-car-glass" d="M-8.6 -4.2 Q-11.4 -3.4 -11.6 0 Q-11.4 3.4 -8.6 4.2 Z"/>
    <rect class="pk-car-roof" x="-8.2" y="-4.4" width="11.2" height="8.8" rx="2.4"/>
    <circle class="pk-car-light" cx="13.8" cy="-3.8" r="1.2"/>
    <circle class="pk-car-light" cx="13.8" cy="3.8" r="1.2"/>
    <rect class="pk-car-tail" x="-15.2" y="-4.8" width="1.5" height="2.2" rx="0.7"/>
    <rect class="pk-car-tail" x="-15.2" y="2.6" width="1.5" height="2.2" rx="0.7"/>
  </g>`;

/**
 * Gắn khung tô số vào `host`. `n` là một số (1–10) hoặc nét dựng sẵn
 * { width, strokes, guides? } (chữ cái, letters.js); `guides` = các dòng kẻ ngang (toạ độ y). Gọi `onStroke(i)` khi xong một nét, `onDone()` khi xong cả số.
 * `pen`: 'car' | 'dot' (mặc định: lựa chọn đã lưu). Trả về { destroy, setPen }.
 */
export function mountTracer(host, n, { color = '#2563EB', pen = getPen(), onStroke, onDone, onTouch } = {}) {
  const { width, strokes, guides = [] } = typeof n === 'object' ? n : numberStrokes(n);
  // Bán kính chấm xanh đặt thẳng vào SVG: Safari/iPad không đọc thuộc tính CSS `r`.
  const dotR = guides.length ? 7 : 8;
  host.innerHTML = `
    <svg class="pk-trace-svg${guides.length ? ' has-guides' : ''} pen-${pen}" viewBox="-6 0 ${width + 12} 142" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      ${guides.map((y, i) => `<line class="pk-trace-line${i === 2 ? ' is-base' : ''}" x1="-600" x2="${width + 600}" y1="${y}" y2="${y}"/>`).join('')}
      <g class="pk-trace-guides">
        ${strokes.map(d => `<path class="pk-trace-track" d="${d}"/>`).join('')}
        ${strokes.map(d => `<path class="pk-trace-dash" d="${d}"/>`).join('')}
      </g>
      <g class="pk-trace-ink">
        ${strokes.map(d => `<path class="pk-trace-fill" d="${d}" style="stroke:${color}"/>`).join('')}
      </g>
      <g class="pk-trace-smoke"></g>
      <!-- Mũi tên chiều viết nằm dưới chỗ đặt bút: chấm xanh / ô tô luôn thấy rõ trên cùng. -->
      <g class="pk-trace-arrow">
        <path class="pk-trace-arrow-case"/><path class="pk-trace-arrow-line"/>
        <path class="pk-trace-arrow-head" d="M-5 -7 L8 0 L-5 7 Z"/>
      </g>
      <circle class="pk-trace-finger" r="7"/>
      <g class="pk-trace-start">
        <!-- Mũi tên nhỏ nhún tới ngay trước chấm / đầu xe: hướng phải tô tiếp. SMIL (không phải CSS) để chạy cả trên iPad. -->
        <g class="pk-trace-dir"><g>
          <animateTransform attributeName="transform" type="translate" values="0 0;4 0;0 0" dur="0.7s" repeatCount="indefinite"/>
          <path d="M-2 -7 L8 0 L-2 7 Z"/>
        </g></g>
        <g class="pk-trace-dot">
          <circle class="pk-trace-start-ring" r="${dotR}">
            <animate attributeName="r" values="${dotR};${dotR * 2.6}" dur="1.2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.9;0" dur="1.2s" repeatCount="indefinite"/>
          </circle>
          <circle class="pk-trace-dot-core" r="${dotR}"/>
        </g>
        <g class="pk-trace-car">${CAR}</g>
      </g>
    </svg>`;
  const svg = host.querySelector('svg');
  const fills = [...svg.querySelectorAll('.pk-trace-fill')];
  const start = svg.querySelector('.pk-trace-start');
  const arrow = svg.querySelector('.pk-trace-arrow');
  const smoke = svg.querySelector('.pk-trace-smoke');
  const car = svg.querySelector('.pk-trace-car');
  const dir = svg.querySelector('.pk-trace-dir');
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
  let carAt = null;  // { x, y, dx, dy }: vị trí và hướng chạy (vector đơn vị) của xe
  let lastPuff = 0;
  // Dài theo nét: số to hơn chữ cái một chút; rộng: bằng bề rộng nét (16 số, 13 chữ cái có dòng kẻ).
  const carScale = guides.length ? 0.7 : 0.8;
  const carWide = (guides.length ? 13 : 16) / CAR_W;

  const unit = (a, b) => {
    const dx = b.x - a.x, dy = b.y - a.y, n = Math.hypot(dx, dy);
    return n > 0.01 ? { dx: dx / n, dy: dy / n } : null;
  };
  const deg = ({ dx, dy }) => (Math.atan2(dy, dx) * 180 / Math.PI).toFixed(1);
  let dirAt = { dx: 1, dy: 0 };
  // Mũi tên nhỏ đứng ngay trước mũi chấm xanh / đầu xe.
  function placeDir() {
    const ahead = pen === 'car' ? 15 * carScale + 3 : dotR + 4;
    dir.setAttribute('transform', `rotate(${deg(dirAt)}) translate(${ahead.toFixed(1)} 0)`);
  }
  // Đặt chỗ đặt bút tại điểm mẫu i của nét hiện tại. Xe quay theo hướng vừa đi
  // (xe nhìn từ trên xuống nên không cần lật); mũi tên nhỏ chỉ hướng sắp đi.
  function placeCursor(pts, i) {
    const { x, y } = pts[i];
    const last = pts.length - 1;
    const back = unit(pts[Math.max(0, i - 3)], pts[Math.min(last, i + 1)]) || carAt || { dx: 1, dy: 0 };
    dirAt = unit(pts[i], pts[Math.min(last, i + 6)]) || back;
    carAt = { x, y, ...back };
    start.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
    car.setAttribute('transform', `rotate(${deg(back)}) scale(${carScale} ${carWide})`);
    placeDir();
  }

  // Một cụm khói sau đuôi xe, tự bay lên, phình ra rồi tan.
  function puff(now = performance.now()) {
    if (pen !== 'car' || !carAt || now - lastPuff < PUFF_GAP) return;
    lastPuff = now;
    const { x, y, dx, dy } = carAt;
    const c = document.createElementNS(SVG_NS, 'circle');
    c.setAttribute('class', 'pk-trace-puff');
    c.setAttribute('cx', (x - dx * 16 * carScale + (Math.random() - 0.5) * 3).toFixed(1));
    c.setAttribute('cy', (y - dy * 16 * carScale + (Math.random() - 0.5) * 3).toFixed(1));
    c.setAttribute('r', (2.2 + Math.random() * 1.4).toFixed(1));
    c.addEventListener('animationend', () => c.remove());
    smoke.appendChild(c);
  }
  const idleTimer = setInterval(() => {
    if (!svg.isConnected) { clearInterval(idleTimer); return; }
    if (!drawing && !done) { lastPuff = 0; puff(); }
  }, IDLE_PUFF);

  // Mũi tên chỉ chiều viết: thân chạy dọc theo đầu nét (ngay sau chấm xanh), đầu nhọn ở cuối.
  const arrowLines = [...arrow.querySelectorAll('.pk-trace-arrow-case, .pk-trace-arrow-line')];
  const arrowHead = arrow.querySelector('.pk-trace-arrow-head');
  function placeStart() {
    if (stroke >= samples.length) { start.style.display = 'none'; arrow.style.display = 'none'; return; }
    const { pts, len } = samples[stroke];
    const p0 = pts[0];
    placeCursor(pts, 0);
    start.style.display = '';
    // Nét quá ngắn (dấu chấm): chỉ cần chạm, không cần mũi tên.
    dir.style.display = len < 12 ? 'none' : '';
    if (len < 12) { arrow.style.display = 'none'; return; }
    // Bắt đầu sau mũi tên nhỏ nhún trước chấm xanh / đầu xe, để hai mũi tên không chồng lên nhau.
    const from = Math.min(28, len * 0.3), to = Math.min(from + 26, len * 0.95);
    const run = pts.filter(p => p.s >= from && p.s <= to);
    const a = run[run.length - 2] || pts[0], b = run[run.length - 1] || pts[pts.length - 1];
    const ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
    const d = run.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
    arrowLines.forEach(l => l.setAttribute('d', d));
    arrowHead.setAttribute('transform', `translate(${b.x.toFixed(1)} ${b.y.toFixed(1)}) rotate(${ang.toFixed(1)})`);
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
    // Điểm trên nét gần ngón tay nhất (chỉ tiến, không lùi): nét màu dừng đúng dưới ngón tay,
    // không vọt lên trước.
    let best = -1, bestD = REACH;
    for (let i = idx; i < Math.min(pts.length, idx + LOOKAHEAD); i++) {
      const d = Math.hypot(pts[i].x - p.x, pts[i].y - p.y);
      if (d <= bestD) { best = i; bestD = d; }
    }
    if (best <= idx) return;
    idx = best;
    fills[stroke].style.strokeDashoffset = `${len - pts[idx].s}`;
    // Xe chạy theo đầu nét: là chỗ ngón tay đang ở, và là chỗ đặt tay lại nếu nhấc lên.
    placeCursor(pts, idx);
    puff();
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
    svg.classList.add('is-driving');
    onTouch?.(true);
    svg.setPointerCapture?.(e.pointerId);
    move(e);
  }

  function move(e) {
    const p = toSvg(e);
    // Chấm xanh: vòng cam theo ngón tay như cũ (ô tô thì chính xe đã đi theo ngón tay).
    finger.setAttribute('cx', p.x);
    finger.setAttribute('cy', p.y);
    finger.style.opacity = drawing ? '1' : '0';
    if (drawing && !done) advance(p);
  }

  function up() {
    drawing = false;
    svg.classList.remove('is-driving');
    finger.style.opacity = '0';
  }

  svg.addEventListener('pointerdown', down);
  svg.addEventListener('pointermove', move);
  svg.addEventListener('pointerup', up);
  svg.addEventListener('pointercancel', up);
  svg.addEventListener('lostpointercapture', up);

  return {
    destroy() { clearInterval(idleTimer); host.innerHTML = ''; },
    setPen(next) {
      svg.classList.replace(`pen-${pen}`, `pen-${next}`);
      pen = next;
      placeDir();
      if (next !== 'car') smoke.replaceChildren();
    },
  };
}
