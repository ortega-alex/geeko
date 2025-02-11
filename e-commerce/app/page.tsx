'use client';
import Reel from '@/components/reel';
import { useUserGetCategoriesFeatured } from './hooks';
import { CategoryType } from './types';
import Footer from '@/components/Footer';

export default function Home() {
    const { categoriesFeatureds, loading } = useUserGetCategoriesFeatured();

    return (
        <main>
            <div className='w-full max-w-screen-2xl mx-auto'>
                <div>publicidad</div>
                <div>mas vendidos</div>
                <div className='flex flex-col gap-3'>
                    {categoriesFeatureds.map((categories: CategoryType) => (
                        <Reel key={categories._id} categories={categories} loading={loading} />
                    ))}
                </div>
                <div>mas publicidad</div>
            </div>
            <Footer />
        </main>
    );
}
