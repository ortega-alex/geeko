import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategorySchema = HydratedDocument<Category>;

@Schema({ timestamps: true, versionKey: false })
export class Category {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    isFeatured: boolean;

    @Prop()
    imageUrl: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
