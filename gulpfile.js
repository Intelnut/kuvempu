require('dotenv').config();

const fs = require('fs');
const gulp = require('gulp');
const replace = require('gulp-replace');
const run = require('gulp-run-command').default;
const propertiesPath = './src/common';
const pwaAssetGenerator = require('pwa-asset-generator');
const consumerPublicPath = './src/consumer/public';


/**
 * 
 * `gulp properties`
 * 
 * Save the properties module output as json 
 * for consumption by server and client
 * 
 * JSON files generated should not be committed to the codebase
 * Modify generate/*.properties.js to add more properties
 * 
 */

const commonProps = require('./scripts/common.properties');

// generate common.properties.json for client and server consumption
const generateCommonProperties = (done) => {
    const filePath = `${propertiesPath}/common.properties.json`;
    const value = JSON.stringify(commonProps, null, 2);
    try {
        fs.writeFile(filePath, value, done);
    } catch (error) {
        done(error);
    }
}

// generate next-sitemap config with siteUrl value
const generateNextSiteMapConfig = async (done) => {
    try {
        await gulp.src('./generate/next-sitemap.js')
            .pipe(replace('/*URL*/', commonProps.APPLICATION_URL))
            .pipe(gulp.dest('./'));
        done();
    } catch (error) {
        done(error);
    }
}

const config = gulp.series(generateCommonProperties, generateNextSiteMapConfig)

exports.config = config;

/**
 *
 * `gulp dev`
 *
 * Run local Next.js development server
 *
 */

const dev = async (done) => {
    try {
        await run('next src/consumer/')();
        done();
    } catch (error) {
        done(error);
    }
}

exports.dev = dev;

/**
 *
 * `gulp build`
 *
 * Build Next.js production application
 *
 */

const buildConsumer = async (done) => {
    try {
        await run('next build src/consumer/')();
        done();
    } catch (error) {
        done(error);
    }
}

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
const manifest = require('./scripts/manifest');
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
            './gravit/icon.svg', //TODO: env
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
            './gravit/logo.svg', //TODO: env
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