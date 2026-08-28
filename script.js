const CONFIG = {
  whatsappNumber: "5511970446478",
  whatsappMessage: "Olá, Sávio! Encontrei seu site e gostaria de agendar uma avaliação.",
  googleAdsWhatsappConversion: "AW-18397988052/gcuSCOvHkekcENSJ7MRE",
  googleAdsConversionValue: 1.0,
  googleAdsCurrency: "BRL",
};

function gtag_report_conversion() {
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: CONFIG.googleAdsWhatsappConversion,
      value: CONFIG.googleAdsConversionValue,
      currency: CONFIG.googleAdsCurrency,
    });
  }
  return false;
}
window.gtag_report_conversion = gtag_report_conversion;

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

// Um único listener evita múltiplos disparos e só registra conversão quando o
// clique realmente aponta para o WhatsApp configurado neste site.
document.addEventListener("click", (event) => {
  const link = event.target.closest("a.js-whatsapp");
  if (!link || !whatsappReady) return;

  const destination = new URL(link.href, window.location.href);
  const isConfiguredWhatsapp =
    destination.protocol === "https:" &&
    destination.hostname === "wa.me" &&
    destination.pathname === `/${CONFIG.whatsappNumber}`;

  if (isConfiguredWhatsapp) gtag_report_conversion();
});

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
function closeMobileMenu() {
  mobileMenu.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
}
menuButton.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});
mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMobileMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileMenu.classList.contains("open")) {
    closeMobileMenu();
    menuButton.focus();
  }
});

const header = document.querySelector(".header");
function updateHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 10);
}
updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

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
    const isAll = button.dataset.filter === "all";
    item.classList.toggle("hidden", isAll ? item.classList.contains("gallery-extra") : item.dataset.category !== button.dataset.filter);
  });
}));
filters[0]?.click();

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

const LANGUAGE_COPY = {
  en: {
    "Ir para o conteúdo":"Skip to content","Especialidades":"Expertise","Resultados":"Results","Sobre":"About","Contato":"Contact",
    "Agendar horário":"Book an appointment","Agendar avaliação":"Book a consultation","Ver transformações":"See transformations","Agendar":"Book now",
    "ESPECIALISTA EM LOIRAS · SÃO PAULO":"BLONDE SPECIALIST · SÃO PAULO","Loiro planejado.":"Blonde, thoughtfully designed.","Fios preservados.":"Healthy hair, always.",
    "Antes de qualquer coloração, um diagnóstico individual define o tom, o tempo de processo e os cuidados necessários. Você sai com o loiro combinado e os fios tão saudáveis quanto entraram.":"Before any colour service, a personal consultation defines the shade, processing time and care your hair needs. You leave with the blonde we agreed on and hair as healthy as when you arrived.",
    "DESCUBRA":"DISCOVER","44 avaliações no Google":"44 Google reviews","Aclimação":"Aclimação","Spettacolo Salon":"Spettacolo Salon","Parceiro oficial":"Official partner","Truss Professional":"Truss Professional",
    "DIAGNÓSTICO ANTES DA TÉCNICA":"CONSULTATION BEFORE TECHNIQUE","Antes de decidir a cor,":"Before choosing the colour,","eu decido o que seus fios aguentam.":"I assess what your hair can safely handle.",
    "Histórico químico, espessura, porosidade e o tom que você já teve: é esse exame que define até onde a cor pode ir sem comprometer a estrutura do fio, antes de qualquer produto ser aberto.":"Chemical history, thickness, porosity and previous colour: this assessment determines how far we can go without compromising your hair, before any product is opened.",
    "ESPECIALIDADES":"EXPERTISE","Técnica, olhar e intenção.":"Technique, vision and intention.","Loiras":"Blondes","Morena iluminada":"Brunette balayage","Ruivas":"Reds","Cacheadas":"Curly hair","Cortes femininos":"Women's cuts",
    "TRANSFORMAÇÕES REAIS":"REAL TRANSFORMATIONS","Resultados que falam por si.":"Results that speak for themselves.","Todos":"All","Morenas":"Brunettes","Cortes":"Cuts","Ver mais no Instagram":"See more on Instagram",
    "SÁVIO FIGUEIREDO":"SÁVIO FIGUEIREDO","Beleza não se impõe. Ela se revela.":"Beauty is not imposed. It is revealed.","no Google":"on Google","avaliações":"reviews","personalizado":"tailored",
    "PARCEIRO OFICIAL":"OFFICIAL PARTNER","Performance profissional. Cuidado que dura.":"Professional performance. Lasting care.","A EXPERIÊNCIA":"THE EXPERIENCE","Do diagnóstico ao resultado.":"From consultation to result.",
    "Conversa":"Conversation","Diagnóstico":"Consultation","Criação":"Creation","Continuidade":"Aftercare","DÚVIDAS FREQUENTES":"FREQUENT QUESTIONS","Antes de agendar.":"Before booking.",
    "Como você evita um resultado diferente do que eu esperava?":"How do you prevent a result different from what I expected?","Como funciona a avaliação?":"How does the consultation work?","Quanto tempo dura uma transformação?":"How long does a transformation take?","Como saber o valor do serviço?":"How is the service price determined?","Onde fica o salão?":"Where is the salon?",
    "SEU NOVO CABELO COMEÇA AQUI":"YOUR NEW HAIR STARTS HERE","Pronta para se transformar?":"Ready for your transformation?","Agendar pelo WhatsApp":"Book via WhatsApp","ATENDIMENTO COM HORA MARCADA":"BY APPOINTMENT ONLY","LOCALIZAÇÃO":"LOCATION","HORÁRIOS":"HOURS","CONTATO":"CONTACT","Como chegar":"Directions","Todos os direitos reservados.":"All rights reserved."
  },
  es: {
    "Ir para o conteúdo":"Ir al contenido","Especialidades":"Especialidades","Resultados":"Resultados","Sobre":"Sobre Sávio","Contato":"Contacto",
    "Agendar horário":"Reservar cita","Agendar avaliação":"Reservar evaluación","Ver transformações":"Ver transformaciones","Agendar":"Reservar",
    "ESPECIALISTA EM LOIRAS · SÃO PAULO":"ESPECIALISTA EN RUBIOS · SÃO PAULO","Loiro planejado.":"Rubio planificado.","Fios preservados.":"Cabello protegido.",
    "Antes de qualquer coloração, um diagnóstico individual define o tom, o tempo de processo e os cuidados necessários. Você sai com o loiro combinado e os fios tão saudáveis quanto entraram.":"Antes de cualquier coloración, una evaluación individual define el tono, el tiempo de proceso y los cuidados necesarios. Sales con el rubio acordado y el cabello tan saludable como cuando llegaste.",
    "DESCUBRA":"DESCUBRE","44 avaliações no Google":"44 reseñas en Google","Parceiro oficial":"Socio oficial","DIAGNÓSTICO ANTES DA TÉCNICA":"EVALUACIÓN ANTES DE LA TÉCNICA","Antes de decidir a cor,":"Antes de decidir el color,","eu decido o que seus fios aguentam.":"evalúo lo que tu cabello puede soportar.",
    "ESPECIALIDADES":"ESPECIALIDADES","Técnica, olhar e intenção.":"Técnica, mirada e intención.","Loiras":"Rubios","Morena iluminada":"Morena iluminada","Ruivas":"Pelirrojas","Cacheadas":"Rizadas","Cortes femininos":"Cortes femeninos",
    "TRANSFORMAÇÕES REAIS":"TRANSFORMACIONES REALES","Resultados que falam por si.":"Resultados que hablan por sí solos.","Todos":"Todos","Morenas":"Morenas","Cortes":"Cortes","Ver mais no Instagram":"Ver más en Instagram",
    "Beleza não se impõe. Ela se revela.":"La belleza no se impone. Se revela.","no Google":"en Google","avaliações":"reseñas","personalizado":"personalizado","PARCEIRO OFICIAL":"SOCIO OFICIAL","Performance profissional. Cuidado que dura.":"Rendimiento profesional. Cuidado duradero.",
    "A EXPERIÊNCIA":"LA EXPERIENCIA","Do diagnóstico ao resultado.":"De la evaluación al resultado.","Conversa":"Conversación","Diagnóstico":"Evaluación","Criação":"Creación","Continuidade":"Continuidad","DÚVIDAS FREQUENTES":"PREGUNTAS FRECUENTES","Antes de agendar.":"Antes de reservar.",
    "Como você evita um resultado diferente do que eu esperava?":"¿Cómo evitas un resultado diferente al que esperaba?","Como funciona a avaliação?":"¿Cómo funciona la evaluación?","Quanto tempo dura uma transformação?":"¿Cuánto dura una transformación?","Como saber o valor do serviço?":"¿Cómo se determina el precio?","Onde fica o salão?":"¿Dónde está el salón?",
    "SEU NOVO CABELO COMEÇA AQUI":"TU NUEVO CABELLO EMPIEZA AQUÍ","Pronta para se transformar?":"¿Lista para transformarte?","Agendar pelo WhatsApp":"Reservar por WhatsApp","ATENDIMENTO COM HORA MARCADA":"ATENCIÓN CON CITA PREVIA","LOCALIZAÇÃO":"UBICACIÓN","HORÁRIOS":"HORARIOS","CONTATO":"CONTACTO","Como chegar":"Cómo llegar","Todos os direitos reservados.":"Todos los derechos reservados."
  }
};

const translatableNodes = [...document.querySelectorAll("body *")].flatMap((element) => [...element.childNodes]).filter((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
translatableNodes.forEach((node) => { node._ptText = node.textContent; });
function changeLanguage(lang) {
  const copy = LANGUAGE_COPY[lang] || {};
  translatableNodes.forEach((node) => {
    const original = node._ptText;
    const clean = original.trim();
    const translated = copy[clean] || clean;
    node.textContent = original.replace(clean, translated);
  });
  document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
  document.querySelectorAll("[data-lang]").forEach((button) => {
    const selected = button.dataset.lang === lang;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  const messages = {
    pt: "Olá, Sávio! Encontrei seu site e gostaria de agendar uma avaliação.",
    en: "Hello, Sávio! I found your website and would like to book a consultation.",
    es: "¡Hola, Sávio! Encontré tu sitio web y me gustaría reservar una evaluación."
  };
  document.querySelectorAll(".js-whatsapp").forEach((link) => { if (whatsappReady) link.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(messages[lang])}`; });
  localStorage.setItem("savio-language", lang);
}
document.querySelectorAll("[data-lang]").forEach((button) => button.addEventListener("click", () => changeLanguage(button.dataset.lang)));
changeLanguage(localStorage.getItem("savio-language") || "pt");
