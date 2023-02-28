import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiOperation } from '@nestjs/swagger';
import { FilterQuery, Model } from 'mongoose';
import { GenericService } from '../generic/generic.service';
import { Warehouse } from '../warehouse/schemas/warehouse.schema';
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
    async findAll(): Promise<Product[]> {
        return await this.productModel.find().populate([{
            path: 'warehouse',
            select:['name'],
           // transform: (doc, id) => doc == null ? id : {name:doc.name,id:doc.id} 
        }])
    }
    async findOne(query: FilterQuery<Product>): Promise<Product> {
        return await this.productModel.findOne(query).populate([{
            path: 'warehouse',
            select:['name'],
           // transform: (doc, id) => doc == null ? id : {name:doc.name,id:doc.id} 
        }])
    }
    async buyProduct(id:string,count:number){
        const product=await this.findOne({_id:id});
        if(count>product.counter)
        throw new BadRequestException(`Only ${product.counter} product on stock`)
        return await this.update(id,{
            counter:product.counter-count
        })

    }
    
    
    
    async getProductsByGivenWarehouse(warehouseId:string):Promise<Product[]>{
        return await this.productModel.find({warehouse:warehouseId})
    }
}
