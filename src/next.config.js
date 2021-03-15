const withPWA = require('next-pwa');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = withPWA({
    distDir: '../dist',
    pwa: {
        dest: 'public',
        register: true,
        disable: isDev,
    },
});