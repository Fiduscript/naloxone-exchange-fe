import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';

import { AuthRouter } from './auth.router';
import { ContactRouter } from './contact.router';
import { PharmacyRouter } from './pharmacy.router';
import { ProductRouter } from './product.router';
import { UpdatesRouter } from './updates.router';

const router: Router = express.Router();

router.use('/product', ProductRouter);
router.use('/updates', UpdatesRouter);
router.use('/contact', ContactRouter);
router.use('/pharmacy', PharmacyRouter);
router.use('/account', AuthRouter);

export const ApiRouter: Router = router;
