// Hầm mộ dưới Đền thờ Thánh Phê-rô (Nhà thờ Online, khu `grotte`, mô hình: church-online/blender/scripts/build_vatican_grotte.py):
// phòng tranh các thánh trang nghiêm, cổ kính. Mô hình chỉ là khối màu phẳng; ở đây vẽ lúc chạy:
// - gạch, đá ốp, sàn đá: vẽ bằng canvas (mỗi ảnh phủ 2 m, UV của mô hình tính theo mét), kèm bản đồ pháp tuyến cho mạch vữa
//   lõm và cạnh viên gạch nổi dưới ánh lửa;
// - lửa: đuốc trên trụ, chân nến cao, hai cây nến trên bậu mỗi hốc tranh (layout.lights), một lượt vẽ cho mọi ngọn lửa
//   (quad đứng quay theo camera, hình giọt lửa lay động, quầng sáng mềm), thân nến là một InstancedMesh;
// - ánh lửa: một nhóm đèn điểm cố định (máy tính 6, điện thoại 3) luôn đặt ở những ngọn đuốc gần mình nhất, chập chờn;
//   khu tối hẳn bất kể giờ (trời, nắng của sky.js bị thay sau mỗi lần sky.js cập nhật), sương tối mờ hành lang xa;
// - biển đá khắc tên các hành lang trên cửa vòm (layout.signs, tên nhóm của exhibit.js).
// Dưới giảm chuyển động: lửa đứng yên, đèn không chập chờn.
import * as THREE from 'three';
import { getLang } from '../engine/lang.js';
import { fontsReady } from './plaques.js';
import { EXHIBIT_GROUPS, GALLERIES } from './exhibit.js';

const BG = 0x0a0705;

/** Số giả ngẫu nhiên có hạt giống (ảnh gạch lần nào cũng như nhau). */
function rng(seed) {
  return () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
}

/**
 * Ảnh bề mặt 2 m × 2 m: hàng viên (gạch / đá) so le, mạch vữa; trả về { map, normalMap }.
 * rows: số hàng trong 2 m; len: [ngắn nhất, dài nhất] của một viên (m); hue/sat/lit: màu viên (khoảng), mortar: màu vữa.
 */
function masonry({ size = 1024, rows, len, hue, sat, lit, mortar, joint = 0.012, seed = 7, rough = 0.5 }) {
  const rnd = rng(seed), px = size / 2;                      // điểm ảnh mỗi mét
  const col = document.createElement('canvas'), hgt = document.createElement('canvas');
  col.width = col.height = hgt.width = hgt.height = size;
  const g = col.getContext('2d'), h = hgt.getContext('2d');
  g.fillStyle = mortar; g.fillRect(0, 0, size, size);
  h.fillStyle = '#000'; h.fillRect(0, 0, size, size);
  const rh = size / rows, j = Math.max(2, joint * px);
  for (let r = 0; r < rows; r++) {
    let x = -rnd() * len[1] * px;
    while (x < size) {
      const w = (len[0] + rnd() * (len[1] - len[0])) * px;
      const L = lit[0] + rnd() * (lit[1] - lit[0]);
      const c = `hsl(${hue[0] + rnd() * (hue[1] - hue[0])} ${sat[0] + rnd() * (sat[1] - sat[0])}% ${L}%)`;
      // viên tràn mép phải thì vẽ thêm một lần ở mép trái: ảnh lặp liền mạch
      for (const ox of [0, -size]) {
        const x0 = x + ox + j / 2, y0 = r * rh + j / 2, ww = w - j, hh = rh - j;
        if (x0 + ww < 0 || x0 > size) continue;
        g.fillStyle = c; g.fillRect(x0, y0, ww, hh);
        // mặt viên: sáng tối dần từ một đầu sang đầu kia (không vệt tròn: trông lốm đốm)
        const shade = g.createLinearGradient(x0, y0, x0 + ww, y0 + hh * rnd());
        const tone = rnd() < 0.5 ? '0,0,0' : '255,240,220', k0 = 0.03 + rnd() * 0.05;
        shade.addColorStop(0, `rgba(${tone},${k0})`); shade.addColorStop(1, `rgba(${tone},0)`);
        g.fillStyle = shade; g.fillRect(x0, y0, ww, hh);
        // độ cao: mặt viên phẳng, cạnh vát xuống mạch vữa
        const grd = h.createLinearGradient(0, y0, 0, y0 + hh);
        grd.addColorStop(0, '#9a9a9a'); grd.addColorStop(0.12, '#e0e0e0'); grd.addColorStop(0.88, '#e0e0e0'); grd.addColorStop(1, '#8a8a8a');
        h.fillStyle = grd; h.fillRect(x0, y0, ww, hh);
        h.fillStyle = 'rgba(0,0,0,0.35)'; h.fillRect(x0, y0, 3, hh); h.fillRect(x0 + ww - 3, y0, 3, hh);
      }
      x += w;
    }
  }
  // hạt li ti trên cả mặt (đá, vữa)
  const img = g.getImageData(0, 0, size, size), d = img.data;
  for (let i = 0; i < d.length; i += 4) { const n = (rnd() - 0.5) * 10; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
  g.putImageData(img, 0, 0);
  // pháp tuyến từ độ cao (sai phân trung tâm, lặp ở mép)
  const H = h.getImageData(0, 0, size, size).data, nimg = h.createImageData(size, size), N = nimg.data;
  const at = (x, y) => H[(((y + size) % size) * size + ((x + size) % size)) * 4] / 255;
  const k = 2.2 * rough;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const dx = (at(x + 1, y) - at(x - 1, y)) * k, dy = (at(x, y + 1) - at(x, y - 1)) * k;
    const l = Math.hypot(dx, dy, 1), i = (y * size + x) * 4;
    N[i] = (-dx / l * 0.5 + 0.5) * 255; N[i + 1] = (dy / l * 0.5 + 0.5) * 255; N[i + 2] = (1 / l * 0.5 + 0.5) * 255; N[i + 3] = 255;
  }
  const ncv = document.createElement('canvas');
  ncv.width = ncv.height = size;
  ncv.getContext('2d').putImageData(nimg, 0, 0);
  const tex = (c, srgb) => {
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 4;
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };
  return { map: tex(col, true), normalMap: tex(ncv, false) };
}

// ---- lửa: quad đứng (trục y) quay theo camera; trong quad: quầng sáng tròn mềm, ngọn lửa hình giọt lay theo thời gian
const FLAME_VERT = /* glsl */`
  attribute vec3 offset; attribute float size; attribute float phase;
  uniform float time; varying vec2 vUv; varying float vPh;
  #include <common>
  #include <logdepthbuf_pars_vertex>
  void main() {
    vUv = uv; vPh = phase;
    vec3 right = normalize(vec3(viewMatrix[0][0], 0.0, viewMatrix[2][0]));   // hàng đầu của ma trận nhìn, bỏ phần đứng
    float s = size * (1.0 + 0.06 * sin(time * 9.0 + phase * 7.0));
    vec3 p = offset + right * position.x * s * 1.6 + vec3(0.0, 1.0, 0.0) * (position.y * s * 1.6 + s * 0.35);
    gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
    #include <logdepthbuf_vertex>
  }`;
const FLAME_FRAG = /* glsl */`
  uniform float time; uniform float glow; varying vec2 vUv; varying float vPh;
  #include <logdepthbuf_pars_fragment>
  void main() {
    #include <logdepthbuf_fragment>
    vec2 q = vUv - 0.5;                          // -0,5..0,5; ngọn lửa ở giữa, đáy ở q.y = -0,22
    float t = time * 1.0 + vPh * 10.0;
    float y = (q.y + 0.22) / 0.5;                // 0 ở đáy ngọn lửa, 1 ở đỉnh
    float sway = (sin(t * 5.3) * 0.5 + sin(t * 8.7 + 1.3) * 0.3) * 0.045 * y * y;
    float x = q.x - sway;
    // giọt lửa: rộng ở dưới, nhọn ở trên
    float w = 0.13 * pow(max(0.0, 1.0 - y), 0.6) * smoothstep(-0.12, 0.12, y + 0.05);
    float body = smoothstep(w, w * 0.35, abs(x)) * step(-0.08, y) * step(y, 1.0);
    float core = smoothstep(w * 0.55, 0.0, abs(x)) * smoothstep(0.55, 0.0, y) * step(-0.05, y);
    vec3 col = mix(vec3(1.0, 0.36, 0.06), vec3(1.0, 0.78, 0.35), smoothstep(0.85, 0.15, y));
    col = mix(col, vec3(1.0, 0.97, 0.85), core);
    float a = body * (0.85 - 0.25 * y);
    // quầng: tròn mềm quanh gốc ngọn lửa, chập chờn
    float r = length(vec2(q.x, q.y + 0.05)) * 2.0;
    float flick = 0.85 + 0.15 * sin(t * 13.0) * sin(t * 3.1);
    float halo = glow * pow(max(0.0, 1.0 - r), 2.2) * 0.35 * flick;
    gl_FragColor = vec4(col * a + vec3(1.0, 0.62, 0.28) * halo, 1.0);
  }`;

const SIZE = { torch: 0.26, big: 0.075, candle: 0.045 };
const POWER = { torch: 7, big: 3.5 };

/** Hầm mộ của khu `zone` (null nếu khu khác). layout: lights, signs; root: cảnh của khu. */
export function makeCrypt({ scene, root, zone, layout, calm, phone }) {
  if (zone !== 'grotte') return null;
  const disposers = [];
  const own = (x) => { disposers.push(() => x.dispose?.()); return x; };

  // ---- bề mặt
  const S = {
    grt_brick: masonry({ rows: 11, len: [0.32, 0.62], hue: [14, 30], sat: [32, 48], lit: [26, 40], mortar: '#5a4a3c', seed: 11, rough: 0.8 }),
    grt_stone: masonry({ rows: 6, len: [0.5, 0.9], hue: [30, 40], sat: [18, 28], lit: [52, 62], mortar: '#6e6050', seed: 23, joint: 0.008 }),
    grt_floor: masonry({ rows: 3, len: [0.7, 1.2], hue: [24, 34], sat: [10, 18], lit: [24, 34], mortar: '#1c1612', seed: 37, joint: 0.01, rough: 0.6 }),
    grt_plaster: masonry({ rows: 1, len: [3, 3], hue: [22, 28], sat: [22, 28], lit: [24, 28], mortar: '#3a2c22', seed: 41, joint: 0.001, rough: 0.2 }),
  };
  for (const s of Object.values(S)) { own(s.map); own(s.normalMap); }
  root.traverse(o => {
    const m = o.material;
    if (!o.isMesh || !m || !S[m.name] || m.userData.crypt) return;
    m.userData.crypt = true;
    m.map = S[m.name].map;
    m.normalMap = S[m.name].normalMap;
    m.normalScale.setScalar(m.name === 'grt_plaster' ? 0.4 : 1);
    m.color.setRGB(1, 1, 1);
    m.roughness = 0.88;
    m.metalness = 0;
    m.needsUpdate = true;
  });

  // ---- lửa và thân nến
  const lights = layout.lights || [];
  const geo = new THREE.InstancedBufferGeometry();
  const quad = new THREE.PlaneGeometry(1, 1);
  geo.index = quad.index;
  geo.setAttribute('position', quad.getAttribute('position'));
  geo.setAttribute('uv', quad.getAttribute('uv'));
  const off = new Float32Array(lights.length * 3), size = new Float32Array(lights.length), phase = new Float32Array(lights.length);
  const wax = lights.filter(l => l.k === 'candle');
  const body = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.022, 0.025, 1, 10), new THREE.MeshStandardMaterial({ color: 0xf1e6cc, roughness: 0.55, emissive: 0x3a2008 }), wax.length);
  const mtx = new THREE.Matrix4(), rnd = rng(5);
  let w = 0;
  lights.forEach((l, i) => {
    let [x, y, z] = l.p;
    if (l.k === 'candle') {
      const h = 0.1 + rnd() * 0.12;                           // nến cao thấp khác nhau
      mtx.makeScale(1, h, 1).setPosition(x, y + h / 2, z);
      body.setMatrixAt(w++, mtx);
      y += h + 0.01;
    }
    off.set([x, y, z], i * 3);
    size[i] = SIZE[l.k] || 0.05;
    phase[i] = rnd();
  });
  geo.setAttribute('offset', new THREE.InstancedBufferAttribute(off, 3));
  geo.setAttribute('size', new THREE.InstancedBufferAttribute(size, 1));
  geo.setAttribute('phase', new THREE.InstancedBufferAttribute(phase, 1));
  geo.instanceCount = lights.length;
  const fmat = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 }, glow: { value: 1 } }, vertexShader: FLAME_VERT, fragmentShader: FLAME_FRAG,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const flames = new THREE.Mesh(geo, fmat);
  flames.frustumCulled = false;
  flames.renderOrder = 10;
  const group = new THREE.Group();
  group.add(flames, body);
  scene.add(group);
  own(geo); own(quad); own(fmat); own(body.geometry); own(body.material);

  // ---- ánh lửa: N đèn điểm đặt ở các đuốc / chân nến gần mình nhất (chọn lại 4 lần mỗi giây), bật dần khi đổi chỗ
  const src = lights.filter(l => POWER[l.k]).map(l => ({ p: new THREE.Vector3(l.p[0], l.p[1] + 0.25, l.p[2]), k: l.k, ph: rnd() * 10 }));
  const pool = Array.from({ length: phone ? 3 : 6 }, () => {
    const L = new THREE.PointLight(0xff9a48, 0, 11, 1.7);
    group.add(L);
    return { L, s: null, f: 0 };
  });
  let pick = 0;
  function choose(at) {
    const near = src.map(s => [s, s.p.distanceToSquared(at)]).sort((a, b) => a[1] - b[1]).slice(0, pool.length).map(x => x[0]);
    const keep = new Set(near);
    const freeSlots = pool.filter(e => !e.s || !keep.has(e.s));
    for (const s of near) {
      if (pool.some(e => e.s === s)) continue;
      const e = freeSlots.shift();
      if (!e) break;
      Object.assign(e, { s, f: 0 });
      e.L.position.copy(s.p);
    }
  }

  // ---- biển đá khắc tên hành lang
  const signs = new THREE.Group();
  group.add(signs);
  const KEY = Object.fromEntries(Object.entries(GALLERIES).flatMap(([g, keys]) => keys.map((k, i) => [k, { g, n: keys.length > 1 ? i + 1 : 0 }])));
  fontsReady().then(() => {
    if (gone) return;
    for (const s of layout.signs || []) {
      const info = KEY[s.key], grp = info && EXHIBIT_GROUPS.find(x => x.id === info.g);
      if (!grp) continue;
      const name = (getLang() === 'en' ? grp.en : grp.name) + (info.n ? ` ${['I', 'II', 'III', 'IV', 'V', 'VI'][info.n - 1]}` : '');
      // biển dễ thấy để định hướng: nền đá sẫm, viền và chữ mạ vàng, tự sáng nhẹ (hầm tối, đuốc ở xa vẫn đọc được)
      const W = 2048, H = 420;
      const c = document.createElement('canvas');
      c.width = W; c.height = H;
      const g = c.getContext('2d');
      const bg = g.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#2a2620'); bg.addColorStop(1, '#16130f');
      g.fillStyle = bg; g.fillRect(0, 0, W, H);
      g.strokeStyle = '#d9b265'; g.lineWidth = 18; g.strokeRect(14, 14, W - 28, H - 28);
      g.strokeStyle = 'rgba(217,178,101,0.55)'; g.lineWidth = 5; g.strokeRect(44, 44, W - 88, H - 88);
      const text = name.normalize('NFC').toLocaleUpperCase(getLang() === 'en' ? 'en' : 'vi');
      let fs = 170;
      do { g.font = `700 ${fs}px 'Cormorant Garamond', 'Times New Roman', serif`; g.letterSpacing = `${Math.round(fs / 12)}px`; fs -= 4; } while (g.measureText(text).width > W - 200 && fs > 60);
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillStyle = 'rgba(0,0,0,0.6)'; g.fillText(text, W / 2 + 4, H / 2 + 10);
      const gold = g.createLinearGradient(0, H * 0.3, 0, H * 0.7);
      gold.addColorStop(0, '#ffe7a8'); gold.addColorStop(1, '#d7a64a');
      g.fillStyle = gold; g.fillText(text, W / 2, H / 2 + 6);
      const tex = own(new THREE.CanvasTexture(c));
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      const m = new THREE.Mesh(own(new THREE.PlaneGeometry(3.2, 3.2 * H / W)), own(new THREE.MeshStandardMaterial({
        map: tex, emissiveMap: tex, emissive: 0xffffff, emissiveIntensity: 0.55, roughness: 0.6, fog: false })));
      m.position.set(...s.p);
      m.rotation.y = Math.atan2(s.face[0], s.face[1]);
      signs.add(m);
    }
  });

  // khu tối hẳn: sương tối che hành lang xa, nền đen ấm
  const fogWas = scene.fog;
  scene.fog = new THREE.Fog(BG, 9, 42);
  let gone = false, time = 0;
  const flick = (t, ph) => (calm ? 1 : 0.82 + 0.1 * Math.sin(t * 7.3 + ph) + 0.08 * Math.sin(t * 17.1 + ph * 3));

  return {
    /** Sau sky.update: thay ánh trời bằng bóng tối của hầm, cập nhật lửa và đèn. */
    update(dt, { hemi, sun, renderer, me }) {
      time += calm ? 0 : dt;
      fmat.uniforms.time.value = time;
      hemi.color.set(0x8a6448); hemi.groundColor.set(0x1c130c); hemi.intensity = 0.32;
      sun.intensity = 0;
      renderer.toneMappingExposure = 1.05;
      if (scene.environment) scene.environmentIntensity = 0.06;
      if (me && (pick -= dt) <= 0) { pick = 0.25; choose(me.pos); }
      for (const e of pool) {
        if (!e.s) continue;
        e.f = Math.min(1, e.f + dt * 3);
        e.L.intensity = POWER[e.s.k] * e.f * flick(time, e.s.ph);
      }
    },
    dispose() {
      gone = true;
      scene.remove(group);
      scene.fog = fogWas;
      for (const e of pool) e.L.dispose();
      disposers.forEach(f => f());
    },
  };
}
