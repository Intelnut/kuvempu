const withPWA = require('next-pwa');
const isDev = process.env.NODE_ENV !== 'production';

const SriPlugin = require("webpack-subresource-integrity");
const { createSecureHeaders } = require("next-secure-headers");

module.exports = withPWA({
    distDir: '../dist',
    pwa: {
        dest: 'public',
        register: true,
        disable: isDev,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.output.crossOriginLoading = "anonymous";
        if (!isDev) {
            config.plugins.push(
                new SriPlugin({
                    hashFuncNames: ["sha256", "sha384"],
                    enabled: true,
                })
            );
        }

        config.plugins.push(new MomentLocalesPlugin());

        // Important: return the modified config
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