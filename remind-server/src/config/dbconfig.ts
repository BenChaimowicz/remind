import { ConnectionOptions } from 'typeorm';
import 'reflect-metadata';
import { config } from 'dotenv';

config();

// Entities-Models
import { User } from '../models/user.model';
import { Log } from './../models/log.model';
import { Remind } from '../models/remind.model';

export const dbconfig: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        User,
        Log,
        Remind
    ],
    synchronize: true,
};