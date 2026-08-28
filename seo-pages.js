const SEO_CONFIG = {
  whatsappNumber: "5511970446478",
  googleAdsWhatsappConversion: "AW-18397988052/gcuSCOvHkekcENSJ7MRE"
};

const params = new URLSearchParams(window.location.search);
const veioDoGoogle = params.get("utm_source") === "google" || params.has("gclid");
const whatsappMessage = veioDoGoogle
  ? "Olá, Sávio! Vim pelo Google e gostaria de agendar uma avaliação."
  : "Olá, Sávio! Encontrei seu site e gostaria de agendar uma avaliação.";

document.querySelectorAll(".js-whatsapp").forEach((link) => {
  link.href = `https://wa.me/${SEO_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  link.target = "_blank";
  link.rel = "noopener";
});

document.addEventListener("click", (event) => {
  const link = event.target.closest("a.js-whatsapp");
  if (!link) return;
  const destination = new URL(link.href, window.location.href);
  const isWhatsapp = destination.hostname === "wa.me" && destination.pathname === `/${SEO_CONFIG.whatsappNumber}`;
  if (!isWhatsapp) return;

  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: SEO_CONFIG.googleAdsWhatsappConversion
    });
  }

  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead");
  }
});
