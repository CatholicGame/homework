/**
 * Nhà thờ Online (#/nha-tho): nhà thờ 3D kiểu Đức Bà Sài Gòn dựng bằng Blender (church-online/, xuất ra public/church/).
 * Mốc M1 của church-online/docs/tech-3d.md, chưa online: mình là một nhân vật điều khiển như game góc nhìn thứ ba:
 * cần điều khiển nổi (kéo ở nửa trái màn hình cảm ứng; đẩy hết cỡ thì đi nhanh) hoặc WASD / mũi tên (Shift đi nhanh),
 * hướng đi theo camera, có tăng tốc / giảm tốc, trượt dọc tường, không đi xuyên người khác; kéo nửa phải (hoặc chuột)
 * xoay camera quanh nhân vật, lăn chuột / Q E để thu phóng / xoay. Chạm sàn để đi tới (tìm đường trên lưới đi được `navGrid`
 * của layout.json, vòng sáng đánh dấu đích), chạm ghế trống để đi tới đầu hàng ghế rồi trượt vào ngồi,
 * chạm chỗ quỳ trước cung thánh để chắp tay cầu nguyện. Những người khác (ngồi sẵn
 * trên ghế, quỳ, vài người đi lại) là người giả để nhà thờ có người, chưa đồng bộ qua mạng. Không chat, chỉ có cử chỉ:
 * chắp tay, cúi chào (người đang đi gần đó cúi chào lại, một đốm sáng bay lên).
 * three.js chỉ tải khi mở trang này (main.js import động).
 * #/nha-tho/vatican (place 'vatican'): Quảng trường và Đền thờ Thánh Phê-rô (church-online/blender/scripts/build_vatican.py),
 * chỉ có mình đứng giữa quảng trường; mặt đất dốc lên tới tiền sảnh theo `navGrid.height`, camera nhìn xa tới mái vòm.
 * Vatican chia thành nhiều khu (saints.js ZONES: quảng trường, trong Đền thờ, hầm mộ…), mỗi khu một glb + layout: lúc mở chỉ
 * tải quảng trường; đi qua cổng hoặc chọn một chỗ của khu khác trong Đi nhanh thì màn hình tối đi, tải khu đó (giữ tối đa
 * hai khu), thay cảnh, đặt mình tới nơi. Renderer, nhân vật, điều khiển và camera giữ nguyên qua các khu.
 * Đôi cánh (vật phẩm của Tủ đồ wardrobe.js, vẽ ở wings.js; mây ở companions.js): đeo vào thì nút Bay hiện; bay thì cần / WASD đi theo mặt phẳng (vẫn không
 * xuyên tường theo lưới đi được), giữ ▲ ▼ (Space / C) để lên xuống tới trần bay của khu (`flyMax`), F hoặc nút Hạ xuống để đáp;
 * clip `hover` (bay tại chỗ) và `soar` (bay tới, nghiêng người) thay cho idle / walk, cánh vỗ theo nhịp clip.
 * Online (net.js, máy chủ phòng realtime/): mỗi khu là một phòng; người thật trong cùng phòng thấy nhau đi lại, bay, ngồi,
 * chắp tay, cúi chào (vị trí, hướng, clip gửi khi đổi, tối đa 8 lần một giây; bên nhận lướt mềm chậm REMOTE_LAG s). Khu camera
 * cố định (trường quay) không ai đi lại: chỉ báo ghế đang ngồi. Ghế do máy chủ giữ, ai xin trước được trước. Mỗi máy một màu
 * áo (SHIRTS, nhớ trong `kt-church-look`) để nhận ra nhau. Người giả vẫn ở đó cho nhà thờ có người.
 */
import { testRoom } from '../engine/admin.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js';
import { t, getLang } from '../engine/lang.js';
import { makeShrines } from './shrines.js';
import { icon } from './icons.js';
import { ZONES, SHRINES } from './saints.js';
import { exhibitOf, exhibitHeads, EXHIBIT_GROUPS } from './exhibit.js';
import { makeCrypt } from './crypt.js';
import { makeStudio } from './studio.js';
import { quizSfx } from './quizSfx.js';
import { occludeTree, updateOcclusion } from './occlusion.js';
import { makeSky, MODES } from './sky.js';
import { makeNight } from './nightLights.js';
import { makeFairyLights } from './fairyLights.js';
import { makeFountains } from './fountains.js';
import { makeBeams } from './lightBeams.js';
import { makeWings } from './wings.js';
import { applyLook, canFly, decodeLook, encodeLook, cleanLook, DEFAULT_LOOK, ITEMS, flyKind, flyTone } from './wardrobe.js';
import { makeBag } from './bag.js';
import { makeCloset } from './closet.js';
import { makeShop } from './shop.js';
import { makeThumbs } from './thumbs.js';
import { makePreview } from './preview.js';
import { makeExtrasKit, makeExtras } from './companions.js';
import { makePlaques } from './plaques.js';
import { makeMotes } from './motes.js';
import { paintMaterial } from './paint.js';
import { makeNet, ONLINE, LOOKS } from './net.js';
import { makeQuizOnline } from './quizOnline.js';
import { makeChat } from './chat.js';
import { makeNameTag, shortName, declutter } from './nameTag.js';
import { checkNick } from './nick.js';
import { getCurrentUser } from '../engine/auth.js';
import { setQuizGrade, quizGrade } from '../quiz/index.js';
import { setGrade as setSeedGrade } from '../engine/seeds.js';
import { HOST_LOOK } from './wardrobe.js';
import { holdUpdates } from '../../engine/appUpdate.js';
import './church.css';
import './churchSunny.css';

const BASE = '/thandong/';
// Bản 2 là bản chính thức: có texture, bóng tối góc (AO) tính sẵn, cây hoa, bóng đổ. Bản 1 (church_saigon.glb, màu phẳng)
// tạm ẩn, chỉ mở bằng ?v=1 (trước hoặc sau #/nha-tho) để so sánh.
const V2 = !/[?&]v=1(&|#|$)/.test(location.search + location.hash);
const KINDS = ['youth', 'woman', 'elder', 'nun', 'priest'];
// Nơi mở (site): nhà thờ Sài Gòn (một khu, có người giả) hoặc Vatican (nhiều khu; quảng trường rộng, nhìn xa: cần mặt phẳng
// xa và depth logarit, đặt một lần cho cả site vì không đổi được sau khi tạo renderer)
const SITES = { saigon: { far: 400, start: 'saigon' }, vatican: { far: 3500, start: 'vatican' }, studio: { far: 200, start: 'studio' } };
// chữ của từng nơi: tên, dòng nhỏ trên màn chờ, ảnh màn chờ, nút rời, lời chào
const SITE_TEXT = {
  saigon: { name: 'Nhà thờ Đức Bà Sài Gòn', kick: 'Sài Gòn', bg: BASE + 'cover.jpg', leave: 'Rời nhà thờ', loading: 'Đang mở cửa nhà thờ…', hello: 'Chúa ở cùng bạn.' },
  vatican: { name: 'Quảng trường Thánh Phê-rô', kick: 'Vatican', bg: '/real/thanh-phe-ro-tong-do.jpg', leave: 'Rời quảng trường', loading: 'Đang tải', hello: 'Quảng trường Thánh Phê-rô, Vatican.' },
  studio: { name: 'Ai tài năng nhất?', kick: 'Đấu trường toán học', bg: BASE + 'cover-studio.jpg', leave: 'Rời trường quay', loading: 'Đang bật đèn trường quay…', hello: 'Chào mừng tới trường quay.' },
};
// Cách vẽ từng khu; tệp và tên các khu Vatican ở saints.js ZONES
const LOOK = {
  // inside: 0 ngoài trời .. 1 trong nhà (ban đêm trong nhà là đèn nến, ngoài trời là ánh trăng: sky.js); cửa chính ở z ≈ 10
  // flyMax: trần bay (m trên mặt đất) khi đeo cánh; overRoofs: khu ngoài trời, bay cao hơn mái / hàng cột / vòm thì qua được
  // (bản đồ độ cao mặt trên cùng: roofAt), thấp hơn thì vẫn chặn như tường; ra ngoài lưới đi bộ được khi bay cao (qua vòm);
  // overRoofs: 'grid' = chỉ qua bồn hoa, bệ tượng… trong lưới đi bộ, không bay ra phố; 'slots' = trong nhà (có trần): qua được
  // hàng ghế, lan can… khi thân người lọt khe trống giữa chúng và trần (bản đồ tầng: slotsAt), tường và cột vẫn chặn
  saigon: { glb: V2 ? 'church_saigon_v2.glb' : 'church_saigon.glb', layout: 'layout.json', people: true, sun: [-10, 12, -30], camClip: true, sky: true, built: true, flyMax: 6, overRoofs: 'grid',
    inside: (x, z) => Math.min(1, Math.max(0, (10.5 - z) / 3.5)) },
  // camClip: camera sau lưng không chui vào cột / tường: dừng trước ô không đi được đầu tiên trên đường từ nhân vật ra
  // quảng trường: không có phố, vườn quanh khu; bay trong lưới đi bộ, không qua hàng cột (cao khoảng 20 m) hay ra ngoài
  // underRoofs: dưới mái (hàng cột, hiên mặt tiền) chỉ bay thấp hơn chừng ấy m; bay cao hơn thì ô có mái là tường
  // flyMax 8: cao bằng bệ tháp đá giữa quảng trường (bệ 8,25 m), bay quá cao thì người và quảng trường nhỏ xíu, khó nhìn
  vatican: { sun: [-18, 30, 26], camClip: true, sky: true, flyMax: 8, underRoofs: 6,
    // bóng đổ: chỉ hàng cột, tháp đá, đài nước, mặt tiền; mặt đất và khối lớn quá to để vẽ lại vào bản đồ bóng mỗi khung hình
    noShadow: /^vat_(ground|square_paving|basilica_body|dome|minor_domes|palace)/ },
  // trong Đền thờ: các mặt ảnh thật (vin_unlit_*) đã mang sẵn ánh sáng của nhà thờ thật, vẽ không qua đèn
  'vatican-in': { sun: [8, 40, 14], camClip: true, sky: false, bg: 0x2a2018, inside: true, flyMax: 16, overRoofs: 'slots' },
  // hầm mộ: tối bất kể giờ, chỉ có ánh lửa (crypt.js thay ánh trời mỗi khung hình); trần thấp
  grotte: { sun: [0, 40, 0], camClip: true, sky: false, bg: 0x0a0705, inside: true, flyMax: 2 },
  // trường quay đố vui (build_studio.py): phòng tối, đèn sân khấu và neon (studio.js), không theo giờ; khán giả giả ngồi yên
  // trên các bậc, không ai đi lại. fixedCam: camera đứng yên trên cao cuối phòng nhìn xuống sân khấu (như ngồi trong rạp),
  // không đi, không xoay; vào là tự chọn một ghế trống và ngồi (chạm ghế trống khác để đổi chỗ). host: MC ngồi ghế MC.
  studio: { glb: 'studio.glb', layout: 'studio_layout.json', name: 'Ai tài năng nhất?', people: true, seated: 0, walkers: 0,   // khán phòng chỉ có người thật (người giả bỏ từ 2026-11-05)
    built: true,
    sun: [2, 16, 3], sky: false, bg: 0x050508, inside: true, noShadow: /^st_(shell|rig)/, host: 'friar',
    // fixedCam.presets: các góc có sẵn (cái đầu là mặc định) cho màn hình ngang `land` / dọc `port` (yaw, pitch: rad; fov: độ;
    // thiếu `port` thì lấy `land` với góc nhìn rộng hơn); box: camera chỉnh tay không ra ngoài phòng
    fixedCam: { presets: [
      // Từ ghế của tôi (người dùng 2026-11-06, mặc định): góc thứ nhất, mắt mình ở ghế đang ngồi nhìn thẳng vào sân khấu; tính
      // theo ghế thật (seatView), đổi ghế thì camera theo sang; chưa ngồi thì tạm lấy Toàn cảnh
      { name: 'Từ ghế của tôi', icon: 'armchair', seat: true },
      { name: 'Toàn cảnh', icon: 'expand', land: { pos: [8.46, 8.16, 15.3], yaw: 0.509, pitch: -0.214, fov: 55 }, port: { pos: [8.46, 8.16, 15.3], yaw: 0.509, pitch: -0.3, fov: 82 } },
      { name: 'Cận MC', icon: 'user', land: { pos: [-5.2, 2.81, 2.98], yaw: -0.346, pitch: -0.039, fov: 74 } },
      // hai góc dưới do người dùng chọn 2026-11-05 (yaw đã quy về −π…π: −18,84 → 0,01; −15,931 → −3,365)
      { name: 'Trực diện', icon: 'monitor', land: { pos: [-0.04, 1.72, 0.2], yaw: 0.01, pitch: -0.016, fov: 74 } },
      { name: 'Khán phòng', icon: 'users', land: { pos: [5.08, 2.56, -11.34], yaw: 2.601, pitch: -0.114, fov: 74 } },
    ], box: [[-10.2, 0.6, -15], [10.2, 13.6, 15.3]] } },
};
const zoneOf = (id) => ({ ...ZONES[id], ...LOOK[id] });
const ZONE_KEEP = 2;        // số khu giữ trong bộ nhớ (khu đang ở + khu vừa rời: quay lại không phải tải lại)
// Ai tài năng nhất: học sinh dựng bằng Hyper3D (public/thandong/characters/<kind>.glb, clip <kind>_idle…,
// scripts/blender/build_pupil_anim.py). Mỗi người một bạn theo tên (cùng tên → cùng bạn trên mọi máy).
const PUPILS = ['pupil_boy', 'pupil_glasses', 'pupil_curly', 'pupil_buzz', 'pupil_girl', 'pupil_pony', 'pupil_buns'];
const pupilOf = (name) => {
  let h = 2166136261;
  for (const ch of String(name || '').toLowerCase()) h = Math.imul(h ^ ch.codePointAt(0), 16777619);
  return PUPILS[(h >>> 0) % PUPILS.length];
};
const OTHERS = ['woman', 'woman', 'elder', 'elder', 'nun', 'priest']; // người giả: khác dáng mình (thanh niên)
const WALK = 1.4;           // m/s: đi thường
const FAST = 2.4;           // m/s: đi nhanh (Shift, đẩy cần hết cỡ, chạm chỗ xa); không chạy trong nhà thờ
const OTHER_SPEED = 1.0;    // m/s: người giả đi thong thả
const FLY = 5;              // m/s: bay thường (đeo cánh)
const FLY_FAST = 12;        // m/s: bay nhanh (Shift, đẩy cần hết cỡ, chạm chỗ xa)
const FLY_HIGH = 25;        // m: càng cao bay càng nhanh, cứ chừng này mét thêm một lần tốc độ gốc (tối đa FLY_GAIN lần)
const FLY_GAIN = 6;
const CLIMB = 4;            // m/s: lên / xuống khi giữ ▲ ▼ (Shift: gấp đôi)
const CLIMB_K = 0.5;        // 1/s: lên cao rồi thì lên / xuống nhanh dần theo độ cao (tới đỉnh vòm chừng 8 s)
const TAKEOFF = 1.6;        // m: độ cao lúc vừa cất cánh
const FLY_MIN = 0.6;        // m: thấp nhất khi đang bay; giữ ▼ ở đây thì đáp xuống
const FLIGHT = { idle: 'hover', walk: 'soar' }; // clip thay thế khi đang bay
const STRIDE = 1.5;         // m/s ứng với clip walk ở tốc độ gốc: hoạt ảnh nhanh / chậm theo tốc độ để chân không trượt
const BODY_R = 0.45;        // m: khoảng cách tối thiểu giữa mình và người đang đứng / quỳ / đi
const WALL_R = 0.7;         // m: người đi cách tường / cột chừng này, để camera sau lưng không lọt vào trong tường
const STICK_R = 56;         // px: bán kính cần điều khiển
const BOW_NEAR = 3;         // m: cúi chào được người trong tầm này
const PITCH_MIN = -0.35, PITCH_MAX = 1.05; // rad: nhìn xuống / nhìn lên tới vòm
const PITCH_MIN_FLY = -0.95;                // rad: đang bay thì nhìn xuống được nhiều hơn
const SEATED = 40;          // số người giả ngồi sẵn
const WALKERS = 5;          // số người giả đi lại
const REMOTE_LAG = 0.2;     // s: người thật khác vẽ chậm hơn chừng này, đủ hai gói trạng thái để lướt giữa chúng
const SEND_GAP = 0.125;     // s: gửi trạng thái của mình tối đa 8 lần một giây (đổi clip thì gửi ngay)
// màu áo polo của nhân vật mỗi máy (cái đầu: xám gốc), để những người thật trong phòng nhận ra nhau
const SHIRTS = [null, 0x3f6fb5, 0xb5513f, 0x3f9a6a, 0xc7962e, 0x7a4fb0, 0x2f8f9a, 0xc0607f];
// màu áo cũ (SHIRTS, trước khi có Tủ đồ) → màu trong bảng PAL của wardrobe.js: máy cũ chưa gửi bộ đồ vẫn hiện đúng màu
const SHIRT_PAL = [13, 9, 2, 6, 5, 11, 7, 3];
// sổ hành hương (bag.js): mỗi nơi đã dựng một con dấu (tới là có), mỗi chỗ thánh có giá nến một con dấu (thắp nến / cầu nguyện)
const ZONE_EN = { saigon: 'Saigon Notre-Dame Cathedral', studio: 'The quiz studio', vatican: "Saint Peter's Square", 'vatican-in': "Inside Saint Peter's Basilica", grotte: 'The Vatican Grottoes' };
const STAMPS = [
  { id: 'saigon', name: 'Nhà thờ Đức Bà Sài Gòn', en: ZONE_EN.saigon, group: 'Gặp gỡ online' },
  { id: 'studio', name: 'Trường quay Ai tài năng nhất?', en: ZONE_EN.studio, group: 'Gặp gỡ online' },
  ...Object.entries(ZONES).filter(([, z]) => z.built).map(([id, z]) => ({ id, name: z.name, en: ZONE_EN[id], group: 'Vatican' })),
  ...SHRINES.filter(d => d.candles > 0 && ZONES[d.zone]?.built).map(d => ({ id: d.id, name: d.name, en: d.en?.name, group: ZONES[d.zone].name })),
];

// bảng chỉnh camera của trường quay: trục, nhãn, icon và hướng của hai nút, phím tắt
const CAM_ROWS = [['fb', 'Tiến / lùi', 'up', 1, 'down', -1, 'W S'], ['lr', 'Trái / phải', 'left', -1, 'right', 1, 'A D'],
  ['ud', 'Lên / xuống', 'up', 1, 'down', -1, 'R F'], ['yaw', 'Xoay', 'turnL', -1, 'turnR', 1, 'Q E'],
  ['pitch', 'Ngước / cúi', 'up', 1, 'down', -1, 'T G'], ['fov', 'Phóng / thu', 'plus', -1, 'minus', 1, 'Z X']];
const CAM_KEYS = { KeyW: ['fb', 1], KeyS: ['fb', -1], KeyA: ['lr', -1], KeyD: ['lr', 1], KeyR: ['ud', 1], KeyF: ['ud', -1],
  KeyQ: ['yaw', -1], KeyE: ['yaw', 1], KeyT: ['pitch', 1], KeyG: ['pitch', -1], KeyZ: ['fov', -1], KeyX: ['fov', 1] };

// MC trường quay: một nam tu sĩ, dáng linh mục (priest.glb) mặc áo dòng nâu thay áo chùng đen
const HOST_SCALE = 1.3;   // MC Thầy Minh (avatar) so với học sinh
const HOT_BACK = 1.5, HOT_UP = 0.75;   // m: góc qua vai người ngồi ghế nóng (meView)
const FRIAR = { ch_cloth_black: 0x5b3a22, ch_cloth_white: 0x6e4a2e, ch_button_black: 0x3a2414, ch_shoe_black: 0x2a1a10 };

// Ngẫu nhiên có hạt giống: mỗi lần mở, nhà thờ có người ngồi ở cùng những chỗ
function rng(seed) {
  return () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/** Lưới đi được (layout.navGrid): ô 0,5 m, planX = x, planY = -z; tìm đường A* 8 hướng rồi nắn thẳng. */
function makeGrid(g) {
  const ok = (i, j) => g.walkable[j]?.[i] === '1';
  const cellOf = (x, z) => [Math.floor((x - g.x0) / g.cell), Math.floor((-z - g.y0) / g.cell)];
  const center = (i, j) => [g.x0 + (i + 0.5) * g.cell, -(g.y0 + (j + 0.5) * g.cell)];
  const walkable = (x, z) => ok(...cellOf(x, z));
  const inGrid = (x, z) => { const [i, j] = cellOf(x, z); return j >= 0 && j < g.walkable.length && i >= 0 && i < g.walkable[0].length; };
  function nearest(x, z, r = 6) {
    const [ci, cj] = cellOf(x, z);
    let best = null, bd = Infinity;
    for (let j = cj - r; j <= cj + r; j++) for (let i = ci - r; i <= ci + r; i++) {
      if (!ok(i, j)) continue;
      const [cx, cz] = center(i, j), d = (cx - x) ** 2 + (cz - z) ** 2;
      if (d < bd) { bd = d; best = [cx, cz]; }
    }
    return best;
  }
  const line = (ax, az, bx, bz) => {
    const n = Math.ceil(Math.hypot(bx - ax, bz - az) / 0.15);
    for (let k = 1; k <= n; k++) if (!walkable(ax + (bx - ax) * k / n, az + (bz - az) * k / n)) return false;
    return true;
  };
  // đường thẳng có chừa hai bên WALL_R: nắn thẳng không kéo người men sát tường (lối hẹp thì giữ các ô giữa lối của A*)
  const clear = (ax, az, bx, bz, wide = true) => {
    if (!line(ax, az, bx, bz)) return false;
    const d = Math.hypot(bx - ax, bz - az);
    if (!wide || d < 1e-3) return true;
    const ox = -(bz - az) / d * WALL_R, oz = (bx - ax) / d * WALL_R;
    return line(ax + ox, az + oz, bx + ox, bz + oz) && line(ax - ox, az - oz, bx - ox, bz - oz);
  };
  // ô sát ô không đi được: A* tính đắt hơn để đường đi giữa lối
  const edge = new Map();
  const nearWall = (i, j) => {
    const k = j * g.cols + i;
    let v = edge.get(k);
    if (v === undefined) {
      v = 0;
      for (let dj = -1; dj <= 1 && !v; dj++) for (let di = -1; di <= 1; di++) if (!ok(i + di, j + dj)) { v = 1; break; }
      edge.set(k, v);
    }
    return v;
  };
  // hướng đẩy ra khỏi tường khi đứng gần hơn WALL_R (tổng theo 8 hướng: lối hẹp hai bên cân nhau, người đứng giữa)
  function push(x, z) {
    let px = 0, pz = 0;
    for (let a = 0; a < 8; a++) {
      const dx = Math.cos(a * Math.PI / 4), dz = Math.sin(a * Math.PI / 4);
      for (let r = 0.15; r <= WALL_R + 1e-6; r += 0.15) {
        if (!walkable(x + dx * r, z + dz * r)) { px -= dx * (WALL_R - r + 0.15); pz -= dz * (WALL_R - r + 0.15); break; }
      }
    }
    return [px / 4, pz / 4];
  }
  // điểm chạm sát tường: lùi ra giữa lối (nếu chỗ lùi ra vẫn đi được)
  function away(x, z) {
    for (let n = 0; n < 4; n++) {
      const [px, pz] = push(x, z);
      if (!px && !pz) break;
      if (!walkable(x + px, z + pz)) break;
      x += px; z += pz;
    }
    return [x, z];
  }
  function path(ax, az, bx, bz) {
    if (clear(ax, az, bx, bz)) return [[bx, bz]];
    const [si, sj] = cellOf(ax, az), [ti, tj] = cellOf(bx, bz);
    const W = g.cols, key = (i, j) => j * W + i;
    const gs = new Map([[key(si, sj), 0]]), from = new Map(), done = new Set();
    const heap = [[0, si, sj]];
    const push = (it) => { heap.push(it); let c = heap.length - 1; while (c) { const p = (c - 1) >> 1; if (heap[p][0] <= it[0]) break; heap[c] = heap[p]; c = p; } heap[c] = it; };
    const pop = () => {
      const top = heap[0], last = heap.pop();
      if (heap.length) { let c = 0; for (;;) { let m = c * 2 + 1; if (m >= heap.length) break; if (m + 1 < heap.length && heap[m + 1][0] < heap[m][0]) m++; if (heap[m][0] >= last[0]) break; heap[c] = heap[m]; c = m; } heap[c] = last; }
      return top;
    };
    const h = (i, j) => Math.hypot(i - ti, j - tj);
    while (heap.length) {
      const [, i, j] = pop(), k = key(i, j);
      if (done.has(k)) continue;
      done.add(k);
      if (i === ti && j === tj) break;
      for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
        if (!di && !dj) continue;
        const ni = i + di, nj = j + dj;
        if (!ok(ni, nj) || (di && dj && (!ok(i + di, j) || !ok(i, j + dj)))) continue;
        const nk = key(ni, nj), ng = gs.get(k) + (di && dj ? Math.SQRT2 : 1) * (nearWall(ni, nj) ? 3 : 1);
        if (ng < (gs.get(nk) ?? Infinity)) { gs.set(nk, ng); from.set(nk, k); push([ng + h(ni, nj), ni, nj]); }
      }
    }
    let k = key(ti, tj);
    if (!from.has(k)) return [];
    const cells = [];
    while (k !== key(si, sj)) { cells.unshift(center(k % W, Math.floor(k / W))); k = from.get(k); }
    cells[cells.length - 1] = [bx, bz];
    // nắn thẳng: bỏ các điểm giữa nếu đi thẳng được
    const out = [];
    let cx = ax, cz = az, n = 0;
    while (n < cells.length) {
      let far = n;
      for (let m = cells.length - 1; m > n; m--) if (clear(cx, cz, ...cells[m])) { far = m; break; }
      out.push(cells[far]);
      [cx, cz] = cells[far];
      n = far + 1;
    }
    return out;
  }
  // độ cao mặt đất dưới chân (navGrid.height: mỗi ô một ký tự, chr(48 + mét × 10)); không có thì sàn phẳng
  const heightAt = (x, z) => {
    const [i, j] = cellOf(x, z), c = g.height?.[j]?.charCodeAt(i);
    return c ? (c - 48) / 10 : 0;
  };
  // mở / chặn một ô (giá nến đặt sát tượng: lối tới trước giá, chỗ giá đứng)
  function setCell(x, z, on) {
    const [i, j] = cellOf(x, z), row = g.walkable[j];
    if (!row || i < 0 || i >= row.length || (row[i] === '1') === on) return;
    g.walkable[j] = row.slice(0, i) + (on ? '1' : '0') + row.slice(i + 1);
    edge.clear();
  }
  return { walkable, inGrid, nearest, path, heightAt, push, away, setCell, cell: g.cell };
}

// Góc quay để mặt nhân vật (mặc định nhìn -Z, về phía bàn thờ) hướng theo (dx, dz)
const headingOf = (dx, dz) => Math.atan2(-dx, -dz);
const turnTo = (a, b, k) => a + Math.atan2(Math.sin(b - a), Math.cos(b - a)) * k;

/** Một người: mesh có xương (clone), các clip <kind>_idle | walk | bow | pray | sit, đi theo đường. */
class Actor {
  constructor(gltf, kind) {
    this.root = cloneSkinned(gltf.scene);
    this.root.traverse(o => { if (o.isMesh) { o.frustumCulled = false; o.castShadow = V2; } });
    this.mixer = new THREE.AnimationMixer(this.root);
    this.clips = Object.fromEntries(gltf.animations.map(c => [c.name.slice(kind.length + 1), c]));
    this.route = [];
    this.heading = 0;
    this.pose = null;
    this.busy = 0;     // giây còn lại của một cử chỉ (cúi chào)
    this.live = true;  // người ngồi yên không cần cập nhật xương mỗi khung hình
    this.v = 0;        // tốc độ hiện tại khi đi theo đường (tăng / giảm dần)
    this.max = OTHER_SPEED;
    this.turn = 5;     // tốc độ quay người theo hướng đi
    this.ground = null; // (x, z) => độ cao mặt đất, nơi có dốc / bậc thềm (Quảng trường Thánh Phê-rô)
    this.fly = null;    // đang bay (có cánh): { alt, want, landing } độ cao trên mặt đất, độ cao muốn tới, việc làm khi đáp
    this.look = null;   // đứng yên thì quay dần (đường ngắn nhất) về hướng này (số) hay về phía một người (Actor)
    this.onFaced = null;
    this.slide = null;  // lùi vào ghế lúc ngồi xuống: { from, to, t, d }
  }
  /** Quay tại chỗ về hướng h (hoặc phía người h) theo đường ngắn, xong thì then(). */
  face(h, then) { this.look = h; this.onFaced = then || null; }
  get pos() { return this.root.position; }
  // nhịp bước theo tốc độ đi thật
  pace(v) { if (this.pose === 'walk') this.action.timeScale = Math.max(0.45, v / STRIDE); }
  play(name, { once = false, fade = 0.35, end = false } = {}) {
    if (this.fly) name = FLIGHT[name] || name;
    if (this.pose === name && !once) return;
    // cưỡi mây (this.cloud): người chỉ đứng, mây bay; tên tư thế vẫn là hover / soar (gửi đi, mây của companions.js theo nó)
    const clip = this.cloud && /^(hover|soar)$/.test(name) ? 'idle' : name;
    if (this.action && clip !== name && this.action.getClip() === this.clips[clip]) { this.pose = name; return; }
    const next = this.mixer.clipAction(this.clips[clip]);
    next.reset();
    next.timeScale = 1;
    next.setLoop(once ? THREE.LoopOnce : THREE.LoopRepeat, Infinity);
    next.clampWhenFinished = true;
    if (end) next.time = this.clips[clip].duration;
    // hover ↔ soar cùng dài 1 s: giữ nguyên nhịp để cánh (vỗ theo thời gian clip) không giật
    if (this.action && clip === name && /^(hover|soar)$/.test(name) && /^(hover|soar)$/.test(this.pose)) next.time = this.action.time % this.clips[name].duration;
    if (this.action && this.action !== next && fade) next.crossFadeFrom(this.action, fade, false);
    else if (this.action && this.action !== next) this.action.stop();
    next.play();
    this.action = next;
    this.pose = name;
  }
  walk(points, onArrive) {
    this.route = points;
    this.onArrive = onArrive;
    if (!this.ground && !this.fly) this.root.position.y = 0;
    if (points.length) this.play('walk'); else onArrive?.();
  }
  update(dt) {
    if (this.busy > 0) this.busy -= dt;
    if (this.route.length && this.busy <= 0) {
      const [tx, tz] = this.route[0], p = this.pos;
      const dx = tx - p.x, dz = tz - p.z, d = Math.hypot(dx, dz);
      // tăng tốc khi bắt đầu, chậm dần khi gần tới đích; đường xa thì người chơi đi nhanh
      let rem = d;
      for (let i = 1; i < this.route.length; i++) rem += Math.hypot(this.route[i][0] - this.route[i - 1][0], this.route[i][1] - this.route[i - 1][1]);
      const top = this.fly ? (rem > 10 ? FLY_FAST : FLY) : this.max === WALK && rem > 6 ? FAST : this.max;
      const want = Math.min(top, 0.35 + Math.sqrt(5 * rem));
      this.v += (want - this.v) * (1 - Math.exp(-dt * 5));
      const step = this.v * dt;
      if (d > 0.001) this.heading = turnTo(this.heading, headingOf(dx, dz), Math.min(1, dt * this.turn));
      if (d <= step) {
        p.x = tx; p.z = tz;
        this.route.shift();
        if (!this.route.length) { this.v = 0; this.play('idle'); const f = this.onArrive; this.onArrive = null; f?.(); }
      } else { p.x += dx / d * step; p.z += dz / d * step; }
      this.pace(this.v);
    }
    if (!this.route.length && this.look != null) {
      const l = this.look, h = typeof l === 'number' ? l : headingOf(l.pos.x - this.pos.x, l.pos.z - this.pos.z);
      this.heading = turnTo(this.heading, h, Math.min(1, dt * this.turn * 0.8));
      if (this.onFaced && Math.abs(Math.atan2(Math.sin(h - this.heading), Math.cos(h - this.heading))) < 0.05) {
        this.heading = h;
        const f = this.onFaced;
        this.onFaced = null;
        this.look = null;
        f();
      }
    }
    if (this.slide) {
      const s = this.slide;
      s.t = Math.min(s.d, s.t + dt);
      let k = s.t / s.d;
      k = k * k * (3 - 2 * k);
      this.pos.set(s.from[0] + (s.to[0] - s.from[0]) * k, s.from[1] + (s.to[1] - s.from[1]) * k, s.from[2] + (s.to[2] - s.from[2]) * k);
      if (s.t >= s.d) this.slide = null;
    }
    if ((this.ground || this.fly) && !this.seat) {
      // bay: theo mặt đất mềm hơn, qua bậc thềm không nảy lên
      const p = this.pos, h = (this.ground ? this.ground(p.x, p.z) : 0) + (this.fly ? this.fly.alt : 0);
      p.y += (h - p.y) * Math.min(1, dt * (this.fly ? 5 : 12));
    }
    this.root.rotation.y = this.heading;
    if (this.live) this.mixer.update(dt);
  }
}

// chữ của giao diện nhà thờ (church.css), chỉ tải khi vào nhà thờ lần đầu
// font của kinh-thanh (index.html): Be Vietnam Pro cho dải câu hỏi kiểu truyền hình, Nunito cho giao diện Tươi sáng
const FONTS = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Nunito:wght@500;600;700;800;900&display=swap';

export function renderChurch(app, { onBack, place = 'saigon', films = null, grade = 3 }) {
  // Ai tài năng nhất: trường quay theo lớp (bộ câu quiz/bank, phòng studio-g<lớp>, khoá sao thandong<lớp>)
  setQuizGrade(grade); setSeedGrade(grade);
  const site = SITES[place] ? place : 'saigon', S = SITES[site];
  const square = site === 'vatican', studioSite = site === 'studio', TX = SITE_TEXT[site];
  let zoneId = S.start, Z = zoneOf(zoneId);
  if (!document.querySelector(`link[href="${FONTS}"]`)) document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="${FONTS}">`);
  app.innerHTML = `<div class="ch">
    <canvas class="ch-canvas" aria-label="${t('Trường quay 3D Ai tài năng nhất?')}"></canvas>
    <div class="ch-stick" aria-hidden="true" hidden><span class="ch-stick-knob"></span></div>
    <div class="ch-top">
      <button type="button" class="ch-ic ch-close" aria-label="${t(TX.leave)}" title="${t(TX.leave)}">${icon('x')}</button>
      <span class="ch-seedpop" aria-live="polite"></span>
      <div class="ch-chip"><span class="ch-dot" aria-hidden="true"></span><span class="ch-title">${t(TX.name)}</span>${testRoom() ? `<span class="ch-testtag" title="${t('Phòng riêng của người thử: không cần đủ người, không cộng sao')}">🧪 ${t('Phòng thử')}</span>` : ''}<span class="ch-seat" hidden></span><span class="ch-online" hidden title="${t('Số người đang ở đây')}">${icon('users')}<b></b></span></div>
      <button type="button" class="ch-ic ch-sky"${studioSite ? ' hidden' : ''} aria-haspopup="menu" aria-expanded="false" aria-label="${t('Giờ trong nhà thờ')}" title="${t('Giờ trong nhà thờ')}"></button>
    </div>
    <div class="ch-lcol"><button type="button" class="ch-ic ch-eye" aria-pressed="false"></button><button type="button" class="ch-ic ch-full" aria-pressed="false" hidden></button></div>
    <div class="ch-views" role="toolbar" aria-label="${t('Góc nhìn')}" hidden><span class="ch-views-list"></span><button type="button" class="ch-views-seat" aria-haspopup="dialog" aria-expanded="false" aria-label="${t('Chọn ghế')}" title="${t('Chọn ghế')}">${icon('seats')}</button><button type="button" class="ch-views-seat ch-views-shop" aria-haspopup="dialog" aria-label="${t('Vật phẩm')}" title="${t('Vật phẩm')}">${icon('gift')}<b class="ch-badge" hidden></b></button><button type="button" class="ch-views-seat ch-views-closet" aria-haspopup="dialog" aria-label="${t('Tủ đồ')}" title="${t('Tủ đồ')}">${icon('shirt')}</button><button type="button" class="ch-views-seat ch-views-pet" hidden>${icon('paw')}</button><button type="button" class="ch-views-set" aria-expanded="false" aria-label="${t('Chỉnh camera')}" title="${t('Chỉnh camera')}">${icon('sliders')}</button></div>
    <div class="ch-camset" hidden>
      <p class="ch-go-h">${t('Góc nhìn')}</p>
      <div class="ch-cam-pres"></div>
      <p class="ch-go-h">${t('Chỉnh camera')}</p>
      ${CAM_ROWS.map(([ax, label, i1, d1, i2, d2, keys]) => `<div class="ch-cam-row"><span>${t(label)} <i>${keys}</i></span>
        <button type="button" class="ch-ic" data-ax="${ax}" data-d="${d1}" aria-label="${t(label)} ${d1}">${icon(i1)}</button>
        <button type="button" class="ch-ic" data-ax="${ax}" data-d="${d2}" aria-label="${t(label)} ${d2}">${icon(i2)}</button></div>`).join('')}
      <p class="ch-cam-read"></p>
      <div class="ch-cam-foot"><button type="button" data-cam="save">${t('Lưu góc này')}</button><button type="button" data-cam="copy">${t('Sao chép')}</button></div>
    </div>
    <div class="ch-seatmap" role="dialog" aria-modal="true" aria-label="${t('Chọn ghế')}" hidden>
      <div class="ch-sm-box">
        <div class="ch-sm-head"><b class="ch-sm-title">${t('Chọn ghế')}</b><span class="ch-sm-count"></span><button type="button" class="ch-ic ch-sm-x" aria-label="${t('Đóng')}" title="${t('Đóng')}">${icon('x')}</button></div>
        <p class="ch-sm-sub" hidden>${t('Chạm một ghế trống trên sơ đồ, hoặc để chúng tôi chọn giúp, rồi bấm Vào ngồi.')}</p>
        <div class="ch-sm-stage"><span>${t('Sân khấu')}</span></div>
        <div class="ch-sm-wrap"><div class="ch-sm-grid"></div></div>
        <div class="ch-sm-legend"><span><i class="is-free"></i>${t('Trống')}</span><span><i class="is-taken"></i>${t('Đã có người')}</span><span><i class="is-mine"></i>${t('Ghế của bạn')}</span><span><i class="is-pick"></i>${t('Đang chọn')}</span></div>
        <div class="ch-sm-foot"><span class="ch-sm-pick"></span><button type="button" class="ch-sm-auto">${t('Chọn giúp tôi')}</button><button type="button" class="ch-sm-ok" disabled>${t('Ngồi ghế này')}</button></div>
      </div>
    </div>
    <div class="ch-time" role="menu" hidden></div>
    <p class="ch-msg" aria-live="polite"></p>
    <div class="ch-go" role="menu" hidden></div>
    <div class="ch-fade" aria-hidden="true"></div>
    <div class="ch-alt" hidden>
      <button type="button" class="ch-ic" data-alt="1" aria-label="${t('Bay lên cao')}" title="${t('Bay lên cao')} (Space)">${icon('up')}</button>
      <button type="button" class="ch-ic" data-alt="-1" aria-label="${t('Bay xuống thấp')}" title="${t('Bay xuống thấp')} (C)">${icon('down')}</button>
    </div>
    <div class="ch-acts">
      <button type="button" class="ch-act" data-act="stand" hidden>${icon('stand')}<span>${t('Đứng lên')}</span></button>
      <button type="button" class="ch-act" data-act="pray">${icon('pray')}<span>${t('Chắp tay')}</span></button>
      <button type="button" class="ch-act" data-act="bow" hidden>${icon('bow')}<span>${t('Cúi chào')}</span></button>
      <button type="button" class="ch-act" data-act="fly" hidden></button>
      <button type="button" class="ch-act" data-act="wings" hidden></button>
      <button type="button" class="ch-act" data-act="pet" hidden></button>
      <button type="button" class="ch-act" data-act="shop" aria-haspopup="dialog">${icon('gift')}<span>${t('Vật phẩm')}</span><b class="ch-badge" hidden></b></button>
      <button type="button" class="ch-act" data-act="closet" aria-haspopup="dialog">${icon('shirt')}<span>${t('Tủ đồ')}</span></button>
      <button type="button" class="ch-act" data-act="go" hidden aria-expanded="false">${icon('pin')}<span>${t('Đi nhanh')}</span></button>
    </div>
    <div class="ch-load" role="status">
      <div class="ch-load-bg" style="background-image:url(${TX.bg})" aria-hidden="true"></div>
      <div class="ch-load-box">
        <p class="ch-load-kick">${icon('pin')}<span>${t(TX.kick)}</span></p>
        <h2 class="ch-load-title">${t(TX.name)}</h2>
        <div class="ch-load-bar"><i></i></div>
        <p class="ch-load-msg"><span>${t(TX.loading)}</span><b></b></p>
      </div>
      ${square ? '<small class="ch-load-credit">Ảnh: Alvesgaspar, CC BY-SA 4.0, Wikimedia Commons</small>' : ''}
    </div>
  </div>`;
  const root = app.querySelector('.ch');
  const canvas = root.querySelector('.ch-canvas');
  const msgEl = root.querySelector('.ch-msg');
  const btn = (a) => root.querySelector(`[data-act="${a}"]`);
  const titleEl = root.querySelector('.ch-title'), seatEl = root.querySelector('.ch-seat'), onlineEl = root.querySelector('.ch-online');
  const stickEl = root.querySelector('.ch-stick'), knobEl = stickEl.firstElementChild;
  const touchUI = matchMedia('(pointer: coarse)').matches;
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  stickEl.hidden = !touchUI;
  root.querySelector('.ch-close').onclick = () => askLeave();
  // con mắt (trường quay): ẩn / hiện những thứ không cần lúc chương trình đang diễn (thanh góc nhìn, tên nơi, bảng camera,
  // thống kê, khung chat), chỉ còn câu hỏi, nút chơi và nút thoát; nhớ trên máy
  const eyeEl = root.querySelector('.ch-eye'), EYE_KEY = 'kt-studio-clean';
  function eyeSet(clean, save = true) {
    root.classList.toggle('is-clean', clean);
    eyeEl.setAttribute('aria-pressed', clean);
    const label = clean ? t('Hiện lại giao diện') : t('Ẩn bớt giao diện');
    eyeEl.innerHTML = icon(clean ? 'eyeOff' : 'eye');
    eyeEl.title = label;
    eyeEl.setAttribute('aria-label', label);
    if (save) try { localStorage.setItem(EYE_KEY, clean ? '1' : ''); } catch { /* bộ nhớ bị chặn */ }
  }
  let eyeStart = false;
  try { eyeStart = localStorage.getItem(EYE_KEY) === '1'; } catch { /* không đọc được */ }
  eyeSet(eyeStart, false);
  eyeEl.onclick = () => eyeSet(!root.classList.contains('is-clean'));
  // toàn màn hình (mọi nơi; trình duyệt không có API này, như iPhone, thì ẩn nút). Rời nơi này thì thoát toàn màn hình nút đã bật.
  const fullEl = root.querySelector('.ch-full');
  const fsEl = () => document.fullscreenElement || document.webkitFullscreenElement;
  let weFull = false;
  function fullPaint() {
    const on = !!fsEl(), label = on ? t('Thoát toàn màn hình') : t('Toàn màn hình');
    fullEl.innerHTML = icon(on ? 'fullOff' : 'full');
    fullEl.title = label;
    fullEl.setAttribute('aria-label', label);
    fullEl.setAttribute('aria-pressed', on);
    if (!on) weFull = false;
  }
  fullEl.hidden = !(document.fullscreenEnabled || document.webkitFullscreenEnabled);
  fullPaint();
  fullEl.onclick = () => {
    const de = document.documentElement;
    if (fsEl()) (document.exitFullscreen || document.webkitExitFullscreen)?.call(document)?.catch?.(() => {});
    else { weFull = true; (de.requestFullscreen || de.webkitRequestFullscreen)?.call(de, { navigationUI: 'hide' })?.catch?.(() => { weFull = false; }); }
  };
  document.addEventListener('fullscreenchange', fullPaint);
  document.addEventListener('webkitfullscreenchange', fullPaint);
  /*
   * Rời phòng: hỏi lại trước (bấm nhầm ✕ hay Esc thì mất chỗ ngồi, lượt chơi ở trường quay). "Ở lại" là nút sẵn chọn;
   * Esc / chạm ra ngoài hộp cũng là ở lại.
   */
  root.insertAdjacentHTML('beforeend', `<div class="ch-leave" role="alertdialog" aria-modal="true" aria-labelledby="ch-leave-t" aria-describedby="ch-leave-d" hidden>
    <div class="ch-leave-box"><span class="ch-leave-ic">${icon('door')}</span>
      <b id="ch-leave-t">${t(TX.leave)}?</b><p id="ch-leave-d"></p>
      <div class="ch-leave-btns"><button type="button" class="ch-sh-btn" data-leave="stay">${t('Ở lại')}</button>
        <button type="button" class="ch-sh-btn is-main" data-leave="go">${t('Rời đi')}</button></div></div></div>`);
  const leaveEl = root.querySelector('.ch-leave');
  function askLeave() {
    if (!leaveEl.hidden) return;
    const playing = !!quizOnline?.playing || !!quizOnline?.queued;
    leaveEl.querySelector('p').textContent = playing ? t('Bạn đang trong lượt chơi hay hàng chờ. Rời đi thì lượt của bạn dừng lại.')
      : studioSite ? t('Bạn sẽ rời trường quay, ghế của bạn được nhường cho người khác.')
        : t('Bạn sẽ rời khỏi đây, mọi người không còn thấy bạn nữa.');
    leaveEl.hidden = false;
    keys?.clear?.();
    leaveEl.querySelector('[data-leave="stay"]').focus();
  }
  const stayHere = () => { leaveEl.hidden = true; };
  leaveEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-leave]');
    if (b?.dataset.leave === 'go') { leaveEl.hidden = true; onBack(); }
    else if (b || e.target === leaveEl) stayHere();
  });
  let gone = false, msgTimer = 0, paused = false, shrines = null, night = null, fountains = null, beams = null, plaques = null, motes = null, crypt = null, fairy = null, studio = null, quizDev = null, quizOnline = null;
  const say = (text, ms = 4000) => {
    msgEl.textContent = text;
    msgEl.classList.add('is-on');
    clearTimeout(msgTimer);
    if (ms) msgTimer = setTimeout(() => msgEl.classList.remove('is-on'), ms);
  };

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', logarithmicDepthBuffer: S.far > 1000 });
  // điện thoại: ít điểm ảnh hơn và bản đồ bóng nhỏ hơn để giữ khung hình đều (giật hình thì điều khiển cũng khó)
  const phone = matchMedia('(pointer: coarse)').matches;
  // độ nét tự điều chỉnh: điện thoại bắt đầu ở mật độ điểm ảnh thật (tối đa 2, trước đây khoá 1,25 nên trông mờ),
  // khung hình chậm (< ~40 hình/giây kéo dài) thì hạ từng nấc 0,25 xuống tối thiểu 1, chạy dư sức thì nâng dần lại
  // Màn hình mật độ cao (≥ 2,5) không xuống dưới 1,5: ở 1 cả khán phòng vỡ hạt (người dùng 2026-11-05).
  // Mấy giây đầu sau khi tải / đổi khu (dựng shader, giải nén, mặc đồ cho cả khán phòng) không tính: trước đây chúng
  // kéo độ nét xuống 1 ngay lúc vào rồi kẹt ở đó dù máy chạy mượt.
  const DPR_MAX = Math.min(devicePixelRatio || 1, 2), DPR_MIN = Math.min(DPR_MAX, (devicePixelRatio || 1) >= 2.5 ? 1.5 : 1);
  let dpr = DPR_MAX, dprAvg = 1 / 60, dprWait = 6, dprUpAt = 0;
  renderer.setPixelRatio(dpr);
  const dprHold = (s = 5) => { dprWait = Math.max(dprWait, s); dprAvg = 1 / 60; };
  const dprTick = (raw) => {
    // trường quay: camera đứng yên, không ai đi, cảnh nhẹ: luôn vẽ đủ nét (đổi lấy vài hình/giây không đáng)
    if (Z.fixedCam) {
      const full = Math.min(devicePixelRatio || 1, 3);
      if (dpr !== full) { dpr = full; renderer.setPixelRatio(dpr); }
      return;
    }
    if (raw > 0.25) return; // thẻ bị ẩn / vừa tải: không tính
    dprWait -= raw; dprUpAt -= raw;
    if (dprWait > 0) return;
    dprAvg += (raw - dprAvg) * 0.03;
    if (dprAvg > 1 / 32 && dpr > DPR_MIN) {
      dpr = Math.max(DPR_MIN, dpr - 0.25);
      dprWait = 3; dprUpAt = 8; // vừa hạ thì chờ rồi mới thử nâng, tránh đổi qua đổi lại
    } else if (dprAvg < 1 / 50 && dpr < DPR_MAX && dprUpAt <= 0) {
      dpr = Math.min(DPR_MAX, dpr + 0.25);
      dprWait = 4;
    } else return;
    renderer.setPixelRatio(dpr);
    dprAvg = 1 / 50;
  };
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe9b9a0);
  // near 0,25 m: camera không bao giờ gần hơn 1,3 m tới nhân vật; độ chính xác chiều sâu ở xa tốt gấp 2,5 lần 0,1 m,
  // nên các lớp trang trí cách tường vài mm (viền vòm, ô cửa tối) không nháy khi nhìn từ cuối lòng nhà thờ
  const camera = new THREE.PerspectiveCamera(55, 1, 0.25, S.far);
  const hemi = new THREE.HemisphereLight(0xfff3e2, 0x7a6450, 2.1);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffe2c4, 1.3);
  const SUN = new THREE.Vector3(...Z.sun);
  sun.position.copy(SUN);
  scene.add(sun);
  if (V2) {
    // ánh phản chiếu chung: không có nó, vàng / đồng (kim loại) trông đen thui
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.45;
    pmrem.dispose();
    // bóng đổ của cây, người và tường: khung bóng 50 m bám theo người chơi (xem vòng lặp)
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    sun.castShadow = true;
    sun.shadow.mapSize.setScalar(phone ? 1024 : 2048);
    Object.assign(sun.shadow.camera, { left: -25, right: 25, top: 25, bottom: -25, near: 1, far: 120 });
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.03;
    scene.add(sun.target);
  }
  const resize = () => {
    const w = root.clientWidth, h = root.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w < h ? 70 : 55;
    camera.updateProjectionMatrix();
  };
  // trời, đèn, kính màu theo giờ Việt Nam (hoặc giờ người xem chọn); dịp lễ (Giáng Sinh…) trong sky.js EVENTS
  const skyCtl = makeSky({ renderer, scene, hemi, sun, SUN });
  const ro = new ResizeObserver(resize);
  ro.observe(root);
  resize();

  const loader = new GLTFLoader();
  loader.setDRACOLoader(new DRACOLoader().setDecoderPath(BASE + 'draco/'));
  const world = { actors: [], others: [], player: null, grid: null, layout: null, seats: [], pick: [], places: [] };
  let chars = null;
  const shared = {}; // vật liệu tượng ảnh dùng chung (mỗi ảnh một vật liệu, hàng cột lặp lại nhiều lần)
  // màn chờ lần đầu: thanh tiến độ theo số byte đã tải của các tệp lớn (khu, nhân vật); chưa biết tổng thì chạy vệt sáng
  const loadEl = root.querySelector('.ch-load'), loadBar = loadEl.querySelector('.ch-load-bar i'), loadPct = loadEl.querySelector('.ch-load-msg b');
  const got = new Map();
  function progress(key) {
    return (e) => {
      if (loadEl.classList.contains('is-done')) return;
      got.set(key, [e.loaded, e.total || 0]);
      let a = 0, b = 0;
      for (const [l, n] of got.values()) if (n) { a += Math.min(l, n); b += n; }
      if (!b) return;
      const f = a / b;
      loadEl.classList.add('is-known');
      loadBar.style.transform = `scaleX(${f.toFixed(3)})`;
      loadPct.textContent = `${Math.floor(f * 100)}%`;
    };
  }
  // khu đã tải / đang tải: id → Promise<{ layout, gltf }>, dùng gần nhất đứng cuối
  const zoneCache = new Map();
  function loadZone(id) {
    if (zoneCache.has(id)) { const p = zoneCache.get(id); zoneCache.delete(id); zoneCache.set(id, p); return p; }
    const z = zoneOf(id);
    const p = Promise.all([fetch(BASE + z.layout).then(r => r.json()), loader.loadAsync(BASE + z.glb, progress(z.glb))])
      .then(([layout, gltf]) => ({ layout, gltf }));
    p.catch(() => zoneCache.delete(id));
    zoneCache.set(id, p);
    // bỏ khu dùng lâu nhất (trừ khu đang ở) cho nhẹ bộ nhớ
    for (const [k, old] of zoneCache) {
      if (zoneCache.size <= ZONE_KEEP) break;
      if (k === zoneId || k === id) continue;
      zoneCache.delete(k);
      old.then(({ gltf }) => disposeTree(gltf.scene)).catch(() => {});
    }
    return p;
  }
  function disposeTree(o) {
    o.traverse(m => {
      m.geometry?.dispose();
      for (const mt of [].concat(m.material || [])) { for (const v of Object.values(mt)) if (v?.isTexture) v.dispose(); mt.dispose(); }
    });
  }
  const sparks = [];
  const bag = makeBag({ films });   // túi đồ: Hạt giống, món đã có, sổ hành hương, bộ đồ đang mặc (bag.js, wardrobe.js)
  let myLook = bag.look(), lastFly = myLook.fly || 'wings', lastPet = myLook.pet || '', extrasKit = null;
  // Tủ đồ: chọn đồ là mặc lên ma-nơ-canh (bản nháp draft), chỉ Áp dụng mới mặc thật, lưu và báo người cùng phòng
  let draft = null;
  const closet = makeCloset({
    root, bag, stamps: STAMPS, films, look: () => draft || myLook, say: (text, ms) => say(text, ms),
    wear: (l) => { draft = cleanLook(l); preview?.dress(draft); },
    dirty: () => !!draft && encodeLook(draft) !== encodeLook(myLook),
    apply: () => { if (draft) wearLook(draft); draft = null; },
    revert: () => { draft = null; preview?.dress(myLook); },
    onOpen: () => { shop.close(); stillForPanel(); previewOpen(); },
    suggestNick: () => checkNick(shortName(getCurrentUser()?.name || '')).value,
    onNick: (name) => { net?.rename?.(name); quizOnline?.rename?.(name); },
    onClose: () => {
      if (draft && encodeLook(draft) !== encodeLook(myLook)) say(t('Bộ đồ chưa áp dụng nên vẫn giữ bộ cũ.'), 2600);
      draft = null;
      panelClosed();
    },
  });
  // danh mục Vật phẩm (shop.js): ảnh từng món chụp từ mô hình (thumbs.js, có khi nhân vật đã tải), mặc thử chỉ trên máy mình
  let thumbs = null;
  const shop = makeShop({
    root, bag, thumbs, look: () => myLook, wear: (l) => wearLook(l), say: (text, ms) => say(text, ms),
    tryOn: (l) => preview?.dress(l || myLook),
    onSeeds: () => closet.open('seeds'),
    onOpen: () => { closet.close(); stillForPanel(); previewOpen(); },
    onClose: () => panelClosed(),
  });
  /*
   * Nhân vật xem trước (preview.js): mở Tủ đồ / Vật phẩm thì một avatar riêng đứng hẳn ra trước màn hình, trên lớp phủ của phần
   * màn hình bảng không che; nhân vật thật ở nguyên chỗ (ghế, sàn) với bộ đồ thật. Thử đồ chỉ mặc lên avatar xem trước, nhân vật
   * thật chỉ đổi khi Mặc / Áp dụng (wearLook). Kéo trên lớp phủ chỉ xoay avatar xem trước.
   */
  let preview = null;
  function previewOpen() {
    if (!chars?.avatar) return;
    preview ||= makePreview({ root, avatar: chars.avatar, kit: extrasKit, onMaterial: ownMat, calm,
      hint: `${icon('turnR')}<span>${t('Kéo để xoay')}</span>` });
    preview.open(draft || myLook);
  }
  // đóng một bảng: còn bảng kia mở (đang chuyển Tủ đồ ↔ Vật phẩm) thì giữ nhân vật xem trước
  function panelClosed() { queueMicrotask(() => { if (!closet.isOpen && !shop.isOpen) preview?.close(); }); }
  function stillForPanel() { const me = world.player; if (me) { me.route = []; me.vel?.set(0, 0); } keys.clear(); goMenu(false); }
  bag.on(() => { paintShopBadge(); refresh(); });
  // ba mẹ vừa góp bánh nhận hạt (donate.js bắn kt:seeds khi đơn đã trả): cộng vào túi
  const onSeeds = () => { const n = bag.claim(); if (n) seedPop(n); };
  addEventListener('kt:seeds', onSeeds);
  function paintShopBadge() {
    const n = shop.ready();
    for (const b of root.querySelectorAll('[data-act="shop"] .ch-badge, .ch-views-shop .ch-badge')) {
      b.hidden = !n;
      b.textContent = n > 9 ? '9+' : n;
    }
  }
  // Hạt giống vừa kiếm được: một dấu +n nhỏ cạnh thanh tên nơi
  let popTimer = 0;
  function seedPop(n) {
    const el = root.querySelector('.ch-seedpop');
    el.innerHTML = `${icon('star')}+${n}`;
    el.classList.remove('is-on');
    void el.offsetWidth;
    el.classList.add('is-on');
    clearTimeout(popTimer);
    popTimer = setTimeout(() => el.classList.remove('is-on'), 2200);
  }
  const goodDeed = () => { if (bag.act()) seedPop(1); };
  function stampOf(id, name) {
    if (studioSite) return;   // trường quay không đóng dấu sổ hành hương
    if (!bag.stamp(id)) return;
    seedPop(5);
    if (name) setTimeout(() => !gone && say(`${t('Sổ hành hương có thêm con dấu')}: ${name}`, 3200), 3300);
  }
  if (import.meta.env.DEV) window.__church = { world, bag, get show() { return studioShow; }, wearLook: (o) => wearLook({ ...myLook, ...o }), get look() { return myLook; }, closet: (tab) => closet.open(tab), shop: (id) => shop.open(id), wings: (on = true) => wearWings(on), fly: () => takeOff(), land: () => land(), roof: (x, z) => roofAt(x, z), slots: (x, z) => slotsAt(x, z).toString(2), tap: (x, z) => tap(new THREE.Vector3(x, 0, z)), get cam() { const d = camera.getWorldDirection(new THREE.Vector3()); return Math.atan2(d.x, d.z); }, snapCam: () => placeCamera(0, true), screen: (url) => (url ? studio?.play(url) : studio?.stop()), cue: (m) => studio?.cue(m), board: (st) => studio?.board(st), ladder: (m) => studio?.ladder(m), result: (r) => studio?.result(r), cheque: (n, nick) => studio?.cheque(n, nick), opt: (i) => studio?.showOption(i), get chat() { return chat; }, get boardState() { return studio?.boardState; }, quiz: async (n = 1, phase = 'ask', pick = null) => { const { pickGame } = await import('../quiz/index.js'); const g = (window.__quizGame ||= await pickGame()); const q = g[n - 1]; studio?.board({ ...q, n, phase, pick }); return q; }, shotCam: (p, l, fov) => { shotCam = p ? [p, l] : null; if (fov) { camera.fov = fov; camera.updateProjectionMatrix(); } }, get camState() { return camState; }, pickAt: (px, py) => { const r = canvas.getBoundingClientRect(); ndc.set((px - r.left) / r.width * 2 - 1, -((py - r.top) / r.height) * 2 + 1); ray.setFromCamera(ndc, camera); return ray.intersectObjects(world.pick, false).slice(0, 3).map(h => ({ name: h.object.name, mat: h.object.material.name, p: h.point.toArray().map(v => +v.toFixed(3)), d: +h.distance.toFixed(4) })); } }; // kiểm thử
  Promise.all([
    loadZone(zoneId),
    studioSite ? null : skyCtl.ready(),   // trường quay không có trời (ảnh trời chỉ cho nhà thờ của kinh-thanh)
    ...(studioSite ? PUPILS : KINDS).map(k => loader.loadAsync(`${BASE}characters/${k}.glb`, progress(k))),
    loader.loadAsync(`${BASE}characters/avatar.glb`, progress('avatar')),
  ]).then(([zone, , ...gl]) => {
    if (gone) return;
    const kinds = studioSite ? PUPILS : KINDS;
    chars = Object.fromEntries(kinds.map((k, i) => [k, gl[i]]));
    chars.avatar = gl[kinds.length];   // mình và người online: nhân vật có Tủ đồ (build_wardrobe.py)
    extrasKit = makeExtrasKit(ownMat);
    thumbs = makeThumbs({ avatar: chars.avatar, kit: extrasKit, onMaterial: ownMat });
    shop.setThumbs(thumbs);
    closet.setThumbs(thumbs);
    paintShopBadge();
    for (const g of gl) g.scene.traverse(litByNight);
    makePlayer();
    installZone(zoneId, zone);
    root.querySelector('.ch-load').classList.add('is-done');
    skyCtl.update(camera, world.player.pos);
    paintSkyBtn();
    if (!Z.fixedCam) say(t(TX.hello), 3000);   // trường quay: lời báo ghế của mình (seatMe) thay lời chào
    { const n = bag.visit(); if (n) seedPop(n); }   // điểm danh hôm nay (seeds.js), nếu trang chủ chưa điểm
    // lần đầu (chưa chọn nhân vật, chưa từng chọn đồ): mở Tủ đồ ở thẻ Nhân vật để chọn nhân vật và đặt biệt danh
    if (!bag.base && !bag.saved && !Z.fixedCam && !navigator.webdriver) setTimeout(() => !gone && !closet.isOpen && closet.open('me'), 1400);
    setTimeout(() => !gone && !world.player.seat && !Z.fixedCam && say(square
      ? (touchUI ? t('Kéo bên trái để đi, kéo bên phải để nhìn quanh, chạm vào mặt đất để đi tới đó.')
        : t('WASD để đi, giữ Shift để đi nhanh, kéo chuột để nhìn quanh, bấm vào mặt đất để đi tới đó.'))
      : touchUI ? t('Kéo bên trái để đi, kéo bên phải để nhìn quanh, chạm vào ghế để ngồi.')
        : t('WASD để đi, giữ Shift để đi nhanh, kéo chuột để nhìn quanh, chạm vào ghế để ngồi.'), 7000), 3300);
  }).catch((e) => {
    console.error(e);
    if (gone) return;
    root.querySelector('.ch-load-msg span').textContent = t('Không mở được trường quay. Kiểm tra mạng rồi thử lại.');
    root.querySelector('.ch-load').classList.add('is-error');
  });

  // người (cả cánh) tự sáng thêm một chút theo độ tối của trời: đêm ngoài quảng trường hay trong hầm mộ vẫn thấy rõ mặt, áo
  const charLift = { value: 0 };
  function litByNight(o) {
    for (const m of [].concat(o.material || [])) {
      if (m.userData.charLift) continue;
      m.userData.charLift = true;
      const prev = m.onBeforeCompile, prevKey = m.customProgramCacheKey;   // nối tiếp bản vá khác (occlusion.js)
      m.onBeforeCompile = (sh, r) => {
        prev?.call(m, sh, r);
        sh.uniforms.uCharLift = charLift;
        sh.fragmentShader = sh.fragmentShader
          .replace('#include <common>', '#include <common>\nuniform float uCharLift;')
          .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance += diffuseColor.rgb * uCharLift;');
      };
      m.customProgramCacheKey = () => `${prevKey ? prevKey.call(m) : ''}|charlift`;
      m.needsUpdate = true;
    }
  }

  const ownMat = (m) => litByNight({ material: m });   // bản sao vật liệu riêng một người (Tủ đồ) cũng sáng thêm ban đêm
  /** Mặc bộ đồ lên một người (mình hay người online): mesh, màu, cánh, mây, bạn đồng hành. */
  function dressActor(a, look) {
    if (a.pupil) { a.extras?.set(look); return; }   // học sinh Hyper3D: một khối liền, chưa mặc được đồ Tủ đồ
    applyLook(a, look, ownMat);
    const cloud = flyKind(look.fly) === 'cloud';
    if (!!a.cloud !== cloud) {
      a.cloud = cloud;
      if (/^(hover|soar)$/.test(a.pose)) { const p = a.pose; a.pose = null; a.play(p); }   // đang bay: đổi ngay dáng đứng / dáng bay
    }
    a.wings?.wear(flyKind(look.fly) === 'wings', flyTone(look.fly));
    a.extras?.set(look);
  }
  /** Đổi bộ đồ của mình: mặc ngay, lưu (bag), báo người cùng phòng. Đang bay mà bỏ cánh / mây thì hạ xuống trước. */
  function wearLook(look, { save = true } = {}) {
    const me = world.player, next = cleanLook(look);
    if (me?.fly && !canFly(next)) { land(() => wearLook(next, { save })); return; }
    myLook = next;
    if (myLook.fly) lastFly = myLook.fly;
    if (myLook.pet) lastPet = myLook.pet;
    if (me) dressActor(me, myLook);
    if (preview?.isOpen) preview.dress(myLook);
    if (save) bag.saveLook(myLook);
    net?.look(shirt, flyKind(myLook.fly) === 'wings', encodeLook(myLook));
    refresh();
  }
  // người online chưa gửi bộ đồ (bản cũ): áo polo theo màu áo cũ, cánh nếu đeo
  const legacyLook = (c, w) => ({ ...DEFAULT_LOOK, topC: SHIRT_PAL[c] ?? DEFAULT_LOOK.topC, fly: w ? 'wings' : '' });
  const ground = (x, z) => world.grid?.heightAt(x, z) || 0;

  /** Mình: nhân vật có Tủ đồ, giữ nguyên qua các khu. */
  function makePlayer() {
    const kind = studioSite ? pupilOf(bag.nick) : 'avatar';
    const me = new Actor(chars[kind], kind);
    me.pupil = kind !== 'avatar';
    world.actors.push(me);
    scene.add(me.root);
    me.play('idle', { fade: 0 });
    me.max = WALK;
    me.turn = 10;
    me.vel = new THREE.Vector2();
    // cánh gắn sẵn vào xương lưng (tư thế gốc, trước khi chạy hoạt ảnh), chỉ hiện khi đeo
    me.wings = makeWings({ calm });
    me.wings.attach(me);
    me.root.traverse(litByNight);
    me.extras = makeExtras(me, { scene, kit: extrasKit, calm, ground });
    if (!bag.saved) myLook = { ...myLook, topC: SHIRT_PAL[shirt] ?? myLook.topC };   // chưa từng chọn đồ: màu áo của máy này như trước
    dressActor(me, myLook);
    world.player = me;
    refresh();
  }

  /** Thay cảnh bằng khu `id` (đã tải), đặt mình ở `dest` ({ shrine } | { pos, heading } | null: spawn của khu). */
  function installZone(id, { layout, gltf }, dest = null) {
    dprHold(6);
    const me = world.player;
    // gỡ khu cũ: cảnh, các thánh, người giả
    if (world.zoneRoot) scene.remove(world.zoneRoot);
    shrines?.dispose();
    shrines = null;
    for (const a of [...world.others]) removeActor(a);
    remotes.clear();
    zoneId = id;
    Z = zoneOf(id);
    { const st = STAMPS.find(x => x.id === id); if (st) stampOf(id, getLang() === 'en' ? st.en || st.name : st.name); }
    world.layout = layout;
    world.grid = makeGrid(layout.navGrid);
    const church = gltf.scene;
    if (!church.userData.pick) {
      // lần đầu dùng khu này: bóng đổ, mặt ảnh thật không qua đèn, tượng ảnh, danh sách vật chạm được
      const pick = [], boards = [];
      church.traverse(o => {
        if (o.name === 'navmesh') o.visible = false;
        else if (o.isMesh) {
          if (o.material?.aoMap && !o.geometry.attributes[o.material.aoMap.channel ? `uv${o.material.aoMap.channel}` : 'uv']) {
            // vật liệu dùng chung với khối nhà thờ đã nướng AO, nhưng mesh này không có UV cho ảnh AO (tượng Đức Mẹ):
            // bỏ AO, kẻo nó lấy đại một mảng tối của nhà thờ
            const m0 = o.material;
            o.material = shared['noao:' + m0.name] ||= Object.assign(m0.clone(), { aoMap: null });
          }
          const m = o.material;
          // Vatican: ảnh đá chụp thật tô lại kiểu tranh, tươi ấm như nhà thờ Đức Bà (paint.js)
          if (/^(vat|vin)_/.test(m?.name || '')) paintMaterial(m);
          if (/^vin_unlit_/.test(m?.name || '')) {
            o.material = new THREE.MeshBasicMaterial({ name: m.name, map: m.map, side: m.side, transparent: m.transparent, alphaTest: m.alphaTest });
            m.dispose();
          } else if (/^vin_(floor|marble_|vault_|gold|bronze)/.test(m?.name || '') && !m.userData.dull) {
            // đá bóng (nhám 0,25–0,35) soi nguyên các ô đèn trắng của RoomEnvironment thành vệt loá: mờ bớt
            m.userData.dull = true;
            m.roughness = Math.max(m.roughness, /gold|bronze/.test(m.name) ? 0.55 : 0.7);
            m.envMapIntensity = /gold|bronze/.test(m.name) ? 0.6 : 0.35;
          } else if (m?.name === 'vat_sculpt_marble') {
            // tượng tạc thật (thánh Phê-rô, blender/statures): khối nếp áo nằm trong hình, nên nhận nắng và bóng của chính nó
            // như đá thật, không tự sáng (tự sáng làm đá trắng cháy mất nếp áo dưới nắng quảng trường)
            if (!m.userData.lit) {
              m.userData.lit = true;
              m.envMapIntensity = 0.5;
            }
            o.castShadow = V2;
            o.receiveShadow = V2;
            pick.push(o);
            return;
          } else if (/^(sg|vat)_(statue|face)_/.test(m?.name || '')) {
            // tượng dựng khối (Đức Mẹ Hoà Bình, thánh Phê-rô trên quảng trường: statue_figures.py): đá trắng tự sáng nhẹ,
            // không nhận bóng của chính nó (bóng dưới mũi, cằm trông như râu)
            if (!m.userData.lit) {
              m.userData.lit = true;
              // ngoài trời (vat_: nắng quảng trường) tự sáng ít hơn, kẻo đá trắng cháy mất khối
              const k = /^vat_/.test(m.name) ? 0.4 : 1;
              m.emissive.copy(m.color).multiplyScalar((/statue/.test(m.name) ? 0.45 : 0.25) * k);
              m.envMapIntensity = Math.max(m.envMapIntensity ?? 1, 1.2);
            }
            o.castShadow = V2;
            o.receiveShadow = false;
            pick.push(o);
            return;
          } else if (/^ph_/.test(m?.name || '')) {
            // tượng là ảnh thật đã tách nền (tools/statue_cutouts.py): ánh sáng có sẵn trong ảnh, nền trong suốt cắt bỏ
            o.material = shared[m.name] ||= new THREE.MeshBasicMaterial({ name: m.name, map: m.map, side: THREE.DoubleSide, alphaTest: 0.5 });
            if (o.material !== m) m.dispose();
            o.castShadow = false;
            // bb_*: tượng đứng giữa trời, quay theo camera quanh trục đứng
            for (let q = o; q && q !== church; q = q.parent) if (/^bb_/.test(q.name)) { boards.push(q); break; }
            return;
          }
          // cây, bụi hoa (bản 2): không chặn chạm vào sàn phía sau tán lá
          let plant = false;
          for (let q = o; q; q = q.parent) if (q.userData?.v2_plant) plant = true;
          if (V2) { o.castShadow = !Z.noShadow?.test(o.name); o.receiveShadow = !plant; }
          if (!plant) pick.push(o);
        }
      });
      church.userData.pick = pick;
      church.userData.boards = boards;
    }
    world.boards = church.userData.boards;
    world.pick = church.userData.pick.slice();
    roofMap = null;
    slotMap = null;
    scene.add(church);
    world.zoneRoot = church;
    skyCtl.setZone(Z, church);
    // đèn pha, tượng rọi sáng, đèn đồng quanh tháp đá về đêm
    night?.dispose();
    night = makeNight({ scene, root: church, zone: id, ground: layout.navGrid.height ? (x, z) => world.grid.heightAt(x, z) : null });
    // bóng nháy giăng quanh nhà thờ Đức Bà khi trời tối
    fairy?.dispose();
    fairy = makeFairyLights({ scene, zone: id, root: church, calm });
    // đài phun nước: mặt bồn gợn sóng, màn nước chảy, giọt bắn (khu không có đài thì null)
    fountains?.dispose();
    fountains = makeFountains({ scene, root: church, renderer });
    // trong Đền thờ: luồng nắng qua cửa sổ tầng trống vòm, mắt đèn lồng, cửa sổ trên cửa chính (khu khác thì null)
    beams?.dispose();
    beams = makeBeams({ scene, root: church, zone: id, calm, walkable: world.grid.walkable });
    // biển đồng khắc lời các thánh trước các tượng trong Đền thờ (plaques.js)
    plaques?.dispose();
    plaques = makePlaques({ scene, root: church, zone: id });
    // bụi sáng lơ lửng trong lòng nhà thờ Sài Gòn (motes.js; trường quay không có)
    motes?.dispose();
    motes = makeMotes({ scene, zone: id, calm });
    // hầm mộ: gạch đá, lửa đuốc và nến, ánh lửa, biển tên các hành lang (crypt.js)
    crypt?.dispose();
    crypt = makeCrypt({ scene, root: church, zone: id, layout, calm, phone });
    // trường quay: màn hình lớn, đèn sân khấu, luồng sáng (studio.js); ?video=<url> chiếu một video lên màn hình
    studio?.dispose();
    quizDev?.dispose();
    quizDev = null;
    quizOnline?.dispose();
    quizOnline = null;
    studio = makeStudio({ scene, root: church, zone: id, layout, calm, renderer, ui: root, onApplause: applaud });
    if (studio) {
      world.pick.push(studio.screen);
      const v = new URLSearchParams(location.search).get('video');
      if (v) studio.play(v);
      // bản dev: bảng thử một ván Đố vui 15 câu trên màn hình (quizDev.js; chưa có MC)
      // (đã nối máy chủ phòng thì thôi: đố vui nhiều người, quizOnline.js)
      // Ai tài năng nhất: chưa có máy chủ phòng (VITE_ROOMS_URL) thì chơi một mình với MC (solo); bản dev vẫn là bảng thử đầy đủ
      if (import.meta.env.DEV || !ONLINE) import('./quizDev.js').then(({ makeQuizDev }) => { if (!gone && studio && !quizDev && !quizOnline) quizDev = makeQuizDev({ root, studio, show: studioShow, solo: !import.meta.env.DEV || /[?&]solo(&|$)/.test(location.search), nick: () => bag.nick, onRight: () => { if (bag.quizRight()) seedPop(1); } }); });
    }
    const rand = rng(20261103);
    const kind = () => OTHERS[Math.floor(rand() * OTHERS.length)];
    const ground = layout.navGrid.height ? (x, z) => world.grid.heightAt(x, z) : null;
    const add = (k) => {
      const a = new Actor(chars[k], k);
      a.ground = ground;
      world.actors.push(a);
      scene.add(a.root);
      return a;
    };
    world.seats = layout.seats.map(s => ({ ...s, taken: null }));
    world.entries = Object.fromEntries(layout.entries.map(e => [e.id, e.pos]));
    // trường quay: ghế chờ của người chơi kế tiếp (studio.js), đứng trước ghế là lối vào
    for (const w of studio?.waitSeats || []) { world.seats.push({ ...w, taken: null }); world.entries[w.entry] = w.front; }
    // ghế MC / ghế nóng: chỗ đứng ngay trước ghế (giữa ghế và bàn điều khiển) là lane, lối vào thẳng phía trước sân khấu,
    // nên đi tới là thẳng vào, quay một góc vuông rồi lùi vào ghế
    for (const s of world.seats) {
      if (!s.lane && (s.role === 'mc' || s.role === 'player')) {
        const h = s.heading ?? 0, fx = s.pos[0] - Math.sin(h) * 0.42, fz = s.pos[2] - Math.cos(h) * 0.42;
        s.lane = [fx, fz];
        const e = world.entries[s.entry];
        if (e) world.entries[s.entry] = [fx, e[1], e[2]];
      }
    }
    // người ngồi sẵn: nhiều ở các hàng giữa, ít ở hàng đầu và cuối (Vatican: không có người giả); ghế MC / người chơi để trống
    const free = world.seats.filter(s => !s.role).sort(() => rand() - 0.5);
    for (const seat of Z.people ? free.slice(0, Z.seated ?? SEATED) : []) {
      const a = add(kind());
      sitAt(a, seat, { end: true });
      a.mixer.update(0);
      a.live = false;
      world.others.push(a);
    }
    // hai người quỳ trước cung thánh
    for (const k of Z.people ? layout.kneel.slice(1, 3) : []) {
      const a = add(kind());
      a.pos.set(k.pos[0], 0, k.pos[2]);
      a.play('pray', { fade: 0 });
      a.mixer.setTime(rand() * 3);
      world.others.push(a);
    }
    // vài người đi lại chậm rãi giữa các điểm ngẫu nhiên
    for (let n = 0; n < (Z.people ? Z.walkers ?? WALKERS : 0); n++) {
      const a = add(kind());
      const [x, z] = randomSpot(rand);
      a.pos.set(x, 0, z);
      a.heading = rand() * Math.PI * 2;
      a.play('idle', { fade: 0 });
      a.wait = 1 + rand() * 6;
      a.wander = true;
      world.others.push(a);
    }
    // trường quay: MC (nam tu sĩ) ngồi ghế MC, quay mặt về ghế nóng
    const hostSeat = Z.host && world.seats.find(s => s.role === 'mc');
    if (hostSeat) {
      // Ai tài năng nhất: MC là thầy giáo dựng từ avatar (áo sơ mi trắng, cà vạt đỏ, kính: wardrobe.js HOST_LOOK)
      const a = add('avatar');
      dressActor(a, cleanLook(HOST_LOOK));
      a.root.scale.setScalar(HOST_SCALE);   // thầy giáo người lớn: avatar (dáng trẻ em) to hơn, đầu nhô khỏi bàn MC
      a.root.traverse(litByNight);
      sitAt(a, hostSeat, { end: true });
      a.mixer.update(0);
      a.live = false;
      a.host = true;
      world.others.push(a);
    }
    me.ground = ground;
    // các thánh: giá nến, đốm sáng, cổng sang khu khác (shrines.js, dữ liệu saints.js)
    if (films) {
      world.exhibits = exhibitOf(id, films.all(), layout);
      shrines = makeShrines({ scene, root, zone: id, grid: world.grid, layout, films, calm, loader, base: BASE, extra: world.exhibits, camera, canvas, act: {
        walkTo: (x, z, then) => goTo(x, z, then),
        me: () => world.player,
        face: (heading) => { world.player.heading = heading; camState.align = true; refresh(); },
        pray: (heading) => grounded(() => { me.heading = heading; me.route = []; me.play('pray'); refresh(); }),
        pause: (on) => { paused = on; keys.clear(); },
        say,
        did: (kind, def) => { goodDeed(); stampOf(def.id, getLang() === 'en' ? def.en?.name || def.name : def.name); },
        goZone: (z, arrive) => travel(z, arrive ? { pos: [arrive[0], 0, arrive[1]], heading: arrive[2] } : null),
        pickAdd: (list) => world.pick.push(...list),
        pickRemove: (list) => { world.pick = world.pick.filter(o => !list.includes(o)); },
      } });
      world.pick.push(...shrines.pickables);
    }
    // nơi tới: chỗ thánh, toạ độ, hoặc spawn
    const at = (dest?.shrine && shrines?.placeOf(dest.shrine)) || (dest?.pos ? dest : { pos: layout.spawn, heading: 0, pitch: 0 });
    titleEl.textContent = t(Z.name || TX.name);
    buildMenu();
    teleport(at, { quiet: !dest?.shrine });
    root.classList.toggle('is-fixed', !!Z.fixedCam);
    viewsEl.hidden = !Z.fixedCam;
    if (Z.fixedCam) { camPaint(); camShow(); }
    if (Z.fixedCam) enterStudio();
    occludeAll();
    // vào phòng của khu này (rời phòng khu cũ); người thật trong phòng hiện ra khi máy chủ chào lại
    sent = null;
    net?.join(id === 'studio' ? `studio-g${quizGrade()}` : id, myState);
    if (net) holdUpdates(true);   // đang trong phòng có người thật: không bật ra vì bản mới, rời phòng mới cập nhật
  }

  // ---- khu camera cố định (trường quay): mình ngồi một ghế khán giả, vòng sáng trên đầu đánh dấu chỗ của mình ----
  // tên ghế: hàng A gần sân khấu nhất, số ghế 1..24 từ trái sang phải nhìn từ khán đài
  const seatName = (s) => `${String.fromCharCode(64 + s.row)}${s.block === 1 ? 13 - s.slot : 12 + s.slot}`;
  // ghế đẹp còn trống: các hàng giữa, gần lối giữa, thêm chút ngẫu nhiên để mỗi lần vào một chỗ khác
  function bestSeat() {
    const me = world.player;
    let best = Infinity, seat = null;
    for (const s of world.seats) {
      if (s.role || (s.taken && s.taken !== me)) continue;
      const score = Math.abs(s.row - 4) + (s.slot - 1) * 0.3 + Math.random() * 1.5;
      if (score < best) { best = score; seat = s; }
    }
    return seat;
  }
  // luồng vào trường quay: màn tải → sơ đồ chọn chỗ (bước vào, chưa ngồi, chưa thấy mình) với ghế gợi ý chọn sẵn (ghế lần
  // trước nếu còn trống, không thì bestSeat) → "Vào ngồi" → ngồi, vòng vàng, lời báo. Ghế bị người khác lấy trước (máy chủ
  // báo 'no') thì quay lại bước này. Bản kiểm thử tự động (webdriver) ngồi luôn, trừ khi có ?ghe=chon.
  const SEAT_KEY = 'kt-studio-seat';
  function enterStudio(note = '') {
    const me = world.player;
    if (navigator.webdriver && !/[?&]ghe=chon/.test(location.search)) { seatMe(); return; }
    me.root.visible = false;
    seatEl.hidden = true;
    meRing.visible = false;
    let last = null;
    try { last = world.seats.find(s => s.id === localStorage.getItem(SEAT_KEY)); } catch { /* bộ nhớ bị chặn */ }
    const seat = last && !last.role && !last.taken ? last : bestSeat();
    if (!seat) { seatMe(); return; }
    mapOpen(true, { entry: true, seat, note });
  }
  // chữ "Ghế D11 · số người đã ngồi / số ghế": vẽ lại mỗi khi có người ngồi xuống, đổi ghế, rời phòng (trước chỉ tính một lần
  // lúc mình ngồi, người vào sau không làm số đổi)
  // góc từ ghế (fixedCam, seatView): mắt cao 1,15 m trên ghế, nhích 0,25 m về phía sân khấu; seatCam: đang dùng góc ấy (đổi
  // ghế thì camera lướt theo, chọn góc khác thì thôi)
  const SEAT_EYE = 1.15, SEAT_FWD = 0.25;
  let seatCam = true;   // góc mặc định (fixedCam.presets[0]) là góc từ ghế
  function paintSeatChip() {
    if (!Z?.fixedCam || seatEl.hidden || !world.player) return;
    const me = world.player, mine = me.seat && !me.seat.role ? me.seat : me.home || null;
    const list = world.seats.filter(s => !s.role);
    seatEl.textContent = `${mine ? `${t('Ghế')} ${seatName(mine)} · ` : ''}${list.filter(s => s.taken).length}/${list.length}`;
  }
  function seatMe(seat = null) {
    const me = world.player;
    seat ||= bestSeat();
    me.root.visible = true;
    if (!seat) {
      seatEl.hidden = true;
      say(t('Phòng đã kín chỗ, bạn đứng xem ở cuối phòng.'), 5000);
      return;
    }
    if (me.seat) { me.seat.taken = null; me.seat = null; tp = (tp + 1) & 255; }   // đổi ghế: người khác thấy mình sang thẳng ghế mới
    try { localStorage.setItem(SEAT_KEY, seat.id); } catch { /* bộ nhớ bị chặn */ }
    sitAt(me, seat, { end: true });
    me.mixer.update(0);
    net?.sit(seat.id);
    seatEl.hidden = false;
    paintSeatChip();
    seatEl.title = t('Ghế của bạn · số người đã ngồi / số ghế');
    spark(seat.pos[0], seat.pos[2]);
    meRing.visible = true;
    if (studio && !studio.boardState) quizSfx.crowd(true);   // trường quay chưa hỏi: khán phòng rì rầm
    say(`${t('Bạn ngồi ghế')} ${seatName(seat)}. ${t('Bấm nút chọn ghế ở góc dưới để đổi chỗ.')}`, 5000);
    if (!mapEl.hidden) mapPaint();
    if (seatCam) { const v = seatView(); if (v) camGo(v); }
  }
  // sơ đồ chọn ghế như đặt vé xem phim: sân khấu ở trên, hàng A gần sân khấu, số 1–24 trái sang phải, lối đi giữa ghế 12 và 13;
  // chạm một ghế trống để chọn (sáng vàng) rồi "Ngồi ghế này"; ghế đã có người (người giả, người thật) không chọn được
  const mapEl = root.querySelector('.ch-seatmap'), mapGrid = mapEl.querySelector('.ch-sm-grid'), mapBtn = root.querySelector('.ch-views-seat');
  const mapOk = mapEl.querySelector('.ch-sm-ok'), mapPick = mapEl.querySelector('.ch-sm-pick'), mapCount = mapEl.querySelector('.ch-sm-count');
  const mapX = mapEl.querySelector('.ch-sm-x'), mapSub = mapEl.querySelector('.ch-sm-sub'), mapTitle = mapEl.querySelector('.ch-sm-title');
  let picked = null, mapTimer = 0, mapEntry = false;
  const seatNo = (s) => (s.block === 1 ? 13 - s.slot : 12 + s.slot);
  // lời báo vàng ngay trên sơ đồ (lời nhắn giữa màn bị lớp nền tối của sơ đồ che)
  function mapWarn() {
    quizSfx.deny();
    mapSub.textContent = t('Ghế này vừa có người ngồi trước, bạn chọn ghế khác.');
    mapSub.classList.add('is-warn');
    mapSub.hidden = false;
  }
  function mapPaint() {
    const me = world.player, list = world.seats.filter(s => !s.role);
    if (!list.length) return;
    const rows = Math.max(...list.map(s => s.row));
    if (picked && picked.taken && picked.taken !== me) { picked = null; mapWarn(); }   // ghế đang chọn vừa có người ngồi
    // dựng các nút một lần cho mỗi khu, sau đó chỉ đổi trạng thái (vẽ lại cả lưới sẽ nuốt mất cú chạm đang dở)
    if (mapGrid.dataset.zone !== zoneId) {
      const byKey = new Map(list.map(s => [`${s.row}-${seatNo(s)}`, s]));
      let html = '';
      for (let r = 1; r <= rows; r++) {
        const L = String.fromCharCode(64 + r);
        html += `<span class="ch-sm-row">${L}</span>`;
        for (let n = 1; n <= 24; n++) {
          if (n === 13) html += '<span class="ch-sm-aisle"></span>';
          const s = byKey.get(`${r}-${n}`);
          html += s ? `<button type="button" class="ch-sm-seat" data-seat="${s.id}" data-name="${L}${n}" title="${L}${n}"></button>` : '<span></span>';
        }
        html += `<span class="ch-sm-row">${L}</span>`;
      }
      mapGrid.innerHTML = html;
      mapGrid.dataset.zone = zoneId;
    }
    const byId = new Map(list.map(s => [s.id, s]));
    for (const b of mapGrid.querySelectorAll('[data-seat]')) {
      const s = byId.get(b.dataset.seat);
      const mine = s.taken === me, busy = !!s.taken && !mine;
      const cls = `ch-sm-seat ${mine ? 'is-mine' : busy ? 'is-taken' : s === picked ? 'is-pick' : 'is-free'}`;
      if (b.className === cls) continue;
      b.className = cls;
      b.disabled = busy;
      b.setAttribute('aria-pressed', s === picked);
      b.setAttribute('aria-label', `${t('Ghế')} ${b.dataset.name}${mine ? `, ${t('ghế của bạn')}` : busy ? `, ${t('đã có người')}` : ''}`);
    }
    mapCount.textContent = `${list.filter(s => s.taken).length}/${list.length}`;
    mapOk.disabled = !picked;
    mapPick.innerHTML = picked ? `${t(mapEntry ? 'Ghế của bạn' : 'Ghế')} <b>${seatName(picked)}</b>` : me?.seat ? `${t('Bạn đang ngồi')} <b>${seatName(me.seat)}</b>` : t('Chọn một ghế trống');
  }
  // entry: bước chọn chỗ khi mới vào (không đóng được, chưa có ghế), seat: ghế chọn sẵn, note: lời báo đầu
  function mapOpen(on, { entry = false, seat = null, note = '' } = {}) {
    if (!on && mapEntry) return;   // bước vào phòng chỉ xong bằng "Vào ngồi"
    // đang lên sân khấu / ngồi ghế chờ / chơi đố vui: không đổi ghế (chương trình sẽ đưa về ghế cũ)
    if (on && !entry && world.player?.inShow) { say(t('Bạn đang tham gia đố vui, xong lượt mới đổi ghế được.'), 3000); return; }
    mapEl.hidden = !on;
    mapBtn.setAttribute('aria-expanded', on);
    clearInterval(mapTimer);
    picked = seat;
    mapEntry = on && entry;
    mapEl.classList.toggle('is-entry', mapEntry);
    mapX.title = mapX.ariaLabel = t(mapEntry ? TX.leave : 'Đóng');   // bước vào: ✕ là rời trường quay
    mapSub.hidden = !mapEntry;
    if (note) { mapSub.textContent = note; mapSub.classList.add('is-warn'); }
    else { mapSub.textContent = t('Chạm một ghế trống trên sơ đồ, hoặc để chúng tôi chọn giúp, rồi bấm Vào ngồi.'); mapSub.classList.remove('is-warn'); }
    mapTitle.textContent = t(mapEntry ? 'Chọn chỗ ngồi' : 'Chọn ghế');
    mapOk.textContent = t(mapEntry ? 'Vào ngồi' : 'Ngồi ghế này');
    root.querySelector('.ch-views').classList.toggle('is-entry', mapEntry);
    if (!on) return;
    camOpen(false);
    mapPaint();
    mapTimer = setInterval(mapPaint, 1500);   // người khác vừa ngồi / đứng lên
    (mapGrid.querySelector('.is-pick') || mapGrid.querySelector('.is-mine') || mapGrid.querySelector('.is-free'))?.focus({ preventScroll: true });
  }
  mapBtn.onclick = () => mapOpen(mapEl.hidden);
  seatEl.addEventListener('click', () => { if (Z.fixedCam) mapOpen(true); });
  mapX.onclick = () => (mapEntry ? askLeave() : mapOpen(false));
  mapEl.querySelector('.ch-sm-auto').onclick = () => {
    quizSfx.click();
    const s = bestSeat();
    if (!s) { say(t('Phòng đã kín chỗ, bạn đứng xem ở cuối phòng.'), 4000); return; }
    picked = s === world.player?.seat ? null : s;
    mapPaint();
  };
  mapEl.addEventListener('pointerdown', (e) => { if (e.target === mapEl) mapOpen(false); });
  mapGrid.addEventListener('click', (e) => {
    const b = e.target.closest('[data-seat]');
    if (!b || b.disabled) return;
    const s = world.seats.find(x => x.id === b.dataset.seat);
    picked = s === world.player?.seat || (s === picked && !mapEntry) ? null : s;
    quizSfx.click();
    mapPaint();
  });
  mapOk.onclick = () => {
    if (!picked) return;
    if (picked.taken && picked.taken !== world.player) { picked = null; mapWarn(); mapPaint(); return; }
    const s = picked;
    quizSfx.confirm();
    mapEntry = false;
    mapOpen(false);
    seatMe(s);
  };
  // vòng vàng lơ lửng trên đầu mình (nhìn từ xa vẫn thấy mình ngồi đâu)
  const meRing = new THREE.Group();
  meRing.add(new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.028, 8, 40), new THREE.MeshBasicMaterial({ color: 0xffd36b, toneMapped: false })));
  meRing.add(new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.11, 8, 40),
    new THREE.MeshBasicMaterial({ color: 0xffb640, transparent: true, opacity: 0.25, depthWrite: false, blending: THREE.AdditiveBlending })));
  meRing.children.forEach(m => { m.rotation.x = -Math.PI / 2; });
  meRing.visible = false;
  scene.add(meRing);
  function tickRing(t) {
    const me = world.player;
    // trường quay: vòng vẫn theo mình khi đi lên ghế nóng / ghế chờ (studioShow), cao hơn lúc đứng
    if (!meRing.visible || (!me?.seat && !me?.route.length)) { meRing.visible = false; return; }
    meRing.position.set(me.pos.x, me.pos.y + (me.seat ? 1.25 : 2) + (calm ? 0 : 0.05 * Math.sin(t * 2.4)), me.pos.z);
  }
  // nhìn xuyên vật che giữa camera và mình (occlusion.js): mọi vật trong cảnh trừ người; gọi lại mỗi giây cho những vật thêm
  // vào sau (tranh tải khi lại gần, biển đồng chờ phông chữ), vật đã vá thì bỏ qua ngay
  let occT = 0;
  function occludeAll() {
    const people = new Set(world.actors.map(a => a.root));
    for (const o of scene.children) if (!people.has(o)) occludeTree(o);
  }

  /**
   * Đi nhanh: các chỗ đáng xem của khu đang ở (layout.places), rồi mọi chỗ thánh của mọi khu trong site, nhóm theo khu;
   * khu chưa dựng hiện tên với "sắp có", không chọn được.
   */
  function buildMenu() {
    const here = (world.layout.places || []).filter(p => !p.go);
    const row = (label, key, off = false) => `<button type="button" role="menuitem" data-k="${key}"${off ? ' disabled' : ''}>${label}</button>`;
    const soon = ` <i>${t('sắp có')}</i>`;
    let html = '';
    const zones = square ? Object.keys(ZONES).filter(k => ZONES[k].site === site) : [zoneId];
    for (const z of zones) {
      const Zz = zoneOf(z), list = SHRINES.filter(x => x.zone === z);
      html += `<p class="ch-go-h">${t(Zz.name || 'Nhà thờ Đức Bà Sài Gòn')}${Zz.built ? '' : soon}</p>`;
      if (z === zoneId) here.forEach((p, i) => { html += row(t(p.name), `p:${i}`); });
      else if (Zz.built) html += row(t('Lối vào'), `z:${z}`);
      for (const sh of list) html += row(`<span aria-hidden="true">✝</span>${(getLang() === 'en' && sh.en?.name) || sh.name}`, `s:${sh.id}`, !Zz.built);
      // triển lãm trong hầm mộ (exhibit.js): mỗi nhóm một dòng, tới bức tranh đầu tiên của nhóm (từ khu khác: tải hầm mộ trước)
      if (z === 'grotte' && films && Zz.built) {
        const heads = exhibitHeads(films.all());
        html += `<p class="ch-go-h">${t('Triển lãm các thánh')}</p>`;
        for (const g of EXHIBIT_GROUPS) {
          if (heads[g.id]) html += row(`<span aria-hidden="true">▣</span>${(getLang() === 'en' && g.en) || g.name} <i>${heads[g.id].n}</i>`, `e:${z}|${heads[g.id].id}`);
        }
      }
    }
    world.places = here;
    goEl.innerHTML = html;
    btn('go').hidden = !goEl.querySelector('button:not([disabled])');
  }

  /** Tới khu khác (hoặc chỗ khác trong khu này): màn tối, tải khu nếu chưa có, thay cảnh, đặt mình tới nơi. */
  let travelling = false;
  let glide = null; // camera đang lướt tới một chỗ thánh (teleport → placeCamera)
  function travel(z, dest = null) {
    if (travelling || !zoneOf(z).built) return;
    if (z === zoneId) {
      const at = (dest?.shrine && shrines?.placeOf(dest.shrine)) || dest;
      if (at) fadeTo(() => teleport(at, { quiet: !dest.shrine }));
      return;
    }
    travelling = true;
    fadeEl.classList.add('is-on');
    say(`${t('Đang tới')} ${t(zoneOf(z).name)}…`, 0);
    const t0 = performance.now();
    loadZone(z).then((zone) => {
      // để màn kịp tối hẳn rồi mới thay cảnh
      setTimeout(() => {
        if (gone) return;
        installZone(z, zone, dest || {});
        travelling = false;
        msgEl.classList.remove('is-on');
        fadeEl.classList.remove('is-on');
        if (!dest?.shrine) say(t(zoneOf(z).name), 2600);
      }, Math.max(0, 260 - (performance.now() - t0)));
    }).catch((e) => {
      console.error(e);
      travelling = false;
      fadeEl.classList.remove('is-on');
      say(t('Không tải được khu này. Kiểm tra mạng rồi thử lại.'));
    });
  }
  function fadeTo(fn) {
    if (calm) { fn(); return; }
    fadeEl.classList.add('is-on');
    setTimeout(() => { if (gone) return; fn(); fadeEl.classList.remove('is-on'); }, 230);
  }

  // ---- đi nhanh (teleport) ----
  const goEl = root.querySelector('.ch-go'), fadeEl = root.querySelector('.ch-fade');
  const goMenu = (open) => {
    goEl.hidden = !open;
    btn('go').setAttribute('aria-expanded', String(open));
    btn('go').classList.toggle('is-on', open);
    if (open) { msgEl.classList.remove('is-on'); goEl.querySelector('button')?.focus(); }
  };
  btn('go').onclick = () => goMenu(goEl.hidden);
  goEl.onclick = (e) => {
    const b = e.target.closest('[data-k]');
    if (!b || b.disabled) return;
    goMenu(false);
    const kind = b.dataset.k.slice(0, 1), v = b.dataset.k.slice(2);
    if (kind === 'p') fadeTo(() => teleport(world.places[+v]));
    else if (kind === 'z') travel(v);
    else if (kind === 'e') { const [z, id] = v.split('|'); travel(z, { shrine: id }); }
    else { const sh = SHRINES.find(x => x.id === v); if (sh) travel(sh.zone, { shrine: v }); }
  };
  // ---- giờ trong nhà thờ: theo giờ Việt Nam, hoặc bình minh / ngày / hoàng hôn / đêm cố định (sky.js MODES) ----
  const skyBtn = root.querySelector('.ch-sky'), timeEl = root.querySelector('.ch-time');
  const SUN_ICON = icon('sun'), MOON_ICON = icon('moon');
  let skyIcon = '';
  const paintSkyBtn = () => {
    const icon = skyCtl.isDay() ? SUN_ICON : MOON_ICON;
    if (icon !== skyIcon) skyBtn.innerHTML = skyIcon = icon;
  };
  const timeMenu = (open) => {
    if (open) {
      const ev = skyCtl.event;
      timeEl.innerHTML = (ev ? `<p class="ch-go-h">${t(ev.name)}</p>` : '') + MODES.map(m =>
        `<button type="button" role="menuitemradio" aria-checked="${m.id === skyCtl.mode}" data-sky="${m.id}">${t(m.name)}${m.hour == null ? ` <i>${skyCtl.clock(true)}</i>` : ''}</button>`).join('');
    }
    timeEl.hidden = !open;
    skyBtn.setAttribute('aria-expanded', String(open));
    if (open) timeEl.querySelector('[aria-checked="true"]')?.focus();
  };
  skyBtn.onclick = () => timeMenu(timeEl.hidden);
  timeEl.onclick = (e) => {
    const b = e.target.closest('[data-sky]');
    if (!b) return;
    timeMenu(false);
    const m = MODES.find(x => x.id === b.dataset.sky);
    fadeTo(() => { skyCtl.setMode(m.id); paintSkyBtn(); });
    say(m.hour == null ? `${t(m.name)}: ${skyCtl.clock(true)}` : t(m.name), 2400);
  };
  const skyTimer = setInterval(paintSkyBtn, 20000);
  function teleport(pl, { quiet = false } = {}) {
    const me = world.player;
    if (me.seat) { me.seat.taken = null; me.seat = null; net?.up(); }
    tp = (tp + 1) & 255;   // người khác đặt thẳng mình tới chỗ mới, không lướt ngang qua tường
    const [x, , z] = pl.pos;
    const [sx, sz] = world.grid.walkable(x, z) ? [x, z] : world.grid.nearest(x, z, 8) || [x, z];
    Object.assign(me, { route: [], onArrive: null, leaving: false, keyWalk: false, v: 0, busy: 0, fly: null, look: null, onFaced: null, slide: null });
    me.vel.set(0, 0);
    me.pos.set(sx, me.ground ? me.ground(sx, sz) : 0, sz);
    me.heading = pl.heading || 0;
    me.play('idle', { fade: 0 });
    Object.assign(camState, { yaw: 0, pitch: pl.pitch || 0, pitchNow: pl.pitch || 0, follow: false });
    marker.visible = false;
    placeCamera(0, true);
    glide = null;
    if (pl.saint && !calm) {
      // lùi xa nhất 7 m theo lối đi được phía sau lưng, camera lướt từ đó lại (giảm chuyển động: tới ngay)
      const bx = Math.sin(me.heading), bz = Math.cos(me.heading);
      let back = 0;
      for (let s = 0.5; s <= 7; s += 0.5) { if (!world.grid.walkable(sx + bx * s, sz + bz * s)) break; back = s; }
      if (back >= 2) glide = { t: 0, d: 1.6, dx: bx * back, dy: 0.8, dz: bz * back };
    }
    refresh();
    if (!quiet && pl.name) say(pl.saint ? pl.name : t(pl.name), 2600);
  }

  function randomSpot(rand) {
    const g = world.layout.navGrid;
    for (;;) {
      const x = g.x0 + rand() * g.cols * g.cell, z = -(g.y0 + rand() * g.rows * g.cell);
      if (world.grid.walkable(x, z) && z > -20) return [x, z];
    }
  }

  function sitAt(a, seat, opts) {
    seat.taken = a;
    a.seat = seat;
    a.route = [];
    a.pos.set(seat.pos[0], seat.pos[1], seat.pos[2]);
    a.heading = seat.heading ?? 0;   // ghế trên sân khấu trường quay quay mặt vào nhau
    a.play('sit', { once: true, ...opts });
  }
  // vào chỗ: đứng trước ghế (lane) hay ở đầu ghế thì quay tại chỗ, đường ngắn nhất, về hướng ghế, rồi vừa ngồi xuống vừa lùi vào
  function settle(a, seat, then) {
    a.face(seat.heading ?? 0, () => {
      const from = [a.pos.x, a.pos.y, a.pos.z];
      sitAt(a, seat);
      a.pos.set(...from);
      a.slide = { from, to: [...seat.pos], t: 0, d: 0.7 };
      then?.();
    });
  }

  // ---- trường quay: người chơi lên ghế nóng (quizDev điều khiển; sau này máy chủ phòng) ----
  // Người chơi kế tiếp đứng dậy khỏi ghế khán giả (ghế ấy vẫn giữ cho họ: home), đi theo lưới tới ghế chờ cạnh sân khấu; MC mời
  // thì đi lên bậc tới ghế nóng, ngồi quay về MC; hết lượt thì về lại ghế khán giả của mình. Người giả lấy trong số đang ngồi.
  // Mỗi lệnh chương trình (hot / home / wait / place) mở một lượt mới cho người ấy (a.showGen): bước còn dở của lượt cũ (đi,
  // quay, ngồi) bỏ ngang chứ không chạy tiếp, nên máy nhận lệnh trễ hay dồn dập vẫn về cùng trạng thái với máy người dẫn.
  function claim(a) {
    a.showGen = (a.showGen || 0) + 1;
    a.showAt = performance.now();
    // ghế sân khấu / ghế chờ mà lượt cũ đã giữ trước (đang đi tới) thì trả lại
    for (const s of world.seats) if (s.role && s.taken === a && a.seat !== s) s.taken = null;
    a.look = null;
    a.onFaced = null;   // một lần quay dở của lượt cũ không được ngồi xuống ghế cũ nữa
    return a.showGen;
  }
  const still = (a, g) => !gone && (a.showGen || 0) === g;
  function actorLeave(a, then) {
    const seat = a.seat;
    if (!seat) { then?.(); return; }
    a.seat = null;
    if (seat.role) seat.taken = null; else a.home = seat;   // ghế khán giả vẫn giữ (taken) để về lại; máy chủ cũng giữ (không gửi 'up')
    a.inShow = true;   // chương trình đang đưa người này đi: người ở xa không theo gói vị trí của họ nữa (tickRemotes)
    a.live = true;
    a.pos.y = a.ground ? a.ground(a.pos.x, a.pos.z) : 0;
    a.play('idle');
    const [ex, , ez] = world.entries[seat.entry];
    a.walk([...(seat.lane ? [seat.lane] : []), [ex, ez]], then);
  }
  // đường tới (x, z): quãng ngắn trên sân khấu đi thẳng (lưới 0,5 m quanh bàn điều khiển bắt đi vòng xuống mép trước)
  const near = (a, x, z) => Math.hypot(x - a.pos.x, z - a.pos.z) < 2.5 ? [[x, z]] : world.grid.path(a.pos.x, a.pos.z, x, z);
  function actorSit(a, seat, then) {
    if (!seat || a.seat === seat) { then?.(); return; }
    const g = a.showGen || 0;
    seat.taken = a;
    actorLeave(a, () => {
      if (!still(a, g)) return;
      const [ex, , ez] = world.entries[seat.entry];
      const pts = near(a, ex, ez);
      a.walk([...pts, seat.lane || [seat.pos[0], seat.pos[2]]], () => still(a, g) && settle(a, seat, () => {
        if (!still(a, g)) return;
        if (!seat.role) {
          // về lại ghế khán giả: hết phần chương trình; người ở xa đứng yên ở ghế này cho tới gói vị trí sau
          a.inShow = false;
          if (a === world.player) net?.sit(seat.id);
          if (a.remote) { a.buf = [{ t: performance.now() / 1000, x: seat.pos[0], y: seat.pos[1], z: seat.pos[2], h: seat.heading ?? 0 }]; a.seatId = seat.id; }
        }
        then?.();
      }));
    });
  }
  // trường quay: khán giả đang ngồi vỗ tay sau delay giây chừng dur giây (mỗi người vào trễ một chút, nhịp hơi khác, vài người
  // chỉ ngồi xem), hết tràng thì về dáng ngồi; người ngồi yên lại thôi cập nhật xương
  function applaud(dur = 3.5, delay = 0) {
    for (const a of world.others) {
      if (!a.seat || a.seat.role || a.host || a.remote || a.pose !== 'sit' || Math.random() < 0.12) continue;
      setTimeout(() => {
        if (gone || a.pose !== 'sit' || !a.seat) return;
        const still = !a.live;
        a.live = true;
        a.play('sitClap', { fade: 0.25 });
        a.action.timeScale = 0.85 + Math.random() * 0.35;
        a.action.time = Math.random() * 2;
        setTimeout(() => {
          if (gone || a.pose !== 'sitClap') return;
          a.play('sit', { once: true, end: true, fade: 0.4 });
          if (still) setTimeout(() => { if (a.pose === 'sit' && a.seat) a.live = false; }, 600);
        }, dur * (0.7 + Math.random() * 0.35) * 1000);
      }, (delay + Math.random() * 0.5) * 1000);
    }
  }

  // MC đứng dậy ra giữa sân khấu bắt tay người chơi: chào khi mới lên, tạm biệt khi xuống. Việc của MC làm lần lượt (người
  // xuống bắt tay xong người kế tiếp mới rời ghế chờ), hết việc thì MC về ghế. Hai người đứng quay mặt vào nhau, nghiêng với khán giả.
  const SHAKE_GAP = 0.64;   // m giữa hai người (build_characters.py SHAKE_GAP): hai bàn tay phải gặp nhau
  const SHAKE_MS = 2000;    // clip shake dài 2 s
  let hostJob = Promise.resolve(), hostJobs = 0;
  function shakeHost(a, then) {
    const host = world.others.find(o => o.host);
    const mcSeat = world.seats.find(s => s.role === 'mc'), hot = world.seats.find(s => s.role === 'player');
    if (!host || !mcSeat || !hot) { then?.(); return; }
    const g = a.showGen || 0;
    const dir = Math.sign(hot.pos[0] - mcSeat.pos[0]) || 1;
    const mx = (mcSeat.pos[0] + hot.pos[0]) / 2, mz = mcSeat.pos[2] + 1.25;   // giữa sân khấu, trước hai bàn điều khiển (khán giả thấy rõ)
    const hx = mx - dir * SHAKE_GAP / 2, px = mx + dir * SHAKE_GAP / 2;
    // đi tới (x, mz); via: điểm trên đường để đoạn cuối hướng thẳng về phía MC (tới nơi là đã quay mặt vào nhau)
    const spot = (who, x, via) => new Promise(r => actorLeave(who, () => {
      const [sx, sz] = via || [x, mz];
      who.walk([...near(who, sx, sz), ...(via ? [via] : []), [x, mz]], r);
    }));
    const facing = (who, h) => new Promise(r => who.face(h, r));
    hostJobs++;
    hostJob = hostJob.then(() => new Promise(done => {
      // việc này hết (xong, người chơi đã sang lệnh khác, hay quá lâu): luôn nhả hàng việc của MC, kẻo một lần đi bị lệnh mới
      // ghi đè (lời hẹn tới nơi mất) làm MC đứng giữa sân khấu mãi và mọi lần bắt tay sau trên máy này không bao giờ tới
      let over = false, iv = 0, dog = 0;
      const finish = (ok) => {
        if (over) return;
        over = true;
        clearInterval(iv);
        clearTimeout(dog);
        hostJobs--;
        if (!gone) {
          if (host.pose === 'shake') host.play('idle');
          if (!hostJobs) actorSit(host, mcSeat);
          if (ok && still(a, g)) { a.play('idle'); then?.(); }
        }
        done();
      };
      if (!still(a, g)) { finish(false); return; }
      iv = setInterval(() => { if (!still(a, g)) finish(false); }, 250);
      dog = setTimeout(() => finish(true), 25000);
      // MC ra trước, tới chỗ thì đứng chờ, mặt luôn hướng theo người chơi đang đi tới; người chơi đi thẳng tới trước mặt MC
      const hostIn = spot(host, hx).then(() => host.face(a));
      const playerIn = new Promise(r => setTimeout(r, 600)).then(() => over ? null : spot(a, px, [px + dir * 0.7, mz]).then(() => over || a.face(host)));
      Promise.all([hostIn, playerIn]).then(() => over ? null : Promise.all([facing(host, headingOf(dir, 0)), facing(a, headingOf(-dir, 0))])).then(() => {
        if (over) return;
        host.play('shake', { once: true });
        a.play('shake', { once: true });
        setTimeout(() => { if (!over) finish(true); }, SHAKE_MS);
      });
    }));
  }

  // đặt thẳng vào ghế, không đi: tab đang ẩn (trình duyệt dừng khung hình, người đi không bao giờ tới nơi và cả chương trình
  // chờ theo), hay máy này lệch máy người dẫn (người kẹt giữa sân khấu, tab vừa hiện lại). Ghế khán giả rời đi vẫn giữ để về.
  function jumpTo(a, seat) {
    if (!seat || gone) return;
    clearTimeout(a.reactT);
    a.reacting = null;
    a.slide = null;
    if (a.seat !== seat) {
      if (a.seat?.role) { if (a.seat.taken === a) a.seat.taken = null; } else if (a.seat && seat.role) a.home = a.seat;
      a.live = true;
      sitAt(a, seat, { end: true });
    }
    if (seat.role) { a.inShow = true; return; }
    a.inShow = false;
    if (a === world.player) net?.sit(seat.id);
    if (a.remote) { a.buf = [{ t: performance.now() / 1000, x: seat.pos[0], y: seat.pos[1], z: seat.pos[2], h: seat.heading ?? 0 }]; a.seatId = seat.id; }
  }
  const hidden = () => typeof document !== 'undefined' && document.hidden;
  // MC đang dở việc bắt tay (đi ra giữa sân khấu) mà mọi thứ vừa được đặt thẳng: về ghế MC luôn
  const hostHome = () => {
    const host = world.others.find(o => o.host), mcSeat = world.seats.find(s => s.role === 'mc');
    if (host && mcSeat && host.seat !== mcSeat) { host.play('idle'); jumpTo(host, mcSeat); }
  };
  const homeOf = (a) => a.home || (a.seatId && world.seats.find(s => s.id === a.seatId && !s.role)) || null;

  const studioShow = {
    /** n người chơi theo thứ tự lên ghế nóng: mình trước (withMe), rồi người giả ở các hàng gần sân khấu (A–E), ngẫu nhiên. */
    contestants(n, withMe = false) {
      const fakes = world.others.filter(a => a.seat && !a.seat.role && !a.host && !a.remote && a.seat.row <= 5).sort(() => Math.random() - 0.5);
      return [...(withMe ? [world.player] : []), ...fakes].slice(0, n);
    },
    isMe: (a) => a === world.player,
    /** Tới ghế chờ thứ i (0, 1…), rồi then(). */
    wait(a, i, then) {
      claim(a);
      const seat = world.seats.find(s => s.id === `wait_${i + 1}`);
      if (hidden()) { jumpTo(a, seat); then?.(); return; }
      actorSit(a, seat, then);
    },
    /** Ghế chờ thứ i đang có người (ngồi hay đang đi tới). */
    waitTaken: (i) => !!world.seats.find(s => s.id === `wait_${i + 1}`)?.taken,
    /** Đặt thẳng lên ghế nóng, không đi (người vào phòng giữa lượt chơi, hay máy này lỡ mất lệnh đi lên): ghế khán giả vẫn giữ để về. */
    place(a) {
      const hotSeat = world.seats.find(s => s.role === 'player');
      if (!hotSeat || a.seat === hotSeat) return;
      if (a.seat && !a.seat.role) a.home = a.seat; else if (a.seat) a.seat.taken = null;
      claim(a);
      clearTimeout(a.reactT);
      a.reacting = null;
      a.slide = null;
      a.inShow = true;
      a.live = true;
      sitAt(a, hotSeat, { end: true });
    },
    /** Ra giữa sân khấu bắt tay MC, lên ghế nóng, ngồi xuống, rồi then(). */
    hot(a, then) {
      claim(a);
      const seat = world.seats.find(s => s.role === 'player');
      if (hidden()) { jumpTo(a, seat); hostHome(); then?.(); return; }
      shakeHost(a, () => actorSit(a, seat, then));
    },
    /** Về lại ghế khán giả của mình; từ ghế nóng thì bắt tay MC tạm biệt trước. */
    home(a, then) {
      // đang đứng nhảy mừng trước ghế nóng (react 'win'): thôi phản ứng, trả ghế, rồi bắt tay MC như thường
      clearTimeout(a.reactT);
      const hotSeat = world.seats.find(s => s.role === 'player'), mid = a.reacting && !a.seat && hotSeat?.taken === a;
      a.reacting = null;
      claim(a);
      if (mid) hotSeat.taken = null;
      // ghế khán giả của họ: ghế đã giữ lúc đứng dậy, không có thì ghế máy chủ báo (remoteSeat lúc đang trong chương trình)
      if (!a.home && a.seatId) a.home = world.seats.find(s => s.id === a.seatId && !s.role) || null;
      if (a.seat && !a.seat.role) { a.inShow = false; then?.(); return; }   // còn ngồi ghế khán giả (chưa kịp đi lên): xong
      if (!a.home) { if (a.seat?.taken === a) a.seat.taken = null; a.seat = null; a.inShow = false; then?.(); return; }   // theo gói vị trí của máy chủ
      if (hidden()) { jumpTo(a, a.home); hostHome(); then?.(); return; }
      if (a.seat?.role === 'player' || mid) shakeHost(a, () => actorSit(a, a.home, then));
      else actorSit(a, a.home, then);
    },
    /**
     * Đặt thẳng người này vào chỗ của lệnh cuối: 'hot' ghế nóng, 'wait0' / 'wait1' ghế chờ, 'home' ghế khán giả của họ (không
     * có thì thôi chương trình, theo gói vị trí). Huỷ mọi bước đi dở; MC về ghế nếu đang ra bắt tay.
     */
    snap(a, where) {
      if (!a || gone) return;
      claim(a);
      const seat = where === 'hot' ? world.seats.find(s => s.role === 'player')
        : where === 'wait0' || where === 'wait1' ? world.seats.find(s => s.id === `wait_${+where.slice(4) + 1}`) : homeOf(a);
      if (seat) jumpTo(a, seat);
      else { if (a.seat?.role && a.seat.taken === a) a.seat.taken = null; if (a.seat?.role) a.seat = null; a.inShow = false; a.reacting = null; }
      // việc bắt tay dở của người này tự nhả trong 0,25 s (still) và MC tự đi về; tab ẩn thì không ai đi được: đặt luôn
      if (hidden()) hostHome();
    },
    /** Đang giữa đường (rời ghế, chưa tới ghế mới, không nhảy mừng): quizOnline so vị trí để biết có kẹt không. */
    walking: (a) => !!a && !a.seat && !a.reacting && !!a.inShow,
    /** Lệnh chương trình cuối cùng cho người này đã quá ms mili giây (hay chưa từng có). */
    idle: (a, ms) => !a.showAt || performance.now() - a.showAt > ms,
    /** Đang ngồi ghế nóng. */
    onHot: (a) => a.seat?.role === 'player',
    /** Còn trong chương trình (đang đi, ngồi ghế chờ / ghế nóng) hay đang nhảy mừng. */
    inShow: (a) => !!(a.inShow || a.seat?.role || a.reacting),
    busy: (a) => !!a.reacting,
    /**
     * Người chơi trên ghế nóng phản ứng với kết quả (clip build_characters.py): 'yes' đúng (đấm tay "yes!" ~1,6 s), 'cheer' câu
     * mốc 5 / 10 (hai tay chữ V ~3 s), 'win' thắng (đứng dậy bước ra trước ghế, quay về khán giả nhảy mừng ~4 s, rồi ngồi lại),
     * 'sad' sai / hết giờ (cúi mặt ~3 s). Xong thì về dáng ngồi.
     */
    react(a, kind) {
      const seat = a?.seat;
      if (!seat || gone) return;
      clearTimeout(a.reactT);
      const my = a.reacting = {};   // home() huỷ phản ứng đang dở
      const back = (ms) => { a.reactT = setTimeout(() => { if (!gone && a.seat === seat && a.pose !== 'sit') a.play('sit', { once: true, end: true, fade: 0.5 }); }, ms); };
      a.live = true;
      if (kind === 'win' && seat.lane && a.clips.cheer) {
        // đứng dậy (ghế vẫn giữ), bước ra trước ghế rồi tiến về phía khán phòng (+z) cho khỏi bàn điều khiển che, quay ra khán
        // phòng nhảy mừng, rồi về chỗ đứng trước ghế và ngồi lại
        a.seat = null;
        a.pos.y = a.ground ? a.ground(a.pos.x, a.pos.z) : 0;
        a.play('idle');
        const front = [seat.lane[0], seat.lane[1] + 1.4];
        a.walk([seat.lane, front], () => a.face(Math.PI, () => {
          if (gone || a.reacting !== my) return;
          a.play('cheer', { fade: 0.2 });
          a.reactT = setTimeout(() => {
            if (gone || a.seat || a.pose !== 'cheer' || a.reacting !== my) return;
            a.play('idle');
            a.walk([seat.lane], () => { if (a.reacting === my) { a.reacting = null; settle(a, seat); } });
          }, 4200);
        }));
        return;
      }
      const clip = { yes: 'sitYes', cheer: 'sitCheer', win: 'sitCheer', sad: 'sitSad' }[kind];
      if (!clip || !a.clips[clip]) return;
      a.play(clip, { fade: kind === 'sad' ? 0.6 : 0.2 });
      back(kind === 'yes' ? 1600 : kind === 'sad' ? 3200 : 3000);
    },
  };

  // ---- mình: đi, ngồi, đứng, chắp tay, cúi chào ----
  function goTo(x, z, then) {
    const me = world.player;
    if (me.seat) { standUp(() => goTo(x, z, then)); return; }
    const pts = world.grid.path(me.pos.x, me.pos.z, x, z);
    if (!pts.length) return;
    me.v = Math.max(me.v, me.vel.length());
    me.vel.set(0, 0);
    me.walk(pts, then);
    showMarker(...pts[pts.length - 1]);
    refresh();
  }
  function standUp(then) {
    const me = world.player, seat = me.seat;
    if (!seat) { then?.(); return; }
    seat.taken = null;
    me.seat = null;
    net?.up();
    me.pos.y = me.ground ? me.ground(me.pos.x, me.pos.z) : 0;
    me.play('idle');
    const [ex, , ez] = world.entries[seat.entry];
    // ra tới lối đi rồi mới nhận cần điều khiển / phím (chỗ ngồi nằm ngoài lưới đi được); ghế rạp: bước ra chỗ để chân trước đã
    me.leaving = true;
    me.walk([...(seat.lane ? [seat.lane] : []), [ex, ez]], () => { me.leaving = false; then?.(); });
    refresh();
  }
  function takeSeat(seat) {
    const me = world.player;
    const [ex, , ez] = world.entries[seat.entry];
    const go = () => goTo(ex, ez, () => {
      if (seat.taken) { say(t('Chỗ này vừa có người ngồi.')); return; }
      seat.taken = me;
      net?.sit(seat.id);   // máy chủ giữ ghế: người khác xin trước thì nhận 'no' (refused) và bước ra
      me.walk([seat.lane || [seat.pos[0], seat.pos[2]]], () => { seat.taken = null; settle(me, seat, refresh); });
    });
    if (me.seat) standUp(go); else go();
  }
  function kneelAt(k) {
    goTo(k.pos[0], k.pos[2], () => {
      const me = world.player;
      me.heading = 0;
      me.play('pray');
      refresh();
    });
  }
  function nearestOther() {
    const me = world.player;
    let best = null, bd = BOW_NEAR;
    for (const a of world.others) {
      const d = Math.hypot(a.pos.x - me.pos.x, a.pos.z - me.pos.z);
      if (d < bd) { bd = d; best = a; }
    }
    return best;
  }
  function bow() {
    const me = world.player, other = nearestOther();
    if (!other || me.seat || me.fly || me.busy > 0) return;
    // cúi theo hướng đang đứng (người chơi tự quay bằng kéo màn hình), không xoay người trước khi chào
    me.route = [];
    me.vel.set(0, 0);
    me.play('bow', { once: true });
    me.busy = 1.6;
    me.extras?.bowed();
    goodDeed();
    setTimeout(() => !gone && me.pose === 'bow' && me.play('idle'), 1700);
    // người đang đứng / đi lại thì quay lại cúi chào; hai người cùng chào: một đốm sáng bay lên giữa hai người
    if (other.wander) {
      other.route = [];
      other.onArrive = null;
      other.heading = headingOf(me.pos.x - other.pos.x, me.pos.z - other.pos.z);
      other.busy = 2.4;
      other.wait = 3;
      setTimeout(() => {
        if (gone) return;
        other.play('bow', { once: true });
        setTimeout(() => !gone && other.pose === 'bow' && other.play('idle'), 1700);
        spark((me.pos.x + other.pos.x) / 2, (me.pos.z + other.pos.z) / 2);
      }, 700);
    }
  }
  // đố vui nhiều người: ghế của khán giả trả lời đúng sáng lên chúc mừng (vòng xanh vàng quanh ghế, cột sáng mờ, đốm sáng bay)
  const glows = [];
  function seatGlow(a) {
    const s = a?.inShow ? null : a?.seat;
    if (!s || s.role) return;
    const [x, y, z] = s.pos, root = new THREE.Group();
    const add = { transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide };
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.66, 48, 1, 0, Math.PI * 1.7), new THREE.MeshBasicMaterial({ color: 0x5dffa8, opacity: 0, ...add }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.05;
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.62, 3.2, 24, 1, true), new THREE.MeshBasicMaterial({ color: 0xffe08a, opacity: 0, ...add }));
    beam.position.y = 1.6;
    root.add(ring, beam);
    root.position.set(x, y - 0.4, z);
    scene.add(root);
    glows.push({ root, ring, beam, life: 0 });
    if (!calm) for (let k = 0; k < 3; k++) setTimeout(() => { if (!gone) spark(x + (Math.random() - 0.5) * 0.5, z + (Math.random() - 0.5) * 0.5); }, k * 260);
  }
  function spark(x, z) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 8), new THREE.MeshBasicMaterial({ color: 0xfff1b8, transparent: true }));
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffd36b, transparent: true, opacity: 0.35, depthWrite: false }));
    m.add(glow);
    m.position.set(x, 1.2 + (world.grid?.heightAt(x, z) || 0), z);
    scene.add(m);
    sparks.push({ m, life: 0 });
  }
  function refresh() {
    const me = world.player;
    if (!me) return;
    btn('stand').hidden = !me.seat;
    btn('pray').hidden = !!me.seat || !!me.fly;
    btn('pray').classList.toggle('is-on', me.pose === 'pray');
    const paint = (b, ic, label, on) => {
      if (b.dataset.label !== label) { b.innerHTML = `${icon(ic)}<span>${label}</span>`; b.dataset.label = label; }
      b.classList.toggle('is-on', on);
    };
    const cloud = flyKind(myLook.fly || flyItem()) === 'cloud', worn = !!myLook.fly;
    btn('wings').hidden = false;
    paint(btn('wings'), cloud ? 'cloud' : 'wing', cloud ? (worn ? t('Cất mây') : t('Gọi mây')) : worn ? t('Tháo cánh') : t('Đeo cánh'), worn);
    // bạn đồng hành: gọi / cho nghỉ (chỗ chật như trường quay), chỉ hiện khi đã có một con
    const pet = petItem(), petOn = !!myLook.pet, petName = pet ? (getLang() === 'en' ? ITEMS[pet].en : ITEMS[pet].vi).toLowerCase() : '';
    const petLabel = petOn ? `${t('Cho nghỉ:')} ${petName}` : `${t('Gọi')} ${petName}`;
    btn('pet').hidden = !pet;
    paint(btn('pet'), 'paw', petLabel, petOn);
    const vp = root.querySelector('.ch-views-pet');
    vp.hidden = !pet;
    vp.title = petLabel;
    vp.setAttribute('aria-label', petLabel);
    vp.setAttribute('aria-pressed', String(petOn));
    vp.classList.toggle('is-on', petOn);
    btn('fly').hidden = !canFly(myLook) || !!me.seat;
    paint(btn('fly'), me.fly ? 'land' : 'fly', me.fly ? t('Hạ xuống') : t('Bay'), !!me.fly);
    altEl.hidden = !me.fly;
  }

  // ---- đôi cánh: đeo / tháo, cất cánh, đáp ----
  const altEl = root.querySelector('.ch-alt');
  let altHold = 0, flyHint = false;
  // món để bay đã chọn lần cuối trong Tủ đồ (cánh hay mây); nút trên thanh nút đeo / tháo món ấy
  const flyItem = () => (lastFly && bag.owns(lastFly) ? lastFly : 'wings');
  function wearWings(on) {
    const me = world.player;
    if (!me) return;
    const item = flyItem(), cloud = flyKind(item) === 'cloud';
    if (!on && me.fly) { land(() => wearWings(false)); return; }
    wearLook({ ...myLook, fly: on ? item : '' });
    if (on) spark(me.pos.x, me.pos.z);
    say(on ? (cloud ? t('Mây đã tới. Bấm Bay để cưỡi mây.') : t('Đã đeo cánh. Bấm Bay để cất cánh.')) : cloud ? t('Đã cất mây.') : t('Đã tháo cánh.'), 3000);
  }
  // bạn đồng hành chọn lần cuối (chiên con hay bồ câu), không thì con đầu tiên đã có
  const PETS = Object.keys(ITEMS).filter(id => ITEMS[id].slot === 'pet');
  const petItem = () => (lastPet && bag.owns(lastPet) ? lastPet : PETS.find(id => bag.owns(id)) || '');
  function wearPet(on) {
    const me = world.player, item = petItem();
    if (!me || !item) return;
    wearLook({ ...myLook, pet: on ? item : '' });
    if (on) spark(me.pos.x, me.pos.z);
    const dove = item === 'dove';
    say(on ? (dove ? t('Bồ câu đã tới bên bạn.') : t('Chiên con đã tới bên bạn.')) : dove ? t('Bồ câu đã về nghỉ.') : t('Chiên con đã về nghỉ.'), 2500);
  }
  function takeOff() {
    const me = world.player;
    if (!me || me.fly || me.leaving) return;
    if (!canFly(myLook)) { say(t('Cần đeo cánh mới bay được.'), 3000); return; }
    if (me.seat) { standUp(takeOff); return; }
    Object.assign(me, { route: [], onArrive: null, busy: 0 });
    me.fly = { alt: 0, want: Math.min(TAKEOFF, Z.flyMax ?? 8), landing: null };
    me.play('idle');
    marker.visible = false;
    if (!flyHint) {
      flyHint = true;
      say(touchUI ? t('Kéo bên trái để bay, giữ ▲ ▼ để lên cao hay xuống thấp.') : t('WASD để bay, Space để lên cao, C để xuống thấp, F để hạ xuống.'), 6000);
    }
    refresh();
  }
  /** Hạ dần xuống mặt đất (vẫn bay ngang được trong lúc hạ), đáp xong thì làm `then`. */
  function land(then) {
    const me = world.player;
    if (!me?.fly) { then?.(); return; }
    me.fly.want = 0;
    me.fly.landing = then || (() => {});
  }
  // mặt trên cùng dưới một điểm (mái, hàng cột, vòm; sàn nếu trống): dựng một lần cho khu khi cần, ô 1 m, mỗi tam giác
  // nâng các ô trong khung của nó lên đỉnh cao nhất của nó (dò tia mỗi ô thì quá chậm: ~16 ms một tia trên 280 nghìn tam giác)
  const ROOF_CELL = 1, ROOF_PAD = 250; // m: ô bản đồ; khoảng ra ngoài lưới đi bộ (vòm Thánh Phê-rô nằm sau lưới quảng trường)
  let roofMap = null;
  function buildRoofs() {
    const g = world.layout.navGrid, x0 = g.x0 - ROOF_PAD, z0 = -(g.y0 + g.walkable.length * g.cell) - ROOF_PAD;
    const nx = Math.ceil((g.walkable[0].length * g.cell + 2 * ROOF_PAD) / ROOF_CELL);
    const nz = Math.ceil((g.walkable.length * g.cell + 2 * ROOF_PAD) / ROOF_CELL);
    const h = new Float32Array(nx * nz).fill(-Infinity), v = new THREE.Vector3();
    for (const o of world.pick) {
      if (!o.isMesh || o.isInstancedMesh || !o.geometry?.attributes.position) continue;
      o.updateWorldMatrix(true, false);
      const pos = o.geometry.attributes.position, idx = o.geometry.index, n = idx ? idx.count : pos.count;
      for (let t = 0; t + 2 < n; t += 3) {
        let ax = Infinity, bx = -Infinity, az = Infinity, bz = -Infinity, top = -Infinity;
        for (let k = 0; k < 3; k++) {
          v.fromBufferAttribute(pos, idx ? idx.getX(t + k) : t + k).applyMatrix4(o.matrixWorld);
          ax = Math.min(ax, v.x); bx = Math.max(bx, v.x); az = Math.min(az, v.z); bz = Math.max(bz, v.z); top = Math.max(top, v.y);
        }
        const i0 = Math.max(0, Math.floor((ax - x0) / ROOF_CELL)), i1 = Math.min(nx - 1, Math.floor((bx - x0) / ROOF_CELL));
        const j0 = Math.max(0, Math.floor((az - z0) / ROOF_CELL)), j1 = Math.min(nz - 1, Math.floor((bz - z0) / ROOF_CELL));
        for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) if (h[j * nx + i] < top) h[j * nx + i] = top;
      }
    }
    roofMap = { h, nx, nz, x0, z0 };
  }
  function roofAt(x, z) {
    if (!roofMap) buildRoofs();
    const { h, nx, nz, x0, z0 } = roofMap, i = Math.floor((x - x0) / ROOF_CELL), j = Math.floor((z - z0) / ROOF_CELL);
    if (i < 0 || j < 0 || i >= nx || j >= nz) return Infinity; // ngoài bản đồ: không bay ra
    const y = h[j * nx + i];
    return y === -Infinity ? 0 : y;
  }
  // trong nhà có trần thì mặt trên cùng là trần: thay bằng các tầng SLOT m của mỗi ô, bit bật = có vật ở tầng đó (ghế, tường)
  const SLOT = 0.6, SLOT_Y0 = -1, BODY = [0.2, 1.8];   // thân người khi bay: từ chân + 0,2 tới chân + 1,8 m
  let slotMap = null;
  function buildSlots() {
    const g = world.layout.navGrid, x0 = g.x0, z0 = -(g.y0 + g.walkable.length * g.cell);
    const nx = Math.ceil(g.walkable[0].length * g.cell / ROOF_CELL), nz = Math.ceil(g.walkable.length * g.cell / ROOF_CELL);
    const m = new Uint32Array(nx * nz), v = new THREE.Vector3();
    for (const o of world.pick) {
      if (!o.isMesh || o.isInstancedMesh || !o.geometry?.attributes.position) continue;
      o.updateWorldMatrix(true, false);
      const pos = o.geometry.attributes.position, idx = o.geometry.index, n = idx ? idx.count : pos.count;
      for (let t = 0; t + 2 < n; t += 3) {
        let ax = Infinity, bx = -Infinity, az = Infinity, bz = -Infinity, lo = Infinity, hi = -Infinity;
        for (let k = 0; k < 3; k++) {
          v.fromBufferAttribute(pos, idx ? idx.getX(t + k) : t + k).applyMatrix4(o.matrixWorld);
          ax = Math.min(ax, v.x); bx = Math.max(bx, v.x); az = Math.min(az, v.z); bz = Math.max(bz, v.z);
          lo = Math.min(lo, v.y); hi = Math.max(hi, v.y);
        }
        const s0 = Math.max(0, Math.floor((lo - SLOT_Y0) / SLOT)), s1 = Math.min(31, Math.floor((hi - SLOT_Y0) / SLOT));
        if (s1 < s0) continue;
        const bits = (s1 - s0 === 31 ? 0xffffffff : ((1 << (s1 - s0 + 1)) - 1) << s0) >>> 0;
        const i0 = Math.max(0, Math.floor((ax - x0) / ROOF_CELL)), i1 = Math.min(nx - 1, Math.floor((bx - x0) / ROOF_CELL));
        const j0 = Math.max(0, Math.floor((az - z0) / ROOF_CELL)), j1 = Math.min(nz - 1, Math.floor((bz - z0) / ROOF_CELL));
        for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) m[j * nx + i] |= bits;
      }
    }
    slotMap = { m, nx, nz, x0, z0 };
  }
  function slotsAt(x, z) {
    if (!slotMap) buildSlots();
    const { m, nx, nz, x0, z0 } = slotMap, i = Math.floor((x - x0) / ROOF_CELL), j = Math.floor((z - z0) / ROOF_CELL);
    return i < 0 || j < 0 || i >= nx || j >= nz ? 0xffffffff : m[j * nx + i];
  }
  const slotOf = (y) => Math.max(0, Math.min(31, Math.floor((y - SLOT_Y0) / SLOT)));
  // thân người (chân ở y) có lọt qua ô này không
  function bodyFree(x, z, y) {
    const a = slotOf(y + BODY[0]), b = slotOf(y + BODY[1]);
    return !(slotsAt(x, z) & ((((1 << (b - a + 1)) - 1) << a) >>> 0));
  }
  // mặt trên của vật cao nhất ngay dưới chân (để không hạ xuyên xuống hàng ghế)
  function slotTop(x, z, y) {
    const bits = slotsAt(x, z);
    for (let s = slotOf(y + BODY[0]); s >= 0; s--) if (bits & (1 << s)) return SLOT_Y0 + (s + 1) * SLOT;
    return -Infinity;
  }
  // đang bay cao: qua được ô không đi được (cả ngoài lưới đi bộ ở khu ngoài trời) khi đã cao hơn mặt trên của nó
  const passable = (x, z, y) => world.grid.walkable(x, z)
    || (Z.overRoofs === 'slots' ? !!world.player?.fly && world.grid.inGrid(x, z) && bodyFree(x, z, y)
      : Z.overRoofs && !!world.player?.fly && (Z.overRoofs !== 'grid' || world.grid.inGrid(x, z)) && roofAt(x, z) < y - 0.3);
  // ô có mái cao hơn mặt đất ROOFED m trở lên (đèn, tượng thấp hơn thì không tính)
  const ROOFED = 8;
  const roofed = (x, z) => roofAt(x, z) - world.grid.heightAt(x, z) > ROOFED;
  const grounded = (fn) => (world.player?.fly ? land(fn) : fn());
  // độ cao mỗi khung hình: giữ ▲ ▼ đổi độ cao muốn tới, độ cao thật đuổi theo mềm; ▼ ở thấp nhất thì đáp, ▲ lúc đang hạ thì thôi hạ
  function flyTick(dt) {
    const me = world.player, f = me.fly;
    if (!f) return;
    const v = altHold || ((keys.has('up') ? 1 : 0) - (keys.has('down') ? 1 : 0));
    // trên mái / hàng cột (ô không đi được): không hạ thấp hơn mặt trên của nó, không đáp ở đó
    const p = me.pos, off = Z.overRoofs && !world.grid.walkable(p.x, p.z);
    const under = Z.overRoofs === 'slots' ? slotTop(p.x, p.z, p.y) : roofAt(p.x, p.z);
    const low = off ? Math.max(FLY_MIN, under - world.grid.heightAt(p.x, p.z) + 0.4) : FLY_MIN;
    if (f.landing && off) { f.landing = null; f.want = Math.max(f.alt, low); say(t('Không đáp xuống đây được, hãy bay ra chỗ trống.'), 3000); }
    if (v > 0 && f.landing) { f.landing = null; f.want = Math.max(f.alt, FLY_MIN); }
    if (!f.landing) {
      const rate = Math.max(CLIMB, f.want * CLIMB_K) * (keys.has('run') ? 2 : 1);
      const top = Z.underRoofs && roofed(p.x, p.z) ? Math.min(Z.underRoofs, Z.flyMax ?? 8) : Z.flyMax ?? 8;
      if (v < 0 && f.want <= FLY_MIN + 1e-3) land();
      else f.want = THREE.MathUtils.clamp(f.want + v * rate * dt, low, Math.max(low, top));
    }
    f.alt += (f.want - f.alt) * (1 - Math.exp(-dt * (f.landing ? 2.2 : 3)));
    if (f.landing && f.alt < 0.04) {
      const then = f.landing;
      me.fly = null;
      me.play(me.pose === 'soar' ? 'walk' : 'idle');
      refresh();
      then();
    }
  }
  btn('wings').onclick = () => wearWings(!myLook.fly);
  btn('pet').onclick = () => wearPet(!myLook.pet);
  root.querySelector('.ch-views-pet').onclick = () => wearPet(!myLook.pet);
  btn('closet').onclick = () => (closet.isOpen ? closet.close() : closet.open());
  btn('shop').onclick = () => (shop.isOpen ? shop.close() : shop.open());
  // trường quay (camera cố định) không có thanh nút dọc: Vật phẩm và Tủ đồ nằm ở thanh góc nhìn, góc trái dưới
  root.querySelector('.ch-views-shop').onclick = () => (shop.isOpen ? shop.close() : shop.open());
  root.querySelector('.ch-views-closet').onclick = () => (closet.isOpen ? closet.close() : closet.open());
  btn('fly').onclick = () => (world.player?.fly ? land() : takeOff());
  for (const b of altEl.querySelectorAll('[data-alt]')) {
    const v = +b.dataset.alt;
    b.addEventListener('pointerdown', (e) => { altHold = v; try { b.setPointerCapture(e.pointerId); } catch { /* đã nhả */ } });
    for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) b.addEventListener(ev, () => { if (altHold === v) altHold = 0; });
    b.addEventListener('contextmenu', (e) => e.preventDefault());
  }
  btn('stand').onclick = () => standUp();
  btn('pray').onclick = () => {
    const me = world.player;
    if (!me || me.seat) return;
    me.route = [];
    const start = me.pose !== 'pray';
    me.play(start ? 'pray' : 'idle');
    if (start) { goodDeed(); me.extras?.prayed(); }
    refresh();
  };
  btn('bow').onclick = bow;

  // ---- chạm / kéo / cần điều khiển ----
  // Kéo (chuột, hoặc ngón tay ở nửa phải): xoay camera quanh nhân vật, người không quay theo; ngồi hay quỳ cầu nguyện thì
  // chỉ liếc nhìn quanh (yaw, trở về sau lưng khi đi); kéo dọc nhìn lên vòm, kính màu hoặc xuống (vuốt lên = nhìn lên).
  // Ngón tay đặt ở nửa trái rồi kéo: cần điều khiển nổi hiện ngay dưới ngón tay. Chạm không kéo: đi tới / ngồi / quỳ.
  const camState = { heading: 0, yaw: 0, pitch: 0, pitchNow: 0, zoom: 1, drag: null, follow: false, align: false, cut: 0, cutHold: 0 };
  const looksOnly = (me) => !!me.seat || me.pose === 'pray';
  let stick = null;
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const stickRest = () => {
    stickEl.classList.remove('is-on');
    stickEl.style.left = stickEl.style.top = '';
    knobEl.style.transform = '';
  };
  // camera cố định (trường quay): kéo một ngón / chuột thì xoay và ngước / cúi, chụm hai ngón thì phóng / thu (góc nhìn), chạm
  // không kéo thì chọn ghế; thả tay thì lưu góc (camSave). Kéo chỉ đổi góc MUỐN (camView); camera thật đuổi theo mềm (camEase)
  // và thả tay lúc đang vuốt thì còn trôi một đoạn rồi chậm dần (camSpin). Độ nhạy thấp hơn trước (người dùng 2026-11-05: phòng
  // hẹp, nhạy quá khó chỉnh).
  const DRAG_K = 0.0022;     // rad mỗi px ở fov 55° (trước 0,0035)
  const touches = new Map();
  let fixedDrag = null, pinch = null, camSpin = null;
  const pinchLen = () => { const [a, b] = [...touches.values()]; return Math.hypot(a.x - b.x, a.y - b.y) || 1; };
  function fixedDown(e) {
    touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
    try { canvas.setPointerCapture(e.pointerId); } catch { /* con trỏ đã nhả */ }
    camStop();
    const v = camView();
    if (touches.size === 1) fixedDrag = { id: e.pointerId, x: e.clientX, y: e.clientY, yaw: v.yaw, pitch: v.pitch, moved: false, t: performance.now(), vy: 0, vp: 0 };
    else if (touches.size === 2) {
      pinch = { d: pinchLen(), fov: v.fov };
      if (fixedDrag) { fixedDrag.moved = true; fixedDrag.pinched = true; }
    }
  }
  function fixedMove(e) {
    if (!touches.has(e.pointerId)) return;
    touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const v = camView();
    if (pinch && touches.size >= 2) {
      v.fov = THREE.MathUtils.clamp(pinch.fov * pinch.d / pinchLen(), 25, 95);
    } else if (fixedDrag?.id === e.pointerId && !fixedDrag.pinched) {
      const dx = e.clientX - fixedDrag.x, dy = e.clientY - fixedDrag.y;
      if (!fixedDrag.moved && Math.abs(dx) + Math.abs(dy) > 8) fixedDrag.moved = true;
      if (!fixedDrag.moved) return;
      const k = DRAG_K * v.fov / 55;   // phóng to thì xoay chậm lại
      const y0 = v.yaw, p0 = v.pitch, now = performance.now(), sec = Math.max(0.004, (now - fixedDrag.t) / 1000);
      v.yaw = fixedDrag.yaw + dx * k;
      v.pitch = THREE.MathUtils.clamp(fixedDrag.pitch + dy * k, -1.45, 0.6);
      // tốc độ vuốt gần đây (rad/s) cho quán tính lúc thả tay
      fixedDrag.vy += ((v.yaw - y0) / sec - fixedDrag.vy) * 0.5;
      fixedDrag.vp += ((v.pitch - p0) / sec - fixedDrag.vp) * 0.5;
      fixedDrag.t = now;
    } else return;
    camShow(v);
  }
  function fixedUp(e) {
    if (!touches.delete(e.pointerId)) return;
    if (touches.size < 2) pinch = null;
    if (fixedDrag?.id === e.pointerId) {
      const d = fixedDrag;
      fixedDrag = null;
      if (!d.moved && e.type !== 'pointercancel' && world.player) tapAt(e);
      // thả lúc tay còn đang vuốt (dừng tay quá 0,1 s thì thôi): trôi tiếp rồi chậm dần; giảm chuyển động: không trôi
      const lim = (x) => THREE.MathUtils.clamp(x, -1.6, 1.6);
      if (d.moved && !d.pinched && !calm && performance.now() - d.t < 100 && Math.hypot(d.vy, d.vp) > 0.15) camSpin = { y: lim(d.vy), p: lim(d.vp) };
    }
    if (!touches.size) { fixedDrag = null; if (!camSpin) camSave(); }
  }
  canvas.addEventListener('pointerdown', (e) => {
    const me = world.player;
    if (Z.fixedCam) { fixedDown(e); return; }
    if (e.pointerType !== 'mouse' && !stick && e.clientX < root.clientWidth * 0.45) {
      stick = { id: e.pointerId, x: e.clientX, y: e.clientY, vx: 0, vy: 0, on: false };
    } else if (!camState.drag) {
      const body = !!me && !looksOnly(me);
      if (body) { camState.heading += camState.yaw; camState.yaw = 0; }
      camState.align = false;
      camState.drag = { x: e.clientX, y: e.clientY, yaw: camState.yaw, heading: camState.heading, pitch: camState.pitch, body, moved: false, id: e.pointerId };
    } else return;
    try { canvas.setPointerCapture(e.pointerId); } catch { /* con trỏ đã nhả */ }
  });
  canvas.addEventListener('pointermove', (e) => {
    if (Z.fixedCam) { fixedMove(e); return; }
    if (stick && stick.id === e.pointerId) {
      const dx = e.clientX - stick.x, dy = e.clientY - stick.y, l = Math.hypot(dx, dy);
      if (!stick.on && l > 10) {
        stick.on = true;
        stickEl.classList.add('is-on');
        stickEl.style.left = `${stick.x - STICK_R}px`;
        stickEl.style.top = `${stick.y - STICK_R}px`;
      }
      if (stick.on) {
        const k = Math.min(1, STICK_R / l);
        stick.vx = dx * k / STICK_R;
        stick.vy = dy * k / STICK_R;
        knobEl.style.transform = `translate(${dx * k}px, ${dy * k}px)`;
      }
      return;
    }
    const d = camState.drag;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 8 && !d.moved) {
      d.moved = true;
      // ngón tay: khoá theo hướng kéo đầu tiên (kéo ngang chỉ xoay, kéo dọc chỉ ngước / cúi), ngón tay ít khi kéo thẳng
      if (e.pointerType !== 'mouse') d.axis = Math.abs(dx) > Math.abs(dy) * 1.4 ? 'x' : Math.abs(dy) > Math.abs(dx) * 1.4 ? 'y' : '';
    }
    if (!d.moved) return;
    if (d.axis !== 'y') {
      if (d.body) camState.heading = d.heading - dx * 0.006;
      else camState.yaw = THREE.MathUtils.clamp(d.yaw - dx * 0.006, -1.4, 1.4);
    }
    if (d.axis !== 'x') camState.pitch = THREE.MathUtils.clamp(d.pitch - dy * 0.005, world.player?.fly ? PITCH_MIN_FLY : PITCH_MIN, PITCH_MAX);
  });
  const tapAt = (e) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    // cột sáng / đốm sáng đã mờ đi (đang đứng gần cổng) không chặn chạm: chạm xuyên qua xuống nền
    const hit = ray.intersectObjects(world.pick, false).find(h => !(h.object.userData.fade && h.object.material.opacity < h.object.userData.fade * 0.5));
    if (hit && shrines?.pick(hit.object)) return;
    if (hit) tap(hit.point, hit.object);
  };
  const endDrag = (e) => {
    if (Z.fixedCam) { fixedUp(e); return; }
    if (stick && stick.id === e.pointerId) {
      const s = stick;
      stick = null;
      stickRest();
      if (!s.on && e.type !== 'pointercancel' && world.player) tapAt(e);
      return;
    }
    const d = camState.drag;
    if (!d || d.id !== e.pointerId) return;
    camState.drag = null;
    if (d.moved || e.type === 'pointercancel' || !world.player) return;
    tapAt(e);
  };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  // lăn chuột: lại gần / ra xa nhân vật; camera cố định thì phóng / thu góc nhìn
  let wheelSave = 0;
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (Z.fixedCam) {
      camStop();
      const v = camView();
      v.fov = THREE.MathUtils.clamp(v.fov * Math.exp(e.deltaY * 0.001), 25, 95);
      camShow(v);
      clearTimeout(wheelSave);
      wheelSave = setTimeout(camSave, 400);
      return;
    }
    camState.zoom = THREE.MathUtils.clamp(camState.zoom * Math.exp(e.deltaY * 0.001), 0.55, 1.4);
  }, { passive: false });

  function tap(p, hit) {
    if (studio && hit === studio.screen) { if (studio.tap()) return; }
    // ghế trống gần chỗ chạm
    let seat = null, sd = 0.5;
    for (const s of world.seats) {
      const d = Math.hypot(s.pos[0] - p.x, s.pos[2] - p.z);
      if (d < sd && (!s.taken || s.taken === world.player)) { sd = d; seat = s; }
    }
    if (seat && seat === world.player.seat) return;
    if (Z.fixedCam) return;   // camera cố định: đổi ghế bằng sơ đồ chọn ghế (mapOpen), không chọn trên cảnh 3D
    if (seat) { grounded(() => takeSeat(seat)); return; }
    if (world.seats.some(s => s.taken && Math.hypot(s.pos[0] - p.x, s.pos[2] - p.z) < 0.3)) { say(t('Chỗ này đã có người ngồi.'), 2500); return; }
    const k = world.layout.kneel.find(k => Math.hypot(k.pos[0] - p.x, k.pos[2] - p.z) < 0.6);
    if (k) { grounded(() => kneelAt(k)); return; }
    const spot = world.grid.walkable(p.x, p.z) ? [p.x, p.z] : world.grid.nearest(p.x, p.z, 2);
    if (spot) goTo(...world.grid.away(...spot));
  }

  // phím: W/S đi tới / lùi theo hướng camera, A/D sang ngang, Shift đi nhanh, Q/E xoay camera
  const keys = new Set();
  const onKey = (e) => {
    if (e.target.closest?.('input, textarea')) return;
    if (!leaveEl.hidden) { if (e.code === 'Escape' && e.type === 'keydown') stayHere(); return; }   // hộp hỏi rời phòng: phím chỉ cho hộp
    const k = {
      KeyW: 'f', ArrowUp: 'f', KeyS: 'b', ArrowDown: 'b', KeyA: 'l', ArrowLeft: 'l', KeyD: 'r', ArrowRight: 'r',
      ShiftLeft: 'run', ShiftRight: 'run', KeyQ: 'tl', KeyE: 'tr', Space: 'up', KeyC: 'down',
    }[e.code];
    if (!mapEl.hidden) { if (e.code === 'Escape' && e.type === 'keydown') { if (mapEntry) askLeave(); else mapOpen(false); } return; }
    if (Z.fixedCam && !paused && camKey(e)) return;
    if (paused || (Z.fixedCam && e.code !== 'Escape')) return;
    if (e.code === 'KeyF' && e.type === 'keydown' && !e.repeat && world.player) { if (world.player.fly) land(); else takeOff(); return; }
    if (e.code === 'Escape' && e.type === 'keydown') { if (shop.isOpen) shop.close(); else if (closet?.isOpen) closet.close(); else if (!goEl.hidden) goMenu(false); else if (shrines?.busy) shrines.close(); else askLeave(); return; }
    if (!k) return;
    e.preventDefault();
    if (e.type === 'keydown') keys.add(k); else keys.delete(k);
  };
  addEventListener('keydown', onKey);
  addEventListener('keyup', onKey);
  addEventListener('blur', () => { keys.clear(); camHold.clear(); });
  // Đi bằng cần / phím: vận tốc đuổi theo vận tốc muốn (tăng tốc, dừng có quán tính ngắn), vướng tường thì trượt dọc
  // tường, không đi xuyên người đang đứng; người quay mặt dần theo hướng đi, bước chân nhanh chậm theo tốc độ.
  function inputMove(dt) {
    const me = world.player;
    let f = 0, s = 0, m = 0, fast = false;
    if (stick?.on) { f = -stick.vy; s = stick.vx; m = Math.hypot(f, s); }
    else {
      f = (keys.has('f') ? 1 : 0) - (keys.has('b') ? 1 : 0);
      s = (keys.has('r') ? 1 : 0) - (keys.has('l') ? 1 : 0);
      m = f || s ? 1 : 0;
      fast = keys.has('run');
    }
    if (closet?.isOpen || shop.isOpen) m = 0;   // đang chọn đồ: đứng yên cho camera ngắm
    const steer = m > 0.15 && me.busy <= 0 && !me.leaving;
    camState.follow = false;
    if (steer && me.seat) { standUp(); return; }
    if (me.leaving || (!steer && !me.keyWalk)) return;
    if (steer && me.look != null) { me.look = null; me.onFaced = null; }
    if (steer && me.route.length) { me.route = []; me.onArrive = null; me.vel.set(Math.sin(me.heading) * -me.v, Math.cos(me.heading) * -me.v); me.v = 0; }
    let tx = 0, tz = 0;
    if (steer) {
      const h = camState.heading + camState.yaw;
      const fx = -Math.sin(h), fz = -Math.cos(h);
      let dx = fx * f - fz * s, dz = fz * f + fx * s;
      const d = Math.hypot(dx, dz);
      dx /= d; dz /= d;
      const gain = me.fly && Z.overRoofs ? Math.min(FLY_GAIN, 1 + me.fly.alt / FLY_HIGH) : 1;
      const [slow, quick] = me.fly ? [FLY * gain, FLY_FAST * gain] : [WALK, FAST];
      const sp = stick?.on ? (m < 0.8 ? slow * Math.max(0.35, m / 0.8) : slow + (quick - slow) * Math.min(1, (m - 0.8) / 0.15)) : fast ? quick : slow;
      tx = dx * sp; tz = dz * sp;
      // camera từ từ về sau lưng: phím chỉ khi đi tới (A / D là bước ngang); cần điều khiển thì mọi hướng trừ lùi về phía
      // camera, để một ngón cái đẩy chéo là nhân vật rẽ và camera rẽ theo, không phải dùng ngón kia xoay camera liên tục
      camState.follow = stick?.on ? f > -0.3 : f > 0 && Math.abs(s) < 0.4 * f;
      marker.visible = false;
    }
    const k = 1 - Math.exp(-dt * (steer ? 7 : 11));
    me.vel.x += (tx - me.vel.x) * k;
    me.vel.y += (tz - me.vel.y) * k;
    const v = me.vel.length(), p = me.pos;
    if (!steer && v < 0.05) {
      me.vel.set(0, 0);
      me.keyWalk = false;
      if (me.pose === 'walk' || me.pose === 'soar') me.play('idle');
      return;
    }
    // 'grid' (Sài Gòn): bồn hoa, bờ cây chỉ cao nửa mét, vừa cất cánh đã qua được
    const high = Z.overRoofs && me.fly && me.fly.alt > (Z.overRoofs === 'grid' || Z.overRoofs === 'slots' ? 1 : 3);
    const ok = high ? (x, z) => passable(x, z, p.y)
      : Z.underRoofs && me.fly && me.fly.alt > Z.underRoofs ? (x, z) => world.grid.walkable(x, z) && !roofed(x, z)
      : world.grid.walkable;
    // gần tường hơn WALL_R: bỏ phần vận tốc lao vào tường (trượt dọc tường) rồi đẩy dần ra giữa lối (bay cao thì không đẩy)
    const [wx, wz] = high ? [0, 0] : world.grid.push(p.x, p.z), wl = Math.hypot(wx, wz);
    if (wl > 1e-4) {
      const into = -(me.vel.x * wx + me.vel.y * wz) / wl;
      if (into > 0) { me.vel.x += wx / wl * into; me.vel.y += wz / wl * into; }
    }
    const nx = p.x + me.vel.x * dt, nz = p.z + me.vel.y * dt;
    if (ok(nx, nz)) { p.x = nx; p.z = nz; }
    else if (ok(nx, p.z)) { p.x = nx; me.vel.y *= 0.5; }
    else if (ok(p.x, nz)) { p.z = nz; me.vel.x *= 0.5; }
    else me.vel.multiplyScalar(0.3);
    if (wl > 1e-4) {
      const k = Math.min(1, dt * 6), ax = p.x + wx * k, az = p.z + wz * k;
      if (ok(ax, az)) { p.x = ax; p.z = az; }
    }
    for (const a of world.others) {
      if (a.seat || (me.fly && me.fly.alt > 1)) continue;
      const ox = p.x - a.pos.x, oz = p.z - a.pos.z, d = Math.hypot(ox, oz);
      if (d < BODY_R && d > 1e-4 && ok(a.pos.x + ox / d * BODY_R, a.pos.z + oz / d * BODY_R)) {
        p.x = a.pos.x + ox / d * BODY_R;
        p.z = a.pos.z + oz / d * BODY_R;
      }
    }
    if (steer || v > 0.2) me.heading = turnTo(me.heading, headingOf(me.vel.x, me.vel.y), Math.min(1, dt * 12));
    // bay: chậm thì lơ lửng (hover), nhanh mới nghiêng người bay tới (soar)
    if (v > (me.fly ? 1.2 : 0.12)) { me.play('walk'); me.pace(me.fly ? Math.min(v, FLY_FAST) : v); } else me.play('idle');
    me.keyWalk = true;
  }

  // ---- camera cố định chỉnh tay (trường quay): tiến / lùi, trái / phải theo hướng đang nhìn, lên / xuống, xoay, ngước / cúi,
  // phóng / thu; giữ nút (hoặc phím) thì chạy liên tục. Mỗi máy nhớ góc của mình (ngang, dọc riêng) trong localStorage.
  const CAM_KEY = 'kt-studio-cam2';   // 2: góc mặc định thành góc từ ghế (2026-11-06), bỏ góc đã lưu theo mặc định cũ
  let camSet = {};
  try { camSet = JSON.parse(localStorage.getItem(CAM_KEY)) || {}; } catch { /* không đọc được: dùng mặc định */ }
  const camHold = new Map();     // trục → hướng (+1 / -1)
  const camKind = () => (camera.aspect < 1 ? 'port' : 'land');
  const copyView = (v) => ({ pos: [...v.pos], yaw: v.yaw, pitch: v.pitch, fov: v.fov });
  // góc của một góc có sẵn theo chiều màn hình
  const presetView = (p) => {
    if (p.seat) p = { land: meView() || seatView() || Z.fixedCam.presets.find(q => !q.seat).land };
    return p[camKind()] || { ...p.land, fov: Math.min(95, p.land.fov + 12) };
  };
  // góc từ ghế của mình: mắt ngồi (cao 1,15 m trên ghế, nhích 0,25 m về phía sân khấu cho khỏi thấy đầu mình), nhìn vào giữa
  // ghế MC và ghế nóng; đang ở trên sân khấu thì lấy ghế khán giả của mình; chưa ngồi thì null
  function seatView() {
    const me = world.player, mine = me?.seat && !me.seat.role ? me.seat : me?.home || null;
    const mc = world.seats.find(s => s.role === 'mc'), hot = world.seats.find(s => s.role === 'player');
    if (!mine || !mc || !hot) return null;
    const tx = (mc.pos[0] + hot.pos[0]) / 2, ty = (mc.pos[1] + hot.pos[1]) / 2 + 1, tz = (mc.pos[2] + hot.pos[2]) / 2;
    let x = mine.pos[0], y = mine.pos[1] + SEAT_EYE, z = mine.pos[2];
    const dx0 = tx - x, dz0 = tz - z, d0 = Math.hypot(dx0, dz0) || 1;
    x += dx0 / d0 * SEAT_FWD; z += dz0 / d0 * SEAT_FWD;
    const dx = tx - x, dy = ty - y, dz = tz - z;
    return { pos: [x, y, z], yaw: Math.atan2(-dx, -dz), pitch: Math.atan2(dy, Math.hypot(dx, dz)), fov: 62 };
  }
  // góc nhìn cá nhân bám theo mình ở mọi chỗ (người dùng 2026-11-07): rời ghế đi lên sân khấu, ngồi ghế chờ, ghế nóng, đứng bắt
  // tay MC, về lại ghế. Mắt ở đầu mình (ngồi 1,15 m, đứng 1,5 m); ngồi ghế nóng thì nhìn MC, ngồi ghế khác nhìn giữa sân khấu,
  // đang đi nhìn theo hướng đi, đứng cạnh MC nhìn MC. Vị trí theo từng khung; hướng nhìn chỉ xoay về đích khi đổi chỗ / đang
  // đi (tối đa ~1,6 rad/s, không giật), ngồi yên rồi thì người xem kéo nhìn quanh tự do. null: chưa vào chỗ (đang chọn ghế).
  const STAND_EYE = 1.5, AIM_RATE = 1.6;
  let followKey = null, followAim = false;
  function meView() {
    const me = world.player;
    if (!me || (!me.seat && !me.inShow)) return null;
    const mc = world.seats.find(s => s.role === 'mc'), hot = world.seats.find(s => s.role === 'player');
    if (!mc || !hot) return null;
    const host = world.others.find(o => o.host);
    const hostHead = host ? [host.pos.x, host.pos.y + (host.seat ? 1.1 : 1.5), host.pos.z] : [mc.pos[0], mc.pos[1] + 1.1, mc.pos[2]];
    const mid = [(mc.pos[0] + hot.pos[0]) / 2, (mc.pos[1] + hot.pos[1]) / 2 + 1, (mc.pos[2] + hot.pos[2]) / 2];
    const seat = me.seat, walking = !seat && me.route.length > 0;
    let x = me.pos.x, y = me.pos.y + (seat ? SEAT_EYE : STAND_EYE), z = me.pos.z, target = null, key;
    if (seat) { target = seat.role === 'player' ? hostHead : mid; key = `s:${seat.id}`; }
    else if (!walking && host && Math.hypot(host.pos.x - x, host.pos.z - z) < 2.2) { target = hostHead; key = 'host'; }
    else key = walking ? 'walk' : 'stand';
    let yaw = me.heading, pitch = walking ? -0.12 : -0.05;
    if (target) {
      const dx0 = target[0] - x, dz0 = target[2] - z, d0 = Math.hypot(dx0, dz0) || 1;
      // Ai tài năng nhất: ở ghế nóng thì nhìn qua vai (lùi sau ghế, cao hơn đầu) vì bàn người chơi che mất thầy MC (avatar thấp
      // hơn MC tu sĩ của kinh-thanh); ghế khác vẫn nhích về trước cho khỏi thấy đầu mình
      if (seat?.role === 'player') { x -= dx0 / d0 * HOT_BACK; z -= dz0 / d0 * HOT_BACK; y += HOT_UP; }
      else if (seat) { x += dx0 / d0 * SEAT_FWD; z += dz0 / d0 * SEAT_FWD; }   // nhích về phía trước cho khỏi thấy đầu mình
      const dx = target[0] - x, dy = target[1] - y, dz = target[2] - z;
      yaw = Math.atan2(-dx, -dz); pitch = Math.atan2(dy, Math.hypot(dx, dz));
    }
    return { pos: [x, y, z], yaw, pitch, fov: 62, key, walking };
  }
  function followMe(v, dt) {
    const f = meView();
    if (!f) return;
    if (camGlide) { camGlide.to.pos = f.pos; return; }   // đang lướt về góc cá nhân: đích bám theo người
    for (let i = 0; i < 3; i++) v.pos[i] = f.pos[i];
    if (f.key !== followKey) { followKey = f.key; followAim = true; }
    if (fixedDrag || camSpin) { if (!f.walking) followAim = false; return; }   // người xem đang tự nhìn quanh
    if (!followAim && !f.walking) return;
    const dy = Math.atan2(Math.sin(f.yaw - v.yaw), Math.cos(f.yaw - v.yaw)), dp = f.pitch - v.pitch;
    const step = calm ? Infinity : AIM_RATE * dt;
    v.yaw += Math.sign(dy) * Math.min(Math.abs(dy), step);
    v.pitch += Math.sign(dp) * Math.min(Math.abs(dp), step * 0.6);
    if (Math.abs(dy) < 0.01 && Math.abs(dp) < 0.01 && !f.walking) { followAim = false; camSave(); }
  }
  // góc đã chọn lần trước có phải góc từ ghế không (nhớ cùng góc nhìn, mặc định có)
  seatCam = camSet.seat ?? true;
  const goPreset = (i) => { const p = Z.fixedCam.presets[i]; seatCam = camSet.seat = !!p?.seat; followKey = null; camGo(camAll()[i].v); };
  const camView = () => (camSet[camKind()] ||= copyView(presetView(Z.fixedCam.presets[0])));
  try { localStorage.removeItem('kt-studio-cam'); } catch { /* bộ nhớ bị chặn */ }
  // góc yêu thích của người xem (lưu trên máy): { name, v }
  const FAV_KEY = 'kt-studio-cam-fav', FAV_MAX = 8;
  let camFav = [];
  try { camFav = JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch { /* không đọc được */ }
  const camAll = () => [...Z.fixedCam.presets.map(p => ({ name: t(p.name), v: presetView(p) })), ...camFav];
  // lướt tới một góc: vị trí, xoay (đường ngắn nhất), nghiêng, góc nhìn chuyển mềm trong 0,9 s (giảm chuyển động: tới ngay)
  let camGlide = null;
  function camGo(target) {
    const v = camView(), to = copyView(target);
    to.yaw = v.yaw + Math.atan2(Math.sin(to.yaw - v.yaw), Math.cos(to.yaw - v.yaw));
    camHold.clear();
    if (calm) { Object.assign(v, to); camSave(); camShow(); return; }
    camGlide = { from: copyView(v), to, t: 0 };
  }
  function camGlideTick(v, dt) {
    if (!camGlide) return;
    const g = camGlide;
    g.t = Math.min(1, g.t + dt / 0.9);
    const k = g.t < 0.5 ? 4 * g.t ** 3 : 1 - (-2 * g.t + 2) ** 3 / 2, mix = (a, b) => a + (b - a) * k;
    for (let i = 0; i < 3; i++) v.pos[i] = mix(g.from.pos[i], g.to.pos[i]);
    v.yaw = mix(g.from.yaw, g.to.yaw); v.pitch = mix(g.from.pitch, g.to.pitch); v.fov = mix(g.from.fov, g.to.fov);
    if (g.t >= 1) { camGlide = null; v.yaw = Math.atan2(Math.sin(v.yaw), Math.cos(v.yaw)); camSave(); camShow(); }
  }
  const camStop = () => { camGlide = null; camSpin = null; };
  // quán tính sau khi thả tay: tốc độ giảm theo hàm mũ (~0,25 s một nửa), dừng thì lưu góc
  function camSpinTick(v, dt) {
    if (!camSpin) return;
    v.yaw += camSpin.y * dt;
    v.pitch = THREE.MathUtils.clamp(v.pitch + camSpin.p * dt, -1.45, 0.6);
    const k = Math.exp(-dt * 2.8);
    camSpin.y *= k; camSpin.p *= k;
    if (Math.hypot(camSpin.y, camSpin.p) < 0.01) { camSpin = null; camSave(); }
    camShow(v);
  }
  // camera thật đuổi theo góc muốn (giảm chấn): xoay / nghiêng / phóng mềm, không giật theo từng sự kiện chuột / chạm
  let camCur = null;
  function camEase(v, dt) {
    if (!camCur) { camCur = copyView(v); return camCur; }
    const k = 1 - Math.exp(-dt * 11);
    for (let i = 0; i < 3; i++) camCur.pos[i] += (v.pos[i] - camCur.pos[i]) * k;
    camCur.yaw += Math.atan2(Math.sin(v.yaw - camCur.yaw), Math.cos(v.yaw - camCur.yaw)) * k;
    camCur.pitch += (v.pitch - camCur.pitch) * k;
    camCur.fov += (v.fov - camCur.fov) * k;
    return camCur;
  }
  const camEl = root.querySelector('.ch-camset'), camRead = camEl.querySelector('.ch-cam-read');
  const camPres = camEl.querySelector('.ch-cam-pres');
  // thanh góc nhìn dưới trái: mỗi góc một icon (góc có sẵn: icon riêng; góc của mình: ngôi sao + số), cuối là nút mở bảng chỉnh
  const viewsEl = root.querySelector('.ch-views'), viewsList = viewsEl.querySelector('.ch-views-list'), camBtn = viewsEl.querySelector('.ch-views-set');
  // nút các góc: có sẵn, rồi góc yêu thích (có nút xoá); phím 1–9 chọn theo thứ tự này
  function camPaint() {
    const n = Z.fixedCam?.presets.length || 0;
    viewsList.innerHTML = camAll().map((p, i) => `<button type="button" class="ch-view" data-pre="${i}" aria-pressed="false" aria-label="${p.name}" title="${p.name}${i < 9 ? ` (${i + 1})` : ''}">${icon(Z.fixedCam.presets[i]?.icon || 'star')}${i >= n ? `<b>${i - n + 1}</b>` : ''}</button>`).join('');
    camPres.innerHTML = camAll().map((p, i) => `<span class="ch-cam-pre"><button type="button" data-pre="${i}" aria-pressed="false"${i < 9 ? ` title="${t('Phím')} ${i + 1}"` : ''}>${i < 9 ? `<i>${i + 1}</i>` : ''}${p.name}</button>${i >= n
      ? `<button type="button" class="ch-cam-del" data-del="${i - n}" aria-label="${t('Xoá góc')} ${p.name}" title="${t('Xoá góc')}">${icon('x')}</button>` : ''}</span>`).join('');
  }
  viewsList.addEventListener('click', (e) => {
    const b = e.target.closest('[data-pre]');
    if (b) goPreset(+b.dataset.pre);
  });
  camPres.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.del != null) {
      camFav.splice(+b.dataset.del, 1);
      try { localStorage.setItem(FAV_KEY, JSON.stringify(camFav)); } catch { /* bộ nhớ bị chặn */ }
      camPaint(); camShow();
    } else goPreset(+b.dataset.pre);
  });
  function camSave() {
    try { localStorage.setItem(CAM_KEY, JSON.stringify(camSet)); } catch { /* bộ nhớ bị chặn */ }
  }
  function camShow(v = camView()) {
    // nút của góc đang dùng sáng lên (so từng thông số, sai số nhỏ)
    const same = (a, b) => a.pos.every((x, i) => Math.abs(x - b.pos[i]) < 0.02) && Math.abs(Math.atan2(Math.sin(a.yaw - b.yaw), Math.cos(a.yaw - b.yaw))) < 0.005
      && Math.abs(a.pitch - b.pitch) < 0.005 && Math.abs(a.fov - b.fov) < 0.3;
    const all = camAll();
    camEl.parentNode.querySelectorAll('.ch-camset [data-pre], .ch-views [data-pre]').forEach(b => b.setAttribute('aria-pressed', same(v, all[+b.dataset.pre].v)));
    const deg = (r) => Math.round(THREE.MathUtils.radToDeg(r));
    camRead.textContent = `x ${v.pos[0].toFixed(1)} · ${t('cao')} ${v.pos[1].toFixed(1)} · z ${v.pos[2].toFixed(1)} · ${t('xoay')} ${deg(Math.atan2(Math.sin(v.yaw), Math.cos(v.yaw)))}° · ${t('nghiêng')} ${deg(v.pitch)}° · ${t('góc')} ${Math.round(v.fov)}°`;
  }
  function camMove(v, dt) {
    if (!camHold.size) return;
    camStop();
    const a = (k) => camHold.get(k) || 0, f = a('fb'), s = a('lr'), sp = 3 * dt, [lo, hi] = Z.fixedCam.box;
    // tự dời camera (tiến / lùi, trái / phải, lên / xuống): thôi bám theo mình, kẻo vừa dời đã bị kéo về
    if (seatCam && (f || s || a('ud'))) { seatCam = camSet.seat = false; followKey = null; }
    v.pos[0] += (-Math.sin(v.yaw) * f + Math.cos(v.yaw) * s) * sp;
    v.pos[2] += (-Math.cos(v.yaw) * f - Math.sin(v.yaw) * s) * sp;
    v.pos[1] += a('ud') * sp;
    for (let i = 0; i < 3; i++) v.pos[i] = THREE.MathUtils.clamp(v.pos[i], lo[i], hi[i]);
    v.yaw -= a('yaw') * 0.7 * dt;
    v.pitch = THREE.MathUtils.clamp(v.pitch + a('pitch') * 0.6 * dt, -1.45, 0.6);
    v.fov = THREE.MathUtils.clamp(v.fov + a('fov') * 20 * dt, 25, 95);
    camShow(v);
  }
  function camOpen(on) {
    camEl.hidden = !on;
    camBtn.setAttribute('aria-expanded', on);
    if (on) camShow();
  }
  camBtn.onclick = () => { if (camEl.hidden) mapOpen(false); camOpen(camEl.hidden); };
  for (const b of camEl.querySelectorAll('[data-ax]')) {
    const ax = b.dataset.ax, d = +b.dataset.d;
    b.addEventListener('pointerdown', (e) => { camHold.set(ax, d); try { b.setPointerCapture(e.pointerId); } catch { /* đã nhả */ } });
    for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) b.addEventListener(ev, () => { if (camHold.get(ax) === d) { camHold.delete(ax); camSave(); } });
    b.addEventListener('contextmenu', (e) => e.preventDefault());
  }
  camEl.querySelector('[data-cam="save"]').onclick = () => {
    if (camFav.length >= FAV_MAX) { say(t('Đã đủ 8 góc, hãy xoá bớt một góc.'), 3000); return; }
    let k = 1;
    while (camFav.some(f => f.name === `${t('Góc của tôi')} ${k}`)) k++;
    const name = `${t('Góc của tôi')} ${k}`;
    camFav.push({ name, v: copyView(camView()) });
    try { localStorage.setItem(FAV_KEY, JSON.stringify(camFav)); } catch { /* bộ nhớ bị chặn */ }
    camPaint(); camShow();
    say(`${t('Đã lưu')}: ${name}.`, 2500);
  };
  camEl.querySelector('[data-cam="copy"]').onclick = () => {
    const v = camView(), text = JSON.stringify({ [camKind()]: { pos: v.pos.map(n => +n.toFixed(2)), yaw: +v.yaw.toFixed(3), pitch: +v.pitch.toFixed(3), fov: Math.round(v.fov) } });
    const done = () => say(t('Đã sao chép thông số camera.'), 2500);
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => say(text, 10000)); else say(text, 10000);
  };
  // phím (CAM_KEYS): W S tiến lùi, A D trái phải, R F lên xuống, Q E xoay, T G ngước cúi, Z X phóng thu
  function camKey(e) {
    const num = /^Digit([1-9])$/.exec(e.code);
    if (num) {
      const p = camAll()[num[1] - 1];
      if (!p) return false;
      if (e.type === 'keydown' && !e.repeat) goPreset(num[1] - 1);
      return true;
    }
    const m = CAM_KEYS[e.code];
    if (!m) return false;
    e.preventDefault();
    if (e.type === 'keydown') camHold.set(m[0], m[1]);
    else if (camHold.get(m[0]) === m[1]) { camHold.delete(m[0]); camSave(); }
    return true;
  }

  // ---- camera sau lưng ----
  const look = new THREE.Vector3(), wantPos = new THREE.Vector3(), wantLook = new THREE.Vector3();
  // Người chơi tự xoay camera (kéo, Q / E). Camera chỉ tự xoay dần về sau lưng (nhanh nhất khoảng 1 rad/s) khi đi theo
  // đường đã chạm, khi đi tới bằng cần / phím, khi ngồi hay quỳ; không lia theo từng chỗ rẽ. Vị trí và điểm nhìn đuổi theo
  // mềm nhưng đủ nhanh để không tụt lại sau lưng khi đi nhanh. Giảm chuyển động cũng giữ độ mềm này.
  let shotCam = null; // kiểm thử: chụp ảnh thẻ từ một chỗ cố định (__church.shotCam)
  // trường quay: dải câu hỏi phủ phần dưới màn (điện thoại nằm ngang thì gần nửa màn), che MC và ghế nóng. Khi đó ảnh được dời
  // lên (lens shift: setViewOffset, không đổi góc camera người xem đã chọn) vừa đủ để sàn sân khấu giữa hai ghế nằm trên mép
  // dải, nhưng không lên quá thanh tiêu đề; dời và trả về từ từ. Đo DOM 5 lần một giây.
  let lensY = 0, lensWant = 0, lensAt = 0;
  const stageP = new THREE.Vector3();
  function stageLift(dt) {
    const w = root.clientWidth, h = root.clientHeight;
    if ((lensAt -= dt) <= 0) {
      lensAt = 0.2;
      lensWant = 0;
      const ov = root.querySelector('.ch-qov'), duo = world.seats?.filter(s => s.role === 'mc' || s.role === 'player');
      if (ov && !ov.hidden && duo?.length) {
        const r0 = root.getBoundingClientRect();
        let top = ov.querySelector('.ch-qov-box')?.getBoundingClientRect().top ?? h;
        for (const el of ov.querySelectorAll('.ch-qov-helps, .ch-qov-side')) if (!el.hidden) top = Math.min(top, el.getBoundingClientRect().top);
        top -= r0.top;
        const bar = (root.querySelector('.ch-top')?.getBoundingClientRect().bottom ?? r0.top) - r0.top;
        stageP.set(0, 0, 0);
        for (const s of duo) stageP.add(new THREE.Vector3(...s.pos));
        stageP.divideScalar(duo.length);
        camera.updateMatrixWorld();
        stageP.project(camera);
        if (stageP.z < 1 && Math.abs(stageP.x) < 1) {
          const y = (1 - stageP.y) / 2 * h + lensY;   // chỗ của điểm sân khấu khi chưa dời
          lensWant = THREE.MathUtils.clamp(y - (top - 10 - 0.06 * h), 0, Math.max(0, y - bar - 70));
        }
      }
    }
    lensY += (lensWant - lensY) * (1 - Math.exp(-dt * 3));
    if (lensY > 0.5) camera.setViewOffset(w, h, 0, lensY, w, h);
    else if (camera.view?.enabled) { lensY = 0; camera.clearViewOffset(); }
  }
  function placeCamera(dt, snap = false) {
    const me = world.player;
    if (!me) return;
    if (shotCam) { camera.position.set(...shotCam[0]); camera.lookAt(...shotCam[1]); return; }
    if (Z.fixedCam) {
      // trường quay: một góc nhìn cố định, người xem tự chỉnh được (bảng Chỉnh camera, camMove)
      const v = camView();
      if (seatCam) followMe(v, dt);
      camGlideTick(v, dt);
      camSpinTick(v, dt);
      camMove(v, dt);
      const c = camEase(v, dt);
      camera.position.set(...c.pos);
      camera.rotation.set(c.pitch, c.yaw, 0, 'YXZ');
      if (Math.abs(camera.fov - c.fov) > 1e-3) { camera.fov = c.fov; camera.updateProjectionMatrix(); }
      stageLift(dt);
      // camera ngay đầu mình (góc từ ghế): giấu thân mình và vòng vàng trên đầu, kẻo che mắt
      // (mỗi khung: seatMe bật lại thân mình; chỉ trả lại thứ chính chỗ này đã giấu)
      const near = Math.hypot(c.pos[0] - me.pos.x, c.pos[1] - (me.pos.y + SEAT_EYE), c.pos[2] - me.pos.z) < 0.9;
      if (near) { me.root.visible = false; me.hideFp = true; } else if (me.hideFp) { me.root.visible = true; me.hideFp = false; }
      meRing.scale.setScalar(near || me.seat?.role === 'player' ? 1e-4 : 1);   // ghế nóng: góc qua vai, vòng che giữa màn hình
      return;
    }
    if (camera.view?.enabled) { lensY = 0; camera.clearViewOffset(); }
    const seated = !!me.seat;
    const turnQE = (keys.has('tr') ? 1 : 0) - (keys.has('tl') ? 1 : 0);
    if (turnQE) {
      if (looksOnly(me)) camState.yaw = THREE.MathUtils.clamp(camState.yaw - turnQE * 1.2 * dt, -1.4, 1.4);
      else camState.heading -= turnQE * 1.2 * dt;
    }
    if (snap) camState.heading = me.heading;
    else if (!camState.drag && !turnQE && (seated || me.pose === 'pray' || me.route.length || camState.follow || camState.align)) {
      const rate = seated ? 1.2 : 0.6;
      const diff = Math.atan2(Math.sin(me.heading - camState.heading), Math.cos(me.heading - camState.heading));
      // align: đứng trước một giá tranh, camera xoay dần về sau lưng rồi thôi
      if (camState.align && Math.abs(diff) < 0.03) camState.align = false;
      const turn = diff * (1 - Math.exp(-dt * rate));
      camState.heading += Math.sign(turn) * Math.min(Math.abs(turn), dt * 1.0);
    }
    const h = camState.heading + camState.yaw;
    camState.pitchNow += (camState.pitch - camState.pitchNow) * (snap ? 1 : 1 - Math.exp(-dt * 6));
    const p = camState.pitchNow, lift = Math.max(0, p) / PITCH_MAX;
    // nhìn lên: camera hạ thấp và lại gần để đầu nhân vật không che vòm; nhìn xuống: nâng lên một chút
    const flying = !!me.fly;
    const dist = (seated ? 1.9 : flying ? 3.2 * Math.min(2.2, 1 + me.fly.alt / 40) : 2.6) * camState.zoom * (1 - 0.35 * lift), up = (seated ? 1.5 : 1.75) - 0.5 * lift - Math.min(0, p) * 0.8;
    const base = me.ground || flying ? me.pos.y : 0;
    let reachBack = dist;
    if (Z.camClip) {
      // dò ba tia (giữa và hai bên vai) theo bước nhỏ, lấy chỗ chạm gần nhất: khoảng cách đổi liền, không nhảy theo ô lưới.
      // Phần bị tường cắt (cut) gặp tường thì co vào nhanh để không lọt vào trong; hết tường thì chờ một chút rồi mới
      // giãn ra chậm, nên đi dọc tường hay lướt qua cột camera không tiến vào lùi ra liên tục
      const fx = Math.sin(h), fz = Math.cos(h);
      let free = dist;
      // chỗ đặt camera còn trong lòng nhà: cột, ghế, giá nến ở giữa thì nhìn xuyên (occlusion.js), không co camera lại
      const open = passable(me.pos.x + fx * dist, me.pos.z + fz * dist, base + up);
      // chỗ đặt rơi vào thân cột / bệ: ngay sau đó (trong 1,2 m) còn lòng nhà thì đặt camera ra sau cột, nhìn xuyên qua;
      // sau đó vẫn là khối đặc (tường thật, ngoài nhà) thì co lại như cũ
      let behind = 0;
      if (!open) for (let s = dist + 0.2; s <= dist + 1.2; s += 0.1) {
        if (passable(me.pos.x + fx * s, me.pos.z + fz * s, base + up)) { behind = s; break; }
      }
      if (!open && !behind) for (const side of [0, -0.3, 0.3]) {
        for (let s = 0.4; s <= free; s += 0.1) {
          if (!passable(me.pos.x + fx * s - fz * side, me.pos.z + fz * s + fx * side, base + up)) { free = s; break; }
        }
      }
      const cut = free < dist ? Math.min(dist - 0.8, dist - free + 0.4) : 0;
      if (snap || cut > camState.cut) {
        camState.cut += (cut - camState.cut) * (snap ? 1 : 1 - Math.exp(-dt * 20));
        camState.cutHold = 0.6;
      } else if ((camState.cutHold -= dt) <= 0) {
        camState.cut += (cut - camState.cut) * (1 - Math.exp(-dt * 1.5));
      }
      reachBack = behind || dist - Math.max(0, camState.cut);
    }
    wantPos.set(me.pos.x + Math.sin(h) * reachBack, base + up, me.pos.z + Math.cos(h) * reachBack);
    wantLook.set(me.pos.x - Math.sin(h) * 2.5, base + (seated ? 1.3 : flying ? 1.0 : 1.15), me.pos.z - Math.cos(h) * 2.5);
    camera.position.lerp(wantPos, snap ? 1 : 1 - Math.exp(-dt * 7));
    look.lerp(wantLook, snap ? 1 : 1 - Math.exp(-dt * 9));
    if (glide) {
      // tới một chỗ thánh: camera lướt từ xa phía sau lại gần, như bước vào trước bức ảnh (trong lúc ảnh đang tải)
      glide.t = Math.min(1, glide.t + dt / glide.d);
      const k = 1 - Math.pow(1 - glide.t, 3);
      camera.position.set(wantPos.x + glide.dx * (1 - k), wantPos.y + glide.dy * (1 - k), wantPos.z + glide.dz * (1 - k));
      look.copy(wantLook);
      if (glide.t >= 1 || me.route.length || me.keyWalk) glide = null;
    }
    const reach = Math.hypot(look.x - camera.position.x, look.z - camera.position.z);
    camera.lookAt(look.x, look.y + reach * Math.tan(p), look.z);
  }

  // vòng sáng trên sàn đánh dấu chỗ chạm để đi tới, tắt dần khi tới nơi
  const marker = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.23, 40),
    new THREE.MeshBasicMaterial({ color: 0xffd98a, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
  marker.rotation.x = -Math.PI / 2;
  marker.visible = false;
  scene.add(marker);
  let markerLife = 0;
  function showMarker(x, z) {
    marker.position.set(x, 0.03 + (world.grid?.heightAt(x, z) || 0), z);
    marker.visible = true;
    markerLife = 0;
  }
  function tickMarker(dt) {
    if (!marker.visible) return;
    markerLife += dt;
    const o = marker.material;
    if (world.player.route.length) o.opacity = Math.min(0.85, o.opacity + dt * 4);
    else if ((o.opacity -= dt * 2) <= 0) { o.opacity = 0; marker.visible = false; }
    marker.scale.setScalar(calm ? 1 : 1 + 0.12 * Math.sin(markerLife * 5));
  }

  // ---- online: người thật trong cùng phòng (net.js, máy chủ phòng realtime/) ----
  let shirt = 0;   // màu áo của máy này (SHIRTS)
  try {
    const v = localStorage.getItem('kt-church-look');
    shirt = v !== null && +v >= 0 && +v < LOOKS ? +v : Math.floor(Math.random() * LOOKS);
    localStorage.setItem('kt-church-look', shirt);
  } catch { shirt = Math.floor(Math.random() * LOOKS); }
  const remotes = new Map();   // id máy chủ → Actor
  // tên trên đầu mình ở máy người khác và tên MC gọi: biệt danh (Tủ đồ → Nhân vật, nick.js), chưa đặt thì tên gọi ngắn của tài khoản
  const myName = () => bag.nick || shortName(getCurrentUser()?.name || getCurrentUser()?.email);
  let tp = 0, sent = null, sendT = 0;
  // ghế khán giả của mình cho máy chủ: đang trên sân khấu / ghế chờ (đố vui) thì là ghế đang giữ để về (home), không phải ghế
  // sân khấu (nối lại giữa lượt mà xin ghế nóng thì máy chủ trả ghế khán giả, về chỗ lại bị báo có người)
  const mySeatId = () => {
    const me = world.player, s = me.seat && !me.seat.role ? me.seat : (me.inShow || me.seat?.role) ? me.home : null;
    return s?.id || '';
  };
  const myState = () => {
    const me = world.player;
    return { x: me.pos.x, y: me.pos.y, z: me.pos.z, h: me.heading, a: me.pose || 'idle', k: tp, c: shirt, w: flyKind(myLook.fly) === 'wings' ? 1 : 0, seat: mySeatId(), n: myName(), o: encodeLook(myLook) };
  };
  let chat = null;   // chat của phòng (chat.js), có khi đã nối máy chủ phòng
  const net = ONLINE ? makeNet({
    // ra nền mà đang trên sân khấu / ghế chờ đố vui thì giữ kết nối (ngắt là mất lượt); còn lại ngắt ngay, ghế trống ra
    keep: () => !!(world.player && (world.player.inShow || world.player.seat?.role)),
    welcome(id, peers) {
      for (const a of [...remotes.values()]) removeActor(a);
      remotes.clear();
      for (const p of peers) addRemote(p);
      sent = null;   // chào xong: gửi trạng thái của mình ngay
      // ngồi xuống lúc 'hi' đã đi mà chưa được chào lại thì tin 'sit' đã bị bỏ: xin lại (ghế đã là của mình thì máy chủ giữ nguyên)
      if (world.player && mySeatId()) net.sit(mySeatId());
      countPeople();
    },
    join(p) { addRemote(p); countPeople(); },
    leave(id) { const a = remotes.get(id); if (a) { remotes.delete(id); removeActor(a); } quizOnline?.left(id); countPeople(); },
    // đố vui nhiều người (quizOnline.js): hàng chờ, bước trình diễn của người dẫn, bình chọn, người thân
    quiz(kind, ...args) { quizOnline?.[kind]?.(...args); },
    states(list) {
      const now = performance.now() / 1000;
      for (const [id, x, y, z, h, a, k] of list) { const r = remotes.get(id); if (r) hear(r, { x, y, z, h, a, k }, now); }
    },
    look(id, c, w, o) { const r = remotes.get(id); if (r) dressActor(r, o ? decodeLook(o) : legacyLook(c, w)); },
    sit(id, seat) { const r = remotes.get(id); if (r) remoteSeat(r, seat); },
    up(id) { const r = remotes.get(id); if (r) remoteSeat(r, ''); },
    say(id, name, text) { chat?.say(id, name, text); },
    says(list) { chat?.says(list); },
    // ghế mình xin đã có người xin trước: trả ghế, bước ra (trường quay: chọn ghế khác)
    refused(id) {
      const me = world.player, seat = world.seats.find(s => s.id === id);
      if (!seat || !me) return;
      if (seat.taken === me) {
        seat.taken = null;
        if (me.seat === seat) me.seat = null;
        if (!Z.fixedCam) {
          const [ex, , ez] = world.entries[seat.entry];
          me.leaving = true;
          me.walk([...(seat.lane ? [seat.lane] : []), [ex, ez]], () => { me.leaving = false; });
          refresh();
        }
      }
      for (const r of remotes.values()) if (r.seatId === id) remoteSeat(r, id);
      if (Z.fixedCam) { if (!me.seat) enterStudio(t('Ghế này vừa có người ngồi trước, bạn chọn ghế khác.')); } else say(t('Chỗ này vừa có người ngồi.'), 2500);
    },
    status(on) {
      root.classList.toggle('is-online', on);
      // mất kết nối: không để lại "bóng ma" đứng yên; nối lại thì máy chủ chào lại với danh sách mới
      if (!on) { for (const a of [...remotes.values()]) removeActor(a); remotes.clear(); }
      if (on && studio) startQuizOnline();
      quizOnline?.status(on);
      chat?.status(on);
      countPeople();
    },
  }) : null;
  if (net) chat = makeChat({ root, mount: root.querySelector('.ch-lcol'), net, calm, actorOf: (id) => (id && id === net.id ? world.player : remotes.get(id)) });
  // trường quay đã nối máy chủ phòng: đố vui nhiều người (thay bảng thử của bản dev)
  function startQuizOnline() {
    if (quizOnline || !studio || !net) return;
    quizDev?.dispose();
    quizDev = null;
    quizOnline = makeQuizOnline({
      root, studio, stage: studioShow, net,
      me: () => world.player,
      get myName() { return myName(); },
      actorOf: (id) => (id && id === net.id ? world.player : remotes.get(id)),
      ids: () => [...remotes.keys()],
      people: () => [...remotes.values()].map(a => [a, a.home || (a.seat && !a.seat.role ? a.seat : null)]).filter(([, s]) => s).map(([a, s]) => ({ id: a.remote, name: a.name, seat: seatName(s) })),
      onRight: () => { if (bag.quizRight()) seedPop(1); },
      cheer: seatGlow,
      tag: (id) => remotes.get(id)?.tag || null,
    });
  }
  function countPeople() {
    const n = net?.ready ? remotes.size + 1 : 0;
    onlineEl.hidden = !n;
    onlineEl.lastElementChild.textContent = n;
  }
  function addRemote(p) {
    if (!chars || remotes.has(p.id)) return;
    const kind = studioSite ? pupilOf(p.n || '') : 'avatar';
    const a = new Actor(chars[kind], kind);
    a.pupil = kind !== 'avatar';
    a.remote = p.id;
    a.name = p.n || '';
    a.vs = 0;
    a.wings = makeWings({ calm });
    a.wings.attach(a);
    a.extras = makeExtras(a, { scene, kit: extrasKit, calm, ground });
    dressActor(a, p.o ? decodeLook(p.o) : legacyLook(p.c, p.w));
    world.actors.push(a);
    world.others.push(a);
    scene.add(a.root);
    remotes.set(p.id, a);
    a.tag = makeNameTag(p.n, Z.fixedCam ? { fade: false, px: 0.038 } : undefined);
    if (a.tag) scene.add(a.tag.sprite);
    if (a.tag && p.qa?.[1]) a.tag.badge(`${Math.round(p.qa[0] / p.qa[1] * 100)}%`);   // % trả lời đúng (đố vui)
    // trường quay: bậc khán đài, sân khấu cao hơn sàn; người ở xa khi chương trình đưa đi (lên ghế nóng) bước theo độ cao ấy
    if (Z.fixedCam) a.ground = world.player?.ground || null;
    hear(a, p, performance.now() / 1000, true);
    remoteSeat(a, p.seat || '');
  }
  function removeActor(a) {
    scene.remove(a.root);
    a.wings?.dispose();
    a.tag?.dispose();
    a.extras?.dispose();
    a.root.traverse(o => { if (o.material?.userData?.own) o.material.dispose(); });
    for (const list of [world.actors, world.others]) { const i = list.indexOf(a); if (i >= 0) list.splice(i, 1); }
    if (a.seat?.taken === a) a.seat.taken = null;
    if (a.home?.taken === a) a.home.taken = null;   // rời phòng lúc đang trên sân khấu: trả cả ghế khán giả
    paintSeatChip();
  }
  // một gói trạng thái của người khác: xếp vào hàng để lướt tới; đổi clip thì đổi ngay; dịch chuyển tức thời (k đổi) thì đặt thẳng
  function hear(a, s, now, snap = false) {
    if (a.inShow && !snap) { a.k = s.k; return; }   // đố vui đang đưa người này đi (studioShow): máy mình tự diễn
    // trường quay, người đã có ghế: chỗ ngồi là ghế (remoteSeat), chỉ nhận các dáng ngồi (vỗ tay, mừng…), bỏ vị trí trong gói
    if (Z.fixedCam && a.seat && !a.seat.role) {
      a.k = s.k;
      if (/^sit/.test(s.a) && s.a !== a.pose) a.play(s.a, { once: s.a === 'sit', end: s.a === 'sit' && (snap || a.pose === 'sitClap'), fade: snap ? 0 : 0.35 });
      return;
    }
    if (snap || s.k !== a.k) { a.buf = []; a.pos.set(s.x, s.y, s.z); a.heading = s.h; }
    a.k = s.k;
    // đứng yên một lúc rồi mới đi: gói cũ coi như vừa gửi một nhịp trước, kẻo người ấy trườn chậm suốt quãng nghỉ
    const last = a.buf[a.buf.length - 1];
    if (last && now - last.t > SEND_GAP * 2.5) last.t = now - SEND_GAP;
    a.buf.push({ t: now, x: s.x, y: s.y, z: s.z, h: s.h });
    if (a.buf.length > 30) a.buf.shift();
    if (s.a !== a.pose) {
      if (s.a === 'bow') a.extras?.bowed();
      const sit = s.a === 'sit';
      a.play(s.a, { once: sit || s.a === 'bow' || s.a === 'shake', end: sit && (snap || a.pose === 'sitClap'), fade: snap ? 0 : 0.35 });
    }
  }
  // người thật vẽ chậm REMOTE_LAG s, lướt giữa hai gói quanh thời điểm đó; nhịp bước theo tốc độ thật; cánh theo clip bay
  function tickRemotes(dt) {
    const rt = performance.now() / 1000 - REMOTE_LAG;
    for (const a of remotes.values()) {
      if (a.inShow) continue;   // đang lên / xuống sân khấu theo chương trình: Actor.update tự đi
      const b = a.buf;
      while (b.length > 1 && b[1].t <= rt) b.shift();
      const p0 = b[0], p1 = b[1];
      if (!p0) continue;
      let { x, y, z, h } = p0;
      if (p1 && rt > p0.t) {
        const k = Math.min(1, (rt - p0.t) / Math.max(1e-3, p1.t - p0.t));
        x += (p1.x - x) * k; y += (p1.y - y) * k; z += (p1.z - z) * k;
        h += Math.atan2(Math.sin(p1.h - h), Math.cos(p1.h - h)) * k;
      }
      const v = Math.hypot(x - a.pos.x, z - a.pos.z) / Math.max(dt, 1e-3);
      a.vs += (v - a.vs) * Math.min(1, dt * 8);
      a.pos.set(x, y, z);
      a.heading = h;
      a.pace(a.vs);
      const flying = a.pose === 'hover' || a.pose === 'soar';
      a.wings.set(flying ? a.pose : 'folded');
      a.wings.update(dt, flying && a.action ? a.action.time / a.action.getClip().duration : null);
    }
  }
  // thẻ tên theo đầu (sau khi xương đã chạy hoạt ảnh của khung hình này)
  function tickTags() {
    for (const a of remotes.values()) a.tag?.update(a, camera);
    declutter([...remotes.values()].map(a => a.tag), camera, root.clientWidth, root.clientHeight);   // thẻ sát nhau xếp bậc thang
  }
  // ghế của người khác (máy chủ đã giữ cho họ): người giả đang ngồi đó trên máy mình thì nhường chỗ. Trường quay: người chưa
  // có ghế (còn ở bước chọn chỗ, enterStudio) không hiện, kẻo đứng giữa lối trước hàng A
  function remoteSeat(a, id) {
    if (a.inShow) { a.seatId = id; return; }   // đang trên sân khấu / ghế chờ: chương trình đưa về ghế của họ sau
    if (a.seat?.taken === a) a.seat.taken = null;
    a.seat = null;
    a.seatId = id;
    a.root.visible = !Z.fixedCam;
    const seat = id && world.seats.find(s => s.id === id);
    if (!seat || seat.taken === world.player) return;   // mình cũng đang xin ghế này: chờ máy chủ báo ai được
    if (seat.taken && !seat.taken.remote) removeActor(seat.taken);
    seat.taken = a;
    a.seat = seat;
    a.root.visible = true;
    // trường quay: không ai tự đi, người có ghế ngồi ngay trên ghế ấy, không chờ gói vị trí (gói 'hi' gửi lúc họ còn ở bước chọn
    // chỗ, hay tab họ ẩn nên chưa gửi vị trí đã ngồi: trước đây ghế báo có người mà người thì ở chỗ khác, không thấy)
    if (Z.fixedCam) {
      a.buf = [{ t: performance.now() / 1000, x: seat.pos[0], y: seat.pos[1], z: seat.pos[2], h: seat.heading ?? 0 }];
      sitAt(a, seat, { end: true, fade: 0 });
    }
    paintSeatChip();
  }
  // gửi trạng thái của mình khi đổi (đi, quay, đổi clip, dịch chuyển), tối đa 8 lần một giây; đổi clip / dịch chuyển gửi ngay
  function netTick(dt) {
    if (!net?.ready || !world.player) return;
    sendT -= dt;
    const s = myState();
    if (sent && s.a === sent.a && s.k === sent.k) {
      if (sendT > 0) return;
      const still = Math.abs(s.x - sent.x) < 0.02 && Math.abs(s.y - sent.y) < 0.02 && Math.abs(s.z - sent.z) < 0.02
        && Math.abs(Math.atan2(Math.sin(s.h - sent.h), Math.cos(s.h - sent.h))) < 0.02;
      if (still) return;
    }
    net.state(s);
    sent = s;
    sendT = SEND_GAP;
  }

  // ---- vòng lặp ----
  const timer = new THREE.Timer();
  const shadowAxes = new THREE.Matrix4(), shadowX = new THREE.Vector3(), shadowY = new THREE.Vector3();
  const ORIGIN = new THREE.Vector3(), UP = new THREE.Vector3(0, 1, 0);
  let bowShown = false;
  renderer.setAnimationLoop(() => {
    if (V2 && world.player) {
      // khung bóng đổ theo người chơi nhưng chỉ nhảy từng ô điểm ảnh của bản đồ bóng: trượt liên tục làm mép bóng rung trên sàn
      shadowAxes.lookAt(SUN, ORIGIN, UP);
      shadowX.setFromMatrixColumn(shadowAxes, 0);
      shadowY.setFromMatrixColumn(shadowAxes, 1);
      const cell = (sun.shadow.camera.right - sun.shadow.camera.left) / sun.shadow.mapSize.x;
      const p = world.player.pos, a = p.dot(shadowX), b = p.dot(shadowY);
      sun.target.position.copy(p)
        .addScaledVector(shadowX, Math.round(a / cell) * cell - a)
        .addScaledVector(shadowY, Math.round(b / cell) * cell - b);
      sun.position.copy(sun.target.position).add(SUN);
    } else sun.position.copy(SUN);
    timer.update();
    if (paused) return; // đang xem phim mở từ bảng các thánh
    const rawDt = timer.getDelta();
    if (world.player) dprTick(rawDt);
    const dt = Math.min(rawDt, 0.1) * ((import.meta.env.DEV && window.__churchSpeed) || 1); // kiểm thử: __churchSpeed tua nhanh
    if (!world.player) { skyCtl.update(camera, null); renderer.render(scene, camera); return; }
    const me = world.player;
    inputMove(dt);
    flyTick(dt);
    tickRemotes(dt);
    for (const a of world.actors) {
      if (a.wander && !a.route.length && a.busy <= 0 && (a.wait -= dt) <= 0) {
        const [x, z] = randomSpot(Math.random);
        a.walk(world.grid.path(a.pos.x, a.pos.z, x, z), () => { a.wait = 3 + Math.random() * 8; });
        a.wait = 1;
      }
      a.update(dt);
    }
    for (let i = glows.length - 1; i >= 0; i--) {
      const g = glows[i];
      g.life += dt;
      const k = g.life < 0.3 ? g.life / 0.3 : Math.max(0, 1 - (g.life - 3) / 1.2);
      const pulse = calm ? 1 : 0.75 + 0.25 * Math.sin(g.life * 7);
      g.ring.material.opacity = 0.9 * k * pulse;
      g.beam.material.opacity = 0.42 * k * pulse;
      if (!calm) g.ring.rotation.z += dt * 1.5;
      if (g.life > 4.2 && k <= 0) { scene.remove(g.root); g.root.traverse(o => { o.geometry?.dispose(); o.material?.dispose(); }); glows.splice(i, 1); }
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.life += dt;
      s.m.position.y += dt * 0.5;
      s.m.material.opacity = Math.max(0, 1 - s.life / 2.5);
      s.m.children[0].material.opacity = 0.35 * s.m.material.opacity;
      if (s.life > 2.5) { scene.remove(s.m); s.m.geometry.dispose(); s.m.material.dispose(); s.m.children[0].geometry.dispose(); s.m.children[0].material.dispose(); sparks.splice(i, 1); }
    }
    if (!camState.drag) {
      // liếc nhìn khi ngồi / quỳ giữ nguyên, chỉ về sau lưng khi bắt đầu đi
      if (me.route.length || me.keyWalk) camState.yaw *= Math.exp(-dt * 2);
      // góc nhìn lên / xuống giữ nguyên khi đứng hay ngồi ngắm; đi thì từ từ về ngang tầm mắt
      if (me.route.length || me.keyWalk) camState.pitch *= Math.exp(-dt * 1.2);
    }
    // cánh: xếp sau lưng khi đi bộ, vỗ theo nhịp clip hover / soar khi bay
    me.wings.set(me.fly ? (me.pose === 'soar' ? 'soar' : 'hover') : 'folded');
    me.wings.update(dt, me.fly && me.action ? me.action.time / me.action.getClip().duration : null);
    netTick(dt);
    placeCamera(dt);
    tickTags();
    me.extras?.update(dt);
    for (const a of remotes.values()) a.extras?.update(dt);
    for (const o of world.boards || []) o.rotation.y = Math.atan2(camera.position.x - o.position.x, camera.position.z - o.position.z);
    tickMarker(dt);
    tickRing(timer.getElapsed());
    shrines?.update(dt, me, timer.getElapsed());
    const canBow = !me.seat && !me.fly && !!nearestOther();
    if (canBow !== bowShown) { bowShown = canBow; btn('bow').hidden = !canBow; }
    skyCtl.update(camera, me.pos);
    crypt?.update(dt, { hemi, sun, renderer, me });
    studio?.update(dt, { hemi, sun, renderer });
    night?.update(skyCtl.dark, camera);
    fairy?.update(skyCtl.dark, timer.getElapsed(), renderer.domElement.height);
    charLift.value = 0.05 + 0.4 * Math.max(skyCtl.dark, crypt ? 0.8 : studio ? 0.6 : 0);
    fountains?.update(skyCtl.dark);
    beams?.update(skyCtl.sun);
    motes?.update(dt, skyCtl.dark, renderer.getPixelRatio());
    if ((occT -= dt) <= 0) { occT = 1; occludeAll(); }
    camera.updateMatrixWorld();
    chat?.tick(camera);
    updateOcclusion(camera, renderer, me.pos, !paused && !Z.fixedCam);
    renderer.render(scene, camera);
  });

  return function dispose() {
    gone = true;
    document.removeEventListener('fullscreenchange', fullPaint);
    document.removeEventListener('webkitfullscreenchange', fullPaint);
    if (weFull && fsEl()) (document.exitFullscreen || document.webkitExitFullscreen)?.call(document)?.catch?.(() => {});
    removeEventListener('kt:seeds', onSeeds);
    thumbs?.dispose();
    preview?.dispose();
    net?.close();
    holdUpdates(false);
    clearTimeout(msgTimer);
    clearInterval(skyTimer);
    clearInterval(mapTimer);
    renderer.setAnimationLoop(null);
    ro.disconnect();
    removeEventListener('keydown', onKey);
    removeEventListener('keyup', onKey);
    shrines?.dispose();
    skyCtl.dispose();
    night?.dispose();
    fairy?.dispose();
    fountains?.dispose();
    beams?.dispose();
    plaques?.dispose();
    motes?.dispose();
    crypt?.dispose();
    studio?.dispose();
    quizDev?.dispose();
    quizOnline?.dispose();
    chat?.dispose();
    scene.traverse(o => {
      o.geometry?.dispose();
      for (const m of [].concat(o.material || [])) { for (const v of Object.values(m)) if (v?.isTexture) v.dispose(); m.dispose(); }
    });
    if (scene.background?.isTexture) scene.background.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  };
}
