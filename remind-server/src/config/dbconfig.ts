import { ConnectionOptions } from 'typeorm';
import 'reflect-metadata';
import { User} from '../models/user.model';

export const config: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin123',
    database: 'reminddb',
    entities: [
        User
    ],
    synchronize: true,
};