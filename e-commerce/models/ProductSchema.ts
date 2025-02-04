import { model, models, Schema } from 'mongoose';

const ProductSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        specs: [{ type: String, trim: true }], // Lista de especificaciones técnicas
        sizes: [{ type: String, trim: true }], // Lista de tamaños en caso de aplicarse
        colors: [{ type: String, trim: true }], // Posibles colores
        price: { type: Number, required: true },
        discountPrice: { type: Number, default: null }, // Precio con descuento
        isAvailable: { type: Boolean, default: true }, // Disponibilidad
        imagesUrls: [{ type: String, trim: true }],
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true } // Relación con categoría
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default models.Product || model('Product', ProductSchema);
