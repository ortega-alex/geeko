import { Module } from '@nestjs/common';
import { ImagesProductsService } from './images-products.service';
import { ImagesProductsController } from './images-products.controller';
import { UtilsService } from 'src/utils/utils.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
    ImagesProduct,
    ImagesProductsSchema
} from './schema/images-products.schema';
import { ProductsModule } from 'src/products/products.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ImagesProduct.name, schema: ImagesProductsSchema }
        ]),
        ProductsModule
    ],
    controllers: [ImagesProductsController],
    providers: [ImagesProductsService, UtilsService]
})
export class ImagesProductsModule {}
