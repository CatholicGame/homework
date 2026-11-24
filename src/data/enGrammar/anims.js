/**
 * 🎬 Câu biến hình cho từng bài (src/games/enGrammar/movie.js). Mỗi bước 'câu|giải thích'. Cú pháp câu xem movie.js:
 *   a+b dính liền · mới@cũ thẻ cũ đổi chữ · *x* tô màu · !x thẻ sai gạch đỏ.
 * Kiểm tra: node scripts/en-grammar-anims-check.mjs (mọi @nguồn phải có ở bước trước).
 * Lời giải thích không dùng "—" và "nhé".
 */
export const ANIMS = {
  // ═════ Starters ═════
  g01: [
    'I *am* happy.|*I* luôn đi với *am*.',
    '*He*@I *is*@am happy.|Đổi thành *He*: *am* cũng đổi thành *is*.',
    '*She*@He is happy.|*She* cũng đi với *is*.',
    '*They*@She *are*@is happy.|Nhiều người: *They*, đi với *are*.',
  ],
  g02: [
    'He is happy.|Câu kể: bạn ấy vui.',
    'He is *not* happy.|Thêm *not* ngay sau *is*: bạn ấy không vui.',
    "He is+*n't*@not happy.|*is not* dính lại thành *isn't*.",
    "*They*@He *are*@is+n't happy.|Với *They*: *aren't*.",
    "I *am*@are *not*@n't happy.|Với *I*: *am not*, không viết dính.",
  ],
  g03: [
    'She is happy.|Câu kể: bạn ấy vui.',
    '*Is* she happy?|*is* nhảy lên đầu câu, dấu chấm thành dấu hỏi.',
    'Is she happy? *Yes,* *she* *is.*|Trả lời: *Yes, she is.*',
    'You *are* ready.|Câu kể với *You*: *are*.',
    '*Are* you ready?|*are* cũng nhảy lên đầu là thành câu hỏi.',
  ],
  g04: [
    '*a* cat|Trước *cat* dùng *a*.',
    '*an*@a apple@cat|*apple* bắt đầu bằng âm *a*: *a* đổi thành *an*.',
    'an egg@apple|*egg* bắt đầu bằng *e*: vẫn là *an*.',
    '*a*@an bus@egg|*bus* bắt đầu bằng *b*: lại là *a*.',
  ],
  g05: [
    'one cat|Một con mèo.',
    'two@one cat+*s*|Hai con: chữ *s* bay vào đuôi.',
    'two box@cat+*es*@s|*box* tận cùng là x: thêm *es*.',
    'two *children*@box|Vài từ đổi hẳn: *child* thành *children*.',
  ],
  g06: [
    '👇 *This* is a ball.|Ở gần: *This*.',
    '👉@👇 *That*@This is a ball.|Ở xa: *That*.',
  ],
  g07: [
    '👇 This is a ball.|Một quả ở gần: *This is*.',
    '👇 *These*@This *are*@is ball+*s*.|Nhiều quả ở gần: *These are*, bỏ *a*, thêm *s*.',
    '👉@👇 *Those*@These are ball+s.|Nhiều quả ở xa: *Those are*.',
  ],
  g08: [
    'There *is* a duck.|Một con vịt: *There is*.',
    'There *are*@is *two*@a duck+*s*.|Hai con: *is* đổi thành *are*, thêm *s*.',
    'There are *three*@two duck+s.|Ba con: vẫn *There are*.',
  ],
  g09: [
    'I *have* a dog.|*I* đi với *have*.',
    '*She*@I *has*@have a dog.|*She*: *have* đổi thành *has*.',
    '*They*@She *have*@has a dog.|*They*: lại là *have*.',
  ],
  g10: [
    'This is *my* ball.|Của tớ (I): *my*.',
    'This is *his*@my ball.|Của bạn trai (he): *his*.',
    'This is *her*@his ball.|Của bạn gái (she): *her*.',
    'This is *their*@her ball.|Của họ (they): *their*.',
  ],
  g11: [
    'a dog|Một con chó.',
    'a *big* dog|Từ tả *big* chen vào *trước* dog.',
    'a big *red* dog|Thêm màu *red*: vẫn đứng trước dog.',
    '*two*@a big red dog+*s*|Nhiều con: chỉ *dog* thêm s, từ tả giữ nguyên.',
  ],
  g12: [
    'I swim.|Tớ bơi.',
    'I *can* swim.|Thêm *can* trước việc làm: tớ biết bơi.',
    '*He*@I can swim.|*He* vẫn dùng *can*, không thêm s.',
    "He can+*'t* fly@swim.|*can't*: không làm được.",
    '*Can*@can he fly?|Hỏi: *Can* nhảy lên đầu câu.',
  ],
  g13: [
    'I play football.|*I*: việc làm giữ nguyên.',
    '*She*@I play+*s* football.|*She*: thêm *s* vào đuôi.',
    '*He*@She watch@play+*es*@s TV@football.|*watch* tận cùng là ch: thêm *es*.',
    '*They*@He watch TV.|*They*: không thêm gì.',
  ],
  g14: [
    'I like carrots.|Câu kể: tớ thích cà rốt.',
    "I *don't* like carrots.|Không thích: thêm *don't* trước việc làm.",
    '*He*@I like+*s* carrots.|Với *He*: *likes*.',
    "He *doesn't*@s like carrots.|Chữ *s* bay ra thành *doesn't*, *like* trở về từ gốc.",
  ],
  g15: [
    'You like pizza.|Câu kể.',
    '*Do* you like pizza?|Hỏi: thêm *Do* ở đầu câu.',
    '*He*@you like+*s* pizza.|Câu kể với *He*: *likes*.',
    '*Does*@s he like pizza?|Hỏi: chữ *s* bay lên đầu thành *Does*, *like* về từ gốc.',
  ],
  g16: [
    'I run.|Tớ chạy.',
    'I *am* run+*ning*.|Đang chạy: thêm *am*, *run* thêm *ning*.',
    '*She*@I *is*@am run+ning.|*She*: *is*.',
    '*They*@She *are*@is run+ning.|*They*: *are*.',
  ],
  g17: [
    'The cat is *in* the box.|Trong hộp: *in*.',
    'The cat is *on*@in the table@box.|Trên bàn: *on*.',
    'The cat is *under*@on the table.|Dưới bàn: *under*.',
    'The cat is *next*@under *to* the table.|Cạnh bàn: *next to*.',
  ],
  g18: [
    'I *am* happy today.|Hôm nay: *am*.',
    'I *was*@am happy *yesterday*@today.|Hôm qua: *am* đổi thành *was*.',
    '*They*@I *were*@was happy yesterday.|*They*: *were*.',
  ],
  g19: [
    'I play football every day.|Hằng ngày: từ gốc.',
    'I play+*ed* football *yesterday*@every.|Hôm qua: *ed* bay vào đuôi.',
    '*She*@I play+ed football yesterday.|*She* cũng *played*, không thêm gì khác.',
  ],
  g20: [
    'I go to school every day.|Hằng ngày: *go*.',
    'I *went*@go to school *yesterday*@every.|Hôm qua: *go* đổi hẳn thành *went*.',
    'I *ate*@went a cake@school yesterday.|*eat* đổi hẳn thành *ate*.',
    'I *saw*@ate a lion@cake yesterday.|*see* đổi hẳn thành *saw*.',
  ],
  g21: [
    'You play+*ed* football.|Câu kể: bạn đã đá bóng.',
    '*Did*@ed you play football?|Hỏi: *ed* bay lên đầu thành *Did*, *play* về từ gốc.',
    "I@you *didn't*@Did play football.|Phủ định: *didn't* trước từ gốc.",
  ],
  g22: [
    'I swim every day.|Hằng ngày.',
    'I *am* *going* *to* swim *tomorrow*@every.|Định làm ngày mai: thêm *am going to*.',
    '*She*@I *is*@am going to swim tomorrow.|*She*: *is going to*.',
  ],
  g23: [
    'Lan is tall.|Lan cao.',
    'Minh@Lan is tall+*er* *than* Lan.|Hơn: thêm *er* và *than*.',
    'Tom@Minh is *the* tall+*est*@er.|Nhất: *the* + đuôi *est*.',
  ],
  g24: [
    'I have *some* apples.|Câu kể: *some*.',
    "I *don't* have *any*@some apples.|Phủ định: *some* đổi thành *any*.",
    "*Do*@don't you@I have any apples?|Câu hỏi: vẫn là *any*.",
  ],
  g25: [
    'Tom is in the park.|Câu kể: Tom ở công viên.',
    '*Where* is Tom?|Hỏi ở đâu: *Where* đứng đầu, *is* nhảy lên trước Tom.',
    'It@Tom is a kite.|Câu kể: đó là cái diều.',
    '*What* is it?|Hỏi cái gì: *What* đứng đầu.',
  ],
  g26: [
    'We swim *at* seven.|Giờ: *at*.',
    'We swim *on*@at Monday@seven.|Thứ trong tuần: *on*.',
    'We swim *in*@on May@Monday.|Tháng: *in*.',
  ],
  g27: [
    'I like apples. I like bananas.|Hai câu giống nhau.',
    'I like apples *and* bananas.|Nối bằng *and*, bỏ phần lặp lại.',
    'I am tired. I ran.|Hai câu: mệt, và đã chạy.',
    'I am tired *because*@. I ran.|Dấu chấm biến thành *because*: nói lý do.',
  ],
  g28: [
    'I help you.|Tớ giúp bạn.',
    'I *will* help you.|Sẽ giúp: thêm *will*.',
    "I *won't*@will cry@help.|Sẽ không: *won't*.",
    "*Will*@won't you help@cry?|Hỏi: *Will* lên đầu câu.",
  ],
  g29: [
    '*He* is my friend.|Đứng đầu câu: *He*.',
    'I like *him*@He.|Đứng sau việc làm: *He* đổi thành *him*.',
    '*She*@him is my friend.|Đứng đầu câu: *She*.',
    'I like *her*@She.|Đứng sau việc làm: *her*.',
    '*They*@her are my friends.|Đứng đầu câu: *They*.',
    'I like *them*@They.|Đứng sau việc làm: *them*.',
  ],
  g30: [
    'This is *my* bag.|Có đồ vật đi sau: *my*.',
    'This bag is *mine*@my.|*bag* lên trước, *my* đổi thành *mine* đứng cuối.',
    'That is *your*@mine ball@bag.|Có đồ vật đi sau: *your*.',
    'That ball is *yours*@your.|Đứng một mình cuối câu: *yours*.',
  ],
  g31: [
    'the bag of Tom|Cái cặp của Tom.',
    "Tom+*'s*@of bag|Tom lên trước, *of* biến thành *'s* dính vào tên.",
    "*Whose* bag is this?|Hỏi của ai: *Whose*.",
    "It is Tom+'s.|Trả lời: *Tom's*.",
  ],
  g32: [
    'You sit down.|Câu kể: bạn ngồi xuống.',
    '*Sit*@sit down!|Bảo ai làm: bỏ *You*, bắt đầu bằng việc làm.',
    "*Don't* run@Sit!|Bảo đừng làm: *Don't* + việc làm.",
    "*Let's*@Don't go@run!|Rủ cùng làm: *Let's* + việc làm.",
  ],
  g33: [
    'I swim.|Tớ bơi.',
    'I *like* swim+*ming*.|Thích làm: *like* + việc làm có đuôi *ing*.',
    'Swim+ming is fun.|Việc làm có ing đứng đầu câu: bơi thì vui.',
  ],
  g34: [
    'Do you want an orange?|Hỏi bình thường.',
    '*Would*@Do you *like*@want an orange?|Mời lịch sự: *Would you like*.',
    'Yes, please.|Nhận: *Yes, please.*',
    "*I'd*@Yes like@please an ice cream.|Xin lịch sự: *I'd like*.",
  ],
  g35: [
    'I have a dog.|Tớ có một con chó.',
    'I have *got* a dog.|Cũng nói được: *have got*.',
    '*She*@I *has*@have got a dog.|*She*: *has got*.',
    "She has+*n't* got a dog.|Không có: *hasn't got*.",
  ],
  g36: [
    'I go out.|Tớ ra ngoài.',
    '*Can* I go out?|Xin phép: *Can I* đứng đầu.',
    '*Can* *you*@I help@go me@out?|Nhờ ai: *Can you*.',
  ],
  g37: [
    'I am seven.|Tớ bảy tuổi.',
    '*How* *old* are@am you@I?|Hỏi tuổi: *How old*, *am* đổi thành *are*.',
    'There are three cats.|Có ba con mèo.',
    '*How* *many* cats are there?|Hỏi mấy con: *How many* + tên con vật.',
  ],
  g38: [
    'an apple|Đếm được: *an apple*.',
    'three@an apple+*s*|Nhiều quả: thêm *s*.',
    '*some* milk@apple|*milk* không đếm được: dùng *some*.',
    'some milk+!s|Không thêm *s* vào *milk*.',
  ],
  // ═════ Movers ═════
  g39: [
    'I *can* swim.|Bây giờ: *can*.',
    'Last year I *could*@can swim.|Đã qua: *can* đổi thành *could*.',
    "Last year I could+*n't* swim.|Đã không làm được: *couldn't*.",
  ],
  g40: [
    'You brush your teeth.|Con đánh răng.',
    'You *must* brush your teeth.|Bắt buộc: thêm *must*.',
    "You must+*n't* eat@brush sweets@teeth.|Cấm: *mustn't*.",
  ],
  g41: [
    'I *have* *to* go.|Phải đi: *have to*.',
    '*She*@I *has*@have to go.|*She*: *has to*.',
    'Yesterday she *had*@has to go.|Đã qua: *had to*.',
  ],
  g42: [
    'I want pizza.|Tớ muốn pizza.',
    'I want *to* eat pizza.|Muốn làm: *want to* + việc làm.',
    'Mum@I want+*s* *me* to eat pizza.|Muốn người khác làm: *wants me to*.',
  ],
  g43: [
    'I went to the shop.|Tớ đã đến cửa hàng.',
    'I went to the shop *to* *buy* milk.|Để làm gì: *to* + việc làm.',
  ],
  g44: [
    'He is *quick*.|Tả người: *quick*.',
    'He runs@is quick+*ly*.|Tả cách chạy: thêm *ly*.',
    'He runs *more* quick+ly *than* Tom.|So sánh cách làm: *more quickly than*.',
  ],
  g45: [
    'I ride my bike.|Tớ đạp xe.',
    'I *always* ride my bike.|*always* chen vào trước việc làm.',
    'I *never*@always ride my bike.|Không bao giờ: *never*.',
    'I am happy.|Câu với *am*.',
    'I am *always* happy.|Với am, is, are: *always* đứng sau.',
  ],
  g46: [
    'I see a girl. She is riding a bike.|Hai câu.',
    'I see a girl *who*@She is riding a bike.|Người: *She* biến thành *who*, nối hai câu.',
    'I like the dog. It has a long tail.|Hai câu.',
    'I like the dog *which*@It has a long tail.|Con vật: *It* biến thành *which*.',
  ],
  g47: [
    'He is wet because it is raining.|Câu kể có lý do.',
    '*Why* is he wet?|Hỏi lý do: *Why* đứng đầu, *is* lên trước he.',
    '*Because*@Why it is raining.|Trả lời: *Because...*',
  ],
  g48: [
    'He got home. He had dinner.|Hai việc nối nhau.',
    '*When* he got home, he had dinner.|Nối bằng *When*: dấu chấm thành dấu phẩy.',
  ],
  g49: [
    'I open the window.|Tớ mở cửa sổ.',
    '*Shall* I open the window?|Đề nghị giúp: *Shall I* đứng đầu.',
    'Yes, please.|Đồng ý: *Yes, please.*',
  ],
  g50: [
    "Let's go to the cinema.|Rủ: *Let's go*.",
    "*How*@Let's *about* go+*ing* to the cinema?|Cách khác: *How about* + đuôi *ing*.",
    '*What*@How about go+ing to the park@cinema?|*What about* cũng được.',
  ],
  g51: [
    'The weather is sunny.|Trời nắng.',
    "*What's*@is the weather *like*?|Hỏi thời tiết: *What's the weather like?*",
    "It's@What's sunny.|Trả lời: *It's sunny.*",
  ],
  g52: [
    'She draw+s well.|Bạn ấy vẽ giỏi.',
    'She is *good* *at* draw+*ing*@s.|Giỏi việc gì: *good at* + đuôi *ing*.',
    'A baby cat is *called* a kitten.|Tên gọi: *is called*.',
  ],
  g53: [
    'Mum gives the apple *to* Tom.|Đồ vật trước, *to* + người.',
    'Mum gives Tom the apple.|Người trước: bỏ *to*, Tom nhảy lên trước đồ vật.',
  ],
  // ═════ Flyers ═════
  g54: [
    'I read a book.|Tớ đọc sách.',
    'I *was* read+*ing* a book.|Lúc đó đang làm: *was* + đuôi *ing*.',
    'I was read+ing a book *when* the phone rang.|Có việc chen vào: *when* + quá khứ.',
  ],
  g55: [
    'I see an elephant.|Tớ thấy con voi.',
    'I *have* *seen*@see an elephant.|Đã từng thấy: *have* + *seen*.',
    '*Have*@have you@I *ever* seen an elephant?|Hỏi: *Have* lên đầu, thêm *ever*.',
  ],
  g56: [
    'He has eaten the cake.|Bạn ấy đã ăn bánh.',
    'He has *just* eaten the cake.|Vừa mới: *just* sau has.',
    "He has+*n't* eaten the cake *yet*@just.|Chưa: *hasn't* ... *yet*, *yet* chạy xuống cuối câu.",
    'He has *already*@yet eaten the cake.|Rồi (sớm hơn nghĩ): *already*.',
  ],
  g57: [
    'It *will* rain.|Chắc chắn mưa: *will*.',
    'It *might*@will rain.|Có thể mưa: *might*.',
    "It *won't*@might rain.|Chắc không mưa: *won't*.",
  ],
  g58: [
    'You go to bed.|Con đi ngủ.',
    'You *should* go to bed.|Khuyên nên: *should*.',
    "You should+*n't* watch@go TV@bed.|Không nên: *shouldn't*.",
  ],
  g59: [
    'We have a picnic.|Chúng mình đi dã ngoại.',
    '*Shall* we have a picnic?|Rủ nhau: *Shall we* đứng đầu.',
    '*You*@we *could*@Shall have a picnic.|Gợi ý cho bạn: *You could*.',
  ],
  g60: [
    'It is cold.|Câu khẳng định.',
    "It is cold, *isn't* *it*?|Thêm đuôi ngược lại: *isn't it?*",
    "She can't swim.|Câu phủ định.",
    "She can't swim, *can* *she*?|Đuôi khẳng định: *can she?*",
  ],
  g61: [
    'It is sunny. We go swimming.|Hai câu.',
    '*If* it is sunny, we go swimming.|Thêm *If* ở đầu: nếu trời nắng thì đi bơi.',
  ],
  g62: [
    'It was raining. I took an umbrella.|Hai câu.',
    'It was raining *so*@. I took an umbrella.|Dấu chấm biến thành *so*: nêu kết quả.',
    'I wash my hands. I eat.|Hai việc.',
    'I wash my hands *before*@. I eat.|Việc làm trước: *before*.',
  ],
  g63: [
    'That cloud is big.|Đám mây to.',
    'That cloud *looks* *like*@is a sheep@big.|Trông giống: *looks like*.',
    'That *sounds*@cloud like a bird@sheep.|Nghe giống: *sounds like*.',
  ],
  g64: [
    'I am hungry.|Tớ đói.',
    'That smell *makes* me@I hungry.|Làm cho tớ đói: *makes me* + từ tả.',
    'The toy is *made* *of* wood.|Làm bằng gỗ: *made of*.',
  ],
};
