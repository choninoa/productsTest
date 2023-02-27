import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService, UserPayload } from '../auth/auth.service';
import { GenericService } from '../generic/generic.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { comparePasswd } from '../generic/common'
import { LoginDTO } from './dtos/login.dto';
@Injectable()
export class UserService extends GenericService<User, CreateUserDto, UpdateUserDto> {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @Inject(AuthService)
        private authService: AuthService,
    ) {
        super(userModel);
    }

    async validateUser(email: string, password: string): Promise<UserPayload> {
        return await this.userModel.findOne({
            email
        })
            .then(async (r) => {
                //console.log(r)
                if (!r) throw new UnauthorizedException('Wrong Credentials');

                const match = await comparePasswd(
                    password,
                    r.passwd
                );

                if (!match) {
                    throw new UnauthorizedException('Wrong Credentials')
                }

                const payload: UserPayload = {
                    id: r.id,
                    role: r.role,
                    email: r.email
                };

                return payload
            })

    }

    async login(user: LoginDTO): Promise<Object> {
        return this.validateUser(user.email, user.password)
            .then(async (r) => {

                const access = {
                    access_token: await this.authService.generateJWT(r),
                    user: r,
                };
                return access;
            }
            )
        }
}
