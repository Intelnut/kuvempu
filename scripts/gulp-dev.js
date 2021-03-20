/**
 * Gulp task to run consumer dev server
 */

const childProcess = require('child_process').spawnSync;

const runDev = (cwd) => {
    const devServer = (done) => {
        try {
            childProcess('npm', ['run', 'dev'], { cwd, stdio: 'inherit', shell: true }, (error) => {
                if (error) {
                    done(error);
                    return;
                }
            });
            done();
        } catch (error) {
            done(error);
        }
    }

    return devServer;
}

module.exports = runDev;