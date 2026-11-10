
'use strict';
const phone='5531986959736';
document.querySelectorAll('[data-wa]').forEach(a=>{const message=a.dataset.service?`Olá! Gostaria de um orçamento para ${a.dataset.service}. Meu bairro é: `:'Olá! Gostaria de um orçamento da Higieniza Clean. Meu bairro é: ';a.href=`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;});
const menu=document.querySelector('#menu'),toggle=document.querySelector('.toggle');
function closeMenu(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');}
toggle.addEventListener('click',()=>{const open=!menu.classList.contains('open');menu.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){closeMenu();toggle.focus();}});
window.matchMedia('(min-width:701px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const compare=document.querySelector('.compare'),range=compare.querySelector('input');let pointer=null;
function update(){compare.style.setProperty('--split',`${range.value}%`);range.setAttribute('aria-valuetext',`${range.value}% da imagem antes visível`);}
function move(x){const b=compare.getBoundingClientRect();if(b.width){range.value=String(Math.round(Math.max(0,Math.min(100,(x-b.left)/b.width*100))));update();}}
range.addEventListener('input',update);
range.addEventListener('pointerdown',e=>{if(!e.isPrimary||(e.pointerType==='mouse'&&e.button!==0))return;e.preventDefault();pointer=e.pointerId;range.focus({preventScroll:true});range.setPointerCapture(pointer);move(e.clientX);});
range.addEventListener('pointermove',e=>{if(e.pointerId===pointer){e.preventDefault();move(e.clientX);}});
function stop(e){if(e.pointerId!==pointer)return;if(e.type==='pointerup')move(e.clientX);pointer=null;if(range.hasPointerCapture(e.pointerId))range.releasePointerCapture(e.pointerId);}
range.addEventListener('pointerup',stop);range.addEventListener('pointercancel',stop);range.addEventListener('lostpointercapture',()=>pointer=null);update();
if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(e=>{e.classList.add('ready');observer.observe(e);});}
