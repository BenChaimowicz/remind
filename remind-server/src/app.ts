import express from 'express';

export class App {
    public app: express.Application = express();
    public port: number = 3000;

    constructor() {

    }

    applyMiddleware(middleware: any[]) {
        
    }

    applyControllers(controllers: any[]) {
        
    }
}