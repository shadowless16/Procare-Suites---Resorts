document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector('.rooms-grid');
  if (!grid || typeof roomsData === 'undefined') return;
  grid.innerHTML = '';
  roomsData.forEach((room, idx) => {
    let priceHtml = `<p class="room-price">₦${room.price?.toLocaleString() || room.priceOptions[0].value.toLocaleString()}/night</p>`;
    let dropdownHtml = '';

    // Dropdown for 2 Bedroom Apartment
    if (room.priceOptions) {
      priceHtml = `<p class="room-price">₦<span class="apt-price">${room.priceOptions[0].value.toLocaleString()}</span>/night</p>`;
      dropdownHtml = `
        <label class="apt-dropdown-label">
          <select class="apt-dropdown" data-idx="${idx}">
            ${room.priceOptions.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
          </select>
        </label>
      `;
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
            ${dropdownHtml}
          </div>
        </div>
      </div>
    `;
  });

  // Apartment price dropdown logic
  document.querySelectorAll('.apt-dropdown').forEach(dropdown => {
    dropdown.addEventListener('change', function() {
      const idx = this.getAttribute('data-idx');
      const priceSpan = document.querySelectorAll('.apt-price')[idx];
      priceSpan.textContent = parseInt(this.value).toLocaleString();
    });
  });

  // Re-initialize sliders for dynamically loaded content
  if (typeof window.initRoomSliders === 'function') {
    window.initRoomSliders();
  } else if (typeof initRoomSliders === 'function') {
    initRoomSliders();
  }
});
