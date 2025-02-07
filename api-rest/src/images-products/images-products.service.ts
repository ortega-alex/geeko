import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateImagesProductDto } from './dto/create-images-product.dto';
import { ImagesProduct } from './schema/images-products.schema';

@Injectable()
export class ImagesProductsService {
    constructor(
        @InjectModel(ImagesProduct.name)
        private readonly imagesProductModel: Model<ImagesProduct>
    ) {}

    async create(createImagesProductDto: CreateImagesProductDto) {
        const imagesProduct = new this.imagesProductModel(
            createImagesProductDto
        );
        return await imagesProduct.save();
    }

    async findOne(id: string) {
        return await this.imagesProductModel.findById(id);
    }

    async remove(id: string) {
        const image = await this.findOne(id);
        if (!image)
            return new NotFoundException(
                `La imagen con id ${id} no se pudo encontrar`
            );
        return await this.imagesProductModel.findByIdAndDelete(id);
    }

    async findImagesProductsByProduct(id: string) {
        return await this.imagesProductModel.find({ product: id });
    }
}
