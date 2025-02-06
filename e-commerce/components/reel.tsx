/* eslint-disable @next/next/no-img-element */
import { CategoryType, ProductType } from '@/app/types';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import SkeletonSchema from './skeleton-schema';
import { Card, CardContent } from './ui/card';
import IconButton from './icon-button';
import { Expand, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

type CategoriesProps = {
    categories: CategoryType;
    loading: boolean;
};

const Reel = (props: CategoriesProps) => {
    const router = useRouter();
    const { categories, loading } = props;

    return (
        <div className='px-2'>
            <h3 className='text-2xl pb-3'>{categories.title}</h3>
            <div className='px-2 sm:px-20'>
                <Carousel>
                    <CarouselContent className='-ml-2 md:-ml-4'>
                        {loading && <SkeletonSchema grid={6} />}
                        {categories.products?.map((product: ProductType) => (
                            <CarouselItem key={product._id} className='basis-1/2 md:basis-1/5 lg:basis-1/6 group'>
                                <div className='p-1'>
                                    <Card className='py-4 border border-gray-200 shadow-none'>
                                        <CardContent className='relative flex items-center px-6 py-2'>
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/${product?.imagesUrls?.[0] || ''}`}
                                                alt={`imagen product: ${product.title}`}
                                            />
                                            <div className='absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5'>
                                                <div className='flex justify-center gap-x-6'>
                                                    <IconButton
                                                        className='text-gray-600'
                                                        onClick={() => router.push(`product/${product._id}`)}
                                                        icon={<Expand size={20} />}
                                                    />
                                                    <IconButton
                                                        className='text-gray-600'
                                                        onClick={() => console.log('add item')}
                                                        icon={<ShoppingCart size={20} />}
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                        <div className='flex flex-col gap-1 px-2'>
                                            <p className='text-right text-gray-400 text-sm m-0 p-0'>ELEGIBLE PARA</p>
                                            <p className='text-right text-sm m-0 p-0'>Entrega en 2h</p>
                                            <p className='text-lg font-bold m-0 p-0'>{product.title}</p>
                                            <div className='flex items-center justify-between gap-3 px-4'>
                                                <p className='text-black dark:text-white'>{product.price}</p>
                                                <p className='text-red-400'>{product.discountPrice ?? 'sin descuento'}</p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext className='hidden sm:flex' />
                </Carousel>
            </div>
        </div>
    );
};

export default Reel;
