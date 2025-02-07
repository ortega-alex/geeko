import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateImagesProductDto {
    @IsString()
    @IsOptional()
    imageUrl: string;

    @IsMongoId({ message: 'El producto es obligatorio' })
    @IsNotEmpty()
    product: string;
}
