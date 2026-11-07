/**
 * Vatican tô kiểu tranh (Nhà thờ Online, world.js): các ảnh đá chụp thật (travertine, đá lát sampietrini, cẩm thạch, vòm trần)
 * được vẽ lại trên CPU một lần khi tải khu, cho cùng một nét tươi, ấm với nhà thờ Đức Bà (dress_v2.py vẽ texture bằng tay):
 * vân ảnh kéo về gần màu trung bình (mềm như màu nước, hoa văn thật vẫn còn), màu trung bình đổi sang tông ấm, tươi hơn.
 * Màu phẳng (vàng, đồng, ngói, cỏ, thông) cũng được nâng theo cùng cách. Không đổi shader (đèn đêm nightLights.js vá shader
 * của chính các vật liệu này), không đụng ảnh tượng ph_*, tranh khảm vin_unlit_*, kính, nước.
 */
import * as THREE from 'three';

// vật liệu → { tone: màu đích của trung bình (sRGB 0..1), không có = màu cũ tô ấm; k: giữ bao nhiêu độ tương phản của vân;
//   sat: độ tươi của màu trong vân (cẩm thạch, sàn) }
const PLAN = [
  [/^vat_travertine$/, { tone: [0.93, 0.83, 0.63], k: 0.5 }],          // đá vôi mật ong của mặt tiền và hàng cột
  [/^vat_travertine_shade$/, { tone: [0.8, 0.68, 0.5], k: 0.5 }],
  [/^vat_colonnade_ceiling$/, { tone: [0.88, 0.78, 0.6], k: 0.5 }],
  [/^vat_palace$/, { tone: [0.92, 0.8, 0.58], k: 0.5 }],
  [/^vat_plaster_\d+$/, { k: 0.5 }],                                    // nhà quanh quảng trường: giữ màu riêng từng nhà
  [/^vat_sampietrini$/, { tone: [0.6, 0.53, 0.47], k: 0.8 }],          // đá lát: xám nâu ấm, vẫn thấy từng viên
  [/^vat_paving_strip$/, { tone: [0.94, 0.9, 0.8], k: 0.45 }],
  [/^vat_grey_granite$/, { tone: [0.78, 0.74, 0.7], k: 0.5 }],
  [/^vin_marble_white$/, { tone: [0.9, 0.84, 0.73], k: 0.6, sat: 1.2 }],
  [/^vin_marble_/, { k: 0.75, sat: 1.4 }],                                         // cẩm thạch màu: giữ màu thật, tươi hơn
  [/^vin_floor$/, { k: 0.95, sat: 1.5 }],                                         // sàn: hoa văn đá màu là nét chính, giữ nhiều
  [/^vin_coffer_/, {}],                                                            // trần ô (dựng khối, màu phẳng)
  [/^(vat|vin)_(gold|gold_mosaic)$/, { tone: [0.98, 0.8, 0.42] }],
  [/^(vat|vin)_bronze$/, { tone: [0.5, 0.38, 0.25] }],
  [/^vat_roof_tiles$/, { tone: [0.82, 0.5, 0.34] }],
  [/^vat_colonnade_roof$/, { tone: [0.74, 0.64, 0.52] }],
  [/^vat_(lead|street)$/, {}],
  [/^vat_(grass|pine|trunk|red_granite|red_banner)$/, {}],
  [/^vin_(stucco|niche)$/, {}],
  [/^vat_marble$/, { tone: [0.94, 0.9, 0.82] }],
];

/** Màu cũ tô ấm: tươi hơn (độ bão hoà × 1,3), sáng hơn chút, ngả vàng. */
function warm([r, g, b]) {
  const l = 0.3 * r + 0.59 * g + 0.11 * b;
  const s = 1.3;
  return [l + (r - l) * s, l + (g - l) * s, l + (b - l) * s].map((v, i) => Math.min(1, Math.max(0, v * 1.06 * [1.04, 1, 0.9][i])));
}

const done = new WeakMap(); // texture gốc → texture đã tô (một ảnh có thể dùng cho nhiều vật liệu)

function paintTexture(tex, { tone, k = 0.5, sat = 1 }) {
  const key = `${tone}|${k}|${sat}`;
  const seen = done.get(tex);
  if (seen?.[key]) return seen[key];
  const img = tex.image;
  const w = img?.width, h = img?.height;
  if (!w || !h) return tex;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d', { willReadFrequently: true });
  // ảnh từ GLTFLoader là ImageBitmap lật dọc sẵn (flipY = false): vẽ y nguyên
  g.drawImage(img, 0, 0);
  const data = g.getImageData(0, 0, w, h);
  const p = data.data;
  let mr = 0, mg = 0, mb = 0;
  const n = w * h;
  for (let i = 0; i < p.length; i += 4) { mr += p[i]; mg += p[i + 1]; mb += p[i + 2]; }
  const mean = [mr / n / 255, mg / n / 255, mb / n / 255];
  const [tr, tg, tb] = (tone || warm(mean)).map(v => v * 255);
  // vân: độ lệch khỏi trung bình, thu nhỏ còn k; phần màu của vân nhân sat (cẩm thạch màu, sàn hoa văn tươi hơn),
  // không có sat thì nghiêng về độ sáng (vân đá ít đổi màu, chỉ đậm nhạt)
  const cw = sat > 1 ? sat : 0.4, lw = sat > 1 ? 0 : 0.6;
  for (let i = 0; i < p.length; i += 4) {
    const dr = p[i] - mean[0] * 255, dg = p[i + 1] - mean[1] * 255, db = p[i + 2] - mean[2] * 255;
    const dl = 0.3 * dr + 0.59 * dg + 0.11 * db;
    p[i] = tr + k * (lw * dl + cw * dr);
    p[i + 1] = tg + k * (lw * dl + cw * dg);
    p[i + 2] = tb + k * (lw * dl + cw * db);
  }
  g.putImageData(data, 0, 0);
  const out = new THREE.CanvasTexture(c);
  for (const f of ['wrapS', 'wrapT', 'flipY', 'colorSpace', 'channel', 'anisotropy', 'magFilter', 'minFilter', 'generateMipmaps']) out[f] = tex[f];
  out.repeat.copy(tex.repeat); out.offset.copy(tex.offset); out.rotation = tex.rotation; out.center.copy(tex.center);
  done.set(tex, { ...seen, [key]: out });
  return out;
}

/** Tô một vật liệu Vatican (một lần). */
export function paintMaterial(m) {
  if (!m?.name || m.userData.painted || !m.color) return;
  const rule = PLAN.find(([re]) => re.test(m.name));
  if (!rule) return;
  m.userData.painted = true;
  const opt = rule[1];
  if (m.map) {
    const old = m.map;
    m.map = paintTexture(old, opt);
    if (m.map !== old) old.dispose();
  } else {
    const c = m.color.clone().convertLinearToSRGB();
    const [r, g, b] = opt.tone || warm([c.r, c.g, c.b]);
    m.color.setRGB(r, g, b, THREE.SRGBColorSpace);
  }
  m.needsUpdate = true;
}
