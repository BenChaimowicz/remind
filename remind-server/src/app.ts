import { Controller } from './interfaces/controller.interface';
import bodyParser from 'body-parser';
import express from 'express';
import { loggerMiddleware } from './middleware/logger.middleware';

export class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlwares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlwares() {
        this.app.use(bodyParser.json());
        this.app.use(loggerMiddleware);
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        })
    }
}