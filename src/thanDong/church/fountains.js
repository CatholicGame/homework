/**
 * Đài phun nước sống động (Nhà thờ Online, world.js), thay hai vật liệu nước phẳng của glb (build_vatican.py build_fountains):
 * - vat_water: mặt bồn gợn sóng, vòng sóng lan ra nơi màn nước rơi xuống, phản chiếu trời (fresnel), lấp loá nắng,
 *   viền bọt; ban đêm đèn dưới nước chiếu sáng xanh nhạt.
 * - vat_falling_water: màn nước rơi qua mép "cây nấm" và mép bồn lớn thành vệt trôi xuống, tia giữa phun lên.
 * - giọt nước (Points): tia đỉnh tung giọt rồi rơi xuống mũ nấm, bụi nước bắn lên quanh chỗ màn nước chạm mặt bồn.
 * Tâm các đài và độ cao tính từ chính lưới nước (không chép số liệu từ Blender). Mọi chuyển động chạy trên GPU theo thời gian;
 * máy bật giảm chuyển động thì chậm lại, không tắt hẳn (nước đứng yên trông như đá).
 */
import * as THREE from 'three';

const MAX = 4; // số đài tối đa trong một khu

const NOISE = `
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}`;

// ---- mặt bồn ----
// world.js bật logarithmicDepthBuffer (khu xa > 1000 m): shader tự viết phải ghi độ sâu cùng kiểu, không thì nước bị đá che
const POOL_VERT = `#include <common>
#include <logdepthbuf_pars_vertex>
varying vec3 vW;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w;
  #include <logdepthbuf_vertex>
}`;
const POOL_FRAG = `uniform float time, night, sunK; uniform vec3 sky, horizon, sunDir, sunColor; uniform vec4 centers[${MAX}]; uniform int count;
varying vec3 vW;
#include <logdepthbuf_pars_fragment>
${NOISE}
void main() {
  #include <logdepthbuf_fragment>
  // đài gần nhất: tâm (xyz) và bán kính chỗ màn nước rơi (w)
  vec4 c = centers[0]; float best = 1e9;
  for (int i = 0; i < ${MAX}; i++) { if (i >= count) break; float d = distance(vW.xz, centers[i].xz); if (d < best) { best = d; c = centers[i]; } }
  vec2 q = vW.xz - c.xz; float r = length(q); vec2 dir = q / max(r, 1e-3);
  // độ dốc mặt nước: gợn lăn tăn hai hướng + vòng sóng lan ra hai phía từ chỗ nước rơi
  vec2 g = vec2(0.0);
  g += vec2(cos(vW.x * 3.1 + time * 1.7), cos(vW.z * 2.7 - time * 1.4)) * 0.05;
  g += vec2(cos(dot(vW.xz, vec2(4.3, 2.9)) - time * 2.3), cos(dot(vW.xz, vec2(-2.2, 5.1)) + time * 2.0)) * 0.035;
  float dr = r - c.w;
  float ring = exp(-abs(dr) * 0.9);
  g += dir * cos(abs(dr) * 9.0 - time * 5.5) * 0.16 * ring;
  g += (vec2(vnoise(vW.xz * 6.0 + time * 1.5), vnoise(vW.zx * 6.0 - time * 1.3)) - 0.5) * 0.12 * (0.4 + ring);
  vec3 n = normalize(vec3(-g.x, 1.0, -g.y));
  vec3 v = normalize(cameraPosition - vW);
  float fres = 0.04 + 0.96 * pow(1.0 - max(dot(n, v), 0.0), 5.0);
  vec3 refl = reflect(-v, n);
  vec3 skyCol = mix(horizon, sky, smoothstep(0.0, 0.6, refl.y));
  // lòng bồn đá xám nhìn qua nước xanh lục nhạt
  vec3 deep = mix(vec3(0.10, 0.19, 0.20), vec3(0.20, 0.30, 0.29), smoothstep(c.w + 0.6, 0.0, r)) * (0.35 + 0.65 * sunK);
  vec3 col = mix(deep, skyCol, fres);
  float spec = pow(max(dot(refl, sunDir), 0.0), 160.0) * 3.0 + pow(max(dot(refl, sunDir), 0.0), 18.0) * 0.12;
  col += sunColor * spec * sunK;
  // bọt trắng nơi màn nước rơi, loang theo nhiễu
  float foam = smoothstep(0.55, 0.0, abs(dr + 0.05)) * (0.55 + 0.45 * vnoise(vec2(atan(q.y, q.x) * 18.0, time * 2.0 + r * 3.0)));
  foam *= 0.75;
  col = mix(col, horizon * 0.9 + vec3(0.12), foam);
  // ban đêm: đèn đặt dưới nước, sáng nhất quanh chỗ nước rơi
  col += vec3(0.30, 0.55, 0.62) * night * (0.25 + 0.75 * ring) * (0.6 + 0.4 * vnoise(vW.xz * 2.0 + time * 0.4));
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

// ---- màn nước rơi và tia phun ----
const FALL_VERT = POOL_VERT;
const FALL_FRAG = `uniform float time, night, sunK; uniform vec3 sky, horizon; uniform vec4 centers[${MAX}]; uniform vec2 heights[${MAX}]; uniform int count;
varying vec3 vW;
#include <logdepthbuf_pars_fragment>
${NOISE}
void main() {
  #include <logdepthbuf_fragment>
  vec4 c = centers[0]; vec2 h = heights[0]; float best = 1e9;
  for (int i = 0; i < ${MAX}; i++) { if (i >= count) break; float d = distance(vW.xz, centers[i].xz); if (d < best) { best = d; c = centers[i]; h = heights[i]; } }
  vec2 q = vW.xz - c.xz; float a = atan(q.y, q.x);
  float y = vW.y - c.y;
  bool jet = length(q) < 0.4 && y > h.y - 0.1;            // tia giữa: chảy lên
  float flow = jet ? -y * 1.4 + time * 4.0 : y * 1.6 + time * 3.2;
  float s = vnoise(vec2(a * 20.0, flow * 0.7)) * 0.55 + vnoise(vec2(a * 52.0, flow * 1.6)) * 0.45;
  float streak = smoothstep(0.35, 0.8, s);
  // tấm nước trong hơi xanh (thấy lờ mờ đá phía sau), vệt nước sáng trắng chạy dọc, chỗ mỏng gần như trong suốt
  float alpha = (0.22 + 0.7 * streak) * (jet ? 0.85 : 1.0);
  alpha *= jet ? smoothstep(h.y + 1.7, h.y + 0.9, y) : 1.0;   // tia tan thành bụi nước
  vec3 col = mix(vec3(0.42, 0.56, 0.60), vec3(1.0, 1.0, 0.98), streak) * (0.35 + 0.75 * sunK);
  col += vec3(0.25, 0.45, 0.52) * night * (0.2 + 0.5 * streak) * smoothstep(c.y + h.y + 1.0, c.y, vW.y);  // đèn dưới chân
  gl_FragColor = vec4(col, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

// ---- giọt nước ----
const DROP_VERT = `#include <common>
#include <logdepthbuf_pars_vertex>
attribute vec4 seed; attribute vec3 vel; attribute float life;
uniform float time, px, sizeK;
varying float vA;
void main() {
  float t = fract(time / life + seed.x) * life;
  vec3 p = position + vel * t + vec3(0.0, -4.9, 0.0) * t * t;
  vA = smoothstep(0.0, 0.12, t) * smoothstep(life, life * 0.6, t) * seed.w;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = (seed.y * 0.09 * sizeK) * px * 900.0 / max(-mv.z, 0.5);
  gl_Position = projectionMatrix * mv;
  #include <logdepthbuf_vertex>
}`;
const DROP_FRAG = `uniform vec3 color; varying float vA;
#include <logdepthbuf_pars_fragment>
void main() {
  #include <logdepthbuf_fragment>
  vec2 c = gl_PointCoord - 0.5; float a = exp(-dot(c, c) * 14.0);
  if (a * vA < 0.01) discard;
  gl_FragColor = vec4(color, a * vA);
}`;

/** Giọt của một đài: tia đỉnh (rơi xuống mũ nấm), bụi nước quanh mép bồn lớn và quanh chỗ màn nước chạm mặt bồn. */
function dropsOf(f, rnd) {
  const P = [], V = [], S = [], L = [];
  const push = (p, v, life, size, a) => { P.push(...p); V.push(...v); L.push(life); S.push(rnd(), size, 0, a); };
  for (let i = 0; i < 180; i++) {                 // tia đỉnh: phun lên rồi toả xuống
    const an = rnd() * Math.PI * 2, sp = 0.4 + rnd() * 1.1;
    push([f.x, f.top, f.z], [Math.cos(an) * sp, 2.2 + rnd() * 2.6, Math.sin(an) * sp], 0.9 + rnd() * 0.5, 0.6 + rnd() * 0.8, 0.7);
  }
  for (const [r, y, n, up] of [[f.rim, f.y, 260, 1.3], [f.cap, f.capY, 120, 0.8]]) {   // bụi nước chỗ nước rơi chạm
    for (let i = 0; i < n; i++) {
      const an = rnd() * Math.PI * 2, rr = r + (rnd() - 0.5) * 0.5;
      const out = (rnd() - 0.3) * 0.9;
      push([f.x + Math.cos(an) * rr, y + 0.02, f.z + Math.sin(an) * rr],
        [Math.cos(an) * out, up * (0.4 + rnd()), Math.sin(an) * out], 0.35 + rnd() * 0.45, 0.4 + rnd() * 0.7, 0.55);
    }
  }
  return { P, V, S, L };
}

/**
 * @param {{ scene: THREE.Scene, root: THREE.Object3D }} o  root: cảnh của khu vừa nạp
 * @returns {{ update(dark: number, camera: THREE.Camera): void, dispose(): void } | null}
 */
export function makeFountains({ scene, root, renderer }) {
  const pools = [], falls = [];
  root.updateMatrixWorld(true);
  root.traverse(o => {
    if (!o.isMesh) return;
    if (o.material?.name === 'vat_water') pools.push(o);
    else if (o.material?.name === 'vat_falling_water') falls.push(o);
  });
  if (!pools.length) return null;

  // tâm từng đài: gom đỉnh mặt nước theo cụm (mỗi đài một đĩa); bán kính chỗ nước rơi xuống bồn = 0,85 bán kính đĩa
  const pts = [];
  const v = new THREE.Vector3();
  for (const m of pools) {
    const pos = m.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) pts.push(v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld).clone());
  }
  const groups = [];
  for (const p of pts) {
    const g = groups.find(g => Math.hypot(g.c.x / g.n - p.x, g.c.z / g.n - p.z) < 12);
    if (g) { g.c.add(p); g.n++; g.r = Math.max(g.r, Math.hypot(g.c.x / g.n - p.x, g.c.z / g.n - p.z)); }
    else groups.push({ c: p.clone(), n: 1, r: 0 });
  }
  const fts = groups.slice(0, MAX).map(g => ({ x: g.c.x / g.n, y: g.c.y / g.n, z: g.c.z / g.n, pool: g.r }));
  for (const f of fts) { f.r = 0; f.top = f.y; f.rim = f.pool * 0.85; }
  // màn nước: chỗ cao nhất là đỉnh tia; đỉnh mũ nấm và mép bồn lớn đọc từ vòng xa nhất ở mỗi độ cao
  for (const m of falls) {
    const pos = m.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
      const f = fts.reduce((a, b) => Math.hypot(a.x - v.x, a.z - v.z) < Math.hypot(b.x - v.x, b.z - v.z) ? a : b);
      const r = Math.hypot(f.x - v.x, f.z - v.z);
      f.top = Math.max(f.top, v.y);
      if (r < 0.4) f.jetBase = Math.min(f.jetBase ?? 1e9, v.y);
      f.r = Math.max(f.r, r);
      f.vs = (f.vs || []).concat([[r, v.y]]);
    }
  }
  for (const f of fts) {
    f.jetBase ??= f.top - 1.5;
    f.rim = Math.min(f.r, f.pool - 0.4) || f.rim;        // màn nước ngoài cùng rơi xuống mặt bồn ở bán kính này
    // màn trong (qua mép mũ nấm) chạm mép bồn lớn: điểm thấp nhất của nước ở khoảng 0,6..0,85 bán kính ngoài
    const mid = (f.vs || []).filter(([r]) => r > f.rim * 0.6 && r < f.rim * 0.85).sort((a, b) => a[1] - b[1])[0];
    [f.cap, f.capY] = mid || [f.rim * 0.8, (f.y + f.jetBase) / 2];
    delete f.vs;
  }

  const centers = Array.from({ length: MAX }, (_, i) => new THREE.Vector4(fts[i]?.x ?? 0, fts[i]?.y ?? 0, fts[i]?.z ?? 0, fts[i]?.rim ?? 0));
  const heights = Array.from({ length: MAX }, (_, i) => new THREE.Vector2(0, fts[i] ? fts[i].jetBase - fts[i].y : 0));
  const U = {
    time: { value: 0 }, night: { value: 0 }, sunK: { value: 1 },
    sky: { value: new THREE.Color() }, horizon: { value: new THREE.Color() },
    sunDir: { value: new THREE.Vector3(0, 1, 0) }, sunColor: { value: new THREE.Color() },
    centers: { value: centers }, heights: { value: heights }, count: { value: fts.length },
  };
  const poolMat = new THREE.ShaderMaterial({ name: 'vat_water', uniforms: U, vertexShader: POOL_VERT, fragmentShader: POOL_FRAG });
  const fallMat = new THREE.ShaderMaterial({ name: 'vat_falling_water', uniforms: U, vertexShader: FALL_VERT, fragmentShader: FALL_FRAG,
    transparent: true, depthWrite: false, side: THREE.DoubleSide });
  const old = new Map();
  for (const m of pools) { old.set(m, m.material); m.material = poolMat; m.receiveShadow = false; }
  for (const m of falls) { old.set(m, m.material); m.material = fallMat; m.castShadow = false; m.receiveShadow = false; }

  // giọt
  let seed = 11;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const all = { P: [], V: [], S: [], L: [] };
  for (const f of fts) { const d = dropsOf(f, rnd); for (const k in all) all[k].push(...d[k]); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(all.P, 3));
  g.setAttribute('vel', new THREE.Float32BufferAttribute(all.V, 3));
  g.setAttribute('seed', new THREE.Float32BufferAttribute(all.S, 4));
  g.setAttribute('life', new THREE.Float32BufferAttribute(all.L, 1));
  const DU = { time: U.time, px: { value: 1 }, sizeK: { value: 1 }, color: { value: new THREE.Color() } };
  const drops = new THREE.Points(g, new THREE.ShaderMaterial({ uniforms: DU, vertexShader: DROP_VERT, fragmentShader: DROP_FRAG,
    transparent: true, depthWrite: false }));
  drops.frustumCulled = false;
  scene.add(drops);

  let hemi = null, sun = null;
  scene.traverse(o => { if (o.isHemisphereLight) hemi = o; else if (o.isDirectionalLight) sun = o; });
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const t0 = performance.now();
  const c = new THREE.Color();

  return {
    update(dark) {
      U.time.value = (performance.now() - t0) / 1000 * (calm ? 0.35 : 1);
      U.night.value = dark;
      // màu trời phản chiếu: xanh ban ngày, xanh thẫm ban đêm (đèn bán cầu ban ngày gần trắng, phản chiếu nó trông như đá)
      const day = 1 - dark;
      U.sky.value.setRGB(0.20 + 0.18 * day, 0.30 + 0.32 * day, 0.45 + 0.45 * day).multiplyScalar(0.25 + 0.75 * day);
      U.horizon.value.setRGB(0.55, 0.66, 0.78).multiplyScalar(0.18 + 0.82 * day);
      if (hemi) U.horizon.value.lerp(c.copy(hemi.color).multiplyScalar(0.25 + 0.75 * day), 0.25);
      if (sun) {
        U.sunDir.value.copy(sun.position).sub(sun.target.position).normalize();
        U.sunColor.value.copy(sun.color);
        U.sunK.value = Math.min(1, sun.intensity / 1.3) * (1 - 0.8 * dark) + 0.15;
      }
      DU.px.value = renderer?.getPixelRatio() ?? 1;
      DU.color.value.copy(U.horizon.value).lerp(new THREE.Color(0.75, 0.95, 1.0), 0.5 + 0.3 * dark);
    },
    dispose() {
      for (const [m, mat] of old) m.material = mat;
      poolMat.dispose(); fallMat.dispose();
      scene.remove(drops); g.dispose(); drops.material.dispose();
    },
  };
}
