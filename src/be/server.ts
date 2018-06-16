import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
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

  public app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  /**
   * Bootstrap the application.
   */
  public static bootstrap(): Server {
    const server: Server = new Server(express());
    return server.init();
  }

  public init = _.once((): Server => {
    this.config();
    this.ngRoutes();
    this.api();
    return this;
  });

  /**
   * Add angular routing; should serve angular index.html file.
   */
  private ngRoutes(): void {
    this.app.use(express.static(path.join(__dirname, "public")));
  }

  /**
   * Create REST API routes
   */
  private api(): void {
    this.app.use("/api", ApiRouter);
  }

  /**
   * Configure application
   */
  private config(): void {
    // use logger middlware
    this.app.use(logger("dev"));

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

}
