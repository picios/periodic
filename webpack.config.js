const path = require('path');
const webpack = require("webpack");

var config = {
    entry: {
        "js/index": "./main.js",
        "js/index.min": "./main.js",
    },
    output: {
        path: path.resolve(__dirname),
        filename: '[name].js',
    },
    devServer: {
        inline: true,
        port: 8080
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ]
}
module.exports = config;
