/**
 * Gulp task to generate configuration files to be consumed across the apps
 */

const gulp = require('gulp');
const replace = require('gulp-replace');

const commonPropertiesObject = require('./templates/common.properties');
const consumerPath = './src/consumer';
const templatesPath = './scripts/templates';

// generate next-sitemap configuration js module for consumer
const generateNextSiteMapConfig = async (done) => {
    try {
        await gulp.src(`${templatesPath}/next-sitemap.js`)
            .pipe(replace('/*CONSUMER_URL*/', commonPropertiesObject.CONSUMER_URL))
            .pipe(gulp.dest(consumerPath));
        done();
    } catch (error) {
        done(error);
    }
}


module.exports = generateNextSiteMapConfig;