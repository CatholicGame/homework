// 📐 Ngữ pháp (src/games/englishReading.js): chia dữ liệu grammar { point, explainVi, pattern, examples } thành khối dễ đọc.
// Không phụ thuộc DOM. Xem thử: scripts/english-reading-dev.html?app=1&id=en-021&part=grammar
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// chữ Việt (có dấu, hoặc chữ không dấu hay gặp: khi, trong, theo…)
const VI = /[À-ỹĐđ]|\b(khi|trong|theo|nhanh|cho|em|anh|chi|ban|con|nam|tranh|xanh|vui|nay|kia|xem|ai|nhau|ngay|hay|mai|tim|thi)\b/i;
const isEn = (s) => !VI.test(s);
// Đại từ, tên, mạo từ không tô trong câu mẫu (tô thì cả câu vàng)
const PLAIN = new Set(['i', 'he', 'she', 'it', 'we', 'you', 'they', 'minh', 'mum', 'dad', 'lan', 'tom', 'a', 'an', 'the', 'my', 'his', 'her', 's', 'v', 'v1', 'v2', 'v3', 'ing', 'es', 'ed']);

/** Chữ tiếng Anh trong lời giảng: "am", (gets, makes), -s / -es → thẻ xanh. */
function richVi(s) {
  return esc(s)
    // "am" → thẻ; "có" (chữ Việt) hay câu trộn "Let's + động từ" thì để nguyên
    .replace(/&quot;(.+?)&quot;|“([^”]+)”/g, (m, a, b) => (isEn((a || b).replace(/&#39;/g, "'")) ? `<b class="enr-gk" lang="en">${a || b}</b>` : m))
    .replace(/\(([^()]+)\)/g, (m, inner) => {
      const raw = inner.replace(/<[^>]+>/g, '');
      // ví dụ tiếng Anh thì thành thẻ; tên người (Minh, Mum) giữ chữ thường
      if (!isEn(raw) || raw.split(/\s*,\s*/).every((w) => /^[A-Z][a-z]+$/.test(w))) return m;
      return `<span class="enr-gex">${inner.split(/\s*,\s*/).map((w) => `<b class="enr-gk" lang="en">${w.replace(/<\/?b[^>]*>/g, '')}</b>`).join(' ')}</span>`;
    })
    .replace(/(^|[\s(,/])(-[a-z]{1,4})\b/g, '$1<b class="enr-gk" lang="en">$2</b>');
}
// chữ đã esc nên dấu nháy là &#39; (isn&#39;t)
const TOKEN = /(^|[^A-Za-zÀ-ỹĐđ;])(V\d|(?:[A-Za-z]|&#39;)+)(?=$|[^A-Za-zÀ-ỹĐđ&0-9])/g;
const isKey = (w, keys) => {
  const k = w.replace(/&#39;/g, "'").toLowerCase();
  return /^V\d$/.test(w) || keys.has(k) || (keys.has('not') && /n't$/.test(k));
};
/** Chữ tiếng Anh rời trong lời giảng (had + V3, by the time): tô từ khoá, chỉ ở phần chữ ngoài thẻ; liền nhau thì gộp. */
function markKeys(html, keys) {
  const K = (w) => `<b class="enr-gk" lang="en">${w}</b>`;
  return html.split(/(<[^>]+>[^<]*<\/[^>]+>|<[^>]+>)/).map((part, i) => {
    if (i % 2) return part;
    let out = part.replace(TOKEN, (m, pre, w) => (isKey(w, keys) ? pre + K(w) : m));
    // gộp: "had</b> + <b>V3", "by</b> the <b>time"
    for (let k = 0; k < 3; k++) out = out.replace(/<\/b>(\s+(?:\+|the|a|an|to)?\s*)<b class="enr-gk" lang="en">/g, '$1');
    return out;
  }).join('');
}
const SLOT = /^(S|O|V|V\d|V-ing|N|A|B|adj|adv|to V|Ving|V-ed)$/; // chữ hoa là ô chờ thay; "a" thường là mạo từ
const isSlot = (t) => !isEn(t) || SLOT.test(t.replace(/[()]/g, '').trim());

/** Từ khoá ngữ pháp để tô trong câu mẫu: chữ trong ngoặc kép, trong ngoặc đơn, phần tiếng Anh của tên bài và công thức. */
export function grammarKeys(g) {
  const bits = [];
  const [, enTitle = ''] = g.point.split(/:\s*/);
  if (isEn(enTitle)) bits.push(enTitle);
  for (const m of g.explainVi.matchAll(/"([^"]+)"|“([^”]+)”|\(([^()]+)\)/g)) {
    const t = m[1] || m[2] || m[3];
    if (isEn(t)) bits.push(t);
  }
  g.pattern.split(/\s*\+\s*|\s{2,}|[.,]/).filter(isEn).forEach((t) => bits.push(t));
  const keys = new Set();
  bits.join(' ').toLowerCase().replace(/[^a-z' ]+/g, ' ').split(/\s+/).forEach((w) => {
    if (w.length > 1 && !PLAIN.has(w)) keys.add(w);
  });
  return keys;
}

/** Câu mẫu: tô các từ khoá ngữ pháp (liền nhau thì tô cả cụm). */
export function markExample(x, keys) {
  return x.split(/(\s+)/).map((t) => {
    const [, lead, word, tail] = t.match(/^([^A-Za-z']*)([A-Za-z'’]*)(.*)$/s);
    const w = word.toLowerCase().replace(/’/g, "'");
    const hit = w && (keys.has(w) || (keys.has('not') && /n't$/.test(w)));
    return hit ? `${esc(lead)}<mark>${esc(word)}</mark>${esc(tail)}` : esc(t);
  }).join('').replace(/<\/mark>(\s+(?:(?:the|a|an|to)\s+)?)<mark>/gi, '$1');
}

/** HTML cả thẻ ngữ pháp (nút 🔊 do englishReading.js đưa vào qua sayBtn). */
export function grammarHtml(g, sayBtn) {
  const [title, enTitle] = g.point.split(/:\s*(.+)/);
  const notes = g.explainVi.split(/(?<=[.!?])\s+(?=[A-ZÀ-ỸĐ"“])/).filter(Boolean);
  const rows = g.pattern.split(/\s{2,}|\s*;\s*/).filter(Boolean);
  const keys = grammarKeys(g);
  // "to", "con"… cũng là chữ Việt: không tô trong lời giảng
  const noteKeys = new Set([...keys].filter((k) => !['to', 'be', 'do', 'go', 'can', 'man', 'con'].includes(k)));
  const block = (p) => {
    const t = p.trim().replace(/\.$/, '');
    return isSlot(t) ? `<span class="enr-pb is-slot">${esc(t)}</span>` : `<span class="enr-pb is-en" lang="en">${esc(t)}</span>`;
  };
  // Một dòng công thức: khối nối bằng "+" hoặc dấu phẩy (hai vế câu)
  const formula = (r) => r.split(r.includes(' + ') ? /(\s+\+\s+|,\s+)/ : /(\s+\+\s+)/).map((p, i) => (i % 2 ? `<i class="enr-plus">${p.trim()}</i>` : block(p))).join('');
  return `
    <header class="enr-g-title">
      <h3>${esc(title)}</h3>
      ${enTitle ? `<div class="enr-g-tags" lang="en">${enTitle.split(/\s*[,/]\s*/).map((t) => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
    </header>
    <section class="enr-g-sec">
      <h4>📌 Ghi nhớ</h4>
      <ol class="enr-g-notes">${notes.map((n) => `<li>${markKeys(richVi(n), noteKeys)}</li>`).join('')}</ol>
    </section>
    <section class="enr-g-sec">
      <h4>🧮 Công thức</h4>
      ${rows.map((r) => `<div class="enr-formula">${formula(r)}</div>`).join('')}
    </section>
    <section class="enr-g-sec">
      <h4>💬 Câu mẫu</h4>
      <ul class="enr-g-ex">${g.examples.map((x) => `<li><span lang="en">${markExample(x, keys)}</span>${sayBtn(x)}</li>`).join('')}</ul>
    </section>`;
}
