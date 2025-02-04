import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
    imports: [MongooseModule.forRoot('mongodb://root:abc123**@localhost:27017/geeko?authSource=admin'), CategoriesModule, ProductsModule],
    controllers: [],
    providers: [AppService]
})
export class AppModule {}
