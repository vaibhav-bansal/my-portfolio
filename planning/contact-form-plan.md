# Contact Form Implementation Plan

## Overview

Enable the contact form with a complete workflow that:
1. Sends acknowledgement email to the user
2. Notifies you via Slack (immediate)
3. Sets a Slack reminder (24 hours later)
4. Emails you with submission details
5. **Secures the webhook with HMAC-SHA256 signature**

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Portfolio Website                   │
│  ┌─────────────────────────────────────────────┐    │
│  │            Contact Form (React)              │    │
│  │  Name, Email, Phone (optional), Message      │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
                         │
                         │ POST /api/contact
                         ▼
┌─────────────────────────────────────────────────────┐
│           Vercel Serverless Function                 │
│  /api/contact.ts                                     │
├─────────────────────────────────────────────────────┤
│  1. Validate form data                              │
│  2. Construct JSON payload                          │
│  3. Generate HMAC-SHA256 signature                  │
│  4. POST to n8n with x-webhook-signature header     │
└─────────────────────────────────────────────────────┘
                         │
                         │ POST + x-webhook-signature
                         ▼
┌─────────────────────────────────────────────────────┐
│              n8n Webhook                             │
│  https://[your-instance].app.n8n.cloud/webhook/...  │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│                  n8n Workflow                        │
├─────────────────────────────────────────────────────┤
│  1. Verify Signature (reject if invalid)            │
│  2. Validate Data                                   │
│  3. Transform & Generate Reference ID               │
│  4. Email: Acknowledge User (Gmail)                 │
│  5. Slack: Notify (immediate)                       │
│  6. Slack: Set Reminder (24 hours)                  │
│  7. Email: Notify Owner (Gmail)                     │
│  8. Return Success Response                         │
└─────────────────────────────────────────────────────┘
```

---

## Payload Structure

### From Frontend to API

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "countryCode": "+91",
  "message": "Hi, I'd love to connect..."
}
```

### From API to n8n Webhook

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "countryCode": "+91",
  "fullPhone": "+91 9876543210",
  "message": "Hi, I'd love to connect...",
  "timestamp": "2025-12-26T10:30:00.000Z",
  "source": "vaibhav.bio"
}
```

### Signature Header

```
x-webhook-signature: <HMAC-SHA256 hex digest of JSON payload>
```

**Signature generation (Node.js):**
```javascript
const crypto = require('crypto');
const signature = crypto
  .createHmac('sha256', WEBHOOK_SECRET)
  .update(JSON.stringify(payload))
  .digest('hex');
```

---

## User Experience

### For Visitor (Form Submitter)

1. Fills out contact form on website
2. Clicks "Send Message"
3. Sees success toast: "Message sent!"
4. Receives email acknowledgement within seconds:
   ```
   Subject: Thanks for reaching out, [Name]!
   
   Hi [Name],
   
   Thank you for reaching out through my portfolio website!
   I've received your message and will get back to you within 24 hours.
   
   Reference ID: CF-XXXXXX
   
   Best regards,
   Vaibhav Bansal
   ```

### For You (Portfolio Owner)

1. Receive Slack notification immediately:
   ```
   📬 New Contact Form Submission
   
   Name: John Doe
   Email: john@example.com
   Phone: +91 9876543210
   
   Message:
   > Hi Vaibhav, I'd love to discuss...
   
   Reference: CF-XXXXXX
   Submitted: December 25, 2025 at 1:00 PM IST
   ```

2. Receive email with reply-to set to user's email

3. Get Slack reminder after 24 hours:
   ```
   ⏰ Reminder: Respond to John Doe
   
   You received a contact form submission 24 hours ago.
   Email: john@example.com
   
   Don't forget to follow up!
   ```

---

## Implementation Steps

### Phase 1: Generate Webhook Secret

#### Step 1.1: Create a Secret
- [ ] Generate a UUID or random string for the webhook secret
- [ ] Example: `0fe6baa0-837c-43d9-9b79-4c66ee8df9c2`
- [ ] Save this — you'll need it for both Vercel and n8n

---

### Phase 2: n8n Setup

#### Step 2.1: Import Workflow
- [ ] Log into n8n Cloud
- [ ] Create new workflow
- [ ] Import from file: `planning/templates/contact-form-n8n-workflow-v2.json`

#### Step 2.2: Update Webhook Secret in n8n
- [ ] Open "Verify Signature" node
- [ ] Replace `YOUR_WEBHOOK_SECRET_HERE` with your actual secret

#### Step 2.3: Set Up Gmail Credential
- [ ] Go to Credentials → Add Credential
- [ ] Search for "Gmail OAuth2"
- [ ] Click "Sign in with Google"
- [ ] Authorize with `vbansal079@gmail.com`
- [ ] Save credential

#### Step 2.4: Set Up Slack Credential
- [ ] Go to [api.slack.com/apps](https://api.slack.com/apps)
- [ ] Create New App → From scratch
  - App Name: `Portfolio Contact Bot`
  - Workspace: `org-bansal`
- [ ] Go to OAuth & Permissions
- [ ] Add Bot Token Scopes:
  - `chat:write`
  - `chat:write.public`
  - `reminders:write`
- [ ] Install to Workspace
- [ ] Copy Bot User OAuth Token
- [ ] In n8n: Credentials → Add Credential → Slack OAuth2
- [ ] Paste token and save

#### Step 2.5: Configure Workflow Nodes
- [ ] Open "Email: Acknowledge User" node → Select Gmail credential
- [ ] Open "Email: Notify Owner" node → Select Gmail credential
- [ ] Open "Slack: Notify" node → Select Slack credential + choose channel
- [ ] Open "Slack: Set Reminder" node → Select Slack credential

#### Step 2.6: Get Production Webhook URL
- [ ] Click on "Webhook Trigger" node
- [ ] Switch to "Production" tab
- [ ] Copy the Production URL
- [ ] Save it for Vercel configuration

#### Step 2.7: Activate Workflow
- [ ] Toggle workflow to "Active" (top right)

---

### Phase 3: Vercel Configuration

#### Step 3.1: Add Environment Variables
In Vercel dashboard → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `CONTACT_WEBHOOK_URL` | Your n8n production webhook URL |
| `CONTACT_WEBHOOK_SECRET` | Your webhook secret (same as in n8n) |

- [ ] Add `CONTACT_WEBHOOK_URL`
- [ ] Add `CONTACT_WEBHOOK_SECRET`
- [ ] Redeploy for changes to take effect

#### Step 3.2: Verify API Route
- [ ] Ensure `api/contact.ts` exists in your repo
- [ ] Deploy to Vercel
- [ ] Test endpoint: `https://your-site.vercel.app/api/contact`

---

### Phase 4: Frontend Updates

#### Step 4.1: Unhide Contact Form
- [ ] Open `src/pages/Contact.tsx`
- [ ] Remove `hidden` class from form container
- [ ] Verify form displays correctly

#### Step 4.2: Verify API Call
- [ ] Form should POST to `/api/contact` (already updated)
- [ ] No webhook URL exposed in frontend

---

### Phase 5: Testing

#### Step 5.1: Local Testing
- [ ] Run `vercel dev` to test API routes locally
- [ ] Set environment variables in `.env.local`:
  ```
  CONTACT_WEBHOOK_URL=your-n8n-url
  CONTACT_WEBHOOK_SECRET=your-secret
  ```
- [ ] Submit test form

#### Step 5.2: Production Testing
- [ ] Deploy to Vercel
- [ ] Submit test form on live site
- [ ] Verify:
  - [ ] Form shows success toast
  - [ ] User receives acknowledgement email
  - [ ] You receive Slack notification
  - [ ] You receive email notification
  - [ ] Slack reminder is scheduled

#### Step 5.3: Test Security
- [ ] Send request directly to n8n without signature → Should be rejected
- [ ] Send request with wrong signature → Should be rejected

---

## Configuration Reference

### Environment Variables (Vercel)

| Variable | Value | Description |
|----------|-------|-------------|
| `CONTACT_WEBHOOK_URL` | n8n webhook URL | Where to send form data |
| `CONTACT_WEBHOOK_SECRET` | UUID/random string | Shared secret for HMAC |

### n8n Configuration

| Setting | Value |
|---------|-------|
| Webhook Secret | Same as `CONTACT_WEBHOOK_SECRET` |
| Gmail Credential | OAuth2 with `vbansal079@gmail.com` |
| Slack Credential | OAuth2 with `org-bansal` workspace |

### Slack App Scopes

| Scope | Purpose |
|-------|---------|
| `chat:write` | Send messages to channels |
| `chat:write.public` | Send to public channels without joining |
| `reminders:write` | Create reminders |

---

## Files

| File | Purpose |
|------|---------|
| `api/contact.ts` | Vercel serverless function — handles form, signs, forwards |
| `src/pages/Contact.tsx` | Frontend form (calls `/api/contact`) |
| `planning/templates/contact-form-n8n-workflow-v2.json` | n8n workflow to import |

---

## Security

| Measure | Implementation |
|---------|----------------|
| Secret not in frontend | Stored in Vercel env vars only |
| HMAC-SHA256 signature | Validates request authenticity |
| n8n verifies signature | Rejects requests without valid signature |
| HTTPS only | All requests encrypted in transit |

---

## Rollback Plan

If issues occur:
1. Toggle n8n workflow to inactive
2. Add `hidden` class back to form in `Contact.tsx`
3. Check Vercel function logs
4. Check n8n execution logs

---

## Open Questions

| Question | Status |
|----------|--------|
| Which Slack channel for notifications? | TBD |
| Display direct email on page? | TBD |
| Add Calendly link for booking calls? | TBD |

---

## Timeline

| Task | Effort |
|------|--------|
| Generate secret | 2 min |
| n8n setup (credentials, workflow) | 30-45 min |
| Vercel environment setup | 10 min |
| Frontend update (unhide form) | 5 min |
| Testing | 15-30 min |
| **Total** | **~1-1.5 hours** |
