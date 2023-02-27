import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Warehouse, WarehouseSchema } from './schemas/warehouse.schema';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Warehouse.name, schema: WarehouseSchema }])],
   controllers: [WarehouseController],
  providers: [WarehouseService]
})
export class WarehouseModule {}
