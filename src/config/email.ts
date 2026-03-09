import { google } from 'googleapis';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(toEmail: string, otp: string, expiresMinutesOTP: number) {
  try {
    // 1. Khởi tạo Gmail Service
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client, retryConfig: { retry: 3 } });

    // 2. Tạo nội dung Email theo chuẩn MIME
    const subject = 'Mã OTP xác thực tài khoản';
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    
    const messageParts = [
      `From: My App <mnhquan0109@gmail.com>`,
      `To: ${toEmail}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${utf8Subject}`,
      '',
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Xác thực tài khoản</h2>
        <p>Mã OTP của bạn là:</p>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #007bff;">
          ${otp}
        </div>
        <p style="color: #666; margin-top: 20px;">
          Mã OTP này sẽ hết hạn sau <strong>${expiresMinutesOTP} phút</strong>.
        </p>
      </div>
      `,
    ];

    const message = messageParts.join('\n');

    // 3. Mã hóa Base64URL (bắt buộc theo chuẩn Gmail API)
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // 4. Gửi mail qua HTTP POST (Cổng 443 - Không bị Render chặn)
   const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedMessage },
    }, {
      timeout: 10000 // 10 giây timeout
    });

    console.log("✅ Gửi OTP thành công qua Gmail API! ID:", res.data.id);
  } catch (error) {
   if (error.code === 'ETIMEDOUT' || error.code === 'ECONNRESET') {
        console.error("❌ Lỗi kết nối (Timeout/Reset). Kiểm tra lại DNS hoặc Mạng.");
    } else {
        console.error("❌ Lỗi Gmail API:", error.response?.data || error.message);
    }
    throw error;
  }
}

export default sendMail;