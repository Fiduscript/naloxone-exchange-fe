import { IncomingWebhook } from '@slack/client';
const config = require('config');
const url = config.get('contactUs.slackWebhookUrl');
const webhook = new IncomingWebhook(url);

export const sendSlackMessage = (msg: string, callback: Function) => {
  webhook.send(msg, function(err, res) {
    if (err) {
      console.error('Error sending slack message:', err);
    } else {
      console.log('Message sent: ', res);
    }
    callback(err, res);
  });
};
