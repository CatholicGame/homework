/**
 * Trời và ánh sáng theo giờ Việt Nam cho Nhà thờ Online (world.js).
 *
 * Giờ: UTC+7 (Việt Nam không đổi giờ mùa hè), mặt trời tính theo vĩ độ Sài Gòn và ngày trong năm, nên bóng đổ đi
 * theo nắng thật. Một ngày là bảng mốc DAY: mỗi mốc một ảnh trời (public/church/sky/<key>.jpg, Poly Haven CC0, làm bằng
 * church-online/tools/sky_set.py) và một bộ đèn (LIGHTS); giữa hai mốc trời và đèn chuyển dần. Trong nhà (LOOK.inside
 * của khu) ban đêm là đèn nến ấm (LIGHTS.lamps) thay cho ánh trăng; kính màu, đèn, nến sáng lên khi trời tối.
 *
 * Người xem chọn: theo giờ thật, bình minh, ban ngày, hoàng hôn, ban đêm (MODES, nhớ trong localStorage kt-sky).
 * Thử: ?gio=19.5 hoặc ?gio=19:30 ép giờ, ?le=giang-sinh bật một dịp lễ, ?le=khong tắt dịp lễ.
 *
 * Dịp lễ (EVENTS) chỉ là dữ liệu: khoảng ngày, ảnh trời thay cho mốc nào (`skies`), đèn chỉnh thêm (`light`, `keys`),
 * và `decor` (vật trang trí riêng của dịp lễ: nhận { scene, zone }, trả { update(state, camera), dispose }).
 * Thêm một dịp lễ: thêm một mục vào EVENTS; cần ảnh trời mới thì thêm vào SKIES của sky_set.py rồi chạy lại.
 */
import * as THREE from 'three';

const BASE = '/thandong/sky/';
const LAT = 10.78 * Math.PI / 180, LON = 106.70, TZ = 7; // Sài Gòn
const DEG = Math.PI / 180;

/** Bộ đèn. Màu hex, cường độ như THREE; `day` 1 = ban ngày, 0 = đêm (độ sáng của đèn, kính, nến theo nó). */
export const LIGHTS = {
  day: { hemiSky: 0xfff3e2, hemiGround: 0x7a6450, hemi: 2.1, sunColor: 0xffe2c4, sun: 1.3, env: 1, exposure: 1, day: 1, gain: 1, tint: 0xffffff },
  golden: { hemiSky: 0xffc8a0, hemiGround: 0x6a4434, hemi: 1.45, sunColor: 0xff9a50, sun: 1.45, env: 0.85, exposure: 1, day: 0.8, gain: 1, tint: 0xffe2c8 },
  twilight: { hemiSky: 0x8f86c0, hemiGround: 0x3a3044, hemi: 0.85, sunColor: 0xd0a8c8, sun: 0.25, env: 0.55, exposure: 1, day: 0.3, gain: 1, tint: 0xfff0f4 },
  night: { hemiSky: 0x5a70b0, hemiGround: 0x1a1a26, hemi: 0.27, sunColor: 0xa8c0f0, sun: 0.24, env: 0.2, exposure: 0.86, day: 0, gain: 1, tint: 0xffffff },
  // trong nhà lúc tối: đèn chùm, nến
  lamps: { hemiSky: 0xffcb90, hemiGround: 0x553824, hemi: 1.2, sunColor: 0xffc080, sun: 0.15, env: 0.7 },
};

/** Một ngày (giờ Việt Nam, 0..24): ảnh trời, bộ đèn, chỉnh riêng từng mốc (bất kỳ trường nào của LIGHTS). */
export const DAY = [
  { at: 0, sky: 'night', light: 'night' },
  { at: 4.6, sky: 'night', light: 'night' },
  { at: 5.2, sky: 'dawn', light: 'twilight', tint: 0xffe4e0 },
  { at: 5.8, sky: 'sunrise', light: 'golden', tint: 0xffd2b0 },
  { at: 7, sky: 'morning', light: 'day', tint: 0xfff4e8 },
  { at: 9, sky: 'midmorning', light: 'day' },
  { at: 12, sky: 'noon', light: 'day' },
  { at: 14.5, sky: 'afternoon', light: 'day' },
  { at: 16.3, sky: 'lateafternoon', light: 'day', tint: 0xfff2e2 },
  { at: 17.5, sky: 'sunset', light: 'golden', tint: 0xffc49c },
  { at: 18, sky: 'dusk', light: 'twilight', tint: 0xffe0d8 },
  { at: 18.45, sky: 'dusk2', light: 'twilight' },
  { at: 19.2, sky: 'night', light: 'night' },
];

/** Lựa chọn của người xem: giờ cố định (null = theo giờ Việt Nam). */
export const MODES = [
  { id: 'auto', hour: null, name: 'Theo giờ Việt Nam' },
  { id: 'dawn', hour: 5.95, name: 'Bình minh' },
  { id: 'day', hour: 10, name: 'Ban ngày' },
  { id: 'dusk', hour: 17.75, name: 'Hoàng hôn' },
  { id: 'night', hour: 21, name: 'Ban đêm' },
];

/** Dịp lễ: `from` / `to` là 'MM-DD' theo giờ Việt Nam, gồm cả hai ngày (qua năm mới được: '12-24' → '01-06'). */
export const EVENTS = [
  {
    id: 'giang-sinh', name: 'Mùa Giáng Sinh', from: '12-24', to: '01-06',
    skies: { night: 'milkyway' },                // trời đêm quang, dải Ngân Hà
    light: { lamps: { hemi: 1.75, hemiSky: 0xffd49a } }, // trong nhà ấm hơn
    glow: 1.4,                                   // kính màu, đèn, nến sáng hơn ngày thường
    decor: christmasStar,
  },
];

// ---- giờ, mặt trời ----

/** Giờ Việt Nam lúc này: { hour (0..24, có phần lẻ), month, day, doy (ngày thứ mấy trong năm) }. */
export function vnNow(ms = Date.now()) {
  const d = new Date(ms + TZ * 3600e3); // đọc bằng getUTC*: ra giờ Việt Nam
  const doy = Math.floor((d - Date.UTC(d.getUTCFullYear(), 0, 1)) / 864e5) + 1;
  return { hour: d.getUTCHours() + d.getUTCMinutes() / 60 + d.getUTCSeconds() / 3600, month: d.getUTCMonth() + 1, day: d.getUTCDate(), doy };
}

/** Mặt trời ở Sài Gòn: { az (từ hướng bắc theo chiều kim đồng hồ), el (độ cao) }, radian (công thức NOAA). */
export function sunAt(hour, doy) {
  const g = 2 * Math.PI / 365 * (doy - 1 + (hour - 12) / 24);
  const eq = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const dec = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g)
    - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const ha = ((hour * 60 + eq + 4 * LON - 60 * TZ) / 4 - 180) * DEG;
  const el = Math.asin(Math.sin(LAT) * Math.sin(dec) + Math.cos(LAT) * Math.cos(dec) * Math.cos(ha));
  const az = Math.atan2(Math.sin(ha), Math.cos(ha) * Math.sin(LAT) - Math.tan(dec) * Math.cos(LAT)) + Math.PI;
  return { az, el };
}

const MOON = { az: 140 * DEG, el: 58 * DEG }; // trăng đêm: cao, phía đông nam (ảnh trời đêm có trăng gần đỉnh)

/** Tham số trên địa chỉ (trước hoặc sau #/nha-tho). */
function param(name) {
  const m = (location.search + location.hash).match(new RegExp(`[?&]${name}=([^&#]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

function eventOn(now) {
  const want = param('le');
  if (want) return EVENTS.find(e => e.id === want) || null;
  const md = now.month * 100 + now.day;
  return EVENTS.find(e => {
    const [a, b] = [e.from, e.to].map(s => { const [m, d] = s.split('-').map(Number); return m * 100 + d; });
    return a <= b ? md >= a && md <= b : md >= a || md <= b;
  }) || null;
}

// ---- trạng thái của một giờ ----

const smooth = (t) => t * t * (3 - 2 * t);
const COLOR_KEYS = ['hemiSky', 'hemiGround', 'sunColor', 'tint'];
const NUM_KEYS = ['hemi', 'sun', 'env', 'exposure', 'day', 'gain'];

/** Đèn của một mốc: bộ đèn + chỉnh của dịp lễ + chỉnh của mốc. */
function lightOf(k, ev) {
  return { ...LIGHTS[k.light], ...ev?.light?.[k.light], ...k, ...ev?.keys?.[k.sky] };
}

/** Hai mốc quanh `hour` và độ chuyển giữa chúng. */
function keysAt(hour, day = DAY) {
  let i = day.length - 1;
  while (i > 0 && day[i].at > hour) i--;
  const k0 = day[i], k1 = day[(i + 1) % day.length], k2 = day[(i + 2) % day.length];
  const end = k1.at <= k0.at ? k1.at + 24 : k1.at;
  return { k0, k1, k2, f: smooth(Math.min(1, Math.max(0, (hour - k0.at) / (end - k0.at)))) };
}

function mixState(a, b, f, out = {}) {
  for (const k of NUM_KEYS) out[k] = (a[k] ?? b[k] ?? 0) * (1 - f) + (b[k] ?? a[k] ?? 0) * f;
  for (const k of COLOR_KEYS) (out[k] ||= new THREE.Color()).set(a[k] ?? 0xffffff).lerp(new THREE.Color(b[k] ?? a[k] ?? 0xffffff), f);
  return out;
}

// ---- vòm trời: trộn hai ảnh, mỗi ảnh xoay cho mặt trời (trăng) trong ảnh trùng hướng nắng thật ----

const VERT = `varying vec3 vDir;
void main() { vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
// halfA / halfB = 1: ảnh nét chỉ có nửa trời trên (<key>-hi.jpg), dưới chân trời lấy hàng chân trời
const FRAG = `uniform sampler2D mapA, mapB; uniform float mixF, rotA, rotB, halfA, halfB, gain; uniform vec3 tint;
varying vec3 vDir;
vec3 eq(sampler2D m, vec3 d, float r, float h) {
  float a = atan(d.z, d.x) + r;
  float v = h > 0.5 ? asin(clamp(d.y, 0.0, 1.0)) * 0.6366198 : asin(clamp(d.y, -1.0, 1.0)) * 0.3183099 + 0.5;
  return texture2D(m, vec2(fract(a * 0.1591549 + 0.5), v)).rgb;
}
void main() {
  vec3 d = normalize(vDir);
  gl_FragColor = vec4(mix(eq(mapA, d, rotA, halfA), eq(mapB, d, rotB, halfB), mixF) * gain * tint, 1.0);
  #include <colorspace_fragment>
}`;

// ---- sao: điểm sáng vẽ riêng trên vòm, nét ở mọi độ phân giải (ảnh trời chỉ cho nền và trăng) ----

const STAR_VERT = `attribute float size, phase; attribute vec3 tone;
uniform float px, time, twinkle; uniform vec3 moon;
varying vec3 vTone; varying float vA;
void main() {
  vec3 d = normalize(position);
  float a = smoothstep(0.02, 0.2, d.y);                               // mờ dần trong lớp mù gần chân trời
  a *= 1.0 - 0.95 * smoothstep(0.82, 0.97, dot(d, moon));            // quanh trăng sáng quá, không thấy sao
  a *= 1.0 - twinkle * 0.45 * (0.5 + 0.5 * sin(time * (1.3 + phase) + phase * 40.0));
  vTone = tone; vA = a;
  gl_PointSize = size * px;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
const STAR_FRAG = `uniform float strength; varying vec3 vTone; varying float vA;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float r2 = dot(c, c) * 4.0;
  float a = exp(-r2 * 5.0) + 0.6 * exp(-r2 * 26.0);                 // lõi sắc, quầng nhỏ
  if (a < 0.01) discard;
  gl_FragColor = vec4(vTone, a * vA * strength);
}`;
/** Ảnh trời nào đã đầy sao thì lớp sao nhạt bớt. */
const STAR_GAIN = { milkyway: 0.45 };

function starField(n = 2600) {
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const pos = new Float32Array(n * 3), size = new Float32Array(n), phase = new Float32Array(n), tone = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const y = 0.02 + 0.98 * rnd(), t = rnd() * Math.PI * 2, r = Math.sqrt(1 - y * y);
    pos.set([r * Math.cos(t), y, r * Math.sin(t)], i * 3);
    const b = Math.pow(rnd(), 4);                                      // phần lớn sao mờ, ít sao sáng
    size[i] = 1.6 + 4.2 * b;
    phase[i] = rnd();
    const w = rnd();                                                   // trắng xanh .. trắng .. vàng nhạt
    const k = 0.45 + 0.55 * b;
    tone.set(w < 0.25 ? [0.78 * k, 0.86 * k, k] : w > 0.85 ? [k, 0.9 * k, 0.74 * k] : [k, k, 0.96 * k], i * 3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('size', new THREE.BufferAttribute(size, 1));
  g.setAttribute('phase', new THREE.BufferAttribute(phase, 1));
  g.setAttribute('tone', new THREE.BufferAttribute(tone, 3));
  const uniforms = {
    px: { value: 1 }, time: { value: 0 }, strength: { value: 0 }, moon: { value: new THREE.Vector3(0, 1, 0) },
    twinkle: { value: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1 },
  };
  // không transparent: nằm trong lượt vẽ đục, ngay sau vòm trời, mọi thứ khác đè lên
  const pts = new THREE.Points(g, new THREE.ShaderMaterial({ uniforms, vertexShader: STAR_VERT, fragmentShader: STAR_FRAG,
    blending: THREE.AdditiveBlending, depthTest: false, depthWrite: false }));
  pts.renderOrder = -1e6 + 1;
  pts.frustumCulled = false;
  return { pts, uniforms };
}

// vật liệu sáng theo đêm (tên trong glb)
const GLASS = /^(sg_glass_|vin_window)/;
const LAMP = /^(sg_lamp|sg_niche_glow|candle_flame|vin_lamp)/;
const PHOTO = /^vin_unlit_/; // ảnh thật vẽ không qua đèn: tự làm tối (tượng ảnh ph_*: nightLights.js rọi đèn cho chúng)

/**
 * @param {{ renderer, scene, hemi: THREE.HemisphereLight, sun: THREE.DirectionalLight, SUN: THREE.Vector3 }} o
 *   SUN: hướng nắng (độ dài giữ nguyên) mà world.js đặt đèn mặt trời theo, cập nhật mỗi khung hình.
 */
export function makeSky({ renderer, scene, hemi, sun, SUN }) {
  const uniforms = {
    mapA: { value: null }, mapB: { value: null }, mixF: { value: 0 }, rotA: { value: 0 }, rotB: { value: 0 },
    halfA: { value: 0 }, halfB: { value: 0 }, gain: { value: 1 }, tint: { value: new THREE.Color(1, 1, 1) },
  };
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 24),
    new THREE.ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG, side: THREE.BackSide, depthTest: false, depthWrite: false }));
  dome.renderOrder = -1e6; // vẽ trước tiên, mọi thứ khác đè lên
  dome.frustumCulled = false;
  dome.visible = false;
  scene.add(dome);
  const stars = starField();
  dome.add(stars.pts);
  // ảnh trời nét (nửa trời trên 8192×2048) cho máy tính: GPU nhận được và không phải điện thoại (mỗi ảnh 64 MB trên GPU)
  const hi = renderer.capabilities.maxTextureSize >= 8192 && matchMedia('(pointer: fine)').matches
    && !/Mobi|Android|iPad|iPhone/i.test(navigator.userAgent) && (navigator.deviceMemory ?? 8) >= 4;

  let meta = null, zone = null, north = 0, sunLen = 35, inside = () => 0, mats = [], decor = null;
  let mode = 'auto';
  try { mode = localStorage.getItem('kt-sky') || 'auto'; } catch { /* không có bộ nhớ */ }
  if (!MODES.some(m => m.id === mode)) mode = 'auto';
  const forced = (() => { const g = param('gio'); if (!g) return null; const [h, m = 0] = g.split(/[:h]/).map(Number); return Number.isFinite(h) ? h + m / 60 : null; })();
  const ev = eventOn(vnNow());
  const day = ev?.skies ? DAY.map(k => ({ ...k, sky: ev.skies[k.sky] || k.sky })) : DAY;

  // ảnh trời: tải khi cần, giữ tối đa 4 ảnh (mỗi ảnh khoảng 8 MB trên GPU, ảnh nét 64 MB: giữ 3)
  const tex = new Map();
  const loader = new THREE.TextureLoader();
  function texOf(key) {
    if (!meta) return { t: null, p: metaP.then(() => texOf(key).p) }; // chưa biết ảnh nào có bản nét
    let e = tex.get(key);
    if (!e) {
      e = { t: null, p: null, used: 0 };
      const half = hi && !!meta?.[key]?.hi;
      e.p = loader.loadAsync(BASE + key + (half ? '-hi' : '') + '.jpg').then(t => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.userData.half = half ? 1 : 0;
        t.generateMipmaps = false;           // không mip: không lộ đường nối ở chỗ ảnh khép vòng
        t.minFilter = THREE.LinearFilter;
        t.wrapS = THREE.RepeatWrapping;
        e.t = t;
        return t;
      }).catch(() => null);
      tex.set(key, e);
      if (tex.size > (hi ? 3 : 4)) {
        const old = [...tex.entries()].filter(([k]) => k !== key).sort((a, b) => a[1].used - b[1].used)[0];
        if (old && old[1].t && old[1].t !== uniforms.mapA.value && old[1].t !== uniforms.mapB.value) { old[1].t.dispose(); tex.delete(old[0]); }
      }
    }
    e.used = performance.now();
    return e;
  }
  const metaP = fetch(BASE + 'skies.json').then(r => r.json()).then(m => { meta = m; }).catch(() => { meta = {}; });

  const hourNow = () => forced ?? MODES.find(m => m.id === mode).hour ?? vnNow().hour;

  /** Hướng (x, z) trong cảnh của một góc phương vị: khu đặt hướng bắc theo LOOK.sun (nắng chiều khoảng 250°). */
  const dirOf = ({ az, el }, v = new THREE.Vector3()) => {
    const th = north - az;
    return v.set(Math.sin(th) * Math.cos(el), Math.sin(el), Math.cos(th) * Math.cos(el));
  };
  /** Góc xoay ảnh `key` để mặt trời trong ảnh nằm ở hướng `d`. */
  const rotFor = (key, d) => ((meta?.[key]?.sunU ?? 0.6) - 0.5) * 2 * Math.PI - Math.atan2(d.z, d.x);

  const st = {}, sDir = new THREE.Vector3(), mDir = new THREE.Vector3(), lamp = {};
  let glow = 0;

  /** Trạng thái của giờ `hour` ở chỗ đứng (x, z). */
  function compute(hour, x, z) {
    const { k0, k1, f } = keysAt(hour, day);
    const a = lightOf(k0, ev), b = lightOf(k1, ev);
    mixState(a, b, f, st);
    // trong nhà: tối thì đèn nến thay ánh trời
    const ins = inside(x, z), dark = 1 - st.day;
    const L = { ...LIGHTS.lamps, ...ev?.light?.lamps };
    if (ins > 0) {
      const w = ins * dark;
      st.hemi += (L.hemi - st.hemi) * w; st.sun += (L.sun - st.sun) * w; st.env += (L.env - st.env) * w;
      st.hemiSky.lerp(lamp.sky.set(L.hemiSky), w); st.hemiGround.lerp(lamp.gr.set(L.hemiGround), w); st.sunColor.lerp(lamp.sc.set(L.sunColor), w);
    }
    st.inside = ins;
    // hướng nắng: mặt trời thật khi đã lên, trăng khi đêm, trộn dần lúc chạng vạng
    const now = vnNow();
    const s = sunAt(hour, now.doy);
    dirOf({ az: s.az, el: Math.max(s.el, 6 * DEG) }, sDir);
    dirOf(MOON, mDir);
    const w = Math.min(1, Math.max(0, (s.el / DEG + 4) / 8));
    st.light = mDir.clone().lerp(sDir, w).normalize();
    st.sunDir = dirOf(s);
    st.sunAz = s.az; st.sunEl = s.el;
    st.k0 = k0; st.k1 = k1; st.f = f; st.hour = hour;
    return st;
  }

  function apply(s) {
    hemi.color.copy(s.hemiSky); hemi.groundColor.copy(s.hemiGround); hemi.intensity = s.hemi;
    sun.color.copy(s.sunColor); sun.intensity = s.sun;
    SUN.copy(s.light).multiplyScalar(sunLen);
    renderer.toneMappingExposure = s.exposure;
    if (scene.environment) scene.environmentIntensity = 0.45 * s.env;
    // kính màu: ngoài trời tối thì sáng như có đèn trong nhà, trong nhà tối thì tối đi; đèn, nến sáng hơn khi tối
    const dark = 1 - s.day, g = ev?.glow ?? 1;
    for (const { m, base, kind } of mats) {
      if (kind === 'glass') {
        m.emissiveIntensity = base * (s.day + dark * (1 - 0.65 * s.inside) * g);
        m.color.copy(m.userData.skyColor).multiplyScalar(1 - 0.55 * dark * s.inside);
      }
      else if (kind === 'lamp') m.emissiveIntensity = base * (1 + 1.6 * dark * g);
      else m.color.setScalar(1 - dark * (0.7 - 0.45 * s.inside));
    }
    // vòm trời
    if (dome.visible) {
      const ea = texOf(s.k0.sky), eb = texOf(s.k1.sky);
      const ta = ea.t || eb.t, tb = eb.t || ea.t;
      if (ta) {
        uniforms.mapA.value = ta; uniforms.mapB.value = tb;
        uniforms.mixF.value = ea.t && eb.t ? s.f : 0;
        const night = (k) => k.light === 'night';
        uniforms.rotA.value = rotFor(ea.t ? s.k0.sky : s.k1.sky, night(ea.t ? s.k0 : s.k1) ? mDir : s.sunDir);
        uniforms.rotB.value = rotFor(eb.t ? s.k1.sky : s.k0.sky, night(eb.t ? s.k1 : s.k0) ? mDir : s.sunDir);
        uniforms.halfA.value = ta.userData.half; uniforms.halfB.value = tb.userData.half;
      }
      uniforms.gain.value = s.gain;
      uniforms.tint.value.copy(s.tint);
      // sao: hiện dần khi trời tối, nhạt bớt với ảnh đã đầy sao
      const sg = (STAR_GAIN[s.k0.sky] ?? 1) * (1 - s.f) + (STAR_GAIN[s.k1.sky] ?? 1) * s.f;
      const su = stars.uniforms;
      su.strength.value = Math.pow(Math.max(0, 1 - s.day * 1.5), 1.5) * sg;
      stars.pts.visible = su.strength.value > 0.01;
      su.moon.value.copy(mDir);
      su.px.value = renderer.getPixelRatio();
      su.time.value = performance.now() / 1000;
    }
    decor?.update(s);
  }
  lamp.sky = new THREE.Color(); lamp.gr = new THREE.Color(); lamp.sc = new THREE.Color();

  return {
    get mode() { return mode; },
    get event() { return ev; },
    /** Khu mới: trời hay màu nền, hướng bắc, chỗ nào là trong nhà, vật liệu sáng theo đêm, vật trang trí dịp lễ. */
    setZone(Z, root) {
      zone = Z;
      const v = new THREE.Vector3(...Z.sun);
      sunLen = v.length();
      north = Math.atan2(v.x, v.z) + 250 * DEG;
      inside = typeof Z.inside === 'function' ? Z.inside : () => (Z.inside ? 1 : 0);
      dome.visible = !!Z.sky;
      scene.background = new THREE.Color(Z.bg ?? 0x9fb4d0);
      mats = [];
      const seen = new Set();
      root.traverse(o => {
        for (const m of [].concat(o.material || [])) {
          if (seen.has(m)) continue;
          seen.add(m);
          const kind = GLASS.test(m.name) ? 'glass' : LAMP.test(m.name) ? 'lamp' : PHOTO.test(m.name) && m.color ? 'photo' : null;
          if (!kind) continue;
          m.userData.skyBase ??= m.emissiveIntensity ?? 1;
          if (kind === 'glass') m.userData.skyColor ??= m.color.clone();
          mats.push({ m, base: m.userData.skyBase, kind });
        }
      });
      decor?.dispose();
      decor = ev?.decor && Z.sky ? ev.decor({ scene, zone: Z }) : null;
    },
    /** Đợi ảnh trời của giờ này (lúc mở nhà thờ). */
    ready() {
      return metaP.then(() => { const { k0, k1 } = keysAt(hourNow(), day); return Promise.all([texOf(k0.sky).p, texOf(k1.sky).p]); });
    },
    setMode(m) {
      mode = m;
      try { localStorage.setItem('kt-sky', m); } catch { /* không có bộ nhớ */ }
    },
    /** Độ tối của trời: 0 ban ngày .. 1 ban đêm (đèn đêm của nightLights.js theo nó). */
    get dark() { return 1 - (st.day ?? 1); },
    /** Mặt trời thật lúc này: phương vị (từ bắc, theo chiều kim đồng hồ), độ cao (radian), độ sáng của trời 0..1, màu nắng. */
    get sun() { return { az: st.sunAz ?? Math.PI, el: st.sunEl ?? 1, day: st.day ?? 1, color: st.sunColor }; },
    /** Trời đang sáng (nút mặt trời / trăng). */
    isDay() { return (st.day ?? 1) >= 0.5; },
    /** Giờ đang dùng (real: giờ Việt Nam thật), dạng 19:42. */
    clock(real = false) {
      const h = real ? vnNow().hour : hourNow(), hh = Math.floor(h), mm = Math.floor((h - hh) * 60);
      return `${hh}:${String(mm).padStart(2, '0')}`;
    },
    /** Mỗi khung hình: vòm trời theo camera, đèn theo giờ và chỗ đứng. */
    update(camera, pos) {
      dome.position.copy(camera.position);
      const s = compute(hourNow(), pos?.x ?? 0, pos?.z ?? 0);
      // tải trước ảnh của mốc kế tiếp
      texOf(keysAt(s.hour, day).k2.sky);
      apply(s);
    },
    dispose() {
      decor?.dispose();
      scene.remove(dome);
      dome.geometry.dispose();
      dome.material.dispose();
      stars.pts.geometry.dispose();
      stars.pts.material.dispose();
      for (const e of tex.values()) e.t?.dispose();
      tex.clear();
    },
  };
}

// ---- trang trí dịp lễ ----

/** Ngôi sao Giáng Sinh trên trời phía nhà thờ, chỉ hiện khi trời tối, lấp lánh nhẹ. LOOK.star của khu đặt vị trí. */
function christmasStar({ scene, zone }) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const halo = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  halo.addColorStop(0, 'rgba(255,250,225,1)');
  halo.addColorStop(0.08, 'rgba(255,236,170,0.95)');
  halo.addColorStop(0.3, 'rgba(255,214,120,0.28)');
  halo.addColorStop(1, 'rgba(255,200,100,0)');
  g.fillStyle = halo;
  g.fillRect(0, 0, 256, 256);
  // bốn tia dài (dọc dài nhất) và bốn tia ngắn chéo
  g.fillStyle = 'rgba(255,246,210,0.9)';
  for (const [a, len, w] of [[0, 126, 7], [Math.PI / 2, 92, 6], [Math.PI, 110, 7], [Math.PI * 1.5, 92, 6],
    [Math.PI / 4, 50, 4], [Math.PI * 0.75, 50, 4], [Math.PI * 1.25, 50, 4], [Math.PI * 1.75, 50, 4]]) {
    g.save(); g.translate(128, 128); g.rotate(a);
    g.beginPath(); g.moveTo(-w, 0); g.lineTo(0, -len); g.lineTo(w, 0); g.closePath(); g.fill();
    g.restore();
  }
  const map = new THREE.CanvasTexture(c);
  map.colorSpace = THREE.SRGBColorSpace;
  const star = new THREE.Sprite(new THREE.SpriteMaterial({ map, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
  // mặc định (Sài Gòn): cao giữa hai tháp chuông nhìn từ quảng trường (khoảng 58° trên chân trời), trên đỉnh mặt tiền
  const { pos = [0, 130, -45], size = 26 } = zone.star || {};
  star.position.set(...pos);
  star.scale.setScalar(size);
  star.renderOrder = 10;
  scene.add(star);
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  return {
    update(s) {
      const night = Math.max(0, 1 - s.day * 1.6);
      star.visible = night > 0.02;
      const tw = calm ? 1 : 0.88 + 0.12 * Math.sin(performance.now() / 700);
      star.material.opacity = night * tw;
      star.scale.setScalar(size * (calm ? 1 : 0.96 + 0.04 * Math.sin(performance.now() / 1100)));
    },
    dispose() { scene.remove(star); star.material.dispose(); map.dispose(); },
  };
}
