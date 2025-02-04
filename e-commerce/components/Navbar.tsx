'use client';

import { Menu, ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import InputSearch from './InputSearch';

const Navbar = () => {
    const router = useRouter();

    return (
        <div className='bg-primary text-white p-4'>
            <div className='flex items-end justify-between mx-auto cursor-pointer sm:max-w-4xl max-w-6xl mb-4'>
                <div className='flex sm:hidden'>
                    <Menu />
                </div>
                <div onClick={() => router.push('/')}>
                    <Image src='/logo.jpg' alt='logo' width={180} height={84} />
                </div>
                <div className='hidden sm:flex w-80'>
                    <InputSearch />
                </div>
                <div className='flex items-center justify-between gap-2 sm:gap-7'>
                    <div className='flex items-center gap-2'>
                        <User strokeWidth={1} className='cursor-pointer' />
                        <h3 className='hidden sm:flex'>Cuenta</h3>
                    </div>
                    <ShoppingCart strokeWidth={1} className='cursor-pointer' />
                </div>
            </div>
            <div className='flex sm:hidden'>
                <InputSearch />
            </div>
        </div>
    );
};

export default Navbar;
