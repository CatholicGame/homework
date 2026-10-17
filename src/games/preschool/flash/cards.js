/** 29 thẻ chữ cái (docs/pre_1/Flashcard 29 chữ.pdf), theo thứ tự của sách. Dùng chung cho data6.js và play6.js. */

// [chữ, cách đọc, hình (flash/art*.js), tên hình: chữ của thẻ trong ngoặc vuông như chữ đỏ của sách]
export const CARDS = [
  ['a', 'a', 'ca-sau', 'C[á] sấu'], ['ă', 'á', 'ran', 'Con r[ắ]n'], ['â', 'ớ', 'gau', 'Con g[ấ]u'],
  ['b', 'bờ', 'bo', 'Con [b]ò'], ['c', 'cờ', 'co', 'Con [c]ò'], ['d', 'dờ', 'de', 'Con [d]ê'],
  ['đ', 'đờ', 'da-dieu', 'Con [đ]à điểu'], ['e', 'e', 'em-be', '[E]m bé'], ['ê', 'ê', 'bup-be', 'Búp b[ê]'],
  ['g', 'gờ', 'ga', 'Con [g]à'], ['h', 'hờ', 'ha-ma', 'Con [h]à mã'], ['i', 'i', 'khi', 'Con kh[ỉ]'],
  ['k', 'ca', 'khe', 'Quả [k]hế'], ['l', 'lờ', 'lon', 'Con [l]ợn'], ['m', 'mờ', 'meo', 'Con [m]èo'],
  ['n', 'nờ', 'ngua', 'Con [n]gựa'], ['o', 'o', 'ong', 'Con [o]ng'], ['ô', 'ô', 'ho', 'Con h[ổ]'],
  ['ơ', 'ơ', 'bo-qua', 'Quả b[ơ]'], ['p', 'pờ', 'phao', 'Cái [p]hao'], ['q', 'cu', 'qua', 'Con [q]uạ'],
  ['r', 'rờ', 'rua', 'Con [r]ùa'], ['s', 'sờ', 'soc', 'Con [s]óc'], ['t', 'tờ', 'tom', 'Con [t]ôm'],
  ['u', 'u', 'mu', 'Cái m[ũ]'], ['ư', 'ư', 'su-tu', 'Con s[ư] tử'], ['v', 'vờ', 'voi', 'Con [v]oi'],
  ['x', 'xờ', 'xe-dap', '[X]e đạp'], ['y', 'i dài', 'yem', 'Cái [y]ếm'],
].map(([ch, name, pic, marked]) => {
  const at = marked.indexOf('[');
  return { ch, name, pic, word: marked.replace(/[[\]]/g, ''), at };
});


/** Tên đọc của một chữ (ă → á, b → bờ…). */
export const nameOf = (ch) => CARDS.find(c => c.ch === ch)?.name || ch;
