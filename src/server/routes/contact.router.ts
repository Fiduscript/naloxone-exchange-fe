import * as express from 'express';
import { AWSError } from 'aws-sdk/lib/error';
import { DynamoDB } from 'aws-sdk/clients/all';
import { NextFunction, Request, Response, Router } from 'express';
import { ValidationChain } from 'express-validator/check';
import { check } from 'express-validator/check';
import { matchedData, sanitize } from 'express-validator/filter';

import { ErrorMiddleware } from '../helper/error-middleware';
import { AWSClientProvider } from '../provider/aws-client-provider';
import { sendSlackMessage } from '../client/slack-client';

const router: Router = express.Router();
const ddb: DynamoDB = AWSClientProvider.getDynmoClient();

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
 * POST: /api/contact
 * @param email
 */
router.post('/', validateContactForm, ErrorMiddleware.sendFirst, (req: Request, res: Response) => {
  const body = req.body;

  sendSlackContactUsMessage(body['name'], body['email'], body['message']);

  // ddb.putItem(params, (err: AWSError, data: DynamoDB.PutItemOutput) => {
  //   if (err != null) {
  //     console.error(`Failed to subscribe customer \`${params}\`.` , err.message, err);
  //     res.status(500).send('Unable to subscribe at this time. Please try again later.');
  //   } else {
  //     res.status(201).send('Subscribed!');
  //   }
  // });
  res.status(200).send('DONE!!');
});

const sendSlackContactUsMessage = (name: String, email: String, msg: String) => {
  const message = `New ContactUs message!\nName: ${name}\nEmail: ${email}\nMessage: ${msg}`;
  sendSlackMessage(message);
};

export const ContactRouter: Router = router;
