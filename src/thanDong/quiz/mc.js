/**
 * Kịch bản lời MC của "Ai tài năng nhất" (chỉ tiếng Việt). Không phụ thuộc trình duyệt: dùng chung cho church/mcVoice.js
 * (đọc), scripts/tts-data.mjs (câu cố định vào api/_lib/ttsAllow.json) và api/tts.js (kiểm câu đọc trực tiếp).
 *
 * SCRIPT: mỗi tình huống một danh sách câu nói, MC rút ngẫu nhiên một câu (không lặp câu vừa nói) để nghe tự nhiên.
 * Chỗ trống trong {…}:
 *   - hữu hạn (ENUM): {so} số câu (một … mười lăm), {chu} {chu2} chữ cái đọc theo tên tiếng Việt (a, bê, xê, đê), {con} số quyền
 *     trợ giúp còn lại (một … bốn). Câu có những chỗ này được bung ra hết các trường hợp: thành câu cố định, mp3 tạo một lần, lưu R2.
 *   - tự do (LIVE): {ten} tên người chơi, {nguoiThan} tên người thân, {phanTram} phần trăm khán giả, {soHat} số hạt giống mang về
 *     (src/engine/seeds.js HOT). Câu có chỗ này mỗi lần một khác:
 *     đọc trực tiếp (voice.js say live, api/tts.js ?live=1), KHÔNG lưu R2; máy chủ chỉ đọc câu khớp khuôn (liveOk).
 * Phương án được xáo mỗi lần hỏi: chữ cái ("Đáp án bê.") đi riêng, rồi tới chữ của phương án, nên xáo không sinh câu mới.
 * Thêm câu: viết vào đúng tình huống, rồi `node scripts/tts-data.mjs` (và khởi động lại npm run dev).
 */
const NUM = ['một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười', 'mười một', 'mười hai', 'mười ba', 'mười bốn', 'mười lăm'];
// chữ cái đọc theo tên tiếng Việt: viết "A." thì giọng Azure đọc kiểu tiếng Anh (/ei/, /bi:/)
const L = ['a', 'bê', 'xê', 'đê'];

export const ENUM = { so: NUM, chu: L, chu2: L, con: NUM.slice(0, 4) };
// tên: chữ (có dấu), khoảng trắng, gạch nối, nháy; phần trăm: 0..100
const LIVE = { ten: "[\\p{L}\\p{M}][\\p{L}\\p{M} '-]{0,23}", nguoiThan: "[\\p{L}\\p{M}][\\p{L}\\p{M} '-]{0,23}", phanTram: '(?:100|[1-9]?\\d)', soHat: '(?:100|[1-9]?\\d)', conThieu: '[1-9]\\d?' };

export const SCRIPT = {
  // mở màn, khi người chơi ngồi vào ghế nóng
  welcome: [
    'Xin chào quý khán giả! Tôi là Thầy Minh, chào mừng các bạn đến với chương trình Ai tài năng nhất!',
    'Thầy Minh xin chào các bạn! Chào mừng các bạn đã đến với Ai tài năng nhất, nơi các bạn nhỏ cùng thử tài toán học!',
  ],
  // đọc khi người chơi ĐÃ ngồi ghế nóng: không mời bước lên nữa
  meet: [
    'Xin chào {ten}, rất vui được gặp bạn trên chiếc ghế nóng hôm nay.',
    'Chào mừng {ten} đã ngồi vào ghế nóng. Chúc bạn thật bình tĩnh và may mắn!',
    'Chào {ten}! Bạn đã sẵn sàng cho mười lăm câu hỏi của chúng ta chưa?',
  ],
  rules: [
    'Bạn sẽ trả lời mười lăm câu hỏi, từ dễ tới khó. Bạn có bốn quyền trợ giúp: năm mươi năm mươi, hỏi ý kiến khán giả, bỏ qua câu hỏi, và hỏi người thân.',
  ],
  // luật hạt giống (docs/HatGiong.md mục 4): đọc sau rules
  rulesSeeds: [
    'Mỗi câu đúng, bạn tiến thêm một bậc trên thang sao. Câu năm và câu mười là hai mốc an toàn. Từ câu mười, mỗi câu bạn vượt qua là một tấm giấy khen do tôi ký, và câu mười lăm mang về ba mươi ngôi sao!',
  ],
  start: ['Chúng ta bắt đầu thôi!', 'Và bây giờ, chúng ta cùng bắt đầu!'],
  // mời người chơi: đọc xong người ấy mới đứng dậy đi lên; xin vỗ tay: đọc xong khán giả mới vỗ; ghế chờ: đọc xong mới đi tới
  invite: ['Xin mời người chơi {ten} lên ghế nóng!', 'Và người chơi tiếp theo của chúng ta là {ten}. Xin mời!', 'Xin mời người chơi tiếp theo lên ghế nóng!'],
  nextReady: ['Xin mời người chơi tiếp theo vào ghế chờ.', 'Người chơi tiếp theo, xin mời chuẩn bị ở ghế chờ.'],
  applause: ['Xin một tràng pháo tay!', 'Mọi người cùng vỗ tay chào đón nào!'],
  // vào câu
  intro: ['Câu hỏi số {so}.'],
  milestone5: ['Đây là câu hỏi số năm, câu hỏi cuối cùng của chặng đầu tiên.'],
  milestone10: ['Câu hỏi số mười, một cột mốc quan trọng!'],
  final: ['Và đây là câu hỏi số mười lăm, câu hỏi cuối cùng của chương trình!', 'Chỉ còn một câu nữa thôi. Câu hỏi số mười lăm!'],
  letter: ['{chu}.'],   // chỉ chữ cái ("bê."), cho nhanh
  // mời chọn
  prompt: ['Bạn chọn đáp án nào?', 'Mời bạn suy nghĩ và đưa ra lựa chọn.', '{ten} ơi, bạn chọn đáp án nào?', '{ten} hãy bình tĩnh. Đáp án của bạn là gì?'],
  // người chơi im lặng lâu (quizDev NUDGE giây không chọn, không dùng trợ giúp): nhắc; lần nhắc đầu kèm số quyền trợ giúp còn lại
  nudge: ['Đáp án của bạn là gì?', '{ten} ơi, bạn đã có câu trả lời chưa?', 'Bạn cứ bình tĩnh suy nghĩ. Bạn chọn đáp án nào?', 'Bạn đang phân vân giữa những đáp án nào?'],
  nudgeHelp: ['Bạn vẫn còn {con} quyền trợ giúp, nếu cần thì cứ dùng.', 'Đừng quên, bạn còn {con} quyền trợ giúp đấy.'],
  nudgeNoHelp: ['Bạn đã dùng hết quyền trợ giúp, hãy tin vào hiểu biết của mình.'],
  // đồng hồ trả lời (quizDev LIMIT)
  tenLeft: ['Chỉ còn mười giây nữa thôi!', 'Còn mười giây! Bạn hãy chọn đi nào.'],
  timeUp: ['Hết giờ rồi! Rất tiếc, đáp án đúng là {chu}.', 'Đã hết thời gian trả lời. Đáp án đúng của câu này là {chu}.'],
  // chốt
  // người chơi bấm là chốt luôn: không hỏi lại "câu trả lời cuối cùng chứ?" (không ai trả lời được)
  pick: ['Bạn chọn đáp án {chu}.', 'Đáp án {chu}. Chúng ta chốt đáp án này!', '{ten} chọn đáp án {chu}.'],
  lock: ['Chúng ta cùng xem đáp án đúng.', 'Và câu trả lời chính xác là…', 'Hồi hộp quá! Cùng xem nào.'],
  // kết quả
  right: ['Chính xác!', 'Hoàn toàn chính xác!', 'Đúng rồi! Xin chúc mừng!', 'Tuyệt vời {ten}, bạn đã trả lời đúng!', 'Chính xác! Xin chúc mừng {ten}!'],   // khán giả đã vỗ tay lúc lật đáp án: không xin vỗ tay nữa
  wrong: ['Rất tiếc! Đáp án đúng là {chu}.', 'Tiếc quá! Câu trả lời đúng là đáp án {chu}.', 'Rất tiếc {ten}, đáp án đúng là {chu}.'],
  win: [
    'Xuất sắc! Bạn đã vượt qua cả mười lăm câu hỏi.',
    'Xin chúc mừng {ten}! Bạn đã vượt qua cả mười lăm câu hỏi và trở thành người tài năng nhất của chương trình hôm nay!',
  ],
  // qua mốc (lật đúng câu 5 / 10)
  safe5: ['Bạn đã chắc chắn có năm ngôi sao!', 'Mốc an toàn đầu tiên! Năm ngôi sao đã thuộc về bạn.'],
  safe10: ['Bạn đã chắc chắn có mười hai ngôi sao và tấm giấy khen đầu tiên!', 'Câu mười! Tấm giấy khen đầu tiên đã thuộc về bạn.'],
  winSeeds: ['Bạn mang về ba mươi ngôi sao cùng tấm giấy khen của chương trình!'],
  // sai / hết giờ: hạt mang về theo mốc
  keepZero: ['Lần này bạn chưa mang về ngôi sao nào, đừng buồn, hẹn bạn lần sau!', 'Tiếc quá, bạn chưa qua mốc câu năm. Hẹn gặp lại bạn ở lượt sau!'],
  keep: ['Bạn vẫn mang về {soHat} ngôi sao.', '{ten} ra về với {soHat} ngôi sao. Xin chúc mừng!'],
  keepCheque: ['Bạn mang về {soHat} ngôi sao cùng tấm giấy khen câu {so}.', 'Xin chúc mừng {ten}, bạn ra về với {soHat} ngôi sao và tấm giấy khen câu {so}!'],
  // người chơi tự dừng (giữ câu vừa vượt): tiếc nuối, khen quyết định khôn ngoan
  quitZero: ['Hơi tiếc một chút, nhưng biết dừng đúng lúc cũng là khôn ngoan. Cảm ơn bạn đã lên ghế nóng, hẹn gặp lại bạn lần sau!'],
  quit: [
    'Thật đáng tiếc, nhưng đây là một quyết định khôn ngoan. {ten} dừng cuộc chơi và ra về với {soHat} ngôi sao!',
    'Không liều, không vội, {ten} chọn dừng lại ở đây. Một quyết định chín chắn! Bạn mang về {soHat} ngôi sao.',
    'Người khôn ngoan biết lúc nào nên dừng. Xin chúc mừng {ten} với {soHat} ngôi sao. Một tràng pháo tay nào!',
    'Thật đáng tiếc, nhưng đây là một quyết định khôn ngoan. Bạn dừng cuộc chơi và ra về với {soHat} ngôi sao!',
  ],
  quitCheque: [
    'Tiếc quá, chỉ còn một chút nữa thôi! Nhưng {ten} đã quyết định thật khôn ngoan: dừng lại và ra về với {soHat} ngôi sao, cùng tấm giấy khen câu {so} do chính tay tôi ký.',
    'Một hành trình tuyệt vời! {ten} vượt qua {so} câu hỏi, dừng lại đúng lúc và mang về {soHat} ngôi sao cùng tấm giấy khen. Xin cảm ơn và chúc mừng bạn!',
    'Một hành trình tuyệt vời! Bạn dừng lại đúng lúc và mang về {soHat} ngôi sao cùng tấm giấy khen câu {so}.',
  ],
  quitFinal: [
    'Chỉ còn một câu nữa là tới đỉnh cao, nhưng {ten} chọn sự chắc chắn. Khôn ngoan lắm! Bạn ra về với {soHat} ngôi sao và tấm giấy khen câu mười bốn.',
    'Chỉ còn một câu nữa là tới đỉnh cao, nhưng bạn chọn sự chắc chắn. Khôn ngoan lắm! Bạn ra về với {soHat} ngôi sao.',
  ],
  quitAnswer: ['Để bạn biết thêm, đáp án đúng của câu này là {chu}.', 'Nếu đi tiếp, đáp án đúng là {chu}.'],
  // trường quay chưa đủ người thật để bắt đầu ván (máy chủ MIN_PLAYERS)
  waitMore: [
    'Chúng ta còn chờ thêm {conThieu} bạn nữa. Bạn hãy mời bạn bè vào cùng chơi!',
    'Trường quay còn thiếu {conThieu} người là chương trình bắt đầu. Mời thêm bạn bè, người nhà cùng vào!',
    'Trong lúc chờ thêm {conThieu} bạn nữa, bạn có thể ghé Tủ đồ chọn trang phục thật đẹp!',
  ],
  bye: ['Cảm ơn {ten} đã tham gia chương trình. Hẹn gặp lại bạn!', 'Cảm ơn bạn đã chơi cùng chúng tôi. Xin chào và hẹn gặp lại!'],
  // trợ giúp
  helpsLeft: ['Bạn còn {con} quyền trợ giúp.'],
  helpsNone: ['Bạn đã dùng hết các quyền trợ giúp.'],
  // đọc xong mới bỏ hai phương án (quizDev)
  fifty: ['Bạn chọn quyền trợ giúp năm mươi năm mươi. Máy tính sẽ bỏ đi hai phương án sai.', 'Năm mươi năm mươi! Xin mời máy tính bỏ đi hai phương án sai.'],
  fiftyLeft: ['Còn lại đáp án {chu} và đáp án {chu2}.'],
  audience: ['Bạn chọn hỏi ý kiến khán giả. Xin mời quý khán giả trong trường quay bình chọn!', 'Chúng ta cùng hỏi ý kiến khán giả. Mời mọi người chọn đáp án của mình!'],
  audienceDone: ['Đã có kết quả bình chọn của khán giả.', 'Và đây là ý kiến của khán giả.'],
  audienceTop: ['Đáp án {chu} được {phanTram} phần trăm khán giả lựa chọn.'],
  skip: ['Bạn chọn bỏ qua câu hỏi này.', 'Được thôi, chúng ta sẽ bỏ qua câu hỏi này.', 'Một lựa chọn khôn ngoan! Câu hỏi này được bỏ qua.'],
  skipAnswer: ['Đáp án của câu hỏi này là {chu}.', 'Để bạn biết thêm, đáp án đúng là {chu}.'],
  skipNext: ['Chúng ta sang câu hỏi tiếp theo!', 'Nào, cùng đến với câu hỏi tiếp theo.'],
  relative: ['Bạn chọn hỏi ý kiến người thân.', 'Chúng ta cùng hỏi ý kiến người thân của bạn.'],
  phoneStart: ['Mời bạn gọi cho người thân. Bạn có ba mươi giây, thời gian bắt đầu!'],   // đọc xong mới đếm lùi
  phoneEnd: ['Hết giờ!', 'Ba mươi giây đã hết.'],
  relativeSeat: ['{nguoiThan} ơi, mời bạn giúp {ten} trả lời câu hỏi này.', 'Người thân của {ten} đang ở ngay trong trường quay. Mời {nguoiThan} cho biết ý kiến!'],
  relativeAnswer: ['{nguoiThan} chọn đáp án {chu}.', 'Theo {nguoiThan}, đáp án đúng là {chu}.'],
};

const HOLE = /\{(\w+)\}/g;
const holes = (t) => [...t.matchAll(HOLE)].map(m => m[1]);
/** Câu có chỗ trống tự do: đọc trực tiếp, không lưu R2. */
export const isLive = (tpl) => holes(tpl).some(h => h in LIVE);

/** Chữ cái đứng riêng trong câu hỏi / phương án ("Cả A và B") cũng đọc theo tên tiếng Việt. */
export const speakLetters = (t) => speakMath(t).replace(/(?<!\p{L})([ABCD])(?!\p{L})/gu, (_, c) => L['ABCD'.indexOf(c)]);

/**
 * Câu toán đọc thành lời: 12 × 3 → "12 nhân 3", 45 : 5 → "45 chia 5", 3/4 → "3 phần 4", số thập phân "2,5" giữ nguyên
 * (giọng đọc tự đọc "hai phẩy năm"), "?" / "…" chỗ trống → "bao nhiêu".
 */
const UNIT_SAY = {"cm²":"xăng-ti-mét vuông","dm²":"đề-xi-mét vuông","m²":"mét vuông","cm³":"xăng-ti-mét khối","dm³":"đề-xi-mét khối","m³":"mét khối","km/giờ":"ki-lô-mét một giờ","mm":"mi-li-mét","cm":"xăng-ti-mét","dm":"đề-xi-mét","km":"ki-lô-mét","kg":"ki-lô-gam","ml":"mi-li-lít","g":"gam","l":"lít","m":"mét"};
export function speakMath(t) {
  return String(t || '')
    .replace(/(\d) (?=\d{3}(?!\d))/g, '$1')   // "45 678" (tách lớp) đọc liền một số
    .replace(/(\d)\s*\/\s*(\d)/g, '$1 phần $2')
    .replace(/\s*×\s*/g, ' nhân ').replace(/\s*[:÷]\s*(?=\d|\(|[a-z])/g, ' chia ')
    .replace(/\s*\+\s*/g, ' cộng ').replace(/(\d|\))\s*[−–-]\s*(?=\d|\()/g, '$1 trừ ')
    .replace(/\s*=\s*/g, ' bằng ').replace(/\s*>\s*/g, ' lớn hơn ').replace(/\s*<\s*/g, ' bé hơn ')
    .replace(/(^|[\s(])(?:\?|…|\.{3})(?=[\s)]|$)/g, '$1 bao nhiêu ')
    .replace(/\(\s*|\s*\)/g, ', ')
    // đơn vị viết tắt đứng sau số ("24 kg", "12 cm²", "? m"): đọc thành chữ
    .replace(/(\d|bao nhiêu)\s*(cm²|dm²|m²|cm³|dm³|m³|km\/giờ|mm|cm|dm|km|kg|ml|g|l|m)(?![\p{L}²³])/gu, (_, n, u) => `${n} ${UNIT_SAY[u]}`)
    .replace(/\s+,/g, ',').replace(/\s{2,}/g, ' ').replace(/^[\s,]+/, '');
}

/** Lời giải thích đọc lên: bỏ chỗ dẫn Kinh Thánh trong ngoặc (Mt 2,1-6), giọng đọc ra nghe rất lạ. */
export const speakEx = (ex) => String(ex || '').replace(/\s*\([^()]*\d[^()]*\)/g, '').replace(/\s+([.,!?])/g, '$1').trim();

/** Tên đọc được: chỉ chữ (có dấu), khoảng trắng, gạch nối, nháy; tối đa 24 ký tự ("Bà Ngoại", "chị Lan"). */
export const cleanName = (s) => String(s || '').normalize('NFC').replace(/[^\p{L}\p{M} '-]/gu, ' ').replace(/\s+/g, ' ').trim().slice(0, 24).trim();
/** Tên gọi của người chơi: chữ cuối của họ tên ("Nguyễn Văn Nam" → "Nam"). */
export const callName = (full) => cleanName(full).split(' ').pop() || '';

/**
 * Một câu của tình huống `key`: vars = { so: 1..15, chu: 0..3, chu2, con: 1..4, ten, nguoiThan, phanTram, soHat }.
 * Câu cần tên mà chưa có tên thì bỏ, chọn câu khác. Trả { text, live } hoặc null.
 */
const lastOf = {};
export function mcLine(key, vars = {}, rand = Math.random) {
  const val = (h) => {
    const v = vars[h];
    if (h === 'so' || h === 'con') return v ? NUM[v - 1] : null;
    if (h === 'chu' || h === 'chu2') return v == null ? null : L[v];
    if (h === 'ten') return callName(v) || null;
    if (h === 'nguoiThan') return cleanName(v) || null;
    if (h === 'conThieu') return Number.isInteger(v) && v > 0 && v < 100 ? String(v) : null;
    if (h === 'phanTram' || h === 'soHat') return Number.isFinite(v) ? String(Math.max(0, Math.min(100, Math.round(v)))) : null;
    return null;
  };
  const ok = (SCRIPT[key] || []).filter(t => holes(t).every(h => val(h) != null));
  if (!ok.length) return null;
  // không nói lại đúng câu vừa nói của tình huống này
  // (trực tuyến có hạt giống: bỏ bước này, kẻo máy vào phòng sau, nhớ câu khác, chọn khác máy khác)
  const pool = ok.length > 1 && rand === Math.random ? ok.filter(t => t !== lastOf[key]) : ok;
  const tpl = pool[Math.floor(rand() * pool.length)];
  lastOf[key] = tpl;
  return { text: tpl.replace(HOLE, (_, h) => val(h)), live: isLive(tpl) };
}

/** Mọi câu cố định của kịch bản (chỗ trống hữu hạn bung ra hết): tts-data đưa vào ttsAllow, tạo sẵn mp3 lên R2. */
export function mcFixed() {
  const out = [];
  const fill = (t) => {
    const h = holes(t).find(x => x in ENUM);
    if (!h) { out.push(t); return; }
    ENUM[h].forEach(v => fill(t.replace(`{${h}}`, v)));
  };
  for (const list of Object.values(SCRIPT)) for (const t of list) if (!isLive(t)) fill(t);
  return [...new Set(out)];
}

// khuôn của câu đọc trực tiếp: chữ giữ nguyên, chỗ trống hữu hạn = một trong các giá trị, chỗ trống tự do = LIVE
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
let liveRe = null;
/** Câu đọc trực tiếp này có khớp một câu tự do trong kịch bản không (api/tts.js chỉ đọc câu khớp). */
export function liveOk(text) {
  liveRe ||= Object.values(SCRIPT).flat().filter(isLive).map(t => new RegExp(`^${t.split(HOLE).map((p, i) => (i % 2 === 0 ? esc(p)
    : p in LIVE ? LIVE[p] : `(?:${ENUM[p].map(esc).join('|')})`)).join('')}$`, 'u'));
  return liveRe.some(re => re.test(text));
}

/** Các câu MC đọc của một câu hỏi (trong tệp level): câu hỏi, từng phương án, lời giải thích. */
export const mcTexts = (q) => [q.q, ...q.o, speakEx(q.ex)].map(speakLetters).filter(Boolean);
