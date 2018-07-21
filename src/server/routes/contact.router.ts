import * as express from 'express';
import { Request, Response, Router } from 'express';
import { ValidationChain } from 'express-validator/check';
import { check } from 'express-validator/check';

import { ContactForm } from '../../public/app/contact/model/contact-form';
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
  const contactForm: ContactForm = {
    name: req.body['name'],
    email: req.body['email'],
    message: req.body['message']
  };

  SlackProvider.create().sendSlackMessage(constructSlackContactUsMessage(contactForm)).then(() => {
      return sendEmail(getContactUsEmailAddr(), contactForm.email, getContactUsSubject(), constructEmailMessage(contactForm));
    }).then(() => {
      res.status(200).send('ContactUs Sent!');
    }).catch((error) => {
      log.error('Failed to send email: ${error}');
      res.status(500).send('Unable to send ContactUs at this time. Please try again later.');
    });
});

const constructEmailMessage = (contactForm: ContactForm) => {
   return `New ContactUs message!\nName: ${contactForm.name}\nEmail: ${contactForm.email}\nMessage: ${contactForm.message}`;
};

const getContactUsEmailAddr = () => {
  return config.get('contactUs.emailAddr');
};

const getContactUsSubject = () => {
  return 'New ContactUs Message Received';
};

const constructSlackContactUsMessage = (contactForm: ContactForm) => {
  return `New ContactUs message!\nName: ${contactForm.name}\nEmail: ${contactForm.email}\nMessage: ${contactForm.message}`;
};


export const ContactRouter: Router = router;
