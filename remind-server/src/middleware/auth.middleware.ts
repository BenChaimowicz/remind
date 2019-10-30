import express, { NextFunction, Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { TokenData } from '../interfaces/tokenData.interface';
import * as env from 'env-var';
import { getRepository } from 'typeorm';
import { User } from '../models/user.model';
import { InvalidTokenError } from './error-handler.middleware';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const userRepository = getRepository(User);
    const headers = req.headers;
    if (headers && headers.authorization) {
        const secret: string = env.get('JWT_SECRET').required().asString();
        try {
            const verifyResponse = jwt.verify(headers.authorization, secret) as TokenData;
            const user = await userRepository.findOne({ id: verifyResponse.userId });
            if (user) {
                req.user = user;
                next()
            } else {
                next(new InvalidTokenError());
            }
        } catch (err) {
            console.error(err);
            next(new InvalidTokenError());
        }
    } else {
        next(new InvalidTokenError());
    }
}

export default authMiddleware;