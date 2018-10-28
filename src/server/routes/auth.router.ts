import * as express from 'express';
import { Request, Response, Router } from 'express';
import { check } from 'express-validator/check';
import { ValidationChain } from 'express-validator/check';
import * as _ from 'lodash';
import * as passport from 'passport';

import { jsonConvert } from '../../common/json-convert-provider';
import { StrongPasswordValidator } from '../../common/validator/strong-password-validator';
import { IUserCredentials } from '../../public/app/account/model/user-credentials';
import { UserInfo } from '../../public/app/account/model/user-info';
import { ErrorMessage, SuccessMessage } from '../../public/app/common/message-response';
import { AuthDao } from '../dao/auth-dao';
import { UserAccountDao } from '../dao/user-account-dao';
import { ErrorMiddleware } from '../helper/error-middleware';
import { IUserSession } from '../model/user-session';
import { Logger } from '../util/logger';

const log = Logger.create(module);
const router: Router = express.Router();

const authDao: AuthDao = AuthDao.create();
const userDao: UserAccountDao = UserAccountDao.create();

// Set up passport. Not sure where this belongs long term. Perhaps Auth Dao?
passport.serializeUser((user: IUserSession, done: (err: any, id: string) => void) => {
  done(null, user.userId);
});

passport.deserializeUser((id: string, done: (err?: any, user?: UserInfo) => void) => {
  userDao.getUser(id)
      .then((user: UserInfo): void => { done(null, user); })
      .catch((error: ErrorMessage): void => { done(error, null); });
});

const validateUserCredentials: ValidationChain[] = [
  check('email')
    .isString()
    .trim()
    .isEmail()
    .customSanitizer((v: string): string => v.toLowerCase())
    .withMessage('Must provide a well-formed email address.'),
  check('password')
    .isString()
    .trim()
    .withMessage('Password is required.')
];

const validateRegisterUserInfo: ValidationChain[] = [
  validateUserCredentials[0],
  check('password')
    .isString()
    .trim()
    .matches(StrongPasswordValidator.UPPERCASE)
    .matches(StrongPasswordValidator.LOWERCASE)
    .matches(StrongPasswordValidator.NUMBER)
    .matches(StrongPasswordValidator.SPECIAL_CHARACTER)
    .matches(StrongPasswordValidator.LENGTH)
    .withMessage('A secure password is required'),
  check('firstName').isString().trim().exists(),
  check('lastName').isString().trim().exists()
];

/**
 * @api GET /api/account/login
 * FIXME: this login route needs a validator!
 */
router.post('/login', validateUserCredentials, ErrorMiddleware.sendFirst, (req: Request, res: Response): void => {
  const user: IUserCredentials = req.body;

  authDao.login(user)
    .then((userSession: IUserSession): void => {
      req.login(userSession, (error) => {
        if (error) {
          log.error(`Failed logging in ${user.email}.`, error);
          res.status(500).json(new ErrorMessage(`Login Failed`));
        } else {
          res.json(new SuccessMessage(`User ${user.email} successfully logged in.`));
        }
      });
    }).catch((error: ErrorMessage): void => {
      res.status(401).json(error);
    });
});

/**
 * @api GET /api/account/register
 * TODO: add express validation once user model have been fixed!
 */
router.post('/register', validateRegisterUserInfo, ErrorMiddleware.sendFirst, (req: Request, res: Response): void => {
  let userInfo: UserInfo = jsonConvert.deserialize(req.body, UserInfo);

  authDao.registerUser(userInfo)
    .then((userSession: IUserSession) => {
      userInfo = userInfo.withId(userSession.userId);
      userDao.createUser(userInfo)
        .then(() => {
          res.status(201).json(new SuccessMessage(`User ${userInfo.email} successfully registered and logged in.`));
        })
        .catch((err) => {

          // XXX: if userDao.creatUser fails roll back authDao.registerUser.
          //      this probly won't be needed with cognito

          log.error(`Failed to create user \`${userInfo.id}\` after registration`, err);
          res.status(500).json(new ErrorMessage(`Create new user failed`));
        });
    }).catch((err) => {
      log.error(`Failed to register user`, err);
      res.status(500).json(new ErrorMessage(`The email address is already in use`));
    });
});

/**
 * @api DELETE /api/account/logout
 */
router.delete('/logout', (req: Request, res: Response): void => {
  // XXX: If we need to close out cognito sessions we should do that here.
  //      However this will log the user out from our perspective.
  req.logout();
  res.send(new SuccessMessage('Sucessfully logged out.'));
});

/**
 * @api GET /api/account/whoami
 */
router.get('/whoami', (req: Request, res: Response): void => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.json(new UserInfo());
  }
});

export const AuthRouter: Router = router;
