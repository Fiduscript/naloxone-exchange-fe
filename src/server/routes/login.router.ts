import * as express from 'express';
import { Request, Response, Router } from 'express';

import { UserInfo } from '../../public/app/account/model/userInfo';
import { ErrorMessage } from '../../public/app/common/error-message';
import { MessageResponse } from '../../public/app/common/message-response';

const router: Router = express.Router();

const testUser = {
  name: 'test',
  password: 'test',
  address: 'Seattle, WA'
};

let testLoggedIn: boolean = false;
let expiredTimer: NodeJS.Timer = null;

/**
 * @api GET /api/account/login
 */
router.post('/login', (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === testUser.name && password === testUser.password) {
    testLoggedIn = true;
    if (expiredTimer != null) {
      clearTimeout(expiredTimer);
    }
    expiredTimer = setTimeout(() => testLoggedIn = false, 10000);
    res.json(new MessageResponse('Login Succeed'));
  } else {
    res.status(401).json(new ErrorMessage('Login Failed: username or password is incorrect'));
  }
});

/**
 * @api GET /api/account/whoami
 */
router.get('/whoami', (req: Request, res: Response) => {
  if (testLoggedIn) {
    res.json(new UserInfo(testUser.name, testUser.address));
  } else {
    res.json(new UserInfo());
  }
});

export const LoginRouter: Router = router;
