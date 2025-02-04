import { model, models, Schema } from 'mongoose';

const CategorySchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        isFeatured: { type: Boolean, default: false }, // Aparece en la vista principal
        imageUrl: { type: String, trim: true }
    },
    { timestamps: true, versionKey: false }
);

export default models.Category || model('Category', CategorySchema);
