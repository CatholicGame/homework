/**
 * Lớp 3: nút "📘 Kiến thức" trên các câu hình học (Vở BT Toán 3 Tập 1, Tập 2, Luyện tập Toán 3), như SGK Toán 4
 * (grade4Textbook/related.js). Vở bài tập không có phần bài học, nên kiến thức ở đây viết lại theo phần bài học
 * của SGK Toán 3 (Kết nối tri thức) và Toán 2 (ba điểm thẳng hàng, đường gấp khúc), lời dễ hiểu cho học sinh lớp 3.
 *
 * Mục kiến thức chọn theo nội dung câu đang làm (chữ của câu và các ô trống), không theo bài: Bài 7 "Ôn tập hình
 * học và đo lường" có cả câu đồng hồ, cân nặng; câu đó không hiện kiến thức hình học.
 *
 *   TOPICS[k] = { title, from, test: /…/, skip?: /…/, after?: [k], fig?: SVG, points: [...], examples: [...] }
 *   skip: chữ của câu khớp thì bỏ mục này; after: bỏ mục này khi câu đã có một trong các mục đó.
 */

const INK = '#1E293B';
const BLUE = '#0284C7';
const GREEN = '#16A34A';
const ORANGE = '#EA580C';

const dot = (x, y, c = INK) => `<circle cx="${x}" cy="${y}" r="6" fill="${c}"/>`;
const label = (x, y, t, c = INK) => `<text x="${x}" y="${y}" fill="${c}" font-size="26" font-weight="700" text-anchor="middle" font-family="Quicksand, sans-serif">${t}</text>`;
const svg = (w, h, body) => `<svg class="gw-kn-fig" viewBox="0 0 ${w} ${h}" role="img">${body}</svg>`;

const TOPICS = {
  collinear: {
    title: 'Ba điểm thẳng hàng',
    from: 'Toán 2, ôn lại ở Bài 7',
    test: /thẳng hàng/i,
    fig: svg(520, 260, `
      <line x1="40" y1="50" x2="480" y2="50" stroke="${GREEN}" stroke-width="5" stroke-linecap="round"/>
      ${dot(70, 50)}${dot(250, 50)}${dot(450, 50)}${label(70, 92, 'A')}${label(250, 92, 'B')}${label(450, 92, 'C')}
      <line x1="60" y1="215" x2="460" y2="215" stroke="#94A3B8" stroke-width="4" stroke-dasharray="10 8"/>
      ${dot(70, 215)}${dot(250, 160, ORANGE)}${dot(450, 215)}${label(70, 252, 'M')}${label(278, 160, 'N', ORANGE)}${label(450, 252, 'P')}`),
    points: [
      'Ba điểm cùng nằm trên <b>một đường thẳng</b> gọi là <b>ba điểm thẳng hàng</b>.',
      'Trong hình: A, B, C thẳng hàng. M, N, P <b>không</b> thẳng hàng vì N nằm lệch ra ngoài đường thẳng qua M và P.',
      'Cách kiểm tra: đặt mép thước đi qua hai điểm. Nếu điểm thứ ba cũng nằm sát mép thước thì ba điểm thẳng hàng.',
      'Khi viết, thường đọc ba điểm theo thứ tự trên đường thẳng, điểm nằm giữa viết ở giữa, ví dụ: A, B, C.',
    ],
    examples: [
      'Trong hình tam giác có đoạn thẳng AB đi qua điểm N thì A, N, B là ba điểm thẳng hàng.',
      'Mỗi đường thẳng có 3 điểm được đánh dấu cho ta một bộ ba điểm thẳng hàng. Muốn tìm hết, hãy nhìn theo <b>từng đường thẳng</b> trong hình.',
    ],
  },
  between: {
    title: 'Điểm ở giữa, trung điểm của đoạn thẳng',
    from: 'Bài 16',
    test: /trung điểm|điểm ở giữa|ở chính giữa/i,
    fig: svg(520, 150, `
      <line x1="50" y1="60" x2="470" y2="60" stroke="${BLUE}" stroke-width="5" stroke-linecap="round"/>
      ${dot(50, 60)}${dot(260, 60, ORANGE)}${dot(470, 60)}${label(50, 105, 'A')}${label(260, 105, 'M', ORANGE)}${label(470, 105, 'B')}
      ${label(155, 40, '3 cm', BLUE)}${label(365, 40, '3 cm', BLUE)}`),
    points: [
      'A, M, B là ba điểm thẳng hàng, M nằm giữa A và B. Ta nói: <b>M là điểm ở giữa hai điểm A và B</b>.',
      'Nếu M là điểm ở giữa A và B, lại có <b>AM = MB</b> (cách đều hai đầu) thì <b>M là trung điểm của đoạn thẳng AB</b>.',
      'Trung điểm chia đoạn thẳng thành hai phần bằng nhau. Muốn tìm trung điểm: đo độ dài đoạn thẳng rồi lấy một nửa.',
    ],
    examples: [
      'AB = 6 cm. Trung điểm M của AB cách A: 6 : 2 = 3 (cm).',
      'Trên giấy ô vuông: đếm số ô từ mỗi đầu tới điểm đó. Hai bên bằng nhau thì điểm đó là trung điểm.',
    ],
  },
  circle: {
    title: 'Hình tròn: tâm, bán kính, đường kính',
    from: 'Bài 17',
    test: /hình tròn tâm|đường tròn|bán kính|đường kính|com-pa/i,
    fig: svg(300, 280, `
      <circle cx="150" cy="140" r="110" fill="#E0F2FE" stroke="${INK}" stroke-width="4"/>
      <line x1="40" y1="140" x2="260" y2="140" stroke="${ORANGE}" stroke-width="5"/>
      <line x1="150" y1="140" x2="228" y2="62" stroke="${GREEN}" stroke-width="5"/>
      ${dot(150, 140)}${dot(40, 140)}${dot(260, 140)}${dot(228, 62)}
      ${label(150, 175, 'O')}${label(22, 132, 'C')}${label(280, 132, 'D')}${label(242, 52, 'A')}`),
    points: [
      'Điểm O ở chính giữa là <b>tâm</b> của hình tròn.',
      '<b>Bán kính</b> là đoạn thẳng nối tâm với một điểm trên đường tròn, ví dụ OA (màu xanh lá). Mọi bán kính của một hình tròn đều dài bằng nhau.',
      '<b>Đường kính</b> là đoạn thẳng <b>đi qua tâm</b>, nối hai điểm trên đường tròn, ví dụ CD (màu cam).',
      'Đường kính dài <b>gấp 2 lần</b> bán kính. Đoạn nối hai điểm trên đường tròn mà không đi qua tâm thì không phải đường kính.',
      'Vẽ hình tròn bằng com-pa: đặt đầu nhọn ở tâm, mở com-pa rộng bằng bán kính rồi quay một vòng.',
    ],
    examples: [
      'Bán kính OA = 3 cm thì đường kính CD = 3 × 2 = 6 (cm).',
    ],
  },
  angle: {
    title: 'Góc, góc vuông, góc không vuông',
    from: 'Bài 18',
    test: /góc vuông|góc không vuông|ê ke|góc đỉnh/i,
    fig: svg(520, 200, `
      <polyline points="60,30 60,160 200,160" fill="none" stroke="${INK}" stroke-width="5"/>
      <polyline points="60,135 85,135 85,160" fill="none" stroke="${GREEN}" stroke-width="3"/>
      ${dot(60, 160)}${label(40, 185, 'O')}${label(60, 22, 'A')}${label(215, 172, 'B')}
      <polyline points="330,40 300,160 480,160" fill="none" stroke="${INK}" stroke-width="5"/>
      ${dot(300, 160)}${label(285, 190, 'M')}${label(345, 35, 'P')}${label(495, 172, 'N')}`),
    points: [
      'Góc gồm <b>một đỉnh</b> và <b>hai cạnh</b> xuất phát từ đỉnh đó. Ví dụ: góc đỉnh O; cạnh OA, OB.',
      'Dùng <b>ê ke</b> để kiểm tra: đặt góc vuông của ê ke trùng đỉnh, một cạnh ê ke trùng một cạnh của góc. Cạnh kia của góc nằm khít cạnh ê ke thì đó là <b>góc vuông</b>.',
      'Không khít thì đó là <b>góc không vuông</b>, ví dụ góc đỉnh M; cạnh MN, MP.',
    ],
    examples: [
      'Mỗi góc của hình chữ nhật, hình vuông đều là góc vuông.',
    ],
  },
  polygon: {
    title: 'Hình tam giác, hình tứ giác, hình chữ nhật, hình vuông',
    from: 'Bài 19',
    test: /tam giác|tứ giác|hình chữ nhật|hình vuông|các đỉnh|các cạnh/i,
    // câu tính số ghi trong hình (hình tam giác ghi phép tính), tô phân số của hình, đỉnh núi: không phải hình học
    skip: /phép tính|kết quả|×|\d\s*\/\s*\d|số bé nhất|núi|lục giác|hình thoi|cung điện|nan tre/i,
    // câu chu vi, diện tích đã có công thức của hình chữ nhật, hình vuông; câu khối hình đã nói đỉnh, cạnh của khối
    after: ['perimeter', 'area', 'solid'],
    points: [
      '<b>Hình tam giác</b> ABC có 3 đỉnh A, B, C và 3 cạnh AB, BC, CA.',
      '<b>Hình tứ giác</b> MNPQ có 4 đỉnh M, N, P, Q và 4 cạnh MN, NP, PQ, QM.',
      'Gọi tên hình: đọc các đỉnh <b>lần lượt đi vòng quanh hình</b>. Cạnh nối hai đỉnh liền nhau.',
      '<b>Hình chữ nhật</b> có 4 góc vuông, hai cạnh dài bằng nhau (chiều dài), hai cạnh ngắn bằng nhau (chiều rộng).',
      '<b>Hình vuông</b> có 4 góc vuông và <b>4 cạnh bằng nhau</b>.',
    ],
    examples: [
      'Đếm hình: đếm các hình nhỏ trước, rồi đếm các hình ghép từ 2, 3 hình nhỏ.',
    ],
  },
  solid: {
    title: 'Khối lập phương, khối hộp chữ nhật',
    from: 'Bài 21',
    test: /khối lập phương|khối hộp chữ nhật/i,
    points: [
      'Khối lập phương và khối hộp chữ nhật đều có <b>8 đỉnh, 12 cạnh, 6 mặt</b>.',
      'Các mặt của khối lập phương là <b>hình vuông</b> bằng nhau.',
      'Các mặt của khối hộp chữ nhật là <b>hình chữ nhật</b>.',
    ],
    examples: [
      'Làm 5 khung đèn dạng khối lập phương, mỗi đỉnh buộc một sợi lạt: 8 × 5 = 40 (sợi lạt).',
    ],
  },
  polyline: {
    title: 'Đường gấp khúc',
    from: 'Toán 2',
    test: /đường gấp khúc/i,
    points: [
      'Đường gấp khúc ABCD gồm các đoạn thẳng AB, BC, CD nối tiếp nhau.',
      '<b>Độ dài đường gấp khúc</b> bằng tổng độ dài các đoạn thẳng của nó.',
    ],
    examples: [
      'AB = 252 cm, BC = 138 cm, CD = 210 cm.<br>Độ dài đường gấp khúc ABCD là: 252 + 138 + 210 = 600 (cm).',
    ],
  },
  perimeter: {
    title: 'Chu vi hình tam giác, tứ giác, chữ nhật, vuông',
    from: 'Bài 50',
    test: /chu vi/i,
    points: [
      '<b>Chu vi</b> của một hình là tổng độ dài các cạnh của hình đó.',
      'Chu vi hình chữ nhật = (chiều dài + chiều rộng) × 2 (cùng đơn vị đo).',
      'Chu vi hình vuông = độ dài một cạnh × 4.',
    ],
    examples: [
      'Hình chữ nhật dài 12 m, rộng 8 m. Chu vi là: (12 + 8) × 2 = 40 (m).',
      'Hình vuông cạnh 9 cm. Chu vi là: 9 × 4 = 36 (cm).',
    ],
  },
  area: {
    title: 'Diện tích, xăng-ti-mét vuông',
    from: 'Bài 51, 52',
    test: /diện tích|xăng-ti-mét vuông|cm²/i,
    points: [
      '<b>Diện tích</b> của một hình là phần mặt phẳng hình đó chiếm. Hình nằm trọn trong hình kia thì có diện tích bé hơn.',
      '<b>Xăng-ti-mét vuông</b> là diện tích hình vuông cạnh 1 cm, viết tắt <b>cm²</b>.',
      'Diện tích hình chữ nhật = chiều dài × chiều rộng (cùng đơn vị đo).',
      'Diện tích hình vuông = cạnh × cạnh.',
    ],
    examples: [
      'Hình chữ nhật dài 5 cm, rộng 3 cm. Diện tích là: 5 × 3 = 15 (cm²).',
      'Hình vuông cạnh 4 cm. Diện tích là: 4 × 4 = 16 (cm²).',
    ],
  },
};

/** Chữ của câu: đề và nhãn các ô trống / bảng (bỏ thẻ HTML). */
function textOf(q) {
  const parts = [q.q || ''];
  (q.blanks || []).forEach((b) => parts.push(b.label || ''));
  (q.options || []).forEach((o) => parts.push(typeof o === 'string' ? o : ''));
  (q.rows || []).forEach((r) => parts.push(Array.isArray(r) ? r.filter((c) => typeof c === 'string').join(' ') : r?.label || ''));
  return parts.join(' ').replace(/<[^>]+>/g, ' ');
}

/** Các mục kiến thức hợp với câu q (theo thứ tự của TOPICS). */
export function topicsFor(q) {
  if (!q) return [];
  const text = textOf(q);
  const keys = Object.keys(TOPICS).filter((k) => TOPICS[k].test.test(text) && !TOPICS[k].skip?.test(text));
  return keys.filter((k) => !TOPICS[k].after?.some((x) => keys.includes(x)));
}

function knowledgeHtml(keys) {
  return keys.map((k) => {
    const { title, from, fig = '', points = [], examples = [] } = TOPICS[k];
    return `
      <section class="gw-kn-sec">
        <h3 class="gw-kn-h">${title}<small>📖 ${from}</small></h3>
        ${fig}
        <ul class="gw-kn-points">${points.map((p) => `<li>${p}</li>`).join('')}</ul>
        ${examples.length ? `<div class="gw-kn-ex"><b>Ví dụ</b>${examples.map((e) => `<p>${e}</p>`).join('')}</div>` : ''}
      </section>`;
  }).join('');
}

/** cfg.related của các sách Toán 3: [{ icon, label, open(host, close) }] cho câu q. */
export function relatedForGrade3(unitId, q) {
  const keys = topicsFor(q);
  if (!keys.length) return [];
  return [{
    icon: '📘', label: 'Kiến thức',
    open(host, close) {
      host.innerHTML = `
        <div class="gw-kn">
          <div class="gw-kn-top">
            <button type="button" class="e3-back-icon" data-act="close" aria-label="Đóng">✕</button>
            <div class="gw-kn-title">📘 Kiến thức</div>
          </div>
          <div class="gw-kn-body">${knowledgeHtml(keys)}
            <button type="button" class="e3-btn e3-btn-primary gw-kn-back" data-act="close">Làm tiếp bài tập ✏️</button>
          </div>
        </div>`;
      host.querySelectorAll('[data-act="close"]').forEach((b) => { b.onclick = close; });
    },
  }];
}
