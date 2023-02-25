import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericService } from '../generic/generic.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService extends GenericService<User, CreateUserDto,UpdateUserDto> {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {
        super(userModel);
    }
    async validate():Promise<User[]>{
        return await this.findAll()
    }
}
