/**
 * Câu động của các hành động trên hình Lớp 2 (engine/pourPlay.js 🫗, balancePlay.js ⚖️, colorPaint.js 🖍️,
 * trains.js 🚃): Việt → Anh. Các câu này ghép từ tên đồ đựng / đồ vật / số lít nên dùng mẫu, không ghi từng câu.
 *
 * Một text node có thể chứa nhiều câu ("Rót hết ca 2 l thì thùng vừa đầy. Nhìn vạch trên thùng: có 6"),
 * và tên có chữ "l" nghiêng (<i>l</i>) cắt câu thành nhiều mảnh: "Đang rót nước ca 1" | l | "sang thùng."
 * Mỗi câu mẫu bên dưới vì thế khớp được cả câu trọn vẹn lẫn các mảnh cắt tại tên đồ đựng / số lít.
 */

const NOUN = { ca: 'jug', can: 'can', chai: 'bottle', 'cốc': 'cup', 'xô': 'bucket', 'bình': 'bottle', 'thùng': 'tank', 'ấm': 'kettle', 'bồn': 'tank' };
const NAMES = {
  'thùng': 'tank', 'cốc': 'cup', ca: 'jug', can: 'can', 'xô': 'bucket', 'ấm': 'kettle', 'bình': 'bottle', chai: 'bottle',
  'can to': 'big can', 'can trống': 'empty can', 'xô đỏ': 'red bucket', 'xô xanh': 'blue bucket',
  'bồn xe trên': 'top truck’s tank', 'bồn xe dưới': 'bottom truck’s tank',
  // ⚖️ đồ vật trên cân (data-name trong hình)
  'đồ vật': 'object', 'quả chanh': 'lemon', 'thỏ bông': 'toy rabbit', 'quyển sách': 'book', 'quả cam': 'orange',
  'chó bông': 'toy dog', 'quả bưởi': 'pomelo', 'túi gạo': 'bag of rice', 'quả táo': 'apple', 'quả dưa': 'melon',
  'quả dưa hấu': 'watermelon', 'quả bí ngô': 'pumpkin', 'con thỏ': 'rabbit', 'con mèo': 'cat', 'túi đường': 'bag of sugar',
  'túi táo': 'bag of apples', 'quả sầu riêng': 'durian', 'nải chuối': 'bunch of bananas', 'hộp sữa': 'carton of milk',
  'gấu bông': 'teddy bear', 'gói mì chính': 'pack of MSG', 'gói bột mì': 'bag of flour', 'gói bột canh': 'pack of seasoning salt',
  'con lợn': 'pig', 'con dê': 'goat', 'con chó': 'dog', 'con bò': 'cow', 'ba quả cam': 'three oranges',
  // ⚖️ tên cân
  'cân': 'scale', 'cân thứ nhất': 'first scale', 'cân thứ hai': 'second scale', 'cân thứ ba': 'third scale', 'cân thứ tư': 'fourth scale',
};
const LIQ = { 'nước': 'water', 'mật': 'honey', 'nước mắm': 'fish sauce' };
const SIDE = { 'trái': 'left', 'phải': 'right' };
const NUM_EN = (v) => v.replace(',', '.');
const cap1 = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const VESSEL = '(ca|can|chai|cốc|xô|bình)';

function plural(w) {
  const i = w.indexOf(' of ');
  if (i > 0) return plural(w.slice(0, i)) + w.slice(i);
  if (/(s|x|ch|sh)$/.test(w)) return `${w}es`;
  if (/[^aeiou]y$/.test(w)) return `${w.slice(0, -1)}ies`;
  return `${w}s`;
}

/** Tên tiếng Việt (có thể viết hoa chữ đầu) → tên tiếng Anh, null nếu không biết. */
function nameEn(vi, tr) {
  const v = vi.trim();
  const lc = v.charAt(0).toLowerCase() + v.slice(1);
  if (NAMES[lc]) return NAMES[lc];
  let m = lc.match(new RegExp(`^${VESSEL} (\\d+(?:,\\d+)?) l$`));
  if (m) return `${NUM_EN(m[2])} l ${NOUN[m[1]]}`;
  m = lc.match(/^(ca|can|chai|cốc|xô|bình|thùng) ([A-Z]|\d+)$/);
  if (m) return `${NOUN[m[1]]} ${m[2]}`;
  m = lc.match(/^bình giống hệt ([A-Z])$/);
  if (m) return `bottle identical to ${m[1]}`;
  m = lc.match(/^can giống can ([A-Z])$/);
  if (m) return `can like can ${m[1]}`;
  m = lc.match(/^quả cân (\d+(?:,\d+)?) (kg|g)$/);
  if (m) return `${NUM_EN(m[1])} ${m[2]} weight`;
  m = lc.match(/^túi số (\d+)$/);
  if (m) return `bag ${m[1]}`;
  m = lc.match(/^túi (\d+) kg$/);
  if (m) return `${m[1]} kg bag`;
  m = lc.match(/^cân ([A-Z]|[a-e]\))$/);
  if (m) return `scale ${m[1]}`;
  const t = tr(lc) ?? tr(v);
  return t && !/[À-ỹ]/.test(t) && !/[.!?]$/.test(t) ? t.charAt(0).toLowerCase() + t.slice(1) : null;
}
// "ca 1" | <i>l</i>: tên bị cắt trước chữ "l" ở cuối mảnh.
function splitNameEn(vi, count) {
  const m = vi.trim().toLowerCase().match(new RegExp(`^${VESSEL} (\\d+(?:,\\d+)?)$`));
  if (!m) return null;
  const noun = NOUN[m[1]];
  return `${count != null && count !== 1 ? plural(noun) : noun} of ${NUM_EN(m[2])}`;
}
// Tên kèm nhãn ("bottle A", "bucket 6") không cần "the".
const bare = (en) => /^[a-z]+ ([A-Z]|\d+)$/.test(en);

/** "2 quả cân 1 kg, quả cam" → "2 × 1 kg weight, orange". */
function listEn(vi, tr) {
  const out = vi.split(/,\s*/).map((part) => {
    const m = part.match(/^(\d+) (\D.*)$/);
    const n = m ? +m[1] : 1;
    const en = nameEn(m ? m[2] : part, tr);
    if (!en) return null;
    if (n === 1) return en;
    return /^\d/.test(en) ? `${n} × ${en}` : `${n} ${plural(en)}`;
  });
  return out.every(Boolean) ? out.join(', ') : null;
}

// ── câu mẫu: [Việt, Anh]. Chỗ trống: {A} {B} tên đồ đựng/đồ vật/cân, {L} chất lỏng, {N} số đếm (đi với {A}/{B} ngay sau),
// {V} số lít/kg, {T} nhãn câu ("a)" / "này"), {S} {S2} bên trái/phải, {X} {Y} danh sách đồ vật, {R} phần câu còn lại.
// Bản Anh giữ đúng thứ tự chỗ trống như bản Việt để cắt mảnh được.
const T = [
  // 🫗 rót, múc (pourPlay.js)
  ['{A} không còn {L} để rót.', 'The {A} has no {L} left to pour.'],
  ['{A} đầy rồi, không rót thêm được.', 'The {A} is full, you can’t pour any more.'],
  ['Đang rót {L} {A} sang {B}.', 'Pouring {L} from the {A} into the {B}.'],
  ['Chạm cốc tiếp theo để rót tiếp, chạm {A} để đặt về chỗ.', 'Tap the next cup to keep pouring, or tap the {A} to put it back.'],
  ['{A} hết {L} rồi.', 'The {A} has run out of {L}.'],
  ['{A} đầy rồi, đổ vào chỗ khác trước đã.', 'The {A} is full, pour it somewhere else first.'],
  ['Đang múc {L} trong {A}.', 'Scooping {L} from the {A}.'],
  ['{A} đầy rồi.', 'The {A} is full.'],
  ['Chạm {A} rồi chạm chỗ muốn đổ vào.', 'Tap the {A}, then tap where you want to pour it.'],
  ['Đã đặt {A} về chỗ.', 'Put the {A} back.'],
  ['{A} chưa có {L}.', 'The {A} has no {L} yet.'],
  ['Chạm đồ đựng có {L} trước.', 'Tap a container with {L} first.'],
  ['Chạm thùng để múc {L} vào {A}.', 'Tap the tank to scoop {L} into the {A}.'],
  ['Rót {L} {A} vào đâu?', 'Where do you want to pour the {L} from the {A}?'],
  ['Chạm đồ đựng muốn rót vào.', 'Tap the container you want to pour into.'],
  ['Vậy câu {T} đúng hay sai?', 'So is {T} true or false?'],
  ['Bé tự ghi vào ô.', 'Write it in the box yourself.'],
  ['Đã rót hết nước {A} sang {B}.', 'Poured all the water from the {A} into the {B}.'],
  ['Bé so mực nước hai bình.', 'Compare the water levels in the two bottles.'],
  ['Rót hết nước {A} thì {B} vừa đầy.', 'Pouring all the water from the {A} fills the {B} exactly.'],
  ['{A} đã đầy mà {B} vẫn còn nước.', 'The {A} is full, but the {B} still has water.'],
  ['Rót hết nước {A} mà {B} vẫn chưa đầy.', 'All the water from the {A} is poured, but the {B} is still not full.'],
  ['Đã đổ {N} {A} vào {B}.', 'Poured {N} {A} into the {B}.'],
  ['Rót hết {A} thì {B} vừa đầy.', 'Pouring all of the {A} fills the {B} exactly.'],
  ['{A} đã đầy.', 'The {A} is full.'],
  ['Đã rót hết {A} mà {B} vẫn chưa đầy.', 'All of the {A} is poured, but the {B} is still not full.'],
  ['Đã rót hết {A}.', 'All of the {A} is poured.'],
  ['{A} rót được đầy {N} {B}.', 'The {A} filled {N} {B}.'],
  ['Tất cả được đầy {N} {B}.', 'Altogether they filled {N} {B}.'],
  ['Nhìn vạch trên {A}: còn lại {V}', 'Look at the marks on the {A}: there are still {V}'],
  ['Nhìn vạch trên {A}: có {V}', 'Look at the marks on the {A}: it has {V}'],
  ['Nhìn vạch: {A} có {V}', 'Look at the marks: the {A} has {V}'],
  [', {A} có {V}', ', the {A} has {V}'],
  // ⚖️ cân (balancePlay.js)
  ['{A} thăng bằng, hai bên nặng bằng nhau.', 'The {A} is balanced, both sides weigh the same.'],
  ['{A} nghiêng về bên {S}, bên {S2} nặng hơn.', 'The {A} tips to the {S}, the {S2} side is heavier.'],
  ['Nhấc {A} xuống khay: {R}', 'Lifted the {A} onto the tray: {R}'],
  ['Đặt {A} lên đĩa {S} của {B}: {R}', 'Put the {A} on the {S} pan of the {B}: {R}'],
  ['Đặt {A} lên đĩa {S}: {R}', 'Put the {A} on the {S} pan: {R}'],
  ['{A} thăng bằng.', 'The {A} is balanced.'],
  ['Bên trái: {X}.', 'Left side: {X}.'],
  ['Bên phải: {X}.', 'Right side: {X}.'],
  ['Đặt {A} lên đĩa nào?', 'Which pan should the {A} go on?'],
  ['Chạm đĩa cân.', 'Tap a pan.'],
  ['Nhấc {A} xuống: {R}', 'Lifted the {A} off: {R}'],
  ['Đặt {A} lại lên cân: {R}', 'Put the {A} back on the scale: {R}'],
  ['đĩa trống, kim chỉ số 0.', 'the pan is empty, the needle points to 0.'],
  ['kim chỉ {V} kg.', 'the needle points to {V} kg.'],
  ['đĩa trống nên kim quay về vạch 0 trên cùng.', 'the pan is empty, so the needle goes back to the 0 mark at the top.'],
  ['đĩa nhẹ đi nên kim quay lùi lại.', 'the pan got lighter, so the needle turns back.'],
  ['kim quay tới vạch chỉ cân nặng của {A}.', 'the needle turns to the mark for the weight of the {A}.'],
  ['Bé đọc xem kim chỉ số nào?', 'Which number does the needle point to?'],
];

const GROUP = {
  A: '(.+?)', B: '(.+?)', L: '(nước mắm|nước|mật)', N: '(\\d+)', V: '(\\d+(?:,\\d+)?)', T: '([a-zđ]\\)|này)',
  S: '(trái|phải)', S2: '(trái|phải)', X: '(.+?)', R: '(.+)',
};
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const PH = /\{(A|B|L|N|V|T|S2|S|X|R)\}/g;
const holes = (s) => [...s.matchAll(PH)].map((m) => m[1]);
const viRe = (s) => s.split(PH).map((p, i) => (i % 2 ? GROUP[p] : esc(p))).join('');

// Mảnh của câu mẫu: từ đầu câu hoặc ngay sau một tên/số lít (cut) tới cuối câu hoặc tới một tên/số lít.
const CUTS = new Set(['A', 'B', 'V']);
const SLICES = [];
for (const [vi, en] of T) {
  const hv = holes(vi), he = holes(en);
  SLICES.push({ re: new RegExp(`^${viRe(vi)}$`), keys: hv, en, head: false, tail: false });
  if (hv.join() !== he.join()) continue; // thứ tự khác nhau: chỉ khớp cả câu
  const vp = vi.split(PH), ep = en.split(PH); // [text, key, text, key, ..., text]
  const n = hv.length;
  for (let a = -1; a < n; a++) {
    for (let b = a; b <= n; b++) {
      if (a === -1 && b === n) continue;            // cả câu: đã có
      if (a >= 0 && !CUTS.has(hv[a])) continue;     // bắt đầu ngay sau tên bị cắt
      if (b < n && !CUTS.has(hv[b])) continue;      // kết thúc bằng tên bị cắt
      if (b === a && a >= 0) continue;
      const join = (parts, from, to) => {
        // phần từ sau chỗ trống thứ `from` tới hết chỗ trống thứ `to` (to = n: tới cuối)
        let s = '', keys = [];
        for (let i = from + 1; i <= Math.min(to, n - 1); i++) { s += parts[2 * i] + `{${parts[2 * i + 1]}}`; keys.push(parts[2 * i + 1]); }
        if (to === n) s += parts[2 * n];
        return { s, keys };
      };
      const v = join(vp, a, b), e = join(ep, a, b);
      if (!/[À-ỹa-z]/i.test(v.s.replace(PH, ''))) continue;
      SLICES.push({
        re: new RegExp(`^${viRe(v.s.trim())}$`), keys: v.keys, en: e.s.trim(), head: b < n, tail: a >= 0,
      });
    }
  }
}

function fill(sl, m, tr) {
  const val = {};
  let count = null;
  for (let i = 0; i < sl.keys.length; i++) {
    const k = sl.keys[i], raw = m[i + 1];
    const last = sl.head && i === sl.keys.length - 1;
    if (k === 'A' || k === 'B') {
      const en = (last && splitNameEn(raw, count)) || nameEn(raw, tr);
      if (!en) return null;
      val[k] = count != null && count !== 1 && !last ? countName(en, count) : en;
      count = null;
    } else if (k === 'L') val[k] = LIQ[raw];
    else if (k === 'N') { count = +raw; val[k] = raw; }
    else if (k === 'V') val[k] = NUM_EN(raw);
    else if (k === 'T') val[k] = raw === 'này' ? 'this statement' : `statement ${raw}`;
    else if (k === 'S' || k === 'S2') val[k] = SIDE[raw];
    else if (k === 'X') { const x = listEn(raw, tr); if (!x) return null; val[k] = x; }
    else if (k === 'R') {
      const r = kitTr(raw, tr) ?? tr(raw);
      if (r == null) return null;
      val[k] = /^[a-zà-ỹ]/.test(raw) ? r.charAt(0).toLowerCase() + r.slice(1) : r;
    }
  }
  let out = sl.en.replace(/\b([Tt])he \{(A|B)\}/g, (s, t, k) => (bare(val[k]) ? `{${k}}` : s));
  out = out.replace(PH, (s, k) => val[k] ?? '');
  return cap1Like(out, sl.en);
}
// "3 ca 2 l" → "3 jugs of 2 l"; "3 cốc" → "3 cups".
function countName(en, n) {
  const m = en.match(/^(\d+(?:\.\d+)?) l (\w+)$/);
  if (m) return `${plural(m[2])} of ${m[1]} l`;
  return plural(en);
}
const cap1Like = (out, en) => (/^[A-Z]/.test(en) || /^\{/.test(en) ? cap1(out) : out);

function matchPiece(s, tr) {
  for (const sl of SLICES) {
    const m = s.match(sl.re);
    if (!m) continue;
    const out = fill(sl, m, tr);
    if (out != null) return out;
  }
  return null;
}

/** Cả một text node (có thể nhiều câu, mảnh đầu / cuối bị cắt). */
function kitTr(s, tr) {
  if (!/[À-ỹ]/.test(s)) return null;
  const pieces = s.split(/(?<=[.!?])\s+/);
  if (pieces.length === 1) return matchPiece(s, tr);
  let kit = false;
  const out = pieces.map((p, i) => {
    if (!/[A-Za-zÀ-ỹ]/.test(p)) return p;
    const k = matchPiece(p, tr);
    if (k != null) { kit = true; return i ? cap1(k) : k; }
    return tr(p);
  });
  return kit && out.every((p) => p != null) ? out.join(' ') : null;
}

export default {
  entries: {
    // ⚖️ khay đồ trong cảnh cân
    'Khay': 'Tray',
    // 🖍️ lớp phủ tô màu: chữ "màu …" trong đề được tô đúng màu bút (colorPaint.js markColors)
    'màu đỏ': 'red', 'màu xanh': 'blue', 'màu xanh lá': 'green', 'màu xanh lá cây': 'green', 'màu vàng': 'yellow',
    'màu xanh dương': 'blue', 'màu xanh da trời': 'sky blue', 'màu xanh nước biển': 'navy blue',
    'màu cam': 'orange', 'màu tím': 'purple', 'màu hồng': 'pink', 'màu nâu': 'brown',
    'Màu đỏ': 'Red', 'Màu xanh': 'Blue', 'Màu vàng': 'Yellow',
  },
  patterns: [
    // ⚖️ tiêu đề cảnh cân: "⚖️ " + đề của sách (cfg.title)
    [/^⚖️ (.+)$/, (m, tr) => { const t = tr(m[1]); return t == null ? null : `⚖️ ${t}`; }],
    // 🫗 nhãn dưới đồ đựng không tên: "giống hệt D"
    [/^giống hệt ([A-Z])$/, (m) => `same as ${m[1]}`],
    // 🫗 nhãn đồ đựng có "l" nghiêng tách riêng: "thùng 30" | l, "can to 15" | l
    [/^(ca|can|chai|cốc|xô|bình|thùng)( to)? (\d+(?:,\d+)?)$/, (m) => `${m[2] ? 'big ' : ''}${NOUN[m[1]]} ${NUM_EN(m[3])}`],
    // 🫗 ⚖️ câu nói sau mỗi lần rót / cân (ghép từ tên đồ vật)
    [/^[\s\S]+$/, (m, tr) => kitTr(m[0], tr)],
  ],
};
