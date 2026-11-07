/**
 * Luồng nắng trong Đền thờ Thánh Phê-rô (khu 'vatican-in', world.js): như ảnh chụp thật, nắng lọt qua các cửa sổ tầng trống
 * vòm thành những cột sáng xiên xuống gian giữa, bụi lấp lánh trong luồng, đọng thành vệt sáng trên nền đá.
 * Theo mặt trời thật (sky.js `sun`, hướng địa lý của Đền thờ: hậu cung ở phía tây, cửa chính quay về phía đông):
 * sáng sớm nắng qua cửa sổ bán nguyệt trên cửa chính chạy dọc gian giữa; nắng xiên qua 16 cửa sổ tầng trống phía có mặt trời;
 * trưa nắng cao thì rọi thẳng qua mắt đèn lồng đỉnh vòm; chiều tà luồng nắng ngả vàng; tối thì tắt.
 * Không thêm đèn three.js: mỗi luồng là một ống mờ cộng sáng (sáng giữa, mờ ở mép, nhạt dần xuống dưới), vẽ sau mọi vật đặc.
 */
import * as THREE from 'three';

// toạ độ trong cảnh (glTF: x = x Blender, y = độ cao, z = -y Blender); kích thước ở build_vatican_interior.py
const CR = 20.75;                         // bán kính tầng trống (lòng vòm 41,5 m)
const DRUM = { y: 63, w: 3.4, h: 10 };    // 16 cửa sổ tầng trống: tâm ở độ cao 63 m, rộng 3,4 m, cao 10 m
const EYE = { y: 113, r: 3.2 };           // mắt đèn lồng
const LUNETTE = { y: 36, z: 108.3, w: 10, h: 6 }; // cửa sổ bán nguyệt trên cửa chính (quay về phía đông, +z)
const MOTES = 40;                         // hạt bụi mỗi luồng
const DEG = Math.PI / 180;
const WARM = new THREE.Color(1.0, 0.7, 0.4), WHITE = new THREE.Color(1.0, 0.95, 0.84);

const VERT = `
#include <common>
#include <logdepthbuf_pars_vertex>
varying vec3 vN; varying vec3 vV; varying vec2 vUv; varying vec3 vW;
void main() {
  vUv = uv;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vN = normalize(normalMatrix * normal);
  vV = normalize(-mv.xyz);
  vW = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * mv;
  #include <logdepthbuf_vertex>
}`;
const FRAG = `
#include <common>
#include <logdepthbuf_pars_fragment>
uniform vec3 uColor; uniform float uK, uTime;
varying vec3 vN; varying vec3 vV; varying vec2 vUv; varying vec3 vW;
void main() {
  #include <logdepthbuf_fragment>
  // giữa luồng (mặt ống quay về mắt) sáng, mép mờ hẳn: ống trông như khối sáng chứ không như cái ống
  float e = abs(dot(normalize(vN), normalize(vV)));
  e = smoothstep(0.1, 0.95, e);
  float a = 1.0 - vUv.y;                  // 0 ở cửa sổ .. 1 ở nền
  float along = smoothstep(0.0, 0.05, a) * mix(1.0, 0.4, a);
  // vệt sáng tối dọc luồng (bụi trong không khí), trôi rất chậm
  float st = 0.7 + 0.3 * sin(vUv.x * 37.7 + uTime * 0.07) * sin(vUv.x * 15.7 - uTime * 0.05 + a * 3.0);
  // chỉ sáng trong khoảng không cao của Đền thờ: dưới vòm (tầng trống, mặt cắt tròn) và lòng bốn cánh (rộng 24 m, vòm
  // cuốn tới 45,5 m); lối đi bên thấp, có trần riêng: nắng không tới
  float r = length(vW.xz);
  float air = max(1.0 - smoothstep(21.0, 23.0, r),
    max((1.0 - smoothstep(11.5, 12.8, abs(vW.x))), (1.0 - smoothstep(11.5, 12.8, abs(vW.z)))) * (1.0 - smoothstep(44.0, 47.0, vW.y)));
  // đi xuyên qua luồng: sát mắt thì nhạt đi, không thành bức tường trắng
  float near = smoothstep(1.0, 7.0, length(vW - cameraPosition));
  gl_FragColor = vec4(uColor * (uK * e * along * st * near * air), 1.0);
}`;
const POOL_FRAG = `
#include <common>
#include <logdepthbuf_pars_fragment>
uniform vec3 uColor; uniform float uK;
varying vec2 vUv;
void main() {
  #include <logdepthbuf_fragment>
  float r = length(vUv * 2.0 - 1.0);
  gl_FragColor = vec4(uColor * (uK * (1.0 - smoothstep(0.25, 1.0, r))), 1.0);
}`;
const POOL_VERT = `
#include <common>
#include <logdepthbuf_pars_vertex>
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  #include <logdepthbuf_vertex>
}`;

/** Đốm bụi tròn mềm. */
function moteTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 32;
  const g = c.getContext('2d'), gr = g.createRadialGradient(16, 16, 0, 16, 16, 16);
  gr.addColorStop(0, 'rgba(255,255,255,1)');
  gr.addColorStop(0.4, 'rgba(255,255,255,0.45)');
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr;
  g.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(c);
}

/**
 * @param {{ scene: THREE.Scene, root: THREE.Object3D, zone: string, calm: boolean, walkable?: (x: number, z: number) => boolean }} o
 *   root: cảnh của khu, chặn nắng: mỗi luồng dừng ở mặt tường / vòm / nền đầu tiên nó gặp
 * @returns {{ update(sun: { az, el, day }): void, dispose(): void } | null} null ở khu không có luồng nắng
 */
export function makeBeams({ scene, root, zone, calm, walkable }) {
  if (zone !== 'vatican-in') return null;
  // vật chặn nắng: mọi mặt đặc của khu (tượng ảnh quay theo camera thì bỏ qua)
  root.updateMatrixWorld(true);
  const blockers = [];
  root.traverse(o => { if (o.isMesh && o.visible && !/^ph_/.test(o.material?.name || '')) blockers.push(o); });
  const ray = new THREE.Raycaster();
  const lastS = new THREE.Vector3();
  const group = new THREE.Group();
  group.name = 'light_beams';
  scene.add(group);
  const time = { value: 0 };
  const geo = new THREE.CylinderGeometry(1, 1.25, 1, 28, 1, true).translate(0, -0.5, 0); // đỉnh ở cửa sổ, đáy loe ra
  const poolGeo = new THREE.PlaneGeometry(2, 2).rotateX(-Math.PI / 2);
  const look = { transparent: true, depthWrite: false, blending: THREE.AdditiveBlending };

  // các ô sáng: tâm, pháp tuyến ra ngoài (ngang), chiều ngang, nửa rộng / nửa cao; kind quyết định lúc nào sáng
  const wins = [];
  for (let k = 0; k < 16; k++) {
    const p = k * Math.PI / 8, n = new THREE.Vector3(Math.cos(p), 0, Math.sin(p));
    wins.push({ kind: 'drum', c: n.clone().multiplyScalar(CR - 0.5).setY(DRUM.y), n, t: new THREE.Vector3(-n.z, 0, n.x), w: DRUM.w / 2, h: DRUM.h / 2 });
  }
  wins.push({ kind: 'eye', c: new THREE.Vector3(0, EYE.y, 0), n: null, t: new THREE.Vector3(1, 0, 0), w: EYE.r, h: EYE.r });
  wins.push({ kind: 'lunette', c: new THREE.Vector3(0, LUNETTE.y, LUNETTE.z - 0.3), n: new THREE.Vector3(0, 0, 1), t: new THREE.Vector3(1, 0, 0), w: LUNETTE.w / 2, h: LUNETTE.h / 2 });

  for (const w of wins) {
    w.u = { uColor: { value: new THREE.Color() }, uK: { value: 0 }, uTime: time };
    w.beam = new THREE.Mesh(geo, new THREE.ShaderMaterial({ ...look, uniforms: w.u, vertexShader: VERT, fragmentShader: FRAG, side: THREE.DoubleSide }));
    w.pu = { uColor: w.u.uColor, uK: { value: 0 } };
    w.pool = new THREE.Mesh(poolGeo, new THREE.ShaderMaterial({ ...look, uniforms: w.pu, vertexShader: POOL_VERT, fragmentShader: POOL_FRAG }));
    for (const m of [w.beam, w.pool]) {
      m.matrixAutoUpdate = false;
      m.frustumCulled = false;
      m.renderOrder = 10;
      m.visible = false;
      group.add(m);
    }
    w.pool.renderOrder = 9;
    // bụi: vị trí trong luồng (đoạn dưới, gần chỗ người đứng nhìn), góc và bán kính trong mặt cắt, pha lấp lánh
    w.seeds = Array.from({ length: MOTES }, () => [0.5 + 0.5 * Math.random(), Math.random() * 2 * Math.PI, Math.sqrt(Math.random()) * 0.85, Math.random() * 7]);
  }
  const N = wins.length * MOTES;
  const pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
  const pg = new THREE.BufferGeometry();
  pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  pg.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const sprite = moteTexture();
  const motes = new THREE.Points(pg, new THREE.PointsMaterial({ ...look, size: 0.14, map: sprite, vertexColors: true, sizeAttenuation: true }));
  motes.frustumCulled = false;
  motes.renderOrder = 11;
  group.add(motes);

  const S = new THREE.Vector3(), Sh = new THREE.Vector3(), d = new THREE.Vector3();
  const U = new THREE.Vector3(), W = new THREE.Vector3(), Y = new THREE.Vector3(), tmp = new THREE.Vector3(), color = new THREE.Color();
  const up = new THREE.Vector3(0, 1, 0);
  const sstep = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

  return {
    update(sun) {
      if (!calm) time.value = performance.now() / 1000;
      const el = sun.el;
      // hướng về mặt trời, theo địa lý: bắc là +x, đông là +z
      S.set(Math.cos(sun.az) * Math.cos(el), Math.sin(el), Math.sin(sun.az) * Math.cos(el));
      Sh.set(S.x, 0, S.z).normalize();
      d.copy(S).negate();                 // nắng đi vào
      const light = sstep(0.35, 0.8, sun.day) * sstep(3 * DEG, 12 * DEG, el);
      color.copy(WARM).lerp(WHITE, sstep(6 * DEG, 35 * DEG, el));
      const t = time.value;
      // chỗ mỗi luồng chạm vật đặc: tính lại khi mặt trời dịch quá chừng 0,2° (vài chục giây một lần)
      if (light > 0.002 && S.angleTo(lastS) > 0.0035) {
        lastS.copy(S);
        for (const w of wins) {
          // tia giữa luồng; mép luồng lọt qua vòm sang lối đi bên thì shader tắt (AIR)
          ray.set(tmp.copy(w.c).addScaledVector(d, 0.8), d);
          ray.far = 300;
          const hit = ray.intersectObjects(blockers, false)[0];
          w.L = hit ? hit.distance + 0.8 : Math.min(260, w.c.y / Math.max(0.12, -d.y));
          w.floor = !!hit && hit.point.y < 0.6 && (!walkable || walkable(hit.point.x, hit.point.z));
        }
      }
      let i = 0;
      for (const w of wins) {
        let k = 0;
        if (w.kind === 'drum') k = 0.5 * sstep(0.3, 0.85, w.n.dot(Sh)) * (1 - sstep(68 * DEG, 84 * DEG, el));
        else if (w.kind === 'eye') k = 0.5 * sstep(55 * DEG, 78 * DEG, el);
        else k = 0.5 * sstep(0.25, 0.75, Sh.z) * (1 - sstep(35 * DEG, 60 * DEG, el));
        k *= light;
        const on = k > 0.002 && w.L > 3;
        w.beam.visible = w.pool.visible = on;
        if (on) {
          // mặt cắt luồng: chiều ngang của cửa sổ, chiều cao của nó chiếu vuông góc với tia nắng
          U.copy(w.t).addScaledVector(d, -w.t.dot(d)).normalize();
          W.crossVectors(d, U).normalize();
          const rw = w.rw = Math.max(0.8, w.h * (w.kind === 'eye' ? 1 : Math.abs(W.y)));
          const L = w.L;
          Y.copy(d).multiplyScalar(-L);
          w.beam.matrix.makeBasis(tmp.copy(U).multiplyScalar(w.w), Y, W.clone().multiplyScalar(rw)).setPosition(w.c);
          w.u.uK.value = k;
          // vệt sáng trên nền: hình cửa sổ kéo dài theo hướng nắng; chỉ khi luồng chạm nền trong nhà (không chạm tường)
          const fx = w.c.x + d.x * L, fz = w.c.z + d.z * L;
          w.pool.visible = w.floor;
          if (w.floor) {
            const along = tmp.set(d.x, 0, d.z);
            const len = along.length();
            if (len > 1e-3) along.divideScalar(len); else along.set(1, 0, 0);
            const side = new THREE.Vector3(-along.z, 0, along.x);
            const r1 = w.w * 1.25, r2 = Math.min(30, rw * 1.25 / Math.max(0.2, Math.sin(el)));
            w.pool.matrix.makeBasis(side.multiplyScalar(r1), up, along.multiplyScalar(r2)).setPosition(fx, 0.04, fz);
            w.pu.uK.value = k * 0.9;
          }
        }
        // bụi
        for (const [a, ang, r, ph] of w.seeds) {
          const o = i * 3;
          if (!on) { col[o] = col[o + 1] = col[o + 2] = 0; i++; continue; }
          const L = w.L, rw = w.rw;
          const sway = calm ? 0 : 0.25 * Math.sin(t * 0.3 + ph);
          const ca = Math.cos(ang + sway * 0.4) * r, sa = Math.sin(ang + sway * 0.4) * r;
          const aa = calm ? a : 0.5 + ((a - 0.5 + t * 0.004 * (1 + ph % 1)) % 0.5);
          const spread = 1 + 0.25 * aa;
          pos[o] = w.c.x + d.x * L * aa + (U.x * w.w * ca + W.x * rw * sa) * spread;
          pos[o + 1] = w.c.y + d.y * L * aa + (U.y * w.w * ca + W.y * rw * sa) * spread + sway * 0.3;
          pos[o + 2] = w.c.z + d.z * L * aa + (U.z * w.w * ca + W.z * rw * sa) * spread;
          const tw = calm ? 0.7 : 0.45 + 0.55 * Math.max(0, Math.sin(t * 1.3 + ph * 3));
          const b = Math.min(1, k * 7) * tw;
          col[o] = color.r * b; col[o + 1] = color.g * b; col[o + 2] = color.b * b;
          i++;
        }
        w.u.uColor.value.copy(color);
      }
      pg.attributes.position.needsUpdate = true;
      pg.attributes.color.needsUpdate = true;
      group.visible = light > 0.002;
    },
    dispose() {
      scene.remove(group);
      geo.dispose(); poolGeo.dispose(); pg.dispose(); sprite.dispose();
      for (const w of wins) { w.beam.material.dispose(); w.pool.material.dispose(); }
      motes.material.dispose();
    },
  };
}
