import * as express from 'express';
import { Request, Response, Router } from 'express';
import * as _ from 'lodash';

import { UserInfo } from '../../public/app/account/model/user-info';
import { ErrorMessage } from '../../public/app/common/error-message';
import { MessageResponse } from '../../public/app/common/message-response';

const router: Router = express.Router();

// map of login (email) to UserInfo.
const users = {
  'test@test.com': {
    name: 'Test User',
    password: 'test',
    email: 'test@test.com'
  }
};

// map of login (email) to user to Timer which expries the login
const loggedInUsers: {[user: string]: NodeJS.Timer} = { };

/**
 * @api GET /api/account/login
 */
router.post('/login', (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = users[username];
  if (users[username] != null && password === user.password) {
    if (loggedInUsers[username] != null) {
      clearTimeout(loggedInUsers[username]);
    }
    loggedInUsers[username] = setTimeout(() => {
      delete loggedInUsers[username];
    }, 20_0000);

    res.json(new MessageResponse('Login Succeed'));
  } else {
    res.status(401).json(new ErrorMessage('Login Failed: username or password is incorrect'));
  }
});

/**
 * @api GET /api/account/whoami
 */
router.get('/whoami', (req: Request, res: Response) => {
  if (_.isEmpty(loggedInUsers)) {
    res.json(new UserInfo());
  } else {
    const user = users[Object.keys(loggedInUsers)[0]];
    res.json(new UserInfo(user.name, user.email));
  }
});

export const AccountRouter: Router = router;
