/**
 * Gulp task to run consumer dev server
 */
const gulp = require('gulp');
const fs = require('fs');
const serverEnvironmentConfig = require('./templates/server.environment');
const childProcess = require('child_process').spawnSync;
const firebase = require('./templates/firebase');

const consumerPath = 'src/consumer/';
const consumerTarget = 'consumer';

const restPath = 'src/rest/';
const restTarget = 'rest';

const adminPath = 'src/admin/';
const adminTarget = 'admin';

const useResource = (id, cwd, done) => {
    childProcess('firebase',
        ['use', id],
        { cwd, stdio: 'inherit', shell: true },
        (error) => {
            if (error) {
                done(error);
                return;
            }
        });
    done();
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
        });
    done();
}

const addFBConfig = async (target, path, done) => {
    const filePath = `${path}/firebase.json`;
    const value = JSON.stringify(firebase(target), null, 2);
    try {
        fs.writeFile(filePath, value, done);
    } catch (error) {
        done(error);
    }
}

const setupConfig = (target, path) => {
    const addFirebaseConfig = (done) => {
        try {
            addFBConfig(target, path, done);
        } catch (error) {
            done(error);
        }
    }
    return addFirebaseConfig;
}

const setupUseResource = (path) => {

    const useFirebaseResource = (done) => {

        try {
            useResource(serverEnvironmentConfig().CONSUMER_RESOURCE_ID, path, done);
        } catch (error) {
            done(error);
        }
    }
    return useFirebaseResource;
}

const setupApplyTarget = (id, path, alias) => {
    const setupTargetAlias = (done) => {
        try {
            applyTarget(id, path, alias, done);
        } catch (error) {
            done(error);
        }
    }
    return setupTargetAlias;
}

module.exports = gulp.series(
    setupConfig(consumerTarget, consumerPath),
    setupConfig(restTarget, restPath),
    setupConfig(adminTarget, adminPath),
    setupUseResource(consumerPath),
    setupUseResource(restPath),
    setupUseResource(adminPath),
    setupApplyTarget(serverEnvironmentConfig().CONSUMER_RESOURCE_ID, consumerPath, consumerTarget),
    setupApplyTarget(serverEnvironmentConfig().REST_RESOURCE_ID, restPath, restTarget),
    setupApplyTarget(serverEnvironmentConfig().ADMIN_RESOURCE_ID, adminPath, adminTarget),
);