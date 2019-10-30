import { Controller } from '../interfaces/controller.interface';
import express from 'express';
import { } from 'typeorm';
import { validationMiddleware } from '../middleware/validation.middleware';
import authMiddleware from '../middleware/auth.middleware';


export class RemindController implements Controller {
    public path = '/reminds';
    public router = express.Router();

    constructor() {

    }

    private initializeRoutes() {
        this.router.get(this.path + '/:remindId', authMiddleware, validationMiddleware);
    }


}