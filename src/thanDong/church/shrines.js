// Chỗ tôn kính các thánh trong một khu của Nhà thờ Online (dữ liệu: saints.js): ở mỗi chỗ một giá nến (cốc nến đỏ như
// trong các nhà thờ ở Rô-ma) và một đốm sáng vàng lơ lửng để người đi từ xa thấy; đến gần thì hiện nút tên vị thánh, chạm vào
// giá nến cũng vậy. Bảng thông tin: ảnh thật (PHOTOS của chỗ đó, không có thì ảnh `real` của phim đầu tiên), nơi thật, các phim
// trong kho (▶ xem ngay, phim mở trên nhà thờ, đóng phim là về đúng chỗ), chưa có phim thì nút phim chỉ báo "chưa có"; Thắp nến (nến của máy này, cháy 7 ngày,
// localStorage `kt-nen@<id>`; chưa đồng bộ với người khác), Cầu nguyện (đi tới trước giá nến, quay về phía thánh, chắp tay).
// Cổng (GATES) sang khu khác: cột sáng; khu chưa dựng thì bảng ghi "đang xây" và các phim đã có của khu ấy.
import * as THREE from 'three';
import { t, getLang } from '../engine/lang.js';
import { creditOf } from '../film/player.js';
import { icon } from './icons.js';
import { ZONES, shrinesIn, gatesIn, slotsOf, photoOf } from './saints.js';
import { quoteOf, plaqueMesh, fontsReady } from './plaques.js';

const DAY = 864e5, BURN = 7 * DAY; // nến cháy 7 ngày
const RACK_MAX = 72;               // bệ nến vẽ tối đa 72 cốc (mộ thánh Phê-rô có 99 đèn: đếm riêng)
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const loc = (d) => (getLang() === 'en' && d.en) || d;
const storeKey = (id) => `kt-nen@${id}`;
function myCandles(id) {
  try {
    const now = Date.now();
    return (JSON.parse(localStorage.getItem(storeKey(id)) || '[]')).filter(x => now - x < BURN);
  } catch { return []; }
}
function saveCandles(id, list) { try { localStorage.setItem(storeKey(id), JSON.stringify(list)); } catch { /* chế độ riêng tư */ } }

/** Ánh sáng tròn mềm (ngọn lửa, đốm đánh dấu): một texture dùng chung. */
function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d'), r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, 'rgba(255,250,225,1)');
  r.addColorStop(0.25, 'rgba(255,214,120,0.75)');
  r.addColorStop(1, 'rgba(255,170,60,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * zone: khu đang mở; grid: lưới đi được (walkable, nearest, heightAt); films: { get(id), all(), open(id, done) };
 * act: { walkTo(x, z, then), pray(heading), pause(on), say(text, ms), goZone(zone, arrive), pickAdd(list), pickRemove(list),
 *   did(kind, def): đã thắp nến ('candle') / cầu nguyện ('pray') ở chỗ thánh này (Hạt giống, con dấu sổ hành hương) }.
 * loader, base: tải glb chi tiết của một chỗ thánh (`def.glb`, toạ độ của khu) khi mình tới gần hơn `def.loadR` (mặc định 30 m),
 * gỡ khi xa hơn 1,5 lần: khu chỉ cần phần vỏ nhẹ, nhà nguyện / ngôi mộ chi tiết tải sau.
 */
export function makeShrines({ scene, root, zone, grid, layout, films, calm, act, loader = null, base = '', extra = [], camera = null, canvas = null }) {
  const glow = glowTexture();
  const M = {
    iron: new THREE.MeshStandardMaterial({ color: 0x2a2420, metalness: 0.6, roughness: 0.55 }),
    brass: new THREE.MeshStandardMaterial({ color: 0xb08a48, metalness: 0.8, roughness: 0.35 }),
    cup: new THREE.MeshStandardMaterial({ color: 0x5a1218, roughness: 0.3, transparent: true, opacity: 0.85 }),
    cupLit: new THREE.MeshStandardMaterial({ color: 0xb8242c, emissive: 0xff3a22, emissiveIntensity: 1.1, roughness: 0.3, transparent: true, opacity: 0.92 }),
    flame: new THREE.SpriteMaterial({ map: glow, color: 0xffd27a, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }),
    beacon: new THREE.SpriteMaterial({ map: glow, color: 0xffe2a0, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.8 }),
    stone: new THREE.MeshStandardMaterial({ color: 0xdcd2c2, roughness: 0.55 }),
    panel: new THREE.MeshStandardMaterial({ color: 0x7a3f34, roughness: 0.32 }),            // ô đá đỏ trước bệ, như đá đỏ Rô-ma
    wax: new THREE.MeshStandardMaterial({ color: 0xf2e8d2, roughness: 0.6 }),
    core: new THREE.MeshBasicMaterial({ color: 0xffc04a }),                                   // lõi ngọn lửa: thấy cả giữa trưa
    slot: new THREE.MeshBasicMaterial({ color: 0x14100c }),
    gilt: new THREE.MeshStandardMaterial({ color: 0xc9a050, metalness: 0.85, roughness: 0.35, emissive: 0x4a3410 }), // ánh vàng nhẹ cả khi đêm
    pillar: new THREE.MeshBasicMaterial({ color: 0xffd98a, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
  };
  const G = {
    cup: new THREE.CylinderGeometry(0.035, 0.03, 0.07, 10),
    wax: new THREE.CylinderGeometry(0.031, 0.031, 0.014, 10),
    core: new THREE.ConeGeometry(0.011, 0.045, 8),
  };
  const group = new THREE.Group();
  scene.add(group);
  const items = [], pickables = [], flames = [];
  const over = Object.fromEntries((layout.shrines || []).map(s => [s.id, s]));
  const ground = (x, z) => grid.heightAt?.(x, z) || 0;
  const snap = (x, z) => (grid.walkable(x, z) ? [x, z] : grid.nearest(x, z, 10) || [x, z]);

  // ---- bệ nến: khối đá cẩm thạch nhiều bậc (bậc sau cao hơn), mép mỗi bậc viền đồng, cốc nến đỏ xếp hàng trên từng bậc;
  // đặt sát chân tượng / chân tường (toWall). Mặt trước quay về +z (phía người cầu nguyện), các bậc lùi về -z.
  const TIER = { d: 0.17, rise: 0.13, top: 0.62, gap: 0.1 };
  // wide: bệ rộng theo bệ tượng (def.rackW, m): ít bậc, cốc nến giãn ra cho đều cả bề ngang
  const tiersOf = (n, wide = 0) => {
    if (wide) { const rows = n > 24 ? 3 : 2, cols = Math.ceil(n / rows); return { cols, rows, w: wide, gap: (wide - 0.4) / cols }; }
    const cols = Math.min(16, Math.max(6, Math.ceil(n / 3)));
    return { cols, rows: Math.ceil(n / cols), w: Math.max(1.6, cols * TIER.gap + 0.24), gap: TIER.gap };
  };
  const depthOf = (n, wide) => tiersOf(n, wide).rows * TIER.d + 0.12;
  // gốc giá (mép trước bậc đầu) tới mép sau của chân bệ; nửa bề ngang kể cả chân bệ
  const rackBack = (n, wide) => depthOf(n, wide) - TIER.d / 2 + 0.035;
  const rackHalfW = (n, wide) => tiersOf(n, wide).w / 2 + 0.06;
  function rack(n, wide = 0) {
    const g = new THREE.Group();
    const { cols, rows, w, gap } = tiersOf(n, wide), back = -(rows * TIER.d + 0.12) + TIER.d / 2;
    const cups = [];
    for (let r = 0; r < rows; r++) {
      const top = TIER.top + r * TIER.rise, front = TIER.d / 2 - r * TIER.d;
      const blk = new THREE.Mesh(new THREE.BoxGeometry(w, top, front - back), M.stone);
      blk.position.set(0, top / 2, (front + back) / 2);
      const trim = new THREE.Mesh(new THREE.BoxGeometry(w + 0.01, 0.035, 0.02), M.brass);
      trim.position.set(0, top - 0.02, front + 0.005);
      g.add(blk, trim);
      for (let c = 0; c < cols && r * cols + c < n; c++) {
        const cup = new THREE.Mesh(G.cup, M.cup);
        cup.position.set((c - (cols - 1) / 2) * gap, top + 0.035, front - TIER.d / 2);
        const wax = new THREE.Mesh(G.wax, M.wax);                  // mặt sáp trong cốc
        wax.position.y = 0.024;
        cup.add(wax);
        g.add(cup);
        cups.push(cup);
      }
    }
    // chân bệ hơi rộng hơn, như bậc đá
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(w + 0.12, 0.08, -back + TIER.d / 2 + 0.1), M.stone);
    plinth.position.set(0, 0.04, (TIER.d / 2 + 0.05 + back) / 2);
    g.add(plinth);
    // mặt trước: ô đá đỏ viền đồng, giữa là hộp tiền dâng bằng đồng có khe
    const t0 = TIER.top, pw = w - 0.2, ph = t0 - 0.24;
    const frame = new THREE.Mesh(new THREE.BoxGeometry(pw + 0.04, ph + 0.04, 0.008), M.brass);
    frame.position.set(0, 0.1 + ph / 2, TIER.d / 2 + 0.004);
    const inset = new THREE.Mesh(new THREE.BoxGeometry(pw, ph, 0.012), M.panel);
    inset.position.set(0, 0.1 + ph / 2, TIER.d / 2 + 0.006);
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.17, 0.07), M.brass);
    box.position.set(0, 0.1 + ph / 2, TIER.d / 2 + 0.045);
    const slit = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.014, 0.004), M.slot);
    slit.position.set(0, 0.1 + ph / 2 + 0.05, TIER.d / 2 + 0.081);
    g.add(frame, inset, box, slit);
    return { g, cups };
  }
  function light(it, k) {
    const cup = it.cups[k];
    if (!cup || cup.userData.flame) return;
    cup.material = M.cupLit;
    const f = new THREE.Sprite(M.flame);
    f.scale.setScalar(0.11);
    f.position.set(cup.position.x, cup.position.y + 0.06, cup.position.z);
    const core = new THREE.Mesh(G.core, M.core);
    core.position.set(cup.position.x, cup.position.y + 0.05, cup.position.z);
    it.rack.add(f, core);
    cup.userData.flame = f;
    flames.push({ f, core, ph: Math.random() * 7 });
  }
  // nến khách hành hương đã thắp sẵn: chừng sáu phần mười số cốc, chọn theo id của chỗ (lần nào vào cũng vậy);
  // nến của máy này cắm vào các cốc còn trống (it.free)
  function seedOthers(it) {
    let h = 7;
    for (const ch of it.def.id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const rnd = () => ((h = (h * 16807) % 2147483647) / 2147483647);
    it.free = [];
    it.cups.forEach((_, k) => { if (rnd() < 0.6) light(it, k); else it.free.push(k); });
  }

  // ---- chỗ chưa có trong mô hình của khu (không `model`, không glb riêng): ảnh thật của nó trong khung mạ vàng, treo trên
  // bức tường phía trước người cầu nguyện (dò bằng tia), không có tường gần thì đứng trên giá vẽ; ảnh tải khi lại gần
  const texLoader = new THREE.TextureLoader();
  const ray = new THREE.Raycaster();
  const fwd = new THREE.Vector3();
  const isWall = (o) => o.isMesh && /^(vin|vat|grt)_/.test(o.material?.name || '') && !/^ph_/.test(o.material?.name || '');
  function pictureOf(it) {
    const list = (it.def.films || []).map(films.get).filter(Boolean);
    return photoOf(it.def.id) || it.def.photo || list.find(s => s.real)?.real;
  }
  // giá tranh triển lãm (exhibit.js): ảnh thu nhỏ còn 512 px trước khi đưa lên GPU (cả trăm tranh, điện thoại);
  // đứng gần (SHARP_R) thì đổi sang ảnh gốc cho nét, đi xa thì trả lại ảnh nhỏ (sharpen)
  const SHARP_R = 6, ANISO = 8;                                  // three.js tự hạ ANISO về mức máy hỗ trợ
  function shrink(tex) {
    const img = tex.image, k = Math.min(1, 512 / Math.max(img.width, img.height));
    if (k >= 1) return tex;
    const c = document.createElement('canvas');
    c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    tex.dispose();
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = ANISO;
    return t;
  }
  function sharpen(it, near) {
    const pic = it.picMesh;
    if (!pic || !it.img || near === !!it.sharp) return;
    if (near) {
      it.small = pic.material.map;
      it.sharp = new THREE.Texture(it.img);
      Object.assign(it.sharp, { colorSpace: THREE.SRGBColorSpace, anisotropy: ANISO, needsUpdate: true });
      pic.material.map = it.sharp;
    } else {
      pic.material.map = it.small;
      it.sharp.dispose();
      it.sharp = null;
    }
  }
  // bảng tên dưới tranh: chữ vẽ lên canvas; sub = dòng nhỏ (thời các ngài sống, năm phép lạ) nếu có
  function plaque(text, w, sub = '') {
    const H = sub ? 136 : 96;
    const c = document.createElement('canvas');
    c.width = 1024; c.height = H * 2;                            // vẽ gấp đôi cho chữ nét khi đứng sát
    const g = c.getContext('2d');
    g.scale(2, 2);
    g.fillStyle = '#2b2118'; g.fillRect(0, 0, 512, H);
    g.strokeStyle = '#c9a050'; g.lineWidth = 6; g.strokeRect(3, 3, 506, H - 6);
    g.fillStyle = '#f3e3bf'; g.textAlign = 'center'; g.textBaseline = 'middle';
    // phông của giao diện nhà thờ (đã tải, dấu tiếng Việt đặt đúng chỗ), chữ dựng sẵn (NFC)
    text = text.normalize('NFC');
    let size = 50;
    do { g.font = `700 ${size}px 'Cormorant Garamond', Georgia, serif`; size -= 2; } while (g.measureText(text).width > 480 && size > 20);
    g.fillText(text, 256, sub ? 46 : 52);
    if (sub) {
      g.fillStyle = '#c9a050';
      g.font = `italic 600 34px 'Cormorant Garamond', Georgia, serif`;
      g.fillText(sub.normalize('NFC'), 256, 100);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = ANISO;
    return new THREE.Mesh(new THREE.PlaneGeometry(w, w * H / 512), new THREE.MeshBasicMaterial({ map: tex }));
  }
  // tường phía trước chỗ cầu nguyện (dò lúc đặt, khu đã có trong scene): tường xa thì kéo giá nến và chỗ đứng lại, cách
  // tường 2,2 m, ngay dưới bức ảnh; it.wall = khoảng cách từ giá nến tới mặt tường (null: không có tường gần)
  let walls = null;
  const cast = (x, y, z, dir, far) => {
    ray.set(new THREE.Vector3(x, y, z).addScaledVector(dir, -0.6), dir);
    ray.far = far;
    return ray.intersectObjects(walls, false)[0];
  };
  function toWall(it) {
    if (!walls) { scene.updateMatrixWorld(true); walls = []; scene.traverse(o => { if (isWall(o)) walls.push(o); }); }
    let dir = new THREE.Vector3(-Math.sin(it.face), 0, -Math.cos(it.face));
    // tia ở tầm thấp (0,9 m): chạm mặt trước bệ tượng hay chân tường, chỗ đặt bệ nến
    const far = it.def.model ? 7 : 15, y = it.y + 0.9;
    const hit = cast(it.x, y, it.z, dir, far);
    if (!hit) { it.wall = null; [it.x, it.z] = snap(it.x, it.z); return; }
    // quay giá cho song song mặt tường: theo pháp tuyến chỗ tia chạm (mặt gần đứng, lệch hướng nhìn không quá 50°)
    if (hit.face) {
      const n = hit.face.normal.clone().transformDirection(hit.object.matrixWorld);
      if (n.dot(dir) > 0) n.negate();
      if (Math.abs(n.y) < 0.4) {
        const f = Math.atan2(n.x, n.z), dd = Math.atan2(Math.sin(f - it.face), Math.cos(f - it.face));
        if (Math.abs(dd) < 0.87) { it.face = f; dir = new THREE.Vector3(-Math.sin(f), 0, -Math.cos(f)); }
      }
    }
    // dò ở giữa và hai đầu giá: lấy chỗ gần nhất, để không đầu nào đâm vào tường / bệ
    const n = Math.min(it.def.candles || 12, RACK_MAX), half = rackHalfW(n, it.def.rackW);
    const sx = -dir.z, sz = dir.x;
    let at = Infinity;
    for (const k of [0, -1, 1]) {
      const h = cast(it.x + sx * half * k, y, it.z + sz * half * k, dir, far);
      if (h) at = Math.min(at, h.distance - 0.6);
    }
    if (!isFinite(at)) at = hit.distance - 0.6;
    const back = rackBack(n, it.def.rackW) + 0.03;                   // gốc giá ở gần mép trước: lùi đúng bề sâu phía sau
    const k = at - back;
    it.x += dir.x * k; it.z += dir.z * k; it.wall = back;
    it.y = ground(it.x, it.z);
    openFront(it, n, half, back);
    // chỗ đứng trống gần nhất trước bệ có thể xa hơn 1,6 m: nới vùng "lại gần" cho tới đó
    const [fx, fz] = snapFront(it, it.def.back || 1.6);
    it.r = Math.max(it.r, Math.hypot(fx - it.x, fz - it.z) + 1.5);
  }
  // lưới đi được: chỗ giá đứng thành ô chặn, dải sàn trước giá (tới 2,5 m) mở ra cho người đi lại sát giá,
  // trừ chỗ có tường / cột chắn giữa ô ấy và giá
  function openFront(it, n, half, back) {
    if (!grid.setCell) return;
    const c = grid.cell || 0.5, fx = Math.sin(it.face), fz = Math.cos(it.face), sx = fz, sz = -fx;
    const front = 0.18;
    for (let a = -half; a <= half + 1e-6; a += c / 2) for (let d = -back; d <= front; d += c / 2)
      grid.setCell(it.x + sx * a + fx * d, it.z + sz * a + fz * d, false);
    const lane = half + 0.8;
    for (let a = -lane; a <= lane + 1e-6; a += c / 2) for (let d = front + c; d <= 2.5; d += c / 2) {
      const x = it.x + sx * a + fx * d, z = it.z + sz * a + fz * d;
      if (grid.walkable(x, z)) continue;
      const to = new THREE.Vector3(-fx, 0, -fz), h = cast(x, it.y + 0.9, z, to, d + 0.6);
      if (h && h.distance - 0.6 < d - front - 0.05) continue;     // có vật chắn trước khi tới giá
      grid.setCell(x, z, true);
    }
  }
  function hang(it, tex) {
    const img = tex.image, a = img.width / img.height;
    const dir = new THREE.Vector3(-Math.sin(it.face), 0, -Math.cos(it.face));
    const easel = it.def.kind === 'exhibit';
    const niche = easel && it.def.mount != null;               // tranh trong hốc tường hầm mộ (exhibit.js): không chân, đáy ở `mount`
    const hit = !easel && it.wall != null;
    const dist = easel ? Math.hypot(it.def.look[0] - it.x, it.def.look[1] - it.z) : hit ? it.wall - 0.04 : 2.6;
    // ảnh lớn như một bức tranh bàn thờ: cao 4,2 m (rộng tối đa 5,6 m) trên tường, nhỏ hơn trên giá vẽ, vừa lòng hốc tường
    let h = hit ? 4.2 : niche ? 1.3 : easel ? 1.5 : 2.6, w = h * a;
    const maxW = hit ? 5.6 : niche ? 1.6 : easel ? 1.9 : 3.4;
    if (w > maxW) { w = maxW; h = w / a; }
    const g = new THREE.Group();
    g.position.set(it.x + dir.x * dist, it.y, it.z + dir.z * dist);
    g.rotation.y = it.face;
    // tượng có biển đồng khắc lời (plaques.js, Pietà): ảnh treo cao hơn, biển ngay dưới, trên bệ nến
    const said = hit && quoteOf(it.def.id);
    const y0 = said ? 2.5 : hit ? 1.6 : niche ? it.def.mount : easel ? 1.0 : 1.2;
    const frame = new THREE.Mesh(new THREE.BoxGeometry(w + 0.36, h + 0.36, 0.1), M.gilt);
    frame.position.set(0, y0 + h / 2, 0);
    const pic = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex }));
    pic.position.set(0, y0 + h / 2, 0.055);
    g.add(frame, pic);
    it.picMesh = pic;
    if (said) fontsReady().then(() => {
      if (it.pic !== g) return;                                  // đã gỡ ảnh trước khi phông tải xong
      const pl = plaqueMesh(it.def.id, 1.6, M.iron);
      pl.position.set(0, 1.78, 0.04);
      g.add(pl);
    });
    if (easel) {
      const pl = plaque(loc(it.def).name, niche ? 1.1 : Math.max(1.3, w + 0.36), loc(it.def).era);
      pl.position.set(0, y0 - 0.2 - pl.geometry.parameters.height / 2, 0.07);
      g.add(pl);
      // chạm vào khung / ảnh / bảng tên: đi tới đứng xem
      it.picks = [frame, pic, pl];
      for (const m of it.picks) m.userData.item = it;
      act.pickAdd?.(it.picks);
    }
    if (!hit && !niche) for (const sx of [-1, 1]) {            // giá vẽ: hai chân nghiêng
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, y0 + h * 0.8, 0.06), M.iron);
      leg.position.set(sx * w * 0.35, (y0 + h * 0.8) / 2, -0.12);
      leg.rotation.x = -0.06;
      g.add(leg);
    }
    group.add(g);
    it.pic = g;
  }
  function unhang(it) {
    if (it.picks) { act.pickRemove?.(it.picks); it.picks = null; }
    if (it.sharp) sharpen(it, false);
    it.small = it.img = null;
    it.picMesh = null;
    group.remove(it.pic);
    it.pic.traverse(o => { if (o.isMesh) { o.geometry.dispose(); if (o.material !== M.gilt && o.material !== M.iron) { o.material.map?.dispose(); o.material.map = null; o.material.dispose(); } } });
    it.pic = null;
  }

  // chỗ đứng trước bệ nến cách d m; bệ sát tượng nên chỗ ấy có thể không đi được: tìm xa dần ra phía trước
  function snapFront(it, d) {
    for (let k = d; k < d + 4; k += 0.25) {
      const x = it.x + Math.sin(it.face) * k, z = it.z + Math.cos(it.face) * k;
      if (grid.walkable(x, z)) return [x, z];
    }
    return snap(it.x + Math.sin(it.face) * d, it.z + Math.cos(it.face) * d);
  }
  // ---- giá tranh: chạm vào thì đi tới đứng trước tranh, quay mặt vào tranh (thẻ nội dung hiện vì đang nhìn nó)
  function goView(it) {
    const [x, z] = snap(it.x + Math.sin(it.face) * 0.6, it.z + Math.cos(it.face) * 0.6);
    const arrive = () => act.face?.(it.face);
    if (Math.hypot(x - act.me().pos.x, z - act.me().pos.z) < 0.4) arrive();
    else act.walkTo(x, z, arrive);
  }

  // ---- đặt các chỗ tôn kính và cổng
  const add = (def, gate = false) => {
    const o = over[def.id] || {};
    const [ax, az] = o.at || def.at;
    const [x, z] = snap(ax, az);
    const look = o.look || def.look || (gate ? null : [x, z - 3]);
    // cùng quy ước heading của world.js; tranh hốc tường nhìn từ đúng chỗ đứng của layout (ô đi được gần nhất có thể
    // lệch sang bên, tranh sẽ xoay xiên so với tường)
    const [fx0, fz0] = def.kind === 'exhibit' ? [ax, az] : [x, z];
    const face = look ? Math.atan2(-(look[0] - fx0), -(look[1] - fz0)) : 0;
    const it = { def, gate, x, z, y: ground(x, z), face, r: def.r || 4, cups: [] };
    // bệ nến dò tường từ đúng điểm `at` (chưa dời sang ô đi được), để giá nằm giữa chân tượng
    if (!gate && !def.glb && def.kind !== 'exhibit' && def.candles > 0) toWall(Object.assign(it, { x: ax, z: az }));
    if (gate) {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 9, 24, 1, true), M.pillar.clone());
      p.position.set(x, it.y + 4.5, z);
      const ring = new THREE.Mesh(new THREE.RingGeometry(1.05, 1.25, 40), p.material);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(x, it.y + 0.04, z);
      group.add(p, ring);
      pickables.push(p);
      p.userData.item = it;
      p.userData.fade = 0.16; // độ mờ đầy đủ; mờ dưới một nửa thì chạm xuyên qua (world.js tapAt)
      it.pillar = p;
    } else if (def.candles > 0) {
      const { g, cups } = rack(Math.min(def.candles, RACK_MAX), def.rackW);
      // giá đứng giữa người cầu nguyện và vị thánh, mặt cốc nến quay về phía người
      g.position.set(it.x, it.y, it.z);
      g.rotation.y = it.face;
      group.add(g);
      Object.assign(it, { rack: g, cups });
      g.traverse(m => { if (m.isMesh) { pickables.push(m); m.userData.item = it; } });
      seedOthers(it);
      myCandles(def.id).forEach((_, k) => light(it, it.free[k]));
      // tượng có sẵn trong mô hình, có lời khắc (plaques.js): biển đồng trên mặt bệ tượng, ngay sau giá nến
      if (def.model && it.wall != null && quoteOf(def.id)) fontsReady().then(() => {
        if (gone) return;
        const pl = plaqueMesh(def.id, def.rackW ? Math.min(1.8, def.rackW * 0.7) : 1.4, M.iron);
        const dir = new THREE.Vector3(-Math.sin(it.face), 0, -Math.cos(it.face)), y = it.y + 1.5;
        const h = cast(it.x, y, it.z, dir, 6), d = h ? h.distance - 0.6 - 0.025 : it.wall;
        pl.position.set(it.x + dir.x * d, y, it.z + dir.z * d);
        pl.rotation.y = it.face;
        group.add(pl);
      });
    }
    // đốm sáng lơ lửng: thấy được từ xa, chạm vào cũng mở bảng (giá tranh triển lãm thì không: chính bức tranh là dấu)
    if (def.kind === 'exhibit') { items.push(it); return; }
    const b = new THREE.Sprite(M.beacon.clone());
    b.scale.setScalar(gate ? 1.6 : 0.7);
    b.position.set(it.x, it.y + (gate ? 3.4 : 2.6), it.z);
    b.userData.item = it;
    b.userData.fade = 0.8;
    group.add(b);
    pickables.push(b);
    it.beacon = b;
    items.push(it);
  };
  for (const s of shrinesIn(zone)) add(s);
  for (const g of gatesIn(zone)) add(g, true);
  for (const s of extra) add(s);

  // ---- chi tiết tải sau: glb riêng của từng chỗ thánh, theo khoảng cách
  let gone = false, lazyT = 0;
  function lazy(me) {
    for (const it of items) {
      if (it.gate || it.noPic || it.def.model || it.def.glb) continue;
      const d = Math.hypot(it.x - me.pos.x, it.z - me.pos.z), R = it.def.kind === 'exhibit' ? 22 : 30;
      if (d < R && !it.pic && !it.picLoading) {
        const photo = pictureOf(it);
        if (!photo) { it.noPic = true; continue; }
        it.picLoading = true;
        texLoader.loadAsync('/' + photo.src).then((tex) => {
          it.picLoading = false;
          if (gone) { tex.dispose(); return; }
          if (it.def.kind === 'exhibit') { it.img = tex.image; tex = shrink(tex); }
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = ANISO;
          hang(it, tex);
        }).catch((e) => { it.picLoading = false; it.noPic = true; console.warn('[shrine]', e); });
      } else if (d > R * 1.5 && it.pic) unhang(it);
      else if (it.pic && it.img) sharpen(it, d < (it.sharp ? SHARP_R * 1.5 : SHARP_R));
    }
    if (!loader) return;
    for (const it of items) {
      if (!it.def.glb) continue;
      const d = Math.hypot(it.x - me.pos.x, it.z - me.pos.z), R = it.def.loadR || 30;
      if (d < R && !it.chunk && !it.loading) {
        it.loading = loader.loadAsync(base + it.def.glb).then((g) => {
          it.loading = null;
          if (gone) { g.scene.traverse(o => { o.geometry?.dispose(); [].concat(o.material || []).forEach(m => m.dispose()); }); return; }
          it.chunk = g.scene;
          it.chunkPick = [];
          g.scene.traverse(o => { if (o.isMesh) it.chunkPick.push(o); });
          scene.add(g.scene);
          act.pickAdd?.(it.chunkPick);
        }).catch((e) => { it.loading = null; it.def.glb = null; console.warn('[shrine]', e); });
      } else if (d > R * 1.5 && it.chunk) unloadChunk(it);
    }
  }
  function unloadChunk(it) {
    scene.remove(it.chunk);
    act.pickRemove?.(it.chunkPick);
    it.chunk.traverse(o => {
      o.geometry?.dispose();
      for (const m of [].concat(o.material || [])) { for (const v of Object.values(m)) if (v?.isTexture) v.dispose(); m.dispose(); }
    });
    it.chunk = it.chunkPick = null;
  }

  // ---- nút "gần đây" và bảng thông tin
  // Thẻ nội dung cố định ở góc trên trái (như "Trên màn ảnh" của một rạp chiếu): chỗ thánh, giá tranh hay cổng mình đang
  // đứng gần hoặc đang nhìn về; nút ▶ Xem phim và Thông tin (cổng: Vào). Không gắn nút nào lơ lửng trong cảnh.
  root.insertAdjacentHTML('beforeend', `<section class="ch-card" hidden aria-live="polite"></section>
    <div class="ch-saint" role="dialog" aria-modal="true" hidden><div class="ch-saint-in"></div></div>`);
  const cardEl = root.querySelector('.ch-card'), panel = root.querySelector('.ch-saint'), inner = panel.firstElementChild;
  let focus = null, open = null;
  // art: tác phẩm để học (cửa đồng, tranh khảm, tượng ở tiền sảnh): không nến, không cầu nguyện, chưa có phim thì không nhắc
  const KIND = { tomb: 'Mộ thánh', relic: 'Thánh tích', statue: 'Tượng thánh', altar: 'Bàn thờ', site: 'Di tích', art: 'Tác phẩm' };
  const filmsOf = (it) => (it.def.films || []).map(films.get).filter(Boolean);
  function card(it) {
    focus = it;
    cardEl.hidden = !it;
    if (!it) return;
    let kick, name, sub, btns;
    if (it.gate) {
      const Z = ZONES[it.def.to];
      kick = t('Lối sang khu khác'); name = t(Z?.name || ''); sub = Z?.built ? '' : t('Khu này đang được xây.');
      btns = (Z?.built ? `<button type="button" class="is-go" data-c="enter">${icon('door')}${t('Vào')}</button>` : '')
        + `<button type="button" data-c="info">${icon('info')}${t('Thông tin')}</button>`;
    } else {
      const d = loc(it.def), n = filmsOf(it).length;
      kick = it.def.kick ? (getLang() === 'en' ? it.def.kick.en : it.def.kick.vi) : t(KIND[it.def.kind] || 'Chỗ thánh');
      name = d.name; sub = d.era || d.where || '';
      btns = (n ? `<button type="button" class="is-go" data-c="film">${icon('play')}${t('Xem phim')}</button>`
        : it.def.kind === 'art' ? '' : `<button type="button" disabled>${t('Phim về ngài')}: ${t('sắp có')}</button>`)
        + `<button type="button" data-c="info">${icon('info')}${t('Thông tin')}</button>`;
    }
    cardEl.innerHTML = `<p class="ch-card-k">${esc(kick)}</p><h2>${esc(name)}</h2>${sub ? `<p class="ch-card-s">${esc(sub)}</p>` : ''}<div class="ch-card-b">${btns}</div>`;
  }
  cardEl.onclick = (e) => {
    const it = focus, k = e.target.closest('[data-c]')?.dataset.c;
    if (!it || !k) return;
    if (k === 'enter') { act.goZone(it.def.to, it.def.arrive); return; }
    const list = it.gate ? [] : filmsOf(it);
    if (k === 'info' || list.length > 1) show(it);       // nhiều phim: bảng chọn phim
    else if (list.length) { act.pause(true); films.open(list[0].id, () => act.pause(false)); }
  };
  panel.onclick = (e) => {
    if (e.target === panel || e.target.closest('[data-x]')) { hide(); return; }
    const f = e.target.closest('[data-film]');
    if (f) { hide(); act.pause(true); films.open(f.dataset.film, () => act.pause(false)); return; }
    const soon = e.target.closest('[data-soon]');
    if (soon) { soon.classList.add('is-said'); soon.textContent = t('Chưa có phim về ngài.'); return; }
    const a = e.target.closest('[data-do]')?.dataset.do;
    if (a === 'candle') lightNew(open);
    else if (a === 'pray') { const it = open; hide(); prayAt(it); }
    else if (a === 'enter') { const { to, arrive } = open.def; hide(); act.goZone(to, arrive); }
  };

  const storyLine = (s) => {
    const title = (getLang() === 'en' && s.en?.title) || s.title;
    return `<button type="button" class="ch-film" data-film="${esc(s.id)}">${icon('play')}${esc(title)}</button>`;
  };
  function show(it) {
    open = it;
    const d = loc(it.def);
    let body;
    if (it.gate) {
      const Z = ZONES[it.def.to];
      const built = Z?.built;
      const slots = Z?.plot ? slotsOf(it.def.to, films.all()) : [];
      const have = slots.filter(s => !s.empty);
      body = `<h2>${esc(t(Z?.name || ''))}</h2>
        ${it.def.note ? `<p>${esc(t(it.def.note))}</p>` : ''}
        ${built ? `<button type="button" class="ch-do is-go" data-do="enter">${icon('door')}${t('Vào')}</button>`
          : `<p class="ch-soon">${t('Khu này đang được xây.')}${Z?.plot ? ` ${t('Đã có phim về')} ${have.length} ${t('vị thánh, còn')} ${slots.length - have.length} ${t('chỗ để dành cho các vị thánh sẽ có phim sau.')}` : ''}</p>`}
        ${have.length ? `<div class="ch-films ch-films-many">${have.map(s => films.get(s.films[0])).filter(Boolean).map(storyLine).join('')}</div>` : ''}`;
    } else {
      const list = it.def.films.map(films.get).filter(Boolean), art = it.def.kind === 'art';
      const photo = photoOf(it.def.id) || list.find(s => s.real)?.real || it.def.photo;
      const lit = myCandles(it.def.id).length;
      body = `${photo ? `<figure><img src="/${esc(photo.src)}" alt=""><figcaption>${esc(photo[getLang()] || photo.vi)}${photo.credit ? `<small>${esc(creditOf(photo.credit, getLang()))}</small>` : ''}</figcaption></figure>` : ''}
        <h2>${esc(d.name)}</h2>
        <p>${esc(d.where)}</p>
        ${art && !list.length ? '' : `<div class="ch-films">${list.length ? list.map(storyLine).join('')
          : `<button type="button" class="ch-film is-soon" data-soon>${icon('play')}${t('Phim về ngài')}</button>`}</div>`}
        ${art ? '' : `<div class="ch-dos">
          ${it.cups.length ? `<button type="button" class="ch-do is-go" data-do="candle">${icon('flame')}${t('Thắp nến')}</button>` : ''}
          <button type="button" class="ch-do" data-do="pray">${icon('pray')}${t('Cầu nguyện')}</button>
        </div>`}
        ${lit ? `<p class="ch-lit">${t('Nến bạn đã thắp ở đây')}: ${lit}</p>` : ''}`;
    }
    inner.innerHTML = `<button type="button" class="ch-x" data-x aria-label="${t('Đóng')}">${icon('x')}</button>${body}`;
    panel.hidden = false;
    cardEl.hidden = true;
    inner.querySelector('.ch-do, .ch-film, .ch-x')?.focus();
  }
  function hide() { panel.hidden = true; open = null; card(null); }
  function lightNew(it) {
    const list = myCandles(it.def.id);
    if (list.length >= it.free.length) { act.say(t('Giá nến đã đầy nến bạn thắp. Nến cháy bảy ngày.'), 3500); return; }
    list.push(Date.now());
    saveCandles(it.def.id, list);
    light(it, it.free[list.length - 1]);
    show(it);
    act.say(t('Bạn đã thắp một ngọn nến. Xin thánh cầu bầu cho chúng con.'), 3500);
    act.did?.('candle', it.def);
  }
  function prayAt(it) {
    // đứng trước giá nến 1 m, phía người đi tới, quay mặt về vị thánh
    const [x, z] = snapFront(it, 1.0);
    act.walkTo(x, z, () => { act.pray(it.face); act.did?.('pray', it.def); });
  }

  return {
    pickables,
    /** chạm vào giá nến / đốm sáng / cột sáng */
    pick(obj) {
      const it = obj?.userData?.item;
      if (it?.def.kind === 'exhibit') goView(it);
      else if (it) show(it);
      return !!it;
    },
    /** thêm vào menu Đi nhanh */
    /** chỗ đứng trước một chỗ thánh (cho Đi nhanh), null nếu không thuộc khu này */
    placeOf(id) {
      const i = items.find(x => !x.gate && x.def.id === id);
      if (!i) return null;
      // def.back: tượng lớn, tới nơi thì đứng lùi xa để thấy trọn tượng; tranh trong hốc hầm mộ: chỗ đứng đã cách tường 1,4 m,
      // lùi thêm ít thôi (lùi 1,6 m là sang gần bức tranh ở tường đối diện)
      const [x, z] = snapFront(i, i.def.back || (i.def.mount != null ? 0.3 : 1.6));
      return { name: loc(i.def).name, saint: true, pos: [x, 0, z], heading: i.face, pitch: i.def.back ? 0.32 : 0.25 };
    },
    get busy() { return !panel.hidden; },
    close: hide,
    update(dt, me, time) {
      if (me && (lazyT -= dt) <= 0) { lazyT = 0.5; lazy(me); }
      // ngọn lửa rung nhẹ; đốm sáng thở chậm (giảm chuyển động: đứng yên)
      if (!calm) {
        for (const f of flames) {
          const k = Math.sin(time * 11 + f.ph) + 0.55 * Math.sin(time * 23 + f.ph * 2);
          f.f.scale.setScalar(0.1 + 0.018 * k);
          f.core.scale.set(1, 1 + 0.12 * k, 1);
        }
      }
      if (!me) return;
      // đốm sáng: rõ khi ở xa, mờ dần khi lại gần (đứng trước giá nến thì không che tượng)
      const k = calm ? 1 : 0.85 + 0.15 * Math.sin(time * 1.6);
      for (const it of items) {
        const d = Math.hypot(it.x - me.pos.x, it.z - me.pos.z);
        if (it.beacon) it.beacon.material.opacity = 0.8 * k * THREE.MathUtils.smoothstep(d, it.r * 0.6, it.r * 1.6);
        // cột sáng của cổng: tắt dần khi đứng gần, không trùm kín màn hình
        if (it.pillar) it.pillar.material.opacity = 0.16 * THREE.MathUtils.smoothstep(d, 3, 9);
      }
      // đang ở gần (trong bán kính của chỗ) hay đang nhìn về nó (trong khoảng 25 độ giữa màn hình, không quá xa): gần trước
      let best = null, bs = Infinity;
      if (camera) camera.getWorldDirection(fwd);
      for (const it of items) {
        const d = Math.hypot(it.x - me.pos.x, it.z - me.pos.z);
        let score = d < it.r ? d : Infinity;
        if (camera) {
          const [tx, tz] = it.def.kind === 'exhibit' ? it.def.look : [it.x, it.z];
          const vx = tx - camera.position.x, vz = tz - camera.position.z, l = Math.hypot(vx, vz) || 1;
          const cos = (vx * fwd.x + vz * fwd.z) / l / (Math.hypot(fwd.x, fwd.z) || 1);
          if (cos > 0.9 && l < (it.def.kind === 'exhibit' ? 8 : 18)) score = Math.min(score, 50 + l * (1.2 - cos) * 10);
        }
        if (score < bs) { bs = score; best = it; }
      }
      if (best !== focus && panel.hidden) card(best);
    },
    dispose() {
      gone = true;
      for (const it of items) { if (it.chunk) unloadChunk(it); if (it.pic) unhang(it); }
      scene.remove(group);
      group.traverse(o => {
        if (o.geometry && !Object.values(G).includes(o.geometry)) o.geometry.dispose();
        if (o.material?.map && !Object.values(M).includes(o.material)) { o.material.map.dispose(); o.material.map = null; o.material.dispose(); }
      });
      cardEl.remove();
      panel.remove();
      glow.dispose();
      for (const m of Object.values(M)) m.dispose();
      for (const it of items) { it.beacon?.material.dispose(); it.pillar?.material.dispose(); }
      for (const g of Object.values(G)) g.dispose();
    },
  };
}
