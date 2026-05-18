export const getPasswordResetEmailTemplate = (otp: string) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Reset OTP</title>
</head>
<body style="font-family: Arial, sans-serif; text-align: center; padding: 40px; color: #333333;">
  <h2>Password Reset Request</h2>
  <p>We received a request to reset your password. Use the code below to proceed:</p>
  <p>Your OTP code:</p>
  <p><strong style="font-size: 28px;">${otp}</strong></p>
  <p>This code is valid for <strong>5 minutes</strong>.</p>
  <p style="color: #999999; font-size: 13px;">If you didn't request this, please ignore this email.</p>
</body>
</html>
  `;
};
