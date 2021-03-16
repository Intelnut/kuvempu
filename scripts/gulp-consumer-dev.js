/**
 * Gulp task to run consumer dev server
 */

const spawn = require('child_process').spawn;

const runConsumerDevServer = async (done) => {
    try {
        spawn('npm', ['run', 'dev'], { cwd: 'src/consumer/', stdio: 'inherit', shell: true })
            .on('close', done);
    } catch (error) {
        done(error);
    }
}


module.exports = runConsumerDevServer;