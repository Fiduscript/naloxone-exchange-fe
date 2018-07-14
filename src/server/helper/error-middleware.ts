import { NextFunction, Request, Response, Router } from 'express';
import { validationResult, Result } from 'express-validator/check';

export module ErrorMiddleware {

  export const sendFirst = (req: Request, res: Response, next: NextFunction): void => {
    const errors: Result = validationResult(req);

    if (errors.isEmpty()) {
      next();
      return;
    }

    console.error(`Invalid Request. Route ${req.baseUrl + req.path} has the following errors: ${JSON.stringify(errors)}`);
    const e = errors.mapped();
    const msg = e[Object.keys(e)[0]].msg;
    res.status(400).json({message: msg});
  };

}
