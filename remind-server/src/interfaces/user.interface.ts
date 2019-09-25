import { IsString, IsEmail, Length } from 'class-validator';
import * as moment from 'moment';
import { isMomentDate } from '../validators/moment.validator';

export class User {
    id: number;
    userName: string;
    password: string;
    email: string;
    datesId: number;    
}

export class UserDto {
    @IsString()
    @Length(3,30)
    public userName: string;

    @IsString()
    public password: string;
        
    @IsEmail()
    public email: string;

    @isMomentDate()
    public dateOfBirth: moment.Moment;
}