export const getPasswordResetSuccessEmailTemplate = () => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Card -->
        <table role="presentation" width="560" style="max-width:560px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Top accent bar -->
          <tr>
            <td style="background:#334155;height:6px;font-size:0;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td align="center" style="padding:40px 40px 24px;">
              <div style="font-size:48px;margin-bottom:16px;">✅</div>
              <span style="display:inline-block;background:#f0fdf4;color:#166534;font-size:12px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;padding:6px 14px;border-radius:20px;border:1px solid #bbf7d0;">
                Password Updated
              </span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 40px 32px;">
              <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#0f172a;text-align:center;">
                Your password has been reset
              </h1>
              <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#64748b;text-align:center;">
                Hi, your password was successfully updated. You can now log in with your new password.
              </p>

              <!-- Info box -->
              <table role="presentation" width="100%" style="background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table role="presentation" width="100%">
                      <tr>
                        <td width="32" valign="top" style="font-size:18px;">🕐</td>
                        <td style="padding-left:12px;">
                          <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#0f172a;">When</p>
                          <p style="margin:0;font-size:13px;color:#64748b;">${new Date().toUTCString()}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Warning note -->
              <table role="presentation" width="100%" style="background:#fffbeb;border-radius:10px;border:1px solid #fde68a;">
                <tr>
                  <td style="padding:14px 18px;">
                    <p style="margin:0;font-size:13px;color:#92400e;line-height:1.6;">
                      ⚠️ &nbsp;If you did not make this change, please reset your password immediately and contact support.
                    </p>
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
                This is an automated security notification. Please do not reply to this email.
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
