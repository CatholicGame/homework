# Thiết kế hành động kiểm chứng trong Vở bài tập Toán 2

> Trạng thái (2026-09-29): **đã duyệt.** ✅ Đợt 1 (🫗 Thử rót) xong 17 câu: Bài 16 (T1·1, T1·3, T2·2, T2·3, T2·4, T2·5), 17 (T2·3, T2·4), 20 (T2·4), 21 (T1·4), 35 (T2·1, T2·4), 36 (T2·2b), 38 (T1·2a), 41 (T2·4), 44 (T2·3), 73 (T1·4). ✅ Đợt 2 (⚖️ Thử cân) xong 13 câu có hình cân trong sách: Bài 15 (T1·1, T1·2, T1·3, T2·1, T2·3, T3·2), 17 (T1·1), 21 (T1·3), 33 (T2·3), 35 (T1·1, T1·3a), 36 (T2·2a), 73 (T1·2). Còn lại của nhóm cân (Bài 15 T3·3a, 17 T1·2, 17 T1·3c, 18, 19 T1·3, 21 T1·2, 22 T3·5, 35, 36 T1, 47, 50, 59, 69, 71): sách không có hình cân, cần vẽ cảnh cân riêng (`balancePlay.scene`). Đã làm: 🫗 Thử rót ở Bài 16 Tiết 1 Câu 1 (mở trước) và Tiết 2 Câu 3 (mở sau khi đúng), engine `src/engine/pourPlay.js`.
>
> Nguồn: rà toàn bộ 742 câu của `src/games/grade2Workbook/*.js` (Bài 1–75). `idx` là vị trí câu trong mảng `questions` của Bài đó (đếm từ 0), cần kiểm lại khi làm.

---

## 1. Nguyên tắc (đã chốt với anh)

1. **Lúc mở hành động**
   - **SAU:** hành động cho ra đúng con số hoặc chữ bé phải ghi (rót xong đọc vạch được 8 l, gộp que tính ra 52). Nút chỉ hiện khi bé đã bấm Kiểm tra **và đúng**. Đây là *bước kiểm chứng*, câu cuối luôn là "… Đúng như bé đã tính!".
   - **TRƯỚC:** hành động chỉ giúp nhìn rõ hơn, bé vẫn phải tự suy ra đáp án (so sánh, Đ/S, chọn, tìm). Mở ngay từ đầu.
2. Hành động **không bao giờ ghi vào ô trả lời, không chấm điểm**. Câu nói ở chế độ TRƯỚC chỉ kể điều bé thấy.
3. Đồ đựng hoặc dụng cụ bé cần đọc số thì **có vạch chia** (lít, cm, kg).
4. Mọi thứ đều chuyển động (bay, nghiêng, nhảy), cảnh phản ứng khi đồ vật đáp xuống. Máy tắt hiệu ứng thì chạy bản êm, không bỏ bước.
5. Mỗi hành động có dòng 👆 hướng dẫn, nút ↺ Làm lại, chạm–chạm và kéo thả đều dùng được (iPad). Không tô sáng chỗ đúng.
6. Kích thước đồ vật tỉ lệ đúng với số đo (can 20 l to gấp đôi xô 10 l).
7. Lời nói không dùng "nhé", không dùng dấu "—".

---

## 2. Các engine cần có

Sắp theo thứ tự đề xuất làm (dễ và phủ nhiều câu trước).

| # | Engine | Làm gì | Số câu | Công sức |
|---|---|---|---|---|
| A | 🫗 **Thử rót** (`pourPlay.js`, có sẵn) | Thêm: hàng nhiều cốc/ca (rót đầy lần lượt), thùng có vạch lít nhận nhiều nguồn | ~16 | thấp |
| B | ⚖️ **Thử cân** (`balancePlay.js`, có sẵn) | Thêm: thả đồ vào đĩa, hộp quả cân, cân trống bé tự đặt đồ, bập bênh. Vẽ lại SVG Lớp 2 với móc `bal_item` / `data-dial` | ~25 | vừa |
| C | 🥢 **Que tính và khung 10** | Thêm, bớt đồ vật; đủ 10 thì buộc bó, trừ thì tháo bó; tách một nhóm; gia đình phép tính | ~55 | vừa |
| D | 👫 **Ghép cặp so sánh** | Hai hàng, ghép 1–1, phần thừa/thiếu nhấp nháy; chế độ "nhiều hơn/ít hơn N"; chuyển đồ cho bằng nhau | ~22 | vừa |
| E | 🐸 **Ếch tia số** | Nhảy theo chuỗi phép tính, bước đều (2, 5, 10, 100), tiến/lùi 1, vùng đích. Dùng lại hình của trò Ếch nhảy tia số | ~28 | vừa |
| F | 🍎 **Nhóm bằng nhau / mảng / chia đều** (Tập 2) | Chạm từng nhóm đếm thêm; xếp mảng, xoay 90°; khoanh theo hàng/cột; chia lần lượt vào đĩa; ghép cặp | ~42 | vừa |
| G | 🧱 **Khối trăm, chục, đơn vị** (Tập 2) | Tự dựng số; gộp, bớt theo cột; 10 đơn vị thành 1 chục, 10 chục thành 1 trăm, 10 trăm thành 1 nghìn và ngược lại | ~32 | cao |
| H | 📏 **Thước và đường gấp khúc** | Kéo thước (hít vạch 0); duỗi thẳng đường gấp khúc lên thước; que 1 cm theo cạnh ô; thước tỉ lệ m/km, đồng hồ km | ~35 | vừa |
| I | 🕰️ **Đồng hồ và lịch** | Quay kim phút (đếm 5, 10, 15), dải 24 giờ ngày/đêm; lịch nhảy ngày/tuần, bóc lịch | ~20 | vừa |
| J | 🔷 **Hình học** | Chạm đếm đoạn thẳng, ghép mảnh tìm hình, thước thẳng hàng, tháo khối xếp, ghép mảnh vào khuôn; khối 3D dùng `shape3D.js` có sẵn | ~22 | cao |
| K | 🔢 **Thẻ số** | Kéo thẻ vào ô trăm/chục/đơn vị, lưu số đã lập, số trùng thì rung, thẻ 0 đứng đầu thì bị từ chối | ~10 | thấp |
| L | 🧭 **Dò đường** | Kéo nhân vật dọc lối đi / sợi dây, dừng ở ngã rẽ chờ bé chọn, không tự đi hộ | ~10 | vừa |
| M | 📊 **Kiểm đếm và khả năng** | Chạm đánh dấu và thêm vạch kiểm đếm; thêm chấm vào biểu đồ tranh; bốc thăm từ hộp; xếp vào chuồng | ~11 | vừa |
| N | Lẻ | Que diêm chuyển 1 que (3 câu), trả tiền (2), thuyền chở dê có vạch giới hạn (1), tháp gạch cộng dồn (1) | ~7 | vừa |

---

## 3. Danh sách từng câu

Ký hiệu cột **Mở**: T = trước, S = sau khi đúng. Cột **Eng** là mã engine ở mục 2.

### Tập Một

#### Bài 1. Ôn tập các số đến 100
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | Bảng chục/đơn vị với các tháp táo | C | S | Chạm từng tháp táo đếm 10, 20, 30, rồi quả lẻ 31… 34. Hộp chục/đơn vị hiện "3 chục 4 đơn vị". |
| T2 · 1 | 4 | 54 = 50 + 4 | C | S | 54 hiện thành 5 bó + 4 que; bé kéo bó sang khay chục, que sang khay đơn vị, mỗi khay hiện 50 và 4. |
| T2 · 4 | 7 | Lập số từ thẻ 2, 5, 8 | K | S | Kéo thẻ vào ô chục/đơn vị; số lập được xuống danh sách, trùng thì rung; đủ 6 số thì pháo giấy. |
| T3 · 1 | 8 | Ước lượng rồi đếm ghế (42) | C | S | Kéo khung "1 chục" úp lên từng hàng ghế, đếm 10, 20, 30, 40, còn 2 ghế lẻ. |
| T3 · 2 | 9 | Ước lượng rồi đếm que tính (59) | C | S | Chạm que, que bay vào ống, đủ 10 thì buộc bó; được 5 bó 9 que. |

#### Bài 2. Tia số. Số liền trước, số liền sau
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 3 | 2 | Đ/S liền trước, liền sau (có "liền trước của 0 là 1") | E | T | Ếch đứng ở số của câu, bấm lùi 1 / tiến 1; ở 0 bấm lùi thì ếch nhún rồi đứng yên. |
| T2 · 1 | 3 | Số lớn hơn 36 bé hơn 41; số có chục là 3 | E | S | Cắm cờ ở 36 và 41, các vạch giữa sáng; kéo khung "3 chục" thì 30–39 đổi màu. |
| T2 · 2 | 4 | Lập số từ thẻ 5, 0, 2 | K | S | Thẻ 0 vào ô chục thì hiện "02", ô rung: "0 đứng đầu thì chỉ là số 2 thôi!". |
| T2 · 5 | 7 | Làn chạy của thỏ C, D (voi che số) | E | S | Chạm làn A (4), B (5), rồi C, D, voi tránh sang bên, số làn hiện dần. |

#### Bài 3. Các thành phần của phép cộng, phép trừ
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T2 · 4 | 7 | 16 chim, 5 con bay đi | C | S | Chạm 5 con chim, từng con vỗ cánh bay đi, số trên cành giảm dần. |
| T3 · 2b | 10 | Hiệu số hình tròn đỏ và tam giác xanh | D | S | Kéo từng tam giác lên cặp với một hình tròn; 3 hình tròn không có bạn thì nhấp nháy. |

#### Bài 4. Hơn, kém nhau bao nhiêu
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | Vịt trên bờ (8) hơn vịt dưới ao (5) | D | S | Kéo từng con vịt dưới ao lên cặp với một con trên bờ; 3 con lẻ nhún nhảy. |
| T1 · 4 | 3 | 35 hoa hồng hơn 20 hoa cúc | D | S | Ghép bó với bó, hoa hồng thừa 1 bó và 5 bông. |
| T2 · 1b | 5 | Bút mực dài hơn bút chì bao nhiêu cm | H | S | Kéo thước dưới hai bút, phần thò ra tô sáng, đếm từng vạch cm. |
| T2 · 2 | 6 | Chiều cao rô-bốt, xếp thứ tự | H | S | Kéo rô-bốt đứng cạnh nhau, đoạn chênh có vạch cm; xếp đúng thứ tự thì cả 4 vẫy tay. |
| T2 · 3a | 7 | Nam kém Mai mấy thuyền (10 và 6) | D | S | Ghép cặp thuyền, 4 thuyền của Mai không có cặp nổi lên. |
| T2 · 3b | 8 | Mai cho Nam mấy thuyền thì bằng nhau | D | S | Kéo thuyền từ bàn Mai sang bàn Nam, hai chồng bằng nhau thì hai bạn đập tay. |
| T2 · 4 | 9 | Đỏ hơn vàng 2 cm, vàng hơn xanh 3 cm, đỏ hơn xanh? | H | T | Ba thanh xếp thẳng mép; kéo đoạn 2 cm và 3 cm nối vào đuôi thanh xanh, vừa khít tới đuôi thanh đỏ. |

#### Bài 5. Ôn tập cộng, trừ không nhớ trong phạm vi 100
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | 40 + 60 = 100; 100 − 40 | C | S | Gộp 4 bó và 6 bó, đủ 10 bó thì buộc thành bó 100; rút 4 bó ra. |
| T1 · 3b | 3 | Chuỗi 60 − 20 → + 34 → − 30 | E | S | Ếch nhảy từng chặng, dừng ở mỗi ô hình. |
| T2 · 1 | 6 | Đ/S đặt tính (84 − 3 đặt lệch cột) | C | T | Phép tính trên lưới Chục/Đơn vị; kéo số 3 về cột đơn vị, thấy nó phải nằm dưới số 4. |
| T2 · 5 | 10 | 37 bi, 13 bi xanh, còn bi đỏ | C | S | Kéo 13 viên xanh ra đĩa, hộp còn bi đỏ. |
| T3 · 4 | 15 | Xe 45 ghế, 31 ghế có khách | C | S | Khách lên xe ngồi theo hàng 10, ghế trống còn sáng (dùng lại hình xe buýt). |

#### Bài 6. Luyện tập chung
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 5 | 4 | 37 cam hơn 32 chanh bao nhiêu | D | S | Ghép 3 bó với 3 bó, rồi từng cây, cam thừa 5. |
| T2 · 1c,d | 5 | Liền trước số lớn nhất có hai chữ số; liền sau 90 | E | T | Ếch trên tia 85–100, số 100 khác màu; bấm lùi 1 / tiến 1. |
| T2 · 2 | 6 | Lập số từ 0, 2, 7 và tổng lớn nhất + bé nhất | K | S | Như Bài 1; ghép xong số lớn nhất và bé nhất phát sáng. |

#### Bài 7. Phép cộng qua 10 trong phạm vi 20
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | 8 + 5 (tách 5 = 2 + 3); 9 + 3 | C | S | Khung 10 có 8 que; kéo 2 que lấp đầy, buộc bó "10", còn 3 que. Câu b) ếch nhảy 3 bước. |
| T1 · 2a | 1 | 8 + 4 bằng khối lập phương | C | S | Kéo 2 khối cho đủ thanh 10, 2 khối lẻ đứng cạnh. |
| T2 · 1 | 3 | 6 + 9 theo hai cách | C | S | Hai khung: lấp khung 6 bằng 4 khối, hoặc lấp khung 9 bằng 1 khối; cách nào cũng 15. |
| T3 · 1 | 7 | 7 + 4, 7 + 7 | C | S | Tách 4 = 3 + 1, lấp khung 7. |
| T3 · 3 | 10 | 8 + 4, 8 + 9, 8 + 3 | C | S | Lần nào cũng kéo 2 vào khung 8: "8 luôn cần thêm 2". |
| T3 · 5 | 12 | 8 gà + 6 vịt | C | S | Con vật chạy vào khung 10, đủ 10 thì khung sáng. |
| T4 · 2 | 14 | Chuỗi + 6, + 6 / + 6, − 4, + 6 | E | S | Ếch nhảy, chặng qua 10 dừng một nhịp ở vạch 10. |
| T4 · 4 | 16 | 8 nữ + 7 nam | C | S | Như câu gà vịt. |
| T5 · 3 | 20 | Tổng khối lập phương hình A (2 tầng) + B | J | S | Chạm hình A, tầng trên nhấc lên lộ 4 khối khuất; gộp với hình B. |

#### Bài 8. Bảng cộng qua 10
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T2 · 2 | 6 | Chuỗi 7 + 6 − 10; 5 + 3 + 7 − 5 | E | S | Ếch nhảy theo chuỗi. |
| T2 · 4b | 9 | 9 + 3 so với 3 + 9; 9 + 4 so với 9 + 5 | C | T | Chạm "đổi chỗ", hai nhóm chấm đổi bên mà tổng không đổi; 9 + 5 có thêm 1 chấm. |

#### Bài 9. Bài toán về thêm, bớt một số đơn vị
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | 9 bạn, thêm 5 bạn học bơi | C | S | Từng bạn chạy vào bể, lấp ô thứ 10 rồi sang hàng mới. |
| T1 · 2 | 1 | 6 gà thêm 5 | C | S | Gà chạy vào sân lấp khung 10. |
| T1 · 3 | 2 | 8 lợn mua thêm 4 | C | S | Lợn đi vào chuồng. |
| T2 · 1 | 3 | Xe buýt 35 người, 12 người xuống | C | S | Chạm 12 hành khách, họ bước xuống (1 hàng 10 và 2 người). |
| T2 · 2 | 4 | 16 chim bay đi 5 | C | S | Như Bài 3. |
| T2 · 3 | 5 | 45 gà, bán 14 | C | S | Gà xếp 4 chuồng 10 con + 5 con; đưa 1 chuồng và 4 con lên xe. |
| T2 · 4 | 6 | 15 vịt trên bờ, 3 con xuống ao | C | S | Kéo 3 con xuống ao, vịt té nước. |

#### Bài 10. Luyện tập chung
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 4a | 5 | Hình khối lập phương nào ít khối nhất | J | T | Chạm từng hình, các tầng tách ra lộ khối khuất. |
| T1 · 4b | 6 | Cả ba hình có bao nhiêu khối | C | S | Kéo cả ba hình vào khay, khay tự xếp thành thanh 10. |
| T2 · 3 | 9 | 8 vịt trên bờ, 6 con dưới ao lên | C | S | Kéo vịt từ ao lên bờ, lấp khung 10. |

#### Bài 11. Phép trừ qua 10 trong phạm vi 20
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | 11 − 4, 12 − 3 | C | S | 1 bó + 1 que; cởi bó, rút 4 que, còn 6 que gộp với que lẻ. |
| T2 · 1 | 4 | 13 − 4, 12 − 6 | C | S | Như trên. |
| T2 · 4 | 7 | 13 vở, dùng 8 | C | S | Kéo 8 quyển vào cặp, còn 5. |
| T3 · 1 | 9 | 14 − 7, 15 − 6 | C | S | Như trên. |
| T3 · 4 | 12 | 15 măng cụt lấy 6 | C | S | Lấy quả ra khỏi giỏ. |
| T4 · 3 | 16 | Mai 17 hoa hơn Mi 8 hoa | D | S | Ghép cặp hoa, Mai còn 9 bông lẻ. |
| T4 · 5 | 18 | Chuỗi phép tính | E | S | Ếch nhảy theo chuỗi. |
| T5 · 2 | 20 | Gia đình phép tính 9 + 6 = 15 | C | S | 15 chấm (9 đỏ, 6 xanh); che nhóm đỏ còn 6, che nhóm xanh còn 9. |
| T5 · 3 | 21 | 13 − 3 − 5 và 13 − 8 | C | S | Hai hàng 13 que: bớt 3 rồi 5, và bớt 8; hai hàng còn bằng nhau. |
| T5 · 4 | 22 | Chuỗi phép tính | E | S | Ếch nhảy theo chuỗi. |
| T5 · 5 | 23 | 14 trứng dùng 5 | C | S | Lấy trứng từ vỉ 10 và vỉ 4 cho vào bát. |

#### Bài 12. Bảng trừ qua 10
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 4 | 3 | Hai bạn hái 15 hoa, Mi 7, Mai? | C | S | Kéo 7 bông vào giỏ Mi, phần còn lại của Mai. |
| T2 · 2 | 5 | Bớt hai lần và bớt một lần | C | S | Như Bài 11 T5 · 3. |
| T2 · 3 | 6 | 13 bạn, 8 quả bóng | D | S | Trao từng quả bóng cho một bạn; 5 bạn tay không nhìn quanh. |

#### Bài 13. Bài toán về nhiều hơn, ít hơn
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | Việt 9 hoa, Mai nhiều hơn 4 | D | S | Xếp hàng Mai bằng hàng Việt, thêm 4 bông "nhiều hơn" viền khác màu. |
| T1 · 2 | 1 | 8 vịt trên bờ, dưới ao nhiều hơn 5 | D | S | Như trên. |
| T1 · 3 | 2 | Cành trên 12, cành dưới nhiều hơn 3 | D | S | Như trên. |
| T2 · 1 | 3 | Sóc nâu 12, sóc xám ít hơn 3 | D | S | Hàng sóc xám dưới hàng sóc nâu, 3 chỗ cuối trống viền nét đứt "ít hơn 3". |
| T2 · 2 | 4 | Ô tô 11, hàng dưới ít hơn 3 | D | S | Như trên. |
| T2 · 3 | 5 | 19 vịt, gà ít hơn 5 | D | S | Như trên. |

#### Bài 14. Luyện tập chung
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 3 | 2 | 7 táo + 7 vú sữa; biếu 6 vú sữa | C | S | Kéo cả hai loại quả vào giỏ; đưa 6 quả vú sữa cho bà. |
| T1 · 4 | 3 | Chuỗi 16 − 8 + 6 − 9 | E | S | Ếch nhảy theo chuỗi. |
| T2 · 3 | 7 | Nam 13 thuyền, Việt ít hơn 7 | D | S | Như Bài 13. |
| T2 · 5 | 9 | 4 < 12 − ? < 9 | E | T | Vùng 5–8 tô xanh; chọn thẻ số, ếch lùi từ 12, dừng trong vùng thì cười. |
| T3 · 4 | 13 | 6 + 5 = 11 → 5 + ? = 11, 11 − ? = 5 | C | S | Gia đình phép tính như Bài 11. |

#### Bài 15. Ki-lô-gam
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | 4 thỏ và 3 chó, bên nào nặng hơn | B | T | Nhấc từng bạn khỏi đĩa, cân nghiêng qua lại. |
| T1 · 2 | 1 | Bưởi, cam, táo nặng nhẹ | B | T | Nhấc quả ra, đĩa bên kia chìm xuống. |
| T1 · 3 | 2 | Gấu bông bằng mấy quả chanh | B | S | Đĩa chanh trống, thả từng quả, đến quả thứ 4 thì thăng bằng. |
| T2 · 1 | 3 | Chó, mèo, thỏ so với 1 kg và so với nhau | B | T | Ba cân như sách; thêm một cân trống để kéo hai con lên so trực tiếp. |
| T2 · 3 | 5 | Bí ngô, dưa hấu, chuối so với 1 kg | B | T | Nhấc quả táo khỏi đĩa dưa hấu, cân nghiêng về phía 1 kg. |
| T3 · 2 | 7 | Túi gạo = 1 kg + 5 kg, túi đường = 1 kg + 2 kg | B | S | Đĩa quả cân trống, hộp quả cân 1, 2, 5 kg; đặt tới khi thăng bằng. |
| T3 · 3a | 8 | Ba bao thóc hơn nhau 10 kg | B | T | Bao 1 cân với bao 2 + quả 10 kg; ba bao xếp thành bậc thang. |

#### Bài 16. Lít
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | Đ/S cốc A, ca B, bình C, bình D | A | T | ✅ **Đã làm.** |
| T1 · 3 | 3 | Rót bình A, B ra các cốc (8 và 5) | A | S | Rót bình A lần lượt vào từng cốc, bình cạn ở cốc thứ 8. |
| T2 · 2 | 5 | Cộng lít trong mỗi khung | A | S | Rót các đồ đựng vào thùng có vạch lít, mực dâng tới vạch tổng. |
| T2 · 3 | 6 | Can rót ra ca / xô, còn mấy lít | A | S | ✅ **Đã làm.** |
| T2 · 4 | 7 | Ấm, bình, can, xô bằng các ca bên cạnh | A | S | Rót từng ca vào đồ vật, vạch dâng tới số lít; b) bốn đồ vật đứng cạnh nhau. |
| T2 · 5 | 8 | Can 15 l rót đầy can 5 l | A | S | Can 15 l có vạch rót sang can 5 l, còn 10 l. |

#### Bài 17. Thực hành với ki-lô-gam, lít
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | Sách và bút chì; 5 quyển sách = 1 kg | B | T | Nhấc 1 quyển sách khỏi đĩa thì quả cân 1 kg chìm xuống. |
| T1 · 2 | 1 | Sách và bút mực, bút chì và hộp bút | B | T | Cân trống, bé kéo hai đồ vật lên hai đĩa. |
| T1 · 3c | 2 | Túi gạo 7 kg nặng hơn cà phê 5 kg bao nhiêu | B | S | Thêm quả cân 1 kg vào bên cà phê tới khi thăng bằng: 2 quả. |
| T2 · 3 | 4 | Bình A 10 cốc, B 8 cốc | A | S | Rót mỗi bình ra hàng cốc; c) hai hàng cốc đối nhau, 2 cốc của A không có cặp. |
| T2 · 4 | 5 | Múc 4 ca vào xô đỏ, 5 ca vào xô xanh | A | S | Múc ca 1 l đổ vào xô có vạch, mỗi ca lên một vạch. |

#### Bài 18. Luyện tập chung
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| Câu 2 | 1 | Cầu thăng bằng: thỏ + gà = 3 gà… | B | S | Nhấc 1 gà hai bên cùng lúc, cầu vẫn thăng bằng; nút "đổi" thay thỏ bằng 2 gà. |
| Câu 4 | 3 | Chọn túi gạo được 11 kg / 17 kg | B | T | Một đĩa có quả cân 11 kg; kéo túi lên đĩa kia, thăng bằng thì túi rung nhẹ. |

#### Bài 19. Phép cộng có nhớ số có hai chữ số với số có một chữ số
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | 34 + 7 | C | S | 3 bó + 4 que, thêm 7 que; đủ 10 que rời thì buộc bó mới. |
| T1 · 3 | 2 | Tô màu bao gạo nặng nhất/nhẹ nhất | B | S | Kéo 2 trong 3 bao lên cân, thử đủ các cặp. |
| T2 · 3 | 5 | 24 bút chì + 6 bút mực | C | S | 4 + 6 đủ 10 thì buộc bó, được 3 bó tròn. |
| T3 · 2 | 8 | Chiều bắt hơn sáng 6 kg | D | S | Hàng khay chiều dưới hàng sáng, gắn phần "hơn 6 kg" màu khác. |
| T3 · 5 | 11 | Mê cung nhím, cộng số trên đường | L | T | Kéo nhím dọc lối đi, ô số đi qua sáng lên, không cộng sẵn. |

#### Bài 20. Phép cộng có nhớ số có hai chữ số với số có hai chữ số
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | 35 + 17 | C | S | 12 que rời buộc được 1 bó, thừa 2 que. |
| T1 · 3 | 2 | Chuyển 1 que diêm để phép tính đúng | N | T | Nhấc một que đặt chỗ khác, chữ số đổi hình ngay; không chấm. |
| T1 · 4 | 3 | Bóng đèn sáng khi hai pin có tổng 60 | L | T | Chạm bóng đèn, hai dây sáng chạy về 2 cục pin. |
| T2 · 4 | 7 | 17 l + 23 l mật ong | A | S | Rót hai hũ vào thùng có vạch, dừng ở 40. |
| T2 · 5 | 8 | Sâu bò 36 cm + 15 cm | H | S | Sâu bò trên thước dài, dừng ở vạch 51. |
| T3 · 3 | 11 | So hai đường của dế mèn | H | S | Chạm con đường, các đoạn duỗi thành một que thẳng cạnh thước. |
| T4 · 3 | 15 | 26 + 37 + 17 và 26 + 17 + 37 | E | S | Hai ếch cùng từ 26, nhảy khác thứ tự, cùng đáp xuống 80. |

#### Bài 21. Luyện tập chung
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 2 | 1 | Ngỗng 5 kg nhẹ hơn dê 15 kg | B | S | Nhấc quả cân 15 kg khỏi bên ngỗng, cân nghiêng về dê. |
| T1 · 3 | 2 | Bò = lợn 23 kg + dê 8 kg | B | T | Nhấc dê xuống, cân nghiêng về bò; đặt lại thì thăng bằng. |
| T1 · 4 | 3 | Xe cứu hoả nào lấy nhiều nước hơn | A | S | Rót 2 bình vào bồn có vạch của mỗi xe, hai bồn đặt cạnh nhau. |
| T1 · 5 | 4 | Ếch nhảy qua lá sen 5, 10, … 50 | E | S | Chạm để ếch nhảy qua từng lá, đếm số lá. |
| T2 · 2 | 6 | Đường dài nhất/ngắn nhất của ốc sên | H | S | Ba đường duỗi thành ba que đặt cạnh nhau. |

#### Bài 22. Phép trừ có nhớ số có hai chữ số cho số có một chữ số
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | 54 − 8 | C | S | Chỉ có 4 que rời, chạm một bó để tháo thành 14 que, kéo 8 que đi. |
| T1 · 4 | 3 | 52 thuyền, 8 thuyền rời bến | C | S | Lấy hết 2 chiếc lẻ rồi phải "mở" một hàng 10. |
| T2 · 3 | 7 | Gà mái mơ qua ba phép tính bằng nhau | L | T | Gà dừng ở mỗi ngã rẽ chờ bé chọn nhánh. |
| T3 · 2 | 10 | 62 → + 8 → … → − 3 → … | E | S | Thỏ nhảy + 8 rồi − 3, ô trống rung khi đáp. |
| T3 · 5 | 13 | Chó 25 kg nặng hơn khỉ 7 kg | B | S | Nhấc quả 7 kg khỏi bên khỉ, cân lệch về chó. |
| T4 · 4 | 17 | 33 bông hoa, 9 bông đỏ, còn bông vàng | C | S | Tô đỏ 9 bông, còn lại chuyển vàng và dồn thành nhóm. |

#### Bài 23. Phép trừ có nhớ số có hai chữ số cho số có hai chữ số
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | 71 − 25 | C | S | Tháo 1 bó thành 11 que rời, bớt 5 que và 2 bó. |
| T1 · 3 | 3 | 30 chim, 14 con bay đi | C | S | 3 dây 10 con; dây thứ hai bay hết, dây thứ ba bay 4. |
| T2 · 2 | 6 | 40 ô tô, 16 xe rời bến | C | S | Như trên. |
| T2 · 5 | 8 | Khỉ chọn đường có kết quả nhỏ hơn | L | T | Khỉ dừng ở mỗi ngã rẽ chờ bé chọn. |
| T3 · 1 | 9 | 100 − 20, 100 − 60 | C | S | Tháo bó trăm thành 10 bó, kéo đi 2 bó. |
| T3 · 2 | 10 | Xe đạp chở ít hơn xe máy 55 kg | D | S | Cắt đoạn "ít hơn 55 kg" khỏi băng xe máy, phần còn lại là băng xe đạp. |
| T4 · 3 | 15 | 90 cửa sổ, 52 cửa đang mở | C | S | 9 tầng mỗi tầng 10 cửa; mở 5 tầng và 2 cửa. |
| T5 · 3 | 20 | Hộp quà nào không phải khối lập phương | J | T | Xoay từng hộp 3D, xem mặt vuông đều hay có mặt dài. |
| T5 · ? | 21 | Cam và quýt (phần, tổng) | C | S | Như Bài 22 T4 · 4. |

#### Bài 24. Luyện tập chung
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 2 | 1 | Chuỗi phép tính | E | S | Ếch nhảy theo chuỗi. |
| T1 · 3 | 2 | 52 bậc, rô-bốt đã leo 19 | E | S | Rô-bốt leo từng chục 29, 39, 49 rồi leo lẻ tới 52. |
| T1 · 5 | 4 | Ghép 2 trong 3 thẻ được số lớn hơn 40, bé hơn 50 | K | T | Kéo 2 thẻ vào ô chục/đơn vị, bé tự thử. |
| T2 · 2 | 6 | Chuồn chuồn theo sợi dây rối | L | T | Kéo ngón tay dọc dây, chỉ đoạn dưới ngón tay sáng. |

#### Bài 25. Điểm, đoạn thẳng, đường thẳng, ba điểm thẳng hàng
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 3 | 2, 3 | Đo MN, NP; AB, BC, CD, DE | H | ❓ | Kéo, xoay thước, vạch 0 hít vào đầu đoạn, bé tự đọc. **Xem câu hỏi ở mục 5.** |
| T2 · 2 | 5, 6 | Đ/S ba điểm thẳng hàng | J | T | Kéo, xoay một thước thẳng; điểm nằm đúng mép thì chấm lên. |

#### Bài 26. Đường gấp khúc. Hình tứ giác
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 2 | 1 | Đếm hình tứ giác trong lâu đài | J | T | Chạm mảnh hay nhiều mảnh liền nhau, viền hình ghép sáng; tứ giác bay vào khay, trùng thì rung. |
| T1 · 3 | 2, 5 | Độ dài đường gấp khúc MNPQ, BCDE | H | S | Kéo điểm cuối, các đoạn duỗi thẳng trên thước cm. |
| T1 · 4 | 3 | Nhà ghép từ mấy tam giác, tứ giác, hình tròn | J | T | Tháo từng mảnh, kéo vào 3 khay, khay không hiện số. |
| T2 · 4 | 6 | Ốc Bu, Bi bò trên lưới ô 1 cm | H | S | Ốc bò từng cạnh ô, mỗi cạnh để lại một que 1 cm. |

#### Bài 27. Thực hành gấp, cắt, ghép, xếp hình. Vẽ đoạn thẳng
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | 4 tam giác không xếp được hình nào | J | T | Kéo, xoay 4 mảnh vào khuôn mờ; hình D lấp hết vẫn còn trống. |
| T1 · 3 | 1 | Hai hình nào ghép được hình bên phải | J | T | Kéo 2 mảnh vào khuôn, mảnh thừa hay hụt thì hiện chỗ lệch. |
| T1 · 4 | 2 | Mỗi hình ghép từ mấy tam giác nhỏ | J | S | Lát kín hình bằng mảnh tam giác, mảnh nằm lại để đếm. |
| T2 · 3 | 3 | Vẽ hình vuông cạnh 4 cm | H | S | Vẽ cạnh trên lưới ô 1 cm, đặt thước đo lại. |
| T2 · ? | 4 | Đường đi của chú chó trên lưới | H | S | Như Bài 26 T2 · 4. |

#### Bài 28. Luyện tập chung
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| Câu 1e | 0 | Ba điểm thẳng hàng | J | T | Như Bài 25. |
| Câu 2 | 1 | Tên các đoạn thẳng khi M, N, P thẳng hàng | J | T | Chạm từ điểm này sang điểm kia, đoạn sáng và đổi màu "đã đếm"; không hiện tổng. |
| Câu ? | 2 | Đếm hình | J | T | Như Bài 26 T1 · 2. |
| Câu 5 | 3 | Ốc bò 13 cm + 27 cm | H | S | Ốc bò trên thước, dừng ở vạch 40. |

#### Bài 29. Ngày, giờ. Giờ, phút
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 3 | 1, 2, 4, 5 | 8:00 hay 20:00, 4:00 hay 16:00 | I | T | Kéo mặt trời/mặt trăng dọc dải ngày đêm, kim quay 2 vòng mỗi ngày, bảng số chạy theo. |
| T2 · 1 | 3 | Đọc giờ phút 4:15, 10:30 | I | S | Kéo kim dài từ số 12, qua mỗi số đếm "5, 10, 15 phút", kim ngắn nhích theo. |

#### Bài 30. Ngày, tháng
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 2 | 1, 2, 5 | Các thứ Năm, thứ Bảy, Chủ nhật trong tháng 12 | I | T | Chim nhảy "tuần sau" thẳng xuống 7 ngày, "ngày mai" sang ô bên. |
| T1 · 4 | 3, 6, 7 | Ngày mai của 25/12; sau 31/1 | I | S | Vuốt xé tờ lịch 31 tháng 1, tờ mới hiện "1, tháng Hai". |

#### Bài 31. Thực hành xem đồng hồ, xem lịch
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0, 1 | Đọc giờ | I | S/T | Như Bài 29. |
| T1 · 5 | 2 | Bạn nào về nhà trước 5 giờ chiều | I | T | Kéo ảnh các bạn lên dải giờ chiều, có vạch đỏ 17:00. |
| T2 · ? | 3, 4 | Lịch | I | T | Như Bài 30. |
| T2 · 4 | 5 | Bao nhiêu tháng có 30 ngày | I | T | Hai nắm tay; chạm đốt và khe, mỗi chỗ đọc tên một tháng. |

#### Bài 32. Luyện tập chung
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| Câu 1 | 0 | Kim dài chạy qua số 1, 2, 3 | I | S | Kéo kim dài qua các số, đếm 5, 10, 15 phút. |
| Câu ? | 2 | Bạn nào đến muộn sau 15 giờ | I | T | Như Bài 31 T1 · 5. |
| Câu ? | 3 | Đọc giờ phút | I | S | Như Bài 29. |

#### Bài 33. Ôn tập phép cộng, phép trừ trong phạm vi 20, 100
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | 6 + 7, 7 + 6, 13 − 7, 13 − 6 | C | S | 6 hạt đỏ, 7 hạt xanh; lật khung đổi chỗ, kéo nhóm đỏ đi còn nhóm xanh. |
| T1 · 2a | 1, 5, 11 | Nối hoa vào lọ, dưa vào sọt, ô tô vào bến | F | T | Kéo từng bông vào lọ thay cho đường nối, lọ đầy dần. |
| T2 · 3 | 7 | Chọn 2 túi gạo cân bằng 3 + 9 kg | B | S | Đĩa phải có 4 túi, nhấc 2 túi xuống tới khi thăng bằng. |
| T3 · 4 | 4, 8, 13 | 56 áo đỏ, 28 áo vàng, nhiều hơn bao nhiêu | D | S | Bấm "ghép đôi", bạn áo đỏ không có cặp đứng riêng. |
| T4 · 1b | 14 | 13 + 13 + 13 + 13 | C | S | Kéo 4 nhóm 13 que vào khay, 12 que rời buộc thêm 1 bó. |
| T4 · ? | 17 | 62 nụ sen, 35 nụ nở | C | S | Như Bài 22 T4 · 4. |

#### Bài 34. Ôn tập hình phẳng
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0, 1 | Đếm đoạn thẳng, đếm cạnh | J | T | Như Bài 28 Câu 2. |
| T1 · ? | 2 | Ba điểm thẳng hàng | J | T | Như Bài 25. |
| T2 · 2a | 3 | NP = MP 13 cm − MN 7 cm | H | S | Thước đặt lên MP; "che MN" thì đọc NP từ vạch 7 tới 13. |
| T2 · ? | 5 | Hình N gồm mấy hình A | J | S | Như Bài 27 T1 · 4. |
| T2 · ? | 6 | Đếm hình | J | T | Như Bài 26 T1 · 2. |

#### Bài 35. Ôn tập đo lường
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | Đ/S bí ngô, bưởi, cam trên hai cân | B | S | Kéo cam và bí ngô lên cân thứ ba. |
| T1 · 3a | 2 | Túi gạo = 2 + 5 kg; thỏ + 2 kg = 6 kg | B | S | Nhấc quả 2 kg khỏi cân đồng hồ, kim lùi về 4. |
| T1 · ? | 4, 8 | So cân nặng (hơn, kém) | B/D | S | Như Bài 22 T3 · 5. |
| T1 · 5 | 5 | Ba con dê nào không lên thuyền (tối đa 51 kg) | N | S | Kéo dê lên thuyền, thuyền chìm dần, quá vạch 51 kg thì nước tràn mạn. |
| T2 · 1 | 6 | Bình A, B, C rót sang các ca 1 l | A | S | Rót bình B vào lần lượt các ca 1 l. |
| T2 · 4 | 9 | 20 l rót đầy các can theo phương án nào | A | S | Chọn phương án rồi rót vào các can: đúng thì can cuối vừa đầy. |

#### Bài 36. Ôn tập chung
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1a | 0 | Số ở ô trống trên tia số | E | S | Thỏ nhảy từng vạch từ 53, tới ô trống thì dừng. |
| T1 · ? | 3 | So cân nặng | B | S | Như Bài 22 T3 · 5. |
| T1 · 5 | 4 | Đ/S đường kiến ABC so với MNPQ | H | S | Hai đường duỗi thành hai que song song trên thước. |
| T1 · ? | 5 | Độ dài đường gấp khúc ABCD | H | S | Như Bài 26. |
| T2 · 2 | 6 | a) dưa + 2 kg = 5 kg; b) can 10 l rót đầy ba ca 2 l | B, A | a) T, b) S | a) Nhấc quả 2 kg, cân nghiêng về quả 5 kg. b) Rót can 10 l có vạch vào ba ca 2 l, còn 4 l. |
| T2 · ? | 7 | Nhiều hơn bao nhiêu | D | S | Như Bài 33. |

### Tập Hai

#### Bài 37. Phép nhân
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | Xúc xắc 3 chấm: 3 + 3 + 3 + 3 = 3 × 4 | F | S | Chạm từng con xúc xắc, 3 chấm bay vào khay, đếm 3, 6, 9, 12, "3 được lấy … lần". |
| T1 · 2 | 1 | Nối hình nhóm với phép nhân | F | S | Chạm hình, từng nhóm sáng lần lượt; tách rõ "mỗi nhóm mấy" và "mấy nhóm". |
| T1 · 3 | 2 | 4 quạt, mỗi quạt 3 cánh | F | S | Chạm quạt thì quạt quay, 3 cánh sáng, đếm thêm 3. |
| T2 · 2 | 4 | Số chân từng nhóm con vật | F | S | Chạm từng con, chân nhấp nháy, đếm thêm. |
| T2 · 3 | 5 | 5 × 3, 3 × 5 bằng tổng | F | S | Xếp 3 hàng 5 khối, nút "Xoay" thành 5 hàng 3 khối, vẫn 15. |
| T2 · 4 | 6 | 3 con bọ rùa, mỗi con 6 chân | F | S | Kéo bọ rùa lên lá, đếm 6, 12, 18. |

#### Bài 38. Thừa số, tích
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 2a | 1 | 3 ca 2 l, 5 can 3 l… nối với phép nhân | A | S | Rót lần lượt từng ca vào xô có vạch, mực dâng 2, 4, 6. |
| T2 · 3 | 6 | Ô tô 3 hàng × 4 cột | F | S | "Theo hàng" khoanh 3 hàng, "Theo cột" khoanh 4 cột, cả hai ra 12. |
| T2 · 4 | 7 | So 2 × 5 với 5 × 2, 5 × 2 với 5 × 3 | F | T | Xoay mảng 2 × 5 trùng khít 5 × 2; thêm 1 nhóm vào thì nhiều hơn. |
| T2 · 5 | 8 | 5 xe đạp, mỗi xe 2 bánh | F | S | Chạm từng xe, đếm 2, 4, … 10. |

#### Bài 39. Bảng nhân 2
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T2 · 2 | 4 | Đếm thêm 2 (dãy chẵn, dãy lẻ) | E | S | Ếch nhảy mỗi bước 2 vạch; dãy B xuất phát từ 1. |
| T2 · 4 | 6 | Chân vịt, chân gà, tai thỏ | F | S | Chọn "chân vịt" rồi chạm từng con, đếm 2, 4… |

#### Bài 40. Bảng nhân 5
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 3 | 2 | 4 đèn ông sao, mỗi đèn 5 cánh | F | S | Chạm từng đèn, 5 cánh sáng, đếm thêm 5. |
| T2 · 2 | 4 | Đếm thêm 5 từ 5 đến 50 | E | S | Ếch nhảy bước 5. |
| T2 · 3 | 5 | Bông hoa có tích lớn nhất / bé nhất | F | T | Mỗi bông mở ra một mảng chấm, bốn mảng đứng cạnh nhau. |
| T2 · 4 | 6 | 4 đĩa, mỗi đĩa 5 quả cam | F | S | Kéo 5 quả vào từng đĩa, đếm 5, 10, 15, 20. |

#### Bài 41. Phép chia
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | Đèn ông sao: nhân, chia theo nhóm, chia đều | F | T | Kéo nhóm 5 cánh thành một đèn; chia lần lượt từng bông hoa cho 3 đèn. |
| T1 · 2 | 1 | 5 × 4 = 20 → 20 : 5, 20 : 4 | F | S | Mảng 20 chấm, khoanh theo hàng 5 được 4 nhóm, theo hàng 4 được 5 nhóm. |
| T2 · 3 | 5 | Băng giấy 6 cm chia 3 phần, 2 phần | H | S | Băng giấy trên thước, cắt thành 3 mảnh mỗi mảnh 2 vạch. |
| T2 · 4 | 6 | Rót 15 l nước mắm vào các can 5 l | A | S | Can 15 l có vạch rót sang can 5 l, đầy can nào thì can mới hiện ra. |

#### Bài 42. Số bị chia, số chia, thương
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 2a | 1, 2 | 15 bạn nhóm 5; 15 bánh chia đều 3 hộp | F | T / S | Thử cả hai cách chia rồi tự nối; chia xong thấy 3 nhóm, 3 hộp mỗi hộp 5. |
| T1 · 3 | 3 | 8 bạn chia thành cặp đấu cờ | F | S | Kéo từng 2 bạn vào một bàn cờ, được 4 bàn. |
| T2 · 4 | 7 | 15 bông hoa 3 × 5, lập hai phép chia | F | S | Khoanh theo hàng và theo cột. |

#### Bài 43. Bảng chia 2
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 3 | 2 | 12 cửa, mỗi chuồng bồ câu 2 cửa | F | S | Kéo từng 2 cửa lắp vào một chuồng, chim bồ câu hiện ra. |
| T2 · 4 | 6 | 12 chiếc tất ghép thành đôi | F | S | Kéo 2 chiếc lên dây phơi cùng một kẹp. |

#### Bài 44. Bảng chia 5
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 3 | 3 | Chia đều 20 bạn vào 5 nhóm | F | S | Chia từng bạn vào 5 vòng tròn, lượt 1, lượt 2… |
| T2 · 3 | 6 | Rót 30 l mật vào các can 5 l | A | S | Như Bài 41, được 6 can. |

#### Bài 45. Luyện tập chung
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | Đĩa quả nối với phép nhân | F | S | Chạm từng đĩa, đếm theo nhóm. |
| T1 · 3 | 2 | 6 hộp × 5 bánh | F | S | Đếm theo nhóm. |
| T2 · 3 | 8 | 25 cái bánh xếp hộp 5 cái | F | S | Kéo bánh vào hộp, đủ 5 thì đóng nắp. |
| T3 · 5 | 16 | 2 × 5 = 5 × ?, 5 × 2 = 2 × ? | F | S | Mảng 2 × 5 quay thành 5 × 2. |
| T4 · 4 | 20 | 8 đĩa × 5 bánh kem | F | S | Đếm theo nhóm. |
| T4 · 5 | 21 | 2 × ☐ < 10, 5 × ☐ > 30 | E | T | Vạch đỏ ở 10, ếch nhảy bước 2, lần thứ 5 chạm vạch. |
| T5 · 2 | 23 | 14 bông hoa cắm đều vào 2 bình | F | S | Cắm lần lượt vào bình trái, bình phải. |
| T5 · 5 | 26 | 10 < 5 × ☐ < 46 | E | T | Vùng 10–46 tô nhạt, ếch nhảy bước 5. |

#### Bài 46. Khối trụ, khối cầu
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1–2 | 0, 1 | Nhận ra khối trụ, khối cầu | J | T | Vuốt xoay khối 3D, "Lăn thử": cầu lăn mọi hướng, trụ chỉ lăn một hướng. |
| T1 · 3 | 2 | 5 chú hề, mỗi chú 7 khối cầu | F | S | Chạm chú hề, 7 quả cầu sáng, đếm 7, 14… |
| T2 · 3 | 6 | Ghép hai nửa thành khối cầu / trụ | J | T | Kéo nửa này áp vào nửa kia, khớp thì liền khối, lệch thì thấy khe hở. |
| T2 · 4 | 7 | Tháp hộp 1, 3, 6, 10… hình thứ năm | F | S | "Thêm hàng dưới", một hàng dài hơn 1 hộp trượt vào. |

#### Bài 47. Luyện tập chung
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 2 | 1 | Chọn đĩa đặt trên cùng chồng đĩa 2 cọc | J | T | Thả đĩa xuống 2 cọc: đĩa 1 lỗ bị kẹt bật ra, đĩa 2 lỗ trượt xuống. |
| T2 · 3 | 6 | Voi kéo khối gỗ: tổng 2 khối, cặp nhẹ nhất | B | S | Kéo khối lên xe trượt có cân đồng hồ, kim cộng dồn. |
| T2 · 4 | 7 | Tê tê đào hang theo giờ | I | S | Quay kim 4:00 → 4:15 → 4:30 → 5:00, hang sâu thêm. |

#### Bài 48. Đơn vị, chục, trăm, nghìn
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | Đếm ô vuông: đơn vị, chục, trăm | G | S | "Gom": 10 ô thành 1 thanh, 10 thanh thành 1 tấm. |
| T1 · 3 | 2 | Khối 53, 62, 35, 26 | G | S | Chạm từng thanh (10, 20…) rồi từng ô lẻ. |
| T2 · 1 | 3 | Khay 10 bánh: vẽ thêm cho đủ 30, 50 | G | S | Kéo khay mới vào, đếm 10, 20, 30. |
| T2 · 2 | 4 | Túi 100 xu: 500, 1 000 xu | G | S | Đếm túi 100, 200…; đủ 10 túi thành hòm "1 nghìn". |
| T2 · 3 | 5 | 54 gồm 5 chục 4 đơn vị | G | S | Tách thanh và ô ra 2 khay. |

#### Bài 49. Các số tròn trăm, tròn chục
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | Diều nối vạch tia số 0–1 000 | E | S | Ếch nhảy mỗi vạch 100, số hiện khi đáp. |
| T1 · 4 | 3 | 5 bao hạt dẻ, hôm qua 2 bao | G | S | Kéo 2 bao vào giỏ "hôm qua", 3 bao còn lại sang "hôm nay". |
| T2 · 1 | 4 | Đếm thêm 10, đếm bớt 10 | E | S | Ếch nhảy bước 10 tới, rồi lùi. |
| T2 · 2 | 5 | Ước lượng sách mỗi ngăn theo mẫu 10 quyển | H | S | Đặt "đoạn 10 quyển" trong suốt dọc từng ngăn. |
| T2 · 3 | 6 | Mai lấy bánh tròn trăm, Việt lấy tròn chục | F | T | Kéo bánh vào hai đĩa rồi ghép cặp để so. |

#### Bài 50. So sánh các số tròn trăm, tròn chục
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 2 | 1 | Tia số 670…760 bước 10 | E | S | Ếch nhảy bước 10. |
| T1 · 3 | 2 | 230 và 320 quả cà chua | G | T | Hai đội hiện thành tấm trăm và thanh chục đặt cạnh nhau. |
| T1 · 4 | 3 | Số 930 bằng que tính, chuyển 1 que | N | T | Kéo một que sang chỗ khác, chữ số đổi hình ngay. |
| T2 · 4 | 7 | 3 con bò trên bập bênh | B | T | Đặt bò lên hai đầu bập bênh, bên nặng chúc xuống. |

#### Bài 51. Số có ba chữ số
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 3 | 2 | 4 trăm 5 chục 3 đơn vị → 453 | G | S | Kéo tấm, thanh, ô vào 3 cột, số hiện dần. |
| T2 · 1 | 4 | Nối "738 gồm…" | G | S | Như trên. |
| T2 · 4 | 7 | Liền trước / liền sau của 599 | G | S | Thêm 1 ô: gộp thành thanh, gộp thành tấm, bảng nhảy lên 600. |
| T3 · 1 | 8 | Nhím đi theo chỉ dẫn tới rừng nấm | L | S | Kéo nhím, mỗi ngã rẽ chọn qua cây hay qua hoa. |
| T3 · 2 | 9 | 607, 670 (có chữ số 0) | G | S | Cột chục trống thì bảng hiện số 0. |
| T3 · 3 | 10 | Lập số từ thẻ 6, 2, 8 và 4, 0, 8 | K | T | Kéo 3 thẻ vào 3 ô, "Ghi lại"; thẻ 0 ở hàng trăm thì hiện mờ. |

#### Bài 52. Viết số thành tổng các trăm, chục, đơn vị
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 2 | 1 | 392 = 300 + 90 + 2 | K | S | Thẻ 392 là 3 thẻ chồng nhau, kéo tách ra, dấu "+" hiện giữa. |
| T1 · 3 | 2 | Cà rốt: 252 củ cần mấy bao, mấy giỏ | G | S | Thả cà rốt vào giỏ, đủ 10 thì giỏ đầy, đủ 10 giỏ thì thành bao. |
| T2 · 4 | 6 | Sóc: 3 bao, 8 giỏ, 2 hạt | G | S | Chạm bao 100, 200, 300, giỏ 310…380, hạt 381, 382. |

#### Bài 53. So sánh các số có ba chữ số
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | Đ/S 256 < 265, 899 > 901 | G | T | Hai số bằng khối, so từng hàng, hàng đang so sáng lên. |
| T1 · 4 | 3 | Lập số từ 5, 1, 8: bé nhất, lớn nhất | K | T | Như Bài 51. |
| T2 · 2 | 5 | Nối 4 điểm từ lớn đến bé thành chữ cái | L | T | Chạm các điểm, nét vẽ nối theo, hình hiện ngay. |
| T2 · 3 | 6 | Khỉ ăn 360, 365, 356, 350 quả | E | T | Kéo 4 chú khỉ lên tia 350–370. |

#### Bài 54. Luyện tập chung
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 2 | 1 | Liền trước 1 000; liền trước, liền sau 500 | G | S | Bớt 1 ô từ 1 000: hòm vỡ thành tấm, tấm vỡ thành thanh…, còn 999. |
| T2 · 3 | 7 | Thẻ nào đặt vào "?" để 567 < ?54 | K | T | Kéo từng thẻ vào ô "?", số hiện cạnh 567 trên tia số. |
| T2 · 5 | 9 | Mèo đi theo số bé hơn ở mỗi ngã rẽ | L | T | Mèo dừng ở ngã rẽ, bé chạm nhánh mình chọn. |

#### Bài 55. Đề-xi-mét. Mét. Ki-lô-mét
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | Đổi dm, cm, m | H | S | Thanh 1 dm trùng 10 vạch cm; 10 thanh dm nối tiếp thành 1 m. |
| T1 · 2 | 1 | Quyển vở, bàn, kẹp giấy: 2 cm, 2 dm, 2 m | H | T | Cảnh có bạn nhỏ vẽ đúng tỉ lệ, đặt thanh 2 cm, 2 dm, 2 m cạnh đồ vật. |
| T1 · 3 | 2 | 3 sải tay 1 m | H | S | Việt dang tay 3 lần dọc bảng, mỗi lần hiện thanh 1 m. |
| T1 · 4 | 3 | 4 gang tay, 30 cm, 5 dm: vật nào dài nhất | H | T | Đặt gang tay 1 dm nối tiếp lên các vật, xếp thẳng mép. |
| T2 · 2 | 5 | Tiếp sức 60 m + 40 m | H | S | Thước dây kéo dài theo người chạy, tới 60 rồi 100. |
| T2 · 3 | 6, 7 | Chiều cao 4 công trình; cao hơn 25 m | H | T | Công trình vẽ tỉ lệ trên thước m, kéo vạch ngang lên 25 m. |
| T3 · 3 | 12 | Đường Hà Nội tới 4 tỉnh | H | T | 4 con đường duỗi thẳng thành thanh tỉ lệ, ô tô chạy, đồng hồ km. |
| T3 · 4 | 13 | Thạch Sanh 20 km + 15 km + 3 km | H | S | Kéo Thạch Sanh qua rừng, núi, vách đá, đồng hồ km cộng dồn. |

#### Bài 56. Tiền Việt Nam
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| Câu 1 | 0 | Đếm tờ tiền trong mỗi tập | N | S | Chạm tập tiền, các tờ xoè ra như quạt. |
| Câu 2 | 1 | Trả 500 đồng mua hành | N | T | Kéo tờ tiền vào tay cô bán hàng: chưa đủ thì cô lắc đầu, đủ thì đưa hành. |
| Câu 3 | 2 | Đ/S số tờ từng loại của Mai và Mi | M | T | Kéo tờ tiền vào hàng theo mệnh giá như biểu đồ tranh. |

#### Bài 58. Luyện tập chung
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 2 | 1 | 3 đảo, cầu 12 km và 8 km | H | a) T, b) S | Kéo thuyền qua cầu, đồng hồ km chạy, đi hai cầu thì cộng dồn. |
| T1 · 3 | 2 | Thước 1 m bị gãy, đoạn nào là đoạn gãy | H | T | Áp đoạn A rồi B vào chỗ gãy, xem vạch có nối tiếp không. |
| T1 · 4 | 3, 4 | Con vật dài 32 m, 26 m, 16 m | H | a) T, b) S | Kéo 3 con lên cùng một thước m, xếp thẳng mép đầu. |
| T2 · 3 | 8 | Chim sẻ nhìn thấy nhau nếu cách ≤ 2 km | H | T | Chạm hai con chim, đường theo cạnh ô hiện ra với số km. |
| T2 · 4 | 9 | Thùng hàng 3, 5, 2 m và xe tải 57, 41, 25 dm | H | T | Kéo thùng lên xe vẽ tỉ lệ: dài quá thì thò ra. |
| T2 · 5 | 10 | Rào 3 cạnh miếng đất không giáp sông | H | a) T, b) S | Chạm từng cạnh để đếm, chạm cạnh cần rào, đồng hồ m cộng 30, 50, 80. |

#### Bài 59. Phép cộng (không nhớ) trong phạm vi 1 000
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | 364 + 215 | G | S | Hai cụm khối trên 3 cột, gộp từ cột đơn vị. |
| T1 · 3 | 2 | Tàu A hay tàu B chở nặng hơn | B | S | Thùng hàng hai tàu lên hai đĩa, cân nghiêng dù chỉ chênh 3 kg. |
| T2 · 5 | 8 | Trực thăng bay qua mọi điểm trắng | L | T (đường), S (km) | Chạm lần lượt các điểm, trực thăng bay; ngõ cụt thì nhắc; tổng km hiện sau khi đúng. |

#### Bài 60. Phép cộng (có nhớ) trong phạm vi 1 000
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | 367 + 125 | G | S | Cột đơn vị 12 khối, 10 khối nhảy thành 1 thanh bay sang cột chục kèm "nhớ 1". |
| T2 · 2 | 5 | 100 + 900, 700 + 300 | G | S | 10 tấm trăm xếp chồng thành khối "1 000". |
| T3 · 5 | 12 | Rô-bốt đi theo lệnh ↓ → ↑ từ ô 130 | L | S | Chạm thẻ mũi tên, rô-bốt đi từng ô, ô đi qua sáng lên. |

#### Bài 61. Phép trừ (không nhớ) trong phạm vi 1 000
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | 468 − 247 | G | S | Kéo bớt 7 ô, 4 thanh, 2 tấm vào giỏ. |
| T1 · 3 | 2 | 700 − 500 | G | S | 7 tấm trăm, bớt 5 tấm. |
| T3 · 5 | 13 | 708 bằng que tính, chuyển 1 que | N | T | Mỗi lần chuyển được 1 que, số mới đọc to lên. |

#### Bài 62. Phép trừ (có nhớ) trong phạm vi 1 000
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | 533 − 204 | G | S | Cột đơn vị không bớt được, chạm 1 thanh vỡ thành 10 ô rơi xuống kèm "mượn 1". |
| T3 · 1 | 9 | 1 000 − 100 | G | S | Khối 1 000 tách thành 10 tấm, bớt 1 tấm. |

#### Bài 63. Luyện tập chung
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 2 | 1 | Tổng/hiệu số trên khối lập phương, trụ, cầu, hộp | J | T | Chạm từng hình, khối 3D hiện lên xoay và nghe tên khối. |
| T1 · 4 | 3 | Vẽ tiếp hình theo mẫu trên lưới | J | T | Kéo từ chấm sang chấm vẽ tiếp mẫu, nét qua ô có số thì số sáng. |

#### Bài 64. Thu thập, phân loại, kiểm đếm số liệu
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| Câu 1 | 0 | Đếm sách từng loại | M | T | Chọn loại sách, chạm từng cuốn thì đánh ✓ và thêm vạch kiểm đếm. |
| Câu 2a | 1 | Mỗi việc nhà làm mấy ngày (ô gộp) | M | T | Chạm ô gộp thì cả ô sáng, chỉ được 1 vạch. |
| Câu 3 | 3 | Đếm đèn lồng khối hộp, trụ, cầu | M | T | Kéo đèn vào 3 giỏ, xếp nhầm thì bật ra; giỏ chồng thành cột. |

#### Bài 65. Biểu đồ tranh
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T2 · 2 | 5 | Vẽ thêm chấm cho đủ 8 thỏ, 6 sóc, 5 rùa | M | T | Chạm ô trống thì chấm hiện ra, chạm lại thì mất. |
| T2 · 3 | 6 | Túi cà chua 10 quả và quả lẻ | M | T | Chạm túi, túi mở ra 10 quả rồi đóng lại. |

#### Bài 66. Chắc chắn, có thể, không thể
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| Câu 1 | 0 | Mai, Việt, Nam lấy bút trong hộp | M | T | Bốc bút từ 3 hộp bao nhiêu lần cũng được; hộp Việt lần nào cũng ra bút chì. |
| Câu 2 | 1 | Hộp 4 bóng xanh | M | T | Bốc mãi vẫn ra bóng xanh. |
| Câu 3 | 2 | 2 bánh tròn, 3 bánh vuông, chia mỗi bạn 2 chiếc | M | T | Chia nhiều cách, đĩa luôn còn 1 chiếc, lúc tròn lúc vuông. |

#### Bài 67. Thực hành thu thập, phân loại, kiểm đếm
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| Câu 1 | 0 | Đếm đồ chơi trên kệ | M | T | Như Bài 64 Câu 1. |

#### Bài 68. Ôn tập các số trong phạm vi 1 000
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 3 | 2 | So sánh 542 và 539 | G | T | Hai số bằng khối, so từng cột từ trăm, cột khác nhau đầu tiên nhấp nháy. |
| T2 · 2 | 7 | 374 = 300 + 70 + 4 | G | S | Kéo khối vào khay cho đủ 374, mỗi cột hiện "3 tấm = 300". |
| T2 · 4 | 9 | 300 + … = 350 | G | S | Có sẵn 3 tấm, thêm thanh chục tới khi khớp mẫu 350. |
| T2 · 5 | 10 | Lập số từ thẻ 2, 3, 4 | K | S | Như Bài 1, đủ 6 số. |

#### Bài 69. Ôn tập phép cộng, phép trừ trong phạm vi 100
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 2 | 1 | 48 + 6, 62 − 8, 80 − 59 | C | S | Bó chục và que lẻ (đổi, mượn), chỉ làm mẫu 1 phép có nhớ và 1 phép có mượn. |
| T3 · 4 | 14 | Mai 25 kg, Mi 16 kg, hơn bao nhiêu | B | S | Mai và Mi trên hai đĩa, thêm quả 1 kg phía Mi tới khi thăng bằng. |

#### Bài 70. Ôn tập phép cộng, phép trừ trong phạm vi 1 000
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | 700 + 300, 1 000 − 600 | G | S | Gộp thành khối 1 000 hoặc tách khối 1 000 rồi bớt. |
| T1 · 4 | 3 | Bản đồ: Cao Bằng hay Vinh gần Hà Nội hơn | H | T (đường), S (tổng) | Chạm hai thành phố, xe đi theo tuyến, nhãn km phóng to. |
| T1 · 5 | 4 | Tháp gạch, mỗi viên bằng tổng hai viên dưới | N | S | Chạm hai viên cạnh nhau, hai số bay lên nhập vào viên trên. |
| T3 · 3 | 12 | Nam 121 cm, Việt 117 cm | H | S | Hai bạn đứng cạnh thước tường, khoảng chênh tô màu, đếm từng cm. |

#### Bài 71. Ôn tập phép nhân, phép chia
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | Mỗi nhóm con vật có bao nhiêu chân | F | S | Chạm từng con, chân sáng, đếm 8, 16, 24. |
| T1 · 2 | 1 | 4 × 5 = 4 + 4 + 4 + 4 + 4 | F | S | "+ 1 đĩa" thì một đĩa 4 quả bay vào, dòng tổng dài thêm "+ 4". |
| T1 · 3 | 2 | 5 × 7 = 35 → 35 : 5, 35 : 7 | F | S | Mảng 5 × 7, cắt theo hàng rồi xoay 90° cắt theo cột. |
| T1 · 4 | 3 | 12 kg đường chia đều 2 túi | F/B | S | Thả 12 gói 1 kg vào 2 túi trên hai đĩa cân, thăng bằng khi bằng nhau. |
| T1 · 5 | 4 | 6 lọ, mỗi lọ 5 hồng và 2 cúc | F | S | Cắm hoa vào 6 lọ, hai bộ đếm nhảy theo. |
| T2 · 4 | 8 | 3 chuyến × 5 ô tô | F | S | Chạm từng chuyến, đếm thêm 5. |
| T2 · 5 | 9 | 5 thanh tre 1 ngôi sao, 4 ngôi sao | F | S | Kéo thanh tre vào khung, đủ 5 thì sao sáng, đếm 5, 10, 15, 20. |
| T3 · 4 | 13 | 10 xe máy × 2 bánh | F | S | Chạm từng xe, đếm thêm 2. |
| T3 · 5 | 14 | Gà và thỏ có 10 chân, gà nhiều hơn thỏ | F | T | Kéo gà và thỏ vào chuồng, bộ đếm chân chạy; đủ 10 chân thì chuồng sáng. |

#### Bài 72. Ôn tập hình học
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | Đếm đoạn thẳng, tam giác, tứ giác | J | T | Kéo điểm sang điểm, đoạn tô màu và tên vào danh sách, trùng thì rung. |
| T1 · 2 | 1 | Hình nào không là khối trụ / cầu | J | T | Chạm hình, khối 3D hiện lên xoay. |
| T1 · 3 | 2 | Tìm ba điểm thẳng hàng | J | T | Kéo, xoay thước trong suốt, qua đúng 3 điểm thì 3 điểm sáng. |
| T2 · 1 | 3 | Đo các đoạn thẳng, dài nhất / ngắn nhất | H | ❓ | Kéo thước lên từng đoạn, bé tự đọc. **Xem mục 5.** |
| T2 · 3 | 4 | Đường gấp khúc ABC, BCD, ABCD | H | S | Kéo đầu D, đường duỗi thẳng trên thước. |
| T2 · 4 | 5 | Đường của kiến xám, kiến đen trên lưới 1 cm | H | S | Kiến bò, mỗi cạnh ô có một chấm đếm. |
| T2 · 5 | 6 | Cầu ABCD 130 m, AB + CD = 80 m, tìm BC | H | T | Duỗi cầu thành đoạn 130 m, AB và CD cùng màu "80 m", BC để "?". |

#### Bài 73. Ôn tập đo lường
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 2 | 1 | Mèo = 2 kg + 5 kg; 2 kg + dưa = 5 kg | B | T | Nhấc quả cân và đồ vật ra rồi đặt lại, không hiện số kg. |
| T1 · 4 | 3 | Can A 10 l, B 2 l, C 3 l, D 5 l: được 7 l, 10 l | A | S | Rót B rồi D vào can trống có vạch, dừng ở 7; rót B, C, D vào can giống A thì vừa đầy. |
| T2 · 1 | 4 | Bút sáp 10 …, cột cờ 10 …, gang tay 2 … | H | T | Kéo thanh 1 cm, 1 dm, 1 m lên hình tỉ lệ, lặp 10 lần xem có vừa. |
| T2 · 3a | 6 | Đồng hồ kim ứng với 18:15, 22:00 | I | S | Vặn kim giờ qua số 12, trời chuyển tối, bảng số nhảy 13, 14… |
| T2 · 3b | 7 | Thứ Năm 14/5, thứ Năm tuần trước | I | S | Chạm lùi từng ô trên lịch tháng 5, đếm 1… 7. |
| T2 · 4 | 8 | Rùa, thỏ, sóc đến lớp so với 7 giờ 15 | I | T | Kéo con vật lên trục thời gian quanh mốc chuông 7:15. |

#### Bài 74. Ôn tập kiểm đếm số liệu và lựa chọn khả năng
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| Câu 1a,b | 0 | Ước lượng mấy chục hình rồi đếm | M | T | Vẽ vòng khoanh 10 hình thành "1 chục", rồi chạm đánh dấu từng hình. |
| Câu 2 | 2 | Vẽ thêm cho đủ 10 tròn, 9 vuông, 10 tam giác | M | T | Chạm ô trống thêm hình, chạm lại thì mất. |
| Câu 3 | 3 | 3 con thỏ vào hai chuồng, chuồng nào cũng có thỏ | M | T | Kéo thỏ vào chuồng, chuồng trống thì lắc; các cách đã thử lưu thành hình nhỏ. |

#### Bài 75. Ôn tập chung
| Tiết · Câu | idx | Câu hỏi | Eng | Mở | Kịch bản |
|---|---|---|---|---|---|
| T1 · 1 | 0 | Số gồm 3 trăm 6 chục 7 đơn vị | G | S | Xếp khối vào khay, cột chục trống thì hiện chữ số 0. |
| T2 · 3a | 7 | Đếm tam giác, tứ giác (cả hình ghép) | J | T | Chạm các mảnh nhỏ để ghép, hình ghép viền sáng và lưu lại. |
| T2 · 4 | 9 | Đường gấp khúc ABCD 48, 39, 53 m | H | S | Duỗi thẳng thành một đoạn. |

---

## 4. Thứ tự làm đề xuất

1. **Đợt 1, dùng engine có sẵn (nhanh):** A 🫗 Thử rót cho ~14 câu còn lại (Bài 16, 17, 20, 21, 35, 36, 38, 41, 44, 73), thêm kiểu "hàng nhiều cốc" và "thùng nhận nhiều nguồn".
2. **Đợt 2:** B ⚖️ Thử cân: vẽ lại SVG Lớp 2 có móc `bal_item`, thêm chế độ thả đồ vào đĩa và hộp quả cân (~25 câu).
3. **Đợt 3:** C 🥢 Que tính và khung 10 (~55 câu, phủ gần hết Tập 1 phần số học).
4. **Đợt 4:** D 👫 Ghép cặp và E 🐸 Ếch tia số (~50 câu).
5. **Đợt 5 (Tập 2):** F 🍎 Nhóm bằng nhau và G 🧱 Khối trăm chục đơn vị (~74 câu).
6. **Đợt 6:** H 📏 Thước và đường gấp khúc, I 🕰️ Đồng hồ và lịch.
7. **Đợt 7:** J 🔷 Hình học, K 🔢 Thẻ số, L 🧭 Dò đường, M 📊 Kiểm đếm, N lẻ.

Mỗi đợt: làm engine, áp vào vài câu mẫu cho anh duyệt, rồi mới áp cho cả nhóm.

---

## 5. Đã chốt (2026-09-29)

1. **Câu "Đo"** (Bài 25 T1 · 3, Bài 72 T2 · 1): ngoại lệ, thước mở TRƯỚC (thước là dụng cụ đề bài yêu cầu, bé tự đặt và tự đọc).
2. **Câu nhiều phép tính giống nhau:** mỗi phép một thẻ thử (cảnh sinh từ số).
3. **Dò đường, mê cung:** có làm thành thao tác trên màn hình, ở đợt cuối.
