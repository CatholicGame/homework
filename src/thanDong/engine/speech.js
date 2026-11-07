/** Câu cho giọng đọc: bỏ gạch đầu dòng, ngoặc kép, biểu tượng cảm xúc (câu đếm 🍎🍎🍎 chỉ đọc chữ). */
export const speakable = (t) => String(t || '').replace(/\p{Extended_Pictographic}️?/gu, '').replace(/^\s*[-–]\s*/, '').replace(/\s+[-–]\s+/g, ', ').replace(/[“”"]/g, '').replace(/\s{2,}/g, ' ');
