import nodemailer from 'nodemailer';

const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT || 587;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host: host.trim(),
      port: Number(port),
      secure: Number(port) === 465,
      auth: {
        user: user.trim(),
        pass: pass.trim()
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER.trim(),
        pass: process.env.GMAIL_PASS.trim()
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  return null;
};

export const sendOtpEmail = async (email, otp, purpose = 'verification') => {
  const mailTransporter = createTransporter();

  if (!mailTransporter) {
    throw new Error('Email delivery service is not configured. Please ensure SMTP_HOST, SMTP_USER, and SMTP_PASS (or GMAIL_USER and GMAIL_PASS) are set in your environment variables.');
  }

  const title = purpose === 'reset'
    ? 'Password Reset Code'
    : 'Verify Your Resume Builder Account';

  const subtitle = purpose === 'reset'
    ? 'Use the following 6-digit OTP to reset your password.'
    : 'Use the following 6-digit OTP to complete your email verification.';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fdfbf7; margin: 0; padding: 24px; color: #1e293b; }
        .container { max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 20px; padding: 36px; border: 1px solid #e8d697; box-shadow: 0 4px 12px rgba(1, 62, 55, 0.05); }
        .logo { font-size: 20px; font-weight: 800; color: #013e37; margin-bottom: 24px; display: inline-block; }
        .title { font-size: 22px; font-weight: 800; margin-bottom: 8px; color: #013e37; }
        .subtitle { font-size: 14px; color: #475569; line-height: 1.5; margin-bottom: 24px; }
        .otp-box { background: #ffefb3; border: 2px dashed #013e37; border-radius: 16px; padding: 20px; text-align: center; margin: 24px 0; }
        .otp-code { font-size: 34px; font-weight: 900; letter-spacing: 8px; color: #013e37; font-family: 'Courier New', monospace; }
        .expiry { font-size: 12px; color: #013e37; opacity: 0.8; text-align: center; margin-top: 8px; font-weight: 600; }
        .footer { font-size: 11px; color: #94a3b8; text-align: center; margin-top: 32px; border-top: 1px solid #f1f5f9; padding-top: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">📄 Resume Builder</div>
        <div class="title">${title}</div>
        <div class="subtitle">${subtitle}</div>
        <div class="otp-box">
          <div class="otp-code">${otp}</div>
          <div class="expiry">Expires in 10 minutes • Do not share this code with anyone.</div>
        </div>
        <p style="font-size: 13px; color: #64748b;">If you did not request this email, please ignore it or contact security.</p>
        <div class="footer">
          © 2026 Resume Builder. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const rawSender = process.env.EMAIL_FROM || process.env.SMTP_USER || process.env.GMAIL_USER || 'ujjwalgoyal019@gmail.com';
    const sender = rawSender.includes('<') ? rawSender : `"Resume Builder" <${rawSender.trim()}>`;

    await mailTransporter.sendMail({
      from: sender,
      to: email,
      subject: `${otp} is your Resume Builder ${purpose === 'reset' ? 'Password Reset' : 'Verification'} Code`,
      html: htmlContent
    });
    console.log(`✉️ OTP email successfully sent to ${email}`);
    return { success: true, delivered: true };
  } catch (err) {
    console.error('SMTP sending error:', err.message);
    throw new Error(`Failed to send verification email: ${err.message}`);
  }
};
