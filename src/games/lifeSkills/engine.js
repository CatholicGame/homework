/**
 * Chạy một truyện của 🏘️ Phố Kỹ Năng (dữ liệu: stories.js). Một màn duy nhất, các vùng giữ chỗ từ đầu:
 *   cảnh (.ls-scene, trạng thái bằng data-*) · 3 ô nhân vật a / b / c · bảng thoại · 3 nút (lựa chọn / hành động / ▶ Tiếp)
 *   · thẻ kết cục phủ lên trời của cảnh.
 * Chạm bảng thoại hoặc ▶ Tiếp để sang câu sau. Kết cục: thẻ kết cục + "Điều em học được" + 3 nút
 * (🔁 Chọn lại từ lựa chọn vừa rồi, ⏮️ Chơi lại từ đầu, 📖 Truyện khác).
 */

import { say as rawSay, stopSpeaking, sfx, rain, isMuted, setMuted } from '../preschool/fx.js';
import { speakableVi } from '../../engine/letterNames.js';
import { NPCS, DETECTIVE_NPCS } from '../grade3Games/npc.js';
import { SCENES, landBox } from './scenes.js';
import { VOICES, endingsOf } from './stories.js';

const say = (text) => rawSay(speakableVi(text));

// Bản làm nét (Real-ESRGAN, scripts/upscale-npc.py --max 1000) của các nhân vật dùng ở đây: hình gốc chỉ cao ~400 px,
// hiện to gần nửa màn hình thì nhoè.
import hdBin from '../../assets/life-skills/npc/ban-bin.webp';
import hdNa from '../../assets/life-skills/npc/ban-na.webp';
import hdKhang from '../../assets/life-skills/npc/chu-khang.webp';
import hdLan from '../../assets/life-skills/npc/co-lan.webp';
import hdMai from '../../assets/life-skills/npc/chi-mai.webp';
import hdMinh from '../../assets/life-skills/npc/anh-minh.webp';

const HD = { bin: hdBin, ban: hdNa, congan: hdKhang, co: hdLan, chi: hdMai, anh: hdMinh };
const ALL_NPCS = [...NPCS, ...DETECTIVE_NPCS];
const npcById = (id) => { const n = ALL_NPCS.find((x) => x.id === id); return n && HD[id] ? { ...n, img: HD[id] } : n; };
/** Hình nhân vật (bản nét nếu có). */
export const npcImgSrc = (id) => npcById(id)?.img;

/** Bin hoặc Na: nhân vật bé nhập vai; bạn còn lại là 'ban'. */
export const HEROES = {
  bin: { npc: 'bin', name: 'Bin' },
  na: { npc: 'ban', name: 'Na' },
};

export const END_KIND = {
  best: { icon: '🌟', label: 'Kết cục tốt nhất', color: '#EAB308' },
  ok: { icon: '🙂', label: 'Kết cục tạm được', color: '#3B82F6' },
  bad: { icon: '💡', label: 'Kết cục chưa ổn', color: '#F97316' },
};

// Màu nhãn tên theo nhân vật (Bin xanh lá như áo, Na hồng), không theo vai
const WHO_COLOR = { bin: '#22C55E', ban: '#F472B6' };
const STATE_KEYS = ['light', 'bike', 'alert', 'door', 'phone', 'loa', 'look'];

/**
 * play(app, story, { hero, found: Set(endId), onEnd(endId, node), onExit })
 * found: kết cục đã tìm từ trước (sổ kết cục ở thanh trên).
 */
export function playStory(app, story, { hero, found, onEnd, onExit }) {
  const me = HEROES[hero] || HEROES.bin;
  const friend = HEROES[hero === 'na' ? 'bin' : 'na'];
  const fill = (t) => t.replaceAll('{me}', me.name).replaceAll('{ban}', friend.name);
  const endings = endingsOf(story);

  // Vai → { npc, name, slot, phone }
  const roles = {};
  for (const [role, c] of Object.entries(story.cast)) {
    const npc = role === 'me' ? npcById(me.npc) : role === 'ban' ? npcById(friend.npc) : npcById(c.npc);
    const name = role === 'me' ? me.name : role === 'ban' ? friend.name : c.name || npc?.name;
    roles[role] = { npc, name, slot: c.slot, phone: !!c.phone };
  }

  app.innerHTML = `
    <div class="ls-root">
      <div class="ls-scene"></div>
      <div class="ls-cast">${['a', 'b', 'c'].map((s) => `<div class="ls-slot ls-slot-${s}" data-slot="${s}"></div>`).join('')}</div>
      <div class="ls-top">
        <button class="ls-pill ls-icon" data-act="back" aria-label="Quay lại">←</button>
        <span class="ls-pill">${story.icon} ${story.title}</span>
        <span class="ls-spacer"></span>
        <button class="ls-pill ls-icon" data-act="mute" aria-label="Tắt / bật tiếng"></button>
        <span class="ls-pill ls-dots" title="Sổ kết cục"></span>
      </div>
      <div class="ls-end"></div>
      <div class="ls-ui">
        <div class="ls-talk" role="button" tabindex="0">
          <span class="ls-who"></span>
          <div class="ls-face"></div>
          <p class="ls-line"></p>
          <button class="ls-say" data-act="say" aria-label="Nghe lại">🔊</button>
        </div>
        <div class="ls-pick">${[0, 1, 2].map((i) => `<button class="ls-ch ls-ch-empty" data-i="${i}"></button>`).join('')}</div>
      </div>
    </div>`;
  const root = app.querySelector('.ls-root');
  const sceneEl = root.querySelector('.ls-scene');
  const slots = Object.fromEntries([...root.querySelectorAll('.ls-slot')].map((el) => [el.dataset.slot, el]));
  const talk = root.querySelector('.ls-talk');
  const whoEl = root.querySelector('.ls-who');
  const faceEl = root.querySelector('.ls-face');
  const lineEl = root.querySelector('.ls-line');
  const btns = [...root.querySelectorAll('.ls-ch')];
  const endEl = root.querySelector('.ls-end');
  const dotsEl = root.querySelector('.ls-dots');
  const muteBtn = root.querySelector('[data-act="mute"]');

  const drawDots = () => {
    dotsEl.innerHTML = `📔 ${endings.map((e) => `<span class="ls-dot${found.has(e.id) ? ' on' : ''}">${END_KIND[e.end].icon}</span>`).join('')}`;
  };
  const drawMute = () => { muteBtn.textContent = isMuted() ? '🔇' : '🔊'; };
  drawDots();
  drawMute();

  // ── trạng thái ──
  let sceneId = null;
  let state = {};
  let shown = {}; // vai → tâm trạng
  let curNode = null;
  let lines = [];
  let lineIdx = 0;
  let afterLines = null; // hàm chạy khi hết lời của node
  let lastChoice = null; // { id, sceneId, state, shown } để 🔁 chọn lại
  let alive = true;

  const fit = () => {
    const sc = SCENES[sceneId];
    const svg = sceneEl.querySelector('svg');
    if (sc && svg) svg.setAttribute('viewBox', innerWidth < innerHeight ? sc.port : landBox(sc, sceneEl.clientWidth / Math.max(1, sceneEl.clientHeight)));
  };
  window.addEventListener('resize', fit);

  function setScene(id) {
    if (id === sceneId) return;
    sceneId = id;
    sceneEl.innerHTML = SCENES[id].svg();
    fit();
  }
  function applyState() {
    for (const k of STATE_KEYS) {
      if (state[k] == null || state[k] === false) delete sceneEl.dataset[k];
      else sceneEl.dataset[k] = state[k] === true ? '1' : state[k];
    }
  }

  // Hình "buồn" của bộ NPC là mặt cau có, khoanh tay (khách khó tính ở Chợ phiên), không hợp cảnh lo lắng / suýt nguy hiểm:
  // 'sad' dùng hình thường + lắc người. Cần vẽ thêm mặt lo lắng (docs/ky-nang-song/thiet-ke.md §6).
  function npcImg(r) {
    const src = r.npc?.img;
    return src ? `<img src="${src}" alt="${r.name}" draggable="false" decoding="async">` : '';
  }
  // Ô nào đang có vai nào (để biết ai rời đi, ai vào)
  const inSlot = { a: null, b: null, c: null };
  function drawCast(prev = {}) {
    const want = { a: null, b: null, c: null };
    for (const [role, mood] of Object.entries(shown)) if (mood && roles[role]) want[roles[role].slot] = role;
    for (const s of ['a', 'b', 'c']) {
      const el = slots[s];
      const role = want[s];
      const mood = role ? shown[role] : null;
      if (!role) {
        if (inSlot[s]) { el.className = `ls-slot ls-slot-${s} ls-out`; inSlot[s] = null; }
        continue;
      }
      const r = roles[role];
      const isNew = inSlot[s] !== role;
      const moodChanged = prev[role] !== mood;
      if (isNew) el.innerHTML = npcImg(r);
      el.className = `ls-slot ls-slot-${s}${isNew ? ' ls-in' : ''}${!isNew && moodChanged && mood !== 'wait' ? ` ls-${mood}` : ''}${r.phone ? ' ls-phone' : ''}`;
      inSlot[s] = role;
    }
  }

  // ── lời thoại ──
  function speaker(who) {
    if (roles[who]) return { name: roles[who].name, img: roles[who].npc?.img, color: WHO_COLOR[roles[who].npc?.id] || '#8B5CF6' };
    const v = VOICES[who];
    return { name: v?.name || '', icon: v?.icon || '💬', color: '#64748B' };
  }
  function showLine(who, text, { learn = false } = {}) {
    const sp = learn ? { name: 'Điều em học được', icon: '💡', color: '#EA580C' } : speaker(who);
    talk.classList.toggle('ls-learn', learn);
    whoEl.textContent = sp.name;
    talk.style.setProperty('--who', sp.color);
    faceEl.innerHTML = sp.img ? `<img src="${sp.img}" alt="">` : sp.icon;
    lineEl.textContent = text;
    lineEl.classList.remove('ls-fade');
    void lineEl.offsetWidth;
    lineEl.classList.add('ls-fade');
    for (const el of Object.values(slots)) el.classList.remove('ls-talking');
    if (roles[who] && shown[who]) slots[roles[who].slot].classList.add('ls-talking');
    say(text);
  }
  function showPrompt(text) {
    talk.classList.remove('ls-learn');
    whoEl.textContent = '';
    faceEl.innerHTML = '🤔';
    lineEl.textContent = text;
    for (const el of Object.values(slots)) el.classList.remove('ls-talking');
    say(text);
  }

  // ── nút ──
  function setButtons(list) {
    btns.forEach((b, i) => {
      const it = list[i];
      b.onclick = null;
      b.className = 'ls-ch';
      if (!it) { b.classList.add('ls-ch-empty'); b.innerHTML = ''; return; }
      b.classList.add(it.cls || `c${i}`, 'ls-fresh');
      b.innerHTML = `<span class="ls-ic">${it.icon}</span><span>${it.text}</span>`;
      b.onclick = () => { if (alive) { sfx.tap(); it.on(b); } };
    });
  }
  const nextBtn = () => setButtons([{ icon: '▶', text: 'Tiếp', cls: 'ls-next', on: advance }]);

  function advance() {
    if (lineIdx < lines.length) {
      const [who, text] = lines[lineIdx++];
      showLine(who, fill(text));
      if (lineIdx < lines.length || afterLines?.needsTap) nextBtn();
      else { const f = afterLines; afterLines = null; f?.(); }
      return;
    }
    const f = afterLines;
    afterLines = null;
    f?.();
  }
  talk.onclick = (e) => {
    if (e.target.closest('[data-act="say"]')) return;
    if (btns[0].classList.contains('ls-next')) { sfx.tap(); advance(); }
  };

  // ── chạy node ──
  function go(id) {
    const n = story.nodes[id];
    if (!n) { console.warn('[life] thiếu node', id); return; }
    curNode = id;
    if (n.choose) lastChoice = { id, sceneId, state: { ...state }, shown: { ...shown } };
    if (n.scene) setScene(n.scene);
    if (n.set) state = { ...state, ...n.set };
    applyState();
    const prev = shown;
    if (n.show) shown = { ...shown, ...n.show };
    drawCast(prev);
    lines = n.say || [];
    lineIdx = 0;
    if (n.end) afterLines = Object.assign(() => finish(id, n), { needsTap: true });
    else if (n.choose) afterLines = () => choose(n);
    else if (n.act) afterLines = Object.assign(() => act(n.act), { needsTap: !!n.say?.length });
    else if (n.next) afterLines = Object.assign(() => go(n.next), { needsTap: true });
    if (lines.length) advance();
    else { const f = afterLines; afterLines = null; f?.(); }
  }

  function choose(n) {
    if (!n.say?.length) showPrompt(n.ask || 'Em sẽ làm gì?');
    setButtons(n.choose.map((c) => ({ icon: c.icon, text: fill(c.text), on: () => go(c.go) })));
  }

  function act(a) {
    let step = 0;
    // Dòng tiến độ: ✅ cho bước đã làm (vd. nhìn trái, phải, trái)
    const progress = () => (a.order.length > 1 ? `
${a.order.map((k, j) => (j < step ? '✅' : a.buttons[k].icon)).join('  ')}` : '');
    const prompt = (t) => { showPrompt(t); lineEl.textContent = t + progress(); };
    prompt(a.prompt);
    const list = a.buttons.map((b, i) => ({
      icon: b.icon, text: b.text,
      on: (el) => {
        if (a.order[step] !== i) {
          sfx.boing();
          el.classList.remove('ls-no'); void el.offsetWidth; el.classList.add('ls-no');
          prompt(step === 0 ? a.wrong || a.prompt : `Tiếp theo: ${a.buttons[a.order[step]].text.toLowerCase()}.`);
          return;
        }
        if (a.look) { state = { ...state, look: a.look[step] }; applyState(); }
        sfx.pop(step);
        step++;
        lineEl.textContent = a.prompt + progress();
        if (step < a.order.length) return;
        state = { ...state, look: null, ...(a.set || {}) };
        setTimeout(() => { if (alive) { applyState(); go(a.go); } }, a.look ? 900 : 300);
      },
    }));
    setButtons(list);
  }

  function finish(id, n) {
    const kind = END_KIND[n.end];
    const first = !found.has(id);
    found.add(id);
    drawDots();
    state = { ...state, alert: null };
    applyState();
    endEl.style.setProperty('--end', kind.color);
    endEl.innerHTML = `<div class="ls-end-ic">${kind.icon}</div>
      <div class="ls-end-kind">${kind.label}</div>
      <div class="ls-end-title">${n.title}</div>
      <div class="ls-end-book">📔 Em đã tìm ${endings.filter((e) => found.has(e.id)).length} / ${endings.length} kết cục${first ? ' · mới!' : ''}</div>`;
    endEl.classList.add('on');
    if (n.end === 'best') { sfx.ding(); rain(1800); } else sfx.swish();
    showLine(null, fill(n.learn), { learn: true });
    onEnd?.(id, n, first);
    setButtons([
      ...(lastChoice ? [{ icon: '🔁', text: 'Chọn cách khác', on: retry }] : []),
      { icon: '⏮️', text: 'Chơi lại từ đầu', on: restart },
      { icon: '📖', text: 'Truyện khác', on: exit },
    ]);
  }

  function hideEnd() { endEl.classList.remove('on'); }
  function retry() {
    hideEnd();
    const lc = lastChoice;
    setScene(lc.sceneId);
    state = { ...lc.state };
    const prev = shown;
    shown = { ...lc.shown };
    drawCast(prev);
    go(lc.id);
  }
  function restart() {
    hideEnd();
    state = {};
    const prev = shown;
    shown = {};
    drawCast(prev);
    lastChoice = null;
    go(story.start);
  }
  function exit() {
    alive = false;
    stopSpeaking();
    window.removeEventListener('resize', fit);
    onExit?.();
  }

  root.querySelector('[data-act="back"]').onclick = exit;
  root.querySelector('[data-act="say"]').onclick = () => say(lineEl.textContent);
  muteBtn.onclick = () => { setMuted(!isMuted()); if (isMuted()) stopSpeaking(); drawMute(); };

  go(story.start);
  if (import.meta.env.DEV) window.__life = { go, story, get node() { return curNode; } };
}
