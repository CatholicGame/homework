/**
 * 🃏 Thẻ chữ cái — Tiền tiểu học. Nguồn: docs/pre_1/Flashcard 29 chữ.pdf (29 thẻ, mỗi trang 3 thẻ:
 * chữ hoa + chữ thường, một hình và tên hình, chữ của thẻ tô đỏ trong tên). Hình vẽ lại riêng (flash/art*.js).
 * Mỗi trang sách là một trạm; hết mỗi phần có trạm ôn tập. Dạng lượt chơi ở play6.js:
 *   flash  — lật từng thẻ: mặt chữ, mặt hình, nghe đọc
 *   spot   — tìm chữ của thẻ trong tên hình (chạm từng con chữ)
 *   pair   — ghép chữ với hình của thẻ
 *   which  — nghe tên chữ, chọn hình của thẻ chữ đó
 * và lượt 'find' của engine (nghe đọc, chạm đúng chữ).
 * Tên đọc là âm (bờ, cờ…) như sách Làm quen chữ cái (data3.js).
 */

import { PLAYERS6 } from './play6.js';
import { CARDS } from './flash/cards.js';

const card = (ch) => CARDS.find(c => c.ch === ch);
const cards = (s) => s.split(' ').map(card);
// Màu chữ cho lượt 'find' (ô chữ của engine).
const TILE_COLORS = ['#E11D48', '#1D6FB8', '#16A34A', '#7E22CE', '#EA580C', '#0891B2'];
const tiles = (list) => list.map((c, k) => ({ ch: c.ch, name: c.name, color: TILE_COLORS[k % TILE_COLORS.length] }));

/** Trạm một trang sách: lật thẻ → tìm chữ trong tên từng hình → ghép chữ với hình. */
const page = (id, icon, color, letters, part, extra = '') => {
  const list = cards(letters);
  const pairList = extra ? [...cards(extra), ...list] : list;
  return {
    id, icon, color, part,
    title: list.map(c => c.ch).join(' '),
    name: `Thẻ chữ ${list.map(c => c.ch).join(', ')}`,
    rounds: [
      { type: 'flash', cards: list },
      ...list.map(c => ({ type: 'spot', card: c })),
      { type: 'pair', cards: pairList },
    ],
  };
};

/** Trạm ôn tập: nghe chọn chữ → chọn hình của thẻ → ghép chữ với hình. */
const review = (id, icon, color, part, name, find, which, pairs) => ({
  id, icon, color, part, name,
  title: 'Ôn tập',
  rounds: [
    { type: 'find', items: tiles(cards(find)), kind: 'chữ' },
    ...which.map(([ch, others]) => ({ type: 'which', card: card(ch), others: cards(others) })),
    ...pairs.map(p => ({ type: 'pair', cards: cards(p) })),
  ],
});

export const BOOK6 = {
  key: 'pre6',
  title: 'Thẻ chữ cái',
  subtitle: 'Tiền tiểu học · 29 thẻ chữ cái tiếng Việt',
  players: PLAYERS6,
  stations: [
    page('the-a', '🐊', '#16A34A', 'a ă â', 1),
    page('the-b', '🐄', '#B45309', 'b c d', 1),
    page('the-d', '👶', '#EC4899', 'đ e ê', 1),
    page('the-g', '🐔', '#DC2626', 'g h i', 1),
    review('on-1', '⭐', '#0EA5E9', 1, 'Ôn tập thẻ chữ a đến i', 'a ă â b c đ e g', [['â', 'a ă'], ['d', 'b đ'], ['ê', 'e i'], ['h', 'g k']], ['a ă â e', 'b c d đ', 'ê g h i']),
    page('the-k', '🐷', '#F472B6', 'k l m', 2),
    page('the-n', '🐝', '#F59E0B', 'n o ô', 2),
    page('the-p', '🥑', '#65A30D', 'ơ p q', 2),
    review('on-2', '⭐', '#7C3AED', 2, 'Ôn tập thẻ chữ k đến q', 'k l m n o ô ơ q', [['ô', 'o ơ'], ['l', 'k m'], ['q', 'p n'], ['ơ', 'ô o']], ['k l m n', 'o ô ơ p', 'q k n ô']),
    page('the-r', '🐢', '#059669', 'r s t', 3),
    page('the-u', '🐘', '#64748B', 'u ư v', 3),
    page('the-x', '🚲', '#2563EB', 'x y', 3, 'v'),
    review('on-3', '⭐', '#EA580C', 3, 'Ôn tập thẻ chữ r đến y', 'r s t u ư v x y', [['ư', 'u v'], ['s', 'r t'], ['y', 'x u'], ['r', 's ư']], ['r s t u', 'ư v x y', 't u x y']),
    review('on-tat-ca', '🏆', '#E11D48', 4, 'Ôn tập cả 29 thẻ chữ', 'a đ g m ô q u y', [['ă', 'â a'], ['ơ', 'ô o'], ['ư', 'u ơ'], ['đ', 'd b']], ['a e i o', 'b d đ p', 'm n u ư', 'h k l t']),
  ],
  parts: [
    { num: 1, title: 'Phần 1: Thẻ chữ a đến i' },
    { num: 2, title: 'Phần 2: Thẻ chữ k đến q' },
    { num: 3, title: 'Phần 3: Thẻ chữ r đến y' },
    { num: 4, title: 'Phần 4: Ôn tập cả 29 thẻ' },
  ],
};
