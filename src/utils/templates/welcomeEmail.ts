export const getWelcomeEmailTemplate = (name: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome!</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Card -->
        <table role="presentation" width="560" style="max-width:560px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Top accent bar -->
          <tr>
            <td style="background:linear-gradient(90deg,#10b981,#059669);height:6px;font-size:0;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td align="center" style="padding:40px 40px 24px;">
              <div style="font-size:48px;margin-bottom:16px;">👋</div>
              <span style="display:inline-block;background:#ecfdf5;color:#065f46;font-size:12px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;padding:6px 14px;border-radius:20px;border:1px solid #6ee7b7;">
                Welcome Aboard
              </span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 40px 32px;">
              <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#0f172a;text-align:center;">
                Hey ${name}, welcome! 🎉
              </h1>
              <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#64748b;text-align:center;">
                Your account has been created successfully. We're excited to have you on board. Here's a quick look at what you can do:
              </p>

              <!-- Features list -->
              <table role="presentation" width="100%" style="background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;margin-bottom:28px;">
                <tr>
                  <td style="padding:24px 28px;">

                    <table role="presentation" width="100%" style="margin-bottom:16px;">
                      <tr>
                        <td width="36" valign="top">
                          <div style="width:32px;height:32px;background:#ecfdf5;border-radius:8px;text-align:center;line-height:32px;font-size:16px;">✅</div>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#0f172a;">Create & manage todos</p>
                          <p style="margin:0;font-size:13px;color:#64748b;">Organise your tasks and track progress effortlessly.</p>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" style="margin-bottom:16px;">
                      <tr>
                        <td width="36" valign="top">
                          <div style="width:32px;height:32px;background:#ecfdf5;border-radius:8px;text-align:center;line-height:32px;font-size:16px;">⏰</div>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#0f172a;">Set due dates & reminders</p>
                          <p style="margin:0;font-size:13px;color:#64748b;">Get notified before deadlines so nothing slips through.</p>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%;">
                      <tr>
                        <td width="36" valign="top">
                          <div style="width:32px;height:32px;background:#ecfdf5;border-radius:8px;text-align:center;line-height:32px;font-size:16px;">🔒</div>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#0f172a;">Secure & private</p>
                          <p style="margin:0;font-size:13px;color:#64748b;">Your data is protected with JWT authentication.</p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="border-top:1px solid #f1f5f9;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px 40px 32px;">
              <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
                You're receiving this because you just created an account.<br>
                If this wasn't you, please contact support immediately.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};
