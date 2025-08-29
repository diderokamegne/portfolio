// script.js - comportement (menu, theme, form)
(() => {
    const body = document.documentElement; // on applique la classe sur html for light theme
    const themeToggle = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');
    const nav = document.getElementById('main-nav');
    const menuBtn = document.getElementById('menu-toggle');
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    const yearEl = document.getElementById('year');
  
    // année dans le footer
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  
    // THEMING: conserver la préférence dans localStorage
    const THEME_KEY = 'didero_theme';
    function applyThemeFromStorage() {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light') {
        document.documentElement.classList.add('light');
        document.body.classList.remove('dark');
        themeToggle.textContent = '☀️';
      } else {
        // dark par défaut
        document.documentElement.classList.remove('light');
        document.body.classList.add('dark');
        themeToggle.textContent = '🌙';
      }
    }
    applyThemeFromStorage();
  
    themeToggle?.addEventListener('click', () => {
      const isLight = document.documentElement.classList.toggle('light');
      if (isLight) {
        localStorage.setItem(THEME_KEY, 'light');
        document.body.classList.remove('dark');
        themeToggle.textContent = '☀️';
      } else {
        localStorage.setItem(THEME_KEY, 'dark');
        document.body.classList.add('dark');
        themeToggle.textContent = '🌙';
      }
      // ✅ Animation Hero au chargement
gsap.from(".hero-left h1", { duration: 1, y: -50, opacity: 0, ease: "power2.out" });
gsap.from(".hero-left p", { duration: 1, y: 20, opacity: 0, delay: 0.3 });
gsap.from(".hero-cta a", { duration: 0.8, y: 20, opacity: 0, delay: 0.6, stagger: 0.2 });
gsap.from(".hero-right img", { duration: 1, scale: 0.8, opacity: 0, delay: 0.5 });
// ✅ Animation cartes Skills & Certifications au scroll
gsap.utils.toArray(".skills-grid .card, .projects-grid .project-card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.1
  });
});

    });
  
    // MENU (mobile)
    menuToggle?.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
      // toggle aria-expanded
      const expanded = document.body.classList.contains('menu-open');
      menuToggle.setAttribute('aria-expanded', String(expanded));
    });
  
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href === '#' || href === '') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        // close menu on mobile
        if (document.body.classList.contains('menu-open')) {
          document.body.classList.remove('menu-open');
          menuToggle.setAttribute('aria-expanded','false');
        }
      });
    });

    //Les boutons grossiront légèrement au survol et la photo aura un petit effet zoom + rotation. ✅ Hover boutons
document.querySelectorAll(".btn, .btn-outline").forEach(btn => {
  btn.addEventListener("mouseenter", () => gsap.to(btn, { scale: 1.05, duration: 0.2 }));
  btn.addEventListener("mouseleave", () => gsap.to(btn, { scale: 1, duration: 0.2 }));
});

// ✅ Hover photo hero
const heroImg = document.querySelector(".hero-right img");
heroImg?.addEventListener("mouseenter", () => gsap.to(heroImg, { scale: 1.05, rotation: 1, duration: 0.3 }));
heroImg?.addEventListener("mouseleave", () => gsap.to(heroImg, { scale: 1, rotation: 0, duration: 0.3 }));

  
    // Contact form (local demo only) — remplacer l'envoi par fetch API si tu as un endpoint
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      feedback.textContent = '';
      const data = new FormData(form);
      const name = data.get('name');
      const email = data.get('email');
      const msg = data.get('message');
  
      // validation simple
      if (!name || !email || !msg) {
        feedback.textContent = 'Veuillez remplir tous les champs.';
        return;
      }
  
      // Simuler envoi
      feedback.textContent = 'Envoi...';
      setTimeout(() => {
        feedback.textContent = 'Message envoyé ! Merci — je te réponds bientôt.';
        form.reset();
      }, 900);
    });
  
  })();
  
  // ✅ Bouton retour en haut
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "block"; // ✅ Affiche le bouton si on scrolle
  } else {
    backToTop.style.display = "none";  // ✅ Cache le bouton si on est en haut
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ Remonte en douceur
});
