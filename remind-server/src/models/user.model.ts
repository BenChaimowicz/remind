import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
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
}