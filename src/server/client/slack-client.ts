import { IncomingWebhook } from '@slack/client';
import { Logger } from '../util/logger';

const log = Logger.create(module);

export class SlackClient {
  constructor(private webhook: IncomingWebhook) {}

  public sendSlackMessage = (msg: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.webhook.send(msg, function (err, res) {
        if (err) {
          // return
          log.error('Error sending slack message:', err);
          reject(err);
        } else {
          log.info('Message sent: ', res);
          resolve();
        }
      });
    });
  }
}
