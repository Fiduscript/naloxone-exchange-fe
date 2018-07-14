var nodemailer = require('nodemailer');

let smtpConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'nxeemailer@gmail.com',
    pass: 'nxe123123'
  }
};

var transporter = nodemailer.createTransport(smtpConfig);

export const sendEmail = (toEmail: string, fromEmail: string, subject: string, text: string, callback: Function) => {
  var mailOptions = {
    to: toEmail,
    from: fromEmail,
    subject: subject,
    text: text
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error); // TODO use logging
    } else {
      console.log('Email sent: ' + info.response);
    }
    callback(error, info);
  });
};
