/* ─────────────────────────────────────────────
           CONSTANTS & CONFIG
           Centralized configuration values
    ───────────────────────────────────────────── */
const CONFIG = {
  LOADER: {
    INITIAL_PROGRESS: 70,
    FINAL_PROGRESS: 100,
    BAR_FILL_DURATION: 400,
    MINIMUM_DISPLAY_TIME: 900,
    MAXIMUM_DISPLAY_TIME: 3000
  },
  SCROLL: {
    NAV_SHOW_THRESHOLD: 30,
    BACK_TO_TOP_THRESHOLD: 400
  },
  CURSOR: {
    LERP_EASING: 0.1
  },
  REVEAL: {
    THRESHOLD: 0.07,
    ROOT_MARGIN: '0px 0px -30px 0px'
  },
  HERO: {
    PARALLAX_SPEED: 0.06
  }
};

/* ─────────────────────────────────────────────
           LOADER MODULE
           Handles page loader animation, progress bar,
           font loading, and body scroll unlock.
    ───────────────────────────────────────────── */
const Loader = {
  // Cache DOM elements once
  el: document.getElementById("page-loader"),
  bar: document.getElementById("loaderBar"),

  /**
   * Initialize loader with initial progress and event listeners
   */
  init() {
    this.setInitialProgress();
    this.setupDismissal();
  },

  /**
   * Set initial progress bar width (quick 70% fill)
   */
  setInitialProgress() {
    this.bar.style.width = `${CONFIG.LOADER.INITIAL_PROGRESS}%`;
  },

  /**
   * Animate loader dismissal sequence
   */
  dismiss() {
    this.bar.style.width = `${CONFIG.LOADER.FINAL_PROGRESS}%`;
    setTimeout(() => {
      this.el.classList.add("hidden");
      document.body.classList.remove("loading");
    }, CONFIG.LOADER.BAR_FILL_DURATION);
  },

  /**
   * Setup font-ready + timeout dismissal logic
   */
  setupDismissal() {
    // Wait for fonts + minimum display time
    document.fonts.ready.then(() => {
      setTimeout(() => this.dismiss(), CONFIG.LOADER.MINIMUM_DISPLAY_TIME);
    });

    // Safety fallback timeout
    setTimeout(() => this.dismiss(), CONFIG.LOADER.MAXIMUM_DISPLAY_TIME);
  }
};

/* ─────────────────────────────────────────────
           NAVIGATION MODULE
           Handles nav background, back-to-top, hamburger,
           smooth scrolling, and reservation button.
    ───────────────────────────────────────────── */
const Navigation = {
  // Cache DOM elements once
  nav: document.getElementById("mainNav"),
  backTop: document.getElementById("backTop"),
  ham: document.getElementById("navHam"),
  drawer: document.getElementById("mDrawer"),
  resBtn: document.getElementById("navResBtn"),

  /**
   * Initialize all navigation event listeners
   */
  init() {
    this.setupScrollHandler();
    this.setupBackToTop();
    this.setupHamburger();
    this.setupDrawerLinks();
    this.setupReserveButton();
    this.setupSmoothAnchors();
  },

  /**
   * Handle scroll-based nav visibility and back-to-top
   */
  setupScrollHandler() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      this.nav.classList.toggle("bg", scrollY > CONFIG.SCROLL.NAV_SHOW_THRESHOLD);
      this.backTop.classList.toggle("vis", scrollY > CONFIG.SCROLL.BACK_TO_TOP_THRESHOLD);
    }, { passive: true });
  },

  /**
   * Smooth scroll to top
   */
  setupBackToTop() {
    this.backTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  },

  /**
   * Toggle hamburger menu drawer
   */
  setupHamburger() {
    this.ham.addEventListener("click", () => {
      const isOpen = this.ham.classList.toggle("open");
      this.drawer.classList.toggle("open", isOpen);
      this.ham.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
  },

  /**
   * Close drawer when nav links are clicked
   */
  setupDrawerLinks() {
    this.drawer.querySelectorAll(".dl").forEach((link) =>
      link.addEventListener("click", () => {
        this.ham.classList.remove("open");
        this.drawer.classList.remove("open");
        this.ham.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      })
    );
  },

  /**
   * Smooth scroll to reservation section
   */
  setupReserveButton() {
    this.resBtn?.addEventListener("click", () =>
      document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" })
    );
  },

  /**
   * Handle all anchor link smooth scrolling
   */
  setupSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }
};

/* ─────────────────────────────────────────────
           HERO MODULE
           Handles hero image preloading, parallax,
           and custom cursor interactions.
    ───────────────────────────────────────────── */
const Hero = {
  // Cache DOM elements once
  imgEl: document.getElementById("heroImg"),
  imgUrl: "images/hero-img.webp",
  cur: document.getElementById("cur"),
  curR: document.getElementById("curR"),

  // Cursor state
  mouseX: 0,
  mouseY: 0,
  ringX: 0,
  ringY: 0,

  /**
   * Initialize hero image loading and desktop-only features
   */
  init() {
    this.preloadHeroImage();
    if (window.matchMedia("(hover: hover)").matches) {
      this.setupCursor();
      this.setupParallax();
    }
  },

  /**
   * Preload hero image and fade in when ready
   */
  preloadHeroImage() {
    this.imgEl.style.backgroundImage = `url('${this.imgUrl}')`;
    const preloadImg = new Image();
    preloadImg.onload = () => this.imgEl.classList.add("loaded");
    preloadImg.src = this.imgUrl;
  },

  /**
   * Setup custom cursor with trailing ring effect
   */
  setupCursor() {
    document.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.cur.style.left = `${this.mouseX}px`;
      this.cur.style.top = `${this.mouseY}px`;
    });

    // Smooth trailing ring animation loop
    const animateRing = () => {
      this.ringX += (this.mouseX - this.ringX) * CONFIG.CURSOR.LERP_EASING;
      this.ringY += (this.mouseY - this.ringY) * CONFIG.CURSOR.LERP_EASING;
      this.curR.style.left = `${this.ringX}px`;
      this.curR.style.top = `${this.ringY}px`;
      requestAnimationFrame(animateRing);
    };
    animateRing();

    // Hover states for interactive elements
    document.querySelectorAll("a, button, .tab, .mc, .gal-item").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        this.cur.classList.add("hov");
        this.curR.classList.add("hov");
      });
      el.addEventListener("mouseleave", () => {
        this.cur.classList.remove("hov");
        this.curR.classList.remove("hov");
      });
    });
  },

  /**
   * Subtle parallax scroll effect on hero image
   */
  setupParallax() {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY * CONFIG.HERO.PARALLAX_SPEED;
      this.imgEl.style.transform = `scale(1) translateY(${offset}px)`;
    }, { passive: true });
  }
};

/* ─────────────────────────────────────────────
           UTILITY FUNCTIONS
           Reusable helpers for images, reveals, tabs, forms
    ───────────────────────────────────────────── */

/**
 * Initialize skeleton loaders for all .img-wrap elements
 */
function initImageLoaders() {
  document.querySelectorAll(".img-wrap img").forEach((img) => {
    const wrap = img.closest(".img-wrap");
    if (!wrap) return;

    if (img.complete && img.naturalWidth > 0) {
      wrap.classList.add("img-loaded");
    } else {
      img.addEventListener("load", () => wrap.classList.add("img-loaded"));
      img.addEventListener("error", () => wrap.classList.add("img-loaded"));
    }
  });
}

/**
 * Setup scroll reveal observer for .rv elements
 */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("on");
    }),
    {
      threshold: CONFIG.REVEAL.THRESHOLD,
      rootMargin: CONFIG.REVEAL.ROOT_MARGIN
    }
  );
  document.querySelectorAll(".rv").forEach((el) => observer.observe(el));
}

/**
 * Setup interactive menu tabs with panel switching
 */
function initMenuTabs() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.tab;
      if (tab.classList.contains("on")) return;

      // Update tab states
      document.querySelectorAll(".tab").forEach((t) => {
        t.classList.remove("on");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("on");
      tab.setAttribute("aria-selected", "true");

      // Switch panels
      document.querySelectorAll(".menu-panel").forEach((panel) => {
        panel.classList.remove("on", "panel-enter");
        panel.style.display = "none";
      });

      const targetPanel = document.getElementById(`tab-${targetId}`);
      if (targetPanel) {
        targetPanel.style.display = "grid";
        void targetPanel.offsetWidth; // Force reflow
        targetPanel.classList.add("on", "panel-enter");
        initImageLoaders(); // Refresh image loaders
      }
    });
  });

  // Show first panel on load
  document.getElementById("tab-starters")?.style.setProperty("display", "grid");
}

/**
 * Setup reservation form validation and confirmation
 */
function initReservationForm() {
  const resForm = document.getElementById("resForm");
  const resConfirm = document.getElementById("resConfirm");

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  document.getElementById("submitRes").addEventListener("click", () => {
    const fields = {
      fname: document.getElementById("fname"),
      lname: document.getElementById("lname"),
      rdate: document.getElementById("rdate"),
      rtime: document.getElementById("rtime"),
      rguests: document.getElementById("rguests"),
      remail: document.getElementById("remail")
    };

    let valid = true;
    Object.values(fields).forEach((field) => {
      field.classList.remove("invalid");
      if (!field.value.trim()) {
        field.classList.add("invalid");
        valid = false;
      }
    });

    if (!validateEmail(fields.remail.value)) {
      fields.remail.classList.add("invalid");
      valid = false;
    }

    if (!valid) {
      const firstError = resForm.querySelector(".invalid");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Show confirmation
    document.getElementById("confirmName").textContent = fields.fname.value;
    document.getElementById("confirmDetail").textContent =
      `${fields.rdate.value} · ${fields.rtime.value} · ${fields.rguests.value}`;

    resForm.style.display = "none";
    resConfirm.classList.add("show");
    resConfirm.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // Reset form
  document.getElementById("btnBack").addEventListener("click", () => {
    resConfirm.classList.remove("show");
    resForm.style.display = "grid";
    ["fname", "lname", "rdate", "rtime", "rguests", "remail", "rspecial", "roccasion"]
      .forEach((id) => document.getElementById(id)?.setAttribute("value", ""));
  });

  // Set min date to today
  document.getElementById("rdate")?.setAttribute("min", new Date().toISOString().split("T")[0]);

  // Clear errors on input
  document.querySelectorAll(".fg input, .fg select").forEach((el) => {
    ["input", "change"].forEach((event) =>
      el.addEventListener(event, () => el.classList.remove("invalid"))
    );
  });
}

/* ─────────────────────────────────────────────
           INITIALIZATION
           Kick off all modules and utilities
    ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize core modules
  Loader.init();
  Navigation.init();
  Hero.init();

  // Initialize utilities
  initImageLoaders();
  initScrollReveal();
  initMenuTabs();
  initReservationForm();
});