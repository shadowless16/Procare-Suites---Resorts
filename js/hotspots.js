document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".hotspot-slide");
  const prevBtn = document.querySelector(".hotspot-slider-btn.prev");
  const nextBtn = document.querySelector(".hotspot-slider-btn.next");
  let current = 0;
  let autoSlideInterval;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === idx);
    });
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3500);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  if (prevBtn && nextBtn && slides.length > 0) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      stopAutoSlide();
      startAutoSlide();
    });
    nextBtn.addEventListener("click", () => {
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
    });
    showSlide(current);
    startAutoSlide();
    // Optional: Pause on hover
    const wrapper = document.querySelector('.hotspots-slides-wrapper');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', stopAutoSlide);
      wrapper.addEventListener('mouseleave', startAutoSlide);
    }
  }
});
