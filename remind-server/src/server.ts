import { App } from './app';
import http from 'http';
import express from 'express';
import { loggerMiddleware } from './middleware/logger.middleware';
import bodyParser from 'body-parser';
import { UserController } from './controllers/users.controller';
import { createConnection } from 'typeorm';
import { dbconfig } from './config/dbconfig';
import 'reflect-metadata';
import { AuthController } from './controllers/auth.controller';
import { config }  from 'dotenv';

config();

(async () => {
    try {
        await createConnection(dbconfig);
    } catch (error) {
        console.error(error, 'Could not connect to database.');
        return error;
    }
    const app: App = new App([
        new UserController(),
        new AuthController(),
    ], Number(process.env.PORT));
    
    app.listen();
})();