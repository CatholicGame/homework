/**
 * 🧮 Luyện Tính (lớp 2): luyện các phép tính trẻ cần nắm vững, làm theo đúng cách học ở lớp (Toán 2 Kết nối tri thức).
 * Cùng khung với Luyện Tính lớp 3 (grade3Drills.js): hub và vòng chơi chung của trò chơi tăng cường, cảnh lớp học,
 * tờ vở ô li, bàn phím số (grade3Drills/kit.js). Sao ghi vào lớp 2 (tiền tố 'drill2'), cấp ghi "Bài …" theo Vở BT Toán 2.
 *   🔟 Làm tròn 10 (grade2Drills/tenframe.js) · ⚡ 🔢 🧠 bốn dòng phép tính (grade2Drills/facts.js)
 *   ✍️ Đặt tính: dùng lại công cụ đặt tính lớp 3 với số lớp 2 · 📏 Bài toán có lời văn: dùng lại sơ đồ đoạn thẳng lớp 3.
 */

import { renderGamesHub } from './grade3Games.js';
import { COLUMN_GAME, columnSteps } from './grade3Drills/column.js';
import { SEGMENT_GAME, makeProblem } from './grade3Drills/segment.js';
import { how } from './grade3Drills/kit.js';
import { TEN_GAME } from './grade2Drills/tenframe.js';
import { ADD_GAME, TAB_GAME, MEN_GAME } from './grade2Drills/facts.js';
import { TIME2_GAME, CAL2_GAME } from './grade3Drills/time.js';
import { SHARK2_GAME } from './grade3Drills/shark.js';

// ── ✍️ Đặt tính rồi tính ──────────────────────────────────────────────────────────────────────────────
const carries = (op, a, b) => columnSteps(op, a, b).filter(s => s.kind === 'carry').length;
const len = (n) => String(n).length;

/** Một phép cộng / trừ có số chữ số và số lần nhớ cho trước. Kết quả phép trừ cùng số chữ số với số bị trừ (không có 0 ở đầu). */
function makeCol(rng, op, [aLo, aHi], [bLo, bHi], { carry, max = 999 }) {
  for (;;) {
    const a = rng.int(aLo, aHi), b = rng.int(bLo, bHi);
    if (op === '+' ? a + b > max : b >= a || len(a - b) !== len(a)) continue;
    const c = carries(op, a, b);
    if (carry ? c === 1 : c === 0) return { op, a, b };
  }
}

export const COL_LEVELS = [
  {
    id: 'd2-col-1', n: 1, title: 'Cộng, trừ không nhớ', missions: 6,
    desc: 'Đặt tính rồi tính trong phạm vi 100, vd. 43 + 25, 68 − 32.',
    knowledge: 'cộng, trừ trong phạm vi 10, chục và đơn vị', lessons: { g2: ['bai-5'] },
    ask: () => 'Viết các chữ số thẳng cột rồi tính từ hàng đơn vị!',
    gen: (rng, k) => (k % 2 ? makeCol(rng, '-', [25, 99], [k % 4 === 1 ? 2 : 11, 89], { carry: false })
      : makeCol(rng, '+', [11, 87], [k % 4 === 2 ? 2 : 11, 88], { carry: false, max: 99 })),
  },
  {
    id: 'd2-col-2', n: 2, title: 'Cộng có nhớ', missions: 5,
    desc: 'Phạm vi 100, vd. 36 + 7, 48 + 25.',
    knowledge: 'bảng cộng qua 10', lessons: { g2: ['bai-19', 'bai-20', 'bai-21'] },
    ask: () => 'Cộng hàng đơn vị, được từ 10 trở lên thì nhớ 1 sang hàng chục!',
    gen: (rng, k) => makeCol(rng, '+', [12, 89], k % 2 ? [12, 79] : [3, 9], { carry: true, max: 100 }),
  },
  {
    id: 'd2-col-3', n: 3, title: 'Trừ có nhớ', missions: 5,
    desc: 'Phạm vi 100, vd. 52 − 7, 71 − 36.',
    knowledge: 'bảng trừ qua 10', lessons: { g2: ['bai-22', 'bai-23', 'bai-24'] },
    ask: () => 'Không trừ được thì lấy thêm 1 chục, rồi nhớ 1 sang hàng chục!',
    gen: (rng, k) => makeCol(rng, '-', [21, 99], k % 2 ? [12, 79] : [3, 9], { carry: true }),
  },
  {
    id: 'd2-col-4', n: 4, title: 'Cộng trong phạm vi 1 000', missions: 6,
    desc: 'Không nhớ và có nhớ, vd. 352 + 214, 456 + 127.',
    knowledge: 'số có ba chữ số, cộng có nhớ', lessons: { g2: ['bai-59', 'bai-60'] },
    ask: () => 'Thẳng cột trăm, chục, đơn vị. Tính từ phải sang trái!',
    gen: (rng, k) => makeCol(rng, '+', [101, 879], k % 3 === 2 ? [12, 98] : [101, 799], { carry: k % 2 === 1 }),
  },
  {
    id: 'd2-col-5', n: 5, title: 'Trừ trong phạm vi 1 000', missions: 6,
    desc: 'Không nhớ và có nhớ, vd. 785 − 342, 652 − 218.',
    knowledge: 'số có ba chữ số, trừ có nhớ', lessons: { g2: ['bai-61', 'bai-62'] },
    ask: () => 'Trừ từ hàng đơn vị. Không trừ được thì lấy thêm 1 chục!',
    gen: (rng, k) => makeCol(rng, '-', [210, 999], k % 3 === 2 ? [12, 98] : [101, 799], { carry: k % 2 === 1 }),
  },
];

export const COL_GAME = {
  ...COLUMN_GAME, id: 'd2-col', title: 'Đặt tính: cộng, trừ', starPrefix: 'drill2', levels: COL_LEVELS,
  purpose: 'Giúp em đặt tính rồi tính như trong vở: viết các chữ số thẳng cột, tính từ hàng đơn vị, nhớ đúng số nhớ.',
};

// ── 📏 Bài toán có lời văn ────────────────────────────────────────────────────────────────────────────
const SEG = (id, n, title, desc, knowledge, lessons, kinds, ask, big = false) => ({
  id, n, title, desc, knowledge, lessons: { g2: lessons }, missions: kinds.length > 2 ? 5 : 4, ask: () => ask,
  gen: (rng, k) => makeProblem(rng, kinds[k % kinds.length], { g2: true, big }),
});

export const WORD_LEVELS = [
  SEG('d2-seg-1', 1, 'Thêm, bớt', 'Mai có 8 viên bi, Lan cho thêm 5 viên. Mai có tất cả bao nhiêu viên bi?', 'cộng, trừ qua 10', ['bai-9'], ['them', 'bot'], 'Được thêm thì cộng, cho đi thì trừ!'),
  SEG('d2-seg-2', 2, 'Nhiều hơn, ít hơn', 'Mai có 9 bông hoa, Lan có nhiều hơn Mai 4 bông.', 'cộng, trừ qua 10', ['bai-13'], ['hon', 'kem'], 'Nhiều hơn thì cộng, ít hơn thì trừ!'),
  SEG('d2-seg-3', 3, 'Hơn, kém nhau bao nhiêu', 'Mai có 15 quyển vở, Lan có 8 quyển. Mai có nhiều hơn Lan bao nhiêu quyển?', 'phép trừ', ['bai-4'], ['hk'], 'Hơn nhau bao nhiêu thì lấy số lớn trừ số bé!'),
  SEG('d2-seg-4', 4, 'Trộn, số có nhớ', 'Trộn các dạng toán với số đến 100, có nhớ.', 'cộng, trừ có nhớ trong phạm vi 100', ['bai-21', 'bai-24'], ['them', 'kem', 'hk', 'hon', 'bot'], 'Đọc kĩ đề: thêm hay bớt, nhiều hơn hay ít hơn?', true),
];

export const WORD_GAME = {
  ...SEGMENT_GAME, id: 'd2-seg', title: 'Bài toán có lời văn', starPrefix: 'drill2', levels: WORD_LEVELS,
  purpose: 'Giúp em giải bài toán thêm, bớt, nhiều hơn, ít hơn, hơn kém nhau bao nhiêu: đọc đề, nhìn sơ đồ, chọn đúng phép cộng hay phép trừ rồi tính.',
  howTo: how(['📖', 'Đọc đề'], ['📏', 'Nhìn sơ đồ'], ['➕', 'Cộng hay trừ?'], ['⌨️', 'Tính']),
};

// ── Hub ───────────────────────────────────────────────────────────────────────────────────────────────
const tool = (id, game, desc, tags) => ({ id, icon: game.icon, title: game.title, desc, tags, single: true, stalls: [{ game }] });

export const DRILL2_LIST = [
  tool('ten', TEN_GAME, 'Cộng, trừ qua 10 bằng cách làm tròn 10 với khung 10 chấm.', ['Cộng qua 10', 'Trừ qua 10', 'Tách số']),
  tool('add', ADD_GAME, 'Luyện cho thuộc. Phép nào hay sai sẽ được ra lại nhiều hơn.', ['Bảng cộng', 'Bảng trừ', 'Số còn thiếu']),
  tool('shark', SHARK2_GAME, 'Cá mập mang phép tính bơi tới: gõ đúng kết quả để bắn trúng, tính chậm là bị đớp!', ['Cộng, trừ qua 10', 'Nhân, chia 2, 5', 'Tính nhanh']),
  tool('col', COL_GAME, 'Viết thẳng cột, tính từ hàng đơn vị, nhớ đúng số nhớ.', ['Có nhớ', 'Phạm vi 100', 'Phạm vi 1 000']),
  tool('tab', TAB_GAME, 'Thuộc bảng nhân, bảng chia 2 và 5.', ['Bảng nhân 2, 5', 'Bảng chia 2, 5']),
  tool('men', MEN_GAME, '30 + 50: 3 chục cộng 5 chục bằng 8 chục.', ['Tròn chục', 'Tròn trăm', 'Không nhớ']),
  tool('word', WORD_GAME, 'Đọc đề, nhìn sơ đồ, chọn phép cộng hay phép trừ.', ['Thêm, bớt', 'Nhiều hơn, ít hơn', 'Hơn kém']),
  tool('time', TIME2_GAME, 'Xem giờ, đổi giờ chiều tối, tính giờ bắt đầu, giờ xong.', ['Xem giờ', 'Chỉnh kim', 'Giờ chiều, tối', 'Tính giờ']),
  tool('cal', CAL2_GAME, 'Ngày ... là thứ mấy, tuần sau, còn mấy ngày nữa.', ['Xem lịch', 'Ngày, thứ', 'Đếm ngày']),
];

export function render(app, onBack) {
  renderGamesHub(app, {
    // Cấp ghi "Bài 19…" theo Vở bài tập Toán 2 (mã bài liên tục qua Tập Một, Tập Hai); không mở bài từ đây.
    book: 'g2', units: [], unitName: (u) => `Bài ${u.number}`, storageKey: 'g2w-progress-v1',
    openUnit() {}, onBack,
  }, null, {
    games: DRILL2_LIST, kicker: '🧮 Toán 2', title: 'Luyện Tính', icon: '🧮', unitFocus: null,
    lead: 'Luyện phép tính theo cách học ở lớp. Mỗi lượt là số mới!',
    levelLead: 'Chọn cấp. Cấp nào cũng làm được!',
  });
}
