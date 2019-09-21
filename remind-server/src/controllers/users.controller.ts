import {UserDto } from '../interfaces/user.interface';
import { User } from './../models/user.model';
import { Controller } from './../interfaces/controller.interface';
import express, { Request, Response, NextFunction } from 'express';
import { getRepository} from 'typeorm';
import { validationMiddleware } from '../middleware/validation.middleware';

export class UserController implements Controller {
    public path = '/users';
    public router = express.Router();
    private userRepository = getRepository(User);

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        // Get
        this.router.get(this.path, this.getAllUsers);
        this.router.get(this.path + '/:id', this.getUserById);

        // Post
        this.router.post(this.path, validationMiddleware(UserDto), this.createUser);
    }

    // Get
    getAllUsers = (req: Request, res: Response) => {
        res.status(200).send();
    }

    getUserById = (req: Request, res: Response) => {
        
    }

    // Post
    createUser = async (req: Request, res: Response) => {
        const userData: UserDto = req.body;
        const newUser = this.userRepository.create(userData);
        await this.userRepository.save(newUser);
        res.send(newUser);
    }
}