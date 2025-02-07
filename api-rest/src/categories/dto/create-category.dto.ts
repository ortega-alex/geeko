import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
    @IsString({ message: 'El título es obligatorio' })
    @MinLength(5)
    title: string;

    @IsString({ message: 'La descripción es obligatoria' })
    @MinLength(10)
    description: string;

    @IsString({ message: 'La imagen es obligatoria' })
    @IsOptional()
    imageUrl: string;

    @IsBoolean()
    @IsOptional()
    isFeatured: boolean;

    @IsBoolean()
    @IsOptional()
    isAvailable: boolean;
}
