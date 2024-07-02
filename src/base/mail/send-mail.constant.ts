export const htmlSend = (otp: string, prefix: string) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }

        th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        .header {
            background-color: #f2f2f2;
            padding: 20px;
        }

        .content {
            padding: 20px;
        }

        .footer {
            background-color: #f2f2f2;
            padding: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td class="header">
                <h1>CRUD_NESTJS_POSTGRESQL</h1>
            </td>
        </tr>
        <tr>
            <td class="content">
                <p>Dear you,</p>
                <p>Thank you for signing up for our service.</p>
                <p>Your OTP is: <strong>${otp}</strong></p>
                <p>Please enter this code in the app to verify your account.</p>
                <p>This code will expire in 5 minutes.</p>
                <p><a href="${prefix}">Click here</a></p>
                <p>If you did not request this code, please ignore this email.</p>
            </td>
        </tr>
        <tr>
            <td class="footer">
                <p>© 2023 CRUD_NESTJS_POSTGRESQL. All rights reserved.</p>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};
