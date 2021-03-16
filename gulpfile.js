const generateConfig = require('./scripts/gulp-generate-config');
const buildConsumer = require('./scripts/gulp-build-consumer');
const consumerDev = require('./scripts/gulp-consumer-dev');
const consumerPWA = require('./scripts/gulp-consumer-pwa');

/**
 * `gulp generateConfig`
 * generates properties files and sitemap config for consumer
 */

exports.generateConfig = generateConfig;

/**
 * `gulp consumerDev`
 * start a consumer local development server
 */

exports.consumerDev = consumerDev;

/**
 *
 * `gulp buildConsumer`
 * Build prod ready consumer app
 */

exports.buildConsumer = buildConsumer;

/**
 *
 * `gulp consumerPWA`
 *  Generate PWA assets and manifest
 */

exports.consumerPWA = consumerPWA;