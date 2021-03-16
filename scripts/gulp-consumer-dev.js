/**
 * Gulp task to run consumer dev server
 */

const run = require('gulp-run-command').default;
const spawn = require('child_process').spawn;

//run local consumer dev server
const runConsumerDevServer = async (done) => {
    try {
        //await run('next ./src/consumer/')();
        spawn('npm', ['run', 'dev'], { cwd: 'src/consumer/', stdio: 'inherit', shell: true })
            .on('close', done);
        //done();
    } catch (error) {
        done(error);
    }
}


module.exports = runConsumerDevServer;