// Nhìn xuyên vật che (Nhà thờ Online): cột, tường, ghế, giá nến nằm giữa camera và nhân vật của mình thì thủng một ô bầu dục
// quanh nhân vật, mép mềm bằng chấm dither (ma trận Bayer 4×4), nên camera không phải chui sát lưng mỗi khi lướt qua một cây cột.
// Chỉ phần ở GẦN camera hơn nhân vật mới thủng (sàn, tường phía sau nhân vật giữ nguyên), vẫn chừa lại một lớp chấm mờ để biết
// có vật ở đó. Vá vào shader của các vật liệu dựng sẵn (Basic / Standard / Physical / Phong / Lambert: biển chữ, tranh, tượng ảnh
// cũng thủng); shader tự viết (lửa, nước, trời) để nguyên. Nối tiếp onBeforeCompile sẵn có (đèn đêm nightLights.js), không thay thế.
import * as THREE from 'three';

const U = {
  uOccP: { value: new THREE.Vector3() },  // x, y: tâm ô (điểm ảnh của bộ đệm vẽ), z: độ sâu của nhân vật (m, trong hệ camera)
  uOccR: { value: new THREE.Vector2(1, 1) }, // bán kính ngang, dọc (điểm ảnh)
  uOccOn: { value: 0 },
  uOccFoot: { value: 0 },                 // bàn chân nhân vật + chút: sàn, bậc thấp không thủng
};
const KINDS = new Set(['MeshBasicMaterial', 'MeshStandardMaterial', 'MeshPhysicalMaterial', 'MeshPhongMaterial', 'MeshLambertMaterial']);

const FRAG = /* glsl */`
  if (uOccOn > 0.5) {
    float dz = uOccP.z - vOccZ;                      // > 0: mảnh này ở trước nhân vật (gần camera hơn)
    if (dz > 0.3 && vOccY > uOccFoot) {
      vec2 q = (gl_FragCoord.xy - uOccP.xy) / uOccR;
      float fade = (1.0 - smoothstep(0.55, 1.0, length(q))) * smoothstep(0.3, 1.1, dz) * 0.86;
      // ma trận Bayer 4×4 (ngưỡng 0..1)
      vec2 c = mod(floor(gl_FragCoord.xy), 4.0);
      int i = int(c.x) + int(c.y) * 4;
      float bayer[16] = float[16](0.0, 8.0, 2.0, 10.0, 12.0, 4.0, 14.0, 6.0, 3.0, 11.0, 1.0, 9.0, 15.0, 7.0, 13.0, 5.0);
      if (fade > (bayer[i] + 0.5) / 16.0) discard;
    }
  }
`;

/** Vá một vật liệu (một lần). */
export function occlude(m) {
  if (!m || m.userData.occ || !KINDS.has(m.type)) return;
  m.userData.occ = true;
  const prev = m.onBeforeCompile, prevKey = m.customProgramCacheKey;
  m.onBeforeCompile = (sh, r) => {
    prev?.call(m, sh, r);
    Object.assign(sh.uniforms, U);
    // độ sâu trong hệ camera (Basic không có vViewPosition): tính ở vertex, sau project_vertex (đã gồm instanceMatrix)
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying float vOccZ;\nvarying float vOccY;')
      .replace('#include <project_vertex>', `#include <project_vertex>
        vOccZ = -mvPosition.z;
        #ifdef USE_INSTANCING
          vOccY = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).y;
        #else
          vOccY = (modelMatrix * vec4(transformed, 1.0)).y;
        #endif`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vOccZ;\nvarying float vOccY;\nuniform vec3 uOccP;\nuniform vec2 uOccR;\nuniform float uOccOn;\nuniform float uOccFoot;')
      .replace('#include <clipping_planes_fragment>', `#include <clipping_planes_fragment>\n${FRAG}`);
  };
  m.customProgramCacheKey = () => `${prevKey ? prevKey.call(m) : ''}|occ`;
  m.needsUpdate = true;
}

/** Vá mọi vật liệu trong một nhánh cảnh. */
export function occludeTree(root) {
  root.traverse(o => { for (const m of [].concat(o.material || [])) occlude(m); });
}

const v = new THREE.Vector3(), size = new THREE.Vector2();
/**
 * Mỗi khung hình: tâm ô ở ngực nhân vật trên màn hình, cỡ ô theo khoảng cách (nửa rộng 1,1 m, nửa cao 1,7 m quanh người).
 * on = false: tắt (ngồi xem phim, chưa có nhân vật).
 */
export function updateOcclusion(camera, renderer, pos, on = true) {
  U.uOccOn.value = on && pos ? 1 : 0;
  if (!U.uOccOn.value) return;
  renderer.getDrawingBufferSize(size);
  v.set(pos.x, pos.y + 1.0, pos.z).applyMatrix4(camera.matrixWorldInverse);
  const depth = -v.z;
  if (depth < 0.3) { U.uOccOn.value = 0; return; }
  v.applyMatrix4(camera.projectionMatrix);                 // tới NDC
  U.uOccP.value.set((v.x * 0.5 + 0.5) * size.x, (v.y * 0.5 + 0.5) * size.y, depth);
  const f = size.y / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)); // điểm ảnh mỗi mét ở khoảng cách 1 m
  U.uOccR.value.set(1.1 * f / depth, 1.7 * f / depth);
  U.uOccFoot.value = pos.y + 0.15;
}
