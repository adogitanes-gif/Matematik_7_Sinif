"use strict";
/* Matematik 7 Oyunları · Question makers for every theme and lesson */
/* ================= Tema 1: Sayı Doğrusu Avı (tagged) ================= */
function g1(skill){
  const map={'int-basic':()=>g1Tam(),'rat-ops':()=>g1RatOps(),'multi':()=>g1Multi(),'int-add':()=>g1Int('add'),'int-sub':()=>g1Int('sub'),'int-mul':()=>g1Int(pick(['mul','div'])),'abs':()=>Math.random()<.5?g1Int('abs'):g1Rat('abs'),'rat-line':()=>g1Rat('line'),'compare':g1Compare,'repeat':g1Repeat,'dist':g1Dist};
  if(skill&&map[skill])return map[skill]();
  const r=Math.random();if(r<.35)return g1Int();if(r<.65)return g1Rat();return pick([g1Compare,g1Repeat,g1Dist])();
}
function g1Int(t){
  t=t||pick(['add','sub','mul','div','abs']);let v,expr,why,a,b;
  for(;;){
    if(t==='add'){a=ri(-9,9);v=ri(-10,10);b=v-a;if(!a||!b||Math.abs(b)>12)continue;expr=`${par(a)} + ${par(b)}`;why=`${expr} = ${neg(v)}`;break}
    if(t==='sub'){a=ri(-9,9);b=ri(-9,9);v=a-b;if(!b||Math.abs(v)>10)continue;expr=`${par(a)} − ${par(b)}`;why=`Çıkarma, tersini toplamaktır: ${par(a)} + ${par(-b)} = ${neg(v)}`;break}
    if(t==='mul'){a=ri(-5,5);b=ri(-5,5);v=a*b;if(!a||!b||Math.abs(v)>10||(Math.abs(a)===1&&Math.abs(b)===1))continue;expr=`${par(a)} · ${par(b)}`;why=`${expr} = ${neg(v)}. İşaretler aynıysa sonuç pozitif, farklıysa negatiftir.`;break}
    if(t==='div'){b=ri(-5,5);v=ri(-10,10);if(Math.abs(b)<2||!v||Math.abs(v*b)>45)continue;a=v*b;expr=`${par(a)} : ${par(b)}`;why=`${expr} = ${neg(v)}. İşaretler aynıysa bölüm pozitif, farklıysa negatiftir.`;break}
    if(t==='abs'){a=ri(-9,9);b=ri(-9,9);if(!a||!b||a>0&&b>0)continue;v=Math.abs(a)-Math.abs(b);expr=`|${neg(a)}| − |${neg(b)}|`;why=`Mutlak değer, sayının 0'a uzaklığıdır: ${Math.abs(a)} − ${Math.abs(b)} = ${neg(v)}`;break}
  }
  const sk={add:'int-add',sub:'int-sub',mul:'int-mul',div:'int-mul',abs:'abs'}[t];
  const classify=p=>{if(v!==0&&p===-v)return (t==='mul'||t==='div')?'mulSign':'sign';
    if(t==='sub'&&b<0&&p===a+b)return 'doubleNeg';
    if(t==='abs'&&(p===a-b||p===Math.abs(a)+Math.abs(b)))return 'absSkip';
    if(Math.abs(p-v)===1)return 'offByOne';return 'other'};
  return {kind:'line',sk,classify,min:-10,max:10,den:1,labelEvery:2,target:v,prompt:`<p>İşlemin sonucunu sayı doğrusunda işaretle.</p><p class="big">${expr}</p>`,explain:why,answerText:neg(v)};
}
function g1Rat(force){
  const den=pick([2,4,4,5]);let n;do{n=ri(-3*den+1,3*den-1)}while(n%den===0);
  const forms=['frac','dec'];if(Math.abs(n)>den)forms.push('mixed','mixed');if(force!=='line')forms.push('abs');if(den===4)forms.push('op','op');
  const f=force==='abs'?'abs':pick(forms);let shown,why,w=0,rem=0;
  if(f==='frac'){shown=fr(n,den);why=`${shown} = ${num(n/den)}`}
  else if(f==='dec'){shown=num(n/den);why=`${shown} = ${fr(n,den)}`}
  else if(f==='mixed'){w=Math.trunc(Math.abs(n)/den);rem=Math.abs(n)%den;shown=`${n<0?'−':''}${w}${fr(rem,den)}`;why=`${shown} = ${fr(n,den)} = ${num(n/den)}`}
  else if(f==='abs'){n=Math.abs(n);shown=`|${fr(-n,den)}|`;why=`Mutlak değer negatif olamaz: ${shown} = ${fr(n,den)} = ${num(n/den)}`}
  else{let k,first;do{k=ri(1,6);first=n+k}while(first===0||Math.abs(first)>14);shown=`${fr(first,4)} − ${fr(k,4)}`;why=`Paydaları eşitle: ${fr(first,4,false)} − ${fr(k,4,false)} = ${fr(n,4,false)} = ${num(n/4)}`}
  const classify=p=>{const tv=n/den;if(Math.abs(p+tv)<1e-9)return f==='abs'?'absSkip':'sign';
    if(f==='mixed'&&n<0&&Math.abs(p-(-w+rem/den))<1e-9)return 'mixedDir';
    if(Math.abs(Math.abs(p-tv)-1/den)<1e-9)return 'offByOne';return 'place'};
  return {kind:'line',sk:f==='abs'?'abs':'rat-line',classify,min:-3,max:3,den,labelEvery:1,target:n/den,prompt:`<p>Bu sayıyı sayı doğrusunda işaretle. Her birim ${den} eş parçaya bölünmüş.</p><p class="big">${shown}</p>`,explain:why,answerText:num(n/den)};
}
function g1Compare(){
  const vals=new Set();while(vals.size<4){const d=pick([2,4,5]);const n=ri(-3*d+1,3*d-1);vals.add(n/d)}
  const arr=[...vals];if(arr.filter(v=>v<0).length<2){arr[0]=-Math.abs(arr[0])||-.5;arr[1]=-Math.abs(arr[1])||-1.5;if(arr[0]===arr[1])arr[1]-=.5}
  const show=v=>{for(const d of[2,4,5]){const n=v*d;if(Math.abs(n-Math.round(n))<1e-9)return Math.random()<.5?fr(Math.round(n),d):num(v)}return num(v)};
  const big=Math.random()<.5;const target=big?Math.max(...arr):Math.min(...arr);const negAbs=arr.filter(v=>v<0).map(Math.abs);
  const misOf=v=>{if(v===target)return null;if(big&&v<0&&Math.abs(v)===Math.max(...negAbs))return 'negIllusion';
    if(!big&&v<0&&negAbs.length>1&&Math.abs(v)===Math.min(...negAbs))return 'negIllusion';
    if(v===(big?Math.min(...arr):Math.max(...arr)))return 'maxMin';return 'convert'};
  const seen=new Set();const opts=shuffle(arr.filter(v=>!seen.has(v)&&seen.add(v)).map(v=>({html:show(v),ok:v===target,mis:misOf(v)})));
  const sorted=arr.slice().sort((a,b)=>a-b).map(num).join(' < ');
  return {kind:'choice',sk:'compare',options:opts,prompt:`<p>Hangisi <b>en ${big?'büyük':'küçük'}</b> sayıdır?</p>`,explain:`Ondalık gösterimle sırala: ${sorted}. Sayı doğrusunda sağdaki büyüktür.`};
}
function g1Repeat(){
  const S0=[[1,3,'0,<span class="over">3</span>','3'],[2,3,'0,<span class="over">6</span>','6'],[1,9,'0,<span class="over">1</span>','1'],[4,9,'0,<span class="over">4</span>','4'],[5,9,'0,<span class="over">5</span>','5'],[1,6,'0,1<span class="over">6</span>','16'],[5,6,'0,8<span class="over">3</span>','83']];
  const [n,d,dec,dg]=pick(S0);
  const w=[{h:fr(Number(dg),10**dg.length),mis:'repeatTrunc'},...shuffle(S0.filter(s=>s[1]!==d||s[0]!==n)).map(s=>({h:fr(s[0],s[1]),mis:'convert'}))];
  return {kind:'choice',sk:'repeat',options:choice(fr(n,d),w),prompt:`<p>Devirli ondalık gösterimi verilen sayı hangi kesre eşittir?</p><p class="big">${dec}</p>`,explain:`${n} : ${d} bölmesinde basamaklar sonsuza kadar tekrar eder; tekrar eden kısmın üstüne çizgi çekilir: ${fr(n,d)} = ${dec}`};
}
function g1Dist(){const a=ri(-9,-1),b=ri(1,9);return {kind:'number',sk:'dist',answer:b-a,unit:'birim',classify:p=>(p===b+a||p===Math.abs(b+a))?'distDiff':Math.abs(p-(b-a))===1?'offByOne':'other',
  prompt:`<p>Sayı doğrusunda <b>${neg(a)}</b> ile <b>${b}</b> arasındaki uzaklık kaç birimdir?</p>`,explain:`${neg(a)} sayısının 0'a uzaklığı ${-a}, ${b} sayısının 0'a uzaklığı ${b} birimdir: ${-a} + ${b} = ${b-a}`}}

/* ================= Tema 2: Kutu Atölyesi ================= */
function prismSVG(a,b,c,lab){
  const s=Math.min(28,230/(a+b*.55),170/(c+b*.55));const W=a*s,H=c*s,d=b*s*.55,ox=58,oy=18+d;
  let g='';
  for(let i=1;i<a;i++)g+=`<line class="s-thin" x1="${ox+i*s}" y1="${oy}" x2="${ox+i*s}" y2="${oy+H}"/>`;
  for(let j=1;j<c;j++)g+=`<line class="s-thin" x1="${ox}" y1="${oy+j*s}" x2="${ox+W}" y2="${oy+j*s}"/>`;
  const vw=ox+W+d+86,vh=oy+H+40;
  return `<svg viewBox="0 0 ${vw} ${vh}" role="img" aria-label="Dikdörtgenler prizması">
  <polygon class="f2 s-line" points="${ox},${oy} ${ox+d},${oy-d} ${ox+W+d},${oy-d} ${ox+W},${oy}"/>
  <polygon class="f3 s-line" points="${ox+W},${oy} ${ox+W+d},${oy-d} ${ox+W+d},${oy-d+H} ${ox+W},${oy+H}"/>
  <rect class="f1" x="${ox}" y="${oy}" width="${W}" height="${H}"/>${g}<rect class="s-line" x="${ox}" y="${oy}" width="${W}" height="${H}"/>
  <text x="${ox+W/2}" y="${oy+H+24}" text-anchor="middle"${lab.a==='?'?' class="t-red"':''}>${lab.a}</text>
  <text x="${ox-8}" y="${oy+H/2+5}" text-anchor="end"${lab.c==='?'?' class="t-red"':''}>${lab.c}</text>
  <text x="${ox+W+d/2+10}" y="${oy+H-d/2+18}"${lab.b==='?'?' class="t-red"':''}>${lab.b}</text></svg>`;
}
function g2(only){
  const t=pick(only||['V','V','S','S','eksik','donusum','donusum','akvaryum','bilgi','views']);
  const a=ri(2,9),b=ri(2,6),c=ri(2,7),cm=v=>v+' cm';
  const L3=(x,y,z)=>({kind:'prism',a:x,b:y,c:z,label:`en ${x} · boy ${y} · yükseklik ${z}`});if(t==='views')return g2Views();
  if(t==='V'){const V=a*b*c;return {kind:'choice',v3d:{...L3(a,b,c),label:`en ${a} cm · boy ${b} cm · yükseklik ${c} cm`},visual:prismSVG(a,b,c,{a:cm(a),b:cm(b),c:cm(c)}),prompt:`<p>Bu dikdörtgenler prizmasının <b>hacmi</b> kaç cm³'tür?</p>`,
    options:choice(V+' cm³',[2*(a*b+b*c+a*c)+' cm³',(a*b+b*c+a*c)+' cm³',(a*b+c)+' cm³',(a+b+c)+' cm³']),explain:`Hacim = en × boy × yükseklik = ${a} · ${b} · ${c} = ${V} cm³`}}
  if(t==='S'){const S=2*(a*b+b*c+a*c);return {kind:'choice',v3d:{...L3(a,b,c),label:`en ${a} cm · boy ${b} cm · yükseklik ${c} cm`},visual:prismSVG(a,b,c,{a:cm(a),b:cm(b),c:cm(c)}),prompt:`<p>Bu prizmanın <b>yüzey alanı</b> kaç cm²'dir?</p>`,
    options:choice(S+' cm²',[(a*b+b*c+a*c)+' cm²',a*b*c+' cm²',(2*(a*b+b*c)+a*c)+' cm²',4*(a+b+c)+' cm²']),explain:`Açınımda karşılıklı 3 çift eş dikdörtgen vardır: 2 · (${a}·${b} + ${b}·${c} + ${a}·${c}) = 2 · ${a*b+b*c+a*c} = ${S} cm²`}}
  if(t==='eksik'){const V=a*b*c;return {kind:'number',answer:c,unit:'cm',v3d:{...L3(a,b,c),label:`en ${a} cm · boy ${b} cm · yükseklik ?`},visual:prismSVG(a,b,c,{a:cm(a),b:cm(b),c:'?'}),prompt:`<p>Prizmanın hacmi <b>${V} cm³</b>. Yüksekliği kaç cm'dir?</p>`,explain:`${a} · ${b} · ? = ${V} → ? = ${V} : ${a*b} = ${c} cm`}}
  if(t==='akvaryum'){const e=pick([30,40,50,60,80]),bo=pick([20,30,40]),y=pick([30,40,50]);const L=e*bo*y/1000;
    return {kind:'number',answer:L,unit:'L',v3d:{...L3(e/10,bo/10,y/10),grid:false,label:`en ${e} cm · boy ${bo} cm · yükseklik ${y} cm`},visual:prismSVG(e/10,bo/10,y/10,{a:cm(e),b:cm(bo),c:cm(y)}),prompt:`<p>Dikdörtgenler prizması biçimindeki bir akvaryumun eni ${e} cm, boyu ${bo} cm, yüksekliği ${y} cm. Akvaryum tamamen dolunca kaç <b>litre</b> su alır?</p>`,
    explain:`Hacim = ${e} · ${bo} · ${y} = ${e*bo*y} cm³. 1 L = 1 dm³ = 1000 cm³ olduğundan ${e*bo*y} : 1000 = ${num(L)} L`}}
  if(t==='bilgi'){const q=pick([['ayrıtı',12],['köşesi',8],['yüzü',6]]);return {kind:'number',answer:q[1],unit:'',prompt:`<p>Bir dikdörtgenler prizmasının kaç <b>${q[0]}</b> vardır?</p>`,explain:`Dikdörtgenler prizmasının 6 yüzü, 12 ayrıtı ve 8 köşesi vardır.`}}
  const k=ri(2,9),C=[
    [`${k} dm³ kaç litredir?`,k,'L',`1 dm³ = 1 L → ${k} dm³ = ${k} L`],
    [`${k} L kaç cm³'tür?`,k*1000,'cm³',`1 L = 1000 cm³ → ${k} L = ${k*1000} cm³`],
    [`${k} m³ kaç dm³'tür?`,k*1000,'dm³',`1 m³ = 1000 dm³ → ${k} m³ = ${k*1000} dm³`],
    [`${k*250} cm³ kaç litredir?`,k*.25,'L',`${k*250} : 1000 = ${num(k*.25)} L`],
    [`${k*100} mL kaç cm³'tür?`,k*100,'cm³',`1 mL = 1 cm³ → ${k*100} mL = ${k*100} cm³`],
    [`${k*1000} dm³ kaç m³'tür?`,k,'m³',`1000 dm³ = 1 m³ → ${k*1000} dm³ = ${k} m³`]];
  const [q,ans,u,why]=pick(C);return {kind:'number',answer:ans,unit:u,prompt:`<p>Hacim ölçme birimleri:</p><p class="big">${q}</p>`,explain:why};
}

/* ================= Tema 3: Veri Dedektifi ================= */
const CTX=[{t:'7/A sınıfında bazı öğrencilerin bu ay okuduğu kitap sayıları',lo:0,hi:8},{t:'Bir basketbolcunun son maçlarda attığı sayılar',lo:4,hi:18},
  {t:'Bir öğrencinin bir hafta boyunca her gün içtiği su (bardak)',lo:3,hi:10},{t:'Bir sokaktaki evlerde yaşayan kişi sayıları',lo:1,hi:7}];
function dotPlot(vals,lo,hi){
  const n=hi-lo+1,w=Math.min(44,520/n),W=w*n+40,cnt={};vals.forEach(v=>cnt[v]=(cnt[v]||0)+1);const mx=Math.max(...Object.values(cnt));
  const base=26+mx*22;let s='';
  for(let v=lo;v<=hi;v++){const x=20+(v-lo)*w+w/2;s+=`<line class="s-line" x1="${x}" y1="${base}" x2="${x}" y2="${base+6}"/><text x="${x}" y="${base+24}" text-anchor="middle">${v}</text>`;
    for(let k=0;k<(cnt[v]||0);k++)s+=`<circle class="f-hl" cx="${x}" cy="${base-12-k*22}" r="8"/>`}
  return `<svg viewBox="0 0 ${W} ${base+34}" role="img" aria-label="Nokta grafiği"><line class="s-line" x1="10" y1="${base}" x2="${W-10}" y2="${base}"/>${s}</svg>`;
}
function g3(only){
  const tt=pick(only||['type','x','x']);if(tt==='type')return g3Type();if(tt==='soru')return g3Soru();if(tt==='toplama')return g3Toplama();if(tt==='surec')return g3Surec();
  const c=pick(CTX),t=['ort','med','tepe','acik'].includes(tt)?tt:pick(['ort','ort','med','tepe','acik']);let vals,n=pick([5,7,7,9]);
  for(;;){vals=Array.from({length:n},()=>ri(c.lo,c.hi));const sum=vals.reduce((a,b)=>a+b,0);
    if(t==='ort'&&sum%n)continue;
    if(t==='tepe'){const cnt={};vals.forEach(v=>cnt[v]=(cnt[v]||0)+1);const m=Math.max(...Object.values(cnt));if(m<2||Object.values(cnt).filter(x=>x===m).length>1)continue}
    if(t==='acik'&&Math.max(...vals)===Math.min(...vals))continue;break}
  const sorted=vals.slice().sort((a,b)=>a-b),sum=vals.reduce((a,b)=>a+b,0);
  const list=vals.join(', ');let q,ans,why;
  if(t==='ort'){ans=sum/n;q='Verilerin <b>aritmetik ortalaması</b> kaçtır?';why=`Toplam = ${vals.join(' + ')} = ${sum}. Veri sayısı ${n}. Ortalama = ${sum} : ${n} = ${num(ans)}`}
  if(t==='med'){ans=sorted[(n-1)/2];q='Verilerin <b>ortancası</b> kaçtır?';why=`Küçükten büyüğe sırala: ${sorted.join(', ')}. Tam ortadaki (${(n+1)/2}. sıradaki) değer ${ans}.`}
  if(t==='tepe'){const cnt={};vals.forEach(v=>cnt[v]=(cnt[v]||0)+1);ans=Number(Object.keys(cnt).find(k=>cnt[k]===Math.max(...Object.values(cnt))));q='Verilerin <b>tepe değeri</b> kaçtır?';why=`En çok tekrar eden değer ${ans} (${cnt[ans]} kez). Grafikte en yüksek sütun.`}
  if(t==='acik'){ans=sorted[n-1]-sorted[0];q='Verilerin <b>açıklığı</b> kaçtır?';why=`Açıklık = en büyük − en küçük = ${sorted[n-1]} − ${sorted[0]} = ${ans}`}
  return {kind:'number',answer:ans,unit:'',visual:dotPlot(vals,c.lo,c.hi),prompt:`<p>${c.t}:</p><p class="big" style="font-size:1.2rem">${list}</p><p>${q}</p>`,explain:why};
}
function g3Type(){
  const D=[['Öğrencilerin en sevdiği meyve',0],['Sınıftaki öğrencilerin göz rengi',0],['Öğrencilerin okula geliş şekli (yürüyerek, servisle, otobüsle)',0],['Ailelerin tercih ettiği tatil yeri',0],
    ['Öğrencilerin kardeş sayısı',1],['Kütüphaneden bir günde ödünç alınan kitap sayısı',1],['Bir maçta atılan gol sayısı',1],['Bir apartmandaki dairelerin oda sayısı',1],
    ['Öğrencilerin boy uzunlukları (cm)',2],['Gün içinde ölçülen hava sıcaklığı (°C)',2],['Koşucuların 100 metreyi bitirme süreleri',2],['Yeni doğan bebeklerin kütleleri (kg)',2]];
  const [t,k]=pick(D),O=['Kategorik veri','Nicel veri (kesikli)','Nicel veri (sürekli)'];
  const W=['Kategorik veri sayıyla değil, gruplarla (renk, isim, tür) ifade edilir.','Kesikli nicel veri sayılarak bulunur; ara değer (2,5 kardeş gibi) alamaz.','Sürekli nicel veri ölçülerek bulunur; iki değer arasında her değeri alabilir.'];
  return {kind:'choice',options:O.map((h,i)=>({html:h,ok:i===k})),prompt:`<p>Aşağıdaki araştırmada toplanan veri hangi türdendir?</p><p class="big" style="font-size:1.25rem">${t}</p>`,explain:W[k]};
}

/* ================= Tema 4: Simetri Aynası ================= */
function g4(only){
  if(pick(only||['grid','grid','concept'])==='concept')return g4Concept();
  const COLS=10,ROWS=8,vert=Math.random()<.6;let k,band,mir;
  if(vert){k=pick([4,5,6]);band={c0:k-4,c1:k-1,r0:1,r1:6};mir=([r,c])=>[r,2*k-1-c]}
  else{k=4;band={c0:1,c1:8,r0:0,r1:3};mir=([r,c])=>[2*k-1-r,c]}
  const size=ri(4,6),cells=new Map();const key=([r,c])=>r+','+c;
  const s0=[ri(band.r0,band.r1),ri(band.c0,band.c1)];cells.set(key(s0),s0);
  while(cells.size<size){const [r,c]=pick([...cells.values()]);const [dr,dc]=pick([[0,1],[0,-1],[1,0],[-1,0]]);const nr=r+dr,nc=c+dc;
    if(nr<band.r0||nr>band.r1||nc<band.c0||nc>band.c1)continue;cells.set(key([nr,nc]),[nr,nc])}
  let shape=new Set(cells.keys()),target=new Set([...cells.values()].map(p=>key(mir(p))));
  if(Math.random()<.5)[shape,target]=[target,shape];
  return {kind:'grid',cols:COLS,rows:ROWS,vert,k,shape,target,prompt:`<p>Mavi şeklin <b>simetri doğrusuna</b> göre yansıma görüntüsünü çiz. Kareleri dokunarak boya.</p>`,
    explain:`Her karenin görüntüsü, simetri doğrusunun öbür tarafında ve doğruya <b>aynı uzaklıktadır</b>. Şekil ile görüntüsü eştir; yalnızca yönü ters döner.`};
}
function g4Concept(){
  const d=ri(2,7);const Q=[
    {p:'Bir şeklin yansıma dönüşümü altındaki görüntüsü için hangisi doğrudur?',c:'Şekil ile görüntüsü eştir.',w:['Görüntü, şeklin iki katı büyüklüğündedir.','Görüntü, simetri doğrusuna şekilden daha uzaktır.','Görüntünün alanı şeklin alanından küçüktür.'],e:'Yansıma şekli büyütmez, küçültmez; yalnızca simetri doğrusuna göre ters çevirir.'},
    {p:'Bir doğru parçasının orta dikmesi üzerindeki her nokta için hangisi doğrudur?',c:'Doğru parçasının uç noktalarına eşit uzaklıktadır.',w:['Doğru parçasının yalnızca bir ucuna yakındır.','Doğru parçasına paraleldir.','Doğru parçasının üzerindedir.'],e:'Orta dikme, doğru parçasını orta noktasından dik keser; üzerindeki her nokta iki uca eşit uzaklıktadır.'},
    {p:'Bir açının açıortayı üzerindeki her nokta için hangisi doğrudur?',c:'Açının kollarına eşit uzaklıktadır.',w:['Açının köşesine eşit uzaklıktadır.','Açının kollarından birine diktir.','Açının dışında kalır.'],e:'Açıortay açıyı iki eş açıya ayırır; üzerindeki her nokta iki kola eşit uzaklıktadır.'},
    {p:'Bir şekil simetri doğrusu boyunca katlandığında iki parça için ne söylenir?',c:'Parçalar tam olarak üst üste çakışır.',w:['Parçaların biri diğerinin yarısıdır.','Parçalar hiç kesişmez.','Parçalar birbirine diktir.'],e:'Simetri doğrusu, şekli üst üste çakışan iki eş parçaya ayırır.'},
    {p:'Pergelle orta dikme inşa ederken pergel açıklığı nasıl olmalıdır?',c:'Doğru parçasının yarısından büyük olmalıdır.',w:['Doğru parçasının yarısından küçük olmalıdır.','Tam olarak 1 cm olmalıdır.','Her yayda farklı olmalıdır.'],e:'Açıklık yarıdan küçük olursa iki uçtan çizilen yaylar kesişmez. İki yayda da aynı açıklık kullanılır.'},
    {p:'Orta dikme inşasında iki uçtan çizilen yayların kesişim noktaları birleştirilince ne elde edilir?',c:'Doğru parçasının orta dikmesi',w:['Doğru parçasının kendisi','Bir açıortay','Bir kenarortay'],e:'İki kesişim noktası da iki uca eşit uzaklıktadır; onları birleştiren doğru orta dikmedir.'},
    {p:'Açıortay inşasında ilk yay, açının köşesi merkez alınarak çizilir. Bu yay ne işe yarar?',c:'Açının iki kolunu köşeye eşit uzaklıkta keser.',w:['Açının ölçüsünü iki katına çıkarır.','Açının dışında bir nokta bulur.','Kolları birbirine paralel yapar.'],e:'Bu iki kesişim noktasından eşit açıklıkla çizilen yaylar kesişir; köşeyi bu noktaya birleştiren ışın açıortaydır.'},
    {p:'Bir doğru parçası ile orta dikmesi arasındaki açı kaç derecedir?',c:'90°',w:['45°','180°','60°'],e:'Orta dikme, doğru parçasını orta noktasından dik keser: 90°.'}];
  if(Math.random()<.4)return {kind:'number',answer:2*d,unit:'birim',prompt:`<p>A noktası simetri doğrusuna <b>${d} birim</b> uzaklıkta. A noktası ile yansıma görüntüsü A′ arasındaki uzaklık kaç birimdir?</p>`,explain:`A′ de doğruya ${d} birim uzaklıktadır, öbür tarafta: ${d} + ${d} = ${2*d} birim`};
  const q=pick(Q);return {kind:'choice',options:choice(q.c,q.w),prompt:`<p>${q.p}</p>`,explain:q.e};
}

/* ================= Tema 5: Üçgenin Gizli Çizgileri ================= */
function tri(){
  for(;;){const p=[0,1,2].map(()=>[ri(40,360),ri(30,250)]);const [A,B,C]=p;
    const ab=len(sub(A,B)),ac=len(sub(A,C)),bc=len(sub(B,C));if(Math.min(ab,ac,bc)<150)continue;
    const ang=(x,y,z)=>Math.acos((y*y+z*z-x*x)/(2*y*z))*180/Math.PI;const a=[ang(bc,ab,ac),ang(ac,ab,bc),ang(ab,ac,bc)];
    if(a.some(v=>v<40||v>82))continue;const r=ab/ac;if(r>.84&&r<1.19)continue;return p}
}
function triSVG(type){
  const [A,B,C]=tri(),G=mul(add2(add2(A,B),C),1/3),u=unit(sub(C,B));let n=[-u[1],u[0]];
  let s='',D;
  const tick=(p,q)=>{const m=mul(add2(p,q),.5),d=unit(sub(q,p)),nn=[-d[1],d[0]];return `<line class="s-mark" x1="${(m[0]-nn[0]*7).toFixed(1)}" y1="${(m[1]-nn[1]*7).toFixed(1)}" x2="${(m[0]+nn[0]*7).toFixed(1)}" y2="${(m[1]+nn[1]*7).toFixed(1)}"/>`};
  const right=(H,dir,nn)=>`<polyline class="s-mark" points="${P(add2(H,mul(dir,11)))} ${P(add2(add2(H,mul(dir,11)),mul(nn,11)))} ${P(add2(H,mul(nn,11)))}"/>`;
  const arc=(O,d1,d2,r)=>{const p1=add2(O,mul(d1,r)),p2=add2(O,mul(d2,r));return `<path class="s-mark" d="M${P(p1)} A${r} ${r} 0 0 ${cross(d1,d2)>0?1:0} ${P(p2)}"/>`};
  if(dot(sub(A,B),n)<0)n=mul(n,-1);
  if(type==='kenarortay'){D=mul(add2(B,C),.5);s+=`<line class="s-red" x1="${A[0]}" y1="${A[1]}" x2="${D[0]}" y2="${D[1]}"/>`+tick(B,D)+tick(D,C)}
  if(type==='yukseklik'){D=add2(B,mul(u,dot(sub(A,B),u)));s+=`<line class="s-red" x1="${A[0]}" y1="${A[1]}" x2="${D[0]}" y2="${D[1]}"/>`+right(D,u,n)}
  if(type==='aciortay'){const ab=len(sub(A,B)),ac=len(sub(A,C));D=add2(B,mul(sub(C,B),ab/(ab+ac)));const dB=unit(sub(B,A)),dC=unit(sub(C,A)),dD=unit(sub(D,A));
    s+=`<line class="s-red" x1="${A[0]}" y1="${A[1]}" x2="${D[0]}" y2="${D[1]}"/>`+arc(A,dB,dD,34)+arc(A,dD,dC,34)+arc(A,dB,dD,40)+arc(A,dD,dC,40)}
  if(type==='ortadikme'){D=mul(add2(B,C),.5);let t=Infinity;for(const [p,q] of [[A,B],[A,C]]){const r=sub(q,p),den=cross(n,r);if(Math.abs(den)<1e-9)continue;const tt=cross(sub(p,D),r)/den,ss=cross(sub(p,D),n)/den;if(tt>0&&ss>=0&&ss<=1)t=Math.min(t,tt)}
    if(!isFinite(t))t=120;const e1=add2(D,mul(n,-26)),e2=add2(D,mul(n,t+26));s+=`<line class="s-red" x1="${e1[0].toFixed(1)}" y1="${e1[1].toFixed(1)}" x2="${e2[0].toFixed(1)}" y2="${e2[1].toFixed(1)}"/>`+tick(B,D)+tick(D,C)+right(D,u,n)}
  const L=(V,name)=>{const p=add2(V,mul(unit(sub(V,G)),18));return `<text x="${p[0].toFixed(1)}" y="${(p[1]+5).toFixed(1)}" text-anchor="middle" style="font-weight:700;font-size:16px">${name}</text>`};
  const Dl=add2(D,mul(n,-18));
  return `<svg viewBox="0 0 400 280" role="img" aria-label="ABC üçgeni"><polygon class="f3 s-line" points="${P(A)} ${P(B)} ${P(C)}"/>${s}${L(A,'A')}${L(B,'B')}${L(C,'C')}
   <circle class="f-ink" cx="${D[0].toFixed(1)}" cy="${D[1].toFixed(1)}" r="3"/><text class="t-red" x="${Dl[0].toFixed(1)}" y="${(Dl[1]+5).toFixed(1)}" text-anchor="middle">D</text></svg>`;
}
const TRI={kenarortay:['Kenarortay','Eşit çentikler D\'nin BC kenarının orta noktası olduğunu gösterir. Çizgi A köşesinden orta noktaya gidiyor: <b>kenarortay</b>.'],
  yukseklik:['Yükseklik','D noktasında dik açı işareti var ve çizgi A köşesinden geliyor: A köşesinden BC kenarına çizilen <b>yükseklik</b>.'],
  aciortay:['Açıortay','A köşesindeki iki açı yayı eş işaretli: çizgi A açısını iki eş açıya ayırıyor, yani <b>açıortay</b>.'],
  ortadikme:['Kenar orta dikme','Çizgi BC kenarını orta noktasından (eş çentikler) dik olarak (dik açı işareti) kesiyor: <b>kenar orta dikme</b>. Köşeden geçmesi gerekmez.']};
function g5(only){
  const type=pick(only||Object.keys(TRI));
  if(Math.random()<(only?.3:.68))return {kind:'choice',visual:triSVG(type),options:shuffle(Object.keys(TRI).map(k=>({html:TRI[k][0],ok:k===type}))),prompt:`<p>Pembe çizgi ABC üçgeninin neyidir?</p>`,explain:TRI[type][1]};
  const m=ri(3,11),deg=2*ri(15,40);
  const C={kenarortay:[`[AD] kenarortaydır ve |BC| = ${2*m} cm. |BD| kaç cm'dir?`,m,'cm',`Kenarortay karşı kenarı iki eş parçaya ayırır: ${2*m} : 2 = ${m} cm`],
    aciortay:[`[AD] açıortaydır ve m(BAC) = ${deg}°. m(BAD) kaç derecedir?`,deg/2,'°',`Açıortay açıyı iki eş açıya böler: ${deg} : 2 = ${deg/2}°`],
    yukseklik:[`[AD], A köşesinden BC kenarına çizilen yüksekliktir. m(ADB) kaç derecedir?`,90,'°','Yükseklik karşı kenara diktir, aradaki açı 90°.'],
    ortadikme:[`Pembe doğru BC kenarının orta dikmesidir ve |BD| = ${m} cm. |DC| kaç cm'dir?`,m,'cm',`Orta dikme kenarı orta noktasından keser: |DC| = |BD| = ${m} cm`]}[type];
  return {kind:'number',answer:C[1],unit:C[2],visual:triSVG(type),prompt:`<p>${C[0]}</p><p class="hint">Şekil ölçekli değildir.</p>`,explain:C[3]};
}

/* ================= Tema 6: Oran Pazarı ================= */
const ITEMS=[['simit','adet',5,15],['defter','adet',20,45],['elma','kg',25,60],['süt','L',20,40],['kalem','adet',10,30],['domates','kg',15,45]];
function g6(only){
  const t=pick(only||['oran','birim','birim','dogru','dogru','tarif','ucuz','ucuz','denk','birimli','oranti']);if(t==='oran')return g6Oran();
  const [nm,u,lo,hi]=pick(ITEMS),up=ri(lo,hi);
  if(t==='birim'){const q=ri(2,6);return {kind:'number',answer:up,unit:'TL',prompt:`<p>${q} ${u} ${nm} ${q*up} TL'dir. <b>1 ${u}</b> ${nm} kaç TL'dir?</p>`,explain:`Birim oran: ${q*up} TL : ${q} ${u} = ${up} TL / ${u}`}}
  if(t==='dogru'){const q1=ri(2,5),q2=ri(6,12);return {kind:'number',answer:q2*up,unit:'TL',prompt:`<p>${q1} ${u} ${nm} ${q1*up} TL ise <b>${q2} ${u}</b> ${nm} kaç TL'dir?</p>`,explain:`Miktar ile fiyat doğru orantılıdır. 1 ${u} = ${q1*up} : ${q1} = ${up} TL → ${q2} · ${up} = ${q2*up} TL`}}
  if(t==='tarif'){const a=ri(2,3),b=ri(3,5),k=ri(2,4);return {kind:'number',answer:b*k,unit:'yumurta',prompt:`<p>Bir kek tarifinde ${a} su bardağı una ${b} yumurta konuyor. <b>${a*k} su bardağı</b> un kullanılırsa kaç yumurta gerekir?</p>`,explain:`Un ${a*k} : ${a} = ${k} katına çıktı; yumurta da ${k} katına çıkar: ${b} · ${k} = ${b*k}`}}
  if(t==='ucuz'){const q1=ri(2,6);let q2;do{q2=ri(2,8)}while(q2===q1);const u1=up;const same=Math.random()<.25;const u2=same?u1:u1+pick([-3,-2,-1,1,2,3]);
    const best=same?2:(u1<u2?0:1);
    return {kind:'choice',visual:`<div class="tags"><div class="tag"><b>A paketi</b><span>${q1} ${u} ${nm}</span><span>${q1*u1} TL</span></div><div class="tag"><b>B paketi</b><span>${q2} ${u} ${nm}</span><span>${q2*u2} TL</span></div></div>`,
      options:['A paketi daha ucuz','B paketi daha ucuz','İkisi de aynı'].map((h,i)=>({html:h,ok:i===best})),prompt:`<p>Birim fiyatı hangi pakette daha ucuzdur?</p>`,
      explain:`Birim oranları karşılaştır: A → ${q1*u1} : ${q1} = ${u1} TL, B → ${q2*u2} : ${q2} = ${u2} TL`}}
  if(t==='denk'){const a=ri(1,7),b=ri(a+1,9),k=ri(2,6);const top=Math.random()<.5;
    return {kind:'number',answer:top?a*k:b*k,unit:'',prompt:`<p>Denk oranı tamamla:</p><p class="big">${frRaw(a,b)} = ${top?frRaw('<span class="box">?</span>',b*k):frRaw(a*k,'<span class="box">?</span>')}</p>`,
      explain:`Denk oranda pay ve payda aynı sayıyla çarpılır: ${top?`${b*k} : ${b} = ${k} → ${a} · ${k} = ${a*k}`:`${a*k} : ${a} = ${k} → ${b} · ${k} = ${b*k}`}`}}
  if(t==='birimli'){const L=[['12 cm / 4 cm',1],['30 dakika / 90 dakika',1],['6 kg / 2 kg',1],['15 öğrenci / 25 öğrenci',1],['150 km / 2 saat',0],['60 TL / 3 kg',0],['400 m / 50 saniye',0],['90 L / 3 dakika',0]];
    const [r,k]=pick(L);return {kind:'choice',options:['Birimli oran','Birimsiz oran'].map((h,i)=>({html:h,ok:i===k})),prompt:`<p>Bu oran birimli mi, birimsiz mi?</p><p class="big">${r}</p>`,
      explain:k?'Aynı birimdeki iki çokluk oranlanınca birimler sadeleşir: birimsiz oran.':'Farklı birimdeki iki çokluk oranlanınca sonuç birim taşır (km/saat, TL/kg): birimli oran.'}}
  const a=ri(1,6),b=ri(a+1,9),k=ri(2,5);const yes=Math.random()<.5;const c=a*k,d=yes?b*k:b*k+pick([-1,1]);
  return {kind:'choice',options:['Evet, orantı oluşturur','Hayır, orantı oluşturmaz'].map((h,i)=>({html:h,ok:(i===0)===yes})),prompt:`<p>Bu iki oran bir orantı oluşturur mu?</p><p class="big">${frRaw(a,b)} &nbsp;ve&nbsp; ${frRaw(c,d)}</p>`,
    explain:`İçler çarpımı dışlar çarpımına eşit mi? ${a} · ${d} = ${a*d}, ${b} · ${c} = ${b*c} → ${yes?'eşit, orantı oluşturur':'eşit değil, orantı oluşturmaz'}`};
}

/* ================= Tema 7: Şans Torbası ================= */
const COLORS=[['kırmızı','kirmizi'],['mavi','mavi'],['yeşil','yesil'],['sarı','sari']];
function bagSVG(counts){
  const balls=[];counts.forEach(([c,n])=>{for(let i=0;i<n;i++)balls.push(c[1])});const sh=shuffle(balls);const rows=Math.ceil(sh.length/5);
  const top=56,h=rows*34+30;let s='';sh.forEach((c,i)=>{const r=Math.floor(i/5),k=i%5;s+=`<circle class="b-${c} s-thin" cx="${78+k*34+(r%2)*8}" cy="${top+h-26-r*34}" r="14"/>`});
  return `<svg viewBox="0 0 340 ${top+h+12}" role="img" aria-label="Torbadaki toplar"><path class="f3 s-line" d="M110 ${top-20} Q100 ${top} 60 ${top+16} Q44 ${top+h+4} 170 ${top+h+4} Q296 ${top+h+4} 280 ${top+16} Q240 ${top} 230 ${top-20} Z"/>
  <path class="s-line" d="M104 ${top-24} L236 ${top-24}"/>${s}</svg>`;
}
const PIPS={1:[[2,2]],2:[[1,1],[3,3]],3:[[1,1],[2,2],[3,3]],4:[[1,1],[3,1],[1,3],[3,3]],5:[[1,1],[3,1],[2,2],[1,3],[3,3]],6:[[1,1],[3,1],[1,2],[3,2],[1,3],[3,3]]};
function diceSVG(){let s='';for(let f=1;f<=6;f++){const x=10+(f-1)*58;s+=`<rect class="f-card s-line" x="${x}" y="10" width="46" height="46" rx="8"/>`;PIPS[f].forEach(([a,b])=>s+=`<circle class="f-ink" cx="${x+a*11.5}" cy="${10+b*11.5}" r="4"/>`)}return `<svg viewBox="0 0 360 66" role="img" aria-label="Zarın 6 yüzü">${s}</svg>`}
const EV=[['asal sayı gelmesi',[2,3,5]],['çift sayı gelmesi',[2,4,6]],['tek sayı gelmesi',[1,3,5]],["3'ten büyük bir sayı gelmesi",[4,5,6]],["6'nın böleni olan bir sayı gelmesi",[1,2,3,6]],
  ['5 gelmesi',[5]],["2'den küçük bir sayı gelmesi",[1]],["3'ün katı olan bir sayı gelmesi",[3,6]],['7 gelmesi',[]],["6 veya 6'dan küçük bir sayı gelmesi",[1,2,3,4,5,6]]];
function probW(k,n){return [fr(k,n-k||1),fr(n-k,n),fr(k,n+1),fr(Math.min(k+1,n),n),fr(1,n),fr(1,2),'1','0'].filter(x=>x!==fr(k,n))}
function g7(only){
  const t=pick(only||['renk','renk','degil','esit','zar','zar','ayrik','veya','tum']);
  if(['renk','degil','esit'].includes(t)){
    const cs=shuffle(COLORS).slice(0,ri(2,3));let counts=cs.map(c=>[c,ri(1,6)]);
    if(t==='esit'&&Math.random()<.5)counts[1][1]=counts[0][1];
    const n=counts.reduce((a,c)=>a+c[1],0),[col,k]=counts[0],list=counts.map(([c,x])=>`${x} ${c[0]}`).join(', ');
    if(t==='esit'){const yes=counts[0][1]===counts[1][1];return {kind:'choice',visual:bagSVG(counts),options:['Evet, eşit olasılıklı','Hayır, eşit olasılıklı değil'].map((h,i)=>({html:h,ok:(i===0)===yes})),
      prompt:`<p>Torbada ${list} top var. Rastgele çekilen topun <b>${counts[0][0][0]}</b> olması ile <b>${counts[1][0][0]}</b> olması eşit olasılıklı mıdır?</p>`,
      explain:`${counts[0][0][0]}: ${fr(counts[0][1],n,false)}, ${counts[1][0][0]}: ${fr(counts[1][1],n,false)} → ${yes?'olasılıklar eşit':'olasılıklar farklı'}`}}
    const m=t==='renk'?k:n-k;return {kind:'choice',visual:bagSVG(counts),options:choice(fr(m,n),probW(m,n)),
      prompt:`<p>Torbada ${list} top var. Rastgele çekilen topun <b>${col[0]}${t==='degil'?' olmama':' olma'}</b> olasılığı kaçtır?</p>`,
      explain:t==='renk'?`Olasılık = istenen çıktı sayısı / tüm çıktılar = ${fr(k,n,false)}${gcd(k,n)>1?' = '+fr(k,n):''}`:`Tümleyen olay: 1 − ${fr(k,n,false)} = ${fr(n-k,n,false)}${gcd(n-k,n)>1?' = '+fr(n-k,n):''}`}}
  if(t==='zar'){const [txt,s]=pick(EV);return {kind:'choice',visual:diceSVG(),options:choice(fr(s.length,6),probW(s.length,6)),prompt:`<p>Bir zar atılıyor. Zarın üst yüzüne <b>${txt.replace(' gelmesi',' gelme')}</b> olasılığı kaçtır?</p>`,
    explain:`Uygun çıktılar: {${s.join(', ')}} → ${s.length} tane. ${fr(s.length,6,false)}${s.length&&s.length<6&&gcd(s.length,6)>1?' = '+fr(s.length,6):''}${!s.length?'. İmkânsız olay.':s.length===6?'. Kesin olay.':''}`}}
  const E=EV.filter(e=>e[1].length&&e[1].length<6);
  if(t==='ayrik'||t==='veya'){let a,b;do{a=pick(E);b=pick(E)}while(a===b);const inter=a[1].filter(x=>b[1].includes(x)),uni=[...new Set([...a[1],...b[1]])].sort();
    if(t==='ayrik')return {kind:'choice',visual:diceSVG(),options:['Ayrık olaylardır','Ayrık olmayan olaylardır'].map((h,i)=>({html:h,ok:(i===0)===!inter.length})),
      prompt:`<p>Bir zar atılıyor. <b>A: ${a[0]}</b> ve <b>B: ${b[0]}</b>. Bu olaylar ayrık mıdır?</p>`,explain:`A = {${a[1].join(', ')}}, B = {${b[1].join(', ')}}. ${inter.length?`Ortak çıktı var: {${inter.join(', ')}} → aynı anda gerçekleşebilir, ayrık değil.`:'Ortak çıktı yok → aynı anda gerçekleşemezler, ayrıktır.'}`};
    return {kind:'choice',visual:diceSVG(),options:choice(fr(uni.length,6),[fr(Math.min(a[1].length+b[1].length,6),6),fr(inter.length,6),...probW(uni.length,6)]),
      prompt:`<p>Bir zar atılıyor. <b>${a[0].replace(' gelmesi','')}</b> veya <b>${b[0].replace(' gelmesi','')}</b> gelme olasılığı kaçtır?</p>`,
      explain:`A = {${a[1].join(', ')}}, B = {${b[1].join(', ')}}. A veya B = {${uni.join(', ')}} → ${fr(uni.length,6,false)}${inter.length?`. Ortak çıktıları ({${inter.join(', ')}}) iki kez sayma.`:''}`}}
  const d=pick([5,8,10,12,20]),k=ri(1,d-1);return {kind:'choice',options:choice(fr(d-k,d),probW(d-k,d)),prompt:`<p>Bir A olayının olma olasılığı ${fr(k,d)}. A olayının <b>tümleyeninin</b> olasılığı kaçtır?</p>`,
    explain:`Bir olay ile tümleyeninin olasılıkları toplamı 1'dir: 1 − ${fr(k,d)} = ${fr(d-k,d)}`};
}

/* ================= Tema 8: Denge Terazisi ================= */
function balanceSVG(a,b,c){
  const items=(x0,boxes,units,label)=>{let s='',i=0;const place=()=>{const r=Math.floor(i/5),k=i%5;i++;return [x0-62+k*28,140-r*30]};
    for(let j=0;j<boxes;j++){const [x,y]=place();s+=`<rect class="f2 s-line" x="${x}" y="${y}" width="24" height="24" rx="3"/><text x="${x+12}" y="${y+17}" text-anchor="middle" style="font-style:italic">x</text>`}
    if(units<=8)for(let j=0;j<units;j++){const [x,y]=place();s+=`<circle class="f-hl" cx="${x+12}" cy="${y+12}" r="11"/><text x="${x+12}" y="${y+17}" text-anchor="middle" style="fill:var(--on-hl);font-size:12px">1</text>`}
    else{const [x,y]=place();s+=`<rect class="f-hl" x="${x}" y="${y}" width="52" height="24" rx="3"/><text x="${x+26}" y="${y+17}" text-anchor="middle" style="fill:var(--on-hl)">${label}</text>`}return s};
  return `<svg viewBox="0 0 400 230" role="img" aria-label="Denge terazisi"><polygon class="f3 s-line" points="200,100 176,214 224,214"/><line class="s-line" x1="150" y1="214" x2="250" y2="214"/>
  <line class="s-line" x1="100" y1="100" x2="300" y2="100" style="stroke-width:4"/><line class="s-thin" x1="100" y1="100" x2="100" y2="166"/><line class="s-thin" x1="300" y1="100" x2="300" y2="166"/>
  <line class="s-line" x1="22" y1="166" x2="178" y2="166" style="stroke-width:3"/><line class="s-line" x1="222" y1="166" x2="378" y2="166" style="stroke-width:3"/>
  ${items(100,a,b,b)}${items(300,0,c,c)}</svg>`;
}
function g8(only){
  const t=pick(only||['denk','denk','denk','sade','dagil','deger','esitsiz','esitsiz','algo']);
  if(t==='denk'){let a,x,b,c;do{a=ri(2,6);x=ri(-4,9);b=ri(-9,12);c=a*x+b}while(!x||!b);const vis=x>0&&b>0&&a<=5&&c<=40?balanceSVG(a,b,c):'';
    return {kind:'number',answer:x,unit:'',visual:vis,prompt:`<p>Denklemi çöz. ${X} kaçtır?</p><p class="big">${lin(a,b)} = ${neg(c)}</p>`,
      explain:`Eşitliğin iki tarafına ${b>0?'−'+b:'+'+(-b)} ekle: ${a}${X} = ${neg(c-b)}. İki tarafı ${a} ile böl: ${X} = ${neg(c-b)} : ${a} = ${neg(x)}`}}
  if(t==='sade'){let p,q,r,s;do{p=ri(-5,6);r=ri(-5,6);q=ri(-9,9);s=ri(-9,9)}while(!p||!r||!q||!s||p+r===0||q+s===0);
    return {kind:'choice',options:choice(lin(p+r,q+s),[lin(p-r,q+s),lin(p+r,q-s),lin(p+r+q+s,0),lin(p*r,q+s)]),prompt:`<p>İfadeyi sadeleştir:</p><p class="big">${terms([[p,'x'],[q,''],[r,'x'],[s,'']])}</p>`,
      explain:`Benzer terimleri topla: ${X}'li terimler ${neg(p)} + ${par(r)} = ${neg(p+r)}, sabit terimler ${neg(q)} + ${par(s)} = ${neg(q+s)} → ${lin(p+r,q+s)}`}}
  if(t==='dagil'){const k=ri(2,6),m=ri(1,9),sg=Math.random()<.5?1:-1;return {kind:'choice',options:choice(lin(k,sg*k*m),[lin(k,sg*m),lin(1,sg*k*m),lin(k,-sg*k*m),lin(k+m,0)]),
    prompt:`<p>Hangisi bu ifadeye eşittir?</p><p class="big">${k}(${X} ${sg>0?'+':'−'} ${m})</p>`,explain:`Dağılma özelliği: ${k} · ${X} ${sg>0?'+':'−'} ${k} · ${m} = ${lin(k,sg*k*m)}`}}
  if(t==='deger'){let v,a,b;do{v=ri(-5,5);a=ri(-5,6);b=ri(-9,9)}while(!v||!a||!b);const ans=a*v+b;
    return {kind:'number',answer:ans,unit:'',prompt:`<p>${X} = ${neg(v)} için ifadenin değeri kaçtır?</p><p class="big">${lin(a,b)}</p>`,explain:`${neg(a)} · ${par(v)} ${b<0?'−':'+'} ${Math.abs(b)} = ${neg(a*v)} ${b<0?'−':'+'} ${Math.abs(b)} = ${neg(ans)}`}}
  if(t==='esitsiz'){const a=ri(1,9),b=ri(2,15),k=pick([1,2,3]);const v=pick(['gt','ge','lt','kle']);
    if(v==='gt')return {kind:'number',answer:b-a+1,unit:'',prompt:`<p>Eşitsizliği sağlayan <b>en küçük tam sayı</b> kaçtır?</p><p class="big">${X} + ${a} &gt; ${b}</p>`,explain:`${X} &gt; ${b} − ${a} → ${X} &gt; ${b-a}. ${b-a} sağlamaz; en küçük tam sayı ${b-a+1}.`};
    if(v==='ge')return {kind:'number',answer:b-a,unit:'',prompt:`<p>Eşitsizliği sağlayan <b>en küçük tam sayı</b> kaçtır?</p><p class="big">${X} + ${a} ≥ ${b}</p>`,explain:`${X} ≥ ${b} − ${a} → ${X} ≥ ${b-a}. Eşitlik de dâhil: ${b-a}.`};
    if(v==='lt')return {kind:'number',answer:a+b-1,unit:'',prompt:`<p>Eşitsizliği sağlayan <b>en büyük tam sayı</b> kaçtır?</p><p class="big">${X} − ${a} &lt; ${b}</p>`,explain:`${X} &lt; ${b} + ${a} → ${X} &lt; ${a+b}. ${a+b} sağlamaz; en büyük tam sayı ${a+b-1}.`};
    const kk=k+1,m=kk*ri(2,7)+ri(0,kk-1);return {kind:'number',answer:Math.floor(m/kk),unit:'',prompt:`<p>Eşitsizliği sağlayan <b>en büyük tam sayı</b> kaçtır?</p><p class="big">${kk}${X} ≤ ${m}</p>`,explain:`${X} ≤ ${m} : ${kk} = ${num(m/kk)} → en büyük tam sayı ${Math.floor(m/kk)}.`}}
  const a=ri(2,5),b=ri(1,9),x=ri(2,9);return {kind:'number',answer:x,unit:'',prompt:`<p>Ayşe aklından bir sayı tuttu. Sayıyı <b>${a} ile çarptı</b>, sonuca <b>${b} ekledi</b> ve <b>${a*x+b}</b> buldu. Ayşe'nin tuttuğu sayı kaçtır?</p>`,
    explain:`Adımları tersine uygula: ${a*x+b} − ${b} = ${a*x}, ${a*x} : ${a} = ${x}. Denklem: ${lin(a,b)} = ${a*x+b}`};
}

/* ================= Tema 9: Alan Avcısı ================= */
function circleSVG(r,alpha){
  const cx=180,cy=120,R=92;let s='';
  if(!alpha)s=`<circle class="f1 s-line" cx="${cx}" cy="${cy}" r="${R}"/><line class="s-line" x1="${cx}" y1="${cy}" x2="${cx+R}" y2="${cy}"/><text x="${cx+R/2}" y="${cy-8}" text-anchor="middle">r = ${r} cm</text>`;
  else{const a=alpha*Math.PI/180,ex=cx+R*Math.cos(a),ey=cy-R*Math.sin(a);
    s=`<circle class="s-dash" cx="${cx}" cy="${cy}" r="${R}"/><path class="f1 s-line" d="M${cx},${cy} L${cx+R},${cy} A${R} ${R} 0 ${alpha>180?1:0} 0 ${ex.toFixed(1)},${ey.toFixed(1)} Z"/>
    <text x="${cx+R/2}" y="${cy+20}" text-anchor="middle">${r} cm</text><path class="s-mark" d="M${cx+22},${cy} A22 22 0 ${alpha>180?1:0} 0 ${(cx+22*Math.cos(a)).toFixed(1)},${(cy-22*Math.sin(a)).toFixed(1)}"/>
    <text class="t-red" x="${(cx+40*Math.cos(a/2)).toFixed(1)}" y="${(cy-40*Math.sin(a/2)+5).toFixed(1)}" text-anchor="middle">${alpha}°</text>`}
  return `<svg viewBox="0 0 360 240" role="img" aria-label="Daire">${s}<circle class="f-ink" cx="${cx}" cy="${cy}" r="3"/></svg>`;
}
function rhombusSVG(e,f){const sc=Math.min(300/e,200/f),hx=e*sc/2,hy=f*sc/2,cx=180,cy=120;
  return `<svg viewBox="0 0 360 240" role="img" aria-label="Eşkenar dörtgen"><polygon class="f1 s-line" points="${cx-hx},${cy} ${cx},${cy-hy} ${cx+hx},${cy} ${cx},${cy+hy}"/>
  <line class="s-dash" x1="${cx-hx}" y1="${cy}" x2="${cx+hx}" y2="${cy}"/><line class="s-dash" x1="${cx}" y1="${cy-hy}" x2="${cx}" y2="${cy+hy}"/>
  <text x="${cx+hx/2}" y="${cy-8}" text-anchor="middle">${e} cm</text><text x="${cx+8}" y="${cy+hy/2+5}">${f} cm</text></svg>`}
function trapSVG(a,c,h){const s=Math.min(270/a,150/h),x0=45,y0=200,off=(a-c)*s*.3;
  return `<svg viewBox="0 0 360 240" role="img" aria-label="Yamuk"><polygon class="f1 s-line" points="${x0},${y0} ${x0+a*s},${y0} ${x0+off+c*s},${y0-h*s} ${x0+off},${y0-h*s}"/>
  <line class="s-dash" x1="${x0+off}" y1="${y0-h*s}" x2="${x0+off}" y2="${y0}"/><polyline class="s-mark" points="${x0+off},${y0-10} ${x0+off+10},${y0-10} ${x0+off+10},${y0}"/>
  <text x="${x0+a*s/2}" y="${y0+22}" text-anchor="middle">${a} cm</text><text x="${x0+off+c*s/2}" y="${y0-h*s-8}" text-anchor="middle">${c} cm</text><text x="${x0+off+16}" y="${y0-h*s/2+5}">${h} cm</text></svg>`}
function g9(only){
  const t=pick(only||['daire','daire','dilim','dilim','dilim','esk','esk','yamuk','yamuk','problem']),cm2=v=>num(v)+' cm²';
  if(t==='daire'){const r=ri(2,9);return {kind:'choice',visual:circleSVG(r),options:choice(cm2(3*r*r),[cm2(6*r),cm2(12*r*r),cm2(3*r),cm2(r*r)]),prompt:`<p>Dairenin alanı kaç cm²'dir? (π = 3 alınız.)</p>`,
    explain:`Dairenin alanı = π · r² = 3 · ${r}² = 3 · ${r*r} = ${3*r*r} cm²`}}
  if(t==='dilim'){let r,al,A;do{r=pick([2,4,6,8,10,12]);al=pick([30,45,60,90,120,150,180,240,270]);A=3*r*r*al/360}while(A!==Math.round(A));
    return {kind:'choice',visual:circleSVG(r,al),options:choice(cm2(A),[cm2(3*r*r),cm2(6*r*al/360),cm2(3*r*r*(360-al)/360),cm2(3*r*r*al/180)]),prompt:`<p>Daire diliminin alanı kaç cm²'dir? (π = 3 alınız.)</p>`,
      explain:`Dilim, dairenin ${fr(al,360,false)} = ${fr(al,360)} kadarıdır: 3 · ${r}² · ${fr(al,360)} = ${3*r*r} · ${fr(al,360)} = ${num(A)} cm²`}}
  if(t==='esk'){const e=2*ri(2,8),f=2*ri(2,7);return {kind:'choice',visual:rhombusSVG(e,f),options:choice(cm2(e*f/2),[cm2(e*f),cm2(e+f),cm2(2*(e+f)),cm2(e*f/4)]),prompt:`<p>Köşegen uzunlukları verilen eşkenar dörtgenin alanı kaç cm²'dir?</p>`,
    explain:`Eşkenar dörtgenin alanı = köşegenlerin çarpımının yarısı = ${e} · ${f} : 2 = ${e*f/2} cm²`}}
  if(t==='yamuk'){let a,c,h;do{a=ri(8,16);c=ri(3,a-2);h=ri(3,9)}while(((a+c)*h)%2);return {kind:'choice',visual:trapSVG(a,c,h),options:choice(cm2((a+c)*h/2),[cm2((a+c)*h),cm2(a*h),cm2(a*c*h/2),cm2((a+c+h)*2)]),
    prompt:`<p>Yamuğun alanı kaç cm²'dir?</p>`,explain:`Yamuğun alanı = (alt taban + üst taban) · yükseklik : 2 = (${a} + ${c}) · ${h} : 2 = ${(a+c)*h/2} cm²`}}
  const r=ri(3,12);return {kind:'number',answer:3*r*r,unit:'m²',prompt:`<p>Yarıçapı ${r} m olan daire biçiminde bir çim alan var. Çim alanın alanı kaç m²'dir? (π = 3 alınız.)</p>`,explain:`π · r² = 3 · ${r}² = ${3*r*r} m²`};
}

/* ================= lesson-level question types (Stage 1) ================= */
/* 1.1 Tam sayılar: integers from real-life situations, opposites, comparison */
function g1Tam(){
  if(Math.random()<.45){const vals=new Set();while(vals.size<4)vals.add(ri(-12,12));const arr=[...vals],big=Math.random()<.5,target=big?Math.max(...arr):Math.min(...arr),negAbs=arr.filter(v=>v<0).map(Math.abs);
    const misOf=v=>{if(v===target)return null;if(big&&v<0&&Math.abs(v)===Math.max(...negAbs))return 'negIllusion';if(!big&&v<0&&negAbs.length>1&&Math.abs(v)===Math.min(...negAbs))return 'negIllusion';if(v===(big?Math.min(...arr):Math.max(...arr)))return 'maxMin';return 'other'};
    return {kind:'choice',sk:'int-basic',options:shuffle(arr.map(v=>({html:neg(v),ok:v===target,mis:misOf(v)}))),prompt:`<p>Hangisi <b>en ${big?'büyük':'küçük'}</b> tam sayıdır?</p>`,explain:`Sayı doğrusunda sıralama: ${arr.slice().sort((a,b)=>a-b).map(neg).join(' &lt; ')}. Sağdaki sayı büyüktür.`}}
  const n=ri(1,9),C=[[`Hava sıcaklığı sıfırın ${n} derece altında. Bu sıcaklığı gösteren tam sayıyı işaretle.`,-n,`Sıfırın altı negatif yöndür: −${n}`],
    [`Bir asansör zemin kattan (0) ${n} kat aşağı indi. Bulunduğu katı gösteren tam sayıyı işaretle.`,-n,`Aşağı yön negatiftir: −${n}`],
    [`Bir dalgıç deniz seviyesinin ${n} metre altında. Konumunu gösteren tam sayıyı işaretle.`,-n,`Deniz seviyesi 0'dır; altı negatiftir: −${n}`],
    [`Sıfırın ${n} birim sağındaki tam sayıyı işaretle.`,n,`Sağ yön pozitiftir: ${n}`],
    [`−${n} sayısının ters işaretlisini işaretle.`,n,`Ters işaretli sayılar sıfıra eşit uzaklıktadır: −${n} ve ${n}`],
    [`${n} sayısının ters işaretlisini işaretle.`,-n,`Ters işaretli sayılar sıfıra eşit uzaklıktadır: ${n} ve −${n}`]];
  const [p,v,why]=pick(C);
  return {kind:'line',sk:'int-basic',classify:x=>x===-v?'sign':Math.abs(x-v)===1?'offByOne':'other',min:-10,max:10,den:1,labelEvery:2,target:v,prompt:`<p>${p}</p>`,explain:why,answerText:neg(v)};
}
/* 1.7 Rasyonel sayılarla işlemler: + − · : with fractions; wrong options carry the misconception they come from */
function g1RatOps(){
  const op=pick(['+','−','·',':']);const b=ri(2,6),d=ri(2,6);let a;do{a=ri(-5,5)}while(!a);let c=ri(1,5);if(Math.random()<.3)c=-c;
  let n,m,w=[],why;const C2=c<0?`(${fr(c,d)})`:fr(c,d);
  if(op==='+'){n=a*d+c*b;m=b*d;w=[{h:fr(a+c,b+d),mis:'fracAdd'},{h:fr(a+c,b*d),mis:'fracAdd'},{h:fr(a*d-c*b,m),mis:'sign'}];why=`Paydaları eşitle: ${fr(a*d,m,false)} + ${c<0?'('+fr(c*b,m,false)+')':fr(c*b,m,false)} = ${fr(n,m,false)}`}
  if(op==='−'){n=a*d-c*b;m=b*d;w=[{h:fr(a-c,Math.abs(b-d)||1),mis:'fracAdd'},{h:fr(a*d+c*b,m),mis:c<0?'doubleNeg':'sign'},{h:fr(-n,m),mis:'sign'}];why=`Paydaları eşitle: ${fr(a*d,m,false)} − ${c<0?'('+fr(c*b,m,false)+')':fr(c*b,m,false)} = ${fr(n,m,false)}`}
  if(op==='·'){n=a*c;m=b*d;w=[{h:fr(a*d,b*c),mis:'divFlip'},{h:fr(-n,m),mis:'mulSign'},{h:fr(a*c,b+d),mis:'other'}];why=`Pay ile pay, payda ile payda çarpılır: ${fr(a,b,false)} · ${C2} = ${fr(n,m,false)}`}
  if(op===':'){n=a*d;m=b*c;w=[{h:fr(a*c,b*d),mis:'divFlip'},{h:fr(-n,m),mis:'mulSign'},{h:fr(b*c,a*d),mis:'divFlip'}];why=`İkinci kesri ters çevirip çarp: ${fr(a,b,false)} · ${fr(d,c,false)} = ${fr(n,m,false)}`}
  const corr=fr(n,m);if(gcd(n,m)>1&&n!==0)why+=` = ${corr}`;
  return {kind:'choice',sk:'rat-ops',options:choice(corr,w),prompt:`<p>İşlemin sonucu kaçtır?</p><p class="big">${fr(a,b,false)} ${op} ${C2}</p>`,explain:why};
}
/* 1.8 Çok adımlı işlemler: order of operations */
function g1Multi(){
  const f=pick(['a+b*c','(a+b)*c','a-b:c','a*b-c*d','a:b+c']);let a,b,c,d,v,lr,expr,why;
  for(;;){a=ri(-9,9);b=ri(-6,6);c=ri(-5,5);d=ri(-5,5);if(!a||!b||!c||!d)continue;
    if(f==='a+b*c'){v=a+b*c;lr=(a+b)*c;expr=`${par(a)} + ${par(b)} · ${par(c)}`;why=`Önce çarpma: ${par(b)} · ${par(c)} = ${neg(b*c)}. Sonra toplama: ${par(a)} + ${par(b*c)} = ${neg(v)}`}
    if(f==='(a+b)*c'){if(a+b===0)continue;v=(a+b)*c;lr=a+b*c;expr=`(${neg(a)} + ${par(b)}) · ${par(c)}`;why=`Önce parantez: ${neg(a)} + ${par(b)} = ${neg(a+b)}. Sonra çarpma: ${par(a+b)} · ${par(c)} = ${neg(v)}`}
    if(f==='a-b:c'){c=ri(2,5)*pick([1,-1]);b=c*ri(1,4)*pick([1,-1]);v=a-b/c;lr=(a-b)/c;expr=`${par(a)} − ${par(b)} : ${par(c)}`;why=`Önce bölme: ${par(b)} : ${par(c)} = ${neg(b/c)}. Sonra çıkarma: ${par(a)} − ${par(b/c)} = ${neg(v)}`}
    if(f==='a*b-c*d'){a=ri(-5,5)||2;v=a*b-c*d;lr=(a*b-c)*d;expr=`${par(a)} · ${par(b)} − ${par(c)} · ${par(d)}`;why=`Önce iki çarpma: ${neg(a*b)} ve ${neg(c*d)}. Sonra çıkarma: ${par(a*b)} − ${par(c*d)} = ${neg(v)}`}
    if(f==='a:b+c'){b=ri(2,5)*pick([1,-1]);a=b*ri(-5,5);if(!a)continue;v=a/b+c;lr=b+c?a/(b+c):NaN;expr=`${par(a)} : ${par(b)} + ${par(c)}`;why=`Önce bölme: ${par(a)} : ${par(b)} = ${neg(a/b)}. Sonra toplama: ${par(a/b)} + ${par(c)} = ${neg(v)}`}
    if(Math.abs(v)<=60)break}
  return {kind:'number',sk:'multi',answer:v,unit:'',classify:p=>(Number.isFinite(lr)&&p===lr&&lr!==v)?'order':(p===-v&&v!==0)?'sign':'other',
    prompt:`<p>İşlem önceliğine dikkat ederek hesapla.</p><p class="big">${expr}</p>`,explain:`${why}. Kural: önce parantez, sonra çarpma ve bölme, en son toplama ve çıkarma.`};
}
/* 2.1 Cisimlerin görünümleri: a 3D structure to turn; pick its front / top / right view, or count its cubes */
function viewsOf(H){const front=[0,1,2].map(x=>Math.max(...H.map(r=>r[x]))),side=H.map(r=>Math.max(...r)),top=new Set();H.forEach((r,y)=>r.forEach((h,x)=>{if(h)top.add(x+','+y)}));return {front,side,top}}
const colsSet=h=>{const s=new Set();h.forEach((v,i)=>{for(let j=0;j<v;j++)s.add(i+','+j)});return s};
function viewGridSVG(cells){const c=26;let s='';for(let i=0;i<3;i++)for(let j=0;j<3;j++){const on=cells.has(i+','+j);
  s+=`<rect x="${2+i*c}" y="${2+(2-j)*c}" width="${c}" height="${c}" ${on?'class="f2" style="stroke:var(--ink);stroke-width:2"':'style="fill:none;stroke:var(--ink-soft);stroke-width:1;stroke-dasharray:3 3"'}/>`}
  return `<svg class="vopt" viewBox="0 0 82 82" aria-hidden="true">${s}</svg>`}
function g2Views(){
  let H;for(;;){H=[0,1].map(()=>[0,1,2].map(()=>ri(0,3)));const n=H.flat().reduce((a,b)=>a+b,0);if(n>=4&&n<=9&&H[0].some(v=>v)&&H[1].some(v=>v))break}
  const cubes=[];H.forEach((row,y)=>row.forEach((h,x)=>{for(let z=0;z<h;z++)cubes.push([x,y,z])}));const V=viewsOf(H),n=cubes.length;
  if(Math.random()<.25)return {kind:'number',answer:n,unit:'birim küp',v3d:{kind:'stack',cubes,label:'sürükleyerek döndür'},visual:cubeStackSVG(cubes,false),classify:()=>'viewMix',
    prompt:`<p>Bu yapıda <b>kaç birim küp</b> var? Yapıyı döndürerek arkada saklanan küplere de bak.</p>`,explain:`Her yığındaki küpleri topla: ${H.flat().filter(v=>v).join(' + ')} = ${n}. Önden bakınca arkadaki küpler saklanır; döndürmek bu yüzden önemlidir.`};
  const K={front:['önden',colsSet(V.front)],top:['üstten',V.top],side:['sağdan',colsSet(V.side)]},ask=pick(Object.keys(K)),key=s=>[...s].sort().join('|');
  const base=ask==='side'?V.side:V.front,alt=base.slice(),i=ri(0,alt.length-1);alt[i]=alt[i]>=3?alt[i]-1:alt[i]+1;
  const cand=[...Object.keys(K).filter(k=>k!==ask).map(k=>K[k][1]),colsSet(base.slice().reverse()),colsSet(alt)],seen=new Set([key(K[ask][1])]),wrongs=[];
  for(const ws of cand){const kk=key(ws);if(ws.size&&!seen.has(kk)){seen.add(kk);wrongs.push({h:viewGridSVG(ws),mis:'viewMix'})}}
  for(let tries=0;wrongs.length<3&&tries<40;tries++){let ws;
    if(ask==='top'){ws=new Set(K.top[1]);const c=ri(0,2)+','+ri(0,1);ws.has(c)?ws.delete(c):ws.add(c)}
    else{const h=base.slice(),j=ri(0,h.length-1);h[j]=Math.max(0,Math.min(3,h[j]+pick([-1,1])));ws=colsSet(h)}
    const kk=key(ws);if(ws.size&&!seen.has(kk)){seen.add(kk);wrongs.push({h:viewGridSVG(ws),mis:'viewMix'})}}
  return {kind:'choice',sk:null,v3d:{kind:'stack',cubes,label:'sürükleyerek döndür'},visual:cubeStackSVG(cubes,false),options:choice(viewGridSVG(K[ask][1]),wrongs),
    prompt:`<p>Bu yapının <b>${K[ask][0]} görünümü</b> hangisidir? Yapıyı döndürüp ${K[ask][0]} bakabilirsin.</p>`,
    explain:{front:'Önden görünümde her sütunun en yüksek küpü çizilir; arkadaki küpler öndekilerin arkasına saklanır.',top:'Üstten görünümde altında küp olan her taban karesi boyanır; yükseklik görünmez. Ön sıra aşağıdadır.',side:'Sağdan görünümde her derinlik sırasının en yüksek küpü çizilir; ön sıra soldadır.'}[ask]};
}
/* 8.4 İspat: statements (önerme), true or false, counterexamples (karşıt örnek), why examples are not a proof, general forms, proof steps */
const ONERME_OK=['7 bir asal sayıdır.','Bir haftada 7 gün vardır.','12, 5\'ten küçüktür.','Her kare bir dikdörtgendir.','İki çift sayının toplamı çifttir.','Türkiye\'nin başkenti Ankara\'dır.','−3 bir doğal sayıdır.','Bir üçgenin üç kenarı vardır.'];
const ONERME_NO=[['Bugün kaçıncı gün?','soru'],['Kapıyı kapat!','emir'],['Matematik çok eğlencelidir.','görüş'],['Keşke tatil olsa.','dilek'],['Bu soruyu çözebilir misin?','soru'],['Lütfen sessiz ol.','rica'],['Mavi en güzel renktir.','görüş'],['x + 2 sayısı kaçtır?','soru']];
const DY=[['İki tek sayının toplamı çifttir.',1,'Tek sayılar 2a + 1 ve 2b + 1 biçimindedir: toplamları 2(a + b + 1), yani çifttir.'],['Her asal sayı tektir.',0,'Karşıt örnek: 2 asaldır ama çifttir.'],
  ['Bir sayının 0 ile çarpımı 0\'dır.',1,'Her sayı için a · 0 = 0 olur.'],['İki negatif tam sayının toplamı pozitiftir.',0,'Karşıt örnek: (−2) + (−3) = −5, negatiftir.'],['Her çift sayı 4\'e tam bölünür.',0,'Karşıt örnek: 6 çifttir ama 4\'e tam bölünmez.'],
  ['Ardışık iki tam sayının toplamı tektir.',1,'n + (n + 1) = 2n + 1 her zaman tektir.'],['Her dikdörtgen bir karedir.',0,'Karşıt örnek: kenarları 2 cm ve 5 cm olan dikdörtgen kare değildir.'],['Her kare bir dikdörtgendir.',1,'Karenin dört açısı da diktir; bu yüzden her kare bir dikdörtgendir.'],
  ['Bir sayının karesi her zaman kendisinden büyüktür.',0,'Karşıt örnek: 1² = 1, kendisinden büyük değildir.'],['İki çift sayının çarpımı çifttir.',1,'2a · 2b = 2(2ab) her zaman çifttir.']];
const KARSIT=[['Her asal sayı tektir.','2',['3','5','7','11'],'2 asaldır ama tek değildir; önermeyi bozar.'],['Her çift sayı 4\'e tam bölünür.','6',['4','8','12','16'],'6 çifttir ama 4\'e tam bölünmez.'],
  ['İki sayının çarpımı her zaman toplamlarından büyüktür.','1 ve 2',['3 ve 4','2 ve 5','4 ve 6','3 ve 5'],'1 · 2 = 2, ama 1 + 2 = 3; çarpım toplamdan küçüktür.'],['Bir sayının karesi her zaman kendisinden büyüktür.','1',['2','3','5','10'],'1² = 1, kendisinden büyük değildir.'],
  ['İki negatif tam sayının çarpımı negatiftir.','(−2) ve (−3)',['(−2) ve 3','2 ve (−3)','(−1) ve 4','5 ve (−2)'],'(−2) · (−3) = +6, pozitiftir; önermeyi bozar.'],['x + 3 &gt; 5 eşitsizliği her tam sayı x için doğrudur.','x = 1',['x = 3','x = 4','x = 10','x = 6'],'1 + 3 = 4, 5\'ten büyük değildir.'],
  ['Her tek sayı asaldır.','9',['3','5','7','13'],'9 tektir ama 3 · 3 olduğu için asal değildir.']];
const GENEL=[['Herhangi bir <b>tek</b> sayı','2n + 1',['2n','n + 1','3n'],'Tek sayılar 2 ile bölününce 1 kalanı verir: 2n + 1.'],['Herhangi bir <b>çift</b> sayı','2n',['2n + 1','n + 2','n²'],'Çift sayılar 2\'nin katıdır: 2n.'],
  ['<b>3\'ün katı</b> olan bir sayı','3n',['n + 3','3n + 1','n³'],'3\'ün katları 3 ile çarpılmış tam sayılardır: 3n.'],['<b>n</b>\'den sonra gelen tam sayı','n + 1',['2n','n − 1','n + 2'],'Ardışık tam sayılar 1 fark eder: n\'den sonra n + 1 gelir.']];
const ADIM_I=[['Ardışık iki tam sayının toplamı tektir.','n + (n + 1)','2n + 1',['2n','2n + 2','n + 1'],'n + (n + 1) = 2n + 1; 2n çift, 1 eklenince tek olur.'],
  ['İki çift sayının toplamı çifttir.','2a + 2b','2(a + b)',['2ab','a + b','4ab'],'2a + 2b = 2(a + b): 2\'nin katı, yani çift.'],
  ['Ardışık üç tam sayının toplamı 3\'e tam bölünür.','n + (n + 1) + (n + 2)','3(n + 1)',['3n','3n + 2','n + 3'],'n + n + 1 + n + 2 = 3n + 3 = 3(n + 1): 3\'ün katı.'],
  ['Bir tek sayı ile bir çift sayının toplamı tektir.','(2a + 1) + 2b','2(a + b) + 1',['2(a + b)','2ab + 1','a + b + 1'],'(2a + 1) + 2b = 2(a + b) + 1 her zaman tektir.']];
function g8Proof(only){const t=pick(only||['onerme','dy','dy','karsit','karsit','ornek','genel','adim','adim']);
  if(t==='onerme'){const ok=pick(ONERME_OK),w=shuffle(ONERME_NO).slice(0,3);
    return {kind:'choice',options:choice(ok,w.map(([s])=>({h:s,mis:'notStatement'}))),prompt:'<p>Hangisi bir <b>önermedir</b>?</p>',explain:`Önerme, doğru ya da yanlış olduğu kesin olarak söylenebilen bir cümledir. "${ok}" böyledir. Diğerleri ${[...new Set(w.map(x=>x[1]))].join(', ')} bildirir; doğru ya da yanlış denemez.`}}
  if(t==='dy'){const [s,v,e]=pick(DY);return {kind:'choice',options:[{html:'Doğru önerme',ok:v===1,mis:v===1?null:'examplesProof'},{html:'Yanlış önerme',ok:v===0,mis:v===0?null:'counterEx'}],prompt:`<p>Bu önerme doğru mu, yanlış mı?</p><p class="big" style="font-size:clamp(1.2rem,2.6vw,2.2rem)">${s}</p>`,explain:e}}
  if(t==='karsit'){const [s,c,w,e]=pick(KARSIT);return {kind:'choice',options:choice(c,shuffle(w).slice(0,3).map(h=>({h,mis:'counterEx'}))),prompt:`<p>Bu önerme yanlıştır. Hangisi bir <b>karşıt örnektir</b>?</p><p class="big" style="font-size:clamp(1.2rem,2.6vw,2.2rem)">${s}</p>`,explain:`Karşıt örnek, önermeyi bozan tek bir örnektir: ${e} Diğer seçenekler önermeye uyar, bu yüzden karşıt örnek değildir.`}}
  if(t==='ornek'){const n=pick([3,5,10,20]);return {kind:'choice',options:choice('Hayır; her durumu kapsayan genel bir ispat gerekir.',[{h:'Evet, bu kadar örnek yeter.',mis:'examplesProof'},{h:`Evet, ${n*10} örnek denerse kesin olur.`,mis:'examplesProof'},{h:'Hayır; önerme kesinlikle yanlıştır.',mis:'counterEx'}]),
    prompt:`<p>Ece "iki tek sayının toplamı çifttir" önermesini <b>${n} örnekte</b> denedi ve hepsi doğru çıktı. Önerme her zaman doğru diyebilir mi?</p>`,explain:'Örnekler bir fikir verir ama ispat değildir; denemediğimiz bir sayıda bozulabilir. Her zaman doğru olduğunu harflerle genel bir ispatla gösteririz: (2a + 1) + (2b + 1) = 2(a + b + 1).'}}
  if(t==='genel'){const [s,c,w,e]=pick(GENEL);return {kind:'choice',options:choice(c,w.map(h=>({h,mis:'examplesProof'}))),prompt:`<p>${s} harflerle (n bir tam sayı) nasıl yazılır?</p>`,explain:e}}
  const [s,ex,c,w,e]=pick(ADIM_I);return {kind:'choice',options:choice(c,w.map(h=>({h,mis:'examplesProof'}))),prompt:`<p>İspatı tamamla: <b>${s}</b></p><p class="big" style="font-size:clamp(1.2rem,2.6vw,2.2rem)">${ex} = ?</p>`,explain:e};
}
/* 3.2 Araştırma sorusu */
const SORU_OK=['Sınıfımızdaki öğrenciler haftada kaç saat kitap okuyor?','Okulumuzdaki öğrenciler en çok hangi sporu seviyor?','Mahallemizdeki ailelerin kaç evcil hayvanı var?','7. sınıf öğrencileri okula nasıl geliyor?','Sınıfımızdaki öğrencilerin boy uzunlukları nasıl dağılıyor?','Öğrenciler günde kaç bardak su içiyor?','Okulumuzdaki öğrencilerin kaç kardeşi var?','Sınıfımızdakiler hafta sonu kaç saat ekran başında kalıyor?'];
const SORU_NO=['Ali\'nin boyu kaç santimetredir?','Bugün hava kaç derece?','Türkiye\'nin başkenti neresidir?','Annemin doğum günü hangi gün?','Okulumuzun kaç kapısı var?','Bu kalem kaç liradır?','Sınıf öğretmenimizin adı nedir?','Bir haftada kaç gün vardır?'];
function g3Soru(){const ok=pick(SORU_OK);return {kind:'choice',options:choice(ok,shuffle(SORU_NO).slice(0,3)),prompt:`<p>Hangisi bir <b>istatistiksel araştırma sorusudur</b>?</p>`,
  explain:`İstatistiksel araştırma sorusunun cevabı kişiden kişiye <b>değişir</b>; cevaplamak için birçok veri toplamak gerekir. "${ok}" böyle bir sorudur. Diğerlerinin tek ve kesin bir cevabı vardır.`}}
/* 3.3 Veri toplama yöntemi */
const TOPLA=[['Öğrencilerin en sevdiği meyveyi öğrenmek','Anket'],['Bir kavşaktan bir saatte geçen araç sayısını bulmak','Gözlem'],['Bitkilerin farklı ışıkta ne kadar uzadığını bulmak','Deney'],['Sınıftaki öğrencilerin boy uzunluklarını bulmak','Ölçme'],
  ['Ailelerin hangi tatil yerini tercih ettiğini öğrenmek','Anket'],['Teneffüste kantinde kaç öğrencinin sıra beklediğini bulmak','Gözlem'],['Farklı topların aynı yükseklikten bırakılınca ne kadar zıpladığını bulmak','Deney'],['Öğrencilerin okul çantalarının kütlesini bulmak','Ölçme']];
const TOPLA_W={Anket:'Kişilerin görüşü veya tercihi isteniyorsa onlara soru sorarız: anket.',Gözlem:'Olayı izleyip sayarak veri toplarız: gözlem.',Deney:'Bir koşulu değiştirip sonuçları karşılaştırırız: deney.',Ölçme:'Uzunluk, kütle gibi büyüklükleri bir araçla ölçeriz: ölçme.'};
function g3Toplama(){const [t,k]=pick(TOPLA);const O={Anket:'Anket (soru sorma)',Gözlem:'Gözlem (izleyip sayma)',Deney:'Deney (koşulu değiştirip deneme)',Ölçme:'Ölçme (araçla ölçme)'};
  return {kind:'choice',options:Object.keys(O).map(h=>({html:O[h],ok:h===k})),prompt:`<p>Amaç: <b>${t}</b>. Veriyi toplamak için en uygun yöntem hangisidir?</p>`,explain:TOPLA_W[k]}}
/* 3.6 İstatistiksel araştırma süreci */
const ADIM=['Araştırma sorusunu belirleme','Verileri toplama ve analize hazırlama','Veri analizi (görselleştirme ve özetleme)','Veriyi yorumlama ve karar verme'];
const ADIMS=[['"Öğrenciler gece kaç saat uyuyor?" sorusunu yazdılar.',0],['Neyi merak ettiklerine karar verip soruyu netleştirdiler.',0],['Sınıftaki herkese anket formu dağıttılar.',1],['Gelen cevapları bir tabloya düzenlediler.',1],
  ['Verilerle bir nokta grafiği çizdiler.',2],['Ortalamayı, ortancayı ve açıklığı hesapladılar.',2],['"Öğrencilerin çoğu 8 saatten az uyuyor" sonucuna vardılar.',3],['Sonuçlara göre okul yönetimine bir öneri yazdılar.',3]];
function g3Surec(){
  if(Math.random()<.4){const S0=['Soru','Veri toplama','Analiz','Yorum ve karar'],seq=a=>a.map(i=>S0[i]).join(' → ');
    return {kind:'choice',options:choice(seq([0,1,2,3]),[seq([1,0,2,3]),seq([0,2,1,3]),seq([3,0,1,2]),seq([0,1,3,2])]),prompt:`<p>İstatistiksel araştırma sürecinin <b>doğru sırası</b> hangisidir?</p>`,
      explain:`Önce ne öğrenmek istediğimizi soruya dökeriz, sonra veri toplarız, verileri analiz ederiz ve en son yorumlayıp karar veririz: ${ADIM.join(' → ')}.`}}
  const [t,k]=pick(ADIMS);return {kind:'choice',options:ADIM.map((h,i)=>({html:h,ok:i===k})),prompt:`<p>Bir öğrenci grubu araştırma yapıyor: <b>${t}</b></p><p>Bu, sürecin hangi adımıdır?</p>`,explain:`Bu adım "${ADIM[k]}" aşamasıdır. Sıra: ${ADIM.join(' → ')}.`}}
/* 6.1 Oran */
function g6Oran(){let a,b;do{a=ri(2,20);b=ri(2,20)}while(a===b);const [x,y,place,noun]=pick([['kız','erkek','Bir sınıfta','öğrenci'],['kırmızı','mavi','Bir kutuda','top'],['kedi','köpek','Bir barınakta','']]);
  const r=(p,q)=>{const g=gcd(p,q);return `${p/g} : ${q/g}`},nn=noun?' '+noun:'',cap=s=>s[0].toLocaleUpperCase('tr')+s.slice(1);
  return {kind:'choice',options:choice(r(a,b),[r(b,a),r(a,a+b),r(a+b,b)]),prompt:`<p>${place} ${a} ${x} ve ${b} ${y}${nn} var. ${cap(x)}${nn} sayısının ${y}${nn} sayısına oranı nedir?</p>`,
    explain:`Oran = ${a} : ${b}${gcd(a,b)>1?`. İkisini de ${gcd(a,b)} ile sadeleştir: ${r(a,b)}`:''}. Sıra önemlidir: önce ${x}, sonra ${y}.`}}

/* lesson drawings */
const CUBES=[[0,0,0],[1,0,0],[2,0,0],[0,1,0],[0,0,1],[1,0,1],[0,1,1]];
function cubeStackSVG(list=CUBES,showCount=true){const s=52,mx=Math.max(...list.map(q=>q[0]))+1,my=Math.max(...list.map(q=>q[1]))+1,mz=Math.max(...list.map(q=>q[2]))+1,ox=24,oy=24+(mz+my*.5)*s,
  vw=ox*2+(mx+my*.5)*s,vh=oy+(showCount?44:20),Pp=(x,y,z)=>[ox+x*s+y*s*.5,oy-z*s-y*s*.5],pts=a=>a.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ');let g='';
  for(const [x,y,z] of list.slice().sort((a,b)=>b[1]-a[1]||a[2]-b[2]||a[0]-b[0]))
    g+=`<polygon class="f3 s-line" points="${pts([Pp(x+1,y,z),Pp(x+1,y+1,z),Pp(x+1,y+1,z+1),Pp(x+1,y,z+1)])}"/><polygon class="f2 s-line" points="${pts([Pp(x,y,z+1),Pp(x+1,y,z+1),Pp(x+1,y+1,z+1),Pp(x,y+1,z+1)])}"/><polygon class="f1 s-line" points="${pts([Pp(x,y,z),Pp(x+1,y,z),Pp(x+1,y,z+1),Pp(x,y,z+1)])}"/>`;
  return `<svg viewBox="0 0 ${vw} ${vh}" role="img" aria-label="Birim küplerden yapı">${g}${showCount?`<text x="${vw/2}" y="${vh-12}" text-anchor="middle">${list.length} birim küp</text>`:''}</svg>`}
function cubeViewsSVG(){const c=34,grid=(set,w,h,x0,label)=>{let s='';for(let i=0;i<w;i++)for(let j=0;j<h;j++)s+=`<rect x="${x0+i*c}" y="${30+(h-1-j)*c}" width="${c}" height="${c}" ${set.has(i+','+j)?'class="f2" style="stroke:var(--ink);stroke-width:2"':'style="fill:none;stroke:var(--ink-soft);stroke-width:1.5;stroke-dasharray:4 4"'}/>`;return s+`<text x="${x0+w*c/2}" y="${30+h*c+28}" text-anchor="middle" style="font-size:16px">${label}</text>`};
  return `<svg viewBox="0 0 400 140" role="img" aria-label="Önden, üstten, sağdan görünümler">${grid(new Set(CUBES.map(([x,,z])=>x+','+z)),3,2,10,'Önden')}${grid(new Set(CUBES.map(([x,y])=>x+','+y)),3,2,150,'Üstten')}${grid(new Set(CUBES.map(([,y,z])=>y+','+z)),2,2,300,'Sağdan')}</svg>`}
function netSVG(a,b,c){const s=22,x0=b*s+10,R=(x,y,w,h,cl,l)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${cl} s-line"/><text x="${x+w/2}" y="${y+h/2+5}" text-anchor="middle" style="font-size:12px">${l}</text>`;
  return `<svg viewBox="0 0 ${2*b*s+a*s+20} ${2*b*s+2*c*s+20}" role="img" aria-label="Prizma açınımı">${R(x0,10,a*s,b*s,'f2',`${a}×${b}`)}${R(x0,10+b*s,a*s,c*s,'f1',`${a}×${c}`)}${R(x0,10+b*s+c*s,a*s,b*s,'f2',`${a}×${b}`)}${R(x0,10+2*b*s+c*s,a*s,c*s,'f1',`${a}×${c}`)}${R(10,10+b*s,b*s,c*s,'f3',`${b}×${c}`)}${R(x0+a*s,10+b*s,b*s,c*s,'f3',`${b}×${c}`)}</svg>`}
function miniReflectSVG(){const c=30,S0=[[1,1],[1,2],[1,3],[2,3],[3,3],[3,2]];let s='';
  for(let r=0;r<6;r++)for(let k=0;k<10;k++){const sh=S0.some(([cc,rr])=>cc===k&&rr===r),im=S0.some(([cc,rr])=>9-cc===k&&rr===r);s+=`<rect x="${k*c}" y="${r*c}" width="${c}" height="${c}" class="${sh?'f2':im?'f-hl':'f3'}" style="stroke:var(--line)"/>`}
  return `<svg viewBox="-4 -4 308 196" role="img" aria-label="Yansıma örneği">${s}<line x1="150" y1="-4" x2="150" y2="186" style="stroke:var(--pink);stroke-width:4;stroke-dasharray:9 6"/><text x="75" y="186" text-anchor="middle">şekil</text><text x="225" y="186" text-anchor="middle">görüntü</text></svg>`}
/* compass constructions draw themselves step by step on the lesson stage (classes dl = draw the stroke, fi = fade in; delays in seconds) */
function constructSVG(kind){const arcPath=(cx,cy,r,a1,a2,d=0)=>{const p=a=>[(cx+r*Math.cos(a*Math.PI/180)).toFixed(1),(cy+r*Math.sin(a*Math.PI/180)).toFixed(1)];return `<path d="M${p(a1)} A${r} ${r} 0 0 1 ${p(a2)}" pathLength="1" class="dl" style="animation-delay:${d}s" fill="none" stroke="var(--gold)" stroke-width="3"/>`},fi=d=>`class="fi" style="animation-delay:${d}s"`;
  if(kind==='perp')return `<svg viewBox="0 0 400 320" role="img" aria-label="Orta dikme inşası"><line x1="80" y1="160" x2="320" y2="160" class="s-line" style="stroke-width:4"/>${arcPath(80,160,150,-50,50,.4)}${arcPath(320,160,150,130,230,1.5)}
    <g ${fi(2.6)}><circle cx="200" cy="70" r="5" class="f-ink"/><circle cx="200" cy="250" r="5" class="f-ink"/></g><g ${fi(3.2)}><line x1="200" y1="30" x2="200" y2="290" style="stroke:var(--pink);stroke-width:4;stroke-dasharray:8 6"/><circle cx="200" cy="160" r="6" fill="var(--pink)"/></g>
    <text x="70" y="186" style="font-size:18px">A</text><text x="322" y="186" style="font-size:18px">B</text><text x="210" y="186" style="font-size:18px" ${fi(3.4)}>M</text></svg>`;
  const O=[60,250],deg=50,dir=a=>[Math.cos(a*Math.PI/180),-Math.sin(a*Math.PI/180)],P1=[O[0]+110,O[1]],d2=dir(deg),P2=[O[0]+110*d2[0],O[1]+110*d2[1]],db=dir(deg/2);
  const A=P1[0]-O[0],t=(2*A*db[0]+Math.sqrt(Math.pow(2*A*db[0],2)-4*(A*A-8100)))/2,Q=[O[0]+t*db[0],O[1]+t*db[1]],ang=(p,q)=>Math.atan2(q[1]-p[1],q[0]-p[0])*180/Math.PI,a1=ang(P1,Q),a2=ang(P2,Q),E=[O[0]+320*db[0],O[1]+320*db[1]],E2=[O[0]+320*d2[0],O[1]+320*d2[1]];
  return `<svg viewBox="0 0 400 300" role="img" aria-label="Açıortay inşası"><line x1="${O[0]}" y1="${O[1]}" x2="380" y2="${O[1]}" class="s-line" style="stroke-width:4"/><line x1="${O[0]}" y1="${O[1]}" x2="${E2[0].toFixed(1)}" y2="${E2[1].toFixed(1)}" class="s-line" style="stroke-width:4"/>
    ${arcPath(O[0],O[1],110,-60,5,.4)}${arcPath(P1[0],P1[1],90,a1-22,a1+22,1.5)}${arcPath(P2[0],P2[1],90,a2-22,a2+22,2.4)}
    <g ${fi(3.3)}><line x1="${O[0]}" y1="${O[1]}" x2="${E[0].toFixed(1)}" y2="${E[1].toFixed(1)}" style="stroke:var(--pink);stroke-width:4;stroke-dasharray:8 6"/><circle cx="${Q[0].toFixed(1)}" cy="${Q[1].toFixed(1)}" r="6" fill="var(--pink)"/></g><text x="40" y="276" style="font-size:18px">O</text></svg>`}
function medians3SVG(){const A=[200,30],Bv=[40,262],C=[360,262],m=(p,q)=>[(p[0]+q[0])/2,(p[1]+q[1])/2],Gc=[(A[0]+Bv[0]+C[0])/3,(A[1]+Bv[1]+C[1])/3];
  const ln=(p,q)=>`<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" class="s-red"/>`;
  return `<svg viewBox="0 0 400 290" role="img" aria-label="Üç kenarortay"><polygon class="f3 s-line" points="${A} ${Bv} ${C}"/>${ln(A,m(Bv,C))}${ln(Bv,m(A,C))}${ln(C,m(A,Bv))}<circle cx="${Gc[0]}" cy="${Gc[1]}" r="7" fill="var(--gold)"/></svg>`}
function ratioDotsSVG(a,b,groups){let s='',x=10;for(let g=0;g<groups;g++){for(let i=0;i<a;i++)s+=`<circle cx="${x+i*26+12}" cy="40" r="11" class="b-kirmizi"/>`;for(let i=0;i<b;i++)s+=`<circle cx="${x+i*26+12}" cy="76" r="11" class="b-mavi"/>`;
  s+=`<rect x="${x-4}" y="20" width="${Math.max(a,b)*26+8}" height="76" rx="12" fill="none" style="stroke:var(--line);stroke-width:2"/>`;x+=Math.max(a,b)*26+24}
  return `<svg viewBox="0 0 ${x} 110" role="img" aria-label="Oran grupları">${s}</svg>`}
function rhombusRectSVG(){return `<svg viewBox="0 0 360 240" role="img" aria-label="Dikdörtgen içinde eşkenar dörtgen"><rect x="40" y="30" width="280" height="180" fill="none" style="stroke:var(--ink-soft);stroke-width:2;stroke-dasharray:6 5"/>
  <polygon class="f1 s-line" points="40,120 180,30 320,120 180,210"/><line x1="40" y1="120" x2="320" y2="120" class="s-dash"/><line x1="180" y1="30" x2="180" y2="210" class="s-dash"/><text x="250" y="70" text-anchor="middle">boş</text><text x="110" y="70" text-anchor="middle">boş</text><text x="180" y="230" text-anchor="middle">Eşkenar dörtgen = dikdörtgenin yarısı</text></svg>`}

/* ================= 4.2 Pergel atölyesi: interactive constructions (kind 'build', played by setupBuild) ================= */
function g4Build(task){task=task||pick(['dikme','aciortay']);const D=Math.PI/180,C=[320,205];
  if(task==='dikme'){const h=ri(115,165),t=ri(-22,22)*D,u=[Math.cos(t),Math.sin(t)],A=[C[0]-h*u[0],C[1]-h*u[1]],B=[C[0]+h*u[0],C[1]+h*u[1]];
    return {kind:'build',task,A,B,prompt:`<p><b>Pergel atölyesi:</b> AB doğru parçasının <b>orta dikmesini</b> pergel ve cetvelle inşa et.</p>`,
      explain:`Pergel AB'nin yarısından fazla açılır. A ve B merkezli, aynı yarıçaplı yayların kesiştiği iki nokta A ve B'ye eşit uzaklıktadır. Bu iki noktadan geçen doğru AB'yi tam ortasından dik keser: orta dikme.`}}
  /* place the angle so the vertex and both arms stay inside the 640 × 410 drawing */
  const at=(c,r,t)=>[c[0]+r*Math.cos(t),c[1]+r*Math.sin(t)],inb=p=>p[0]>=30&&p[0]<=610&&p[1]>=30&&p[1]<=380;
  let a,b,O,L=270;for(let t=0;t<300;t++){a=ri(60,115)*D;b=ri(0,359)*D;O=at(C,-110,b);if([O,at(O,L,b-a/2),at(O,L,b+a/2)].every(inb))break;if(t===299){b=0;O=[150,205];L=260}}
  return {kind:'build',task,O,r1:b-a/2,r2:b+a/2,L,prompt:`<p><b>Pergel atölyesi:</b> AOB açısının <b>açıortayını</b> pergel ve cetvelle inşa et.</p>`,
    explain:`O merkezli bir yay iki kolu D ve E'de keser. D ve E merkezli, aynı yarıçaplı (DE'nin yarısından fazla) yaylar F'de kesişir. O'dan F'ye çizilen ışın açıyı iki eş parçaya böler: açıortay.`}}
