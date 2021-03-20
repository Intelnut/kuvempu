const gulp = require('gulp');
const buildApp = require('./scripts/gulp-build');
const devServer = require('./scripts/gulp-dev');
const consumerPWA = require('./scripts/gulp-consumer-pwa');
const setupSettings = require('./scripts/gulp-setup-settings');
const setupFirebaseHosting = require('./scripts/gulp-setup-firebase-hosting');
const {
    deployConsumer,
    deployRest,
    deployAdmin
} = require('./scripts/gulp-deploy-app');


/**
 * `gulp setup:settings`
 * Sets up properties and sitemap settings
 */
exports['setup:settings'] = setupSettings;

/**
 * `gulp setup:hosting`
 * Sets up firebase hosting configurations
 */
exports['setup:hosting'] = setupFirebaseHosting;

/**
 * `gulp setup`
 * Setup modules
 */

exports['setup'] = gulp.series(setupSettings, setupFirebaseHosting);

/**
 *
 * `gulp pwa:consumer`
 *  Generate PWA assets and manifest
 */

exports['pwa:consumer'] = consumerPWA;

/**
 *
 * `gulp pwa:consumer`
 *  Generate PWA assets and manifest for consumer and admin
 */

exports['pwa'] = gulp.series(consumerPWA);

/**
 * `gulp dev:consumer`
 * start a consumer local development server
 */
const consumerDev = devServer('./src/consumer');
exports['dev:consumer'] = consumerDev;

/**
 * `gulp dev:admin`
 * start a admin local development server
 */
const adminDev = devServer('./src/admin');
exports['dev:admin'] = adminDev;

/**
 *
 * `gulp build:consumer`
 * Build prod ready consumer app
 */

const buildConsumer = buildApp('./src/consumer')
exports['build:consumer'] = buildConsumer;

/**
 *
 * `gulp build:admin`
 * Build prod ready admin app
 */
const buildAdmin = buildApp('./src/admin');
exports['build:admin'] = buildAdmin;

/**
 *
 * `gulp build`
 * Build prod ready app for consumer, admin and rest
 */

exports['build'] = gulp.series(buildConsumer, buildAdmin);

/**
 *
 * `gulp deploy:consumer`
 * Deploy consumer app
 */

exports['deploy:consumer'] = deployConsumer;

/**
 *
 * `gulp deploy:rest`
 * Deploy Rest app
 */

exports['deploy:rest'] = deployRest;


/**
 *
 * `gulp deploy:admin`
 * Deploy admin app
 */

exports['deploy:admin'] = deployAdmin;

/**
 * `gulp deploy`
 * Deploy consumer and rest service app
 * Deploy rest first to ensure peer api dependencies are met
 */
exports['deploy'] = gulp.series(deployRest, deployConsumer, deployAdmin);

