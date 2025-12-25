# P0 Implementation Plan

## Scope

Three features to implement:

1. **Content/Writing Section** — Fetch posts from Notion, display on website
2. **Case Studies** — Deep-dive pages for select projects
3. **Contact Form** — Re-enable with functional submission

---

## 1. Content/Writing Section

### Overview

Display LinkedIn posts (stored in Notion) on the portfolio website.

### Architecture

```
Notion Database (posts)
    ↓ Notion API
Serverless Function (/api/posts)
    ↓
Website (/writing)
```

### Requirements

| Requirement | Details |
|-------------|---------|
| Notion database | Title, Slug, Date, Published, LinkedIn URL, Tags, Content |
| API endpoint | Serverless function to fetch posts (hides API key) |
| List page | `/writing` — grid/list of all posts |
| Detail page | `/writing/[slug]` — full post content |
| Styling | Match existing site design |

### Technical Tasks

- [ ] Create Notion integration and share database
- [ ] Set up serverless function (Vercel/Netlify)
- [ ] Create `/api/posts` endpoint (list posts)
- [ ] Create `/api/posts/[slug]` endpoint (single post)
- [ ] Build `/writing` list page component
- [ ] Build `/writing/[slug]` detail page component
- [ ] Add Notion block renderer (react-notion-x or similar)
- [ ] Add navigation link to Writing
- [ ] Style to match site

### Dependencies

- Notion API key
- Serverless function support (Vercel/Netlify)
- Notion database structure

---

## 2. Case Studies

### Overview

Deep-dive pages for 2-3 key projects showing PM process and thinking.

### Architecture

```
Sanity CMS (caseStudy type)
    ↓
Website (/work/[slug])
```

### Requirements

| Requirement | Details |
|-------------|---------|
| Sanity schema | `caseStudy` content type |
| Fields | title, slug, problem, research, solution, outcome, learnings, metrics, images |
| List integration | Link from project modal → case study page |
| Detail page | `/work/[slug]` — full case study |

### Content Structure (per case study)

1. **Overview** — One-liner on what this is
2. **Problem** — What problem were we solving? Why did it matter?
3. **Research/Discovery** — How did we understand the problem?
4. **Solution** — What did we build? Key decisions made
5. **Outcome** — Metrics, impact, results
6. **Learnings** — What would you do differently?

### Technical Tasks

- [ ] Add `caseStudy` schema to Sanity
- [ ] Create case study documents in Sanity (2-3 projects)
- [ ] Add `useCaseStudy` hook to fetch data
- [ ] Build `/work/[slug]` page component
- [ ] Update project modal with "Read Case Study" link
- [ ] Add Portable Text rendering for rich content
- [ ] Style case study page

### Dependencies

- Sanity studio access
- Content written for 2-3 case studies

---

## 3. Contact Form

### Overview

Re-enable contact form with functional submission via webhook.

### Current State

- Form exists but is hidden (`hidden` class)
- Webhook URL configured in Sanity/env
- n8n workflow exists for processing

### Requirements

| Requirement | Details |
|-------------|---------|
| Unhide form | Remove `hidden` class |
| Validate webhook | Ensure n8n workflow is active |
| Test submission | End-to-end test |
| Add email display | Show direct email alongside form |
| Success/error states | Clear feedback on submission |

### Technical Tasks

- [ ] Unhide contact form (remove `hidden` class)
- [ ] Verify webhook URL is configured
- [ ] Test n8n workflow receives submissions
- [ ] Add direct email display to contact page
- [ ] Test form validation
- [ ] Test success/error toast messages
- [ ] Optional: Add Calendly link for booking calls

### Dependencies

- n8n webhook URL
- Email for display

---

## Priority Order

| Order | Feature | Reason |
|-------|---------|--------|
| 1 | Contact Form | Quick win, already built, just needs enabling |
| 2 | Case Studies | High impact for job search, shows depth |
| 3 | Content/Writing | Requires more setup (Notion API, serverless) |

---

## Open Questions

| Question | Owner | Status |
|----------|-------|--------|
| Where is the site deployed? (Vercel/Netlify) | — | TBD |
| Notion database structure for posts? | — | TBD |
| Which 2-3 projects for case studies? | — | TBD |
| n8n webhook URL active? | — | TBD |
| Email to display on contact page? | — | TBD |

---

## Timeline Estimate

| Feature | Effort |
|---------|--------|
| Contact Form | 1-2 hours |
| Case Studies | 1-2 days (includes content) |
| Content/Writing | 1 day (setup) + ongoing content |

**Total: ~3-4 days**

