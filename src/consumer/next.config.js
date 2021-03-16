const withPWA = require('next-pwa');
const isDev = process.env.NODE_ENV !== 'production';

const SriPlugin = require("webpack-subresource-integrity");
const { createSecureHeaders } = require("next-secure-headers");

module.exports = withPWA({
    distDir: '../../lib/consumer',
    pwa: {
        dest: 'public',
        register: true,
        disable: isDev,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        if (!isDev) {
            config.output.crossOriginLoading = "anonymous";
            config.plugins.push(
                new SriPlugin({
                    hashFuncNames: ["sha256", "sha384"],
                    enabled: true,
                })
            );
        }

        return config;
    },
    async headers() {
        if (!isDev) {
            return [
                {
                    source: "/(.*)",
                    headers: createSecureHeaders(),
                },
            ]
        } else {
            return []
        }
    },
});