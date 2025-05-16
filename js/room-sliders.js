window.initRoomSliders = function () {
  document.querySelectorAll('.room-image-slider').forEach(function(slider) {
    const imgs = slider.querySelectorAll('.room-img-slides img');
    const prevBtn = slider.querySelector('.room-img-slider-btn.prev');
    const nextBtn = slider.querySelector('.room-img-slider-btn.next');
    let current = 0;
    let autoSlideInterval;

    function showImg(idx) {
      imgs.forEach((img, i) => {
        img.classList.toggle('active', i === idx);
      });
    }

    function nextImg() {
      current = (current + 1) % imgs.length;
      showImg(current);
    }

    function prevImg() {
      current = (current - 1 + imgs.length) % imgs.length;
      showImg(current);
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(nextImg, 5000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    if (imgs.length > 0) {
      showImg(current);
      startAutoSlide();
      if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
          prevImg();
          stopAutoSlide();
          startAutoSlide();
        });
        nextBtn.addEventListener('click', function() {
          nextImg();
          stopAutoSlide();
          startAutoSlide();
        });
      }
      slider.addEventListener('mouseenter', stopAutoSlide);
      slider.addEventListener('mouseleave', startAutoSlide);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  window.initRoomSliders();
});
