import * as express from 'express';
import { Request, Response, Router } from 'express';
import * as _ from 'lodash';

const router: Router = express.Router();

const privacyPolicy = {
  versionDate: '2018-12-16T19:25:42.818Z',
  policy: 'Privacy Policy : TBD'
};

/**
 * @api GET /api/account/privacyPolicy
 */
router.get('/privacyPolicy', (req: Request, res: Response) => {
  res.json(privacyPolicy);
});

export const AccountRouter: Router = router;
