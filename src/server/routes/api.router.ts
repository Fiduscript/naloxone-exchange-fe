import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';

import { SecurityRouter } from './security.router';
import { ProductRouter } from './product.router';

const router: Router = express.Router();

router.use('/product', ProductRouter);
router.use('/security', SecurityRouter);

export const ApiRouter: Router = router;
