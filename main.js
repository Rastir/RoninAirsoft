// Variables y helpers
const root = document.documentElement;
const stinger = document.getElementById('stinger');
const stingerLayer = document.getElementById('stinger-layer');
const toast = document.getElementById('toast');

function showToast(msg, time = 1800){ toast.textContent = msg; toast.classList.add('show'); setTimeout(()=> toast.classList.remove('show'), time); }


// Tema (persistente)
const themeToggle = document.getElementById('theme-toggle');
if(localStorage.getItem('site-theme') === 'light') root.classList.add('light');
themeToggle.addEventListener('click', ()=>{ const isLight = root.classList.toggle('light'); localStorage.setItem('site-theme', isLight? 'light':'dark'); themeToggle.textContent = isLight? '☀️' : '🌙'; showToast(isLight? 'Modo claro' : 'Modo oscuro'); });

// Customizer
const customizer = document.getElementById('customizer');
document.getElementById('open-customizer').addEventListener('click', ()=> customizer.classList.add('open'));
document.getElementById('close-customizer').addEventListener('click', ()=> customizer.classList.remove('open'));

// Aplicar gradiente y opciones
document.getElementById('apply-custom').addEventListener('click', ()=>{
const g1 = document.getElementById('grad1').value;
const g2 = document.getElementById('grad2').value;
const texture = document.getElementById('texture-select').value;
const glow = document.getElementById('accentGlow').value;
root.style.setProperty('--hero-gradient', `linear-gradient(135deg, ${g1}, ${g2})`);
root.style.setProperty('--accent-glow', glow);
document.body.dataset.texture = texture;
showToast('Personalización aplicada');
});

// Navegación y Stinger — control cinematográfico
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(a=> a.addEventListener('click', (e)=>{
e.preventDefault(); const target = document.querySelector(a.getAttribute('href'));
playStinger(()=> target.scrollIntoView({behavior:'smooth'}));
}));

function playStinger(cb){
stinger.classList.add('show');
setTimeout(()=>{ stinger.classList.remove('show'); if(cb) cb(); }, 650);
}

// IntersectionObserver para el active nav
const sections = document.querySelectorAll('main section');
const observer = new IntersectionObserver((entries)=>{
entries.forEach(e=>{
const id = e.target.id; const link = document.querySelector(`.nav a[href="#${id}"]`);
if(e.isIntersecting){ document.querySelectorAll('.nav a').forEach(n=>n.classList.remove('active')); if(link) link.classList.add('active'); }
});
},{threshold:0.55});
sections.forEach(s=>observer.observe(s));

// Carousels con parallax y transiciones fluidas
document.querySelectorAll('.carousel').forEach(car=>{
const type = car.dataset.type;
const track = car.querySelector('.track');
const prev = car.querySelector('.prev');
const next = car.querySelector('.next');
const dotsWrap = car.querySelector('.dots');
const imgs = [];
for(let i=1;i<=5;i++) imgs.push(`assets/gallery/${type}${i}.jpg`);
let idx=0;
function render(){
track.innerHTML = imgs.map(src=>`<img src="${src}" loading="lazy">`).join('');
const w = track.children[0] ? track.children[0].getBoundingClientRect().width : track.offsetWidth;
track.style.transform = `translateX(${-idx * (w + 6)}px)`;
dotsWrap.innerHTML = imgs.map((_,i)=>`<span class="dot ${i===idx? 'active':''}" data-i="${i}"></span>`).join('');
dotsWrap.querySelectorAll('.dot').forEach(d=> d.addEventListener('click', ()=>{ idx = Number(d.dataset.i); render(); }));
}
prev.addEventListener('click', ()=>{ idx = (idx-1+imgs.length)%imgs.length; render(); });
next.addEventListener('click', ()=>{ idx = (idx+1)%imgs.length; render(); });
// lazy initial render to compute widths after images load
setTimeout(render, 200);
});

// Member image microinteraction
document.querySelectorAll('.member img').forEach(img=>{ img.addEventListener('mousemove', ()=> img.style.transform='scale(1.03) translateY(-6px)'); img.addEventListener('mouseleave', ()=> img.style.transform=''); });


// Stinger audio optional (disabled by default)
let stingerAudio = null; // new Audio('assets/sfx/stinger.mp3');


// Logo scroll to top
document.getElementById('logo-mark').addEventListener('click', ()=>{ playStinger(()=> document.getElementById('home').scrollIntoView({behavior:'smooth'})); });


// Contact form placeholder
document.getElementById('contact-form').addEventListener('submit', (e)=>{ e.preventDefault(); showToast('Formulario enviado (simulado)'); });


// Small performance tweak: prefetch next gallery images
function prefetchImages(list){ list.forEach(src=>{ const i = new Image(); i.src = src; }); }
prefetchImages([ 'assets/gallery/sniper1.jpg','assets/gallery/sniper2.jpg','assets/gallery/sniper3.jpg' ]);


// Fin: guía rápida para reemplazar recursos
console.log('Landing v2.0 cargado — reemplaza assets/... con tus imágenes y sfx.');