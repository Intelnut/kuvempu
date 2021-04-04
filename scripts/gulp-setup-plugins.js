/**
 * Gulp task to generate configuration files to be consumed across the apps
 */

const gulp = require('gulp');
const replace = require('gulp-replace');

const commonEnvironmentConfig = require('./templates/common.environment');
const consumerPath = './src/consumer';
const templatesPath = './scripts/templates';

const setupNextSiteMapConfig = async (done) => {
    try {
        await gulp.src(`${templatesPath}/next-sitemap.js`)
            .pipe(replace('/*CONSUMER_URL*/', commonEnvironmentConfig('consumer').CONSUMER_URL))
            .pipe(gulp.dest(consumerPath));
        done();
    } catch (error) {
        done(error);
    }
}

module.exports = gulp.series(setupNextSiteMapConfig);