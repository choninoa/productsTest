import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger/dist';
import { UserPayload } from '../auth/auth.service';
import { hasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GenericController } from '../generic/generic.interface';
import { ParseMongoIdPipe } from '../generic/mongoid.pipe';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDTO } from './dtos/login.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserRolesEnum } from './schemas/user.schema';
import { UserService } from './user.service';

@ApiTags('User Module')
@Controller('user')
export class UserController implements  GenericController<User,CreateUserDto,UpdateUserDto>{
    constructor(
        @Inject(UserService)
        private readonly userService:UserService
    ){ }

    @ApiOperation({summary:'Create new user, only for admins'})
    @hasRoles(UserRolesEnum.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    async create(@Body() dto: CreateUserDto): Promise<User> {
        return await this.userService.create(dto);
    }

    @hasRoles(UserRolesEnum.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @ApiOperation({summary:'Retrieve all users'})
    @Get('findAll')
    async findAll(): Promise<User[]> {
        return (await  this.userService.findAll()).map(u=>{
            const {passwd,...rest}=u['toObject']();
            return rest as User});
    } 
 
    @hasRoles(UserRolesEnum.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @ApiOperation({summary:'Find user by id'})
    @Get(':id')
    async  findOne(@Param('id',ParseMongoIdPipe) id: string): Promise<User> {
        return await this.userService.findOne({_id:id});
    }

    @hasRoles(UserRolesEnum.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @ApiOperation({summary:'Update user information'})
    @Put(':id')
    async update(@Param('id',ParseMongoIdPipe) id: string, @Body() dto: UpdateUserDto) {
        return await this.userService.update(id,dto);
    }

    @hasRoles(UserRolesEnum.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @ApiOperation({summary:'Remove a user by given id'})
    @Delete(':id')
    async delete(@Param('id',ParseMongoIdPipe) id: string): Promise<User> {
        return await this.userService.delete(id);
    }
   
  @ApiOperation({ summary: 'User Login' })
  @ApiOkResponse({ type: 'User', description: 'Succesfull Login' })
  @ApiUnauthorizedResponse({ description: 'Login Failed' })
  @ApiBody({ type: LoginDTO })
  @Post('login')
  async login(
    @Res() res,
    @Body() loginDto: LoginDTO,
  ): Promise<UserPayload> {
    const result = await this.userService.login(loginDto);
    return res.status(HttpStatus.OK).json(result);
  }
}
