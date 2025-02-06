/* eslint-disable @next/next/no-img-element */
'use client';
import { useUserGetCategoriesFeatured } from '@/app/hooks';
import { CategoryType } from '@/app/types';
import Reel from './reel';

export const CategoriesFeatured = () => {
    const { loading, result } = useUserGetCategoriesFeatured();

    return (
        <div className='w-full flex flex-col gap-3 '>
            {result.map((categories: CategoryType) => (
                <Reel key={categories._id} categories={categories} loading={loading} />
            ))}
        </div>
    );
};

export default CategoriesFeatured;
