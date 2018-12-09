import * as express from 'express';
import { Request, Response, Router } from 'express';
import { body, ValidationChain } from 'express-validator/check';

import { STATE_SET } from '../../common/constant/states';
import { ErrorMessage, SuccessMessage } from '../../public/app/common/message-response';
import { ErrorMiddleware } from '../helper/error-middleware';
import { Logger } from '../util/logger';

const log = Logger.create(module);
const router: Router = express.Router();

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

// todo add validation

/**
 * PUT: /api/updates/subscribe
 * @param email
 * @param state
 */
router.get('/getAddresses',
    // validateSubscribe,
    // ErrorMiddleware.sendFirst,
    (req: Request, res: Response) => {

  // log.info(req);
    res.status(201).json(new SuccessMessage('TEST'));
});

/**
 * PUT: /api/updates/unsubscribe
 * We are not using a delete method for ease of API.
 * @param email
 * @param state
 */
// router.put('/unsubscribe', validateSubscribe, ErrorMiddleware.sendFirst, (req: Request, res: Response) => {
//
//   const params: DynamoDB.DeleteItemInput = {
//     TableName: TABLE_NAME,
//     Key: DynamoDB.Converter.marshall(req.body)
//   };
//
//   ddb.deleteItem(params, (err: AWSError, data: DynamoDB.PutItemOutput) => {
//     if (err != null) {
//       log.error(`Failed to unsubscribe customer \`${params}\`.` , err.message, err);
//       res.status(500).json(new ErrorMessage('Unable to unsubscribe at this time. Please try again later.'));
//     } else {
//       res.status(201).json(new SuccessMessage('Successfully unsubscribed!'));
//     }
//   });
// });

export const UsersRouter: Router = router;
