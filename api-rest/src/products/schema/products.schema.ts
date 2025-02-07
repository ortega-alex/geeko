import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from 'src/categories/schema/categories.schema';

export type ProductSchema = HydratedDocument<Product>;

@Schema({ timestamps: true, versionKey: false })
export class Product {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop()
    specs: string[];

    @Prop()
    sizes: string[];

    @Prop()
    colors: string[];

    @Prop({ type: Number, required: true })
    price: number;

    @Prop({ type: Number, required: true })
    discountPrice: number;

    @Prop({ type: Boolean, default: true })
    isAvailable: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
    category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
