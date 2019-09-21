import { IsString, IsEmail, Length } from 'class-validator';

export class User {
    id: number;
    userName: string;
    password: string;
    email: string;
    dateOfBirth: string;    
    dateCreated: string;
}

export class UserDto {
    @IsString()
    @Length(3,30)
    public userName: string;

    @IsString()
    public password: string;
        
    @IsEmail()
    public email: string;

}