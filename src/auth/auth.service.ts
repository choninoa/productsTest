import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRolesEnum } from '../user/schemas/user.schema';

export type UserPayload= {
    id:string,
    role: UserRolesEnum,
    email:string    
  };
@Injectable()
export class AuthService {
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  generateJWT(user: UserPayload,seconds?:string): Promise<string> {
    return this.jwtService.signAsync(user,{
      expiresIn: seconds || this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')
    });
  }

}
