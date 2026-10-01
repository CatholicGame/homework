// Tiền tiểu học — engine chung (games/preschool/engine.js, play4.js, hand/handInput.js): lời Thỏ, nút, nhãn.
import { englishNumber, vnRead } from '../../../engine/i18n.js';
import { numberWord } from '../../../games/preschool/numbers.js';

// Đồ vật đếm ở Phần 1 (Tập 1): [đồ vật, số, số ít, số nhiều]
const THINGS = [
  ['con bướm', 1, 'butterfly', 'butterflies'],
  ['cái bánh ngọt', 2, 'cake', 'cakes'],
  ['con cừu', 3, 'sheep', 'sheep'],
  ['cái ô', 4, 'umbrella', 'umbrellas'],
  ['cái xe đạp', 5, 'bicycle', 'bicycles'],
  ['cây bắp cải', 6, 'cabbage', 'cabbages'],
  ['cái trống', 7, 'drum', 'drums'],
  ['quả dưa hấu', 8, 'watermelon', 'watermelons'],
  ['cốc nước trái cây', 9, 'glass of juice', 'glasses of juice'],
  ['đĩa bánh', 10, 'plate of cakes', 'plates of cakes'],
];
const thingEntries = Object.fromEntries(THINGS.flatMap(([vi, n, one, many]) => [
  [`Có mấy ${vi}`, `How many ${many} are there`],
  [`Bé chạm vào từng ${vi} để đếm, rồi chọn số đúng`, `Tap each ${one} to count, then choose the right number`],
  [`Có ${numberWord(n)} ${vi}`, n === 1 ? `There is ${englishNumber(n)} ${one}` : `There are ${englishNumber(n)} ${many}`],
]));

// Tên hai bên khi so sánh (Tập 2).
const SIDES = [
  ['nhóm bên trái', 'the left group'], ['nhóm bên phải', 'the right group'], ['hàng trên', 'the top row'],
  ['hàng dưới', 'the bottom row'], ['bên trái', 'the left side'], ['bên phải', 'the right side'],
];
const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
const sideEntries = Object.fromEntries(SIDES.flatMap(([vi, en]) => [
  [`Bé chạm vào từng cái ở ${vi} để đếm lại`, `Tap each one in ${en} to count again`],
  [`${cap(vi)} có mấy cái`, `How many are in ${en}`],
]));

// Quả trong "Vườn quả" (Tập 1, Phần 2).
const FRUITS = [
  ['quả cam', 'oranges'], ['quả táo', 'apples'], ['quả bí ngô', 'pumpkins'], ['quả măng cụt', 'mangosteens'],
  ['quả cà chua', 'tomatoes'], ['quả dưa hấu', 'watermelons'], ['ô', 'boxes'],
];
const fruitEntries = Object.fromEntries(FRUITS.map(([vi, en]) => [
  `Bé kéo số vào ${vi} còn trống, theo thứ tự từ một đến mười`,
  `Drag the numbers onto the empty ${en}, in order from one to ten`,
]));

export default {
  // ── Bản đồ ──
  'Sao đã nhận trong sách này': 'Stars earned in this book',
  'Nghe lại': 'Listen again',
  'Chào bé! Chạm vào một trạm để cùng chơi!': "Hi there! Tap a stop and let's play!",
  'Chào bé! Chạm vào trạm có bạn Thỏ để chơi tiếp!': 'Hi there! Tap the stop with Bunny to keep playing!',
  'Bé đã hoàn thành tất cả các trạm. Giỏi quá!': 'You finished all the stops. Great job!',
  'Bật âm thanh': 'Turn sound on',
  'Tắt âm thanh': 'Turn sound off',
  'Về bản đồ': 'Back to the map',

  // ── Một lượt chơi ──
  'Các lượt chơi': 'Rounds',
  'Lượt {0}': 'Round {0}',
  'Nghe lại lời dặn': 'Hear the instructions again',
  'Sao nhận được khi làm xong': 'Stars you get when you finish',
  'Chưa đúng rồi, bé thử lại!': 'Not quite, try again!',
  'Giỏi quá! Bé làm đúng rồi!': 'Great job! You got it right!',
  'Hoàn thành': 'Finish',
  'Lượt tiếp theo': 'Next round',
  'Hoàn thành!': 'All done!',
  'Bé chơi giỏi lắm!': 'You played really well!',
  'Bài {0}: Số {1}': 'Lesson {0}: Number {1}',
  '🗺️ Bản đồ': '🗺️ Map',
  'Chơi tiếp ➜': 'Keep playing ➜',
  'Hoan hô! Bé đã hoàn thành trạm này rồi!': 'Hooray! You finished this stop!',
  'Đếm lại': 'Count again',
  'Chạm để đếm': 'Tap to count',
  'Chụm ngón để đếm': 'Pinch to count',

  // Lời khen, lời nhắc chung
  'Đúng rồi': 'Correct',
  'Giỏi quá': 'Great job',
  'Tuyệt vời': 'Awesome',
  'Chính xác': 'Exactly right',
  'Chưa đúng rồi': 'Not quite',
  'Bé đếm lại': 'Count again',
  'Bé thử lại': 'Try again',
  'Bé tính lại': 'Work it out again',

  // ── Làm quen số ──
  'Số {0}': 'Number {0}',
  '🎨 Chạm để tô màu các số {0}': '🎨 Tap to color each number {0}',
  'Đây là số {0}': 'This is number {0}',
  'Bé chạm vào hình để đếm, rồi tô màu các số {0}': 'Tap the picture to count, then color each number {0}',

  // ── Nối số với hình ──
  'Hình này chưa đúng': 'This picture is not right',
  'Bé đếm lại xem có đủ {0} không': 'Count again to see if there are {0}',
  'Hình này có {0}': 'This picture has {0}',
  'Còn một hình nữa đấy': 'There is one more picture',
  'Bé hãy tìm các hình có {0} đồ vật để nối với số {1}': 'Find the pictures with {0} things and match them to number {1}',
  'Có {0} hình đúng đấy': 'There are {0} right pictures',
  'Bé hãy tìm hình có {0} đồ vật để nối với số {1}': 'Find the picture with {0} things and match it to number {1}',
  'Bé hãy tìm hình có một đồ vật để nối với số một': 'Find the picture with one thing and match it to number one',
  'Bé đếm lại xem có đủ một không': 'Count again to see if there is one',

  // ── Đếm rồi chọn số ──
  'Bé đếm lại thật chậm': 'Count again, nice and slowly',
  'Bé chạm vào từng hình để đếm': 'Tap each thing to count',
  'Có {0}': 'There are {0}',
  'Có một': 'There is one',
  ...thingEntries,
  'Bé đếm xem có bao nhiêu, rồi khoanh vào số đúng': 'Count how many there are, then circle the right number',
  'Bé hãy đếm đồ vật, rồi chọn số để điền vào ô trống': 'Count the things, then choose a number for the empty box',

  // ── Tô số ──
  'Chọn chỗ đặt bút': 'Choose where to start',
  'Ô tô': 'Car',
  'Chấm xanh': 'Green dot',
  'Bé đặt ngón tay vào ô tô': 'Put your finger on the car',
  'Bé đặt ngón tay vào chấm xanh': 'Put your finger on the green dot',
  'Bé đặt ngón tay vào ô tô, rồi tô theo nét số {0}': 'Put your finger on the car, then trace the number {0}',
  'Bé đặt ngón tay vào chấm xanh, rồi tô theo nét số {0}': 'Put your finger on the green dot, then trace the number {0}',
  'Bé đã viết được số {0}': 'You wrote the number {0}',
  'Thêm một lần nữa': 'One more time',
  'Tô lại lần nữa nào': "Let's trace it again",

  // ── Chạm theo thứ tự ──
  'Bé tìm quả số {0}': 'Find strawberry number {0}',
  'Bé đếm từ một đến mười rồi': 'You counted from one to ten',
  'Bé chạm vào các quả dâu theo thứ tự từ một đến mười': 'Tap the strawberries in order from one to ten',

  // ── Kéo số vào ô trống ──
  'Chưa đúng chỗ rồi': 'Not the right spot',
  'Bé đếm lại các số xem': 'Count the numbers again',
  'Bé điền đủ các số rồi': 'You filled in all the numbers',
  'Bé chọn một số ở dưới trước': 'First choose a number below',
  'Toa tàu nào còn thiếu số': 'Which train cars are missing a number',
  'Bé kéo số vào đúng toa tàu': 'Drag each number onto the right train car',
  'Quả bóng nào còn thiếu số': 'Which balloons are missing a number',
  'Bé kéo số vào đúng quả bóng': 'Drag each number onto the right balloon',
  ...fruitEntries,

  // ── Hàng trên + hàng dưới ──
  'Hàng trên': 'Top row',
  'Hàng dưới': 'Bottom row',
  'Hàng trên có mấy đồ vật? Bé đếm rồi chọn số!': 'How many things are in the top row? Count, then choose the number!',
  'Hàng dưới có mấy đồ vật?': 'How many things are in the bottom row?',
  'Cả hai hàng có tất cả bao nhiêu đồ vật? Bé đếm tiếp!': 'How many things are in both rows altogether? Keep counting!',
  '{0} với {1} là {2}': '{0} and {1} make {2}',

  // ── So sánh (Tập 2) ──
  'Dấu bé hơn': 'Less-than sign',
  'Dấu lớn hơn': 'Greater-than sign',
  'Dấu bằng': 'Equals sign',
  '{0} bé hơn {1}': '{0} is less than {1}',
  '{0} lớn hơn {1}': '{0} is greater than {1}',
  ...sideEntries,
  'Bé chạm để đếm, rồi chọn số': 'Tap to count, then choose the number',
  'Hai bên chưa bằng nhau đâu': 'The two sides are not equal',
  'Hai bên bằng nhau đấy': 'The two sides are equal',
  'Bé chọn dấu bằng': 'Choose the equals sign',
  'Miệng dấu luôn mở về phía nhiều hơn đấy': 'The open side of the sign always faces the bigger number',
  'Bé đếm hai bên, rồi chọn dấu bé hơn, bằng, hay lớn hơn': 'Count both sides, then choose less than, equals, or greater than',
  '{0} với {1}': '{0} and {1}',
  'Bé chọn dấu nào': 'Which sign do you choose',
  'Bên có {0} mới là nhiều hơn': 'The side with {0} is the one with more',
  'Hàng nào nhiều hơn': 'Which row has more',
  'Bé chạm vào hàng đó': 'Tap that row',
  'Bên nào nhiều hơn': 'Which side has more',
  'Bé chạm vào bên đó': 'Tap that side',

  // Gạch bớt
  'Hàng này ít hơn rồi': 'This row already has fewer',
  'Bé gạch ở hàng nhiều hơn': 'Cross out things in the row with more',
  'Bây giờ {0} hàng bằng nhau, đều có {1}': 'Now both rows are equal, they each have {1}',
  'Hàng nào nhiều hơn? Bé chạm để gạch bớt đồ vật ở hàng đó, cho đến khi hai hàng bằng nhau!':
    'Which row has more? Tap to cross out things in that row until both rows are equal!',

  // Nối nhóm bằng nhau
  'Bây giờ bé tìm nhóm bên kia có số lượng bằng nhóm này!': 'Now find the group on the other side with the same number as this one!',
  'Hai nhóm này chưa bằng nhau': 'These two groups are not equal',
  'Giỏi quá! Bé đã nối đúng hết các nhóm bằng nhau!': 'Great job! You matched all the equal groups!',
  '{0} nhóm đều có {1}': 'Both groups have {1}',
  'Bé chạm một nhóm, rồi chạm nhóm bên kia có số lượng bằng nhau để nối!': 'Tap a group, then tap the group on the other side with the same number to match them!',

  // Nhiều nhất / ít nhất
  'Hình này có {0} thôi': 'This picture has only {0}',
  'Bé đếm các hình khác': 'Count the other pictures',
  'Hình này nhiều nhất, có {0}': 'This picture has the most, {0}',
  'Hình này ít nhất, có {0}': 'This picture has the fewest, {0}',
  'Hình nào có nhiều đồ vật nhất? Bé chạm vào hình đó!': 'Which picture has the most things? Tap that picture!',
  'Hình nào có ít đồ vật nhất? Bé chạm vào hình đó!': 'Which picture has the fewest things? Tap that picture!',

  // Dấu bé, dấu lớn
  '< Dấu bé': '< Less-than sign',
  '> Dấu lớn': '> Greater-than sign',
  'Dấu bé. Ít hơn thì bé hơn. Mũi nhọn chỉ sang bên trái. Hai bé hơn bốn.':
    'The less-than sign. Fewer means less than. The point faces left. Two is less than four.',
  'Dấu lớn. Nhiều hơn thì lớn hơn. Mũi nhọn chỉ sang bên phải. Tám lớn hơn bốn.':
    'The greater-than sign. More means greater than. The point faces right. Eight is greater than four.',
  'Giỏi quá! Bé đã biết dấu bé và dấu lớn rồi!': 'Great job! Now you know the less-than and greater-than signs!',
  'Bé chạm vào từng hình để nghe về dấu bé và dấu lớn!': 'Tap each picture to hear about the less-than and greater-than signs!',

  // ── Bé Tập Làm Toán (play4.js) ──
  'Ô trống': 'Empty box',
  'Xoá': 'Delete',
  'Dấu cộng': 'Plus sign',
  'Dấu trừ': 'Minus sign',
  'cộng': 'plus',
  'trừ': 'minus',
  'bằng': 'equals',
  'Thêm vào là cộng, bớt đi là trừ đấy': 'Adding more means plus, taking away means minus',
  'Bé nhìn hình đếm lại': 'Look at the picture and count again',
  'Bé tính đúng hết rồi': 'You got them all right',
  'Bé trả lời đúng hết rồi': 'You answered them all correctly',
  'Bé quan sát thật kỹ rồi chọn lại': 'Look very carefully and choose again',
  'Còn {0} đáp án nữa đấy': 'Still {0} more to find',
  'Chỗ {0}': 'Spot {0}',
  'Bé tìm thêm': 'Find more',
  'Bé tìm chỗ khác': 'Try another spot',
  'Bé tìm đúng hết rồi': 'You found them all',
  'Còn {0} chỗ nữa': 'Still {0} more to find',
  'Hai hình này chưa khớp nhau': 'These two do not match',
  'Bé nối đúng hết rồi': 'You matched them all',
  'Bé so sánh lại xem cái nào đứng trước': 'Compare again to see which one comes first',
  'Bé xếp đúng thứ tự rồi': 'You put them in the right order',
  'Bé tìm số {0}': 'Find the number {0}',
  'Ô này không nằm cạnh ô vừa đi': 'This box is not next to the last one',
  'Bé đi ngang hoặc dọc thôi': 'Only go across or up and down',
  'Đi lối này sẽ bị tắc đường đấy': 'This way leads to a dead end',
  'Bé tìm ô khác': 'Find another box',
  'Bé đã tìm được đường về rồi': 'You found the way home',
  'Bé nhìn số đứng trước và đứng sau': 'Look at the numbers before and after',
  // Giờ đọc to ("9:30" → "chín giờ ba mươi phút")
  '{0} giờ': "{0} o'clock",
  '{0} giờ {1} phút': '{0} {1}',

  // ── Cách chơi: chạm / bàn tay trước camera (hand/handInput.js) ──
  'Cách chơi': 'How to play',
  'Chạm màn hình': 'Touch the screen',
  'Bé chạm ngón tay vào màn hình.': 'Touch the screen with your finger.',
  'Dùng bàn tay': 'Use your hand',
  'Dùng bàn tay trước camera': 'Use your hand in front of the camera',
  'Đưa tay tới hình, chụm ngón cái và ngón trỏ để chọn.': 'Move your hand to a picture, then pinch your thumb and index finger to choose.',
  'Bàn tay, thấy mình': 'Hand, see yourself',
  'Như trên, bé thấy chính mình phía sau.': 'Same as above, and you can see yourself in the background.',
  'Bé chơi bằng cách nào?': 'How do you want to play?',
  'Nền màn hình': 'Screen background',
  'Nền trò chơi': 'Game background',
  'Camera nhỏ ở góc': 'Small camera in the corner',
  'Nền camera': 'Camera background',
  'Bé thấy mình phía sau': 'You see yourself behind the game',
  'Trình duyệt này chưa cho dùng camera. Hãy mở trang bằng địa chỉ https:// (hoặc localhost trên máy tính).':
    'This browser does not allow the camera yet. Open the page with an https:// address (or localhost on a computer).',
  'Hình camera chỉ xử lý trên máy này, không gửi đi đâu.': 'The camera picture is only processed on this device and is never sent anywhere.',
  'Đang mở camera...': 'Opening the camera...',
  'Bé giơ bàn tay lên trước camera!': 'Hold your hand up in front of the camera!',
  'Đang chuẩn bị...': 'Getting ready...',
  'Chưa được phép dùng camera. Bé chơi bằng cách chạm màn hình.': 'The camera is not allowed. Play by touching the screen.',
  'Không mở được camera. Bé chơi bằng cách chạm màn hình.': 'The camera could not be opened. Play by touching the screen.',
  'Bé đưa tay tới hình. Chụm ngón cái và ngón trỏ lại để chọn!': 'Move your hand to a picture. Pinch your thumb and index finger together to choose!',
  'đưa tới hình': 'move to a picture',
  'chụm ngón để chọn': 'pinch to choose',
  'chụm giữ ở chỗ trống để kéo trang': 'pinch and hold on an empty spot to scroll',
  'chụm ngón cái và ngón trỏ để tô': 'pinch your thumb and index finger to trace',
  'tách ra để dừng': 'open them to stop',
};

// ════════════════════════════════════════════════════════════════════════════
// Mẫu riêng
// ════════════════════════════════════════════════════════════════════════════
const onPreschool = () => typeof document !== 'undefined' && !!document.querySelector('.pk');

export const patterns = [
  // "🍓 Dâu tây" (tiêu đề trạm có biểu tượng phía trước)
  [/^((?:\p{Extended_Pictographic}|️|‍)+)\s+(.+)$/u, (m, tr) => {
    if (!onPreschool()) return null;
    const t = tr(m[2]);
    return t == null ? null : `${m[1]} ${t}`;
  }],
  // Nút trạm trên bản đồ: "Bài 1: Bé làm quen với số 1 — đã xong 2/4"
  [/^(.+) — đã xong (\d+)\/(\d+)$/, (m, tr) => {
    const t = tr(m[1]);
    return t == null ? null : `${t}: ${m[2]} of ${m[3]} done`;
  }],
  // aria-label nút cách chơi: "Cách chơi: Dùng bàn tay"
  [/^Cách chơi: (.+)$/, (m, tr) => {
    const t = tr(m[1]);
    return t == null ? null : `How to play: ${t}`;
  }],
];

// ════════════════════════════════════════════════════════════════════════════
// Lời Thỏ ghép động (cuối cùng): nhiều câu nối nhau, số đọc bằng chữ ("Đúng rồi! Năm với sáu là mười một!"),
// phép tính đọc to ("mười lăm trừ bốn bằng mấy"). Chỉ chạy trên trang Tiền tiểu học.
// ════════════════════════════════════════════════════════════════════════════
const READING = new Map(); // "hai mươi lăm" → 25 (1–100, cả cách đọc "mốt", "tư", "lăm")
for (let n = 1; n <= 100; n++) {
  READING.set(numberWord(n), n);
  READING.set(vnRead(n), n);
}
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const NUM_WORDS = new RegExp(`(?<![\\p{L}\\d])(${[...READING.keys()].sort((a, b) => b.length - a.length).map(esc).join('|')})(?![\\p{L}\\d])`, 'giu');
const MATH = /^(?:(?:\d+|mấy)\s*)?(?:(?:cộng|trừ|bằng)\s+(?:\d+|mấy)\s*)+$/i;
const OP_EN = { cộng: 'plus', trừ: 'minus', bằng: 'equals', mấy: 'what' };
const LETTERS = /^(?:[A-Z]|\d+)(?:\s+(?:[A-Z]|\d+))*$/;

/** Số đọc bằng chữ trong câu → chữ số; nums = các số đã đổi. */
function digitize(s) {
  const nums = new Set();
  const text = s.replace(NUM_WORDS, (w) => {
    const n = READING.get(w.toLowerCase());
    if (n == null) return w;
    nums.add(n);
    return String(n);
  });
  return { text, nums };
}
const spellNums = (t, nums) => t.replace(/\b\d+\b/g, (d) => (nums.has(Number(d)) ? englishNumber(Number(d)) : d));
const capLike = (out, src) => (/^\p{Lu}/u.test(src) ? out.charAt(0).toUpperCase() + out.slice(1) : out);

const cache = new Map();
function loose(s, tr) {
  if (!onPreschool()) return null;
  if (cache.has(s)) return cache.get(s);
  const out = looseRaw(s, tr);
  if (cache.size > 3000) cache.clear();
  cache.set(s, out);
  return out;
}
function looseRaw(s, tr) {
  const T = (p) => tr(p) ?? loose(p, tr);
  // Nhiều câu: dịch từng câu.
  const parts = s.split(/(?<=[.!?…])\s+(?=\S)/);
  if (parts.length > 1) {
    const out = parts.map(T);
    // Câu sau dấu chấm / chấm than luôn viết hoa ("Đúng rồi! mười một!" → "Correct! Eleven!").
    return out.every(x => x != null) ? out.map((x, i) => (i ? x.charAt(0).toUpperCase() + x.slice(1) : x)).join(' ') : null;
  }
  const [, core, punct = ''] = s.match(/^(.*?)\s*([.!?:…]+)?$/);
  if (!core) return null;
  if (punct) { const t = tr(core); if (t != null) return t + punct; }
  // "Hộp quà số năm mươi" (viết hoa đầu câu khi ghép lời khen) → khoá viết thường "hộp quà số {0}".
  if (/^\p{Lu}/u.test(core) && core.charAt(0).toLowerCase() !== core.charAt(0)) {
    const t = tr(core.charAt(0).toLowerCase() + core.slice(1));
    if (t != null) return capLike(t, core) + punct;
  }
  const { text, nums } = digitize(core);
  if (nums.size) {
    if (/^\d+$/.test(text)) return capLike(englishNumber(Number(text)), core) + punct;
    if (MATH.test(text)) {
      const en = text.split(/\s+/).map(w => (/^\d+$/.test(w) ? englishNumber(Number(w)) : OP_EN[w.toLowerCase()] || w)).join(' ');
      return capLike(en, core) + punct;
    }
    if (LETTERS.test(text)) return spellNums(text, nums) + punct;
    const t = tr(text);
    if (t != null) return capLike(spellNums(t, nums), core) + punct;
  }
  // Nhiều vế cách nhau bằng dấu phẩy: dịch từng vế.
  if (core.includes(', ')) {
    const out = core.split(', ').map(T);
    if (out.every(x => x != null)) return capLike(out.join(', '), core) + punct;
  }
  return null;
}

export const fallback = [[/[A-Za-zÀ-ỹ]/, (m, tr) => loose(m.input, tr)]];
