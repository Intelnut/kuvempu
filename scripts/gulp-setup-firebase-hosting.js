/**
 * Gulp task to run consumer dev server
 */
const gulp = require('gulp');
const serverPropertiesObject = require('./templates/server.properties');
const childProcess = require('child_process').spawnSync;
const templatesPath = './scripts/templates';
const replace = require('gulp-replace');

const useResource = (id, cwd, done) => {
    childProcess('firebase',
        ['use', '--add', id],
        { cwd, stdio: 'inherit', shell: true },
        (error) => {
            if (error) {
                done(error);
                return;
            }
        });
}

const applyTarget = (id, cwd, name, done) => {
    childProcess('firebase',
        ['target:apply', 'hosting', name, id],
        { cwd, stdio: 'inherit', shell: true },
        (error) => {
            if (error) {
                done(error);
                return;
            }
            done();
        });
}

const addFBConfig = async (target, path, done) => {
    await gulp.src(`${templatesPath}/firebase.json`)
        .pipe(replace('/*TARGET*/', target))
        .pipe(gulp.dest(path));
    done();
}

const consumerPath = 'src/consumer/';
const consumerTarget = 'consumer';

const restPath = 'src/rest/';
const restTarget = 'rest';

const setupFirebaseConfig = async (done) => {
    try {
        await addFBConfig(consumerTarget, consumerPath, done);
        await addFBConfig(restTarget, restPath, done);
    } catch (error) {
        done(error);
    }
}

const setupHosting = async (done) => {
    try {
        // consumer
        useResource(serverPropertiesObject.CONSUMER_RESOURCE_ID, consumerPath, done);
        applyTarget(serverPropertiesObject.CONSUMER_RESOURCE_ID, consumerPath, consumerTarget, done);

        // rest
        useResource(serverPropertiesObject.CONSUMER_RESOURCE_ID, restPath, done);
        applyTarget(serverPropertiesObject.REST_RESOURCE_ID, restPath, restTarget, done);
    } catch (error) {
        done(error);
    }
}
module.exports = gulp.series(setupFirebaseConfig, setupHosting);