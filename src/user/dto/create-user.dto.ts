
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator"
import RoleType from '@prisma/client';
import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto{
    

    @ApiProperty({description:"name of the user",example:"ankit sharma",minLength:1,maxLength:100})
    @IsString()
    @IsNotEmpty()
    @Length(1,100)
    name : string

    @ApiProperty({description:"enter your email here",example:"ankit@gmail.com"})
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({description:"enter password here",example:"ankit sharma"})
    @IsString()
    @IsStrongPassword()
    password:string


}