import { App } from './app';
import http from 'http';
import express from 'express';
import { loggerMiddleware } from './middleware/logger.middleware';
import bodyParser from 'body-parser';
import { UserController } from './controllers/users.controller';
import { createConnection } from 'typeorm';
import { config } from './config/dbconfig';
import 'reflect-metadata';

(async () => {
    try {
        await createConnection(config);
    } catch (error) {
        console.error(error, 'Could not connect to database.');
        return error;
    }
    const app: App = new App([
        new UserController(),
    ], 3000);
    
    app.listen();
})();