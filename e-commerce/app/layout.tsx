import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const urbanist = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Geeko',
    description: 'Geeko is a simple and beautiful website template built with Next.js and Tailwind CSS.'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${urbanist.className} antialiased`}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
