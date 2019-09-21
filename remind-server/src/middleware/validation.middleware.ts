import { HttpError } from './error-handler.middleware';
import express ,{ Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import {plainToClass } from 'class-transformer';

export function validationMiddleware<T>(type: any): express.RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        validate(plainToClass(type, req.body))
            .then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const msg = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
                    next(new HttpError(400, msg));
                } else {
                    next();
                }
            });
    }
}