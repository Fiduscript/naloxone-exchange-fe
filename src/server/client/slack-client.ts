import {IncomingWebhook, WebClient} from '@slack/client';
const url = 'https://hooks.slack.com/services/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';
const webhook = new IncomingWebhook(url);

// require('dotenv').config();

export const sendSlackMessage = (msg: string, callback: Function) => {
  // Send simple text to the webhook channel
  webhook.send(msg, function(err, res) {
    if (err) {
      console.error('Error sending slack message:', err);
    } else {
      console.log('Message sent: ', res);
    }
    callback(err, res);
  });
};
