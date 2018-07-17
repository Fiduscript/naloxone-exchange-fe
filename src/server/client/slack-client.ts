import { IncomingWebhook } from '@slack/client';
import { Logger } from '../util/logger';

const log = Logger.create(module);

export class SlackClient {
  constructor(private webhook: IncomingWebhook) {}

  public sendSlackMessage = (msg: string, callback: Function) => {
    this.webhook.send(msg, function(err, res) {
      if (err) {
        log.error('Error sending slack message:', err);
      } else {
        log.info('Message sent: ', res);
      }
      callback(err, res);
    });
  }
}
