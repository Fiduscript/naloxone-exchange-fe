import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as errorHandler from 'errorhandler';
import * as express from 'express';
import { Application, NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import * as methodOverride from 'method-override';
import * as requestLogger from 'morgan';
import * as path from 'path';

import { ApiRouter } from './routes/api.router';
import { Logger } from './util/logger';

const log = Logger.create(module);

/**
 * The server.
 * @class Server
 */
export class Server {
  private static readonly root: string = path.join(__dirname, '../../../public/naloxone-exchange');

  public app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  /**
   * Bootstrap the application.
   */
  public static bootstrap(port: number | string): Server {
    const app: Application = express();
    app.set('port', port);
    return new Server(app).init();
  }

  // tslint:disable member-ordering reason: named constructor should precede this
  public init = _.once((): Server => {
    this.config();
    // add api routes
    this.app.use('/api', ApiRouter);
    // add angular route handling
    this.app.use(express.static(Server.root));
    this.app.use('/', this.sendIndex);
    return this;
  });
// tslint:enable

  /**
   * Configure application
   */
  private config(): void {
    // use requestLogger middlware
    // XXX this should not be used for production.
    this.app.use(requestLogger('dev'));

    // use json form parser middlware
    this.app.use(bodyParser.json());

    // use query string parser middlware
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    // use cookie parser middleware
    this.app.use(cookieParser('SECRET_GOES_HERE'));

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

}
