import { connectDB } from '@/lib';
import { CategorySchema } from '@/models';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const more = searchParams.get('more');

        if (more) {
            const categories = await CategorySchema.find()
                .sort({ createdAt: -1 })
                .skip(Number(more ?? 3)) // Saltar las 3 categorías iniciales
                .limit(3) // Traer otras 3 categorías
                .populate({
                    path: 'products',
                    match: { isAvailable: true },
                    options: { limit: 5, sort: { createdAt: -1 } }, // Siempre traer 5 productos por categoría
                    select: 'title price discountPrice imagesUrls'
                })
                .lean();
            return NextResponse.json(categories);
        }

        const categories = await CategorySchema.find()
            .sort({ createdAt: -1 }) // Opcional: Ordenar por la más reciente
            .limit(3) // Cargar solo 3 categorías en la vista inicial
            .populate({
                path: 'products',
                match: { isAvailable: true }, // Solo productos disponibles
                options: { limit: 5, sort: { createdAt: -1 } }, // 5 productos por categoría
                select: 'title price discountPrice imagesUrls' // Solo traer estos campos
            })
            .lean(); // Optimiza la consulta

        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { title, description, isFeatured, imageUrl } = await req.json();

        if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

        const category = await CategorySchema.create({
            title,
            description: description ?? '',
            isFeatured: isFeatured ?? false,
            imageUrl: imageUrl ?? ''
        });
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
