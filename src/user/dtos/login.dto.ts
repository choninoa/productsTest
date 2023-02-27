import { IsEmail, Length } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  readonly email: string;

  @Length(8, 20)
  readonly password: string;
}
