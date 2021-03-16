/**
 * Gulp task to run consumer dev server
 */

const childProcess = require('child_process').spawnSync;

const runConsumerDevServer = async (done) => {
    try {
        childProcess('npm', ['run', 'dev'], { cwd: 'src/consumer/', stdio: 'inherit', shell: true }, (error) => {
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


module.exports = runConsumerDevServer;