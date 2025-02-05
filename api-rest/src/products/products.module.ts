import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schema/products.schema';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema }
        ]),
        CategoriesModule
    ],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule {}
