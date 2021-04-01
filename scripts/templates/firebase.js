/**
 * Module to generate firebase.json
 */

const firebase = (target) => {
    let publicFolder = {
        admin: "./build",
        default: "./public"
    }

    let rewrites = {
        admin: null,
        default: [
            {
                "source": "**",
                "function": target
            }
        ]
    }

    let functions = {
        admin: null,
        default: {
            "source": ".",
            "runtime": "nodejs12"
        }
    }

    const config = {
        hosting: {
            target: target,
            public: publicFolder[target] || publicFolder['default'],
            ignore: [
                "firebase.json",
                "**/.*",
                "**/node_modules/**"
            ],
            rewrites: rewrites[target] || rewrites['default']
        },
        functions: functions[target] || functions['default']
    }

    return config;
};

module.exports = firebase;