/**
 * Gulp task to generate configuration files to be consumed across the apps
 */

const fs = require('fs');
const gulp = require('gulp');

const commonEnvironmentConfig = require('./templates/common.environment');
const serverEnvironmentConfig = require('./templates/server.environment');
const environmentPath = './src/environment';

const setupCommonEnvironment = (done) => {
    const filePath = `${environmentPath}/common.environment.json`;
    const value = JSON.stringify(commonEnvironmentConfig, null, 2);
    try {
        fs.writeFile(filePath, value, done);
    } catch (error) {
        done(error);
    }
}

const setupServerEnvironment = (done) => {
    const filePath = `${environmentPath}/server.environment.json`;
    const value = JSON.stringify(serverEnvironmentConfig, null, 2);
    try {
        fs.writeFile(filePath, value, done);
    } catch (error) {
        done(error);
    }
}


module.exports = gulp.series(setupCommonEnvironment, setupServerEnvironment);