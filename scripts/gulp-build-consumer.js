/**
 * Gulp task to build production consumer app
 */

const childProcess = require('child_process').spawnSync;

const buildConsumerApp = async (done) => {
    try {
        childProcess('npm', ['run', 'build'], { cwd: 'src/consumer/', stdio: 'inherit', shell: true }, (error) => {
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

module.exports = buildConsumerApp;