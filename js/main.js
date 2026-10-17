/* =========================================================
   Washington Costa — Portfólio
   Tudo que é "editável" (contatos) fica no topo.
   ========================================================= */

// ---------- 1. Dados de contato (edite aqui) ----------
const CONFIG = {
  whatsappNumber: "5511962350981",
  whatsappMessage: "Olá, Washington! Conheci seu portfólio e gostaria de conversar sobre um projeto.",
  email: "costasantana980@gmail.com",
  github: "https://github.com/costadev22",
  linkedin: "https://www.linkedin.com/in/washington22/",
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- 2. Preenche os links de contato ----------
// Qualquer elemento com data-whatsapp, data-email, data-github ou data-linkedin recebe o link certo.
function setupContactLinks() {
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

  document.querySelectorAll("[data-whatsapp]").forEach((el) => (el.href = whatsappUrl));
  document.querySelectorAll("[data-email]").forEach((el) => (el.href = `mailto:${CONFIG.email}`));
  document.querySelectorAll("[data-email-text]").forEach((el) => (el.textContent = CONFIG.email));
  document.querySelectorAll("[data-github]").forEach((el) => (el.href = CONFIG.github));
  document.querySelectorAll("[data-linkedin]").forEach((el) => (el.href = CONFIG.linkedin));
}

// ---------- 3. Header: efeito de vidro ao rolar + menu do celular ----------
function setupHeader() {
  const header = document.getElementById("header");
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("icon-open");
  const iconClose = document.getElementById("icon-close");
  let menuOpen = false;

  function render() {
    const scrolled = window.scrollY > 20;
    header.classList.toggle("header-glass", scrolled || menuOpen);
    menu.classList.toggle("hidden", !menuOpen);
    iconOpen.classList.toggle("hidden", menuOpen);
    iconClose.classList.toggle("hidden", !menuOpen);
    menuBtn.setAttribute("aria-expanded", String(menuOpen));
    menuBtn.setAttribute("aria-label", menuOpen ? "Fechar menu" : "Abrir menu");
  }

  function setMenu(open) {
    menuOpen = open;
    render();
  }

  window.addEventListener("scroll", render, { passive: true });
  menuBtn.addEventListener("click", () => setMenu(!menuOpen));
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  window.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  // Se a janela crescer até o layout de desktop, fecha o menu do celular
  window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => e.matches && setMenu(false));

  render();
}

// ---------- 4. Título digitado no hero ----------
function setupTypedTitle() {
  const title = document.getElementById("typed-title");
  const textEl = document.getElementById("typed-text");
  const caret = document.getElementById("typed-caret");

  const prefix = "Transformo ideias em ";
  const highlight = "experiências digitais.";
  const total = prefix.length + highlight.length;

  title.setAttribute("aria-label", prefix + highlight);

  function paint(count) {
    const text = (prefix + highlight).slice(0, count);
    // Monta o texto com o destaque em gradiente (sem innerHTML com conteúdo externo)
    textEl.textContent = text.slice(0, prefix.length);
    const span = document.createElement("span");
    span.className = "text-gradient";
    span.textContent = text.slice(prefix.length);
    textEl.appendChild(span);
  }

  if (prefersReducedMotion) {
    paint(total);
    caret.classList.add("is-blinking");
    return;
  }

  let typed = 0;
  paint(0);
  const timer = setInterval(() => {
    typed += 1;
    paint(typed);
    if (typed >= total) {
      clearInterval(timer);
      caret.classList.add("is-blinking");
    }
  }, 60);
}

// ---------- 5. Animação de entrada ao rolar a página ----------
function setupReveal() {
  const items = document.querySelectorAll(".reveal");

  // Fallback: navegador sem IntersectionObserver mostra tudo
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -5% 0px" },
  );

  items.forEach((el) => {
    // O que já está na tela ao abrir (ex.: o hero) aparece na hora
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("is-visible");
    } else {
      observer.observe(el);
    }
  });
}

// ---------- 6. Ano do rodapé ----------
function setupYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// ---------- Início ----------
setupContactLinks();
setupHeader();
setupTypedTitle();
setupReveal();
setupYear();
