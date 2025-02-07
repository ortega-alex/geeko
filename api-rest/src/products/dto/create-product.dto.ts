import {
    IsArray,
    IsBoolean,
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

    @IsNotEmpty({ message: 'El precio es obligatorio' })
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0, { message: 'El precio debe ser mayor a 0' })
    price: number;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    discountPrice: number;

    @IsBoolean()
    @IsOptional()
    isAvailable: boolean;

    @IsMongoId()
    @IsNotEmpty({ message: 'La categoría es obligatoria' })
    category: string;
}
