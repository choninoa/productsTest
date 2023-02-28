import { IsMongoId, IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDTO {
    @IsNotEmpty()
    name: string;

    @IsNumber()
    price: number;

    @IsNumber()
    counter: number;

    @IsNotEmpty()
    description: string;

    @IsMongoId()
    warehouse: string;
}