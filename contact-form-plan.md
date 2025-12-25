# Contact Form Implementation Plan

## Overview

Enable the contact form with a complete workflow that:
1. Sends acknowledgement email to the user
2. Notifies you via Slack (immediate)
3. Sets a Slack reminder (24 hours later)
4. Emails you with submission details

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
                         │ POST (JSON)
                         ▼
┌─────────────────────────────────────────────────────┐
│              n8n Webhook (Production URL)            │
│  https://[your-instance].app.n8n.cloud/webhook/...  │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│                  n8n Workflow                        │
├─────────────────────────────────────────────────────┤
│  1. Validate Data                                    │
│  2. Transform & Generate Reference ID               │
│  3. Email: Acknowledge User (Gmail)                 │
│  4. Slack: Notify (immediate)                       │
│  5. Slack: Set Reminder (24 hours)                  │
│  6. Email: Notify Owner (Gmail)                     │
│  7. Return Success Response                         │
└─────────────────────────────────────────────────────┘
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
   Phone: +1 555-1234
   
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

### Phase 1: n8n Setup

#### Step 1.1: Import Workflow
- [ ] Log into n8n Cloud
- [ ] Create new workflow
- [ ] Import from file: `contact-form-n8n-workflow-v2.json`

#### Step 1.2: Set Up Gmail Credential
- [ ] Go to Credentials → Add Credential
- [ ] Search for "Gmail OAuth2"
- [ ] Click "Sign in with Google"
- [ ] Authorize with `vbansal079@gmail.com`
- [ ] Save credential

#### Step 1.3: Set Up Slack Credential
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

#### Step 1.4: Configure Workflow Nodes
- [ ] Open "Email: Acknowledge User" node
  - Select Gmail credential
- [ ] Open "Email: Notify Owner" node
  - Select Gmail credential
- [ ] Open "Slack: Notify" node
  - Select Slack credential
  - Choose channel (e.g., #notifications or DM to yourself)
- [ ] Open "Slack: Set Reminder" node
  - Select Slack credential

#### Step 1.5: Get Production Webhook URL
- [ ] Click on "Webhook Trigger" node
- [ ] Switch to "Production" tab
- [ ] Copy the Production URL
- [ ] Save it for next step

#### Step 1.6: Activate Workflow
- [ ] Toggle workflow to "Active" (top right)

---

### Phase 2: Sanity Configuration

#### Step 2.1: Add Webhook URL
- [ ] Open Sanity Studio
- [ ] Go to Contact Settings document
- [ ] Paste webhook URL in "Contact Form Webhook URL" field
- [ ] Optionally add:
  - Email Address: `vbansal079@gmail.com`
  - Contact Page Message
- [ ] Publish

---

### Phase 3: Frontend Updates

#### Step 3.1: Unhide Contact Form
- [ ] Open `src/pages/Contact.tsx`
- [ ] Remove `hidden` class from form container
- [ ] Verify form displays correctly

#### Step 3.2: Add Direct Email Display (Optional)
- [ ] Add email address display alongside form
- [ ] Consider adding: "Prefer email? Reach me at vbansal079@gmail.com"

---

### Phase 4: Testing

#### Step 4.1: Test Submission
- [ ] Run dev server locally
- [ ] Submit test form
- [ ] Verify:
  - [ ] Form shows success toast
  - [ ] User receives acknowledgement email
  - [ ] You receive Slack notification
  - [ ] You receive email notification
  - [ ] Slack reminder is scheduled (check after 24h or test with shorter time)

#### Step 4.2: Test Error Handling
- [ ] Submit with missing required fields
- [ ] Verify validation errors display correctly
- [ ] Verify n8n returns proper error response

---

## Configuration Reference

### Environment Variables

| Variable | Value | Where Used |
|----------|-------|------------|
| `VITE_CONTACT_WEBHOOK_URL` | n8n webhook URL | Fallback if Sanity not configured |

### Sanity Contact Settings

| Field | Value |
|-------|-------|
| Webhook URL | `https://[instance].app.n8n.cloud/webhook/contact-form` |
| Email | `vbansal079@gmail.com` |

### Slack App Scopes

| Scope | Purpose |
|-------|---------|
| `chat:write` | Send messages to channels |
| `chat:write.public` | Send to public channels without joining |
| `reminders:write` | Create reminders |

---

## Files Modified

| File | Change |
|------|--------|
| `contact-form-n8n-workflow-v2.json` | New workflow with Slack + emails |
| `src/pages/Contact.tsx` | Unhide form |
| Sanity: Contact Settings | Add webhook URL |

---

## Rollback Plan

If issues occur:
1. Toggle n8n workflow to inactive
2. Add `hidden` class back to form in `Contact.tsx`
3. Debug n8n execution logs

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
| n8n setup (credentials, workflow) | 30-45 min |
| Sanity configuration | 5 min |
| Frontend update (unhide form) | 5 min |
| Testing | 15-30 min |
| **Total** | **~1-1.5 hours** |

