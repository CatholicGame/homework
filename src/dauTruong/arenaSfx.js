/**
 * Âm thanh của Đấu Trường Nhí (docs/dau-truong/sfx.md). Dùng chung kho tiếng của 🎤 Ai tài năng nhất (src/thanDong/SFX, phát qua
 * church/quizSfx.js): chỉ 3 tiếng là của riêng chương trình này (NEW). Tiếng mới chưa có file thì phát tiếng thay trong kho, không im.
 * Ba kênh nền dùng lại của quizSfx: 'music' (nhạc hiệu, nhạc chờ), 'crowd' (khán phòng rì rầm), 'think' (nhạc suy nghĩ của vòng).
 */
import { quizSfx as S } from '../thanDong/church/quizSfx.js';

/** Tiếng riêng của Đấu Trường Nhí, nằm cùng kho src/thanDong/SFX/<nhóm>/ (Ai tài năng nhất dùng được luôn). */
export const NEW = {
  'lobby-loop': 'mo-man',      // nhạc chờ sảnh, giải lao, giữa giờ (lặp)
  'score-tally': 'ket-qua',    // điểm chạy số
  'pod-bell': 'chot-dap-an',   // chuông bục, phát 4 cao độ
};

/** Nhạc suy nghĩ theo vòng; Về đích theo mức thí sinh chọn (1 Dễ, 2 Vừa, 3 Khó). */
const THINK = { sel: 'think-bed-easy', khoidong: 'think-bed-easy', tangtoc: 'poll-bed', vedich: ['think-bed-easy', 'think-bed-mid', 'think-bed-hard'] };
/** Tiếng hiệu vào vòng. */
const ROUND = { sel: 'welcome-sting', khoidong: 'q-sting-easy', tangtoc: 'q-sting-mid', vedich: 'q-sting-final', tie: 'welcome-sting' };
/** Chuông 4 bục (đỏ, cam, xanh lá, xanh dương): cùng một tiếng, cao dần. */
const BELL_RATE = [0.9, 1, 1.12, 1.25];

let thinking = null;   // vòng đang có nhạc suy nghĩ (để tăng tốc nhạc Tăng tốc)

export const arenaSfx = {
  preload() { S.preload(); },
  stopAll() { thinking = null; S.stopAll(); },

  // ---- sảnh, mở màn
  /** Sảnh chờ / giải lao: nhạc chờ nhỏ + khán phòng rì rầm. */
  lobby(on = true) {
    S.bed('music', on && S.has('lobby-loop') ? 'lobby-loop' : null, { lv: 0.18, fade: 1.5 });
    S.crowd(on);
  },
  /** Mở màn (kich-ban-mc §4.2, sfx.md §3): tắt nền, lặng 0,8 s, nhạc hiệu (tự lùi dưới lời MC), vỗ tay nhỏ trộn dưới. */
  intro() {
    S.bed('music', null, { out: 0.6 }); S.crowd(false); S.bed('think', null);
    setTimeout(() => { S.intro(); S.raw('applause-rhythmic', { lv: 0.25, at: 2 }); }, 800);
  },
  outro() { S.outro(); },

  // ---- vòng
  /** Vào vòng: tiếng hiệu riêng, khán phòng im, tắt nhạc của bước trước. */
  round(key) {
    S.crowd(false); S.bed('music', null, { out: 0.6 }); S.bed('think', null, { out: 0.4 });
    S.raw(ROUND[key] || 'welcome-sting', { lv: 0.75 });
  },
  /** Một bạn được mời lên bục: nhạc đi lên + đèn quét; tới bục thì đèn rọi. */
  walkup() { S.walkup(); },
  podium() { S.spotlight(); },

  // ---- một câu
  /** Ô câu hỏi mở trên màn LED. */
  open() { S.raw('q-box-open', { lv: 0.5 }); },
  /** Phương án thứ i bật lên (cao dần). */
  option(i) { S.pop(i); },
  /** "Thời gian bắt đầu!": tiếng mở trả lời, nhạc suy nghĩ của vòng (Về đích theo mức). */
  go(key, level = 1) {
    S.raw('poll-start', { lv: 0.5 });
    const t = THINK[key];
    const name = Array.isArray(t) ? t[Math.max(0, Math.min(2, level - 1))] : t || 'think-bed-easy';
    thinking = key;
    S.bed('think', name, { lv: 0.22, fade: 0.5, at: 0.4 });
  },
  /** Tăng tốc: nhạc nhanh dần theo đồng hồ (frac 0 → 1). */
  hurry(frac) {
    if (thinking !== 'tangtoc') return;
    const h = S.bed('think', 'poll-bed');
    if (h?.src) h.src.playbackRate.value = 1 + 0.15 * Math.max(0, Math.min(1, frac));
  },
  /** Một bạn chốt: tiếng khoá ngắn, cao hơn bản ghế nóng cho gọn. */
  lock() { S.raw('lock-in', { lv: 0.4, rate: 1.2 }); },
  /** Mỗi giây trong 5 giây cuối; urgent = 3 giây cuối. */
  tick(urgent) { S.tick(urgent); },
  /** Đủ 4 bạn chốt / hết giờ: tắt nhạc suy nghĩ; hết giờ có tiếng báo. */
  stop(timeUp = false) {
    thinking = null;
    S.bed('think', null, { out: 0.25 });
    if (timeUp) S.raw('time-up', { lv: 0.45 });
  },
  /** Trống dồn trước khi lật (giây). */
  drum(sec = 1.5) { return S.raw('suspense-drumroll', { lv: 0.55, len: sec }); },

  // ---- lật
  /** Kết quả câu: có bạn đúng → kèn đúng + vỗ tay; không ai đúng → khán phòng "ồ" nhỏ. */
  result(anyRight) {
    if (anyRight) { S.raw('right', { lv: 0.75 }); S.raw('applause-short', { lv: 0.5, at: 0.5 }); }
    else S.raw('wrong-crowd-aww', { lv: 0.4 });
  },
  /** Kết quả riêng trên máy mình (khán giả, thí sinh): sai thì nốt buồn rất nhỏ. */
  mine(right) { if (!right) S.raw('wrong', { lv: 0.25 }); },
  /** Tăng tốc: thanh thời gian thứ k (0..3) bay vào; sai thì trầm và nhỏ. */
  ting(k, right = true) { S.raw('option-pop', { lv: right ? 0.55 : 0.25, rate: right ? [1, 1.12, 1.25, 1.4][k] || 1 : 0.8 }); },
  /** Điểm chạy số. */
  points() {
    if (S.has('score-tally')) S.raw('score-tally', { lv: 0.45 });
    else [0, 0.09, 0.18, 0.27, 0.36].forEach((at, i) => S.raw('option-pop', { lv: 0.18, at, rate: 1.5 + i * 0.08 }));
  },

  // ---- Về đích
  /** Đèn rọi chuyển sang bục người đang thi. */
  spot() { S.hotSeat(); },
  /** Chạm chọn mức 1..3. */
  level(n) { S.raw('ui-confirm', { lv: 0.5, rate: [1, 1.1, 1.2][n - 1] || 1 }); },
  /** Thẻ Nhân đôi. */
  double() { S.help(); },
  /** Thẻ ×2 chưa đúng: điểm trừ. */
  minus() { S.raw('lights-down', { lv: 0.35 }); },
  /** Chuông của bục i. */
  bell(i) {
    const rate = BELL_RATE[i] || 1;
    if (S.has('pod-bell')) S.raw('pod-bell', { lv: 0.7, rate });
    else S.ding(rate, 0.55);   // chưa có file: chuông bàn tổng hợp, mỗi bục một cao độ
  },
  /** Mở chuông giành quyền: bốn chuông lướt nhanh từ thấp lên cao. */
  bellOpen() { [0, 1, 2, 3].forEach(i => setTimeout(() => arenaSfx.bell(i), i * 90)); },

  // ---- trao giải
  /** Khán phòng vỗ tay sau mỗi đợt thi (lượt cá nhân, lượt chung, hết vòng). */
  clap() { S.raw('applause-short', { lv: 0.45 }); },
  rank() { S.raw('welcome-sting', { lv: 0.6 }); S.raw('applause-short', { lv: 0.4, at: 0.8 }); },
  /** Người thắng: kèn chiến thắng, pháo giấy, khán phòng reo, vỗ tay dài. */
  champ() { S.crowd(false); S.bed('music', null, { out: 0.6 }); S.bed('think', null); S.win(); },
  /** Ghế 3 khán giả xuất sắc sáng vàng. */
  seatGold() { S.help(); },

  // ---- sự cố
  lost() { S.deny(); },
  back() { S.spotlight(); },
  click() { S.click(); },
};
