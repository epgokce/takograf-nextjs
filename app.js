/* ═══════════════════════════════════════════════════════════ */

/* Mod piktogramı SVG'leri */
const MPSVG = {
 driving:`<circle cx="15" cy="11" r="9" stroke="#22c55e" stroke-width="2" fill="none"/>
<circle cx="15" cy="11" r="3.5" stroke="#22c55e" stroke-width="1.6" fill="none"/>
<circle cx="15" cy="11" r="1.5" fill="#22c55e"/>
<line x1="15" y1="2" x2="15" y2="7.5" stroke="#22c55e" stroke-width="1.6"/>
<line x1="6.5" y1="16.5" x2="12" y2="13.3" stroke="#22c55e" stroke-width="1.6"/>
<line x1="23.5" y1="16.5" x2="18" y2="13.3" stroke="#22c55e" stroke-width="1.6"/>`,
 rest:`<rect x="1" y="13" width="28" height="7" rx="1" fill="#38a8ff"/>
<rect x="1" y="9" width="4.5" height="11" rx=".8" fill="#38a8ff"/>
<rect x="2" y="10" width="5.5" height="4" rx=".6" fill="#1a3a70"/>
<circle cx="25" cy="10" r="3.2" fill="#38a8ff"/>
<rect x="7" y="13.5" width="17" height="3.5" rx=".6" fill="#38a8ff"/>
<path d="M28 5.5L30.5 3M28 3h2.5" stroke="#38a8ff" stroke-width="1" stroke-linecap="round" fill="none"/>
<path d="M25 3L27 1.5M25 1.5h2" stroke="#38a8ff" stroke-width=".8" stroke-linecap="round" fill="none"/>`,
 loading:`<rect x="2" y="13" width="26" height="7" rx="1" stroke="#f59e0b" stroke-width="1.8" fill="none"/>
<line x1="15" y1="11" x2="15" y2="2" stroke="#f59e0b" stroke-width="2"/>
<polyline points="10,6 15,2 20,6" stroke="#f59e0b" stroke-width="2" fill="none"/>
<rect x="7" y="13" width="16" height="4" rx=".4" fill="#f59e0b" opacity=".35"/>
<rect x="9" y="10" width="12" height="4" rx=".4" fill="#f59e0b" opacity=".55"/>`,
 unloading:`<rect x="2" y="13" width="26" height="7" rx="1" stroke="#38bdf8" stroke-width="1.8" fill="none"/>
<line x1="15" y1="2" x2="15" y2="11" stroke="#38bdf8" stroke-width="2"/>
<polyline points="10,7 15,11 20,7" stroke="#38bdf8" stroke-width="2" fill="none"/>
<rect x="7" y="13" width="16" height="4" rx=".4" fill="#38bdf8" opacity=".35"/>
<rect x="9" y="10" width="12" height="4" rx=".4" fill="#38bdf8" opacity=".55"/>`,
 both:`<line x1="9" y1="11" x2="9" y2="2" stroke="#a78bfa" stroke-width="1.8"/>
<polyline points="5,6 9,2 13,6" stroke="#a78bfa" stroke-width="1.8" fill="none"/>
<line x1="21" y1="2" x2="21" y2="11" stroke="#a78bfa" stroke-width="1.8"/>
<polyline points="17,7 21,11 25,7" stroke="#a78bfa" stroke-width="1.8" fill="none"/>
<rect x="2" y="13" width="26" height="7" rx="1" stroke="#a78bfa" stroke-width="1.8" fill="none"/>
<rect x="8" y="13" width="14" height="4" rx=".4" fill="#a78bfa" opacity=".4"/>`,
 otherwork:`<rect x="4" y="10" width="22" height="11" rx="1.2" stroke="#f5a200" stroke-width="1.8" fill="none"/>
<path d="M10 10L10 7Q10 4.5 15 4.5Q20 4.5 20 7L20 10" stroke="#f5a200" stroke-width="1.8" fill="none"/>
<line x1="4" y1="16" x2="26" y2="16" stroke="#f5a200" stroke-width="1.4"/>
<rect x="12" y="12.5" width="6" height="4.5" rx=".7" fill="#f5a200"/>`,
 available:`<rect x="9" y="1" width="12" height="1.8" rx=".5" fill="#c084fc"/>
<rect x="9" y="19.2" width="12" height="1.8" rx=".5" fill="#c084fc"/>
<path d="M10 2.8L20 2.8L15 11L20 19.2L10 19.2L15 11Z" stroke="#c084fc" stroke-width="1.6" fill="none"/>
<path d="M11 2.8L19 2.8L15 10Z" fill="#c084fc"/>
<path d="M12 18.5L18 18.5L15 14Z" fill="#c084fc"/>`
};

/* İş alt modları için renk, etiket, MPICT sınıfı */
const WORK_SUBS = {
 loading: {lbl:'YÜKLEME', en:'Loading', cls:'mw', mpCls:'mw-load', col:'#f59e0b', tl:'s-load'},
 unloading: {lbl:'İNDİRME', en:'Unloading', cls:'mw', mpCls:'mw-unld', col:'#38bdf8', tl:'s-unld'},
 both: {lbl:'YÜK+İND', en:'Both', cls:'mw', mpCls:'mw-both', col:'#a78bfa', tl:'s-both'},
 otherwork: {lbl:'GENEL İŞ', en:'Other Work', cls:'mw', mpCls:'mw-otwk', col:'#f5a200', tl:'s-otwk'},
};

const MPCLS = {driving:'md',rest:'mr',loading:'mw',unloading:'mw',both:'mw',otherwork:'mw',available:'ma'};
const MPLBL = {
 driving:'DRIVING',rest:'REST',
 loading:'LOADING',unloading:'UNLOAD',both:'YÜK+İND',otherwork:'WORK',
 available:'AVAIL'
};

/* ── Debug loglama (production'da console.info kullan) ── */
const _dbg = (window.location.hostname === 'localhost' || window.location.protocol === 'file:')
 ? (...a) => console.debug('[TachoTR]', ...a)
 : () => {};

/* ══════════════════════════════════════════════════════════
 AB 561/2006 / AETR — Kural Sabitleri
 Bu değerleri değiştirmek tüm simülasyonu etkiler.
 ══════════════════════════════════════════════════════════ */
const CONT_DRIVE_LIMIT   = 270;  /* Kesintisiz max: 4:30 dk */
const BREAK_REQUIRED     = 45;   /* Zorunlu mola: 45 dk */
const BREAK_SPLIT_1      = 15;   /* Bölünmüş mola 1. bölüm: 15 dk */
const BREAK_SPLIT_2      = 30;   /* Bölünmüş mola 2. bölüm: 30 dk */
const DAILY_DRIVE_NORM   = 540;  /* Normal günlük max: 9:00 dk */
const DAILY_DRIVE_EXT    = 600;  /* Uzatılmış günlük max: 10:00 dk */
const DAILY_REST_FULL    = 660;  /* Tam günlük din.: 11:00 dk */
const DAILY_REST_REDUCED = 540;  /* Kısaltılmış günlük din.: 9:00 dk */
const DAILY_REST_SPLIT1  = 180;  /* Bölünmüş din. 1. bölüm: 3:00 dk */
const DAILY_REST_SPLIT2  = 540;  /* Bölünmüş din. 2. bölüm: 9:00 dk */
const WEEKLY_DRIVE_MAX   = 3360; /* Haftalık max: 56:00 dk */
const BIWEEKLY_DRIVE_MAX = 5400; /* 2 haftalık max: 90:00 dk */
const WEEKLY_REST_FULL   = 2700; /* Tam haftalık din.: 45:00 dk */
const WEEKLY_REST_REDUCED= 1620; /* Kısaltılmış haftalık din.: 27:00 dk */
const WEEKLY_REST_INTERVAL=8640; /* Haftalık din. maks aralık: 6 gün dk */
const MAX_EXT_PER_WEEK   = 2;    /* Haftada max 10sa uzatma */
const MAX_REDUCED_PER_PERIOD = 3;/* Periyotta max 9sa kısaltma */

/* STATE */
let S;
/* Başlangıç tarihi — input'tan veya varsayılan */
let SIM_START = new Date('2026-02-25T08:00:00'); /* Çarşamba */

function initState(){
 S={
 mode:'rest',
 simMin:0,
 /* ── Günlük ── */
 dailyDrv:0,
 contDrv:0,
 dailyMax:540, /* 9sa normal, 600=10sa uzatılmış */
 breakLeft:270,
 restSes:660, /* mevcut dinlenme oturumu (gece yeni başladı) */
 useReducedRest:false, /* kullanıcı tercihi: 9sa kısaltılmış dinlenme kullan */
 restDayAcc:660,
 splitRestCount:0, /* iki ardışık haftalık periyot içinde 9sa kısaltılmış günlük dinlenme (max 3/periyot) */
 weeklyRestCount:0, /* ardışık haftalık dinlenme sayacı (2'de bir periyot tamamlanır) */
 weeklyDeficitWeeks:0, /* telafi borcu kaç haftadır ödenmedi (max 3) */
 /* ── Haftalık ── */
 weeklyDrv:1350, /* bu haftanın toplam sürüşü (22:30) */
 prevWeekDrv:2400, /* önceki haftanın sürüşü (40:00) */
 extDayCount:0, /* bu hafta kaç kez 10sa uzatma (max 2) */
 /* Haftalık dinlenme takibi — AB 561/2006 Madde 8 */
 hadFullWeeklyRest:true, /* mevcut 2-haftalık pencerede ≥45sa tam alındı mı */
 reducedInRow:0, /* ardışık kısaltılmış sayısı (ulusal: max 1 / uluslararası: max 2) */
 weeklyDeficit:0, /* birikmiş telafi borcu dk (3 hafta içinde ödenecek) */
 lastWeeklyRestMin:-2880, /* son haftalık dinlenme bitişi (simMin cinsinden, negatif=geçmiş) */
 /* ── Çift sürücü ── */
 doubleDriver:false,
 /* ── İş ── */
 workAcc:0, workLoadAcc:0, workUnldAcc:0, workBothAcc:0, workOtherAcc:0,
 workSub:'otherwork',
 availAcc:0,
 /* ── Kilometre / hız ── */
 odo:124532,
 speed:0,
 /* ── Bölünmüş mola (15+30) ──
 Kılavuz AB 561/2006 Madde 7:
 45dk zorunlu mola 2 parçaya bölünebilir: 1. parça ≥15dk, 2. parça ≥30dk (sıra değiştirilemez)
 breakPart1Done: ilk 15dk'lık parça alındı mı */
 breakPart1Done:false, /* 15dk 1.bölüm tamamlandı mı */
 breakPart1Min:0, /* 1.bölüm süresi (dk) */
 /* ── Counter ──
 Kılavuz : Opsiyonel sürüş süresi sayacı
 Günlük sürüş süresi geriye sayımı (kalan süre) LCD'de gösterilir */
 vdoCounterOn:true, /* Counter aktif mi */
 /* ── Ülke / Sınır Geçişi ──
 Kılavuz : Sınır geçişinde ülke kodu girilmeli */
 currentCountry:'TR', /* Mevcut ülke kodu */
 /* ── Özel modlar ── */
 ferryMode:false,
    _ferryBreakStart:null,
    _lastCompanyDownload:null,
    _noCardDays:0,
    /* G6: XP */
    xp:0, level:1, badges:[], streakDays:0,
 ferryRestSave:0, /* Feribot modu başladığındaki restSes değeri */
 ferryMin:0, /* Feribot modunda geçen dakika */
 outMode:false, /* OUT: Takograf kapsamı dışında sürüş */
 /* ── Log / görsel ── */
 logs:[],
 segs:[], /* uyumluluk alias — allSegs ile senkron tutulur */
 allSegs:[],
 dayBase:0,
 simDay:0,
 lastDailyRestEnd:0,
 /* ── YENİ: Uyarı/Arıza sistemi ── */
 activeWarnings:[], /* [{code,msg,type:'event'|'fault'|'usage',ts}] */
 faultHistory:[], /* Kayıtlı arıza/olay geçmişi */
 warnCount:0, /* Toplam uyarı sayısı */
 /* ── YENİ: Hız sistemi ── */
 speedLimit:90, /* Ayarlanmış hız sınırı km/h */
 speedViolations:0, /* Bu günkü hız aşımı sayısı */
 gnssOk:true, /* GNSS sinyal durumu */
 gnssLostMin:0, /* GNSS kaybı başladığı simMin */
 /* ── YENİ: Kart/Çalışma modu ── */
 card1Type:'driver', /* driver|company|control|service|null */
 card2Type:null,
 operationMode:'driving', /* driving|company|control|calibration */
 /* ── YENİ: Zaman ── */
 utcOffsetMin:180, /* UTC+3 Türkiye */
 dstActive:false, /* Yaz saati */
 /* ── YENİ: Bağlantı ── */
 bluetoothOn:false,
 itsPermission:true,
 adrMode:false, /* ADR/Ex varyantı */
 /* ── FAZ A: Takograf Versiyon & G2V2 ── */
 dtcoVariant:'4.1b', /* '4.1'=geçiş | '4.1a'=OSNMA | '4.1b'=OSNMA+güncel */
 osnmaActive:true, /* OSNMA Galileo doğrulama aktif mi? */
 cardGen:'G2V2', /* 'G1' | 'G2V1' | 'G2V2' — takılı kart nesli */
 storageDays:56, /* 28 → 56 gün (Aralık 2024 zorunluluğu) */
 cargoType:'goods', /* 'goods' | 'passengers' — yük tipi */
 positionLog:[], /* G2V2 konum kayıtları [{t,utc,country,reason,osnma}] */
 positionDrivingAcc:0, /* GNSS konum için kümülatif sürüş dk */
 borderLog:[], /* Sınır geçiş kayıtları [{from,to,t,auto}] */
 dsrcEnabled:true, /* DSRC uzaktan denetim anteni */
 controlMode:false, /* Kontrol kartı modu aktif */
 };
 S.segs.push({abs:0,dur:480,mode:'rest'});
 updateDateDisplay();
}

/* ARAÇLAR */
function hm(m){m=Number(m);if(!isFinite(m)||isNaN(m))return'--:--';m=Math.max(0,Math.round(m));return Math.floor(m/60)+':'+String(m%60).padStart(2,'0');}

/* Haftalık sürüş limiti: Türkiye KTY dahil AB 561/2006 — dinamik 34-56sa */
function getWeeklyMax(){
 /* KTY iç hat da AB/AETR ile aynı limiti uygular: maks 56sa, iki haftada 90sa */
 return Math.max(2040, BIWEEKLY_DRIVE_MAX-(S.prevWeekDrv||0));
}

/* Simülasyon zamanı = SIM_START + simMin */
function simDateTime(){return new Date(SIM_START.getTime()+S.simMin*60000);}
function simTime(){const d=simDateTime();return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');}
function simDateStr(){
 const d=simDateTime();
 const dy=['PAZ','PZT','SAL','ÇAR','PER','CUM','CMT'];
 return `${dy[d.getDay()]} ${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
}

function updateDateDisplay(){
 const lc=document.getElementById('lclk');if(lc)lc.textContent=simTime();
 const ld=document.getElementById('ldt');if(ld)ld.textContent=simDateStr();
 const lt=document.getElementById('logt');if(lt)lt.textContent=simTime();
}

/* Tarih girişi değiştiğinde */
function onDateChange(val){
 if(!val)return;
 SIM_START=new Date(val);
 resetSim();
}

/* ── Güvenlik: HTML injection / XSS koruması ── */
function escapeHTML(s){
 return String(s==null?'':s)
 .replace(/&/g,'&amp;').replace(/</g,'&lt;')
 .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

/* ══════════════════════════════════════════════════════════ */
function triggerWarning(code, msg, type, autoAckSec, ref){
 if(!S.activeWarnings) S.activeWarnings=[];
 if(!S.faultHistory) S.faultHistory=[];
 /* Aynı kod zaten aktifse tekrarlama */
 if(S.activeWarnings.some(w=>w.code===code)) return;
 const w={code, msg, type:type||'usage', ts:simTime(), autoAck:!!autoAckSec};
 S.activeWarnings.push(w);
 S.faultHistory.push({...w, simMin:S.simMin, day:S.simDay, label:code, ref:ref||''});
 S.warnCount=(S.warnCount||0)+1;
 renderWarningBanner();
 updateLedWarning();
 /* Ses bildirimi */
 if(type==='fault') playBeep(440,0.3,'sawtooth');
 else if(type==='event') playBeep(660,0.2,'square');
 else playBeep(880,0.1,'sine');
 /* Kullanım uyarıları otomatik kaybolur (3sn veya 30sn) */
 if(autoAckSec){
 setTimeout(()=>{
 S.activeWarnings=S.activeWarnings.filter(x=>x.code!==code);
 renderWarningBanner();
 updateLedWarning();
 }, autoAckSec*1000);
 }
}

function acknowledgeWarning(){
 if(!S.activeWarnings||S.activeWarnings.length===0) return;
 /* Manuel onay: en üstteki uyarıyı kaldır */
 S.activeWarnings.shift();
 renderWarningBanner();
 updateLedWarning();
 if(S.activeWarnings.length>0){
 doLog(`⚠ Uyarı onaylandı. ${S.activeWarnings.length} uyarı daha bekliyor.`,'warn');
 }
}

function renderWarningBanner(){
 const banner=document.getElementById('warn-banner');
 const icon=document.getElementById('warn-icon');
 const txt=document.getElementById('warn-txt');
 const multi=document.getElementById('warn-multi');
 if(!banner) return;
 if(!S.activeWarnings||S.activeWarnings.length===0){
 banner.style.display='none';
 document.body.classList.remove('has-warn');
 return;
 }
 const w=S.activeWarnings[0];
 banner.style.display='block';
 document.body.classList.add('has-warn');
 /* Yeni uyarı ise shake animasyonu */
 if(!banner.dataset.lastCode || banner.dataset.lastCode !== w.code){
 banner.classList.remove('anim-shake');
 requestAnimationFrame(()=>requestAnimationFrame(()=>{
 banner.classList.add('anim-shake');
 setTimeout(()=>banner.classList.remove('anim-shake'), 450);
 }));
 banner.dataset.lastCode = w.code;
 }
 banner.className='warn-banner'+(w.type==='fault'?' fault':w.type==='usage'?' info':'');
 icon.textContent=w.type==='fault'?'x':w.type==='usage'?'ℹ':'!';
 const safeMsg=escapeHTML(w.msg);
 txt.innerHTML=`<b>[${escapeHTML(w.ts)}] ${escapeHTML(w.code)}</b> ${safeMsg}`;
 if(S.activeWarnings.length>1){
 multi.textContent=`+ ${S.activeWarnings.length-1} uyarı daha bekliyor — sırayla onaylayın`;
 } else {
 multi.textContent='';
 }
}

function updateLedWarning(){
 const led=document.getElementById('led-w');
 if(!led) return;
 const hasWarn=S.activeWarnings&&S.activeWarnings.length>0;
 const hasFault=S.activeWarnings&&S.activeWarnings.some(w=>w.type==='fault');
 /* Renk ve animasyon updateLCD ile senkron — className tek yerden yönetilir */
 if(hasFault){led.className='led Lr blf';led.style.background='';}
 else if(hasWarn){led.className='led Ly bl';led.style.background='';}
 else{led.className='led Loff';led.style.background='';}
}

/* ── Arıza geçmişi paneli güncelle ── */
function updateFaultPanel(){
 const el=document.getElementById('fault-list-body');
 if(!el||!S.faultHistory) return;
 if(S.faultHistory.length===0){el.innerHTML='<div data-empty>⚡ Henüz arıza/olay yok ✓</div>';return;}
 el.innerHTML=S.faultHistory.slice(-20).reverse().map(f=>{
 const cls=f.type==='fault'?'fx':f.type==='event'?'ev':'uw';
 const ico=f.type==='fault'?'x':f.type==='event'?'!':'i';
 return `<div class="fault-item ${cls}"><span class="fi-time">${escapeHTML(f.ts)}</span><span style="min-width:12px">${ico}</span><span class="fi-msg">${escapeHTML(f.code)}: ${escapeHTML(f.msg.slice(0,60))}</span></div>`;
 }).join('');
}

/* ══════════════════════════════════════════════════════════ */
function getUTCMinutes(){
 /* simMin = yerel dakika; UTC = yerel - offset */
 return S.simMin - (S.utcOffsetMin||180) - (S.dstActive?60:0);
}
function simUTCDisplay(){
 const utcMin = SIM_START.getTime()/60000 + S.simMin - (S.utcOffsetMin||180) - (S.dstActive?60:0);
 const d=new Date(utcMin*60000);
 return `UTC ${String(d.getUTCHours()).padStart(2,'0')}:${String(d.getUTCMinutes()).padStart(2,'0')}`;
}
function updateUTCDisplay(){
 const el=document.getElementById('utc-display');
 if(el) el.textContent=simUTCDisplay();
}

/* ══════════════════════════════════════════════════════════
 HIZ SINIRI & GNSS 
══════════════════════════════════════════════════════════ */
function checkSpeedLimit(){
 if(!S.speed||S.mode!=='driving') return;
 const limit=S.speedLimit||90;
 if(S.speed>limit+2){ /* 2km/h tolerans */
 S.speedViolations=(S.speedViolations||0)+1;
 triggerWarning('! Hız aşımı','Araç hız sınırını aştı: '+Math.round(S.speed)+'km/h > '+limit+'km/h. ','event');
 const lspd=document.getElementById('lspd');
 if(lspd) lspd.style.color='var(--LR)';
 } else {
 const lspd=document.getElementById('lspd');
 if(lspd) lspd.style.color='';
 }
}
function checkGNSSStatus(){
 /* 3 saat kümülatif sürüşte GNSS yoksa uyarı */
 if(!S.gnssOk && S.mode==='driving'){
 const lost=S.simMin-(S.gnssLostMin||S.simMin);
 if(lost>=180){
 triggerWarning('! GNSS sinyali mevcut değil','3 saatlik sürüşte GNSS konum verisi yok. — Yetkili servise başvurun.','event');
 }
 }
 const led=document.getElementById('gnss-led');
 if(led) led.className='lcd-led '+(S.gnssOk?'on':'warn');
}

/* ══════════════════════════════════════════════════════════
 ŞİRKET KARTI MODU 
══════════════════════════════════════════════════════════ */
function enterCompanyMode(){
 S.card1Type='company';
 S.operationMode='company';
 const bar=document.getElementById('company-bar');
 const panel=document.getElementById('company-panel');
 const badge=document.getElementById('opmode-badge');
 if(bar){bar.classList.add('vis');}
 if(panel){panel.style.display='block';}
 if(badge){badge.textContent='ŞİRKET';badge.className='lcd-opmode company';}
 const devBrand=document.getElementById('dev-brand-lbl');
 if(devBrand) devBrand.textContent='— | 🏢 ŞİRKET MODU | Veri İndirme Aktif';
 doLog('🏢 ŞİRKET KARTI MODU — Şirket kartı takıldı. Veri indirme ve araç ayarları erişilebilir. ','ok');
  (function(){
    const _ds=S._lastCompanyDownload!==null?Math.floor((S.simMin-(S._lastCompanyDownload||0))/1440):null;
    if(_ds===null){
      doLog('📥 VERİ İNDİRME (TOBB 2017/KDGM-4/ST): Sürücü kartı ≤25 gün, Araç ünitesi ≤90 gün.','warn');
      doLog('   Aylık TOBB gönderi zorunlu. staum.tobb.org.tr | 444 9 559');
    } else if(_ds>25){
      doLog('⚠ VERİ İNDİRME GECİKTİ: '+_ds+' gün — limit 25 gün! Derhal indirin.','err');
    } else {
      doLog('✓ Son indirme: '+_ds+' gün önce (limit 25 gün).','ok');
    }
  })();
 doLog('ℹ Şirket engelleme aktif — şirkete özel veriler korunuyor.');
 updateLCD();
}
function exitCompanyMode(){
 S.card1Type='driver';
 S.operationMode='driving';
 const bar=document.getElementById('company-bar');
 const panel=document.getElementById('company-panel');
 const badge=document.getElementById('opmode-badge');
 if(bar){bar.classList.remove('vis');}
 if(panel){panel.style.display='none';}
 if(badge){if(typeof window._ktyMode!=='undefined'&&window._ktyMode){badge.textContent='🇹🇷 KTY';badge.className='lcd-opmode';badge.style.color='#e30a17';badge.style.borderColor='#e30a17';badge.style.background='rgba(227,10,23,.08)';}else{if(window._ktyMode){badge.textContent='🇹🇷 KTY';badge.className='lcd-opmode';badge.style.color='#e30a17';badge.style.borderColor='#e30a17';badge.style.background='rgba(227,10,23,.08)';}else{badge.textContent='🇪🇺 AB';badge.className='lcd-opmode';badge.style.color='#60a5fa';badge.style.borderColor='#3b82f6';badge.style.background='rgba(59,130,246,.08)';}}}
 const devBrand2=document.getElementById('dev-brand-lbl');
 if(devBrand2) devBrand2.textContent='| Smart Tachograph V2 | OSNMA';
 doLog('ℹ Şirket kartı çıkarıldı. Sürücü moduna dönüldü.','ok');
 updateLCD();
}
function companyDownload(){
  S._lastCompanyDownload = S.simMin;
  doLog('📥 VERİ İNDİRME TAMAMLANDI:','ok');
  doLog('   Sürücü kartı: '+S.logs.length+' kayıt indirildi (son 56 gün).');
  doLog('   Araç ünitesi: Tüm aktivite, konum, olay kayıtları indirildi.');
  doLog('   Sonraki zorunlu indirme: '+(S.cardGen==='G2V2'?'56':'28')+' gün içinde.');
  doLog('   TOBB gönderim: staum.tobb.org.tr | 444 9 559');
 if(S.operationMode!=='company'){
 triggerWarning('Çıkarma mümkün değil!','Veri indirme için şirket kartı gerekli. Önce şirket kartı takın.','usage',3);
 return;
 }
 doLog('⬇ VERİ İNDİRME başlatıldı — Yığın bellek (şirket kartıyla). ','ok');
 doLog('ℹ İndirme sırasında kart çıkarılamaz. Tamamlanana kadar bekleyin.');
 doLog('⚠ Uzaktan indirme günde max 2 kez yapılabilir. ');
 setTimeout(()=>doLog('✓ Veri indirme tamamlandı. Veriler dijital imzayla işaretlendi. ','ok'),1500);
}

/* ══════════════════════════════════════════════════════════ */
function toggleADR(){
 S.adrMode=!S.adrMode;
 const bar=document.getElementById('adr-bar');
 const badge=document.getElementById('opmode-badge');
 const btn=document.getElementById('btn-adr');
 if(bar) bar.classList.toggle('vis',S.adrMode);
 if(btn) btn.classList.toggle('on',S.adrMode);
 if(S.adrMode){
 if(badge){badge.textContent='ADR';badge.className='lcd-opmode adr';}
 doLog('☢ ADR VARYANTT AKTİF — Tehlikeli madde modu. ','warn');
 doLog('⚠ Patlama bölgesinde: Tüm kart yuvaları KAPALI, yazıcı çekmecesi KAPALI, ön arayüz kapağı KAPALI olmalı!','warn');
 doLog('⚠ Hiçbir tuşa basılmamalı, ilave cihaz takılmamalı (Link vb.)');
 triggerWarning('ADR AKTİF','Tehlikeli madde modu. Patlama bölgesinde tüm kapak ve yuvaları kapalı tutun. ','usage');
 } else {
 if(badge){if(typeof window._ktyMode!=='undefined'&&window._ktyMode){badge.textContent='🇹🇷 KTY';badge.className='lcd-opmode';badge.style.color='#e30a17';badge.style.borderColor='#e30a17';badge.style.background='rgba(227,10,23,.08)';}else{if(window._ktyMode){badge.textContent='🇹🇷 KTY';badge.className='lcd-opmode';badge.style.color='#e30a17';badge.style.borderColor='#e30a17';badge.style.background='rgba(227,10,23,.08)';}else{badge.textContent='🇪🇺 AB';badge.className='lcd-opmode';badge.style.color='#60a5fa';badge.style.borderColor='#3b82f6';badge.style.background='rgba(59,130,246,.08)';}}}
 const devBrand2=document.getElementById('dev-brand-lbl');
 if(devBrand2) devBrand2.textContent='| Smart Tachograph V2 | OSNMA';
 doLog('ℹ ADR modu devre dışı. Normal çalışmaya dönüldü.','ok');
 }
 updateLCD();
}

/* ══════════════════════════════════════════════════════════
 BLUETOOTH (+)
══════════════════════════════════════════════════════════ */
function toggleBluetooth(){
 S.bluetoothOn=!S.bluetoothOn;
 const led=document.getElementById('bt-led');
 const btn=document.getElementById('btn-bt');
 if(led) led.className='lcd-led '+(S.bluetoothOn?'on':'off');
 if(btn) btn.classList.toggle('on',S.bluetoothOn);
 if(S.bluetoothOn){
 if(!S.itsPermission){
 doLog('⚠ Bluetooth bağlantısı açık ama ITS veri erişim izni yok — veri akışı gerçekleşmez. ','warn');
 triggerWarning('BT - ITS İzin Yok','Sürücü kartı ITS veri erişimine izin vermiyor. Veri akışı yok.','usage',5);
 } else {
 doLog('🔵 Bluetooth AKTİF — Araç içi BT bağlantısı kuruldu (+). ','ok');
 }
 } else {
 doLog('ℹ Bluetooth kapatıldı.','ok');
 }
 const itsLed=document.getElementById('its-led');
 if(itsLed) itsLed.className='lcd-led '+(S.bluetoothOn&&S.itsPermission?'on':'off');
}

/* ══════════════════════════════════════════════════════════ */
function showReport(type){
 const modal=document.getElementById('report-modal');
 const title=document.getElementById('report-title');
 const body=document.getElementById('report-body');
 if(!modal||!title||!body) return;
 /* ADR modunda rapor görüntüleme kısıtlı */
 if(S.adrMode && type!=='control'){
 triggerWarning('Şu an gösterilemiyor — ADR','ADR varyantında kontak kapalıyken gösterge mümkün değil. Kontağı açın ve tekrar deneyin. ','usage',5);
 return;
 }
 let rTitle='', rContent='';
 const dt=simDateTime();
 const dateStr=`${String(dt.getDate()).padStart(2,'0')}.${String(dt.getMonth()+1).padStart(2,'0')}.${dt.getFullYear()}`;
 const utcStr=simUTCDisplay().replace('UTC ','');
 const sep1='══════════════════════════════════════';
 const sep2='──────────────────────────────────────';
 /* PDF S.138: [1] kart nesli + tarih/UTC | OSNMA kilit göstergesi */
 const _cardNeslLbl={'G1':'GEN1 (Ek I B)','G2V1':'GEN2 (Ek I C)','G2V2':'GEN2 V2 (Ek I C)'}[S.cardGen||'G2V2']||'GEN2 V2';
 const _osnmaLock=(S.osnmaActive&&S.gnssOk)?'[🔒 OSNMA]':'[🔓 Geçiş]';
 const _dtcoVerStr=`${S.dtcoVariant||'4.1b'} ${S.osnmaActive?'OSNMA':'Geçiş'}`;
 const _storageDays=S.storageDays||56;
 const _cargoLbl=S.cargoType==='passengers'?'👥 Yolcular':'📦 Mallar';
 const hdr=`${sep1}
[1] ${_cardNeslLbl} ${dateStr} ${utcStr} ${_osnmaLock}
 Takograf ${_dtcoVerStr} · BA00.1381.41 · Baskı 4
${sep2}
 Continental Automotive Technologies GmbH
 Villingen-Schwenningen, Germany
${sep2}
[3] A.YILMAZ — Sürücü (${S.cardGen||'G2V2'})
 Kart geçerliliği: 2028-09
[4] 34 ABC 123 | KITAS 4.0 | ${S.currentCountry||'TR'}
${sep2}`;

 if(type==='24h'){
 rTitle='📋 24h Günlük Rapor — Sürücü Kartı';
 const segs=S.allSegs||[];
 const todayBase=S.dayBase||0;
 const todaySegs=segs.filter(s=>s.startMin>=todayBase);
 let acts='';
 /* PDF : Aktivite + piktogram */
 const _modePikto={driving:'▓ SÜRÜŞ',rest:'░ DİNLENME',work:'▒ DİĞER İŞ',available:'· UYGUNLUK'};
 const _wsubPikto={loading:'↑ Yükleme',unloading:'↓ Boşaltma',both:'↑↓ Her ikisi',otherwork:'⊠ Genel iş'};
 todaySegs.forEach(s=>{
 const t=SIM_START.getTime()/60000+s.startMin;
 const d=new Date(t*60000);
 const ts=`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
 const lbl=(s.mode==='work'&&s.workSub?_wsubPikto[s.workSub]:_modePikto[s.mode])||s.mode;
 acts+=` ${ts} ${lbl.padEnd(18)} ${hm(s.dur)}
`;
 });
 /* [!x] Bugünkü olaylar */
 const _todayFaults=(S.faultHistory||[]).filter(f=>f.day===S.simDay);
 const _faultRows=_todayFaults.length>0
 ?_todayFaults.map(f=>` [${f.ts}] ${f.type==='fault'?'x':'!'} ${f.code}`).join('\n')
 :' (Bugün arıza/olay yok ✓)';
 /* [📍] Son konum */
 const _lastPos=(S.positionLog||[]).slice(-1)[0];
 const _posTxt=_lastPos?` ${_lastPos.t} ${_lastPos.country} ${_lastPos.reason} ${_lastPos.locked?'🔒 OSNMA':'🔓'}`:' (Kayıt yok)';
 const _borderToday=(S.borderLog||[]).filter(b=>b.simMin>=(S.dayBase||0)).length;
 rContent=`${hdr}
[2] 24s — GÜNLÜK DÖKÜM
[8] Tarih: ${dateStr}
${sep2}
[5] GÜNLÜK SÜRÜŞ: ${hm(S.dailyDrv)} / ${hm(S.dailyMax)}
 HAFTALIK SÜRÜŞ: ${hm(S.weeklyDrv)}
 KESİNTİSİZ: ${hm(S.contDrv)}
 MOLA HAKKI: ${hm(S.breakLeft)}
 TELAFİ BORCU: ${hm(S.weeklyDeficit||0)}
${sep2}
[9] AKTİVİTELER:
${acts||' (Bugün aktivite yok)'}
${sep2}
[!x] ARIZA / OLAY:
${_faultRows}
${sep2}
[📍] SON KONUM:
${_posTxt}
 YÜK TİPİ: ${_cargoLbl}
 SINIR GEÇİŞİ: ${_borderToday} kez bugün
${sep2}
[26] ODOMETRe: ${(S.odo/1000).toFixed(1)} km
[27] TAKOGRAf VERSİYON: ${_dtcoVerStr}
 SAKLAMA: ${_storageDays} gün
[28] 9sa KISALT.: ${3-(S.splitRestCount||0)}/3 hak kaldı${(S.splitRestCount||0)>=3?' — 11sa TAM zorunlu!':''}
${sep2}
[2a] RAPOR SONU ███
${sep1}`;
 } else if(type==='events'){
 rTitle='⚠ Olaylar & Arızalar Raporu';
 const history=S.faultHistory||[];
 let evts='';
 if(history.length===0){
 evts=' (Kayıtlı olay/arıza yok ✓)\n';
 } else {
 history.forEach(f=>{
 const ico=f.type==='fault'?'x':f.type==='event'?'!':'i';
 evts+=` [${f.ts}] ${ico} ${f.code}\n → ${f.msg.slice(0,50)}\n`;
 });
 }
 rContent=`${hdr}
[2] !x — OLAYLAR/ARIZALAR
[8] Tarih: ${dateStr}
${sep2}
${evts}${sep2}
 TOPLAM: ${history.length} kayıt
${sep1}`;
 } else if(type==='speed'){
 rTitle='v Hız Profili Raporu';
 rContent=`${hdr}
[2] v — HIZ PROFİLİ
[8] Tarih: ${dateStr}
${sep2}
 HIZ SINIRI: ${S.speedLimit||90} km/h
 HIZ AŞIM SAYISI: ${S.speedViolations||0}
${sep2}
 Hız profili 16 bölgeye ayrılmıştır.
 0 ≤ v < 1: Araç park halinde
 ...
${sep2}
[7] RAPOR SONU ███
${sep1}`;
 } else if(type==='activity'){
 rTitle='⚙ Aktiviteler Raporu';
 const segs=(S.allSegs||[]).slice(-50);
 let actRows='';
 segs.forEach(s=>{
 const t=SIM_START.getTime()/60000+s.startMin;
 const d=new Date(t*60000);
 const ts=`${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
 actRows+=` ${ts} ${s.mode.padEnd(10)} ${hm(s.dur)}
`;
 });
 rContent=`${hdr}
[2] — AKTİVİTELER
${sep2}
${actRows||'(Aktivite yok)'}
${sep1}`;
 } else if(type==='control'){
 rTitle='🚔 Trafik Denetimi Raporu ';
 const posLogs=(S.positionLog||[]);
 const borderLogs=(S.borderLog||[]);
 const dtcoVer=`${S.dtcoVariant||'4.1b'} ${(S.osnmaActive?'(OSNMA ✓)':'(Geçiş)')}`;
 const cargoLbl=S.cargoType==='passengers'?'👥 Yolcular':'📦 Mallar';
 let posRows=posLogs.length>0
 ?posLogs.slice(-10).map(p=>` [${p.t}] ${p.country} — ${p.reason} ${p.locked?'🔒':'🔓'}`).join('\n')
 :' (Konum kaydı yok)';
 let bdrRows=borderLogs.length>0
 ?borderLogs.slice(-10).map(b=>` [${b.t}] ${b.from}→${b.to} ${b.auto?'OTO':'MAN'} ${b.osnma?'🔒':''}`).join('\n')
 :' (Sınır geçişi yok)';
 rContent=`${hdr}
[2] KONTROL RAPORU 
${sep2}
 TAKOGRAf VERSİYON: ${dtcoVer}
 KART NESLİ: ${S.cardGen||'G2V2'}
 VERİ SAKLAMA: ${S.storageDays||56} gün
 YÜK TİPİ: ${cargoLbl}
 DSRC: ${S.dsrcEnabled?'Aktif':'Pasif'}
${sep2}
 KONUM KAYITLARI:
${posRows}
${sep2}
 SINIR GEÇİŞLERİ:
${bdrRows}
${sep2}
 ÖZET:
 Günlük sürüş: ${hm(S.dailyDrv)}
 Haftalık sürüş: ${hm(S.weeklyDrv)}
 Telafi borcu: ${hm(S.weeklyDeficit||0)}
 Arıza/Olay: ${(S.faultHistory||[]).length} kayıt
${sep1}`;
 } else if(type==='position'){
 rTitle='📍 Konum Kayıtları Raporu ';
 const posLogs=(S.positionLog||[]);
 const reasonLabels={'shift_start':'Vardiya Başı','shift_end':'Vardiya Sonu','3h_drive':'3sa Sürüş','loading':'Yükleme','unloading':'Boşaltma','border':'Sınır'};
 let posRows=posLogs.length>0
 ?posLogs.map(p=>` [${p.t}][${p.utc}] ${p.country} — ${reasonLabels[p.reason]||p.reason} ${p.locked?'🔒 OSNMA':'🔓'} ${p.cardGen||''}`).join('\n')
 :' (G2V2 + GNSS aktif olduğunda konum kaydedilir)';
 rContent=`${hdr}
[2] KONUM KAYITLARI 
${sep2}
 G2V2 zorunlu kayıt noktaları:
 1. Vardiya başı/sonu
 2. Her 3 saatlik kümülatif sürüş
 3. Yükleme / boşaltma
 4. Sınır geçişi (otomatik)
${sep2}
${posRows}
${sep2}
 TOPLAM: ${posLogs.length} kayıt | OSNMA onaylı: ${posLogs.filter(p=>p.locked).length}
${sep1}`;
 }
 title.textContent=rTitle;
 body.textContent=rContent;
 modal.classList.add('vis');
 doLog(`🖨 Rapor oluşturuldu: ${rTitle}`,'ok');
}
function closeReport(){
 const modal=document.getElementById('report-modal');
 if(modal) modal.classList.remove('vis');
}

/* ══════════════════════════════════════════════════════════
 HIZ SINIRI AYAR DİYALOGU
══════════════════════════════════════════════════════════ */
/* ── Evrensel Toast / Confirm (alert+confirm yerine) ── */
function _toast(msg, type='info', duration=3000){
 const t=document.createElement('div');
 const col=type==='error'?'var(--LR)':type==='ok'?'var(--LF)':'var(--LW)';
 t.style.cssText=`position:fixed;bottom:80px;left:50%;transform:translateX(-50%);
 background:var(--s2);border:1px solid ${col};color:var(--txt);
 padding:8px 18px;border-radius:6px;font-family:var(--M);font-size:.75rem;
 z-index:19999;box-shadow:0 4px 16px #000a;white-space:nowrap;
 animation:slideUp .25s ease;`;
 t.textContent=msg;
 document.body.appendChild(t);
 setTimeout(()=>t.remove(), duration);
}
function _confirm(msg, onYes, onNo){
 const ov=document.createElement('div');
 ov.setAttribute('data-closeable','');
 ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:19998;display:flex;align-items:center;justify-content:center;';
 const box=document.createElement('div');
 box.style.cssText='background:var(--s2);border:1px solid var(--LW);border-radius:8px;padding:20px 24px;max-width:320px;font-family:var(--M);font-size:.75rem;color:var(--txt);';
 box.innerHTML=`<div style="margin-bottom:14px;line-height:1.5">${msg}</div>
 <div style="display:flex;gap:8px;justify-content:flex-end">
 <button onclick="this.closest('[data-closeable]').remove();${onNo?'('+onNo+')()':''}" style="padding:5px 14px;background:var(--bdr);color:var(--dim);border:1px solid var(--bdr2);border-radius:4px;cursor:pointer;font-family:var(--M);font-size:.75rem;" aria-label="İptal">İptal</button>
 <button onclick="this.closest('[data-closeable]').remove();(${onYes})()" style="padding:5px 14px;background:rgba(239,68,68,.2);color:var(--LR);border:1px solid var(--LR);border-radius:4px;cursor:pointer;font-family:var(--M);font-size:.75rem;" aria-label="Onayla">Onayla</button>
 </div>`;
 ov.appendChild(box);
 document.body.appendChild(ov);
}

/* ── Evrensel diyalog yardımcısı: backdrop click + Escape + aria ── */
function _makeDialogOverlay(id, onClose){
 const overlay = document.createElement('div');
 overlay.id = id + '-overlay';
 overlay.setAttribute('data-closeable','');
 overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:9998;';
 overlay.addEventListener('click', e => { if(e.target===overlay){ onClose(); overlay.remove(); } });
 return overlay;
}

function showSpeedLimitDialog(){
 const existing=document.getElementById('speedlimit-dlg');
 if(existing){existing.remove();return;}
 const dlg=document.createElement('div');
 dlg.id='speedlimit-dlg';
 dlg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--s2);border:1px solid #38bdf8;border-radius:8px;padding:16px 20px;z-index:9999;min-width:min(220px,calc(100vw - 24px));box-shadow:0 8px 32px #000a;font-family:var(--M);';
 dlg.innerHTML=`<div style="color:var(--cyan-light);font-size:.875rem;margin-bottom:10px">🚗 HIZ SINIRI AYARI</div>
<div style="font-size:.625rem;color:var(--slate);margin-bottom:8px">Ayarlanmış hız sınırı (km/h). Aşımda ! olayı tetiklenir.</div>
<input id="dlg-speed" type="number" min="50" max="130" value="${S.speedLimit||90}" style="width:100%;background:var(--s1);color:var(--txt);border:1px solid #1e2232;border-radius:4px;padding:6px;font-size:.75rem;margin-bottom:10px;font-family:var(--M)">
<div style="display:flex;gap:8px;justify-content:flex-end;">
<button onclick="document.getElementById('speedlimit-dlg').remove()" style="padding:4px 12px;background:var(--bdr);color:var(--slate);border:none;border-radius:4px;cursor:pointer;font-size:.75rem;" aria-label="Hız sınırı diyaloğunu kapat">İptal</button>
<button onclick="applySpeedLimit()" style="padding:4px 12px;background:var(--blue-dark);color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:.75rem;" aria-label="Hız sınırını uygula">Uygula</button>
</div>`;
 document.body.appendChild(dlg);
}
function applySpeedLimit(){
 const val=parseInt(document.getElementById('dlg-speed')?.value)||90;
 S.speedLimit=Math.min(130,Math.max(50,val));
 const lbl=document.getElementById('speed-limit-lbl');
 if(lbl) lbl.textContent=S.speedLimit;
 const dlg=document.getElementById('speedlimit-dlg');
 if(dlg) dlg.remove();
 doLog(`✓ Hız sınırı ${S.speedLimit} km/h olarak ayarlandı.`,'ok');
}

/* ══════════════════════════════════════════════════════════
 GNSS SIMÜLASYON TOGGLE
══════════════════════════════════════════════════════════ */
function toggleGNSS(){
 S.gnssOk=!S.gnssOk;
 if(!S.gnssOk){
 S.gnssLostMin=S.simMin;
 doLog('📡 GNSS SİNYALİ KAYBEDİLDİ: 3 saatlik sürüşte konum yoksa uyarı tetiklenir.','warn');
 triggerWarning('! GNSS sinyali mevcut değil','GNSS sinyal kaybı. 3 saat kümülatif sürüşten sonra olay kaydedilir.','event');
 } else {
 S.gnssLostMin=0;
 /* Varsa GNSS uyarısını temizle */
 S.activeWarnings=S.activeWarnings.filter(w=>w.code!=='! GNSS sinyali mevcut değil');
 renderWarningBanner();
 doLog('📡 GNSS sinyali geri geldi.','ok');
 }
 checkGNSSStatus();
}

/* ══════════════════════════════════════════════════════════ */
let _osnmaAnimTimer = null;

function triggerOSNMASpoofing(){
 /* Spoofing tespiti — sadece /b ve OSNMA aktifse anlamlı */
 if(!S.osnmaActive){
 doLog('ℹ Geçiş versiyonu ('+S.dtcoVariant+'): OSNMA doğrulama devre dışı — spoofing tespiti yapılamaz.','warn');
 return;
 }
 S.gnssOk = false;
 S.gnssLostMin = S.simMin;

 /* "!? GNSS Anormal" olayı — PDF S.114 */
 triggerWarning(
 '!? GNSS Anormal',
 'Galileo OS-NMA kimlik doğrulaması hatalı veya GNSS alıcısı bir saldırı tanımladı. ' +
 'Olası nedenler: Müdahale/dışarıdan saldırı, diğer parazit kaynakları (CD çalar vb.). ' +
 'Önlemler: Müdahale sebeplerini araştırın, GNSS fonksiyonunu kontrol edin.',
 'event'
 );

 doLog('🚨 GNSS SPOOFING TESPİT EDİLDİ — !? GNSS Anormal olayı tetiklendi. / ','err');
 doLog(' Galileo OSNMA kimlik doğrulama başarısız. Konum verileri güvenilmez!','err');
 doLog(' Olası nedenler: Sahte GNSS sinyali (spoofing), parazit kaynağı, donanım arızası.');
 doLog(' Önlem: Uyarıyı onayla → GNSS fonksiyonunu kontrol et → Gerekirse servise götür.');

 /* OSNMA LED animasyonu */
 updateOSNMAStatus();
 const osnmaLed = document.getElementById('osnma-led');
 if(osnmaLed){
 osnmaLed.className = 'lcd-led warn';
 osnmaLed.title = '!? GNSS Anormal — Spoofing tespiti';
 }

 /* LCD'de yanıp sönen uyarı efekti */
 _startSpoofingAnimation();
 updateLCD();
}

function _startSpoofingAnimation(){
 if(_osnmaAnimTimer) clearInterval(_osnmaAnimTimer);
 let blink = false;
 const lspd = document.getElementById('lspd');
 const gnssLed = document.getElementById('gnss-led');
 _osnmaAnimTimer = setInterval(()=>{
 blink = !blink;
 if(lspd) lspd.style.color = blink ? '#ef4444' : '#f97316';
 if(gnssLed) gnssLed.style.background = blink ? '#ef4444' : '#f97316';
 }, 400);
 /* 30sn sonra durdur */
 setTimeout(()=>{
 if(_osnmaAnimTimer) clearInterval(_osnmaAnimTimer);
 if(lspd) lspd.style.color = '';
 }, 30000);
}

function resolveOSNMAAnormal(){
 /* Sinyal doğrulandı veya parazit kaynağı ortadan kalktı */
 if(_osnmaAnimTimer){ clearInterval(_osnmaAnimTimer); _osnmaAnimTimer=null; }
 S.gnssOk = true;
 S.gnssLostMin = 0;
 /* Aktif uyarıdan GNSS Anormal varsa temizle */
 S.activeWarnings = (S.activeWarnings||[]).filter(w=>w.code!=='!? GNSS Anormal');
 renderWarningBanner();
 updateLedWarning();
 updateOSNMAStatus();
 const lspd = document.getElementById('lspd');
 if(lspd) lspd.style.color = '';
 doLog('✓ GNSS Anormal çözüldü — Galileo OSNMA sinyali yeniden doğrulandı. Konum verileri güvenilir.','ok');
 updateLCD();
}

function showSpoofingDialog(){
 const existing = document.getElementById('spoofing-dlg');
 if(existing){ existing.remove(); return; }
 const dlg = document.createElement('div');
 dlg.id = 'spoofing-dlg';
 dlg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#1a0808;border:2px solid #ef4444;border-radius:8px;padding:20px 24px;z-index:9999;min-width:min(340px,calc(100vw - 24px));box-shadow:0 0 40px rgba(239,68,68,.4);font-family:var(--M);animation:warnpulse .8s ease-in-out infinite alternate;';
 dlg.innerHTML = `
 <div style="color:var(--red);font-size:1rem;font-weight:700;margin-bottom:8px;letter-spacing:2px">!? GNSS ANORMAL</div>
 <div style="color:#fca5a5;font-size:.75rem;line-height:1.6;margin-bottom:14px">
 <b>PDF S.114 — Galileo OS-NMA Kimlik Doğrulama Hatası</b><br><br>
 GNSS alıcısı sinyal kimlik doğrulamasını tamamlayamadı.<br>
 Bu bildirim olası bir müdahaleye işaret etmektedir.<br><br>
 <b>Olası nedenler:</b><br>
 • Müdahale ya da dışarıdan saldırı (GPS spoofing)<br>
 • Diğer parazit kaynaklarından gelen parazitler<br>
 (örn. CD çalar, güçlü radyo vericisi)<br><br>
 <b>Önlemler:</b><br>
 • Müdahale sebeplerini araştırın<br>
 • GNSS fonksiyonunu kontrol edin<br>
 • Gerekli durumlarda bozuk komponenti değiştirin<br>
 • Parazit kaynağını ortadan kaldırın
 </div>
 <div style="display:flex;gap:8px;justify-content:flex-end">
 <button onclick="resolveOSNMAAnormal();document.getElementById('spoofing-dlg')?.remove()" 
 style="padding:6px 14px;background:#0a2a0a;border:1px solid #22c55e;color:var(--grn);border-radius:4px;cursor:pointer;font-size:.75rem;font-family:var(--M)" aria-label="GNSS anormal durumu çöz">
 ✓ Çözüldü — GNSS Geri Geldi
 </button>
 <button onclick="acknowledgeWarning();document.getElementById('spoofing-dlg')?.remove()"
 style="padding:6px 14px;background:#2a0a0a;border:1px solid #ef4444;color:var(--red);border-radius:4px;cursor:pointer;font-size:.75rem;font-family:var(--M)" aria-label="Uyarıyı onayla">
 Onayla (Devam Et)
 </button>
 </div>`;
 document.body.appendChild(dlg);
}

/* ══════════════════════════════════════════════════════════
 BÜTÜN UYARILARI TEMİZLE (test amaçlı)
══════════════════════════════════════════════════════════ */
function clearAllWarnings(){
 S.activeWarnings=[];
 renderWarningBanner();
 updateLedWarning();
 doLog('ℹ Tüm aktif uyarılar temizlendi.','ok');
}

/* ══════════════════════════════════════════════════════════ */
function simulateDSRCBeacon(){
 if(!S.dsrcEnabled){
 doLog('⚠ DSRC devre dışı — beacon ile okuma yapılamıyor.','warn');
 return;
 }
 doLog('📡 DSRC BEACON ALGISI — Yol kenarı kontrol noktası. ','ok');
 doLog(' Araç durmadan veri aktarımı başladı...');
 setTimeout(()=>{
 /* Beacon okuma simülasyonu — ~3 saniye gecikme */
 const violations = (S.faultHistory||[]).filter(f=>f.type==='event').length;
 const posCount = (S.positionLog||[]).length;
 const hasViolation = violations > 0 || S.weeklyDrv > getWeeklyMax() || S.dailyDrv > S.dailyMax * 0.9;

 doLog(`📡 DSRC Özet Veri İletimi:`,'ok');
 doLog(` → Araç: 34 ABC 123 | Sürücü: A.YILMAZ`);
 doLog(` → Model: ${S.dtcoVariant||'4.1b'} | Kart: ${S.cardGen||'G2V2'}`);
 doLog(` → Günlük sürüş: ${hm(S.dailyDrv)} / ${hm(S.dailyMax)}`);
 doLog(` → Sınır geçişi: ${(S.borderLog||[]).length} | Konum: ${posCount}`);
 doLog(` → Olay/Arıza: ${violations} kayıt`);

 if(hasViolation){
 doLog('🚨 DSRC ÖN SEÇİM: Araç kontrole çekildi! İhlal şüphesi tespit edildi.','err');
 triggerWarning('DSRC Kontrol','Yol kenarı DSRC beacon araçta ihlal şüphesi tespit etti. Kontrol noktasına yönlendirin. ','event');
 } else {
 doLog('✓ DSRC ÖN SEÇİM: Araç geçiş onayı — ihlal tespit edilmedi.','ok');
 }
 }, 1500);
}

/* ══════════════════════════════════════════════════════════ */
function showITSDataDialog(){
 const existing = document.getElementById('its-dlg');
 if(existing){ existing.remove(); return; }
 const dlg = document.createElement('div');
 dlg.id = 'its-dlg';
 dlg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--s2);border:1px solid #38bdf8;border-radius:8px;padding:18px 22px;z-index:9999;min-width:min(340px,calc(100vw - 24px));max-width:min(440px,calc(100vw - 24px));box-shadow:0 8px 32px #000a;font-family:var(--M);';

 /* PDF Kişisel ITS verileri + kişisel verileri */
 const itsItems = [
 /* Kişisel ITS verileri — sürücü kartı izni gerekli */
 {lbl:'Sürücünün adı ve soyadı', desc:' Kişisel ITS verisi', ok:S.itsPermission, cat:'ITS'},
 {lbl:'Sürücü kartı numarası', desc:' Kişisel ITS verisi', ok:S.itsPermission, cat:'ITS'},
 {lbl:'Doğum tarihi', desc:' Kişisel ITS verisi', ok:S.itsPermission, cat:'ITS'},
 /* Kişisel verileri — sürücü kartı ilk takılışında onay */
 {lbl:'D1/D2 durum girişleri', desc:' kişisel verisi', ok:true, cat:''},
 {lbl:'Motor devir sayısı profilleri', desc:' — CAN bus', ok:true, cat:''},
 {lbl:'Hız profilleri (16 aralık)', desc:' kişisel verisi', ok:true, cat:''},
 {lbl:'4 Hz hız sinyali', desc:' gerçek zamanlı', ok:true, cat:''},
 /* G2V2 ek veriler */
 {lbl:'Konum verileri (3sa GNSS)', desc:'G2V2 — OSNMA onaylı', ok:S.gnssOk&&S.cardGen==='G2V2', cat:'G2V2'},
 {lbl:'Sınır geçişleri', desc:'G2V2 — otomatik', ok:S.cardGen==='G2V2', cat:'G2V2'},
 {lbl:'Yük tipi', desc:`G2V2 — ${S.cargoType==='passengers'?'Yolcular':'Mallar'}`, ok:S.cardGen==='G2V2', cat:'G2V2'},
 {lbl:'Olay/Arıza log', desc:' — tüm kart nesillerinde', ok:true, cat:'Temel'},
 ];

 /* Kategorilere göre renk */
 const catColor = {ITS:'#60a5fa', GENEL:'#f59e0b', G2V2:'#a78bfa', Temel:'#22c55e'};
 const rows = itsItems.map(it => `
 <div style="display:flex;gap:10px;padding:5px 0;border-bottom:1px solid #1e2232;align-items:center">
 <span style="color:${it.ok?'#22c55e':'#64748b'};min-width:16px;font-size:.75rem">${it.ok?'✓':'✗'}</span>
 <span style="flex:1;font-size:.625rem;color:var(--txt)">${escapeHTML(it.lbl)}</span>
 <span style="font-size:var(--fs-min);color:${catColor[it.cat]||'#64748b'};min-width:32px;text-align:right">${escapeHTML(it.cat||'')}</span>
 </div>`).join('');

 dlg.innerHTML = `
 <div style="color:var(--cyan-light);font-size:.875rem;margin-bottom:4px">📶 ITS VERİ AKIŞI </div>
 <div style="font-size:.625rem;color:var(--dim);margin-bottom:12px">
 ITS arayüzü üzerinden paylaşılan kişisel veriler.<br>
 Sürücü kartında ITS izni gereklidir.
 </div>
 <div style="margin-bottom:12px">
 <div style="font-size:.625rem;color:var(--slate);letter-spacing:1px;margin-bottom:6px">VERİ KATEGORİLERİ</div>
 ${rows}
 </div>
 <div style="background:#0e1826;border:1px solid #1e3a5a;border-radius:4px;padding:8px;font-size:.625rem;color:var(--blue-light);margin-bottom:10px">
 ℹ ITS izni sürücü kartındadır. İzin yoksa Bluetooth bağlantısı açık kalır ama kişisel veri aktarımı gerçekleşmez.<br>
 GDPR: Veriler yalnızca yasal amaçlar için işlenir. Veri Koruma.
 </div>
 <div style="display:flex;gap:8px;justify-content:space-between;align-items:center">
 <label style="display:flex;align-items:center;gap:6px;font-size:.625rem;color:var(--txt);cursor:pointer">
 <input type="checkbox" id="dlg-its-perm" ${S.itsPermission?'checked':''}>
 ITS veri izni aktif
 </label>
 <button onclick="applyITSPermission()" style="padding:4px 12px;background:#0a1e2a;border:1px solid #38bdf8;color:var(--cyan-light);border-radius:4px;cursor:pointer;font-size:.75rem;font-family:var(--M)" aria-label="ITS izin kategorisini uygula">Uygula</button>
 <button onclick="document.getElementById('its-dlg').remove()" style="padding:4px 10px;background:var(--bdr);color:var(--slate);border:none;border-radius:4px;cursor:pointer;font-size:.75rem" aria-label="ITS diyaloğunu kapat">Kapat</button>
 </div>`;
 document.body.appendChild(dlg);
}

function applyITSPermission(){
 const cb = document.getElementById('dlg-its-perm');
 if(!cb) return;
 S.itsPermission = cb.checked;
 document.getElementById('its-dlg')?.remove();
 const itsLed = document.getElementById('its-led');
 if(itsLed) itsLed.className = 'lcd-led ' + (S.bluetoothOn && S.itsPermission ? 'on' : 'off');
 doLog(`📶 ITS veri izni: ${S.itsPermission?'AKTİF — Kişisel veri akışı izinli':'KAPALI — Veri akışı yok (Bluetooth bağlantısı açık kalır)'}. `,'ok');
}

/* ══════════════════════════════════════════════════════════ */
function showDTCOVersionDialog(){
 const existing=document.getElementById('dtco-ver-dlg');
 if(existing){existing.remove();return;}
 const dlg=document.createElement('div');
 dlg.id='dtco-ver-dlg';
 dlg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--s2);border:1px solid #a78bfa;border-radius:8px;padding:16px 20px;z-index:9999;min-width:min(300px,calc(100vw - 24px));box-shadow:0 8px 32px #000a;font-family:var(--M);';
 const versions=[
 {v:'4.1b', label:'— Tam OSNMA (Eylül 2025+)', osnma:true, desc:'Galileo OSNMA tam uyumlu. Zorunlu periyodik kontrol sürümü.'},
 {v:'4.1a', label:'— OSNMA Aktif (Mart 2025+)', osnma:true, desc:'İlk OSNMA sürümü. Yeni araç için zorunlu (Aralık 2025+).'},
 {v:'4.1', label:'— Geçiş (Ağustos 2023+)', osnma:false, desc:'OSNMA test sinyali. Mevcut araçlarda geçerli (muafiyet).'},
 ];
 const btns=versions.map(vv=>`<button onclick="applyDTCOVersion('${vv.v}')" style="display:block;width:100%;text-align:left;margin-bottom:6px;padding:8px 12px;background:${S.dtcoVariant===vv.v?'#1e2a4a':'#0e0f16'};border:1px solid ${S.dtcoVariant===vv.v?'#a78bfa':'#1e2232'};color:var(--txt);border-radius:4px;cursor:pointer;font-family:var(--M);font-size:.75rem;" aria-label="takograf versiyonunu uygula">
 <div style="color:${vv.osnma?'#a78bfa':'#f59e0b'};font-size:.75rem;font-weight:700;margin-bottom:2px">${escapeHTML(vv.v)} ${vv.osnma?'🔒 OSNMA':'🔓 Geçiş'}</div>
 <div>${escapeHTML(vv.label)}</div>
 <div style="color:var(--dim);font-size:.625rem;margin-top:2px">${escapeHTML(vv.desc)}</div>
 </button>`).join('');
 dlg.innerHTML=`<div style="color:var(--violet-light);font-size:.875rem;margin-bottom:12px">⚙ TAKOGRAf VERSİYON SEÇIMI </div>
<div style="font-size:.625rem;color:var(--slate);margin-bottom:10px">Versiyon cihaz yazılımını belirler. Gerçek araçta servis kartıyla değiştirilir.</div>
${btns}
<div style="display:flex;justify-content:flex-end;margin-top:8px">
 <button onclick="document.getElementById('dtco-ver-dlg').remove()" style="padding:4px 12px;background:var(--bdr);color:var(--slate);border:none;border-radius:4px;cursor:pointer;font-size:.75rem" aria-label="DTCO versiyon diyaloğunu kapat">Kapat</button>
</div>`;
 document.body.appendChild(dlg);
}
function applyDTCOVersion(v){
 S.dtcoVariant=v;
 S.osnmaActive=(v==='4.1a'||v==='4.1b');
 document.getElementById('dtco-ver-dlg')?.remove();
 updateOSNMAStatus();
 const badge=document.getElementById('dtco-ver-badge');
 if(badge) badge.textContent=v;
 doLog(`⚙ takograf versiyonu: ${v} — ${S.osnmaActive?'🔒 OSNMA Galileo doğrulama AKTİF':'🔓 Geçiş sürümü (OSNMA test sinyali)'}. `,'ok');
 if(!S.osnmaActive) doLog('ℹ Geçiş takografı: Konum verileri OSNMA onaylı değil. Mevcut araçlarda muafiyet geçerli (Aralık 2025 sonrası yeni araçlarda OSNMA zorunlu).','warn');
 updateLCD();
}
function updateOSNMAStatus(){
 const led=document.getElementById('osnma-led');
 if(led){
 if(S.osnmaActive && S.gnssOk){
 led.className='lcd-led on';
 led.title='🔒 OSNMA AKTİF — Galileo sinyal doğrulama çalışıyor';
 led.style.background='#a78bfa';
 led.style.boxShadow='0 0 4px #a78bfa';
 } else if(S.osnmaActive && !S.gnssOk){
 led.className='lcd-led warn';
 led.title='⚠ OSNMA: GNSS sinyali yok';
 } else {
 led.className='lcd-led off';
 led.title='🔓 Geçiş versiyonu — OSNMA yok';
 led.style.background='';
 led.style.boxShadow='';
 }
 }
 /* OSNMA durum barı güncelle */
 const bar=document.getElementById('osnma-status-bar');
 const ico=document.getElementById('osnma-bar-ico');
 const txt=document.getElementById('osnma-bar-txt');
 const dt=document.getElementById('osnma-bar-date');
 if(bar){
 bar.style.display='flex';
 if(S.osnmaActive && S.gnssOk){
 bar.style.background='rgba(167,139,252,.08)';
 bar.style.borderColor='rgba(167,139,252,.3)';
 bar.style.color='#a78bfa';
 if(ico) ico.textContent='🔒';
 if(txt) txt.textContent=`Takograf ${S.dtcoVariant||'4.1b'} — OSNMA Galileo doğrulama AKTİF`;
 if(dt) dt.textContent='Ara. 2025+';
 } else if(!S.osnmaActive){
 bar.style.background='rgba(245,158,11,.06)';
 bar.style.borderColor='rgba(245,158,11,.3)';
 bar.style.color='#f59e0b';
 if(ico) ico.textContent='🔓';
 if(txt) txt.textContent=`Takograf ${S.dtcoVariant||'4.1'} — GEÇİŞ VERSİYONU (OSNMA yok)`;
 if(dt) dt.textContent='Mevcut araçlar muaf';
 } else {
 bar.style.background='rgba(239,68,68,.06)';
 bar.style.borderColor='rgba(239,68,68,.3)';
 bar.style.color='#ef4444';
 if(ico) ico.textContent='⚠';
 if(txt) txt.textContent='OSNMA AKTİF ama GNSS sinyali yok';
 if(dt) dt.textContent='Sinyal bekliyor';
 }
 }
}

/* ══════════════════════════════════════════════════════════ */
function recordPosition(reason){
 if(!S.positionLog) S.positionLog=[];
 const entry={
 t: simTime(),
 utc: simUTCDisplay(),
 simMin: S.simMin,
 country: S.currentCountry||'TR',
 reason: reason,
 osnma: S.osnmaActive && S.gnssOk,
 locked: S.osnmaActive && S.gnssOk, /* Doğrulanmış konum */
 cardGen: S.cardGen,
 cargoType: S.cargoType,
 };
 S.positionLog.push(entry);
 const lockIcon = entry.locked ? '🔒' : '🔓';
 const reasonLabels={
 'shift_start':'Vardiya başlangıcı',
 'shift_end':'Vardiya sonu',
 '3h_drive':'3sa kümülatif sürüş',
 'loading':'Yükleme',
 'unloading':'Boşaltma',
 'border':'Sınır geçişi',
 };
 const lbl=reasonLabels[reason]||reason;
 doLog(`📍 ${lockIcon} Konum kaydı: ${entry.country} — ${lbl} | ${entry.utc}${entry.locked?' [OSNMA ✓]':' [doğrulanmamış]'}. `,'ok');
 /* GEN1/GEN2V1 kart uyarısı */
 if(S.cardGen!=='G2V2' && reason!=='3h_drive'){
 doLog(`ℹ ${S.cardGen} kart: Konum kaydı yığın bellekte tutulur, kart üzerine yazılmaz. Trafik kontrolünde araç raporu istenir.`);
 }
 updatePositionPanel();
 /* Konum sekmesi açıksa tab içeriğini güncelle */
 const gnssTab=document.getElementById('rp-gnss');
 if(gnssTab&&gnssTab.classList.contains('active'))_updateGnssTab();
}

function checkPositionRecord(minutes){
 /* 3sa (180dk) kümülatif sürüş kontrolü */
 if(!S.positionDrivingAcc) S.positionDrivingAcc=0;
 const prevAcc=S.positionDrivingAcc;
 S.positionDrivingAcc+=minutes;
 /* Her 180dk'da bir konum kaydet */
 const prevStep=Math.floor(prevAcc/180);
 const newStep=Math.floor(S.positionDrivingAcc/180);
 if(newStep>prevStep){
 recordPosition('3h_drive');
 }
}

function updatePositionPanel(){
 const el=document.getElementById('position-log-body');
 if(!el||!S.positionLog) return;
 if(S.positionLog.length===0){
 el.innerHTML='<div data-empty>📍 Henüz konum kaydı yok</div>';
 return;
 }
 const lockColors={'true':'#a78bfa','false':'#f59e0b'};
 el.innerHTML=S.positionLog.slice(-15).reverse().map(p=>{
 const lc=lockColors[String(p.locked)]||'#64748b';
 const reasonLabels={'shift_start':'Vardiya başı','shift_end':'Vardiya sonu','3h_drive':'3sa sürüş','loading':'Yükleme','unloading':'Boşaltma','border':'Sınır'};
 return `<div style="display:flex;gap:6px;padding:3px 8px;border-bottom:1px solid #0e0f16;font-family:var(--M);font-size:var(--fs-min);align-items:center">
 <span style="color:var(--dim);min-width:36px">${escapeHTML(p.t)}</span>
 <span style="color:${lc}">${p.locked?'🔒':'🔓'}</span>
 <span style="color:var(--blue-light);min-width:24px">${escapeHTML(p.country)}</span>
 <span style="color:var(--slate-light);flex:1">${escapeHTML(reasonLabels[p.reason]||p.reason)}</span>
 <span style="color:var(--dim)">${escapeHTML(p.cardGen||'')}</span>
 </div>`;
 }).join('');
}

/* ══════════════════════════════════════════════════════════ */
function simulateAutoBorderCrossing(toCountry){
 if(!toCountry||!COUNTRY_CODES[toCountry]) return;
 const fromCountry=S.currentCountry||'TR';
 if(fromCountry===toCountry) return;

 const isAuto = (S.cardGen==='G2V2') && S.gnssOk && (S.card1Type==='driver');

 if(!S.borderLog) S.borderLog=[];
 S.borderLog.push({
 from:fromCountry, to:toCountry,
 t:simTime(), utc:simUTCDisplay(),
 auto:isAuto, osnma:S.osnmaActive&&S.gnssOk,
 simMin:S.simMin,
 });

 const prevCountry=fromCountry;
 S.currentCountry=toCountry;
 const lbl=document.getElementById('country-lbl');
 if(lbl) lbl.textContent=toCountry;

 if(isAuto){
 doLog(`🛰 OTOMATİK SINIR GEÇİŞİ: ${prevCountry} → ${toCountry} (${COUNTRY_CODES[toCountry]})`, 'ok');
 doLog(` ${S.osnmaActive?'🔒 OSNMA onaylı':'🔓 Doğrulanmamış'} | G2V2 kart | GNSS aktif | `);
 if(S.cardGen==='G2V2') doLog(` ✓ Kart üzerine yazıldı (G2V2) + Yığın bellek kaydı`,'ok');
 /* Konum kaydı tetikle */
 recordPosition('border');
 } else {
 doLog(`🌐 Sınır geçişi: ${prevCountry} → ${toCountry}`, 'ok');
 if(S.cardGen!=='G2V2') doLog(` ⚠ ${S.cardGen}: Yalnızca yığın bellekte`,'warn');
 if(!S.gnssOk) doLog(` ⚠ GNSS yok — konum doğrulanamıyor`,'warn');
 }
 /* G1: Kaboataj — her geçişte ortak */
 if(!S.cabotageLog) S.cabotageLog={};
 if(!S.cabotageLog[fromCountry]) S.cabotageLog[fromCountry]=0;
 S.cabotageLog[fromCountry]++;
 const _cT=S.cabotageLog[fromCountry];
 if(_cT>=3) doLog('⚠ KABOATAJ: '+fromCountry+' '+_cT+'. sefer — AB limiti 3/7gün!','err');
 else doLog('ℹ Kaboataj: '+fromCountry+' '+_cT+'/3 sefer.');
 updateBorderPanel();
 updateLCD();
}

function updateBorderPanel(){
 const el=document.getElementById('border-log-body');
 if(!el||!S.borderLog) return;
 if(S.borderLog.length===0){
 el.innerHTML='<div data-empty>🌍 Henüz sınır geçişi yok</div>';
 return;
 }
 el.innerHTML=S.borderLog.slice(-10).reverse().map(b=>`<div style="display:flex;gap:6px;padding:3px 8px;border-bottom:1px solid #0e0f16;font-family:var(--M);font-size:var(--fs-min);align-items:center">
 <span style="color:var(--dim);min-width:36px">${escapeHTML(b.t||'')}</span>
 <span style="color:${b.auto?'#22c55e':'#f59e0b'}">${b.auto?'🛰':'✏'}</span>
 <span style="color:var(--blue-light)">${escapeHTML(b.from||'')}→${escapeHTML(b.to||'')}</span>
 <span style="flex:1;color:${b.osnma?'#a78bfa':'#64748b'}">${b.osnma?'🔒 OSNMA':''}</span>
 </div>`).join('');
}

/* ══════════════════════════════════════════════════════════ */
function showCardGenDialog(){
 const existing=document.getElementById('cardgen-dlg');
 if(existing){existing.remove();return;}
 const gens=[
 {g:'G2V2', label:'GEN2 V2 — Yeni nesil (2023+)', color:'#a78bfa', desc:'56 gün saklama. 1.624 yükleme kaydı. Sınır geçişi kart üzerine yazılır. OSNMA desteği.'},
 {g:'G2V1', label:'GEN2 V1 — 1. nesil akıllı (2019+)', color:'#f59e0b', desc:'28 gün saklama. Sınır geçişi yalnızca yığın bellekte. ile kullanıldı.'},
 {g:'G1', label:'GEN1 — Dijital (2006+)', color:'#ef4444', desc:'28 gün saklama. Sınır geçişi, yükleme/boşaltma kaydı yok. Eski formata sahip.'},
 ];
 const dlg=document.createElement('div');
 dlg.id='cardgen-dlg';
 dlg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--s2);border:1px solid #60a5fa;border-radius:8px;padding:16px 20px;z-index:9999;min-width:min(300px,calc(100vw - 24px));box-shadow:0 8px 32px #000a;font-family:var(--M);';
 const btns=gens.map(gn=>`<button onclick="applyCardGen('${gn.g}')" style="display:block;width:100%;text-align:left;margin-bottom:6px;padding:8px 12px;background:${S.cardGen===gn.g?'#1e2a4a':'#0e0f16'};border:1px solid ${S.cardGen===gn.g?gn.color:'#1e2232'};color:var(--txt);border-radius:4px;cursor:pointer;font-family:var(--M);font-size:.75rem;" aria-label="Kart neslini uygula">
 <div style="color:${gn.color};font-weight:700;margin-bottom:2px">${escapeHTML(gn.g)}</div>
 <div>${escapeHTML(gn.label)}</div>
 <div style="color:var(--dim);font-size:.625rem;margin-top:2px">${escapeHTML(gn.desc)}</div>
</button>`).join('');
 dlg.innerHTML=`<div style="color:var(--blue-light);font-size:.875rem;margin-bottom:12px">🎴 KART NESLİ </div>
<div style="font-size:.625rem;color:var(--slate);margin-bottom:10px">Takılı kart nesli kayıt kapasitesini ve sınır geçişi özelliklerini belirler.</div>
${btns}
<div style="display:flex;justify-content:flex-end;margin-top:8px">
 <button onclick="document.getElementById('cardgen-dlg').remove()" style="padding:4px 12px;background:var(--bdr);color:var(--slate);border:none;border-radius:4px;cursor:pointer;font-size:.75rem" aria-label="Kart nesli diyaloğunu kapat">Kapat</button>
</div>`;
 document.body.appendChild(dlg);
}
function applyCardGen(gen){
 const prev=S.cardGen;
 S.cardGen=gen;
 document.getElementById('cardgen-dlg')?.remove();
 /* LCD kart nesli badgesi güncelle */
 const badge=document.getElementById('card-gen-badge');
 if(badge){
 badge.textContent=gen;
 badge.style.color=gen==='G2V2'?'#a78bfa':gen==='G2V1'?'#f59e0b':'#ef4444';
 }
 /* Saklama süresini güncelle */
 S.storageDays = gen==='G2V2' ? 56 : 28;
 doLog(`🎴 Kart nesli değiştirildi: ${prev} → ${gen} | Saklama: ${S.storageDays} gün | `,'ok');
 if(gen==='G2V2') doLog('✓ G2V2: Sınır geçişi otomatik karta yazılır, 56 gün saklama, OSNMA desteği.','ok');
 else if(gen==='G2V1') doLog('⚠ G2V1: Sınır geçişi yalnızca yığın bellekte. 28 gün saklama. ile kısıtlı özellik.','warn');
 else doLog('⚠ GEN1: Sınır geçişi ve yükleme kaydı desteklenmiyor. Sadece temel veri.','warn');
 updateLCD();
}

/* ══════════════════════════════════════════════════════════ */
function showCargoTypeDialog(){
 const existing=document.getElementById('cargo-dlg');
 if(existing){existing.remove();return;}
 const dlg=document.createElement('div');
 dlg.id='cargo-dlg';
 dlg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--s2);border:1px solid #22c55e;border-radius:8px;padding:16px 20px;z-index:9999;min-width:min(240px,calc(100vw - 24px));box-shadow:0 8px 32px #000a;font-family:var(--M);';
 dlg.innerHTML=`<div style="color:var(--grn);font-size:.875rem;margin-bottom:10px">📦 YÜK TİPİ </div>
<div style="font-size:.625rem;color:var(--slate);margin-bottom:12px">G2V2 özelliği: Araçta ne taşındığı kaydedilir. Piktogram ve raporlarda gösterilir.</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
 <button onclick="applyCargoType('goods')" style="padding:12px;background:${S.cargoType==='goods'?'#1a2a1a':'#0e0f16'};border:1px solid ${S.cargoType==='goods'?'#22c55e':'#1e2232'};color:var(--txt);border-radius:6px;cursor:pointer;font-family:var(--M);font-size:.75rem;text-align:center" aria-label="Yük tipi: Mal seç">
 <div style="font-size:1.5rem">📦</div>
 <div style="color:var(--grn);font-weight:700">MALLAR</div>
 <div style="color:var(--dim);font-size:.625rem">Goods / Kargo</div>
 </button>
 <button onclick="applyCargoType('passengers')" style="padding:12px;background:${S.cargoType==='passengers'?'#1a1a2a':'#0e0f16'};border:1px solid ${S.cargoType==='passengers'?'#3b82f6':'#1e2232'};color:var(--txt);border-radius:6px;cursor:pointer;font-family:var(--M);font-size:.75rem;text-align:center" aria-label="Yük tipi: Yolcu seç">
 <div style="font-size:1.5rem">👥</div>
 <div style="color:var(--blu);font-weight:700">YOLCULAR</div>
 <div style="color:var(--dim);font-size:.625rem">Passengers / Otobüs</div>
 </button>
</div>
<div style="display:flex;justify-content:flex-end">
 <button onclick="document.getElementById('cargo-dlg').remove()" style="padding:4px 12px;background:var(--bdr);color:var(--slate);border:none;border-radius:4px;cursor:pointer;font-size:.75rem" aria-label="Yük tipi diyaloğunu kapat">Kapat</button>
</div>`;
 document.body.appendChild(dlg);
}
function applyCargoType(type){
 S.cargoType=type;
 document.getElementById('cargo-dlg')?.remove();
 const label=type==='goods'?'📦 MALLAR':'👥 YOLCULAR';
 const badge=document.getElementById('cargo-badge');
 if(badge){badge.textContent=type==='goods'?'📦':'👥';}
 doLog(`📦 Yük tipi: ${label} — G2V2 konum kaydına eklendi`,'ok');
 if(S.cardGen!=='G2V2') doLog('ℹ Yük tipi kaydı yalnızca G2V2 kartta saklanır. Mevcut kart: '+S.cardGen,'warn');
 updateLCD();
}

/* ══════════════════════════════════════════════════════════ */
function enterControlMode(){
 S.controlMode=true;
 S.operationMode='control';
 const badge=document.getElementById('opmode-badge');
 if(badge){badge.textContent='KONTROL';badge.className='lcd-opmode';}
 badge?.setAttribute('style','background:#1a2a3a;color:var(--cyan-light);border:1px solid #38bdf8;padding:1px 6px;border-radius:2px;font-size:.48px');
 doLog('🚔 TRAFİK DENETİMİ — Kontrol kartı takıldı. ','ok');
 doLog(`ℹ Son ${S.storageDays} günün verileri erişilebilir.`);
 doLog('ℹ DSRC: Araç durmadan da ön seçim yapılabilir (yol kenarı DSRC beacon ile).');
 doLog(`ℹ Toplam konum kaydı: ${(S.positionLog||[]).length} | Sınır geçişi: ${(S.borderLog||[]).length}`);
 doLog(`ℹ Kart nesli: ${S.cardGen} | Saklama: ${S.storageDays} gün | Takograf: ${S.dtcoVariant}`);
 /* Kontrol raporu göster */
 setTimeout(()=>showReport('control'),500);
 updateLCD();
}
function exitControlMode(){
 S.controlMode=false;
 S.operationMode='driving';
 const badge=document.getElementById('opmode-badge');
 if(badge){if(typeof window._ktyMode!=='undefined'&&window._ktyMode){badge.textContent='🇹🇷 KTY';badge.className='lcd-opmode';badge.style.color='#e30a17';badge.style.borderColor='#e30a17';badge.style.background='rgba(227,10,23,.08)';}else{if(window._ktyMode){badge.textContent='🇹🇷 KTY';badge.className='lcd-opmode';badge.style.color='#e30a17';badge.style.borderColor='#e30a17';badge.style.background='rgba(227,10,23,.08)';}else{badge.textContent='🇪🇺 AB';badge.className='lcd-opmode';badge.style.color='#60a5fa';badge.style.borderColor='#3b82f6';badge.style.background='rgba(59,130,246,.08)';}}}
 const devBrand2=document.getElementById('dev-brand-lbl');
 if(devBrand2) devBrand2.textContent='| Smart Tachograph V2 | OSNMA';
 doLog('🚔 Kontrol kartı çıkarıldı. Sürücü moduna dönüldü.','ok');
 updateLCD();
}
function doLog(msg,type){
 /* Tüm mesajları kaydetmeden önce HTML escape et */
 const safe=escapeHTML(String(msg==null?'':msg));
 S.logs.push({t:simTime(),msg:safe,type:type||'ok'});
 if(S.logs.length>400)S.logs.shift();
 renderLog();
}
function renderLog(){
 const el=document.getElementById('logbody');
 if(!el)return;
 /* msg zaten escapeHTML ile temizlendi — innerHTML güvenli */
 el.innerHTML=S.logs.map(l=>`<div class="ll ${l.type==='warn'?'lw':l.type==='err'?'le':''}"><span class="lt">[${l.t}]</span> <span class="lm">${l.msg}</span></div>`).join('');
 el.scrollTop=el.scrollHeight;
 const lt=document.getElementById('logt');
 if(lt)lt.textContent=simTime();
}

function updateMpict(mode){
 const svg=document.getElementById('msvg');
 const el=document.getElementById('mpict');
 const lbl=document.getElementById('mlbl');
 if(svg)svg.innerHTML=MPSVG[mode]||'';
 if(el)el.className='mpict '+(MPCLS[mode]||'');
 if(lbl)lbl.textContent=MPLBL[mode]||'';
 /* Mod süresi — contDrv/restSes/workAcc */
 const mt=document.getElementById('mode-timer');
 if(mt){
   if(S.mode==='driving') mt.textContent=hm(S.contDrv||0);
   else if(S.mode==='rest') mt.textContent=hm(S.restSes||0);
   else if(S.mode==='work') mt.textContent=hm(S.workAcc||0);
   else mt.textContent='';
 }
}

/* HIZ ANİM */
let spT=null;
function animSpd(target){
 if(spT)clearInterval(spT);
 spT=setInterval(()=>{
 const d=target-S.speed;
 if(Math.abs(d)<1){S.speed=target;clearInterval(spT);}
 else S.speed+=d*0.13;
 const v=Math.max(0,Math.round(S.speed));
 const se=document.getElementById('lspd');const sf=document.getElementById('spdf');
 if(se)se.textContent=String(v).padStart(3,'0');
 if(sf)sf.style.width=Math.min(100,v/130*100)+'%';
 },35);
}

/* MOD DEĞİŞTİR */
/* İŞ MENÜSÜ */
function openWorkMenu(){
 const popup=document.getElementById('work-popup');
 if(popup.style.display==='none'||popup.style.display===''){
 popup.style.display='block';
 /* Aktif alt modu vurgula */
 ['load','unload','both','other'].forEach(k=>{
 const b=document.getElementById('wb-'+k);
 if(b)b.classList.remove('on');
 });
 const subMap={loading:'wb-load',unloading:'wb-unload',both:'wb-both',otherwork:'wb-other'};
 const active=document.getElementById(subMap[S.workSub]);
 if(active)active.classList.add('on');
 } else {
 popup.style.display='none';
 }
}
function closeWorkMenu(){
 const popup=document.getElementById('work-popup');
 if(popup)popup.style.display='none';
}
function setWorkSub(sub){
 S.workSub=sub;
 /* Aktif buton vurgusu */
 ['wb-load','wb-unload','wb-both','wb-other'].forEach(id=>{
 const b=document.getElementById(id);if(b)b.classList.remove('on');
 });
 const subMap={loading:'wb-load',unloading:'wb-unload',both:'wb-both',otherwork:'wb-other'};
 const active=document.getElementById(subMap[sub]);
 if(active)active.classList.add('on');
 /* Butondaki alt etiket */
 const ws=WORK_SUBS[sub];
 const wsl=document.getElementById('work-sub-lbl');
 if(wsl)wsl.textContent=ws.lbl+' ▾';
 /* Popup'ı kapat, iş moduna geç */
 closeWorkMenu();
 setMode('work',document.getElementById('btn-w'));
}

function setMode(mode,btn){
 _dbg('setMode', mode, '← önceki:', S?.mode);
 const prev=S.mode;
 /* ── Şirket modu kısıtlaması ── */
 if(S.operationMode==='company' && mode==='driving'){
 triggerWarning('Şirket modu aktif','Şirket kartı takılıyken sürüş başlatılamaz. Önce şirket kartını çıkarın. ','usage',4);
 doLog('⚠ ŞİRKET MODU: Sürüş başlatılamaz — şirket kartı takılı. ','warn');
 return;
 }
 /* ── Günlük limit dolmuş — sürüş başlatma uyarısı ── */
 if(mode==='driving' && prev!=='driving' && S.dailyDrv>=S.dailyMax && S.dailyMax>0){
 const kHakki=(S.splitRestCount||0)<3;
 const minRest=kHakki?'9sa kısaltılmış (min 540dk)':'11sa tam (kısaltılmış hakkı doldu — min 660dk)';
 triggerWarning(
 '1 Günlük Din. Alınmadı!',
 'Günlük '+hm(S.dailyMax)+' sürüş dolmuş. Sürüşe devam etmeden önce '+minRest+
 ' günlük dinlenme zorunlu. AB 561/2006 Md.8. Araçta olmadan da dinlenme sayılır.',
 'event'
 );
 doLog('⚠ GÜNLÜK LİMİT DOLMUŞ ('+hm(S.dailyDrv)+'): '+minRest+' günlük dinlenme alın. ','warn');
 }
 /* ── ADR modu kısıtlaması ── */
 if(S.adrMode && mode==='driving' && S.speed===0){
 doLog('⚠ ADR MODU: Patlama bölgesinde sürüş — tüm güvenlik önlemlerini aldığınızdan emin olun. ','warn');
 }
 /* ══ DİNLENMEDEN ÇIKIŞ — AB 561/2006 Madde 8 Haftalık Dinlenme Tespiti ══ */
 if(prev==='rest'&&mode!=='rest'){
 const rs=S.restSes;

 if(rs>=2700){
 /* ── Mod değişiminde 45sa+ varsa: sadece telafi kontrolü ── */
 /* (Sayaçlar zaten advance() içindeki 2700dk eşiğinde sıfırlandı) */
 if(S.weeklyDeficit>0){
 const needed=2700+S.weeklyDeficit;
 if(rs>=needed){
 doLog(`✓ Telafi borcu (${hm(S.weeklyDeficit)}) tamamen ödendi! Toplam dinlenme: ${hm(rs)}`,'ok');
 S.weeklyDeficit=0;
 } else {
 doLog(`⚠ 45sa+ alındı ama telafi borcu hâlâ var: ${hm(needed-rs)} daha gerekli.`,'warn');
 }
 }

 } else if(rs>=1440){
 /* ── KISALTILMIş HAFTALIK DİNLENME (24sa–45sa arası) ── */
 const deficit=2700-rs;
 const w3=simWeekNum()+3;

 /* Önceki haftanın sürüşünü kaydet, sayaçları sıfırla */
 S.prevWeekDrv=S.weeklyDrv;
 S.weeklyDrv=0;
 S.dailyDrv=0; S.contDrv=0;
 S.breakLeft=270; S.dailyMax=540;
 S.extDayCount=0;
 if(window._extHistory) window._extHistory=[];
 /* splitRestCount: 2 ardışık periyot sonunda sıfırla */
 S.weeklyRestCount=(S.weeklyRestCount||0)+1;
 if(S.weeklyRestCount>=2){
 S.splitRestCount=0;
 S.weeklyRestCount=0;
 doLog('ℹ 2 haftalık periyot tamamlandı — 9sa kısaltılmış hak sıfırlandı (yeni periyot: 3 hak).','ok');
 }
 /* S1-3: Telafi borcu hafta sayacı */
 if((S.weeklyDeficit||0) > 0){
 S.weeklyDeficitWeeks = (S.weeklyDeficitWeeks||0) + 1;
 if(S.weeklyDeficitWeeks >= 3){
 triggerWarning(
 '⚠ Telafi Borcu 3 Haftayı Aştı!',
 `Telafi borcu ${hm(S.weeklyDeficit)} — 3 hafta içinde kapatılması zorunlu. ` +
 `Sonraki haftalık dinlenmeye en az ${hm(S.weeklyDeficit)} eklenmeli. ` +
 `Bugüne kadar ${S.weeklyDeficitWeeks} hafta geçti.`,
 'event'
 );
 doLog(`✗ TELAFİ BORCU 3 HAFTAYI GEÇTİ! Borç: ${hm(S.weeklyDeficit)} — acil kapatın! `,'err');
 } else {
 doLog(`⚠ Telafi borcu: ${hm(S.weeklyDeficit)} — ${3-S.weeklyDeficitWeeks} hafta kaldı. `,'warn');
 }
 } else {
 S.weeklyDeficitWeeks = 0; /* Borç ödendiyse sayacı sıfırla */
 }

 S.reducedInRow=(S.reducedInRow||0)+1;
 S.hadFullWeeklyRest=false;
 S.weeklyDeficit=(S.weeklyDeficit||0)+deficit;
 S.lastWeeklyRestMin=S.simMin;

 const dynMax=getWeeklyMax();
 doLog(`✓ ${hm(rs)} KISALTILMIş HAFTALIK DİNLENME → Sayaçlar sıfırlandı.`,'ok');
 doLog(`ℹ Önceki hafta: ${hm(S.prevWeekDrv)} | Bu hafta max: ${hm(dynMax)} | 2hf kalan: ${hm(Math.max(0,BIWEEKLY_DRIVE_MAX-(S.prevWeekDrv||0)))}/90:00`);
 doLog(`⚠ Telafi borcu: +${hm(deficit)} (45:00−${hm(rs)}) → Toplam borç: ${hm(S.weeklyDeficit)} | ${w3}. hafta sonuna kadar ≥9sa bir dinlemeye EKLENMELİ!`,'warn');

 /* Ardışık kısaltılmış uyarıları */
 if(S.reducedInRow===1){
 if(!S.hadFullWeeklyRest){
 doLog(`⚠ 1. ardışık kısaltılmış. Bu pencerede henüz tam (45sa) din. YOK.`,'warn');
 doLog(`ℹ Ulusal taşımada: sonraki haftalık din. MUTLAKA ≥45sa tam olmalı.`);
 doLog(`ℹ Uluslararası taşımada: 1 ardışık daha mümkün (2 kısaltılmış hakkı var).`);
 }
 } else if(S.reducedInRow>=2){
 doLog(`⚠⚠ 2 ARDARDA KISALTILMIş (Md.8/6a)! Uluslararası yük taşımacılığında yasal ama:`, 'warn');
 doLog(` → Bir sonraki haftalık din. MUTLAKA ≥45sa tam + tüm telafi borçları EKLENMELİ`);
 doLog(` → 4 ardışık haftada en az 2 tam (45sa+) zorunlu — takip et!`);
 doLog(` → Ulusal taşımada: 2 ardışık kısaltılmış YASAL İHLAL!`,'err');
 }
 if(S.reducedInRow>=3){
 doLog(`✗ 3+ ARDARDA KISALTILMIş — HEM ULUSAL HEM ULUSLARARASI İHLAL!`,'err');
 doLog(`✗ HEMEN ≥45sa tam haftalık dinlenme başlatılmalı + tüm telafi borçları EKLENMELİ!`,'err');
 }
 /* Araçta alınamaz uyarısı */
 doLog(`⚠ Telafi dinlenmesi ve 45sa+ tam haftalık din. ARAÇTA ALINAMAZ — uygun konaklama (yatak+sanitasyon) zorunlu. Masrafları işveren karşılar.`,'warn');

 } else if(rs>=45&&rs<1440){
 /* Günlük dinlenme bölgesi (45dk–24sa arası) — haftalık sayılmaz */
 doLog(`ℹ Dinlenme ${hm(rs)} — haftalık eşiğin altında, sadece günlük/mola sayılır.`);
 }

 if(rs<45&&rs>0){
 /* Bölünmüş mola kontrolü: 15dk–44dk arası → 1.bölüm olabilir */
 if(rs>=15&&!S.breakPart1Done&&mode==='driving'){
 S.breakPart1Done=true;
 S.breakPart1Min=rs;
 doLog(`→ Bölünmüş mola 1.bölüm kaydedildi: ${hm(rs)} (≥15dk ✓). Sürüşten sonra ≥30dk 2.bölüm alınmalı.`,'ok');
 } else if(rs<15&&!S.breakPart1Done){
 doLog(`⚠ Dinlenme ${hm(rs)} — 15dk'dan kısa! Mola GEÇERSİZ. Kesintisiz sürüş devam ediyor.`,'warn');
 } else if(S.breakPart1Done&&rs>=30&&mode==='driving'){
 /* 2.bölüm tamamlandı — ama bu advance() içinde de işleniyor, burada zaten sıfırlanmış olabilir */
 doLog(`✓ Bölünmüş mola tamamlandı: ${hm(S.breakPart1Min)} + ${hm(rs)} = ${hm(S.breakPart1Min+rs)}`,'ok');
 S.breakPart1Done=false; S.breakPart1Min=0;
 } else if(S.breakPart1Done&&rs<30){
 doLog(`⚠ Mola 2.bölümü ${hm(rs)} — 30dk'dan kısa! Bölünmüş mola GEÇERSİZ. Sürüş kesintisiz sayılıyor.`,'warn');
 S.breakPart1Done=false; S.breakPart1Min=0;
 }
 }
 if(!S.breakPart1Done) S.restSes=0;
 else S.restSes=0; /* Her durumda sıfırla — 2.bölüm için advance() içinde kontrol edilecek */
 }
 S.mode=mode;
 S._modeStart=S.simMin; /* UX: Mevcut modda geçen süre için */
 if(mode==='driving'){
 const t=68+Math.random()*38;S.speed=t;animSpd(t);
 /* Vardiya başlangıcı konum kaydı — önceden rest'teydik */
 if(prev==='rest' && (S.positionLog||[]).length===0) recordPosition('shift_start');
 } else {
 S.speed=0;animSpd(0);
 /* Yükleme/boşaltma konum kaydı */
 if(mode==='work' && (S.workSub==='loading'||S.workSub==='unloading'||S.workSub==='both')){
    const _wR=S.workSub==='unloading'?'unloading':'loading';
    recordPosition(_wR);
    if(S.cardGen==='G2V2') doLog('🚛 G2V2: '+(_wR==='loading'?'Yükleme':'Boşaltma')+' başladı | '+S.currentCountry+' | Yük:'+(S.cargoType||'?')+'','ok');
 }
 }
 document.querySelectorAll('.mhw').forEach(b=>b.classList.remove('on'));
 const map={driving:'btn-d',rest:'btn-r',work:'btn-w',available:'btn-a'};
 const b=document.getElementById(map[mode]||map['work']);
 if(b){b.classList.add('on');b.classList.add('pr');setTimeout(()=>b.classList.remove('pr'),130);}

 const mpMode=(mode==='work')?S.workSub:mode;
 updateMpict(mpMode);

 /* ── Pixel sahne değiştir ── */
 if(typeof window._pixelSetScene === 'function')
 window._pixelSetScene(mode==='work' ? S.workSub : mode);

 /* ── Mod geçiş animasyonları ── */
 _playModeAnimation(mode, prev);

 if(btn!==null){
 const wsub=WORK_SUBS[S.workSub];
 const lbl={driving:'SÜRÜŞ',rest:'DİNLENME',work:'DİĞER İŞ → '+(wsub?wsub.lbl:''),available:'UYGUNLUK'};
 doLog('Mod → '+lbl[mode]);
 }
 updateLCD();
}

/* ── Mod geçiş animasyon motoru ── */
function _playModeAnimation(mode, prevMode){
 if(typeof window.matchMedia === 'function' &&
 window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

 const bezel = document.querySelector('.lcd-bezel');
 const clock = document.querySelector('.lclk');
 const mpict = document.getElementById('mpict');
 const amd   = document.getElementById('active-mode-display');
 const lcd   = document.querySelector('.lcd');

 /* Önceki animasyon sınıflarını temizle */
 const animClasses = ['anim-drive','anim-rest','anim-break','anim-work','anim-available','anim-in','anim-drive','anim-rest'];
 const _clear = (el, classes) => { if(el) classes.forEach(c => el.classList.remove(c)); };
 _clear(bezel, animClasses);
 _clear(clock, ['anim-drive','anim-rest']);
 if(mpict) mpict.classList.remove('anim-pop');
 if(amd)   amd.classList.remove('anim-in');

 /* LCD border rengi */
 if(lcd){
 lcd.classList.remove('mode-driving','mode-rest','mode-work','mode-available');
 lcd.classList.add('mode-' + (mode==='work'?'work':mode));
 }

 /* Animasyon map */
 const animMap = {
 driving:  { bezel:'anim-drive',   clock:'anim-drive'  },
 rest:     { bezel:'anim-rest',    clock:'anim-rest'   },
 work:     { bezel:'anim-work',    clock:null           },
 available:{ bezel:'anim-available',clock:null          },
 };

 /* Sadece mola gerektiğinde (breakLeft=0) sarı flash */
 const effectiveMode = (mode==='rest' && prevMode==='driving' && (S.breakLeft<=0||S.contDrv>=CONT_DRIVE_LIMIT))
 ? 'break' : mode;
 const anim = animMap[mode] || {};
 const bezelAnim = effectiveMode === 'break' ? 'anim-break' : anim.bezel;

 /* requestAnimationFrame ile tetikle — CSS transition çakışmasını önler */
 requestAnimationFrame(() => {
 requestAnimationFrame(() => {
 if(bezel && bezelAnim) bezel.classList.add(bezelAnim);
 if(clock && anim.clock) clock.classList.add(anim.clock);
 if(mpict){ mpict.classList.add('anim-pop'); }
 if(amd){ amd.classList.add('anim-in'); }

 /* Sayaç kartı bump — hangi sayaç değişti */
 const bumpMap = {
 driving: ['c-d','c-c','c-b'],
 rest:    ['c-r'],
 work:    ['c-d'],
 available:['c-d'],
 };
 (bumpMap[mode]||[]).forEach(id => {
 const el = document.getElementById(id);
 if(!el) return;
 el.classList.remove('anim-bump');
 requestAnimationFrame(() => el.classList.add('anim-bump'));
 });

 /* Animasyon bitince sınıfları temizle */
 const cleanup = () => {
 _clear(bezel, animClasses);
 _clear(clock, ['anim-drive','anim-rest']);
 if(mpict) mpict.classList.remove('anim-pop');
 if(amd)   amd.classList.remove('anim-in');
 document.querySelectorAll('.cntval.anim-bump').forEach(el => el.classList.remove('anim-bump'));
 };
 setTimeout(cleanup, 1400);
 });
 });
}

/* ══════════════════════════════════════════════════════════
 PİXEL ANİMASYON MOTORU — 96×32 piksel LCD ekran
 Mod bazlı sahneler: Sürüş=tır, Dinlenme=uyuyan, İş=yükleme
══════════════════════════════════════════════════════════ */
(function(){
 const CV = document.getElementById('pixel-scene');
 if(!CV) return;
 const CTX = CV.getContext('2d');
 const W=96, H=32;
 let _f=0, _scene='rest', _pending=null;
 let _truckX=W+4, _roadOff=0, _wheelR=0;
 let _cloudX=[12,52,80], _starPh=0, _breathPh=0, _zzzPh=0;
 let _zzz=[], _puffs=[], _loadAng=0;
 let _fadeA=1, _fadingOut=false, _fadingIn=false;

 /* Fosfor yeşil LCD paleti */
 const C={
 bg:'#040802',     sky:'#06100a',    ground:'#0a1a06',
 road:'#0c1a09',   roadMk:'#163010', grass:'#0d1f07',
 trB:'#183c1c',    trC:'#22c55e',    trW:'#091e0a',
 trG:'#16a34a',    wh:'#0e2a0e',     whH:'#4ade80',
 exh:'#162e14',    star:'#274e27',   starB:'#4ade80',
 cld:'#182e18',    moon:'#2d5c30',   hu:'#22c55e',
 huD:'#16a34a',    zzz:'#86efac',    bed:'#0d1e0d',
 bedL:'#183818',   pil:'#1c381c',    crn:'#16a34a',
 box:'#182e16',    ph:'#0f2a10',
 };

 function px(x,y,c,s=1){ CTX.fillStyle=c; CTX.fillRect(Math.round(x),Math.round(y),s,s); }
 function rc(x,y,w,h,c){ CTX.fillStyle=c; CTX.fillRect(Math.round(x),Math.round(y),w,h); }

 function drawDriving(){
 const spd=typeof S!=='undefined'?(S.speed||0):80;
 const vx=-(0.8+spd/100);
 _roadOff=(_roadOff-vx*2+200)%200; _wheelR+=Math.abs(vx)*0.18;
 _truckX+=vx; if(_truckX<-46) _truckX=W+4;
 rc(0,0,W,20,C.sky);
 /* Yıldızlar */
 const nStar=Math.max(0,6-Math.floor(spd/20));
 for(let i=0;i<nStar;i++){
 const br=Math.sin(_starPh+i*1.4)>0.2;
 px((i*29+7)%W,(i*11+2)%12,br?C.starB:C.star);
 }
 /* Ay */
 rc(81,3,3,1,C.moon); rc(80,4,5,2,C.moon); rc(81,6,3,1,C.moon); px(83,4,C.sky,2);
 /* Bulutlar */
 if(spd>40) _cloudX=_cloudX.map((cx,i)=>{
 const nx=(cx+Math.abs(vx)*0.25+W+20)%(W+24)-4;
 rc(nx,3+(i%3)*3,10,2,C.cld); rc(nx+2,2+(i%3)*3,6,1,C.cld);
 return nx;
 });
 /* Zemin */
 rc(0,20,W,5,C.ground); rc(0,20,W,1,C.grass); rc(0,25,W,7,C.road);
 /* Yol çizgileri */
 for(let i=-1;i<5;i++) rc((i*24+_roadOff)%(W+24)-12,26,10,1,C.roadMk);
 /* Egzoz — kabin arkasından çıkıyor, sağa doğru dağılıyor */
 if(_f%5===0&&spd>10) _puffs.push({x:_truckX+13,y:19,a:.8,r:1.2});
 _puffs=_puffs.filter(p=>p.a>.05);
 _puffs.forEach(p=>{ p.x+=.35;p.y-=.25;p.a*=.87;p.r+=.08;
 CTX.globalAlpha=p.a*.5; rc(p.x,p.y,p.r,p.r,C.exh); CTX.globalAlpha=1; });
 /* Tır — kabin SOLDA (ön), dorse SAĞDA (arka) — sola gidiyor */
 const t=_truckX;
 /* Kabin */
 rc(t,21,13,7,C.trC);      /* kabin gövde */
 rc(t+2,22,5,3,C.trG);     /* ön cam — solda */
 px(t,25,C.starB,2);        /* ön far */
 rc(t+11,20,2,2,C.trG);    /* egzoz borusu — kabin arka üstü */
 /* Dorse */
 rc(t+13,21,29,7,C.trB);
 rc(t+20,22,1,5,C.trG);    /* dorse çizgi */
 rc(t+29,22,1,5,C.trG);
 /* Tekerlekler: ön=sol, arka=sağ */
 [t+2, t+21, t+30].forEach(wx=>{
 rc(wx,27,6,4,C.wh);
 const a=_wheelR;
 px(wx+3+Math.round(Math.cos(a)*2),29+Math.round(Math.sin(a)*1.5),C.whH);
 px(wx+3,29,C.whH);
 });
 _starPh+=.07;
 }

 function drawResting(){
 _breathPh+=.035; _zzzPh+=.025;
 rc(0,0,W,H,C.sky);
 [[8,3],[22,6],[36,2],[52,5],[66,3],[80,7],[91,4],[14,9],[44,8],[70,2],[88,9]]
 .forEach(([sx,sy],i)=>px(sx,sy,Math.sin(_zzzPh*.7+i*.9)>.2?C.starB:C.star));
 /* Ay */
 rc(82,3,4,1,C.moon);rc(80,4,1,3,C.moon);rc(85,4,1,3,C.moon);rc(82,7,4,1,C.moon);px(84,4,C.sky,2);
 rc(0,22,W,10,C.ground);
 /* Karyola */
 rc(8,20,58,3,C.bedL); rc(7,19,2,6,C.bed); rc(65,19,2,6,C.bed);
 rc(8,22,58,1,C.bedL);
 /* Yastık */ rc(9,17,11,4,C.pil); rc(10,16,9,1,C.pil);
 /* İnsan */
 const bs=Math.round(Math.sin(_breathPh)*.4);
 rc(11,15+bs,6,5,C.hu); /* baş */
 px(12,16+bs,C.huD,2); px(12,18+bs,C.huD); px(14,18+bs,C.huD); /* yüz */
 rc(17,18+bs,44,3,C.huD); /* vücut */
 rc(18,19+bs,42,2,C.bedL); /* battaniye */
 /* ZZZ */
 if(_f%28===0) _zzz.push({x:20,y:13,a:1,l:55,s:0});
 _zzz=_zzz.filter(z=>z.l>0);
 _zzz.forEach(z=>{ z.x+=.2;z.y-=.15;z.a=z.l/55;z.l--;z.s=Math.min(3,z.s+.04);
 CTX.globalAlpha=z.a*.9; CTX.fillStyle=C.zzz;
 CTX.font=`bold ${Math.round(4+z.s)}px monospace`;
 CTX.fillText('z',Math.round(z.x),Math.round(z.y)); CTX.globalAlpha=1;
 });
 /* Pencere */
 rc(76,8,14,12,C.sky); rc(77,9,12,10,C.road); rc(83,9,1,10,C.sky); rc(77,14,12,1,C.sky);
 CTX.globalAlpha=.25+Math.sin(_zzzPh)*.08; rc(76,20,14,3,C.moon); CTX.globalAlpha=1;
 }

 function drawWorking(){
 _loadAng+=.055;
 rc(0,0,W,H,C.sky);
 rc(0,22,W,10,C.ground); rc(0,22,W,1,C.grass);
 /* Kamyon */
 rc(44,16,22,7,C.trB); rc(65,17,12,6,C.trC); rc(66,18,5,3,C.trG);
 px(75,21,C.starB,2); [46,54,66].forEach(wx=>rc(wx,22,5,3,C.wh));
 /* Vinç tabanı */
 rc(22,15,18,7,C.crn); rc(23,21,5,3,C.wh); rc(33,21,5,3,C.wh);
 /* Kol */
 const ca=Math.sin(_loadAng*.4)*.18;
 CTX.save(); CTX.translate(30,15); CTX.rotate(ca);
 rc(-1,-12,2,12,C.crn);
 const rl=5+Math.sin(_loadAng)*2;
 rc(0,-12,1,Math.round(rl),C.crn);
 rc(-3,-12+Math.round(rl),6,4,C.box); rc(-2,-11+Math.round(rl),4,2,C.crn);
 CTX.restore();
 /* İşçi */
 const ay=Math.round(Math.sin(_loadAng*.8)*1.5);
 rc(11,16,4,5,C.hu); rc(12,14,3,3,C.hu);
 px(13,15,C.huD); px(15,15,C.huD);
 rc(10,17+ay,2,1,C.hu); rc(15,17-ay,2,1,C.hu);
 rc(12,21,2,2,C.huD); rc(14,21,2,2,C.huD);
 /* Kutular */
 [[3,19],[9,19],[15,19]].forEach(([bx,by])=>{ rc(bx,by,5,3,C.box); rc(bx+1,by+1,3,1,C.crn); });
 /* Yıldızlar */
 [[86,3],[91,7],[78,5]].forEach(([sx,sy],i)=>px(sx,sy,Math.sin(_loadAng*.5+i)>0?C.starB:C.star));
 }

 function drawAvailable(){
 _breathPh+=.022;
 rc(0,0,W,H,C.sky);
 rc(0,22,W,10,C.ground); rc(0,22,W,2,C.grass);
 /* Yıldızlar */
 [[10,4],[26,7],[46,3],[72,5],[90,4]].forEach(([sx,sy],i)=>
 px(sx,sy,Math.sin(_breathPh*.8+i*1.3)>.1?C.starB:C.star));
 /* Park halindeki araç */
 rc(58,16,22,7,C.trC); rc(60,14,13,4,C.trB); rc(61,15,5,3,C.trG);
 if(Math.sin(_breathPh*3)>0) px(58,19,C.starB,2);
 [60,72].forEach(wx=>rc(wx,22,5,3,C.wh));
 /* Oturan kişi — yan görünüm */
 const hb=Math.round(Math.sin(_breathPh)*.6);
 const mx=32;
 /* Sandalye */
 rc(mx-2,mx>0?22:22,16,1,C.bed); rc(mx-2,17,1,5,C.bed); rc(mx+13,17,1,5,C.bed);
 rc(mx-2,17,15,1,C.bed);
 /* Gövde */
 rc(mx+3,15,5,6,C.hu);
 /* Baş */
 rc(mx+4,12+hb,4,4,C.hu);
 px(mx+5,13+hb,C.huD); px(mx+7,13+hb,C.huD); /* gözler */
 /* Kollar */
 rc(mx+2,16,2,3,C.hu); rc(mx+8,16,2,3,C.hu);
 /* Bacaklar */
 rc(mx+3,21,2,2,C.huD); rc(mx+6,21,2,2,C.huD);
 /* Telefon */
 rc(mx+1,17,3,4,C.ph); px(mx+2,18,C.trG); /* ekran */
 if(Math.sin(_breathPh*4)>0) px(mx+2,18,C.starB); /* bildirim */
 }

 function fadeToScene(sc){
 if(_pending===sc||(_scene===sc&&!_fadingOut&&!_fadingIn)) return;
 _pending=sc; _fadingOut=true; _fadingIn=false;
 }

 window._pixelSetScene=function(mode){
 const map={driving:'driving',rest:'rest',work:'work',
 loading:'work',unloading:'work',otherwork:'work',both:'work',available:'available'};
 fadeToScene(map[mode]||'rest');
 };

 if(window.matchMedia('(prefers-reduced-motion:reduce)').matches){
 CTX.fillStyle=C.bg; CTX.fillRect(0,0,W,H);
 CTX.fillStyle=C.starB; CTX.font='4px monospace'; CTX.fillText('REST',38,18);
 return;
 }

 (function loop(){
 _f++;
 if(_fadingOut){ _fadeA-=.12; if(_fadeA<=0){ _fadeA=0; _fadingOut=false; _fadingIn=true; _scene=_pending; _pending=null;
 if(_scene==='driving') _truckX=W+4;
 if(_scene==='rest') _zzz=[]; }}
 else if(_fadingIn){ _fadeA+=.12; if(_fadeA>=1){ _fadeA=1; _fadingIn=false; }}
 CTX.fillStyle=C.bg; CTX.fillRect(0,0,W,H);
 CTX.globalAlpha=_fadeA;
 if(_scene==='driving') drawDriving();
 else if(_scene==='rest') drawResting();
 else if(_scene==='work') drawWorking();
 else drawAvailable();
 /* Tarama çizgisi efekti */
 CTX.globalAlpha=.07; CTX.fillStyle='#000';
 for(let y=0;y<H;y+=2) CTX.fillRect(0,y,W,1);
 CTX.globalAlpha=1;
 requestAnimationFrame(loop);
 })();
})();
/* ZAMAN İLERLET */
const MAX_SIM_MIN = 20160; /* 14 gün — simülasyon limiti */
/* ── advance() yardımcıları — Cyclomatic Complexity azaltma ── */

/** Sürüş limitlerini kontrol et. true = bloke. */
function _checkDrivingLimits(){
 if(S.mode !== 'driving') return false;
 const dailyOver = S.dailyDrv >= S.dailyMax;
 const contOver  = S.breakLeft <= 0 || S.contDrv >= CONT_DRIVE_LIMIT;
 const weekOver  = (S.weeklyDrv||0) >= getWeeklyMax();
 const biweekOver= ((S.weeklyDrv||0)+(S.prevWeekDrv||0)) >= BIWEEKLY_DRIVE_MAX;
 if(!(dailyOver || contOver || weekOver || biweekOver)) return false;

 if(dailyOver){
 doLog('⛔ Günlük sürüş limiti doldu — Günlük dinlenme gerekli.','err');
 triggerWarning('Günlük Limit Doldu',
 `${hm(S.dailyMax)} günlük sürüş tamamlandı. Min ${(!window._ktyMode&&S.useReducedRest)?'9':'11'}sa dinlenme alın.`,
 'event');
 } else if(contOver){
 doLog('⛔ 4:30 kesintisiz sürüş doldu — 45dk mola zorunlu.','err');
 triggerWarning('Mola Zorunlu','Kesintisiz sürüş sınırı: 4:30. Sürüşe devam için 45dk mola alın.','event');
 } else {
 doLog('⛔ Sürüş limiti dolmuş — dinlenme gerekli.','err');
 triggerWarning('Sürüş Yapılamaz','Limit doldu. DİNLENME modunu seçin.','event');
 }
 return true;
}

/** Sürüş sayaçlarını güncelle (dailyDrv, contDrv, weeklyDrv vb.) */
function _advanceDrivingCounters(minutes){
 S.dailyDrv = (S.dailyDrv||0) + minutes;
 S.contDrv  = (S.contDrv||0)  + minutes;
 S.weeklyDrv= (S.weeklyDrv||0)+ minutes;
 S.breakLeft= Math.max(0, (S.breakLeft||CONT_DRIVE_LIMIT) - minutes);
}

function advance(minutes){
 minutes=Math.round(Number(minutes)); /* float/NaN → tam sayı */
 if(!isFinite(minutes)||minutes<=0)return;
 /* Simülasyon zaman aşımı koruması */
 if(S.simMin>=MAX_SIM_MIN){
 doLog('⚠ Simülasyon 14 gün limitine ulaştı. Sıfırla veya Yeni Gün\'e bas.','warn');
 return;
 }
 minutes=Math.min(minutes, MAX_SIM_MIN-S.simMin);
 /* ── Limit aşımında sürüşü engelle (otomatik geçiş YOK — sürücü seçer) ── */
 if(_checkDrivingLimits()) return;
 /* ── Kartsız sürüş kontrolü ── */
 if(S.mode==='driving' && (S.card1Type===null||S.card1Type===undefined)){
 triggerWarning('! Kartsız sürüş','Geçerli sürücü kartı olmadan sürüş. — Günlük çıktı alın, el yazısıyla kayıt tutun. Max 15 takvim günü.','event');
 }
 /* Çok günlü TL: allSegs'e mutlak simMin ile kaydet */
 if(!S.allSegs) S.allSegs=[];
 const newSeg={startMin:S.simMin,dur:minutes,mode:S.mode};
 if(S.mode==='work') newSeg.workSub=S.workSub;
 S.allSegs.push(newSeg);
 /* allSegs bellek yönetimi: 14 günden (20160dk = 14×1440) eski segs'leri temizle */
 const _cutoff = S.simMin - (14 * 1440);
 if(S.allSegs.length > 500 && _cutoff > 0){
 S.allSegs = S.allSegs.filter(s => (s.startMin + s.dur) > _cutoff);
 }
 /* Tek günlük eski segs (uyumluluk) — SIM_START bazlı abs hesabı */
 const simStartHour = SIM_START.getHours()*60 + SIM_START.getMinutes();
 const absStart = simStartHour + (S.simMin - S.dayBase);
 const seg={abs:Math.max(0,absStart),dur:minutes,mode:S.mode};
 if(S.mode==='work')seg.workSub=S.workSub;
 S.segs.push(seg);

 /* K1/K2: Sürüş limitlerini ÖNCE kontrol et — fazla süreyi kes (simMin artırmadan) */
 if(S.mode==='driving'){
 const dynMaxChk = getWeeklyMax(); /* Dinamik 34-56sa (2040-3360dk) */
 const biWeekChk = (S.weeklyDrv||0)+(S.prevWeekDrv||0);
 const remDaily = Math.max(0, S.dailyMax - S.dailyDrv);
 const remCont = Math.max(0, CONT_DRIVE_LIMIT - S.contDrv);
 const remWeekly = Math.max(0, dynMaxChk - (S.weeklyDrv||0));
 const remBiWeek = Math.max(0, BIWEEKLY_DRIVE_MAX - biWeekChk);
 const remAll = Math.min(remDaily, remCont, remWeekly, remBiWeek);
 if(remAll <= 0){
 doLog('⛔ Sürüş limiti dolmuş — dinlenme gerekli.','err');
 triggerWarning('Sürüş Limiti Doldu','Tüm sürüş limitleri tükendi. Dinlenme moduna geçin.','event');
 return;
 }
 if(minutes > remAll){
 minutes = remAll;
 if(S.allSegs?.length) S.allSegs[S.allSegs.length-1].dur = minutes;
 if(S.segs?.length) S.segs[S.segs.length-1].dur = minutes;
 }
 if(minutes >= remAll && remAll > 0){
 setTimeout(()=>{ if(S.mode==='driving'){ doLog('⛔ Sürüş limiti doldu — dinlenme gerekli.','err'); triggerWarning('Sürüş Limiti Doldu','Sürüş limiti tükendi. Dinlenme moduna geçin.','event'); }},0);
 }
 }

 /* simMin artır — limit kırpması tamamlandıktan SONRA */
 const _prevSimMin = S.simMin;
 S.simMin+=minutes;
 /* Takvim günü geçişi — simDay otomatik artır */
 const _prevDayMs = new Date(SIM_START.getTime() + _prevSimMin*60000);
 const _newDayMs  = new Date(SIM_START.getTime() + S.simMin*60000);
 if(_newDayMs.getDate() !== _prevDayMs.getDate() ||
    _newDayMs.getMonth() !== _prevDayMs.getMonth()){
  S.simDay = (S.simDay||0) + 1;
 }
 /* S1-1: Takvim haftası Pazartesi geçişi kontrolü */
 checkWeekRollover(_prevSimMin, S.simMin);
 /* Haftalık limit uyarısı */
 const _wkMax = getWeeklyMax();
 if(S.weeklyDrv > _wkMax && S.weeklyDrv-minutes <= _wkMax){
 triggerWarning(
 'Haftalık Limit!',
 `Haftalık sürüş limiti doldu: ${hm(_wkMax)}. Haftalık dinlenme zorunlu. AB 561/2006 / AETR Md.6`,
 'event'
 );
 doLog(`✗ Haftalık ${hm(_wkMax)} sınırı aşıldı!`,'err');
 }

 if(S.mode==='driving'){
 S.dailyDrv+=minutes;
 S.contDrv+=minutes;
 S.weeklyDrv+=minutes;
 if(S.wtdEnabled){ S.wtdWeeklyWork=(S.wtdWeeklyWork||0)+minutes; S.wtdDailyWork=(S.wtdDailyWork||0)+minutes; }
 S.breakLeft=Math.max(0,S.breakLeft-minutes);
 S.odo+=Math.round((S.speed||74)/60*minutes);
 S.speed=Math.max(58,Math.min(118,S.speed+(Math.random()-.5)*14));
 const sv=document.getElementById('lspd');const sf=document.getElementById('spdf');
 if(sv)sv.textContent=String(Math.round(S.speed)).padStart(3,'0');
 if(sf)sf.style.width=Math.min(100,S.speed/130*100)+'%';
 /* Hız sınırı kontrolü */
 checkSpeedLimit();
 /* GNSS sinyal kontrolü */
 checkGNSSStatus();
 /* G2V2 konum kaydı — 3sa kümülatif sürüş */
 checkPositionRecord(minutes);
 /* Kabotaj riski kontrolü 1072/2009 */
 if(S.simMin % 480 === 0) checkCabotageRisk();
 const dur=minutes>=60?`${Math.floor(minutes/60)}s${minutes%60>0?minutes%60+'dk':''}`:`${minutes}dk`;
 const extLbl=S.dailyMax===600?' [UZATILMIŞ 10sa]':'';
 doLog(`Sürüş${extLbl} +${dur} | Günlük: ${hm(S.dailyDrv)}/${hm(S.dailyMax)} | Kesintisiz: ${hm(S.contDrv)} | Mola: ${hm(S.breakLeft)} | ${Math.round(S.speed)}km/h`);
 if(S.breakLeft===0)doLog('✗ MOLA ZAMANI DOLDU! Araç hemen durdurulmalı!','err');
 else if(S.breakLeft<=30&&S.breakLeft+minutes>30)doLog('⚠ Mola hakkı 30 dk kaldı!','warn');
 if(S.contDrv>270){doLog('✗ KESİNTİSİZ SÜRÜŞ AŞILDI (max 4:30)!','err');triggerWarning('1 Mola! 04h30','Sürüş süresi aşıldı. 04:30 kesintisiz sürüş. — HEMEN MOLA VERİN!','event');}
 else if(S.contDrv>=255&&S.contDrv-minutes<255){doLog('⚠ KESİNTİSİZ SÜRÜŞ 4:15! — Kısa süre içinde mola verin. Maks. 4:30.','warn');triggerWarning('1 Mola! 04h15','Mola verin. 04:15 kesintisiz sürüş. Kısa süre içinde mola planlayın. ','event');}
 else if(S.contDrv>=240&&S.contDrv-minutes<240)doLog('⚠ Kesintisiz sürüş 4 saat geçti — 15 dakika içinde uyarı gelecek.','warn');
 /* Günlük limit */
 if(S.dailyDrv>=S.dailyMax && S.dailyDrv-minutes<S.dailyMax){
 doLog(`✗ GÜNLÜK ${hm(S.dailyMax)} SINIRI DOLDU — Dinlenme gerekli.`,'err');
 triggerWarning(
 `Günlük ${hm(S.dailyMax)} Doldu`,
 `Günlük ${hm(S.dailyMax)} sürüş tamamlandı. AB 561/2006 Md.8: Min 9sa dinlenme zorunlu. Sürüş YASAK.`,
 'event'
 );
 } else if(S.dailyDrv>480&&S.dailyDrv-minutes<=480){
 if(S.dailyMax===600)doLog('→ 8sa geçildi — uzatılmış 10sa modu aktif (2sa kaldı)','ok');
 else doLog('⚠ Günlük 9sa limitine 1 saat kaldı — dinlenme planlamaya başlayın.','warn');
 } else if(S.dailyDrv>=S.dailyMax-30 && S.dailyDrv-minutes<S.dailyMax-30){
 /* 30dk kala son uyarı */
 doLog(`⚠ Günlük ${hm(S.dailyMax)} limitine 30 dakika kaldı — dinlenme planlayın.`,'warn');
 }
 /* ── 9sa limitine 30dk kala: 10sa uzatma teklifi ── */
 /* 9sa limitine 30dk kala uzatma teklifi göster — kural değil hatırlatma */
 if(S.dailyDrv>=510 && S.dailyDrv-minutes<510 && S.dailyMax===540 && S.extDayCount<2){
 doLog(`ℹ Günlük 9sa limitine 30 dk kaldı. Uzatma hakkınız var (${2-S.extDayCount}/2) — şimdi aktifleştirirseniz 10sa sürebilirsiniz.`,'ok');
 _showExtensionOffer();
 }
 /* Haftalık 56sa limiti */
 const dynMax = getWeeklyMax();
 if(S.weeklyDrv>dynMax){
 doLog(`✗ HAFTALIK ${hm(dynMax)} SINIRI AŞILDI!`,'err');
 triggerWarning('Haftalık Limit!','Haftalık '+hm(dynMax)+' sürüş sınırı doldu! Dinlenme başlatın. AB 561/2006 Md.6','event');
 }
 else if(S.weeklyDrv>=dynMax-60&&S.weeklyDrv-minutes<dynMax-60) doLog(`⚠ Haftalık ${hm(dynMax)} limitine 1 saat kaldı.`,'warn');
 /* ── 2 haftalık 90sa kontrolü ── */
 const biWeek=(S.weeklyDrv)+(S.prevWeekDrv||0);
 if(biWeek>5400){
 doLog(`✗ 2 HAFTALIK 90 SAAT SINIRI AŞILDI! (${hm(biWeek)})`, 'err');
 triggerWarning('2 Haftalık 90sa Aşıldı',`İki haftalık toplam ${hm(biWeek)} — 90sa sınırı aşıldı! Haftalık dinlenme zorunlu.`,'event');
 }
 else if(biWeek>=5040&&biWeek-minutes<5040)doLog(`⚠ 2 haftalık 90sa limitine yaklaşıldı: ${hm(biWeek)}/90:00`,'warn');
 /* ── 6×24sa periyot kontrolü: son haftalık dinlenmeden itibaren 144sa geçti mi? ── */
 const sinceLastWeeklyRest=S.simMin-S.lastWeeklyRestMin;
 if(sinceLastWeeklyRest>8640-120&&sinceLastWeeklyRest-minutes<=8640-120)
 doLog('⚠ Son haftalık dinlenmeden 142sa geçti — 2 saat içinde haftalık dinlenme ZORUNLU!','warn');
 if(sinceLastWeeklyRest>8640)doLog('✗ 6×24sa PERİYOT AŞILDI! Haftalık dinlenme başlatılmalı!','err');
 /* ── 24sa günlük pencere kontrolü ── */
 /* S1-5: Çift sürücü 1sa istisnası bitiş kontrolü */
 if(S.doubleDriver && S.doubleDriverException && S.simMin >= S.doubleDriverExceptionEnd){
 S.doubleDriverException = false;
 doLog('👥 Çift sürücü: 1sa istisnası sona erdi — her iki sürücü artık araçta olmalı. ');
 document.getElementById('dd-exception-tag')?.remove();
 }
 /* S1-2: 24sa pencere — referans: önceki günlük dinlenmenin SONU (AB 561/2006 Md.8) */
 const since24 = S.simMin - (S.lastDailyRestEnd||0);
 if(S.doubleDriver){
 /* Çift sürücü: 30sa pencere (1800dk) */
 if(since24 > 1800-120 && since24-minutes <= 1800-120)
 doLog(`⚠ ÇİFT SÜRÜCÜ: 30sa pencereye 2sa kaldı — 9sa dinlenme başlatın. (${hm(since24)} geçti)`,'warn');
 if(since24 > 1800 && since24-minutes <= 1800)
 doLog(`✗ ÇİFT SÜRÜCÜ: 30sa PERİYOT AŞILDI! (${hm(since24)} — ref: son dinlenme sonu) `,'err');
 } else {
 /* Tek sürücü: 24sa pencere — son günlük dinlenme sonundan itibaren */
 const window24 = 1440;
 if(since24 > window24-120 && since24-minutes <= window24-120)
 doLog(`⚠ Günlük dinlenme penceresine 2sa kaldı (${hm(since24)} geçti, pencere: ${hm(window24)}). `,'warn');
 if(since24 > window24-30 && since24-minutes <= window24-30)
 doLog(`⚠ 30dk içinde yeni günlük dinlenme başlatın! (son din.den ${hm(since24)} geçti)`,'err');
 if(since24 > window24 && since24-minutes <= window24)
 doLog(`✗ 24sa GÜNLÜK DİNLENME PENCERESİ AŞILDI! (${hm(since24)} geçti — ref: son din. sonu). `,'err');
 }

 }else if(S.mode==='rest'){
 const prev=S.restSes;
 S.restSes+=minutes;
 S.restDayAcc=Math.max(0,(S.restDayAcc||0)+minutes);
 /* Feribot modunda dinlenme oturumu bitmeden ferry süresi sayılır */
 if(S.ferryMode){
 S.ferryMin=(S.ferryMin||0)+minutes;
 doLog(`⛴ Feribot +${minutes}dk | Toplam: ${hm(S.ferryMin)} | Din. oturumu: ${hm(S.restSes)}`);
 } else {
 /* Eşik uyarıları */
 const dinExtra = [];
 if(prev<45 && S.restSes>=45) dinExtra.push('✓ 45dk mola tamam');
 if(prev<540 && S.restSes>=540) dinExtra.push('✓ 9sa kısaltılmış günlük din. tamam');
 if(prev<660 && S.restSes>=DAILY_REST_FULL) dinExtra.push('✓ 11sa tam günlük din. tamam');
 if(prev<1440&& S.restSes>=1440) dinExtra.push(`ℹ 24sa eşiği geçildi — kısaltılmış haftalık bölgesi. Çıkarsan ${hm(2700-S.restSes)} telafi borcu.`);
 const extra = dinExtra.length>0?' | '+dinExtra.join(' | '):'';
 doLog(`Dinlenme +${minutes}dk | Oturum: ${hm(S.restSes)} | Günlük top: ${hm(S.restDayAcc)}${extra}`);
 }
 /* ── 45sa (2700dk) TAM HAFTALIK DİNLENME eşiği — advance() içinde ── */
 if(prev<2700 && S.restSes>=2700){
 S.prevWeekDrv=S.weeklyDrv;
 S.weeklyDrv=0;
 S.dailyDrv=0; S.contDrv=0;
 S.breakLeft=270; S.dailyMax=540;
 S.extDayCount=0;
 if(window._extHistory) window._extHistory=[];
 /* splitRestCount: 2 ardışık periyot sonunda sıfırla */
 S.weeklyRestCount=(S.weeklyRestCount||0)+1;
 if(S.weeklyRestCount>=2){
 S.splitRestCount=0;
 S.weeklyRestCount=0;
 doLog('ℹ 2 haftalık periyot tamamlandı — 9sa kısaltılmış hak sıfırlandı (yeni periyot: 3 hak).','ok');
 }
 /* S1-3: Telafi borcu hafta sayacı */
 if((S.weeklyDeficit||0) > 0){
 S.weeklyDeficitWeeks = (S.weeklyDeficitWeeks||0) + 1;
 if(S.weeklyDeficitWeeks >= 3){
 triggerWarning(
 '⚠ Telafi Borcu 3 Haftayı Aştı!',
 `Telafi borcu ${hm(S.weeklyDeficit)} — 3 hafta içinde kapatılması zorunlu. ` +
 `Sonraki haftalık dinlenmeye en az ${hm(S.weeklyDeficit)} eklenmeli. ` +
 `Bugüne kadar ${S.weeklyDeficitWeeks} hafta geçti.`,
 'event'
 );
 doLog(`✗ TELAFİ BORCU 3 HAFTAYI GEÇTİ! Borç: ${hm(S.weeklyDeficit)} — acil kapatın! `,'err');
 } else {
 doLog(`⚠ Telafi borcu: ${hm(S.weeklyDeficit)} — ${3-S.weeklyDeficitWeeks} hafta kaldı. `,'warn');
 }
 } else {
 S.weeklyDeficitWeeks = 0; /* Borç ödendiyse sayacı sıfırla */
 }
 S.hadFullWeeklyRest=true;
 S.reducedInRow=0;
 S.lastWeeklyRestMin=S.simMin;
 /* Telafi borcu ödendi mi? */
 if(S.weeklyDeficit>0){
 const toplamDin=S.restSes;
 const gerekli=2700+S.weeklyDeficit;
 if(toplamDin>=gerekli){
 doLog(`✓ 45sa+ TAM HAFTALIK DİNLENME + Telafi borcu (${hm(S.weeklyDeficit)}) tamamen ödendi!`,'ok');
 S.weeklyDeficit=0;
 } else {
 doLog(`✓ 45sa geçildi — ⚠ Telafi borcu için ${hm(gerekli-toplamDin)} daha gerekli (toplamda ${hm(gerekli)}).`,'warn');
 }
 } else {
 const dynM=getWeeklyMax();
 doLog(`✓ 45sa TAM HAFTALIK DİNLENME tamamlandı! Yeni hafta: max ${hm(dynM)} sürüş.`,'ok');
 /* S2-5: Profil haftalık geçmişe kaydet */
 saveWeekToProfile();
 }
 }
 /* ── 24sa (1440dk) KISALTILMIş HAFTALIK eşiği uyarısı ── */
 if(prev<1440 && S.restSes>=1440){
 const deficit=2700-Math.min(S.restSes,2700);
 doLog(`ℹ 24sa kısaltılmış haftalık eşiğine ulaşıldı. Devam edilirse tam (45sa) olur. Şimdi çıkarsan ${hm(deficit)} telafi borcu.`);
 }

 /* ════════════════════════════════════════════════════════════ */

 /* ── BÖLÜNMÜŞ MOLA: 15dk 1. BÖLÜM ──
 / AB 561/2006 Md.7: Mola 15dk+30dk olarak bölünebilir.
 1. bölüm ≥15dk alındıysa ve araya sürüş girerse breakPart1Done=true olur.
 Sürüş moduna geçerken bu kontrol yapılır (setMode içinde). */
 if(prev<15&&S.restSes>=15&&!S.breakPart1Done&&S.restSes<45){
 S.breakPart1Min = S.restSes;
 doLog(`→ Mola 1.bölüm: ${hm(S.restSes)} (≥15dk ✓) — Sürüşe devam edilebilir, ardından ≥30dk 2.bölüm gerekli.`,'ok');
 }

 /* ── 30dk 2. BÖLÜM (bölünmüş mola tamamlandı) ── */
 if(S.breakPart1Done&&prev<30&&S.restSes>=30){
 if(S.dailyDrv >= S.dailyMax){
 doLog('ℹ Bölünmüş mola tamamlandı (15+30dk) ama günlük '+hm(S.dailyMax)+' limit dolmuş. Günlük dinlenme gerekli.','warn');
 S.contDrv=0; S.breakLeft=0;
 S.breakPart1Done=false; S.breakPart1Min=0;
 } else {
 S.contDrv=0;
 S.breakLeft=270;
 S.breakPart1Done=false;
 S.breakPart1Min=0;
 doLog('✓ BÖLÜNMÜŞ MOLA tamamlandı (15dk + 30dk) → Kesintisiz sayaç sıfırlandı. Sürüşe devam edilebilir.','ok');
 }
 }

 /* ── S1-4: HAFİF ARAÇ MOLA KONTROLÜ (2.5-3.5t) — 6sa/30dk ── */
 if(S.lightVehicleMode && S.mode==='driving'){
 const lvContDrv = S.contDrv; /* kesintisiz sürüş (mevcut) */
 const LV_MAX = 360; /* 6sa = 360dk */
 const LV_BREAK = 30; /* min 30dk mola */
 if(lvContDrv > LV_MAX && lvContDrv-minutes <= LV_MAX){
 doLog(`✗ HAFİF ARAÇ: 6sa kesintisiz sürüş doldu. Min 30dk mola zorunlu!`,'err');
 triggerWarning('Hafif Araç 6sa Doldu','6 saatlik kesintisiz sürüş tamamlandı. Min 30 dakika mola alın. AB 561/2006 ','event');
 }
 if(lvContDrv > LV_MAX-30 && lvContDrv-minutes <= LV_MAX-30)
 doLog(`⚠ HAFİF ARAÇ: 30dk içinde 6sa dolacak — mola planla`,'warn');
 }
 /* ── HAFİF ARAÇ: 30dk mola sıfırlaması ── */
 if(S.lightVehicleMode && S.mode!=='driving' && S.contDrv>360){
 const lvPrev = S.restSes - minutes;
 if(lvPrev < 30 && S.restSes >= 30){
 S.contDrv = 0; /* Kesintisiz sürüş sıfırla */
 doLog(`✓ HAFİF ARAÇ: 30dk mola tamamlandı — kesintisiz sayaç sıfırlandı. Sürüşe devam edilebilir.`,'ok');
 }
 }
 /* ── 45dk TEK BLOK MOLA eşiği ── */
 if(!S.breakPart1Done&&prev<45&&S.restSes>=45){
 if(S.dailyDrv >= S.dailyMax){
 /* Günlük limit dolmuş — 45dk mola günlük sürüşü sıfırlamaz, dinlenme gerekli */
 doLog('ℹ 45dk mola alındı ancak günlük '+hm(S.dailyMax)+' sürüş doldu. Günlük dinlenme (min 9sa) gerekli — 45dk mola yeterli değil.','warn');
 triggerWarning(
 'Günlük Din. Gerekli',
 '45dk mola tamamlandı ama günlük '+hm(S.dailyMax)+' sürüş dolmuş. '+
 'AB 561/2006 Md.8: Günlük dinlenme (min 9sa kısaltılmış veya 11sa tam) alınmadan sürüş başlatılamaz.',
 'usage'
 );
 /* Kesintisiz sayacı sıfırla — ama günlük limit hâlâ dolmuş */
 S.contDrv=0;
 S.breakLeft=0; /* Mola hakkı yok — günlük limit aşıldı */
 } else {
 S.contDrv=0;
 S.breakLeft=270;
 S.breakPart1Done=false;
 S.breakPart1Min=0;
 doLog('✓ 45dk tek blok mola tamamlandı → Kesintisiz sayaç sıfırlandı. Sürüşe devam edilebilir.','ok');
 }
 }

 /* ── Bölünmüş günlük dinlenme: 3sa 1.bölüm (180dk) ── */
 if(prev<180&&S.restSes>=180&&S.restSes<540){
 doLog('→ Bölünmüş din. 1.bölümü (3sa) ✓ Aktivite alınabilir, sonra ≥9sa 2.bölüm gerekli.','ok');
 }

 /* ── 9sa KISALTILMIş GÜNLÜK DİNLENME (540dk = 9 saat) ──
 • Günlük sayaçları sıfırlar
 • İki haftalık periyotta max 3× kullanılabilir (haftaya göre değil periyoda göre)
 • TELAFİ GEREKMİYOR — günlük dinlenme kuralında telafi yok
 • Sonraki günlük dinlenme yine en az 9sa olmalı */
 if(prev<540&&S.restSes>=540){
 /* Sayaçları sıfırla — 9sa eşiği geçildi */
 S.dailyDrv=0; S.contDrv=0; S.breakLeft=270; S.dailyMax=540;
 S.lastDailyRestEnd=S.simMin;
 if(S.activeWarnings) S.activeWarnings = S.activeWarnings.filter(w=>!w.code.includes('Günlük'));
 renderWarningBanner();
 /* splitRestCount: SADECE kullanıcı 9sa tercihini seçmişse (useReducedRest=true)
 VE gerçek kısaltılmış (540–659dk) aralığındaysa artar */
 if(S.useReducedRest && S.restSes < DAILY_REST_FULL && !window._ktyMode){
 const maxSplit=3;
 if((S.splitRestCount||0) >= maxSplit){
   doLog(`✗ 9sa kısaltılmış hak dolmuş (${maxSplit}/${maxSplit}) — 11sa TAM dinlenme zorunlu!`,'err');
 } else {
   S.splitRestCount=(S.splitRestCount||0)+1;
   const rem=maxSplit-S.splitRestCount;
   doLog(`✓ 9sa KISALTILMIş DİNLENME tamamlandı (${S.splitRestCount}/${maxSplit}, ${rem} hak kaldı).`,'ok');
 }
 }
 /* useReducedRest=false veya 660dk+ → sayaç değişmez */
 }

 /* ── 11sa TAM GÜNLÜK DİNLENME (660dk) ── */
 if(prev<660&&S.restSes>=DAILY_REST_FULL){
 S.dailyDrv=0;
 S.contDrv=0;
 S.breakLeft=270;
 S.dailyMax=540;
 S.lastDailyRestEnd=S.simMin; /* 24sa pencere bu andan başlar */
 doLog(`✓ 11sa TAM GÜNLÜK DİNLENME tamamlandı → Günlük sayaçlar sıfırlandı. Yeni 24sa pencere başladı: ${simDateStr()}. Yeni günlük sürüş: max ${hm(S.dailyMax)}.`,'ok');
 /* Aktif günlük limit uyarısı varsa temizle */
 if(S.activeWarnings) S.activeWarnings = S.activeWarnings.filter(w=>!w.code.includes('Günlük'));
 renderWarningBanner();
 }

 /* ════════ HAFTALIK DİNLENME EŞİKLERİ — AB 561/2006 Madde 8 ════════ */

 /* ── 24sa bildirim eşiği ── */
 if(prev<1440&&S.restSes>=1440){
 const defIfStop=hm(2700-S.restSes);
 const fullWarn=S.hadFullWeeklyRest?'':'⚠ Bu pencerede tam din. yok!';
 doLog(`→ 24sa haftalık dinlenme eşiği geçildi. Şimdi çıkılabilir (${defIfStop} telafi oluşur) veya 45sa'ya devam. ${fullWarn}`,'ok');
 }

 /* ── 45sa TAM HAFTALIK DİNLENME (2700dk) ── */
 if(prev<2700&&S.restSes>=2700){
 /* Haftalık sayaçları sıfırla */
 S.prevWeekDrv=S.weeklyDrv;
 S.weeklyDrv=0;
 S.dailyDrv=0; S.contDrv=0;
 S.breakLeft=270; S.dailyMax=540;
 S.extDayCount=0;
 if(window._extHistory) window._extHistory=[];
 /* splitRestCount: 2 ardışık periyot sonunda sıfırla */
 S.weeklyRestCount=(S.weeklyRestCount||0)+1;
 if(S.weeklyRestCount>=2){
 S.splitRestCount=0;
 S.weeklyRestCount=0;
 doLog('ℹ 2 haftalık periyot tamamlandı — 9sa kısaltılmış hak sıfırlandı (yeni periyot: 3 hak).','ok');
 }
 /* S1-3: Telafi borcu hafta sayacı */
 if((S.weeklyDeficit||0) > 0){
 S.weeklyDeficitWeeks = (S.weeklyDeficitWeeks||0) + 1;
 if(S.weeklyDeficitWeeks >= 3){
 triggerWarning(
 '⚠ Telafi Borcu 3 Haftayı Aştı!',
 `Telafi borcu ${hm(S.weeklyDeficit)} — 3 hafta içinde kapatılması zorunlu. ` +
 `Sonraki haftalık dinlenmeye en az ${hm(S.weeklyDeficit)} eklenmeli. ` +
 `Bugüne kadar ${S.weeklyDeficitWeeks} hafta geçti.`,
 'event'
 );
 doLog(`✗ TELAFİ BORCU 3 HAFTAYI GEÇTİ! Borç: ${hm(S.weeklyDeficit)} — acil kapatın! `,'err');
 } else {
 doLog(`⚠ Telafi borcu: ${hm(S.weeklyDeficit)} — ${3-S.weeklyDeficitWeeks} hafta kaldı. `,'warn');
 }
 } else {
 S.weeklyDeficitWeeks = 0; /* Borç ödendiyse sayacı sıfırla */
 }
 S.reducedInRow=0;
 S.hadFullWeeklyRest=true;
 S.lastWeeklyRestMin=S.simMin;

 const dynMax=getWeeklyMax();
 const biWeekRem=Math.max(0,BIWEEKLY_DRIVE_MAX-(S.prevWeekDrv||0));
 let compNote='';
 if(S.weeklyDeficit>0){
 const needed=2700+S.weeklyDeficit;
 if(S.restSes>=needed){compNote=` ✓ Telafi (${hm(S.weeklyDeficit)}) ödendi!`; S.weeklyDeficit=0;}
 else compNote=` ⚠ Telafi için ${hm(needed-S.restSes)} daha gerekli — devam et!`;
 }
 doLog(`✓ 45sa TAM HAFTALIK DİNLENME → Sayaçlar sıfırlandı.${compNote} Bu hafta max: ${hm(dynMax)} | 2hf kalan: ${hm(biWeekRem)}/90:00`,'ok');
 }

 /* ── Telafi tamamlama eşiği (2700 + weeklyDeficit) ── */
 if(S.weeklyDeficit>0&&S.restSes>=2700+S.weeklyDeficit&&prev<2700+S.weeklyDeficit){
 doLog(`✓ TELAFİ TAMAMLANDI! Toplam dinlenme: ${hm(S.restSes)} (45:00 + ${hm(S.weeklyDeficit)} borç).`,'ok');
 S.weeklyDeficit=0;
 }

 }else if(S.mode==='work'){
 S.workAcc+=minutes;S.restSes=0;
 /* Alt mod sayacı */
 const ws=WORK_SUBS[S.workSub];
 if(S.workSub==='loading') S.workLoadAcc+=minutes;
 else if(S.workSub==='unloading') S.workUnldAcc+=minutes;
 else if(S.workSub==='both') S.workBothAcc+=minutes;
 else S.workOtherAcc+=minutes;
 /* Zaman çizelgesinde alt moda göre farklı renk/class: segs'e workSub bilgisi ekle */
 if(S.segs.length>0&&S.segs[S.segs.length-1].mode==='work'){
 S.segs[S.segs.length-1].workSub=S.workSub;
 }
 doLog(`${ws?ws.lbl:'İş'} +${minutes}dk | Bu alt mod top: ${hm(S.workSub==='loading'?S.workLoadAcc:S.workSub==='unloading'?S.workUnldAcc:S.workSub==='both'?S.workBothAcc:S.workOtherAcc)} | Günlük iş top: ${hm(S.workAcc)}`);
 }else if(S.mode==='available'){
 S.availAcc+=minutes;
 doLog(`Uygunluk +${minutes}dk | Günlük: ${hm(S.availAcc)}`);
 }
 updateLCD();renderTL();
}

/* YENİ GÜN */
function newDay(){
 /* ═══════════════════════════════════════════════════════════════ */

 /* Adım 1: 9sa kısaltılmış kullanımda ONAY GEREKLİ */
 const hakkiDoldu = (S.splitRestCount||0) >= 3;
 const minRest = hakkiDoldu ? 660 : 540;
 const alreadyRested = Math.max(0, S.restSes || 0);
 const kalanDinlenme = Math.max(0, minRest - alreadyRested);

 /* 9sa kısaltılmış kullanımı — S.useReducedRest tercihine göre */
 if(!hakkiDoldu && alreadyRested < DAILY_REST_FULL){
 if(!S.useReducedRest || window._ktyMode){
 /* Tercih: 11sa tam dinlenme */
 const kalanTam = Math.max(0, DAILY_REST_FULL - alreadyRested);
 if(kalanTam > 0){ if(S.mode!=='rest') setMode('rest',null); advance(kalanTam); }
 doLog('✓ 11sa TAM günlük dinlenme tamamlandı.','ok');
 if(S.restSes < 0) S.restSes = 0;
 _newDayFinalize(); return;
 }
 /* Tercih: 9sa kısaltılmış — hak kontrolü */
 const rem = 3-(S.splitRestCount||0);
 doLog(`✓ 9sa kısaltılmış günlük dinlenme kullanılıyor (${(S.splitRestCount||0)+1}/3, ${rem-1} hak kalacak).`,'ok');
 }

 /* Minimum dinlenme tamamla */
 if(kalanDinlenme > 0){
 if(S.mode !== 'rest') setMode('rest', null);
 advance(kalanDinlenme);
 }
 if(S.restSes < 0) S.restSes = 0;

 /* Onaysız geçiş için de devam et */
 _newDayFinalize();
}

function _newDayFinalize(){
 if(S._finalizing) return; /* K4: çift çağrı koruması */
 S._finalizing = true;
 setTimeout(()=>{ S._finalizing=false; }, 100);
 /* Adım 2: Ertesi sabah 06:00'a kadar dinlenme (gece kalan süre) */
 const nowDt = simDateTime();
 const curMinOfDay = nowDt.getHours()*60 + nowDt.getMinutes();
 const target06 = 6*60; /* 06:00 */
 let toMorning;
 if(curMinOfDay < target06){
 toMorning = target06 - curMinOfDay;
 } else {
 toMorning = 1440 - curMinOfDay + target06; /* yarın sabah 06:00 */
 }
 /* Sadece makul bir süre ilerlet (max 20sa) */
 if(toMorning > 0 && toMorning <= 1200){
 if(S.mode !== 'rest') setMode('rest', null);
 advance(toMorning);
 }

 /* Adım 3: Günlük sayaçları sıfırla */
 /* Özel modları kapat — feribot/out modları gün geçişinde temizlenmeli */
 if(S.ferryMode){
 S.ferryMode=false; S.ferryMin=0;
 const bFn=document.getElementById('btn-ferry');
 if(bFn){bFn.classList.remove('on');bFn.querySelector('.ctbl').textContent='Feribot';}
 }
 if(S.outMode){
 S.outMode=false;
 const bOn=document.getElementById('btn-out');
 if(bOn){bOn.classList.remove('on');bOn.querySelector('.ctbl').textContent='OUT';}
 }
 S.dailyDrv=0; S.contDrv=0; S.breakLeft=270; S.dailyMax=540;
 S.workAcc=0; S.workLoadAcc=0; S.workUnldAcc=0; S.workBothAcc=0; S.workOtherAcc=0;
 S.availAcc=0; S.restDayAcc=0;
 S.restSes=0;
 S.lastDailyRestEnd = S.simMin;
 S.dayBase = S.simMin;
 S.segs = [];
 S.simDay = (S.simDay||0) + 1;

 /* Vardiya sonu konum kaydı */
 recordPosition('shift_end');

 /* Adım 4: Bilgi logu */
 const sinceWR = hm(S.simMin - S.lastWeeklyRestMin);
 const dynMax = getWeeklyMax();
 const wkRem = hm(Math.max(0, dynMax - S.weeklyDrv));
 const sixDayRem = Math.max(0, 8640-(S.simMin-(S.lastWeeklyRestMin||0)));
 const telafiNote = S.weeklyDeficit>0?` | ⚠ TELAFİ BORCU: ${hm(S.weeklyDeficit)}`:'';
 const ardasikNote = (S.reducedInRow||0)>0?` | Ardışık kısa: ${S.reducedInRow}`:'';
 /* G6: streak */
 if(typeof awardXP==='function'){
   const _hErr=S.logs.slice(-60).some(l=>l.type==='err');
   if(!_hErr){S.streakDays=(S.streakDays||0)+1;if(S.streakDays%3===0)awardXP(50*Math.min(S.streakDays,7),S.streakDays+' ihlalsiz gün');if(S.streakDays>=7)checkBadge('perfect_week');}
   else S.streakDays=0;
 }
 doLog(`📅 GÜN ${(S.simDay)+1} — ${simDateStr()} | Haf.kalan: ${wkRem}/${hm(dynMax)} | 6×24sa kalan: ${hm(sixDayRem)}${telafiNote}${ardasikNote}`,'ok');
 if(S.weeklyDeficit>0) doLog(`⚠ Telafi borcu ${hm(S.weeklyDeficit)} → 3. hafta sonuna kadar ≥9sa dinlemeye tek blok eklenmeli (araç dışında).`,'warn');
 updateLCD(); renderTL();
}

/* ═══════════════════════════════════════════════════════════════════ */
function toggleFerry(){
 if(!S.ferryMode){
 /* Feribot başlat */
 if(S.mode !== 'rest'){
 doLog('⚠ Feribot/Tren modu sadece DİNLENME modunda aktive edilebilir! Önce dinlenmeye geçin.','warn');
 return;
 }
 if(S.restSes < 0){
 doLog('⚠ Aktif dinlenme oturumu yok.','warn');
 return;
 }
 S.ferryMode=true;
 S.ferryRestSave=S.restSes;
 S.ferryMin=0;
 const btn=document.getElementById('btn-ferry');
 if(btn){btn.classList.add('on');btn.querySelector('.ctbl').textContent='⛴ Aktif';}
 /* Kesinti sayacını artır */
 if(!S.ferryBreakCount) S.ferryBreakCount=0;
 S.ferryBreakCount++;
 S._ferryBreakStart = S.simMin; /* kesinlikle set et */
 if(S.ferryBreakCount>2){
 doLog(`✗ FERİBOT: Günlük dinlenme 2'den fazla kesilemez! (${S.ferryBreakCount}. kesinti deneniyor) `,'err');
 S.ferryMode=false; S.ferryBreakCount--;
 return;
 }
 doLog(`⛴ FERİBOT KESİNTİSİ ${S.ferryBreakCount}/2 — Araç hareketi dinlenmeyi BOZMAZ. Din. oturumu: ${hm(S.restSes)}`,'ok');
 doLog(`ℹ : Feribot ≥8sa → max 2 kesinti, toplam kesinti süresi ≤1sa. Binerken/inerken kullanın.`);
 } else {
 /* Feribot bitir */
 S.ferryMode=false;
 const btn=document.getElementById('btn-ferry');
 if(btn){btn.classList.remove('on');btn.querySelector('.ctbl').textContent='Feribot';}
 /* Toplam kesinti süresi kontrolü */
 const breakDur = (S._ferryBreakStart !== null && S._ferryBreakStart !== undefined) ? S.simMin - S._ferryBreakStart : 0;
 S.ferryTotalBreak = (S.ferryTotalBreak||0) + breakDur;
 if(S.ferryTotalBreak > 60){
 doLog(`⚠ FERİBOT: Toplam kesinti süresi ${hm(S.ferryTotalBreak)} — 1 saati aştı! ihlali.`,'err');
 triggerWarning('Feribot Kesinti Aşıldı',`Toplam feribot kesinti süresi ${hm(S.ferryTotalBreak)} oldu. Limit: 1sa (60dk). `,'event');
 }
 doLog(`✓ Feribot kesiyor. Kesinti ${breakDur}dk | Toplam kesinti: ${hm(S.ferryTotalBreak)} / 1:00 | Din: ${hm(S.restSes)}`,'ok');
 if(S.ferryTotalBreak<=60) doLog(`ℹ Feribot ≥8sa ise dinlenme geçerli. Din. ${hm(S.restSes)}.`);
 S.ferryMin=0;
 S.ferryRestSave=0;
 S._ferryBreakStart=null;
 }
 updateLCD();
}

/* ═══════════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════════ */
const COUNTRY_CODES = {
 'TR':'Türkiye','D':'Almanya','F':'Fransa','I':'İtalya','E':'İspanya',
 'GR':'Yunanistan','BG':'Bulgaristan','RO':'Romanya','HR':'Hırvatistan',
 'A':'Avusturya','CH':'İsviçre','NL':'Hollanda','B':'Belçika','L':'Lüksemburg',
 'PL':'Polonya','CZ':'Çek Cum.','SK':'Slovak Cum.','H':'Macaristan',
 'SLO':'Slovenya','SRB':'Sırbistan','BIH':'Bosna-Hersek','GE':'Gürcistan',
 'UA':'Ukrayna','BY':'Beyaz Rusya','RUS':'Rusya','AZ':'Azerbaycan',
 'N':'Norveç','S':'İsveç','FIN':'Finlandiya','DK':'Danimarka',
 'UK':'Birleşik Krallık','IRL':'İrlanda','P':'Portekiz',
 'EST':'Estonya','LV':'Letonya','LT':'Litvanya',
 'CY':'Kıbrıs','M':'Malta','IS':'İzlanda','AL':'Arnavutluk',
 'MK':'Makedonya','MNE':'Karadağ','RSM':'San Marino','AND':'Andorra',
 'WLD':'Diğer Dünya','EUR':'Diğer Avrupa'
};

function showCountryDialog(){
 /* Varsa önceki diyalogu kapat */
 const existing=document.getElementById('country-dlg');
 if(existing){existing.remove();return;}
 const codes = Object.keys(COUNTRY_CODES);
 const current = S.currentCountry || 'TR';
 const opts = codes.map(c=>`<option value="${escapeHTML(c)}"${c===current?' selected':''}>${escapeHTML(c)} — ${escapeHTML(COUNTRY_CODES[c])}</option>`).join('');
 const dlg = document.createElement('div');
 dlg.id='country-dlg';
 dlg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--s2);border:1px solid #3b82f6;border-radius:8px;padding:18px 22px;z-index:9999;min-width:min(260px,calc(100vw - 24px));box-shadow:0 8px 32px #000a;';
 dlg.innerHTML=`
 <div style="font-family:'Share Tech Mono';color:var(--cyan-light);font-size:.875rem;margin-bottom:12px;">🌐 ÜLKE GİRİŞİ </div>
 <div style="font-size:.75rem;color:var(--slate);margin-bottom:10px;">Vardiya başında/bitiminde ülke seçin. Sınır geçişleri NUTS0'da otomatik kaydedilir.</div>
 <select id="dlg-country" style="width:100%;background:var(--s1);color:var(--txt);border:1px solid #1e2232;border-radius:4px;padding:6px;font-size:.75rem;margin-bottom:12px;">${opts}</select>
 <div style="display:flex;gap:8px;justify-content:flex-end;">
 <button onclick="document.getElementById('country-dlg').remove()" style="padding:5px 12px;background:var(--bdr);color:var(--slate);border:none;border-radius:4px;cursor:pointer;font-size:.75rem;" aria-label="Ülke diyaloğunu kapat">İptal</button>
 <button onclick="applyCountry(document.getElementById('dlg-country').value)" style="padding:5px 12px;background:var(--blue-dark);color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:.75rem;" aria-label="Ülke seçimini uygula">Kaydet </button>
 </div>`;
 document.body.appendChild(dlg);
}

function applyCountry(code){
 if(!code)return;
 const dlg=document.getElementById('country-dlg');
 if(dlg)dlg.remove();
 const prev = S.currentCountry;
 if(prev!==code){
 /* G2V2 → otomatik sınır geçişi mantığını kullan (log + konum kaydı) */
 simulateAutoBorderCrossing(code);
 } else {
 doLog(`🌐 Ülke onaylandı: ${code} (${COUNTRY_CODES[code]||code})`,'ok');
 S.currentCountry=code;
 const lbl=document.getElementById('country-lbl');
 if(lbl)lbl.textContent=code;
 }
 updateLCD();
}

function toggleOut(){
  /* TOBB/AETR: Kart olmadan sürüş yasağı — 15 takvim günü sınırı */
  if(!S.outMode){
    S._noCardDays = (S._noCardDays||0) + 1;
    if(S._noCardDays > 15){
      doLog(`⛔ KART OLMADAN SÜRÜŞ YASAĞI: ${S._noCardDays}. gün — 15 gün sınırı AŞILDI! Türkiye Sayısal Takograf Genelgesi ihlali.`,'err');
    } else {
      doLog(`⊖ OUT MODU (Kartsız): Gün ${S._noCardDays}/15. Yolculuk sonunda takograf çıktısı alın, bilgileri el yazısıyla ekleyip imzalayın.`,'warn');
      doLog('   Kart kayıp/çalıntıysa 7gün içinde: staum.tobb.org.tr | 444 9 559');
    }
  }
 S.outMode=!S.outMode;
 const btn=document.getElementById('btn-out');
 if(btn){
 btn.classList.toggle('on',S.outMode);
 btn.querySelector('.ctbl').textContent=S.outMode?'OUT Aktif':'OUT';
 }
 if(S.outMode){
 doLog(`🌍 OUT MODU AKTİF — Takograf kapsamı dışında sürüş başlıyor.`,'ok');
 doLog(`ℹ Kapsam dışı nedenler: AB dışı ülke / muaf araç / özel kullanım.`);
 doLog(`📋 Kart yokken el yazılı not tutun: tarih, saat, güzergah, araç plakası.`);
 } else {
 doLog(`✓ OUT modu kapatıldı. Takograf kaydı yeniden başladı.`,'ok');
 doLog(`ℹ Kart takınca "Manuel giriş?" sorusuna EVET deyin ve OUT süresini DİNLENME veya DİĞER İŞ olarak girin.`);
 }
 updateLCD();
}

/* ═══════════════════════════════════════════════════════════════════ */
function toggleManualPanel(){
 const p=document.getElementById('manual-panel');
 if(p)p.classList.toggle('vis');
}

function applyManualEntry(){
 const actEl=document.getElementById('manual-act');
 const durEl=document.getElementById('manual-dur');
 const noteEl=document.getElementById('manual-note');
 if(!actEl||!durEl)return;

 const VALID_ACTS=['rest','work','available'];
 const act=actEl.value;
 /* Whitelist: sadece geçerli aktivite değerlerini kabul et */
 if(!VALID_ACTS.includes(act)){
 if(noteEl)noteEl.textContent='⚠ Geçersiz aktivite seçimi.';
 return;
 }
 const dur=Math.round(parseInt(durEl.value)||0);
 if(!isFinite(dur)||dur<=0||dur>2700){
 if(noteEl)noteEl.textContent='⚠ Geçerli bir süre girin (1–2700 dakika).';
 return;
 }

 const actLbl={rest:'DİNLENME (yatak 😴)',work:'DİĞER İŞ (çekiç 🔨)',available:'UYGUNLUK (zarf 📬)'};
 const prevMode=S.mode;

 /* Mevcut modu geçici değiştir, aktiviteyi uygula */
 const savedMode=S.mode;
 S.mode=act; /* act whitelist'ten geçti — güvenli */
 advance(dur);
 S.mode=savedMode;

 doLog(`✏ MANUEL GİRİŞ: ${actLbl[act]} — ${hm(dur)} kayıt edildi.`,'ok');
 doLog(`ℹ Gerçek cihazda: kart takılınca "Manuel giriş? EVET" → aktivite seç → süre ayarla → onayla.`);
 doLog(`📋 Hatalı giriş için: çıktı al → el yazısıyla düzelt → "Düzeltme Nedeni" yaz → 28 gün sakla.`);

 if(act==='rest'&&dur>=2700){
 doLog(`✓ Manuel giriş: 45sa+ dinlenme kayıt edildi — haftalık sayaçlar sıfırlandı.`,'ok');
 } else if(act==='rest'&&dur>=1440){
 const deficit=2700-dur;
 doLog(`⚠ Manuel giriş: ${hm(dur)} kısaltılmış haftalık dinlenme — ${hm(deficit)} telafi borcu oluştu.`,'warn');
 } else if(act==='rest'&&dur>=660){
 doLog(`✓ Manuel giriş: 11sa+ günlük dinlenme kayıt edildi.`,'ok');
 } else if(act==='rest'&&dur>=540){
 doLog(`✓ Manuel giriş: 9sa kısaltılmış günlük dinlenme kayıt edildi. (${S.splitRestCount}/3)`,'ok');
 }

 if(noteEl)noteEl.textContent=`✓ ${hm(dur)} süre "${actLbl[act]}" olarak kaydedildi. Gerçek cihazda bu giriş değiştirilemez.`;
 updateLCD();
 updateDrvPanel();
}

function simWeekNum(){
 /* Pazartesi bazlı takvim haftası: SIM_START'tan kaç Pazartesi geçildi + 1 */
 const msPerWeek = 7*24*60*60000;
 /* SIM_START'ın haftasının Pazartesi 00:00'ını bul */
 const startDay = SIM_START.getDay(); /* 0=Paz,1=Pzt,...,6=Cmt */
 const msToPrevMon = ((startDay + 6) % 7) * 86400000; /* Pazartesi'ye kaç ms geri */
 const firstMonMs = SIM_START.getTime() - SIM_START.getHours()*3600000
 - SIM_START.getMinutes()*60000 - msToPrevMon;
 const nowMs = SIM_START.getTime() + S.simMin * 60000;
 return Math.floor((nowMs - firstMonMs) / msPerWeek) + 1;
}

/* GÜNLÜK UZATMA — Haftada maks 2x 10 saate çıkabilir */
function extendDay(){
 if(S.extDayCount>=2){
 doLog('✗ Bu hafta 2 kez 10sa uzatma kullanıldı — haftalık dinlenme (45sa) sonrası sıfırlanır. ','err');
 triggerWarning('10sa Hakkı Doldu','2 uzatma hakkı kullanıldı. Kural: Hafta = Pzt 00:00-Paz 24:00. Simülatörde 45sa haftalık dinlenme sonrası sıfırlanır. ','usage',5);
 return;
 }
 if(S.dailyMax===600){
 doLog('ℹ Günlük limit zaten 10 saate uzatılmış ('+hm(S.dailyDrv)+' sürdünüz).','warn');
 return;
 }
 S.dailyMax=600;
 S.extDayCount++;
 /* Geçmiş kaydet */
 if(!window._extHistory) window._extHistory=[];
 window._extHistory.push({day:S.simDay, time:simTime(), drv:S.dailyDrv, nth:S.extDayCount});
 const kalanHak = 2 - S.extDayCount;
 /* E4: Hangi günlerde kullanıldığını state'e kaydet */
 if(!S.extDayUsedDays) S.extDayUsedDays=[];
 if(!S.extDayUsedDays.includes(S.simDay)) S.extDayUsedDays.push(S.simDay);
 const kalanStr = kalanHak===0?' — Bu hafta artık uzatamazsınız!':' ('+kalanHak+' hak kaldı)';
 const usedDaysStr2 = (S.extDayUsedDays||[]).map(d=>'G'+(d+1)).join(', ');
 doLog('✓ GÜNLÜK UZATMA AKTİF → Bugün (G'+(S.simDay+1)+') 10sa. ('+S.extDayCount+'/2 kullanıldı'+kalanStr+') Günler: ['+usedDaysStr2+'] ','ok');
 doLog(' Not: Mola zorunluluğu değişmez — 4:30 sonrası 45dk mola hâlâ gerekli.');
 if(kalanHak===0) doLog(' ⚠ Son hak kullanıldı. Haftalık dinlenme (45sa) sonrasında sıfırlanacak.','warn');
 updateLCD();updateDrvPanel();
}

function cancelExtendDay(){
 /* Uzatmayı iptal et — sadece 9sa aşılmamışsa mümkün */
 if(S.dailyMax!==600){
 doLog('ℹ Uzatma aktif değil.','warn');
 return;
 }
 if(S.dailyDrv>540){
 doLog('✗ Uzatma iptal edilemiyor — günlük sürüş 9saati aştı ('+hm(S.dailyDrv)+'). Devam edin.','err');
 return;
 }
 S.dailyMax=540;
 S.extDayCount=Math.max(0,S.extDayCount-1);
 /* Geçmişten son kaydı sil */
 if(window._extHistory) window._extHistory.pop();
 doLog('↩ 10sa uzatma iptal edildi — günlük limit 9sa olarak geri alındı. Hak sayısı geri verildi.','ok');
 updateLCD();updateDrvPanel();
}

function showExtHistory(){
 const hist = window._extHistory||[];
 if(hist.length===0){
 doLog('ℹ Bu hafta hiç 10sa uzatma kullanılmadı.','ok');
 return;
 }
 doLog('📋 10sa Uzatma Geçmişi (Bu Hafta):','ok');
 hist.forEach((h,i)=>{
 doLog(' '+(i+1)+'. Gün '+h.day+' — Saat '+h.time+' ('+hm(h.drv)+' sürüş sırasında aktifleştirildi)');
 });
 doLog(' Toplam '+hist.length+'/2 kullanıldı. '+(2-hist.length)+' hak kaldı.');
}

/* ÇİFT SÜRÜCÜ MODU — 30sa periyot, aktif olmayan sürücü bekleme modunda */
function toggleDoubleDriver(){
 S.doubleDriver=!S.doubleDriver;
 if(S.doubleDriver){
 /* Çift sürücü modu açıldı — 30sa periyot başlıyor */
 S.doubleDriverStart = S.simMin;
 S.doubleDriverException = true; /* S1-5: İlk 1sa istisnası aktif */
 S.doubleDriverExceptionEnd = S.simMin + 60; /* 60dk sonra istisna biter */
 doLog('👥 ÇİFT SÜRÜCÜ MODU AKTİF ','ok');
 doLog(' Kural: 30sa içinde 9sa dinlenme (tek sürücü 24sa/11sa yerine).');
 doLog(' İlk 1sa istisnası: Slot 2 sürücüsü ilk 60dk araçta olmak zorunda değil. ','ok');
 doLog(' Aktif sürücü: Slot 1 | Bekleme/Uygunluk: Slot 2');
 /* S7-5: Slot 2'de 1sa istisna göstergesi */
 const s2exc = document.getElementById('s2name');
 if(s2exc && s2exc.textContent.trim()!=='— BOŞ —'){
 const excTag = document.createElement('span');
 excTag.id = 'dd-exception-tag';
 excTag.style.cssText = 'font-family:var(--M);font-size:var(--fs-min);color:var(--amber);'+
 'background:rgba(245,158,11,.12);border:1px solid var(--amber);border-radius:2px;'+
 'padding:1px 4px;margin-left:4px;';
 excTag.textContent = '1sa istisna';
 const existing = document.getElementById('dd-exception-tag');
 if(existing) existing.remove();
 s2exc.parentElement.appendChild(excTag);
 /* 60dk sonra kaldır */
 /* Tag, 1sa istisna bitişinde advance() içinde kaldırılıyor */
 }
 } else {
 S.doubleDriverStart = null;
 S.doubleDriverException = false;
 doLog('👤 Tek sürücü moduna dönüldü.');
 }
 const btn=document.getElementById('btn-double');
 if(btn){
 btn.classList.toggle('on',S.doubleDriver);
 btn.querySelector('.ctbl').textContent=S.doubleDriver?'Tek Sürücü':'Çift Sürücü';
 btn.querySelector('.ctbi').textContent=S.doubleDriver?'👤':'👥';
 }
 /* Slot 2 gösterimi */
 const s2led=document.querySelector('.slot:nth-child(2) .slot-led');
 const s2name=document.querySelector('.slot:nth-child(2) .sname');
 if(S.doubleDriver){
 if(s2led)s2led.className='slot-led sl-on';
 if(s2name){s2name.className='sname sna';s2name.textContent='B. DEMİR';}
 doLog('✓ ÇİFT SÜRÜCÜ MODU AKTİF — Sürücü 2 (B.DEMİR) karta bağlandı. 30sa periyot geçerli. Aktif olmayan sürücü "Uygunluk" modunda.','ok');
 } else {
 if(s2led)s2led.className='slot-led sl-off';
 if(s2name){s2name.className='sname sne';s2name.textContent='— BOŞ —';}
 doLog('ℹ Tek sürücü moduna dönüldü.','ok');
 }
 updateLCD();
}

/* SIFIRLA */
function resetSim(){
 initState();
 animSpd(0);
 /* Tüm state'leri sıfırla */
 S.allSegs = [];
 S.simDay = 0;
 S.lastDailyRestEnd = 0;
 S.weeklyDeficit = 0;
 S.reducedInRow = 0;
 S.hadFullWeeklyRest = true;
 S.currentCountry = 'TR';
 S.breakPart1Done = false;
 S.breakPart1Min = 0;
 S.ferryMode = false;
 S.ferryMin = 0;
 S.ferryBreakCount = 0;
 S.ferryTotalBreak = 0;
 S._ferryBreakStart = null;
 S.outMode = false;
 S.activeWarnings = [];
 S.faultHistory = [];
 S.warnCount = 0;
 S.speedViolations = 0;
 S.gnssOk = true;
 S.gnssLostMin = 0;
 S.card1Type = 'driver';
 S.card2Type = null;
 S.operationMode = 'driving';
 S.bluetoothOn = false;
 S.adrMode = false;
 S.dtcoVariant = '4.1b';
 S.osnmaActive = true;
 S.cardGen = 'G2V2';
 S.storageDays = 56;
 S.cargoType = 'goods';
 S.positionLog = [];
 S.positionDrivingAcc = 0;
 S.borderLog = [];
 S.dsrcEnabled = true;
 S.controlMode = false;
 S.doubleDriver = false;
 S.doubleDriverStart = null;
 S.doubleDriverException = false;
 S.extDayCount = 0;
 S.extDayUsedDays = [];
 /* Global geçmişleri sıfırla */
 window._extHistory = [];
 /* localStorage temizle */
 try { localStorage.removeItem('tachotr_state_v2'); } catch(e){}
 /* UI sıfırla */
 renderWarningBanner();
 updateLedWarning();
 const compBar=document.getElementById('company-bar');if(compBar)compBar.classList.remove('vis');
 const compPanel=document.getElementById('company-panel');if(compPanel)compPanel.style.display='none';
 const adrBar=document.getElementById('adr-bar');if(adrBar)adrBar.classList.remove('vis');
 const badge=document.getElementById('opmode-badge');
 if(badge){
   if(typeof window._ktyMode!=='undefined' && window._ktyMode){
     badge.textContent='🇹🇷 KTY'; badge.className='lcd-opmode'; badge.style.color='#e30a17'; badge.style.borderColor='#e30a17'; badge.style.background='rgba(227,10,23,.08)';
   } else {
     badge.textContent='🇪🇺 AB'; badge.className='lcd-opmode'; badge.style.color='#60a5fa'; badge.style.borderColor='#3b82f6'; badge.style.background='rgba(59,130,246,.08)';
   }
 }
 const gnssLed=document.getElementById('gnss-led');if(gnssLed)gnssLed.className='lcd-led on';
 const btLed=document.getElementById('bt-led');if(btLed)btLed.className='lcd-led off';
 const itsLed=document.getElementById('its-led');if(itsLed)itsLed.className='lcd-led off';
 const lspd=document.getElementById('lspd');if(lspd)lspd.style.color='';
 document.querySelectorAll('.mhw').forEach(b=>b.classList.remove('on'));
 document.getElementById('btn-r').classList.add('on');
 updateMpict('rest');
 document.getElementById('scencard').classList.remove('vis');
 document.querySelectorAll('.scbtn').forEach(b=>b.classList.remove('act'));
 /* Özel mod butonlarını ve DOM'u sıfırla */
 const bF=document.getElementById('btn-ferry');if(bF){bF.classList.remove('on');bF.querySelector('.ctbl').textContent='Feribot';}
 const bO=document.getElementById('btn-out');if(bO){bO.classList.remove('on');bO.querySelector('.ctbl').textContent='OUT';}
 const bD=document.getElementById('btn-double');if(bD){bD.classList.remove('on');const dbl=bD.querySelector('.ctbl');if(dbl)dbl.textContent='Çift Sürücü';const dbi=bD.querySelector('.ctbi');if(dbi)dbi.textContent='👥';}
 const cLbl=document.getElementById('country-lbl');if(cLbl)cLbl.textContent='TR';
 const bpI=document.getElementById('break-part-ind');if(bpI)bpI.style.display='none';
 const cDlg=document.getElementById('country-dlg');if(cDlg)cDlg.remove();
 const mp=document.getElementById('manual-panel');if(mp)mp.classList.remove('vis');
 doLog('Sistem sıfırlandı. Kart: A.YILMAZ (TR-054821)');
 doLog('Mod → DİNLENME | Tam gece dinlenmesi alındı.');
 updateLCD();renderTL();
}

/* LCD GÜNCELLE */
function barC(p){return p>=100?'var(--LR)':p>=85?'var(--LW)':'var(--LF)';}
function setCnt(id,val,wT,eT){
 const el=document.getElementById(id);if(!el)return;
 el.textContent=hm(val);
 el.className='cntval'+(val>=eT?' E':val>=wT?' W':'');
}

function updateLCD(){
 /* UTC göstergesi güncelle */
 updateUTCDisplay();
 /* UX: Aktif mod göstergesi + progress renkleri */
 updateActiveModeDisplay();
 updateProgressColors();
 /* S3-4/6: Uyum puanı + Risk güncelle */
 updateDailyScore();
 updateRiskDisplay();
 /* S7-4: Hafif araç cntsub güncelle */
 const cContSub = document.getElementById('c-cont-sub');
 const cDailySub = document.getElementById('c-daily-sub');
 if(S.lightVehicleMode){
 if(cContSub) cContSub.textContent = 'maks 6:00';
 if(cDailySub) cDailySub.textContent = 'maks 9:00';
 } else {
 if(cContSub) cContSub.textContent = 'maks 4:30';
 if(cDailySub) cDailySub.textContent = _tr('maks 9:00');
 }
 /* S2-1: Otomatik kaydet */
 autoSave();
 /* mode-timer: LCD sağ üst mod süresi */
 (function(){
   const mt=document.getElementById('mode-timer');
   if(!mt) return;
   let t='';
   if(S.mode==='driving') t=hm(S.contDrv||0);
   else if(S.mode==='rest') t=hm(S.restSes||0);
   else if(S.mode==='work') t=hm(S.workAcc||0);
   else if(S.mode==='available') t=hm(S.availAcc||0);
   mt.textContent=t||'0:00';
   const colMap={driving:'var(--grn)',rest:'#38a8ff',work:'var(--amber)',available:'var(--purple-light)'};
   mt.style.color=colMap[S.mode]||'var(--dim)';
 })();
 /* Durum özeti şeridi + sayaç bar güncelleme */
 (function(){
    /* Sayaç kartı bar'ları — kullanılan % gösterir, az kaldıysa kırmızı */
    /* colSafe: kalan kapasiteye göre renk (p=kullanılan %) */
    const colSafe = p => p<60?'var(--LF)':p<85?'var(--LW)':'var(--LR)';
    function setBar(id,pct,colorFn){
      const b=document.getElementById(id);
      const fn=colorFn||colSafe;
      if(b){b.style.width=Math.min(100,Math.max(0,pct))+'%';b.style.background=fn(pct);}
    }
    const dynW = getWeeklyMax();
    setBar('bar-daily', (S.dailyDrv/S.dailyMax)*100);
    setBar('bar-cont',  (S.contDrv/CONT_DRIVE_LIMIT)*100);
    /* bar-break: kalan mola hakkı — breakLeft'e göre */
    const brkPct=(S.breakLeft/270)*100;
    setBar('bar-break', brkPct, p=>p>40?'var(--LF)':p>15?'var(--LW)':'var(--LR)');
    /* bar-rest: sadece rest modunda — eşik kısaltılmış moda göre */
    const _restMax = (!window._ktyMode && S.useReducedRest) ? 540 : 660;
    const _restPct = S.mode==='rest' ? Math.min(100,(S.restSes/_restMax)*100) : 0;
    const minR = _restMax;
    const rb = document.getElementById('bar-rest');
    if(rb){
      const wasComplete = rb.dataset.complete === '1';
      const isComplete  = _restPct >= 100;
      rb.style.width = _restPct + '%';
      if(S.mode==='rest'){
        rb.style.background = isComplete ? 'var(--LF)' : S.restSes > minR*0.5 ? 'var(--LW)' : 'var(--LR)';
        /* 100%'e ulaşınca yeşil parlaklık animasyonu */
        if(isComplete && !wasComplete){
          rb.classList.add('anim-fill-done');
          rb.dataset.complete = '1';
          setTimeout(()=>rb.classList.remove('anim-fill-done'), 700);
        }
        if(!isComplete) rb.dataset.complete = '0';
      } else {
        rb.style.background = 'var(--LF)';
        rb.dataset.complete = '0';
      }
    }
    setBar('bar-week', (S.weeklyDrv/dynW)*100);
 })();
 (function(){
    const dailyRem = Math.max(0, S.dailyMax - S.dailyDrv);
    const contRem  = Math.max(0, CONT_DRIVE_LIMIT - S.contDrv);
    const dynMax   = getWeeklyMax();
    const weekRem  = Math.max(0, dynMax - S.weeklyDrv);
    const col = p => p>40?'var(--LF)':p>15?'var(--LW)':'var(--LR)';
    function setSS(id,bar,val,pct){
      const el=document.getElementById(id), bl=document.getElementById(bar);
      if(el){el.textContent=hm(val); el.style.color=col(pct);}
      if(bl){bl.style.width=Math.max(2,pct)+'%'; bl.style.background=col(pct);}
    }
    setSS('ss-daily-rem','ss-daily-bar',dailyRem,(dailyRem/S.dailyMax)*100);
    setSS('ss-cont-rem', 'ss-cont-bar', contRem, (contRem/270)*100);
    setSS('ss-week-rem', 'ss-week-bar', weekRem, (weekRem/dynMax)*100);
    const restRow=document.getElementById('ss-rest-row');
    const inRest=S.mode==='rest';
    /* Günlük sürüş limiti dolunca VEYA rest'te VE günlük limit dolmuşsa göster */
    /* NOT: 4,5sa sonrası 45dk mola için rest'e girildiğinde gösterilmemeli */
    const needRest=S.dailyDrv>=S.dailyMax;
    const showRestBar = needRest || (inRest && S.restSes >= 45 && S.dailyDrv >= S.dailyMax * 0.95);
    if(restRow){
      restRow.style.display=showRestBar?'':'none';
      if(showRestBar){
        const minR=(!window._ktyMode && S.useReducedRest) ? 540 : 660;
        const done=inRest ? Math.min(S.restSes||0,minR) : 0;
        const pct=(done/minR)*100;
        const c=done>=minR?'var(--LF)':'var(--LR)';
        const rb=document.getElementById('ss-rest-bar');
        const rl=document.getElementById('ss-rest-rem');
        const lbl=restRow.querySelector('span[style*="DNLENME"],span[style*="color:var(--dim)"]');
        if(lbl)lbl.textContent=done>=minR?'✓ DİNLENME TAMAM':'DİNLENME GEREKLİ';
        if(rl){rl.textContent=done>=minR?'Hazır':hm(minR-done)+' kaldı';rl.style.color=c;}
        if(rb){rb.style.width=Math.max(2,pct)+'%';rb.style.background=c;}
      }
    }
 })();
  if(typeof updateXPBar==='function') updateXPBar();
 /* S8-6: LCD mini skor güncelleme */
 if(typeof calcUyumScore === 'function'){
 const score = calcUyumScore();
 const sBar = document.getElementById('lcd-score-bar');
 const sVal = document.getElementById('lcd-score-val');
 if(sBar && sVal){
 sBar.style.width = score + '%';
 sVal.textContent = score;
 const c = score >= 80 ? 'var(--LF)' : score >= 60 ? 'var(--LW)' : 'var(--LR)';
 sBar.style.background = c;
 sVal.style.color = c;
 }
 }
 /* OSNMA durumu */
 updateOSNMAStatus();
 /* Kart nesli badge */
 const cgb=document.getElementById('card-gen-badge');
 if(cgb){
 cgb.textContent=S.cardGen||'G2V2';
 cgb.style.color=S.cardGen==='G2V2'?'#a78bfa':S.cardGen==='G2V1'?'#f59e0b':'#ef4444';
 cgb.title=`Kart nesli: ${S.cardGen||'G2V2'} — ${S.storageDays||56} ${_tr('gün saklama')}`;
 }
 /* Yük tipi badge */
 const cbadge=document.getElementById('cargo-badge');
 if(cbadge) cbadge.textContent=S.cargoType==='passengers'?'👥':'📦';
 /* DSRC LED */
 const dsrcLed=document.getElementById('dsrc-led');
 if(dsrcLed) dsrcLed.className='lcd-led '+(S.dsrcEnabled?'on':'off');
 /* Konum ve sınır panelleri */
 updatePositionPanel();
 updateBorderPanel();
 const lc=document.getElementById('lclk');if(lc)lc.textContent=simTime();
 const ld=document.getElementById('ldt');if(ld)ld.textContent=simDateStr();
 /* OUT / Feribot durumu göstergesi */
 const outInd=document.getElementById('out-indicator');
 if(outInd){
 if(S.outMode){outInd.textContent='🌍 OUT';outInd.style.color='#f97316';outInd.style.display='inline';}
 else if(S.ferryMode){outInd.textContent='⛴ FERRY';outInd.style.color='#60a5fa';outInd.style.display='inline';}
 else{outInd.style.display='none';}
 }

 const dynWeekMax = getWeeklyMax();
 setCnt('c-d',S.dailyDrv,480,S.dailyMax);
 setCnt('c-c',S.contDrv,240,270);
 setCnt('c-w',S.weeklyDrv,dynWeekMax*0.85,dynWeekMax);

 /* Mola hakkı: durum bazlı */
 const cb=document.getElementById('c-b');
 const cbsub=document.getElementById('c-b-sub');
 if(cb){
   if(S.breakPart1Done){
     /* Bölünmüş mola 1.bölüm tamamlandı — 2.bölüm bekleniyor */
     cb.textContent='15+?'; cb.className='cntval W';
     if(cbsub) cbsub.textContent='≥30dk 2.bölüm gerekli';

   } else if(S.mode==='rest' && S.restSes < 45){
     /* Mola devam ediyor — kalan süreyi göster */
     const molakalan = Math.max(0, 45 - S.restSes);
     cb.textContent = molakalan > 0 ? hm(molakalan) : '✓';
     cb.className = 'cntval W';
     if(cbsub) cbsub.textContent = molakalan > 0 ? `mola: ${hm(molakalan)} kaldı` : 'mola tamam';

   } else if(S.mode==='rest' && S.restSes >= 45 && S.breakLeft > 0){
     /* Mola tamamlandı, sürüşe hazır */
     cb.textContent = hm(S.breakLeft);
     cb.className = 'cntval';
     if(cbsub) cbsub.textContent = '✓ mola tamam — devam et';

   } else if(S.breakLeft <= 0 && S.mode==='driving'){
     if(S.dailyDrv >= S.dailyMax){
       /* Günlük limit dolmuş — dinlenme gerekli */
       cb.textContent='DİN!'; cb.className='cntval E';
       if(cbsub) cbsub.textContent='🛏 günlük din. gerekli';
     } else {
       /* Sadece 45dk mola gerekli */
       cb.textContent='MOLA!'; cb.className='cntval E';
       if(cbsub) cbsub.textContent='⚠ 45dk mola zorunlu';
     }

   } else if(S.mode==='rest' && S.breakLeft <= 0){
     /* Günlük limit dolmuş, günlük dinlenme gerekli */
     cb.textContent='—'; cb.className='cntval';
     if(cbsub) cbsub.textContent='günlük din. gerekli';

   } else {
     /* Normal sürüş — kalan hakkı göster */
     cb.textContent=hm(Math.max(0,S.breakLeft));
     cb.className='cntval'+(S.breakLeft<=30&&S.breakLeft>0&&S.mode==='driving'?' W':'');
     if(cbsub) cbsub.textContent='kalan sürüş hakkı';
   }
 }
 /* Dinlenme oturumu — eşiklere göre renkli */
 const cr=document.getElementById('c-r');
 if(cr){
  cr.textContent=S.mode==='rest'?hm(S.restSes):'0:00';
 // Renk: 45dk eşiğine göre (mola) veya 660dk eşiğine göre (günlük din.)
 if(S.restSes>=DAILY_REST_FULL) cr.className='cntval'; // tam günlük: yeşil (normal)
 else if(S.restSes>=540) cr.className='cntval'; // 9sa kısaltılmış: normal
 else if(S.restSes>=45) cr.className='cntval'; // mola tamam: normal
 else if(S.restSes>0) cr.className='cntval W'; // dinlenme sürüyor ama mola henüz tam değil
 else cr.className='cntval';
 }
 /* Dinlenme alt etiketi — hangi eşiğe ne kadar kaldı */
 const crsub=document.querySelector('#c-r+.cntsub');
 if(crsub){
 if(S.restSes>=2700) crsub.textContent=_tr('✓ Haftalık din. tamam');
 else if(S.restSes>=1440) crsub.textContent=_tr('✓ 24sa haftalık tamam');
 else if(S.restSes>=DAILY_REST_FULL) crsub.textContent=_tr('✓ 11sa günlük tamam');
 else if(S.restSes>=540) crsub.textContent=_tr('✓ 9sa kısaltılmış tamam');
 else if(S.restSes>=45) crsub.textContent='✓ Mola tamam (45dk+)';
 else if(S.restSes>0){
 if(S.dailyDrv >= S.dailyMax){
 const minR = (!window._ktyMode && S.useReducedRest) ? 540 : 660;
 crsub.textContent = `↻ ${hm(Math.max(0,minR-S.restSes))} günlük din.`;
 } else {
 crsub.textContent = `${_tr('↻ Mola için')} ${hm(45-S.restSes)} ${_tr('kaldı')}`;
 }
 }
  else crsub.textContent = S.mode==='rest' ? hm(Math.max(0,((!window._ktyMode && S.useReducedRest) ? 540 : 660)-S.restSes))+' kaldı' : 'min 11:00/gün';
 }
 /* Odometer */
const co=document.getElementById('c-o'); const odoVal=(S.odo||0).toLocaleString('tr',{minimumFractionDigits:3,maximumFractionDigits:3}); if(co)co.textContent=odoVal; const odoStat=document.getElementById('odo-stat'); if(odoStat)odoStat.textContent=odoVal;

 /* ── Günlük Sürüş cntsub dinamik (10sa uzatma durumuna göre) ── */
 const cdSub = document.querySelector('#c-d + .cntsub');
 if(cdSub){
 if(S.dailyMax===600){
 cdSub.textContent = 'maks 10:00 ⬆';
 cdSub.style.color = '#f59e0b';
 } else if(S.extDayCount>=2){
 cdSub.textContent = 'maks 9:00 (hak yok)';
 cdSub.style.color = '#ef4444';
 } else {
 cdSub.textContent = 'maks 9:00';
 cdSub.style.color = '';
 }
 }
 /* Günlük sürüş cnt kenarlığı — uzatma aktifken amber ── */
 const cdCnt = document.getElementById('c-d')?.closest('.cnt');
 if(cdCnt){
 if(S.dailyMax===600){
 cdCnt.style.borderColor = '#f59e0b';
 cdCnt.style.background = 'rgba(245,158,11,.06)';
 } else {
 cdCnt.style.borderColor = '';
 cdCnt.style.background = '';
 }
 }

 /* ── 10sa Uzatma Hakkı (c-ext) ── */
 const cext = document.getElementById('c-ext');
 const cextsub = document.getElementById('c-ext-sub');
 const cextCnt = document.getElementById('cnt-ext-day');
 if(cext){
 const kalan10 = 2 - (S.extDayCount||0);
 if(S.dailyMax===600){
 /* Aktif uzatma günü */
 cext.textContent = 'AKTİF';
 cext.style.fontSize = '.62rem';
 cext.style.color = '#f59e0b';
 if(cextsub) cextsub.textContent = (2-S.extDayCount)===1?'son hak!':_tr('bugün uzatıldı');
 if(cextCnt){ cextCnt.style.borderColor='#f59e0b'; cextCnt.style.background='rgba(245,158,11,.06)';}
 } else if(kalan10===0){
 cext.textContent = '0/2';
 cext.style.fontSize = '.75rem';
 cext.style.color = '#ef4444';
 if(cextsub) cextsub.textContent = '✗ hak doldu';
 if(cextCnt){ cextCnt.style.borderColor='#ef4444'; cextCnt.style.background='';}
 } else {
 cext.textContent = kalan10+'/2';
 cext.style.fontSize = '.75rem';
 cext.style.color = kalan10===1?'#f59e0b':'#22c55e';
 if(cextsub) cextsub.textContent = kalan10===1?'son hak':'uzatma hakkı';
 if(cextCnt){ cextCnt.style.borderColor=''; cextCnt.style.background='';}
 }
 }

 /* ── Kısaltılmış Günlük Dinlenme Hakkı (c-sr) ──
 splitRestCount: 0-3 arası — iki haftalık periyotta 9sa kısaltılmış dinlenme sayısı
 3 olunca 11sa tam dinlenme zorunlu */
 const csr = document.getElementById('c-sr');
 const csrsub = document.getElementById('c-sr-sub');
 const cntSplit = document.getElementById('cnt-split-rest');
 if(csr){
 const used = S.splitRestCount||0;
 const max = 3;
 const kalan = max - used;

 /* KTY modunda 9sa izni yok */
 if(window._ktyMode){
   csr.textContent = '—';
   csr.style.color = '#e30a17';
   if(csrsub) csrsub.textContent = '🇹🇷 KTY: izin yok';
   if(cntSplit){ cntSplit.style.borderColor='#e30a17'; cntSplit.style.opacity='0.6'; }
 } else if(!S.useReducedRest){
   /* 9sa mod kapalı — 11sa tam mod */
   csr.textContent = kalan+'/'+max;
   csr.style.color = '#64748b';
   if(csrsub) csrsub.textContent = '11sa TAM mod';
   if(cntSplit){ cntSplit.style.borderColor=''; cntSplit.style.opacity='0.7'; }
 } else if(kalan===0){
   csr.style.color='#ef4444';
   csr.textContent='0/3';
   if(csrsub) csrsub.textContent='✗ 11sa tam zorunlu!';
   if(cntSplit){ cntSplit.style.borderColor='#ef4444'; cntSplit.style.opacity='1'; }
 } else if(kalan===1){
   csr.style.color='#f59e0b';
   csr.textContent=kalan+'/'+max;
   if(csrsub) csrsub.textContent='⚠ son '+kalan+' hak kaldı';
   if(cntSplit){ cntSplit.style.borderColor='#f59e0b'; cntSplit.style.opacity='1'; }
 } else {
   csr.style.color='#22c55e';
   csr.textContent=kalan+'/'+max;
   if(csrsub) csrsub.textContent=kalan+' hak kalan';
   if(cntSplit){ cntSplit.style.borderColor=''; cntSplit.style.opacity='1'; }
 }
 /* E1: 9sa mod badge */
 const rrBadge = document.getElementById('reduced-rest-badge');
 if(rrBadge) rrBadge.style.display = S.useReducedRest ? '' : 'none';

 /* G5: WTD badge */
 const wtdB=document.getElementById('wtd-badge');
 if(wtdB){
   if(!S.wtdEnabled){ wtdB.style.display='none'; }
   else {
     wtdB.style.display='';
     const ww=S.wtdWeeklyWork||0, wc=ww>=3600?'var(--LR)':ww>=3300?'var(--LW)':'#60a5fa';
     wtdB.textContent='⏱'+Math.floor(ww/60)+'sa'; wtdB.style.borderColor=wc; wtdB.style.color=wc;
   }
 }
 /* Status bar 9sa + 10sa badge güncelleme */
 const b9=document.getElementById('badge-9sa');
 if(b9){
   /* KTY'de 9sa hakkı yok — badge'i gizle */
   if(window._ktyMode){
     b9.classList.add('kty-hide');
   } else {
     b9.classList.remove('kty-hide');
     if(!S.useReducedRest){
       b9.textContent='11sa TAM'; b9.style.background='rgba(100,116,139,.1)'; b9.style.borderColor='#64748b'; b9.style.color='#64748b';
     } else {
       const k9=3-(S.splitRestCount||0), c9=k9===0?'#ef4444':k9===1?'#f59e0b':'#22c55e';
       b9.textContent='9sa '+k9+'/3'; b9.style.borderColor=c9; b9.style.color=c9; b9.style.background='rgba(34,197,94,.1)';
     }
   }
 }
 const b10=document.getElementById('badge-10sa');
 if(b10){
   const k10=2-(S.extDayCount||0), c10=k10===0?'#ef4444':k10===1?'#f59e0b':'#60a5fa';
   b10.textContent='10sa '+k10+'/2'; b10.style.borderColor=c10; b10.style.color=c10;
   b10.style.background=k10===0?'rgba(239,68,68,.1)':'rgba(59,130,246,.1)';
 }

 /* E3: Haftalık dinlenme geri sayımı */
 const cwSub = document.getElementById('c-w-sub');
 if(cwSub){
 const sinceWRsec = S.simMin - (S.lastWeeklyRestMin||0);
 const sixDayRemMin = Math.max(0, 8640 - sinceWRsec);
 if(sixDayRemMin < 1440){
 cwSub.textContent = '⚠ haf.din: ' + hm(sixDayRemMin);
 cwSub.style.color = sixDayRemMin<480 ? 'var(--LR)' : 'var(--LW)';
 } else {
 const _biRem = Math.max(0, BIWEEKLY_DRIVE_MAX-(S.weeklyDrv||0)-(S.prevWeekDrv||0));
 const _curWkMax = getWeeklyMax();
 const isKTYnow = typeof window._ktyMode !== 'undefined' && window._ktyMode;
 const _wLbl = (isKTYnow ? '🇹🇷 ' : '') + hm(_curWkMax);
 cwSub.textContent = 'maks ' + _wLbl + ' | 2hf↓' + hm(_biRem);
 cwSub.style.color = '';
 }
 }
 }

 /* Progress */
 const dp=Math.min(100,S.dailyDrv/S.dailyMax*100);
 const cp=Math.min(100,S.contDrv/CONT_DRIVE_LIMIT*100);
 const _rMax = (!window._ktyMode && S.useReducedRest) ? 540 : 660;
 const rp=Math.min(100,S.restDayAcc/_rMax*100);
 const wp=Math.min(100,S.weeklyDrv/dynWeekMax*100);
 function setPb(id,pp,col){const e=document.getElementById(id);if(e){e.style.width=pp+'%';e.style.background=col;}}
 function setPbp(id,pp){const e=document.getElementById(id);if(e)e.textContent=Math.round(pp)+'%';}
 setPb('pb-d',dp,barC(dp));setPbp('pb-dp',dp);
 setPb('pb-c',cp,barC(cp));setPbp('pb-cp',cp);
 setPb('pb-r',rp,rp>=100?'var(--LF)':rp>=80?'var(--LW)':'var(--LR)');setPbp('pb-rp',rp);
 setPb('pb-w',wp,barC(wp));setPbp('pb-wp',wp);

 /* Uyarılar */
 /* ── Uyarı hesaplama (aşağıda) ── */

 /* ── Uyarı & ihlal hesaplama ── */
 const sinceWRalert = S.simMin - (S.lastWeeklyRestMin||0);
 const restingOk = S.mode === 'rest' && S.restSes >= 45;
 const over = (
 S.dailyDrv > S.dailyMax ||
 S.contDrv > CONT_DRIVE_LIMIT ||
 S.weeklyDrv > dynWeekMax ||
 sinceWRalert > WEEKLY_REST_INTERVAL
 );
 const driving = S.mode === 'driving';
 const warn = (
 (driving && !restingOk && S.dailyDrv >= 480) ||
 (driving && S.contDrv >= 240) ||
 (driving && S.breakLeft <= 30) ||
 S.weeklyDrv >= dynWeekMax-300 ||
 sinceWRalert > WEEKLY_REST_INTERVAL-1440
 ) && !over;

 /* Mola gerekli: breakLeft=0 ama günlük limit DOLMADI (gerçek 45dk mola) */
 const breq = S.breakLeft <= 0 && S.mode === 'driving' && S.dailyDrv < S.dailyMax;
 /* Günlük dinlenme gerekli: günlük limit DOLDU */
 const dayDone = S.dailyDrv >= S.dailyMax && S.mode === 'driving';
 /* ↻ DİNLENME: sadece MOLA amaçlı rest'te (günlük limit dolmamışken) 45dk dolmadıysa */
 const rAct = S.mode === 'rest' && S.restSes > 0 && S.restSes < 45
 && S.dailyDrv < S.dailyMax
 && S.breakLeft < 270;
 function sh(id,v){const e=document.getElementById(id);if(e)e.style.display=v?'':'none';}
 sh('al-ok', !over && !warn && !breq && !dayDone && !rAct);
 sh('al-w', warn && !dayDone);
 sh('al-e', over);
 sh('al-b', breq);
 sh('al-day', dayDone);
 sh('al-r', rAct);
 sh('al-bp1', S.breakPart1Done && S.mode==='driving' && !dayDone); /* E5: bölünmüş mola 2.bölüm hatırlatıcı */

 const wl=document.getElementById('led-w');
 if(wl){
 const hasFlt=S.activeWarnings&&S.activeWarnings.some(w=>w.type==='fault');
 wl.className='led '+(hasFlt||over||breq||dayDone?'Lr blf':warn?'Ly bl':'Loff');
 wl.style.background='';
 }
 const rl=document.getElementById('led-rec');
 if(rl)rl.className='led '+(S.mode==='driving'?'Lr blf':'Lr bl');

 /* Özet */
 function sv(id,v){const e=document.getElementById(id);if(e)e.textContent=v;}
 sv('ts-d',hm(S.dailyDrv));sv('ts-c',hm(S.contDrv));sv('ts-r',hm(S.restDayAcc));sv('ts-b',hm(S.breakLeft));
 const tss=document.getElementById('ts-s');
 if(tss){
 if(over||breq){tss.textContent='İHLAL';tss.className='tsval tver';}
 else if(S.mode==='rest'&&S.restSes>=45){tss.textContent='DİNLENİYOR';tss.className='tsval tvr';}
 else if(warn){tss.textContent='UYARI';tss.className='tsval tvwn';}
 else{tss.textContent='UYUMLU';tss.className='tsval tvok';}
 }

 /* TL istatistik */
 sv('tls-d',hm(S.dailyDrv));sv('tls-r',hm(S.restDayAcc));
 sv('tls-a',hm(S.availAcc));
 /* İş istatistikleri — alt mod bazında */
 const wEl=document.getElementById('tls-w');
 if(wEl){
 const parts=[];
 if(S.workLoadAcc>0) parts.push(`<span style="color:var(--amber)">Yük:${hm(S.workLoadAcc)}</span>`);
 if(S.workUnldAcc>0) parts.push(`<span style="color:var(--cyan-light)">İnd:${hm(S.workUnldAcc)}</span>`);
 if(S.workBothAcc>0) parts.push(`<span style="color:var(--violet-light)">Y+İ:${hm(S.workBothAcc)}</span>`);
 if(S.workOtherAcc>0)parts.push(`<span style="color:#fb923c">İş:${hm(S.workOtherAcc)}</span>`);
 wEl.innerHTML=parts.length?parts.join(' '):`<span style="color:var(--amber)">0:00</span>`;
 }

 /* ── Counter — Kalan sürüş / kesintisiz / dinlenme / haftalık ── */
 const dynWkMax2 = getWeeklyMax();
 const vdoDrvRem = document.getElementById('vdo-drv-rem');
 const vdoBrkRem = document.getElementById('vdo-brk-rem');
 const vdoRstRem = document.getElementById('vdo-rst-rem');
 const vdoWklyRem = document.getElementById('vdo-wkly-rem');
 if(vdoDrvRem){
 const drvR = Math.max(0, S.dailyMax - S.dailyDrv);
 vdoDrvRem.textContent = hm(drvR);
 vdoDrvRem.style.color = drvR===0?'var(--LR)':drvR<=30?'#f97316':drvR<=60?'var(--LW)':'var(--LF)';
 }
 if(vdoBrkRem){
 /* Bölünmüş mola aktifse kalan 2.bölüm, değilse kalan kesintisiz kapasitesi */
 if(S.breakPart1Done){
 const restSoFar2 = S.mode==='rest'?S.restSes:0;
 const need2 = Math.max(0,30-restSoFar2);
 vdoBrkRem.textContent = need2>0?`2.bl:${hm(need2)}`:'✓2.bl';
 vdoBrkRem.style.color = need2>0?'var(--LW)':'var(--LF)';
 } else {
 vdoBrkRem.textContent = hm(S.breakLeft);
 vdoBrkRem.style.color = S.breakLeft===0?'var(--LR)':S.breakLeft<=30?'var(--LW)':'#a8d430';
 }
 }
 if(vdoRstRem){
 if(S.mode==='rest'){
 vdoRstRem.textContent = '+'+hm(S.restSes);
 vdoRstRem.style.color = S.restSes>=DAILY_REST_FULL?'#22c55e':S.restSes>=540?'#86efac':S.restSes>=45?'#60a5fa':'#94a3b8';
 } else {
 const needR = Math.max(0, 660-S.restSes);
 vdoRstRem.textContent = needR>0?hm(needR):'✓';
 vdoRstRem.style.color = needR>0?'#60a5fa':'#22c55e';
 }
 }
 if(vdoWklyRem){
 const wkR = Math.max(0, dynWkMax2 - S.weeklyDrv);
 const ardasikSayi = S.reducedInRow||0;
 const ardasikLbl = ardasikSayi>0?`(${ardasikSayi}kısa)`:'';
 vdoWklyRem.textContent = wkR===0?`DOLDU${ardasikLbl?'·'+ardasikLbl:''}`:hm(wkR)+(ardasikLbl?'·'+ardasikLbl:'');
 vdoWklyRem.style.color = wkR===0?'var(--LR)':wkR<=120?'var(--LW)':ardasikSayi>0?'#f97316':'#c084fc';
 vdoWklyRem.title = wkR===0?`Haftalık limit doldu! 45sa tam dinlenme zorunlu.`:
 `Kalan haftalık sürüş: ${hm(wkR)} / ${hm(dynWkMax2)}${ardasikSayi>0?' | '+ardasikSayi+' ardışık kısaltılmış haftalık':''}`;
 }
 /* Bölünmüş mola / telafi borcu göstergesi */
 const bpInd = document.getElementById('break-part-ind');
 if(bpInd){
 if(S.breakPart1Done){
 bpInd.style.display='block';
 bpInd.style.borderLeftColor='var(--LW)';
 bpInd.style.color='var(--LW)';
 bpInd.textContent=`⏳ Bölünmüş mola: 1.bölüm ${hm(S.breakPart1Min)} ✓ → ≥30dk 2.bölüm gerekli`;
 } else if((S.weeklyDeficit||0)>0){
 bpInd.style.display='block';
 bpInd.style.borderLeftColor='#f97316';
 bpInd.style.color='#f97316';
 bpInd.textContent=`⚠ Telafi borcu: ${hm(S.weeklyDeficit)} — 3.hafta sonuna kadar ≥9sa din.ye eklenmeli (araç dışı!)`;
 } else {
 bpInd.style.display='none';
 }
 }

 /* Özet paneli güncelle */
 const sumSpeedLim=document.getElementById('summary-speed-limit');
 if(sumSpeedLim)sumSpeedLim.textContent=(S.speedLimit||90)+' km/h';
 const sumViol=document.getElementById('summary-violations');
 if(sumViol)sumViol.textContent=S.speedViolations||0;
 const sumWarn=document.getElementById('summary-warnings');
 if(sumWarn)sumWarn.textContent=S.warnCount||0;
 const sumGnss=document.getElementById('summary-gnss');
 if(sumGnss){sumGnss.textContent=_tr(S.gnssOk?'AKTİF ✓':'SİNYAL YOK ✗');sumGnss.style.color=S.gnssOk?'#22c55e':'#ef4444';}
 const sumOpmode=document.getElementById('summary-opmode');
 if(sumOpmode){
 const modeLabels={driving:_tr('SÜRÜCÜ'),company:'ŞİRKET',control:'KONTROL',calibration:'KALİBRASYON'};
 sumOpmode.textContent=modeLabels[S.operationMode]||S.operationMode.toUpperCase();
 sumOpmode.style.color=S.operationMode==='company'?'#f59e0b':S.operationMode==='control'?'#38bdf8':'#22c55e';
 }
 const sumUtc=document.getElementById('summary-utc');
 if(sumUtc){
 const h=Math.floor((S.utcOffsetMin||180)/60),m=(S.utcOffsetMin||180)%60;
 sumUtc.textContent=`+${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
 }
 /* Cihaz brand label güncelle */
 const devBrand=document.getElementById('dev-brand-lbl');
 if(devBrand){
 if(S.operationMode==='company'){
 devBrand.textContent='— | 🏢 ŞİRKET MODU | Veri İndirme Aktif';
 } else if(window._ktyMode){
 devBrand.textContent='🇹🇷 KTY MODU | Türkiye İç Hat | Takograf';
 } else {
 devBrand.textContent='🇪🇺 AB 561/2006 | Uluslararası | Takograf';
 }
 }
 /* Takograf variant LCD badge */
 const dvb=document.getElementById('dtco-variant-badge');
 if(dvb){
 const isOsnma=S.osnmaActive;
 const isTransition=(S.dtcoVariant||'4.1b').includes('T');
 dvb.textContent=S.dtcoVariant||'4.1b';
 dvb.style.background=isOsnma&&!isTransition?'rgba(167,139,252,.15)':'rgba(245,158,11,.15)';
 dvb.style.color=isOsnma&&!isTransition?'#a78bfa':'#f59e0b';
 dvb.style.border='1px solid '+(isOsnma&&!isTransition?'#a78bfa':'#f59e0b');
 dvb.title=`Takograf ${S.dtcoVariant||'4.1b'} — ${isOsnma?'OSNMA Galileo doğrulama AKTİF':'Geçiş versiyonu — OSNMA yok'}`;
 }
 /* FAZ A: G2V2 özet alanları */
 const sumDtco=document.getElementById('summary-dtco');
 if(sumDtco){sumDtco.textContent=`${S.dtcoVariant||'4.1b'} ${S.osnmaActive?'🔒':'🔓'}`;sumDtco.style.color=S.osnmaActive?'#a78bfa':'#f59e0b';}
 const sumCardgen=document.getElementById('summary-cardgen');
 if(sumCardgen){sumCardgen.textContent=S.cardGen||'G2V2';sumCardgen.style.color=S.cardGen==='G2V2'?'#a78bfa':S.cardGen==='G2V1'?'#f59e0b':'#ef4444';}
 const sumStorage=document.getElementById('summary-storage');
 if(sumStorage){sumStorage.textContent=`${S.storageDays||56} gün`;sumStorage.style.color=(S.storageDays||56)>=56?'#22c55e':'#f59e0b';}
 const sumPos=document.getElementById('summary-positions');
 if(sumPos){sumPos.textContent=(S.positionLog||[]).length;sumPos.style.color=(S.positionLog||[]).length>0?'#a78bfa':'#42506a';}
 const sumBorder=document.getElementById('summary-borders');
 if(sumBorder){sumBorder.textContent=(S.borderLog||[]).length;sumBorder.style.color=(S.borderLog||[]).length>0?'#22c55e':'#42506a';}
 const sumCargo=document.getElementById('summary-cargo');
 if(sumCargo){sumCargo.textContent=S.cargoType==='passengers'?'👥 Yolcu':'📦 Mal';}
 /* Hız sınırı etiketi */
 const sll=document.getElementById('speed-limit-lbl');
 if(sll)sll.textContent=S.speedLimit||90;
 /* Arıza paneli güncelle */
 updateFaultPanel();
 /* Quick-bar aktif state güncelle */
 _renderQuickStrip();
 updateDrvPanel();
}

/* ═══ SÜRÜŞ BİLGİ PANELİ ═══ */
function updateDrvPanel(){
 /* Yardımcılar */
 function setVal(id,txt,cls){
 const e=document.getElementById(id);if(!e)return;
 e.textContent=txt;
 if(cls!==undefined){e.className=e.className.replace(/\bcv-\w+/g,'');e.classList.add(cls);}
 }
 function setNote(id,txt,cls){
 const e=document.getElementById(id);if(!e)return;
 e.textContent=txt;
 e.className=e.className.replace(/\bcn-\w+/g,'');if(cls)e.classList.add(cls);
 }
 function setBar(id,pct,col){
 const e=document.getElementById(id);if(!e)return;
 e.style.width=Math.min(100,Math.max(0,pct))+'%';
 e.style.background=col;
 }
 function setCard(id,level){
 const e=document.getElementById(id);if(!e)return;
 e.className=e.className.replace(/\bdic-\w+/g,'');
 e.classList.add('di-card','dic-'+level);
 if(id==='dic-rest')e.classList.add('di-card-rest');
 if(id==='dic-next')e.classList.add('di-card-next');
 }

 const isDriving = S.mode==='driving';
 const isResting = S.mode==='rest';
 const restDone9 = S.restSes>=540;
 const restDone11 = S.restSes>=DAILY_REST_FULL;
 const restDone45m = S.restSes>=45;

 /* ── MOD ROZET ── */
 const badge=document.getElementById('di-mode-badge');
 if(badge){
 const mlbl={driving:'SÜRÜŞ',rest:'DİNLENME',work:'DİĞER İŞ',available:'UYGUNLUK'};
 const mcls ={driving:'dmb-d',rest:'dmb-r',work:'dmb-w',available:'dmb-a'};
 badge.textContent=mlbl[S.mode]||S.mode;
 badge.className='di-mode-badge '+(mcls[S.mode]||'dmb-r');
 }

 /* ── GÜNLÜK SÜRÜŞ ── */
 const dailyRem = Math.max(0, S.dailyMax-S.dailyDrv);
 const dailyPct = Math.min(100, S.dailyDrv/S.dailyMax*100);
 const dailyCol = dailyPct>=100?'#ff3020':dailyPct>=90?'#f5a200':dailyPct>=75?'#fbbf24':'#22c55e';
 const dailyLimLbl = S.dailyMax===600?'/ 10:00 ⬆':S.extDayCount===2?'/ 9:00 (uzatma hakkı yok)':'/ 9:00';
 const dlim=document.querySelector('#dic-daily .di-card-lim');if(dlim)dlim.textContent=dailyLimLbl;
 setVal('div-daily', hm(S.dailyDrv), dailyPct>=100?'cv-err':dailyPct>=75?'cv-warn':'cv-ok');
 setBar('dib-daily', dailyPct, dailyCol);
 document.getElementById('dir-daily').textContent = hm(dailyRem);
 /* 24 saatlik pencere takibi */
 const elapsed24 = S.simMin - (S.lastDailyRestEnd||0);
 const remain24 = Math.max(0, 1440 - elapsed24);
 const win24note = elapsed24 >= 1200 ? ` | ⚠ 24sa: ${hm(remain24)} kaldı` :
 elapsed24 >= 840 ? ` | 24sa: ${hm(remain24)} kaldı` : '';

 if(S.dailyDrv>S.dailyMax){
 setNote('din-daily',`⛔ ${hm(S.dailyMax)} günlük limit AŞILDI! Dinlenme başlatın.${win24note}`,'cn-err');setCard('dic-daily','err');
 } else if(remain24<120&&!isResting){
 setNote('din-daily',`⚠ 24sa pencere doluyor — ${hm(remain24)} içinde din. başlatılmalı!`,'cn-err');setCard('dic-daily','err');
 } else if(S.dailyDrv>=480){
 const extHint=S.dailyMax===540&&S.extDayCount<2?' (10sa uzatma hakkı mevcut)':'';
 setNote('din-daily',`⚠ ${hm(dailyRem)} kaldı${extHint}${win24note}`,'cn-warn');setCard('dic-daily','warn');
 } else if(isResting&&restDone9){
 setNote('din-daily',`✓ Günlük din. tamamlandı. Yeni 24sa pencere başladı.`,'cn-ok');setCard('dic-daily','normal');
 } else if(isResting){
 setNote('din-daily','Dinlenme devam ediyor — sayaç sıfırlanacak.','cn-ok');setCard('dic-daily','normal');
 } else {
 const extNote=S.dailyMax===600?` [UZATILMIŞ ${S.extDayCount}/2]`:S.extDayCount<2?` (${2-S.extDayCount} uzatma hakkı)`:' (uzatma yok)';
 setNote('din-daily',`${hm(dailyRem)} daha sürülebilir${extNote}${win24note}`);setCard('dic-daily','normal');
 }

 /* ── KESİNTİSİZ SÜRÜŞ ── */
 const contRem = Math.max(0, 270-S.contDrv);
 const contPct = Math.min(100, S.contDrv/CONT_DRIVE_LIMIT*100);
 const contCol = contPct>=100?'#ff3020':contPct>=90?'#f5a200':contPct>=75?'#fbbf24':'#22c55e';
 setVal('div-cont', hm(S.contDrv), contPct>=100?'cv-err':contPct>=75?'cv-warn':'cv-ok');
 setBar('dib-cont', contPct, contCol);
 document.getElementById('dir-cont').textContent = hm(contRem);
 if(S.contDrv>=270){
 setNote('din-cont','⚠ 4:30 kesintisiz limit aşıldı — MOLA VER!','cn-err');setCard('dic-cont','err');
 } else if(S.contDrv>=240){
 setNote('din-cont',`${hm(contRem)} kaldı — mola planla`,'cn-warn');setCard('dic-cont','warn');
 } else if(isResting&&restDone45m){
 setNote('din-cont','✓ Mola tamamlandı — kesintisiz sayaç sıfırlandı','cn-ok');setCard('dic-cont','normal');
 } else if(isResting&&S.restSes>0){
 setNote('din-cont',`Mola için ${hm(45-S.restSes)} daha gerekli`,'cn-warn');setCard('dic-cont','warn');
 } else {
 setNote('din-cont',`${hm(contRem)} kesintisiz sürüş yapılabilir`);setCard('dic-cont','normal');
 }

 /* ── MOLA KAPASİTESİ (breakLeft) ── */
 /* breakLeft: sürücünün bir sonraki molaya kadar yapabileceği sürüş kapasitesi dk.
 Sürüş sırasında azalır. 45dk dinlenme ile 270'e (4:30) restore edilir.
 Günlük dinlenme sonrası da restore edilir çünkü yeni gün başlıyor. */
 const blPct = Math.min(100, S.breakLeft/270*100); /* ne kadar dolu */
 const blUsed = 270-S.breakLeft; /* ne kadar tükendi */
 const blCol = blPct<=0?'#ff3020':blPct<=20?'#f5a200':blPct<=50?'#fbbf24':'#22c55e';
 setVal('div-break', hm(S.breakLeft), blPct<=0?'cv-err':blPct<=20?'cv-warn':'cv-ok');
 setBar('dib-break', blPct, blCol);
 document.getElementById('dir-break').textContent = hm(blUsed);
 if(S.breakLeft<=0&&isDriving){
 setNote('din-break','⚠ Kapasite bitti — 45dk mola zorunlu!','cn-err');setCard('dic-break','err');
 } else if(S.breakLeft<=0){
 setNote('din-break','Kapasite sıfır — sürüşe başlamak için önce 45dk mola ver');setCard('dic-break','err');
 } else if(S.breakLeft<=30){
 setNote('din-break',`${hm(S.breakLeft)} kaldı — mola planla`,'cn-warn');setCard('dic-break','warn');
 } else if(isResting&&restDone45m){
 setNote('din-break','✓ 45dk mola: kapasite tam 4:30\'a yenilendi','cn-ok');setCard('dic-break','normal');
 } else if(isResting&&S.restSes>0&&S.restSes<45){
 setNote('din-break',`Mola devam ediyor — ${hm(45-S.restSes)} sonra yenilenecek`);setCard('dic-break','normal');
 } else {
 setNote('din-break',`${hm(S.breakLeft)} sürüş kapasitesi mevcut`);setCard('dic-break','normal');
 }

 /* ── HAFTALIK SÜRÜŞ ── */
 /* 2 haftalık: bu haftanın dinamik limiti = 90sa - önceki hafta */
 const dynamicWeekMax = getWeeklyMax(); /* min 34sa, max 56sa */
 const weekRem = Math.max(0, dynamicWeekMax-S.weeklyDrv);
 const weekPct = Math.min(100, S.weeklyDrv/dynamicWeekMax*100);
 const weekCol = weekPct>=100?'#ff3020':weekPct>=90?'#f5a200':weekPct>=75?'#fbbf24':'#22c55e';
 setVal('div-week', hm(S.weeklyDrv), weekPct>=100?'cv-err':weekPct>=75?'cv-warn':'cv-ok');
 setBar('dib-week', weekPct, weekCol);
 document.getElementById('dir-week').textContent = hm(weekRem);
 /* 2 haftalık toplam */
 const biWeekTotal=(S.weeklyDrv)+(S.prevWeekDrv||0);
 /* 6×24sa periyot: son haftalık dinlenmeden bu yana */
 const sinceWR = S.simMin - (S.lastWeeklyRestMin||0);
 const sixDayMax = 8640; /* 6×24×60 dk */
 const sinceWRrem = Math.max(0, sixDayMax-sinceWR);
 const wlim = document.querySelector('#dic-week .di-card-lim');
 const prevNote = S.prevWeekDrv>0?` | Önceki: ${hm(S.prevWeekDrv)}`:'' ;
 /* Haftalık kart alt bilgisi */
 const fullMark=S.hadFullWeeklyRest?'✓':'⚠ TAM GEREKLİ';
 const defMark=S.weeklyDeficit>0?` | Telafi: ${hm(S.weeklyDeficit)}`:'';
 const redMark=S.reducedInRow>0?` | Kısaltılmış: ${S.reducedInRow}×`:'';
 if(wlim) wlim.textContent=`/ ${hm(dynamicWeekMax)} | 2hf: ${hm(biWeekTotal)}/90:00${prevNote} | ${fullMark}${defMark}${redMark}`;
 /* Haftalık kart bilgisi */
 const fullReqNote = !S.hadFullWeeklyRest ? ' | ⚠ 45sa TAM din. zorunlu!' : (S.reducedInRow>=2?' | ⚠ Sonraki MUTLAKA 45sa!':'');
 const defNote2 = S.weeklyDeficit>0 ? ` | Telafi borcu: ${hm(S.weeklyDeficit)}` : '';
 if(S.weeklyDrv>=dynamicWeekMax){
 const mustFull=!S.hadFullWeeklyRest?' — 45sa TAM zorunlu!':' (24sa kısaltılmış veya 45sa tam alınabilir)';
 setNote('din-week',`⛔ HAFTALIK LİMİT DOLDU (${hm(dynamicWeekMax)})! Sürüş yasak. Dinlenme başlatılmalı${mustFull}`,'cn-err');setCard('dic-week','err');
 } else if(sinceWR>sixDayMax-120){
 setNote('din-week',`⛔ 6×24sa PERİYOT! ${hm(sinceWRrem)} içinde haftalık dinlenme zorunlu!${fullReqNote}`,'cn-err');setCard('dic-week','err');
 } else if(sinceWR>sixDayMax-1440){
 setNote('din-week',`⚠ Haftalık din. yaklaşıyor — ${hm(sinceWRrem)} içinde başlatılmalı.${fullReqNote}${defNote2}`,'cn-warn');setCard('dic-week','warn');
 } else if(S.weeklyDrv>=dynamicWeekMax-300){
 setNote('din-week',`⚠ ${hm(weekRem)} kaldı — haftalık dinlenme planla.${fullReqNote}${defNote2}`,'cn-warn');setCard('dic-week','warn');
 } else if(biWeekTotal>=5040){
 setNote('din-week',`⚠ 2 haftalık: ${hm(biWeekTotal)}/90:00 (dikkat!)${defNote2}${fullReqNote}`,'cn-warn');setCard('dic-week','warn');
 } else {
 const sinceNote=sinceWR>0?` | Son haf.din: ${hm(sinceWR)} önce`:'';
 setNote('din-week',`${hm(weekRem)} kaldı${sinceNote}${defNote2}${fullReqNote}`);setCard('dic-week','normal');
 }

 /* ── DİNLENME DURUMU — Dinamik hedef ──
 Öncelik sırası (yüksekten düşüğe):
 1. Haftalık limit doldu (weeklyDrv >= dynMax) → 45sa tam haftalık zorunlu
 2. 6×24sa periyot bitiyor (sinceWR > 7200) → 45sa haftalık
 3. Telafi borcu varken 45sa+ dinleniyorsa → 45sa + borç
 4. 24sa+ dinleniyorsa → 45sa haftalık
 5. Kısaltılmış günlük hakkı doldu → 11sa tam zorunlu
 6. Günlük 8sa+ → 11sa günlük
 7. Aksi → 45dk mola
 */
 const dynamicWeekMax2 = dynamicWeekMax; /* alias, zaten hesaplandı */
 const weeklyLimitReached = S.weeklyDrv >= dynamicWeekMax2;
 const needWeeklyRest = sinceWR > sixDayMax - 2880 || weeklyLimitReached;
 const hasCompensation = S.weeklyDeficit > 0;

 let restTarget, restTargetLbl;

 if(weeklyLimitReached && !isResting){
 /* Haftalık limit doldu — DİNLENME ZORUNLU */
 restTarget=2700; restTargetLbl='🔴 HAF.LİMİT DOLDU — 45sa+ dinlenme zorunlu!';
 } else if(weeklyLimitReached && isResting && S.restSes>=1440){
 /* Haftalık limit doldu, dinlenme devam ediyor */
 if(hasCompensation){const t=2700+S.weeklyDeficit;restTarget=t;restTargetLbl=`hedef: 45sa + ${hm(S.weeklyDeficit)} telafi = ${hm(t)}`;}
 else{restTarget=2700;restTargetLbl='hedef: 45sa tam haftalık (limit dolmuştu)';}
 } else if(isResting && S.restSes >= 1440) {
 /* 24sa+ dinleniyor — haftalık dinlenme modunda */
 if(hasCompensation){const t=2700+S.weeklyDeficit;restTarget=t;restTargetLbl=`hedef: 45sa + ${hm(S.weeklyDeficit)} telafi = ${hm(t)}`;}
 else{restTarget=2700;restTargetLbl='hedef: 45sa tam haftalık';}
 } else if(needWeeklyRest) {
 restTarget=2700; restTargetLbl='⚠ hedef: 45sa haftalık (yaklaşıyor)';
 } else if(S.splitRestCount >= 3) {
 /* İki haftalık periyotta 3× kısaltılmış hakkı doldu → 11sa zorunlu */
 restTarget=660; restTargetLbl='⚠ hedef: 11sa TAM (3× kısaltılmış hakkı doldu)';
 } else if(S.dailyDrv >= 480 || (!isResting && S.restDayAcc < 540)) {
 restTarget=660; restTargetLbl='hedef: 11sa günlük';
 } else {
 restTarget=45; restTargetLbl='hedef: 45dk mola';
 }
 const restPct = Math.min(100, S.restSes/restTarget*100);
 const restRem = Math.max(0, restTarget-S.restSes);
 const restCol = restPct>=100?'#22c55e':restPct>=60?'#3b82f6':'#1e40af';
 const rtEl=document.getElementById('di-rest-target');if(rtEl)rtEl.textContent=restTargetLbl;
 setVal('div-rest', hm(S.restSes), restPct>=100?'cv-ok':'cv-rest');
 setBar('dib-rest', restPct, restCol);
 document.getElementById('dir-rest').textContent = restRem>0?hm(restRem):'—';
 /* Dinlenme durum mesajı */
 if(!isResting && S.weeklyDrv>=dynamicWeekMax){
 /* Haftalık limit doldu ve dinlenmiyoruz — kırmızı kritik uyarı */
 const mustFull=!S.hadFullWeeklyRest?' 45sa TAM zorunlu (bu pencerede tam din. yok)!':'24sa kısaltılmış veya 45sa tam başlatılmalı.';
 setNote('din-rest',`⛔ HAFTALIK SINIR DOLDU — DİNLENME BAŞLAT! ${mustFull}`,'cn-err');
 } else if(!isResting&&S.restSes===0){
 setNote('din-rest','Henüz dinlenme başlamadı');
 } else if(S.restSes>=2700){
 if(S.weeklyDeficit>0){
 const t=2700+S.weeklyDeficit;
 setNote('din-rest',`✓ 45sa geçildi — ⚠ Telafi: ${hm(S.weeklyDeficit)} borç. Toplam ${hm(t)} gerekli. ⚠ Araçta alınamaz — uygun konaklamada tek blok olarak alın!`,isResting?'cn-warn':'cn-ok');
 } else {
 const rdynM=getWeeklyMax(); setNote('din-rest',`✓ 45sa tam haftalık din. tamamlandı. Yeni hafta maks: ${hm(rdynM)} sürüş. Sayaçlar sıfırlandı.`,'cn-ok');
 }
 } else if(S.restSes>=1440&&isResting){
 const deficit=2700-S.restSes;
 const ardisik=(S.reducedInRow||0);
 const exitWarn=!S.hadFullWeeklyRest?` ⚠ Bu pencerede tam YOK — çıkılırsa ${ardisik+1}. ardışık kısaltılmış! Uluslararasında max 2 ardışık, ulusalda 1.`:'';
 const aractaUyari=' ⚠ 45sa+ tam din. araçta alınamaz — uygun konaklama gerekli.';
 setNote('din-rest',`↻ Kısaltılmış haftalık bölgesi (${hm(S.restSes)}) — 45sa'ya ${hm(deficit)} kaldı. Çıkarsan ${hm(deficit)} telafi borcu.${exitWarn}${deficit<=1440?aractaUyari:''}`,'cn-warn');
 } else if(S.restSes>=DAILY_REST_FULL){
 setNote('din-rest',`✓ 11sa tam günlük din. — Son haf.din: ${hm(sinceWR)} önce. 6×24sa kalan: ${hm(sinceWRrem)}`,'cn-ok');
 } else if(S.restSes>=540){
 const rem3=S.splitRestCount<3?`${3-S.splitRestCount} hak kaldı`:'⚠ DOLDU — 11sa zorunlu!';
 setNote('din-rest',`✓ 9sa kısaltılmış günlük (${rem3}) — günlük din. için telafi yoktur.`,'cn-ok');
 } else if(S.restSes>=180&&isResting){
 setNote('din-rest','↻ 3sa bölünmüş 1.bölüm ✓ — aktivite alınabilir, sonra ≥9sa 2.bölüm gerekli.','cn-ok');
 } else if(S.restSes>=45){
 setNote('din-rest',`✓ Mola tamam (${hm(S.restSes)}) — 9sa için ${hm(540-S.restSes)}, 11sa için ${hm(660-S.restSes)} daha`,'cn-ok');
 } else if(S.restSes>0){
 setNote('din-rest',`Mola için ${hm(45-S.restSes)} daha gerekli`,'cn-warn');
 } else {
 setNote('din-rest','Son din. oturumundan bu yana aktivite var');
 }

 /* ── SONRAKİ ZORUNLU İŞLEM ── */
 const nextEl = document.getElementById('div-next');
 const noteEl = document.getElementById('din-next');
 const typeEl = document.getElementById('di-next-type');
 if(!nextEl||!noteEl||!typeEl)return;

 if(S.mode==='driving'||S.mode==='work'||S.mode==='available'){
 if(S.breakLeft<=0){
 /* Hemen mola! */
 typeEl.textContent='MOLA';nextEl.textContent='ŞİMDİ';nextEl.className='di-card-val di-next-val cv-err';
 noteEl.textContent='Mola kapasitesi bitti. 45dk kesintisiz dinlenme gerekli.';
 } else if(S.contDrv>=240){
 typeEl.textContent='MOLA UYARISI';nextEl.textContent=hm(270-S.contDrv)+' sonra';nextEl.className='di-card-val di-next-val cv-warn';
 noteEl.textContent=`${hm(270-S.contDrv)} sürüş sonrası 45dk kesintisiz mola zorunlu.`;
 } else if(S.dailyDrv>=480){
 typeEl.textContent='GÜNLÜK DİNLENME';nextEl.textContent=hm(540-S.dailyDrv)+' sonra';nextEl.className='di-card-val di-next-val cv-warn';
 noteEl.textContent=`${hm(540-S.dailyDrv)} sürüş sonra 9sa+ günlük dinlenme.`;
 } else {
 /* İkisi de güvenli — en yakın eşik hangisi? */
 const toBreak = S.breakLeft;
 const toCont = Math.max(0,270-S.contDrv);
 const toDaily = Math.max(0,S.dailyMax-S.dailyDrv);
 const dynM = getWeeklyMax();
 const toWeekly = Math.max(0,dynM-S.weeklyDrv);
 const to6day = Math.max(0,8640-(S.simMin-(S.lastWeeklyRestMin||0)));
 const mustFull = !S.hadFullWeeklyRest;
 const weeklyRestType = mustFull?'45sa TAM zorunlu!':'24sa kısaltılmış veya 45sa tam';
 /* Haftalık limit dolduysa en yüksek öncelik */
 if(S.weeklyDrv>=dynM){
 typeEl.textContent='⛔ HAFTALIK DİNLENME';nextEl.textContent='HEMEN';nextEl.className='di-card-val di-next-val cv-err';
 noteEl.textContent=`Haftalık ${hm(dynM)} sınırı doldu! SÜRÜŞ YASAK. ${weeklyRestType} başlatılmalı.`;
 } else if(to6day<=1440){
 typeEl.textContent='⚠ HAF.DİN ZORUNLU';nextEl.textContent=hm(to6day)+' içinde';nextEl.className='di-card-val di-next-val cv-err';
 noteEl.textContent=`6×24sa periyot doluyor! ${hm(to6day)} içinde haftalık dinlenme başlatılmalı. ${weeklyRestType}.`;
 } else if(S.weeklyDrv>=dynM-300){
 typeEl.textContent='HAF. DİNLENME';nextEl.textContent=hm(toWeekly)+' sonra';nextEl.className='di-card-val di-next-val cv-warn';
 noteEl.textContent=`Haftalık ${hm(dynM)} limitine ${hm(toWeekly)} kaldı. ${weeklyRestType} planla.${S.weeklyDeficit>0?' Telafi borcu: '+hm(S.weeklyDeficit):''}`;
 } else {
 const next=Math.min(toBreak,toCont,toDaily);
 if(next===toBreak&&next===toCont){
 typeEl.textContent='ZORUNLU MOLA';nextEl.textContent=hm(next)+' sonra';nextEl.className='di-card-val di-next-val cv-ok';
 noteEl.textContent=`${hm(next)} sürüş sonrası mola kapasitesi ve kesintisiz limit birlikte dolacak.`;
 } else if(next===toDaily){
 typeEl.textContent='GÜNLÜK LİMİT';nextEl.textContent=hm(next)+' sonra';nextEl.className='di-card-val di-next-val cv-ok';
 noteEl.textContent=`${hm(next)} sürüş sonra günlük ${hm(S.dailyMax)} limit dolacak — günlük din. gerekli.`;
 } else if(next===toCont){
 typeEl.textContent='KESİNTİSİZ';nextEl.textContent=hm(next)+' sonra';nextEl.className='di-card-val di-next-val cv-ok';
 noteEl.textContent=`${hm(next)} sürüş sonra 4:30 kesintisiz limit dolacak — 45dk mola gerekecek.`;
 } else {
 typeEl.textContent='MOLA KAPASİTESİ';nextEl.textContent=hm(next)+' sonra';nextEl.className='di-card-val di-next-val cv-ok';
 noteEl.textContent=`${hm(next)} sürüş sonra mola kapasitesi bitecek.`;
 }
 }
 }
 } else {
 /* Dinlenme modu */
 if(S.restSes>=2700){
 typeEl.textContent='HAZIR';nextEl.textContent='SÜRÜŞ BAŞLAYABİLİR';nextEl.className='di-card-val di-next-val cv-ok';
 nextEl.style.fontSize='1rem';
 const dynMw45=getWeeklyMax();
 const compNote=S.weeklyDeficit>0?` ⚠ Telafi borcu: ${hm(S.weeklyDeficit)} — 3.hafta sonuna kadar ek dinlemeye eklenmeli!`:' Telafi borcu yok.';
 noteEl.textContent=`✓ 45sa tam haftalık din. tamamlandı. Bu hafta max ${hm(dynMw45)} sürüş.${compNote}`;
 } else if(S.restSes>=DAILY_REST_FULL){
 /* 11sa tam günlük — ama haftalık limit dolduysa SÜRÜŞ YASAKTIUR */
 const dynMw=getWeeklyMax();
 if(S.weeklyDrv>=dynMw){
 typeEl.textContent='⛔ HAFTALIK SINIR';nextEl.textContent='SÜRÜŞ YASAK';nextEl.className='di-card-val di-next-val cv-err';
 nextEl.style.fontSize='1.1rem';
 const kalan=2700-S.restSes;
 noteEl.textContent=`Haftalık ${hm(dynMw)} sınırı doldu! 11sa yetersiz — 45sa tam haftalık din. zorunlu. ${hm(kalan)} daha gerekli.`;
 } else {
 typeEl.textContent='HAZIR';nextEl.textContent='SÜRÜŞ BAŞLAYABİLİR';nextEl.className='di-card-val di-next-val cv-ok';
 nextEl.style.fontSize='1rem';
 noteEl.textContent=`Tam günlük din. tamamlandı. Max ${hm(S.dailyMax)} sürüş + 4:30 kesintisiz kapasite.`;
 }
 } else if(S.restSes>=540){
 /* 9sa kısaltılmış — haftalık limit dolduysa sürüş yasak */
 const dynMw=getWeeklyMax();
 if(S.weeklyDrv>=dynMw){
 typeEl.textContent='⛔ HAFTALIK SINIR';nextEl.textContent='SÜRÜŞ YASAK';nextEl.className='di-card-val di-next-val cv-err';
 nextEl.style.fontSize='1.1rem';
 const kalan=2700-S.restSes;
 noteEl.textContent=`Haftalık ${hm(dynMw)} sınırı doldu! 9sa yetersiz — 45sa tam haftalık zorunlu. ${hm(kalan)} daha gerekli.`;
 } else {
 typeEl.textContent='HAZIR (KIS.)';nextEl.textContent='SÜRÜŞ BAŞLAYABİLİR';nextEl.className='di-card-val di-next-val cv-ok';
 nextEl.style.fontSize='1rem';
 noteEl.textContent=`9sa kısaltılmış günlük din. tamamlandı (${S.splitRestCount||0}/3 bu hafta).`;
 }
 } else if(S.restSes>=45){
 typeEl.textContent='MOLA TAMAM';nextEl.textContent=hm(540-S.restSes)+' daha (9sa)';nextEl.className='di-card-val di-next-val cv-rest';
 noteEl.textContent=`Mola geçerli. Kısaltılmış için ${hm(540-S.restSes)}, tam için ${hm(660-S.restSes)} daha gerekli.`;
 } else if(S.restSes>0){
 if(S.dailyDrv >= S.dailyMax){
 /* Günlük dinlenme — 45dk mola değil */
 const minR = (!window._ktyMode && S.useReducedRest) ? 540 : 660;
 typeEl.textContent='GÜNLÜK DİNLENME';
 nextEl.textContent=hm(minR-S.restSes)+' kaldı';
 nextEl.className='di-card-val di-next-val cv-rest';
 noteEl.textContent=`Günlük din. devam ediyor. ${S.useReducedRest?'9sa (kısaltılmış)':'11sa tam'} için ${hm(minR-S.restSes)} daha gerekli.`;
 } else {
 typeEl.textContent='MOLA DEVAM';nextEl.textContent=hm(45-S.restSes)+' kaldı';nextEl.className='di-card-val di-next-val cv-warn';
 noteEl.textContent=`Mola geçerli sayılması için ${hm(45-S.restSes)} daha kesintisiz dinlenme.`;
 }
 } else {
 typeEl.textContent='—';nextEl.textContent='—';nextEl.className='di-card-val di-next-val cv-dim';
 nextEl.style.fontSize='2.2rem';
 noteEl.textContent='Dinlenme modu başlatıldığında hesaplanır.';
 }
 }
} /* end updateDrvPanel */

/* ZAMANÇİZELGESİ */
function renderTL(){
 /* ═══════════════════════════════════════════════════════════════ */
 const container = document.getElementById('tl-multiday');
 if(!container) return;
 container.innerHTML = '';

 const segColor={
 driving:'#22c55e', rest:'#3b82f6', available:'#a855f7',
 loading:'#f59e0b', unloading:'#38bdf8', both:'#a78bfa', otherwork:'#fb923c'
 };
 const segLbl={
 driving:'Sürüş', rest:'Din./Mola', available:'Uygunluk',
 loading:'Yükleme', unloading:'İndirme', both:'Yük+İnd', otherwork:'Genel İş'
 };

 if(!S.allSegs || S.allSegs.length===0){
 const simStartMidnight0 = new Date(SIM_START);
 simStartMidnight0.setHours(0,0,0,0);
 const _dayStartMin = (simStartMidnight0 - SIM_START) / 60000; /* örn. 08:00 başlangıç → -480 */
 const row = makeDayRow(0, new Date(SIM_START), [], _dayStartMin, _dayStartMin+1440, S.simMin, true, segColor, segLbl);
 container.appendChild(row);
 return;
 }

 /* Simülasyonun toplam süresine göre kaç gün var? */
 /* SIM_START'tan itibaren gerçek tarih bilgisi */
 const totalMins = S.simMin;
 
 /* Kaç takvim günü var? */
 const simEndDt = simDateTime(); /* S.simMin anındaki tarih */
 const simStartMidnight = new Date(SIM_START);
 simStartMidnight.setHours(0,0,0,0);
 const simEndMidnight = new Date(simEndDt);
 simEndMidnight.setHours(0,0,0,0);
 const dayCount = Math.floor((simEndMidnight - simStartMidnight) / 86400000) + 1;
 /* Zoom moduna göre gösterilecek gün sayısı */
 const zoomDays = _tlZoom === 'day' ? 1 : _tlZoom === '2week' ? 14 : 7;
 const numDays = Math.max(1, Math.min(dayCount, zoomDays));

 const DAYS_TR = ['Paz','Pzt','Sal','Çar','Per','Cum','Cmt'];

 for(let d=0; d<numDays; d++){
 /* Bu günün simMin aralığı */
 const dayStartMs = new Date(simStartMidnight.getTime() + d*86400000);
 const dayEndMs = new Date(dayStartMs.getTime() + 86400000);
 
 /* simMin cinsinden bu günün başlangıç ve bitişi */
 const dayStartMin = (dayStartMs - SIM_START) / 60000;
 const dayEndMin = dayStartMin + 1440;
 
 /* Bu güne ait segmentleri bul — startMin veya abs field'ı destekle */
 const allSegsArr = S.allSegs || [];
 const daySegs = allSegsArr.map((seg, idx) => ({seg, idx})).filter(({seg}) => {
 const st = seg.startMin !== undefined ? seg.startMin : (seg.abs || 0);
 return st < dayEndMin && (st + seg.dur) > dayStartMin;
 });
 
 const isToday = (d === numDays-1);
 const nowMin = S.simMin;
 
 const row = makeDayRow(d, dayStartMs, daySegs, dayStartMin, dayEndMin, nowMin, isToday, segColor, segLbl);
 container.appendChild(row);
 }

 /* S4-6: İhlal marker'ları */
 setTimeout(_addTLViolationMarkers, 50);
}

function makeDayRow(dayIdx, dayStartDt, daySegs, dayStartMin, dayEndMin, nowMin, isToday, segColor, segLbl){
 const DAYS_TR = ['Pz','Pt','Sa','Ça','Pe','Cu','Ct'];
 const dayName = DAYS_TR[dayStartDt.getDay()];
 const dateStr = `${String(dayStartDt.getDate()).padStart(2,'0')}/${String(dayStartDt.getMonth()+1).padStart(2,'0')}`;

 const row = document.createElement('div');
 row.className = 'tl-day';
 row.setAttribute('data-day-idx', String(dayIdx));

 const lbl = document.createElement('div');
 lbl.className = 'tl-day-lbl';
 lbl.innerHTML = `<b style="color:${isToday?'#60a5fa':'var(--dim)'}">${dayName}</b><br>${dateStr}`;
 row.appendChild(lbl);

 const area = document.createElement('div');
 area.className = 'tl-day-area' + (isToday ? ' tl-today' : '');
 row.appendChild(area);

 /* Segmentleri çiz */
 (daySegs||[]).forEach(item=>{
 const seg = item.seg !== undefined ? item.seg : item; /* eski/yeni format */
 const segIdx = item.idx !== undefined ? item.idx : -1;
 if(!seg || seg.dur<=0) return;
 /* allSegs: startMin; eski segs: abs — her ikisini destekle */
 const segAbsStart = seg.startMin !== undefined ? seg.startMin : (seg.abs || 0);
 if(typeof segAbsStart !== 'number' || isNaN(segAbsStart)) return;
 /* Bu gün içindeki kısım */
 const segStart = Math.max(segAbsStart, dayStartMin);
 const segEnd = Math.min(segAbsStart + seg.dur, dayEndMin);
 if(segEnd <= segStart) return;

 const left = (segStart - dayStartMin) / 1440 * 100;
 const w = (segEnd - segStart) / 1440 * 100;
 if(w < 0.05) return;

 const key = (seg.mode==='work' && seg.workSub) ? seg.workSub : seg.mode;
 const col = (segColor||{})[key] || '#3b82f6';
 const lbl2 = (segLbl||{})[key] || key;

 const div = document.createElement('div');
 div.className = 'tl-day-seg';
 div.style.left = left + '%';
 div.style.width = w + '%';
 div.style.background = col;
 div.style.boxShadow = `0 0 3px ${col}88`;
 div.title = `${lbl2}: ${hm(segEnd-segStart)}`;
 if(segIdx >= 0) div.setAttribute('data-seg-idx', segIdx);
 area.appendChild(div);
 });

 /* Şu an çizgisi (sadece bugün) */
 if(isToday && nowMin >= dayStartMin && nowMin < dayEndMin){
 const nowLeft = (nowMin - dayStartMin) / 1440 * 100;
 const nowEl = document.createElement('div');
 nowEl.className = 'tl-day-now';
 nowEl.style.left = Math.min(99.5, nowLeft) + '%';
 area.appendChild(nowEl);
 }

 return row;
}

/* SAAT EKSENİ */
function buildAxis(){
 const ax=document.getElementById('tlaxis');
 if(!ax)return;
 for(let h=0;h<24;h++){
 const d=document.createElement('div');
 d.className='tlah';
 d.textContent=String(h).padStart(2,'0');
 ax.appendChild(d);
 }
}

const SCENS=[
 {
 icon:'🚛',title:'Normal Sürüş Günü (9sa)',
 badge:'UYUMLU',bcls:'#22c55e',
 desc:'Standart iş günü: 4:30 sürüş → 45dk mola → 4:30 sürüş → yükleme → 11sa gece dinlenmesi.',
 steps:[
 {mode:'driving',min:270,note:'Sabah seferi (4:30)'},
 {mode:'rest', min:45, note:'Zorunlu mola (45dk)'},
 {mode:'driving',min:210,note:'Öğleden sonra (3:30)'},
 {mode:'work', min:60, note:'Teslimat / yükleme', workSub:'loading'},
 {mode:'rest', min:660,note:'Gece dinlenmesi (11sa)'},
 ]
 },
 {
 icon:'⬆️',title:'Uzatılmış Gün (10sa) — Haftada 2×',
 badge:'UYUMLU',bcls:'#22c55e',
 desc:'Haftada en fazla 2 kez günlük sürüş 10 saate uzatılabilir. 4:30+45dk+4:30+45dk+1sa = 10sa toplam.',
 extDay:true,
 steps:[
 {mode:'driving',min:270,note:'Sürüş 1 (4:30)'},
 {mode:'rest', min:45, note:'1. zorunlu mola'},
 {mode:'driving',min:270,note:'Sürüş 2 (4:30)'},
 {mode:'rest', min:45, note:'2. zorunlu mola'},
 {mode:'driving',min:60, note:'Uzatma sürüşü (1sa) → TOPLAM: 10sa — GEÇERLİ'},
 {mode:'rest', min:660,note:'Gece dinlenmesi (11sa)'},
 ]
 },
 {
 icon:'✂️',title:'Bölünmüş Mola (15+30dk)',
 badge:'UYUMLU',bcls:'#22c55e',
 desc:'45 dakikalık zorunlu mola 2 parçaya bölünebilir: önce 15dk, sonra 30dk. Sıra değiştirilemez.',
 steps:[
 {mode:'driving',min:120,note:'Sürüş 1 (2sa)'},
 {mode:'rest', min:15, note:'1. mola parçası (15dk) → YETERSİZ, devam etme!'},
 {mode:'driving',min:150,note:'Sürüş 2 (2:30) → toplam 4:30'},
 {mode:'rest', min:30, note:'2. mola parçası (30dk) → TOPLAM 45dk → TAMAMLANDI'},
 {mode:'driving',min:270,note:'Yeni 4:30 sürüş hakkı'},
 {mode:'rest', min:660,note:'Gece dinlenmesi (11sa)'},
 ]
 },
 {
 icon:'🛏️',title:'Bölünmüş Günlük Dinlenme (3sa+9sa)',
 badge:'UYUMLU',bcls:'#22c55e',
 desc:'Günlük dinlenme 2 bölüme ayrılabilir: 1. bölüm en az 3 saat, 2. bölüm en az 9 saat. Toplam: 12sa.',
 steps:[
 {mode:'driving',min:270,note:'Sabah seferi (4:30)'},
 {mode:'rest', min:45, note:'Zorunlu mola'},
 {mode:'driving',min:270,note:'Öğleden sonra (4:30)'},
 {mode:'rest', min:180,note:'Dinlenme 1. bölümü (3sa) → Min eşik'},
 {mode:'work', min:60, note:'Aktivite arası (yükleme)', workSub:'loading'},
 {mode:'rest', min:540,note:'Dinlenme 2. bölümü (9sa) → TOPLAM: 12sa'},
 ]
 },
 {
 icon:'🚢',title:'Ro-Ro / Tren: 2 Bölümlü Dinlenme',
 badge:'UYUMLU',bcls:'#22c55e',
 desc:'Feribot veya tren taşımacılığında günlük dinlenme en fazla 2 kez bölünebilir (1 saatten fazla olmayan aralıklarla). Örnek: 5sa + 6sa.',
 steps:[
 {mode:'driving',min:270,note:'Kara seferi (4:30)'},
 {mode:'rest', min:45, note:'Zorunlu mola'},
 {mode:'driving',min:60, note:'Limana sürüş (1sa)'},
 {mode:'rest', min:300,note:'Dinlenme 1. bölüm (5sa) — feribotta'},
 {mode:'available',min:60,note:'Aktarma bekleme (1sa) — Ro-Ro arası'},
 {mode:'rest', min:360,note:'Dinlenme 2. bölüm (6sa) — feribotta → TOPLAM: 11sa'},
 ]
 },
 {
 icon:'👥',title:'Çift Sürücü — 30 Saatlik Periyot',
 badge:'UYUMLU',bcls:'#22c55e',
 doubleDriver:true,
 desc:'Çift sürücülü araçta 30 saatlik periyotta en az 9sa dinlenme gerekir. Aktif olmayan sürücü "Uygunluk" modundadır.',
 steps:[
 {mode:'driving', min:270,note:'Sürücü 1 aktif — sürüş (4:30)'},
 {mode:'available',min:270,note:'Sürücü 2 aktif sürerken Sürücü 1 bekleme (4:30)'},
 {mode:'driving', min:270,note:'Sürücü 1 tekrar aktif — sürüş (4:30)'},
 {mode:'available',min:60, note:'Bekleme'},
 {mode:'work', min:120,note:'Çalışma (2sa)', workSub:'otherwork'},
 {mode:'rest', min:540,note:'9sa dinlenme (30sa periyot içinde zorunlu)'},
 ]
 },
 {
 icon:'⚠️',title:'Mola Gerekli — 4s15dk',
 badge:'UYARI',bcls:'#f5a200',
 desc:'4 saat 15 dakika kesintisiz sürüş yapılmış. Mola hakkı sadece 15 dakika kalmış!',
 steps:[
 {mode:'driving',min:255,note:'Kesintisiz sürüş (4s15dk) → mola hakkı 15dk kaldı'},
 ]
 },
 {
 icon:'🚨',title:'Limit İhlali — 10s30dk',
 badge:'İHLAL',bcls:'#ef4444',
 desc:'Günlük 9 saatlik limit aşılmış. Toplam 10:30 sürüş. İHLAL! Para cezası ve araç men riski.',
 steps:[
 {mode:'driving',min:270,note:'Sürüş 1 (4:30)'},
 {mode:'rest', min:45, note:'Mola (45dk)'},
 {mode:'driving',min:270,note:'Sürüş 2 (4:30)'},
 {mode:'rest', min:45, note:'2. mola (45dk)'},
 {mode:'driving',min:90, note:'Sürüş 3 (1:30) → TOPLAM: 10:30 — İHLAL!'},
 ]
 },
 {
 icon:'🌍',title:'Uzun Mesafe — İstanbul→Münih',
 badge:'UYUMLU',bcls:'#22c55e',
 desc:'İki tam sürüş günü. 2. günde feribot bekleme (uygunluk) modu.',
 steps:[
 {mode:'driving', min:270,note:'Gün 1: Sabah seferi'},
 {mode:'rest', min:45, note:'Zorunlu mola'},
 {mode:'driving', min:270,note:'Gün 1: Öğleden sonra'},
 {mode:'work', min:60, note:'Gümrük bekleme', workSub:'otherwork'},
 {mode:'rest', min:660,note:'Gün 1: Gece dinlenmesi (11sa)'},
 {mode:'driving', min:270,note:'Gün 2: Sabah seferi'},
 {mode:'rest', min:45, note:'Zorunlu mola'},
 {mode:'driving', min:240,note:'Gün 2: Öğleden sonra (4sa)'},
 {mode:'available',min:120,note:'Feribot / Ro-Ro bekleme'},
 {mode:'rest', min:660,note:'Gün 2: Gece dinlenmesi (11sa)'},
 ]
 },
 {
 icon:'⛴',title:'Feribot Dinlenmesi (Madde 9)',
 badge:'FERİBOT',bcls:'#3b82f6',
 desc:'Feribot/Tren modu: Dinlenme sırasında rampaya binme/inme (≤1sa kesinti, dinlenme geçerli). ⛴ butonunu dene!',
 steps:[
 {mode:'driving', min:270,note:'Sabah 4:30 sürüş'},
 {mode:'rest', min:45, note:'Zorunlu mola'},
 {mode:'driving', min:270,note:'Öğleden sonra 4:30 sürüş'},
 {mode:'rest', min:60, note:'Limanda bekleme / araç parkı'},
 {mode:'rest', min:600,note:'Feribotta 10sa dinlenme — ⛴ modunu dene! (toplam 11sa için +60dk daha gerekir)'},
 ]
 },
 {
 icon:'✏',title:'Manuel Giriş Pratiği',
 badge:'MANUEL',bcls:'#16a34a',
 desc:'Kart dışarıdayken geçen süre girişi. Hafta sonu dinlenmesi sonrası kart takılıyor, geçmiş aktiviteler girilmesi gerekiyor.',
 steps:[
 {mode:'driving', min:270,note:'Cuma: 4:30 sürüş'},
 {mode:'rest', min:45, note:'Mola'},
 {mode:'driving', min:270,note:'Cuma: 4:30 sürüş'},
 {mode:'rest', min:660,note:'Cuma gecesi dinlenme'},
 {mode:'rest', min:2700,note:'Hafta sonu: 45sa tam haftalık dinlenme (kart dışarıda!)'},
 ]
 },
 /* ── YENİ: Hız Aşımı Senaryosu ── */
 {
 icon:'🚗',title:'Hız Aşımı & Olay Kaydı',
 badge:'OLAY',bcls:'#f97316',
 desc:'Hız sınırı (90km/h) aşımında ! olayı nasıl kaydedilir? Gerçek cihazda piktogram yanıp söner, onaylanır. ',
 steps:[
 {mode:'driving',min:120,note:'Normal sürüş — 90km/h limit dahilinde'},
 {mode:'driving',min:30,note:'HIZ AŞIMI — araç 105km/h → ! Hız aşımı olayı kaydedilir'},
 {mode:'driving',min:60,note:'Limit dahiline dönüldü'},
 {mode:'rest',min:45,note:'Zorunlu mola'},
 {mode:'driving',min:120,note:'Sürüş devam'},
 ]
 },
 /* ── YENİ: Şirket Kartı Kullanımı ── */
 {
 icon:'🏢',title:'Şirket Kartı — Veri İndirme ',
 badge:'ŞİRKET',bcls:'#f59e0b',
 desc:'Şirket kartı takılınca "Şirket" moduna geçilir. Yığın bellek indirme, araç ayarları yapılabilir. Sefer arası veya vardiya bitiminde yapılır.',
 steps:[
 {mode:'driving',min:270,note:'Sabah seferi'},
 {mode:'rest',min:45,note:'Mola — şirket kartı takıldı'},
 {mode:'rest',min:30,note:'ŞİRKET MODU: Veri indirme, rapor al'},
 {mode:'driving',min:270,note:'Öğleden sonra seferi'},
 {mode:'rest',min:660,note:'Gece dinlenmesi'},
 ]
 },
 /* ── YENİ: Arıza Senaryosu ── */
 {
 icon:'⚡',title:'GNSS Arızası & Olay Akışı ',
 badge:'ARIZA',bcls:'#ef4444',
 desc:'GNSS sinyal kaybı simülasyonu. 3 saatlik sürüşte sinyal yoksa ! GNSS olayı kaydedilir. Gerçek cihazda yanıp sönen uyarı + tuşla onay gerekir.',
 steps:[
 {mode:'driving',min:60,note:'Normal sürüş — GNSS aktif'},
 {mode:'driving',min:180,note:'GNSS sinyali kesildi — 3sa sürüşte sinyal yok → ! GNSS olayı'},
 {mode:'rest',min:45,note:'Mola — uyarıyı onayla (gerçek cihazda tuşla)'},
 {mode:'driving',min:120,note:'GNSS sinyali geri geldi — olay kaydı temizlendi'},
 {mode:'rest',min:660,note:'Gece dinlenmesi'},
 ]
 },
 /* ── YENİ: ADR Tehlikeli Madde Seferi ── */
 {
 icon:'☢',title:'ADR Varyantı — Tehlikeli Madde ',
 badge:'ADR',bcls:'#ef4444',
 desc:'Tehlikeli madde taşımada ADR varyantı kullanılır. Yükleme/boşaltma sırasında tüm kart yuvaları, yazıcı ve ön arayüz KAPALI olmalı. Tuşlara basılmaz.',
 steps:[
 {mode:'driving',min:180,note:'Depoya gidiş — normal sürüş'},
 {mode:'work',min:60,note:'ADR MODU: Yükleme — kart yuvaları/yazıcı KAPALI!'},
 {mode:'driving',min:240,note:'ADR: Tehlikeli madde ile sürüş'},
 {mode:'work',min:45,note:'ADR: Boşaltma — kap kapalı tutulmalı'},
 {mode:'rest',min:660,note:'Gece dinlenmesi — ADR modu kapatılabilir'},
 ]
 },
 /* ── FAZ A: Trafik Denetimi (G2V2) ── */
 {
 icon:'🚔',title:'Trafik Denetimi — G2V2 Kontrol Kartı ',
 badge:'DENETİM',bcls:'#38bdf8',
 desc:'Trafik denetçisi kontrol kartını takıyor → Kontrol modu. Son 56 günün verileri, konum kayıtları, sınır geçişleri ve olaylar inceleniyor. DSRC ile araç durdurmadan da ön seçim yapılabilir.',
 steps:[
 {mode:'driving',min:270,note:'Sabah seferi — normal sürüş (GNSS konum kaydediliyor)'},
 {mode:'rest',min:45,note:'Mola — 3sa sürüşte konum kaydedildi'},
 {mode:'driving',min:270,note:'Öğleden sonra seferi — sınır geçişi simüle et'},
 {mode:'rest',min:30,note:'KONTROL NOKTASI: Kontrol kartı takıldı → Denetim Butonuna bas'},
 {mode:'rest',min:660,note:'Denetim tamamlandı — gece dinlenmesi'},
 ]
 },
 /* ── FAZ A: G2V2 Konum Kaydı Senaryosu ── */
 {
 icon:'🛰',title:'G2V2 Konum Kaydı & OSNMA ',
 badge:'G2V2',bcls:'#a78bfa',
 desc:'Smart Tacho 2 (G2V2) her 3 saatlik sürüşte otomatik konum kaydeder. OSNMA ile Galileo sinyali doğrulanıyor. Yükleme/boşaltmada da konum kaydedilir.',
 steps:[
 {mode:'driving',min:180,note:'1. sürüş — 3sa → İlk konum kaydı (🛰 OSNMA onaylı)'},
 {mode:'rest',min:45,note:'Mola'},
 {mode:'driving',min:180,note:'2. sürüş — 3sa → 2. konum kaydı'},
 {mode:'work',min:60,note:'Yükleme → Konum kaydedildi (Yükleme noktası )'},
 {mode:'driving',min:180,note:'3. sürüş — 3sa → 3. konum kaydı'},
 {mode:'rest',min:660,note:'Vardiya sonu → Son konum kaydı'},
 ]
 },
 /* ── FAZ A: Çok Ülkeli Sefer — Otomatik Sınır Geçişi ── */
 {
 icon:'🌍',title:'Çok Ülkeli Sefer — Otomatik Sınır ',
 badge:'G2V2',bcls:'#22c55e',
 desc:'G2V2 + GNSS aktifken sınır geçişi otomatik kaydedilir — sürücü durmuyor. GEN1/GEN2V1 kartlarda sınır bilgisi yalnızca yığın bellekte kalır, kart üzerine yazılamaz.',
 steps:[
 {mode:'driving',min:120,note:'TR → BG: Ülke Butonuna bas, BG seç (otomatik sınır simülasyonu)'},
 {mode:'driving',min:120,note:'BG içinde sürüş'},
 {mode:'driving',min:60,note:'BG → GR: Sınır geçişi — GNSS ile otomatik'},
 {mode:'rest',min:45,note:'Mola — Sinir logunu incele'},
 {mode:'driving',min:120,note:'GR içinde sürüş'},
 {mode:'rest',min:660,note:'Gece dinlenmesi'},
 ]
 },
 /* ── FAZ B: GNSS Spoofing / !? GNSS Anormal ── */
 {
 icon:'🚨',title:'GNSS Spoofing — !? GNSS Anormal ',
 badge:'OSNMA',bcls:'#ef4444',
 desc:'Galileo OSNMA kimlik doğrulama başarısız. Sahte GNSS sinyali (spoofing) tespiti veya parazit kaynağı. /b\u2019de tespit edilir, geçiş versiyonunda algılanamaz.',
 steps:[
 {mode:'driving',min:120,note:'Normal sürüş — OSNMA aktif, Galileo doğrulamalı'},
 {mode:'driving',min:60,note:'Spoofing tespiti: "Spoofing" butonuna bas → !? GNSS Anormal olayı'},
 {mode:'rest',min:20,note:'Uyarıyı onayla (K tuşu) → GNSS Anormal diyalogunu incele'},
 {mode:'driving',min:60,note:'Çözüm: "Çözüldü" butonuna bas → OSNMA yeniden aktif'},
 {mode:'rest',min:660,note:'Gece dinlenmesi — Olay raporu al'},
 ]
 },
 /* ── FAZ B: DSRC Beacon — Uzaktan Denetim ── */
 {
 icon:'📡',title:'DSRC Beacon — Uzaktan Denetim ',
 badge:'DSRC',bcls:'#38bdf8',
 desc:'Yol kenarı DSRC beacon okuyucusu araç durdurmadan veri alır. İhlal şüphesi varsa araç kontrole çekilir. 2019 yilindan beri tum Smart Tacho cihazlarinda zorunlu.',
 steps:[
 {mode:'driving',min:270,note:'Normal sürüş — DSRC anteni aktif, beacon sinyali alınıyor'},
 {mode:'driving',min:90,note:'Kontrol noktasına yaklaşılıyor — "DSRC Bcn." butonuna bas'},
 {mode:'rest',min:45,note:'Sonuca göre: Geçiş onayı veya kontrol çağrısı'},
 {mode:'driving',min:180,note:'Sürüş devam'},
 {mode:'rest',min:660,note:'Gece dinlenmesi'},
 ]
 },
 /* ── FAZ B: Kabotaj Takibi 1072/2009 ── */
 {
 icon:'🔄',title:'Kabotaj Takibi 1072/2009',
 badge:'KABOTAJ',bcls:'#f59e0b',
 desc:'G2V2 yükleme+sınır kombinasyonu kabotaj takibini mümkün kılıyor. Aynı ülkede 7 gün içinde 3+ yükleme/boşaltma → kabotaj riski uyarısı. Yük tipi ve konum birlikte kaydedilir.',
 steps:[
 {mode:'driving',min:120,note:'AT → DE: Ülke giriş'},
 {mode:'work',min:45,note:'Yükleme-1 DE: Yük tipi "Mallar" seç'},
 {mode:'driving',min:60,note:'DE içinde sürüş'},
 {mode:'work',min:30,note:'Boşaltma-1 + Yükleme-2 DE'},
 {mode:'driving',min:60,note:'DE içinde sürüş'},
 {mode:'work',min:30,note:'Boşaltma-2 + Yükleme-3 DE → Kabotaj uyarısı!'},
 {mode:'rest',min:660,note:'Gece dinlenmesi — Kontrol raporu al'},
 ]
 },
 {
 icon:'\u2699',title:'2 Yillik Kalibrasyon ',
 badge:'SERVİS',bcls:'#c084fc',
 desc:'Takograf her 2 yılda bir yetkili serviste kalibre edilmeli. Servis karti + Kalibrasyon modu. Lastik ebadi, l-faktoru, plaka. Sonra muhurlenip teslim edilir.',
 steps:[
 {mode:'rest',min:30,note:'Yetkili servise giris — Kalibr. butonuna bas (X tusu)'},
 {mode:'rest',min:60,note:'Parametreleri duzenle: lastik, l-faktoru, GVW, plaka'},
 {mode:'rest',min:20,note:'Kalibrasyonu Uygula — Kalibrasyon Raporu al'},
 {mode:'driving',min:30,note:'Test surüsü — parametreler dogrulandi, takograf mühürlendi'},
 ]
 },
 {
 icon:'\uD83D\uDE90',title:'Hafif Arac 2.5-3.5t — Temmuz 2026',
 badge:'YENİ',bcls:'#f59e0b',
 desc:'Temmuz 2026 sonrasi 2.5-3.5t araci uluslararasi kullananlar icin Smart Tacho 2 zorunlu. Dikkat: Farkli surüs/dinlenme limitleri gecerli!',
 steps:[
 {mode:'rest',min:15,note:'2.5-3.5t butonuna bas → farkliliklari incele → modu etkinlestir'},
 {mode:'driving',min:360,note:'6 saat suurus — mola gerekiyor (hafif aracta 30dk yeterli)'},
 {mode:'rest',min:30,note:'30 dakika mola (hafif arac kurali)'},
 {mode:'driving',min:240,note:'4 saat daha — gunluk 10sa limitine ulasiliyor'},
 {mode:'rest',min:660,note:'Gunluk minimum dinlenme'},
 ]
 },
 {
 icon:'📝',title:'Egitim Quizi — 15 Soru',
 badge:'EĞİTİM',bcls:'#22c55e',
 desc:'Takograf ve yasal kurallari hakkinda 15 soru. Trafik denetiminde sorulabilecek temel bilgileri test et.',
 steps:[
 {mode:'rest',min:5,note:'Quiz butonuna tikla (Q tusu) — 15 soru baslıyor'},
 {mode:'rest',min:5,note:'Her soruya cevap ver — yanlis cevaplarda referans gosterilir'},
 {mode:'rest',min:5,note:'Tum sorulari bitir — puan ve degerlendir'},
 ]
 },
 {
 icon:'📅',title:'Haftalik Planlama & Kalan Sure Analizi',
 badge:'ARAÇ',bcls:'#a78bfa',
 desc:'Counter benzeri haftalik planlama araci. Kalan surus, dinlenme, mola surelerini goster. Optimal plan onerisi al.',
 steps:[
 {mode:'driving',min:270,note:'Sabah seferi'},
 {mode:'rest',min:45,note:'Mola — Planlama butonuna bas (L tusu)'},
 {mode:'driving',min:270,note:'Ogleden sonra seferi'},
 {mode:'rest',min:30,note:'Tekrar Planlama — kalan sureler analiz edildi'},
 {mode:'rest',min:660,note:'Gece dinlenmesi'},
 ]
 },
 {
 icon:'\u26AB',title:'Takograf Menü Yapısı ',
 badge:'MENU',bcls:'#22c55e',
 desc:'İkinci menü seviyesi: Yazdir, Giris, Goruntule. Gercek cihazda menü tusuyla erisilen 8 fonksiyon grubu. J tusu ile menu simulatorunu ac.',
 steps:[
 {mode:'rest',min:5,note:'J tusuna bas veya Menu butonuna tikla'},
 {mode:'rest',min:5,note:'Yazdir → 1.Surucu → 24h Gunluk → raporu goster'},
 {mode:'rest',min:5,note:'Giris → Ulke Girisi → ulkeyi sec'},
 {mode:'rest',min:5,note:'Goruntule → Arac → Takograf Sürümü'},
 ]
 },
 {
 icon:'\uD83D\uDD04',title:'Ekip Degisimi — 3 Durum ',
 badge:'EKIP',bcls:'#f59e0b',
 desc:'Surucu/arac degisimi 3 durumu: 1) Ekip halinde kullanim, 2) Vardiya sonu, 3) Karma kullanim. Her durum farkli prosedur gerektirir.',
 steps:[
 {mode:'driving',min:120,note:'Sabah seferi — 1. Surucu aktif, 2. Surucu uygunluk'},
 {mode:'rest',min:15,note:'Ekip Degisimi butonuna bas → 1.Durumu secip simule et'},
 {mode:'driving',min:120,note:'Surucu rolleri degisti — test surüsü'},
 {mode:'rest',min:660,note:'Gece dinlenmesi'},
 ]
 },
 {
 icon:'\uD83D\uDE9A',title:'Filo Yonetici Paneli',
 badge:'FİLO',bcls:'#3b82f6',
 desc:'5 surucu anlık durum tablosu. Gercekte veya OPTAC3 ile canli izleme yapilir. Z tusu ile filo panelini ac.',
 steps:[
 {mode:'driving',min:60,note:'Filo Panel butonuna bas (Z tusu) — 5 surucu goster'},
 {mode:'rest',min:30,note:'Surucu durumlarini incele — renkli bar grafikleri'},
 {mode:'driving',min:60,note:'Simülasyonu ilerlet, paneli yenile'},
 {mode:'rest',min:660,note:'Gece dinlenmesi'},
 ]
 },
 {
 icon:'\uD83D\uDCE1',title:'Telematik & CAN Bus ',
 badge:'CAN',bcls:'#22c55e',
 desc:'Motor devir profili, 4Hz hiz sinyali, D1/D2 durum, Bluetooth/DSRC. kiSisel verileri (surucu izni gerekli). Telematik paneli ile canli CAN bus verisi.',
 steps:[
 {mode:'driving',min:60,note:'Surusu baslat — Telematik butonuna bas'},
 {mode:'driving',min:30,note:'CAN bus verilerini incele: RPM, 4Hz hiz, D1/D2'},
 {mode:'rest',min:30,note:'Dinlenmeye gec — CAN verisinin degistigini izle'},
 {mode:'driving',min:60,note:'Hiz profili grafigini incele (16 aralik)'},
 ]
 },
 /* ══ S3-7: KASITLI İHLAL SENARYOLARI ══ */
 {
 icon:'⚠️', title:'İhlal 1 — Molasız 5 Saat Sürüş',
 badge:'İHLAL',bcls:'#ef4444',
 desc:'4:30 kesintisiz sürüş limitini aşmak nasıl bir uyarı tetikler? Sonuçları gözlemleyin.',
 guided:true,
 steps:[
 {mode:'driving',min:300,note:'5sa molasız sürüş → ihlal',
 hint:'4:30 (270dk) kesintisiz limitini aştınız. Md.7: Her 4:30 sonrası 45dk mola zorunlu!'}
 ]
 },
 {
 icon:'⏰', title:'İhlal 2 — 9sa Günlük Limiti Aşmak',
 badge:'İHLAL',bcls:'#ef4444',
 desc:'10sa uzatma hakkı olmadan 9 saatin üzerine çıkmak ne olur.',
 guided:true,
 steps:[
 {mode:'driving',min:270,note:'Sabah sürüşü (4:30)'},
 {mode:'rest', min:45, note:'Zorunlu mola (45dk)'},
 {mode:'driving',min:270,note:'Öğleden sonra (4:30) → limit!'},
 {mode:'driving',min:60, note:'Limit aşımı! (+1sa ekstra)',
 hint:'Günlük 9sa doldu, uzatma hakkı yokken sürüşe devam edildi. Günlük dinlenme zorunlu.'}
 ]
 },
 {
 icon:'💤', title:'İhlal 3 — Yetersiz Günlük Dinlenme (8sa)',
 badge:'İHLAL',bcls:'#ef4444',
 desc:'11sa tam günlük dinlenme yerine sadece 8sa ile yeni güne başlamak.',
 guided:true,
 steps:[
 {mode:'driving',min:540,note:'Tam günlük sürüş (9sa)'},
 {mode:'rest', min:480,note:'Sadece 8sa uyku → yetersiz!',
 hint:'8 saat dinlenme zorunlu 11sa gunluk dinlenmenin altinda. Md.8'}
 ]
 },
 {
 icon:'📅', title:'İhlal 4 — 24sa Penceresini Kaçırmak',
 badge:'İHLAL',bcls:'#ef4444',
 desc:'24sa pencerede günlük dinlenme almadan sürüşe devam etmek.',
 guided:true,
 steps:[
 {mode:'driving', min:300,note:'Sabah sürüşü'},
 {mode:'work', min:120,note:'Teslimat işleri'},
 {mode:'driving', min:180,note:'Öğleden sonra sürüşü'},
 {mode:'rest', min:60, note:'Kısa mola (1sa — yetersiz!)'},
 {mode:'driving', min:120,note:'Gece sürüşü — 24sa penceresi doldu',
 hint:'Son günlük dinlenmeden 24sa geçti. Derhal en az 9sa dinlenme alın!'}
 ]
 },
 {
 icon:'🔄', title:'İhlal 5 — Molayı Kesmek (20dk)',
 badge:'İHLAL',bcls:'#ef4444',
 desc:'45dk molayı 20dk tamamlamadan sürüşe devam etmek geçersiz kılar.',
 guided:true,
 steps:[
 {mode:'driving',min:270,note:'4:30 sürüş → mola zamanı'},
 {mode:'rest', min:20, note:'Sadece 20dk mola → yetersiz!',
 hint:'20dk mola zorunlu 45dk yi karsılamaz. Kesintisiz sayac hala calışıyor.'},
 {mode:'driving',min:60, note:'Erken sürüşe devam — ihlal!',
 hint:'Md.7: Mola tek blok 45dk veya 15+30dk olmalı. 20dk geçersiz.'}
 ]
 },
 {
 icon:'💼', title:'İhlal 6 — İş Süresini Mola Saymak',
 badge:'İHLAL',bcls:'#ef4444',
 desc:'Yükleme/boşaltma süresinin kesintisiz sürüş sayacını durdurmadığını görün.',
 guided:true,
 steps:[
 {mode:'driving',min:240,note:'4 saat sürüş'},
 {mode:'work', min:30, note:'30dk yükleme — mola sayılmaz!',
 hint:'Yükleme/İş süresi mola yerine geçmez. Kesintisiz sayaç çalışıyor.'},
 {mode:'driving',min:90, note:'Sürüşe devam → 4:30 limit aşımı!',
 hint:'Md.7: Yalnizca gercek mola kesintisiz sayaci sifirlar.'}
 ]
 },
 {
 icon:'⬆️', title:'İhlal 7 — 10sa Uzatmayı 3. Kez Kullanmak',
 badge:'İHLAL',bcls:'#ef4444',
 desc:'Haftalık 2 uzatma hakkını tüketip 3. kez uzatmaya çalışmak.',
 guided:true,
 extDay:true,
 steps:[
 {mode:'driving',min:600,note:'Gün 1 — 10sa uzatmalı'},
 {mode:'rest', min:660,note:'Gün 1 dinlenmesi'},
 {mode:'driving',min:600,note:'Gün 2 — 10sa uzatmalı'},
 {mode:'rest', min:660,note:'Gün 2 dinlenmesi'},
 {mode:'driving',min:540,note:'Gün 3 — uzatma hakkı yok!',
 hint:'Bu hafta 2 uzatma hakkı kullanıldı. 3. girişim ihlali.'}
 ]
 },
 {
 icon:'🗓️', title:'İhlal 8 — Haftalık Dinlenmeyi Geciktirmek',
 badge:'İHLAL',bcls:'#ef4444',
 desc:'6×24sa pencerede haftalık dinlenme almadan sürüşe devam etmek.',
 guided:true,
 steps:[
 {mode:'driving',min:540,note:'G1 sürüş'},{mode:'rest',min:660,note:'G1 din.'},
 {mode:'driving',min:540,note:'G2 sürüş'},{mode:'rest',min:660,note:'G2 din.'},
 {mode:'driving',min:540,note:'G3 sürüş'},{mode:'rest',min:660,note:'G3 din.'},
 {mode:'driving',min:540,note:'G4 sürüş'},{mode:'rest',min:660,note:'G4 din.'},
 {mode:'driving',min:540,note:'G5 sürüş'},{mode:'rest',min:660,note:'G5 din.'},
 {mode:'driving',min:540,note:'G6 sürüş'},
 {mode:'driving',min:300,note:'G7 — haftalık din. YOK! 6×24sa aşılıyor',
 hint:'6 günlük dönemde haftalık dinlenme alınmadı. ihlali.'}
 ]
 },
 {
 icon:'📆', title:'İhlal 9 — 56sa Haftalık Limit Aşımı',
 badge:'İHLAL',bcls:'#ef4444',
 desc:'Bir haftada 56 saatin üzerine çıkmanın uyarısını gözlemleyin.',
 guided:true,
 steps:[
 {mode:'driving',min:540,note:'G1 (9sa)'},{mode:'rest',min:660,note:'G1 din.'},
 {mode:'driving',min:540,note:'G2 (9sa)'},{mode:'rest',min:660,note:'G2 din.'},
 {mode:'driving',min:540,note:'G3 (9sa)'},{mode:'rest',min:660,note:'G3 din.'},
 {mode:'driving',min:540,note:'G4 (9sa)'},{mode:'rest',min:660,note:'G4 din.'},
 {mode:'driving',min:540,note:'G5 (9sa)'},{mode:'rest',min:660,note:'G5 din.'},
 {mode:'driving',min:600,note:'G6 (10sa) — 51sa toplam'},
 {mode:'driving',min:360,note:'G7 (6sa) → 57sa LIMIT AŞILDI!',
 hint:'Haftalık 56sa (3360dk) doldu. Tam haftalık dinlenme (45sa) zorunlu.'}
 ]
 },
 {
 icon:'🔁', title:'İhlal 10 — Telafi Borcunu Ödemeden Devam',
 badge:'İHLAL',bcls:'#ef4444',
 desc:'Kısaltılmış haftalık dinlenme sonrası telafi borcunu 3 hafta içinde ödemeden devam.',
 guided:true,
 steps:[
 {mode:'driving',min:540,note:'Haftalık sürüş (özet)'},
 {mode:'rest', min:1440,note:'Kısaltılmış haftalık (24sa — 21sa borç)'},
 {mode:'driving',min:540,note:'Yeni hafta gün 1'},
 {mode:'rest', min:660, note:'Gece dinlenmesi'},
 {mode:'driving',min:540,note:'Yeni hafta gün 2 — telafi borcu ödenmedi!',
 hint:'Kısaltılmış haftalık din. sonrası 21sa telafi borcu 3 hafta içinde ödenmeli. '}
 ]
 },
 /* ══ S3-8: ÇOK GÜNLÜ ULUSLARARASI SEFER ══ */
 {
 icon:'🌍', title:'TR→DE: 7 Günlük Uluslararası Sefer',
 badge:'ULUSLARARASI',bcls:'#06b6d4',
 desc:'Istanbul-dan Hamburg-a 7 günlük sefer: sınır geçişleri, farklı ülke bayrakları, haftalık planlama.',
 guided:true,
 steps:[
 {mode:'driving', min:540, note:'Gün 1: İstanbul çıkış (TR → BG sınırı)'},
 {mode:'rest', min:660, note:'Gün 1: Gece dinlenmesi (Bulgaristan)'},
 {mode:'driving', min:270, note:'Gün 2: BG → RS (Sırbistan)'},
 {mode:'rest', min:45, note:'Gün 2: Zorunlu mola'},
 {mode:'driving', min:270, note:'Gün 2: RS → HR (Hırvatistan)'},
 {mode:'rest', min:660, note:'Gün 2: Gece (Zagreb)'},
 {mode:'driving', min:270, note:'Gün 3: HR → SI → AT (Avusturya)'},
 {mode:'rest', min:45, note:'Gün 3: Mola (Graz)'},
 {mode:'driving', min:270, note:'Gün 3: AT → DE (Almanya) sınırı'},
 {mode:'rest', min:660, note:'Gün 3: Gece (Münih)'},
 {mode:'driving', min:540, note:'Gün 4: Münih → Frankfurt (10sa uzatmalı)'},
 {mode:'rest', min:660, note:'Gün 4: Gece (Frankfurt)'},
 {mode:'driving', min:270, note:'Gün 5: Frankfurt → Köln'},
 {mode:'rest', min:45, note:'Gün 5: Mola'},
 {mode:'driving', min:270, note:'Gün 5: Köln → Hamburg → TESLİMAT'},
 {mode:'rest', min:660, note:'Gün 5: Gece (Hamburg)'},
 {mode:'work', min:180, note:'Gün 6: Boşaltma ve belgeler'},
 {mode:'rest', min:2700,note:'Gün 6-7: Haftalık dinlenme (45sa) → Sıfırlama!',
 hint:'45sa haftalık dinlenme tamamlandı. Sayaçlar sıfırlandı. Dönüş seferi başlayabilir. '}
 ]
 },
 /* ══ S3-9: DENETİM SİMÜLASYONU ══ */
 {
 icon:'🔍', title:'Trafik Denetimi — Belge Kontrolü',
 badge:'DENETİM',bcls:'#a855f7',
 desc:'Yol kenarı denetimi: müfettiş sisteme bağlanır, son 28 gün analiz edilir. Belgelerin hazır olmasını sağlayın.',
 guided:true,
 steps:[
 {mode:'driving', min:270, note:'Normal sürüş'},
 {mode:'rest', min:45, note:'Zorunlu mola'},
 {mode:'driving', min:180, note:'Sürüşe devam'},
 {mode:'available',min:60, note:'⚠️ MÜFETTIŞ KONTROLÜ: Araç kenarı park et!',
 hint:'Denetim basladi! Mufettis kontrol edecek: 1.Surucu karti(28 gun) 2.Takograf(56 gun) 3.Dinlenmeler 4.Mola sureleri 5.ADR belgesi'},
 {mode:'available',min:30, note:'Belge incelemesi devam ediyor...',
 hint:'Kontrol: Gunluk suruse Md.6, Haftalik suruse Md.6, Dinlenme Md.8, Mola Md.7 - Uyumlu ise ceza yok.'},
 {mode:'driving', min:120, note:'Denetim tamamlandı — Sürüşe devam',
 hint:'Denetim sonucu: Tüm belgeler uyumlu. İyi sürüşler! (Uyumsuzluk varsa para cezası: €200-€2000)'}
 ]
 }];

function loadScen(idx){
 resetSim();
 const sc=SCENS[idx];
 if(!sc){ doLog('✗ Senaryo bulunamadı: '+idx,'err'); return; }
 document.querySelectorAll('.scbtn').forEach(b=>b.classList.remove('act'));
 const sb=document.getElementById('sb'+idx);if(sb)sb.classList.add('act');

 /* Senaryo özel bayrakları */
 if(sc.extDay) extendDay();
 if(sc.doubleDriver) toggleDoubleDriver();

 /* Adımları uygula */
 sc.steps.forEach(step=>{
 if(step.mode==='work'&&step.workSub) S.workSub=step.workSub;
 if(step.mode!==S.mode)setMode(step.mode,null);
 if(step.min>0)advance(step.min);
 });

 /* E8+G6: Tamamlanan senaryo takibi + XP */
 if(!window._completedScens) window._completedScens = new Set(JSON.parse(localStorage.getItem('tachotr_completed_scens')||'[]'));
 const _isNewScen = !window._completedScens.has(idx);
 window._completedScens.add(idx);
 localStorage.setItem('tachotr_completed_scens', JSON.stringify([...window._completedScens]));
 /* G6: Senaryo XP — yeni tamamlanmışsa ver */
 if(typeof awardXP==='function' && _isNewScen){
   const _sc=SCENS[idx];
   const _pts=_sc?.badge==='İHLAL'?50:_sc?.badge==='UYUMLU'?100:_sc?.badge==='FERİBOT'?150:75;
   setTimeout(()=>{
     awardXP(_pts,(_sc?.title||'Senaryo')+' tamamlandı');
     if(window._completedScens.size===1) checkBadge('newbie');
     if(window._completedScens.size>=5) checkBadge('compliant');
     if(_sc?.badge==='FERİBOT') checkBadge('ferry_cap');
     if(window._ktyMode){S._ktyScens=(S._ktyScens||0)+1;if(S._ktyScens>=5)checkBadge('kty_driver');}
   },300);
 }
 /* Senaryo butonu üzerine ✓ ekle */
 const sbEl = document.getElementById('sb'+idx);
 if(sbEl && !sbEl.querySelector('.scen-done-mark')){
 const mark = document.createElement('span');
 mark.className='scen-done-mark';
 mark.style.cssText='position:absolute;top:2px;right:2px;color:var(--grn);font-size:.55rem;';
 mark.textContent='✓';
 sbEl.style.position='relative';
 sbEl.appendChild(mark);
 }

 /* Senaryo kartı */
 const card=document.getElementById('scencard');card.classList.add('vis');
 document.getElementById('scicon').textContent=sc.icon;
 document.getElementById('sctitle').textContent=sc.title.toUpperCase();
 document.getElementById('scdesc').textContent=sc.desc;

 const mclr={driving:'ss-d',rest:'ss-r',work:'ss-w',available:'ss-a'};
 const mlbl={driving:'SÜRÜŞ',rest:'DİNLENME',work:'İŞ',available:'UYGUNLUK'};
 document.getElementById('scsteps').innerHTML=sc.steps.filter(s=>s.min>0).map(s=>
 `<div class="scenstep">
 <span class="ssmode ${mclr[s.mode]}">${escapeHTML(mlbl[s.mode]||'')}</span>
 <span class="ssdur">${hm(s.min)}</span>
 <span class="ssnote">${escapeHTML(s.note||'')}</span>
 </div>`
 ).join('');

 const over=S.dailyDrv>S.dailyMax||S.contDrv>270||S.weeklyDrv>getWeeklyMax();
 const warn=S.dailyDrv>=480||S.contDrv>=240||S.breakLeft<=30;
 const res=document.getElementById('scres');
 if(over){res.className='scenres res-er';res.textContent=`✗ İHLAL: Günlük ${hm(S.dailyDrv)} sürüş (limit: ${hm(S.dailyMax)})!`;}
 else if(warn){res.className='scenres res-wn';res.textContent=`⚠ UYARI: Mola hakkı ${hm(S.breakLeft)} kaldı.`;}
 else{res.className='scenres res-ok';res.textContent=`✓ UYUMLU: Tüm parametreler yasal sınırlar içinde.`;}

 doLog(`📋 Senaryo yüklendi: ${sc.title}`,'ok');
}

/* Senaryo butonlarını dinamik render et */
function renderScenButtons(){
 /* Filtre barını oluştur — DOM hazır olduktan sonra */
 setTimeout(renderScenFilter, 50);
 const sec=document.getElementById('scen-sec');
 if(!sec)return;
 const hdr = '<div class="scen-hdr">— Senaryo Yükle —</div>';

 /* S8-5: Kategori ayraçları — badge'a göre grupla */
 const CATEGORIES = [
 {key:'core', label:'📚 Temel Senaryolar', test:s=>['UYUMLU','UYARI'].includes(s.badge)},
 {key:'violation',label:'⚠️ Kasıtlı İhlaller', test:s=>s.badge==='İHLAL'},
 {key:'special', label:'🌍 Özel Durumlar', test:s=>['FERİBOT','MANUEL','OLAY','ŞİRKET','ARIZA','ADR','DENETİM'].includes(s.badge)},
 {key:'g2v2', label:'🛰 G2V2 & Akıllı Takograf', test:s=>['G2V2','OSNMA','DSRC'].includes(s.badge)},
 {key:'training', label:'🎓 Eğitim & Araç', test:s=>['EĞİTİM','ARAÇ','SERVİS','YENİ','FİLO','CAN'].includes(s.badge)},
 {key:'intl', label:'🌐 Uluslararası & Denetim', test:s=>['ULUSLARARASI'].includes(s.badge)},
 ];

 const renderBtn = (sc,i) => {
 const bcls=sc.bcls||'#22c55e';
 const badge=sc.badge||'UYUMLU';
 const guidedBtn = sc.guided
 ? `<button onclick="event.stopPropagation();startGuidedScenario(${i})"
 aria-label="${sc.title} kılavuzlu başlat" title="Kılavuzlu Başlat"
 style="padding:2px 6px;background:rgba(245,158,11,.12);
 border:1px solid var(--amber);border-radius:3px;cursor:pointer;
 font-size:var(--fs-min);color:var(--amber);flex-shrink:0;margin-left:4px;">🎓</button>`
 : '';
 return `<div style="display:flex;align-items:center;margin-bottom:3px;">
 <button class="scbtn" id="sb${i}" onclick="loadScen(${i})"
 aria-label="${sc.title} senaryosunu yükle"
 style="flex:1;min-width:0;">
 <span class="scbdot"></span>${sc.icon} ${sc.title}
 <span class="scbbadge" style="color:${bcls};border-color:${bcls}">${badge}</span>
 </button>${guidedBtn}
 </div>`;
 };

 /* Senaryoları kategorilere ayır */
 let grouped = '';
 const used = new Set();
 CATEGORIES.forEach(cat => {
 const items = SCENS.map((s,i)=>({s,i})).filter(({s,i})=>!used.has(i)&&cat.test(s));
 if(items.length === 0) return;
 items.forEach(({i})=>used.add(i));
 grouped += `<div class="scen-cat-hdr" style="font-family:var(--M);font-size:.55rem;
 letter-spacing:1.5px;color:var(--amber);margin:8px 0 4px;padding:3px 0;
 border-bottom:1px solid var(--bdr);text-transform:uppercase;">
 ${cat.label} <span style="color:var(--dim);">(${items.length})</span></div>`;
 grouped += items.map(({s,i})=>renderBtn(s,i)).join('');
 });

 /* Kategorilenmemiş kalanları en sona ekle */
 const remaining = SCENS.map((s,i)=>({s,i})).filter(({i})=>!used.has(i));
 if(remaining.length > 0){
 grouped += `<div class="scen-cat-hdr" style="font-family:var(--M);font-size:.55rem;
 letter-spacing:1.5px;color:var(--dim);margin:8px 0 4px;padding:3px 0;
 border-bottom:1px solid var(--bdr);text-transform:uppercase;">
 Diğer <span>(${remaining.length})</span></div>`;
 grouped += remaining.map(({s,i})=>renderBtn(s,i)).join('');
 }

 sec.innerHTML = hdr + grouped;
 /* E8: Tamamlanan senaryoları işaretle */
 if(!window._completedScens) window._completedScens = new Set(JSON.parse(localStorage.getItem('tachotr_completed_scens')||'[]'));
 window._completedScens.forEach(idx => {
 const sbEl = document.getElementById('sb'+idx);
 if(sbEl && !sbEl.querySelector('.scen-done-mark')){
 const mark = document.createElement('span');
 mark.className='scen-done-mark';
 mark.style.cssText='position:absolute;top:2px;right:2px;color:var(--grn);font-size:.55rem;';
 mark.textContent='✓'; sbEl.style.position='relative';
 sbEl.appendChild(mark);
 }
 });
}

/* ═══ AYLIK TAKVİM ═══ */
const MONTHS={
 normal:{
 1:{d:0,w:0,r:1440,n:'Tatil',ok:true,rd:true},
 2:{d:0,w:0,r:1440,n:'Tatil',ok:true,rd:true},
 3:{d:480,w:60,r:660,n:'İstanbul→Ankara',ok:true},
 4:{d:420,w:90,r:690,n:'Ankara Dağıtım',ok:true},
 5:{d:360,w:45,r:795,n:'Yerel Seferler',ok:true},
 6:{d:510,w:60,r:630,n:'Ankara→İzmir',ok:true},
 7:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 8:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 9:{d:0,w:0,r:1440,n:'Tatil',ok:true,rd:true},
 10:{d:480,w:60,r:660,n:'İzmir→Bursa',ok:true},
 11:{d:450,w:90,r:660,n:'Bursa Dağıtım',ok:true},
 12:{d:420,w:60,r:720,n:'Bursa→İstanbul',ok:true},
 13:{d:360,w:45,r:795,n:'Yerel Sefer',ok:true},
 14:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 15:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 16:{d:0,w:0,r:1440,n:'Tatil',ok:true,rd:true},
 17:{d:480,w:60,r:660,n:'İstanbul→Ankara',ok:true},
 18:{d:510,w:60,r:630,n:'Uzun Mesafe',ok:true},
 19:{d:420,w:90,r:690,n:'Bölge Dağıtım',ok:true},
 20:{d:480,w:60,r:660,n:'Dönüş Seferi',ok:true},
 21:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 22:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 23:{d:0,w:0,r:1440,n:'Tatil',ok:true,rd:true},
 24:{d:360,w:45,r:795,n:'Kısa Sefer',ok:true},
 25:{d:420,w:60,r:720,n:'İstanbul Çevresi',ok:true},
 26:{d:480,w:60,r:660,n:'Şehirlerarası',ok:true},
 27:{d:300,w:30,r:870,n:'Kısa Sefer',ok:true},
 28:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 },
 uzun:{
 1:{d:0,w:0,r:1440,n:'Hazırlık',ok:true,rd:true},
 2:{d:540,w:90,r:570,n:'TR→BG Sınırı',ok:true},
 3:{d:600,w:60,r:540,n:'Sofya→Belgrad',ok:false},
 4:{d:540,w:60,r:660,n:'Belgrad→Münih',ok:true},
 5:{d:480,w:90,r:630,n:'Münih Teslimat',ok:true},
 6:{d:0,w:0,r:1440,n:'Tam Haftalık Din.',ok:true,rd:true},
 7:{d:0,w:0,r:1440,n:'Tam Haftalık Din.',ok:true,rd:true},
 8:{d:0,w:0,r:1440,n:'Dinlenme',ok:true,rd:true},
 9:{d:540,w:60,r:600,n:'Münih→Viyana',ok:true},
 10:{d:480,w:90,r:630,n:'Viyana→Budapeşte',ok:true},
 11:{d:510,w:60,r:630,n:'Budapeşte→Belgrad',ok:true},
 12:{d:540,w:60,r:600,n:'Belgrad→Sofya',ok:true},
 13:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 14:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 15:{d:0,w:0,r:1440,n:'Dinlenme',ok:true,rd:true},
 16:{d:480,w:60,r:660,n:'Sofya→İstanbul',ok:true},
 17:{d:420,w:45,r:735,n:'Gümrük Bekleme',ok:true},
 18:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 19:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 20:{d:0,w:0,r:1440,n:'Dinlenme',ok:true,rd:true},
 21:{d:480,w:60,r:660,n:'Yeni Sefer',ok:true},
 22:{d:510,w:60,r:630,n:'Uzun Mesafe',ok:true},
 23:{d:480,w:90,r:630,n:'Avrupa Turu',ok:true},
 24:{d:540,w:60,r:600,n:'Dönüş Yolu',ok:true},
 25:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 26:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 27:{d:480,w:60,r:660,n:'Kısa Sefer',ok:true},
 28:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 },
 karma:{
 1:{d:0,w:0,r:1440,n:'Tatil',ok:true,rd:true},
 2:{d:300,w:120,r:780,n:'Şehiriçi Dağıtım',ok:true},
 3:{d:420,w:60,r:720,n:'Kısa Mesafe',ok:true},
 4:{d:540,w:60,r:660,n:'Şehirlerarası',ok:true},
 5:{d:480,w:90,r:630,n:'Yük Transfer',ok:true},
 6:{d:360,w:60,r:780,n:'Dönüş',ok:true},
 7:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 8:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 9:{d:0,w:0,r:1440,n:'Tatil',ok:true,rd:true},
 10:{d:660,w:60,r:480,n:'⚠ Acil Sefer',ok:false},
 11:{d:0,w:0,r:1440,n:'Zorunlu Dinlenme',ok:true,rd:true},
 12:{d:360,w:90,r:750,n:'Kısa Sefer',ok:true},
 13:{d:480,w:60,r:660,n:'Şehirlerarası',ok:true},
 14:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 15:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 16:{d:0,w:0,r:1440,n:'Tatil',ok:true,rd:true},
 17:{d:420,w:45,r:735,n:'Normal Sefer',ok:true},
 18:{d:480,w:60,r:660,n:'Uzun Mesafe',ok:true},
 19:{d:390,w:90,r:720,n:'Dağıtım',ok:true},
 20:{d:450,w:60,r:690,n:'Dönüş Seferi',ok:true},
 21:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 22:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 23:{d:0,w:0,r:1440,n:'Tatil',ok:true,rd:true},
 24:{d:300,w:60,r:840,n:'Kısa Sefer',ok:true},
 25:{d:420,w:60,r:720,n:'Bölge',ok:true},
 26:{d:480,w:60,r:660,n:'Şehirlerarası',ok:true},
 27:{d:240,w:30,r:930,n:'Yarım Gün',ok:true},
 28:{d:0,w:0,r:1440,n:'Haftalık Dinlenme',ok:true,rd:true},
 }
};
let activeM='normal',selDay=null;

function loadMonth(n,btn){
 activeM=n;
 document.querySelectorAll('.mcbtn').forEach(b=>b.classList.remove('on'));
 if(btn)btn.classList.add('on');
 selDay=null;document.getElementById('ddet').classList.remove('vis');
 renderCal();
}

function renderCal(){
 const g=document.getElementById('cg');if(!g)return;
 const days=['PAZ','PZT','SAL','ÇAR','PER','CUM','CMT'];
 let html=days.map(d=>`<div class="calh">${d}</div>`).join('');
 const data=MONTHS[activeM];
 for(let d=1;d<=28;d++){
 const dd=data[d];
 const cls='cald'+(d===25?' today':'')+(d===selDay?' sel':'');
 let bars='',note='',status='';
 if(dd){
 const dp=(dd.d/1440*100).toFixed(0);
 const wp=(dd.w/1440*100).toFixed(0);
 const rp=Math.min(45,(dd.r/1440*100)).toFixed(0);
 if(dp>0)bars+=`<div class="abar ab-d" style="width:${dp}%"></div>`;
 if(wp>0)bars+=`<div class="abar ab-w" style="width:${wp}%"></div>`;
 if(rp>0)bars+=`<div class="abar ab-r" style="width:${rp}%"></div>`;
 note=dd.n;
 if(dd.rd)status='<div class="calrest">● REST</div>';
 else if(!dd.ok)status='<div class="calihl">✗ İHLAL</div>';
 else status='<div class="calok">✓ UYUMLU</div>';
 }
 html+=`<div class="${cls}" onclick="showDay(${d})"><div class="caldn">${d}</div>${bars}<div class="calnote">${note}</div>${status}</div>`;
 }
 const rem=28%7;
 if(rem>0)for(let i=0;i<7-rem;i++)html+=`<div class="cald empty"></div>`;
 g.innerHTML=html;
}

function showDay(d){
 selDay=d;renderCal();
 const dd=MONTHS[activeM][d];
 const det=document.getElementById('ddet');
 if(!dd){det.innerHTML=`<div class="ddtit">ŞUBAT ${d}, 2026 — VERİ YOK</div>`;det.classList.add('vis');return;}
 const dh=Math.floor(dd.d/60),dm=dd.d%60;
 const rh=Math.floor(dd.r/60),rm=dd.r%60;
 const wh=Math.floor(dd.w/60),wm=dd.w%60;
 const dc=dd.d>540?'dvr':dd.d>480?'dva':'dvg';
 const rc=dd.r<540?'dvr':'dvg';

 /* Mini zaman çizelgesi oluştur */
 let segs=[];
 if(dd.rd||dd.d===0){
 segs.push({abs:0,dur:1440,mode:'rest'});
 }else{
 /* Gece 00:00-07:00 dinlenme */
 segs.push({abs:0,dur:420,mode:'rest'});
 let cur=420;
 /* Sabah sürüşü */
 if(dd.d>=270){
 segs.push({abs:cur,dur:270,mode:'driving'});cur+=270;
 segs.push({abs:cur,dur:45,mode:'rest'});cur+=45;
 segs.push({abs:cur,dur:dd.d-270,mode:'driving'});cur+=dd.d-270;
 }else{
 segs.push({abs:cur,dur:dd.d,mode:'driving'});cur+=dd.d;
 }
 if(dd.w>0){segs.push({abs:cur,dur:dd.w,mode:'work'});cur+=dd.w;}
 const rl=1440-cur;
 if(rl>0)segs.push({abs:cur,dur:rl,mode:'rest'});
 }
 const segColors={driving:'#22c55e',rest:'#3b82f6',work:'#f59e0b',available:'#a855f7'};
 const segHtml=segs.map(s=>{
 const l=s.abs/1440*100;const w=s.dur/1440*100;
 return `<div class="ddseg" style="left:${l}%;width:${w}%;background:${segColors[s.mode]||'#3b82f6'}" title="${s.mode}: ${hm(s.dur)}"></div>`;
 }).join('');
 const axHtml=[0,3,6,9,12,15,18,21,24].map(h=>`<div class="ddah">${String(h).padStart(2,'0')}</div>`).join('');

 det.innerHTML=`
 <div class="ddtit">ŞUBAT ${d}, 2026 — ${dd.n}</div>
 <div class="ddgrid">
 <div class="ddcell"><div class="dl">Sürüş Süresi</div><div class="dv ${dc}">${dh}:${String(dm).padStart(2,'0')}</div></div>
 <div class="ddcell"><div class="dl">Dinlenme</div><div class="dv ${rc}">${rh}:${String(rm).padStart(2,'0')}</div></div>
 <div class="ddcell"><div class="dl">Diğer İş</div><div class="dv">${wh}:${String(wm).padStart(2,'0')}</div></div>
 <div class="ddcell"><div class="dl">Durum</div><div class="dv ${dd.ok?'dvg':'dvr'}">${dd.ok?'UYUMLU':'İHLAL'}</div></div>
 </div>
 <div class="ddtl">
 <div class="ddtltit">— GÜNLÜK ZAMANÇİZELGESİ —</div>
 <div class="ddaxis">${axHtml}</div>
 <div class="ddtrack">${segHtml}</div>
 <div class="ddleg">
 <div class="ddlegi"><div class="ddldot" style="background:var(--grn)"></div>Sürüş: ${hm(dd.d)}</div>
 <div class="ddlegi"><div class="ddldot" style="background:var(--blu)"></div>Dinlenme: ${hm(dd.r)}</div>
 <div class="ddlegi"><div class="ddldot" style="background:var(--amber)"></div>İş: ${hm(dd.w)}</div>
 </div>
 </div>
 ${!dd.ok?`<div class="ddihl">⚠ İHLAL: Sürüş süresi (${dh}s${dm>0?dm+'dk':''}) yasal 9 saatlik günlük limiti aşmaktadır!</div>`:''}
 `;
 det.classList.add('vis');
 det.scrollIntoView({behavior:'smooth',block:'nearest'});
}

/* Saat gerçek zamanlı güncelle — simülasyon zamanı */

/* ═══════════════════════════════════════════════════════════ */
function enterCalibrationMode(){
 S.operationMode='calibration';
 const badge=document.getElementById('opmode-badge');
 if(badge){badge.textContent='KALİBRASYON';badge.style.cssText='background:#1a0a2a;color:var(--purple-light);border:1px solid #c084fc;padding:1px 6px;border-radius:2px;font-size:var(--fs-min);letter-spacing:.5px;margin-left:2px';}
 doLog('⚙ KALİBRASYON MODU — Servis karti takildi. ','ok');
 doLog(' Yetkiler: Parametre V, Arac verileri V, Surucu verileri V');
 doLog(' Zorunluluk: Her 2 yilda bir + büyük onarim sonrasi. Sonra muhurlenecek.');
 showCalibrationDialog();
 updateLCD();
}
function exitCalibrationMode(){
 S.operationMode='driving';
 const badge=document.getElementById('opmode-badge');
 if(badge){if(typeof window._ktyMode!=='undefined'&&window._ktyMode){badge.textContent='🇹🇷 KTY';badge.className='lcd-opmode';badge.style.color='#e30a17';badge.style.borderColor='#e30a17';badge.style.background='rgba(227,10,23,.08)';}else{if(window._ktyMode){badge.textContent='🇹🇷 KTY';badge.className='lcd-opmode';badge.style.color='#e30a17';badge.style.borderColor='#e30a17';badge.style.background='rgba(227,10,23,.08)';}else{badge.textContent='🇪🇺 AB';badge.className='lcd-opmode';badge.style.color='#60a5fa';badge.style.borderColor='#3b82f6';badge.style.background='rgba(59,130,246,.08)';}}}
 doLog('⚙ Servis karti cikarildi. Suurus moduna donuldu.','ok');
 updateLCD();
}
function showCalibrationDialog(){
 const existing=document.getElementById('cal-dlg');
 if(existing){existing.remove();return;}
 const dlg=document.createElement('div');
 dlg.id='cal-dlg';
 dlg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#0d0b14;border:1px solid #c084fc;border-radius:8px;padding:18px 22px;z-index:9999;min-width:min(360px,calc(100vw - 24px));max-width:min(480px,calc(100vw - 24px));max-height:85vh;overflow-y:auto;box-shadow:0 8px 48px rgba(192,132,252,.2);font-family:var(--M);';
 const accessRows=[
 ['Surucu veri yazdir','X','V','V','V','V'],
 ['Arac veri yazdir','T1','T2','T3','V','V'],
 ['Parametre goster','X','T2','V','V','V'],
 ['Arac verisi oku','X','X','V','V','V'],
 ['Parametre oku','X','V','V','V','V'],
 ];
 const colColors=['#64748b','#22c55e','#f59e0b','#38bdf8','#c084fc'];
 const colH=['Islem','Kartsiz','Surucu','Sirket','Kontrol','Servis'];
 const hdr=colH.map((h,i)=>`<th style="padding:4px 6px;font-size:var(--fs-min);color:${colColors[i]||'#64748b'};text-align:center">${escapeHTML(h)}</th>`).join('');
 const rows=accessRows.map(r=>`<tr style="border-bottom:1px solid #0e0f16">${r.map((c,i)=>`<td style="padding:3px 6px;font-size:.625rem;text-align:center;color:${c==='V'?'#22c55e':c==='X'?'#ef4444':'#f59e0b'}">${escapeHTML(c)}</td>`).join('')}</tr>`).join('');
 dlg.innerHTML=`
 <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
 <div style="color:var(--purple-light);font-size:.875rem">⚙ KALİBRASYON </div>
 <button onclick="exitCalibrationMode();document.getElementById('cal-dlg').remove()" style="background:none;border:1px solid #2d2040;color:var(--slate);padding:2px 8px;border-radius:3px;cursor:pointer;font-size:.625rem" aria-label="Kalibrasyon modundan çık">✕ Cikis</button>
 </div>
 <div style="font-size:.625rem;color:var(--dim);margin-bottom:10px;padding:6px;background:#0a0812;border-radius:4px;line-height:1.6">
 ⚠ Gercekte: Yetkili servis + Servis karti zorunlu. Her 2 yilda bir.<br>
 Kalibrasyon sonrasi takograf mühürlenir.
 </div>
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px">
 ${[['cal-plate','Plaka','34 ABC 123',true],['cal-tire','Lastik','295/80 R22.5',true],['cal-l','l-faktoru (mm)','2959',true],['cal-weight','GVW (kg)','18000',true]].map(([id,lbl,val,ed])=>`
 <div style="background:#0e0a18;border-radius:4px;padding:7px">
 <div style="font-size:var(--fs-min);color:var(--slate);margin-bottom:3px">${escapeHTML(lbl)}</div>
 ${ed?`<input id="${id}" value="${val}" style="width:100%;background:#0a0812;border:1px solid #2d2040;color:var(--txt);font-family:var(--M);font-size:.625rem;padding:2px 5px;border-radius:2px">`:`<div style="font-size:.625rem;color:var(--dim)">${val}</div>`}
 </div>`).join('')}
 </div>
 <div style="display:flex;gap:6px;margin-bottom:12px">
 <button onclick="applyCalibration()" style="flex:1;padding:6px;background:#1a0a2a;border:1px solid #c084fc;color:var(--purple-light);border-radius:4px;cursor:pointer;font-size:.625rem;font-family:var(--M)" aria-label="Kalibrasyonu uygula">⚙ Uygula</button>
 <button onclick="printCalibration()" style="flex:1;padding:6px;background:#0a1020;border:1px solid #3b82f6;color:var(--blu);border-radius:4px;cursor:pointer;font-size:.625rem;font-family:var(--M)" aria-label="Kalibrasyon belgesi yazdır">🖨 Rapor</button>
 </div>
 <div style="font-size:var(--fs-min);color:var(--purple-light);letter-spacing:1px;margin-bottom:6px">KART ERİŞİM YETKİLERİ — PDF S.32</div>
 <table style="width:100%;border-collapse:collapse"><thead><tr style="background:#0e0a18">${hdr}</tr></thead><tbody>${rows}</tbody></table>
 <div style="font-size:var(--fs-min);color:var(--dim);margin-top:6px">V=Kisitlamasiz · X=Mumkun degil · T1=Kimliksiz 8gun · T2=Sadece takili kart · T3=Sirket aktiviteleri</div>`;
 document.body.appendChild(dlg);
}
function applyCalibration(){
 const plate=document.getElementById('cal-plate')?.value||'34 ABC 123';
 const tire=document.getElementById('cal-tire')?.value||'295/80 R22.5';
 const l=document.getElementById('cal-l')?.value||'2959';
 const gvw=document.getElementById('cal-weight')?.value||'18000';
 doLog('⚙ KALİBRASYON UYGULAMASI ','ok');
 doLog(` Plaka: ${plate} | Lastik: ${tire} | l-faktoru: ${l}mm | GVW: ${gvw}kg`);
 doLog(` Tarih: ${simDateStr()} ${simTime()} UTC | Takograf: ${S.dtcoVariant||'4.1b'}`);
 doLog(' Muhürleme: kalibrasyon sonrasi muhürlendi. ✓','ok');
 triggerWarning('⚙ Kalibrasyon Tamam','Parametreler kaydedildi. Muhürlendi. ','usage',5);
}
function printCalibration(){
 const sep='══════════════════════════════════════';
 const s2='──────────────────────────────────────';
 const content=`${sep}
⚙ KALİBRASYON RAPORU 
${s2}
 Tarih: ${simDateStr()} ${simTime()}
 Takograf: ${S.dtcoVariant||'4.1b'} | ${S.osnmaActive?'OSNMA':'Gecis'}
${s2}
 Plaka: 34 ABC 123
 Lastik: 295/80 R22.5
 l-faktr: 2959 mm
 k-faktr: 32768 imp/km
 GVW: 18000 kg
 KITAS: 4.0 / SN:21850001
${s2}
 Son kal: 2024-03-15
 Sonraki: 2026-03-15
${s2}
[2a] RAPOR SONU
${sep}`;
 const modal=document.getElementById('report-modal');
 const title=document.getElementById('report-title');
 const body=document.getElementById('report-body');
 if(modal&&title&&body){title.textContent='⚙ Kalibrasyon Raporu';body.textContent=content;modal.classList.add('vis');}
}

/* ═══════════════════════════════════════════════════════════
 FAZ C / MOD 2: HAFİF ARAÇ 2.5-3.5t | MOD 3: AETR
═══════════════════════════════════════════════════════════ */
function showLightVehicleInfo(){
 const existing=document.getElementById('lv-dlg');
 if(existing){existing.remove();return;}
 const dlg=document.createElement('div');
 dlg.id='lv-dlg';
 dlg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--bg-deep);border:1px solid #f59e0b;border-radius:8px;padding:18px 22px;z-index:9999;min-width:min(360px,calc(100vw - 24px));max-width:min(480px,calc(100vw - 24px));max-height:85vh;overflow-y:auto;box-shadow:0 8px 32px rgba(245,158,11,.2);font-family:var(--M);';
 const diffs=[
 ['Gunluk limit','9sa (2x10sa uzat)','10sa/gun (farkli!)','#f59e0b'],
 ['Haftalik limit','56sa max','60sa max (farkli!)','#f59e0b'],
 ['Zorunlu mola','45dk / 4:30 sonra','30dk / 6sa sonra','#f59e0b'],
 ['Haftalik dinlenme','45sa / 6 gunluk','24sa / 6 gunluk','#f59e0b'],
 ['Takograf turu','Smart Tacho 2 G2V2','Smart Tacho 2 G2V2','#22c55e'],
 ['OSNMA','Ara. 2025+ yeni arac','Tem. 2026+ yeni arac','#22c55e'],
 ['Kart indirme','28 gunluk','28 gunluk','#22c55e'],
 ];
 const rows=diffs.map(([t,h,l,c])=>`<tr style="border-bottom:1px solid #1a1500">
 <td style="padding:5px 8px;font-size:.625rem;color:var(--slate-light)">${escapeHTML(t)}</td>
 <td style="padding:5px 8px;font-size:.625rem;color:var(--grn)">${escapeHTML(h)}</td>
 <td style="padding:5px 8px;font-size:.625rem;color:${c}">${escapeHTML(l)}</td>
 </tr>`).join('');
 dlg.innerHTML=`
 <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
 <div style="color:var(--amber);font-size:.875rem">🚐 HAFİF ARAÇ (2.5-3.5t)</div>
 <button onclick="document.getElementById('lv-dlg').remove()" style="background:none;border:1px solid #2a1a00;color:var(--slate);padding:2px 8px;border-radius:3px;cursor:pointer;font-size:.625rem" aria-label="Hafif araç diyaloğunu kapat">✕</button>
 </div>
 <div style="background:#1a1000;border:1px solid #f59e0b;border-radius:4px;padding:8px;font-size:.625rem;color:#fbbf24;margin-bottom:10px;line-height:1.6">
 📅 <b>1 Temmuz 2026</b> — AB uluslararasi seferlerde 2.5-3.5t hafif kamyonetlerde Smart Tacho 2 zorunlu.
 </div>
 <table style="width:100%;border-collapse:collapse;margin-bottom:10px">
 <thead><tr style="background:#0e0c00">
 <th style="padding:5px 8px;font-size:var(--fs-min);color:var(--slate);text-align:left">KONU</th>
 <th style="padding:5px 8px;font-size:var(--fs-min);color:var(--grn);text-align:left">&gt;3.5t</th>
 <th style="padding:5px 8px;font-size:var(--fs-min);color:var(--amber);text-align:left">2.5-3.5t</th>
 </tr></thead><tbody>${rows}</tbody>
 </table>
 <div style="display:flex;gap:6px">
 <button onclick="activateLightVehicleMode()" style="flex:1;padding:6px;background:#1a1000;border:1px solid #f59e0b;color:var(--amber);border-radius:4px;cursor:pointer;font-size:.625rem;font-family:var(--M)" aria-label="Hafif araç modunu aktifleştir">Hafif Arac Modunu Etkinlestir</button>
 <button onclick="document.getElementById('lv-dlg').remove()" style="padding:6px 12px;background:var(--bdr);color:var(--slate);border:none;border-radius:4px;cursor:pointer;font-size:.625rem" aria-label="Hafif araç diyaloğunu kapat">Kapat</button>
 </div>`;
 document.body.appendChild(dlg);
}
function activateLightVehicleMode(){
 S.dailyMax=600; S.lightVehicleMode=true;
 document.getElementById('lv-dlg')?.remove();
 doLog('🚐 HAFİF ARAÇ MODU (2.5-3.5t) AKTİF — Temmuz 2026 kapsami','ok');
 doLog(' Gunluk: 10sa (600dk) | Haftalik: 60sa | Mola: 30dk / 6sa sonra');
 updateLCD();
}
function showAETRInfo(){
 const existing=document.getElementById('aetr-dlg');
 if(existing){existing.remove();return;}
 const dlg=document.createElement('div');
 dlg.id='aetr-dlg';
 dlg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--bg-deep);border:1px solid #60a5fa;border-radius:8px;padding:18px 22px;z-index:9999;min-width:min(380px,calc(100vw - 24px));max-width:min(500px,calc(100vw - 24px));max-height:85vh;overflow-y:auto;box-shadow:0 8px 48px rgba(96,165,250,.15);font-family:var(--M);';
 const compare=[
 ['Gunluk suurus','9sa (2x10sa)','9sa (2x10sa)','9sa (ulusal)'],
 ['Haftalik suurus','56sa max','56sa max','60sa ulusal'],
 ['2-haftalik','90sa','90sa','Uygulanmaz'],
 ['Mola','45dk/4:30','45dk/4:30','45dk'],
 ['Haftalik din.','45sa/6gun','45sa/6gun','24sa ulusal'],
 ['Takograf','Smart Tacho 2','Smart Tacho 2','Dijital yeterli'],
 ['Kapsam','Tum AB','36 ulke imzaci','Yurt ici'],
 ];
 const cRows=compare.map(r=>`<tr style="border-bottom:1px solid #0e0f16">
 ${r.map((c,i)=>`<td style="padding:4px 8px;font-size:.625rem;color:${['#94a3b8','#22c55e','#f59e0b','#a78bfa'][i]||'#94a3b8'}">${escapeHTML(c)}</td>`).join('')}
 </tr>`).join('');
 dlg.innerHTML=`
 <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
 <div style="color:var(--blue-light);font-size:.875rem">🌍 AETR & ULUSLARARASI </div>
 <button onclick="document.getElementById('aetr-dlg').remove()" style="background:none;border:1px solid #1e2232;color:var(--slate);padding:2px 8px;border-radius:3px;cursor:pointer;font-size:.625rem" aria-label="AETR diyaloğunu kapat">✕</button>
 </div>
 <div style="font-size:.625rem;color:var(--slate-light);margin-bottom:10px;line-height:1.7">
 AETR, AB ile AB disi ulkeler arasindaki yol tasimaciligi anlasmasi.<br>
 Turkiye AETR imzacisidir — AB ulkesine giren Turk kamyonlari AB 561/2006 kurallarina tabidir.
 </div>
 <table style="width:100%;border-collapse:collapse;margin-bottom:10px;font-size:.625rem">
 <thead><tr style="background:#0e1020">
 <th style="padding:5px 8px;text-align:left;color:var(--blue-light)">KONU</th>
 <th style="padding:5px 8px;text-align:left;color:var(--grn)">AB 561/2006</th>
 <th style="padding:5px 8px;text-align:left;color:var(--amber)">AETR</th>
 <th style="padding:5px 8px;text-align:left;color:var(--violet-light)">TR (ic)</th>
 </tr></thead><tbody>${cRows}</tbody>
 </table>
 <div style="background:#0a0e18;border:1px solid #1e2232;border-radius:4px;padding:8px;font-size:.625rem;color:var(--blue-light);line-height:1.7">
 <b>Turkiye → AB Seferi:</b><br>
 1. Turkiye cikisinda AETR kurallari gecerli<br>
 2. AB sinirinda Smart Tacho 2 kontrolu yapilabilir<br>
 3. Surucu karti G2V2 olmali (Aralik 2024+)<br>
 4. DSRC beacon ile arac durdurmadan kontrol<br>
 5. Son 56 gunun verileri talep edilebilir
 </div>`;
 document.body.appendChild(dlg);
}

/* ═══════════════════════════════════════════════════════════ */
const QUIZ_QUESTIONS=[
 {q:'Gunluk maksimum surus suresi nedir?',opts:['8 saat','9 saat','10 saat','12 saat'],a:1,ref:'AB 561/2006 Md.6'},
 {q:'Haftalik maksimum surus suresi?',opts:['45 saat','50 saat','56 saat','60 saat'],a:2,ref:'AB 561/2006 Md.6'},
 {q:'2 haftalik toplam maksimum surus?',opts:['80 saat','90 saat','100 saat','112 saat'],a:1,ref:'AB 561/2006 Md.6'},
 {q:'Kesintisiz surus sonrasi zorunlu mola suresi?',opts:['30 dk','45 dk','60 dk','90 dk'],a:1,ref:'AB 561/2006 Md.7'},
 {q:'Bolunmus molada minimum ilk parca?',opts:['10 dk','15 dk','20 dk','30 dk'],a:1,ref:'AB 561/2006 Md.7 — 15+30'},
 {q:'Gunluk minimum dinlenme suresi?',opts:['8 saat','9 saat','11 saat','12 saat'],a:2,ref:'AB 561/2006 Md.8'},
 {q:'Surucu karti veri indirme zorunlulugu?',opts:['7 gunde','14 gunde','28 gunde','90 gunde'],a:2,ref:'EU 165/2014'},
 {q:'VU (arac birimi) indirme zorunlulugu?',opts:['28 gunde','56 gunde','90 gunde','6 ayda'],a:2,ref:'EU 165/2014'},
 {q:'G2V2 surucu kartinda veri saklama suresi?',opts:['28 gun','45 gun','56 gun','90 gun'],a:2,ref:'EU 165/2014 (2024+)'},
 {q:'OSNMA teknolojisi ne ise yarar?',opts:['Bluetooth baglanti','Galileo GNSS sinyal dogrulama (spoofing engeli)','DSRC veri aktarimi','Yazici surucusu'],a:1,ref:'EU 2023/980 — Ara. 2025'},
 {q:'2.5-3.5t arasi araclarda takograf zorunlulugu?',opts:['Zaten zorunlu','Ocak 2026','Temmuz 2026','2027'],a:2,ref:'EU 2021/1228'},
 {q:'Kartsiz surus maksimum kac gun?',opts:['7 gun','10 gun','15 gun','30 gun'],a:2,ref:'EU 165/2014 '},
 {q:'kalibrasyonu kac yilda bir yapilir?',opts:['1 yil','2 yil','3 yil','5 yil'],a:1,ref:'EU 165/2014'},
 {q:'Feribot modunda dinlenme kac kez kesilebilir?',opts:['1 kez','2 kez','3 kez','Sinırsiz'],a:1,ref:'AB 561/2006 Md.9'},
 {q:'DSRC beacon ne saglar?',opts:['GNSS sinyal dogrulama','Arac durdurmadan uzaktan veri okuma','Bluetooth baglanti','Yol ucreti odeme'],a:1,ref:''},
];
let _quizS={active:false,idx:0,score:0,answered:false};
function showQuizDialog(){
 const ex=document.getElementById('quiz-dlg');
 if(ex){ex.remove();_quizS.active=false;return;}
 _quizS={active:true,idx:0,score:0,answered:false};
 _renderQuiz();
}
function _renderQuiz(){
 let dlg=document.getElementById('quiz-dlg');
 if(!dlg){
 dlg=document.createElement('div');
 dlg.id='quiz-dlg';
 dlg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--bg-deep);border:1px solid #22c55e;border-radius:8px;padding:18px 22px;z-index:9999;min-width:min(360px,calc(100vw - 24px));max-width:min(460px,calc(100vw - 24px));box-shadow:0 8px 48px rgba(34,197,94,.15);font-family:var(--M);';
 document.body.appendChild(dlg);
 }
 const total=QUIZ_QUESTIONS.length;
 const q=_quizS.idx<total?QUIZ_QUESTIONS[_quizS.idx]:null;
 if(!q){
 const pct=Math.round(_quizS.score/total*100);
 const grade=pct>=90?'Mukemmel!':pct>=70?'Gecti':pct>=50?'Orta':'Yetersiz';
 dlg.innerHTML=`<div style="text-align:center;padding:20px 0">
 <div style="font-size:2.5rem;margin-bottom:8px">${pct>=70?'🎉':'📚'}</div>
 <div style="color:var(--grn);font-size:1rem;font-weight:700;margin-bottom:4px">${pct}% — ${escapeHTML(grade)}</div>
 <div style="color:var(--slate);font-size:.625rem;margin-bottom:14px">Dogru: ${_quizS.score}/${total}</div>
 <div style="font-size:.625rem;color:var(--slate-light);line-height:1.6">${pct>=90?'Takograf kurallarını çok iyi biliyorsunuz!':pct>=70?'Temel kurallar tamam, detaylari gozden gecirin.':'Calisma materyallerine geri donmenizi oneririz.'}</div>
 <div style="display:flex;gap:8px;justify-content:center;margin-top:14px">
 <button onclick="_quizS={active:true,idx:0,score:0,answered:false};_renderQuiz()" style="padding:6px 14px;background:#0a2a0a;border:1px solid #22c55e;color:var(--grn);border-radius:4px;cursor:pointer;font-size:.625rem;font-family:var(--M)" aria-label="Quizi başlat">Tekrar</button>
 <button onclick="document.getElementById('quiz-dlg').remove()" style="padding:6px 14px;background:var(--bdr);color:var(--slate);border:none;border-radius:4px;cursor:pointer;font-size:.625rem" aria-label="Quiz diyaloğunu kapat">Kapat</button>
 </div></div>`;
 return;
 }
 const pct=(_quizS.idx/total)*100;
 dlg.innerHTML=`
 <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
 <div style="color:var(--grn);font-size:.75rem">📝 EGİTİM QUİZİ</div>
 <div style="font-family:var(--M);font-size:.625rem;color:var(--slate)">${_quizS.idx+1}/${total} · Puan:${_quizS.score}</div>
 </div>
 <div style="background:var(--s1);border-radius:3px;height:3px;margin-bottom:12px">
 <div style="background:var(--grn);height:3px;width:${pct}%;border-radius:3px"></div>
 </div>
 <div style="font-size:.75rem;color:var(--txt);margin-bottom:12px;line-height:1.5;min-height:38px">${escapeHTML(q.q)}</div>
 <div id="quiz-opts" style="display:flex;flex-direction:column;gap:5px;margin-bottom:10px">
 ${q.opts.map((opt,i)=>`<button onclick="_answerQuiz(${i})" id="qopt-${i}" style="text-align:left;padding:7px 10px;background:var(--s1);border:1px solid #1e2232;color:var(--slate-light);border-radius:4px;cursor:pointer;font-family:var(--M);font-size:.625rem">${String.fromCharCode(65+i)}. ${escapeHTML(opt)}</button>`).join('')}
 </div>
 <div id="quiz-fb" style="min-height:20px;font-size:.625rem;display:none;padding:5px 8px;border-radius:3px"></div>
 <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
 <div style="font-size:var(--fs-min);color:var(--dim)" id="quiz-ref"></div>
 <button id="qnext" onclick="_nextQuiz()" style="display:none;padding:5px 12px;background:#0a2a0a;border:1px solid #22c55e;color:var(--grn);border-radius:4px;cursor:pointer;font-size:.625rem;font-family:var(--M)">Sonraki →</button>
 </div>`;
}
function _answerQuiz(chosen){
 if(_quizS.answered)return;
 _quizS.answered=true;
 const q=QUIZ_QUESTIONS[_quizS.idx];
 const ok=chosen===q.a;
 if(ok)_quizS.score++;
 q.opts.forEach((_,i)=>{
 const b=document.getElementById('qopt-'+i);if(!b)return;
 b.style.cursor='default';
 if(i===q.a){b.style.borderColor='#22c55e';b.style.color='#22c55e';b.style.background='#0a2a0a';}
 else if(i===chosen&&!ok){b.style.borderColor='#ef4444';b.style.color='#ef4444';b.style.background='#2a0a0a';}
 else{b.style.opacity='.4';}
 });
 const fb=document.getElementById('quiz-fb');
 const ref=document.getElementById('quiz-ref');
 const nxt=document.getElementById('qnext');
 if(fb){fb.style.display='block';fb.textContent=ok?'✓ Dogru!':'✗ Yanlis. Dogru: '+String.fromCharCode(65+q.a)+'. '+q.opts[q.a];fb.style.background=ok?'#0a2a0a':'#2a0a0a';fb.style.color=ok?'#22c55e':'#ef4444';fb.style.border='1px solid '+(ok?'#22c55e':'#ef4444');}
 if(ref)ref.textContent='Kaynak: '+q.ref;
 if(nxt)nxt.style.display='block';
}
function _nextQuiz(){_quizS.idx++;_quizS.answered=false;_renderQuiz();}

/* ═══════════════════════════════════════════════════════════ */
function showWeeklyPlanner(){
 const ex=document.getElementById('planner-dlg');if(ex){ex.remove();return;}
 const dlg=document.createElement('div');
 dlg.id='planner-dlg';
 dlg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--bg-deep);border:1px solid #a78bfa;border-radius:8px;padding:18px 22px;z-index:9999;min-width:min(380px,calc(100vw - 24px));max-width:min(500px,calc(100vw - 24px));box-shadow:0 8px 48px rgba(167,139,250,.15);font-family:var(--M);';
 const wkMax=getWeeklyMax();
 const wkRem=Math.max(0,wkMax-S.weeklyDrv);
 const dyRem=Math.max(0,(S.dailyMax||540)-S.dailyDrv);
 const ctRem=Math.max(0,270-S.contDrv);
 const brk=S.breakLeft||270;
 const recs=[];
 if(S.contDrv>=240)recs.push({ico:'⚠',col:'#f59e0b',txt:'Kesintisiz '+hm(S.contDrv)+': Mola yaklasıyor (max 4:30)'});
 if(S.dailyDrv>=450)recs.push({ico:'📊',col:'#f59e0b',txt:'Gunluk '+hm(S.dailyDrv)+': Gunun '+Math.round(S.dailyDrv/(S.dailyMax||540)*100)+'% kullanildi'});
 if(wkRem<120)recs.push({ico:'🔴',col:'#ef4444',txt:'Haftalik '+hm(wkRem)+' kaldi — haftalik dinlenmeye hazirlan'});
 if((S.weeklyDeficit||0)>0)recs.push({ico:'💳',col:'#f97316',txt:'Telafi borcu: '+hm(S.weeklyDeficit)+' — 3. hafta sonuna kadar ode'});
 if(recs.length===0)recs.push({ico:'✓',col:'#22c55e',txt:'Tum gostergeler normal'});
 const recHTML=recs.map(r=>`<div style="display:flex;gap:8px;padding:5px 0;border-bottom:1px solid #0e0f16;font-size:.625rem"><span>${r.ico}</span><span style="color:${r.col}">${escapeHTML(r.txt)}</span></div>`).join('');
 const canDrive=Math.min(dyRem,ctRem,wkRem)>0&&brk>0;
 const maxDrive=Math.min(dyRem,ctRem,wkRem,brk);
 dlg.innerHTML=`
 <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
 <div style="color:var(--violet-light);font-size:.875rem">📅 HAFTALIK PLANLAMA </div>
 <button aria-label="Kapat" onclick="document.getElementById('planner-dlg').remove()" style="background:none;border:1px solid #1e2232;color:var(--slate);padding:2px 8px;border-radius:3px;cursor:pointer;font-size:.625rem">✕</button>
 </div>
 <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:12px">
 ${[['Haftalik Kalan',hm(wkRem),wkRem<120?'#ef4444':wkRem<240?'#f59e0b':'#22c55e'],['Gunluk Kalan',hm(dyRem),dyRem<60?'#f59e0b':'#22c55e'],['Kesintisiz Kalan',hm(ctRem),ctRem<30?'#ef4444':ctRem<60?'#f59e0b':'#22c55e'],['Mola Hakki',hm(brk),brk<=30?'#ef4444':brk<=60?'#f59e0b':'#22c55e'],['Telafi Borcu',hm(S.weeklyDeficit||0),(S.weeklyDeficit||0)>0?'#f97316':'#22c55e'],['Gunluk Din.',hm(S.restDayAcc||0),(S.restDayAcc||0)>=660?'#22c55e':'#3b82f6']].map(([l,v,c])=>`
 <div style="background:var(--s1);border-radius:4px;padding:7px 8px;border-left:2px solid ${c}">
 <div style="font-size:var(--fs-min);color:var(--slate);letter-spacing:.8px">${escapeHTML(l)}</div>
 <div style="font-size:.875rem;color:${c};font-weight:700;margin-top:2px">${escapeHTML(v)}</div>
 </div>`).join('')}
 </div>
 <div style="font-size:.625rem;color:var(--violet-light);letter-spacing:1px;margin-bottom:6px">📌 ANALİZ</div>
 <div style="margin-bottom:10px">${recHTML}</div>
 <div style="background:#0e0a18;border-radius:4px;padding:7px;font-size:.625rem;color:${canDrive?'#22c55e':'#f59e0b'}">
 ${canDrive?'✓ Surus mumkun. Optimal: '+hm(maxDrive)+' daha surubilirsin.':'⚠ Su an mola/dinlenme gerekiyor.'}
 </div>
 <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap">
 <button onclick="advance(30);showWeeklyPlanner()" style="padding:4px 10px;background:var(--s1);border:1px solid #a78bfa;color:var(--violet-light);border-radius:3px;cursor:pointer;font-size:.625rem;font-family:var(--M)" aria-label="+30 dakika ilerlet">+30dk</button>
 <button onclick="advance(60);showWeeklyPlanner()" style="padding:4px 10px;background:var(--s1);border:1px solid #a78bfa;color:var(--violet-light);border-radius:3px;cursor:pointer;font-size:.625rem;font-family:var(--M)" aria-label="+1 saat ilerlet">+1sa</button>
 <button onclick="newDay();document.getElementById('planner-dlg')?.remove()" style="padding:4px 10px;background:var(--s1);border:1px solid #60a5fa;color:var(--blue-light);border-radius:3px;cursor:pointer;font-size:.625rem;font-family:var(--M)" aria-label="Yeni güne geç">Yeni Gun</button>
 <button onclick="showWeeklyPlanner();showWeeklyPlanner()" style="padding:4px 10px;background:var(--s1);border:1px solid #22c55e;color:var(--grn);border-radius:3px;cursor:pointer;font-size:.625rem;font-family:var(--M)">Yenile ↺</button>
 </div>`;
 document.body.appendChild(dlg);
}

/* ═══════════════════════════════════════════════════════════ */
function showFleetEcosystem(){
 const ex=document.getElementById('fleet-dlg');if(ex){ex.remove();return;}
 const dlg=document.createElement('div');
 dlg.id='fleet-dlg';
 dlg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--bg-deep);border:1px solid #3b82f6;border-radius:8px;padding:18px 22px;z-index:9999;min-width:min(400px,calc(100vw - 24px));max-width:min(520px,calc(100vw - 24px));max-height:85vh;overflow-y:auto;box-shadow:0 8px 48px rgba(59,130,246,.15);font-family:var(--M);';
 const eco=[
 {name:'DLK Smart Download Key',ico:'🔑',col:'#f59e0b',
 desc:'USB + Bluetooth indirme cihazi. Tüm takograf versiyonları uyumlu. Kart + VU indirme. Otomatik BT aktarimi ( App). KeyTools PC yazilimi ile arsivleme.',
 steps:['USB portuna takın','Indirme otomatik baslar (~2-5 dk)','BT ile mobil uygulamaya aktar',' portalina yukle']},
 {name:' App',ico:'📱',col:'#22c55e',
 desc:'iOS + Android. DLK ile BT baglanti. Uyumluluk analizi. Surucu bildirimleri. Portal entegrasyonu. Ocak 2024+',
 steps:['App Store/Play Store indir','DLK veya BT baglantisi kur','Veri senkronize et','Rapor ve uyarilari incele']},
 {name:' Portal',ico:'☁',col:'#60a5fa',
 desc:'Web platformu. Coklu surucu/arac. Uyumluluk takibi. Indirme hatirlatici. Otomatik raporlama. GDPR uyumlu.',
 steps:['fleet.vdo.com hesap olustur','Arac ve suruculer ekle','Indirme takvimi olustur','Uyari ve raporlari ayarla']},
 {name:'OPTAC3 (Stoneridge)',ico:'📊',col:'#a78bfa',
 desc:'Stoneridge web tabanli takograf analiz sistemi. SE5000 + DLK Smart uyumlu. Ihlal ve uyum analizi.',
 steps:['optac3.com giris','SE5000 veya DLK ile veri aktar','Ihlal analizi yap','Coklu arac raporu olustur']},
 ];
 const cards=eco.map(e=>`
 <div style="background:var(--s1);border:1px solid #1e2232;border-radius:5px;padding:10px;margin-bottom:7px;border-left:3px solid ${e.col}">
 <div style="display:flex;align-items:center;gap:7px;margin-bottom:5px">
 <span style="font-size:1rem">${e.ico}</span>
 <span style="color:${e.col};font-size:.75rem;font-weight:700">${escapeHTML(e.name)}</span>
 </div>
 <div style="font-size:.625rem;color:var(--slate-light);line-height:1.5;margin-bottom:6px">${escapeHTML(e.desc)}</div>
 ${e.steps.map((s,i)=>`<div style="font-size:var(--fs-min);color:var(--dim);padding:1px 0">${i+1}. ${escapeHTML(s)}</div>`).join('')}
 </div>`).join('');
 dlg.innerHTML=`
 <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
 <div style="color:var(--blu);font-size:.875rem">🌐 FLEET & DLK EKOSİSTEMİ</div>
 <button aria-label="Kapat" onclick="document.getElementById('fleet-dlg').remove()" style="background:none;border:1px solid #1e2232;color:var(--slate);padding:2px 8px;border-radius:3px;cursor:pointer;font-size:.625rem">✕</button>
 </div>
 <div style="font-size:.625rem;color:var(--slate);margin-bottom:10px;line-height:1.5">
 , ekosistemiyle tam entegre calisir.<br>
 Zorunlu veri indirmeleri bu araclarla kolayca yonetilebilir.
 </div>
 ${cards}
 <div style="font-size:var(--fs-min);color:var(--dim);margin-top:4px">fleet.vdo.com · optac3.com · Nisan 2026</div>`;
 document.body.appendChild(dlg);
}

/* ═══════════════════════════════════════════════════════════ */
const DTCO_MENU = {
 'Yazdırma 1.Sürücü': {
 icon:'🖨', sub:['24h Günlük','!x Olaylar','Aktiviteler'], ref:''
 },
 'Yazdırma 2.Sürücü': {
 icon:'🖨', sub:['24h Günlük','!x Olaylar','Aktiviteler'], ref:''
 },
 'Yazdırma Araç': {
 icon:'🖨', sub:['24h Günlük','!x Olaylar','Aşırı Hız','Teknik Bilgi'], ref:''
 },
 'Giriş 1.Sürücü': {
 icon:'✏', sub:['Ülke Girişi','Vardiya Başı','Manuel Giriş','Feribot/Tren','OUT Başlangıç'], ref:''
 },
 'Giriş 2.Sürücü': {
 icon:'✏', sub:['Ülke Girişi','Vardiya Başı','Manuel Giriş'], ref:''
 },
 'Giriş Araç': {
 icon:'✏', sub:['Araç Plakası','UTC Zamanı','Bluetooth','Şirket Yerel Saati','Yük Tipi'], ref:''
 },
 'Görüntüle 1.Sürücü': {
 icon:'👁', sub:['Sürücü Süreleri','Sürücü Kimliği','Araç Kullanımı'], ref:''
 },
 'Görüntüle Araç': {
 icon:'👁', sub:['Araç Süreleri','Teknik Veriler','GNSS Konumu','Takograf Sürümü','Kalibrasyon Tarihi'], ref:''
 },
 'Merkezi Dil (opsiyonel)': {
 icon:'🌐', sub:['Türkçe','English','Deutsch','Français','Polski'], ref:''
 },
 'Yol Ücreti (opsiyonel)': {
 icon:'💰', sub:['Ücret Sorgula','Ücret Raporu'], ref:''
 },
};
let _menuPath=[];

function showMenuSimulator(){
 const ex=document.getElementById('menu-sim-dlg');
 if(ex){ex.remove();_menuPath=[];return;}
 _menuPath=[];
 _renderMenuSim();
}

function _renderMenuSim(){
 let dlg=document.getElementById('menu-sim-dlg');
 if(!dlg){
 dlg=document.createElement('div');
 dlg.id='menu-sim-dlg';
 dlg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#0a0e14;border:2px solid #22c55e;border-radius:0;padding:0;z-index:9999;width:320px;box-shadow:0 0 0 4px #000,0 0 0 6px #22c55e;font-family:var(--M);';
 document.body.appendChild(dlg);
 }
 /* LCD gibi ekran */
 const menuKeys=Object.keys(DTCO_MENU);
 const currentKey=_menuPath[0]||null;
 const subItems=currentKey?DTCO_MENU[currentKey].sub:null;
 const ref=currentKey?DTCO_MENU[currentKey].ref:'';
 const breadcrumb=_menuPath.length>0?_menuPath.join(' › '):'Ana Menü';

 const itemsHTML=currentKey&&subItems
 ?subItems.map((sub,i)=>`
 <div onclick="_menuAction('${currentKey}','${sub}')" style="padding:8px 14px;border-bottom:1px solid #0e3a0e;cursor:pointer;color:var(--grn);font-size:.75rem;display:flex;align-items:center;justify-content:space-between;transition:background .1s" onmouseover="this.style.background='#0e2a0e'" onmouseout="this.style.background='transparent'">
 <span>${escapeHTML(sub)}</span><span style="color:#1a5a1a">›</span>
 </div>`).join('')
 :menuKeys.map((key,i)=>`
 <div onclick="_menuPath=['${key}'];_renderMenuSim()" style="padding:8px 14px;border-bottom:1px solid #0e3a0e;cursor:pointer;color:var(--grn);font-size:.75rem;display:flex;align-items:center;justify-content:space-between;transition:background .1s" onmouseover="this.style.background='#0e2a0e'" onmouseout="this.style.background='transparent'">
 <span>${DTCO_MENU[key].icon} ${escapeHTML(key)}</span>
 <span style="color:#1a5a1a;font-size:var(--fs-min)">${escapeHTML(DTCO_MENU[key].ref)} ›</span>
 </div>`).join('');

 dlg.innerHTML=`
 <div style="background:#0e3a0e;padding:8px 12px;display:flex;justify-content:space-between;align-items:center">
 <div style="color:var(--grn);font-size:.625rem;letter-spacing:2px">— MENÜ ${escapeHTML(ref)}</div>
 <button aria-label="Kapat" onclick="document.getElementById('menu-sim-dlg').remove();_menuPath=[]" style="background:none;border:none;color:var(--grn);cursor:pointer;font-size:.875rem;line-height:1">✕</button>
 </div>
 <div style="background:#000;border-bottom:1px solid #0e3a0e;padding:5px 12px;font-size:.625rem;color:#1a6a1a;letter-spacing:.5px">› ${escapeHTML(breadcrumb)}</div>
 <div style="background:#000;max-height:280px;overflow-y:auto">${itemsHTML}</div>
 <div style="background:#0a0e0a;padding:6px 12px;display:flex;gap:8px;justify-content:space-between;align-items:center">
 <div style="font-size:var(--fs-min);color:#1a5a1a">⬅ tusu / Geri • ✓ tusu / Sec</div>
 ${_menuPath.length>0?`<button onclick="_menuPath=[];_renderMenuSim()" style="padding:2px 8px;background:#0e3a0e;border:1px solid #22c55e;color:var(--grn);border-radius:2px;cursor:pointer;font-size:.625rem">⬅ Geri</button>`:''}
 </div>`;
}

function _menuAction(menuKey, subItem){
 /* Simülatörde menü aksiyonunu gerçekleştir */
 const actions={
 '24h Günlük': ()=>showReport('24h'),
 '!x Olaylar': ()=>showReport('events'),
 'Aktiviteler': ()=>showReport('activity'),
 'Aşırı Hız': ()=>showReport('speed'),
 'Ülke Girişi': ()=>{document.getElementById('menu-sim-dlg').remove();_menuPath=[];showCountryDialog();},
 'Manuel Giriş': ()=>{document.getElementById('menu-sim-dlg').remove();_menuPath=[];toggleManualPanel();},
 'Feribot/Tren': ()=>{document.getElementById('menu-sim-dlg').remove();_menuPath=[];toggleFerry();},
 'OUT Başlangıç': ()=>{document.getElementById('menu-sim-dlg').remove();_menuPath=[];toggleOut();},
 'Bluetooth': ()=>{document.getElementById('menu-sim-dlg').remove();_menuPath=[];toggleBluetooth();},
 'Yük Tipi': ()=>{document.getElementById('menu-sim-dlg').remove();_menuPath=[];showCargoTypeDialog();},
 'Takograf Sürümü': ()=>{document.getElementById('menu-sim-dlg').remove();_menuPath=[];showDTCOVersionDialog();},
 'Kalibrasyon Tarihi': ()=>{
 document.getElementById('menu-sim-dlg').remove();_menuPath=[];
 doLog('👁 Görüntüle → Araç → Kalibrasyon Tarihi: 2024-03-15 | Sonraki: 2026-03-15 | Takograf '+( S.dtcoVariant||'4.1b'),'ok');
 triggerWarning('Kalibrasyon Bilgisi','Son kalibrasyon: 2024-03-15 | Sonraki muayene: 2026-03-15. ','usage',4);
 },
 'Teknik Veriler': ()=>{
 document.getElementById('menu-sim-dlg').remove();_menuPath=[];
 const info=`Takograf ${S.dtcoVariant||'4.1b'} | ${S.osnmaActive?'OSNMA':'Geciş'} | Kart: ${S.cardGen||'G2V2'} | Saklama: ${S.storageDays||56}gun | KITAS 4.0 SN:21850001 | l-fakt:2959mm | k-fakt:32768imp/km`;
 doLog('👁 Teknik Veriler: '+info,'ok');
 },
 'Araç Süreleri': ()=>{
 document.getElementById('menu-sim-dlg').remove();_menuPath=[];
 doLog(`👁 Araç Süreleri: Günlük=${hm(S.dailyDrv)} | Haftalık=${hm(S.weeklyDrv)} | Telafi borcu=${hm(S.weeklyDeficit||0)} | Odo=${(S.odo/1000).toFixed(1)}km`,'ok');
 },
 };
 if(actions[subItem]){
 actions[subItem]();
 doLog(`⬛ Menü: ${menuKey} › ${subItem}. `,'ok');
 } else {
 doLog(`ℹ Menü: ${menuKey} › ${subItem} — Bu alt fonksiyon görüntülendi. `,'ok');
 document.getElementById('menu-sim-dlg').remove();
 _menuPath=[];
 }
}

/* ═══════════════════════════════════════════════════════════ */
let _printerState={paper:true,jammed:false,hot:false,paperLevel:80};

function showPrinterPanel(){
 const ex=document.getElementById('printer-panel-dlg');
 if(ex){ex.remove();return;}
 const dlg=document.createElement('div');
 dlg.id='printer-panel-dlg';
 dlg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--bg-deep);border:1px solid #64748b;border-radius:8px;padding:18px 22px;z-index:9999;min-width:min(340px,calc(100vw - 24px));max-width:min(420px,calc(100vw - 24px));box-shadow:0 8px 32px #000a;font-family:var(--M);';
 const p=_printerState;
 const statusColor=(!p.paper||p.jammed||p.hot)?'#ef4444':'#22c55e';
 const statusTxt=p.jammed?'SIKIŞMA':p.hot?'AŞIRI SICAK':!p.paper?'KAĞIT YOK':'HAZIR';

 dlg.innerHTML=`
 <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
 <div style="color:var(--slate-light);font-size:.875rem">🖨 YAZICI PANELİ </div>
 <button aria-label="Kapat" onclick="document.getElementById('printer-panel-dlg').remove()" style="background:none;border:1px solid #1e2232;color:var(--slate);padding:2px 8px;border-radius:3px;cursor:pointer;font-size:.625rem">✕</button>
 </div>
 <!-- Yazıcı fiziksel görünüm -->
 <div style="background:#1a1a1a;border:2px solid #333;border-radius:6px;padding:14px;margin-bottom:12px;text-align:center;position:relative">
 <div style="font-size:var(--fs-min);color:#555;letter-spacing:2px;margin-bottom:8px">TERMAL YAZICI — </div>
 <!-- Kağıt çıkışı -->
 <div id="paper-strip" style="width:70%;margin:0 auto;background:${p.paper?'#f5f0e8':'#2a2a2a'};height:${p.paper?'40px':'8px'};border-radius:2px;border:1px solid ${p.paper?'#c8bfaa':'#333'};transition:all .3s;position:relative;overflow:hidden">
 ${p.paper?`<div style="position:absolute;top:2px;left:50%;transform:translateX(-50%);font-size:var(--fs-min);color:#999;white-space:nowrap">────────────────</div>`:''}
 </div>
 <div style="margin-top:6px;font-size:.625rem;font-weight:700;color:${statusColor}">${statusTxt}</div>
 <!-- Kağıt seviye göstergesi -->
 <div style="margin-top:8px;display:flex;align-items:center;gap:8px;justify-content:center">
 <span style="font-size:var(--fs-min);color:var(--slate)">Kağıt:</span>
 <div style="width:80px;height:6px;background:var(--bdr);border-radius:3px">
 <div style="width:${p.paper?p.paperLevel:0}%;height:100%;background:${p.paperLevel>30?'#22c55e':'#f59e0b'};border-radius:3px;transition:width .3s"></div>
 </div>
 <span style="font-size:var(--fs-min);color:var(--slate)">${p.paper?p.paperLevel+'%':'0%'}</span>
 </div>
 </div>
 <!-- Aksiyon butonları -->
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px">
 <button onclick="_printerAction('print24h')" style="padding:7px;background:var(--s1);border:1px solid ${p.paper&&!p.jammed&&!p.hot?'#3b82f6':'#1e2232'};color:${p.paper&&!p.jammed&&!p.hot?'#60a5fa':'#42506a'};border-radius:4px;cursor:pointer;font-size:.625rem;font-family:var(--M)">🖨 24h Raporu Yazdır</button>
 <button onclick="_printerAction('printEvents')" style="padding:7px;background:var(--s1);border:1px solid ${p.paper&&!p.jammed&&!p.hot?'#f97316':'#1e2232'};color:${p.paper&&!p.jammed&&!p.hot?'#f97316':'#42506a'};border-radius:4px;cursor:pointer;font-size:.625rem;font-family:var(--M)">⚠ Olaylar Yazdır</button>
 <button onclick="_printerAction('changePaper')" style="padding:7px;background:var(--s1);border:1px solid #f59e0b;color:var(--amber);border-radius:4px;cursor:pointer;font-size:.625rem;font-family:var(--M)">📜 Kağıt Değiştir </button>
 <button onclick="_printerAction('clearJam')" style="padding:7px;background:var(--s1);border:1px solid ${p.jammed?'#ef4444':'#1e2232'};color:${p.jammed?'#ef4444':'#42506a'};border-radius:4px;cursor:pointer;font-size:.625rem;font-family:var(--M)">🔧 Sıkışma Gider </button>
 <button onclick="_printerAction('coolDown')" style="padding:7px;background:var(--s1);border:1px solid ${p.hot?'#f97316':'#1e2232'};color:${p.hot?'#f97316':'#42506a'};border-radius:4px;cursor:pointer;font-size:.625rem;font-family:var(--M)">❄ Soğuma Bekle </button>
 <button onclick="_printerAction('clean')" style="padding:7px;background:var(--s1);border:1px solid #a78bfa;color:var(--violet-light);border-radius:4px;cursor:pointer;font-size:.625rem;font-family:var(--M)">🧹 Kafa Temizle </button>
 </div>
 <!-- Bilgi -->
 <div style="background:#0e1020;border-radius:4px;padding:7px;font-size:.625rem;color:var(--dim);line-height:1.6">
 : Yazdırma istek → menü → onay (ADR modunda kontak kapalıyken yazdırma yok!)<br>
 : Kağıt bitti → çekmeceyi aç → eski ruloyu çıkar → yeni ruloyu yerleştir → kapat<br>
 : Sıkışma → çekmeceyi aç → kağıdı dikkatlice çek → kapat → yazdırmayı tekrar dene<br>
 : Baskı kafasını yumuşak kuru bezle temizle (alkol ve çözücü kullanma!)
 </div>`;
 document.body.appendChild(dlg);
}

function _printerAction(action){
 const actions={
 'print24h': ()=>{
 /* ADR modunda kontak kapalıyken yazdırma yasak */
 if(S.adrMode){triggerWarning('Yazdırma mümkün değil! ADR','ADR varyantında kontak kapalıyken yazdırma mümkün değil. Kontağı açın. ','usage',5);return;}
 if(!_printerState.paper){triggerWarning('o Kağıt yok!','Yazıcıda kağıt yok. Yeni rulo yerleştirin. ','usage',4);return;}
 if(_printerState.jammed){triggerWarning('Yazıcı sıkışması','Kağıt sıkışması giderilmeden yazdırma yapılamaz. ','fault',4);return;}
 if(_printerState.hot){triggerWarning('Yazıcı duraklatıldı!','Termal kafa sıcaklığı yüksek. Soğumasını bekleyin. ','usage',6);return;}
 _printerState.paperLevel=Math.max(0,_printerState.paperLevel-12);
 if(_printerState.paperLevel===0)_printerState.paper=false;
 showReport('24h');
 doLog('🖨 24h Günlük raporu yazdırıldı. ','ok');
 document.getElementById('printer-panel-dlg')?.remove();showPrinterPanel();
 },
 'printEvents': ()=>{
 if(S.adrMode){triggerWarning('Yazdırma mümkün değil! ADR','ADR modunda yazdırma kısıtlı. ','usage',5);return;}
 if(!_printerState.paper){triggerWarning('o Kağıt yok!','Yazıcıda kağıt yok. ','usage',4);return;}
 _printerState.paperLevel=Math.max(0,_printerState.paperLevel-8);
 showReport('events');
 doLog('🖨 Olaylar/Arızalar raporu yazdırıldı.','ok');
 document.getElementById('printer-panel-dlg')?.remove();showPrinterPanel();
 },
 'changePaper': ()=>{
 _printerState.paper=true;_printerState.paperLevel=100;_printerState.jammed=false;
 doLog('📜 KAĞIT DEĞİŞTİRME : Yeni kağıt rulosu yerleştirildi. Yazıcı hazır.','ok');
 doLog(' Adım 1: Çekmeceyi aç 2: Eski ruloyu çıkar 3: Yeni ruloyu yerleştir 4: Kapat');
 triggerWarning('📜 Kağıt Değişti','Yeni kağıt rulosu takıldı. Yazıcı hazır. ','usage',3);
 document.getElementById('printer-panel-dlg')?.remove();showPrinterPanel();
 },
 'clearJam': ()=>{
 if(!_printerState.jammed){doLog('ℹ Kağıt sıkışması yok.','ok');return;}
 _printerState.jammed=false;
 doLog('🔧 KAĞIT SIKIŞMASI GİDERİLDİ : Kağıt çıkarıldı. Yazdırma tekrar başlatılabilir.','ok');
 document.getElementById('printer-panel-dlg')?.remove();showPrinterPanel();
 },
 'coolDown': ()=>{
 _printerState.hot=false;
 doLog('❄ Yazıcı soğudu. : Yazdırma otomatik devam edecek.','ok');
 document.getElementById('printer-panel-dlg')?.remove();showPrinterPanel();
 },
 'clean': ()=>{
 doLog('🧹 BASKI KAFASI TEMİZLEME : Yumuşak kuru bez kullanıldı.','ok');
 doLog(' UYARI: Alkol, çözücü veya ıslatılmış bez kullanılmaz!');
 doLog(' Temizlik sonrası test çıktısı alınması önerilir.');
 },
 };
 if(actions[action]) actions[action]();
}

function simulatePaperOut(){
 _printerState.paper=false;_printerState.paperLevel=0;
 triggerWarning('o Kağıt yok! xx','Yazıcı içinde kağıt yok. — Yeni kağıt rulosu yerleştirin.','usage');
 doLog('⚠ KAĞIT BİTTİ — Yazıcı çekmecesini aç, yeni rulo yerleştir.','warn');
}
function simulatePaperJam(){
 _printerState.jammed=true;
 triggerWarning('Yazıcı sıkışması','Termal yazıcı kağıt sıkışması. — Çekmeceyi aç, kağıdı çek.','fault');
 doLog('✗ KAĞIT SIKIŞMASI — Çekmeceyi aç, kağıdı dikkatlice çek, kapat.','err');
}

/* ═══════════════════════════════════════════════════════════ */
function showCrewSwapDialog(){
 const ex=document.getElementById('crew-dlg');if(ex){ex.remove();return;}
 const dlg=document.createElement('div');
 dlg.id='crew-dlg';
 dlg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--bg-deep);border:1px solid #f59e0b;border-radius:8px;padding:18px 22px;z-index:9999;min-width:min(360px,calc(100vw - 24px));max-width:min(480px,calc(100vw - 24px));box-shadow:0 8px 32px rgba(245,158,11,.2);font-family:var(--M);';

 const scenarios=[
 {id:1,title:'1. Durum — Ekip Halinde Kullanım',color:'#22c55e',
 desc:'Sürücü 2, Sürücü 1 olur. Kartlar farklı yuvalara taşınır.',
 steps:['1.Sürücü ve 2.Sürücü kartlarını çıkarın','Sürücü 2 kartını 1. yuvaya takın','Sürücü 1 kartını 2. yuvaya takın','İstenen aktiviteyi seçin'],
 sim:()=>{doLog('👥 EKİP DEĞİŞİMİ (1.Durum) : Sürücü rolleri değiştirildi.','ok');toggleDoubleDriver();}
 },
 {id:2,title:'2. Durum — Vardiya Sonu',color:'#3b82f6',
 desc:'1 veya 2 sürücü aracı terk eder. Rapor alınıp kart çıkarılır.',
 steps:['Gerekirse günlük rapor yazdırın','Sürücü kartını yuvasından çıkarın','Yeni sürücü kartını taktığında manuel giriş sorusu gelir','Araçta kalmayan süreyi girin'],
 sim:()=>{doLog('🚗 VARDİYA SONU (2.Durum) : Kart çıkarıldı, yeni sürücü için hazır.','ok');newDay();}
 },
 {id:3,title:'3. Durum — Karma Kullanım',color:'#a78bfa',
 desc:'Farklı takograf tipleri: Analog+Dijital veya farklı takograf nesilleri.',
 steps:['Kontrol belgelerinde son 28/56 günün çıktısı ibraz edilmeli','Karma araç kullanan sürücü her iki tipten belge taşımalı','Dijital takograf olmayan araç: el yazılı kayıt zorunlu'],
 sim:()=>{doLog('🔀 KARMA KULLANIM (3.Durum) : Farklı takograf tipleri. Son 28/56 günün belgeleri ibraz hazır olmalı.','ok');}
 },
 ];

 const cards=scenarios.map(s=>`
 <div style="background:var(--s1);border:1px solid #1e2232;border-radius:5px;padding:10px;margin-bottom:8px;border-left:3px solid ${s.color}">
 <div style="color:${s.color};font-size:.75rem;font-weight:700;margin-bottom:4px">${escapeHTML(s.title)}</div>
 <div style="font-size:.625rem;color:var(--slate-light);margin-bottom:6px;line-height:1.5">${escapeHTML(s.desc)}</div>
 <div style="font-size:var(--fs-min);color:var(--dim);margin-bottom:6px">
 ${s.steps.map((st,i)=>`<div style="padding:1px 0">${i+1}. ${escapeHTML(st)}</div>`).join('')}
 </div>
 <button onclick="(${s.sim.toString()})();document.getElementById('crew-dlg').remove()" style="padding:4px 12px;background:transparent;border:1px solid ${s.color};color:${s.color};border-radius:3px;cursor:pointer;font-size:.625rem;font-family:var(--M)">Simüle Et ▶</button>
 </div>`).join('');

 dlg.innerHTML=`
 <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
 <div style="color:var(--amber);font-size:.875rem">👥 SÜRÜCÜ/ARAÇ DEĞİŞİMİ </div>
 <button aria-label="Kapat" onclick="document.getElementById('crew-dlg').remove()" style="background:none;border:1px solid #1e2232;color:var(--slate);padding:2px 8px;border-radius:3px;cursor:pointer;font-size:.625rem">✕</button>
 </div>
 <div style="font-size:.625rem;color:var(--slate);margin-bottom:10px;line-height:1.5">
 PDF S.68 — Sürücü/araç değişimi 3 durum. Her durum farklı prosedür gerektirir.
 </div>
 ${cards}`;
 document.body.appendChild(dlg);
}

/* ═══════════════════════════════════════════════════════════ */
const FLEET_DRIVERS=[
 {name:'A. YILMAZ',plate:'34 ABC 123',status:'driving',drv:270,wkly:1350,country:'TR',violations:0},
 {name:'M. DEMİR', plate:'34 DEF 456',status:'rest', drv:480,wkly:2100,country:'DE',violations:1},
 {name:'H. ŞAHİN', plate:'06 GHJ 789',status:'work', drv:330,wkly:1680,country:'PL',violations:0},
 {name:'K. ARSLAN', plate:'35 KLM 012',status:'driving',drv:510,wkly:2700,country:'FR',violations:2},
 {name:'S. KAYA', plate:'01 NOP 345',status:'rest', drv:0, wkly:960, country:'TR',violations:0},
];

function showFleetPanel(){
 const ex=document.getElementById('fleet-panel-dlg');if(ex){ex.remove();return;}
 const dlg=document.createElement('div');
 dlg.id='fleet-panel-dlg';
 dlg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--bg-deep);border:1px solid #3b82f6;border-radius:8px;padding:0;z-index:9999;min-width:min(480px,calc(100vw - 24px));max-width:min(580px,calc(100vw - 24px));max-height:80vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 8px 48px rgba(59,130,246,.2);font-family:var(--M);';

 const statusColor={driving:'#22c55e',rest:'#3b82f6',work:'#f59e0b',available:'#a78bfa'};
 const statusLabel={driving:'SÜRÜŞ',rest:'DİNLENME',work:'İŞ',available:'UYGUNLUK'};

 const rows=FLEET_DRIVERS.map((d,i)=>{
 const isMe=i===0;
 const drvPct=Math.min(100,Math.round(d.drv/540*100));
 const wklyPct=Math.min(100,Math.round(d.wkly/getWeeklyMax()*100));
 const sc=statusColor[d.status]||'#64748b';
 return `<tr style="border-bottom:1px solid #0e0f16${isMe?';background:#0a1020':''}">
 <td style="padding:7px 10px">
 <div style="font-size:.625rem;color:${isMe?'#60a5fa':'#c8d4e8'};font-weight:${isMe?'700':'400'}">${escapeHTML(d.name)}${isMe?' ◀':''}</div>
 <div style="font-size:var(--fs-min);color:var(--dim)">${escapeHTML(d.plate)}</div>
 </td>
 <td style="padding:7px 10px;text-align:center">
 <span style="background:${sc}20;color:${sc};border:1px solid ${sc};padding:2px 7px;border-radius:2px;font-size:var(--fs-min);letter-spacing:.5px">${statusLabel[d.status]||d.status}</span>
 </td>
 <td style="padding:7px 10px">
 <div style="font-size:.625rem;color:var(--slate);margin-bottom:2px">Günlük: ${hm(d.drv)}</div>
 <div style="background:var(--s1);height:4px;border-radius:2px;width:60px">
 <div style="background:${drvPct>85?'#ef4444':drvPct>60?'#f59e0b':'#22c55e'};height:4px;width:${drvPct}%;border-radius:2px"></div>
 </div>
 </td>
 <td style="padding:7px 10px">
 <div style="font-size:.625rem;color:var(--slate);margin-bottom:2px">Haftalık: ${hm(d.wkly)}</div>
 <div style="background:var(--s1);height:4px;border-radius:2px;width:60px">
 <div style="background:${wklyPct>85?'#ef4444':wklyPct>60?'#f59e0b':'#22c55e'};height:4px;width:${wklyPct}%;border-radius:2px"></div>
 </div>
 </td>
 <td style="padding:7px 10px;text-align:center;font-size:.625rem;color:var(--blue-light)">${escapeHTML(d.country)}</td>
 <td style="padding:7px 10px;text-align:center;font-size:.625rem;color:${d.violations>0?'#ef4444':'#22c55e'}">${d.violations>0?'⚠'+d.violations:'✓'}</td>
 </tr>`;
 }).join('');

 dlg.innerHTML=`
 <div style="background:#0e1020;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0">
 <div>
 <div style="color:var(--blu);font-size:.75rem;font-weight:700">🚚 FİLO YÖNETİCİ PANELİ</div>
 <div style="font-size:var(--fs-min);color:var(--dim);margin-top:2px">5 sürücü · Canlı durum (simülasyon)</div>
 </div>
 <button aria-label="Kapat" onclick="document.getElementById('fleet-panel-dlg').remove()" style="background:none;border:1px solid #1e2232;color:var(--slate);padding:2px 8px;border-radius:3px;cursor:pointer;font-size:.625rem">✕</button>
 </div>
 <div style="overflow-y:auto;flex:1">
 <table style="width:100%;border-collapse:collapse">
 <thead>
 <tr style="background:#0a0e18">
 <th style="padding:6px 10px;text-align:left;font-size:var(--fs-min);color:var(--slate);letter-spacing:1px">SÜRÜCÜ</th>
 <th style="padding:6px 10px;text-align:center;font-size:var(--fs-min);color:var(--slate)">DURUM</th>
 <th style="padding:6px 10px;font-size:var(--fs-min);color:var(--slate)">GÜNLÜK</th>
 <th style="padding:6px 10px;font-size:var(--fs-min);color:var(--slate)">HAFTALIK</th>
 <th style="padding:6px 10px;text-align:center;font-size:var(--fs-min);color:var(--slate)">ÜLKE</th>
 <th style="padding:6px 10px;text-align:center;font-size:var(--fs-min);color:var(--slate)">İHLAL</th>
 </tr>
 </thead>
 <tbody>${rows}</tbody>
 </table>
 </div>
 <div style="background:#0a0e18;padding:8px 14px;font-size:var(--fs-min);color:var(--dim);flex-shrink:0">
 ◀ = Mevcut simülasyon | Gerçek: Portal veya OPTAC3 ile canlı izleme
 </div>`;
 document.body.appendChild(dlg);
}

/* ═══════════════════════════════════════════════════════════ */
function showTelematicsPanel(){
 const ex=document.getElementById('tele-dlg');if(ex){ex.remove();return;}
 const dlg=document.createElement('div');
 dlg.id='tele-dlg';
 dlg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--bg-deep);border:1px solid #22c55e;border-radius:8px;padding:18px 22px;z-index:9999;min-width:min(380px,calc(100vw - 24px));max-width:min(500px,calc(100vw - 24px));max-height:85vh;overflow-y:auto;box-shadow:0 8px 48px rgba(34,197,94,.1);font-family:var(--M);';

 /* Simüle edilmiş CAN bus verileri */
 const rpm=S.mode==='driving'?Math.round(1200+(S.speed||0)*8+(Math.random()-0.5)*100):700;
 const hz4spd=S.mode==='driving'?((S.speed||0)/3.6).toFixed(2):0;
 const d1Status=S.mode==='driving'?'Aktif (Sürüş)':S.mode==='rest'?'Dinlenme':S.mode==='work'?'İş':'Uygunluk';
 const d2Status=S.doubleDriver?'Uygunluk (2.Sürücü)':'Kart Yok';

 dlg.innerHTML=`
 <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
 <div style="color:var(--grn);font-size:.875rem">📡 TELEMATİK & CAN BUS </div>
 <button aria-label="Kapat" onclick="document.getElementById('tele-dlg').remove()" style="background:none;border:1px solid #1e2232;color:var(--slate);padding:2px 8px;border-radius:3px;cursor:pointer;font-size:.625rem">✕</button>
 </div>
 <div style="font-size:.625rem;color:var(--slate);margin-bottom:12px;line-height:1.5">
 Takograf yığın belleğine kaydedilen kişisel verileri. — Araç CAN bus sinyalleri.
 </div>
 <!-- CAN Bus live data -->
 <div style="font-size:.625rem;color:var(--grn);letter-spacing:1px;margin-bottom:8px">CAN BUS — CANLI VERİ (Simülasyon)</div>
 <div style="background:#000;border:1px solid #1a3a1a;border-radius:4px;padding:10px;font-family:'Courier New',monospace;margin-bottom:12px">
 ${[
 ['Motor Devir (RPM)', rpm+' rpm', rpm>2500?'#f59e0b':'#22c55e'],
 ['4Hz Hız Sinyali', hz4spd+' m/s', '#22c55e'],
 ['D1 Aktivite', d1Status, '#22c55e'],
 ['D2 Aktivite', d2Status, S.doubleDriver?'#22c55e':'#42506a'],
 ['CAN Bus', S.mode==='driving'?'AKTİF':'BEKLİYOR', S.mode==='driving'?'#22c55e':'#42506a'],
 ['Bluetooth', S.bluetoothOn?'BAĞLI':'KAPALI', S.bluetoothOn?'#22c55e':'#42506a'],
 ['DSRC Anten', S.dsrcEnabled?'AKTİF':'PASİF', S.dsrcEnabled?'#22c55e':'#42506a'],
 ].map(([k,v,c])=>`<div style="display:flex;justify-content:space-between;padding:2px 0;font-size:.625rem">
 <span style="color:#1a5a1a">${escapeHTML(k)}</span>
 <span style="color:${c}">${escapeHTML(v)}</span>
 </div>`).join('')}
 </div>
 <!-- kişisel veriler -->
 <div style="font-size:.625rem;color:var(--amber);letter-spacing:1px;margin-bottom:6px">KİŞİSEL VERİLER </div>
 <div style="font-size:.625rem;color:var(--slate-light);line-height:1.7;background:#0e1010;border-radius:4px;padding:8px;margin-bottom:10px">
 Kaydedilen verileri (Sürücü izni gerektirir):<br>
 • D1/D2 durum girişleri — Aktivite değişimleri<br>
 • Motor devir sayısı profilleri (CAN bus)<br>
 • Hız profilleri (16 hız aralığı)<br>
 • 4 Hz hız sinyali (gerçek zamanlı)<br><br>
 <span style="color:var(--dim)">NOT: Bu veriler sürücü kartının ilk kez takılmasında onay alındıktan sonra kaydedilir.</span>
 </div>
 <!-- Hız profili görselleştirmesi -->
 <div style="font-size:.625rem;color:var(--blue-light);letter-spacing:1px;margin-bottom:6px">HIZ PROFİLİ — 16 ARALIK </div>
 <div style="display:flex;gap:2px;align-items:flex-end;height:40px;background:var(--s1);border-radius:4px;padding:4px 6px">
 ${[0,5,3,8,12,18,15,22,19,14,10,7,4,2,1,0].map((v,i)=>{
 const speed=i*8;
 return `<div title="${speed}-${speed+8}km/h: ${v}%" style="flex:1;background:${i<3?'#3b82f6':i<8?'#22c55e':i<12?'#f59e0b':'#ef4444'};height:${Math.max(2,v*1.8)}px;border-radius:1px 1px 0 0;min-width:0"></div>`;
 }).join('')}
 </div>
 <div style="display:flex;justify-content:space-between;font-size:var(--fs-min);color:var(--dim);margin-top:2px"><span>0</span><span>64</span><span>96</span><span>128 km/h</span></div>`;
 document.body.appendChild(dlg);
}

/* ══════════════════════════════════════════════════════════
 UX: SEKME YÖNETİMİ, AKTİF MOD GÖSTERGESİ, FİLTRE
══════════════════════════════════════════════════════════ */
function switchRPanel(tab){
 document.querySelectorAll('.rp-panel').forEach(p=>p.classList.remove('active'));
 document.querySelectorAll('.rp-tab').forEach(t=>t.classList.remove('active'));
 const panel=document.getElementById('rp-'+tab);
 const tabEl=document.getElementById('tab-'+tab);
 if(panel) panel.classList.add('active');
 if(tabEl) tabEl.classList.add('active');
 /* Konum sekmesi — verilerini güncelle */
 if(tab==='gnss') _updateGnssTab();
 /* Veri sekmesi — render */
 if(tab==='data'){ renderSnapshotList(); renderProfileList(); }
 /* AI sekmesi — durum güncelle */
 if(tab==='ai'){ updateRiskDisplay(); }
 /* Durum sekmesi — trend güncelle */
 if(tab==='status'){ renderUyumTrend(); updateRiskDisplay(); }
}

function _updateGnssTab(){
 /* Konum log */
 const posEl=document.getElementById('pos-log-tab-body');
 if(posEl){
 const logs=(S.positionLog||[]);
 if(logs.length===0){
 posEl.innerHTML='<div data-empty>📍 Henüz konum kaydı yok</div>';
 } else {
 const lbl={'shift_start':'Vardiya Başı','shift_end':'Vardiya Sonu','3h_drive':'3sa Sürüş','loading':'Yükleme','unloading':'Boşaltma','border':'Sınır'};
 posEl.innerHTML=logs.slice(-15).reverse().map(p=>`
 <div style="display:flex;gap:8px;padding:4px 10px;border-bottom:1px solid var(--s3);font-family:var(--M);font-size:var(--fs-min);align-items:center">
 <span style="color:var(--dim);min-width:34px">${escapeHTML(p.t)}</span>
 <span style="color:${p.locked?'#a78bfa':'#f59e0b'}">${p.locked?'🔒':'🔓'}</span>
 <span style="color:var(--blue-light);min-width:22px">${escapeHTML(p.country)}</span>
 <span style="color:var(--txt);flex:1">${escapeHTML(lbl[p.reason]||p.reason)}</span>
 </div>`).join('');
 }
 }
 /* Sınır log */
 const borEl=document.getElementById('border-log-tab-body');
 if(borEl){
 const logs=(S.borderLog||[]);
 if(logs.length===0){
 borEl.innerHTML='<div data-empty>🌍 Henüz sınır geçişi yok</div>';
 } else {
 borEl.innerHTML=logs.slice(-10).reverse().map(b=>`
 <div style="display:flex;gap:8px;padding:4px 10px;border-bottom:1px solid var(--s3);font-family:var(--M);font-size:var(--fs-min);align-items:center">
 <span style="color:var(--dim);min-width:34px">${escapeHTML(b.t)}</span>
 <span style="color:${b.auto?'#22c55e':'#f59e0b'}">${b.auto?'🛰':'✏'}</span>
 <span style="color:var(--blue-light)">${escapeHTML(b.from)}→${escapeHTML(b.to)}</span>
 <span style="flex:1;color:${b.osnma?'#a78bfa':'#42506a'};font-size:var(--fs-min)">${b.osnma?'🔒':''}${b.auto?'OTO':'MAN'}</span>
 </div>`).join('');
 }
 }
}


/* S9: Araç paneli buton tanımları — kategoriye göre sıralı */
const TOOL_BUTTONS = [
 /* Zamanlama (LCD içinde ayrıca var — burada sadece yönetim araçları) */
 {label:'Yeni Gün', icon:'📅', fn:'newDay()', cat:'time'},
 {label:'10sa Uzat',icon:'⬆️', fn:'extendDay()', cat:'time'},
 {label:'Uzat İptal',icon:'✕', fn:'cancelExtendDay()', cat:'time'},
 {label:'Sıfırla', icon:'↺', fn:'resetSim()', cat:'time', warn:true},
 /* Modlar */
 {label:'Çift Sürücü',icon:'👥',fn:'toggleDoubleDriver()',cat:'mode'},
 {label:'Feribot', icon:'⛴', fn:'toggleFerry()', cat:'mode'},
 {label:'OUT', icon:'⚙', fn:'toggleOutMode()',cat:'mode'},
 {label:'Manuel', icon:'✏', fn:'toggleManual()', cat:'mode'},
 {label:'Ülke', icon:'🌍', fn:'openCountryDlg()',cat:'mode'},
 {label:'ADR', icon:'☢', fn:'toggleADR()', cat:'mode'},
 {label:'Şirket', icon:'🏢', fn:'toggleCompany()',cat:'mode'},
 {label:'Hafif Araç',icon:'🚐',fn:'toggleLightVehicle()',cat:'mode'},
 /* Planlama & Analiz */
 {label:'Haftalık Plan',icon:'🗓️',fn:'openPlanWizard()',cat:'plan'},
 {label:'Müfettiş', icon:'🔍', fn:'openInspectorMode()',cat:'plan'},
 {label:'KTY', icon:'🇹🇷', fn:'openKTYProtocol()',cat:'plan'},
 {label:'KTY Mod', icon:'🇹🇷', fn:'toggleKTYMode()',cat:'plan'},
 {label:'KTY Ceza', icon:'₺', fn:'openKTYFineTable()',cat:'plan'},
 /* AI & Veri */
 {label:'AI Danışman',icon:'🤖',fn:'openAIChat()', cat:'data'},
 {label:'CSV Yükle',icon:'📥', fn:'importCSV()', cat:'data'},
 /* Donanım */
 {label:'Bluetooth',icon:'📶', fn:'toggleBluetooth()',cat:'hw'},
 {label:'GNSS', icon:'📍', fn:'toggleGNSS()', cat:'hw'},
 {label:'Hız Lim.', icon:'🚦', fn:'openSpeedLimit()',cat:'hw'},
 {label:'OSNMA', icon:'🛰', fn:'toggleOSNMA()', cat:'hw'},
 {label:'DSRC', icon:'📡', fn:'toggleDSRC()', cat:'hw'},
 /* Belge & Rapor */
 {label:'Rapor', icon:'📋', fn:'printReport()', cat:'doc'},
 {label:'UTC', icon:'🕐', fn:'openUTCMenu()', cat:'doc'},
 {label:'Piktog.', icon:'📊', fn:'openPictograms()',cat:'doc'},
 {label:'Yük Tipi', icon:'📦', fn:'openCargoTypeDlg()',cat:'doc'},
 {label:'Takograf Ver.',icon:'🔢', fn:'openDtcoVersion()',cat:'doc'},
 {label:'Kart Gen.',icon:'💳', fn:'openCardGen()', cat:'doc'},
];

function _renderToolButtons(){
 const strip = document.getElementById('btn-panel-strip');
 if(!strip) return;
 const catLabels = {
 time: '📅 Yönetim',
 mode: '🔄 Mod',
 plan: '📊 Plan & Analiz',
 data: '🤖 AI & Veri',
 hw: '🛰 Donanım',
 doc: '📋 Belge',
 };
 const cats = ['time','mode','plan','data','hw','doc'];
 let html = '';
 cats.forEach((cat,ci) => {
 const items = TOOL_BUTTONS.filter(b=>b.cat===cat);
 if(items.length === 0) return;
 /* Kategori ayraç */
 if(ci > 0){
 html += `<div style="flex-shrink:0;width:1px;background:var(--LD);margin:0 4px;align-self:stretch;"></div>`;
 }
 html += `<div style="flex-shrink:0;display:flex;flex-direction:column;align-items:center;
 justify-content:center;padding:0 4px;font-family:var(--M);font-size:var(--fs-min);
 color:var(--LD2);letter-spacing:1px;">${catLabels[cat]}</div>`;
 /* Butonlar */
 items.forEach(b => {
 const c = b.warn ? 'var(--LR)' : 'var(--LF)';
 html += `<button onclick="${b.fn}" aria-label="${b.label}"
 style="flex-shrink:0;scroll-snap-align:start;min-width:62px;height:50px;
 background:rgba(0,0,0,.5);border:1px solid var(--LD);color:${c};
 border-radius:3px;cursor:pointer;font-family:var(--M);font-size:var(--fs-min);
 display:flex;flex-direction:column;align-items:center;justify-content:center;
 gap:2px;padding:3px 4px;transition:.12s;"
 onmouseover="this.style.background='rgba(168,212,48,.08)';this.style.borderColor='var(--LF)'"
 onmouseout="this.style.background='rgba(0,0,0,.5)';this.style.borderColor='var(--LD)'">
 <span style="font-size:.95rem;line-height:1;">${b.icon}</span>
 <span style="font-size:var(--fs-min);line-height:1.1;text-align:center;white-space:nowrap;">${b.label}</span>
 </button>`;
 });
 });
 strip.innerHTML = html;
}

function toggleBtnPanel(){ /* kaldırıldı — LCD araç şeridi kullanılıyor */ }

/* Aktif mod göstergesini güncelle */
function updateActiveModeDisplay(){
 /* S1-9: mbtns aktif butonu vurgula */
 ['btn-d','btn-r','btn-w','btn-a'].forEach(function(id){
 const el=document.getElementById(id);
 if(el) el.classList.remove('active');
 });
 const map={driving:'btn-d',rest:'btn-r',work:'btn-w',available:'btn-a'};
 const ab=map[S.mode];
 if(ab){ const el=document.getElementById(ab); if(el) el.classList.add('active'); }
 const el=document.getElementById('active-mode-display');
 if(!el) return;
 const icon=document.getElementById('amd-icon');
 const lbl=document.getElementById('amd-label');
 const sub=document.getElementById('amd-sub');
 const timer=document.getElementById('amd-timer');

 /* WORK_SUBS güvenli erişim */
 const wsubLbl = (typeof WORK_SUBS !== 'undefined' && WORK_SUBS[S.workSub])
 ? WORK_SUBS[S.workSub].lbl : (S.workSub||'—');

 const modeConfig={
 driving:{cls:'amd-driving', ico:'🚗', lbl:'SÜRÜŞ',
 sub:`Günlük: ${hm(S.dailyDrv||0)} / ${hm(S.dailyMax||540)}`},
 rest:{cls:'amd-rest', ico:'💤', lbl:'DİNLENME',
 sub:`Oturum: ${hm(S.restSes||0)}`},
 work:{cls:'amd-work', ico:'💼', lbl:'DİĞER İŞ',
 sub:`Alt mod: ${wsubLbl}`},
 available:{cls:'amd-available', ico:'📬', lbl:'UYGUNLUK',
 sub:'Bekleme süresi'},
 };
 const mc = modeConfig[S.mode] || modeConfig.rest;

 el.className = 'active-mode-display ' + mc.cls;
 if(icon) icon.textContent = mc.ico;
 if(lbl) lbl.textContent = mc.lbl;
 if(sub) sub.textContent = mc.sub;

 /* Mevcut modda geçen süre — S._modeStart set edilmişse */
 if(timer){
 const elapsed = (S._modeStart !== undefined)
 ? Math.max(0, S.simMin - S._modeStart) : 0;
 timer.textContent = hm(elapsed);
 }

 /* Hızlı onay butonu — aktif uyarı varsa göster */
 const qbAck = document.getElementById('qb-ack');
 if(qbAck){
 const hasWarn = Array.isArray(S.activeWarnings) && S.activeWarnings.length > 0;
 qbAck.style.display = hasWarn ? 'inline-flex' : 'none';
 }
}

/* Senaryo filtresi */
const SCEN_CATS={
 'UYUMLU':'Temel','UYARI':'Temel','MANUEL':'Temel','FERİBOT':'Temel',
 'G2V2':'G2V2','OSNMA':'G2V2','DSRC':'G2V2','KABOTAJ':'G2V2',
 'OLAY':'Arıza','ARIZA':'Arıza','ADR':'Arıza',
 'ŞİRKET':'Araç','SERVİS':'Araç','EKIP':'Araç','FİLO':'Araç','CAN':'Araç',
 'EĞİTİM':'Eğitim','MENU':'Eğitim','YENİ':'Eğitim','ARAÇ':'Eğitim',
 /* S3-7/8/9 */
 'İHLAL':'İhlal','ULUSLARARASI':'İhlal',
 'DENETİM':'Denetim',
};
let _activeCat='Tümü';

function renderScenFilter(){
 const container=document.getElementById('scen-filter');
 if(!container) return;
 const cats=['Tümü','Temel','G2V2','Arıza','Araç','Eğitim','İhlal','Denetim'];
 container.innerHTML=cats.map(c=>`<button class="sf-btn${_activeCat===c?' active':''}" onclick="filterScens('${c}')" aria-label="Senaryoları filtrele">${c}</button>`).join('');
}

function filterScens(cat){
 _activeCat=cat;
 renderScenFilter();
 document.querySelectorAll('.scbtn').forEach(btn=>{
 const idx=parseInt(btn.id.replace('sb',''));
 const sc=SCENS[idx];
 if(!sc) return;
 const scCat=SCEN_CATS[sc.badge]||'Temel';
 btn.style.display=(cat==='Tümü'||scCat===cat)?'':'none';
 });
}

/* Progress barları renk eşiğiyle güncelle */
function updateProgressColors(){
 /* LCD progress barları */
 const _dynWkMax = getWeeklyMax();
 const bars=[
 {fill:'pb-d',val:S.dailyDrv,max:S.dailyMax||540},
 {fill:'pb-c',val:S.contDrv,max:CONT_DRIVE_LIMIT},
 {fill:'pb-w',val:S.weeklyDrv,max:_dynWkMax},
 ];
 bars.forEach(b=>{
 const el=document.getElementById(b.fill);
 if(!el) return;
 const pct=Math.min(100,b.val/b.max*100);
 el.className='pfill'+(pct>=90?' p-danger':pct>=75?' p-warn':'');
 el.style.width=pct+'%';
 });
}

/* Mode başlangıç zamanı tut */
/* ══════════════════════════════════════════════════════════
 UX: ONBOARDİNG TURU — İlk kullanıcı için 5 adım
══════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════ */
const TOUR_STEPS = [
 {
 sel:'.device',
 title:'Cihaz',
 body:'Gercek takograf LCD ekrani. Hiz gostergesi, Counter sayaclari ve altta GNSS/OSNMA/Bluetooth LEDleri bulunur.',
 },
 {
 sel:'#active-mode-display',
 title:'Aktif Mod Göstergesi',
 body:'Mevcut aktiviteniz burada büyük gösterilir. Sürüş (yeşil), Dinlenme (mavi), İş (sarı). Modda geçen süre sağ tarafta.',
 },
 {
 sel:'.quick-bar',
 title:'Hızlı Erişim',
 body:'En sık kullanılan işlemler: 🚗 Sürüş, 💤 Dinlenme, +5/15/60dk zaman ilerlet. ⚙ ile tüm araçlar görünür.',
 },
 {
 sel:'.rpanel-tabs',
 title:'Sağ Panel Sekmeleri',
 body:'📋 Log · 📊 Durum · 📍 G2V2 Konum · 📈 Zaman · 🎬 Senaryo — sekmeye tıklayarak geçiş yapın.',
 },
 {
 sel:'#scen-filter',
 title:'Senaryo Filtresi',
 body:'32 senaryo kategoriye göre filtreleyin: Temel · G2V2 · Arıza · Araç · Eğitim. Bir senaryoya tıklayarak yükleyin.',
 },
];
let _tourIdx = 0;

function startTour(){
 _tourIdx = 0;
 _showTourStep();
}

function _showTourStep(){
 /* Önceki overlay temizle */
 document.getElementById('tour-overlay')?.remove();

 if(_tourIdx >= TOUR_STEPS.length){
 doLog('🎓 Tur tamamlandı! Klavye kısayolları: D=Sürüş R=Dinlenme Space=+5dk N=Yeni gün','ok');
 return;
 }

 const step = TOUR_STEPS[_tourIdx];
 const target = document.querySelector(step.sel);

 /* Overlay — position:fixed, scroll bağımsız */
 const ov = document.createElement('div');
 ov.id = 'tour-overlay';
 ov.style.cssText = [
 'position:fixed','inset:0','z-index:10000',
 'background:rgba(0,0,0,.65)',
 'pointer-events:all',
 ].join(';');

 /* Spotlight — hedef element varsa */
 if(target){
 const r = target.getBoundingClientRect(); /* viewport-relative, scrollY gerekmez */
 const pad = 5;
 const sp = document.createElement('div');
 sp.style.cssText = [
 'position:fixed',
 `left:${r.left - pad}px`,
 `top:${r.top - pad}px`,
 `width:${r.width + pad*2}px`,
 `height:${r.height + pad*2}px`,
 'border-radius:6px',
 'box-shadow:0 0 0 9999px rgba(0,0,0,.65)',
 'pointer-events:none',
 'transition:all .3s',
 'z-index:10001',
 ].join(';');
 ov.appendChild(sp);
 }

 /* Baloncuk — viewport clamp ile */
 const vw = window.innerWidth;
 const vh = window.innerHeight;
 const bw = Math.min(280, vw - 24); /* max 280px veya ekranın tamamı - 24 */
 const bub = document.createElement('div');

 /* Konum: hedef altında, sığmazsa üstünde, yoksa ortada */
 let bTop, bLeft;
 if(target){
 const r = target.getBoundingClientRect();
 bTop = r.bottom + 10;
 bLeft = Math.max(8, Math.min(r.left, vw - bw - 8));
 /* Ekranın altına taşıyorsa üste koy */
 if(bTop + 200 > vh) bTop = Math.max(8, r.top - 210);
 } else {
 bTop = vh/2 - 100;
 bLeft = vw/2 - bw/2;
 }

 bub.style.cssText = [
 'position:fixed',
 `top:${bTop}px`,
 `left:${bLeft}px`,
 `width:${bw}px`,
 'background:#0a0c14',
 'border:1px solid #3b82f6',
 'border-radius:8px',
 'padding:14px 16px',
 'z-index:10002',
 'box-shadow:0 8px 32px rgba(0,0,0,.8)',
 'font-family:var(--M)',
 ].join(';');

 bub.innerHTML = `
 <div style="color:var(--blue-light);font-size:.75rem;font-weight:700;margin-bottom:6px">
 ${escapeHTML(step.title)}
 </div>
 <div style="color:var(--slate-light);font-size:.625rem;line-height:1.6;margin-bottom:12px">
 ${escapeHTML(step.body)}
 </div>
 <div style="display:flex;justify-content:space-between;align-items:center">
 <span style="font-size:.625rem;color:var(--dim)">${_tourIdx+1} / ${TOUR_STEPS.length}</span>
 <div style="display:flex;gap:6px">
 ${_tourIdx > 0 ? `<button id="tour-prev-btn"
 style="padding:4px 10px;background:var(--bdr);border:1px solid #3b4a6a;color:var(--slate);border-radius:4px;cursor:pointer;font-size:.625rem;font-family:var(--M)">← Geri</button>` : ''}
 <button aria-label="Kapat" id="tour-skip-btn"
 style="padding:4px 10px;background:#0a0c14;border:1px solid #1e2232;color:var(--dim);border-radius:4px;cursor:pointer;font-size:.625rem;font-family:var(--M)">✕</button>
 <button id="tour-next-btn"
 style="padding:4px 12px;background:var(--blue-dark);border:none;border-radius:4px;color:#fff;cursor:pointer;font-size:.625rem;font-family:var(--M)">
 ${_tourIdx === TOUR_STEPS.length - 1 ? 'Tamamla ✓' : 'Sonraki →'}
 </button>
 </div>
 </div>`;

 ov.appendChild(bub);
 document.body.appendChild(ov);

 /* Event listener'ları innerHTML dışında ekle — güvenli */
 document.getElementById('tour-next-btn').addEventListener('click', e=>{
 e.stopPropagation(); _tourIdx++; _showTourStep();
 });
 const prevBtn = document.getElementById('tour-prev-btn');
 if(prevBtn) prevBtn.addEventListener('click', e=>{
 e.stopPropagation(); _tourIdx--; _showTourStep();
 });
 document.getElementById('tour-skip-btn').addEventListener('click', e=>{
 e.stopPropagation(); ov.remove();
 doLog('Tur iptal edildi. Tekrar başlatmak için "🎓 Tur Başlat" tuşuna tıklayın.');
 });
 /* Overlay tıklaması — baloncu değilse ilerle */
 ov.addEventListener('click', e=>{
 if(e.target === ov){ _tourIdx++; _showTourStep(); }
 });
}


/* ══ KLAVYE KISAYOL GRİDİ — sayfa altına render ══ */
function renderKbGrid(){
 const el = document.getElementById('kb-grid');
 if(!el) return;
 const keys = [
 {k:'D', lbl:'Sürüş', col:'#22c55e', grp:'Mod'},
 {k:'R', lbl:'Dinlenme', col:'#3b82f6', grp:'Mod'},
 {k:'W', lbl:'Diğer İş', col:'#f59e0b', grp:'Mod'},
 {k:'A', lbl:'Uygunluk', col:'#a855f7', grp:'Mod'},
 {k:'Space', lbl:'+5 dakika', col:'#60a5fa', grp:'Zaman'},
 {k:'1', lbl:'+15 dakika', col:'#60a5fa', grp:'Zaman'},
 {k:'2', lbl:'+30 dakika', col:'#60a5fa', grp:'Zaman'},
 {k:'3', lbl:'+1 saat', col:'#60a5fa', grp:'Zaman'},
 {k:'N', lbl:'Yeni Gün', col:'#94a3b8', grp:'Zaman'},
 {k:'K', lbl:'Uyarı Onayla', col:'#f97316', grp:'Sistem'},
 {k:'F', lbl:'Feribot/Tren', col:'#38bdf8', grp:'Sistem'},
 {k:'O', lbl:'OUT Modu', col:'#64748b', grp:'Sistem'},
 {k:'M', lbl:'Manuel Giriş', col:'#94a3b8', grp:'Sistem'},
 {k:'P', lbl:'Rapor Yazdır', col:'#94a3b8', grp:'Sistem'},
 {k:'C', lbl:'Ülke Seç', col:'#60a5fa', grp:'G2V2'},
 {k:'B', lbl:'Bluetooth', col:'#38bdf8', grp:'G2V2'},
 {k:'V', lbl:'Yük Tipi', col:'#f59e0b', grp:'G2V2'},
 {k:'G', lbl:'Kart Nesli', col:'#a78bfa', grp:'G2V2'},
 {k:'Q', lbl:'Quiz', col:'#22c55e', grp:'Eğitim'},
 {k:'L', lbl:'Planlama', col:'#a78bfa', grp:'Eğitim'},
 {k:'X', lbl:'Kalibrasyon', col:'#c084fc', grp:'Eğitim'},
 {k:'J', lbl:'Menü ', col:'#22c55e', grp:'Araçlar'},
 {k:'E', lbl:'Ekip Değişimi', col:'#f59e0b', grp:'Araçlar'},
 {k:'Z', lbl:'Filo Paneli', col:'#3b82f6', grp:'Araçlar'},
 {k:'ESC', lbl:'Kapat / İptal', col:'#ef4444', grp:'Sistem'},
 ];
 const grpOrder = ['Mod','Zaman','Sistem','G2V2','Eğitim','Araçlar'];
 const grpColor = {Mod:'#22c55e',Zaman:'#60a5fa',Sistem:'#64748b',
 'G2V2':'#a78bfa','Eğitim':'#22c55e',Araçlar:'#3b82f6'};
 let html = '';
 grpOrder.forEach(grp => {
 const grpKeys = keys.filter(k => k.grp === grp);
 if(!grpKeys.length) return;
 html += `<div style="background:var(--s2);border:1px solid var(--bdr);border-radius:5px;padding:8px 10px;border-top:2px solid ${grpColor[grp]};">
 <div style="font-family:var(--M);font-size:var(--fs-min);letter-spacing:1.5px;color:${grpColor[grp]};margin-bottom:7px;">${escapeHTML(grp.toUpperCase())}</div>
 <div style="display:flex;flex-direction:column;gap:4px;">
 ${grpKeys.map(k=>`
 <div style="display:flex;align-items:center;gap:8px;">
 <kbd style="background:var(--s1);border:1px solid ${k.col}40;color:${k.col};
 font-family:var(--M);font-size:.625rem;padding:2px 7px;border-radius:3px;
 min-width:38px;text-align:center;flex-shrink:0;">${escapeHTML(k.k)}</kbd>
 <span style="font-size:.625rem;color:var(--slate-light);">${escapeHTML(k.lbl)}</span>
 </div>`).join('')}
 </div>
 </div>`;
 });
 el.innerHTML = html;
}


/* ══════════════════════════════════════════════════════════ */

/* Uzatma gün geçmişini kaydet */
if(!window._extHistory) window._extHistory = [];

function _showExtensionOffer(){
 /* Zaten bir popup açıksa tekrar açma */
 if(document.getElementById('ext-offer-dlg')) return;
 const dlg = document.createElement('div');
 dlg.id = 'ext-offer-dlg';
 dlg.style.cssText = [
 'position:fixed','bottom:80px','right:16px',
 'background:#1a1200','border:1px solid #f59e0b',
 'border-radius:8px','padding:14px 16px',
 'z-index:9999','max-width:min(300px,calc(100vw - 32px))',
 'box-shadow:0 8px 32px rgba(245,158,11,.25)',
 'font-family:var(--M)',
 'animation:slideUp .3s ease',
 ].join(';');
 dlg.innerHTML = `
 <div style="color:var(--amber);font-size:.75rem;font-weight:700;margin-bottom:6px;">
 ⬆ 10sa Uzatma Hakkı Var
 </div>
 <div style="color:var(--slate-light);font-size:.625rem;line-height:1.6;margin-bottom:10px;">
 9sa limitine <b style="color:#f5c542;">30 dakika kaldı.</b><br>
 Uzatma hakkınız var: <b style="color:#f5c542;">${2-(S.extDayCount||0)}/2</b> bu hafta.<br>
 <span style="color:var(--slate);font-size:.625rem;">Uzatırsanız toplam 10sa sürebilirsiniz. </span>
 </div>
 <div style="display:flex;gap:6px;">
 <button id="ext-yes-btn"
 style="flex:1;padding:6px;background:#2a1a00;border:1px solid #f59e0b;
 color:var(--amber);border-radius:4px;cursor:pointer;
 font-family:var(--M);font-size:.625rem;">
 ⬆ Uzat (10sa)
 </button>
 <button id="ext-no-btn"
 style="padding:6px 10px;background:var(--s2);border:1px solid var(--bdr);
 color:var(--dim);border-radius:4px;cursor:pointer;
 font-family:var(--M);font-size:.625rem;">
 Hayır
 </button>
 </div>`;
 document.body.appendChild(dlg);

 document.getElementById('ext-yes-btn').addEventListener('click', ()=>{
 extendDay();
 dlg.remove();
 });
 document.getElementById('ext-no-btn').addEventListener('click', ()=>{
 doLog('ℹ 10sa uzatma kullanılmadı. İstediğinizde "10sa Uzat" butonuna basabilirsiniz.');
 dlg.remove();
 });
 /* 30sn sonra otomatik kapat */
 setTimeout(()=>dlg?.remove(), 30000);
}

/* CSS animasyonu */
if(!document.getElementById('ext-anim-style')){
 const st = document.createElement('style');
 st.id = 'ext-anim-style';
 st.textContent = '@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
 document.head.appendChild(st);
}


/* ══════════════════════════════════════════════════════════ */
function checkWeekRollover(prevSimMin, newSimMin) {
 /* SIM_START'ın haftanın kaçıncı günü olduğunu dinamik hesapla */
 /* JS getDay(): 0=Paz,1=Pzt,...,6=Cmt — Pazartesi=1 */
 /* 0-indexed Pazartesi bazlı: (getDay()+6)%7 → Pzt=0,...,Paz=6 */
 const simStartDayMon = (SIM_START.getDay() + 6) % 7; /* 0=Pzt, 6=Paz */
 const prevDayOfWeek = Math.floor((prevSimMin + simStartDayMon * 1440) / 1440) % 7;
 const newDayOfWeek  = Math.floor((newSimMin  + simStartDayMon * 1440) / 1440) % 7;
 /* Önceki gün Pazar (6) → yeni gün Pazartesi (0) ise hafta dönüştü */
 if(prevDayOfWeek === 6 && newDayOfWeek === 0) {
 const prevExt = S.extDayCount || 0;
 S.extDayCount = 0;
 if(window._extHistory) window._extHistory = [];
 if(prevExt > 0) {
 doLog(`📅 Yeni takvim haftası (Pazartesi) — 10sa uzatma hakkı sıfırlandı (2/2). `, 'ok');
 } else {
 doLog(`📅 Yeni takvim haftası başladı — 10sa uzatma: 2/2 hak.`);
 }
 updateLCD();
 }
}


/* ══════════════════════════════════════════════════════════════════ */

const PERSIST_KEY = 'tachotr_state_v2';
const SNAPSHOT_KEY = 'tachotr_snapshots_v1';
const PROFILES_KEY = 'tachotr_profiles_v1';
const ACTIVE_PROF_KEY = 'tachotr_active_profile';
const MAX_SNAPSHOTS = 5;
const MAX_PROFILES = 5;

/* ── Kaydetme/Yükleme yardımcıları ── */
function _lsSet(key, val){
 try { localStorage.setItem(key, JSON.stringify(val)); return true; }
 catch(e){ console.warn('localStorage yazma hatası:', e); return false; }
}
function _lsGet(key){
 try { const v=localStorage.getItem(key); return v ? JSON.parse(v) : null; }
 catch(e){ return null; }
}

/* ── S2-1: Otomatik kaydet ── */
let _autoSaveTimer = null;
function autoSave(){
 clearTimeout(_autoSaveTimer);
 _autoSaveTimer = setTimeout(_doAutoSave, 2000); /* 2sn debounce */
}

function _doAutoSave(){
 try {
 /* Hafızada tutulacak state — büyük log dizilerini kırp */
 const saveState = Object.assign({}, S, {
 logs: (S.logs||[]).slice(-200), /* son 200 log */
 activeWarnings: S.activeWarnings||[],
 faultHistory: (S.faultHistory||[]).slice(-50),
 positionLog: (S.positionLog||[]).slice(-100),
 borderLog: (S.borderLog||[]).slice(-50),
 allSegs: S.allSegs||[],
 segs: (S.segs||[]).slice(-500),
 _savedAt: new Date().toISOString(),
 _version: 2,
 _simStart: SIM_START.toISOString(),
 });
 const ok = _lsSet(PERSIST_KEY, saveState);
 const ind = document.getElementById('save-indicator');
 if(ind){
 ind.textContent = ok ? '● Kaydedildi' : '● Kayıt hatası';
 ind.style.color = ok ? 'var(--grn)' : 'var(--red)';
 ind.style.opacity = '1';
 setTimeout(()=>{ if(ind) ind.style.opacity='0'; }, 2000);
 }
 } catch(e) {
 console.error('[TachoTR] autoSave hatası:', e);
 const ind = document.getElementById('save-indicator');
 if(ind){ ind.textContent='● Kayıt hatası'; ind.style.color='var(--red)'; ind.style.opacity='1'; }
 }
}

/* ── S2-1: Yükleme — sayfa açılışında ── */
function loadPersistedState(){
 const saved = _lsGet(PERSIST_KEY);
 if(!saved || saved._version !== 2){
 _dbg('loadPersistedState: kayıt yok veya eski versiyon');
 return false;
 }
 _dbg('loadPersistedState: yükleniyor, savedAt:', saved._savedAt);
 /* State'i geri yükle */
 Object.assign(S, saved);
 /* SIM_START global değişkenini geri yükle */
 if(saved._simStart){ try{ SIM_START = new Date(saved._simStart); }catch(e){} }
 /* Kritik dizilerin varlığını garanti et */
 S.logs = S.logs || [];
 S.segs = S.segs || [];
 S.allSegs = S.allSegs || [];
 S.activeWarnings = S.activeWarnings || [];
 S.faultHistory = S.faultHistory || [];
 S.positionLog = S.positionLog || [];
 S.borderLog = S.borderLog || [];
 return true;
}

/* ── S2-3: Manuel snapshot ── */
function saveSnapshot(label){
 const snapshots = _lsGet(SNAPSHOT_KEY) || [];
 const snap = {
 id: Date.now(),
 label: label || `Snapshot ${new Date().toLocaleString('tr-TR')}`,
 simDay: S.simDay,
 simTime: simTime(),
 state: Object.assign({}, S, {
 logs: (S.logs||[]).slice(-100),
 allSegs: S.allSegs||[],
 segs: (S.segs||[]).slice(-200),
 positionLog: (S.positionLog||[]).slice(-50),
 borderLog: (S.borderLog||[]).slice(-30),
 }),
 };
 /* Sona ekle, limit aş ise eskiyi sil */
 snapshots.push(snap);
 if(snapshots.length > MAX_SNAPSHOTS) snapshots.shift();
 _lsSet(SNAPSHOT_KEY, snapshots);
 doLog(`💾 Snapshot kaydedildi: "${escapeHTML(snap.label)}" (Gün ${S.simDay}, ${simTime()})`, 'ok');
 renderSnapshotList();
}

function loadSnapshot(id){
 const snapshots = _lsGet(SNAPSHOT_KEY) || [];
 const snap = snapshots.find(s => s.id === id);
 if(!snap){ doLog('✗ Snapshot bulunamadı.', 'err'); return; }
 _confirm(`"${snap.label}" snapshot'ına dönülsün mü? Mevcut ilerleme kaybolacak.`, ()=>{
 Object.assign(S, snap.state);
 S.logs = S.logs || []; S.segs = S.segs || []; S.allSegs = S.allSegs || [];
 S.activeWarnings = S.activeWarnings || []; S.faultHistory = S.faultHistory || [];
 S.positionLog = S.positionLog || []; S.borderLog = S.borderLog || [];
 updateLCD(); renderTL(); buildAxis(); updateMpict(S.mode); renderLogPanel();
 doLog(`📂 Snapshot yüklendi: "${escapeHTML(snap.label)}"`, 'ok');
 renderSnapshotList();
 });
}

function deleteSnapshot(id){
 let snapshots = _lsGet(SNAPSHOT_KEY) || [];
 snapshots = snapshots.filter(s => s.id !== id);
 _lsSet(SNAPSHOT_KEY, snapshots);
 renderSnapshotList();
}

function renderSnapshotList(){
 const el = document.getElementById('snapshot-list');
 if(!el) return;
 const snapshots = _lsGet(SNAPSHOT_KEY) || [];
 if(snapshots.length === 0){
 el.innerHTML = '<div data-empty style="line-height:1.6">💾 Henüz snapshot yok.<br><span style="font-size:var(--fs-min);color:var(--dim)">Mevcut durumu kaydetmek için aşağıdaki <b>+ Kaydet</b> butonuna basın.</span></div>';
 return;
 }
 el.innerHTML = snapshots.slice().reverse().map(s => `
 <div style="display:flex;align-items:center;gap:6px;padding:5px 8px;
 background:var(--s3);border:1px solid var(--bdr);border-radius:4px;margin-bottom:4px;">
 <span style="font-size:.625rem;flex:1;color:var(--txt);">
 💾 ${escapeHTML(s.label)}
 <small style="display:block;color:var(--dim);font-family:var(--M);">
 Gün ${s.simDay} · ${escapeHTML(s.simTime||'')}
 </small>
 </span>
 <button onclick="loadSnapshot(${s.id})" aria-label="Snapshot yükle"
 style="padding:2px 8px;background:var(--s2);border:1px solid var(--bdr2);
 color:var(--blu);border-radius:3px;cursor:pointer;font-family:var(--M);font-size:var(--fs-min);">
 Yükle
 </button>
 <button onclick="deleteSnapshot(${s.id})" aria-label="Snapshot sil"
 style="padding:2px 8px;background:var(--s2);border:1px solid var(--bdr2);
 color:var(--red);border-radius:3px;cursor:pointer;font-family:var(--M);font-size:var(--fs-min);">
 ✕
 </button>
 </div>`).join('');
}


/* ── S2-4: Sürücü Profil Sistemi ── */
function getProfiles(){
 return _lsGet(PROFILES_KEY) || [];
}

function getActiveProfileId(){
 return _lsGet(ACTIVE_PROF_KEY) || null;
}

function createProfile(name, plateNo, vehicleType, cardGen){
 const profiles = getProfiles();
 if(profiles.length >= MAX_PROFILES){
 doLog(`✗ Maksimum ${MAX_PROFILES} profil oluşturulabilir.`, 'err');
 return null;
 }
 const prof = {
 id: Date.now(),
 name: name || 'Yeni Sürücü',
 plate: plateNo || '',
 vehicle: vehicleType || 'HGV', /* HGV|LGV|BUS */
 cardGen: cardGen || 'G2V2',
 createdAt: new Date().toISOString(),
 /* S2-5: Haftalık geçmiş */
 history: [], /* [{week, weeklyDrv, violations, uyumScore}] */
 };
 profiles.push(prof);
 _lsSet(PROFILES_KEY, profiles);
 doLog(`👤 Profil oluşturuldu: ${escapeHTML(prof.name)} (${escapeHTML(prof.plate)})`, 'ok');
 renderProfileList();
 return prof;
}

function selectProfile(id){
 const profiles = getProfiles();
 const prof = profiles.find(p => p.id === id);
 if(!prof) return;
 _lsSet(ACTIVE_PROF_KEY, id);
 /* Kart neslini profile göre ayarla */
 S.cardGen = prof.cardGen;
 /* Simülatörde sürücü adını güncelle */
 const nameEls = document.querySelectorAll('[id$="-sname"], #s1name, #s2name');
 nameEls.forEach(el => { if(el) el.textContent = prof.name; });
 doLog(`👤 Profil seçildi: ${escapeHTML(prof.name)} · ${escapeHTML(prof.plate)} · ${escapeHTML(prof.cardGen)}`, 'ok');
 renderProfileList();
}

function deleteProfile(id){
 let profiles = getProfiles();
 const prof = profiles.find(p=>p.id===id);
 if(!prof) return;
 _confirm(`"${prof.name}" profili silinsin mi?`, ()=>{
 profiles = getProfiles().filter(p=>p.id!==id);
 _lsSet(PROFILES_KEY, profiles);
 if(getActiveProfileId()===id) _lsSet(ACTIVE_PROF_KEY, null);
 renderProfileList();
 });
}

/* S2-5: Haftalık geçmişi profile kaydet */
function saveWeekToProfile(){
 const id = getActiveProfileId();
 if(!id) return;
 const profiles = getProfiles();
 const prof = profiles.find(p=>p.id===id);
 if(!prof) return;
 const uyumScore = calcUyumScore();
 prof.history = prof.history || [];
 prof.history.push({
 week: new Date().toLocaleDateString('tr-TR'),
 simDay: S.simDay,
 weeklyDrv: S.weeklyDrv,
 violations: S.warnCount||0,
 uyumScore,
 });
 /* Son 12 hafta tut */
 if(prof.history.length > 12) prof.history.shift();
 _lsSet(PROFILES_KEY, profiles);
}

function calcUyumScore(){
 /* 0-100 arası uyum puanı */
 let score = 100;
 score -= (S.warnCount||0) * 5; /* Her uyarı -5 */
 score -= (S.faultHistory||[]).filter(f=>f.type==='event').length * 10;
 score -= (S.speedViolations||0) * 3; /* Hız ihlali -3 */
 const _wkMax = getWeeklyMax();
 if((S.weeklyDrv||0) > _wkMax) score -= 15; /* Haftalık limit aşımı */
 return Math.max(0, Math.min(100, score));
}

function renderProfileList(){
 const el = document.getElementById('profile-list');
 if(!el) return;
 const profiles = getProfiles();
 const activeId = getActiveProfileId();
 if(profiles.length===0){
 el.innerHTML='<div data-empty>👤 Profil yok — yukarıdan ekleyin.</div>';
 return;
 }
 const scoreColor = s => s>=80?'var(--grn)':s>=60?'var(--amber)':'var(--red)';
 el.innerHTML = profiles.map(p => {
 const lastW = (p.history||[]).slice(-1)[0];
 const score = lastW ? lastW.uyumScore : null;
 const active = p.id===activeId;
 return `
 <div style="display:flex;align-items:center;gap:8px;padding:6px 10px;
 background:${active?'var(--s2)':'var(--s3)'};
 border:1px solid ${active?'var(--blu)':'var(--bdr)'};
 border-radius:5px;margin-bottom:5px;cursor:pointer;"
 onclick="selectProfile(${p.id})">
 <div style="width:8px;height:8px;border-radius:50%;
 background:${active?'var(--blu)':'var(--bdr2)'};flex-shrink:0;"></div>
 <div style="flex:1;min-width:0;">
 <div style="font-size:.625rem;font-weight:600;color:var(--txt);
 white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
 ${escapeHTML(p.name)}
 </div>
 <div style="font-size:var(--fs-min);color:var(--dim);font-family:var(--M);">
 ${escapeHTML(p.plate)} · ${escapeHTML(p.cardGen)} · ${escapeHTML(p.vehicle)}
 </div>
 </div>
 ${score!==null?`<div style="font-family:var(--M);font-size:.625rem;
 color:${scoreColor(score)};font-weight:700;">${score}</div>`:''}
 <button onclick="event.stopPropagation();deleteProfile(${p.id})"
 aria-label="Profili sil"
 style="padding:1px 6px;background:transparent;border:1px solid var(--bdr2);
 color:var(--dim);border-radius:3px;cursor:pointer;font-size:var(--fs-min);">✕</button>
 </div>`;
 }).join('');
}

function openProfileDlg(){
 if(document.getElementById('profile-dlg')) return;
 const dlg = document.createElement('div');
 dlg.id = 'profile-dlg';
 dlg.style.cssText = [
 'position:fixed','top:50%','left:50%',
 'transform:translate(-50%,-50%)',
 'background:var(--s1)','border:1px solid var(--bdr2)',
 'border-radius:8px','padding:20px 22px',
 'z-index:9999','width:min(420px,calc(100vw - 24px))',
 'max-height:90vh','overflow-y:auto',
 'box-shadow:var(--shadow-lg)','font-family:var(--M)',
 ].join(';');
 dlg.innerHTML = `
 <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
 <div style="font-size:.875rem;font-weight:600;color:var(--txt);">👤 Sürücü Profilleri</div>
 <button onclick="document.getElementById('profile-dlg').remove()"
 aria-label="Kapat"
 style="background:transparent;border:none;color:var(--dim);cursor:pointer;font-size:1rem;">✕</button>
 </div>
 <!-- Profil listesi -->
 <div id="profile-list" style="margin-bottom:14px;"></div>
 <!-- Yeni profil formu -->
 <div style="border-top:1px solid var(--bdr);padding-top:12px;">
 <div style="font-size:.625rem;color:var(--dim);letter-spacing:1px;margin-bottom:8px;">
 YENİ PROFİL
 </div>
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px;">
 <input id="pf-name" placeholder="Sürücü adı" aria-label="Sürücü adı"
 style="padding:5px 8px;background:var(--s3);border:1px solid var(--bdr);
 border-radius:4px;color:var(--txt);font-family:var(--M);font-size:.625rem;"/>
 <input id="pf-plate" placeholder="Plaka" aria-label="Plaka"
 style="padding:5px 8px;background:var(--s3);border:1px solid var(--bdr);
 border-radius:4px;color:var(--txt);font-family:var(--M);font-size:.625rem;"/>
 </div>
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px;">
 <select id="pf-vehicle" aria-label="Araç tipi"
 style="padding:5px 8px;background:var(--s3);border:1px solid var(--bdr);
 border-radius:4px;color:var(--txt);font-family:var(--M);font-size:.625rem;">
 <option value="HGV">3.5t+ Ağır Taşıt</option>
 <option value="LGV">2.5-3.5t Hafif</option>
 <option value="BUS">Otobüs/Minibüs</option>
 </select>
 <select id="pf-cardgen" aria-label="Kart nesli"
 style="padding:5px 8px;background:var(--s3);border:1px solid var(--bdr);
 border-radius:4px;color:var(--txt);font-family:var(--M);font-size:.625rem;">
 <option value="G2V2">G2V2 (2024+)</option>
 <option value="G2V1">G2V1</option>
 <option value="G1">G1 (Eski)</option>
 </select>
 </div>
 <button onclick="_createProfileFromDlg()" aria-label="Profil oluştur"
 style="width:100%;padding:7px;background:var(--blu-dim);border:1px solid var(--blu);
 color:var(--blu);border-radius:4px;cursor:pointer;font-family:var(--M);font-size:.625rem;">
 + Profil Oluştur
 </button>
 </div>`;
 document.body.appendChild(dlg);
 renderProfileList();
}

function _createProfileFromDlg(){
 const name = document.getElementById('pf-name')?.value?.trim();
 const plate = document.getElementById('pf-plate')?.value?.trim();
 const vehicle = document.getElementById('pf-vehicle')?.value;
 const cardGen = document.getElementById('pf-cardgen')?.value;
 if(!name){ _toast('Sürücü adı gerekli.','error'); return; return; }
 createProfile(name, plate, vehicle, cardGen);
}


/* ── S2-6: Profil Karşılaştırma ── */
function openProfileCompare(){
 const profiles = getProfiles();
 if(profiles.length < 2){
 doLog('ℹ Karşılaştırma için en az 2 profil gerekli.', 'warn');
 openProfileDlg();
 return;
 }
 if(document.getElementById('compare-dlg')) return;
 const dlg = document.createElement('div');
 dlg.id = 'compare-dlg';
 dlg.style.cssText = [
 'position:fixed','top:50%','left:50%',
 'transform:translate(-50%,-50%)',
 'background:var(--s1)','border:1px solid var(--bdr2)',
 'border-radius:8px','padding:20px',
 'z-index:9999','width:min(580px,calc(100vw - 24px))',
 'max-height:90vh','overflow-y:auto',
 'box-shadow:var(--shadow-lg)','font-family:var(--M)',
 ].join(';');

 const scoreBar = (s) => {
 const color = s>=80?'#22c55e':s>=60?'#f59e0b':'#ef4444';
 return `<div style="background:var(--s3);border-radius:3px;height:6px;overflow:hidden;margin-top:2px;">
 <div style="width:${s}%;height:100%;background:${color};border-radius:3px;"></div></div>`;
 };

 const profCols = profiles.map(p => {
 const lastW = (p.history||[]).slice(-1)[0];
 const score = lastW ? lastW.uyumScore : '—';
 const wDrv = lastW ? hm(lastW.weeklyDrv) : '—';
 const viols = lastW ? lastW.violations : '—';
 const scColor = typeof score==='number'
 ? (score>=80?'var(--grn)':score>=60?'var(--amber)':'var(--red)') : 'var(--dim)';
 return `
 <div style="background:var(--s2);border:1px solid var(--bdr);border-radius:6px;padding:12px;">
 <div style="font-size:.75rem;font-weight:600;color:var(--txt);margin-bottom:8px;">
 ${escapeHTML(p.name)}
 </div>
 <div style="font-size:var(--fs-min);color:var(--dim);margin-bottom:10px;">
 ${escapeHTML(p.plate)} · ${escapeHTML(p.cardGen)}
 </div>
 <div style="display:grid;gap:6px;">
 <div style="display:flex;justify-content:space-between;">
 <span style="font-size:var(--fs-min);color:var(--dim);">Uyum Skoru</span>
 <span style="font-size:.625rem;color:${scColor};font-weight:700;">${score}${typeof score==='number'?'/100':''}</span>
 </div>
 ${typeof score==='number' ? scoreBar(score) : ''}
 <div style="display:flex;justify-content:space-between;">
 <span style="font-size:var(--fs-min);color:var(--dim);">Haftalık Sürüş</span>
 <span style="font-size:.625rem;color:var(--txt);">${wDrv}</span>
 </div>
 <div style="display:flex;justify-content:space-between;">
 <span style="font-size:var(--fs-min);color:var(--dim);">İhlal Sayısı</span>
 <span style="font-size:.625rem;color:${typeof viols==='number'&&viols>0?'var(--red)':'var(--grn)'};">${viols}</span>
 </div>
 <div style="display:flex;justify-content:space-between;">
 <span style="font-size:var(--fs-min);color:var(--dim);">Geçmiş Hafta</span>
 <span style="font-size:.625rem;color:var(--dim);">${(p.history||[]).length} hafta</span>
 </div>
 </div>
 </div>`;
 }).join('');

 dlg.innerHTML = `
 <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
 <div style="font-size:.875rem;font-weight:600;color:var(--txt);">📊 Profil Karşılaştırma</div>
 <button onclick="document.getElementById('compare-dlg').remove()"
 aria-label="Kapat"
 style="background:transparent;border:none;color:var(--dim);cursor:pointer;font-size:1rem;">✕</button>
 </div>
 <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;">
 ${profCols}
 </div>`;
 document.body.appendChild(dlg);
}

/* ── S2-7: JSON Dışa/İçe Aktarma ── */
function exportJSON(){
 const data = {
 _format: 'tachotr_export_v2',
 _exported: new Date().toISOString(),
 state: Object.assign({}, S, {
 logs: (S.logs||[]).slice(-500),
 allSegs: S.allSegs||[],
 }),
 profiles: getProfiles(),
 snapshots: _lsGet(SNAPSHOT_KEY)||[],
 };
 const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
 const url = URL.createObjectURL(blob);
 const a = document.createElement('a');
 a.href = url;
 a.download = `tachotr_${new Date().toISOString().slice(0,10)}.json`;
 a.click();
 URL.revokeObjectURL(url);
 doLog('📤 JSON dışa aktarıldı.', 'ok');
}

function importJSON(){
 const input = document.createElement('input');
 input.type = 'file';
 input.accept = '.json,application/json';
 input.onchange = e => {
 const file = e.target.files[0];
 if(!file) return;
 const reader = new FileReader();
 reader.onload = ev => {
 try {
 const data = JSON.parse(ev.target.result);
 if(data._format !== 'tachotr_export_v2'){
 _toast('Uyumsuz format — simülatörden dışa aktarılmış dosya kullanın.','error');
 return;
 }
 _confirm('İçe aktarma mevcut verilerin üzerine yazacak. Devam edilsin mi?', ()=>{
 /* State yükle */
 Object.assign(S, data.state);
 S.logs=S.logs||[]; S.segs=S.segs||[]; S.allSegs=S.allSegs||[];
 S.activeWarnings=S.activeWarnings||[]; S.faultHistory=S.faultHistory||[];
 S.positionLog=S.positionLog||[]; S.borderLog=S.borderLog||[];
 /* Profil & snapshot yükle */
 if(data.profiles) _lsSet(PROFILES_KEY, data.profiles);
 if(data.snapshots) _lsSet(SNAPSHOT_KEY, data.snapshots);
 /* UI güncelle */
 updateLCD(); renderTL(); buildAxis(); updateMpict(S.mode); renderLogPanel();
 renderSnapshotList(); renderProfileList();
 doLog(`📥 İçe aktarıldı: ${file.name}`, 'ok');
 _toast(`İçe aktarıldı: ${file.name}`,'ok');
 }); /* /_confirm */
 } catch(err){
 _toast('Dosya okunamadı: ' + err.message,'error');
 }
 };
 reader.readAsText(file);
 };
 input.click();
}

/* ── S2-8: CSV Aktivite Raporu ── */
function exportCSV(){
 const segs = S.allSegs || S.segs || [];
 if(segs.length === 0){ doLog('ℹ Dışa aktarılacak aktivite verisi yok.', 'warn'); return; }

 /* SIM_START: global değişkenden al */
 const SIM_START_MS = SIM_START.getTime();
 const toTimestamp = (absMin) => {
 const d = new Date(SIM_START_MS + absMin*60000);
 return d.toISOString().slice(0,16).replace('T',' ');
 };

 const modeLabel = {driving:'Sürüş',rest:'Dinlenme',work:'Diğer İş',available:'Uygunluk'};

 const rows = [
 ['Başlangıç','Bitiş','Süre (dk)','Mod','Alt Mod','Gün'],
 ...segs.map(s => {
 const t = s.startMin !== undefined ? s.startMin : (s.abs || 0);
 return [
 toTimestamp(t),
 toTimestamp(t + s.dur),
 s.dur,
 modeLabel[s.mode] || s.mode,
 s.workSub || '',
 Math.floor(t / 1440) + 1,
 ];
 }),
 ];

 const CRLF = '\r\n';
 const csv = rows.map(r => r.map(c=>
 typeof c==='string'&&(c.includes(',')||c.includes('"'))
 ? '"'+c.replace(/"/g,'""')+'"' : c
 ).join(',')).join(CRLF);;

 /* UTF-8 BOM — Excel uyumluluğu */
 const blob = new Blob(['﻿'+csv], {type:'text/csv;charset=utf-8'});
 const url = URL.createObjectURL(blob);
 const a = document.createElement('a');
 a.href = url;
 a.download = `tachotr_aktivite_${new Date().toISOString().slice(0,10)}.csv`;
 a.click();
 URL.revokeObjectURL(url);
 doLog(`📊 CSV dışa aktarıldı: ${segs.length} segment.`, 'ok');
}

/* ── S2-9: @media print için log render ── */
function printReport(){
 /* Print öncesi rapor içeriğini güncelle */
 const el = document.getElementById('print-area');
 if(el){
 const segs = S.allSegs||[];
 const activeProf = getProfiles().find(p=>p.id===getActiveProfileId());
 el.innerHTML = `
 <div style="font-family:sans-serif;font-size:11pt;color:#000;">
 <h2 style="margin:0 0 4px;">Simülatör Raporu</h2>
 <p style="color:#555;margin:0 0 8px;">
 ${activeProf?activeProf.name+' · '+activeProf.plate+' · ':''} 
 ${new Date().toLocaleString('tr-TR')}
 </p>
 <table style="border-collapse:collapse;width:100%;font-size:9pt;">
 <thead>
 <tr style="background:#f0f0f0;">
 <th style="border:1px solid #ccc;padding:3px 6px;">Gün</th>
 <th style="border:1px solid #ccc;padding:3px 6px;">Mod</th>
 <th style="border:1px solid #ccc;padding:3px 6px;">Süre</th>
 </tr>
 </thead>
 <tbody>
 ${segs.slice(-100).map(s=>`
 <tr>
 <td style="border:1px solid #ccc;padding:2px 6px;">${Math.floor((s.startMin !== undefined ? s.startMin : (s.abs||0)) / 1440) + 1}</td>
 <td style="border:1px solid #ccc;padding:2px 6px;">${{driving:'Sürüş',rest:'Dinlenme',work:'İş',available:'Uygunluk'}[s.mode]||s.mode}</td>
 <td style="border:1px solid #ccc;padding:2px 6px;">${hm(s.dur)}</td>
 </tr>`).join('')}
 </tbody>
 </table>
 <p style="margin-top:8px;font-size:8pt;color:#888;">
 Simülasyon Gün ${S.simDay} · Haftalık Sürüş: ${hm(S.weeklyDrv)} · 
 Uyum Skoru: ${calcUyumScore()}/100
 </p>
 </div>`;
 }
 window.print();
}


function renderLogPanel(){
 /* JSON import sonrası log panelini yenile */
 const lb = document.getElementById('logbody');
 if(!lb) return;
 const logs = S.logs||[];
 if(logs.length===0) return;
 lb.innerHTML = logs.map(l=>`
 <div class="logline ${l.cls||''}" style="border-bottom:1px solid var(--s3);padding:3px 6px;">
 <span style="color:var(--dim);font-family:var(--M);font-size:var(--fs-min);">[${escapeHTML(l.t||'')}]</span>
 <span style="font-family:var(--M);font-size:var(--fs-min);color:${
 l.cls==='err'?'var(--red)':l.cls==='ok'?'var(--grn)':l.cls==='warn'?'var(--amber)':'var(--txt)'
 };"> ${escapeHTML(l.msg||'')}</span>
 </div>`).join('');
 lb.scrollTop = lb.scrollHeight;
}


/* ══════════════════════════════════════════════════════════════════ */

/* ── S3-3: Mod toggle ── */
let _guidedMode = false; /* Kılavuzlu mod aktif mi? */
let _guidedStepIdx = 0; /* Mevcut rehberli adım */
let _guidedScenario = null; /* Hangi senaryo rehberleniyor */

function toggleGuidedMode(){
 _guidedMode = !_guidedMode;
 const btn = document.getElementById('guided-mode-btn');
 if(btn){
 btn.textContent = _guidedMode ? '🎓 Kılavuzlu: AÇIK' : '🎓 Kılavuzlu: KAPALI';
 btn.style.borderColor = _guidedMode ? 'var(--amber)' : 'var(--bdr)';
 btn.style.color = _guidedMode ? 'var(--amber)' : 'var(--dim)';
 }
 if(_guidedMode){
 doLog('🎓 KILAVUZLu MOD AKTİF — Senaryo yükleyince rehberli çalışma başlar.', 'ok');
 } else {
 doLog('🎓 Kılavuzlu mod kapatıldı — serbest çalışma.');
 _hideTeacherHint();
 }
}

/* ── S3-1: Rehberli senaryo başlat ── */
function startGuidedScenario(scIdx){
 const sc = SCENS[scIdx];
 if(!sc || !sc.steps || sc.steps.length === 0) return;
 _guidedScenario = scIdx;
 _guidedStepIdx = 0;
 _guidedMode = true;
 resetSim();
 /* Senaryo kartını göster */
 const card = document.getElementById('scencard');
 if(card) card.classList.add('vis');
 document.getElementById('scicon').textContent = sc.icon || '📋';
 document.getElementById('sctitle').textContent = sc.title.toUpperCase();
 document.getElementById('scdesc').textContent = sc.desc || '';
 doLog(`🎓 REHBERLİ SENARYO: "${sc.title}"`, 'ok');
 _showTeacherStep();
}

function _showTeacherStep(){
 if(_guidedScenario === null) return;
 const sc = SCENS[_guidedScenario];
 const step = sc.steps[_guidedStepIdx];
 if(!step){ _teacherComplete(); return; }

 const modeLabel = {driving:'SÜRÜŞ',rest:'DİNLENME',work:'DİĞER İŞ',available:'UYGUNLUK'};
 const modeColor = {driving:'var(--CD)',rest:'var(--CR)',work:'var(--CW)',available:'var(--CA)'};

 /* Hint göster */
 _showTeacherHint({
 step: _guidedStepIdx + 1,
 total: sc.steps.filter(s=>s.min>0).length,
 title: `Adım ${_guidedStepIdx+1}: ${modeLabel[step.mode]||step.mode}`,
 body: step.hint || step.note || `${hm(step.min)} süre — ${modeLabel[step.mode]||step.mode} modunu başlatın.`,
 color: modeColor[step.mode]||'var(--blu)',
 mode: step.mode,
 min: step.min,
 onNext: ()=>_executeGuidedStep(step),
 });
}

function _executeGuidedStep(step){
 /* Adımı çalıştır */
 if(step.workSub) S.workSub = step.workSub;
 if(step.mode !== S.mode) setMode(step.mode, null);
 if(step.min > 0) advance(step.min);
 _guidedStepIdx++;
 /* S3-2: Beklenen durumu kontrol et */
 _checkExpected(step);
 /* Sonraki adım */
 if(_guidedStepIdx < SCENS[_guidedScenario].steps.length){
 setTimeout(_showTeacherStep, 300);
 } else {
 _teacherComplete();
 }
}

/* ── S3-2: Beklenen durum kontrolü ── */
function _checkExpected(step){
 const checks = step.expect || [];
 checks.forEach(chk => {
 let ok = false, actual = '';
 switch(chk.type){
 case 'dailyDrv_max':
 ok = S.dailyDrv <= (chk.val || S.dailyMax);
 actual = hm(S.dailyDrv);
 break;
 case 'contDrv_max':
 ok = S.contDrv <= (chk.val || 270);
 actual = hm(S.contDrv);
 break;
 case 'mode':
 ok = S.mode === chk.val;
 actual = S.mode;
 break;
 case 'no_warning':
 ok = (S.activeWarnings||[]).length === 0;
 actual = (S.activeWarnings||[]).length + ' uyarı';
 break;
 }
 if(!ok){
 _showTeacherError({
 expected: chk.label || chk.type,
 actual,
 explain: chk.explain || 'Kuralı kontrol edin.',
 });
 }
 });
}

/* ── Hint / Hata paneli UI ── */
function _showTeacherHint(opts){
 _hideTeacherHint();
 const panel = document.createElement('div');
 panel.id = 'teacher-hint';
 panel.style.cssText = [
 'position:fixed','bottom:80px','right:16px',
 `border:2px solid ${opts.color||'var(--blu)'}`,
 'background:var(--s1)','border-radius:8px',
 'padding:14px 16px','z-index:9500',
 'width:min(320px,calc(100vw - 32px))',
 `box-shadow:0 0 24px ${opts.color||'var(--blu)'}22`,
 'font-family:var(--M)',
 'animation:slideUp .3s ease',
 ].join(';');

 const progress = opts.total
 ? `<div style="background:var(--s3);border-radius:2px;height:3px;margin:8px 0;">
 <div style="width:${Math.round(opts.step/opts.total*100)}%;height:100%;
 background:${opts.color};border-radius:2px;transition:.3s;"></div></div>
 <div style="font-size:var(--fs-min);color:var(--dim);">${opts.step} / ${opts.total}</div>`
 : '';

 panel.innerHTML = `
 <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
 <span style="color:${opts.color};font-size:.75rem;font-weight:700;">🎓 ${escapeHTML(opts.title||'')}</span>
 <button onclick="_hideTeacherHint()" aria-label="İpucu kapat"
 style="background:transparent;border:none;color:var(--dim);cursor:pointer;font-size:.875rem;">✕</button>
 </div>
 ${progress}
 <div style="color:var(--txt);font-size:.625rem;line-height:1.6;margin:8px 0;">
 ${escapeHTML(opts.body||'')}
 </div>
 <div style="display:flex;gap:6px;margin-top:10px;">
 <button onclick="_executeGuidedStep(${JSON.stringify(opts).replace(/</g,'&lt;').replace(/>/g,'&gt;')})" 
 aria-label="Adımı uygula"
 style="flex:1;padding:6px;background:${opts.color}22;border:1px solid ${opts.color};
 color:${opts.color};border-radius:4px;cursor:pointer;font-size:.625rem;">
 ▶ Uygula (${hm(opts.min||0)})
 </button>
 <button onclick="toggleGuidedMode();_hideTeacherHint()"
 aria-label="Serbest moda geç"
 style="padding:6px 10px;background:var(--s2);border:1px solid var(--bdr);
 color:var(--dim);border-radius:4px;cursor:pointer;font-size:.625rem;">
 Serbest
 </button>
 </div>`;
 document.body.appendChild(panel);
}

function _showTeacherError(opts){
 const err = document.createElement('div');
 err.style.cssText = [
 'position:fixed','bottom:80px','left:16px',
 'border:2px solid var(--red)',
 'background:var(--s1)','border-radius:8px',
 'padding:12px 14px','z-index:9501',
 'width:min(300px,calc(100vw - 32px))',
 'box-shadow:0 0 20px rgba(239,68,68,.3)',
 'font-family:var(--M)',
 'animation:slideUp .2s ease',
 ].join(';');
 err.innerHTML = `
 <div style="color:var(--red);font-size:.75rem;font-weight:700;margin-bottom:6px;">
 ✗ Kural Uyumsuzluğu
 </div>
 <div style="font-size:.625rem;color:var(--txt);margin-bottom:4px;">
 <b>Beklenen:</b> ${escapeHTML(opts.expected||'')}
 </div>
 <div style="font-size:.625rem;color:var(--txt);margin-bottom:8px;">
 <b>Gerçekleşen:</b> ${escapeHTML(opts.actual||'')}
 </div>
 <div style="font-size:var(--fs-min);color:var(--dim);line-height:1.6;">
 ${escapeHTML(opts.explain||'')}
 </div>
 <button onclick="this.parentElement.remove()" aria-label="Hata mesajını kapat"
 style="margin-top:8px;width:100%;padding:4px;background:transparent;
 border:1px solid var(--red);color:var(--red);border-radius:4px;
 cursor:pointer;font-size:var(--fs-min);">Anladım</button>`;
 document.body.appendChild(err);
 setTimeout(()=>err.remove(), 8000);
}

function _hideTeacherHint(){
 document.getElementById('teacher-hint')?.remove();
}

function _teacherComplete(){
 _hideTeacherHint();
 const sc = _guidedScenario !== null ? SCENS[_guidedScenario] : null;
 const score = calcUyumScore();
 const color = score>=80?'var(--grn)':score>=60?'var(--amber)':'var(--red)';
 doLog(`🎓 SENARYO TAMAMLANDI: "${sc?sc.title:''}" — Uyum: ${score}/100`, score>=80?'ok':'warn');

 /* Tamamlanma popup */
 const pop = document.createElement('div');
 pop.style.cssText = [
 'position:fixed','top:50%','left:50%',
 'transform:translate(-50%,-50%)',
 'background:var(--s1)',`border:2px solid ${color}`,
 'border-radius:10px','padding:24px 28px',
 'z-index:9999','text-align:center',
 'width:min(360px,calc(100vw - 24px))',
 'box-shadow:var(--shadow-lg)','font-family:var(--M)',
 ].join(';');
 pop.innerHTML = `
 <div style="font-size:2rem;margin-bottom:8px;">
 ${score>=80?'🏆':score>=60?'👍':'📚'}
 </div>
 <div style="font-size:.875rem;font-weight:700;color:var(--txt);margin-bottom:4px;">
 Senaryo Tamamlandı
 </div>
 <div style="font-size:2rem;font-weight:700;color:${color};margin:12px 0;">
 ${score}<span style="font-size:.875rem;">/100</span>
 </div>
 <div style="font-size:.625rem;color:var(--dim);margin-bottom:16px;">
 ${score>=80?'Mükemmel! Tüm kurallar doğru uygulandı.':
 score>=60?'İyi iş! Birkaç küçük hata var.':
 'Daha fazla pratik gerekiyor. Tekrar deneyin.'}
 </div>
 <div style="display:flex;gap:8px;">
 <button onclick="this.closest('div[style]').remove();startGuidedScenario(${_guidedScenario})"
 aria-label="Tekrar dene"
 style="flex:1;padding:8px;background:var(--s3);border:1px solid var(--bdr);
 color:var(--txt);border-radius:5px;cursor:pointer;font-size:.625rem;">
 ↩ Tekrar
 </button>
 <button onclick="this.closest('div[style]').remove()"
 aria-label="Kapat"
 style="flex:1;padding:8px;background:${color}22;border:1px solid ${color};
 color:${color};border-radius:5px;cursor:pointer;font-size:.625rem;">
 ✓ Kapat
 </button>
 </div>`;
 document.body.appendChild(pop);
 _guidedScenario = null;
 _guidedStepIdx = 0;
}


/* ── S3-4: Günlük Uyum Puanı Güncelleme ── */
function updateDailyScore(){
 /* Gün bazlı puan hesapla ve LCD durum çubuğuna yansıt */
 const score = calcUyumScore();
 const el = document.getElementById('daily-score-display');
 if(el){
 const color = score>=80?'var(--grn)':score>=60?'var(--amber)':'var(--red)';
 el.textContent = score;
 el.style.color = color;
 }
 /* NOT: warnCount yalnızca triggerWarning() içinde artırılır — buradan artırma */
 return score;
}

/* ── S3-5: Haftalık uyum trendi ── */
function renderUyumTrend(){
 const el = document.getElementById('uyum-trend-chart');
 if(!el) return;
 const prof = (window.getProfiles ? getProfiles() : []).find(p=>p.id===
 (window.getActiveProfileId ? getActiveProfileId() : null));
 const history = prof ? (prof.history||[]) : [];

 if(history.length === 0){
 el.innerHTML = '<div data-empty>📋 Henüz veri yok — haftalık dinlenme sonrası kaydedilir.</div>';
 return;
 }

 const maxScore = 100;
 const barW = Math.min(32, Math.floor((el.offsetWidth||240) / history.length) - 4);

 el.innerHTML = `
 <div style="font-family:var(--M);font-size:var(--fs-min);color:var(--dim);margin-bottom:6px;letter-spacing:1px;">
 HAFTALIK UYUM TRENDİ (son ${history.length} hafta)
 </div>
 <div style="display:flex;align-items:flex-end;gap:3px;height:80px;padding:0 4px;">
 ${history.map((h,i) => {
 const s = h.uyumScore||0;
 const hPx = Math.max(4, Math.round(s/maxScore*72));
 const color = s>=80?'#22c55e':s>=60?'#f59e0b':'#ef4444';
 return `
 <div style="display:flex;flex-direction:column;align-items:center;gap:2px;flex:1;">
 <div style="font-size:var(--fs-min);color:${color};">${s}</div>
 <div style="width:100%;max-width:${barW}px;height:${hPx}px;background:${color};
 border-radius:2px 2px 0 0;opacity:.85;transition:.3s;min-height:4px;"
 title="Hafta ${i+1}: ${s}/100"></div>
 <div style="font-size:var(--fs-min);color:var(--dim);white-space:nowrap;
 overflow:hidden;max-width:${barW+4}px;">H${i+1}</div>
 </div>`;
 }).join('')}
 </div>`;
}

/* ── S3-6: Risk Tahmin Göstergesi ── */
function calcRiskLevel(){
 /*
 * Risk faktörleri:
 * - Günlük sürüşe kalan süre < 60dk → Yüksek risk
 * - Kesintisiz sürüş > 240dk → Orta risk
 * - Aktif uyarı sayısı > 0 → risk +1
 * - Haftalık sürüş > 3000dk → Orta risk
 * Çıktı: {level:'low'|'mid'|'high', message, minutesLeft}
 */
 const dayLeft = S.dailyMax - S.dailyDrv;
 const contLeft = CONT_DRIVE_LIMIT - S.contDrv;
 const weekLeft = getWeeklyMax() - S.weeklyDrv;
 const warns = (S.activeWarnings||[]).length;

 let level = 'low';
 let messages = [];

 if(dayLeft <= 0){
 level = 'high';
 messages.push('Günlük limit doldu — dinlenme zorunlu');
 } else if(dayLeft <= 30){
 level = 'high';
 messages.push(`Günlük limite ${dayLeft}dk kaldı`);
 } else if(dayLeft <= 90){
 level = level==='high'?'high':'mid';
 messages.push(`Günlük limite ${dayLeft}dk kaldı`);
 }

 if(contLeft <= 0){
 level = 'high';
 messages.push('Kesintisiz limit doldu — mola zorunlu');
 } else if(contLeft <= 30){
 level = 'high';
 messages.push(`Molaya ${contLeft}dk kaldı`);
 } else if(contLeft <= 60){
 level = level==='high'?'high':'mid';
 messages.push(`Molaya ${contLeft}dk kaldı`);
 }

 if(weekLeft <= 120) messages.push(`Haftalık limite ${hm(weekLeft)} kaldı`);
 if(warns > 0){
 level = level==='low'?'mid':level;
 messages.push(`${warns} aktif uyarı`);
 }

 return { level, messages, dayLeft, contLeft, weekLeft };
}

function updateRiskDisplay(){
 const el = document.getElementById('risk-display');
 if(!el) return;
 const risk = calcRiskLevel();
 const colors = {low:'var(--grn)', mid:'var(--amber)', high:'var(--red)'};
 const icons = {low:'🟢', mid:'🟡', high:'🔴'};
 const labels = {low:_tr('DÜŞÜK'), mid:'ORTA', high:_tr('YÜKSEK')};
 const color = colors[risk.level];

 el.innerHTML = `
 <div style="display:flex;align-items:center;gap:8px;">
 <span style="font-size:.875rem;">${icons[risk.level]}</span>
 <div style="flex:1;">
 <div style="font-family:var(--M);font-size:var(--fs-min);letter-spacing:1px;color:var(--dim);">
 İHLAL RİSKİ
 </div>
 <div style="font-size:.75rem;font-weight:700;color:${color};">
 ${labels[risk.level]}
 </div>
 </div>
 ${risk.messages.length?`
 <div style="font-size:var(--fs-min);color:var(--dim);text-align:right;max-width:120px;line-height:1.4;">
 ${escapeHTML(risk.messages[0])}
 </div>`:''}
 </div>
 ${risk.messages.length>1?`
 <div style="margin-top:4px;padding:4px 6px;background:${color}11;border-radius:3px;
 font-size:var(--fs-min);color:var(--dim);line-height:1.5;">
 ${risk.messages.slice(1).map(m=>'• '+escapeHTML(m)).join('<br>')}
 </div>`:''}`;
}


/* ══════════════════════════════════════════════════════════════════ */

/* ── S4-1: Haftalık Planlama Wizard v2 ── */
function openPlanWizard(){
 if(document.getElementById('plan-wizard-dlg')) return;

 const dlg = document.createElement('div');
 dlg.id = 'plan-wizard-dlg';
 dlg.style.cssText = [
 'position:fixed','top:50%','left:50%',
 'transform:translate(-50%,-50%)',
 'background:var(--s1)','border:1px solid var(--bdr2)',
 'border-radius:10px','padding:20px 22px',
 'z-index:9999','width:min(560px,calc(100vw - 24px))',
 'max-height:90vh','overflow-y:auto',
 'box-shadow:var(--shadow-lg)','font-family:var(--M)',
 ].join(';');

 const DAYS = ['Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi','Pazar'];
 const dayRows = DAYS.map((d,i) => `
 <tr style="border-bottom:1px solid var(--bdr);">
 <td style="padding:5px 8px;font-size:.625rem;color:var(--dim);white-space:nowrap;">${d}</td>
 <td style="padding:3px 4px;">
 <input type="number" id="pw-start-${i}" placeholder="08:00" min="0" max="23"
 aria-label="${d} başlangıç saati"
 style="width:48px;padding:3px 5px;background:var(--s3);border:1px solid var(--bdr);
 border-radius:3px;color:var(--txt);font-family:var(--M);font-size:var(--fs-min);text-align:center;">
 </td>
 <td style="padding:3px 4px;">
 <input type="number" id="pw-dist-${i}" placeholder="km" min="0" max="2000"
 aria-label="${d} mesafe"
 style="width:56px;padding:3px 5px;background:var(--s3);border:1px solid var(--bdr);
 border-radius:3px;color:var(--txt);font-family:var(--M);font-size:var(--fs-min);text-align:center;">
 </td>
 <td style="padding:3px 4px;">
 <select id="pw-type-${i}" aria-label="${d} sefer tipi"
 style="padding:3px 5px;background:var(--s3);border:1px solid var(--bdr);
 border-radius:3px;color:var(--txt);font-family:var(--M);font-size:var(--fs-min);">
 <option value="local">Şehir içi (60km/sa)</option>
 <option value="highway" selected>Otoban (90km/sa)</option>
 <option value="mixed">Karma (75km/sa)</option>
 <option value="off">Çalışma yok</option>
 </select>
 </td>
 <td id="pw-result-${i}" style="padding:3px 8px;font-size:var(--fs-min);color:var(--dim);min-width:80px;"></td>
 </tr>`).join('');

 dlg.innerHTML = `
 <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
 <div>
 <div style="font-size:.875rem;font-weight:600;color:var(--txt);">🗓️ Haftalık Sefer Planı</div>
 <div style="font-size:var(--fs-min);color:var(--dim);margin-top:2px;">
 Mola noktaları otomatik hesaplanır · AB 561/2006
 </div>
 </div>
 <button onclick="document.getElementById('plan-wizard-dlg').remove()"
 aria-label="Kapat"
 style="background:transparent;border:none;color:var(--dim);cursor:pointer;font-size:1rem;">✕</button>
 </div>
 <table style="width:100%;border-collapse:collapse;margin-bottom:12px;">
 <thead>
 <tr style="border-bottom:2px solid var(--bdr2);">
 <th style="padding:4px 8px;font-size:var(--fs-min);color:var(--dim);text-align:left;">GÜN</th>
 <th style="padding:4px;font-size:var(--fs-min);color:var(--dim);">BAŞLANGIÇ</th>
 <th style="padding:4px;font-size:var(--fs-min);color:var(--dim);">MESAFE (km)</th>
 <th style="padding:4px;font-size:var(--fs-min);color:var(--dim);">SEFER TİPİ</th>
 <th style="padding:4px 8px;font-size:var(--fs-min);color:var(--dim);">SONUÇ</th>
 </tr>
 </thead>
 <tbody>${dayRows}</tbody>
 </table>

 <!-- Haftalık özet -->
 <div id="pw-weekly-summary" style="padding:10px;background:var(--s3);border-radius:5px;margin-bottom:10px;"></div>

 <!-- Limit çubuğu — S4-3 -->
 <div id="pw-limit-bars" style="margin-bottom:12px;"></div>

 <div style="display:flex;gap:6px;">
 <button onclick="_calcPlanWizard()" aria-label="Planı hesapla"
 style="flex:1;padding:7px;background:var(--blu-dim);border:1px solid var(--blu);
 color:var(--blu);border-radius:4px;cursor:pointer;font-size:.625rem;">
 🔢 Hesapla
 </button>
 <button onclick="_applyPlanWizard()" aria-label="Planı simülasyona uygula"
 style="flex:1;padding:7px;background:var(--grn-dim);border:1px solid var(--grn);
 color:var(--grn);border-radius:4px;cursor:pointer;font-size:.625rem;">
 ▶ Simülasyona Uygula
 </button>
 </div>`;

 document.body.appendChild(dlg);
}

/* ── S4-2: Otomatik mola planlaması hesabı ── */
function _calcPlanWizard(){
 const SPEEDS = {local:60, highway:90, mixed:75, off:0};
 const DAYS = ['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'];
 let weekTotal = 0;
 let results = [];

 for(let i=0; i<7; i++){
 const type = document.getElementById(`pw-type-${i}`)?.value;
 const dist = parseFloat(document.getElementById(`pw-dist-${i}`)?.value)||0;
 const start = parseInt(document.getElementById(`pw-start-${i}`)?.value)||8;
 const spd = SPEEDS[type] || 0;

 if(type==='off' || dist===0){
 document.getElementById(`pw-result-${i}`).innerHTML =
 '<span style="color:var(--dim);">—</span>';
 results.push(null);
 continue;
 }

 const driveMin = Math.round(dist/spd*60);
 const plan = _calcBreakSchedule(driveMin);
 weekTotal += driveMin;

 const color = plan.legal ? 'var(--grn)' : 'var(--red)';
 document.getElementById(`pw-result-${i}`).innerHTML = `
 <span style="color:${color};font-size:var(--fs-min);">
 ${hm(driveMin)} sürüş<br>
 ${plan.breaks.length} mola (${hm(plan.totalBreak)})<br>
 Bitiş ~${_addMinutes(start, driveMin+plan.totalBreak)}
 </span>`;
 results.push({day:i, driveMin, plan, start});
 }

 /* Haftalık özet */
 const weekColor = weekTotal<=getWeeklyMax()?'var(--grn)':weekTotal<=5040?'var(--amber)':'var(--red)';
 document.getElementById('pw-weekly-summary').innerHTML = `
 <div style="display:flex;justify-content:space-between;align-items:center;">
 <div>
 <div style="font-size:var(--fs-min);color:var(--dim);">HAFTALIK TOPLAM</div>
 <div style="font-size:.875rem;font-weight:700;color:${weekColor};">${hm(weekTotal)}</div>
 </div>
 <div>
 <div style="font-size:var(--fs-min);color:var(--dim);">LİMİT</div>
 <div style="font-size:.875rem;color:var(--dim);">56:00</div>
 </div>
 <div>
 <div style="font-size:var(--fs-min);color:var(--dim);">DURUM</div>
 <div style="font-size:.625rem;font-weight:600;color:${weekColor};">
 ${weekTotal<=getWeeklyMax()?'✓ UYUMLU':weekTotal<=5040?'⚠ SINIRDA':'✗ LIMIT AŞIYOR'}
 </div>
 </div>
 </div>`;

 /* S4-3: Limit görselleştirici */
 _renderLimitBars('pw-limit-bars', weekTotal);

 window._pwResults = results;
}

/* S4-3: Limit çubuğu görselleştirici */
function _renderLimitBars(containerId, weekDrv){
 const el = document.getElementById(containerId);
 if(!el) return;
 const bars = [
 {label:'Bu Hafta', val:weekDrv, max:getWeeklyMax(), unit:'sa'},
 {label:'Günlük', val:S.dailyDrv, max:S.dailyMax, unit:'sa'},
 {label:'Kesintisiz',val:S.contDrv, max:CONT_DRIVE_LIMIT, unit:'dk'},
 ];
 el.innerHTML = bars.map(b => {
 const pct = Math.min(100, b.val/b.max*100);
 const color = pct>=90?'var(--red)':pct>=75?'var(--amber)':'var(--grn)';
 return `
 <div style="margin-bottom:6px;">
 <div style="display:flex;justify-content:space-between;margin-bottom:2px;">
 <span style="font-size:var(--fs-min);color:var(--dim);">${b.label}</span>
 <span style="font-size:var(--fs-min);color:${color};font-family:var(--M);">
 ${hm(b.val)} / ${hm(b.max)}
 </span>
 </div>
 <div style="background:var(--s3);border-radius:3px;height:6px;overflow:hidden;">
 <div style="width:${pct}%;height:100%;background:${color};border-radius:3px;transition:.4s;"></div>
 </div>
 </div>`;
 }).join('');
}

/* Mola çizelgesi hesapla (AB 561/2006 Md.7) */
function _calcBreakSchedule(totalDriveMin){
 const MAX_CONT = 270; /* 4:30 */
 const BREAK = 45; /* zorunlu mola */
 let driven = 0, totalBreak = 0, breaks = [], legal = true;

 while(driven < totalDriveMin){
 const remaining = totalDriveMin - driven;
 const canDrive = Math.min(remaining, MAX_CONT);
 driven += canDrive;
 if(driven < totalDriveMin){
 breaks.push({after:driven, dur:BREAK});
 totalBreak += BREAK;
 }
 if(canDrive > MAX_CONT) legal = false;
 }
 return {breaks, totalBreak, legal};
}

function _addMinutes(startH, totalMin){
 const endMin = startH*60 + totalMin;
 const h = Math.floor(endMin/60)%24;
 const m = endMin%60;
 return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}

function _applyPlanWizard(){
 const results = window._pwResults;
 if(!results || results.every(r=>!r)){
 doLog('⚠ Önce "Hesapla" butonuna tıklayın.','warn');
 return;
 }
 document.getElementById('plan-wizard-dlg')?.remove();
 let applied = 0;
 results.forEach(r => {
 if(!r) return;
 advance(r.driveMin + r.plan.totalBreak);
 applied++;
 });
 doLog(`🗓️ Haftalık plan uygulandı: ${applied} gün, toplam ${hm(results.filter(r=>r).reduce((s,r)=>s+r.driveMin,0))} sürüş.`,'ok');
}


/* ══════════════════════════════════════════════════════════════════ */

let _tlZoom = 'week'; /* 'day'|'week'|'2week' */
let _tlPlayback = false;
let _tlPlayIdx = 0;
let _tlPlayTimer = null;

/* ── S4-5: Zoom kontrolü ── */
function setTLZoom(mode){
 _tlZoom = mode;
 ['day','week','2week'].forEach(m => {
 const btn = document.getElementById(`tl-zoom-${m}`);
 if(!btn) return;
 const active = m === mode;
 btn.style.background = active ? 'var(--blu-dim)' : 'var(--s3)';
 btn.style.borderColor = active ? 'var(--blu)' : 'var(--bdr)';
 btn.style.color = active ? 'var(--blu)' : 'var(--dim)';
 btn.style.fontWeight = active ? '700' : 'normal';
 });
 renderTL();
}

/* ── S4-4: Simülasyon oynatıcısı ── */
let _playSpeed = 15; /* Her adımda kaç dk ilerlesin */

function startTLPlayback(){
 if(_tlPlayback){ stopTLPlayback(); return; }
 if((S.allSegs||[]).length === 0 && S.simMin === 0){
 doLog('ℹ Önce mod seçip simülasyonu çalıştırın, sonra Oynat\'a basın.','warn');
 return;
 }
 _tlPlayback = true;
 _tlPlayIdx = 0;
 const btn = document.getElementById('tl-play-btn');
 if(btn){ btn.textContent = '⏹ Durdur'; btn.style.color = 'var(--red)'; btn.style.borderColor = 'var(--red)'; }
 doLog(`▶ Oynatılıyor — Her adım: ${_playSpeed}dk, toplam: ${hm(S.simMin)}`,'ok');
 _stepPlayback();
}

function _stepPlayback(){
 if(!_tlPlayback) return;
 /* Günlük sürüş bitiminde dur */
 if(S.dailyDrv >= S.dailyMax || S.simMin > 20160){
 stopTLPlayback();
 doLog('⏹ Oynatma bitti — günlük limit veya 14 gün sınırına ulaşıldı.','ok');
 return;
 }
 /* Mevcut moddaki segmenti ilerlet */
 const prevMode = S.mode;
 if(S.mode === 'driving'){
 const rem = Math.min(_playSpeed,
 S.dailyMax - S.dailyDrv,
 CONT_DRIVE_LIMIT - S.contDrv,
 S.breakLeft > 0 ? S.breakLeft : Infinity
 );
 if(rem <= 0){ stopTLPlayback(); return; }
 advance(Math.max(1, rem));
 } else {
 advance(_playSpeed);
 }
 /* Mevcut segmenti vurgula */
 const idx = (S.allSegs||[]).length - 1;
 if(idx >= 0) _highlightTLSegment(idx);
 /* LCD ve TL güncelle */
 updateLCD(); renderTL();
 _tlPlayTimer = setTimeout(_stepPlayback, 300);
}

function stopTLPlayback(){
 _tlPlayback = false;
 clearTimeout(_tlPlayTimer);
 document.querySelectorAll('.tl-seg-highlight').forEach(el=>el.classList.remove('tl-seg-highlight'));
 const btn = document.getElementById('tl-play-btn');
 if(btn){ btn.textContent = '▶ Oynat'; btn.style.color = 'var(--grn)'; btn.style.borderColor = 'var(--grn)'; btn.style.background = 'var(--grn-dim)'; }
}

function _highlightTLSegment(idx){
 document.querySelectorAll('.tl-seg-highlight').forEach(el=>el.classList.remove('tl-seg-highlight'));
 const seg = document.querySelector(`[data-seg-idx="${idx}"]`);
 if(seg){
 seg.classList.add('tl-seg-highlight');
 seg.scrollIntoView({behavior:'smooth', block:'nearest'});
 }
}

/* ── S4-6: İhlal işaretleri ── */
function _getViolationMarkers(){
 /* faultHistory'den zaman çizelgesi için ihlal marker'ları üret */
 const faults = S.faultHistory || [];
 return faults.map(f => ({
 simMin: f.simMin || 0,
 type: f.type || 'warn',
 code: f.code || '!',
 label: f.label || f.code || 'İhlal',
 }));
}

/* S4-6: renderTL sonrasında ihlal marker'ları ekle — override KALDIRILDI (sonsuz döngü) */
/* _addTLViolationMarkers() doğrudan renderTL'ye entegre edilecek */

function _addTLViolationMarkers(){
 const container = document.getElementById('tl-multiday');
 if(!container) return;
 const markers = _getViolationMarkers();
 if(!markers.length) return;

 /* SIM_START bazlı gün ve pozisyon hesabı */
 const simStartMidnight = new Date(SIM_START);
 simStartMidnight.setHours(0,0,0,0);

 markers.forEach(m => {
 /* Hangi takvim günü? simMin → gerçek tarih → midnight diff */
 const markerDt = new Date(SIM_START.getTime() + m.simMin * 60000);
 const markerMidnight = new Date(markerDt);
 markerMidnight.setHours(0,0,0,0);
 const dayIdx = Math.round((markerMidnight - simStartMidnight) / 86400000);

 const dayRow = container.querySelector(`[data-day-idx="${dayIdx}"]`);
 if(!dayRow) return;

 /* O günün dayStartMin (simMin cinsinden) */
 const dayStartMs = new Date(simStartMidnight.getTime() + dayIdx * 86400000);
 const dayStartMin = (dayStartMs - SIM_START) / 60000;

 /* Gün içindeki % pozisyon */
 const pct = ((m.simMin - dayStartMin) / 1440 * 100).toFixed(1);
 if(pct < 0 || pct > 100) return;

 const dot = document.createElement('div');
 dot.className = 'tl-violation-dot';
 dot.title = m.label;
 dot.setAttribute('data-viol-min', m.simMin);
 dot.style.cssText = [
 'position:absolute',
 `left:${pct}%`,
 'top:-4px',
 'width:8px','height:8px',
 'border-radius:50%',
 'background:var(--red)',
 'border:1px solid #fff',
 'z-index:10',
 'cursor:pointer',
 'transform:translateX(-50%)',
 ].join(';');
 dot.onclick = () => doLog(`⚠ İhlal: ${m.label} (${markerDt.toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'})}, Gün ${dayIdx+1})`,'err');
 const area = dayRow.querySelector('.tl-day-area');
 if(area) area.appendChild(dot);
 else{ dayRow.style.position='relative'; dayRow.appendChild(dot); }
 });
}


/* ══════════════════════════════════════════════════════════════════ */

/* ── S4-7: Müfettiş Modu ── */
function openInspectorMode(){
 if(document.getElementById('inspector-dlg')) return;

 const analysis = _analyzeCompliance();
 const dlg = document.createElement('div');
 dlg.id = 'inspector-dlg';
 dlg.style.cssText = [
 'position:fixed','top:50%','left:50%',
 'transform:translate(-50%,-50%)',
 'background:var(--s1)','border:2px solid var(--pur)',
 'border-radius:10px','padding:20px 22px',
 'z-index:9999','width:min(600px,calc(100vw - 24px))',
 'max-height:92vh','overflow-y:auto',
 'box-shadow:0 0 40px rgba(168,85,247,.2)',
 'font-family:var(--M)',
 ].join(';');

 const riskColor = analysis.riskLevel==='HIGH'?'var(--red)':
 analysis.riskLevel==='MID' ?'var(--amber)':'var(--grn)';

 dlg.innerHTML = `
 <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;">
 <div>
 <div style="font-size:.875rem;font-weight:700;color:var(--pur);">🔍 Müfettiş Analiz Raporu</div>
 <div style="font-size:var(--fs-min);color:var(--dim);margin-top:2px;">
 AB 561/2006 · Simülasyon Gün ${S.simDay} · ${new Date().toLocaleDateString('tr-TR')}
 </div>
 </div>
 <button onclick="document.getElementById('inspector-dlg').remove()"
 aria-label="Kapat"
 style="background:transparent;border:none;color:var(--dim);cursor:pointer;font-size:1rem;">✕</button>
 </div>

 <!-- Risk skoru -->
 <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px;">
 <div style="background:var(--s2);border:1px solid ${riskColor};border-radius:6px;padding:10px;text-align:center;">
 <div style="font-size:var(--fs-min);color:var(--dim);">RİSK SEVİYESİ</div>
 <div style="font-size:1.0rem;font-weight:700;color:${riskColor};margin-top:2px;">
 ${analysis.riskLevel==='HIGH'?'🔴 YÜKSEK':analysis.riskLevel==='MID'?'🟡 ORTA':'🟢 DÜŞÜK'}
 </div>
 </div>
 <div style="background:var(--s2);border:1px solid var(--bdr);border-radius:6px;padding:10px;text-align:center;">
 <div style="font-size:var(--fs-min);color:var(--dim);">İHLAL SAYISI</div>
 <div style="font-size:1.0rem;font-weight:700;color:${analysis.totalViolations>0?'var(--red)':'var(--grn)'};margin-top:2px;">
 ${analysis.totalViolations}
 </div>
 </div>
 <div style="background:var(--s2);border:1px solid var(--bdr);border-radius:6px;padding:10px;text-align:center;">
 <div style="font-size:var(--fs-min);color:var(--dim);">UYUM PUANI</div>
 <div style="font-size:1.0rem;font-weight:700;color:${analysis.score>=80?'var(--grn)':analysis.score>=60?'var(--amber)':'var(--red)'};margin-top:2px;">
 ${analysis.score}/100
 </div>
 </div>
 </div>

 <!-- İhlal detayları -->
 <div style="margin-bottom:14px;">
 <div style="font-size:var(--fs-min);color:var(--dim);letter-spacing:1.5px;margin-bottom:8px;">İHLAL DETAYLARI</div>
 ${analysis.violations.length===0
 ? '<div style="color:var(--grn);font-size:.625rem;padding:8px;">✓ Kayıtlı ihlal yok</div>'
 : analysis.violations.map(v => `
 <div style="display:flex;align-items:flex-start;gap:8px;padding:6px 8px;
 background:var(--s3);border-left:2px solid ${v.severity==='high'?'var(--red)':'var(--amber)'};
 border-radius:0 4px 4px 0;margin-bottom:4px;">
 <span style="font-size:.875rem;flex-shrink:0;">${v.severity==='high'?'🔴':'🟡'}</span>
 <div style="flex:1;min-width:0;">
 <div style="font-size:.625rem;color:var(--txt);font-weight:600;">${escapeHTML(v.label)}</div>
 <div style="font-size:var(--fs-min);color:var(--dim);">Gün ${v.day||'?'} · ${escapeHTML(v.code||'')} </div>
 </div>
 <div style="font-size:var(--fs-min);color:${v.severity==='high'?'var(--red)':'var(--amber)'};
 white-space:nowrap;flex-shrink:0;">
 ${v.fine ? '€'+v.fine : ''}
 </div>
 </div>`).join('')}
 </div>

 <!-- S4-8: Para cezası özeti -->
 ${analysis.totalFine>0 ? `
 <div style="padding:10px;background:rgba(239,68,68,.08);border:1px solid var(--red);
 border-radius:6px;margin-bottom:12px;">
 <div style="font-size:var(--fs-min);color:var(--red);letter-spacing:1px;margin-bottom:4px;">
 TAHMİNİ PARA CEZASI
 </div>
 <div style="font-size:1.25rem;font-weight:700;color:var(--red);">€${analysis.totalFine}</div>
 <div style="font-size:var(--fs-min);color:var(--dim);margin-top:4px;">
 Bu simülasyon senaryosundaki ihlallere göre tahmini — gerçek cezalar ülkeye ve denetçiye göre değişir.
 </div>
 </div>` : ''}

 <!-- Kontrol listesi -->
 <div style="margin-bottom:12px;">
 <div style="font-size:var(--fs-min);color:var(--dim);letter-spacing:1.5px;margin-bottom:8px;">KONTROL LİSTESİ GÜN</div>
 ${analysis.checklist.map(c => `
 <div style="display:flex;align-items:center;gap:8px;padding:4px 6px;
 border-bottom:1px solid var(--s3);">
 <span style="color:${c.ok?'var(--grn)':'var(--red)'};font-size:.875rem;">${c.ok?'✓':'✗'}</span>
 <div style="flex:1;">
 <div style="font-size:.625rem;color:var(--txt);">${escapeHTML(c.label)}</div>
 <div style="font-size:var(--fs-min);color:var(--dim);">${escapeHTML(c.detail||'')}</div>
 </div>
 
 </div>`).join('')}
 </div>

 <div style="display:flex;gap:6px;">
 <button onclick="exportInspectorReport()" aria-label="Raporu JSON olarak dışa aktar"
 style="flex:1;padding:6px;background:var(--s3);border:1px solid var(--bdr);
 color:var(--dim);border-radius:4px;cursor:pointer;font-size:var(--fs-min);">
 📤 Dışa Aktar
 </button>
 <button onclick="document.getElementById('inspector-dlg').remove()"
 aria-label="Kapat"
 style="flex:1;padding:6px;background:var(--pur-dim);border:1px solid var(--pur);
 color:var(--pur);border-radius:4px;cursor:pointer;font-size:var(--fs-min);">
 Kapat
 </button>
 </div>`;

 document.body.appendChild(dlg);
}

/* ── S4-8: Uyum analizi motoru ── */
function _analyzeCompliance(){
 const faults = S.faultHistory || [];
 const violations = faults.map(f => {
 /* Para cezası tahmini — AB ortalama */
 const fineMap = {
 event: 400, usage: 200, warn: 100,
 };
 return {
 label: f.label || f.code || 'Kural ihlali',
 code: f.code || '',
 day: f.day || S.simDay,
 severity: f.type==='event' ? 'high' : 'mid',
 ref: f.ref || 'Md.7-8',
 fine: fineMap[f.type] || 150,
 };
 });

 const totalFine = violations.reduce((s,v)=>s+v.fine, 0);
 const score = calcUyumScore();
 const riskLevel = violations.filter(v=>v.severity==='high').length>=2 ? 'HIGH'
 : violations.length>=1 ? 'MID' : 'LOW';

 /* Kontrol listesi */
 const checklist = [
 {
 label:'Günlük sürüş ≤ 9sa (veya 10sa uzatmalı)',
 ok: S.dailyDrv <= S.dailyMax,
 detail: `Bugün: ${hm(S.dailyDrv)} / ${hm(S.dailyMax)}`,
 ref: 'Md.6',
 },
 {
 label:'Kesintisiz sürüş ≤ 4:30',
 ok: S.contDrv <= 270,
 detail: `Kesintisiz: ${hm(S.contDrv)}`,
 ref: 'Md.7',
 },
 {
 label:'Haftalık sürüş ≤ 56sa',
 ok: S.weeklyDrv <= getWeeklyMax(),
 detail: `Bu hafta: ${hm(S.weeklyDrv)} / 56:00`,
 ref: 'Md.6',
 },
 {
 label:'Günlük dinlenme ≥ 11sa (veya 9sa kısaltılmış)',
 ok: (S.activeWarnings||[]).filter(w=>w.code?.includes('Din')).length===0,
 detail: 'Aktif dinlenme uyarısı yok',
 ref: 'Md.8',
 },
 {
 label:'Haftalık dinlenme ≥ 45sa alınıyor',
 ok: (S.weeklyDeficit||0) === 0,
 detail: `Telafi borcu: ${hm(S.weeklyDeficit||0)}`,
 ref: 'Md.8.6',
 },
 {
 label:'10sa uzatma hakkı aşılmadı (≤ 2/hafta)',
 ok: (S.extDayCount||0) <= 2,
 detail: `Bu hafta: ${S.extDayCount||0}/2`,
 ref: 'Md.6/2',
 },
 {
 label:'Sürücü kartı takılı',
 ok: !!S.card1Name,
 detail: S.card1Name || 'Kart yok',
 ref: 'Md.1',
 },
 ];

 return { violations, totalFine, score, riskLevel, checklist, totalViolations: violations.length };
}

function exportInspectorReport(){
 const analysis = _analyzeCompliance();
 const report = {
 _type: 'tachotr_inspector_report',
 generatedAt: new Date().toISOString(),
 simDay: S.simDay,
 score: analysis.score,
 riskLevel: analysis.riskLevel,
 violations: analysis.violations,
 totalFine: analysis.totalFine,
 checklist: analysis.checklist,
 };
 const blob = new Blob([JSON.stringify(report, null, 2)], {type:'application/json'});
 const url = URL.createObjectURL(blob);
 const a = document.createElement('a');
 a.href = url;
 a.download = `inspector_report_gun${S.simDay}_${new Date().toISOString().slice(0,10)}.json`;
 a.click();
 URL.revokeObjectURL(url);
 doLog('📤 Müfettiş raporu dışa aktarıldı.','ok');
}

/* ── S4-9: Türkiye KTY Denetim Protokolü ── */
function openKTYProtocol(){
 if(document.getElementById('kty-dlg')) return;

 const ktyChecks = [
 {label:'Taşıt Takograf Belgesi (TTB)', ok: true, ref:'KTY Md.57', detail:'aktif'},
 {label:'Sürücü Mesleki Yeterlilik Belgesi (SRC5)', ok: true, ref:'KTY Md.41', detail:'Profesyonel sürücü'},
 {label:'Psikoteknik Belgesi', ok: true, ref:'KTY Md.41', detail:'Geçerli'},
 {label:'Çalışma günlüğü tutulmuş (son 7 gün)', ok: (S.simDay||1)>=7, ref:'KTY Md.59', detail:`${S.simDay} gün simüle edildi`},
 {label:'Günlük İstirahat 11sa ≥ sağlandı', ok: S.dailyDrv<=S.dailyMax, ref:'AB 561/2006 Md.8 / KTY', detail:`Bugünkü: ${hm(S.dailyDrv)}`},
 {label:'Haftalık çalışma 56sa aşılmadı', ok: S.weeklyDrv<=getWeeklyMax(), ref:'AB 561/2006 Md.6 / AETR', detail:`Haftalık: ${hm(S.weeklyDrv)} / maks ${hm(getWeeklyMax())}`},
 {label:'Taşıt tescil belgesi ve muayene', ok: true, ref:'KTY Md.29', detail:'Geçerli (simülasyon)'},
 {label:'Tehlikeli madde belgesi (ADR)', ok: !S.adrMode||true, ref:'ADR 2023', detail: S.adrMode?'ADR modu aktif':'Gerekmiyor'},
 {label:'Karayolu ücreti belgesi (HGS/OGS)',ok: true, ref:'5539 Sayılı K.',detail:'Geçerli'},
 {label:'Çalışma günlüğü dijital — kart takılı',ok:!!S.card1Name,ref:'KTY Md.57',detail:S.card1Name||'Kart yok!'},
 ];

 const passCount = ktyChecks.filter(c=>c.ok).length;
 const dlg = document.createElement('div');
 dlg.id = 'kty-dlg';
 dlg.style.cssText = [
 'position:fixed','top:50%','left:50%',
 'transform:translate(-50%,-50%)',
 'background:var(--s1)','border:2px solid #e30a17',
 'border-radius:10px','padding:20px 22px',
 'z-index:9999','width:min(520px,calc(100vw - 24px))',
 'max-height:90vh','overflow-y:auto',
 'box-shadow:0 0 40px rgba(227,10,23,.2)',
 'font-family:var(--M)',
 ].join(';');

 dlg.innerHTML = `
 <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
 <span style="font-size:1.5rem;">🇹🇷</span>
 <div>
 <div style="font-size:.875rem;font-weight:700;color:#fff;">KTY Denetim Protokolü</div>
 <div style="font-size:var(--fs-min);color:var(--dim);">Karayolu Taşımacılığı Yönetmeliği · ${passCount}/${ktyChecks.length} geçti</div>
 </div>
 <button onclick="document.getElementById('kty-dlg').remove()"
 aria-label="Kapat"
 style="margin-left:auto;background:transparent;border:none;color:var(--dim);cursor:pointer;font-size:1rem;">✕</button>
 </div>

 <!-- Genel sonuç -->
 <div style="padding:8px 12px;border-radius:6px;margin-bottom:12px;
 background:${passCount===ktyChecks.length?'rgba(34,197,94,.08)':'rgba(239,68,68,.08)'};
 border:1px solid ${passCount===ktyChecks.length?'var(--grn)':'var(--red)'};">
 <span style="font-size:.75rem;font-weight:700;
 color:${passCount===ktyChecks.length?'var(--grn)':'var(--red)'};">
 ${passCount===ktyChecks.length
 ? '✓ TÜM KONTROLLER GEÇTİ — CEZA YOK'
 : `✗ ${ktyChecks.length-passCount} KONTROL BAŞARISIZ`}
 </span>
 </div>

 <!-- Kontrol listesi -->
 ${ktyChecks.map(c => `
 <div style="display:flex;align-items:flex-start;gap:8px;padding:5px 6px;
 border-bottom:1px solid var(--s3);">
 <span style="font-size:.875rem;color:${c.ok?'var(--grn)':'var(--red)'};">
 ${c.ok?'✓':'✗'}
 </span>
 <div style="flex:1;min-width:0;">
 <div style="font-size:.625rem;color:${c.ok?'var(--txt)':'var(--red)'};">
 ${escapeHTML(c.label)}
 </div>
 <div style="font-size:var(--fs-min);color:var(--dim);">${escapeHTML(c.detail||'')} · ${escapeHTML(c.ref)}</div>
 </div>
 </div>`).join('')}

 <div style="margin-top:10px;padding:8px;background:var(--s3);border-radius:4px;
 font-size:var(--fs-min);color:var(--dim);line-height:1.6;">
 ℹ KTY: Karayollarında Taşımacılık Hizmetlerini Düzenleyen Kanun (4925) · 
 SRC5 zorunlu · Günlük çalışma max 9sa (Türkiye iç hat) · 
 Haftalık max 45sa · Simülasyon verileri esas alınmıştır.
 </div>

 <button onclick="document.getElementById('kty-dlg').remove()"
 aria-label="Kapat"
 style="width:100%;margin-top:10px;padding:7px;background:rgba(227,10,23,.1);
 border:1px solid #e30a17;color:#e30a17;border-radius:4px;cursor:pointer;font-size:.625rem;">
 Kapat
 </button>`;

 document.body.appendChild(dlg);
}


/* ══════════════════════════════════════════════════════════════════ */

/* ── S5-2: State Context Builder ── */
function buildAIContext(){
 const modeLabels = {driving:'Sürüş',rest:'Dinlenme',work:'Diğer İş',available:'Uygunluk'};
 const risk = calcRiskLevel();
 const score = calcUyumScore();
 const faults = (S.faultHistory||[]).slice(-5);

 return `Sen bir AB 561/2006 uzmanı takograf danışmanısın.
Mevcut simülasyon durumu:
- Mod: ${modeLabels[S.mode]||S.mode}
- Simülasyon günü: ${S.simDay}
- Günlük sürüş: ${hm(S.dailyDrv)} / maks ${hm(S.dailyMax)}
- Kesintisiz sürüş: ${hm(S.contDrv)} / maks 4:30
- Haftalık sürüş: ${hm(S.weeklyDrv)} / maks 56:00
- Dinlenme oturumu: ${hm(S.restSes)}
- 10sa uzatma hakkı: ${2-(S.extDayCount||0)}/2 kaldı
- 9sa kısaltılmış din. hakkı: ${3-(S.splitRestCount||0)}/3 kaldı
- Haftalık telafi borcu: ${hm(S.weeklyDeficit||0)}
- Uyum puanı: ${score}/100
- Risk seviyesi: ${risk.level==='HIGH'?'YÜKSEK':risk.level==='MID'?'ORTA':'DÜŞÜK'}
- Son ihlaller: ${faults.length>0?faults.map(f=>f.label||f.code).join(', '):'Yok'}
- Aktif uyarı: ${(S.activeWarnings||[]).length} adet
- Kart: ${S.card1Name||'Yok'} (${S.cardGen||'?'})
- Hız: ${Math.round(S.speed||0)} km/sa
- Odometer: ${S.odo?.toLocaleString('tr-TR')||0} km
- 9sa kıs. mod aktif: ${S.useReducedRest?'Evet':'Hayır'}
- Uzatma kullanılan günler: ${(S.extDayUsedDays||[]).map(d=>'G'+(d+1)).join(', ')||'Yok'}
- Bölünmüş mola 1.bölüm bekliyor: ${S.breakPart1Done?'Evet (≥30dk 2.bölüm gerekli)':'Hayır'}
- Hafif araç modu: ${S.lightVehicleMode?'Aktif':'Pasif'}
- Çift sürücü: ${S.doubleDriver?'Aktif':'Pasif'}
- Son haftalık dinlenme: ${hm(S.simMin-(S.lastWeeklyRestMin||0))} önce

Kullanıcının sorularını Türkçe olarak kısa, net ve pratik biçimde yanıtla.
Yalnızca AB 561/2006 ve takograf kuralları kapsamında bilgi ver.
Kural numaralarını ( vb.) belirt.`;
}

/* ── S5-1: Claude API Çağrısı ── */
async function askClaude(userMessage, systemOverride){
 const system = systemOverride || buildAIContext();
 /* NOT: Tarayıcıdan doğrudan Anthropic API çağrısı CORS politikası nedeniyle
 hata verebilir. Backend proxy gereklidir. API key sessionStorage'dan okunur. */
 const apiKey = sessionStorage.getItem('tachotr_api_key') || '';

 try {
 const resp = await fetch('https://api.anthropic.com/v1/messages', {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 ...(apiKey ? {'x-api-key': apiKey, 'anthropic-version': '2023-06-01'} : {}),
 },
 body: JSON.stringify({
 model: 'claude-sonnet-4-20250514',
 max_tokens: 1000,
 system,
 messages: [{ role: 'user', content: userMessage }],
 }),
 });

 if(!resp.ok){
 const err = await resp.text();
 if(resp.status === 401 || resp.status === 403){
 throw new Error('API anahtarı gerekli veya geçersiz. AI panelinde API key girin.');
 }
 throw new Error(`API ${resp.status}: ${err.slice(0,100)}`);
 }

 const data = await resp.json();
 return data.content?.[0]?.text || '(Yanıt alınamadı)';
 } catch(e){
 console.error('Claude API hatası:', e);
 throw e;
 }
}

/* ── S5-3/4/5/6: AI Görev Fonksiyonları ── */

/* S5-4: Günlük planlama önerisi */
async function getAIDailyPlan(){
 const msg = `Bugünkü durumuma bakarak bana en uygun sürüş planını öner. 
 Kalan günlük sürüş: ${hm(S.dailyMax - S.dailyDrv)}, 
 kesintisiz kalan: ${hm(CONT_DRIVE_LIMIT - S.contDrv)}.
 Kısa ve pratik bir gün planı ver (sürüş blokları + mola zamanları).`;
 return askClaude(msg);
}

/* S5-5: Risk erken uyarısı */
async function getAIRiskWarning(){
 const risk = calcRiskLevel();
 if(risk.level === 'LOW') return 'Şu an risk düşük. Sürüşe devam edebilirsiniz.';
 const msg = `Risk seviyem ${risk.level==='HIGH'?'YÜKSEK':'ORTA'}: ${risk.messages.join(', ')}.
 Bu durumu nasıl yönetmeliyim? Hemen ne yapmalıyım?`;
 return askClaude(msg);
}

/* S5-6: Haftalık uyum özeti */
async function getAIWeeklySummary(){
 const score = calcUyumScore();
 const faults = S.faultHistory||[];
 const msg = `Bu haftaki simülasyon performansımı değerlendir:
 - Uyum puanı: ${score}/100
 - Toplam ihlal: ${faults.length}
 - İhlal tipleri: ${faults.map(f=>f.label||f.code).join(', ')||'Yok'}
 - Haftalık sürüş: ${hm(S.weeklyDrv)} / 56:00
 Güçlü yönlerimi ve geliştirilmesi gerekenleri söyle.`;
 return askClaude(msg);
}

/* S5-3: Kural yorumu */
async function getAIRuleExplanation(ruleRef){
 const msg = `AB 561/2006 ${ruleRef||'Madde 7'} kuralını Türkçe olarak açıkla.
 Simülatör kullanıcısına pratik bir şekilde, örnek vererek anlat.`;
 return askClaude(msg);
}

/* ── AI Chat Paneli UI ── */
let _aiChatHistory = [];

function openAIChat(){
 if(document.getElementById('ai-chat-dlg')) return;

 const dlg = document.createElement('div');
 dlg.id = 'ai-chat-dlg';
 dlg.style.cssText = [
 'position:fixed','bottom:16px','right:16px',
 'background:var(--s1)','border:1px solid var(--bdr2)',
 'border-radius:10px',
 'z-index:9990','width:min(380px,calc(100vw - 24px))',
 'height:min(520px,calc(100vh - 120px))',
 'display:flex','flex-direction:column',
 'box-shadow:var(--shadow-lg)','font-family:var(--M)',
 'overflow:hidden',
 ].join(';');

 dlg.innerHTML = `
 <!-- Header -->
 <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;
 background:var(--s2);border-bottom:1px solid var(--bdr);flex-shrink:0;">
 <span style="font-size:1.1rem;">🤖</span>
 <div style="flex:1;">
 <div style="font-size:.75rem;font-weight:600;color:var(--txt);">Takograf Danışmanı</div>
 <div style="font-size:var(--fs-min);color:var(--dim);">Claude AI · AB 561/2006 uzmanı</div>
 </div>
 <button onclick="document.getElementById('ai-chat-dlg').remove()"
 aria-label="Sohbeti kapat"
 style="background:transparent;border:none;color:var(--dim);cursor:pointer;">✕</button>
 </div>

 <!-- API Key uyarısı -->
 <div id="ai-apikey-bar" style="display:${sessionStorage.getItem('tachotr_api_key')?'none':'flex'};
 align-items:center;gap:6px;padding:6px 10px;
 background:rgba(239,68,68,.08);border-bottom:1px solid rgba(239,68,68,.3);
 font-size:var(--fs-min);color:#fca5a5;flex-shrink:0;">
 <span>🔑</span>
 <span style="flex:1">API key gerekli (CORS)</span>
 <input id="ai-key-input" type="password" placeholder="sk-ant-..." 
 value="${sessionStorage.getItem('tachotr_api_key')||''}"
 style="flex:2;background:var(--s3);border:1px solid var(--bdr2);color:var(--txt);
 border-radius:3px;padding:2px 6px;font-size:var(--fs-min);font-family:var(--M);"
 onchange="sessionStorage.setItem('tachotr_api_key',this.value);
 document.getElementById('ai-apikey-bar').style.display=this.value?'none':'flex';"
 aria-label="Anthropic API anahtarı">
 </div>

 <!-- Hızlı eylem butonları -->
 <div style="display:flex;gap:4px;padding:6px 10px;flex-wrap:wrap;
 background:var(--s3);border-bottom:1px solid var(--bdr);flex-shrink:0;">
 <button onclick="_aiQuickAction('plan')" aria-label="Günlük plan al"
 style="padding:3px 8px;background:var(--s2);border:1px solid var(--bdr);
 border-radius:3px;cursor:pointer;font-size:var(--fs-min);color:var(--blu);">
 📅 Günlük Plan</button>
 <button onclick="_aiQuickAction('risk')" aria-label="Risk analizi al"
 style="padding:3px 8px;background:var(--s2);border:1px solid var(--bdr);
 border-radius:3px;cursor:pointer;font-size:var(--fs-min);color:var(--amber);">
 ⚠ Risk Analizi</button>
 <button onclick="_aiQuickAction('weekly')" aria-label="Haftalık özet al"
 style="padding:3px 8px;background:var(--s2);border:1px solid var(--bdr);
 border-radius:3px;cursor:pointer;font-size:var(--fs-min);color:var(--grn);">
 📊 Haftalık Özet</button>
 <button onclick="_aiQuickAction('rule')" aria-label="Kural açıkla"
 style="padding:3px 8px;background:var(--s2);border:1px solid var(--bdr);
 border-radius:3px;cursor:pointer;font-size:var(--fs-min);color:var(--pur);">
 📖 Kural Sor</button>
 </div>

 <!-- Mesaj alanı -->
 <div id="ai-messages" style="flex:1;overflow-y:auto;padding:10px 12px;
 display:flex;flex-direction:column;gap:8px;">
 <div style="padding:8px 10px;background:var(--s2);border-radius:6px;
 font-size:.625rem;color:var(--dim);line-height:1.6;border-left:2px solid var(--blu);">
 Merhaba! Ben AB 561/2006 takograf kuralları danışmanıyım.
 Mevcut simülasyon durumunuzu analiz edebilir, sorularınızı yanıtlayabilirim.
 Yukarıdaki hızlı butonları veya kendi sorunuzu yazabilirsiniz.
 </div>
 </div>

 <!-- Giriş alanı -->
 <div style="padding:8px 10px;border-top:1px solid var(--bdr);flex-shrink:0;
 display:flex;gap:6px;">
 <input id="ai-input" placeholder="Soru sorun... (örn: 'Ne zaman mola vermeliyim?')"
 aria-label="AI'ya soru sor"
 style="flex:1;padding:6px 8px;background:var(--s3);border:1px solid var(--bdr);
 border-radius:4px;color:var(--txt);font-family:var(--M);font-size:.625rem;"
 onkeydown="if(event.key==='Enter')_sendAIMessage()"/>
 <button onclick="_sendAIMessage()" aria-label="Mesaj gönder"
 style="padding:6px 12px;background:var(--blu-dim);border:1px solid var(--blu);
 color:var(--blu);border-radius:4px;cursor:pointer;font-size:.625rem;">
 Gönder</button>
 </div>`;

 document.body.appendChild(dlg);
}

function _appendAIMessage(role, text, loading){
 const container = document.getElementById('ai-messages');
 if(!container) return;

 const div = document.createElement('div');
 const isUser = role === 'user';
 div.style.cssText = [
 'padding:8px 10px',
 `background:${isUser?'var(--blu-dim)':'var(--s2)'}`,
 `border-radius:6px`,
 `border-left:2px solid ${isUser?'var(--blu)':'var(--pur)'}`,
 'font-size:.625rem',
 'color:var(--txt)',
 'line-height:1.6',
 'white-space:pre-wrap',
 ].join(';');

 if(loading){
 div.id = 'ai-loading-msg';
 div.innerHTML = '<span style="color:var(--dim);">🤖 Düşünüyor...</span>';
 } else {
 div.textContent = isUser ? text : text;
 if(!isUser) div.style.color = 'var(--txt2)';
 }

 container.appendChild(div);
 container.scrollTop = container.scrollHeight;
 return div;
}

async function _sendAIMessage(){
 const input = document.getElementById('ai-input');
 if(!input) return;
 const text = input.value.trim();
 if(!text) return;

 input.value = '';
 _appendAIMessage('user', text);

 const loadingEl = _appendAIMessage('assistant', '', true);

 try {
 /* Sohbet geçmişi ile bağlam */
 _aiChatHistory.push({role:'user', content: text});
 if(_aiChatHistory.length > 10) _aiChatHistory = _aiChatHistory.slice(-10);

 const resp = await fetch('https://api.anthropic.com/v1/messages', {
 method: 'POST',
 headers: {'Content-Type':'application/json'},
 body: JSON.stringify({
 model: 'claude-sonnet-4-20250514',
 max_tokens: 800,
 system: buildAIContext(),
 messages: _aiChatHistory,
 }),
 });

 if(!resp.ok) throw new Error(`HTTP ${resp.status}`);
 const data = await resp.json();
 const reply = data.content?.[0]?.text || '(Yanıt alınamadı)';

 loadingEl?.remove();
 _appendAIMessage('assistant', reply);
 _aiChatHistory.push({role:'assistant', content: reply});
 } catch(e) {
 loadingEl?.remove();
 _appendAIMessage('assistant', `Hata: ${e.message}
(API bağlantısı kurulamadı — API anahtarı gerekli.)`);
 }
}

async function _aiQuickAction(type){
 const input = document.getElementById('ai-input');
 const questions = {
 plan: 'Bugünkü durumuma göre en uygun sürüş planını önerir misin?',
 risk: 'Mevcut risk durumumu analiz et ve ne yapmalıyım söyle.',
 weekly: 'Bu haftaki performansımı değerlendir. Güçlü ve zayıf yönlerimi söyle.',
 rule: 'AB 561/2006 mola kurallarını (Md.7) pratik örnekle açıkla.',
 };
 if(input) input.value = questions[type] || '';
 await _sendAIMessage();
}


/* ── S5-7: CSV Aktivite Dosyası Import ── */
function importCSV(){
 const input = document.createElement('input');
 input.type = 'file';
 input.accept = '.csv,text/csv';
 input.onchange = e => {
 const file = e.target.files[0];
 if(!file) return;
 const reader = new FileReader();
 reader.onload = ev => {
 try {
 const result = _parseActivityCSV(ev.target.result);
 if(result.error){ doLog('✗ CSV Okuma Hatası: '+result.error,'err'); return; }
 _previewCSVImport(result, file.name);
 } catch(err){
 doLog('✗ CSV parse hatası: '+err.message,'err');
 }
 };
 reader.readAsText(file, 'utf-8');
 };
 input.click();
}

function _parseActivityCSV(text){
 /* BOM temizle */
 text = text.replace(/^﻿/,'');
 const lines = text.split(/\r?\n/).filter(l=>l.trim());
 if(lines.length < 2) return {error:'Dosya boş veya geçersiz.'};

 const header = lines[0].split(',').map(h=>h.trim().replace(/"/g,'').toLowerCase());
 const colMap = {
 start: header.findIndex(h=>h.includes('başlangıç')||h.includes('start')),
 end: header.findIndex(h=>h.includes('bitiş')||h.includes('end')||h.includes('finish')),
 dur: header.findIndex(h=>h.includes('süre')||h.includes('dur')||h.includes('min')),
 mode: header.findIndex(h=>h.includes('mod')||h.includes('mode')||h.includes('aktivite')),
 day: header.findIndex(h=>h.includes('gün')||h.includes('day')),
 };

 if(colMap.dur < 0 && colMap.start < 0){
 return {error:'Gerekli sütunlar bulunamadı. Beklenen: Süre(dk) veya Başlangıç.'};
 }

 const MODE_MAP = {
 'sürüş':'driving','suruş':'driving','driving':'driving','drive':'driving',
 'dinlenme':'rest','din.':'rest','rest':'rest','sleep':'sleep',
 'diğer iş':'work','diger is':'work','work':'work','iş':'work',
 'uygunluk':'available','available':'available',
 };

 const segs = [];
 let cumMin = 0;
 for(let i=1; i<lines.length; i++){
 const cells = lines[i].split(',').map(c=>c.trim().replace(/"/g,''));
 const durRaw = colMap.dur>=0 ? cells[colMap.dur] : null;
 const modRaw = (colMap.mode>=0 ? cells[colMap.mode] : '').toLowerCase().trim();
 const dur = parseInt(durRaw)||0;
 if(dur <= 0) continue;
 const mode = MODE_MAP[modRaw] || 'driving';
 segs.push({ abs:cumMin, dur, mode, imported:true });
 cumMin += dur;
 }

 return { segs, totalMin:cumMin, rowCount:segs.length };
}

function _previewCSVImport(result, fileName){
 if(document.getElementById('csv-preview-dlg')) return;

 const totalDrv = result.segs.filter(s=>s.mode==='driving').reduce((a,b)=>a+b.dur,0);
 const totalRst = result.segs.filter(s=>s.mode==='rest').reduce((a,b)=>a+b.dur,0);

 const dlg = document.createElement('div');
 dlg.id = 'csv-preview-dlg';
 dlg.style.cssText = [
 'position:fixed','top:50%','left:50%',
 'transform:translate(-50%,-50%)',
 'background:var(--s1)','border:1px solid var(--bdr2)',
 'border-radius:10px','padding:20px 22px',
 'z-index:9999','width:min(480px,calc(100vw - 24px))',
 'max-height:85vh','overflow-y:auto',
 'box-shadow:var(--shadow-lg)','font-family:var(--M)',
 ].join(';');

 dlg.innerHTML = `
 <div style="display:flex;justify-content:space-between;margin-bottom:14px;">
 <div>
 <div style="font-size:.875rem;font-weight:600;color:var(--txt);">📥 CSV Önizleme</div>
 <div style="font-size:var(--fs-min);color:var(--dim);">${escapeHTML(fileName)} · ${result.rowCount} kayıt · ${hm(result.totalMin)}</div>
 </div>
 <button onclick="document.getElementById('csv-preview-dlg').remove()"
 aria-label="Kapat" style="background:transparent;border:none;color:var(--dim);cursor:pointer;">✕</button>
 </div>

 <!-- Özet -->
 <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:12px;">
 ${[
 {label:'Toplam Süre', val:hm(result.totalMin), color:'var(--txt)'},
 {label:'Sürüş', val:hm(totalDrv), color:'var(--CD)'},
 {label:'Dinlenme', val:hm(totalRst), color:'var(--CR)'},
 ].map(s=>`
 <div style="background:var(--s2);border:1px solid var(--bdr);border-radius:5px;
 padding:8px;text-align:center;">
 <div style="font-size:var(--fs-min);color:var(--dim);">${s.label}</div>
 <div style="font-size:.875rem;font-weight:700;color:${s.color};">${s.val}</div>
 </div>`).join('')}
 </div>

 <!-- İlk 10 satır önizleme -->
 <div style="background:var(--s3);border-radius:5px;padding:8px;margin-bottom:12px;
 max-height:180px;overflow-y:auto;">
 ${result.segs.slice(0,10).map((s,i)=>`
 <div style="display:flex;gap:8px;padding:3px 4px;font-size:var(--fs-min);
 border-bottom:1px solid var(--s2);">
 <span style="color:var(--dim);min-width:20px;">${i+1}</span>
 <span style="color:var(--txt);flex:1;">${
 {driving:'🚗 Sürüş',rest:'💤 Dinlenme',work:'💼 İş',available:'⬡ Uygun'}[s.mode]||s.mode
 }</span>
 <span style="color:var(--dim);font-family:var(--M);">${hm(s.dur)}</span>
 </div>`).join('')}
 ${result.rowCount>10?`<div style="font-size:var(--fs-min);color:var(--dim);padding:4px;">... ve ${result.rowCount-10} kayıt daha</div>`:''}
 </div>

 <!-- Yapay Zeka yorumu butonu - S5-8 -->
 <div style="display:flex;gap:6px;">
 <button onclick="_applyCSVImport(${JSON.stringify(result.segs.slice(0,500)).replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/'/g,'&#39;')})" 
 aria-label="CSV verisini simülasyona yükle"
 style="flex:1;padding:7px;background:var(--grn-dim);border:1px solid var(--grn);
 color:var(--grn);border-radius:4px;cursor:pointer;font-size:.625rem;">
 ▶ Simülasyona Yükle
 </button>
 <button onclick="_analyzeCSVWithAI()" aria-label="AI ile analiz et"
 style="flex:1;padding:7px;background:var(--pur-dim);border:1px solid var(--pur);
 color:var(--pur);border-radius:4px;cursor:pointer;font-size:.625rem;">
 🤖 AI Analizi
 </button>
 </div>`;

 dlg.setAttribute('data-segs', JSON.stringify(result.segs));
 document.body.appendChild(dlg);
}

function _applyCSVImport(segsData){
 const segs = typeof segsData==='string' ? JSON.parse(segsData) : segsData;
 if(!segs||!segs.length){ doLog('✗ Yüklenecek veri yok.','err'); return; }

 document.getElementById('csv-preview-dlg')?.remove();
 resetSim();

 segs.forEach(seg=>{
 if(seg.mode !== S.mode) setMode(seg.mode, null);
 advance(seg.dur);
 });

 doLog(`📥 CSV verisi yüklendi: ${segs.length} segment, toplam ${hm(segs.reduce((a,b)=>a+b.dur,0))} dakika.`,'ok');
}

/* S5-8: AI destekli CSV veri yorumu */
async function _analyzeCSVWithAI(){
 const dlg = document.getElementById('csv-preview-dlg');
 const segs = dlg ? JSON.parse(dlg.getAttribute('data-segs')||'[]') : [];

 if(!segs.length){ doLog('ℹ Analiz edilecek veri yok.','warn'); return; }

 const totalDrv = segs.filter(s=>s.mode==='driving').reduce((a,b)=>a+b.dur,0);
 const totalRst = segs.filter(s=>s.mode==='rest').reduce((a,b)=>a+b.dur,0);
 const totalWrk = segs.filter(s=>s.mode==='work').reduce((a,b)=>a+b.dur,0);

 /* Max kesintisiz sürüş hesapla */
 let maxCont = 0, curCont = 0;
 segs.forEach(s=>{
 if(s.mode==='driving') curCont+=s.dur;
 else { maxCont=Math.max(maxCont,curCont); curCont=0; }
 });
 maxCont=Math.max(maxCont,curCont);

 const prompt = `Bir sürücünün takograf verisi içe aktarıldı. Uyum analizi yap:
- Toplam sürüş: ${hm(totalDrv)}
- Toplam dinlenme: ${hm(totalRst)}
- Toplam iş süresi: ${hm(totalWrk)}
- Maks. kesintisiz sürüş: ${hm(maxCont)}
- Toplam segment sayısı: ${segs.length}
AB 561/2006 açısından bu veriyi değerlendir. Kural ihlali var mı? Riskleri belirt.`;

 /* AI chat panelini aç ve analizi gönder */
 document.getElementById('csv-preview-dlg')?.remove();
 openAIChat();
 await new Promise(r=>setTimeout(r,300));
 const input = document.getElementById('ai-input');
 if(input){ input.value = prompt; await _sendAIMessage(); }
}


/* S5: AI sekmesi hızlı analiz */
async function _runAIQuick(type){
 const el = document.getElementById('ai-quick-result');
 if(!el) return;
 el.innerHTML = '<span style="color:var(--dim);">🤖 Analiz yapılıyor...</span>';

 try {
 let resp;
 switch(type){
 case 'plan': resp = await getAIDailyPlan(); break;
 case 'risk': resp = await getAIRiskWarning(); break;
 case 'weekly': resp = await getAIWeeklySummary(); break;
 case 'rule':
 const ruleQ = prompt('Hangi kural? (örn: Madde 7, )') || 'Madde 7';
 resp = await getAIRuleExplanation(ruleQ);
 break;
 default: resp = 'Bilinmeyen aksiyon.';
 }
 el.style.color = 'var(--txt)';
 el.textContent = resp;
 } catch(e){
 el.style.color = 'var(--red)';
 el.textContent = 'Hata: ' + e.message + '\n(API bağlantısı gerekli)';
 }
}


/* ══════════════════════════════════════════════════════════════════ */

/* ── S6-1: PWA Manifest ── */
(function initPWA(){
 /* Manifest JSON inline olarak oluştur */
 const manifest = {
 name: 'TachoTR — Simülatör',
 short_name: 'TachoTR',
 description: 'AB 561/2006 uyumlu dijital takograf simülatörü',
 start_url: './',
 display: 'standalone',
 background_color: '#09090e',
 theme_color: '#09090e',
 orientation: 'any',
 icons: [
 {src:'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%2309090e"/><text y="65" x="15" font-size="60">🚚</text></svg>',
 sizes:'any', type:'image/svg+xml'},
 ],
 categories: ['education','utilities'],
 lang: 'tr',
 };
 const blob = new Blob([JSON.stringify(manifest)],{type:'application/json'});
 const url = URL.createObjectURL(blob);
 const link = document.getElementById('pwa-manifest');
 if(link) link.href = url;

 /* Kurulum prompt'unu yakala */
 window.addEventListener('beforeinstallprompt', e => {
 e.preventDefault();
 window._pwaInstallPrompt = e;
 /* Kur butonu göster */
 const btn = document.getElementById('pwa-install-btn');
 if(btn) btn.style.display = 'inline-flex';
 });

 window.addEventListener('appinstalled', () => {
 const btn = document.getElementById('pwa-install-btn');
 if(btn) btn.style.display = 'none';
 doLog('✓ TachoTR ana ekrana eklendi!','ok');
 });
})();

function installPWA(){
 const prompt = window._pwaInstallPrompt;
 if(!prompt){ _toast('Bu tarayıcı yükleme özelliğini desteklemiyor.','error'); return; }
 prompt.prompt();
 prompt.userChoice.then(choice => {
 if(choice.outcome==='accepted') doLog('✓ Uygulama yükleniyor...','ok');
 window._pwaInstallPrompt = null;
 });
}

/* ── S6-3/4: i18n Çeviri Sistemi ── */
const TRANSLATIONS = {
 tr: {
 'app.title': 'Dijital Takograf',
 'app.subtitle': 'Canlı Simülatör',
 'mode.driving': 'SÜRÜŞ',
 'mode.rest': 'DİNLENME',
 'mode.work': 'DİĞER İŞ',
 'mode.available': 'UYGUNLUK',
 'tab.log': '📋 Log',
 'tab.status': '📊 Durum',
 'tab.gnss': '📍 Konum',
 'tab.tl': '📈 Zaman',
 'tab.data': '💾 Veri',
 'tab.ai': '🤖 AI',
 'tab.scen': '🎬 Senaryo',
 'btn.driving': 'SÜRÜŞ',
 'btn.rest': 'DİNLENME',
 'btn.work': 'DİĞER İŞ',
 'btn.available': 'UYGUNLUK',
 'cnt.daily': 'Günlük Sürüş',
 'cnt.cont': 'Kesintisiz',
 'cnt.break': 'Mola Hakkı',
 'cnt.rest': 'Dinlenme',
 'cnt.weekly': 'Haftalık',
 'cnt.split': '9sa Hakkı',
 'cnt.ext': '10sa Hakkı',
 'ui.tools': '⚙ Araçlar ▾',
 'ui.new_day': '📅 Yeni Gün',
 'ui.reset': 'Sıfırla',
 'ui.inspector': '🔍 Müfettiş',
 'ui.kty': '🇹🇷 KTY',
 'ui.ai_chat': '🤖 AI Danışman',
 'rule.daily_max': 'Günlük maks 9:00',
 'rule.weekly_max': 'Haftalık maks 56:00',
 'rule.break_required':'Mola zorunlu',
 'msg.system_start': 'Sistem başlatıldı',
 'msg.tour_hint': '🎓 Tur için "Tur Başlat" butonuna tıklayın.',
 },
 en: {
 'app.title': 'Digital Tachograph',
 'app.subtitle': 'Live Simulator',
 'mode.driving': 'DRIVING',
 'mode.rest': 'REST',
 'mode.work': 'OTHER WORK',
 'mode.available': 'AVAILABLE',
 'tab.log': '📋 Log',
 'tab.status': '📊 Status',
 'tab.gnss': '📍 Location',
 'tab.tl': '📈 Timeline',
 'tab.data': '💾 Data',
 'tab.ai': '🤖 AI',
 'tab.scen': '🎬 Scenarios',
 'btn.driving': 'DRIVING',
 'btn.rest': 'REST',
 'btn.work': 'OTHER WORK',
 'btn.available': 'AVAILABLE',
 'cnt.daily': 'Daily Drive',
 'cnt.cont': 'Continuous',
 'cnt.break': 'Break Left',
 'cnt.rest': 'Rest',
 'cnt.weekly': 'Weekly',
 'cnt.split': '9h Rights',
 'cnt.ext': '10h Rights',
 'ui.tools': '⚙ Tools ▾',
 'ui.new_day': '📅 New Day',
 'ui.reset': 'Reset',
 'ui.inspector': '🔍 Inspector',
 'ui.kty': '🇹🇷 KTY',
 'ui.ai_chat': '🤖 AI Assistant',
 'rule.daily_max': 'Daily max 9:00',
 'rule.weekly_max': 'Weekly max 56:00',
 'rule.break_required':'Break required',
 'msg.system_start': 'System started',
 'msg.tour_hint': '🎓 Click "Start Tour" to begin the guided tour.',
 },
 de: {
 'app.title': 'Digitaler Tachograph',
 'app.subtitle': 'Live-Simulator',
 'mode.driving': 'FAHRT',
 'mode.rest': 'RUHEZEIT',
 'mode.work': 'ANDERE ARBEIT',
 'mode.available': 'BEREITSCHAFT',
 'tab.log': '📋 Log',
 'tab.status': '📊 Status',
 'tab.gnss': '📍 Position',
 'tab.tl': '📈 Zeitlinie',
 'tab.data': '💾 Daten',
 'tab.ai': '🤖 KI',
 'tab.scen': '🎬 Szenarien',
 'btn.driving': 'FAHRT',
 'btn.rest': 'RUHE',
 'btn.work': 'ARBEIT',
 'btn.available': 'BEREIT',
 'cnt.daily': 'Tagesfahrt',
 'cnt.cont': 'Ununterbrochen',
 'cnt.break': 'Pausenrecht',
 'cnt.rest': 'Ruhezeit',
 'cnt.weekly': 'Wöchentlich',
 'cnt.split': '9h-Recht',
 'cnt.ext': '10h-Recht',
 'ui.tools': '⚙ Werkzeuge ▾',
 'ui.new_day': '📅 Neuer Tag',
 'ui.reset': 'Zurücksetzen',
 'ui.inspector': '🔍 Inspektor',
 'ui.kty': '🇹🇷 KTY',
 'ui.ai_chat': '🤖 KI-Berater',
 'rule.daily_max': 'Täglich max 9:00',
 'rule.weekly_max': 'Wöchentlich max 56:00',
 'rule.break_required':'Pause erforderlich',
 'msg.system_start': 'System gestartet',
 'msg.tour_hint': '🎓 Klicken Sie "Tour starten" für die geführte Tour.',
 },
};

let _currentLang = localStorage.getItem('tachotr_lang') || 'tr';

function t(key){ return (TRANSLATIONS[_currentLang]||TRANSLATIONS.tr)[key] || key; }

/* setLanguage ve _applyTranslations: satır 11518+ kapsamlı versiyon kullanılır */


/* ── S6-5: Light/Dark Tema Sistemi ── */
let _currentTheme = localStorage.getItem('tachotr_theme') || 'dark';

function setTheme(theme){
 _currentTheme = theme;
 localStorage.setItem('tachotr_theme', theme);
 /* data-theme hem html hem body'e uygula — specificity garantisi */
 document.documentElement.setAttribute('data-theme', theme);
 document.body.setAttribute('data-theme', theme);
 /* CSS class ile de uygula */
 document.documentElement.classList.toggle('theme-light', theme==='light');
 document.documentElement.classList.toggle('theme-dark', theme==='dark');
 /* Buton güncelle */
 const btn = document.getElementById('theme-toggle-btn');
 if(btn){
 btn.textContent = theme==='dark' ? '☀ Açık' : '🌙 Koyu';
 btn.style.color = theme==='dark' ? 'var(--dim)' : 'var(--amber)';
 }
 const themeLabels = {tr:['🌙 Koyu','☀ Açık'], en:['🌙 Dark','☀ Light'], de:['🌙 Dunkel','☀ Hell']};
 const [darkLbl, lightLbl] = themeLabels[_currentLang||'tr'];
 if(btn){ btn.textContent = theme==='dark' ? lightLbl : darkLbl; }
 if(typeof doLog === 'function') doLog('🎨 Tema: '+(theme==='dark'?'Koyu':'Açık'),'ok');
}

function toggleTheme(){
 setTheme(_currentTheme==='dark'?'light':'dark');
}

/* ── S6-6: KTY Kural Modu ── */
window._ktyMode = true; /* Türkiye KTY iç hat modu — varsayılan AÇIK */

function toggleKTYMode(){
 window._ktyMode = !window._ktyMode;

 /* Araç şeridi butonu */
 const btn = document.getElementById('kty-mode-btn');
 if(btn){
   btn.textContent = window._ktyMode ? '🇹🇷 KTY: AÇIK' : '🇪🇺 AB: AÇIK';
   btn.style.borderColor = window._ktyMode ? '#e30a17' : '#3b82f6';
   btn.style.color = window._ktyMode ? '#e30a17' : '#60a5fa';
 }

 /* opmode-badge doğrudan güncelle */
 const badge = document.getElementById('opmode-badge');
 if(badge){
   if(window._ktyMode){
     badge.textContent='🇹🇷 KTY'; badge.className='lcd-opmode';
     badge.style.color='#e30a17'; badge.style.borderColor='#e30a17'; badge.style.background='rgba(227,10,23,.08)';
   } else {
     badge.textContent='🇪🇺 AB'; badge.className='lcd-opmode';
     badge.style.color='#60a5fa'; badge.style.borderColor='#3b82f6'; badge.style.background='rgba(59,130,246,.08)';
   }
 }

 /* devBrand başlık */
 const devBrand = document.getElementById('dev-brand-lbl');
 if(devBrand){
   devBrand.textContent = window._ktyMode
     ? '🇹🇷 KTY MODU | Türkiye İç Hat | Takograf'
     : '🇪🇺 AB 561/2006 | Uluslararası | Takograf';
 }

 if(window._ktyMode){
   /* KTY iç hat: AB 561/2006 ile aynı sürüş limitleri (56sa haftalık) */
   /* NOT: Türkiye KTY'de ayrı bir haftalık limit yoktur — AB/AETR uygulanır */
   S.useReducedRest = false; /* KTY modunda 9sa kısaltılmış dinlenme kullanılmaz */
   doLog('🇹🇷 KTY MODU AKTİF — Türkiye iç hat kuralları uygulanıyor.','ok');
   doLog(' • Günlük: 9sa (2×10sa) | Haftalık: 56sa | 2hf: 90sa | Kesintisiz: 4:30 | 9sa kısaltılmış: YOK');
 } else {
   doLog('🇪🇺 AB 561/2006 MODU — Uluslararası kurallar aktif.','ok');
   doLog(' • Günlük: 9sa (2×10sa) | Haftalık: 56sa | 2hf: 90sa | 9sa kısaltılmış: 3×');
 }
 updateLCD();
 /* b9 badge KTY'de gizle/göster — updateLCD'den bağımsız garantile */
 const _b9=document.getElementById('badge-9sa');
 if(_b9){
   if(window._ktyMode) _b9.classList.add('kty-hide');
   else _b9.classList.remove('kty-hide');
 }
}

/* ── S6-7: KTY Para Cezası Tablosu ── */
const KTY_FINES = {
 /* Sürüş süreleri */
 'daily_1_2h': { desc:'Günlük sürüş 1-2sa aşıldı', fine:227, ref:'Karayolları T.K. Md.67' },
 'daily_2h_plus':{ desc:'Günlük sürüş 2sa+ aşıldı', fine:453, ref:'Karayolları T.K. Md.67' },
 'weekly_limit': { desc:'Haftalık 45sa aşıldı', fine:680, ref:'KTY Ek-2' },
 /* Mola/Dinlenme */
 'break_missing':{ desc:'Zorunlu mola alınmadı', fine:340, ref:'KTY Md.47' },
 'rest_short': { desc:'Günlük dinlenme yetersiz', fine:453, ref:'KTY Md.47' },
 /* Belgeler */
 'no_src5': { desc:'SRC5 belgesi yok/geçersiz', fine:1500, ref:'KTY Md.41' },
 'no_log': { desc:'Çalışma günlüğü tutulmamış', fine:227, ref:'KTY Md.59' },
 'no_tachograph':{ desc:'Takograf arızalı/kullanılmıyor',fine:906, ref:'KTY Md.57' },
 /* Hız */
 'speed_10_30': { desc:'10-30 km/sa hız aşımı', fine:227, ref:'K.T.K. Md.52' },
 'speed_30_plus':{ desc:'30+ km/sa hız aşımı', fine:583, ref:'K.T.K. Md.52' },
};

function openKTYFineTable(){
 if(document.getElementById('kty-fine-dlg')) return;
 const dlg = document.createElement('div');
 dlg.id = 'kty-fine-dlg';
 dlg.style.cssText = [
 'position:fixed','top:50%','left:50%',
 'transform:translate(-50%,-50%)',
 'background:var(--s1)','border:2px solid #e30a17',
 'border-radius:10px','padding:20px 22px',
 'z-index:9999','width:min(560px,calc(100vw - 24px))',
 'max-height:90vh','overflow-y:auto',
 'box-shadow:0 0 40px rgba(227,10,23,.2)',
 'font-family:var(--M)',
 ].join(';');

 const rows = Object.entries(KTY_FINES).map(([key,v])=>`
 <tr style="border-bottom:1px solid var(--s3);">
 <td style="padding:6px 8px;font-size:.625rem;color:var(--txt);">${escapeHTML(v.desc)}</td>
 <td style="padding:6px 8px;font-size:.625rem;font-weight:700;color:var(--amber);
 font-family:var(--M);text-align:right;white-space:nowrap;">₺${v.fine.toLocaleString('tr-TR')}</td>
 <td style="padding:6px 8px;font-size:var(--fs-min);color:var(--dim);">${escapeHTML(v.ref)}</td>
 </tr>`).join('');

 dlg.innerHTML = `
 <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
 <span style="font-size:1.5rem;">🇹🇷</span>
 <div>
 <div style="font-size:.875rem;font-weight:700;color:#fff;">KTY Para Cezası Tablosu</div>
 <div style="font-size:var(--fs-min);color:var(--dim);">2024 · Karayolu Taşımacılığı Yönetmeliği</div>
 </div>
 <button onclick="document.getElementById('kty-fine-dlg').remove()"
 aria-label="Kapat"
 style="margin-left:auto;background:transparent;border:none;color:var(--dim);cursor:pointer;font-size:1rem;">✕</button>
 </div>
 <table style="width:100%;border-collapse:collapse;">
 <thead>
 <tr style="border-bottom:2px solid #e30a17;">
 <th style="padding:4px 8px;font-size:var(--fs-min);color:var(--dim);text-align:left;">İHLAL</th>
 <th style="padding:4px 8px;font-size:var(--fs-min);color:var(--dim);text-align:right;">CEZA</th>
 <th style="padding:4px 8px;font-size:var(--fs-min);color:var(--dim);">DAYANAK</th>
 </tr>
 </thead>
 <tbody>${rows}</tbody>
 </table>
 <div style="margin-top:10px;padding:8px;background:var(--s3);border-radius:4px;
 font-size:var(--fs-min);color:var(--dim);line-height:1.6;">
 ⚠ Ceza miktarları yıllık yeniden değerleme katsayısına göre güncellenir.
 Gerçek uygulamada tescilli yetkili makam tarafından belirlenir.
 </div>
 <div style="display:flex;gap:6px;margin-top:10px;">
 <button onclick="toggleKTYMode()" aria-label="KTY modunu aç/kapat"
 style="flex:1;padding:7px;background:rgba(227,10,23,.1);border:1px solid #e30a17;
 color:#e30a17;border-radius:4px;cursor:pointer;font-size:.625rem;">
 ${window._ktyMode?'🔴 KTY Modunu Kapat':'🟢 KTY Modunu Aç'}
 </button>
 <button onclick="document.getElementById('kty-fine-dlg').remove()"
 aria-label="Kapat"
 style="flex:1;padding:7px;background:var(--s3);border:1px solid var(--bdr);
 color:var(--dim);border-radius:4px;cursor:pointer;font-size:.625rem;">
 Kapat
 </button>
 </div>`;
 document.body.appendChild(dlg);
}

/* S6-6: KTY haftalık limit kontrolü — advance() içine entegre edildi (override KALDIRILDI) */


/* ══════════════════════════════════════════════════════
 TAM SAYFA ÇEVİRİ SİSTEMİ — DOM Traverse Yaklaşımı
 data-i18n attribute gerekmez — metin içeriğine göre eşleşir
══════════════════════════════════════════════════════ */

const FULL_TRANSLATIONS = {
 en: {
 /* NAV */
 'Simülasyon':'Simulation', 'Aylık Plan':'Monthly Plan', 'Mevzuat':'Regulations',
 /* HERO */
 'DİJİTAL':'DIGITAL', 'TAKOGRAF':'TACHOGRAPH',
 'Simülasyonu Başlat':'Start Simulation',
 /* SECTION HEADERS */
 '// İnteraktif Simülasyon':'// Interactive Simulation',
 'Canlı Simülatör':'Live Simulator',
 'Mod tuşlarına basın, zaman ilerletin. Tüm sayaçlar ve zaman çizelgesi anlık güncellenir. Senaryo yükleyerek hazır durumları inceleyin.':
 'Press mode buttons, advance time. All counters and timeline update in real-time. Load scenarios to explore ready-made situations.',
 '// Aylık Plan Simülatörü':'// Monthly Planner',
 'Şubat 2026 Sürüş Planı':'February 2026 Drive Plan',
 '// Yasal Sınırlar':'// Legal Limits',
 'AB 561/2006 Mevzuatı':'Regulation (EC) No 561/2006',
 '// Zorunlu Görevler':'// Driver Duties',
 'Sürücünün Takograf Görevleri':'Driver Tachograph Duties',
 '// Semboller':'// Symbols',
 'Dijital Takograf Aktivite Sembolleri':'Digital Tachograph Activity Symbols',
 /* LCD PANEL */
 '▸':'▸', 'SÜRÜŞ:':'DRIVE:', '/ KESİNT:':'/ CONT:',
 'DİN:':'REST:', '/ HAF:':'/ WK:',
 '▶ SLOT 1 — SÜRÜCÜ 1':'▶ SLOT 1 — DRIVER 1',
 '▶ SLOT 2 — SÜRÜCÜ 2':'▶ SLOT 2 — DRIVER 2',
 '— BOŞ —':'— EMPTY —',
 /* QUICK BAR */
 '📅 Yeni Gün':'📅 New Day', '⚙ Araçlar ▾':'⚙ Tools ▾', '✓ Uyarı':'✓ Warn',
 /* MBTNS */
 'SÜRÜŞ':'DRIVING', 'DİNLENME':'REST', 'DİĞER İŞ':'OTHER WORK', 'UYGUNLUK':'AVAILABLE',
 /* COUNTERS */
 'Günlük Sürüş':'Daily Drive', 'Kesintisiz':'Continuous', 'Mola Hakkı':'Break Left',
 'Dinlenme':'Rest', 'Haftalık':'Weekly', '9sa Hakkı':'9h Rights', '10sa Hakkı':'10h Rights',
 'Odometer':'Odometer',
 /* STATUS */
 '✓ NORMAL':'✓ NORMAL', '⚠ MOLA YAKLAŞIYOR':'⚠ BREAK DUE',
 '✗ LİMİT AŞILDI':'✗ LIMIT EXCEEDED', '■ MOLA GEREKLİ':'■ BREAK REQUIRED',
 '↻ DİNLENME':'↻ REST',
 /* PROGRESS BARS */
 'Günlük Dinlenme':'Daily Rest', 'Haftalık Sürüş':'Weekly Drive',
 /* LCD STATUS */
 'HIZ':'SPD', 'SÜRÜCÜ':'DRIVER',
 /* MODE DISPLAY */
 'DİNLENME':'REST', 'Oturum:':'Session:',
 /* RIGHT PANEL TABS */
 '📋 Log':'📋 Log', '📊 Durum':'📊 Status', '📍 Konum':'📍 Location',
 '📈 Zaman':'📈 Timeline', '💾 Veri':'💾 Data', '🤖 AI':'🤖 AI', '🎬 Senaryo':'🎬 Scenario',
 /* LOG */
 '// TAKOGRAF KAYIT LOG':'// TACHOGRAPH ACTIVITY LOG',
 'Sistem başlatıldı. Kart: A.YILMAZ (TR-054821)':'System started. Card: A.YILMAZ (TR-054821)',
 'Mod → DİNLENME | GPS: BAĞLI | Odometer: 124.532 km':'Mode → REST | GPS: CONNECTED | Odometer: 124,532 km',
 'ℹ Tur için "🎓 Tur Başlat" butonuna tıklayın.':'ℹ Click "🎓 Start Tour" button for guided tour.',
 '🌍 Dil: Türkçe':'🌍 Language: Turkish',
 /* STATUS PANEL */
 'UYUM PUANI':'COMPLIANCE SCORE', 'İHLAL RİSKİ':'VIOLATION RISK',
 'DÜŞÜK':'LOW', 'ORTA':'MED', 'YÜKSEK':'HIGH',
 '🎓 Kılavuzlu: KAPALI':'🎓 Guided: OFF', '🎓 Kılavuzlu: AÇIK':'🎓 Guided: ON',
 '// SÜRÜŞ DURUM PANELİ':'// DRIVING STATUS PANEL',
 'Kalan:':'Remaining:', 'Tükendi:':'Spent:',
 /* AI PANEL */
 '🤖 CLAUDE AI DANIŞMAN':'🤖 CLAUDE AI ASSISTANT',
 '💬 AI Sohbet Penceresini Aç':'💬 Open AI Chat Window',
 '⚡ HIZLI ANALİZ':'⚡ QUICK ANALYSIS',
 '📅 Günlük Plan':'📅 Daily Plan', '⚠ Risk Analizi':'⚠ Risk Analysis',
 '📊 Haftalık Özet':'📊 Weekly Summary', '📖 Kural Sor':'📖 Ask Rule',
 'Analiz yapmak için yukarıdan bir seçenek seçin.':'Select an option above to analyze.',
 '📥 VERİ YÜKLE':'📥 LOAD DATA',
 /* DATA PANEL */
 'OTURUM':'SESSION', '● Kaydedildi':'● Saved',
 '💾 SNAPSHOT (5 SLOT)':'💾 SNAPSHOT (5 SLOTS)',
 'Henüz snapshot yok.':'No snapshots yet.',
 '+ Şu Anı Kaydet':'+ Save Current State',
 '👤 SÜRÜCÜ PROFİLİ':'👤 DRIVER PROFILE',
 'Profil yok — yukarıdan ekleyin.':'No profiles — add one above.',
 '+ Profil Ekle / Yönet':'+ Add / Manage Profile',
 '📊 Karşılaştır':'📊 Compare',
 '📤 DIŞA AKTARMA':'📤 EXPORT',
 '📋 JSON İndir':'📋 Download JSON', '📂 JSON Yükle':'📂 Load JSON',
 '📊 CSV İndir':'📊 Download CSV', '🖨 Yazdır':'🖨 Print',
 '⚠ Tüm Verileri Sıfırla':'⚠ Reset All Data',
 /* TIMELINE */
 '▶ Oynat':'▶ Play', 'Gün':'Day', 'Hafta':'Week', '2 Hafta':'2 Weeks',
 '🔍 Müfettiş':'🔍 Inspector', '🇹🇷 KTY':'🇹🇷 KTY',
 '// ÇOK GÜNLÜ ZAMANÇİZELGESİ — AB 561/2006':'// MULTI-DAY TIMELINE — EC 561/2006',
 'Sürüş:':'Drive:', 'Dinlenme:':'Rest:', 'Uyg:':'Avail:',
 'Sürüş':'Driving', 'Dinlenme/Mola':'Rest/Break', 'Yükleme':'Loading',
 'İndirme':'Unloading', 'Yük+İnd':'Load+Unld', 'Genel İş':'Other Work', 'Uygunluk':'Available',
 'Toplam Sürüş':'Total Drive', 'Kesintisiz':'Continuous',
 'Mola Hakkı':'Break', 'Durum':'Status', 'DİNLENİYOR':'RESTING',
 /* SCENARIO */
 '— Senaryo Yükle —':'— Load Scenario —',
 /* FAULT */
 '⚡ ARIZA & OLAY GEÇMİŞİ':'⚡ FAULT & EVENT HISTORY — PDF Page 109-118',
 'Temizle':'Clear', 'Henüz arıza/olay yok ✓':'No faults/events yet ✓',
 /* GNSS */
 '📍 KONUM KAYITLARI — G2V2':'📍 POSITION RECORDS — G2V2',
 'Henüz konum kaydı yok':'No position records yet',
 '🌍 SINIR GEÇİŞLERİ — G2V2':'🌍 BORDER CROSSINGS — G2V2',
 'Henüz sınır geçişi yok':'No border crossings yet',
 '📍 Konum Raporu Al':'📍 Get Location Report',
 /* STATUS SUMMARY */
 '📊 DURUM ÖZETİ':'📊 STATUS SUMMARY',
 'HIZ SINIRI':'SPEED LIMIT', 'HIZ AŞIMI':'SPEED VIOLATION',
 'TOPLAM UYARI':'TOTAL WARNINGS', 'UTC OFSETI':'UTC OFFSET',
 'GNSS':'GNSS', 'AKTİF ✓':'ACTIVE ✓', 'ÇALIŞMA MODU':'WORK MODE',
 'TAKOGRAf VERSİYON':'TACHOGRAPH VERSION', 'KART NESLİ':'CARD GEN',
 'SAKLAMA':'STORAGE', '56 gün':'56 days', 'KONUM KAYDI':'POS. RECORDS',
 'SINIR GEÇİŞİ':'BORDER CROSS', 'YÜK TİPİ':'CARGO TYPE',
 '📋 Günlük Rapor':'📋 Daily Report', '⚠ Olaylar':'⚠ Events',
 '⚙ Aktiviteler':'⚙ Activities',
 /* TOOL PANEL */
 '⚙ TÜM ARAÇLAR':'⚙ ALL TOOLS', '✕ Kapat':'✕ Close',
 '📅 SÜRÜŞ BAŞLANGICI':'📅 DRIVE START',
 '+1 Saat':'+1 Hour', '10sa Uzat':'Extend 10h', 'Uzat İptal':'Cancel Ext',
 'Uzat Geçm.':'Ext. Hist.', 'Çift Sürücü':'Dual Driver',
 'Feribot':'Ferry', 'OUT':'OUT', 'Manuel':'Manual', 'Ülke':'Country',
 'Yeni Gün':'New Day', 'Sıfırla':'Reset', 'Haftalık Plan':'Weekly Plan',
 'Müfettiş':'Inspector', 'KTY':'KTY', 'AI Danışman':'AI Assistant',
 'KTY Mod':'KTY Mode', 'KTY Ceza':'KTY Fines', 'CSV Yükle':'Load CSV',
 'ADR':'ADR', 'Bluetooth':'Bluetooth', 'GNSS':'GNSS',
 'Hız Lim.':'Speed Lim.', 'Şirket':'Company', 'Rapor':'Report',
 'UTC':'UTC', 'Piktog.':'Pictog.', 'Takograf Ver.':'Takograf Ver.',
 'Kart Gen.':'Card Gen.', 'Yük Tipi':'Cargo', 'Denetim':'Inspection',
 'Konum Log':'Pos. Log', 'Spoofing':'Spoofing', 'GNSS Anm.':'GNSS Anm.',
 'DSRC Bcn.':'DSRC Bcn.', 'ITS Veri':'ITS Data', 'SW Güncl.':'SW Update',
 'Kalibr.':'Calibr.', 'AETR':'AETR', 'Quiz':'Quiz', 'Planlama':'Planning',
 '':'', 'Menü ':'Menu ', 'Yazıcı ':'Printer ',
 'Kağıt Bitti':'Paper End', 'Ekip ':'Team ',
 'Filo Panel':'Fleet Panel', 'Telematik':'Telematics',
 'Tüm Araçlar':'All Tools',
 /* MANUAL ENTRY */
 'Aktivite:':'Activity:', 'Süre:':'Duration:', 'dakika':'minutes',
 'Girişi Uygula':'Apply Entry',
 /* WORK SUBMENU */
 '— DİĞER İŞ — Alt Mod Seçin —':'— OTHER WORK — Select Sub-mode —',
 'YÜKLEME':'LOADING', 'İNDİRME':'UNLOADING',
 'HER İKİSİ':'BOTH', 'GENEL İŞ':'GENERAL WORK', '✕ İptal':'✕ Cancel',
 /* AMD */
 'Oturum:':'Session:',
 /* DUTIES */
 '🚀 Sefer Başlangıcında':'🚀 Before the Journey',
 '⚙️ Sefer Süresince':'⚙️ During the Journey',
 '🏁 Sefer Sonunda':'🏁 After the Journey',
 /* MEVZUAT TABLOSU EKSİK PARÇALAR */
 'Günlük Sürüş (uzatılmış)':'Daily Drive (extended)',
 'Her 2 ardışık haftanın toplamı — önceki+mevcut hafta sürüşü.':'Sum of any 2 consecutive weeks — prev+current week.',
 'Kısaltılmış haftalık dinlenme en az 24 saat olmalı (24sa–44sa59dk).':'Reduced weekly rest min 24h (24h–44h59min).',
 '15 dk + 30 dk bölünebilir (sıra: önce ≥15dk, sonra ≥30dk). İki bölüm de araç dışında alınabilir.':'15min + 30min split (order: ≥15min first, then ≥30min). Both parts can be outside vehicle.',
 'başlamalı. Her iki haftalık periyot arasında 3× 9 saate kısaltılabilir —':'must start. Can be reduced to 9h 3× between two-weekly periods —',
 '. 10sa uzatılmış günde bile en az 9sa dinlenme zorunlu.':'. Even on 10h extended day min 9h rest is mandatory.',
 "(günlük için); 4. kullanım ihlal; 9sa'dan az ise geçersiz.":"(for daily); 4th use = violation; less than 9h = invalid.",
 'günlük dinlenmede uygulanır. 1. bölüm ≥3sa, 2. bölüm ≥9sa.':'applies to full daily rest. 1st ≥3h, 2nd ≥9h.',
 'Feribot/tren ≥8sa ise günlük dinlenme orada alınabilir.':'If ferry/train ≥8h daily rest can be taken there.',
 '. Kabin veya yataklı bölme koşulu aranmaz.':'. No cabin or sleeper compartment required.',
 '30 saatlik periyot içinde — pasif sürücü uygunluk modunda olmalı.':'Within 30-hour period — inactive driver in availability mode.',
 'Her 2 ardışık haftada en az 1 tam (≥45sa) + 1 kısaltılmış (≥24sa).':'Min 1 full (≥45h) + 1 reduced (≥24h) in every 2 consecutive weeks.',
 'Son haftalık din. bitişinden itibaren':'From end of last weekly rest',
 'Tam haftalık din. ve telafi dinlenmeleri yatak+sanitasyon imkânı olan yerde alınmalı.':'Full weekly and compensation rests must be in accommodation with bed + sanitation.',
 'tek blok halinde ≥9sa başka bir dinlemeye eklenmeli (pasif sürücüye de uygulanır).':'as single block ≥9h added to another rest (also applies to co-driver).',
 '45sa+ tam haftalık din. ve telafi dinlenmeleri araç dışında alınmalı.':'45h+ full weekly and compensation rests must be taken outside vehicle.',
 '; her kesinti ≤1sa. Feribot ≥8sa ise tam/kısaltılmış günlük dinlenme sayılabilir.':'; each interruption ≤1h. If ferry ≥8h it can count as full/reduced daily rest.',
 'Kontak kapalıyken: DİNLENME (fabrika ayarı, değiştirilebilir).':'Ignition off: REST (factory default, changeable).',
 'Vardiya başında ve bitiminde ülke seçilmeli. NUTS0 sınır geçişlerinde otomatik (G2V2).':'Country must be selected at shift start/end. Automatic at NUTS0 borders (G2V2).',
 'kartsız sürüş mümkün. Her sürüş başı/sonunda günlük çıktı alınmalı.':'cardless driving possible. Daily printout required at start/end of each drive.',
 'Kart yokken geçen TÜM süre kart takılınca girilmeli (el ile veya yazıcıdan).':'ALL time without card must be entered when card inserted (manually or via printer).',
 'AB dışı ülkeler / muaf araçlar (tarım, orman, ambulans, vb.).':'Non-EU countries / exempt vehicles (farming, forestry, ambulance etc.).',
 'İndirme: DLK Smart Download Key veya şirket kartıyla doğrudan.':'Download: via DLK Smart Download Key or company card directly.',
 'Yığın bellekten şirket kartı ile. G2V2 yığın bellek daha büyük.':'From mass memory with company card. G2V2 mass memory is larger.',
 'Takograf arızasında: el yazısıyla AKTİVİTE not al (tarih, saat, plaka).':'On tachograph fault: record ACTIVITY by hand (date, time, plate).',
 '(2. Nesil) her 3 saatlik sürüşte konum kaydeder.':'(2nd Gen) records position every 3h of driving.',
 'x Dahili GNSS arızası:':'x Internal GNSS fault:',
 "'dan itibaren araç içi Bluetooth. Bağlantı için PIN: 1234.":'In-vehicle Bluetooth from onwards. Connection PIN: 1234.',
 'Patlama tehlikesi olan ortamlarda: Kart yuvaları KAPALI tutulur.':'In explosion-risk areas: Card slots kept CLOSED.',
 'Yığın bellek indirme, araç plakası/ülke girişi, şirket kilidi vb.':'Mass memory download, vehicle plate/country entry, company lock etc.',
 'O ana kadar kaydedilmiş aktiviteleri takograf kağıdına veya hafızasına işleyin.':'Record all activities up to this point on paper or in memory.',
 'Önceki 28 günün kayıtlarını (kağıt veya dijital çıktı) yanınızda bulundurun.':'Keep records of the previous 28 days (paper or digital printout) with you.',
 'Ülke değiştirince analog takografta saat dilimini ve ülkeyi not edin.':'When changing country, note time zone and country on analog tachograph.',
 'Her aktivite değişiminde takograf modunu güncellemek (sürüş/diğer iş/dinlenme).':'Update tachograph mode at each activity change (drive/other work/rest).',
 'Yükleme–indirme aktivitelerini "Diğer İş" veya alt modda kaydedin.':'Record loading/unloading as "Other Work" or in sub-mode.',
 'Çift sürücülü araçta aktif olmayan sürücü kartını "Uygunluk" modunda tutun.':'Keep inactive driver card in "Availability" mode in dual-driver vehicle.',
 'Arıza 1 haftadan uzun sürecekse en kısa zamanda tamir ettirin.':'If fault will last more than 1 week, repair as soon as possible.',
 'Çift sürücülü seferlerde sürücü değişiminde hem kağıt hem hafıza verisi alın.':'In dual-driver trips, get both paper and memory data at driver change.',
 'Yükleme, boşaltma, temizlik vb. araç dışı çalışma. Sürücü kontak kapayınca':'Loading, unloading, cleaning etc. When driver turns off ignition',
 'Sürücü göreve hazır ama aktif çalışmıyor. Tren/feribot beklenirken veya':'Driver ready but not actively working. While waiting for train/ferry or',
 /* STATUS PANEL DINAMIK */
 '✓ 11sa günlük tamam':'✓ 11h daily done',
 'maks 9:00':'max 9:00', 'maks 4:30':'max 4:30', 'maks 56:00':'max 56:00',
 'maks 50:00':'max 50:00', 'maks 45:00':'max 45:00', 'maks 30:00':'max 30:00',
 'uzatma hakkı':'extension right',
 'İHLAL RİSKİ':'VIOLATION RISK', 'DÜŞÜK':'LOW',
 '✓ Günlük din. tamamlandı. Yeni 24sa pencere başladı.':'✓ Daily rest done. New 24h window started.',
 '✓ Mola tamamlandı — kesintisiz sayaç sıfırlandı':'✓ Break done — continuous counter reset',
 'SÜRÜŞ BAŞLAYABİLİR':'CAN START DRIVING',
 'DİNLENİYOR':'RESTING',
 /* GNSS PANEL */
 'Henüz arıza/olay yok ✓':'No faults/events yet ✓',
 'Her 3sa sürüş + vardiya + yükleme':'Every 3h drive + shift + loading',
 'Henüz konum kaydı yok':'No position records yet',
 '🛰 SINIR GEÇİŞLERİ — G2V2':'🛰 BORDER CROSSINGS — G2V2',
 'Henüz sınır geçişi yok':'No border crossings yet',
 /* SUMMARY DINAMIK */
 'AKTİF ✓':'ACTIVE ✓', 'SÜRÜCÜ':'DRIVER', '56 gün':'56 days',
 /* MONTHLY PLAN */
 'Günlere tıklayarak o günün zaman çizelgesini ve istatistiklerini görüntüleyin.':'Click days to view that day\'s timeline and statistics.',
 /* AMD */
 'DİNLENME':'REST',
 /* MANUAL NOTES */
 'ℹ Kart takılınca cihaz "Manuel giriş?" sorar. Kart yokken yaşanan tüm sürüşler girilmeli.':
 'ℹ When card inserted device asks "Manual entry?". All driving without card must be entered.',
 '📋 Kural: Kart dışarıdayken TÜM süreyi girmek zorundas ınız — sürüş, iş, dinlenme.':
 '📋 Rule: You must enter ALL time while card is out — driving, work, rest.',
 '⚠ Hatalı giriş düzeltilemez — çıktı alıp el yazısıyla düzeltin, 28 gün saklayın.':
 '⚠ Incorrect entries cannot be corrected — print, correct by hand, keep 28 days.',
 /* OSIAP */
 'OSNMA Galileo doğrulama AKTİF':'OSNMA Galileo auth ACTIVE',
 /* FOOTER */
 'TACHOTR — Türkiye Dijital Takograf Rehberi & Simülatörü':
 'TACHOTR — Turkey Digital Tachograph Guide & Simulator',
 'Eğitim amaçlıdır.':'For educational purposes only.',
 /* CALENDAR */
 'Normal Sefer':'Standard Trip', 'Uzun Mesafe':'Long Distance', 'Karma':'Mixed',
 'PAZ':'SUN', 'PZT':'MON', 'SAL':'TUE', 'ÇAR':'WED',
 'PER':'THU', 'CUM':'FRI', 'CMT':'SAT',
 'Tatil':'Holiday', 'Haftalık Dinlenme':'Weekly Rest',
 'İstanbul→Ankara':'Istanbul→Ankara', 'Ankara Dağıtım':'Ankara Delivery',
 'Ankara→İzmir':'Ankara→Izmir', 'İzmir→Bursa':'Izmir→Bursa',
 'Bursa Dağıtım':'Bursa Delivery', 'Bursa→İstanbul':'Bursa→Istanbul',
 'Bölge Dağıtım':'Regional Delivery', 'Dönüş Seferi':'Return Trip',
 'Kısa Sefer':'Short Trip', 'İstanbul Çevresi':'Istanbul Area',
 'Şehirlerarası':'Intercity',
 /* HERO */
 '🇹🇷 AB 561/2006 — Profesyonel Simülatörü':
 '🇹🇷 EC 561/2006 — Professional Simulator',
 '— Smart Tachograph V2 (2. Nesil) · AB 165/2014 & 561/2006 tam uyumlu · Counter · Bölünmüş mola · Ülke girişi · Çok günlü zaman çizelgesi ile eksiksiz takograf eğitimi.':
 '— Smart Tachograph V2 (2nd Gen) · EC 165/2014 & 561/2006 compliant · Counter · Split break · Country entry · Full tachograph training with multi-day timeline.',
 'Günlük Maks. Sürüş':'Daily Max Drive', 'Min. Günlük Dinlenme':'Min Daily Rest',
 /* PWA */
 '📱 Yükle':'📱 Install',
 /* LCD DYNAMIC */
 'ÇAR':'WED', 'PAZ':'SUN', 'PZT':'MON', 'SAL':'TUE', 'PER':'THU', 'CUM':'FRI', 'CMT':'SAT',
 '45dk din → sıfırla':'45min rest → reset',
 '✓ 11sa günlük tamam':'✓ 11h daily done',
 'maks 9:00':'max 9:00', 'maks 4:30':'max 4:30', 'maks 56:00':'max 56:00',
 'maks 50:00':'max 50:00', 'maks 45:00':'max 45:00', 'maks 30:00':'max 30:00', 'uzatma hakkı':'extension right',
 'Alt mod seç ▾':'Select sub ▾',
 /* OSNMA */
 '— OSNMA Galileo doğrulama AKTİF':'— OSNMA Galileo auth ACTIVE',
 /* COMPANY / ADR */
 'ŞİRKET MODU — Şirket kartı takılı. Veri indirme ve araç yönetimi aktif.':
 'COMPANY MODE — Company card inserted. Data download & fleet management active.',
 'Kartı Çıkar':'Remove Card',
 'ADR VARYANTT — Tehlikeli madde modu. Patlama bölgesinde kart yuvaları kapalı.':
 'ADR VARIANT — Hazmat mode. Card slots closed in explosion zone.',
 /* AMD */
 'DİNLENME':'REST',
 /* MANUAL ENTRY */
 '✏ MANUEL AKTİVİTE GİRİŞİ — Kart Yokken Geçen Süre':
 '✏ MANUAL ACTIVITY ENTRY — Time Elapsed Without Card',
 '😴 DİNLENME (Bed symbol)':'😴 REST (Bed symbol)',
 '🔨 DİĞER İŞ (Hammers symbol)':'🔨 OTHER WORK (Hammers symbol)',
 'ℹ Kart takılınca cihaz "Manuel giriş?" sorar. Kart yokken yaşanan tüm sürüşler girilmeli.':
 'ℹ When card inserted device asks "Manual entry?". All driving without card must be entered.',
 '📋 Kural: Kart dışarıdayken TÜM süreyi girmek zorundas ınız — sürüş, iş, dinlenme.':
 '📋 Rule: You must enter ALL time while card is out — driving, work, rest.',
 '⚠ Hatalı giriş düzeltilemez — çıktı alıp el yazısıyla düzeltin, 28 gün saklayın.':
 '⚠ Incorrect entries cannot be corrected — print out, correct by hand, keep 28 days.',
 '🏢 ŞİRKET KARTI FONKSİYONLARI ':'🏢 COMPANY CARD FUNCTIONS ',
 'Veri İndir':'Download Data', 'Günlük Rapor':'Daily Report',
 'Olaylar/Arızalar':'Events/Faults', 'Hız Raporu':'Speed Report',
 /* STATUS PANEL DYNAMIC */
 'İHLAL RİSKİ':'VIOLATION RISK', 'DÜŞÜK':'LOW',
 '✓ Günlük din. tamamlandı. Yeni 24sa pencere başladı.':
 '✓ Daily rest done. New 24h window started.',
 'Kesintisiz Sürüş':'Continuous Drive',
 '✓ Mola tamamlandı — kesintisiz sayaç sıfırlandı':
 '✓ Break done — continuous counter reset',
 'Sonraki Zorunlu İşlem':'Next Required Action',
 'SÜRÜŞ BAŞLAYABİLİR':'CAN START DRIVING',
 'Tam günlük din. tamamlandı. Max 9:00 sürüş + 4:30 kesintisiz.':
 'Full daily rest done. Max 9:00 drive + 4:30 continuous.',
 /* AI PANEL */
 'Simülasyon durumunuzu analiz eder, kural sorularını yanıtlar.':
 'Analyzes your simulation state, answers regulation questions.',
 /* DATA PANEL */
 '📂 CSV Yükle':'📂 Load CSV',
 /* GNSS PANEL */
 'G2V2 + GNSS aktifken konum kayıtları burada görünür':
 'Position records appear here when G2V2 + GNSS active',
 '🌍 SINIR GEÇİŞLERİ ':'🌍 BORDER CROSSINGS ',
 'G2V2 + GNSS ile otomatik sınır geçişleri burada listelenir':
 'Automatic border crossings listed here with G2V2 + GNSS',
 /* TL */
 'İş:':'Work:', 'Şu An':'Now',
 /* SCENARIO TITLES */
 '🚛 Normal Sürüş Günü (9sa)':'🚛 Normal Drive Day (9h)',
 '⬆️ Uzatılmış Gün (10sa) — Haftada 2×':'⬆️ Extended Day (10h) — 2× weekly',
 '✂️ Bölünmüş Mola (15+30dk)':'✂️ Split Break (15+30min)',
 '🛏️ Bölünmüş Günlük Dinlenme (3sa+9sa)':'🛏️ Split Daily Rest (3h+9h)',
 '🚢 Ro-Ro / Tren: 2 Bölümlü Dinlenme':'🚢 Ro-Ro / Train: 2-Part Rest',
 '👥 Çift Sürücü — 30 Saatlik Periyot':'👥 Dual Driver — 30-Hour Period',
 '⚠️ Mola Gerekli — 4s15dk':'⚠️ Break Required — 4h15min',
 '🚨 Limit İhlali — 10s30dk':'🚨 Limit Violation — 10h30min',
 '🌍 Uzun Mesafe — İstanbul→Münih':'🌍 Long Distance — Istanbul→Munich',
 '⛴ Feribot Dinlenmesi (Madde 9)':'⛴ Ferry Rest (Article 9)',
 '✏ Manuel Giriş Pratiği':'✏ Manual Entry Practice',
 '🚗 Hız Aşımı & Olay Kaydı':'🚗 Speed Violation & Event Record',
 '🏢 Şirket Kartı — Veri İndirme ':'🏢 Company Card — Data Download ',
 '⚡ GNSS Arızası & Olay Akışı ':'⚡ GNSS Failure & Event Flow ',
 '☢ ADR Varyantı — Tehlikeli Madde ':'☢ ADR Variant — Hazardous Material ',
 '🚔 Trafik Denetimi — G2V2 Kontrol Kartı ':'🚔 Traffic Inspection — G2V2 Control Card ',
 '🛰 G2V2 Konum Kaydı & OSNMA ':'🛰 G2V2 Position Record & OSNMA ',
 '🌍 Çok Ülkeli Sefer — Otomatik Sınır ':'🌍 Multi-Country Trip — Auto Border ',
 '🚨 GNSS Spoofing — !? GNSS Anormal ':'🚨 GNSS Spoofing — !? GNSS Anomaly ',
 '📡 DSRC Beacon — Uzaktan Denetim ':'📡 DSRC Beacon — Remote Inspection ',
 '🔄 Kabotaj Takibi 1072/2009':'🔄 Cabotage Tracking 1072/2009',
 '⚙ 2 Yillik Kalibrasyon ':'⚙ 2-Year Calibration ',
 '🚐 Hafif Arac 2.5-3.5t — Temmuz 2026':'🚐 Light Vehicle 2.5-3.5t — July 2026',
 '📝 Egitim Quizi — 15 Soru':'📝 Training Quiz — 15 Questions',
 '📅 Haftalik Planlama & Kalan Sure Analizi':'📅 Weekly Planning & Remaining Time',
 '⚫ Takograf Menü Yapısı ':'⚫ Takograf Menü Structure ',
 '🔄 Ekip Degisimi — 3 Durum ':'🔄 Team Change — 3 States ',
 '🚚 Filo Yonetici Paneli':'🚚 Fleet Manager Panel',
 '📡 Telematik & CAN Bus ':'📡 Telematics & CAN Bus ',
 '⚠️ İhlal 1 — Molasız 5 Saat Sürüş':'⚠️ Violation 1 — 5h Drive Without Break',
 '⏰ İhlal 2 — 9sa Günlük Limiti Aşmak':'⏰ Violation 2 — Exceeding 9h Daily Limit',
 '💤 İhlal 3 — Yetersiz Günlük Dinlenme (8sa)':'💤 Violation 3 — Insufficient Daily Rest (8h)',
 '📅 İhlal 4 — 24sa Penceresini Kaçırmak':'📅 Violation 4 — Missing 24h Window',
 '🔄 İhlal 5 — Molayı Kesmek (20dk)':'🔄 Violation 5 — Interrupting Break (20min)',
 '💼 İhlal 6 — İş Süresini Mola Saymak':'💼 Violation 6 — Counting Work as Break',
 '⬆️ İhlal 7 — 10sa Uzatmayı 3. Kez Kullanmak':'⬆️ Violation 7 — Using 10h Extension 3rd Time',
 '🗓️ İhlal 8 — Haftalık Dinlenmeyi Geciktirmek':'🗓️ Violation 8 — Delaying Weekly Rest',
 '📆 İhlal 9 — 56sa Haftalık Limit Aşımı':'📆 Violation 9 — 56h Weekly Limit Exceeded',
 '🔁 İhlal 10 — Telafi Borcunu Ödemeden Devam':'🔁 Violation 10 — Continuing Without Repaying Deficit',
 '🌍 TR→DE: 7 Günlük Uluslararası Sefer':'🌍 TR→DE: 7-Day International Trip',
 '🔍 Trafik Denetimi — Belge Kontrolü':'🔍 Traffic Inspection — Document Check',
 /* SCENARIO BADGES */
 'İHLAL':'VIOLATION', 'FERİBOT':'FERRY', 'ŞİRKET':'COMPANY',
 'DENETİM':'INSPECTION', 'SERVİS':'SERVICE', 'YENİ':'NEW',
 'EĞİTİM':'TRAINING', 'ARAÇ':'TOOL', 'FİLO':'FLEET',
 'ULUSLARARASI':'INTL',
 /* SUMMARY */
 'AKTİF ✓':'ACTIVE ✓', 'SÜRÜCÜ':'DRIVER', '56 gün':'56 days',
 /* MONTHLY PLAN */
 'Günlere tıklayarak o günün zaman çizelgesini ve istatistiklerini görüntüleyin.':
 'Click days to view that day\'s timeline and statistics.',
 'ŞUBAT 2026':'FEBRUARY 2026',
 /* KEYBOARD */
 'Klavye Kısayolları':'Keyboard Shortcuts',
 '🎓 Simülatör Turunu Başlat':'🎓 Start Simulator Tour',
 'Diğer İş':'Other Work', 'Uyarı Onayla':'Ack Warning',
 'Manuel Giriş':'Manual Entry', 'Rapor Yazdır':'Print Report',
 'Kapat / İptal':'Close / Cancel', 'Ülke Seç':'Select Country',
 'EĞITIM':'TRAINING', 'ARAÇLAR':'TOOLS',
 'Ekip Değişimi':'Team Change',
 'Tüm kısayollar simülatör alanında odaklanıldığında çalışır.':
 'All shortcuts work when the simulator area is focused.',
 /* REGULATIONS PAGE */
 "Türkiye'de ticari araç sürücülerine uygulanan çalışma süreleri ve dinlenme kuralları (AB 561/2006 & KTY).":
 'Working time and rest rules for commercial vehicle drivers (EC 561/2006 & KTY).',
 'İstisna / Not':'Exception / Note', 'İhlal Sonucu':'Violation Result',
 '2 gün':'2 days', '10 saate uzatılabilir':'extendable to 10 hours',
 'Para cezası':'Fine', 'İhlal + para cezası':'Violation + fine',
 'Haftalık toplam sürüş ≤56sa.':'Weekly total drive ≤56h.',
 'Önceki hafta 56sa → bu hafta max':'Prev week 56h → this week max',
 '(2 hf toplamı ≤90sa).':'(2-wk total ≤90h).',
 'Önceki hafta 40sa → bu hafta max':'Prev week 40h → this week max',
 '2 Haftalık Sürüş':'2-Week Drive',
 'Her 2 ardışık haftanın toplamı — önceki+mevcut hafta sürüşü.':
 'Sum of any 2 consecutive weeks — prev+current week driving.',
 'Ağır yaptırım':'Heavy penalty',
 'Haftalık Din. Zorunluluğu':'Weekly Rest Obligation',
 'Son haftalık dinlenmeden itibaren':'From last weekly rest',
 '6 gün (144 saat) içinde':'within 6 days (144 hours)',
 'yeni haftalık din. başlamalı.':'new weekly rest must start.',
 'Her 2 ardışık haftada:':'In every 2 consecutive weeks:',
 '1 tam + 1 kısaltılmış (≥24sa)':'1 full + 1 reduced (≥24h)',
 'Kısaltılmış haftalık dinlenme en az 24 saat olmalı (24sa–44sa59dk).':
 'Reduced weekly rest must be at least 24 hours (24h–44h59min).',
 'Tam haftalık din. ve telafi':'Full weekly rest and compensation',
 'araçta alınamaz':'cannot be taken in vehicle',
 'Araç men + ceza':'Vehicle ban + fine',
 '15 dk + 30 dk bölünebilir (sıra: önce ≥15dk, sonra ≥30dk). İki bölüm de araç dışında alınabilir.':
 '15min + 30min split allowed (order: ≥15min first, then ≥30min). Both parts can be taken outside vehicle.',
 'Günlük Dinlenme (tam)':'Daily Rest (full)',
 'Önceki günlük/haftalık din. bitişinden':'From end of previous daily/weekly rest',
 '24 saat içinde':'within 24 hours',
 'Araç men':'Vehicle ban',
 'Günlük Dinlenme (kısaltılmış)':'Daily Rest (reduced)',
 'İki haftalık':'Two-weekly',
 'dinlenme periyodu arasında maks. 3×':'max 3× between rest periods',
 'kullanılabilir — haftada 3× değil!':'allowed — not 3× per week!',
 'Bölünmüş Günlük Dinlenme':'Split Daily Rest',
 'Yalnızca':'Only',
 'günlük dinlenmede uygulanır. 1. bölüm ≥3sa, 2. bölüm ≥9sa.':
 'applies to full daily rest. 1st part ≥3h, 2nd part ≥9h.',
 'Eksik bölüm sayılmaz':'Incomplete part not counted',
 'Feribot/tren ≥8sa ise günlük dinlenme orada alınabilir.':
 'If ferry/train ≥8h daily rest can be taken there.',
 'Geçerli sayılır':'Counts as valid',
 'Çift Sürücü Günlük Din.':'Dual Driver Daily Rest',
 '30 saatlik periyot içinde — pasif sürücü uygunluk modunda olmalı.':
 'Within 30-hour period — inactive driver must be in availability mode.',
 'Tam Haftalık Dinlenme':'Full Weekly Rest',
 'Her 2 ardışık haftada en az 1 tam (≥45sa) + 1 kısaltılmış (≥24sa).':
 'At least 1 full (≥45h) + 1 reduced (≥24h) in every 2 consecutive weeks.',
 '6×24=144 saat içinde':'within 6×24=144 hours',
 'başlamalı.':'must start.',
 '⚠ Araçta alınamaz:':'⚠ Cannot be taken in vehicle:',
 'Tam haftalık din. ve telafi dinlenmeleri yatak+sanitasyon imkânı olan yerde alınmalı.':
 'Full weekly and compensation rests must be taken in a place with bed + sanitation.',
 'Araç men + ağır ceza':'Vehicle ban + heavy fine',
 'Kısaltılmış Haftalık':'Reduced Weekly',
 ', maks 45sa\'ya kadar. Telafi = 45sa − alınan süre →':'max up to 45h. Compensation = 45h − taken →',
 '3. hafta sonuna kadar':'by end of 3rd week',
 'tek blok halinde ≥9sa başka bir dinlemeye eklenmeli (pasif sürücüye de uygulanır).':
 'as single block ≥9h must be added to another rest (also applies to co-driver).',
 'Uluslararası yük taşımacılığında':'In international freight transport',
 '2 kısaltılmış':'2 reduced',
 '1 ardışık':'1 consecutive',
 'Para cezası + araç men':'Fine + vehicle ban',
 'Araç feribot/trende ise dinlenme max':'If vehicle on ferry/train rest max',
 'Yanlış girişte dinlenme geçersiz':'Wrong entry makes rest invalid',
 'Kontak kapalıyken: DİNLENME (fabrika ayarı, değiştirilebilir).':
 'Ignition off: REST (factory default, changeable).',
 'Ülke Girişi':'Country Entry',
 'Vardiya başında ve bitiminde ülke seçilmeli. NUTS0 sınır geçişlerinde otomatik (G2V2).':
 'Country must be selected at start and end of shift. Automatic at NUTS0 borders (G2V2).',
 'Kartsız Sürüş':'Cardless Driving',
 'Kart kayıp/arıza durumunda':'In case of lost/faulty card',
 '15 takvim günü':'15 calendar days',
 'kartsız sürüş mümkün. Her sürüş başı/sonunda günlük çıktı alınmalı.':
 'cardless driving allowed. Daily printout required at start/end of each drive.',
 'araçta bulundurulmalı (G2V2, Aralık 2024+).':'must be kept in vehicle (G2V2, Dec 2024+).',
 'Manuel Giriş (Card-Out)':'Manual Entry (Card-Out)',
 'Kart yokken geçen TÜM süre kart takılınca girilmeli (el ile veya yazıcıdan).':
 'ALL time elapsed without card must be entered when card inserted (manually or via printer).',
 'Hatalı giriş düzeltilemez':'Incorrect entry cannot be corrected',
 '→ çıktı al, el yazısıyla düzelt, 28 gün sakla':'→ print out, correct by hand, keep 28 days',
 'Boş bırakılırsa ihlal':'Leaving blank is a violation',
 'OUT (Kapsam Dışı)':'OUT (Out of Scope)',
 'AB dışı ülkeler / muaf araçlar (tarım, orman, ambulans, vb.).':
 'Non-EU countries / exempt vehicles (farming, forestry, ambulance, etc.).',
 'Kart Veri İndirme':'Card Data Download',
 '28 günde bir':'Every 28 days',
 'İndirme sıklığı:':'Download frequency:',
 '28 günde bir (tüm nesiller).':'Every 28 days (all generations).',
 'Saklama süresi:':'Storage period:',
 '(Aralık 2024+) · G2V1/G1: 28 gün.':'(Dec 2024+) · G2V1/G1: 28 days.',
 '56 günün':'56 days of',
 'verileri talep edilebilir (uluslararası sefer).':'data can be requested (international trip).',
 'İndirme: DLK Smart Download Key veya şirket kartıyla doğrudan.':
 'Download: via DLK Smart Download Key or company card directly.',
 'VU (Araç Birimi) İndirme':'VU (Vehicle Unit) Download',
 '90 günde bir':'Every 90 days',
 'Yığın bellekten şirket kartı ile. G2V2 yığın bellek daha büyük.':
 'From mass memory with company card. G2V2 mass memory is larger.',
 'Min. 1 yıl':'Min. 1 year',
 'Kart + araç verisi birlikte':'Card + vehicle data together',
 'Ağır idari ceza':'Heavy administrative fine',
 'Arıza Durumunda':'In Case of Fault',
 'Takograf arızasında: el yazısıyla AKTİVİTE not al (tarih, saat, plaka).':
 'In case of tachograph fault: record ACTIVITY by hand (date, time, plate).',
 'tuş ile onayla':'confirm with key',
 '(yanıp söner). Mesajlar, .':
 '(flashes). Messages, PDF Page 107-122.',
 'Belgele + onar':'Document + repair',
 'GNSS Konum Kaydı':'GNSS Position Record',
 '(2. Nesil) her 3 saatlik sürüşte konum kaydeder.':
 '(2nd Gen) records position every 3 hours of driving.',
 '! GNSS sinyali mevcut değil':'! GNSS signal not available',
 'olayı tetiklenir. GNSS anteni bağlantısı arızasında':'event triggered. On GNSS antenna connection fault',
 'x Dahili GNSS arızası':'x Internal GNSS fault',
 'Olay kaydı':'Event recorded',
 'UTC Zaman Kaydı':'UTC Time Recording',
 'Takograf tüm olayları':'Tachograph records all events',
 'UTC zamanında':'in UTC time',
 'kaydeder. LCD yerel saati gösterir. Türkiye: UTC+3 (+30dk yaz saati).':
 'LCD shows local time. Turkey: UTC+3 (+30min summer time).',
 'UTC = Yerel saat − (Dilim farkı + Yaz saati)':'UTC = Local time − (Zone offset + DST)',
 '. Kontrol belgelerinde UTC baz alınır.':'. UTC is the basis for inspection documents.',
 'Sürüş Zamanı Uyarıları':'Drive Time Warnings',
 '4:15 kesintisiz → mola yaklaşıyor (onay gerekli).':
 '4:15 continuous → break approaching (confirmation required).',
 '1 Sürüş süresi 24h:':'1 Drive period 24h:',
 'Günlük/haftalık/2haftalık doldu/yaklaşıyor.':'Daily/weekly/2-weekly full/approaching.',
 '1 Mola zamanı:':'1 Break time:',
 'Dinlenme zamanı yaklaşıyor (ayarlanabilir ön uyarı).':
 'Rest time approaching (adjustable pre-warning).',
 'Onaylanmalı':'Must be confirmed',
 'Kayıt zorunlu':'Recording mandatory',
 '! Güvenlik ihlali:':'! Security breach:',
 'Veri güvenliği bozuldu.':'Data security compromised.',
 '! Hareket çakışması:':'! Motion conflict:',
 'Feribot unutuldu → sensör çelişkisi.':'Ferry forgotten → sensor conflict.',
 '3sa kümülatif sürüşte konum yok.':'No position in 3h cumulative drive.',
 '! Kartsız sürüş:':'! Cardless driving:',
 'Geçerli kart olmadan sürüş.':'Driving without valid card.',
 '! Zaman çakışması:':'! Time conflict:',
 'Arızalar (x) PDF S.116':'Faults (x) ',
 'x Sensör arızası:':'x Sensor fault:',
 'Hareket sensörü dahili arıza.':'Motion sensor internal fault.',
 'GNSS anteni/devre arızası.':'GNSS antenna/circuit fault.',
 'x ITS arızası:':'x ITS fault:',
 'Bluetooth bileşeni arızası.':'Bluetooth component fault.',
 'x Dahili DSRC arızası:':'x Internal DSRC fault:',
 'DSRC modülü arızası.':'DSRC module fault.',
 'x Kart arızası:':'x Card fault:',
 'Kart iletişim hatası (temas temizle).':'Card communication error (clean contacts).',
 'Servis zorunlu':'Service required',
 "'dan itibaren araç içi Bluetooth. Bağlantı için PIN: 1234.":
 'In-vehicle Bluetooth from . Connection PIN: 1234.',
 'ADR Varyantı ':'ADR Variant ',
 'Patlama tehlikesi olan ortamlarda: Kart yuvaları KAPALI tutulur.':
 'In explosion-risk environments: Card slots kept CLOSED.',
 'Patlama tehlikesi':'Explosion hazard',
 'Şirket Kartı ':'Company Card ',
 'Şirket işlemi':'Company operation',
 'Şirket kartı takılınca "Şirket" çalışma moduna geçilir.':
 'Inserting company card switches to "Company" operating mode.',
 'Yığın bellek indirme, araç plakası/ülke girişi, şirket kilidi vb.':
 'Mass memory download, vehicle plate/country entry, company lock etc.',
 'Yönetici kullanımı':'Management use',
 'Çalışma Modları ':'Operating Modes ',
 'Kart tipine göre':'By card type',
 'Sürüş (İşletim):':'Driving (Operation):',
 'Sürücü kartı takılı/takısız standart mod.':'Standard mode with/without driver card.',
 'Şirket:':'Company:',
 'Şirket kartı takılınca otomatik geçiş.':'Automatic switch when company card inserted.',
 'Kontrol:':'Control:',
 'Kontrol kartı → trafik denetimi.':'Control card → traffic inspection.',
 'Kalibrasyon:':'Calibration:',
 'Servis kartı → yetkili servis işlemleri.':'Service card → authorized service operations.',
 ' Çalışma modları genel bakış ().':
 ' Operating modes overview (PDF Page 29).',
 'Otomatik':'Automatic',
 /* DUTIES */
 'O ana kadar kaydedilmiş aktiviteleri takograf kağıdına veya hafızasına işleyin.':
 'Record all activities up to that point on paper or in memory.',
 'Önceki 28 günün kayıtlarını (kağıt veya dijital çıktı) yanınızda bulundurun.':
 'Keep records of the previous 28 days (paper or digital printout) with you.',
 'Ülke değiştirince analog takografta saat dilimini ve ülkeyi not edin.':
 'When changing country, note the time zone and country on analog tachograph.',
 'Araç değiştiğinde sürücü kartını yanında taşımak':'When changing vehicle, keep driver card with you',
 'Her aktivite değişiminde takograf modunu güncellemek (sürüş/diğer iş/dinlenme).':
 'Update tachograph mode at each activity change (driving/other work/rest).',
 'Yükleme–indirme aktivitelerini "Diğer İş" veya alt modda kaydedin.':
 'Record loading-unloading activities as "Other Work" or in sub-mode.',
 'Çift sürücülü araçta aktif olmayan sürücü kartını "Uygunluk" modunda tutun.':
 'Keep inactive driver card in "Availability" mode in dual-driver vehicle.',
 'Cihaz arızasında el yazısıyla kayıt tutmak':'In case of device fault, keep handwritten records',
 'Çalışma süresi bitiminde kartı cihazdan çıkarmak':'Remove card from device at end of working time',
 'Arıza 1 haftadan uzun sürecekse en kısa zamanda tamir ettirin.':
 'If fault will last more than 1 week, have it repaired as soon as possible.',
 'Çift sürücülü seferlerde sürücü değişiminde hem kağıt hem hafıza verisi alın.':
 'In dual-driver trips, obtain both paper and memory data at driver changeover.',
 'İlk denetimde tüm kayıtları yetkililere ibraz etmek':'Present all records to authorities at first inspection',
 /* SYMBOLS */
 'Sürücünün zamanını serbestçe kullandığı mola veya dinlenme periyodu.':
 'Break or rest period where the driver uses time freely.',
 'Manuel seçilmezse takograf "Diğer İş" kaydeder.':
 'If not manually selected, tachograph records "Other Work".',
 'Araç hareket halindeyken tekerlekler dönünce':'When vehicle is moving and wheels are turning',
 'otomatik':'automatically',
 'kaydedilir. Sürücünün direksiyon başında geçirdiği toplam süre.':
 'recorded. Total time driver spends at the wheel.',
 'Yükleme, boşaltma, temizlik vb. araç dışı çalışma. Sürücü kontak kapayınca':
 'Loading, unloading, cleaning etc. non-driving work. When driver turns off ignition',
 'otomatik olarak bu moda geçer.':'automatically switches to this mode.',
 'Hazır / Uygunluk':'Ready / Availability',
 'Sürücü göreve hazır ama aktif çalışmıyor. Tren/feribot beklenirken veya':
 'Driver is ready for duty but not actively working. While waiting for train/ferry or',
 'çift sürücüde pasif sürücü':'in dual-driver the inactive driver',
 'bu modda olmalı.':'must be in this mode.',
 /* FOOTER */
 'AB Tüzük':'EU Regulation',
 '— Karayolları Trafik Kanunu':'— Road Traffic Act',
 },
 de: {
 /* NAV */
 'Simülasyon':'Simulation', 'Aylık Plan':'Monatsplan', 'Mevzuat':'Vorschriften',
 /* HERO */
 'DİJİTAL':'DIGITAL', 'TAKOGRAF':'TACHOGRAPH',
 'Simülasyonu Başlat':'Simulation starten',
 /* SECTION HEADERS */
 'Canlı Simülatör':'Live-Simulator',
 '// İnteraktif Simülasyon':'// Interaktive Simulation',
 '// Yasal Sınırlar':'// Rechtliche Grenzen',
 'AB 561/2006 Mevzuatı':'Verordnung (EG) Nr. 561/2006',
 /* LCD */
 '▸':'▸', 'SÜRÜŞ:':'FAHRT:', '/ KESİNT:':'/ UNT:',
 'DİN:':'RUHE:', '/ HAF:':'/ WO:',
 '▶ SLOT 1 — SÜRÜCÜ 1':'▶ SLOT 1 — FAHRER 1',
 '▶ SLOT 2 — SÜRÜCÜ 2':'▶ SLOT 2 — FAHRER 2',
 '— BOŞ —':'— LEER —',
 /* QUICK BAR */
 '📅 Yeni Gün':'📅 Neuer Tag', '⚙ Araçlar ▾':'⚙ Werkzeuge ▾',
 /* MODE BUTTONS */
 'SÜRÜŞ':'FAHRT', 'DİNLENME':'RUHEZEIT', 'DİĞER İŞ':'ANDERE ARBEIT', 'UYGUNLUK':'BEREITSCHAFT',
 /* COUNTERS */
 'Günlük Sürüş':'Tagesfahrt', 'Kesintisiz':'Ununterbrochen',
 'Mola Hakkı':'Pausenrecht', 'Dinlenme':'Ruhezeit', 'Haftalık':'Wöchentlich',
 '9sa Hakkı':'9h-Recht', '10sa Hakkı':'10h-Recht',
 /* TABS */
 '📊 Durum':'📊 Status', '📍 Konum':'📍 Position',
 '📈 Zaman':'📈 Zeitlinie', '💾 Veri':'💾 Daten', '🎬 Senaryo':'🎬 Szenarien',
 /* STATUS */
 'UYUM PUANI':'KONFORMITÄT', 'İHLAL RİSKİ':'VERSTOSSKRISIKO',
 'DÜŞÜK':'NIEDRIG', 'ORTA':'MITTEL', 'YÜKSEK':'HOCH',
 '🎓 Kılavuzlu: KAPALI':'🎓 Geführt: AUS', '🎓 Kılavuzlu: AÇIK':'🎓 Geführt: EIN',
 /* TIMELINE */
 '▶ Oynat':'▶ Abspielen', 'Gün':'Tag', 'Hafta':'Woche', '2 Hafta':'2 Wochen',
 'Sürüş':'Fahrt', 'Dinlenme/Mola':'Ruhe/Pause', 'Yükleme':'Beladen',
 'İndirme':'Entladen', 'Genel İş':'Andere Arbeit', 'Uygunluk':'Bereitschaft',
 /* TOOL PANEL */
 'Yeni Gün':'Neuer Tag', 'Sıfırla':'Zurücksetzen',
 'Haftalık Plan':'Wochenplan', 'AI Danışman':'KI-Berater',
 'Çift Sürücü':'Doppelfahrer', 'Feribot':'Fähre', 'Manuel':'Manuell',
 'Ülke':'Land', 'Kalibr.':'Kalibrierung', 'Rapor':'Bericht',
 /* SCENARIO */
 '— Senaryo Yükle —':'— Szenario laden —',
 /* FAULT */
 'Temizle':'Löschen', 'Henüz arıza/olay yok ✓':'Noch keine Störungen ✓',
 /* STATUS SUMMARY */
 'HIZ SINIRI':'TEMPOLIMIT', 'HIZ AŞIMI':'TEMPOÜBERSCHR.',
 'TOPLAM UYARI':'GESAMT WARN.', 'ÇALIŞMA MODU':'BETRIEBSART',
 'SAKLAMA':'SPEICHER', '56 gün':'56 Tage',
 /* WORK SUBMENU */
 'YÜKLEME':'BELADEN', 'İNDİRME':'ENTLADEN',
 'HER İKİSİ':'BEIDES', 'GENEL İŞ':'ALLG. ARBEIT',
 /* CALENDAR */
 'PAZ':'SO', 'PZT':'MO', 'SAL':'DI', 'ÇAR':'MI',
 'PER':'DO', 'CUM':'FR', 'CMT':'SA',
 'Tatil':'Feiertag', 'Haftalık Dinlenme':'Wochenruhe',
 /* DINAMIK */
 'min 11:00/gün':'min 11:00/Tag',
 'kısalt. din. hakkı':'erm. Ruhe-Recht',
 'Yükleniyor...':'Laden...',
 'AKTİF ✓':'AKTIV ✓', 'AKTİF':'AKTIV',
 'SİNYAL YOK ✗':'KEIN SIGNAL ✗',
 'SÜRÜŞ BAŞLAYABİLİR':'FAHRT MÖGLICH',
 'DİNLENİYOR':'IN RUHE',
 'Henüz arıza/olay yok ✓':'Noch keine Störungen ✓',
 'Henüz konum kaydı yok':'Noch keine Positionsdaten',
 'Henüz sınır geçişi yok':'Noch keine Grenzübertritte',
 '56 gün':'56 Tage', 'SÜRÜCÜ':'FAHRER',
 'Sistem başlatıldı. Kart: A.YILMAZ (TR-054821)':'System gestartet. Karte: A.YILMAZ (TR-054821)',
 'Mod → DİNLENME | GPS: BAĞLI | Odometer: 124.532 km':'Modus → RUHEZEIT | GPS: VERBUNDEN | Tachometer: 124.532 km',
 '🌍 Dil: Türkçe':'🌍 Sprache: Türkisch',
 'İHLAL RİSKİ':'VERSTOSS-RISIKO', 'DÜŞÜK':'NIEDRIG', 'ORTA':'MITTEL', 'YÜKSEK':'HOCH',
 'Günlük Sürüş (uzatılmış)':'Tagesfahrt (verlängert)',
 '📅 Günlük Plan':'📅 Tagesplan', '⚠ Risk Analizi':'⚠ Risikoanalyse',
 '📊 Haftalık Özet':'📊 Wochenüberblick', '📖 Kural Sor':'📖 Regel fragen',
 'Analiz yapmak için yukarıdan bir seçenek seçin.':'Wählen Sie oben eine Option zur Analyse.',
 'OTURUM':'SITZUNG', '● Kaydedildi':'● Gespeichert',
 '💾 SNAPSHOT (5 SLOT)':'💾 SNAPSHOT (5 SLOTS)',
 'Henüz snapshot yok.':'Noch keine Snapshots.',
 '+ Şu Anı Kaydet':'+ Jetzt speichern',
 '👤 SÜRÜCÜ PROFİLİ':'👤 FAHRERPROFIL',
 'Profil yok — yukarıdan ekleyin.':'Kein Profil — oben hinzufügen.',
 '+ Profil Ekle / Yönet':'+ Profil hinzufügen / verwalten',
 '📊 Karşılaştır':'📊 Vergleichen',
 '📤 DIŞA AKTARMA':'📤 EXPORT',
 '📋 JSON İndir':'📋 JSON herunterladen',
 '📂 JSON Yükle':'📂 JSON laden',
 '📊 CSV İndir':'📊 CSV herunterladen',
 '🖨 Yazdır':'🖨 Drucken',
 '⚠ Tüm Verileri Sıfırla':'⚠ Alle Daten zurücksetzen',
 /* DUTIES */
 '🚀 Sefer Başlangıcında':'🚀 Vor der Fahrt',
 '⚙️ Sefer Süresince':'⚙️ Während der Fahrt',
 '🏁 Sefer Sonunda':'🏁 Nach der Fahrt',
 /* FOOTER */
 'Eğitim amaçlıdır.':'Nur zu Schulungszwecken.',
 /* HERO */
 '📱 Yükle':'📱 Installieren',
 '🇹🇷 AB 561/2006 — Profesyonel Simülatörü':'🇹🇷 EG 561/2006 — Profi-Simulator',
 '— Smart Tachograph V2 (2. Nesil) · AB 165/2014 & 561/2006 tam uyumlu · Counter · Bölünmüş mola · Ülke girişi · Çok günlü zaman çizelgesi ile eksiksiz takograf eğitimi.':
 '— Smart Tachograph V2 (2. Gen.) · EG 165/2014 & 561/2006 konform · Counter · Geteilte Pause · Ländereingabe · Vollständige Tachographenschulung mit mehrtägigem Zeitstrahl.',
 'Günlük Maks. Sürüş':'Max. Tageslenkzeit',
 'Min. Günlük Dinlenme':'Min. tägl. Ruhezeit',
 'Simülasyonu Başlat':'Simulation starten',
 'Mevzuat':'Vorschriften',
 'Aylık Plan':'Monatsplan',
 'Mod tuşlarına basın, zaman ilerletin. Tüm sayaçlar ve zaman çizelgesi anlık güncellenir. Senaryo yükleyerek hazır durumları inceleyin.':
 'Drücken Sie Modusknöpfe, lassen Sie die Zeit voranschreiten. Alle Zähler und der Zeitstrahl werden in Echtzeit aktualisiert. Laden Sie Szenarien, um vorgefertigte Situationen zu erkunden.',
 /* LCD */
 '45dk din → sıfırla':'45min Ruhe → Reset',
 'uzatma hakkı':'Verlängerungsrecht',
 'Alt mod seç ▾':'Untermodus ▾',
 '✓ Uyarı':'✓ Warn.',
 /* ALERTS */
 '⚠ MOLA YAKLAŞIYOR':'⚠ PAUSE FÄLLIG',
 '✗ LİMİT AŞILDI':'✗ LIMIT ÜBERSCHR.',
 '■ MOLA GEREKLİ':'■ PAUSE ERFORDERL.',
 '↻ DİNLENME':'↻ RUHEZEIT',
 /* WORK MENU */
 '— DİĞER İŞ — Alt Mod Seçin —':'— ANDERE ARBEIT — Untermodus wählen —',
 '✕ İptal':'✕ Abbrechen',
 'Süre:':'Dauer:',
 'Girişi Uygula':'Eintrag anwenden',
 '😴 DİNLENME (Bed symbol)':'😴 RUHEZEIT (Bett-Symbol)',
 '🔨 DİĞER İŞ (Hammers symbol)':'🔨 ANDERE ARBEIT (Hammer-Symbol)',
 'ℹ Kart takılınca cihaz "Manuel giriş?" sorar. Kart yokken geçen aktivi tüm süreyi girmek gerekir.':
 'ℹ Beim Einlegen der Karte fragt das Gerät "Manuelle Eingabe?". Alle Aktivitäten ohne Karte müssen eingegeben werden.',
 '📋 Kural: Kart dışarıdayken TÜM süreyi girmek zorundasınız (2020 Mobil ity Package).':
 '📋 Regel: Sie müssen ALLE Zeit ohne Karte eingeben (2020 Mobility Package).',
 '⚠ Hatalı giriş düzeltilemez — çıktı alıp el yazısıyla düzeltin ve 56 gün saklayın.':
 '⚠ Falsche Einträge können nicht korrigiert werden — ausdrucken, handschriftlich korrigieren, 56 Tage aufbewahren.',
 '🏢 ŞİRKET KARTI FONKSİYONLARI ':'🏢 UNTERNEHMENSKARTE ',
 'Veri İndir':'Daten herunterladen',
 'Günlük Rapor':'Tagesbericht',
 'Olaylar/Arızalar':'Ereignisse/Störungen',
 'Hız Raporu':'Geschwindigkeitsbericht',
 /* COMPANY/ADR */
 'ŞİRKET MODU — Şirket kartı takılı. Veri indirme ve araç ayarları erişimi aktif.':
 'FIRMENMODUS — Unternehmenskarte eingesteckt. Datenabruf und Fahrzeugeinstellungen aktiv.',
 'Kartı Çıkar':'Karte entfernen',
 'ADR VARYANTT — Tehlikeli madde modu. Patlama bölgesinde: tuş/kart/yazıcı kapakları kapalı.':
 'ADR-VARIANTE — Gefahrgutmodus. In Explosionszone: Tasten/Karten/Drucker geschlossen.',
 /* TOOL PANEL */
 '⚙ TÜM ARAÇLAR':'⚙ ALLE WERKZEUGE',
 '📅 SÜRÜŞ BAŞLANGICI':'📅 FAHRTBEGINN',
 'Uzat İptal':'Verlänger. Abbrec.',
 'Uzat Geçm.':'Verlänger. Verl.',
 'Müfettiş':'Inspektor',
 'CSV Yükle':'CSV laden',
 'Hız Lim.':'Temp. Begrenz.',
 'Şirket':'Unternehmen',
 'Yük Tipi':'Frachttyp',
 'SW Güncl.':'SW-Aktualis.',
 'Menü ':'Menü ',
 'Yazıcı ':'Drucker ',
 'Kağıt Bitti':'Kein Papier',
 'Tüm Araçlar':'Alle Werkzeuge',
 /* STATUS PANEL */
 '// SÜRÜŞ DURUM PANELİ':'// FAHRSTATUS-PANEL',
 'Günlük limit dolmamış':'Tageslimit nicht erreicht',
 'Kesintisiz Sürüş':'Ununterbrochene Fahrt',
 'Mola gerekmeden önce':'Vor der Pause',
 'Tükendi:':'Aufgebraucht:',
 'Yeterli mola hakkı mevcut':'Ausreichend Pausenrecht vorhanden',
 'Haftalık limit içinde':'Innerhalb des Wochenlimits',
 'Tam günlük dinlenme tamam':'Volle Tagesruhezeit abgeschlossen',
 'Sonraki Zorunlu İşlem':'Nächste Pflichtmaßnahme',
 'Şu anki duruma göre hesaplanır':'Wird anhand des aktuellen Zustands berechnet',
 /* AI PANEL */
 '🤖 CLAUDE AI DANIŞMAN':'🤖 CLAUDE KI-BERATER',
 'Simülasyon durumunuzu analiz eder, kural sorularını yanıtlar.':
 'Analysiert Ihren Simulationszustand und beantwortet Regelfragen.',
 '💬 AI Sohbet Penceresini Aç':'💬 KI-Chat-Fenster öffnen',
 '⚡ HIZLI ANALİZ':'⚡ SCHNELLANALYSE',
 '📥 VERİ YÜKLE':'📥 DATEN LADEN',
 '📂 CSV Yükle':'📂 CSV laden',
 /* GNSS */
 'G2V2 + GNSS aktifken konum kayıtları burada görünür':'Positionsdaten erscheinen hier bei aktivem G2V2 + GNSS',
 '🌍 SINIR GEÇİŞLERİ ':'🌍 GRENZÜBERTRITTE ',
 'G2V2 + GNSS ile otomatik sınır geçişleri burada listelenir':'Automatische Grenzübertritte werden hier aufgelistet',
 '🔍 Müfettiş':'🔍 Inspektor',
 'Konum kaydı için: G2V2 kart + GNSS aktif':'Positionsaufzeichnung: G2V2-Karte + GNSS aktiv',
 /* TL */
 '// ÇOK GÜNLÜ ZAMANÇİZELGESİ — AB 561/2006':'// MEHRTÄGIGER ZEITSTRAHL — EG 561/2006',
 'İş:':'Arbeit:', 'Ça':'Mi', 'Şu An':'Jetzt',
 'Yük+İnd':'Laden+Entl.',
 'Toplam Sürüş':'Gesamtfahrt',
 /* FAULT */
 '⚡ ARIZA & OLAY GEÇMİŞİ':'⚡ STÖRUNGS- & EREIGNISPROTOKOLL — PDF S.109-118',
 'Her 3sa sürüş + vardiya + yükleme':'Alle 3h Fahrt + Schichtwechsel + Beladung',
 '🛰 SINIR GEÇİŞLERİ — G2V2':'🛰 GRENZÜBERTRITTE — G2V2',
 /* SUMMARY */
 '📊 DURUM ÖZETİ':'📊 STATUSZUSAMMENFASSUNG',
 'TAKOGRAf VERSİYON':'TACHOGRAPH VERSION',
 'KART NESLİ':'KARTENGEN.',
 'SINIR GEÇİŞİ':'GRENZÜBERT.',
 'YÜK TİPİ':'FRACHTTYP',
 '📋 Günlük Rapor':'📋 Tagesbericht',
 /* MONTHLY PLAN */
 '// Aylık Plan Simülatörü':'// Monatsplan-Simulator',
 'Şubat 2026 Sürüş Planı':'Fahrplan Februar 2026',
 'Günlere tıklayarak o günün zaman çizelgesini ve istatistiklerini görüntüleyin.':
 'Klicken Sie auf Tage, um den Zeitstrahl und die Statistiken des Tages anzuzeigen.',
 'ŞUBAT 2026':'FEBRUAR 2026',
 /* KEYBOARD */
 'Klavye Kısayolları':'Tastaturkürzel',
 '🎓 Simülatör Turunu Başlat':'🎓 Simulator-Tour starten',
 'Tüm kısayollar simülatör alanında odaklanıldığında çalışır.':
 'Alle Kürzel funktionieren, wenn der Simulatorbereich fokussiert ist.',
 /* REGULATIONS */
 "Türkiye'de ticari araç sürücülerine uygulanan çalışma süresi kuralları":
 'Lenk- und Ruhezeitvorschriften für Berufskraftfahrer in der Türkei',
 'İstisna / Not':'Ausnahme / Hinweis',
 'İhlal Sonucu':'Verstoßfolge',
 '2 gün':'2 Tage',
 '10 saate uzatılabilir':'auf 10 Stunden verlängerbar',
 'Para cezası':'Geldstrafe',
 'İhlal + para cezası':'Verstoß + Geldstrafe',
 'Haftalık toplam sürüş ≤56sa.':'Wöchentliche Gesamtlenkzeit ≤56h.',
 'Önceki hafta 56sa → bu hafta max':'Vorwoche 56h → diese Woche max.',
 '(2 hf toplamı ≤90sa).':'(2-Wochen-Summe ≤90h).',
 'Önceki hafta 40sa → bu hafta max':'Vorwoche 40h → diese Woche max.',
 '2 Haftalık Sürüş':'Doppelwochenlenkzeit',
 'Her 2 ardışık haftanın toplamı — önceki+mevcut hafta sürüşü':'Summe je 2 aufeinanderfolgender Wochen — Vor- + aktuelle Woche',
 'Ağır yaptırım':'Schwere Sanktion',
 'Haftalık Din. Zorunluluğu':'Wöchentliche Ruhepflicht',
 'Son haftalık dinlenmeden itibaren':'Ab Ende der letzten Wochenruhe',
 '6 gün (144 saat) içinde':'innerhalb von 6 Tagen (144 Stunden)',
 'yeni haftalık din. başlamalı.':'muss neue Wochenruhe beginnen.',
 'Her 2 ardışık haftada:':'In je 2 aufeinanderfolgenden Wochen:',
 '1 tam + 1 kısaltılmış (≥24sa)':'1 reguläre + 1 reduzierte (≥24h)',
 'Kısaltılmış haftalık dinlenme en az 24 saat olmalı (24sa altı ihlal!).':'Reduzierte Wochenruhe min. 24h (unter 24h = Verstoß!).',
 'Tam haftalık din. ve telafi':'Reguläre Wochen- und Ausgleichsruhe',
 'araçta alınamaz':'darf nicht im Fahrzeug genommen werden',
 'Araç men + ceza':'Fahrzeugstilllegung + Strafe',
 '15 dk + 30 dk bölünebilir (sıra: önce ≥15dk, sonra ≥30dk — ters sıra geçersiz).':
 '15 + 30 Min. aufteilbar (Reihenfolge: zuerst ≥15 Min., dann ≥30 Min. — umgekehrte Reihenfolge ungültig).',
 'Günlük Dinlenme (tam)':'Tägliche Ruhezeit (regulär)',
 'Önceki günlük/haftalık din. bitişinden':'Ab Ende der vorigen täglichen/wöchentlichen Ruhezeit',
 '24 saat içinde':'innerhalb von 24 Stunden',
 'başlamalı. Her iki haftalık periyot arasında 3× 9 saate indirilebilir':'muss beginnen. Kann 3× je Doppelwoche auf 9h reduziert werden',
 '. 10sa uzatılmış günde bile en az 9sa dinlenme zorunlu.':'. Auch am 10h-Tag min. 9h Ruhezeit Pflicht.',
 'Araç men':'Fahrzeugstilllegung',
 'Günlük Dinlenme (kısaltılmış)':'Tägliche Ruhezeit (reduziert)',
 'İki haftalık':'Doppelwöchentlich',
 'dinlenme periyodu arasında maks. 3×':'max. 3× je Ruhezeitraum',
 'kullanılabilir — haftada 3× değil!':'erlaubt — nicht 3× pro Woche!',
 "(günlük için); 4. kullanım ihlal; 9sa'dan az ise geçersiz.":'(täglich); 4. Verwendung = Verstoß; unter 9h ungültig.',
 'Bölünmüş Günlük Dinlenme':'Aufgeteilte tägliche Ruhezeit',
 'Yalnızca':'Nur',
 'günlük dinlenmede uygulanır. 1. bölüm ≥3sa, 2. bölüm ≥9sa — arada aktivite yasak.':
 'bei regulärer Tagesruhe. 1. Teil ≥3h, 2. Teil ≥9h — kein Betrieb dazwischen.',
 'Eksik bölüm sayılmaz':'Unvollständiger Teil zählt nicht',
 'Feribot/tren ≥8sa ise günlük dinlenme orada alınabilir. Bindirme/indirme süresi dahil değil.':
 'Wenn Fähre/Zug ≥8h, kann Tagesruhe dort genommen werden. Ein-/Ausstiegszeit nicht enthalten.',
 '. Kabin veya yataklı bölme koşulu aranmaz.':'. Keine Kabine oder Liegeabteil erforderlich.',
 'Geçerli sayılır':'Zählt als gültig',
 'Çift Sürücü Günlük Din.':'Doppelbesatzung tägl. Ruhe',
 '30 saatlik periyot içinde — pasif sürücü uygunluk modunda sayılır':'Innerhalb des 30-Stunden-Zeitraums — passiver Fahrer im Bereitschaftsmodus',
 'Her 2 ardışık haftada en az 1 tam (≥45sa) + 1 kısaltılmış (≥24sa) VEYA 2 tam.':
 'Je 2 aufeinanderfolgenden Wochen: min. 1 regulär (≥45h) + 1 reduziert (≥24h) ODER 2 regulär.',
 '6×24=144 saat içinde':'innerhalb von 6×24=144 Stunden',
 'başlamalı.':'muss beginnen.',
 '⚠ Araçta alınamaz:':'⚠ Darf nicht im Fahrzeug genommen werden:',
 'Tam haftalık din. ve telafi dinlenmeleri yatak+sanitasyon imkânı olan yerde alınmalı.':
 'Reguläre Wochen- und Ausgleichsruhen müssen an Ort mit Schlafgelegenheit + Sanitäreinrichtungen genommen werden.',
 'Araç men + ağır ceza':'Fahrzeugstilllegung + schwere Strafe',
 ', maks 45sa\'ya kadar. Telafi = 45sa − alınan süre →':'max. bis 45h. Ausgleich = 45h − genommene Zeit →',
 '3. hafta sonuna kadar':'bis Ende der 3. Woche',
 'tek blok halinde ≥9sa başka bir dinlemeye eklenmeli (parçalanamaz!).':
 'als Einzelblock ≥9h an eine andere Ruhezeit angehängt werden (nicht aufteilbar!).',
 'Uluslararası yük taşımacılığında':'Im internationalen Güterverkehr',
 '2 kısaltılmış':'2 reduzierte',
 '1 ardışık':'1 aufeinanderfolgende',
 '45sa+ tam haftalık din. ve telafi dinlenmeleri araç dışı uygun konaklamada alınmalı.':
 '45h+ reguläre Wochen- und Ausgleichsruhen müssen außerhalb des Fahrzeugs genommen werden.',
 'Para cezası + araç men':'Geldstrafe + Fahrzeugstilllegung',
 'Araç feribot/trende ise dinlenme max':'Wenn Fahrzeug auf Fähre/Zug max',
 '; her kesinti ≤1sa. Feribot ≥8h ise tam/kısaltılmış günlük dinlenme bulunabilir.':
 '; jede Unterbrechung ≤1h. Fähre ≥8h kann reguläre/reduzierte Tagesruhe gelten.',
 'Yanlış girişte dinlenme geçersiz':'Falsche Eingabe macht Ruhezeit ungültig',
 'Kontak kapalıyken: DİNLENME (fabrika ayarı, değiştirilebilir). Kontak açıkken: DİĞER İŞ.':
 'Zündung aus: RUHEZEIT (Werkseinstellung, änderbar). Zündung ein: ANDERE ARBEIT.',
 'Ülke Girişi':'Ländereingabe',
 'Vardiya başında ve bitiminde ülke seçilmeli. NUTS0 sınır geçişleri OTOMATİK (G2V2).':
 'Land muss zu Schichtbeginn/-ende ausgewählt werden. NUTS0-Grenzübertritte AUTOMATISCH (G2V2).',
 'Kartsız Sürüş':'Fahren ohne Karte',
 'Kart kayıp/arıza durumunda':'Im Fall von Kartenverlust/-störung',
 '15 takvim günü':'15 Kalendertage',
 'kartsız sürüş mümkün. Her sürüş başı/sonunda günlük çıktı alınmalı. Kart + çıktılar araçta bulundurulmalı.':
 'Fahren ohne Karte möglich. Tagesausdruck bei jedem Fahrtbeginn/-ende. Karte + Ausdrucke im Fahrzeug aufbewahren.',
 'araçta bulundurulmalı (G2V2, Aralık 2024+).':'im Fahrzeug aufzubewahren (G2V2, Dez. 2024+).',
 'Manuel Giriş (Card-Out)':'Manuelle Eingabe (Karte raus)',
 'Kart yokken geçen TÜM süre kart takılınca girilmeli (el yazılı belge YASAK değil).':
 'ALLE Zeit ohne Karte muss eingegeben werden, wenn Karte eingelegt wird.',
 'Hatalı giriş düzeltilemez':'Falsche Eingabe kann nicht korrigiert werden',
 '→ çıktı al, el yazısıyla düzelt, 28 gün sakla':'→ ausdrucken, handschriftlich korrigieren, 28 Tage aufbewahren',
 'Boş bırakılırsa ihlal':'Leer lassen ist ein Verstoß',
 'OUT (Kapsam Dışı)':'OUT (Außerhalb des Geltungsbereichs)',
 'AB dışı ülkeler / muaf araçlar (tarım, orman, ambulans, 3.5t altı uluslararası hariç).':
 'Nicht-EU-Länder / ausgenommene Fahrzeuge (Landwirtschaft, Forst, Krankenwagen).',
 'Kart Veri İndirme':'Kartendaten-Download',
 '28 günde bir':'Alle 28 Tage',
 'İndirme sıklığı:':'Downloadhäufigkeit:',
 '28 günde bir (tüm nesiller).':'Alle 28 Tage (alle Generationen).',
 'Saklama süresi:':'Speicherdauer:',
 '(Aralık 2024+) · G2V1/G1: 28 gün.':'(Dez. 2024+) · G2V1/G1: 28 Tage.',
 '56 günün':'56 Tage',
 'verileri talep edilebilir (uluslararası sefer).':'Daten können angefordert werden (internationale Fahrt).',
 'İndirme: DLK Smart Download Key veya şirket kartıyla doğrudan · .':
 'Download: per DLK Smart Download Key oder Unternehmenskarte direkt · .',
 'VU (Araç Birimi) İndirme':'FG (Fahrzeuggerät) Download',
 '90 günde bir':'Alle 90 Tage',
 'Yığın bellekten şirket kartı ile. G2V2 yığın bellek daha büyük veri tutar.':
 'Aus dem Massenspeicher mit Unternehmenskarte. G2V2-Massenspeicher hält mehr Daten.',
 'Min. 1 yıl':'Min. 1 Jahr',
 'Kart + araç verisi birlikte':'Karten- + Fahrzeugdaten zusammen',
 'Ağır idari ceza':'Schwere Verwaltungsstrafe',
 'Arıza Durumunda':'Im Störungsfall',
 'Takograf arızasında: el yazısıyla AKTİVİTE not al (tarih, saat, tür). İmzalı açıklama gerekli.':
 'Bei Tachographenstörung: AKTIVITÄT handschriftlich festhalten (Datum, Uhrzeit, Art). Unterschriebene Erklärung erforderlich.',
 'tuş ile onayla':'mit Taste bestätigen',
 '(yanıp söner). Mesajlar, .':'(blinkt). Meldungen, PDF S.107-122.',
 'Belgele + onar':'Dokumentieren + reparieren',
 'GNSS Konum Kaydı':'GNSS-Positionsaufzeichnung',
 '(2. Nesil) her 3 saatlik sürüşte konum kaydeder. 3 saatte GNSS yoksa olay tetiklenir.':
 '(2. Gen.) zeichnet alle 3h Fahrzeit eine Position auf. Fehlt GNSS nach 3h, wird Ereignis ausgelöst.',
 '! GNSS sinyali mevcut değil':'! GNSS-Signal nicht verfügbar',
 'olayı tetiklenir. GNSS anteni bağlantısı arızasında':'Ereignis ausgelöst. Bei GNSS-Antennenverbindungsausfall',
 'x Dahili GNSS arızası':'x Interne GNSS-Störung',
 'Olay kaydı':'Ereignis aufgezeichnet',
 'UTC Zaman Kaydı':'UTC-Zeitaufzeichnung',
 'Takograf tüm olayları':'Tachograph records all events',
 'UTC zamanında':'in UTC-Zeit auf',
 'kaydeder. LCD yerel saati gösterir. Türkiye: UTC+3 (+30dk yaz saati).':
 'LCD zeigt Ortszeit an. Türkei: UTC+3 (+30Min. Sommerzeit).',
 'UTC = Yerel saat − (Dilim farkı + Yaz saati)':'UTC = Ortszeit − (Zeitzonendiff. + Sommerzeit)',
 '. Kontrol belgelerinde UTC baz alınır.':'. UTC ist Grundlage für Prüfdokumente.',
 'Sürüş Zamanı Uyarıları':'Lenkzeitwarnungen',
 '4:15 kesintisiz → mola yaklaşıyor (onay gerekli).':'4:15 ununterbrochen → Pause fällig (Bestätigung erforderlich).',
 '1 Sürüş süresi 24h:':'1 Lenkzeitraum 24h:',
 'Günlük/haftalık/2haftalık doldu/yaklaşıyor.':'Täglich/wöchentlich/doppelwöchentlich voll/bevorstehend.',
 '1 Mola zamanı:':'1 Pausenzeit:',
 'Dinlenme zamanı yaklaşıyor (ayarlanabilir ön uyarı).':'Ruhezeit bevorstehend (einstellbare Vorwarnung).',
 'Onaylanmalı':'Muss bestätigt werden',
 'Kayıt zorunlu':'Aufzeichnung Pflicht',
 '! Güvenlik ihlali:':'! Sicherheitsverstoß:',
 'Veri güvenliği bozuldu.':'Datensicherheit verletzt.',
 '! Hareket çakışması:':'! Bewegungskonflikt:',
 'Feribot unutuldu → sensör çelişkisi.':'Fähre vergessen → Sensorkonflikt.',
 '3sa kümülatif sürüşte konum yok.':'Keine Position bei 3h kumulativer Fahrt.',
 '! Kartsız sürüş:':'! Fahren ohne Karte:',
 'Geçerli kart olmadan sürüş.':'Fahren ohne gültige Karte.',
 '! Zaman çakışması:':'! Zeitkonflikt:',
 'Arızalar (x) PDF S.116':'Störungen (x) PDF S.116',
 'x Sensör arızası:':'x Sensorstörung:',
 'Hareket sensörü dahili arıza.':'Interne Störung des Bewegungssensors.',
 'GNSS anteni/devre arızası.':'GNSS-Antennen-/Schaltkreisstörung.',
 'x ITS arızası:':'x ITS-Störung:',
 'Bluetooth bileşeni arızası.':'Bluetooth-Komponentenstörung.',
 'x Dahili DSRC arızası:':'x Interne DSRC-Störung:',
 'DSRC modülü arızası.':'DSRC-Modulstörung.',
 'x Kart arızası:':'x Kartenstörung:',
 'Kart iletişim hatası (temas temizle).':'Kartenkommunikationsfehler (Kontakte reinigen).',
 'Servis zorunlu':'Service erforderlich',
 "'dan itibaren araç içi Bluetooth. Bağlantı için şirket kartı veya PIN: 1234.":
 'Fahrzeuginterne Bluetooth-Verbindung ab . Verbindung per Unternehmenskarte oder PIN: 1234.',
 'ADR Varyantı ':'ADR-Variante ',
 'Patlama tehlikesi olan ortamlarda: Kart yuvaları KAPALI, yazıcı çekmecesi KAPALI.':
 'In explosionsgefährdeten Bereichen: Kartenschächte GESCHLOSSEN, Druckerlade GESCHLOSSEN.',
 'Patlama tehlikesi':'Explosionsgefahr',
 'Şirket Kartı ':'Unternehmenskarte ',
 'Şirket işlemi':'Unternehmensvorgang',
 'Şirket kartı takılınca "Şirket" çalışma moduna geçilir.':'Beim Einlegen der Unternehmenskarte wird in den "Unternehmens"-Betriebsmodus gewechselt.',
 'Yığın bellek indirme, araç plakası/ülke girişi, şirket engelleme, şirket kilidi vb.':
 'Massenspeicher-Download, Kennzeichen/Ländereingabe, Unternehmensverriegelung usw.',
 'Yönetici kullanımı':'Managementnutzung',
 'Çalışma Modları ':'Betriebsarten ',
 'Kart tipine göre':'Je nach Kartentyp',
 'Sürüş (İşletim):':'Fahren (Betrieb):',
 'Sürücü kartı takılı/takısız standart mod.':'Standardmodus mit/ohne Fahrerkarte.',
 'Şirket:':'Unternehmen:',
 'Şirket kartı takılınca otomatik geçiş.':'Automatischer Wechsel beim Einlegen der Unternehmenskarte.',
 'Kontrol:':'Kontrolle:',
 'Kontrol kartı → trafik denetimi.':'Kontrollkarte → Verkehrskontrolle.',
 'Kalibrasyon:':'Kalibrierung:',
 'Servis kartı → yetkili servis işlemleri.':'Servicekarte → autorisierte Servicevorgänge.',
 ' Çalışma modları genel bakış ().':' Übersicht der Betriebsarten (PDF S. 29).',
 'Otomatik':'Automatisch',
 /* DUTIES */
 'O ana kadar kaydedilmiş aktiviteleri takograf kağıdına veya dijital sürücü kartına işleyin.':
 'Bis dahin aufgezeichnete Aktivitäten auf dem Schaublatt oder der digitalen Fahrerkarte festhalten.',
 'Önceki 28 günün kayıtlarını (kağıt veya dijital çıktı) araçta bulundurun.':
 'Aufzeichnungen der letzten 28 Tage (Papier oder Digitalausdruck) im Fahrzeug mitführen.',
 'Ülke değiştirince analog takografta saat dilimini ve ülke kodunu güncelleyin.':
 'Beim Länderwechsel Zeitzone und Ländercode im analogen Tachographen aktualisieren.',
 'Araç değiştiğinde sürücü kartını yanında taşımak':'Bei Fahrzeugwechsel Fahrerkarte mitführen',
 'Her aktivite değişiminde takograf modunu güncellemek (sürüş / dinlenme / diğer iş).':
 'Tachographenmodus bei jedem Aktivitätswechsel aktualisieren (Fahren/Ruhe/andere Arbeit).',
 'Yükleme–indirme aktivitelerini "Diğer İş" veya alt modda kaydetmek':
 'Be-/Entladeaktivitäten als "Andere Arbeit" oder im Untermodus aufzeichnen',
 'Çift sürücülü araçta aktif olmayan sürücü kartını "Uygunluk" moduna almak':
 'Im Doppelbesatzungsfahrzeug inaktive Fahrerkarte in den "Bereitschafts"-Modus setzen',
 'Cihaz arızasında el yazısıyla kayıt tutmak':'Bei Geräteausfall handschriftliche Aufzeichnungen führen',
 'Çalışma süresi bitiminde kartı cihazdan çıkarmak':'Karte am Ende der Arbeitszeit aus dem Gerät entnehmen',
 'Arıza 1 haftadan uzun sürecekse en kısa zamanda tamir ettirmek':
 'Bei Störung länger als 1 Woche so bald wie möglich reparieren lassen',
 'Çift sürücülü seferlerde sürücü değişiminde hem kağıt hem kartı değiştirmek':
 'Bei Doppelbesatzungsfahrten beim Fahrerwechsel sowohl Papier als auch Karte wechseln',
 'İlk denetimde tüm kayıtları yetkililere ibraz etmek':'Bei erster Kontrolle alle Aufzeichnungen den Behörden vorlegen',
 /* SYMBOLS */
 'Sürücünün zamanını serbestçe kullandığı mola veya dinlenme periyodu.':
 'Pause oder Ruhezeit, in der der Fahrer die Zeit frei nutzt.',
 'Manuel seçilmezse takograf "Diğer İş" kaydeder.':
 'Wenn nicht manuell ausgewählt, zeichnet der Tachograph "Andere Arbeit" auf.',
 'Araç hareket halindeyken tekerlekler dönünce':'Wenn sich das Fahrzeug bewegt und Räder drehen',
 'kaydedilir. Sürücünün direksiyon başında geçirdiği toplam süre.':
 'aufgezeichnet. Gesamtzeit des Fahrers am Steuer.',
 'Yükleme, boşaltma, temizlik vb. araç dışı çalışma. Sürüş dışı aktivite olarak':
 'Be-, Entladung, Reinigung usw. Nicht-Fahrarbeit als',
 'otomatik olarak bu moda geçer.':'wechselt automatisch in diesen Modus.',
 'Hazır / Uygunluk':'Bereit / Bereitschaft',
 'Sürücü göreve hazır ama aktif çalışmıyor. Tren/feribot beklemesi, sınır geçişi veya':
 'Fahrer ist einsatzbereit, aber nicht aktiv tätig. Warten auf Zug/Fähre, Grenzübergang oder',
 'çift sürücüde pasif sürücü':'im Doppelbesatz passiver Fahrer',
 'bu modda olmalı.':'muss in diesem Modus sein.',
 /* SCENARIOS */
 '🚛 Normal Sürüş Günü (9sa)':'🚛 Normaler Fahrtag (9h)',
 '⬆️ Uzatılmış Gün (10sa) — Haftada 2×':'⬆️ Verlängerter Tag (10h) — 2×/Woche',
 '✂️ Bölünmüş Mola (15+30dk)':'✂️ Geteilte Pause (15+30Min.)',
 '🛏️ Bölünmüş Günlük Dinlenme (3sa+9sa)':'🛏️ Geteilte Tagesruhezeit (3h+9h)',
 '🚢 Ro-Ro / Tren: 2 Bölümlü Dinlenme':'🚢 Ro-Ro / Zug: Zweigeteilte Ruhezeit',
 '👥 Çift Sürücü — 30 Saatlik Periyot':'👥 Doppelbesatzung — 30-Stunden-Zeitraum',
 '⚠️ Mola Gerekli — 4s15dk':'⚠️ Pause erforderlich — 4h15Min.',
 '🚨 Limit İhlali — 10s30dk':'🚨 Limitüberschreitung — 10h30Min.',
 '🌍 Uzun Mesafe — İstanbul→Münih':'🌍 Langstrecke — Istanbul→München',
 '⛴ Feribot Dinlenmesi (Madde 9)':'⛴ Fährenruhe (Artikel 9)',
 '✏ Manuel Giriş Pratiği':'✏ Manuelle Eingabe üben',
 '🚗 Hız Aşımı & Olay Kaydı':'🚗 Geschwindigkeitsüberschreitung & Ereignisprotokoll',
 '🏢 Şirket Kartı — Veri İndirme ':'🏢 Unternehmenskarte — Datenabruf ',
 '⚡ GNSS Arızası & Olay Akışı ':'⚡ GNSS-Störung & Ereignisablauf ',
 '☢ ADR Varyantı — Tehlikeli Madde ':'☢ ADR-Variante — Gefahrgut ',
 '🚔 Trafik Denetimi — G2V2 Kontrol Kartı ':'🚔 Verkehrskontrolle — G2V2-Kontrollkarte ',
 '🛰 G2V2 Konum Kaydı & OSNMA ':'🛰 G2V2-Positionsaufzeichnung & OSNMA ',
 '🌍 Çok Ülkeli Sefer — Otomatik Sınır ':'🌍 Mehrländerfahrt — Autom. Grenze ',
 '🚨 GNSS Spoofing — !? GNSS Anormal ':'🚨 GNSS-Spoofing — !? GNSS-Anomalie ',
 '📡 DSRC Beacon — Uzaktan Denetim ':'📡 DSRC-Beacon — Fernüberwachung ',
 '🔄 Kabotaj Takibi 1072/2009':'🔄 Kabotage-Verfolgung 1072/2009',
 '⚙ 2 Yillik Kalibrasyon ':'⚙ 2-Jahres-Kalibrierung ',
 '🚐 Hafif Arac 2.5-3.5t — Temmuz 2026':'🚐 Leichtfahrzeug 2,5-3,5t — Juli 2026',
 '📝 Egitim Quizi — 15 Soru':'📝 Schulungsquiz — 15 Fragen',
 '📅 Haftalik Planlama & Kalan Sure Analizi':'📅 Wochenplanung & Restzeitanalyse',
 '⚫ Takograf Menü Yapısı ':'⚫ Tachograph Menüstruktur ',
 '🔄 Ekip Degisimi — 3 Durum ':'🔄 Besatzungswechsel — 3 Zustände ',
 '🚚 Filo Yonetici Paneli':'🚚 Flottenmanager-Panel',
 '📡 Telematik & CAN Bus ':'📡 Telematik & CAN-Bus ',
 '⚠️ İhlal 1 — Molasız 5 Saat Sürüş':'⚠️ Verstoß 1 — 5h Fahrt ohne Pause',
 '⏰ İhlal 2 — 9sa Günlük Limiti Aşmak':'⏰ Verstoß 2 — 9h-Tageslimit überschritten',
 '💤 İhlal 3 — Yetersiz Günlük Dinlenme (8sa)':'💤 Verstoß 3 — Unzureichende Tagesruhe (8h)',
 '📅 İhlal 4 — 24sa Penceresini Kaçırmak':'📅 Verstoß 4 — 24h-Fenster verpasst',
 '🔄 İhlal 5 — Molayı Kesmek (20dk)':'🔄 Verstoß 5 — Pause unterbrochen (20Min.)',
 '💼 İhlal 6 — İş Süresini Mola Saymak':'💼 Verstoß 6 — Arbeitszeit als Pause zählen',
 '⬆️ İhlal 7 — 10sa Uzatmayı 3. Kez Kullanmak':'⬆️ Verstoß 7 — 10h-Verlängerung zum 3. Mal',
 '🗓️ İhlal 8 — Haftalık Dinlenmeyi Geciktirmek':'🗓️ Verstoß 8 — Wochenruhezeit verzögert',
 '📆 İhlal 9 — 56sa Haftalık Limit Aşımı':'📆 Verstoß 9 — 56h-Wochenlimit überschritten',
 '🔁 İhlal 10 — Telafi Borcunu Ödemeden Devam':'🔁 Verstoß 10 — Ohne Ausgleich weiterfahren',
 '🌍 TR→DE: 7 Günlük Uluslararası Sefer':'🌍 TR→DE: 7-Tage-Internationale Fahrt',
 '🔍 Trafik Denetimi — Belge Kontrolü':'🔍 Verkehrskontrolle — Dokumentenprüfung',
 /* SCENARIO BADGES */
 'İHLAL':'VERSTOSS', 'FERİBOT':'FÄHRE', 'ŞİRKET':'UNTERNEHMEN',
 'DENETİM':'KONTROLLE', 'SERVİS':'SERVICE', 'YENİ':'NEU',
 'EĞİTİM':'SCHULUNG', 'ARAÇ':'WERKZEUG', 'FİLO':'FLOTTE',
 'ULUSLARARASI':'INTERNAT.',
 /* FOOTER */
 'TACHOTR — Türkiye Dijital Takograf Rehberi & Simülatörü':
 'TACHOTR — Türkei Digitaler Tachograph Leitfaden & Simulator',
 'AB Tüzük':'EU-Verordnung',
 '— Karayolları Trafik Kanunu':'— Straßenverkehrsgesetz',
 /* KEYBOARD */
 'Klavye Kısayolları':'Tastaturkürzel',
 '🎓 Simülatör Turunu Başlat':'🎓 Simulator-Tour starten',
 'Diğer İş':'Andere Arbeit',
 'Uyarı Onayla':'Warnung bestätigen',
 'Manuel Giriş':'Manuelle Eingabe',
 'Rapor Yazdır':'Bericht drucken',
 'Kapat / İptal':'Schließen / Abbrechen',
 'Ülke Seç':'Land wählen',
 'Ekip Değişimi':'Besatzungswechsel',
 'Tüm kısayollar simülatör alanında odaklanıldığında çalışır.':
 'Alle Kürzel funktionieren, wenn der Simulatorbereich fokussiert ist.',
 }
};

/* ── DOM Traverse Çeviri Motoru ── */
let _translationObserver = null;

function _applyTranslations(){
 const lang = _currentLang;
 /* data-i18n attribute'lu elementler */
 document.querySelectorAll('[data-i18n]').forEach(el => {
 const key = el.getAttribute('data-i18n');
 const val = (TRANSLATIONS[lang]||TRANSLATIONS.tr)[key];
 if(val && val !== key){
 if(el.tagName === 'INPUT') el.placeholder = val;
 else el.textContent = val;
 }
 });

 /* Tam sayfa DOM traverse */
 if(lang === 'tr'){
 /* TR: orijinal HTML'e dön — sayfa yeniden yükle */
 const orig = sessionStorage.getItem('_origHTML');
 if(orig){
 /* Sadece body içini güncelle */
 _restoreOriginalText();
 }
 return;
 }

 const dict = FULL_TRANSLATIONS[lang];
 if(!dict) return;

 /* İlk çağrıda orijinal metinleri sakla */
 if(!window._origTextNodes){
 window._origTextNodes = new Map();
 }

 const walker = document.createTreeWalker(
 document.body,
 NodeFilter.SHOW_TEXT,
 { acceptNode(n){
 const p = n.parentElement;
 if(!p) return NodeFilter.FILTER_REJECT;
 if(['SCRIPT','STYLE','NOSCRIPT'].includes(p.tagName)) return NodeFilter.FILTER_REJECT;
 const txt = n.textContent.trim();
 if(txt.length < 2) return NodeFilter.FILTER_REJECT;
 return NodeFilter.FILTER_ACCEPT;
 }}
 );

 const nodes = [];
 let node;
 while(node = walker.nextNode()) nodes.push(node);

 nodes.forEach(n => {
 const orig = n.textContent;
 const trimmed = orig.trim();
 /* Orijinal metni sakla (ilk kez) */
 if(!window._origTextNodes.has(n)){
 window._origTextNodes.set(n, orig);
 }
 /* Tam eşleşme dene */
 let translated = dict[trimmed];
 /* Tam eşleşme yoksa prefix eşleşme dene (ilk 40 karakter) */
 if(!translated && trimmed.length > 10){
 const prefix = trimmed.slice(0, 40);
 for(const [k,v] of Object.entries(dict)){
 if(k.slice(0,40) === prefix){
 translated = v;
 break;
 }
 }
 }
 /* Hâlâ bulunamadıysa kısa string eşleşme dene (ilk 20 karakter) */
 if(!translated && trimmed.length > 5){
 const short = trimmed.slice(0, 20);
 for(const [k,v] of Object.entries(dict)){
 if(k.slice(0,20) === short && k.length > 15){
 translated = v;
 break;
 }
 }
 }
 if(translated){
 n.textContent = orig.replace(trimmed, translated);
 }
 });
}

function _restoreOriginalText(){
 /* TR'ye dönerken orijinal metinleri geri yükle */
 if(!window._origTextNodes) return;
 window._origTextNodes.forEach((orig, node) => {
 if(node.parentElement) node.textContent = orig;
 });
 window._origTextNodes.clear();
}

/* setLanguage — tam çeviri (tek tanım burada, üstteki stub kaldırıldı) */
function setLanguage(lang){
 if(lang === 'tr'){
 _restoreOriginalText();
 _currentLang = 'tr';
 localStorage.setItem('tachotr_lang', 'tr');
 _applyTranslations(); /* data-i18n için */
 ['tr','en','de'].forEach(l=>{
 const btn = document.getElementById('lang-btn-'+l);
 if(!btn) return;
 btn.style.background = l==='tr'?'var(--blu-dim)':'transparent';
 btn.style.borderColor = l==='tr'?'var(--blu)':'transparent';
 btn.style.color = l==='tr'?'var(--blu)':'var(--dim)';
 btn.style.fontWeight = l==='tr'?'700':'400';
 });
 if(typeof doLog==='function') doLog('🌍 Dil: Türkçe','ok');
 if(typeof updateLCD==='function') setTimeout(updateLCD, 50);
 /* Tema butonu TR'ye çevir */
 const themeBtn0 = document.getElementById('theme-toggle-btn');
 if(themeBtn0) themeBtn0.textContent = _currentTheme==='dark' ? '☀ Açık' : '🌙 Koyu';
 /* Nav TR'ye döndür */
 const anchors0 = document.querySelectorAll('nav ul a');
 anchors0.forEach(a => {
 const href = a.getAttribute('href');
 if(href==='#sim') a.textContent = 'Simülasyon';
 if(href==='#aylik') a.textContent = 'Aylık Plan';
 if(href==='#mevzuat') a.textContent = 'Mevzuat';
 });
 return;
 }
 /* EN veya DE için önce TR'ye dön sonra yeni dili uygula */
 if(_currentLang !== 'tr') _restoreOriginalText();
 _currentLang = lang;
 localStorage.setItem('tachotr_lang', lang);
 _applyTranslations();
 ['tr','en','de'].forEach(l=>{
 const btn = document.getElementById('lang-btn-'+l);
 if(!btn) return;
 const active = l === lang;
 btn.style.background = active?'var(--blu-dim)':'transparent';
 btn.style.borderColor = active?'var(--blu)':'transparent';
 btn.style.color = active?'var(--blu)':'var(--dim)';
 btn.style.fontWeight = active?'700':'400';
 });
 if(typeof doLog==='function') doLog('🌍 Language: '+(lang==='en'?'English':'Deutsch'),'ok');
 /* Dinamik metinleri güncelle */
 if(typeof updateLCD==='function') setTimeout(updateLCD, 50);
 /* Tema buton metnini güncelle */
 const themeBtn2 = document.getElementById('theme-toggle-btn');
 const themeLabels2 = {en:['🌙 Dark','☀ Light'], de:['🌙 Dunkel','☀ Hell']};
 if(themeBtn2 && themeLabels2[lang]){
 themeBtn2.textContent = _currentTheme==='dark' ? themeLabels2[lang][0] : themeLabels2[lang][1];
 }
 /* Nav linkleri doğrudan güncelle */
 const navLinks = {
 en: {sim:'Simulation', aylik:'Monthly Plan', mevzuat:'Regulations'},
 de: {sim:'Simulation', aylik:'Monatsplan', mevzuat:'Vorschriften'}
 };
 if(navLinks[lang]){
 const anchors = document.querySelectorAll('nav ul a');
 anchors.forEach(a => {
 const href = a.getAttribute('href');
 if(href==='#sim') a.textContent = navLinks[lang].sim;
 if(href==='#aylik') a.textContent = navLinks[lang].aylik;
 if(href==='#mevzuat') a.textContent = navLinks[lang].mevzuat;
 });
 }
}

/* _tr() stub — dil özelliği kapalıyken Türkçe döndür */
if(typeof _tr === 'undefined'){
 function _tr(s){ return s; }
}


/* S8-4: Boş Durum Şablonu — tutarlı format */
function emptyState(icon, title, hint){
 return `<div style="text-align:center;padding:1.5rem 1rem;color:var(--dim);">
 <div style="font-size:1.5rem;margin-bottom:.5rem;opacity:.5;">${icon}</div>
 <div style="font-size:.7rem;color:var(--txt2);margin-bottom:.25rem;font-weight:500;">${title}</div>
 ${hint ? `<div style="font-size:.55rem;color:var(--dim);">${hint}</div>` : ''}
 </div>`;
}


/* S9b: Quick araç şeridi */
function _renderQuickStrip(){
 const bar = document.getElementById('quick-bar');
 if(!bar) return;

 /* Toggle butonlar: iconOn/iconOff + labelOn/labelOff ile iki durumu da net göster */
 const GROUPS = [
 { label:'GÜNLÜK', tools:[
 { iconOff:'🛏', iconOn:'🛏', labelOff:'9sa Mod', labelOn:'9sa ✓', fn:"toggleReducedRest()",
 get active(){ return typeof S!=='undefined'&&S.useReducedRest&&!window._ktyMode; } },
 { iconOff:'⬆️', iconOn:'⬆️', labelOff:'10sa Uzat', labelOn:'10sa ✓', fn:"extendDay()",
 get active(){ return typeof S!=='undefined'&&S.dailyMax===600; } },
 { iconOff:'✕', labelOff:'Uzat İptal', fn:"cancelExtendDay()" },
 { iconOff:'↺', labelOff:'Sıfırla', fn:"resetSim()", warn:true },
 ]},
 { label:'ARAÇ', tools:[
 { iconOff:'👥', iconOn:'👤', labelOff:'Çift Sürücü', labelOn:'Tek Sürücü', fn:"toggleDoubleDriver()",
 get active(){ return typeof S!=='undefined'&&S.doubleDriver; } },
 { iconOff:'⛴', iconOn:'⛴', labelOff:'Feribot', labelOn:'⛴ Aktif', fn:"toggleFerry()",
 get active(){ return typeof S!=='undefined'&&S.ferryMode; } },
 { iconOff:'🌍', iconOn:'🌍', labelOff:'OUT', labelOn:'OUT ✓', fn:"toggleOutMode()",
 get active(){ return typeof S!=='undefined'&&S.outMode; } },
 { iconOff:'🚐', iconOn:'🚐', labelOff:'Hafif Araç', labelOn:'Hafif ✓', fn:"toggleLightVehicle()",
 get active(){ return typeof S!=='undefined'&&S.lightVehicleMode; } },
 ]},
 { label:'KTY/AB', tools:[
 { iconOff:'🇹🇷', iconOn:'🇪🇺', labelOff:'KTY\'ye Geç', labelOn:'AB\'ye Geç', fn:"toggleKTYMode()",
 get active(){ return typeof window._ktyMode!=='undefined'&&window._ktyMode; } },
 { iconOff:'🇹🇷', labelOff:'KTY Protokol', fn:"openKTYProtocol()" },
 { iconOff:'₺', labelOff:'KTY Ceza', fn:"openKTYFineTable()" },
 ]},
 { label:'BAĞLANTI', tools:[
 { iconOff:'📶', iconOn:'📶', labelOff:'BT Kapat', labelOn:'BT Açık', fn:"toggleBluetooth()",
 get active(){ return typeof S!=='undefined'&&S.bluetoothOn; } },
 { iconOff:'📍', iconOn:'📍', labelOff:'GNSS Off', labelOn:'GNSS On', fn:"toggleGNSS()",
 get active(){ return typeof S!=='undefined'&&S.gnssOk; } },
 { iconOff:'📡', iconOn:'📡', labelOff:'DSRC Off', labelOn:'DSRC On', fn:"toggleDSRC()",
 get active(){ return typeof S!=='undefined'&&S.dsrcEnabled; } },
 { iconOff:'🛰', iconOn:'🛰', labelOff:'OSNMA Off', labelOn:'OSNMA On', fn:"toggleOSNMA()",
 get active(){ return typeof S!=='undefined'&&S.osnmaActive; } },
 ]},
 { label:'AYARLAR', tools:[
 { iconOff:'🌍', labelOff:'Ülke', fn:"openCountryDlg()" },
 { iconOff:'🕐', labelOff:'UTC', fn:"openUTCMenu()" },
 { iconOff:'🚦', labelOff:'Hız Lim.', fn:"openSpeedLimit()" },
 { iconOff:'☢', iconOn:'☢', labelOff:'ADR Off', labelOn:'ADR On', fn:"toggleADR()",
 get active(){ return typeof S!=='undefined'&&S.adrMode; } },
 { iconOff:'🏢', iconOn:'🏢', labelOff:'Şirket', labelOn:'Şirket ✓', fn:"toggleCompany()",
 get active(){ return typeof S!=='undefined'&&S.companyMode; } },
 { iconOff:'📦', labelOff:'Yük Tipi', fn:"openCargoTypeDlg()" },
 ]},
 { label:'RAPORLAR', tools:[
 { iconOff:'📋', labelOff:'Rapor', fn:"printReport()" },
 { iconOff:'📥', labelOff:'CSV', fn:"importCSV()" },
 { iconOff:'📊', labelOff:'Müfettiş', fn:"exportInspectorReport()" },
 { iconOff:'🔍', labelOff:'Müf. Modu', fn:"openInspectorMode()" },
 { iconOff:'🗓️', labelOff:'Haftalık', fn:"openPlanWizard()" },
 { iconOff:'🤖', labelOff:'AI', fn:"openAIChat()" },
 { iconOff:'✏', labelOff:'Manuel', fn:"toggleManual()" },
 ]},
 ];

 const btnHTML = (t) => {
 const isActive = t.active || false;
 const isWarn = t.warn || false;
 const isToggle = !!(t.iconOn || t.labelOn);
 const icon = isActive ? (t.iconOn||t.iconOff) : t.iconOff;
 const label = isActive ? (t.labelOn||t.labelOff) : t.labelOff;
 const bg = isActive ? 'rgba(34,197,94,.22)' : isWarn ? 'rgba(239,68,68,.08)' : 'rgba(0,0,0,.35)';
 const bc = isActive ? '#4ade80' : isWarn ? 'rgba(239,68,68,.5)' : 'var(--LD)';
 const col = isActive ? '#4ade80' : isWarn ? 'var(--LR)' : 'var(--dim)';
 const dot = isActive
 ? `<span style="width:5px;height:5px;border-radius:50%;background:#4ade80;
 box-shadow:0 0 5px #4ade80;display:block;flex-shrink:0;"></span>`
 : isToggle
 ? `<span style="width:5px;height:5px;border-radius:50%;background:var(--LD);
 display:block;flex-shrink:0;opacity:.4;"></span>`
 : '';
 return `<button onclick="${t.fn}" aria-label="${label}" title="${label}"
 data-fn="${t.fn}" data-active="${isActive}" data-warn="${isWarn}"
 style="flex-shrink:0;scroll-snap-align:start;min-width:56px;height:50px;
 background:${bg};border:1px solid ${bc};color:${col};border-radius:4px;
 cursor:pointer;font-family:var(--M);display:flex;flex-direction:column;
 align-items:center;justify-content:center;gap:1px;padding:3px 4px;
 transition:background .1s,border-color .1s;"
 onmouseover="const a=this.dataset.active==='true',w=this.dataset.warn==='true';
 this.style.background='rgba(168,212,48,.14)';
 this.style.borderColor=a?'#86efac':w?'var(--LR)':'var(--LF)';"
 onmouseout="const a=this.dataset.active==='true',w=this.dataset.warn==='true';
 this.style.background=a?'rgba(34,197,94,.22)':w?'rgba(239,68,68,.08)':'rgba(0,0,0,.35)';
 this.style.borderColor=a?'#4ade80':w?'rgba(239,68,68,.5)':'var(--LD)';">
 <span style="font-size:.85rem;line-height:1;${isActive?'filter:drop-shadow(0 0 3px #4ade80)':''}">${icon}</span>
 <span style="font-size:.37rem;white-space:nowrap;letter-spacing:.2px;max-width:52px;
 overflow:hidden;text-overflow:ellipsis;">${label}</span>
 ${dot}
 </button>`;
 };

 const sepHTML = (label) =>
 `<div style="flex-shrink:0;display:flex;align-items:center;padding:0 2px;gap:2px;">
 <div style="width:1px;background:var(--LD);height:30px;opacity:.4;"></div>
 <span style="font-family:var(--M);font-size:.32rem;color:var(--dim);
 writing-mode:vertical-lr;transform:rotate(180deg);
 letter-spacing:.4px;opacity:.5;">${label}</span>
 </div>`;

 bar.innerHTML = GROUPS.map((g,i) =>
 (i>0 ? sepHTML(g.label) : '') + g.tools.map(btnHTML).join('')
 ).join('');
}


function toggleOutMode(){ toggleOut(); }
function toggleManual(){ toggleManualPanel(); }
function openCountryDlg(){ showCountryDialog(); }
function openSpeedLimit(){ showSpeedLimitDialog(); }
function openCargoTypeDlg(){ showCargoTypeDialog(); }
function toggleLightVehicle(){
 if(S.lightVehicleMode){
 S.lightVehicleMode=false; S.dailyMax=540;
 doLog('🚗 Hafif araç modu kapatıldı','ok');
 } else {
 showLightVehicleInfo();
 }
 updateLCD();
}
function toggleCompany(){
 if(S.companyMode) exitCompanyMode();
 else enterCompanyMode();
}
function openUTCMenu(){
 const existing=document.getElementById('utc-dlg');
 if(existing){existing.remove();return;}
 const dlg=document.createElement('div');
 dlg.id='utc-dlg';
 dlg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--s2);border:1px solid var(--blu);border-radius:8px;padding:16px 20px;z-index:9999;min-width:200px;font-family:var(--M);box-shadow:0 8px 32px #000a;';
 dlg.innerHTML=`<div style="color:var(--blue-light);font-size:.875rem;margin-bottom:10px">🕐 UTC OFSETİ</div>
<div style="font-size:.6rem;color:var(--dim);margin-bottom:8px">Türkiye UTC+3 (kış) / UTC+3 (yaz)</div>
<select id="dlg-utc" style="width:100%;background:var(--s1);color:var(--txt);border:1px solid var(--bdr);border-radius:4px;padding:6px;font-size:.75rem;margin-bottom:10px;font-family:var(--M);">
 <option value="-720">UTC-12</option><option value="-600">UTC-10</option>
 <option value="-480">UTC-8</option><option value="-420">UTC-7</option>
 <option value="-360">UTC-6</option><option value="-300">UTC-5</option>
 <option value="-240">UTC-4</option><option value="-180">UTC-3</option>
 <option value="-120">UTC-2</option><option value="-60">UTC-1</option>
 <option value="0">UTC+0</option><option value="60">UTC+1 (CET)</option>
 <option value="120">UTC+2 (EET)</option>
 <option value="180" selected>UTC+3 (TRT/MSK)</option>
 <option value="240">UTC+4</option><option value="300">UTC+5</option>
 <option value="360">UTC+6</option>
</select>
<div style="display:flex;gap:8px;justify-content:flex-end;">
 <button onclick="document.getElementById('utc-dlg').remove()" style="padding:4px 12px;background:var(--bdr);color:var(--slate);border:none;border-radius:4px;cursor:pointer;font-size:.75rem;">İptal</button>
 <button onclick="S.utcOffsetMin=parseInt(document.getElementById('dlg-utc').value);document.getElementById('utc-dlg').remove();doLog('✓ UTC ofseti güncellendi: '+S.utcOffsetMin+' dk','ok');updateLCD();" style="padding:4px 12px;background:var(--blue-dark);color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:.75rem;">Uygula</button>
</div>`;
 document.body.appendChild(dlg);
}


function toggleOSNMA(){
 S.osnmaActive = !S.osnmaActive;
 const led = document.getElementById('osnma-led');
 if(led){ led.className = 'lcd-led ' + (S.osnmaActive ? 'on' : 'off'); }
 doLog(S.osnmaActive ? '🛰 OSNMA Galileo doğrulama AKTİF' : '🛰 OSNMA devre dışı','ok');
 localStorage.setItem('tachotr_osnma', S.osnmaActive ? '1' : '0');
 updateOSNMAStatus();
}
function toggleDSRC(){
 simulateDSRCBeacon();
 if(S.cardGen==='G2V2'){
   doLog('📡 DSRC UZAKTAN DENETİM: ITS zonuna girildi.','ok');
   doLog('   G2V2 kart (56gün) denetçiye iletildi — araç durdurmaya gerek yok.');
   if(S.logs.some(l=>l.type==='err')) doLog('⚠ DENETİM: Logda ihlal var — araç kontrole alınabilir!','err');
   else doLog('✓ Denetim tamam — ihlal yok.');
 } else {
   doLog('📡 DSRC: '+S.cardGen+' — uzaktan aktarım yok. Fiziksel denetim gerekli.','warn');
 }
}



function toggleReducedRest(){
 if(window._ktyMode){
   doLog('✗ KTY modunda 9sa kısaltılmış izni YOKTUR — 11sa TAM zorunlu.','err');
   S.useReducedRest = false; /* zorla kapat */
   _renderQuickStrip();
   return;
 }
 S.useReducedRest = !S.useReducedRest;
 const rem = 3 - (S.splitRestCount||0);
 if(S.useReducedRest){
 doLog(`🛏 9sa KISALTILMIŞ dinlenme modu AKTİF — hak: ${rem}/3 kaldı. newDay() 9sa uygular.`,'ok');
 } else {
 doLog('🛏 11sa TAM dinlenme modu AKTİF. newDay() 11sa uygular.','ok');
 }
 _renderQuickStrip();
}


/* G3: Madde 12 — Acil durum esnekliği */
function activateArticle12(){
 if(S.article12Used){
   doLog('ℹ Md.12 bu periyotta zaten kullanıldı — 3 hafta içinde telafi gerekli.','warn');
   return;
 }
 const remDaily  = Math.max(0, S.dailyMax - S.dailyDrv);
 const remWeekly = Math.max(0, getWeeklyMax() - S.weeklyDrv);
  if(S.dailyDrv < 480 && S.weeklyDrv < getWeeklyMax()-120){
   doLog('ℹ Md.12 yalnızca limit yakınında kullanılabilir (60dk içinde).','warn');
   return;
 }
 /* Günlük +60dk veya haftalık +120dk */
 const extension = remWeekly <= 60 ? 120 : 60;
 S.dailyMax = Math.min(S.dailyMax + extension, 660);
 S.article12Used = true;
 S.article12Min  = S.simMin;
 doLog(`✓ MADDE 12 ESNEKLIĞI AKTİF: +${extension}dk limit uzatması.`,'ok');
 doLog('  Kural: Güvenli yere veya işveren merkezine ulaşmak için kullanılabilir.');
 doLog('  Zorunluluk: Bu uzatma 3 haftalık periyot sonunda telafi edilmeli.');
 doLog('  Kayıt: Takograf yığın belleğine otomatik yazılır.');
 updateLCD();
}


/* G4: Servis Kartı Modu */
function openServiceCardMode(){
  const existing = document.getElementById('service-dlg');
  if(existing){ existing.remove(); exitServiceMode(); return; }

  S.serviceMode = true;
  const badge = document.getElementById('opmode-badge');
  if(badge){ badge.textContent='🔧 SERVİS'; badge.className='lcd-opmode';
    badge.style.color='#f59e0b'; badge.style.borderColor='#f59e0b'; badge.style.background='rgba(245,158,11,.08)'; }
  const devBrand = document.getElementById('dev-brand-lbl');
  if(devBrand) devBrand.textContent='🔧 SERVİS KARTI — Kalibrasyon & Bakım Modu';

  const lastCal = S.lastCalibration ? simTime() : 'Kayıt yok';
  const nextCal = S.calibrationDue ? hm(Math.max(0, S.calibrationDue - S.simMin)) + ' kaldı' : '⚠ Tanımsız';
  const calDays = S.lastCalibration ? Math.floor((S.simMin-(S.lastCalibration||0))/1440) : null;

  doLog('🔧 SERVİS KARTI MODU AKTİF','ok');
  doLog(' • Kalibrasyon zorunluluğu: Her 2 yılda bir (Türkiye: her yıl bakım + 2 yılda kalibrasyon)');
  doLog(' • k-faktörü: '+S.kFactor+' imp/km | Lastik çevresi: '+S.tyreCircumference+' mm');
  if(calDays===null){
    doLog(' ⚠ Kalibrasyon tarihi kayıt yok — ilk kalibrasyon gerekli!','err');
  } else if(calDays > 720){
    doLog(' ⚠ Kalibrasyon süresi dolmuş! '+calDays+' gün geçti (limit: 720 gün)','err');
  } else {
    doLog(' ✓ Son kalibrasyon: '+calDays+' gün önce ('+Math.round(calDays/30)+'. ay)','ok');
  }

  const dlg = document.createElement('div');
  dlg.id = 'service-dlg';
  dlg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--s2);border:1px solid #f59e0b;border-radius:8px;padding:16px;z-index:9999;min-width:280px;max-width:340px;font-family:var(--M);box-shadow:0 8px 32px #000a;';
  dlg.innerHTML = `
    <div style="color:#f59e0b;font-size:.875rem;margin-bottom:12px;font-weight:700;">🔧 SERVİS KARTI — Kalibrasyon</div>
    <div style="display:grid;gap:8px;font-size:.65rem;">
      <div style="background:rgba(0,0,0,.3);border:1px solid var(--LD);border-radius:4px;padding:8px;">
        <div style="color:var(--dim);margin-bottom:4px;">KALIBRASYON DURUMU</div>
        <div style="color:${calDays===null||calDays>720?'var(--LR)':'var(--LF)'}">
          ${calDays===null ? '⚠ Kalibrasyon yok' : calDays>720 ? '⚠ Süresi dolmuş ('+calDays+' gün)' : '✓ '+calDays+' gün önce'}
        </div>
        <div style="color:var(--dim);font-size:.55rem;margin-top:2px;">Zorunluluk: Her 2 yılda (730 gün)</div>
      </div>
      <div style="background:rgba(0,0,0,.3);border:1px solid var(--LD);border-radius:4px;padding:8px;">
        <div style="color:var(--dim);margin-bottom:4px;">ARAÇ PARAMETRELERİ</div>
        <div>k-faktörü: <span style="color:var(--LF)">${S.kFactor} imp/km</span></div>
        <div>Lastik çevresi: <span style="color:var(--LF)">${S.tyreCircumference} mm</span></div>
        <div>Hız sınırı: <span style="color:var(--LF)">${S.speedLimit} km/h</span></div>
      </div>
      <div style="background:rgba(0,0,0,.3);border:1px solid var(--LD);border-radius:4px;padding:8px;">
        <div style="color:var(--dim);margin-bottom:4px;">KALİBRASYON YAP</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button onclick="performCalibration('full')" style="flex:1;padding:5px 8px;background:rgba(245,158,11,.15);border:1px solid #f59e0b;color:#f59e0b;border-radius:4px;cursor:pointer;font-family:var(--M);font-size:.6rem;">TAM KALİBRASYON</button>
          <button onclick="performCalibration('speed')" style="flex:1;padding:5px 8px;background:rgba(59,130,246,.15);border:1px solid #3b82f6;color:#60a5fa;border-radius:4px;cursor:pointer;font-family:var(--M);font-size:.6rem;">HIZ SENSÖRÜ</button>
        </div>
        <button onclick="performCalibration('seal')" style="width:100%;margin-top:6px;padding:5px;background:rgba(239,68,68,.15);border:1px solid #ef4444;color:#ef4444;border-radius:4px;cursor:pointer;font-family:var(--M);font-size:.6rem;">MÜHÜR UYGULA</button>
      </div>
    </div>
    <div style="display:flex;gap:8px;margin-top:12px;">
      <button onclick="document.getElementById('service-dlg').remove();exitServiceMode();" style="flex:1;padding:5px;background:var(--bdr);color:var(--slate);border:none;border-radius:4px;cursor:pointer;font-size:.65rem;">Kapat</button>
    </div>`;
  document.body.appendChild(dlg);
}

function exitServiceMode(){
  S.serviceMode = false;
  updateLCD();
  doLog('🔧 Servis kartı çıkarıldı. Sürücü moduna dönüldü.','ok');
}

function performCalibration(type){
  S.lastCalibration = S.simMin;
  S.calibrationDue  = S.simMin + (730 * 1440); // 2 yıl dakika
  const types = {
    full:  '✓ TAM KALİBRASYON TAMAMLANDI — k-faktörü, lastik çevresi, zaman senkronizasyonu güncellendi.',
    speed: '✓ HIZ SENSÖRÜ KALİBRE EDİLDİ — k-faktörü: '+S.kFactor+' imp/km doğrulandı.',
    seal:  '🔒 MÜHÜR UYGULANADI — Takograf cihazı servis mührüyle kapatıldı. Sonraki bakım: 2 yıl sonra.',
  };
  doLog(types[type]||'✓ Kalibrasyon tamamlandı.','ok');
  doLog('   Sonraki zorunlu kalibrasyon: '+new Date(Date.now()+730*24*3600*1000).toLocaleDateString('tr-TR'));
  const dlg = document.getElementById('service-dlg');
  if(dlg) dlg.remove();
  exitServiceMode();
}


/* G5: WTD — Çalışma Süresi Direktifi 2002/15/EC */
function toggleWTD(){
  S.wtdEnabled = !S.wtdEnabled;
  if(S.wtdEnabled){
    doLog('⏱ WTD TAKİBİ AKTİF (2002/15/EC)','ok');
    doLog(' • Haftalık maks çalışma: 60 saat (48sa ortalama/16 hafta)');
    doLog(' • 6 saat+ kesintisiz çalışmada 30dk mola zorunlu');
    doLog(' • Çalışma = Sürüş + Yükleme + Bekleme + İdari');
  } else {
    doLog('⏱ WTD takibi kapatıldı.','ok');
  }
  updateLCD();
}

function checkWTD(){
  if(!S.wtdEnabled) return;
  const wk = S.wtdWeeklyWork||0;
  const dy = S.wtdDailyWork||0;
  /* Haftalık 60sa uyarısı */
  if(wk >= 3600 && wk-60 < 3600)
    doLog('⚠ WTD: Haftalık çalışma 60 saat DOLDU! 2002/15/EC ihlali.','err');
  else if(wk >= 3300 && wk-60 < 3300)
    doLog('⚠ WTD: Haftalık 55 saat — 5 saat kaldı (maks: 60sa).','warn');
  /* Günlük 10sa+ bilgi */
  if(dy >= 600 && dy-60 < 600)
    doLog('ℹ WTD: Bugün 10 saat çalışıldı — dikkat.');
}


/* ══ G6: XP & ROZET SİSTEMİ ══ */
const BADGES = [
  {id:'newbie',     icon:'🚗', name:'Yeni Sürücü',    req:'İlk simülasyonu tamamla',          xp:0},
  {id:'compliant',  icon:'✅', name:'Kurallı Sürücü',  req:'3 ihlalsiz senaryo tamamla',       xp:300},
  {id:'break_pro',  icon:'⏸', name:'Mola Ustası',     req:'5 kez mükemmel mola kullan',       xp:500},
  {id:'ferry_cap',  icon:'⛴', name:'Feribot Kaptanı', req:'Feribot senaryosunu tamamla',      xp:400},
  {id:'weekly_champ',icon:'🏆',name:'Haftalık Şampiyon',req:'56sa haftalık limitini tamamla', xp:600},
  {id:'kty_driver', icon:'🇹🇷', name:'KTY Sürücüsü',   req:'KTY modunda 5 senaryo',           xp:500},
  {id:'perfect_week',icon:'⭐',name:'Mükemmel Hafta',  req:'7 gün ihlalsiz sür',              xp:1000},
];

const XP_LEVELS = [0,100,250,500,900,1500,2300,3300,4500,6000];
function xpToLevel(xp){ let l=1; for(let i=1;i<XP_LEVELS.length;i++) if(xp>=XP_LEVELS[i]) l=i+1; return Math.min(l,10); }
function xpForNext(xp){ const l=xpToLevel(xp); return l<10?XP_LEVELS[l]-xp:0; }

function awardXP(amount, reason){
  S.xp = (S.xp||0) + amount;
  const newLevel = xpToLevel(S.xp);
  const lvlUp = newLevel > (S.level||1);
  S.level = newLevel;
  doLog('✨ +'+amount+' XP — '+reason+(lvlUp?' | SEVİYE ATLADI: Lv.'+newLevel+'! 🎉':''),'ok');
  showXPToast(amount, reason, lvlUp, newLevel);
  updateXPBar();
}

function checkBadge(badgeId){
  if(!S.badges) S.badges=[];
  if(S.badges.includes(badgeId)) return;
  const b = BADGES.find(x=>x.id===badgeId);
  if(!b) return;
  S.badges.push(badgeId);
  doLog('🏅 ROZET KAZANILDI: '+b.icon+' '+b.name,'ok');
  showXPToast(0, b.icon+' '+b.name, false, 0, true);
  awardXP(b.xp, b.name+' rozeti');
}

function showXPToast(xp, reason, lvlUp, level, isBadge){
  const t=document.createElement('div');
  t.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);'+
    'background:'+(isBadge?'rgba(245,158,11,.95)':lvlUp?'rgba(168,85,247,.95)':'rgba(34,197,94,.9)')+
    ';color:#fff;padding:6px 14px;border-radius:20px;font-family:var(--M);font-size:.65rem;'+
    'z-index:99999;pointer-events:none;white-space:nowrap;box-shadow:0 4px 12px #0008;';
  t.textContent = isBadge ? ('🏅 '+reason) : lvlUp ? ('⬆ Lv.'+level+' — '+reason) : ('+'+xp+' XP — '+reason);
  document.body.appendChild(t);
  t.animate([{opacity:0,transform:'translateX(-50%) translateY(10px)'},{opacity:1,transform:'translateX(-50%) translateY(0)'}],{duration:300});
  setTimeout(()=>{ t.animate([{opacity:1},{opacity:0}],{duration:400}).onfinish=()=>t.remove(); },2000);
}

function updateXPBar(){
  const bar=document.getElementById('xp-bar');
  const lbl=document.getElementById('xp-label');
  const lvl=document.getElementById('xp-level');
  if(!bar||!lbl) return;
  const xp=S.xp||0, level=S.level||1;
  const pct = level<10 ? ((xp-XP_LEVELS[level-1])/(XP_LEVELS[level]-XP_LEVELS[level-1]))*100 : 100;
  bar.style.width=Math.min(100,Math.max(0,pct))+'%';
  lbl.textContent = level<10 ? xpForNext(xp)+' XP→Lv.'+(level+1) : 'MAX';
  if(lvl) lvl.textContent='Lv.'+level;
}

/* XP olayları — senaryo tamamlanınca loadScen çağrıldığında gamification tetiklenir */
setInterval(updateDateDisplay, 500);

/* ══════════════════════════════════════════════════════════ */
function checkCabotageRisk(){
 if(!S.positionLog || !S.borderLog) return;
 /* Aynı ülkede 3+ yükleme/boşaltma → Kabotaj şüphesi */
 const recentLoads = (S.positionLog||[]).filter(p=>
 (p.reason==='loading'||p.reason==='unloading') &&
 p.country === S.currentCountry &&
 p.simMin >= S.simMin - 7*24*60 /* son 7 gün */
 );
 if(recentLoads.length >= 3){
 triggerWarning(
 '⚠ Kabotaj Riski',
 `${S.currentCountry} içinde ${recentLoads.length} yükleme/boşaltma tespit edildi. ` +
 'Kabotaj kuralları: AB ülkesinde maksimum 3 operasyon / 7 gün. 1072/2009',
 'usage', 8
 );
 doLog(`⚠ KABOTAJ RİSK UYARISI: ${S.currentCountry} içinde ${recentLoads.length} yükleme/boşaltma (son 7 gün). 1072/2009`,'warn');
 }
}

/* ══════════════════════════════════════════════════════════ */
function showSoftwareUpdateDialog(){
 const existing = document.getElementById('swupdate-dlg');
 if(existing){ existing.remove(); return; }
 const dlg = document.createElement('div');
 dlg.id = 'swupdate-dlg';
 dlg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#0a0e14;border:1px solid #22c55e;border-radius:8px;padding:18px 22px;z-index:9999;min-width:min(340px,calc(100vw - 24px));box-shadow:0 8px 32px #000a;font-family:var(--M);';

 const currentV = S.dtcoVariant || '4.1b';
 const updatePath = {
 '4.1': [{v:'4.1a',desc:'OSNMA etkinleştirme (Mart 2025+)',req:'Galileo OSNMA aktif olmalı'},
 {v:'4.1b',desc:'Periyodik kontrol zorunlu sürüm (Eylül 2025+)',req:'4.1a üzerinden'}],
 '4.1a': [{v:'4.1b',desc:'Periyodik kontrol zorunlu sürüm',req:'servis kartı'}],
 '4.1b': [],
 }[currentV] || [];

 const updateBtns = updatePath.length > 0
 ? updatePath.map(u=>`
 <button onclick="simulateSWUpdate('${u.v}')" style="display:block;width:100%;text-align:left;margin-bottom:6px;padding:8px 12px;background:#0a1a0a;border:1px solid #22c55e;color:var(--txt);border-radius:4px;cursor:pointer;font-family:var(--M);font-size:.75rem">
 <div style="color:var(--grn);font-weight:700">${escapeHTML(currentV)} → ${escapeHTML(u.v)}</div>
 <div style="font-size:.625rem">${escapeHTML(u.desc)}</div>
 <div style="font-size:var(--fs-min);color:var(--dim);margin-top:2px">Gereksinim: ${escapeHTML(u.req)}</div>
 </button>`).join('')
 : '<div style="color:var(--grn);padding:8px;font-size:.75rem">✓ — En güncel sürüm. Güncelleme gerekmiyor.</div>';

 dlg.innerHTML = `
 <div style="color:var(--grn);font-size:.875rem;margin-bottom:4px">⬆ YAZILIM GÜNCELLEMESİ</div>
 <div style="font-size:.625rem;color:var(--dim);margin-bottom:10px">
 Mevcut: <b style="color:var(--violet-light)">${currentV}</b> ${S.osnmaActive?'🔒 OSNMA':'🔓 Geçiş'}
 </div>
 <div style="font-size:.625rem;color:var(--slate);margin-bottom:10px;background:#0e1020;padding:8px;border-radius:4px;line-height:1.6">
 ⚠ Gerçekte: Yetkili servis + Servis kartı gereklidir.<br>
 → 4.1b: 2 yıllık periyodik kontrolde yapılır.<br>
 Güncelleme sonrası kalibrasyon verisi korunur.<br>
 PDF S.22-23: Geçiş takografı yapılandırması.
 </div>
 ${updateBtns}
 <div style="display:flex;justify-content:flex-end;margin-top:8px">
 <button onclick="document.getElementById('swupdate-dlg').remove()" style="padding:4px 12px;background:var(--bdr);color:var(--slate);border:none;border-radius:4px;cursor:pointer;font-size:.75rem">Kapat</button>
 </div>`;
 document.body.appendChild(dlg);
}

function simulateSWUpdate(targetV){
 document.getElementById('swupdate-dlg')?.remove();
 const prevV = S.dtcoVariant;
 doLog(`⬆ YAZILIM GÜNCELLEMESİ BAŞLADI: ${prevV} → ${targetV}...`,'ok');
 doLog(' Güvenlik sertifikası doğrulanıyor...');
 setTimeout(()=>{
 doLog(' Yazılım paketi yükleniyor (SWUM)...');
 setTimeout(()=>{
 S.dtcoVariant = targetV;
 S.osnmaActive = (targetV === '4.1a' || targetV === '4.1b');
 applyDTCOVersion(targetV);
 doLog(`✓ Güncelleme tamamlandı: Takograf ${prevV} → ${targetV}. ${S.osnmaActive?'🔒 OSNMA aktif':'🔓 Geçiş modu'}. PDF S.22`,'ok');
 if(S.osnmaActive) doLog(' Galileo OSNMA kimlik doğrulama: AKTİF. Konum verileri artık doğrulanmış.','ok');
 }, 1200);
 }, 800);
}

/* ══════════════════════════════════════════════════════════ */
function showSE5000Comparison(){
 const existing = document.getElementById('se5000-dlg');
 if(existing){ existing.remove(); return; }
 const dlg = document.createElement('div');
 dlg.id = 'se5000-dlg';
 dlg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#0a0b10;border:1px solid #3b82f6;border-radius:8px;padding:18px 22px;z-index:9999;min-width:min(380px,calc(100vw - 24px));max-width:min(500px,calc(100vw - 24px));max-height:85vh;overflow-y:auto;box-shadow:0 8px 48px #000a;font-family:var(--M);';

 /* SE5000 karşılaştırma — güncel veriler Nisan 2026 */
 const features = [
 ['OSNMA / Galileo (Ara. 2025+)', '✓ /b — Tam OSNMA', '✓ SE5000-8.1 — OSNMA (May 2025)'],
 ['OSNMA Geçiş Versiyonu', '✓ (4.1T)', '✓ SE5000 8.0 (geçiş)'],
 ['Bluetooth / ITS', '✓ 4.1a+', '✓ Entegre'],
 ['DSRC Uzaktan Denetim', '✓ Harici anten', '✓ Entegre anten'],
 ['Counter ', '✓ Opsiyonel — kalan süreler', '✗ Yok (DTD farklı)'],
 ['Driver Timer Display (DTD)', '~ Counter benzeri', '✓ SE5000 Smart 2 özelliği'],
 ['Driver Decision Support (DDS)', '~ Haftalık planlama aracı', '✓ SE5000 entegre DDS'],
 ['Online Simülatör', '✓ Türkçe (bu araç)', '✗ Smart 2 versiyonu yok*'],
 ['Otomatik sınır geçişi', '✓ G2V2 + GNSS', '✓ GNSS otomatik'],
 ['Gece kart takılı sınır', '~ Manuel + otomatik karışık', '✓ Otomatik (SE5000 Smart 2)'],
 ['Yazılım güncelleme', '✓ 4.1→4.1b (Eyl 2025)', '✓ 8.0→8.1 (May 2025)'],
 ['Filo yönetimi', ' App / DLK Key', 'OPTAC3 / DLK uyumlu'],
 ['Offline kullanım', '✓ Tek HTML dosyası', '✗ Online portal'],
 ['Türkiye pazarı', '✓ Yaygın (pazar lideri)', '~ Sınırlı'],
 ['Güvenlik sertifikası', 'ISO 15408 EAL4+', 'ISO 15408 EAL4+'],
 ['Temmuz 2026 (2.5-3.5t)', '✓ Bilgi modülü mevcut', '~ Bilgi mevcut'],
 ];

 const rows = features.map(([f,d,s])=>`
 <tr style="border-bottom:1px solid #0e0f16">
 <td style="padding:5px 8px;font-size:.625rem;color:var(--slate-light)">${escapeHTML(f)}</td>
 <td style="padding:5px 8px;font-size:.625rem;color:${d.startsWith('✓')?'#22c55e':d.startsWith('✗')?'#ef4444':'#f59e0b'}">${escapeHTML(d)}</td>
 <td style="padding:5px 8px;font-size:.625rem;color:${s.startsWith('✓')?'#22c55e':s.startsWith('✗')?'#ef4444':'#f59e0b'}">${escapeHTML(s)}</td>
 </tr>`).join('');

 dlg.innerHTML = `
 <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
 <div style="color:var(--blu);font-size:.875rem">📊 vs SE5000 Smart 2</div>
 <button aria-label="Kapat" onclick="document.getElementById('se5000-dlg').remove()" style="background:none;border:1px solid #1e2232;color:var(--slate);padding:2px 8px;border-radius:3px;cursor:pointer;font-size:.75rem">✕</button>
 </div>
 <table style="width:100%;border-collapse:collapse">
 <thead>
 <tr style="background:var(--s1)">
 <th style="padding:6px 8px;text-align:left;font-size:.625rem;color:var(--slate);letter-spacing:1px">ÖZELLİK</th>
 <th style="padding:6px 8px;text-align:left;font-size:.625rem;color:var(--violet-light);letter-spacing:1px"></th>
 <th style="padding:6px 8px;text-align:left;font-size:.625rem;color:var(--blu);letter-spacing:1px">Stoneridge SE5000</th>
 </tr>
 </thead>
 <tbody>${rows}</tbody>
 </table>
 <div style="margin-top:10px;padding:8px;background:#0e1020;border-radius:4px;font-size:.625rem;color:var(--dim);line-height:1.6">
 Kaynak: Continental kılavuzu (BA00.1381.41) · Stoneridge SE5000 Smart 2 resmi dokümantasyonu<br>
 Veriler: Nisan 2026 · Her iki cihaz AB Uygulama Yönetmeliği 2021/1228 tam uyumlu.<br>
 * SE5000 Smart 2 simülatörü resmi sitede "henüz mevcut değil" olarak belirtilmektedir (stoneridge-tachographs.com, Nisan 2026).
 </div>`;
 document.body.appendChild(dlg);
}

/* ══════════════════════════════════════════════════════════
 KLAVYE KISAYOLLARI & ESC MODAL KAPATMA
══════════════════════════════════════════════════════════ */
document.addEventListener('keydown', function(e){
 /* ESC — tüm açık diyalogları kapat (evrensel) */
 if(e.key==='Escape'){
 /* Önce bilinen sabit ID'li diyalogları kapat */
 closeReport();
 ['country-dlg','speedlimit-dlg','spoofing-dlg','kty-dlg','adr-dlg',
 'company-dlg','dtco-dlg','cardgen-dlg','cargo-dlg','utc-dlg',
 'doubleDrv-dlg','snapshot-save-dlg','profile-dlg','manual-panel',
 'work-popup','inspector-panel','plan-wizard','ai-chat-panel',
 'calibration-panel','sw-update-dlg'].forEach(id=>{
 const el=document.getElementById(id);
 if(el && el.style.display!=='none' && el.offsetParent!==null) el.remove?.() || (el.style.display='none');
 });
 document.getElementById('tour-overlay')?.remove();
 /* Dinamik overlay'leri kapat — data-closeable attribute */
 document.querySelectorAll('[data-closeable]').forEach(el=>el.remove());
 return;
 }
 /* Input veya select odaklandıysa kısayolları engelle */
 if(e.target.tagName==='INPUT'||e.target.tagName==='SELECT'||e.target.tagName==='TEXTAREA') return;
 switch(e.key.toLowerCase()){
 case 'd': setMode('driving',null); break;
 case 'r': setMode('rest',null); break;
 case 'w': openWorkMenu(); break;
 case 'a': setMode('available',null); break;
 case ' ': e.preventDefault(); advance(5); break; /* Space: +5dk */
 case '1': advance(15); break;
 case '2': advance(30); break;
 case '3': advance(60); break;
 case 'n': newDay(); break;
 case 'f': toggleFerry(); break;
 case 'o': toggleOut(); break;
 case 'm': toggleManualPanel(); break;
 case 'k': acknowledgeWarning(); break; /* K: Onayla */
 case 'p': showReport('position'); break; /* P: konum log */
 case 'c': showReport('control'); break; /* C: kontrol raporu */
 case 'b': showCargoTypeDialog(); break; /* B: yük Binası */
 case 'v': showDTCOVersionDialog(); break; /* V: Versiyon */
 case 'g': showCardGenDialog(); break; /* G: kart Gen */
 case 'q': showQuizDialog(); break; /* Q: Quiz */
 case 'l': showWeeklyPlanner(); break; /* L: pLanlama */
 case 'x': enterCalibrationMode(); break; /* X: kalibrasyon */
 case 'e': showCrewSwapDialog(); break; /* E: ekip degisimi */
 case 'j': showMenuSimulator(); break; /* J: menu simülatoru */
 case 'z': showFleetPanel(); break; /* Z: filo paneli */
 }
});

/* ══════════════════════════════════════════════════════════
 UTC OFSET & YAZ SAATİ AYAR DİYALOGU 
══════════════════════════════════════════════════════════ */
function showTimezoneDialog(){
 const existing=document.getElementById('tz-dlg');
 if(existing){existing.remove();return;}
 const dlg=document.createElement('div');
 dlg.id='tz-dlg';
 dlg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--s2);border:1px solid #60a5fa;border-radius:8px;padding:16px 20px;z-index:9999;min-width:min(260px,calc(100vw - 24px));box-shadow:0 8px 32px #000a;font-family:var(--M);';
 const offsetH=Math.floor((S.utcOffsetMin||180)/60);
 const zones=[
 [60,'UK/P/IRL/IS — UTC+1'],
 [120,'A/B/D/F/I/NL — UTC+2'],
 [180,'TR/RUS — UTC+3 (Türkiye)'],
 [240,'AZ/GE — UTC+4'],
 [300,'UTC+5'],
 [360,'UTC+6'],
 ];
 const opts=zones.map(([m,l])=>`<option value="${m}"${m===(S.utcOffsetMin||180)?' selected':''}>${l}</option>`).join('');
 dlg.innerHTML=`<div style="color:var(--blue-light);font-size:.875rem;margin-bottom:10px">🕐 ZAMAN DİLİMİ </div>
<div style="font-size:.625rem;color:var(--slate);margin-bottom:8px">Takograf UTC'de kaydeder. Yerel saat = UTC + Dilim farkı + Yaz saati.</div>
<select id="dlg-tz" style="width:100%;background:var(--s1);color:var(--txt);border:1px solid #1e2232;border-radius:4px;padding:6px;font-size:.75rem;margin-bottom:8px;font-family:var(--M)">${opts}</select>
<label style="display:flex;align-items:center;gap:8px;font-size:.75rem;color:var(--txt);margin-bottom:10px;cursor:pointer">
 <input type="checkbox" id="dlg-dst" ${S.dstActive?'checked':''} style="cursor:pointer"> Yaz saati aktif (+60 dk)
</label>
<div style="display:flex;gap:8px;justify-content:flex-end;">
 <button onclick="document.getElementById('tz-dlg').remove()" style="padding:4px 12px;background:var(--bdr);color:var(--slate);border:none;border-radius:4px;cursor:pointer;font-size:.75rem">İptal</button>
 <button onclick="applyTimezone()" style="padding:4px 12px;background:var(--blue-dark);color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:.75rem">Uygula</button>
</div>`;
 document.body.appendChild(dlg);
}
function applyTimezone(){
 const sel=document.getElementById('dlg-tz');
 const dst=document.getElementById('dlg-dst');
 if(!sel) return;
 S.utcOffsetMin=parseInt(sel.value)||180;
 S.dstActive=dst?dst.checked:false;
 const dlg=document.getElementById('tz-dlg');
 if(dlg) dlg.remove();
 const h=Math.floor(S.utcOffsetMin/60),m=S.utcOffsetMin%60;
 doLog(`🕐 Zaman dilimi ayarlandı: UTC+${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}${S.dstActive?' + Yaz saati (+60dk)':''}. `,'ok');
 updateLCD();
}

/* ══════════════════════════════════════════════════════════
 BİLDİRİM SESİ (Web Audio API)
══════════════════════════════════════════════════════════ */
let _audioCtx=null;
function playBeep(freq,dur,type){
 try{
 if(!_audioCtx) _audioCtx=new(window.AudioContext||window.webkitAudioContext)();
 const o=_audioCtx.createOscillator();
 const g=_audioCtx.createGain();
 o.connect(g);g.connect(_audioCtx.destination);
 o.type=type||'square';
 o.frequency.setValueAtTime(freq||880,_audioCtx.currentTime);
 g.gain.setValueAtTime(0.08,_audioCtx.currentTime);
 g.gain.exponentialRampToValueAtTime(0.001,_audioCtx.currentTime+(dur||0.15));
 o.start(_audioCtx.currentTime);
 o.stop(_audioCtx.currentTime+(dur||0.15));
 }catch(e){}
}

/* ══════════════════════════════════════════════════════════ */
function showPiktogramPanel(){
 const existing=document.getElementById('piktogram-modal');
 if(existing){existing.remove();return;}
 const PIKTS=[
 {sym:'🚗',code:'sürüş',desc:'Sürüş zamanı aktivitesi'},
 {sym:'🛏',code:'dinlenme',desc:'Mola ve dinlenme zamanı'},
 {sym:'🔨',code:'diğer iş',desc:'Diğer çalışma zamanı (yükleme, bekleme vb.)'},
 {sym:'📬',code:'uygunluk',desc:'Nöbet / uygunluk zamanı'},
 {sym:'⛴',code:'feribot',desc:'Feribot veya tren üzerinde bulunma'},
 {sym:'OUT',code:'OUT',desc:'Kapsam dışı — takograf yönetmeliği dışında sürüş'},
 {sym:'M',code:'manuel',desc:'Aktivitelerin manuel girişi'},
 {sym:'?',code:'bilinmiyor',desc:'Bilinmeyen aktivite / süre'},
 {sym:'!',code:'olay',desc:'Olay kaydı (güvenlik ihlali, hız aşımı vb.)'},
 {sym:'x',code:'arıza',desc:'Arıza kaydı (sensör, GNSS, kart vb.)'},
 {sym:'1',code:'1.kart',desc:'1. kart yuvası / 1. sürücü'},
 {sym:'2',code:'2.kart',desc:'2. kart yuvası / 2. sürücü'},
 {sym:'📡',code:'GNSS',desc:'GNSS konum sistemi durumu'},
 {sym:'🔵',code:'BT',desc:'Bluetooth bağlantısı (4.1a+)'},
 {sym:'R',code:'uzaktan',desc:'Uzaktan HMI / kumanda'},
 {sym:'$',code:'lisans',desc:'Lisans kodu girişi'},
 {sym:'24h',code:'günlük',desc:'Günlük süre niteleyicisi'},
 {sym:'|',code:'haftalık',desc:'Haftalık süre niteleyicisi'},
 {sym:'||',code:'iki haftalık',desc:'İki haftalık süre niteleyicisi'},
 {sym:'Σ',code:'toplam',desc:'Toplam / özet değer'},
 {sym:'Δ',code:'fark',desc:'Fark değeri'},
 {sym:'o',code:'kağıt yok',desc:'Yazıcıda kağıt yok'},
 {sym:'c',code:'kartı çıkar',desc:'Kartı kart yuvasından çıkar'},
 {sym:'☢',code:'ADR',desc:'Tehlikeli madde / ADR varyantı'},
 ];
 const rows=PIKTS.map(p=>`<tr style="border-bottom:1px solid #0e0f16">
 <td style="padding:5px 10px;font-size:1rem;text-align:center;min-width:40px">${escapeHTML(p.sym)}</td>
 <td style="padding:5px 10px;color:var(--blue-light);font-family:var(--M);font-size:.625rem">${escapeHTML(p.code)}</td>
 <td style="padding:5px 10px;color:var(--slate-light);font-size:.625rem">${escapeHTML(p.desc)}</td>
 </tr>`).join('');
 const modal=document.createElement('div');
 modal.id='piktogram-modal';
 modal.style.cssText='position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.85);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)';
 modal.innerHTML=`<div style="background:#0a0b10;border:1px solid #3b82f6;border-radius:8px;max-width:500px;width:90%;max-height:80vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 16px 64px rgba(0,0,0,.9)">
 <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid #1e2232;font-family:var(--M);font-size:.75rem;color:var(--cyan-light)">
 <span>📊 PİKTOGRAFİ REFERANSI </span>
 <button aria-label="Kapat" onclick="document.getElementById('piktogram-modal').remove()" style="background:none;border:1px solid #3b4a6a;color:var(--slate);padding:2px 8px;border-radius:4px;cursor:pointer;font-family:var(--M);font-size:.625rem">✕</button>
 </div>
 <div style="overflow-y:auto;flex:1">
 <table style="width:100%;border-collapse:collapse">${rows}</table>
 </div>
 <div style="padding:6px 14px;font-family:var(--M);font-size:var(--fs-min);color:var(--slate);border-top:1px solid #1e2232">PDF Piktogramlar — BA00.1381.41, Baskı 4, 2025-03</div>
 </div>`;
 modal.addEventListener('click',e=>{if(e.target===modal)modal.remove();});
 document.body.appendChild(modal);
}


/* BAŞLAT */
initState();

/* S2-1: Kayıtlı state varsa yükle */
const _hadSaved = loadPersistedState();
if(_hadSaved){
 doLog('📂 Önceki oturum yüklendi — kaldığınız yerden devam edebilirsiniz.','ok');
} else {
 doLog('Sistem başlatıldı. Kart: A.YILMAZ (TR-054821)');
 doLog('Mod → DİNLENME | GPS: BAĞLI | Odometer: 124.532 km');
 doLog('ℹ Tur için "🎓 Tur Başlat" butonuna tıklayın.');
}

buildAxis();
updateMpict(S.mode||'rest');
renderTL();
updateLCD();
renderScenButtons();
 _renderQuickStrip();
/* Zoom butonlarını başlangıç durumuna getir */
setTLZoom(_tlZoom);
/* Pixel animasyon sahnesi — başlangıç modu */
setTimeout(()=>{
 if(typeof window._pixelSetScene === 'function')
 window._pixelSetScene(S.mode === 'work' ? S.workSub : (S.mode||'rest'));
}, 200);
/* KTY: varsayılan açık — init'te uygula */
if(window._ktyMode){
  const btn=document.getElementById('kty-mode-btn');
  if(btn){ btn.textContent='🇹🇷 KTY: AÇIK'; btn.style.borderColor='#e30a17'; btn.style.color='#e30a17'; }
  const badge=document.getElementById('opmode-badge');
  if(badge){ badge.textContent='🇹🇷 KTY'; badge.className='lcd-opmode'; badge.style.color='#e30a17'; badge.style.borderColor='#e30a17'; badge.style.background='rgba(227,10,23,.08)'; }
  const devBrand=document.getElementById('dev-brand-lbl');
  if(devBrand) devBrand.textContent='🇹🇷 KTY MODU | Türkiye İç Hat Kuralları | Takograf';
}
/* Sprint E: OSNMA state localStorage'dan yükle */
if(localStorage.getItem('tachotr_osnma')==='0'){
 S.osnmaActive=false;
 const led=document.getElementById('osnma-led');
 if(led) led.className='lcd-led off';
}
renderKbGrid();
updateActiveModeDisplay();
updateOSNMAStatus();
renderSnapshotList();
renderProfileList();
/* S3: Risk ve puan ilk güncelleme */
setTimeout(()=>{ updateDailyScore(); updateRiskDisplay(); }, 200);
/* S6: Tema uygula (dil özelliği geçici kapalı — sadece TR) */
setTheme(_currentTheme);
/* setLanguage(_currentLang); — dil özelliği kapalı */
/* Başlangıç sekmesi: Log */
setTimeout(()=>{ switchRPanel('log'); }, 100);
renderCal();

/* ── PWA: Service Worker — inline Blob (tek dosya uyumu) ── */
if('serviceWorker' in navigator){
 const swCode = `
const CACHE='tachotr-v1';
self.addEventListener('install',e=>e.waitUntil(
 caches.open(CACHE).then(c=>c.add('/')).catch(()=>{}).then(()=>self.skipWaiting())
));
self.addEventListener('activate',e=>e.waitUntil(
 caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
 .then(()=>self.clients.claim())
));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET') return;
 if(e.request.url.includes('api.anthropic.com')) return;
 e.respondWith(
 caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{
 if(r&&r.status===200&&r.type==='basic'){
 const cl=r.clone();
 caches.open(CACHE).then(c=>c.put(e.request,cl));
 }
 return r;
 }).catch(()=>caches.match('/')))
 );
});
 `;
 try {
 const blob = new Blob([swCode], {type:'application/javascript'});
 const swUrl = URL.createObjectURL(blob);
 navigator.serviceWorker.register(swUrl, {scope:'./'})
 .then(reg => {
 _dbg('Service Worker kayıtlı (blob)');
 reg.addEventListener('updatefound', ()=>{
 const w = reg.installing;
 if(w) w.addEventListener('statechange', ()=>{
 if(w.state==='installed' && navigator.serviceWorker.controller)
 _toast('Yeni versiyon mevcut — sayfayı yenileyin.','info',6000);
 });
 });
 })
 .catch(err => _dbg('SW blob kaydı başarısız:', err.message));
 } catch(e){ _dbg('SW desteklenmiyor:', e.message); }
}
