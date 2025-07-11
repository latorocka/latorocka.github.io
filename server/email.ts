import sgMail from '@sendgrid/mail';

// Email service configuration
const YOUR_EMAIL = 'latorocka@gmail.com';
const FROM_EMAIL = 'noreply@portfolio.com'; // This will be overridden by SendGrid if configured

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(formData: ContactFormData): Promise<boolean> {
  const { name, email, subject, message } = formData;
  
  // Check if SendGrid is configured
  if (process.env.SENDGRID_API_KEY) {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      const emailContent = {
        to: YOUR_EMAIL,
        from: FROM_EMAIL,
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
      
      await sgMail.send(emailContent);
      console.log('Email sent successfully via SendGrid');
      return true;
    } catch (error) {
      console.error('SendGrid email error:', error);
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