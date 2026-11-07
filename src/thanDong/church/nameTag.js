/**
 * Tên trên đầu người online (Gặp gỡ online): một Sprite nhỏ, nền kính tối bo tròn, chữ sáng (kiểu wetube ciné của cả web).
 *
 * Tên chỉ là TÊN GỌI, ngắn (`shortName`): tên tài khoản Google "Nguyễn Văn Nam" / "Nam Nguyễn" → "Nam", "John Smith" → "John",
 * không bao giờ cả họ tên (trẻ em dùng app). Dài nhất NAME_MAX = 12 ký tự (máy chủ phòng cũng cắt ở đó, vừa biệt danh hai chữ như "Phương Thảo", nick.js), dài hơn thì 11 + "…".
 * Vì sao 10: thẻ giữ cao ít nhất ~5,5 % chiều cao màn hình (PX: ~21 px trên điện thoại nằm ngang 390 px, chữ ~13 px, vừa đọc);
 * ở cỡ đó 10 ký tự rộng ~3,5 lần chiều cao, xấp xỉ bề ngang hai nhân vật (cao ~1 m) đứng cạnh nhau: dài hơn thì thẻ của những
 * người đứng / ngồi gần nhau đè lên nhau. Tên gọi Việt gần như luôn vừa ("Nguyệt", "Minh Khang"), tên Tây cũng thường ≤ 10.
 * Gần thì thẻ cao H m (to dần như người), xa thì giữ cỡ trên màn hình, quá NEAR m mờ dần, quá FAR m ẩn: xa nữa thành một đám chữ.
 * Khu camera cố định (trường quay: camera ở cao sau khán phòng, ghế nóng cách ~24 m) gọi với `{ fade: false }`: không mờ theo
 * khoảng cách (trước đây quá 16 m là ẩn, nên gần như không ai thấy tên ai), thẻ nhỏ hơn (`px` 0,038, trước 0,045) và lề chữ hẹp;
 * thẻ của hai người ngồi cạnh vẫn chạm nhau khi nhìn từ xa thì `declutter` xếp bậc thang (người dùng 2026-11-05).
 */
import * as THREE from 'three';
import { NAME_MAX, cleanName } from '../../../realtime/shared.js';

export { NAME_MAX };
const H = 0.12;          // m: chiều cao thẻ khi ở gần
const PX = 0.055;        // chiều cao tối thiểu theo khoảng cách (m mỗi m): ~5,5 % màn hình với fov 55°
const NEAR = 10, FAR = 16; // m: bắt đầu mờ / mất hẳn
const LIFT = 0.5;        // m: từ gốc xương head lên trên đỉnh đầu (đầu đất sét to)

// họ Việt thường gặp: tên Google có thể "Họ … Tên" hay "Tên Họ"
const HO = new Set(('nguyen tran le pham hoang huynh phan vu vo dang bui do ho ngo duong ly dinh mai trinh dao cao lam ha luu to '
  + 'thai ta chau quach luong kieu tu trieu doan truong tang vuong la phung mac chu au than nghiem lai khuc hua diep giang ton '
  + 'quan van khong lu tieu ung banh hong').split(' '));
const plain = (w) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase();

/** Tên gọi ngắn từ tên tài khoản (hoặc email). */
export function shortName(full) {
  const raw = String(full || '');
  // chỉ có email: "catholic.game99@…" → "catholic"
  let s = cleanName(raw.includes('@') ? raw.replace(/@.*$/, '').replace(/[._\d-]+/g, ' ') : raw, 60);
  if (!s) return '';
  const w = s.split(' ');
  if (w.length > 1) {
    const first = HO.has(plain(w[0])), last = HO.has(plain(w[w.length - 1]));
    s = first && !last ? w[w.length - 1] : w[0];
  }
  return cleanName(s);
}

/**
 * Thẻ tên cho một người; update(actor, camera) mỗi khung hình. badge(text) thêm ô vàng bên phải tên (trường quay: % trả lời
 * đúng của người ấy trong buổi đố vui), '' bỏ.
 */
export function makeNameTag(name, { fade = true, px: PXk = PX } = {}) {
  const text = cleanName(name);
  if (!text) return null;
  const px = 44, pad = 15, cv = document.createElement('canvas'), g = cv.getContext('2d');
  const font = `600 ${px}px 'Be Vietnam Pro', system-ui, sans-serif`, bfont = `700 ${Math.round(px * 0.8)}px 'Be Vietnam Pro', system-ui, sans-serif`;
  let aspect = 1, map = null;
  function draw(badge) {
    g.font = font;
    const tw = Math.ceil(g.measureText(text).width);
    g.font = bfont;
    const bw = badge ? Math.ceil(g.measureText(badge).width) + 26 : 0;
    const w = tw + pad * 2 + (bw ? bw + 12 : 0), h = Math.round(px * 1.5);
    cv.width = w; cv.height = h;
    const r = h / 2;
    g.beginPath();
    g.roundRect(2, 2, w - 4, h - 4, r - 2);
    g.fillStyle = 'rgba(14, 17, 16, 0.74)';
    g.fill();
    g.lineWidth = 2;
    g.strokeStyle = 'rgba(168, 199, 154, 0.45)';   // --sage-line
    g.stroke();
    g.font = font;
    g.fillStyle = '#f3efe6';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(text, pad + tw / 2, h / 2 + px * 0.06);      // dấu tiếng Việt cần chỗ phía trên
    if (bw) {
      const bx = pad + tw + 12, bh = h - 20;
      g.beginPath();
      g.roundRect(bx, 10, bw, bh, bh / 2);
      g.fillStyle = 'rgba(231, 189, 98, 0.92)';   // --gold
      g.fill();
      g.font = bfont;
      g.fillStyle = '#2a1d05';
      g.fillText(badge, bx + bw / 2, h / 2 + px * 0.04);
    }
    aspect = w / h;
    if (map) { map.dispose(); map.needsUpdate = true; }
  }
  draw('');
  map = new THREE.CanvasTexture(cv);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 4;
  const mat = new THREE.SpriteMaterial({ map, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(H * aspect, H, 1);
  sprite.center.set(0.5, 0);
  sprite.renderOrder = 10;
  const at = new THREE.Vector3();
  let head = null, shown = '';
  return {
    sprite,
    text,
    badge(b = '') { if (b !== shown) { shown = b; draw(b); } },
    update(actor, camera) {
      head ||= actor.root.getObjectByName('head') || actor.root;
      head.getWorldPosition(at);
      at.y += head === actor.root ? 1.9 : LIFT;
      sprite.position.copy(at);
      const d = camera.position.distanceTo(at);
      const k = !fade || d < NEAR ? 1 : Math.max(0, 1 - (d - NEAR) / (FAR - NEAR));
      mat.opacity = k;
      const hh = Math.max(H, d * PXk * Math.tan((camera.fov || 55) * Math.PI / 360) / 0.52);
      sprite.scale.set(hh * aspect, hh, 1);
      sprite.visible = actor.root.visible && k > 0.01;
    },
    dispose() { sprite.removeFromParent(); map.dispose(); mat.dispose(); },
  };
}

/**
 * Thẻ của những người ngồi / đứng sát nhau đè lên nhau trên màn hình (trường quay nhìn từ xa: hai ghế cạnh nhau chỉ cách vài
 * pixel): gọi sau mọi update() trong khung hình. Thẻ gần camera giữ chỗ, thẻ xa hơn chạm thẻ đã đặt thì nhấc lên từng bậc
 * (một chiều cao thẻ + 3 px), tối đa STEPS bậc, như bảng tên xếp bậc thang.
 */
const STEPS = 4, v0 = new THREE.Vector3(), v1 = new THREE.Vector3();
export function declutter(tags, camera, w, h) {
  const list = [];
  for (const t of tags) {
    const sp = t?.sprite;
    if (!sp?.visible) continue;
    v0.copy(sp.position).project(camera);
    if (v0.z > 1) continue;
    v1.copy(sp.position); v1.y += sp.scale.y; v1.project(camera);
    const x = (v0.x + 1) / 2 * w, y = (1 - v0.y) / 2 * h, hp = y - (1 - v1.y) / 2 * h;
    if (!(hp > 0)) continue;
    list.push({ sp, x, y, hp, wp: hp * sp.scale.x / sp.scale.y, d: camera.position.distanceToSquared(sp.position) });
  }
  list.sort((a, b) => a.d - b.d);
  const put = [];
  for (const t of list) {
    const half = t.wp / 2 + 1, step = t.hp + 3;
    let k = 0;
    for (; k < STEPS; k++) {
      const bot = t.y - k * step, top = bot - t.hp;
      if (!put.some(r => t.x - half < r.r && t.x + half > r.l && top < r.b && bot > r.t)) break;
    }
    const bot = t.y - k * step;
    put.push({ l: t.x - half, r: t.x + half, t: bot - t.hp, b: bot });
    if (k) t.sp.position.y += k * step / t.hp * t.sp.scale.y;
  }
}
