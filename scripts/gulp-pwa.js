/**
 * Gulp task to setup pwa assets
 */
const fs = require('fs');
const gulp = require('gulp');
const run = require('gulp-run-command').default;

const pwaAssetGenerator = require('pwa-asset-generator');
const consumerPublicPath = './src/consumer/src/public';
const adminPublicPath = './src/admin/public';

const manifest = require('./templates/manifest');

require('dotenv').config()

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

const setupFavicon = (publicPath, assetPath, bg) => {
    const brandPath = `${publicPath}/brand`;
    const generateFavicon = async (done) => {
        try {
            await pwaAssetGenerator.generateImages(
                assetPath,
                `${brandPath}/favicon`,
                {
                    background: bg,
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

const setupSplashScreen = (publicPath, assetPath, bg) => {
    const brandPath = `${publicPath}/brand`;
    const generateSplashScreen = async (done) => {
        try {
            await pwaAssetGenerator.generateImages(
                assetPath, //TODO: env
                `${brandPath}/splash`,
                {
                    background: bg,
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

const setupLogo = (publicPath, logoPath) => {
    const brandPath = `${publicPath}/brand`;
    const copyLogo = async (done) => {
        try {
            await gulp.src(logoPath)
                .pipe(gulp.dest(brandPath));
            done();
        } catch (e) {

        }
    }
    return copyLogo;
}

const pwa = (publicPath, faviconPath, logoPath, splashPath, splashBg, iconBg) => {
    return gulp.series(
        deteleAssets(publicPath),
        setupManifest(publicPath),
        setupFavicon(publicPath, faviconPath, iconBg),
        setupSplashScreen(publicPath, splashPath, splashBg),
        setupLogo(publicPath, logoPath)
    )
}

module.exports = {
    consumerPWA: pwa(
        consumerPublicPath,
        process.env.CONSUMER_BRAND_ICON_PATH,
        process.env.CONSUMER_BRAND_LOGO_PATH,
        process.env.CONSUMER_BRAND_SPLASH_PATH,
        process.env.CONSUMER_BRAND_SPLASH_BACKGROUND,
        process.env.CONSUMER_BRAND_ICON_BACKGROUND,
    ),
    adminPWA: pwa(
        adminPublicPath,
        process.env.ADMIN_BRAND_ICON_PATH,
        process.env.ADMIN_BRAND_LOGO_PATH,
        process.env.ADMIN_BRAND_SPLASH_PATH,
        process.env.ADMIN_BRAND_SPLASH_BACKGROUND,
        process.env.ADMIN_BRAND_ICON_BACKGROUND,
    )
};