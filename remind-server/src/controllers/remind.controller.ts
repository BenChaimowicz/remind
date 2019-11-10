import { Remind } from './../models/remind.model';
import { Controller } from '../interfaces/controller.interface';
import express, { NextFunction, Request, Response } from 'express';
import { Repository, getRepository } from 'typeorm';
import { validationMiddleware } from '../middleware/validation.middleware';
import authMiddleware from '../middleware/auth.middleware';
import { NotFoundError, MissingParameters, AlreadyExistsError } from '../middleware/error-handler.middleware';
import { RemindDto } from '../interfaces/remind.interface';


export class RemindController implements Controller {
    public path = '/reminds';
    public router = express.Router();
    private remindRepository: Repository<Remind> = getRepository(Remind);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, authMiddleware, this.getAll);
        this.router.get(this.path + '/:remindId', authMiddleware, this.getRemind);
        this.router.post(this.path, authMiddleware, validationMiddleware(RemindDto), this.newRemind);
    }

    private newRemind = async (req: Request, res: Response, next: NextFunction) => {
        const remindData: RemindDto = req.body;
        const remind = await this.remindRepository.find({
            where: [{ name: remindData.name }, { description: remindData.description }]
        });
        if (remind.length > 0) {
            next(new AlreadyExistsError());
        } else {
            let remindCreation: Remind = {
                name: remindData.name,
                reward: remindData.reward,
                createdBy: req.user
            }
            const newRemind = this.remindRepository.create(remindCreation);
            await this.remindRepository.save(newRemind);

            res.status(201).send(newRemind.id);
        }
    }

    private getAll = async (req: Request, res: Response, next: NextFunction) => {
        let reminds: Remind[] = await this.remindRepository.find();
        if (reminds) {
            res.status(200).send(reminds);
        } else {
            next(new NotFoundError());
        }
    }

    private getRemind = async (req: Request, res: Response, next: NextFunction) => {
        let remindId = req.query.remindId;
        if (!remindId) {
            next(new MissingParameters());
        }
        const targetRemind = await this.remindRepository.findOne({ id: remindId });
        if (targetRemind) {
            res.status(200).send(targetRemind);
        } else {
            next(new NotFoundError());
        }
    }
}