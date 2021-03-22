/**
 * Gulp task to build production consumer app
 */

const childProcess = require('child_process').spawnSync;

const runBuild = (cwd) => {
    const buildApp = (done) => {
        try {
            childProcess('npm', ['run', 'build'], { cwd, stdio: 'inherit', shell: true }, (error) => {
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

    return buildApp;
}

module.exports = runBuild;