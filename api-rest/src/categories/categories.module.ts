import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilsService } from 'src/utils/utils.service';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category, CategorySchema } from './schema/categories.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Category.name, schema: CategorySchema }
        ])
    ],
    controllers: [CategoriesController],
    providers: [CategoriesService, UtilsService],
    exports: [
        MongooseModule.forFeature([
            { name: Category.name, schema: CategorySchema }
        ])
    ]
})
export class CategoriesModule {}
