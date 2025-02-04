import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/products.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<Product>
    ) {}

    create(createProductDto: CreateProductDto) {
        return 'This action adds a new product';
    }

    async findAll() {
        return await this.productModel.find();
    }

    async findOne(id: number) {
        return await this.productModel.findById(id).populate('category');
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        return `This action updates a #${id} product`;
    }

    remove(id: number) {
        return `This action removes a #${id} product`;
    }
}
