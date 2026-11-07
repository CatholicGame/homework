/**
 * Túi đồ của người chơi Gặp gỡ online: Hạt giống, món đã có, sổ hành hương (con dấu + thẻ thánh), bộ đồ đang mặc.
 * Lưu trong tệp tiến trình (engine/progress.js `bag`, cùng lên Google Drive), mọi phần gộp được giữa hai máy.
 *
 * Hạt giống là của cả ứng dụng (src/engine/seeds.js, docs/HatGiong.md): ở đây chỉ dùng Giỏ hạt (seeds() = basket) để đổi món,
 * giá món đã đổi ghi vào `paid` (đổi giá sau này không trừ thêm). Món `set` tự mở khi đủ con dấu / thẻ thánh. Món của nhân vật cơ bản
 * (wardrobe.js BASES) được tặng khi chọn nhân vật ấy (`gift`, không trừ hạt). Mỗi việc ghi túi đọc bản mới nhất trước (loadBag),
 * kẻo ghi đè hạt mà trang khác (seeds.js) vừa ghi.
 * Biệt danh (`nick`, nick.js): tên MC gọi và tên trên đầu ở máy người khác, thay cho tên tài khoản Google.
 * Thẻ thánh: mỗi phim về một vị thánh (Hạnh Thánh, Các thánh và phép lạ, Chứng từ) đã xem hết là một thẻ trong album.
 */
import { loadBag, saveBag, loadProgress } from '../engine/progress.js';
import { ITEMS, cleanLook, DEFAULT_LOOK, PRICE_K } from './wardrobe.js';
import { inSeason, vnDay } from './seasons.js';
import { paidSeedOrders } from '../pages/donate.js';
import { SEED, basket, checkIn, quizRight, harvest, levelOf, LEVELS, certs } from '../engine/seeds.js';
import { checkNick } from './nick.js';

export { SEED };

const today = () => new Date(vnDay()).toISOString().slice(0, 10);

/** Phim về một vị thánh: thẻ trong album. */
export const isSaintFilm = (s) => s.testament === 'hanh-thanh' || !!s.saintMiracle || !!s.witness;

export function makeBag({ films = null } = {}) {
  let bag = loadBag();
  const listeners = new Set();
  const save = () => { saveBag(bag); for (const f of listeners) f(); };
  const sum = (o) => Object.values(o || {}).reduce((a, n) => a + n, 0);

  const doneIds = () => Object.entries(loadProgress().stories || {}).filter(([, v]) => v.done).map(([id]) => id);
  function cards() {
    const all = films?.all?.() || [];
    const done = new Set(doneIds());
    return all.filter(isSaintFilm).map(s => ({ story: s, got: done.has(s.id) }));
  }
  const cardCount = () => cards().filter(c => c.got).length;
  const stampCount = () => Object.keys(bag.stamps || {}).length;

  // giá các món đã đổi trước khi có `paid`: ghi một lần theo giá lúc ấy (giá cũ, trước khi nhân PRICE_K)
  const fresh = () => { bag = loadBag(); return bag; };
  {
    let ch = false;
    for (const id of Object.keys(bag.owned || {})) {
      const it = ITEMS[id];
      if (it && !bag.gift?.[id] && /^(buy|season)$/.test(it.how) && bag.paid?.[id] == null) { bag.paid = { ...(bag.paid || {}), [id]: Math.round(it.price / PRICE_K) }; ch = true; }
    }
    if (ch) saveBag(bag);
  }
  // đơn góp bánh đã trả trên máy này (donate.js) mà túi chưa ghi: cộng hạt một lần
  function claim() {
    fresh();
    let got = 0;
    for (const { o, seeds: n } of paidSeedOrders()) {
      if (bag.bought?.[o]) continue;
      bag.bought = { ...(bag.bought || {}), [o]: n };
      got += n;
    }
    return got;
  }
  if (claim()) saveBag(bag);

  // món thành tích: { have, need, text } (text: tiến độ để hiện, như "Môn đệ (đang ở Người hành hương)", "3/10 thẻ thánh")
  function need(it) {
    const n = it.need || {}, en = /^en/.test(document.documentElement.lang || '');
    if (n.level != null) {
      const cur = levelOf(harvest()).i, L = (x) => (en ? LEVELS[x]?.en : LEVELS[x]?.vi) || '';
      return { have: cur, need: n.level, text: `${en ? 'Level' : 'Cấp'} ${L(n.level)}${cur < n.level ? ` (${en ? 'now' : 'đang ở'} ${L(cur)})` : ''}` };
    }
    if (n.cert) {
      const best = certs().reduce((a, c) => Math.max(a, c.passed), 0);
      return { have: best >= n.cert ? 1 : 0, need: 1, text: n.cert >= 15 ? (en ? 'Win all 15 questions in the hot seat' : 'Thắng cả 15 câu ở ghế nóng') : (en ? `Pass question ${n.cert} in the hot seat` : `Vượt câu ${n.cert} ở ghế nóng`) };
    }
    if (n.stamps) return { have: stampCount(), need: n.stamps, text: `${Math.min(stampCount(), n.stamps)}/${n.stamps} ${en ? 'stamps' : 'con dấu'}` };
    return { have: cardCount(), need: n.cards || 0, text: `${Math.min(cardCount(), n.cards || 0)}/${n.cards || 0} ${en ? 'saint cards' : 'thẻ thánh'}` };
  }
  function owns(id) {
    const it = ITEMS[id];
    if (!it) return false;
    if (it.how === 'free' || bag.owned?.[id] || bag.gift?.[id]) return true;
    if (it.how === 'set') { const q = need(it); return q.have >= q.need; }
    return false;
  }
  /** Có đổi được không: 'own' | 'ok' | 'seeds' (thiếu hạt) | 'season' (chưa tới mùa) | 'set' (chưa đủ sổ). */
  function canGet(id) {
    const it = ITEMS[id];
    if (owns(id)) return 'own';
    if (it.how === 'set') return 'set';
    if (it.how === 'season' && !inSeason(it.season)) return 'season';
    return seeds() >= it.price ? 'ok' : 'seeds';
  }
  const seeds = () => basket();

  return {
    seeds, owns, canGet, cards, cardCount, stampCount,
    /** Món thành tích: tiến độ { have, need, text }. */
    need: (id) => need(ITEMS[id]),
    get stamps() { return { ...(bag.stamps || {}) }; },
    /** Đã từng chọn đồ (máy nào cũng được). */
    get saved() { return !!bag.look; },
    /** Đổi Hạt giống lấy một món; trả true nếu được. */
    get(id) {
      fresh();
      if (canGet(id) !== 'ok') return false;
      bag.owned = { ...(bag.owned || {}), [id]: today() };
      bag.paid = { ...(bag.paid || {}), [id]: ITEMS[id].price };
      save();
      return true;
    },
    /** Tặng các món (nhân vật cơ bản): có luôn, không trừ sao. */
    grant(ids) {
      fresh();
      const add = ids.filter(id => ITEMS[id] && !owns(id));
      if (!add.length) return;
      bag.gift = { ...(bag.gift || {}), ...Object.fromEntries(add.map(id => [id, today()])) };
      save();
    },
    /** Nhân vật cơ bản đã chọn lần cuối ('' = chưa chọn). */
    get base() { return bag.base || ''; },
    setBase(id) { fresh(); bag.base = id; bag.lookAt = Date.now(); save(); },
    /** Biệt danh đã đặt (đúng quy tắc), '' nếu chưa. */
    get nick() { const r = checkNick(bag.nick || ''); return r.ok ? r.value : ''; },
    setNick(v) { fresh(); bag.nick = v; bag.nickAt = Date.now(); save(); },
    /** Đơn góp bánh vừa trả: cộng hạt, trả số hạt mới nhận. */
    claim() { const n = claim(); if (n) save(); return n; },
    /** Ghé thăm hôm nay = điểm danh (seeds.js): số hạt nhận, 0 nếu hôm nay đã điểm danh. */
    visit: () => checkIn(),
    /** Một việc đạo đức (chắp tay, cúi chào, thắp nến…): true nếu còn được tính hạt hôm nay. */
    act() {
      fresh();
      const d = today(), n = (bag.acts?.[d] || 0) + 1;
      bag.acts = { ...(bag.acts || {}), [d]: n };
      save();
      return n <= SEED.actsMax;
    },
    quizRight: () => quizRight(),
    /** Đóng dấu sổ hành hương (khu, đền thánh): true nếu dấu mới. */
    stamp(id) {
      fresh();
      if (!id || bag.stamps?.[id]) return false;
      bag.stamps = { ...(bag.stamps || {}), [id]: today() };
      save();
      return true;
    },
    /** Bộ đồ đã lưu (chỉ những món còn có), hoặc mặc định. */
    look() {
      const l = cleanLook(bag.look || DEFAULT_LOOK);
      for (const k of Object.keys(l)) if (typeof l[k] === 'string' && l[k] && !owns(l[k])) l[k] = DEFAULT_LOOK[k];
      return l;
    },
    saveLook(look) {
      fresh();
      bag.look = cleanLook(look);
      bag.lookAt = Date.now();
      save();
    },
    on(f) { listeners.add(f); return () => listeners.delete(f); },
    reload() { bag = loadBag(); for (const f of listeners) f(); },
  };
}
