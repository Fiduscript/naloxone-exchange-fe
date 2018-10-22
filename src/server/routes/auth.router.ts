import * as express from 'express';
import { Request, Response, Router } from 'express';
import * as _ from 'lodash';
import * as passport from 'passport';

import { UserInfo } from '../../public/app/account/model/user-info';
import { ErrorMessage, SuccessMessage } from '../../public/app/common/message-response';
import { UserAccountDao } from '../dao/user-account-dao';
import { Logger } from '../util/logger';

const log = Logger.create(module);
const router: Router = express.Router();
const dao: UserAccountDao = UserAccountDao.create();

// Set up passport. Not sure where this belongs long term. Perhaps Auth Dao?
passport.serializeUser((user: UserInfo, done: (err: any, login: string) => void) => {
  done(null, user.email);
});

passport.deserializeUser((login: string, done: (err: any, user?: string) => void) => {
  done(null, login);
});

/**
 * @api GET /api/account/login
 */
router.post('/login', (req: Request, res: Response): void => {
  const username = req.body.username;
  const password = req.body.password;

  dao.getUser(username)
    .then((user: any): void => {
      if (password === user.password) {
        req.login(user, (error) => {
          if (error) {
            log.error(`Failed logging in ${username}.`, error);
            res.send(500).json(new ErrorMessage(`Login Failed`));
          } else {
            res.send(new SuccessMessage(`User ${username} successfully logged in.`));
          }
        });
      } else {
        res.send(401).json(new ErrorMessage(`Login Failed: username or password is incorrect`));
      }
    })
    .catch((error: ErrorMessage): void => {
      res.status(401).json(error);
    });
});

router.delete('/logout', (req: Request, res: Response): void => {
  req.logout();
  res.send(new SuccessMessage('Sucessfully logged out.'));
});

/**
 * @api GET /api/account/whoami
 */
router.get('/whoami', (req: Request, res: Response): void => {

  log.info(`user: ${req.user}, authenticated: ${req.isAuthenticated()}`);
  dao.getUser(req.user)
      .then((user: UserInfo): void => {
        // translate to new user object because current object includes password
        res.json(new UserInfo(user.name, user.email));
      })
      .catch((error: ErrorMessage): void => {
        log.warn(`whoami failed: ${error}`);
        res.json(new UserInfo());
      });
});

export const AuthRouter: Router = router;
