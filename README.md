# 🔥 EMBER — Fine Dining Cairo

[![Live Demo](https://img.shields.io/badge/Live%20Demo-eyadwebdevoloper.github.io-orange?style=for-the-badge)](https://eyadwebdevoloper.github.io)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)

A premium, single-page restaurant website for **EMBER** — Cairo's award-winning open-fire fine dining destination. Built with pure HTML, CSS, and vanilla JavaScript. No frameworks, no build step.

---

## 🌐 Live Preview

**[https://eyadwebdevoloper.github.io/ember](https://eyadwebdevoloper.github.io/ember)**

---

## ✨ Features

- **Animated Page Loader** — Full-screen flame SVG with a progress bar; dismissed once fonts and the hero image are ready, with a 3 s safety timeout
- **Custom Cursor** — Fork-and-knife SVG cursor with a smooth LERP-trailing ring (desktop / pointer devices only)
- **Hero Section** — Split-panel layout with lazy-loaded hero image, skeleton loader, and subtle scroll parallax
- **Interactive Menu Tabs** — Starters / Mains / Desserts / Wine panel switcher with animated entry and skeleton image loaders
- **Chef Profile** — Signature section with gallery and quote
- **Gallery** — Masonry-style photo grid with hover cursor state
- **Table Reservation Form** — Inline validation (required fields + email format), personalised confirmation state, and reset flow
- **Contact & Location** — Embedded Google Map, opening hours grid, and address block
- **Scroll Reveal** — `.rv` elements fade/slide in via IntersectionObserver
- **Sticky Nav** — Transparent on top, dark-glass blur on scroll; back-to-top button appears at 400 px
- **Mobile Drawer** — Full-screen slide-in hamburger menu with body scroll lock
- **Social Sidebar** — Vertical fixed icon strip (desktop)
- **Pre-footer CTA** — Urgency banner with direct reservation link
- **Custom Scrollbar** — 3 px gold-on-dark styling

---

## 🗂️ Project Structure

```
ember-restaurant/
├── index.html          # Full page markup
├── styles.css          # All styles (~2,900 lines, section-commented)
├── script.js           # Modular JS (Loader, Navigation, Hero + utilities)
├── images/
│   ├── hero-img.webp   # Hero background (replace before launch)
│   └── ...             # Other restaurant photography
├── attributions.txt    # Placeholder image licence notes
└── README.md           # This file
```

---

## 🎨 Design System

| CSS Variable | Value | Usage |
|---|---|---|
| `--ember` | `#FF4500` | Primary brand accent, CTAs |
| `--flame` | `#FF6B35` | Cursor, highlights |
| `--gold` | `#C29723` | Secondary accent, links |
| `--deep` | `#0A0602` | Page / nav background |
| `--ash` | `#130E06` | Card / section backgrounds |
| `--cream` | `#F5EDD8` | Body text |

**Fonts:** Playfair Display · Cormorant Garamond · Bebas Neue · Cinzel (all via Google Fonts)

---

## 🧩 JavaScript Architecture

`script.js` is split into four self-contained modules and a set of utility functions, all bootstrapped from a single `DOMContentLoaded` listener.

| Module / Function | Responsibility |
|---|---|
| `Loader` | Progress bar animation, font-ready dismissal, safety timeout |
| `Navigation` | Scroll-based nav bg, back-to-top, hamburger drawer, smooth anchors |
| `Hero` | Hero image preload + fade-in, custom cursor LERP, scroll parallax |
| `initImageLoaders()` | Skeleton → loaded class swap for all `.img-wrap` images |
| `initScrollReveal()` | IntersectionObserver for `.rv` elements |
| `initMenuTabs()` | Tab click → panel show/hide with reflow animation |
| `initReservationForm()` | Field validation, confirmation display, reset, min-date |

All timing constants are centralised in a top-level `CONFIG` object for easy tuning.

---

## 📱 Responsive Behaviour

| Breakpoint | Layout |
|---|---|
| `> 1024 px` | Full desktop — horizontal nav, split hero, multi-column menu grid |
| `768 px – 1024 px` | Tablet — compressed nav, 2-column grids |
| `< 768 px` | Mobile — hamburger drawer, single-column stacks, cursor hidden |

The custom cursor is suppressed on touch/non-pointer devices via `(hover: hover)` media query. Parallax is likewise skipped on mobile.

---

## 🖼️ Image Placeholder Notice

All images shipped with the template are **demonstration placeholders** sourced from Unsplash / Pexels. They must be replaced with your own licensed photography before going live. See `attributions.txt` for details.

Recommended dimensions:

| Image | Suggested Size |
|---|---|
| `hero-img.webp` | 1800 × 1200 px, WebP |
| Menu / gallery cards | 800 × 600 px, WebP |
| Chef portrait | 900 × 1100 px, WebP |

---

## 🚀 Deployment (GitHub Pages)

1. Ensure the repository is named to match your desired URL slug.
2. Push all files to the `main` branch root.
3. Go to **Settings → Pages** → source: `main` / `/ (root)`.
4. Your site will be live at:

```
https://eyadwebdevoloper.github.io/<repo-name>
```

> No build step or `npm install` required — GitHub Pages serves the files as-is.

---

## 🛠️ Local Development

```bash
git clone https://github.com/eyadwebdevoloper/<repo-name>.git
cd <repo-name>

# Option A — open directly
open index.html

# Option B — VS Code Live Server (recommended for image paths)
code .
# Install "Live Server" extension → right-click index.html → Open with Live Server
```

---

## 📄 License

© 2026 Eyad Ashraf. All rights reserved.

---

## 📞 Contact

**EMBER Restaurant** · 12 Zamalek Corniche, Cairo 11211, Egypt  
📞 +20 2 1234 5678 · ✉️ hello@emberrestaurant.com
