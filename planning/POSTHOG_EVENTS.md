# PostHog Event Tracking Documentation

This document lists all the events tracked in the portfolio application using PostHog analytics.

## Configuration

- **API Key**: Configured in `src/lib/posthog.ts`
- **Session Replays**: Enabled with input masking for privacy
- **Auto-capture**: Enabled for clicks, form submissions, and page views

## Page View Events

### Automatic Page Views
PostHog automatically tracks page views via `$pageview` events. Custom page names are also tracked:

- `About` - Home/About page (`/`)
- `Work` - Work/Projects page (`/work`)
- `Contact` - Contact page (`/contact`)
- `NotFound` - 404 error page (`/*`)

**Properties:**
- `page_name`: The name of the page
- `path`: The current route path

## Navigation Events

### `navigation_logo_clicked`
Triggered when the user clicks on the logo/brand name in the navigation.

**Properties:**
- None

### `navigation_link_clicked`
Triggered when a user clicks on a navigation link (desktop).

**Properties:**
- `page`: The label of the page (e.g., "About", "Work", "Contact")
- `path`: The route path (e.g., "/", "/work", "/contact")

### `mobile_navigation_link_clicked`
Triggered when a user clicks on a navigation link in the mobile menu.

**Properties:**
- `page`: The label of the page
- `path`: The route path

### `mobile_menu_toggled`
Triggered when the mobile menu is opened or closed.

**Properties:**
- `isOpen`: Boolean indicating if the menu is now open

## Contact Form Events

### `contact_form_field_focused`
Triggered when a user focuses on a form field.

**Properties:**
- `field`: The name of the field (e.g., "name", "email", "linkedin", "phone", "message")

### `contact_form_field_blurred`
Triggered when a user leaves a form field (blur event).

**Properties:**
- `field`: The name of the field
- `hasError`: Boolean indicating if the field has a validation error

### `contact_form_validation_failed`
Triggered when form submission fails due to validation errors.

**Properties:**
- `errors`: Array of field names that have errors
- `errorCount`: Number of validation errors

### `contact_form_submit_attempted`
Triggered when a user attempts to submit the form (before validation).

**Properties:**
- `hasPhone`: Boolean indicating if phone number was provided
- `hasLinkedIn`: Boolean indicating if LinkedIn username was provided

### `contact_form_submitted`
Triggered when the contact form is successfully submitted.

**Properties:**
- `name`: User's name (provided)
- `email`: User's email (provided)
- `phone`: Either "provided" or "not_provided"
- `linkedin`: Either "provided" or "not_provided"
- `messageLength`: Length of the message in characters
- `countryCode`: The selected country code (e.g., "+91")

## Project/Work Events

### `project_read_more`
Triggered when a user clicks "Read more" on a project card.

**Properties:**
- `projectTitle`: The title of the project
- `projectId`: The unique ID of the project
- `projectTags`: Array of project tags

### `project_external_link_clicked`
Triggered when a user clicks the external link icon on a project card.

**Properties:**
- `projectTitle`: The title of the project
- `projectUrl`: The URL of the external project link
- `projectTags`: Array of project tags
- `projectId`: The unique ID of the project

### `project_modal_opened`
Triggered when a project modal/dialog is opened.

**Properties:**
- `projectTitle`: The title of the project
- `projectId`: The unique ID of the project

### `project_modal_closed`
Triggered when a project modal/dialog is closed.

**Properties:**
- `projectTitle`: The title of the project
- `projectId`: The unique ID of the project

### `project_modal_external_link_clicked`
Triggered when a user clicks the "View Project" link inside a project modal.

**Properties:**
- `projectTitle`: The title of the project
- `projectId`: The unique ID of the project
- `projectUrl`: The URL of the external project link

## Social Links Events

### `social_link_clicked`
Triggered when a user clicks on a social media link.

**Properties:**
- `platform`: The platform name (e.g., "LinkedIn", "Twitter", "GitHub")
- `url`: The URL of the social link
- `icon`: The icon identifier for the platform

## Resume Download Event

### `resume_download_clicked`
Triggered when a user clicks the resume download button.

**Properties:**
- `resumeUrl`: The URL of the resume file

## 404/NotFound Page Events

### `not_found_go_home_clicked`
Triggered when a user clicks "Go to About" button on the 404 page.

**Properties:**
- None

### `not_found_go_back_clicked`
Triggered when a user clicks "Go Back" button on the 404 page.

**Properties:**
- None

## Session Replays

Session replays are automatically enabled for all user sessions. The following privacy settings are configured:

- **Input Masking**: All input fields are masked by default
- **Password Fields**: Fully masked
- **Email Fields**: Fully masked
- **Other Sensitive Data**: Protected through masking

## Auto-captured Events

PostHog's autocapture feature automatically tracks:
- Button clicks
- Link clicks
- Form submissions
- Page views

These events are captured with element selectors and other contextual information.

## Usage in Code

To track a custom event:

```typescript
import { trackEvent } from '@/lib/posthog';

trackEvent('event_name', {
  property1: 'value1',
  property2: 'value2',
});
```

To track a page view:

```typescript
import { trackPageView } from '@/lib/posthog';

trackPageView('PageName', {
  additionalProperty: 'value',
});
```

## Notes

- All events are tracked client-side
- Session replays record user interactions and screen activity
- Input fields are masked in session replays for privacy
- Events are sent to PostHog's cloud instance (`us.i.posthog.com`)
- The API key is stored in `src/lib/posthog.ts`

