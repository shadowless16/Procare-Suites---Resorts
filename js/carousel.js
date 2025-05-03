document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".carousel-slide")
  const indicators = document.querySelectorAll(".indicator")
  let currentIndex = 0
  let interval

  // Function to show a specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => {
      slide.classList.remove("active")
    })

    // Remove active class from all indicators
    indicators.forEach((indicator) => {
      indicator.classList.remove("active")
    })

    // Show the selected slide and indicator
    slides[index].classList.add("active")
    indicators[index].classList.add("active")

    // Update current index
    currentIndex = index
  }

  // Function to show the next slide
  function nextSlide() {
    let nextIndex = currentIndex + 1
    if (nextIndex >= slides.length) {
      nextIndex = 0
    }
    showSlide(nextIndex)
  }

  // Start automatic slideshow
  function startSlideshow() {
    interval = setInterval(nextSlide, 2500) // Change slide every 2.5 seconds
  }

  // Stop automatic slideshow
  function stopSlideshow() {
    clearInterval(interval)
  }

  // Add click event listeners to indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      stopSlideshow()
      showSlide(index)
      startSlideshow()
    })
  })

  // Initialize the slideshow
  if (slides.length > 0) {
    showSlide(0)
    startSlideshow()
  }
})
