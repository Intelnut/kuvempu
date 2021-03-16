/**
 * Gulp task to run consumer dev server
 */

const serverPropertiesObject = require('./templates/server.properties');
const childProcess = require('child_process').spawnSync;

//TODO: Create apps using cli for convenience
const setupConsumerHosting = async (done) => {
    try {

        childProcess('firebase',
            ['use', '--add', serverPropertiesObject.CONSUMER_RESOURCE_IDENTIFIER],
            { cwd: 'src/consumer/', stdio: 'inherit', shell: true },
            (error) => {
                if (error) {
                    done(error);
                    return;
                }
            });

        childProcess('firebase',
            ['target:apply', 'hosting', 'consumer', serverPropertiesObject.CONSUMER_RESOURCE_IDENTIFIER],
            { cwd: 'src/consumer/', stdio: 'inherit', shell: true },
            (error) => {
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

module.exports = setupConsumerHosting;