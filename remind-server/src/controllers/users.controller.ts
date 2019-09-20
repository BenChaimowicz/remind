import { Controller } from './../interfaces/controller.interface';
import express, { Request, Response, NextFunction } from 'express';

export class UserController implements Controller {
    public path = '/users';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        // Get
        this.router.get(this.path, this.getAllUsers);
        this.router.get(this.path + '/:id', this.getUserById);

        // Post
        this.router.post(this.path, this.createUser);
    }

    // Get
    getAllUsers = (req: Request, res: Response) => {
        res.status(200).send();
    }

    getUserById = (req: Request, res: Response) => {
        
    }

    // Post
    createUser = (req: Request, res: Response) => {
        res.send(req.body);
    }
}