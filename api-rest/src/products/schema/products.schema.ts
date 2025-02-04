import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from 'src/categories/schema/categories.schema';

export type ProductSchema = HydratedDocument<Product>;

@Schema({ timestamps: true, versionKey: false })
export class Product {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    specs: string[];

    @Prop()
    sizes: string[];

    @Prop()
    colors: string[];

    @Prop()
    price: number;

    @Prop()
    discountPrice: number;

    @Prop()
    isAvailable: boolean;

    @Prop()
    imagesUrls: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
