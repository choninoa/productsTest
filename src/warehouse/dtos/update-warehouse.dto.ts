import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import { CreateWarehouseDTO } from "./create-warehouse.dto";

export class UpdateWarehouseDTO extends PartialType(CreateWarehouseDTO) {
    
}