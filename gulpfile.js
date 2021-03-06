const gulp = require('gulp');
const buildApp = require('./scripts/gulp-build');
const devServer = require('./scripts/gulp-dev');
const installDeps = require('./scripts/gulp-install');
const runTest = require('./scripts/gulp-test');
const { consumerPWA, adminPWA } = require('./scripts/gulp-pwa');
const setupPlugins = require('./scripts/gulp-setup-plugins');
const setupEnvironment = require('./scripts/gulp-setup-environment');
const setupFirebaseHosting = require('./scripts/gulp-setup-firebase-hosting');
const {
    deployConsumer,
    deployRest,
    deployAdmin
} = require('./scripts/gulp-deploy');

/**
 * `gulp setup:env`
 * Sets up environment variables for consumption of apps
 */
exports['setup:env'] = setupEnvironment;

/**
 * `gulp setup:plugins`
 * Sets up plugins for apps
 */
exports['setup:plugins'] = setupPlugins;

/**
 * `gulp setup:hosting`
 * Sets up firebase hosting configurations
 */
exports['setup:hosting'] = setupFirebaseHosting;

/**
 * `gulp setup`
 * Setup modules
 */

exports['setup'] = gulp.series(setupEnvironment, setupPlugins, setupFirebaseHosting);

/**
 *
 * `gulp pwa:consumer`
 *  Generate PWA assets and manifest
 */

exports['pwa:consumer'] = consumerPWA;

/**
 *
 * `gulp pwa:admin`
 *  Generate PWA assets and manifest
 */

exports['pwa:admin'] = adminPWA;

/**
 *
 * `gulp pwa:consumer`
 *  Generate PWA assets and manifest for consumer and admin
 */

exports['pwa'] = gulp.series(adminPWA, consumerPWA);

/**
 * `gulp install`
 * Install dependencies 
 */

exports['install'] = installDeps;

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
 * `gulp dev:rest`
 * start a admin local development server
 */
const restDev = devServer('./src/rest');
exports['dev:rest'] = restDev;

/**
 * `gulp test:rest`
 * run rest tests
 */
const restRestTest = runTest('./src/rest');
exports['test:rest'] = restRestTest;

/**
 * `gulp test:admin`
 * run admin tests
 */
const restAdminTest = runTest('./src/admin');
exports['test:admin'] = restAdminTest;

/**
 * `gulp test:consumer`
 * run consumer tests
 */
const restConsumerTest = runTest('./src/consumer');
exports['test:consumer'] = restConsumerTest;

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
const build = gulp.series(buildConsumer, buildAdmin);
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
const deploy = gulp.series(deployRest, deployConsumer, deployAdmin);
exports['deploy'] = deploy;

/**
 * `gulp build:deploy`
 * Build and Deploy Rest, Admin and Consumer
 */
exports['build:deploy'] = gulp.series(build, deploy)

