import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericService } from '../generic/generic.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService  extends GenericService<Product, CreateProductDTO,UpdateProductDTO> {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    ) {
        super(productModel);
    }
}
