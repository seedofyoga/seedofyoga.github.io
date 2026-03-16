# Architectural Patterns — Seed of Yoga

Recurring patterns used across the codebase. Each includes file:line references.

---

## 1. Section Layout Pattern

Every homepage section follows the same structure: full-width wrapper with padding, centered container, text-centered heading block.

- **Wrapper**: `py-16 md:py-24` with alternating `bg-sage-50` / `bg-cream`
- **Container**: `max-w-6xl mx-auto px-4 md:px-8` (or `max-w-5xl` for pricing)
- **Heading**: centered `h2` with `font-display tracking-display text-sage-900`, followed by a `text-sage-500` subtitle

Background alternation:

- `bg-sage-50`: schedule.html:1, about.html:1, blog-preview.html:1
- `bg-cream`: pricing.html:1, location.html:1, contact.html:1

Container examples: schedule.html:2, pricing.html:2, about.html:2

---

## 2. Data-Driven Content

Templates consume YAML from `data/` via `.Site.Data.*` with `range` loops and conditional rendering.

- **Schedule**: `{{ range .Site.Data.schedule.days }}` with nested `{{ range .classes }}` — schedule.html:11-14
- **Pricing**: `{{ range .Site.Data.pricing.plans }}` with conditional highlighted state — pricing.html:11-18
- **About**: Direct field access `{{ .Site.Data.about.name }}`, certifications via range — about.html:21-30
- **Contact**: `{{ .Site.Data.contact.phone }}`, `{{ .Site.Data.contact.email }}` — contact.html:12-25

Pattern: data files hold all content, templates are pure presentation. To change content, edit YAML only.

---

## 3. Card Component Pattern

Cards use rounded corners, shadow tokens, and hover elevation transitions.

- **Base**: `rounded-2xl` (or `rounded-xl` for smaller cards), `shadow-subtle`
- **Hover**: `hover:shadow-elevated` with `transition duration-300`
- **Group wrapper**: `group` class enables cascading hover states on children

Examples:

- Schedule class card: schedule.html:15 — `rounded-xl shadow-subtle hover:shadow-elevated`
- Pricing card: pricing.html:12-18 — conditional `shadow-floating` (highlighted) or `shadow-elevated`
- Blog preview card: blog-preview.html:12 — `rounded-2xl shadow-subtle hover:shadow-elevated`
- Blog list card: blog/list.html:13 — `rounded-2xl shadow-subtle hover:shadow-elevated`

Highlighted pricing card gets `-translate-y-3` and `border-2 border-rose-500` — pricing.html:14

---

## 4. Badge/Pill Pattern

Small labels using `text-xs font-medium px-2 py-0.5 rounded-full` with conditional color mapping.

- **Schedule level badges** — schedule.html:18-22
  - Beginner: `bg-gold-100 text-gold-500`
  - Intermediate: `bg-rose-100 text-rose-700`
  - All Levels: `bg-sage-100 text-sage-700`

- **Certification badges** — about.html:25-31
  - `bg-sage-100 text-sage-700 border border-sage-200`

- **"Most Popular" badge** — pricing.html:20-26
  - `bg-rose-500 text-cream text-xs font-bold uppercase`, positioned absolutely above card

- **Blog tags** — blog/list.html:35-39
  - `bg-sage-100 text-sage-500`

---

## 5. Button Pattern

Two button styles: primary (rose) and secondary (sage).

**Primary (rose)**:

- `bg-rose-500 text-cream font-semibold px-8 py-3.5 rounded-full shadow-elevated`
- Hover: `hover:bg-rose-700 hover:shadow-floating`
- Focus: `focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2`
- Examples: hero.html:35-38, pricing.html:51 (highlighted plan CTA)

**Secondary (sage)**:

- `bg-sage-100 text-sage-700 hover:bg-sage-200 hover:text-sage-900`
- Example: pricing.html:54 (regular plan CTA)

**Link-style CTA**:

- `text-rose-500 font-semibold border-b border-rose-300/50 hover:border-rose-500`
- Example: blog-preview.html:41-42

---

## 6. Image Treatment

Three-layer system applied consistently to all images:

1. **Image**: `object-cover w-full h-full` in a sized container
2. **Gradient overlay**: `absolute inset-0 bg-gradient-to-t from-sage-900/30 via-transparent to-transparent`
3. **Color tint**: `absolute inset-0 bg-sage-500/10 mix-blend-multiply`

Examples:

- About photo: about.html:6-12 — `aspect-[4/5]`, plus decorative accents at lines 15-16
- Blog preview image: blog-preview.html:14-18 — with `group-hover:scale-[1.03]`
- Blog list image: blog/list.html:15-19
- Blog single featured: blog/single.html:32-37 — `aspect-[16/9]`

---

## 7. Stretched Link Card

Makes entire card clickable via a pseudo-element overlay, keeping semantic HTML.

- **Parent**: `relative` positioning (via `group` which is also relative)
- **Link**: `<a class="after:absolute after:inset-0">` stretches clickable area to card bounds
- **Text inside link**: heading text, with actual content above/below in the card

Examples:

- Blog preview: blog-preview.html:12 (parent), line 26 (stretched link)
- Blog list: blog/list.html:13 (parent), line 27 (stretched link)

---

## 8. Responsive Strategy

Mobile-first with `md:` (768px) and `lg:` (1024px) breakpoints.

**Grids scale up**:

- Blog: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` — blog-preview.html:10
- Pricing: `grid-cols-1 md:grid-cols-3` — pricing.html:10
- About: `grid-cols-1 md:grid-cols-2` — about.html:3

**Schedule has 3 layouts** (unique in codebase):

- Mobile: list layout, `md:hidden` — schedule.html:54-77
- Tablet: 4-column grid, `hidden md:grid lg:hidden` — schedule.html:32-51
- Desktop: 7-column grid, `hidden lg:grid` — schedule.html:10-28

**Typography scales**: hero heading `text-4xl sm:text-5xl md:text-6xl lg:text-7xl` — hero.html:24

---

## 9. Interactive States

Three-tier interaction model applied globally and per-component.

**Global rules** (head.html):

- Focus visible: rose outline, 2px offset — head.html:82-86
- Active scale: 0.98 on all buttons/links — head.html:91-93
- Smooth transitions on `a` and `button` — head.html:88-90

**Group hover cascading** (components use `group` class):

- Contact cards: card bg + icon color + SVG color all change — contact.html:13-16
- Blog cards: image scales + heading color changes — blog-preview.html:12-25
- Schedule cards: shadow elevates on hover — schedule.html:15

**Per-element overrides**:

- Hero CTA: explicit `focus-visible:ring-2 focus-visible:ring-rose-300` — hero.html:38
- Pricing CTA: `hover:bg-rose-700 hover:shadow-elevated` — pricing.html:51

---

## 10. Navigation

Fixed nav with scroll spy and animated mobile hamburger.

**Structure** — nav.html:

- Fixed: `fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm` — line 1
- Height: `h-16 md:h-20` — line 2
- Logo + desktop links + mobile toggle

**Desktop links** — nav.html:10-19:

- `hidden md:flex`, styled `text-sm font-semibold tracking-wide uppercase text-sage-500`
- `data-section` attribute for scroll spy targeting — line 15

**Scroll spy** — nav.html:72-90:

- Intersection Observer on all `section[id]` elements
- Root margin: `-20% 0px -75% 0px` — activates when section is in top 20-25% of viewport
- Toggles `text-sage-900` on active link — line 82

**Mobile menu** — nav.html:31-43:

- `max-h-0` collapsed, expands via `transition-[max-height]` — line 31
- Hamburger bars animate: top/bottom rotate 45deg, middle fades — lines 56-58
- Auto-closes on link click — lines 62-70
