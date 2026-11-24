/**
 * 🎮 Thử xem cho các bài Movers mới (g39–g53). Định dạng như DEMOS trong demos.js.
 */
import { person } from '../tiengViet3/cast.js';
import { cloud, sun, tree, thought, school } from '../tiengViet3/sceneKit.js';
import { G, k, at, FONT, label, bubble, outdoor, indoor, cat, dog, ball, table, bag, S, apple, umbrella, bike, pizza, turtle, tv, badge, motion, clock } from './demos.js';
import { toothbrush, cheese, rabbit, swimmer, glass, door, win, bed, book, lamp, rain, snow, greyClouds, shop, card, chip, ring, arrowR, sky } from './demosMore.js';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const rainIn = (x0, y0, w, h, n = 10) => Array.from({ length: n }, (_, i) => `<path d="M${x0 + ((i * 37) % w)} ${y0 + ((i * 23) % h)} l-4 11" stroke="#2563EB" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>`).join('');

// g39 could / couldn't (hồi đó) và can (bây giờ)
const g39 = {
  groups: [{ key: 't', opts: [{ v: 'then', label: 'When I was two', sub: 'hồi hai tuổi' }, { v: 'now', label: 'Now', sub: 'bây giờ' }] },
    { key: 'a', opts: [{ v: 'read', label: 'read', sub: 'đọc' }, { v: 'ride', label: 'ride a bike', sub: 'đi xe đạp' }] }],
  init: { t: 'then', a: 'read' },
  say: ({ t, a }) => {
    const act = a === 'read' ? 'read' : 'ride a bike', vi = a === 'read' ? 'đọc' : 'đi xe đạp';
    return t === 'then' ? { en: `When I was two, I *couldn't* ${act}.`, vi: `Hồi hai tuổi, tớ chưa biết ${vi}.` } : { en: `Now I *can* ${act}.`, vi: `Bây giờ tớ biết ${vi} rồi.` };
  },
  draw: ({ t, a }) => {
    const then = t === 'then';
    const cap = (x, txt, c) => `<text x="${x}" y="50" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="18" fill="${c}">${txt}</text>`;
    const left = person(130, 236, 'bon', 'stand', { s: 0.62, mood: 'sad' }) + (a === 'read' ? at(178, 200, book(), 0.6) : at(178, 236, bike(), 0.55)) + badge(false, 196, 92, 18);
    const right = (a === 'read' ? person(350, 236, 'bon', 'hold', { s: 0.95, mood: 'joy', prop: 'calf' }) + at(350, 182, book(), 0.9) : person(320, 236, 'bon', 'stand', { s: 0.95, mood: 'joy' }) + at(380, 236, bike(), 0.9)) + badge(true, 420, 92, 18);
    return sky('#FFF7ED')
      + card(130, 140, 210, 220, cap(130, 'age 2', '#B45309'), { on: then, edge: then ? '#F59E0B' : '' })
      + card(350, 140, 210, 220, cap(350, 'now', '#15803D'), { on: !then, edge: then ? '' : '#22C55E' })
      + k(`L-${a}`, `<g opacity="${then ? 1 : 0.4}">${left}</g>`) + k(`R-${a}`, `<g opacity="${then ? 0.4 : 1}">${right}</g>`)
      + k('word', at(240, 278, label(0, 0, then ? "couldn't" : 'can', { s: 22, c: then ? '#B91C1C' : '#15803D' })));
  },
};

// g40 must / mustn't
const RULE = {
  teeth: [true, 'You *must* brush your teeth.', 'Con phải đánh răng.'],
  red: [false, "You *mustn't* cross. The light is red.", 'Không được qua đường. Đèn đang đỏ.'],
  cheese: [false, "You *mustn't* give the rabbit cheese.", 'Không được cho thỏ ăn phô mai.'],
};
const g40 = {
  groups: [{ key: 'r', opts: [{ v: 'teeth', label: 'brush teeth', sub: 'đánh răng' }, { v: 'red', label: 'red light', sub: 'đèn đỏ' }, { v: 'cheese', label: 'rabbit + cheese', sub: 'thỏ và phô mai' }] }],
  init: { r: 'teeth' },
  say: ({ r }) => ({ en: RULE[r][1], vi: RULE[r][2] }),
  draw: ({ r }) => {
    const ok = RULE[r][0];
    const scene = r === 'red'
      ? outdoor({ noSun: true }) + `<rect x="0" y="${G - 4}" width="480" height="${304 - G}" fill="#64748B"/>${[40, 120, 200, 280, 360].map((x) => `<rect x="${x}" y="${G + 12}" width="50" height="10" fill="#fff"/>`).join('')}
        <g transform="translate(410 ${G})"><rect x="-4" y="-150" width="8" height="150" fill="#334155"/><rect x="-18" y="-214" width="36" height="74" rx="8" fill="#1E293B"/><circle cy="-194" r="11" fill="#EF4444"/><circle cy="-160" r="11" fill="#475569"/></g>`
      : indoor();
    const pic = r === 'teeth' ? at(320, G - 30, toothbrush(), 1.2) : r === 'cheese' ? at(310, G, cheese(), 1.1) + at(410, G, rabbit(), 1.1) : '';
    return scene
      + person(80, G, r === 'cheese' ? 'me' : 'coHuong', 'point', { s: 1, mood: 'happy' })
      + person(200, G, 'bon', 'stand', { s: 1.05, mood: ok ? 'joy' : 'wow' })
      + k(`pic-${r}`, pic)
      + k('badge', badge(ok, r === 'red' ? 330 : 350, G - 120, 24))
      + k('word', at(240, 46, label(0, 0, ok ? 'must' : "mustn't", { s: 28, c: ok ? '#15803D' : '#B91C1C' })));
  },
};

// g41 have to / has to / had to
const g41 = {
  groups: [{ key: 'w', opts: [{ v: 'I', label: 'I', sub: 'tớ' }, { v: 'She', label: 'She', sub: 'bạn ấy' }] },
    { key: 't', opts: [{ v: 'now', label: 'every day', sub: 'hằng ngày' }, { v: 'past', label: 'yesterday', sub: 'hôm qua' }] }],
  init: { w: 'I', t: 'now' },
  say: ({ w, t }) => {
    const v = t === 'past' ? 'had to' : w === 'She' ? 'has to' : 'have to';
    return { en: `${w} *${v}* walk the dog ${t === 'past' ? 'yesterday' : 'every day'}.`, vi: `${w === 'I' ? 'Tớ' : 'Bạn ấy'} ${t === 'past' ? 'hôm qua đã phải' : 'ngày nào cũng phải'} dắt chó đi dạo.` };
  },
  draw: ({ w, t }) => {
    const v = t === 'past' ? 'had to' : w === 'She' ? 'has to' : 'have to';
    const x = t === 'past' ? 200 : 260;
    return outdoor() + tree(50, G, 0.8)
      + k('kid', person(x, G, w === 'She' ? 'na' : 'bon', 'walk', { s: 1, mood: 'happy' }))
      + k('dog', at(x + 100, G, dog(), 0.8))
      + k('lead', `<path d="M${x + 16} ${G - 66} Q${x + 50} ${G - 30} ${x + 82} ${G - 44}" stroke="#DC2626" stroke-width="2" fill="none"/>`)
      + k('day', at(390, 46, label(0, 0, t === 'past' ? 'yesterday' : 'every day', { s: 18, c: '#475569', bg: '#F1F5F9' })))
      + k('word', at(150, 46, label(0, 0, `${w} ${v}`, { s: 26 })));
  },
};

// g42 want to / want someone to
const g42 = {
  groups: [{ key: 'm', opts: [{ v: 'self', label: 'I want to...', sub: 'tớ muốn' }, { v: 'other', label: 'Mum wants me to...', sub: 'mẹ muốn tớ' }] },
    { key: 'a', opts: [{ v: 'eat', label: 'eat', sub: 'ăn' }, { v: 'sleep', label: 'sleep', sub: 'ngủ' }] }],
  init: { m: 'self', a: 'eat' },
  say: ({ m, a }) => (m === 'self' ? { en: `I *want to* ${a}.`, vi: `Tớ muốn ${a === 'eat' ? 'ăn' : 'ngủ'}.` } : { en: `Mum *wants me to* ${a}.`, vi: `Mẹ muốn tớ ${a === 'eat' ? 'ăn' : 'ngủ'}.` }),
  draw: ({ m, a }) => {
    const self = m === 'self';
    const pic = a === 'eat' ? at(0, 34, pizza(), 0.75) : at(0, 22, bed(), 0.42);
    const tx = self ? 290 : 110;
    return indoor()
      + person(290, G, 'bon', 'stand', { s: 1.05, mood: self ? 'joy' : 'happy' })
      + person(110, G, 'me', self ? 'stand' : 'point', { s: 1, mood: 'happy' })
      + k(`th-${m}-${a}`, thought(tx + (self ? -80 : 80), 76, 130, 96, tx + (self ? -14 : 14), 140, pic))
      + k('word', at(380, 200, label(0, 0, self ? 'want to' : 'wants me to', { s: 20 })));
  },
};

// g43 to + mục đích
const PURP = {
  shop: ['the shop', 'to buy milk', 'cửa hàng', 'để mua sữa', () => shop(380), () => glass('#fff')],
  park: ['the park', 'to play football', 'công viên', 'để đá bóng', () => tree(340, G, 1) + tree(430, G, 0.8), () => ball(22, '#fff')],
  school: ['school', 'to learn', 'trường', 'để học', () => school(300, G, 170, 100), () => book()],
};
const g43 = {
  groups: [{ key: 'p', opts: Object.keys(PURP).map((p) => ({ v: p, label: p, sub: PURP[p][2] })) }],
  init: { p: 'shop' },
  say: ({ p }) => ({ en: `I went to ${PURP[p][0]} *${PURP[p][1]}*.`, vi: `Tớ đã đến ${PURP[p][2]} ${PURP[p][3]}.` }),
  draw: ({ p }) => outdoor() + k(`pl-${p}`, PURP[p][4]())
    + person(110, G, 'bon', 'walk', { s: 1, mood: 'joy' }) + `<g opacity=".6">${arrowR(150, 280, G - 24, '#2563EB')}</g>`
    + k(`th-${p}`, thought(170, 82, 110, 84, 126, 136, at(0, 30, PURP[p][5](), 0.9)))
    + k('word', at(330, 40, label(0, 0, PURP[p][1], { s: 22 }))),
};

// g44 slowly / quickly / more quickly than
const g44 = {
  groups: [{ key: 'a', opts: [{ v: 'turtle', label: 'turtle', sub: 'con rùa' }, { v: 'dog', label: 'dog', sub: 'con chó' }, { v: 'both', label: 'more quickly', sub: 'so sánh' }] }],
  init: { a: 'turtle' },
  say: ({ a }) => ({
    turtle: { en: 'The turtle walks *slowly*.', vi: 'Con rùa đi chậm.' }, dog: { en: 'The dog runs *quickly*.', vi: 'Con chó chạy nhanh.' },
    both: { en: 'The dog runs *more quickly than* the turtle.', vi: 'Con chó chạy nhanh hơn con rùa.' },
  })[a],
  draw: ({ a }) => {
    const lane = (y) => `<rect x="20" y="${y - 6}" width="440" height="12" rx="6" fill="#FDE68A" opacity=".85"/>`;
    return outdoor() + lane(G - 70) + lane(G + 6) + `<path d="M446 ${G - 116} V${G + 22}" stroke="#fff" stroke-width="6" stroke-dasharray="10 8"/>`
      + `<g opacity="${a === 'dog' ? 0.35 : 1}">${k('turtle', at(a === 'both' ? 150 : 180, G - 64, turtle(), 1.2))}</g>`
      + `<g opacity="${a === 'turtle' ? 0.35 : 1}">${k('dog', at(a === 'turtle' ? 110 : 390, G + 10, dog(), 0.85))}${a === 'turtle' ? '' : motion(330, G - 36)}</g>`
      + k('word', at(240, 46, label(0, 0, { turtle: 'slowly', dog: 'quickly', both: 'more quickly than' }[a], { s: 26 })));
  },
};

// g45 always / usually / sometimes / never
const FREQ = { always: [[0, 1, 2, 3, 4, 5, 6], 'luôn luôn'], usually: [[0, 1, 2, 3, 4], 'thường'], sometimes: [[1, 3], 'thỉnh thoảng'], never: [[], 'không bao giờ'] };
const g45 = {
  groups: [{ key: 'f', opts: Object.keys(FREQ).map((f) => ({ v: f, label: f, sub: FREQ[f][1] })) }],
  init: { f: 'always' },
  say: ({ f }) => ({ en: `I *${f}* ride my bike to school.`, vi: `Tớ ${FREQ[f][1]} đạp xe đến trường.` }),
  draw: ({ f }) => {
    const on = FREQ[f][0];
    const days = DAYS.map((d, i) => {
      const yes = on.includes(i);
      return `<g transform="translate(${66 + i * 58} 130)"><rect x="-25" y="-42" width="50" height="80" rx="10" fill="${yes ? '#DCFCE7' : '#fff'}" stroke="${yes ? '#22C55E' : '#CBD5E1'}" stroke-width="${yes ? 2.5 : 1.4}"/>
        <text y="-20" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="13" fill="#475569">${d}</text>${k(`d${i}`, yes ? at(0, 28, bike(), 0.48) : '')}</g>`;
    }).join('');
    return outdoor({ noSun: true }) + days
      + `<rect x="66" y="198" width="${(on.length / 7) * 348}" height="18" rx="9" fill="#22C55E"/><rect x="66" y="198" width="348" height="18" rx="9" fill="none" stroke="#94A3B8" stroke-width="1.5"/>`
      + k('word', at(240, 44, label(0, 0, `${f}: ${on.length}/7`, { s: 24 })));
  },
};

// g46 who / which / where
const REL = {
  who: ['She is the girl *who* is riding a bike.', 'Bạn ấy là cô bé đang đi xe đạp.', [110, G - 62, 74]],
  which: ['This is the dog *which* has a long tail.', 'Đây là con chó có cái đuôi dài.', [268, G - 36, 60]],
  where: ['That is the house *where* Tom lives.', 'Kia là ngôi nhà Tom sống.', [404, G - 70, 82]],
};
const g46 = {
  groups: [{ key: 'w', opts: [{ v: 'who', label: 'who', sub: 'người' }, { v: 'which', label: 'which', sub: 'đồ vật, con vật' }, { v: 'where', label: 'where', sub: 'nơi chốn' }] }],
  init: { w: 'who' },
  say: ({ w }) => ({ en: REL[w][0], vi: REL[w][1] }),
  draw: ({ w }) => outdoor()
    + at(404, G, `<g transform="scale(.9)"><rect x="-60" y="-80" width="120" height="80" fill="#FDE68A" ${S(1.4)}/><path d="M-74 -76 L0 -132 L74 -76Z" fill="#EF4444" ${S(1.4)}/><rect x="-14" y="-46" width="28" height="46" fill="#92400E"/></g>`)
    + person(92, G, 'na', 'stand', { s: 0.95, mood: 'joy' }) + at(124, G, bike(), 0.9)
    + at(262, G, `<g><path d="M26 -26 Q70 -30 84 -70" stroke="#FCD34D" stroke-width="7" fill="none" stroke-linecap="round"/>${dog()}</g>`, 0.95)
    + k('ring', ring(...REL[w][2]))
    + k('word', at(240, 40, label(0, 0, w, { s: 28 }))),
};

// g47 Why / When / How often
const g47 = {
  groups: [{ key: 'q', opts: [{ v: 'Why', label: 'Why', sub: 'vì sao' }, { v: 'When', label: 'When', sub: 'khi nào' }, { v: 'How often', label: 'How often', sub: 'mấy lần' }] }],
  init: { q: 'Why' },
  say: ({ q }) => ({
    Why: { en: '*Why* is he wet? Because it is raining.', vi: 'Vì sao bạn ấy bị ướt? Vì trời đang mưa.' },
    When: { en: "*When* does school start? At eight o'clock.", vi: 'Khi nào vào học? Lúc tám giờ.' },
    'How often': { en: '*How often* do you swim? Twice a week.', vi: 'Bạn bơi bao lâu một lần? Hai lần một tuần.' },
  })[q],
  draw: ({ q }) => {
    let pic;
    if (q === 'Why') pic = greyClouds(true) + rain(22) + person(240, G, 'minh', 'stand', { s: 1.1, mood: 'sad' });
    else if (q === 'When') pic = school(30, G, 210, 110) + at(370, 160, clock(8), 1.15);
    else pic = DAYS.map((d, i) => { const yes = i === 1 || i === 4; return `<g transform="translate(${66 + i * 58} 160)"><rect x="-25" y="-36" width="50" height="72" rx="10" fill="${yes ? '#DBEAFE' : '#fff'}" stroke="${yes ? '#3B82F6' : '#CBD5E1'}" stroke-width="2"/>
      <text y="-14" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="13" fill="#475569">${d}</text>${yes ? at(0, 32, swimmer(), 0.8) : ''}</g>`; }).join('');
    return (q === 'How often' ? sky() : outdoor({ noSun: q === 'Why' })) + k(`p-${q}`, pic)
      + k('word', at(110, 40, label(0, 0, `${q}?`, { s: 26 })))
      + k('ans', at(370, 40, label(0, 0, { Why: 'Because...', When: 'At eight.', 'How often': 'Twice a week.' }[q], { s: 18, c: '#15803D', bg: '#DCFCE7' })));
  },
};

// g48 When ..., ...
const WHEN = {
  home: ['he got home', 'he had his dinner', 'bạn ấy về đến nhà', 'bạn ấy ăn tối'],
  rain: ['it rained', 'we went inside', 'trời mưa', 'chúng tớ vào trong nhà'],
};
const g48 = {
  groups: [{ key: 'e', opts: [{ v: 'home', label: 'got home', sub: 'về nhà' }, { v: 'rain', label: 'it rained', sub: 'trời mưa' }] }],
  init: { e: 'home' },
  say: ({ e }) => ({ en: `*When* ${WHEN[e][0]}, ${WHEN[e][1]}.`, vi: `Khi ${WHEN[e][2]}, ${WHEN[e][3]}.` }),
  draw: ({ e }) => {
    const L = e === 'home'
      ? at(92, 220, door(true), 0.8) + person(150, 220, 'minh', 'walk', { s: 0.72, mood: 'joy' })
      : cloud(120, 80, 0.9, 0, '#94A3B8') + rainIn(40, 96, 160, 90, 12) + person(120, 220, 'bon', 'stand', { s: 0.72, mood: 'sad' });
    const R = e === 'home'
      ? at(390, 220, table(), 0.6) + at(390, 170, pizza(), 0.5) + person(320, 220, 'minh', 'stand', { s: 0.72, mood: 'joy' })
      : at(410, 150, win(), 0.55) + person(320, 220, 'bon', 'stand', { s: 0.72, mood: 'joy' }) + person(366, 220, 'na', 'stand', { s: 0.72, mood: 'joy' });
    return sky() + card(120, 140, 210, 180, '', { fill: e === 'rain' ? '#E0F2FE' : '#fff' }) + card(360, 140, 210, 180, '', { fill: '#FEF3C7' })
      + k(`L-${e}`, L) + k(`R-${e}`, R) + arrowR(228, 254, 140)
      + label(120, 252, '1', { s: 16 }) + label(360, 252, '2', { s: 16 })
      + k('chip', chip(120, 26, 'When', 18));
  },
};

// g49 Shall I ...?
const OFFERS = {
  window: ["It's hot. *Shall I* open the window? Yes, please.", 'Nóng quá. Để con mở cửa sổ? Ừ, cảm ơn con.', 'Shall I open the window?'],
  light: ["It's dark. *Shall I* turn on the light? Yes, please.", 'Tối quá. Để con bật đèn? Ừ, cảm ơn con.', 'Shall I turn on the light?'],
  bag: ['*Shall I* carry your bag? Yes, please.', 'Để con xách túi cho mẹ? Ừ, cảm ơn con.', 'Shall I carry your bag?'],
};
const g49 = {
  groups: [{ key: 'o', opts: [{ v: 'window', label: 'the window', sub: 'mở cửa sổ' }, { v: 'light', label: 'the light', sub: 'bật đèn' }, { v: 'bag', label: 'the bag', sub: 'xách túi' }] },
    { key: 'd', opts: [{ v: 0, label: 'Shall I...?', sub: 'hỏi' }, { v: 1, label: 'Yes, please.', sub: 'giúp xong' }] }],
  init: { o: 'window', d: 0 },
  say: ({ o }) => ({ en: OFFERS[o][0], vi: OFFERS[o][1] }),
  draw: ({ o, d }) => {
    const thing = o === 'window' ? at(398, 92, win(!!d), 0.96) : o === 'light' ? at(370, G, lamp(!!d)) : '';
    return indoor() + (o === 'light' && !d ? '<rect width="480" height="300" fill="#1E293B" opacity=".5"/>' : '') + thing
      + person(90, G, 'me', 'stand', { s: 1, mood: d ? 'joy' : o === 'window' ? 'sad' : 'happy' })
      + (o === 'bag' ? k('bag', at(d ? 250 : 130, G - (d ? 64 : 40), `<g transform="scale(1.3)">${bag()}</g>`)) : '')
      + person(240, G, 'bon', d ? (o === 'bag' ? 'hold' : 'cheer') : 'point', { s: 1, mood: 'joy', prop: 'calf' })
      + k('q', at(d ? 110 : 250, 56, bubble(0, 0, d ? 'Yes, please.' : OFFERS[o][2], 15)));
  },
};

// g50 How about / What about + ing
const waves = `<g><path d="M-30 -10 q10 -8 20 0 t20 0 t20 0" stroke="#0EA5E9" stroke-width="5" fill="none"/><path d="M-30 4 q10 -8 20 0 t20 0 t20 0" stroke="#0EA5E9" stroke-width="5" fill="none"/></g>`;
const IDEA = {
  cinema: ['*How about going* to the cinema?', 'Hay mình đi xem phim đi?', () => tv(), 'How about going...?'],
  park: ['*What about playing* in the park?', 'Ra công viên chơi thì sao?', () => tree(0, 0, 0.5), 'What about playing...?'],
  swim: ['*How about swimming* today?', 'Hôm nay đi bơi thì sao?', () => waves, 'How about swimming?'],
};
const g50 = {
  groups: [{ key: 'i', opts: [{ v: 'cinema', label: 'cinema', sub: 'xem phim' }, { v: 'park', label: 'park', sub: 'công viên' }, { v: 'swim', label: 'swim', sub: 'đi bơi' }] }],
  init: { i: 'cinema' },
  say: ({ i }) => ({ en: `${IDEA[i][0]} Good idea!`, vi: `${IDEA[i][1]} Hay đấy!` }),
  draw: ({ i }) => outdoor() + person(140, G, 'na', 'point', { s: 1, mood: 'joy' }) + person(340, G, 'minh', 'cheer', { s: 1, mood: 'joy', flip: true })
    + k(`th-${i}`, thought(240, 84, 120, 90, 160, 140, at(0, 30, IDEA[i][2](), 1.1)))
    + k('word', at(120, 38, label(0, 0, IDEA[i][3], { s: 17 })))
    + k('ok', at(370, 130, bubble(0, 0, 'Good idea!', 16))),
};

// g51 What's the weather like? / What's the matter?
const g51 = {
  groups: [{ key: 'w', opts: [{ v: 'sunny', label: 'sunny', sub: 'nắng' }, { v: 'rainy', label: 'rainy', sub: 'mưa' }, { v: 'snowy', label: 'snowy', sub: 'tuyết' }, { v: 'matter', label: 'the matter?', sub: 'bị sao' }] }],
  init: { w: 'sunny' },
  say: ({ w }) => (w === 'matter' ? { en: "*What's the matter?* I've got a headache.", vi: 'Con bị sao thế? Con bị đau đầu.' }
    : { en: `*What's the weather like?* It's ${w}.`, vi: `Thời tiết thế nào? Trời ${{ sunny: 'nắng', rainy: 'mưa', snowy: 'có tuyết' }[w]}.` }),
  draw: ({ w }) => {
    if (w === 'matter') {
      return indoor() + person(140, G, 'me', 'point', { s: 1, mood: 'wow' }) + person(320, G, 'bon', 'stand', { s: 1.05, mood: 'cry', flip: true })
        + k('q', at(150, 58, bubble(0, 0, "What's the matter?", 15))) + k('a', at(330, 98, bubble(0, 0, "I've got a headache.", 14)));
    }
    const scene = w === 'sunny' ? outdoor() : w === 'rainy' ? outdoor({ noSun: true }) + greyClouds(true) + rain(26)
      : `<rect width="480" height="300" fill="#E0F2FE"/><rect y="${G - 10}" width="480" height="${310 - G}" fill="#fff" stroke="#BAE6FD"/>${greyClouds(false)}${snow()}`;
    return scene + k('kid', person(240, G, 'na', w === 'sunny' ? 'cheer' : 'stand', { s: 1.05, mood: w === 'rainy' ? 'sad' : 'joy' }))
      + (w === 'rainy' ? at(272, G - 30, umbrella(), 0.8) : '')
      + k('word', at(110, 40, label(0, 0, `It's ${w}.`, { s: 24 })));
  },
};

// g52 good at / is called
const g52 = {
  groups: [{ key: 'x', opts: [{ v: 'draw', label: 'good at drawing', sub: 'giỏi vẽ' }, { v: 'football', label: 'good at football', sub: 'giỏi đá bóng' }, { v: 'kitten', label: 'kitten', sub: 'mèo con' }, { v: 'puppy', label: 'puppy', sub: 'chó con' }] }],
  init: { x: 'draw' },
  say: ({ x }) => ({
    draw: { en: "She's very *good at* drawing.", vi: 'Bạn ấy vẽ rất giỏi.' }, football: { en: "He's very *good at* football.", vi: 'Bạn ấy đá bóng rất giỏi.' },
    kitten: { en: 'A baby cat *is called* a kitten.', vi: 'Mèo con được gọi là kitten.' }, puppy: { en: 'A baby dog *is called* a puppy.', vi: 'Chó con được gọi là puppy.' },
  })[x],
  draw: ({ x }) => {
    let pic;
    if (x === 'draw') pic = person(180, G, 'na', 'point', { s: 1.1, mood: 'joy', prop: 'pencil' }) + `<g transform="translate(320 ${G})"><path d="M-30 0 L-6 -120 M30 0 L6 -120" stroke="#92400E" stroke-width="5"/><rect x="-50" y="-140" width="100" height="80" fill="#fff" ${S(1.3)}/>${sun(0, -100, 16)}</g>`;
    else if (x === 'football') pic = `<rect x="360" y="${G - 90}" width="100" height="90" fill="none" stroke="#fff" stroke-width="6"/>` + person(200, G, 'minh', 'run', { s: 1.1, mood: 'joy' }) + at(300, G - 40, ball(18, '#fff')) + motion(280, G - 60);
    else {
      const big = x === 'kitten' ? cat('#FB923C') : dog();
      const small = x === 'kitten' ? cat('#FDBA74', { sit: true }) : dog('#FDE68A');
      pic = at(170, G, big, 1.4) + at(340, G, small, 0.7) + label(340, G + 24, x, { s: 16 }) + `<path d="M232 ${G - 50} Q284 ${G - 96} 318 ${G - 62}" stroke="#94A3B8" stroke-width="2" fill="none" stroke-dasharray="5 5"/>`;
    }
    return outdoor() + k(`p-${x}`, pic) + k('word', at(240, 42, label(0, 0, x === 'kitten' || x === 'puppy' ? 'is called' : 'good at', { s: 26 })));
  },
};

// g53 give Tom the apple / give the apple to Tom
const g53 = {
  groups: [{ key: 'r', opts: [{ v: 'Tom', label: 'Tom' }, { v: 'Na', label: 'Na' }, { v: 'the teacher', label: 'the teacher', sub: 'cô giáo' }] },
    { key: 'f', opts: [{ v: 1, label: 'give Tom the apple', sub: 'người nhận trước' }, { v: 2, label: 'give the apple to Tom', sub: 'thêm to' }] }],
  init: { r: 'Tom', f: 1 },
  say: ({ r, f }) => ({ en: f === 1 ? `Mum gives *${r}* the apple.` : `Mum gives the apple *to ${r}*.`, vi: `Mẹ đưa quả táo cho ${r === 'the teacher' ? 'cô giáo' : r}.` }),
  draw: ({ r, f }) => {
    const X = { Tom: 230, Na: 320, 'the teacher': 420 };
    return indoor() + person(90, G, 'me', 'give', { s: 1, mood: 'happy' })
      + person(230, G, 'minh', 'stand', { s: 0.95, mood: r === 'Tom' ? 'joy' : 'happy' }) + label(230, G + 24, 'Tom', { s: 13 })
      + person(320, G, 'na', 'stand', { s: 0.95, mood: r === 'Na' ? 'joy' : 'happy' }) + label(320, G + 24, 'Na', { s: 13 })
      + person(420, G, 'coHuong', 'stand', { s: 0.95, mood: r === 'the teacher' ? 'joy' : 'happy', flip: true }) + label(420, G + 24, 'teacher', { s: 13 })
      + k('apple', at(X[r] - 28, G - 66, apple(14)))
      + k('word', at(240, 42, label(0, 0, f === 1 ? `give ${r} the apple` : `give the apple to ${r}`, { s: 20 })));
  },
};

export const MOVERS_DEMOS = { g39, g40, g41, g42, g43, g44, g45, g46, g47, g48, g49, g50, g51, g52, g53 };
