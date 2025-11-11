document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        const action = form.getAttribute("action") || "/contact";
        const response = await fetch(action, {
          method: "POST",
          body: formData
        });

        const result = await response.json();

        const messageDiv = document.createElement("div");
        messageDiv.textContent = result.success ? "Thank you! Your submission was successful." : "Oops! Something went wrong.";
        messageDiv.style.background = result.success ? "#4caf50" : "#f44336";
        messageDiv.style.color = "white";
        messageDiv.style.padding = "10px";
        messageDiv.style.marginTop = "10px";
        messageDiv.style.borderRadius = "5px";
        messageDiv.style.transition = "opacity 1s ease";
        form.appendChild(messageDiv);

        if (result.success) form.reset();

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
