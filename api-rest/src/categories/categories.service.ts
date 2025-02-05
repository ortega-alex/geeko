import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schema/categories.schema';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>
    ) {}

    async create(createCategoryDto: CreateCategoryDto) {
        const createdCategory = new this.categoryModel(createCategoryDto);
        return await createdCategory.save();
    }

    async findAll() {
        return await this.categoryModel.find();
    }

    async findOne(id: string) {
        return await this.categoryModel.findById(id);
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.findOne(id);
        if (!category)
            return new NotFoundException(`Category with id ${id} not found`);
        return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, {
            new: true
        });
    }

    async remove(id: string) {
        const category = await this.findOne(id);
        if (!category)
            return new NotFoundException(`Category with id ${id} not found`);
        return await this.categoryModel.findByIdAndDelete(id);
    }

    // async featured(more?: number) {
    async featured() {
        // const categories = await this.categoryModel
        //     .find()
        //     .sort({ createdAt: -1 })
        //     // .skip(Number(more ?? 0)) // Saltar las 3 categorías iniciales
        //     .limit(5)
        //     .populate({
        //         path: Product.name,
        //         // match: { isAvailable: true },
        //         // options: { limit: 10, sort: { createdAt: -1 } },
        //         select: 'title, price, descontPrice, imagesUrls',
        //         strictPopulate: false
        //     })
        //     .lean();
        const categories = await this.categoryModel
            .aggregate([
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: 'category',
                        as: 'products'
                    }
                },
                {
                    $match: {
                        products: { $ne: [] },
                        isFeatured: true
                    }
                }
            ])
            .exec();
        return categories;
    }
}
