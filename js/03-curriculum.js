"use strict";
/* Matematik 7 Oyunları · The curriculum: 9 themes and 43 lessons with book pages */
/* ================= game list ================= */
const G=[
 {id:1,book:1,hue:'#22e4ff',name:'Sayı Doğrusu Avı',tema:'Sayılar ve Nicelikler (1)',pages:'s. 17–113',topics:'Tam sayılar, rasyonel sayılar, mutlak değer, devirli ondalık gösterim, işlemler',gen:g1,brief:true},
 {id:2,book:1,hue:'#9b7bff',name:'Kutu Atölyesi',tema:'Geometrik Nicelikler (1)',pages:'s. 121–156',topics:'Prizmanın açınımı ve yüzey alanı, hacim, hacim ölçme birimleri, litre',gen:g2},
 {id:3,book:1,hue:'#ff4fd8',name:'Veri Dedektifi',tema:'İstatistiksel Araştırma Süreci',pages:'s. 162–196',topics:'Kategorik ve nicel veri, aritmetik ortalama, ortanca, tepe değer, açıklık',gen:g3},
 {id:4,book:1,hue:'#3dffa2',name:'Simetri Aynası',tema:'Dönüşüm',pages:'s. 204–215',topics:'Yansıma dönüşümü, simetri doğrusu, orta dikme ve açıortay',gen:g4},
 {id:5,book:2,hue:'#ffc83d',name:'Üçgenin Gizli Çizgileri',tema:'Geometrik Şekiller',pages:'s. 16–31',topics:'Açıortay, yükseklik, kenar orta dikme, kenarortay',gen:g5},
 {id:6,book:2,hue:'#ff7a59',name:'Oran Pazarı',tema:'Sayılar ve Nicelikler (2)',pages:'s. 38–68',topics:'Birimli ve birimsiz oran, denk oran, birim oran, orantı, doğru orantı',gen:g6},
 {id:7,book:2,hue:'#4f8bff',name:'Şans Torbası',tema:'Veriden Olasılığa',pages:'s. 76–88',topics:'Teorik olasılık, tümleyen olay, eşit olasılıklı olaylar, ayrık olaylar',gen:g7},
 {id:8,book:2,hue:'#ff9f1c',name:'Denge Terazisi',tema:'İşlemlerle Cebirsel Düşünme',pages:'s. 95–166',topics:'Cebirsel ifadeler, denklemler, eşitsizlikler, algoritma',gen:g8},
 {id:9,book:2,hue:'#7dff5a',name:'Alan Avcısı',tema:'Geometrik Nicelikler (2)',pages:'s. 174–204',topics:'Daire, daire dilimi, eşkenar dörtgen, yamuk (π = 3)',gen:g9},
];

/* ================= course map: every lesson of both books (contents pages, MEB 7. sınıf Matematik 1. ve 2. kitap) ================= */
/* [theme, title, book pages, search words, question maker or null (game in Stage 3), Theme-1 briefing scene or null] */
const TH_TEST={1:'114',2:'157',3:'197',4:'216',5:'32',6:'69',7:'89',8:'167',9:'205'};
const LS=[
 [1,'Tam sayılar','17–24','negatif pozitif ters işaretli sayı doğrusu',g1Tam,1],
 [1,'Rasyonel sayılar','25–34','kesir ondalık sayı doğrusu',()=>g1Rat('line'),7],
 [1,'Mutlak değer','35–40','uzaklık sıfıra uzaklık',()=>pick([()=>g1Int('abs'),()=>g1Rat('abs'),g1Dist])(),6],
 [1,'Rasyonel sayıların farklı temsilleri','41–49','kesir ondalık devirli tam sayılı kesir',()=>pick([g1Repeat,()=>g1Rat('line')])(),8],
 [1,'Rasyonel sayılarda karşılaştırma ve sıralama','50–61','büyük küçük sıralama',g1Compare,2],
 [1,'Tam sayılarla işlemler ve problem çözme','62–81','toplama çıkarma çarpma bölme işaret kuralı',()=>g1Int(pick(['add','sub','mul','div'])),3],
 [1,'Rasyonel sayılarla işlemler ve problem çözme','82–107','kesir toplama çıkarma çarpma bölme',g1RatOps,null],
 [1,'Çok adımlı işlemler','108–113','işlem önceliği parantez',g1Multi,null],
 [2,'Cisimlerin farklı yönlerden görünümleri','121–124','önden üstten yandan görünüm küp yapı 3B',()=>g2Views(),null],
 [2,'Dikdörtgenler prizmasının açınımı ve yüzey alanı','125–137','açınım yüzey alanı prizma',()=>g2(['S','S','bilgi']),null],
 [2,'Dikdörtgenler prizmasının hacim bağıntısı','138–143','hacim en boy yükseklik',()=>g2(['V','V','eksik']),null],
 [2,'Hacim ölçme birimleri','144–151','litre cm³ dm³ m³ mililitre birim dönüşümü',()=>g2(['donusum']),null],
 [2,'Yüzey alanı ve hacim problemleri','152–156','akvaryum problem',()=>g2(['akvaryum','V','S','eksik']),null],
 [3,'Kategorik ve nicel veri dağılımları','162–164','kategorik nicel kesikli sürekli veri türü',()=>g3(['type']),null],
 [3,'Araştırma sorusunu belirleme','165–168','istatistiksel soru',()=>g3(['soru']),null],
 [3,'Verileri toplama ve analize hazırlama','169–170','anket gözlem deney ölçme',()=>g3(['toplama']),null],
 [3,'Veri analizi: görselleştirme ve özetleme','171–172','ortalama ortanca tepe değer açıklık grafik',()=>g3(['ort','med','tepe','acik']),null],
 [3,'Veriyi yorumlama ve karar verme','173–189','yorum karar ortalama ortanca',()=>g3(['ort','med','tepe','acik','surec']),null],
 [3,'İstatistiksel araştırma süreçlerinin incelenmesi','190–196','süreç adımları araştırma',()=>g3(['surec','soru','toplama']),null],
 [4,'Yansıma dönüşümü','204–210','simetri doğrusu ayna görüntü',()=>g4(['grid']),null],
 [4,'Orta dikme ve açıortay inşası','211–215','pergel inşa orta dikme açıortay',()=>g4(['concept']),null],
 [5,'Üçgende açıortay, yükseklik, kenar orta dikme ve kenarortay','16–27','üçgen çizgileri yükseklik',()=>g5(),null],
 [5,'Üçgende kenarortay ve inşası','28–31','kenarortay orta nokta',()=>g5(['kenarortay']),null],
 [6,'Oran','38–42','oran karşılaştırma',()=>g6(['oran']),null],
 [6,'Birimli ve birimsiz oran','43–46','birim',()=>g6(['birimli']),null],
 [6,'Denk oran','47–50','denk kesir genişletme',()=>g6(['denk']),null],
 [6,'Birim oran','51–56','birim fiyat ucuz',()=>g6(['birim','ucuz']),null],
 [6,'Orantı','57–61','içler dışlar çarpımı',()=>g6(['oranti','denk']),null],
 [6,'Doğru orantı problemleri','62–68','tarif fiyat doğru orantı',()=>g6(['dogru','tarif']),null],
 [7,'Teorik olasılık','76–78','zar torba top olasılık',()=>g7(['renk','zar']),null],
 [7,'Tümleyen olay','79–81','olmama tümleyen',()=>g7(['degil','tum']),null],
 [7,'Eşit olasılıklı olaylar','82–84','eşit olasılık',()=>g7(['esit','renk']),null],
 [7,'Ayrık ve ayrık olmayan olaylar','85–88','ayrık veya',()=>g7(['ayrik','veya']),null],
 [8,'Cebirsel ifadelerle işlemler','95–109','benzer terim sadeleştirme dağılma cebir',()=>g8(['sade','dagil','deger']),null],
 [8,'Denklemler','110–130','denklem bilinmeyen terazi',()=>g8(['denk']),null],
 [8,'Eşitsizlikler','131–149','büyüktür küçüktür eşitsizlik',()=>g8(['esitsiz']),null],
 [8,'İspat','150–157','ispat gerekçe önerme karşıt örnek',()=>g8Proof(),null],
 [8,'Algoritmayı yapılandırma','158–166','algoritma adım',()=>g8(['algo']),null],
 [9,'Dairenin alanı','174–178','daire pi yarıçap alan',()=>g9(['daire']),null],
 [9,'Daire diliminin alanı','179–185','dilim merkez açı',()=>g9(['dilim']),null],
 [9,'Eşkenar dörtgenin alanı','186–190','köşegen eşkenar dörtgen',()=>g9(['esk']),null],
 [9,'Yamuğun alanı','191–199','yamuk taban yükseklik',()=>g9(['yamuk']),null],
 [9,'Alan problemleri','200–204','daire dilim eşkenar dörtgen yamuk problem',()=>g9(['problem','daire','dilim','esk','yamuk']),null]];
const LESSONS=[];{const c={};for(const [th,t,p,kw,gen,learn] of LS){c[th]=(c[th]||0)+1;LESSONS.push({th,id:`${th}-${c[th]}`,no:`${th}.${c[th]}`,t,p,kw,gen,learn,book:th<=4?1:2})}}
const nextLesson=l=>LESSONS.slice(LESSONS.indexOf(l)+1).find(x=>x.gen)||null;
const fold=s=>s.toLocaleLowerCase('tr').replace(/ı/g,'i').replace(/ş/g,'s').replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ö/g,'o').replace(/ç/g,'c').replace(/â/g,'a');
function setLast(hash,label){ST.set('m7-last',{hash,label})}
