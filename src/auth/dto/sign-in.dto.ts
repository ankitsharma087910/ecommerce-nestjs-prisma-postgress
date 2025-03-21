import { RoleType } from "@prisma/client"
import { IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator"



export class SignInDto{

    username:string


    @IsString()
    @IsNotEmpty()
    password:string 

    @IsArray()
    @IsEnum(RoleType,{each:true})
    @IsNotEmpty()
    role:RoleType[]



}