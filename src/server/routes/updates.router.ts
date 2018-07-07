import * as express from 'express';
import { AWSError } from 'aws-sdk/lib/error';
import { DynamoDB }  from 'aws-sdk/clients/all';
import { NextFunction, Request, Response, Router } from 'express';
import { ValidationChain } from 'express-validator/check';
import { check } from 'express-validator/check';
import { matchedData, sanitize } from 'express-validator/filter';

import { ErrorMiddleware } from '../helper/error-middleware';
import { AWSClientProvider } from '../provider/aws-client-provider';
import { STATE_SET }  from '../../common/constant/states'

const router: Router = express.Router();
const ddb: DynamoDB = AWSClientProvider.getDynmoClient();

const validateSubscribe: ValidationChain[] = [
  check('email')
      .isString()
      .trim()
      .isEmail()
      .withMessage("Must provide a well-formed valid email address."),
  check('state')
      .isString()
      .trim()
      .custom((s: string) => STATE_SET.has(s))
      .withMessage("Must provide a valid US state.")
];

const TABLE_NAME: string = "subscribe_for_updates";

/**
 * PUT: /api/updates/subscribe
 * @param email
 * @param state
 */
router.put('/subscribe', validateSubscribe, ErrorMiddleware.sendFirst, (req: Request, res: Response) => {

  const params: DynamoDB.PutItemInput = {
    TableName: TABLE_NAME,
    Item: DynamoDB.Converter.marshall(req.body)
  };

  ddb.putItem(params, (err: AWSError, data: DynamoDB.PutItemOutput) => {
    if (err != null) {
      console.error(`Failed to subscribe customer \`${params}\`.` , err.message, err);
      res.status(500).send("Unable to subscribe at this time. Please try again later.");
    } else {
      res.status(201).send("Subscribed!");
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
      console.error(`Failed to unsubscribe customer \`${params}\`.` , err.message, err);
      res.status(500).send("Unable to unsubscribe at this time. Please try again later.");
    } else {
      res.status(201).send("Successfully unsubscribed!");
    }
  });
});

export const UpdatesRouter: Router = router;
