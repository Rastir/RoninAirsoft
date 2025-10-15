// Theme Toggle
const themeToggle = document.getElementById("themeToggle")
const html = document.documentElement

// Cargar tema guardado
const savedTheme = localStorage.getItem("theme") || "light"
html.setAttribute("data-theme", savedTheme)

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme")
  const newTheme = currentTheme === "light" ? "dark" : "light"

  html.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
})

// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle")
const navMenu = document.getElementById("navMenu")

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Cerrar menú al hacer click en un link
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Header scroll effect
const header = document.getElementById("header")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// Smooth scroll con offset para el header fijo
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = header.offsetHeight
      const targetPosition = target.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Carrusel de Galería
class Carousel {
  constructor(carouselId) {
    this.carousel = document.querySelector(`[data-carousel-id="${carouselId}"]`)
    this.track = this.carousel.querySelector(".carousel-track")
    this.slides = Array.from(this.track.children)
    this.prevBtn = document.querySelector(`[data-carousel="${carouselId}"].carousel-prev`)
    this.nextBtn = document.querySelector(`[data-carousel="${carouselId}"].carousel-next`)
    this.dotsContainer = document.querySelector(`[data-carousel-dots="${carouselId}"]`)

    this.currentIndex = 0
    this.slideWidth = this.slides[0].getBoundingClientRect().width

    this.init()
  }

  init() {
    // Crear dots
    this.slides.forEach((_, index) => {
      const dot = document.createElement("div")
      dot.classList.add("carousel-dot")
      if (index === 0) dot.classList.add("active")
      dot.addEventListener("click", () => this.goToSlide(index))
      this.dotsContainer.appendChild(dot)
    })

    this.dots = Array.from(this.dotsContainer.children)

    // Event listeners
    this.prevBtn.addEventListener("click", () => this.prevSlide())
    this.nextBtn.addEventListener("click", () => this.nextSlide())

    // Auto-resize
    window.addEventListener("resize", () => {
      this.slideWidth = this.slides[0].getBoundingClientRect().width
      this.updatePosition()
    })

    // Touch events para móvil
    let touchStartX = 0
    let touchEndX = 0

    this.carousel.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX
    })

    this.carousel.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX
      if (touchStartX - touchEndX > 50) {
        this.nextSlide()
      } else if (touchEndX - touchStartX > 50) {
        this.prevSlide()
      }
    })
  }

  updatePosition() {
    this.track.style.transform = `translateX(-${this.currentIndex * this.slideWidth}px)`

    // Actualizar dots
    this.dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex)
    })
  }

  goToSlide(index) {
    this.currentIndex = index
    this.updatePosition()
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length
    this.updatePosition()
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length
    this.updatePosition()
  }
}

// Inicializar carruseles
const carousels = ["sniper", "cqb", "support"]
carousels.forEach((id) => new Carousel(id))

// Animación de stinger transitions al hacer scroll
const stingerTransitions = document.querySelectorAll(".stinger-transition")

const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px",
}

const stingerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const stingerLine = entry.target.querySelector(".stinger-line")
      stingerLine.style.animation = "none"
      setTimeout(() => {
        stingerLine.style.animation = "stingerAnimation 1s ease-in-out"
      }, 10)
    }
  })
}, observerOptions)

stingerTransitions.forEach((transition) => {
  stingerObserver.observe(transition)
})

// Animación de entrada para elementos
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".value-card, .member-card, .event-card, .video-card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "0"
          entry.target.style.transform = "translateY(30px)"

          setTimeout(() => {
            entry.target.style.transition = "all 0.6s ease"
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, 100)

          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  elements.forEach((element) => {
    observer.observe(element)
  })
}

// Ejecutar animaciones cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", animateOnScroll)

// Form submission
const contactForm = document.querySelector(".contact-form")
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Aquí puedes agregar la lógica para enviar el formulario
  alert("¡Mensaje enviado! Nos pondremos en contacto contigo pronto.")
  contactForm.reset()
})

// Parallax effect en hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroGradient = document.querySelector(".hero-gradient")

  if (heroGradient && scrolled < window.innerHeight) {
    heroGradient.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})
