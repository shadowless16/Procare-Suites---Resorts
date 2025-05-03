document.addEventListener("DOMContentLoaded", () => {
  // Initialize date pickers
  const checkInInput = document.getElementById("check-in")
  const checkOutInput = document.getElementById("check-out")

  if (checkInInput && checkOutInput) {
    // Initialize check-in date picker
    const checkInPicker = flatpickr(checkInInput, {
      minDate: "today",
      dateFormat: "Y-m-d",
      onChange: (selectedDates, dateStr) => {
        // Update the minimum date of check-out to be the day after check-in
        if (typeof checkOutPicker !== "undefined") {
          checkOutPicker.set("minDate", new Date(selectedDates[0]).fp_incr(1))

          // If check-out date is earlier than check-in date, reset it
          if (checkOutPicker.selectedDates[0] && checkOutPicker.selectedDates[0] <= selectedDates[0]) {
            checkOutPicker.setDate(new Date(selectedDates[0]).fp_incr(1))
          }
        }
      },
    })

    // Initialize check-out date picker
    const checkOutPicker = flatpickr(checkOutInput, {
      minDate: new Date().fp_incr(1),
      dateFormat: "Y-m-d",
    })
  }

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
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Disable button and show loading state
      checkAvailabilityBtn.disabled = true
      checkAvailabilityBtn.textContent = "Checking..."

      // Simulate availability check with a timeout
      setTimeout(() => {
        // Show available rooms
        availableRooms.style.display = "block"

        // Create mock room data
        const rooms = [
          {
            id: 1,
            type: "Standard Room",
            available: 3,
            price: "₦50,000",
          },
          {
            id: 2,
            type: "Deluxe Suite",
            available: 2,
            price: "₦75,000",
          },
          {
            id: 3,
            type: "Executive Suite",
            available: 1,
            price: "₦120,000",
          },
        ]

        // Clear previous results
        roomList.innerHTML = ""

        // Add room items to the list
        rooms.forEach((room) => {
          const roomItem = document.createElement("div")
          roomItem.className = "room-item"
          roomItem.innerHTML = `
            <div class="room-item-details">
              <h3>${room.type}</h3>
              <p>${room.available} room(s) available</p>
            </div>
            <div class="room-item-booking">
              <p class="room-item-price">${room.price}<span>/night</span></p>
              <button class="btn primary-btn book-now-btn" data-room-id="${room.id}">Book Now</button>
            </div>
          `
          roomList.appendChild(roomItem)
        })

        // Add event listeners to book now buttons
        const bookNowButtons = document.querySelectorAll(".book-now-btn")
        bookNowButtons.forEach((button) => {
          button.addEventListener("click", () => {
            // Disable all book now buttons
            bookNowButtons.forEach((btn) => {
              btn.disabled = true
              btn.textContent = "Processing..."
            })

            // Simulate booking process with a timeout
            setTimeout(() => {
              // Hide booking form and available rooms
              bookingFormContainer.style.display = "none"
              bookingInfo.style.display = "none"

              // Show booking success message
              bookingSuccess.style.display = "block"

              // Scroll to top
              window.scrollTo({ top: 0, behavior: "smooth" })
            }, 1500)
          })
        })

        // Reset button state
        checkAvailabilityBtn.disabled = false
        checkAvailabilityBtn.textContent = "Check Availability"

        // Scroll to available rooms
        availableRooms.scrollIntoView({ behavior: "smooth" })
      }, 1500)
    })
  }

  // New booking button
  if (newBookingBtn) {
    newBookingBtn.addEventListener("click", () => {
      // Hide success message
      bookingSuccess.style.display = "none"

      // Show booking form and info
      bookingFormContainer.style.display = "block"
      bookingInfo.style.display = "block"

      // Reset form
      bookingForm.reset()

      // Hide available rooms
      availableRooms.style.display = "none"
    })
  }

  // Pre-select room type if coming from rooms page
  const urlParams = new URLSearchParams(window.location.search)
  const roomParam = urlParams.get("room")

  if (roomParam) {
    const roomTypeSelect = document.getElementById("room-type")
    if (roomTypeSelect) {
      // Find the option that matches the room parameter
      for (let i = 0; i < roomTypeSelect.options.length; i++) {
        if (roomTypeSelect.options[i].value === roomParam) {
          roomTypeSelect.selectedIndex = i
          break
        }
      }
    }
  }
})
