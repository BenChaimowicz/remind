import { Controller } from './../interfaces/controller.interface';
import express, { Request, Response, NextFunction } from 'express';

export class UserController implements Controller {
    public path = '/users';
    public router = express.Router();

    constructor() {
        
    }

    public initializeRoutes() {
        
    }

    getAllUsers = (req: Request, res: Response) => {
        res.status(200).send();
    }

    createUser = (req: Request, res: Response) => {

    }
}