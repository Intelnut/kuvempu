/**
 * Module to generate firebase.json
 */

const firebase = (target) => {
    let publicFolder = {
        admin: "./build",
        default: "./public"
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
            rewrites: [
                {
                    "source": "**",
                    "function": target
                }
            ]
        },
        functions: {
            "source": ".",
            "runtime": "nodejs12"
        }
    }

    return config;
};

module.exports = firebase;