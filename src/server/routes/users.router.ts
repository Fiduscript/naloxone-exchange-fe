import * as express from 'express';
import { Request, Response, Router } from 'express';
import { body, ValidationChain } from 'express-validator/check';

import { STATE_SET } from '../../common/constant/states';
import { UserAddress } from '../../public/app/account/model/user-address';
import { UsersDao } from '../dao/users-dao';
import { ErrorMiddleware } from '../helper/error-middleware';
import { Logger } from '../util/logger';

const log = Logger.create(module);
const router: Router = express.Router();

const validateUserAddress: ValidationChain[] = [
  body('name')
    .isString()
    .isLength({min: 1})
    .withMessage('Must provide name'),
  body('street')
    .isString()
    .isLength({min: 1})
    .withMessage('Must provide street'),
  body('city')git
    .isString()
    .isLength({min: 1})
    .withMessage('Must provide city'),
  body('zip')
    .isString()
    .isLength({min: 3, max: 15})
    .withMessage('Must provide valid ZIP'),
  body('state')
    .isString()
    .trim()
    .custom((s: string) => STATE_SET.has(s))
    .withMessage('Must provide a valid US state.'),
];

const validateAddressId: ValidationChain[] = [
  body('addressId')
    .isString()
    .isLength({min: 1})
    .withMessage('Must provide addressId')
];

/**
 * GET: /api/users/getAddresses/
 */
router.get('/getAddresses', (req: Request, res: Response) => {
    log.warn(JSON.stringify(res.locals));
    const users_dao = UsersDao.create();
    users_dao.getAddressesForUser(res.locals.user.id).then((addresses: UserAddress[]) => {
      res.status(200).json(addresses);
    }).catch((err) => {
      log.error(err.stack);
      res.status(500).json(err);
    });
  });

/**
 * PUT: /api/users/saveAddress
 * @param address
 */
router.put('/saveAddress',
  validateUserAddress,
  ErrorMiddleware.sendFirst,
  (req: Request, res: Response) => {

    req.body.userId = res.locals.user.id;
    const users_dao: UsersDao = UsersDao.create();
    users_dao.saveAddress(req.body).then( (address: UserAddress) => {
      res.status(201).json(address);
    }).catch((err) => {
      log.error(err.stack);
      log.error(`Failed to save address \`${req.body}\`.`, err);
      res.status(500).json(err || err.message);
    });
  });

/**
 * PUT: /api/users/deleteAddress
 * @param addressId
 */
router.put('/deleteAddress',
  validateAddressId,
  ErrorMiddleware.sendFirst,
  (req: Request, res: Response) => {

    const userId = res.locals.user.id;
    if (!req.body.addressId || !userId) {
      res.status(400).json('Cannot delete address without addressId and userId');
      return;
    }

    const users_dao: UsersDao = UsersDao.create();
    users_dao.deleteAddress(userId, req.body.addressId).then((address: UserAddress) => {
      res.status(200).json(address);
    }).catch((err) => {
      log.error(`Failed to delete address \`${req.body}\`.`, err.message, err);
      log.error(err.stack);
      res.status(500).json(err);
    });
  });

export const UsersRouter: Router = router;
