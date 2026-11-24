/**
 * 🎮 Thử xem cho các bài g29–g64 (Starters, Movers, Flyers mới). Cùng định dạng DEMOS trong demos.js:
 * { groups, init, say(st) → { en, vi }, draw(st) → SVG 480×300 }. Hình dùng chung lấy từ demos.js, nhân vật từ cast.js TV3.
 */
import { person } from '../tiengViet3/cast.js';
import { LINE, cloud, tree } from '../tiengViet3/sceneKit.js';
import { G, k, at, FONT, label, bubble, spot, outdoor, indoor, cat, dog, ball, table, bag, dashed, S, apple, egg, umbrella, iceCream, badge, heart, motion, bigWord } from './demos.js';

// ── hình thêm (gốc ở chân, giữa) ──
const emo = (x, y, ch, s = 40) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${s}">${ch}</text>`;
const cake = (candles = 0) => `<g><rect x="-44" y="-44" width="88" height="44" rx="8" fill="#F9A8D4" ${S(1.3)}/><path d="M-44 -30 Q-33 -20 -22 -30 T0 -30 T22 -30 T44 -30" stroke="#fff" stroke-width="5" fill="none"/>
  <rect x="-48" y="-50" width="96" height="10" rx="5" fill="#FFF7ED" ${S(1)}/>${Array.from({ length: candles }, (_, i) => { const x = (i - (candles - 1) / 2) * 11; return `<rect x="${x - 2.5}" y="-68" width="5" height="18" fill="#60A5FA" ${S(.6)}/><path d="M${x} -76 q4 4 0 8 q-4 -4 0 -8Z" fill="#F59E0B"/>`; }).join('')}</g>`;
const plate = () => `<ellipse cy="-4" rx="54" ry="10" fill="#fff" ${S(1.2)}/>`;
const glass = (fill = '#fff') => `<g><path d="M-18 -60 L-14 0 H14 L18 -60Z" fill="#E0F2FE" ${S(1.2)}/><path d="M-16.5 -40 L-14 0 H14 L16.5 -40Z" fill="${fill}" opacity=".95"/><path d="M-10 -52 V-8" stroke="#fff" stroke-width="3" opacity=".8"/></g>`;
const riceBowl = () => `<g><path d="M-36 -26 Q-34 0 0 0 Q34 0 36 -26Z" fill="#60A5FA" ${S(1.3)}/><path d="M-34 -26 Q-30 -50 0 -50 Q30 -50 34 -26Z" fill="#fff" ${S(1)}/>
  ${[[-14, -36], [0, -42], [14, -34], [-4, -30], [10, -44]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="1.6" fill="#E5E7EB"/>`).join('')}<path d="M-30 -16 H30" stroke="#fff" stroke-width="2"/></g>`;
const orange = (r = 22) => `<g><circle cy="${-r}" r="${r}" fill="#FB923C" ${S(1.3)}/><path d="M0 ${-r * 2} q4 -8 12 -6 q-4 8 -12 6Z" fill="#22C55E" ${S(.8)}/><ellipse cx="${-r * 0.4}" cy="${-r * 1.35}" rx="${r * 0.2}" ry="${r * 0.3}" fill="#fff" opacity=".5"/></g>`;
const cookie = () => `<g><circle cy="-18" r="18" fill="#D97706" ${S(1.2)}/>${[[-6, -24], [6, -14], [-2, -10], [8, -26]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#78350F"/>`).join('')}</g>`;
const chair = () => `<g><rect x="-22" y="-44" width="44" height="8" rx="2" fill="#A16207" ${S(1.2)}/><rect x="16" y="-90" width="8" height="54" fill="#92400E" ${S(1)}/><rect x="-20" y="-36" width="6" height="36" fill="#92400E"/><rect x="14" y="-36" width="6" height="36" fill="#92400E"/></g>`;
const door = (open = false) => `<g><rect x="-34" y="-130" width="68" height="130" fill="#7C2D12" ${S(1.4)}/>${open ? `<rect x="-34" y="-130" width="68" height="130" fill="#BAE6FD"/><path d="M-34 -130 L-8 -122 V-8 L-34 0Z" fill="#B45309" ${S(1.2)}/>` : `<rect x="-34" y="-130" width="68" height="130" fill="#B45309" ${S(1.4)}/><circle cx="22" cy="-64" r="4" fill="#FDE047" ${S(.8)}/>`}</g>`;
const win = (open = false) => `<g><rect x="-50" y="-80" width="100" height="80" fill="#BAE6FD" ${S(1.4)}/>${open
  ? `<path d="M-50 -80 L-74 -72 V-8 L-50 0Z M50 -80 L74 -72 V-8 L50 0Z" fill="#E0F2FE" ${S(1.2)}/>${cloud(0, -46, 0.5)}`
  : `<path d="M0 -80 V0 M-50 -40 H50" stroke="${LINE}" stroke-width="1.4"/>`}</g>`;
const bed = () => `<g><rect x="-90" y="-36" width="180" height="30" rx="6" fill="#93C5FD" ${S(1.3)}/><rect x="-96" y="-74" width="14" height="74" rx="4" fill="#92400E" ${S(1)}/><rect x="82" y="-50" width="14" height="50" rx="4" fill="#92400E" ${S(1)}/>
  <rect x="-80" y="-50" width="40" height="16" rx="8" fill="#fff" ${S(1)}/></g>`;
const coat = () => `<g><path d="M-26 -70 L-40 -60 L-46 -20 H-30 L-28 0 H28 L30 -20 H46 L40 -60 L26 -70 Q0 -60 -26 -70Z" fill="#DC2626" ${S(1.3)}/><path d="M0 -64 V0" stroke="${LINE}" stroke-width="1"/>${[-50, -36, -22].map((y) => `<circle cx="5" cy="${y}" r="2.4" fill="#FDE047"/>`).join('')}</g>`;
const hat = (c = '#F472B6') => `<g><ellipse cy="-6" rx="34" ry="8" fill="${c}" ${S(1.2)}/><path d="M-20 -8 Q-20 -38 0 -38 Q20 -38 20 -8Z" fill="${c}" ${S(1.2)}/><path d="M-20 -14 H20" stroke="#fff" stroke-width="4"/></g>`;
const teddy = () => `<g><circle cx="-14" cy="-58" r="9" fill="#B45309" ${S(1)}/><circle cx="14" cy="-58" r="9" fill="#B45309" ${S(1)}/><ellipse cy="-20" rx="22" ry="22" fill="#D97706" ${S(1.2)}/><circle cy="-48" r="18" fill="#D97706" ${S(1.2)}/>
  <ellipse cy="-42" rx="8" ry="6" fill="#FEF3C7"/><circle cy="-45" r="2.4" fill="#1F1716"/><circle cx="-7" cy="-52" r="2" fill="#1F1716"/><circle cx="7" cy="-52" r="2" fill="#1F1716"/></g>`;
const sheep = () => `<g>${[-14, 14].map((x) => `<rect x="${x - 3}" y="-14" width="6" height="14" fill="#334155"/>`).join('')}${[[-18, -30], [0, -36], [18, -30], [-10, -20], [10, -20]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="15" fill="#fff" ${S(1)}/>`).join('')}
  <ellipse cx="-32" cy="-34" rx="10" ry="12" fill="#334155"/><circle cx="-35" cy="-36" r="1.8" fill="#fff"/></g>`;
const phone = (ring = false) => `<g><rect x="-26" y="-30" width="52" height="30" rx="6" fill="#EF4444" ${S(1.2)}/><path d="M-30 -36 Q0 -50 30 -36 L24 -28 H-24Z" fill="#DC2626" ${S(1.2)}/>
  ${ring ? `<path d="M-40 -50 l-10 -8 M40 -50 l10 -8 M-44 -36 h-12 M44 -36 h12" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>` : ''}</g>`;
const book = () => `<g><path d="M0 -26 Q-16 -32 -34 -26 V6 Q-16 0 0 6Z" fill="#fff" ${S(1.2)}/><path d="M0 -26 Q16 -32 34 -26 V6 Q16 0 0 6Z" fill="#fff" ${S(1.2)}/>
  <path d="M-28 -16 H-6 M-28 -8 H-6 M-28 0 H-10 M6 -16 H28 M6 -8 H28 M6 0 H22" stroke="#94A3B8" stroke-width="1.6"/></g>`;
const lamp = (on) => `<g>${on ? '<circle cy="-96" r="46" fill="#FEF08A" opacity=".55"/>' : ''}<rect x="-4" y="-80" width="8" height="80" fill="#64748B"/><ellipse cy="-2" rx="22" ry="5" fill="#475569"/>
  <path d="M-26 -78 L-14 -112 H14 L26 -78Z" fill="${on ? '#FDE047' : '#E5E7EB'}" ${S(1.2)}/></g>`;
const rain = (n = 22) => Array.from({ length: n }, (_, i) => `<path d="M${(i * 53) % 470 + 8} ${(i * 37) % 150 + 60} l-5 14" stroke="#2563EB" stroke-width="2.6" stroke-linecap="round" opacity=".7"/>`).join('');
const snow = (n = 26) => Array.from({ length: n }, (_, i) => `<circle cx="${(i * 47) % 470 + 6}" cy="${(i * 41) % 200 + 30}" r="${3 + (i % 3)}" fill="#fff" stroke="#BAE6FD" stroke-width="1"/>`).join('');
const greyClouds = (dark) => [[90, 60, 1.3], [250, 44, 1.5], [400, 64, 1.2]].map(([x, y, s]) => cloud(x, y, s, 0, dark ? '#64748B' : '#CBD5E1')).join('');
const shop = (x) => `<g transform="translate(${x} ${G})"><rect x="-70" y="-110" width="140" height="110" fill="#FEF3C7" ${S(1.3)}/>
  <path d="M-80 -110 H80 L72 -88 H-72Z" fill="#F43F5E" ${S(1.2)}/>${[-60, -30, 0, 30].map((dx, i) => `<path d="M${dx - 12} -110 h24 l-2 22 h-20z" fill="${i % 2 ? '#fff' : '#FB7185'}"/>`).join('')}
  <rect x="-56" y="-76" width="54" height="40" fill="#BAE6FD" ${S(1)}/><rect x="14" y="-70" width="40" height="70" fill="#92400E" ${S(1)}/>
  <rect x="-40" y="-132" width="80" height="20" rx="4" fill="#fff" ${S(1)}/><text y="-117" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="13" fill="#BE123C">SHOP</text></g>`;
const card = (x, y, w, h, inner, { on = true, fill = '#fff', edge } = {}) => `<g opacity="${on ? 1 : 0.4}"><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="16" fill="${fill}" stroke="${edge || LINE}" stroke-width="${edge ? 3 : 1.3}"/>${inner}</g>`;
const chip = (x, y, t, s = 22) => {
  const w = t.length * s * 0.6 + 28;
  return `<g transform="translate(${x} ${y})"><rect x="${-w / 2}" y="${-s}" width="${w}" height="${s * 2}" rx="${s}" fill="#FDE047" stroke="#D97706" stroke-width="3"/>
    <text y="${s * 0.36}" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="${s}" fill="#92400E">${t}</text></g>`;
};
const ring = (x, y, r) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="none" stroke="#F59E0B" stroke-width="5"/></g>`;
const arrowR = (x1, x2, y, c = '#64748B') => `<path d="M${x1} ${y} H${x2 - 8}" stroke="${c}" stroke-width="4" stroke-linecap="round"/><path d="M${x2 - 14} ${y - 9} L${x2} ${y} L${x2 - 14} ${y + 9}" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const sky = (bg = '#F0F9FF') => `<rect width="480" height="300" fill="${bg}"/>`;
const capWord = (s) => s[0].toUpperCase() + s.slice(1);

// ══════════════════ STARTERS ══════════════════

// g29 me / him / her / them
const OBJ = { me: ['I', 'Nhìn tớ này!'], him: ['he', 'Nhìn bạn ấy (trai) kìa!'], her: ['she', 'Nhìn bạn ấy (gái) kìa!'], them: ['they', 'Nhìn chúng kìa!'] };
const g29 = {
  groups: [{ key: 'w', opts: [{ v: 'me', label: 'me', sub: 'tớ' }, { v: 'him', label: 'him', sub: 'bạn trai' }, { v: 'her', label: 'her', sub: 'bạn gái' }, { v: 'them', label: 'them', sub: 'chúng nó' }] }],
  init: { w: 'me' },
  say: ({ w }) => ({ en: `Look at *${w}*!`, vi: OBJ[w][1] }),
  draw: ({ w }) => {
    const tgt = { me: [70, G - 150], him: [210, G - 130], her: [316, G - 130], them: [416, G - 60] }[w];
    const op = (id) => (id === w ? 1 : 0.35);
    return outdoor()
      + `<g opacity="${w === 'me' ? 1 : 0.95}">${w === 'me' ? spot(70, 80) : ''}${person(70, G, 'bon', w === 'me' ? 'raise' : 'point', { s: 1, mood: 'joy' })}</g>`
      + `<g opacity="${op('him')}">${w === 'him' ? spot(210, 70) : ''}${person(210, G, 'minh', 'wave', { s: 1, mood: 'joy' })}</g>`
      + `<g opacity="${op('her')}">${w === 'her' ? spot(316, 70) : ''}${person(316, G, 'na', 'cheer', { s: 1, mood: 'joy' })}</g>`
      + `<g opacity="${op('them')}">${w === 'them' ? spot(416, 120) : ''}${at(390, G, dog(), 0.7)}${at(446, G, dog('#A8A29E'), 0.7)}</g>`
      + (w === 'me' ? '' : k('arrow', dashed(108, G - 78, tgt[0] - 20, tgt[1] + 30)))
      + k('word', at(240, 46, label(0, 0, `${OBJ[w][0]} → ${w}`, { s: 24 })));
  },
};

// g30 mine / yours / his / hers
const OWN = { mine: ['ball', 'quả bóng', 'của tớ'], yours: ['bag', 'cái cặp', 'của bạn'], his: ['dog', 'con chó', 'của bạn ấy (trai)'], hers: ['umbrella', 'cái ô', 'của bạn ấy (gái)'] };
const g30 = {
  groups: [{ key: 'w', opts: [{ v: 'mine', label: 'mine', sub: 'của tớ' }, { v: 'yours', label: 'yours', sub: 'của bạn' }, { v: 'his', label: 'his', sub: 'của bạn trai' }, { v: 'hers', label: 'hers', sub: 'của bạn gái' }] }],
  init: { w: 'mine' },
  say: ({ w }) => ({ en: `The ${OWN[w][0]} is *${w}*.`, vi: `${capWord(OWN[w][1])} là ${OWN[w][2]}.` }),
  draw: ({ w }) => {
    const op = (id) => (id === w ? 1 : 0.35);
    const ix = { mine: 112, yours: 222, his: 340, hers: 446 }[w];
    return outdoor()
      + person(56, G, 'bon', w === 'mine' ? 'raise' : 'point', { s: 0.95, mood: 'joy' })
      + `<g opacity="${op('mine')}">${w === 'mine' ? spot(112, 60) : ''}${at(112, G, ball(18))}</g>`
      + `<g opacity="${op('yours')}">${w === 'yours' ? spot(204, 90) : ''}${person(188, G, 'minh', 'stand', { s: 0.95, mood: 'joy' })}${at(222, G, bag())}</g>`
      + `<g opacity="${op('his')}">${w === 'his' ? spot(320, 100) : ''}${person(296, G, 'tetsuo', 'stand', { s: 0.95, mood: 'joy' })}${at(340, G, dog(), 0.6)}</g>`
      + `<g opacity="${op('hers')}">${w === 'hers' ? spot(430, 90) : ''}${person(412, G, 'na', 'stand', { s: 0.95, mood: 'joy' })}${at(452, G, umbrella(), 0.55)}</g>`
      + k('say', at(ix, 92, bubble(0, 0, `${w}!`, 22)));
  },
};

// g31 Tom's / Whose
const WHOSE = { hat: ['Anna', 'na', 'cái mũ'], bag: ['Tom', 'minh', 'cái cặp'], ball: ['the dog', 'dog', 'quả bóng'] };
const g31 = {
  groups: [{ key: 't', opts: [{ v: 'hat', label: 'hat', sub: 'mũ' }, { v: 'bag', label: 'bag', sub: 'cặp' }, { v: 'ball', label: 'ball', sub: 'bóng' }] }],
  init: { t: 'hat' },
  say: ({ t }) => {
    const [o] = WHOSE[t];
    return { en: `*Whose* ${t} is this? It's *${o === 'the dog' ? "the dog's" : `${o}'s`}*.`, vi: `${capWord(WHOSE[t][2])} này của ai? Của ${o === 'the dog' ? 'con chó' : o}.` };
  },
  draw: ({ t }) => {
    const ox = { hat: 330, bag: 180, ball: 430 }[t];
    const item = { hat: hat(), bag: `<g transform="scale(1.6)">${bag()}</g>`, ball: ball(22, '#3B82F6') }[t];
    const owner = WHOSE[t][0];
    return indoor() + at(70, G, table(), 0.9) + k(`it-${t}`, at(70, G - 76, item))
      + `<g opacity="${t === 'bag' ? 1 : 0.4}">${person(180, G, 'minh', 'stand', { s: 1, mood: 'joy' })}${label(180, G + 24, 'Tom', { s: 14 })}</g>`
      + `<g opacity="${t === 'hat' ? 1 : 0.4}">${person(330, G, 'na', 'stand', { s: 1, mood: 'joy' })}${label(330, G + 24, 'Anna', { s: 14 })}</g>`
      + `<g opacity="${t === 'ball' ? 1 : 0.4}">${at(430, G, dog(), 0.8)}${label(430, G + 24, 'dog', { s: 14 })}</g>`
      + k('arrow', dashed(100, G - 100, ox - 20, G - 150))
      + k('word', at(240, 44, label(0, 0, `${owner === 'the dog' ? "the dog's" : `${owner}'s`} ${t}`, { s: 24 })));
  },
};

// g32 Sit down! / Don't run! / Let's go!
const g32 = {
  groups: [{ key: 'c', opts: [{ v: 'sit', label: 'Sit down!', sub: 'ngồi xuống' }, { v: 'run', label: "Don't run!", sub: 'đừng chạy' }, { v: 'go', label: "Let's go!", sub: 'mình đi nào' }] }],
  init: { c: 'sit' },
  say: ({ c }) => ({ sit: { en: '*Sit* down, please.', vi: 'Con ngồi xuống đi.' }, run: { en: "*Don't* run!", vi: 'Đừng chạy!' }, go: { en: "*Let's* go to the park!", vi: 'Mình đi công viên đi!' } })[c],
  draw: ({ c }) => {
    const kid = c === 'sit' ? at(300, G, chair(), 1.2) + person(300, G - 30, 'bon', 'sit', { s: 1, mood: 'happy' })
      : c === 'run' ? person(300, G, 'bon', 'run', { s: 1, mood: 'wow' }) + motion(260, G - 90) + badge(false, 340, G - 150, 20)
        : person(280, G, 'bon', 'walk', { s: 1, mood: 'joy' }) + person(360, G, 'na', 'walk', { s: 1, mood: 'joy' });
    return (c === 'go' ? outdoor() + tree(440, G, 0.8) : indoor())
      + person(110, G, 'coHuong', c === 'go' ? 'cheer' : 'point', { s: 1, mood: c === 'run' ? 'wow' : 'happy' })
      + k(`kid-${c}`, kid)
      + k('say', at(150, 62, bubble(0, 0, { sit: 'Sit down!', run: "Don't run!", go: "Let's go!" }[c], 22)));
  },
};

// g33 I like swimming
const LIKE = { swim: ['swimming', 'bơi'], read: ['reading', 'đọc sách'], dance: ['dancing', 'nhảy'], draw: ['drawing', 'vẽ'] };
const g33 = {
  groups: [{ key: 'a', opts: Object.keys(LIKE).map((a) => ({ v: a, label: a, sub: LIKE[a][1] })) }],
  init: { a: 'swim' },
  say: ({ a }) => ({ en: `I like *${LIKE[a][0]}*.`, vi: `Tớ thích ${LIKE[a][1]}.` }),
  draw: ({ a }) => {
    let fig;
    if (a === 'swim') fig = person(250, G + 26, 'bon', 'raise', { s: 1, mood: 'joy' }) + `<rect x="120" y="${G - 40}" width="260" height="120" fill="#38BDF8" opacity=".92"/><path d="M130 ${G - 30} q14 -8 28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0" stroke="#fff" stroke-width="3" fill="none"/>`;
    else if (a === 'read') fig = person(250, G, 'bon', 'hold', { s: 1.15, mood: 'joy', prop: 'calf' }) + at(250, G - 62, book());
    else if (a === 'dance') fig = person(250, G, 'bon', 'cheer', { s: 1.15, mood: 'joy' }) + `<text x="180" y="110" font-size="30" fill="#7C3AED">♪</text><text x="310" y="96" font-size="36" fill="#DB2777">♫</text>`;
    else fig = person(220, G, 'bon', 'point', { s: 1.1, mood: 'joy', prop: 'pencil' }) + `<g transform="translate(320 ${G})"><path d="M-30 0 L-6 -120 M30 0 L6 -120" stroke="#92400E" stroke-width="5"/><rect x="-44" y="-130" width="88" height="70" fill="#fff" ${S(1.3)}/>${at(0, -72, cat('#FB923C', { sit: true }), 0.6)}</g>`;
    const [w] = LIKE[a];
    return outdoor({ noSun: a === 'swim' }) + k(`f-${a}`, fig) + heart(150, 110, 1.8)
      + k('word', bigWord(240, 56, `like ${w.slice(0, -3)}<tspan fill="#DC2626">ing</tspan>`, 32));
  },
};

// g34 Would you like ...? Yes, please. / No, thank you.
const OFFER = { orange: ['an orange', 'một quả cam', () => orange(24)], 'ice cream': ['an ice cream', 'một cây kem', iceCream], cookie: ['a cookie', 'một cái bánh quy', cookie] };
const g34 = {
  groups: [{ key: 'f', opts: [{ v: 'orange', label: 'orange', sub: 'cam' }, { v: 'ice cream', label: 'ice cream', sub: 'kem' }, { v: 'cookie', label: 'cookie', sub: 'bánh quy' }] },
    { key: 'a', opts: [{ v: 'yes', label: 'Yes, please.', sub: 'có ạ' }, { v: 'no', label: 'No, thank you.', sub: 'không ạ' }] }],
  init: { f: 'orange', a: 'yes' },
  say: ({ f, a }) => ({ en: `*Would you like* ${OFFER[f][0]}? ${a === 'yes' ? 'Yes, please.' : 'No, thank you.'}`, vi: `Con ăn ${OFFER[f][1]} không? ${a === 'yes' ? 'Có ạ, con cảm ơn.' : 'Không ạ, con cảm ơn.'}` }),
  draw: ({ f, a }) => {
    const yes = a === 'yes';
    return indoor() + person(130, G, 'me', 'give', { s: 1, mood: 'happy' })
      + k(`food-${f}`, at(yes ? 330 : 196, yes ? G - 70 : G - 96, OFFER[f][2](), 0.9))
      + person(360, G, 'na', yes ? 'raise' : 'stand', { s: 1, mood: yes ? 'joy' : 'happy', flip: true })
      + k('q', at(130, 56, bubble(0, 0, 'Would you like...?', 15)))
      + k('a', at(370, 104, bubble(0, 0, yes ? 'Yes, please.' : 'No, thank you.', 15)))
      + (yes ? k('here', at(240, G + 22, label(0, 0, 'Here you are.', { s: 14, c: '#475569' }))) : '');
  },
};

// g35 have got / has got
const g35 = {
  groups: [{ key: 'w', opts: [{ v: 'I', label: 'I', sub: 'tớ' }, { v: 'She', label: 'She', sub: 'bạn gái' }] },
    { key: 'h', opts: [{ v: 'yes', label: 'got', sub: 'có' }, { v: 'no', label: "haven't / hasn't", sub: 'không có' }] }],
  init: { w: 'I', h: 'yes' },
  say: ({ w, h }) => {
    const she = w === 'She', yes = h === 'yes';
    const en = she ? (yes ? 'She *has got* a dog.' : "She *hasn't got* a dog.") : (yes ? "I*'ve got* a dog." : "I *haven't got* a dog.");
    return { en, vi: `${she ? 'Bạn ấy' : 'Tớ'} ${yes ? 'có' : 'không có'} một con chó.` };
  },
  draw: ({ w, h }) => {
    const yes = h === 'yes';
    const word = w === 'She' ? (yes ? 'has got' : "hasn't got") : (yes ? 'have got' : "haven't got");
    return outdoor() + person(170, G, w === 'She' ? 'na' : 'bon', yes ? 'stand' : 'stand', { s: 1.15, mood: yes ? 'joy' : 'sad' })
      + (yes ? k('dog', at(300, G, dog(), 1.1)) + heart(330, G - 110, 1.4) : `<g opacity=".25">${at(300, G, dog(), 1.1)}</g>` + k('x', badge(false, 300, G - 110, 22)))
      + k('word', at(240, 50, label(0, 0, word, { s: 26, c: yes ? '#15803D' : '#B91C1C' })));
  },
};

// g36 Can I...? / Can you...?
const ASK = {
  cake: ['*Can I* have some cake? Yes, you can.', 'Con ăn bánh được không ạ? Được.', 'Can I have some cake?'],
  out: ['*Can I* go out? Yes, you can.', 'Con ra ngoài được không ạ? Được.', 'Can I go out?'],
  help: ['*Can you* help me? Yes, of course.', 'Mẹ giúp con được không? Được chứ.', 'Can you help me?'],
};
const g36 = {
  groups: [{ key: 'q', opts: [{ v: 'cake', label: 'Can I have...?', sub: 'xin đồ' }, { v: 'out', label: 'Can I go...?', sub: 'xin phép' }, { v: 'help', label: 'Can you help...?', sub: 'nhờ' }] }],
  init: { q: 'cake' },
  say: ({ q }) => ({ en: ASK[q][0], vi: ASK[q][1] }),
  draw: ({ q }) => {
    const thing = q === 'cake' ? at(250, G, table(), 0.9) + at(250, G - 76, cake(), 0.8)
      : q === 'out' ? at(250, G, door(true)) : at(250, G, `<g transform="scale(1.3)"><rect x="-40" y="-60" width="80" height="60" fill="#D97706" ${S(1.3)}/><rect x="-10" y="-60" width="20" height="60" fill="#FBBF24" opacity=".6"/></g>`);
    return indoor() + k(`t-${q}`, thing)
      + person(q === 'help' ? 170 : 120, G, 'bon', q === 'help' ? 'hold' : 'point', { s: 1, mood: q === 'help' ? 'sad' : 'happy', prop: 'calf' })
      + person(390, G, 'me', 'stand', { s: 1, mood: 'joy', flip: true })
      + k('q', at(140, 58, bubble(0, 0, ASK[q][2], 15)))
      + k('a', at(380, 92, bubble(0, 0, q === 'help' ? 'Yes, of course.' : 'Yes, you can.', 15)));
  },
};

// g37 Which / How old / How many
const g37 = {
  groups: [{ key: 'q', opts: [{ v: 'Which', label: 'Which', sub: 'cái nào' }, { v: 'How old', label: 'How old', sub: 'mấy tuổi' }, { v: 'How many', label: 'How many', sub: 'mấy cái' }] }],
  init: { q: 'Which' },
  say: ({ q }) => ({
    Which: { en: '*Which* balloon is yours? The red one.', vi: 'Quả bóng nào của bạn? Quả màu đỏ.' },
    'How old': { en: '*How old* are you? I am seven.', vi: 'Bạn mấy tuổi? Tớ bảy tuổi.' },
    'How many': { en: '*How many* cats are there? Three.', vi: 'Có mấy con mèo? Ba con.' },
  })[q],
  draw: ({ q }) => {
    const balloon = (x, y, c) => `<path d="M${x} ${y + 30} Q${x - 6} ${y + 70} ${x - 30} ${G - 110}" stroke="${LINE}" stroke-width="1" fill="none"/><ellipse cx="${x}" cy="${y}" rx="22" ry="28" fill="${c}" ${S(1.2)}/>`;
    const r = { Which: [110, 78, 56], 'How old': [240, G - 82, 66], 'How many': [388, G - 36, 84] }[q];
    return indoor() + balloon(92, 70, '#EF4444') + balloon(132, 84, '#3B82F6') + person(86, G, 'na', 'raise', { s: 1, mood: 'joy' })
      + at(240, G, table(), 0.8) + at(240, G - 67, cake(7), 0.9)
      + [[350, '#FB923C'], [392, '#A8A29E'], [434, '#FCD34D']].map(([x, c]) => at(x, G, cat(c, { sit: true }), 0.9)).join('')
      + k('ring', ring(...r))
      + k('word', at(240, 40, label(0, 0, `${q}?`, { s: 26 })));
  },
};

// g38 an orange / some milk
const CNT = {
  apple: [true, 'apple', 'quả táo', () => apple(22)],
  egg: [true, 'egg', 'quả trứng', () => egg()],
  milk: [false, 'milk', 'sữa', () => glass('#fff')],
  rice: [false, 'rice', 'cơm', () => riceBowl()],
};
const g38 = {
  groups: [{ key: 't', opts: Object.keys(CNT).map((t) => ({ v: t, label: t, sub: CNT[t][2] })) }, { key: 'n', opts: [{ v: 1, label: 'one', sub: 'một' }, { v: 3, label: 'many', sub: 'nhiều' }] }],
  init: { t: 'apple', n: 1 },
  say: ({ t, n }) => {
    const [count, w, vi] = CNT[t];
    if (!count) return { en: `I want *some ${w}*.`, vi: `Tớ muốn ít ${vi}. (${w} không đếm được: không có a, không thêm s)` };
    return n === 1 ? { en: `I want *${w === 'apple' || w === 'egg' ? 'an' : 'a'} ${w}*.`, vi: `Tớ muốn một ${vi}.` } : { en: `I want *three ${w}s*.`, vi: `Tớ muốn ba ${vi}.` };
  },
  draw: ({ t, n }) => {
    const [count, w] = CNT[t];
    const m = count ? n : 1;
    const xs = Array.from({ length: m }, (_, i) => 240 + (i - (m - 1) / 2) * 90);
    const phrase = count ? (n === 1 ? `an ${w}` : `three ${w}s`) : `some ${w}`;
    return indoor() + `<rect x="100" y="${G - 14}" width="280" height="14" rx="4" fill="#A16207" ${S(1)}/>`
      + xs.map((x, i) => k(`${t}${i}`, at(x, G - 14, CNT[t][3](i), count ? 1.2 : 1.3))).join('')
      + k('tag', at(240, 130, label(0, 0, count ? 'đếm được' : 'không đếm được', { s: 15, c: count ? '#15803D' : '#B45309', bg: count ? '#DCFCE7' : '#FEF3C7' })))
      + k('word', bigWord(200, 76, phrase, 32));
  },
};

export const STARTERS_DEMOS = { g29, g30, g31, g32, g33, g34, g35, g36, g37, g38 };

// ── hình nhỏ tự vẽ thay emoji (gốc ở chân, giữa; cao khoảng 60) ──
const plane = () => `<g><path d="M-44 -24 Q-44 -34 -30 -34 H30 Q46 -34 50 -26 Q46 -18 30 -18 H-30 Q-44 -18 -44 -24Z" fill="#E2E8F0" ${S(1.2)}/>
  <path d="M-6 -30 L-24 -58 H-12 L14 -30Z M-6 -22 L-20 0 H-8 L14 -22Z M-40 -30 L-48 -46 H-38 L-30 -32Z" fill="#60A5FA" ${S(1)}/>
  ${[-20, -8, 4, 16].map((x) => `<circle cx="${x}" cy="-27" r="2.6" fill="#0EA5E9"/>`).join('')}</g>`;
const basket = () => `<g><path d="M-26 -30 Q-24 -58 0 -58 Q24 -58 26 -30" stroke="#A16207" stroke-width="5" fill="none"/>
  <path d="M-32 -30 H32 L26 0 H-26Z" fill="#D6A26B" ${S(1.2)}/><path d="M-30 -20 H30 M-28 -10 H28 M-14 -30 L-12 0 M0 -30 V0 M14 -30 L12 0" stroke="#A16207" stroke-width="1.4"/>
  <path d="M-34 -30 H34" stroke="#EF4444" stroke-width="5"/><circle cx="-8" cy="-36" r="7" fill="#EF4444" ${S(.8)}/><circle cx="8" cy="-35" r="6" fill="#FDE047" ${S(.8)}/></g>`;
const fire = () => `<g><path d="M0 0 C-30 0 -30 -30 -14 -46 C-12 -34 -4 -32 -4 -32 C-10 -50 0 -64 10 -70 C8 -52 30 -42 26 -18 C24 -6 14 0 0 0Z" fill="#F97316" ${S(1.2)}/>
  <path d="M0 0 C-14 0 -16 -14 -6 -24 C-4 -16 2 -16 2 -16 C0 -26 6 -34 10 -36 C10 -24 18 -18 14 -8 C12 -2 6 0 0 0Z" fill="#FDE047"/></g>`;
const soap = () => `<g><rect x="-30" y="-30" width="60" height="30" rx="12" fill="#F9A8D4" ${S(1.2)}/><rect x="-18" y="-22" width="36" height="12" rx="6" fill="#FBCFE8"/>
  ${[[-20, -42, 8], [2, -50, 10], [20, -40, 7]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#E0F2FE" stroke="#7DD3FC" stroke-width="1.4"/><circle cx="${x - r / 3}" cy="${y - r / 3}" r="${r / 4}" fill="#fff"/>`).join('')}</g>`;
const toothbrush = () => `<g transform="rotate(-35)"><rect x="-6" y="-70" width="12" height="70" rx="6" fill="#38BDF8" ${S(1.2)}/><rect x="-7" y="-92" width="14" height="24" rx="4" fill="#fff" ${S(1)}/>
  ${[-86, -80, -74].map((y) => `<path d="M-7 ${y} H-16" stroke="#7DD3FC" stroke-width="3" stroke-linecap="round"/>`).join('')}</g>`;
const notes = () => `<g fill="#7C3AED" stroke="${LINE}" stroke-width="1"><ellipse cx="-20" cy="-8" rx="10" ry="8"/><ellipse cx="18" cy="-18" rx="10" ry="8"/>
  <path d="M-11 -10 V-64 L27 -74 V-20" fill="none" stroke="#7C3AED" stroke-width="5"/><path d="M-11 -64 L27 -74 V-62 L-11 -52Z"/></g>`;
const gift = () => `<g><rect x="-34" y="-50" width="68" height="50" rx="4" fill="#F472B6" ${S(1.3)}/><rect x="-7" y="-50" width="14" height="50" fill="#FDE047" ${S(1)}/>
  <rect x="-40" y="-62" width="80" height="14" rx="3" fill="#EC4899" ${S(1.2)}/><rect x="-7" y="-62" width="14" height="14" fill="#FDE047" ${S(1)}/>
  <path d="M0 -62 Q-18 -82 -22 -68 Q-20 -60 0 -62 Q18 -82 22 -68 Q20 -60 0 -62" fill="#FDE047" ${S(1)}/></g>`;
const cheese = () => `<g><path d="M-36 0 V-30 L30 -52 L36 -30 V0Z" fill="#FDE047" ${S(1.3)}/><path d="M-36 -30 H36" stroke="${LINE}" stroke-width="1.2"/>
  ${[[-18, -14, 6], [8, -10, 5], [22, -20, 4], [-2, -36, 4]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#FACC15" stroke="#CA8A04" stroke-width="1"/>`).join('')}</g>`;
const rabbit = () => `<g><ellipse cx="6" cy="-20" rx="24" ry="20" fill="#F5F5F4" ${S(1.2)}/><circle cx="30" cy="-24" r="7" fill="#fff" ${S(1)}/>
  <path d="M-22 -50 Q-30 -90 -20 -92 Q-12 -90 -14 -52Z M-8 -50 Q-6 -92 4 -90 Q12 -86 0 -50Z" fill="#F5F5F4" ${S(1.1)}/><path d="M-20 -56 Q-24 -82 -19 -84 M-4 -56 Q0 -82 4 -82" stroke="#FDA4AF" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="-14" cy="-40" r="16" fill="#F5F5F4" ${S(1.2)}/><circle cx="-20" cy="-42" r="2.4" fill="#1F1716"/><circle cx="-8" cy="-42" r="2.4" fill="#1F1716"/><path d="M-16 -34 h4 l-2 2z" fill="#F43F5E"/></g>`;
const swimmer = () => `<g><circle cx="0" cy="-26" r="11" fill="#FCD9B8" ${S(1)}/><path d="M-11 -30 Q0 -42 11 -30Z" fill="#2563EB"/><path d="M8 -24 L22 -36" stroke="#FCD9B8" stroke-width="5" stroke-linecap="round"/>
  <path d="M-26 -12 q6 -6 13 0 t13 0 t13 0 t13 0" stroke="#0EA5E9" stroke-width="4" fill="none"/><path d="M-26 -2 q6 -6 13 0 t13 0 t13 0 t13 0" stroke="#0EA5E9" stroke-width="4" fill="none"/></g>`;

// Hình dùng chung cho demosMovers.js, demosFlyers.js.
export { plane, basket, fire, soap, toothbrush, notes, gift, cheese, rabbit, swimmer };
export { emo, cake, plate, glass, riceBowl, orange, cookie, chair, door, win, bed, coat, hat, teddy, sheep, phone, book, lamp, rain, snow, greyClouds, shop, card, chip, ring, arrowR, sky, capWord };
