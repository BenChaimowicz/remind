import { Log } from './../models/log.model';
import { getRepository, Repository } from 'typeorm';
import { Controller } from "../interfaces/controller.interface";
import express from 'express';
import moment from 'moment';

export class LogController implements Controller {
    public path = '/logs';
    public router = express.Router();

    logRepository: Repository<Log> = getRepository(Log);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllLogs);
    }

    private async getAllLogs() {
        const logs = await this.logRepository.find();
        return logs;
    }

    private async createLog(action: string, user?: string) {
        let log: Log = new Log();
        log.date = moment().toString();
        log.description = `${user} -> ${action}`;
        let newLog = await this.logRepository.create(log);
        await this.logRepository.save(newLog);
    }
}