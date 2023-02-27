import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericService } from '../generic/generic.service';
import { CreateWarehouseDTO } from './dtos/create-warehouse.dto';
import { UpdateWarehouseDTO } from './dtos/update-warehouse.dto';
import { Warehouse, WarehouseDocument } from './schemas/warehouse.schema';

@Injectable()
export class WarehouseService extends GenericService<Warehouse, CreateWarehouseDTO,UpdateWarehouseDTO> {
    constructor(
        @InjectModel(Warehouse.name) private readonly warehouseModel: Model<WarehouseDocument>,
    ) {
        super(warehouseModel);
    }

}
