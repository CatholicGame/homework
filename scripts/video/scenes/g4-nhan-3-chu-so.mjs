/**
 * TikTok cho phụ huynh: Luyện Tính lớp 4, ✖️ Nhân nhiều chữ số, cấp Nâng cao (nhân với số có ba chữ số): 254 × 132.
 *   node scripts/video/record.mjs scripts/video/scenes/g4-nhan-3-chu-so.mjs
 *
 * Thông điệp: bé nào lớp 4 cũng phải học nhân nhiều chữ số; luyện ở đây con vừa nắm cách làm, vừa trình bày chuẩn như vở
 * (đặt tính thẳng cột, tự kẻ vạch bằng thước, mũi tên số nào × số nào, tích riêng lùi cột có gạch chéo ô trống).
 * Một lần viết nhầm ở tích riêng thứ hai để thấy thầy nhắc cách lùi cột.
 */

const A = 254, B = 132;

export default {
  name: 'g4-nhan-3-chu-so',
  grade: 4,
  warm: ['grade4-drills'],
  viewport: { width: 432 },
  voice: 'vi-VN-NamMinhNeural',     // thầy Quang trong app
  narrator: 'vi-VN-HoaiMyNeural',   // người dẫn nói với phụ huynh
  css: `
    .v-hook, .v-outro { background: linear-gradient(170deg, #EDE9FE 0%, #DDD6FE 40%, #BAE6FD 100%); color: #1E293B; justify-content: flex-start; padding: 60px 40px 0; gap: 12px; }
    .v-hook .v-k { font-size: 22px; font-weight: 800; line-height: 1.25; }
    .v-hook .v-big { font-size: 50px; font-weight: 800; line-height: 1.05; color: #6D28D9; }
    .v-hook .v-steps { font-size: 17px; font-weight: 700; color: #334155; }
    .v-hook .v-pitch { font-size: 19px; font-weight: 800; line-height: 1.3; background: #fff; border: 3px solid #1E293B; border-radius: 16px; padding: 8px 12px; }
    .v-hook .v-pitch b { color: #B91C1C; }
    .v-outro { padding-top: 40px; gap: 10px; }
    .v-outro .v-t { font-size: 25px; font-weight: 800; line-height: 1.15; }
    .v-outro ul { list-style: none; margin: 0; padding: 0; text-align: left; font-size: 16px; font-weight: 700; display: flex; flex-direction: column; gap: 7px; width: 100%; }
    .v-outro li { background: #fff; border: 3px solid #1E293B; border-radius: 14px; padding: 5px 10px; line-height: 1.25; }
    .v-outro .v-s { font-size: 15px; font-weight: 700; color: #334155; }
    .g3g-result-fail { visibility: hidden; } /* lượt có một lần nhầm cố ý: không kết video bằng thẻ "phải sửa" */
    #v-label { font-size: 16px; padding: 8px 14px; white-space: nowrap; max-width: none; }
  `,
  async run(v) {
    const { page } = v;
    // Phép nhân cố định cho video (cấp 4 bình thường ra số ngẫu nhiên).
    await page.evaluate(async ([a, b]) => {
      const m = await import('/src/games/grade4Drills/mul.js');
      m.MUL_LEVELS[3].gen = () => ({ a, b });
    }, [A, B]);

    // 1. Mở đầu
    await v.card(`
      <div class="v-k">Bé nào lên lớp 4 cũng phải học:</div>
      <div class="v-big">${A} × ${B} = ?</div>
      <div class="v-steps">Đặt tính, tích riêng, lùi cột, cộng lại…</div>
      <div class="v-pitch">Luyện ở đây, con vừa <b>nắm cách làm</b>, vừa <b>trình bày chuẩn</b> như trong vở ✍️</div>`,
    { cls: 'v-hook', say: 'Bé nào lên lớp 4 cũng phải học nhân nhiều chữ số. Luyện ở đây, con vừa nắm cách làm, vừa trình bày chuẩn như trong vở.', hold: 300 });
    await v.uncard();

    // 2. Đường vào: Luyện Tính → Nhân nhiều chữ số → Nâng cao
    await v.label('Lớp 4 · 🧮 Luyện Tính');
    await v.tap('.game-card[data-game="grade4-drills"]', { after: 600 });
    await v.label('✖️ Nhân nhiều chữ số');
    await v.tap('.g3g-tile[data-game="mul"]', { after: 600 });
    await v.label('Nâng cao: nhân với số có ba chữ số');
    await v.tap('[data-level="d4-mul-4"]', { after: 600 });
    await v.tap('[data-act="play"]', { after: 300 });
    await v.label('📝 Đặt tính thẳng cột');

    // 3. Làm từng bước như em làm: kẻ vạch bằng thước, gõ từng chữ số
    const state = () => page.evaluate(() => {
      const d = window.__g3drill, s = d?.cur?.();
      return {
        done: !!document.querySelector('.g3c-eq-done'),
        rule: !!document.querySelector('.g3d-trace:not(.g3d-trace-out)'),
        on: !!document.querySelector('.g3d-keys:not(.g3d-keys-off)'),
        s: s ? { kind: s.kind, write: s.write, i: s.i, j: s.j } : null,
      };
    });
    const key = (k, fast) => v.tap(`.g3d-key[data-k="${k}"]`, fast ? { move: 380, after: 140 } : { move: 550, after: 250 });
    let rules = 0, told = new Set(), wronged = false;
    for (;;) {
      const st = await state();
      if (st.done) break;
      if (st.rule) {
        await v.label(rules ? '📏 Kẻ vạch trước khi cộng' : '📏 Con tự kẻ vạch bằng thước');
        if (!rules) await v.wait(3200); // nghe thầy dặn cách kẻ
        await v.drag('.g3d-trace .g3d-trace-guide', { from: [0.02, 0.5], to: [1, 0.5], ms: 1100 });
        rules++;
        await v.wait(500);
        continue;
      }
      if (!st.on || !st.s?.write) { await v.wait(120); continue; }
      const { kind, write, i, j } = st.s;
      if (kind === 'digit' && !told.has(`p${j}`)) {
        told.add(`p${j}`);
        if (j === 0) { await v.label('➡️ Mũi tên: số nào × số nào'); await v.say('Mũi tên chỉ rõ số nào nhân với số nào.'); }
        if (j === 1) await v.label('⬅️ Tích riêng lùi sang trái một cột');
        if (j === 2) await v.label('⬅️ Tích riêng thứ ba lùi thêm một cột');
      }
      if (kind === 'sum' && !told.has('sum')) { told.add('sum'); await v.label('➕ Cộng ba tích riêng'); }
      if (kind === 'digit' && j === 1 && i === 0 && !wronged) {
        wronged = true;
        await v.label('✋ Viết nhầm? Thầy nhắc ngay');
        await key(String((Number(write[0]) + 1) % 10));
        await v.wait(5200); // nghe hết lời nhắc
        await v.label('⬅️ Tích riêng lùi sang trái một cột');
        continue;
      }
      for (const ch of write) await key(ch, told.size > 1);
      await v.wait(150);
    }
    await v.label(`✅ ${A} × ${B} = 33 528`);
    await v.wait(3500);
    await v.label('');

    // 4. Khung kết
    await v.card(`
      <div class="v-t">Vì sao con làm đúng, trình bày đẹp?</div>
      <ul>
        <li>➡️ Mũi tên chỉ rõ số nào nhân với số nào</li>
        <li>⬅️ Tích riêng lùi một cột, ô trống gạch chéo</li>
        <li>📏 Con tự kẻ vạch bằng thước, như viết vở</li>
        <li>💡 Nhầm chỗ nào, thầy nhắc đúng chỗ đó</li>
        <li>🔢 Mỗi lượt là một phép tính mới</li>
      </ul>
      <div class="v-s">Toán Tiểu Học · Luyện Tính lớp 4: nhân, chia nhiều chữ số</div>`,
    { cls: 'v-outro', say: 'Con nắm chắc cách làm, trình bày chuẩn như trong vở, mỗi lượt là một phép tính mới.', hold: 3500 });
  },
};
