import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/products.schema';
import { Model } from 'mongoose';
import { Category } from 'src/categories/schema/categories.schema';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<Product>,
        @InjectModel(Category.name)
        private readonly categoryModel: Model<Category>
    ) {}

    create(createProductDto: CreateProductDto) {
        const product = new this.productModel(createProductDto);
        return product.save();
    }

    async findAll() {
        return await this.productModel.find().populate({
            path: 'category',
            select: 'title',
            strictPopulate: false
        });
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
