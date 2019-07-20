const path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "./source/index.js"),

    externals: {
        cowl: "cowl"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader"
            }
        ]
    },

    output: {
        filename: "google-oauth2.js",
        path: path.resolve(__dirname, "./dist"),
        libraryTarget: "commonjs2"
    },

    target: "node"
};
