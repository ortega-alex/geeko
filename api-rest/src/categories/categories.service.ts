import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/categories.schema';
import { Model } from 'mongoose';

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
        console.log('categoria', category);
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
}
