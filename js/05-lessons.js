"use strict";
/* Matematik 7 Oyunları · Öğren lesson scripts (content) */
/* ================= Öğren scripts (written in our own words, aligned with each lesson's pages) ================= */
const SCRIPTS={
"1-7":[
 ["Görev","Bu derste kesirlerle ve ondalık sayılarla dört işlem yapacağız. Önce toplama ve çıkarma, sonra çarpma ve bölme.",[["title","Rasyonel Sayılarla İşlemler","1. Kitap · s. 82–107"]]],
 ["Toplama","Toplama ve çıkarmada önce paydaları eşitleriz. İkide bir artı üçte bir: paydaları altı yaparız. Altıda üç artı altıda iki, altıda beş eder.",[["eq","1/2 + 1/3 = ?",110],["eq","3/6 + 2/6 = 5/6",200," st-ok"],["txt","Paydalar eşitlenir, yalnızca paylar toplanır.",290," st-cyan"]]],
 ["Tuzak","Tuzak: payları ve paydaları ayrı ayrı toplamak. İkide bir artı üçte bir, beşte iki değildir! Beşte iki, yarımdan bile küçüktür.",[["eq","1/2 + 1/3 ≠ 2/5",140," st-bad"],["trap","2/5 &lt; 1/2 olur, toplam küçülemez!"]]],
 ["Çarpma ve bölme","Çarpmada pay ile pay, payda ile payda çarpılır. Bölmede ise ikinci kesri ters çevirip çarparız.",[["eq","2/3 · 3/4 = 6/12 = 1/2",120],["eq","2/3 : 3/4 = 2/3 · 4/3 = 8/9",215," st-ok"],["txt","Bölme → ikinci kesri ters çevir, sonra çarp",305," st-cyan"]]],
 ["İşaret","İşaret kuralları tam sayılardaki gibidir. Aynı işaretliler çarpılınca sonuç artı, farklı işaretliler çarpılınca sonuç eksidir.",[["eq","(−1/2) · (−3/4) = +3/8",130],["rules",["Aynı işaretler → sonuç +","Farklı işaretler → sonuç −"],210]]]],
"1-8":[
 ["Görev","İki veya daha fazla işlem içeren ifadelere çok adımlı işlemler denir. Hangi işlemi önce yapacağımızı bilmeliyiz.",[["title","Çok Adımlı İşlemler","1. Kitap · s. 108–113"]]],
 ["Sıra","İşlem önceliği şöyledir: önce parantez, sonra çarpma ve bölme, en son toplama ve çıkarma. Aynı seviyedeki işlemler soldan sağa yapılır.",[["rules",["1. Parantez ( )","2. Çarpma · ve bölme :","3. Toplama + ve çıkarma −"],110]]],
 ["Örnek","İki artı üç çarpı dört işlemine bakalım. Önce çarpma: üç çarpı dört, on iki. Sonra toplama: iki artı on iki, on dört.",[["eq","2 + 3 · 4",110],["eq","= 2 + 12",195],["eq","= 14",280," st-ok"]]],
 ["Tuzak","Soldan sağa giderek önce iki artı üç yapan, yirmi bulur. Bu yanlıştır! Çarpma, toplamadan önce gelir.",[["eq","2 + 3 · 4 ≠ 20",140," st-bad"],["trap","Önce toplama yapma!"]]],
 ["Parantez","Parantez varsa sıra değişir. Parantezin içi önce yapılır: iki artı üç beş, beş çarpı dört yirmi.",[["eq","(2 + 3) · 4 = 5 · 4 = 20",160," st-ok"],["txt","Parantez önceliği değiştirir.",260," st-cyan"]]]],
"2-1":[
 ["Görev","Bu derste birim küplerden yapılmış bir yapıya önden, üstten ve yandan bakınca ne gördüğümüzü bulacağız.",[["title","Cisimlerin Görünümleri","1. Kitap · s. 121–124"]]],
 ["Yapı","İşte yedi birim küpten yapılmış bir yapı. Bütün küpler aynı büyüklükte. Yapıyı parmağınla ya da fareyle döndürebilirsin; arkadaki saklı küpü bul!",[["three","stack",{cubes:CUBES,label:'7 birim küp · sürükleyerek döndür'},[170,40,460,350]]]],
 ["Dönüş","Şimdi yapı kendi kendine dönüyor: önce önden, sonra üstten, sonra sağdan bakıyoruz. Her bakışta ne gördüğüne dikkat et.",[["three","stack",{cubes:CUBES,views:true},[170,40,460,350]]]],
 ["Görünümler","Önden bakınca genişliği ve yüksekliği görürüz. Üstten bakınca genişliği ve derinliği, sağdan bakınca derinliği ve yüksekliği görürüz.",[["svg",cubeViewsSVG(),100,90,600,210]]],
 ["Tuzak","Tuzak: görünümden küp sayısını bulmaya çalışmak. Önden bakınca arkadaki küpler, öndekilerin arkasına saklanır. Görünüm, kaç sütun ve kaç kat olduğunu gösterir; toplam küp sayısını göstermez.",[["trap","Görünüm ≠ küp sayısı"]]],
 ["İpucu","Kendini o tarafta duruyormuş gibi düşün ve her sütunun en yüksek küpünü çiz. Oyunda yapıları döndürüp doğru görünümü sen bulacaksın.",[["rules",["Önden: genişlik + yükseklik","Üstten: genişlik + derinlik","Yandan: derinlik + yükseklik"],120]]]],
"2-2":[
 ["Görev","Bir kutuyu kenarlarından kesip düz bir kâğıt gibi açtığımızı düşün. Buna prizmanın açınımı denir.",[["title","Açınım ve Yüzey Alanı","1. Kitap · s. 125–137"]]],
 ["Katlama","İzle: düz açınımın kenarları katlanınca kutu oluşuyor, sonra kutu yeniden açılıyor. Kutuyu döndürüp her yüzüne bakabilirsin.",[["three","net",{a:4,b:2,c:3},[150,30,500,380]]]],
 ["Açınım","Dikdörtgenler prizmasının açınımında altı dikdörtgen vardır. Karşılıklı yüzler birbirine eştir; aynı renkle gösterdik.",[["svg",netSVG(4,2,3),250,40,300,370]]],
 ["Yüzey alanı","Yüzey alanı, altı yüzün alanları toplamıdır. Üç çift eş yüz olduğu için: iki çarpı, en çarpı boy artı boy çarpı yükseklik artı en çarpı yükseklik. Dört, iki ve üç için elli iki santimetrekare.",[["eq","Alan = 2 · (a·b + b·c + a·c)",100],["eq","2 · (8 + 6 + 12) = 52 cm²",190," st-ok"]]],
 ["Tuzak","Tuzak: üç yüzü toplayıp ikiyle çarpmayı unutmak, ya da yüzey alanı ile hacmi karıştırmak. Yüzey alanı kare birimle, hacim küp birimle ölçülür.",[["trap","cm² ≠ cm³"]]],
 ["Kurallar","Kuralları toplayalım.",[["rules",["6 yüz = 3 çift eş dikdörtgen","Yüzey alanı = 2(ab + bc + ac)","Birimi: cm², m²"],120]]]],
"2-3":[
 ["Görev","Ayrıt uzunlukları bir birim olan küplere birim küp denir. Bir prizmanın içini boşluksuz dolduran birim küplerin sayısı, onun hacmidir.",[["title","Prizmanın Hacmi","1. Kitap · s. 138–143"]]],
 ["Katmanlar","İzle: birim küpler prizmayı kat kat dolduruyor. Dörde iki tabanlı bir kat, sekiz birim küptür. Üç kat üst üste konunca sekiz çarpı üç, yirmi dört birim küp olur.",[["three","fill",{a:4,b:2,c:3},[170,30,460,350]],["eq","4 · 2 · 3 = 24 birim küp",420," st-ok"]]],
 ["Bağıntı","Yani hacim, en çarpı boy çarpı yüksekliktir. Taban alanı çarpı yükseklik de diyebiliriz.",[["eq","V = a · b · c",140],["eq","V = taban alanı · yükseklik",230," st-cyan"]]],
 ["Eksik ayrıt","Hacim ve iki ayrıt biliniyorsa üçüncüsünü bölmeyle buluruz. Hacmi altmış, eni beş, boyu dört olan prizmanın yüksekliği: altmış bölü yirmi, üç.",[["eq","5 · 4 · ? = 60",130],["eq","? = 60 : 20 = 3",220," st-ok"]]],
 ["Tuzak","Tuzak: ayrıtları toplamak. Beş artı dört artı üç hacim değildir! Hacim için mutlaka çarparız.",[["trap","5 + 4 + 3 ≠ hacim"]]]],
"2-4":[
 ["Görev","Hacmi küp birimlerle ölçeriz: santimetreküp, desimetreküp, metreküp. Sıvıları ise litreyle ölçeriz.",[["title","Hacim Ölçme Birimleri","1. Kitap · s. 144–151"]]],
 ["Basamaklar","Küp birimlerde her basamak bin kattır. Bir metreküp bin desimetreküp, bir desimetreküp bin santimetreküptür.",[["rules",["1 m³ = 1000 dm³","1 dm³ = 1000 cm³"],140]]],
 ["Litre","En önemli köprü: bir litre, bir desimetreküpe eşittir. Bir mililitre de bir santimetreküpe eşittir.",[["eq","1 L = 1 dm³",140," st-ok"],["eq","1 mL = 1 cm³",230," st-ok"]]],
 ["Örnek","İki bin beş yüz santimetreküp kaç litredir? Bine böleriz: iki virgül beş litre.",[["eq","2500 cm³ = 2,5 dm³ = 2,5 L",170]]],
 ["Tuzak","Tuzak: uzunluk birimlerindeki gibi onla çarpmak. Küp birimlerde basamaklar arası bin kattır!",[["trap","×10 değil, ×1000"]]]],
"2-5":[
 ["Görev","Kutular, akvaryumlar ve odalar dikdörtgenler prizmasıdır. Önce soruyu okuyup ne istendiğine karar veririz: yüzey alanı mı, hacim mi?",[["title","Alan ve Hacim Problemleri","1. Kitap · s. 152–156"]]],
 ["Karar","Boyamak, kaplamak, paketlemek gibi dış yüzeyle ilgili işler yüzey alanıdır. Su, kum ya da eşya ile doldurmak hacimdir.",[["rules",["Kaplamak, boyamak → yüzey alanı","Doldurmak, sığdırmak → hacim"],140]]],
 ["Akvaryum","Eni elli, boyu otuz, yüksekliği kırk santimetre olan akvaryum: altmış bin santimetreküp. Bin santimetreküp bir litre olduğundan altmış litre su alır.",[["three","prism",{a:5,b:3,c:4,label:'en 50 cm · boy 30 cm · yükseklik 40 cm'},[170,30,460,350]],["eq","60 000 cm³ = 60 L",420," st-ok"]]],
 ["Tuzak","Tuzak: farklı birimleri karıştırmak. Bir ölçü metre, diğeri santimetre ise önce aynı birime çevir.",[["trap","Önce birimleri eşitle!"]]],
 ["Adımlar","Her problemde bu dört adımı izle.",[["rules",["1. Ne isteniyor? (alan / hacim)","2. Birimleri eşitle","3. Formülü uygula","4. Sonucun birimini yaz"],100]]]],
"3-1":[
 ["Görev","Topladığımız veriler iki türlüdür: kategorik ve nicel.",[["title","Kategorik ve Nicel Veri","1. Kitap · s. 162–164"]]],
 ["Kategorik","Kategorik veri gruplarla ifade edilir: en sevilen meyve, göz rengi ya da okula geliş şekli gibi.",[["lines",["Elma · Muz · Çilek","Mavi · Kahverengi · Yeşil","Yürüyerek · Servisle · Otobüsle"],140," st-pink"]]],
 ["Nicel","Nicel veri sayılarla ifade edilir. Sayarak bulunursa kesikli, ölçerek bulunursa süreklidir. Kardeş sayısı kesikli, boy uzunluğu süreklidir.",[["rules",["Kesikli: sayılır (kardeş sayısı: 2)","Sürekli: ölçülür (boy: 152,5 cm)"],140]]],
 ["Tuzak","Tuzak: sayıyla yazılan her şeyi nicel sanmak. Forma numarası sayı gibi görünür ama bir etikettir; kategoriktir.",[["trap","Forma no. 10 → kategorik"]]],
 ["Grafik","Nicel verileri nokta grafiğinde gösterebiliriz. Her nokta bir veridir.",[["svg",dotPlot([2,3,3,4,4,4,5],1,6),180,90,440,240]]]],
"3-2":[
 ["Görev","Her araştırma bir soruyla başlar. Ama her soru istatistiksel değildir.",[["title","Araştırma Sorusu","1. Kitap · s. 165–168"]]],
 ["Değişkenlik","İstatistiksel bir sorunun cevabı kişiden kişiye değişir. Sınıfımızdaki öğrenciler günde kaç saat uyuyor sorusu böyledir.",[["txt","“Öğrenciler günde kaç saat uyuyor?” ✓",160," st-ok"],["txt","Cevaplar kişiden kişiye değişir.",250," st-cyan"]]],
 ["Değil","Ali dün kaç saat uyudu sorusunun tek bir cevabı vardır. Bu istatistiksel bir soru değildir.",[["txt","“Ali dün kaç saat uyudu?” ✗",160," st-bad"],["txt","Tek bir cevap → istatistiksel değil",250]]],
 ["Örneklem","Herkese soramıyorsak, grubu temsil eden daha küçük bir grup seçeriz. Bu gruba örneklem denir.",[["lines",["Evren: okuldaki tüm öğrenciler","Örneklem: her sınıftan 5 öğrenci"],160]]],
 ["Tuzak","Tuzak: örneklemi tek bir gruptan seçmek. Sadece basketbol takımına boy sorarsan, okulun boy ortalamasını yanlış bulursun.",[["trap","Örneklem grubu temsil etmeli!"]]]],
"3-3":[
 ["Görev","Soruyu belirledikten sonra veri toplarız. Dört yol var: anket, gözlem, deney ve ölçme.",[["title","Veri Toplama","1. Kitap · s. 169–170"]]],
 ["Yöntemler","Görüş soruyorsak anket, olayı izleyip sayıyorsak gözlem, bir koşulu değiştirip deniyorsak deney, uzunluk ve kütle gibi büyüklükler için ölçme kullanırız.",[["rules",["Anket: soru sorarak","Gözlem: izleyip sayarak","Deney: koşulu değiştirip deneyerek","Ölçme: araçla ölçerek"],100]]],
 ["Düzenleme","Toplanan verileri analize hazırlamak için bir tabloya yazar, çetele tutarız.",[["table",[["Meyve","Çetele","Sayı"],["Elma","||||","4"],["Muz","||","2"],["Çilek","|||","3"]],110]]],
 ["Tuzak","Tuzak: yönlendiren soru sormak. Elma en sağlıklı meyve, değil mi diye sorarsan, cevaplar gerçeği göstermez.",[["trap","Soru tarafsız olmalı!"]]]],
"3-4":[
 ["Görev","Verileri grafikle görselleştirir ve birkaç sayıyla özetleriz.",[["title","Veri Analizi","1. Kitap · s. 171–172"]]],
 ["Grafik","İşte yedi öğrencinin okuduğu kitap sayıları: üç, beş, iki, beş, dört, beş, altı.",[["svg",dotPlot([3,5,2,5,4,5,6],1,7),170,70,460,250],["txt","3, 5, 2, 5, 4, 5, 6",380]]],
 ["Ortalama ve ortanca","Aritmetik ortalama: hepsini toplayıp veri sayısına böleriz; otuz bölü yedi, yaklaşık dört virgül üç. Ortanca: sıraladığımızda tam ortadaki değer, beş.",[["lines",["Sırala: 2, 3, 4, 5, 5, 5, 6","Ortanca = 5 (tam ortadaki)","Ortalama = 30 : 7 ≈ 4,3"],140]]],
 ["Tepe değer ve açıklık","Tepe değer en çok tekrar eden değerdir: beş. Açıklık en büyük eksi en küçüktür: altı eksi iki, dört.",[["lines",["Tepe değer = 5","Açıklık = 6 − 2 = 4"],170]]],
 ["Tuzak","Tuzak: ortancayı bulmadan önce sıralamayı unutmak. Ortanca, sıralanmış verinin ortasıdır.",[["trap","Önce sırala!"]]]],
"3-5":[
 ["Görev","Analizden sonra sonuçlara bakıp yorum yapar ve karar veririz.",[["title","Yorumlama ve Karar","1. Kitap · s. 173–189"]]],
 ["Karşılaştırma","İki sınıfın okuduğu kitapların ortalaması dört ve altı ise, ikinci sınıf ortalamada daha çok okumuştur.",[["lines",["7/A ortalama: 4 kitap","7/B ortalama: 6 kitap","→ 7/B ortalamada daha çok okuyor"],140]]],
 ["Açıklık","Açıklık, verilerin ne kadar dağınık olduğunu gösterir. Açıklık büyükse veriler birbirinden çok farklıdır.",[["lines",["Açıklık küçük → veriler birbirine yakın","Açıklık büyük → veriler dağınık"],170]]],
 ["Tuzak","Tuzak: tek bir uç değere bakıp karar vermek. Bir öğrenci yirmi kitap okudu diye bütün sınıf çok okuyor diyemeyiz. Ortanca, uç değerlerden daha az etkilenir.",[["trap","Uç değer yanıltabilir!"]]],
 ["Kurallar","Karar verirken birden çok ölçüye birlikte bakarız ve kararımızı verilerle destekleriz.",[["rules",["Ortalama + ortanca + açıklık birlikte","Sonucu araştırma sorusuyla karşılaştır","Kararı verilerle destekle"],120]]]],
"3-6":[
 ["Görev","Bir istatistiksel araştırma dört adımdan oluşur.",[["title","Araştırma Süreci","1. Kitap · s. 190–196"]]],
 ["Adımlar","Önce araştırma sorusunu belirleriz, sonra verileri toplayıp analize hazırlarız, sonra verileri analiz ederiz ve en son yorumlayıp karar veririz.",[["rules",["1. Araştırma sorusunu belirleme","2. Verileri toplama ve hazırlama","3. Veri analizi","4. Yorumlama ve karar verme"],100]]],
 ["Örnek","Örnek: öğrenciler kaç saat uyuyor sorusunu yazdık, anket yaptık, nokta grafiği çizdik ve öğrencilerin çoğu az uyuyor diye yorumladık.",[["eq","Soru → Anket → Grafik → Yorum",200]]],
 ["Tuzak","Tuzak: veriyi toplamadan sonuca karar vermek. Önce veri, sonra yorum!",[["trap","Önce veri, sonra karar!"]]]],
"4-1":[
 ["Görev","Bir şeklin bir doğruya göre simetrisine, o şeklin yansıma dönüşümü altındaki görüntüsü denir. Ayna gibi düşün.",[["title","Yansıma Dönüşümü","1. Kitap · s. 204–210"]]],
 ["Ayna","Simetri doğrusu bir ayna gibidir. Her kare, doğrunun öbür tarafına aynı uzaklıkta yansır.",[["svg",miniReflectSVG(),160,70,480,300]]],
 ["Katla","Şimdi şekli simetri doğrusu boyunca katlayalım. Şekil ayna gibi döner ve tam görüntüsünün üstüne düşer. Böylece uzaklığın aynı kaldığını, yönün ise ters döndüğünü görürüz.",[["three","flip",{cols:10,rows:6,vert:true,k:5,cells:[[1,1],[2,1],[3,1],[3,2],[3,3],[2,3]]},[140,45,520,340]]]],
 ["Eşlik","Görüntü şekille eştir: büyümez, küçülmez. Yalnızca yönü ters döner.",[["lines",["Uzaklık aynı","Boyut aynı","Yön ters"],150]]],
 ["Tuzak","Tuzak: şekli doğrunun öbür tarafına sadece kaydırmak. Kaydırırsan yönü ters dönmez; bu yansıma olmaz!",[["trap","Kaydırma ≠ yansıma"]]],
 ["İpucu","Her köşeyi tek tek yansıt: doğruya kaç kare uzakta olduğunu say, öbür tarafta aynı sayıda kare ilerle.",[["rules",["1. Bir köşe seç","2. Doğruya kaç kare? Say","3. Öbür tarafta aynı sayıda ilerle","4. Köşeleri birleştir"],100]]]],
"4-2":[
 ["Görev","Bir doğru parçasını dik kesen ve iki eşit parçaya ayıran doğruya orta dikme, bir açıyı iki eş açıya ayıran ışına açıortay denir.",[["title","Orta Dikme ve Açıortay İnşası","1. Kitap · s. 211–215"]]],
 ["Orta dikme","Pergeli doğru parçasının yarısından fazla açarız. İki uçtan aynı açıklıkla yay çizeriz. Yayların kesiştiği iki noktayı birleştiririz.",[["svg",constructSVG('perp'),220,60,360,300]]],
 ["Açıortay","Köşeden bir yay çizip iki kolu keseriz. Bu iki noktadan aynı açıklıkla yay çizeriz. Kesişim noktasını köşeyle birleştiririz.",[["svg",constructSVG('bis'),220,60,360,290]]],
 ["Özellik","Orta dikme üzerindeki her nokta iki uca eşit uzaklıktadır. Açıortay üzerindeki her nokta iki kola eşit uzaklıktadır.",[["rules",["Orta dikme: iki uca eşit uzaklık","Açıortay: iki kola eşit uzaklık"],150]]],
 ["Tuzak","Tuzak: pergel açıklığını yarıdan küçük almak. O zaman yaylar kesişmez!",[["trap","Açıklık &gt; yarı uzunluk"]]]],
"5-1":[
 ["Görev","Bir üçgende dört özel çizgi vardır: açıortay, yükseklik, kenar orta dikme ve kenarortay. Hepsini işaretlerinden tanıyacağız.",[["title","Üçgende Özel Çizgiler","2. Kitap · s. 16–27"]]],
 ["Açıortay ve yükseklik","Açıortay köşedeki açıyı iki eş açıya böler; eş yay işaretleriyle gösterilir. Yükseklik köşeden karşı kenara dik iner; dik açı işaretiyle gösterilir.",[["svg",triSVG('aciortay'),10,60,380,280],["svg",triSVG('yukseklik'),410,60,380,280],["txt","Açıortay",380,'',200],["txt","Yükseklik",380,'',600]]],
 ["Kenarortay ve orta dikme","Kenarortay köşeyi karşı kenarın orta noktasına bağlar; eşit çentiklerle gösterilir. Kenar orta dikme kenarı ortasından dik keser; köşeden geçmek zorunda değildir.",[["svg",triSVG('kenarortay'),10,60,380,280],["svg",triSVG('ortadikme'),410,60,380,280],["txt","Kenarortay",380,'',200],["txt","Kenar orta dikme",380,'',600]]],
 ["Tuzak","Tuzak: yükseklik ile kenarortayı karıştırmak. Yükseklikte dik açı, kenarortayda eşit parçalar vardır. İkisi genellikle farklı yerlere iner.",[["trap","Dik açı ≠ orta nokta"]]],
 ["Kurallar","İşaretleri hatırla.",[["rules",["Açıortay → eş açılar","Yükseklik → dik açı","Kenarortay → orta nokta","Kenar orta dikme → orta nokta + dik açı"],100]]]],
"5-2":[
 ["Görev","Kenarortay, bir köşeyi karşı kenarın orta noktasına birleştiren doğru parçasıdır.",[["title","Kenarortay ve İnşası","2. Kitap · s. 28–31"]]],
 ["İnşa","Önce kenarın orta noktasını buluruz: o kenarın orta dikmesini pergelle inşa ederiz. Sonra bu orta noktayı karşı köşeyle birleştiririz.",[["svg",constructSVG('perp'),220,50,360,290],["txt","M orta noktası → karşı köşeye birleştir",390," st-cyan"]]],
 ["Örnek","B C kenarı on dört santimetre ise, kenarortay onu yedişer santimetrelik iki parçaya ayırır.",[["svg",triSVG('kenarortay'),210,40,380,290],["eq","|BD| = |DC| = 14 : 2 = 7 cm",395," st-ok"]]],
 ["Üç kenarortay","Her üçgenin üç kenarortayı vardır ve üçü tek bir noktada kesişir.",[["svg",medians3SVG(),220,50,360,300]]],
 ["Tuzak","Tuzak: orta noktayı gözle tahmin etmek. Cetvelle ölç ya da pergelle inşa et!",[["trap","Gözle değil, ölçerek!"]]]],
"6-1":[
 ["Görev","İki niceliğin çarpımsal ilişki kurularak karşılaştırılmasına oran denir.",[["title","Oran","2. Kitap · s. 38–42"]]],
 ["Yazılış","Bir sınıfta on iki kız ve on sekiz erkek varsa, kızların erkeklere oranı on iki bölü on sekiz, sadeleşince üçte ikidir. İkiye üç diye de yazılır.",[["eq","12 : 18 = 2 : 3",140],["eq","12/18 = 2/3",230," st-cyan"]]],
 ["Anlamı","İkiye üç demek: her iki kıza karşılık üç erkek var demektir. Altı grup olunca on iki kız ve on sekiz erkek eder.",[["svg",ratioDotsSVG(2,3,6),40,140,720,140],["txt","her grupta 2 kız : 3 erkek",340," st-cyan"]]],
 ["Tuzak","Tuzak: sırayı karıştırmak. Kızların erkeklere oranı ile erkeklerin kızlara oranı farklıdır. İkiye üç ile üçe iki aynı değildir.",[["trap","2 : 3 ≠ 3 : 2"]]],
 ["Kurallar","Kuralları toplayalım.",[["rules",["Oran = çarpımsal karşılaştırma","a : b ya da a/b biçiminde yazılır","Sıra önemlidir"],120]]]],
"6-2":[
 ["Görev","Oranlanan nicelikler aynı birimdeyse birimsiz oran, farklı birimdeyse birimli oran olur.",[["title","Birimli ve Birimsiz Oran","2. Kitap · s. 43–46"]]],
 ["Birimsiz","On iki santimetrenin dört santimetreye oranı üçtür. Birimler sadeleşir, birim kalmaz.",[["eq","12 cm / 4 cm = 3",150," st-ok"],["txt","Aynı birim → birimsiz oran",240," st-cyan"]]],
 ["Birimli","Yüz elli kilometrenin iki saate oranı, saatte yetmiş beş kilometredir. Birim kalır: kilometre bölü saat.",[["eq","150 km / 2 saat = 75 km/saat",150," st-ok"],["txt","Farklı birim → birimli oran",240," st-cyan"]]],
 ["Tuzak","Tuzak: aynı tür ama farklı yazılmış birimler. Bir metre ile elli santimetre aynı türdür. Önce birimleri eşitle: yüz santimetrenin elli santimetreye oranı ikidir ve birimsizdir.",[["eq","1 m / 50 cm = 100 cm / 50 cm = 2",140],["trap","Önce birimleri eşitle!"]]]],
"6-3":[
 ["Görev","Aynı çarpımsal ilişkiye sahip oranlara denk oranlar denir.",[["title","Denk Oran","2. Kitap · s. 47–50"]]],
 ["Genişletme","Üçte ikinin payını ve paydasını dörtle çarparsak on ikide sekiz olur. Bunlar denk oranlardır.",[["eq","2/3 = (2·4)/(3·4) = 8/12",160," st-ok"]]],
 ["Örnek","Beşte üç, yirmide kaça denktir? Beşi dörtle çarpınca yirmi olur; üçü de dörtle çarparız: on iki.",[["eq","3/5 = ?/20",130],["eq","? = 3 · 4 = 12",220," st-ok"]]],
 ["Tuzak","Tuzak: toplama yapmak. Payda beşten yirmiye on beş arttı diye paya da on beş eklemek yanlıştır. Denk oranda toplama değil, çarpma vardır!",[["eq","3/5 ≠ 18/20",140," st-bad"],["trap","Toplama değil, çarpma!"]]]],
"6-4":[
 ["Görev","Niceliklerinden biri bir olan orana birim oran denir. Bir kilogramın fiyatı ya da bir saatte gidilen yol gibi.",[["title","Birim Oran","2. Kitap · s. 51–56"]]],
 ["Bulma","Üç kilogram elma doksan lira ise, bir kilogramı doksan bölü üç, otuz liradır.",[["eq","90 TL / 3 kg = 30 TL/kg",160," st-ok"]]],
 ["Karşılaştırma","Hangi paket daha ucuz? A paketi dört adet altmış lira, B paketi altı adet seksen dört lira. Birim fiyatlar on beş ve on dört lira. B paketi daha ucuz.",[["lines",["A: 60 : 4 = 15 TL/adet","B: 84 : 6 = 14 TL/adet","→ B daha ucuz"],140]]],
 ["Tuzak","Tuzak: sadece toplam fiyata bakmak. Altmış lira daha az görünür ama birim fiyatı daha pahalıdır!",[["trap","Toplama değil, birime bak!"]]]],
"6-5":[
 ["Görev","Aynı çarpımsal ilişkiye sahip iki oranın eşitliğine orantı denir.",[["title","Orantı","2. Kitap · s. 57–61"]]],
 ["Örnek","Üçte iki ile on ikide sekiz eşit olduğu için orantı oluştururlar.",[["eq","2/3 = 8/12",160," st-ok"]]],
 ["İçler dışlar","Bir orantıda içler çarpımı dışlar çarpımına eşittir. İki çarpı on iki yirmi dört, üç çarpı sekiz de yirmi dört.",[["eq","2 · 12 = 3 · 8 = 24",160," st-ok"],["txt","İçler çarpımı = dışlar çarpımı",250," st-cyan"]]],
 ["Tuzak","Tuzak: iki oran birbirine benziyor diye orantı sanmak. Üçte iki ile dörtte üç orantı değildir: sekiz, dokuza eşit değil.",[["eq","2 · 4 = 8 ≠ 9 = 3 · 3",140," st-bad"],["trap","Çarpımları kontrol et!"]]]],
"6-6":[
 ["Görev","İki nicelikten biri kaç katına çıkarken diğeri de aynı katına çıkıyorsa, bu nicelikler doğru orantılıdır.",[["title","Doğru Orantı Problemleri","2. Kitap · s. 62–68"]]],
 ["Örnek","Beş defter yetmiş beş lira ise sekiz defter kaç lira? Önce bir defter: yetmiş beş bölü beş, on beş lira. Sekiz defter: sekiz çarpı on beş, yüz yirmi lira.",[["lines",["1 defter: 75 : 5 = 15 TL","8 defter: 8 · 15 = 120 TL"],170]]],
 ["Tablo","Doğru orantıda tablodaki bütün oranlar aynıdır. Her sütunda fiyat, defter sayısının on beş katıdır.",[["table",[["Defter","1","2","5","8"],["TL","15","30","75","120"]],150]]],
 ["Tuzak","Tuzak: her ilişkiyi doğru orantı sanmak. Bir işi yapan işçi sayısı artınca süre azalır; bu doğru orantı değildir.",[["trap","Biri artarken öbürü azalıyorsa doğru orantı değil!"]]]],
"7-1":[
 ["Görev","Bir deneyin sonucunda elde edilebilecek çıktıların tamamına örnek uzay, istediğimiz çıktılara olay denir.",[["title","Teorik Olasılık","2. Kitap · s. 76–78"]]],
 ["Zar","Bir zar atıldığında örnek uzay bir, iki, üç, dört, beş ve altıdır. Altı çıktı vardır.",[["svg",diceSVG(),130,110,540,100],["eq","Örnek uzay = {1, 2, 3, 4, 5, 6}",290]]],
 ["Formül","Olasılık, istenen çıktı sayısının tüm çıktı sayısına bölümüdür. Çift sayı gelme olasılığı: altıda üç, yani ikide birdir.",[["eq","P = istenen / tüm çıktılar",130],["eq","P(çift) = 3/6 = 1/2",220," st-ok"]]],
 ["Sınırlar","Olasılık sıfır ile bir arasındadır. İmkânsız olayın olasılığı sıfır, kesin olayın olasılığı birdir.",[["lines",["P(7 gelmesi) = 0 → imkânsız","P(6 veya daha küçük) = 1 → kesin"],170]]],
 ["Tuzak","Tuzak: istenen çıktıları istenmeyenlere bölmek. Üçte üç değil, altıda üç! Payda her zaman tüm çıktılardır.",[["trap","Payda = tüm çıktılar"]]]],
"7-2":[
 ["Görev","Örnek uzayda bir olaya ait çıktıların dışında kalan tüm çıktılara o olayın tümleyeni denir.",[["title","Tümleyen Olay","2. Kitap · s. 79–81"]]],
 ["Örnek","Torbada üç kırmızı ve beş mavi top var. Kırmızı gelme olayının tümleyeni, kırmızı gelmemesi, yani mavi gelmesidir.",[["svg",bagSVG([[COLORS[0],3],[COLORS[1],5]]),240,70,320,260]]],
 ["Toplam bir","Bir olay ile tümleyeninin olasılıkları toplamı birdir. Kırmızı sekizde üç, kırmızı değil sekizde beş.",[["eq","3/8 + 5/8 = 1",150," st-ok"],["eq","P(A′) = 1 − P(A)",240," st-cyan"]]],
 ["İpucu","Kısa yol: tümleyeni bulmak için çıktıları tek tek saymak yerine birden olasılığı çıkar.",[["tip","1 − P(A)"]]]],
"7-3":[
 ["Görev","Olasılıkları eşit olan olaylara eşit olasılıklı olaylar denir.",[["title","Eşit Olasılıklı Olaylar","2. Kitap · s. 82–84"]]],
 ["Zar","Hilesiz bir zarda her yüzün gelme olasılığı altıda birdir. Hepsi eşit olasılıklıdır.",[["svg",diceSVG(),130,110,540,100],["eq","P(1) = P(2) = … = P(6) = 1/6",290]]],
 ["Torba","Torbada dört kırmızı ve dört mavi top varsa, kırmızı ve mavi çekmek eşit olasılıklıdır. Beş kırmızı ve üç mavi olsaydı eşit olmazdı.",[["svg",bagSVG([[COLORS[0],4],[COLORS[1],4]]),240,60,320,250],["eq","4/8 = 4/8 ✓",380," st-ok"]]],
 ["Tuzak","Tuzak: iki renk var diye olasılıkların yarı yarıya olduğunu sanmak. Top sayıları farklıysa olasılıklar da farklıdır!",[["trap","2 renk ≠ yarı yarıya"]]]],
"7-4":[
 ["Görev","Aynı anda gerçekleşemeyen olaylara ayrık olaylar denir.",[["title","Ayrık Olaylar","2. Kitap · s. 85–88"]]],
 ["Ayrık","Zar atıldığında çift sayı gelmesi ile beş gelmesi ayrıktır; ortak çıktıları yoktur.",[["lines",["A = {2, 4, 6}","B = {5}","Ortak çıktı yok → ayrık"],140]]],
 ["Ayrık değil","Çift sayı gelmesi ile üçten büyük gelmesi ayrık değildir; ortak çıktıları dört ve altıdır.",[["lines",["A = {2, 4, 6}","B = {4, 5, 6}","Ortak: {4, 6} → ayrık değil"],140]]],
 ["Veya","A veya B olasılığını bulurken ortak çıktıları iki kez saymayız. Çift veya üçten büyük: iki, dört, beş, altı. Altıda dört.",[["eq","A veya B = {2, 4, 5, 6} → 4/6 = 2/3",150," st-ok"],["trap","Ortakları iki kez sayma!"]]]],
"8-1":[
 ["Görev","Bilinmeyen nicelikleri harflerle gösteririz. Bu harflere değişken denir.",[["title","Cebirsel İfadeler","2. Kitap · s. 95–109"]]],
 ["Terimler","Üç x artı beş ifadesinde iki terim vardır. Üç, x'in katsayısıdır. Beş ise sabit terimdir.",[["eq","3x + 5",120],["lines",["3 → katsayı","x → değişken","5 → sabit terim"],200," st-cyan"]]],
 ["Benzer terimler","Aynı değişkeni içeren terimlere benzer terim denir. Benzer terimler toplanır: üç x artı iki x, beş x eder.",[["eq","3x + 2x = 5x",140," st-ok"],["eq","3x + 2 ≠ 5x",230," st-bad"]]],
 ["Dağılma","Parantezin önündeki sayıyı içerideki her terimle çarparız: üç çarpı, x eksi iki, üç x eksi altı eder.",[["eq","3(x − 2) = 3x − 6",160," st-ok"]]],
 ["Tuzak","Tuzak: parantezin yalnızca ilk terimini çarpmak. Üç x eksi iki yazmak yanlıştır; ikinci terimi de çarp!",[["trap","3(x − 2) ≠ 3x − 2"]]]],
"8-2":[
 ["Görev","İçinde en az bir bilinmeyen bulunan eşitliklere denklem denir. Bilinmeyen değeri bulmaya denklem çözme denir.",[["title","Denklemler","2. Kitap · s. 110–130"]]],
 ["Terazi","Denklem dengedeki bir terazi gibidir. Üç x artı dört, on dokuza eşit.",[["svg",balanceSVG(3,4,19),180,60,440,260],["eq","3x + 4 = 19",395]]],
 ["Çözüm","Dengeyi bozmadan iki taraftan da dört çıkarırız: üç x, on beş. Sonra iki tarafı üçe böleriz: x, beş.",[["lines",["3x + 4 = 19","3x = 15   (iki taraftan 4 çıkar)","x = 5   (iki tarafı 3'e böl)"],130]]],
 ["Kontrol","Bulduğun değeri yerine koyup kontrol et: üç çarpı beş artı dört, on dokuz. Doğru!",[["eq","3 · 5 + 4 = 19 ✓",160," st-ok"]]],
 ["Tuzak","Tuzak: işlemi yalnızca bir tarafa yapmak. Terazinin bir kefesinden alırsan, diğerinden de almalısın!",[["trap","İki tarafa aynı işlem!"]]]],
"8-3":[
 ["Görev","Büyüktür, küçüktür, büyük eşittir ve küçük eşittir işaretleriyle kurulan ifadelere eşitsizlik denir.",[["title","Eşitsizlikler","2. Kitap · s. 131–149"]]],
 ["Çözüm","x artı üç büyüktür yedi. İki taraftan üç çıkarırız: x büyüktür dört. Dört bu eşitsizliği sağlamaz; beş, altı, yedi sağlar.",[["eq","x + 3 &gt; 7  →  x &gt; 4",110],["line",0,8,{y:280,ray:[4,1,true]}]]],
 ["Eşit dâhil","Büyük eşittir işaretinde sınır sayısı da dâhildir. x büyük eşittir dört ise dört de çözümdür; dolu yuvarlakla gösterilir.",[["eq","x ≥ 4",110],["line",0,8,{y:280,ray:[4,1,false]}]]],
 ["Tuzak","Tuzak: büyüktür işaretinde sınır sayısını çözüm sanmak. x büyüktür dört ise en küçük tam sayı beştir, dört değil!",[["trap","x &gt; 4 → 4 dâhil değil"]]]],
"8-4":[
 ["Görev","Matematikte doğru ya da yanlış olduğu kesin olan ifadelere önerme denir. Bir önermenin her durumda doğru olduğunu göstermeye ispat denir.",[["title","İspat","2. Kitap · s. 150–157"]]],
 ["Örnekler yetmez","İki tek sayının toplamı çifttir. Bir artı üç dört, beş artı yedi on iki. Ama birkaç örnek, her durumda doğru olduğunu kanıtlamaz.",[["lines",["1 + 3 = 4 ✓","5 + 7 = 12 ✓","… ama bütün tek sayılar için mi?"],140]]],
 ["İspat","Tek sayılar iki a artı bir biçimindedir. İki tek sayının toplamı: iki a artı bir, artı iki b artı bir. Bu da iki çarpı, a artı b artı bir eder. İkiyle çarpılmış her tam sayı çifttir.",[["lines",["(2a + 1) + (2b + 1)","= 2a + 2b + 2","= 2(a + b + 1) → çift ✓"],140]]],
 ["Karşıt örnek","Bir önermenin yanlış olduğunu göstermek için tek bir örnek yeter. Buna karşıt örnek denir. Her asal sayı tektir önermesi yanlıştır: iki asaldır ama çifttir.",[["txt","“Her asal sayı tektir.” ✗",140," st-bad"],["txt","Karşıt örnek: 2",230," st-ok"]]],
 ["Tuzak","Tuzak: birkaç örnek doğru çıktı diye ispatladım sanmak. Doğruluk için genel bir ispat, yanlışlık için tek bir karşıt örnek gerekir. Şimdi oyunda önermeleri ve karşıt örnekleri sen bulacaksın.",[["rules",["Doğru mu? → genel ispat gerekir","Yanlış mı? → bir karşıt örnek yeter"],140]]]],
"8-5":[
 ["Görev","Bir problemi çözmek için izlenen sıralı adımlara algoritma denir.",[["title","Algoritma","2. Kitap · s. 158–166"]]],
 ["Örnek","Aklından bir sayı tut, üçle çarp, dört ekle. Sonuç on dokuz ise sayı kaçtı? Adımları tersten ve ters işlemle uygularız: on dokuz eksi dört on beş, on beş bölü üç beş.",[["lines",["Sayı → · 3 → + 4 → 19","19 − 4 = 15","15 : 3 = 5"],140]]],
 ["Adım adım","Algoritmayı adım adım yazarız: başla, sayıyı al, işlemleri sırayla yap, sonucu yaz, bitir.",[["rules",["1. Başla","2. Sayıyı al","3. 3 ile çarp, 4 ekle","4. Sonucu yaz","5. Bitir"],80]]],
 ["Tuzak","Tuzak: geri giderken işlemleri aynı sırayla yapmak. Tersten giderken önce son işlemi geri al!",[["trap","Tersten git, ters işlem yap!"]]]],
"9-1":[
 ["Görev","Bir çember ile içindeki tüm noktaların oluşturduğu şekle daire denir. Merkezi çemberdeki bir noktaya birleştiren doğru parçasına yarıçap denir.",[["title","Dairenin Alanı","2. Kitap · s. 174–178"]]],
 ["Neden π·r²?","Daireyi on iki eş dilime keselim ve dilimleri sırayla bir yukarı, bir aşağı dizelim. Neredeyse bir dikdörtgen oluşur! Uzun kenarı çemberin yarısı, yani pi çarpı r. Kısa kenarı yarıçap, yani r. Alanı da pi çarpı r çarpı r, yani pi r kare olur.",[["circleStrip"]]],
 ["Formül","Dairenin alanı pi çarpı yarıçapın karesidir. Kitapta pi üç alınır.",[["svg",circleSVG(5),220,50,360,240],["eq","A = π · r²   (π = 3)",380]]],
 ["Örnek","Yarıçapı beş santimetre olan dairenin alanı: üç çarpı beşin karesi, üç çarpı yirmi beş, yetmiş beş santimetrekare.",[["eq","3 · 5² = 3 · 25 = 75 cm²",160," st-ok"]]],
 ["Tuzak","Tuzak: yarıçap yerine çapı kullanmak. Çap on ise yarıçap beştir! Alan ile çevreyi de karıştırma: çevre iki pi r, alan pi r karedir.",[["trap","Çap ≠ yarıçap"],["txt","Çevre = 2πr     Alan = πr²",440," st-cyan"]]]],
"9-2":[
 ["Görev","İki yarıçap ve aralarındaki yayın oluşturduğu parçaya daire dilimi denir. Yarıçaplar arasındaki açıya merkez açı denir.",[["title","Daire Diliminin Alanı","2. Kitap · s. 179–185"]]],
 ["Kesir","İzle: dilim sıfırdan altmış dereceye kadar açılıyor. Merkez açısı altmış derece olan dilim, dairenin üç yüz altmışta altmışı, yani altıda biridir.",[["sweep",6,60]]],
 ["Örnek","Yarıçap altı ise dairenin alanı üç çarpı otuz altı, yüz sekiz santimetrekare. Dilim bunun altıda biri: on sekiz santimetrekare.",[["lines",["Daire: 3 · 6² = 108 cm²","Dilim: 108 · 1/6 = 18 cm²"],170]]],
 ["Tuzak","Tuzak: merkez açıyı yüz seksene bölmek. Tam tur üç yüz altmış derecedir!",[["trap","Tam tur = 360°"]]]],
"9-3":[
 ["Görev","Dört kenarı eşit uzunlukta olan dörtgene eşkenar dörtgen denir. Köşegenleri birbirini dik keser.",[["title","Eşkenar Dörtgenin Alanı","2. Kitap · s. 186–190"]]],
 ["Formül","Eşkenar dörtgenin alanı, köşegen uzunluklarının çarpımının yarısıdır.",[["svg",rhombusSVG(8,6),220,50,360,240],["eq","A = (e · f) : 2",380]]],
 ["Neden yarısı?","Eşkenar dörtgeni, kenarları köşegenler kadar olan bir dikdörtgenin içine koyalım. İzle: eşkenar dörtgenin dört üçgen parçası dönünce dikdörtgenin boş köşelerini tam dolduruyor. Demek ki eşkenar dörtgen, dikdörtgenin yarısıdır.",[["rhombusFold"]]],
 ["Örnek","Köşegenleri sekiz ve altı santimetre olan eşkenar dörtgenin alanı: sekiz çarpı altı bölü iki, yirmi dört santimetrekare. İkiye bölmeyi unutma!",[["eq","8 · 6 : 2 = 24 cm²",150," st-ok"],["trap","İkiye bölmeyi unutma!"]]]],
"9-4":[
 ["Görev","Karşılıklı iki kenarı paralel olan dörtgene yamuk denir. Paralel kenarlara alt taban ve üst taban denir.",[["title","Yamuğun Alanı","2. Kitap · s. 191–199"]]],
 ["Formül","Yamuğun alanı: tabanların toplamı çarpı yükseklik, bölü iki.",[["svg",trapSVG(12,6,5),220,50,360,240],["eq","A = (a + c) · h : 2",380]]],
 ["Neden?","Yamuğun bir kopyasını yan kenarının ortası etrafında ters çevirip yanına koyalım. İkisi birlikte, tabanı a artı c, yüksekliği h olan bir paralelkenar oluşturur. Yamuk, bu paralelkenarın tam yarısıdır.",[["trapDouble"]]],
 ["Örnek","Alt taban on iki, üst taban altı, yükseklik beş ise: on sekiz çarpı beş bölü iki, kırk beş santimetrekare.",[["eq","(12 + 6) · 5 : 2 = 45 cm²",160," st-ok"]]],
 ["Tuzak","Tuzak: yükseklik yerine yan kenarı kullanmak. Yükseklik tabanlara diktir; dik açı işaretini ara!",[["trap","Yan kenar ≠ yükseklik"]]]],
"9-5":[
 ["Görev","Bu derste daire, dilim, eşkenar dörtgen ve yamuk alanlarını gerçek hayat problemlerinde kullanacağız.",[["title","Alan Problemleri","2. Kitap · s. 200–204"]]],
 ["Formüller","Önce şeklin hangisi olduğunu buluruz, sonra doğru formülü seçeriz.",[["rules",["Daire: π · r²","Dilim: π · r² · α/360","Eşkenar dörtgen: e · f : 2","Yamuk: (a + c) · h : 2"],90]]],
 ["Örnek","Yarıçapı on metre olan dairesel bir parkın dörtte biri çimdir. Park üç yüz metrekare, çim alanı bunun dörtte biri: yetmiş beş metrekare.",[["lines",["Park: 3 · 10² = 300 m²","Çim: 300 · 1/4 = 75 m²"],170]]],
 ["Tuzak","Tuzak: birimi yanlış yazmak. Alan her zaman kare birimle yazılır: metrekare ya da santimetrekare.",[["trap","Alan → m², cm²"]]]],
};
LESSONS.forEach(l=>{l.script=SCRIPTS[l.id]||null});
