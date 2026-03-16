# Seed of Yoga

*Nurturing your practice from seed to bloom*

A single-page landing site with blog for a yoga studio in Boulder, CO.
Built with Hugo and styled with Tailwind CSS, the site is fully data-driven — class schedules, pricing plans, instructor bio, and contact details all live in simple YAML files.
Deployed automatically to GitHub Pages on every push.

## Features

- Responsive single-page design with seven sections: hero, schedule, pricing, about, location, blog preview, and contact
- Blog with archive grid and individual post pages
- Data-driven content — update the schedule, pricing, or contact info by editing a YAML file
- Scroll-spy navigation highlighting the current section as you scroll
- Mobile hamburger menu with smooth transitions
- Custom design system built on a sage / rose / gold / cream palette with layered sage-tinted shadows
- Automated GitHub Pages deployment via GitHub Actions

## Tech Stack

| Technology | Role |
|---|---|
| Hugo v0.147.1+ (extended) | Static site generator |
| Tailwind CSS (CDN) | Utility-first styling with Typography plugin |
| Google Fonts | DM Serif Display (headings) + Nunito Sans (body) |
| Vanilla JS | Mobile menu, Intersection Observer scroll spy |
| Puppeteer | Screenshot testing |
| GitHub Actions | CI/CD deployment to GitHub Pages |

## Getting Started

**Prerequisites:** Hugo v0.147.1+ (extended edition), Node.js (for screenshot tooling only).

```bash
# Clone the repository
git clone <repo-url>
cd seedofyoga

# Install Node dependencies (screenshot tooling only)
npm install

# Start development server
hugo server -D
# Site available at http://localhost:1313
```

Production build:

```bash
hugo --minify
# Output in ./public/
```

## Project Structure

```
seedofyoga/
├── hugo.toml              # Site configuration and nav menu
├── content/blog/          # Markdown blog posts
├── data/                  # YAML data files
│   ├── schedule.yaml      #   Weekly class schedule
│   ├── pricing.yaml       #   Membership plans
│   ├── about.yaml         #   Instructor profile
│   └── contact.yaml       #   Contact info and social links
├── layouts/
│   ├── index.html         # Homepage (assembles partials)
│   ├── partials/          # Section components
│   ├── blog/              # Blog list + single templates
│   └── _default/          # Base template
├── static/images/         # Logo and static assets
└── .github/workflows/     # GitHub Pages deployment
```

## Content Management

### Adding a blog post

Create a new Markdown file in `content/blog/` with the following frontmatter:

```markdown
---
title: "Your Post Title"
date: 2026-03-16
description: "A short summary for the blog grid card."
image: "/images/your-image.jpg"
tags: ["yoga", "mindfulness"]
---

Post content goes here.
```

### Updating schedule, pricing, or contact info

Edit the corresponding file in `data/`:

- **Class schedule** — `data/schedule.yaml`
- **Membership plans** — `data/pricing.yaml`
- **Instructor profile** — `data/about.yaml`
- **Contact details and social links** — `data/contact.yaml`

Changes take effect on the next build or live-reload in dev mode.

## Deployment

Pushes to `main` trigger automatic deployment to GitHub Pages via the workflow in `.github/workflows/deploy.yml`. A manual trigger is also available through `workflow_dispatch`.

## License

ISC
