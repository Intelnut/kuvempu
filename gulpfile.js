require('dotenv').config();

const fs = require('fs');
const gulp = require('gulp');
const run = require('gulp-run-command').default;

const generateConfig = require('./scripts/gulp-generate-config');
const buildConsumer = require('./scripts/gulp-build-consumer');
const consumerDev = require('./scripts/gulp-consumer-dev');

const pwaAssetGenerator = require('pwa-asset-generator');
const consumerPublicPath = './src/consumer/public';

/**
 * `gulp generateConfig`
 * generates properties files and sitemap config for consumer
 */

exports.generateConfig = generateConfig;

/**
 * `gulp consumerDev`
 * start a consumer local development server
 */

exports.consumerDev = consumerDev;

/**
 *
 * `gulp buildConsumer`
 * Build prod ready consumer app
 */

exports.buildConsumer = buildConsumer;

/**
 *
 * `gulp pwa`
 *
 *  Generate assets required for PWA
 *
 */


const brandPath = `${consumerPublicPath}/brand`;

// generate common.properties.json for client and server consumption
const manifest = require('./scripts/templates/manifest');
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
        await run(`rm -rf ${brandPath}`)();
        done();
    } catch (e) {
        done(error);
    }
}

const generateFavicon = async (done) => {
    try {
        await pwaAssetGenerator.generateImages(
            './vector/icon.svg', //TODO: env
            `${brandPath}/favicon`,
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
            `${brandPath}/splash`,
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

exports.consumerPWA = consumerPWA;