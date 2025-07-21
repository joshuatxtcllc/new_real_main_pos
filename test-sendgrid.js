
const sgMail = require('@sendgrid/mail');

// Get API key from environment
const apiKey = process.env.SENDGRID_API_KEY;

if (!apiKey) {
  console.error('SENDGRID_API_KEY not found in environment variables');
  process.exit(1);
}

// Initialize SendGrid
sgMail.setApiKey(apiKey);

// Test email
const msg = {
  to: 'test@example.com', // Change this to your email
  from: 'noreply@jaysframes.com', // Change this to your verified sender
  subject: 'SendGrid Test Email',
  text: 'Hello from Jay\'s Frames! This is a test email to verify SendGrid integration.',
  html: '<p>Hello from <strong>Jay\'s Frames</strong>!</p><p>This is a test email to verify SendGrid integration.</p>'
};

async function sendTestEmail() {
  try {
    console.log('Sending test email...');
    await sgMail.send(msg);
    console.log('✅ Test email sent successfully!');
    console.log('Check your inbox for the test email.');
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    if (error.response) {
      console.error('Response body:', error.response.body);
    }
  }
}

sendTestEmail();
