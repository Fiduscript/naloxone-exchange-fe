import * as express from 'express';
import { Request, Response, Router } from 'express';
import { ValidationChain } from 'express-validator/check';
import { check } from 'express-validator/check';

import { ErrorMiddleware } from '../helper/error-middleware';
import { sendSlackMessage } from '../client/slack-client';
import { sendEmail } from '../client/mailer';

const config = require('config');
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
 * @param email
 */
router.post('/', validateContactForm, ErrorMiddleware.sendFirst, (req: Request, res: Response) => {
  const body = req.body;
  sendSlackContactUsMessage(body['name'], body['email'], body['message'], function(error, info) {});
  sendContactUsEmail(body['name'], body['email'], body['message'], function(error, info){
    if (error) {
      res.status(500).send('Unable to send ContactUs at this time. Please try again later.');
    } else {
      res.status(200).send('ContactUs Sent!');
    }
  });
});

const sendSlackContactUsMessage = (name: string, email: string, msg: string, callback: Function) => {
  const message = `New ContactUs message!\nName: ${name}\nEmail: ${email}\nMessage: ${msg}`;
  sendSlackMessage(message, callback);
};

const sendContactUsEmail = (name: string, email: string, msg: string, callback: Function) => {
  const contactUsEmailAddr = config.get('contactUs.emailAddr');
  const contactUsSubject = 'New ContactUs Message Received';
  const message = `New ContactUs message!\nName: ${name}\nEmail: ${email}\nMessage: ${msg}`;
  sendEmail(contactUsEmailAddr, email, contactUsSubject, message, callback);
};

export const ContactRouter: Router = router;
