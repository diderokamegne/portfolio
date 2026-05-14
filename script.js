/* ============================================================
   DIDERO PORTFOLIO — script.js
   Features: theme toggle (persist), mobile menu,
             active nav on scroll, back-to-top, year
   ============================================================ */

(function () {
  "use strict";

  /* ── 1. Theme Toggle ─────────────────────────────────────── */
  const body        = document.body;
  const themeBtn    = document.getElementById("theme-toggle");
  const THEME_KEY   = "didero-theme";

  function applyTheme(theme) {
    if (theme === "light") {
      body.classList.remove("dark");
      body.classList.add("light");
      if (themeBtn) themeBtn.textContent = "☀️";
    } else {
      body.classList.remove("light");
      body.classList.add("dark");
      if (themeBtn) themeBtn.textContent = "🌙";
    }
  }

  // Load saved theme (default: dark)
  const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isDark = body.classList.contains("dark");
      const next   = isDark ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  /* ── 2. Mobile Menu Toggle ──────────────────────────────── */
  const menuBtn = document.getElementById("menu-toggle");
  const nav     = document.getElementById("main-nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", isOpen);
      menuBtn.textContent = isOpen ? "✕" : "☰";
    });

    // Close on nav link click (mobile)
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove("open");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ── 3. Active Nav Link on Scroll ──────────────────────── */
  const sections   = document.querySelectorAll("section[id]");
  const navLinks   = document.querySelectorAll(".nav-list a");

  function setActiveNav() {
    const scrollY = window.scrollY + 90; // offset for sticky header
    let current   = "";

    sections.forEach((sec) => {
      if (scrollY >= sec.offsetTop) {
        current = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  // Inject active style dynamically (avoids CSS coupling)
  const styleTag = document.createElement("style");
  styleTag.textContent = `
    .nav-list a.active {
      color: var(--accent) !important;
      background: var(--accent-glow) !important;
    }
  `;
  document.head.appendChild(styleTag);

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();

  /* ── 4. Back to Top ─────────────────────────────────────── */
  const backBtn = document.getElementById("back-to-top");

  if (backBtn) {
    window.addEventListener("scroll", () => {
      backBtn.classList.toggle("visible", window.scrollY > 400);
    }, { passive: true });

    backBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ── 5. Footer Year ─────────────────────────────────────── */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── 6. Smooth scroll for anchor links ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = 72; // header height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  /* ── 7. Scroll-reveal (lightweight, no lib needed) ──────── */
  const revealEls = document.querySelectorAll(
    ".card, .project-card, .timeline-item, .contact-form, .contact-aside"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation =
            "fadeUp .6s cubic-bezier(.4,0,.2,1) forwards";
          entry.target.style.opacity = "0";
          // stagger siblings
          const siblings = Array.from(
            entry.target.parentElement?.children || []
          );
          const idx = siblings.indexOf(entry.target);
          entry.target.style.animationDelay = idx * 0.08 + "s";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });

  /* ── 8. Header shadow on scroll ─────────────────────────── */
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.style.boxShadow =
        window.scrollY > 10
      ? "0 2px 24px rgba(59,130,246,.08)"
          : "none";
    }, { passive: true });
  }

})();
