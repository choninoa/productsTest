import { BadRequestException, Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService, UserPayload } from '../auth/auth.service';
import { GenericService } from '../generic/generic.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserDocument, UserRolesEnum } from './schemas/user.schema';
import { comparePasswd, hashPasswd } from '../generic/common'
import { LoginDTO } from './dtos/login.dto';
@Injectable()
export class UserService extends GenericService<User, CreateUserDto, UpdateUserDto> implements OnModuleInit {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @Inject(AuthService)
        private authService: AuthService,
    ) {
        super(userModel);
    }
    async onModuleInit() {
        const created = await this.userModel.findOne({
            email: 'admin@admin.com'
        })
        if (!created) {
            await this.create({
                email: 'admin@admin.com',
                name: 'Initial Admin',
                lastName: 'Tester',
                age: 33,
                phone: '+17863458634',
                role: UserRolesEnum.ADMIN,
                passwd: process.env.INITIAL_PASSW || "administrator123"
            })
        }
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

    async create(dto: CreateUserDto): Promise<User> {

        const exists = await this.userModel.findOne({
            email: dto.email,
            phone: dto.phone
        })
        if (exists)
            throw new BadRequestException(`Already exists a user with this email or phone`)
        return await this.userModel.create({
            ...dto,
            passwd: await hashPasswd(dto.passwd)
        })
        .then(u => {
                const r=u.toObject();
                delete r.passwd
                return r
            })
    }
}
