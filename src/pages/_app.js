import React from 'react';
import Head from 'next/head';

/**
 * Import stylesheet
 */

import '../styles/main.css';

/**
 * Entry point
 * @param {*} props
 */
const App = (props) => {
    return (
        <>
            <Head>
                <title>Kuvempu - Kickstart your Next.js and Firebase project</title>
                <meta
                    name='viewport'
                    content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5'
                />
                <meta
                    name='description'
                    content='Kuvempu helps you build fast, robust, adaptable and high performant PWA web apps powered by NextJs and Google Cloud Firebase'
                />
                <meta
                    name='keywords'
                    content='Next.js, React, tailwindcss, Firebase Authentication, Firebase Hosting, Firebase Functions'
                />
                <meta
                    property='og:image'
                    content='/brand/favicon/favicon-196.png'
                />
                <meta
                    property='og:description'
                    content='Kuvempu - Kickstart your Next.js and Firebase project'
                />
                <meta property='og:title' content='Kuvempu' />
                <meta name='msapplication-TileColor' content='#333333' />
                <meta name='msapplication-TileImage' content='/brand/favicon/favicon-196.png' />
                <meta name='theme-color' content='#333333' />
            </Head>
            <div className='p-4'>
                <h1 className='mb-12'><img src='/media/logo.svg' width='144px' height='62px' /></h1>
                <h2 className='text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 tracking-tight mb-8'>Kickstart your Next.js and Firebase project</h2>
                <p className='text-lg sm:text-2xl font-medium sm:leading-10 mb-6'><span className='text-purple-500'>Kuvempu</span> helps you build fast, robust, adaptable and high performant PWA web apps powered by NextJs and Google Cloud Firebase</p>
            </div>
        </>
    );
};

export default App;
