import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import moment from 'moment';

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    description: string;

    @Column()
    date: string;
}