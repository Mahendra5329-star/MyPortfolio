# Mahendra LB — Portfolio Website

A clean, responsive, professional portfolio built with plain HTML, CSS, and JavaScript.

## Included

- Responsive navigation with mobile menu
- Hero, About, Skills, Projects, Journey, and Contact sections
- GitHub profile + public repository loading through the GitHub REST API
- Automatic project cards with repository and live-demo links
- Scroll progress indicator
- Back-to-top button
- Accessible labels and reduced-motion support
- No framework or build step required

## Folder structure

```text
mahendra-lb-portfolio/
├── index.html
├── README.md
├── assets/
├── css/
│   └── style.css
└── js/
    └── script.js
```

## Run locally

1. Open `index.html` in a modern browser.
2. For the GitHub project feed, use a local server such as VS Code Live Server or any simple static server.

## Deploy

This folder can be uploaded directly to GitHub Pages, Netlify, or Vercel as a static site.

## GitHub profile used

`https://github.com/Mahendra5329-star`

The portfolio is designed to keep the project list synchronized with the public repositories on that profile.

> **🎨 Theme Switching**
>
> This portfolio includes a built-in theme switcher with **six colour themes**:
> Midnight Blue *(default)*, Ocean, Royal Purple, Emerald, Sunset, and Clean Light.
>
> Click the **🎨 Theme** button in the navigation bar to open the theme menu and
> pick a palette. Your choice is saved in the browser's `localStorage` under the
> key `portfolio-theme`, so it stays applied the next time you visit.
>
> Each theme is defined as a `[data-theme="name"]` block of CSS custom properties
> in `style.css`. Switching a theme updates the `data-theme` attribute on the
> `<html>` element, and every component recolours instantly because all colours
> reference tokens like `var(--accent)` and `var(--surface)`.
>
> **To add your own theme:**
> 1. Add a new `[data-theme="yourname"] { ... }` block in `style.css` with the
>    nine theme variables (`--bg`, `--surface`, `--surface2`, `--text`, `--muted`,
>    `--accent`, `--accent2`, `--line`, `--nav`).
> 2. Add one button inside `#themeMenu` in `index.html`:
>    ```html
>    <button class="theme-option" data-theme="yourname">
>      <span class="swatch" style="background:#your-accent"></span>Your Theme Name
>    </button>
>    ```
> No JavaScript changes are needed — the existing switcher picks up any
> `.theme-option` automatically.
>
> The switcher also respects `prefers-reduced-motion`, so users who disable
> animations won't see the colour fade transitions.
