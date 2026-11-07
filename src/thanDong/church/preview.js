/**
 * Nhân vật xem trước của Tủ đồ / Vật phẩm: một avatar riêng đứng hẳn ra trước màn hình, trên lớp phủ của phần màn hình bảng
 * không che (trái khi nằm ngang, trên khi đứng), nền tối mờ cho cảnh lùi lại phía sau. Renderer và cảnh riêng, không dính gì
 * tới nhân vật thật (vẫn ngồi / đứng nguyên chỗ, người cùng phòng thấy bộ đồ thật). Thử đồ chỉ mặc lên avatar này.
 * Kéo (chuột / một ngón) để xoay riêng nó quanh trục đứng, có đà (giảm chuyển động thì không), lăn chuột / chụm để lại gần.
 */
import * as THREE from 'three';
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js';
import { applyLook, flyKind, flyTone } from './wardrobe.js';
import { makeWings } from './wings.js';
import { makeExtras } from './companions.js';

const FOV = 26;

/** opts: { root (khung .ch), avatar (gltf avatar.glb), kit (makeExtrasKit), onMaterial, calm, hint (html lời nhắc) } */
export function makePreview({ root, avatar, kit, onMaterial, calm = false, hint = '' }) {
  root.insertAdjacentHTML('beforeend', `<div class="ch-pv" hidden><canvas class="ch-pv-cv"></canvas><span class="ch-pv-hint">${hint}</span></div>`);
  const el = root.querySelector('.ch-pv'), cv = el.querySelector('canvas');
  const r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
  r.outputColorSpace = THREE.SRGBColorSpace;
  r.toneMapping = THREE.ACESFilmicToneMapping;
  r.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xfff6e8, 0x5a5048, 1.9));
  const sun = new THREE.DirectionalLight(0xffffff, 2.3);
  sun.position.set(-1.2, 3, -2.6);
  scene.add(sun);
  const rim = new THREE.DirectionalLight(0xcfe0ff, 1.1);
  rim.position.set(2, 2.2, 3);
  scene.add(rim);
  const cam = new THREE.PerspectiveCamera(FOV, 1, 0.05, 30);

  // bục tròn sáng dưới chân và bóng mềm
  const glowTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const g = c.getContext('2d'), gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(255,226,160,0.55)'); gr.addColorStop(0.55, 'rgba(255,210,130,0.18)'); gr.addColorStop(1, 'rgba(255,200,120,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  })();
  const pad = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.3).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false }));
  pad.position.y = 0.002;
  scene.add(pad);
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.44, 64).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: 0xe9c46a, transparent: true, opacity: 0.55, depthWrite: false }));
  ring.position.y = 0.003;
  scene.add(ring);

  const spinner = new THREE.Group();   // chỉ nhóm này xoay
  scene.add(spinner);
  let body = null, actor = null, wings = null, extras = null, extraG = null, mixer = null, height = 1.2;
  let open = false, raf = 0, last = 0, spin = 0, spinV = 0, zoom = 1, drag = null, pinch = 0;
  const ptr = new Map();

  function build() {
    body = cloneSkinned(avatar.scene);
    body.traverse(o => { if (o.isMesh) o.frustumCulled = false; });
    spinner.add(body);
    actor = { root: body, pos: body.position, heading: 0, pose: 'idle', fly: null };
    mixer = new THREE.AnimationMixer(body);
    const idle = avatar.animations.find(c => /(^|_)idle$/.test(c.name));
    if (idle) mixer.clipAction(idle).play();
    mixer.update(0);
    wings = makeWings({ calm: true });
    wings.attach(actor);
    wings.set('folded');
    extraG = new THREE.Group();
    spinner.add(extraG);
    extras = makeExtras(actor, { scene: extraG, kit, calm, ground: null });
    body.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(body);
    height = Math.max(0.6, box.max.y);
  }

  function resize() {
    const w = Math.max(60, el.clientWidth), h = Math.max(60, el.clientHeight);
    r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    r.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(() => { if (open) resize(); });
  ro.observe(el);

  function frame(now) {
    if (!open) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.1, (now - (last || now)) / 1000);
    last = now;
    if (!drag && !calm) { spin += spinV * dt; spinV *= Math.exp(-dt * 2.5); }
    spinner.rotation.y = spin;
    mixer.update(dt);
    wings.update(dt, null);
    extras.update(dt);
    // cả người vừa khung (theo chiều đứng và chiều ngang); phóng to thì lại gần phần thân trên
    const k = (zoom - 1) / 1.5;
    const tall = height * 1.4, fitH = tall / (2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)));
    const fitW = fitH * Math.max(1, 0.75 / cam.aspect);
    const dist = Math.max(fitH, fitW) / zoom;
    const cy = height * (0.44 + 0.28 * k);
    cam.position.set(-0.18 * dist, cy + 0.12 * dist, -dist);
    cam.lookAt(0, cy, 0);
    r.render(scene, cam);
  }

  el.addEventListener('pointerdown', (e) => {
    try { el.setPointerCapture(e.pointerId); } catch { /* đã nhả */ }
    ptr.set(e.pointerId, { x: e.clientX, y: e.clientY });
    pinch = 0;
    drag = { t: performance.now() };
    spinV = 0;
  });
  el.addEventListener('pointermove', (e) => {
    const p = ptr.get(e.pointerId);
    if (!p) return;
    const now = performance.now();
    if (ptr.size === 1) {
      const da = (e.clientX - p.x) * 0.012;
      spin += da;
      spinV = da / Math.max(0.008, (now - drag.t) / 1000);
      drag.t = now;
    }
    p.x = e.clientX; p.y = e.clientY;
    if (ptr.size === 2) {
      const [a, b] = [...ptr.values()], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinch) zoom = THREE.MathUtils.clamp(zoom * d / pinch, 1, 2.5);
      pinch = d;
      spinV = 0;
    }
  });
  const up = (e) => {
    ptr.delete(e.pointerId);
    pinch = 0;
    if (ptr.size) return;
    if (drag && performance.now() - drag.t > 80) spinV = 0;   // dừng tay rồi mới nhả: không trôi
    spinV = THREE.MathUtils.clamp(spinV, -12, 12);
    drag = null;
  };
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', up);
  el.addEventListener('wheel', (e) => {
    e.preventDefault();
    zoom = THREE.MathUtils.clamp(zoom * Math.exp(-e.deltaY * 0.0015), 1, 2.5);
  }, { passive: false });
  el.addEventListener('dblclick', () => { spin = 0; spinV = 0; zoom = 1; });

  return {
    get isOpen() { return open; },
    /** Mặc bộ đồ lên avatar xem trước. */
    dress(look) {
      if (!body) build();
      applyLook(actor, look, onMaterial);
      wings.wear(flyKind(look.fly) === 'wings', flyTone(look.fly));
      extras.set(look);
    },
    open(look) {
      if (!body) build();
      this.dress(look);
      if (open) return;
      open = true;
      el.hidden = false;
      spin = 0; spinV = 0; zoom = 1; last = 0;
      resize();
      raf = requestAnimationFrame(frame);
    },
    close() {
      if (!open) return;
      open = false;
      el.hidden = true;
      cancelAnimationFrame(raf);
      ptr.clear();
      drag = null;
    },
    dispose() {
      this.close();
      ro.disconnect();
      wings?.dispose();
      extras?.dispose();
      for (const m of actor?.avMats?.values() || []) m.dispose();
      glowTex.dispose();
      r.dispose();
      r.forceContextLoss();
      el.remove();
    },
  };
}
