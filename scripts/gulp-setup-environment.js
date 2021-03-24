/**
 * Gulp task to generate configuration files to be consumed across the apps
 */

//TODO: Refactor

const fs = require('fs');
const gulp = require('gulp');

const commonEnvironmentConfig = require('./templates/common.environment');
const serverEnvironmentConfig = require('./templates/server.environment');

const setupCommonEnvironment = (app) => {
    let envPath = `./src/${app}/environment`;
    return (done) => {
        const filePath = `${envPath}/common.environment.json`;
        const value = JSON.stringify(commonEnvironmentConfig(app), null, 2);
        try {
            fs.writeFile(filePath, value, done);
        } catch (error) {
            done(error);
        }
    }
}

const setupServerEnvironment = (app) => {
    let envPath = `./src/${app}/environment`;
    return (done) => {
        const filePath = `${envPath}/server.environment.json`;
        const value = JSON.stringify(serverEnvironmentConfig(app), null, 2);
        try {
            fs.writeFile(filePath, value, done);
        } catch (error) {
            done(error);
        }
    }
}


module.exports = gulp.series(
    setupCommonEnvironment('consumer'),
    setupCommonEnvironment('rest'),
    setupServerEnvironment('rest'),
    setupCommonEnvironment('admin')
);