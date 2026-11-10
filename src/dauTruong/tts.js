/**
 * Giọng Azure của hai MC Đấu Trường Nhí: phần dùng chung trình duyệt (dauTruong/mcVoice.js) và máy chủ (api/tts.js). Hàm thuần.
 *
 * Như Kinh Thánh (kinh-thanh/src/engine/speech.js): mỗi câu chỉ tạo một lần, mp3 lưu trên Cloudflare R2 ở ttsPath(); câu đã có
 * thì máy học sinh tải thẳng từ R2 qua CDN, chưa có mới gọi api/tts.js (gọi Azure rồi lưu).
 * Chung bucket với Kinh Thánh nhưng thư mục riêng, không trộn (user 2026-11-09):
 *   R2_DIR/tts/<TTS_VER>/<giọng>/<mã>.mp3   mp3 từng câu
 *   R2_DIR/usage/<ngày UTC>/<giọng>/<số ký tự>-<mã>   file rỗng đếm ký tự đã gửi Azure (api/tts.js)
 * Đổi giọng / định dạng thì tăng TTS_VER để tạo file mới thay vì phát file cũ.
 */
export const R2_DIR = 'homework/dautruong';
export const TTS_VER = 'v1';
/** Giọng của từng MC: anh Minh (mc 0) NamMinh, chị Mai (mc 1) HoaiMy. enUS: mọi lời tiếng Anh (engine/speakEn.js: Đọc tiếng Anh,
 *  truyện hoạt hình, bấm từ). Danh sách này cũng là danh sách giọng api/tts.js cho phép. */
export const DT_VOICES = { namMinh: 'vi-VN-NamMinhNeural', hoaiMy: 'vi-VN-HoaiMyNeural', enUS: 'en-US-JennyNeural' };
export const MC_VOICE_OF = ['namMinh', 'hoaiMy'];
/** Câu dài nhất một lần đọc (ký tự). Câu hỏi Tiếng Việt dài nhất trong ngân hàng ~250. */
export const TTS_MAX = 400;

async function sha256(s) {
  const buf = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}
/** Chỗ của mp3 trên R2. */
export const ttsPath = async (text, voice) =>
  `${R2_DIR}/tts/${TTS_VER}/${voice}/${(await sha256(`${TTS_VER}|${voice}|${text}`)).slice(0, 32)}.mp3`;
/** File đếm ký tự của một lần gọi Azure. */
export const usagePath = (day, voice, chars, path) => `${R2_DIR}/usage/${day}/${voice}/${chars}-${path.split('/').pop().slice(0, 16)}`;
/** Chuẩn hoá câu trước khi đọc / đặt tên file: gộp khoảng trắng (cùng một câu thì cùng một file). */
export const ttsText = (text) => String(text || '').replace(/\s+/g, ' ').trim();
