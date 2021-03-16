/**
 * Gulp task to run consumer dev server
 */
const fs = require('fs');
const gulp = require('gulp');
const run = require('gulp-run-command').default;

const pwaAssetGenerator = require('pwa-asset-generator');
const consumerPublicPath = './src/consumer/public';
const consumerBrandPath = `${consumerPublicPath}/brand`;

// generate common.properties.json for client and server consumption
const manifest = require('./templates/manifest');
const generateManifest = (done) => {
    const filePath = `${consumerPublicPath}/manifest.json`;
    const value = JSON.stringify(manifest, null, 2);
    try {
        fs.writeFile(filePath, value, done);
    } catch (error) {
        done(error);
    }
}

const clearAssets = async (done) => {
    try {
        await run(`rm -rf ${consumerBrandPath}`)();
        done();
    } catch (error) {
        done(error);
    }
}

const generateFavicon = async (done) => {
    try {
        await pwaAssetGenerator.generateImages(
            './vector/icon.svg', //TODO: env
            `${consumerBrandPath}/favicon`,
            {
                scrape: true,
                opaque: false,
                iconOnly: true,
                favicon: true,
                log: false,
                manifest: `${consumerPublicPath}/manifest.json`
            });
        done();
    } catch (error) {
        done(error);
    }
}

const generateSplashScreen = async (done) => {
    try {
        await pwaAssetGenerator.generateImages(
            './vector/logo.svg', //TODO: env
            `${consumerBrandPath}/splash`,
            {
                scrape: true,
                splashOnly: true,
                portraitOnly: true,
                log: false,
                manifest: `${consumerPublicPath}/manifest.json`
            });
        done();
    } catch (error) {
        done(error);
    }
}

const consumerPWA = gulp.series(clearAssets, generateManifest, generateFavicon, generateSplashScreen);

module.exports = consumerPWA;