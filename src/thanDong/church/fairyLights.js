/**
 * Bóng nháy quanh nhà thờ Đức Bà (khu 'saigon', world.js) khi trời tối, như các nhà thờ Sài Gòn mỗi mùa lễ: viền vàng ấm theo
 * cạnh hai ngọn tháp, những dây nhiều màu giăng hình quạt từ chân chóp tháp xuống sân, dây dọc các gờ mặt tiền, mép mái,
 * đầu hồi và vòng hậu cung, dây võng giữa các cột đèn sân, dây quấn xoắn quanh thân và tán các cây trước nhà thờ (vị trí cây
 * đọc từ model: nút tree_* có extras v2_plant), viền quanh bồn cỏ tượng Đức Mẹ và hai vườn bên. Mỗi bóng là một điểm của một THREE.Points (một lần vẽ cho cả nghìn bóng, nhẹ cho điện thoại), nháy
 * theo pha riêng, dây quạt chạy đuổi; dưới giảm chuyển động thì chỉ thở chậm. Ban ngày tắt hẳn.
 * Toạ độ lấy từ build_church_saigon.py (mặt bằng x, y → three x, -y; Z lên → three y).
 */
import * as THREE from 'three';

const OUT_Z = 5.4, TOWER_FRONT = 9.4;                 // mặt ngoài mặt tiền, mặt trước hai tháp (three z)
const TOWER_X = [4.0, 9.0], TOWER_TOP = 24;
const BELFRY_H = 2.1;                                  // nửa cạnh lầu chuông (bh)
const SPIRE_BASE = TOWER_TOP + 5.8, SPIRE_TIP = SPIRE_BASE + 12.8;
const LAMPS = [12.5, 29.5].flatMap(z => [-7.2, 7.2].map(x => [x, 4.2, z]));
const FACADE_Z = 5.0, APSE_Z = -20.5, CHANCEL_Z = -19.4;   // tường mặt tiền (sau lớp gạch), tâm hậu cung, cuối gian bên
const EAVE = 15.5, RIDGE = 23.5, EAVE_X = 6.15;            // mái gian giữa
const AISLE_EAVE = [8.45, 7.45];                           // mép ngoài mái gian bên: |x|, độ cao
const STATUE = [0, 21], BED_R = 5.6;                       // bồn cỏ tròn quanh tượng Đức Mẹ
const SIDE_BEDS = [[9.5, 15, 15, 27]];                     // |x| từ … tới, z từ … tới (mỗi bên một vườn)
// cây (dress_v2.py tree_kind / palm_kind): chiều cao thân h, bán kính tán (ngang, đứng); tán có tâm ở h + 0,2·đứng
const TREES = {
  tree_tamarind: { h: 5.2, crown: [2.8, 2.0] }, tree_dau: { h: 7.0, crown: [2.4, 2.6] },
  tree_banglang: { h: 4.4, crown: [2.4, 1.7] }, tree_palm: { h: 6.0 }, tree_palm_b: { h: 7.2 },
};
// màu cho từng cây: vàng ấm, trắng xanh, tím hồng, nhiều màu
const TREE_LOOKS = [
  () => new THREE.Color(0xffd28a), () => new THREE.Color(0xbfe0ff),
  (j) => new THREE.Color(j % 2 ? 0xff7ad9 : 0xb68cff), (j) => new THREE.Color([0xff4d4d, 0x4dff7a, 0x4d8bff, 0xffd34d][j % 4]),
];

// màu bóng: dây quạt nhiều màu như đèn lễ ở Việt Nam, viền tháp và gờ vàng ấm
const MULTI = [0xff4d4d, 0x4dff7a, 0x4d8bff, 0xffd34d, 0xff6ad5, 0xffffff].map(c => new THREE.Color(c));
const WARM = new THREE.Color(0xffd28a);

/** Các điểm cách nhau `step` m trên đoạn a → b, võng xuống `sag` m ở giữa (dây treo). */
function strand(a, b, step, sag = 0) {
  const n = Math.max(2, Math.round(a.distanceTo(b) / step));
  const out = [];
  for (let i = 0; i <= n; i++) {
    const f = i / n, p = a.clone().lerp(b, f);
    p.y -= sag * 4 * f * (1 - f);
    out.push(p);
  }
  return out;
}

/** Đường xoắn quanh mặt elip (tâm c, bán kính ngang rx, đứng ry) từ dưới lên trên, `turns` vòng, bóng cách nhau ~step m. */
function spiral(c, rx, ry, turns, step, a0 = 0, from = -0.85, to = 0.9) {
  const out = [];
  let t = 0;
  while (t <= 1) {
    const v = from + (to - from) * t, r = rx * Math.sqrt(Math.max(0, 1 - v * v)), a = a0 + t * turns * 2 * Math.PI;
    out.push(new THREE.Vector3(c.x + r * Math.cos(a), c.y + ry * v, c.z + r * Math.sin(a)));
    // bước theo cả vòng quanh lẫn đi lên, để bóng đều nhau
    const dl = Math.hypot(turns * 2 * Math.PI * Math.max(r, 0.3), ry * (to - from));
    t += step / dl;
  }
  return out;
}

function buildPoints(root) {
  const pts = [], col = [], ph = [], kind = [];
  const add = (list, color, k, chase = 0) => list.forEach((p, i) => {
    pts.push(p.x, p.y, p.z);
    const c = typeof color === 'function' ? color(i) : color;
    col.push(c.r, c.g, c.b);
    ph.push(chase ? i * chase : Math.random() * 6.283);
    kind.push(k);
  });
  const zc = (TOWER_FRONT + OUT_Z) / 2;
  for (const s of [-1, 1]) {
    const xc = s * (TOWER_X[0] + TOWER_X[1]) / 2;
    // viền chóp tháp: bốn cạnh của chóp bát giác (góc 22,5° như tháp), từ chân chóp lên đỉnh
    // (nhích ra ngoài mặt chóp, nằm đúng trên cạnh thì nửa quầng sáng chìm vào mái)
    for (let k = 0; k < 8; k++) {
      const a = (22.5 + 45 * k) * Math.PI / 180, cos = Math.cos(a), sin = Math.sin(a);
      const base = new THREE.Vector3(xc + (BELFRY_H + 0.3) * cos, SPIRE_BASE, zc + (BELFRY_H + 0.3) * sin);
      const tip = new THREE.Vector3(xc + 0.3 * cos, SPIRE_TIP - 0.4, zc + 0.3 * sin);
      add(strand(base, tip, 0.5), WARM, 0);
    }
    // viền lầu chuông: bốn cạnh mép trên
    const r = BELFRY_H + 0.25;
    const corner = (i) => new THREE.Vector3(xc + r * (i === 0 || i === 3 ? -1 : 1), SPIRE_BASE - 0.2, zc + r * (i < 2 ? 1 : -1));
    for (let i = 0; i < 4; i++) add(strand(corner(i), corner((i + 1) % 4), 0.45), WARM, 0);
    // dây quạt: từ mép trước lầu chuông xuống sân, mỗi tháp tám dây toả ra phía ngoài và phía trước
    for (let i = 0; i < 8; i++) {
      const f = i / 7;
      const from = new THREE.Vector3(xc + s * (f - 0.5) * 2 * BELFRY_H, SPIRE_BASE - 0.3, zc + BELFRY_H + 0.2);
      const ang = (-0.15 + 1.25 * f) * Math.PI / 2;          // từ hơi vào giữa tới hẳn ra bên
      const R = 21 - 4 * f;
      const to = new THREE.Vector3(xc + s * Math.sin(ang) * R * 0.75, 0.15, zc + 6 + Math.cos(ang) * R);
      const c0 = i % MULTI.length;
      add(strand(from, to, 0.42, 1.2), (j) => MULTI[(c0 + Math.floor(j / 3)) % MULTI.length], 1, 0.55);
    }
    // gờ tháp ở 12 m và 18 m (mặt trước)
    for (const y of [12, 18, TOWER_TOP]) {
      const lo = s * TOWER_X[0], hi = s * TOWER_X[1];
      add(strand(new THREE.Vector3(lo, y + 0.2, TOWER_FRONT + 0.45), new THREE.Vector3(hi, y + 0.2, TOWER_FRONT + 0.45), 0.4), WARM, 0);
    }
  }
  // gờ trên cổng ba vòm giữa hai tháp
  add(strand(new THREE.Vector3(-4, 7.0, TOWER_FRONT + 0.3), new THREE.Vector3(4, 7.0, TOWER_FRONT + 0.3), 0.35), WARM, 0);
  // dây võng giữa các cột đèn sân: dọc hai bên và ngang trước nhà thờ
  const L = LAMPS.map(([x, y, z]) => new THREE.Vector3(x, y, z));
  const swag = (a, b) => add(strand(a, b, 0.4, 1.0), (j) => MULTI[j % MULTI.length], 2);
  swag(L[0], L[2]); swag(L[1], L[3]); swag(L[0], L[1]);
  // mép mái gian giữa, chóp mái, vòng hậu cung, mép mái hai gian bên
  for (const s of [-1, 1]) {
    add(strand(new THREE.Vector3(s * (EAVE_X + 0.15), EAVE + 0.15, FACADE_Z), new THREE.Vector3(s * (EAVE_X + 0.15), EAVE + 0.15, APSE_Z), 0.45), WARM, 0);
    add(strand(new THREE.Vector3(s * AISLE_EAVE[0], AISLE_EAVE[1] + 0.1, OUT_Z), new THREE.Vector3(s * AISLE_EAVE[0], AISLE_EAVE[1] + 0.1, CHANCEL_Z), 0.45), WARM, 0);
    // cạnh ngoài phía trước của tháp, từ mái cổng lên lầu chuông
    add(strand(new THREE.Vector3(s * (TOWER_X[1] + 0.45), 6.2, TOWER_FRONT + 0.45), new THREE.Vector3(s * (TOWER_X[1] + 0.45), TOWER_TOP, TOWER_FRONT + 0.45), 0.4), WARM, 0);
    add(strand(new THREE.Vector3(s * (TOWER_X[0] - 0.45), 6.2, TOWER_FRONT + 0.45), new THREE.Vector3(s * (TOWER_X[0] - 0.45), TOWER_TOP, TOWER_FRONT + 0.45), 0.4), WARM, 0);
    // đầu hồi mặt tiền (giữa hai tháp)
    add(strand(new THREE.Vector3(s * 4.3, 19.9, OUT_Z + 0.55), new THREE.Vector3(0, 25.6, OUT_Z + 0.55), 0.4), WARM, 0);
  }
  add(strand(new THREE.Vector3(0, RIDGE + 0.2, FACADE_Z), new THREE.Vector3(0, RIDGE + 0.2, APSE_Z), 0.45), WARM, 0);
  const apse = [];
  for (let k = 0; k <= 40; k++) {
    const f = Math.PI * k / 40;
    apse.push(new THREE.Vector3((EAVE_X + 0.15) * Math.cos(f), EAVE + 0.15, APSE_Z - (EAVE_X + 0.15) * Math.sin(f)));
  }
  add(apse.flatMap((p, i) => i ? strand(apse[i - 1], p, 0.45).slice(1) : [p]), WARM, 0);
  for (const y of [9.8, 19.3]) add(strand(new THREE.Vector3(-4, y + 0.15, OUT_Z + 0.5), new THREE.Vector3(4, y + 0.15, OUT_Z + 0.5), 0.4), WARM, 0);
  // vườn: vòng quanh bồn cỏ tượng Đức Mẹ, viền hai vườn bên (trên mặt hàng rào cây)
  const ring = [];
  for (let k = 0; k < 90; k++) {
    const a = 2 * Math.PI * k / 90;
    ring.push(new THREE.Vector3(STATUE[0] + BED_R * Math.cos(a), 0.75, STATUE[1] + BED_R * Math.sin(a)));
  }
  add(ring, (j) => MULTI[j % MULTI.length], 2);
  for (const [x0, x1, z0, z1] of SIDE_BEDS) for (const s of [-1, 1]) {
    const c = [[x0, z0], [x1, z0], [x1, z1], [x0, z1]].map(([x, z]) => new THREE.Vector3(s * x, 0.75, z));
    for (let i = 0; i < 4; i++) add(strand(c[i], c[(i + 1) % 4], 0.4).slice(1), (j) => MULTI[(j + i) % MULTI.length], 2);
  }
  // cây trước và hai bên nhà thờ (sau lưng nhà thờ không ai thấy): xoắn quanh thân, rồi lưới xoắn phủ quanh tán
  let n = 0;
  root?.traverse((o) => {
    if (!o.userData?.v2_plant) return;
    const key = Object.keys(TREES).find(k => o.name.startsWith(k + '_') && /^\d+$/.test(o.name.slice(k.length + 1)));
    if (!key) return;
    const p = o.getWorldPosition(new THREE.Vector3()), sc = o.getWorldScale(new THREE.Vector3()).x;
    if (p.z < -12 || Math.abs(p.x) > 38 || p.z > 60) return;
    const T = TREES[key], look = TREE_LOOKS[n++ % TREE_LOOKS.length], h = T.h * sc;
    const trunkTop = T.crown ? h * 0.7 : h * 0.95;
    add(spiral(new THREE.Vector3(p.x, trunkTop / 2 + 0.2, p.z), 0.32 * sc, trunkTop / 2, Math.round(trunkTop * 1.4), 0.3, n, -1, 1), WARM, 0);
    if (T.crown) {
      const [rx, ry] = T.crown.map(v => v * sc);
      add(spiral(new THREE.Vector3(p.x, h + ry * 0.2, p.z), rx * 0.95 + 0.3, ry + 0.3, 7, 0.5, n * 1.7), look, 0);
    }
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setAttribute('phase', new THREE.Float32BufferAttribute(ph, 1));
  g.setAttribute('kind', new THREE.Float32BufferAttribute(kind, 1));
  return g;
}

/** zone: id khu; chỉ khu 'saigon' có bóng nháy, khu khác trả về null. root: cảnh glb của khu (tìm cây). calm: giảm chuyển động. */
export function makeFairyLights({ scene, zone, root, calm }) {
  if (zone !== 'saigon') return null;
  root?.updateMatrixWorld(true);
  const geo = buildPoints(root);
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uOn: { value: 0 }, uPx: { value: 800 }, uCalm: { value: calm ? 1 : 0 } },
    vertexShader: `
      #include <common>
      #include <logdepthbuf_pars_vertex>
      attribute vec3 color; attribute float phase; attribute float kind;
      uniform float uTime, uOn, uPx, uCalm;
      varying vec3 vColor; varying float vGlow;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        float tw;
        if (kind > 0.5 && kind < 1.5) {
          // dây quạt: sóng sáng chạy từ đỉnh xuống sân
          tw = 0.35 + 0.65 * pow(0.5 + 0.5 * sin(phase - uTime * mix(4.0, 0.8, uCalm)), 3.0);
        } else {
          tw = 0.6 + 0.4 * sin(uTime * mix(2.3, 0.6, uCalm) + phase);
        }
        vGlow = tw * uOn;
        vColor = color;
        // cỡ theo khoảng cách (0,3 m quầng sáng), không nhỏ hơn 2 px để bóng xa vẫn lấp lánh
        gl_PointSize = max(2.0, 0.3 * uPx * projectionMatrix[1][1] / -mv.z);
        #include <logdepthbuf_vertex>
      }`,
    fragmentShader: `
      #include <common>
      #include <logdepthbuf_pars_fragment>
      varying vec3 vColor; varying float vGlow;
      void main() {
        #include <logdepthbuf_fragment>
        float d = length(gl_PointCoord - 0.5) * 2.0;
        if (d > 1.0) discard;
        float core = smoothstep(0.35, 0.0, d), halo = pow(1.0 - d, 2.0) * 0.55;
        vec3 c = mix(vColor, vec3(1.0), core * 0.6) * (core + halo) * vGlow;
        gl_FragColor = vec4(c, 1.0);
      }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  points.renderOrder = 2;
  points.visible = false;
  scene.add(points);
  return {
    /** dark: độ tối của trời (sky.js, 0 ngày .. 1 đêm); time: giây; height: chiều cao vùng vẽ (px thật). */
    update(dark, time, height) {
      const on = THREE.MathUtils.smoothstep(dark, 0.3, 0.8);
      points.visible = on > 0.01;
      mat.uniforms.uOn.value = on * 1.4;
      mat.uniforms.uTime.value = time;
      mat.uniforms.uPx.value = height * 0.5;
    },
    dispose() { scene.remove(points); geo.dispose(); mat.dispose(); },
  };
}
