/**
 * Ảnh từng vật phẩm cho danh mục Vật phẩm (shop.js), chụp ngay trong app từ chính mô hình 3D: một nhân vật avatar mặc món ấy
 * (hay cánh, mây, chiên con, bồ câu, hiệu ứng của companions.js), camera khung vừa đúng món (đầu cho mũ, tay cho đồ cầm, chân
 * cho giày, sau lưng cho ba lô, cánh…). Một WebGLRenderer nhỏ riêng (nền trong suốt), chụp lần lượt từng món theo hàng đợi,
 * mỗi khung hình một món cho khỏi giật, giữ ảnh trong bộ nhớ suốt lần mở trang.
 * Ô chi tiết dùng view(el, id): nhân vật 3D thật cả người, kéo để xoay, lăn / chụm để phóng vào món (renderer và cảnh riêng).
 * id `base:<nhân vật>` (wardrobe.js BASES): chân dung nửa người của một nhân vật cơ bản, mặc cả bộ của nhân vật ấy.
 */
import * as THREE from 'three';
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js';
import { ITEMS, DEFAULT_LOOK, BASES, applyLook, baseLook, meshOf, flyKind, flyTone } from './wardrobe.js';
import { makeWings } from './wings.js';
import { makeExtras } from './companions.js';

const SIZE = 192;
const BACK = new Set(['back']);   // nhìn từ sau lưng
const WITH_HEAD = new Set(['hair', 'hat', 'face', 'top', 'neck']);   // khung gồm cả mặt (av_base): áo không cắt ngang mặt
const PITCH0 = 0.2;

function lights(sc) {
  sc.add(new THREE.HemisphereLight(0xfff6e8, 0x5a5048, 1.9));
  const sun = new THREE.DirectionalLight(0xffffff, 2.2);
  sun.position.set(-1.5, 3, -2.5);
  sc.add(sun);
  const rim = new THREE.DirectionalLight(0xcfe0ff, 1.0);
  rim.position.set(2, 2, 3);
  sc.add(rim);
}

// khoảng cách camera để khung b vừa ảnh vuông với góc nhìn fov
function fit(b, fov) {
  const size = b.getSize(new THREE.Vector3());
  const span = Math.max(size.x, size.y, size.z * 0.6, 0.26);
  return span / (2 * Math.tan(THREE.MathUtils.degToRad(fov / 2))) * 1.25 + size.z / 2;
}

/** opts: { avatar (gltf avatar.glb), kit (makeExtrasKit), onMaterial }. get(id) → Promise<dataURL>. */
export function makeThumbs({ avatar, kit, onMaterial }) {
  let r = null, scene = null, cam = null, busy = false;
  const cache = new Map(), queue = [];

  function setup() {
    r = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    r.setPixelRatio(1);
    r.setSize(SIZE, SIZE);
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.05;
    scene = new THREE.Scene();
    lights(scene);
    cam = new THREE.PerspectiveCamera(28, 1, 0.02, 30);
  }

  // dựng một nhân vật mặc món id (hay mang cánh, bạn đồng hành, hiệu ứng) trong cảnh sc;
  // box = khung của món, all = khung cả người (kèm bạn đồng hành / hiệu ứng)
  function dress(id, sc) {
    const base = id.startsWith('base:') ? BASES.find(b => `base:${b.id}` === id) : null;
    const it = base ? { slot: 'base' } : ITEMS[id];
    const body = cloneSkinned(avatar.scene);
    sc.add(body);
    const actor = { root: body, pos: body.position, heading: 0, pose: 'idle', fly: null };
    let look = { ...DEFAULT_LOOK, top: 'tee', topC: 0 };
    if (base) look = baseLook(base);
    else {
      if (it.slot in look) look[it.slot] = id;
      if (it.tint !== undefined) look[`${it.slot}C`] = it.tint;
    }
    applyLook(actor, look, onMaterial);
    body.updateMatrixWorld(true);
    let wings = null, extras = null;
    const extra = new THREE.Group();
    sc.add(extra);
    const wingy = flyKind(id) === 'wings', side = /^(fly|pet|fx)$/.test(it.slot) && !wingy;
    if (wingy) {
      wings = makeWings({ calm: true });
      wings.attach(actor);
      wings.wear(true, flyTone(id));
      wings.set('hover');
      for (let i = 0; i < 40; i++) wings.update(0.1, 0.15);
    }
    if (side) {
      extras = makeExtras(actor, { scene: extra, kit, calm: false, ground: null });
      if (flyKind(id) === 'cloud') { actor.fly = {}; body.position.y = 0.25; }
      extras.set({ [it.slot]: id });
      if (id === 'bloom') { extras.bowed(); for (let i = 0; i < 20; i++) extras.update(0.06); }
      else if (id === 'stars') { extras.prayed(); for (let i = 0; i < 14; i++) extras.update(0.06); }
      else if (id === 'trail') {
        actor.fly = {};
        body.position.y = 0.3;
        for (let i = 0; i < 30; i++) { body.position.z += 0.03; extras.update(0.03); }
      } else if (id === 'steps' || id === 'petals') {
        actor.pose = 'walk';
        for (let i = 0; i < 40; i++) { body.position.z -= 0.035; extras.update(0.03); }
      } else for (let i = 0; i < 8; i++) extras.update(0.05);
      body.updateMatrixWorld(true);
    }
    // khung: món trên người theo mesh (hay xương đầu); bạn đồng hành theo chính nó; cánh, mây, hiệu ứng: cả người
    const box = new THREE.Box3();
    if (wingy) box.setFromObject(body);
    else if (base) {
      // chân dung: từ ngực lên đỉnh đầu (mũ, khăn)
      box.setFromObject(body);
      box.min.y = box.max.y - (box.max.y - box.min.y) * 0.62;
    } else if (side) box.setFromObject(extra);
    else {
      const part = actor.avParts.find(o => o.name === meshOf(id));
      if (part) box.setFromObject(part);
      if (WITH_HEAD.has(it.slot)) {
        const face = actor.avParts.find(o => o.name === 'av_base');
        if (face) { const f = new THREE.Box3().setFromObject(face); f.min.y = f.max.y - (f.max.y - f.min.y) * 0.85; box.union(f); }
      }
    }
    if (box.isEmpty()) box.setFromObject(body);
    const all = new THREE.Box3().setFromObject(body);
    if (side) { const e = new THREE.Box3().setFromObject(extra); if (!e.isEmpty()) all.union(e); }
    return {
      body, extra, box, all, back: BACK.has(it.slot) || wingy,
      dispose() {
        wings?.dispose();
        extras?.dispose();
        body.parent?.remove(body);
        extra.parent?.remove(extra);
        for (const m of actor.avMats?.values() || []) m.dispose();
      },
    };
  }

  function shoot(id) {
    const d = dress(id, scene);
    const c = d.box.getCenter(new THREE.Vector3());
    const dir = new THREE.Vector3(d.back ? 0.35 : -0.35, 0.25, d.back ? 1 : -1).normalize();
    cam.position.copy(c).addScaledVector(dir, fit(d.box, cam.fov));
    cam.lookAt(c);
    r.render(scene, cam);
    const url = r.domElement.toDataURL('image/webp', 0.9);
    d.dispose();
    return url;
  }

  function pump() {
    if (busy || !queue.length) return;
    busy = true;
    requestAnimationFrame(() => {
      const { id, done } = queue.shift();
      let url = '';
      try { if (!r) setup(); url = shoot(id); } catch (e) { console.warn('thumbs', id, e); }
      cache.set(id, url);
      done(url);
      busy = false;
      pump();
    });
  }

  /*
   * Ô xem lớn: nhân vật mặc món ấy, thấy cả người, kéo ngang (chuột / một ngón) để xoay quanh, kéo dọc để nhìn cao thấp,
   * lăn chuột / chụm hai ngón để phóng vào món, chạm đúp về như cũ. Renderer và cảnh riêng (không lẫn vào ảnh chụp),
   * chỉ vẽ lại khi có thao tác, không có vòng lặp.
   */
  const V = { r: null, scene: null, cam: null, d: null, id: null, pivot: null, el: null,
    yaw: 0, pitch: PITCH0, zoom: 1, az: 0, ptr: new Map(), pinch: 0 };
  const UP = new THREE.Vector3(0, 1, 0);

  function vSetup() {
    V.r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    V.r.outputColorSpace = THREE.SRGBColorSpace;
    V.r.toneMapping = THREE.ACESFilmicToneMapping;
    V.r.toneMappingExposure = 1.05;
    V.scene = new THREE.Scene();
    lights(V.scene);
    V.cam = new THREE.PerspectiveCamera(28, 1, 0.02, 30);
    const cv = V.r.domElement;
    cv.className = 'ch-sh-3d';
    cv.style.touchAction = 'none';
    cv.addEventListener('pointerdown', (e) => {
      cv.setPointerCapture(e.pointerId);
      V.ptr.set(e.pointerId, { x: e.clientX, y: e.clientY });
      V.pinch = 0;
    });
    cv.addEventListener('pointermove', (e) => {
      const p = V.ptr.get(e.pointerId);
      if (!p) return;
      if (V.ptr.size === 1) {
        V.yaw += (e.clientX - p.x) * 0.012;
        V.pitch = Math.min(0.9, Math.max(-0.35, V.pitch + (e.clientY - p.y) * 0.006));
      }
      p.x = e.clientX; p.y = e.clientY;
      if (V.ptr.size === 2) {
        const [a, b] = [...V.ptr.values()], dd = Math.hypot(a.x - b.x, a.y - b.y);
        if (V.pinch) V.zoom = Math.min(3, Math.max(1, V.zoom * dd / V.pinch));
        V.pinch = dd;
      }
      draw();
    });
    const up = (e) => { V.ptr.delete(e.pointerId); V.pinch = 0; };
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', up);
    cv.addEventListener('wheel', (e) => {
      e.preventDefault();
      V.zoom = Math.min(3, Math.max(1, V.zoom * Math.exp(-e.deltaY * 0.0015)));
      draw();
    }, { passive: false });
    cv.addEventListener('dblclick', () => { V.yaw = 0; V.pitch = PITCH0; V.zoom = 1; draw(); });
  }

  function draw() {
    if (!V.d || !V.el?.isConnected) return;
    const w = Math.max(40, V.el.clientWidth), h = Math.max(40, V.el.clientHeight);
    V.r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    V.r.setSize(w, h, false);
    V.cam.aspect = w / h;
    V.cam.updateProjectionMatrix();
    V.pivot.rotation.y = V.yaw;
    V.pivot.updateMatrixWorld(true);
    // phóng to: tâm trượt từ cả người sang món (tâm món xoay theo người), khoảng cách từ khung cả người về khung món
    const k = (V.zoom - 1) / 2;
    const ci = V.d.box.getCenter(new THREE.Vector3()).sub(V.pivot.position).applyAxisAngle(UP, V.yaw).add(V.pivot.position);
    const c = V.d.all.getCenter(new THREE.Vector3()).lerp(ci, k);
    const da = fit(V.d.all, V.cam.fov) * 0.9 / Math.min(1, w / h), di = fit(V.d.box, V.cam.fov);
    const dist = Math.max(Math.min(di, da), da / V.zoom);
    const dir = new THREE.Vector3(Math.sin(V.az) * Math.cos(V.pitch), Math.sin(V.pitch), Math.cos(V.az) * Math.cos(V.pitch));
    V.cam.position.copy(c).addScaledVector(dir, dist);
    V.cam.lookAt(c);
    V.r.render(V.scene, V.cam);
  }

  function view(el, id) {
    if (!V.r) vSetup();
    if (V.id !== id) {
      unview();
      V.d = dress(id, V.scene);
      // người (và bạn đồng hành) xoay quanh trục đứng qua tâm cả người; đèn và camera đứng yên nên mặt luôn sáng
      const ca = V.d.all.getCenter(new THREE.Vector3());
      V.pivot = new THREE.Group();
      V.pivot.position.set(ca.x, 0, ca.z);
      const inner = new THREE.Group();
      inner.position.set(-ca.x, 0, -ca.z);
      V.pivot.add(inner);
      inner.add(V.d.body, V.d.extra);
      V.scene.add(V.pivot);
      V.id = id;
      V.yaw = 0; V.pitch = PITCH0; V.zoom = 1;
      V.az = V.d.back ? Math.atan2(0.35, 1) : Math.atan2(-0.35, -1);
    }
    V.el = el;
    el.textContent = '';
    el.style.backgroundImage = '';
    el.appendChild(V.r.domElement);
    requestAnimationFrame(draw);
  }

  function unview() {
    V.d?.dispose();
    if (V.pivot) V.scene.remove(V.pivot);
    V.d = null; V.pivot = null; V.id = null; V.el = null;
  }

  return {
    get(id) {
      if (cache.has(id)) return Promise.resolve(cache.get(id));
      return new Promise((done) => { queue.push({ id, done }); pump(); });
    },
    has: (id) => cache.has(id),
    peek: (id) => cache.get(id),
    /** Gắn ô xem 3D xoay được của món id vào phần tử el (thay nội dung el). */
    view(el, id) { try { view(el, id); } catch (e) { console.warn('thumbs view', id, e); } },
    /** Bỏ nhân vật của ô xem 3D (khi đóng ô chi tiết). */
    unview,
    dispose() {
      queue.length = 0;
      r?.dispose();
      r?.forceContextLoss();
      r = null;
      unview();
      V.r?.dispose();
      V.r?.forceContextLoss();
      V.r = null;
    },
  };
}
