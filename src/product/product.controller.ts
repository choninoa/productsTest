import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { hasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GenericController } from '../generic/generic.interface';
import { ParseMongoIdPipe } from '../generic/mongoid.pipe';
import { UserRolesEnum } from '../user/schemas/user.schema';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
@ApiTags('Products Module')
@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController  implements GenericController<Product, CreateProductDTO, UpdateProductDTO>{
    constructor(
        @Inject(ProductService)
        private readonly productService: ProductService
    ) { 
       
    }
    
    @hasRoles(UserRolesEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() dto: CreateProductDTO): Promise<Product> {
        return await this.productService.create(dto);
    }

    @hasRoles(UserRolesEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Get('findAll')
    async findAll(): Promise<Product[]> {
        return await this.productService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id',ParseMongoIdPipe) id: string): Promise<Product> {
        return await this.productService.findOne({_id:id});
    }

    @hasRoles(UserRolesEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Put(':id')
    async update(@Param('id',ParseMongoIdPipe) id: string, @Body() dto: UpdateProductDTO) {
        return await this.productService.update(id, dto);
    }

    @hasRoles(UserRolesEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Delete(':id')
    async delete(@Param('id',ParseMongoIdPipe) id: string): Promise<Product> {
        return await this.productService.delete(id);
    }

    @hasRoles(UserRolesEnum.BUYER)
    @UseGuards(RolesGuard)
    @ApiOperation({summary:'Buy determitate units of product'})
    @Put('buyProduct/:id/:units')
    async buyProduct(@Param('id',ParseMongoIdPipe) id: string,@Param('units',ParseIntPipe) units: number) {
        return await this.productService.buyProduct(id, units);
    }
}
