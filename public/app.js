function hm(m){m=Number(m);if(!isFinite(m)||isNaN(m))return'--:--';m=Math.max(0,Math.round(m));return Math.floor(m/60)+':'+String(m%60).padStart(2,'0');}
function simDateTime(){return new Date(SIM_START.getTime()+S.simMin*60000);}
function simTime(){const d=simDateTime();return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');}
function updateLedWarning(){
 else{led.className='led Loff';led.style.background='';}
 const _clear = (el, classes) => { if(el) classes.forEach(c => el.classList.remove(c)); };
 function px(x,y,c,s=1){ CTX.fillStyle=c; CTX.fillRect(Math.round(x),Math.round(y),s,s); }
 function rc(x,y,w,h,c){ CTX.fillStyle=c; CTX.fillRect(Math.round(x),Math.round(y),w,h); }
 (function loop(){
 })();
function barC(p){return p>=100?'var(--LR)':p>=85?'var(--LW)':'var(--LF)';}
     const colSafe = p => p<60?'var(--LF)':p<85?'var(--LW)':'var(--LR)';
     const col = p => p>40?'var(--LF)':p>15?'var(--LW)':'var(--LR)';
 function setPb(id,pp,col){const e=document.getElementById(id);if(e){e.style.width=pp+'%';e.style.background=col;}}
 function setPbp(id,pp){const e=document.getElementById(id);if(e)e.textContent=Math.round(pp)+'%';}
 function sh(id,v){const e=document.getElementById(id);if(e)e.style.display=v?'':'none';}
 function sv(id,v){const e=document.getElementById(id);if(e)e.textContent=v;}
function loadScen(idx){
 else{res.className='scenres res-ok';res.textContent=`✓ UYUMLU: Tüm parametreler yasal sınırlar içinde.`;}
 {key:'core', label:'📚 Temel Senaryolar', test:s=>['UYUMLU','UYARI'].includes(s.badge)},
 {key:'violation',label:'⚠️ Kasıtlı İhlaller', test:s=>s.badge==='İHLAL'},
 {key:'special', label:'🌍 Özel Durumlar', test:s=>['FERİBOT','MANUEL','OLAY','ŞİRKET','ARIZA','ADR','DENETİM'].includes(s.badge)},
 {key:'g2v2', label:'🛰 G2V2 & Akıllı Takograf', test:s=>['G2V2','OSNMA','DSRC'].includes(s.badge)},
 {key:'training', label:'🎓 Eğitim & Araç', test:s=>['EĞİTİM','ARAÇ','SERVİS','YENİ','FİLO','CAN'].includes(s.badge)},
 {key:'intl', label:'🌐 Uluslararası & Denetim', test:s=>['ULUSLARARASI'].includes(s.badge)},
function _nextQuiz(){_quizS.idx++;_quizS.answered=false;_renderQuiz();}
 sim:()=>{doLog('👥 EKİP DEĞİŞİMİ (1.Durum) : Sürücü rolleri değiştirildi.','ok');toggleDoubleDriver();}
 sim:()=>{doLog('🚗 VARDİYA SONU (2.Durum) : Kart çıkarıldı, yeni sürücü için hazır.','ok');newDay();}
 sim:()=>{doLog('🔀 KARMA KULLANIM (3.Durum) : Farklı takograf tipleri. Son 28/56 günün belgeleri ibraz hazır olmalı.','ok');}
function showFleetPanel(){
function showTelematicsPanel(){
function switchRPanel(tab){
 if(tab==='data'){ renderSnapshotList(); renderProfileList(); }
 if(tab==='ai'){ updateRiskDisplay(); }
 if(tab==='status'){ renderUyumTrend(); updateRiskDisplay(); }
function toggleBtnPanel(){ }
function _lsSet(key, val){
 try { localStorage.setItem(key, JSON.stringify(val)); return true; }
 catch(e){ console.warn('localStorage yazma hatası:', e); return false; }
 const scoreColor = s => s>=80?'var(--grn)':s>=60?'var(--amber)':'var(--red)';
 onNext: ()=>_executeGuidedStep(step),
 dot.onclick = () => doLog(`⚠ İhlal: ${m.label} (${markerDt.toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'})}, Gün ${dayIdx+1})`,'err');
function t(key){ return (TRANSLATIONS[_currentLang]||TRANSLATIONS.tr)[key] || key; }
 function _tr(s){ return s; }
 get active(){ return typeof S!=='undefined'&&S.useReducedRest&&!window._ktyMode; } },
 { iconOff:'⬆️', iconOn:'⬆️', labelOff:'10sa Uzat', labelOn:'10sa ✓', fn:"extendDay()",
 get active(){ return typeof S!=='undefined'&&S.dailyMax===600; } },
 get active(){ return typeof S!=='undefined'&&S.doubleDriver; } },
 { iconOff:'⛴', iconOn:'⛴', labelOff:'Feribot', labelOn:'⛴ Aktif', fn:"toggleFerry()",
 get active(){ return typeof S!=='undefined'&&S.ferryMode; } },
 { iconOff:'🌍', iconOn:'🌍', labelOff:'OUT', labelOn:'OUT ✓', fn:"toggleOutMode()",
 get active(){ return typeof S!=='undefined'&&S.outMode; } },
 { iconOff:'🚐', iconOn:'🚐', labelOff:'Hafif Araç', labelOn:'Hafif ✓', fn:"toggleLightVehicle()",
 get active(){ return typeof S!=='undefined'&&S.lightVehicleMode; } },
 get active(){ return typeof window._ktyMode!=='undefined'&&window._ktyMode; } },
 get active(){ return typeof S!=='undefined'&&S.bluetoothOn; } },
 { iconOff:'📍', iconOn:'📍', labelOff:'GNSS Off', labelOn:'GNSS On', fn:"toggleGNSS()",
 get active(){ return typeof S!=='undefined'&&S.gnssOk; } },
 { iconOff:'📡', iconOn:'📡', labelOff:'DSRC Off', labelOn:'DSRC On', fn:"toggleDSRC()",
 get active(){ return typeof S!=='undefined'&&S.dsrcEnabled; } },
 { iconOff:'🛰', iconOn:'🛰', labelOff:'OSNMA Off', labelOn:'OSNMA On', fn:"toggleOSNMA()",
 get active(){ return typeof S!=='undefined'&&S.osnmaActive; } },
 get active(){ return typeof S!=='undefined'&&S.adrMode; } },
 { iconOff:'🏢', iconOn:'🏢', labelOff:'Şirket', labelOn:'Şirket ✓', fn:"toggleCompany()",
 get active(){ return typeof S!=='undefined'&&S.companyMode; } },
 const sepHTML = (label) =>
 </div>`;
function toggleOutMode(){ toggleOut(); }
function toggleManual(){ toggleManualPanel(); }
function openCountryDlg(){ showCountryDialog(); }
function openSpeedLimit(){ showSpeedLimitDialog(); }
function openCargoTypeDlg(){ showCargoTypeDialog(); }
function xpToLevel(xp){ let l=1; for(let i=1;i<XP_LEVELS.length;i++) if(xp>=XP_LEVELS[i]) l=i+1; return Math.min(l,10); }
function xpForNext(xp){ const l=xpToLevel(xp); return l<10?XP_LEVELS[l]-xp:0; }
   setTimeout(()=>{ t.animate([{opacity:1},{opacity:0}],{duration:400}).onfinish=()=>t.remove(); },2000);
