/**
 * Các bước dùng chung cho Khám phá Toán 1 (bảng đồ vật groups.js): bấm đồ vật cho bay sang khu khác, nối từng
 * cặp, chọn số bằng nút to, chọn dấu < > =. Nếu bước chờ được bỏ qua (DEV __g4until.skip) thì tự làm nốt để
 * bảng luôn đúng cho bước sau.
 */

import { itemSvg } from './art.js';

export const N = (n) => `<span class="x1-cn">${n}</span>`;
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pic = (kind, opts) => `<span style="display:inline-block;width:1.6em;height:1.6em;vertical-align:middle">${itemSvg(kind, opts)}</span>`;
export { pic };

/** Chọn một số (nút to). list: các số cho chọn. Trả về Promise(đúng ngay lần đầu). */
export function askNum(c, ans, list, hint = '') {
  return c.choose(list.map((k) => ({ html: N(k), value: k })), ans, { hint });
}

/** Chọn dấu so sánh a ? b. */
export function askSign(c, a, b, { hint } = {}) {
  const s = a < b ? '<' : a > b ? '>' : '=';
  const h = hint || (s === '<' ? `${a} bé hơn ${b}. Đầu nhọn của dấu chỉ vào số bé.` : s === '>' ? `${a} lớn hơn ${b}. Đầu nhọn của dấu chỉ vào số bé.` : `${a} bằng ${b}.`);
  return c.choose(['<', '>', '='].map((k) => ({ html: N(k), value: k })), s, { hint: h }).then(() => s);
}

/**
 * Em bấm đồ vật ở khu `from` (lọc bằng ok) để chúng bay sang khu `to`, tới khi khu `to` có thêm n đồ vật.
 * mark: đánh số đếm trên đồ vật vừa tới và chữ dưới khu `to`. bad(item): câu nhắc khi bấm sai đồ vật.
 */
export async function tapMove(c, t, { from, to, n, ok = null, mark = true, bad = null, nudge = 'Bấm vào đồ vật đang nhún nhảy.', onLand = null }) {
  const target = t.count(to) + n;
  let flying = 0;
  const can = (it) => it.zone === from && (!ok || ok(it));
  const land = (it) => {
    if (mark) { const k = t.items(to).indexOf(it) + 1; t.mark(it, k); t.cap(to, String(t.count(to))); }
    onLand?.(it);
  };
  t.live(can);
  t.onTap = (it) => {
    if (it.zone !== from) return;
    if (!can(it)) { t.shake(it); if (bad) c.hint(typeof bad === 'function' ? bad(it) : bad); return; }
    if (t.count(to) + flying >= target) return;
    flying++;
    it.el.classList.remove('x1g-live');
    t.move(it, to).then(() => { flying--; land(it); });
  };
  await c.until(t, () => t.count(to) >= target, { nudge, el: () => t.items(from).find(can)?.el });
  t.onTap = null;
  while (t.count(to) < target) {
    const it = t.items(from).find(can);
    if (!it) break;
    await t.move(it, to);
    land(it);
  }
  t.live(null);
  await sleep(250);
}

/** Em bấm đồ vật ở khu `zone` để chúng bay đi (bớt đi n). cap: chữ dưới khu = số còn lại. */
export async function tapAway(c, t, { zone, n, nudge = 'Bấm vào đồ vật đang nhún nhảy.', cross = false }) {
  const start = t.count(zone);
  let gone = 0;
  const left = () => t.items(zone).filter((it) => !it.crossed);
  t.live((it) => it.zone === zone);
  const one = async (it) => {
    gone++;
    if (cross) { it.crossed = true; t.cross(it); it.el.classList.remove('x1g-live'); } else await t.away(it);
    t.cap(zone, String(start - gone));
    t.emit('gone');
  };
  t.onTap = (it) => { if (it.zone === zone && !it.crossed && gone < n) one(it); };
  await c.until(t, () => gone >= n, { nudge, el: () => left()[0]?.el });
  t.onTap = null;
  while (gone < n && left().length) await one(left()[left().length - 1]);
  t.live(null);
  await sleep(500);
}

/**
 * Nối từng cặp: em bấm một đồ vật ở hàng `top`, một đường nối xuống đồ vật cùng cột ở hàng `bottom`.
 * Bấm đồ vật không có bạn ở hàng kia: rung và nhắc. Xong khi mọi đồ vật có bạn đã được nối.
 */
export async function pairUp(c, t, top, bottom, { extra = 'Đồ vật này không có bạn để nối. Nó bị thừa ra.' } = {}) {
  const partner = (it) => {
    const other = it.zone === top ? bottom : top;
    return t.items(other).find((o) => o.slot === it.slot && !o.paired) || null;
  };
  const want = Math.min(t.count(top), t.count(bottom));
  t.live((it) => (it.zone === top || it.zone === bottom) && !!partner(it));
  t.onTap = (it) => {
    if (it.paired || (it.zone !== top && it.zone !== bottom)) return;
    const p = partner(it);
    if (!p) { t.shake(it); c.hint(extra); return; }
    const [a, b] = it.zone === top ? [it, p] : [p, it];
    t.pair(a, b);
    a.el.classList.remove('x1g-live'); b.el.classList.remove('x1g-live');
  };
  await c.until(t, () => t.pairs() >= want, { nudge: 'Bấm vào một đồ vật ở hàng trên để nối.', el: () => t.items(top).find((o) => !o.paired && partner(o))?.el });
  t.onTap = null;
  for (const a of t.items(top)) { const p = partner(a); if (!a.paired && p) { t.pair(a, p); await sleep(150); } }
  t.live(null);
  await sleep(300);
  // đồ vật thừa sáng lên
  const rest = [...t.items(top), ...t.items(bottom)].filter((o) => !o.paired);
  t.glow(rest);
  return rest;
}

/** Em bấm vào một khu (đĩa) đúng. Trả về Promise khi bấm đúng. */
export async function tapZone(c, t, ans, { bad = '', zones = [] } = {}) {
  let hit = false;
  t.glow(zones, false);
  zones.forEach((z) => t.zoneEl(z).classList.add('x1g-pick'));
  t.onZone = (z) => {
    if (z === ans) { hit = true; t.glow(z); t.emit('pick'); return; }
    if (zones.includes(z)) { t.shake(t.zoneEl(z)); if (bad) c.hint(typeof bad === 'function' ? bad(z) : bad); }
  };
  const tapItem = t.onTap;
  t.onTap = (it) => t.onZone(it.zone);
  await c.until(t, () => hit, { nudge: bad || 'Bấm vào một đĩa.', el: () => t.zoneEl(ans) });
  t.onZone = null; t.onTap = tapItem;
  zones.forEach((z) => t.zoneEl(z).classList.remove('x1g-pick'));
  t.glow(ans);
  await sleep(400);
  t.unglow();
}

/** Em bấm một đồ vật đúng (ok(item)) trong khu `zone`. */
export async function tapPick(c, t, zone, ok, { bad = '', nudge = '' } = {}) {
  let hit = null;
  t.onTap = (it) => {
    if (it.zone !== zone || hit) return;
    if (ok(it)) { hit = it; t.glow(it); t.emit('pick'); return; }
    t.shake(it);
    if (bad) c.hint(typeof bad === 'function' ? bad(it) : bad);
  };
  await c.until(t, () => !!hit, { nudge: nudge || bad, el: () => t.items(zone).find(ok)?.el });
  t.onTap = null;
  if (!hit) { hit = t.items(zone).find(ok); t.glow(hit); }
  await sleep(300);
  return hit;
}
