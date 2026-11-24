/**
 * Bài "Tự viết" cấp Flyers (g54–g64): mỗi bài 4 mục, gộp vào trong src/data/enGrammar/write.js.
 * Định dạng mỗi chuỗi:
 *   '😊 Tớ vui. => I am happy.'                 mục 1–3: dịch Việt → Anh (emoji, câu tiếng Việt, =>, câu mẫu)
 *   '... => câu mẫu | cách viết khác'           cách viết khác sau ' | ' (chỉ khi khác thật, không phải dạng viết tắt)
 *   'free: 🧑 Hướng dẫn, từ cần dùng trong *sao*. => Câu ví dụ.'   mục 4: tự đặt câu
 */
export const WRITE_3 = {
  g54: [
    '🍳📞 Mẹ đang nấu ăn thì điện thoại reo. => Mum was cooking when the phone rang.',
    "🌙📖 Lúc tám giờ tối qua, tớ đang đọc sách. => I was reading a book at eight o'clock last night. | At eight o'clock last night, I was reading a book. | I was reading at eight o'clock last night.",
    '🐶😴🏠 Con chó đang ngủ thì tớ về nhà. => The dog was sleeping when I got home. | The dog was sleeping when I came home.',
    "free: 🕗 Viết một câu kể tối qua lúc tám giờ em đang làm gì, dùng *was* và đuôi *ing*. => I was watching TV at eight o'clock.",
  ],
  g55: [
    '🦒 Bạn đã bao giờ nhìn thấy hươu cao cổ chưa? => Have you ever seen a giraffe?',
    '🍕 Tớ đã từng ăn pizza. => I have eaten pizza. | I have eaten pizza before.',
    '🏔️🚫 Anh trai tớ chưa bao giờ leo núi. => My brother has never climbed a mountain.',
    'free: ✈️ Viết một câu bắt đầu bằng *Have you ever* để hỏi bạn. => Have you ever been to Hanoi?',
  ],
  g56: [
    '🚂👋 Tàu hỏa vừa mới đi. => The train has just left.',
    "🍞🚫 Tớ vẫn chưa ăn sáng. => I haven't had breakfast yet. | I haven't eaten breakfast yet.",
    '🚗🧽 Bố đã rửa xe rồi. => Dad has already washed the car.',
    'free: 📚 Viết một câu kể việc em đã làm xong rồi, dùng *already*. => I have already finished my homework.',
  ],
  g57: [
    '⛈️ Chiều nay trời có thể có bão. => There might be a storm this afternoon. | There may be a storm this afternoon.',
    '👵🏠 Bà có thể sẽ đến thăm chúng tớ vào thứ Bảy. => Grandma might visit us on Saturday. | Grandma may visit us on Saturday. | Grandma might come and see us on Saturday.',
    '🤒🏫 Hôm nay Tom có thể không đi học. => Tom might not go to school today. | Tom may not go to school today.',
    'free: 🌤️ Viết một câu về việc có thể xảy ra ngày mai, dùng *might*. => I might go swimming tomorrow.',
  ],
  g58: [
    '💧 Bạn nên uống nhiều nước. => You should drink lots of water. | You should drink a lot of water. | You should drink more water.',
    "🎮🌙 Bạn không nên chơi trò chơi điện tử đến khuya. => You shouldn't play computer games late at night. | You shouldn't play video games late at night.",
    '🧥❓ Tớ có nên mặc áo khoác không? => Should I wear a coat? | Should I wear a jacket?',
    'free: 💡 Viết một lời khuyên cho bạn, dùng *should*. => You should go to bed early.',
  ],
  g59: [
    '🎨 Mình cùng vẽ tranh không? => Shall we draw a picture? | Shall we paint a picture?',
    '🏊 Chiều nay mình đi bơi không? => Shall we go swimming this afternoon?',
    '👩‍🏫❓ Bạn có thể hỏi cô giáo. => You could ask the teacher. | You could ask your teacher.',
    'free: 🧺 Viết một câu rủ bạn cùng chơi, bắt đầu bằng *Shall we*. => Shall we play football after school?',
  ],
  g60: [
    "🐱 Con mèo của bạn tên là Kitty, phải không? => Your cat's name is Kitty, isn't it? | Your cat is called Kitty, isn't it?",
    "🚲 Bạn biết đi xe đạp, phải không? => You can ride a bike, can't you? | You can ride a bicycle, can't you?",
    '👧🍦🚫 Bạn ấy không thích kem, phải không? => She doesn\'t like ice cream, does she?',
    "free: 🏷️ Viết một câu hỏi lại cho chắc về bạn của em, kết thúc bằng *isn't he* hoặc *isn't she*. => Lucy is your best friend, isn't she?",
  ],
  g61: [
    '🌧️☂️ Nếu trời mưa, tớ mang ô. => If it rains, I take an umbrella. | I take an umbrella if it rains.',
    '🍞🚫😋 Nếu tớ không ăn sáng, tớ thấy đói. => If I don\'t have breakfast, I feel hungry. | If I don\'t eat breakfast, I feel hungry. | If I don\'t have breakfast, I am hungry.',
    "🥶🧥 Nếu trời lạnh, chúng tớ mặc áo khoác. => If it's cold, we wear coats. | If it's cold, we wear our coats. | If it's cold, we wear jackets.",
    'free: 🧊 Viết một câu bắt đầu bằng *If* về điều luôn xảy ra. => If I am tired, I go to bed early.',
  ],
  g62: [
    '🌧️🏠 Hôm qua trời mưa nên chúng tớ ở nhà. => It rained yesterday so we stayed at home. | It was raining yesterday so we stayed at home. | It rained yesterday so we stayed home.',
    '🦷🛏️ Tớ đánh răng trước khi đi ngủ. => I brush my teeth before I go to bed. | I brush my teeth before bed.',
    '📺📚 Tớ xem ti vi sau khi làm xong bài tập. => I watch TV after I finish my homework. | I watch TV after I do my homework.',
    'free: 🔗 Viết một câu kể việc em làm trước khi đến trường, dùng *before*. => I eat breakfast before I go to school.',
  ],
  g63: [
    "👦❓ Anh trai của bạn là người thế nào? => What's your brother like?",
    '👧👩 Bạn ấy trông giống mẹ. => She looks like her mum. | She looks like her mother.',
    '🍰🍉 Cái bánh này có vị giống dưa hấu. => This cake tastes like watermelon.',
    'free: ☁️ Viết một câu nói đám mây hay đồ vật trông giống gì, dùng *looks like*. => That cloud looks like a rabbit.',
  ],
  g64: [
    '🎵😊 Âm nhạc làm tớ vui. => Music makes me happy.',
    '🪑🪵 Cái ghế này làm bằng gỗ. => This chair is made of wood.',
    '🕷️😨 Nhện làm em gái tớ sợ. => Spiders make my sister scared. | Spiders make my sister afraid. | Spiders make my little sister scared. | Spiders make my little sister afraid.',
    'free: 🧸 Viết một câu nói một đồ vật trong nhà em làm bằng gì, dùng *made of*. => My table is made of wood.',
  ],
};
