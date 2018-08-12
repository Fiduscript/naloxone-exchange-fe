import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';

import { ContactRouter } from './contact.router';
import { ProductRouter } from './product.router';
import { SecurityRouter } from './security.router';
import { UpdatesRouter } from './updates.router';
import { PharmacyRouter } from './pharmacy.router';

const router: Router = express.Router();

router.use('/product', ProductRouter);
router.use('/security', SecurityRouter);
router.use('/updates', UpdatesRouter);
router.use('/contact', ContactRouter);
router.use('/pharmacy', PharmacyRouter);

export const ApiRouter: Router = router;
