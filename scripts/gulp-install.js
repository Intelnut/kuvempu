/**
 * Gulp task to run consumer dev server
 */

const childProcess = require('child_process').spawnSync;
const gulp = require('gulp');

const installDeps = (cwd) => {
    const install = (done) => {
        try {
            childProcess('npm', ['install'], { cwd, stdio: 'inherit', shell: true }, (error) => {
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

    return install;
}

module.exports = gulp.series(installDeps('./'), installDeps('./src/rest'), installDeps('./src/admin'), installDeps('./src/consumer'));