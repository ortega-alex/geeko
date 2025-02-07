import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UtilsService } from './utils/utils.service';
import { ImagesProductsModule } from './images-products/images-products.module';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
    imports: [
        MulterModule.register({
            storage: memoryStorage()
        }),
        ConfigModule.forRoot({
            isGlobal: true
            // envFilePath:
            //     process.env.NODE_ENV === 'development'
            //         ? '.env.local'
            //         : '.env.production'
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public')
        }),
        MongooseModule.forRoot(
            String(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/geeko')
        ),
        JwtModule.register({
            global: true,
            secret: String(process.env.JWT_SECRET ?? ''),
            signOptions: { expiresIn: '1d' }
        }),
        ProductsModule,
        CategoriesModule,
        ImagesProductsModule
    ],
    controllers: [],
    providers: [AppService, UtilsService],
    exports: [UtilsService]
})
export class AppModule {}
