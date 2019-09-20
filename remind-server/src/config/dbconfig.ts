import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin123',
    database: 'reminddb',
    entities: [
        __dirname + '/remind-server/src/models/*.model{.ts,.js}',
    ],
    synchronize: true,
};