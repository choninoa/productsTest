import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateProductDTO } from "./create-product.dto";

export class UpdateProductDTO  extends PartialType(CreateProductDTO){
   
}