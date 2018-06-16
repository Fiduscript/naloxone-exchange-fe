import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import { SecurityRouter } from './security.router';

const router: Router = express.Router();

router.use('/security', SecurityRouter);

export const ApiRouter: Router = router;
