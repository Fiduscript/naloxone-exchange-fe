import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as requestLogger from "morgan";
import * as path from "path";
import * as _ from "lodash";
import { Application, Request, Response, NextFunction } from "express";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");

import { ApiRouter } from "./routes/api.router";

/**
 * The server.
 * @class Server
 */
export class Server {
  private static readonly root: string = path.join(__dirname, "../public/naloxone-exchange");

  public app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  /**
   * Bootstrap the application.
   */
  public static bootstrap(port: number | string): Server {
    const app: Application = express();
    app.set("port", port);
    return new Server(app).init();
  }

  public init = _.once((): Server => {
    this.config();
    // add api routes
    this.app.use("/api", ApiRouter);
    // add angular route handling
    this.app.use(express.static(Server.root));
    this.app.use('/', this.sendIndex);
    return this;
  });

  /**
   * Configure application
   */
  private config(): void {
    // use requestLogger middlware
    // XXX this should not be used for production.
    this.app.use(requestLogger("dev"));

    // use json form parser middlware
    this.app.use(bodyParser.json());

    // use query string parser middlware
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    // use cookie parser middleware
    this.app.use(cookieParser("SECRET_GOES_HERE"));

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
      res.sendFile("index.html", {root: Server.root});
  }

}
