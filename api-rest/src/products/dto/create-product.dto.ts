import {
    IsArray,
    IsBoolean,
    IsDecimal,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
    MinLength
} from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty({ message: 'El título es obligatorio' })
    @MinLength(5, { message: 'El título debe tener al menos 5 caracteres' })
    title: string;

    @IsString()
    @IsNotEmpty({ message: 'La descripción es obligatoria' })
    @MinLength(10, {
        message: 'La descripción debe tener al menos 10 caracteres'
    })
    description: string;

    @IsArray()
    @IsOptional()
    specs: string[];

    @IsArray()
    @IsOptional()
    sizes: string[];

    @IsArray()
    @IsOptional()
    colors: string[];

    // @IsDecimal({ force_decimal: true, decimal_digits: '2' })
    // @IsNotEmpty({ message: 'El precio es obligatorio' })
    // @Min(0, { message: 'El precio debe ser mayor a 0' })
    @IsNumber()
    price: number;

    @IsDecimal({ force_decimal: true, decimal_digits: '2' })
    @IsOptional()
    discountPrice: number;

    @IsBoolean()
    @IsOptional()
    isAvailable: boolean;

    @IsArray()
    @IsOptional()
    imagesUrls: string[];

    @IsMongoId()
    @IsNotEmpty({ message: 'La categoría es obligatoria' })
    category: string;
}
