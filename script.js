document.addEventListener("DOMContentLoaded", () => {
  // 1️⃣ Booking button scroll to form
  const bookBtn = document.getElementById("bookAppointment");
  const formSection = document.querySelector(".form-box");

  if (bookBtn && formSection) {
    bookBtn.addEventListener("click", () => {
      formSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // 2️⃣ Free Consultation Button Scroll
  const consultButtons = document.querySelectorAll(".consult-btn");
  consultButtons.forEach((btn) =>
    btn.addEventListener("click", () => handleConsultClick(btn))
  );

  function handleConsultClick(button) {
    const treatment = button.dataset.treatment || "Consultation";
    showConfirmation(`✅ Consultation request recorded for: ${treatment}`, "success");

    const formSection = document.querySelector(".form-box");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  // 3️⃣ Form Submission Logic
  const form = document.querySelector(".form-box");
  const rightSection = document.querySelector(".right-section");
  const storedData = JSON.parse(localStorage.getItem("formSubmissions")) || [];

  if (form && rightSection) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector('input[placeholder="Name"]').value.trim();
      const phone = form.querySelector('input[placeholder="Mobile Number"]').value.trim();
      const checkbox = form.querySelector('input[type="checkbox"]').checked;
      const userCaptcha = document.getElementById("userCaptchaInput")?.value.trim();
      const actualCaptcha = document.getElementById("generatedCaptcha")?.value.trim();

      if (!name || !phone || !checkbox || !userCaptcha) {
        showConfirmation("❗ Please complete all fields and accept the terms.", "error");
        return;
      }

      if (userCaptcha !== actualCaptcha) {
        showConfirmation("⚠️ Captcha incorrect. Please try again.", "error");
        if (typeof generateCaptcha === "function") generateCaptcha();
        return;
      }

      const formData = {
        name,
        phone,
        timestamp: new Date().toISOString()
      };

      storedData.push(formData);
      localStorage.setItem("formSubmissions", JSON.stringify(storedData));

      form.reset();
      if (typeof generateCaptcha === "function") generateCaptcha();

      showConfirmation("✅ Your Free Consultation is Booked!", "success");
    });
  }

  // 4️⃣ Reusable UI feedback
  function showConfirmation(message, type = "success") {
    let existing = document.querySelector(".confirmation-message");
    if (existing) existing.remove();

    const msg = document.createElement("div");
    msg.className = `confirmation-message ${type}`;
    msg.textContent = message;
    document.querySelector(".right-section").appendChild(msg);

    setTimeout(() => msg.remove(), 4000);
  }
});
