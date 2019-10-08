import { Controller } from './interfaces/controller.interface';
import bodyParser from 'body-parser';
import express from 'express';
import { loggerMiddleware } from './middleware/logger.middleware';
import { errorMiddlware } from './middleware/error-handler.middleware';
import * as cors from 'cors';

export class App {
    public app: express.Application;
    public port: number;
    private corsOptions: cors.CorsOptions = {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        preflightContinue: false
    }

    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlwares();
        this.initializeControllers(controllers);
        this.initializeErrorHandlers();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        });
    }

    private initializeMiddlwares() {
        this.app.use(bodyParser.json());
        this.app.use(loggerMiddleware);
        this.app.use(cors.default(this.corsOptions));
    }

    private initializeErrorHandlers() {
        this.app.use(errorMiddlware);
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        })
    }
}