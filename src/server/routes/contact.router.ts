import * as express from 'express';
import { AWSError } from 'aws-sdk/lib/error';
import { DynamoDB } from 'aws-sdk/clients/all';
import { NextFunction, Request, Response, Router } from 'express';
import { ValidationChain } from 'express-validator/check';
import { check } from 'express-validator/check';
import { matchedData, sanitize } from 'express-validator/filter';

import { ErrorMiddleware } from '../helper/error-middleware';
import { AWSClientProvider } from '../provider/aws-client-provider';

const router: Router = express.Router();
const ddb: DynamoDB = AWSClientProvider.getDynmoClient();

const validateSubscribe: ValidationChain[] = [
  check('email')
      .isString()
      .trim()
      .isEmail()
      .withMessage('Must provide a well-formed valid email address.'),
  check('message')
      .isString()
      // .not().isEmpty() TODO
      .withMessage('Must provide a valid message.')
];

/**
 * PUT: /api/contact/test
 * @param email
 * @param state
 */
router.use('/dumb', (req: Request, res: Response) => {
  console.error('SUPER DUMB TEST');

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


/**
 * PUT: /api/contact/test
 * @param email
 * @param state
 */
router.use('/test', (req: Request, res: Response) => {
  console.error('test!!!!!!!!!!!!!!!!!!!!!!');

  // ddb.putItem(params, (err: AWSError, data: DynamoDB.PutItemOutput) => {
  //   if (err != null) {
  //     console.error(`Failed to subscribe customer \`${params}\`.` , err.message, err);
  //     res.status(500).send('Unable to subscribe at this time. Please try again later.');
  //   } else {
  //     res.status(201).send('Subscribed!');
  //   }
  // });
  res.status(201).send('Meow!');
});


// router.post('/', validateSubscribe, ErrorMiddleware.sendFirst, (req: Request, res: Response) => {

  // ddb.putItem(params, (err: AWSError, data: DynamoDB.PutItemOutput) => {
  //   if (err != null) {
  //     console.error(`Failed to subscribe customer \`${params}\`.` , err.message, err);
  //     res.status(500).send('Unable to subscribe at this time. Please try again later.');
  //   } else {
  //     res.status(201).send('Subscribed!');
  //   }
  // });
//   return 'done!';
// });

export const ContactRouter: Router = router;
