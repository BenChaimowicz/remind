import { User } from './user.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.roles)
    user: User;
}