// Bụi vàng lơ lửng trong lòng nhà thờ Sài Gòn: vài trăm đốm sáng nhỏ trôi chậm trong không khí (ánh nến, nắng), làm gian
// giữa ấm và sống động. Một lớp Points cộng sáng, chuyển động tính trong shader (không tốn CPU); giảm chuyển động thì
// gần như đứng yên, chỉ lấp lánh rất chậm.
import * as THREE from 'three';

// vùng có bụi theo toạ độ three.js; tints: màu đốm (lặp lại theo tỉ lệ), size: cỡ đốm
const ZONES = {
  // lòng nhà thờ (build_church_saigon.py: x ±7,5, mặt tiền z 5, cung thánh tới z −24)
  saigon: { box: { x: 7.2, z0: -22, z1: 4.6, y0: 0.6, y1: 9 }, n: 420, tints: [[1, 1, 1]], size: 1, gain: 0.8 },
  // trường quay: không có bụi (người dùng bỏ 2026-11-05)
};

export function makeMotes({ scene, zone, calm }) {
  const cfg = ZONES[zone];
  if (!cfg) return null;
  const BOX = cfg.box, N = cfg.n;
  const c = document.createElement('canvas');
  c.width = c.height = 32;
  const g = c.getContext('2d'), r = g.createRadialGradient(16, 16, 0, 16, 16, 16);
  r.addColorStop(0, 'rgba(255,248,220,1)');
  r.addColorStop(0.3, 'rgba(255,214,130,0.6)');
  r.addColorStop(1, 'rgba(255,190,90,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 32, 32);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;

  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const pos = new Float32Array(N * 3), ph = new Float32Array(N), tint = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos.set([(rnd() * 2 - 1) * BOX.x, BOX.y0 + rnd() * (BOX.y1 - BOX.y0), BOX.z0 + rnd() * (BOX.z1 - BOX.z0)], i * 3);
    ph[i] = rnd() * 100;
    tint.set(cfg.tints[Math.floor(rnd() * cfg.tints.length)], i * 3);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('phase', new THREE.BufferAttribute(ph, 1));
  geo.setAttribute('tint', new THREE.BufferAttribute(tint, 3));
  const H = BOX.y1 - BOX.y0;
  const uni = { time: { value: 0 }, map: { value: tex }, speed: { value: calm ? 0.08 : 1 }, glow: { value: 1 }, px: { value: 1 },
    y0: { value: BOX.y0 }, h: { value: H }, size: { value: cfg.size }, gain: { value: cfg.gain } };
  const mat = new THREE.ShaderMaterial({
    uniforms: uni, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */`
      attribute float phase;
      attribute vec3 tint;
      uniform float time, speed, px, y0, h, size;
      varying float vA;
      varying vec3 vT;
      #include <common>
      #include <logdepthbuf_pars_vertex>
      void main() {
        float t = time * speed + phase;
        vec3 p = position;
        // trôi lên rất chậm, lượn ngang; lên tới trần thì quay lại sàn (mờ dần hai đầu)
        float rise = mod(p.y - y0 + t * 0.06, h);
        p.y = y0 + rise;
        p.x += sin(t * 0.21) * 0.35;
        p.z += cos(t * 0.17 + phase) * 0.35;
        vA = smoothstep(0.0, 0.8, rise) * (1.0 - smoothstep(h - 1.0, h, rise)) * (0.55 + 0.45 * sin(t * 1.3 + phase * 3.0));
        vT = tint;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = px * size * (0.05 + 0.03 * fract(phase)) * 600.0 / -mv.z;
        #include <logdepthbuf_vertex>
      }`,
    fragmentShader: /* glsl */`
      uniform sampler2D map;
      uniform float glow, gain;
      varying float vA;
      varying vec3 vT;
      #include <logdepthbuf_pars_fragment>
      void main() {
        #include <logdepthbuf_fragment>
        vec4 c = texture2D(map, gl_PointCoord);
        gl_FragColor = vec4(c.rgb * vT * c.a * vA * glow * gain, 1.0);
      }`,
  });
  const pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false;
  pts.name = 'gold_motes';
  scene.add(pts);
  return {
    /** dt: giây; dark 0..1 (đêm thì đốm sáng hơn một chút, như ánh nến). */
    update(dt, dark = 0, pixelRatio = 1) {
      uni.time.value += dt;
      uni.glow.value = 0.8 + 0.5 * dark;
      uni.px.value = pixelRatio;
    },
    dispose() { scene.remove(pts); geo.dispose(); mat.dispose(); tex.dispose(); },
  };
}
