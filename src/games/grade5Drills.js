/**
 * 🧮 Luyện Tính (lớp 5): đặt tính số thập phân, nhân chia nhẩm, phân số, đổi đơn vị. Thiết kế: docs/lop_5/thiet-ke-cong-cu-tap1.md §3.
 * Cùng khung với Luyện Tính lớp 2, 3, 4 (hub và vòng chơi chung, grade3Drills/kit.js); sao lớp 5 (tiền tố 'drill5').
 *   ➕ Cộng, trừ số thập phân; ✖️ Nhân số thập phân (grade5Drills/dcol.js)
 *   ➗ Chia số thập phân (grade5Drills/ddiv.js)
 *   🔀 Nhân chia nhẩm, 🪜 Đổi đơn vị, 🍫 Phân số: các dạng câu Thực hành của Toán 5 Học bằng công cụ, ghép thành cấp.
 */

import { renderGamesHub } from './grade3Games.js';
import { DADD_GAME, DMUL_GAME } from './grade5Drills/dcol.js';
import { DDIV_GAME } from './grade5Drills/ddiv.js';
import { SHARK5_GAME } from './grade3Drills/shark.js';
import { UFO5_GAME } from './grade3Drills/ufo.js';
import { practiceGame } from './grade4Tools/practice.js';
import { how, TEACHER } from './grade3Drills/kit.js';
import { BOOK5 } from './grade5Tools.js';
import { SHIFT_DRILL_TASKS, UNIT_DRILL_TASKS } from './grade5Tools/lessons/units.js';
import { FRACTION_DRILL_LEVELS } from './grade5Tools/lessons/fractions.js';

/**
 * Trò Luyện Tính từ các dạng câu Thực hành (task của grade5Tools/lessons): mỗi cấp là một nhóm task, chạy bằng
 * practiceGame (thầy, tờ giấy, bàn phím có dấu phẩy). Cấp: { id, n, title, desc, knowledge, sgk: số Bài, tasks }.
 */
function taskDrill({ id, icon, title, purpose, howTo, levels }) {
  const book = { ...BOOK5, starPrefix: 'drill5', idPrefix: 'd5' };
  const inner = new Map(levels.map(lv => [lv.id, practiceGame({ id: lv.id, n: lv.sgk }, lv.tasks, book)]));
  const first = inner.get(levels[0].id);
  return {
    id, icon, title, purpose, unitWord: 'câu', starPrefix: 'drill5', npcs: [TEACHER],
    stallIcon: () => icon,
    summaryText: first.summaryText, againText: 'Làm lượt mới',
    howTo: () => howTo,
    levels: levels.map(({ tasks, sgk, ...lv }) => ({ missions: 5, lessons: { sgk5: [`bai-${sgk}`] }, ask: () => lv.say, ...lv })),
    makeMission(rng, level, history) { return inner.get(level.id).makeMission(rng, level, history); },
    mountMission(stage, m, level, api) { inner.get(level.id).mountMission(stage, m, level, api); },
  };
}


export const SHIFT_GAME = taskDrill({
  id: 'd5-shift', icon: '🔀', title: 'Nhân, chia nhẩm với 10; 0,1…',
  purpose: 'Giúp em nhân, chia nhẩm số thập phân với 10, 100, 1 000 và 0,1; 0,01; 0,001 bằng cách chuyển dấu phẩy.',
  howTo: how(['🔢', 'Đếm chữ số 0'], ['🔀', 'Chuyển dấu phẩy'], ['0️⃣', 'Thiếu thì thêm 0'], ['✅', 'Đúng hết']),
  levels: [
    { id: 'd5-shift-1', n: 1, title: 'Trộn nhân, chia nhẩm', desc: 'Vd. 27,86 × 10; 0,3 : 10; 36,5 : 0,1; 53,28 × 1 000.', knowledge: 'chuyển dấu phẩy sang phải, sang trái', sgk: 23,
      say: 'Nhân với 10, 100 thì dấu phẩy sang phải. Nhân với 0,1 thì sang trái!', tasks: SHIFT_DRILL_TASKS },
  ],
});

export const UNIT_GAME = taskDrill({
  id: 'd5-unit', icon: '🪜', title: 'Đổi đơn vị đo',
  purpose: 'Giúp em viết số đo độ dài, khối lượng, diện tích dưới dạng số thập phân, nhớ chữ số 0 giữ chỗ.',
  howTo: how(['🪜', 'Bảng đơn vị'], ['0️⃣', 'Ô trống viết 0'], ['🔴', 'Đặt dấu phẩy'], ['✅', 'Đúng hết']),
  levels: [
    { id: 'd5-unit-1', n: 1, title: 'Độ dài, khối lượng, diện tích', desc: 'Vd. 3 m 8 cm = 3,08 m; 8 kg 75 g = 8,075 kg; 3 m² 6 dm² = 3,06 m².', knowledge: 'bảng đơn vị đo, số thập phân', sgk: 12,
      say: 'Ô nào không có chữ số thì viết 0 giữ chỗ!', tasks: UNIT_DRILL_TASKS },
  ],
});

export const FRACTION_GAME = taskDrill({
  id: 'd5-frac', icon: '🍫', title: 'Phân số, hỗn số',
  purpose: 'Giúp em quy đồng, cộng trừ phân số khác mẫu số, nhân chia phân số, đổi hỗn số và phân số.',
  howTo: how(['🍫', 'Quy đồng'], ['➕', 'Tính'], ['✂️', 'Rút gọn'], ['✅', 'Đúng hết']),
  levels: [
    { id: 'd5-frac-1', n: 1, title: 'Quy đồng, cộng trừ khác mẫu', desc: 'Vd. 1/5 + 1/2; 2/5 − 1/4; 3 − 11/8.', knowledge: 'quy đồng mẫu số, rút gọn phân số', sgk: 6,
      say: 'Khác mẫu số thì quy đồng trước rồi mới cộng, trừ!', tasks: FRACTION_DRILL_LEVELS[0].tasks },
    { id: 'd5-frac-2', n: 2, title: 'Nhân, chia phân số', desc: 'Vd. 2/3 × 4/5; 3/4 : 2/5; 3/4 của 20.', knowledge: 'nhân, chia phân số', sgk: 5,
      say: 'Chia cho một phân số là nhân với phân số đảo ngược!', tasks: FRACTION_DRILL_LEVELS[1].tasks },
    { id: 'd5-frac-3', n: 3, title: 'Hỗn số và phân số', desc: 'Vd. 2 7/10 = 27/10; 31/10 = 3 1/10.', knowledge: 'hỗn số, phân số thập phân', sgk: 7,
      say: 'Hỗn số có phần nguyên và phần phân số bé hơn 1!', tasks: FRACTION_DRILL_LEVELS[2].tasks },
  ],
});

// ── Hub ───────────────────────────────────────────────────────────────────────────────────────────────
const tool = (id, game, desc, tags) => ({ id, icon: game.icon, title: game.title, desc, tags, single: true, stalls: [{ game }] });

export const DRILL5_LIST = [
  tool('shark', SHARK5_GAME, 'Cá mập mang phép tính bơi tới: tính nhẩm số tới ba chữ số, gõ đúng kết quả để bắn trúng!', ['Bảng nhân chia', 'Số tròn chục, tròn trăm', 'Tính nhanh']),
  tool('ufo', UFO5_GAME, 'Đĩa bay mang ổ khoá có số bị giấu: chọn đúng viên đạn, số thay vào ổ khoá là thấy đúng sai!', ['Số thập phân', 'Công thức']),
  tool('add', DADD_GAME, 'Cộng, trừ số thập phân: các dấu phẩy thẳng cột, viết dấu phẩy ở kết quả.', ['Thẳng dấu phẩy', 'Thêm chữ số 0', 'Với số tự nhiên']),
  tool('mul', DMUL_GAME, 'Nhân như số tự nhiên, đếm chữ số thập phân của hai thừa số rồi đặt dấu phẩy ở tích.', ['Đếm chữ số thập phân', 'Tích riêng']),
  tool('div', DDIV_GAME, 'Chia số thập phân: viết dấu phẩy ở thương, thêm 0 vào số dư, chia cho số thập phân.', ['Dấu phẩy ở thương', 'Thương có chữ số 0', 'Chia cho số thập phân']),
  tool('shift', SHIFT_GAME, 'Nhân, chia nhẩm với 10; 100; 1 000 và 0,1; 0,01; 0,001.', ['Chuyển dấu phẩy']),
  tool('unit', UNIT_GAME, 'Viết số đo độ dài, khối lượng, diện tích dưới dạng số thập phân.', ['Chữ số 0 giữ chỗ']),
  tool('frac', FRACTION_GAME, 'Cộng, trừ phân số khác mẫu số, nhân, chia phân số, hỗn số.', ['Quy đồng', 'Hỗn số']),
];

export function render(app, onBack) {
  renderGamesHub(app, {
    // Cấp ghi "Bài 19…" theo SGK Toán 5 Tập Một; không mở bài từ đây.
    book: 'sgk5', units: [], unitName: (u) => `Bài ${u.number}`, storageKey: 'g5-drill-none',
    openUnit() {}, onBack,
  }, null, {
    games: DRILL5_LIST, kicker: '🧮 Toán 5', title: 'Luyện Tính', icon: '🧮', unitFocus: null,
    lead: 'Luyện tính với số thập phân và phân số. Mỗi lượt là số mới!',
    levelLead: 'Chọn cấp. Cấp nào cũng làm được!',
  });
}
