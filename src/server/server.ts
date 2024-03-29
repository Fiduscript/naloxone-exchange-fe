import * as bodyParser from 'body-parser';
import * as CognitoExpress from 'cognito-express';
import * as cookieParser from 'cookie-parser';
import * as errorHandler from 'errorhandler';
import * as express from 'express';
import { Application, NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import * as methodOverride from 'method-override';
import * as requestLogger from 'morgan';
import * as path from 'path';

import { IUserInfo, UserInfo } from '../public/app/account/model/user-info';
import { ApiRouter } from './routes/api.router';
import { Env } from './util/env';
import { Logger } from './util/logger';

const log = Logger.create(module);

/**
 * The server.
 * @class Server
 */
export class Server {

  // TODO: get these from configuration
  private static readonly cognitoExpress = new CognitoExpress({
    region: 'us-east-2',
    cognitoUserPoolId: 'us-east-2_ej6SB5BPr',
    tokenUse: 'id'
  });
  private static readonly root: string = path.join(__dirname, '../../../public/naloxone-exchange');

  public app: Application;

  constructor(app: Application) {
    this.app = app;

    this.init = _.once(this.init.bind(this));
  }

  public init(): Server {
    this.config();
    // add api routes
    this.app.use('/api', ApiRouter);
    // add angular route handling
    this.app.use(express.static(Server.root));
    this.app.use('/', this.sendIndex);
    return this;
  }

  /**
   * Configure application
   */
  private config(): void {
    // use requestLogger middlware
    if (!Env.isProd()) {
      this.app.use(requestLogger('dev'));
    }

    // use json form parser middlware
    this.app.use(bodyParser.json());

    // use query string parser middlware
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    // use cookie parser middleware
    this.app.use(cookieParser('SECRET_GOES_HERE'));

    // session & Cookie Stuffs
    // Trust https proxy settings (for secure cookies)
    if (Env.isProd()) {
      this.app.set('trust proxy', 1);
    }

    // Validate Cognito session token if provided in the request
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const authToken = req.headers.authorization;

      if (authToken) {
        Server.cognitoExpress.validate(authToken, <T extends IUserInfo>(err, response: T) => {
          if (response != null) {
            res.locals.user = new UserInfo(response);
            log.audit(`Authenticated request to ${req.originalUrl} from user ${res.locals.user.id}`);
          } else {
            log.audit(`Couldn't validate auth token in request to ${req.originalUrl}: ${err.message}`);
          }
          next();
        });
      } else {
        log.audit(`No auth token provided in request to ${req.originalUrl}`);
        next();
      }
    });

    // use override middlware
    this.app.use(methodOverride());

    // catch 404 and forward to error handler
    this.app.use((
        err: any,
        req: Request,
        res: Response,
        next: NextFunction) => {
        err.status = 404;
        next(err);
    });

    // error handling
    this.app.use(errorHandler());
  }

  private sendIndex(req: Request, res: Response): void {
      res.sendFile('index.html', {root: Server.root});
  }

  /**
   * Bootstrap the application.
   */
  public static bootstrap(port: number | string): Server {
    const app: Application = express();
    app.set('port', port);
    return new Server(app).init();
  }

}
