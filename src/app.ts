import express, { Express } from 'express';
import { AppServer } from '~/server';

class App {
  public initialize(): void {
    const app: Express = express();

    const appServer: AppServer = new AppServer();
    appServer.start(app);
  }
}
const app: App = new App();
app.initialize();
