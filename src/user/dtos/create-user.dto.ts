
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsPositive, Length, Min } from "class-validator";
import { UserRolesEnum } from "../schemas/user.schema";

export class CreateUserDto{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    lastName: string;
  
    @IsInt()
    @IsPositive()
    @Min(18)
    age: number;
  
 
    @IsEmail()
    email: string;
  
   
    @IsPhoneNumber()
    phone: string;

    @IsEnum(UserRolesEnum)
    role:UserRolesEnum;

    @Length(8,20)
    passwd: string;
}