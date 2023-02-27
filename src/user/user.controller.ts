import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger/dist';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { UserPayload } from '../auth/auth.service';
import { GenericController } from '../generic/generic.controller';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDTO } from './dtos/login.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
@ApiTags('User Module')

@Controller('user')
export class UserController implements  GenericController<User,CreateUserDto,UpdateUserDto>{
    constructor(
        @Inject(UserService)
        private readonly userService:UserService
    ){ }

    @Post()
    async create(@Body() dto: CreateUserDto): Promise<User> {
        return await this.userService.create(dto);
    }

    @Get('findAll')
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    } 
 
    @Get(':id')
    async  findOne(@Param('id') id: string): Promise<User> {
        return await this.userService.findOne({_id:id});
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return await this.userService.update(id,dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User> {
        return await this.userService.delete(id);
    }
   
  @ApiOperation({ summary: 'User Login' })
  @ApiOkResponse({ type: 'User', description: 'Succesfull Login' })
  @ApiUnauthorizedResponse({ description: 'Login Failed' })
  @ApiBody({ type: LoginDTO })
  @Post('login')
  async loginEmployee(
    @Res() res,
    @Body() loginDto: LoginDTO,
  ): Promise<UserPayload> {
    const result = await this.userService.login(loginDto);
    return res.status(HttpStatus.OK).json(result);
  }
}
