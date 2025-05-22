document.addEventListener("DOMContentLoaded", () => {
  // Use native date pickers only
  const checkInInput = document.getElementById("check-in")
  const checkOutInput = document.getElementById("check-out")

  // Booking form submission
  const bookingForm = document.getElementById("booking-form")
  const checkAvailabilityBtn = document.getElementById("check-availability-btn")
  const availableRooms = document.getElementById("available-rooms")
  const roomList = document.getElementById("room-list")
  const bookingSuccess = document.getElementById("booking-success")
  const bookingFormContainer = document.getElementById("booking-form-container")
  const bookingInfo = document.getElementById("booking-info")
  const newBookingBtn = document.getElementById("new-booking-btn")

  if (bookingForm) {
    bookingForm.addEventListener("submit", async function bookingSubmitHandler(e) {
      e.preventDefault()
      e.stopImmediatePropagation()
      bookingFormContainer.style.display = "none"
      bookingInfo.style.display = "none"
      availableRooms.style.display = "none"
      bookingSuccess.style.display = "block"
      bookingSuccess.querySelector("h2").textContent = "Booking Processing..."
      bookingSuccess.querySelector("p").textContent = "Thank you for your booking. We are processing your request and will contact you soon."
      bookingSuccess.scrollIntoView({ behavior: "smooth" })
      // Gather booking form data
      const guestNameInput = document.getElementById("guest-name")
      const guestEmailInput = document.getElementById("guest-email")
      const guestName = guestNameInput ? guestNameInput.value.trim() : ''
      const guestEmail = guestEmailInput ? guestEmailInput.value.trim() : ''
      const checkIn = checkInInput.value
      const checkOut = checkOutInput.value
      const guests = document.getElementById("adults").value
      const specialRequests = document.getElementById("special-requests").value

      // Validate required fields
      if (!guestName || !guestEmail) {
        alert("Full name and email are required to complete your booking.")
        bookingFormContainer.style.display = "block"
        bookingInfo.style.display = "block"
        bookingSuccess.style.display = "none"
        return
      }

      // Send booking data to backend
      try {
        const response = await fetch("https://procaresuites.com.ng/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            guest_name: guestName,
            guest_email: guestEmail,
            check_in: checkIn,
            check_out: checkOut,
            guests: guests,
            special_requests: specialRequests,
            room_type: document.getElementById("room-type") ? document.getElementById("room-type").value : ''
          })
        })
        const result = await response.json()
        if (result.success) {
          bookingSuccess.querySelector("h2").textContent = "Booking Confirmed!"
          bookingSuccess.querySelector("p").textContent = "Your booking has been successfully processed. We will contact you shortly."
        } else {
          showBookingErrorModal(result.message || "Booking failed. Please try again.")
          bookingSuccess.style.display = "none"
          bookingFormContainer.style.display = "block"
          bookingInfo.style.display = "block"
        }
      } catch (err) {
        showBookingErrorModal("An error occurred while submitting your booking. Please try again later.")
        bookingSuccess.style.display = "none"
        bookingFormContainer.style.display = "block"
        bookingInfo.style.display = "block"
      }
    }, { once: true })
  }

  // New booking button
  if (newBookingBtn) {
    newBookingBtn.addEventListener("click", () => {
      bookingSuccess.style.display = "none"
      bookingFormContainer.style.display = "block"
      bookingInfo.style.display = "block"
      bookingForm.reset()
      availableRooms.style.display = "none"
    })
  }

  // Pre-select room type if coming from rooms page
  const urlParams = new URLSearchParams(window.location.search)
  const roomParam = urlParams.get("room")
  if (roomParam) {
    const roomTypeSelect = document.getElementById("room-type")
    if (roomTypeSelect) {
      for (let i = 0; i < roomTypeSelect.options.length; i++) {
        if (roomTypeSelect.options[i].value === roomParam) {
          roomTypeSelect.selectedIndex = i
          break
        }
      }
    }
  }

  // Modal for booking errors
  const errorModal = document.createElement('div')
  errorModal.id = 'booking-error-modal'
  errorModal.style.display = 'none'
  errorModal.innerHTML = `
    <div style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.4);z-index:9999;display:flex;align-items:center;justify-content:center;">
      <div style="background:#fff;padding:2rem 2.5rem;border-radius:10px;max-width:90vw;box-shadow:0 2px 16px #0002;text-align:center;">
        <h3 style="color:#e11d48;margin-bottom:1rem;">Booking Error</h3>
        <div id="booking-error-message" style="color:#334155;font-size:1.1rem;margin-bottom:1.5rem;"></div>
        <button id="close-booking-error-modal" style="background:#2563eb;color:#fff;padding:0.5rem 1.5rem;border:none;border-radius:6px;font-size:1rem;cursor:pointer;">OK</button>
      </div>
    </div>
  `
  document.body.appendChild(errorModal)

  function showBookingErrorModal(message) {
    document.getElementById('booking-error-message').textContent = message
    errorModal.style.display = 'block'
  }
  document.getElementById('close-booking-error-modal').onclick = function() {
    errorModal.style.display = 'none'
  }
})
