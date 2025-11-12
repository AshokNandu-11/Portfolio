// script.js – theme toggle + section fix
(function () {
  const btn = document.getElementById("themeToggle");
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");

  if (saved === "light") {
    root.setAttribute("data-theme", "light");
    btn.textContent = "☀️";
  }

  btn.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    if (isLight) {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
      btn.textContent = "🌙";
    } else {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      btn.textContent = "☀️";
    }
  });

  // Smooth scroll for section links
  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const id = a.getAttribute("href").replace("#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  });
})();

// Initialize EmailJS
(function () {
  emailjs.init("NEiIrAXsqDQg3l3jh"); // your public key
})();

// Contact Form Submission
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const sendBtn = document.getElementById("sendBtn");
    const status = document.getElementById("form-status");
    sendBtn.disabled = true;
    status.textContent = "Sending message...";

    const params = {
      from_name: document.getElementById("name").value,
      email_id: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    emailjs
      .send("service_ic11ozq", "template_areyp8a", params) // Service ID and TemplateID of EmailJS
      .then(() => {
        status.textContent = "✅ Message sent successfully!";
        status.style.color = "#22c55e";
        sendBtn.disabled = false;
        document.getElementById("contact-form").reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        status.textContent = "❌ Message failed. Check your EmailJS setup.";
        status.style.color = "#ef4444";
        sendBtn.disabled = false;
      });
  });
