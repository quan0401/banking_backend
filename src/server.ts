import { consoleLogger } from '@quan0401/ecommerce-shared';
import compression from 'compression';
import cors from 'cors';
import { Application, json, urlencoded } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { Server } from 'http';
import { Logger } from 'winston';
import { connectDatabae } from '~/database';
import { appRoutes } from '~/routes';

const PORT = 6969;
const log: Logger = consoleLogger('AppServer', 'debug');

export class AppServer {
  public start(app: Application): void {
    this.startHttpServer(app);
    this.securityMiddleware(app);
    this.standardMiddleware(app);
    this.routesMiddleware(app);
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
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }
  private routesMiddleware(app: Application): void {
    appRoutes(app);
  }
}
