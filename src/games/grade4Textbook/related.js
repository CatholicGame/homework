/**
 * SGK Toán 4 (2011): nút "📘 Kiến thức" và "🔎 Khám phá" trên bài tập (lớp phủ, đóng lại là làm tiếp câu đang làm).
 *
 * - Kiến thức: tóm tắt phần bài học của sách (grade4Textbook/knowledge.js). Bài Luyện tập không có phần bài học
 *   → hiện kiến thức của các bài học liền trước nó trong cùng chương (tối đa 3 bài).
 * - Khám phá: phần Khám phá của "Học bằng công cụ" Toán 4 (grade4Tools, SGK mới) hoặc Toán 5 (phân số)
 *   cùng nội dung. Bảng EXPLORE dưới đây: [từ bài, đến bài, ['g4:N' | 'g5:N', …]].
 */

import { CATALOG } from './catalog.js';
import { KNOWLEDGE } from './knowledge.js';

const EXPLORE = [
  [1, 3, ['g4:1']], [4, 5, ['g4:4']], [6, 7, ['g4:10']], [8, 8, ['g4:11']], [9, 9, ['g4:14']],
  [10, 13, ['g4:12']], [14, 14, ['g4:15']], [15, 15, ['g4:11']], [16, 17, ['g4:14']],
  [18, 19, ['g4:17']], [20, 20, ['g4:19']], [21, 21, ['g4:17', 'g4:19']],
  [29, 29, ['g4:22']], [30, 30, ['g4:23']], [31, 31, ['g4:22', 'g4:23']],
  [32, 32, ['g4:4']], [33, 33, ['g4:24']], [34, 34, ['g4:4']], [35, 36, ['g4:24']], [37, 39, ['g4:25']],
  [40, 40, ['g4:8']], [41, 41, ['g4:27']], [42, 42, ['g4:29']], [43, 43, ['g4:28']], [44, 44, ['g4:30']],
  [45, 46, ['g4:28']], [47, 48, ['g4:27', 'g4:29']],
  [54, 55, ['g4:18']], [84, 84, ['g4:3']], [91, 92, ['g5:15']], [93, 95, ['g4:31']],
  [96, 113, ['g5:3']], [114, 114, ['g5:5']], [115, 117, ['g5:5', 'g5:6']], [118, 121, ['g5:6']],
  [122, 132, ['g5:5']], [133, 136, ['g4:31']],
];

const byNumber = new Map(CATALOG.map(c => [c.number, c]));
const numberOf = (unitId) => Number(String(unitId).replace(/\D/g, ''));

/** Bài có kiến thức để xem: chính nó, hoặc (bài luyện tập) các bài học liền trước trong cùng chương. */
function knowledgeUnits(n) {
  if (KNOWLEDGE[`bai-${n}`]) return [n];
  const chapter = byNumber.get(n)?.chapter;
  const out = [];
  for (let k = n - 1; k >= 1 && out.length < 3; k--) {
    const c = byNumber.get(k);
    if (c.chapter !== chapter) break;
    if (KNOWLEDGE[c.id]) out.push(k);
    else if (out.length) break; // gặp bài luyện tập khác: dừng
  }
  return out.reverse();
}

// Khám phá về số (hàng, tia số, chẵn lẻ): không hợp với câu hình học trong cùng bài
// (vd. Bài 1 câu 4 "Tính chu vi các hình sau" không mở bảng hàng).
const NUMBER_EXPLORES = new Set(['g4:1', 'g4:3', 'g4:10', 'g4:11', 'g4:12', 'g4:14', 'g4:15']);
const GEOMETRY_Q = /chu vi|diện tích/i;

function exploreRefs(n, q) {
  const row = EXPLORE.find(([a, b]) => n >= a && n <= b);
  const refs = row ? row[2] : [];
  return q && GEOMETRY_Q.test(q.q || '') ? refs.filter(r => !NUMBER_EXPLORES.has(r)) : refs;
}

const loaders = { g4: () => import('../grade4Tools.js'), g5: () => import('../grade5Tools.js') };

function knowledgeHtml(units) {
  return units.map((k) => {
    const c = byNumber.get(k);
    const { points = [], examples = [] } = KNOWLEDGE[c.id];
    return `
      <section class="gw-kn-sec">
        <h3 class="gw-kn-h"><span>Bài ${k}</span>${c.title}<small>📖 trang ${c.page}</small></h3>
        <ul class="gw-kn-points">${points.map(p => `<li>${p}</li>`).join('')}</ul>
        ${examples.length ? `<div class="gw-kn-ex"><b>Ví dụ</b>${examples.map(e => `<p>${String(e).replace(/\n/g, '<br>')}</p>`).join('')}</div>` : ''}
      </section>`;
  }).join('');
}

/**
 * Nút liên quan của một bài cho renderWorkbook (cfg.related):
 * [{ icon, label, open(host, close) }] — q là câu đang làm (Khám phá lọc theo nội dung câu); host là lớp phủ toàn màn hình, close() đóng nó.
 */
export function relatedFor(unitId, q) {
  const n = numberOf(unitId);
  const items = [];
  const kn = knowledgeUnits(n);
  if (kn.length) {
    items.push({
      icon: '📘', label: 'Kiến thức',
      open(host, close) {
        host.innerHTML = `
          <div class="gw-kn">
            <div class="gw-kn-top">
              <button type="button" class="e3-back-icon" data-act="close" aria-label="Đóng">✕</button>
              <div class="gw-kn-title">📘 Kiến thức</div>
            </div>
            <div class="gw-kn-body">${knowledgeHtml(kn)}
              <button type="button" class="e3-btn e3-btn-primary gw-kn-back" data-act="close">Làm tiếp bài tập ✏️</button>
            </div>
          </div>`;
        host.querySelectorAll('[data-act="close"]').forEach(b => { b.onclick = close; });
      },
    });
  }
  exploreRefs(n, q).forEach((ref, i, all) => {
    const [book, k] = ref.split(':');
    items.push({
      icon: '🔎', label: all.length > 1 ? `Khám phá ${i + 1}` : 'Khám phá',
      async open(host, close) {
        host.innerHTML = '<div class="gw-kn-loading">🔎</div>';
        const m = await loaders[book]();
        if (!host.isConnected) return;
        if (!m.exploreIn(host, Number(k), close)) close();
      },
    });
  });
  return items;
}
