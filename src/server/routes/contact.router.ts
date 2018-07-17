import * as express from 'express';
import { Request, Response, Router } from 'express';
import { ValidationChain } from 'express-validator/check';
import { check } from 'express-validator/check';

import { ErrorMiddleware } from '../helper/error-middleware';
import { sendEmail } from '../client/email-client';
import { Logger } from '../util/logger';
import { SlackProvider } from '../provider/slack-provider';

const config = require('config');
const log = Logger.create(module);
const router: Router = express.Router();

const validateContactForm: ValidationChain[] = [
  check('name')
    .isString()
    .not().isEmpty()
    .trim()
    .withMessage('Must provide name'),
  check('email')
    .isString()
    .trim()
    .isEmail()
    .withMessage('Must provide a well-formed valid email address.'),
  check('message')
    .isString()
    .not().isEmpty()
    .withMessage('Must provide a valid message.')
];

/**
 * Handles ContactUs requests. Sends Slack message and Email
 * POST: /api/contact
 */
router.post('/', validateContactForm, ErrorMiddleware.sendFirst, (req: Request, res: Response) => {
  const body = req.body;
  sendSlackContactUsMessage(body['name'], body['email'], body['message'], function(error, info) {});
  sendContactUsEmail(body['name'], body['email'], body['message'], function(error, info) {
    if (error) {
      log.error('Failed to send email: ${error}');
      res.status(500).send('Unable to send ContactUs at this time. Please try again later.');
    } else {
      res.status(200).send('ContactUs Sent!');
    }
  });
});

const sendSlackContactUsMessage = (name: string, email: string, msg: string, callback: Function) => {
  const message = `New ContactUs message!\nName: ${name}\nEmail: ${email}\nMessage: ${msg}`;
  SlackProvider.create().sendSlackMessage(message, callback);
};

const sendContactUsEmail = (name: string, email: string, msg: string, callback: Function) => {
  const contactUsEmailAddr = config.get('contactUs.emailAddr');
  const contactUsSubject = 'New ContactUs Message Received';
  const message = `New ContactUs message!\nName: ${name}\nEmail: ${email}\nMessage: ${msg}`;
  sendEmail(contactUsEmailAddr, email, contactUsSubject, message, callback);
};

export const ContactRouter: Router = router;
