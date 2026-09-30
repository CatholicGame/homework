/**
 * Theo dõi bàn tay qua camera (MediaPipe HandLandmarker), cách làm theo telerehabplay
 * (HandTrackingView). Mỗi lần nhận diện (tối đa 20 lần/giây) báo về:
 *   { seen, lm, pen, penRaw, pinch, pinchNear } — toạ độ 0..1, đã lật gương như soi gương.
 *   lm: 21 điểm khung xương, pen / penRaw: trung điểm đầu ngón cái và đầu ngón trỏ (chỗ chụm) đã lọc
 *   rung / chưa lọc, pinch: hai đầu ngón đang chụm (chọn, kéo, tô, vuốt), pinchNear: đang lại gần.
 * Chỉ tải khi bật chế độ bàn tay (handInput.js import động), không làm nặng bản chạm thường.
 */

import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import loaderSimd from '@mediapipe/tasks-vision/vision_wasm_internal.js?url';
import binarySimd from '@mediapipe/tasks-vision/vision_wasm_internal.wasm?url';
import loaderNoSimd from '@mediapipe/tasks-vision/vision_wasm_nosimd_internal.js?url';
import binaryNoSimd from '@mediapipe/tasks-vision/vision_wasm_nosimd_internal.wasm?url';

const MODEL = 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';
const INFER_MS = 50;

let landmarkerPromise = null;

function getLandmarker() {
  landmarkerPromise ||= (async () => {
    const simd = await FilesetResolver.isSimdSupported();
    const fileset = simd
      ? { wasmLoaderPath: loaderSimd, wasmBinaryPath: binarySimd }
      : { wasmLoaderPath: loaderNoSimd, wasmBinaryPath: binaryNoSimd };
    const make = (delegate) => HandLandmarker.createFromOptions(fileset, {
      baseOptions: { modelAssetPath: MODEL, delegate },
      runningMode: 'VIDEO',
      numHands: 2,
      minHandDetectionConfidence: 0.4,
      minHandPresenceConfidence: 0.4,
      minTrackingConfidence: 0.4,
    });
    // Máy không có WebGL (một số iPad cũ, trình duyệt tắt GPU) thì chạy CPU.
    try { return await make('GPU'); } catch { return make('CPU'); }
  })().catch((err) => { landmarkerPromise = null; throw err; });
  return landmarkerPromise;
}

/** Tải sẵn model (gọi khi vừa bật chế độ bàn tay, trong lúc chờ quyền camera). */
export const preload = () => getLandmarker().catch(() => {});

// Độ gập ngón trỏ (độ): góc giữa đốt gốc (gốc ngón → khớp giữa) và đốt đầu (khớp đầu → đầu ngón),
// tính trong 3D (x, y, z cùng thang điểm ảnh). Duỗi ~0–20°, cong tự nhiên ~40–70°, nắm ~150–180°.
function indexBend(lm, aspect) {
  const v = (a, b) => [(lm[b].x - lm[a].x) * aspect, lm[b].y - lm[a].y, (lm[b].z - lm[a].z) * aspect];
  const p = v(5, 6), q = v(7, 8);
  const cos = (p[0] * q[0] + p[1] * q[1] + p[2] * q[2]) / (Math.hypot(...p) * Math.hypot(...q) || 1);
  return Math.acos(Math.max(-1, Math.min(1, cos))) * 180 / Math.PI;
}

// Chụm ngón cái + ngón trỏ (như cầm bút): khoảng cách hai đầu ngón so với chiều dài lòng bàn tay
// (cổ tay → gốc ngón giữa). Chụm khi < PINCH_ON, tách khi > PINCH_OFF; ở giữa giữ nguyên để
// nét tô không đứt khi hai ngón hơi hé.
// (Thử thật: 0,5 thì hai đầu ngón đã tách hẳn vẫn còn tính là chụm.)
const PINCH_ON = 0.3;
const PINCH_OFF = 0.4;
const PINCH_NEAR = 0.55; // dưới mức này: hai đầu ngón đang lại gần (vẽ nét nối vàng)
// Chụm là ngón trỏ còn cong vừa. Nắm cả bàn tay thì ngón trỏ gập hẳn vào lòng (> góc này): không
// tính là chụm dù đầu ngón cái có chạm ngón trỏ.
const PINCH_INDEX_MAX_BEND = 120;
function pinchRatio(lm, aspect) {
  const d = (a, b) => Math.hypot((lm[b].x - lm[a].x) * aspect, lm[b].y - lm[a].y, (lm[b].z - lm[a].z) * aspect);
  return d(4, 8) / (d(0, 9) || 1);
}

// Tay càng gần camera thì hình càng to: cổ tay → gốc ngón giữa + gốc trỏ → gốc út.
const handSpan = (lm) => Math.hypot(lm[9].x - lm[0].x, lm[9].y - lm[0].y) + Math.hypot(lm[17].x - lm[5].x, lm[17].y - lm[5].y);
// Lọc tay người khác (bố mẹ, anh chị đứng sau): chỉ nhận tay gần camera cỡ tay đang dùng
// (to ít nhất HAND_KEEP lần tay gần nhất trước đó). Tay xa hơn chỉ được nhận khi đã HAND_WAIT_MS
// không thấy tay gần nào.
const HAND_KEEP = 0.7;
const HAND_WAIT_MS = 3000;

// Lọc One Euro: đứng yên thì con trỏ không rung, đưa tay nhanh thì bám kịp (thông số telerehabplay).
class OneEuro {
  constructor(minCutoff = 0.1, beta = 40, dCutoff = 1) { Object.assign(this, { minCutoff, beta, dCutoff, x: null, dx: 0, t: 0 }); }
  static alpha(cutoff, dt) { const tau = 1 / (2 * Math.PI * cutoff); return 1 / (1 + tau / dt); }
  filter(v, t) {
    if (this.x === null) { this.x = v; this.t = t; return v; }
    const dt = Math.max((t - this.t) / 1000, 1e-3);
    this.t = t;
    const a = OneEuro.alpha(this.dCutoff, dt);
    this.dx = a * ((v - this.x) / dt) + (1 - a) * this.dx;
    const b = OneEuro.alpha(this.minCutoff + this.beta * Math.abs(this.dx), dt);
    this.x = b * v + (1 - b) * this.x;
    return this.x;
  }
}

/**
 * Bật camera vào `video` và bắt đầu nhận diện. `onFrame(frame)` mỗi lần có kết quả,
 * `onStatus('camera' | 'model' | 'ready')` theo tiến trình. Trả về hàm dừng (tắt camera).
 * Lỗi (không có quyền camera, không tải được model) thì promise bị từ chối.
 */
export async function startTracking(video, { onFrame, onStatus }) {
  let stopped = false;
  let stream = null;
  let raf = 0;
  const stop = () => {
    stopped = true;
    cancelAnimationFrame(raf);
    stream?.getTracks().forEach(t => t.stop());
    video.srcObject = null;
  };

  try {
    onStatus?.('camera');
    const model = getLandmarker();
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false,
    });
    if (stopped) { stop(); return stop; }
    video.srcObject = stream;
    video.muted = true;
    video.playsInline = true;
    await video.play().catch(() => {});
    onStatus?.('model');
    const landmarker = await model;
    if (stopped) return stop;
    onStatus?.('ready');

    const tx = new OneEuro();
    const ty = new OneEuro();
    let pinch = false;
    let pinchFlips = 0;
    let lastVideoTime = -1;
    let lastInfer = 0;
    let lockSpan = 0; // cỡ tay gần nhất đang dùng
    let lockAt = -Infinity; // lần cuối thấy tay gần đó

    const loop = () => {
      if (stopped) return;
      raf = requestAnimationFrame(loop);
      const now = performance.now();
      if (video.readyState < 2 || video.currentTime === lastVideoTime || now - lastInfer < INFER_MS) return;
      lastVideoTime = video.currentTime;
      lastInfer = now;
      let result;
      try { result = landmarker.detectForVideo(video, now); } catch { return; }
      let hands = (result.landmarks || []).filter(lm => lm.length >= 21);
      if (hands.length && now - lockAt < HAND_WAIT_MS) hands = hands.filter(lm => handSpan(lm) >= lockSpan * HAND_KEEP);
      if (!hands.length) {
        tx.x = ty.x = null;
        pinch = false;
        pinchFlips = 0;
        onFrame({ seen: false });
        return;
      }
      // Luôn chọn tay gần camera nhất (hình to nhất).
      const best = hands.reduce((a, b) => (handSpan(b) > handSpan(a) ? b : a));
      // Bám theo cỡ tay mỗi lần thấy: bé lùi tay ra xa từ từ vẫn giữ được tay mình.
      lockSpan = handSpan(best);
      lockAt = now;
      // Đổi chụm ↔ tách chỉ khi thấy 2 lần liền (~0,1 giây): ngón đang khép dở không làm chọn nhầm.
      const aspect = (video.videoWidth / video.videoHeight) || 16 / 9;
      const r = pinchRatio(best, aspect);
      const wantPinch = indexBend(best, aspect) > PINCH_INDEX_MAX_BEND ? false : r < PINCH_ON ? true : r > PINCH_OFF ? false : pinch;
      pinchFlips = wantPinch === pinch ? 0 : pinchFlips + 1;
      if (pinchFlips >= 2) { pinch = wantPinch; pinchFlips = 0; }
      const lm = best.map(q => ({ x: 1 - q.x, y: q.y }));
      const penRaw = { x: (lm[4].x + lm[8].x) / 2, y: (lm[4].y + lm[8].y) / 2 };
      const pen = { x: tx.filter(penRaw.x, now), y: ty.filter(penRaw.y, now) };
      onFrame({ seen: true, lm, pen, penRaw, pinch, pinchNear: r < PINCH_NEAR });
    };
    loop();
    return stop;
  } catch (err) {
    stop();
    throw err;
  }
}
