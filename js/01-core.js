"use strict";
/* Matematik 7 Oyunları · Helpers, misconception catalogue, skill names */
/* ================= helpers ================= */
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a||1};
const neg=n=>n<0?'−'+Math.abs(n):''+n;
const par=n=>n<0?'('+neg(n)+')':''+n;
const num=x=>{const r=Math.round(x*1000)/1000;return (r<0?'−':'')+String(Math.abs(r)).replace('.',',')};
const X='<i>x</i>';
/* pause-aware wait: time does not run while the briefing is paused */
const wait=ms=>new Promise(r=>{let left=ms,last=performance.now();const tick=()=>{const now=performance.now();if(!B.paused)left-=now-last;last=now;if(left<=0)r();else setTimeout(tick,Math.min(60,left))};setTimeout(tick,Math.min(60,Math.max(0,ms)))});
const RM=typeof matchMedia!=='undefined'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function frRaw(t,b){return `<span class="fr"><span class="fr-b"><span>${t}</span><span>${b}</span></span></span>`}
function fr(n,d,simplify=true){
  if(d<0){n=-n;d=-d}
  if(simplify){const g=gcd(n,d);n/=g;d/=g}
  if(d===1)return neg(n);
  return `<span class="fr">${n<0?'−':''}<span class="fr-b"><span>${Math.abs(n)}</span><span>${d}</span></span></span>`;
}
function lin(a,b){let s='';if(a!==0)s=(a===1?'':a===-1?'−':neg(a))+X;if(b!==0){s+=s?(b<0?' − ':' + ')+Math.abs(b):neg(b)}return s||'0'}
function terms(list){let s='';list.forEach(([c,v],i)=>{const body=(v&&Math.abs(c)===1?'':Math.abs(c))+(v?X:'');s+=i===0?(c<0?'−':'')+body:(c<0?' − ':' + ')+body});return s}
function choice(correct,wrongs){const seen=new Set([correct]);const w=[];for(const x0 of wrongs){const x=typeof x0==='string'?{h:x0,mis:null}:x0;if(!seen.has(x.h)){seen.add(x.h);w.push(x)}if(w.length===3)break}
  return shuffle([{html:correct,ok:true},...w.map(x=>({html:x.h,ok:false,mis:x.mis}))])}
const P=p=>p.map(v=>v.toFixed(1)).join(',');
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1]], add2=(a,b)=>[a[0]+b[0],a[1]+b[1]], mul=(a,k)=>[a[0]*k,a[1]*k];
const len=a=>Math.hypot(a[0],a[1]), unit=a=>mul(a,1/len(a)), dot=(a,b)=>a[0]*b[0]+a[1]*b[1], cross=(a,b)=>a[0]*b[1]-a[1]*b[0];
const ST={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* ================= misconceptions (Tema 1) ================= */
const M={
 sign:{m:'İşaret Canavarı',c:'#ff5a6e',t:'Sonucun işaretini ters buluyor',s:`Önce yönü sor: sağa mı gidiyorum, sola mı? Büyük adım hangi yöndeyse sonuç o taraftadır.`,d:`Farklı işaretli iki tam sayı toplanırken mutlak değerler çıkarılır; sonuç, mutlak değeri büyük olanın işaretini alır: (−7) + 4 → 7 − 4 = 3 ve büyük olan −7 olduğu için sonuç −3.`,p:'int-add'},
 doubleNeg:{m:'Çifte Eksi Canavarı',c:'#ff4fd8',t:'Negatif bir sayıyı çıkarırken işareti çevirmeyi unutuyor',s:`Çıkarma = tersini topla. "− (−4)" gördüğün anda "+ 4" yaz.`,d:`a − b = a + (−b). b negatifse −b pozitiftir; yani negatif bir sayıyı çıkarmak sayı doğrusunda sağa gitmektir: 2 − (−4) = 2 + 4 = 6.`,p:'int-sub'},
 mulSign:{m:'Kural Karıştıran',c:'#9b7bff',t:'Çarpma ve bölmede işaret kuralını karıştırıyor',s:`Aynı işaretler dost: sonuç artı. Farklı işaretler küs: sonuç eksi.`,d:`−1 ile çarpmak bir sayıyı sıfıra göre yansıtır. İki yansıma sayıyı eski yönüne döndürür: (−a)·(−b) = a·b. Bu kural yalnızca çarpma ve bölme içindir; toplamada geçerli değildir.`,p:'int-mul'},
 offByOne:{m:'Bir Kaydıran',c:'#ffc83d',t:'Sayı doğrusunda bir adım fazla veya eksik sayıyor',s:`Çentikleri değil, atlamaları say. Başladığın yer "sıfırıncı adım"dır.`,d:`İki nokta arasındaki uzaklık, aradaki çentik sayısı değil aralık sayısıdır ("çit direği" hatası). −3'ten sağa 5 adım: −2, −1, 0, 1, 2 → 2.`,p:'int-add'},
 absSkip:{m:'Mutlak Kaçağı',c:'#22e4ff',t:'Mutlak değeri uygulamadan işlem yapıyor',s:`| | içindekini önce sıfıra uzaklığa çevir. Uzaklık asla eksi olmaz.`,d:`|a| = a (a ≥ 0 ise), |a| = −a (a < 0 ise). Önce her mutlak değeri hesapla, sonra dışarıdaki işlemi yap: |−6| − |−2| = 6 − 2 = 4. Dışarıdaki eksi ise kalır: −|−4| = −4.`,p:'abs'},
 mixedDir:{m:'Ters Yön Canavarı',c:'#3dffa2',t:'Negatif tam sayılı kesirde kesri ters yöne koyuyor',s:`−1¼ demek "−1 ve biraz daha SOLA" demek. Kesir de aynı yöne gider.`,d:`−1¼ = −(1 + ¼) = −1 − ¼ = −5/4. Eksi işareti tam kısmı ve kesri birlikte etkiler; −1 + ¼ (= −3/4) ile karıştırma.`,p:'rat-line'},
 negIllusion:{m:'Büyüklük İllüzyonu',c:'#ff8a3d',t:'Negatif sayılarda rakamı büyük olanı daha büyük sanıyor',s:`Negatiflerde "büyük görünen küçüktür". Sayı doğrusunda sağdaki büyüktür.`,d:`a < b ise −a > −b. Sıfırdan sola uzaklaştıkça sayılar küçülür: −8 < −3, çünkü −8 sayı doğrusunda daha soldadır.`,p:'compare'},
 maxMin:{m:'Ters Soru Canavarı',c:'#7c9bff',t:'"En büyük" ile "en küçük" sorusunu karıştırıyor',s:`Cevap vermeden önce soruyu yüksek sesle oku ve anahtar kelimeyi parmağınla göster.`,d:`Bu bir kavram değil, okuma ve dikkat hatasıdır. Sayıları önce küçükten büyüğe sırala, sonra sorunun istediği ucu seç.`,p:'compare'},
 convert:{m:'Çevirme Canavarı',c:'#c86bff',t:'Kesir ile ondalık gösterim arasında çevirme hatası yapıyor',s:`Kesri ondalığa çevirmek için payı paydaya böl: 3/4 = 3 : 4 = 0,75.`,d:`Paydası 10, 100, 1000 yapılabilen kesirler sonlu ondalıktır (3/4 = 75/100). Paydasında 2 ve 5 dışında asal çarpan olanlar devirli olur (1/3 = 0,3̅).`,p:'compare'},
 repeatTrunc:{m:'Kesik Devir Canavarı',c:'#4fd1c5',t:'0,3̅ ile 0,3 sayısını aynı sanıyor',s:`0,3 = 3/10 ama 0,3̅ = 0,333... = 1/3. Üstteki çizgi "sonsuza kadar tekrar" demektir.`,d:`0,3̅ = 0,3 + 0,03 + 0,003 + ... Bu sonsuz toplam 1/3'e eşittir. 0,3 ise bu toplamın yalnızca ilk terimidir; aradaki fark 1/30.`,p:'repeat'},
 distDiff:{m:'Uzaklık Canavarı',c:'#ffd84a',t:'İki sayı arasındaki uzaklığı bulurken rakamları çıkarıyor',s:`Sıfırın iki yanındaki sayılar için uzaklıkları topla: −4 ile 3 → 4 + 3 = 7.`,d:`İki sayı arasındaki uzaklık |a − b|'dir: |3 − (−4)| = |7| = 7. Sayılar sıfırın farklı taraflarındaysa uzaklıklar toplanır.`,p:'dist'},
 place:{m:'Kayıp Nokta',c:'#5ee0ff',t:'Kesrin yerini sayı doğrusunda bulamıyor',s:`Önce hangi iki tam sayının arasında olduğunu bul, sonra parçaları say.`,d:`n/d için birimi d eş parçaya böl ve sıfırdan |n| parça say; n negatifse sola say. Bileşik kesri önce tam sayılı kesre çevirmek yeri bulmayı kolaylaştırır: 7/4 = 1¾.`,p:'rat-line'},
 fracAdd:{m:'Payda Toplayıcı',c:'#ff9f1c',t:'Kesirleri toplarken payları ve paydaları ayrı ayrı topluyor',s:`Önce paydaları eşitle, sonra yalnızca payları topla. Payda ortak kalır.`,d:`a/b + c/d = (a·d + c·b)/(b·d). Payda parçanın büyüklüğünü söyler; aynı büyüklükteki parçaların sayısı toplanır: 1/2 + 1/3 = 3/6 + 2/6 = 5/6 (2/5 değil).`,p:'rat-ops'},
 divFlip:{m:'Ters Çevirme Canavarı',c:'#00c2a8',t:'Kesirlerle bölmede ikinci kesri ters çevirmeyi unutuyor (ya da çarpmada çeviriyor)',s:`Bölme gördüğünde: ikinci kesri ters çevir, sonra çarp. Çarpmada hiçbir şey çevrilmez.`,d:`a/b : c/d = a/b · d/c = (a·d)/(b·c). Çünkü c/d ile bölmek, c/d'nin çarpmaya göre tersiyle (d/c) çarpmak demektir.`,p:'rat-ops'},
 order:{m:'Sıra Bozan',c:'#e86bff',t:'İşlem önceliğini atlayıp soldan sağa hesaplıyor',s:`Önce parantez, sonra çarpma ve bölme, en son toplama ve çıkarma.`,d:`İşlem önceliği: parantez → çarpma/bölme (soldan sağa) → toplama/çıkarma (soldan sağa). 2 + 3 · 4 = 2 + 12 = 14 (20 değil).`,p:'multi'},
 viewMix:{m:'Bakış Karıştıran',c:'#7fd1ff',t:'Önden, üstten ve yandan görünümleri karıştırıyor ya da saklı küpleri unutuyor',s:`Kendini o tarafta duruyormuş gibi düşün. Önden bakınca yükseklikleri, üstten bakınca tabanı görürsün. Saymadan önce yapıyı döndür.`,d:`Önden görünümde her sütunun en yüksek küpü, üstten görünümde dolu taban kareleri, sağdan görünümde her derinlik sırasının en yüksek küpü çizilir. Görünümler sağ-sol ters (ayna) çizilmez. Toplam küp sayısı görünümlerden değil, her yığını sayarak bulunur.`,p:null},
 examplesProof:{m:'Örnek Avcısı',c:'#f59e42',t:'Birkaç örnek doğru çıktı diye önermeyi ispatlanmış sanıyor',s:`Örnekler fikir verir ama ispat değildir. Her durumda doğru olduğunu harflerle (2n + 1 gibi) göster.`,d:`Bir önermenin doğruluğu, tüm durumları kapsayan genel bir akıl yürütmeyle (değişkenlerle) gösterilir. Yanlışlığı ise tek bir karşıt örnekle gösterilir. Tek sayı 2n + 1, çift sayı 2n, ardışık sayılar n ve n + 1 biçiminde yazılır.`,p:null},
 counterEx:{m:'Karşıt Örnek Kaçağı',c:'#e85d75',t:'Karşıt örnek yerine önermeye uyan örneği seçiyor',s:`Karşıt örnek, önermeyi YANLIŞ çıkaran örnektir. Her seçeneği önermede dene: hangisi önermeyi bozuyor?`,d:`"Her … dır" biçimindeki bir önermeyi çürütmek için koşulu sağlayan ama sonucu sağlamayan tek bir örnek yeter. Örneğin "Her asal sayı tektir" önermesi için 2.`,p:null},
 notStatement:{m:'Önerme Karıştıran',c:'#8bd3dd',t:'Önerme ile soru, emir, dilek ya da görüşü karıştırıyor',s:`Önerme, doğru ya da yanlış olduğu kesin olarak söylenebilen bir cümledir. Soru, emir, dilek ve "bence güzel" gibi görüşler önerme değildir.`,d:`"7 bir asal sayıdır" doğru bir önermedir; "−3 bir doğal sayıdır" yanlış bir önermedir. "Kapıyı kapat!" ya da "Matematik eğlencelidir" için doğru ya da yanlış denemez.`,p:null},
 other:{m:'Dikkat Canavarı',c:'#a9acdf',t:'Dikkat hatası veya henüz sınıflanmamış hata',s:`Acele etme. Cevabı vermeden önce bir kez daha kontrol et.`,d:`Bu hata belirli bir kavram yanılgısına uymuyor. Aynı konuda tekrar ederse o temanın konusunu kitaptan yeniden çalışmak iyi olur.`,p:null}
};
const SK1={'int-basic':'Tam sayıları tanıma ve karşılaştırma','rat-ops':'Rasyonel sayılarla işlemler','multi':'Çok adımlı işlemler ve işlem önceliği','int-add':'Tam sayılarla toplama','int-sub':'Tam sayılarla çıkarma','int-mul':'Çarpma ve bölmede işaret','abs':'Mutlak değer','rat-line':'Rasyonel sayıyı sayı doğrusunda gösterme','compare':'Karşılaştırma ve sıralama','repeat':'Devirli ondalık gösterim','dist':'Sayı doğrusunda uzaklık'};
