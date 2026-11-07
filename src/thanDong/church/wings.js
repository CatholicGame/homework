/**
 * Đôi cánh lắp lên nhân vật Nhà thờ Online (vật phẩm `wings` của Tủ đồ, wardrobe.js): lông vũ dựng bằng three.js, gắn vào xương `spine`
 * nên nghiêng theo người (clip `soar` cúi cả thân về trước thì cánh nằm ngang theo). Mỗi cánh hai đốt (cánh trong, cánh
 * ngoài) quay quanh trục trước sau để vỗ lên xuống, cả cánh quét về sau để xếp lại sau lưng.
 * Trạng thái: 'folded' (đeo, đi bộ: xếp sau lưng, khẽ động), 'hover' (bay tại chỗ), 'soar' (bay tới: vỗ chậm, sải rộng);
 * nhịp vỗ khớp với clip hover / soar (1 s một nhịp, `phase` 0..1 do world.js đưa vào), chuyển trạng thái thì mềm dần.
 * Toạ độ trong khung của bộ xương (đơn vị mét như Blender, người cao khoảng 1,1 m), cánh phải duỗi theo +X, lưng là +Z;
 * cánh trái là bản soi gương (scale.x = -1) nên dùng chung mọi góc.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const ROOT = new THREE.Vector3(0, 0.6, 0.13); // giữa hai bả vai, ngay sau lưng áo (TORSO của build_characters.py)
const INNER = 0.24, OUTER = 0.27;                 // dài cánh trong / cánh ngoài (m)
// màu nhân với màu lông (kem / trắng / vàng nhạt): cánh vàng ánh kim, hơi tự sáng
const TONES = { '': { c: 0xffffff, e: 0x000000, m: 0 }, gold: { c: 0xffc94a, e: 0x3a2400, m: 0.35 } };
const CREAM = new THREE.Color(0xf3e6cf), WHITE = new THREE.Color(0xfffdf8), GOLD = new THREE.Color(0xf2d38c);

// Một chiếc lông: phiến thuôn từ gốc (0, 0) xuống -Y, dài 1, ngọn tròn; cong nhẹ về sau lưng để có khối, không phẳng như giấy
function featherShape() {
  const s = new THREE.Shape();
  s.moveTo(-0.03, 0);
  s.bezierCurveTo(-0.11, -0.25, -0.1, -0.72, -0.03, -0.96);
  s.quadraticCurveTo(0, -1.03, 0.04, -0.95);
  s.bezierCurveTo(0.1, -0.7, 0.1, -0.25, 0.03, 0);
  s.lineTo(-0.03, 0);
  const g = new THREE.ShapeGeometry(s, 10);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i);
    p.setZ(i, 0.07 * y * y - 0.25 * x * x); // ngọn cụp về sau, hai mép cong như lòng máng
  }
  return g;
}
const FEATHER = featherShape();

/** Lông đặt ở (x, y) trên đốt cánh, dài len, nghiêng ra ngoài góc a (rad, 0 = chĩa thẳng xuống), lớp z, màu gốc → ngọn. */
function feather(x, y, len, a, z, base, tip) {
  const g = FEATHER.clone();
  const m = new THREE.Matrix4().compose(new THREE.Vector3(x, y, z),
    new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), a), new THREE.Vector3(len, len, len));
  g.applyMatrix4(m);
  const n = g.attributes.position.count, col = new Float32Array(n * 3), c = new THREE.Color();
  const uv = FEATHER.attributes.position;
  for (let i = 0; i < n; i++) {
    const k = Math.min(1, -uv.getY(i));
    c.copy(base).lerp(tip, k * k);
    col.set([c.r, c.g, c.b], i * 3);
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.deleteAttribute('uv');
  return g;
}

/** Xương mép trước của một đốt cánh: ống tròn đầy đặn màu kem, hai đầu bo. */
function edge(len, r0, r1) {
  const g = new THREE.CapsuleGeometry((r0 + r1) / 2, len, 4, 10);
  g.rotateZ(-Math.PI / 2);
  g.translate(len / 2, 0, 0);
  const p = g.attributes.position, col = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i++) {
    // thuôn dần về phía ngoài
    const k = Math.min(1, Math.max(0, p.getX(i) / len)), s = (r0 + (r1 - r0) * k) / ((r0 + r1) / 2);
    p.setY(i, p.getY(i) * s);
    p.setZ(i, p.getZ(i) * s * 0.8);
    col.set([CREAM.r, CREAM.g, CREAM.b], i * 3);
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.deleteAttribute('uv');
  return g;
}

/** Một cánh (phải): nhóm gốc ở bả vai → đốt trong → đốt ngoài; trả về các nhóm để quay. */
function buildWing(mat) {
  const base = new THREE.Group(), inner = new THREE.Group(), outer = new THREE.Group();
  base.rotation.order = 'YZX'; // vỗ (z) trước, quét về sau (y) sau
  base.add(inner);
  inner.add(outer);
  outer.position.x = INNER;
  const parts = (list) => mergeGeometries(list);
  // đốt trong: lông thứ cấp dài chĩa xuống, hai hàng lông bao ngắn phủ trên (gần lưng hơn, tức +z)
  const ig = [edge(INNER, 0.03, 0.022)];
  for (let i = 0; i < 7; i++) {
    const k = i / 6;
    ig.push(feather(0.015 + k * (INNER - 0.02), -0.005, 0.25 + 0.05 * k, 0.05 + 0.18 * k, -0.012 + i * 0.0015, CREAM, WHITE));
  }
  for (let i = 0; i < 8; i++) {
    const k = i / 7;
    ig.push(feather(0.01 + k * (INNER - 0.01), 0.0, 0.12 + 0.02 * k, 0.04 + 0.2 * k, 0.004 + i * 0.001, CREAM, WHITE));
  }
  for (let i = 0; i < 6; i++) {
    const k = i / 5;
    ig.push(feather(0.02 + k * (INNER - 0.04), 0.01, 0.07, 0.1 + 0.2 * k, 0.014 + i * 0.001, CREAM, CREAM));
  }
  // đốt ngoài: lông sơ cấp dài xoè hình quạt tới ngọn (ngọn hơi ánh vàng), lông bao phủ gốc
  const og = [edge(OUTER, 0.022, 0.012)];
  for (let i = 0; i < 8; i++) {
    const k = i / 7;
    og.push(feather(0.01 + k * (OUTER - 0.03), -0.003, 0.31 + 0.11 * Math.sin(k * 2.6), 0.3 + 1.15 * k * k, -0.014 + i * 0.0016, WHITE, GOLD));
  }
  for (let i = 0; i < 6; i++) {
    const k = i / 5;
    og.push(feather(0.005 + k * (OUTER - 0.04), 0.002, 0.13 - 0.03 * k, 0.3 + 0.7 * k, 0.006 + i * 0.001, CREAM, WHITE));
  }
  for (const [grp, list] of [[inner, ig], [outer, og]]) {
    const g = parts(list);
    g.computeVertexNormals();
    const m = new THREE.Mesh(g, mat);
    m.castShadow = true;
    m.frustumCulled = false;
    grp.add(m);
    list.forEach(x => x.dispose());
  }
  return { base, inner, outer };
}

// Dáng từng trạng thái: sweep = quét về sau lưng, lift = góc nâng giữa nhịp, amp = biên độ vỗ, fold / lag = đốt ngoài gập và trễ nhịp
const POSE = {
  folded: { sweep: -0.3, lift: -1.25, amp: 0.03, fold: -0.6, lag: 0.02, spread: 0 },
  hover: { sweep: -0.32, lift: 0.5, amp: 0.62, fold: 0.05, lag: 0.28, spread: 1 },
  soar: { sweep: -0.12, lift: 0.25, amp: 0.48, fold: 0.1, lag: 0.22, spread: 1 },
};

/**
 * Đôi cánh cho một Actor (world.js): attach(actor) gắn vào xương spine ở tư thế gốc (gọi một lần, trước khi chạy hoạt ảnh),
 * wear(on), set(state), update(dt, phase), dispose(). `calm`: giảm chuyển động, vỗ khẽ và chậm hơn.
 */
export function makeWings({ calm = false } = {}) {
  const mat = new THREE.MeshStandardMaterial({ name: 'wing_feather', vertexColors: true, roughness: 0.62, side: THREE.DoubleSide });
  const holder = new THREE.Group(); // đặt ở bả vai, trong khung của xương spine
  const pair = new THREE.Group();   // co giãn khi lắp / tháo
  holder.add(pair);
  const R = buildWing(mat), L = buildWing(mat);
  const left = new THREE.Group();
  left.scale.x = -1;
  left.add(L.base);
  pair.add(R.base, left);
  R.base.position.x = 0.035;
  L.base.position.x = 0.035;
  R.base.position.z = 0.008; // xếp lại thì hai cánh chồng lên nhau sau lưng: lệch lớp để không nháy
  const now = { ...POSE.folded };
  let state = 'folded', show = 0, want = 0, t = 0, bone = null;

  function attach(actor) {
    bone = actor.root.getObjectByName('spine');
    let arm = bone;
    while (arm?.isBone) arm = arm.parent; // nút bộ xương (char_<kind>), cha của các xương
    if (!bone || !arm) { bone = null; return false; }
    // tư thế gốc: vị trí bả vai trong khung bộ xương → khung của xương spine
    actor.root.updateMatrixWorld(true);
    const m = new THREE.Matrix4().copy(bone.matrixWorld).invert()
      .multiply(arm.matrixWorld).multiply(new THREE.Matrix4().makeTranslation(ROOT));
    m.decompose(holder.position, holder.quaternion, holder.scale);
    bone.add(holder);
    pair.visible = false;
    return true;
  }
  /** Đeo / tháo: cánh hiện dần (lớn lên từ sau lưng) hoặc thu lại rồi ẩn. tone: '' (trắng kem) | 'gold' (Đôi cánh vàng). */
  function wear(on, tone = '') {
    want = on ? 1 : 0;
    if (on) {
      const T = TONES[tone] || TONES[''];
      mat.color.setHex(T.c);
      mat.emissive.setHex(T.e);
      mat.metalness = T.m;
    }
  }
  function set(s) { if (POSE[s]) state = s; }

  function update(dt, phase = null) {
    if (!bone) return;
    show += (want - show) * Math.min(1, dt * 6);
    if (want === 0 && show < 0.02) { show = 0; pair.visible = false; return; }
    const s = show < 0.999 ? show * show * (3 - 2 * show) : 1;
    pair.scale.setScalar((0.2 + 0.8 * s) * (0.8 + 0.2 * now.spread)); // xếp lại thì gọn hơn một chút
    pair.visible = s > 0.03;
    const goal = POSE[state], k = 1 - Math.exp(-dt * (state === 'folded' ? 3 : 5));
    for (const key in now) now[key] += (goal[key] - now[key]) * k;
    // nhịp: theo clip bay của nhân vật nếu có, không thì tự đếm (xếp cánh: thở chậm)
    t += dt * (state === 'folded' ? 0.3 : 1);
    const ph = (phase ?? t) * Math.PI * 2;
    const amp = now.amp * (calm ? 0.55 : 1);
    // cos: đầu nhịp cánh ở trên cao, đập xuống khi người nhô lên (clip hover: root lên theo sin)
    const flap = Math.cos(ph + 0.6);
    for (const w of [R, L]) {
      w.base.rotation.set(0, now.sweep, now.lift + amp * flap);
      w.outer.rotation.set(0, 0, now.fold + now.lag * Math.cos(ph - 0.3) * (amp / 0.62));
    }
  }

  function dispose() {
    bone?.remove(holder);
    bone = null;
    holder.traverse(o => o.geometry?.dispose());
    mat.dispose();
  }

  return { attach, wear, set, update, dispose, get on() { return want === 1; }, get state() { return state; } };
}
