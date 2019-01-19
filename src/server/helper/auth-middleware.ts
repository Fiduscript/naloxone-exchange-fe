import { NextFunction, Request, Response, Router } from 'express';

import { ErrorMessage } from '../../public/app/common/message-response';
import { Logger } from '../util/logger';

const log = Logger.create(module);

export module AuthMiddleware {

  export const authorizedUser = (req: Request, res: Response, next: NextFunction): void => {
    if (res.locals.user == null) {
      res.status(401).json(new ErrorMessage('You must be an an authorized user to access this resource.'));
      return;
    }

    // TODO: Add validation that this specific user is allowed to acces this part of the site.
    //       e.g. Pharamcy user vs patient user
    //       We don't yet have that concept so there is not point as of now.
    next();
  };
}
