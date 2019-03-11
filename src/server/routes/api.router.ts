import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';

import { AuthMiddleware } from '../helper/auth-middleware';
import { AccountRouter } from './account.router';
import { ContactRouter } from './contact.router';
import { OrderRouter } from './order.router';
import { PharmacyRouter } from './pharmacy.router';
import { ProductRouter } from './product.router';
import { UpdatesRouter } from './updates.router';
import { UsersRouter } from './users.router';

const router: Router = express.Router();

router.use('/account', AccountRouter);
router.use('/contact', ContactRouter);
router.use('/order', AuthMiddleware.authorizedUser, OrderRouter);
router.use('/pharmacy', PharmacyRouter);
router.use('/users', UsersRouter);
router.use('/product', ProductRouter);
router.use('/updates', UpdatesRouter);

export const ApiRouter: Router = router;
