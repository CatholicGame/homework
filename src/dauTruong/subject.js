/**
 * Môn của 🏆 Đấu Trường Nhí đang mở: 'vn' (Toán + Tiếng Việt, thẻ `dautruong-preview`) hoặc 'en' (Tiếng Anh: nghe, từ vựng, ngữ
 * pháp, đọc hiểu; thẻ `dautruong-en` ở tab 🌍 Tiếng Anh). Cùng sân khấu, luật vòng, bạn ảo, giấy chứng nhận; khác phòng
 * (`arena-en-g<lớp>`), ngân hàng câu (bank/en/g<lớp>/{kd,tt,vd}.js, enQuestions.js) và lời MC giới thiệu môn.
 * Thẻ đặt môn trước khi dựng sảnh (games/dauTruong.js render / renderEn).
 */
let subj = 'vn';
export function setArenaSubject(s) { subj = s === 'en' ? 'en' : 'vn'; }
export const isEnArena = () => subj === 'en';
/** Phòng của lớp: `arena-g3` (Toán + Tiếng Việt), `arena-en-g3` (Tiếng Anh). */
export const arenaRoom = (grade) => `arena${subj === 'en' ? '-en' : ''}-g${grade}`;
/** Giọng Azure đọc phần tiếng Anh: anh Minh (mc 0) giọng nam Andrew, chị Mai (mc 1) giọng nữ Emma (dauTruong/tts.js DT_VOICES). */
export const EN_VOICE = ['enAndrew', 'enEmma'];
/** Kỹ năng của câu tiếng Anh → tên hiện trên màn LED / bảng mạnh yếu; MC: Nghe + Từ vựng anh Minh, Ngữ pháp + Đọc hiểu chị Mai. */
export const EN_SKILL = { nghe: 'Nghe', tu: 'Từ vựng', np: 'Ngữ pháp', doc: 'Đọc hiểu' };
export const EN_SKILL_MC = { nghe: 0, tu: 0, np: 1, doc: 1 };
/** Bốn câu Tăng tốc tiếng Anh (thay dãy số / dãy hình / sắp xếp / tư duy). */
export const EN_TT = ['nghe', 'xep', 'doc', 'tu'];
export const EN_TT_TAG = { nghe: 'Nghe nhanh', xep: 'Sắp xếp', doc: 'Đọc nhanh', tu: 'Đố từ' };
