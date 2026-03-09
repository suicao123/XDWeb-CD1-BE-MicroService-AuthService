import nodemailer from 'nodemailer';
import dns from 'dns';

const smtpHost = process.env.EMAIL_HOST || 'smtp.gmail.com';
const smtpPort = Number(process.env.EMAIL_PORT) || 587;

// Custom lookup function using dns.resolve4 to GUARANTEE IPv4 address
const ipv4Lookup = (
  hostname: string,
  options: dns.LookupOptions,
  callback: (err: NodeJS.ErrnoException | null, address: string, family: number) => void
) => {
  dns.resolve4(hostname, (err, addresses) => {
    if (err || addresses.length === 0) {
      return callback(err || new Error(`No IPv4 address found for ${hostname}`), '', 4);
    }
    // Return the first matched IPv4 address
    callback(null, addresses[0], 4);
  });
};

// Tạo transporter
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  requireTLS: true,
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  // Đưa lookup trực tiếp vào cấu hình connection
  lookup: ipv4Lookup,
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
