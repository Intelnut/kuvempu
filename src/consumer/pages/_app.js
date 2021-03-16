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
const App = ({ Component, pageProps }) => {
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
            <Component {...pageProps} />
        </>
    );
};

export default App;
