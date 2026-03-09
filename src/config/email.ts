import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import dns from 'dns';

// Force DNS resolve IPv4 first (fix ENETUNREACH in Docker)
dns.setDefaultResultOrder('ipv4first');

// Tạo transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  requireTLS: true,
  family: 4,
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  tls: {
    rejectUnauthorized: false,
  },
} as SMTPTransport.Options);

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email config error:', error);
  } else {
    console.log('✅ Email server is ready');
  }
});

export default transporter;
