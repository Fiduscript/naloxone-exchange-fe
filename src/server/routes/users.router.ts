import * as express from 'express';
import {Request, Response, Router} from 'express';
import {body, ValidationChain} from 'express-validator/check';

import {STATE_SET} from '../../common/constant/states';
import {IUserAddress} from '../../public/app/account/model/user-address';
import {UsersDao} from '../dao/users-dao';
import {ErrorMiddleware} from '../helper/error-middleware';
import {Logger} from '../util/logger';

const log = Logger.create(module);
const router: Router = express.Router();

const validateUserAddress: ValidationChain[] = [
  body('userId')
    .isString()
    .isLength({min: 1})
    .withMessage('Must provide userId'),
  body('name')
    .isString()
    .isLength({min: 1})
    .withMessage('Must provide name'),
  body('street')
    .isString()
    .isLength({min: 1})
    .withMessage('Must provide street'),
  body('city')
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

const validateUserIdAddressId: ValidationChain[] = [
  body('userId')
    .isString()
    .isLength({min: 1})
    .withMessage('Must provide userId'),
  body('addressId')
    .isString()
    .isLength({min: 1})
    .withMessage('Must provide addressId')
];

/**
 * GET: /api/users/getAddresses/:userId
 * @param userId
 */
router.get('/getAddresses/:userId', (req: Request, res: Response) => {
    if (!req.params.userId) {
      res.status(400).json('Must provide userId');
      return;
    }
    const users_dao = UsersDao.create();
    users_dao.getAddressesForUser(req.params.userId).then((addresses: IUserAddress[]) => {
      res.status(200).json(addresses);
    }).catch((err) => {
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
    const users_dao: UsersDao = UsersDao.create();
    users_dao.saveAddress(req.body).then( (address: IUserAddress) => {
      res.status(201).json(address);
    }).catch((err) => {
      log.error(`Failed to save address \`${req.body}\`.`, err.message, err);
      res.status(500).json(err);
    });
  });

/**
 * PUT: /api/users/deleteAddress
 * @param address
 */
router.put('/deleteAddress',
  validateUserIdAddressId,
  ErrorMiddleware.sendFirst,
  (req: Request, res: Response) => {

    if (!req.body.addressId || !req.body.userId) {
      res.status(400).json('Cannot delete address without addressId and userId');
      return;
    }

    const users_dao: UsersDao = UsersDao.create();
    users_dao.deleteAddress(req.body.userId, req.body.addressId).then((address: IUserAddress) => {
      res.status(200).json(address);
    }).catch((err) => {
      log.error(`Failed to delete address \`${req.body}\`.`, err.message, err);
      res.status(500).json(err);
    });
  });

export const UsersRouter: Router = router;
