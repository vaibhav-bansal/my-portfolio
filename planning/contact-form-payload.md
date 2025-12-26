# Contact Form JSON Payload Specification

## Overview

This document describes the JSON payload structure sent from the Vercel API (`/api/v1/contact-form/submit`) to the n8n webhook.

---

## Request Headers

| Header | Value | Description |
|--------|-------|-------------|
| `Content-Type` | `application/json` | Standard JSON content type |
| `x-webhook-signature` | `string` | HMAC-SHA256 hex digest of the JSON payload body |

**Signature Generation:**
```javascript
const signature = crypto
  .createHmac('sha256', WEBHOOK_SECRET)
  .update(JSON.stringify(payload))
  .digest('hex');
```

---

## Payload Structure

### Request Body (JSON)

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "linkedin": "https://linkedin.com/in/johndoe",
  "phone": "9876543210",
  "countryCode": "+91",
  "fullPhone": "+91 9876543210",
  "message": "Hi Vaibhav, I'd love to discuss a potential PM role at your company.",
  "timestamp": "2025-12-26T10:30:00.000Z",
  "source": "vaibhav.bio"
}
```

---

## Field Descriptions

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `name` | `string` | ✅ Yes | User's full name (trimmed) | `"John Doe"` |
| `email` | `string` | ✅ Yes | User's email address (lowercase, trimmed) | `"john.doe@example.com"` |
| `linkedin` | `string` | ❌ No | LinkedIn profile URL (normalized with https://) | `"https://linkedin.com/in/johndoe"` or `""` |
| `phone` | `string` | ❌ No | Phone number without country code (trimmed) | `"9876543210"` or `""` |
| `countryCode` | `string` | ✅ Yes | Country code with + prefix | `"+91"` (default) |
| `fullPhone` | `string` | ❌ No | Complete phone number with country code | `"+91 9876543210"` or `""` |
| `message` | `string` | ✅ Yes | User's message (trimmed) | `"Hi, I'd like to connect..."` |
| `timestamp` | `string` | ✅ Yes | ISO 8601 timestamp of submission | `"2025-12-26T10:30:00.000Z"` |
| `source` | `string` | ✅ Yes | Source identifier | `"vaibhav.bio"` |

---

## Field Rules & Validation

### `name`
- **Required**: Yes
- **Min length**: 2 characters
- **Format**: Trimmed string
- **Example**: `"John Doe"`

### `email`
- **Required**: Yes
- **Format**: Valid email address (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- **Normalization**: Converted to lowercase and trimmed
- **Example**: `"john.doe@example.com"`

### `linkedin`
- **Required**: No
- **Format**: Valid LinkedIn profile URL
- **Validation**: Regex `/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/`
- **Normalization**: 
  - If provided without `http://` or `https://`, prepends `https://`
  - If empty, sent as empty string `""`
- **Examples**: 
  - `"linkedin.com/in/johndoe"` → `"https://linkedin.com/in/johndoe"`
  - `"https://www.linkedin.com/in/johndoe"` → `"https://www.linkedin.com/in/johndoe"`
  - Not provided → `""`

### `phone`
- **Required**: No
- **Format**: Digits, spaces, hyphens, parentheses allowed
- **Validation**: 
  - If provided, must match `/^[\d\s\-\(\)]+$/`
  - If provided, must have at least 7 digits
- **Example**: `"9876543210"` or `""`

### `countryCode`
- **Required**: Yes (defaults to `"+91"` if not provided)
- **Format**: Country code with `+` prefix
- **Default**: `"+91"` (India)
- **Example**: `"+91"`, `"+1"`, `"+44"`

### `fullPhone`
- **Required**: No
- **Format**: `{countryCode} {phone}` (space-separated)
- **Generation**: Only included if `phone` is provided
- **Example**: `"+91 9876543210"` or `""`

### `message`
- **Required**: Yes
- **Min length**: 10 characters
- **Format**: Trimmed string
- **Example**: `"Hi, I'd like to discuss a potential opportunity."`

### `timestamp`
- **Required**: Yes
- **Format**: ISO 8601 UTC timestamp
- **Generation**: `new Date().toISOString()`
- **Example**: `"2025-12-26T10:30:00.000Z"`

### `source`
- **Required**: Yes
- **Value**: Always `"vaibhav.bio"`
- **Purpose**: Identifies the source of the submission

---

## Example Payloads

### Complete Payload (All Fields)

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "linkedin": "https://linkedin.com/in/johndoe",
  "phone": "9876543210",
  "countryCode": "+91",
  "fullPhone": "+91 9876543210",
  "message": "Hi Vaibhav, I'd love to discuss a potential PM role at your company. I have 5 years of experience in product management.",
  "timestamp": "2025-12-26T10:30:00.000Z",
  "source": "vaibhav.bio"
}
```

### Minimal Payload (Required Fields Only)

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "linkedin": "",
  "phone": "",
  "countryCode": "+91",
  "fullPhone": "",
  "message": "I'm interested in learning more about your work.",
  "timestamp": "2025-12-26T10:30:00.000Z",
  "source": "vaibhav.bio"
}
```

### Payload with LinkedIn Only (No Phone)

```json
{
  "name": "Bob Johnson",
  "email": "bob@example.com",
  "linkedin": "https://linkedin.com/in/bobjohnson",
  "phone": "",
  "countryCode": "+91",
  "fullPhone": "",
  "message": "Would love to connect and discuss product management opportunities.",
  "timestamp": "2025-12-26T10:30:00.000Z",
  "source": "vaibhav.bio"
}
```

---

## Payload Normalization

The API performs the following normalization before sending:

1. **Name**: Trimmed
2. **Email**: Lowercased and trimmed
3. **LinkedIn**: 
   - Trimmed
   - If provided and doesn't start with `http://` or `https://`, prepends `https://`
   - If empty, sent as empty string
4. **Phone**: Trimmed (if provided)
5. **Country Code**: Defaults to `"+91"` if not provided
6. **Full Phone**: Generated as `{countryCode} {phone}` if phone is provided
7. **Message**: Trimmed
8. **Timestamp**: Generated as ISO 8601 UTC string
9. **Source**: Always `"vaibhav.bio"`

---

## Signature Verification

The n8n webhook must verify the `x-webhook-signature` header:

1. Extract the signature from `x-webhook-signature` header
2. Recreate the signature using the same secret:
   ```javascript
   const expectedSignature = crypto
     .createHmac('sha256', WEBHOOK_SECRET)
     .update(JSON.stringify(payload))
     .digest('hex');
   ```
3. Compare `receivedSignature === expectedSignature`
4. If mismatch, reject with 401 Unauthorized

---

## Response from n8n

The n8n workflow should return:

**Success (200):**
```json
{
  "success": true,
  "message": "Message sent successfully! Check your email for confirmation.",
  "referenceId": "CF-1735207800000-ABC123"
}
```

**Error (400/401/500):**
```json
{
  "success": false,
  "error": "Validation failed",
  "message": "Please check that all required fields are filled correctly."
}
```

---

## Notes

- All string fields are trimmed of leading/trailing whitespace
- Empty optional fields are sent as empty strings `""`, not `null`
- The payload is minified (no extra whitespace) when stringified for signature generation
- The signature is calculated on the exact JSON string that will be sent

