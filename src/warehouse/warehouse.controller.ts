import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GenericController } from '../generic/generic.controller';
import { CreateWarehouseDTO } from './dtos/create-warehouse.dto';
import { UpdateWarehouseDTO } from './dtos/update-warehouse.dto';
import { Warehouse } from './schemas/warehouse.schema';
import { WarehouseService } from './warehouse.service';
@ApiTags('WareHouse Module')
@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('warehouse')
export class WarehouseController implements GenericController<Warehouse, CreateWarehouseDTO, UpdateWarehouseDTO>{
    constructor(
        @Inject(WarehouseService)
        private readonly warehouseService: WarehouseService
    ) { }

    @Post()
    async create(@Body() dto: CreateWarehouseDTO): Promise<Warehouse> {
        return await this.warehouseService.create(dto);
    }

    @Get('findAll')
    async findAll(): Promise<Warehouse[]> {
        return await this.warehouseService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Warehouse> {
        return await this.warehouseService.findOne({_id:id});
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateWarehouseDTO) {
        return await this.warehouseService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Warehouse> {
        return await this.warehouseService.delete(id);
    }

}
