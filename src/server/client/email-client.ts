const nodemailer = require('nodemailer');

const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'nxeemailer@gmail.com',
    pass: 'nxe123123'
  }
};

const transporter = nodemailer.createTransport(smtpConfig);

export const sendEmail = (toEmail: string, fromEmail: string, subject: string, text: string): Promise<any> => {
  const mailOptions = {
    to: toEmail,
    from: fromEmail,
    subject: subject,
    text: text
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};