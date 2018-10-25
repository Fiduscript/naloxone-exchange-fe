import { DynamoDB } from 'aws-sdk/clients/all';
import { AWSError } from 'aws-sdk/lib/error';
import * as express from 'express';
import { Request, Response, Router } from 'express';
import { body, ValidationChain } from 'express-validator/check';

import { STATE_SET } from '../../common/constant/states';
import { ErrorMessage, SuccessMessage } from '../../public/app/common/message-response';
import { ErrorMiddleware } from '../helper/error-middleware';
import { AWSProvider } from '../provider/aws-provider';
import { Logger } from '../util/logger';

const log = Logger.create(module);
const router: Router = express.Router();
const ddb: DynamoDB = AWSProvider.getDynmoClient();

const validateSubscribe: ValidationChain[] = [
  body('email')
      .isString()
      .trim()
      .isEmail()
      .withMessage('Must provide a well-formed valid email address.'),
  body('state')
      .isString()
      .trim()
      .custom((s: string) => STATE_SET.has(s))
      .withMessage('Must provide a valid US state.')
];

const TABLE_NAME: string = 'subscribe_for_updates';

/**
 * PUT: /api/updates/subscribe
 * @param email
 * @param state
 */
router.put('/subscribe',
    validateSubscribe,
    ErrorMiddleware.sendFirst,
    (req: Request, res: Response) => {

  const params: DynamoDB.PutItemInput = {
    TableName: TABLE_NAME,
    Item: DynamoDB.Converter.marshall(req.body)
  };

  ddb.putItem(params, (err: AWSError, data: DynamoDB.PutItemOutput) => {
    if (err != null) {
      log.error(`Failed to subscribe customer \`${params}\`.` , err.message, err);
      res.status(500).json(new ErrorMessage('Unable to subscribe at this time. Please try again later.'));
    } else {
      res.status(201).json(new SuccessMessage('Successfully subscribed!'));
    }
  });
});

/**
 * PUT: /api/updates/unsubscribe
 * We are not using a delete method for ease of API.
 * @param email
 * @param state
 */
router.put('/unsubscribe', validateSubscribe, ErrorMiddleware.sendFirst, (req: Request, res: Response) => {

  const params: DynamoDB.DeleteItemInput = {
    TableName: TABLE_NAME,
    Key: DynamoDB.Converter.marshall(req.body)
  };

  ddb.deleteItem(params, (err: AWSError, data: DynamoDB.PutItemOutput) => {
    if (err != null) {
      log.error(`Failed to unsubscribe customer \`${params}\`.` , err.message, err);
      res.status(500).json(new ErrorMessage('Unable to unsubscribe at this time. Please try again later.'));
    } else {
      res.status(201).json(new SuccessMessage('Successfully unsubscribed!'));
    }
  });
});

export const UpdatesRouter: Router = router;
