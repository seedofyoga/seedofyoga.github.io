# CLAUDE.md — Seed of Yoga

## Project Overview

Seed of Yoga — single-page landing site with blog for a yoga studio in Boulder, CO.
Built with Hugo (static site generator), Tailwind CSS via CDN, vanilla JS.
Deployed to GitHub Pages via GitHub Actions.

## Tech Stack

- Hugo v0.147.1+ (extended), Tailwind CSS CDN with Typography plugin
- Google Fonts: DM Serif Display (headings) + Nunito Sans (body)
- Vanilla JS (mobile menu, Intersection Observer scroll spy)
- Puppeteer for screenshot testing

## Key Directories

| Path                           | Purpose                                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `layouts/partials/`            | Section components: hero, schedule, pricing, about, location, blog-preview, contact, nav, footer, head |
| `layouts/blog/`                | `list.html` (archive grid) + `single.html` (post page)                                                 |
| `layouts/_default/baseof.html` | Base template — nav + main + footer                                                                    |
| `layouts/index.html`           | Homepage — assembles partials in order                                                                 |
| `data/`                        | YAML data files consumed via `.Site.Data.*`                                                            |
| `content/blog/`                | Markdown blog posts with frontmatter                                                                   |
| `static/images/`               | Logo and static assets                                                                                 |
| `brand_assets/`                | Source brand files (logo.png)                                                                          |
| `hugo.toml`                    | Site config, nav menu, params                                                                          |
| `.github/workflows/`           | CI (`ci.yml`) and deploy (`deploy.yml`) workflows                                                      |

## Essential Commands

```
hugo server -D                      # Dev server at localhost:1313
hugo --minify                       # Production build -> public/
node serve.mjs                      # Static file server at localhost:3000 (serves public/)
node screenshot.mjs URL [label]     # Puppeteer screenshot -> temporary screenshots/
npm run format:check                # Check Prettier formatting
npm run format                      # Fix formatting
npm run test:unit                   # Unit tests (no Hugo needed)
npm run test:build                  # Build tests (needs public/)
npm test                            # Full test suite (builds Hugo first)
```

## Content Model

- **Blog posts**: `content/blog/*.md` — frontmatter: title, date, description, image, tags
- **Structured data** in `data/*.yaml`:
  - `schedule.yaml` — days[] -> classes[] (name, time, level)
  - `pricing.yaml` — plans[] (name, price, period, features[], highlighted)
  - `about.yaml` — instructor profile (name, title, photo, certifications[], bio)
  - `contact.yaml` — phone, email, address, social, hours, maps_embed
- Homepage sections pull from data files via `.Site.Data.{filename}`
- Nav menu defined in `hugo.toml` under `[menu]`

## Design System Quick Reference

- **Palette**: sage (primary green), rose (accent/CTAs), gold (tertiary), cream (#FAF8F4 background)
- Full color definitions in `layouts/partials/head.html:17-38`
- Shadow tokens (sage-tinted): subtle / elevated / floating — `head.html:44-47`
- Section backgrounds alternate `bg-sage-50` / `bg-cream`
- All interactive elements have hover + focus-visible + active states
- Global focus ring: rose-500 outline — `head.html:82-86`
- Global active scale: 0.98 — `head.html:91-93`

## Working With This Codebase

- **Add a homepage section**: create partial in `layouts/partials/`, add `{{ partial "name.html" . }}` to `layouts/index.html`
- **Add a blog post**: create `.md` in `content/blog/` with required frontmatter (title, date, description, image, tags)
- **Change schedule/pricing/contact**: edit the corresponding `data/*.yaml` file
- **Modify colors or typography**: edit `layouts/partials/head.html`
- **Invoke the `frontend-design` skill** before writing any frontend code

## Screenshot Workflow

- Start dev server in background before screenshotting
- Always screenshot from localhost: `node screenshot.mjs http://localhost:3000`
- Screenshots auto-save to `./temporary screenshots/screenshot-N.png`
- Read the PNG with the Read tool to visually compare against references
- Do at least 2 comparison rounds when matching a reference design

## Additional Documentation

- `.claude/docs/architectural_patterns.md` — design patterns, component conventions, responsive strategy
