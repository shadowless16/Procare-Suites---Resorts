document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector('.rooms-grid');
  if (!grid || typeof roomsData === 'undefined') return;
  grid.innerHTML = '';
  roomsData.forEach((room, idx) => {
    let priceHtml = `<p class="room-price">₦${room.price.toLocaleString()}/night</p>`;
    // Toggle for 2 Bedroom Apartment
    let toggleHtml = '';
    if (room.priceAlt) {
      priceHtml = `<p class="room-price">₦<span class="apt-price">${room.price.toLocaleString()}</span>/night</p>`;
      toggleHtml = `<label class="apt-toggle-label"> <input type="checkbox" class="apt-toggle" data-idx="${idx}"> ₦110,000 Option </label>`;
    }
    const imagesHtml = room.images.map((img, i) => `<img src="${img}" alt="${room.name} image"${i === 0 ? ' class="active"' : ''}>`).join('');
    const amenitiesHtml = room.amenities.map(a => `<span class="amenity"><i class="${a.icon}"></i> ${a.label}</span>`).join('');
    grid.innerHTML += `
      <div class="room-card">
        <div class="room-image room-image-slider">
          <div class="room-img-slides">${imagesHtml}</div>
          <button class="room-img-slider-btn prev" aria-label="Previous Room Image"><i class="fas fa-chevron-left"></i></button>
          <button class="room-img-slider-btn next" aria-label="Next Room Image"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="room-details">
          <h3>${room.name}</h3>
          <p>${room.description}</p>
          <div class="room-amenities">${amenitiesHtml}</div>
          <div class="room-booking">
            ${priceHtml}
            <a href="booking.html?room=${room.bookingParam}" class="btn primary-btn">Book Now</a>
            ${toggleHtml}
          </div>
        </div>
      </div>
    `;
  });

  // Apartment price toggle logic
  document.querySelectorAll('.apt-toggle').forEach(toggle => {
    toggle.addEventListener('change', function() {
      const idx = this.getAttribute('data-idx');
      const priceSpan = document.querySelectorAll('.apt-price')[0];
      if (this.checked) {
        priceSpan.textContent = '110,000';
      } else {
        priceSpan.textContent = '80,000';
      }
    });
  });

  // Re-initialize sliders for dynamically loaded content
  if (typeof window.initRoomSliders === 'function') {
    window.initRoomSliders();
  } else if (typeof initRoomSliders === 'function') {
    initRoomSliders();
  }
});
