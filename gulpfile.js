const generateConfig = require('./scripts/gulp-generate-config');
const buildConsumer = require('./scripts/gulp-build-consumer');
const consumerDev = require('./scripts/gulp-consumer-dev');
const consumerPWA = require('./scripts/gulp-consumer-pwa');

/**
 * `gulp generate:config`
 * Generate properties files and sitemap config for consumer
 */

exports['generate:config'] = generateConfig;

/**
 *
 * `gulp generate:pwa`
 *  Generate PWA assets and manifest
 */

exports['generate:pwa'] = consumerPWA;

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

