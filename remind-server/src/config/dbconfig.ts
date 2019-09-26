import { ConnectionOptions } from 'typeorm';
import 'reflect-metadata';

// Entities-Models
import { User } from '../models/user.model';
import { Log } from './../models/log.model';

export const config: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin123',
    database: 'reminddb',
    entities: [
        User,
        Log
    ],
    synchronize: true,
};