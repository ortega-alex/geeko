import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @MinLength(5)
    title: string;

    @IsString()
    @MinLength(10)
    description: string;

    @IsString()
    @IsOptional()
    imageUrl: string;

    @IsBoolean()
    @IsOptional()
    isFeatured: boolean;
}
