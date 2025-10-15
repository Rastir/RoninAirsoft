// Theme Toggle
const themeToggle = document.getElementById("themeToggle")
const html = document.documentElement

// Check for saved theme preference or default to 'light'
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

// Navbar scroll effect
const navbar = document.getElementById("navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Form submission
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const data = Object.fromEntries(formData)

  // Here you would typically send the data to a server
  console.log("Form submitted:", data)

  // Show success message (you can customize this)
  alert("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.")

  // Reset form
  contactForm.reset()
})

// Intersection Observer for animations
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

// Observe all sections
document.querySelectorAll(".section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(section)
})

// Gallery lightbox effect (simple version)
const galeriaItems = document.querySelectorAll(".galeria-item")

galeriaItems.forEach((item) => {
  item.addEventListener("click", () => {
    // You can implement a full lightbox here
    console.log("Gallery item clicked")
  })
})

// Active nav link on scroll
const sections = document.querySelectorAll(".section")
const navLinksArray = Array.from(navLinks)

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinksArray.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Parallax effect for hero section
const hero = document.querySelector(".hero")

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallax = scrolled * 0.5

  if (hero) {
    hero.style.transform = `translateY(${parallax}px)`
  }
})

// Counter animation for stats
const statNumbers = document.querySelectorAll(".stat-number")

const animateCounter = (element) => {
  const target = Number.parseInt(element.textContent)
  const duration = 2000
  const increment = target / (duration / 16)
  let current = 0

  const updateCounter = () => {
    current += increment
    if (current < target) {
      element.textContent = Math.floor(current) + "+"
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target + "+"
    }
  }

  updateCounter()
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

statNumbers.forEach((stat) => {
  statsObserver.observe(stat)
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)
})
