import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { User } from "./user.model";


@Entity()
export class Remind {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name: string;

    @Column()
    description?: string;

    @Column()
    reward?: number;

    @Column()
    cost?: number;

    @ManyToOne(type => User)
    @JoinColumn()
    createdBy: User;

    @CreateDateColumn()
    dateCreated?: Date;
}