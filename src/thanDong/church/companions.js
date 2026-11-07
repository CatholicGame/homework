/**
 * Những món trong Tủ đồ không nằm trên bộ xương (wardrobe.js ô `fly`, `pet`, `fx`), dựng bằng three.js cùng kiểu đất sét:
 *   cloud / cloudPink  đám mây nhỏ dưới chân (trắng / hồng hoàng hôn), chỉ hiện khi bay (thay cho đôi cánh)
 *   lamb / chick       chiên con / gà con lon ton theo sau, bước theo tốc độ, đứng thì ngó quanh
 *   dove / butterfly   bồ câu trắng / bướm vàng lượn vòng trên đầu
 *   trail  vệt sáng lấp lánh sau lưng khi bay
 *   bloom  vài bông hoa nở quanh chân khi cúi chào
 *   stars  vài ngôi sao vàng bay lên khi chắp tay cầu nguyện
 *   steps  dấu chân sáng mờ dần khi đi
 *   petals cánh hoa rơi lại theo bước chân
 * Mỗi người (mình hay người online) một bộ: makeExtras(actor, …).set(look) mỗi lần đổi đồ, update(dt) mỗi khung hình.
 * Giảm chuyển động: chim lượn chậm, không vỗ cánh, không lấp lánh.
 */
import * as THREE from 'three';

const clay = (color, more = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.75, ...more });
const sph = (r, mat, sx = 1, sy = 1, sz = 1) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 10), mat); m.scale.set(sx, sy, sz); return m; };

function buildCloud(mats, tone = '') {
  const g = new THREE.Group();
  const puffs = [[0, 0, 0, 0.2], [0.2, -0.02, 0.05, 0.15], [-0.21, -0.02, 0.02, 0.16], [0.08, 0.06, -0.14, 0.15], [-0.1, 0.05, 0.14, 0.14],
    [0.0, 0.1, 0.0, 0.14], [0.3, -0.05, -0.08, 0.1], [-0.3, -0.05, -0.06, 0.1]];
  const mat = tone === 'pink' ? mats.cloudPink : mats.cloud;
  for (const [x, y, z, r] of puffs) { const m = sph(r, mat, 1, 0.7, 1); m.position.set(x, y, z); g.add(m); }
  return g;
}

function buildLamb(mats) {
  const g = new THREE.Group(), body = new THREE.Group();
  g.add(body);
  body.add(sph(0.16, mats.wool, 1.0, 0.82, 1.3));
  for (let k = 0; k < 10; k++) {
    const a = k * 2.4, m = sph(0.075, mats.wool);
    m.position.set(0.11 * Math.cos(a), 0.08 + 0.03 * Math.sin(k), 0.16 * Math.sin(a) * 1.1);
    body.add(m);
  }
  const head = new THREE.Group();
  head.position.set(0, 0.11, -0.2);
  head.add(sph(0.075, mats.face, 1, 1.05, 1.25));
  const tuft = sph(0.06, mats.wool); tuft.position.set(0, 0.06, 0.01); head.add(tuft);
  for (const s of [-1, 1]) {
    const ear = sph(0.04, mats.face, 1.6, 0.5, 0.8); ear.position.set(s * 0.085, 0.02, 0.02); ear.rotation.z = s * 0.4; head.add(ear);
    const eye = sph(0.012, mats.eye); eye.position.set(s * 0.04, 0.02, -0.075); head.add(eye);
  }
  const nose = sph(0.012, mats.eye); nose.position.set(0, -0.025, -0.095); head.add(nose);
  body.add(head);
  const tail = sph(0.045, mats.wool); tail.position.set(0, 0.06, 0.22); body.add(tail);
  const legs = [];
  for (const [x, z] of [[-0.07, -0.12], [0.07, -0.12], [-0.07, 0.12], [0.07, 0.12]]) {
    const pivot = new THREE.Group();
    pivot.position.set(x, -0.07, z);
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.02, 0.17, 8), mats.hoof);
    leg.position.y = -0.085;
    pivot.add(leg);
    body.add(pivot);
    legs.push(pivot);
  }
  body.position.y = 0.25;
  return { g, body, head, legs, y0: 0.25 };
}

function buildChick(mats) {
  const g = new THREE.Group(), body = new THREE.Group();
  g.add(body);
  body.add(sph(0.1, mats.chick, 1, 0.92, 1.1));
  const head = new THREE.Group();
  head.position.set(0, 0.1, -0.06);
  head.add(sph(0.07, mats.chick));
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.016, 0.04, 6), mats.beak);
  beak.rotation.x = -Math.PI / 2; beak.position.set(0, -0.005, -0.075); head.add(beak);
  for (const s of [-1, 1]) { const e = sph(0.011, mats.eye); e.position.set(s * 0.032, 0.015, -0.055); head.add(e); }
  const tuft = sph(0.025, mats.chick, 0.6, 1.4, 0.6); tuft.position.set(0, 0.07, 0); head.add(tuft);
  body.add(head);
  for (const s of [-1, 1]) { const w = sph(0.05, mats.chick, 0.35, 0.7, 1.1); w.position.set(s * 0.095, 0.0, 0.01); body.add(w); }
  const legs = [];
  for (const x of [-0.035, 0.035]) {
    const pivot = new THREE.Group();
    pivot.position.set(x, -0.07, 0);
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.07, 6), mats.beak);
    leg.position.y = -0.035;
    pivot.add(leg);
    body.add(pivot);
    legs.push(pivot);
  }
  body.position.y = 0.15;
  return { g, body, head, legs, y0: 0.15 };
}

function buildButterfly(mats) {
  const g = new THREE.Group();
  const b = new THREE.Mesh(new THREE.CapsuleGeometry(0.008, 0.05, 3, 6), mats.eye);
  b.rotation.x = Math.PI / 2; g.add(b);
  const wingGeo = new THREE.CircleGeometry(0.05, 12);
  const wings = [-1, 1].map(s => {
    const p = new THREE.Group();
    for (const [z, r] of [[-0.018, 1], [0.03, 0.75]]) {
      const w = new THREE.Mesh(wingGeo, mats.wingB);
      w.rotation.x = -Math.PI / 2;
      w.scale.set(r * 1.1, r, 1);
      w.position.set(s * 0.05 * r, 0, z);
      p.add(w);
      const dot = new THREE.Mesh(wingGeo, mats.wingDot);
      dot.rotation.x = -Math.PI / 2;
      dot.scale.setScalar(r * 0.32);
      dot.position.set(s * 0.06 * r, 0.001, z);
      p.add(dot);
    }
    g.add(p);
    return p;
  });
  return { g, wings, kind: 'butterfly' };
}

function buildDove(mats) {
  const g = new THREE.Group();
  g.add(sph(0.06, mats.dove, 0.85, 0.8, 1.4));
  const head = sph(0.04, mats.dove); head.position.set(0, 0.04, -0.075); g.add(head);
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.011, 0.03, 6), mats.beak);
  beak.rotation.x = -Math.PI / 2; beak.position.set(0, 0.035, -0.12); g.add(beak);
  for (const s of [-1, 1]) { const e = sph(0.007, mats.eye); e.position.set(s * 0.025, 0.05, -0.095); g.add(e); }
  const tail = sph(0.045, mats.dove, 0.9, 0.2, 1.3); tail.position.set(0, 0.0, 0.1); g.add(tail);
  const wings = [-1, 1].map(s => {
    const p = new THREE.Group();
    p.position.set(s * 0.04, 0.02, 0);
    const w = sph(0.07, mats.dove, 1.4, 0.18, 0.75); w.position.x = s * 0.08; p.add(w);
    g.add(p);
    return p;
  });
  return { g, wings, kind: 'dove' };
}

function buildFlower(mats, petal) {
  const g = new THREE.Group();
  for (let k = 0; k < 5; k++) {
    const a = k * Math.PI * 2 / 5, m = sph(0.03, petal, 1, 0.4, 1);
    m.position.set(0.032 * Math.cos(a), 0, 0.032 * Math.sin(a));
    g.add(m);
  }
  const c = sph(0.02, mats.pollen, 1, 0.6, 1); c.position.y = 0.01; g.add(c);
  const l = sph(0.035, mats.leaf, 1.6, 0.25, 0.7); l.position.set(0.04, -0.01, 0.02); g.add(l);
  return g;
}

/** Vật liệu dùng chung (một lần mỗi cảnh). onMaterial: vá ánh đêm của world.js. */
export function makeExtrasKit(onMaterial) {
  const mats = {
    cloud: clay(0xffffff, { roughness: 1, emissive: 0xc9d8ff, emissiveIntensity: 0.18 }),
    cloudPink: clay(0xffd6e0, { roughness: 1, emissive: 0xffa36b, emissiveIntensity: 0.22 }),
    chick: clay(0xffd84a, { roughness: 0.9 }),
    wingB: clay(0xffc531, { roughness: 0.55, side: THREE.DoubleSide }),
    wingDot: clay(0x3a2a14, { roughness: 0.6, side: THREE.DoubleSide }),
    wool: clay(0xf6f2ea, { roughness: 0.95 }),
    face: clay(0xf0d2bf),
    hoof: clay(0x5a4a44),
    eye: clay(0x1a1412, { roughness: 0.3 }),
    dove: clay(0xfbfbf8, { roughness: 0.6 }),
    beak: clay(0xe89a52),
    leaf: clay(0x4f9a55),
    pollen: clay(0xf6c84a),
    petals: [0xffffff, 0xf4a6c0, 0xf6d05a, 0xc8a8ef].map(c => clay(c, { roughness: 0.6 })),
  };
  for (const m of Object.values(mats)) for (const x of [].concat(m)) onMaterial?.(x);
  const dotTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.35, 'rgba(255,240,190,0.7)'); gr.addColorStop(1, 'rgba(255,220,140,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  })();
  return { mats, dotTex };
}

/**
 * Đồ ngoài bộ xương của một người. opts: { scene, kit, calm, ground(x, z) → độ cao mặt đất | null }.
 * actor cần: pos, heading, pose, fly (mình) hay pose hover / soar (người online).
 */
export function makeExtras(actor, { scene, kit, calm = false, ground = null }) {
  const { mats, dotTex } = kit;
  const flying = () => !!actor.fly || actor.pose === 'hover' || actor.pose === 'soar';
  let look = {}, cloud = null, lamb = null, dove = null, cloudTone = null, t = 0, last = actor.pos.clone(), stepAcc = 0, stepSide = 1, trailAcc = 0;
  const groundY = (x, z) => (ground ? ground(x, z) ?? 0 : 0);
  // hạt lấp lánh / dấu chân / hoa: một danh sách, mỗi thứ tự mờ rồi biến mất
  const bits = [];
  const sparkMat = new THREE.SpriteMaterial({ map: dotTex, color: 0xffe6a6, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const stepMat = new THREE.MeshBasicMaterial({ map: dotTex, color: 0xffe2a0, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const starMat = new THREE.SpriteMaterial({ map: dotTex, color: 0xffd36a, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const petalGeo = new THREE.CircleGeometry(0.03, 8).rotateX(-Math.PI / 2);
  const stepGeo = new THREE.PlaneGeometry(0.11, 0.16).rotateX(-Math.PI / 2);

  function add(obj, life, kind) { scene.add(obj); bits.push({ obj, life, age: 0, kind }); }
  function spark(p) {
    const s = new THREE.Sprite(sparkMat.clone());
    s.position.copy(p).add(new THREE.Vector3((Math.random() - 0.5) * 0.3, 0.45 + Math.random() * 0.3, (Math.random() - 0.5) * 0.3));
    s.scale.setScalar(0.08 + Math.random() * 0.08);
    add(s, 1.2, 'spark');
  }
  function footprint() {
    const h = actor.heading, rx = Math.cos(h), rz = -Math.sin(h);
    const m = new THREE.Mesh(stepGeo, stepMat.clone());
    const x = actor.pos.x + rx * 0.06 * stepSide, z = actor.pos.z + rz * 0.06 * stepSide;
    m.position.set(x, groundY(x, z) + 0.012, z);
    m.rotation.y = h;
    stepSide = -stepSide;
    add(m, 2.5, 'step');
  }
  function petal() {
    const x = actor.pos.x + (Math.random() - 0.5) * 0.3, z = actor.pos.z + (Math.random() - 0.5) * 0.3;
    const m = new THREE.Mesh(petalGeo, mats.petals[1 + Math.floor(Math.random() * 3)]);
    m.scale.set(1, 1, 0.6 + Math.random() * 0.4);
    m.position.set(x, groundY(x, z) + 0.01, z);
    m.rotation.y = Math.random() * 6;
    add(m, 4, 'petal');
  }
  function starsUp() {
    for (let k = 0; k < 7; k++) {
      const s = new THREE.Sprite(starMat.clone());
      const a = k / 7 * Math.PI * 2;
      s.position.copy(actor.pos).add(new THREE.Vector3(Math.cos(a) * 0.3, 0.7 + Math.random() * 0.3, Math.sin(a) * 0.3));
      s.scale.setScalar(0.07 + Math.random() * 0.06);
      add(s, 2.4 + Math.random(), 'star');
    }
  }
  function bloomAround() {
    for (let k = 0; k < 7; k++) {
      const a = k / 7 * Math.PI * 2 + Math.random() * 0.4, r = 0.32 + Math.random() * 0.12;
      const f = buildFlower(mats, mats.petals[k % mats.petals.length]);
      const x = actor.pos.x + Math.cos(a) * r, z = actor.pos.z + Math.sin(a) * r;
      f.position.set(x, groundY(x, z) + 0.02, z);
      f.rotation.y = Math.random() * 6;
      f.scale.setScalar(0.001);
      f.userData.delay = k * 0.08;
      add(f, 3.2, 'flower');
    }
  }
  function drop(o) {
    o.removeFromParent();
    o.traverse?.(m => {
      if (m.material?.map === dotTex) m.material.dispose();
      if (m.geometry && m.geometry !== stepGeo && m.geometry !== petalGeo) m.geometry.dispose();
    });
  }

  return {
    set(next) {
      look = next || {};
      const cl = look.fly === 'cloud' ? '' : look.fly === 'cloudPink' ? 'pink' : null;
      if (cloud && cl !== cloudTone) { drop(cloud); cloud = null; }
      if (cl !== null && !cloud) { cloud = buildCloud(mats, cl); cloud.visible = false; scene.add(cloud); }
      cloudTone = cloud ? cl : null;
      const walker = look.pet === 'lamb' || look.pet === 'chick' ? look.pet : '';
      if (lamb && lamb.kind !== walker) { drop(lamb.g); lamb = null; }
      if (walker && !lamb) {
        lamb = walker === 'chick' ? buildChick(mats) : buildLamb(mats);
        lamb.kind = walker;
        const h = actor.heading;
        lamb.g.position.set(actor.pos.x + Math.cos(h) * 0.6, 0, actor.pos.z - Math.sin(h) * 0.6);
        lamb.g.position.y = groundY(lamb.g.position.x, lamb.g.position.z);
        lamb.g.rotation.y = h;
        scene.add(lamb.g);
      }
      const flyer = look.pet === 'dove' || look.pet === 'butterfly' ? look.pet : '';
      if (dove && dove.kind !== flyer) { drop(dove.g); dove = null; }
      if (flyer && !dove) { dove = flyer === 'butterfly' ? buildButterfly(mats) : buildDove(mats); dove.a = Math.random() * 6; scene.add(dove.g); }
    },
    /** Đã cúi chào (hiệu ứng hoa nở). */
    bowed() { if (look.fx === 'bloom') bloomAround(); },
    /** Đã chắp tay cầu nguyện (hiệu ứng sao bay lên). */
    prayed() { if (look.fx === 'stars') starsUp(); },
    visible(on) { for (const o of [cloud, lamb?.g, dove?.g]) if (o) o.visible = on && (o !== cloud || flying()); },
    update(dt) {
      t += dt;
      const p = actor.pos, fly = flying(), shown = actor.root.visible;
      const moved = Math.hypot(p.x - last.x, p.z - last.z);
      last.copy(p);
      if (cloud) {
        cloud.visible = shown && fly;
        cloud.position.set(p.x, p.y - 0.04 + (calm ? 0 : Math.sin(t * 2) * 0.015), p.z);
        cloud.rotation.y = actor.heading;
      }
      if (lamb) {
        const L = lamb.g, h = actor.heading;
        // chỗ đứng: sau lưng, lệch phải
        const tx = p.x + Math.cos(h) * 0.5 + Math.sin(h) * 0.45, tz = p.z - Math.sin(h) * 0.5 + Math.cos(h) * 0.45;
        const dx = tx - L.position.x, dz = tz - L.position.z, d = Math.hypot(dx, dz);
        if (d > 8) { L.position.set(tx, 0, tz); }
        let v = 0;
        if (d > 0.12) {
          v = Math.min(d * 2.2, 3.2);
          const step = Math.min(d, v * dt);
          L.position.x += dx / d * step; L.position.z += dz / d * step;
          const want = Math.atan2(-dx, -dz);
          L.rotation.y += Math.atan2(Math.sin(want - L.rotation.y), Math.cos(want - L.rotation.y)) * Math.min(1, dt * 6);
        } else {
          L.rotation.y += Math.atan2(Math.sin(h - L.rotation.y), Math.cos(h - L.rotation.y)) * Math.min(1, dt * 1.5);
        }
        L.position.y = groundY(L.position.x, L.position.z);
        L.visible = shown;
        const ph = t * (6 + v * 4), sw = calm ? 0 : Math.min(1, v) * 0.6;
        lamb.legs.forEach((leg, i) => { leg.rotation.x = Math.sin(ph + (i === 0 || i === 3 ? 0 : Math.PI)) * sw; });
        lamb.body.position.y = lamb.y0 + (calm ? 0 : Math.abs(Math.sin(ph)) * 0.02 * Math.min(1, v));
        lamb.head.rotation.y = v < 0.1 && !calm ? Math.sin(t * 0.7) * 0.5 : 0;
      }
      if (dove) {
        const bf = dove.kind === 'butterfly';
        dove.a += dt * (calm ? 0.4 : bf ? 1.5 : 1.1);
        const r = bf ? 0.42 : 0.55, hy = p.y + (bf ? 1.15 : 1.3) + (calm ? 0 : Math.sin(t * (bf ? 3.1 : 1.7)) * (bf ? 0.1 : 0.06));
        dove.g.position.set(p.x + Math.cos(dove.a) * r, hy, p.z + Math.sin(dove.a) * r);
        dove.g.rotation.y = Math.PI - dove.a;   // bay theo tiếp tuyến của vòng
        const flap = calm ? 0.2 : bf ? 0.25 + Math.sin(t * 22) * 0.9 : Math.sin(t * 14) * 0.7;
        dove.wings[0].rotation.z = -flap; dove.wings[1].rotation.z = flap;
        dove.g.visible = shown;
      }
      if (shown && !calm) {
        if (look.fx === 'trail' && fly && moved > 0.002) {
          trailAcc += dt;
          while (trailAcc > 0.04) { trailAcc -= 0.04; spark(p); }
        }
        if ((look.fx === 'steps' || look.fx === 'petals') && !fly && actor.pose === 'walk') {
          stepAcc += moved;
          if (stepAcc > 0.32) { stepAcc = 0; if (look.fx === 'steps') footprint(); else { petal(); petal(); } }
        }
      }
      for (let i = bits.length - 1; i >= 0; i--) {
        const b = bits[i];
        b.age += dt;
        const k = b.age / b.life;
        if (k >= 1) { drop(b.obj); bits.splice(i, 1); continue; }
        if (b.kind === 'spark') { b.obj.material.opacity = 1 - k; b.obj.position.y += dt * 0.25; }
        else if (b.kind === 'star') { b.obj.material.opacity = k < 0.15 ? k / 0.15 : 1 - (k - 0.15) / 0.85; b.obj.position.y += dt * 0.45; }
        else if (b.kind === 'petal') b.obj.scale.x = b.obj.scale.z * (k > 0.7 ? 1 - (k - 0.7) / 0.3 : 1) + 0.001;
        else if (b.kind === 'step') b.obj.material.opacity = 0.75 * (1 - k);
        else {
          const g = Math.max(0, Math.min(1, (b.age - b.obj.userData.delay) / 0.5));
          const fade = k > 0.75 ? 1 - (k - 0.75) / 0.25 : 1;
          b.obj.scale.setScalar(Math.max(0.001, (1 - (1 - g) ** 3) * fade * 1.8));
        }
      }
    },
    dispose() {
      for (const o of [cloud, lamb?.g, dove?.g]) if (o) drop(o);
      for (const b of bits) drop(b.obj);
      bits.length = 0;
      cloud = lamb = dove = null;
      sparkMat.dispose(); stepMat.dispose(); stepGeo.dispose(); starMat.dispose(); petalGeo.dispose();
    },
  };
}
