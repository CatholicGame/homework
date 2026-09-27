# Danh sách học sinh ảo (200 bạn)

Dữ liệu giả để demo / chụp màn hình (bảng xếp hạng, trang quản trị). Không phải người thật.
Biệt danh trộn lẫn tên gọi thường và nick kiểu học sinh tiểu học hay đặt (tên ở nhà, con vật, đồ ăn, kèm năm sinh / lớp).

Các cột khớp với hồ sơ và bảng xếp hạng trong app (`src/engine/profile.js`, `src/engine/leaderboard.js`):

- **Biệt danh**: `nickname` (tối đa 20 ký tự)
- **Giới tính**: `gender` — `boy` / `girl`
- **Avatar**: `avatar` — `boys/boy1…10`, `girls/girl1…15`
- **Lớp**: `grade` — `-1` = Tiền tiểu học, `1`–`5`
- **Tổng sao / Tháng / Tuần / Hôm nay**: `gradeStars[g]`, `monthStars`, `weekStars`, `dayStars`
- **Chuỗi ngày**: số ngày học liên tiếp

| # | Biệt danh | Giới tính | Avatar | Lớp | grade | Tổng sao | Tháng | Tuần | Hôm nay | Chuỗi ngày |
|---:|---|---|---|---|---:|---:|---:|---:|---:|---:|
| 1 | Cherry Tóc Mây | Nữ | `girls/girl7` | Tiền tiểu học | -1 | 2345 | 457 | 83 | 2 | 14 |
| 2 | Khánh Hưng | Nam | `boys/boy9` | Tiền tiểu học | -1 | 2297 | 406 | 113 | 0 | 0 |
| 3 | Bông Tóc Mây | Nữ | `girls/girl2` | Tiền tiểu học | -1 | 2207 | 361 | 128 | 38 | 24 |
| 4 | Sóc Nâu | Nữ | `girls/girl15` | Tiền tiểu học | -1 | 2090 | 365 | 145 | 9 | 12 |
| 5 | Hoài Anh | Nữ | `girls/girl1` | Tiền tiểu học | -1 | 1983 | 474 | 133 | 15 | 16 |
| 6 | Nhật Thịnh | Nam | `boys/boy5` | Tiền tiểu học | -1 | 1870 | 423 | 58 | 33 | 16 |
| 7 | Mimi | Nữ | `girls/girl4` | Tiền tiểu học | -1 | 1706 | 377 | 114 | 0 | 0 |
| 8 | Chíp Chíp | Nữ | `girls/girl6` | Tiền tiểu học | -1 | 1682 | 291 | 60 | 8 | 15 |
| 9 | Hoàng Tín | Nam | `boys/boy3` | Tiền tiểu học | -1 | 1545 | 263 | 80 | 21 | 17 |
| 10 | Nấm Lùn | Nữ | `girls/girl11` | Tiền tiểu học | -1 | 1370 | 334 | 81 | 0 | 0 |
| 11 | Nhật Lộc | Nam | `boys/boy8` | Tiền tiểu học | -1 | 1319 | 290 | 71 | 1 | 6 |
| 12 | Na Na | Nữ | `girls/girl4` | Tiền tiểu học | -1 | 1301 | 277 | 82 | 21 | 6 |
| 13 | Hải Tín | Nam | `boys/boy10` | Tiền tiểu học | -1 | 1252 | 225 | 74 | 0 | 0 |
| 14 | Tường Giang | Nữ | `girls/girl10` | Tiền tiểu học | -1 | 1125 | 204 | 66 | 19 | 12 |
| 15 | Nhật Nhân | Nam | `boys/boy4` | Tiền tiểu học | -1 | 985 | 205 | 42 | 0 | 0 |
| 16 | Phúc Nhân | Nam | `boys/boy8` | Tiền tiểu học | -1 | 420 | 70 | 23 | 0 | 0 |
| 17 | Bé 5B | Nữ | `girls/girl15` | Tiền tiểu học | -1 | 296 | 53 | 19 | 3 | 1 |
| 18 | Thảo Giang | Nữ | `girls/girl8` | Tiền tiểu học | -1 | 252 | 58 | 11 | 0 | 0 |
| 19 | Bông 2017 | Nữ | `girls/girl12` | Tiền tiểu học | -1 | 199 | 35 | 12 | 1 | 1 |
| 20 | Ngọc Chi | Nữ | `girls/girl11` | Tiền tiểu học | -1 | 176 | 42 | 7 | 0 | 0 |
| 21 | Gia Thành | Nam | `boys/boy10` | Tiền tiểu học | -1 | 173 | 31 | 7 | 1 | 0 |
| 22 | Tuấn Quang | Nam | `boys/boy7` | Tiền tiểu học | -1 | 118 | 29 | 2 | 0 | 0 |
| 23 | Hoàng Tài | Nam | `boys/boy2` | Tiền tiểu học | -1 | 105 | 25 | 5 | 0 | 0 |
| 24 | Phúc Kiên | Nam | `boys/boy8` | Tiền tiểu học | -1 | 101 | 21 | 4 | 0 | 0 |
| 25 | Dâu | Nữ | `girls/girl6` | Tiền tiểu học | -1 | 72 | 15 | 2 | 0 | 0 |
| 26 | Cún Con | Nữ | `girls/girl4` | Lớp 1 | 1 | 2301 | 383 | 126 | 41 | 25 |
| 27 | Việt Đạt | Nam | `boys/boy7` | Lớp 1 | 1 | 2242 | 415 | 82 | 28 | 10 |
| 28 | Tí | Nam | `boys/boy5` | Lớp 1 | 1 | 2190 | 362 | 85 | 0 | 0 |
| 29 | Phương Châu | Nữ | `girls/girl14` | Lớp 1 | 1 | 2067 | 336 | 93 | 0 | 0 |
| 30 | Diệu Hương | Nữ | `girls/girl11` | Lớp 1 | 1 | 1875 | 301 | 118 | 17 | 11 |
| 31 | Mây | Nữ | `girls/girl3` | Lớp 1 | 1 | 1770 | 380 | 54 | 0 | 0 |
| 32 | Thảo Thư | Nữ | `girls/girl7` | Lớp 1 | 1 | 1643 | 340 | 65 | 7 | 8 |
| 33 | Mít Sún Răng | Nam | `boys/boy1` | Lớp 1 | 1 | 1569 | 357 | 107 | 22 | 15 |
| 34 | Phương Thư | Nữ | `girls/girl2` | Lớp 1 | 1 | 1377 | 280 | 90 | 3 | 15 |
| 35 | Cam 2016 | Nữ | `girls/girl3` | Lớp 1 | 1 | 1376 | 353 | 75 | 23 | 10 |
| 36 | Bo | Nam | `boys/boy3` | Lớp 1 | 1 | 1359 | 331 | 64 | 5 | 6 |
| 37 | Cam | Nữ | `girls/girl6` | Lớp 1 | 1 | 1280 | 267 | 51 | 15 | 14 |
| 38 | Đô Đô | Nam | `boys/boy6` | Lớp 1 | 1 | 1276 | 288 | 87 | 4 | 11 |
| 39 | Gia Vinh | Nam | `boys/boy1` | Lớp 1 | 1 | 1190 | 279 | 89 | 4 | 13 |
| 40 | Bảo Tài | Nam | `boys/boy7` | Lớp 1 | 1 | 1148 | 219 | 48 | 20 | 9 |
| 41 | Mận | Nữ | `girls/girl7` | Lớp 1 | 1 | 1015 | 202 | 31 | 11 | 5 |
| 42 | Quỳnh Chi | Nữ | `girls/girl5` | Lớp 1 | 1 | 1005 | 200 | 61 | 8 | 9 |
| 43 | Lu Xinh | Nữ | `girls/girl13` | Lớp 1 | 1 | 916 | 162 | 37 | 0 | 0 |
| 44 | Tũn Chăm Ngoan | Nam | `boys/boy6` | Lớp 1 | 1 | 771 | 149 | 44 | 1 | 7 |
| 45 | Khoai 2017 | Nam | `boys/boy5` | Lớp 1 | 1 | 683 | 147 | 32 | 11 | 7 |
| 46 | Khoai Chăm Ngoan | Nam | `boys/boy6` | Lớp 1 | 1 | 630 | 104 | 22 | 1 | 6 |
| 47 | Kem Cute | Nữ | `girls/girl10` | Lớp 1 | 1 | 539 | 114 | 37 | 6 | 2 |
| 48 | Tép | Nam | `boys/boy6` | Lớp 1 | 1 | 491 | 105 | 25 | 0 | 0 |
| 49 | Xoài Điệu | Nữ | `girls/girl14` | Lớp 1 | 1 | 475 | 103 | 26 | 6 | 2 |
| 50 | Tuấn Hiếu | Nam | `boys/boy9` | Lớp 1 | 1 | 411 | 100 | 19 | 6 | 1 |
| 51 | Mỡ | Nữ | `girls/girl15` | Lớp 1 | 1 | 320 | 82 | 20 | 0 | 0 |
| 52 | Mít 2019 | Nam | `boys/boy8` | Lớp 1 | 1 | 309 | 74 | 9 | 0 | 0 |
| 53 | Bông 2A | Nữ | `girls/girl1` | Lớp 1 | 1 | 291 | 68 | 12 | 0 | 0 |
| 54 | Bin Bin | Nam | `boys/boy4` | Lớp 1 | 1 | 267 | 46 | 8 | 2 | 2 |
| 55 | Sữa Xinh | Nữ | `girls/girl2` | Lớp 1 | 1 | 180 | 36 | 7 | 1 | 1 |
| 56 | Miu 2B | Nữ | `girls/girl11` | Lớp 1 | 1 | 166 | 35 | 10 | 0 | 0 |
| 57 | Bi Mập | Nam | `boys/boy9` | Lớp 1 | 1 | 165 | 34 | 5 | 2 | 0 |
| 58 | Phi Hành Gia | Nam | `boys/boy10` | Lớp 1 | 1 | 113 | 21 | 4 | 0 | 0 |
| 59 | Anh Duy | Nam | `boys/boy1` | Lớp 1 | 1 | 105 | 22 | 5 | 0 | 0 |
| 60 | Đức Huy | Nam | `boys/boy6` | Lớp 1 | 1 | 52 | 13 | 0 | 0 | 0 |
| 61 | Vua Toán | Nam | `boys/boy10` | Lớp 2 | 2 | 2335 | 374 | 82 | 2 | 27 |
| 62 | Thỏ Cute | Nữ | `girls/girl3` | Lớp 2 | 2 | 2252 | 469 | 140 | 13 | 15 |
| 63 | Thảo Linh | Nữ | `girls/girl12` | Lớp 2 | 2 | 2127 | 456 | 134 | 35 | 18 |
| 64 | Bờm | Nam | `boys/boy7` | Lớp 2 | 2 | 2113 | 447 | 79 | 0 | 0 |
| 65 | Ben Nhí | Nam | `boys/boy5` | Lớp 2 | 2 | 2056 | 428 | 94 | 0 | 0 |
| 66 | Việt Phong | Nam | `boys/boy10` | Lớp 2 | 2 | 1886 | 418 | 87 | 4 | 18 |
| 67 | Xoài | Nữ | `girls/girl6` | Lớp 2 | 2 | 1862 | 435 | 127 | 0 | 0 |
| 68 | Thỏ 2E | Nữ | `girls/girl15` | Lớp 2 | 2 | 1826 | 423 | 126 | 19 | 9 |
| 69 | Rô Béo | Nam | `boys/boy4` | Lớp 2 | 2 | 1700 | 363 | 83 | 26 | 20 |
| 70 | Khánh Giang | Nữ | `girls/girl4` | Lớp 2 | 2 | 1654 | 407 | 129 | 0 | 0 |
| 71 | Dâu Hay Cười | Nữ | `girls/girl2` | Lớp 2 | 2 | 1651 | 362 | 122 | 1 | 13 |
| 72 | Gia Hương | Nữ | `girls/girl6` | Lớp 2 | 2 | 1635 | 424 | 94 | 0 | 0 |
| 73 | Gấu Mập | Nam | `boys/boy8` | Lớp 2 | 2 | 1600 | 381 | 108 | 23 | 7 |
| 74 | Quỳnh Thư | Nữ | `girls/girl15` | Lớp 2 | 2 | 1452 | 265 | 53 | 22 | 6 |
| 75 | Khánh Anh | Nữ | `girls/girl4` | Lớp 2 | 2 | 1386 | 352 | 56 | 14 | 15 |
| 76 | Bánh Bao | Nam | `boys/boy2` | Lớp 2 | 2 | 1337 | 211 | 44 | 6 | 9 |
| 77 | Kem Mít Ướt | Nữ | `girls/girl4` | Lớp 2 | 2 | 1220 | 278 | 64 | 0 | 0 |
| 78 | Bột 2018 | Nam | `boys/boy7` | Lớp 2 | 2 | 1143 | 186 | 78 | 0 | 0 |
| 79 | Diệu Tâm | Nữ | `girls/girl15` | Lớp 2 | 2 | 1072 | 206 | 82 | 0 | 0 |
| 80 | Quỳnh Trâm | Nữ | `girls/girl4` | Lớp 2 | 2 | 919 | 209 | 67 | 11 | 9 |
| 81 | Hoàng Vũ | Nam | `boys/boy4` | Lớp 2 | 2 | 911 | 186 | 28 | 0 | 0 |
| 82 | Ngọc Uyên | Nữ | `girls/girl15` | Lớp 2 | 2 | 763 | 157 | 40 | 4 | 3 |
| 83 | Quỳnh Hương | Nữ | `girls/girl9` | Lớp 2 | 2 | 756 | 179 | 47 | 9 | 3 |
| 84 | Ken Siêu Quậy | Nam | `boys/boy10` | Lớp 2 | 2 | 676 | 167 | 46 | 3 | 3 |
| 85 | Chim Sẻ | Nữ | `girls/girl2` | Lớp 2 | 2 | 648 | 158 | 37 | 3 | 3 |
| 86 | Hoài Thư | Nữ | `girls/girl1` | Lớp 2 | 2 | 634 | 160 | 45 | 2 | 4 |
| 87 | Hải Thành | Nam | `boys/boy9` | Lớp 2 | 2 | 595 | 120 | 33 | 4 | 4 |
| 88 | Hà Yến | Nữ | `girls/girl13` | Lớp 2 | 2 | 583 | 132 | 36 | 1 | 4 |
| 89 | Thần Đồng Nhí | Nam | `boys/boy8` | Lớp 2 | 2 | 554 | 136 | 30 | 0 | 0 |
| 90 | Gạo Chăm Ngoan | Nam | `boys/boy2` | Lớp 2 | 2 | 518 | 89 | 23 | 7 | 2 |
| 91 | Quỳnh Hân | Nữ | `girls/girl1` | Lớp 2 | 2 | 518 | 85 | 31 | 8 | 3 |
| 92 | Tin Tin | Nam | `boys/boy8` | Lớp 2 | 2 | 510 | 86 | 16 | 0 | 0 |
| 93 | Thu Thư | Nữ | `girls/girl10` | Lớp 2 | 2 | 448 | 97 | 32 | 6 | 2 |
| 94 | Tú Diệp | Nữ | `girls/girl15` | Lớp 2 | 2 | 414 | 84 | 19 | 3 | 3 |
| 95 | Miu Miu | Nữ | `girls/girl12` | Lớp 2 | 2 | 408 | 88 | 20 | 3 | 2 |
| 96 | Sún 2018 | Nam | `boys/boy8` | Lớp 2 | 2 | 381 | 77 | 23 | 0 | 0 |
| 97 | Nhím | Nữ | `girls/girl11` | Lớp 2 | 2 | 370 | 71 | 20 | 4 | 2 |
| 98 | Heo Hồng | Nữ | `girls/girl2` | Lớp 2 | 2 | 350 | 62 | 11 | 4 | 2 |
| 99 | Mõm | Nam | `boys/boy8` | Lớp 2 | 2 | 307 | 77 | 13 | 0 | 0 |
| 100 | Cốm Ngầu | Nam | `boys/boy6` | Lớp 2 | 2 | 306 | 73 | 13 | 2 | 2 |
| 101 | Nhật Bách | Nam | `boys/boy9` | Lớp 2 | 2 | 303 | 69 | 19 | 0 | 0 |
| 102 | Phương Uyên | Nữ | `girls/girl13` | Lớp 2 | 2 | 285 | 47 | 19 | 2 | 1 |
| 103 | Nàng Tiên Cá | Nữ | `girls/girl11` | Lớp 2 | 2 | 251 | 54 | 12 | 1 | 2 |
| 104 | Mận Líu Lo | Nữ | `girls/girl15` | Lớp 2 | 2 | 228 | 38 | 10 | 0 | 0 |
| 105 | Tú Châu | Nữ | `girls/girl11` | Lớp 2 | 2 | 215 | 52 | 10 | 0 | 0 |
| 106 | Hoài Vy | Nữ | `girls/girl3` | Lớp 2 | 2 | 194 | 46 | 12 | 1 | 1 |
| 107 | Xoài Hay Cười | Nữ | `girls/girl2` | Lớp 2 | 2 | 187 | 44 | 8 | 2 | 1 |
| 108 | Bơ Cute | Nữ | `girls/girl8` | Lớp 2 | 2 | 186 | 44 | 7 | 2 | 0 |
| 109 | Rồng Lửa | Nam | `boys/boy4` | Lớp 2 | 2 | 178 | 39 | 7 | 0 | 0 |
| 110 | Bảo Như | Nữ | `girls/girl8` | Lớp 2 | 2 | 148 | 28 | 6 | 0 | 0 |
| 111 | Hoài Yến | Nữ | `girls/girl10` | Lớp 2 | 2 | 138 | 30 | 7 | 0 | 0 |
| 112 | Thu Hân | Nữ | `girls/girl1` | Lớp 2 | 2 | 129 | 25 | 5 | 0 | 0 |
| 113 | Khoai Còi | Nam | `boys/boy3` | Lớp 2 | 2 | 128 | 26 | 2 | 1 | 1 |
| 114 | Mai Giang | Nữ | `girls/girl5` | Lớp 2 | 2 | 97 | 19 | 2 | 0 | 0 |
| 115 | Tuấn Vinh | Nam | `boys/boy5` | Lớp 2 | 2 | 68 | 14 | 1 | 0 | 0 |
| 116 | Ngọc Vân | Nữ | `girls/girl15` | Lớp 2 | 2 | 64 | 13 | 1 | 0 | 0 |
| 117 | Mai Chi | Nữ | `girls/girl3` | Lớp 2 | 2 | 46 | 10 | 0 | 0 | 0 |
| 118 | Công Chúa Nhỏ | Nữ | `girls/girl8` | Lớp 2 | 2 | 44 | 10 | 0 | 0 | 0 |
| 119 | Bơ | Nữ | `girls/girl12` | Lớp 3 | 3 | 2388 | 431 | 185 | 0 | 0 |
| 120 | Hà Vân | Nữ | `girls/girl5` | Lớp 3 | 3 | 2285 | 457 | 73 | 39 | 20 |
| 121 | Cốm | Nam | `boys/boy5` | Lớp 3 | 3 | 2236 | 425 | 117 | 2 | 13 |
| 122 | Ốc | Nam | `boys/boy8` | Lớp 3 | 3 | 2158 | 525 | 89 | 23 | 22 |
| 123 | Bảo Quân | Nam | `boys/boy7` | Lớp 3 | 3 | 2142 | 487 | 72 | 25 | 25 |
| 124 | Anh Nam | Nam | `boys/boy5` | Lớp 3 | 3 | 2107 | 346 | 102 | 35 | 22 |
| 125 | Bống 2C | Nữ | `girls/girl14` | Lớp 3 | 3 | 2071 | 409 | 65 | 0 | 0 |
| 126 | Minh Trâm | Nữ | `girls/girl5` | Lớp 3 | 3 | 1994 | 488 | 122 | 0 | 0 |
| 127 | Ốc Nhí | Nam | `boys/boy9` | Lớp 3 | 3 | 1971 | 332 | 143 | 17 | 15 |
| 128 | Bảo Chi | Nữ | `girls/girl8` | Lớp 3 | 3 | 1827 | 390 | 141 | 13 | 20 |
| 129 | Thu Vân | Nữ | `girls/girl5` | Lớp 3 | 3 | 1801 | 303 | 84 | 18 | 14 |
| 130 | Thảo Tâm | Nữ | `girls/girl3` | Lớp 3 | 3 | 1762 | 374 | 120 | 16 | 14 |
| 131 | Sao Nhỏ | Nữ | `girls/girl9` | Lớp 3 | 3 | 1632 | 371 | 93 | 18 | 14 |
| 132 | Minh Linh | Nữ | `girls/girl6` | Lớp 3 | 3 | 1583 | 404 | 95 | 25 | 8 |
| 133 | Bin Siêu Quậy | Nam | `boys/boy8` | Lớp 3 | 3 | 1527 | 357 | 54 | 20 | 14 |
| 134 | Bảo Hân | Nữ | `girls/girl8` | Lớp 3 | 3 | 1519 | 372 | 90 | 22 | 6 |
| 135 | Dưa Hấu | Nam | `boys/boy5` | Lớp 3 | 3 | 1511 | 338 | 56 | 9 | 6 |
| 136 | Phương Chi | Nữ | `girls/girl11` | Lớp 3 | 3 | 1475 | 250 | 101 | 0 | 0 |
| 137 | Thỏ Nhỏ | Nữ | `girls/girl11` | Lớp 3 | 3 | 1465 | 361 | 67 | 24 | 9 |
| 138 | Mít | Nam | `boys/boy7` | Lớp 3 | 3 | 1458 | 273 | 78 | 23 | 8 |
| 139 | Anh Khôi | Nam | `boys/boy1` | Lớp 3 | 3 | 1312 | 290 | 81 | 14 | 14 |
| 140 | Khánh Diệp | Nữ | `girls/girl4` | Lớp 3 | 3 | 1261 | 313 | 93 | 0 | 0 |
| 141 | Quỳnh Uyên | Nữ | `girls/girl9` | Lớp 3 | 3 | 1223 | 245 | 63 | 0 | 0 |
| 142 | Su Ú | Nữ | `girls/girl6` | Lớp 3 | 3 | 1103 | 283 | 37 | 14 | 9 |
| 143 | Xoài Nhí Nhảnh | Nữ | `girls/girl12` | Lớp 3 | 3 | 1085 | 177 | 51 | 4 | 10 |
| 144 | Hải Khang | Nam | `boys/boy6` | Lớp 3 | 3 | 999 | 234 | 77 | 3 | 9 |
| 145 | Bột | Nam | `boys/boy6` | Lớp 3 | 3 | 887 | 199 | 57 | 9 | 6 |
| 146 | Bánh Flan | Nữ | `girls/girl10` | Lớp 3 | 3 | 806 | 134 | 44 | 5 | 6 |
| 147 | Khoai Tóc Xù | Nam | `boys/boy10` | Lớp 3 | 3 | 792 | 137 | 40 | 5 | 4 |
| 148 | Mõm Chăm Ngoan | Nam | `boys/boy6` | Lớp 3 | 3 | 772 | 194 | 55 | 6 | 8 |
| 149 | Tí Lì | Nam | `boys/boy2` | Lớp 3 | 3 | 543 | 117 | 37 | 0 | 0 |
| 150 | Gia Vy | Nữ | `girls/girl15` | Lớp 3 | 3 | 499 | 104 | 28 | 2 | 4 |
| 151 | Tường Chi | Nữ | `girls/girl9` | Lớp 3 | 3 | 493 | 86 | 30 | 0 | 0 |
| 152 | Bin Lì | Nam | `boys/boy3` | Lớp 3 | 3 | 493 | 104 | 25 | 1 | 4 |
| 153 | Bé Bơ | Nữ | `girls/girl6` | Lớp 3 | 3 | 489 | 126 | 34 | 2 | 3 |
| 154 | Phương Ngân | Nữ | `girls/girl11` | Lớp 3 | 3 | 455 | 98 | 15 | 4 | 3 |
| 155 | Việt An | Nam | `boys/boy10` | Lớp 3 | 3 | 398 | 78 | 21 | 0 | 0 |
| 156 | Mây Xinh | Nữ | `girls/girl12` | Lớp 3 | 3 | 397 | 95 | 15 | 4 | 2 |
| 157 | Ku Đẹp Trai | Nam | `boys/boy4` | Lớp 3 | 3 | 374 | 63 | 12 | 0 | 0 |
| 158 | Xoài Nhỏ | Nữ | `girls/girl14` | Lớp 3 | 3 | 359 | 64 | 17 | 3 | 3 |
| 159 | Tép 2018 | Nam | `boys/boy6` | Lớp 3 | 3 | 340 | 58 | 14 | 0 | 0 |
| 160 | Chuột Lắc | Nam | `boys/boy6` | Lớp 3 | 3 | 300 | 58 | 8 | 4 | 2 |
| 161 | Hổ Con | Nam | `boys/boy10` | Lớp 3 | 3 | 299 | 49 | 18 | 0 | 0 |
| 162 | Hà My | Nữ | `girls/girl10` | Lớp 3 | 3 | 252 | 44 | 11 | 0 | 0 |
| 163 | Anh Long | Nam | `boys/boy4` | Lớp 3 | 3 | 249 | 43 | 13 | 0 | 0 |
| 164 | Phương Vân | Nữ | `girls/girl6` | Lớp 3 | 3 | 241 | 52 | 7 | 1 | 1 |
| 165 | Lu Lu | Nữ | `girls/girl2` | Lớp 3 | 3 | 220 | 37 | 6 | 1 | 1 |
| 166 | Ken Mập | Nam | `boys/boy3` | Lớp 3 | 3 | 210 | 41 | 9 | 3 | 1 |
| 167 | Thanh Lâm | Nam | `boys/boy1` | Lớp 3 | 3 | 205 | 44 | 12 | 0 | 0 |
| 168 | Nhật Duy | Nam | `boys/boy2` | Lớp 3 | 3 | 151 | 36 | 3 | 1 | 0 |
| 169 | Hải Phát | Nam | `boys/boy2` | Lớp 3 | 3 | 138 | 30 | 5 | 0 | 0 |
| 170 | Miu | Nữ | `girls/girl3` | Lớp 3 | 3 | 131 | 26 | 3 | 0 | 0 |
| 171 | Minh Thịnh | Nam | `boys/boy7` | Lớp 3 | 3 | 99 | 21 | 4 | 0 | 0 |
| 172 | Xoài 2015 | Nữ | `girls/girl14` | Lớp 3 | 3 | 91 | 23 | 3 | 0 | 0 |
| 173 | Khánh Bách | Nam | `boys/boy9` | Lớp 3 | 3 | 42 | 10 | 0 | 0 | 0 |
| 174 | Kem | Nữ | `girls/girl13` | Lớp 3 | 3 | 41 | 10 | 0 | 0 | 0 |
| 175 | Su 2017 | Nữ | `girls/girl2` | Lớp 3 | 3 | 40 | 10 | 0 | 0 | 0 |
| 176 | Na Cute | Nữ | `girls/girl12` | Lớp 4 | 4 | 2197 | 478 | 144 | 13 | 24 |
| 177 | Bột Mập | Nam | `boys/boy3` | Lớp 4 | 4 | 2013 | 313 | 140 | 0 | 0 |
| 178 | Gia Diệp | Nữ | `girls/girl6` | Lớp 4 | 4 | 1374 | 308 | 98 | 4 | 14 |
| 179 | Chíp Hay Cười | Nữ | `girls/girl4` | Lớp 4 | 4 | 1369 | 338 | 66 | 0 | 0 |
| 180 | Tường My | Nữ | `girls/girl10` | Lớp 4 | 4 | 1277 | 237 | 54 | 0 | 0 |
| 181 | Sún | Nam | `boys/boy1` | Lớp 4 | 4 | 924 | 190 | 28 | 13 | 10 |
| 182 | Dâu Má Lúm | Nữ | `girls/girl14` | Lớp 4 | 4 | 307 | 59 | 10 | 0 | 0 |
| 183 | Lu 2015 | Nữ | `girls/girl7` | Lớp 4 | 4 | 301 | 75 | 15 | 3 | 3 |
| 184 | Tuấn Đạt | Nam | `boys/boy7` | Lớp 4 | 4 | 135 | 26 | 6 | 1 | 0 |
| 185 | Dâu Tóc Mây | Nữ | `girls/girl10` | Lớp 4 | 4 | 90 | 20 | 2 | 0 | 0 |
| 186 | Minh Nhân | Nam | `boys/boy5` | Lớp 4 | 4 | 68 | 15 | 1 | 0 | 0 |
| 187 | Thỏ Xinh | Nữ | `girls/girl12` | Lớp 4 | 4 | 49 | 11 | 0 | 0 | 0 |
| 188 | Gia Giang | Nữ | `girls/girl4` | Lớp 5 | 5 | 1838 | 330 | 117 | 2 | 10 |
| 189 | Tường Ngân | Nữ | `girls/girl8` | Lớp 5 | 5 | 1656 | 347 | 122 | 0 | 0 |
| 190 | Siêu Nhân Đỏ | Nam | `boys/boy9` | Lớp 5 | 5 | 1475 | 370 | 63 | 11 | 10 |
| 191 | Khoai 2016 | Nam | `boys/boy3` | Lớp 5 | 5 | 1333 | 298 | 81 | 16 | 11 |
| 192 | Gạo Lì | Nam | `boys/boy10` | Lớp 5 | 5 | 1098 | 205 | 55 | 16 | 10 |
| 193 | Ỉn 2019 | Nữ | `girls/girl5` | Lớp 5 | 5 | 563 | 145 | 34 | 0 | 0 |
| 194 | Miu Xinh | Nữ | `girls/girl9` | Lớp 5 | 5 | 464 | 95 | 29 | 2 | 4 |
| 195 | Thu Ngân | Nữ | `girls/girl5` | Lớp 5 | 5 | 383 | 91 | 25 | 0 | 0 |
| 196 | Thảo Trâm | Nữ | `girls/girl11` | Lớp 5 | 5 | 220 | 51 | 9 | 0 | 0 |
| 197 | Phúc Thịnh | Nam | `boys/boy9` | Lớp 5 | 5 | 192 | 39 | 10 | 1 | 1 |
| 198 | Tú Uyên | Nữ | `girls/girl11` | Lớp 5 | 5 | 99 | 22 | 3 | 0 | 0 |
| 199 | Thỏ 2016 | Nữ | `girls/girl13` | Lớp 5 | 5 | 48 | 11 | 0 | 0 | 0 |
| 200 | Mận Dễ Thương | Nữ | `girls/girl10` | Lớp 5 | 5 | 40 | 10 | 0 | 0 | 0 |

## Tổng hợp

| Lớp | Số bạn |
|---|---:|
| Tiền tiểu học | 25 |
| Lớp 1 | 35 |
| Lớp 2 | 58 |
| Lớp 3 | 57 |
| Lớp 4 | 12 |
| Lớp 5 | 13 |

Nam: 85 · Nữ: 115
