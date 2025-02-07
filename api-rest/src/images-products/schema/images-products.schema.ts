import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/products/schema/products.schema';

export type ImagesProductsSchema = HydratedDocument<ImagesProduct>;

@Schema({ timestamps: true, versionKey: false })
export class ImagesProduct {
    @Prop({ required: true })
    imageUrl: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
    product: string;
}

export const ImagesProductsSchema = SchemaFactory.createForClass(ImagesProduct);
