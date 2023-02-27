import { IsNotEmpty } from "class-validator";

export class CreateWarehouseDTO {
    @IsNotEmpty()
    name: string;
}