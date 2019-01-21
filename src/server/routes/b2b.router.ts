import * as express from 'express';
import {Request, Response, Router } from 'express';
import { param, ValidationChain } from 'express-validator/check';

import { Logger } from '../util/logger';
import { BusinessPurchaseOrderDao } from '../dao/business-purchase-order-dao';
import { IBusinessPurchaseOrder } from '../../public/app/buy/model/businessPurchaseOrder';
import { ErrorMiddleware } from '../helper/error-middleware';

const log = Logger.create(module);
const dao: BusinessPurchaseOrderDao = BusinessPurchaseOrderDao.create();
const router: Router = express.Router();

const idValidation: ValidationChain[] = [
  param('id')
      .isString()
      .not().isEmpty()
      .trim()
      .withMessage('A valid purchase order ID is required')
];

/**
 * @api GET /api/b2b/exists/:id
 */
router.get('/exists/:id',
  idValidation,
  ErrorMiddleware.sendFirst,
  (req: Request, res: Response) => {
  const id = req.params['id'];
  dao.getBusinessPurchaseOrder(id)
    .then(() => res.json(true))
    .catch(err => {
      if (err.name === 'ItemNotFoundException') {
        return res.json(false);
      }
      log.error(`An error occurred while checking the existence of business purchase order [${id}]`, [err.message, err]);
      return res.status(500).json(`Unable to check existence of ${id}.`);
    });
});

/**
 * @api PUT /api/b2b
 */
router.put('', (req: Request, res: Response) => {
  dao.createBusinessPurchaseOrder(req.body)
      .then((businessPurchaseOrder: IBusinessPurchaseOrder) => res.json(businessPurchaseOrder))
      .catch((error: Error) => {
        const msg: string = `An error occurred while create business purchase order. ${JSON.stringify(req.body)}`;
        log.error(msg, error);
        res.status(500).json(`Unable to create purchase order.`);
      });
});

export const BusinessPurchaseOrderRouter: Router = router;
