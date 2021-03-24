/**
 * Gulp task to setup pwa assets
 */
const fs = require('fs');
const gulp = require('gulp');
const run = require('gulp-run-command').default;

const pwaAssetGenerator = require('pwa-asset-generator');
const consumerPublicPath = './src/consumer/public';
const adminPublicPath = './src/admin/public';

const manifest = require('./templates/manifest');

const deteleAssets = (publicPath) => {
    const brandPath = `${publicPath}/brand`;
    const clean = async (done) => {
        try {
            await run(`rm -rf ${brandPath}`)();
            done();
        } catch (error) {
            done(error);
        }
    }

    return clean;
}

const setupManifest = (publicPath) => {

    const generateManifest = async (done) => {
        const filePath = `${publicPath}/manifest.json`;
        const value = JSON.stringify(manifest, null, 2);
        try {
            fs.writeFile(filePath, value, done);
        } catch (error) {
            done(error);
        }
    }

    return generateManifest;
}

const setupFavicon = (publicPath, assetPath) => {
    const brandPath = `${publicPath}/brand`;
    const generateFavicon = async (done) => {
        try {
            await pwaAssetGenerator.generateImages(
                assetPath,
                `${brandPath}/favicon`,
                {
                    scrape: true,
                    opaque: false,
                    iconOnly: true,
                    favicon: true,
                    log: false,
                    manifest: `${publicPath}/manifest.json`
                });
            done();
        } catch (error) {
            done(error);
        }
    }

    return generateFavicon;
}

const setupSplashScreen = (publicPath, assetPath) => {
    const brandPath = `${publicPath}/brand`;
    const generateSplashScreen = async (done) => {
        try {
            await pwaAssetGenerator.generateImages(
                assetPath, //TODO: env
                `${brandPath}/splash`,
                {
                    scrape: true,
                    splashOnly: true,
                    portraitOnly: true,
                    log: false,
                    manifest: `${publicPath}/manifest.json`
                });
            done();
        } catch (error) {
            done(error);
        }
    }

    return generateSplashScreen;
}

const pwa = (publicPath, faviconPath, splashPath) => {
    return gulp.series(
        deteleAssets(publicPath),
        setupManifest(publicPath),
        setupFavicon(publicPath, faviconPath),
        setupSplashScreen(publicPath, splashPath)
    )
}

module.exports = {
    consumerPWA: pwa(consumerPublicPath, './vector/icon.svg', './vector/logo.svg'),
    adminPWA: pwa(adminPublicPath, './vector/icon.svg', './vector/logo.svg')
};