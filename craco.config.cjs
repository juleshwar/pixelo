const CracoEnvPlugin = require('craco-plugin-env')

module.exports = {
    plugins: [
        {
            plugin: CracoEnvPlugin
        }
    ],
    webpack: {
        configure: {
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        resolve: {
                            fullySpecified: false,
                        },
                    },
                ],
            },
        },
    },
};