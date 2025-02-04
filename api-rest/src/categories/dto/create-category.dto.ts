import { IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @MinLength(5)
    title: string;

    @IsString()
    @MinLength(10)
    description: string;

    @IsString()
    imageUrl?: string;
}
