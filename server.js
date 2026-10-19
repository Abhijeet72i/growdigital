
import express from 'express';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 3001;

app.use(express.json({ limit: '100kb' }));

app.post('/api/contact', async (req, res) => {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const recipient =
      process.env.CONTACT_EMAIL || 'grow.digiii@gmail.com';

    if (!apiKey) {
      console.error('RESEND_API_KEY is missing.');
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
        message: 'Please provide your name, business name and valid email.',
      });
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      // Replace with an address on your verified Resend domain for production.
      from: 'GrowDigital Website <onboarding@resend.dev>',
      to: [recipient],
      replyTo: email.trim(),
      subject: `New website enquiry from ${name.trim()}`,
      text: [
        'New GrowDigital website enquiry',
        '',
        `Name: ${name}`,
        `Business name: ${businessName}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        `Country: ${country || 'Not provided'}`,
        `Business type: ${businessType || 'Not provided'}`,
        `Launch timeline: ${timeline || 'Not provided'}`,
        '',
        'Project details:',
        projectDetails || 'Not provided',
      ].join('\n'),
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(502).json({
        success: false,
        message: 'Email delivery failed. Please check the server logs.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your project enquiry was sent successfully.',
      id: data?.id,
    });
  } catch (error) {
    console.error('Contact endpoint error:', error);

    return res.status(500).json({
      success: false,
      message: 'An unexpected server error occurred.',
    });
  }
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Contact API running at http://127.0.0.1:${PORT}`);
});
