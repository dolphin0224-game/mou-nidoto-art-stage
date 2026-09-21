const $=s=>document.querySelector(s), canvas=$('#unity');
let instance,reference=false,sound=false,audio,gain,dialogue=false;
const keys=['pixel','soft','graphite','paint'];
const command=c=>{if(instance)instance.SendMessage('ArtStage','Command',c)};
const lines={talk:['仮キャラクター','……ここ、静かだね。もう少しだけ、一緒に見ていこう。'],flower:['白い花','夜の青に沈む花びら。その縁だけに、宿の灯りが残っている。'],lamp:['宿の灯り','障子の向こうで灯りが揺れた。風が止んでも、その明るさはわずかに変わり続ける。']};
function inspect(id){if(!instance||reference)return;command(id);$('#speaker').textContent=lines[id][0];$('#line').textContent=lines[id][1];$('#dialogue').hidden=false;dialogue=true;}
function closeDialogue(){$('#dialogue').hidden=true;dialogue=false;canvas.focus()}
$('#talk').onclick=()=>inspect('talk');document.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>inspect(b.dataset.action));$('#closeDialogue').onclick=closeDialogue;
document.querySelectorAll('[data-style]').forEach(b=>b.onclick=()=>{if(reference)toggleReference();command('style:'+b.dataset.style);closeDialogue();canvas.focus()});
function toggleReference(){if(!instance)return;reference=!reference;$('#reference').src='references/'+keys[window.stageState?.style||0]+'.png';$('#reference').hidden=!reference;$('#referenceLabel').hidden=!reference;$('#referenceButton').textContent=reference?'Unityへ戻る':'参照画像';command('freeze');canvas.focus()}
$('#referenceButton').onclick=toggleReference;
$('#motionButton').onclick=()=>{command('motion');canvas.focus()};
$('#infoButton').onclick=()=>{$('#info').hidden=false};$('#closeInfo').onclick=$('#startButton').onclick=()=>{$('#info').hidden=true;canvas.focus()};$('#depthButton').onclick=()=>{command('depth');$('#info').hidden=true;canvas.focus()};
$('#fullButton').onclick=()=>{if(document.fullscreenElement)document.exitFullscreen();else $('#frame').requestFullscreen?.()};
document.querySelectorAll('[data-move]').forEach(b=>{let timer;const stop=()=>{clearInterval(timer)};b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);command(b.dataset.move);timer=setInterval(()=>command(b.dataset.move),200)});b.addEventListener('pointerup',stop);b.addEventListener('pointercancel',stop)});
canvas.addEventListener('contextmenu',e=>e.preventDefault());
window.addEventListener('keydown',e=>{if(e.code==='Space'&&!e.repeat){e.preventDefault();toggleReference()}if(e.code==='Escape'){closeDialogue();$('#info').hidden=true;if(reference)toggleReference()}if(e.code==='KeyE'&&!e.repeat)inspect('talk')});
window.onStageState=s=>{
 window.stageState=s;document.querySelectorAll('[data-style]').forEach(b=>b.classList.toggle('selected',Number(b.dataset.style)===s.style));
 $('#motionButton').textContent=s.atmosphere?'動き ON':'動き OFF';$('#motionButton').setAttribute('aria-pressed',s.atmosphere);
 $('#talk').style.left=(s.talkX*100)+'%';$('#talk').style.top=(s.talkY*100)+'%';$('#talk').style.visibility=s.talkVisible?'visible':'hidden';
 $('#notice').textContent=`立体モデル版 v6 · X ${s.x.toFixed(1)} / Z ${s.z.toFixed(1)} m · Rで戻る`;
 const count=[1,2,4].filter(n=>s.discoveries&n).length;$('#count').textContent=count+' / 3';$('#objective').textContent=count===3?'今夜の景色を手帳に残した':'夜の宿を確かめる';
 if(!$('#loading').hidden){$('#loading').hidden=true;document.querySelectorAll('.hud').forEach(e=>e.hidden=false);canvas.focus();if(matchMedia('(prefers-reduced-motion: reduce)').matches)command('motion');}
};
$('#soundButton').onclick=async()=>{
 if(!audio){audio=new AudioContext();gain=audio.createGain();gain.gain.value=0;gain.connect(audio.destination);const buffer=audio.createBuffer(1,audio.sampleRate*4,audio.sampleRate),data=buffer.getChannelData(0);let last=0;for(let i=0;i<data.length;i++){last=(last+(Math.random()*2-1)*.015)/1.015;data[i]=last}const n=audio.createBufferSource();n.buffer=buffer;n.loop=true;const filter=audio.createBiquadFilter();filter.type='lowpass';filter.frequency.value=480;n.connect(filter);filter.connect(gain);n.start();}await audio.resume();sound=!sound;gain.gain.setTargetAtTime(sound?.2:0,audio.currentTime,.5);$('#soundButton').textContent=sound?'音 ON':'音 OFF';$('#soundButton').setAttribute('aria-pressed',sound);
};
if(typeof createUnityInstance!=='function'){$('#loadMessage').textContent='読み込みファイルが見つかりません。ページを再読み込みしてください。'}else{
 createUnityInstance(canvas,{dataUrl:'Build/Web.data.unityweb?v=6',frameworkUrl:'Build/Web.framework.js.unityweb?v=6',codeUrl:'Build/Web.wasm.unityweb?v=6',streamingAssetsUrl:'StreamingAssets',companyName:'Mou Nidoto',productName:'Inn Art Stage',productVersion:'1.0',matchWebGLToCanvasSize:true,devicePixelRatio:Math.min(window.devicePixelRatio||1,1.5)},p=>{$('#progress').style.width=(p*100)+'%';$('#loadMessage').textContent='舞台を読み込み中 '+Math.round(p*100)+'%'}).then(u=>{instance=u;window.artUnity=u;canvas.focus()}).catch(e=>{$('#loadMessage').textContent='起動できませんでした。再読み込み、または別のブラウザーでお試しください。';console.error(e)});
}
