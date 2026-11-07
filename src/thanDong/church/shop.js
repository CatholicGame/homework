/**
 * Danh mục Vật phẩm của Gặp gỡ online (nút quà trên thanh nút): mọi vật phẩm ảo của Tủ đồ (trừ kiểu tóc), có ảnh chụp từ mô
 * hình 3D (thumbs.js), chia nhóm (trang phục, mũ nón, phụ kiện, cầm tay, để bay, bạn đồng hành, hiệu ứng) và lọc nhanh
 * (theo mùa, phần thưởng sổ hành hương, có thể đổi ngay, đã có). Chạm một món: ô chi tiết hiện trên đầu bảng với lời giới
 * thiệu (itemText.js), cách có, và các nút Mặc thử (chỉ trên máy mình, không lưu, không gửi đi), Đổi bằng Hạt giống, Mặc.
 * Bảng nằm cùng chỗ với Tủ đồ, camera ngắm nhân vật như khi mở Tủ đồ (world.js closetCamera), nên mặc thử là thấy ngay.
 * Không có gì mua bằng tiền thật.
 */
import { t, getLang } from '../engine/lang.js';
import { icon } from './icons.js';
import { ITEMS, cleanLook, TINTED, OPTIONAL, TIERS } from './wardrobe.js';
import { segBar, tierTag } from './closet.js';
import { ITEM_TEXT } from './itemText.js';
import { seasonHint } from './seasons.js';
import { hScroll } from './hscroll.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const GROUPS = [
  { id: 'own', vi: 'Của tôi', en: 'Mine', test: (it, why) => why === 'own' },
  { id: 'all', vi: 'Tất cả', en: 'All' },
  { id: 'wear', vi: 'Trang phục', en: 'Clothes', slots: ['top', 'bottom', 'shoes'] },
  { id: 'hat', vi: 'Mũ nón', en: 'Hats', slots: ['hat'] },
  { id: 'acc', vi: 'Phụ kiện', en: 'Accessories', slots: ['face', 'neck', 'back'] },
  { id: 'hand', vi: 'Cầm tay', en: 'In hand', slots: ['hand'] },
  { id: 'fly', vi: 'Để bay', en: 'To fly', slots: ['fly'] },
  { id: 'pet', vi: 'Bạn đồng hành', en: 'Companions', slots: ['pet'] },
  { id: 'fx', vi: 'Hiệu ứng', en: 'Effects', slots: ['fx'] },
  { id: 'rare', vi: 'Quý, báu vật', en: 'Precious', test: (it) => (it.tier || 1) >= 3 },
  { id: 'season', vi: 'Theo mùa', en: 'Seasonal', test: (it) => it.how === 'season' },
  { id: 'set', vi: 'Phần thưởng', en: 'Rewards', test: (it) => it.how === 'set' },
  { id: 'ok', vi: 'Đổi được ngay', en: 'Ready to trade', test: (it, why) => why === 'ok' },
];
// cùng ô: cấp thấp trước
const LIST = Object.keys(ITEMS).filter(id => ITEMS[id].slot !== 'hair');

/**
 * opts: { root, bag, thumbs (makeThumbs, có thể null lúc chưa tải xong nhân vật), look() → bộ đồ đang mặc,
 *   wear(look) mặc + lưu, tryOn(look | null) mặc thử trên máy mình / thôi thử, say(text, ms), onOpen() }
 */
export function makeShop({ root, bag, thumbs, look, wear, tryOn, say, onOpen, onClose, onSeeds }) {
  const en = () => getLang() === 'en';
  const nameOf = (it) => (en() ? it.en : it.vi);
  root.insertAdjacentHTML('beforeend', `<div class="ch-shop" role="dialog" aria-modal="false" aria-label="${t('Vật phẩm')}" hidden>
    <div class="ch-cl-head">
      <b class="ch-cl-title">${icon('gift')}<span>${t('Vật phẩm')}</span></b>
      <button type="button" class="ch-cl-seeds" data-seeds title="${t('Sao')}">${icon('star')}<b></b></button>
      <button type="button" class="ch-ic ch-cl-x" aria-label="${t('Đóng')}" title="${t('Đóng')}">${icon('x')}</button>
    </div>
    <div class="ch-sh-groups"></div>
    <div class="ch-cl-body"><div class="ch-sh-detail" hidden></div><div class="ch-sh-grid"></div></div>
  </div>`);
  const el = root.querySelector('.ch-shop'), body = el.querySelector('.ch-cl-body');
  const groupsEl = el.querySelector('.ch-sh-groups'), gridEl = el.querySelector('.ch-sh-grid'), detailEl = el.querySelector('.ch-sh-detail');
  const seedsEl = el.querySelector('.ch-cl-seeds b');
  let group = 'all', pick = null, trying = null;

  const status = (id) => {
    const it = ITEMS[id], why = bag.canGet(id);
    if (why === 'own') return { why, text: look()[it.slot] === id ? t('Đang dùng') : t('Đã có') };
    if (why === 'set') {
      return { why, text: bag.need(id).text };
    }
    if (why === 'season') return { why, text: seasonHint(it.season, en() ? 'en' : 'vi') };
    return { why, text: `${it.price} ${t('sao')}` };
  };

  function thumb(id, cls = 'ch-sh-pic') {
    const url = thumbs?.peek(id);
    return `<span class="${cls}" data-thumb="${id}"${url ? ` style="background-image:url(${url})"` : ''}>${url ? '' : '<i class="ch-sh-spin"></i>'}</span>`;
  }
  // ảnh chưa chụp: xin thumbs, có thì gắn vào mọi chỗ đang chờ món đó
  function fillThumbs() {
    if (!thumbs) return;
    for (const s of el.querySelectorAll('[data-thumb]:not(.is-ready)')) {
      const id = s.dataset.thumb;
      thumbs.get(id).then((url) => {
        for (const x of el.querySelectorAll(`[data-thumb="${id}"]`)) {
          if (url) x.style.backgroundImage = `url(${url})`;
          x.classList.add('is-ready');
          x.textContent = '';
        }
      });
    }
  }

  function card(id) {
    const it = ITEMS[id], st = status(id);
    const badge = st.why === 'own' ? `<i class="is-own">${icon('check')}</i>`
      : st.why === 'ok' || st.why === 'seeds' ? `<i class="ch-cl-price${st.why === 'seeds' ? ' is-short' : ''}">${icon('star')}${it.price}</i>`
        : `<i class="is-lock">${icon(st.why === 'season' ? 'star' : 'lock')}</i>`;
    return `<button type="button" class="ch-sh-card${pick === id ? ' is-pick' : ''}${st.why === 'own' ? ' is-own' : ''}" data-id="${id}" aria-pressed="${pick === id}" style="--tc:${TIERS[it.tier || 1].c}">
      ${thumb(id)}${badge}<span class="ch-sh-name">${esc(nameOf(it))}</span>${tierTag(it, en())}${st.why === 'season' || st.why === 'set' ? `<small>${esc(st.text)}</small>` : ''}</button>`;
  }

  function paintDetail() {
    if (!pick) { detailEl.hidden = true; thumbs?.unview(); return; }
    const it = ITEMS[pick], st = status(pick), L = look(), worn = L[it.slot] === pick;
    const txt = ITEM_TEXT[pick]?.[en() ? 1 : 0] || '';
    const how = it.how === 'free' ? t('Ai cũng có sẵn.') : it.how === 'buy' ? `${t('Đổi bằng')} ${it.price} ${t('Sao')}.`
      : it.how === 'season' ? `${t('Chỉ đổi được trong mùa')}: ${seasonHint(it.season, en() ? 'en' : 'vi')}. ${it.price} ${t('Sao')}, ${t('có rồi thì giữ mãi')}.`
        : `${t('Phần thưởng thành tích')}: ${st.why === 'own' ? t('đã đủ') : st.text.split(': ')[1]}.`;
    const btns = [];
    if (st.why === 'own') {
      btns.push(!worn ? `<button type="button" data-do="wear" class="ch-sh-btn is-main">${t('Mặc')}</button>`
        : OPTIONAL.has(it.slot) ? `<button type="button" data-do="off" class="ch-sh-btn">${t('Thôi dùng')}</button>`
          : `<button type="button" class="ch-sh-btn" disabled>${icon('check')}${t('Đang mặc')}</button>`);
    }
    else {
      btns.push(`<button type="button" data-do="try" class="ch-sh-btn">${trying === pick ? t('Thôi thử') : t('Mặc thử')}</button>`);
      if (st.why === 'ok') btns.push(`<button type="button" data-do="get" class="ch-sh-btn is-main">${icon('star')}${t('Đổi')} ${it.price} ${t('sao')}</button>`);
      else if (st.why === 'seeds') btns.push(`<button type="button" class="ch-sh-btn" disabled>${icon('star')}${t('Cần')} ${it.price - bag.seeds()} ${t('sao nữa')}</button>`);
    }
    detailEl.hidden = false;
    detailEl.innerHTML = `<span class="ch-sh-big" title="${t('Kéo để xoay, lăn chuột hay chụm hai ngón để phóng to')}"><i class="ch-sh-spin"></i></span>
      <div class="ch-sh-info"><b>${esc(nameOf(it))}</b>${tierTag(it, en())}<p>${esc(txt)}</p><small>${esc(how)}</small><div class="ch-sh-btns">${btns.join('')}</div></div>`;
    // nhân vật 3D thật mặc món ấy, cả người, kéo để xoay (thumbs.view)
    const big = detailEl.querySelector('.ch-sh-big');
    if (thumbs) { thumbs.view(big, pick); big.insertAdjacentHTML('beforeend', `<i class="ch-sh-turn" aria-hidden="true">${icon('turnR')}</i>`); }
  }

  function paint() {
    seedsEl.textContent = bag.seeds();
    const keep = groupsEl.firstElementChild?.scrollLeft || 0;
    groupsEl.innerHTML = segBar('data-group', GROUPS.map(g => ({ key: g.id, label: en() ? g.en : g.vi, on: g.id === group })), { cls: 'is-sub' });
    groupsEl.firstElementChild.scrollLeft = keep;
    const hs = hScroll(groupsEl.firstElementChild);
    requestAnimationFrame(() => { hs?.show(); groupsEl.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' }); });
    const G = GROUPS.find(g => g.id === group);
    const ids = LIST.filter(id => {
      const it = ITEMS[id];
      if (G.slots) return G.slots.includes(it.slot);
      if (G.test) return G.test(it, bag.canGet(id));
      return true;
    });
    gridEl.innerHTML = ids.length ? ids.map(card).join('') : `<p class="ch-cl-note">${t('Chưa có món nào ở đây.')}</p>`;
    paintDetail();
    fillThumbs();
  }

  function stopTry() {
    if (!trying) return;
    trying = null;
    tryOn(null);
  }
  // bộ đồ đang mặc thay một món (kèm màu mặc định của món đó)
  function withItem(id, on = true) {
    const it = ITEMS[id];
    const next = { ...look(), [it.slot]: on ? id : '' };
    if (on && it.tint !== undefined && TINTED[it.slot]) next[TINTED[it.slot]] = it.tint;
    return cleanLook(next);
  }
  function put(id, on = true) {
    trying = null;
    wear(withItem(id, on));
  }

  el.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b || b.disabled) return;
    if (b.classList.contains('ch-cl-x')) { api.close(); return; }
    if (b.dataset.seeds !== undefined) { onSeeds?.(); return; }
    if (b.dataset.group) { group = b.dataset.group; pick = null; stopTry(); paint(); body.scrollTop = 0; return; }
    if (b.dataset.id) {
      const id = b.dataset.id;
      pick = pick === id ? null : id;
      if (pick && bag.canGet(pick) !== 'own') { trying = pick; tryOn(withItem(pick)); } else stopTry();
      paint();
      if (pick) body.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const act = b.dataset.do, it = ITEMS[pick];
    if (!act || !it) return;
    if (act === 'try') {
      if (trying === pick) stopTry();
      else { trying = pick; tryOn(withItem(pick)); }
    } else if (act === 'get') {
      if (bag.get(pick)) { put(pick); say(`${t('Bạn đã có')} ${nameOf(it)}.`, 2500); }
    } else if (act === 'wear') put(pick);
    else if (act === 'off') put(pick, false);
    paint();
  });
  bag.on(() => { if (!el.hidden) paint(); });

  const api = {
    get isOpen() { return !el.hidden; },
    get el() { return el; },
    /** Số món đổi được ngay (huy hiệu trên nút). */
    ready: () => LIST.filter(id => bag.canGet(id) === 'ok').length,
    open(id) {
      onOpen?.();
      el.hidden = false;
      root.classList.add('is-closet');
      if (id && ITEMS[id]) { pick = id; group = 'all'; }
      paint();
    },
    close() {
      if (el.hidden) return;
      stopTry();
      pick = null;
      thumbs?.unview();
      el.hidden = true;
      root.classList.remove('is-closet');
      onClose?.();
    },
    setThumbs(t2) { thumbs = t2; if (!el.hidden) { paintDetail(); fillThumbs(); } },
  };
  return api;
}
