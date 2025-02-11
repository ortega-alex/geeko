import React from 'react';

const Footer = () => {
    const list = [
        {
            title: 'Conócenos',
            items: [
                {
                    title: '¿Quién somos?',
                    link: 'https://www.google.com'
                },
                {
                    title: 'Términos y condiciones',
                    link: 'https://www.google.com'
                },
                {
                    title: 'Política de privacidad',
                    link: 'https://www.google.com'
                }
            ]
        },
        {
            title: 'Siguenos en',
            items: [
                {
                    title: 'Facebook',
                    link: 'https://www.facebook.com'
                },
                {
                    title: 'Instagram',
                    link: 'https://www.instagram.com'
                },
                {
                    title: 'Twitter',
                    link: 'https://www.twitter.com'
                }
            ]
        },
        {
            title: 'Ayuda y contacto',
            items: [
                {
                    title: 'servicioalcliente@geeko.com',
                    link: 'https://www.google.com'
                },
                {
                    title: 'Preguntas frecuentes',
                    link: 'https://www.google.com'
                }
            ]
        }
    ];

    return (
        <footer className='bg-secondary mt-4 text-white'>
            <div className='w-full max-w-screen-xl mx-auto p-4 md-py-8'>
                <div className='flex flex-col md:flex-row gap-3 md:gap-32 text-white'>
                    {list.map((item, i) => (
                        <ul key={i} className='flex flex-col gap-4 mb-6 text-sm font-medium text-white'>
                            <li className='font-bold'>{item.title}</li>
                            {item.items.map(item => (
                                <li key={item.title} className='pl-4'>
                                    <a href={item.link} target='_blank' rel='noreferrer'>
                                        {item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
                <div className='text-center'>
                    <p>© 2023 Geeko. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
