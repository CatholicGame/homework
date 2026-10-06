/**
 * TikTok cho phụ huynh: giới thiệu cả app, từ Tiền tiểu học tới Lớp 5 (khoảng 1 phút 20).
 *   node scripts/video/record.mjs scripts/video/scenes/tour-cac-lop.mjs
 *
 * Mỗi lớp một đoạn ngắn: trang chủ của lớp (các cuốn sách) → mở một hoạt động tiêu biểu → con tự tay làm.
 * Chỉ có giọng người dẫn (app tắt tiếng đọc), tiếng động của app giữ nguyên.
 * Không nói, không hiện địa chỉ trang (TikTok không duyệt quảng bá video dẫn ra ngoài).
 */

const GRADES = [
  { g: -1, name: 'Tiền tiểu học', color: '#EC4899' },
  { g: 1, name: 'Lớp 1', color: '#FF6B9D' },
  { g: 2, name: 'Lớp 2', color: '#60A5FA' },
  { g: 3, name: 'Lớp 3', color: '#34D399' },
  { g: 4, name: 'Lớp 4', color: '#C084FC' },
  { g: 5, name: 'Lớp 5', color: '#FBBF24' },
];

export default {
  name: 'tour-cac-lop',
  grade: -1,
  warm: ['pre1-math', 'grade1-workbook', 'grade2-workbook', 'grade3-workbook', 'grade4-tools', 'grade5-tools'],
  viewport: { width: 432 },
  voice: 'vi-VN-NamMinhNeural',
  narrator: 'vi-VN-HoaiMyNeural',
  appVoice: false,
  css: `
    .v-hook, .v-outro { background: linear-gradient(170deg, #FFF7ED 0%, #FDE68A 40%, #BAE6FD 100%); color: #1E293B; justify-content: flex-start; padding: 64px 36px 0; gap: 14px; }
    .v-hook .v-em { font-size: 64px; line-height: 1; }
    .v-hook .v-k { font-size: 23px; font-weight: 800; line-height: 1.2; }
    .v-hook .v-big { font-size: 38px; font-weight: 800; line-height: 1.1; color: #B91C1C; }
    .v-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
    .v-chip { color: #fff; font-weight: 800; font-size: 18px; padding: 6px 14px; border-radius: 999px; border: 3px solid #1E293B; box-shadow: 0 4px 0 #1E293B; }
    .v-hook .v-sub { font-size: 18px; font-weight: 800; background: #fff; border: 3px solid #1E293B; border-radius: 16px; padding: 8px 12px; line-height: 1.3; }
    .v-outro { padding-top: 44px; gap: 10px; }
    .v-outro .v-t { font-size: 26px; font-weight: 800; line-height: 1.15; }
    .v-outro ul { list-style: none; margin: 0; padding: 0; text-align: left; font-size: 16.5px; font-weight: 700; display: flex; flex-direction: column; gap: 7px; width: 100%; }
    .v-outro li { background: #fff; border: 3px solid #1E293B; border-radius: 14px; padding: 6px 10px; line-height: 1.25; }
    .v-outro .v-s { font-size: 17px; font-weight: 800; color: #334155; margin-top: 4px; }
    #v-label { font-size: 17px; padding: 8px 14px; white-space: nowrap; max-width: none; }
    #v-label .v-g { display: inline-block; color: #fff; border-radius: 999px; padding: 0 10px; margin-right: 6px; }
  `,
  async run(v) {
    const { page } = v;
    const chips = GRADES.map(x => `<span class="v-chip" style="background:${x.color}">${x.name}</span>`).join('');
    /** Đổi lớp trong hồ sơ rồi về trang chủ của lớp đó (đầu trang). */
    const grade = async (g) => {
      await page.evaluate((g) => {
        const k = 'tth_profile_guest';
        const p = JSON.parse(localStorage.getItem(k));
        localStorage.setItem(k, JSON.stringify({ ...p, grade: g }));
        window.__navigate('home');
        window.scrollTo(0, 0);
      }, g);
      await v.wait(700);
    };
    const tag = (g, text) => {
      const x = GRADES.find(y => y.g === g);
      return v.label(`<span class="v-g" style="background:${x.color}">${x.name}</span>${text}`);
    };
    // Chạy trong trang: phần tử thứ i (đang hiện) khớp selector; phím chữ của bàn phím ảo theo chữ trên phím.
    const nth = ([sel, i]) => [...document.querySelectorAll(sel)].filter(e => e.getBoundingClientRect().height > 0)[i] || null;
    // (bàn phím số / chữ ẩn vẫn có kích thước, chỉ nằm ngoài màn hình → chỉ tìm trong ô chữ của câu)
    const vkKey = (k) => [...document.querySelectorAll('.vk-tile')]
      .find(b => b.getBoundingClientRect().height > 0 && b.textContent.trim() === k) || null;

    // 1. Mở đầu
    await v.card(`
      <div class="v-em">🎒</div>
      <div class="v-k">Học toán cùng con</div>
      <div class="v-big">từ trước lớp 1<br>đến hết lớp 5</div>
      <div class="v-chips">${chips}</div>
      <div class="v-sub">Bám sát SGK, học bằng hình và trò chơi 👇</div>`,
    { cls: 'v-hook', say: 'Học toán cùng con từ trước lớp một đến hết lớp năm, bằng hình và trò chơi.', hold: 200 });
    await v.uncard();

    // 2. Tiền tiểu học: Bé Học Vui Toán, đếm và tô số
    await grade(-1);
    await tag(-1, '📚 5 cuốn: chữ cái, số, đếm…');
    let said = v.say('Trước lớp một: bé làm quen chữ cái, đếm và tô màu các số, có bạn Thỏ dẫn đường.');
    await v.tap('.game-card[data-game="pre1-math"]', { after: 500 });
    await v.tap('[data-id="bai-1"]', { after: 900 });
    await tag(-1, '🐰 Chạm để đếm, tô số');
    await v.tap('.pk-item', { after: 700 });
    for (let i = 0; i < 3; i++) await v.tap(nth, { arg: ['.pk-outline', i], move: 450, after: 300 });
    await said;
    await v.wait(500);

    // 3. Lớp 1: Vở Bài Tập, bé tự viết dấu so sánh
    await grade(1);
    await tag(1, '📒 Vở Bài Tập Toán 1');
    said = v.say('Lớp một, hai, ba: làm đúng vở bài tập, từng bài, từng trang như trong sách.');
    await v.tap('.game-card[data-game="grade1-workbook"]', { after: 500 });
    await v.tap('[data-unit="bai-10"]', { after: 600 });
    await tag(1, '✍️ Bé tự viết: 2 < 5');
    // Mỗi ô một chữ, ô không tự nhảy sang ô sau: chạm ô rồi chạm chữ.
    for (const [j, k] of ['2', '<', '5'].entries()) {
      await v.tap(nth, { arg: ['input[data-vk-one]', j], move: j ? 400 : 650, after: 250 });
      await v.tap(vkKey, { arg: k, move: 400, after: 250 });
    }
    await v.wait(400);
    await said;
    await v.wait(600);

    // 4. Lớp 2: trò chơi xe buýt (người lên xe → phép cộng)
    await grade(2);
    await tag(2, '🎮 Học xong bài thì chơi');
    said = v.say('Học xong bài thì chơi: khách lên, xuống xe buýt, con tính phép cộng, phép trừ.');
    await v.tap('.game-card[data-game="grade2-workbook"]', { after: 500 });
    await v.tap('[data-stall="bus"][data-level="bus-1"]', { after: 500 });
    await v.tap('[data-act="play"]', { after: 1200 });
    const ans = await page.evaluate(() => window.__g2bus.m.ans);
    await tag(2, '🔢 Xe còn bao nhiêu người?');
    for (const d of String(ans)) await v.tap(`.g3g-key[data-k="${d}"]`, { move: 450, after: 250 });
    await v.tap('.g3g-key[data-k="ok"]', { move: 450, after: 600 });
    await tag(2, '🚪 Mở cửa xem có đúng không');
    await v.tap('[data-act="go"]', { after: 3800 });
    await said;

    // 5. Lớp 3: Chợ phiên, đặt quả cân lên cân đĩa
    await grade(3);
    await tag(3, '🍎 Chợ phiên: cân, tính tiền');
    said = v.say('Lớp ba ra chợ phiên: đặt quả cân, chọn quả cho cân thăng bằng rồi tính tiền.');
    await v.tap('.game-card[data-game="grade3-workbook"]', { after: 500 });
    await v.tap('[data-stall="fruit"][data-level="fruit-1"]', { after: 500 });
    await v.tap('[data-act="play"]', { after: 1000 });
    // Quả cân cho đúng số ki-lô-gam khách mua (chọn lớn trước).
    const picks = await page.evaluate(() => {
      const want = Number((document.body.innerText.match(/(\d+) kg/) || [])[1]);
      const ws = [...document.querySelectorAll('.g3f-weight')].map(b => ({ i: b.dataset.i, kg: parseFloat(b.textContent) }))
        .sort((a, b) => b.kg - a.kg);
      let left = want;
      const out = [];
      for (const w of ws) if (w.kg <= left) { out.push(w.i); left -= w.kg; }
      return out;
    });
    await tag(3, '⚖️ Đặt quả cân, chọn quả');
    for (const i of picks) await v.tap(`.g3f-weight[data-i="${i}"]`, { move: 500, after: 500 });
    for (let i = 0; i < 2; i++) await v.tap(`.g3f-piece[data-p="${i}"]`, { move: 500, after: 600 });
    await said;

    // 6. Lớp 4: Học bằng công cụ, Bài 18 mét vuông
    await grade(4);
    await tag(4, '🧰 Học bằng công cụ');
    said = v.say('Lớp bốn, năm: thầy Quang dạy bằng công cụ.');
    await v.tap('.game-card[data-game="grade4-tools"]', { after: 500 });
    await v.tap('.g4h-tile[data-n="18"]', { after: 600 });
    const tiling = v.heard('Lát kín');
    await v.tap('[data-act="explore"]', { after: 300 });
    await said;
    // Bỏ lời giới thiệu của thầy (app tắt tiếng), vào thẳng lúc lát ô.
    v.cut();
    v.uncut((await tiling).t);
    await tag(4, '👀 Lát kín 1 dm² bằng ô 1 cm²');
    said = v.say('Con thấy tận mắt vì sao, rồi mới học quy tắc.');
    await said;
    await v.wait(1500); // vài giây lát ô là đủ, không chờ lát kín

    // 7. Lớp 5: Bài 3 phân số, tự tay tô băng giấy
    await grade(5);
    await tag(5, '🍫 Phân số trên băng giấy');
    said = v.say('Lớp năm học phân số trên băng giấy.');
    await v.tap('.game-card[data-game="grade5-tools"]', { after: 500 });
    await v.tap('.g4h-tile[data-n="3"]', { after: 400 });
    await v.tap('[data-act="explore"]', { after: 300 });
    await said;
    const part = (i) => {
      const g = document.querySelector('[data-fig="a"]');
      return g && g.style.cursor === 'pointer' ? g.querySelector(`[data-part="${i}"]`) : null;
    };
    v.cut();
    await page.waitForFunction(part, 0, { timeout: 30000 });
    v.uncut();
    await tag(5, '✋ Tô 3 trong 5 phần');
    said = v.say('Con tự tay tô, hiểu ba phần năm là gì.');
    for (let i = 0; i < 3; i++) await v.tap(part, { arg: i, move: 450, after: 400 });
    await v.wait(1800);
    await said;
    await v.label('');

    // 8. Khung kết: vì sao con học tốt hơn
    await v.card(`
      <div class="v-t">Vì sao con hiểu bài, nhớ lâu?</div>
      <ul>
        <li>👀 Thấy bằng hình trước, rồi mới học quy tắc</li>
        <li>✋ Con tự tay làm, chơi mà học</li>
        <li>💡 Nhầm thì thầy nhắc cách nghĩ</li>
        <li>📖 Đúng bài, đúng trang SGK</li>
      </ul>
      <div class="v-chips">${chips}</div>
      <div class="v-s">Toán Tiểu Học</div>`,
    { cls: 'v-outro', say: 'Thấy bằng hình, tự tay làm, nhầm thì được nhắc cách nghĩ. Con hiểu bài, không học vẹt.', hold: 1500 });
  },
};
