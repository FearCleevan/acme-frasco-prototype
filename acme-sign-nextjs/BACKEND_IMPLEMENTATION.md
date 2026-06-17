# ACME Sign & Graphics — Backend Implementation

**Project:** `acme-sign-nextjs/`  
**Scope:** Hero section prototype — Phase 1

---

## Status: No Backend Required for This Phase

The current scope (hero section prototype) is **frontend-only**. There is no backend, no database, no API, and no authentication in this phase.

All content is hardcoded mock data in `data/hero.ts`.

---

## What Would a Backend Look Like? (Future Reference)

When the project expands beyond the hero prototype, the following backend work would be scoped:

### Phase B1 — Quote Request Form
- **API Route:** `POST /api/quote` (Next.js Route Handler)
- **Payload:** `{ name, company, email, phone, serviceType, message }`
- **Action:** Send email via Resend or Nodemailer to ACME Sign's inbox
- **Response:** `{ success: true }` or `{ error: string }`
- **No database needed** — transactional email only

### Phase B2 — CMS Integration (Content)
- **Provider:** Contentful or Sanity (headcms, no custom backend)
- **Content types:** Hero slides, nav links, service pages, gallery items
- **Access:** Read-only API key, fetched at build time via `generateStaticParams`
- **No custom server needed**

### Phase B3 — Contact Form + Lead Storage
- **Database:** Supabase (PostgreSQL)
- **Table:** `leads (id, name, company, email, phone, service, message, created_at)`
- **API Route:** `POST /api/contact`
- **Auth:** None (public form) — rate-limit with Upstash Redis

---

## Environment Variables (Future)

When backend phases are added, these `.env.local` variables will be needed:

```
# Phase B1
RESEND_API_KEY=re_...

# Phase B2 — Contentful
CONTENTFUL_SPACE_ID=...
CONTENTFUL_ACCESS_TOKEN=...

# Phase B3 — Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

None of these are needed for the current hero section prototype.
