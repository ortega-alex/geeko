import { connectDB } from '@/lib';
import { ProductSchema } from '@/models';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    await connectDB();

    const { id } = params;
    const { searchParams } = new URL(req.url);
    const more = searchParams.get('more');

    if (more) {
        const products = await ProductSchema.find({ category: id, isAvailable: true })
            .sort({ createdAt: -1 })
            .skip(Number(more) ?? 5) // Saltar los primeros 5 (porque ya los tenemos)
            .limit(5) // Obtener 5 más
            .select('title price discountPrice imagesUrls')
            .lean();
        return NextResponse.json(products);
    }

    const products = await ProductSchema.find({ category: id, isAvailable: true })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title price discountPrice imagesUrls')
        .lean();
    NextResponse.json(products);
}
