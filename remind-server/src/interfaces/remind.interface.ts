import { User } from './user.interface';
import { IsString, Length, IsNumber, IsInt } from "class-validator";

export class RemindItem {
    id: string;
    name: string;
    description?: string;
    reward: number;
    cost?: number;
    createdBy?: number;
}

export class RemindDto {
    @IsString()
    public id?: string;

    @IsString()
    @Length(3, 30)
    public name: string;

    @IsString()
    public description?: string;

    @IsInt()
    public reward?: number;

    @IsNumber()
    public cost?: number;
}