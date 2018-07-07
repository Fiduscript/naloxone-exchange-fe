import * as express from 'express';
import { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.use('/whoami', (req: Request, res: Response) => {
  res.send('nobody');
});

export const SecurityRouter: Router = router;
