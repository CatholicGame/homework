/**
 * Trường quay "Ai là môn đệ thông thái" (khu 'studio', church-online/blender/scripts/build_studio.py): màn hình lớn sau sân khấu, đèn sân khấu,
 * luồng sáng quét chậm, viền sân khấu sáng nhịp nhàng. Ánh sáng không theo giờ: sau sky.update thay bằng ánh đèn trường quay
 * (như crypt.js thay bằng bóng tối của hầm).
 * Màn hình: treo ảnh nền của chương trình (POSTER; chưa có thì chiếu lần lượt ảnh thật của các phim, public/real, mờ chuyển,
 * phóng chậm); câu hỏi hiện ở lớp phủ (board), không vẽ lên màn hình. play(url) chiếu một
 * video (mp4 / webm, tắt tiếng để tự chạy được; chạm vào màn hình thì bật / tắt tiếng), stop() về ảnh.
 * Phòng tối, ánh sáng từ đèn sân khấu và đèn neon: hai vòng mép sân khấu, vòng sáng dưới ghế MC và ghế nóng, khung màn
 * hình; cùng với các dải sáng của mô hình (st_rim mép sân khấu, st_strip tường, st_step_led bậc lối đi,
 * st_monitor bàn điều khiển) chúng đổi màu theo chế độ cue(mode) (MODES: chờ, câu hỏi, chốt đáp án, đúng, sai, thắng):
 * màu chuyển mềm, vệt sáng chạy vòng (chase), chớp khi đúng / sai, rồi về chế độ chờ. Giảm chuyển động: không chớp,
 * không chạy vòng, chỉ đổi màu.
 */
import { loadChequeFonts } from '../pages/cheque.js';
import { makeLadder } from './ladder.js';
import { HOT, hotKeep } from '../engine/seeds.js';
import * as THREE from 'three';
import { quizSfx } from './quizSfx.js';

// ảnh chiếu chờ: nhà thờ, linh địa, các thánh (public/real, đã có giấy phép, xem index.js của từng phim)
const SLIDES = ['linh-dia-duc-ba-sai-gon', 'linh-dia-la-vang', 'linh-dia-phat-diem', 'linh-dia-nha-tho-lon-ha-noi', 'phep-la-lo-duc',
  'phep-la-fatima', 'linh-dia-bai-dau', 'phep-la-guadalupe', 'linh-dia-tra-kieu', 'phep-la-thanh-phanxico'];
const HOLD = 7, FADE = 1.6;   // giây mỗi ảnh, giây mờ chuyển
// ảnh nền của chương trình "Ai là môn đệ thông thái" treo trên màn hình lớn (16:9, JPEG); chưa có thì chiếu SLIDES
/**
 * Ảnh nền màn hình lớn của "Ai tài năng nhất?" (16:9): nền xanh đêm, tia sáng, chữ chương trình, các dấu phép tính và ngôi sao bay.
 * Hình của mình, không theo ảnh của chương trình truyền hình nào.
 */
function posterArt(cx, W, H) {
  const g = cx.createRadialGradient(W / 2, H * 0.45, 40, W / 2, H * 0.5, W * 0.7);
  g.addColorStop(0, '#2b4fd6'); g.addColorStop(0.55, '#14246e'); g.addColorStop(1, '#070b2a');
  cx.fillStyle = g; cx.fillRect(0, 0, W, H);
  cx.save(); cx.translate(W / 2, H * 0.46);
  for (let i = 0; i < 24; i++) {   // tia sáng toả ra
    cx.rotate(Math.PI / 12);
    cx.fillStyle = i % 2 ? 'rgba(120,170,255,0.10)' : 'rgba(255,214,90,0.08)';
    cx.beginPath(); cx.moveTo(0, 0); cx.lineTo(W, -60); cx.lineTo(W, 60); cx.closePath(); cx.fill();
  }
  cx.restore();
  const starAt = (x, y, r, c) => { cx.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; cx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } cx.closePath(); cx.fillStyle = c; cx.fill(); };
  const sym = ['+', '−', '×', ':', '=', '½', 'π', '%', '7', '3', '9'];
  for (let i = 0; i < 26; i++) {   // dấu phép tính và số mờ bay quanh
    const x = (i * 197) % W, y = (i * 113 + 40) % H;
    if (Math.abs(x - W / 2) < 330 && Math.abs(y - H * 0.46) < 150) continue;
    cx.fillStyle = 'rgba(190,215,255,0.22)'; cx.font = `800 ${36 + (i % 4) * 14}px "Baloo 2", "Nunito", sans-serif`; cx.textAlign = 'center';
    cx.fillText(sym[i % sym.length], x, y);
  }
  for (let i = 0; i < 14; i++) starAt((i * 271 + 90) % W, (i * 157 + 70) % H, 6 + (i % 3) * 5, 'rgba(255,214,90,0.8)');
  // vòng tròn vàng quanh tên chương trình
  cx.lineWidth = 10; cx.strokeStyle = '#ffd25a'; cx.beginPath(); cx.ellipse(W / 2, H * 0.46, 380, 170, 0, 0, Math.PI * 2); cx.stroke();
  cx.lineWidth = 3; cx.strokeStyle = 'rgba(255,240,180,0.7)'; cx.beginPath(); cx.ellipse(W / 2, H * 0.46, 400, 188, 0, 0, Math.PI * 2); cx.stroke();
  cx.fillStyle = 'rgba(8,16,60,0.82)'; cx.beginPath(); cx.ellipse(W / 2, H * 0.46, 372, 162, 0, 0, Math.PI * 2); cx.fill();
  cx.textAlign = 'center'; cx.textBaseline = 'middle';
  cx.font = '800 64px "Baloo 2", "Nunito", sans-serif'; cx.fillStyle = '#ffffff';
  cx.fillText('AI TÀI', W / 2, H * 0.46 - 72);
  const tg = cx.createLinearGradient(0, H * 0.46 - 40, 0, H * 0.46 + 70);
  tg.addColorStop(0, '#fff3b0'); tg.addColorStop(0.5, '#ffc83d'); tg.addColorStop(1, '#f08a00');
  cx.font = '800 100px "Baloo 2", "Nunito", sans-serif'; cx.lineWidth = 10; cx.strokeStyle = '#7a3c00';
  cx.strokeText('NĂNG NHẤT?', W / 2, H * 0.46 + 22); cx.fillStyle = tg; cx.fillText('NĂNG NHẤT?', W / 2, H * 0.46 + 22);
  starAt(W / 2 - 330, H * 0.46 - 120, 28, '#ffd25a'); starAt(W / 2 + 330, H * 0.46 + 120, 22, '#ffd25a');
  cx.font = '700 34px "Nunito", sans-serif'; cx.fillStyle = '#cfe0ff';
  cx.fillText('Đấu trường toán học tiểu học', W / 2, H * 0.86);
}

// Chế độ đèn neon. Màu theo nhóm: stage (mép sân khấu), hot (vòng dưới ghế nóng, đèn rọi ghế nóng), host (vòng
// dưới ghế MC), wall (dải tường), aisle (đèn bậc), screen (khung màn hình, màn bàn điều khiển). gain: độ sáng, pulse: biên độ
// thở, beat: nhịp thở (lần/s), chase: vệt chạy vòng (0..1), speed: tốc độ vệt, flash: số lần chớp lúc vào chế độ,
// dur: sau chừng ấy giây thì về chế độ `then` (chế độ thoáng qua).
// Đầu đèn trên trần: sweep [bán kính, tốc độ] của vệt quét (nhân với lúc chờ), focus 0..1 dồn luồng sáng về ghế nóng,
// beamGain độ sáng luồng, strobe kiểu nháy ('all' cả giàn chớp cùng lúc, 'chase' sáng lần lượt từng đèn, 'sparkle' nháy ngẫu nhiên), beamC màu xen kẽ.
export const MODES = {
  idle: { stage: 0x8a5cff, hot: 0xb07cff, host: 0x6f8cff, wall: 0x4a55ff, aisle: 0x5b7bff, screen: 0x58d8ff, gain: 1, pulse: 0.15, beat: 0.25, chase: 0.35, speed: 0.15, sweep: [1, 1] },
  question: { stage: 0x2f8bff, hot: 0x56c8ff, host: 0x56c8ff, wall: 0x2a5dff, aisle: 0x3aa0ff, screen: 0x56c8ff, gain: 1.1, pulse: 0.2, beat: 0.6, chase: 0.6, speed: 0.4, sweep: [1.1, 1.8] },
  lock: { stage: 0xff8a1e, hot: 0xffa53a, host: 0x6f8cff, wall: 0xb4561a, aisle: 0xff9a2a, screen: 0xffb347, gain: 1.15, pulse: 0.35, beat: 1.1, chase: 0.2, speed: 0.1, sweep: [0.25, 0.6], focus: 0.85 },
  right: { stage: 0x2cff8a, hot: 0x2cff8a, host: 0x2cff8a, wall: 0x1fd06c, aisle: 0x2cff8a, screen: 0x7dffb6, gain: 1.6, pulse: 0.1, beat: 2, chase: 1, speed: 1.2, flash: 3, dur: 4.5, then: 'idle',
    sweep: [2.4, 5], strobe: 'chase', beamC: [0x2cff8a, 0xeafff2] },
  wrong: { stage: 0xff2d4a, hot: 0xff2d4a, host: 0x6f8cff, wall: 0x8a1426, aisle: 0xff2d4a, screen: 0xff5a6e, gain: 1.3, pulse: 0.05, beat: 0.5, chase: 0, speed: 0, flash: 2, dur: 1.6, then: 'sad',
    sweep: [0.12, 0], focus: 1, strobe: 'all', beamC: [0xff3a50], beamGain: 1.9 },
  // đang dùng trợ giúp: tím hồng, luồng sáng quét đều qua khán phòng
  help: { stage: 0xd05cff, hot: 0xff6fd8, host: 0x6f8cff, wall: 0x7a3cff, aisle: 0xd05cff, screen: 0xff9af0, gain: 1.2, pulse: 0.25, beat: 0.8, chase: 0.8, speed: 0.6,
    sweep: [2, 1.6], beamC: [0xff6fd8, 0x9a7cff] },
  // sau câu sai: cả phòng chìm xuống, neon tím lạnh thở rất chậm, đèn rọi và luồng sáng mờ hẳn (ở yên tới câu / ván mới)
  sad: { stage: 0x26306e, hot: 0x3b2a6a, host: 0x2c3c78, wall: 0x141a40, aisle: 0x1c2550, screen: 0x3a4a8a, gain: 0.3, pulse: 0.1, beat: 0.1, chase: 0, speed: 0, spot: 0.2, beam: 0.2, sweep: [0.5, 0.25] },
  win: { stage: 0xffc640, hot: 0xffe08a, host: 0xffc640, wall: 0xff9f2e, aisle: 0xffc640, screen: 0xfff1b8, gain: 1.7, pulse: 0.2, beat: 2.4, chase: 1, speed: 1.8, flash: 4, dur: 7, then: 'idle',
    sweep: [2.8, 6], strobe: 'sparkle', beamC: [0xffc640, 0xffffff, 0xff9f2e], beamGain: 1.3 },
};
// bốn quyền trợ giúp: 50:50, hỏi khán giả, bỏ qua câu hỏi (sang câu sau, không dùng được ở câu 15), hỏi người thân (gọi điện
// hoặc người thân dưới khán phòng)
export const HELPS = ['fifty', 'audience', 'skip', 'friend'];
const HELP_NAME = { fifty: '50:50', audience: 'Hỏi ý kiến khán giả', skip: 'Bỏ qua câu hỏi', friend: 'Hỏi người thân' };
const HELP_ICON = {
  fifty: '<text x="12" y="15.5" text-anchor="middle" font-size="8.5" font-weight="800" fill="currentColor" stroke="none">50:50</text>',
  audience: '<path d="M5 20V12M10 20V6M15 20v-9M20 20V9"/><path d="M3 20h19"/>',
  skip: '<path d="M5 5l9 7-9 7z"/><path d="M18 5v14"/>',
  friend: '<path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/>',
};
const GROUPS = ['stage', 'hot', 'host', 'wall', 'aisle', 'screen'];
const WARM = 0xffe6c2;
// ghế chờ (x, z) trên sàn bên phải sân khấu, độ cao mặt đệm WAIT_H (ghế khán giả 0,42)
const WAIT = [[7.1, -6.1], [7.1, -7.3]];
const WAIT_H = 0.45;  // đèn rọi ghế lúc chờ

/** Trường quay của khu `zone` (null nếu khu khác). layout: screen, stage, lamps. */
export function makeStudio({ scene, root, zone, layout, calm, renderer, ui, onApplause }) {
  if (zone !== 'studio' || !layout.screen) return null;
  quizSfx.preload();   // tải sẵn âm thanh chương trình (src/SFX) trong lúc người xem chọn ghế
  // Ai tài năng nhất: studio.glb của kinh-thanh xếp ghế vàng thành hình thánh giá trong mỗi khối (st_seat_x): tô cùng màu ghế thường
  const PLAIN = { st_seat_x: 'st_seat', st_seat_back_x: 'st_seat_back' };
  const mats = {};
  root.traverse(o => { for (const m of [].concat(o.material || [])) mats[m.name] = m; });
  for (const [x, plain] of Object.entries(PLAIN)) if (mats[x] && mats[plain]) mats[x].color.copy(mats[plain].color);
  const group = new THREE.Group();
  scene.add(group);
  const disposers = [];
  const own = (x) => { disposers.push(() => x.dispose?.()); return x; };

  // ---- màn hình: treo ảnh nền của chương trình (POSTER, 16:9), chưa có ảnh ấy thì chiếu lần lượt ảnh thật của các phim;
  // video thì thay map bằng VideoTexture. Câu hỏi không vẽ lên màn hình mà hiện ở lớp phủ (board bên dưới). Canvas gấp đôi
  // 1280×720 (LW × LH), lọc dị hướng tối đa, mipmap mịn hơn nửa bậc (bias −0,6): nhìn xiên từ cuối phòng ảnh vẫn nét
  const { center, w, h } = layout.screen;
  const LW = 1280, LH = 720, RES = matchMedia('(pointer: coarse)').matches ? 1.5 : 2;
  const cv = document.createElement('canvas');
  cv.width = LW * RES; cv.height = LH * RES;
  const cx = cv.getContext('2d');
  cx.setTransform(RES, 0, 0, RES, 0, 0);
  cx.fillStyle = '#0b0d0c'; cx.fillRect(0, 0, LW, LH);
  const slideTex = own(new THREE.CanvasTexture(cv));
  slideTex.colorSpace = THREE.SRGBColorSpace;
  slideTex.anisotropy = renderer?.capabilities.getMaxAnisotropy() || 1;
  const screenMat = own(new THREE.MeshBasicMaterial({ map: slideTex, toneMapped: false }));
  screenMat.onBeforeCompile = (sh) => {
    sh.fragmentShader = sh.fragmentShader.replace('texture2D( map, vMapUv )', 'texture2D( map, vMapUv, -0.6 )');
  };
  screenMat.customProgramCacheKey = () => 'st-screen';
  const screen = new THREE.Mesh(own(new THREE.PlaneGeometry(w, h)), screenMat);
  screen.position.set(...center);
  screen.name = 'st_screen_live';
  group.add(screen);
  // ánh màn hình hắt xuống sân khấu (một đèn điểm, màu theo ảnh đang chiếu)
  const spill = new THREE.PointLight(0xffffff, 0, 16, 1.6);
  spill.position.set(center[0], center[1] - 1, center[2] + 3);
  group.add(spill);

  // ảnh nền "Ai tài năng nhất?" (public/thandong/poster.jpg, 16:9); lúc ảnh chưa về thì vẽ bằng canvas (posterArt)
  const poster = new Image();
  let posterOk = true, drawn = -1;
  poster.onload = () => { drawn = -1; };
  poster.src = '/thandong/poster.jpg';
  loadChequeFonts().then(() => { drawn = -1; }, () => {});   // chữ Baloo 2 về thì vẽ lại
  let imgs = null, cur = 0, clock = 0, video = null, videoTex = null;
  const avg = new THREE.Color(0.6, 0.55, 0.5);
  function cover(im, a, zoom) {
    if (!im.complete || !im.naturalWidth) return false;
    const k = Math.max(LW / im.naturalWidth, LH / im.naturalHeight) * zoom;
    const iw = im.naturalWidth * k, ih = im.naturalHeight * k;
    cx.globalAlpha = a;
    cx.drawImage(im, (LW - iw) / 2, (LH - ih) / 2, iw, ih);
    cx.globalAlpha = 1;
    return true;
  }
  function paintPoster() {
    const key = poster.complete && poster.naturalWidth ? 'poster-img' : 'poster';
    if (drawn === key) return;
    drawn = key;
    if (key === 'poster-img') cover(poster, 1, 1); else posterArt(cx, LW, LH);
    slideTex.needsUpdate = true;
  }
  function paintSlides(dt) {
    imgs ||= SLIDES.map(id => { const im = new Image(); im.src = `/real/${id}.jpg`; return im; });
    clock += dt;
    if (clock > HOLD + FADE) { clock -= HOLD + FADE; cur = (cur + 1) % imgs.length; }
    const f = clock > HOLD ? (clock - HOLD) / FADE : 0;
    // giảm chuyển động: không phóng, chỉ vẽ lại lúc chuyển ảnh
    const key = calm ? `${cur}:${Math.round(f * 20)}` : null;
    if (calm && key === drawn) return;
    drawn = key;
    const zoom = (t) => (calm ? 1 : 1.02 + 0.06 * t);
    cx.fillStyle = '#0b0d0c'; cx.fillRect(0, 0, LW, LH);
    cover(imgs[cur], 1, zoom(clock / (HOLD + FADE)));
    if (f > 0) cover(imgs[(cur + 1) % imgs.length], f, zoom((clock - HOLD) / (HOLD + FADE)));
    slideTex.needsUpdate = true;
  }

  // ---- đèn sân khấu: hai đèn rọi vào ghế MC và ghế người chơi, đèn hắt chung từ trên
  const stage = new THREE.Vector3(...layout.stage.center);
  const spots = [];
  for (const seat of layout.seats.filter(s => s.role)) {
    const L = new THREE.SpotLight(WARM, 30, 18, 0.32, 0.6, 1.4);
    L.position.set(seat.pos[0] * 1.6, 8.4, seat.pos[2] + 5);
    L.target.position.set(seat.pos[0], seat.pos[1] + 0.6, seat.pos[2]);
    L.userData.role = seat.role;
    group.add(L, L.target);
    spots.push(L);
  }
  const wash = new THREE.SpotLight(0xfff0dc, 40, 26, 0.75, 0.8, 1.2);
  wash.position.set(0, 9.5, stage.z + 9);
  wash.target.position.copy(stage);
  group.add(wash, wash.target);

  // ---- luồng sáng: nón mờ cộng màu từ các đầu đèn trên giàn, quét chậm qua sân khấu
  const beamMat = own(new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    uniforms: { color: { value: new THREE.Color() } },
    vertexShader: `varying float vY; varying vec3 vN; varying vec3 vV;
      #include <common>
      #include <logdepthbuf_pars_vertex>
      void main() { vY = uv.y; vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
        #include <logdepthbuf_vertex>
      }`,
    fragmentShader: `uniform vec3 color; varying float vY; varying vec3 vN; varying vec3 vV;
      #include <logdepthbuf_pars_fragment>
      void main() {
        #include <logdepthbuf_fragment>
        float edge = pow(abs(dot(vN, vV)), 1.6);
        gl_FragColor = vec4(color * edge * pow(vY, 1.4) * 0.22, 1.0);
      }`,
  }));
  const BEAM_COLORS = [0xb89cff, 0x7fc8ff, 0xff9ad8, 0xcfc2ff];
  // quầng tròn mềm: mắt đèn LED sáng trên giàn và vệt sáng nơi luồng chạm sàn sân khấu
  const gc = document.createElement('canvas');
  gc.width = gc.height = 64;
  const gx = gc.getContext('2d'), grad = gx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, '#fff'); grad.addColorStop(0.25, 'rgba(255,255,255,0.55)'); grad.addColorStop(1, 'rgba(255,255,255,0)');
  gx.fillStyle = grad; gx.fillRect(0, 0, 64, 64);
  const glowTex = own(new THREE.CanvasTexture(gc));
  const poolGeo = own(new THREE.PlaneGeometry(2.6, 2.6));
  poolGeo.rotateX(-Math.PI / 2);
  const hot = layout.seats.find(s => s.role === 'player');
  const hotAim = hot ? new THREE.Vector3(hot.pos[0], stage.y, hot.pos[2]) : stage.clone();
  const beams = [];
  const stageLamps = (layout.lamps || []).filter(p => Math.abs(p[2] - stage.z) < 6.5);
  stageLamps.forEach((p, i) => {
    const len = p[1] - stage.y;
    const geo = own(new THREE.CylinderGeometry(0.12, 1.1, len, 24, 1, true));
    geo.translate(0, -len / 2, 0);
    const m = beamMat.clone();
    own(m);
    const base = new THREE.Color(BEAM_COLORS[i % BEAM_COLORS.length]);
    m.uniforms.color.value = base.clone();
    const pivot = new THREE.Group();
    pivot.position.set(...p);
    const cone = new THREE.Mesh(geo, m);
    cone.name = 'st_beam';
    pivot.add(cone);
    group.add(pivot);
    // hướng về một điểm trên sân khấu, quét quanh điểm ấy
    const aim = new THREE.Vector3(stage.x + (p[0] - stage.x) * 0.25, stage.y, stage.z + (p[2] - stage.z) * 0.25);
    const add = { transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false, map: glowTex };
    const lens = new THREE.Sprite(own(new THREE.SpriteMaterial(add)));
    lens.scale.setScalar(0.9);
    lens.position.set(p[0], p[1] - 0.12, p[2]);
    lens.name = 'st_beam';
    const pool = new THREE.Mesh(poolGeo, own(new THREE.MeshBasicMaterial(add)));
    pool.name = 'st_beam';
    pool.renderOrder = 1;
    group.add(lens, pool);
    beams.push({ pivot, mat: m, aim, base, col: base.clone(), lens, pool, ph: i * 1.7, r: 1.2 + (i % 3) * 0.6, dir: i % 2 ? -1 : 1 });
  });
  const tmp = new THREE.Vector3(), up = new THREE.Vector3(0, -1, 0);
  // sw: pha quét (cộng dồn theo tốc độ, đổi chế độ không giật), sweepR / focus: đuổi theo giá trị của chế độ
  let sw = 0, sweepR = 1, sweepS = 1, focus = 0, bg = 1;
  function aimBeams() {
    for (const b of beams) {
      tmp.copy(b.aim).lerp(hotAim, focus);
      if (!calm) {
        tmp.x += Math.sin(sw * 0.35 * b.dir + b.ph) * b.r * sweepR;
        tmp.z += Math.cos(sw * 0.27 + b.ph * 1.3) * b.r * sweepR;
      }
      tmp.y = stage.y + 0.03;
      b.pool.position.copy(tmp);
      const d = tmp.sub(b.pivot.position).normalize();
      b.pivot.quaternion.setFromUnitVectors(up, d);
    }
  }
  aimBeams();
  // độ sáng của đầu đèn thứ i theo kiểu nháy của chế độ (giảm chuyển động: không nháy)
  const hash = (n) => { const x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x); };
  function strobeAt(M, i, t) {
    if (calm || !M.strobe) return 1;
    const n = beams.length;
    if (M.strobe === 'all') return t < 0.8 ? (Math.floor(t / 0.09) % 2 ? 0.08 : 1.6) : 1;
    // mở màn: cả giàn chớp nhanh, rồi mới sang kiểu riêng
    if (t < 0.9) return Math.floor(t / 0.075) % 2 ? 0.1 : 1.7;
    if (M.strobe === 'chase') return 0.25 + 1.4 * Math.max(0, Math.cos(t * 9 - (i / n) * 6.2832)) ** 4;
    return hash(i * 31 + Math.floor(t * 9)) > 0.45 ? 1.6 : 0.3;   // sparkle
  }

  // ---- đèn neon: ống sáng (lõi) + quầng mờ cộng màu quanh nó; vệt chạy theo uv (vòng: uv.x, ống thẳng: uv.y)
  const neonMat = (glow, axis, bands) => own(new THREE.ShaderMaterial({
    transparent: glow, depthWrite: !glow, blending: glow ? THREE.AdditiveBlending : THREE.NormalBlending, side: glow ? THREE.DoubleSide : THREE.FrontSide,
    uniforms: { color: { value: new THREE.Color() }, gain: { value: 1 }, chase: { value: 0 }, phase: { value: 0 }, axis: { value: axis }, bands: { value: bands } },
    vertexShader: `varying vec2 vUv; varying vec3 vN; varying vec3 vV;
      #include <common>
      #include <logdepthbuf_pars_vertex>
      void main() { vUv = uv; vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
        #include <logdepthbuf_vertex>
      }`,
    fragmentShader: `uniform vec3 color; uniform float gain; uniform float chase; uniform float phase; uniform float axis; uniform float bands;
      varying vec2 vUv; varying vec3 vN; varying vec3 vV;
      #include <logdepthbuf_pars_fragment>
      void main() {
        #include <logdepthbuf_fragment>
        float u = mix(vUv.x, vUv.y, axis);
        float band = pow(0.5 + 0.5 * sin((u * bands - phase) * 6.2832), 3.0);
        float k = gain * mix(1.0, 0.25 + 1.5 * band, chase);
        ${glow ? 'float edge = pow(abs(dot(vN, vV)), 2.2); gl_FragColor = vec4(color * edge * k * 0.45, 1.0);'
    : 'gl_FragColor = vec4(mix(color, vec3(1.0), 0.45) * min(k, 1.6), 1.0);'}
      }`,
  }));
  const neons = [];   // { group, mats: [lõi, quầng] }
  function neon(grp, geo, glowGeo, place, axis, bands) {
    const core = neonMat(false, axis, bands), halo = neonMat(true, axis, bands);
    const a = new THREE.Mesh(own(geo), core), b = new THREE.Mesh(own(glowGeo), halo);
    a.name = b.name = 'st_neon';
    b.renderOrder = 2;
    for (const m of [a, b]) { place(m); group.add(m); }
    neons.push({ group: grp, mats: [core, halo] });
  }
  const flat = (x, y, z) => (m) => { m.position.set(x, y, z); m.rotation.x = -Math.PI / 2; };
  const ring = (grp, r, x, y, z, bands, tube = 0.035) =>
    neon(grp, new THREE.TorusGeometry(r, tube, 8, 160), new THREE.TorusGeometry(r, tube * 6, 10, 160), flat(x, y, z), 0, bands);
  ring('stage', layout.stage.r + 0.04, stage.x, stage.y - 0.02, stage.z, 12);
  ring('stage', layout.stage.r + 0.64, stage.x, 0.2, stage.z, 16);
  for (const seat of layout.seats.filter(s => s.role)) ring(seat.role === 'player' ? 'hot' : 'host', 0.62, seat.pos[0], stage.y + 0.015, seat.pos[2], 6, 0.03);
  // ghế chờ của người chơi kế tiếp: trên sàn bên phải sân khấu, sau máy quay TV, quay mặt vào sân khấu (cùng kiểu ghế nóng:
  // đế tròn, trụ, đệm da, tựa lưng, vòng neon dưới chân). Thành ghế role 'wait' trong world.seats (sơ đồ ghế khán giả bỏ qua)
  const chairMat = { metal: own(new THREE.MeshStandardMaterial({ color: 0x3a3f4a, metalness: 0.8, roughness: 0.35 })),
    leather: own(new THREE.MeshStandardMaterial({ color: 0x3a0f22, roughness: 0.55 })) };
  const waitSeats = WAIT.map(([x, z], i) => {
    const top = WAIT_H, c = new THREE.Group();
    const part = (geo, mat, px, py, pz) => { const m = new THREE.Mesh(own(geo), mat); m.position.set(px, py, pz); m.castShadow = true; c.add(m); };
    part(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 24), chairMat.metal, 0, 0.025, 0);
    part(new THREE.CylinderGeometry(0.045, 0.045, top - 0.1, 12), chairMat.metal, 0, top / 2, 0);
    part(new THREE.BoxGeometry(0.5, 0.09, 0.5), chairMat.leather, 0, top - 0.045, 0);
    part(new THREE.BoxGeometry(0.08, 0.66, 0.48), chairMat.leather, 0.25, top + 0.3, 0);   // tựa lưng phía +x (người ngồi quay về −x)
    c.position.set(x, 0, z);
    c.name = 'st_wait_chair';
    group.add(c);
    ring('aisle', 0.5, x, 0.015, z, 5, 0.025);
    return { id: `wait_${i + 1}`, role: 'wait', pos: [x, top, z], heading: Math.PI / 2, entry: `E_wait_${i + 1}`, front: [x - 0.75, 0, z] };
  });
  {
    // khung màn hình: bốn ống thẳng quanh màn
    const fw = w + 1.2, fh = h + 1.2, z = center[2] + 0.05;
    const bar = (len, x, y, rz) => neon('screen', new THREE.CylinderGeometry(0.04, 0.04, len, 8, 1, true), new THREE.CylinderGeometry(0.22, 0.22, len, 10, 1, true),
      (m) => { m.position.set(x, y, z); m.rotation.z = rz; }, 1, len / 3);
    bar(fw, center[0], center[1] + fh / 2, Math.PI / 2);
    bar(fw, center[0], center[1] - fh / 2, -Math.PI / 2);
    bar(fh, center[0] - fw / 2, center[1], Math.PI);
    bar(fh, center[0] + fw / 2, center[1], 0);
  }
  // ánh màu neon hắt lên sân khấu và mấy hàng ghế đầu
  const stageGlow = new THREE.PointLight(0xffffff, 0, 16, 1.5);
  stageGlow.position.set(stage.x, stage.y + 1.2, stage.z + 2);
  group.add(stageGlow);
  // dải sáng của mô hình, nhóm theo tên vật liệu
  const MODEL = { st_rim: 'stage', st_strip: 'wall', st_step_led: 'aisle', st_monitor: 'screen' };
  const glbMats = [];
  root.traverse(o => { for (const m of [].concat(o.material || [])) if (MODEL[m.name] && !glbMats.some(r => r.m === m)) glbMats.push({ m, group: MODEL[m.name], base: m.emissiveIntensity ?? 1 }); });

  // màu hiện tại của từng nhóm đuổi theo màu của chế độ
  const tint = Object.fromEntries(GROUPS.map(g => [g, new THREE.Color(MODES.idle[g])]));
  const want = new THREE.Color(), warm = new THREE.Color(WARM);
  let mode = 'idle', modeT = 0, gain = 1, phase = 0, spotK = 1, beamK = 1;
  function cue(name) {
    if (!MODES[name]) return;
    mode = name;
    modeT = 0;
  }
  // chớp lúc vào chế độ: tắt / bật vuông, mỗi nhịp 0,36 s
  const flashAt = (M, t) => (M.flash && !calm && t < M.flash * 0.36 ? (Math.floor(t / 0.18) % 2 ? 0.15 : 1.8) : 1);
  function tickNeon(dt, t) {
    let M = MODES[mode];
    modeT += dt;
    if (M.dur && modeT > M.dur) { cue(M.then); M = MODES[mode]; }
    const k = 1 - Math.exp(-dt * (M.flash ? 10 : 4));
    for (const g of GROUPS) tint[g].lerp(want.set(M[g]), k);
    gain += (M.gain - gain) * k;
    // đèn rọi, đèn hắt, luồng sáng tắt dần chậm khi buồn (2 s), sáng lại nhanh hơn
    const kd = 1 - Math.exp(-dt * ((M.spot ?? 1) < spotK ? 0.8 : 3));
    spotK += ((M.spot ?? 1) - spotK) * kd;
    beamK += ((M.beam ?? 1) - beamK) * kd;
    if (!calm) phase += dt * M.speed;
    const breathe = calm ? 1 : 1 + M.pulse * Math.sin(t * M.beat * 6.2832);
    const f = flashAt(M, modeT), chase = calm ? 0 : M.chase;
    for (const n of neons) for (const m of n.mats) {
      m.uniforms.color.value.copy(tint[n.group]);
      m.uniforms.gain.value = gain * breathe * f;
      m.uniforms.chase.value = chase;
      m.uniforms.phase.value = phase;
    }
    for (const { m, group: g, base } of glbMats) {
      m.color.copy(tint[g]);
      m.emissive.copy(tint[g]);
      m.emissiveIntensity = base * gain * breathe * f;
    }
    stageGlow.color.copy(tint.stage);
    stageGlow.intensity = 7 * gain * f;
    // đèn rọi ghế nóng nhuốm màu chế độ (lúc chờ gần như trắng ấm); đèn ghế MC giữ trắng ấm
    for (const L of spots) if (L.userData.role === 'player') {
      L.color.copy(warm).lerp(tint.hot, mode === 'idle' ? 0.15 : 0.7);
      L.intensity = 30 * Math.min(1.6, f) * spotK;
    }
    wash.intensity = 40 * spotK;
    // đầu đèn trên trần: quét rộng và nhanh khi đúng / thắng, dồn về ghế nóng khi chốt / sai, chùng xuống khi buồn
    const [R, S] = M.sweep || [1, 1], km = 1 - Math.exp(-dt * (M.flash ? 6 : 2));
    sweepR += (R - sweepR) * km;
    sweepS += (S - sweepS) * km;
    focus += ((M.focus || 0) - focus) * km;
    sw += dt * sweepS;
    aimBeams();
    const onStage = layout.stage.r + 0.3;
    bg += ((M.beamGain || 1) - bg) * k;
    beams.forEach((b, i) => {
      if (M.beamC) b.col.lerp(want.set(M.beamC[i % M.beamC.length]), k);
      else b.col.lerp(want.copy(b.base).lerp(tint.stage, mode === 'idle' ? 0.3 : 0.85), k);
      const s = strobeAt(M, i, modeT) * beamK * bg;
      b.mat.uniforms.color.value.copy(b.col).multiplyScalar(s);
      b.lens.material.color.copy(b.col).multiplyScalar(0.35 + 0.65 * s);
      const far = Math.hypot(b.pool.position.x - stage.x, b.pool.position.z - stage.z);
      b.pool.material.color.copy(b.col).multiplyScalar(0.28 * s * Math.max(0, Math.min(1, (onStage - far) / 0.6)));
    });
  }

  // ---- video
  function play(url) {
    stop();
    video = Object.assign(document.createElement('video'), { src: url, loop: true, muted: true, playsInline: true, crossOrigin: 'anonymous' });
    video.play().catch(() => {});
    videoTex = new THREE.VideoTexture(video);
    videoTex.colorSpace = THREE.SRGBColorSpace;
    screenMat.map = videoTex;
    screenMat.needsUpdate = true;
  }
  function stop() {
    if (!video) return;
    video.pause();
    video.removeAttribute('src');
    video.load();
    videoTex.dispose();
    video = videoTex = null;
    screenMat.map = slideTex;
    screenMat.needsUpdate = true;
  }
  // ---- bảng câu hỏi: lớp phủ DOM (chữ luôn nét, ngồi xa mấy cũng đọc được), màn hình lớn vẫn treo ảnh nền. Kiểu riêng của
  // chương trình: khung câu hỏi viền neon xanh, chữ cái phương án trong vòng vàng; không theo kiểu hình thoi của chương trình nào.
  // board({ n, q, o, cat, phase: 'ask' | 'lock' | 'reveal', pick, a, ex, hide, win, timeout }) hiện câu thứ n (1..15); board(null) ẩn.
  //   timeout: hết giờ không chọn (lật như trả lời sai, dải kết quả "Hết giờ!"); quit: người chơi tự dừng (lật đáp án, đèn trung tính);
  //   seeds: { passed, keep } hạt giống của lượt (src/engine/seeds.js).
  //   ask: câu hỏi rồi lần lượt A, B, C, D hiện ra; lock: phương án `pick` cam nhấp nháy; reveal: đáp án `a` xanh lá,
  //   `pick` sai thì đỏ, dải kết quả và lời giải thích `ex`. hide: phương án đã bị loại (quyền trợ giúp 50:50).
  //   Đèn neon theo bước: ask → question, lock → lock, reveal → right (win: câu 15) / wrong rồi sad (phòng chìm xuống).
  // chủ đề câu hỏi toán (quiz/bank/g<lớp>.js LEVELS)
  const CATS = { dem: 'Đếm', so: 'Số', 'so-sanh': 'So sánh', 'cong-tru': 'Cộng, trừ', 'nhan-chia': 'Nhân, chia', hinh: 'Hình học',
    'thoi-gian': 'Thời gian', 'loi-van': 'Lời văn', 'tim-so': 'Tìm số', 'tim-x': 'Tìm x', 'thu-thach': 'Thử thách', 'do-luong': 'Đo lường',
    'hinh-tien': 'Hình học, tiền', 'bieu-thuc': 'Biểu thức', 'tong-hop': 'Tổng hợp', 'phan-so': 'Phân số', 'so-thap-phan': 'Số thập phân',
    'phan-tram': 'Tỉ số phần trăm', 'chuyen-dong': 'Chuyển động' };
  let bd = null;
  const ov = ui && document.createElement('div');
  if (ov) {
    ov.className = 'ch-qov';
    ov.hidden = true;
    ov.setAttribute('aria-live', 'polite');
    // ngay sau khung 3D, trước mọi nút / bảng của trang: bảng chỉnh camera, sơ đồ ghế, tủ đồ… luôn nằm TRÊN dải câu hỏi
    const cv = ui.querySelector('.ch-canvas');
    if (cv) cv.after(ov); else ui.prepend(ov);
  }
  const esc = (x) => String(x ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  // thang hạt giống và thẻ kết quả (ladder.js): câu mới leo bậc, lật đúng nháy bậc, đọc luật thì giới thiệu mốc
  const ladder = ui ? makeLadder(ui, { calm }) : null;
  // âm thanh và pháo giấy theo bước (quizSfx.js): câu mới → nhạc hiệu theo độ khó, nhạc suy nghĩ; chốt → khoá, trống dồn;
  // lật → kèn + vỗ tay + pháo giấy / nốt buồn, khán giả "ồ"; trợ giúp → tiếng riêng từng quyền; ẩn bảng → khán phòng rì rầm
  let stopTension = null;
  function board(state) {
    const prev = bd;
    bd = state && { hide: [], ...state };
    const fresh = bd && (!prev || prev.n !== bd.n || prev.q !== bd.q);
    paintOverlay();
    if (bd && ladder) {
      const passed = bd.seeds?.passed ?? (bd.n || 1) - 1;
      if (fresh && bd.phase === 'ask') ladder.climb(bd.n, passed);
      else if (bd.phase === 'reveal' && prev?.phase !== 'reveal' && !bd.quit && !bd.timeout && !bd.skipped && bd.pick === bd.a) {
        ladder.pass(bd.n);
        if (bd.n >= 10) setTimeout(() => ladder.cheque(bd?.n ?? 10, bd?.who || ''), 1600);   // từ câu 10: mỗi câu vượt qua là một tấm séc
      }
      else ladder.set(bd.n, passed);
    }
    stopTension?.(); stopTension = null;
    if (!bd) { cue('idle'); tickPhone(); if (prev) { quizSfx.stopAll(); quizSfx.crowd(true); } return; }
    const res = bd.phase === 'reveal' && !bd.skipped && !bd.quit ? (bd.timeout ? 'wrong' : bd.pick == null || bd.pick === bd.a ? (bd.win ? 'win' : 'right') : 'wrong') : null;
    // đang dùng trợ giúp (khán giả đang bình chọn, đang gọi / chờ người thân): đèn trợ giúp
    const helping = bd.phase === 'ask' && (bd.poll === 'open' || (bd.friend && bd.friend.pick == null));
    cue(bd.phase === 'lock' ? 'lock' : res || (helping || bd.skipped || bd.quit ? 'help' : 'question'));
    if (bd.skipped && !prev?.skipped) quizSfx.skip();
    if (bd.phase === 'ask' && !fresh) {
      const f = bd.friend, pf = prev?.friend;
      if (bd.hide.length > (prev?.hide?.length || 0)) quizSfx.cut();
      if (bd.poll === 'open' && prev?.poll !== 'open') quizSfx.poll();
      if (f && !pf) f.mode === 'phone' ? quizSfx.phone() : (quizSfx.help(), quizSfx.spotlight());
      if (Array.isArray(bd.poll) && !Array.isArray(prev?.poll)) quizSfx.result(bd.n);
      if (f?.pick != null && pf?.pick == null) quizSfx.result(bd.n);
      if (f?.mode === 'phone' && pf?.end && !f.end) quizSfx.timeUp(bd.n);
    }
    tickPhone();
    if (bd.phase === 'ask' && fresh) quizSfx.sting(bd.n);
    else if (bd.phase === 'lock' && prev?.phase !== 'lock') stopTension = quizSfx.tension(bd.lockSec || 2.5, bd.n);
    else if (res && prev?.phase !== 'reveal') { quizSfx[res](bd.n); if (res !== 'wrong') { confetti(res === 'win' ? 160 : 90); onApplause?.(res === 'win' ? 6 : 3.4, 0.3); } }
  }
  // gọi điện cho người thân: đồng hồ đếm lùi, tích tắc mỗi giây trong 10 giây cuối
  let phoneT = 0;
  function tickPhone() {
    clearInterval(phoneT);
    const f = bd?.phase === 'ask' && bd.friend;
    if (!f || f.mode !== 'phone' || f.pick != null || !f.end) return;
    phoneT = setInterval(() => {
      const left = Math.ceil((f.end - Date.now()) / 1000);
      const el = ov?.querySelector('.ch-qov-friend b');
      if (el) el.textContent = Math.max(0, left);
      if (left <= 10 && left > 0) quizSfx.tick(left <= 3);
      if (left <= 0) clearInterval(phoneT);
    }, 1000);
  }
  // đồng hồ trả lời: vòng đếm lùi giữa mép trên dải (clock({ left, total, paused }) giây; null ẩn); 10 giây cuối đỏ, tích tắc mỗi giây
  let clk = null, clkSec = -1;
  function answerClock(st) {
    clk = st || null;
    const sec = clk && !clk.paused ? Math.ceil(clk.left) : -1;
    if (sec !== clkSec) { if (sec > 0 && sec <= 10 && clkSec > sec) quizSfx.tick(sec <= 3); clkSec = sec; }
    paintClock();
  }
  function paintClock() {
    const el = ov?.querySelector('.ch-qov-clock');
    if (!el) return;
    el.hidden = !clk || !bd || bd.phase !== 'ask';
    if (el.hidden) return;
    const sec = Math.max(0, Math.ceil(clk.left));
    el.querySelector('b').textContent = sec;
    el.querySelector('small').textContent = clk.paused ? 'tạm dừng' : 'giây';
    el.style.setProperty('--p', clk.total ? Math.max(0, clk.left) / clk.total : 0);
    el.classList.toggle('is-low', sec <= 10);
    el.classList.toggle('is-paused', !!clk.paused);
    el.title = clk.paused ? 'Đồng hồ tạm dừng' : `Còn ${sec} giây`;
  }
  // 50:50: một vệt sáng quét qua lại bốn ô (ô nhấp nháy, tích tắc), dừng lại thì hai ô bị loại (cut) bừng đỏ, rồi done()
  // (người gọi đặt hide: hai ô ấy tắt). Giảm chuyển động: chỉ đỏ thoáng qua.
  function scan(cut, done) {
    if (!ov || !bd || ov.hidden) { done?.(); return; }
    const passes = calm ? 0 : 6, step = 280;
    ov.classList.add('is-scan');
    for (let k = 0; k < passes; k++) setTimeout(() => quizSfx.tick(k === passes - 1), k * step);
    setTimeout(() => {
      if (!ov) return;
      ov.classList.remove('is-scan');
      const els = ov.querySelectorAll('.ch-qov-o');
      for (const i of cut) els[i]?.classList.add('is-mark');
      setTimeout(() => done?.(), calm ? 250 : 650);
    }, passes * step);
  }
  // phương án i bật ra (MC đọc tới nó); lúc chốt / lật thì mọi phương án đều hiện
  let shown = new Set();
  let mine = -1;   // đố vui nhiều người: phương án khán giả này đã chọn (mark), viền riêng; câu mới thì bỏ
  function showOption(i) {
    if (!bd || shown.has(i)) return;
    shown.add(i);
    paintOverlay();
    if (!bd.hide.includes(i)) quizSfx.pop(i);
  }
  const CONF = ['#ffd36b', '#2cff8a', '#56c8ff', '#ff6fb1', '#ffffff', '#ff9f2e', '#b07cff'];
  function confetti(n) {
    if (!ui || calm) return;
    const box = document.createElement('div');
    box.className = 'ch-confetti';
    box.innerHTML = Array.from({ length: n }, () => {
      const r = Math.random;
      return `<i style="left:${(r() * 100).toFixed(1)}%;background:${CONF[Math.floor(r() * CONF.length)]};--d:${(r() * 0.9).toFixed(2)}s;--t:${(2.4 + r() * 1.8).toFixed(2)}s;--x:${Math.round((r() - 0.5) * 240)}px;--r:${Math.round(360 + r() * 720)}deg;width:${Math.round(6 + r() * 5)}px"></i>`;
    }).join('');
    ui.appendChild(box);
    setTimeout(() => box.remove(), 5500);
  }
  // chọn đáp án ngay trên dải câu hỏi: answer(fn) mở cho bấm (fn(i), i = 0..3) lúc đang hỏi, answer(null) khoá lại;
  // cũng mở / khoá bốn nút trợ giúp (help(fn): fn(key) khi người chơi bấm một quyền chưa dùng)
  let ovQ = '', onAnswer = null, onHelp = null;
  function answer(fn) {
    onAnswer = fn || null;
    ov?.classList.toggle('is-pickable', !!onAnswer && bd?.phase === 'ask');
    ov?.querySelectorAll('.ch-qov-o').forEach((b, i) => { b.disabled = !onAnswer || bd?.phase !== 'ask' || !!bd?.hide.includes(i); });
    ov?.querySelectorAll('.ch-qov-help').forEach(b => { b.disabled = !onAnswer || !onHelp || bd?.phase !== 'ask' || !!bd?.helps?.used?.includes(b.dataset.k) || (b.dataset.k === 'skip' && bd?.n === 15); });
  }
  function help(fn) { onHelp = fn || null; answer(onAnswer); }
  // bốn quyền trợ giúp (đã dùng: gạch chéo), cột phần trăm của khán giả, ô người thân
  function paintHelps() {
    const used = bd.helps?.used || [];
    ov.querySelector('.ch-qov-helps').hidden = !bd.helps;
    const on = bd.helps?.on || '';   // quyền đang dùng: sáng lên tới khi xong
    ov.querySelectorAll('.ch-qov-help').forEach(b => {
      b.classList.toggle('is-active', b.dataset.k === on);
      b.classList.toggle('is-used', used.includes(b.dataset.k) && b.dataset.k !== on);
    });
    const poll = ov.querySelector('.ch-qov-poll'), pct = Array.isArray(bd.poll) ? bd.poll : null;
    poll.hidden = !bd.poll;
    poll.classList.toggle('is-open', bd.poll === 'open');
    poll.querySelector('p').textContent = bd.poll === 'open' ? 'Khán giả đang bình chọn…' : 'Ý kiến khán giả';
    const top = pct ? pct.indexOf(Math.max(...pct)) : -1;
    poll.querySelectorAll('.ch-qov-bar').forEach((el, i) => {
      const v = pct ? pct[i] : 0;
      el.style.setProperty('--v', v / 100);
      el.querySelector('span').textContent = pct ? `${v}%` : '';
      el.classList.toggle('is-top', i === top);
      el.classList.toggle('is-gone', bd.hide.includes(i));
    });
    const fr = ov.querySelector('.ch-qov-friend'), f = bd.friend;
    fr.hidden = !f;
    if (f) {
      fr.className = `ch-qov-friend is-${f.mode}${f.pick != null ? ' is-done' : ''}`;
      fr.querySelector('span').textContent = f.pick != null ? `${f.name} chọn` : f.mode === 'phone' ? `Đang gọi ${f.name}` : `${f.name}${f.seat ? ` · Ghế ${f.seat}` : ''} đang trả lời…`;
      fr.querySelector('b').textContent = f.pick != null ? 'ABCD'[f.pick] : f.mode === 'phone' && f.end ? Math.max(0, Math.ceil((f.end - Date.now()) / 1000)) : '';
    }
    ov.querySelector('.ch-qov-side').hidden = !bd.poll && !f;
  }
  function paintOverlay() {
    if (!ov) return;
    ov.hidden = !bd;
    if (!bd) { ov.innerHTML = ''; ovQ = ''; return; }
    // câu mới: dựng lại; hiệu ứng vào chỉ khi đang hỏi (nhảy thẳng tới bước chốt / lật thì hiện ngay). Cùng câu: chỉ đổi lớp,
    // để hiệu ứng vào không chạy lại lúc chốt / lật
    const qKey = `${bd.n}|${bd.q}`;
    if (qKey !== ovQ) {
      ovQ = qKey;
      mine = -1;
      // từng từ một thẻ em (--w: thứ tự) để chữ hiện lần lượt sau khi khung mở (church.css qov-word)
      const words = (x) => esc(x).split(/\s+/).map((w, k) => `<em style="--w:${k}">${w}</em>`).join(' ');
      const opt = (i) => `<button type="button" class="ch-qov-o" data-i="${i}" style="--i:${i}" disabled><i>${'ABCD'[i]}</i><span>${words(bd.o[i])}</span></button>`;
      shown = new Set();
      ov.innerHTML = `<div class="ch-qov-box"><b class="ch-qov-num">Câu ${bd.n || 1}</b>
        <div class="ch-qov-side" hidden><div class="ch-qov-poll" hidden>${[0, 1, 2, 3].map(i => `<div class="ch-qov-bar"><span></span><i><s></s></i><b>${'ABCD'[i]}</b></div>`).join('')}<p></p></div>
          <div class="ch-qov-friend" hidden><svg viewBox="0 0 24 24" aria-hidden="true">${HELP_ICON.friend}</svg><span></span><b></b></div></div>
        <div class="ch-qov-helps">${HELPS.map(k => `<button type="button" class="ch-qov-help" data-k="${k}" title="${HELP_NAME[k]}" aria-label="${HELP_NAME[k]}" disabled><svg viewBox="0 0 24 24" aria-hidden="true">${HELP_ICON[k]}</svg></button>`).join('')}</div>
        <div class="ch-qov-clock" hidden><svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="qov-clk-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1b8"/><stop offset="1" stop-color="#ffb03a"/></linearGradient><linearGradient id="qov-clk-r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb3bd"/><stop offset="1" stop-color="#ff3355"/></linearGradient></defs>
          <circle class="is-bg" cx="32" cy="32" r="27"/><circle class="is-ticks" cx="32" cy="32" r="30.5" pathLength="60"/><circle class="is-fg" cx="32" cy="32" r="27" pathLength="100"/></svg><b></b><small></small></div>
        <p class="ch-qov-ex" hidden></p>
        <div class="ch-qov-meta"><div class="ch-qov-mleft"><span>Câu ${bd.n || 1}/15 · ${HOT[bd.n || 1]} ⭐</span><button type="button" class="ch-qov-keep" title="Thang sao"></button></div><span>${esc(CATS[bd.cat] || '')}</span></div>
        <div class="ch-qov-row is-q"><div class="ch-qov-q"><span>${words(bd.q)}</span></div><b class="ch-qov-res" hidden></b></div>
        <div class="ch-qov-opts"><div class="ch-qov-row">${opt(0)}${opt(1)}</div>
        <div class="ch-qov-row">${opt(2)}${opt(3)}</div></div></div>`;
      ov.classList.toggle('is-in', bd.phase === 'ask');
      ov.querySelectorAll('.ch-qov-o').forEach((b, i) => { b.onclick = () => { if (onAnswer && bd?.phase === 'ask') onAnswer(i); }; });
      ov.querySelectorAll('.ch-qov-help').forEach(b => { b.onclick = () => { if (onHelp && bd?.phase === 'ask' && !bd.helps?.used?.includes(b.dataset.k)) onHelp(b.dataset.k); }; });
      ov.querySelector('.ch-qov-keep').onclick = () => ladder?.toggle();
    }
    // số hạt mang về nếu sai lúc này (mốc), chạm để xem cả thang
    const keepEl = ov.querySelector('.ch-qov-keep');
    if (keepEl) keepEl.textContent = `Đang giữ ${bd.seeds ? hotKeep(bd.seeds.passed) : 0} ⭐`;
    paintHelps();
    const rev = bd.phase === 'reveal', ok = !bd.timeout && (bd.pick == null || bd.pick === bd.a);
    // đang hỏi: phương án chưa đọc tới thì ẩn; nhảy thẳng vào câu ở bước chốt / lật (không có hiệu ứng vào) thì hiện hết
    if (bd.phase !== 'ask' || !ov.classList.contains('is-in')) shown = new Set([0, 1, 2, 3]);
    ov.querySelectorAll('.ch-qov-o').forEach((el, i) => {
      const right = rev && i === bd.a, wrong = rev && i === bd.pick && !ok;
      const locked = !right && !wrong && bd.phase !== 'ask' && i === bd.pick;
      const vis = shown.has(i) ? (el.classList.contains('is-wait') || el.classList.contains('is-pop') ? ' is-pop' : '') : ' is-wait';
      el.className = `ch-qov-o${right ? ' is-right' : wrong ? ' is-wrong' : locked ? ' is-lock' : vis}${bd.hide.includes(i) ? ' is-gone' : ''}${i === mine ? ' is-mine' : ''}`;
    });
    ov.querySelectorAll('.ch-qov-row:not(.is-q)').forEach((row, r) => row.classList.toggle('is-on', shown.has(r * 2) || shown.has(r * 2 + 1)));
    const res = ov.querySelector('.ch-qov-res'), ex = ov.querySelector('.ch-qov-ex');
    res.hidden = !rev;
    res.className = `ch-qov-res ${bd.skipped || bd.quit ? 'is-skip' : bd.win ? 'is-win' : ok ? 'is-ok' : 'is-no'}`;
    res.dataset.icon = bd.quit || bd.skipped ? '›' : bd.win ? '★' : ok ? '✓' : '✕';
    res.textContent = bd.quit ? `Dừng chơi · ${bd.seeds?.keep ?? 0} ngôi sao` : bd.skipped ? 'Đã bỏ qua câu này' : bd.timeout ? 'Hết giờ!' : bd.win ? 'Xuất sắc! Vượt qua cả 15 câu' : ok ? 'Chính xác!' : 'Rất tiếc!';
    ex.hidden = !(rev && bd.ex);
    ex.textContent = bd.ex || '';
    paintClock();
    answer(onAnswer);
  }

  const sample = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  sample.canvas.width = sample.canvas.height = 1;
  let sampleT = 0;

  let time = 0;
  return {
    screen,
    /** Ghế chờ của người chơi kế tiếp: [{ id, role: 'wait', pos, heading, entry, front }] (front: chỗ đứng trước ghế = entry). */
    waitSeats,
    get video() { return video; },
    play, stop,
    /** Bảng câu hỏi trên màn hình lớn (xem board ở trên); null: về ảnh chiếu. */
    board,
    /** Khán giả (đố vui nhiều người) đã chọn phương án i: viền riêng tới câu sau; -1 bỏ. */
    mark(i) { mine = i; if (bd) paintOverlay(); },
    /** Mở / khoá bấm chọn đáp án trên dải câu hỏi: answer((i) => …) hoặc answer(null). */
    answer,
    /** Đồng hồ trả lời trên dải câu hỏi: clock({ left, total, paused }) (giây), clock(null) ẩn. */
    clock: answerClock,
    /** 50:50: quét bốn phương án rồi đánh dấu đỏ các phương án sắp bị loại (cut: chỉ số), xong gọi done(). */
    scan,
    /** Phương án i (0..3) bật ra trên dải câu hỏi, kèm tiếng ding (MC đọc tới nó). */
    showOption,
    /** Mở / khoá bốn nút trợ giúp trên dải câu hỏi: help((key) => …) hoặc help(null); key trong HELPS. */
    help,
    get boardState() { return bd; },
    /** Thang hạt: 'intro' (MC đọc luật) | 'hide'. */
    ladder(mode) { if (mode === 'intro') ladder?.intro(); else ladder?.hideNow(); },
    /** Tấm séc chứng nhận câu n (thử: __church.cheque). */
    cheque(n, nick) { ladder?.cheque(n, nick); },
    /** Thẻ kết quả cuối lượt: { passed, keep, stop, win, name, me } (ladder.js result). */
    result(r) { ladder?.result(r || {}); },
    /** Tràng pháo tay dur giây sau delay giây: tiếng vỗ tay và khán giả ngồi vỗ tay (world.js applaud). */
    applaud(dur = 3.5, delay = 0) { setTimeout(() => quizSfx.clap(dur), delay * 1000); onApplause?.(dur, delay); },
    /** Đèn neon theo trạng thái trò chơi: 'idle' | 'question' | 'lock' | 'right' | 'wrong' | 'win' (MODES). */
    cue,
    get mode() { return mode; },
    /** Chạm vào màn hình: video thì bật / tắt tiếng. Trả về true nếu đã xử lý. */
    tap() {
      if (!video) return false;
      video.muted = !video.muted;
      if (video.paused) video.play().catch(() => {});
      return true;
    },
    /** Sau sky.update: ánh đèn trường quay thay ánh trời; ảnh chiếu, luồng sáng, viền sáng. */
    update(dt, { hemi, sun, renderer: r = renderer }) {
      time += dt;
      // phòng tối: ánh chung tím xanh rất nhẹ, sân khấu sáng nhờ đèn rọi và neon
      hemi.color.set(0x8a86c8); hemi.groundColor.set(0x0c0a12); hemi.intensity = 0.5;
      sun.color.set(0xc8c4ff); sun.intensity = 0.22;
      r.toneMappingExposure = 1.0;
      if (scene.environment) scene.environmentIntensity = 0.12;
      if (!video) { if (posterOk) paintPoster(); else paintSlides(dt); }
      // màu ánh màn hình hắt ra: lấy trung bình của khung hình mỗi nửa giây
      if ((sampleT -= dt) <= 0) {
        sampleT = 0.5;
        try {
          sample.drawImage(video && video.readyState >= 2 ? video : cv, 0, 0, 1, 1);
          const [R, G, B] = sample.getImageData(0, 0, 1, 1).data;
          avg.setRGB(R / 255, G / 255, B / 255, THREE.SRGBColorSpace);
        } catch { /* video khác nguồn không đọc được điểm ảnh */ }
      }
      spill.color.lerp(avg, Math.min(1, dt * 2));
      spill.intensity = 9;
      tickNeon(dt, time);
    },
    dispose() {
      stop();
      stopTension?.();
      quizSfx.stopAll();
      clearInterval(phoneT);
      ov?.remove();
      ladder?.dispose();
      scene.remove(group);
      for (const L of [...spots, wash, spill, stageGlow]) L.dispose();
      disposers.forEach(f => f());
    },
  };
}
