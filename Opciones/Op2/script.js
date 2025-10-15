// Theme Toggle
const themeToggle = document.getElementById("themeToggle")
const html = document.documentElement

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem("theme") || "light"
html.setAttribute("data-theme", currentTheme)

themeToggle.addEventListener("click", () => {
  const theme = html.getAttribute("data-theme")
  const newTheme = theme === "light" ? "dark" : "light"

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

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Carousel Functionality
class Carousel {
  constructor(carouselElement) {
    this.carousel = carouselElement
    this.track = this.carousel.querySelector(".carousel-track")
    this.slides = Array.from(this.track.children)
    this.nextButton = this.carousel.querySelector(".carousel-btn-next")
    this.prevButton = this.carousel.querySelector(".carousel-btn-prev")
    this.carouselType = this.carousel.getAttribute("data-carousel")
    this.indicatorsContainer = document.querySelector(`[data-indicators="${this.carouselType}"]`)

    this.currentIndex = 0
    this.slideWidth = this.slides[0].getBoundingClientRect().width

    this.init()
  }

  init() {
    // Create indicators
    this.createIndicators()

    // Set initial position
    this.updateSlidePosition()

    // Event listeners
    this.nextButton.addEventListener("click", () => this.moveToNextSlide())
    this.prevButton.addEventListener("click", () => this.moveToPrevSlide())

    // Auto-resize on window resize
    window.addEventListener("resize", () => {
      this.slideWidth = this.slides[0].getBoundingClientRect().width
      this.updateSlidePosition()
    })

    // Touch events for mobile swipe
    let touchStartX = 0
    let touchEndX = 0

    this.carousel.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX
    })

    this.carousel.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX
      this.handleSwipe(touchStartX, touchEndX)
    })
  }

  createIndicators() {
    this.slides.forEach((_, index) => {
      const indicator = document.createElement("div")
      indicator.classList.add("carousel-indicator")
      if (index === 0) indicator.classList.add("active")

      indicator.addEventListener("click", () => {
        this.currentIndex = index
        this.updateSlidePosition()
        this.updateIndicators()
      })

      this.indicatorsContainer.appendChild(indicator)
    })

    this.indicators = Array.from(this.indicatorsContainer.children)
  }

  updateSlidePosition() {
    this.track.style.transform = `translateX(-${this.currentIndex * this.slideWidth}px)`
  }

  updateIndicators() {
    this.indicators.forEach((indicator, index) => {
      if (index === this.currentIndex) {
        indicator.classList.add("active")
      } else {
        indicator.classList.remove("active")
      }
    })
  }

  moveToNextSlide() {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++
    } else {
      this.currentIndex = 0
    }
    this.updateSlidePosition()
    this.updateIndicators()
  }

  moveToPrevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--
    } else {
      this.currentIndex = this.slides.length - 1
    }
    this.updateSlidePosition()
    this.updateIndicators()
  }

  handleSwipe(startX, endX) {
    const swipeThreshold = 50
    const diff = startX - endX

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.moveToNextSlide()
      } else {
        this.moveToPrevSlide()
      }
    }
  }
}

// Initialize all carousels
const carousels = document.querySelectorAll(".carousel")
carousels.forEach((carousel) => new Carousel(carousel))

// Contact Form Handling
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const data = Object.fromEntries(formData)

  console.log("[v0] Form submitted with data:", data)

  // Show success message (in a real app, this would send to a server)
  alert("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.")
  contactForm.reset()
})

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerOffset = 100
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Add scroll effect to header
let lastScroll = 0
const header = document.querySelector(".header")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    header.style.boxShadow = `0 2px 10px var(--shadow)`
  } else {
    header.style.boxShadow = "none"
  }

  lastScroll = currentScroll
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all cards and sections
const animatedElements = document.querySelectorAll(".valor-card, .miembro-card, .evento-card, .video-card")
animatedElements.forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

console.log("[v0] Airsoft landing page initialized successfully")
