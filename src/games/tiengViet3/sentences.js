// Tách bài đọc truyện thành đơn vị đọc cho phim tranh (poemPlayer.js). Không phụ thuộc trình duyệt,
// để scripts/tv3-sentences.mjs in danh sách câu khi viết groups của tiengViet3/scenes/tuanNN.js.

/** Tách đoạn văn thành câu (giữ nguyên dấu, ngoặc kép đi theo câu). */
export function splitSentences(para) {
  // gạch ngang giữa đoạn chỉ mở lời thoại sau dấu hai chấm; sau "!" / "”" là lời dẫn ("…quá!” − Tét-su-ô kêu lên")
  return para.split(/(?<=[.!?…:][”"]?\.?)\s+(?=[\p{Lu}“"])|(?<=:)\s+(?=[-–−]\s)/u).filter(Boolean);
}

/** Đơn vị đọc của truyện: mỗi đoạn, hoặc mỗi câu (sentences) kèm số đoạn để hiện liền nhau. */
export function proseUnits(read, sentences) {
  return read.paras.flatMap((p, i) => (sentences ? splitSentences(p) : [p]).map(t => ({ t, para: i })));
}

