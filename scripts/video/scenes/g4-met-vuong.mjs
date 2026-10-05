/**
 * TikTok cho phụ huynh: Toán 4, Bài 18 Đề-xi-mét vuông, mét vuông, mi-li-mét vuông (🔲 Lưới diện tích), phần Khám phá.
 *   node scripts/video/record.mjs scripts/video/scenes/g4-met-vuong.mjs
 *
 * Mồi tò mò: 1 m = 10 dm, vậy mà 1 m² lại bằng 100 dm², vì sao? Bố mẹ chưa cho con học cách này thì tiếc.
 * App cho thấy tận mắt: lát kín 1 dm² bằng 100 ô cm², thu nhỏ ra 1 m² (bạn nhỏ đứng cạnh), phóng vào 1 mm² (chú kiến).
 * Bỏ bước chọn đơn vị và lát mặt bàn để video gọn.
 */

const SITE = 'mathtieuhoc.vercel.app';

export default {
  name: 'g4-met-vuong',
  grade: 4,
  warm: ['grade4-tools'],
  viewport: { width: 432 },
  voice: 'vi-VN-NamMinhNeural',     // thầy Quang trong app
  narrator: 'vi-VN-HoaiMyNeural',   // người dẫn nói với phụ huynh
  css: `
    .v-hook, .v-outro { background: linear-gradient(170deg, #FCE7F3 0%, #FBCFE8 40%, #BFDBFE 100%); color: #1E293B; justify-content: flex-start; padding: 56px 40px 0; gap: 10px; }
    .v-hook .v-k { font-size: 21px; font-weight: 800; line-height: 1.25; }
    .v-hook .v-pity { font-size: 20px; font-weight: 800; line-height: 1.3; background: #fff; border: 3px solid #1E293B; border-radius: 16px; padding: 8px 12px; }
    .v-hook .v-pity b { color: #B91C1C; }
    .v-hook .v-eq { font-size: 30px; font-weight: 800; line-height: 1.1; }
    .v-hook .v-big { font-size: 44px; font-weight: 800; line-height: 1.05; color: #B91C1C; }
    .v-hook .v-sub { font-size: 18px; font-weight: 700; white-space: nowrap; }
    .v-site { font-size: 17px; font-weight: 800; color: #fff; background: #7C3AED; border-radius: 999px; padding: 6px 14px; }
    .v-outro { padding-top: 40px; gap: 10px; }
    .v-outro .v-t { font-size: 27px; font-weight: 800; line-height: 1.1; }
    .v-outro ul { list-style: none; margin: 0; padding: 0; text-align: left; font-size: 16.5px; font-weight: 700; display: flex; flex-direction: column; gap: 7px; width: 100%; }
    .v-outro li { background: #fff; border: 3px solid #1E293B; border-radius: 14px; padding: 5px 10px; line-height: 1.25; }
    .v-outro .v-s { font-size: 15px; font-weight: 700; color: #334155; }
    .v-outro .v-learn { font-size: 16px; font-weight: 800; color: #334155; margin-top: 4px; }
    .v-outro .v-site { font-size: 22px; padding: 10px 18px; box-shadow: 0 6px 0 #5B21B6; border: 3px solid #1E293B; }
    #v-label { font-size: 16px; padding: 8px 14px; white-space: nowrap; max-width: none; }
  `,
  async run(v) {
    // 1. Mở đầu: câu "đáng tiếc" + câu đố khiến bố mẹ tò mò
    await v.card(`
      <div class="v-pity">Bố mẹ chưa cho con học cách này thì <b>thật đáng tiếc!</b></div>
      <div class="v-k">Con thuộc:</div>
      <div class="v-eq">1 m = 10 dm</div>
      <div class="v-k">vậy mà</div>
      <div class="v-big">1 m² = 100 dm²</div>
      <div class="v-big" style="font-size:36px">VÌ SAO? 🤔</div>
      <div class="v-sub">Hiếm thầy cô nào dạy dễ hiểu thế này 👇</div>
      <div class="v-site">🌐 ${SITE}</div>`,
    { cls: 'v-hook', say: 'Bố mẹ chưa cho con học cách này thì thật đáng tiếc! Một mét bằng mười đề-xi-mét, mà một mét vuông lại bằng một trăm đề-xi-mét vuông. Vì sao?', hold: 400 });
    await v.uncard();

    // 2. Đường vào: Lớp 4 → Học bằng công cụ → Bài 18 → Khám phá
    await v.label('Lớp 4 · 🧰 Học bằng công cụ');
    await v.tap('.game-card[data-game="grade4-tools"]', { after: 600 });
    await v.label('Bài 18: Mét vuông, đề-xi-mét vuông');
    await v.tap('.g4h-tile[data-n="18"]', { after: 600 });
    await v.label('🔎 Khám phá cùng thầy');
    // 3. Lát kín 1 dm² bằng các ô 1 cm² (bỏ câu giới thiệu hai hình vuông, nhãn trên hình đã ghi)
    const intro = v.heard('Hình vuông nhỏ màu hồng');
    const tiling = v.heard('Lát kín');
    await v.tap('[data-act="explore"]', { after: 300 });
    v.cut((await intro).t);
    await v.label('👀 Thấy tận mắt: lát từng ô 1 cm²');
    v.uncut((await tiling).t);
    await v.tap('.g4-next.g4-ready', { after: 300 });

    // 4. Con chọn: thử nhầm "10 ô" (giống lỗi hay gặp), thầy nhắc cách đếm
    const choice = (wrong) => {
      const ex = window.__g4ex;
      if (!ex?.box?.isConnected) return null;
      const b = ex.box.querySelector(`.g4-choice[data-i="${wrong ? 0 : ex.index}"]`);
      return b && !b.disabled ? b : null;
    };
    await v.label('✋ Nhầm "10 ô"? Thầy nhắc cách đếm');
    await v.tap(choice, { arg: true, after: 3400 });   // nút hiện sau câu hỏi; nghe hết lời nhắc
    await v.tap(choice, { arg: false, after: 300 });
    await v.label('');
    await v.tap('.g4-next.g4-ready', { after: 300 });

    // 5. Thu nhỏ ra 1 m²: ô hồng vừa lát chỉ là 1 trong 100 ô (bỏ câu về bạn nhỏ và bước mm² cho gọn)
    await v.label('🔭 Thu nhỏ: 1 m² to cỡ nào?');
    const kid = v.heard('Bạn nhỏ cao');
    v.cut((await kid).t);
    await v.waitFor('.g4-next.g4-ready');
    v.uncut();

    // 6. Khung kết: vì sao con hiểu bài hơn + địa chỉ trang
    await v.card(`
      <div class="v-t">Vì sao con nhớ lâu?</div>
      <ul>
        <li>👀 Thấy tận mắt vì sao là 100, rồi mới nhớ số</li>
        <li>🔭 Thu nhỏ từ dm² ra m², có bạn nhỏ đứng cạnh để so</li>
        <li>💡 Nhầm thì thầy nhắc cách nghĩ</li>
        <li>📖 Đúng Bài 18, trang 60 SGK Toán 4</li>
      </ul>
      <div class="v-learn">Học cùng con tại</div>
      <div class="v-site">🌐 ${SITE}</div>
      <div class="v-s">Toán Tiểu Học · Toán 4: 37 bài Tập Một</div>`,
    { cls: 'v-outro', say: 'Con thấy tận mắt một mét vuông to cỡ nào, nên hiểu vì sao là một trăm, không học vẹt. Địa chỉ trang học ở ngay trên màn hình.', hold: 3500 });
  },
};
