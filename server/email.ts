import nodemailer from 'nodemailer';

// Email service configuration
const YOUR_EMAIL = 'latorocka@gmail.com';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(formData: ContactFormData): Promise<boolean> {
  const { name, email, subject, message } = formData;
  
  // Check if Gmail credentials are configured
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    try {
      // Create transporter using Gmail SMTP
      const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD
        }
      });

      const emailContent = {
        from: process.env.GMAIL_USER,
        to: YOUR_EMAIL,
        replyTo: email, // This allows you to reply directly to the sender
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>This email was sent from your portfolio contact form.</small></p>
        `,
        text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This email was sent from your portfolio contact form.
        `
      };
      
      await transporter.sendMail(emailContent);
      console.log('Email sent successfully via Gmail SMTP');
      return true;
    } catch (error) {
      console.error('Gmail SMTP email error:', error);
      return false;
    }
  } else {
    // Log the email content for development/testing
    console.log('=== EMAIL WOULD BE SENT ===');
    console.log(`To: ${YOUR_EMAIL}`);
    console.log(`From: ${email}`);
    console.log(`Subject: Portfolio Contact: ${subject}`);
    console.log(`Name: ${name}`);
    console.log(`Message: ${message}`);
    console.log('=== END EMAIL ===');
    
    // Return true for development mode
    return true;
  }
}