import React from 'react';
import { Skeleton } from './ui/skeleton';

type SkeletonSchemaProps = {
    grid: number;
};

const SkeletonSchema = (props: SkeletonSchemaProps) => {
    const { grid } = props;
    return Array.from({ length: grid }).map((_, index) => (
        <div key={index} className='flex flex-col gap-8 mx-auto space-x-3'>
            <Skeleton className='h-[125px] w-[200px] rounded-xl' />
            <div className='soace-y-2'>
                <Skeleton className='h-4 w-[250px]' />
                <Skeleton className='h-4 w-[250px]' />
            </div>
        </div>
    ));
};

export default SkeletonSchema;
