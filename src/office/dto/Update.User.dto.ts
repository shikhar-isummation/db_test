import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateOfficeDto {

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Type(() => Number)
    officeCode: number | any

    @IsString()
    addressLine1: string


    @IsString()
    addressLine2: string


    @IsString()
    city: string


    @IsString()
    country: string


    @IsString()
    phone: string

    @IsString()
    postalCode: string

    @IsString()
    state: string

    @IsString()
    territory: string

}

