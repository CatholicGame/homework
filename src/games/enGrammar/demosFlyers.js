/**
 * 🎮 Thử xem cho các bài Flyers mới (g54–g64). Định dạng như DEMOS trong demos.js.
 */
import { person } from '../tiengViet3/cast.js';
import { cloud, sun, tree } from '../tiengViet3/sceneKit.js';
import { G, k, at, FONT, label, bubble, outdoor, indoor, table, S, elephant, umbrella, bird, fish, iceCream, pizza, banana, tv, badge, heart, sea } from './demos.js';
import { plane, basket, fire, soap, toothbrush, notes, gift, cake, plate, glass, win, bed, coat, teddy, sheep, phone, book, snow, greyClouds, card, chip, arrowR, sky } from './demosMore.js';

// g54 was doing ... when ...
const g54 = {
  groups: [{ key: 'a', opts: [{ v: 'reading', label: 'reading', sub: 'đọc sách' }, { v: 'watching TV', label: 'watching TV', sub: 'xem ti vi' }] },
    { key: 'e', opts: [{ v: 'phone', label: 'the phone rang', sub: 'điện thoại reo' }, { v: 'rain', label: 'it started to rain', sub: 'trời đổ mưa' }] }],
  init: { a: 'reading', e: 'phone' },
  say: ({ a, e }) => ({
    en: `I *was ${a}* when ${e === 'phone' ? 'the phone rang' : 'it started to rain'}.`,
    vi: `Tớ đang ${a === 'reading' ? 'đọc sách' : 'xem ti vi'} thì ${e === 'phone' ? 'điện thoại reo' : 'trời đổ mưa'}.`,
  }),
  draw: ({ a, e }) => indoor()
    + `<rect x="350" y="22" width="96" height="70" fill="${e === 'rain' ? '#94A3B8' : '#BAE6FD'}"/>${e === 'rain' ? k('rain', [0, 1, 2, 3, 4, 5].map((i) => `<path d="M${362 + i * 14} ${32 + (i % 2) * 22} l-4 12" stroke="#1D4ED8" stroke-width="2.4" stroke-linecap="round"/>`).join('')) : ''}<path d="M398 22 V92 M350 57 H446" stroke="#6B4A3A" stroke-width="1.5"/>`
    + (a === 'reading' ? person(170, G, 'bon', 'hold', { s: 1.1, mood: e === 'phone' ? 'wow' : 'happy', prop: 'calf' }) + at(170, G - 66, book())
      : at(260, G, `<rect x="-34" y="-50" width="68" height="50" fill="#A16207" ${S(1)}/>`) + at(260, G - 50, tv(), 1.3) + person(140, G, 'bon', 'stand', { s: 1.05, mood: 'wow' }))
    + (e === 'phone' ? k('phone', at(380, G - 6, `<rect x="-30" y="-40" width="60" height="40" fill="#A16207" ${S(1)}/>`) + at(380, G - 46, phone(true), 0.9)) : '')
    + k('was', at(130, 40, label(0, 0, `was ${a}`, { s: 22 })))
    + k('when', at(e === 'phone' ? 380 : 398, e === 'phone' ? 150 : 112, label(0, 0, e === 'phone' ? 'Ring! Ring!' : 'Rain!', { s: 16, c: '#B45309', bg: '#FEF3C7' }))),
};

// g55 Have you ever ...? Yes, I have. / No, I haven't.
const EVER = {
  elephant: [true, 'seen an elephant', 'nhìn thấy voi', () => elephant(), 0.55],
  plane: [false, 'flown in a plane', 'đi máy bay', () => plane(), 0.9],
  sea: [true, 'swum in the sea', 'bơi ở biển', () => fish(), 1],
};
const g55 = {
  groups: [{ key: 'x', opts: [{ v: 'elephant', label: 'seen', sub: 'thấy voi' }, { v: 'plane', label: 'flown', sub: 'đi máy bay' }, { v: 'sea', label: 'swum', sub: 'bơi ở biển' }] }],
  init: { x: 'elephant' },
  say: ({ x }) => {
    const [yes, p, vi] = EVER[x];
    return { en: `*Have you ever* ${p}? ${yes ? 'Yes, I have.' : "No, I haven't."}`, vi: `Bạn đã bao giờ ${vi} chưa? ${yes ? 'Rồi.' : 'Chưa.'}` };
  },
  draw: ({ x }) => {
    const rows = Object.entries(EVER).map(([key, [yes, p, , fn, sc]], i) => {
      const y = 92 + i * 60, on = key === x;
      return `<g opacity="${on ? 1 : 0.55}"><rect x="24" y="${y - 26}" width="268" height="52" rx="12" fill="${on ? '#FEF9C3' : '#fff'}" stroke="${on ? '#D97706' : '#E2E8F0'}" stroke-width="${on ? 2.5 : 1.2}"/>
        ${at(62, y + 18, fn(), sc * 0.7)}<text x="100" y="${y + 6}" font-family="${FONT}" font-weight="800" font-size="16" fill="#334155">ever ${p.split(' ')[0]}?</text>${badge(yes, 268, y, 13)}</g>`;
    }).join('');
    const yes = EVER[x][0];
    return indoor() + `<rect x="12" y="20" width="292" height="230" rx="16" fill="#fff" stroke="#6B4A3A" stroke-width="1.4"/><rect x="12" y="20" width="292" height="36" rx="16" fill="#7C3AED"/><rect x="12" y="42" width="292" height="14" fill="#7C3AED"/>
      <text x="158" y="45" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="17" fill="#fff">Have you ever...?</text>` + rows
      + person(392, G, 'na', 'stand', { s: 1.1, mood: yes ? 'joy' : 'happy', flip: true })
      + k('ans', at(390, 100, bubble(0, 0, yes ? 'Yes, I have.' : "No, I haven't.", 16)));
  },
};

// g56 just / already / yet
const g56 = {
  groups: [{ key: 'w', opts: [{ v: 'yet', label: 'yet', sub: 'chưa' }, { v: 'just', label: 'just', sub: 'vừa mới' }, { v: 'already', label: 'already', sub: 'rồi (sớm)' }] }],
  init: { w: 'yet' },
  say: ({ w }) => ({
    yet: { en: "He hasn't eaten the cake *yet*.", vi: 'Bạn ấy chưa ăn bánh.' },
    just: { en: 'He has *just* eaten the cake.', vi: 'Bạn ấy vừa ăn bánh xong.' },
    already: { en: 'Wow! He has *already* eaten the cake!', vi: 'Ôi! Bạn ấy ăn bánh xong rồi!' },
  })[w],
  draw: ({ w }) => {
    const eaten = w !== 'yet';
    const crumbs = `<g>${[[-20, -6], [10, -8], [24, -4], [-4, -10]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#F9A8D4"/>`).join('')}</g>`;
    return indoor() + at(250, G, table(), 1.1)
      + at(250, G - 92, plate()) + k('cake', eaten ? at(250, G - 92, crumbs) : at(250, G - 96, cake(3), 0.8))
      + person(130, G, 'minh', eaten ? 'cheer' : 'stand', { s: 1.05, mood: 'joy' })
      + (w === 'already' ? person(390, G, 'me', 'stand', { s: 1, mood: 'wow', flip: true }) + k('mum', at(390, 92, bubble(0, 0, 'Already?!', 16))) : '')
      + (w === 'just' ? k('clock', at(390, 120, label(0, 0, '1 minute ago', { s: 16, c: '#475569', bg: '#F1F5F9' }))) : '')
      + k('word', at(250, 44, label(0, 0, w, { s: 28 })));
  },
};

// g57 will / might / won't
const g57 = {
  groups: [{ key: 's', opts: [{ v: 'sunny', label: 'sunny sky', sub: 'trời nắng' }, { v: 'cloudy', label: 'some clouds', sub: 'có mây' }, { v: 'dark', label: 'dark clouds', sub: 'mây đen' }] }],
  init: { s: 'cloudy' },
  say: ({ s }) => ({
    sunny: { en: "It *won't* rain today.", vi: 'Hôm nay trời sẽ không mưa.' },
    cloudy: { en: 'It *might* rain. Take an umbrella.', vi: 'Trời có thể mưa. Mang ô đi.' },
    dark: { en: 'It *will* rain soon.', vi: 'Trời sắp mưa rồi.' },
  })[s],
  draw: ({ s }) => {
    const w = { sunny: "won't", cloudy: 'might', dark: 'will' }[s];
    const pct = { sunny: 0.05, cloudy: 0.5, dark: 0.95 }[s];
    return (s === 'sunny' ? outdoor() : outdoor({ noSun: true }) + greyClouds(s === 'dark'))
      + person(170, G, 'na', 'stand', { s: 1.05, mood: s === 'sunny' ? 'joy' : 'happy' })
      + (s === 'cloudy' ? k('umb', at(200, G - 30, umbrella(), 0.7)) : '')
      + `<g transform="translate(330 ${G - 150})"><rect width="120" height="22" rx="11" fill="#fff" stroke="#94A3B8" stroke-width="1.5"/>${k('bar', `<rect x="2" y="2" width="${116 * pct}" height="18" rx="9" fill="#2563EB"/>`)}
        <text x="60" y="44" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="13" fill="#475569">rain?</text></g>`
      + k('word', at(390, 60, label(0, 0, w, { s: 28, c: s === 'sunny' ? '#B91C1C' : '#1E3A8A' })));
  },
};

// g58 should
const ADV = {
  tired: ['You look tired. You *should* go to bed.', 'Trông con mệt. Con nên đi ngủ.', 'sleep', () => at(0, 22, bed(), 0.42)],
  cold: ["It's cold. You *should* wear a coat.", 'Trời lạnh. Con nên mặc áo khoác.', 'happy', () => at(0, 36, coat(), 0.8)],
  hungry: ["You're hungry. You *should* eat something.", 'Con đói. Con nên ăn gì đó.', 'sad', () => at(0, 34, pizza(), 0.7)],
};
const g58 = {
  groups: [{ key: 'p', opts: [{ v: 'tired', label: 'tired', sub: 'mệt' }, { v: 'cold', label: 'cold', sub: 'lạnh' }, { v: 'hungry', label: 'hungry', sub: 'đói' }] }],
  init: { p: 'tired' },
  say: ({ p }) => ({ en: ADV[p][0], vi: ADV[p][1] }),
  draw: ({ p }) => (p === 'cold' ? `<rect width="480" height="300" fill="#E0F2FE"/><rect y="${G - 10}" width="480" height="${310 - G}" fill="#fff"/>${snow(18)}` : indoor())
    + person(320, G, 'bon', 'stand', { s: 1.05, mood: ADV[p][2], flip: true })
    + person(120, G, 'coHuong', 'point', { s: 1, mood: 'happy' })
    + k(`th-${p}`, `<g><rect x="170" y="40" width="130" height="96" rx="40" fill="#fff" stroke="#94A3B8" stroke-width="1.5"/><g transform="translate(235 88)">${ADV[p][3]()}</g></g>`)
    + k('word', at(400, 150, label(0, 0, 'should', { s: 26, c: '#15803D' }))),
};

// g59 Shall we ...? / You could ...
const PLAN = {
  picnic: ['have a picnic', 'đi dã ngoại', () => outdoor() + tree(420, G, 0.9) + `<g transform="translate(240 ${G + 8})"><rect x="-70" y="-10" width="140" height="20" fill="#EF4444" opacity=".8"/>${at(0, 0, basket(), 0.8)}</g>`],
  beach: ['go to the beach', 'đi biển', () => outdoor() + sea(220)],
  film: ['watch a film', 'xem phim', () => indoor() + at(250, G - 40, tv(), 1.6) + at(250, G, `<rect x="-40" y="-40" width="80" height="40" fill="#A16207" ${S(1)}/>`)],
};
const g59 = {
  groups: [{ key: 'p', opts: [{ v: 'picnic', label: 'picnic', sub: 'dã ngoại' }, { v: 'beach', label: 'beach', sub: 'đi biển' }, { v: 'film', label: 'film', sub: 'xem phim' }] },
    { key: 'f', opts: [{ v: 'shall', label: 'Shall we...?', sub: 'rủ nhau' }, { v: 'could', label: 'You could...', sub: 'gợi ý' }] }],
  init: { p: 'picnic', f: 'shall' },
  say: ({ p, f }) => (f === 'shall' ? { en: `*Shall we* ${PLAN[p][0]}?`, vi: `Mình ${PLAN[p][1]} không?` } : { en: `You *could* ${PLAN[p][0]}.`, vi: `Bạn có thể ${PLAN[p][1]}.` }),
  draw: ({ p, f }) => k(`bg-${p}`, PLAN[p][2]())
    + person(110, G, 'lan', 'point', { s: 1, mood: 'joy' }) + person(200, G, 'tetsuo', f === 'shall' ? 'cheer' : 'stand', { s: 1, mood: 'joy', flip: true })
    + k('q', at(130, 60, bubble(0, 0, f === 'shall' ? 'Shall we...?' : 'You could...', 18))),
};

// g60 Câu hỏi đuôi
const TAGS = {
  pizza: ['You like pizza,', "don't you?", 'Bạn thích pizza, đúng không?', '+', '−', () => pizza()],
  swim: ["She can't swim,", 'can she?', 'Bạn ấy không biết bơi, phải không?', '−', '+', () => fish()],
  cold: ["It's cold,", "isn't it?", 'Trời lạnh, phải không?', '+', '−', () => coat()],
};
const g60 = {
  groups: [{ key: 's', opts: [{ v: 'pizza', label: 'You like pizza', sub: 'câu khẳng định' }, { v: 'swim', label: "She can't swim", sub: 'câu phủ định' }, { v: 'cold', label: "It's cold", sub: 'câu khẳng định' }] }],
  init: { s: 'pizza' },
  say: ({ s }) => ({ en: `${TAGS[s][0]} *${TAGS[s][1]}*`, vi: TAGS[s][2] }),
  draw: ({ s }) => {
    const [a, b, , sa, sb, fn] = TAGS[s];
    const pill = (x, t, sign, c) => `<g transform="translate(${x} 150)"><rect x="-104" y="-40" width="208" height="80" rx="20" fill="${c}" stroke="#6B4A3A" stroke-width="1.4"/>
      <text y="8" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="20" fill="#1E293B">${t}</text>
      <circle cx="-94" cy="-38" r="18" fill="#fff" stroke="#6B4A3A" stroke-width="1.4"/><text x="-94" y="-31" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="22" fill="${sign === '+' ? '#15803D' : '#B91C1C'}">${sign}</text></g>`;
    return sky() + k(`pic-${s}`, at(240, 82, fn(), 0.7))
      + k(`a-${s}`, pill(124, a, sa, sa === '+' ? '#DCFCE7' : '#FEE2E2'))
      + k(`b-${s}`, pill(360, b, sb, sb === '+' ? '#DCFCE7' : '#FEE2E2'))
      + `<path d="M150 230 Q240 280 330 230" stroke="#64748B" stroke-width="3" fill="none" stroke-dasharray="6 6"/><text x="240" y="276" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="14" fill="#64748B">đổi ngược</text>`;
  },
};

// g61 If ..., ...
const IF = {
  sunny: ["*If* it's sunny, we go swimming.", 'Nếu trời nắng, chúng tớ đi bơi.', "it's sunny", 'we go swimming'],
  rain: ['*If* it rains, we stay at home.', 'Nếu trời mưa, chúng tớ ở nhà.', 'it rains', 'we stay at home'],
  ice: ['*If* you heat ice, it melts.', 'Nếu làm nóng đá, đá tan.', 'you heat ice', 'it melts'],
};
const g61 = {
  groups: [{ key: 'c', opts: [{ v: 'sunny', label: 'sunny', sub: 'nắng' }, { v: 'rain', label: 'rain', sub: 'mưa' }, { v: 'ice', label: 'heat ice', sub: 'làm nóng đá' }] }],
  init: { c: 'sunny' },
  say: ({ c }) => ({ en: IF[c][0], vi: IF[c][1] }),
  draw: ({ c }) => {
    const L = c === 'sunny' ? sun(120, 120, 34) : c === 'rain' ? cloud(120, 110, 1.1, 0, '#94A3B8') + `<g>${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${80 + i * 16} ${140 + (i % 2) * 14} l-5 14" stroke="#2563EB" stroke-width="3" stroke-linecap="round"/>`).join('')}</g>`
      : `<rect x="96" y="96" width="48" height="48" rx="8" fill="#BAE6FD" stroke="#0284C7" stroke-width="2"/>${at(120, 210, fire(), 0.8)}`;
    const R = c === 'sunny' ? `<rect x="270" y="150" width="180" height="60" fill="#38BDF8"/>${person(360, 196, 'bon', 'raise', { s: 0.7, mood: 'joy' })}<rect x="270" y="170" width="180" height="40" fill="#38BDF8" opacity=".9"/>`
      : c === 'rain' ? `<rect x="280" y="80" width="160" height="130" fill="#FEF3C7"/>${at(400, 150, win(), 0.5)}${person(330, 206, 'bon', 'stand', { s: 0.72, mood: 'joy' })}`
        : `<ellipse cx="360" cy="180" rx="50" ry="12" fill="#7DD3FC" stroke="#0284C7" stroke-width="2"/><path d="M340 160 q6 -10 12 0" stroke="#0284C7" stroke-width="2" fill="none"/>`;
    return sky() + card(120, 140, 200, 170, '', { fill: '#FEF9C3' }) + card(360, 140, 200, 170, '')
      + k(`L-${c}`, L) + k(`R-${c}`, R) + arrowR(226, 254, 140)
      + k('if', chip(120, 30, 'If', 18))
      + k('lt', at(120, 252, label(0, 0, IF[c][2], { s: 15 }))) + k('rt', at(360, 252, label(0, 0, IF[c][3], { s: 15 })));
  },
};

// g62 so / before / after
const CON = {
  so: ['It was raining *so* I took an umbrella.', 'Trời mưa nên tớ mang ô.', 'raining', 'umbrella', 'nguyên nhân', 'kết quả'],
  before: ['I wash my hands *before* I eat.', 'Tớ rửa tay trước khi ăn.', 'wash hands', 'eat', '1', '2'],
  after: ['I brush my teeth *after* I eat.', 'Tớ đánh răng sau khi ăn.', 'eat', 'brush teeth', '1', '2'],
};
const g62 = {
  groups: [{ key: 'c', opts: [{ v: 'so', label: 'so', sub: 'nên' }, { v: 'before', label: 'before', sub: 'trước khi' }, { v: 'after', label: 'after', sub: 'sau khi' }] }],
  init: { c: 'so' },
  say: ({ c }) => ({ en: CON[c][0], vi: CON[c][1] }),
  draw: ({ c }) => {
    const icon = (n) => ({
      raining: cloud(0, -40, 0.9, 0, '#94A3B8') + `<g>${[0, 1, 2, 3].map((i) => `<path d="M${-24 + i * 16} -10 l-5 14" stroke="#2563EB" stroke-width="3" stroke-linecap="round"/>`).join('')}</g>`,
      umbrella: at(0, 30, umbrella(), 0.8), 'wash hands': at(0, 30, soap(), 1.2), eat: at(0, 30, pizza(), 0.8), 'brush teeth': at(0, 40, toothbrush(), 1),
    })[n];
    const [, , a, b, la, lb] = CON[c];
    return sky() + card(120, 140, 200, 170, `<g transform="translate(120 140)">${icon(a)}</g>`) + card(360, 140, 200, 170, `<g transform="translate(360 140)">${icon(b)}</g>`)
      + label(120, 252, la, { s: 15 }) + label(360, 252, lb, { s: 15 })
      + k(`chip-${c}`, chip(240, 140, c, 20));
  },
};

// g63 looks like / sounds like / tastes like / What's ... like?
const LK = {
  looks: ['That cloud *looks like* a sheep.', 'Đám mây kia trông giống con cừu.', () => cloud(0, 0, 1.6), () => sheep()],
  sounds: ['That *sounds like* a bird.', 'Nghe như tiếng chim.', () => at(0, 30, notes(), 1), () => bird(false)],
  tastes: ['This ice cream *tastes like* banana.', 'Kem này có vị giống chuối.', () => iceCream(), () => banana()],
  like: ["*What's* your teacher *like*? She's kind.", 'Cô giáo bạn thế nào? Cô hiền.', () => person(0, 50, 'coHuong', 'wave', { s: 0.8, mood: 'joy' }), () => heart(0, -20, 2.4)],
};
const g63 = {
  groups: [{ key: 'w', opts: [{ v: 'looks', label: 'looks like', sub: 'trông giống' }, { v: 'sounds', label: 'sounds like', sub: 'nghe giống' }, { v: 'tastes', label: 'tastes like', sub: 'vị giống' }, { v: 'like', label: "What's...like?", sub: 'ra sao' }] }],
  init: { w: 'looks' },
  say: ({ w }) => ({ en: LK[w][0], vi: LK[w][1] }),
  draw: ({ w }) => sky('#E0F2FE')
    + card(120, 150, 200, 190, '', { fill: w === 'looks' ? '#7DD3FC' : '#fff' }) + card(360, 150, 200, 190, '')
    + k(`L-${w}`, at(120, w === 'looks' ? 140 : 180, LK[w][2](), w === 'tastes' ? 1.3 : 1))
    + k(`R-${w}`, at(360, 190, LK[w][3](), w === 'like' ? 1 : 1.5))
    + k('chip', chip(240, 40, w === 'like' ? "What's...like?" : `${w} like`, 20)),
};

// g64 make me hungry / made of
const MK = {
  hungry: ['That smell *makes me hungry*!', 'Mùi đó làm tớ đói bụng!', () => at(0, 40, pizza(), 1) + `<path d="M-20 -50 q8 -14 0 -28 M4 -50 q8 -14 0 -28" stroke="#94A3B8" stroke-width="3" fill="none"/>`, 'makes me hungry'],
  happy: ['Presents *make me happy*.', 'Quà làm tớ vui.', () => at(0, 40, gift(), 1.2), 'make me happy'],
  wood: ['The teddy *is made of* wood.', 'Con gấu được làm bằng gỗ.', () => at(0, 50, teddy(), 1.2), 'made of wood'],
  glass: ['The bottle *is made of* glass.', 'Cái chai được làm bằng thuỷ tinh.', () => at(0, 50, glass('#BAE6FD'), 1.3), 'made of glass'],
};
const g64 = {
  groups: [{ key: 'm', opts: [{ v: 'hungry', label: 'hungry', sub: 'đói' }, { v: 'happy', label: 'happy', sub: 'vui' }, { v: 'wood', label: 'wood', sub: 'gỗ' }, { v: 'glass', label: 'glass', sub: 'thuỷ tinh' }] }],
  init: { m: 'hungry' },
  say: ({ m }) => ({ en: MK[m][0], vi: MK[m][1] }),
  draw: ({ m }) => {
    const make = m === 'hungry' || m === 'happy';
    const mat = m === 'wood' ? `<g transform="translate(380 150)"><rect x="-50" y="-26" width="100" height="52" rx="6" fill="#D6A26B" stroke="#6B4A3A" stroke-width="1.4"/><path d="M-40 -10 Q0 -18 40 -10 M-40 8 Q0 0 40 8" stroke="#A16207" stroke-width="2" fill="none"/></g>`
      : `<g transform="translate(380 150)"><rect x="-40" y="-40" width="80" height="80" rx="8" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/><path d="M-26 -24 L-6 -4 M-10 -28 L10 -8" stroke="#fff" stroke-width="5" stroke-linecap="round"/></g>`;
    return (make ? indoor() : sky('#FFF7ED'))
      + k(`it-${m}`, at(make ? 300 : 150, 160, MK[m][2]()))
      + (make ? person(130, G, 'bon', 'stand', { s: 1.1, mood: 'joy' }) : k('mat', mat) + arrowR(230, 320, 150))
      + k('word', at(200, 40, label(0, 0, MK[m][3], { s: 24 })));
  },
};

export const FLYERS_DEMOS = { g54, g55, g56, g57, g58, g59, g60, g61, g62, g63, g64 };
