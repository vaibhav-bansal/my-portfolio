# Notion Content Integration Plan

## Overview

This plan outlines the strategy for integrating Notion API to fetch and display content (posts/articles) in the portfolio website. The content database in Notion contains published articles with metadata including name, status, date posted, platform, and URLs.

**Current State:**
- Portfolio uses Sanity CMS for personal info, projects, focus areas, and social links
- No content/posts feature exists yet
- React Query is used for data fetching with caching and error handling

**Target State:**
- Fetch content from Notion database using Notion API
- Display content in a new "Content" or "Posts" section
- Support filtering by status (Published, Pipeline, Draft)
- Show content metadata: name, status, date posted, platform, URLs

---

## Notion Database Structure Analysis

Based on the provided image, the content database has the following structure:

### Database Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| **Name** | Title | Content title/name | "Don't wait for the Mona Lisa" |
| **Status** | Select | Publication status | "Published", "Pipeline", "Draft" |
| **Date posted** | Date | Publication date | "December 25, 2025" |
| **Platform** | Select/Multi-select | Publishing platform | "LinkedIn", "Medium" |
| **URLs** | URL | Link to published content | "https://linkedin.com/..." |

### Content Examples from Database

1. **Published Content:**
   - "Don't wait for the Mona Lisa" - LinkedIn - Dec 25, 2025
   - "I have a roadmap for next 5 years". No, you don't" - LinkedIn - Dec 20, 2025
   - "Don't gamble". I disagree" - LinkedIn - Dec 19, 2025
   - "A delay is a hiccup. A bad feature is a slow poison" - LinkedIn - Dec 18, 2025
   - "Why I walked out of an Airtel store without a SIM" - LinkedIn - Nov 16, 2025
   - "This took me back to my childhood" - LinkedIn - Jul 20, 2025
   - "Baking Pizzas, the Agile Way" - Medium - Jul 3, 2024

2. **Status Types:**
   - Published (green pill badge)
   - Pipeline (likely yellow/orange)
   - Draft (likely gray)

3. **Platforms:**
   - LinkedIn (blue pill badge)
   - Medium (gray pill badge)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│              Portfolio Frontend (React)              │
│  ┌─────────────────────────────────────────────┐    │
│  │         Content Page/Component              │    │
│  │  - Tabs: Published | Pipeline | Draft        │    │
│  │  - Table: Name, Status, Date, Platform, URLs│    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
                         │
                         │ useContent() hook
                         ▼
┌─────────────────────────────────────────────────────┐
│         React Query (Caching & State)                │
│  - Query Key: ['content', status?]                  │
│  - Stale Time: 10 minutes                           │
│  - Cache Time: 30 minutes                           │
└─────────────────────────────────────────────────────┘
                         │
                         │ fetchContent()
                         ▼
┌─────────────────────────────────────────────────────┐
│         Notion API Client (lib/notion.ts)            │
│  - Authenticate with NOTION_API_SECRET              │
│  - Query database by database_id                    │
│  - Transform Notion response to app format          │
└─────────────────────────────────────────────────────┘
                         │
                         │ HTTPS POST
                         ▼
┌─────────────────────────────────────────────────────┐
│              Notion API (External)                   │
│  https://api.notion.com/v1/databases/{id}/query     │
└─────────────────────────────────────────────────────┘
```

---

## Implementation Strategy

### Phase 1: Notion API Setup & Configuration

#### 1.1 Environment Variables
- [ ] Add `NOTION_API_SECRET` to `.env.local` (development)
- [ ] Add `NOTION_API_SECRET` to Vercel environment variables (production)
- [ ] Add `NOTION_CONTENT_DATABASE_ID` to environment variables
  - This is the database ID from Notion (found in database URL)

#### 1.2 Notion Integration Setup
- [ ] Verify Notion integration has access to content database
- [ ] Ensure integration has "Read" permissions
- [ ] Test API connection with a simple query

#### 1.3 Install Dependencies
- [ ] Install `@notionhq/client` package (official Notion SDK)
  ```bash
  npm install @notionhq/client
  ```

---

### Phase 2: Notion API Client Implementation

#### 2.1 Create Notion Client (`src/lib/notion.ts`)

**Structure:**
```typescript
// Similar pattern to src/lib/sanity.ts
- Create Notion client instance
- Define TypeScript interfaces for content
- Create query functions
- Transform Notion API response to app format
- Handle errors and provide fallback data
```

**Key Functions:**
- `createNotionClient()` - Initialize client with API secret
- `fetchContentDatabase()` - Query database with filters
- `transformNotionContent()` - Convert Notion format to app format
- `getContentByStatus()` - Filter by status (Published/Pipeline/Draft)

**Data Transformation:**
- Notion Title → `name: string`
- Notion Select (Status) → `status: 'Published' | 'Pipeline' | 'Draft'`
- Notion Date → `datePosted: Date | null`
- Notion Select (Platform) → `platform: string`
- Notion URL → `url: string`
- Notion Page ID → `id: string`

---

### Phase 3: React Query Hooks

#### 3.1 Create Content Hooks (`src/hooks/useNotion.ts`)

**Hooks to Create:**
- `useContent()` - Fetch all content (with optional status filter)
- `usePublishedContent()` - Fetch only published content
- `usePipelineContent()` - Fetch pipeline content
- `useDraftContent()` - Fetch draft content

**Query Options:**
- Stale time: 10 minutes (content doesn't change frequently)
- Cache time: 30 minutes
- Retry: 2 attempts
- Refetch on reconnect: true
- Refetch on window focus: false (to avoid unnecessary API calls)

**Pattern:**
```typescript
// Follow same pattern as useSanity.ts
export const useContent = (status?: 'Published' | 'Pipeline' | 'Draft') => {
  return useQuery({
    queryKey: ['content', status],
    queryFn: () => fetchContent(status),
    ...defaultQueryOptions,
  })
}
```

---

### Phase 4: Content Page/Component

#### 4.1 Create Content Page (`src/pages/Content.tsx`)

**Features:**
- Tab navigation: Published | Pipeline | Draft
- Table display with columns:
  - Name (with link if URL exists)
  - Status (badge with color coding)
  - Date posted (formatted date)
  - Platform (badge with color coding)
  - URLs (link button/icon)
- Loading state (use LoadingSpinner component)
- Error state (use DataError component)
- Empty state (when no content in selected tab)

**UI Components to Use:**
- `Tabs` from `@/components/ui/tabs`
- `Table` from `@/components/ui/table`
- `Badge` from `@/components/ui/badge`
- `LoadingSpinner` from `@/components/ui/LoadingSpinner`
- `DataError` from `@/pages/DataError`

#### 4.2 Add Route
- [ ] Add `/content` route to `src/App.tsx`
- [ ] Add navigation link (if needed in Navigation component)

---

### Phase 5: Data Types & Interfaces

#### 5.1 TypeScript Interfaces

```typescript
// src/types/content.ts

export interface Content {
  id: string;              // Notion page ID
  name: string;            // Title property
  status: 'Published' | 'Pipeline' | 'Draft';
  datePosted: Date | null; // Date property
  platform: string;        // Platform select
  url: string | null;      // URL property
  createdAt: Date;        // Notion created_time
  lastEditedAt: Date;      // Notion last_edited_time
}

export interface NotionContentResponse {
  results: NotionPage[];
  has_more: boolean;
  next_cursor: string | null;
}
```

---

### Phase 6: Error Handling & Fallbacks

#### 6.1 Error Handling Strategy
- [ ] Handle Notion API rate limits (429 errors)
- [ ] Handle authentication errors (401)
- [ ] Handle database not found (404)
- [ ] Handle network errors
- [ ] Provide user-friendly error messages

#### 6.2 Fallback Data
- [ ] Create fallback content array (similar to `fallbackData` in sanity.ts)
- [ ] Use fallback when API fails
- [ ] Log errors for debugging

---

## Notion API Details

### Authentication
- **Method:** Bearer token in Authorization header
- **Header:** `Authorization: Bearer ${NOTION_API_SECRET}`
- **API Version:** `Notion-Version: 2022-06-28` (or latest)

### Database Query Endpoint
```
POST https://api.notion.com/v1/databases/{database_id}/query
```

### Request Body Example
```json
{
  "filter": {
    "property": "Status",
    "select": {
      "equals": "Published"
    }
  },
  "sorts": [
    {
      "property": "Date posted",
      "direction": "descending"
    }
  ]
}
```

### Response Structure
```json
{
  "object": "list",
  "results": [
    {
      "object": "page",
      "id": "page-id",
      "created_time": "2025-12-25T...",
      "last_edited_time": "2025-12-25T...",
      "properties": {
        "Name": {
          "id": "title",
          "type": "title",
          "title": [{"plain_text": "Don't wait for the Mona Lisa"}]
        },
        "Status": {
          "id": "status",
          "type": "select",
          "select": {"name": "Published", "color": "green"}
        },
        "Date posted": {
          "id": "date",
          "type": "date",
          "date": {"start": "2025-12-25"}
        },
        "Platform": {
          "id": "platform",
          "type": "select",
          "select": {"name": "LinkedIn", "color": "blue"}
        },
        "URLs": {
          "id": "url",
          "type": "url",
          "url": "https://linkedin.com/..."
        }
      }
    }
  ],
  "has_more": false,
  "next_cursor": null
}
```

---

## Data Mapping: Notion → App Format

| Notion Property | Notion Type | App Property | App Type | Transformation |
|----------------|-------------|--------------|----------|----------------|
| Name | `title` | `name` | `string` | Extract `plain_text` from first title element |
| Status | `select` | `status` | `'Published' \| 'Pipeline' \| 'Draft'` | Extract `name` from select |
| Date posted | `date` | `datePosted` | `Date \| null` | Parse `start` date string |
| Platform | `select` | `platform` | `string` | Extract `name` from select |
| URLs | `url` | `url` | `string \| null` | Use `url` value directly |

---

## Security Considerations

### 1. API Secret Protection
- [ ] **Never expose API secret in frontend code**
- [ ] Store `NOTION_API_SECRET` in environment variables only
- [ ] Use Vercel environment variables for production
- [ ] Add `.env.local` to `.gitignore` (if not already)

### 2. API Route Strategy
**Option A: Serverless Function (Recommended)**
- Create `/api/v1/content/query.ts` serverless function
- Frontend calls `/api/v1/content/query?status=Published`
- Serverless function calls Notion API with secret
- Prevents API secret exposure in frontend bundle

**Option B: Direct Frontend Call (Not Recommended)**
- Notion API allows CORS, but exposes API secret in bundle
- Only use if database is public and read-only access is acceptable

**Recommendation:** Use Option A (Serverless Function)

---

## File Structure

```
src/
├── lib/
│   ├── notion.ts          # Notion API client (NEW)
│   └── sanity.ts          # Existing Sanity client
├── hooks/
│   ├── useNotion.ts       # Content hooks (NEW)
│   └── useSanity.ts       # Existing Sanity hooks
├── pages/
│   ├── Content.tsx        # Content page (NEW)
│   ├── About.tsx          # Existing
│   ├── Work.tsx           # Existing
│   └── Contact.tsx        # Existing
├── types/
│   └── content.ts       # Content TypeScript types (NEW)
└── components/
    └── ui/                # Existing UI components

api/
└── v1/
    └── content/
        └── query.ts       # Serverless function (NEW)
```

---

## Implementation Phases

### Phase 1: Foundation (30-45 min)
- [ ] Install `@notionhq/client`
- [ ] Set up environment variables
- [ ] Create `src/lib/notion.ts` with client initialization
- [ ] Test basic API connection

### Phase 2: Data Fetching (1-2 hours)
- [ ] Implement database query function
- [ ] Create data transformation functions
- [ ] Add TypeScript interfaces
- [ ] Test data fetching and transformation

### Phase 3: Serverless Function (30-45 min)
- [ ] Create `/api/v1/content/query.ts`
- [ ] Implement authentication
- [ ] Add error handling
- [ ] Test serverless function

### Phase 4: React Integration (1-2 hours)
- [ ] Create `useNotion.ts` hooks
- [ ] Create `Content.tsx` page
- [ ] Add routing
- [ ] Implement UI with tabs and table

### Phase 5: Polish & Testing (30-45 min)
- [ ] Add loading states
- [ ] Add error states
- [ ] Add empty states
- [ ] Test all status filters
- [ ] Test error scenarios

**Total Estimated Time: 4-5 hours**

---

## Testing Checklist

### Unit Tests
- [ ] Notion client initialization
- [ ] Data transformation functions
- [ ] Error handling

### Integration Tests
- [ ] API route returns correct data
- [ ] React Query hooks fetch data correctly
- [ ] Content page displays data correctly

### Manual Testing
- [ ] Fetch published content
- [ ] Fetch pipeline content
- [ ] Fetch draft content
- [ ] Handle API errors gracefully
- [ ] Handle empty states
- [ ] Test date formatting
- [ ] Test URL links
- [ ] Test status badges
- [ ] Test platform badges

---

## Open Questions & Decisions Needed

### 1. API Route vs Direct Frontend Call
**Question:** Should we use a serverless function or call Notion API directly from frontend?
**Recommendation:** Serverless function for security
**Decision:** [ ] Serverless Function [ ] Direct Frontend Call

### 2. Database ID
**Question:** What is the Notion database ID?
**Action:** Extract from Notion database URL (format: `notion.so/{workspace}/{database_id}?v=...`)
**Database ID:** `___________________________`

### 3. Content Page Route
**Question:** What should the route be?
**Options:**
- `/content` (recommended)
- `/posts`
- `/articles`
- `/writing`
**Decision:** `/content`

### 4. Navigation Integration
**Question:** Should content page be added to main navigation?
**Options:**
- Yes, add to navigation menu
- No, keep it separate
**Decision:** [ ] Yes [ ] No

### 5. Caching Strategy
**Question:** How long should content be cached?
**Current:** 10 minutes stale, 30 minutes cache
**Decision:** Keep current or adjust? [ ] Keep [ ] Adjust to: _____ minutes

### 6. Date Formatting
**Question:** How should dates be displayed?
**Options:**
- "December 25, 2025" (full)
- "Dec 25, 2025" (abbreviated)
- "25 Dec 2025" (day first)
- Relative: "2 days ago"
**Decision:** "December 25, 2025" (matches image)

### 7. URL Handling
**Question:** How should URLs be displayed?
**Options:**
- Link button with platform name
- External link icon
- Full URL text
- Platform badge + link icon
**Decision:** Platform name as link (matches image)

---

## Migration Considerations

### Current State
- Portfolio uses Sanity for other data (personal, projects, focus areas, social links)
- Content feature is new, so no migration needed

### Future Considerations
- If moving other data to Notion, consider unified data fetching approach
- Keep Sanity integration for now (no breaking changes)

---

## Dependencies

### New Dependencies
```json
{
  "@notionhq/client": "^2.2.15"  // Official Notion SDK
}
```

### Existing Dependencies (Already Installed)
- `@tanstack/react-query` - Data fetching
- `react-router-dom` - Routing
- `date-fns` - Date formatting (if needed)
- All UI components from `@/components/ui`

---

## Environment Variables

### Development (.env.local)
```env
NOTION_API_SECRET=your-notion-api-secret-here
NOTION_CONTENT_DATABASE_ID=your-database-id-here
```

### Production (Vercel)
- Add same variables in Vercel dashboard
- Settings → Environment Variables

---

## Success Criteria

- [ ] Content page displays all published content
- [ ] Tabs filter content by status correctly
- [ ] All content metadata displays correctly
- [ ] URLs are clickable and open in new tab
- [ ] Loading states work properly
- [ ] Error states handle failures gracefully
- [ ] Empty states show when no content
- [ ] API secret is not exposed in frontend bundle
- [ ] Performance is acceptable (caching works)
- [ ] Code follows existing patterns (similar to Sanity integration)

---

## Next Steps

1. **Review this plan** - Discuss and finalize decisions
2. **Get Notion database ID** - Extract from Notion database URL
3. **Decide on API route vs direct call** - Security consideration
4. **Start Phase 1** - Set up foundation
5. **Iterate through phases** - Implement step by step
6. **Test thoroughly** - Ensure all scenarios work
7. **Deploy** - Push to production

---

## References

- [Notion API Documentation](https://developers.notion.com/reference/intro)
- [Notion JavaScript SDK](https://github.com/makenotion/notion-sdk-js)
- [Notion Database Query Guide](https://developers.notion.com/reference/post-database-query)
- Existing codebase patterns: `src/lib/sanity.ts`, `src/hooks/useSanity.ts`

---

## Notes

- This plan focuses on **fetching** content only, not creating/updating
- Content management will continue in Notion (no admin UI needed)
- Follow existing code patterns for consistency
- Keep security as top priority (API secret protection)

---

**Last Updated:** December 26, 2025
**Status:** Planning Phase - Awaiting Review

