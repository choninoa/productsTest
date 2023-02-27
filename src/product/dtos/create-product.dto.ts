import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDTO {
    @IsNotEmpty()
    name: string;

    @IsNumber()
    price: number;
}