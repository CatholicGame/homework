/**
 * Ôn Thi Giáo Lý — Trắc nghiệm Giáo lý cho trẻ em
 * Lớp Đèn Bàn Tiệc Thánh I
 */

const SECTIONS = [
  {
    id: 'easy',
    title: 'Phần I — Câu Dễ',
    short: 'Câu Dễ',
    icon: '⭐',
    color: '#22c55e',
    count: 20,
    questions: [
      {
        q: 'Em học Giáo lý để làm gì?',
        options: [
          'Để biết Thiên Chúa là Cha',
          'Để biết Đức Giêsu Ki-tô là Đấng cứu độ',
          'Để biết mọi người là anh em',
          'Cả A, B và C',
        ],
        answer: 3,
      },
      {
        q: 'Em biết Thiên Chúa để làm gì?',
        options: [
          'Để được hạnh phúc đời này và đời sau',
          'Để yêu mến Thiên Chúa',
          'Để yêu mến anh em',
          'Cả A, B và C',
        ],
        answer: 0,
      },
      {
        q: 'Chúa Giêsu đã chọn bao nhiêu môn đệ để thiết lập Hội Thánh?',
        options: ['10', '11', '12', 'Những người tin Chúa'],
        answer: 2,
      },
      {
        q: 'Nhờ Bí Tích gì chúng ta được trở nên con cái Chúa trong Hội Thánh?',
        options: [
          'Bí tích Thêm sức',
          'Bí tích Rửa Tội',
          'Bí tích Mình Thánh Chúa',
          'Tất cả đều sai',
        ],
        answer: 1,
      },
      {
        q: 'Vị Thánh nào là người đầu tiên được Chúa trao Hội Thánh?',
        options: ['Thánh Gioan', 'Thánh Luca', 'Thánh Phêrô', 'Thánh Maccô'],
        answer: 2,
      },
      {
        q: 'Người đứng đầu Giáo hội hiện nay là ai?',
        options: ['Đức Giêsu', 'Đức Giáo Hoàng', 'Đức Cha', 'Tất cả đều sai'],
        answer: 1,
      },
      {
        q: 'Sau khi con người chết, linh hồn con người sẽ phải ra trước mặt Chúa để chịu gì?',
        options: ['Chịu phán xét', 'Chịu khen thưởng', 'Chịu chết', 'Tất cả đều sai'],
        answer: 0,
      },
      {
        q: 'Để được lên Thiên đàng, em phải tránh xa điều gì?',
        options: ['Tội lỗi', 'Phạm tội', 'Làm điều ác', 'Tất cả đều sai'],
        answer: 0,
      },
      {
        q: 'Sau khi chết, thân xác con người sẽ như thế nào?',
        options: ['Hư nát', 'Còn nguyên', 'Không bị mục nát', 'Đáp án B và C'],
        answer: 0,
      },
      {
        q: 'Chúng ta phải có thái độ như thế nào với người có lỗi với ta?',
        options: ['Tha thứ', 'Không tha thứ', 'Ghét bỏ', 'Cả B và C'],
        answer: 0,
      },
      {
        q: 'Ta có thể giúp các linh hồn trong luyện ngục bằng cách:',
        options: ['Cầu nguyện', 'Xin Lễ', 'Bỏ mặc', 'Cả A và B'],
        answer: 3,
      },
      {
        q: 'Nơi những linh hồn bị phạt, phải xa Chúa vĩnh viễn?',
        options: ['Hoả ngục', 'Luyện ngục', 'Thiên đàng', 'Tất cả đều sai'],
        answer: 0,
      },
      {
        q: 'Thiên Chúa dạy ta phải làm gì khi gặp người đang bị khát?',
        options: ['Cho uống', 'Cho ăn', 'Cho vào nhà', 'Tất cả đều sai'],
        answer: 0,
      },
      {
        q: 'Thiên Chúa tạo dựng ông Adam, Thiên Chúa thổi hơi vào lỗ mũi, ban cho Adam điều gì?',
        options: ['Sự sống', 'Cái chết', 'Đôi mắt', 'Tất cả đều đúng'],
        answer: 0,
      },
      {
        q: 'Chúng ta phải tôn kính Đức Mẹ Maria thế nào?',
        options: [
          'Tham dự các ngày Lễ Kính Đức Mẹ',
          'Siêng năng lần hạt Mân côi',
          'Noi gương nhân Đức của Mẹ',
          'Cả A, B và C',
        ],
        answer: 3,
      },
      {
        q: 'Tháng mấy là tháng Dâng hoa Kính Đức Mẹ?',
        options: ['Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
        answer: 2,
      },
      {
        q: 'Có mấy Thiên Chúa?',
        options: ['1', '2', '3', '4'],
        answer: 0,
      },
      {
        q: 'Trong Kinh Thú nhận, từ "Lỗi tại tôi" được nhắc lại mấy lần?',
        options: ['2 lần', '3 lần', '4 lần', '5 lần'],
        answer: 1,
      },
      {
        q: 'Ai sinh ra Đức Giêsu về bản tính loài người?',
        options: [
          'Quyền năng Chúa Thánh Thần',
          'Đức Maria',
          'Chúa Cha',
          'Cả A và C',
        ],
        answer: 1,
      },
      {
        q: 'Muốn được ơn tha tội, chúng ta phải làm gì?',
        options: ['Xưng tội', 'Đền tội', 'Giữ lại một phần tội', 'Đáp án A và B'],
        answer: 3,
      },
    ],
  },
  {
    id: 'medium',
    title: 'Phần II — Câu Trung Bình',
    short: 'Trung Bình',
    icon: '⭐⭐',
    color: '#f59e0b',
    count: 10,
    questions: [
      {
        q: 'Hội Thánh là gì?',
        options: [
          'Là dân được Thiên Chúa kêu gọi và quy tụ làm thành cộng đoàn.',
          'Gồm những người nhờ Đức Tin và Bí tích Rửa tội, trở nên con cái Thiên Chúa, chi thể của Đức Ki-tô và đền thờ Chúa Thánh Thần.',
          'Cả A và B',
          'Tất cả đều sai',
        ],
        answer: 2,
      },
      {
        q: 'Tín hữu Công giáo gồm những ai?',
        options: [
          'Gồm những người tin vào Đức Ki-tô',
          'Gồm những người đã lãnh nhận Bí tích Rửa Tội',
          'Gồm những người hiệp thông vào Đức Giáo Hoàng',
          'Cả A, B và C',
        ],
        answer: 3,
      },
      {
        q: 'Đức Maria được Thiên Chúa ban cho mấy đặc ân?',
        options: ['2', '3', '4', '5'],
        answer: 2,
      },
      {
        q: 'Khi chết, con người sẽ ra sao?',
        options: [
          'Linh hồn và thân xác sẽ tách rời nhau.',
          'Thân xác chịu cảnh hư nát, còn linh hồn chịu sự phán xét của Thiên Chúa và chờ ngày kết hợp lại với thân xác được biến đổi khi Chúa lại đến trong vinh quang.',
          'Cả A và B sai',
          'Cả A và B đúng',
        ],
        answer: 1,
      },
      {
        q: 'Vì sao chúng ta tin xác loài người ngày sau sống lại?',
        options: [
          'Vì Đức Ki-tô đã sống lại từ cõi chết và lên trời.',
          'Vì Đức Ki-tô đã sống lại từ cõi chết và sẽ làm cho chúng ta sống lại trong ngày sau hết, với một thân xác không còn hư nát.',
          'Vì Đức Ki-tô đã sống lại từ cõi chết, chúng ta là con cái của Ngài cũng sẽ được sống lại như Ngài.',
          'Cả A, B và C đều sai',
        ],
        answer: 1,
      },
      {
        q: 'Thiên đàng là gì?',
        options: [
          'Là nơi hạnh phúc dành cho con người.',
          'Là tình trạng hạnh phúc trọn đầy và vĩnh viễn, vì được hiệp thông trọn vẹn cùng Thiên Chúa Ba ngôi và các Thánh.',
          'Là nơi vô cùng sung sướng.',
          'Tất cả đều sai',
        ],
        answer: 1,
      },
      {
        q: 'Hoả ngục là gì?',
        options: [
          'Là án phạt đời đời bị tách khỏi Thiên Chúa, dành cho những ai chết trong tình trạng mắc tội trọng.',
          'Là án phạt đời đời dành cho kẻ coi thường tội trọng.',
          'Là án phạt tạm thời cho những người có lòng ăn năn sám hối.',
          'Tất cả đều sai',
        ],
        answer: 0,
      },
      {
        q: 'Luyện ngục là gì?',
        options: [
          'Là nơi vắng bóng Thiên Chúa.',
          'Là tình trạng của những người chết trong ơn nghĩa Chúa nhưng cần được thanh luyện trước khi hưởng hạnh phúc thiên đàng.',
          'Là nơi dành cho những linh hồn mắc tội trọng.',
          'Tất cả đều sai.',
        ],
        answer: 1,
      },
      {
        q: 'Theo Tin mừng Thánh Gioan (20,19): Đức Giêsu đến đứng giữa các ông và nói [....]',
        options: [
          'Bình an cho anh em.',
          'Các con hãy cầm lấy mà ăn.',
          'Các con hãy cầm lấy mà uống.',
          'Tất cả đều sai.',
        ],
        answer: 0,
      },
      {
        q: 'Theo Tin Mừng Thánh Mathêu (19,14): Đức Giêsu nói: Cứ để [...] đến với Thầy, đừng ngăn cản chúng, vì Nước Trời là của những ai giống như chúng.',
        options: ['Người lớn', 'Trẻ em', 'Mọi người', 'Tất cả đều sai'],
        answer: 1,
      },
    ],
  },
  {
    id: 'hard',
    title: 'Phần III — Câu Khó',
    short: 'Câu Khó',
    icon: '⭐⭐⭐',
    color: '#ef4444',
    count: 10,
    questions: [
      {
        q: 'Hội Thánh Công Giáo gồm những thành phần nào?',
        options: [
          'Gồm 3 thành phần: Giáo sĩ, tu sĩ và giáo dân.',
          'Gồm 2 thành phần: Giáo sĩ và giáo dân. Trong 2 thành phần này có những người sống đời thánh hiến gọi là tu sĩ.',
          'Gồm 3 thành phần: Giám mục, linh mục và phó tế.',
          'Cả A và C',
        ],
        answer: 1,
      },
      {
        q: 'Hội Thánh gồm những yếu tố nào?',
        options: [
          'Hội thánh là một tổ chức hữu hình với cơ cấu phẩm trật.',
          'Hội thánh là một cộng đoàn thiêng liêng và là nhiệm thể Chúa Ki-tô.',
          'Cả A và B',
          'Tất cả đều sai',
        ],
        answer: 2,
      },
      {
        q: 'Vì sao Hội Thánh là Dân Thiên Chúa?',
        options: [
          'Vì Thiên Chúa muốn thánh hoá và cứu độ mọi người không phải cách riêng rẽ nhưng quy tụ họ thành một dân duy nhất.',
          'Vì đây là tập hợp những người được Thiên Chúa tuyển chọn.',
          'Vì mọi thành viên đều được xức dầu Thánh.',
          'Tất cả đều sai.',
        ],
        answer: 0,
      },
      {
        q: 'Vì sao Đức Maria là Mẹ Hội Thánh?',
        options: [
          'Vì Đức Mẹ đã sinh ra Chúa Giêsu là đầu của Hội thánh.',
          'Vì trên Thánh giá, Chúa Giêsu đã trao Đức Mẹ Maria là Mẹ Hội Thánh qua Thánh Gioan Tông đồ.',
          'Cả A và B',
          'Tất cả đều sai.',
        ],
        answer: 2,
      },
      {
        q: 'Thiên Chúa đã ban cho Đức Maria những đặc ân nào?',
        options: [
          'Vô nhiễm nguyên tội, làm mẹ Thiên Chúa, Đồng trinh trọn đời, hồn xác lên trời.',
          'Vô nhiễm nguyên tội, làm mẹ Thiên Chúa, làm Mẹ Giáo hội, hồn xác lên trời.',
          'Vô nhiễm nguyên tội, làm mẹ Giáo hội, Đồng trinh trọn đời, hồn xác lên trời.',
          'Tất cả đều sai.',
        ],
        answer: 0,
      },
      {
        q: 'Vì sao Hội thánh có quyền tha tội?',
        options: [
          'Vì chính Chúa Giêsu đã trao cho các tông đồ quyền này, khi nói: "Anh em hãy nhận lấy Thánh Thần. Anh em tha tội cho ai thì người ấy được tha".',
          'Vì chính Chúa Giêsu đã trao cho Hội thánh nhờ Chúa Thánh Thần.',
          'Vì chính Hội thánh đã nhận được quyền ấy trong ngày Chúa Thánh Thần hiện xuống.',
          'Cả A, B, C đều sai',
        ],
        answer: 0,
      },
      {
        q: 'Quyền tha tội của Hội thánh nhắc ta nhớ điều gì?',
        options: [
          'Nhắc ta nhớ rằng Thiên Chúa là Đấng giàu lòng thương xót đã ban cho những phương thế thích hợp để ta được ơn tha tội.',
          'Nhắc ta nhớ chúng ta là tội nhân.',
          'Nhắc ta nhớ Chúa là Đấng giàu lòng thương xót.',
          'Tất cả đều sai.',
        ],
        answer: 2,
      },
      {
        q: '"Tôi tin xác loài người ngày sau sống lại" nghĩa là gì?',
        options: [
          'Nghĩa là thân xác con người sau khi chết sẽ hư nát, nhưng Thiên Chúa sẽ cho thân xác ấy được sống lại trong ngày tận thế.',
          'Nghĩa là thân xác con người sau khi chết sẽ được Phục sinh.',
          'Nghĩa là thân xác người công chính sẽ không bị hư nát, và được sống lại trong ngày sau hết.',
          'Tất cả đều sai.',
        ],
        answer: 0,
      },
      {
        q: 'Chúng ta được tha tội qua những Bí tích nào?',
        options: [
          'Bí tích Rửa tội và Thêm sức',
          'Bí tích Rửa tội và Giải tội',
          'Bí tích Rửa tội, Thêm sức và Giải tội',
          'Đáp án A và C',
        ],
        answer: 1,
      },
      {
        q: 'Giáo sĩ gồm những ai?',
        options: [
          'Giám mục, linh mục và phó tế.',
          'Giáo sĩ, giáo dân, tu sĩ.',
          'Giáo sĩ và giáo dân, trong hai thành phần này có những người sống đời thánh hiến gọi là tu sĩ.',
          'Tất cả đều sai',
        ],
        answer: 0,
      },
    ],
  },
];

const LABELS = ['A', 'B', 'C', 'D'];

export function render(app, onBack) {
  let phase = 'intro';
  let current = 0;
  let activeQuestions = [];
  let activeSectionTitle = '';
  let activeSectionColor = '#1e3a5f';
  let selected = [];
  let locked = false;

  injectStyles();

  // ── INTRO ─────────────────────────────────────────────────────────────────
  function showIntro() {
    phase = 'intro';
    const allCount = SECTIONS.reduce((s, sec) => s + sec.questions.length, 0);
    app.innerHTML = `
      <div class="gl-wrap">
        <div class="gl-intro animate-fadeIn">
          <div class="gl-cross">✝</div>
          <h1 class="gl-intro-title">Ôn Thi Giáo Lý</h1>
          <p class="gl-intro-sub">Lớp Đèn Bàn Tiệc Thánh I</p>

          <div class="gl-section-label">Chọn phần ôn tập:</div>

          <div class="gl-section-grid">
            <button class="gl-section-btn gl-section-all" data-section="all">
              <span class="gl-sec-icon">📋</span>
              <span class="gl-sec-title">Tất Cả</span>
              <span class="gl-sec-count">${allCount} câu</span>
            </button>
            ${SECTIONS.map(sec => `
              <button class="gl-section-btn" data-section="${sec.id}" style="--sec-color:${sec.color}">
                <span class="gl-sec-icon">${sec.icon}</span>
                <span class="gl-sec-title">${sec.short}</span>
                <span class="gl-sec-count">${sec.questions.length} câu</span>
              </button>
            `).join('')}
          </div>

          <div class="gl-divider"></div>
          <button class="gl-btn gl-btn-ghost" id="gl-review-btn">📖 Xem tất cả đáp án</button>
          <button class="gl-btn gl-btn-ghost" id="gl-back-btn">← Quay lại</button>
        </div>
      </div>
    `;

    app.querySelectorAll('.gl-section-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sid = btn.dataset.section;
        if (sid === 'all') {
          activeQuestions = SECTIONS.flatMap(s => s.questions);
          activeSectionTitle = 'Tất Cả — ' + allCount + ' câu';
          activeSectionColor = '#1e3a5f';
        } else {
          const sec = SECTIONS.find(s => s.id === sid);
          activeQuestions = sec.questions;
          activeSectionTitle = sec.title;
          activeSectionColor = sec.color;
        }
        selected = new Array(activeQuestions.length).fill(null);
        current = 0;
        showQuestion();
      });
    });

    app.querySelector('#gl-review-btn').onclick = () => showReview(null);
    app.querySelector('#gl-back-btn').onclick = onBack;
  }

  // ── QUIZ ──────────────────────────────────────────────────────────────────
  function showQuestion() {
    phase = 'quiz';
    locked = false;
    const q = activeQuestions[current];
    const pct = Math.round((current / activeQuestions.length) * 100);

    app.innerHTML = `
      <div class="gl-wrap">
        <div class="gl-quiz animate-fadeIn">
          <div class="gl-topbar">
            <button class="gl-back-btn" id="gl-quit">✕</button>
            <div class="gl-progress-wrap">
              <div class="gl-progress-track">
                <div class="gl-progress-fill" style="width:${pct}%; background:${activeSectionColor}"></div>
              </div>
              <span class="gl-progress-label">${current + 1} / ${activeQuestions.length}</span>
            </div>
          </div>

          <div class="gl-question-card">
            <div class="gl-q-num" style="color:${activeSectionColor}">Câu ${current + 1}</div>
            <div class="gl-q-text">${q.q}</div>
          </div>

          <div class="gl-options" id="gl-options">
            ${q.options.map((opt, i) => `
              <button class="gl-option" data-idx="${i}">
                <span class="gl-option-label">${LABELS[i]}</span>
                <span class="gl-option-text">${opt}</span>
              </button>
            `).join('')}
          </div>

          <div class="gl-nav" id="gl-nav" style="display:none">
            <button class="gl-btn gl-btn-primary" id="gl-next" style="background:linear-gradient(135deg,${activeSectionColor},${activeSectionColor}cc)">
              ${current < activeQuestions.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả 🏅'}
            </button>
          </div>
        </div>
      </div>
    `;

    app.querySelector('#gl-quit').onclick = showIntro;
    app.querySelectorAll('.gl-option').forEach(btn => {
      btn.onclick = () => {
        if (locked) return;
        locked = true;
        const idx = parseInt(btn.dataset.idx);
        selected[current] = idx;
        revealAnswer(idx, q.answer);
      };
    });
  }

  function revealAnswer(chosen, correct) {
    app.querySelectorAll('.gl-option').forEach((btn, i) => {
      btn.disabled = true;
      if (i === correct) btn.classList.add('gl-correct');
      else if (i === chosen && chosen !== correct) btn.classList.add('gl-wrong');
    });

    const isRight = chosen === correct;
    const banner = document.createElement('div');
    banner.className = `gl-feedback ${isRight ? 'gl-feedback-right' : 'gl-feedback-wrong'}`;
    banner.innerHTML = isRight
      ? '✅ Đúng rồi! Giỏi lắm!'
      : `❌ Chưa đúng! Đáp án đúng: <strong>${LABELS[correct]}. ${activeQuestions[current].options[correct]}</strong>`;
    app.querySelector('#gl-options').after(banner);

    app.querySelector('#gl-nav').style.display = 'flex';
    app.querySelector('#gl-next').onclick = () => {
      current++;
      if (current >= activeQuestions.length) showResult();
      else showQuestion();
    };
  }

  // ── RESULT ────────────────────────────────────────────────────────────────
  function showResult() {
    phase = 'result';
    const correctCount = selected.filter((ans, i) => ans === activeQuestions[i].answer).length;
    const total = activeQuestions.length;
    const pct = Math.round((correctCount / total) * 100);
    const { emoji, label, color } = getGrade(pct);

    app.innerHTML = `
      <div class="gl-wrap">
        <div class="gl-result animate-fadeIn">
          <div class="gl-result-section-tag" style="color:${activeSectionColor}">${activeSectionTitle}</div>
          <div class="gl-result-icon">${emoji}</div>
          <h2 class="gl-result-grade" style="color:${color}">${label}</h2>
          <div class="gl-result-score">${correctCount} / ${total}</div>
          <div class="gl-result-pct">${pct}% câu đúng</div>

          <div class="gl-result-list">
            ${activeQuestions.map((q, i) => {
              const ans = selected[i];
              const ok = ans === q.answer;
              return `
                <div class="gl-result-row ${ok ? 'gl-row-ok' : 'gl-row-fail'}">
                  <span class="gl-row-num">${i + 1}</span>
                  <span class="gl-row-q">${q.q}</span>
                  <span class="gl-row-ans">${ans !== null ? LABELS[ans] : '—'} ${ok ? '✅' : '❌'}</span>
                </div>
              `;
            }).join('')}
          </div>

          <div class="gl-result-actions">
            <button class="gl-btn gl-btn-primary" id="gl-retry">🔄 Làm lại</button>
            <button class="gl-btn gl-btn-secondary" id="gl-review-result">📖 Xem đáp án</button>
            <button class="gl-btn gl-btn-ghost" id="gl-home-result">🏠 Trang chủ</button>
          </div>
        </div>
      </div>
    `;

    app.querySelector('#gl-retry').onclick = () => {
      selected = new Array(activeQuestions.length).fill(null);
      current = 0;
      showQuestion();
    };
    app.querySelector('#gl-review-result').onclick = () => showReview(activeQuestions);
    app.querySelector('#gl-home-result').onclick = showIntro;
  }

  // ── REVIEW ────────────────────────────────────────────────────────────────
  function showReview(questions) {
    phase = 'review';
    const list = questions || SECTIONS.flatMap(s => s.questions);
    const isAll = !questions;

    app.innerHTML = `
      <div class="gl-wrap">
        <div class="gl-review animate-fadeIn">
          <div class="gl-review-header">
            <button class="gl-back-btn" id="gl-review-back">←</button>
            <h2>📖 Đáp Án Đề Cương</h2>
          </div>
          <div class="gl-review-subtitle">
            Lớp Đèn Bàn Tiệc Thánh I — ${list.length} câu
          </div>

          ${isAll ? renderReviewBySections() : renderReviewList(list, null)}

          <div style="text-align:center;padding:1rem 0 2rem">
            <button class="gl-btn gl-btn-primary" id="gl-start-from-review">🚀 Làm Bài Ngay</button>
          </div>
        </div>
      </div>
    `;

    app.querySelector('#gl-review-back').onclick = showIntro;
    app.querySelector('#gl-start-from-review').onclick = showIntro;
  }

  function renderReviewBySections() {
    return SECTIONS.map(sec => `
      <div class="gl-review-section-header" style="border-color:${sec.color};color:${sec.color}">
        ${sec.icon} ${sec.title}
      </div>
      ${renderReviewList(sec.questions, sec.color)}
    `).join('');
  }

  function renderReviewList(list, color) {
    return `
      <div class="gl-review-list">
        ${list.map((q, i) => `
          <div class="gl-review-item">
            <div class="gl-review-q" style="${color ? `background:${color}` : ''}">
              <span class="gl-review-num">Câu ${i + 1}</span>
              ${q.q}
            </div>
            <div class="gl-review-opts">
              ${q.options.map((opt, j) => `
                <div class="gl-review-opt ${j === q.answer ? 'gl-review-correct' : ''}">
                  <span class="gl-review-label">${LABELS[j]}</span>
                  ${opt}
                  ${j === q.answer ? '<span class="gl-check">✓</span>' : ''}
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  showIntro();
}

function getGrade(pct) {
  if (pct >= 90) return { emoji: '🏆', label: 'Xuất sắc!', color: '#F59E0B' };
  if (pct >= 75) return { emoji: '🌟', label: 'Giỏi!', color: '#10B981' };
  if (pct >= 60) return { emoji: '😊', label: 'Khá!', color: '#3B82F6' };
  if (pct >= 40) return { emoji: '📖', label: 'Cần ôn thêm', color: '#8B5CF6' };
  return { emoji: '✝️', label: 'Hãy cố lên!', color: '#EF4444' };
}

function injectStyles() {
  if (document.getElementById('gl-styles')) return;
  const style = document.createElement('style');
  style.id = 'gl-styles';
  style.textContent = `
    .gl-wrap {
      min-height: 100vh;
      background: linear-gradient(160deg, #1e3a5f 0%, #2d5a8e 40%, #1a2e4a 100%);
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 1rem;
      box-sizing: border-box;
    }

    /* ── INTRO ── */
    .gl-intro {
      background: rgba(255,255,255,0.97);
      border-radius: 1.5rem;
      padding: 2.5rem 2rem;
      max-width: 560px;
      width: 100%;
      margin: auto;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .gl-cross {
      font-size: 3rem;
      color: #c9a227;
      line-height: 1;
      margin-bottom: 0.5rem;
      text-shadow: 0 2px 8px rgba(201,162,39,0.3);
    }
    .gl-intro-title {
      font-size: clamp(1.6rem, 5vw, 2.2rem);
      font-weight: 800;
      color: #1e3a5f;
      margin: 0 0 0.3rem;
    }
    .gl-intro-sub {
      color: #64748b;
      font-size: 1rem;
      margin: 0 0 1.5rem;
    }
    .gl-section-label {
      font-weight: 700;
      color: #374151;
      margin-bottom: 0.75rem;
      font-size: 0.95rem;
    }
    .gl-section-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.6rem;
      margin-bottom: 1.2rem;
    }
    .gl-section-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
      padding: 0.9rem 0.5rem;
      border: 2px solid #e2e8f0;
      border-radius: 1rem;
      background: #f8fafc;
      cursor: pointer;
      font-family: inherit;
      transition: border-color 0.15s, background 0.15s, transform 0.1s;
    }
    .gl-section-btn:hover {
      border-color: var(--sec-color, #1e3a5f);
      background: #fff;
      transform: translateY(-2px);
    }
    .gl-section-all {
      grid-column: 1 / -1;
      flex-direction: row;
      gap: 0.6rem;
      justify-content: center;
    }
    .gl-sec-icon { font-size: 1.4rem; }
    .gl-sec-title { font-weight: 700; font-size: 0.9rem; color: #1e3a5f; }
    .gl-sec-count { font-size: 0.8rem; color: #64748b; }
    .gl-divider {
      height: 1px;
      background: #e2e8f0;
      margin: 0.8rem 0;
    }
    .gl-intro .gl-btn { width: 100%; margin-bottom: 0.5rem; }

    /* ── BUTTONS ── */
    .gl-btn {
      border: none;
      border-radius: 0.75rem;
      padding: 0.85rem 1.5rem;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.12s, box-shadow 0.12s;
      font-family: inherit;
    }
    .gl-btn:active { transform: scale(0.97); }
    .gl-btn-primary {
      background: linear-gradient(135deg, #1e3a5f, #2d5a8e);
      color: #fff;
      box-shadow: 0 4px 16px rgba(30,58,95,0.35);
    }
    .gl-btn-primary:hover { box-shadow: 0 6px 20px rgba(30,58,95,0.45); transform: translateY(-1px); }
    .gl-btn-secondary {
      background: linear-gradient(135deg, #c9a227, #f0c040);
      color: #1e3a5f;
      box-shadow: 0 4px 16px rgba(201,162,39,0.3);
    }
    .gl-btn-ghost {
      background: #f1f5f9;
      color: #475569;
    }
    .gl-btn-ghost:hover { background: #e2e8f0; }
    .gl-back-btn {
      background: rgba(255,255,255,0.15);
      border: none;
      color: #fff;
      font-size: 1.1rem;
      padding: 0.4rem 0.8rem;
      border-radius: 0.5rem;
      cursor: pointer;
      font-weight: 700;
      transition: background 0.15s;
      flex-shrink: 0;
    }
    .gl-back-btn:hover { background: rgba(255,255,255,0.25); }

    /* ── QUIZ ── */
    .gl-quiz {
      max-width: 640px;
      width: 100%;
      margin: 0 auto;
      padding-bottom: 2rem;
    }
    .gl-topbar {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 0.5rem 0 1rem;
    }
    .gl-progress-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
    .gl-progress-track {
      flex: 1;
      height: 8px;
      background: rgba(255,255,255,0.2);
      border-radius: 999px;
      overflow: hidden;
    }
    .gl-progress-fill {
      height: 100%;
      border-radius: 999px;
      transition: width 0.4s ease;
    }
    .gl-progress-label {
      color: rgba(255,255,255,0.8);
      font-size: 0.85rem;
      white-space: nowrap;
      font-weight: 600;
    }
    .gl-question-card {
      background: rgba(255,255,255,0.97);
      border-radius: 1.2rem;
      padding: 1.4rem 1.5rem;
      margin-bottom: 1rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }
    .gl-q-num {
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }
    .gl-q-text {
      font-size: clamp(0.95rem, 2.8vw, 1.15rem);
      font-weight: 700;
      color: #1e3a5f;
      line-height: 1.5;
    }
    .gl-options {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .gl-option {
      display: flex;
      align-items: flex-start;
      gap: 0.8rem;
      background: rgba(255,255,255,0.93);
      border: 2px solid transparent;
      border-radius: 1rem;
      padding: 0.9rem 1rem;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      font-size: 0.93rem;
      font-weight: 600;
      color: #1e293b;
      transition: background 0.15s, border-color 0.15s, transform 0.1s;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      line-height: 1.4;
    }
    .gl-option:hover:not(:disabled) {
      background: #fff;
      border-color: #c9a227;
      transform: translateX(3px);
    }
    .gl-option:disabled { cursor: default; }
    .gl-option-label {
      width: 2rem;
      height: 2rem;
      background: #1e3a5f;
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      font-weight: 800;
      flex-shrink: 0;
      margin-top: 0.05rem;
    }
    .gl-option-text { flex: 1; }
    .gl-option.gl-correct { background: #dcfce7; border-color: #22c55e; }
    .gl-option.gl-correct .gl-option-label { background: #22c55e; }
    .gl-option.gl-wrong { background: #fee2e2; border-color: #ef4444; }
    .gl-option.gl-wrong .gl-option-label { background: #ef4444; }
    .gl-feedback {
      border-radius: 0.85rem;
      padding: 0.85rem 1.1rem;
      font-size: 0.93rem;
      font-weight: 600;
      margin-top: 0.6rem;
      line-height: 1.45;
    }
    .gl-feedback-right { background: #dcfce7; color: #166534; border: 1.5px solid #86efac; }
    .gl-feedback-wrong { background: #fee2e2; color: #991b1b; border: 1.5px solid #fca5a5; }
    .gl-nav { margin-top: 1rem; justify-content: flex-end; }

    /* ── RESULT ── */
    .gl-result {
      background: rgba(255,255,255,0.97);
      border-radius: 1.5rem;
      padding: 2rem 1.5rem;
      max-width: 600px;
      width: 100%;
      margin: 1rem auto;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .gl-result-section-tag {
      text-align: center;
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .gl-result-icon { font-size: 4rem; text-align: center; }
    .gl-result-grade { font-size: 2rem; font-weight: 800; text-align: center; margin: 0.3rem 0 0.2rem; }
    .gl-result-score { font-size: 2.5rem; font-weight: 900; text-align: center; color: #1e3a5f; }
    .gl-result-pct { text-align: center; color: #64748b; font-size: 1rem; margin-bottom: 1.5rem; }
    .gl-result-list {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      margin-bottom: 1.5rem;
      max-height: 320px;
      overflow-y: auto;
    }
    .gl-result-row {
      display: flex;
      align-items: flex-start;
      gap: 0.6rem;
      padding: 0.55rem 0.7rem;
      border-radius: 0.6rem;
      font-size: 0.87rem;
    }
    .gl-row-ok { background: #f0fdf4; }
    .gl-row-fail { background: #fef2f2; }
    .gl-row-num { font-weight: 800; color: #64748b; min-width: 1.4rem; flex-shrink: 0; }
    .gl-row-q { flex: 1; color: #374151; line-height: 1.35; }
    .gl-row-ans { font-weight: 700; flex-shrink: 0; white-space: nowrap; }
    .gl-result-actions { display: flex; flex-direction: column; gap: 0.6rem; }

    /* ── REVIEW ── */
    .gl-review {
      max-width: 700px;
      width: 100%;
      margin: 0 auto;
      padding-bottom: 2rem;
    }
    .gl-review-header {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 0.5rem 0;
    }
    .gl-review-header h2 {
      color: #fff;
      font-size: clamp(1.1rem, 4vw, 1.5rem);
      margin: 0;
      font-weight: 800;
    }
    .gl-review-subtitle {
      color: rgba(255,255,255,0.7);
      font-size: 0.88rem;
      margin-bottom: 1rem;
      padding-left: 0.2rem;
    }
    .gl-review-section-header {
      font-size: 1rem;
      font-weight: 800;
      padding: 0.5rem 0.8rem;
      border-left: 4px solid;
      background: rgba(255,255,255,0.1);
      border-radius: 0.4rem;
      margin: 1rem 0 0.5rem;
    }
    .gl-review-list {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
    }
    .gl-review-item {
      background: rgba(255,255,255,0.97);
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0,0,0,0.12);
    }
    .gl-review-q {
      background: #1e3a5f;
      color: #fff;
      padding: 0.7rem 1rem;
      font-weight: 700;
      font-size: 0.92rem;
      line-height: 1.45;
      display: flex;
      gap: 0.5rem;
      align-items: flex-start;
    }
    .gl-review-num {
      background: #c9a227;
      color: #1e3a5f;
      border-radius: 0.4rem;
      padding: 0.05rem 0.45rem;
      font-size: 0.75rem;
      font-weight: 900;
      flex-shrink: 0;
      align-self: flex-start;
      margin-top: 2px;
      white-space: nowrap;
    }
    .gl-review-opts {
      padding: 0.55rem 0.8rem;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }
    .gl-review-opt {
      display: flex;
      align-items: flex-start;
      gap: 0.6rem;
      padding: 0.4rem 0.6rem;
      border-radius: 0.5rem;
      font-size: 0.88rem;
      color: #374151;
      line-height: 1.4;
    }
    .gl-review-opt.gl-review-correct {
      background: #dcfce7;
      color: #166534;
      font-weight: 700;
    }
    .gl-review-label {
      width: 1.4rem;
      height: 1.4rem;
      background: #e2e8f0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.72rem;
      font-weight: 800;
      flex-shrink: 0;
      color: #475569;
      margin-top: 1px;
    }
    .gl-review-correct .gl-review-label { background: #22c55e; color: #fff; }
    .gl-check { margin-left: auto; font-size: 1rem; flex-shrink: 0; }

    /* ── RESPONSIVE ── */
    @media (min-width: 768px) {
      .gl-intro { padding: 3rem 2.5rem; }
      .gl-section-grid { grid-template-columns: 1fr 1fr 1fr 1fr; }
      .gl-section-all { grid-column: auto; }
      .gl-intro .gl-btn { width: auto; }
      .gl-intro .gl-btn + .gl-btn { margin-left: 0.5rem; }
      .gl-result-actions { flex-direction: row; flex-wrap: wrap; }
      .gl-result-actions .gl-btn { flex: 1; }
    }
    @media (max-width: 400px) {
      .gl-wrap { padding: 0.5rem; }
      .gl-intro { padding: 1.8rem 1.2rem; }
      .gl-section-grid { grid-template-columns: 1fr 1fr; }
      .gl-section-all { grid-column: 1 / -1; }
    }
  `;
  document.head.appendChild(style);
}
