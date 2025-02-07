import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategorySchema = HydratedDocument<Category>;

@Schema({ timestamps: true, versionKey: false })
export class Category {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: String, required: true })
    imageUrl: string;

    @Prop({ type: Boolean, default: false })
    isFeatured: boolean;

    @Prop({ type: Boolean, default: true })
    isAvailable: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
