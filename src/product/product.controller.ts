import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GenericController } from '../generic/generic.controller';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
@ApiTags('Products Module')
@Controller('product')
export class ProductController implements GenericController<Product, CreateProductDTO, UpdateProductDTO>{
    constructor(
        @Inject(ProductService)
        private readonly productService: ProductService
    ) { }

    @Post()
    async create(@Body() dto: CreateProductDTO): Promise<Product> {
        return await this.productService.create(dto);
    }

    @Get('findAll')
    async findAll(): Promise<Product[]> {
        return await this.productService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Product> {
        return await this.productService.findOne({_id:id});
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateProductDTO) {
        return await this.productService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Product> {
        return await this.productService.delete(id);
    }
}
