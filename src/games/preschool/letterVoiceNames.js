/**
 * Tên chữ cái có sẵn giọng đọc thu trước (src/assets/voice/letters, tạo bằng scripts/gen-letter-voices.mjs).
 * fx.js say("sờ") phát clip này thay vì để máy đọc một tiếng đứng riêng (hay nghe sai: "sờ" thành "rờ").
 * Thêm tên mới: thêm vào đây rồi chạy lại script với tên đó.
 */
export const LETTER_VOICE_NAMES = [
  'a', 'á', 'ớ', 'bờ', 'cờ', 'dờ', 'đờ', 'e', 'ê', 'gờ', 'hờ', 'i', 'ca', 'lờ', 'mờ', 'nờ', 'o', 'ô', 'ơ', 'pờ',
  'cu', 'rờ', 'sờ', 'tờ', 'u', 'ư', 'vờ', 'xờ', 'i dài',
  'chờ', 'khờ', 'thờ', 'nhờ', 'phờ', 'gờ kép', 'ngờ', 'quờ', 'trờ', 'di', 'ngờ kép',
];

/** Tên file của một tên chữ (chỉ ký tự ASCII): "sờ" → "s_E1_BB_9D.wav". */
export const letterVoiceFile = (name) => `${encodeURIComponent(name).replace(/%/g, '_')}.wav`;
/** Ngược lại: tên file → tên chữ. */
export const letterVoiceName = (file) => decodeURIComponent(file.replace(/\.wav$/, '').replace(/_/g, '%'));
