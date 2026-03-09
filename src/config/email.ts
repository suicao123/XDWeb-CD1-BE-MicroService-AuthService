import nodemailer from 'nodemailer';
const {google} = require('googleapis');

// Force DNS module to prefer IPv4 globally
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Tạo transporter
async function sendMail(toEmail: string, otp: string, expiresMinutesOTP: number) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'mnhquan0109@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    await transport.sendMail({
      from: 'My App <mnhquan0109@gmail.com>',
      to: toEmail,
      subject: 'Mã OTP của bạn',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Xác thực tài khoản</h2>
        <p>Mã OTP của bạn là:</p>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #007bff;">
          ${otp}
        </div>
        <p style="color: #666; margin-top: 20p  x;">
          Mã OTP này sẽ hết hạn sau <strong>${expiresMinutesOTP} phút</strong>.
        </p>
        <p style="color: #999; font-size: 12px;">
          Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.
        </p>
      </div>
    `,
    });
    
    console.log("Gửi thành công ");
  } catch (error) {
    console.error(`❌ Email config error connecting to `+ error.message);

  }
}

// Verify connection


export default sendMail;
