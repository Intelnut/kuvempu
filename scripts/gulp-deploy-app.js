/**
 * Gulp task to build production consumer app
 */

const childProcess = require('child_process').spawnSync;

const deployApp = (target, cwd) => {
    return async (done) => {
        try {
            childProcess('firebase', ['deploy', '--only', `functions:${target},hosting:${target}`], { cwd, stdio: 'inherit', shell: true }, (error) => {
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

}

module.exports = {
    deployConsumer: deployApp('consumer', 'src/consumer/'),
    deployRest: deployApp('rest', 'src/rest/'),
    deployAdmin: deployApp('admin', 'src/admin/')
};