import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// ── Validation Schema ──────────────────────────────────────────────
const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  service: z.string().min(1, 'Service is required'),
  message: z.string().min(2, 'Message is too short').max(5000),
});

// ── Email HTML Template ────────────────────────────────────────────
function buildEmailHtml(data: z.infer<typeof contactSchema>): string {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); padding: 32px 24px; text-align: center;">
        <h1 style="color: #00e676; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 2px;">WELLDROPP</h1>
        <p style="color: #a0aec0; margin: 8px 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 3px;">New Contact Form Submission</p>
      </div>

      <!-- Body -->
      <div style="padding: 32px 24px; background: #ffffff;">
        <!-- Contact Info Card -->
        <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <h2 style="margin: 0 0 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #64748b;">Contact Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 100px;">Name</td>
              <td style="padding: 8px 0; font-weight: 600; color: #1e293b;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Email</td>
              <td style="padding: 8px 0; font-weight: 600; color: #1e293b;">
                <a href="mailto:${data.email}" style="color: #00e676; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Phone</td>
              <td style="padding: 8px 0; font-weight: 600; color: #1e293b;">${data.phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Service</td>
              <td style="padding: 8px 0;">
                <span style="background: #00e676; color: #0a0a0a; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700;">${data.service}</span>
              </td>
            </tr>
          </table>
        </div>

        <!-- Message Card -->
        <div style="border-left: 4px solid #00e676; background: #f0fff4; border-radius: 0 12px 12px 0; padding: 20px;">
          <h3 style="margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #64748b;">Message</h3>
          <p style="margin: 0; color: #1e293b; line-height: 1.7; white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #f8fafc; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #94a3b8; font-size: 11px;">
          Sent via WELLDROPP Contact Form • ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}
        </p>
      </div>
    </div>
  `;
}

// ── API Route Handler ──────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate the request body
    const body = await request.json();
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 2. Check environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables.');
      return NextResponse.json(
        { success: false, message: 'Server configuration error. Please try again later.' },
        { status: 500 }
      );
    }

    // 3. Create Nodemailer transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // 4. Build and send the email
    const mailOptions = {
      from: `"WELLDROPP Contact Form" <${gmailUser}>`,
      to: 'welldropp.tech@gmail.com',
      replyTo: data.email,
      subject: `New Contact Form Submission — ${data.firstName} ${data.lastName} (${data.service})`,
      text: [
        `New Contact Form Submission`,
        ``,
        `Name: ${data.firstName} ${data.lastName}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || 'Not provided'}`,
        `Service: ${data.service}`,
        ``,
        `Message:`,
        data.message,
      ].join('\n'),
      html: buildEmailHtml(data),
    };

    await transporter.sendMail(mailOptions);

    // 5. Return success
    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully! We will get back to you soon.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again later or email us directly at welldropp.tech@gmail.com.' },
      { status: 500 }
    );
  }
}
