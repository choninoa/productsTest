import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { GenericController } from '../generic/generic.controller';
import { CreateUserDto } from './dtos/create-user.dto';
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
        return await this.userService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return await this.userService.update(id,dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User> {
        return await this.userService.delete(id);
    }
   
    
}
