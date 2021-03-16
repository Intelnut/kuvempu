/**
 * Gulp task to build production consumer app
 */

const childProcess = require('child_process').spawnSync;

const deployConsumerApp = async (done) => {
    try {
        childProcess('firebase', ['deploy', '--only', 'functions:consumer,hosting:consumer'], { cwd: 'src/consumer/', stdio: 'inherit', shell: true }, (error) => {
            if (error) {
                done(error);
                return;
            }
            done();
        });
    } catch (error) {
        done(error);
    }
}

module.exports = deployConsumerApp;