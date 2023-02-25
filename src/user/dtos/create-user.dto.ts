
import { IsEmail, IsInt, IsNotEmpty, IsPhoneNumber, IsPositive } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    lastName: string;
  
    @IsInt()
    @IsPositive()
    age: number;
  
 
    @IsEmail()
    email: string;
  
    @IsPhoneNumber()
    phone: string;
}