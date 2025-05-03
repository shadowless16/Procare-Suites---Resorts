document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form")
  const formSuccess = document.getElementById("form-success")
  const sendAnotherBtn = document.getElementById("send-another")
  const submitBtn = document.getElementById("submit-btn")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Disable submit button and show loading state
      submitBtn.disabled = true
      submitBtn.textContent = "Sending..."

      // Simulate form submission with a timeout
      setTimeout(() => {
        // Hide the form and show success message
        contactForm.style.display = "none"
        formSuccess.style.display = "block"

        // Reset form
        contactForm.reset()

        // Reset button state
        submitBtn.disabled = false
        submitBtn.textContent = "Send Message"
      }, 1500)
    })
  }

  if (sendAnotherBtn) {
    sendAnotherBtn.addEventListener("click", () => {
      // Hide success message and show the form again
      formSuccess.style.display = "none"
      contactForm.style.display = "block"
    })
  }

  // Pre-select inquiry type if coming from another page
  const urlParams = new URLSearchParams(window.location.search)
  const subject = urlParams.get("subject")

  if (subject) {
    const inquiryTypeSelect = document.getElementById("inquiry-type")
    if (inquiryTypeSelect) {
      // Find the option that matches the subject parameter
      for (let i = 0; i < inquiryTypeSelect.options.length; i++) {
        if (inquiryTypeSelect.options[i].value === subject) {
          inquiryTypeSelect.selectedIndex = i
          break
        }
      }
    }
  }
})
