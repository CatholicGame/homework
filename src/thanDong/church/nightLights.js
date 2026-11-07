/**
 * Vatican về đêm (Nhà thờ Online, world.js): như Đền thờ Thánh Phê-rô thật mỗi tối, đèn pha vàng ấm chiếu từ dưới quảng
 * trường lên mặt tiền, hàng cột, tháp đá và mái vòm; tượng (ảnh thật, vật liệu ph_*) được rọi riêng, sáng ở chân và nhạt dần lên
 * đầu; bốn cây đèn đồng quanh tháp đá thắp sáng, có quầng sáng và vũng sáng trên nền. Trong Đền thờ: tượng rọi ấm như dưới
 * ánh nến. Tất cả theo độ tối của trời (sky.js: 0 ban ngày, 1 ban đêm), không thêm đèn three.js (nhẹ cho điện thoại):
 * đèn pha là một lớp phát sáng thêm vào vật liệu đá (onBeforeCompile), sáng theo hướng mặt đá quay về phía đèn và theo độ cao.
 */
import * as THREE from 'three';

// đèn pha: màu (khoảng 2700 K), nguồn ảo đặt thấp giữa tháp đá và mặt tiền, đủ để mọi mặt quay về quảng trường sáng
const FLOOD_COLOR = new THREE.Color(0xffc68c);
const FLOOD_AT = new THREE.Vector3(0, 1, -30);
// vật liệu đá của quảng trường được chiếu sáng, kèm hệ số (mái chì của mái vòm tối hơn, phố xá chỉ hơi ánh lên)
const FLOOD = [
  [/^vat_(travertine|travertine_shade|marble|colonnade_ceiling|palace|red_granite|grey_granite|clock_face)$/, 1],
  [/^vat_(statue_marble|statue_hair|sculpt_marble)$/, 1], // tượng thánh Phê-rô (statue_figures.py: bản tạc vat_sculpt_)
  [/^vat_(lead|gold|bronze)$/, 0.7],
  [/^vat_(roof_tiles|colonnade_roof)$/, 0.35],
  [/^vat_plaster_\d+$/, 0.12],
  // nền đá lát: mặt nằm ngang, đèn pha thấp không chiếu tới nên rọi đều như ánh đèn cao quanh quảng trường hắt xuống
  [/^vat_(sampietrini|paving_strip)$/, 0.55, true],
];
const GLOBE = /^vat_lamp_globe$/;
// bốn cây đèn đồng (1852) quanh tháp đá: tâm (x, z) của cây, bốn bóng trên cánh tay ở 6,55 m và một bóng ở đỉnh 7,2 m
const CANDELABRA = [45, 135, 225, 315].map(d => [15 * Math.cos(d * Math.PI / 180), -15 * Math.sin(d * Math.PI / 180)]);

// đồng phục dùng chung cho mọi vật liệu đã vá (cả hai khu cùng một trời)
const U = {
  uFlood: { value: 0 }, uFloodColor: { value: FLOOD_COLOR }, uFloodView: { value: new THREE.Vector3() },
  uNight: { value: 0 }, uTint: { value: new THREE.Color(1.08, 0.92, 0.7) },
};

/** Đá được đèn pha chiếu: thêm phát sáng = màu đá × màu đèn × (mặt quay về đèn) × (thấp sáng hơn cao). */
function floodPatch(m, k, flat = false) {
  if (m.userData.night) return;
  m.userData.night = 'flood';
  const prev = m.onBeforeCompile, prevKey = m.customProgramCacheKey;   // nối tiếp bản vá khác (nhìn xuyên vật che: occlusion.js)
  m.onBeforeCompile = (sh, r) => {
    prev?.call(m, sh, r);
    Object.assign(sh.uniforms, U, { uFloodK: { value: k } });
    if (flat) sh.defines = { ...sh.defines, FLOOD_FLAT: '' };
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying float vFloodY;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvFloodY = (modelMatrix * vec4(transformed, 1.0)).y;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vFloodY;\nuniform float uFlood, uFloodK;\nuniform vec3 uFloodColor, uFloodView;')
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        {
          #ifdef FLOOD_FLAT
            totalEmissiveRadiance += uFloodColor * diffuseColor.rgb * uFlood * uFloodK;
          #else
            vec3 toL = normalize(uFloodView + vViewPosition);
            float lam = max(0.0, dot(normal, toL));
            // đèn đặt dưới thấp: chân tường sáng nhất, lên cao tối dần; mặt quay đi chỉ còn chút ánh hắt
            float hk = 1.0 - 0.62 * smoothstep(2.0, 48.0, vFloodY);
            totalEmissiveRadiance += uFloodColor * diffuseColor.rgb * uFlood * uFloodK * hk * (0.06 + 0.94 * lam * lam);
          #endif
        }`);
  };
  m.customProgramCacheKey = () => `${prevKey ? prevKey.call(m) : ''}|flood${flat ? '-flat' : ''}`;
  m.needsUpdate = true;
}

/** Tượng ảnh: ban đêm ấm lên, sáng ở chân (đèn rọi từ dưới), nhạt dần lên đầu. */
function statuePatch(m) {
  if (m.userData.night) return;
  m.userData.night = 'statue';
  const prev = m.onBeforeCompile, prevKey = m.customProgramCacheKey;
  m.onBeforeCompile = (sh, r) => {
    prev?.call(m, sh, r);
    Object.assign(sh.uniforms, U);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uNight;\nuniform vec3 uTint;')
      .replace('#include <map_fragment>', `#include <map_fragment>
        #ifdef USE_MAP
          diffuseColor.rgb *= mix(vec3(1.0), uTint * (1.25 - 0.4 * vMapUv.y), uNight);
        #endif`);
  };
  m.customProgramCacheKey = () => `${prevKey ? prevKey.call(m) : ''}|statue-night`;
  m.needsUpdate = true;
}

function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d'), r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, 'rgba(255,240,200,1)');
  r.addColorStop(0.3, 'rgba(255,200,120,0.45)');
  r.addColorStop(1, 'rgba(255,170,80,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/**
 * zone: id khu ('vatican', 'vatican-in'); root: cảnh glb của khu; ground(x, z): độ cao nền (hoặc null).
 * Trả về { update(dark, camera), dispose() }; khu không có đèn đêm thì update không làm gì.
 */
export function makeNight({ scene, root, zone, ground = null }) {
  const outside = zone === 'vatican', inside = zone === 'vatican-in';
  const extra = [];
  const mats = new Set();
  root.traverse(o => { for (const m of [].concat(o.material || [])) mats.add(m); });
  for (const m of mats) {
    const name = m.name || '';
    if (/^ph_/.test(name) && (outside || inside)) statuePatch(m);
    else if (outside) {
      const f = FLOOD.find(([re]) => re.test(name));
      if (f) floodPatch(m, f[1], f[2]);
      else if (GLOBE.test(name)) { m.emissive = new THREE.Color(0xffe2b0); m.userData.globe = true; extra.push({ globe: m }); }
    }
  }
  const group = new THREE.Group();
  let tex = null;
  if (outside) {
    // quầng sáng quanh các bóng đèn và vũng sáng dưới chân mỗi cây đèn
    tex = glowTexture();
    const halo = new THREE.SpriteMaterial({ map: tex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true });
    const pool = new THREE.MeshBasicMaterial({ map: tex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, color: 0xffb070 });
    const poolGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
    for (const [x, z] of CANDELABRA) {
      for (let j = 0; j < 4; j++) {
        const a = j * Math.PI / 2, s = new THREE.Sprite(halo);
        s.position.set(x + 0.9 * Math.cos(a), 6.55, z - 0.9 * Math.sin(a));
        s.scale.setScalar(1.6);
        group.add(s);
      }
      const top = new THREE.Sprite(halo);
      top.position.set(x, 7.2, z);
      top.scale.setScalar(1.8);
      const p = new THREE.Mesh(poolGeo, pool);
      p.position.set(x, (ground?.(x, z) || 0) + 0.06, z);
      p.scale.setScalar(16);
      p.renderOrder = 1;
      group.add(top, p);
    }
    extra.push({ halo, pool, poolGeo });
    scene.add(group);
  }
  const v = new THREE.Vector3();
  return {
    update(dark, camera) {
      // ngoài trời đèn bật khi trời chạng vạng (đèn thật bật lúc hoàng hôn), trong nhà theo độ tối như nến
      const on = outside ? THREE.MathUtils.smoothstep(dark, 0.25, 0.85) : dark * 0.8;
      U.uNight.value = on;
      if (!outside) return;
      U.uFlood.value = on * 1.05;
      U.uFloodView.value.copy(v.copy(FLOOD_AT).applyMatrix4(camera.matrixWorldInverse));
      group.visible = on > 0.01;
      for (const e of extra) {
        if (e.globe) e.globe.emissiveIntensity = on * 2.4;
        if (e.halo) { e.halo.opacity = on * 0.9; e.pool.opacity = on * 0.55; }
      }
    },
    dispose() {
      scene.remove(group);
      for (const e of extra) { e.halo?.dispose(); e.pool?.dispose(); e.poolGeo?.dispose(); }
      tex?.dispose();
    },
  };
}
