import { PartialType } from '@nestjs/swagger';
import { CreateImagesProductDto } from './create-images-product.dto';

export class UpdateImagesProductDto extends PartialType(CreateImagesProductDto) {}
