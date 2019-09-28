import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from './role.model';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column({ length: 30})
    userName: string;
    
    @Column()
    password: string;
    
    @Column({length:30})
    email: string;
    
    @Column()
    dateOfBirth: string;
    
    @Column()
    dateCreated: string;

    @OneToMany(type => Role, role => role.user)
    roles: Role[];
}