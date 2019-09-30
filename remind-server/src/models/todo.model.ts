import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.model';

@Entity()
export class ToDo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    todo: string;

    @ManyToOne(type => User, user => user.id)
    createdBy: number;
}