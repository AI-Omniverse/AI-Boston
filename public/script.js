document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");

  // 🔗 Your Google Apps Script URL
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw5yrGGxZ4KcXZ-3eRCMPuN1nf224bhscSFrhJtIWKz8yWkhL18oxr6xYP8Cp6a11H7gA/exec";

  // 🌍 Auto capture
  const domain = window.location.hostname;
  const page = window.location.pathname;

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      // =========================
      // 🧠 Detect form type
      // =========================
      let formType = "contact";

      if (form.id === "newsletter-form") {
        formType = "newsletter";
      } else if (form.id === "contact-form") {
        formType = "contact";
      }

      // =========================
      // ➕ Append extra data
      // =========================
      formData.append("formType", formType);
      formData.append("domain", domain);
      formData.append("page", page);

      // Convert to JSON for Apps Script
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch(SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify(data)
        });

        const result = await response.json();

        // =========================
        // ✅ UI Feedback (your same style)
        // =========================
        const messageDiv = document.createElement("div");
        messageDiv.textContent =
          result.status === "success"
            ? "Thank you! Your submission was successful."
            : "Oops! Something went wrong.";

        messageDiv.style.background =
          result.status === "success" ? "#4caf50" : "#f44336";
        messageDiv.style.color = "white";
        messageDiv.style.padding = "10px";
        messageDiv.style.marginTop = "10px";
        messageDiv.style.borderRadius = "5px";
        messageDiv.style.transition = "opacity 1s ease";

        form.appendChild(messageDiv);

        if (result.status === "success") form.reset();

        setTimeout(() => {
          messageDiv.style.opacity = "0";
          setTimeout(() => messageDiv.remove(), 1000);
        }, 5000);
      } catch (error) {
        alert("Error submitting form: " + error.message);
      }
    });
  });
});
