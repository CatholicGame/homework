/**
 * 🏆 Đấu Trường Nhí (tên tạm): bản mẫu sân khấu 3D để chủ dự án duyệt (thẻ chỉ admin thấy, `admin: true` trong data/grades.js).
 * Thiết kế: docs/dau-truong/thiet-ke.md. Bản HTML đứng riêng (three.js qua CDN): docs/dau-truong/mockup.html; module này là cùng
 * cảnh đó dùng three.js của gói npm, chạy trong app.
 *
 * Sân khấu tròn, màn LED lớn, tường lục giác, 4 bục thí sinh màu riêng (màn điểm, máy tính bảng, chuông), bục MC đôi (2 MC thay
 * phiên nói), khán phòng 50 ghế có đèn lưng ghế. Nút chạy thử từng vòng: Khởi động / Tăng tốc / Về đích với đồng hồ, bục chốt giả
 * lập, lật kết quả, điểm chạy số. Hình khối đơn giản, chưa phải mô hình Blender thật.
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/** Tên chương trình trên màn LED (tên tạm, chủ dự án chốt; '\n' = xuống dòng). Không dùng tên chương trình truyền hình có thật. */
const SHOW_NAME = 'Đấu Trường Nhí';

/** Hàng nút giữ để dời camera: [trục, nhãn, phím, [hướng, ký hiệu], [hướng, ký hiệu]]. */
const CAM_ROWS = [
  ['fb', 'Tiến / lùi', 'W S', [1, '▲'], [-1, '▼']],
  ['lr', 'Trái / phải', 'A D', [-1, '◀'], [1, '▶']],
  ['ud', 'Lên / xuống', 'R F', [1, '⤒'], [-1, '⤓']],
  ['yaw', 'Xoay', 'Q E', [-1, '↺'], [1, '↻']],
  ['pitch', 'Ngước / cúi', 'T G', [1, '⌃'], [-1, '⌄']],
  ['fov', 'Phóng / thu', 'Z X', [-1, '＋'], [1, '－']],
];

const CSS = `
.dt-stage { position: fixed; inset: 0; z-index: 60; background: #050a24; overflow: hidden; color: #eaf2ff; font-family: 'Segoe UI', system-ui, sans-serif; touch-action: none; }
.dt-stage canvas { display: block; }
.dt-stage .dt-bar { position: absolute; left: 50%; bottom: max(14px, env(safe-area-inset-bottom)); transform: translateX(-50%); display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; width: max-content; max-width: calc(100% - 32px); }
.dt-stage button { font: inherit; border: 1px solid rgba(140,190,255,.35); background: rgba(10,25,70,.78); color: #eaf2ff; border-radius: 10px; cursor: pointer; }
.dt-stage .dt-bar button { padding: 9px 14px; font-size: 14px; }
.dt-stage .dt-bar button.on { background: #2a6cff; border-color: #8fb8ff; }
.dt-stage .dt-cams { position: absolute; right: 14px; top: max(14px, env(safe-area-inset-top)); display: flex; flex-direction: column; gap: 6px; }
.dt-stage .dt-cams button { padding: 7px 12px; font-size: 13px; }
.dt-stage .dt-head { position: absolute; left: 14px; top: max(14px, env(safe-area-inset-top)); display: flex; gap: 10px; align-items: flex-start; max-width: calc(100% - 150px); }
.dt-stage .dt-back { padding: 8px 14px; font-size: 15px; font-weight: 600; flex: none; }
.dt-stage .dt-tag { background: rgba(10,25,70,.7); border-radius: 10px; padding: 8px 12px; font-size: 13px; line-height: 1.5; max-width: 320px; }
.dt-stage .dt-tag b { color: #ffd45c; }
@media (max-height: 520px), (max-width: 640px) { .dt-stage .dt-tag { display: none; } }
.dt-stage .dt-cams button[aria-pressed="true"] { background: #2a6cff; border-color: #8fb8ff; }
.dt-stage .dt-cams .dt-cam-tool { margin-top: 4px; background: rgba(255,200,60,.16); border-color: rgba(255,210,90,.5); }
.dt-stage .dt-camset { position: absolute; right: 150px; top: max(14px, env(safe-area-inset-top)); width: 300px; max-width: calc(100% - 28px); max-height: calc(100% - 90px); overflow: auto; background: rgba(8,18,60,.94); border: 1px solid rgba(140,190,255,.3); border-radius: 14px; padding: 10px 12px; font-size: 13px; z-index: 2; touch-action: auto; }
.dt-stage .dt-camset[hidden] { display: none; }
@media (max-width: 700px) { .dt-stage .dt-camset { right: 14px; } }
.dt-stage .dt-cs-top { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; }
.dt-stage .dt-cs-top b { font-size: 14px; }
.dt-stage .dt-cs-kind { color: #9fb8e8; font-size: 12px; flex: 1; }
.dt-stage .dt-cs-top button { width: 30px; height: 30px; padding: 0; }
.dt-stage .dt-cs-row { display: flex; align-items: center; gap: 6px; margin: 4px 0; }
.dt-stage .dt-cs-row span { flex: 1; }
.dt-stage .dt-cs-row i, .dt-stage .dt-cs-grid i { font-style: normal; font-size: 11px; color: #9fb8e8; margin-left: 4px; }
.dt-stage .dt-cs-row button { width: 40px; height: 36px; padding: 0; font-size: 16px; touch-action: none; -webkit-user-select: none; user-select: none; }
.dt-stage .dt-cs-row button:active { background: #2a6cff; }
.dt-stage .dt-cs-grid { display: grid; grid-template-columns: 64px 1fr 1fr 1fr; gap: 4px; align-items: center; margin: 8px 0; }
.dt-stage .dt-cs-grid input, .dt-stage .dt-cs-which select { width: 100%; box-sizing: border-box; font: inherit; color: #eaf2ff; background: rgba(255,255,255,.06); border: 1px solid rgba(140,190,255,.3); border-radius: 6px; padding: 4px 5px; font-variant-numeric: tabular-nums; }
.dt-stage .dt-cs-which { display: flex; align-items: center; gap: 8px; margin: 6px 0; }
.dt-stage .dt-cs-which select option { color: #111; }
.dt-stage .dt-cs-foot { display: flex; flex-wrap: wrap; gap: 6px; }
.dt-stage .dt-cs-foot button { padding: 6px 9px; font-size: 12.5px; }
.dt-stage .dt-cs-foot button[hidden] { display: none; }
.dt-stage .dt-cs-help { margin: 8px 0 0; font-size: 11.5px; color: #9fb8e8; line-height: 1.45; }
.dt-stage .dt-cs-note { margin: 4px 0 0; min-height: 1em; font-size: 12px; color: #7ff0b0; }
`;

export function render(app, onBack) {
  if (!document.getElementById('dt-stage-css')) {
    const st = document.createElement('style'); st.id = 'dt-stage-css'; st.textContent = CSS; document.head.appendChild(st);
  }
  app.innerHTML = `<div class="dt-stage">
    <div class="dt-head">
      <button type="button" class="dt-back">← Quay lại</button>
      <div class="dt-tag"><b>Đấu Trường Nhí</b> (tên tạm), bản mẫu sân khấu 3D để duyệt.<br>Kéo để xoay, cuộn hoặc chụm để phóng to. Bấm các vòng thi bên dưới để xem đèn, đồng hồ và lật kết quả.</div>
    </div>
    <div class="dt-cams"></div>
    <div class="dt-camset" hidden>
      <div class="dt-cs-top"><b>🎥 Chỉnh góc máy</b> <span class="dt-cs-kind"></span><button type="button" data-cs="close" aria-label="Đóng">✕</button></div>
      ${CAM_ROWS.map(([ax, label, keys, a, b]) => `<div class="dt-cs-row"><span>${label} <i>${keys}</i></span>
        <button type="button" data-ax="${ax}" data-d="${a[0]}" aria-label="${label} ${a[1]}">${a[1]}</button>
        <button type="button" data-ax="${ax}" data-d="${b[0]}" aria-label="${label} ${b[1]}">${b[1]}</button></div>`).join('')}
      <div class="dt-cs-grid">
        <span>Vị trí</span><input data-f="px" type="text" inputmode="decimal" autocomplete="off" aria-label="Vị trí x"><input data-f="py" type="text" inputmode="decimal" autocomplete="off" aria-label="Vị trí cao"><input data-f="pz" type="text" inputmode="decimal" autocomplete="off" aria-label="Vị trí z">
        <span>Nhìn tới</span><input data-f="tx" type="text" inputmode="decimal" autocomplete="off" aria-label="Nhìn tới x"><input data-f="ty" type="text" inputmode="decimal" autocomplete="off" aria-label="Nhìn tới cao"><input data-f="tz" type="text" inputmode="decimal" autocomplete="off" aria-label="Nhìn tới z">
        <span>Góc nhìn</span><input data-f="fov" type="text" inputmode="decimal" autocomplete="off" aria-label="Góc nhìn (độ)"><i>độ</i><i>x · cao · z</i>
      </div>
      <label class="dt-cs-which">Góc <select data-cs="which"></select></label>
      <div class="dt-cs-foot">
        <button type="button" data-cs="save">💾 Lưu vào góc này</button>
        <button type="button" data-cs="add">➕ Thêm góc mới</button>
        <button type="button" data-cs="reset">↺ Về mặc định</button>
        <button type="button" data-cs="del" hidden>🗑 Xoá góc</button>
        <button type="button" data-cs="copy">📋 Sao chép</button>
      </div>
      <p class="dt-cs-help">Phím 1–9 chọn góc. Lưu trên máy này, riêng màn ngang và màn dọc. Sao chép rồi gửi để đặt làm mặc định cho mọi người.</p>
      <p class="dt-cs-note" aria-live="polite"></p>
    </div>
    <div class="dt-bar">
      <button type="button" data-mode="idle" class="on">Chờ</button>
      <button type="button" data-mode="open">Mở màn</button>
      <button type="button" data-mode="khoidong">Khởi động</button>
      <button type="button" data-mode="tangtoc">Tăng tốc</button>
      <button type="button" data-mode="vedich">Về đích</button>
      <button type="button" data-mode="win">Trao giải</button>
    </div>
  </div>`;
  const root = app.querySelector('.dt-stage');
  let gone = false, raf = 0;
  const dispose = mount();
  root.querySelector('.dt-back').addEventListener('click', () => { dispose(); onBack(); });
  return dispose;

  function mount() {
    /* ---------- Khung cảnh ----------
       Hệ trục: x ngang (phải +), y lên, khán phòng ở phía +z nhìn về -z (sân khấu).
       Sân khấu: đĩa r 8.5 tâm (0, 0, -3), cao 0.6. Màn LED lớn ở tường sau z = -11.
       4 bục thí sinh trên một cung trước màn hình, quay ra khán phòng; bục MC bên trái phía trước.
       Khán phòng: 5 bậc × 10 ghế (50 chỗ), lối đi giữa. */
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(root.clientWidth || innerWidth, root.clientHeight || innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    renderer.shadowMap.enabled = true;
    root.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#040820');
    scene.fog = new THREE.Fog('#040820', 30, 60);
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.45; // three r183 sáng hơn bản mẫu (r160): giữ sân khấu xanh đậm

    const camera = new THREE.PerspectiveCamera(48, (root.clientWidth || innerWidth) / (root.clientHeight || innerHeight), 0.1, 200);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.maxPolarAngle = Math.PI * 0.49;
    controls.minDistance = 0.5; controls.maxDistance = 60;

    /* ---------- Góc máy cài sẵn ----------
       Mỗi góc: land (màn ngang) và port (màn dọc, chưa cài thì lấy land với góc nhìn rộng hơn 24°). Bảng 🎥 Chỉnh góc (camPanel)
       sửa và lưu góc trên máy này (CAM_KEY); "Sao chép" cho chuỗi JSON để đặt làm mặc định ở PRESETS cho mọi người. */
    const PRESETS = [
      { id: 'wide', name: 'Toàn cảnh', land: { pos: [0, 9.5, 21], target: [0, 2.4, -3], fov: 48 } },
      { id: 'front', name: 'Trực diện', land: { pos: [0, 3.2, 9.5], target: [0, 2.6, -3], fov: 48 } },
      { id: 'players', name: 'Bục thí sinh', land: { pos: [1.2, 2.3, 6.2], target: [0, 1.5, -1.6], fov: 48 } },
      { id: 'mc', name: 'MC', land: { pos: [-2.9, 2.2, 4.8], target: [-6.3, 1.6, 0.4], fov: 48 } },
      { id: 'crowd', name: 'Khán phòng', land: { pos: [0, 5.5, -1.5], target: [0, 1.5, 12], fov: 48 } },
    ];
    const CAM_KEY = 'dt-cam-v1';
    let camStore = { set: {}, extra: [] };   // set[id][kind] = góc đã cài; extra = góc thêm { id, name, land?, port? }
    try { camStore = { set: {}, extra: [], ...JSON.parse(localStorage.getItem(CAM_KEY)) }; } catch { /* không đọc được: mặc định */ }
    const camSaveStore = () => { try { localStorage.setItem(CAM_KEY, JSON.stringify(camStore)); } catch { /* bộ nhớ bị chặn */ } };
    const camKind = () => (camera.aspect < 1 ? 'port' : 'land');
    const allCams = () => [...PRESETS, ...camStore.extra];
    const findCam = (id) => allCams().find(p => p.id === id);
    const cloneView = (v) => ({ pos: [...v.pos], target: [...v.target], fov: v.fov });
    function viewOf(p, kind = camKind()) {
      const v = camStore.set[p.id]?.[kind] || p[kind];
      if (v) return v;
      const land = camStore.set[p.id]?.land || p.land || p.port;
      return kind === 'port' ? { ...land, fov: Math.min(95, land.fov + 24) } : land;
    }
    const nowView = () => ({ pos: camera.position.toArray(), target: controls.target.toArray(), fov: camera.fov });
    let camTo = null, camCur = 'wide';
    function cam(k, now = false) {
      const p = findCam(k);
      if (!p) return;
      camCur = k;
      const v = viewOf(p);
      if (now || reduce) {
        camera.position.set(...v.pos); controls.target.set(...v.target); camera.fov = v.fov; camera.updateProjectionMatrix(); camTo = null;
      } else camTo = { p: new THREE.Vector3(...v.pos), t: new THREE.Vector3(...v.target), fov: v.fov };
      paintCams();
    }

    /* ---------- Vật liệu ---------- */
    const M = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: .45, metalness: .2, ...o });
    const glow = (c, i = 2) => new THREE.MeshStandardMaterial({ color: '#000', emissive: c, emissiveIntensity: i });
    const mat = {
      floor: M('#0b1650', { roughness: .18, metalness: .55 }),
      stage: M('#14237a', { roughness: .15, metalness: .6 }),
      stageTop: M('#1b2f9c', { roughness: .12, metalness: .55 }),
      wall: M('#0a1240', { roughness: .6 }),
      panel: M('#16267e', { roughness: .3, metalness: .5 }),
      white: M('#e9eefc', { roughness: .25, metalness: .3 }),
      silver: M('#b8c4e6', { roughness: .2, metalness: .9 }),
      seat: M('#2348c9', { roughness: .5 }),
      tier: M('#101c5c', { roughness: .4, metalness: .3 }),
      truss: M('#3a4366', { roughness: .4, metalness: .8 }),
    };
    /* Đèn neon theo vòng thi: mọi vật "neon" đổi màu cùng lúc. */
    const neon = { a: glow('#2fc8ff', 2.2), b: glow('#7b5cff', 2.2), gold: glow('#ffc93c', 1.6) };

    const add = (geo, m, x = 0, y = 0, z = 0, parent = scene) => {
      const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o;
    };

    /* ---------- Sàn, tường, màn hình ---------- */
    add(new THREE.PlaneGeometry(60, 60).rotateX(-Math.PI / 2), mat.floor);
    const STAGE_Z = -3;
    add(new THREE.CylinderGeometry(8.5, 8.8, 0.6, 96), mat.stage, 0, 0.3, STAGE_Z);
    add(new THREE.CylinderGeometry(6.2, 6.2, 0.04, 96), mat.stageTop, 0, 0.62, STAGE_Z);
    // vòng LED mép sân khấu + vòng trong
    add(new THREE.TorusGeometry(8.62, 0.05, 8, 160).rotateX(Math.PI / 2), neon.a, 0, 0.6, STAGE_Z);
    add(new THREE.TorusGeometry(6.2, 0.045, 8, 160).rotateX(Math.PI / 2), neon.b, 0, 0.65, STAGE_Z);
    add(new THREE.TorusGeometry(8.8, 0.04, 8, 160).rotateX(Math.PI / 2), neon.b, 0, 0.05, STAGE_Z);
    // tia sáng trên mặt sân khấu (hoa văn ngôi sao 8 cánh của riêng chương trình)
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const len = i % 2 ? 2.2 : 3.4;
      const ray = add(new THREE.BoxGeometry(0.06, 0.02, len), i % 2 ? neon.b : neon.a, 0, 0.65, STAGE_Z);
      ray.position.x = Math.sin(a) * (6.2 - len / 2 - 0.15); ray.position.z = STAGE_Z + Math.cos(a) * (6.2 - len / 2 - 0.15);
      ray.rotation.y = a;
    }
    // bậc lên sân khấu phía trước
    for (let s = 0; s < 2; s++) add(new THREE.BoxGeometry(5, 0.3, 0.6), mat.stage, 0, 0.15 + s * 0.15 - 0.15 * s, 5.95 - s * 0.45).scale.y = 1 - s * 0;

    // tường sau: dải tấm lục giác nổi (khác hẳn khung trường quay truyền hình thật)
    const wall = add(new THREE.BoxGeometry(34, 14, 0.4), mat.wall, 0, 7, -11.6);
    const hexGeo = new THREE.CylinderGeometry(0.95, 0.95, 0.12, 6).rotateX(Math.PI / 2);
    const hexes = [];
    for (let r = 0; r < 7; r++) for (let c = -9; c <= 9; c++) {
      const x = c * 1.7 + (r % 2) * 0.85, y = 1.4 + r * 1.48;
      if (Math.abs(x) < 7.2 && y > 1.6 && y < 10.2) continue; // chừa chỗ màn hình
      const h = add(hexGeo, mat.panel, x, y, -11.3);
      h.rotation.z = Math.PI / 6;
      const rim = add(new THREE.TorusGeometry(0.88, 0.025, 4, 6), (r + c) % 3 ? neon.b : neon.a, x, y, -11.22);
      rim.rotation.z = Math.PI / 6;
      hexes.push({ rim, x, y });
    }
    // màn LED lớn
    const SCR = { w: 13, h: 7.3 };
    const scrCanvas = document.createElement('canvas'); scrCanvas.width = 1600; scrCanvas.height = 900;
    const scrTex = new THREE.CanvasTexture(scrCanvas); scrTex.colorSpace = THREE.SRGBColorSpace; scrTex.anisotropy = 8;
    add(new THREE.BoxGeometry(SCR.w + 0.5, SCR.h + 0.5, 0.2), mat.silver, 0, 5.9, -11.25);
    const scr = add(new THREE.PlaneGeometry(SCR.w, SCR.h), new THREE.MeshBasicMaterial({ map: scrTex, toneMapped: false }), 0, 5.9, -11.1);
    add(new THREE.BoxGeometry(SCR.w + 0.9, 0.08, 0.08), neon.gold, 0, 5.9 + SCR.h / 2 + 0.38, -11.05);
    add(new THREE.BoxGeometry(SCR.w + 0.9, 0.08, 0.08), neon.gold, 0, 5.9 - SCR.h / 2 - 0.38, -11.05);

    // cột LED hai bên (lăng trụ lục giác)
    const pillars = [];
    for (const x of [-11, -8.4, 8.4, 11]) {
      const p = add(new THREE.CylinderGeometry(0.55, 0.65, 11, 6), mat.panel, x, 5.5, -9.6);
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2 + Math.PI / 6;
        const e = add(new THREE.BoxGeometry(0.05, 10.6, 0.05), Math.abs(x) > 9 ? neon.b : neon.a, x + Math.cos(a) * 0.6, 5.5, -9.6 + Math.sin(a) * 0.6);
        pillars.push(e);
      }
    }

    /* ---------- Giàn đèn và đèn quét ---------- */
    const truss = new THREE.Group(); scene.add(truss);
    for (const z of [-7, 1]) add(new THREE.BoxGeometry(22, 0.35, 0.35), mat.truss, 0, 11, z, truss);
    for (const x of [-10.8, 10.8]) add(new THREE.BoxGeometry(0.35, 0.35, 8.4), mat.truss, x, 11, -3, truss);
    const beams = [];
    const beamGeo = new THREE.ConeGeometry(1.1, 11, 24, 1, true).translate(0, -5.5, 0);
    for (let i = 0; i < 8; i++) {
      const x = -9 + i * (18 / 7), z = i % 2 ? -7 : 1;
      const head = add(new THREE.CylinderGeometry(0.22, 0.28, 0.45, 12), mat.truss, x, 10.6, z);
      const m = new THREE.MeshBasicMaterial({ color: '#4fd2ff', transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
      const cone = new THREE.Mesh(beamGeo, m); cone.position.set(x, 10.5, z); scene.add(cone);
      beams.push({ cone, ph: i * 0.8, x });
    }

    /* ---------- Nhân vật đơn giản (thay bằng mô hình đất sét của game khi dựng thật) ---------- */
    const SKIN = ['#f2c7a1', '#e8b48c', '#d9a07a'];
    const SHIRTS = ['#ff6b6b', '#ffd166', '#06d6a0', '#4dabf7', '#b197fc', '#ff922b', '#f783ac', '#63e6be', '#ffffff'];
    function person({ h = 1.35, shirt = '#4dabf7', seated = false, suit = false, girl = false } = {}) {
      const g = new THREE.Group();
      const body = add(new THREE.CapsuleGeometry(h * 0.16, h * (seated ? 0.22 : 0.36), 6, 12), M(shirt, { roughness: .7, metalness: 0 }), 0, 0, 0, g);
      body.position.y = seated ? h * 0.42 : h * 0.55;
      if (!seated) add(new THREE.CapsuleGeometry(h * 0.1, h * 0.28, 4, 8), M(suit ? '#1c1f2e' : '#2b3a67', { roughness: .8, metalness: 0 }), 0, h * 0.2, 0, g).scale.x = 1.5;
      const head = add(new THREE.SphereGeometry(h * 0.13, 20, 16), M(SKIN[(Math.random() * 3) | 0], { roughness: .8, metalness: 0 }), 0, body.position.y + h * 0.36, 0, g);
      add(new THREE.SphereGeometry(h * 0.135, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), M('#1a1410', { roughness: .9, metalness: 0 }), 0, head.position.y + 0.02, -0.015, g);
      if (girl) add(new THREE.CapsuleGeometry(h * 0.12, h * 0.2, 4, 10), M('#1a1410', { roughness: .9, metalness: 0 }), 0, head.position.y - h * 0.12, -h * 0.07, g);
      if (suit) add(new THREE.BoxGeometry(0.06, 0.32, 0.02), M('#d6336c'), 0, body.position.y + 0.08, h * 0.16, g); // cà vạt
      return g;
    }

    /* ---------- 4 bục thí sinh ---------- */
    const NAMES = ['Minh Anh', 'Gia Bảo', 'Khánh Linh', 'Đức Huy'];
    const COLORS = ['#ff5d73', '#ffb020', '#27d17f', '#3fa9ff']; // màu riêng mỗi thí sinh (bục, chuông, thẻ điểm)
    const pods = [];
    function podCanvas() { const c = document.createElement('canvas'); c.width = 512; c.height = 300; return c; }
    for (let i = 0; i < 4; i++) {
      const x = -4.8 + i * 3.2, z = -1.2 - Math.abs(x) * 0.18;
      const g = new THREE.Group(); g.position.set(x, 0.62, z); g.rotation.y = -x * 0.045; scene.add(g);
      const col = new THREE.Color(COLORS[i]);
      const ringM = glow(col, 2.4);
      add(new THREE.CylinderGeometry(1.05, 1.1, 0.12, 48), mat.silver, 0, 0.06, 0, g);
      const ring = add(new THREE.TorusGeometry(1.08, 0.04, 8, 64).rotateX(Math.PI / 2), ringM, 0, 0.12, 0, g);
      // thân bục: khối vát, mặt trước có màn điểm
      const shape = new THREE.Shape(); shape.moveTo(-0.62, 0); shape.lineTo(0.62, 0); shape.lineTo(0.74, 0.74); shape.lineTo(-0.74, 0.74); shape.closePath();
      const bodyGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.7, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 2 }).translate(0, 0, -0.35);
      add(bodyGeo, mat.white, 0, 0.12, 0, g);
      add(new THREE.BoxGeometry(1.6, 0.07, 0.8), mat.silver, 0, 0.9, -0.02, g);           // mặt bàn
      const strip = add(new THREE.BoxGeometry(1.62, 0.05, 0.05), ringM, 0, 0.86, 0.4, g);  // viền đèn mép bàn
      const canv = podCanvas(); const tex = new THREE.CanvasTexture(canv); tex.colorSpace = THREE.SRGBColorSpace;
      add(new THREE.PlaneGeometry(0.98, 0.575), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }), 0, 0.5, 0.385, g);
      // máy tính bảng trả lời (quay về thí sinh) + chuông
      const tab = add(new THREE.BoxGeometry(0.62, 0.03, 0.42), M('#0d1330', { roughness: .2, metalness: .6 }), -0.25, 0.96, -0.12, g);
      tab.rotation.x = -0.35;
      const tabScr = add(new THREE.PlaneGeometry(0.56, 0.36), glow('#2f6bff', 1.2), -0.25, 0.982, -0.115, g);
      tabScr.rotation.x = -Math.PI / 2 - 0.35;
      add(new THREE.CylinderGeometry(0.13, 0.15, 0.06, 24), mat.silver, 0.5, 0.96, -0.1, g);
      const bell = add(new THREE.SphereGeometry(0.11, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), glow(col, 1.6), 0.5, 0.99, -0.1, g);
      // cột đèn sau lưng thí sinh
      const haloM = glow(col, 0.9);
      add(new THREE.BoxGeometry(0.06, 2.4, 0.06), haloM, -0.95, 1.2, -1.0, g);
      add(new THREE.BoxGeometry(0.06, 2.4, 0.06), haloM, 0.95, 1.2, -1.0, g);
      add(new THREE.BoxGeometry(1.96, 0.06, 0.06), haloM, 0, 2.4, -1.0, g);
      const kid = person({ h: 1.45, shirt: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'][i] });
      kid.position.set(0, 0.12, -0.62); g.add(kid);
      add(new THREE.BoxGeometry(0.34, 0.22, 0.02), M(COLORS[i]), 0, 0.98, 0.18, kid);  // khăn / thẻ màu đội
      const spot = new THREE.SpotLight(col, 60, 14, 0.32, 0.6, 1.4);
      spot.position.set(x * 1.05, 10.5, z + 3); spot.target = kid; spot.castShadow = i === 1 || i === 2; scene.add(spot);
      pods.push({ g, col, ringM, canv, tex, tabScr, bell, spot, score: 0, shown: 0, state: 'idle', lockAt: 0, kid, name: NAMES[i] });
    }

    function drawPod(p, sec) {
      const c = p.canv.getContext('2d'); const W = c.canvas.width, H = c.canvas.height;
      const st = p.state;
      const bg = st === 'right' ? '#0f9d58' : st === 'wrong' ? '#c62828' : st === 'locked' ? '#1d3fbf' : '#0a1550';
      const grd = c.createLinearGradient(0, 0, 0, H); grd.addColorStop(0, bg); grd.addColorStop(1, '#050b2e');
      c.fillStyle = grd; c.fillRect(0, 0, W, H);
      c.fillStyle = p.col.getStyle(); c.fillRect(0, 0, W, 16);
      c.fillStyle = '#fff'; c.font = '600 46px Segoe UI'; c.textAlign = 'center'; c.fillText(p.name, W / 2, 72);
      c.font = '800 130px Segoe UI'; c.fillStyle = '#ffd45c'; c.fillText(String(Math.round(p.shown)), W / 2, 210);
      c.font = '600 34px Segoe UI'; c.fillStyle = '#cfe0ff';
      const label = st === 'locked' ? `Đã chốt ${p.lockAt.toFixed(1)} giây` : st === 'right' ? 'Đúng!' : st === 'wrong' ? 'Chưa đúng' : st === 'think' ? 'Đang suy nghĩ…' : '';
      c.fillText(label, W / 2, 272);
      if (st === 'think' && sec != null) { c.fillStyle = p.col.getStyle(); c.fillRect(30, 285, (W - 60) * sec, 8); }
      p.tex.needsUpdate = true;
    }

    /* ---------- Bục MC đôi: 2 MC đứng chung một bục, thay phiên nhau nói ---------- */
    const mcG = new THREE.Group(); mcG.position.set(-6.3, 0.62, 0.4); mcG.rotation.y = 0.7; scene.add(mcG);
    add(new THREE.CylinderGeometry(1.45, 1.5, 0.1, 48), mat.silver, 0, 0.05, 0, mcG);
    add(new THREE.TorusGeometry(1.47, 0.035, 8, 64).rotateX(Math.PI / 2), neon.gold, 0, 0.1, 0, mcG);
    const mcShape = new THREE.Shape(); mcShape.moveTo(-0.85, 0); mcShape.lineTo(0.85, 0); mcShape.lineTo(1.0, 0.95); mcShape.lineTo(-1.0, 0.95); mcShape.closePath();
    add(new THREE.ExtrudeGeometry(mcShape, { depth: 0.45, bevelEnabled: false }).translate(0, 0, -0.22), mat.white, 0, 0.1, 0.25, mcG);
    add(new THREE.BoxGeometry(2.1, 0.06, 0.6), mat.silver, 0, 1.08, 0.25, mcG).rotation.x = 0.25;
    for (const x of [-0.5, 0.5]) add(new THREE.BoxGeometry(0.06, 0.8, 0.04), neon.gold, x, 0.6, 0.49, mcG);
    const mcs = [
      { fig: person({ h: 1.75, shirt: '#1c1f2e', suit: true }), x: -0.5, name: 'MC nam' },
      { fig: person({ h: 1.65, shirt: '#c2255c', girl: true }), x: 0.5, name: 'MC nữ' },
    ];
    mcs.forEach(m => {
      m.fig.position.set(m.x, 0.1, -0.35); mcG.add(m.fig);
      m.spot = new THREE.SpotLight('#fff3d6', 50, 14, 0.18, 0.6, 1.4);
      m.spot.position.set(-4.6 + m.x, 10.5, 4); m.spot.target = m.fig; scene.add(m.spot);
      // vòng sáng dưới chân: sáng khi MC này đang nói
      m.ring = add(new THREE.TorusGeometry(0.38, 0.03, 8, 40).rotateX(Math.PI / 2), glow('#ffc93c', 0.2), m.x, 0.12, -0.35, mcG);
    });

    /* ---------- Khán phòng 50 chỗ ---------- */
    const seats = [];
    for (let r = 0; r < 5; r++) {
      const z = 8.2 + r * 1.35, y = r * 0.42;
      if (r) add(new THREE.BoxGeometry(17, 0.42 * r, 1.35), mat.tier, 0, (0.42 * r) / 2, z);
      add(new THREE.BoxGeometry(17, 0.04, 0.04), neon.b, 0, y + 0.02, z - 0.68);
      for (let c = 0; c < 10; c++) {
        const x = (c < 5 ? -1 : 1) * (1.0 + (c % 5) * 1.25) * (c < 5 ? 1 : 1) * 1;
        const sx = c < 5 ? -(1.0 + (4 - c) * 1.25) : 1.0 + (c - 5) * 1.25;
        const sg = new THREE.Group(); sg.position.set(sx, y, z); scene.add(sg);
        add(new THREE.BoxGeometry(0.85, 0.42, 0.6), mat.seat, 0, 0.21, 0.05, sg);
        add(new THREE.BoxGeometry(0.85, 0.75, 0.12), mat.seat, 0, 0.6, 0.38, sg);
        const lamp = add(new THREE.BoxGeometry(0.5, 0.04, 0.02), glow('#2fc8ff', 0.4), 0, 0.98, 0.45, sg); // đèn lưng ghế: sáng khi khán giả đó trả lời đúng
        let kid = null;
        if (Math.random() < 0.88) { kid = person({ h: 1.25, shirt: SHIRTS[(Math.random() * SHIRTS.length) | 0], seated: true }); kid.position.set(0, 0.25, 0.1); kid.rotation.y = Math.PI; sg.add(kid); }
        seats.push({ sg, lamp, kid, ph: Math.random() * 6 });
      }
    }
    add(new THREE.BoxGeometry(1.2, 0.02, 7), M('#0d1a63'), 0, 0.01, 10.9); // lối đi giữa

    /* ---------- Đèn chung ---------- */
    scene.add(new THREE.HemisphereLight('#6b8cff', '#0a0f30', 0.35));
    const wash = new THREE.DirectionalLight('#9fc3ff', 0.6); wash.position.set(4, 14, 14); scene.add(wash);
    const stageWash = new THREE.PointLight('#5a8cff', 30, 20, 1.5); stageWash.position.set(0, 6, 3); scene.add(stageWash);

    /* ---------- Màn hình lớn ---------- */
    const ROUNDS = {
      idle:     { title: 'ĐẤU TRƯỜNG NHÍ', sub: 'Toán · Tiếng Việt · Lớp 3', a: '#2fc8ff', b: '#7b5cff' },
      open:     { title: 'MỞ MÀN', sub: 'Chào mừng 4 nhà thông thái nhí', a: '#ffc93c', b: '#2fc8ff' },
      khoidong: { title: 'KHỞI ĐỘNG', sub: '12 câu · 15 giây · đúng +10', a: '#21e6a3', b: '#2fc8ff', sec: 15, kind: 'abcd' },
      tangtoc:  { title: 'TĂNG TỐC', sub: 'Nhanh nhất +40 · +30 · +20 · +10', a: '#ff8a2a', b: '#ff3d9a', sec: 30, kind: 'order' },
      vedich:   { title: 'VỀ ĐÍCH', sub: 'Chọn độ cao · bấm chuông giành quyền', a: '#ffc93c', b: '#a35cff', sec: 20, kind: 'abcd' },
      win:      { title: 'TRAO GIẢI', sub: 'Nhà thông thái nhí của buổi hôm nay', a: '#ffd45c', b: '#ff5d73' },
    };
    const SAMPLE = {
      abcd:  { q: '36 : 4 + 15 = ?', o: ['A. 24', 'B. 21', 'C. 9', 'D. 51'], a: 0 },
      order: { q: 'Xếp thành câu đúng:', o: ['đàn chim', 'bay về', 'tổ', 'Chiều chiều,'], a: [3, 0, 1, 2] },
    };
    let mode = 'idle', timer = null, phase = 'none', t0 = 0, revealAt = 0;

    function rr(c, x, y, w, h, r) { c.beginPath(); c.roundRect(x, y, w, h, r); }
    /* Ảnh màn chờ (của chủ dự án, public/dautruong/screen.jpg 1600 × 900): chữ tên cũ trong ảnh đã được phủ bằng một băng tên
       trống (PLATE), tên chương trình vẽ lúc chạy từ SHOW_NAME để đổi tên không phải sửa ảnh. */
    const PLATE = { cx: 808, top: 245, bottom: 508, w: 840 };
    const poster = new Image();
    poster.src = `${import.meta.env.BASE_URL}dautruong/screen.jpg`;
    function drawPoster(c, W, H, sub) {
      c.drawImage(poster, 0, 0, W, H);
      const lines = SHOW_NAME.split('\n');
      const size = lines.length > 1 ? 104 : 132;
      c.textAlign = 'center'; c.textBaseline = 'alphabetic'; c.lineJoin = 'round';
      lines.forEach((t, k) => {
        let fs = size;
        c.font = `900 ${fs}px "Segoe UI", system-ui, sans-serif`;
        while (c.measureText(t).width > PLATE.w && fs > 48) { fs -= 4; c.font = `900 ${fs}px "Segoe UI", system-ui, sans-serif`; }
        const y = lines.length > 1 ? PLATE.top + 120 + k * 118 : PLATE.top + 170;
        const gold = c.createLinearGradient(0, y - fs, 0, y);
        gold.addColorStop(0, '#fff6c2'); gold.addColorStop(0.55, '#ffd23f'); gold.addColorStop(1, '#f59e0b');
        c.lineWidth = 16; c.strokeStyle = '#0b2a8a'; c.strokeText(t, PLATE.cx, y);
        c.lineWidth = 6; c.strokeStyle = '#ffffff'; c.strokeText(t, PLATE.cx, y);
        c.fillStyle = k === 0 && lines.length > 1 ? '#ffffff' : gold; c.fillText(t, PLATE.cx, y);
      });
      c.font = '700 40px "Segoe UI", system-ui, sans-serif';
      c.lineWidth = 6; c.strokeStyle = '#0b2a8a'; c.strokeText(sub, PLATE.cx, PLATE.bottom);
      c.fillStyle = '#ffffff'; c.fillText(sub, PLATE.cx, PLATE.bottom);
    }
    function drawScreen(now) {
      const c = scrCanvas.getContext('2d'); const W = 1600, H = 900; const R = ROUNDS[mode];
      const g = c.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#071653'); g.addColorStop(1, '#1a0b52');
      c.fillStyle = g; c.fillRect(0, 0, W, H);
      // hoa văn lục giác mờ chạy
      c.save(); c.globalAlpha = 0.12; c.strokeStyle = R.a; c.lineWidth = 3;
      const off = reduce ? 0 : (now * 0.03) % 104;
      for (let y = -104; y < H + 104; y += 90) for (let x = -120; x < W + 120; x += 104) {
        const cx = x + ((y / 90) % 2 ? 52 : 0) + off, cy = y;
        c.beginPath(); for (let k = 0; k < 6; k++) { const a = Math.PI / 3 * k + Math.PI / 6; c.lineTo(cx + Math.cos(a) * 46, cy + Math.sin(a) * 46); } c.closePath(); c.stroke();
      }
      c.restore();
      c.textAlign = 'center';
      if ((mode === 'idle' || mode === 'open') && poster.complete && poster.naturalWidth) {
        drawPoster(c, W, H, mode === 'open' ? 'Chào mừng 4 nhà thông thái nhí!' : R.sub);
        scrTex.needsUpdate = true; return;
      }
      if (!R.sec || phase === 'none') {
        c.shadowColor = R.a; c.shadowBlur = 40; c.fillStyle = '#fff'; c.font = '900 170px Segoe UI'; c.fillText(R.title, W / 2, 430);
        c.shadowBlur = 0; c.fillStyle = R.a; c.font = '600 60px Segoe UI'; c.fillText(R.sub, W / 2, 540);
        if (mode === 'win') {
          const best = [...pods].sort((a, b) => b.score - a.score);
          c.font = '700 54px Segoe UI'; c.fillStyle = '#ffd45c';
          best.forEach((p, k) => c.fillText(`${k + 1}. ${p.name}  ${p.score}`, W / 2, 640 + k * 62));
        }
        scrTex.needsUpdate = true; return;
      }
      // thanh tiêu đề vòng
      c.fillStyle = R.a; rr(c, 60, 40, 520, 90, 45); c.fill();
      c.fillStyle = '#061033'; c.font = '900 56px Segoe UI'; c.fillText(R.title, 320, 106);
      // đồng hồ vòng tròn
      const S = SAMPLE[R.kind];
      const left = timer ? Math.max(0, timer.end - now) / 1000 : 0;
      const frac = timer ? left / timer.total : 0;
      const cx = W - 150, cy = 120, rad = 82;
      c.lineWidth = 18; c.strokeStyle = 'rgba(255,255,255,.15)'; c.beginPath(); c.arc(cx, cy, rad, 0, Math.PI * 2); c.stroke();
      c.strokeStyle = left <= 5 && phase === 'think' ? '#ff4d5e' : R.a;
      c.beginPath(); c.arc(cx, cy, rad, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * frac); c.stroke();
      c.fillStyle = '#fff'; c.font = '800 80px Segoe UI'; c.fillText(phase === 'think' ? Math.ceil(left) : '0', cx, cy + 28);
      // câu hỏi
      c.fillStyle = 'rgba(8,20,80,.85)'; rr(c, 80, 230, W - 160, 170, 30); c.fill();
      c.strokeStyle = R.a; c.lineWidth = 5; c.stroke();
      c.fillStyle = '#fff'; c.font = '700 82px Segoe UI'; c.fillText(S.q, W / 2, 345);
      // phương án
      const rev = phase === 'reveal';
      S.o.forEach((o, k) => {
        const x = 80 + (k % 2) * ((W - 160) / 2 + 10), y = 440 + Math.floor(k / 2) * 190, w = (W - 160) / 2 - 10, h = 160;
        let fill = 'rgba(15,35,120,.9)';
        if (rev && R.kind === 'abcd' && k === S.a) fill = '#0f9d58';
        if (rev && R.kind === 'order') fill = '#0f9d58';
        c.fillStyle = fill; rr(c, x, y, w, h, 28); c.fill(); c.strokeStyle = R.b; c.lineWidth = 4; c.stroke();
        c.fillStyle = '#fff'; c.font = '700 70px Segoe UI';
        const txt = R.kind === 'order' && rev ? `${S.a.indexOf(k) + 1}. ${o}` : o;
        c.fillText(txt, x + w / 2, y + 104);
      });
      scrTex.needsUpdate = true;
    }

    /* ---------- Diễn một câu: hỏi → đếm giờ → các bục chốt → hết giờ / đủ 4 người → lật ---------- */
    function runQuestion() {
      const R = ROUNDS[mode];
      phase = 'think'; t0 = performance.now();
      timer = { total: R.sec, end: t0 + R.sec * 1000 };
      pods.forEach(p => { p.state = 'think'; p.lockAt = 0; p.plan = 2 + Math.random() * (R.sec * 0.9); p.ok = Math.random() < 0.7; });
    }
    function reveal() {
      phase = 'reveal'; revealAt = performance.now();
      const R = ROUNDS[mode];
      const order = pods.filter(p => p.state === 'locked' && p.ok).sort((a, b) => a.lockAt - b.lockAt);
      pods.forEach(p => {
        const right = p.state === 'locked' && p.ok;
        p.state = right ? 'right' : 'wrong';
        if (right) p.score += R.kind === 'order' ? [40, 30, 20, 10][order.indexOf(p)] : mode === 'vedich' ? 20 : 10;
      });
      seats.forEach(s => { s.right = Math.random() < 0.65; });
      setTimeout(() => { if (gone) return; if (ROUNDS[mode].sec) runQuestion(); }, 5200);
    }
    function setMode(m) {
      mode = m; phase = 'none'; timer = null;
      root.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('on', b.dataset.mode === m));
      const R = ROUNDS[m];
      neon.a.emissive.set(R.a); neon.b.emissive.set(R.b);
      beams.forEach((b, i) => b.cone.material.color.set(i % 2 ? R.b : R.a));
      pods.forEach(p => { p.state = 'idle'; });
      seats.forEach(s => { s.right = false; });
      if (m === 'open' || m === 'idle') pods.forEach(p => { p.score = 0; p.shown = 0; });
      if (R.sec) setTimeout(() => { if (gone) return; if (mode === m) runQuestion(); }, 2200); // tiêu đề vòng hiện 2,2 giây rồi vào câu
      if (m === 'win') cam('front');
    }

    /* ---------- Vòng lặp ---------- */
    const clock = new THREE.Clock();
    function frame() {
      if (!root.isConnected) { dispose(); return; } // rời trang bằng đường khác (nút Back của trình duyệt, đổi trang)
      const now = performance.now(); const t = clock.getElapsedTime();
      const dt = Math.min(0.1, (now - (frame.last || now)) / 1000); frame.last = now;
      if (camTo) {
        camera.position.lerp(camTo.p, 0.06); controls.target.lerp(camTo.t, 0.06);
        camera.fov += (camTo.fov - camera.fov) * 0.06; camera.updateProjectionMatrix();
        if (camera.position.distanceTo(camTo.p) < 0.02 && controls.target.distanceTo(camTo.t) < 0.02) {
          camera.fov = camTo.fov; camera.updateProjectionMatrix(); camTo = null;
        }
      }
      camMove(dt);
      controls.update();
      camRead();
      const R = ROUNDS[mode];
      // các bục chốt đáp án giả lập; đủ 4 người hoặc hết giờ thì lật
      if (phase === 'think') {
        const el = (now - t0) / 1000;
        pods.forEach(p => { if (p.state === 'think' && el >= p.plan) { p.state = 'locked'; p.lockAt = el; } });
        if (pods.every(p => p.state === 'locked') || now >= timer.end) reveal();
      }
      // đèn quét
      const speed = mode === 'tangtoc' ? 2.2 : mode === 'win' ? 1.6 : 0.6;
      beams.forEach(b => {
        const s = reduce ? 0 : Math.sin(t * speed + b.ph);
        b.cone.rotation.z = s * 0.45; b.cone.rotation.x = 0.25 + (reduce ? 0 : Math.cos(t * speed * 0.7 + b.ph)) * 0.25;
        b.cone.material.opacity = phase === 'reveal' ? 0.13 : 0.07;
      });
      // nhịp neon
      const pulse = reduce ? 1 : 0.8 + 0.4 * Math.sin(t * (phase === 'think' ? 6 : 2));
      neon.a.emissiveIntensity = 2.2 * pulse; neon.b.emissiveIntensity = 2.0 * (reduce ? 1 : 1.2 - 0.4 * Math.sin(t * 2));
      hexes.forEach(h => {
        const w = reduce ? 1 : 0.5 + 0.5 * Math.sin(t * 2.5 - h.x * 0.25 + h.y * 0.1);
        h.rim.scale.setScalar(1);
        h.rim.material = w > 0.75 ? neon.a : neon.b;
      });
      // bục
      pods.forEach(p => {
        const st = p.state;
        const col = st === 'right' ? '#21e67a' : st === 'wrong' ? '#ff3b4d' : st === 'locked' ? '#ffffff' : p.col;
        p.ringM.emissive.set(col);
        p.ringM.emissiveIntensity = st === 'right' && !reduce ? 2 + 2 * Math.abs(Math.sin(t * 10)) : st === 'wrong' ? 1.2 : 2.4;
        p.spot.color.set(st === 'wrong' ? '#8a93b8' : col); p.spot.intensity = st === 'wrong' ? 15 : 60;
        p.tabScr.material.emissive.set(st === 'locked' ? '#ffffff' : '#2f6bff');
        if (p.shown < p.score) p.shown = Math.min(p.score, p.shown + 0.6); // điểm chạy số
        if (st === 'right' && !reduce) p.kid.position.y = 0.12 + Math.abs(Math.sin(t * 7)) * 0.12; else p.kid.position.y = 0.12;
        drawPod(p, phase === 'think' && timer ? Math.max(0, timer.end - now) / (timer.total * 1000) : null);
      });
      // khán phòng: đèn lưng ghế sáng cho ai đúng, vỗ tay lúc lật đáp án
      seats.forEach(s => {
        s.lamp.material.emissive.set(s.right ? '#21e67a' : R.a);
        s.lamp.material.emissiveIntensity = s.right ? 2.5 : 0.35;
        if (s.kid) s.kid.position.y = 0.25 + ((phase === 'reveal' || mode === 'win') && !reduce ? Math.abs(Math.sin(t * 9 + s.ph)) * 0.08 : 0);
      });
      // 2 MC thay phiên: lúc đọc / lật thì một người nói (vòng chân sáng, đèn rọi mạnh, nhún nhẹ), lúc thí sinh suy nghĩ cả hai im
      const talker = phase === 'think' ? -1 : Math.floor(t / 3.2) % 2;
      mcs.forEach((m, k) => {
        const on = k === talker;
        m.ring.material.emissiveIntensity = on ? 2.4 : 0.2;
        m.spot.intensity = on ? 75 : 30;
        m.fig.position.y = 0.1 + (on && !reduce ? Math.abs(Math.sin(t * 6)) * 0.02 : 0);
      });
      drawScreen(now);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }

    root.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => setMode(b.dataset.mode));
    /* ---------- 🎥 Bảng chỉnh góc máy ----------
       Giữ nút (hoặc phím) để dời camera: W S tiến lùi, A D trái phải, R F lên xuống, Q E xoay, T G ngước cúi, Z X phóng thu.
       Ô số sửa thẳng vị trí, điểm nhìn, góc nhìn. "Lưu vào góc" ghi đè góc đang chọn (theo màn ngang / dọc đang xem),
       "Thêm góc mới" tạo thêm nút góc. Lưu trên máy này; "Sao chép" lấy JSON mọi góc (cả ngang và dọc) để đặt làm mặc định. */
    const camsEl = root.querySelector('.dt-cams'), panel = root.querySelector('.dt-camset');
    const fields = [...panel.querySelectorAll('[data-f]')];
    const camHold = new Map();
    function paintCams() {
      camsEl.innerHTML = allCams().map((p, i) => `<button type="button" data-cam="${p.id}" aria-pressed="${p.id === camCur}" title="Phím ${i + 1}">${p.name}</button>`).join('')
        + `<button type="button" class="dt-cam-tool" aria-expanded="${!panel.hidden}">🎥 Chỉnh góc</button>`;
      const sel = panel.querySelector('[data-cs="which"]');
      sel.innerHTML = allCams().map(p => `<option value="${p.id}"${p.id === camCur ? ' selected' : ''}>${p.name}</option>`).join('');
      panel.querySelector('[data-cs="del"]').hidden = !camStore.extra.some(p => p.id === camCur);
      panel.querySelector('.dt-cs-kind').textContent = camKind() === 'port' ? 'màn dọc' : 'màn ngang';
    }
    camsEl.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.classList.contains('dt-cam-tool')) { panel.hidden = !panel.hidden; paintCams(); camRead(); return; }
      cam(b.dataset.cam);
    });
    const r2 = (n) => Math.round(n * 100) / 100;
    function camRead() {
      if (panel.hidden) return;
      const v = nowView(), vals = { px: v.pos[0], py: v.pos[1], pz: v.pos[2], tx: v.target[0], ty: v.target[1], tz: v.target[2], fov: v.fov };
      for (const f of fields) if (document.activeElement !== f) f.value = r2(vals[f.dataset.f]);
    }
    panel.addEventListener('input', (e) => {
      const f = e.target.closest('[data-f]');
      if (!f || f.value === '' || isNaN(+f.value)) return;
      camTo = null;
      const n = +f.value, k = f.dataset.f;
      if (k === 'fov') { camera.fov = THREE.MathUtils.clamp(n, 15, 100); camera.updateProjectionMatrix(); }
      else (k[0] === 'p' ? camera.position : controls.target)[k[1]] = n;
    });
    function camMove(dt) {
      if (!camHold.size) return;
      camTo = null;
      const a = (k) => camHold.get(k) || 0, sp = 4 * dt;
      const dir = controls.target.clone().sub(camera.position);
      const flat = new THREE.Vector3(dir.x, 0, dir.z).normalize(), right = new THREE.Vector3(-flat.z, 0, flat.x);
      const move = flat.multiplyScalar(a('fb') * sp).add(right.multiplyScalar(a('lr') * sp)).add(new THREE.Vector3(0, a('ud') * sp, 0));
      camera.position.add(move); controls.target.add(move);
      if (a('yaw')) { dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), -a('yaw') * 0.8 * dt); controls.target.copy(camera.position).add(dir); }
      if (a('pitch')) {
        const len = dir.length(), pitch = THREE.MathUtils.clamp(Math.asin(dir.y / len) + a('pitch') * 0.6 * dt, -1.4, 1.2);
        const h = Math.cos(pitch) * len, f2 = new THREE.Vector3(dir.x, 0, dir.z).normalize().multiplyScalar(h);
        controls.target.copy(camera.position).add(f2.setY(Math.sin(pitch) * len));
      }
      if (a('fov')) { camera.fov = THREE.MathUtils.clamp(camera.fov + a('fov') * 20 * dt, 15, 100); camera.updateProjectionMatrix(); }
    }
    for (const b of panel.querySelectorAll('[data-ax]')) {
      const ax = b.dataset.ax, d = +b.dataset.d;
      b.addEventListener('pointerdown', (e) => { camHold.set(ax, d); try { b.setPointerCapture(e.pointerId); } catch { /* đã nhả */ } });
      for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) b.addEventListener(ev, () => { if (camHold.get(ax) === d) camHold.delete(ax); });
      b.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    const KEYS = { KeyW: ['fb', 1], KeyS: ['fb', -1], KeyA: ['lr', -1], KeyD: ['lr', 1], KeyR: ['ud', 1], KeyF: ['ud', -1],
      KeyQ: ['yaw', -1], KeyE: ['yaw', 1], KeyT: ['pitch', 1], KeyG: ['pitch', -1], KeyZ: ['fov', -1], KeyX: ['fov', 1] };
    function onKey(e) {
      if (e.target.closest?.('input, select, textarea')) return;
      const num = /^Digit([1-9])$/.exec(e.code);
      if (num && e.type === 'keydown') { const p = allCams()[num[1] - 1]; if (p) cam(p.id); return; }
      const m = KEYS[e.code];
      if (!m) return;
      e.preventDefault();
      if (e.type === 'keydown') camHold.set(m[0], m[1]);
      else if (camHold.get(m[0]) === m[1]) camHold.delete(m[0]);
    }
    addEventListener('keydown', onKey); addEventListener('keyup', onKey);
    const note = (t) => { const el = panel.querySelector('.dt-cs-note'); el.textContent = t; clearTimeout(note.tm); note.tm = setTimeout(() => { el.textContent = ''; }, 4000); };
    panel.addEventListener('click', (e) => {
      const b = e.target.closest('[data-cs]');
      if (!b) return;
      const which = panel.querySelector('[data-cs="which"]').value, kind = camKind();
      if (b.dataset.cs === 'close') { panel.hidden = true; paintCams(); }
      else if (b.dataset.cs === 'save') {
        (camStore.set[which] ||= {})[kind] = cloneView(nowView());
        camSaveStore(); camCur = which; paintCams();
        note(`Đã lưu góc "${findCam(which).name}" cho ${kind === 'port' ? 'màn dọc' : 'màn ngang'}.`);
      } else if (b.dataset.cs === 'add') {
        let k = 1;
        while (allCams().some(p => p.name === `Góc ${k}`)) k++;
        const id = `x${Date.now().toString(36)}`;
        camStore.extra.push({ id, name: `Góc ${k}`, [kind]: cloneView(nowView()) });
        camSaveStore(); camCur = id; paintCams();
        note(`Đã thêm "Góc ${k}".`);
      } else if (b.dataset.cs === 'reset') {
        if (camStore.set[which]) delete camStore.set[which][kind];
        camSaveStore(); cam(which);
        note('Đã về góc mặc định.');
      } else if (b.dataset.cs === 'del') {
        camStore.extra = camStore.extra.filter(p => p.id !== camCur);
        delete camStore.set[camCur];
        camSaveStore(); cam('wide');
      } else if (b.dataset.cs === 'copy') {
        const out = allCams().map(p => ({ id: p.id, name: p.name, land: viewOf(p, 'land'), port: viewOf(p, 'port') }));
        const txt = JSON.stringify(out, (k, v) => (typeof v === 'number' ? r2(v) : v));
        const done = () => note('Đã sao chép thông số mọi góc. Dán gửi để đặt làm mặc định.');
        if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, () => prompt('Sao chép chuỗi này:', txt)); else prompt('Sao chép chuỗi này:', txt);
      }
    });
    panel.querySelector('[data-cs="which"]').addEventListener('change', (e) => cam(e.target.value));
    cam('wide', true);
    frame();

    const ro = new ResizeObserver(() => {
      const w = root.clientWidth, h = root.clientHeight; if (!w || !h) return;
      const was = camKind();
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
      if (camKind() !== was) cam(camCur, true); // xoay màn: dùng góc ngang / dọc tương ứng
    });
    ro.observe(root);
    window.__arena = { setMode, cam };

    const canvas = renderer.domElement;
    root.insertBefore(canvas, root.firstChild); // cảnh nằm dưới các nút
    return () => {
      if (gone) return;
      gone = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      removeEventListener('keydown', onKey); removeEventListener('keyup', onKey);
      controls.dispose();
      scene.traverse(o => {
        o.geometry?.dispose?.();
        const ms = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
        ms.forEach(m => { m.map?.dispose?.(); m.dispose?.(); });
      });
      scene.environment?.dispose?.();
      pmrem.dispose();
      renderer.dispose();
      renderer.forceContextLoss?.();
      canvas.remove();
      if (window.__arena) delete window.__arena;
    };
  }
}
