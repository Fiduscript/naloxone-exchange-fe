import * as express from 'express';
import { Request, Response, Router } from 'express';

import { Logger } from '../util/logger';

const log = Logger.create(module);
const router: Router = express.Router();

router.get('/list', (req: Request, res: Response) => {
  res.status(200).json({orders: []});
});

export const OrderRouter: Router = router;
