import { Request, Response, NextFunction } from 'express';

export class HttpError extends Error {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export const errorMiddlware = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).send({ status, message });
}

export class WrongCredentialsError extends HttpError {
    constructor() {
        super(401, 'The email and password entered do not match!');
    }
}

export class EmailAlreadyExists extends HttpError {
    constructor(email: string) {
        super(409, `${email} is already registered!`);
    }
}