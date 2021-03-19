const gulp = require('gulp');
const buildConsumer = require('./scripts/gulp-build-consumer');
const consumerDev = require('./scripts/gulp-consumer-dev');
const consumerPWA = require('./scripts/gulp-consumer-pwa');
const setupSettings = require('./scripts/gulp-setup-settings');
const setupFirebaseHosting = require('./scripts/gulp-setup-firebase-hosting');
const deployConsumer = require('./scripts/gulp-deploy-consumer');


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

exports['dev:consumer'] = consumerDev;

/**
 *
 * `gulp build:consumer`
 * Build prod ready consumer app
 */

exports['build:consumer'] = buildConsumer;

/**
 *
 * `gulp build`
 * Build prod ready app for consumer, admin and rest
 */

exports['build'] = gulp.series(buildConsumer);

/**
 *
 * `gulp deploy:consumer`
 * Build prod ready consumer app
 */

exports['deploy:consumer'] = deployConsumer;

