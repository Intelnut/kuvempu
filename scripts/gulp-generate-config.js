/**
 * Gulp task to generate configuration files to be consumed across the apps
 */

const fs = require('fs');
const gulp = require('gulp');
const replace = require('gulp-replace');

const commonPropertiesObject = require('./templates/common.properties');
const commonPath = './src/common';
const consumerPath = './src/consumer';
const templatesPath = './scripts/templates';

// generate common.properties.json shared across client and server
const generateCommonProperties = (done) => {
    const filePath = `${commonPath}/common.properties.json`;
    const value = JSON.stringify(commonPropertiesObject, null, 2);
    try {
        fs.writeFile(filePath, value, done);
    } catch (error) {
        done(error);
    }
}

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


module.exports = gulp.series(generateCommonProperties, generateNextSiteMapConfig);