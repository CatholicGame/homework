// Biển đồng trước các tượng trong Đền thờ Thánh Phê-rô, kiểu biển REGINA PACIS ở Sài Gòn (blender/scripts/make_plaque.py):
// đồng sẫm lốm đốm xanh, khung nổi, bốn đinh tán, chữ đồng sáng nổi có bóng. Mỗi biển một câu của vị thánh (lời Kinh Thánh
// CGKPV nguyên văn, hoặc câu nổi tiếng của các đấng sáng lập dòng với nguồn). Chữ vẽ lên canvas lúc dựng khu,
// theo ngôn ngữ đang chọn.
import * as THREE from 'three';
import { getLang } from '../engine/lang.js';

/** Lời trên biển: name (dòng chữ hoa trên cùng), q (câu), ref (dòng nhỏ dưới cùng). */
export const QUOTES = {
  // tượng trên quảng trường: biển trên mặt bệ, ngay sau giá nến (shrines.js)
  'tuong-phe-ro': { name: 'Thánh Phê-rô Tông Đồ', q: 'Thầy sẽ trao cho anh chìa khóa Nước Trời.', ref: 'Mt 16,19',
    en: { name: 'Saint Peter the Apostle', q: 'I will give you the keys of the Kingdom of Heaven.', ref: 'Mt 16:19' } },
  'tuong-phao-lo': { name: 'Thánh Phao-lô Tông Đồ', q: 'Tôi đã đấu trong cuộc thi đấu cao đẹp, đã chạy hết chặng đường, đã giữ vững niềm tin.', ref: '2 Tm 4,7',
    en: { name: 'Saint Paul the Apostle', q: 'I have fought the good fight, I have finished the race, I have kept the faith.', ref: '2 Tim 4:7' } },
  'bronze-peter': { name: 'Thánh Phê-rô', q: 'Thầy là Đấng Ki-tô, Con Thiên Chúa hằng sống.', ref: 'Mt 16,16',
    en: { name: 'Saint Peter', q: 'You are the Christ, the Son of the living God.', ref: 'Mt 16:16' } },
  pieta: { name: 'Đức Mẹ Ma-ri-a', q: 'Vâng, tôi đây là nữ tỳ của Chúa.', ref: 'Lc 1,38',
    en: { name: 'The Virgin Mary', q: 'Yes, here I am, the handmaid of the Lord.', ref: 'Lk 1:38' } },
  founder_dominic: { name: 'Thánh Đa Minh', q: 'Chỉ nói với Thiên Chúa, hoặc nói về Thiên Chúa.', ref: 'Hiến pháp tiên khởi Dòng Giảng Thuyết',
    en: { name: 'Saint Dominic', q: 'Speak only with God, or about God.', ref: 'Early Constitutions of the Order of Preachers' } },
  founder_benedict: { name: 'Thánh Biển Đức', q: 'Đừng đặt điều gì trên tình yêu Đức Ki-tô.', ref: 'Tu luật thánh Biển Đức 4,21',
    en: { name: 'Saint Benedict', q: 'Prefer nothing to the love of Christ.', ref: 'Rule of Saint Benedict 4:21' } },
  founder_ignatius: { name: 'Thánh I-nhã Loyola', q: 'Để Thiên Chúa được vinh danh hơn.', ref: 'Ad maiorem Dei gloriam',
    en: { name: 'Saint Ignatius of Loyola', q: 'For the greater glory of God.', ref: 'Ad maiorem Dei gloriam' } },
  founder_teresa: { name: 'Thánh Tê-rê-sa Avila', q: 'Chỉ một mình Thiên Chúa là đủ.', ref: 'Solo Dios basta',
    en: { name: 'Saint Teresa of Avila', q: 'God alone is enough.', ref: 'Solo Dios basta' } },
  founder_vincent: { name: 'Thánh Vinh Sơn Phao-lô', q: 'Tình yêu sáng tạo đến vô cùng.', ref: "L'amour est inventif jusqu'à l'infini",
    en: { name: 'Saint Vincent de Paul', q: 'Love is inventive, even to infinity.', ref: "L'amour est inventif jusqu'à l'infini" } },
  founder_bosco: { name: 'Thánh Gio-an Bosco', q: 'Xin cho con các linh hồn, còn mọi sự khác xin cứ lấy đi.', ref: 'Da mihi animas, cetera tolle',
    en: { name: 'Saint John Bosco', q: 'Give me souls, take away the rest.', ref: 'Da mihi animas, cetera tolle' } },
};

// Chỗ đặt (toạ độ three.js của vatican_interior.glb: x = x Blender, z = -y Blender), dir = hướng mặt biển nhìn ra, w = bề ngang (m).
// Số đo theo build_vatican_interior.py: HW 12, CR 20,75, Y_ENT -108,4.
const HW = 12, CR = 20.75, Y_ENT = -108.4;
// bốn trụ vòm không có biển: ảnh hốc tượng đã có bệ khắc tên (SANCTVS ANDREAS…), biển sẽ che mất
const PLACES = [];
// tượng đồng thánh Phê-rô: mặt bệ đá đỏ quay ra lòng nhà thờ
PLACES.push({ id: 'bronze-peter', at: [HW - 1.6 - 0.92, 1.25, CR + 9.5], dir: [-1, 0], w: 1.5 });
// tượng các đấng sáng lập trong hốc trên các trụ lòng giữa (cao 6 m): biển ở tầm mắt dưới hốc, trong dải đá hẹp giữa hai trụ
// áp; mặt dải đá dò bằng tia lúc đặt (wall)
const span = -CR - Y_ENT;
const FOUNDERS = { [-1]: ['founder_dominic', 'founder_benedict', 'founder_ignatius'], 1: ['founder_teresa', 'founder_vincent', 'founder_bosco'] };
for (const sx of [-1, 1]) for (let k = 1; k <= 3; k++)
  PLACES.push({ id: FOUNDERS[sx][k - 1], at: [sx * (HW - 0.06), 1.45, -(Y_ENT + span / 4 * k)], dir: [-sx, 0], w: 1.1, wall: true });

// phông chữ khắc: Cormorant Garamond (có dấu tiếng Việt), tải một lần trước khi vẽ biển: chờ stylesheet nạp xong (trước đó
// fonts.load chưa thấy @font-face nào, trả về ngay), rồi tải đủ các kiểu chữ; quá 6 s thì vẽ tạm bằng Times New Roman (dấu
// chồng tiếng Việt đúng chỗ, Georgia thì không) và vẽ lại khi Cormorant tải xong
let fonts = null, loaded = null, fontsOk = false;
export function fontsReady() {
  if (fonts) return fonts;
  const l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,700&subset=vietnamese&display=swap';
  const sheet = new Promise((ok, no) => { l.onload = ok; l.onerror = no; });
  document.head.append(l);
  loaded = sheet.then(() => Promise.all(['700 40px', '600 40px', 'italic 700 40px']
    .map(f => document.fonts.load(`${f} 'Cormorant Garamond'`, 'Đấng ữ')))).then(() => { fontsOk = true; });
  fonts = Promise.race([loaded, new Promise(r => setTimeout(r, 6000))]).catch(() => {});
  return fonts;
}

export const quoteOf = (id) => QUOTES[id] && ((getLang() === 'en' && QUOTES[id].en) || QUOTES[id]);

const W = 1024, H = 576;
// nền đồng sẫm: lốm đốm và mảng gỉ xanh, vẽ một lần dùng chung cho mọi biển
let bronze = null;
function bronzeBase() {
  if (bronze) return bronze;
  bronze = document.createElement('canvas');
  bronze.width = W; bronze.height = H;
  const g = bronze.getContext('2d');
  let seed = 1959;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const img = g.createImageData(W, H);
  for (let i = 0; i < W * H; i++) {
    const n = (rnd() - 0.5) * 28;
    img.data.set([58 + n, 62 + n, 58 + n, 255], i * 4);
  }
  g.putImageData(img, 0, 0);
  // mảng gỉ: ô nhỏ ngẫu nhiên phóng to, làm mờ
  const s = document.createElement('canvas');
  s.width = W / 16; s.height = H / 16;
  const sg = s.getContext('2d');
  for (let y = 0; y < s.height; y++) for (let x = 0; x < s.width; x++) {
    const v = rnd();
    if (v > 0.55) { sg.fillStyle = `rgba(70,92,80,${((v - 0.55) * 1.6).toFixed(2)})`; sg.fillRect(x, y, 1, 1); }
  }
  g.filter = 'blur(14px)';
  g.drawImage(s, 0, 0, W, H);
  g.filter = 'none';
  // khung nổi, đường chìm bên trong, bốn đinh tán
  g.strokeStyle = 'rgb(120,108,82)'; g.lineWidth = 14; g.strokeRect(15, 15, W - 30, H - 30);
  g.strokeStyle = 'rgb(40,40,38)'; g.lineWidth = 3; g.strokeRect(27, 27, W - 54, H - 54);
  for (const [x, y] of [[44, 44], [W - 44, 44], [44, H - 44], [W - 44, H - 44]]) {
    g.beginPath(); g.arc(x, y, 13, 0, Math.PI * 2);
    g.fillStyle = 'rgb(150,130,90)'; g.fill();
    g.strokeStyle = 'rgb(60,55,45)'; g.lineWidth = 2; g.stroke();
  }
  return bronze;
}

// chữ đồng nổi: bóng tối lệch xuống, rồi mặt chữ đồng sáng đã mòn
function raised(g, text, x, y) {
  g.fillStyle = 'rgb(28,28,26)'; g.fillText(text, x + 3, y + 4);
  g.fillStyle = 'rgb(186,176,150)'; g.fillText(text, x, y);
}
function wrap(g, text, max) {
  const lines = [];
  let line = '';
  for (const w of text.split(' ')) {
    const t = line ? `${line} ${w}` : w;
    if (line && g.measureText(t).width > max) { lines.push(line); line = w; } else line = t;
  }
  return lines.concat(line);
}

/** Vẽ biển của `id` thành texture (null nếu không có lời). */
export function plaqueTexture(id) {
  const d = quoteOf(id);
  if (!d) return null;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');
  g.drawImage(bronzeBase(), 0, 0);
  g.textAlign = 'center'; g.textBaseline = 'middle';
  const serif = `'Cormorant Garamond', 'Times New Roman', serif`;
  // tên: chữ hoa giãn, co lại cho vừa
  const name = d.name.normalize('NFC').toLocaleUpperCase(getLang() === 'en' ? 'en' : 'vi');
  let size = 78;
  do { g.font = `700 ${size}px ${serif}`; g.letterSpacing = `${Math.round(size / 12)}px`; size -= 2; } while (g.measureText(name).width > W - 160 && size > 30);
  raised(g, name, W / 2, 128);
  g.letterSpacing = '0px';
  // câu nói: nghiêng, tối đa ba dòng
  const q = `“${d.q.normalize('NFC')}”`;
  let lines;
  size = 66;
  do { g.font = `italic 700 ${size}px ${serif}`; lines = wrap(g, q, W - 170); size -= 2; } while ((lines.length > 3 || lines.length * size * 1.18 > 250) && size > 28);
  const lh = (size + 2) * 1.18, y0 = 318 - (lines.length - 1) * lh / 2;
  lines.forEach((l, i) => raised(g, l, W / 2, y0 + i * lh));
  // nguồn: dòng nhỏ giãn chữ như "XVII-II-MCMLIX"
  size = 40;
  do { g.font = `600 ${size}px ${serif}`; g.letterSpacing = '4px'; size -= 2; } while (g.measureText(d.ref).width > W - 180 && size > 22);
  raised(g, d.ref.normalize('NFC'), W / 2, 478);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Một biển: mặt chữ (không qua đèn, như các tượng ảnh) trên tấm đồng dày 4 cm; gốc ở giữa, mặt nhìn về +z. */
export function plaqueMesh(id, w, back) {
  const tex = plaqueTexture(id);
  if (!tex) return null;
  const h = w * H / W, g = new THREE.Group();
  const plate = new THREE.Mesh(new THREE.BoxGeometry(w + 0.04, h + 0.04, 0.04), back);
  const face = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex }));
  face.position.z = 0.021;
  g.add(plate, face);
  // vẽ trước khi Cormorant kịp tải: vẽ lại khi xong (biển đã gỡ thì thôi)
  if (!fontsOk) loaded?.then(() => {
    if (!face.material.map) return;
    face.material.map.dispose();
    face.material.map = plaqueTexture(id);
  }).catch(() => {});
  return g;
}

/** Các biển của khu `zone` (chỉ trong Đền thờ), root = cảnh của khu (dò mặt tường). Trả về { dispose } hoặc null. */
export function makePlaques({ scene, root, zone }) {
  if (zone !== 'vatican-in') return null;
  const back = new THREE.MeshStandardMaterial({ color: 0x3e3f3a, metalness: 0.6, roughness: 0.5 });
  const group = new THREE.Group(), ray = new THREE.Raycaster();
  ray.far = 8;
  root.updateMatrixWorld(true);
  let gone = false;
  fontsReady().then(() => {
    if (gone) return;
    for (const p of PLACES) {
      const m = plaqueMesh(p.id, p.w, back);
      if (!m) continue;
      m.position.set(...p.at);
      if (p.wall) {
        // tia từ giữa lòng nhà thờ vào phía tường: biển áp sát mặt tường đầu tiên gặp (không tính tượng ảnh ph_)
        const dir = new THREE.Vector3(-p.dir[0], 0, -p.dir[1]);
        ray.set(m.position.clone().addScaledVector(dir, -4), dir);
        const hit = ray.intersectObject(root, true).find(h => !/^ph_/.test(h.object.material?.name || ''));
        if (hit) m.position.copy(hit.point).addScaledVector(dir, -0.025);
      }
      m.rotation.y = Math.atan2(p.dir[0], p.dir[1]);
      group.add(m);
    }
  });
  scene.add(group);
  return {
    dispose() {
      gone = true;
      scene.remove(group);
      group.traverse(o => { if (o.isMesh) { o.geometry.dispose(); if (o.material !== back) { o.material.map?.dispose(); o.material.map = null; o.material.dispose(); } } });
      back.dispose();
    },
  };
}
