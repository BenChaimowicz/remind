import { LoginDto } from './../interfaces/login.interface';
import { User } from './../models/user.model';
import express, { Request, Response, NextFunction } from 'express';
import { Controller } from './../interfaces/controller.interface';
import { UserDto } from '../interfaces/user.interface';
import { getRepository } from 'typeorm';
import { validationMiddleware } from '../middleware/validation.middleware';
import bcrypt from 'bcrypt';
import moment from 'moment';
import * as jwt from 'jsonwebtoken';
import { EmailAlreadyExists, WrongCredentialsError } from '../middleware/error-handler.middleware';
import { TokenData, TokenItem } from '../interfaces/tokenData.interface';
import { config } from 'dotenv';
import * as env from 'env-var';

export class AuthController implements Controller {
    public path = '/auth';
    public router = express.Router();

    private userRepository = getRepository(User);
    private user: User;
    private readonly tokenExpiry: number = 60 * 60; // An hour

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path + '/register', validationMiddleware(UserDto), this.registration);
        this.router.post(this.path + '/login', validationMiddleware(LoginDto), this.loginUser);
    }

    private registration = async (req: Request, res: Response, next: NextFunction) => {
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
                dateOfBirth: moment(userData.dateOfBirth, 'YYYY-MM-DD').format('YYYY-MM-DD').toString(),
            };
            const newUser = this.userRepository.create(userCreation);
            await this.userRepository.save(newUser);

            res.send({ id: newUser.id, userName: newUser.userName, email: newUser.email });
        }
    }

    private loginUser = async (req: Request, res: Response, next: NextFunction) => {
        const loginData: LoginDto = req.body;
        const currUser = await this.userRepository.findOne({ email: loginData.email });
        if (currUser) {
            const passwordMatch = await bcrypt.compare(loginData.password, currUser.password);
            if (passwordMatch) {
                const token: TokenItem = await this.createToken(currUser);
                res.status(200).send(token);
            } else {
                next(new WrongCredentialsError());
            }
        } else {
            next(new WrongCredentialsError());
        }
    }

    private createToken(user: User): TokenItem {
        const secret: string = env.get('JWT_SECRET').required().asString();
        const data: TokenData = {
            userId: user.id,
            email: user.email,
        };
        const token: TokenItem = {
            expiry: this.tokenExpiry,
            userName: user.userName,
            token: jwt.sign(data, secret, { expiresIn: this.tokenExpiry })
        }
        return token;
    }
}