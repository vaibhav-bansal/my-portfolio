import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

// Environment variables (set in Vercel dashboard)
const WEBHOOK_URL = process.env.CONTACT_WEBHOOK_URL;
const WEBHOOK_SECRET = process.env.CONTACT_WEBHOOK_SECRET;

interface ContactFormPayload {
  name: string;
  email: string;
  linkedin?: string;
  phone: string;
  countryCode: string;
  message: string;
}

interface WebhookPayload {
  name: string;
  email: string;
  linkedin: string;
  phone: string;
  countryCode: string;
  message: string;
  timestamp: string;
  source: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Validate environment
  if (!WEBHOOK_URL || !WEBHOOK_SECRET) {
    console.error('Missing WEBHOOK_URL or WEBHOOK_SECRET environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const body = req.body as ContactFormPayload;

    // Validate required fields
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Name, email, and message are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Invalid email format'
      });
    }

    // Construct LinkedIn URL from username
    let linkedinUrl = '';
    if (body.linkedin?.trim()) {
      const username = body.linkedin.trim();
      // If it's already a full URL, use it; otherwise construct from username
      if (username.startsWith('http://') || username.startsWith('https://')) {
        linkedinUrl = username;
      } else {
        // Remove any leading slashes or linkedin.com/in/ prefix
        const cleanUsername = username.replace(/^\/+/, '').replace(/^linkedin\.com\/in\//, '').replace(/^in\//, '');
        linkedinUrl = `https://linkedin.com/in/${cleanUsername}`;
      }
    }

    // Construct webhook payload
    const payload: WebhookPayload = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      linkedin: linkedinUrl,
      phone: body.phone?.trim() || '',
      countryCode: body.countryCode || '+91',
      message: body.message.trim(),
      timestamp: new Date().toISOString(),
      source: 'vaibhav.bio'
    };

    // Stringify payload (minified, like n8n expects)
    const normalizedBody = JSON.stringify(payload);

    // Generate HMAC-SHA256 signature
    const signature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(normalizedBody)
      .digest('hex');

    // Send to n8n webhook
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-signature': signature
      },
      body: normalizedBody
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Webhook error:', response.status, errorText);
      throw new Error(`Webhook returned ${response.status}`);
    }

    const result = await response.json();

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! Check your email for confirmation.',
      referenceId: result.referenceId || null
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send message',
      message: 'Please try again or reach out via social media'
    });
  }
}

