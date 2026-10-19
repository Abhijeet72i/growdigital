
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      message: 'Method not allowed.',
    });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    const recipient =
      process.env.CONTACT_EMAIL || 'grow.digiii@gmail.com';

    const sender =
      process.env.RESEND_FROM_EMAIL ||
      'GrowDigital <onboarding@resend.dev>';

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured.',
      });
    }

    const {
      name,
      businessName,
      email,
      phone,
      country,
      businessType,
      timeline,
      projectDetails,
    } = req.body ?? {};

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      typeof businessName !== 'string' ||
      !businessName.trim() ||
      typeof email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please enter valid contact information.',
      });
    }

    const safe = (value: unknown, maxLength = 2000) =>
      typeof value === 'string'
        ? value.trim().slice(0, maxLength)
        : 'Not provided';

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: email.trim(),
      subject: `GrowDigital Enquiry: ${safe(name, 100)}`,
      text: [
        'NEW GROWDIGITAL WEBSITE ENQUIRY',
        '',
        `Name: ${safe(name, 120)}`,
        `Business: ${safe(businessName, 160)}`,
        `Email: ${safe(email, 254)}`,
        `Phone: ${safe(phone, 40)}`,
        `Country: ${safe(country, 100)}`,
        `Business Type: ${safe(businessType, 120)}`,
        `Timeline: ${safe(timeline, 120)}`,
        '',
        'PROJECT DETAILS',
        safe(projectDetails, 5000),
      ].join('\n'),
    });

    if (error) {
      console.error('Resend error:', error);

      return res.status(502).json({
        success: false,
        message:
          'Email delivery failed. Check Resend configuration.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry sent successfully.',
      id: data?.id,
    });
  } catch (error) {
    console.error('Contact API error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unexpected server error.',
    });
  }
}
