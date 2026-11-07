/**
 * Bảng Tủ đồ của Gặp gỡ online (nút áo trên thanh nút): bốn thẻ trên một thanh chia ô như thanh mục của trang chủ
 *   Nhân vật        biệt danh (tên MC gọi, nick.js) và nhân vật cơ bản (cậu bé, cô bé, nữ tu…: wardrobe.js BASES)
 *   Trang phục      chọn ô (tóc, áo…) trên thanh chia ô thứ hai, chạm một món để mặc; món chưa có thì đổi bằng Hạt giống /
 *                   chờ mùa / hoàn thành sổ; viền thẻ theo cấp độ (TIERS: Thường, Hiếm, Quý, Báu vật)
 *   Sổ hành hương   con dấu các nơi đã tới (khu, đền thánh), album thẻ thánh (phim về các thánh đã xem hết), phần thưởng
 *   Hạt giống       hạt trong giỏ, mùa gặt và cấp bậc, cách kiếm hạt (src/engine/seeds.js; Góp bánh là luồng riêng, không bán hạt)
 * Mở thì nhân vật xem trước (preview.js) đứng ra trước màn hình: chọn đồ chỉ mặc lên bản ấy, thanh dưới đáy Áp dụng (mặc
 * thật, lưu, người cùng phòng thấy) hay Hoàn tác; đóng bảng khi chưa áp dụng thì giữ bộ cũ.
 */
import { t, getLang } from '../engine/lang.js';
import { icon } from './icons.js';
import { ITEMS, SLOTS, OPTIONAL, TINTED, PAL, SKINS, HAIRS, TIERS, BASES, cleanLook, baseLook, baseGifts } from './wardrobe.js';
import { SEED } from './bag.js';
import { seasonHint } from './seasons.js';
import { hScroll } from './hscroll.js';
import { checkNick, NICK_WHY, NICK_MAX } from './nick.js';
import { seedState, HOT } from '../engine/seeds.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
// Sổ hành hương ('book') còn tạm ẩn (bỏ cùng đợt hạt giống d5e6e77)
const TABS = [['me', 'user', 'Nhân vật'], ['wear', 'shirt', 'Trang phục'], ['seeds', 'star', 'Sao']];

/** Một thanh chia ô kiểu thanh mục trang chủ (church.css .ch-seg): [{ key, label, icon?, on }] → HTML. */
export function segBar(attr, items, { cls = '' } = {}) {
  return `<div class="ch-seg${cls ? ` ${cls}` : ''}" role="tablist">${items.map(x => `<button type="button" role="tab" ${attr}="${x.key}" aria-selected="${!!x.on}">${x.icon ? icon(x.icon) : ''}<span>${esc(x.label)}</span>${x.badge ? `<i class="ch-seg-dot">${x.badge}</i>` : ''}</button>`).join('')}</div>`;
}

/** Nhãn cấp độ nhỏ (chấm màu + tên cấp). */
export function tierTag(it, en) {
  const T = TIERS[it.tier || 1];
  return `<em class="ch-tier" style="--tc:${T.c}">${esc(en ? T.en : T.vi)}</em>`;
}

/**
 * opts: { root (khung .ch), bag, stamps: [{ id, name, en, group }] (mọi con dấu có thể có), films (kho phim, mở phim từ thẻ),
 *   look() → bộ đồ đang chọn (nháp hay đang mặc), wear(look) mặc lên nhân vật xem trước, dirty() → có thay đổi chưa áp dụng,
 *   apply(), revert(), say(text, ms), onOpen(), onClose(), suggestNick() → gợi ý biệt danh từ tên tài khoản,
 *   onNick(name) biệt danh vừa lưu }
 */
export function makeCloset({ root, bag, stamps, films, look, wear, dirty, apply, revert, say, onOpen, onClose, suggestNick, onNick }) {
  const en = () => getLang() === 'en';
  const nameOf = (it) => (en() ? it.en : it.vi);
  root.insertAdjacentHTML('beforeend', `<div class="ch-closet" role="dialog" aria-modal="false" aria-label="${t('Tủ đồ')}" hidden>
    <div class="ch-cl-head">
      <b class="ch-cl-title">${icon('shirt')}<span>${t('Tủ đồ')}</span></b>
      <button type="button" class="ch-cl-seeds" data-tab="seeds" title="${t('Sao')}">${icon('star')}<b></b></button>
      <button type="button" class="ch-ic ch-cl-x" aria-label="${t('Đóng')}" title="${t('Đóng')}">${icon('x')}</button>
    </div>
    <div class="ch-cl-tabs"></div>
    <div class="ch-cl-body"></div>
    <div class="ch-cl-apply" hidden>
      <span>${t('Chỉ mình bạn thấy bộ đồ này cho tới khi Áp dụng.')}</span>
      <button type="button" class="ch-sh-btn" data-do="revert">${t('Hoàn tác')}</button>
      <button type="button" class="ch-sh-btn is-main" data-do="apply">${icon('check')}${t('Áp dụng')}</button>
    </div>
  </div>`);
  const el = root.querySelector('.ch-closet'), body = el.querySelector('.ch-cl-body'), seedsEl = el.querySelector('.ch-cl-seeds b');
  const tabsEl = el.querySelector('.ch-cl-tabs');
  let tab = 'wear', slot = 'top', confirm = null, nickDraft = null, nickMsg = '';

  function lockText(id) {
    const it = ITEMS[id], why = bag.canGet(id);
    if (why === 'season') return seasonHint(it.season, en() ? 'en' : 'vi');
    if (why === 'set') {
      return bag.need(id).text;
    }
    return '';
  }

  function tile(id) {
    const it = ITEMS[id], L = look(), on = L[it.slot] === id, why = bag.canGet(id);
    const state = why === 'own' ? (on ? `<i class="is-on">${icon('check')}</i>` : '')
      : why === 'ok' || why === 'seeds' ? `<i class="ch-cl-price${why === 'seeds' ? ' is-short' : ''}">${icon('star')}${it.price}</i>`
        : `<i class="is-lock">${icon('lock')}</i>`;
    const sub = why === 'season' || why === 'set' ? `<small>${esc(lockText(id))}</small>`
      : it.how === 'season' && why !== 'own' ? `<small>${esc(seasonHint(it.season, en() ? 'en' : 'vi'))}</small>` : '';
    const ask = confirm === id ? `<span class="ch-cl-ask">${t('Đổi')} ${it.price} ${t('sao?')} <button type="button" data-yes="${id}">${t('Đồng ý')}</button></span>` : '';
    return `<button type="button" class="ch-cl-item${on ? ' is-worn' : ''}${why === 'own' ? '' : ' is-locked'}" data-item="${id}" aria-pressed="${on}" style="--tc:${TIERS[it.tier || 1].c}">
      <span>${esc(nameOf(it))}</span>${it.tier > 1 ? tierTag(it, en()) : ''}${sub}${state}${ask}</button>`;
  }

  function swatches(key, list, cur) {
    return `<div class="ch-cl-sw" role="radiogroup">${list.map((c, i) => `<button type="button" role="radio" aria-checked="${i === cur}" data-key="${key}" data-v="${i}" style="--c:${c}" aria-label="${i + 1}"></button>`).join('')}</div>`;
  }

  function paintWear() {
    const L = look(), items = Object.keys(ITEMS).filter(id => ITEMS[id].slot === slot)
      .sort((a, b) => (ITEMS[a].tier || 1) - (ITEMS[b].tier || 1));
    let extra = '';
    if (slot === 'hair') extra = `<p class="ch-cl-h">${t('Màu da')}</p>${swatches('skin', SKINS, L.skin)}<p class="ch-cl-h">${t('Màu tóc')}</p>${swatches('hairC', HAIRS, L.hairC)}`;
    else if (TINTED[slot] && L[slot] && ITEMS[L[slot]]?.tint !== undefined) extra = `<p class="ch-cl-h">${t('Màu')}</p>${swatches(TINTED[slot], PAL, L[TINTED[slot]])}`;
    const none = OPTIONAL.has(slot) ? `<button type="button" class="ch-cl-item${!L[slot] ? ' is-worn' : ''}" data-item="" aria-pressed="${!L[slot]}"><span>${t('Không dùng')}</span>${!L[slot] ? `<i class="is-on">${icon('check')}</i>` : ''}</button>` : '';
    const keep = body.querySelector('.ch-seg')?.scrollLeft || 0;
    body.innerHTML = `${segBar('data-slot', SLOTS.map(s => ({ key: s.id, label: en() ? s.en : s.vi, on: s.id === slot })), { cls: 'is-sub' })}
      ${extra}<div class="ch-cl-grid">${none}${items.map(tile).join('')}</div>`;
    const row = body.querySelector('.ch-seg');
    row.scrollLeft = keep;   // vẽ lại sau mỗi lần chọn: giữ chỗ đang cuộn
    const hs = hScroll(row);
    requestAnimationFrame(() => hs.show());
    row.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }

  // ── Nhân vật: biệt danh + nhân vật cơ bản ──
  function paintMe() {
    const cur = bag.nick, val = nickDraft ?? (cur || suggestNick?.() || '');
    const check = checkNick(val), changed = check.ok && check.value !== cur;
    const rules = [`2–${NICK_MAX} ${t('ký tự, tối đa hai chữ')}`, t('chỉ chữ cái và dấu cách'), t('đọc được thành tiếng, không lời xấu')];
    const L = look(), picked = bag.base;
    const cards = BASES.map(b => {
      const gifts = baseGifts(b).filter(id => !bag.owns(id));
      const same = encodeLook(baseLook(b)) === encodeLook(L);
      return `<button type="button" class="ch-cl-base${same ? ' is-worn' : ''}" data-base="${b.id}" aria-pressed="${same}">
        <span class="ch-cl-bpic" data-thumb="base:${b.id}">${thumbs?.peek(`base:${b.id}`) ? '' : icon('user')}</span>
        <span class="ch-cl-bname">${esc(en() ? b.en : b.vi)}</span>
        ${gifts.length ? `<small>${icon('gift')}${t('Tặng')} ${gifts.length} ${t('món')}</small>` : picked === b.id ? `<small>${t('Đã chọn')}</small>` : ''}</button>`;
    }).join('');
    body.innerHTML = `<p class="ch-cl-sec">${t('Biệt danh')} <b>${cur ? esc(cur) : t('chưa đặt')}</b></p>
      <p class="ch-cl-note">${t('Tên MC gọi bạn ở trường quay và tên hiện trên đầu bạn ở máy người khác.')}</p>
      <form class="ch-cl-nick" autocomplete="off">
        <input type="text" name="nick" maxlength="${NICK_MAX + 4}" value="${esc(val)}" placeholder="${t('Ví dụ: Bảo Anh')}" aria-label="${t('Biệt danh')}" spellcheck="false">
        <button type="submit" class="ch-sh-btn is-main"${changed ? '' : ' disabled'}>${t('Lưu')}</button>
      </form>
      <p class="ch-cl-nickmsg${check.ok ? ' is-ok' : ''}" role="status">${esc(nickMsg || (check.ok ? `${t('MC sẽ gọi bạn là')} “${check.value}”.` : t(NICK_WHY[check.why])))}</p>
      <ul class="ch-cl-rules">${rules.map(r => `<li>${icon('check')}${esc(r)}</li>`).join('')}</ul>
      <p class="ch-cl-sec">${t('Nhân vật cơ bản')}</p>
      <p class="ch-cl-note">${t('Chọn một nhân vật để bắt đầu, rồi đổi từng món ở thẻ Trang phục. Đồ của nhân vật được tặng, không trừ sao.')}</p>
      <div class="ch-cl-bases">${cards}</div>`;
    const input = body.querySelector('input');
    input.addEventListener('input', () => {
      nickDraft = input.value;
      nickMsg = '';
      const c = checkNick(input.value), btn = body.querySelector('.ch-cl-nick button');
      btn.disabled = !(c.ok && c.value !== bag.nick);
      const m = body.querySelector('.ch-cl-nickmsg');
      m.classList.toggle('is-ok', c.ok);
      m.textContent = c.ok ? `${t('MC sẽ gọi bạn là')} “${c.value}”.` : t(NICK_WHY[c.why]);
    });
    body.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const c = checkNick(input.value);
      if (!c.ok) return;
      bag.setNick(c.value);
      nickDraft = null;
      nickMsg = `${t('Đã lưu. MC sẽ gọi bạn là')} “${c.value}”.`;
      onNick?.(c.value);
      paint();
    });
    fillThumbs();
  }

  function paintBook() {
    const got = bag.stamps, lang = en();
    const groups = new Map();
    for (const s of stamps) { if (!groups.has(s.group)) groups.set(s.group, []); groups.get(s.group).push(s); }
    const rewards = Object.entries(ITEMS).filter(([, it]) => it.how === 'set').map(([id, it]) => {
      const q = bag.need(id), done = q.have >= q.need;
      return `<li class="${done ? 'is-done' : ''}">${icon(done ? 'check' : 'lock')}<span>${esc(nameOf(it))}</span>${tierTag(it, lang)}<b>${esc(q.text)}</b></li>`;
    }).join('');
    const stampHtml = [...groups].map(([g, list]) => `<p class="ch-cl-h">${esc(t(g))}</p><div class="ch-cl-stamps">${list.map(s => {
      const d = got[s.id];
      return `<span class="ch-cl-stamp${d ? ' is-got' : ''}" title="${esc(lang ? s.en || s.name : s.name)}">${icon(d ? 'cross' : 'stamp')}<em>${esc(lang ? s.en || s.name : s.name)}</em>${d ? `<small>${d.slice(8, 10)}/${d.slice(5, 7)}</small>` : ''}</span>`;
    }).join('')}</div>`).join('');
    const cards = bag.cards();
    const cardHtml = cards.map(({ story, got: g }) => {
      const title = lang ? story.en?.title || story.title : story.title;
      const img = story.real?.src ? `/${story.real.src}` : `/og/${story.id}.jpg`;
      return `<button type="button" class="ch-cl-card${g ? ' is-got' : ''}" data-film="${story.id}" title="${esc(title)}">
        <span class="ch-cl-pic"${g ? ` style="background-image:url('${img}')"` : ''}>${g ? '' : icon('lock')}</span><em>${esc(title)}</em></button>`;
    }).join('');
    body.innerHTML = `<p class="ch-cl-note">${t('Mỗi nơi bạn tới, mỗi lần thắp nến hay cầu nguyện ở một đền thánh là một con dấu. Xem hết một phim về một vị thánh là được thẻ của ngài.')}</p>
      <ul class="ch-cl-rewards">${rewards}</ul>
      <p class="ch-cl-sec">${t('Con dấu')} <b>${bag.stampCount()}/${stamps.length}</b></p>${stampHtml}
      <p class="ch-cl-sec">${t('Thẻ thánh')} <b>${bag.cardCount()}/${cards.length}</b></p><div class="ch-cl-cards">${cardHtml}</div>`;
  }

  function paintSeeds() {
    const st = seedState();
    const rows = [
      [t('Làm đúng một bài trong các sách, Luyện Tính, trò chơi'), '+1 → +5'],
      [t('Khán giả trường quay trả lời đúng'), `+1, ${t('tối đa')} ${SEED.quizMax} ${t('mỗi ngày')}`],
      [t('Ghế nóng: theo câu đã vượt (mốc câu 5 và câu 10)'), `1 → ${HOT[15]}`],
    ];
    const tiers = TIERS.slice(1).map(T => `<li><i style="--tc:${T.c}"></i><b>${esc(en() ? T.en : T.vi)}</b></li>`).join('');
    body.innerHTML = `<p class="ch-cl-big">${icon('star')}<b>${bag.seeds()}</b><span>${t('Sao để đổi đồ')}</span></p>
      <p class="ch-cl-note">${t('Tổng sao đã nhận')}: <b>${st.harvest}</b> · ${esc(en() ? st.level.en : st.level.vi)}. ${t('Đổi đồ chỉ trừ vào sao để đổi đồ; tổng sao trên bảng xếp hạng không bao giờ giảm.')}</p>
      <ul class="ch-cl-earn">${rows.map(([a, b]) => `<li><span>${a}</span><b>${b}</b></li>`).join('')}</ul>
      <p class="ch-cl-sec">${t('Cấp độ vật phẩm')}</p>
      <ul class="ch-cl-tiers">${tiers}</ul>`;
  }

  // ảnh chân dung các nhân vật cơ bản (thumbs.js, có khi nhân vật 3D đã tải)
  let thumbs = null;
  function fillThumbs() {
    if (!thumbs) return;
    for (const s of el.querySelectorAll('[data-thumb]:not(.is-ready)')) {
      const id = s.dataset.thumb, url = thumbs.peek(id);
      const put = (u) => { for (const x of el.querySelectorAll(`[data-thumb="${id}"]`)) { if (u) { x.style.backgroundImage = `url(${u})`; x.textContent = ''; } x.classList.add('is-ready'); } };
      if (url) put(url); else thumbs.get(id).then(put);
    }
  }

  function paint() {
    seedsEl.textContent = bag.seeds();
    tabsEl.innerHTML = segBar('data-tab', TABS.map(([key, ic, label]) => ({ key, icon: ic, label: t(label), on: key === tab,
      badge: key === 'me' && !bag.nick ? '!' : '' })));
    if (tab === 'wear') paintWear(); else if (tab === 'me') paintMe(); else if (tab === 'book') paintBook(); else paintSeeds();
    el.querySelector('.ch-cl-apply').hidden = !dirty?.();
  }

  function put(id) {
    const it = ITEMS[id];
    const next = { ...look(), [slot]: id };
    if (it?.tint !== undefined && TINTED[it.slot]) next[TINTED[it.slot]] = it.tint;
    wear(cleanLook(next));
  }

  el.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b || b.disabled || b.type === 'submit') return;
    if (b.classList.contains('ch-cl-x')) { api.close(); return; }
    if (b.dataset.do === 'apply') { apply?.(); say(t('Đã mặc bộ đồ mới.'), 2000); paint(); return; }
    if (b.dataset.do === 'revert') { revert?.(); paint(); return; }
    if (b.dataset.tab) { tab = b.dataset.tab; confirm = null; nickMsg = ''; paint(); body.scrollTop = 0; return; }
    if (b.dataset.slot) { slot = b.dataset.slot; confirm = null; paint(); body.scrollTop = 0; return; }
    if (b.dataset.key) { wear(cleanLook({ ...look(), [b.dataset.key]: +b.dataset.v })); paint(); return; }
    if (b.dataset.base) {
      const base = BASES.find(x => x.id === b.dataset.base);
      const gifts = baseGifts(base).filter(id => !bag.owns(id));
      bag.grant(baseGifts(base));
      bag.setBase(base.id);
      wear(baseLook(base));
      if (gifts.length) say(`${t('Bạn được tặng')}: ${gifts.map(id => nameOf(ITEMS[id])).join(', ')}.`, 3500);
      paint();
      return;
    }
    if (b.dataset.yes) {
      const id = b.dataset.yes;
      if (bag.get(id)) { say(`${t('Bạn đã có')} ${nameOf(ITEMS[id])}.`, 2500); put(id); }
      confirm = null;
      paint();
      return;
    }
    if (b.dataset.film) {
      if (b.classList.contains('is-got')) { api.close(); films?.open?.(b.dataset.film, () => {}); }
      else say(t('Xem hết phim về vị thánh này để nhận thẻ.'), 2500);
      return;
    }
    if (b.dataset.item !== undefined) {
      const id = b.dataset.item;
      if (!id) { wear(cleanLook({ ...look(), [slot]: '' })); confirm = null; paint(); return; }
      const why = bag.canGet(id);
      if (why === 'own') { put(id); confirm = null; }
      else if (why === 'ok') confirm = confirm === id ? null : id;
      else if (why === 'seeds') say(`${t('Cần')} ${ITEMS[id].price} ${t('sao, bạn đang có')} ${bag.seeds()}. ${t('Làm bài trong các sách hay lên ghế nóng để có thêm sao.')}`, 3500);
      else say(lockText(id), 3000);
      paint();
    }
  });
  bag.on(() => { if (!el.hidden && !body.contains(document.activeElement)) paint(); else if (!el.hidden) seedsEl.textContent = bag.seeds(); });

  const api = {
    get isOpen() { return !el.hidden; },
    open(which) {
      if (which) tab = which;
      confirm = null;
      nickMsg = '';
      el.hidden = false;
      root.classList.add('is-closet');
      paint();
      onOpen?.();
    },
    close() {
      if (el.hidden) return;
      el.hidden = true;
      root.classList.remove('is-closet');
      onClose?.();
    },
    setThumbs(t2) { thumbs = t2; if (!el.hidden && tab === 'me') fillThumbs(); },
    paint,
  };
  return api;
}

// bộ đồ so sánh được (chỉ những khoá của DEFAULT_LOOK, theo thứ tự)
function encodeLook(l) { return JSON.stringify(cleanLook(l)); }
