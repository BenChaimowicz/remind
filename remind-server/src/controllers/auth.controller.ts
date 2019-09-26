import { LoginDto } from './../interfaces/login.interface';
import { User } from './../models/user.model';
import express, { Request, Response, NextFunction } from 'express';
import { Controller } from './../interfaces/controller.interface';
import { UserDto } from '../interfaces/user.interface';
import { getRepository } from 'typeorm';
import { validationMiddleware } from '../middleware/validation.middleware';
import bcrypt from 'bcrypt';
import moment from 'moment';
import { EmailAlreadyExists, WrongCredentialsError } from '../middleware/error-handler.middleware';

export class AuthController implements Controller {
    public path = '/auth';
    public router = express.Router();

    private userRepository = getRepository(User);
    private user: User;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path + '/register', validationMiddleware(UserDto), this.registration);
        this.router.post(this.path + '/login', validationMiddleware(LoginDto), this.loginUser);
    }

    private registration = async (req:Request, res: Response, next: NextFunction) => {
        const userData: UserDto = req.body;

        if (await this.userRepository.findOne({ email: userData.email })) {
            next(new EmailAlreadyExists(userData.email));
        } else {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            
            let userCreation: User = {
                userName: userData.userName,
                password: hashedPassword,
                email: userData.email,
                dateCreated: moment().format('YYYY-MM-DD hh:mm:ss').toString(),
                dateOfBirth: moment(userData.dateOfBirth, 'YYYY-MM-DD').format('YYYY-MM-DD').toString()
            };
            const newUser = this.userRepository.create(userCreation);
            await this.userRepository.save(newUser);

            res.send({id: newUser.id, userName: newUser.userName, email: newUser.email});   
        }
    }

    private loginUser = async (req: Request, res: Response, next: NextFunction) => {
        const loginData: LoginDto = req.body;
        const currUser = await this.userRepository.findOne({ email: loginData.email });
        if (currUser) {
            const passwordMatch = await bcrypt.compare(loginData.password, currUser.password);
            if (passwordMatch) {
                res.send({id: currUser.id, userName: currUser.userName, email: currUser.email});
            } else {
                next(new WrongCredentialsError());
            }
        } else {
            next(new WrongCredentialsError());
        }
    }
}