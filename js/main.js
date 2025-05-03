// Set current year in footer
document.addEventListener("DOMContentLoaded", () => {
  const yearElements = document.querySelectorAll("#current-year")
  const currentYear = new Date().getFullYear()

  yearElements.forEach((element) => {
    element.textContent = currentYear
  })

  // Mobile menu toggle
  const mobileMenuButton = document.querySelector(".mobile-menu-button")
  const mobileNav = document.querySelector(".mobile-nav")

  if (mobileMenuButton && mobileNav) {
    mobileMenuButton.addEventListener("click", () => {
      mobileNav.classList.toggle("active")

      // Change icon
      const icon = mobileMenuButton.querySelector("i")
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      } else {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  }
})
