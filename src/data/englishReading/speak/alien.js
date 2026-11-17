// 🎤 Nói, bộ chủ đề alien. Định dạng: docs/tieng-anh/thiet-ke-bai-doc.md §9
// kind 'text'   hỏi về bài đọc: need = các nhóm từ khoá phải nghe thấy ('a|b' = a hoặc b).
// kind 'me'     hỏi về chính em: frame = khung câu gợi ý, need thường là từ của khung (bé tự điền phần còn lại).
// kind 'retell' kể lại / nói nhiều câu: hints = từ gợi ý hiện ra, need = nhóm từ khoá, min = số nhóm tối thiểu phải nghe thấy.
// minWords: số từ tối thiểu (mặc định text 2, me 3, retell 8).
export default {
  'en-101': [
    { kind: 'text', q: 'Where is the spaceship?', vi: 'Phi thuyền ở đâu?', model: 'It is under the mango tree.', need: ['mango|tree'] },
    { kind: 'text', q: 'How many eyes has Bip got?', vi: 'Bíp có mấy con mắt?', model: 'He has got three eyes.', need: ['three'] },
    { kind: 'me', q: 'Have you got a pet?', vi: 'Em có thú cưng không?', frame: 'I have got …', model: 'I have got a cat.', need: ['have|has|got'] },
    { kind: 'me', q: 'Who is your friend?', vi: 'Bạn của em là ai?', frame: '… is my friend.', model: 'Nam is my friend.', need: ['friend'] },
    { kind: 'retell', q: 'Tell me about Bip.', vi: 'Kể về Bíp.', hints: ['alien', 'small', 'green', 'three eyes', 'spaceship'], model: 'Bip is an alien. He is small and green. He has got three eyes and two antennae. His spaceship is broken.', need: ['alien', 'small', 'green', 'three|eyes|eye', 'spaceship|ship', 'broken|friend|happy'], min: 3 },
  ],
  'en-102': [
    { kind: 'text', q: 'What food does Bip like?', vi: 'Bíp thích món gì?', model: 'He likes pho.', need: ['pho|noodles|noodle|beef'] },
    { kind: 'text', q: 'Why does Bip not like xoi?', vi: 'Vì sao Bíp không thích xôi?', model: 'Because it is very sticky.', need: ['sticky'] },
    { kind: 'me', q: 'What food do you like?', vi: 'Em thích món ăn gì?', frame: 'I like …', model: 'I like fried rice.', need: ['like'] },
    { kind: 'me', q: 'Can you use chopsticks?', vi: 'Em có biết dùng đũa không?', frame: 'Yes, I can. / No, I can\'t.', model: 'Yes, I can use chopsticks.', need: ['can'] },
    { kind: 'retell', q: 'Tell me about Bip and the food.', vi: 'Kể về Bíp và các món ăn.', hints: ['hungry', 'pho', 'noodles', 'sticky', 'chopsticks'], model: 'Bip is hungry. He likes pho. He likes the noodles and the beef. He does not like xoi because it is sticky. Now he can eat with chopsticks.', need: ['hungry', 'pho|noodles|noodle|beef', 'sticky|rice', 'chopsticks|chopstick', 'fruit|purple'], min: 3 },
  ],
  'en-103': [
    { kind: 'text', q: 'Who does Bip sit next to?', vi: 'Bíp ngồi cạnh ai?', model: 'He sits next to Tom.', need: ['tom'] },
    { kind: 'text', q: 'What does Bip sometimes do at break time?', vi: 'Giờ ra chơi Bíp thỉnh thoảng làm gì?', model: 'He sometimes plays football.', need: ['football'] },
    { kind: 'me', q: 'What do you usually do at break time?', vi: 'Giờ ra chơi em thường làm gì?', frame: 'I usually …', model: 'I usually play with my friends.', need: ['usually|always|sometimes|often'] },
    { kind: 'me', q: 'What does your best friend always do?', vi: 'Bạn thân của em luôn làm gì?', frame: 'My friend always …', model: 'My friend always helps me.', need: ['always|usually|sometimes|often|never'] },
    { kind: 'retell', q: 'Tell me about Bip at school.', vi: 'Kể về Bíp ở trường.', hints: ['cap', 'Tom', 'listens', 'never', 'football'], model: 'Bip goes to school with Minh. He sits next to Tom. He always listens to the teacher and he never talks in class. He sometimes plays football at break time.', need: ['cap|hat', 'school', 'tom', 'listen|listens|teacher', 'never|talk|talks', 'football|fast|runs|run'], min: 3 },
  ],
  'en-104': [
    { kind: 'text', q: 'How many suns has Lumo got?', vi: 'Lumo có mấy mặt trời?', model: 'It has got two suns.', need: ['two|2'] },
    { kind: 'text', q: 'How do children go to school on Lumo?', vi: 'Trẻ em trên Lumo đi học bằng gì?', model: 'They fly because they have got wings on their shoes.', need: ['fly|flying|wings|wing'] },
    { kind: 'me', q: 'How do you go to school?', vi: 'Em đi học bằng gì?', frame: 'I go to school by … / on foot.', model: 'I go to school by motorbike with my dad.', need: ['go|walk|ride'] },
    { kind: 'me', q: 'What do you like about your town? Why?', vi: 'Em thích điều gì ở nơi em sống? Vì sao?', frame: 'I like … because …', model: 'I like my town because the people are friendly.', need: ['like|love', 'because'] },
    { kind: 'retell', q: 'Tell me about planet Lumo.', vi: 'Kể về hành tinh Lumo.', hints: ['two suns', 'sky', 'purple sea', 'fly', 'fruit'], model: 'Lumo is different from Earth. It has got two suns. The sky is pink at night and the sea is purple. Children fly to school because they have got wings on their shoes.', need: ['two|suns|sun', 'sky|orange|pink', 'sea|purple', 'fly|wings|wing', 'fruit|rice', 'different|earth'], min: 3 },
  ],
  'en-105': [
    { kind: 'text', q: 'Why did Bip get lost?', vi: 'Vì sao Bíp bị lạc?', model: 'He ran after a big balloon.', need: ['balloon'] },
    { kind: 'text', q: 'What did the old woman give Bip?', vi: 'Bà cụ đã cho Bíp cái gì?', model: 'She gave him a warm bag of xoi.', need: ['bag|xoi|rice|sticky'] },
    { kind: 'me', q: 'Where did you go last weekend?', vi: 'Cuối tuần trước em đã đi đâu?', frame: 'I went to …', model: 'I went to the park with my family.', need: ['went'] },
    { kind: 'me', q: 'What did you eat for breakfast today?', vi: 'Sáng nay em đã ăn gì?', frame: 'I ate …', model: 'I ate a bowl of pho.', need: ['ate|had'] },
    { kind: 'retell', q: 'Tell me what happened in the Old Quarter.', vi: 'Kể lại chuyện ở phố cổ.', hints: ['balloon', 'lost', 'old woman', 'xoi', 'felt better'], model: 'Mum took the children to the Old Quarter. Bip saw a balloon and ran after it. Soon he was lost. An old woman gave him some xoi and he felt better. Then Minh and Mum came and found him.', need: ['balloon', 'lost', 'woman|lady', 'xoi|sticky|rice', 'better|happy', 'came|found|bought'], min: 3, minWords: 15 },
  ],
  'en-106': [
    { kind: 'text', q: 'Who was the fastest in the running race?', vi: 'Ai chạy nhanh nhất?', model: 'Bip was the fastest of all.', need: ['bip|he', 'fastest'] },
    { kind: 'text', q: 'Why did Bip fly into the air?', vi: 'Vì sao Bíp bay lên không trung?', model: 'Because he was lighter than the others.', need: ['lighter|light|small|smaller|smallest'] },
    { kind: 'me', q: 'Who is the tallest in your class?', vi: 'Ai cao nhất lớp em?', frame: '… is the tallest in my class.', model: 'Nam is the tallest in my class.', need: ['tallest'] },
    { kind: 'me', q: 'Compare yourself with a friend.', vi: 'So sánh em với một người bạn.', frame: 'I am …er than …', model: 'I am taller than my friend Mai.', need: ['than'] },
    { kind: 'retell', q: 'Tell me about Sports Day.', vi: 'Kể lại ngày hội thể thao.', hints: ['fastest', 'jumped higher', 'tug of war', 'lighter', 'two races'], model: 'Bip was the smallest child, but he was the fastest in the running race. He jumped higher than the tallest boy. In the tug of war, he was lighter than the others and he flew into the air. Minh\'s class won two races.', need: ['fastest|faster|fast', 'jumped|jump|higher', 'tug|war|pulled|pull', 'lighter|flew|fly|air', 'won|win|races|race', 'smallest|small'], min: 3, minWords: 15 },
  ],
  'en-107': [
    { kind: 'text', q: 'How long has Bip lived with Minh\'s family?', vi: 'Bíp đã sống với gia đình Minh bao lâu?', model: 'He has lived with them for two months.', need: ['two|2', 'months|month'] },
    { kind: 'text', q: 'What do the children make for the festival?', vi: 'Các bạn làm gì cho Tết Trung thu?', model: 'They make star lanterns with red paper and bamboo.', need: ['lantern|lanterns'] },
    { kind: 'me', q: 'Have you ever made a lantern?', vi: 'Em đã bao giờ làm đèn lồng chưa?', frame: 'Yes, I have. / No, I have never …', model: 'Yes, I have. I made a star lantern last year.', need: ['have|never|made'], minWords: 4 },
    { kind: 'me', q: 'How long have you lived in your house?', vi: 'Em đã sống ở nhà mình bao lâu rồi?', frame: 'I have lived here for / since …', model: 'I have lived here for five years.', need: ['have|lived', 'for|since'], minWords: 5 },
    { kind: 'retell', q: 'Tell me how the friends helped Bip.', vi: 'Kể lại các bạn đã giúp Bíp thế nào.', hints: ['misses Lumo', 'lantern', 'bamboo', 'candles', 'moon'], model: 'Bip has lived with Minh\'s family for two months, but he misses Lumo. Lan has an idea. The children make star lanterns with paper and bamboo. Tom has brought candles and Grandma has sent mooncakes. They walk with their lanterns and Bip is happy again.', need: ['miss|misses|sad|home', 'lantern|lanterns', 'bamboo|paper', 'candle|candles', 'mooncake|mooncakes|moon', 'happy|glow|glows|festival'], min: 3, minWords: 15 },
  ],
  'en-108': [
    { kind: 'text', q: 'What does Tom bring?', vi: 'Tom mang tới cái gì?', model: 'He brings an old fan which still works.', need: ['fan'] },
    { kind: 'text', q: 'What does the pot lid become?', vi: 'Cái vung nồi trở thành cái gì?', model: 'It becomes a new wing.', need: ['wing|wings'] },
    { kind: 'me', q: 'What old things can you recycle at home?', vi: 'Ở nhà em có thể tái chế những đồ cũ nào?', frame: 'I can recycle … which …', model: 'I can recycle old bottles which are clean.', need: ['recycle|use|make'], minWords: 5 },
    { kind: 'me', q: 'What might you do this weekend?', vi: 'Cuối tuần này em có thể sẽ làm gì?', frame: 'I might …', model: 'I might visit my grandma this weekend.', need: ['might|may'], minWords: 4 },
    { kind: 'retell', q: 'Tell me how the children fixed the spaceship.', vi: 'Kể lại các bạn đã sửa phi thuyền thế nào.', hints: ['engine', 'bottles', 'fan', 'wire', 'pot lid', 'button'], model: 'The spaceship needs a new engine, window and wing. The children collect old things. Lan finds bottles, Tom brings an old fan and Dad gives them some wire. The fan becomes the engine and the pot lid becomes a wing. Bip presses a button and the spaceship lifts off the ground.', need: ['engine', 'bottle|bottles|window', 'fan', 'wire|dad', 'lid|wing', 'button|lifts|fly|ground'], min: 3, minWords: 20 },
  ],
  'en-109': [
    { kind: 'text', q: 'Why would Minh have two shadows on Lumo?', vi: 'Vì sao trên Lumo Minh sẽ có hai cái bóng?', model: 'Because there are two suns.', need: ['two|2', 'suns|sun'] },
    { kind: 'text', q: 'What does Bip wish?', vi: 'Bíp ước điều gì?', model: 'He wishes he could stay on Earth longer.', need: ['stay'] },
    { kind: 'me', q: 'If you lived on another planet, what would you do?', vi: 'Nếu em sống ở một hành tinh khác, em sẽ làm gì?', frame: 'If I lived on …, I would …', model: 'If I lived on the moon, I would jump very high every day.', need: ['would|d'], minWords: 7 },
    { kind: 'me', q: 'What do you wish you had?', vi: 'Em ước mình có điều gì?', frame: 'I wish I had …', model: 'I wish I had a big dog.', need: ['wish'], minWords: 5 },
    { kind: 'retell', q: 'Tell me what Minh and Bip imagined.', vi: 'Kể lại Minh và Bíp đã tưởng tượng những gì.', hints: ['two shadows', 'purple sea', 'fly to school', 'three eyes', 'pho'], model: 'Minh imagined life on Lumo. If he lived there, he would have two shadows and he would swim in the purple sea. He would fly to school. He wished he had three eyes. Bip wished he could stay longer and eat pho every morning.', need: ['shadow|shadows', 'sea|swim|purple', 'fly|school', 'eyes|eye|three', 'stay|pho|longer', 'sad|leave'], min: 3, minWords: 20 },
  ],
  'en-110': [
    { kind: 'text', q: 'Who was the spaceship painted by?', vi: 'Phi thuyền được ai sơn?', model: 'It was painted by Lan.', need: ['painted|paint', 'lan'] },
    { kind: 'text', q: 'What did Bip promise Minh?', vi: 'Bíp đã hứa gì với Minh?', model: 'He promised that he would come back one day.', need: ['come|back'] },
    { kind: 'me', q: 'What did your teacher tell you today?', vi: 'Hôm nay cô giáo đã dặn em điều gì?', frame: 'My teacher told us that …', model: 'My teacher told us that we had a test on Friday.', need: ['told|said'], minWords: 6 },
    { kind: 'me', q: 'Tell me about a picture which was drawn by you.', vi: 'Kể về một bức tranh do em vẽ.', frame: 'A picture of … was drawn by me.', model: 'A picture of my cat was drawn by me last week.', need: ['was', 'drawn|painted|made'], minWords: 6 },
    { kind: 'retell', q: 'Tell me how Bip said goodbye.', vi: 'Kể lại Bíp đã chia tay thế nào.', hints: ['painted', 'flag', 'mooncakes', 'promised', 'stars', 'best friend'], model: 'On the last evening, the spaceship was painted by Lan and a flag was drawn by Minh. Grandma packed mooncakes. Bip told Lucky that he would miss his nose. He hugged Minh and promised that he would come back. Minh said that Bip was his best friend.', need: ['painted|paint', 'flag', 'mooncake|mooncakes', 'promised|promise|come back', 'star|stars|sky', 'best friend|friend|hugged|hug'], min: 3, minWords: 20 },
  ],
};
