import * as SES from 'aws-sdk/clients/ses';
import { AWSProvider } from '../provider/aws-provider';
const config = require('config');
const SOURCE_EMAIL_ADDR = config.get('contactUs.emailAddr');

export const sendEmail = (toEmail: string, fromEmail: string, subject: string, text: string): Promise<any> => {

  const params: SES.Types.SendEmailRequest = {
    Destination: {
      ToAddresses: [
        toEmail
      ]
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: text
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    Source: SOURCE_EMAIL_ADDR,
    ReplyToAddresses: [
      fromEmail
    ],
  };

  return AWSProvider.getSesClient().sendEmail(params).promise();
};
