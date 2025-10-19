# Fixing Sanity 403 Forbidden Error

## The Problem
You're getting a `403 Forbidden` error when trying to fetch data from Sanity. This means the API request is being rejected due to authentication/authorization issues.

## Root Causes & Solutions

### 1. **Missing API Token** (Most Likely)
Sanity projects require an API token for data access, even for public read operations.

**Solution:**
1. Go to [Sanity Management Console](https://www.sanity.io/manage/personal/project/nhwa1k1t/api/tokens)
2. Create a new token with "Read" permissions
3. Add the token to your environment variables

**Steps:**
```bash
# Create .env file in your project root
echo "SANITY_API_TOKEN=your_token_here" > .env
```

Then update `src/lib/sanity.ts`:
```typescript
export const client = createClient({
  projectId: 'nhwa1k1t',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Add this line
})
```

### 2. **Project Not Published**
Make sure your Sanity project content is published, not just saved as drafts.

**Solution:**
1. Go to your Sanity Studio
2. Ensure all content has "Published" status (green dot)
3. Check that documents are not in "Draft" state

### 3. **CORS Configuration**
The project might not be configured to allow requests from your domain.

**Solution:**
1. Go to Sanity Management Console
2. Navigate to "API" → "CORS origins"
3. Add your domain (e.g., `http://localhost:8080`, `https://vaibhav.bio`)

### 4. **Dataset Permissions**
The dataset might not be configured for public read access.

**Solution:**
1. In Sanity Management Console
2. Go to "API" → "Dataset"
3. Ensure "Public read access" is enabled

## Quick Fix Implementation

I've already implemented a fallback system that will show default content if Sanity is unavailable. The website will now work even with the 403 error, but you should still fix the root cause.

## Testing the Fix

1. **Check Console Logs:**
   - ✅ Success: "Sanity data fetched successfully"
   - ⚠️ Fallback: "Sanity API failed, using fallback data"

2. **Verify API Token:**
   ```bash
   # Test in browser console
   fetch('https://nhwa1k1t.apicdn.sanity.io/v2024-01-01/data/query/production?query=*[_type=="personal"][0]', {
     headers: {
       'Authorization': 'Bearer YOUR_TOKEN_HERE'
     }
   })
   ```

## Environment Variables Setup

Create a `.env` file in your project root:
```env
SANITY_API_TOKEN=your_actual_token_here
SANITY_PROJECT_ID=nhwa1k1t
SANITY_DATASET=production
```

## Production Deployment

For production deployment, make sure to:
1. Set environment variables in your hosting platform
2. Update CORS origins to include your production domain
3. Use the production API token (not development token)

## Fallback System

The application now includes:
- ✅ Fallback data when Sanity is unavailable
- ✅ Graceful error handling
- ✅ Console logging for debugging
- ✅ No broken UI states

This ensures your portfolio works even if there are temporary Sanity issues.
