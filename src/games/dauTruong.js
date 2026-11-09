/**
 * 🏆 Đấu Trường Nhí (tên tạm): bản mẫu sân khấu 3D để chủ dự án duyệt (thẻ chỉ admin thấy, `admin: true` trong data/grades.js).
 * Thiết kế: docs/dau-truong/thiet-ke.md. Bản HTML đứng riêng (three.js qua CDN): docs/dau-truong/mockup.html; module này là cùng
 * cảnh đó dùng three.js của gói npm, chạy trong app.
 *
 * Sân khấu tròn, màn LED lớn, tường lục giác, 4 bục thí sinh màu riêng (màn điểm, máy tính bảng, chuông), bục MC đôi (2 MC thay
 * phiên nói), khán phòng 50 ghế có đèn lưng ghế. Nút chạy thử từng vòng: Khởi động / Tăng tốc / Về đích với đồng hồ, bục chốt giả
 * lập, lật kết quả, điểm chạy số. Hình khối đơn giản, chưa phải mô hình Blender thật.
 *
 * Lúc lên câu: camera tự áp sát màn LED (góc "Màn hình câu hỏi", fitScreen), màn LED chỉ ghi câu hỏi, đáp án là dải nút
 * overlay kiểu "Ai là môn đệ thông thái?" (.ch-qov của src/thanDong/church/church.css); bục 1 ("Bạn") là người cầm máy.
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js';
import '../thanDong/church/church.css';
import '../thanDong/church/churchSunny.css';
import { icon } from '../thanDong/church/icons.js';
import { getProfileGrade } from '../engine/profile.js';
import { arenaSfx as SFX } from '../dauTruong/arenaSfx.js';
import { PUPILS, SEAT_IDS, COLS } from '../dauTruong/rules.js';
import { lobbyRender } from '../dauTruong/lobby.js';
import { loadArenaBank, speedQ } from '../dauTruong/questions.js';
import { drawQBody, optTokens, tokenCanvas, sayTokens } from '../dauTruong/figs.js';
import { mcLine, mcPlan, sayQuestion, sayOption, LETTER, MC_NAMES } from '../dauTruong/mc.js';
import { voiceMode, mcPrefetch, mcSpeak, mcStop, setMcListener, setMcRate, isMcMuted, setMcMuted } from '../dauTruong/mcVoice.js';
import { certSvg, loadCertFonts, CERT_CSS } from '../dauTruong/cert.js';
import { addAward } from '../dauTruong/awards.js';
import { summarize, saveMatch } from '../dauTruong/matchStats.js';
import { awardFixedStars, getTotalStars } from '../engine/stars.js';
import { arenaAnswer, showProgress } from '../engine/arenaStats.js';
import { audienceAt, buzzPlan, decide, pickPackage, podiumAt, reactOf, wantStar } from '../dauTruong/npc.js';

/** Tên chương trình trên màn LED (tên tạm, chủ dự án chốt; '\n' = xuống dòng). Không dùng tên chương trình truyền hình có thật. */
const SHOW_NAME = 'Đấu Trường Nhí';
/** Dòng phụ dưới tên (màn chờ, màn LED): chương trình dùng chung cho lớp 1–5, nên ghi lớp theo hồ sơ của bé đang xem
   (phòng thi chia theo lớp); chưa chọn lớp hoặc Tiền tiểu học thì chỉ ghi môn. */
function showSub() {
  const g = getProfileGrade();
  return g >= 1 && g <= 5 ? `Toán · Tiếng Việt · Lớp ${g}` : 'Toán · Tiếng Việt';
}

/** Hàng nút giữ để dời camera: [trục, nhãn, phím, [hướng, ký hiệu], [hướng, ký hiệu]]. */
const CAM_ROWS = [
  ['fb', 'Tiến / lùi', 'W S', [1, '▲'], [-1, '▼']],
  ['lr', 'Trái / phải', 'A D', [-1, '◀'], [1, '▶']],
  ['ud', 'Lên / xuống', 'R F', [1, '⤒'], [-1, '⤓']],
  ['yaw', 'Xoay', 'Q E', [-1, '↺'], [1, '↻']],
  ['pitch', 'Ngước / cúi', 'T G', [1, '⌃'], [-1, '⌄']],
  ['fov', 'Phóng / thu', 'Z X', [-1, '＋'], [1, '－']],
];

/* Giao diện theo trường quay "Ai tài năng nhất?" (src/thanDong, chép từ "Ai là môn đệ thông thái?" của kinh-thanh): khung `.ch`
   kiểu Tươi sáng (kính trắng, chữ Nunito, cam làm màu nhấn), nút icon 42 px, thanh góc nhìn dưới trái, bảng chỉnh camera kiểu
   .ch-camset; phần câu hỏi là dải truyền hình tối .ch-qov (khung vát, đồng hồ, huy hiệu kết quả) của church.css. */
const CSS = `
.dt-stage.ch { z-index: 60; }
/* phụ đề lời MC nằm ở thanh trên cùng, thay chỗ nhãn tên chương trình lúc MC đang nói
   (không đè màn câu hỏi, không đẩy gì); màn hẹp thì xuống ngay dưới thanh */
/* bạn trên bục trả lời ké câu của bạn khác (không tính điểm, chỉ đếm câu đúng): ô đã chọn chỉ có viền, không tô màu chốt */
.dt-stage .ch-qov-o.is-side::after { inset: 4px; }
.dt-stage .ch-qov-o.is-side::before { background: linear-gradient(180deg, #fff7d6, #ffc93c 50%, #fff1b8); }
.dt-stage .ch-qov-o.is-side i { background: rgba(255, 201, 60, 0.3); border-color: #ffd36b; }
.dt-stage .ch-qov-o.is-side.is-side-no::before { background: linear-gradient(180deg, #ffd0d6, #ff4d64 50%, #ffc2ca); }
/* ⏱ thời gian chương trình đã diễn: ô kính đẩy cụm nút sang phải, luôn giữ chỗ (ẩn bằng visibility trước giờ diễn), không ẩn khi MC nói */
.dt-stage .dt-elapsed { margin-left: auto; display: inline-flex; align-items: center; gap: 6px; height: 42px; padding: 0 12px; box-sizing: border-box;
  border-radius: 12px; background: rgba(6, 12, 40, 0.72); border: 1px solid rgba(255, 211, 107, 0.4); color: #fff; pointer-events: none;
  font-size: 15px; font-weight: 800; font-variant-numeric: tabular-nums; white-space: nowrap; }
.dt-stage .dt-elapsed i { font-style: normal; font-size: 12px; font-weight: 700; color: #ffd36b; }
.dt-stage .dt-elapsed.is-off { visibility: hidden; }
@media (max-width: 560px) { .dt-stage .dt-elapsed i { display: none; } }
/* màn chưa đủ rộng cho cả nhãn tên chương trình (giữa) và cụm đồng hồ + loa + nút vòng (phải): đang diễn thì nhường chỗ cho đồng hồ */
@media (max-width: 900px) { .dt-stage:has(.dt-elapsed:not(.is-off)) .ch-top .ch-chip { display: none; } }
.dt-stage .dt-cap { position: absolute; left: 76px; right: 300px; top: max(10px, env(safe-area-inset-top)); z-index: 2; width: fit-content;
  max-width: min(980px, calc(100% - 376px)); margin: 0 auto; box-sizing: border-box; padding: 8px 18px; border-radius: 14px;
  background: rgba(6, 12, 40, 0.84); border: 1px solid rgba(255, 211, 107, 0.45); box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  color: #fff; font-size: clamp(13px, 0.9vw + 0.5vh, 21px); font-weight: 600; line-height: 1.4; text-align: center;
  opacity: 0; visibility: hidden; transform: translateY(-6px); transition: opacity 0.2s, transform 0.2s, visibility 0.2s; pointer-events: none; }
.dt-stage .dt-cap.is-on { opacity: 1; visibility: visible; transform: none; }
.dt-stage.is-talking .ch-top .ch-chip { visibility: hidden; }
@media (max-width: 700px) { .dt-stage .dt-cap { left: 12px; right: 12px; max-width: calc(100% - 24px); top: calc(max(12px, env(safe-area-inset-top)) + 52px); } }
.dt-stage .dt-cap b { margin-right: 8px; color: #7fd0ff; font-weight: 800; }
.dt-stage .dt-cap[data-mc="1"] b { color: #ff9ccf; }
@media (prefers-reduced-motion: reduce) { .dt-stage .dt-cap { transition: opacity 0.2s, visibility 0.2s; transform: none; } }
.dt-stage .dt-mode { width: auto; margin-left: 8px; padding: 0 14px; gap: 6px; display: flex; align-items: center; font-size: 14px; font-weight: 800; }
.dt-stage .dt-mode svg.i { width: 16px; height: 16px; }
.dt-stage .dt-mode[aria-expanded="true"] { border-color: var(--ch-gold-line); background: var(--ch-gold-bg); color: var(--ch-gold); }
.dt-stage .dt-menu { position: absolute; right: 12px; top: calc(max(12px, env(safe-area-inset-top)) + 52px); display: grid; gap: 2px; padding: 6px; z-index: 3;
  background: var(--ch-glass); border: 1px solid var(--ch-line); border-radius: var(--ch-r); -webkit-backdrop-filter: var(--ch-blur); backdrop-filter: var(--ch-blur); box-shadow: var(--ch-shadow, 0 6px 24px rgba(0,0,0,.35)); }
.dt-stage .dt-menu[hidden] { display: none; }
.dt-stage .dt-menu button { min-height: 36px; padding: 0 16px; border: 1px solid transparent; border-radius: 10px; background: none; color: var(--ch-text); font-size: 14px; font-weight: 700; text-align: left; cursor: pointer; }
.dt-stage .dt-menu button:hover { background: var(--ch-glass2); }
.dt-stage .dt-menu button[aria-pressed="true"] { background: var(--ch-gold-bg); border-color: var(--ch-gold-line); color: var(--ch-gold); }
@media (max-width: 560px) { .dt-stage .ch-chip { display: none; } }
.dt-stage .ch-camset { z-index: 2; }
.dt-stage .dt-cs-top { display: flex; align-items: center; gap: 6px; }
.dt-stage .dt-cs-top b { font-size: 14px; }
.dt-stage .dt-cs-kind { flex: 1; font-size: 12px; color: var(--ch-muted); }
.dt-stage .dt-cs-top .ch-ic { width: 32px; height: 32px; box-shadow: none; }
.dt-stage .dt-cs-grid { display: grid; grid-template-columns: 58px 1fr 1fr 1fr; gap: 4px; align-items: center; margin: 4px 0; font-size: 12px; }
.dt-stage .dt-cs-grid i { font-style: normal; font-size: 11px; color: var(--ch-muted); }
.dt-stage .dt-camset input, .dt-stage .dt-camset select { width: 100%; box-sizing: border-box; font: inherit; font-size: 12.5px; color: var(--ch-text); background: var(--ch-glass2);
  border: 1px solid var(--ch-line); border-radius: 8px; padding: 4px 5px; font-variant-numeric: tabular-nums; touch-action: auto; user-select: text; }
.dt-stage .dt-cs-which { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.dt-stage .dt-camset .ch-cam-foot { flex-wrap: wrap; }
.dt-stage .dt-camset .ch-cam-foot button { flex: 1 1 40%; }
.dt-stage .dt-camset .ch-cam-foot button[hidden] { display: none; }
.dt-stage .dt-cs-help { margin: 4px 0 0; font-size: 11.5px; color: var(--ch-muted); line-height: 1.45; }
.dt-stage .dt-cs-note { margin: 0; min-height: 1em; font-size: 12px; font-weight: 700; color: #1f9d55; }
/* Dải đáp án nằm trên một tấm nền tối kéo hết bề ngang tới đáy màn hình (viền sáng trên mép), để không lẫn vào sân khấu 3D
   phía sau; ô đáp án, chữ, vòng chữ cái to theo khổ màn hình (màn rộng thì to, điện thoại vẫn như cỡ của church.css). */
.dt-stage .ch-qov { --cut: clamp(15px, 1.5vw, 28px); }
.dt-stage .ch-qov::before {
  content: ''; position: absolute; left: 0; right: 0; top: -18px; bottom: calc(-1 * (max(16px, env(safe-area-inset-bottom)) + 70px)); z-index: -1; pointer-events: none;
  background: linear-gradient(180deg, rgba(12, 22, 72, 0.92), rgba(4, 8, 32, 0.97) 55%);
  border-top: 2px solid rgba(130, 185, 255, 0.6); box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.14);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
}
.dt-stage .ch-qov-box { max-width: min(1280px, 100%); gap: clamp(4px, 0.8vh, 10px); }
.dt-stage .ch-qov-opts, .dt-stage .ch-qov-row { gap: clamp(4px, 0.8vw, 12px); }
.dt-stage .ch-qov-meta { font-size: clamp(10px, 0.8vw + 0.3vh, 16px); }
.dt-stage .ch-qov-opts .ch-qov-o { min-height: clamp(34px, 7.5vh, 80px); gap: clamp(6px, 0.9vw, 16px); font-size: clamp(13px, 1.2vw + 0.5vh, 30px); font-weight: 700; }
.dt-stage .ch-qov-o i { width: clamp(20px, 1.6vw + 1vh, 46px); height: clamp(20px, 1.6vw + 1vh, 46px); font-size: clamp(11px, 0.8vw + 0.5vh, 22px); }
.dt-stage .ch-qov-meta > span.dt-note { color: #ffd36b; }
.dt-stage .ch-qov-res { font-size: clamp(13px, 1vw + 0.5vh, 24px); }
/* Nút chuông (lượt chung Khởi động, giành quyền Về đích): tròn to, góc phải trên dải, luôn giữ chỗ (ẩn bằng visibility),
   lúc được bấm thì đỏ vàng nhún nhịp; phím cách cũng bấm được */
.dt-stage .dt-bell { position: absolute; right: var(--cut); bottom: calc(100% + 6px); z-index: 2; width: clamp(64px, 6vw + 3vh, 120px); aspect-ratio: 1;
  display: grid; place-content: center; justify-items: center; gap: 2px; border-radius: 50%; border: 3px solid #fff3c4; padding: 0;
  background: radial-gradient(circle at 35% 30%, #ff8a8a, #e0283c 55%, #8a0f1e); color: #fff; font-family: inherit; cursor: pointer;
  box-shadow: 0 6px 0 #5c0812, 0 0 24px rgba(255, 80, 90, 0.7); visibility: hidden; pointer-events: none; -webkit-tap-highlight-color: transparent; }
.dt-stage .dt-bell b { font-size: clamp(24px, 2.2vw + 1vh, 46px); line-height: 1; }
.dt-stage .dt-bell span { font-size: clamp(9px, 0.6vw + 0.4vh, 15px); font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; }
.dt-stage .dt-bell.is-on { visibility: visible; pointer-events: auto; animation: dt-bell 0.8s ease-in-out infinite alternate; }
.dt-stage .dt-bell:active { transform: translateY(4px); box-shadow: 0 2px 0 #5c0812, 0 0 24px rgba(255, 80, 90, 0.7); }
@keyframes dt-bell { to { box-shadow: 0 6px 0 #5c0812, 0 0 44px 10px rgba(255, 210, 90, 0.85); transform: scale(1.06); } }
@media (prefers-reduced-motion: reduce) { .dt-stage .dt-bell.is-on { animation-duration: 2.4s; } }
/* Về đích: ô thông tin (không bấm) cùng khung với ô chọn gói / đặt sao */
.dt-stage .ch-qov-o.dt-info { opacity: 0.82; }
.dt-stage .ch-qov-o.dt-info::after { background: linear-gradient(180deg, #1b2a6b, #0c1640); }
/* Tăng tốc (xếp thứ tự): ô đã chạm sáng viền xanh ngọc, vòng chữ cái ghi thứ tự 1–4 */
.dt-stage .ch-qov-o i:empty::after { content: '·'; }
/* 🏅 giấy chứng nhận lúc trao giải (giveCert) */
.dt-stage .dt-cert { position: absolute; inset: 0; z-index: 5; display: grid; place-items: center; padding: 64px 16px 16px; background: rgba(4, 8, 32, 0.55); }
.dt-stage .dt-cert[hidden] { display: none; }
.dt-stage .dt-cert-box { container-type: size; width: 100%; height: 100%; display: grid; place-content: center; justify-items: center; gap: 10px;
  animation: dt-cert-in 0.7s cubic-bezier(.2, 1.3, .4, 1) both; }
.dt-stage .dt-cert-box .dc-svg { width: min(100cqw, (100cqh - 60px) * 1.4118); height: auto; border-radius: 14px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6); }
.dt-stage .dt-cert-box p { margin: 0; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 10px; color: #fff; font-weight: 700; font-size: clamp(14px, 1vw + 0.6vh, 20px); }
.dt-stage .dt-cert-box button { min-height: 42px; padding: 0 18px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.3); background: rgba(255, 255, 255, 0.12); color: #fff; font: inherit; cursor: pointer; }
.dt-stage .dt-cert-box button[data-c="see"] { background: #ffd45c; color: #3a2800; border-color: #ffd45c; }
.dt-stage .dt-cert.is-out .dt-cert-box { animation: dt-cert-out 0.6s ease-in both; }
@keyframes dt-cert-in { from { opacity: 0; transform: translateY(40px) scale(0.6) rotate(-4deg); } to { opacity: 1; transform: none; } }
@keyframes dt-cert-out { to { opacity: 0; transform: translateY(30%) scale(0.3); } }
@media (prefers-reduced-motion: reduce) { .dt-stage .dt-cert-box { animation: dt-fade 1.2s ease both; } .dt-stage .dt-cert.is-out .dt-cert-box { animation: dt-fade 0.8s ease reverse both; } }
/* ⭐ màn thu sao (collectStars): thẻ trắng giữa màn hình, ô tổng sao góc trên phải, sao bay từ thẻ lên ô */
.dt-stage .dt-collect { position: absolute; inset: 0; z-index: 6; display: grid; place-items: center; padding: 16px; background: rgba(4, 8, 32, 0.6); }
.dt-stage .dt-collect[hidden] { display: none; }
.dt-stage .dt-collect.is-out { opacity: 0; transition: opacity 0.6s ease 0.1s; }
.dt-stage .dt-col-total { position: absolute; top: 12px; right: 16px; display: flex; align-items: center; gap: 8px; padding: 8px 18px 8px 12px; border-radius: 999px;
  background: #fff; color: #3a2800; font-weight: 900; font-size: clamp(20px, 1.4vw + 1vh, 32px); box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35); }
.dt-stage .dt-col-total b { font-size: 1.15em; }
.dt-stage .dt-col-total.is-pop { animation: dt-col-pop 0.25s ease; }
@keyframes dt-col-pop { 50% { transform: scale(1.15); } }
.dt-stage .dt-col-card { width: min(92vw, 460px); max-height: calc(100% - 70px); margin-top: 40px; display: grid; justify-items: center; gap: 8px; padding: 22px 22px 20px;
  border-radius: 24px; background: #fff; color: #23264a; text-align: center; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5); animation: dt-cert-in 0.7s cubic-bezier(.2, 1.3, .4, 1) both; }
.dt-stage .dt-col-card.is-out { animation: dt-cert-out 0.6s ease-in both; }
.dt-stage .dt-col-badge { font-size: clamp(44px, 4vw + 3vh, 76px); line-height: 1; }
.dt-stage .dt-col-card h3 { margin: 0; font-size: clamp(20px, 1.2vw + 1.2vh, 30px); font-weight: 900; }
.dt-stage .dt-col-star { display: flex; align-items: center; gap: 10px; color: #e6a100; font-weight: 900; font-size: clamp(54px, 4vw + 4vh, 96px); line-height: 1.05; }
.dt-stage .dt-col-card p { margin: 0; font-size: clamp(15px, 0.6vw + 1vh, 20px); font-weight: 700; color: #4b5078; }
.dt-stage .dt-col-go { margin-top: 8px; min-height: 56px; min-width: 220px; padding: 0 28px; border: 0; border-radius: 16px; background: #ffc83a; color: #3a2800;
  font: inherit; font-size: clamp(20px, 1vw + 1vh, 26px); font-weight: 900; cursor: pointer; box-shadow: 0 6px 0 #d99a00; }
.dt-stage .dt-col-go:active { transform: translateY(4px); box-shadow: 0 2px 0 #d99a00; }
.dt-stage .dt-col-go:not(:disabled) { animation: dt-col-nudge 1.6s ease-in-out 2s infinite; }
@keyframes dt-col-nudge { 50% { transform: scale(1.06); } }
.dt-stage .dt-col-fly { position: absolute; font-style: normal; font-size: 34px; pointer-events: none; z-index: 2; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4)); }
@media (prefers-reduced-motion: reduce) { .dt-stage .dt-col-card { animation: dt-fade 1s ease both; } .dt-stage .dt-col-go:not(:disabled) { animation: none; } }
/* thí sinh đang thi: không có thanh góc máy, không bảng chỉnh góc (syncCamLock) */
.dt-stage.is-cam-lock .ch-views, .dt-stage.is-cam-lock .dt-camset { display: none; }
/* 📺 Camera trực tiếp: ô cạnh khung câu hỏi (màn ngang: cột trái; màn dọc: dải trên khung) quay bục người đang trả lời suốt
   lượt của bạn ấy. Phần ruột trong suốt: cảnh 3D vẽ thẳng vào đúng ô này (renderLive). Bo góc bằng đúng bề dày viền để
   hình chữ nhật vẽ ra không lộ góc. */
.dt-stage .dt-live { position: absolute; z-index: 1; display: flex; flex-direction: column; gap: 8px; pointer-events: none; }
.dt-stage .dt-live[hidden] { display: none; }
.dt-stage .dt-live.is-row { flex-direction: row; }
/* màn ngang, nhiều bạn: lưới 2 × 2 trong cột trái, mỗi ô khổ đứng như ô một bạn (chồng 4 ô dẹt thì ai cũng nhỏ xíu) */
.dt-stage .dt-live.is-many:not(.is-row):not([hidden]) { display: grid; grid-template-columns: 1fr 1fr; grid-auto-rows: 1fr; }
.dt-stage .dt-live-cell { position: relative; flex: 1 1 0; min-width: 0; min-height: 0; border: 4px solid var(--c); border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.6), 0 0 22px color-mix(in srgb, var(--c) 55%, transparent), 0 10px 28px rgba(0, 0, 0, 0.5);
  transition: border-color 0.25s, box-shadow 0.25s; }
.dt-stage .dt-live-cell.is-ok { border-color: #2cff8a; box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.6), 0 0 34px 6px rgba(44, 255, 138, 0.75); }
.dt-stage .dt-live-cell.is-no { border-color: #ff3b4d; box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.6), 0 0 26px 4px rgba(255, 59, 77, 0.6); }
.dt-stage .dt-live-tag { position: absolute; left: 6px; top: 6px; display: flex; align-items: center; gap: 5px; padding: 3px 8px; border-radius: 6px;
  background: rgba(6, 12, 40, 0.8); color: #fff; font-size: clamp(9px, 0.5vw + 0.4vh, 13px); font-weight: 900; letter-spacing: 0.06em; text-transform: uppercase; }
.dt-stage .dt-live-tag i { width: 8px; height: 8px; border-radius: 50%; background: #ff3b4d; box-shadow: 0 0 8px #ff3b4d; animation: dt-rec 1.2s ease-in-out infinite; }
@keyframes dt-rec { 50% { opacity: 0.25; } }
/* bạn vừa bấm chuông: viền ô nháy sáng màu bục 3 nhịp, nhãn 🔔 nền màu bục */
.dt-stage .dt-live-cell.is-bell { animation: dt-bell-cell 0.4s ease-in-out 3 alternate; }
.dt-stage .dt-live-cell.is-bell .dt-live-tag { background: var(--c); color: #061033; }
@keyframes dt-bell-cell { to { box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.6), 0 0 46px 14px var(--c); border-color: #fff; } }
@media (prefers-reduced-motion: reduce) { .dt-stage .dt-live-cell.is-bell { animation: dt-bell-cell 1.2s ease-in-out 1 alternate; } }
.dt-stage .dt-live-name { position: absolute; left: 0; right: 0; bottom: 0; display: flex; align-items: baseline; justify-content: space-between; gap: 6px;
  padding: 4px 10px; background: linear-gradient(90deg, var(--c), color-mix(in srgb, var(--c) 55%, #061033)); color: #061033;
  font-size: clamp(12px, 0.8vw + 0.6vh, 24px); font-weight: 900; line-height: 1.2; }
.dt-stage .dt-live-name span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dt-stage .dt-live-name s { text-decoration: none; font-variant-numeric: tabular-nums; }
.dt-stage .dt-live-pop { position: absolute; left: 50%; top: 42%; transform: translate(-50%, -50%) scale(0.4); opacity: 0;
  font-style: normal; font-weight: 900; font-size: clamp(28px, 2.4vw + 2vh, 72px); color: #fff; white-space: nowrap;
  text-shadow: 0 3px 0 rgba(0, 0, 0, 0.45), 0 0 18px rgba(0, 0, 0, 0.6); }
.dt-stage .dt-live-cell.is-ok .dt-live-pop { color: #8dffc0; }
.dt-stage .dt-live-cell.is-no .dt-live-pop { color: #ff9aa6; }
.dt-stage .dt-live-pop.is-on { animation: dt-pop 2.6s ease-out forwards; }
@keyframes dt-pop { 0% { opacity: 0; transform: translate(-50%, -20%) scale(0.4); } 15% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
  25% { transform: translate(-50%, -50%) scale(1); } 80% { opacity: 1; } 100% { opacity: 0.9; transform: translate(-50%, -70%) scale(1); } }
@media (prefers-reduced-motion: reduce) {
  .dt-stage .dt-live-tag i { animation-duration: 3s; }
  .dt-stage .dt-live-pop.is-on { animation: dt-pop-calm 1.2s ease-out forwards; }
}
/* nhiều ô (cả 4 bạn cùng trả lời): một nhãn Trực tiếp ở ô đầu, chữ điểm nằm bên phải, không che mặt */
.dt-stage .dt-live.is-many .dt-live-cell + .dt-live-cell .dt-live-tag { display: none; }
.dt-stage .dt-live-tag { white-space: nowrap; }
.dt-stage .dt-live.is-many.is-row .dt-live-tag { font-size: 0; gap: 0; padding: 5px; }
.dt-stage .dt-live.is-many .dt-live-pop { left: auto; right: 8px; top: 8px; transform: none; font-size: clamp(18px, 1.2vw + 1.2vh, 40px); }
.dt-stage .dt-live.is-many .dt-live-pop.is-on { animation: dt-pop-many 2.6s ease-out forwards; }
@keyframes dt-pop-many { 0% { opacity: 0; transform: scale(0.4); } 15% { opacity: 1; transform: scale(1.15); } 25%, 100% { opacity: 1; transform: none; } }
@keyframes dt-pop-calm { from { opacity: 0; transform: translate(-50%, -50%) scale(1); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
/* Bảng điểm hết đợt: camera lướt qua khán phòng, bốn thẻ thí sinh (thứ tự bục, không đổi chỗ) điểm chạy số,
   bạn vừa được điểm sáng lên, bạn dẫn đầu đội vương miện */
.dt-stage .dt-board { position: absolute; z-index: 2; left: 50%; transform: translateX(-50%); bottom: calc(max(16px, env(safe-area-inset-bottom)) + 64px);
  width: min(1100px, calc(100% - 32px)); display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(6px, 1vw, 14px); pointer-events: none; }
.dt-stage .dt-board[hidden] { display: none; }
.dt-stage .dt-board-t { grid-column: 1 / -1; justify-self: center; padding: 6px 18px; border-radius: 10px; background: rgba(6, 12, 40, 0.88);
  border: 1px solid rgba(255, 211, 107, 0.5); color: #ffd36b; font-size: clamp(13px, 0.9vw + 0.6vh, 24px); font-weight: 900; letter-spacing: 0.04em; text-transform: uppercase;
  animation: dt-bin 0.4s ease-out both; }
.dt-stage .dt-bc { position: relative; display: grid; justify-items: center; gap: 2px; padding: clamp(8px, 1.2vh, 16px) 8px; border-radius: 14px;
  background: linear-gradient(180deg, rgba(14, 26, 84, 0.95), rgba(4, 8, 32, 0.95)); border: 2px solid rgba(255, 255, 255, 0.14); border-top: 6px solid var(--c);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.5); color: #fff; animation: dt-bin 0.45s ease-out both; animation-delay: calc(0.15s + var(--k) * 0.1s); }
.dt-stage .dt-bc-n { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: clamp(13px, 0.9vw + 0.6vh, 24px); font-weight: 800; }
.dt-stage .dt-bc-s { font-size: clamp(30px, 2.6vw + 2vh, 72px); font-weight: 900; line-height: 1; color: #ffd45c; font-variant-numeric: tabular-nums; }
.dt-stage .dt-bc em { font-style: normal; font-size: clamp(12px, 0.7vw + 0.6vh, 20px); font-weight: 900; color: #9fb3e8; }
.dt-stage .dt-bc.is-up { border-color: rgba(44, 255, 138, 0.7); border-top-color: var(--c); box-shadow: 0 0 26px rgba(44, 255, 138, 0.45), 0 10px 28px rgba(0, 0, 0, 0.5); }
.dt-stage .dt-bc.is-up em { color: #2cff8a; }
.dt-stage .dt-bc.is-down em { color: #ff6b7a; }
.dt-stage .dt-bc.is-me { outline: 3px solid #fff3c4; outline-offset: 2px; }
.dt-stage .dt-bc.is-lead::before { content: '👑'; position: absolute; top: -0.9em; font-size: clamp(20px, 1.4vw + 1vh, 38px); animation: dt-crown 1.6s ease-in-out infinite alternate; }
@keyframes dt-bin { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
@keyframes dt-crown { to { transform: translateY(-4px) rotate(-6deg); } }
.dt-stage .dt-bc-s.is-run { animation: dt-tick 0.18s ease-in-out infinite alternate; }
@keyframes dt-tick { to { transform: scale(1.08); } }
@media (max-width: 560px) { .dt-stage .dt-board { grid-template-columns: repeat(2, 1fr); row-gap: 18px; } }
@media (prefers-reduced-motion: reduce) {
  .dt-stage .dt-bc, .dt-stage .dt-board-t { animation-name: dt-fade; animation-duration: 0.8s; }
  .dt-stage .dt-bc.is-lead::before { animation-duration: 4s; }
  .dt-stage .dt-bc-s.is-run { animation-duration: 0.6s; }
}
@keyframes dt-fade { from { opacity: 0; } to { opacity: 1; } }
/* đồng hồ đọc đề (có bạn tự đọc): vòng xanh dương, chữ "đọc đề" thay "giây" */
.dt-stage .ch-qov-clock.is-read .is-fg { stroke: #56c8ff; }
.dt-stage .ch-qov-clock.is-read small { font-size: 9px; }
.dt-stage .ch-qov-clock.is-aud .is-fg { stroke: #2cff8a; }
`;

const FONTS = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Nunito:wght@500;600;700;800;900&display=swap';

/** Thẻ 🏆: sảnh ngoài (src/dauTruong/lobby.js: giờ lượt tới, vào trường quay, xem sân khấu thử). */
export function render(app, onBack) {
  return lobbyRender(app, onBack, { stage: (opts, back) => stage(app, back, opts) });
}

/**
 * Sân khấu 3D. flow: chương trình thật (src/dauTruong/flow.js dựng các bước nhân vật, ghế, chờ giờ, kết nối trên sân khấu này):
 * khán phòng trống, chỉ người thật ngồi ghế. Không có flow: bản mẫu như trước (khán giả giả, nút chạy thử từng vòng).
 * Trả { dispose, api } (api: setMode, cam, seatPupil, seatCam, seatIds).
 */
export function stage(app, onBack, { flow = false } = {}) {
  if (!document.getElementById('dt-stage-css')) {
    const st = document.createElement('style'); st.id = 'dt-stage-css'; st.textContent = CSS + CERT_CSS; document.head.appendChild(st);
  }
  if (!document.querySelector(`link[href="${FONTS}"]`)) document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="${FONTS}">`);
  app.innerHTML = `<div class="ch is-fixed dt-stage">
    <div class="ch-qov" hidden></div>
    <div class="dt-live" hidden></div>
    <div class="dt-board" hidden aria-live="polite"></div>
    <div class="dt-cert" hidden role="dialog" aria-label="Giấy chứng nhận của em"></div>
    <div class="dt-collect" hidden role="dialog" aria-label="Phần thưởng sao của em"></div>
    <div class="ch-top">
      <button type="button" class="ch-ic dt-back" aria-label="Quay lại" title="Quay lại">${icon('x')}</button>
      <div class="ch-chip"><span class="ch-dot" aria-hidden="true"></span><span class="ch-title">${SHOW_NAME}</span><span class="ch-seat">${flow ? `Lớp ${getProfileGrade() || ''}`.trim() : 'bản mẫu'}</span></div>
      <div class="dt-elapsed is-off" role="timer" aria-label="Thời gian chương trình đã diễn"><i>Đã diễn</i><b>0:00</b></div>
      <button type="button" class="ch-ic dt-mode" aria-haspopup="menu" aria-expanded="false"></button>
    </div>
    <div class="dt-cap" aria-live="polite"><b></b><span></span></div>
    <div class="dt-menu" role="menu" hidden></div>
    <div class="ch-views" role="toolbar" aria-label="Góc máy"><span class="ch-views-list"></span><button type="button" class="ch-views-set" aria-expanded="false" aria-label="Chỉnh góc máy" title="Chỉnh góc máy">${icon('sliders')}</button></div>
    <div class="ch-camset dt-camset" hidden>
      <div class="dt-cs-top"><b>Chỉnh góc máy</b><span class="dt-cs-kind"></span><button type="button" class="ch-ic" data-cs="close" aria-label="Đóng">${icon('x')}</button></div>
      ${CAM_ROWS.map(([ax, label, keys, a, b]) => `<div class="ch-cam-row"><span>${label} <i>${keys}</i></span>
        <button type="button" class="ch-ic" data-ax="${ax}" data-d="${a[0]}" aria-label="${label} ${a[1]}">${a[1]}</button>
        <button type="button" class="ch-ic" data-ax="${ax}" data-d="${b[0]}" aria-label="${label} ${b[1]}">${b[1]}</button></div>`).join('')}
      <div class="dt-cs-grid">
        <span>Vị trí</span><input data-f="px" type="text" inputmode="decimal" autocomplete="off" aria-label="Vị trí x"><input data-f="py" type="text" inputmode="decimal" autocomplete="off" aria-label="Vị trí cao"><input data-f="pz" type="text" inputmode="decimal" autocomplete="off" aria-label="Vị trí z">
        <span>Nhìn tới</span><input data-f="tx" type="text" inputmode="decimal" autocomplete="off" aria-label="Nhìn tới x"><input data-f="ty" type="text" inputmode="decimal" autocomplete="off" aria-label="Nhìn tới cao"><input data-f="tz" type="text" inputmode="decimal" autocomplete="off" aria-label="Nhìn tới z">
        <span>Góc nhìn</span><input data-f="fov" type="text" inputmode="decimal" autocomplete="off" aria-label="Góc nhìn (độ)"><i>độ</i><i>x · cao · z</i>
      </div>
      <label class="dt-cs-which">Góc <select data-cs="which"></select></label>
      <div class="ch-cam-foot">
        <button type="button" data-cs="save">💾 Lưu vào góc này</button>
        <button type="button" data-cs="add">➕ Thêm góc mới</button>
        <button type="button" data-cs="reset">↺ Về mặc định</button>
        <button type="button" data-cs="del" hidden>🗑 Xoá góc</button>
        <button type="button" data-cs="copy">📋 Sao chép</button>
      </div>
      <p class="dt-cs-help">Phím 1–9 chọn góc. Lưu trên máy này, riêng màn ngang và màn dọc. Sao chép rồi gửi để đặt làm mặc định cho mọi người.</p>
      <p class="dt-cs-note" aria-live="polite"></p>
    </div>
  </div>`;
  const root = app.querySelector('.dt-stage');
  root.classList.toggle('is-flow', flow);
  let gone = false, raf = 0;
  const { dispose, api } = mount();
  root.querySelector('.dt-back').addEventListener('click', () => { if (flow && api.onBack?.()) return; dispose(); onBack(); });
  return { dispose, api, root };

  function mount() {
    /* ---------- Khung cảnh ----------
       Hệ trục: x ngang (phải +), y lên, khán phòng ở phía +z nhìn về -z (sân khấu).
       Sân khấu: đĩa r 8.5 tâm (0, 0, -3), cao 0.6. Màn LED lớn ở tường sau z = -11.
       4 bục thí sinh trên một cung trước màn hình, quay ra khán phòng; bục MC bên trái phía trước.
       Khán phòng: 5 bậc × 10 ghế (50 chỗ), lối đi giữa. */
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    SFX.preload(); SFX.lobby(true); // âm thanh (docs/dau-truong/sfx.md): kho chung với Ai tài năng nhất
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    // điện thoại (màn nhỏ, mật độ điểm ảnh 3): vẽ dày hơn 2 để chữ trên màn LED / bục không nhoè khi nhìn từ xa
    // Vẽ đúng bằng số điểm ảnh thật của máy (điện thoại 3): tỉ lệ lẻ (2.5) làm trình duyệt phóng ảnh lên nên nhoè.
    const small = (root.clientWidth || innerWidth) * (root.clientHeight || innerHeight) < 600000;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, small ? 3 : 2));
    renderer.setSize(root.clientWidth || innerWidth, root.clientHeight || innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    renderer.shadowMap.enabled = true;
    renderer.domElement.className = 'ch-canvas';
    root.prepend(renderer.domElement);

    /* ---------- Làm nét (sharpen) ----------
       Vẽ cảnh vào tấm đệm (MSAA 4) rồi phủ ra màn hình qua bộ lọc tăng nét theo độ tương phản (kiểu AMD CAS):
       chữ trên màn LED, bục, nhân vật ở xa không bị mềm. Tấm đệm gắn cờ isXRRenderTarget để three vẫn
       tone-map từng vật liệu (màn LED toneMapped: false giữ màu) và ghi sẵn sRGB như khi vẽ thẳng ra canvas. */
    const sharpRT = new THREE.WebGLRenderTarget(1, 1, { samples: 4, depthBuffer: true });
    sharpRT.texture.colorSpace = THREE.SRGBColorSpace;
    sharpRT.texture.internalFormat = 'RGBA8'; // cùng định dạng với bộ đệm MSAA (blit đòi khớp), giá trị đã mã hoá sRGB
    sharpRT.isXRRenderTarget = true;
    const sharpMat = new THREE.ShaderMaterial({
      uniforms: { tDiffuse: { value: sharpRT.texture }, px: { value: new THREE.Vector2() }, amount: { value: 0.9 } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
      fragmentShader: `
        uniform sampler2D tDiffuse; uniform vec2 px; uniform float amount; varying vec2 vUv;
        void main(){
          vec3 c = texture2D(tDiffuse, vUv).rgb;
          vec3 n = texture2D(tDiffuse, vUv + vec2(0.0, px.y)).rgb;
          vec3 s = texture2D(tDiffuse, vUv - vec2(0.0, px.y)).rgb;
          vec3 e = texture2D(tDiffuse, vUv + vec2(px.x, 0.0)).rgb;
          vec3 w = texture2D(tDiffuse, vUv - vec2(px.x, 0.0)).rgb;
          vec3 mn = min(c, min(min(n, s), min(e, w)));
          vec3 mx = max(c, max(max(n, s), max(e, w)));
          vec3 amp = sqrt(clamp(min(mn, 1.0 - mx) / max(mx, vec3(1e-4)), 0.0, 1.0));
          vec3 wt = -amp / mix(8.0, 5.0, amount);
          gl_FragColor = vec4(clamp((c + (n + s + e + w) * wt) / (1.0 + 4.0 * wt), 0.0, 1.0), 1.0);
        }`,
      depthTest: false, depthWrite: false, toneMapped: false,
    });
    const sharpQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), sharpMat); sharpQuad.frustumCulled = false;
    const sharpScene = new THREE.Scene(); sharpScene.add(sharpQuad);
    const sharpCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    function sharpSize() {
      const pr = renderer.getPixelRatio(), v = renderer.getSize(new THREE.Vector2());
      const W = Math.max(1, Math.round(v.x * pr)), H = Math.max(1, Math.round(v.y * pr));
      sharpRT.setSize(W, H);
      // máy mật độ cao: lấy mẫu xa hơn một chút để vết nhoè trải trên nhiều điểm ảnh vẫn được kéo nét
      const off = pr >= 2 ? 1.5 : 1;
      sharpMat.uniforms.px.value.set(off / W, off / H);
    }
    sharpSize();
    const noSharp = /[?&]nosharp\b/.test(location.search); // so sánh trước / sau
    function present(scene, camera) {
      if (noSharp) { renderer.render(scene, camera); return; }
      renderer.setRenderTarget(sharpRT); renderer.render(scene, camera);
      renderer.setRenderTarget(null); renderer.render(sharpScene, sharpCam);
    }

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
      { id: 'wide', name: 'Toàn cảnh', icon: 'eye', land: { pos: [-0.01, 4.99, 21.89], target: [0, 2.4, -3], fov: 48 } },
      // lúc lên câu hỏi: áp sát màn LED, khớp khung câu hỏi vào phần màn hình còn trống phía trên dải đáp án (fitScreen)
      { id: 'screen', name: 'Màn hình câu hỏi', icon: 'monitor', fit: true },
      { id: 'front', name: 'Trực diện', icon: 'cam', land: { pos: [0, 3.2, 9.5], target: [0, 2.6, -3], fov: 48 } },
      { id: 'players', name: 'Bục thí sinh', icon: 'users', land: { pos: [1.2, 2.3, 6.2], target: [0, 1.5, -1.6], fov: 48 } },
      { id: 'mc', name: 'MC', icon: 'user', land: { pos: [-2.9, 2.2, 4.8], target: [-6.3, 1.6, 0.4], fov: 48 } },
      { id: 'crowd', name: 'Khán phòng', icon: 'seats', land: { pos: [0, 5.5, -1.5], target: [0, 1.5, 12], fov: 48 } },
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
      if (p.fit) return fitScreen(kind);
      const land = camStore.set[p.id]?.land || p.land || p.port;
      return kind === 'port' ? { ...land, fov: Math.min(95, land.fov + 24) } : land;
    }
    const nowView = () => ({ pos: camera.position.toArray(), target: controls.target.toArray(), fov: camera.fov });
    let camTo = null, camCur = 'wide';
    controls.addEventListener('start', () => { camTo = null; }); // tự kéo xoay giữa chừng: dừng bay, không giằng co
    let meSeat = null;   // ghế của mình (flow): người cầm máy là khán giả ở ghế này
    let meOnPod = !flow; // người cầm máy đứng bục (bản mẫu: bục 1; chương trình thật: bật "Em muốn lên bục", setPods)
    let myPod = flow ? -1 : 0;   // bục của người cầm máy (-1: không đứng bục). Chương trình chung: bục xếp như máy chủ trò
    /* Chương trình chung (flow + máy chủ phòng): sync = { host, myId, net }. host: máy này chạy chương trình (MC, đồng hồ, bạn ảo,
       chấm điểm) rồi gửi ảnh chụp ('xs') và hiệu ứng ('xf') cho cả phòng; không phải host: chỉ hiện theo ảnh chụp, thao tác của
       mình gửi về máy chủ trò ('xi'). null: một mình (bản mẫu, không có máy chủ phòng) chạy như cũ. */
    let sync = null;
    let meRing = null;   // vòng vàng trên ghế của mình (flow, dựng ở phần Ghế của người thật)
    function cam(k, now = false) {
      const p = findCam(k);
      if (!p) return;
      camCur = k;
      if (meRing) meRing.visible = true;   // góc khác: vòng vàng chỉ chỗ mình ngồi
      flyCam(viewOf(p), now || k === 'screen'); // góc câu hỏi: cắt cảnh tới ngay, không bay (trẻ đọc câu liền)
      paintCams();
    }
    /* Chuyển góc máy A → B: tween theo thời gian (không phụ thuộc tốc độ khung hình), nhanh dần rồi chậm dần (easeInOutCubic).
       Thời lượng theo quãng đường: dời ngắn 0.7 s, bay xa tối đa 1.8 s. Bay xa thì nhấc camera lên một chút giữa đường
       như cần cẩu trường quay, khỏi xuyên qua bục / ghế. Giảm chuyển động: vẫn bay, chậm và êm hơn, không nhấc. */
    function flyCam(v, now = false, o = {}) {
      const p = new THREE.Vector3(...v.pos), t = new THREE.Vector3(...v.target);
      if (now) {
        camera.position.copy(p); controls.target.copy(t); camera.fov = v.fov; camera.updateProjectionMatrix(); camTo = null;
        return;
      }
      const p0 = camera.position.clone(), t0 = controls.target.clone();
      const dist = Math.max(p0.distanceTo(p), t0.distanceTo(t) * 0.7);
      if (dist < 0.01 && Math.abs(camera.fov - v.fov) < 0.1) { camTo = null; return; }
      const dur = o.dur ? o.dur / 1000 : (reduce ? 1.3 : 1) * THREE.MathUtils.clamp(0.7 + dist * 0.045, 0.7, 1.8);
      const lift = o.lift ?? (reduce ? 0 : Math.min(1.6, Math.max(0, dist - 6) * 0.08));
      camTo = { p0, t0, fov0: camera.fov, p, t, fov: v.fov, start: performance.now(), dur: dur * 1000, lift };
    }
    function stepCam(nowMs) {
      if (!camTo) return;
      const k = Math.min(1, (nowMs - camTo.start) / camTo.dur);
      const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      camera.position.lerpVectors(camTo.p0, camTo.p, e);
      camera.position.y += Math.sin(Math.PI * e) * camTo.lift;
      controls.target.lerpVectors(camTo.t0, camTo.t, e);
      camera.fov = camTo.fov0 + (camTo.fov - camTo.fov0) * e; camera.updateProjectionMatrix();
      if (k >= 1) camTo = null;
    }

    /* Góc "Màn hình câu hỏi": camera nhìn thẳng màn LED, khung câu hỏi (CARD) vừa khít phần màn hình còn trống giữa thanh trên
       và dải đáp án (đo DOM), nên chữ câu hỏi to nhất có thể trên mọi máy, ngang hay dọc. */
    function fitScreen(kind = camKind()) {
      const r0 = root.getBoundingClientRect(), H = r0.height || innerHeight, Wd = r0.width || innerWidth;
      const top = (root.querySelector('.ch-top .ch-ic')?.getBoundingClientRect().bottom ?? r0.top + 54) - r0.top + 8;
      const box = ov && !ov.hidden ? ov.querySelector('.ch-qov-box') : null;
      // tấm nền của dải nhô lên 18 px trên mép dải, đồng hồ ngồi trên mép tấm: chừa chỗ; chưa có dải thì coi như dải chiếm 40% dưới
      const bottom = box ? box.getBoundingClientRect().top - r0.top - (H < 520 ? 36 : 56) : H * 0.6;
      const free = Math.max(H * 0.3, bottom - top);
      const fov = kind === 'port' ? 50 : 40, tan = Math.tan(fov * Math.PI / 360), aspect = Wd / H;
      // màn ngang trong vòng thi: chừa cột trái cho ô camera trực tiếp (.dt-live, khổ dọc 3:4 vừa người đang trả lời),
      // khung câu hỏi khớp vào phần còn lại bên phải; không chừa thì cột chỉ còn một khe hẹp, bạn ấy nhỏ xíu khó nhìn
      const lw = kind === 'land' && ROUNDS[mode]?.sec ? Math.min(free * 0.72, Wd * 0.3) + 24 : 0;
      const freeW = Wd - lw - 12;
      // khung câu hỏi trên màn (toạ độ canvas 1600 × 900 → mét), chừa lề 4%
      const cw = SCR.w * CARD.w / 1600 * 1.04, ch = SCR.h * CARD.h / 900 * 1.04;
      const cy = SCR.y + SCR.h * (0.5 - (CARD.y + CARD.h / 2) / 900);
      const d = Math.max(ch / (2 * tan * free / H), cw / (2 * tan * aspect * freeW / Wd));
      const yc = 1 - 2 * (top + free / 2) / H;   // tâm phần trống, toạ độ chuẩn hoá (-1..1)
      const xc = 2 * (lw + freeW / 2) / Wd - 1;
      const y = cy - yc * d * tan, x = -xc * d * tan * aspect;
      return { pos: [x, y, SCR.z + d], target: [x, y, SCR.z], fov };
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
    const SCR = { w: 13, h: 7.3, y: 5.9, z: -11.1 };
    // vẽ theo toạ độ 1600 × 900 (drawScreen) trên tấm 2048 × 1152 để chữ nét khi camera áp sát
    const scrCanvas = document.createElement('canvas'); scrCanvas.width = 2048; scrCanvas.height = 1152;
    const scrTex = new THREE.CanvasTexture(scrCanvas); scrTex.colorSpace = THREE.SRGBColorSpace; scrTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    add(new THREE.BoxGeometry(SCR.w + 0.5, SCR.h + 0.5, 0.2), mat.silver, 0, 5.9, -11.25);
    /* Màn ảnh (màn LED, màn bục) nét khi nhìn xa: lấy tầng mipmap mịn hơn nửa bậc (bias −0,6), cách của phòng trường quay
       bên Kinh Thánh (church/studio.js). Gần như không tốn gì, khác hẳn vẽ dư cả cảnh. */
    const crispMap = (m) => {
      // lúc onBeforeCompile shader còn dòng #include chưa mở: thay cả đoạn map_fragment bằng bản có bias
      const chunk = THREE.ShaderChunk.map_fragment.replace('texture2D( map, vMapUv )', 'texture2D( map, vMapUv, -0.6 )');
      m.onBeforeCompile = (sh) => { sh.fragmentShader = sh.fragmentShader.replace('#include <map_fragment>', chunk); };
      m.customProgramCacheKey = () => 'dt-crisp';
      return m;
    };
    const scr = add(new THREE.PlaneGeometry(SCR.w, SCR.h), crispMap(new THREE.MeshBasicMaterial({ map: scrTex, toneMapped: false })), 0, 5.9, -11.1);
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
    const poolTex = (() => {
      const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d');
      const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.55, 'rgba(255,255,255,0.75)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
      const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; return tx;
    })();
    const poolGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
    const beamGeo = new THREE.ConeGeometry(1.1, 11, 24, 1, true).translate(0, -5.5, 0);
    for (let i = 0; i < 8; i++) {
      const x = -9 + i * (18 / 7), z = i % 2 ? -7 : 1;
      const head = add(new THREE.CylinderGeometry(0.22, 0.28, 0.45, 12), mat.truss, x, 10.6, z);
      const m = new THREE.MeshBasicMaterial({ color: '#4fd2ff', transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
      const cone = new THREE.Mesh(beamGeo, m); cone.position.set(x, 10.5, z); scene.add(cone);
      // vệt sáng tròn nơi tia đèn chạm sàn / mặt sân khấu: chạy theo đèn quét (hiệu ứng thấy rõ nhất)
      const pm = new THREE.MeshBasicMaterial({ map: poolTex, color: '#4fd2ff', transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending,
        depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2, toneMapped: false });
      const pool = new THREE.Mesh(poolGeo, pm); pool.renderOrder = 2; scene.add(pool);
      beams.push({ cone, pool, ph: i * 0.8, x });
    }
    const beamDir = new THREE.Vector3();
    // đặt vệt sáng: giao tia (đỉnh nón xuống theo hướng nón) với mặt sân khấu (đĩa r 8.5 tâm (0, -3), cao 0.6) hoặc sàn
    function placePool(b) {
      const o = b.cone.position;
      beamDir.set(0, -1, 0).applyQuaternion(b.cone.quaternion);
      let h = 0.61, k = (h - o.y) / beamDir.y, hx = o.x + beamDir.x * k, hz = o.z + beamDir.z * k;
      if (Math.hypot(hx, hz + 3) > 8.4) { h = 0.02; k = (h - o.y) / beamDir.y; hx = o.x + beamDir.x * k; hz = o.z + beamDir.z * k; }
      const r = 0.1 * k * 1.15;   // nón bán kính 1.1 / dài 11, vệt rộng hơn chút cho mềm mép
      b.pool.position.set(hx, h, hz);
      b.pool.rotation.y = Math.atan2(beamDir.x, beamDir.z);
      b.pool.scale.set(r * 2, 1, (r * 2) / Math.max(0.35, -beamDir.y));   // chiếu xiên: vệt dài ra
      b.pool.material.color.copy(b.cone.material.color);
    }

    /* ---------- Nhân vật đơn giản (thay bằng mô hình đất sét của game khi dựng thật) ---------- */
    const SKIN = ['#f2c7a1', '#e8b48c', '#d9a07a'];
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
    // tên, nhân vật, trình độ của 4 thí sinh: setPods (bạn ảo cùng tên cùng lớp với bảng xếp hạng, src/dauTruong/npc.js).
    // Bản mẫu: bục 1 là người đang cầm máy; chương trình thật: flow.js đưa danh sách, bục chưa có ai thì trống.
    const NAMES = ['', '', '', ''];
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
      const canv = podCanvas(); const tex = new THREE.CanvasTexture(canv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      add(new THREE.PlaneGeometry(0.98, 0.575), crispMap(new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })), 0, 0.5, 0.385, g);
      // máy tính bảng trả lời (quay về thí sinh) + chuông
      const tab = add(new THREE.BoxGeometry(0.62, 0.03, 0.42), M('#0d1330', { roughness: .2, metalness: .6 }), -0.25, 0.96, -0.12, g);
      tab.rotation.x = -0.35;
      const tabScr = add(new THREE.PlaneGeometry(0.56, 0.36), glow('#2f6bff', 1.2), -0.25, 0.982, -0.115, g);
      tabScr.rotation.x = -Math.PI / 2 - 0.35;
      add(new THREE.CylinderGeometry(0.13, 0.15, 0.06, 24), mat.silver, 0.5, 0.96, -0.1, g);
      const bell = add(new THREE.SphereGeometry(0.11, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), glow(col, 1.6), 0.5, 0.99, -0.1, g);
      // bấm chuông: quầng sáng màu bục quanh chuông + vòng sáng loang ra mặt bàn (stepBell), ai bấm nhìn là biết
      const bellGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: poolTex, color: col, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
      bellGlow.position.set(0.5, 1.06, -0.1); bellGlow.scale.setScalar(0.9); g.add(bellGlow);
      const bellWave = new THREE.Mesh(new THREE.TorusGeometry(1, 0.012, 6, 40).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
      bellWave.position.set(0.5, 0.97, -0.1); bellWave.visible = false; g.add(bellWave);
      const kid = person({ h: 1.45, shirt: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'][i] });
      kid.position.set(0, 0.12, -0.62); g.add(kid);
      add(new THREE.BoxGeometry(0.34, 0.22, 0.02), M(COLORS[i]), 0, 0.98, 0.18, kid);  // thẻ màu đội (hình khối tạm: học sinh Hyper3D tải xong thì bỏ)
      const spot = new THREE.SpotLight(col, 60, 14, 0.32, 0.6, 1.4);
      spot.position.set(x * 1.05, 10.5, z + 3); spot.target = kid; spot.castShadow = i === 1 || i === 2; scene.add(spot);
      kid.visible = false;
      pods.push({ g, col, ringM, canv, tex, tabScr, bell, bellGlow, bellWave, ringT: -1, spot, score: 0, rs: { kd: 0, tt: 0, vd: 0 }, shown: 0, state: 'idle', lockAt: 0, kid, name: NAMES[i], skill: 'kha', wantKind: -1, kindNow: -1 });
    }

    function drawPod(p, sec) {
      const c = p.canv.getContext('2d'); const W = c.canvas.width, H = c.canvas.height;
      const st = p.state;
      const bg = st === 'right' ? '#0f9d58' : st === 'wrong' ? '#c62828' : st === 'locked' ? '#1d3fbf' : st === 'buzz' ? p.col.getStyle() : st === 'turn' ? '#5a4300' : '#0a1550';
      const grd = c.createLinearGradient(0, 0, 0, H); grd.addColorStop(0, bg); grd.addColorStop(1, '#050b2e');
      c.fillStyle = grd; c.fillRect(0, 0, W, H);
      c.fillStyle = p.col.getStyle(); c.fillRect(0, 0, W, 16);
      c.fillStyle = '#fff'; c.font = '600 46px Segoe UI'; c.textAlign = 'center';
      if (!p.name) {   // bục chưa có ai: chờ MC mời
        c.fillStyle = '#cfe0ff'; c.font = '700 54px Segoe UI'; c.fillText('Bục trống', W / 2, 150);
        c.font = '600 34px Segoe UI'; c.fillText('Chờ MC mời lên', W / 2, 215);
        p.tex.needsUpdate = true; return;
      }
      c.fillText(`${p.star ? '⭐ ' : ''}${p.name}`, W / 2, 72);
      c.font = '800 130px Segoe UI'; c.fillStyle = '#ffd45c'; c.fillText(String(Math.round(p.shown)), W / 2, 210);
      c.font = '600 34px Segoe UI'; c.fillStyle = '#cfe0ff';
      const label = st === 'locked' ? `Đã chốt ${p.lockAt.toFixed(1)} giây` : st === 'right' ? `Đúng! +${p.gain}` : st === 'wrong' ? (p.gain < 0 ? `Sai ${p.gain}` : 'Chưa đúng')
        : st === 'think' ? 'Đang suy nghĩ…' : st === 'buzz' ? '🔔 Giành quyền!' : st === 'turn' ? 'Đến lượt' : '';
      c.fillText(label, W / 2, 272);
      if (st === 'think' && sec != null) { c.fillStyle = p.col.getStyle(); c.fillRect(30, 285, (W - 60) * sec, 8); }
      p.tex.needsUpdate = true;
    }

    /* ---------- Mừng bạn trả lời đúng (mỗi câu, trước khi sang câu mới) ----------
       Lật đáp án: bục của bạn đúng có một cột đèn vàng trắng rọi thẳng từ giàn đèn xuống (nón sáng + vệt tròn trên bục), đèn rọi
       bục sáng gấp đôi; camera sang các bục thì pháo giấy tung lên từ bục đó và một vòng sáng loang ra dưới chân. Đèn tắt khi
       sang câu mới. Giảm chuyển động: vẫn tung nhưng ít giấy, bay chậm, không vòng loang. */
    const HALO_H = 9.4;
    const haloGeo = new THREE.ConeGeometry(1.25, HALO_H, 32, 1, true).translate(0, -HALO_H / 2, 0);
    pods.forEach(p => {
      const m = new THREE.MeshBasicMaterial({ color: '#fff1b8', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false });
      p.halo = new THREE.Mesh(haloGeo, m); p.halo.position.set(p.g.position.x, 0.62 + HALO_H + 0.1, p.g.position.z); p.halo.visible = false; scene.add(p.halo);
      const pm = new THREE.MeshBasicMaterial({ map: poolTex, color: '#ffe08a', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
      p.haloPool = new THREE.Mesh(poolGeo, pm); p.haloPool.scale.setScalar(3.2); p.haloPool.position.set(p.g.position.x, 0.76, p.g.position.z); p.haloPool.renderOrder = 3; scene.add(p.haloPool);
      p.wave = new THREE.Mesh(new THREE.TorusGeometry(1, 0.05, 8, 48).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#ffd45c', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
      p.wave.position.set(p.g.position.x, 0.8, p.g.position.z); p.wave.visible = false; scene.add(p.wave);
      p.lit = 0; p.waveT = -1;
    });
    // pháo giấy: một InstancedMesh chung (mảnh giấy nhỏ xoay lật), mỗi lần tung lấy các mảnh đang rảnh
    const CONF_N = 1100;   // đủ cho mưa giấy lúc trao giải (stepRain) cộng vài lần tung
    const confMesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.1, 0.06), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, toneMapped: false }), CONF_N);
    confMesh.frustumCulled = false; confMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); scene.add(confMesh);
    const confP = Array.from({ length: CONF_N }, () => ({ life: 0, p: new THREE.Vector3(), v: new THREE.Vector3(), r: new THREE.Euler(), w: new THREE.Vector3() }));
    const confCol = new THREE.Color(), confObj = new THREE.Object3D();
    confP.forEach((c, i) => { confMesh.setColorAt(i, confCol.set('#ffffff')); confObj.scale.setScalar(0); confObj.updateMatrix(); confMesh.setMatrixAt(i, confObj.matrix); });
    const CONF_COLS = ['#ffd36b', '#2cff8a', '#56c8ff', '#ff6fb1', '#ffffff', '#ff9f2e', '#b07cff'];
    function burst(p) {
      burstAt(p.g.position.x, 1.9, p.g.position.z);
      if (!reduce) p.waveT = 0;
    }
    /** Tung pháo giấy từ điểm (x, y, z); n mảnh (giảm chuyển động: ít hơn, chậm hơn). */
    function burstAt(x, y, z, n = reduce ? 40 : 110) {
      const sp = reduce ? 0.55 : 1;
      let k = 0;
      for (let i = 0; i < CONF_N && k < n; i++) {
        const c = confP[i]; if (c.life > 0) continue; k++;
        const a = Math.random() * Math.PI * 2, out = 0.6 + Math.random() * 1.6;
        c.p.set(x + (Math.random() - 0.5) * 0.6, y, z + (Math.random() - 0.5) * 0.4);
        c.v.set(Math.cos(a) * out * sp, (4.2 + Math.random() * 2.6) * sp, Math.sin(a) * out * sp * 0.7);
        c.r.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
        c.w.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 8).multiplyScalar(sp);
        c.life = reduce ? 3.4 : 2.8;
        confMesh.setColorAt(i, confCol.set(CONF_COLS[i % CONF_COLS.length]));
      }
      confMesh.instanceColor.needsUpdate = true;
    }
    function stepCelebrate(dt) {
      let live = false;
      confP.forEach((c, i) => {
        if (c.life <= 0) return;
        c.life -= dt; live = true;
        c.v.y -= (reduce ? 2.2 : 4.6) * dt; c.v.multiplyScalar(1 - 0.9 * dt);   // trọng lực + cản gió: giấy lả tả rơi chậm dần
        if (c.v.y < -1.4) c.v.y = -1.4;
        c.p.addScaledVector(c.v, dt);
        c.r.x += c.w.x * dt; c.r.y += c.w.y * dt; c.r.z += c.w.z * dt;
        confObj.position.copy(c.p); confObj.rotation.copy(c.r);
        confObj.scale.setScalar(c.life > 0 && c.p.y > 0.7 ? Math.min(1, c.life * 2) : 0);
        confObj.updateMatrix(); confMesh.setMatrixAt(i, confObj.matrix);
      });
      if (live) confMesh.instanceMatrix.needsUpdate = true;
      pods.forEach(p => {
        const want = p.state === 'right' ? 1 : 0;
        p.lit += (want - p.lit) * Math.min(1, dt * (want ? 3 : 5));
        p.halo.visible = p.lit > 0.01;
        p.halo.material.opacity = 0.22 * p.lit * (reduce ? 1 : 0.85 + 0.15 * Math.sin(performance.now() / 180));
        p.haloPool.material.opacity = 0.9 * p.lit;
        if (p.waveT >= 0) {
          p.waveT += dt; const k = p.waveT / 0.9;
          p.wave.visible = k < 1; p.wave.scale.setScalar(0.6 + k * 2.6); p.wave.material.opacity = (1 - k) * 0.9;
          if (k >= 1) p.waveT = -1;
        }
      });
    }

    /* ---------- 🏆 Bục vinh danh (Trao giải) ----------
       Bốn khối giữa sân khấu, trước các bục thí sinh, nhìn ra khán phòng; trái → phải: hạng 4 · 2 · 1 · 3 (hạng nhất cao nhất, ở giữa
       ba khối huy chương). MC đọc tới hạng nào thì camera áp lại khối đó, bạn ấy bật lên đứng trên khối, cúi chào rồi mừng, đeo huy
       chương (vàng, bạc, đồng, xanh), cột sáng rọi xuống, pháo giấy tung; đọc xong quán quân thì giấy rơi ngập sân khấu, toàn cảnh.
       Mặt khối ghi hạng, tên và sao thưởng. Giảm chuyển động: vẫn đủ các bước, bật lên chậm, giấy rơi thưa hơn. */
    const AWARD_X = 0.8, AWARD_Z = 2.4;
    const MEDAL = ['#ffc83a', '#dfe6f2', '#e08a48', '#7fb4ff'];
    const STEP_H = [1.05, 0.8, 0.6, 0.42], STEP_X = [0, -1.62, 1.62, -3.24];
    const awardG = new THREE.Group(); awardG.position.set(AWARD_X, 0.62, AWARD_Z); awardG.visible = false; scene.add(awardG);
    function medalMesh(col) {
      const g = new THREE.Group(), rib = M('#d8344f', { roughness: .6, metalness: 0 });
      // hai dải ruy băng từ cổ áo chụm xuống, đĩa huy chương giữa ngực
      add(new THREE.BoxGeometry(0.04, 0.17, 0.012), rib, -0.04, 0.08, 0, g).rotation.z = 0.42;
      add(new THREE.BoxGeometry(0.04, 0.17, 0.012), rib, 0.04, 0.08, 0, g).rotation.z = -0.42;
      add(new THREE.CylinderGeometry(0.075, 0.075, 0.022, 32).rotateX(Math.PI / 2), M(col, { roughness: .22, metalness: .85, emissive: col, emissiveIntensity: .35 }), 0, -0.04, 0.012, g);
      return g;
    }
    const steps = MEDAL.map((col, r) => {
      const h = STEP_H[r], g = new THREE.Group(); g.position.x = STEP_X[r]; awardG.add(g);
      add(new THREE.BoxGeometry(1.5, h, 1.3), mat.white, 0, h / 2, 0, g);
      const edge = glow(new THREE.Color(col), 2.4);
      add(new THREE.BoxGeometry(1.54, 0.05, 1.34), edge, 0, h, 0, g);      // viền sáng mép trên
      add(new THREE.BoxGeometry(1.54, 0.04, 1.34), edge, 0, 0.02, 0, g);   // và chân khối
      const canv = document.createElement('canvas'); canv.width = 600; canv.height = Math.round(600 * (h - 0.1) / 1.42);
      const tex = new THREE.CanvasTexture(canv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      add(new THREE.PlaneGeometry(1.42, h - 0.1), crispMap(new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })), 0, h / 2, 0.652, g);
      const stand = new THREE.Group(); stand.position.set(0, h, 0.05); g.add(stand);
      const medal = medalMesh(col);
      const wx = AWARD_X + STEP_X[r], top = 0.62 + h;
      const spot = new THREE.SpotLight('#fff3d1', 0, 16, 0.2, 0.5, 1.2);
      spot.position.set(wx, 11, AWARD_Z + 3); spot.target = stand; scene.add(spot);
      const halo = new THREE.Mesh(haloGeo, new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }));
      halo.scale.set(0.9, 1, 0.9); halo.position.set(wx, top + HALO_H, AWARD_Z + 0.05); halo.visible = false; scene.add(halo);
      return { r, h, col, canv, tex, stand, medal, spot, halo, wx, top, who: null, stars: 0, lit: 0 };
    });
    function drawStep(s) {
      const c = s.canv.getContext('2d'), W = s.canv.width, H = s.canv.height;
      const grd = c.createLinearGradient(0, 0, 0, H); grd.addColorStop(0, '#13246e'); grd.addColorStop(1, '#070f3c');
      c.fillStyle = grd; c.fillRect(0, 0, W, H);
      c.fillStyle = s.col; c.fillRect(0, 0, W, 10);
      const rad = Math.min(H * 0.4, 92), cx = 26 + rad, cy = H / 2 + 4;
      c.beginPath(); c.arc(cx, cy, rad, 0, Math.PI * 2); c.fillStyle = s.col; c.fill();
      c.lineWidth = 6; c.strokeStyle = 'rgba(255,255,255,.75)'; c.stroke();
      c.fillStyle = '#1b1f3a'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = `900 ${Math.round(rad * 1.3)}px Segoe UI`;
      c.fillText(String(s.r + 1), cx, cy + rad * 0.06);
      if (s.who) {
        const x0 = cx + rad + 22, w = W - x0 - 16, fs = Math.min(66, H * 0.3);
        c.textAlign = 'left'; c.fillStyle = '#fff'; c.font = `800 ${Math.round(fs)}px Segoe UI`;
        c.fillText(s.who.name, x0, cy - fs * 0.55, w);
        c.fillStyle = '#ffd45c'; c.font = `800 ${Math.round(fs * 0.78)}px Segoe UI`;
        c.fillText(`⭐ ${s.stars} sao`, x0, cy + fs * 0.55, w);
      }
      s.tex.needsUpdate = true;
    }
    steps.forEach(drawStep);
    let awardOn = false, rainOn = false, rainAcc = 0;
    /** Bật / tắt bục vinh danh. Tắt: các bạn về lại bục thí sinh. */
    function showAward(on) {
      awardOn = on; awardG.visible = on; rainOn = false;
      if (!on) pods.forEach(p => {
        if (!p.award) return;
        if (p.medal) { p.kid.remove(p.medal); p.medal = null; }
        p.g.add(p.kid); p.kid.position.set(0, 0.12, -0.62); p.kid.rotation.set(0, 0, 0); p.kid.scale.setScalar(1);
        p.award = null;
      });
      steps.forEach(s => { s.who = null; s.stars = 0; drawStep(s); });
    }
    /** Bạn ở bục thí sinh p lên khối hạng r (0 = quán quân), mang `stars` sao thưởng. */
    function standOn(p, r, stars) {
      const s = steps[r];
      s.who = p; s.stars = stars; drawStep(s);
      s.stand.add(p.kid);
      p.kid.position.set(0, p.pupil ? -0.22 : -0.12, 0); p.kid.rotation.set(0, 0, 0);
      p.kid.scale.setScalar(0.01);
      // huy chương trước ngực, gắn vào bạn ấy (bật lên cùng); học sinh Hyper3D cao 1,5 m đứng trên bậc 0,22, hình khối tạm thấp hơn
      p.kid.add(s.medal); p.medal = s.medal;
      s.medal.position.set(0, p.pupil ? 1.12 : 0.95, p.pupil ? 0.17 : 0.22); s.medal.visible = true;
      p.award = { r, t: 0 };
      p.kid.visible = true;
      later(() => burstAt(s.wx, s.top + 1.6, AWARD_Z + 0.2, reduce ? 50 : 160), 250);
      SFX.ting?.(3 - r, true);
    }
    /** Mỗi khung: bạn trên khối bật lên (to dần, nảy nhẹ), cúi chào một lần rồi mừng; cột sáng, đèn rọi khối có người. */
    function stepAward(dt) {
      steps.forEach(s => {
        s.lit += ((s.who ? 1 : 0) - s.lit) * Math.min(1, dt * 3);
        s.halo.visible = s.lit > 0.01;
        s.halo.material.opacity = 0.2 * s.lit * (reduce ? 1 : 0.85 + 0.15 * Math.sin(performance.now() / 200 + s.r));
        s.spot.intensity = (s.r === 0 ? 220 : 150) * s.lit;
      });
      pods.forEach(p => {
        const a = p.award; if (!a) return;
        a.t += dt;
        const k = Math.min(1, a.t / (reduce ? 0.8 : 0.45));
        const e = reduce ? 1 - (1 - k) * (1 - k) : 1 + 2.7 * Math.pow(k - 1, 3) + 1.7 * Math.pow(k - 1, 2);   // easeOutBack: nảy nhẹ
        p.kid.scale.setScalar(Math.max(0.01, e));
        if (!p.pupil) return;
        // cúi chào một lần, rồi mừng luân phiên: mỗi bạn tự đổi kiểu sau vài giây, rút ngẫu nhiên (không lặp kiểu vừa làm, không
        // trùng kiểu bạn bên cạnh đang làm). Quán quân vui nhất: đổi nhanh hơn, toàn kiểu sôi nổi, nhịp nhanh hơn, nhún nhảy.
        const bow = p.pupil.clips.bow ? p.pupil.clips.bow.duration + 0.5 : 0;
        if (a.t < bow) pupilPlay(p.pupil, 'bow', { once: true, fade: 0.3 });
        else if (!a.joy || a.t >= a.next) {
          const pool = (a.r === 0 ? ['cheer', 'fists', 'yes', 'cheer'] : JOYS).filter(k => p.pupil.clips[k] && k !== a.joy);
          const busy = new Set(pods.filter(o => o !== p && o.award?.joy).map(o => o.award.joy));
          const pick = pool.filter(k => !busy.has(k));
          a.joy = (pick.length ? pick : pool)[(Math.random() * (pick.length || pool.length)) | 0] || 'cheer';
          a.next = a.t + (a.r === 0 ? 1.6 + Math.random() * 0.9 : 2.4 + Math.random() * 1.8);
          pupilPlay(p.pupil, a.joy, { fade: 0.35, at: Math.random() * 0.4 });
        }
        if (a.r === 0 && a.t >= bow) p.kid.position.y = (p.pupil ? -0.22 : -0.12) + (reduce ? 0 : Math.abs(Math.sin(a.t * 5.2)) * 0.08);
        p.pupil.mixer.update(dt * (reduce ? 0.6 : a.r === 0 ? 1.2 : 1));
      });
      if (!rainOn) return;
      // mưa giấy: rơi từ giàn đèn xuống khắp sân khấu phía trước
      rainAcc += dt * (reduce ? 30 : 130);
      let n = Math.floor(rainAcc); rainAcc -= n;
      let any = false;
      for (let i = 0; i < CONF_N && n > 0; i++) {
        const c = confP[i]; if (c.life > 0) continue; n--; any = true;
        c.p.set(-5 + Math.random() * 10, 6.5 + Math.random() * 2.5, AWARD_Z - 2.5 + Math.random() * 5);
        c.v.set((Math.random() - 0.5) * 0.6, -0.3 - Math.random() * 0.6, (Math.random() - 0.5) * 0.4);
        c.r.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
        c.w.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6).multiplyScalar(reduce ? 0.4 : 1);
        c.life = 7.5;
        confMesh.setColorAt(i, confCol.set(CONF_COLS[(Math.random() * CONF_COLS.length) | 0]));
      }
      if (any) confMesh.instanceColor.needsUpdate = true;
    }
    /** Góc máy trao giải: nhìn thẳng bục vinh danh, khung (cx ± halfW, cy ± halfH) vừa màn hình (ngang hay dọc). */
    function awardView(cx, cy, halfW, halfH) {
      // màn dọc: góc rộng hơn và máy nâng cao nhìn chếch xuống, để không phải lùi ra sau các dãy ghế (đầu khán giả che bục)
      const port = camera.aspect < 1, fov = port ? 58 : 40, tan = Math.tan(fov * Math.PI / 360), a = camera.aspect;
      const d = Math.max(halfW / (tan * a), halfH / tan);
      return { pos: [cx, cy + d * (port ? 0.28 : 0.1), AWARD_Z + 0.6 + d], target: [cx, cy, AWARD_Z], fov };
    }
    const awardWide = () => (camera.aspect < 1 ? awardView(AWARD_X - 0.81, 2.0, 3.6, 1.75) : awardView(AWARD_X - 0.81, 2.0, 4.3, 1.75));
    const awardClose = (r) => awardView(steps[r].wx, steps[r].top + 0.7, camera.aspect < 1 ? 1.15 : 1.6, 1.3);

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
    // ai ngồi ghế nào: seatPupil (bạn ảo của npc.js cùng tên cùng lớp với bảng xếp hạng, hoặc người thật trong phòng)
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
        const k = r * COLS + c;
        seats.push({ sg, lamp, kid: null, ph: Math.random() * 6, id: SEAT_IDS[k], kindNow: -1, live: false, mine: false, name: '', skill: 'kha', npc: false, react: '', score: 0, ans: null, right: false, dirty: true });
      }
    }
    /* Thẻ điểm khán giả: khán giả cũng trả lời mọi câu và có điểm riêng. Trên đầu mỗi bạn đang ngồi một thẻ nổi: điểm (to, vàng)
       ở trên, tên ở dưới; vừa trả lời đúng thì nền xanh; thẻ của mình viền vàng. Vẽ lại chỉ khi đổi (s.dirty). */
    seats.forEach(s => {
      const cv = document.createElement('canvas'); cv.width = 320; cv.height = 160;
      const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
      s.tag = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false }));
      s.tag.scale.set(0.9, 0.45, 1); s.tag.position.set(0, 2.0, 0.1); s.tag.visible = false; s.sg.add(s.tag);
      s.tagCv = cv;
    });
    function drawTag(s) {
      const c = s.tagCv.getContext('2d'), W = 320, H = 160, me = s === meSeat;
      c.clearRect(0, 0, W, H);
      c.beginPath(); c.roundRect(6, 6, W - 12, H - 12, 34);
      c.fillStyle = s.right ? 'rgba(15,157,88,.94)' : 'rgba(8,16,60,.86)'; c.fill();
      c.lineWidth = me ? 8 : 4; c.strokeStyle = me ? '#ffd36b' : 'rgba(130,185,255,.7)'; c.stroke();
      c.textAlign = 'center'; c.textBaseline = 'alphabetic';
      c.fillStyle = '#ffd45c'; c.font = '900 74px Segoe UI'; c.fillText(String(s.score), W / 2, 82);
      c.fillStyle = '#fff'; c.font = '700 40px Segoe UI'; c.fillText(me ? `${s.name} (bạn)` : s.name, W / 2, 134, W - 36);
      s.tag.material.map.needsUpdate = true;
    }
    add(new THREE.BoxGeometry(1.2, 0.02, 7), M('#0d1a63'), 0, 0.01, 10.9); // lối đi giữa

    /* ---------- Học sinh Hyper3D (public/thandong/characters/<kind>.glb, scripts/blender/build_pupil_anim.py) ----------
       Tải xong thì thay hình khối của 4 thí sinh và khán giả bằng các bạn chọn ngẫu nhiên (4 thí sinh khác nhau). Mô hình cao
       1,12 m, mặt nhìn -Z, gốc ở chân; clip <kind>_idle | cheer | sit | sitClap…; "sit" giữ khung cuối: gốc đặt trên mặt ghế. */
    const PUPIL_H = 1.12;
    const JOYS = ['cheer', 'clap', 'yes', 'fists'];
    function makePupil([kind, gltf], height, shadow) {
      const o = cloneSkinned(gltf.scene);
      o.scale.setScalar(height / PUPIL_H);
      o.rotation.y = Math.PI;   // nhóm hình khối cũ nhìn +Z
      o.traverse(m => { if (m.isMesh) { m.frustumCulled = false; m.castShadow = shadow; m.receiveShadow = false; } });
      const mixer = new THREE.AnimationMixer(o);
      const clips = Object.fromEntries(gltf.animations.map(c => [c.name.slice(kind.length + 1), c]));
      return { o, mixer, clips, pose: '', act: null, live: 0 };
    }
    function pupilPlay(pu, name, { once = false, end = false, fade = 0.3, at = 0 } = {}) {
      if (pu.pose === name || !pu.clips[name]) return;
      const next = pu.mixer.clipAction(pu.clips[name]);
      next.reset();
      next.setLoop(once ? THREE.LoopOnce : THREE.LoopRepeat, Infinity);
      next.clampWhenFinished = true;
      next.time = end ? pu.clips[name].duration : at;
      if (pu.act && fade) next.crossFadeFrom(pu.act, fade, false); else pu.act?.stop();
      next.play();
      pu.act = next; pu.pose = name;
      pu.live = Math.max(pu.live, fade + 0.05);   // khán giả đứng yên không cập nhật xương: chạy thêm cho hết lúc chuyển
    }
    function swapKid(group, pu, x, y, z) {
      for (const c of [...group.children]) { group.remove(c); c.geometry?.dispose?.(); }
      pu.o.position.set(x, y, z);
      group.add(pu.o);
    }
    const pupilLoader = new GLTFLoader();
    // giữa sân khấu, trước các bục, nhìn ra khán phòng (+Z); mặt sàn sân khấu cao 0,64
    const MC_CENTER = [new THREE.Vector3(-0.75, 0.64, 2.0), new THREE.Vector3(0.75, 0.64, 2.0)];
    const MC_SPEED = 1.2;   // m/s, khớp nhịp bước clip walk của người lớn
    /** Còn MC nào đang trên đường về chỗ dẫn (chưa tải xong thì coi như đã ở chỗ). */
    const mcArrive = () => mcs.some(m => m.home && m.at !== 'home');
    // 2 MC Hyper3D: thầy (mc_teacher_m.glb, vest) thay MC nam, cô (mc_teacher.glb, áo dài) thay MC nữ; vào vòng thi đứng
    // SAU bục MC (toạ độ trong bục: x ±0,5, z −0,55; mặt sau bục ở z 0,03), nhìn ra khán phòng. Đường đi vòng qua mép phải bục
    // (điểm via, mỗi MC một làn) để không xuyên qua bục.
    [['mc_teacher_m', 0, 1.75, -0.5, [1.0, -1.05]], ['mc_teacher', 1, 1.65, 0.5, [1.2, -0.7]]].forEach(([kind, k, h, x, via]) => {
      pupilLoader.loadAsync(`/thandong/characters/${kind}.glb`).then(g => {
        if (gone) return;
        const m = mcs[k];
        m.pupil = makePupil([kind, g], h, true);
        swapKid(m.fig, m.pupil, 0, 0, 0);
        m.ring.position.set(x, 0.12, -0.55);
        // chỗ đứng dẫn sau bục (toạ độ cảnh) và hướng nhìn ở đó; đầu chương trình (Chờ, Mở màn) đứng giữa sân khấu
        mcG.updateMatrixWorld(true);
        m.home = mcG.localToWorld(new THREE.Vector3(x, 0.1, -0.55));
        m.via = mcG.localToWorld(new THREE.Vector3(via[0], 0.1, via[1]));
        m.homeH = mcG.rotation.y;
        scene.attach(m.fig);
        m.fig.position.copy(MC_CENTER[k]);
        m.fig.rotation.set(0, 0, 0);
        m.at = 'center';
        pupilPlay(m.pupil, 'idle', { fade: 0, at: k * 1.7 });
      }, () => {});
    });
    Promise.all(PUPILS.map(k => pupilLoader.loadAsync(`/thandong/characters/${k}.glb`).then(g => [k, g], () => null))).then(list => {
      if (gone) return;
      const got = list.filter(Boolean);
      if (!got.length) return;
      pupilG = new Map(got);
      seats.forEach(applySeat);   // ai đã ngồi trước khi tải xong
      pods.forEach(applyPod);
    });
    /** Thí sinh bục i: nhân vật theo setPods; đứng trên bậc ẩn sau bục cho nửa người nhô khỏi mặt bàn (mặt bàn cao 0,9). */
    function applyPod(p) {
      if (!pupilG || p.wantKind < 0 || p.kindNow === p.wantKind) return;
      const g = pupilG.get(PUPILS[p.wantKind]);
      if (!g) return;
      p.pupil = makePupil([PUPILS[p.wantKind], g], 1.5, true);
      swapKid(p.kid, p.pupil, 0, 0.22, 0);
      pupilPlay(p.pupil, 'idle', { fade: 0, at: Math.random() * 2 });
      p.kindNow = p.wantKind;
    }
    /**
     * Bốn bục: list[i] = { name, kind, skill, me? } hoặc thiếu (bục trống). me: người cầm máy đứng bục này (luôn là bục 1).
     * Đổi trong lúc chờ (MC mời từng bạn lên); vào vòng thi thì flow.js giữ nguyên.
     */
    function setPods(list) {
      pods.forEach((p, i) => {
        const w = list[i];
        p.name = w ? w.name : '';
        p.skill = w?.skill || 'kha';
        p.wantKind = w ? w.kind : -1;
        p.kid.visible = !!w;
        p.me = !!w?.me;
        p.rid = w?.me ? 0 : w?.real || w?.rid || 0;   // bạn thật khác trên bục: mã của bạn ấy trong phòng (máy chủ trò chờ thao tác)
        applyPod(p);
      });
      if (flow) { myPod = list.findIndex(x => x?.me); meOnPod = myPod >= 0; }
      scrDirty = true;
    }

    /* ---------- Đèn chung ---------- */
    scene.add(new THREE.HemisphereLight('#6b8cff', '#0a0f30', 0.35));
    const wash = new THREE.DirectionalLight('#9fc3ff', 0.6); wash.position.set(4, 14, 14); scene.add(wash);
    const stageWash = new THREE.PointLight('#5a8cff', 30, 20, 1.5); stageWash.position.set(0, 6, 3); scene.add(stageWash);

    /* ---------- Màn hình lớn ---------- */
    const ROUNDS = {
      idle:     { label: 'Chờ', title: SHOW_NAME.split('\n').join(' ').toUpperCase(), sub: showSub(), a: '#2fc8ff', b: '#7b5cff' },
      open:     { label: 'Mở màn', title: 'MỞ MÀN', sub: 'Chào mừng 4 nhà thông thái nhí', a: '#ffc93c', b: '#2fc8ff' },
      // sec: giây mỗi câu; aud: điểm khán giả trả lời đúng (Về đích: bằng điểm câu)
      khoidong: { label: 'Khởi động', title: 'KHỞI ĐỘNG', sub: 'Lượt cá nhân · lượt chung bấm chuông', a: '#21e6a3', b: '#2fc8ff', sec: 20, aud: 10 },
      tangtoc:  { label: 'Tăng tốc', title: 'TĂNG TỐC', sub: '4 câu tư duy · nhanh nhất +40 · +30 · +20 · +10', a: '#ff8a2a', b: '#ff3d9a', sec: 30, aud: 20 },
      vedich:   { label: 'Về đích', title: 'VỀ ĐÍCH', sub: 'Chọn gói câu hỏi · Ngôi sao hy vọng · giành quyền', a: '#ffc93c', b: '#a35cff', sec: 20, aud: 0 },
      win:      { label: 'Trao giải', title: 'TRAO GIẢI', sub: 'Nhà thông thái nhí của buổi hôm nay', a: '#ffd45c', b: '#ff5d73' },
    };
    /* Luật từng vòng (docs/dau-truong/thiet-ke.md mục 5):
       Khởi động: lượt cá nhân (mỗi bạn `solo` câu riêng, chỉ bạn ấy trả lời) rồi lượt chung (`common` câu, bấm chuông giành quyền:
       đúng +10, sai −5). Tăng tốc: 4 câu tư duy (dãy số, dãy hình, sắp xếp dữ kiện, tư duy / suy luận hình ảnh), cả 4 bạn cùng
       trả lời, đúng xếp theo thời gian chốt +40 +30 +20 +10. Về đích: bạn ít điểm đi trước, chọn một gói 3 câu, trước mỗi câu được
       đặt Ngôi sao hy vọng (một lần mỗi lượt: đúng ×2, sai trừ điểm câu); sai hoặc hết giờ thì 3 bạn kia có 5 giây bấm chuông
       giành quyền, đúng được điểm câu, sai không bị trừ. Mọi câu: người phải trả lời đã chốt thì lật ngay, không chờ hết giờ. */
    const KD = { solo: 6, common: 4, right: 10, minus: 5 };
    const TT = { types: ['seq', 'shape', 'facts', 'logic'], pts: [40, 30, 20, 10] };
    const VD = { pkgs: [{ pts: 30, v: [10, 10, 10] }, { pts: 50, v: [10, 20, 20] }, { pts: 70, v: [20, 20, 30] }, { pts: 90, v: [30, 30, 30] }] };
    /* Thời gian (giây) cho lớp 4–5; trẻ đọc chậm nên lớp càng nhỏ càng nhiều giờ (SLOW), làm tròn 5 giây.
       Đồng hồ chỉ chạy sau khi MC đọc xong câu hỏi và các phương án. Khởi động: MC đã đọc đề nên 15 giây cố định mọi lớp (FIXED).
       vd10/20/30: câu Về đích theo điểm; answer: bấm chuông được quyền thì có bấy nhiêu giây chọn; steal: cửa sổ bấm chuông
       giành quyền (phản xạ, làm tròn 1 giây); pick / star: chọn gói, đặt sao. */
    const TIME = { khoidong: 15, tangtoc: 40, vd10: 30, vd20: 35, vd30: 45, answer: 15, steal: 5, pick: 15, star: 10 };
    const FIXED = new Set(['khoidong']);
    const SLOW = { 1: 1.5, 2: 1.3, 3: 1.15, 4: 1, 5: 1 };
    const gradeNow = () => (arena ? arena.grade : (getProfileGrade() || 3));
    const secs = (k) => {
      if (FIXED.has(k)) return TIME[k];
      const base = TIME[k] || 30, step = k === 'steal' ? 1 : 5;
      return Math.max(base, Math.round(base * (SLOW[gradeNow()] || 1) / step) * step);
    };
    const COLOR_NAMES = ['đỏ', 'cam', 'xanh lá', 'xanh dương'];
    const TIMED = new Set(['think', 'answer', 'steal', 'pick', 'star', 'audLast']);
    /* audLast: thí sinh đã chốt nhưng còn khán giả thật chưa chọn: câu chưa lật, khán phòng còn tối đa AUD_LAST giây (không quá
       thời gian còn lại của câu). Thí sinh vẫn được ghi giây chốt (lockAt), chỉ hoãn lật. Phòng chỉ có bạn ảo thì lật ngay. */
    const AUD_LAST = 6;
    /* Câu mẫu khi chưa tải được bộ câu theo lớp (chỉ để duyệt sân khấu). a = chỉ số đáp án đúng. */
    const BANK = [
      { q: '36 : 4 + 15 = ?', o: ['24', '21', '9', '51'], a: 0 },
      { q: '7 × 8 − 20 = ?', o: ['46', '28', '36', '56'], a: 2 },
      { q: 'Hình vuông cạnh 6 cm có chu vi là bao nhiêu?', o: ['12 cm', '24 cm', '36 cm', '20 cm'], a: 1 },
      { q: '1 giờ 15 phút bằng bao nhiêu phút?', o: ['115 phút', '65 phút', '90 phút', '75 phút'], a: 3 },
      { q: 'Số La Mã XIV là số nào?', o: ['16', '14', '9', '11'], a: 1 },
      { q: 'Từ nào chỉ hoạt động?', o: ['bàn học', 'xanh biếc', 'chạy nhảy', 'cây bút'], a: 2 },
      { q: '2 kg bằng bao nhiêu gam?', o: ['200 g', '20 g', '2000 g', '2 g'], a: 2 },
      { q: 'Một phần tư của 28 là bao nhiêu?', o: ['7', '4', '6', '8'], a: 0 },
    ];
    let bankAt = 0, mAlt = 0;
    const NEXT = { khoidong: 'tangtoc', tangtoc: 'vedich', vedich: 'win' };
    /* Bộ câu thật theo tiến độ học của lớp trong hồ sơ (src/dauTruong/questions.js): chỉ các bài đã học tới hôm nay.
       Chưa tải xong thì vòng thi chờ; tải lỗi thì dùng câu mẫu BANK ở trên. Câu Tăng tốc sinh theo lớp (speedQ). */
    let arena = null;
    loadArenaBank(getProfileGrade()).then(b => { arena = b; scrDirty = true; }, () => { arena = false; });
    const progressText = () => (arena ? `Lớp ${arena.grade} · Toán đến Bài ${arena.mathBai}${arena.hasTv ? ` · Tiếng Việt đến Tuần ${arena.handCount ? Math.min(35, arena.week) : arena.tvWeek}` : ' · chưa có câu Tiếng Việt lớp này'}` : '');
    let mode = 'idle', timer = null, phase = 'none', t0 = 0, qT0 = 0;
    const RK = { khoidong: 'kd', tangtoc: 'tt', vedich: 'vd' };
    let qDone = 0;   // số câu đã lật cả buổi (khán giả: đúng x / qDone câu)
    /* ⏱ Đồng hồ đã diễn: showAt = lúc chương trình bắt đầu (Mở màn, hoặc thẳng Khởi động khi cả 4 bục sẵn sàng), showEnd = lúc
       xong (màn thu sao). Giờ tuyệt đối theo máy chủ trò, gửi trong ảnh chụp (sa / se) nên mọi máy cùng một số. */
    let showAt = 0, showEnd = 0;
    /* Trả lời ké: bạn đứng bục nhưng câu này không phải lượt mình (lượt cá nhân / Về đích của bạn khác, bạn khác đang trả lời
       sau chuông) vẫn được chọn, chỉ trên máy mình: không tính điểm, không ảnh hưởng chương trình, ô chọn chỉ có viền.
       mine: số câu mình trả lời đúng cả buổi (câu của mình, câu ké, hoặc khán giả), mỗi câu tính một lần (qid). */
    let side = { qid: -1, pick: -1, ok: false };
    const mine = { right: 0, last: -1, log: [] };   // log: câu em đã trả lời { t, m, r, ok } → bảng mạnh / yếu (matchStats.js)
    const resetMine = () => { mine.right = 0; mine.last = -1; mine.log = []; };
    const topicOf = (q) => q.t || q.tag || (q.m === 'tv' ? 'Tiếng Việt' : 'Toán');
    let nextQ = null;   // câu kế tiếp lấy sẵn lúc các bạn đang nghĩ câu này (tải trước giọng MC): { slot, q }
    let Q = null, qn = 0, qTotal = 0, picks = [], shownOpts = 0, scrDirty = true, scrLast = 0;
    /* qid: tăng mỗi lần mở một bước nhận thao tác (câu hỏi, chọn gói, đặt sao); sent: thao tác đã gửi máy chủ trò ở bước ấy
       (`${qid}:lock` …) để không gửi hai lần và hiện "Đã chốt" ngay. tmId: mã đồng hồ (máy hiện theo đặt lại khi đổi). */
    let qid = 0, sent = '', tmId = 0;
    /* Tự đọc đề: máy không nghe được MC (Azure hết hạn mức / tắt, máy không có giọng tiếng Việt, tắt tiếng) thì bé tự đọc. Để công
       bằng, máy chủ trò cho CẢ PHÒNG một khoảng đọc đề chung (kidReadSec: theo độ dài câu + phương án và lớp) mỗi khi có ít nhất một
       bạn tự đọc (readers: mã các bạn báo 'nv', hoặc chính máy chủ trò); bốn phương án hiện ngay, đồng hồ trả lời chỉ chạy sau
       khoảng ấy (MC đọc lâu hơn thì chờ MC). Máy hiện theo thấy cùng một đồng hồ đọc đề (ảnh chụp). */
    const readers = new Map();   // mã bạn thật → đang tự đọc
    let sentNv = null;           // (máy hiện theo) lần báo 'nv' gần nhất
    const needRead = () => voiceMode() === 'none' || [...readers.values()].some(Boolean);
    const READ_CPS = { 1: 5, 2: 6, 3: 8, 4: 10, 5: 12 };   // ký tự / giây trẻ tự đọc được (lớp 1 đánh vần chậm)
    const kidReadSec = (q) => {
      const len = [sayQuestion(q), ...[0, 1, 2, 3].map(i => sayOption(q, i))].join(' ').length;
      return Math.max(6, Math.min(45, Math.round(len / (READ_CPS[gradeNow()] || 8)) + 3));
    };
    const setTimer = (sec, start = performance.now()) => { t0 = start; timer = { id: ++tmId, total: sec, end: start + sec * 1000 }; };
    /* Các bước của vòng: slots (mỗi phần tử một câu, hoặc 'pick' = một bạn chọn gói Về đích, chèn 3 câu của gói ngay sau nó).
       sl: bước đang chạy; turn: bục đang tới lượt (-1: chung); buzzer: bục bấm chuông được quyền; vd: lượt Về đích đang chạy. */
    let slots = [], si = 0, sl = null, turn = -1, buzzer = -1, vd = null;
    /* Hẹn giờ của vòng đang chạy: đổi vòng hay rời trang thì huỷ hết. */
    let tms = [];
    const later = (fn, ms) => { const id = setTimeout(() => { tms = tms.filter(x => x !== id); if (!gone) fn(); }, ms); tms.push(id); };
    const clearLater = () => { tms.forEach(clearTimeout); tms = []; };

    /** Người cầm máy là ai: bản mẫu = bục 1; chương trình thật = khán giả ở ghế của mình (chưa ngồi thì chỉ xem). */
    const role = () => (meOnPod && myPod >= 0 ? 'pod' : flow && meSeat ? 'aud' : 'none');
    const isMe = (i) => role() === 'pod' && i === myPod;
    /** Bục i là bạn ảo (máy chủ trò / một mình giả lập): không phải mình, không phải bạn thật khác. */
    const isBot = (i) => !isMe(i) && !pods[i].rid && !pods[i].me;
    const hosting = () => !sync || sync.host;   // máy này chạy chương trình (một mình cũng là chạy)
    const following = () => !!sync && !sync.host;
    /** Mã của bạn đứng bục p trong phòng (mình: myId của máy này). */
    const ridOf = (p) => (p.me ? sync?.myId || 0 : p.rid || 0);
    /** Bục i có phải trả lời câu này không (trước khi bấm chuông). */
    const answers = (i) => sl && (sl.seg === 'speed' || ((sl.seg === 'solo' || sl.seg === 'vd') && i === turn));
    /** Bục i có tham gia câu này (để tính điểm, đổi màu bục lúc lật). */
    const takesPart = (i) => sl && (sl.seg === 'speed' || i === turn || i === buzzer);

    function rr(c, x, y, w, h, r) { c.beginPath(); c.roundRect(x, y, w, h, r); }
    function wrapLines(c, text, maxW) {
      const out = []; let line = '';
      for (const w of String(text).split(' ')) {
        const t = line ? `${line} ${w}` : w;
        if (line && c.measureText(t).width > maxW) { out.push(line); line = w; } else line = t;
      }
      if (line) out.push(line);
      return out;
    }
    /* Ảnh màn chờ (của chủ dự án, public/dautruong/screen.jpg 1600 × 900): chữ tên cũ trong ảnh đã được phủ bằng một băng tên
       trống (PLATE), tên chương trình vẽ lúc chạy từ SHOW_NAME để đổi tên không phải sửa ảnh. */
    const PLATE = { cx: 808, top: 245, bottom: 508, w: 840 };
    const poster = new Image();
    poster.onload = () => { scrDirty = true; };
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
    /** Dòng lượt trên màn LED (dưới thanh tên vòng): ai đang trả lời, bấm chuông, gói / điểm câu. [chữ, màu] */
    function turnLine() {
      if (!sl) return null;
      const nm = (i) => pods[i].name.toUpperCase(), cl = (i) => pods[i].col.getStyle();
      if (buzzer >= 0) return [`🔔 ${nm(buzzer)} GIÀNH QUYỀN TRẢ LỜI${Q?.val ? ` · ${Q.val} ĐIỂM` : ''}`, cl(buzzer)];
      if (sl.seg === 'solo') return [`LƯỢT CÁ NHÂN · ${nm(turn)}`, cl(turn)];
      if (sl.seg === 'common') return ['LƯỢT CHUNG · BẤM CHUÔNG GIÀNH QUYỀN · ĐÚNG +10 · SAI −5', '#ffd36b'];
      if (sl.seg === 'speed') return ['CẢ 4 BẠN CÙNG TRẢ LỜI · NHANH NHẤT +40', '#ffd36b'];
      if (phase === 'steal' || phase === 'stealing') return [`GIÀNH QUYỀN! BẤM CHUÔNG TRONG ${secs('steal')} GIÂY`, '#ff8a9a'];
      return [`${nm(turn)} · CÂU ${sl.qi + 1}/3 · ${sl.val} ĐIỂM${vd?.star ? ' · ⭐ NGÔI SAO HY VỌNG' : ''}`, cl(turn)];
    }
    /* Khung câu hỏi trên màn LED (toạ độ 1600 × 900): camera "Màn hình câu hỏi" khớp đúng khung này (fitScreen). */
    const CARD = { x: 50, y: 120, w: 1500, h: 700 };
    function drawCard(c, R, right) {
      c.fillStyle = 'rgba(8,20,80,.88)'; rr(c, CARD.x, CARD.y, CARD.w, CARD.h, 36); c.fill();
      c.strokeStyle = R.a; c.lineWidth = 6; c.stroke();
      c.fillStyle = R.a; rr(c, CARD.x + 40, CARD.y + 34, 420, 76, 38); c.fill();
      c.textAlign = 'center'; c.fillStyle = '#061033'; c.font = '900 46px Segoe UI'; c.fillText(R.title, CARD.x + 250, CARD.y + 88);
      c.textAlign = 'right'; c.fillStyle = '#ffd36b'; c.font = '800 50px Segoe UI'; c.fillText(right, CARD.x + CARD.w - 50, CARD.y + 90);
      c.textAlign = 'center';
    }
    /** Về đích trước câu: chọn gói (bốn ô gói) hoặc đặt Ngôi sao hy vọng. */
    function drawVdChoice(c, W, R) {
      const p = pods[vd.who];
      drawCard(c, R, `LƯỢT CỦA ${p.name.toUpperCase()}`);
      c.fillStyle = '#fff'; c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 12;
      if (phase === 'pick' || phase === 'picked') {
        c.font = '800 84px Segoe UI'; c.fillText(vd.pkg ? `Gói ${vd.pkg.pts} điểm` : 'Chọn gói câu hỏi', W / 2, CARD.y + 230);
        c.shadowBlur = 0;
        VD.pkgs.forEach((k, j) => {
          const x = CARD.x + 70 + j * 345, y = CARD.y + 300, w = 320, h = 330, on = vd.pkg === k;
          c.fillStyle = on ? '#ffc93c' : 'rgba(255,255,255,.08)'; rr(c, x, y, w, h, 28); c.fill();
          c.strokeStyle = on ? '#fff3c4' : 'rgba(255,211,107,.5)'; c.lineWidth = 4; c.stroke();
          c.fillStyle = on ? '#061033' : '#ffd36b'; c.font = '900 120px Segoe UI'; c.fillText(String(k.pts), x + w / 2, y + 150);
          c.font = '700 44px Segoe UI'; c.fillStyle = on ? '#061033' : '#cfe0ff'; c.fillText(k.v.join(' · '), x + w / 2, y + 250);
        });
      } else {
        const val = sl.val;
        c.font = '800 110px Segoe UI'; c.fillText(`Câu ${sl.qi + 1}/3 · ${val} điểm`, W / 2, CARD.y + 300);
        c.shadowBlur = 0;
        c.font = '900 150px Segoe UI'; c.fillStyle = vd.star ? '#ffd45c' : 'rgba(255,255,255,.18)'; c.fillText('⭐', W / 2, CARD.y + 500);
        c.font = '700 54px Segoe UI'; c.fillStyle = vd.star ? '#ffd45c' : '#cfe0ff';
        const t = vd.star ? `Ngôi sao hy vọng: đúng +${val * 2}, sai −${val}` : phase === 'star' ? 'Có đặt Ngôi sao hy vọng không?' : 'Không đặt Ngôi sao hy vọng';
        c.fillText(t, W / 2, CARD.y + 610, CARD.w - 120);
      }
    }
    function drawScreen(now) {
      const c = scrCanvas.getContext('2d'); const W = 1600, H = 900; const R = ROUNDS[mode];
      c.setTransform(scrCanvas.width / W, 0, 0, scrCanvas.height / H, 0, 0);
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
      c.textAlign = 'center'; c.textBaseline = 'alphabetic';
      if ((mode === 'idle' || mode === 'open') && poster.complete && poster.naturalWidth) {
        drawPoster(c, W, H, mode === 'open' ? 'Chào mừng 4 nhà thông thái nhí!' : R.sub);
        scrTex.needsUpdate = true; return;
      }
      if (!Q && vd && ['pick', 'picked', 'star', 'starred'].includes(phase)) { drawVdChoice(c, W, R); scrTex.needsUpdate = true; return; }
      if (!Q) {
        c.shadowColor = R.a; c.shadowBlur = 40; c.fillStyle = '#fff'; c.font = '900 170px Segoe UI'; c.fillText(R.title, W / 2, 430);
        c.shadowBlur = 0; c.fillStyle = R.a; c.font = '600 60px Segoe UI'; c.fillText(phase === 'done' ? `Hết vòng · ${qTotal} câu` : phase === 'turn' ? (turn >= 0 ? `Lượt của ${pods[turn].name}` : 'Lượt chung · bấm chuông giành quyền') : R.sub, W / 2, 540, W - 100);
        if (R.sec && arena) { c.fillStyle = '#cfe0ff'; c.font = '600 40px Segoe UI'; c.fillText(progressText(), W / 2, 630, W - 120); }
        if (mode === 'win') {
          const best = [...pods].sort((a, b) => b.score - a.score);
          c.font = '700 54px Segoe UI'; c.fillStyle = '#ffd45c';
          best.forEach((p, k) => c.fillText(`${k + 1}. ${p.name}  ${p.score}`, W / 2, 640 + k * 62));
          const fans = seats.filter(s => s.live && s.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
          if (fans.length) { c.font = '600 36px Segoe UI'; c.fillStyle = '#cfe0ff'; c.fillText(`Khán giả xuất sắc: ${fans.map(s => `${s.name} ${s.score}`).join(' · ')}`, W / 2, 880, W - 100); }
        }
        scrTex.needsUpdate = true; return;
      }
      // màn LED lúc có câu: CHỈ câu hỏi (đáp án là nút trên dải của máy người chơi), chữ to để đọc được khi camera áp sát
      const what = Q.tag ? Q.tag.toUpperCase() : Q.m === 'tv' ? 'TIẾNG VIỆT' : Q.m === 'toan' ? 'TOÁN' : '';
      const [pn, pt] = qPos();
      drawCard(c, R, `${what}${what ? ' · ' : ''}CÂU ${pn}/${pt}`);
      const tl = turnLine();
      if (tl) { c.font = '800 40px Segoe UI'; c.fillStyle = tl[1]; c.fillText(tl[0], W / 2, CARD.y + 160, CARD.w - 100); }
      const rev = phase === 'reveal';
      const optWords = (o) => { const t = optTokens(o); return t ? sayTokens(t) : o; };
      const ans = Q.kind === 'order' ? Q.a.map(i => optWords(Q.o[i])).join(' → ') : `${'ABCD'[Q.a]}. ${optWords(Q.o[Q.a])}`;
      // chữ to nhất mà vẫn vừa vùng câu hỏi: dưới dòng lượt (y + 180) tới đáy khung, lúc lật thì tới trên ô đáp án (y + 505)
      // câu có hình (Q.fig, src/dauTruong/figs.js): chữ và hình chia nhau vùng này; lúc lật, ô đáp án đè lên đáy vùng
      const top = CARD.y + 180, bot = CARD.y + (rev && !Q.fig ? 505 : CARD.h - 30);
      drawQBody(c, Q, CARD.x + 70, top, CARD.w - 140, bot - top);
      c.textAlign = 'center'; c.textBaseline = 'alphabetic';
      if (rev) {
        c.font = '800 72px Segoe UI';
        const tw = Math.min(CARD.w - 100, c.measureText(ans).width + 120);
        c.fillStyle = '#0f9d58'; rr(c, W / 2 - tw / 2, CARD.y + 520, tw, 120, 60); c.fill();
        c.strokeStyle = '#bff5d4'; c.lineWidth = 4; c.stroke();
        c.fillStyle = '#fff'; c.fillText(ans, W / 2, CARD.y + 604, CARD.w - 160);
      }
      scrTex.needsUpdate = true;
    }

    /* ---------- Dải đáp án (kiểu "Ai là môn đệ thông thái?": .ch-qov của church.css) ----------
       Người cầm máy (role()): bản mẫu là bục 1 ("Bạn"), ba bục kia giả lập; chương trình thật là khán giả ở ghế của mình.
       Chạm một ô (Tăng tốc dạng sắp xếp: chạm lần lượt bốn ô, chạm lại ô đã chọn thì bỏ từ ô đó trở đi). Nút chuông tròn
       (.dt-bell, góc phải trên dải) luôn giữ chỗ, chỉ hiện lúc được bấm: lượt chung Khởi động, giành quyền Về đích (phím cách). */
    const ov = root.querySelector('.ch-qov');
    const esc = (x) => String(x).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
    const words = (x) => esc(x).split(/\s+/).map((w, k) => `<em style="--w:${k}">${w}</em>`).join(' ');
    const BELL = '<button type="button" class="dt-bell" aria-label="Bấm chuông giành quyền trả lời" tabindex="-1"><b>🔔</b><span>Bấm chuông</span></button>';
    /* Số câu hiển thị: tính trong phần đang chạy (lượt cá nhân của bạn đang thi 1/6, lượt chung 1/4, gói Về đích 1/3),
       không đếm cả vòng, để bé thấy mình còn bao nhiêu câu. */
    function qPos() {
      if (following() && qpSnap) return qpSnap;   // máy hiện theo: số câu theo máy chủ trò
      if (sl && (sl.seg === 'solo' || sl.seg === 'common')) {
        const same = (s) => s.seg === sl.seg && s.who === sl.who;
        return [slots.slice(0, slots.indexOf(sl)).filter(same).length + 1, slots.filter(same).length];
      }
      if (sl && sl.qi != null) return [sl.qi + 1, 3];
      return [qn, qTotal];
    }
    function segLabel() {
      if (!sl) return '';
      return sl.seg === 'solo' ? `Lượt cá nhân · ${pods[turn].name}` : sl.seg === 'common' ? 'Lượt chung' : sl.seg === 'speed' ? (Q?.tag || '') : `Lượt của ${pods[vd.who].name}`;
    }
    function ptsLabel() {
      if (role() === 'aud') return `Điểm của bạn ${meSeat.score} · đúng +${Q?.val || ROUNDS[mode].aud}`;
      if (!sl) return '';
      return sl.seg === 'solo' ? 'Đúng +10' : sl.seg === 'common' ? 'Đúng +10 · sai −5' : sl.seg === 'speed' ? 'Nhanh nhất +40'
        : `${sl.val} điểm${vd?.star ? ' · ⭐ ×2' : ''}`;
    }
    // ngắn gọn (tên vòng đã có trên màn LED): giữa dải là chỗ của huy hiệu kết quả
    function metaLeft() {
      const [n, t] = qPos();
      return `Câu ${n}/${t}${segLabel() ? ` · ${esc(segLabel())}` : ''}`;
    }
    const CLOCK = `<div class="ch-qov-clock" hidden><svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="qov-clk-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1b8"/><stop offset="1" stop-color="#ffb03a"/></linearGradient><linearGradient id="qov-clk-r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb3bd"/><stop offset="1" stop-color="#ff3355"/></linearGradient></defs>
          <circle class="is-bg" cx="32" cy="32" r="27"/><circle class="is-ticks" cx="32" cy="32" r="30.5" pathLength="60"/><circle class="is-fg" cx="32" cy="32" r="27" pathLength="100"/></svg><b></b><small>giây</small></div>`;
    function buildOv() {
      const opt = (i) => `<button type="button" class="ch-qov-o is-wait" data-i="${i}" style="--i:${i}" disabled><i>${Q.kind === 'order' ? '' : 'ABCD'[i]}</i><span>${words(Q.o[i])}</span></button>`;
      ov.innerHTML = `<div class="ch-qov-box"><b class="ch-qov-num">Câu ${qPos()[0]}</b>${CLOCK}${BELL}
        <b class="ch-qov-res" hidden></b>
        <div class="ch-qov-meta"><div class="ch-qov-mleft"><span>${metaLeft()}</span></div><span>${esc(ptsLabel())}</span></div>
        <div class="ch-qov-opts"><div class="ch-qov-row">${opt(0)}${opt(1)}</div><div class="ch-qov-row">${opt(2)}${opt(3)}</div></div></div>`;
      ov.querySelectorAll('.ch-qov-o').forEach(b => {
        b.onclick = () => onPick(+b.dataset.i);
        // phương án là thẻ hình ("[tri.red sq.blue]"): vẽ hình thay chữ, tên hình làm nhãn đọc
        const toks = optTokens(Q.o[+b.dataset.i]);
        if (toks) { const sp = b.querySelector('span'); sp.textContent = ''; sp.append(tokenCanvas(toks, 56)); sp.setAttribute('aria-label', sayTokens(toks)); }
      });
      ov.querySelector('.dt-bell').onclick = () => doBuzz();
      ov.classList.toggle('is-in', !reduce);
      ov.hidden = false;
    }
    /** Về đích trước câu: dải có cùng khung bốn ô (chọn gói / đặt sao); chỉ bạn đang tới lượt bấm được. */
    function buildChoice() {
      const mine = role() === 'pod' && vd.who === myPod;
      const btn = (k, i, body, dis = !mine) => `<button type="button" class="ch-qov-o is-pop${dis ? ' dt-info' : ''}" data-k="${k}"${dis ? ' disabled' : ''}><i>${i}</i><span>${body}</span></button>`;
      let rows;
      if (phase === 'pick') {
        const b = VD.pkgs.map((k, j) => btn(j, k.pts, `Gói ${k.pts} điểm: ${k.v.join(' · ')}`));
        rows = `<div class="ch-qov-row is-on">${b[0]}${b[1]}</div><div class="ch-qov-row is-on">${b[2]}${b[3]}</div>`;
      } else {
        const val = sl.val;
        rows = `<div class="ch-qov-row is-on">${btn('star', '⭐', `Đặt Ngôi sao hy vọng`)}${btn('no', '▶', 'Không đặt, vào câu hỏi')}</div>
          <div class="ch-qov-row is-on">${btn('', sl.qi + 1, `Câu ${sl.qi + 1}/3: ${val} điểm`, true)}${btn('', '⭐', `Có sao: đúng +${val * 2}, sai −${val}`, true)}</div>`;
      }
      const head = phase === 'pick' ? `Về đích · Lượt của ${esc(pods[vd.who].name)} · chọn gói câu hỏi` : `Về đích · Lượt của ${esc(pods[vd.who].name)} · Gói ${vd.pkg.pts}`;
      ov.innerHTML = `<div class="ch-qov-box">${CLOCK}${BELL}<b class="ch-qov-res" hidden></b>
        <div class="ch-qov-meta"><div class="ch-qov-mleft"><span>${head}</span></div><span>${mine ? 'Bạn chọn' : `${esc(pods[vd.who].name)} đang chọn`}</span></div>
        <div class="ch-qov-opts">${rows}</div></div>`;
      ov.classList.add('is-pickable');
      ov.querySelectorAll('[data-k]:not(:disabled)').forEach(b => {
        b.onclick = () => {
          const k = b.dataset.k;
          if (phase === 'pick') doPkg(+k); else if (phase === 'star') doStar(k === 'star');
        };
      });
      ov.classList.remove('is-in');
      ov.hidden = false;
      paintClock();
    }
    function paintChoice() {
      if (ov.hidden || Q) return;
      const sel = phase === 'picked' ? String(VD.pkgs.indexOf(vd.pkg)) : phase === 'starred' ? (vd.star ? 'star' : 'no') : null;
      ov.querySelectorAll('[data-k]').forEach(b => {
        if (!b.dataset.k) return;
        if (sel !== null) b.disabled = true;
        b.classList.toggle('is-lock', b.dataset.k === sel);
      });
      paintClock();
    }
    /** Ô nào đang hiện là đã chọn: của mình; mình không trả lời câu này thì hiện ô của bạn đang trả lời (sau khi bạn ấy chốt). */
    function shownPicks() {
      if (role() === 'aud' || (role() === 'pod' && (answers(myPod) || buzzer === myPod))) return picks;
      const w = buzzer >= 0 ? buzzer : turn;
      const p = pods[w];
      return w >= 0 && p.pick != null && ['locked', 'right', 'wrong'].includes(p.state) ? [p.pick] : [];
    }
    function canPick() {
      if (!Q) return false;
      // MC đang đọc câu hỏi (read): chưa ai chọn được, đồng hồ chạy mới mở. Khán giả trả lời suốt lúc câu còn mở
      // (cả lúc MC gọi người bấm chuông / mở giành quyền)
      if (role() === 'aud') return ['think', 'buzzed', 'answer', 'stealing', 'steal', 'audLast'].includes(phase) && meSeat.ans == null;
      if (!['think', 'answer'].includes(phase)) return false;
      if (role() !== 'pod' || sent === `${qid}:lock`) return false;   // đã gửi đáp án cho máy chủ trò: chờ
      const me = pods[myPod];
      if (phase === 'answer') return buzzer === myPod && me.state === 'buzz';
      if (phase === 'steal' || !answers(myPod)) return false;
      return me.state === 'turn' || me.state === 'think' || me.state === 'idle';
    }
    function canSide() {
      if (role() !== 'pod' || !Q || Q.kind !== 'abcd' || side.qid === qid) return false;
      if (answers(myPod) || buzzer === myPod || canBuzz()) return false;
      return ['think', 'buzzed', 'answer', 'stealing', 'steal', 'audLast'].includes(phase);
    }
    function canBuzz() {
      if (role() !== 'pod' || buzzer >= 0 || !sl || sent === `${qid}:buzz:${phase}`) return false;
      return (phase === 'think' && sl.seg === 'common') || (phase === 'steal' && turn !== myPod);
    }
    function paintOv() {
      if (!Q || ov.hidden) return;
      const rev = phase === 'reveal', view = shownPicks();
      const sideOpen = !canPick() && canSide(), open = canPick() || sideOpen;
      const sidePick = role() === 'pod' && side.qid === qid ? side.pick : -1;
      ov.classList.toggle('is-pickable', open || canBuzz());
      const bell = ov.querySelector('.dt-bell');
      bell.classList.toggle('is-on', canBuzz());
      bell.disabled = !canBuzz();
      ov.querySelectorAll('.ch-qov-o').forEach((el, i) => {
        const shown = phase !== 'read' || i < shownOpts;
        const k = view.indexOf(i), out = Q.out === i && !rev;
        let st = '';
        if (Q.kind === 'abcd') {
          st = rev && i === Q.a ? ' is-right' : (rev && k >= 0) || out ? ' is-wrong' : k >= 0 ? ' is-lock' : '';
        } else {
          const done = view.length === 4;
          el.querySelector('i').textContent = rev ? Q.a.indexOf(i) + 1 : k >= 0 ? k + 1 : '';
          st = rev ? (done ? (k === Q.a.indexOf(i) ? ' is-right' : ' is-wrong') : '') : k >= 0 ? (done ? ' is-lock' : ' is-mine') : '';
        }
        const vis = st ? '' : shown ? (el.classList.contains('is-wait') || el.classList.contains('is-pop') ? ' is-pop' : '') : ' is-wait';
        const sd = i === sidePick ? ` is-side${rev && i !== Q.a ? ' is-side-no' : ''}` : '';
        el.className = `ch-qov-o${st}${vis}${sd}`;
        el.disabled = !open || !shown || (Q.kind === 'abcd' && k >= 0) || Q.out === i;
      });
      ov.querySelectorAll('.ch-qov-opts .ch-qov-row').forEach((row, r) => row.classList.toggle('is-on', phase !== 'read' || shownOpts > r * 2));
      // dòng phải của dải: nhắc nghe MC đọc / đã chọn, chờ kết quả; còn lại là điểm của câu
      const mr = ov.querySelector('.ch-qov-meta > span');
      const who = buzzer >= 0 ? buzzer : turn;
      const note = phase === 'read' ? (voiceMode() === 'none' ? '📖 Em tự đọc đề, hết giờ đọc thì chọn' : 'Nghe MC đọc hết câu hỏi')
        : rev ? (role() === 'aud' ? pods.filter((q, i) => takesPart(i)).map(q => `${q.name} ${q.gain > 0 ? `+${q.gain}` : q.gain < 0 ? q.gain : 'chưa đúng'}`).join(' · ') : '')
        : role() === 'aud' && meSeat.ans != null ? (phase === 'audLast' ? 'Đã chọn, chờ các bạn khán phòng' : who >= 0 ? `Đã chọn, chờ ${pods[who].name} trả lời` : 'Đã chọn, chờ kết quả')
        : role() === 'aud' && phase === 'audLast' ? `${who >= 0 ? pods[who].name : 'Thí sinh'} đã chốt, em chọn nhanh lên!`
        : role() === 'pod' && (pods[myPod].state === 'locked' || sent === `${qid}:lock`) ? (phase === 'audLast' ? 'Đã chốt, chờ khán phòng chọn' : 'Đã chốt, chờ kết quả')
        : sidePick >= 0 ? (who >= 0 ? `Đã chọn, chờ ${pods[who].name} trả lời` : 'Đã chọn, chờ kết quả')
        : sideOpen ? 'Em cũng chọn được, không tính điểm' : '';
      if (mr) { mr.textContent = note || ptsLabel(); mr.classList.toggle('dt-note', !!note); }
      const res = ov.querySelector('.ch-qov-res');
      res.hidden = !rev;
      if (rev) {
        const [cls, ic, txt] = resultText();
        res.className = `ch-qov-res ${cls}`; res.dataset.icon = ic; res.textContent = txt;
      }
      paintClock();
    }
    /** Huy hiệu kết quả trên dải: [lớp màu, biểu tượng, chữ] theo vai của người cầm máy. */
    function resultText() {
      if (role() === 'aud') {
        const ok = meSeat.ans === true, pts = Q.val || ROUNDS[mode].aud;
        return ok ? ['is-ok', '✓', `Chính xác! +${pts}`] : ['is-no', '✕', meSeat.ans == null ? 'Hết giờ!' : 'Rất tiếc!'];
      }
      const me = pods[myPod];
      if (role() === 'pod' && takesPart(myPod)) {
        if (me.state === 'right') return ['is-ok', '✓', `Chính xác! +${me.gain}`];
        const late = Q.kind === 'order' ? picks.length < 4 : !picks.length;
        return ['is-no', '✕', me.gain < 0 ? `Rất tiếc! ${me.gain}` : late ? 'Hết giờ!' : 'Rất tiếc!'];
      }
      const won = pods.filter(p => p.gain > 0).sort((a, b) => b.gain - a.gain);
      if (role() === 'pod' && side.qid === qid) {
        const who = won.length ? ` · ${won.map(p => `${p.name} +${p.gain}`).join(' · ')}` : '';
        return side.ok ? ['is-ok', '✓', `Em đúng!${who}`] : ['is-no', '✕', `Em chưa đúng${who}`];
      }
      if (won.length) return ['is-win', '✓', won.map(p => `${p.name} +${p.gain}`).join(' · ')];
      const lost = pods.filter(p => p.gain < 0);
      if (lost.length) return ['is-no', '✕', lost.map(p => `${p.name} ${p.gain}`).join(' · ')];
      if (sl.seg === 'common' && buzzer < 0) return ['is-skip', '!', 'Không ai bấm chuông'];
      return ['is-no', '✕', 'Chưa ai đúng'];
    }
    let clkSec = -1;
    function paintClock() {
      const el = ov.querySelector('.ch-qov-clock');
      if (!el) return;
      // lúc đọc đề (phase 'read' có đồng hồ: có bạn tự đọc) đồng hồ đếm thời gian đọc, chữ "đọc", không tích tắc
      const reading = phase === 'read' && !!timer;
      el.hidden = !timer || (!TIMED.has(phase) && !reading);
      if (el.hidden) { clkSec = -1; return; }
      el.classList.toggle('is-read', reading);
      el.classList.toggle('is-aud', phase === 'audLast');   // thí sinh đã chốt: đồng hồ khán phòng (màu xanh lá)
      const small = el.querySelector('small');
      if (small && small.textContent !== (reading ? 'đọc đề' : 'giây')) small.textContent = reading ? 'đọc đề' : 'giây';
      const left = Math.max(0, timer.end - performance.now()) / 1000;
      el.style.setProperty('--p', (left / timer.total).toFixed(3));
      const sec = Math.ceil(left);
      if (sec !== clkSec) {
        if (!reading && clkSec > 0 && sec <= 5 && sec > 0) SFX.tick(sec <= 3);
        clkSec = sec; el.querySelector('b').textContent = sec; el.classList.toggle('is-low', !reading && sec <= 5);
      }
      if (Q && !reading) SFX.hurry(1 - left / timer.total);
    }
    const CONF = ['#ffd36b', '#2cff8a', '#56c8ff', '#ff6fb1', '#ffffff', '#ff9f2e', '#b07cff'];
    function confetti(n) {
      if (reduce) return;
      const box = document.createElement('div');
      box.className = 'ch-confetti';
      box.innerHTML = Array.from({ length: n }, () => {
        const r = Math.random;
        return `<i style="left:${(r() * 100).toFixed(1)}%;background:${CONF[Math.floor(r() * CONF.length)]};--d:${(r() * 0.9).toFixed(2)}s;--t:${(2.4 + r() * 1.8).toFixed(2)}s;--x:${Math.round((r() - 0.5) * 240)}px;--r:${Math.round(360 + r() * 720)}deg;width:${Math.round(6 + r() * 5)}px"></i>`;
      }).join('');
      root.appendChild(box);
      setTimeout(() => box.remove(), 5500);
    }
    function onPick(i) {
      if (!canPick()) {
        if (!canSide()) return;
        side = { qid, pick: i, ok: i === Q.a };
        SFX.lock();
        if (flow) arenaAnswer(side.ok);   // thống kê admin (engine/arenaStats.js)
        paintOv(); return;
      }
      const el = phase === 'read' ? 0 : (performance.now() - t0) / 1000;
      let ok, done;
      if (Q.kind === 'abcd') { picks = [i]; ok = i === Q.a; done = true; }
      else {
        const k = picks.indexOf(i);
        if (k >= 0) picks = picks.slice(0, k); else picks.push(i);
        done = picks.length === 4; ok = done && picks.every((x, j) => x === Q.a[j]);
      }
      if (done && flow) arenaAnswer(ok);   // thống kê admin (engine/arenaStats.js)
      if (role() === 'aud') {
        if (done) { meSeat.ans = ok; SFX.lock(); if (following()) sync.net.showInput('aud', [meSeat.id, ok ? 1 : 0]); } else SFX.click();
        paintOv(); return;
      }
      if (!done) { SFX.click(); paintOv(); return; }
      if (following()) {
        // máy chủ trò chấm: gửi đáp án (đúng / sai, ô đã chọn, giây chốt theo đồng hồ của mình), hiện "Đã chốt" ngay
        sent = `${qid}:lock`; SFX.lock();
        sync.net.showInput('lock', [ok ? 1 : 0, Q.kind === 'abcd' ? i : -1, Math.round(el * 100) / 100, qid]);
      } else lock(myPod, ok, Q.kind === 'abcd' ? i : null, el);
      paintOv();
    }
    /** Bấm chuông (nút, phím cách): máy hiện theo gửi máy chủ trò, máy chủ trò / một mình thì bấm luôn. */
    function doBuzz() {
      if (!canBuzz()) return;
      if (following()) { sent = `${qid}:buzz:${phase}`; SFX.click(); sync.net.showInput('buzz', [qid]); paintOv(); return; }
      buzz(myPod);
    }
    function doPkg(k) {
      if (phase !== 'pick' || vd?.who !== myPod || role() !== 'pod') return;
      if (following()) { if (sent === `${qid}:pkg`) return; sent = `${qid}:pkg`; SFX.click(); sync.net.showInput('pkg', [k, qid]); return; }
      choosePkg(k);
    }
    function doStar(on) {
      if (phase !== 'star' || vd?.who !== myPod || role() !== 'pod') return;
      if (following()) { if (sent === `${qid}:star`) return; sent = `${qid}:star`; SFX.click(); sync.net.showInput('star', [on ? 1 : 0, qid]); return; }
      setStar(on);
    }
    /**
     * (Máy chủ trò) thao tác của một bạn thật khác trong phòng: from = mã của bạn ấy. Chỉ nhận đúng lúc bạn ấy được làm,
     * như khi chính bạn ấy bấm trên máy này (bước đã qua hay câu khác thì bỏ).
     */
    function input(from, type, a = []) {
      if (!hosting() || gone) return;
      if (type === 'nv') { readers.set(from, !!a[0]); return; }   // bạn ấy tự đọc đề / nghe được MC
      if (type === 'aud') {
        const st = seatById.get(a[0]);
        if (st?.live && st.real && st.ans == null && Q && ['think', 'buzzed', 'answer', 'stealing', 'steal', 'audLast'].includes(phase)) st.ans = !!a[1];
        return;
      }
      const i = pods.findIndex(p => !p.me && p.rid === from);
      if (i < 0 || a[a.length - 1] !== qid) return;
      const p = pods[i];
      if (type === 'lock') {
        if (!Q) return;
        const okNow = phase === 'answer' ? buzzer === i && p.state === 'buzz' : phase === 'think' && answers(i) && ['turn', 'think', 'idle'].includes(p.state);
        if (!okNow) return;
        const el = Math.max(0, Math.min(+a[2] || 0, (performance.now() - t0) / 1000));
        lock(i, !!a[0], Q.kind === 'abcd' && a[1] >= 0 ? a[1] : null, el);
        paintOv();
      } else if (type === 'buzz') {
        if (buzzer >= 0 || !sl) return;
        if ((phase === 'think' && sl.seg === 'common') || (phase === 'steal' && turn !== i)) buzz(i);
      } else if (type === 'pkg') { if (phase === 'pick' && vd?.who === i) choosePkg(Math.max(0, Math.min(3, a[0] | 0))); }
      else if (type === 'star') { if (phase === 'star' && vd?.who === i) setStar(!!a[0]); }
    }
    /** Bục i chốt đáp án (ok đúng / sai; pick: ô đã chọn của câu một đáp án). */
    function lock(i, ok, pick, el = (performance.now() - t0) / 1000) {
      const p = pods[i];
      p.state = 'locked'; p.ok = ok; p.pick = pick; p.lockAt = el; scrDirty = true;
      SFX.lock(); emit('lk', i);
    }
    /** Độ khó câu đang hỏi cho bạn ảo: độ khó trong ngân hàng, Về đích theo điểm câu. */
    const qLevel = () => (Q?.val ? Q.val / 10 : Q?.level || 1);
    function botLock(i) {
      const p = pods[i];
      let pick = null;
      if (Q.kind === 'abcd') {
        const wrong = [0, 1, 2, 3].filter(k => k !== Q.a && k !== Q.out);
        // bạn ảo sai thường mắc đúng cái bẫy của câu (questions.js trap: nhiễu dễ nhầm nhất), không phải chọn bừa
        const trap = wrong.includes(Q.trap) && Math.random() < 0.6 ? Q.trap : -1;
        pick = p.ok ? Q.a : trap >= 0 ? trap : wrong[(Math.random() * wrong.length) | 0];
      }
      lock(i, p.ok, pick);
      paintOv();
    }
    /* ---------- MC chủ trì ----------
       Mọi bước đi qua lời MC (src/dauTruong/mc.js, giọng trình duyệt mcVoice.js): đọc câu hỏi và từng phương án (ô bật ra đúng lúc MC
       đọc tới), "Thời gian bắt đầu!" rồi mới đếm giờ; ai chốt / bấm chuông / hết giờ, MC nói rồi mới lật; lật xong MC đọc đáp án,
       kết quả, đổi người chơi, khán phòng, rồi mới sang câu sau. `run` tăng khi đổi vòng / rời trang: chuỗi lời đang chờ tự dừng. */
    let run = 0, lastMon = -1;
    const live = (r) => r === run && !gone;
    const wait = (ms) => new Promise(res => later(res, ms));
    const monOf = (q) => (q?.m === 'tv' ? 1 : 0);
    const nameOf = (i) => pods[i].name;
    const leader = () => [...pods].sort((a, b) => b.score - a.score)[0];
    const topFan = () => seats.filter(s => s.live).sort((a, b) => b.score - a.score)[0];
    /** Khán giả giỏi nhất đợt vừa xong: được nhiều điểm nhất kể từ đầu đợt (s.base), tối đa 3 bạn (bằng điểm thì ai tổng cao hơn). */
    const bestFans = () => {
      const g = (x) => x.score - (x.base || 0);
      const live = seats.filter(x => x.live && g(x) > 0);
      const top = Math.max(0, ...live.map(g));
      return live.filter(x => g(x) === top).sort((a, b) => b.score - a.score).slice(0, 3).map(x => x.id);
    };
    // đèn rọi vàng cho khán giả giỏi nhất đợt (FX.fans), tắt khi không dùng
    const fanSpots = [0, 1, 2].map(() => { const sp = new THREE.SpotLight('#ffd76a', 0, 14, 0.16, 0.5, 1.2); scene.add(sp); return sp; });
    /* 🏅 Giấy chứng nhận của mình (src/dauTruong/cert.js): lưu vào Thành tích (awards.js, đồng bộ tài khoản), tờ giấy bay lên giữa
       màn hình, chữ ký hai MC chạy nét; tự thu lại sau 10 giây hoặc chạm Đóng, "Xem" mở dạng slide. Sân khấu thử: ghi demo. */
    const certEl = root.querySelector('.dt-cert');
    let certTm = 0;
    /* ⭐ Sao thưởng (sổ sao chung engine/stars.js, khoá dautruong<lớp>:<lúc trao giải>:pod|aud), mỗi buổi tối đa STAR_MAX.
       Thí sinh: theo hạng (POD_STARS) + điểm / 5 (tối đa 50).
       Khán giả: cao nhất cũng chỉ bằng thí sinh hạng tư (T4). Khán giả điểm cao nhất ≥ điểm T4 thì được đúng sao của T4, thấp hơn thì
       sao T4 × (điểm của bạn ấy / điểm T4). Các bạn khác: sao của khán giả cao nhất × (điểm mình / điểm khán giả cao nhất).
       Bạn ảo cũng hiện sao trên bục vinh danh nhưng không ghi sổ; sân khấu thử (không flow) chỉ hiện, không cộng. */
    const STAR_MAX = 100, POD_STARS = [50, 35, 25, 15];
    const podStars = (rank, score) => Math.min(STAR_MAX, POD_STARS[rank] + Math.min(50, Math.max(0, Math.round(score / 5))));
    /** Sao khán giả: hàm (điểm) → sao, theo T4 (điểm t4Score, sao t4Stars) và điểm khán giả cao nhất topScore. */
    function audStarsRule(t4Score, t4Stars, topScore) {
      const top = topScore <= 0 ? 0 : topScore >= t4Score ? t4Stars : Math.round(t4Stars * topScore / Math.max(1, t4Score));
      return (score) => (topScore > 0 && score > 0 ? Math.min(top, Math.max(1, Math.round(top * score / topScore))) : 0);
    }
    function giveStars(role, n, at) {
      if (!(n > 0)) return 0;
      if (flow) awardFixedStars(`dautruong${gradeNow()}:${at}:${role}`, n, { toast: false });   // màn thu sao (collectStars) thay hiệu ứng chung
      return n;
    }
    /* ⭐ Màn thu sao của mình (sau lễ trao giải): thẻ phần thưởng giữa màn hình (huy hiệu hạng, số sao to, dòng giải thích), chạm
       "Nhận sao" (hoặc tự nhận sau 8 giây) thì từng ngôi sao bay từ thẻ lên ô tổng sao góc trên, ô đếm tăng dần, mỗi sao một tiếng
       "ting"; xong thì thẻ thu lại. Sao đã ghi sổ trước (giveStars) nên rời trang giữa chừng vẫn không mất. Giảm chuyển động: vẫn
       bay, ít sao hơn, chậm hơn. */
    const collectEl = root.querySelector('.dt-collect');
    function collectStars({ n, badge, title, lines, total0 }) {
      return new Promise(done => {
        if (!(n > 0) || gone) { done(); return; }
        collectEl.innerHTML = `<div class="dt-col-total"><b>⭐</b><span>${total0}</span></div>
          <div class="dt-col-card"><div class="dt-col-badge">${badge}</div><h3>${esc(title)}</h3>
            <div class="dt-col-star"><b>⭐</b><span>${n}</span></div>
            ${lines.map(l => `<p>${esc(l)}</p>`).join('')}
            <button type="button" class="dt-col-go">Nhận sao</button></div>`;
        collectEl.hidden = false; collectEl.classList.remove('is-out');
        SFX.champ?.();
        const card = collectEl.querySelector('.dt-col-card'), from = collectEl.querySelector('.dt-col-star b'), totEl = collectEl.querySelector('.dt-col-total');
        const num = totEl.querySelector('span'), go = collectEl.querySelector('.dt-col-go');
        let taken = false;
        const auto = setTimeout(() => take(), 8000);
        go.onclick = () => take();
        function take() {
          if (taken || gone) return;
          taken = true; clearTimeout(auto);
          go.disabled = true; go.textContent = 'Đang nhận…';
          const a = from.getBoundingClientRect(), b = totEl.getBoundingClientRect(), r0 = collectEl.getBoundingClientRect();
          const k = Math.min(n, reduce ? 8 : 20), gap = reduce ? 180 : 90, dur = reduce ? 1100 : 750;
          let got = 0;
          for (let i = 0; i < k; i++) {
            const s = document.createElement('i'); s.className = 'dt-col-fly'; s.textContent = '⭐';
            s.style.left = `${a.left - r0.left + a.width / 2}px`; s.style.top = `${a.top - r0.top + a.height / 2}px`;
            collectEl.appendChild(s);
            const dx = b.left + 22 - a.left - a.width / 2, dy = b.top + b.height / 2 - a.top - a.height / 2;
            const bend = (Math.random() - 0.5) * 160;
            const anim = s.animate([
              { transform: 'translate(-50%, -50%) scale(1.4)', opacity: 1 },
              { transform: `translate(calc(-50% + ${dx * 0.45 + bend}px), calc(-50% + ${dy * 0.45 - 60}px)) scale(1.1)`, opacity: 1, offset: 0.45 },
              { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.6)`, opacity: 0.9 },
            ], { duration: dur, delay: i * gap, easing: 'cubic-bezier(.45,0,.3,1)', fill: 'both' });
            anim.onfinish = () => {
              s.remove(); got++;
              num.textContent = String(total0 + Math.round(n * got / k));
              totEl.classList.remove('is-pop'); void totEl.offsetWidth; totEl.classList.add('is-pop');
              SFX.ting?.(got % 4, true);
              if (got === k) later(() => { card.classList.add('is-out'); collectEl.classList.add('is-out'); later(() => { collectEl.hidden = true; done(); }, 700); }, 1300);
            };
          }
          let left = n;   // số trên thẻ giảm dần khi sao bay đi
          const drain = setInterval(() => { left = Math.max(0, left - Math.ceil(n / k)); const el = card.querySelector('.dt-col-star span'); if (el) el.textContent = String(left); if (!left) clearInterval(drain); }, gap);
        }
      });
    }
    /** Bay camera tới góc trao giải (không phải góc cài sẵn: nút góc máy không sáng nút nào). */
    function awardCam(v) { camCur = 'award'; flyCam(v); paintCams(); }
    function giveCert({ kind, name, score, rounds, right, total, stars, at }) {
      const row = addAward({ id: `${at}-${kind}`, kind, name, grade: gradeNow(), score, at, rounds, right, total, stars, demo: !flow || undefined });
      loadCertFonts();
      SFX.champ?.();
      certEl.innerHTML = `<div class="dt-cert-box">${certSvg({ ...row, sign: 'anim' })}
        <p><span>🏅 Đã lưu vào <b>Thành tích của em</b></span><button type="button" data-c="see">Xem</button><button type="button" data-c="x">Đóng</button></p></div>`;
      certEl.hidden = false; certEl.classList.remove('is-out');
      clearTimeout(certTm);
      const hide = () => { certEl.classList.add('is-out'); certTm = setTimeout(() => { certEl.hidden = true; }, 600); };
      certTm = setTimeout(hide, 10000);
      certEl.onclick = async (e) => {
        const c = e.target.closest('[data-c]')?.dataset.c;
        if (c === 'x') { clearTimeout(certTm); hide(); }
        if (c === 'see') { clearTimeout(certTm); const { openSlides } = await import('../dauTruong/awardsView.js'); hide(); openSlides([row], 0); }
      };
      confetti(80);
    }
    /** MC nói một câu của tình huống key; trả true nếu vòng vẫn đang chạy (false: đã đổi vòng, dừng chuỗi). */
    const hostVars = (vars) => ({ tenCT: SHOW_NAME.split('\n').join(' '), lop: gradeNow(), mon: monOf(Q), ...vars });
    async function host(key, vars = {}, opts) {
      const r = run;
      const ln = mcLine(key, hostVars(vars));
      if (ln) { emit('say', ln.text, ln.mc, ln.parts); await mcSpeak(ln.text, ln.mc, { ...opts, parts: ln.parts }); }
      return live(r);
    }
    /** Chọn sẵn câu MC sắp nói và tải trước giọng (cả phòng). Câu có tên: phần cố định và tên là các mp3 riêng (mc.js partsOf). */
    function preHost(key, vars = {}) {
      const ln = mcPlan(key, hostVars(vars));
      if (ln) fxRun('pre', ln.parts, ln.mc);
    }
    /** Tải trước câu hỏi q và bốn phương án. */
    const preQ = (q) => { if (q) fxRun('pre', [sayQuestion(q), ...(q.o || []).map((_, i) => sayOption(q, i))], monOf(q)); };
    async function speak(text, mc, opts) { const r = run; emit('say', text, mc); await mcSpeak(text, mc, opts); return live(r); }

    /* ---------- Chương trình chung: một máy chủ trò, cả phòng thấy y như nhau ----------
       Máy chủ trò chạy mọi bước như khi chơi một mình, rồi gửi qua máy chủ phòng:
         - ảnh chụp (snapOf): vòng, bước, câu hỏi, đồng hồ, bục (điểm, chốt, đúng sai), điểm khán phòng… mỗi lần đổi (soát 10 lần/giây);
         - hiệu ứng (emit / fxRun): lời MC, âm thanh, góc máy, pháo giấy, lễ trao giải.
       Máy hiện theo (following) không tự chạy bước nào: applySnap dựng lại dải đáp án, bảng điểm, lật đáp án theo ảnh chụp; chọn
       đáp án / bấm chuông / chọn gói / đặt sao / khán giả trả lời thì gửi máy chủ trò (input). Máy chủ trò rời phòng: máy chủ phòng
       trao quyền cho người kế, máy ấy chạy tiếp từ ảnh chụp cuối (resume). */
    let snapKey = '', snapT = 0, lastSnap = null, qpSnap = null;
    function snapOf() {
      return {
        mode, phase, qid, qn, qTotal, qp: sl ? qPos() : null, so: shownOpts, Q,
        tm: timer ? { id: timer.id, total: timer.total } : null,
        turn, buzzer, si, slots, sl: sl ? 1 : 0,
        vd: vd ? { who: vd.who, pkg: vd.pkg ? VD.pkgs.indexOf(vd.pkg) : -1, star: vd.star ? 1 : 0, su: vd.starUsed ? 1 : 0 } : null,
        pods: pods.map(p => ({ n: p.name, k: p.wantKind, sk: p.skill, r: ridOf(p), st: p.state, sc: p.score, g: p.gain, pk: p.pick ?? null, la: p.lockAt || 0, s: p.star ? 1 : 0, j: p.joy || '', rs: p.rs, ok: p.ok ? 1 : 0 })),
        seats: seats.filter(x => x.live).map(x => [x.id, x.score, x.nRight || 0, x.right ? 1 : 0, x.react || '']),
        ov: ov.hidden ? 0 : 1, bd: boardEl.hidden ? 0 : 1, tb: turnBase, qd: qDone, lm: lastMon, ma: mAlt, sa: showAt, se: showEnd,
      };
    }
    /** (Máy chủ trò) gửi ảnh chụp nếu có gì đổi; đồng hồ kèm số giây còn lại lúc gửi (người vào giữa chừng đếm tiếp đúng). */
    function flushSnap() {
      if (!sync?.host || gone) return;
      const o = snapOf(), key = JSON.stringify(o);
      if (key === snapKey) return;
      snapKey = key;
      if (o.tm) { const now = performance.now(); o.tm.left = Math.max(0, (timer.end - now) / 1000); o.tm.el = Math.max(0, (now - t0) / 1000); }
      sync.net.showSnap(o);
    }
    /** (Máy chủ trò) gửi một hiệu ứng cho cả phòng; ảnh chụp đi trước để máy hiện theo đã đúng bước khi chạy hiệu ứng. */
    function emit(name, ...args) {
      if (!sync?.host || gone) return;
      flushSnap();
      sync.net.showFx(name, args);
    }
    const sfx = (n, ...a) => { SFX[n]?.(...a); emit('sfx', n, ...a); };
    const camX = (k) => { cam(k); emit('cam', k); };
    /** Hiệu ứng chạy trên mọi máy (máy chủ trò chạy luôn và gửi đi). */
    function fxRun(name, ...args) { emit(name, ...args); FX[name]?.(...args); }
    /* Trao giải: phần của riêng mình (sao, giấy chứng nhận, màn thu sao) tính trên từng máy từ điểm chung. */
    let winMe = null;
    const winState = () => (winMe ||= { at: Date.now(), myStars: 0, mine: null, total0: getTotalStars() });
    const FX = {
      // máy chủ trò đã tự làm (nói, âm thanh, góc máy, tiếng chốt): chỉ máy hiện theo làm
      say: (text, mc, parts) => { if (following()) mcSpeak(text, mc, { parts }); },
      sfx: (n, ...a) => { if (following()) SFX[n]?.(...a); },
      cam: (k) => { if (following()) cam(k); },
      lk: (i) => { if (following() && i !== myPod) SFX.lock(); },
      pre: (texts, mc) => { (texts || []).forEach(t => mcPrefetch(t, mc)); },
      // mọi máy
      burst: (i, k) => { if (pods[i]) { burst(pods[i]); SFX.ting?.(k, true); } },
      // tổng kết đợt: đèn vàng rọi các bạn khán giả giỏi nhất đợt (mã ghế), [] tắt
      fans: (ids = []) => {
        const on = new Set(ids);
        seats.forEach(x => { x.star = on.has(x.id); });
        fanSpots.forEach((sp, k) => {
          const x = seats.find(y => y.id === ids[k]);
          sp.intensity = x ? 90 : 0;
          if (x) { sp.position.set(x.sg.position.x, x.sg.position.y + 7, x.sg.position.z - 2.5); sp.target = x.sg; }
        });
      },
      awardStart: (at) => { winMe = { at, myStars: 0, mine: null, total0: getTotalStars() }; showAward(true); awardCam(awardWide()); },
      awardCam: (rank) => awardCam(rank < 0 ? awardWide() : awardClose(rank)),
      stand: (i, rank, k) => {
        const p = pods[i], w = winState(), stars = podStars(rank, p.score);
        standOn(p, rank, stars);
        // của mình: giấy chứng nhận bay lên (lưu Thành tích) và sao thưởng vào sổ sao
        if (meOnPod && i === myPod) {
          w.myStars = giveStars('pod', stars, w.at);
          const bonus = stars - POD_STARS[rank];
          w.mine = { badge: ['🥇', '🥈', '🥉', '🏅'][rank], title: ['Quán quân', 'Á quân', 'Hạng ba', 'Hạng tư'][rank],
            lines: [`Giải hạng ${rank + 1}: ${POD_STARS[rank]} sao`, ...(bonus > 0 ? [`${p.score} điểm: thêm ${bonus} sao`] : []), `Trả lời đúng ${mine.right}/${qDone} câu`] };
          giveCert({ kind: k, name: p.name, score: p.score, rounds: { ...p.rs }, right: mine.right, total: qDone, stars, at: w.at });
        }
      },
      rain: () => { awardCam(awardWide()); rainOn = true; SFX.champ(); },
      // khán giả: cao nhất bằng sao của thí sinh hạng tư, các bạn khác theo % điểm của bạn khán giả cao nhất (audStarsRule)
      audStars: () => {
        const w = winState(), best = [...pods].sort((a, b) => b.score - a.score), stars = best.map((p, k) => podStars(k, p.score));
        const fan = topFan(), me = seats.find(x => x.mine);
        if (meOnPod || !me) return;
        const isBest = me === fan && fan.score > 0;
        const n = audStarsRule(best[3].score, stars[3], fan?.score || 0)(me.score || 0);
        w.myStars = giveStars('aud', n, w.at);
        if (n > 0) w.mine = { badge: isBest ? '🌟' : '👏', title: isBest ? 'Khán giả xuất sắc' : 'Khán giả cổ vũ', lines: [`${me.score} điểm khán giả`, `Trả lời đúng ${mine.right}/${qDone} câu`] };
        if (isBest) giveCert({ kind: 'aud', name: fan.name, score: fan.score, right: mine.right || fan.nRight || 0, total: qDone, stars: n, at: w.at });
      },
      // hết chương trình: màn thu sao của mình, rồi flow.js hiện thẻ kết thúc (điểm, sao của mình)
      end: async () => {
        if (!following() && showAt && !showEnd) { showEnd = Date.now(); scrDirty = true; }
        const w = winState(), r = run, best = [...pods].sort((a, b) => b.score - a.score), me = seats.find(x => x.mine);
        if (w.mine && w.myStars > 0) await collectStars({ n: w.myStars, total0: w.total0, ...w.mine });
        if (r !== run || gone) return;
        if (sync?.host) sync.net.showEnd();
        const res = { onPod: meOnPod, score: meOnPod ? pods[myPod].score : me?.score || 0, rank: meOnPod ? best.indexOf(pods[myPod]) + 1 : 0, right: mine.right, total: qDone, stars: w.myStars, sum: summarize(mine.log) };
        // 📊 lưu bảng mạnh / yếu của trận (trang Thành tích); sân khấu thử không lưu
        if (flow) saveMatch({ at: w.at, grade: gradeNow(), onPod: res.onPod, rank: res.rank, score: res.score, sum: res.sum });
        api.onShowEnd?.(res);
      },
    };
    /** (Máy hiện theo) dựng lại sân khấu theo ảnh chụp của máy chủ trò. */
    function applySnap(o) {
      if (!o || typeof o !== 'object' || !Array.isArray(o.pods)) return;
      lastSnap = o;
      if (!following() || gone) return;
      const was = { phase, bd: !boardEl.hidden };
      if (o.mode !== mode && ROUNDS[o.mode]) { clearLater(); run++; mcStop(); modeLook(o.mode); if (o.mode === 'win') winMe = null; }
      phase = o.phase; qn = o.qn; qTotal = o.qTotal; turn = o.turn; buzzer = o.buzzer; si = o.si;
      slots = Array.isArray(o.slots) ? o.slots : []; sl = o.sl ? slots[si - 1] || null : null;
      vd = o.vd ? { who: o.vd.who, pkg: VD.pkgs[o.vd.pkg] || null, star: !!o.vd.star, starUsed: !!o.vd.su } : null;
      if ((o.sa || 0) !== showAt) resetMine();   // buổi mới của máy chủ trò
      qDone = o.qd || 0; showAt = o.sa || 0; showEnd = o.se || 0; turnBase = o.tb || turnBase; lastMon = o.lm ?? -1; mAlt = o.ma || 0; shownOpts = o.so || 0; qpSnap = o.qp;
      const newQ = o.qid !== qid;
      qid = o.qid; Q = o.Q || null;
      if (!o.tm) timer = null;
      else if (!timer || timer.id !== o.tm.id) {
        const now = performance.now();
        timer = { id: o.tm.id, total: o.tm.total, end: now + (o.tm.left ?? o.tm.total) * 1000 };
        t0 = now - (o.tm.el || 0) * 1000;
      }
      // bục: tên, nhân vật, điểm, trạng thái; bục của mình là bục có mã của máy này
      let podsChanged = false;
      o.pods.forEach((x, i) => {
        const p = pods[i];
        if (!p || !x) return;
        if (p.name !== x.n || p.wantKind !== x.k) { p.name = x.n; p.wantKind = x.k; p.kid.visible = x.k >= 0; applyPod(p); podsChanged = true; }
        const me = !!sync.myId && x.r === sync.myId, rid = me ? 0 : x.r || 0;
        if (p.me !== me || (p.rid || 0) !== rid) podsChanged = true;
        p.me = me; p.rid = rid; p.skill = x.sk || 'kha';
        p.state = x.st; p.score = x.sc; p.gain = x.g; p.pick = x.pk; p.lockAt = x.la; p.star = !!x.s; p.joy = x.j; p.rs = x.rs || p.rs; p.ok = !!x.ok;
      });
      if (podsChanged) {
        myPod = pods.findIndex(p => p.me); meOnPod = myPod >= 0;
        api.onPods?.(pods.map(p => ({ name: p.name, kind: p.wantKind, rid: ridOf(p), me: p.me })));
      }
      // khán phòng: điểm từng ghế do máy chủ trò chấm (cả ghế của mình)
      for (const [id, sc, nr, right, react] of o.seats || []) {
        const st = seatById.get(id);
        if (!st) continue;
        st.score = sc; st.nRight = nr; st.right = !!right; st.react = react; st.dirty = true;
      }
      // giao diện theo bước
      if (newQ) { picks = []; sent = ''; seats.forEach(st => { st.ans = null; }); if (Q) { buildOv(); livePop(); } }
      // máy này không nghe được MC: báo máy chủ trò để cả phòng có thời gian đọc đề (chỉ báo khi đổi)
      const nv = voiceMode() === 'none';
      if (nv !== sentNv) { sentNv = nv; sync.net.showInput('nv', [nv ? 1 : 0]); }
      if (!Q && vd && ['pick', 'star'].includes(phase) && (newQ || was.phase !== phase)) buildChoice();
      else if (!Q && vd && ['picked', 'starred'].includes(phase)) paintChoice();
      if (Q && o.ov && ov.hidden) buildOv();   // vào giữa chừng / dải vừa ẩn lúc tổng kết đợt
      if (!o.ov) ov.hidden = true;
      if (o.bd && !was.bd) showBoard(); else if (!o.bd) boardEl.hidden = true;
      if (phase === 'reveal' && was.phase !== 'reveal') presentReveal();
      if (Q && !ov.hidden) buildBellLine();
      paintOv();
      scrDirty = true;
    }
    /**
     * (Vừa nhận quyền chủ trò giữa chương trình) chạy tiếp từ ảnh chụp cuối: câu đã lật thì sang bước sau; câu đang hỏi thì hỏi
     * lại câu khác cùng lượt (điểm chỉ cộng lúc lật nên không cộng hai lần); chọn gói / đặt sao thì hỏi lại.
     */
    function resume() {
      run++; clearLater(); mcStop();
      if (mode === 'idle') return;
      if (!ROUNDS[mode].sec) { intro(mode); return; }
      if (phase === 'done') { endRound(); return; }
      if (!sl) { if (si >= slots.length && slots.length) endRound(); else intro(mode); return; }
      if (phase === 'reveal') { nextSlot(); return; }
      if (sl.seg === 'pick') { if (vd?.pkg) nextSlot(); else startPick(sl.who); return; }
      if (phase === 'star') { startStar(); return; }
      runQuestion(sl.seg === 'vd');
    }
    // phụ đề lời MC (trên cùng, giữa) + MC đang nói thì nhấn nhá (vòng chân sáng, clip mcTalk)
    const capEl = root.querySelector('.dt-cap');
    let mcTalk = -1;
    setMcListener((mc, text) => {
      mcTalk = mc;
      root.classList.toggle('is-talking', mc >= 0);
      if (mc < 0) { capEl.classList.remove('is-on'); return; }
      capEl.querySelector('b').textContent = MC_NAMES[mc];
      capEl.querySelector('span').textContent = text;
      capEl.dataset.mc = mc;
      capEl.classList.add('is-on');
    });

    /** Bục i bấm chuông: MC gọi tên, rồi bạn ấy có TIME.answer giây chọn đáp án (bục khác thôi bấm). */
    async function buzz(i) {
      if (buzzer >= 0) return;
      buzzer = i;
      const p = pods[i], now = performance.now(), r = run;
      p.state = 'buzz'; p.bellT = now; scrDirty = true;
      sfx('bell', i);
      phase = 'buzzed'; timer = null;
      pods.forEach((q, k) => { if (k !== i && k !== turn && q.state !== 'wrong') q.state = 'idle'; });
      buildBellLine();
      paintOv();
      if (!(await host('bellHit', { ten: nameOf(i), mau: COLOR_NAMES[i] })) || r !== run) return;
      const sec = secs('answer');
      phase = 'answer'; setTimer(sec);
      if (isBot(i)) p.plan = 1.5 + Math.random() * Math.min(6, sec * 0.4);   // đúng sai đã quyết lúc bấm chuông (buzzPlan)
      paintOv();
    }
    function buildBellLine() {
      const left = ov.querySelector('.ch-qov-mleft span');
      if (left) left.innerHTML = metaLeft() + (buzzer >= 0 ? ` · 🔔 ${esc(pods[buzzer].name)}` : '');
    }
    /** Về đích: bạn đang tới lượt sai / hết giờ → MC báo, rồi 3 bạn kia có TIME.steal giây bấm chuông giành quyền. */
    async function steal(late) {
      const p = pods[turn];
      if (p.state === 'locked' && Q.kind === 'abcd') Q.out = p.pick;
      p.ok = false; p.state = 'wrong';
      phase = 'stealing'; timer = null; scrDirty = true;
      sfx('stop', late);
      paintOv();
      const v = { ten: nameOf(turn), diem: Q.val };
      if (!(await host(late ? 'vdLate' : vd.star ? 'vdWrongX2' : 'vdWrong', v))) return;
      if (!(await host('bellOpen'))) return;
      const sec = secs('steal');
      phase = 'steal'; setTimer(sec); scrDirty = true;
      pods.forEach((q, i) => {
        if (i === turn) return;
        q.state = 'idle';
        if (isBot(i)) { const b = buzzPlan(q.skill, { level: qLevel(), round: mode, sec, steal: true }); q.buzzAt = b.at; q.ok = b.ok; }
      });
      sfx('bellOpen');
      paintOv();
    }
    /** Người phải trả lời đã chốt: còn khán giả thật chưa chọn (và câu còn ≥ 1,5 giây) thì chờ khán phòng (audLast); MC nói ngay
        "X đã chốt! Khán phòng còn vài giây" trong lúc đồng hồ khán phòng chạy. Không thì đóng câu như cũ. */
    let audSay = null;
    const audWaiting = () => seats.some(s => s.live && (s.real || s.mine) && s.ans == null);
    function closeLocked(key, vars) {
      const left = timer ? (timer.end - performance.now()) / 1000 : 0;
      if (!audWaiting() || left < 1.5) { closeQ(key, vars); return; }
      phase = 'audLast'; setTimer(Math.min(AUD_LAST, Math.ceil(left))); scrDirty = true;
      paintOv();
      audSay = host(sl?.seg === 'speed' ? 'audLastAll' : key === 'lockedFast' ? 'audLastFast' : 'audLast', vars);
    }
    /** Đóng câu: MC nói một câu (ai chốt, hết giờ, không ai bấm chuông) rồi lật. */
    async function closeQ(key, vars) {
      const late = phase !== 'audLast' && !!timer && performance.now() >= timer.end;
      const said = audSay; audSay = null;
      if (said && !(await said)) return;   // chờ MC nói xong lời mời khán phòng
      phase = 'closing'; timer = null; scrDirty = true;
      sfx('stop', late);
      paintOv();
      if (key && !(await host(key, vars))) return;
      reveal();
    }

    /* ---------- Diễn một câu ---------- */
    function buildSlots(m) {
      if (m === 'khoidong') return [
        ...pods.flatMap((_, i) => Array.from({ length: KD.solo }, (__, k) => ({ seg: 'solo', who: i, first: k === 0, last: k === KD.solo - 1 }))),
        ...Array.from({ length: KD.common }, (_, k) => ({ seg: 'common', who: -1, first: k === 0 })),
      ];
      if (m === 'tangtoc') return TT.types.map(type => ({ seg: 'speed', who: -1, type }));
      // Về đích: bạn ít điểm đi trước (bằng điểm thì bục trước)
      if (m === 'vedich') return pods.map((_, i) => i).sort((a, b) => pods[a].score - pods[b].score || a - b).map(i => ({ seg: 'pick', who: i }));
      return [];
    }
    function takeQ(s) {
      const grade = gradeNow();
      if (s.seg === 'speed') {
        // ngân hàng Tăng tốc HK I (bank/hk1/g<lớp>/tt.js, có hình vẽ) trước; thiếu thì sinh câu như cũ
        const hq = arena && Math.random() < 0.8 ? arena.speed(s.type) : null;
        if (hq) return hq;
        if (s.type === 'facts' && arena && Math.random() < 0.5) {
          const q = arena.one('order', mAlt++ % 2 ? 'tv' : 'toan');
          if (q) return { ...q, tag: 'Sắp xếp' };
        }
        return speedQ(s.type, grade);
      }
      const round = s.seg === 'vd' ? 'vd' : 'kd';
      const q = arena ? arena.one('abcd', mAlt++ % 2 ? 'tv' : 'toan', { hard: (s.val || 0) >= 20, round, pt: s.val || 0 }) : null;
      return q || { kind: 'abcd', ...BANK[bankAt++ % BANK.length] };
    }
    async function nextSlot() {
      if (si >= slots.length) { endRound(); return; }
      sl = slots[si++];
      const r = run;
      if (sl.seg === 'pick') { startPick(sl.who); return; }
      // MC chủ trì đổi người chơi / đổi lượt
      if (sl.seg === 'solo' && sl.first) {
        turn = sl.who; Q = null; phase = 'turn'; scrDirty = true;
        pods.forEach((p, i) => { p.state = i === turn ? 'turn' : 'idle'; });
        ov.hidden = true; camX('players'); sfx('spot');
        if (!(await host('kdTurn', { ten: nameOf(turn) }))) return;
        await wait(200);
      }
      if (sl.seg === 'common' && sl.first) {
        turn = -1; Q = null; phase = 'turn'; scrDirty = true;
        pods.forEach(p => { p.state = 'idle'; });
        ov.hidden = true; camX('players'); sfx('bellOpen');
        if (!(await host('kdCommon'))) return;
      }
      if (r !== run) return;
      if (sl.seg === 'vd' && !vd.starUsed) startStar(); else runQuestion();
    }
    /** Về đích: MC mời bạn vào lượt, hỏi chọn gói; bạn máy tự chọn (càng thua xa càng chọn gói lớn). */
    async function startPick(who) {
      vd = { who, pkg: null, star: false, starUsed: false };
      turn = who; buzzer = -1; Q = null; phase = 'turn'; timer = null; scrDirty = true;
      pods.forEach((p, i) => { p.state = i === who ? 'turn' : 'idle'; p.star = false; p.gain = 0; });
      ov.hidden = true; camX('players'); sfx('spot');
      // một câu mời + hỏi gói (vdTurn), bảng gói hiện ngay sau đó
      if (!(await host('vdTurn', { ten: nameOf(who), diem: pods[who].score }))) return;
      phase = 'pick'; qid++; scrDirty = true;
      buildChoice();
      requestAnimationFrame(() => { if (!gone) camX('screen'); });
      setTimer(secs('pick'));
      paintChoice();
      if (isBot(who)) {
        const lead = Math.max(...pods.map(p => p.score)) - pods[who].score;
        const k = pickPackage(pods[who].skill, lead);
        later(() => choosePkg(k), 2000 + Math.random() * 2000);
      }
    }
    async function choosePkg(k) {
      if (phase !== 'pick') return;
      vd.pkg = VD.pkgs[k];
      slots.splice(si, 0, ...vd.pkg.v.map((val, qi) => ({ seg: 'vd', who: vd.who, val, qi })));
      phase = 'picked'; timer = null; scrDirty = true;
      sfx('level', Math.min(3, k + 1));
      paintChoice();
      if (!(await host(vd.pkg.pts === 90 ? 'vdBig' : 'vdPicked', { ten: nameOf(vd.who), goi: vd.pkg.pts, list: vd.pkg.v.join(', ') }))) return;
      nextSlot();
    }
    /** Về đích trước mỗi câu (khi còn sao): MC hỏi đặt Ngôi sao hy vọng hay không. */
    async function startStar() {
      Q = null; buzzer = -1; phase = 'star'; qid++; timer = null; scrDirty = true;
      buildChoice();
      requestAnimationFrame(() => { if (!gone) camX('screen'); });
      if (!(await host('starAsk', { so: sl.qi + 1, diem: sl.val, ten: nameOf(vd.who) }))) return;
      if (phase !== 'star') return;   // bấm trước khi MC hỏi xong
      setTimer(secs('star'));
      paintChoice();
      if (isBot(vd.who)) {
        const go = wantStar(pods[vd.who].skill, sl.val, sl.qi === 2);
        later(() => setStar(go), 1200 + Math.random() * 1500);
      }
    }
    async function setStar(on) {
      if (phase !== 'star') return;
      vd.star = on;
      if (on) { vd.starUsed = true; pods[vd.who].star = true; sfx('double'); } else sfx('click');
      phase = 'starred'; timer = null; scrDirty = true;
      paintChoice();
      if (on && !(await host('starOn', { ten: nameOf(vd.who), diem: sl.val, diemX2: sl.val * 2 }))) return;
      runQuestion(true);
    }
    /** Câu hỏi: MC trao lời khi đổi môn, đọc số câu, câu hỏi, từng phương án (ô bật ra lúc MC đọc tới), "Thời gian bắt đầu!". */
    async function runQuestion(afterStar = false) {
      const r = run;
      Q = nextQ?.slot === sl ? nextQ.q : takeQ(sl);
      nextQ = null;
      if (sl.val) Q.val = sl.val;
      qn++; qid++; picks = []; shownOpts = 0; phase = 'read'; timer = null; buzzer = -1; scrDirty = true;
      turn = sl.who;
      pods.forEach((p, i) => {
        p.state = i === turn ? 'turn' : 'idle'; p.lockAt = 0; p.ok = false; p.gain = 0; p.pick = null;
        p.plan = Infinity; p.buzzAt = Infinity; p.star = !!(vd && sl.seg === 'vd' && i === vd.who && vd.star);
      });
      seats.forEach(s => { s.ans = null; s.right = false; s.dirty = true; });
      livePop();
      const mon = monOf(Q);
      // giọng Azure: tải trước (cả phòng) câu hỏi, bốn phương án và lời MC của câu này để MC đọc liền mạch, không chờ mạng giữa
      // các câu. Thường câu hỏi đã tải từ lúc các bạn nghĩ câu trước (startThink); tải lại thì lấy ngay từ bộ nhớ.
      preQ(Q);
      const askKey = sl.seg === 'speed' ? 'ttAsk' : sl.seg === 'vd' && !afterStar ? 'vdAsk' : null;   // Khởi động: số câu đã trên màn hình, vào thẳng đề
      const askVars = { so: qPos()[0], loai: (Q.tag || '').toLowerCase(), diem: Q.val };
      if (askKey) preHost(askKey, askVars);
      // đồng hồ + tiếng "go" là hiệu lệnh, MC không mời trả lời; chỉ câu đầu lượt chung nhắc bấm chuông
      const goKey = sl.seg === 'common' && sl.first ? 'goBell' : null;
      const goVars = { ten: nameOf(Math.max(0, turn)) };
      if (goKey) preHost(goKey, goVars);
      // có bạn tự đọc: đồng hồ đọc đề chung cho cả phòng, bốn phương án hiện ngay
      const reading = needRead();
      if (reading) { shownOpts = 4; setTimer(kidReadSec(Q)); }
      // đổi môn: MC của môn đọc thẳng, không trao lời / cảm ơn qua lại (giữ nhịp thi nhanh)
      lastMon = mon;
      buildOv(); paintOv();
      sfx('open');
      requestAnimationFrame(() => { if (!gone && Q) camX('screen'); }); // dải đáp án đã dựng: đo rồi mới khớp khung câu hỏi
      if (askKey && !(await host(askKey, askVars))) return;
      if (!(await speak(sayQuestion(Q), mon))) return;
      if (Q.kind === 'order' && !(await host('kindOrder'))) return;
      for (let i = 0; i < 4; i++) {
        if (!(await speak(sayOption(Q, i), mon, { onStart: () => { shownOpts = Math.max(shownOpts, i + 1); paintOv(); sfx('option', i); } }))) return;
        if (shownOpts <= i) { shownOpts = i + 1; paintOv(); }
      }
      // hết lời MC mà khoảng đọc đề chưa hết: chờ cho bạn tự đọc đọc xong (cả phòng cùng chờ)
      if (reading && timer) { const left = timer.end - performance.now(); if (left > 0) await wait(left); if (r !== run) return; }
      if (goKey && !(await host(goKey, goVars))) return;
      if (r === run && phase === 'read') startThink();
    }
    function startThink() {
      const sec = Q.val ? secs('vd' + Q.val) : secs(mode);
      phase = 'think'; setTimer(sec); qT0 = t0;
      sfx('go', mode, Q.val ? Q.val / 10 : 2);
      pods.forEach((p, i) => {
        if (answers(i) && p.state !== 'locked') p.state = 'think';
        if (!isBot(i)) return;   // mình / bạn thật khác: tự bấm
        // bạn ảo theo trình độ (npc.js): biết đáp án theo độ khó câu, bạn giỏi nghĩ nhanh hơn, bạn chưa chắc ít bấm chuông
        if (sl.seg === 'common') { const b = buzzPlan(p.skill, { level: qLevel(), round: mode, sec }); p.buzzAt = b.at; p.ok = b.ok; }
        else if (answers(i)) { const d = decide(p.skill, { level: qLevel(), round: mode, sec }); p.plan = d.at; p.ok = d.ok; }
      });
      // khán giả: bạn ảo theo trình độ; bạn thật (real) tự trả lời trên máy mình, máy chủ trò nhận qua 'xi'
      seats.forEach(s => { if (s.real) { s.plan = Infinity; return; } const d = decide(s.skill, { level: qLevel(), round: mode, sec }); s.plan = d.at; s.ok = d.ok; });
      paintOv();
      preAhead();
    }
    /**
     * Lúc các bạn đang nghĩ (MC im, mạng rảnh): tải trước giọng của mọi câu MC có thể nói tới hết câu sau. Lời kết quả chưa biết
     * đúng hay sai nên tải cả hai; câu có tên thì tên đã tải từ đầu vòng (setMode), chỉ cần phần cố định. Câu kế tiếp lấy sẵn
     * (nextQ) để tải câu hỏi và bốn phương án.
     */
    function preAhead() {
      const ten = nameOf(Math.max(0, turn)), chu = LETTER[Q.a];
      if (sl.seg === 'speed' || sl.seg === 'common') preHost(Q.kind === 'abcd' ? 'answer' : 'answerShow', { chu });
      const keys = {
        solo: ['soloRight', 'soloWrong', 'soloLate'],
        common: ['bellHit', 'commonRight', 'commonWrong', 'noBell'],
        speed: ['ttNone'],
        vd: ['vdRight', 'vdRightX2', 'vdWrong', 'vdWrongX2', 'vdLate', 'stealRight', 'stealWrong'],
      }[sl.seg] || [];
      keys.forEach(k => preHost(k, { ten, chu, diem: Q.val, diemX2: Q.val * 2, mau: COLOR_NAMES[Math.max(0, turn)] }));
      // tổng kết đợt và lời mời lượt sau (điểm còn đổi: chỉ cần phần cố định và tên)
      const ns = slots[si], fan = topFan();
      if (!ns && fan) preHost('audTop', { ten: fan.name, diem: fan.score || 10 });
      if (ns?.seg === 'solo' && ns.first) preHost('kdTurn', { ten: nameOf(ns.who) });
      if (ns?.seg === 'common' && ns.first) { preHost('kdCommon'); }
      if (ns?.seg === 'pick') preHost('vdTurn', { ten: nameOf(ns.who), diem: pods[ns.who].score });
      if (ns && ns.seg !== 'pick' && nextQ?.slot !== ns) { nextQ = { slot: ns, q: takeQ(ns) }; preQ(nextQ.q); }
    }
    /** Mỗi khung hình lúc đang đếm giờ: bạn máy chốt / bấm chuông, khán giả trả lời, hết giờ hay đủ người thì MC đóng câu. */
    function stepRound(now) {
      if (!timer || !TIMED.has(phase)) return;
      const el = (now - t0) / 1000, up = now >= timer.end;
      if (phase === 'pick') { if (up) choosePkg(1); return; }
      if (phase === 'star') { if (up) setStar(false); return; }
      const qel = (now - qT0) / 1000;
      seats.forEach(s => { if (s.live && !s.mine && !s.real && s.ans == null && qel >= s.plan) s.ans = s.ok; });
      if (phase === 'audLast') { if (up || !audWaiting()) closeQ(null); return; }
      if (phase === 'think') {
        if (sl.seg === 'common') { const b = pods.findIndex((p, i) => isBot(i) && el >= p.buzzAt); if (b >= 0) { buzz(b); return; } }
        else pods.forEach((p, i) => { if (isBot(i) && p.state === 'think' && el >= p.plan) botLock(i); });
      } else if (phase === 'steal') {
        const b = pods.findIndex((p, i) => i !== turn && isBot(i) && el >= p.buzzAt);
        if (b >= 0) { buzz(b); return; }
      } else if (phase === 'answer') {
        const p = pods[buzzer];
        if (isBot(buzzer) && p.state === 'buzz' && el >= p.plan) botLock(buzzer);
      }
      // người phải trả lời đã chốt thì đóng câu ngay, không chờ hết giờ
      if (phase === 'think') {
        if (sl.seg === 'speed') {
          if (pods.every(p => p.state === 'locked')) closeLocked(null); else if (up) closeQ(null);
        } else if (sl.seg === 'common') { if (up) closeQ('noBell'); }
        else {
          const p = pods[turn];
          // lượt cá nhân Khởi động: không báo "đã chốt" / "hết giờ", lời kết quả nói luôn (soloRight / soloWrong / soloLate)
          const kd = sl.seg === 'solo';
          if (p.state === 'locked') { if (sl.seg === 'vd' && !p.ok) steal(false); else closeLocked(null, { ten: nameOf(turn) }); }
          else if (up) { if (sl.seg === 'vd') steal(true); else closeQ(kd ? null : 'timeUp'); }
        }
      } else if (phase === 'steal') { if (up) closeQ('noBell'); }
      else if (phase === 'answer') {
        // lượt chung Khởi động: bạn bấm chuông chốt xong thì lật luôn, lời kết quả nói cả đáp án
        const kd = sl.seg === 'common';
        if (pods[buzzer].state === 'locked') closeLocked(kd ? null : pods[buzzer].lockAt < 3 ? 'lockedFast' : 'locked', { ten: nameOf(buzzer) }); else if (up) closeQ(kd ? null : 'timeUp');
      }
    }
    /** Lật: tính điểm, đổi màu bục, khán giả cộng điểm; rồi MC đọc đáp án, kết quả, khán phòng, sang bước sau. */
    function reveal() {
      phase = 'reveal'; timer = null; scrDirty = true;
      const R = ROUNDS[mode];
      const okAt = (i) => pods[i].state === 'locked' && pods[i].ok;
      pods.forEach(p => { p.gain = 0; });
      if (sl.seg === 'solo') { if (okAt(turn)) pods[turn].gain = KD.right; }
      else if (sl.seg === 'common') { if (buzzer >= 0) pods[buzzer].gain = okAt(buzzer) ? KD.right : -KD.minus; }
      else if (sl.seg === 'speed') {
        pods.map((p, i) => i).filter(okAt).sort((a, b) => pods[a].lockAt - pods[b].lockAt).forEach((i, k) => { pods[i].gain = TT.pts[k]; });
      } else {
        const p = pods[turn];
        if (okAt(turn)) p.gain = Q.val * (vd.star ? 2 : 1);
        else if (vd.star) p.gain = -Q.val;
        if (buzzer >= 0 && okAt(buzzer)) pods[buzzer].gain = Q.val;
      }
      const res = { star: vd?.star, turnLocked: turn >= 0 && pods[turn].pick != null };
      pods.forEach((p, i) => {
        const part = takesPart(i);
        const right = part && okAt(i) && p.gain > 0;
        p.state = !part ? 'idle' : right ? 'right' : 'wrong';
        // mỗi câu mỗi bạn đúng mừng một kiểu (clip trong pupil_*.glb, scripts/blender/build_pupil_anim.py):
        // nhảy giơ hai tay, vỗ tay, nắm tay vung trước ngực "Yes!", hai nắm tay lắc trước ngực; không lặp kiểu câu trước
        if (right && p.pupil) {
          const kinds = JOYS.filter(k => p.pupil.clips[k] && k !== p.joy);
          p.joy = kinds[Math.floor(Math.random() * kinds.length)] || 'cheer';
        }
        p.score += p.gain;
        if (RK[mode]) p.rs[RK[mode]] += p.gain;   // điểm từng vòng (in trên giấy chứng nhận)
      });
      qDone++;
      if (vd) vd.star = false;
      // khán giả: đúng được điểm (Về đích bằng điểm câu), điểm hiện trên đầu từng bạn
      const audPts = Q.val || R.aud;
      // khán giả giả lập chưa kịp trả lời (câu lật sớm vì thí sinh đã chốt) phần lớn coi như đã chọn xong
      seats.forEach(s => { if (s.live && !s.mine && !s.real && s.ans == null && Math.random() < 0.85) s.ans = s.ok; });
      seats.forEach(s => { s.right = s.live && s.ans === true; if (s.right) { s.score += audPts; s.nRight = (s.nRight || 0) + 1; } s.dirty = true; s.react = s.live && !s.mine ? reactOf(s.right) : ''; });
      presentReveal();
      afterReveal(res);
    }
    /** Lật đáp án trên máy này (máy chủ trò lúc chấm xong, máy hiện theo lúc ảnh chụp sang 'reveal'): âm thanh, pháo giấy của mình. */
    function presentReveal() {
      paintOv();
      const anyRight = pods.some(p => p.state === 'right');
      if (sl?.seg === 'speed') pods.slice().sort((a, b) => (a.lockAt || 99) - (b.lockAt || 99)).forEach((p, k) => later(() => SFX.ting(k, p.state === 'right'), 300 + k * 320));
      else SFX.result(anyRight);
      if (sl?.seg === 'speed' && anyRight) later(() => SFX.result(true), 1700);
      if (anyRight) later(() => SFX.points(), sl?.seg === 'speed' ? 2200 : 700);
      if (pods.some(p => p.gain < 0)) later(() => SFX.minus(), 900);
      const sided = role() === 'pod' && !takesPart(myPod) && side.qid === qid;
      const mineOk = role() === 'aud' ? meSeat.ans === true : role() === 'pod' && (sided ? side.ok : pods[myPod].state === 'right');
      if (role() === 'aud' ? meSeat.ans != null : role() === 'pod' && (takesPart(myPod) || sided)) SFX.mine(mineOk);
      const tried = role() === 'aud' ? meSeat.ans != null : role() === 'pod' && (takesPart(myPod) || sided);
      if (mine.last !== qid && Q) {
        mine.last = qid;
        if (mineOk) mine.right++;
        if (tried) mine.log.push({ t: topicOf(Q), m: Q.m === 'tv' ? 'tv' : 'toan', r: RK[mode] || '', ok: !!mineOk });
      }
      if (mineOk) confetti(60);
      livePop();
    }
    /** Câu MC nói kết quả của câu vừa lật. [key, vars] */
    function resultLine(res) {
      const v = (i, extra) => ({ ten: nameOf(i), ...extra });
      if (sl.seg === 'solo') {
        const p = pods[turn];
        return p.state === 'right' ? ['soloRight', v(turn)] : res.turnLocked ? ['soloWrong', v(turn)] : ['soloLate', v(turn)];
      }
      if (sl.seg === 'common') {
        if (buzzer < 0) return null;
        return pods[buzzer].state === 'right' ? ['commonRight', v(buzzer)] : ['commonWrong', v(buzzer)];
      }
      if (sl.seg === 'speed') {
        const won = pods.map((p, i) => i).filter(i => pods[i].gain > 0).sort((a, b) => pods[a].lockAt - pods[b].lockAt);
        if (!won.length) return ['ttNone', {}];
        return won.length > 1 && Math.random() < 0.4 ? ['ttSome', { soBan: won.length }]
          : ['ttFast', v(won[0], { giay: pods[won[0]].lockAt.toFixed(1).replace('.', ',') })];
      }
      if (buzzer >= 0) return pods[buzzer].state === 'right' ? ['stealRight', v(buzzer, { diem: Q.val })] : ['stealWrong', v(buzzer)];
      const p = pods[turn];
      if (p.state === 'right') return [res.star ? 'vdRightX2' : 'vdRight', v(turn, { diem: Q.val, diemX2: Q.val * 2 })];
      return null;   // sai: MC đã nói lúc mở giành quyền
    }
    async function afterReveal(res) {
      const r = run;
      // Khởi động có người trả lời: một câu gộp đáp án + kết quả ("Đúng rồi, bê! Mười điểm cho Lan."); còn lại đọc đáp án trước
      const ln = resultLine(res), merged = !!ln && (sl.seg === 'solo' || sl.seg === 'common' || sl.seg === 'vd');
      if (!merged) {
        if (!(await host(Q.kind === 'abcd' ? 'answer' : 'answerShow', { chu: LETTER[Q.a] }))) return;
        await wait(250);
        if (r !== run) return;
      }
      // camera đứng yên ở màn câu hỏi suốt lượt: kết quả hiện ngay trong ô camera trực tiếp (pháo giấy, đèn rọi vàng ở bục bạn
      // đúng); MC nói kết quả. Dải đáp án (huy hiệu kết quả của chính người xem) giữ tới câu sau
      pods.map((p, i) => i).filter(i => pods[i].state === 'right').forEach((i, k) => later(() => fxRun('burst', i, k), 300 + k * 220));
      if (ln && !(await host(ln[0], { chu: LETTER[Q.a], ...ln[1] }))) return;
      // điểm khán giả hiện trên đầu từng bạn, MC không đọc sau mỗi câu (chỉ gọi tên người dẫn đầu khán phòng lúc hết vòng)
      const fan = topFan(), lastOfTurn = si >= slots.length || slots[si].seg !== sl.seg || slots[si].who !== sl.who;
      await wait(300);
      if (r !== run) return;
      // hết đợt (lượt của một bạn, lượt chung, cả vòng Tăng tốc): mới rời màn câu hỏi, xem khán phòng cùng bảng điểm
      if (lastOfTurn && !(await recap(fan))) return;
      if (r === run && ROUNDS[mode].sec) nextSlot();
    }
    /** Tổng kết đợt: camera lướt chậm một lượt qua khán phòng (thẻ điểm khán giả), bảng điểm bốn thí sinh chạy số; MC gọi tên
        khán giả dẫn đầu rồi tổng kết lượt của bạn vừa thi. */
    const AUD_HOLD = 7000;   // ms camera đứng ở khán phòng (tổng kết đợt, khán giả xuất sắc)
    async function recap(fan) {
      const r = run;
      ov.hidden = true;
      // góc Khán phòng cố định (không lướt), đèn vàng rọi những bạn khán giả được nhiều điểm nhất trong đợt
      camX('crowd');
      fxRun('fans', bestFans());
      showBoard();
      // bảng điểm tự nói điểm từng bạn; MC chỉ gọi khán giả dẫn đầu lúc hết vòng
      const t = performance.now();
      if (si >= slots.length && fan && fan.score > 0 && !(await host('audTop', { ten: fan.name, diem: fan.score }))) return false;
      // dừng ở khán phòng AUD_HOLD (user 2026-11-09: 5–10 giây, nhanh quá thì không kịp xem ai được điểm, bảng điểm chạy số)
      await wait(Math.max(400, AUD_HOLD - (performance.now() - t)));
      if (r !== run) return false;
      fxRun('fans', []);
      seats.forEach(x => { x.base = x.score; });
      boardEl.hidden = true;
      turnBase = pods.map(p => p.score);
      return true;
    }
    /* ---------- Bảng điểm hết đợt ---------- */
    const boardEl = root.querySelector('.dt-board');
    let turnBase = [0, 0, 0, 0];
    function showBoard() {
      const one = sl.seg === 'solo' || sl.seg === 'vd' ? sl.who : -1;
      const best = Math.max(...pods.map(p => p.score));
      const title = one >= 0 ? `Bảng điểm sau lượt của ${pods[one].name}` : sl.seg === 'common' ? 'Bảng điểm sau lượt chung' : 'Bảng điểm sau vòng Tăng tốc';
      boardEl.innerHTML = `<b class="dt-board-t">${esc(title)}</b>` + pods.map((p, i) => {
        const g = p.score - turnBase[i];
        const cls = `${best > 0 && p.score === best ? ' is-lead' : ''}${g > 0 ? ' is-up' : g < 0 ? ' is-down' : ''}${i === one ? ' is-me' : ''}`;
        return `<div class="dt-bc${cls}" style="--c:${COLORS[i]};--k:${i}"><span class="dt-bc-n">${esc(p.name)}</span><b class="dt-bc-s">${turnBase[i]}</b><em>${g > 0 ? `+${g}` : g < 0 ? g : '+0'} điểm</em></div>`;
      }).join('');
      boardEl.hidden = false;
      const from = turnBase.slice(), to = pods.map(p => p.score), els = [...boardEl.querySelectorAll('.dt-bc-s')], r = run;
      if (!to.some((v, i) => v !== from[i])) return;
      later(() => {
        if (r !== run) return;
        SFX.points?.();
        if (to.some((v, i) => v > from[i])) confetti(50);
        els.forEach((el, i) => { if (to[i] !== from[i]) el.classList.add('is-run'); });
        const t0b = performance.now(), dur = 1000;
        const step = () => {
          if (r !== run || boardEl.hidden) return;
          const k = Math.min(1, (performance.now() - t0b) / dur), e = 1 - (1 - k) ** 3;
          els.forEach((el, i) => { el.textContent = Math.round(from[i] + (to[i] - from[i]) * e); });
          if (k < 1) requestAnimationFrame(step); else els.forEach(el => el.classList.remove('is-run'));
        };
        requestAnimationFrame(step);
      }, 300);
    }
    /** Hết câu của vòng: MC tổng kết, toàn cảnh, rồi tự sang vòng sau (Khởi động → Tăng tốc → Về đích → Trao giải). */
    async function endRound() {
      Q = null; phase = 'done'; timer = null; scrDirty = true; sl = null; turn = -1; buzzer = -1; vd = null;
      ov.hidden = true;
      pods.forEach(p => { p.state = 'idle'; p.star = false; });
      camX('wide');
      sfx('result', true);
      const top = leader();
      const key = { khoidong: 'kdEnd', tangtoc: 'ttEnd' }[mode];
      if (key && !(await host(key, { ten: top.name, diem: top.score }))) return;
      await wait(800);
      setMode(NEXT[mode] || 'win');
    }
    /** Lời mở đầu của từng vòng (và Mở màn, Trao giải), rồi vào bước đầu. */
    async function intro(m) {
      const r = run;
      const vars = { so: KD.solo, giay: secs(m) };
      // cả chuỗi lời dẫn chọn sẵn và tải trước ngay: câu sau tải xong trong lúc MC đọc câu trước
      const say = async (...keys) => { keys.forEach(k => preHost(k, vars)); for (const k of keys) if (!(await host(k, vars))) return false; return true; };
      if (m === 'open') {
        await wait(2500);
        if (r === run && await say('openHi', 'openMe0', 'openMe1', 'openPlan') && r === run) setMode('khoidong');
        return;
      }
      if (m === 'win') {
        await wait(2000);
        if (r !== run) return;
        const best = [...pods].sort((a, b) => b.score - a.score);
        // 🏆 bục vinh danh: toàn cảnh bốn khối trống, rồi MC đọc từ hạng tư lên, camera áp lại khối của từng bạn. Sao, giấy chứng
        // nhận, màn thu sao của mình: mỗi máy tự tính trong FX (stand, audStars, end) từ điểm chung
        fxRun('awardStart', Date.now());
        if (!(await host('awardOpen'))) return;
        for (const [k, rank] of [['rank4', 3], ['rank3', 2], ['rank2', 1], ['champ', 0]]) {
          const p = best[rank];
          fxRun('awardCam', rank);
          await wait(reduce ? 1400 : 1000);
          if (r !== run) return;
          fxRun('stand', pods.indexOf(p), rank, k);
          if (!(await host(k, { ten: p.name, diem: p.score }))) return;
        }
        // đủ bốn bạn: toàn cảnh, giấy rơi ngập sân khấu, cả khán phòng mừng
        fxRun('rain');
        if (!(await host('champPts', { ten: best[0].name, diem: best[0].score }))) return;
        const fan = topFan();
        if (fan && fan.score > 0) {
          camX('crowd');
          const t = performance.now();
          if (!(await host('audBest', { ten: fan.name, diem: fan.score }))) return;
          await wait(Math.max(0, AUD_HOLD - (performance.now() - t)));
          if (r !== run) return;
          fxRun('awardCam', -1);
        }
        fxRun('audStars');
        if (!(await say('bye')) || r !== run) return;
        // ⭐ màn thu sao của mình, rồi thẻ kết thúc (flow.js)
        fxRun('end');
        return;
      }
      if (!ROUNDS[m].sec) return;
      await wait(1800);
      // MC còn đang đi từ giữa sân khấu về chỗ dẫn, hay bộ câu đang tải: chờ
      while (r === run && (mcArrive() || arena === null)) await wait(200);
      if (r !== run) return;
      const keys = { khoidong: ['kdIntro', 'kdRule'], tangtoc: ['ttIntro', 'ttRule'], vedich: ['vdIntro', 'vdRule', 'vdRule2'] }[m];
      if (!(await say(...keys))) return;
      nextSlot();
    }
    /** Đổi vòng trên màn hình (màu đèn, nút vòng, góc máy, nhạc): máy chủ trò trong setMode, máy hiện theo khi ảnh chụp đổi vòng. */
    function modeLook(m) {
      mode = m;
      // thống kê admin: vòng đang chiếu, mình ở bục hay không, điểm (dòng bỏ giữa chừng ghi đúng chỗ dừng)
      if (flow && m !== 'idle') showProgress({ mode: m, pod: meOnPod, score: meOnPod ? pods[myPod]?.score || 0 : seats.find(x => x.mine)?.score || 0 });
      setMcRate(gradeNow() <= 2 ? 1.05 : 1.2);   // MC đọc nhanh hơn 1,2 lần (lớp 1–2 vẫn chậm hơn một chút: 0,88 × 1,2)
      ov.hidden = true; ov.innerHTML = '';
      boardEl.hidden = true;
      paintModes();
      const R = ROUNDS[m];
      neon.a.emissive.set(R.a); neon.b.emissive.set(R.b);
      beams.forEach((b, i) => b.cone.material.color.set(i % 2 ? R.b : R.a));
      if (awardOn) showAward(false);   // rời Trao giải: các bạn về bục thí sinh, bục vinh danh cất đi
      rainOn = false;
      cam(m === 'win' ? 'front' : 'wide');
      if (m === 'idle') { SFX.stopAll(); SFX.lobby(true); }
      else if (m === 'open') SFX.intro();
      else if (m === 'win') SFX.champ();
      else SFX.round(m);
    }
    function setMode(m) {
      if (following()) return;   // máy hiện theo: vòng đổi theo ảnh chụp của máy chủ trò
      clearLater(); run++; mcStop();
      phase = 'none'; timer = null; Q = null; qn = 0; picks = []; scrDirty = true;
      sl = null; turn = -1; buzzer = -1; vd = null; mAlt = 0; lastMon = -1;
      modeLook(m);
      pods.forEach(p => { p.state = 'idle'; p.star = false; p.gain = 0; });
      seats.forEach(s => { s.right = false; s.ans = null; s.dirty = true; });
      if (m === 'idle') { showAt = 0; showEnd = 0; resetMine(); }
      else if (!showAt || m === 'open') { showAt = Date.now(); showEnd = 0; resetMine(); }
      if (m === 'open' || m === 'idle') { pods.forEach(p => { p.score = 0; p.shown = 0; p.rs = { kd: 0, tt: 0, vd: 0 }; }); seats.forEach(s => { s.score = 0; s.nRight = 0; }); qDone = 0; }
      turnBase = pods.map(p => p.score);
      seats.forEach(x => { x.base = x.score; });
      FX.fans([]);
      slots = buildSlots(m); si = 0; nextQ = null;
      // tên bốn bạn trên bục: mỗi tên một mp3 riêng cho mỗi giọng MC, ghép vào lời có tên (mc.js partsOf), tải một lần từ đầu vòng
      const names = pods.map(p => p.name).filter(Boolean);
      fxRun('pre', names, 0); fxRun('pre', names, 1);
      qTotal = slots.filter(s => s.seg !== 'pick').length + slots.filter(s => s.seg === 'pick').length * 3;
      intro(m);
    }

    /* Nút vòng thi (bản mẫu): một nút trên phải ghi vòng đang chạy, chạm mở danh sách các vòng. */
    const modeBtn = root.querySelector('.dt-mode'), menu = root.querySelector('.dt-menu');
    function paintModes() {
      modeBtn.innerHTML = `${icon('play')}<span>${ROUNDS[mode].label}</span>`;
      modeBtn.setAttribute('aria-expanded', String(!menu.hidden));
      menu.innerHTML = Object.entries(ROUNDS).map(([k, r]) => `<button type="button" role="menuitem" data-mode="${k}" aria-pressed="${k === mode}">${r.label}</button>`).join('');
    }
    const elapsedEl = root.querySelector('.dt-elapsed'), elapsedB = elapsedEl.querySelector('b');
    let elapsedTxt = '';
    function paintElapsed() {
      if (gone) return;
      const ms = showAt ? Math.max(0, (showEnd || Date.now()) - showAt) : 0, sec = Math.floor(ms / 1000);
      const h = Math.floor(sec / 3600), m = Math.floor(sec / 60) % 60, ss = String(sec % 60).padStart(2, '0');
      const t = h ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${m}:${ss}`;
      elapsedEl.classList.toggle('is-off', !showAt);
      if (t !== elapsedTxt) { elapsedTxt = t; elapsedB.textContent = t; }
    }
    const elapsedTm = setInterval(paintElapsed, 500);
    // không còn nút tắt giọng MC trong lúc thi: máy nào trước đây đã tắt thì bật lại, kẻo không còn cách nghe MC
    if (isMcMuted()) setMcMuted(false);
    modeBtn.onclick = () => { menu.hidden = !menu.hidden; paintModes(); };
    menu.onclick = (e) => { const b = e.target.closest('[data-mode]'); if (!b) return; menu.hidden = true; setMode(b.dataset.mode); };

    /* ---------- 📺 Camera trực tiếp cạnh khung câu hỏi ----------
       Suốt lượt của một bạn, camera chính đứng yên ở "Màn hình câu hỏi"; người đang trả lời hiện trong ô .dt-live ở khoảng trống
       cạnh khung câu hỏi (màn ngang: cột trái, sát mép khung; màn dọc: dải phía trên khung). Ô được vẽ bằng camera thứ hai
       (liveCam) vào đúng hình chữ nhật của ô sau khi vẽ cảnh chính, nên thấy bạn ấy chốt, đèn rọi, pháo giấy và điểm trên bục.
       Ai trả lời: người bấm chuông, nếu không thì bạn tới lượt; lượt chung / Tăng tốc / chờ giành quyền thì mỗi bạn một ô nhỏ.
       Vị trí ô chỉ đổi khi khung câu hỏi đổi (xoay màn), không nhảy trong lượt. */
    const liveEl = root.querySelector('.dt-live');
    const liveCam = new THREE.PerspectiveCamera(40, 1, 0.1, 80);
    const _lv = new THREE.Vector3(), _ls = new THREE.Vector2();
    let liveKey = '', liveBox = '', liveCells = [];
    function liveWho() {
      if (!sl || !ROUNDS[mode].sec || camCur !== 'screen' || camTo) return null;
      if (buzzer >= 0) return [buzzer];
      if (phase === 'steal') return [0, 1, 2, 3].filter(i => i !== turn);
      if (turn >= 0) return [turn];
      return [0, 1, 2, 3];
    }
    /** Khung câu hỏi trên màn LED, đổi ra điểm ảnh trên màn hình (theo camera chính). */
    function cardRect(W, H) {
      const l = -SCR.w / 2 + SCR.w * CARD.x / 1600, rgt = l + SCR.w * CARD.w / 1600;
      const t = SCR.y + SCR.h / 2 - SCR.h * CARD.y / 900, b = t - SCR.h * CARD.h / 900;
      const pt = (x, y) => { _lv.set(x, y, SCR.z).project(camera); return [(_lv.x + 1) / 2 * W, (1 - _lv.y) / 2 * H]; };
      const [L, T] = pt(l, t), [R, B] = pt(rgt, b);
      return { L, T, R, B };
    }
    function placeLive(who) {
      const r0 = root.getBoundingClientRect(), W = r0.width, H = r0.height, c = cardRect(W, H), m = 12;
      const topBar = (root.querySelector('.ch-top .ch-ic')?.getBoundingClientRect().bottom ?? r0.top + 54) - r0.top + 8;
      let box = null, row = false;
      const side = c.L - 2 * m, many = who.length > 1;
      if (side >= 110) {
        const h = c.B - c.T, w = Math.min(side, h * (many ? 0.9 : 0.75));
        box = [c.L - m - w, c.T, w, h];
      } else {
        // màn dọc: khoảng trống giữa đáy khung câu hỏi và dải đáp án (đồng hồ ngồi trên mép dải); phía trên khung là chỗ phụ đề MC,
        // chỉ dùng khi khoảng dưới quá hẹp
        const qb = ov.hidden ? null : ov.querySelector('.ch-qov-box');
        const floor = qb ? qb.getBoundingClientRect().top - r0.top - (H < 520 ? 40 : 60) : H * 0.62;
        const below = Math.min(floor - c.B - m, (c.R - c.L) * 0.5), above = Math.min(c.T - topBar - m, (c.R - c.L) * 0.42);
        const low = below >= 90 || below >= above, h = low ? below : above, y = low ? c.B + m : c.T - m - above;
        if (h >= 70) { row = true; const w = Math.min(c.R - c.L, h * (many ? 6 : 1.6)); box = [(W - w) / 2, y, w, h]; }
      }
      if (!box) return false;
      const key = box.map(Math.round).join(',') + row;
      if (key !== liveBox) {
        liveBox = key;
        Object.assign(liveEl.style, { left: `${box[0]}px`, top: `${box[1]}px`, width: `${box[2]}px`, height: `${box[3]}px` });
        liveEl.classList.toggle('is-row', row);
      }
      liveEl.classList.toggle('is-many', many);
      const k = who.join(',');
      if (k !== liveKey) {
        liveKey = k;
        const rang = (i) => i === buzzer && who.length === 1;   // ô của bạn vừa bấm chuông: viền nháy màu bục, nhãn 🔔
        liveEl.innerHTML = who.map(i => `<div class="dt-live-cell${rang(i) ? ' is-bell' : ''}" style="--c:${COLORS[i]}"><span class="dt-live-tag">${rang(i) ? '🔔 Giành quyền' : '<i></i>Trực tiếp'}</span><em class="dt-live-pop"></em><b class="dt-live-name"><span>${esc(pods[i].name)}</span><s></s></b></div>`).join('');
        liveCells = [...liveEl.children].map((el, j) => ({ el, i: who[j], sc: el.querySelector('s'), shown: null }));
      }
      return true;
    }
    /** Ô của bạn i: kết quả câu vừa lật (viền xanh / đỏ, chữ +10 bay lên); gọi lúc lật và lúc lên câu mới (xoá). */
    function livePop() {
      liveCells.forEach(({ el, i }) => {
        const p = pods[i], ok = phase === 'reveal' && p.state === 'right', no = phase === 'reveal' && p.state === 'wrong';
        el.classList.toggle('is-ok', ok); el.classList.toggle('is-no', no);
        const pop = el.querySelector('.dt-live-pop');
        pop.classList.remove('is-on');
        pop.textContent = ok ? `+${p.gain}` : no ? (p.gain < 0 ? `${p.gain}` : '✕') : '';
        if (ok || no) { void pop.offsetWidth; pop.classList.add('is-on'); }
      });
    }
    /** Máy quay của ô: trước mặt bục, ngang tầm ngực, khung vừa bạn ấy cùng mặt bàn và màn điểm. */
    function aimLive(p, aspect) {
      // ô dẹt (nhiều ô): khung hẹp theo chiều cao, nâng lên ngang mặt bàn và mặt bạn ấy
      const g = p.g.position, ry = p.g.rotation.y, fx = Math.sin(ry), fz = Math.cos(ry), d = 4.6, flat = aspect > 1.4;
      const tx = g.x - fx * 0.3, tz = g.z - fz * 0.3, ty = flat ? 1.85 : 1.62;
      liveCam.position.set(tx + fx * d, ty + 0.35, tz + fz * d);
      liveCam.lookAt(tx, ty, tz);
      const tanV = Math.max(flat ? 0.68 : 0.95, 0.88 / aspect) / d;
      liveCam.fov = THREE.MathUtils.clamp(2 * Math.atan(tanV) * 180 / Math.PI, 18, 75);
      liveCam.aspect = aspect; liveCam.updateProjectionMatrix();
    }
    function renderLive() {
      const who = liveWho();
      if (!who || !placeLive(who)) { if (!liveEl.hidden) { liveEl.hidden = true; liveKey = ''; liveCells = []; } return; }
      liveEl.hidden = false;
      const rc = renderer.domElement.getBoundingClientRect(), size = renderer.getSize(_ls), pr = renderer.getPixelRatio();
      const auto = renderer.shadowMap.autoUpdate;
      renderer.shadowMap.autoUpdate = false;   // bóng đã tính ở lần vẽ chính
      renderer.setScissorTest(true);
      liveCells.forEach(c => {
        const p = pods[c.i], n = Math.round(p.shown);
        if (n !== c.shown) { c.shown = n; c.sc.textContent = n; }
        const r = c.el.getBoundingClientRect(), b = c.el.clientLeft;
        // khớp đúng điểm ảnh thật của máy (lệch nửa điểm ảnh là nhoè)
        const X = Math.round((r.left - rc.left + b) * pr), Y = Math.round((rc.bottom - r.bottom + b) * pr);
        const Wp = Math.round((r.width - 2 * b) * pr), Hp = Math.round((r.height - 2 * b) * pr);
        if (Wp < 8 || Hp < 8) return;
        aimLive(p, Wp / Hp);
        if (noSharp) {
          renderer.setViewport(X / pr, Y / pr, Wp / pr, Hp / pr); renderer.setScissor(X / pr, Y / pr, Wp / pr, Hp / pr);
          renderer.render(scene, liveCam);
          return;
        }
        // như cảnh chính (present): vẽ vào tấm đệm MSAA đúng ô đó, rồi phủ ra màn hình qua bộ lọc làm nét, chỉ trong ô
        sharpRT.viewport.set(X, Y, Wp, Hp); sharpRT.scissor.set(X, Y, Wp, Hp); sharpRT.scissorTest = true;
        renderer.setRenderTarget(sharpRT); renderer.render(scene, liveCam);
        renderer.setRenderTarget(null);
        renderer.setViewport(0, 0, size.x, size.y); renderer.setScissor(X / pr, Y / pr, Wp / pr, Hp / pr);
        renderer.render(sharpScene, sharpCam);
      });
      sharpRT.viewport.set(0, 0, sharpRT.width, sharpRT.height); sharpRT.scissor.set(0, 0, sharpRT.width, sharpRT.height); sharpRT.scissorTest = false;
      renderer.setScissorTest(false);
      renderer.setViewport(0, 0, size.x, size.y);
      renderer.shadowMap.autoUpdate = auto;
    }

    /* ---------- Vòng lặp ---------- */
    const clock = new THREE.Clock();
    /* 🔔 Chuông trên bàn bục: bạn nào bấm (buzzer, cả máy hiện theo nhờ ảnh chụp) thì chuông nhún xuống, nháy sáng màu bục
       1,2 giây kèm vòng sáng loang ra mặt bàn, rồi sáng đều cho tới câu sau, nên trong ô Trực tiếp nhìn là biết ai giành quyền.
       Giảm chuyển động: không nháy, không loang, chỉ sáng lên êm. */
    let bellSeen = -1;
    function stepBell(p, i, t) {
      if (i === 0 && buzzer !== bellSeen) { bellSeen = buzzer; if (buzzer >= 0) pods[buzzer].ringT = t; }
      const on = i === buzzer && p.ringT >= 0, k = on ? t - p.ringT : 99;
      const hit = !reduce && k < 1.2, flash = hit ? 0.5 + 0.5 * Math.abs(Math.cos(k * 14)) : 1;
      p.bell.material.emissiveIntensity = on ? (hit ? 3 + 6 * flash : 4) : 1.6;
      // nhún: bấm xuống nhanh rồi bật lên
      p.bell.scale.y = on && !reduce && k < 0.35 ? 1 - 0.45 * Math.sin(Math.PI * k / 0.35) : 1;
      const want = on ? (hit ? 0.6 + 0.4 * flash : 0.75) : 0;
      p.bellGlow.material.opacity += (want - p.bellGlow.material.opacity) * (reduce ? 0.08 : 0.35);
      p.bellGlow.scale.setScalar(on ? 0.9 + (hit ? 0.35 * flash : 0.15) : 0.9);
      const w = on && !reduce && k < 1.2 ? (k % 0.6) / 0.6 : -1;   // hai vòng loang
      p.bellWave.visible = w >= 0;
      if (w >= 0) { p.bellWave.scale.setScalar(0.12 + w * 0.7); p.bellWave.material.opacity = 0.9 * (1 - w); }
    }
    function frame() {
      if (!root.isConnected) { dispose(); return; } // rời trang bằng đường khác (nút Back của trình duyệt, đổi trang)
      const now = performance.now(); const t = clock.getElapsedTime();
      const dt = Math.min(0.1, (now - (frame.last || now)) / 1000); frame.last = now;
      syncCamLock();
      stepCam(now);
      stepCelebrate(dt);
      if (awardOn) stepAward(dt);
      camMove(dt);
      controls.update();
      camRead();
      const R = ROUNDS[mode];
      // bạn máy chốt / bấm chuông, khán giả trả lời; người phải trả lời đã chốt hoặc hết giờ thì sang bước sau
      if (hosting()) stepRound(now);
      if (sync?.host && now - snapT > 100) { snapT = now; flushSnap(); }   // ảnh chụp cho cả phòng (chỉ gửi khi có gì đổi)
      // đèn quét
      // máy bật giảm chuyển động: vẫn quét nhưng chậm, biên độ nhỏ, không nhấp nháy (bản êm, không tắt hẳn)
      const speed = reduce ? 0.3 : mode === 'tangtoc' ? 2.2 : mode === 'win' ? 1.6 : 0.6;
      const amp = reduce ? 0.6 : 1;
      beams.forEach(b => {
        const s = Math.sin(t * speed + b.ph);
        b.cone.rotation.z = s * 0.45 * amp; b.cone.rotation.x = 0.25 + Math.cos(t * speed * 0.7 + b.ph) * 0.25 * amp;
        b.cone.material.opacity = camCur === 'screen' ? 0.025 : phase === 'reveal' ? 0.13 : 0.07; // áp sát màn: tia đèn mờ đi, khỏi che chữ
        b.cone.updateMatrix(); placePool(b);
        b.pool.material.opacity = camCur === 'screen' ? 0.15 : phase === 'reveal' ? 0.95 : 0.7;
      });
      // nhịp neon (giảm chuyển động: thở chậm, biên độ nhỏ)
      const pulse = reduce ? 0.95 + 0.1 * Math.sin(t * 0.8) : 0.8 + 0.4 * Math.sin(t * (phase === 'think' ? 6 : 2));
      neon.a.emissiveIntensity = 2.2 * pulse; neon.b.emissiveIntensity = 2.0 * (reduce ? 1.05 - 0.1 * Math.sin(t * 0.8) : 1.2 - 0.4 * Math.sin(t * 2));
      hexes.forEach(h => {
        const w = 0.5 + 0.5 * Math.sin(t * (reduce ? 0.7 : 2.5) - h.x * 0.25 + h.y * 0.1);
        h.rim.scale.setScalar(1);
        h.rim.material = w > 0.75 ? neon.a : neon.b;
      });
      // bục
      // lượt riêng (Khởi động cá nhân, Về đích): đèn rọi tập trung bục đang tới lượt / bấm chuông, ba bục kia mờ
      const focus = turn >= 0 && phase !== 'reveal';
      pods.forEach((p, i) => {
        const st = p.state, dim = focus && i !== turn && i !== buzzer && phase !== 'steal';
        const flash = st === 'buzz' && !reduce ? Math.abs(Math.sin(t * 12)) : 1;
        const col = st === 'right' ? '#21e67a' : st === 'wrong' ? '#ff3b4d' : st === 'locked' ? '#ffffff' : st === 'turn' ? '#ffd45c' : p.col;
        p.ringM.emissive.set(col);
        p.ringM.emissiveIntensity = st === 'right' && !reduce ? 2 + 2 * Math.abs(Math.sin(t * 10)) : st === 'wrong' ? 1.2 : st === 'buzz' ? 1.5 + 3 * flash : dim ? 0.6 : 2.4;
        p.spot.color.set(st === 'wrong' ? '#8a93b8' : st === 'right' ? '#fff3c4' : col);
        p.spot.intensity = st === 'wrong' ? 15 : st === 'right' ? 140 : st === 'buzz' || st === 'turn' ? 120 : dim ? 12 : 60;
        stepBell(p, i, t);
        p.tabScr.material.emissive.set(st === 'locked' ? '#ffffff' : '#2f6bff');
        if (p.shown !== p.score) p.shown = p.shown < p.score ? Math.min(p.score, p.shown + 0.6) : Math.max(p.score, p.shown - 0.6); // điểm chạy số (cả lúc bị trừ)
        if (awardOn) p.spot.intensity = 8;   // trao giải: bục thí sinh tối, ánh sáng dồn về bục vinh danh
        if (p.award) { /* đứng trên bục vinh danh: stepAward lo dáng và nhịp */ }
        else if (p.pupil) {
          // đúng: kiểu mừng rút ở reveal (p.joy); giảm chuyển động thì vẫn mừng nhưng chậm lại, không đứng hình
          pupilPlay(p.pupil, st === 'right' ? p.joy || 'cheer' : 'idle', { fade: 0.25, at: Math.random() * 0.3 });
          p.pupil.mixer.update(reduce && st === 'right' ? dt * 0.6 : dt);
        } else if (st === 'right' && !reduce) p.kid.position.y = 0.12 + Math.abs(Math.sin(t * 7)) * 0.12; else p.kid.position.y = 0.12;
      });
      // màn LED (2048 × 1152) và màn bục vẽ lại ~12 lần / giây hoặc ngay khi đổi bước, không phải mỗi khung hình
      if (scrDirty || now - scrLast > 80) {
        scrDirty = false; scrLast = now;
        pods.forEach(p => drawPod(p, TIMED.has(phase) && timer && (p.state === 'think' || p.state === 'buzz') ? Math.max(0, timer.end - now) / (timer.total * 1000) : null));
        drawScreen(now);
      }
      if (TIMED.has(phase) || phase === 'read') paintClock();
      // khán phòng: đèn lưng ghế sáng cho ai đúng, vỗ tay lúc lật đáp án
      seats.forEach(s => {
        if (s.dirty) { s.dirty = false; if (s.live) drawTag(s); }
        // thẻ điểm chỉ hiện khi camera ở phía sân khấu nhìn xuống khán phòng (góc Khán phòng, MC…); camera sau lưng khán giả
        // nhìn lên sân khấu thì ẩn, để thẻ không chồng lên bục và màn LED; ghế sát camera mờ dần
        if (s.live && camera.position.z < s.sg.position.z - 0.5) {
          const p = s.sg.position, d = Math.hypot(camera.position.x - p.x, camera.position.y - p.y - 2, camera.position.z - p.z - 0.1);
          s.tag.material.opacity = Math.min(1, Math.max(0, (d - 2) / 2));
        } else s.tag.material.opacity = 0;
        s.tag.visible = s.tag.material.opacity > 0.02;
        s.lamp.material.emissive.set(s.star ? '#ffc93c' : s.right ? '#21e67a' : R.a);
        s.lamp.material.emissiveIntensity = s.star ? 3.5 + Math.sin(t * 6) * 0.8 : s.right ? 2.5 : 0.35;
        s.tag.scale.set(s.star ? 1.2 : 0.9, s.star ? 0.6 : 0.45, 1);
        const cheer = (phase === 'reveal' || mode === 'win') && !reduce;
        if (s.pupil) {
          // lật đáp án: mỗi bạn một kiểu theo đúng / sai của mình (npc.js reactOf: "Yes!", mừng, vỗ tay cho bạn, buồn, ngồi yên);
          // Trao giải: cả khán phòng mừng / vỗ tay. Mỗi người vào nhịp lệch một chút, xong thì về dáng ngồi.
          const want = !cheer ? '' : mode === 'win' ? (s.ph % 1 < 0.6 ? 'sitCheer' : 'sitClap') : s.react || '';
          const pose = want && s.pupil.clips[want] ? want : want ? 'sitClap' : '';
          if (pose) pupilPlay(s.pupil, pose, { fade: 0.25, at: s.ph % 2 });
          else if (s.pupil.pose !== 'sit') pupilPlay(s.pupil, 'sit', { once: true, end: true, fade: 0.4 });
          if (s.pupil.pose !== 'sit' || s.pupil.live > 0) { s.pupil.mixer.update(dt); s.pupil.live -= dt; }
        } else if (s.kid) s.kid.position.y = 0.25 + (cheer ? Math.abs(Math.sin(t * 9 + s.ph)) * 0.08 : 0);
      });
      // 2 MC thay phiên: lúc đọc / lật thì một người nói (vòng chân sáng, đèn rọi mạnh, nhún nhẹ), lúc thí sinh suy nghĩ cả hai im
      const talker = mcTalk;   // MC đang đọc (mcVoice), -1: cả hai im
      mcs.forEach((m, k) => {
        const on = k === talker;
        m.ring.material.emissiveIntensity = on ? 2.4 : 0.2;
        m.spot.intensity = on ? 75 : 30;
        if (m.pupil && m.home) {
          // đầu chương trình đứng giữa sân khấu; vào vòng thi thì đi về chỗ dẫn cạnh bục (về Chờ thì ra lại giữa)
          const wantAt = mode === 'idle' || mode === 'open' ? 'center' : 'home';
          if (wantAt !== (m.go || m.at)) { m.go = wantAt; m.leg = 0; }   // chặng 0: tới điểm via cạnh bục, chặng 1: tới đích
          m.ring.visible = m.at === 'home' && !m.go;
          if (m.go) {
            const end = m.go === 'center' ? MC_CENTER[k] : m.home;
            const T = m.leg === 0 ? m.via : end, H = m.go === 'center' ? 0 : m.homeH;
            const p = m.fig.position, dx = T.x - p.x, dz = T.z - p.z, dist = Math.hypot(dx, dz);
            let face = H;
            if (dist > 0.03) {
              const step = Math.min(dist, MC_SPEED * dt);
              p.x += dx / dist * step; p.z += dz / dist * step;
              p.y += (T.y - p.y) * Math.min(1, step / Math.max(dist, 0.3));
              face = Math.atan2(dx, dz);
              pupilPlay(m.pupil, 'walk', { fade: 0.3 });
            } else if (m.leg === 0) {
              p.copy(T); m.leg = 1; m.pupil.mixer.update(dt); return;   // qua điểm via: đi tiếp, không dừng
            } else {
              p.copy(T);
              pupilPlay(m.pupil, 'idle', { fade: 0.4 });
            }
            const da = Math.atan2(Math.sin(face - m.fig.rotation.y), Math.cos(face - m.fig.rotation.y));
            m.fig.rotation.y += da * Math.min(1, dt * 6);
            if (dist <= 0.03 && Math.abs(da) < 0.03) { m.fig.rotation.y = H; m.at = m.go; m.go = null; }
            m.pupil.mixer.update(dt);
            return;
          }
          // MC chỉ đứng, nói, ăn mừng (clip mc_teacher: idle | walk | mcTalk | mcTalk2 | shake | mcCheer): đang nói thì nhấn
          // nhá một tay (tay kia buông) xen hai tay; trao giải vỗ tay mừng; còn lại đứng
          const want = mode === 'win' && !on ? 'mcCheer' : !on ? 'idle'
            : Math.floor(t / 3.2) % 3 === 2 ? 'mcTalk2' : 'mcTalk';
          pupilPlay(m.pupil, want, { fade: 0.4 });
          m.pupil.mixer.update(reduce && want !== 'idle' ? dt * 0.6 : dt);
        } else m.fig.position.y = 0.1 + (on && !reduce ? Math.abs(Math.sin(t * 6)) * 0.02 : 0);
      });
      present(scene, camera);
      renderLive();
      raf = requestAnimationFrame(frame);
    }

    /* ---------- 🎥 Góc máy: thanh icon dưới trái (.ch-views) + bảng chỉnh góc (.ch-camset) ----------
       Giữ nút (hoặc phím) để dời camera: W S tiến lùi, A D trái phải, R F lên xuống, Q E xoay, T G ngước cúi, Z X phóng thu.
       Ô số sửa thẳng vị trí, điểm nhìn, góc nhìn. "Lưu vào góc" ghi đè góc đang chọn (theo màn ngang / dọc đang xem),
       "Thêm góc mới" tạo thêm nút góc. Lưu trên máy này; "Sao chép" lấy JSON mọi góc (cả ngang và dọc) để đặt làm mặc định.
       Lúc lên câu hỏi camera tự sang "Màn hình câu hỏi", lật đáp án xong sang "Bục thí sinh"; chạm góc khác thì giữ tới bước sau. */
    const viewsEl = root.querySelector('.ch-views'), camsEl = viewsEl.querySelector('.ch-views-list'), camSetBtn = viewsEl.querySelector('.ch-views-set');
    const panel = root.querySelector('.dt-camset');
    const fields = [...panel.querySelectorAll('[data-f]')];
    const camHold = new Map();
    function paintCams() {
      let extra = 0;
      camsEl.innerHTML = allCams().map((p, i) => {
        const n = p.icon ? '' : `<b>${++extra}</b>`;
        return `<button type="button" class="ch-view" data-cam="${p.id}" aria-pressed="${p.id === camCur}" aria-label="${p.name}" title="${p.name}${i < 9 ? ` (${i + 1})` : ''}">${icon(p.icon || 'star')}${n}</button>`;
      }).join('');
      camSetBtn.setAttribute('aria-expanded', String(!panel.hidden));
      const sel = panel.querySelector('[data-cs="which"]');
      sel.innerHTML = allCams().map(p => `<option value="${p.id}"${p.id === camCur ? ' selected' : ''}>${p.name}</option>`).join('');
      panel.querySelector('[data-cs="del"]').hidden = !camStore.extra.some(p => p.id === camCur);
      panel.querySelector('.dt-cs-kind').textContent = camKind() === 'port' ? 'màn dọc' : 'màn ngang';
    }
    camsEl.addEventListener('click', (e) => {
      const b = e.target.closest('[data-cam]');
      if (b) cam(b.dataset.cam);
    });
    camSetBtn.addEventListener('click', () => { panel.hidden = !panel.hidden; paintCams(); camRead(); });
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
    /* Thí sinh đang thi (mình đứng bục, đang trong vòng có câu hỏi): camera tự chạy theo lượt, không đổi góc, không kéo xoay,
       không mở bảng chỉnh góc, để bé chỉ nhìn câu hỏi và ô camera của mình. Khán giả và lúc chờ / mở màn vẫn đổi góc được. */
    let camLock = null;
    function syncCamLock() {
      const on = meOnPod && !!ROUNDS[mode].sec;
      if (on === camLock) return;
      camLock = on;
      root.classList.toggle('is-cam-lock', on);
      controls.enabled = !on;
      if (on) { panel.hidden = true; camHold.clear(); paintCams(); }
    }
    function onKey(e) {
      if (e.target.closest?.('input, select, textarea')) return;
      if (e.code === 'Space' && e.type === 'keydown' && canBuzz()) { e.preventDefault(); doBuzz(); return; }
      if (camLock) return;
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
        // chỉ chép góc đã sửa (Lưu vào góc này) và góc thêm mới, mỗi góc chỉ màn đã sửa; góc mặc định không có gì để gửi
        const extra = new Set(camStore.extra.map(p => p.id));
        const out = allCams().filter(p => extra.has(p.id) || camStore.set[p.id]).map(p => {
          const o = { id: p.id, name: p.name };
          for (const k of ['land', 'port']) if (extra.has(p.id) || camStore.set[p.id]?.[k]) o[k] = viewOf(p, k);
          return o;
        });
        // góc đang nhìn (đã xoay, kéo, gõ số mà chưa Lưu): chép luôn vào góc đang chọn, vì đó là thứ người chỉnh đang thấy
        const cur = cloneView(nowView()), base = viewOf(findCam(which), kind);
        const moved = ['pos', 'target'].some(f => cur[f].some((v, i) => Math.abs(v - base[f][i]) > 0.01)) || Math.abs(cur.fov - base.fov) > 0.1;
        if (moved) {
          let o = out.find(x => x.id === which);
          if (!o) { o = { id: which, name: findCam(which).name }; out.push(o); }
          o[kind] = cur;
        }
        if (!out.length) { note('Các góc vẫn là mặc định, camera cũng chưa đổi. Chỉnh góc xong rồi bấm Sao chép.'); return; }
        const txt = JSON.stringify(out, (k, v) => (typeof v === 'number' ? r2(v) : v));
        const done = () => note(`Đã sao chép ${out.length} góc${moved ? `, gồm góc đang nhìn (lưu vào "${findCam(which).name}", ${kind === 'port' ? 'màn dọc' : 'màn ngang'})` : ''}. Dán gửi để đặt làm mặc định.`);
        if (moved) { (camStore.set[which] ||= {})[kind] = cur; camSaveStore(); camCur = which; paintCams(); }   // máy này cũng giữ góc vừa chép
        if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, () => prompt('Sao chép chuỗi này:', txt)); else prompt('Sao chép chuỗi này:', txt);
      }
    });
    panel.querySelector('[data-cs="which"]').addEventListener('change', (e) => cam(e.target.value));
    cam('wide', true);
    paintModes();
    frame();

    const ro = new ResizeObserver(() => {
      const w = root.clientWidth, h = root.clientHeight; if (!w || !h) return;
      const was = camKind();
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); sharpSize();
      // xoay màn: dùng góc ngang / dọc tương ứng; góc "Màn hình câu hỏi" khớp lại theo khung mới
      if (camKind() !== was || findCam(camCur)?.fit) requestAnimationFrame(() => { if (!gone) cam(camCur, true); });
    });
    ro.observe(root);
    /* ---------- Ghế của người thật (flow) ----------
       seatPupil(ghế, nhân vật, của mình): đặt bạn ấy ngồi ghế đó (nhân vật -1: ghế trống); vòng vàng trên đầu đánh dấu ghế của mình.
       Mô hình chưa tải xong thì nhớ lại, tải xong mới đặt. */
    let pupilG = null;
    const seatWant = new Map(), seatById = new Map(seats.map(s => [s.id, s]));
    meRing = add(new THREE.TorusGeometry(0.26, 0.035, 8, 32).rotateX(Math.PI / 2), glow('#ffd36b', 2.6), 0, -50, 0);
    function applySeat(st) {
      const w = seatWant.get(st.id);
      if (!w) {
        if (st.kid) { st.sg.remove(st.kid); st.kid = null; st.pupil = null; st.kindNow = -1; }
        return;
      }
      if (st.kindNow === w.kind || !pupilG) return;
      const g = pupilG.get(PUPILS[w.kind]);
      if (!g) return;
      if (!st.kid) { st.kid = new THREE.Group(); st.kid.position.set(0, 0.25, 0.1); st.kid.rotation.y = Math.PI; st.sg.add(st.kid); }
      st.pupil = makePupil([PUPILS[w.kind], g], 1.25, false);
      swapKid(st.kid, st.pupil, 0, 0.17, 0.07);
      pupilPlay(st.pupil, 'sit', { once: true, end: true, fade: 0 });
      st.pupil.mixer.update(0);
      st.kindNow = w.kind;
    }
    function seatPupil(id, kind = -1, mine = false, name = '', skill = 'kha') {
      const st = seatById.get(id);
      if (!st) return;
      if (kind >= 0) seatWant.set(id, { kind }); else seatWant.delete(id);
      applySeat(st);
      // khán giả có điểm riêng: ghế có người thì hiện thẻ điểm + tên; đổi người thì điểm về 0
      st.live = kind >= 0; st.mine = mine && kind >= 0;
      if (st.live && name && name !== st.name) st.score = 0;   // người khác ngồi vào: điểm về 0 (đổi bộ đồ thì giữ)
      if (name) st.name = name;
      if (st.live && !st.name) st.name = 'Bạn';
      // 'real': bạn thật khác (flow.js): máy chủ trò không giả lập câu trả lời, chờ bạn ấy gửi ('xi' aud)
      st.real = skill === 'real';
      st.skill = st.real ? 'kha' : skill;
      st.dirty = true;
      if (meSeat && meSeat !== st) meSeat.dirty = true;
      if (mine && kind >= 0) meSeat = st; else if (meSeat === st) meSeat = null;
      if (meSeat) meRing.position.set(meSeat.sg.position.x, meSeat.sg.position.y + 1.62, meSeat.sg.position.z + 0.1);
      else meRing.position.y = -50;
    }
    /** Góc từ ghế (mặc định của khán giả): sau lưng, cao hơn đầu mình một chút, nhìn lên sân khấu. */
    function seatCam(id, now = false) {
      const st = seatById.get(id);
      if (!st) return;
      meRing.visible = false;   // nhìn từ ghế: vòng nằm sát ống kính, che màn hình
      const p = st.sg.position, v = { pos: [p.x * 0.92, p.y + 1.95, p.z + 1.35], target: [p.x * 0.35, 2.1, -3], fov: 52 };
      flyCam(v, now);
    }
    /* Bản mẫu (không qua flow.js): khán phòng đầy đủ bạn ảo của lớp trong hồ sơ, bục 2–4 là ba bạn MC mời lên, bục 1 là mình. */
    if (!flow) {
      const grade = getProfileGrade() >= 1 && getProfileGrade() <= 5 ? getProfileGrade() : 3;
      const seed = `demo-g${grade}:${Math.floor(Date.now() / 86400e3)}`;
      const audience = audienceAt({ grade, seed, frac: 1.01 });
      const got = podiumAt({ seed, frac: 1.01, reals: [{ name: 'Bạn', kind: (Math.random() * PUPILS.length) | 0, me: true }], audience, full: true });
      const up = new Set(got.picked.map(a => a.seat));
      audience.forEach(a => { if (!up.has(a.seat)) seatPupil(a.seat, a.npc.kind, false, a.npc.name, a.npc.skill); });
      setPods(got.pods);
    }
    const api = { setMode, cam, cert: (kind = 'champ') => giveCert({ kind, name: pods[0].name || 'Bạn', score: 240, rounds: { kd: 110, tt: 70, vd: 60 }, right: 30, total: 44, at: Date.now() }), seatPupil, seatCam, setPods, seatIds: SEAT_IDS, get mode() { return mode; }, onBack: null, onShowEnd: null,
      // thử tự động (scripts): xem bước đang chạy, chọn đáp án / bấm chuông thay người cầm máy
      seat: (id) => { const st = seatById.get(id); return st && { score: st.score, real: !!st.real, mine: !!st.mine, live: st.live }; },
      peek: () => ({ me: myPod, mySeat: meSeat?.id, mode, phase, wait: [mcArrive(), arena === null], cap: capEl.classList.contains('is-on') ? capEl.textContent : '', seg: sl?.seg, turn, buzzer, qn, qTotal, val: Q?.val, a: Q?.a, kind: Q?.kind, tag: Q?.tag, fig: !!Q?.fig, star: vd?.star,
        pods: pods.map(p => [p.state, p.score]), aud: seats.filter(x => x.live).slice(0, 4).map(x => [x.name, x.score]) }),
      mcHome: () => mcs.forEach(m => { if (m.home) { m.fig.position.copy(m.home); m.fig.rotation.y = m.homeH; m.at = 'home'; m.go = null; } }),
      jump: (k) => { si = k; },
      scores: (list) => list.forEach((v, i) => { pods[i].score = pods[i].shown = v; }),   // thử Trao giải với điểm cho sẵn
      // dựng tay từng bước bục vinh danh (máy chạy không đầu quá chậm để chờ MC đọc): freeze dừng chuỗi lời MC của vòng
      award: { freeze: () => { run++; clearLater(); mcStop(); }, show: (on) => showAward(on), stand: (i, r) => standOn(pods[i], r, podStars(r, pods[i].score)),
        cam: (r) => { flyCam(r < 0 ? awardWide() : awardClose(r), true); camCur = 'award'; }, rain: (on) => { rainOn = on; },
        collect: (n = 71) => collectStars({ n, total0: 1240, badge: '🥈', title: 'Á quân', lines: ['Giải hạng 2: 35 sao', `180 điểm: thêm ${n - 35} sao`] }),
        aud: (t4Score, t4Stars, top, me) => audStarsRule(t4Score, t4Stars, top)(me) },
      pick: (i) => onPick(i), bell: () => doBuzz(), pkg: (k) => doPkg(k), star: (on) => doStar(on),
      /* chương trình chung (flow.js): multi({ host, myId, net }) đặt / đổi vai; snap / fx / input: tin từ máy chủ phòng;
         onPods: (máy hiện theo) bục theo máy chủ trò đổi, flow.js cập nhật ghế trống và góc nhìn của mình */
      multi: (o) => {
        const was = sync;
        sync = o ? { host: !!o.host, myId: o.myId || 0, net: o.net } : null;
        snapKey = '';
        if (!sync) return;
        if (sync.host && was && !was.host && mode !== 'idle') resume();   // nhận quyền chủ trò giữa chương trình
        else if (!sync.host) { sentNv = null; if (!was || was.host) { run++; clearLater(); } if (lastSnap) applySnap(lastSnap); }   // chủ trò mới: báo lại 'nv'
      },
      get host() { return hosting(); },
      /** Bạn thật trên bục rời phòng giữa chương trình: máy chủ trò chơi thay bạn ấy như bạn ảo (mức khá), bục không đứng im. */
      podGone: (id) => { readers.delete(id); pods.forEach(p => { if (!p.me && p.rid === id) { p.rid = 0; p.skill = p.skill || 'kha'; } }); },
      snap: (o) => applySnap(o), fx: (name, args = []) => { if (following() && FX[name]) FX[name](...args); }, input: (from, type, a) => input(from, type, a),
      onPods: null };
    window.__arena = api;

    const canvas = renderer.domElement;
    root.insertBefore(canvas, root.firstChild); // cảnh nằm dưới các nút
    const dispose = () => {
      if (gone) return;
      gone = true;
      cancelAnimationFrame(raf); clearInterval(elapsedTm);
      clearLater(); run++;
      mcStop(); setMcListener(null);
      SFX.stopAll();
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
      sharpRT.dispose(); sharpMat.dispose(); sharpQuad.geometry.dispose();
      renderer.dispose();
      renderer.forceContextLoss?.();
      canvas.remove();
      if (window.__arena) delete window.__arena;
    };
    return { dispose, api };
  }
}
