import * as express from 'express';
import {Request, Response, Router } from 'express';
import { param, ValidationChain } from 'express-validator/check';
import * as _ from 'lodash';

import { STATE_SET } from '../../common/constant/states';
import { Products } from '../../public/app/buy/model/products';
import { ErrorMessage } from '../../public/app/common/message-response';
import { ProductDao } from '../dao/products-dao';
import { ErrorMiddleware } from '../helper/error-middleware';
import { Logger } from '../util/logger';

const log = Logger.create(module);
const dao: ProductDao = ProductDao.create();
const router: Router = express.Router();

const stateValidation: ValidationChain[] = [
  param('state')
      .isString()
      .not().isEmpty()
      .trim()
      .custom((s: string) => STATE_SET.has(s) || s === ProductDao.TEST_STATE)
      .withMessage('A validate state is required')
];

/**
 * @api GET /api/product/list/featured
 */
router.get('/list/featured', (req: Request, res: Response) => {
  dao.getFeaturedProducts()
      .then((result: Products) => {
        res.json(result);
      }).catch((error: Error) => {
        const msg: string = `Failed to fetch featured products.`;
        log.error(msg, error);
        res.status(500).json(new ErrorMessage(msg));
      });
});

/**
 * @api GET /api/product/list/state/:state
 */
router.get('/list/state/:state',
    stateValidation,
    ErrorMiddleware.sendFirst,
    (req: Request, res: Response) => {

  const state = req.params['state'];
  dao.getStateProducts(state)
      .then((result: Products) => {
        res.json(result);
      }).catch((error: Error) => {
        const msg: string = `Failed to fetch products for region \`${state}\.`;
        log.error(msg, error);
        res.status(500).json(new ErrorMessage(msg));
      });
});

export const ProductRouter: Router = router;
