function handleSubmit(e) {
    e.preventDefault();
  
    const name = document.querySelector('input[placeholder="Name"]').value.trim();
    const phone = document.querySelector('input[placeholder="Mobile Number"]').value.trim();
    const checkbox = document.querySelector('input[type="checkbox"]').checked;
    const userCaptcha = document.getElementById("userCaptchaInput").value.trim();
    const actualCaptcha = document.getElementById("generatedCaptcha").value.trim();
  
    if (!name || !phone || !userCaptcha) {
      alert("Please fill in all the required fields.");
      return;
    }
  
    if (!checkbox) {
      alert("Please accept the Terms and Privacy Policy.");
      return;
    }
  
    if (userCaptcha !== actualCaptcha) {
      alert("Captcha does not match. Please try again.");
      generateCaptcha(); // refresh captcha
      return;
    }
  
    alert("🎉 Your consultation is booked! We'll contact you soon.");
    document.querySelector(".form-box").reset();
    generateCaptcha();
  }


  document.addEventListener("DOMContentLoaded", () => {
    // Existing form logic...
  
    // Attach consultation handlers
    const consultButtons = document.querySelectorAll(".consult-btn");
    consultButtons.forEach((btn) =>
      btn.addEventListener("click", () => handleConsultClick(btn))
    );
  });
  
  function handleConsultClick(button) {
    const treatment = button.dataset.treatment || "Consultation";
    alert(`✅ Consultation request recorded for: ${treatment}`);
    // Optional: Scroll to form
    const formSection = document.querySelector(".form-box");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const bookBtn = document.getElementById("bookAppointment");
    const formSection = document.querySelector(".form-box");
  
    if (bookBtn && formSection) {
      bookBtn.addEventListener("click", () => {
        formSection.scrollIntoView({ behavior: "smooth" });
      });
    }
  });
  