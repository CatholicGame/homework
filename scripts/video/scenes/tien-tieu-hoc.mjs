/**
 * Video giới thiệu Tiền tiểu học cho phụ huynh (khoảng 1 phút 30), dọc 1080×1920.
 *   python scripts/video/music.py          (một lần: tạo nhạc nền tự soạn out/music/vui-ve.wav)
 *   node scripts/video/record.mjs scripts/video/scenes/tien-tieu-hoc.mjs
 *
 * Mở đầu → trang chủ 5 cuốn → mỗi cuốn một hoạt động bé tự làm:
 *   Bé Học Vui Toán 1 (đếm, tô màu, tô số) · Tập 2 (so sánh, chọn dấu) · Làm quen chữ cái (tô chữ, Thỏ đánh vần)
 *   · Bé Tập Làm Toán (nối đồng hồ với giờ) · Bé Chụp Ảnh Chim (chụp rồi đếm) → chơi bằng bàn tay → khung kết.
 * Người dẫn: giọng Hoài My; bạn Thỏ của app: cùng giọng nhưng cao hơn, chỉ bật ở vài chỗ người dẫn im lặng.
 * Không nói, không hiện địa chỉ trang (TikTok không duyệt quảng bá video dẫn ra ngoài).
 */

const BOOKS = [
  { id: 'pre1-math', icon: '🐰', name: 'Đếm và viết số', color: '#EC4899' },
  { id: 'pre2-math', icon: '🐊', name: 'So sánh', color: '#8B5CF6' },
  { id: 'pre3-abc', icon: '🔤', name: 'Chữ cái, đánh vần', color: '#0EA5E9' },
  { id: 'pre4-math', icon: '🧮', name: '99 đề toán', color: '#F59E0B' },
  { id: 'pre5-photo', icon: '📷', name: 'Chụp ảnh chim', color: '#22C55E' },
];

export default {
  name: 'tien-tieu-hoc',
  grade: -1,
  warm: BOOKS.map(b => b.id),
  viewport: { width: 432 },
  voice: 'vi-VN-HoaiMyNeural',
  pitch: '+40Hz',
  narrator: 'vi-VN-HoaiMyNeural',
  appVoice: false,
  music: 'out/music/vui-ve.wav',
  musicVolume: 0.16,
  css: `
    .v-hook, .v-outro { background: linear-gradient(180deg, #7DD3FC 0%, #BAE6FD 46%, #FEF9C3 74%, #BBF7D0 74.2%, #86EFAC 100%); color: #0F172A; justify-content: flex-start; overflow: hidden; }
    .v-hook::before, .v-outro::before, .v-hook::after, .v-outro::after { content: ''; position: absolute; background: #fff; border-radius: 999px; opacity: .9;
      box-shadow: 26px -14px 0 4px #fff, 56px 0 0 0 #fff; width: 60px; height: 30px; animation: vCloud 9s linear infinite alternate; }
    .v-hook::before, .v-outro::before { left: 22px; top: 40px; }
    .v-hook::after, .v-outro::after { right: 84px; top: 116px; transform: scale(.7); animation-duration: 12s; }
    @keyframes vCloud { to { translate: 24px 0; } }
    .v-hook { padding: 92px 26px 0; gap: 14px; }
    .v-hook .v-k { font-size: 24px; font-weight: 800; color: #075985; }
    .v-hook .v-big { font-size: 46px; font-weight: 800; line-height: 1.02; color: #DB2777; text-shadow: 0 3px 0 #fff, 0 6px 0 rgba(15,23,42,.12); }
    .v-hook .v-sub { font-size: 20px; font-weight: 800; background: #fff; border: 3px solid #0F172A; border-radius: 18px; padding: 8px 14px; box-shadow: 0 5px 0 #0F172A; }
    .v-rabbit { font-size: 92px; line-height: 1; animation: vHop 1.1s ease-in-out infinite; filter: drop-shadow(0 6px 0 rgba(15,23,42,.15)); }
    @keyframes vHop { 50% { transform: translateY(-14px) rotate(-4deg); } }
    .v-books { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; width: 100%; margin-top: 6px; }
    .v-book { display: flex; align-items: center; gap: 8px; background: #fff; border: 3px solid #0F172A; border-radius: 16px; padding: 7px 10px; font-size: 16.5px; font-weight: 800; text-align: left;
      box-shadow: 0 4px 0 var(--c); opacity: 0; translate: 0 18px; animation: vIn .45s ease-out forwards; animation-delay: calc(var(--i) * 0.16s + .5s); }
    .v-book:last-child { grid-column: 1 / -1; justify-self: center; }
    .v-book i { font-style: normal; font-size: 24px; }
    @keyframes vIn { to { opacity: 1; translate: 0 0; } }
    .v-outro { padding: 70px 22px 0; gap: 11px; }
    .v-outro .v-t { font-size: 30px; font-weight: 800; line-height: 1.12; color: #0F172A; }
    .v-outro .v-t b { color: #DB2777; }
    .v-outro ul { list-style: none; margin: 0; padding: 0; text-align: left; font-size: 18px; font-weight: 700; display: flex; flex-direction: column; gap: 8px; width: 100%; }
    .v-outro li { background: #fff; border: 3px solid #0F172A; border-radius: 16px; padding: 8px 12px; line-height: 1.25; box-shadow: 0 4px 0 #0F172A;
      opacity: 0; translate: -24px 0; animation: vIn .4s ease-out forwards; animation-delay: calc(var(--i) * 0.35s + .3s); }
    .v-outro .v-rabbit { font-size: 64px; margin-top: 4px; }
    .v-brand { font-size: 22px; font-weight: 800; color: #fff; background: #DB2777; border-radius: 999px; padding: 6px 20px; border: 3px solid #0F172A; box-shadow: 0 4px 0 #0F172A; }
    #v-label { font-size: 17px; padding: 8px 14px; white-space: nowrap; max-width: none; top: auto; bottom: 16px; }
    #v-label .v-g { display: inline-block; color: #fff; border-radius: 999px; padding: 0 10px; margin-right: 6px; }
  `,
  async run(v) {
    const { page } = v;
    const book = (id) => BOOKS.find(b => b.id === id);
    const tag = (id, text) => {
      const b = book(id);
      return v.label(`<span class="v-g" style="background:${b.color}">${b.icon} ${b.name}</span>${text}`);
    };
    /** Về trang chủ rồi mở thẳng một cuốn (bản đồ các trạm). */
    // Lượt vừa xong tự sang lượt sau khi Thỏ đọc xong (hẹn giờ): bấm 🗺️ của trò chơi trước để dọn hẹn giờ,
    // không thì lượt cũ vẽ đè lên cuốn mới. Chưa thấy bản đồ thì mở lại.
    const go = async (id) => {
      await page.evaluate(() => document.querySelector('#pk-back, #pk-map')?.click());
      await v.wait(150);
      for (let k = 0; k < 4; k++) {
        await page.evaluate((g) => { window.__navigate(g); window.scrollTo(0, 0); }, id);
        await v.wait(700);
        if (await page.$('.pk-node')) break;
      }
      await v.waitFor('.pk-node');
    };
    /** Cuộn bản đồ tới trạm rồi bấm. */
    const station = async (id, opts) => {
      await page.evaluate((id) => document.querySelector(`.pk-node[data-id="${id}"]`).scrollIntoView({ block: 'center', behavior: 'smooth' }), id);
      await v.wait(700);
      await v.tap(`.pk-node[data-id="${id}"]`, { after: 900, ...opts });
    };
    /** Thỏ đọc xong câu đang đọc (giọng giả của app). */
    const quiet = () => page.waitForFunction(() => !window.speechSynthesis.speaking && !window.speechSynthesis.pending, null, { timeout: 30000 });
    /** Các nét đang phải tô (số / chữ), đổi ra toạ độ trang. */
    const strokes = () => page.evaluate(() => {
      const svg = document.querySelector('.pk-trace-svg');
      const m = svg.getScreenCTM();
      const P = (q) => ({ x: m.a * q.x + m.c * q.y + m.e, y: m.b * q.x + m.d * q.y + m.f });
      return [...svg.querySelectorAll('.pk-trace-fill')].map((p) => {
        const L = p.getTotalLength();
        const pts = [];
        for (let s = 0; s < L; s += 3) pts.push(P(p.getPointAtLength(s)));
        pts.push(P(p.getPointAtLength(L)));
        return pts;
      });
    });
    const trace = async (ms = 1300) => {
      await v.waitFor('.pk-trace-svg');
      await v.wait(300);
      for (const s of await strokes()) await v.stroke(s, { ms, move: 450, after: 150 });
      await v.wait(500);
    };

    // 1. Mở đầu
    await v.card(`
      <div class="v-k">Con sắp vào lớp 1?</div>
      <div class="v-big">Chơi mà học<br>cùng bạn Thỏ</div>
      <div class="v-rabbit">🐰</div>
      <div class="v-sub">Đếm số · Tô chữ · Đánh vần · Làm toán</div>
      <div class="v-books">${BOOKS.map((b, i) => `<div class="v-book" style="--c:${b.color};--i:${i}"><i>${b.icon}</i>${b.name}</div>`).join('')}</div>`,
    { cls: 'v-hook', say: 'Con sắp vào lớp một? Cho con chơi mà học cùng bạn Thỏ: đếm số, tô chữ, đánh vần, làm toán.', hold: 300 });
    await v.uncard();

    // 2. Trang chủ Tiền tiểu học: 5 cuốn
    await v.label('🎒 Tiền tiểu học: 5 cuốn sách');
    let said = v.say('Năm cuốn sách tiền tiểu học, mỗi bài là một trò chơi nhỏ.');
    await v.wait(900);
    await page.evaluate(() => document.querySelector('.game-card[data-game="pre3-abc"]').scrollIntoView({ block: 'start', behavior: 'smooth' }));
    await v.wait(1400);
    await said;

    // 3. Bé Học Vui Toán 1: Thỏ đọc lời dặn, bé chạm đếm, tô màu, rồi tô số bằng ngón tay
    await tag('pre1-math', 'Chạm để đếm');
    said = v.say('Bạn Thỏ đọc to từng lời dặn, bé không cần biết chữ.');
    await v.tap('.game-card[data-game="pre1-math"]', { after: 400 });
    await v.waitFor('.pk-node');
    await said;
    v.appVoice(true);
    const intro = v.heard('Đây là số ba');
    await station('bai-3');
    await intro;
    await quiet();
    for (let i = 0; i < 3; i++) {
      await v.tap(([sel, i]) => document.querySelectorAll(sel)[i], { arg: ['.pk-item', i], move: i ? 380 : 600, after: 500 });
    }
    await quiet();
    v.appVoice(false);
    await tag('pre1-math', 'Tô màu các số 3');
    for (let i = 0; i < 5; i++) {
      await v.tap(([sel, i]) => document.querySelectorAll(sel)[i], { arg: ['.pk-outline', i], move: i ? 280 : 450, after: 150 });
    }
    await v.wait(500);
    await v.tap('.pk-step[data-i="3"]', { after: 600 });
    await tag('pre1-math', 'Tô số theo nét');
    said = v.say('Bé tô số theo nét, chiếc ô tô chạy theo ngón tay.');
    for (let rep = 0; rep < 3; rep++) { await trace(rep ? 1000 : 1400); }
    await said;
    await v.label('');
    await v.waitFor('.pk-win', 15000);
    await v.wait(1500);

    // 4. Tập 2: so sánh hai nhóm rồi chọn dấu
    await go('pre2-math');
    await tag('pre2-math', 'Đếm hai bên, chọn dấu');
    said = v.say('Tập hai: đếm hai bên, xem bên nào nhiều hơn, rồi chọn dấu.');
    await station('so-sanh-1', { move: 500 });
    const sides = await page.evaluate(() => [0, 1].map(i => document.querySelectorAll(`.pk-cmp-side[data-side="${i}"] .pk-item`).length));
    for (const s of [0, 1]) {
      for (let i = 0; i < sides[s]; i++) {
        await v.tap(([s, i]) => document.querySelectorAll(`.pk-cmp-side[data-side="${s}"] .pk-item`)[i], { arg: [s, i], move: i ? 240 : 450, after: 110 });
      }
    }
    await said;
    const sign = sides[0] < sides[1] ? '<' : sides[0] > sides[1] ? '>' : '=';
    await v.tap(`.pk-sign-btn[data-s="${sign}"]`, { after: 1800 });

    // 5. Làm quen chữ cái: tô chữ, rồi Thỏ đánh vần
    await go('pre3-abc');
    await tag('pre3-abc', 'Tô chữ a');
    said = v.say('Làm quen chữ cái: tô chữ theo nét, rồi học âm, học vần đủ một trăm lẻ năm bài.');
    await station('a-b', { move: 500 });
    await trace(1500);
    await trace(1100);
    await said;
    await go('pre3-abc');
    await station('bai-1', { move: 450, after: 600 });
    await v.tap('.pk-step[data-i="2"]', { after: 500 });
    await v.waitFor('.pk3-syl');
    await tag('pre3-abc', 'Thỏ đánh vần');
    await quiet();
    v.appVoice(true);
    // Hàng tiếng thứ hai: "ti, tì, tí…": chạm "tí" để nghe đánh vần.
    await v.tap(() => document.querySelectorAll('.pk3-row')[1]?.querySelectorAll('.pk3-syl')[2], { after: 300 });
    await v.wait(300);
    await quiet();
    v.appVoice(false);
    await v.wait(300);

    // 6. Bé Tập Làm Toán (99 đề): nối đồng hồ với giờ
    await go('pre4-math');
    await tag('pre4-math', 'Xem đồng hồ');
    said = v.say('Chín mươi chín đề toán chuẩn bị vào lớp một: xem giờ, tính tiền, tìm quy luật.');
    await station('tg-dong-ho', { move: 500, after: 600 });
    for (const [a, b] of [[0, 2], [1, 0], [2, 3], [3, 1]]) {
      await v.tap(`.pk4-node[data-side="from"][data-i="${a}"]`, { move: 380, after: 150 });
      await v.tap(`.pk4-node[data-side="to"][data-i="${b}"]`, { move: 380, after: 250 });
    }
    await said;
    await v.wait(1200);

    // 7. Bé Chụp Ảnh Chim: chờ cả đàn vào khung, chụp, chạm đếm (Thỏ đếm), chọn số
    await go('pre5-photo');
    await tag('pre5-photo', 'Chụp rồi đếm');
    said = v.say('Đàn chim bay tới, bé bấm chụp rồi chạm đếm từng con.');
    await station('chup-5', { move: 500, after: 300 });
    await page.waitForFunction(() => {
      const f = document.querySelector('.pk5-frame')?.getBoundingClientRect();
      const bs = [...document.querySelectorAll('.pk5-bird')].map(b => b.getBoundingClientRect());
      // Cả đàn đã vào hẳn khung (thừa chỗ để ngón tay kịp bay tới nút Chụp).
      return f && bs.length && bs.every(b => b.left >= f.left + f.width * 0.12 && b.right <= f.right - 4);
    }, null, { timeout: 30000 });
    await v.tap('.pk5-shoot', { move: 350, after: 600 });
    await said;
    await quiet();
    v.appVoice(true);
    const birds = await page.evaluate(() => document.querySelectorAll('.pk5-bird').length);
    for (let i = 0; i < birds; i++) {
      await v.tap(([i]) => document.querySelectorAll('.pk5-bird')[i], { arg: [i], move: i ? 330 : 450, after: 450 });
    }
    await v.tap(`.pk-choice[data-n="${birds}"]`, { move: 450, after: 300 });
    await quiet();
    v.appVoice(false);
    await v.wait(600);

    // 8. Chơi bằng bàn tay trước camera
    await tag('pre5-photo', 'Chơi bằng bàn tay');
    said = v.say('Bé còn chơi được bằng bàn tay trước camera. Hình chỉ xử lý trên máy, không gửi đi đâu.');
    await v.tap('#pk-hand', { after: 400 });
    await said;
    await v.wait(400);
    await v.tap('.pk-hand-opt[data-mode="touch"]', { after: 400 });
    await v.label('');

    // 9. Khung kết
    await v.card(`
      <div class="v-t">Vào lớp 1 <b>tự tin</b>,<br>vì con đã quen rồi!</div>
      <ul>
        <li style="--i:0">🔢 Đếm, viết số đến 20, so sánh nhiều ít</li>
        <li style="--i:1">🔤 Chữ cái, học âm, học vần 105 bài</li>
        <li style="--i:2">🧮 99 đề toán: giờ, tiền, hình, quy luật</li>
        <li style="--i:3">🐰 Thỏ đọc to, bé tự chơi một mình</li>
      </ul>
      <div class="v-rabbit">🐰</div>
      <div class="v-brand">Toán Tiểu Học</div>`,
    { cls: 'v-outro', say: 'Mỗi ngày chơi một trạm nhỏ, con vào lớp một thật tự tin.', hold: 2200 });
  },
};
