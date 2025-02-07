import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseFilePipeBuilder,
    Post,
    Put,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UtilsService } from 'src/utils/utils.service';
import { CreateImagesProductDto } from './dto/create-images-product.dto';
import { UpdateImagesProductDto } from './dto/update-images-product.dto';
import { ImagesProductsService } from './images-products.service';

@Controller('images-products')
export class ImagesProductsController {
    constructor(
        private readonly imagesProductsService: ImagesProductsService,
        private readonly utilsService: UtilsService
    ) {}

    @UseInterceptors(FileInterceptor('image'))
    @Post()
    async create(
        @Body() createImagesProductDto: CreateImagesProductDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: 'image/*' })
                .addMaxSizeValidator({
                    maxSize: 1000000
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
                })
        )
        image: Express.Multer.File
    ) {
        const imageUrl = await this.utilsService.saveFile(image);
        return this.imagesProductsService.create({
            ...createImagesProductDto,
            imageUrl
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.imagesProductsService.findOne(id);
    }

    @Get('product/:id')
    findImagesProductsByProduct(@Param('id') id: string) {
        return this.imagesProductsService.findImagesProductsByProduct(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.imagesProductsService.remove(id);
    }
}
