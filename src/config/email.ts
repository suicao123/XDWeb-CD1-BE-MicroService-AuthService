import nodemailer from 'nodemailer';
import dns from 'dns';
import net from 'net';

// Force DNS module to prefer IPv4 globally
dns.setDefaultResultOrder('ipv4first');

const smtpHost = process.env.EMAIL_HOST || 'smtp.gmail.com';
const smtpPort = Number(process.env.EMAIL_PORT) || 587;

// Tạo transporter
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465, // Tự động true nếu dùng port 465, false nếu dùng 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  requireTLS: smtpPort !== 465,
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  // Force IPv4 connection
  family: 4,
  tls: {
    rejectUnauthorized: false,
    servername: smtpHost,
  },
} as any);

// Verify connection
transporter.verify((error: Error | null, success: boolean) => {
  if (error) {
    console.error(`❌ Email config error connecting to ${smtpHost}:${smtpPort} -`, error.message);
  } else {
    console.log('✅ Email server is ready');
  }
});

export default transporter;
