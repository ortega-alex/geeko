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

    async featured() {
        const categories = await this.categoryModel
            .aggregate([
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: 'category',
                        as: 'products',
                        pipeline: [
                            {
                                $match: {
                                    isAvailable: true
                                }
                            },
                            {
                                $lookup: {
                                    from: 'imagesproducts',
                                    localField: '_id',
                                    foreignField: 'product',
                                    as: 'images'
                                }
                            },
                            {
                                $addFields: {
                                    image: {
                                        $arrayElemAt: ['$images.imageUrl', 0]
                                    } // Obtener solo la primera imagen
                                }
                            },
                            { $project: { images: 0 } } // Eliminar array de imágenes y dejar solo la primera
                        ]
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
