import { consoleLogger, NotAuthorizedError } from '@quan0401/ecommerce-shared';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Logger } from 'winston';
import { config } from '~/config';
import { IAuthPayload } from '~auth/interfaces/auth.interface';
const log: Logger = consoleLogger('auth-middleware', 'debug');

export const verifyUser = (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (!req.session?.jwt) throw new NotAuthorizedError('Token is not available. Please login...', 'verifyuser');
    const payload: IAuthPayload = verify(req.session.jwt, config.JWT_TOKEN!) as IAuthPayload;
    req.currentUser = payload;
  } catch (error) {
    log.error('Token is not available', error);
    throw new NotAuthorizedError('Token is not available', 'verifyuser');
  }
  next();
};

export const checkAuthentication = (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (!req?.currentUser) throw new NotAuthorizedError('Token is not available. Please login...', 'verifyuser');
  } catch (error) {
    log.error('Token is not available', error);
    throw new NotAuthorizedError('Token is not available', 'verifyuser');
  }
  next();
};
