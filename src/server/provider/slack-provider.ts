import { IncomingWebhook } from '@slack/client';
import { SlackClient } from '../client/slack-client';
const config = require('config');
const webhookUrl = config.get('contactUs.slackWebhookUrl');

export module SlackProvider {
  export const create = (): SlackClient => {
    const webhook: IncomingWebhook = new IncomingWebhook(webhookUrl);
    return new SlackClient(webhook);
  };
}
