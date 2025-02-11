'use client';
import Reel from '@/components/reel';
import { useUserGetCategoriesFeatured } from './hooks';
import { CategoryType } from './types';

export default function Home() {
    const { categoriesFeatureds, loading } = useUserGetCategoriesFeatured();

    return (
        <main>
            <div>publicidad</div>
            <div>mas vendidos</div>
            <div className='w-full flex flex-col gap-3 '>
                {categoriesFeatureds.map((categories: CategoryType) => (
                    <Reel key={categories._id} categories={categories} loading={loading} />
                ))}
            </div>
            <div>mas publicidad</div>
            <div>footer</div>
        </main>
    );
}
