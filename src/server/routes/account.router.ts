import * as express from 'express';
import { Request, Response, Router } from 'express';
import * as _ from 'lodash';

import { UserInfo } from '../../public/app/account/model/user-info';
import { ErrorMessage, SuccessMessage } from '../../public/app/common/message-response';
import { UserAccountDao } from '../dao/user-account-dao';

const router: Router = express.Router();
const dao: UserAccountDao = UserAccountDao.create();

// map of login (email) to user to Timer which expries the login
const loggedInUsers: {[user: string]: NodeJS.Timer} = { };

/**
 * @api GET /api/account/login
 */
router.post('/login', (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  dao.getUser(username)
    .then((user: any): void => {
      if (password === user.password) {
        clearTimeout(loggedInUsers[username]);
        loggedInUsers[username] = setTimeout(() => {
          delete loggedInUsers[username];
        }, 20_000);
        res.send(new SuccessMessage(`User ${username} successfully logged in.`));
      } else {
        res.send(401).json(new ErrorMessage(`Login Failed: username or password is incorrect`));
      }
    })
    .catch((error: ErrorMessage): void => {
      res.status(401).json(error);
    });
});

/**
 * @api GET /api/account/whoami
 */
router.get('/whoami', (req: Request, res: Response) => {
  if (_.isEmpty(loggedInUsers)) {
    res.json(new UserInfo());
  } else {
    const login: string = Object.keys(loggedInUsers)[0];
    dao.getUser(login)
        .then((user: UserInfo): void => {
          // translate to new user object because current object includes password
          res.json(new UserInfo(user.name, user.email));
        })
        .catch((error: ErrorMessage): void => {
          res.status(401).json(error);
        });
  }
});

export const AccountRouter: Router = router;
