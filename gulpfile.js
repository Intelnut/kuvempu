const gulp = require('gulp');
const generateCommonConfig = require('./scripts/gulp-generate-common-config');
const generateConsumerConfig = require('./scripts/gulp-generate-consumer-config');
const buildConsumer = require('./scripts/gulp-build-consumer');
const consumerDev = require('./scripts/gulp-consumer-dev');
const consumerPWA = require('./scripts/gulp-consumer-pwa');
const setupConsumerHosting = require('./scripts/gulp-setup-consumer-hosting');
const deployConsumer = require('./scripts/gulp-deploy-consumer');
/**
 * `gulp settings:common`
 * Generate setting common for all apps 
 */

exports['settings:common'] = generateCommonConfig;

/**
 * `gulp settings:consumer`
 * Generate setting for consumer app 
 */

exports['settings:consumer'] = generateConsumerConfig;

/**
 * `gulp settings`
 * Generate setting across apps
 */

exports['settings'] = gulp.series(generateCommonConfig, generateConsumerConfig);

/**
 * `gulp setup:consumer`
 * Sets up 'consumer' alias for firebase app
 */
exports['setup:consumer'] = setupConsumerHosting;

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

