// src/lib/services/email.ts
import nodemailer from 'nodemailer';

/**
 * Send specialist credentials email
 */
export async function sendSpecialistCredentialsEmail(data: {
  email: string;
  firstName: string;
  lastName: string;
  tempPassword: string;
  loginUrl: string; // e.g., "https://elira-health.com/login"
}): Promise<void> {
  const { email, firstName, lastName, tempPassword, loginUrl } = data;

  const emailBody = `Welcome to Elira Health - Your Specialist Account

Dear Dr. ${firstName} ${lastName},

You have been added as a specialist on the Elira Health platform.

Your Login Credentials:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: ${email}
Temporary Password: ${tempPassword}
Login: ${loginUrl}
━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPORTANT:
• Please change your password after your first login
• Do not share your credentials
• Contact admin if you experience issues

Need help? Reply to this email or contact support.

Best regards,
Elira Health Team`;

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #6b46c1; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Welcome to Elira Health</h2>
      <p>Dear Dr. ${firstName} ${lastName},</p>
      <p>You have been added as a specialist on the Elira Health platform.</p>
      
      <div style="background-color: #f7fafc; border-left: 4px solid #6b46c1; padding: 15px; margin: 20px 0; border-radius: 4px;">
        <h4 style="margin-top: 0; color: #4a5568;">Your Login Credentials:</h4>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 4px 0; font-weight: bold; width: 120px;">Email:</td>
            <td style="padding: 4px 0; color: #2d3748;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: bold; width: 120px;">Password:</td>
            <td style="padding: 4px 0; font-family: monospace; font-size: 1.1em; color: #2d3748;"><strong>${tempPassword}</strong></td>
          </tr>
        </table>
        <p style="margin-bottom: 0; margin-top: 15px;">
          <a href="${loginUrl}" style="background-color: #6b46c1; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Log In Now</a>
        </p>
      </div>

      <div style="background-color: #fffaf0; border-left: 4px solid #dd6b20; padding: 15px; margin: 20px 0; border-radius: 4px; font-size: 0.9em; color: #7b341e;">
        <p style="margin: 0; font-weight: bold;">⚠️ IMPORTANT SECURITY WARNING:</p>
        <ul style="margin: 5px 0 0 0; padding-left: 20px;">
          <li>Please change your password after your first login.</li>
          <li>Do not share your credentials with anyone.</li>
          <li>Contact an admin immediately if you experience issues.</li>
        </ul>
      </div>

      <p style="font-size: 0.9em; color: #718096; margin-top: 30px;">
        Need help? Reply to this email or contact support.<br/>
        Best regards,<br/>
        <strong>Elira Health Team</strong>
      </p>
    </div>
  `;

  console.log(`[Email Attempt] Sending specialist credentials email to ${email}`);
  console.log(`-----------------------------------------`);
  console.log(`To: ${email}`);
  console.log(`Subject: Welcome to Elira Health - Your Specialist Account`);
  console.log(`Password: ${tempPassword}`);
  console.log(`Login URL: ${loginUrl}`);
  console.log(`-----------------------------------------`);

  const host = process.env.SMTP_HOST || process.env.EMAIL_SERVER_HOST;
  const port = parseInt(process.env.SMTP_PORT || process.env.EMAIL_SERVER_PORT || "587");
  const user = process.env.SMTP_USER || process.env.EMAIL_SERVER_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_SERVER_PASSWORD;
  const from = process.env.SMTP_FROM || process.env.EMAIL_FROM || "Elira Health <noreply@elira-health.com>";

  if (!host || !user || !pass) {
    console.warn(`[Email Service] SMTP configuration missing. Email not sent, logged above.`);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from,
      to: email,
      subject: "Welcome to Elira Health - Your Specialist Account",
      text: emailBody,
      html: emailHtml,
    });

    console.log(`[Email Service] Credentials email sent successfully to ${email}`);
  } catch (error) {
    console.error(`[Email Service] Failed to send email to ${email}:`, error);
    // Graceful handling: log it but do not throw error so DB operations are not rolled back unnecessarily
  }
}
