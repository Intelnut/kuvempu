/**
 * Gulp task to build production consumer app
 */

const spawn = require('child_process').spawn;

const buildConsumerApp = async (done) => {
    try {
        spawn('npm', ['run', 'build'], { cwd: 'src/consumer/', stdio: 'inherit', shell: true })
            .on('close', done);
    } catch (error) {
        done(error);
    }
}

module.exports = buildConsumerApp;