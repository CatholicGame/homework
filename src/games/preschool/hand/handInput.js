/**
 * Chơi bằng bàn tay trước camera (Tiền tiểu học). Ba cách chơi, lưu theo máy:
 *   touch : chạm màn hình như cũ
 *   hand  : giao diện như cũ, camera nhỏ ở góc, bàn tay điều khiển con trỏ
 *   ar    : bé thấy chính mình phía sau (camera soi gương phủ cả màn hình)
 *
 * Bàn tay là một "ngón tay ảo" phát sự kiện pointer/click thật vào trang, nên mọi lượt
 * chơi có sẵn (chạm đếm, chọn đáp án, kéo số, tô số) chạy luôn, không phải sửa từng loại.
 * Con trỏ là chỗ chụm (trung điểm đầu ngón cái và đầu ngón trỏ), mọi thao tác đều bằng chụm / tách:
 *   di chuyển tay           → pointermove (vật dưới con trỏ sáng lên)
 *   chụm trên vật bấm được → pointerdown + click ngay (vd. đưa tay tới đồ vật, chụm lại: đếm)
 *   chụm trên vật kéo được (pointerdown gọi preventDefault / setPointerCapture: thẻ số, nét tô)
 *                           → giữ chụm và di chuyển để kéo / tô, tách ngón để thả (pointerup)
 *   chụm ở chỗ trống, giữ PINCH_HOLD_MS → vuốt: cuộn trang theo từng pixel (bản đồ trạm), vuốt ngang
 *                           lật trang (bảng chữ cái)
 */

import { say } from '../fx.js';

const MODE_KEY = 'pk-hand-mode';
const PID = 7031; // pointerId của bàn tay ảo
const LOST_MS = 400; // mất tay lâu hơn thì coi như mở tay (thả vật đang kéo)
// Vuốt: chụm ở chỗ trống rồi giữ PINCH_HOLD_MS (vòng quanh chỗ chụm đầy dần) mới cuộn, để chụm hụt
// ra ngoài vật không làm trôi trang; từ lúc đó trang cuộn theo từng pixel tay di chuyển.
const PINCH_HOLD_MS = 350;
const CLICKABLE = 'button, a[href], [role="button"], input, label, select';

export const HAND_MODES = [
  { id: 'touch', icon: '👆', label: 'Chạm màn hình', note: 'Bé chạm ngón tay vào màn hình.' },
  { id: 'hand', icon: '🖐️', label: 'Dùng bàn tay', note: 'Đưa tay tới hình, chụm ngón cái và ngón trỏ để chọn.' },
  { id: 'ar', icon: '🪞', label: 'Bàn tay, thấy mình', note: 'Như trên, bé thấy chính mình phía sau.' },
];

export function getHandMode() {
  try { return HAND_MODES.some(m => m.id === localStorage.getItem(MODE_KEY)) ? localStorage.getItem(MODE_KEY) : 'touch'; } catch { return 'touch'; }
}
function saveMode(id) {
  try { localStorage.setItem(MODE_KEY, id); } catch { /* storage unavailable */ }
}
const canUseCamera = () => !!navigator.mediaDevices?.getUserMedia;

// ════════════════════════════════════════════════════════════════════════
// Nút chọn cách chơi (thanh trên, cạnh nút âm thanh)
// ════════════════════════════════════════════════════════════════════════
const modeOf = (id) => HAND_MODES.find(m => m.id === id) || HAND_MODES[0];

export function handButton() {
  const m = modeOf(getHandMode());
  return `<button type="button" class="pk-round-btn pk-hand-btn" id="pk-hand" aria-label="Cách chơi: ${m.label}">${m.icon}<small>Cách chơi</small></button>`;
}

export function bindHandButton(root) {
  const btn = root.querySelector('#pk-hand');
  if (btn) btn.onclick = openMenu;
}

function refreshButtons() {
  const m = modeOf(getHandMode());
  document.querySelectorAll('#pk-hand').forEach(b => { b.firstChild.textContent = m.icon; b.setAttribute('aria-label', `Cách chơi: ${m.label}`); });
}

function openMenu() {
  document.querySelector('.pk-hand-sheet')?.remove();
  const cur = getHandMode();
  // Trang mở qua http (vd. địa chỉ IP trong mạng nhà) thì trình duyệt khoá camera.
  const noCam = !canUseCamera();
  const sheet = document.createElement('div');
  sheet.className = 'pk-hand-sheet';
  sheet.innerHTML = `
    <div class="pk-hand-menu" role="dialog" aria-label="Cách chơi">
      <h2>Bé chơi bằng cách nào?</h2>
      ${HAND_MODES.map(m => `
        <button type="button" class="pk-hand-opt${m.id === cur ? ' is-on' : ''}" data-mode="${m.id}"${noCam && m.id !== 'touch' ? ' disabled' : ''}>
          <span class="pk-hand-opt-icon">${m.icon}</span>
          <span class="pk-hand-opt-text"><b>${m.label}</b><small>${m.note}</small></span>
        </button>`).join('')}
      ${noCam ? `<p class="pk-hand-nocam">Trình duyệt này chưa cho dùng camera. Hãy mở trang bằng địa chỉ https:// (hoặc localhost trên máy tính).</p>` : ''}
      <p class="pk-hand-privacy">Hình camera chỉ xử lý trên máy này, không gửi đi đâu.</p>
    </div>`;
  document.body.appendChild(sheet);
  sheet.addEventListener('click', (e) => {
    const opt = e.target.closest('.pk-hand-opt');
    if (!opt && e.target.closest('.pk-hand-menu')) return;
    sheet.remove();
    if (opt) setHandMode(opt.dataset.mode, { greet: true });
  });
}

export function setHandMode(id, { greet = false } = {}) {
  saveMode(id);
  refreshButtons();
  if (id === 'touch') { stopHand(); return; }
  startHand(id, { greet });
}

/** Mở một sách Tiền tiểu học: bật lại cách chơi đã chọn lần trước. */
export function resumeHand() {
  const id = getHandMode();
  if (id === 'touch') return;
  if (canUseCamera()) startHand(id);
  else { saveMode('touch'); refreshButtons(); }
}

// ════════════════════════════════════════════════════════════════════════
// Camera, con trỏ và bàn tay ảo
// ════════════════════════════════════════════════════════════════════════
let S = null; // trạng thái khi đang bật

function startHand(mode, { greet = false } = {}) {
  if (S) {
    S.mode = mode;
    applyMode();
    if (greet) say(GREETING);
    return;
  }
  const video = document.createElement('video');
  video.className = 'pk-hand-video';
  video.setAttribute('playsinline', '');
  video.muted = true;
  const veil = document.createElement('div');
  veil.className = 'pk-hand-veil';
  const cursor = document.createElement('div');
  cursor.className = 'pk-hand-cursor';
  cursor.hidden = true;
  cursor.innerHTML = '<span class="pk-hand-ring"></span><span class="pk-hand-dot"></span>';
  const skel = document.createElement('canvas');
  skel.className = 'pk-hand-skel';
  const status = document.createElement('div');
  status.className = 'pk-hand-status';
  status.setAttribute('aria-live', 'polite');
  document.body.append(video, veil, skel, cursor, status);

  S = {
    mode, video, veil, skel, cursor, status,
    pos: null, seen: false, lostAt: 0, everSeen: false,
    pressed: null, // { kind: 'held' | 'drag' | 'wait' | 'swipe', target, at, last, t, scroller }
    capture: null, hover: null, stop: null, lastPkCheck: 0,
  };
  applyMode();
  patchPointerCapture();
  setStatus('Đang mở camera...');
  if (greet) say(GREETING);

  const mine = S;
  // Bản dev: localStorage 'pk-hand-fake' = '1' thì không mở camera, khung tay do
  // window.__pkHand.frame({ seen, pen, pinch, lm?, penRaw? }) đưa vào (thử tự động bàn tay ảo).
  if (import.meta.env.DEV && localStorage.getItem('pk-hand-fake') === '1') {
    window.__pkHand = { frame: (f) => { if (S === mine) onFrame(f); } };
    setStatus('Bé giơ bàn tay lên trước camera!');
    return;
  }
  import('./tracker.js')
    .then(({ startTracking }) => startTracking(video, {
      onFrame: (f) => { if (S === mine) onFrame(f); },
      onStatus: (s) => {
        if (S !== mine) return;
        if (s === 'model') setStatus('Đang chuẩn bị...');
        if (s === 'ready') setStatus('Bé giơ bàn tay lên trước camera!');
      },
    }))
    .then((stop) => { if (S === mine) mine.stop = stop; else stop(); })
    .catch((err) => {
      if (S !== mine) return;
      console.warn('[hand] không bật được:', err);
      const denied = err?.name === 'NotAllowedError' || err?.name === 'SecurityError';
      stopHand();
      saveMode('touch');
      refreshButtons();
      flash(denied ? 'Chưa được phép dùng camera. Bé chơi bằng cách chạm màn hình.' : 'Không mở được camera. Bé chơi bằng cách chạm màn hình.');
    });
}

const GREETING = 'Bé đưa tay tới hình. Chụm ngón cái và ngón trỏ lại để chọn!';

export function stopHand() {
  if (!S) return;
  if (S.pressed) release();
  setHover(null);
  S.stop?.();
  S.video.remove(); S.veil.remove(); S.skel.remove(); S.cursor.remove(); S.status.remove();
  document.body.classList.remove('pk-hand-on', 'pk-ar', 'pk-hand-near');
  S = null;
}

function applyMode() {
  document.body.classList.add('pk-hand-on');
  document.body.classList.toggle('pk-ar', S.mode === 'ar');
}

function setStatus(text) {
  S.status.textContent = text || '';
  S.status.hidden = !text;
}

// Thông báo ngắn khi đã tắt camera (không còn S).
function flash(text) {
  const el = document.createElement('div');
  el.className = 'pk-hand-status is-flash';
  el.textContent = text;
  document.body.appendChild(el);
  say(text);
  setTimeout(() => el.remove(), 5000);
}

// ── Toạ độ camera → màn hình ─────────────────────────────────────────────
const clamp01 = (v) => Math.min(1, Math.max(0, v));
// `clamp`: con trỏ luôn trong màn hình; khung xương thì không kẹp (để giữ đúng hình bàn tay).
function toViewport(x, y, clamp = true) {
  const W = innerWidth, H = innerHeight;
  const vw = S.video.videoWidth, vh = S.video.videoHeight;
  const c = clamp ? clamp01 : (v) => v;
  if (S.mode === 'ar' && vw && vh) {
    // Camera phủ cả màn hình (object-fit: cover): con trỏ nằm đúng trên bàn tay bé thấy.
    const k = Math.max(W / vw, H / vh);
    const dw = vw * k, dh = vh * k;
    return { x: c(((W - dw) / 2 + x * dw) / W) * W, y: c(((H - dh) / 2 + y * dh) / H) * H };
  }
  // Không thấy mình: vùng giữa khung camera trải ra cả màn hình, bé không phải với tay tới mép.
  return { x: c((x - 0.12) / 0.76) * W, y: c((y - 0.1) / 0.65) * H };
}

// ── Mỗi lần nhận diện ───────────────────────────────────────────────────
function onFrame(f) {
  const now = performance.now();
  // Rời Tiền tiểu học (về trang chủ, đổi trang) thì tắt camera.
  if (now - S.lastPkCheck > 700) {
    S.lastPkCheck = now;
    if (!document.querySelector('.pk')) { stopHand(); return; }
  }

  if (!f.seen) {
    if (S.seen) { S.seen = false; S.lostAt = now; }
    if (now - S.lostAt > LOST_MS) {
      if (S.pressed) release();
      setHover(null);
      S.cursor.hidden = true;
      clearSkeleton();
      document.body.classList.remove('pk-hand-near');
      S.pos = null;
      setStatus('Bé giơ bàn tay lên trước camera!');
    }
    return;
  }

  if (!S.everSeen) { S.everSeen = true; showGuide(); } else if (!S.guideOn) setStatus('');
  S.seen = true;
  // Trang có khung tô chữ / tô số: con trỏ nhỏ như ngòi bút, nhắc cách tô.
  const tipMode = !!document.querySelector('.pk-trace-svg');
  if (tipMode !== S.tipMode) {
    S.tipMode = tipMode;
    S.cursor.classList.toggle('is-tip', tipMode);
    if (tipMode) showTipGuide();
  }
  S.pos = toViewport(f.pen.x, f.pen.y);

  if (f.pinch && !S.pressed) press(now);
  else if (!f.pinch && S.pressed) release();
  // Chụm ở chỗ trống giữ đủ lâu: bắt đầu vuốt.
  const pr = S.pressed;
  if (pr?.kind === 'wait' && now - pr.t >= PINCH_HOLD_MS) { pr.kind = 'swipe'; pr.scroller = scrollerOf(pr.target); }
  move();
  // Giai đoạn chụm, để vẽ nét nối hai đầu ngón: xa | gần | giữ (kèm tiến độ) | đang vuốt | đang chọn / kéo / tô.
  S.pinchPhase = !pr ? (f.pinchNear ? 'near' : 'open') : pr.kind === 'wait' ? 'hold' : pr.kind === 'swipe' ? 'swipe' : 'press';
  S.pinchHold = pr?.kind === 'wait' ? Math.min(1, (now - pr.t) / PINCH_HOLD_MS) : 0;
  drawCursor();
  drawSkeleton(f);
}

// Lần đầu thấy tay: hiện cách chơi bằng hình (🖐️ → 🤏) vài giây.
function showGuide() {
  S.guideOn = true;
  S.status.innerHTML = '<span class="pk-hand-guide"><i>🖐️</i> đưa tới hình <b>➜</b> <i>🤏</i> chụm ngón để chọn</span><span class="pk-hand-guide">chụm giữ ở chỗ trống để kéo trang</span>';
  S.status.hidden = false;
  const mine = S;
  clearTimeout(mine.guideTimer);
  mine.guideTimer = setTimeout(() => { if (S === mine) { mine.guideOn = false; if (mine.seen) setStatus(''); } }, 6000);
}

function showTipGuide() {
  S.guideOn = true;
  S.status.innerHTML = '<span class="pk-hand-guide"><i>🤏</i> chụm ngón cái và ngón trỏ để tô <b>·</b> tách ra để dừng</span>';
  S.status.hidden = false;
  const mine = S;
  clearTimeout(mine.guideTimer);
  mine.guideTimer = setTimeout(() => { if (S === mine) { mine.guideOn = false; if (mine.seen) setStatus(''); } }, 6000);
}

function drawCursor() {
  const { cursor, pos } = S;
  cursor.hidden = false;
  cursor.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
  cursor.classList.toggle('is-pinch', S.pinchPhase === 'press');
  cursor.classList.toggle('is-swipe', S.pinchPhase === 'swipe');
  // Biểu tượng chụm (vẽ trên khung xương) đang hiện ở chỗ chụm: nó thay cho vòng con trỏ.
  cursor.classList.toggle('is-icon', S.pinchPhase !== 'open' && !(S.tipMode && S.pinchPhase === 'press'));
  cursor.classList.toggle('is-over', !!S.hover);
  // Tay tới gần ô camera nhỏ (và dòng nhắc trên nó): làm mờ để thấy nút bị che phía sau.
  if (S.mode !== 'ar') {
    const r = S.video.getBoundingClientRect();
    const near = pos.x < r.right + 60 && pos.y > r.top - 120;
    document.body.classList.toggle('pk-hand-near', near);
  }
}

// ── Khung xương bàn tay ──────────────────────────────────────────────────
// Các đoạn nối 21 điểm MediaPipe (HandLandmarker.HAND_CONNECTIONS).
const BONES = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]];
const PALM = [0, 1, 2, 5, 9, 13, 17];

function fitCanvas() {
  const { skel } = S;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const w = Math.round(innerWidth * dpr), h = Math.round(innerHeight * dpr);
  if (skel.width !== w || skel.height !== h) { skel.width = w; skel.height = h; }
  const g = skel.getContext('2d');
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  return g;
}

function clearSkeleton() {
  const g = S.skel.getContext('2d');
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.clearRect(0, 0, S.skel.width, S.skel.height);
}

// Vẽ khung xương dời theo con trỏ: chỗ chụm (giữa đầu ngón cái và ngón trỏ) của khung trùng đúng tâm
// con trỏ (con trỏ đã lọc rung, khung xương thì không, nên dời cả khung theo độ lệch).
function drawSkeleton(f) {
  const g = fitCanvas();
  g.clearRect(0, 0, innerWidth, innerHeight);
  if (!f.lm) return;
  const c = toViewport(f.penRaw.x, f.penRaw.y, false);
  const dx = S.pos.x - c.x, dy = S.pos.y - c.y;
  const pts = f.lm.map(q => { const v = toViewport(q.x, q.y, false); return [v.x + dx, v.y + dy]; });
  const phase = S.pinchPhase;
  const accent = phase === 'swipe' || phase === 'hold' ? '#A855F7' : phase === 'press' ? '#F97316' : S.hover ? '#22C55E' : '#22D3EE';
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  PALM.forEach((i, k) => (k ? g.lineTo(...pts[i]) : g.moveTo(...pts[i])));
  g.closePath();
  g.fillStyle = 'rgba(255, 255, 255, 0.22)';
  g.fill();
  const bones = (color, width) => {
    g.strokeStyle = color;
    g.lineWidth = width;
    g.beginPath();
    for (const [a, b] of BONES) { g.moveTo(...pts[a]); g.lineTo(...pts[b]); }
    g.stroke();
  };
  bones('rgba(0, 0, 0, 0.45)', 12);
  bones('#FFFFFF', 6);
  drawPinchLine(g, pts[4], pts[8]);
  for (const [x, y] of pts) {
    g.beginPath();
    g.arc(x, y, 5.5, 0, Math.PI * 2);
    g.fillStyle = accent;
    g.fill();
    g.lineWidth = 2.5;
    g.strokeStyle = 'rgba(0, 0, 0, 0.55)';
    g.stroke();
  }
  drawPinchMark(g, pts[4], pts[8]); // trên cùng: không bị chấm khớp đầu ngón che
}

// Nét nối đầu ngón cái ↔ đầu ngón trỏ: cho bé và người lớn thấy đang ở bước nào của thao tác chụm.
//   xa: nét trắng đứt mảnh · gần: nét vàng đứt + biểu tượng chụm mờ (còn khe) · đang giữ: nét tím + chụm + vòng đầy dần
//   đang vuốt: nét tím đậm + chụm trên đĩa tím · đang chọn / kéo / tô: nét cam đậm + chụm trên đĩa cam
//   (trang tô chữ: chấm cam nhỏ, để không che nét đang tô).
const LINK = {
  open: { color: 'rgba(255, 255, 255, 0.85)', width: 3, dash: [6, 7] },
  near: { color: '#FACC15', width: 5, dash: [8, 6] },
  hold: { color: '#A855F7', width: 7, dash: [] },
  swipe: { color: '#7E22CE', width: 9, dash: [] },
  press: { color: '#EA580C', width: 9, dash: [] },
};
function drawPinchLine(g, a, b) {
  const st = LINK[S.pinchPhase || 'open'];
  g.save();
  g.setLineDash(st.dash);
  g.lineWidth = st.width + 4;
  g.strokeStyle = 'rgba(0, 0, 0, 0.35)';
  g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.stroke();
  g.lineWidth = st.width;
  g.strokeStyle = st.color;
  g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.stroke();
  g.restore();
}

function drawPinchMark(g, a, b) {
  const phase = S.pinchPhase || 'open';
  const st = LINK[phase];
  const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  g.save();
  if (phase === 'press' && S.tipMode) {
    g.fillStyle = st.color;
    g.beginPath(); g.arc(...mid, 9, 0, Math.PI * 2); g.fill();
    g.lineWidth = 3;
    g.strokeStyle = '#fff';
    g.stroke();
  } else if (phase !== 'open') {
    // Biểu tượng chụm ở điểm chụm: mờ khi sắp chạm, rõ khi đã chụm (đĩa cam: đang chọn / kéo,
    // đĩa tím: đang vuốt). Đang giữ ở chỗ trống: vòng tím quanh biểu tượng đầy dần tới lúc vuốt.
    const R = 22;
    const disc = phase === 'swipe' ? '#7E22CE' : phase === 'press' ? '#EA580C' : '#FFFFFF';
    g.globalAlpha = phase === 'near' ? 0.6 : 1;
    g.fillStyle = disc;
    g.beginPath(); g.arc(...mid, R, 0, Math.PI * 2); g.fill();
    g.lineWidth = 3;
    g.strokeStyle = disc === '#FFFFFF' ? 'rgba(0, 0, 0, 0.35)' : '#FFFFFF';
    g.stroke();
    if (phase === 'hold') {
      g.lineWidth = 6;
      g.strokeStyle = '#A855F7';
      g.beginPath(); g.arc(...mid, R + 4, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * S.pinchHold); g.stroke();
    }
    pinchIcon(g, mid[0], mid[1], phase !== 'near', phase === 'hold' ? '#A855F7' : '#FDE047');
    g.globalAlpha = 1;
  }
  g.restore();
}

// Biểu tượng chụm vẽ bằng nét (emoji 🤏 nhỏ trông như nắm tay, iPad cũ lại không có): ngón trỏ
// từ trên, ngón cái từ dưới, gặp nhau ở đầu ngón; `touch`: hai đầu ngón chạm + tia sáng.
function pinchIcon(g, cx, cy, touch, spark) {
  const gap = touch ? 1.5 : 6;
  const finger = (sign) => {
    g.beginPath();
    g.moveTo(cx - 12, cy + sign * 14);
    g.quadraticCurveTo(cx - 3, cy + sign * 13, cx + 5, cy + sign * gap);
    g.lineWidth = 10; g.strokeStyle = '#7C2D12'; g.stroke();
    g.lineWidth = 6.5; g.strokeStyle = '#FDBA74'; g.stroke();
  };
  g.lineCap = 'round';
  finger(-1); // ngón trỏ
  finger(1); // ngón cái
  if (touch) {
    g.lineWidth = 2.5;
    g.strokeStyle = spark;
    for (const a of [-0.6, 0, 0.6]) {
      g.beginPath();
      g.moveTo(cx + 10 + Math.cos(a) * 1, cy + Math.sin(a) * 6);
      g.lineTo(cx + 10 + Math.cos(a) * 7, cy + Math.sin(a) * 12);
      g.stroke();
    }
  }
}

// ── Sự kiện tổng hợp ────────────────────────────────────────────────────
function hitAt(p) {
  return document.elementFromPoint(p.x, p.y);
}

function fire(type, el, p, buttons) {
  const ev = new PointerEvent(type, {
    bubbles: true, cancelable: true, composed: true, view: window,
    pointerId: PID, pointerType: 'touch', isPrimary: true,
    clientX: p.x, clientY: p.y, screenX: p.x, screenY: p.y,
    button: type === 'pointermove' ? -1 : 0, buttons, pressure: buttons ? 0.5 : 0, width: 24, height: 24,
  });
  el.dispatchEvent(ev);
  return ev;
}

function click(el, p) {
  if (!el?.isConnected || el.closest(':disabled')) return;
  el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true, view: window, clientX: p.x, clientY: p.y, detail: 1 }));
}

// Chụm: vật kéo được thì nhặt ('drag'), vật bấm được thì bấm ngay ('held'), chỗ trống thì chờ giữ đủ
// lâu để vuốt ('wait' → 'swipe'; pointerdown đã gửi cho phần tử đó, vd. lưới chữ cái nghe vuốt ngang).
function press(now) {
  const p = S.pos;
  const target = hitAt(p);
  if (!target) return;
  S.capture = null;
  const down = fire('pointerdown', target, p, 1);
  const clickable = target.closest(CLICKABLE);
  let kind;
  if (S.capture || down.defaultPrevented) kind = 'drag';
  else if (clickable) { kind = 'held'; click(clickable, p); }
  else kind = 'wait';
  S.pressed = { kind, target, at: p, last: p, t: now, scroller: null };
  S.cursor.classList.remove('is-press'); void S.cursor.offsetWidth; S.cursor.classList.add('is-press');
  setHover(kind === 'held' ? S.hover : null);
}

function move() {
  const p = S.pos;
  const pr = S.pressed;
  if (pr?.kind === 'swipe' && pr.scroller) {
    pr.scroller.scrollTop -= p.y - pr.last.y;
    pr.scroller.scrollLeft -= p.x - pr.last.x;
  }
  const swiping = pr?.kind === 'wait' || pr?.kind === 'swipe';
  const el = swiping ? pr.target : S.capture || hitAt(p);
  if (el?.isConnected) fire('pointermove', el, p, pr ? 1 : 0);
  if (pr) pr.last = p;
  if (!pr || pr.kind === 'held') setHover(hitAt(p)?.closest(CLICKABLE) || null);
}

function release() {
  const pr = S.pressed;
  S.pressed = null;
  const p = S.pos || pr.last;
  const swiping = pr.kind === 'wait' || pr.kind === 'swipe';
  const el = swiping ? pr.target : S.capture || hitAt(p) || pr.target;
  if (el?.isConnected) fire('pointerup', el, p, 0);
  if (S.capture) {
    S.capture.dispatchEvent(new PointerEvent('lostpointercapture', { bubbles: true, pointerId: PID, pointerType: 'touch' }));
    S.capture = null;
  }
  // Chụm rồi tách tại chỗ trên vật kéo được (thẻ số), hoặc trên phần tử không phải nút mà chưa kịp
  // thành vuốt (vd. ô trống trên toa tàu nghe 'click'): như một lần chạm.
  if ((pr.kind === 'drag' || pr.kind === 'wait') && Math.hypot(p.x - pr.at.x, p.y - pr.at.y) < 16) click(pr.target, pr.at);
}

function setHover(el) {
  if (!S || S.hover === el) return;
  S.hover?.classList.remove('pk-hand-hover');
  S.hover = el;
  el?.classList.add('pk-hand-hover');
}

function scrollerOf(el) {
  for (let n = el; n && n !== document.body; n = n.parentElement) {
    const oy = getComputedStyle(n).overflowY;
    if ((oy === 'auto' || oy === 'scroll') && n.scrollHeight > n.clientHeight + 2) return n;
  }
  return document.getElementById('app') || document.scrollingElement;
}

// Sự kiện tự tạo không có "con trỏ thật" nên setPointerCapture của trình duyệt báo lỗi.
// Với bàn tay ảo thì tự nhớ phần tử giữ con trỏ, gửi tiếp move/up cho nó (như trình duyệt làm).
let patched = false;
function patchPointerCapture() {
  if (patched) return;
  patched = true;
  const proto = Element.prototype;
  const set = proto.setPointerCapture, rel = proto.releasePointerCapture, has = proto.hasPointerCapture;
  proto.setPointerCapture = function (id) { if (id === PID) { if (S) S.capture = this; return; } return set.call(this, id); };
  proto.releasePointerCapture = function (id) { if (id === PID) { if (S?.capture === this) S.capture = null; return; } return rel.call(this, id); };
  proto.hasPointerCapture = function (id) { return id === PID ? S?.capture === this : has.call(this, id); };
}
