import { consoleLogger, CustomeError, IErrorResponse } from '@quan0401/ecommerce-shared';
import compression from 'compression';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { Application, json, NextFunction, Request, Response, urlencoded } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { Server } from 'http';
import 'express-async-errors';
import { Logger } from 'winston';
import { connectDatabae } from '~/database';
import applicationRoutes from '~/routes';
import { config } from './config';
import { StatusCodes } from 'http-status-codes';

const PORT = 6969;
const log: Logger = consoleLogger('AppServer', 'debug');

export class AppServer {
  private app: Application;
  constructor(app: Application) {
    this.app = app;
  }
  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startHttpServer(this.app);
    connectDatabae();
  }
  private startHttpServer(app: Application): void {
    const httpServer: Server = new Server(app);
    httpServer.listen(PORT, () => {
      log.info(`Server is running on port ${PORT}`);
    });
  }
  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '200mb' }));
    app.use(urlencoded({ extended: true, limit: '200mb' }));
  }
  private securityMiddleware(app: Application): void {
    app.use(
      cookieSession({
        name: 'session',
        keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
        maxAge: 3600 * 1000,
        secure: config.NODE_ENV !== 'development'
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }
  private routesMiddleware(app: Application): void {
    applicationRoutes(app);
  }
  private globalErrorHandler(app: Application): void {
    app.all('*', (req: Request, res: Response) => {
      res.status(StatusCodes.NOT_FOUND).send('What!!! this route is not existed');
    });

    app.use((err: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
      log.error(err);

      if (err instanceof CustomeError) {
        // Send back to the client
        return res.status(err.serializeError().statusCode).json(err.serializeError());
      } else {
        log.error(err);
      }
      next();
    });
  }
}
