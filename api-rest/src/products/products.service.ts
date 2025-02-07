import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schema/products.schema';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<Product>
    ) {}

    async create(createProductDto: CreateProductDto) {
        const product = new this.productModel(createProductDto);
        return await product.save();
    }

    async findAll() {
        return await this.productModel.find().populate({
            path: 'category',
            select: 'title',
            strictPopulate: false
        });
    }

    async findOne(id: string) {
        return await this.productModel.findById(id).populate('category');
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const prodcut = await this.productModel.findById(id);
        if (!prodcut)
            return new NotFoundException(`Product with id ${id} not found`);
        return await this.productModel.findByIdAndUpdate(id, updateProductDto, {
            new: true
        });
    }

    async remove(id: string) {
        const prodcut = await this.productModel.findById(id);
        if (!prodcut)
            return new NotFoundException(`Product with id ${id} not found`);
        return await this.productModel.findByIdAndDelete(id);
    }
}
