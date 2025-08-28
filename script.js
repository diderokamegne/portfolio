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
  