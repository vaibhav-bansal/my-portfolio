# PRD: Product Manager Portfolio Website

## Overview

A portfolio website for Product Managers to showcase their work, thinking, impact, and personality — designed to land interviews and build personal brand.

---

## Problem Statement

Product Managers struggle to differentiate themselves in a competitive job market. Traditional resumes fail to communicate:

- How they think and approach problems
- The depth of their impact (not just job titles)
- Their taste, judgment, and communication skills
- Their personality and what makes them unique

**Current alternatives fall short:**

| Alternative | Why it fails |
|-------------|--------------|
| LinkedIn | Cluttered, everyone looks the same, limited storytelling |
| Resume/PDF | Static, no personality, can't show process |
| Notion portfolios | Generic templates, doesn't show "good taste" |
| No portfolio | Relying on interviews alone to communicate value |

---

## Target Users

| User | Goal |
|------|------|
| **Hiring Managers** | Quickly assess if PM can think clearly and ship |
| **Recruiters** | Find shareable proof of skills to pitch to clients |
| **Peers** | Discover and refer opportunities |
| **Portfolio Owner** | Articulate and maintain their professional narrative |

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Interview conversion | Increase callbacks after sharing portfolio |
| Time on site | > 2 minutes average |
| Case study views | > 50% of visitors read at least one |
| Contact submissions | Track inbound interest |

---

## Solution Overview

A personal portfolio website that:

- **Demonstrates taste** — Clean, intentional design shows judgment
- **Tells a story** — About page with personal narrative
- **Shows depth** — Case studies with process, not just outcomes
- **Proves impact** — Metrics and results front and center
- **Shares thinking** — Writing/content section with thought leadership
- **Enables contact** — Easy ways to reach out

---

## Features

### P0 — Must Have

| Feature | Description |
|---------|-------------|
| Work/Projects Page | Grid of projects with thumbnails, roles, and impact |
| Case Study Pages | Deep dives: Problem → Research → Solution → Outcome → Learnings |
| Content/Writing Section | Blog posts fetched from Notion via API |
| About Page | Personal story, philosophy, what drives you |
| Contact Page | Direct email, social links, functional contact form |
| Responsive Design | Mobile-first, works on all devices |
| CMS Integration | Sanity for projects, Notion for writing |

### P1 — Should Have

| Feature | Description |
|---------|-------------|
| Impact Metrics Section | Highlight quantified results |
| Philosophy/Framework Page | How you approach PM work |
| Testimonials | Quotes from colleagues |
| Resume/PDF Download | Traditional format option |

### P2 — Nice to Have

| Feature | Description |
|---------|-------------|
| Tools/Skills Section | Visual representation of technical skills |
| Career Timeline | Interactive journey through roles |
| Dark/Light Mode | Accessibility and polish |

---

## User Stories

### Hiring Manager

```
As a hiring manager,
I want to quickly assess if this PM can think clearly and ship,
So that I can decide whether to schedule an interview.

Acceptance Criteria:
- [ ] Can assess quality within 30 seconds
- [ ] Case study shows process, not just outcome
- [ ] Contact info is easy to find
```

### Portfolio Owner

```
As the portfolio owner,
I want to easily update my projects and content,
So that my portfolio stays current without engineering effort.

Acceptance Criteria:
- [ ] No code changes required for content updates
- [ ] Can add/edit/remove projects via Sanity
- [ ] Writing syncs from Notion automatically
```

### Recruiter

```
As a recruiter,
I want to quickly find shareable proof of this PM's skills,
So that I can pitch them to my client.

Acceptance Criteria:
- [ ] Key metrics are visible without deep reading
- [ ] Contact info is prominent
- [ ] Easy to share links to case studies
```

---

## Out of Scope

- Multi-language support
- E-commerce or paid content
- User accounts or authentication
- Newsletter/email subscription (for now)

---

## Features Already Implemented ✅

| Feature | Status | Notes |
|---------|--------|-------|
| Work page with project cards | ✅ Shipped | Grid layout with thumbnails |
| Project modal with details | ✅ Shipped | Click to expand |
| About page | ✅ Shipped | Personal info from Sanity |
| Contact page (social links) | ✅ Shipped | LinkedIn, GitHub, Twitter, Medium |
| Contact form | 🚫 Hidden | Needs webhook setup |
| Sanity CMS integration | ✅ Shipped | Projects, social links, personal info |
| Responsive design | ✅ Shipped | Mobile + desktop |
| Navigation | ✅ Shipped | Clean header |
| Footer | ✅ Shipped | Consistent across pages |

---

## Technical Stack

| Component | Technology |
|-----------|------------|
| Frontend | React + Vite + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| CMS (Projects) | Sanity |
| CMS (Writing) | Notion via API |
| Deployment | TBD (Vercel recommended) |
| Analytics | Microsoft Clarity |
