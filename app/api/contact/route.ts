
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail =
      process.env.CONTACT_EMAIL || 'grow.digiii@gmail.com';

    if (!apiKey) {
      console.error('RESEND_API_KEY is missing');
      return NextResponse.json(
        { success: false, message: 'Email service is not configured.' },
        { status: 500 }
      );
    }

    const body = await request.json();

    const {
      name,
      businessName,
      email,
      phone,
      country,
      businessType,
      timeline,
      projectDetails,
    } = body;

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      typeof email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return NextResponse.json(
        { success: false, message: 'Enter your name and a valid email.' },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: 'GrowDigital Website <onboarding@resend.dev>',
      to: [toEmail],
      replyTo: email.trim(),
      subject: `New website enquiry from ${name.trim()}`,
      text: [
        'New GrowDigital website enquiry',
        '',
        `Name: ${name}`,
        `Business name: ${businessName || 'Not provided'}`,
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
      return NextResponse.json(
        { success: false, message: 'Email could not be sent. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your project enquiry has been sent successfully.',
      id: data?.id,
    });
  } catch (error) {
    console.error('Contact route error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
