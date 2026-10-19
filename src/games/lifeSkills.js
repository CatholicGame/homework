/**
 * 🏘️ Phố Kỹ Năng: trang kỹ năng sống riêng, cùng một thẻ cho mọi lớp (data/grades.js). Thiết kế: docs/ky-nang-song/thiet-ke.md.
 *   chọn nhân vật (Bin / Na, lần đầu) → bản đồ phố (8 địa điểm) → danh sách truyện của địa điểm → truyện (lifeSkills/engine.js).
 * Tiến độ: { hero, found: { truyện: [kết cục…] } } ở khoá 'life-v1' (scopedKey, đồng bộ Drive qua cloudSync.js).
 * Sao: kết cục 🌟 lần đầu → awardStars('life{lớp}:{truyện}:{kết cục}'), lớp theo hồ sơ (BOOK_GRADE trong engine/stars.js).
 */

import { injectStyles } from './lifeSkills/styles.js';
import { townSvg, SCENES } from './lifeSkills/scenes.js';
import { STORIES, PLACES, endingsOf } from './lifeSkills/stories.js';
import { playStory, HEROES, END_KIND, npcImgSrc } from './lifeSkills/engine.js';
import { enterGameMode, exitGameMode } from './grade3Games/loop.js';
import { stopSpeaking, say } from './preschool/fx.js';
import { scopedKey } from '../engine/auth.js';
import { awardStars } from '../engine/stars.js';
import { getProfileGrade } from '../engine/profile.js';
import { PRESCHOOL } from '../data/grades.js';

const KEY = 'life-v1';

function load() {
  try {
    const d = JSON.parse(localStorage.getItem(scopedKey(KEY)));
    if (d && typeof d === 'object') return { hero: d.hero || null, found: d.found || {} };
  } catch { /* ignore */ }
  return { hero: null, found: {} };
}
function save(d) {
  try { localStorage.setItem(scopedKey(KEY), JSON.stringify(d)); } catch { /* storage unavailable */ }
  window.dispatchEvent(new CustomEvent('tth:data-changed'));
}

const starPrefix = () => {
  const g = getProfileGrade();
  return g === PRESCHOOL ? 'lifep' : g >= 1 && g <= 5 ? `life${g}` : 'life1';
};

const heroImg = (h) => npcImgSrc(HEROES[h].npc);

export function render(app, onBack) {
  injectStyles();
  enterGameMode();
  const data = load();
  const leave = () => { stopSpeaking(); exitGameMode(); onBack(); };

  const top = (title, { back, hero = true } = {}) => `
    <div class="ls-top">
      <button class="ls-pill ls-icon" data-act="back" aria-label="Quay lại">←</button>
      <span class="ls-pill">${title}</span>
      <span class="ls-spacer"></span>
      ${hero && data.hero ? `<button class="ls-pill" data-act="hero" aria-label="Đổi nhân vật"><img src="${heroImg(data.hero)}" alt="" style="height:36px;width:36px;object-fit:cover;object-position:50% 0;border-radius:50%">${HEROES[data.hero].name}</button>` : ''}
    </div>`;
  const wire = (root, back) => {
    root.querySelector('[data-act="back"]').onclick = back;
    const hb = root.querySelector('[data-act="hero"]');
    if (hb) hb.onclick = () => pickHero(back === leave ? showMap : back);
  };

  function pickHero(after = showMap) {
    app.innerHTML = `<div class="ls-root">
      <div class="ls-bg">${townSvg()}</div>
      ${top('🏘️ Em là bạn nào?', { hero: false })}
      <div class="ls-menu ls-heroes">${Object.entries(HEROES).map(([id, h]) => `
        <button class="ls-card ls-hero" data-hero="${id}" style="--c:${id === 'bin' ? '#22C55E' : '#F472B6'}">
          <img src="${heroImg(id)}" alt="${h.name}" draggable="false">
          <span class="ls-card-t">${h.name}</span>
        </button>`).join('')}</div>
    </div>`;
    say('Em là bạn nào? Chọn Bin hoặc Na.');
    const root = app.querySelector('.ls-root');
    wire(root, data.hero ? after : leave);
    root.querySelectorAll('[data-hero]').forEach((b) => {
      b.onclick = () => { data.hero = b.dataset.hero; save(data); after(); };
    });
  }

  const foundOf = (story) => new Set(data.found[story.id] || []);
  const bestCount = (stories) => stories.reduce((s, st) => s + endingsOf(st).filter((e) => e.end === 'best' && foundOf(st).has(e.id)).length, 0);
  const bestTotal = (stories) => stories.reduce((s, st) => s + endingsOf(st).filter((e) => e.end === 'best').length, 0);

  function showMap() {
    app.innerHTML = `<div class="ls-root">
      <div class="ls-bg">${townSvg()}</div>
      ${top('🏘️ Phố Kỹ Năng')}
      <div class="ls-menu ls-places">${PLACES.map((p) => {
        const stories = STORIES.filter((s) => s.place === p.id);
        const sub = stories.length ? `🌟 ${bestCount(stories)} / ${bestTotal(stories)}` : 'Sắp có';
        return `<button class="ls-card${stories.length ? '' : ' ls-soon'}" data-place="${p.id}" style="--c:${p.color}">
          <span class="ls-card-ic">${p.icon}</span><span class="ls-card-t">${p.title}</span><span class="ls-card-s">${sub}</span></button>`;
      }).join('')}</div>
    </div>`;
    const root = app.querySelector('.ls-root');
    wire(root, leave);
    root.querySelectorAll('[data-place]').forEach((b) => {
      b.onclick = () => {
        const p = PLACES.find((x) => x.id === b.dataset.place);
        if (!STORIES.some((s) => s.place === p.id)) { say(`${p.title}: truyện đang được viết, em quay lại sau.`); return; }
        showPlace(p);
      };
    });
  }

  function showPlace(p) {
    const stories = STORIES.filter((s) => s.place === p.id);
    app.innerHTML = `<div class="ls-root">
      <div class="ls-bg">${townSvg()}</div>
      ${top(`${p.icon} ${p.title}`)}
      <div class="ls-menu ls-stories">${stories.map((s) => {
        const f = foundOf(s);
        const ends = endingsOf(s);
        // Thẻ truyện = hình cảnh mở đầu của truyện (lấp chỗ trống) + dải tên, sổ kết cục
        return `<button class="ls-card ls-story" data-story="${s.id}" style="--c:${p.color}">
          <span class="ls-prev">${SCENES[s.nodes[s.start].scene].svg()}</span>
          <span class="ls-story-b"><span class="ls-card-ic">${s.icon}</span>
            <span class="ls-story-t"><span class="ls-card-t">${s.title}</span>
              <span class="ls-card-s">📔 ${ends.map((e) => (f.has(e.id) ? END_KIND[e.end].icon : '❔')).join(' ')} · ${ends.filter((e) => f.has(e.id)).length} / ${ends.length} kết cục</span></span>
            <span class="ls-play">▶</span></span>
        </button>`;
      }).join('')}</div>
    </div>`;
    const root = app.querySelector('.ls-root');
    wire(root, showMap);
    root.querySelectorAll('[data-story]').forEach((b) => {
      b.onclick = () => openStory(STORIES.find((s) => s.id === b.dataset.story), () => showPlace(p));
    });
  }

  function openStory(story, back) {
    const found = foundOf(story);
    playStory(app, story, {
      hero: data.hero,
      found,
      onEnd: (endId, node) => {
        data.found[story.id] = [...found];
        save(data);
        if (node.end === 'best') awardStars(`${starPrefix()}:${story.id}:${endId}`, { stars: node.stars || 2 });
      },
      onExit: back,
    });
  }

  if (data.hero) showMap();
  else pickHero();
}
