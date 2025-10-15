/* ==========================
   AIRSOFT LANDING V3.0 - SCRIPT
   ========================== */

// ---- Efecto Parallax Hero ----
document.addEventListener("mousemove", (e) => {
  const hero = document.querySelector(".hero");
  const x = (window.innerWidth - e.pageX * 2) / 100;
  const y = (window.innerHeight - e.pageY * 2) / 100;
  hero.style.transform = `translateX(${x}px) translateY(${y}px)`;
});

// ---- Control de fondo dinámico ----
const colorControls = document.querySelectorAll(".color-control");
colorControls.forEach(control => {
  control.addEventListener("input", updateBackground);
});

function updateBackground() {
  const color1 = document.querySelector("#color1").value;
  const color2 = document.querySelector("#color2").value;
  document.body.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
}


// ---- Efecto glitch temporal al cambiar secciones ----
function triggerGlitch() {
  const glitchOverlay = document.createElement("div");
  glitchOverlay.classList.add("glitch-overlay");
  document.body.appendChild(glitchOverlay);

  setTimeout(() => {
    glitchOverlay.classList.add("active");
  }, 50);

  setTimeout(() => {
    glitchOverlay.classList.remove("active");
    glitchOverlay.remove();
  }, 600);
}

document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    triggerGlitch();
    setTimeout(() => {
      document.querySelector(anchor.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    }, 300);
  });
});

// ---- Carrusel de imágenes ----
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = (i === index) ? "1" : "0";
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
  triggerStinger();
}

function triggerStinger() {
  const stinger = document.createElement("div");
  stinger.classList.add("stinger-transition");
  document.body.appendChild(stinger);

  setTimeout(() => {
    stinger.remove();
  }, 700);
}

setInterval(nextSlide, 5000); // Auto cambio cada 5 seg


// ---- Sonido al pasar botones ----
const buttons = document.querySelectorAll("button, .cta-btn, nav a");
buttons.forEach(btn => {
  btn.addEventListener("mouseenter", () => playHoverSound());
});

function playHoverSound() {
  const audio = new Audio("assets/sfx/ui_hover.mp3");
  audio.volume = 0.3;
  audio.play();
}

// ---- Efecto de interferencia en el fondo ----
const staticCanvas = document.createElement("canvas");
staticCanvas.classList.add("static-effect");
document.body.appendChild(staticCanvas);

const ctx = staticCanvas.getContext("2d");
staticCanvas.width = window.innerWidth;
staticCanvas.height = window.innerHeight;

function drawStatic() {
  const imageData = ctx.createImageData(staticCanvas.width, staticCanvas.height);
  const buffer = new Uint32Array(imageData.data.buffer);
  const len = buffer.length;
  for (let i = 0; i < len; i++) {
    buffer[i] = (255 << 24) | (Math.random() * 255) << 16 | (Math.random() * 255) << 8 | (Math.random() * 255);
  }
  ctx.putImageData(imageData, 0, 0);
}

setInterval(drawStatic, 100);

// ---- Ajuste al redimensionar ----
window.addEventListener("resize", () => {
  staticCanvas.width = window.innerWidth;
  staticCanvas.height = window.innerHeight;
});