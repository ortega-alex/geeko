import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    ParseFilePipeBuilder,
    Post,
    Put,
    Query,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UtilsService } from 'src/utils/utils.service';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService,
        private readonly utilsService: UtilsService
    ) {}

    @UseInterceptors(FileInterceptor('file'))
    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ status: 200, description: 'Category created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async create(
        @Body() createCategoryDto: CreateCategoryDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: 'png|jpeg|jpg'
                })
                .addMaxSizeValidator({
                    maxSize: 1000000
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
                })
        )
        file: Express.Multer.File
    ) {
        const imageUrl = this.utilsService.saveFile(file);
        return this.categoriesService.create({
            ...createCategoryDto,
            imageUrl,
            isFeatured: createCategoryDto?.isFeatured ?? false
        });
    }

    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get('featured')
    featured(@Query() query?: { more: string }) {
        return this.categoriesService.featured();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const category = await this.categoriesService.findOne(id);
        if (!category)
            return new NotFoundException(`Category with id ${id} not found`);
        return category;
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto
    ) {
        return this.categoriesService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(id);
    }
}
