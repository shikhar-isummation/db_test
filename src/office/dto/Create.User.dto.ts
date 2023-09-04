import { IsNumber, IsNotEmpty, IsString, IsEmail } from "class-validator"

export class CreateOfficeDto {

    @IsNotEmpty()
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
