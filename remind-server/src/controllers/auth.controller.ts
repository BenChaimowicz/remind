import { User } from './../models/user.model';
import express, { Request, Response, NextFunction } from 'express';
import { Controller } from './../interfaces/controller.interface';
import { UserDto } from '../interfaces/user.interface';

export class AuthController implements Controller {
    public path = '/auth';
    public router = express.Router();

    private user: User;

    constructor() {
        
    }

    private initializeRoutes() {
        this.router.post(this.path + '/register');
        this.router.post(this.path + '/login');
    }

    private registration = async (req:Request, res: Response, next: NextFunction) => {
        const userData: UserDto = req.body;
    }
}