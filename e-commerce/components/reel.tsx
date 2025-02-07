/* eslint-disable @next/next/no-img-element */
import { CategoryType, ProductType } from '@/app/types';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import SkeletonSchema from './skeleton-schema';
import { Card, CardContent } from './ui/card';
import IconButton from './icon-button';
import { Expand, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { commaSeparateNumber } from '@/app/utilities';

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
                            <CarouselItem key={product._id} className='md:basis-1/5 lg:basis-1/6 group'>
                                <div className='p-1'>
                                    <Card className='py-4 border-l-0 border-t-0 shadow-[0_4px_6px_rgba(0,0,0,0.05),_0px_2px_4px_-1px_rgba(0,0,0,0.1)]'>
                                        <CardContent className='relative flex flex-col items-center px-6 py-2'>
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/${product?.image ?? ''}`}
                                                alt={`imagen product: ${product.title}`}
                                            />
                                            <div className='w-full absolute transition duration-200 opacity-0 group-hover:opacity-100 bottom-5'>
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
                                        <div className='flex flex-col px-2'>
                                            <p className='text-right text-gray-400 text-sm m-0 p-0'>ELEGIBLE PARA</p>
                                            <div className='w-auto flex justify-end'>
                                                <div className='border px-5 py-1 bg-[#ff8a00] rounded-br-3xl rounded-tl-3xl'>
                                                    <p className='text-right text-white text-sm m-0 p-0 '>Entrega en 2h</p>
                                                </div>
                                            </div>

                                            <p className='text-lg font-bold m-0 p-0 '>{product.title}</p>
                                            <div className='flex items-center justify-center gap-3'>
                                                <p className='text-red-400'>
                                                    Q {commaSeparateNumber(product.price - (product?.discountPrice ?? 0))}
                                                </p>
                                                {product?.discountPrice && (
                                                    <p className='text-balck dark:text-white line-through'>
                                                        Q {commaSeparateNumber(product.price)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className='scale-125' />
                    <CarouselNext className='hidden sm:flex scale-125' />
                </Carousel>
            </div>
        </div>
    );
};

export default Reel;
