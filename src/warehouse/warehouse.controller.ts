import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { hasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GenericController } from '../generic/generic.interface';
import { ParseMongoIdPipe } from '../generic/mongoid.pipe';
import { UserRolesEnum } from '../user/schemas/user.schema';
import { CreateWarehouseDTO } from './dtos/create-warehouse.dto';
import { UpdateWarehouseDTO } from './dtos/update-warehouse.dto';
import { Warehouse } from './schemas/warehouse.schema';
import { WarehouseService } from './warehouse.service';
@ApiTags('WareHouse Module')

@Controller('warehouse')
export class WarehouseController implements GenericController<Warehouse, CreateWarehouseDTO, UpdateWarehouseDTO>{
    constructor(
        @Inject(WarehouseService)
        private readonly warehouseService: WarehouseService
    ) { }

    @hasRoles(UserRolesEnum.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async create(@Body() dto: CreateWarehouseDTO): Promise<Warehouse> {
        return await this.warehouseService.create(dto);
    }
    @hasRoles(UserRolesEnum.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAll')
    async findAll(): Promise<Warehouse[]> {
        return await this.warehouseService.findAll();
    }
    @hasRoles(UserRolesEnum.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async findOne(@Param('id', ParseMongoIdPipe) id: string): Promise<Warehouse> {
        return await this.warehouseService.findOne({ _id: id });
    }
    @hasRoles(UserRolesEnum.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    async update(@Param('id', ParseMongoIdPipe) id: string, @Body() dto: UpdateWarehouseDTO) {
        return await this.warehouseService.update(id, dto);
    }
    @hasRoles(UserRolesEnum.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id', ParseMongoIdPipe) id: string): Promise<Warehouse> {
        return await this.warehouseService.delete(id);
    }

}
