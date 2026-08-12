const CONFIG = {
  whatsappNumber: "5511970446478",
  whatsappMessage: "Olá, Sávio! Encontrei seu site e gostaria de agendar uma avaliação.",
};

const whatsappReady = /^\d{12,13}$/.test(CONFIG.whatsappNumber);
document.querySelectorAll(".js-whatsapp").forEach((link) => {
  if (whatsappReady) {
    link.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
    link.target = "_blank";
    link.rel = "noopener";
  } else {
    link.href = "#contato";
    link.addEventListener("click", () => console.info("Substitua [DDI_DDD_NUMERO] no arquivo script.js pelo WhatsApp real."));
  }
});

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
menuButton.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});
mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible"));
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const filters = document.querySelectorAll(".filters button");
const galleryItems = document.querySelectorAll(".gallery-item");
filters.forEach((button) => button.addEventListener("click", () => {
  filters.forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  galleryItems.forEach((item) => {
    item.classList.toggle("hidden", button.dataset.filter !== "all" && item.dataset.category !== button.dataset.filter);
  });
}));

const reviews = [...document.querySelectorAll(".review")];
const counter = document.querySelector(".review-controls b");
let currentReview = 0;
function showReview(index) {
  currentReview = (index + reviews.length) % reviews.length;
  reviews.forEach((review, i) => review.classList.toggle("active", i === currentReview));
  counter.textContent = String(currentReview + 1).padStart(2, "0");
}
document.querySelector(".review-controls .prev").addEventListener("click", () => showReview(currentReview - 1));
document.querySelector(".review-controls .next").addEventListener("click", () => showReview(currentReview + 1));
document.getElementById("year").textContent = new Date().getFullYear();
