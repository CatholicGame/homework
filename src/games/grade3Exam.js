/**
 * Lớp 3 — Ôn Luyện Đề
 * Đề 1: Bộ đề ôn luyện VioEdu khối 3 (docs/bo-de-on-luyen-vioedu-khoi-3.md)
 * Nguồn: https://vndoc.com/bo-de-on-luyen-vioedu-khoi-3-316472
 */

const EXAMS = [
  {
    id: 'de-1',
    title: 'Đề 1',
    subtitle: 'Bộ đề ôn luyện VioEdu khối 3',
    source: 'https://vndoc.com/bo-de-on-luyen-vioedu-khoi-3-316472',
    sections: [
      {
        id: 'math',
        title: 'Toán — Đề ôn VioEdu',
        icon: '🔢',
        color: '#34D399',
        questions: [
          { type: 'fill', q: 'My dành 40 phút mỗi ngày để làm bài tập về nhà. Lan dành thời gian làm bài tập về nhà mỗi ngày nhiều hơn My 15 phút.\nCả hai bạn dành ..... phút để làm bài tập về nhà mỗi ngày.', blanks: [{ label: 'Số phút', answer: '95' }] },
          { type: 'choice', q: 'Hương có 24 quyển vở. Trà có nhiều hơn Hương 6 quyển vở. Hỏi cả hai bạn có tất cả bao nhiêu quyển vở?', options: ['52 quyển', '48 quyển', '42 quyển', '54 quyển'], answer: 3 },
          { type: 'fill', q: 'Mẹ cho em 8 chiếc bút. Mẹ cho anh ít hơn em 3 chiếc bút.', blanks: [{ label: 'Mẹ cho anh … chiếc bút', answer: '5' }, { label: 'Cả hai anh em được mẹ cho … chiếc bút', answer: '13' }] },
          { type: 'fill', q: 'Linh có 8 con gấu bông. Thảo có nhiều hơn Linh 3 con gấu bông và ít hơn Ngọc 2 con gấu bông.\nVậy Ngọc có ... con gấu bông.', blanks: [{ label: 'Số gấu bông của Ngọc', answer: '13' }] },
          { type: 'fill', q: 'Lan có 30 tấm bưu thiếp. Minh có ít hơn Lan 8 tấm bưu thiếp.', blanks: [{ label: 'Minh có … tấm bưu thiếp', answer: '22' }, { label: 'Cả hai bạn có … tấm bưu thiếp', answer: '52' }] },
          { type: 'fill', q: 'Minh có hai sợi dây thừng. Sợi dây thứ nhất dài 4dm, sợi dây thứ hai dài hơn sợi thứ nhất 28cm. Hỏi tổng độ dài của hai sợi dây thừng bằng bao nhiêu xăng-ti-mét?', blanks: [{ label: 'Tổng độ dài (cm)', answer: '108' }] },
          { type: 'choice', q: 'Bạn Yến dành thời gian mỗi ngày 1 giờ để học đàn. Bạn Linh dành thời gian học đàn mỗi ngày ít hơn bạn Yến 20 phút. Hỏi cả hai bạn dành bao nhiêu thời gian để học đàn mỗi ngày?', options: ['120 phút', '140 phút', '100 phút', '160 phút'], answer: 2 },
          { type: 'choice', q: 'Người ta đựng 60 lít nước vào hai can. Can thứ nhất đựng 32 lít nước. Hỏi can thứ hai đựng ít hơn can thứ nhất bao nhiêu lít nước?', options: ['6 lít', '4 lít', '8 lít', '10 lít'], answer: 1 },
          { type: 'fill', q: 'Tổng số tuổi của bố, mẹ và con là 76 tuổi. Tổng số tuổi của bố và con là 44 tuổi. Tổng số tuổi của mẹ và con là 38 tuổi.\nVậy tuổi của con là .....tuổi.', blanks: [{ label: 'Tuổi của con', answer: '6' }] },
          { type: 'choice', q: 'Một người đi xe máy đi từ A đến B. Trong giờ đầu tiên người đó đi được 35km. Giờ tiếp theo, người đó đi thêm được 32km. Biết quãng đường AB dài 90km. Hỏi sau hai giờ đi người đó còn cách B bao nhiêu ki-lô-mét?', options: ['23km', '22km', '25km', '24km'], answer: 0 },
          { type: 'choice', q: 'Ba lớp 3A, 3B, 3C tham gia đợt quyên góp vở ủng hộ trẻ em vùng cao. Lớp 3A quyên góp được 215 quyển vở, lớp 3B quyên góp được 415 quyển vở. Hỏi lớp 3C quyên góp được bao nhiêu quyển vở? Biết rằng số quyển vở cả ba lớp quyên góp được là số lớn nhất có ba chữ số.', options: ['369 quyển', '389 quyển', '379 quyển', '359 quyển'], answer: 0 },
          { type: 'fill', q: 'Số mét vải một xưởng dệt đã dệt được trong một buổi sáng là số nhỏ nhất có ba chữ số và số mét vải xưởng dệt đã dệt được trong buổi chiều ít hơn buổi sáng là 50 mét vải.\nCả ngày hôm đó, xưởng dệt đã dệt được .. dam vải.', blanks: [{ label: 'Số dam vải', answer: '15' }] },
          { type: 'fill', q: 'Bà có một túi bánh và một túi kẹo, biết túi kẹo có 45 cái, sau khi thêm 26 cái bánh thì số bánh gấp 2 lần số kẹo.', blanks: [{ label: 'Số bánh sau khi thêm', answer: '90' }, { label: 'Số bánh trước khi thêm', answer: '64' }] },
          { type: 'fill', q: 'Một cửa hàng bán gạo, ông chủ thống kê số lượng gạo bán được trong ngày bằng sơ đồ sau. Giá trị của dấu ? là ....', img: 'https://st.vndoc.com/data/image/2024/03/11/Vioedu-lop-3-1.jpg', blanks: [{ label: 'Giá trị dấu ?', answer: '159' }] },
          { type: 'fill', q: 'Hùng và Đức cùng chơi bi. Hùng có 15 viên bi, Đức có số bi gấp ba lần số bi của Hùng.', blanks: [{ label: 'Cả hai bạn có (viên bi)', answer: '60' }, { label: 'Đức có nhiều hơn Hùng (viên bi)', answer: '30' }] },
          { type: 'choice', q: 'Năm nay, tổng số tuổi của bà, mẹ và Lan là 130 tuổi. Biết Lan năm nay 14 tuổi. Tuổi bà gấp 5 lần tuổi Lan. Hỏi mẹ năm nay bao nhiêu tuổi?', options: ['46 tuổi', '48 tuổi', '45 tuổi', '51 tuổi'], answer: 0 },
          { type: 'fill', q: 'Để chuẩn bị cho một buổi biểu diễn, người ta xếp chỗ cho một vũ đoàn 40 người thành 5 hàng. Vì cần thêm hỗ trợ nên xếp thêm mỗi hàng 3 người nữa.', blanks: [{ label: 'Số thành viên sau khi bổ sung', answer: '55' }, { label: 'Số hàng nếu xếp mỗi hàng 5 người', answer: '11' }] },
          { type: 'fill', q: 'Một khu vườn được chia thành hai lô đất, mỗi lô trồng 6 hàng cây hồng xiêm mỗi hàng có 5 cây và 4 hàng cây táo mỗi hàng có 7 cây.', blanks: [{ label: 'Số cây hồng xiêm', answer: '60' }, { label: 'Số cây táo', answer: '56' }] },
          { type: 'fill', q: 'Yến cần xếp 16 quyển sách toán, 24 quyển sách tiếng việt và 32 quyển sách tiếng anh vào 2 tủ, mỗi tủ có 2 ngăn. Số sách mỗi loại trong các ngăn là như nhau.', blanks: [{ label: 'Sách toán / 1 ngăn', answer: '4' }, { label: 'Sách tiếng việt / 1 ngăn', answer: '6' }, { label: 'Sách tiếng anh / 1 ngăn', answer: '8' }] },
          { type: 'fill', q: 'Có 6 thùng dầu, mỗi thùng có 14 lít.', blanks: [{ label: 'Số thùng nhỏ nếu chia mỗi thùng 4 lít', answer: '21' }, { label: 'Số lít mỗi thùng nếu chia đều vào 2 thùng lớn', answer: '42' }] },
          { type: 'fill', q: 'Cho phép tính: 125+321. Kết quả của phép tính đã cho là ……', blanks: [{ label: 'Kết quả', answer: '446' }] },
          { type: 'choice', q: 'Cho phép tính: 935−761. Kết quả của phép tính đã cho là bao nhiêu?', options: ['174', '184', '284', '274'], answer: 0 },
          { type: 'choice', q: 'Cho: A=531−215; B=639−445. Khi đó: A .. B', options: ['>', '<', '='], answer: 0 },
          { type: 'fill', q: 'Số thích hợp để điền vào dấu hỏi chấm là ……..', img: 'https://st.vndoc.com/data/image/2024/03/11/Vioedu-lop-3-2.jpg', blanks: [{ label: 'Giá trị dấu ?', answer: '4' }] },
          { type: 'fill', q: 'Số 32 giảm đi 8 lần thì được ......', blanks: [{ label: 'Kết quả', answer: '4' }] },
          { type: 'fill', q: 'Cho phép chia: 42:2=21', blanks: [{ label: 'Số bị chia', answer: '42' }, { label: 'Số chia', answer: '22' }, { label: 'Thương', answer: '21' }] },
          { type: 'fill', q: 'Cho một số, biết rằng nếu lấy số lớn nhất có 2 chữ số khác nhau chia cho số đó thì được thương là số liền trước của 8. Số đó là ...', blanks: [{ label: 'Số cần tìm', answer: '14' }] },
          { type: 'fill', q: 'Số thích hợp để điền vào dấu hỏi chấm là ...', img: 'https://st.vndoc.com/data/image/2024/03/11/Vioedu-lop-3-3.jpg', blanks: [{ label: 'Giá trị dấu ?', answer: '5' }] },
          { type: 'fill', q: '2dam+15dam=... dam', blanks: [{ label: 'Kết quả (dam)', answer: '17' }] },
          { type: 'fill', q: '42:6=...', blanks: [{ label: 'Kết quả', answer: '7' }] },
          { type: 'choice', q: 'Cho: A=23×3, B=14×2. Trong các khẳng định sau, khẳng định nào đúng?', options: ['A=B', 'A>B', 'A<B'], answer: 1 },
          { type: 'choice', q: 'Trong các phép nhân dưới đây, phép nhân nào có cùng kết quả là 84? (chọn tất cả đáp án đúng)', options: ['24×4', '25×3', '21×4', '12×7'], answer: [2, 3], multi: true },
          { type: 'choice', q: 'Một hộp có 24 chiếc bánh. Hỏi 3 hộp bánh như thế thì có bao nhiêu chiếc bánh?', options: ['36 chiếc bánh', '24 chiếc bánh', '72 chiếc bánh'], answer: 2 },
          { type: 'choice', q: 'Trong các phép tính sau đây, phép tính nào có kết quả lớn nhất?', options: ['7×4+8', '7×6−10', '7×2+25'], answer: 2 },
          { type: 'choice', q: '6m 4cm ………….. 640cm', options: ['>', '<', '='], answer: 1 },
          { type: 'fill', q: 'Cho hình vẽ. Hình vẽ trên có ..... góc vuông.', img: 'https://st.vndoc.com/data/image/2024/11/20/VioEdu-lop-3-1.jpg', blanks: [{ label: 'Số góc vuông', answer: '2' }] },
          { type: 'fill', q: 'Cho hình vẽ. Hình đã cho có ... góc vuông.', img: 'https://st.vndoc.com/data/image/2024/11/20/VioEdu-lop-3-2.jpg', blanks: [{ label: 'Số góc vuông', answer: '8' }] },
          { type: 'choice', q: 'Hùng có 24 cái kẹo, Hùng cho Mai 1/3 số kẹo đó. Hỏi Hùng còn lại bao nhiêu cái kẹo?', options: ['8 cái kẹo', '72 cái kẹo', '16 cái kẹo'], answer: 2 },
        ],
      },
      {
        id: 'div3',
        title: 'Bảng Chia 3',
        icon: '➗',
        color: '#60A5FA',
        questions: [
          { type: 'choice', q: 'Lớp 2A xếp hàng tập thể dục. Nếu các bạn xếp thành 7 hàng thì mỗi hàng có 3 bạn và còn thừa ra 2 bạn. Hỏi lớp 2A có bao nhiêu bạn?', options: ['20 bạn', '22 bạn', '21 bạn', '23 bạn'], answer: 3 },
          { type: 'choice', q: 'Phép tính 1: 6:3=2. Phép tính 2: 6:3=3. Hỏi trong hai phép tính trên, phép tính nào sai?', options: ['Phép tính 2', 'Phép tính 1'], answer: 0 },
          { type: 'choice', q: 'Có 21 bông hoa cắm đều vào 3 lọ. Hỏi mỗi lọ có mấy bông hoa?', options: ['6 bông hoa', '7 bông hoa', '3 bông hoa', '4 bông hoa'], answer: 1 },
          { type: 'choice', q: 'Bạn An nói: "Kết quả của phép chia 30:3 bằng 10". Hỏi bạn An nói đúng hay sai?', options: ['Sai', 'Đúng'], answer: 1 },
          { type: 'fill', q: 'Cho phép tính sau: 12:3. Kết quả của phép tính trên là …', blanks: [{ label: 'Kết quả', answer: '4' }] },
          { type: 'choice', q: '9:3=… Số thích hợp điền vào chỗ chấm là:', options: ['12', '9', '3', '6'], answer: 3 },
          { type: 'fill', q: '12:3=….', blanks: [{ label: 'Kết quả', answer: '4' }] },
          { type: 'fill', q: 'Có 24 cái cốc được xếp đều vào 3 hộp. Hỏi mỗi hộp có bao nhiêu cái cốc?', blanks: [{ label: 'Số cốc mỗi hộp', answer: '8' }] },
        ],
      },
      {
        id: 'en-div',
        title: 'English — Division Tables',
        icon: '🇬🇧',
        color: '#F59E0B',
        questions: [
          { type: 'choice', q: '18 : 2 … 40 : 4', options: ['<', '>', '='], answer: 0 },
          { type: 'fill', q: 'The store has all 67l of oil. The store has sold 27l. If the remaining liters of oil are filled into 5l cans, how many cans are there in all?', blanks: [{ label: 'Answer (cans)', answer: '8' }] },
          { type: 'fill', q: 'The store has all 88l of oil. The store has sold 43l. If the remaining liters of oil are filled into 5l cans, how many cans are there in all?', blanks: [{ label: 'Answer (cans)', answer: '9' }] },
          { type: 'choice', q: 'Class 3A has 48 students in 6 rows. How many students are there in each row?', options: ['42 students', '54 students', '8 students', '7 students'], answer: 2 },
          { type: 'choice', q: 'Class 3A has 54 students in 6 rows. How many students are there in each row?', options: ['6 students', '54 students', '9 students', '48 students'], answer: 2 },
          { type: 'choice', q: 'Find x, know that: x×5=30', options: ['x = 25', 'x = 5', 'x = 6', 'x = 35'], answer: 2 },
          { type: 'choice', q: 'Find x, know that: x×4=36', options: ['x=9', 'x=8', 'x=32', 'x=10'], answer: 0 },
          { type: 'fill', q: 'Share 42 oranges among 6 girls. How many oranges will each girl have?', blanks: [{ label: 'Answer (oranges)', answer: '7' }] },
          { type: 'fill', q: 'There are 24 students in rows, each row has 4 students. How many rows can be arranged?', blanks: [{ label: 'Answer (rows)', answer: '6' }] },
          { type: 'choice', q: 'Each vase holds 6 flowers. How many vases can be placed with 54 flowers?', options: ['8 vases', '48 vases', '60 vases', '9 vase'], answer: 3 },
          { type: 'choice', q: 'Each vase holds 6 flowers. How many vases can be placed with 42 flowers?', options: ['7 vases', '42 vases', '48 vases', '6 vases'], answer: 0 },
          { type: 'fill', q: 'Find x such that: x:7=4. The value of x is ….', blanks: [{ label: 'x =', answer: '28' }] },
          { type: 'choice', q: 'There are 32 crayons to be divided equally among 4 groups. How many crayons did each group receive?', options: ['7', '28', '8', '9'], answer: 2 },
          { type: 'choice', q: 'There are 40 crayons to be divided equally among 4 groups. How many crayons did each group receive?', options: ['10', '11', '9', '32'], answer: 0 },
          { type: 'fill', q: 'Angela is typing her story of 80 words. She can type 8 words per minute. How long will it take her to type the story? (minutes)', blanks: [{ label: 'Answer (minutes)', answer: '10' }] },
        ],
      },
    ],
  },
];

export function render(app, onBack) {
  let activeExam = EXAMS[0];
  let activeQuestions = [];
  let activeSectionTitle = '';
  let activeSectionColor = '#34D399';
  let current = 0;
  let userAnswers = [];
  let locked = false;
  let multiSelected = [];

  injectStyles();

  // ── INTRO ─────────────────────────────────────────────────────────────────
  function showIntro() {
    const exam = activeExam;
    const totalQ = exam.sections.reduce((s, sec) => s + sec.questions.length, 0);
    app.innerHTML = `
      <div class="e3-wrap">
        <div class="e3-intro animate-fadeIn">
          <div class="e3-badge">📝</div>
          <h1 class="e3-title">Ôn Luyện Đề — ${exam.title}</h1>
          <p class="e3-sub">${exam.subtitle}</p>

          <div class="e3-section-label">Chọn phần ôn tập:</div>
          <div class="e3-section-grid">
            <button class="e3-section-btn e3-section-all" data-section="all">
              <span class="e3-sec-icon">📋</span>
              <span class="e3-sec-title">Tất Cả</span>
              <span class="e3-sec-count">${totalQ} câu</span>
            </button>
            ${exam.sections.map(sec => `
              <button class="e3-section-btn" data-section="${sec.id}" style="--sec-color:${sec.color}">
                <span class="e3-sec-icon">${sec.icon}</span>
                <span class="e3-sec-title">${sec.title}</span>
                <span class="e3-sec-count">${sec.questions.length} câu</span>
              </button>
            `).join('')}
          </div>

          <div class="e3-divider"></div>
          <p class="e3-note">Nguồn: <a href="${exam.source}" target="_blank" rel="noopener">vndoc.com</a> — bản xem trước công khai.</p>
          <button class="e3-btn e3-btn-ghost" id="e3-back-btn">← Quay lại</button>
        </div>
      </div>
    `;

    app.querySelectorAll('.e3-section-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sid = btn.dataset.section;
        if (sid === 'all') {
          activeQuestions = exam.sections.flatMap(s => s.questions);
          activeSectionTitle = `Tất Cả — ${totalQ} câu`;
          activeSectionColor = '#34D399';
        } else {
          const sec = exam.sections.find(s => s.id === sid);
          activeQuestions = sec.questions;
          activeSectionTitle = sec.title;
          activeSectionColor = sec.color;
        }
        userAnswers = new Array(activeQuestions.length).fill(null);
        current = 0;
        showQuestion();
      });
    });

    app.querySelector('#e3-back-btn').onclick = onBack;
  }

  // ── QUIZ ──────────────────────────────────────────────────────────────────
  function showQuestion() {
    locked = false;
    multiSelected = [];
    const q = activeQuestions[current];
    const pct = Math.round((current / activeQuestions.length) * 100);

    app.innerHTML = `
      <div class="e3-wrap">
        <div class="e3-quiz animate-fadeIn">
          <div class="e3-topbar">
            <button class="e3-back-icon" id="e3-quit">✕</button>
            <div class="e3-progress-wrap">
              <div class="e3-progress-track">
                <div class="e3-progress-fill" style="width:${pct}%; background:${activeSectionColor}"></div>
              </div>
              <span class="e3-progress-label">${current + 1} / ${activeQuestions.length}</span>
            </div>
          </div>

          <div class="e3-question-card">
            <div class="e3-q-num" style="color:${activeSectionColor}">Câu ${current + 1}</div>
            <div class="e3-q-text">${q.q.replace(/\n/g, '<br>')}</div>
            ${q.img ? `<img class="e3-q-img" src="${q.img}" alt="Hình minh họa câu ${current + 1}" loading="lazy">` : ''}
          </div>

          ${renderAnswerArea(q)}

          <div class="e3-nav" id="e3-nav" style="display:none">
            <button class="e3-btn e3-btn-primary" id="e3-next" style="background:linear-gradient(135deg,${activeSectionColor},${activeSectionColor}cc)">
              ${current < activeQuestions.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả 🏅'}
            </button>
          </div>
        </div>
      </div>
    `;

    app.querySelector('#e3-quit').onclick = showIntro;
    attachAnswerHandlers(q);
  }

  function renderAnswerArea(q) {
    if (q.type === 'choice') {
      const labels = ['A', 'B', 'C', 'D'];
      return `
        <div class="e3-options" id="e3-options">
          ${q.options.map((opt, i) => `
            <button class="e3-option" data-idx="${i}">
              <span class="e3-option-label">${labels[i]}</span>
              <span class="e3-option-text">${opt}</span>
            </button>
          `).join('')}
        </div>
        ${q.multi ? `<button class="e3-btn e3-btn-primary" id="e3-submit-multi" style="margin-top:12px" disabled>Xác nhận đáp án đã chọn</button>` : ''}
      `;
    }
    // fill
    return `
      <div class="e3-blanks" id="e3-blanks">
        ${q.blanks.map((b, i) => `
          <div class="e3-blank-row">
            <label class="e3-blank-label">${b.label}</label>
            <input type="number" inputmode="numeric" class="game-input e3-blank-input" data-idx="${i}" autocomplete="off">
          </div>
        `).join('')}
      </div>
      <button class="e3-btn e3-btn-primary" id="e3-submit-fill" style="margin-top:12px">Kiểm tra</button>
    `;
  }

  function attachAnswerHandlers(q) {
    if (q.type === 'choice' && q.multi) {
      const submitBtn = app.querySelector('#e3-submit-multi');
      app.querySelectorAll('.e3-option').forEach(btn => {
        btn.onclick = () => {
          if (locked) return;
          const idx = parseInt(btn.dataset.idx);
          btn.classList.toggle('e3-selected');
          const pos = multiSelected.indexOf(idx);
          if (pos === -1) multiSelected.push(idx); else multiSelected.splice(pos, 1);
          submitBtn.disabled = multiSelected.length === 0;
        };
      });
      submitBtn.onclick = () => {
        if (locked) return;
        locked = true;
        submitBtn.disabled = true;
        const chosen = [...multiSelected].sort();
        const correct = [...q.answer].sort();
        const isRight = chosen.length === correct.length && chosen.every((v, i) => v === correct[i]);
        userAnswers[current] = chosen;
        revealChoiceAnswer(q, correct, isRight);
      };
      return;
    }

    if (q.type === 'choice') {
      app.querySelectorAll('.e3-option').forEach(btn => {
        btn.onclick = () => {
          if (locked) return;
          locked = true;
          const idx = parseInt(btn.dataset.idx);
          userAnswers[current] = idx;
          revealChoiceAnswer(q, [q.answer], idx === q.answer);
        };
      });
      return;
    }

    // fill
    const submitBtn = app.querySelector('#e3-submit-fill');
    submitBtn.onclick = () => {
      if (locked) return;
      const inputs = [...app.querySelectorAll('.e3-blank-input')];
      const values = inputs.map(inp => inp.value.trim());
      if (values.some(v => v === '')) return;
      locked = true;
      submitBtn.disabled = true;
      const correctFlags = q.blanks.map((b, i) => normalize(values[i]) === normalize(b.answer));
      const allCorrect = correctFlags.every(Boolean);
      userAnswers[current] = values;
      revealFillAnswer(q, correctFlags, allCorrect, inputs);
    };
  }

  function normalize(v) {
    const n = parseFloat(String(v).replace(',', '.'));
    return isNaN(n) ? String(v).trim().toLowerCase() : n;
  }

  function revealChoiceAnswer(q, correctIndices, isRight) {
    app.querySelectorAll('.e3-option').forEach((btn, i) => {
      btn.disabled = true;
      if (correctIndices.includes(i)) btn.classList.add('e3-correct');
      else if (btn.classList.contains('e3-selected') || (userAnswers[current] === i)) btn.classList.add('e3-wrong');
    });
    app.querySelector('#e3-submit-multi')?.remove();
    showFeedback(isRight, q, correctIndices.map(i => q.options[i]).join(', '));
  }

  function revealFillAnswer(q, correctFlags, isRight, inputs) {
    inputs.forEach((inp, i) => {
      inp.disabled = true;
      inp.classList.add(correctFlags[i] ? 'e3-correct-input' : 'e3-wrong-input');
    });
    const correctText = q.blanks.map(b => b.answer).join(', ');
    showFeedback(isRight, q, correctText);
  }

  function showFeedback(isRight, q, correctText) {
    const banner = document.createElement('div');
    banner.className = `e3-feedback ${isRight ? 'e3-feedback-right' : 'e3-feedback-wrong'}`;
    banner.innerHTML = isRight
      ? '✅ Đúng rồi! Giỏi lắm!'
      : `❌ Chưa đúng! Đáp án đúng: <strong>${correctText}</strong>`;
    const anchor = app.querySelector('#e3-blanks') || app.querySelector('#e3-options');
    anchor.after(banner);

    app.querySelector('#e3-nav').style.display = 'flex';
    app.querySelector('#e3-next').onclick = () => {
      current++;
      if (current >= activeQuestions.length) showResult();
      else showQuestion();
    };
  }

  // ── RESULT ────────────────────────────────────────────────────────────────
  function isAnswerCorrect(q, i) {
    const ua = userAnswers[i];
    if (ua === null || ua === undefined) return false;
    if (q.type === 'choice' && q.multi) {
      const chosen = [...ua].sort();
      const correct = [...q.answer].sort();
      return chosen.length === correct.length && chosen.every((v, idx) => v === correct[idx]);
    }
    if (q.type === 'choice') return ua === q.answer;
    return q.blanks.every((b, idx) => normalize(ua[idx]) === normalize(b.answer));
  }

  function showResult() {
    const correctCount = activeQuestions.filter((q, i) => isAnswerCorrect(q, i)).length;
    const total = activeQuestions.length;
    const pct = Math.round((correctCount / total) * 100);
    const { emoji, label, color } = getGrade(pct);

    app.innerHTML = `
      <div class="e3-wrap">
        <div class="e3-result animate-fadeIn">
          <div class="e3-result-tag" style="color:${activeSectionColor}">${activeSectionTitle}</div>
          <div class="e3-result-icon">${emoji}</div>
          <h2 class="e3-result-grade" style="color:${color}">${label}</h2>
          <div class="e3-result-score">${correctCount} / ${total}</div>
          <div class="e3-result-pct">${pct}% câu đúng</div>

          <div class="e3-result-list">
            ${activeQuestions.map((q, i) => {
              const ok = isAnswerCorrect(q, i);
              return `
                <div class="e3-result-row ${ok ? 'e3-row-ok' : 'e3-row-fail'}">
                  <span class="e3-row-num">${i + 1}</span>
                  <span class="e3-row-q">${q.q.split('\n')[0]}</span>
                  <span class="e3-row-mark">${ok ? '✅' : '❌'}</span>
                </div>
              `;
            }).join('')}
          </div>

          <div class="e3-result-actions">
            <button class="e3-btn e3-btn-primary" id="e3-retry">🔄 Làm lại</button>
            <button class="e3-btn e3-btn-ghost" id="e3-home-result">🏠 Chọn phần khác</button>
          </div>
        </div>
      </div>
    `;

    app.querySelector('#e3-retry').onclick = () => {
      userAnswers = new Array(activeQuestions.length).fill(null);
      current = 0;
      showQuestion();
    };
    app.querySelector('#e3-home-result').onclick = showIntro;
  }

  showIntro();
}

function getGrade(pct) {
  if (pct >= 90) return { emoji: '🏆', label: 'Xuất sắc!', color: '#F59E0B' };
  if (pct >= 75) return { emoji: '🌟', label: 'Giỏi!', color: '#10B981' };
  if (pct >= 60) return { emoji: '😊', label: 'Khá!', color: '#3B82F6' };
  if (pct >= 40) return { emoji: '📖', label: 'Cần ôn thêm', color: '#8B5CF6' };
  return { emoji: '💪', label: 'Cố lên nhé!', color: '#EF4444' };
}

function injectStyles() {
  if (document.getElementById('e3-styles')) return;
  const style = document.createElement('style');
  style.id = 'e3-styles';
  style.textContent = `
    .e3-wrap {
      min-height: 100vh;
      background: linear-gradient(160deg, #ECFDF5 0%, #EFF6FF 50%, #F5F3FF 100%);
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 1rem;
      box-sizing: border-box;
    }

    /* ── INTRO ── */
    .e3-intro {
      background: #fff;
      border-radius: 1.5rem;
      padding: 2.5rem 2rem;
      max-width: 560px;
      width: 100%;
      margin: auto;
      text-align: center;
      box-shadow: var(--shadow-lg, 0 8px 30px rgba(0,0,0,0.12));
    }
    .e3-badge { font-size: 3rem; margin-bottom: 0.5rem; }
    .e3-title { font-size: clamp(1.4rem, 5vw, 1.9rem); font-weight: 800; color: #1E293B; margin: 0 0 0.3rem; }
    .e3-sub { color: #64748B; font-size: 1rem; margin: 0 0 1.5rem; }
    .e3-section-label { font-weight: 700; color: #374151; margin-bottom: 0.75rem; font-size: 0.95rem; }
    .e3-section-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-bottom: 1.2rem; }
    .e3-section-btn {
      display: flex; flex-direction: column; align-items: center; gap: 0.2rem;
      padding: 0.9rem 0.5rem; border: 2px solid #e2e8f0; border-radius: 1rem;
      background: #f8fafc; cursor: pointer; font-family: inherit;
      transition: border-color 0.15s, background 0.15s, transform 0.1s;
    }
    .e3-section-btn:hover { border-color: var(--sec-color, #34D399); background: #fff; transform: translateY(-2px); }
    .e3-section-all { grid-column: 1 / -1; flex-direction: row; gap: 0.6rem; justify-content: center; }
    .e3-sec-icon { font-size: 1.4rem; }
    .e3-sec-title { font-weight: 700; font-size: 0.9rem; color: #1E293B; }
    .e3-sec-count { font-size: 0.8rem; color: #64748B; }
    .e3-divider { height: 1px; background: #e2e8f0; margin: 0.8rem 0; }
    .e3-note { font-size: 0.8rem; color: #94a3b8; margin-bottom: 1rem; }
    .e3-note a { color: #60A5FA; }

    /* ── BUTTONS ── */
    .e3-btn { border: none; border-radius: 0.75rem; padding: 0.85rem 1.5rem; font-size: 1rem; font-weight: 700; cursor: pointer; transition: transform 0.12s, box-shadow 0.12s; font-family: inherit; }
    .e3-btn:active { transform: scale(0.97); }
    .e3-btn:disabled { opacity: 0.5; cursor: default; }
    .e3-btn-primary { background: linear-gradient(135deg, #34D399, #22D3EE); color: #fff; box-shadow: 0 4px 16px rgba(52,211,153,0.35); width: 100%; }
    .e3-btn-ghost { background: #f1f5f9; color: #475569; }
    .e3-btn-ghost:hover { background: #e2e8f0; }
    .e3-intro .e3-btn { width: auto; }
    .e3-back-icon {
      background: rgba(0,0,0,0.08); border: none; color: #1E293B; font-size: 1rem;
      width: 2.2rem; height: 2.2rem; border-radius: 0.6rem; cursor: pointer; font-weight: 700; flex-shrink: 0;
    }

    /* ── QUIZ ── */
    .e3-quiz { max-width: 640px; width: 100%; margin: 0 auto; padding-bottom: 2rem; }
    .e3-topbar { display: flex; align-items: center; gap: 0.8rem; padding: 0.5rem 0 1rem; }
    .e3-progress-wrap { flex: 1; display: flex; align-items: center; gap: 0.6rem; }
    .e3-progress-track { flex: 1; height: 8px; background: rgba(0,0,0,0.08); border-radius: 999px; overflow: hidden; }
    .e3-progress-fill { height: 100%; border-radius: 999px; transition: width 0.4s ease; }
    .e3-progress-label { color: #475569; font-size: 0.85rem; white-space: nowrap; font-weight: 600; }
    .e3-question-card { background: #fff; border-radius: 1.2rem; padding: 1.4rem 1.5rem; margin-bottom: 1rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .e3-q-num { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
    .e3-q-text { font-size: clamp(0.95rem, 2.8vw, 1.1rem); font-weight: 700; color: #1E293B; line-height: 1.5; white-space: pre-line; }
    .e3-q-img { max-width: 100%; margin-top: 0.8rem; border-radius: 0.75rem; display: block; }

    .e3-options { display: flex; flex-direction: column; gap: 0.6rem; }
    .e3-option {
      display: flex; align-items: flex-start; gap: 0.8rem; background: #fff;
      border: 2px solid transparent; border-radius: 1rem; padding: 0.9rem 1rem; cursor: pointer;
      text-align: left; font-family: inherit; font-size: 0.93rem; font-weight: 600; color: #1e293b;
      transition: background 0.15s, border-color 0.15s, transform 0.1s; box-shadow: 0 2px 8px rgba(0,0,0,0.08); line-height: 1.4;
    }
    .e3-option:hover:not(:disabled) { border-color: #34D399; transform: translateX(3px); }
    .e3-option:disabled { cursor: default; }
    .e3-option-label { width: 2rem; height: 2rem; background: #1E293B; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 800; flex-shrink: 0; }
    .e3-option-text { flex: 1; }
    .e3-option.e3-selected { border-color: #60A5FA; background: #EFF6FF; }
    .e3-option.e3-correct { background: #dcfce7; border-color: #22c55e; }
    .e3-option.e3-correct .e3-option-label { background: #22c55e; }
    .e3-option.e3-wrong { background: #fee2e2; border-color: #ef4444; }
    .e3-option.e3-wrong .e3-option-label { background: #ef4444; }

    .e3-blanks { display: flex; flex-direction: column; gap: 0.7rem; }
    .e3-blank-row { display: flex; align-items: center; justify-content: space-between; gap: 0.8rem; background: #fff; border-radius: 0.9rem; padding: 0.7rem 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .e3-blank-label { font-size: 0.88rem; font-weight: 600; color: #374151; flex: 1; }
    .e3-blank-input { width: 90px; height: 42px; text-align: center; font-size: 1.05rem; font-weight: 700; border: 2px solid #e2e8f0; border-radius: 0.6rem; }
    .e3-blank-input:disabled.e3-correct-input { border-color: #22c55e; background: #dcfce7; color: #166534; }
    .e3-blank-input:disabled.e3-wrong-input { border-color: #ef4444; background: #fee2e2; color: #991b1b; }

    .e3-feedback { border-radius: 0.85rem; padding: 0.85rem 1.1rem; font-size: 0.93rem; font-weight: 600; margin-top: 0.8rem; line-height: 1.45; }
    .e3-feedback-right { background: #dcfce7; color: #166534; border: 1.5px solid #86efac; }
    .e3-feedback-wrong { background: #fee2e2; color: #991b1b; border: 1.5px solid #fca5a5; }
    .e3-nav { margin-top: 1rem; justify-content: flex-end; }
    .e3-nav .e3-btn { width: auto; }

    /* ── RESULT ── */
    .e3-result { background: #fff; border-radius: 1.5rem; padding: 2rem 1.5rem; max-width: 600px; width: 100%; margin: 1rem auto; box-shadow: var(--shadow-lg, 0 8px 30px rgba(0,0,0,0.12)); }
    .e3-result-tag { text-align: center; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem; }
    .e3-result-icon { font-size: 4rem; text-align: center; }
    .e3-result-grade { font-size: 2rem; font-weight: 800; text-align: center; margin: 0.3rem 0 0.2rem; }
    .e3-result-score { font-size: 2.5rem; font-weight: 900; text-align: center; color: #1E293B; }
    .e3-result-pct { text-align: center; color: #64748B; font-size: 1rem; margin-bottom: 1.5rem; }
    .e3-result-list { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.5rem; max-height: 320px; overflow-y: auto; }
    .e3-result-row { display: flex; align-items: flex-start; gap: 0.6rem; padding: 0.55rem 0.7rem; border-radius: 0.6rem; font-size: 0.87rem; }
    .e3-row-ok { background: #f0fdf4; }
    .e3-row-fail { background: #fef2f2; }
    .e3-row-num { font-weight: 800; color: #64748B; min-width: 1.4rem; flex-shrink: 0; }
    .e3-row-q { flex: 1; color: #374151; line-height: 1.35; }
    .e3-row-mark { flex-shrink: 0; }
    .e3-result-actions { display: flex; flex-direction: column; gap: 0.6rem; }

    @media (min-width: 768px) {
      .e3-intro { padding: 3rem 2.5rem; }
      .e3-result-actions { flex-direction: row; flex-wrap: wrap; }
      .e3-result-actions .e3-btn { flex: 1; }
    }
    @media (max-width: 400px) {
      .e3-wrap { padding: 0.5rem; }
      .e3-intro { padding: 1.8rem 1.2rem; }
    }
  `;
  document.head.appendChild(style);
}
